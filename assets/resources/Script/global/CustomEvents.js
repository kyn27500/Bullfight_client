/**
 * 事件定义
 */
var CustomEvents = {
    /**
     * 通用事件
     */
    common: {
        /**
         * 服务端请求：心跳
         */
        S2C_HEARTBEAT: "s_common_heartbeat",

        /**
         * 客户端回应：心跳
         */
        C2S_HEARTBEAT: "c_common_heartbeat",
    },

    /**
     * onfire事件
     */
    onfire: {
        /**
         * onfire：连接打开
         */
        OPEN: "onopen",

        /**
         * onfire：连接关闭
         */
        CLOSE: "onclose",

        /**
         * onfire：消息
         */
        MESSAGE: "onmessage",

        /**
         * onfire：错误
         */
        ERROR: "onerror",
    },

    /**
     * 大厅事件
     */
    hall: {
        /**
         * 客户端请求：获取手机验证码
         */
        C2S_GET_PHONE_CODE: "c_daTing_getPhoneCode",

        /**
         * 客户端请求：登录
         */
        C2S_LOGIN: "c_daTing_login",

        /**
         * 服务端返回：登录结果
         */
        S2C_LOGIN: "s_daTing_login",

        /**
         * 客户端请求: 加入房间
         */
        userJoinRoomC2S: "userJoinRoomC2S",

        /**
         * 服务端返回：加入房间
         */
        userJoinRoomS2C: "userJoinRoomS2C",

        /**
         * 大厅数据
         */
        HALL_DATA: "hallData",
    },

    /**
     * 游戏事件
     */
    game: {
        /**
         * 客户端请求：登录
         */
        C2S_LOGIN: "c_game_login",

        /**
         * 服务端返回：登录信息
         */
        S2C_LOGIN: "s_game_login",

        /**
         * 客户端请求：强制退出
         */
        C2S_SEAT_CHOOSE: "seatChooseC2S",

        /**
         * 服务端消息：强制登出
         */
        S2C_SEAT_CHOOSE: "seatChooseS2C",

        /**
         * 游戏数据
         */
        S2C_SYN_SEATS: "seatPlayersSyncOtherS2C",

        /**
         * 游戏准备
         */
        C2S_READY: "gameReadyC2S",

         /**
         * 游戏准备
         */
        S2C_READY: "gameReadyS2C",

    },

    /**
     * 预制事件
     */
    prefab: {
        /**
         * 结果界面
         */
        result: {
            /**
             * 结果数据
             */
            DATA: "resultData",

            /**
             * 资源加载完毕
             */
            RES_LOADED: "resLoaded",
        },
    },
};

module.exports = CustomEvents;