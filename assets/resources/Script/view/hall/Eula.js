var scenes = require("SceneList");
var globalData = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        sprBack: cc.Sprite,
    },

    onLoad() {
        this.sprBack.node.on(cc.Node.EventType.TOUCH_START, this.sprBack_onTouchStart, this);
    },

    sprBack_onTouchStart: function(event, customEventData) {
        globalData.disableAutoLogin = true;
        cc.director.loadScene(scenes.hall.LOGIN_SCENE);
    }
});