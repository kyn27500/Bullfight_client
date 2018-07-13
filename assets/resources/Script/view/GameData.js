var GameData = {
    // 设置用户信息
    setUserInfo(pUserInfo){
        this.userInfor = pUserInfo;
    },
    // 获取用户信息
    getUserInfo(){
        return this.userInfor;
    },
    // 设置房间号
    setRoomCode(code){
        this.roomCode = code; 
    },
    // 获取房间号
    getRoomCode(){
        return this.roomCode;
    },
};

module.exports = GameData;