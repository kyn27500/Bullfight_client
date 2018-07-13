"use strict";
cc._RF.push(module, '9d7effKYUJAv6rk84tERN4k', 'BtnEmpty');
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