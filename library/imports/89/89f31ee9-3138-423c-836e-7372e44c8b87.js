"use strict";
cc._RF.push(module, '89f317pMThCPINuc3LkTIuH', 'ServerConnect');
// resources/Script/network/ServerConnect.js

"use strict";

var onfire = require("onfire"); // 处理事件的类库
var serverConfig = require('ServerConfig');
var events = require("CustomEvents");

var ServerConnect = {
    // 当前的webSocket的对象
    _sock: null,

    /**
     * 建立连接
     * @param {boolean} reset 是否重置现有连接
     */
    connect: function connect() {
        var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (reset || this._sock.readyState !== 1) {
            console.log("opening server connection...");
            if (this._sock) {
                this.close();
            }
            this._sock = new WebSocket(serverConfig.serverHost + ":" + serverConfig.serverPort);
            this._sock.onopen = this._onOpen.bind(this);
            this._sock.onclose = this._onClose.bind(this);
            this._sock.onmessage = this._onMessage.bind(this);
            this._sock.onerror = this._onError.bind(this);
        }
        return this;
    },

    /**
     * 关闭当前连接
     */
    close: function close() {
        console.log("closing server connection...");
        try {
            this._sock.close();
        } catch (error) {
            console.log("error:", error);
        }
    },

    _onOpen: function _onOpen() {
        onfire.fire(events.onfire.OPEN);
    },
    _onClose: function _onClose(err) {
        onfire.fire(events.onfire.CLOSE, err);
    },
    _onMessage: function _onMessage(obj) {
        onfire.fire(events.onfire.MESSAGE, obj);
    },
    _onError: function _onError(obj) {
        onfire.fire(events.onfire.ERROR, obj);
    },

    send: function send(msg) {
        this._sock.send(msg);
    }
};

module.exports = ServerConnect;

cc._RF.pop();