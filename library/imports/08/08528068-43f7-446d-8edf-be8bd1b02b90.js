"use strict";
cc._RF.push(module, '08528BoQ/dEbY7fvovRsCuQ', 'RequestHandler');
// resources/Script/network/RequestHandler.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var onfire = require("onfire"); //处理事件的类库
var scenes = require("SceneList");
var texts = require("Text");
var tools = require("Tools");

var RequestHandler = {
    _serverConnect: require('ServerConnect'), //当前的webSocket的对象

    sendRequest: function sendRequest(actionName, data) {
        if (this._serverConnect._sock.readyState !== 1) {
            // 应增加更多玩家提示，以及重连
            console.error('sendRequest failed');
            tools.showMessageDialog(texts.hall.PROMPT, texts.hall.CONNECTION_LOST);
            cc.director.loadScene(scenes.hall.LOGIN_SCENE);
            return;
        }
        // console.log('sendRequest:',actionName,typeof(data));
        if ((typeof data === "undefined" ? "undefined" : _typeof(data)) == 'object') {
            var requestObj = {};
            requestObj.messageCode = actionName;
            var dataString = JSON.stringify(data);
            requestObj.body = dataString;
            requestObj.md5 = "maybe later";
            var requestString = JSON.stringify(requestObj);
            console.log('sendRequest requestString:', requestString);
            this._serverConnect.send(requestString);
        }
    }
};

module.exports = RequestHandler;

cc._RF.pop();