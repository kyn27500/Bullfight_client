(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/games/doushouqi/Com.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '18866DNvqtJuKkioM+C/knc', 'Com', __filename);
// resources/Script/view/games/doushouqi/Com.js

"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
*   @brief: 工具函数
*   @time:  2018-4-10
*   @author:JiangTao  
*/

function onRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.floor(Rand * Range); //舍去
    return num;
}

var _allAnimalNames = ["elephant", "lion", "tiger", "leopard", "wolf", "dog", "cat", "mouse"];

var gender_gril = "com/img_girl";

var gender_boy = "com/img_boy";

var audioList = [];

var animalList = [];

var blueAnimalList = [];

var redAnimalList = [];

function onGetAnimalUrl(index) {

    return animalList[index - 1];
}

function onGetAnimalIconUrl(index, isBlue) {

    var _iconUrl = '';

    if (isBlue) {

        _iconUrl = blueAnimalList[index - 1];
    } else {

        _iconUrl = redAnimalList[index - 1];
    }

    return _iconUrl;
}

// 性别图片
function onGenderImg(gender) {

    if (gender == 1) {

        return gender_gril;
    } else {

        return gender_boy;
    }
}

function onLoadAudio() {

    // 动物的声音音效

    cc.loader.loadResDir("games/doushouqi/sound", function (err, assets) {

        for (var i = 0; i < assets.length; ++i) {

            if (typeof assets[i] === 'string') {

                var element = assets[i];

                var nameList = element.split("/");

                audioList[nameList[nameList.length - 1]] = assets[i];
            }
        }
    });

    // 动物资源
    var onAnimalLoaded = function onAnimalLoaded(errorMessage, spriteFrames, urlList) {

        //检查失败原因
        if (errorMessage) {
            cc.log('加载失败, 原因:' + errorMessage);return;
        }

        animalList = spriteFrames;
    };
    //這邊才是真的使用cc.loader進行載入，並且呼叫我們上面寫的方法
    cc.loader.loadResDir("games/doushouqi/animal/", cc.SpriteFrame, onAnimalLoaded);

    var onBlueIconLoaded = function onBlueIconLoaded(errorMessage, spriteFrames, urlList) {

        //检查失败原因
        if (errorMessage) {
            cc.log('加载失败, 原因:' + errorMessage);return;
        }

        blueAnimalList = spriteFrames;
    };
    //這邊才是真的使用cc.loader進行載入，並且呼叫我們上面寫的方法
    cc.loader.loadResDir("games/doushouqi/animal_icon/blue/", cc.SpriteFrame, onBlueIconLoaded);

    var onRedIconLoaded = function onRedIconLoaded(errorMessage, spriteFrames, urlList) {

        //检查失败原因
        if (errorMessage) {
            cc.log('加载失败, 原因:' + errorMessage);return;
        }

        redAnimalList = spriteFrames;
    };
    //這邊才是真的使用cc.loader進行載入，並且呼叫我們上面寫的方法
    cc.loader.loadResDir("games/doushouqi/animal_icon/red/", cc.SpriteFrame, onRedIconLoaded);
}

/**
 * index:0 break:爆炸动画
 * index:1 move:移动
 * index:2 selected_cancel:选择取消
 * index:3 killSelf:自杀（被吃）
 * index:4 eat:吃别人
 * index:5 doubleKill:同归于尽
 * index:6 downTime:倒计时
 * index:7 draw:平局音效
 * index:8 win:胜利
 * index:9 los:失败音效
 */

var effectList = ["break", "move", "selected_cancel", "killSelf", "eat", "doubleKill", "downTime", "draw", "win", "los"];

function onPlayGameEffect(id) {

    var audioName = effectList[id] + ".mp3";

    cc.audioEngine.playEffect(audioList[audioName]);
}

function onPlayEffect(id) {
    var isAnimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


    var transID = id;

    if (isAnimal) {

        if (id > 10) {

            transID = id - 10;
        }

        cc.audioEngine.playEffect(audioList[_allAnimalNames[transID - 1] + ".mp3"]);
    }
}

function onGetBottomImg(colorStr) {

    var imgUrl = { bottom: "", mask: "" };

    if (colorStr == "Animal_blue") {

        imgUrl.bottom = "games/doushouqi/game/dizuo_blue";

        imgUrl.mask = "games/doushouqi/game/shadow_blue";

        return imgUrl;
    } else {

        imgUrl.bottom = "games/doushouqi/game/dizuo_red";

        imgUrl.mask = "games/doushouqi/game/shadow_red";

        return imgUrl;
    }
}

// var baseData = [{firstAnimal:-1}];

function setItem(jsonName) {
    var baseData = JSON.stringify(jsonName);
    cc.sys.localStorage.setItem("baseData", baseData);
}
/*
 * 读取基础数据
 * 还回json格式数据
 */
function getItem() {
    //  var baseData1 = JSON.stringify(baseData); //将json格式转换成string
    //  sys.localStorage.setItem("baseData", baseData1); //将数据存储在本地
    var baseDataa = cc.sys.localStorage.getItem("baseData"); //从本地读取数据
    baseDataa = JSON.parse(baseDataa); //将string转换成json
    return baseDataa;
};
/*
 * 删除数据
 */
function deleteItem() {
    cc.sys.localStorage.removeItem("baseData");
}

module.exports = _defineProperty({

    onRandomNum: onRandomNum,

    onGetAnimalIconUrl: onGetAnimalIconUrl,

    onGetAnimalUrl: onGetAnimalUrl,

    onGenderImg: onGenderImg,

    onLoadAudio: onLoadAudio,

    onPlayEffect: onPlayEffect,

    onGetBottomImg: onGetBottomImg,

    setItem: setItem,

    getItem: getItem,

    deleteItem: deleteItem,

    onPlayGameEffect: onPlayGameEffect }, "onPlayGameEffect", onPlayGameEffect);

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
        //# sourceMappingURL=Com.js.map
        