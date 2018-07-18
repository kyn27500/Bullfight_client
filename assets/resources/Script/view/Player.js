var cartTypeAtlas;
cc.Class({
    extends: cc.Component,

    properties: {


        spHead: cc.Sprite,         //头像
        spSgin: cc.Sprite,         //右上角标识
        labelName: cc.Label,       //名字
        labelScore: cc.Label,      //分数
        cardNode: cc.Node,         //牌背面
        spReady: cc.Sprite,        //已准备
        labelBet: cc.Label,        //下注倍数
        spType: cc.Sprite,         //牌型
        labelWinScore: cc.Label,   //赢得的分数

        ctAtlas: cc.SpriteAtlas,    //图集 牛牛类型

    },

    // use this for initialization
    onLoad: function () {

        this.node.active = false;
        this.spSgin.node.active = false;

        // 只需要设置一次就可以了
        cartTypeAtlas = cartTypeAtlas || this.ctAtlas;
    },

    /**
     * 创建用户
     * @param {*} data 
     */
    create(data) {

        this.node.active = true;
        this.labelName.string = data.user.name;
        this.labelScore.string = data.score;

        this.labelBet.node.active = false;
        this.spType.node.active = false;
        this.cardNode.active = false;
        this.labelWinScore.node.active = false;

        // 设置准备状态
        this.setReady(data.ready);
        // 设置是否是庄家
        this.setBanker(data.banker);

    },

    /**
     * 站起
     */
    sitUp() {
        this.node.active = false;
    },

    /**
     * 设置分数
     * @param {*} nScore 
     */
    setScore(nScore) {
        this.labelScore.string = nScore;
    },

    /**
     * 设置是否显示准备
     * @param {*} isReady 
     */
    setReady(isReady) {
        this.spReady.node.active = isReady;
    },

    /**
     * 设置牌型
     * @param {*} pType 
     */
    setCartType(pType) {
        this.spType.node.active = true
        this.spType.spriteFrame = cartTypeAtlas.getSpriteFrame(pType);
    },

    /**
     * 设置是否是庄家
     * @param {*} isBanker 
     */
    setBanker(isBanker) {
        // this.spSgin.parent.node.getChildByName("border").node.active = isBanker;
        this.spSgin.node.active = isBanker;
    },

    /**
     * 发牌动画
     */
    sendCardAction(pCallback){
        var pos = cc.p(cc.winSize.width/2,cc.winSize.height/2);
        pos = this.node.convertToNodeSpace(pos);

        this.cardNode.active = true;
        if(pCallback){
            pCallback()
        };
    }

    /**
     * 
     */


});
