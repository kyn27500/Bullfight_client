(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/games/Xiaozhuankuai/Xiaozhuankuai.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4bacd+W7vVIabiNqxG7PfyO', 'Xiaozhuankuai', __filename);
// resources/Script/view/games/Xiaozhuankuai/Xiaozhuankuai.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var config = require("config");

// 速度/s
var m_speed = 100;
// 四条格的宽度
var m_spaceX = cc.winSize.width / 8;
// 每一行的高度
var m_spaceY = 100;
// 起始高度
var m_startHeight = 0;

cc.Class({
    extends: cc.Component,

    properties: {

        // 破碎砖块资源
        sfBrickBreak: cc.SpriteFrame,
        brickLine1: cc.Prefab,
        brickLine2: cc.Prefab,
        quantao: cc.Prefab,
        spriteBg: cc.Node,

        dandao1: cc.Node,
        dandao2: cc.Node,
        dandao3: cc.Node,
        dandao4: cc.Node,
        scrollNode: cc.Node,
        timer: cc.Button,
        playNode: cc.Node,
        animClip: cc.AnimationClip,

        // 定义变量
        curCreateIndex: 0,
        curHeight: 0,
        curPlayIndex: 0

    },

    onLoad: function onLoad() {

        // 设置滚动节点的 初始高度
        this.scrollNode.y = m_startHeight;

        this.initData();

        this.startTime = new Date().getTime();

        this.registerTouchEvent();
    },
    start: function start() {},
    update: function update() {

        if (this.startTime) {

            var passTime = (new Date().getTime() - this.startTime) / 1000;
            var passHeight = passTime * m_speed;
            this.curHeight = m_startHeight - passHeight;
            this.scrollNode.y = this.curHeight;
        }

        if (this.gameData) {
            // 默认添加行数
            var maxHeiht = m_startHeight - this.scrollNode.y + 10 * m_spaceY;
            var maxIndex = Math.ceil(maxHeiht / m_spaceY);
            if (maxIndex > this.gameData.length) {
                this.gameData.push.apply(this.gameData, this.originalData);
            }
            if (this.curCreateIndex < maxIndex) {
                for (var index = this.curCreateIndex; index < maxIndex; index++) {
                    if (this.gameData[index]) {
                        var node = this.createBrickLine(this.gameData[index]);
                        node.y = index * m_spaceY;
                        this.scrollNode.addChild(node, 0, index);
                    }
                }
                this.curCreateIndex = maxIndex;
            }
        }
    },
    onDestroy: function onDestroy() {},


    /**
     * 初始化数据
     */
    initData: function initData() {
        // if (!config.isNetwork) {
        this.gameData = [null, null, null, null, null, null, null, null];
        this.gameAddData = [];
        this.originalData = [];
        var count = 100;
        for (var index = 0; index < count; index++) {
            this.originalData[index] = Math.floor(Math.random() * 10 % 4 + 1) * 10 + (Math.random() < 0.5 ? 5 : 6);
        }
        this.isPlay = true;
        // }
        this.curPlayIndex = this.gameData.length;
        this.gameData.push.apply(this.gameData, this.originalData);
    },


    /**
     * 加载资源
     */
    initRes: function initRes() {},


    /**
     * 创建 一行砖块 
     * @param {*} nNum 一行的砖块数据，15，16，
     */
    createBrickLine: function createBrickLine(nNum) {
        var bid = nNum % 10;
        var noBrickId = (nNum - bid) / 10;
        var brickLine = cc.instantiate(bid == 5 ? this.brickLine1 : this.brickLine2);
        brickLine.getChildByName("brick" + noBrickId).active = false;
        return brickLine;
    },


    // 注册监听
    registerTouchEvent: function registerTouchEvent() {
        var self = this;
        var began = function began(event) {
            if (this.isPlay) {
                // this.isPlay = false;
                var posX = event.touch.getLocation().x;
                var touchId = Math.ceil(posX / (cc.winSize.width / 4));

                // 计算消除的行数
                this.clearBrick(touchId, function () {
                    self.runBrickAnimation();
                });
            }
        };
        this.spriteBg.on("touchstart", began, this);
    },


    /**
     * 计算消除的行数
     * @param {*} touchId 点击的行数
     */
    play: function play(nTouchId, nCurPlayId) {
        var ret = {
            isBreak: false,
            isAdd: false
        };

        var line = [];
        var addBrick = [];
        for (var index = nCurPlayId; index < this.gameData.length; index++) {

            var curData = this.gameData[index];
            if (!curData) {
                line.push(index);
            }

            var brickId = curData % 10;
            var wayId = (curData - brickId) / 10;

            //消除
            if (wayId == nTouchId && !ret.isAdd) {
                line.push(index);
                this.curPlayIndex = index + 1;
                if (brickId == 6) {
                    ret.isBreak = true;
                    break;
                }
            } else {
                //添加元素
                if (nCurPlayId == index) {
                    ret.isAdd = true;
                    if (curData < 100) {
                        this.gameData[index - 1] = Number("12345").replace(wayId, "");
                        addBrick.push([index - 1, wayId]);
                        this.curPlayIndex = index - 1;
                    } else {
                        this.gameData[index] = Number(curData.toString()).replace(wayId, "");
                    }

                    break;
                } else {
                    if (ret.isAdd) {
                        if (wayId == nTouchId) {}
                    }
                    break;
                }
            }
        }
        ret.line = line;

        return ret;
    },


    //消除砖块
    clearBrick: function clearBrick(touchId, callback) {
        var self = this;

        var jtNode = cc.instantiate(this.quantao);
        this.playNode.addChild(jtNode);
        jtNode.x = (2 * touchId - 1) * m_spaceX;

        self["dandao" + touchId].active = true;
        // 计算上升高度
        var moveHeight = 200;
        var at = 0.00025 * moveHeight;
        var moveUp = cc.moveBy(at, cc.p(0, moveHeight));
        var cf_runEffect = cc.callFunc(function (pNode) {
            self["dandao" + touchId].active = false;
            pNode.removeFromParent();
            if (callback) {
                callback();
            }
        });
        var seq = cc.sequence(moveUp, cf_runEffect);
        jtNode.runAction(seq);
    },


    // 消除动画
    runBrickAnimation: function runBrickAnimation(idList, callback) {
        var _this = this;

        var _loop = function _loop(index) {
            _this.scrollNode.removeChildByTag(idList[index]);
            node = new cc.Node();

            node.addComponent(cc.Sprite);
            _this.scrollNode.addChild(node, 0, idList[index]);

            node.x = cc.winSize.width / 2;
            node.y = index * m_spaceY;

            anim = node.addComponent(cc.Animation);
            // 注册

            anim.on('finished', function () {
                this.scrollNode.removeChildByTag(idList[index]);
                if (callback) {
                    callback();
                }
            }, _this);

            clip = _this.animClip;

            clip.name = "run";
            anim.addClip(clip);
            anim.play('run');
        };

        for (var index = 0; index < idList.length; index++) {
            var node;
            var anim;
            var clip;

            _loop(index);
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Xiaozhuankuai.js.map
        