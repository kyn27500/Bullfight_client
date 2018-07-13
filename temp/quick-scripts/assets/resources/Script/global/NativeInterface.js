(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/global/NativeInterface.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1a5d3bOvCtE/aYa1vgA3hXf', 'NativeInterface', __filename);
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
        //# sourceMappingURL=NativeInterface.js.map
        