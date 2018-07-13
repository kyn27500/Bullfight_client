"use strict";
cc._RF.push(module, '4b0cfuqjNFIXYaE6PtDtV4F', 'Version');
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