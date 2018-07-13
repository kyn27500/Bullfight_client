var onfire = require("onfire"); //处理事件的类库
var scenes = require("SceneList");
var texts = require("Text");
var tools = require("Tools");

var RequestHandler = {
    _serverConnect: require('ServerConnect'), //当前的webSocket的对象

    sendRequest: function(actionName, data) {
        if (this._serverConnect._sock.readyState !== 1) {
            // 应增加更多玩家提示，以及重连
            console.error('sendRequest failed');
            tools.showMessageDialog(texts.hall.PROMPT, texts.hall.CONNECTION_LOST);
            cc.director.loadScene(scenes.hall.LOGIN_SCENE);
            return;
        }
        // console.log('sendRequest:',actionName,typeof(data));
        if (typeof(data) == 'object') {
            var requestObj = {};
            requestObj.messageCode = actionName;
            var dataString = JSON.stringify(data);
            requestObj.body = dataString;
            requestObj.md5 = "maybe later";
            var requestString = JSON.stringify(requestObj);
            console.log('sendRequest requestString:', requestString);
            this._serverConnect.send(requestString);
        }
    },
};

module.exports = RequestHandler;