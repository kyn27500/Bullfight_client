"use strict";
cc._RF.push(module, 'c317eS03PxPPrYr5wroGgIg', 'Ready');
// resources/Script/view/hall/Ready.js

"use strict";

var onfire = require("onfire"); //处理事件的类库
var requestHandler = require("RequestHandler");
var HallData = require("HallData");
var tools = require("Tools");
var events = require("CustomEvents");
var scenes = require("SceneList");
var config = require("config");
var texts = require("Text");
var globalData = require("Global");
var that;

cc.Class({
    extends: cc.Component,

    properties: {

        bgSprite: cc.Node,
        actionFrame: cc.SpriteFrame,

        // 提示文字
        tipLabel: cc.Label,

        // 我的头像
        myHead: cc.Sprite,
        myHeadContainer: cc.Node,
        myName: cc.Label,

        // 对手的头像
        opHead: cc.Sprite,
        opHeadContainer: cc.Node,
        opName: cc.Label,

        // VS
        vs: cc.Node,
        vsAni: cc.Animation,

        // 退出按钮
        btnCancel: cc.Button
    },

    onLoad: function onLoad() {
        // 创建监听
        onfire.on(events.hall.S2C_READY_OPPONENT, this.onReceive_otherReady);

        that = this;
    },
    start: function start() {
        this.createReadyAction();

        // 我的头像
        tools.loadRemoteImage(HallData.getUserInfo().icon, this.myHead);

        // 本地测试
        if (config.isTest) {
            this.schedule(function () {
                var data = {
                    otherIcon: HallData.getUserInfo().icon,
                    otherName: "测试用户"
                };
                this.onReceive_otherReady(data, {});
            }, 2);
        }
    },


    // 创建匹配动画
    createReadyAction: function createReadyAction() {

        this.stopReadyAction();
        var at = 3;
        var node = new cc.Node();
        var btn = node.addComponent(cc.Button);
        var self = this;
        this.bgSprite.addChild(node, 0, 1001);
        node.y = -50;

        btn.schedule(function () {
            var wave = new cc.Node();
            node.addChild(wave);
            var waveSprite = wave.addComponent(cc.Sprite);
            waveSprite.spriteFrame = self.actionFrame;

            wave.scale = 0.1;
            // 放大倍数
            var scaleAction = cc.scaleTo(3, 1);
            var fadeOut = cc.fadeOut(3);
            var spawn = cc.spawn(scaleAction, fadeOut);
            var cf_scale = cc.callFunc(function () {
                wave.scale = 0.1;
                wave.opacity = 255;
            });
            var seq = cc.sequence(spawn, cf_scale);
            var repeat = cc.repeatForever(seq);
            wave.runAction(repeat);
        }, 1, 3, 0.1);
    },


    //停止动画
    stopReadyAction: function stopReadyAction() {
        this.bgSprite.removeChildByTag(1001);
    },


    // 返回大厅
    onClickBtnCancel: function onClickBtnCancel() {
        console.log("取消匹配");
        var data = {
            appId: HallData.getCurGameInfo().appId,
            token: globalData.myUserInfo.token
        };
        requestHandler.sendRequest(events.hall.C2S_CANCEL_MATCH, data);
        cc.director.loadScene(scenes.hall.HALL, function () {
            onfire.fire(events.hall.HALL_DATA, HallData.rawData);
        });
    },


    // 对手准备完成
    onReceive_otherReady: function onReceive_otherReady(data1, data2) {
        console.log("otherReady:", JSON.stringify(data1));

        // 禁止取消
        that.btnCancel.node.active = false;

        // 文字
        that.tipLabel.string = texts.ready.MATCHED;
        that.myName.string = HallData.getUserInfo().name;
        that.opName.string = data1.otherName;

        // 对手头像
        tools.loadRemoteImage(data1.otherIcon, that.opHead);

        // 动画效果
        that.vsAni.play();
        that.stopReadyAction();
        that.myHeadContainer.runAction(cc.moveTo(0.6, 150, 774));
        that.scheduleOnce(function () {
            that.opHeadContainer.runAction(cc.moveTo(0.6, 500, 774));
        }, 0.5);
        that.scheduleOnce(function () {
            that.vs.active = true;
        }, 1);

        // 进入房间
        that.scheduleOnce(function () {
            console.log("--onReceive_otherReady");
            var curGameInfo = HallData.getCurGameInfo();
            onfire.on(events.game.S2C_LOGIN, function (data1, data2) {
                console.log("s_game_login=====", data1);
                // 切换场景
                console.log("------ login: ", curGameInfo.scene);
                cc.director.loadScene(curGameInfo.scene, function () {
                    onfire.fire(events.game.GAME_DATA, data1, data2);
                });
                onfire.un(events.game.S2C_LOGIN);
            });

            var data = {
                //appId:curGameInfo.appId,
                roomKey: data1.roomKey,
                myCode: data1.myCode
            };
            requestHandler.sendRequest(events.game.C2S_LOGIN, data);
        }, 2.5);
    },
    onDestroy: function onDestroy() {
        onfire.un(events.hall.S2C_READY_OPPONENT);
        onfire.un(events.hall.READY_LOADED);
    }
});

cc._RF.pop();