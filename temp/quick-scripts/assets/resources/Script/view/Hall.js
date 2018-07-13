(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/Hall.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c27bduAs55Bq4H6Ycj86m6e', 'Hall', __filename);
// resources/Script/view/Hall.js

"use strict";

var self;
var serverConnect = require("ServerConnect");
var requestHandler = require("RequestHandler");
var onfire = require("onfire");
var events = require("CustomEvents");

cc.Class({
    extends: cc.Component,

    properties: {

        labelNotice: cc.Label,
        labelName: cc.Label,
        labelPlayerId: cc.Label,
        labelScore: cc.Label,

        btnRoom_niuniu: cc.Button,
        btnJoinRoom: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;

        serverConnect.connect(true);
        onfire.on(events.onfire.OPEN, this.onServerConnectOpen);
        onfire.on(events.onfire.ERROR, this.onServerConnectError);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    start: function start() {

        var data = {
            name: "唱山歌",
            playerId: 123,
            notice: "我是公告！",
            score: 23422
        };
        self.setUserInfo(data);
    },
    onDestroy: function onDestroy() {},


    onServerConnectError: function onServerConnectError(obj) {
        console.log(JSON.stringify(obj));
    },

    onServerConnectOpen: function onServerConnectOpen() {
        console.log("server connected");
        onfire.un(events.onfire.OPEN);

        onfire.on(events.hall.S2C_LOGIN, function (data1, data2) {
            console.log("s_game_login=====", data1);
            onfire.un(events.hall.S2C_LOGIN);
        });

        var data = {
            loginId: 123
        };
        requestHandler.sendRequest(events.hall.C2S_LOGIN, data);
    },

    joinRoom: function joinRoom() {
        var onResourceLoaded = function onResourceLoaded(errorMessage, loadedResource) {
            //检查失败原因
            if (errorMessage) {
                cc.log('加载失败, 原因:' + errorMessage);
                return;
            }
            if (!(loadedResource instanceof cc.Prefab)) {
                cc.log('类型不对！');
                return;
            } //這個是型別的檢查

            //接著，我們就可以進行實例化了
            var gamePrefab = cc.instantiate(loadedResource);
            self.node.addChild(gamePrefab);
        };
        //這邊才是真的使用cc.loader進行載入，並且呼叫我們上面寫的方法
        cc.loader.loadRes("Prefab/join_room", onResourceLoaded);
    },
    setUserInfo: function setUserInfo(data) {
        self.labelName.string = data.name;
        self.labelPlayerId.string = data.playerId;
        self.labelNotice.string = data.notice;
        self.labelScore.string = data.score;
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
        //# sourceMappingURL=Hall.js.map
        