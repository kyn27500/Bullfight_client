"use strict";
cc._RF.push(module, '8e623a9XwBHhpQuhrui2Fhu', 'Animal_red');
// resources/Script/view/games/doushouqi/Animal_red.js

"use strict";

/**
 *  @brief: 粉色小动物
 *  @time:  2018-05-2
 *  @author: JiangTao
 */

var Com = require('Com');

cc.Class({
    extends: cc.Component,

    properties: {
        node_obj: {
            default: null,
            type: cc.Sprite
        },
        sp_animal: {
            default: null,
            type: cc.Sprite
        },
        sp_icon: {
            default: null,
            type: cc.Sprite
        },

        breakAni: {
            default: null,
            type: cc.Animation
        },

        dieAni: {
            default: null,
            type: cc.Animation
        },

        nodeBreak: {
            default: null,
            type: cc.Node
        },

        sp_up: {
            default: null,
            type: cc.Animation
        },

        sp_down: {
            default: null,
            type: cc.Animation
        },

        sp_left: {
            default: null,
            type: cc.Animation
        },

        sp_right: {
            default: null,
            type: cc.Animation
        },

        sp_self: {
            default: null,
            type: cc.Sprite
        },

        sp_tip_break: {
            default: null,
            type: cc.Sprite
        },

        audioClip: {
            default: null,
            url: cc.AudioClip
        },

        is_big: false,

        is_break: false,

        row: -1,

        col: -1,

        animalIndex: -1

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        // this.init();


    },


    init: function init() {

        this.sp_self.node.active = false;

        this.sp_tip_break.node.opacity = 0;

        this.sp_tip_break.node.active = false;

        this.sp_tip_break.node.opacity = 0;

        this.is_big = false; //当前是否被选中

        this.is_self = false; //是否拥有粉色动物

        this._touchCallback = null;

        this._breakCallback = null;

        this.row = -1;

        this.col = -1;

        this.onHideTipDir();

        this.onLoadAudio();
    },

    onLoadAudio: function onLoadAudio() {},

    // 监听点击事件
    addTouchListener: function addTouchListener(event, customEventData) {

        // console.log("event ==== ", customEventData);

        // if ( this.is_big ) {

        //     this.onRunSmall();

        //     if ( this._touchCallback ) {

        //         this._touchCallback( this.row, this.col, "Animal_pink", false );

        //     }

        // }else{

        // //     this.onRunBig();

        //     if ( this._touchCallback ) {

        //         this._touchCallback( this.row, this.col, "Animal_pink", true );

        //     }

        // }


        if (customEventData == "break") {

            // this.playAnimation();
            if (this._breakCallback) {

                this._breakCallback(this.row, this.col, "Animal_red");
            }
        } else if (customEventData == "red") {

            if (this.is_big) {

                this.onRunSmall();

                if (this._touchCallback) {

                    this._touchCallback(this.row, this.col, "Animal_red", false);
                }
            } else {

                // this.onRunBig();

                if (this._touchCallback) {

                    this._touchCallback(this.row, this.col, "Animal_red", true);
                }
            }
        }
    },

    start: function start() {},
    update: function update(dt) {},


    // 播放爆开动画
    playAnimation: function playAnimation(animationCall) {

        var animState = this.breakAni.play('break');

        var self = this;

        function onFinished() {

            console.log("onFinished");

            self.is_break = true;

            self.nodeBreak.destroy();

            // 显示小动物
            self.sp_animal.node.active = true;

            self.sp_animal.node.opacity = 255;

            self.sp_icon.node.active = true;

            self.sp_icon.node.opacity = 255;

            // if ( self._breakCallback ) {

            //     self._breakCallback( self.row, self.col );

            // }

            if (animationCall) {

                animationCall(self.row, self.col);
            }

            Com.onPlayEffect(self.animalIndex);
        };

        animState.on('finished', onFinished, this.breakAni);
    },

    // 变大
    onRunBig: function onRunBig() {

        function bigFinishCall() {

            this.is_big = true;
        }
        // v cc.scaleTo(0.05, 1.1)
        var seq = cc.sequence(cc.moveTo(0.05, cc.p(0, 14)), cc.scaleTo(0.05, 1.1), cc.callFunc(bigFinishCall, this, this.node_obj));

        this.node_obj.node.runAction(seq);
    },

    // 缩小
    onRunSmall: function onRunSmall() {

        function smallFinishCall() {

            this.is_big = false;

            // this.onHideTipDir();
        }
        //cc.scaleTo(0.05, 1)
        var seq = cc.sequence(cc.moveTo(0.05, cc.p(0, 4)), cc.scaleTo(0.05, 1), cc.callFunc(smallFinishCall, this, this.node_obj));

        this.node_obj.node.runAction(seq);
    },

    //移动位置 
    /**
     * @brief: 移动
     * @targetPos: 移动后的位置
     * @row: 被吃掉棋子的横坐标
     * @col：被吃的棋子的纵坐标
     * @callback: 移动后的回调函数
     */
    onMoveToTarget: function onMoveToTarget(targetPos, row, col, callback) {

        var self = this;

        function moveFinishCall() {

            if (callback) {

                callback(row, col);
            }

            // this.onRunSmall();
            self.is_big = false;

            var scale = cc.scaleTo(0.05, 1);

            self.node_obj.node.runAction(scale);
        };

        // function moveEndFinishCall (  ) {

        //     this.onRunSmall();

        // };

        // // 计算当前移动的方向是x 方向 还是y方向
        // console.log( " x , y ", this.node.x, this.node.y );

        // console.log( " x , y ", targetPos.x, targetPos.y );

        // var xDir = targetPos.x - this.node.x;

        // var yDir = targetPos.y - this.node.y;

        // if ( xDir == 0 ) {

        //     // 纵向移动
        //     xDir = targetPos.x;

        //     if ( yDir > 0 ) {

        //         yDir = targetPos.y - 20;

        //     } else if ( yDir < 0 ) {

        //         yDir = targetPos.y + 10;

        //     }

        // } else if ( yDir == 0) {

        //     // 横向移动
        //     yDir = targetPos.y;

        //     if ( xDir > 0 ) {

        //         xDir = targetPos.x - 20;

        //     } else if ( xDir < 0 ) {

        //         xDir = targetPos.x + 10;

        //     }

        // }

        // var moveCall = cc.moveTo(0.2, cc.p(xDir, yDir));

        var moveEnd = cc.moveTo(0.2, cc.p(targetPos.x, targetPos.y)

        // moveCall, 
        //                         cc.callFunc(moveFinishCall, this, this.node),

        );var seq = cc.sequence(moveEnd, cc.callFunc(moveFinishCall, this, this.node));

        this.node.runAction(seq);
    },

    /**
     * 显示可以操作的对象
     */
    onOptionalObj: function onOptionalObj() {

        if (this.is_break) {

            this.sp_tip_break.node.active = false;

            this.sp_tip_break.node.opacity = 0;

            this.sp_self.node.active = true;

            this.sp_self.node.opacity = 255;
        } else {

            this.sp_tip_break.node.active = true;

            this.sp_tip_break.node.opacity = 255;

            this.sp_self.node.active = false;

            this.sp_self.node.opacity = 0;
        }
    },

    // 获取当前对象是否变大了
    getAnimalIsBig: function getAnimalIsBig() {

        return this.is_big;
    },

    // 获取当前对象的箱子是否破裂
    getAnimalIsBreak: function getAnimalIsBreak() {

        return this.is_break;
    },

    onSetLocalZorder: function onSetLocalZorder(zorder) {

        this.node.setLocalZOrder(zorder);
    },

    // 根据index变换资源 1-8
    onLoadAnimal: function onLoadAnimal(index) {

        // console.log(" pink **************** ", index);

        this.animalIndex = index;

        var animal = this.sp_animal;

        var animalIcon = this.sp_icon;

        var urlAnimal = Com.onGetAnimalUrl(index);

        var urlIcon = Com.onGetAnimalIconUrl(index, false);

        // console.log(" url **************** ", urlAnimal);

        // console.log(" icon **************** ", urlIcon);

        cc.loader.loadRes(urlAnimal, cc.SpriteFrame, function (error, spriteFrame) {

            // cc.log('Error url [' + error + ']');

            if (!error) {

                // myNode.getComponent(cc.Sprite)
                animal.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });

        cc.loader.loadRes(urlIcon, cc.SpriteFrame, function (error, spriteFrame) {

            if (!error) {

                animalIcon.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });
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

    onDestory: function onDestory() {

        this.node.destroy();

        // this.node_obj.node.active = false;

        // this.node_obj.node.opacity = 0;

        // this.playDieAnimation();
    },

    // 隐藏四个方向小标
    onHideTipDir: function onHideTipDir() {

        this.sp_up.node.active = false;

        this.sp_up.node.opacity = 0;

        this.sp_down.node.active = false;

        this.sp_down.node.opacity = 0;

        this.sp_left.node.active = false;

        this.sp_left.node.opacity = 0;

        this.sp_right.node.active = false;

        this.sp_right.node.opacity = 0;
    },

    // 
    onSetSelf: function onSetSelf(isSelf) {

        this.is_self = isSelf;
    },

    onGetSelf: function onGetSelf() {

        return this.is_self;
    },

    onGetAnimalIndex: function onGetAnimalIndex() {

        return this.animalIndex;
    },

    // 设置回调函数
    onSetTouchCallback: function onSetTouchCallback(touchcallback) {

        this._touchCallback = touchcallback;
    },

    // 设置回调函数
    onBreakBombCallback: function onBreakBombCallback(breakcallback) {

        this._breakCallback = breakcallback;
    },

    onGetComponentStr: function onGetComponentStr() {

        return "Animal_red";
    },

    onHideTip: function onHideTip() {

        this.sp_tip_break.node.active = false;

        this.sp_tip_break.node.opacity = 0;

        this.sp_self.node.active = false;

        this.sp_self.node.opacity = 0;
    },

    onShowSelfTip: function onShowSelfTip() {

        this.sp_tip_break.node.active = false;

        this.sp_tip_break.node.opacity = 0;

        this.sp_self.node.active = true;

        this.sp_self.node.opacity = 255;
    }

});

cc._RF.pop();