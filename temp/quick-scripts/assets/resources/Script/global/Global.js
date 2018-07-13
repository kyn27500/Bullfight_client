(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/global/Global.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2b420ua1w1NHqbDxm/aKOfg', 'Global', __filename);
// resources/Script/global/Global.js

"use strict";

var onfire = require("onfire");
var events = require("CustomEvents");
var tools = require("Tools");
var texts = require("Text");
var scenes = require("SceneList");

/**
 * 全局对象
 */
var Global = {
    /**
     * 是否禁用自动登录
     */
    disableAutoLogin: false,

    /**
     * 我的用户信息
     */
    myUserInfo: null,

    /**
     * 对手的用户信息
     */
    otherUserInfo: null,

    /**
     * 监听强制登出事件
     */
    onLogout: function onLogout() {
        console.log("onLogout");
        console.log(events.game.S2C_LOGOUT);
        onfire.on(events.game.S2C_LOGOUT, Global.onLogout_callback);
    },

    /**
     * 取消监听强制登出事件
     */
    offLogout: function offLogout() {
        onfire.un(events.game.S2C_LOGOUT);
    },

    /**
     * 强制登录回调
     */
    onLogout_callback: function onLogout_callback() {
        tools.showMessageDialog(texts.hall.PROMPT, texts.hall.LOGOUT);
        Global.disableAutoLogin = true;
        if (cc.director.getScene().name != scenes.hall.LOGIN_SCENE) {
            cc.director.loadScene(scenes.hall.LOGIN_SCENE);
        }
    }
};

module.exports = Global;

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
        //# sourceMappingURL=Global.js.map
        