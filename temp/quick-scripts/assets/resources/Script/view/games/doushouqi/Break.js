(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/games/doushouqi/Break.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2642bmwGlZDeYqG6Hr62KU3', 'Break', __filename);
// resources/Script/view/games/doushouqi/Break.js

"use strict";

/**
 * @brief: 斗兽棋主场景
 * @time:  2018-04-28
 * @author: JiangTao kungfupandajt@163.com
 */

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {},


    // update (dt) {},

    // init 初始化
    init: function init() {},

    // 按钮事件监听
    onTouchListener: function onTouchListener(event, customEventData) {

        console.log(" customEventData ", customEventData);

        if (customEventData == "break") {} else if (customEventData == "blue") {}
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
        //# sourceMappingURL=Break.js.map
        