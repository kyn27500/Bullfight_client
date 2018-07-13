(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/games/doushouqi/BtnEmpty.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9d7effKYUJAv6rk84tERN4k', 'BtnEmpty', __filename);
// resources/Script/view/games/doushouqi/BtnEmpty.js

"use strict";

/*
*   @brief: 占位空按钮
*   @time:  2018-5-2
*   @author:JiangTao
*/

cc.Class({
    extends: cc.Component,

    properties: {

        row: -1,

        col: -1

    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame
    update: function update(dt) {},

    // 监听点击事件
    addTouchListener: function addTouchListener(event, customEventData) {

        // console.log("index ==== ", this.row);

        // console.log("jndex ==== ", this.col);

        if (this._onTouchCallback) {

            this._onTouchCallback(this.row, this.col);
        }
    },

    //  设置行 列坐标
    onSetRowAndCol: function onSetRowAndCol(row, col) {

        this.row = row;

        this.col = col;
    },

    // 获取行 列坐标
    onGetRowAndCol: function onGetRowAndCol() {

        var obj = {
            "row": this.row,
            "col": this.col
        };
        return obj;
    },

    // 点击回调
    onSetTouchCallback: function onSetTouchCallback(callback) {

        this._onTouchCallback = callback;
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
        //# sourceMappingURL=BtnEmpty.js.map
        