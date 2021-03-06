"use strict";
cc._RF.push(module, '080eemp4+RJNKp89yQV4blr', 'Player');
// resources/Script/view/Player.js

"use strict";

var cartTypeAtlas;
var sf_cardList;
cc.Class({
    extends: cc.Component,

    properties: {

        data: null,
        spHead: cc.Sprite, //头像
        spSgin: cc.Sprite, //右上角标识
        labelName: cc.Label, //名字
        labelScore: cc.Label, //分数
        cardNode: cc.Node, //牌背面
        spReady: cc.Sprite, //已准备
        labelBet: cc.Label, //下注倍数
        spType: cc.Sprite, //牌型
        labelWinScore: cc.Label, //赢得的分数
        ctAtlas: cc.SpriteAtlas, //图集 牛牛类型
        isMySelf: null, //是否是自己

        cardList: [], //牌列表
        cardPosList: [], //牌坐标 列表

        sf_cardBg: cc.SpriteFrame,
        sf_cardList: cc.SpriteAtlas //牌资源
    },

    // use this for initialization
    onLoad: function onLoad() {
        if (!this.data) {
            this.node.active = false;
            this.spSgin.node.active = false;
        }
        // 只需要设置一次就可以了
        cartTypeAtlas = cartTypeAtlas || this.ctAtlas;
        sf_cardList = sf_cardList || this.sf_cardList;
    },

    /**
     * 创建用户
     * @param {*} data 
     */
    create: function create(data, isMySelf) {
        var _this = this;

        data = data || {
            user: {
                name: "测试"
            },
            score: 100,
            ready: false,
            banker: false
        };
        this.data = data;
        // this.isMySelf = isMySelf;
        this.node.active = true;
        this.labelName.string = data.user.name;
        this.labelScore.string = data.score;

        this.setBetNum(Math.max(data.robBankerBet, data.bet));
        this.spType.node.active = false;
        this.cardNode.active = false;
        this.labelWinScore.node.active = false;

        var index = 0;
        this.cardNode.getChildren().forEach(function (element) {
            _this.cardList[index] = element;
            _this.cardPosList[index] = element.getPosition();
            index += 1;
        });
        // 设置准备状态
        this.setReady(data.ready);
        // 设置是否是庄家
        this.setBanker(data.banker);
    },


    /**
     * 站起
     */
    sitUp: function sitUp() {
        this.node.active = false;
    },


    /**
     * 设置分数
     * @param {*} nScore 
     */
    setScore: function setScore(nScore) {
        this.labelScore.string = nScore;
    },


    /**
     * 
     */
    setWinScore: function setWinScore(nScore) {
        this.labelWinScore.node.active = true;
        this.labelWinScore.string = nScore;
    },


    /**
     * 设置是否显示准备
     * @param {*} isReady 
     */
    setReady: function setReady(isReady) {
        if (this.spReady) {
            this.spReady.node.active = isReady;
        }
    },


    /**
     * 下注倍数
     * @param {*} num 
     */
    setBetNum: function setBetNum(num) {
        this.labelBet.node.active = num > 0;
        this.labelBet.string = "x" + num;
    },

    /**
     * 设置牌型
     * @param {*} pType 
     */
    setCardType: function setCardType(pType) {
        this.spType.node.active = true;
        this.spType.spriteFrame = cartTypeAtlas.getSpriteFrame(pType);
    },


    /**
     * 设置是否是庄家
     * @param {*} isBanker 
     */
    setBanker: function setBanker(isBanker) {
        // this.spSgin.parent.node.getChildByName("border").node.active = isBanker;
        this.spSgin.node.active = isBanker;
    },


    /**
     * 发牌动画
     */
    sendCardAction: function sendCardAction(centerNode, cardData, pCallback) {
        console.log("--- 发牌动画！");

        var windowSize = cc.view.getVisibleSize();
        var pos = centerNode.convertToWorldSpace(cc.p(0, 0));
        pos = this.cardNode.convertToNodeSpace(pos);

        this.cardNode.active = true;

        for (var index = 0; index < 5; index++) {

            this.cardList[index].setPosition(pos);
            this.cardList[index].getComponent("cc.Sprite").spriteFrame = sf_cardList._spriteFrames['back_2'];

            var delay = cc.delayTime(index * 0.05);
            var move = cc.moveTo(0.2, this.cardPosList[index]);
            var seq = cc.sequence(delay, move);

            if (index == 4 && this.isMySelf) {
                var $this = this;
                var cf_openCard = cc.callFunc(function () {
                    $this.open4Card(cardData);
                });
                seq = cc.sequence(delay, move, cf_openCard);
            }
            this.cardList[index].runAction(seq);
        }

        var node = new cc.Node('myNode');
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.sf_cardBg;
        node.setPosition(pos);
        this.cardNode.addChild(node);

        if (pCallback) {
            pCallback();
        };
    },


    /**
     * 打开四张牌
     * @param {*} cardData 
     */
    open4Card: function open4Card(cardData) {
        var _this2 = this;

        var $this = this;

        var _loop = function _loop(index) {
            scale1 = cc.scaleBy(0.5, 0.1, 1);
            scale2 = cc.scaleBy(0.5, 10, 1);
            cf_setTexture = cc.callFunc(function () {
                if (sf_cardList) {
                    $this.cardList[index].getComponent("cc.Sprite").spriteFrame = sf_cardList._spriteFrames[cardData[index]];
                }
            });
            seq = cc.sequence(scale1, cf_setTexture, scale2);


            _this2.cardList[index].runAction(seq);
        };

        for (var index = 0; index < 4; index++) {
            var scale1;
            var scale2;
            var cf_setTexture;
            var seq;

            _loop(index);
        }
    },


    // 最后一张牌，开牌
    openLastCard: function openLastCard(cardData, lastCard, cardType, pCallback) {
        var $this = this;
        var cf_showResult = cc.callFunc(function () {
            var _loop2 = function _loop2(index) {
                moveTo = cc.moveTo(0.4, $this.cardPosList[0]);
                setSF = cc.callFunc(function () {
                    $this.cardList[index].getComponent("cc.Sprite").spriteFrame = sf_cardList._spriteFrames[cardData[index]];
                });
                moveTo1 = cc.moveTo(0.4, $this.cardPosList[index]);
                seq = cc.sequence(moveTo, setSF, moveTo1);
                // 最后一张牌

                if (index == 4) {
                    showType = cc.callFunc(function () {
                        $this.setCardType(cardType);
                        if (pCallback) {
                            pCallback();
                        }
                    });

                    seq = cc.sequence(moveTo, setSF, moveTo1, showType);
                }
                $this.cardList[index].runAction(seq);
            };

            for (var index = 0; index < 5; index++) {
                var moveTo;
                var setSF;
                var moveTo1;
                var seq;
                var showType;

                _loop2(index);
            }
        });

        // 是自己就翻牌
        if (this.isMySelf) {
            var scale1 = cc.scaleBy(0.4, 0.1, 1);
            var scale2 = cc.scaleBy(0.4, 10, 1);
            var delay = cc.delayTime(0.5);
            var cf_setTexture = cc.callFunc(function () {
                if (sf_cardList) {
                    $this.cardList[4].getComponent("cc.Sprite").spriteFrame = sf_cardList._spriteFrames[lastCard];
                }
            });
            var seq = cc.sequence(scale1, cf_setTexture, scale2, delay, cf_showResult);
            this.cardList[4].runAction(seq);
        } else {
            this.cardList[4].runAction(cf_showResult);
        }
    },


    /**
     * 设置赢得的分数
     * @param {*} nWinScore 
     * @param {*} nScore 
     */
    showResultScore: function showResultScore(nWinScore, nScore) {
        this.setScore(nScore);
        this.setWinScore(nWinScore);
    },


    /**
     * 重置player
     */
    resetPlayer: function resetPlayer() {
        this.setBanker(false);
        this.spType.node.active = false;
        this.cardNode.active = false;
        this.labelWinScore.node.active = false;
    }
});

cc._RF.pop();