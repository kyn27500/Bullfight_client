// 大厅数据存放

var HallData = {
    // 原始数据
    rawData: null,

    // 用户信息
    userInfo: null,

    // 游戏列表
    gameList: null,

    // 当前游戏信息
    curGameInfo: null,

    // 设置用户信息
    setUserInfo(data) {
        this.userInfo = data
    },

    // 获取用户信息
    getUserInfo(data) {
        return this.userInfo;
    },

    // 设置游戏列表
    setGameList(data) {
        this.gameList = data
    },

    // 获取游戏列表
    getGameList(data) {
        return this.gameList;
    },

    // 设置当前游戏信息
    setCurGameInfo(data) {
        this.curGameInfo = data
    },

    // 获取当前游戏信息
    getCurGameInfo(data) {
        return this.curGameInfo;
    },
};


module.exports = HallData;