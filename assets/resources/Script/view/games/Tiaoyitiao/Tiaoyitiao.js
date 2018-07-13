var config = require("config");
var onfire = require("onfire");
var imgConfig = require("tyt_ImgConfig");
var Tools = require("Tools");
var requestHandler = require("RequestHandler");
var events = require("CustomEvents");
var scenes = require("SceneList");
var HallData = require("HallData");
var prefabHelper = require("PrefabHelper");
var consts = require("Constants");
var globalData = require("Global");

var myUserInfo = null;
var otherUserInfo = null;

var m_debug = false;
var m_personHalfHeight = 52;
var m_totalTime = 120;
var m_isGameOver = false;

// 最大跳跃 计数
var m_maxUpdateCount = 50;

cc.Class({
    extends: cc.Component,

    properties: {

        resultHolder: cc.Node,
        btnBack: cc.Button,
        btnHelp: cc.Button,

        // 桌子节点
        tableNode: cc.Node,

        // 背景节点，用于监听 按压事件
        spriteBg: cc.Node,

        // 我的分数、我的名字、我的头像
        myScoreLabel: cc.Label,
        myNameLabel: cc.Label,
        myHead: cc.Sprite,
        myGenderMale: cc.Node,
        myGenderFemale: cc.Node,

        // 对方分数、对方名字、对方头像
        otherScoreLabel: cc.Label,
        otherNameLabel: cc.Label,
        otherHead: cc.Sprite,
        otherGenderMale: cc.Node,
        otherGenderFemale: cc.Node,

        // 倒计时标签
        timeLabel: cc.Label,

        // 得分标签
        scoreLabel: cc.Label,

        spriteFrames: Array,
        myProgressId: 0,
        otherProgressId: 0,

        // 我的小人节点
        myPersonNode: null,

        // 对方小人节点
        otherPersonNode: null,

        // 我的上次位置，失败时，恢复上次位置
        myLastPos: null,

        // 对方上次位置
        otherLastPos: null,

        // 音效文件：
        sound_tv: cc.AudioSource,
        sound_beer: cc.AudioSource,
        sound_combo1: cc.AudioSource,
        sound_combo2: cc.AudioSource,
        sound_combo3: cc.AudioSource,
        sound_combo4: cc.AudioSource,
        sound_combo5: cc.AudioSource,
        sound_combo6: cc.AudioSource,
        sound_combo7: cc.AudioSource,
        sound_combo8: cc.AudioSource,
        sound_fail: cc.AudioSource,
        sound_fire: cc.AudioSource,
        sound_jilu: cc.AudioSource,
        sound_jumpdown: cc.AudioSource,
        sound_jumpup: cc.AudioSource,
        sound_limitPress: cc.AudioSource,
        sound_pressing: cc.AudioSource,
        sound_reborn: cc.AudioSource,
        sound_water: cc.AudioSource,
        sound_music: cc.AudioSource,
        sound_xiaodeng: cc.AudioSource,

        // 倒计时
        time: null,

        //更新事件
        isMove: false,
        updateCount: null,

        // 是否跳跃中
        isJumping: null,

        // 当前跳跃距离
        curJumpDistance: null,

        // 块坐标 列表
        posList: null,

        // 最远跳跃距离
        maxJumpDistance: 0,

        //平均每次跳跃距离  
        stepDistance: 0,

        // 总分数
        myTotalScore: 0,

        // 当前加分
        myCurScore: 0,

        // 上次分数
        myLastScore: 0,

        // 对方总分数
        otherTotalScore: 0,

        // 特殊图案加分列表
        extraScoreList: null,

        // 退出
        ndExitFrame: cc.Node,

        // 教程
        ndTutorial: cc.Node,
        ndHelpButton: cc.Node,
    },

    onBackClicked: function(customEventData) {
        this.ndExitFrame.active = true;
    },

    onExitOK: function(customEventData) {
        this.exitGame();
    },

    onExitCancel: function(customEventData) {
        this.ndExitFrame.active = false;
    },

    // 退出游戏
    exitGame: function() {
        var data = {
            appId: HallData.getCurGameInfo().appId,
            token: globalData.myUserInfo.token,
        };
        requestHandler.sendRequest(events.game.C2S_EXIT_GAME, data);
        cc.director.loadScene(scenes.hall.HALL, function() {
            onfire.fire(events.hall.HALL_DATA, HallData.rawData);
        });
    },

    onLoad() {

        this.stepDistance = Math.floor(this.maxJumpDistance / m_maxUpdateCount);

        // 网络监听列表
        var listenerList = [
            [events.game.GAME_DATA, this.onReceive_login, this],
            [events.game.tiaoyitiao.S2C_START, this.onReceive_start, this],
            [events.game.tiaoyitiao.S2C_PLAY, this.onReceive_play, this],
            [events.game.tiaoyitiao.S2C_PROGRESS, this.onReceive_progress, this],
            [events.game.tiaoyitiao.S2C_GAMEOVER, this.onReceive_overGame, this],
        ]
        listenerList.forEach(element => {
            onfire.on(element[0], element[1], element[2]);
        });

        // 教程事件
        this.ndHelpButton.on(cc.Node.EventType.TOUCH_START, function() {
            this.ndTutorial.active = true;
        }, this);
        this.ndHelpButton.on(cc.Node.EventType.TOUCH_END, function() {
            this.ndTutorial.active = false;
        }, this);
        this.ndHelpButton.on(cc.Node.EventType.TOUCH_CANCEL, function() {
            this.ndTutorial.active = false;
        }, this);

        // 无网络状态
        if (!config.isNetwork) {
            // 默认单机测试数据
            this.gameData = [];
            for (let index = 0; index < 200; index++) {
                if (index == 0) {
                    // 第一个 随机数据
                    var list = [1006, 1009, 1011, 1022, 1016, 1014];
                    this.gameData[index] = {
                        nodeId: list[Math.floor(Math.random() * 10 % list.length)],
                        direction: Math.random() * 10 < 5 ? 1 : 2,
                        distance: 350
                    };
                } else if (index < 30) {
                    this.gameData[index] = {
                        nodeId: 1000 + index + 1,
                        direction: Math.random() * 10 < 5 ? 1 : 2,
                        distance: 350
                    };
                    if (index == 1) {
                        this.gameData[index].direction = 2;
                    }
                } else {
                    this.gameData[index] = {
                        nodeId: 1000 + Math.floor(Math.random() * 100 % 29 + 1),
                        direction: Math.random() * 10 < 5 ? 1 : 2,
                        distance: 350
                    };
                }

            }
            this.initGame();

            // 获取时间戳
            this.startTime = new Date().getTime();
        }
    },

    // 销毁时调用
    onDestroy() {
        // 移除监听
        var listenerList = [
            [events.game.GAME_DATA, this.onReceive_login, this],
            [events.game.tiaoyitiao.S2C_START, this.onReceive_start, this],
            [events.game.tiaoyitiao.S2C_PLAY, this.onReceive_play, this],
            [events.game.tiaoyitiao.S2C_PROGRESS, this.onReceive_progress, this],
            [events.game.tiaoyitiao.S2C_GAMEOVER, this.onReceive_overGame, this],
        ]
        listenerList.forEach(element => {
            onfire.un(element[0]);
        });
        this.ndHelpButton.off(cc.Node.EventType.TOUCH_START);
        this.ndHelpButton.off(cc.Node.EventType.TOUCH_END);
        this.ndHelpButton.off(cc.Node.EventType.TOUCH_CANCEL);
    },

    // 初始化游戏
    initGame() {

        this.time = 0;
        var self = this;
        this.posList = [];
        m_isGameOver = false;

        // 加载 文件夹资源
        Tools.loadResDir("games/tiaoyitiao", function(spriteFrames) {
            self.spriteFrames = spriteFrames;
            //创建两个块
            self.createNode(0);
            self.createNode(1);
            // 创建人物
            self.createPersonNode();
            // 移动到中心点
            self.moveNodeToCenter(1);
        });

        // 注册监听
        this.registerTouchEvent();
        // 初始化分数
        this.updateTotalScore(this.myTotalScore, this.otherTotalScore);

        // 头像
        Tools.loadRemoteImage(myUserInfo.icon, this.myHead);
        Tools.loadRemoteImage(otherUserInfo.icon, this.otherHead);

        // 名称
        this.myNameLabel.string = myUserInfo.name;
        this.otherNameLabel.string = otherUserInfo.name;

        // 性别
        this.myGenderMale.active = (myUserInfo.sex == consts.gender.MALE);
        this.myGenderFemale.active = (myUserInfo.sex == consts.gender.FEMALE);
        this.otherGenderMale.active = (otherUserInfo.sex == consts.gender.MALE);
        this.otherGenderFemale.active = (otherUserInfo.sex == consts.gender.FEMALE);
    },

    // 网络回调：登录数据
    onReceive_login(data1, data2) {
        console.log(data1);
        this.gameData = data1.gameData;
        myUserInfo = data1.myUserInfo;
        otherUserInfo = data1.otherUserInfo;
        this.initGame();
    },

    // 网络回调：游戏开始
    onReceive_start(data1, data2) {
        // 获取时间戳
        this.startTime = new Date().getTime();
    },

    // 网络回调：游戏过程
    onReceive_play(data1, data2) {

    },

    // 网络回调：对方数据
    onReceive_progress(data1, data2) {

        if (data1.otherDistance > 0) {
            this.getJumpData(data1.otherDistance, data1.otherProgressId, false);
        }
        // 设置总分数
        this.updateTotalScore(null, data1.otherScore);
    },

    // 网络回调：游戏结束
    onReceive_overGame(data1, data2) {
        console.log("-------- s_tiaoYiTiao_overGame ------  ");
        console.log(data1);
        m_isGameOver = true;
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
        prefabHelper.createResultScreen(this.resultHolder, resultData);
    },

    // 更新
    update(dt) {
        // 更新时间
        if (this.startTime) {
            var curTime = new Date().getTime();
            var stepTime = Math.floor((curTime - this.startTime) / 1000);
            if (m_totalTime - stepTime < 0) {
                console.log("游戏结束！");
                this.startTime = 0;
            } else {
                this.timeLabel.string = (m_totalTime - stepTime);
            }

        }
    },

    //创建块
    createNode(nNextId, callback) {

        if (this.tableNode.getChildByTag(nNextId)) {
            if (callback) {
                callback();
            };
            return;
        }
        var self = this;
        var nodeData = this.gameData[nNextId];
        var nodeInfo = imgConfig[nodeData.nodeId.toString()];

        var node1 = new cc.Node();
        var sprite = node1.addComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteFrames[nodeInfo.img1];

        var node2 = new cc.Node();
        var sprite = node2.addComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteFrames[nodeInfo.img2];
        node2.scale = nodeInfo.scale;

        // 设置锚点，添加节点
        node2.setAnchorPoint(cc.p(0.5, 0));
        node1.setPosition(nodeInfo.pos);

        node2.addChild(node1, 0, 1001);
        this.tableNode.addChild(node2, 1, nNextId);

        // 计算节点
        var pos = this.calcPostion(nNextId);
        var node2Pos = cc.p(pos.x - nodeInfo.pos.x * nodeInfo.scale, pos.y - nodeInfo.pos.y * nodeInfo.scale);
        node2.setPosition(node2Pos);

        // 创建阴影
        var funcCreateShadow = function(params) {
            var shadow = new cc.Node();
            var sprite = shadow.addComponent(cc.Sprite);
            sprite.spriteFrame = self.spriteFrames[nodeInfo.img3];
            shadow.setPosition(nodeInfo.shadowPos);
            node2.addChild(shadow, -10, 1003);
        }

        // 动画 从上落下
        if (nNextId > 1) {
            node2.setPosition(node2Pos.x, node2Pos.y + 100);
            var moveTo = cc.moveTo(0.3, node2Pos);
            var cf_callback = cc.callFunc(function() {
                if (callback) {
                    funcCreateShadow();
                    callback();
                };
            });
            var seq = cc.sequence(moveTo, cf_callback);
            node2.runAction(seq);
        } else {
            funcCreateShadow()
        }

        // 调试模式
        if (m_debug) {
            var node = new cc.Node();
            var label = node.addComponent(cc.Label);
            label.string = nNextId + "," + nodeData.nodeId;
            node.x = pos.x - 100;
            node.y = pos.y + 100;
            this.tableNode.addChild(node);
        }
    },

    //创建小人
    createPersonNode() {
        // 对方小人
        this.otherPersonNode = new cc.Node();
        this.otherPersonNode.opacity = 120;
        var sprite = this.otherPersonNode.addComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteFrames["xiaoren_blue"];
        this.otherPersonNode.setPosition(this.posList[0].x - 33, this.posList[0].y + 66);
        this.tableNode.addChild(this.otherPersonNode, 3);
        // 我的小人
        this.myPersonNode = new cc.Node();
        var sprite = this.myPersonNode.addComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteFrames["xiaoren_red"];
        this.myPersonNode.setPosition(this.posList[0].x + 39, this.posList[0].y + 25);
        this.tableNode.addChild(this.myPersonNode, 4);
        // 获取起点位置
        this.myLastPos = this.myPersonNode.getPosition();
        this.myLastPos.y = this.myLastPos.y - m_personHalfHeight;
        this.otherLastPos = this.otherPersonNode.getPosition();
        this.otherLastPos.y = this.otherLastPos.y - m_personHalfHeight;
    },

    // 计算坐标
    calcPostion(nNextId) {
        if (nNextId == 0) {
            this.posList[0] = cc.p(300, 210);
            return this.posList[0];
        } else {
            var dis = this.gameData[nNextId].distance;
            var dir = this.gameData[nNextId].direction;
            var y = Math.floor(dis / 2);
            var x = Math.floor(dis / 2 * 1.73);
            var curPos = this.posList[nNextId - 1];
            var nextPos = cc.p(curPos.x + (dir == 2 ? 1 : -1) * x, curPos.y + y);
            this.posList[nNextId] = nextPos;
            return nextPos;
        }
    },

    // 移动到中点
    moveNodeToCenter(nNextId) {
        var pos = cc.p(320, 350);
        var curPos = this.posList[nNextId - 1];
        var nextPos = this.posList[nNextId];
        var midPos = cc.p((curPos.x + nextPos.x) / 2, (curPos.y + nextPos.y) / 2);
        var mvToPos = cc.p(pos.x - midPos.x, pos.y - midPos.y);

        var moveTo = cc.moveTo(0.5, mvToPos);
        this.tableNode.runAction(moveTo);
    },

    // 注册监听
    registerTouchEvent() {
        var began = function(event) {
            if (m_isGameOver) return;
            console.log("-----------   began   ------------");
            if (this.isJumping) {
                return
            }
            this.updateCount = 0;
            this.isMove = true;

            // 清理额外加分节点 2s
            this.tableNode.removeChildByTag(2002)

            // 按压效果
            var anim_anya = this.createAnimationByName("anya", 1, 99)
            anim_anya.setPosition(20, -10);
            this.myPersonNode.addChild(anim_anya, 0, 101);
            this.touchPress(true);
        };

        var end = function(event) {
            if (m_isGameOver) return;
            console.log("-----------   end   ------------", this.updateCount);
            if (this.isJumping) {
                return
            }
            // 起跳音效
            this.sound_jumpup.play();

            this.isJumping = true;
            this.isMove = false;
            this.touchPress(false);
            this.setMidPoint();
            // 清理蓄力 效果
            this.myPersonNode.removeChildByTag(101);
            this.runBoxEffect();
            var distance = this.stepDistance * this.updateCount;
            this.getJumpData(distance, this.myProgressId + 1, true);
        }
        this.spriteBg.on(cc.Node.EventType.TOUCH_START, began, this);
        this.spriteBg.on(cc.Node.EventType.TOUCH_END, end, this);
    },

    // 按压调整
    touchPress(isPress) {

        // 按压
        if (isPress) {
            // 以秒为单位的时间间隔
            var interval = 0.02;
            // 重复次数
            var repeat = m_maxUpdateCount;
            // 开始延时

            var self = this;
            this.btnBack.schedule(function() {
                self.updateCount = self.updateCount + 1;
                self.updateBoxScaleY(self.updateCount);
                if (self.updateCount == m_maxUpdateCount) {
                    self.sound_limitPress.play();
                }
            }, interval, repeat, 0);
        } else {
            this.sound_limitPress.stop();
            this.btnBack.unscheduleAllCallbacks();
        }
    },

    // 播放动画音效
    playAnimationSound(animationName, isSelf) {
        if (animationName == "dianshi") {
            this.sound_tv.play();
        } else if (animationName == "anya") {
            this.sound_pressing.play();
        } else if (animationName == "luodi") {
            this.sound_jumpdown.play();
        } else if (animationName == "luoshui" && isSelf) {
            this.sound_fail.play();
        } else if (animationName == "maoyan") {
            this.sound_fire.play();
        } else if (animationName == "pijiupao") {
            this.sound_beer.play();
        } else if (animationName == "shuilifang") {
            this.sound_water.play();
        } else if (animationName == "xiaodeng") {
            this.sound_xiaodeng.play();
        } else if (animationName == "zhongxindian") {
            if (this.myCurScore == 2) {
                this.sound_combo1.play();
            } else if (this.myCurScore == 4) {
                this.sound_combo2.play();
            } else if (this.myCurScore == 6) {
                this.sound_combo3.play();
            } else if (this.myCurScore == 8) {
                this.sound_combo4.play();
            } else if (this.myCurScore == 10) {
                this.sound_combo5.play();
            } else if (this.myCurScore == 12) {
                this.sound_combo6.play();
            } else if (this.myCurScore == 14) {
                this.sound_combo7.play();
            } else if (this.myCurScore >= 16) {
                this.sound_combo8.play();
            }
        } else if (animationName == "yinyue") {
            this.sound_music.play();
        }
    },

    //创建帧动画
    createAnimationByName(animName, speed, repeatCount, callback, isSelf) {

        this.playAnimationSound(animName, isSelf);

        var node = new cc.Node(animName);
        var sprite = node.addComponent(cc.Sprite);
        sprite.trim = false;

        var animation = node.addComponent(cc.Animation);

        // 注册
        animation.on('finished', function() {
            if (callback) {
                callback(node);
            }
        }, this);

        var frameCount = 0
        var frames = [];
        for (let index = 0; index < 99; index++) {
            var frameName = animName + "_" + (index + 1);
            if (this.spriteFrames[frameName]) {
                frameCount = frameCount + 1;

                frames[index] = this.spriteFrames[frameName];
                var originalSize = frames[index].getOriginalSize()
                frames[index].setRect(cc.rect(0, 0, originalSize.width, originalSize.height));
            } else {
                break;
            }
        }

        var clip = cc.AnimationClip.createWithSpriteFrames(frames, frameCount);
        clip.name = "run";
        animation.addClip(clip);
        var anim = animation.play('run');
        anim.speed = speed || 6;
        if (repeatCount == 99) {
            anim.repeatCount = Infinity;
        } else {
            anim.repeatCount = repeatCount;
        }
        return node
    },

    // 箱子压缩
    updateBoxScaleY(count) {
        if (count <= m_maxUpdateCount) {
            var k = 200;
            var node = this.tableNode.getChildByTag(this.myProgressId);
            node.scaleY = node.scaleX - count / k;
            // 人物缩小，并下移
            this.myPersonNode.scaleY = this.myPersonNode.scaleX - count / k;
            this.myPersonNode.y = this.myLastPos.y + m_personHalfHeight - this.tableNode.getChildByTag(this.myProgressId).height * count / k;
        }
    },

    // 发射弹力箱子
    runBoxEffect() {
        var node = this.tableNode.getChildByTag(this.myProgressId);

        var scaleTo = cc.scaleTo(0.03, node.scaleX, node.scaleX + 0.04);
        scaleTo.easing(cc.easeIn(3.0));
        var moveUp = cc.moveBy(0.1, cc.p(0, 5));

        var spawn1 = cc.spawn(scaleTo, moveUp);

        var scaleTo1 = cc.scaleTo(0.03, node.scaleX);
        var spawn2 = cc.spawn(moveUp.reverse(), scaleTo1);

        var rotate = cc.rotateBy(0.1, 1);
        var seq = cc.sequence(spawn1, spawn2);
        node.runAction(seq);
    },

    // 计算跳跃数据
    getJumpData(distance, gameDataIndex, isSelf) {

        var nextData = this.gameData[gameDataIndex];
        console.log("计算距离：", distance, nextData.distance);
        //计算上个中心点位置 （TODO 目前使用上个块的中心点， 实际应计算人物位置，因为第一个点人物站位不在 标准线上）
        // var topNode = this.tableNode.getChildByTag(this.myProgressId).getChildByTag(1001);
        // var curCenterPos = topNode.convertToWorldSpace(cc.p(topNode.width/2,topNode.height/2));
        // curCenterPos = this.tableNode.convertToNodeSpace(curCenterPos);

        var curCenterPos = this.posList[gameDataIndex - 1];

        var jumpPos;
        var isAtCenter;

        // 默认 中心点 前后两个点，也让他跳中，提高中心点 命中率
        if (Math.abs(distance - nextData.distance) <= this.stepDistance * 2) {
            jumpPos = this.posList[gameDataIndex];
            isAtCenter = true;
        } else {
            isAtCenter = false;

            // 计算终点位置
            var y = Math.floor(distance / 2);
            var x = Math.floor(distance / 2 * 1.73);
            jumpPos = cc.p(curCenterPos.x + (nextData.direction == 1 ? -x : x), curCenterPos.y + y);
        }

        //

        // 判断是否 跳在台子上
        var nextInfo = imgConfig[nextData.nodeId.toString()];
        var jumpResult;
        if (Math.abs(distance - nextData.distance) * 2 < nextInfo["distance" + nextData.direction] * nextInfo.scale) {
            jumpResult = {
                success: 0,
                nextId: gameDataIndex, //这里是下一个，也可能跳过一个，到第三个上面
            }
        } else {
            //  检查再下个 是否
            jumpResult = {
                success: 1,
                nextId: gameDataIndex, //这里是下一个，也可能跳过一个，到第三个上面,       //这里是下一个，也可能跳过一个，到第三个上面
            }
        }
        // 跳跃效果
        this.jumpEffect(isSelf ? this.myLastPos : this.otherLastPos, jumpPos, isSelf, nextData.direction, jumpResult);

        // 是否是自己
        if (isSelf) {
            // 计算分数
            this.calcScore(jumpResult.success, isAtCenter);

            // 同步数据给另个玩家
            if (config.isNetwork) {

                var data = {
                    progressId: gameDataIndex,
                    score: this.myCurScore,
                    distance: distance,
                }
                requestHandler.sendRequest("c_tiaoYiTiao_play", data);
            }
        }

    },

    // 计算分数
    calcScore(nJumpSuccess, isAtCenter) {

        if (nJumpSuccess == 0) {
            if (isAtCenter) {
                if (this.myLastScore < 2) {
                    this.myCurScore = 2;
                } else {
                    this.myCurScore = this.myLastScore + 2;
                }
            } else {
                this.myCurScore = 1;
            }
            this.myLastScore = this.myCurScore;
            this.myTotalScore = this.myTotalScore + this.myCurScore;
        } else {
            this.myCurScore = 0;
            this.myLastScore = 0;
        }
    },

    // 跳跃
    jumpEffect(startPos, endPos, isSelf, direction, jumpResult) {
        var persoNode = isSelf == true ? this.myPersonNode : this.otherPersonNode;
        persoNode.setPosition(startPos);

        //弹出时，小人伸展
        var scaleTo1 = cc.scaleTo(0.1, 1, 1.2);
        var scaleTo2 = cc.scaleTo(0.1, 1);
        var seq = cc.sequence(scaleTo1, scaleTo2);
        seq.easing(cc.easeOut(1.5));
        persoNode.runAction(seq);

        // 贝塞尔曲线跳跃
        var at = 0.4
        var sp = cc.p(startPos.x, startPos.y + m_personHalfHeight);
        var ep = cc.p(endPos.x, endPos.y + m_personHalfHeight);
        var cp = cc.p((sp.x + ep.x) / 2, sp.y + 600);
        var bezier = [sp, cp, ep];
        var bezierTo = cc.bezierTo(at, bezier);
        var rotate = cc.rotateBy(at, direction == 2 ? 360 : -360);
        var spa = cc.spawn(bezierTo, rotate);
        spa.easing(cc.easeOut(1.5));
        // 设置回调
        var self = this;
        var cf_callback = cc.callFunc(function() {

            self.checkJumpSuccess(endPos, isSelf, jumpResult);
        });
        var seq = cc.sequence(spa, cf_callback);
        persoNode.runAction(seq);

        // 画线 测试使用
        if (m_debug) {
            this.drawBezier(startPos, endPos, cp);
        }

    },

    // 计算跳跃,是否成功
    checkJumpSuccess(endPos, isSelf, jumpResult) {

        console.log("----- checkJumpSuccess:", jumpResult);
        // 跳成功
        if (jumpResult.success == 0) {
            if (isSelf) {
                this.myLastPos = endPos;
                this.isJumping = false;
                this.myProgressId = jumpResult.nextId;
                this.runAddScoreAction(this.myTotalScore, this.myCurScore);

                // 显示白点
                var self = this;
                var funcShowMidPoint = function() {
                    // 中心点
                    if (self.myCurScore >= 2) {
                        self.setMidPoint(self.myProgressId + 1);
                        // 跳中心点效果
                        var anim_jumpCenter = self.createAnimationByName("zhongxindian", 2, 1, function(pNode) {
                            pNode.removeFromParent();
                        })
                        anim_jumpCenter.setPosition(endPos);
                        self.tableNode.addChild(anim_jumpCenter, 1, 102);
                    } else {
                        // 跳中心点效果
                        var anim_jump = self.createAnimationByName("luodi", 2, 1, function(pNode) {
                            pNode.removeFromParent();
                        })
                        anim_jump.setPosition(endPos);
                        self.tableNode.addChild(anim_jump, 1, 103);
                    }
                };
                this.createNode(jumpResult.nextId + 1, funcShowMidPoint);
                this.moveNodeToCenter(this.myProgressId + 1);

                this.addExtraScore();

            } else {
                this.createNode(jumpResult.nextId + 1);
                this.otherLastPos = endPos;
                this.otherProgressId = jumpResult.nextId;
            }
        } else {
            this.setMidPoint();
            // 失败，恢复原位
            this.runLostAction(isSelf, endPos);
        }
    },

    // 等待2s 特殊图案加分
    addExtraScore() {
        // 检测是否是 特殊图案，停留可加分
        var nodeInfo = imgConfig[this.gameData[this.myProgressId].nodeId.toString()]
        if (nodeInfo.effect) {
            var node = new cc.Node();
            var delay = cc.delayTime(2);
            var self = this;
            var cf_addScore = cc.callFunc(function() {
                self.myTotalScore = self.myTotalScore + nodeInfo.score;
                self.runAddScoreAction(self.myTotalScore, nodeInfo.score)

                var animNode = self.createAnimationByName(nodeInfo.effect, 1, 1, function(pNode) {
                    pNode.removeFromParent();
                });
                animNode.setPosition(nodeInfo.effectPos);
                self.tableNode.getChildByTag(self.myProgressId).addChild(animNode);

                // TODO 发送网络 加分
                var data = {
                    progressId: self.myProgressId,
                    score: nodeInfo.score,
                    distance: 0,
                }
                requestHandler.sendRequest(events.game.tiaoyitiao.C2S_PLAY, data);

            });
            var seq = cc.sequence(delay, cf_addScore);
            node.runAction(seq);
            this.tableNode.addChild(node, 0, 2002)
        }
    },

    // 设置分数
    updateTotalScore(nMyScore, nOtherScore) {
        if (nMyScore) {
            this.myScoreLabel.string = nMyScore;
        };
        if (nOtherScore) {
            this.otherScoreLabel.string = nOtherScore;
        };
    },

    // 加分数
    runAddScoreAction(nTotalScore, nCurScore) {

        this.updateTotalScore(nTotalScore);

        this.scoreLabel.node.active = true;
        this.scoreLabel.string = "+" + nCurScore;

        this.scoreLabel.node.x = this.myPersonNode.x - 50;
        this.scoreLabel.node.y = this.myPersonNode.y + 100;

        var moveUp = cc.moveBy(0.4, cc.p(0, 50));
        var seq = cc.sequence(cc.show(), moveUp, cc.hide());
        this.scoreLabel.node.runAction(seq);

    },

    // 失败动画
    runLostAction(isSelf, endPos) {

        var node = isSelf ? this.myPersonNode : this.otherPersonNode;
        var curProgressId = isSelf ? this.myProgressId : this.otherProgressId;
        var zOrder = node.getLocalZOrder();

        // 检测跳跃终点在 块的后面
        if (endPos.y > this.posList[curProgressId + 1].y || endPos.y < (this.posList[curProgressId].y + this.posList[curProgressId + 1].y) / 2) {
            node.setLocalZOrder(0);
        }

        var moveDown = cc.moveBy(0.2, cc.p(0, -80));
        var self = this;

        var cf_callback = cc.callFunc(function() {
            if (isSelf) {
                node.setPosition(self.myLastPos.x, self.myLastPos.y + m_personHalfHeight);
            } else {
                node.setPosition(self.otherLastPos.x, self.otherLastPos.y + m_personHalfHeight);
            }
            node.setLocalZOrder(zOrder);

            var blink = cc.blink(0.3, 2);
            var cf_setIsJump = cc.callFunc(function() {
                self.isJumping = false;
            });
            var seq = cc.sequence(blink, cf_setIsJump);
            node.runAction(seq);
        });
        var delay = cc.delayTime(0.3);
        var seq = cc.sequence(moveDown, delay, cc.delayTime(0.1), cf_callback);
        node.runAction(seq);

        // 落水动画
        var anim_jumpLose = this.createAnimationByName("luoshui", 2, 1, function(pNode) {
            pNode.removeFromParent();
        }, isSelf)
        anim_jumpLose.setPosition(endPos);
        this.tableNode.addChild(anim_jumpLose, 0, 104);
    },

    // 创建白点
    setMidPoint(index) {

        if (index) {
            var node = new cc.Node();
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = this.spriteFrames["zhongxindian"];
            node.setPosition(this.posList[index]);
            this.tableNode.addChild(node, 1, 2001);

        } else {
            if (this.tableNode.getChildByTag(2001)) {
                this.tableNode.removeChildByTag(2001);
            }
        }

    },

    // 画线
    drawBezier(startPos, endPos, controlPos) {
        if (!this.drawNode) {
            this.drawNode = new cc.Node();
            this.tableNode.addChild(this.drawNode, 2);
            this.draw = this.drawNode.addComponent(cc.Graphics);
        }
        this.draw.clear();
        this.draw.moveTo(startPos.x, startPos.y);
        this.draw.quadraticCurveTo(controlPos.x, controlPos.y, endPos.x, endPos.y);

        this.draw.moveTo(startPos.x, startPos.y);
        this.draw.lineTo(endPos.x, endPos.y);

        // 画距离
        var info = imgConfig[this.gameData[this.myProgressId + 1].nodeId]
        var centerPos = this.posList[this.myProgressId + 1];

        // 计算distance1 
        var spaceY = info.distance1 / 4 * info.scale;
        var spaceX = Math.floor(spaceY * 1.73);
        this.draw.moveTo(centerPos.x - spaceX, centerPos.y + spaceY);
        this.draw.lineTo(centerPos.x + spaceX, centerPos.y - spaceY);


        // 计算distance2
        var spaceY = info.distance2 / 4 * info.scale;
        var spaceX = Math.floor(spaceY * 1.73);
        this.draw.moveTo(centerPos.x - spaceX, centerPos.y - spaceY);
        this.draw.lineTo(centerPos.x + spaceX, centerPos.y + spaceY);

        this.draw.stroke();
    },

});