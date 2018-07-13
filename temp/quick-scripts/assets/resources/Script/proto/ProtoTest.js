(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/proto/ProtoTest.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6bc2dRl3FFN9KdFKXRa76lK', 'ProtoTest', __filename);
// resources/Script/proto/ProtoTest.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

// 这个文件是一个Protobuf的管理模块，把具体的encode和decode操作封装了一层，我觉得这样写清晰、容易管理，而且node服务器也可以公用。
var Protobufjs = require('protobuf');

var protoDefine = "\n\npackage ccc; \nmessage Login_C2S{\n    required int32 player_id = 1;\n    required string token     = 2;\n}\n// RQ \u5FAE\u4FE1\u767B\u5F55 hall_login_wechat/login\nmessage WebHallWechatLoginRQ {\n    required string code            = 1;    // \u5FAE\u4FE1\u767B\u5F55code\n    optional string appid           = 2;    // appid\n    optional uint32 client_type     = 3;    // \u5BA2\u6237\u7AEF\u7C7B\u578B\n    optional string spread_url      = 4;    // \u6E20\u9053\u6807\u8BC6\n    optional string device_id       = 5;    // \u8BBE\u5907ID\n    optional string platform        = 6;    // \u8BF7\u6C42\u6765\u81EA\u7684\u5E73\u53F0(\u5982:pk)\n}\n\n// RQ \u624B\u673A\u767B\u5F55 hall_login_mobile/login\nmessage WebHallMobileLoginRQ {\n    required string mobile          = 1;    // \u624B\u673A\n    required string identifying     = 2;    // \u9A8C\u8BC1\u7801\n    optional uint32 client_type     = 3;    // \u5BA2\u6237\u7AEF\u7C7B\u578B\n    optional string spread_url      = 4;    // \u6E20\u9053\u6807\u8BC6\n    optional string device_id       = 5;    // \u8BBE\u5907ID\n    optional string platform        = 6;    // \u8BF7\u6C42\u6765\u81EA\u7684\u5E73\u53F0(\u5982:pk)\n}\n\n// RQ token\u767B\u5F55 hall_login_token/login\nmessage WebHallTokenLoginRQ {\n    required string token           = 1;    // token\n    required string login_type      = 2;    // \u767B\u5F55\u7C7B\u578B    \n    optional uint32 client_type     = 3;    // \u5BA2\u6237\u7AEF\u7C7B\u578B\n}\nmessage WebHallAccountLoginRQ {\n    required string account         = 1;    // \u8D26\u53F7\n    required string password        = 2;    // \u5BC6\u7801    \n    optional uint32 client_type     = 3;    // \u5BA2\u6237\u7AEF\u7C7B\u578B\n}\nmessage WebHallLoginRS{\n    required uint32 result              = 1;   // \u7ED3\u679C\n                                               // 1011 - \u5C01\u53F7\n                                               // 2202 - \u9A8C\u8BC1\u7801\u683C\u5F0F\u4E0D\u5BF9\n                                               // 2203 - \u9A8C\u8BC1\u7801\u4E0D\u5BF9\n                                               // 2204 - \u624B\u673A\u53F7\u683C\u5F0F\u4E0D\u5BF9\n    required uint32 player_id           = 2;   // \u7528\u6237id\n    required string token               = 3;   // token\n    required uint32 login_type          = 4;   // 1: \u624B\u673A\u53F7\u767B\u5F55 2: \u5FAE\u4FE1\u767B\u5F55 3: \u6E20\u9053\u767B\u9646 4. \u8D26\u53F7\u767B\u9646 5. token\u767B\u9646\n    required bool   is_register         = 5;   // 1: \u65B0\u6CE8\u518C     0: \u975E\u65B0\u6CE8\u518C\n    required string player_nick_name    = 6;   // \u7528\u6237\u540D\n    required uint32 server_version      = 7;   // \u670D\u52A1\u7AEF\u7248\u672C\n    required string head_image          = 8;   // \u5934\u50CFurl\n    required uint64 gold_num            = 9;   // \u91D1\u5E01\u6570\n    required uint32 diamond_num         = 10;  // \u94BB\u77F3\u6570\n    required uint32 wisecard_num        = 11;  // \u667A\u5361\u6570\u91CF\n    optional uint32 is_whitelist        = 12;  // 0: \u666E\u901A\u7528\u6237 1: 6.7\u6298\u767D\u540D\u5355\u7528\u6237\n    optional bool   is_sign_login_award = 13;  // \u662F\u5426\u5DF2\u7ECF\u7B7E\u5230\n}\nmessage WebHallLoginRS_PK{\n    required string result              = 1;   // \u7ED3\u679C\n    required string player_id           = 2;   // \u7528\u6237id\n    required string token               = 3;   // token\n    required string login_type          = 4;   // 1: \u624B\u673A\u53F7\u767B\u5F55 2: \u5FAE\u4FE1\u767B\u5F55 3: \u6E20\u9053\u767B\u9646 4. \u8D26\u53F7\u767B\u9646 5. token\u767B\u9646\n    required bool   is_register         = 5;   // 1: \u65B0\u6CE8\u518C     0: \u975E\u65B0\u6CE8\u518C\n    required string player_nick_name    = 6;   // \u7528\u6237\u540D\n    required string server_version      = 7;   // \u670D\u52A1\u7AEF\u7248\u672C\n    required string head_image          = 8;   // \u5934\u50CFurl\n    required string gold_num            = 9;   // \u91D1\u5E01\u6570\n    required string diamond_num         = 10;  // \u94BB\u77F3\u6570\n    required string wisecard_num        = 11;  // \u667A\u5361\u6570\u91CF\n    optional string is_whitelist        = 12;  // 0: \u666E\u901A\u7528\u6237 1: 6.7\u6298\u767D\u540D\u5355\u7528\u6237\n    optional bool   is_sign_login_award = 13;  // \u662F\u5426\u5DF2\u7ECF\u7B7E\u5230\n}\n// \u624B\u673A\u83B7\u53D6\u9A8C\u8BC1\u7801\nmessage CLWEBVerificationCodeRQ{\n\trequired string mobile = 1;\n}\n// \u8FD4\u56DE\u624B\u673A\u9A8C\u8BC1\u7801\nmessage CLWEBVerificationCodeRS{\n\trequired uint32 result = 1;         // 0: \u6210\u529F\n}\n\n";

// 按照官方的教程一步步做解析操作，
// 外面很多高手都写了教程，但推荐还是去官网上看
// https://github.com/dcodeIO/protobuf.js/wiki/Getting-started

var builder = Protobufjs.loadProto(protoDefine);
var ccc = builder.build("ccc");
// 以下我定义2个导出方法
/**
* 将js对象转成protobuf的二进制数据
* msgName 对应proto里面的消息名称
* obj是msgName对应的js对象
**/
module.exports.encodeObject = function (msgName, obj) {
    try {
        var msgObj = new ccc[msgName](obj);
        var buffer = msgObj.encode().toBuffer();
        return buffer;
    } catch (e) {
        console.log(e);
        return new ArrayBuffer();
    }
};
/**
* 将protobuf的二进制数据 转成js对象
* msgName 对应proto里面的消息名称
* buffer
**/
module.exports.decodeBuffer = function (msgName, buffer) {
    try {
        var message = ccc[msgName].decode(buffer);
        return message;
    } catch (e) {
        console.log(e);
        return {};
    }
};

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
        //# sourceMappingURL=ProtoTest.js.map
        