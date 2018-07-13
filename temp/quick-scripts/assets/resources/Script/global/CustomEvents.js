(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/global/CustomEvents.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7bab3AZ1ipIspNQpFW0Vlp9', 'CustomEvents', __filename);
// resources/Script/global/CustomEvents.js

"use strict";

/**
 * 事件定义
 */
var CustomEvents = {
  /**
   * 通用事件
   */
  common: {
    /**
     * 服务端请求：心跳
     */
    S2C_HEARTBEAT: "s_common_heartbeat",

    /**
     * 客户端回应：心跳
     */
    C2S_HEARTBEAT: "c_common_heartbeat"
  },

  /**
   * onfire事件
   */
  onfire: {
    /**
     * onfire：连接打开
     */
    OPEN: "onopen",

    /**
     * onfire：连接关闭
     */
    CLOSE: "onclose",

    /**
     * onfire：消息
     */
    MESSAGE: "onmessage",

    /**
     * onfire：错误
     */
    ERROR: "onerror"
  },

  /**
   * 大厅事件
   */
  hall: {
    /**
     * 客户端请求：获取手机验证码
     */
    C2S_GET_PHONE_CODE: "c_daTing_getPhoneCode",

    /**
     * 客户端请求：登录
     */
    C2S_LOGIN: "c_daTing_login",

    /**
     * 服务端返回：登录结果
     */
    S2C_LOGIN: "s_daTing_login",

    /**
     * 客户端请求: 加入房间
     */
    userJoinRoomC2S: "userJoinRoomC2S",

    /**
     * 服务端返回：加入房间
     */
    userJoinRoomS2C: "userJoinRoomS2C",

    /**
     * 服务端返回：对手已就绪
     */
    S2C_READY_OPPONENT: "s_daTing_otherReady",

    /**
     * 客户端请求：取消匹配
     */
    C2S_CANCEL_MATCH: "c_daTing_cancelMatch",

    /**
     * 大厅数据
     */
    HALL_DATA: "hallData"
  },

  /**
   * 游戏事件
   */
  game: {
    /**
     * 客户端请求：登录
     */
    C2S_LOGIN: "c_game_login",

    /**
     * 服务端返回：登录信息
     */
    S2C_LOGIN: "s_game_login",

    /**
     * 客户端请求：强制退出
     */
    C2S_EXIT_GAME: "c_game_exit",

    /**
     * 服务端消息：强制登出
     */
    S2C_LOGOUT: "s_game_logout",

    /**
     * 游戏数据
     */
    GAME_DATA: "gameData",

    /**
     * 开锁达人
     */
    lock: {
      /**
       * 开始游戏
       */
      S2C_START: "s_kaiSuoDaRen_start",

      /**
       * 更新进度
       */
      S2C_PROGRESS: "s_kaiSuoDaRen_progress",

      /**
       * 游戏结束
       */
      S2C_GAMEOVER: "s_kaiSuoDaRen_overGame",

      /**
       * 命中
       */
      S2C_HIT: "c_kaiSuoDaRen_play"
    },

    /**
     * 跳一跳
     */
    tiaoyitiao: {
      /**
       * 开始游戏
       */
      S2C_START: "s_tiaoYiTiao_start",

      /**
       * 更新进度
       */
      S2C_PROGRESS: "s_tiaoYiTiao_progress",

      /**
       * 游戏结束
       */
      S2C_GAMEOVER: "s_tiaoYiTiao_overGame",

      /**
       * 行进
       */
      S2C_PLAY: "s_tiaoYiTiao_play",

      C2S_PLAY: "c_tiaoYiTiao_play"
    },

    /**
     * 斗兽棋
     */
    doushouqi: {
      S2C_START: "s_douShouQi_start",
      S2C_GAMEOVER: "s_douShouQi_overGame",
      S2C_MOVE: "s_douShouQi_move",
      S2C_TALK: "s_douShouQi_talk",
      S2C_ANIMAL: "s_douShouQi_animal",
      S2C_ASK_FOR_DRAW: "s_douShouQi_qiuHeOther",
      S2C_ASK_FOR_DRAW_AGREE: "s_douShouQi_qiuHeAgreeOther",
      C2S_ASK_FOR_DRAW: "c_douShouQi_qiuHe",
      C2S_ASK_FOR_DRAW_AGREE: "c_douShouQi_qiuHeAgree",
      C2S_SURRENDER: "c_douShouQi_renShu",
      C2S_MOVE: "c_douShouQi_move",
      C2S_ANIMAL: "c_douShouQi_animal"
    },

    /**
     * 连连看
     */
    lianliankan: {
      /**
       * 开始游戏
       */
      S2C_START: "s_lianLianKan_start",

      /**
       * 更新进度
       */
      S2C_PROGRESS: "s_lianLianKan_progress",

      /**
       * 游戏结束
       */
      S2C_GAMEOVER: "s_lianLianKan_overGame",

      /**
       * 行进
       */
      S2C_PLAY: "s_lianLianKan_play",

      C2S_PLAY: "c_lianLianKan_play"
    }
  },

  /**
   * 预制事件
   */
  prefab: {
    /**
     * 结果界面
     */
    result: {
      /**
       * 结果数据
       */
      DATA: "resultData",

      /**
       * 资源加载完毕
       */
      RES_LOADED: "resLoaded"
    }
  }
};

module.exports = CustomEvents;

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
        //# sourceMappingURL=CustomEvents.js.map
        