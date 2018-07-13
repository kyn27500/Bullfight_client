"use strict";
cc._RF.push(module, 'e9c6dr9nudK3ZX0qXXKCn7O', 'Eula');
// resources/Script/view/hall/Eula.js

"use strict";

var scenes = require("SceneList");
var globalData = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        sprBack: cc.Sprite
    },

    onLoad: function onLoad() {
        this.sprBack.node.on(cc.Node.EventType.TOUCH_START, this.sprBack_onTouchStart, this);
    },


    sprBack_onTouchStart: function sprBack_onTouchStart(event, customEventData) {
        globalData.disableAutoLogin = true;
        cc.director.loadScene(scenes.hall.LOGIN_SCENE);
    }
});

cc._RF.pop();