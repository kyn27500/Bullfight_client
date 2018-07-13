var Version = {
    major: 0,
    sub: 1,
    build: 26,

    /**
     * 获取版本号
     */
    getVersion: function() {
        return Version.major.toString() + "." + Version.sub.toString() + "." + Version.build.toString();
    },
};

module.exports = Version;