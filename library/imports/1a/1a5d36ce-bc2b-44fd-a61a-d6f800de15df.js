"use strict";
cc._RF.push(module, '1a5d3bOvCtE/aYa1vgA3hXf', 'NativeInterface');
// resources/Script/global/NativeInterface.js

"use strict";

/**
 * 原生接口
 */
var NativeInterface = {
  /**
   * 安卓
   */
  android: {
    /**
     * 包路径
     */
    PACKAGE_PATH: "com/wisegames/yzb/JsInterface",

    /**
     * 方法
     */
    methods: {
      /**
       * 显示消息
       */
      SHOW_TOAST: "showToast",

      /**
       * 显示对话框
       */
      SHOW_DIALOG: "showDialog",

      /**
       * 判断微信是否安装
       */
      IS_WECHAT_APP_INSTALLED: "isWxAppInstalled",

      /**
       * 微信登录
       */
      WECHAT_LOGIN: "wxLogin",

      /**
       * 判断微信是否正在登录中
       */
      IS_WECHAT_LOGGING: "isWXLogging",

      /**
       * 获取微信访问代码
       */
      GET_WECHAT_ACCESS_CODE: "getWxAccessCode",

      /**
       * 设置微信登录状态
       */
      SET_WECHAT_LOGGING: "setWXLogging"
    }
  },

  ios: {}
};

module.exports = NativeInterface;

cc._RF.pop();