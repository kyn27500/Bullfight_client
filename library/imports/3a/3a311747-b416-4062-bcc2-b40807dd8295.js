"use strict";
cc._RF.push(module, '3a311dHtBZAYrzCtAgH3YKV', 'Game');
// resources/Script/view/Game.js

"use strict";

var self;
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {

        self = this;
        onfire.on(events.hall.HALL_DATA, function (data1, data2) {
            onfire.un(events.game.GAME_DATA);
            console.log(data1);
        });
    }

});

cc._RF.pop();