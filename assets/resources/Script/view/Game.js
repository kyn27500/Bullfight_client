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
        btnReady: cc.Node,
        bankerNode: cc.Node,
        betNode: cc.Node,
        operation: cc.Node,
        centerNode: cc.Node,        //中心点
        myPlayer: cc.Node,          //我的节点
        buttonTest: cc.Node,

        sf_tableAtlas: cc.SpriteAtlas, //牌资源

        spStateLabel: cc.Sprite,    //状态描述文字
        clockNode: cc.Node,          //闹钟节点
        clockLabel: cc.Label,        //闹钟label



    },

    // use this for initialization
    onLoad: function () {

        self = this;
        self.userInfo = GameData.getUserInfo();
        self.roomCode = GameData.getRoomCode();
        // 初始化控件
        self.initWidget()
        // 设置监听
        var listenerList = [
            [events.hall.HALL_DATA, this.onReceive_login, this],
            [events.game.S2C_SEAT_CHOOSE, this.onReceive_sitDown, this],
            [events.game.S2C_SYN_SEATS, this.onReceive_syn_seat, this],
            [events.game.S2C_READY, this.onReceive_Ready, this],
            [events.game.S2C_CARDS, this.onReceive_cards, this],
            [events.game.S2C_GAME_STATE, this.onReceive_gameState, this],
            [events.game.S2C_ROB_BANKER, this.onReceive_robBanker, this],
            [events.game.S2C_BET, this.onReceive_bet, this],
            [events.game.S2C_ROOM_BANKER, this.onReceive_roomBanker, this],
            [events.game.S2C_LAST_CARD, this.onReceive_lastCard, this],
            [events.game.S2C_OPEN_CARD, this.onReceive_openCard, this],




        ]
        listenerList.forEach(element => {
            onfire.on(element[0], element[1], element[2]);
        });

    },

    /**
     * 初始化控件
     */
    initWidget() {
        // 玩家
        self.players = [];
        // 座位
        self.seats = [];
        for (let index = 1; index < 13; index++) {
            // 设置玩家
            self.players[index] = self.playerNode.getChildByName("player" + index).getComponent("Player");
            // 设置座位
            self.seats[index] = self.seatNode.getChildByName("site" + index)
        }
        self.myPlayerObj = self.myPlayer.getComponent("Player");
        self.btnReady.active = false;

        // self.players[8].create();
        // self.players[8].sendCardAction(this.centerNode);

        // self.players[1].create();
        // self.players[1].sendCardAction(this.centerNode);

        // self.myPlayerObj.create();
        // self.myPlayerObj.sendCardAction(this.centerNode);

        // self.myPlayerObj.openLastCard([17, 18, 19, 20, 21], 21);

    },

    /**
     * 登录返回结果
     * @param {*} data 
     */
    onReceive_login(data) {
        console.log("进入游戏，接受数据：", data)
        self.userInfo = data.userInfo;
        onfire.un(events.hall.HALL_DATA);
    },
    /**
     * 坐下
     * @param {*} seatId 
     */
    sitDown(event, seatId) {

        if (self.seatInfo && !self.seatInfo.ready) {
            return;
        }
        seatId = Number(seatId);
        if (self.mySeatId) {
            // self.seats[self.mySeatId].active = true;
            self.players[self.mySeatId].sitUp()
        }

        self.mySeatId = seatId;
        console.log("选择座位：", seatId);
        var data = {
            roomNo: self.roomCode,
            seatId: seatId
        }
        requestHandler.sendRequest(events.game.C2S_SEAT_CHOOSE, data);
    },

    /**
     * 收到坐下回调
     * @param {*} data 
     */
    onReceive_sitDown(data) {
        // self.seats[self.mySeatId].active = false;
        // self.players[self.mySeatId].create(self.userInfo)
        console.log("坐下返回：", data);
    },

    /**
     * 同步坐下情况
     * @param {*} data 
     */
    onReceive_syn_seat(data) {
        console.log("同步坐下玩家信息：", data);
        self.seatPlayers = data.seatPlayers;
        var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        data.seatPlayers.forEach(element => {
            // 显示玩家数据
            var seatId = element.seatIndex

            // 隐藏坐下按钮
            if(self.mySeatId){
                self.seats[self.mySeatId].active = false;
            }
            
            var index = list.indexOf(seatId);
            list.splice(index, 1);

            // 复制自己的信息
            if (self.userInfo.uid == element.user.id) {
                self.seatInfo = element;
                self.btnReady.active = !element.ready;

                if (!self.myPlayerObj.node.active) {
                    self.players[seatId].create(element)
                }
                else if (self.state == 2) {
                    self.myPlayerObj.setBetNum(element.robBankerBet)
                }
                else if (self.state == 3 && (!element.banker)) {
                    self.myPlayerObj.setBetNum(element.bet)
                }
                else if (self.state == 6) {
                    self.myPlayerObj.setBetNum(0)
                }


            } else {
                if (!self.players[seatId].node.active) {
                    self.players[seatId].create(element)
                }
                else if (self.state == 2) {
                    self.players[seatId].setBetNum(element.robBankerBet)
                }
                else if (self.state == 3 && (!element.banker)) {
                    self.players[seatId].setBetNum(element.bet)
                }
                else if (self.state == 6) {
                    self.players[seatId].setBetNum(0)
                }

            }
        });

        // 显示其他 坐下按钮
        list.forEach(element => {
            self.seats[element].active = true;
        });


    },

    sendReady() {
        var data = {
            roomNo: self.roomCode,
            seatId: self.mySeatId
        }
        requestHandler.sendRequest(events.game.C2S_READY, data);
    },

    /**
     * 准备 返回
     * @param {*} data 
     */
    onReceive_Ready(data) {
        if (data.result == 0) {
            self.myPlayerObj.create(self.seatInfo);
            self.players[self.mySeatId].sitUp();
        }
    },

    /**
     *  发送牌数据
     * @param {*} data 
     */
    onReceive_cards(data) {
        console.log("发送牌数据：", data)

        self.seatPlayers.forEach(element => {
            if (self.userInfo.uid == element.user.id) {
                self.myPlayerObj.sendCardAction(this.centerNode, data.playerCards)

            } else {
                self.players[element.seatIndex].sendCardAction(this.centerNode)
            }

        });
    },

    /**
     * 游戏状态值
     * @param {*} data 
     */
    onReceive_gameState(data) {
        console.log("游戏状态：", data.state, data.currentGameNum)

        // 设置状态值
        self.state = data.state;

        // 座位显示
        self.seatNode.active = self.state == 0 || self.state == 6;
        // 抢庄面板显示
        self.bankerNode.active = self.state == 2;
        // 下注倍数显示
        self.betNode.active = self.state == 3 && self.bankerIndex != self.mySeatId;
        // 摊牌按钮
        self.operation.active = self.state == 4;
        //未开始
        if (data.state == 0) {

            //开始游戏，发牌
        } else if (data.state == 1) {
            self.myLastCardData = null;

            // 设置 准备状态消失
            self.players.forEach(element => {
                element.setReady(false);
            });
            //抢庄
        } else if (data.state == 2) {

            //普通玩家下注
        } else if (data.state == 3) {
            console.log("下注按钮：查看自己是否是庄家", self.seatInfo.banker, self.state == 3 && (!self.seatInfo.banker));
            //玩家看牌
        } else if (data.state == 4) {

            //所有人开牌
        } else if (data.state == 5) {
            self.onClickForOpenCard();
            //自动准备
        } else if (data.state == 6) {

            self.players.forEach(element => {
                element.resetPlayer();
            });
        }

        self.setGameState(self.state);
    },


    /**
     * 抢庄
     * @param {*} event 
     * @param {*} multiple 
     */
    onClickForBanker(event, multiple) {
        var data = {
            roomNo: self.roomCode,
            seatId: self.mySeatId,
            betPointQuantity: Number(multiple)
        }
        requestHandler.sendRequest(events.game.C2S_ROB_BANKER, data);
    },

    /**
     * 抢庄回调
     * @param {*} data 
     */
    onReceive_robBanker(data) {
        console.log("抢庄回调：", data);
        self.bankerNode.active = false;
    },



    /**
     * 下注
     * @param {*} event 
     * @param {*} multiple 
     */
    onClickForBet(event, multiple) {
        var data = {
            roomNo: self.roomCode,
            seatId: self.mySeatId,
            betPointQuantity: Number(multiple)
        }
        requestHandler.sendRequest(events.game.C2S_BET, data);
    },

    /**
     * 下注回调
     * @param {*} data 
     */
    onReceive_bet(data) {
        console.log("下注回调：", data);
        self.betNode.active = false;
    },

    /**
     * 抢庄结果回调
     * @param {*} data 
     */
    onReceive_roomBanker(data) {
        console.log("庄家ID 回调：", data)
        self.bankerIndex = data.seatId;
        if (data.seatId == self.mySeatId) {
            self.myPlayerObj.setBanker(true)
        } else {
            self.players[data.seatId].setBanker(true)
        }
    },

    /**
    * 接受最后一张牌
    * @param {*} data 
    */
    onReceive_lastCard(data) {
        console.log("庄家ID 回调：", data)
        self.myLastCardData = data


    },

    /**
     * 按钮开牌
     */
    onClickForOpenCard() {
        if (self.myLastCardData) {
            this.operation.active = false;
            var data = {
                roomNo: self.roomCode,
                seatId: self.mySeatId
            }
            requestHandler.sendRequest(events.game.C2S_OPEN_CARD, data);
            var setScore = function() {
                self.myPlayerObj.showResultScore(self.seatInfo.score,self.seatInfo.playerCard.score,self.seatInfo.playerCard.cardType);
            }
            self.myPlayerObj.openLastCard(self.myLastCardData.playerCardsSort, self.myLastCardData.lastCard, self.seatInfo.playerCard.resultType,setScore);
        }
    },

    /**
    * 
    * @param {*} data 
    */
    onReceive_openCard(data) {
        console.log("庄家ID 回调：", data)
        var setScore = function() {
            self.myPlayerObj.showResultScore(self.players[data.seatId].score,data.playerCard.playerCard.score);
        }
        self.players[data.seatId].openLastCard(data.playerCard.sortedCards, data.playerCard.cards[4], data.playerCard.niuType)
    },

    /**
     * 设置状态
     * @param {*} state 
     */
    setGameState(state) {

        self.clockNode.active = false;
        //抢庄
        if (state == 2) {
            this.spStateLabel.spriteFrame = self.sf_tableAtlas._spriteFrames["AutoAtlas-1_10"];
            this.runClock(10);
            //普通玩家下注
        } else if (state == 3) {
            this.spStateLabel.spriteFrame = self.sf_tableAtlas._spriteFrames["AutoAtlas-1_18"];
            this.runClock(10);
            //玩家看牌
        } else if (state == 4) {
            this.spStateLabel.spriteFrame = self.sf_tableAtlas._spriteFrames["AutoAtlas-1_03"];
            this.runClock(10);
            //所有人开牌
        } else if (state == 5) {
            this.spStateLabel.spriteFrame = self.sf_tableAtlas._spriteFrames["AutoAtlas-1_03"];
            //自动准备
        } else if (state == 6) {
            this.spStateLabel.spriteFrame = self.sf_tableAtlas._spriteFrames["AutoAtlas-1_06"];
            this.runClock(10);
        }
    },

    /**
     * 开启闹钟
     * @param {*} nTotalSecond 
     */
    runClock(nTotalSecond) {
        self.clockNode.stopAllActions();
        self.clockNode.active = true;
        this.clockLabel.string = nTotalSecond;
        var cf_func = cc.callFunc(function () {
            nTotalSecond = nTotalSecond - 1;
            self.clockLabel.string = nTotalSecond;
            if (nTotalSecond < 0) {
                self.clockNode.active = false;
            }
        });
        var delay = cc.delayTime(1);
        var seq = cc.sequence(delay, cf_func);
        var rep = cc.repeat(seq, nTotalSecond + 1);
        self.clockNode.runAction(rep);
    },

    /**
     * 测试按钮 
     */
    onClickButtonTest() {
        var data = {
            roomNo: self.roomCode,
            seatId: self.mySeatId
        }
        requestHandler.sendRequest(events.game.C2S_RESET_GAMESTATE, data);
    }

});
