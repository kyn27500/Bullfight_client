var serverConnect = require("ServerConnect");
var requestHandler = require("RequestHandler");
var onfire = require("onfire");
var tools = require("Tools");
var config = require("config");
var events = require("CustomEvents");
var scenes = require("SceneList");
var native = require("NativeInterface");
var version = require("Version");
var texts = require("Text");
var consts = require("Constants");
var globalData = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        btnWeChat: cc.Button,
        btnPhone: cc.Button,
        btn_label: cc.Button,
        lblVersion: cc.Label,
    },

    start() {
        // 根据环境决定是否显示微信登录按钮
        if (!tools.isMobile()) {
            this.hideWeChatLogin();
        }

        // iOS检测微信是否安装
        if (tools.isIOS()) {
            //TODO: 未安装微信则隐藏微信登录按钮
        }
    },

    // use this for initialization
    onLoad() {
        // 版本号
        this.lblVersion.string = version.getVersion();

        if (config.isNetwork) {
            serverConnect.connect(true);
            onfire.on(events.onfire.OPEN, this.onServerConnectOpen);
            onfire.on(events.onfire.ERROR, this.onServerConnectError);
            globalData.onLogout();
        }
    },

    onServerConnectError: function(obj) {
        console.log(JSON.stringify(obj));
    },

    onServerConnectOpen: function() {
        console.log("server connected");
        onfire.un(events.onfire.OPEN);

        // 检测自动登录
        if (!globalData.disableAutoLogin) {
            var localLogin = false;
            var local_login = tools.getLocalData(consts.hall.LOCAL_LOGIN);
            console.log("local_login:", local_login);
            if (local_login) {
                console.log("local_login.token:", local_login.token);
                if (local_login.token) {
                    console.log("Auto login, token:", local_login.token);
                    var data = {
                        phone: "",
                        phoneCode: "",
                        wechatCode: "",
                        token: local_login.token,
                    };
                    requestHandler.sendRequest(events.hall.C2S_LOGIN, data);
                }
                localLogin = true;
            }
            if (localLogin) {
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
                    }

                    onfire.un(events.hall.S2C_LOGIN);
                });
            }
        } else {
            globalData.disableAutoLogin = false;
        }
    },

    // 隐藏微信登录
    hideWeChatLogin: function() {
        this.btnWeChat.node.active = false;
        this.btnPhone.node.x = 0;
    },

    // 微信登录
    onClickedBtnWechat: function() {
        var $this = this;
        console.log('微信登录');
        this.btnWeChat.interactable = false;
        this.scheduleOnce(function() {
            $this.btnWeChat.interactable = true;
        }, 5);

        // 安卓
        if (tools.isAndroid()) {
            // 检测微信是否安装
            if (!tools.callJavaStaticMethod(native.android.PACKAGE_PATH, native.android.methods.IS_WECHAT_APP_INSTALLED, "()Z")) {
                tools.showMessage(texts.hall.WECHAT_INSTALL_FIRST);
                return;
            } else {
                // 尝试向微信发送请求
                tools.callJavaStaticMethod1(native.android.PACKAGE_PATH, native.android.methods.SET_WECHAT_LOGGING, "(Z)V", true);
                tools.callJavaStaticMethod(native.android.PACKAGE_PATH, native.android.methods.WECHAT_LOGIN, "()V");

                // 等待获取微信登录结果
                this.schedule(this.checkWXLoginResult, 0.5);
            }
        }

        // iOS
        else if (tools.isIOS()) {}
    },

    // 检查微信登录结果
    checkWXLoginResult: function() {
        var result = tools.callJavaStaticMethod(native.android.PACKAGE_PATH, native.android.methods.IS_WECHAT_LOGGING, "()Z");
        var wxcode = tools.callJavaStaticMethod(native.android.PACKAGE_PATH, native.android.methods.GET_WECHAT_ACCESS_CODE, "()Ljava/lang/String;");
        if (!result) {
            this.unschedule(this.checkWXLoginResult);
        }
        if (wxcode && wxcode != "") {
            this.unschedule(this.checkWXLoginResult);
            var data = {
                phone: "",
                phoneCode: "",
                wechatCode: wxcode,
                token: ""
            };
            requestHandler.sendRequest(events.hall.C2S_LOGIN, data);

            // 大厅登录信息
            onfire.on(events.hall.S2C_LOGIN, function(data1, data2) {
                if (data1.success == 0) {
                    console.log(JSON.stringify(data1));

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
                    tools.showMessage(texts.hall._FAILED + data1.success.toString());
                }

                onfire.un(events.hall.S2C_LOGIN);
            });
        }
    },

    // 点击手机
    onClickedBtnPhone: function() {
        console.log('点击手机');
        this.btnPhone.interactable = false;
        this.scheduleOnce(function() {
            $this.btnPhone.interactable = true;
        }, 5);

        cc.director.loadScene(scenes.hall.LOGIN_PHONE)
    },

    // 点击 同意文字
    onClickedBtnAgree: function() {
        console.log('点击用户条款');
        cc.director.loadScene(scenes.hall.EULA);
    },

    onDestroy() {
        onfire.un(events.hall.S2C_LOGIN);
        onfire.un(events.onfire.OPEN);
        onfire.un(events.onfire.ERROR);
    }
});