var cartTypeAtlas;
var sf_cardList;
cc.Class({
    extends: cc.Component,

    properties: {

        data: null,
        spHead: cc.Sprite,         //头像
        spSgin: cc.Sprite,         //右上角标识
        labelName: cc.Label,       //名字
        labelScore: cc.Label,      //分数
        cardNode: cc.Node,         //牌背面
        spReady: cc.Sprite,        //已准备
        labelBet: cc.Label,        //下注倍数
        spType: cc.Sprite,         //牌型
        labelWinScore: cc.Label,   //赢得的分数
        ctAtlas: cc.SpriteAtlas,   //图集 牛牛类型
        isMySelf: null,           //是否是自己

        cardList: [],                //牌列表
        cardPosList: [],             //牌坐标 列表

        sf_cardBg: cc.SpriteFrame,
        sf_cardList: cc.SpriteAtlas, //牌资源
    },

    // use this for initialization
    onLoad: function () {
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
    create(data, isMySelf) {

        data = data || {
            user: {
                name: "测试"
            },
            score: 100,
            ready: false,
            banker: false,
        }
        this.data = data;
        // this.isMySelf = isMySelf;
        this.node.active = true;
        this.labelName.string = data.user.name;
        this.labelScore.string = data.score;

        this.labelBet.node.active = false;
        this.spType.node.active = false;
        this.cardNode.active = false;
        this.labelWinScore.node.active = false;

        var index = 0;
        this.cardNode.getChildren().forEach(element => {
            this.cardList[index] = element;
            this.cardPosList[index] = element.getPosition();
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
    sitUp() {
        this.node.active = false;
    },

    /**
     * 设置分数
     * @param {*} nScore 
     */
    setScore(nScore) {
        this.labelScore.string = nScore;
    },

    /**
     * 设置是否显示准备
     * @param {*} isReady 
     */
    setReady(isReady) {
        if (this.spReady) {
            this.spReady.node.active = isReady;
        }
    },

    /**
     * 设置牌型
     * @param {*} pType 
     */
    setCartType(pType) {
        this.spType.node.active = true
        this.spType.spriteFrame = cartTypeAtlas.getSpriteFrame(pType);
    },

    /**
     * 设置是否是庄家
     * @param {*} isBanker 
     */
    setBanker(isBanker) {
        // this.spSgin.parent.node.getChildByName("border").node.active = isBanker;
        this.spSgin.node.active = isBanker;
    },

    /**
     * 发牌动画
     */
    sendCardAction(centerNode, cardData, pCallback) {
        console.log("--- 发牌动画！");

        let windowSize = cc.view.getVisibleSize();
        var pos = centerNode.convertToWorldSpace(cc.p(0, 0))
        pos = this.cardNode.convertToNodeSpace(pos);

        this.cardNode.active = true;

        for (let index = 0; index < 5; index++) {

            this.cardList[index].setPosition(pos);
            this.cardList[index].getComponent("cc.Sprite").spriteFrame = sf_cardList._spriteFrames['back_2'];

            var delay = cc.delayTime(index * 0.05);
            var move = cc.moveTo(0.2, this.cardPosList[index]);
            var seq = cc.sequence(delay, move);

            if (index == 4 && this.isMySelf) {
                var $this = this;
                var cf_openCard = cc.callFunc(function () {
                    $this.open4Card(cardData);
                })
                seq = cc.sequence(delay, move, cf_openCard);
            }
            this.cardList[index].runAction(seq);
        }

        var node = new cc.Node('myNode')
        const sprite = node.addComponent(cc.Sprite)
        sprite.spriteFrame = this.sf_cardBg;
        node.setPosition(pos);
        this.cardNode.addChild(node)


        if (pCallback) {
            pCallback()
        };
    },

    /**
     * 打开四张牌
     * @param {*} cardData 
     */
    open4Card(cardData) {
        var $this = this;
        for (let index = 0; index < 4; index++) {
            var scale1 = cc.scaleBy(0.5, 0.1, 1);
            var scale2 = cc.scaleBy(0.5, 10, 1);
            var cf_setTexture = cc.callFunc(function () {
                if (sf_cardList) {
                    $this.cardList[index].getComponent("cc.Sprite").spriteFrame = sf_cardList._spriteFrames[cardData[index]];
                }

            })
            var seq = cc.sequence(scale1, cf_setTexture, scale2);

            this.cardList[index].runAction(seq);
        }

    },

    // 最后一张牌，开牌
    openLastCard(cardData, lastCard, cardType) {
        var $this = this;
        var cf_showResult = cc.callFunc(function () {

            for (let index = 0; index < 5; index++) {
                var moveTo = cc.moveTo(0.4, $this.cardPosList[0])
                var setSF = cc.callFunc(function () {
                    $this.cardList[index].getComponent("cc.Sprite").spriteFrame = sf_cardList._spriteFrames[cardData[index]];
                });
                var moveTo1 = cc.moveTo(0.4, $this.cardPosList[index]);
                var seq = cc.sequence(moveTo, setSF, moveTo1);
                $this.cardList[index].runAction(seq);
            }
        });

        var scale1 = cc.scaleBy(0.4, 0.1, 1);
        var scale2 = cc.scaleBy(0.4, 10, 1);
        var delay = cc.delayTime(0.5);
        var cf_setTexture = cc.callFunc(function () {
            if (sf_cardList) {
                $this.cardList[4].getComponent("cc.Sprite").spriteFrame = sf_cardList._spriteFrames[lastCard];
            }
        })
        var seq = cc.sequence(scale1, cf_setTexture, scale2, delay, cf_showResult);
        this.cardList[4].runAction(seq);
    },



});
