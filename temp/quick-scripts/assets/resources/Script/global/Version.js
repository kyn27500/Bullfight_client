(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/global/Version.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4b0cfuqjNFIXYaE6PtDtV4F', 'Version', __filename);
// resources/Script/global/Version.js

"use strict";

var Version = {
    major: 0,
    sub: 1,
    build: 26,

    /**
     * 获取版本号
     */
    getVersion: function getVersion() {
        return Version.major.toString() + "." + Version.sub.toString() + "." + Version.build.toString();
    }
};

module.exports = Version;

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
        //# sourceMappingURL=Version.js.map
        