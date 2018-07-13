"use strict";
cc._RF.push(module, '1ddc5aq6wVEWoAfGPFfMICs', 'SceneList');
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