"use strict";
cc._RF.push(module, 'ebccalPlE1Cqa+Bl3yJI0tS', 'JoinRoom');
// resources/Script/view/JoinRoom.js

"use strict";

var self = void 0;
var requestHandler = require("RequestHandler");
var onfire = require("onfire");
var events = require("CustomEvents");
var GameData = require("GameData");
cc.Class({
    extends: cc.Component,

    properties: {
        editBox: cc.EditBox,
        btnEnter: cc.Button,
        btnCancel: cc.Button
    },

    // use this for initialization
    onLoad: function onLoad() {
        self = this;
        onfire.on(events.hall.userJoinRoomS2C, self.joinRoomS2C);
        self.editBox.string = '035645';
    },

    onClickForEnter: function onClickForEnter() {
        var roomCode = self.editBox.string;
        console.log(roomCode);

        var data = {
            roomNo: roomCode
        };
        requestHandler.sendRequest(events.hall.userJoinRoomC2S, data);
    },
    onClickForCancel: function onClickForCancel() {
        self.node.removeFromParent();
    },
    joinRoomS2C: function joinRoomS2C(data) {
        console.log(data);
        if (data.result == 0) {
            GameData.setRoomCode(self.editBox.string);
            cc.director.loadScene("bull", function () {
                onfire.fire(events.game.GAME_DATA, data);
            });
        } else {}
    }
});

cc._RF.pop();