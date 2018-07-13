(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/resources/Script/UpdateScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5f8f7MT+bBHN7exX4jnbnwU', 'UpdateScene', __filename);
// resources/Script/UpdateScene.js

"use strict";

var MAX_FAIL_COUNT = 1; //最大错误重试次数
var scenes = require("SceneList");
var version = require("Version");

cc.Class({
    extends: cc.Component,

    properties: {
        prgBar: cc.ProgressBar,
        lblPct: cc.Label,
        _updating: false,
        _canRetry: false,
        _storagePath: "",
        _percent: 0,
        lblVersion: cc.Label
    },

    checkCb: function checkCb(event) {
        console.log('Code: ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log("No local manifest file found, hot update skipped.");
                this.updateFinished();
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log("Fail to download manifest file, hot update skipped.");
                this.updateFinished();
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log("Already up to date with the latest remote version.");
                this.updateFinished();
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                console.log('New version found, please try to update.');
                this.prgBar.progress = 0;
                this.lblPct.string = "0%";
                this.hotUpdate();
                break;
            default:
                return;
        }

        cc.eventManager.removeListener(this._checkListener);
        this._checkListener = null;
        this._updating = false;
    },

    updateCb: function updateCb(event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log('No local manifest file found, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.prgBar.progress = event.getPercentByFile();
                this.lblPct.string = parseInt(this.prgBar.progress * 100).toString() + "%";

                var msg = event.getMessage();
                if (msg) {
                    console.log('Updated file: ' + msg);
                    // console.log(event.getPercent()/100 + '% : ' + msg);
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('Fail to download manifest file, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('Already up to date with the latest remote version.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                console.log('Update finished. ' + event.getMessage());
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                console.log('Update failed. ' + event.getMessage());
                this._updating = false;
                this._canRetry = true;
                if (++this._failCount < MAX_FAIL_COUNT) {
                    this.retry();
                } else {
                    this.updateFinished();
                }
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                console.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                console.log(event.getMessage());
                break;
            default:
                break;
        }

        if (failed) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            this._updating = false;
        }

        if (needRestart) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    },

    loadCustomManifest: function loadCustomManifest() {
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
            this._am.loadLocalManifest(manifest, this._storagePath);
            console.log('Using custom manifest');
        }
    },

    retry: function retry() {
        if (!this._updating && this._canRetry) {
            this._canRetry = false;

            console.log('Retry failed Assets...');
            this._am.downloadFailedAssets();
        }
    },

    checkUpdate: function checkUpdate() {
        if (this._updating) {
            console.log('Checking or updating ...');
            return;
        }
        console.log("local manifest:", this.manifestUrl);
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            this._am.loadLocalManifest(this.manifestUrl);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            console.log('Failed to load local manifest ...');
            return;
        }
        this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
        cc.eventManager.addListener(this._checkListener, 1);

        this._am.checkUpdate();
    },

    hotUpdate: function hotUpdate() {
        if (this._am && !this._updating) {
            this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
            cc.eventManager.addListener(this._updateListener, 1);

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                this._am.loadLocalManifest(this.manifestUrl);
            }

            this._failCount = 0;
            this._am.update();
            this._updating = true;
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.lblVersion.string = version.getVersion();
        this.manifestUrl = "res/raw-assets/resources/project.manifest";

        // Hot update is only available in Native build
        if (!cc.sys.isNative) {
            console.log("Not native platform, skip hot update.");
            this.updateFinished();
            return;
        }
        this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'update';
        console.log('Storage path for remote asset : ' + this._storagePath);

        // Setup your own version compare handler, versionA and B is versions in string
        // if the return value greater than 0, versionA is greater than B,
        // if the return value equals 0, versionA equals to B,
        // if the return value smaller than 0, versionA is smaller than B.
        this.versionCompareHandle = function (versionA, versionB) {
            console.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                } else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            } else {
                return 0;
            }
        };

        // Init with empty manifest url for testing custom manifest
        this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);
        if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            this._am.retain();
        }

        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false
        this._am.setVerifyCallback(function (path, asset) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            var compressed = asset.compressed;
            // Retrieve the correct md5 value.
            var expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            var relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            var size = asset.size;
            if (compressed) {
                console.log("Verification passed : " + relativePath);
                return true;
            } else {
                console.log("Verification passed : " + relativePath + ' (' + expectedMD5 + ')');
                return true;
            }
        });

        console.log('Hot update is ready, please check or directly update.');

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(2);
            console.log("Max concurrent tasks count have been limited to 2");
        }

        this.prgBar.progress = 0;
        this.checkUpdate();
    },

    onDestroy: function onDestroy() {
        if (this._updateListener) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
        }
        if (this._am && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            this._am.release();
        }
    },

    updateFinished: function updateFinished() {
        cc.director.loadScene(scenes.hall.LOGIN_SCENE);
    }
});

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
        //# sourceMappingURL=UpdateScene.js.map
        