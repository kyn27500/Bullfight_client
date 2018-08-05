
var self;
var serverConnect = require("ServerConnect");
var requestHandler = require("RequestHandler");
var onfire = require("onfire");
var events = require("CustomEvents");
var GameData = require("GameData")

cc.Class({
    extends: cc.Component,

    properties: {

        labelNotice: cc.Label,
        labelName: cc.Label,
        labelPlayerId: cc.Label,
        labelScore: cc.Label,

        btnRoom_niuniu: cc.Button,
        btnJoinRoom: cc.Button,
    },

    // use this for initialization
    onLoad: function () {
        self = this;

        serverConnect.connect(true);
        onfire.on(events.onfire.OPEN, this.onServerConnectOpen);
        onfire.on(events.onfire.ERROR, this.onServerConnectError);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    start() {

        // var data = {
        //     name: "唱山歌",
        //     playerId: 123,
        //     notice: "我是公告！",
        //     score: 23422,
        // }
        // self.setUserInfo(data)
    },

    onDestroy() {

    },

    onServerConnectError: function(obj) {
        console.log(JSON.stringify(obj));
    },

    onServerConnectOpen: function() {
        console.log("server connected");
        onfire.un(events.onfire.OPEN);

        onfire.on(events.hall.S2C_LOGIN, function(data1, data2) {
            console.log("s_game_login=====", data1);
            GameData.setUserInfo(data1.userInfo);
            self.setUserInfo(data1.userInfo)
            onfire.un(events.hall.S2C_LOGIN);
        });

        var url=window.location.href;  
        var argsObj = self.getUrlArgs(url); 

        var data = {
            loginId:argsObj.loginId || new Date().getTime()%1000
        };
        requestHandler.sendRequest(events.hall.C2S_LOGIN, data);
    },

    /**
     * 获取url参数
     * @param {string} url 
     */
    getUrlArgs(url){
        if(!url || url=="" || url.indexOf("?")==-1){
            return {}
        }
        var arr = url.split('?')[1].split('&')
        var theRequest = new Object();
        for (var i = 0; i < arr.length; i++) {
            var kye = arr[i].split("=")[0]
            var value = arr[i].split("=")[1]
            // 给对象赋值
            theRequest[kye] = value
        }
        return theRequest;
    },
    joinRoom() {
        var onResourceLoaded = function(errorMessage, loadedResource) {
            //检查失败原因
            if (errorMessage) {
                cc.log('加载失败, 原因:' + errorMessage);
                return;
            }
            if (!(loadedResource instanceof cc.Prefab)) {
                cc.log('类型不对！');
                return;
            } //這個是型別的檢查

            //接著，我們就可以進行實例化了
            var gamePrefab = cc.instantiate(loadedResource);
            self.node.addChild(gamePrefab);
            
        };
        //這邊才是真的使用cc.loader進行載入，並且呼叫我們上面寫的方法
        cc.loader.loadRes("Prefab/join_room", onResourceLoaded);
    },

    /**
     * 设置用户信息
     * @param {*} data 
     */
    setUserInfo(data) {
        self.labelName.string = data.name;
        self.labelPlayerId.string = data.uid;
        // self.labelNotice.string = data.notice;
        self.labelScore.string = data.score;
    }
});
