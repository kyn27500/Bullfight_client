"use strict";
cc._RF.push(module, '3a311dHtBZAYrzCtAgH3YKV', 'Game');
// resources/Script/view/Game.js

"use strict";

var self;
var requestHandler = require("RequestHandler");
var onfire = require("onfire");
var events = require("CustomEvents");
var GameData = require("GameData");
cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: cc.Node,
        seatNode: cc.Node,
        btnReady: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {

        self = this;
        self.userInfo = GameData.getUserInfo();
        self.roomCode = GameData.getRoomCode();
        // 初始化控件
        self.initWidget
        // 设置监听
        ();var listenerList = [[events.hall.HALL_DATA, this.onReceive_login, this], [events.game.S2C_SEAT_CHOOSE, this.onReceive_sitDown, this], [events.game.S2C_SYN_SEATS, this.onReceive_syn_seat, this], [events.game.S2C_READY, this.onReceive_Ready, this]];
        listenerList.forEach(function (element) {
            onfire.on(element[0], element[1], element[2]);
        });
    },

    /**
     * 初始化控件
     */
    initWidget: function initWidget() {
        // 玩家
        self.players = [];
        // 座位
        self.seats = [];
        for (var index = 1; index < 13; index++) {
            // 设置玩家
            self.players[index] = self.playerNode.getChildByName("player" + index).getComponent("Player");
            // 设置座位
            self.seats[index] = self.seatNode.getChildByName("site" + index);
        }

        self.btnReady.active = false;
    },


    /**
     * 登录返回结果
     * @param {*} data 
     */
    onReceive_login: function onReceive_login(data) {
        console.log("进入游戏，接受数据：", data);
        self.userInfo = data.userInfo;
        onfire.un(events.hall.HALL_DATA);
    },

    /**
     * 坐下
     * @param {*} seatId 
     */
    sitDown: function sitDown(event, seatId) {
        seatId = Number(seatId);
        if (self.mySeatId) {
            // self.seats[self.mySeatId].active = true;
            self.players[self.mySeatId].sitUp();
        }

        self.mySeatId = seatId;
        console.log("选择座位：", seatId);
        var data = {
            roomNo: self.roomCode,
            seatId: seatId
        };
        requestHandler.sendRequest(events.game.C2S_SEAT_CHOOSE, data);
    },


    /**
     * 收到坐下回调
     * @param {*} data 
     */
    onReceive_sitDown: function onReceive_sitDown(data) {
        // self.seats[self.mySeatId].active = false;
        // self.players[self.mySeatId].create(self.userInfo)
        console.log("坐下返回：", data);
        self.btnReady.active = true;
    },


    /**
     * 同步坐下情况
     * @param {*} data 
     */
    onReceive_syn_seat: function onReceive_syn_seat(data) {
        console.log("同步坐下玩家信息：", data);
        var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        data.seatPlayers.forEach(function (element) {
            // 显示玩家数据
            var seatId = element.seatIndex;
            self.players[seatId].create(element
            // 隐藏坐下按钮
            );self.seats[self.mySeatId].active = false;
            var index = list.indexOf(seatId);
            list.splice(index, 1);
        });

        // 显示其他 坐下按钮
        list.forEach(function (element) {
            self.seats[element].active = true;
        });
    },
    sendReady: function sendReady() {
        var data = {
            roomNo: self.roomCode,
            seatId: self.mySeatId
        };
        requestHandler.sendRequest(events.game.C2S_READY, data);
    },
    onReceive_Ready: function onReceive_Ready(data) {
        if (data.result == 0) {
            self.btnReady.active = false;
        }
    }
});

cc._RF.pop();