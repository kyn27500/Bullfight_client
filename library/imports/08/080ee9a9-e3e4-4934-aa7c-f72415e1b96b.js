"use strict";
cc._RF.push(module, '080eemp4+RJNKp89yQV4blr', 'Player');
// resources/Script/view/Player.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        spHead: cc.Sprite, //头像
        spSgin: cc.Sprite, //右上角标识
        labelName: cc.Label, //名字
        labelScore: cc.Label, //分数
        cardNode: cc.Node, //牌背面
        spReady: cc.Sprite, //已准备
        labelBet: cc.Label, //下注倍数
        spType: cc.Sprite, //牌型
        labelWinScore: cc.Label //赢得的分数

    },

    // use this for initialization
    onLoad: function onLoad() {

        this.node.active = false;
        this.spSgin.node.active = false;
    },

    /**
     * 创建用户
     * @param {*} data 
     */
    create: function create(data) {

        this.node.active = true;
        this.labelName.string = data.user.name;
        this.labelScore.string = data.score;

        this.labelBet.node.active = false;
        this.spType.node.active = false;
        this.cardNode.active = false;
        this.labelWinScore.node.active = false;
        this.setReady(data.ready);
    },


    /**
     * 站起
     */
    sitUp: function sitUp() {
        this.node.active = false;
    },


    /**
     * 设置分数
     * @param {*} nScore 
     */
    setScore: function setScore(nScore) {
        this.labelScore.string = nScore;
    },


    /**
     * 设置是否显示准备
     * @param {*} isReady 
     */
    setReady: function setReady(isReady) {
        this.spReady.node.active = isReady;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

});

cc._RF.pop();