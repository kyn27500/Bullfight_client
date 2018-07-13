(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/prefabs/GameResult.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '60035qRlWFH77OgHakXIS2/', 'GameResult', __filename);
// resources/Script/view/prefabs/GameResult.js

"use strict";

var RESULT_DRAW = 0;
var RESULT_WIN = 1;
var RESULT_FAIL = -1;

var onfire = require("onfire");
var tools = require("Tools");
var events = require("CustomEvents");
var HallData = require("HallData");
var scenes = require("SceneList");
var requestHandler = require("RequestHandler");
var texts = require("Text");
var consts = require("Constants");

var resultData = null;

cc.Class({
    extends: cc.Component,

    properties: {
        // 头像
        sprPortraitTop: cc.Sprite,
        sprPortraitLeft: cc.Sprite,
        sprPortraitRight: cc.Sprite,

        // 名称
        lblNameLeft: cc.Label,
        lblNameRight: cc.Label,

        // 性别
        ndGenderLeftMale: cc.Node,
        ndGenderRightMale: cc.Node,
        ndGenderLeftFemale: cc.Node,
        ndGenderRightFemale: cc.Node,

        // 比分
        lblScore: cc.Label,

        // 彩纸
        ndConfetti: cc.Node,

        // 框体
        ndFrameWin: cc.Node,
        ndFrameDraw: cc.Node,
        ndFrameFail: cc.Node,

        // 彩带
        ndRibbonWin: cc.Node,
        ndRibbonDraw: cc.Node,
        ndRibbonFail: cc.Node,

        // 彩带文字
        lblRibbonText: cc.Label,

        // 乌云
        ndCloud: cc.Node,

        // 皇冠
        ndCrown: cc.Node,

        // 再来一局
        btnAgain: cc.Button,

        // 音效
        sndWin: cc.AudioSource,
        sndDraw: cc.AudioSource,
        sndFail: cc.AudioSource
    },

    onLoad: function onLoad() {
        // 获取结果数据
        onfire.on(events.prefab.result.DATA, this.onResultData, this);
    },

    onResultData: function onResultData(data) {
        onfire.un(events.prefab.result.DATA);
        console.log("resultData:", JSON.stringify(data));
        resultData = data;

        // 头像
        tools.loadRemoteImage(data.topPortrait, this.sprPortraitTop);
        tools.loadRemoteImage(data.leftPortrait, this.sprPortraitLeft);
        tools.loadRemoteImage(data.rightPortrait, this.sprPortraitRight);

        // 名称
        this.lblNameLeft.string = data.leftName;
        this.lblNameRight.string = data.rightName;

        // 性别
        this.ndGenderLeftFemale.active = data.leftGender == consts.gender.FEMALE;
        this.ndGenderLeftMale.active = data.leftGender == consts.gender.MALE;
        this.ndGenderRightFemale.active = data.rightGender == consts.gender.FEMALE;
        this.ndGenderRightMale.active = data.rightGender == consts.gender.MALE;

        // 根据结果进行对应处理
        switch (data.result) {
            case RESULT_WIN:
                this.ndCloud.active = false;
                this.ndFrameDraw.active = false;
                this.ndFrameFail.active = false;
                this.ndRibbonDraw.active = false;
                this.ndRibbonFail.active = false;
                this.sndWin.play();
                break;

            case RESULT_DRAW:
                this.ndCloud.active = false;
                this.ndCrown.active = false;
                this.ndConfetti.active = false;
                this.ndFrameWin.active = false;
                this.ndFrameFail.active = false;
                this.ndRibbonWin.active = false;
                this.ndRibbonFail.active = false;
                this.lblRibbonText.node.color = new cc.Color(3, 130, 43);
                this.lblRibbonText.string = texts.result.DRAW;
                this.sndDraw.play();
                break;

            case RESULT_FAIL:
                this.ndCrown.active = false;
                this.ndConfetti.active = false;
                this.ndFrameWin.active = false;
                this.ndFrameDraw.active = false;
                this.ndRibbonDraw.active = false;
                this.ndRibbonWin.active = false;
                this.lblRibbonText.node.color = new cc.Color(255, 255, 255);
                this.lblRibbonText.string = texts.result.FAIL;
                this.sndFail.play();
                break;
        }
    },

    btnAgain_onClick: function btnAgain_onClick(customEventData) {
        cc.director.loadScene(scenes.hall.READY, function () {
            var dt = {
                appId: resultData.appId
            };
            requestHandler.sendRequest(events.hall.C2S_GAME_READY, dt);
        });
    },

    btnBack_onClick: function btnBack_onClick(customEventData) {
        cc.director.loadScene(scenes.hall.HALL, function () {
            onfire.fire(events.hall.HALL_DATA, HallData.rawData);
        });
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
        //# sourceMappingURL=GameResult.js.map
        