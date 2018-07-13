(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/global/Tools.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ffa735wpAlMqL2R4j3HKlW7', 'Tools', __filename);
// resources/Script/global/Tools.js

"use strict";

var native = require("NativeInterface");

/**
 * 工具合集
 */
var Tools = {
    /**
     * 加载本地精灵帧
     * @param {string} refPath 本地资源引用路径
     * @param {cc.Sprite} sprite 精灵对象
     * @param {function} errorCallback 失败回调
     * @param {function} completeCallback 完成回调
     */
    loadLocalSpriteFrame: function loadLocalSpriteFrame(refPath, sprite) {
        var errorCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var completeCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        console.log("尝试加载SpriteFrame:", refPath);
        cc.loader.loadRes(refPath, cc.SpriteFrame, function (err, res) {
            if (err) {
                console.log("加载", refPath, "失败！", err);
                if (errorCallback && typeof errorCallback == "function") {
                    errorCallback();
                }
                return;
            }
            sprite.spriteFrame = res;
            console.log("加载SpriteFrame:", refPath, "成功");
            if (completeCallback && typeof completeCallback == "function") {
                completeCallback();
            }
        });
    },

    /**
     * 加载网络图像
     * @param {string} url 图像URL
     * @param {cc.Sprite} sprite 精灵对象
     * @param {function} errorCallback 失败回调
     * @param {function} completeCallback 完成回调
     */
    loadRemoteImage: function loadRemoteImage(url, sprite) {
        var completeCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var errorCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        console.log("尝试加载图像: ", url);
        if (url != null && url != undefined && url != "") {
            cc.loader.load(url, function (err, img) {
                if (err) {
                    console.log("图像", url, "加载失败");
                    console.log(JSON.stringify(err));
                    if (errorCallback && typeof errorCallback == "function") {
                        errorCallback();
                    }
                } else {
                    console.log("图像", url, "加载成功");
                    var sf = new cc.SpriteFrame(img);
                    try {
                        sf.retain();
                    } catch (err) {};
                    sprite.spriteFrame = sf;
                    if (completeCallback && typeof completeCallback == "function") {
                        completeCallback();
                    }
                }
            });
        }
    },

    /**
     * 加载文件夹资源，按key 获取单个图片
     * @param {string} dirPath 路径列表
     * @param {function} callback 回调, 传 图片列表 map
     */
    loadResDir: function loadResDir(dirPath, callback) {
        var onResourceLoaded = function onResourceLoaded(errorMessage, spriteFrames, urlList) {
            //检查失败原因
            if (errorMessage) {
                cc.log('Tools.loadResDir：加载失败, 原因:' + errorMessage);
                return;
            }

            var ret = {};
            for (var index = 0; index < urlList.length; index++) {
                var element = urlList[index];
                var nameList = element.split("/");
                ret[nameList[nameList.length - 1]] = spriteFrames[index];
            }
            if (callback && typeof callback == "function") {
                callback(ret);
            }
        };
        //這邊才是真的使用cc.loader進行載入，並且呼叫我們上面寫的方法
        cc.loader.loadResDir(dirPath, cc.SpriteFrame, onResourceLoaded);
    },

    /**
     * 随机种子
     */
    randomSeed: 0,

    /**
     * 生成一个0-1之间的随机数
     */
    random: function random() {
        Tools.randomSeed = Tools.randomSeed * 1103515245 + 12345 & 0x7fffffff;
        return Tools.randomSeed / 0x7fffffff;
    },

    /*
     * [[仅限安卓平台]]
     * 
     * 此处为下方调用java端静态方法函数中签名(signature)的格式说明
     * 
     * 签名形式为（不包含方括号）：
     * ([参数1类型][参数2类型][参数3类型]...)[返回类型]
     * 
     * 类型对应表（区分大小写）：
     * void:    V
     * int:     I
     * float:   F
     * boolean: Z
     * String:  Ljava/lang/String;
     * 
     * 签名示例：
     * java方法：void foo();
     * 对应签名：()V
     * java方法：int add(int a, int b);
     * 对应签名：(II)I
     * java方法：boolean isEqual(String a, String b);
     * 对应签名：(Ljava/lang/String;LJava/lang/String;)Z
     * 
     * 完整示例:
     * 设java端代码为：
     * package org.cocos2dx.javascript;
     * class MyClass
     * {
     *     public static boolean combineString(String a, String b, int length) {...}
     * }
     * 
     * js端调用方法为：
     * callJavaStaticMethod3("org/cocos2dx/javascript/MyClass", "combineString", "(Ljava/lang/String;Ljava/lang/String;I)Z", a, b, length);
     * 其中a, b, length为js端对应参数的变量
     */

    /**
     * 调用java端静态方法
     * @param {string} classFullPackageName 包含包名的完整类名，用"/"分隔
     * @param {string} methodName 方法名称
     * @param {string} signature 签名
     */
    callJavaStaticMethod: function callJavaStaticMethod(classFullPackageName, methodName, signature) {
        console.log("Calling java native method: " + classFullPackageName.replace(/\//g, ".") + "." + methodName, "signature:", signature);
        return jsb.reflection.callStaticMethod(classFullPackageName, methodName, signature);
    },

    /**
     * 调用java端静态方法
     * @param {string} classFullPackageName 包含包名的完整类名，用"/"分隔
     * @param {string} methodName 方法名称
     * @param {string} signature 签名
     * @param {*} arg1 参数1
     */
    callJavaStaticMethod1: function callJavaStaticMethod1(classFullPackageName, methodName, signature, arg1) {
        console.log("Calling java native method: " + classFullPackageName.replace(/\//g, ".") + "." + methodName, "signature:", signature);
        console.log("Argument 1: ", arg1);
        return jsb.reflection.callStaticMethod(classFullPackageName, methodName, signature, arg1);
    },

    /**
     * 调用java端静态方法
     * @param {string} classFullPackageName 包含包名的完整类名，用"/"分隔
     * @param {string} methodName 方法名称
     * @param {string} signature 签名
     * @param {*} arg1 参数1
     * @param {*} arg2 参数2
     */
    callJavaStaticMethod2: function callJavaStaticMethod2(classFullPackageName, methodName, signature, arg1, arg2) {
        console.log("Calling java native method: " + classFullPackageName.replace(/\//g, ".") + "." + methodName, "signature:", signature);
        console.log("Argument 1: ", arg1);
        console.log("Argument 2: ", arg2);
        return jsb.reflection.callStaticMethod(classFullPackageName, methodName, signature, arg1, arg2);
    },

    /**
     * 调用java端静态方法
     * @param {string} classFullPackageName 包含包名的完整类名，用"/"分隔
     * @param {string} methodName 方法名称
     * @param {string} signature 签名
     * @param {*} arg1 参数1
     * @param {*} arg2 参数2
     * @param {*} arg3 参数3
     */
    callJavaStaticMethod3: function callJavaStaticMethod3(classFullPackageName, methodName, signature, arg1, arg2, arg3) {
        console.log("Calling java native method: " + classFullPackageName.replace(/\//g, ".") + "." + methodName, "signature:", signature);
        console.log("Argument 1: ", arg1);
        console.log("Argument 2: ", arg2);
        console.log("Argument 3: ", arg3);
        return jsb.reflection.callStaticMethod(classFullPackageName, methodName, signature, arg1, arg2, arg3);
    },

    /**
     * 调用Obj-C端静态方法
     * @param {string} clasName 类名，不包含路径
     * @param {string} functionFullNameWithArguments 包含参数定义的完整方法名（参数间用":"分隔）
     */
    callObjCStaticMethod: function callObjCStaticMethod(className, functionFullNameWithArguments) {
        console.log("Calling Obj-C native method:", className, functionFullNameWithArguments);
        return jsb.reflection.callStaticMethod(className, functionFullNameWithArguments);
    },

    /**
     * 调用Obj-C端静态方法
     * @param {string} clasName 类名，不包含路径
     * @param {string} functionFullNameWithArguments 包含参数定义的完整方法名（参数间用":"分隔）
     * @param {*} arg1 参数1
     */
    callObjCStaticMethod1: function callObjCStaticMethod1(className, functionFullNameWithArguments, arg1) {
        console.log("Calling Obj-C native method:", className, functionFullNameWithArguments);
        console.log("Argument 1: ", arg1);
        return jsb.reflection.callStaticMethod(className, functionFullNameWithArguments, arg1);
    },

    /**
     * 调用Obj-C端静态方法
     * @param {string} clasName 类名，不包含路径
     * @param {string} functionFullNameWithArguments 包含参数定义的完整方法名（参数间用":"分隔）
     * @param {*} arg1 参数1
     * @param {*} arg2 参数2
     */
    callObjCStaticMethod2: function callObjCStaticMethod2(className, functionFullNameWithArguments, arg1, arg2) {
        console.log("Calling Obj-C native method:", className, functionFullNameWithArguments);
        console.log("Argument 1: ", arg1);
        console.log("Argument 2: ", arg2);
        return jsb.reflection.callStaticMethod(className, functionFullNameWithArguments, arg1, arg2);
    },

    /**
     * 调用Obj-C端静态方法
     * @param {string} clasName 类名，不包含路径
     * @param {string} functionFullNameWithArguments 包含参数定义的完整方法名（参数间用":"分隔）
     * @param {*} arg1 参数1
     * @param {*} arg2 参数2
     * @param {*} arg3 参数3
     */
    callObjCStaticMethod3: function callObjCStaticMethod3(className, functionFullNameWithArguments, arg1, arg2, arg3) {
        console.log("Calling Obj-C native method:", className, functionFullNameWithArguments);
        console.log("Argument 1: ", arg1);
        console.log("Argument 2: ", arg2);
        console.log("Argument 3: ", arg3);
        return jsb.reflection.callStaticMethod(className, functionFullNameWithArguments, arg1, arg2, arg3);
    },

    /**
     * 判断当前运行环境是否为原生环境
     */
    isNative: function isNative() {
        console.log("isNative: ", cc.sys.isNative);
        return cc.sys.isNative;
    },

    /**
     * 判断当前运行环境是否为浏览器
     */
    isBrowser: function isBrowser() {
        console.log("isBrowser: ", cc.sys.isBrowser);
        return cc.sys.isBrowser;
    },

    /**
     * 判断当前设备是否为移动设备
     */
    isMobile: function isMobile() {
        console.log("isMobile: ", cc.sys.isMobile);
        return cc.sys.isMobile;
    },

    /**
     * 判断当前环境是否为iOS
     */
    isIOS: function isIOS() {
        console.log("os: ", cc.sys.os);
        return cc.sys.os.toLowerCase() == "ios";
    },

    /**
     * 判断当前设备是否为安卓
     */
    isAndroid: function isAndroid() {
        console.log("os: ", cc.sys.os);
        return cc.sys.os.toLowerCase() == "android";
    },

    /**
     * 判断当前环境是否为Windows
     */
    isWindows: function isWindows() {
        console.log("os: ", cc.sys.os);
        return cc.sys.os.toLowerCase() == "windows";
    },

    /**
     * 获取本地数据
     * @param {string} key 键
     * @return {json} 值
     */
    getLocalData: function getLocalData(key) {
        try {
            var obj = JSON.parse(cc.sys.localStorage.getItem(key));
            try {
                console.log("getLocalData:", JSON.stringify(obj));
            } catch (err) {}
            return obj;
        } catch (err) {
            return null;
        }
    },

    /**
     * 存储本地数据
     * @param {string} key 键
     * @param {*} obj 对象
     */
    setLocalData: function setLocalData(key, obj) {
        var str = JSON.stringify(obj);
        console.log("setLocalData:", str);
        cc.sys.localStorage.setItem(key, str);
    },

    /**
     * 移除本地数据
     * @param {string} key 键
     */
    removeLocalData: function removeLocalData(key, obj) {
        cc.sys.localStorage.removeItem(key);
    },

    /**
     * 显示弹出消息
     * @param {string} msg 消息
     */
    showMessage: function showMessage(msg) {
        console.log("showMessage:", msg);
        if (this.isAndroid()) {
            this.callJavaStaticMethod1(native.android.PACKAGE_PATH, native.android.methods.SHOW_TOAST, "(Ljava/lang/String;)V", msg);
        } else if (this.isIOS()) {
            // 调用OC原生方法
        } else if (this.isBrowser()) {
            alert(msg);
        }
    },

    /**
     * 显示弹出消息对话框
     * @param {string} title 标题
     * @param {string} msg 消息
     */
    showMessageDialog: function showMessageDialog(title, msg) {
        console.log("showMessageDialog:", title, msg);
        if (this.isAndroid()) {
            this.callJavaStaticMethod2(native.android.PACKAGE_PATH, native.android.methods.SHOW_DIALOG, "(Ljava/lang/String;Ljava/lang/String;)V", title, msg);
        } else if (this.isIOS()) {
            // 调用OC原生方法
        } else if (this.isBrowser()) {
            alert(msg);
        }
    }
};

module.exports = Tools;

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
        //# sourceMappingURL=Tools.js.map
        