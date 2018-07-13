/*
*   @brief: 占位空按钮
*   @time:  2018-5-2
*   @author:JiangTao
*/

cc.Class({
    extends: cc.Component,

    properties: {

        row: -1,

        col: -1,
        
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame
    update: function (dt) {

    },

    // 监听点击事件
    addTouchListener: function ( event, customEventData ) {

        // console.log("index ==== ", this.row);

        // console.log("jndex ==== ", this.col);

        if ( this._onTouchCallback ) {

            this._onTouchCallback( this.row, this.col );

        }

    },

    //  设置行 列坐标
    onSetRowAndCol: function ( row, col ) {

        this.row = row;

        this.col = col;

    },

    // 获取行 列坐标
    onGetRowAndCol: function (  ) {

        var obj = {
            "row": this.row,
            "col": this.col,
        };
        return obj;

    },

    // 点击回调
    onSetTouchCallback: function ( callback ) {

        this._onTouchCallback = callback;

    },

});