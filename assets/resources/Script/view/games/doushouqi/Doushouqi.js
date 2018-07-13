/**
 * @brief: 斗兽棋主场景(单机-网络版调试)（如果没有网络的情况下，可以完单机的）
 * @time:  2018-05-8
 * @author: JiangTao kungfupandajt@163.com
 */

var Com = require('Com');
var onfire = require("onfire"); //处理事件的类库
var requestHandler = require("RequestHandler");
var config = require("config");
var Tools = require("Tools");
var events = require("CustomEvents");
var scenes = require("SceneList");
var HallData = require("HallData");
var globalData = require("Global");
var consts = require("Constants");
var myUserInfo = null;
var otherUserInfo = null;
var prefabHelper = require("PrefabHelper");
var texts = require("Text");

cc.Class({
    extends: cc.Component,

    properties: {

        sp_head_red: {
            default: null,
            type: cc.Sprite,
        },

        sp_head_blue: {
            default: null,
            type: cc.Sprite,
        },

        node_table: {
            default: null,
            type: cc.Node,
        },

        sp_tip: {
            default: null,
            type: cc.Sprite,
        },

        label_tip: {
            default: null,
            type: cc.Label,
        },

        sp_alert: {
            default: null,
            type: cc.Sprite,
        },

        label_alert: {
            default: null,
            type: cc.Label,
        },

        // 红色按钮文字
        label_red_btn: {
            default: null,
            type: cc.Label,
        },

        // 蓝色按钮文字
        label_blue_btn: {
            default: null,
            type: cc.Label,
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

        nodeResult: {
            default: null,
            type: cc.Node
        },

        btn_help: {
            default: null,
            type: cc.Button
        },

        node_help: {
            default: null,
            type: cc.Node
        },

        newPlayerNode: {
            default: null,
            type: cc.Node
        },

        sp_hand: {
            default: null,
            type: cc.Sprite
        },

        myName: cc.Label,

        otherName: cc.Label,

        animal_blue_Prefab: cc.Prefab, // 蓝方预制资源

        animal_red_Prefab: cc.Prefab, // 红方预制资源

        animal_Prefab: cc.Prefab, // 默认动物预制资源

        empty_prefab: cc.Prefab, // 空的预制资源

        result_prefab: cc.Prefab, // 结果预知资源

        defalutTiem: 30, //  默认操作时间

        count: 30, //  倒计时计次

        ndMyGenderMale: cc.Node,
        ndMyGenderFemale: cc.Node,
        ndOtherGenderMale: cc.Node,
        ndOtherGenderFemale: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        // 加载斗兽棋音效
        Com.onLoadAudio();

        Com.deleteItem();

        // this.onActiconHand();

        // 单机模式
        if (!config.isNetwork) {

            this.init();

            this.initUI();

            this.onOptionalTimeAni();

        } else {

            // 网络监听列表
            var listenerList = [
                [events.game.GAME_DATA, this.onReceive_login, this],
                [events.game.doushouqi.S2C_START, this.onReceive_start, this],
                [events.game.doushouqi.S2C_MOVE, this.onReceive_move, this],
                [events.game.doushouqi.S2C_TALK, this.onReceive_talk, this],
                [events.game.doushouqi.S2C_ANIMAL, this.onReceive_animal, this],
                [events.game.doushouqi.S2C_GAMEOVER, this.onReceive_overGame, this],
                [events.game.doushouqi.S2C_ASK_FOR_DRAW, this.onReceive_qiuHeOther, this],
                [events.game.doushouqi.S2C_ASK_FOR_DRAW_AGREE, this.onReceive_qiuHeAgreeOther, this],
            ];

            listenerList.forEach(element => {

                onfire.on(element[0], element[1], element[2]);

            });
        }

        this.addButtonListener();

    },

    // 销毁时调用
    onDestroy() {

        var listenerList = [
            [events.game.GAME_DATA, this.onReceive_login, this],
            [events.game.doushouqi.S2C_START, this.onReceive_start, this],
            [events.game.doushouqi.S2C_MOVE, this.onReceive_move, this],
            [events.game.doushouqi.S2C_TALK, this.onReceive_talk, this],
            [events.game.doushouqi.S2C_ANIMAL, this.onReceive_animal, this],
            [events.game.doushouqi.S2C_GAMEOVER, this.onReceive_overGame, this],
            [events.game.doushouqi.S2C_ASK_FOR_DRAW, this.onReceive_qiuHeOther, this],
            [events.game.doushouqi.S2C_ASK_FOR_DRAW_AGREE, this.onReceive_qiuHeAgreeOther, this],
        ];

        // 移除监听
        listenerList.forEach(element => {

            onfire.un(element[0]);

        });
    },

    start() {



    },

    // ******************    数据通讯   ******************

    // 进入游戏
    onReceive_login(data1, data2) {

        console.log(" onReceive_login ++++++++++++++++++++++++ Doushouqi ");

        this.allData = data1;

        this.gameData = data1["gameData"];

        // 初始化用户数据
        myUserInfo = data1.myUserInfo;
        otherUserInfo = data1.otherUserInfo;
        this.myName.string = data1.myUserInfo.name;
        this.otherName.string = data1.otherUserInfo.name;
        this._selfUID = data1.myUserInfo.uid;
        this._otherUID = data1.otherUserInfo.uid;
        this._doItUID = data1.s_douShouQi_doIt.doIt;
        console.log("my icon url ===== ", data1.myUserInfo.icon);
        console.log("other icon url ===== ", data1.otherUserInfo.icon);
        Tools.loadRemoteImage(data1.myUserInfo.icon, this.sp_head_red);
        Tools.loadRemoteImage(data1.otherUserInfo.icon, this.sp_head_blue);
        this.ndMyGenderFemale.active = (myUserInfo.sex == consts.gender.FEMALE);
        this.ndMyGenderMale.active = (myUserInfo.sex == consts.gender.MALE);
        this.ndOtherGenderFemale.active = (otherUserInfo.sex == consts.gender.FEMALE);
        this.ndOtherGenderMale.active = (otherUserInfo.sex == consts.gender.MALE);

        // 初始化 斗兽棋棋盘
        this.init();
        this.initUI();
    },

    // 游戏开始
    onReceive_start(data1, data2) {

        console.log("***************c_doushouqi_play***************", data1["success"])

        if (data1.success == 0) {

            this.openUpdate();

            this.onOptionalTimeAni();

            // 找出当前可以操作的动物
            this.onShowValidOptionalObj();

        }

    },

    // 点击箱子后请求到的动物
    onReceive_animal(data1, data2) {

        if (data1.success == 0) {

            var row = data1.r;

            var col = data1.c;

            var myCode = -1;

            // 切换操作对象
            var doItID = data1.s_douShouQi_doIt.doIt;

            // console.log( " all UID ==== ", this._doItUID, this._selfUID, this._otherUID );

            // console.log( " this._isFirst ==== ", this._isFirst, doItID );

            if (this._isFirst) {

                this._isFirst = false;

                var firstCode = 0;

                if (data1.animalIndex < 10) {

                    // 红色 都属于第一个操作用户的
                    firstCode = 1;

                } else {

                    // 蓝色 都属于第一个操作用户的
                    firstCode = 2;

                }

                var baseData = {

                    firstUID: this._doItUID,

                    firstAnimal: firstCode,

                };

                Com.setItem(baseData);

                // 确定自己动物的颜色
                if (this._doItUID == this._selfUID) {

                    myCode = this._selfUID;

                } else {

                    myCode = this._otherUID;

                }

                this.sp_hand.node.stopAllActions();

            } else {

                var firstAnimal = Com.getItem().firstAnimal;

                var firstUID = Com.getItem().firstUID;

                var animalCode = 0;

                if (firstUID == this._selfUID) {

                    if (firstAnimal == 1) {

                        // 所有红色动物mycode都标记为this._selfUID
                        if (data1.animalIndex < 10) {

                            myCode = this._selfUID;

                        } else {

                            myCode = this._otherUID;

                        }

                    } else {

                        // 所有蓝色动物mycode都标记为this._selfUID
                        if (data1.animalIndex > 10) {

                            myCode = this._selfUID;

                        } else {

                            myCode = this._otherUID;

                        }

                    }

                } else {

                    if (firstAnimal == 1) {

                        // 所有红色动物mycode都标记为this._otherUID
                        if (data1.animalIndex < 10) {

                            myCode = this._otherUID;

                        } else {

                            myCode = this._selfUID;

                        }

                    } else {

                        // 所有蓝色动物mycode都标记为this._otherUID

                        if (data1.animalIndex > 10) {

                            myCode = this._otherUID;

                        } else {

                            myCode = this._selfUID;

                        }

                    }

                }

            }

            this._doItUID = doItID;

            this.tableNodes[row][col].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).playAnimation(this.onAnimaltionBreakCallback.bind(this), data1.animalIndex, myCode);

        }

    },

    onReceive_MyCode(data) {

        console.log(" onReceive_MyCode ==== ", data["myCode"]);

        this._myCode = data.myCode;

    },

    // 移动动物
    onReceive_move(data1, data2) {

        // console.log( "  onReceive_move ++++++++++++++++++++++++++++ " );

        if (data1.success != 0) {

            console.log("  success move errcode ", data1.success);
            return;
        }

        var index0 = data1.r;

        var index1 = data1.c;

        var row = data1.moveR;

        var col = data1.moveC;

        var myCode = -1;

        var doItObj = data1.s_douShouQi_doIt;

        if (doItObj != null) {

            var doItID = data1.s_douShouQi_doIt.doIt;

            this._doItUID = doItID;

        }

        var targetPos = {
            x: this.allPos[row][col].x,
            y: this.allPos[row][col].y
        };

        var selectedPos = {
            x: this.allPos[index0][index1].x,
            y: this.allPos[index0][index1].y
        };

        var moveData = {
            targetPos: targetPos,
            selectedRow: index0,
            selectedCol: index1,
            row: row,
            col: col,
            winAnimalIdx: data1.animalIndex
        };

        this.tableNodes[index0][index1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).node.setLocalZOrder(99);

        this.tableNodes[index0][index1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onMoveToTarget(moveData, this.onMoveCallbackDel.bind(this));

        this.onCheckOptionSelf();

    },

    // 操作方 暂时不用
    onRecive_doIt(data1, data2) {


    },

    // 游戏结束
    onReceive_overGame(data1, data2) {
        // this.closeUpdate();
        console.log("onReceive_overGame s ", JSON.stringify(data1));
        // this.onResultCall = function(result) {
        //     console.log(" onResultCall  === ");
        // 清除本地缓存的数据：记录的自己的动物的颜色以及UID
        Com.deleteItem();
        this.closeUpdate();
        //this.onAddResultLayer(data1["youWin"]);

        var resultData = {};
        if (!config.isNetwork) {
            resultData.topPortrait = "http://zyhdheads.oss-cn-beijing.aliyuncs.com/default1.png";
            resultData.leftPortrait = "http://zyhdheads.oss-cn-beijing.aliyuncs.com/default1.png";
            resultData.rightPortrait = "http://zyhdheads.oss-cn-beijing.aliyuncs.com/default1.png";
            resultData.leftName = "左边的玩家";
            resultData.rightName = "右边的玩家";
            resultData.leftGender = 1; // 左边性别 0:男 1:女
            resultData.rightGender = 0; // 右边性别 0:男 1:女
            resultData.result = 1; // 结果 1:胜利 0:平局 -1:失败
            resultData.appId = 2; // 游戏id
        } else {
            resultData.topPortrait = myUserInfo.icon;
            resultData.leftPortrait = myUserInfo.icon;
            resultData.rightPortrait = otherUserInfo.icon;
            resultData.leftName = myUserInfo.name;
            resultData.rightName = otherUserInfo.name;
            resultData.leftGender = myUserInfo.sex;
            resultData.rightGender = otherUserInfo.sex;
            resultData.result = data1.youWin;
            resultData.appId = HallData.getCurGameInfo().appId;
        }
        prefabHelper.createResultScreen(this.nodeResult, resultData);
        // };
        // this.scheduleOnce(this.onResultCall(result), 0.5);
        // 切换场景
        // cc.director.loadScene("hall",function(){
        //     onfire.fire("hall_gameOver",data1, data2);
        // });
    },

    // 求和询问提示
    onReceive_qiuHeOther() {

        this._alertStr = consts.game.doushouqi.ASK_FOR_DRAW;

        this.onAddAlert(texts.game.doushouqi.ASK_FOR_DRAW);

    },

    onReceive_qiuHeAgreeOther() {

        this.onAddTip(texts.game.doushouqi.ASK_FOR_DRAW_DENIED);

    },

    // 发送数据
    /**
     * @brief: 发送数据到服务器
     * @data: 发送的数据
     * @packgeName: 发送的数据的包明
     */
    onSendGameData: function(packgeName, data) {

        requestHandler.sendRequest(packgeName, data);

    },

    onReceive_talk: function(data1, data2) {

        if (data1.success == 0) {



        }

    },


    // ******************    数据通讯   ******************

    // update (dt) {},

    initUI: function() {

        this.sp_tip.node.active = true;

        this.sp_tip.node.scale = 0;

        this.sp_alert.node.active = true;

        this.sp_alert.node.scale = 0;

        this.sp_destory.node.active = false;

        this.sp_destory.node.opacity = 0;

        this.sp_white.node.active = true;

        this.sp_white.node.opacity = 255;

        this.sp_red_time.node.active = true

        this.sp_red_time.node.opacity = 255;

        this.sp_red_time.node.scaleY = 0;

        this.sp_blue_time.node.active = true

        this.sp_blue_time.node.opacity = 255;

        this.sp_blue_time.node.scaleY = 0;

        this.onHideTipDir();

        this.node_dir.setLocalZOrder(100);

        this.sp_destory.node.setLocalZOrder(100);

    },

    // init 初始化
    init: function() {

        this._blueAnimal = [];

        this._redAnimal = [];

        this._rand01 = -1;

        this._blueSelf = true;

        this._pinkSelf = false;

        this._isShowTip = false;

        this._isShowAlert = false;

        this._isCanOptional = false; //当前是否可以进行操作

        this._selectedPoint = [-1, -1]; //记录被选中的动物

        this._alertStr = ""; //标记当前是求和还是认输按钮 默认是空

        this._rand0Count = 0;

        this._rand1Count = 0;

        this._isFirst = true;

        this._firstAnimalIndex = -1;

        this._helpNode = null;

        this._isNewPlayer = false;

        // row:行
        this._selectedObj = {
            row: -1,
            col: -1,
            count: 0
        }; //

        // eq:相等 gt:(greater than) 大于 lt:(less than) 小与
        this._compareState = {
            eq: 0,
            gt: 1,
            lt: 2,
            same: 3
        };

        this.width = cc.winSize.width;

        this.height = cc.winSize.height;

        // 所有点集合
        this.allPos = [
            [cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2],
            [cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2],
            [cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2],
            [cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2],
        ];

        this.allBtnEmpty = [

            [cc.Button, cc.Button, cc.Button, cc.Button],
            [cc.Button, cc.Button, cc.Button, cc.Button],
            [cc.Button, cc.Button, cc.Button, cc.Button],
            [cc.Button, cc.Button, cc.Button, cc.Button],

        ];

        var pos = null;

        var emptyNode = null;

        for (let index = 0; index < 4; index++) {

            for (let jndex = 0; jndex < 4; jndex++) {

                emptyNode = this.node_table.getChildByName("node_pos_" + index.toString() + jndex.toString())

                pos = emptyNode.position;

                this.allPos[index][jndex] = pos;

            }

        }

        // 所有动物集合

        this.tableNodes = [
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
        ];

        this.onInitTable();

    },

    addButtonListener: function() {

        var $this = this;

        this.btn_help.node.on(cc.Node.EventType.TOUCH_START, function(event) {

            console.log("TOUCH_START")

            $this.node_help.active = true;

            $this.node_help.opacity = 255;

        });

        this.btn_help.node.on(cc.Node.EventType.TOUCH_END, function(event) {

            $this.node_help.active = false;

            $this.node_help.opacity = 0;

        });

        this.btn_help.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {

            $this.node_help.active = false;

            $this.node_help.opacity = 0;

        });

    },

    // 按钮事件监听
    onTouchListener: function(event, customEventData) {

        console.log(" customEventData ", customEventData);

        if (customEventData == consts.game.doushouqi.BACK) {
            this._alertStr = consts.game.doushouqi.EXIT;
            this.onAddAlert(texts.game.doushouqi.EXIT_CONFIRM);
        } else if (customEventData == consts.game.doushouqi.ASK_FOR_DRAW) {

            this._alertStr = consts.game.doushouqi.ASK_FOR_DRAW;

            var data = {};

            this.onSendGameData(events.game.doushouqi.C2S_ASK_FOR_DRAW, data);

        } else if (customEventData == consts.game.doushouqi.SURRENDER) {

            this._alertStr = consts.game.doushouqi.SURRENDER;

            this.onAddAlert(texts.game.doushouqi.SURRENDER_CONFIRM);

        } else if (customEventData == consts.game.doushouqi.BUTTON_REFUSE) {

            if (this._alertStr == consts.game.doushouqi.ASK_FOR_DRAW) {

                var data = {
                    iDo: 1
                };

                this.onSendGameData(events.game.doushouqi.C2S_ASK_FOR_DRAW_AGREE, data);

            } else if (this._alertStr == consts.game.doushouqi.SURRENDER) {



            }

            // 拒绝按钮
            this.onHideAlert();

        } else if (customEventData == consts.game.doushouqi.BUTTON_AGREE) {

            if (this._alertStr == consts.game.doushouqi.ASK_FOR_DRAW) {

                var data = {
                    iDo: 0
                };

                this.onSendGameData(events.game.doushouqi.C2S_ASK_FOR_DRAW_AGREE, data);

            } else if (this._alertStr == consts.game.doushouqi.SURRENDER) {

                var data = {};

                this.onSendGameData(events.game.doushouqi.C2S_SURRENDER, data);

            } else if (this._alertStr == consts.game.doushouqi.EXIT) {
                var data = {
                    appId: HallData.getCurGameInfo().appId,
                    token: globalData.myUserInfo.token,
                };
                requestHandler.sendRequest(events.game.C2S_EXIT_GAME, data);
                cc.director.loadScene(scenes.hall.HALL, function() {
                    onfire.fire(events.hall.HALL_DATA, HallData.rawData);
                });
            }

            // 确认按钮
            this.onHideAlert();

        }

    },

    // 玩家头像加载
    onLoadHeadImg: function() {



    },

    // 初始化玩家棋盘
    onInitTable: function() {
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

        var btnEmpty = null;

        var _componentStr = '';

        var _gameDataContent = 0;

        for (let index = 0; index < this.gameData.length; index++) {

            for (let jndex = 0; jndex < this.gameData[index].length; jndex++) {

                _gameDataContent = this.gameData[index][jndex];

                btnEmpty = cc.instantiate(this.empty_prefab);

                btnEmpty.addComponent('BtnEmpty');

                btnEmpty.x = this.allPos[index][jndex].x;

                btnEmpty.y = this.allPos[index][jndex].y;

                btnEmpty.setLocalZOrder(0);

                btnEmpty.parent = this.node_table;

                this.allBtnEmpty[index][jndex] = btnEmpty;

                btnEmpty.getComponent('BtnEmpty').onSetRowAndCol(index, jndex);

                btnEmpty.getComponent('BtnEmpty').onSetTouchCallback(this.onEmptyTouchCallback.bind(this));

                // 初始化小动物
                this.onCreateAnimal(index, jndex, _gameDataContent);

            }

        }

        this.onNewPlayerGuid();

    },

    onCreateAnimal: function(index, jndex, animalStatus) {

        if (animalStatus == -1) {

            this.tableNodes[index][jndex] = {
                isDie: true,
                animal: null
            };
            return;

        }

        var _animal = cc.instantiate(this.animal_Prefab);

        _animal.addComponent('Animal');

        _animal.getComponent('Animal').init();

        _animal.x = this.allPos[index][jndex].x;

        _animal.y = this.allPos[index][jndex].y;

        _animal.active = true;

        _animal.opacity = 255;

        _animal.setLocalZOrder(10);

        _animal.parent = this.node_table;

        console.log(" 创建动物： ", animalStatus);

        if (animalStatus == 0) {

            // 箱子 不需要任何操作

        } else {

            _animal.getComponent('Animal').onLoadAnimal(animalStatus);

            // onSetAnimalCode
            // var stoargeUID = Com.getItem().firstUID;

            // if ( stoargeUID == this._selfUID ) {

            //     _animal.getComponent('Animal').onSetAnimalCode( Com.getItem().myAnimal );

            // } else {

            //     _animal.getComponent('Animal').onSetAnimalCode( Com.getItem().otherAnimal );

            // }

        }

        this.tableNodes[index][jndex] = {
            isDie: false,
            animal: _animal
        };

        _animal.getComponent('Animal').onSetRowAndCol(index, jndex);

        _animal.getComponent('Animal').onBreakBombCallback(this.onBombTouchCallback.bind(this));

        _animal.getComponent('Animal').onSetTouchCallback(this.onTouchCallback.bind(this));

    },

    onRandAnimal: function() {

        var rand01 = Com.onRandomNum(0, 2);

        if (this._rand0Count == 8) {

            rand01 = 1;

        } else if (this._rand1Count == 8) {

            rand01 = 0;

        }

        if (rand01 == 0) {

            this._rand0Count += 1;

            return this._blueAnimal[this._rand0Count - 1];

        } else {

            this._rand1Count += 1;

            return this._redAnimal[this._rand1Count - 1];

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
    onDelRepeatRandBlue: function() {

        var idx = 0;

        for (; idx < 8; idx++) {

            var randNum = Com.onRandomNum(1, 9);

            this._blueAnimal.push(randNum);

            for (let jndex = 0; jndex < idx; jndex++) {

                if (randNum == this._blueAnimal[jndex]) {

                    this._blueAnimal.splice(idx, 1);

                    idx--;

                    break;

                }

            }

        }


    },

    // 去重随机 粉色动物
    onDelRepeatRandPink: function() {

        var idx = 0;

        for (; idx < 8; idx++) {

            var randNum = Com.onRandomNum(11, 19);

            this._redAnimal.push(randNum);

            for (let jndex = 0; jndex < idx; jndex++) {

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
    onTouchCallback: function(row, col, objCode, isSelected) {

        // console.log( "onTouchCall&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", this._isCanOptional );

        if (!this.onIsSelfdoit()) {

            this.onAddTip(texts.game.doushouqi.WAITING_FOR_OPPONENT);

            return;

        }

        // 当前蓝色方是否被选中 选中（可以随便点任何一个地方，如果点击的地方不与它相邻，则恢复到正常状态，如果点击的
        // 的是扣着的对象，则直接翻开，显示小动物并且恢复到正常状态）

        // 首先操作对象要一致 然后判断当前是否被选中 在判断：如果选中了同颜色的 && this._selfUID == objCode
        if (this._doItUID == objCode && isSelected) {

            if (this._selectedObj.count == 0) {

                this._selectedObj.count = 1;

                this._selectedObj.row = row;

                this._selectedObj.col = col;

                this.tableNodes[row][col].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onRunBig();

                this.onCheckRoundMove(row, col, this.tableNodes[row][col].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL));

                console.log("this._selectedObj.count == 0");

            } else if (this._selectedObj.count >= 1) {

                console.log("this._selectedObj.count >= 1");

                this.tableNodes[this._selectedObj.row][this._selectedObj.col].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onRunSmall();

                this.onHideTipDir();

                this._selectedObj.count = 0;

                this._selectedObj.row = -1;

                this._selectedObj.col = -1;

            }

        } else if (this.onIsSelfdoit() && !isSelected) {

            this._selectedObj.count = 0;

            this._selectedObj.row = -1;

            this._selectedObj.col = -1;

            this.onHideTipDir();

        } else {
            //如果没有被选中的棋子，就点击了其它颜色的棋子 提示玩家不允许操作其它玩家的棋子
            if (!this.onCheckOptionalValid()) {

                this.onAddTip(texts.game.doushouqi.CANNOT_CONTROL_OPPONENT);

                return;

            }

            // 消除操作 计算 根据
            /**
             *  已经记录了被选中的点
             *  1.计算传过来的点是否与被选中的点是否相邻
             *  2.具体算法：(row - 1 >= 0 && row - 1 == selected[0])
             */

            console.log(" else 913 ");

            if (this.onClearAlgorithm(row, col) && this._doItUID != objCode) {

                // 可以进行消除逻辑 让当前被选中的小动物，进行移动到将被消除的小动物位置

                var index0 = this._selectedObj.row;

                var index1 = this._selectedObj.col;

                var targetPos = {
                    x: this.allPos[row][col].x,
                    y: this.allPos[row][col].y
                };

                this.tableNodes[index0][index1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).node.setLocalZOrder(99);

                // 移动 回调删除被吃掉的棋子（被吃掉的棋子进行删除）
                var data = {
                    r: index0,
                    c: index1,
                    moveR: row,
                    moveC: col
                };

                this.onSendGameData(events.game.doushouqi.C2S_MOVE, data);

            } else {

                var index0 = this._selectedObj.row;

                var index1 = this._selectedObj.col;

                this.tableNodes[index0][index1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onRunSmall();

                this.onHideTipDir();

                // 不可以进行消除 原地不动
                this._selectedObj.row = -1;

                this._selectedObj.col = -1;

            }


        }

    },

    // 点击默认占位的对象后回调
    onBombTouchCallback: function(row, col, componentStr) {

        console.log("onBombTouchCall", this.onIsSelfdoit());

        if (!this.onIsSelfdoit()) {

            this.onAddTip(texts.game.doushouqi.WAITING_FOR_OPPONENT);

            return;

        } else {

            // 请求服务器 拿到当前位置的动物

            var data = {
                r: row,
                c: col
            };

            this.onSendGameData(events.game.doushouqi.C2S_ANIMAL, data);

        }

    },

    onAnimaltionBreakCallback: function(row, col) {

        this.tableNodes[row][col].animal.active = true;

        this.tableNodes[row][col].animal.opacity = 255;

        this.onCheckOptionSelf();

    },

    // 点击空白方块的回调
    onEmptyTouchCallback: function(row, col) {

        console.log("onEmptyTouchCallback", row, col);
        // 把被选中的动物移动到当前位置
        if (this.onClearAlgorithm(row, col)) {

            var index0 = this._selectedObj.row;

            var index1 = this._selectedObj.col;

            // console.log( " 1172 index0  index1 ", index0, index1 );

            var data = {
                r: index0,
                c: index1,
                moveR: row,
                moveC: col
            };

            this.onSendGameData(events.game.doushouqi.C2S_MOVE, data);

        } else {

            // 不能移动

        }


    },

    // 移动后并且删除被吃掉的棋子
    onMoveCallbackDel: function(moveData) {

        // 设置操作棋子的row col
        var selected0 = moveData.selectedRow;

        var selected1 = moveData.selectedCol;

        var row = moveData.row;

        var col = moveData.col;

        var moveState = moveData.winAnimalIdx;

        console.log("moveState == ", moveState);

        if (moveState == -1) {

            // 两个棋子都删除

            // console.log( " 1209 idDie  ",  this.tableNodes[row][col].isDie);

            if (this.tableNodes[row][col].isDie) {

                Com.onPlayGameEffect(1);

                this.onMoveCallback(moveData);

                return;
            }

            Com.onPlayGameEffect(5);

            this.onPlayDestoryAni(row, col);

            // 删除被吃掉的棋子
            this.tableNodes[row][col].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onDestory();

            this.tableNodes[selected0][selected1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onDestory();

            this.tableNodes[row][col].isDie = true;

            this.tableNodes[selected0][selected1].isDie = true;

        } else {

            // selected被吃掉

            if (this.tableNodes[row][col].isDie) {

                Com.onPlayGameEffect(1);

                this.onMoveCallback(moveData);

                return;
            }

            console.log(" row col ", this.tableNodes[row][col].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onGetAnimalIndex());

            console.log(" selected0 selected1 ", this.tableNodes[selected0][selected1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onGetAnimalIndex());

            if (this.tableNodes[row][col].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onGetAnimalIndex() == moveState) {

                Com.onPlayGameEffect(3);

                this.tableNodes[selected0][selected1].isDie = true;

                this.tableNodes[row][col].isDie = false;

                this.onPlayDestoryAni(row, col);
                // 删除被吃掉的棋子
                this.tableNodes[selected0][selected1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onDestory();

            } else if (this.tableNodes[selected0][selected1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onGetAnimalIndex() == moveState) {

                // 目标被吃掉
                Com.onPlayGameEffect(4);

                this.tableNodes[row][col].isDie = true;

                this.tableNodes[selected0][selected1].isDie = false;

                this.tableNodes[selected0][selected1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).node.setLocalZOrder(1);

                this.onPlayDestoryAni(row, col);
                // 删除被吃掉的棋子
                this.tableNodes[row][col].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onDestory();

                this.tableNodes[row][col].animal = this.tableNodes[selected0][selected1].animal;

                this.tableNodes[row][col].isDie = this.tableNodes[selected0][selected1].isDie;

                this.tableNodes[selected0][selected1].isDie = true;

                this.tableNodes[selected0][selected1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onSetRowAndCol(row, col);

            }

        }

    },

    //  移动结果回调
    onMoveCallback: function(moveData) {

        // 切换操作用户
        console.log("移动完成");
        // 移动后属性互换
        var selected0 = moveData.selectedRow;

        var selected1 = moveData.selectedCol;

        var row = moveData.row;

        var col = moveData.col;

        var targetDie = this.tableNodes[row][col].isDie;


        if (this.tableNodes[selected0][selected1].isDie) {

            console.log(" error 1374+++++ isDie true ");

            return;

        }

        this.tableNodes[row][col].animal = this.tableNodes[selected0][selected1].animal;

        this.tableNodes[row][col].isDie = this.tableNodes[selected0][selected1].isDie;

        this.tableNodes[selected0][selected1].isDie = targetDie;

        this.tableNodes[selected0][selected1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onSetRowAndCol(row, col);

    },

    // 切换用户
    onCheckOptionSelf: function() {

        this.closeUpdate();

        this.onSetOptionalTime();

        // 要清理 自己的棋子的状态
        this.onResetStatus();

        this._selectedObj.row = -1;

        this._selectedObj.col = -1;

        this._selectedObj.count = 0;

        if (this.onIsSelfdoit()) {

            this.onRedBoardAni(true);

            this.onBlueBoardAni(false);

        } else if (!this.onIsSelfdoit()) {

            this.onBlueBoardAni(true);

            this.onRedBoardAni(false);

        }

        this.onHideTipDir();

        this.onShowValidOptionalObj();

    },

    onIsSelfdoit: function() {

        if (this._selfUID == this._doItUID) {

            return true;

        } else if (this._selfUID != this._doItUID) {

            return false;

        }

    },

    //计算点击后是否可以进行移动
    onClearAlgorithm: function(row, col) {

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
    onCheckCompare: function(row, col) {

        // this._compareState
        var selected0 = this._selectedObj.row;

        var selected1 = this._selectedObj.col;

        var targetObj = this.tableNodes[row][col].animal.componentStr;

        var selectedIndex = this.tableNodes[selected0][selected1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onGetAnimalIndex();

        var targetIndex = this.tableNodes[row][col].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onGetAnimalIndex();

        // 首先是特殊情况 老鼠可以吃大象 所以
        /**
         *  所有这个两个对象 如果index一个是8 并且一个是1  要特殊处理
         *  要把大象吃掉
         * 
         *  相同颜色的动物不可以互相吃掉
         */

        // console.log( "selectedIndex targetIndex", selectedIndex, targetIndex );

        var compareState = -1;

        if ((selectedIndex == 8 && targetIndex == 1)) {

            // 假设被选中的是大象，目标是老鼠 这时候，大象被吃
            compareState = this._compareState.lt;

        } else if ((selectedIndex == 1 && targetIndex == 8)) {

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
    onCheckAnimalSame: function(row, col) {

        var isSame = false;

        var selected0 = this._selectedObj.row;

        var selected1 = this._selectedObj.col;

        var targetComStr = this.tableNodes[row][col].animal.componentStr;

        var selectedStr = this.tableNodes[selected0][selected1].animal.componentStr;

        // console.log( " onCheckAnimalSame ", row, col, targetComStr, selectedStr );

        if (targetComStr == selectedStr) {

            this.tableNodes[selected0][selected1].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onRunSmall();

            this.tableNodes[row][col].animal.getComponent(consts.game.doushouqi.COMPONENT_ANIMAL).onRunSmall();

            this.onHideTipDir();

            isSame = true;

        }

        return isSame;

    },

    // 检测操作是否合法
    onCheckOptionalValid: function() {

        var selected0 = this._selectedObj.row;

        var selected1 = this._selectedObj.col;

        if (selected0 == -1 && selected1 == -1) {

            return false;

        }

        return true;

    },

    // 显示有效的操作对象
    onShowValidOptionalObj: function() {

        var tempNode = null;

        var comStr = '';

        // 如果点击翻棋后，要把所有的被选中的棋子恢复成原来状态
        for (let index = 0; index < this.tableNodes.length; index++) {

            for (let jndex = 0; jndex < this.tableNodes[index].length; jndex++) {

                if (!this.tableNodes[index][jndex].isDie) {

                    tempNode = this.tableNodes[index][jndex].animal;

                    // comStr   = tempNode.componentStr;
                    comStr = "Animal";

                    var currCode = tempNode.getComponent(comStr).onGetAnimalCode();

                    // 如果当前为自己操作 显示可以操作的动物
                    if (this.onIsSelfdoit()) {

                        // 判断当前动物是否被翻出来
                        if (tempNode.getComponent(comStr).getAnimalIsBreak()) {

                            // 判断当前动物是否为自己的动物
                            if (this._selfUID == currCode) {

                                tempNode.getComponent(comStr).onShowSelfTip();

                            } else {

                                tempNode.getComponent(comStr).onHideTip();

                            }

                        } else {

                            tempNode.getComponent(comStr).onOptionalObj();

                        }

                    } else {

                        tempNode.getComponent(comStr).onHideTip();

                    }

                }

            }
        }

    },

    // 重置棋子的状态
    onResetStatus: function() {

        var tempNode = null;

        var comStr = '';

        // 如果点击翻棋后，要把所有的被选中的棋子恢复成原来状态
        for (let index = 0; index < this.tableNodes.length; index++) {

            for (let jndex = 0; jndex < this.tableNodes[index].length; jndex++) {

                if (!this.tableNodes[index][jndex].isDie) {

                    tempNode = this.tableNodes[index][jndex].animal;

                    // comStr   = tempNode.componentStr;
                    comStr = "Animal";

                    if (this._selfUID == tempNode.getComponent(comStr).onGetAnimalCode()) {

                        if (tempNode.getComponent(comStr).getAnimalIsBig()) {

                            tempNode.getComponent(comStr).onRunSmall();

                        } else {


                        }
                    }

                }

            }
        }

    },

    onClearTabel: function() {

        var tempNode = null;

        var comStr = '';

        // 清除所有动物 需要重新初始化
        for (let index = 0; index < this.tableNodes.length; index++) {

            for (let jndex = 0; jndex < this.tableNodes[index].length; jndex++) {

                if (!this.tableNodes[index][jndex].isDie) {

                    tempNode = this.tableNodes[index][jndex].animal;

                    // comStr   = tempNode.componentStr;
                    comStr = consts.game.doushouqi.COMPONENT_ANIMAL;

                    tempNode.getComponent(comStr).onDestory();

                }

            }
        }


    },

    onRestart: function() {

        this.onClearTabel();

        this.init();

        this.initUI();

        this.openUpdate();

        this.onOptionalTimeAni();

    },

    // ******** 操作倒计时 ************

    // 打开倒计时函数
    openUpdate: function() {

        var interval = 1; //以秒为单位的时间间隔

        var repeat = this.defalutTiem; //重复次数

        var delay = 0; //开始延时

        this.schedule(this.onTimeDownCallback, interval, repeat, delay);

    },

    // 关闭倒计时函数
    closeUpdate: function() {

        console.log(" closeUpdate ********************** ");

        this.unschedule(this.onTimeDownCallback);

        this.count = 30;

        this._isCanOptional = false;

    },

    // 倒计时回调
    onTimeDownCallback: function() {

        this.count -= 1;

        if (this.count < 0) {

            this.closeUpdate();

            if (this.onIsSelfdoit())
            {
                this.onSendGameData(events.game.doushouqi.C2S_SURRENDER, {});
            }

            // 给服务器发送切换用户的操作

        } else {

            // 设置文本信息
            this.onSetOptionalTime();

        }



    },

    onCanOptionalObj: function() {

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
    onCheckRoundMove: function(row, col, obj) {

        var moveDir = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        if (row - 1 >= 0) {

            // 找出(row-1, col) 这个位置的对像
            // 上移动
            var isShowDir = this.onFindAnimalOfIndex((row - 1), col);

            if (isShowDir) {

                moveDir.up = true;

            }

        }

        if (row + 1 <= 3) {

            // 下移动
            var isShowDir = this.onFindAnimalOfIndex((row + 1), col);

            if (isShowDir) {

                moveDir.down = true;

            }

        }

        if (col - 1 >= 0) {

            // 左移动
            var isShowDir = this.onFindAnimalOfIndex(row, (col - 1));

            if (isShowDir) {

                moveDir.left = true;

            }

        }

        if (col + 1 <= 3) {

            // 右移动
            var isShowDir = this.onFindAnimalOfIndex(row, (col + 1));

            if (isShowDir) {

                moveDir.right = true;

            }

        }

        if ((row < 0 || col < 0) || (row > 3 || col > 3)) {

            moveDir = {
                up: false,
                down: false,
                left: false,
                right: false
            };

        }

        this.node_dir.x = this.tableNodes[row][col].animal.x;

        this.node_dir.y = this.tableNodes[row][col].animal.y + 10;

        // if ( moveDir.up || moveDir.down || moveDir.left || moveDir.right ){

        //     this.node_dir.node.active = true;

        //     this.node_dir.node.opacity = 255;

        // }

        this.onTipMoveDirection(moveDir);

    },

    onFindAnimalOfIndex: function(row, col) {

        var tempNode = null;

        var comStr = '';

        var isShowDir = false;

        if (!this.tableNodes[row][col].isDie) {

            tempNode = this.tableNodes[row][col].animal;

            // comStr = tempNode.componentStr;
            comStr = consts.game.doushouqi.COMPONENT_ANIMAL;

            // 当前箱子没有坏掉
            if (!tempNode.getComponent(comStr).getAnimalIsBreak()) {

                // 此种情况 不显示这个方向的 方向标
                isShowDir = false;

            } else {

                // isShowDir = true;
                if (this.onIsSelfdoit() && this._selfUID == tempNode.getComponent(comStr).onGetAnimalCode()) {

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
    onTipMoveDirection: function(moveDir) {

        if (moveDir.up) {

            // 播放上动画
            this.onRepeatAction(this.sp_up, consts.game.doushouqi.ANI_UP);

        }

        if (moveDir.down) {

            // 播放下动画
            this.onRepeatAction(this.sp_down, consts.game.doushouqi.ANI_DOWN);

        }

        if (moveDir.left) {

            // 播放左动画
            this.onRepeatAction(this.sp_left, consts.game.doushouqi.ANI_LEFT);

        }

        if (moveDir.right) {

            // 播放右动画
            this.onRepeatAction(this.sp_right, consts.game.doushouqi.ANI_RIGHT);

        }

    },

    /**
     * @nodeObj: 哪个对象执行
     * @dirStr: 方向
     */
    onRepeatAction: function(nodeObj, dirStr) {

        nodeObj.node.active = true;

        nodeObj.node.opacity = 255;

        var animState = nodeObj.play(dirStr);

        // 设置循环模式为 Loop
        animState.wrapMode = cc.WrapMode.Loop;

        // 设置动画循环次数为无限次
        animState.repeatCount = Infinity;

    },

    onStopRepeatAction: function(nodeObj, dirStr) {

        nodeObj.node.active = false;

        nodeObj.node.opacity = 0;

        nodeObj.stop(dirStr);

    },

    // 隐藏四个方向小标
    onHideTipDir: function() {

        // 停止播放上动画
        this.onStopRepeatAction(this.sp_up, consts.game.doushouqi.ANI_UP);

        // 停止播放下动画
        this.onStopRepeatAction(this.sp_down, consts.game.doushouqi.ANI_DOWN);

        // 停止播放左动画
        this.onStopRepeatAction(this.sp_left, consts.game.doushouqi.ANI_LEFT);

        // 停止播放右动画
        this.onStopRepeatAction(this.sp_right, consts.game.doushouqi.ANI_RIGHT);

    },

    // ****************** 对象可以移动的方向指示 ******************

    // ******************     被消灭的动画     ******************

    onPlayDestoryAni: function(row, col) {

        this.sp_destory.node.x = this.allPos[row][col].x;

        this.sp_destory.node.y = this.allPos[row][col].y;

        this.onDestoryAnimation();

    },

    onDestoryAnimation: function() {

        this.sp_destory.node.active = true;

        this.sp_destory.node.opacity = 255;

        var animState = this.sp_destory.play(consts.game.doushouqi.ANI_DESTROY);
        console.log("animState:", animState);

        var self = this;

        function onFinished() {

            console.log("onFinished");

            self.sp_destory.node.active = false;

            self.sp_destory.node.opacity = 0;

        };

        console.log("animState:", animState);
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
    onOptionalTimeAni: function() {

        if (this.onIsSelfdoit()) {

            this.onRedBoardAni(true);

        } else {

            this.onBlueBoardAni(true);

        }

    },

    /**
     * optionalObj: 操作方
     */
    onRedBoardAni: function(optionalObj) {

        if (optionalObj) {

            // 红面板从0放大到1的过程；

            var scale = cc.scaleTo(0.2, 1, 1);

            var delay = cc.delayTime(0.2);

            var self = this;

            function onFinishCallback() {

                self.sp_white.node.scale = 0;

                var scale2 = cc.scaleTo(0.2, 1, 1);

                self.sp_red_time.node.runAction(scale2);

                self._isCanOptional = true;

                self.openUpdate();

            };

            var seq = cc.sequence(scale,
                delay,
                cc.callFunc(onFinishCallback, this, this.sp_white));

            this.sp_white.node.runAction(seq);

        } else {

            // 红面板从1缩小到0的过程；
            var scale = cc.scaleTo(0.2, 1, 0);

            var self = this;

            function onFinishCallback() {


            };

            var seq = cc.sequence(scale,
                cc.callFunc(onFinishCallback, this, this.sp_red_time));

            this.sp_red_time.node.runAction(seq);

        }

    },

    /**
     * optionalObj: 操作方
     */
    onBlueBoardAni: function(optionalObj) {

        if (optionalObj) {

            // 红面板从0放大到1的过程

            var scale = cc.scaleTo(0.2, 1, 1);

            var delay = cc.delayTime(0.2);

            var self = this;

            function onFinishCallback() {

                self.sp_white.node.scale = 0;

                var scale1 = cc.scaleTo(0.2, 1, 1);

                self.sp_blue_time.node.runAction(scale1);

                self._isCanOptional = true;

                self.openUpdate();

            };

            var seq = cc.sequence(scale,
                delay,
                cc.callFunc(onFinishCallback, this, this.sp_white));

            this.sp_white.node.runAction(seq);

        } else {

            // 红面板从1缩小到0的过程；
            var scale = cc.scaleTo(0.2, 1, 0);

            var self = this;

            function onFinishCallback() {

            };

            var seq = cc.sequence(scale,
                cc.callFunc(onFinishCallback, this, this.sp_blue_time));

            this.sp_blue_time.node.runAction(seq);

        }

    },

    /**
     * optionalObj: 操作方
     */
    onWhiteBoardAni: function(optionalObj) {

        var scale = cc.scaleTo(0.5, 1, 1);

        var self = this;

        function onFinishCallback() {

            self.sp_white.node.active = false;

            self.sp_white.node.opacity = 0;

            self.sp_white.node.scaleY = 0;

            console.log(" onFinishCallback onWhiteBoardAni ", optionalObj);

            if (optionalObj == consts.game.doushouqi.OBJ_RED) {

                self.onBlueBoardAni(true);

            } else {

                self.onRedBoardAni(true);

            }

        }

        var seq = cc.sequence(scale,
            cc.callFunc(onFinishCallback, this, this.sp_white));

        this.sp_white.node.runAction(seq);


    },

    // 设置玩家操作时间
    onSetOptionalTime: function() {

        if (this._doItUID != this._selfUID) {

            this.label_blue_time.string = this.count.toString() + "s";

        } else {

            this.label_red_time.string = this.count.toString() + "s";

        }

    },

    // ****************** 操作时间过度动画 ******************

    // ******************     新手提示     ******************

    onNewPlayerGuid: function() {

        if (this._doItUID == this._selfUID && this._isNewPlayer) {

            this.newPlayerNode.active = true;

            this.newPlayerNode.opacity = 255;

            // this.newPlayerNode.setLocalZOrder(1000);

            this.onActiconHand();

        } else {

            this.newPlayerNode.active = false;

            this.newPlayerNode.opacity = 0;

            return;

        }

    },

    /**
     * 模拟手点击的动作
     * 每3秒做一次动作，如果点击第一个箱子后，关闭这个动物
     */
    onActiconHand: function() {

        this.sp_hand.node.stopAllActions();

        this.newPlayerNode.active = true;

        this.newPlayerNode.opacity = 255;

        var seq = cc.repeatForever(
            cc.sequence(
                cc.moveTo(0.85, -50, -50),
                cc.moveTo(0.5, 0, 0)
            ));

        this.sp_hand.node.runAction(seq);

    },

    // ******************     新手提示     ******************

    // ******************     提示框     ******************
    /**
     * tipStr: 提示文字
     */
    onAddTip: function(tipStr) {

        this.label_tip.string = tipStr;

        if (this._isShowTip) {

            return;

        } else {

            this.onShowtip();

        }

    },

    onShowtip: function() {

        var self = this;

        this._isShowTip = true;

        this.sp_tip.node.active = true;

        this.sp_tip.node.opacity = 255;

        // 缩小放大动画
        var scale = cc.scaleTo(0.2, 1);

        function onActionFinishCall() {

            // this.sp_tip.node.scale = 0;
            self.onHidetip();

        };

        var delay = cc.delayTime(0.8);

        var seq = cc.sequence(scale, delay,
            cc.callFunc(onActionFinishCall, this, this.sp_tip));

        this.sp_tip.node.runAction(seq);

    },

    onHidetip: function() {

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
    onAddAlert: function(descStr, labelRedBtn = texts.game.doushouqi.REFUSE, labelBlueBtn = texts.game.doushouqi.AGREE) {

        this.label_alert.string = descStr;

        this.label_red_btn.string = labelRedBtn;

        this.label_blue_btn.string = labelBlueBtn;

        if (this._isShowAlert) {

            return;

        } else {

            this.onShowAlert();

        }

    },

    onShowAlert: function() {

        var self = this;

        this._isShowAlert = true;

        // this.sp_alert.opacity = 255;

        // 缩小放大动画
        var scale = cc.scaleTo(0.2, 1);

        function onActionFinishCall() {

            console.log(" onActionFinishCall ");

        };

        var delay = cc.delayTime(0.8);

        var seq = cc.sequence(scale, delay,
            cc.callFunc(onActionFinishCall, this, this.sp_alert));

        this.sp_alert.node.runAction(seq);

    },

    onHideAlert: function() {

        // 缩小放大动画
        var scale = cc.scaleTo(0.1, 0);

        var $this = this;

        function onActionFinishCall() {

            $this.sp_alert.node.scale = 0;

            $this._isShowAlert = false;

            $this._alertStr = "";

        };

        var seq = cc.sequence(scale, cc.callFunc(onActionFinishCall, this, this.sp_alert));

        this.sp_alert.node.runAction(seq);

    },
});