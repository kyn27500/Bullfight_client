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
        callback: null,
    },

    onLoad: function() {},

    onClick: function() {
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
    updateItem: function(pItemData) {
        this.itemData = pItemData;
        this.labPeopleCount.string = this.itemData.people + texts.hall.PLAYER_COUNT;
        var sprite = this.spGameIcon.getComponent(cc.Sprite);
        cc.loader.loadRes("gameIcon/" + this.itemData.icon, cc.SpriteFrame, function(errorMessage, loadedResource) {
            sprite.spriteFrame = loadedResource;
        });
    },
});