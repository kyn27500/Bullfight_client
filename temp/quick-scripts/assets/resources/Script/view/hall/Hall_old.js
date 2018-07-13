(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/hall/Hall_old.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6e23bJu+SNLZbqR+uMtcIEa', 'Hall_old', __filename);
// resources/Script/view/hall/Hall_old.js

"use strict";

var onfire = require("onfire"); //处理事件的类库
var requestHandler = require("RequestHandler");
var HallData = require("HallData");
var config = require("config");
var events = require("CustomEvents");
var consts = require("Constants");
var scenes = require("SceneList");
var tools = require("Tools");
var globalData = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        // 底部按钮
        btnPk: cc.Button,
        btnGame: cc.Button,
        btnMeet: cc.Button,
        // pk界面，游戏界面，约战界面
        pkLayer: cc.Node,
        gameLayer: cc.Node,
        meetLayer: cc.Node,

        // 游戏界面元素
        gameScrollContent: cc.Node,

        // 后退按钮
        btnBack: cc.Button
    },

    onBackClick: function onBackClick(customEventData) {
        globalData.disableAutoLogin = true;
        cc.director.loadScene(scenes.hall.LOGIN_SCENE);
    },

    onLoad: function onLoad() {
        var $this = this;
        console.log("------- onLoad");
        onfire.on(events.hall.HALL_DATA, function (data1, data2) {
            $this.setHallData(data1);
            onfire.un(events.hall.HALL_DATA);
        });

        // 创建监听
        var listenerList = [[events.hall.S2C_READY_ME, $this.onReceive_myReady, $this], [events.hall.S2C_READY_OPPONENT, $this.onReceive_otherReady, $this]];
        listenerList.forEach(function (element) {
            onfire.on(element[0], element[1], element[2]);
        });

        if (!config.isNetwork) {
            $this.setHallData({
                gameInfoList: config.gameInfoList
            });
        }

        // 预加载匹配场景
        cc.director.preloadScene(scenes.hall.READY);
    },


    // 销毁时调用

    onDestroy: function onDestroy() {
        // 创建监听
        var listenerList = [[events.hall.S2C_READY_ME], [events.hall.S2C_READY_OPPONENT]];
        // 移除监听
        listenerList.forEach(function (element) {
            onfire.un(element[0]);
        });
    },

    // start () {  
    // },

    // 我的准备结果
    onReceive_myReady: function onReceive_myReady(data1, data2) {
        console.log("--onReceive_myReady");
        // success:int 		描述：0为成功，其他为错误码
        if (data1.success == 0) {

            // TODO 进入匹配界面
            cc.director.loadScene(scenes.hall.READY);
        } else {
            console("s_daTing_myReady:success==", data1.success);
            //cc.director.loadScene("ready");
        }
    },

    // 别人的准备结果
    onReceive_otherReady: function onReceive_otherReady(data1, data2) {
        console.log("--onReceive_otherReady");
        // otherName:string 		描述：用户名称
        // otherIcon:string			描述：头像
        // otherSex:int				描述：性别男0女1
        // myCode:string			描述：自己游戏验证码
        // ip:string			    描述：游戏服地址
        // port:int			        描述：游戏服端口
        var curGameInfo = HallData.getCurGameInfo();

        onfire.on(events.game.S2C_LOGIN, function (data1, data2) {
            console.log("s_game_login=====", data1);
            // 切换场景
            console.log("------ login: ", curGameInfo.scene);
            cc.director.loadScene(curGameInfo.scene, function () {
                onfire.fire(events.game.GAME_DATA, data1, data2);
            });
            onfire.un(events.game.S2C_LOGIN);
        });

        var data = {
            // appId:curGameInfo.appId,
            roomKey: data1.roomKey,
            myCode: data1.myCode
        };
        requestHandler.sendRequest(events.game.C2S_LOGIN, data);
    },


    // 切换界面
    onChangeLayer: function onChangeLayer(event, customEventData) {
        this.gameLayer.active = customEventData == 1;
        this.pkLayer.active = customEventData == 2;
        this.meetLayer.active = customEventData == 3;
    },

    // 获取大厅数据
    setHallData: function setHallData(hallData) {
        this.hallData = hallData;
        HallData.rawData = hallData;
        HallData.setGameList(this.hallData.gameInfoList);
        console.log(this.hallData.gameInfoList);
        HallData.setUserInfo(this.hallData.userInfo);

        this.updateGameLayer(this.hallData.gameInfoList);
    },

    // 更新游戏界面数据
    updateGameLayer: function updateGameLayer(pGameData) {
        console.log("---- updateGameLayer:", pGameData);
        var spaceHeight = 280;
        this.gameScrollContent.height = Math.ceil(pGameData.length / 3) * spaceHeight + 20;

        var $this = this;
        var onResourceLoaded = function onResourceLoaded(errorMessage, loadedResource) {
            //检查失败原因
            if (errorMessage) {
                cc.log('加载失败, 原因:' + errorMessage);
                return;
            }
            if (!(loadedResource instanceof cc.Prefab)) {
                cc.log('类型不对！');
                return;
            } //這個是型別的檢查

            for (var index = 0; index < pGameData.length; index++) {
                var element = pGameData[index];

                var posX = (index % 3 + 0.5) * 213;
                var posY = Math.floor(index / 3) * -spaceHeight - 150;
                // console.log(posX,posY,element.gameId);
                //接著，我們就可以進行實例化了
                var gamePrefab = cc.instantiate(loadedResource);
                gamePrefab.setPosition(posX, posY);
                $this.gameScrollContent.addChild(gamePrefab);

                var script = gamePrefab.getComponent('GameItem');
                script.updateItem(element);
            }
        };
        //這邊才是真的使用cc.loader進行載入，並且呼叫我們上面寫的方法
        cc.loader.loadRes("prefabs/pb_game", onResourceLoaded);
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
        //# sourceMappingURL=Hall_old.js.map
        