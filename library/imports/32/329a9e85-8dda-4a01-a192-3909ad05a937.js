"use strict";
cc._RF.push(module, '329a96FjdpKAaGSOQmtBak3', 'HttpConnect');
// resources/Script/network/HttpConnect.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var onfire = require("onfire"); //处理事件的类库
var serverConfig = require('ServerConfig');
var httpRequestDefine = require('HttpRequestDefine');
var pbhelper = require("ProtoTest");

var HttpConnect = {
    sendProtoRequest: function sendProtoRequest(protoName, sendData) {
        var $this = this;
        var url = serverConfig.httpHost;
        var protoInfo = httpRequestDefine[protoName];
        if (protoInfo == null) {
            console.error('sendProtoRequest failed, please check proto define in HttpRequestDefine');
            return;
        }
        url = url + protoInfo.url;
        console.info("url: ", url);
        var buffer = pbhelper.encodeObject(protoName, sendData);
        var xmlHttp = this.createXMLHttpRequest();
        function getStatusBack() {
            console.info('getStatusBack xmlHttp:', xmlHttp);
            var response = xmlHttp.response;
            console.info('getStatusBack response type:', xmlHttp.responseType);
            if (xmlHttp.readyState == 4 && response) {
                // JSB doesn't support Blob or FileReader so we use plain function to get byte[]
                console.info("response: ", response);
                var buf = $this.str2bytes(response);
                var responseData = pbhelper.decodeBuffer(protoInfo.responseProto, buf);
                console.info('getStatusBack responseData:', responseData);
                onfire.fire(protoInfo.responseProto, responseData);
            }
        };
        xmlHttp.open("POST", url, true);
        xmlHttp.onreadystatechange = getStatusBack;
        //xmlHttp.withCredentials = true;
        //xmlHttp.setRequestHeader("Content-Type", "application/x-protobuf");
        xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        //xmlHttp.setRequestHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        //xmlHttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Content-Range, Content-Disposition, Content-Description");
        //xmlHttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
        xmlHttp.send(buffer);
    },
    createXMLHttpRequest: function createXMLHttpRequest() {
        var xmlHttp;
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        return xmlHttp;
    },
    str2bytes: function str2bytes(str) {
        var bytes = [];
        for (var i = 0, len = str.length; i < len; ++i) {
            var c = str.charCodeAt(i);
            var byte = c & 0xff;
            bytes.push(byte);
        }
        return bytes;
    }
};

module.exports = HttpConnect;

cc._RF.pop();