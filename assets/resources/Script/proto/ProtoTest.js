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

var protoDefine = `

package ccc; 
message Login_C2S{
    required int32 player_id = 1;
    required string token     = 2;
}
// RQ 微信登录 hall_login_wechat/login
message WebHallWechatLoginRQ {
    required string code            = 1;    // 微信登录code
    optional string appid           = 2;    // appid
    optional uint32 client_type     = 3;    // 客户端类型
    optional string spread_url      = 4;    // 渠道标识
    optional string device_id       = 5;    // 设备ID
    optional string platform        = 6;    // 请求来自的平台(如:pk)
}

// RQ 手机登录 hall_login_mobile/login
message WebHallMobileLoginRQ {
    required string mobile          = 1;    // 手机
    required string identifying     = 2;    // 验证码
    optional uint32 client_type     = 3;    // 客户端类型
    optional string spread_url      = 4;    // 渠道标识
    optional string device_id       = 5;    // 设备ID
    optional string platform        = 6;    // 请求来自的平台(如:pk)
}

// RQ token登录 hall_login_token/login
message WebHallTokenLoginRQ {
    required string token           = 1;    // token
    required string login_type      = 2;    // 登录类型    
    optional uint32 client_type     = 3;    // 客户端类型
}
message WebHallAccountLoginRQ {
    required string account         = 1;    // 账号
    required string password        = 2;    // 密码    
    optional uint32 client_type     = 3;    // 客户端类型
}
message WebHallLoginRS{
    required uint32 result              = 1;   // 结果
                                               // 1011 - 封号
                                               // 2202 - 验证码格式不对
                                               // 2203 - 验证码不对
                                               // 2204 - 手机号格式不对
    required uint32 player_id           = 2;   // 用户id
    required string token               = 3;   // token
    required uint32 login_type          = 4;   // 1: 手机号登录 2: 微信登录 3: 渠道登陆 4. 账号登陆 5. token登陆
    required bool   is_register         = 5;   // 1: 新注册     0: 非新注册
    required string player_nick_name    = 6;   // 用户名
    required uint32 server_version      = 7;   // 服务端版本
    required string head_image          = 8;   // 头像url
    required uint64 gold_num            = 9;   // 金币数
    required uint32 diamond_num         = 10;  // 钻石数
    required uint32 wisecard_num        = 11;  // 智卡数量
    optional uint32 is_whitelist        = 12;  // 0: 普通用户 1: 6.7折白名单用户
    optional bool   is_sign_login_award = 13;  // 是否已经签到
}
message WebHallLoginRS_PK{
    required string result              = 1;   // 结果
    required string player_id           = 2;   // 用户id
    required string token               = 3;   // token
    required string login_type          = 4;   // 1: 手机号登录 2: 微信登录 3: 渠道登陆 4. 账号登陆 5. token登陆
    required bool   is_register         = 5;   // 1: 新注册     0: 非新注册
    required string player_nick_name    = 6;   // 用户名
    required string server_version      = 7;   // 服务端版本
    required string head_image          = 8;   // 头像url
    required string gold_num            = 9;   // 金币数
    required string diamond_num         = 10;  // 钻石数
    required string wisecard_num        = 11;  // 智卡数量
    optional string is_whitelist        = 12;  // 0: 普通用户 1: 6.7折白名单用户
    optional bool   is_sign_login_award = 13;  // 是否已经签到
}
// 手机获取验证码
message CLWEBVerificationCodeRQ{
	required string mobile = 1;
}
// 返回手机验证码
message CLWEBVerificationCodeRS{
	required uint32 result = 1;         // 0: 成功
}

`;

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
module.exports.encodeObject = function ( msgName, obj )
{
    try {
        var msgObj = new ccc[msgName](obj);
        var buffer = msgObj.encode().toBuffer();
        return buffer;
    } catch (e) {
        console.log(e);
        return new ArrayBuffer();
    }
}
/**
* 将protobuf的二进制数据 转成js对象
* msgName 对应proto里面的消息名称
* buffer
**/
module.exports.decodeBuffer = function ( msgName, buffer )
{
    try {
        var message = ccc[msgName].decode(buffer)
        return message;
    } catch (e) {
        console.log(e);
        return {};
    }
}
