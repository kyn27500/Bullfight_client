(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/prefabs/PrefabHelper.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bdc6721qLdHVaWfc6LPj+VN', 'PrefabHelper', __filename);
// resources/Script/view/prefabs/PrefabHelper.js

"use strict";

var onfire = require("onfire");
var events = require("CustomEvents");

/**
 * 预制资源助手
 */
var PrefabHelper = {
    /**
     * 创建结果界面
     * resultData格式:
     * {
     *    topPortrait: string,      // 顶部头像url
     *    leftPortrait: string,     // 左边头像url
     *    rightPortrait: string,    // 右边头像url
     *    leftName: string,         // 左边名称   
     *    rightName: string,        // 右边名称
     *    leftGender: number,       // 左边性别 0:男 1:女
     *    rightGender: number,      // 右边性别 0:男 1:女
     *    result: number,           // 结果 1:胜利 0:平局 -1:失败
     *    score: string,            // 比分
     *    appId: number,            // 游戏id
     * }
     * @param {node} parentNode 父节点
     * @param resultData 结果数据
     */
    createResultScreen: function createResultScreen(parentNode, resultData) {
        // 加载预制资源
        cc.loader.loadRes("prefabs/result", function (err, res) {
            if (err) {
                console.log("结果界面预制资源加载失败！", err);
                return;
            }

            // 添加到节点
            var prefabResult = cc.instantiate(res);
            parentNode.addChild(prefabResult);

            // 触发结果数据事件
            onfire.fire(events.prefab.result.DATA, resultData);
        });
    }
};

module.exports = PrefabHelper;

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
        //# sourceMappingURL=PrefabHelper.js.map
        