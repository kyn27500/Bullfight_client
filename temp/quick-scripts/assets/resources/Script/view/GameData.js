(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/GameData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7a7494C+s1Kg4STRVg66tNo', 'GameData', __filename);
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
        //# sourceMappingURL=GameData.js.map
        