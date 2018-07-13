(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/games/doushouqi/Doushouqi_back.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f4eb1ZVhnVGhKrsksb8uWym', 'Doushouqi_back', __filename);
// resources/Script/view/games/doushouqi/Doushouqi_back.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

/**
 * @brief: 斗兽棋主场景
 * @time:  2018-04-28
 * @author: JiangTao kungfupandajt@163.com
 */

var Com = require('Com');
var onfire = require("onfire"); //处理事件的类库
var requestHandler = require("RequestHandler");

cc.Class({
    extends: cc.Component,

    properties: {

        sp_head_red: {
            default: null,
            type: cc.Sprite
        },

        sp_head_blue: {
            default: null,
            type: cc.Sprite
        },

        node_table: {
            default: null,
            type: cc.Node
        },

        sp_tip: {
            default: null,
            type: cc.Sprite
        },

        label_tip: {
            default: null,
            type: cc.Label
        },

        sp_alert: {
            default: null,
            type: cc.Sprite
        },

        label_alert: {
            default: null,
            type: cc.Label
        },

        // 红色按钮文字
        label_red_btn: {
            default: null,
            type: cc.Label
        },

        // 蓝色按钮文字
        label_blue_btn: {
            default: null,
            type: cc.Label
        },

        node_dir: {
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

        sp_destory: {
            default: null,
            type: cc.Animation
        },

        // 白板
        sp_white: {
            default: null,
            type: cc.Sprite
        },

        // 红色方时间面板
        sp_red_time: {
            default: null,
            type: cc.Sprite
        },

        // 蓝色方时间面板
        sp_blue_time: {
            default: null,
            type: cc.Sprite
        },

        // 红方时间
        label_red_time: {
            default: null,
            type: cc.Label
        },

        // 蓝方时间
        label_blue_time: {
            default: null,
            type: cc.Label
        },

        sp_test: {
            default: null,
            type: cc.SpriteFrame
        },

        nodeResult: {
            default: null,
            type: cc.Node
        },

        animal_blue_Prefab: cc.Prefab, // 蓝方预制资源

        animal_red_Prefab: cc.Prefab, // 红方预制资源

        empty_prefab: cc.Prefab, // 空的预制资源

        result_prefab: cc.Prefab, // 结果预知资源

        defalutTiem: 30, //  默认操作时间

        count: 30 //  倒计时计次

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        Com.onLoadAudio();

        this.init();

        this.initUI();

        this.openUpdate();

        this.onOptionalTimeAni();
    },


    // 销毁时调用
    onDestroy: function onDestroy() {},
    start: function start() {},


    // update (dt) {},

    initUI: function initUI() {

        this.sp_tip.node.active = true;

        this.sp_tip.node.scale = 0;

        this.sp_alert.node.active = true;

        this.sp_alert.node.scale = 0;

        this.sp_destory.node.active = false;

        this.sp_destory.node.opacity = 0;

        this.sp_white.node.active = true;

        this.sp_white.node.opacity = 255;

        this.sp_red_time.node.active = true;

        this.sp_red_time.node.opacity = 255;

        this.sp_red_time.node.scaleY = 0;

        this.sp_blue_time.node.active = true;

        this.sp_blue_time.node.opacity = 255;

        this.sp_blue_time.node.scaleY = 0;

        this.onHideTipDir();

        this.node_dir.setLocalZOrder(100);

        this.sp_destory.node.setLocalZOrder(100);
    },

    // init 初始化
    init: function init() {

        this._blueAnimal = [];

        this._redAnimal = [];

        this._rand01 = -1;

        this._blueSelf = true;

        this._pinkSelf = false;

        this._isShowTip = false;

        this._isShowAlert = false;

        this._isCanOptional = false; //当前是否可以进行操作

        this._optionalObj = "Animal_blue"; //默认操作对象为blue

        this._selectedPoint = [-1, -1]; //记录被选中的动物

        // row:行
        this._selectedObj = { row: -1, col: -1, count: 0 }; //

        // eq:相等 gt:(greater than) 大于 lt:(less than) 小与
        this._compareState = { eq: 0, gt: 1, lt: 2, same: 3 };

        this.width = cc.winSize.width;

        this.height = cc.winSize.height;

        // 所有点集合
        this.allPos = [[cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2], [cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2], [cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2], [cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2]];

        this.allBtnEmpty = [[cc.Button, cc.Button, cc.Button, cc.Button], [cc.Button, cc.Button, cc.Button, cc.Button], [cc.Button, cc.Button, cc.Button, cc.Button], [cc.Button, cc.Button, cc.Button, cc.Button]];

        var pos = null;

        var emptyNode = null;

        for (var index = 0; index < 4; index++) {

            for (var jndex = 0; jndex < 4; jndex++) {

                emptyNode = this.node_table.getChildByName("node_pos_" + index.toString() + jndex.toString());

                pos = emptyNode.position;

                this.allPos[index][jndex] = pos;
            }
        }

        // 所有动物集合
        this.tableNodes = [[{}, {}, {}, {}], [{}, {}, {}, {}], [{}, {}, {}, {}], [{}, {}, {}, {}]];

        this.onInitTable();
    },

    // 按钮事件监听
    onTouchListener: function onTouchListener(event, customEventData) {

        console.log(" customEventData ", customEventData);

        if (customEventData == "back") {

            this.onAddTip("back-home");
            // this.onAddAlert( "确定要退出游戏吗？", "取消", "确认" );
        } else if (customEventData == "help") {

            // this.onBlueBoardAni( true );
            // this.sp_test.node.height = 300;


        } else if (customEventData == "qiuhe") {

            this.onAddAlert("对方向您求平局", "拒绝", "同意");
        } else if (customEventData == "renshu") {

            this.onAddAlert("您确定要认输吗？", "取消", "确认");
        } else if (customEventData == "btn_refuse") {

            // 拒绝按钮
            this.onHideAlert();
        } else if (customEventData == "btn_agree") {

            // 确认按钮
            this.onHideAlert();
        }
    },

    // 玩家头像加载
    onLoadHeadImg: function onLoadHeadImg() {},

    // 初始化玩家棋盘
    onInitTable: function onInitTable() {
        // 随机生成动物
        /**
         *  首先：当前格子生成那个颜色的动物 0 蓝色动物 1 粉色动物
         *  其次：根据颜色，随机生成相应的动物。【1-8】 分别代表不同的动物，去重随机，如果发现
         *      随机到相同的数字，则删除，重新随机
         *  在每次随机的时候都要判断0或1（也就是蓝色动物或粉色动物）是否已经随机了8中动物，如果随机够了，则不在
         *  进行随机；此时只随机另一种颜色的动物。 如果两种动物都随机够了，则停止。
         */
        this.onDelRepeatRandBlue();

        this.onDelRepeatRandPink();

        var empty = null;

        var btnEmpty = null;

        var _animal = null;

        var _rand0Count = 0;

        var _rand1Count = 0;

        var _componentStr = '';

        for (var index = 0; index < this.tableNodes.length; index++) {

            for (var jndex = 0; jndex < this.tableNodes[index].length; jndex++) {

                btnEmpty = cc.instantiate(this.empty_prefab);

                btnEmpty.addComponent('BtnEmpty');

                btnEmpty.x = this.allPos[index][jndex].x;

                btnEmpty.y = this.allPos[index][jndex].y;

                btnEmpty.setLocalZOrder(0);

                btnEmpty.parent = this.node_table;

                this.allBtnEmpty[index][jndex] = btnEmpty;

                btnEmpty.getComponent('BtnEmpty').onSetRowAndCol(index, jndex);

                btnEmpty.getComponent('BtnEmpty').onSetTouchCallback(this.onEmptyTouchCallback.bind(this));

                var rand01 = Com.onRandomNum(0, 2);

                if (_rand0Count == 8) {

                    rand01 = 1;
                } else if (_rand1Count == 8) {

                    rand01 = 0;
                }

                if (rand01 == 0) {

                    _animal = cc.instantiate(this.animal_blue_Prefab);

                    _rand0Count += 1;

                    _componentStr = 'Animal_blue';

                    _animal.componentStr = 'Animal_blue';

                    _animal.addComponent(_componentStr);

                    _animal.getComponent(_componentStr).init();

                    _animal.getComponent(_componentStr).onLoadAnimal(this._blueAnimal[_rand0Count - 1]);

                    _animal.getComponent(_componentStr).onSetSelf(this._blueSelf);
                } else if (rand01 == 1) {

                    _animal = cc.instantiate(this.animal_red_Prefab);

                    _rand1Count += 1;

                    _componentStr = 'Animal_red';

                    _animal.componentStr = 'Animal_red';

                    _animal.addComponent(_componentStr);

                    _animal.getComponent(_componentStr).init();

                    _animal.getComponent(_componentStr).onLoadAnimal(this._redAnimal[_rand1Count - 1]);

                    _animal.getComponent(_componentStr).onSetSelf(this._pinkSelf);
                }

                _animal.x = this.allPos[index][jndex].x;

                _animal.y = this.allPos[index][jndex].y;

                _animal.active = true;

                _animal.opacity = 255;

                _animal.setLocalZOrder(2);

                _animal.parent = this.node_table;

                this.tableNodes[index][jndex] = { isDie: false, animal: _animal };

                _animal.getComponent(_componentStr).onSetRowAndCol(index, jndex);

                _animal.getComponent(_componentStr).onBreakBombCallback(this.onBombTouchCallback.bind(this));

                _animal.getComponent(_componentStr).onSetTouchCallback(this.onTouchCallback.bind(this));
            }
        }
    },

    // 去重随机 蓝色动物
    /**
     * for(i=0;i<10;i++)                    //产生10个随机数
        {
            A[i]=1+rand()%10;                //得到随机数(范围在1-10之间)
                for(j=0;j<i;j++)                 //判断和前面的数是否重复
                    if(A[i]==A[j]) {
                        i--;
                        break;
                    }  //如果重复,重新产生随机数
        }
     */
    onDelRepeatRandBlue: function onDelRepeatRandBlue() {

        var idx = 0;

        for (; idx < 8; idx++) {

            var randNum = Com.onRandomNum(1, 9);

            this._blueAnimal.push(randNum);

            for (var jndex = 0; jndex < idx; jndex++) {

                if (randNum == this._blueAnimal[jndex]) {

                    this._blueAnimal.splice(idx, 1);

                    idx--;

                    break;
                }
            }
        }
    },

    // 去重随机 粉色动物
    onDelRepeatRandPink: function onDelRepeatRandPink() {

        var idx = 0;

        for (; idx < 8; idx++) {

            var randNum = Com.onRandomNum(1, 9);

            this._redAnimal.push(randNum);

            for (var jndex = 0; jndex < idx; jndex++) {

                if (randNum == this._redAnimal[jndex]) {

                    this._redAnimal.splice(idx, 1);

                    idx--;

                    break;
                }
            }
        }
    },

    // 点击棋子回调；一次只能点击一个自己的棋子；如果点击自己的第二枚棋子，则取消前一个选中的棋子；
    // 如果点击自己的棋子后，在点击对方的棋子则进行对比大小，然后进行消除的逻辑
    // 如果点击的是初始的方块，则是翻棋子，然后轮到对方操作

    // 首先判断当前是否为蓝方操作，如果是，在没有选中蓝方的情况下，是不可以点击粉色动物的；在选中蓝方情况下，
    // 点击任意一种颜色动物，都要进行判断（是否相邻，如果相邻，可以进行比较吃或被吃，如果不相邻，取消被选中状态）


    //切换动物操作时候有问题
    /**
     *  有哪些操作需要切换用户操作
     *  1.默认是蓝色方操作（不管是蓝方操作还是粉方操作），在点击翻开棋子动作后切换用户
     *  2.点击棋子移动（或者吃掉另一方的棋子），切换用户
     */
    onTouchCallback: function onTouchCallback(row, col, componentStr, isSelected) {

        // console.log( "onTouchCall&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", this._isCanOptional );

        if (!this._isCanOptional) {

            this.onAddTip("您操作太频繁，请稍等...");

            return;
        }

        // 当前蓝色方是否被选中 选中（可以随便点任何一个地方，如果点击的地方不与它相邻，则恢复到正常状态，如果点击的
        // 的是扣着的对象，则直接翻开，显示小动物并且恢复到正常状态）

        // console.log( " this._optionalObj onTouchCallback ", this._optionalObj, isSelected);

        // 首先操作对象要一致 然后判断当前是否被选中 在判断：如果选中了同颜色的
        if (this._optionalObj == componentStr && isSelected) {

            if (this._selectedObj.count == 0) {

                this._selectedObj.count = 1;

                this._selectedObj.row = row;

                this._selectedObj.col = col;

                this.tableNodes[row][col].animal.getComponent(this._optionalObj).onRunBig();

                this.onCheckRoundMove(row, col, this.tableNodes[row][col].animal.getComponent(this._optionalObj));

                console.log("this._selectedObj.count == 0");
            } else if (this._selectedObj.count >= 1) {

                console.log("this._selectedObj.count >= 1");

                this.tableNodes[this._selectedObj.row][this._selectedObj.col].animal.getComponent(this._optionalObj).onRunSmall();

                this.onHideTipDir();

                this._selectedObj.count = 0;

                this._selectedObj.row = -1;

                this._selectedObj.col = -1;
            }
        } else if (this._optionalObj == componentStr && !isSelected) {

            this._selectedObj.count = 0;

            this._selectedObj.row = -1;

            this._selectedObj.col = -1;

            this.onHideTipDir();
        } else {
            //如果没有被选中的棋子，就点击了其它颜色的棋子 提示玩家不允许操作其它玩家的棋子
            if (!this.onCheckOptionalValid()) {

                this.onAddTip("不可以操作其他玩家棋子");

                return;
            }

            // 消除操作 计算 根据
            /**
             *  已经记录了被选中的点
             *  1.计算传过来的点是否与被选中的点是否相邻
             *  2.具体算法：(row - 1 >= 0 && row - 1 == selected[0])
             */

            if (this.onClearAlgorithm(row, col) && !this.onCheckAnimalSame(row, col)) {

                // 可以进行消除逻辑 让当前被选中的小动物，进行移动到将被消除的小动物位置

                var index0 = this._selectedObj.row;

                var index1 = this._selectedObj.col;

                var targetPos = { x: this.tableNodes[row][col].animal.x,
                    y: this.tableNodes[row][col].animal.y };

                // var targetPos = this.node_table.node.convertToNodeSpaceAR(tempPos)

                // console.log( "selected x y", this.tableNodes[index0][index1].x, this.tableNodes[index0][index1].y );

                // console.log( "index0 index1", index0, index1 );

                // console.log( "targetPos ", targetPos.x, targetPos.y );

                this.tableNodes[index0][index1].animal.getComponent(this._optionalObj).node.setLocalZOrder(99);

                // 移动 回调删除被吃掉的棋子（被吃掉的棋子进行删除）
                this.tableNodes[index0][index1].animal.getComponent(this._optionalObj).onMoveToTarget(targetPos, row, col, this.onMoveCallbackDel.bind(this));
            } else {

                var index0 = this._selectedObj.row;

                var index1 = this._selectedObj.col;

                this.tableNodes[index0][index1].animal.getComponent(this._optionalObj).onRunSmall();

                this.onHideTipDir();

                // 不可以进行消除 原地不动
                this._selectedObj.row = -1;

                this._selectedObj.col = -1;
            }
        }
    },

    // 点击默认占位的对象后回调
    onBombTouchCallback: function onBombTouchCallback(row, col, componentStr) {

        console.log("onBombTouchCall", this._isCanOptional);

        if (!this._isCanOptional) {

            this.onAddTip("您操作太频繁，请稍等...");

            return;
        } else {

            this.tableNodes[row][col].animal.getComponent(componentStr).playAnimation(this.onAnimaltionBreakCallback.bind(this));
        }
    },

    onAnimaltionBreakCallback: function onAnimaltionBreakCallback(row, col) {

        this.onCheckOptionSelf();

        this.tableNodes[row][col].animal.active = true;

        this.tableNodes[row][col].animal.opacity = 255;

        // var tempNode = null;

        // var comStr   = "";

        // 如果点击翻棋后，要把所有的被选中的棋子恢复成原来状态
        // for (let index = 0; index < this.tableNodes.length; index++) {

        //     for (let jndex = 0; jndex < this.tableNodes[index].length; jndex++) {

        //         if ( !this.tableNodes[index][jndex].isDie ) {

        //             tempNode = this.tableNodes[index][jndex].animal;

        //             comStr   = tempNode.componentStr;

        //             if ( tempNode.getComponent(comStr).getAnimalIsBig() ) {

        //                 tempNode.getComponent(comStr).onRunSmall();

        //             } else {


        //             }

        //         }

        //     }
        // }

        this.onResetStatus();

        this.onHideTipDir();
    },

    // 点击空白方块的回调
    onEmptyTouchCallback: function onEmptyTouchCallback(row, col) {

        console.log("onEmptyTouchCallback", row, col);
        // 把被选中的动物移动到当前位置
        if (this.onClearAlgorithm(row, col)) {

            // this._optionalObj
            var index0 = this._selectedObj.row;

            var index1 = this._selectedObj.col;

            var targetPos = { x: this.allBtnEmpty[row][col].x,
                y: this.allBtnEmpty[row][col].y };

            this.tableNodes[index0][index1].animal.getComponent(this._optionalObj).onMoveToTarget(targetPos, row, col, this.onMoveCallback.bind(this));
        } else {

            // 不能移动

        }
    },

    // 移动后并且删除被吃掉的棋子
    onMoveCallbackDel: function onMoveCallbackDel(row, col) {

        // 设置操作棋子的row col
        var selected0 = this._selectedObj.row;

        var selected1 = this._selectedObj.col;

        if (this.onCheckCompare(row, col) == this._compareState.eq) {

            // 两个棋子都删除

            var delStrTarget = this.tableNodes[row][col].animal.componentStr;

            var delStrSelected = this.tableNodes[selected0][selected1].animal.componentStr;

            this.onPlayDestoryAni(row, col);

            // 删除被吃掉的棋子
            this.tableNodes[row][col].animal.getComponent(delStrTarget).onDestory();

            this.tableNodes[selected0][selected1].animal.getComponent(delStrSelected).onDestory();

            this.tableNodes[row][col].isDie = true;

            this.tableNodes[selected0][selected1].isDie = true;
        } else if (this.onCheckCompare(row, col) == this._compareState.gt) {

            // selected被吃掉

            var delStr = this.tableNodes[selected0][selected1].animal.componentStr;

            this.tableNodes[selected0][selected1].isDie = true;

            this.tableNodes[row][col].isDie = false;

            this.onPlayDestoryAni(row, col);
            // 删除被吃掉的棋子
            this.tableNodes[selected0][selected1].animal.getComponent(delStr).onDestory();
        } else if (this.onCheckCompare(row, col) == this._compareState.lt) {

            // 目标被吃掉
            var delStr = this.tableNodes[row][col].animal.componentStr;

            var selectedStr = this.tableNodes[selected0][selected1].animal.componentStr;

            this.tableNodes[row][col].isDie = true;

            this.tableNodes[selected0][selected1].isDie = false;

            this.tableNodes[selected0][selected1].animal.getComponent(selectedStr).node.setLocalZOrder(1);

            this.onPlayDestoryAni(row, col);
            // 删除被吃掉的棋子
            this.tableNodes[row][col].animal.getComponent(delStr).onDestory();

            this.tableNodes[row][col].animal = this.tableNodes[selected0][selected1].animal;

            this.tableNodes[row][col].isDie = this.tableNodes[selected0][selected1].isDie;

            this.tableNodes[selected0][selected1].isDie = true;

            this.tableNodes[selected0][selected1].animal.getComponent(this._optionalObj).onSetRowAndCol(row, col);
        } else if (this.onCheckCompare(row, col) == -1) {

            // this.onAddTip( "比较大小出错(-1),请检查参数是否正确" );
            return;
        }

        // console.log( "onMoveCallbackDel === ", this.tableNodes[row][col].isDie );

        // 检测游戏结果
        if (this.onCheckResult()) {

            // this.closeUpdate();

        } else {

            // 切换操作对象
            this.onCheckOptionSelf();
        }
    },

    //  移动结果回调
    onMoveCallback: function onMoveCallback(row, col) {

        // 切换操作用户
        console.log("移动完成");
        // 移动后属性互换

        var selected0 = this._selectedObj.row;

        var selected1 = this._selectedObj.col;

        var targetDie = this.tableNodes[row][col].isDie;

        this.tableNodes[row][col].animal = this.tableNodes[selected0][selected1].animal;

        this.tableNodes[row][col].isDie = this.tableNodes[selected0][selected1].isDie;

        this.tableNodes[selected0][selected1].isDie = targetDie;

        this.tableNodes[selected0][selected1].animal.getComponent(this._optionalObj).onSetRowAndCol(row, col);

        this.onCheckOptionSelf();
        // this.closeUpdate();
    },

    // 切换用户
    onCheckOptionSelf: function onCheckOptionSelf() {

        this.closeUpdate();

        this.onSetOptionalTime();

        // 要清理 自己的棋子的状态
        this.onResetStatus();

        this._selectedObj.row = -1;

        this._selectedObj.col = -1;

        this._selectedObj.count = 0;

        if (this._optionalObj == "Animal_blue") {

            this._optionalObj = "Animal_red";

            this.onRedBoardAni(true);

            this.onBlueBoardAni(false);
        } else if (this._optionalObj == "Animal_red") {

            this._optionalObj = "Animal_blue";

            this.onBlueBoardAni(true);

            this.onRedBoardAni(false);
        }

        // this.onAddTip( this._optionalObj );

        this.onHideTipDir();

        this.onShowValidOptionalObj();
    },

    //计算点击后是否可以进行移动
    onClearAlgorithm: function onClearAlgorithm(row, col) {

        var selected0 = this._selectedObj.row;

        var selected1 = this._selectedObj.col;

        var isClear = false;

        if (row - 1 == selected0 && col == selected1) {

            // 消除
            isClear = true;
            // console.log( " row  - 1 " );
        } else if (row + 1 == selected0 && col == selected1) {

            // 消除
            isClear = true;
            // console.log( " row  + 1 " );
        } else if (row == selected0 && col - 1 == selected1) {

            // 消除
            isClear = true;
            // console.log( " col  - 1 " );
        } else if (row == selected0 && col + 1 == selected1) {

            // 消除
            isClear = true;
            // console.log( " col + 1 " );
        } else if (selected0 == -1 && selected1 == -1) {

            // 不可以消除 直接
            isClear = false;
            // console.log( " selected0 -1 selected1 -1" );
        } else {

            // 不可以消除 直接
            isClear = false;
            // console.log( " else " );  
        }

        console.log("isClear ===== ", isClear);

        return isClear;
    },

    // 点击后是否能吃掉对方  消除
    /**
     *  比较大小
     *  1.如果移动的棋子比固定的棋子大，则吃掉对方；否则被吃掉；
     *  2.如果相等，则两个棋子都消失
     */
    onCheckCompare: function onCheckCompare(row, col) {

        // this._compareState
        var selected0 = this._selectedObj.row;

        var selected1 = this._selectedObj.col;

        var targetObj = this.tableNodes[row][col].animal.componentStr;

        var selectedIndex = this.tableNodes[selected0][selected1].animal.getComponent(this._optionalObj).onGetAnimalIndex();

        var targetIndex = this.tableNodes[row][col].animal.getComponent(targetObj).onGetAnimalIndex();

        // 首先是特殊情况 老鼠可以吃大象 所以
        /**
         *  所有这个两个对象 如果index一个是8 并且一个是1  要特殊处理
         *  要把大象吃掉
         * 
         *  相同颜色的动物不可以互相吃掉
         */

        // console.log( "selectedIndex targetIndex", selectedIndex, targetIndex );

        var compareState = -1;

        if (selectedIndex == 8 && targetIndex == 1) {

            // 假设被选中的是大象，目标是老鼠 这时候，大象被吃
            compareState = this._compareState.lt;
        } else if (selectedIndex == 1 && targetIndex == 8) {

            // 假设被选中的是老鼠，目标是大象 这时候，大象被吃
            compareState = this._compareState.gt;
        } else if (selectedIndex == targetIndex) {

            compareState = this._compareState.eq;
        } else if (selectedIndex > targetIndex) {

            compareState = this._compareState.gt;
        } else if (selectedIndex < targetIndex) {

            compareState = this._compareState.lt;
        }

        return compareState;
    },

    // 判断两个动物是否相同
    onCheckAnimalSame: function onCheckAnimalSame(row, col) {

        var isSame = false;

        var selected0 = this._selectedObj.row;

        var selected1 = this._selectedObj.col;

        var targetComStr = this.tableNodes[row][col].animal.componentStr;

        var selectedStr = this.tableNodes[selected0][selected1].animal.componentStr;

        // console.log( " onCheckAnimalSame ", row, col, targetComStr, selectedStr );

        if (targetComStr == selectedStr) {

            this.tableNodes[selected0][selected1].animal.getComponent(selectedStr).onRunSmall();

            this.tableNodes[row][col].animal.getComponent(targetComStr).onRunSmall();

            this.onHideTipDir();

            isSame = true;
        }

        return isSame;
    },

    // 检测操作是否合法
    onCheckOptionalValid: function onCheckOptionalValid() {

        var selected0 = this._selectedObj.row;

        var selected1 = this._selectedObj.col;

        if (selected0 == -1 && selected1 == -1) {

            return false;
        }

        return true;
    },

    // 显示有效的操作对象
    onShowValidOptionalObj: function onShowValidOptionalObj() {

        console.log(" onShowValidOptionalObj ");

        var tempNode = null;

        var comStr = '';

        // 如果点击翻棋后，要把所有的被选中的棋子恢复成原来状态
        for (var index = 0; index < this.tableNodes.length; index++) {

            for (var jndex = 0; jndex < this.tableNodes[index].length; jndex++) {

                if (!this.tableNodes[index][jndex].isDie) {

                    tempNode = this.tableNodes[index][jndex].animal;

                    comStr = tempNode.componentStr;

                    if (tempNode.getComponent(comStr).getAnimalIsBreak()) {

                        if (this._optionalObj == comStr) {

                            tempNode.getComponent(comStr).onShowSelfTip();
                        } else {

                            tempNode.getComponent(comStr).onHideTip();
                        }
                    } else {

                        tempNode.getComponent(comStr).onOptionalObj();
                    }
                }
            }
        }
    },

    // 重置棋子的状态
    onResetStatus: function onResetStatus() {

        var tempNode = null;

        var comStr = '';

        // 如果点击翻棋后，要把所有的被选中的棋子恢复成原来状态
        for (var index = 0; index < this.tableNodes.length; index++) {

            for (var jndex = 0; jndex < this.tableNodes[index].length; jndex++) {

                if (!this.tableNodes[index][jndex].isDie) {

                    tempNode = this.tableNodes[index][jndex].animal;

                    comStr = tempNode.componentStr;

                    if (comStr == this._optionalObj) {

                        if (tempNode.getComponent(comStr).getAnimalIsBig()) {

                            tempNode.getComponent(comStr).onRunSmall();
                        } else {}
                    }
                }
            }
        }
    },

    // 检测游戏结果
    /**
     * 判断某方玩家的输赢
     * 看哪一方的棋子剩下的多，如果所有的棋子都没有了，算平局
     */
    onCheckResult: function onCheckResult() {

        var blueCount = 0;

        var pinkCount = 0;

        var tempNode = null;

        var comStr = "";

        // 如果点击翻棋后，要把所有的被选中的棋子恢复成原来状态
        for (var index = 0; index < this.tableNodes.length; index++) {

            for (var jndex = 0; jndex < this.tableNodes[index].length; jndex++) {

                if (!this.tableNodes[index][jndex].isDie) {

                    tempNode = this.tableNodes[index][jndex].animal;

                    comStr = tempNode.componentStr;

                    // console.log( " comStr === ", comStr );

                    if (comStr == "Animal_blue") {

                        blueCount += 1;
                    } else if (comStr == "Animal_red") {

                        pinkCount += 1;
                    }
                }
            }
        }

        // 

        console.log("blueCount === ", blueCount);

        console.log("pinkCount === ", pinkCount);

        var isResult = false;

        if (blueCount == 0 && pinkCount == 0) {

            // 平局
            isResult = true;
        } else if (pinkCount == 0 && blueCount > pinkCount) {

            //蓝方胜利
            isResult = true;
        } else if (blueCount == 0 && pinkCount > blueCount) {

            //粉方胜利
            isResult = true;
        }

        if (isResult) {

            this.closeUpdate();

            this.onHideTipDir();

            this._playAnimCallback = function () {

                this.onAddResultLayer();
            };

            this.scheduleOnce(this._playAnimCallback, 0.5);
        }

        return isResult;
    },

    onClearTabel: function onClearTabel() {

        var tempNode = null;

        var comStr = '';

        // 清除所有动物 需要重新初始化
        for (var index = 0; index < this.tableNodes.length; index++) {

            for (var jndex = 0; jndex < this.tableNodes[index].length; jndex++) {

                if (!this.tableNodes[index][jndex].isDie) {

                    tempNode = this.tableNodes[index][jndex].animal;

                    comStr = tempNode.componentStr;

                    tempNode.getComponent(comStr).onDestory();
                }
            }
        }
    },

    onRestart: function onRestart() {

        this.onClearTabel();

        this.init();

        this.initUI();

        this.openUpdate();

        this.onOptionalTimeAni();
    },

    // ******** 操作倒计时 ************

    // 打开倒计时函数
    openUpdate: function openUpdate() {

        var interval = 1; //以秒为单位的时间间隔

        var repeat = this.defalutTiem; //重复次数

        var delay = 0; //开始延时

        this.schedule(this.onTimeDownCallback, interval, repeat, delay);
    },

    // 关闭倒计时函数
    closeUpdate: function closeUpdate() {

        console.log(" closeUpdate ********************** ");

        this.unschedule(this.onTimeDownCallback);

        this.count = 30;

        this._isCanOptional = false;

        // this.onCheckOptionSelf();
    },

    // 倒计时回调
    onTimeDownCallback: function onTimeDownCallback() {

        this.count -= 1;

        if (this.count < 0) {

            this.closeUpdate();

            this.onCheckOptionSelf();
        } else {

            // 设置文本信息
            this.onSetOptionalTime();
        }
    },

    onCanOptionalObj: function onCanOptionalObj() {

        return this._isCanOptional;
    },

    // ******** 操作倒计时 ************


    // ******** 对象可以移动的方向指示 ********

    // 检测上下左右是否可以移动
    /**
     * 
     * 移动规则为：如果四周有空位置，提示➡箭头出现
     * 1.如果旁边还有箱子，不提箭头
     * 2.如果旁边右自己的动物，不提示箱子
     * 
     */
    onCheckRoundMove: function onCheckRoundMove(row, col, obj) {

        var moveDir = { up: false, down: false, left: false, right: false };

        if (row - 1 >= 0) {

            // 找出(row-1, col) 这个位置的对像
            // 上移动
            var isShowDir = this.onFindAnimalOfIndex(row - 1, col);

            if (isShowDir) {

                moveDir.up = true;
            }
        }

        if (row + 1 <= 3) {

            // 下移动
            var isShowDir = this.onFindAnimalOfIndex(row + 1, col);

            if (isShowDir) {

                moveDir.down = true;
            }
        }

        if (col - 1 >= 0) {

            // 左移动
            var isShowDir = this.onFindAnimalOfIndex(row, col - 1);

            if (isShowDir) {

                moveDir.left = true;
            }
        }

        if (col + 1 <= 3) {

            // 右移动
            var isShowDir = this.onFindAnimalOfIndex(row, col + 1);

            if (isShowDir) {

                moveDir.right = true;
            }
        }

        if (row < 0 || col < 0 || row > 3 || col > 3) {

            moveDir = { up: false, down: false, left: false, right: false };
        }

        // obj.onTipMoveDirection( moveDir );

        this.node_dir.x = this.tableNodes[row][col].animal.x;

        this.node_dir.y = this.tableNodes[row][col].animal.y + 10;

        this.onTipMoveDirection(moveDir);
    },

    onFindAnimalOfIndex: function onFindAnimalOfIndex(row, col) {

        var tempNode = null;

        var comStr = '';

        var isShowDir = false;

        if (!this.tableNodes[row][col].isDie) {

            tempNode = this.tableNodes[row][col].animal;

            comStr = tempNode.componentStr;

            // 当前箱子没有坏掉
            if (!tempNode.getComponent(comStr).getAnimalIsBreak()) {

                // 此种情况 不显示这个方向的 方向标
                isShowDir = false;
            } else {

                // isShowDir = true;
                if (this._optionalObj == comStr) {

                    isShowDir = false;
                } else {

                    isShowDir = true;
                }
            }
        } else {

            isShowDir = true;
        }

        return isShowDir;
    },

    //  选中后提示玩家可以移动的方向 ()
    /**
     * 根据当前位置（x y）计算 上下左右 四个方向是否可以移动
     * 如果某个方向可以移动，则展示提示动画
     */
    onTipMoveDirection: function onTipMoveDirection(moveDir) {

        if (moveDir.up) {

            // 播放上动画
            this.onRepeatAction(this.sp_up, "up");
        }

        if (moveDir.down) {

            // 播放下动画
            this.onRepeatAction(this.sp_down, "down");
        }

        if (moveDir.left) {

            // 播放左动画
            this.onRepeatAction(this.sp_left, "left");
        }

        if (moveDir.right) {

            // 播放右动画
            this.onRepeatAction(this.sp_right, "right");
        }
    },

    /**
    * @nodeObj: 哪个对象执行
    * @dirStr: 方向
    */
    onRepeatAction: function onRepeatAction(nodeObj, dirStr) {

        nodeObj.node.active = true;

        nodeObj.node.opacity = 255;

        var animState = nodeObj.play(dirStr);

        // 设置循环模式为 Loop
        animState.wrapMode = cc.WrapMode.Loop;

        // 设置动画循环次数为无限次
        animState.repeatCount = Infinity;
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

    // ****************** 对象可以移动的方向指示 ******************

    // ******************     被消灭的动画     ******************

    onPlayDestoryAni: function onPlayDestoryAni(row, col) {

        this.sp_destory.node.x = this.allPos[row][col].x;

        this.sp_destory.node.y = this.allPos[row][col].y;

        this.onDestoryAnimation();
    },

    onDestoryAnimation: function onDestoryAnimation() {

        this.sp_destory.node.active = true;

        this.sp_destory.node.opacity = 255;

        var animState = this.sp_destory.play("destory");

        var self = this;

        function onFinished() {

            console.log("onFinished");

            self.sp_destory.node.active = false;

            self.sp_destory.node.opacity = 0;
        };

        animState.on('finished', onFinished, this.sp_destory);
    },

    // ******************  被消灭的动画   ******************

    // ****************** 操作时间过度动画 ******************

    /**
     * 随机出操作方
     * 根据随机出来的对象，显示操作时间
     * 显示要求：（假设，随机出来的是红方先操作）
     * 1.红方时间面板从0放大到1的过程；30s后面板从1到0缩小，然后显示白板0.5s，0.5s后白板隐藏，
     * 蓝色面板从0放大到1的过程；然后重复循环此过程
     */
    onOptionalTimeAni: function onOptionalTimeAni() {

        if (this._optionalObj == "Animal_red") {

            this.onRedBoardAni(true);
        } else if (this._optionalObj == "Animal_blue") {

            this.onBlueBoardAni(true);
        }
    },

    /**
     * optionalObj: 操作方
     */
    onRedBoardAni: function onRedBoardAni(optionalObj) {

        if (optionalObj) {
            var onFinishCallback = function onFinishCallback() {

                self.sp_white.node.scale = 0;

                var scale2 = cc.scaleTo(0.2, 1, 1);

                self.sp_red_time.node.runAction(scale2);

                self._isCanOptional = true;

                self.openUpdate();
            };

            // 红面板从0放大到1的过程；

            var scale = cc.scaleTo(0.2, 1, 1);

            var delay = cc.delayTime(0.2);

            var self = this;

            ;

            var seq = cc.sequence(scale, delay, cc.callFunc(onFinishCallback, this, this.sp_white));

            this.sp_white.node.runAction(seq);
        } else {
            var _onFinishCallback = function _onFinishCallback() {};

            // 红面板从1缩小到0的过程；
            var scale = cc.scaleTo(0.2, 1, 0);

            var self = this;

            ;

            var seq = cc.sequence(scale, cc.callFunc(_onFinishCallback, this, this.sp_red_time));

            this.sp_red_time.node.runAction(seq);
        }
    },

    /**
     * optionalObj: 操作方
     */
    onBlueBoardAni: function onBlueBoardAni(optionalObj) {

        if (optionalObj) {
            var onFinishCallback = function onFinishCallback() {

                self.sp_white.node.scale = 0;

                var scale1 = cc.scaleTo(0.2, 1, 1);

                self.sp_blue_time.node.runAction(scale1);

                self._isCanOptional = true;

                self.openUpdate();
            };

            // 红面板从0放大到1的过程

            var scale = cc.scaleTo(0.2, 1, 1);

            var delay = cc.delayTime(0.2);

            var self = this;

            ;

            var seq = cc.sequence(scale, delay, cc.callFunc(onFinishCallback, this, this.sp_white));

            this.sp_white.node.runAction(seq);
        } else {
            var _onFinishCallback2 = function _onFinishCallback2() {};

            // 红面板从1缩小到0的过程；
            var scale = cc.scaleTo(0.2, 1, 0);

            var self = this;

            ;

            var seq = cc.sequence(scale, cc.callFunc(_onFinishCallback2, this, this.sp_blue_time));

            this.sp_blue_time.node.runAction(seq);
        }
    },

    /**
    * optionalObj: 操作方
    */
    onWhiteBoardAni: function onWhiteBoardAni(optionalObj) {

        var scale = cc.scaleTo(0.5, 1, 1);

        var self = this;

        function onFinishCallback() {

            self.sp_white.node.active = false;

            self.sp_white.node.opacity = 0;

            self.sp_white.node.scaleY = 0;

            console.log(" onFinishCallback onWhiteBoardAni ", optionalObj);

            if (optionalObj == "red") {

                self.onBlueBoardAni(true);
            } else {

                self.onRedBoardAni(true);
            }
        }

        var seq = cc.sequence(scale, cc.callFunc(onFinishCallback, this, this.sp_white));

        this.sp_white.node.runAction(seq);
    },

    // 设置玩家操作时间
    onSetOptionalTime: function onSetOptionalTime() {

        if (this._optionalObj == "Animal_blue") {

            this.label_blue_time.string = this.count.toString() + "s";
        } else {

            this.label_red_time.string = this.count.toString() + "s";
        }
    },

    // ****************** 操作时间过度动画 ******************

    // ******************     提示框     ******************
    /**
     * tipStr: 提示文字
     */
    onAddTip: function onAddTip(tipStr) {

        console.log(" add------tip ", this._isShowTip);

        this.label_tip.string = tipStr;

        if (this._isShowTip) {

            return;
        } else {

            this.onShowtip();
        }
    },

    onShowtip: function onShowtip() {

        console.log(" onShowtip");

        var self = this;

        this._isShowTip = true;

        this.sp_tip.node.active = true;

        this.sp_tip.node.opacity = 255;

        // 缩小放大动画
        var scale = cc.scaleTo(0.2, 1);

        function onActionFinishCall() {

            // this.sp_tip.node.scale = 0;
            this.onHidetip();
        };

        var delay = cc.delayTime(0.8);

        var seq = cc.sequence(scale, delay, cc.callFunc(onActionFinishCall, this, this.sp_tip));

        this.sp_tip.node.runAction(seq);
    },

    onHidetip: function onHidetip() {

        // 缩小放大动画
        var scale = cc.scaleTo(0.1, 0);

        function onActionFinishCall() {

            this.sp_tip.node.scale = 0;

            this._isShowTip = false;
        };

        var seq = cc.sequence(scale, cc.callFunc(onActionFinishCall, this, this.sp_tip));

        this.sp_tip.node.runAction(seq);
    },

    // 弹出 确认取消框
    onAddAlert: function onAddAlert(descStr, labelRedBtn, labelBlueBtn) {

        this.label_alert.string = descStr;

        this.label_red_btn.string = labelRedBtn;

        this.label_blue_btn.string = labelBlueBtn;

        if (this._isShowAlert) {

            return;
        } else {

            this.onShowAlert();
        }
    },

    onShowAlert: function onShowAlert() {

        var self = this;

        this._isShowAlert = true;

        // 缩小放大动画
        var scale = cc.scaleTo(0.2, 1);

        function onActionFinishCall() {};

        var delay = cc.delayTime(0.8);

        var seq = cc.sequence(scale, delay, cc.callFunc(onActionFinishCall, this, this.sp_alert));

        this.sp_alert.node.runAction(seq);
    },

    onHideAlert: function onHideAlert() {

        // 缩小放大动画
        var scale = cc.scaleTo(0.1, 0);

        function onActionFinishCall() {

            this.sp_alert.node.scale = 0;

            this._isShowAlert = false;
        };

        var seq = cc.sequence(scale, cc.callFunc(onActionFinishCall, this, this.sp_alert));

        this.sp_alert.node.runAction(seq);
    },

    // ******************    提示框    ******************

    // ******************    结算页面    ******************

    onAddResultLayer: function onAddResultLayer() {

        var self = this;

        var resutlLayer = cc.instantiate(this.result_prefab);

        resutlLayer.addComponent('GameResult');

        resutlLayer.setLocalZOrder(100);

        resutlLayer.parent = this.nodeResult;

        resutlLayer.x = 320;

        resutlLayer.y = 568;

        function onCallback() {

            // console.log( " onCallback " );

            self.onRestart();
        };

        resutlLayer.getComponent('GameResult').onInitUI();

        resutlLayer.getComponent('GameResult').onSetGameResultInfo("fdsklf", onCallback);
    }

    // ******************    结算页面    ******************
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
        //# sourceMappingURL=Doushouqi_back.js.map
        