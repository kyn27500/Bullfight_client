(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/games/doushouqi/Animal.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9bf17L5wyZM+4Yr8PrkCZoe', 'Animal', __filename);
// resources/Script/view/games/doushouqi/Animal.js

"use strict";

/**
 *  @brief: 小动物
 *  @time:  2018-05-5
 *  @author: JiangTao
 * 
 *  点击后变大，在此点击后变回原来大小
 * 
 *  @修改：服务器联调，点开箱子后，服务器才返回对应的动物。
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

                // 动物底座
                sp_mask_bottom: {
                        default: null,
                        type: cc.Sprite
                },

                breakAni: {
                        default: null,
                        type: cc.Animation
                },

                nodeBreak: {
                        default: null,
                        type: cc.Node
                },

                sp_self: {
                        default: null,
                        type: cc.Sprite
                },

                sp_tip_break: {
                        default: null,
                        type: cc.Sprite
                },

                is_big: false,

                is_break: false,

                row: -1,

                col: -1,

                animalIndex: -1,

                animalColor: "" //  标记动物颜色，blue:蓝色动物 red：红色动物 默认是空的

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

                this.is_break = false;

                this._touchCallback = null;

                this._breakCallback = null;

                this._objCode = -1; //操作方的code 1:红方 2:蓝方 -1:还没有确定属于红蓝
        },

        // 监听点击事件
        addTouchListener: function addTouchListener(event, customEventData) {

                if (customEventData == "break") {

                        Com.onPlayGameEffect(0);

                        if (this._breakCallback) {

                                this._breakCallback(this.row, this.col, "Animal");
                        }
                } else if (customEventData == "animal") {

                        Com.onPlayGameEffect(2);

                        if (this.is_big) {

                                this.onRunSmall();

                                if (this._touchCallback) {

                                        this._touchCallback(this.row, this.col, this._objCode, false);
                                }
                        } else {

                                // this.onRunBig();

                                if (this._touchCallback) {

                                        this._touchCallback(this.row, this.col, this._objCode, true);
                                }
                        }
                }
        },

        start: function start() {
                // console.log(" start +++++++++++++++++++++++++")
        },
        update: function update(dt) {},


        onSetAnimalInfo: function onSetAnimalInfo(animalInfo) {

                // 信息中包含 当前动物下标 根据下标找到对应的动物（判断出是红色还是蓝色）

        },

        // 播放爆开动画
        playAnimation: function playAnimation(animationCall, animalIndex, animalCode) {

                var animState = this.breakAni.play('break');

                var self = this;

                console.log("playAnimation ====== ", animalCode);

                this.onSetAnimalCode(animalCode);

                function onFinished() {

                        self.onLoadAnimal(animalIndex);

                        if (animationCall) {

                                animationCall(self.row, self.col);
                        }

                        Com.onPlayEffect(animalIndex);
                };

                animState.on('finished', onFinished, this.breakAni);
        },

        onShowAnimal: function onShowAnimal() {

                this.is_break = true;

                this.nodeBreak.destroy();

                // 显示小动物
                this.sp_animal.node.active = true;

                this.sp_animal.node.opacity = 255;

                this.sp_icon.node.active = true;

                this.sp_icon.node.opacity = 255;

                this.sp_mask_bottom.node.active = true;

                this.sp_mask_bottom.node.opacity = 255;
        },

        // 变大
        onRunBig: function onRunBig() {

                function bigFinishCall() {

                        this.is_big = true;
                }

                // cc.scaleTo(0.05, 1.1)

                var seq = cc.sequence(cc.moveTo(0.05, cc.p(0, 14)), cc.scaleTo(0.05, 1.1), cc.callFunc(bigFinishCall, this, this.node_obj));

                this.node_obj.node.runAction(seq);
        },

        // 缩小
        onRunSmall: function onRunSmall() {

                function smallFinishCall() {

                        this.is_big = false;
                }

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
         * 
         * moveData = { targetPos:targetPos,    目标坐标位置
         *              selectedRow:index0,     选择的行坐标
         *              selectedCol:index1,     选择的列坐标
         *              row:row,                目标行坐标
         *              col:col,                目标列坐标
         *              moveState:moveState     移动后的状态
         *            };
         */
        onMoveToTarget: function onMoveToTarget(moveData, callback) {

                var self = this;

                function moveFinishCall() {

                        if (callback) {

                                callback(moveData);
                        }

                        self.is_big = false;

                        var scale = cc.scaleTo(0.05, 1);

                        self.node_obj.node.runAction(scale);
                }

                var moveEnd = cc.moveTo(0.2, cc.p(moveData.targetPos.x, moveData.targetPos.y));

                var seq = cc.sequence(moveEnd, cc.callFunc(moveFinishCall, this, this.node));

                this.node.runAction(seq);
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

                // console.log(" blue **************** ", index);
                // 隐藏箱子

                // 动物底座颜色
                var bottomColor = "blue";

                var isBlue = false;

                this.animalIndex = index;

                var animalResIdx = index;

                if (index > 10) {

                        bottomColor = "Animal_blue";

                        animalResIdx = index - 10;

                        isBlue = true;
                } else {

                        bottomColor = "Animal_red";

                        isBlue = false;
                }

                // 动物底座颜色  动物下面的阴影
                var bottomImgUrl = Com.onGetBottomImg(bottomColor);

                this.onLoadAnimalRes(bottomImgUrl.bottom, this.node_obj);

                this.onLoadAnimalRes(bottomImgUrl.mask, this.sp_mask_bottom);

                var urlAnimal = Com.onGetAnimalUrl(animalResIdx);

                var urlIcon = Com.onGetAnimalIconUrl(animalResIdx, isBlue);

                // 动物头像
                this.sp_animal.spriteFrame = urlAnimal;

                // 动物名称
                this.sp_icon.spriteFrame = urlIcon;

                // 设置当前动物的颜色 蓝色 红色
                this.onSetSelf(bottomColor);

                this.onShowAnimal();
        },

        // 
        /**
         * @brief: 动态更换动物图片
         * @imgUrl: 动态加载图片
         * @targetNode: 需要替换资源的对象
         */
        onLoadAnimalRes: function onLoadAnimalRes(imgUrl, targetNode) {

                if (!targetNode) {

                        console.log(" targetNode: ", targetNode);

                        return;
                }

                cc.loader.loadRes(imgUrl, cc.SpriteFrame, function (error, spriteFrame) {

                        if (!error) {

                                targetNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
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
        },

        onSetAnimalCode: function onSetAnimalCode(animalCode) {

                this._objCode = animalCode;
        },

        onGetAnimalCode: function onGetAnimalCode() {

                return this._objCode;
        },

        // 设置当前动物的颜色
        onSetSelf: function onSetSelf(animalColor) {

                this.animalColor = animalColor;
        },

        // 设置当前动物的颜色
        onGetSelfColor: function onGetSelfColor() {

                return this.animalColor;
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

                return this.animalColor;
        },

        // 箱子绿色框
        onHideTip: function onHideTip() {

                this.sp_tip_break.node.active = false;

                this.sp_tip_break.node.opacity = 0;

                this.sp_self.node.active = false;

                this.sp_self.node.opacity = 0;
        },

        // 点开箱子后的动物框
        onShowSelfTip: function onShowSelfTip() {

                this.sp_tip_break.node.active = false;

                this.sp_tip_break.node.opacity = 0;

                this.sp_self.node.active = true;

                this.sp_self.node.opacity = 255;
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
        //# sourceMappingURL=Animal.js.map
        