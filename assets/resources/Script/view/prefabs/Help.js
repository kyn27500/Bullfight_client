/**
 *  @brief: 游戏说明界面
 *  @time:  2018-05-12
 *  @author: JiangTao
 */

cc.Class({
    extends: cc.Component,

    properties: {

        node_obj: {
            default: null,
            type: cc.Sprite,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        // this.init();



    },

    init: function () {

        this.node_obj.node.active = true;

        this.node_obj.node.opacity = 255;

        this.node_obj.scale = 1;

    },

    onShowHelp: function (  ) {

        // 缩小放大动画
        var scale = cc.scaleTo(0.2, 1);

        var self = this;

        function onActionFinishCall (  ){

            console.log( "onActionFinishCall === " );
            
            // self.node_obj.scale = 1;

            // self.node_obj.active = true;

            // self.node_obj.opacity = 255;

        };

        var delay = cc.delayTime(0.8);

        var seq = cc.sequence( scale, 
                                cc.callFunc(onActionFinishCall, this, this.node_obj) );

        this.node_obj.node.runAction( seq );

    },

    onHideHelp: function ( callback ) {

        var scale = cc.scaleTo(0.2, 0);

        var self = this;

        function onActionFinishCall (  ){

            if ( callback ) {

                callback();

            }

            self.node.destroy();

        };

        var delay = cc.delayTime(0.8);

        var seq = cc.sequence( scale, 
                                cc.callFunc(onActionFinishCall, this, this.node_obj) );

        this.node_obj.node.runAction( seq );

    },

});