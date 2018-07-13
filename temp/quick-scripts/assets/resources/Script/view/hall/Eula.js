(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/hall/Eula.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e9c6dr9nudK3ZX0qXXKCn7O', 'Eula', __filename);
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
        //# sourceMappingURL=Eula.js.map
        