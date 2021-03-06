"use strict";
cc._RF.push(module, 'bbd585bDvtFqoX+Y2lz68q8', 'HttpRequestDefine');
// resources/Script/global/HttpRequestDefine.js

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

var HttpRequestDefine = {
	// 大厅微信登录/注册
	WebHallWechatLoginRQ: {
		"url": "hall_login_wechat/login",
		"responseProto": "WebHallLoginRS"
	},
	// 大厅手机登录/注册
	WebHallMobileLoginRQ: {
		"url": "hall_login_mobile/login",
		"responseProto": "WebHallLoginRS"
	},
	// 大厅Token登录
	WebHallTokenLoginRQ: {
		"url": "hall_login_token/login",
		"responseProto": "WebHallLoginRS"
	},
	// 大厅帐号登录
	WebHallAccountLoginRQ: {
		"url": "hall_login_account/login_pk",
		"responseProto": "WebHallLoginRS_PK"
	},

	CLWEBTokenLoginRQ: {
		"url": "user_hall/tokenlogin",
		"responseProto": "CLWEBLoginRS"
	},

	// 获取手机验证码
	CLWEBVerificationCodeRQ: {
		"url": "user/verify",
		"responseProto": "CLWEBVerificationCodeRS"
	}
};

module.exports = HttpRequestDefine;

cc._RF.pop();