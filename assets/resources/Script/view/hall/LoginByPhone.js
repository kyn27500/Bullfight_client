var serverConnect = require("ServerConnect");
var requestHandler = require("RequestHandler");
var onfire = require("onfire"); //处理事件的类库
var config = require("config");
var tools = require("Tools");
var events = require("CustomEvents");
var scenes = require("SceneList");
var native = require("NativeInterface");
var texts = require("Text");
var consts = require("Constants");
var globalData = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        ebPhone: cc.EditBox,
        btnCleanPhone: cc.Button,
        ebEnterCode: cc.EditBox,
        btnSendCode: cc.Button,
        btnLogin: cc.Button,
        btnRetry: cc.Button,
        btnBack: cc.Button,
    },

    onLoad() {
        this.btnCleanPhone.node.active = false;
        this.btnRetry.node.active = false;
        this.btnLogin.interactable = false;
        this.btnSendCode.interactable = false;
        if (config.isNetwork) {
            serverConnect.connect(true);
        }
    },


    // 发送验证码
    onClickBtnSendCode: function() {
        // TODO 发送请求
        console.log("发送验证码");
        var data = {
            phone: this.ebPhone.string,
        }
        requestHandler.sendRequest(events.hall.C2S_GET_PHONE_CODE, data);
        this.runCountdown();
    },

    // 清理手机号
    onClickBtnCleanPhone: function() {
        console.log("onClickBtnCleanPhone");
        this.ebPhone.string = '';
        this.btnCleanPhone.node.active = false;
        this.btnSendCode.interactable = false;
    },

    // 检测手机输入
    onTextChanged: function(text, editbox, customEventData) {
        if (text.length == 0) {
            this.btnCleanPhone.node.active = false;
        } else {
            this.btnCleanPhone.node.active = true;
        }

        // 检测手机号
        if (this.isPoneAvailable(text)) {
            this.btnSendCode.interactable = true;
        } else {
            this.btnSendCode.interactable = false;
        }
    },

    // 检测手机号
    isPoneAvailable: function(str) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    },

    // 检测输入码
    onTextDid: function(text, editbox, customEventData) {
        if (text.length == 4) {
            this.btnLogin.interactable = true;
        } else {
            this.btnLogin.interactable = false;
        }
    },

    // 登录回调
    loginCallback: function(data) {
        var $this = this;
        console.log("登录结果: " + JSON.stringify(data));
        if (data.result != 0) {
            console.log("登录失败！");
        }
    },

    //登录
    onClickBtnLogin: function() {
        var $this = this;
        console.log("尝试登录...手机号：" + this.ebPhone.string + ", 验证码：" + this.ebEnterCode.string);
        this.btnLogin.interactable = false;
        this.scheduleOnce(function () {
            $this.btnLogin.interactable = true;
        }, 5);

        if (config.isNetwork) {
            // 向服务端发送登录信息
            var data = {
                phone: this.ebPhone.string,
                phoneCode: this.ebEnterCode.string,
                wechatCode: "",
                token: "",
            };
            requestHandler.sendRequest(events.hall.C2S_LOGIN, data);

            // 大厅登录信息
            onfire.on(events.hall.S2C_LOGIN, function(data1, data2) {
                if (data1.success == 0) {
                    console.log(JSON.stringify(data1));

                    // 我的用户数据
                    globalData.myUserInfo = data1.userInfo;

                    // 保存本地信息
                    var localLogin = {
                        token: data1.userInfo.token,
                    };
                    tools.setLocalData(consts.hall.LOCAL_LOGIN, localLogin);

                    // 切换场景
                    cc.director.loadScene(scenes.hall.HALL, function() {
                        onfire.fire(events.hall.HALL_DATA, data1, data2);
                    });
                } else {
                    tools.showMessage(texts.hall.LOGIN_FAILED);
                }

                onfire.un(events.hall.S2C_LOGIN);
            });
        } else {
            cc.director.loadScene(scenes.hall.HALL);
        }

    },

    // 60s倒计时
    runCountdown: function() {
        this.btnSendCode.node.active = false;
        // 以秒为单位的时间间隔
        var interval = 1;
        // 重复次数
        var repeat = 61;
        // 开始延时 
        var delay = 0;
        var second = 60;

        this.btnRetry.node.active = true;
        var label = this.btnRetry.node.getChildByName("Label").getComponent(cc.Label);
        label.string = texts.hall.RETRY + second + texts.hall.SECOND_INITIAL;
        var $this = this;
        this.btnSendCode.schedule(function() {
            second -= 1;
            label.string = texts.hall.RETRY + second + texts.hall.SECOND_INITIAL;
            if (second < 0) {
                $this.btnSendCode.node.active = true;
                $this.btnRetry.node.active = false;
            }
        }, interval, repeat, delay);
    },

    // 点击返回
    onClickBtnBack: function() {
        cc.director.loadScene(scenes.hall.LOGIN_SCENE)
    },

    onDestroy() {
        onfire.un(events.hall.S2C_LOGIN);
    },
});