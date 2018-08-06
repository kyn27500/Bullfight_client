(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/games/Lianliankan/Lianliankan.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8de81hve5JM7rGVF7hB1k5E', 'Lianliankan', __filename);
// resources/Script/view/games/Lianliankan/Lianliankan.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var onfire = require("onfire"); //处理事件的类库
var requestHandler = require("RequestHandler");
var config = require("config");
var tools = require("Tools");
var consts = require("Constants");
var events = require("CustomEvents");
var scenes = require("SceneList");
var globalData = require("Global");
var HallData = require("HallData");
var prefabHelper = require("PrefabHelper");
var myUserInfo = null;
var otherUserInfo = null;

cc.Class({
    extends: cc.Component,

    properties: {
        btnBack: cc.Button,
        btnHelp: cc.Button,
        ndHelp: cc.Node,
        myHead: cc.Sprite,
        myName: cc.Label,
        myProgress: cc.Label,
        otherHead: cc.Sprite,
        otherName: cc.Label,
        otherProgress: cc.Label,
        myGenderM: cc.Node,
        myGenderF: cc.Node,
        otherGenderM: cc.Node,
        otherGenderF: cc.Node,
        spGrid: cc.Node,

        soundFinish: cc.AudioSource,
        soundNoFinish: cc.AudioSource,

        ndExitFrame: cc.Node,
        btnExitOK: cc.Button,
        btnExitCancel: cc.Button,

        // icon资源
        spriteFrames: null,

        // 游戏数据
        gameData: Array,

        // 图片节点列表
        imgNodeList: null,

        // 点击图片次数 0为初始状态，1为点中了一张图片，2为点中两张图片（此时对比，并重置参数）
        touchCount: 0,

        // 点击图片1
        touchImgId_1: 0,

        // 点击图片2
        touchImgId_2: 0,

        // 连接数据
        connectData: null,

        // 检查标识
        checkFlag: 0,

        // 动画帧数组
        animFramesList: null,

        finishCount: 0,

        resultFrame: cc.Node
    },

    // 创建监听
    onLoad: function onLoad() {
        var $this = this;

        // 单机模式
        if (!config.isNetwork) {
            var data = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7];
            for (var index = 0; index < 69; index++) {
                var ran = Math.floor(Math.random() * 69);
                var tmp = data[index];
                data[index] = data[ran];
                data[ran] = tmp;
            }
            this.gameData = data;
            var onResourceLoaded = function onResourceLoaded(errorMessage, spriteFrames) {
                //检查失败原因
                if (errorMessage) {
                    cc.log('加载失败, 原因:' + errorMessage);
                    return;
                }
                $this.spriteFrames = spriteFrames;
                console.log("-----  onload -- loadImg end");
                $this.initImage(spriteFrames, data);
            };
            //這邊才是真的使用cc.loader進行載入，並且呼叫我們上面寫的方法
            cc.loader.loadResDir("games/lianliankan/icon", cc.SpriteFrame, onResourceLoaded);
        }
        // 加载动画资源
        cc.loader.loadResDir("games/lianliankan/effect/", cc.SpriteFrame, function (errorMessage, spriteFrames) {
            console.log(spriteFrames, spriteFrames.length);
            $this.animFramesList = spriteFrames;
        });

        // 网络监听列表
        var listenerList = [[events.game.GAME_DATA, this.onReceive_login, this], [events.game.lianliankan.S2C_START, this.onReceive_start, this], [events.game.lianliankan.S2C_PLAY, this.onReceive_play, this], [events.game.lianliankan.S2C_PROGRESS, this.onReceive_progress, this], [events.game.lianliankan.S2C_GAMEOVER, this.onReceive_overGame, this]];
        listenerList.forEach(function (element) {
            onfire.on(element[0], element[1], element[2]);
        });

        this.btnHelp.node.on(cc.Node.EventType.TOUCH_START, function () {
            this.ndHelp.active = true;
        }, this);
        this.btnHelp.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.ndHelp.active = false;
        }, this);
        this.btnHelp.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.ndHelp.active = false;
        }, this);
    },


    // 销毁时调用
    onDestroy: function onDestroy() {
        // 移除监听
        var listenerList = [[events.game.GAME_DATA, this.onReceive_login, this], [events.game.lianliankan.S2C_START, this.onReceive_start, this], [events.game.lianliankan.S2C_PLAY, this.onReceive_play, this], [events.game.lianliankan.S2C_PROGRESS, this.onReceive_progress, this], [events.game.lianliankan.S2C_GAMEOVER, this.onReceive_overGame, this]];
        listenerList.forEach(function (element) {
            onfire.un(element[0]);
        });

        this.btnHelp.node.off(cc.Node.EventType.TOUCH_START);
        this.btnHelp.node.on(cc.Node.EventType.TOUCH_END);
        this.btnHelp.node.on(cc.Node.EventType.TOUCH_CANCEL);
    },


    // 进入游戏
    onReceive_login: function onReceive_login(data1, data2) {

        console.log(data1, typeof data1 === "undefined" ? "undefined" : _typeof(data1));
        console.log(data1.gameData, _typeof(data1.gameData));

        this.gameData = data1.gameData;
        var $this = this;
        var onResourceLoaded = function onResourceLoaded(errorMessage, spriteFrames) {
            //检查失败原因
            if (errorMessage) {
                cc.log('加载失败, 原因:' + errorMessage);
                return;
            }
            $this.spriteFrames = spriteFrames;
            $this.initImage(spriteFrames, $this.gameData);
        };
        //這邊才是真的使用cc.loader進行載入，並且呼叫我們上面寫的方法
        cc.loader.loadResDir("games/lianliankan/icon", cc.SpriteFrame, onResourceLoaded);

        // 初始化用户数据
        myUserInfo = data1.myUserInfo;
        otherUserInfo = data1.otherUserInfo;
        this.myName.string = data1.myUserInfo.name;
        this.otherName.string = data1.otherUserInfo.name;
        tools.loadRemoteImage(myUserInfo.icon, this.myHead);
        tools.loadRemoteImage(otherUserInfo.icon, this.otherHead);
        this.myGenderF.active = myUserInfo.sex == consts.gender.FEMALE;
        this.myGenderM.active = myUserInfo.sex == consts.gender.MALE;
        this.otherGenderF.active = otherUserInfo.sex == consts.gender.FEMALE;
        this.otherGenderM.active = otherUserInfo.sex == consts.gender.MALE;

        // 设置进度
        this.onReceive_progress(data1.s_lianLianKan_progress);
    },

    // 游戏开始
    onReceive_start: function onReceive_start(data1, data2) {
        console.log("--------s_lianLianKan_start--------");
    },

    // 消除图片
    onReceive_play: function onReceive_play(data1, data2) {
        if (data1.success == 0) {
            this.imgNodeList[this.touchImgId_1].active = false;
            this.imgNodeList[this.touchImgId_2].active = false;
            // 效果
            this.runEffect(this.touchImgId_1, this.touchImgId_2, this.connectData);
            this.gameData[this.touchImgId_2] = 0;
            this.gameData[this.touchImgId_1] = 0;
        }
    },

    // 对方进度
    onReceive_progress: function onReceive_progress(data1, data2) {

        this.myProgress.string = Math.floor(data1.myProgress / 35 * 100) + "%";
        this.otherProgress.string = Math.floor(data1.otherProgress / 35 * 100) + "%";
    },

    // 游戏结束
    onReceive_overGame: function onReceive_overGame(data1, data2) {
        var result = data1.youWin;
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
        prefabHelper.createResultScreen(this.resultFrame, resultData);
    },


    // 创建图片
    initImage: function initImage(spriteFrames, imgData) {
        var _this = this;

        var spaceX = 76;
        var spaceY = 76;
        this.imgNodeList = [];
        var $this = this;

        var _loop = function _loop(index) {
            node = new cc.Node('sprite' + index);
            // 设置位置

            node.x = index % 7 * spaceX + 38;
            node.y = -Math.floor(index / 7) * spaceY - 38;
            _this.spGrid.addChild(node);
            //调用新建的node的addComponent函数，会返回一个sprite的对象  
            var sprite = node.addComponent(cc.Sprite);
            //给sprite的spriteFrame属性 赋值  
            sprite.spriteFrame = spriteFrames[imgData[index] - 1];
            // 赋值给list
            _this.imgNodeList[index] = node;
            button = node.addComponent(cc.Button);

            button.node.on('click', function () {
                $this.onClickImage({
                    "target": this.imgNodeList[index]
                }, index);
            }, _this);
        };

        for (var index = 0; index < imgData.length; index++) {
            var node;
            var button;

            _loop(index);
        }
    },

    // 设置点击效果
    setImgEffect: function setImgEffect(nImgId, isRecover) {
        if (isRecover) {
            this.imgNodeList[nImgId].scale = 1;
            var sprite = this.imgNodeList[nImgId].getComponent(cc.Sprite);
            sprite.spriteFrame = this.spriteFrames[this.gameData[nImgId] - 1];
        } else {
            this.imgNodeList[nImgId].scale = 1.2;
            var sprite = this.imgNodeList[nImgId].getComponent(cc.Sprite);
            sprite.spriteFrame = this.spriteFrames[this.gameData[nImgId] + 6];
        }
    },

    // 创建动画
    createAnimation: function createAnimation(id) {

        var node = new cc.Node("effect_" + id);
        node.scale = 0.6;
        node.addComponent(cc.Sprite);
        var animation = node.addComponent(cc.Animation);
        // 注册

        animation.on('finished', this.onFinished, this);

        // frames 这是一个 SpriteFrame 的数组.
        var maxIndex = id * 3;
        var frames = [this.animFramesList[maxIndex - 1], this.animFramesList[maxIndex - 2], this.animFramesList[maxIndex - 3], this.animFramesList[maxIndex - 3]];

        var clip = cc.AnimationClip.createWithSpriteFrames(frames, 4);
        clip.name = consts.game.lianliankan.ANI_RUN;
        animation.addClip(clip);
        var anim = animation.play(consts.game.lianliankan.ANI_RUN);
        anim.speed = 6;
        return node;
    },


    // 创建线
    createLine: function createLine(connectData) {

        var node = new cc.Node();
        var lineData = connectData.line;
        var spaceX = 76;
        var spaceY = 76;

        for (var index = 0; index < lineData.length / 2; index++) {
            var line = new cc.Node();
            node.addChild(line);
            var sprite = line.addComponent(cc.Sprite);
            sprite.spriteFrame = this.animFramesList[21];

            var inx = index * 2;
            var ax = lineData[inx][0] * spaceX + 38;
            var ay = -lineData[inx][1] * spaceY - 38;
            var bx = lineData[inx + 1][0] * spaceX + 38;
            var by = -lineData[inx + 1][1] * spaceY - 38;
            line.x = (ax + bx) / 2;
            line.y = (ay + by) / 2;

            if (lineData[inx][1] == lineData[inx + 1][1]) {
                line.rotation = 90;
                sprite.node.height = Math.abs(ax - bx);
            } else {
                sprite.node.height = Math.abs(ay - by);
            }
            console.log("---- :", line.height);
        }

        return node;
    },


    // 动画结束
    onFinished: function onFinished() {
        console.log("onFinished");
        this.spGrid.removeChildByTag(101);
    },

    // 消除效果
    runEffect: function runEffect(id1, id2, connectData) {
        console.log("消除：", id1, id2);
        var imgId = this.gameData[id1];
        if (imgId == 0) {
            return;
        }
        var effectNode = new cc.Node();
        this.spGrid.addChild(effectNode, 1, 101);

        // 创建线条
        // var line = this.createLine(connectData);
        // effectNode.addChild(line);

        var anim1 = this.createAnimation(imgId);
        var pos1 = this.imgNodeList[id1].getPosition();
        console.log("position1:", pos1.x, pos1.y);
        anim1.setPosition(pos1);
        effectNode.addChild(anim1);

        var anim2 = this.createAnimation(imgId);
        var pos2 = this.imgNodeList[id2].getPosition();
        anim2.setPosition(pos2);
        effectNode.addChild(anim2);
    },


    // 点击图片
    onClickImage: function onClickImage(event, customEventData) {
        // var node = event.target;
        // var sprite = node.getComponent(cc.Sprite);

        console.log(customEventData, this.gameData[customEventData]);
        if (customEventData == consts.game.lianliankan.BUTTON_BACK) {
            // 退出
            this.ndExitFrame.active = true;
        } else if (customEventData == consts.game.lianliankan.BUTTON_HELP) {
            // 教程

        } else {
            var node = event.target;
            var sprite = node.getComponent(cc.Sprite);
            // 换图
            this.setImgEffect(customEventData);
            // 点击图片处理
            if (this.touchCount == 0) {
                this.touchImgId_1 = customEventData;
                this.touchCount = 1;
            } else if (this.touchCount == 1) {
                this.touchCount = 0;
                this.touchImgId_2 = customEventData;
                if (customEventData == this.touchImgId_1) {
                    this.setImgEffect(customEventData, true);
                } else {
                    if (this.gameData[customEventData] == this.gameData[this.touchImgId_1]) {
                        // 选中两个一样的
                        this.connectData = this.checkIsLink(this.touchImgId_1, customEventData);

                        if (this.connectData.isConnect) {
                            console.log("几折：", this.connectData.count);
                            console.log("路线：", this.connectData.posList);
                            // 网络模式
                            if (config.isNetwork) {
                                var data = {
                                    imgId1: this.touchImgId_1,
                                    imgId2: this.touchImgId_2
                                    // posList:this.connectData["posList"]
                                };
                                requestHandler.sendRequest(events.game.lianliankan.C2S_PLAY, data);
                            } else {
                                node.active = false;
                                this.imgNodeList[this.touchImgId_1].active = false;
                                // 效果
                                this.runEffect(this.touchImgId_1, this.touchImgId_2, this.connectData);
                                this.gameData[this.touchImgId_2] = 0;
                                this.gameData[this.touchImgId_1] = 0;

                                this.finishCount = this.finishCount + 1;
                                this.onReceive_progress({
                                    myProgress: this.finishCount,
                                    otherProgress: 0
                                });
                            }
                            this.soundFinish.play();
                        } else {
                            // 重置图片
                            this.setImgEffect(customEventData, true);
                            this.setImgEffect(this.touchImgId_1, true);
                            this.soundNoFinish.play();
                        }
                    } else {
                        // 重置图片
                        this.setImgEffect(customEventData, true);
                        this.setImgEffect(this.touchImgId_1, true);
                        this.soundNoFinish.play();
                    }
                }
            }
        }
    },

    // 连连看连接算法
    checkIsLink: function checkIsLink(a, b) {
        // 解析a,b位置信息
        var ay = Math.floor(a / 7);
        var ax = a % 7;
        var by = Math.floor(b / 7);
        var bx = b % 7;
        // 检测0折情况
        this.checkFlag = 0;
        var ret = this.checkLink_0(ax, ay, bx, by);
        if (ret.isConnect) {
            return ret;
        }
        // 检测1折情况
        this.checkFlag = 1;
        ret = this.checkLink_1(ax, ay, bx, by);
        if (ret.isConnect) {
            return ret;
        }
        // 检测2折情况
        this.checkFlag = 2;
        ret = this.checkLink_2(ax, ay, bx, by);
        if (ret.isConnect) {
            return ret;
        }

        var rett = {
            isConnect: false
        };
        return rett;
    },

    // 检测0折
    checkLink_0: function checkLink_0(ax, ay, bx, by) {
        var ret = {
            isConnect: false
            // 在同一列
        };if (ax == bx) {
            // 几折
            ret.count = 0;
            // 经过的点
            ret.posList = [];
            // 上--》下
            if (ay < by) {
                for (var index = ay; index <= by; index++) {
                    if (index == ay || index == by || this.gameData[index * 7 + ax] == 0) {
                        ret.isConnect = true;
                        ret.posList.push([ax, index]);
                    } else {
                        ret.posList = [];
                        ret.isConnect = false;
                        break;
                    }
                }
                //  下--》上 
            } else {
                for (var _index = ay; _index >= by; _index--) {
                    if (_index == ay || _index == by || this.gameData[_index * 7 + ax] == 0) {
                        ret.isConnect = true;
                        ret.posList.push([ax, _index]);
                    } else {
                        ret.posList = [];
                        ret.isConnect = false;
                        break;
                    }
                }
            }

            if (this.checkFlag < 2 && ax == 0 || ax == 6 || ret["isConnect"]) {
                // 是否连接
                if (ret.isConnect) {
                    ret.line = [[ax, ay], [bx, by]];
                } else {
                    if (ax == 0) {
                        ret.line = [[ax, ay, "left"], [bx, by], "left"];
                    } else if (ax == 6) {
                        ret.line = [[ax, ay, "right"], [bx, by, "right"]];
                    }
                }

                ret.isConnect = true;
                return ret;
            }
        }

        // 在同一行
        if (ay == by) {
            // 几折
            ret.count = 0;
            // 经过的点
            ret.posList = [];
            // 左--》右
            if (ax < bx) {
                for (var _index2 = ax; _index2 <= bx; _index2++) {
                    if (_index2 == ax || _index2 == bx || this.gameData[ay * 7 + _index2] == 0) {
                        ret.isConnect = true;
                        ret.posList.push([ax, _index2]);
                    } else {
                        ret.posList = [];
                        ret.isConnect = false;
                        break;
                    }
                }
                //  右--》左
            } else {
                for (var _index3 = ax; _index3 >= bx; _index3--) {
                    if (_index3 == ax || _index3 == bx || this.gameData[ay * 7 + _index3] == 0) {
                        ret.isConnect = true;
                        ret.posList.push([ax, _index3]);
                    } else {
                        ret.posList = [];
                        ret.isConnect = false;
                        break;
                    }
                }
            }
            if (this.checkFlag < 2 && ay == 0 || ay == 9 || ret.isConnect) {
                // 是否连接
                if (ret.isConnect) {
                    ret.line = [[ax, ay], [bx, by]];
                } else {
                    if (ay == 0) {
                        ret.line = [[ax, ay, "up"], [bx, by], "up"];
                    } else if (ay == 9) {
                        ret.line = [[ax, ay, "down"], [bx, by, "down"]];
                    }
                }

                ret.isConnect = true;
                return ret;
            }
        }
        return ret;
    },
    // 检测1折
    checkLink_1: function checkLink_1(ax, ay, bx, by) {

        var ret = {
            isConnect: false,
            count: 1,
            posList: []
            // 一折情况：两个点组成矩形，找到另一个对角的两个关键点，分别连接 起始点，
        };if (this.gameData[by * 7 + ax] == 0) {
            var aToPos1 = this.checkLink_0(ax, ay, ax, by);
            if (aToPos1.isConnect) {
                var pos1ToB = this.checkLink_0(ax, by, bx, by);
                if (pos1ToB.isConnect) {
                    ret.isConnect = true;
                    aToPos1.posList.splice(aToPos1.posList.length - 1, 1);
                    ret.posList = aToPos1.posList.concat(pos1ToB.posList);
                    ret.line = aToPos1.line.concat(pos1ToB.line);
                    console.log("1折路线1：", ret.posList);
                    return ret;
                }
            }
        }
        if (this.gameData[ay * 7 + bx] == 0) {
            var aToPos2 = this.checkLink_0(ax, ay, bx, ay);
            if (aToPos2.isConnect) {
                var pos2ToB = this.checkLink_0(bx, ay, bx, by);
                if (pos2ToB.isConnect) {
                    ret.isConnect = true;
                    aToPos2.posList.splice(aToPos2.posList.length - 1, 1);
                    ret.posList = aToPos2.posList.concat(pos2ToB.posList);
                    ret.line = aToPos2.line.concat(pos2ToB.line);
                    console.log("1折路线2：", ret.posList);
                    return ret;
                }
            }
        }
        return ret;
    },
    // 检测2折
    checkLink_2: function checkLink_2(ax, ay, bx, by) {
        var ret = {
            isConnect: false,
            count: 2,
            posList: []
            // 上下左右四个方向，寻找1折线路
            // 上
        };for (var index = ay; index >= 0; index--) {
            if (index == ay) {
                ret.posList.push([ax, ay]);
            } else if (this.gameData[index * 7 + ax] == 0) {
                ret.posList.push([ax, index]);
                var ret1 = this.checkLink_1(ax, index, bx, by);
                if (ret1.isConnect) {
                    ret.isConnect = true;
                    ret.posList.splice(ret.posList.length - 1, 1);
                    ret.posList = ret.posList.concat(ret1.posList);

                    ret.line = [[ax, ay], [ax, index]];
                    ret.line = ret.line.concat(ret1.line);
                    return ret;
                    break;
                }
            } else {
                ret.posList = [];
                break;
            }
        }
        // 下
        for (var _index4 = ay; _index4 <= 9; _index4++) {
            if (_index4 == ay) {
                ret.posList.push([ax, ay]);
            } else if (this.gameData[_index4 * 7 + ax] == 0) {
                ret.posList.push([ax, _index4]);
                var ret1 = this.checkLink_1(ax, _index4, bx, by);
                if (ret1.isConnect) {
                    ret.isConnect = true;
                    ret.posList.splice(ret.posList.length - 1, 1);
                    ret.posList = ret.posList.concat(ret1.posList);

                    ret.line = [[ax, ay], [ax, _index4]];
                    ret.line = ret.line.concat(ret1.line);
                    return ret;
                    break;
                }
            } else {
                ret.posList = [];
                break;
            }
        }
        // 左
        for (var _index5 = ax; _index5 >= 0; _index5--) {
            if (_index5 == ax) {
                ret.posList.push([ax, ay]);
            } else if (this.gameData[ay * 7 + _index5] == 0) {
                ret.posList.push([_index5, ay]);
                var ret1 = this.checkLink_1(_index5, ay, bx, by);
                if (ret1.isConnect) {
                    ret.isConnect = true;
                    ret.posList.splice(ret.posList.length - 1, 1);
                    ret.posList = ret.posList.concat(ret1.posList);

                    ret.line = [[ax, ay], [_index5, ay]];
                    ret.line = ret.line.concat(ret1.line);
                    return ret;
                    break;
                }
            } else {
                ret.posList = [];
                break;
            }
        }
        // 右
        for (var _index6 = ax; _index6 <= 6; _index6++) {
            if (_index6 == ax) {
                ret.posList.push([ax, ay]);
            } else if (this.gameData[ay * 7 + _index6] == 0) {
                ret.posList.push([_index6, ay]);
                var ret1 = this.checkLink_1(_index6, ay, bx, by);
                if (ret1.isConnect) {
                    ret.isConnect = true;
                    ret.posList.splice(ret.posList.length - 1, 1);
                    ret.posList = ret.posList.concat(ret1.posList);

                    ret.line = [[ax, ay], [_index6, ay]];
                    ret.line = ret.line.concat(ret1.line);
                    return ret;
                    break;
                }
            } else {
                ret.posList = [];
                break;
            }
        }

        return ret;
    },

    onExitOK: function onExitOK(customEventData) {
        // 退出
        var data = {
            appId: HallData.getCurGameInfo().appId,
            token: globalData.myUserInfo.token
        };
        requestHandler.sendRequest(events.game.C2S_EXIT_GAME, data);
        cc.director.loadScene(scenes.hall.HALL, function () {
            onfire.fire(events.hall.HALL_DATA, HallData.rawData);
        });
    },

    onExitCancel: function onExitCancel(customEventData) {
        this.ndExitFrame.active = false;
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
        //# sourceMappingURL=Lianliankan.js.map
        