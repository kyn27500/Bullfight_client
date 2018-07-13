"use strict";
cc._RF.push(module, '5e732oCXnJJN64s4jWLQxoD', 'Constants');
// resources/Script/global/Constants.js

"use strict";

/**
 * 各种常量
 */
var Constants = {
    /**
     * 性别
     */
    gender: {
        /**
         * 女
         */
        FEMALE: 0,

        /**
         * 男
         */
        MALE: 1
    },

    /**
     * 大厅相关
     */
    hall: {
        LOCAL_LOGIN: "local_login"
    },

    /**
     * 游戏相关
     */
    game: {
        /**
         * 斗兽棋
         */
        doushouqi: {
            ASK_FOR_DRAW: "qiuhe",
            BACK: "back",
            SURRENDER: "renshu",
            EXIT: "exit",
            BUTTON_REFUSE: "btn_refuse",
            BUTTON_AGREE: "btn_agree",
            COMPONENT_ANIMAL: "Animal",
            ANI_UP: "up",
            ANI_DOWN: "down",
            ANI_LEFT: "left",
            ANI_RIGHT: "right",
            ANI_DESTROY: "destory",
            OBJ_RED: "red"
        },

        /**
         * 开锁达人
         */
        lock: {
            ANI_RESET: "reset"
        },

        /**
         * 连连看
         */
        lianliankan: {
            ANI_RUN: "run",
            BUTTON_BACK: "btnBack",
            BUTTON_HELP: "btnHelp"
        }
    }
};

module.exports = Constants;

cc._RF.pop();