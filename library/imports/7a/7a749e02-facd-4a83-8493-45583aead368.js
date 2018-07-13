"use strict";
cc._RF.push(module, '7a7494C+s1Kg4STRVg66tNo', 'GameData');
// resources/Script/view/GameData.js

"use strict";

var GameData = {
    // 设置用户信息
    setUserInfo: function setUserInfo(pUserInfo) {
        this.userInfor = pUserInfo;
    },

    // 获取用户信息
    getUserInfo: function getUserInfo() {
        return this.userInfor;
    },

    // 设置房间号
    setRoomCode: function setRoomCode(code) {
        this.roomCode = code;
    },

    // 获取房间号
    getRoomCode: function getRoomCode() {
        return this.roomCode;
    }
};

module.exports = GameData;

cc._RF.pop();