"use strict";
cc._RF.push(module, '8e218gFrUdOQoJhaoodhiob', 'ResponseHandler');
// resources/Script/network/ResponseHandler.js

'use strict';

var onfire = require("onfire"); //处理事件的类库

var ResponseHandler = {
    receiveResponse: function receiveResponse(obj) {
        console.log('receiveResponse:', JSON.stringify(obj));
        var response = JSON.parse(obj.data);
        // 在此处增加md5校验

        // 按协议号分发
        onfire.fire(response.messageCode, JSON.parse(response.body));
    },

    registerResponse: function registerResponse(messageID, callback, context) {
        return onfire.on(messageID.toString(), callback, context);
    },
    unRegisterALLResponse: function unRegisterALLResponse(messageID) {
        onfire.un(messageID.toString());
    },
    unRegisterResponse: function unRegisterResponse(eventID) {
        onfire.un(eventID);
    }
};

// 注册接收网络事件
var receiveResponseEvent = onfire.on('onmessage', function (data1, data2) {
    ResponseHandler.receiveResponse(data1, data2);
});

module.exports = ResponseHandler;

cc._RF.pop();