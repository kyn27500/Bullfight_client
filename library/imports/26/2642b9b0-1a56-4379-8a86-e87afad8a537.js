"use strict";
cc._RF.push(module, '2642bmwGlZDeYqG6Hr62KU3', 'Break');
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