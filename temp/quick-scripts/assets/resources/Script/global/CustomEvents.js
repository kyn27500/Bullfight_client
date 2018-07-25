(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/global/CustomEvents.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7bab3AZ1ipIspNQpFW0Vlp9', 'CustomEvents', __filename);
// resources/Script/global/CustomEvents.js

"use strict";

var _game;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
     * 大厅数据
     */
    HALL_DATA: "hallData"
  },

  /**
   * 游戏事件
   */
  game: (_game = {
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
    C2S_SEAT_CHOOSE: "seatChooseC2S",

    /**
     * 服务端消息：强制登出
     */
    S2C_SEAT_CHOOSE: "seatChooseS2C",

    /**
     * 游戏数据
     */
    S2C_SYN_SEATS: "seatPlayersSyncOtherS2C",

    /**
     * 游戏准备
     */
    C2S_READY: "gameReadyC2S",

    /**
    * 游戏准备
    */
    S2C_READY: "gameReadyS2C",

    /**
     * 发送牌信息
     */
    S2C_CARDS: "userCardPlayS2C",

    /**
     * 押注
     */
    C2S_BET: "playerBetC2S",

    /**
     * 押注
     */
    S2C_BET: "playerBetS2C",

    /**
    * 服务端返回：游戏状态值
    */
    S2C_GAME_STATE: "gameStateS2C",

    /**
     * 抢庄
     */
    C2S_ROB_BANKER: "playerRobBankerC2S",

    /**
     * 抢庄回调
     */
    S2C_ROB_BANKER: "playerRobBankerS2C",

    /**
     * 抢庄结果回调
     */
    S2C_ROOM_BANKER: "roomBankerS2C"

  }, _defineProperty(_game, "C2S_BET", "playerBetC2S"), _defineProperty(_game, "S2C_BET", "playerBetS2C"), _defineProperty(_game, "S2C_LAST_CARD", "lastOneCardS2C"), _defineProperty(_game, "C2S_OPEN_CARD", "CardShowResultC2S"), _defineProperty(_game, "S2C_OPEN_CARD", "cardShowResultS2C"), _game),

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
        