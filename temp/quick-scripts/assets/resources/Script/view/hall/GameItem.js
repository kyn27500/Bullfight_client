(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/view/hall/GameItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9068bO428tN77g+q2B3Frio', 'GameItem', __filename);
// resources/Script/view/hall/GameItem.js

"use strict";

// 大厅游戏条目Prefab
var HallData = require("HallData");
var requestHandler = require("RequestHandler");
var config = require("config");
var events = require("CustomEvents");
var texts = require("Text");

cc.Class({
    extends: cc.Component,

    properties: {
        labPeopleCount: cc.Label,
        spGameIcon: cc.Sprite,
        btnGame: cc.Layout,
        itemData: null,
        callback: null
    },

    onLoad: function onLoad() {},

    onClick: function onClick() {
        console.log("---- 游戏ID：" + this.itemData.appId, this.itemData.appName);
        if (config.isNetwork) {
            var data = {
                appId: this.itemData.appId
            };
            requestHandler.sendRequest(events.hall.C2S_GAME_READY, data);
        } else {
            cc.director.loadScene(this.itemData.scene);
        }
        HallData.setCurGameInfo(this.itemData);
    },
    // 更新列表
    updateItem: function updateItem(pItemData) {
        this.itemData = pItemData;
        this.labPeopleCount.string = this.itemData.people + texts.hall.PLAYER_COUNT;
        var sprite = this.spGameIcon.getComponent(cc.Sprite);
        cc.loader.loadRes("gameIcon/" + this.itemData.icon, cc.SpriteFrame, function (errorMessage, loadedResource) {
            sprite.spriteFrame = loadedResource;
        });
    }
});

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
        //# sourceMappingURL=GameItem.js.map
        