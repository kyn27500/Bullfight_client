(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/config.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aec36RorH1OQIeXBw1n+Du5', 'config', __filename);
// resources/Script/config.js

"use strict";

var config = {

    // 网络模式
    isNetwork: true,

    // 测试模式
    isTest: false,

    gameInfoList: [{ appId: 1, appName: "连连看", icon: "lianliankan", people: 487064, scene: "lianliankan" }, { appId: 2, appName: "斗兽棋", icon: "doushouqi", people: 2130, scene: "doushouqi" }, { appId: 3, appName: "开锁达人", icon: "kaisuodaren", people: 414950, scene: "lock" }, { appId: 4, appName: "消砖块", icon: "xiaozhuankuai", people: 460481, scene: "xiaozhuankuai" }, { appId: 5, appName: "跳一跳", icon: "tiaoyitiao", people: 396168, scene: "tiaoyitiao" }]
};

module.exports = config;

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
        //# sourceMappingURL=config.js.map
        