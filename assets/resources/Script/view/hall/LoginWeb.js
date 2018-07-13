var onfire = require("onfire");
var events = require("CustomEvents");
var tools = require("Tools");
var texts = require("Text");
var requestHandler = require("RequestHandler");
var serverConnect = require("ServerConnect");
var scenes = require("SceneList");
var that;

cc.Class({
    extends: cc.Component,

    properties: {
        lblText: cc.Label,
    },

    onServerConnectError: function(obj) {
        console.log(JSON.stringify(obj));
        that.lblText.string = texts.hall.LOGIN_FAILED;
    },

    onServerConnectOpen: function() {
        console.log("server connected");
        onfire.un(events.onfire.OPEN);

        // 向服务端发送登录信息
        var data = {
            phone: "",
            phoneCode: "",
            wechatCode: "",
            token: window.location.search.substring(1),
        };
        requestHandler.sendRequest(events.hall.C2S_LOGIN, data);

        // 大厅登录信息
        onfire.on(events.hall.S2C_LOGIN, function(data1, data2) {
            if (data1.success == 0) {
                console.log(JSON.stringify(data1));

                // 切换场景
                cc.director.loadScene(scenes.hall.HALL, function() {
                    onfire.fire(events.hall.HALL_DATA, data1, data2);
                });
            } else {
                that.lblText.string = texts.hall.LOGIN_FAILED;
            }

            onfire.un(events.hall.S2C_LOGIN);
        });
    },

    onLoad() {
        that = this;
        if (!tools.isBrowser()) {
            that.lblText.string = texts.hall.LOGIN_FAILED;
            return;
        }

        if (window.location.search == "") {
            that.lblText.string = texts.hall.LOGIN_FAILED;
            return;
        }

        serverConnect.connect();
        onfire.on(events.onfire.OPEN, that.onServerConnectOpen, that);
        onfire.on(events.onfire.ERROR, that.onServerConnectError, that);
    },

    onDestroy() {
        onfire.un(events.onfire.OPEN);
        onfire.un(events.onfire.ERROR);
        onfire.un(events.hall.S2C_LOGIN);
    },
});