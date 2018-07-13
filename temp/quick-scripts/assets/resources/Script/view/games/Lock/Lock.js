(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/games/Lock/Lock.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f1532HSMpxFrq/6/23b09yA', 'Lock', __filename);
// resources/Script/view/games/Lock/Lock.js

"use strict";

var RUNNING_SPEED = 1.5; // 运行速度
var SPEED_INC = 0.05; // 速度递增
var MAX_SPEED = 3.0; // 最大速度
var HIT_RANGE = 10; // 判定角度范围
var HIT_OPEN = 1; // 命中开锁数
var PERFECT_RANGE = 4; // 完美命中判定范围
var PERFECT_OPEN = 2; // 完美命中开锁数
var NEXT_LOCK_MIN = 45; // 下一锁位最小角度
var NEXT_LOCK_MAX = 120; // 下一锁位最大角度
var PENALTY_TIME = 0.5; // 惩罚时间（秒）
var LOCK_COUNT_MIN = 45; // 最小锁数
var LOCK_COUNT_MAX = 60; // 最大锁数
var WIN_DELAY = 1.0; // 胜利延时
var SIM_OP_LOCK_R = 0.02; // 模拟单机时对手每帧开锁概率
var LEVEL_STATUS_NOT_RUNNING = 0;
var LEVEL_STATUS_RUNNING = 1;
var LEVEL_STATUS_RESOLVE = 2;
var LEVEL_STATUS_PENALTY = 3;
var RESULT_DRAW = 0;
var RESULT_WIN = 1;
var RESULT_FAIL = -1;
var HIT_TYPE_NORMAL = 1;
var HIT_TYPE_PERFECT = 2;

var onfire = require("onfire"); //处理事件的类库
var requestHandler = require("RequestHandler");
var config = require("config");
var tools = require("Tools");
var events = require("CustomEvents");
var prefabHelper = require("PrefabHelper");
var globalData = require("Global");
var myUserInfo = null;
var otherUserInfo = null;
var HallData = require("HallData");
var consts = require("Constants");
var scenes = require("SceneList");

cc.Class({
    extends: cc.Component,

    properties: {
        // 画面
        canvas: cc.Node,

        // 准备画面
        ndReady: cc.Node,
        ndReadyAni: cc.Node,

        // 菜单
        ndButtonBack: cc.Node,
        ndButtonHelp: cc.Node,

        // 帮助
        ndHelp: cc.Node,

        // PK条
        sprPKPortraitLeft: cc.Sprite,
        sprPKPortraitRight: cc.Sprite,
        ndPKGenderLeftMale: cc.Node,
        ndPKGenderLeftFemale: cc.Node,
        ndPKGenderRightMale: cc.Node,
        ndPKGenderRightFemale: cc.Node,
        lblPKNameLeft: cc.Label,
        lblPKNameRight: cc.Label,

        // 锁
        ndLock: cc.Node,
        ndLockTextOpen: cc.Node,
        ndLockTextLocked: cc.Node,
        ndLockDot: cc.Node,
        ndLockPointer: cc.Node,
        lblLockRemaining: cc.Label,
        lblLockOpRemaining: cc.Label,

        // 完美动画
        ndPerfect: cc.Node,

        // 退出
        ndExit: cc.Node,
        ndExitOK: cc.Node,
        ndExitCancel: cc.Node,

        // 音效
        sndHit: cc.AudioSource,
        sndMiss: cc.AudioSource,
        sndCountdown: cc.AudioSource,

        // 随机种子
        randomSeed: 0,

        // 当前速度
        currentSpeed: 0,

        // 关卡状态: 0-未运行, 1-运行中, 2-结算, 3-惩罚中
        levelStatus: 0,

        // 总锁数
        totalLock: 0,

        // 剩余锁数
        remainLock: 0,

        // 对手剩余锁数
        oRemainLock: 0
    },

    onLoad: function onLoad() {
        console.log("============= onLoad started"
        // 单机模拟数据
        );if (!config.isNetwork) {
            this.resetSinglePlay();
            this.initGame();
        } else {
            // 服务器事件监听
            var serverListeners = [[events.game.GAME_DATA, this.onReceive_GameLogin, this], [events.game.lock.S2C_START, this.onReceive_GameStart, this], [events.game.lock.S2C_PROGRESS, this.onReceive_UpdateProgress, this], [events.game.lock.S2C_GAMEOVER, this.onReceive_Resolve, this]];
            serverListeners.forEach(function (element) {
                onfire.on(element[0], element[1], element[2]);
            });
        }

        // 事件挂载
        this.node.on(cc.Node.EventType.TOUCH_START, this.canvas_onTouchStart, this);
        this.ndButtonBack.on(cc.Node.EventType.TOUCH_START, this.exitConfirm, this);
        this.ndExitOK.on(cc.Node.EventType.TOUCH_END, this.exitGame, this);
        this.ndExitCancel.on(cc.Node.EventType.TOUCH_END, function () {
            this.ndExit.active = false;
        }, this);
        this.ndButtonHelp.on(cc.Node.EventType.TOUCH_START, function () {
            this.ndHelp.active = true;
        }, this);
        this.ndButtonHelp.on(cc.Node.EventType.TOUCH_END, function () {
            this.ndHelp.active = false;
        }, this);
        this.ndButtonHelp.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.ndHelp.active = false;
        }, this);

        console.log("============= onLoad ended");
    },
    start: function start() {
        console.log("============= start started");
        this.ndReadyAni.getComponent(cc.Animation).on("finished", function () {
            this.ndReady.active = false;
            this.levelStatus = LEVEL_STATUS_RUNNING;
        }, this);
        console.log("============= start ended");
    },
    update: function update(dt) {
        switch (this.levelStatus) {
            case LEVEL_STATUS_RUNNING:
                this.ndLockPointer.rotation += this.currentSpeed;
                if (this.ndLockPointer.rotation > 360) this.ndLockPointer.rotation -= 360;
                if (this.ndLockPointer.rotation < 0) this.ndLockPointer.rotation += 360;
                // 模拟对手操作
                this.simOpponent();
                break;

            case LEVEL_STATUS_PENALTY:
                this.simOpponent();
                break;
        }
    },


    // 模拟对手操作
    simOpponent: function simOpponent() {
        if (!config.isNetwork && tools.random() <= SIM_OP_LOCK_R) {
            this.oRemainLock--;
            this.lblLockOpRemaining.string = this.oRemainLock;
            if (this.oRemainLock == 0) {
                this.resolve(RESULT_FAIL);
            }
        }
    },

    // 退出确认
    exitConfirm: function exitConfirm() {
        this.ndExit.active = true;
    },

    // 退出游戏
    exitGame: function exitGame() {
        var data = {
            appId: HallData.getCurGameInfo().appId,
            token: globalData.myUserInfo.token
        };
        requestHandler.sendRequest(events.game.C2S_EXIT_GAME, data);
        cc.director.loadScene(scenes.hall.HALL, function () {
            onfire.fire(events.hall.HALL_DATA, HallData.rawData);
        });
    },

    // 模拟单机数据
    resetSinglePlay: function resetSinglePlay() {
        this.totalLock = this.remainLock = parseInt(Math.random() * (LOCK_COUNT_MAX - LOCK_COUNT_MIN + 1) + LOCK_COUNT_MIN);
        this.oRemainLock = this.remainLock;
        this.randomSeed = Math.random() * 0x7fffffff;
        tools.loadRemoteImage("http://zyhdheads.oss-cn-beijing.aliyuncs.com/default1.png", this.sprPKPortraitLeft);
        tools.loadRemoteImage("http://zyhdheads.oss-cn-beijing.aliyuncs.com/default1.png", this.sprPKPortraitRight);
    },

    // 触碰
    canvas_onTouchStart: function canvas_onTouchStart(event, customEventData) {
        if (this.ndExit.active || this.ndHelp.active) return;

        switch (this.levelStatus) {
            case LEVEL_STATUS_RUNNING:
                this.judgeHit();
                break;
        }
    },

    // 初始化游戏
    initGame: function initGame() {
        console.log("============ initGame started");
        this.lblLockRemaining.string = this.remainLock;
        this.lblLockOpRemaining.string = this.oRemainLock;
        this.currentSpeed = RUNNING_SPEED + SPEED_INC * (this.totalLock - this.remainLock);
        this.ndLockDot.rotation = this.nextDotAngle(true);
        this.ndReady.active = true;
        this.ndReadyAni.active = true;
        this.ndReadyAni.getComponent(cc.Animation).play();
        this.scheduleOnce(function () {
            this.sndCountdown.play();
        }, 1);
        this.ndLock.getComponent(cc.Animation).play(consts.game.lock.ANI_RESET);
        this.ndLockPointer.rotation = 0;
        console.log("============ initGame ended");
    },

    // 获取下一角度
    nextDotAngle: function nextDotAngle() {
        var first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var result = 0;
        if (first) {
            result = tools.random() * (NEXT_LOCK_MAX - NEXT_LOCK_MIN + 1) + NEXT_LOCK_MIN;
            // 左
            if (tools.random() > 0.5) {
                result = 360 - result;
                this.currentSpeed = -RUNNING_SPEED;
            }
        } else {
            result = this.ndLockPointer.rotation + (this.currentSpeed > 0 ? 1 : -1) * (tools.random() * (NEXT_LOCK_MAX - NEXT_LOCK_MIN + 1) + NEXT_LOCK_MIN);
        }
        if (result > 360) result -= 360;else if (result < 0) result += 360;
        return result;
    },

    // 是否命中
    isHit: function isHit(range) {
        return Math.abs(this.ndLockDot.rotation - this.ndLockPointer.rotation) <= range || Math.abs(this.ndLockDot.rotation - 360 - this.ndLockPointer.rotation) <= range || Math.abs(this.ndLockDot.rotation - this.ndLockPointer.rotation + 360) <= range;
    },

    // 判断命中
    judgeHit: function judgeHit() {
        if (this.isHit(PERFECT_RANGE)) {
            // 完美命中
            this.openLock(PERFECT_OPEN);
            this.currentSpeed = -((this.currentSpeed > 0 ? SPEED_INC : -SPEED_INC) + this.currentSpeed);
            this.ndLockDot.rotation = this.nextDotAngle();
            this.ndPerfect.active = true;
            var ani = this.ndPerfect.getComponent(cc.Animation);
            ani.play();
            ani.on("finished", function () {
                this.ndPerfect.active = false;
            }, this);
            this.sndHit.play();
            this.sendHit(HIT_TYPE_PERFECT);
        } else if (this.isHit(HIT_RANGE)) {
            // 命中
            this.openLock(HIT_OPEN);
            this.currentSpeed = -((this.currentSpeed > 0 ? SPEED_INC : -SPEED_INC) + this.currentSpeed);
            this.ndLockDot.rotation = this.nextDotAngle();
            this.sndHit.play();
            this.sendHit(HIT_TYPE_NORMAL);
        } else {
            // 未命中
            this.levelStatus = LEVEL_STATUS_PENALTY;
            this.schedule(this.penaltyOver, PENALTY_TIME, 0);
            this.ndLock.getComponent(cc.Animation).play("shake");
            this.sndMiss.play();
        }
    },

    // 惩罚结束
    penaltyOver: function penaltyOver() {
        this.currentSpeed = -this.currentSpeed;
        this.ndLockDot.rotation = this.nextDotAngle();
        this.levelStatus = LEVEL_STATUS_RUNNING;
    },

    // 开锁
    openLock: function openLock(num) {
        this.remainLock -= num;
        if (this.remainLock < 0) this.remainLock = 0;
        this.lblLockRemaining.string = this.remainLock;
        if (this.remainLock == 0) {
            this.ndLock.getComponent(cc.Animation).play("open");
            this.sndMiss.play();
            this.levelStatus = LEVEL_STATUS_RESOLVE;
            if (!config.isNetwork) {
                this.scheduleOnce(function () {
                    this.resolve(RESULT_WIN);
                }, WIN_DELAY);
            }
        }
    },

    // 结算
    resolve: function resolve(result) {
        console.log("resolve, result: " + result);
        this.levelStatus = LEVEL_STATUS_RESOLVE;
        this.ndExit.active = false;
        this.ndHelp.active = false;
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
            resultData.result = result;
            resultData.appId = HallData.getCurGameInfo().appId;
        }
        prefabHelper.createResultScreen(this.canvas, resultData);
    },

    // 输出用户信息
    printUserInfo: function printUserInfo(userInfo) {
        console.log("uid: " + userInfo.uid + "\nname: " + userInfo.name + "\nsex: " + userInfo.sex + "\nicon: " + userInfo.icon + "\nmoney: " + userInfo.money);
    },

    // 输出登录信息
    printLoginInfo: function printLoginInfo(loginInfo) {
        console.log("success: " + loginInfo.success + "\nmyUserInfo: ");
        this.printUserInfo(loginInfo.myUserInfo);
        console.log("otherUserInfo: ");
        this.printUserInfo(loginInfo.otherUserInfo);
        console.log("s_kaiSuoDaRen_progress: ");
        this.printProgressInfo(loginInfo.s_kaiSuoDaRen_progress);
        console.log("zhongZi: " + loginInfo.zhongZi);
    },

    // 输出开始信息
    printStartInfo: function printStartInfo(startInfo) {
        console.log("success: " + startInfo.success);
    },

    // 输出结算信息
    printResolveInfo: function printResolveInfo(resolveInfo) {
        console.log("youWin: " + resolveInfo.youWin);
    },

    // 输出进度信息
    printProgressInfo: function printProgressInfo(progressInfo) {
        console.log("maxLock: " + progressInfo.maxLock + "\notherProgress: " + progressInfo.otherProgress + "\nmyProgress: " + progressInfo.myProgress);
    },

    // 以下为Server回调
    // 登录
    onReceive_GameLogin: function onReceive_GameLogin(data1, data2) {
        console.log("=============", events.game.GAME_DATA, "=== started");
        this.printLoginInfo(data1);
        if (data1.success != 0) {
            console.log("Server login failed: " + data1.success);
            return;
        }
        myUserInfo = data1.myUserInfo;
        otherUserInfo = data1.otherUserInfo;
        tools.randomSeed = parseInt(data1.zhongZi * 0x7fffffff);
        this.totalLock = data1.s_kaiSuoDaRen_progress.maxLock;
        this.remainLock = this.oRemainLock = this.totalLock;

        // 头像
        tools.loadRemoteImage(data1.myUserInfo.icon, this.sprPKPortraitLeft);
        tools.loadRemoteImage(data1.otherUserInfo.icon, this.sprPKPortraitRight);

        // 名称
        this.lblPKNameLeft.string = data1.myUserInfo.name;
        this.lblPKNameRight.string = data1.otherUserInfo.name;

        // 性别
        this.ndPKGenderLeftFemale.active = data1.myUserInfo.sex == consts.gender.FEMALE;
        this.ndPKGenderLeftMale.active = data1.myUserInfo.sex == consts.gender.MALE;
        this.ndPKGenderRightFemale.active = data1.otherUserInfo.sex == consts.gender.FEMALE;
        this.ndPKGenderRightMale.active = data1.otherUserInfo.sex == consts.gender.MALE;

        console.log("=============", events.game.GAME_DATA, "=== ended");
    },

    // 游戏开始
    onReceive_GameStart: function onReceive_GameStart(data1, data2) {
        console.log("=============", events.game.lock.S2C_START, "=== started");
        this.printStartInfo(data1);
        if (data1.success != 0) {
            console.log("Game start failed: " + data1.success);
        }
        this.initGame();
        console.log("=============", events.game.lock.S2C_START, "=== ended");
    },

    // 更新游戏进度
    onReceive_UpdateProgress: function onReceive_UpdateProgress(data1, data2) {
        this.printProgressInfo(data1);
        this.oRemainLock = data1.otherProgress;
        this.lblLockOpRemaining.string = this.oRemainLock;
    },

    // 结算
    onReceive_Resolve: function onReceive_Resolve(data1, data2) {
        this.printResolveInfo(data1);
        this.resolve(data1.youWin);
    },

    // 发送命中消息给服务器
    sendHit: function sendHit(type) {
        if (!config.isNetwork) return;
        var data = {
            type: type
        };
        requestHandler.sendRequest(events.game.lock.S2C_HIT, data);
    },

    onDestroy: function onDestroy() {
        var serverListeners = [[events.game.GAME_DATA, this.onReceive_GameLogin, this], [events.game.lock.S2C_START, this.onReceive_GameStart, this], [events.game.lock.S2C_PROGRESS, this.onReceive_UpdateProgress, this], [events.game.lock.S2C_GAMEOVER, this.onReceive_Resolve, this]];
        serverListeners.forEach(function (element) {
            onfire.un(element[0]);
        });
        this.node.off(cc.Node.EventType.TOUCH_START);
        this.ndButtonBack.off(cc.Node.EventType.TOUCH_START);
        this.ndExitOK.off(cc.Node.EventType.TOUCH_END);
        this.ndExitCancel.off(cc.Node.EventType.TOUCH_END);
        this.ndButtonHelp.off(cc.Node.EventType.TOUCH_START);
        this.ndButtonHelp.off(cc.Node.EventType.TOUCH_END);
        this.ndButtonHelp.off(cc.Node.EventType.TOUCH_CANCEL);
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
        //# sourceMappingURL=Lock.js.map
        