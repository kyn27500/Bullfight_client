(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/global/SceneList.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1ddc5aq6wVEWoAfGPFfMICs', 'SceneList', __filename);
// resources/Script/global/SceneList.js

"use strict";

/**
 * 场景列表
 */
var SceneList = {
    UPDATE: "UpdateScene",

    /**
     * 大厅场景
     */
    hall: {
        LOGIN_PHONE: "LoginPhone",
        LOGIN_SCENE: "LoginScene",
        EULA: "eula",
        HALL: "hall",
        READY: "ready"
    },

    /**
     * 游戏场景
     */
    games: {
        DOU_SHOU_QI: "doushouqi",
        LIAN_LIAN_KAN: "lianliankan",
        LOCK: "lock",
        TIAO_YI_TIAO: "tiaoyitiao",
        XIAO_ZHUAN_KUAI: "xiaozhuankuai"
    }
};

module.exports = SceneList;

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
        //# sourceMappingURL=SceneList.js.map
        