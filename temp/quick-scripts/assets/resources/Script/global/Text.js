(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/global/Text.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7bbd52T/G9FGLqGDTidOaeT', 'Text', __filename);
// resources/Script/global/Text.js

"use strict";

/**
 * 文本定义
 */
var Text = {
    /**
     * 匹配界面
     */
    ready: {
        MATCHED: "匹配成功"
    },

    /**
     * 结果界面
     */
    result: {
        WIN: "胜利",
        DRAW: "平局",
        FAIL: "失败"
    },

    /**
     * 大厅
     */
    hall: {
        LOGIN_FAILED: "登录失败！",
        WECHAT_LOGIN_FAILED: "微信登录失败: ",
        WECHAT_INSTALL_FIRST: "请先安装微信",
        RETRY: "重试 ",
        SECOND_INITIAL: "s",
        CONNECTION_LOST: "与服务器的连接丢失，请重新登录！",
        LOGOUT: "您的帐号已在其他设备上登录！",
        PROMPT: "提示",
        PLAYER_COUNT: "对在玩"
    },

    /**
     * 游戏
     */
    game: {
        /**
         * 斗兽棋
         */
        doushouqi: {
            AGREE: "同意",
            REFUSE: "拒绝",
            ASK_FOR_DRAW: "对方求和,是否同意?",
            ASK_FOR_DRAW_DENIED: "对方拒绝求和!",
            SURRENDER_CONFIRM: "您确定认输吗?",
            EXIT_CONFIRM: "您确定要认输并退出游戏吗?",
            WAITING_FOR_OPPONENT: "等待其他玩家操作完成",
            CANNOT_CONTROL_OPPONENT: "不可以操作其他玩家棋子"
        }
    }
};

module.exports = Text;

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
        //# sourceMappingURL=Text.js.map
        