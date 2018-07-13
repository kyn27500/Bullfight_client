require = function s(r, a, l) {
function c(i, e) {
if (!a[i]) {
if (!r[i]) {
var t = "function" == typeof require && require;
if (!e && t) return t(i, !0);
if (h) return h(i, !0);
var n = new Error("Cannot find module '" + i + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
var o = a[i] = {
exports: {}
};
r[i][0].call(o.exports, function(e) {
var t = r[i][1][e];
return c(t || e);
}, o, o.exports, s, r, a, l);
}
return a[i].exports;
}
for (var h = "function" == typeof require && require, e = 0; e < l.length; e++) c(l[e]);
return c;
}({
1: [ function(e, t, c) {
(function(o) {
function s(e, t) {
for (var i = 0, n = e.length - 1; 0 <= n; n--) {
var o = e[n];
if ("." === o) e.splice(n, 1); else if (".." === o) {
e.splice(n, 1);
i++;
} else if (i) {
e.splice(n, 1);
i--;
}
}
if (t) for (;i--; i) e.unshift("..");
return e;
}
var t = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, r = function(e) {
return t.exec(e).slice(1);
};
c.resolve = function() {
for (var e = "", t = !1, i = arguments.length - 1; -1 <= i && !t; i--) {
var n = 0 <= i ? arguments[i] : o.cwd();
if ("string" != typeof n) throw new TypeError("Arguments to path.resolve must be strings");
if (n) {
e = n + "/" + e;
t = "/" === n.charAt(0);
}
}
return (t ? "/" : "") + (e = s(a(e.split("/"), function(e) {
return !!e;
}), !t).join("/")) || ".";
};
c.normalize = function(e) {
var t = c.isAbsolute(e), i = "/" === n(e, -1);
(e = s(a(e.split("/"), function(e) {
return !!e;
}), !t).join("/")) || t || (e = ".");
e && i && (e += "/");
return (t ? "/" : "") + e;
};
c.isAbsolute = function(e) {
return "/" === e.charAt(0);
};
c.join = function() {
var e = Array.prototype.slice.call(arguments, 0);
return c.normalize(a(e, function(e, t) {
if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
return e;
}).join("/"));
};
c.relative = function(e, t) {
e = c.resolve(e).substr(1);
t = c.resolve(t).substr(1);
function i(e) {
for (var t = 0; t < e.length && "" === e[t]; t++) ;
for (var i = e.length - 1; 0 <= i && "" === e[i]; i--) ;
return i < t ? [] : e.slice(t, i - t + 1);
}
for (var n = i(e.split("/")), o = i(t.split("/")), s = Math.min(n.length, o.length), r = s, a = 0; a < s; a++) if (n[a] !== o[a]) {
r = a;
break;
}
var l = [];
for (a = r; a < n.length; a++) l.push("..");
return (l = l.concat(o.slice(r))).join("/");
};
c.sep = "/";
c.delimiter = ":";
c.dirname = function(e) {
var t = r(e), i = t[0], n = t[1];
if (!i && !n) return ".";
n && (n = n.substr(0, n.length - 1));
return i + n;
};
c.basename = function(e, t) {
var i = r(e)[2];
t && i.substr(-1 * t.length) === t && (i = i.substr(0, i.length - t.length));
return i;
};
c.extname = function(e) {
return r(e)[3];
};
function a(e, t) {
if (e.filter) return e.filter(t);
for (var i = [], n = 0; n < e.length; n++) t(e[n], n, e) && i.push(e[n]);
return i;
}
var n = "b" === "ab".substr(-1) ? function(e, t, i) {
return e.substr(t, i);
} : function(e, t, i) {
t < 0 && (t = e.length + t);
return e.substr(t, i);
};
}).call(this, e("_process"));
}, {
_process: 2
} ],
2: [ function(e, t, i) {
var n, o, s = t.exports = {};
function r() {
throw new Error("setTimeout has not been defined");
}
function a() {
throw new Error("clearTimeout has not been defined");
}
(function() {
try {
n = "function" == typeof setTimeout ? setTimeout : r;
} catch (e) {
n = r;
}
try {
o = "function" == typeof clearTimeout ? clearTimeout : a;
} catch (e) {
o = a;
}
})();
function l(t) {
if (n === setTimeout) return setTimeout(t, 0);
if ((n === r || !n) && setTimeout) {
n = setTimeout;
return setTimeout(t, 0);
}
try {
return n(t, 0);
} catch (e) {
try {
return n.call(null, t, 0);
} catch (e) {
return n.call(this, t, 0);
}
}
}
var c, h = [], u = !1, f = -1;
function d() {
if (u && c) {
u = !1;
c.length ? h = c.concat(h) : f = -1;
h.length && p();
}
}
function p() {
if (!u) {
var e = l(d);
u = !0;
for (var t = h.length; t; ) {
c = h;
h = [];
for (;++f < t; ) c && c[f].run();
f = -1;
t = h.length;
}
c = null;
u = !1;
(function(t) {
if (o === clearTimeout) return clearTimeout(t);
if ((o === a || !o) && clearTimeout) {
o = clearTimeout;
return clearTimeout(t);
}
try {
o(t);
} catch (e) {
try {
return o.call(null, t);
} catch (e) {
return o.call(this, t);
}
}
})(e);
}
}
s.nextTick = function(e) {
var t = new Array(arguments.length - 1);
if (1 < arguments.length) for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
h.push(new m(e, t));
1 !== h.length || u || l(p);
};
function m(e, t) {
this.fun = e;
this.array = t;
}
m.prototype.run = function() {
this.fun.apply(null, this.array);
};
s.title = "browser";
s.browser = !0;
s.env = {};
s.argv = [];
s.version = "";
s.versions = {};
function g() {}
s.on = g;
s.addListener = g;
s.once = g;
s.off = g;
s.removeListener = g;
s.removeAllListeners = g;
s.emit = g;
s.prependListener = g;
s.prependOnceListener = g;
s.listeners = function(e) {
return [];
};
s.binding = function(e) {
throw new Error("process.binding is not supported");
};
s.cwd = function() {
return "/";
};
s.chdir = function(e) {
throw new Error("process.chdir is not supported");
};
s.umask = function() {
return 0;
};
}, {} ],
Animal_blue: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0c042gUvLdBHZ9ZdzA90QEk", "Animal_blue");
var s = e("Com");
cc.Class({
extends: cc.Component,
properties: {
node_obj: {
default: null,
type: cc.Sprite
},
sp_animal: {
default: null,
type: cc.Sprite
},
sp_icon: {
default: null,
type: cc.Sprite
},
breakAni: {
default: null,
type: cc.Animation
},
dieAni: {
default: null,
type: cc.Animation
},
nodeBreak: {
default: null,
type: cc.Node
},
sp_self: {
default: null,
type: cc.Sprite
},
sp_tip_break: {
default: null,
type: cc.Sprite
},
is_big: !1,
is_break: !1,
row: -1,
col: -1,
animalIndex: -1
},
onLoad: function() {},
init: function() {
this.sp_self.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.sp_tip_break.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.is_big = !1;
this.is_self = !1;
this._touchCallback = null;
this._breakCallback = null;
},
addTouchListener: function(e, t) {
if ("break" == t) this._breakCallback && this._breakCallback(this.row, this.col, "Animal_blue"); else if ("blue" == t) if (this.is_big) {
this.onRunSmall();
this._touchCallback && this._touchCallback(this.row, this.col, "Animal_blue", !1);
} else this._touchCallback && this._touchCallback(this.row, this.col, "Animal_blue", !0);
},
start: function() {},
update: function(e) {},
playAnimation: function(e) {
var t = this.breakAni.play("break"), i = this;
t.on("finished", function() {
console.log("onFinished");
i.is_break = !0;
i.nodeBreak.destroy();
i.sp_animal.node.active = !0;
i.sp_animal.node.opacity = 255;
i.sp_icon.node.active = !0;
i.sp_icon.node.opacity = 255;
e && e(i.row, i.col);
s.onPlayEffect(i.animalIndex);
}, this.breakAni);
},
onRunBig: function() {
var e = cc.sequence(cc.moveTo(.05, cc.p(0, 14)), cc.scaleTo(.05, 1.1), cc.callFunc(function() {
this.is_big = !0;
}, this, this.node_obj));
this.node_obj.node.runAction(e);
},
onRunSmall: function() {
var e = cc.sequence(cc.moveTo(.05, cc.p(0, 4)), cc.scaleTo(.05, 1), cc.callFunc(function() {
this.is_big = !1;
}, this, this.node_obj));
this.node_obj.node.runAction(e);
},
onMoveToTarget: function(e, t, i, n) {
var o = this;
var s = cc.moveTo(.2, cc.p(e.x, e.y)), r = cc.sequence(s, cc.callFunc(function() {
n && n(t, i);
o.is_big = !1;
var e = cc.scaleTo(.05, 1);
o.node_obj.node.runAction(e);
}, this, this.node));
this.node.runAction(r);
},
onOptionalObj: function() {
if (this.is_break) {
this.sp_tip_break.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.sp_self.node.active = !0;
this.sp_self.node.opacity = 255;
} else {
this.sp_tip_break.node.active = !0;
this.sp_tip_break.node.opacity = 255;
this.sp_self.node.active = !1;
this.sp_self.node.opacity = 0;
}
},
getAnimalIsBig: function() {
return this.is_big;
},
getAnimalIsBreak: function() {
return this.is_break;
},
onSetLocalZorder: function(e) {
this.node.setLocalZOrder(e);
},
onLoadAnimal: function(e) {
this.animalIndex = e;
var i = this.sp_animal, n = this.sp_icon, t = s.onGetAnimalUrl(e), o = s.onGetAnimalIconUrl(e, !0);
cc.loader.loadRes(t, cc.SpriteFrame, function(e, t) {
e || (i.getComponent(cc.Sprite).spriteFrame = t);
});
cc.loader.loadRes(o, cc.SpriteFrame, function(e, t) {
e || (n.getComponent(cc.Sprite).spriteFrame = t);
});
},
onSetRowAndCol: function(e, t) {
this.row = e;
this.col = t;
},
onGetRowAndCol: function() {
return {
row: this.row,
col: this.col
};
},
onDestory: function() {
this.node.destroy();
},
onSetSelf: function(e) {
this.is_self = e;
},
onGetSelf: function() {
return this.is_self;
},
onGetAnimalIndex: function() {
return this.animalIndex;
},
onSetTouchCallback: function(e) {
this._touchCallback = e;
},
onBreakBombCallback: function(e) {
this._breakCallback = e;
},
onGetComponentStr: function() {
return "Animal_blue";
},
onHideTip: function() {
this.sp_tip_break.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.sp_self.node.active = !1;
this.sp_self.node.opacity = 0;
},
onShowSelfTip: function() {
this.sp_tip_break.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.sp_self.node.active = !0;
this.sp_self.node.opacity = 255;
}
});
cc._RF.pop();
}, {
Com: "Com"
} ],
Animal_red: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8e623a9XwBHhpQuhrui2Fhu", "Animal_red");
var s = e("Com");
cc.Class({
extends: cc.Component,
properties: {
node_obj: {
default: null,
type: cc.Sprite
},
sp_animal: {
default: null,
type: cc.Sprite
},
sp_icon: {
default: null,
type: cc.Sprite
},
breakAni: {
default: null,
type: cc.Animation
},
dieAni: {
default: null,
type: cc.Animation
},
nodeBreak: {
default: null,
type: cc.Node
},
sp_up: {
default: null,
type: cc.Animation
},
sp_down: {
default: null,
type: cc.Animation
},
sp_left: {
default: null,
type: cc.Animation
},
sp_right: {
default: null,
type: cc.Animation
},
sp_self: {
default: null,
type: cc.Sprite
},
sp_tip_break: {
default: null,
type: cc.Sprite
},
audioClip: {
default: null,
url: cc.AudioClip
},
is_big: !1,
is_break: !1,
row: -1,
col: -1,
animalIndex: -1
},
onLoad: function() {},
init: function() {
this.sp_self.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.sp_tip_break.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.is_big = !1;
this.is_self = !1;
this._touchCallback = null;
this._breakCallback = null;
this.row = -1;
this.col = -1;
this.onHideTipDir();
this.onLoadAudio();
},
onLoadAudio: function() {},
addTouchListener: function(e, t) {
if ("break" == t) this._breakCallback && this._breakCallback(this.row, this.col, "Animal_red"); else if ("red" == t) if (this.is_big) {
this.onRunSmall();
this._touchCallback && this._touchCallback(this.row, this.col, "Animal_red", !1);
} else this._touchCallback && this._touchCallback(this.row, this.col, "Animal_red", !0);
},
start: function() {},
update: function(e) {},
playAnimation: function(e) {
var t = this.breakAni.play("break"), i = this;
t.on("finished", function() {
console.log("onFinished");
i.is_break = !0;
i.nodeBreak.destroy();
i.sp_animal.node.active = !0;
i.sp_animal.node.opacity = 255;
i.sp_icon.node.active = !0;
i.sp_icon.node.opacity = 255;
e && e(i.row, i.col);
s.onPlayEffect(i.animalIndex);
}, this.breakAni);
},
onRunBig: function() {
var e = cc.sequence(cc.moveTo(.05, cc.p(0, 14)), cc.scaleTo(.05, 1.1), cc.callFunc(function() {
this.is_big = !0;
}, this, this.node_obj));
this.node_obj.node.runAction(e);
},
onRunSmall: function() {
var e = cc.sequence(cc.moveTo(.05, cc.p(0, 4)), cc.scaleTo(.05, 1), cc.callFunc(function() {
this.is_big = !1;
}, this, this.node_obj));
this.node_obj.node.runAction(e);
},
onMoveToTarget: function(e, t, i, n) {
var o = this;
var s = cc.moveTo(.2, cc.p(e.x, e.y)), r = cc.sequence(s, cc.callFunc(function() {
n && n(t, i);
o.is_big = !1;
var e = cc.scaleTo(.05, 1);
o.node_obj.node.runAction(e);
}, this, this.node));
this.node.runAction(r);
},
onOptionalObj: function() {
if (this.is_break) {
this.sp_tip_break.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.sp_self.node.active = !0;
this.sp_self.node.opacity = 255;
} else {
this.sp_tip_break.node.active = !0;
this.sp_tip_break.node.opacity = 255;
this.sp_self.node.active = !1;
this.sp_self.node.opacity = 0;
}
},
getAnimalIsBig: function() {
return this.is_big;
},
getAnimalIsBreak: function() {
return this.is_break;
},
onSetLocalZorder: function(e) {
this.node.setLocalZOrder(e);
},
onLoadAnimal: function(e) {
this.animalIndex = e;
var i = this.sp_animal, n = this.sp_icon, t = s.onGetAnimalUrl(e), o = s.onGetAnimalIconUrl(e, !1);
cc.loader.loadRes(t, cc.SpriteFrame, function(e, t) {
e || (i.getComponent(cc.Sprite).spriteFrame = t);
});
cc.loader.loadRes(o, cc.SpriteFrame, function(e, t) {
e || (n.getComponent(cc.Sprite).spriteFrame = t);
});
},
onSetRowAndCol: function(e, t) {
this.row = e;
this.col = t;
},
onGetRowAndCol: function() {
return {
row: this.row,
col: this.col
};
},
onDestory: function() {
this.node.destroy();
},
onHideTipDir: function() {
this.sp_up.node.active = !1;
this.sp_up.node.opacity = 0;
this.sp_down.node.active = !1;
this.sp_down.node.opacity = 0;
this.sp_left.node.active = !1;
this.sp_left.node.opacity = 0;
this.sp_right.node.active = !1;
this.sp_right.node.opacity = 0;
},
onSetSelf: function(e) {
this.is_self = e;
},
onGetSelf: function() {
return this.is_self;
},
onGetAnimalIndex: function() {
return this.animalIndex;
},
onSetTouchCallback: function(e) {
this._touchCallback = e;
},
onBreakBombCallback: function(e) {
this._breakCallback = e;
},
onGetComponentStr: function() {
return "Animal_red";
},
onHideTip: function() {
this.sp_tip_break.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.sp_self.node.active = !1;
this.sp_self.node.opacity = 0;
},
onShowSelfTip: function() {
this.sp_tip_break.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.sp_self.node.active = !0;
this.sp_self.node.opacity = 255;
}
});
cc._RF.pop();
}, {
Com: "Com"
} ],
Animal: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "9bf17L5wyZM+4Yr8PrkCZoe", "Animal");
var a = e("Com");
cc.Class({
extends: cc.Component,
properties: {
node_obj: {
default: null,
type: cc.Sprite
},
sp_animal: {
default: null,
type: cc.Sprite
},
sp_icon: {
default: null,
type: cc.Sprite
},
sp_mask_bottom: {
default: null,
type: cc.Sprite
},
breakAni: {
default: null,
type: cc.Animation
},
nodeBreak: {
default: null,
type: cc.Node
},
sp_self: {
default: null,
type: cc.Sprite
},
sp_tip_break: {
default: null,
type: cc.Sprite
},
is_big: !1,
is_break: !1,
row: -1,
col: -1,
animalIndex: -1,
animalColor: ""
},
onLoad: function() {},
init: function() {
this.sp_self.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.sp_tip_break.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.is_big = !1;
this.is_break = !1;
this._touchCallback = null;
this._breakCallback = null;
this._objCode = -1;
},
addTouchListener: function(e, t) {
if ("break" == t) {
a.onPlayGameEffect(0);
this._breakCallback && this._breakCallback(this.row, this.col, "Animal");
} else if ("animal" == t) {
a.onPlayGameEffect(2);
if (this.is_big) {
this.onRunSmall();
this._touchCallback && this._touchCallback(this.row, this.col, this._objCode, !1);
} else this._touchCallback && this._touchCallback(this.row, this.col, this._objCode, !0);
}
},
start: function() {},
update: function(e) {},
onSetAnimalInfo: function(e) {},
playAnimation: function(e, t, i) {
var n = this.breakAni.play("break"), o = this;
console.log("playAnimation ====== ", i);
this.onSetAnimalCode(i);
n.on("finished", function() {
o.onLoadAnimal(t);
e && e(o.row, o.col);
a.onPlayEffect(t);
}, this.breakAni);
},
onShowAnimal: function() {
this.is_break = !0;
this.nodeBreak.destroy();
this.sp_animal.node.active = !0;
this.sp_animal.node.opacity = 255;
this.sp_icon.node.active = !0;
this.sp_icon.node.opacity = 255;
this.sp_mask_bottom.node.active = !0;
this.sp_mask_bottom.node.opacity = 255;
},
onRunBig: function() {
var e = cc.sequence(cc.moveTo(.05, cc.p(0, 14)), cc.scaleTo(.05, 1.1), cc.callFunc(function() {
this.is_big = !0;
}, this, this.node_obj));
this.node_obj.node.runAction(e);
},
onRunSmall: function() {
var e = cc.sequence(cc.moveTo(.05, cc.p(0, 4)), cc.scaleTo(.05, 1), cc.callFunc(function() {
this.is_big = !1;
}, this, this.node_obj));
this.node_obj.node.runAction(e);
},
onMoveToTarget: function(t, i) {
var n = this;
var e = cc.moveTo(.2, cc.p(t.targetPos.x, t.targetPos.y)), o = cc.sequence(e, cc.callFunc(function() {
i && i(t);
n.is_big = !1;
var e = cc.scaleTo(.05, 1);
n.node_obj.node.runAction(e);
}, this, this.node));
this.node.runAction(o);
},
getAnimalIsBig: function() {
return this.is_big;
},
getAnimalIsBreak: function() {
return this.is_break;
},
onSetLocalZorder: function(e) {
this.node.setLocalZOrder(e);
},
onLoadAnimal: function(e) {
var t = "blue", i = !1, n = this.animalIndex = e;
if (10 < e) {
t = "Animal_blue";
n = e - 10;
i = !0;
} else {
t = "Animal_red";
i = !1;
}
var o = a.onGetBottomImg(t);
this.onLoadAnimalRes(o.bottom, this.node_obj);
this.onLoadAnimalRes(o.mask, this.sp_mask_bottom);
var s = a.onGetAnimalUrl(n), r = a.onGetAnimalIconUrl(n, i);
this.sp_animal.spriteFrame = s;
this.sp_icon.spriteFrame = r;
this.onSetSelf(t);
this.onShowAnimal();
},
onLoadAnimalRes: function(e, i) {
i ? cc.loader.loadRes(e, cc.SpriteFrame, function(e, t) {
e || (i.getComponent(cc.Sprite).spriteFrame = t);
}) : console.log(" targetNode: ", i);
},
onSetRowAndCol: function(e, t) {
this.row = e;
this.col = t;
},
onGetRowAndCol: function() {
return {
row: this.row,
col: this.col
};
},
onDestory: function() {
this.node.destroy();
},
onSetAnimalCode: function(e) {
this._objCode = e;
},
onGetAnimalCode: function() {
return this._objCode;
},
onSetSelf: function(e) {
this.animalColor = e;
},
onGetSelfColor: function() {
return this.animalColor;
},
onGetAnimalIndex: function() {
return this.animalIndex;
},
onSetTouchCallback: function(e) {
this._touchCallback = e;
},
onBreakBombCallback: function(e) {
this._breakCallback = e;
},
onGetComponentStr: function() {
return this.animalColor;
},
onHideTip: function() {
this.sp_tip_break.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.sp_self.node.active = !1;
this.sp_self.node.opacity = 0;
},
onShowSelfTip: function() {
this.sp_tip_break.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.sp_self.node.active = !0;
this.sp_self.node.opacity = 255;
},
onOptionalObj: function() {
if (this.is_break) {
this.sp_tip_break.node.active = !1;
this.sp_tip_break.node.opacity = 0;
this.sp_self.node.active = !0;
this.sp_self.node.opacity = 255;
} else {
this.sp_tip_break.node.active = !0;
this.sp_tip_break.node.opacity = 255;
this.sp_self.node.active = !1;
this.sp_self.node.opacity = 0;
}
}
});
cc._RF.pop();
}, {
Com: "Com"
} ],
Break: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2642bmwGlZDeYqG6Hr62KU3", "Break");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
start: function() {},
init: function() {},
onTouchListener: function(e, t) {
console.log(" customEventData ", t);
}
});
cc._RF.pop();
}, {} ],
BtnEmpty: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "9d7effKYUJAv6rk84tERN4k", "BtnEmpty");
cc.Class({
extends: cc.Component,
properties: {
row: -1,
col: -1
},
onLoad: function() {},
update: function(e) {},
addTouchListener: function(e, t) {
this._onTouchCallback && this._onTouchCallback(this.row, this.col);
},
onSetRowAndCol: function(e, t) {
this.row = e;
this.col = t;
},
onGetRowAndCol: function() {
return {
row: this.row,
col: this.col
};
},
onSetTouchCallback: function(e) {
this._onTouchCallback = e;
}
});
cc._RF.pop();
}, {} ],
Com: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "18866DNvqtJuKkioM+C/knc", "Com");
var n = [ "elephant", "lion", "tiger", "leopard", "wolf", "dog", "cat", "mouse" ], o = "com/img_girl", s = "com/img_boy", r = [], a = [], l = [], c = [];
var h = [ "break", "move", "selected_cancel", "killSelf", "eat", "doubleKill", "downTime", "draw", "win", "los" ];
function u(e) {
var t = h[e] + ".mp3";
cc.audioEngine.playEffect(r[t]);
}
t.exports = function(e, t, i) {
t in e ? Object.defineProperty(e, t, {
value: i,
enumerable: !0,
configurable: !0,
writable: !0
}) : e[t] = i;
return e;
}({
onRandomNum: function(e, t) {
var i = t - e, n = Math.random();
return e + Math.floor(n * i);
},
onGetAnimalIconUrl: function(e, t) {
return t ? l[e - 1] : c[e - 1];
},
onGetAnimalUrl: function(e) {
return a[e - 1];
},
onGenderImg: function(e) {
return 1 == e ? o : s;
},
onLoadAudio: function() {
cc.loader.loadResDir("games/doushouqi/sound", function(e, t) {
for (var i = 0; i < t.length; ++i) if ("string" == typeof t[i]) {
var n = t[i].split("/");
r[n[n.length - 1]] = t[i];
}
});
cc.loader.loadResDir("games/doushouqi/animal/", cc.SpriteFrame, function(e, t, i) {
e ? cc.log("加载失败, 原因:" + e) : a = t;
});
cc.loader.loadResDir("games/doushouqi/animal_icon/blue/", cc.SpriteFrame, function(e, t, i) {
e ? cc.log("加载失败, 原因:" + e) : l = t;
});
cc.loader.loadResDir("games/doushouqi/animal_icon/red/", cc.SpriteFrame, function(e, t, i) {
e ? cc.log("加载失败, 原因:" + e) : c = t;
});
},
onPlayEffect: function(e) {
var t = e;
if (!(1 < arguments.length && void 0 !== arguments[1]) || arguments[1]) {
10 < e && (t = e - 10);
cc.audioEngine.playEffect(r[n[t - 1] + ".mp3"]);
}
},
onGetBottomImg: function(e) {
var t = {
bottom: "",
mask: ""
};
if ("Animal_blue" == e) {
t.bottom = "games/doushouqi/game/dizuo_blue";
t.mask = "games/doushouqi/game/shadow_blue";
return t;
}
t.bottom = "games/doushouqi/game/dizuo_red";
t.mask = "games/doushouqi/game/shadow_red";
return t;
},
setItem: function(e) {
var t = JSON.stringify(e);
cc.sys.localStorage.setItem("baseData", t);
},
getItem: function() {
var e = cc.sys.localStorage.getItem("baseData");
return e = JSON.parse(e);
},
deleteItem: function() {
cc.sys.localStorage.removeItem("baseData");
},
onPlayGameEffect: u
}, "onPlayGameEffect", u);
cc._RF.pop();
}, {} ],
Doushouqi_back: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f4eb1ZVhnVGhKrsksb8uWym", "Doushouqi_back");
var l = e("Com");
e("onfire"), e("RequestHandler");
cc.Class({
extends: cc.Component,
properties: {
sp_head_red: {
default: null,
type: cc.Sprite
},
sp_head_blue: {
default: null,
type: cc.Sprite
},
node_table: {
default: null,
type: cc.Node
},
sp_tip: {
default: null,
type: cc.Sprite
},
label_tip: {
default: null,
type: cc.Label
},
sp_alert: {
default: null,
type: cc.Sprite
},
label_alert: {
default: null,
type: cc.Label
},
label_red_btn: {
default: null,
type: cc.Label
},
label_blue_btn: {
default: null,
type: cc.Label
},
node_dir: {
default: null,
type: cc.Node
},
sp_up: {
default: null,
type: cc.Animation
},
sp_down: {
default: null,
type: cc.Animation
},
sp_left: {
default: null,
type: cc.Animation
},
sp_right: {
default: null,
type: cc.Animation
},
sp_destory: {
default: null,
type: cc.Animation
},
sp_white: {
default: null,
type: cc.Sprite
},
sp_red_time: {
default: null,
type: cc.Sprite
},
sp_blue_time: {
default: null,
type: cc.Sprite
},
label_red_time: {
default: null,
type: cc.Label
},
label_blue_time: {
default: null,
type: cc.Label
},
sp_test: {
default: null,
type: cc.SpriteFrame
},
nodeResult: {
default: null,
type: cc.Node
},
animal_blue_Prefab: cc.Prefab,
animal_red_Prefab: cc.Prefab,
empty_prefab: cc.Prefab,
result_prefab: cc.Prefab,
defalutTiem: 30,
count: 30
},
onLoad: function() {
l.onLoadAudio();
this.init();
this.initUI();
this.openUpdate();
this.onOptionalTimeAni();
},
onDestroy: function() {},
start: function() {},
initUI: function() {
this.sp_tip.node.active = !0;
this.sp_tip.node.scale = 0;
this.sp_alert.node.active = !0;
this.sp_alert.node.scale = 0;
this.sp_destory.node.active = !1;
this.sp_destory.node.opacity = 0;
this.sp_white.node.active = !0;
this.sp_white.node.opacity = 255;
this.sp_red_time.node.active = !0;
this.sp_red_time.node.opacity = 255;
this.sp_red_time.node.scaleY = 0;
this.sp_blue_time.node.active = !0;
this.sp_blue_time.node.opacity = 255;
this.sp_blue_time.node.scaleY = 0;
this.onHideTipDir();
this.node_dir.setLocalZOrder(100);
this.sp_destory.node.setLocalZOrder(100);
},
init: function() {
this._blueAnimal = [];
this._redAnimal = [];
this._rand01 = -1;
this._blueSelf = !0;
this._pinkSelf = !1;
this._isShowTip = !1;
this._isShowAlert = !1;
this._isCanOptional = !1;
this._optionalObj = "Animal_blue";
this._selectedPoint = [ -1, -1 ];
this._selectedObj = {
row: -1,
col: -1,
count: 0
};
this._compareState = {
eq: 0,
gt: 1,
lt: 2,
same: 3
};
this.width = cc.winSize.width;
this.height = cc.winSize.height;
this.allPos = [ [ cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2 ], [ cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2 ], [ cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2 ], [ cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2 ] ];
this.allBtnEmpty = [ [ cc.Button, cc.Button, cc.Button, cc.Button ], [ cc.Button, cc.Button, cc.Button, cc.Button ], [ cc.Button, cc.Button, cc.Button, cc.Button ], [ cc.Button, cc.Button, cc.Button, cc.Button ] ];
for (var e = null, t = 0; t < 4; t++) for (var i = 0; i < 4; i++) {
e = this.node_table.getChildByName("node_pos_" + t.toString() + i.toString()).position;
this.allPos[t][i] = e;
}
this.tableNodes = [ [ {}, {}, {}, {} ], [ {}, {}, {}, {} ], [ {}, {}, {}, {} ], [ {}, {}, {}, {} ] ];
this.onInitTable();
},
onTouchListener: function(e, t) {
console.log(" customEventData ", t);
"back" == t ? this.onAddTip("back-home") : "help" == t || ("qiuhe" == t ? this.onAddAlert("对方向您求平局", "拒绝", "同意") : "renshu" == t ? this.onAddAlert("您确定要认输吗？", "取消", "确认") : "btn_refuse" == t ? this.onHideAlert() : "btn_agree" == t && this.onHideAlert());
},
onLoadHeadImg: function() {},
onInitTable: function() {
this.onDelRepeatRandBlue();
this.onDelRepeatRandPink();
for (var e = null, t = null, i = 0, n = 0, o = "", s = 0; s < this.tableNodes.length; s++) for (var r = 0; r < this.tableNodes[s].length; r++) {
(e = cc.instantiate(this.empty_prefab)).addComponent("BtnEmpty");
e.x = this.allPos[s][r].x;
e.y = this.allPos[s][r].y;
e.setLocalZOrder(0);
e.parent = this.node_table;
(this.allBtnEmpty[s][r] = e).getComponent("BtnEmpty").onSetRowAndCol(s, r);
e.getComponent("BtnEmpty").onSetTouchCallback(this.onEmptyTouchCallback.bind(this));
var a = l.onRandomNum(0, 2);
8 == i ? a = 1 : 8 == n && (a = 0);
if (0 == a) {
i += 1;
o = "Animal_blue";
(t = cc.instantiate(this.animal_blue_Prefab)).componentStr = "Animal_blue";
t.addComponent(o);
t.getComponent(o).init();
t.getComponent(o).onLoadAnimal(this._blueAnimal[i - 1]);
t.getComponent(o).onSetSelf(this._blueSelf);
} else if (1 == a) {
n += 1;
o = "Animal_red";
(t = cc.instantiate(this.animal_red_Prefab)).componentStr = "Animal_red";
t.addComponent(o);
t.getComponent(o).init();
t.getComponent(o).onLoadAnimal(this._redAnimal[n - 1]);
t.getComponent(o).onSetSelf(this._pinkSelf);
}
t.x = this.allPos[s][r].x;
t.y = this.allPos[s][r].y;
t.active = !0;
t.opacity = 255;
t.setLocalZOrder(2);
t.parent = this.node_table;
this.tableNodes[s][r] = {
isDie: !1,
animal: t
};
t.getComponent(o).onSetRowAndCol(s, r);
t.getComponent(o).onBreakBombCallback(this.onBombTouchCallback.bind(this));
t.getComponent(o).onSetTouchCallback(this.onTouchCallback.bind(this));
}
},
onDelRepeatRandBlue: function() {
for (var e = 0; e < 8; e++) {
var t = l.onRandomNum(1, 9);
this._blueAnimal.push(t);
for (var i = 0; i < e; i++) if (t == this._blueAnimal[i]) {
this._blueAnimal.splice(e, 1);
e--;
break;
}
}
},
onDelRepeatRandPink: function() {
for (var e = 0; e < 8; e++) {
var t = l.onRandomNum(1, 9);
this._redAnimal.push(t);
for (var i = 0; i < e; i++) if (t == this._redAnimal[i]) {
this._redAnimal.splice(e, 1);
e--;
break;
}
}
},
onTouchCallback: function(e, t, i, n) {
if (this._isCanOptional) if (this._optionalObj == i && n) {
if (0 == this._selectedObj.count) {
this._selectedObj.count = 1;
this._selectedObj.row = e;
this._selectedObj.col = t;
this.tableNodes[e][t].animal.getComponent(this._optionalObj).onRunBig();
this.onCheckRoundMove(e, t, this.tableNodes[e][t].animal.getComponent(this._optionalObj));
console.log("this._selectedObj.count == 0");
} else if (1 <= this._selectedObj.count) {
console.log("this._selectedObj.count >= 1");
this.tableNodes[this._selectedObj.row][this._selectedObj.col].animal.getComponent(this._optionalObj).onRunSmall();
this.onHideTipDir();
this._selectedObj.count = 0;
this._selectedObj.row = -1;
this._selectedObj.col = -1;
}
} else if (this._optionalObj != i || n) {
if (!this.onCheckOptionalValid()) {
this.onAddTip("不可以操作其他玩家棋子");
return;
}
if (this.onClearAlgorithm(e, t) && !this.onCheckAnimalSame(e, t)) {
var o = this._selectedObj.row, s = this._selectedObj.col, r = {
x: this.tableNodes[e][t].animal.x,
y: this.tableNodes[e][t].animal.y
};
this.tableNodes[o][s].animal.getComponent(this._optionalObj).node.setLocalZOrder(99);
this.tableNodes[o][s].animal.getComponent(this._optionalObj).onMoveToTarget(r, e, t, this.onMoveCallbackDel.bind(this));
} else {
o = this._selectedObj.row, s = this._selectedObj.col;
this.tableNodes[o][s].animal.getComponent(this._optionalObj).onRunSmall();
this.onHideTipDir();
this._selectedObj.row = -1;
this._selectedObj.col = -1;
}
} else {
this._selectedObj.count = 0;
this._selectedObj.row = -1;
this._selectedObj.col = -1;
this.onHideTipDir();
} else this.onAddTip("您操作太频繁，请稍等...");
},
onBombTouchCallback: function(e, t, i) {
console.log("onBombTouchCall", this._isCanOptional);
this._isCanOptional ? this.tableNodes[e][t].animal.getComponent(i).playAnimation(this.onAnimaltionBreakCallback.bind(this)) : this.onAddTip("您操作太频繁，请稍等...");
},
onAnimaltionBreakCallback: function(e, t) {
this.onCheckOptionSelf();
this.tableNodes[e][t].animal.active = !0;
this.tableNodes[e][t].animal.opacity = 255;
this.onResetStatus();
this.onHideTipDir();
},
onEmptyTouchCallback: function(e, t) {
console.log("onEmptyTouchCallback", e, t);
if (this.onClearAlgorithm(e, t)) {
var i = this._selectedObj.row, n = this._selectedObj.col, o = {
x: this.allBtnEmpty[e][t].x,
y: this.allBtnEmpty[e][t].y
};
this.tableNodes[i][n].animal.getComponent(this._optionalObj).onMoveToTarget(o, e, t, this.onMoveCallback.bind(this));
}
},
onMoveCallbackDel: function(e, t) {
var i = this._selectedObj.row, n = this._selectedObj.col;
if (this.onCheckCompare(e, t) == this._compareState.eq) {
var o = this.tableNodes[e][t].animal.componentStr, s = this.tableNodes[i][n].animal.componentStr;
this.onPlayDestoryAni(e, t);
this.tableNodes[e][t].animal.getComponent(o).onDestory();
this.tableNodes[i][n].animal.getComponent(s).onDestory();
this.tableNodes[e][t].isDie = !0;
this.tableNodes[i][n].isDie = !0;
} else if (this.onCheckCompare(e, t) == this._compareState.gt) {
var r = this.tableNodes[i][n].animal.componentStr;
this.tableNodes[i][n].isDie = !0;
this.tableNodes[e][t].isDie = !1;
this.onPlayDestoryAni(e, t);
this.tableNodes[i][n].animal.getComponent(r).onDestory();
} else if (this.onCheckCompare(e, t) == this._compareState.lt) {
r = this.tableNodes[e][t].animal.componentStr;
var a = this.tableNodes[i][n].animal.componentStr;
this.tableNodes[e][t].isDie = !0;
this.tableNodes[i][n].isDie = !1;
this.tableNodes[i][n].animal.getComponent(a).node.setLocalZOrder(1);
this.onPlayDestoryAni(e, t);
this.tableNodes[e][t].animal.getComponent(r).onDestory();
this.tableNodes[e][t].animal = this.tableNodes[i][n].animal;
this.tableNodes[e][t].isDie = this.tableNodes[i][n].isDie;
this.tableNodes[i][n].isDie = !0;
this.tableNodes[i][n].animal.getComponent(this._optionalObj).onSetRowAndCol(e, t);
} else if (-1 == this.onCheckCompare(e, t)) return;
this.onCheckResult() || this.onCheckOptionSelf();
},
onMoveCallback: function(e, t) {
console.log("移动完成");
var i = this._selectedObj.row, n = this._selectedObj.col, o = this.tableNodes[e][t].isDie;
this.tableNodes[e][t].animal = this.tableNodes[i][n].animal;
this.tableNodes[e][t].isDie = this.tableNodes[i][n].isDie;
this.tableNodes[i][n].isDie = o;
this.tableNodes[i][n].animal.getComponent(this._optionalObj).onSetRowAndCol(e, t);
this.onCheckOptionSelf();
},
onCheckOptionSelf: function() {
this.closeUpdate();
this.onSetOptionalTime();
this.onResetStatus();
this._selectedObj.row = -1;
this._selectedObj.col = -1;
this._selectedObj.count = 0;
if ("Animal_blue" == this._optionalObj) {
this._optionalObj = "Animal_red";
this.onRedBoardAni(!0);
this.onBlueBoardAni(!1);
} else if ("Animal_red" == this._optionalObj) {
this._optionalObj = "Animal_blue";
this.onBlueBoardAni(!0);
this.onRedBoardAni(!1);
}
this.onHideTipDir();
this.onShowValidOptionalObj();
},
onClearAlgorithm: function(e, t) {
var i = this._selectedObj.row, n = this._selectedObj.col, o = !1;
o = e - 1 == i && t == n || (e + 1 == i && t == n || (e == i && t - 1 == n || e == i && t + 1 == n));
console.log("isClear ===== ", o);
return o;
},
onCheckCompare: function(e, t) {
var i = this._selectedObj.row, n = this._selectedObj.col, o = this.tableNodes[e][t].animal.componentStr, s = this.tableNodes[i][n].animal.getComponent(this._optionalObj).onGetAnimalIndex(), r = this.tableNodes[e][t].animal.getComponent(o).onGetAnimalIndex(), a = -1;
8 == s && 1 == r ? a = this._compareState.lt : 1 == s && 8 == r ? a = this._compareState.gt : s == r ? a = this._compareState.eq : r < s ? a = this._compareState.gt : s < r && (a = this._compareState.lt);
return a;
},
onCheckAnimalSame: function(e, t) {
var i = !1, n = this._selectedObj.row, o = this._selectedObj.col, s = this.tableNodes[e][t].animal.componentStr, r = this.tableNodes[n][o].animal.componentStr;
if (s == r) {
this.tableNodes[n][o].animal.getComponent(r).onRunSmall();
this.tableNodes[e][t].animal.getComponent(s).onRunSmall();
this.onHideTipDir();
i = !0;
}
return i;
},
onCheckOptionalValid: function() {
var e = this._selectedObj.row, t = this._selectedObj.col;
return -1 != e || -1 != t;
},
onShowValidOptionalObj: function() {
console.log(" onShowValidOptionalObj ");
for (var e = null, t = "", i = 0; i < this.tableNodes.length; i++) for (var n = 0; n < this.tableNodes[i].length; n++) if (!this.tableNodes[i][n].isDie) {
t = (e = this.tableNodes[i][n].animal).componentStr;
e.getComponent(t).getAnimalIsBreak() ? this._optionalObj == t ? e.getComponent(t).onShowSelfTip() : e.getComponent(t).onHideTip() : e.getComponent(t).onOptionalObj();
}
},
onResetStatus: function() {
for (var e = null, t = "", i = 0; i < this.tableNodes.length; i++) for (var n = 0; n < this.tableNodes[i].length; n++) this.tableNodes[i][n].isDie || (t = (e = this.tableNodes[i][n].animal).componentStr) == this._optionalObj && e.getComponent(t).getAnimalIsBig() && e.getComponent(t).onRunSmall();
},
onCheckResult: function() {
for (var e = 0, t = 0, i = "", n = 0; n < this.tableNodes.length; n++) for (var o = 0; o < this.tableNodes[n].length; o++) this.tableNodes[n][o].isDie || ("Animal_blue" == (i = this.tableNodes[n][o].animal.componentStr) ? e += 1 : "Animal_red" == i && (t += 1));
console.log("blueCount === ", e);
console.log("pinkCount === ", t);
var s = !1;
0 == e && 0 == t ? s = !0 : 0 == t && t < e ? s = !0 : 0 == e && e < t && (s = !0);
if (s) {
this.closeUpdate();
this.onHideTipDir();
this._playAnimCallback = function() {
this.onAddResultLayer();
};
this.scheduleOnce(this._playAnimCallback, .5);
}
return s;
},
onClearTabel: function() {
for (var e = null, t = "", i = 0; i < this.tableNodes.length; i++) for (var n = 0; n < this.tableNodes[i].length; n++) if (!this.tableNodes[i][n].isDie) {
t = (e = this.tableNodes[i][n].animal).componentStr;
e.getComponent(t).onDestory();
}
},
onRestart: function() {
this.onClearTabel();
this.init();
this.initUI();
this.openUpdate();
this.onOptionalTimeAni();
},
openUpdate: function() {
var e = this.defalutTiem;
this.schedule(this.onTimeDownCallback, 1, e, 0);
},
closeUpdate: function() {
console.log(" closeUpdate ********************** ");
this.unschedule(this.onTimeDownCallback);
this.count = 30;
this._isCanOptional = !1;
},
onTimeDownCallback: function() {
this.count -= 1;
if (this.count < 0) {
this.closeUpdate();
this.onCheckOptionSelf();
} else this.onSetOptionalTime();
},
onCanOptionalObj: function() {
return this._isCanOptional;
},
onCheckRoundMove: function(e, t, i) {
var n = {
up: !1,
down: !1,
left: !1,
right: !1
};
if (0 <= e - 1) {
this.onFindAnimalOfIndex(e - 1, t) && (n.up = !0);
}
if (e + 1 <= 3) {
this.onFindAnimalOfIndex(e + 1, t) && (n.down = !0);
}
if (0 <= t - 1) {
this.onFindAnimalOfIndex(e, t - 1) && (n.left = !0);
}
if (t + 1 <= 3) {
this.onFindAnimalOfIndex(e, t + 1) && (n.right = !0);
}
(e < 0 || t < 0 || 3 < e || 3 < t) && (n = {
up: !1,
down: !1,
left: !1,
right: !1
});
this.node_dir.x = this.tableNodes[e][t].animal.x;
this.node_dir.y = this.tableNodes[e][t].animal.y + 10;
this.onTipMoveDirection(n);
},
onFindAnimalOfIndex: function(e, t) {
var i = null, n = "", o = !1;
if (this.tableNodes[e][t].isDie) o = !0; else {
n = (i = this.tableNodes[e][t].animal).componentStr;
o = !!i.getComponent(n).getAnimalIsBreak() && this._optionalObj != n;
}
return o;
},
onTipMoveDirection: function(e) {
e.up && this.onRepeatAction(this.sp_up, "up");
e.down && this.onRepeatAction(this.sp_down, "down");
e.left && this.onRepeatAction(this.sp_left, "left");
e.right && this.onRepeatAction(this.sp_right, "right");
},
onRepeatAction: function(e, t) {
e.node.active = !0;
e.node.opacity = 255;
var i = e.play(t);
i.wrapMode = cc.WrapMode.Loop;
i.repeatCount = Infinity;
},
onHideTipDir: function() {
this.sp_up.node.active = !1;
this.sp_up.node.opacity = 0;
this.sp_down.node.active = !1;
this.sp_down.node.opacity = 0;
this.sp_left.node.active = !1;
this.sp_left.node.opacity = 0;
this.sp_right.node.active = !1;
this.sp_right.node.opacity = 0;
},
onPlayDestoryAni: function(e, t) {
this.sp_destory.node.x = this.allPos[e][t].x;
this.sp_destory.node.y = this.allPos[e][t].y;
this.onDestoryAnimation();
},
onDestoryAnimation: function() {
this.sp_destory.node.active = !0;
this.sp_destory.node.opacity = 255;
var e = this.sp_destory.play("destory"), t = this;
e.on("finished", function() {
console.log("onFinished");
t.sp_destory.node.active = !1;
t.sp_destory.node.opacity = 0;
}, this.sp_destory);
},
onOptionalTimeAni: function() {
"Animal_red" == this._optionalObj ? this.onRedBoardAni(!0) : "Animal_blue" == this._optionalObj && this.onBlueBoardAni(!0);
},
onRedBoardAni: function(e) {
if (e) {
var t = cc.scaleTo(.2, 1, 1), i = cc.delayTime(.2), n = this, o = cc.sequence(t, i, cc.callFunc(function() {
n.sp_white.node.scale = 0;
var e = cc.scaleTo(.2, 1, 1);
n.sp_red_time.node.runAction(e);
n._isCanOptional = !0;
n.openUpdate();
}, this, this.sp_white));
this.sp_white.node.runAction(o);
} else {
t = cc.scaleTo(.2, 1, 0), n = this, o = cc.sequence(t, cc.callFunc(function() {}, this, this.sp_red_time));
this.sp_red_time.node.runAction(o);
}
},
onBlueBoardAni: function(e) {
if (e) {
var t = cc.scaleTo(.2, 1, 1), i = cc.delayTime(.2), n = this, o = cc.sequence(t, i, cc.callFunc(function() {
n.sp_white.node.scale = 0;
var e = cc.scaleTo(.2, 1, 1);
n.sp_blue_time.node.runAction(e);
n._isCanOptional = !0;
n.openUpdate();
}, this, this.sp_white));
this.sp_white.node.runAction(o);
} else {
t = cc.scaleTo(.2, 1, 0), n = this, o = cc.sequence(t, cc.callFunc(function() {}, this, this.sp_blue_time));
this.sp_blue_time.node.runAction(o);
}
},
onWhiteBoardAni: function(e) {
var t = cc.scaleTo(.5, 1, 1), i = this;
var n = cc.sequence(t, cc.callFunc(function() {
i.sp_white.node.active = !1;
i.sp_white.node.opacity = 0;
i.sp_white.node.scaleY = 0;
console.log(" onFinishCallback onWhiteBoardAni ", e);
"red" == e ? i.onBlueBoardAni(!0) : i.onRedBoardAni(!0);
}, this, this.sp_white));
this.sp_white.node.runAction(n);
},
onSetOptionalTime: function() {
"Animal_blue" == this._optionalObj ? this.label_blue_time.string = this.count.toString() + "s" : this.label_red_time.string = this.count.toString() + "s";
},
onAddTip: function(e) {
console.log(" add------tip ", this._isShowTip);
this.label_tip.string = e;
this._isShowTip || this.onShowtip();
},
onShowtip: function() {
console.log(" onShowtip");
this._isShowTip = !0;
this.sp_tip.node.active = !0;
this.sp_tip.node.opacity = 255;
var e = cc.scaleTo(.2, 1);
var t = cc.delayTime(.8), i = cc.sequence(e, t, cc.callFunc(function() {
this.onHidetip();
}, this, this.sp_tip));
this.sp_tip.node.runAction(i);
},
onHidetip: function() {
var e = cc.scaleTo(.1, 0);
var t = cc.sequence(e, cc.callFunc(function() {
this.sp_tip.node.scale = 0;
this._isShowTip = !1;
}, this, this.sp_tip));
this.sp_tip.node.runAction(t);
},
onAddAlert: function(e, t, i) {
this.label_alert.string = e;
this.label_red_btn.string = t;
this.label_blue_btn.string = i;
this._isShowAlert || this.onShowAlert();
},
onShowAlert: function() {
this._isShowAlert = !0;
var e = cc.scaleTo(.2, 1);
var t = cc.delayTime(.8), i = cc.sequence(e, t, cc.callFunc(function() {}, this, this.sp_alert));
this.sp_alert.node.runAction(i);
},
onHideAlert: function() {
var e = cc.scaleTo(.1, 0);
var t = cc.sequence(e, cc.callFunc(function() {
this.sp_alert.node.scale = 0;
this._isShowAlert = !1;
}, this, this.sp_alert));
this.sp_alert.node.runAction(t);
},
onAddResultLayer: function() {
var e = this, t = cc.instantiate(this.result_prefab);
t.addComponent("GameResult");
t.setLocalZOrder(100);
t.parent = this.nodeResult;
t.x = 320;
t.y = 568;
t.getComponent("GameResult").onInitUI();
t.getComponent("GameResult").onSetGameResultInfo("fdsklf", function() {
e.onRestart();
});
}
});
cc._RF.pop();
}, {
Com: "Com",
RequestHandler: "RequestHandler",
onfire: "onfire"
} ],
Doushouqi_save: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "43581YZ2yRNnKXyzLVBRqCd", "Doushouqi_save");
var c = e("Com"), n = e("onfire"), o = e("RequestHandler"), h = e("config");
cc.Class({
extends: cc.Component,
properties: {
sp_head_red: {
default: null,
type: cc.Sprite
},
sp_head_blue: {
default: null,
type: cc.Sprite
},
node_table: {
default: null,
type: cc.Node
},
sp_tip: {
default: null,
type: cc.Sprite
},
label_tip: {
default: null,
type: cc.Label
},
sp_alert: {
default: null,
type: cc.Sprite
},
label_alert: {
default: null,
type: cc.Label
},
label_red_btn: {
default: null,
type: cc.Label
},
label_blue_btn: {
default: null,
type: cc.Label
},
node_dir: {
default: null,
type: cc.Node
},
sp_up: {
default: null,
type: cc.Animation
},
sp_down: {
default: null,
type: cc.Animation
},
sp_left: {
default: null,
type: cc.Animation
},
sp_right: {
default: null,
type: cc.Animation
},
sp_destory: {
default: null,
type: cc.Animation
},
sp_white: {
default: null,
type: cc.Sprite
},
sp_red_time: {
default: null,
type: cc.Sprite
},
sp_blue_time: {
default: null,
type: cc.Sprite
},
label_red_time: {
default: null,
type: cc.Label
},
label_blue_time: {
default: null,
type: cc.Label
},
nodeResult: {
default: null,
type: cc.Node
},
btn_help: {
default: null,
type: cc.Button
},
node_help: {
default: null,
type: cc.Node
},
myName: cc.Label,
otherName: cc.Label,
animal_blue_Prefab: cc.Prefab,
animal_red_Prefab: cc.Prefab,
animal_Prefab: cc.Prefab,
empty_prefab: cc.Prefab,
result_prefab: cc.Prefab,
defalutTiem: 30,
count: 30
},
onLoad: function() {
c.onLoadAudio();
c.deleteItem();
if (h.isNetwork) {
[ [ "gameData", this.onReceive_login, this ], [ "s_douShouQi_start", this.onReceive_start, this ], [ "s_douShouQi_move", this.onReceive_move, this ], [ "s_douShouQi_talk", this.onReceive_talk, this ], [ "s_douShouQi_animal", this.onReceive_animal, this ], [ "s_douShouQi_overGame", this.onReceive_overGame, this ], [ "s_douShouQi_qiuHeOther", this.onReceive_qiuHeOther, this ], [ "s_douShouQi_qiuHeAgreeOther", this.onReceive_qiuHeAgreeOther, this ] ].forEach(function(e) {
n.on(e[0], e[1], e[2]);
});
} else {
this.gameData = [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ];
this._doItUID = 1234567;
this._selfUID = 1234567;
this._otherUID = 7654321;
this.init();
this.initUI();
this.onOptionalTimeAni();
}
this.addButtonListener();
},
onDestroy: function() {
[ [ "gameData", this.onReceive_login, this ], [ "s_douShouQi_start", this.onReceive_start, this ], [ "s_douShouQi_move", this.onReceive_move, this ], [ "s_douShouQi_talk", this.onReceive_talk, this ], [ "s_douShouQi_animal", this.onReceive_animal, this ], [ "s_douShouQi_overGame", this.onReceive_overGame, this ], [ "s_douShouQi_qiuHeOther", this.onReceive_qiuHeOther, this ], [ "s_douShouQi_qiuHeAgreeOther", this.onReceive_qiuHeAgreeOther, this ] ].forEach(function(e) {
n.un(e[0]);
});
},
start: function() {},
onReceive_login: function(e, t) {
console.log(" onReceive_login ++++++++++++++++++++++++ Doushouqi ");
this.allData = e;
this.gameData = e.gameData;
this.myName.string = e.myUserInfo.name;
this.otherName.string = e.otherUserInfo.name;
this._selfUID = e.myUserInfo.uid;
this._otherUID = e.otherUserInfo.uid;
this._doItUID = e.s_douShouQi_doIt.doIt;
this.init();
this.initUI();
},
onReceive_start: function(e, t) {
console.log("***************c_doushouqi_play***************", e.success);
if (0 == e.success) {
this.openUpdate();
this.onOptionalTimeAni();
}
},
onReceive_animal: function(e, t) {
if (0 == e.success) {
var i = e.r, n = e.c, o = -1, s = e.s_douShouQi_doIt.doIt;
if (this._isFirst) {
this._isFirst = !1;
var r = 0;
r = e.animalIndex < 10 ? 1 : 2;
var a = {
firstUID: this._doItUID,
firstAnimal: r
};
c.setItem(a);
o = this._doItUID == this._selfUID ? this._selfUID : this._otherUID;
} else {
var l = c.getItem().firstAnimal;
o = c.getItem().firstUID == this._selfUID ? 1 == l ? e.animalIndex < 10 ? this._selfUID : this._otherUID : 10 < e.animalIndex ? this._selfUID : this._otherUID : 1 == l ? e.animalIndex < 10 ? this._otherUID : this._selfUID : 10 < e.animalIndex ? this._otherUID : this._selfUID;
}
this._doItUID = s;
this.tableNodes[i][n].animal.getComponent("Animal").playAnimation(this.onAnimaltionBreakCallback.bind(this), e.animalIndex, o);
}
},
onReceive_MyCode: function(e) {
console.log(" onReceive_MyCode ==== ", e.myCode);
this._myCode = e.myCode;
},
onReceive_move: function(e, t) {
if (0 == e.success) {
var i = e.r, n = e.c, o = e.moveR, s = e.moveC;
if (null != e.s_douShouQi_doIt) {
var r = e.s_douShouQi_doIt.doIt;
this._doItUID = r;
}
var a = {
x: this.allPos[o][s].x,
y: this.allPos[o][s].y
}, l = (this.allPos[i][n].x, this.allPos[i][n].y, {
targetPos: a,
selectedRow: i,
selectedCol: n,
row: o,
col: s,
winAnimalIdx: e.animalIndex
});
this.tableNodes[i][n].animal.getComponent("Animal").node.setLocalZOrder(99);
this.tableNodes[i][n].animal.getComponent("Animal").onMoveToTarget(l, this.onMoveCallbackDel.bind(this));
this.onCheckOptionSelf();
} else console.log("  success move errcode ", e.success);
},
onRecive_doIt: function(e, t) {},
onReceive_overGame: function(e, t) {
console.log("onReceive_overGame s ", e.youWin);
this.onResultCall = function() {
console.log(" onResultCall  === ");
c.deleteItem();
this.closeUpdate();
this.onAddResultLayer(e.youWin);
};
this.scheduleOnce(this.onResultCall, .5);
},
onReceive_qiuHeOther: function() {
this._alertStr = "qiuhe";
this.onAddAlert("对方求和,是否同意?");
},
onReceive_qiuHeAgreeOther: function() {
this.onAddTip("对方拒绝求和!");
},
onSendGameData: function(e, t) {
o.sendRequest(e, t);
},
onReceive_talk: function(e, t) {
e.success;
},
initUI: function() {
this.sp_tip.node.active = !0;
this.sp_tip.node.scale = 0;
this.sp_alert.node.active = !0;
this.sp_alert.node.scale = 0;
this.sp_destory.node.active = !1;
this.sp_destory.node.opacity = 0;
this.sp_white.node.active = !0;
this.sp_white.node.opacity = 255;
this.sp_red_time.node.active = !0;
this.sp_red_time.node.opacity = 255;
this.sp_red_time.node.scaleY = 0;
this.sp_blue_time.node.active = !0;
this.sp_blue_time.node.opacity = 255;
this.sp_blue_time.node.scaleY = 0;
this.onHideTipDir();
this.node_dir.setLocalZOrder(100);
this.sp_destory.node.setLocalZOrder(100);
},
init: function() {
this._blueAnimal = [];
this._redAnimal = [];
this._rand01 = -1;
this._blueSelf = !0;
this._pinkSelf = !1;
this._isShowTip = !1;
this._isShowAlert = !1;
this._isCanOptional = !1;
this._selectedPoint = [ -1, -1 ];
this._alertStr = "";
this._rand0Count = 0;
this._rand1Count = 0;
this._isFirst = !0;
this._firstAnimalIndex = -1;
this._helpNode = null;
this._selectedObj = {
row: -1,
col: -1,
count: 0
};
this._compareState = {
eq: 0,
gt: 1,
lt: 2,
same: 3
};
this.width = cc.winSize.width;
this.height = cc.winSize.height;
this.allPos = [ [ cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2 ], [ cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2 ], [ cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2 ], [ cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2 ] ];
this.allBtnEmpty = [ [ cc.Button, cc.Button, cc.Button, cc.Button ], [ cc.Button, cc.Button, cc.Button, cc.Button ], [ cc.Button, cc.Button, cc.Button, cc.Button ], [ cc.Button, cc.Button, cc.Button, cc.Button ] ];
for (var e = null, t = 0; t < 4; t++) for (var i = 0; i < 4; i++) {
e = this.node_table.getChildByName("node_pos_" + t.toString() + i.toString()).position;
this.allPos[t][i] = e;
}
this.tableNodes = [ [ {}, {}, {}, {} ], [ {}, {}, {}, {} ], [ {}, {}, {}, {} ], [ {}, {}, {}, {} ] ];
this.onInitTable();
},
addButtonListener: function() {
var t = this;
this.btn_help.node.on(cc.Node.EventType.TOUCH_START, function(e) {
console.log("TOUCH_START");
t.node_help.active = !0;
t.node_help.opacity = 255;
});
this.btn_help.node.on(cc.Node.EventType.TOUCH_END, function(e) {
t.node_help.active = !1;
t.node_help.opacity = 0;
});
},
onTouchListener: function(e, t) {
console.log(" customEventData ", t);
if ("back" == t) {
this.onAddTip("back-home");
this.onAddResultLayer(0);
} else if ("qiuhe" == t) {
this._alertStr = "qiuhe";
var i = {};
this.onSendGameData("c_douShouQi_qiuHe", i);
} else if ("renshu" == t) {
this._alertStr = "renshu";
this.onAddAlert("您确定认输吗?");
} else if ("btn_refuse" == t) {
if ("qiuhe" == this._alertStr) {
i = {
iDo: 1
};
this.onSendGameData("c_douShouQi_qiuHeAgree", i);
} else this._alertStr;
this.onHideAlert();
} else if ("btn_agree" == t) {
if ("qiuhe" == this._alertStr) {
i = {
iDo: 0
};
this.onSendGameData("c_douShouQi_qiuHeAgree", i);
} else if ("renshu" == this._alertStr) {
i = {};
this.onSendGameData("c_douShouQi_renShu", i);
}
this.onHideAlert();
}
},
onLoadHeadImg: function() {},
onInitTable: function() {
this.onDelRepeatRandBlue();
this.onDelRepeatRandPink();
for (var e = null, t = 0, i = 0; i < this.gameData.length; i++) for (var n = 0; n < this.gameData[i].length; n++) {
t = this.gameData[i][n];
(e = cc.instantiate(this.empty_prefab)).addComponent("BtnEmpty");
e.x = this.allPos[i][n].x;
e.y = this.allPos[i][n].y;
e.setLocalZOrder(0);
e.parent = this.node_table;
(this.allBtnEmpty[i][n] = e).getComponent("BtnEmpty").onSetRowAndCol(i, n);
e.getComponent("BtnEmpty").onSetTouchCallback(this.onEmptyTouchCallback.bind(this));
this.onCreateAnimal(i, n, t);
}
},
onCreateAnimal: function(e, t, i) {
if (-1 != i) {
var n = cc.instantiate(this.animal_Prefab);
n.addComponent("Animal");
n.getComponent("Animal").init();
n.x = this.allPos[e][t].x;
n.y = this.allPos[e][t].y;
n.active = !0;
n.opacity = 255;
n.setLocalZOrder(10);
n.parent = this.node_table;
console.log(" 创建动物： ", i);
0 == i || n.getComponent("Animal").onLoadAnimal(i);
this.tableNodes[e][t] = {
isDie: !1,
animal: n
};
n.getComponent("Animal").onSetRowAndCol(e, t);
n.getComponent("Animal").onBreakBombCallback(this.onBombTouchCallback.bind(this));
n.getComponent("Animal").onSetTouchCallback(this.onTouchCallback.bind(this));
} else this.tableNodes[e][t] = {
isDie: !0,
animal: null
};
},
onRandAnimal: function() {
var e = c.onRandomNum(0, 2);
8 == this._rand0Count ? e = 1 : 8 == this._rand1Count && (e = 0);
if (0 == e) {
this._rand0Count += 1;
return this._blueAnimal[this._rand0Count - 1];
}
this._rand1Count += 1;
return this._redAnimal[this._rand1Count - 1];
},
onDelRepeatRandBlue: function() {
for (var e = 0; e < 8; e++) {
var t = c.onRandomNum(1, 9);
this._blueAnimal.push(t);
for (var i = 0; i < e; i++) if (t == this._blueAnimal[i]) {
this._blueAnimal.splice(e, 1);
e--;
break;
}
}
},
onDelRepeatRandPink: function() {
for (var e = 0; e < 8; e++) {
var t = c.onRandomNum(11, 19);
this._redAnimal.push(t);
for (var i = 0; i < e; i++) if (t == this._redAnimal[i]) {
this._redAnimal.splice(e, 1);
e--;
break;
}
}
},
onTouchCallback: function(e, t, i, n) {
if (this.onIsSelfdoit()) if (this._doItUID == i && n) {
if (0 == this._selectedObj.count) {
this._selectedObj.count = 1;
this._selectedObj.row = e;
this._selectedObj.col = t;
this.tableNodes[e][t].animal.getComponent("Animal").onRunBig();
this.onCheckRoundMove(e, t, this.tableNodes[e][t].animal.getComponent("Animal"));
console.log("this._selectedObj.count == 0");
} else if (1 <= this._selectedObj.count) {
console.log("this._selectedObj.count >= 1");
this.tableNodes[this._selectedObj.row][this._selectedObj.col].animal.getComponent("Animal").onRunSmall();
this.onHideTipDir();
this._selectedObj.count = 0;
this._selectedObj.row = -1;
this._selectedObj.col = -1;
}
} else if (this.onIsSelfdoit() && !n) {
this._selectedObj.count = 0;
this._selectedObj.row = -1;
this._selectedObj.col = -1;
this.onHideTipDir();
} else {
if (!this.onCheckOptionalValid()) {
this.onAddTip("不可以操作其他玩家棋子");
return;
}
console.log(" else 913 ");
if (this.onClearAlgorithm(e, t) && this._doItUID != i) {
var o = this._selectedObj.row, s = this._selectedObj.col, r = {
x: this.allPos[e][t].x,
y: this.allPos[e][t].y
};
this.tableNodes[o][s].animal.getComponent("Animal").node.setLocalZOrder(99);
if (h.isNetwork) {
var a = {
r: o,
c: s,
moveR: e,
moveC: t
};
this.onSendGameData("c_douShouQi_move", a);
} else {
var l = onCheckCompare(e, t);
console.log("winAnimalIdx ==1118== ", l);
var c = {
targetPos: r,
selectedRow: o,
selectedCol: s,
row: e,
col: t,
winAnimalIdx: l
};
this.tableNodes[o][s].animal.getComponent("Animal").onMoveToTarget(c, this.onMoveCallbackDel.bind(this));
}
} else {
o = this._selectedObj.row, s = this._selectedObj.col;
this.tableNodes[o][s].animal.getComponent("Animal").onRunSmall();
this.onHideTipDir();
this._selectedObj.row = -1;
this._selectedObj.col = -1;
}
} else this.onAddTip("等待其他玩家操作完成");
},
onBombTouchCallback: function(e, t, i) {
console.log("onBombTouchCall", this.onIsSelfdoit());
if (this.onIsSelfdoit()) if (h.isNetwork) {
var n = {
r: e,
c: t
};
this.onSendGameData("c_douShouQi_animal", n);
} else {
var o = this.onRandAnimal();
this._doItUID = doItID;
var s = -1;
s = o < 10 ? this._selfUID : this._otherUID;
this.tableNodes[e][t].animal.getComponent("Animal").playAnimation(this.onAnimaltionBreakCallback.bind(this), o, s);
} else this.onAddTip("等待对方操作完成");
},
onAnimaltionBreakCallback: function(e, t) {
this.tableNodes[e][t].animal.active = !0;
this.tableNodes[e][t].animal.opacity = 255;
this.onCheckOptionSelf();
},
onEmptyTouchCallback: function(e, t) {
console.log("onEmptyTouchCallback", e, t);
if (this.onClearAlgorithm(e, t)) {
var i = {
r: this._selectedObj.row,
c: this._selectedObj.col,
moveR: e,
moveC: t
};
this.onSendGameData("c_douShouQi_move", i);
}
},
onMoveCallbackDel: function(e) {
var t = e.selectedRow, i = e.selectedCol, n = e.row, o = e.col, s = e.winAnimalIdx;
console.log("moveState == ", s);
if (-1 == s) {
if (this.tableNodes[n][o].isDie) {
c.onPlayGameEffect(1);
this.onMoveCallback(e);
return;
}
c.onPlayGameEffect(5);
this.onPlayDestoryAni(n, o);
this.tableNodes[n][o].animal.getComponent("Animal").onDestory();
this.tableNodes[t][i].animal.getComponent("Animal").onDestory();
this.tableNodes[n][o].isDie = !0;
this.tableNodes[t][i].isDie = !0;
} else {
if (this.tableNodes[n][o].isDie) {
c.onPlayGameEffect(1);
this.onMoveCallback(e);
return;
}
console.log(" row col ", this.tableNodes[n][o].animal.getComponent("Animal").onGetAnimalIndex());
console.log(" selected0 selected1 ", this.tableNodes[t][i].animal.getComponent("Animal").onGetAnimalIndex());
if (this.tableNodes[n][o].animal.getComponent("Animal").onGetAnimalIndex() == s) {
c.onPlayGameEffect(3);
this.tableNodes[t][i].isDie = !0;
this.tableNodes[n][o].isDie = !1;
this.onPlayDestoryAni(n, o);
this.tableNodes[t][i].animal.getComponent("Animal").onDestory();
} else if (this.tableNodes[t][i].animal.getComponent("Animal").onGetAnimalIndex() == s) {
c.onPlayGameEffect(4);
this.tableNodes[n][o].isDie = !0;
this.tableNodes[t][i].isDie = !1;
this.tableNodes[t][i].animal.getComponent("Animal").node.setLocalZOrder(1);
this.onPlayDestoryAni(n, o);
this.tableNodes[n][o].animal.getComponent("Animal").onDestory();
this.tableNodes[n][o].animal = this.tableNodes[t][i].animal;
this.tableNodes[n][o].isDie = this.tableNodes[t][i].isDie;
this.tableNodes[t][i].isDie = !0;
this.tableNodes[t][i].animal.getComponent("Animal").onSetRowAndCol(n, o);
}
}
},
onMoveCallback: function(e) {
console.log("移动完成");
var t = e.selectedRow, i = e.selectedCol, n = e.row, o = e.col, s = this.tableNodes[n][o].isDie;
if (this.tableNodes[t][i].isDie) console.log(" error 1374+++++ isDie true "); else {
this.tableNodes[n][o].animal = this.tableNodes[t][i].animal;
this.tableNodes[n][o].isDie = this.tableNodes[t][i].isDie;
this.tableNodes[t][i].isDie = s;
this.tableNodes[t][i].animal.getComponent("Animal").onSetRowAndCol(n, o);
}
},
onCheckOptionSelf: function() {
this.closeUpdate();
this.onSetOptionalTime();
this.onResetStatus();
this._selectedObj.row = -1;
this._selectedObj.col = -1;
this._selectedObj.count = 0;
if (this.onIsSelfdoit()) {
this.onRedBoardAni(!0);
this.onBlueBoardAni(!1);
} else if (!this.onIsSelfdoit()) {
this.onBlueBoardAni(!0);
this.onRedBoardAni(!1);
}
this.onHideTipDir();
this.onShowValidOptionalObj();
},
onIsSelfdoit: function() {
return this._selfUID == this._doItUID || this._selfUID == this._doItUID && void 0;
},
onClearAlgorithm: function(e, t) {
var i = this._selectedObj.row, n = this._selectedObj.col, o = !1;
o = e - 1 == i && t == n || (e + 1 == i && t == n || (e == i && t - 1 == n || e == i && t + 1 == n));
console.log("isClear ===== ", o);
return o;
},
onCheckCompare: function(e, t) {
var i = this._selectedObj.row, n = this._selectedObj.col, o = (this.tableNodes[e][t].animal.componentStr, 
this.tableNodes[i][n].animal.getComponent("Animal").onGetAnimalIndex()), s = this.tableNodes[e][t].animal.getComponent("Animal").onGetAnimalIndex(), r = -1;
if (8 == o && 1 == s) {
this._compareState.lt;
r = s;
} else if (1 == o && 8 == s) {
this._compareState.gt;
r = o;
} else if (o == s) {
this._compareState.eq;
r = -1;
} else if (s < o) {
this._compareState.gt;
r = o;
} else if (o < s) {
this._compareState.lt;
r = s;
}
return r;
},
onCheckAnimalSame: function(e, t) {
var i = !1, n = this._selectedObj.row, o = this._selectedObj.col;
if (this.tableNodes[e][t].animal.componentStr == this.tableNodes[n][o].animal.componentStr) {
this.tableNodes[n][o].animal.getComponent("Animal").onRunSmall();
this.tableNodes[e][t].animal.getComponent("Animal").onRunSmall();
this.onHideTipDir();
i = !0;
}
return i;
},
onCheckOptionalValid: function() {
var e = this._selectedObj.row, t = this._selectedObj.col;
return -1 != e || -1 != t;
},
onShowValidOptionalObj: function() {
for (var e = null, t = "", i = 0; i < this.tableNodes.length; i++) for (var n = 0; n < this.tableNodes[i].length; n++) if (!this.tableNodes[i][n].isDie) {
t = "Animal";
var o = (e = this.tableNodes[i][n].animal).getComponent(t).onGetAnimalCode();
this.onIsSelfdoit() ? e.getComponent(t).getAnimalIsBreak() ? this._selfUID == o ? e.getComponent(t).onShowSelfTip() : e.getComponent(t).onHideTip() : e.getComponent(t).onOptionalObj() : e.getComponent(t).onHideTip();
}
},
onResetStatus: function() {
for (var e = null, t = "", i = 0; i < this.tableNodes.length; i++) for (var n = 0; n < this.tableNodes[i].length; n++) if (!this.tableNodes[i][n].isDie) {
e = this.tableNodes[i][n].animal;
t = "Animal";
this._selfUID == e.getComponent(t).onGetAnimalCode() && e.getComponent(t).getAnimalIsBig() && e.getComponent(t).onRunSmall();
}
},
onClearTabel: function() {
for (var e = "", t = 0; t < this.tableNodes.length; t++) for (var i = 0; i < this.tableNodes[t].length; i++) if (!this.tableNodes[t][i].isDie) {
e = "Animal";
this.tableNodes[t][i].animal.getComponent(e).onDestory();
}
},
onRestart: function() {
this.onClearTabel();
this.init();
this.initUI();
this.openUpdate();
this.onOptionalTimeAni();
},
openUpdate: function() {
var e = this.defalutTiem;
this.schedule(this.onTimeDownCallback, 1, e, 0);
},
closeUpdate: function() {
console.log(" closeUpdate ********************** ");
this.unschedule(this.onTimeDownCallback);
this.count = 30;
this._isCanOptional = !1;
},
onTimeDownCallback: function() {
this.count -= 1;
this.count < 0 ? this.closeUpdate() : this.onSetOptionalTime();
},
onCanOptionalObj: function() {
return this._isCanOptional;
},
onCheckRoundMove: function(e, t, i) {
var n = {
up: !1,
down: !1,
left: !1,
right: !1
};
if (0 <= e - 1) {
this.onFindAnimalOfIndex(e - 1, t) && (n.up = !0);
}
if (e + 1 <= 3) {
this.onFindAnimalOfIndex(e + 1, t) && (n.down = !0);
}
if (0 <= t - 1) {
this.onFindAnimalOfIndex(e, t - 1) && (n.left = !0);
}
if (t + 1 <= 3) {
this.onFindAnimalOfIndex(e, t + 1) && (n.right = !0);
}
(e < 0 || t < 0 || 3 < e || 3 < t) && (n = {
up: !1,
down: !1,
left: !1,
right: !1
});
this.node_dir.x = this.tableNodes[e][t].animal.x;
this.node_dir.y = this.tableNodes[e][t].animal.y + 10;
this.onTipMoveDirection(n);
},
onFindAnimalOfIndex: function(e, t) {
var i = null, n = "", o = !1;
if (this.tableNodes[e][t].isDie) o = !0; else {
n = "Animal";
o = !!(i = this.tableNodes[e][t].animal).getComponent(n).getAnimalIsBreak() && (!this.onIsSelfdoit() || this._selfUID != i.getComponent(n).onGetAnimalCode());
}
return o;
},
onTipMoveDirection: function(e) {
e.up && this.onRepeatAction(this.sp_up, "up");
e.down && this.onRepeatAction(this.sp_down, "down");
e.left && this.onRepeatAction(this.sp_left, "left");
e.right && this.onRepeatAction(this.sp_right, "right");
},
onRepeatAction: function(e, t) {
e.node.active = !0;
e.node.opacity = 255;
var i = e.play(t);
i.wrapMode = cc.WrapMode.Loop;
i.repeatCount = Infinity;
},
onStopRepeatAction: function(e, t) {
e.node.active = !1;
e.node.opacity = 0;
e.stop(t);
},
onHideTipDir: function() {
this.onStopRepeatAction(this.sp_up, "up");
this.onStopRepeatAction(this.sp_down, "down");
this.onStopRepeatAction(this.sp_left, "left");
this.onStopRepeatAction(this.sp_right, "right");
},
onPlayDestoryAni: function(e, t) {
this.sp_destory.node.x = this.allPos[e][t].x;
this.sp_destory.node.y = this.allPos[e][t].y;
this.onDestoryAnimation();
},
onDestoryAnimation: function() {
this.sp_destory.node.active = !0;
this.sp_destory.node.opacity = 255;
var e = this.sp_destory.play("destory"), t = this;
e.on("finished", function() {
console.log("onFinished");
t.sp_destory.node.active = !1;
t.sp_destory.node.opacity = 0;
}, this.sp_destory);
},
onOptionalTimeAni: function() {
this.onIsSelfdoit() ? this.onRedBoardAni(!0) : this.onBlueBoardAni(!0);
},
onRedBoardAni: function(e) {
if (e) {
var t = cc.scaleTo(.2, 1, 1), i = cc.delayTime(.2), n = this, o = cc.sequence(t, i, cc.callFunc(function() {
n.sp_white.node.scale = 0;
var e = cc.scaleTo(.2, 1, 1);
n.sp_red_time.node.runAction(e);
n._isCanOptional = !0;
n.openUpdate();
}, this, this.sp_white));
this.sp_white.node.runAction(o);
} else {
t = cc.scaleTo(.2, 1, 0), n = this, o = cc.sequence(t, cc.callFunc(function() {}, this, this.sp_red_time));
this.sp_red_time.node.runAction(o);
}
},
onBlueBoardAni: function(e) {
if (e) {
var t = cc.scaleTo(.2, 1, 1), i = cc.delayTime(.2), n = this, o = cc.sequence(t, i, cc.callFunc(function() {
n.sp_white.node.scale = 0;
var e = cc.scaleTo(.2, 1, 1);
n.sp_blue_time.node.runAction(e);
n._isCanOptional = !0;
n.openUpdate();
}, this, this.sp_white));
this.sp_white.node.runAction(o);
} else {
t = cc.scaleTo(.2, 1, 0), n = this, o = cc.sequence(t, cc.callFunc(function() {}, this, this.sp_blue_time));
this.sp_blue_time.node.runAction(o);
}
},
onWhiteBoardAni: function(e) {
var t = cc.scaleTo(.5, 1, 1), i = this;
var n = cc.sequence(t, cc.callFunc(function() {
i.sp_white.node.active = !1;
i.sp_white.node.opacity = 0;
i.sp_white.node.scaleY = 0;
console.log(" onFinishCallback onWhiteBoardAni ", e);
"red" == e ? i.onBlueBoardAni(!0) : i.onRedBoardAni(!0);
}, this, this.sp_white));
this.sp_white.node.runAction(n);
},
onSetOptionalTime: function() {
this._doItUID != this._selfUID ? this.label_blue_time.string = this.count.toString() + "s" : this.label_red_time.string = this.count.toString() + "s";
},
onAddTip: function(e) {
this.label_tip.string = e;
this._isShowTip || this.onShowtip();
},
onShowtip: function() {
var e = this;
this._isShowTip = !0;
this.sp_tip.node.active = !0;
this.sp_tip.node.opacity = 255;
var t = cc.scaleTo(.2, 1);
var i = cc.delayTime(.8), n = cc.sequence(t, i, cc.callFunc(function() {
e.onHidetip();
}, this, this.sp_tip));
this.sp_tip.node.runAction(n);
},
onHidetip: function() {
var e = cc.scaleTo(.1, 0);
var t = cc.sequence(e, cc.callFunc(function() {
this.sp_tip.node.scale = 0;
this._isShowTip = !1;
}, this, this.sp_tip));
this.sp_tip.node.runAction(t);
},
onAddAlert: function(e) {
var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "拒绝", i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "同意";
this.label_alert.string = e;
this.label_red_btn.string = t;
this.label_blue_btn.string = i;
this._isShowAlert || this.onShowAlert();
},
onShowAlert: function() {
this._isShowAlert = !0;
var e = cc.scaleTo(.2, 1);
var t = cc.delayTime(.8), i = cc.sequence(e, t, cc.callFunc(function() {
console.log(" onActionFinishCall ");
}, this, this.sp_alert));
this.sp_alert.node.runAction(i);
},
onHideAlert: function() {
var e = cc.scaleTo(.1, 0), t = this;
var i = cc.sequence(e, cc.callFunc(function() {
t.sp_alert.node.scale = 0;
t._isShowAlert = !1;
t._alertStr = "";
}, this, this.sp_alert));
this.sp_alert.node.runAction(i);
},
onAddResultLayer: function(e) {
var t = cc.instantiate(this.result_prefab);
t.addComponent("GameResult");
t.setLocalZOrder(100);
t.parent = this.nodeResult;
t.x = 320;
t.y = 568;
t.getComponent("GameResult").onInitUI();
t.getComponent("GameResult").onSetGameResultInfo(e, function() {
console.log(" onCallback ");
});
}
});
cc._RF.pop();
}, {
Com: "Com",
RequestHandler: "RequestHandler",
config: "config",
onfire: "onfire"
} ],
Doushouqi: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f241fcnZhlAR5aR35LomT+L", "Doushouqi");
var c = e("Com"), n = e("onfire"), o = e("RequestHandler"), s = e("config");
cc.Class({
extends: cc.Component,
properties: {
sp_head_red: {
default: null,
type: cc.Sprite
},
sp_head_blue: {
default: null,
type: cc.Sprite
},
node_table: {
default: null,
type: cc.Node
},
sp_tip: {
default: null,
type: cc.Sprite
},
label_tip: {
default: null,
type: cc.Label
},
sp_alert: {
default: null,
type: cc.Sprite
},
label_alert: {
default: null,
type: cc.Label
},
label_red_btn: {
default: null,
type: cc.Label
},
label_blue_btn: {
default: null,
type: cc.Label
},
node_dir: {
default: null,
type: cc.Node
},
sp_up: {
default: null,
type: cc.Animation
},
sp_down: {
default: null,
type: cc.Animation
},
sp_left: {
default: null,
type: cc.Animation
},
sp_right: {
default: null,
type: cc.Animation
},
sp_destory: {
default: null,
type: cc.Animation
},
sp_white: {
default: null,
type: cc.Sprite
},
sp_red_time: {
default: null,
type: cc.Sprite
},
sp_blue_time: {
default: null,
type: cc.Sprite
},
label_red_time: {
default: null,
type: cc.Label
},
label_blue_time: {
default: null,
type: cc.Label
},
nodeResult: {
default: null,
type: cc.Node
},
btn_help: {
default: null,
type: cc.Button
},
node_help: {
default: null,
type: cc.Node
},
newPlayerNode: {
default: null,
type: cc.Node
},
sp_hand: {
default: null,
type: cc.Sprite
},
myName: cc.Label,
otherName: cc.Label,
animal_blue_Prefab: cc.Prefab,
animal_red_Prefab: cc.Prefab,
animal_Prefab: cc.Prefab,
empty_prefab: cc.Prefab,
result_prefab: cc.Prefab,
defalutTiem: 30,
count: 30
},
onLoad: function() {
c.onLoadAudio();
c.deleteItem();
this.onActiconHand();
if (s.isNetwork) {
[ [ "gameData", this.onReceive_login, this ], [ "s_douShouQi_start", this.onReceive_start, this ], [ "s_douShouQi_move", this.onReceive_move, this ], [ "s_douShouQi_talk", this.onReceive_talk, this ], [ "s_douShouQi_animal", this.onReceive_animal, this ], [ "s_douShouQi_overGame", this.onReceive_overGame, this ], [ "s_douShouQi_qiuHeOther", this.onReceive_qiuHeOther, this ], [ "s_douShouQi_qiuHeAgreeOther", this.onReceive_qiuHeAgreeOther, this ] ].forEach(function(e) {
n.on(e[0], e[1], e[2]);
});
} else {
this.init();
this.initUI();
this.onOptionalTimeAni();
}
this.addButtonListener();
},
onDestroy: function() {
[ [ "gameData", this.onReceive_login, this ], [ "s_douShouQi_start", this.onReceive_start, this ], [ "s_douShouQi_move", this.onReceive_move, this ], [ "s_douShouQi_talk", this.onReceive_talk, this ], [ "s_douShouQi_animal", this.onReceive_animal, this ], [ "s_douShouQi_overGame", this.onReceive_overGame, this ], [ "s_douShouQi_qiuHeOther", this.onReceive_qiuHeOther, this ], [ "s_douShouQi_qiuHeAgreeOther", this.onReceive_qiuHeAgreeOther, this ] ].forEach(function(e) {
n.un(e[0]);
});
},
start: function() {},
onReceive_login: function(e, t) {
console.log(" onReceive_login ++++++++++++++++++++++++ Doushouqi ");
this.allData = e;
this.gameData = e.gameData;
this.myName.string = e.myUserInfo.name;
this.otherName.string = e.otherUserInfo.name;
this._selfUID = e.myUserInfo.uid;
this._otherUID = e.otherUserInfo.uid;
this._doItUID = e.s_douShouQi_doIt.doIt;
this.init();
this.initUI();
},
onReceive_start: function(e, t) {
console.log("***************c_doushouqi_play***************", e.success);
if (0 == e.success) {
this.openUpdate();
this.onOptionalTimeAni();
this.onShowValidOptionalObj();
}
},
onReceive_animal: function(e, t) {
if (0 == e.success) {
var i = e.r, n = e.c, o = -1, s = e.s_douShouQi_doIt.doIt;
if (this._isFirst) {
this._isFirst = !1;
var r = 0;
r = e.animalIndex < 10 ? 1 : 2;
var a = {
firstUID: this._doItUID,
firstAnimal: r
};
c.setItem(a);
o = this._doItUID == this._selfUID ? this._selfUID : this._otherUID;
this.sp_hand.node.stopAllActions();
} else {
var l = c.getItem().firstAnimal;
o = c.getItem().firstUID == this._selfUID ? 1 == l ? e.animalIndex < 10 ? this._selfUID : this._otherUID : 10 < e.animalIndex ? this._selfUID : this._otherUID : 1 == l ? e.animalIndex < 10 ? this._otherUID : this._selfUID : 10 < e.animalIndex ? this._otherUID : this._selfUID;
}
this._doItUID = s;
this.tableNodes[i][n].animal.getComponent("Animal").playAnimation(this.onAnimaltionBreakCallback.bind(this), e.animalIndex, o);
}
},
onReceive_MyCode: function(e) {
console.log(" onReceive_MyCode ==== ", e.myCode);
this._myCode = e.myCode;
},
onReceive_move: function(e, t) {
if (0 == e.success) {
var i = e.r, n = e.c, o = e.moveR, s = e.moveC;
if (null != e.s_douShouQi_doIt) {
var r = e.s_douShouQi_doIt.doIt;
this._doItUID = r;
}
var a = {
x: this.allPos[o][s].x,
y: this.allPos[o][s].y
}, l = (this.allPos[i][n].x, this.allPos[i][n].y, {
targetPos: a,
selectedRow: i,
selectedCol: n,
row: o,
col: s,
winAnimalIdx: e.animalIndex
});
this.tableNodes[i][n].animal.getComponent("Animal").node.setLocalZOrder(99);
this.tableNodes[i][n].animal.getComponent("Animal").onMoveToTarget(l, this.onMoveCallbackDel.bind(this));
this.onCheckOptionSelf();
} else console.log("  success move errcode ", e.success);
},
onRecive_doIt: function(e, t) {},
onReceive_overGame: function(e, t) {
console.log("onReceive_overGame s ", e.youWin);
this.onResultCall = function() {
console.log(" onResultCall  === ");
c.deleteItem();
this.closeUpdate();
this.onAddResultLayer(e.youWin);
};
this.scheduleOnce(this.onResultCall, .5);
},
onReceive_qiuHeOther: function() {
this._alertStr = "qiuhe";
this.onAddAlert("对方求和,是否同意?");
},
onReceive_qiuHeAgreeOther: function() {
this.onAddTip("对方拒绝求和!");
},
onSendGameData: function(e, t) {
o.sendRequest(e, t);
},
onReceive_talk: function(e, t) {
e.success;
},
initUI: function() {
this.sp_tip.node.active = !0;
this.sp_tip.node.scale = 0;
this.sp_alert.node.active = !0;
this.sp_alert.node.scale = 0;
this.sp_destory.node.active = !1;
this.sp_destory.node.opacity = 0;
this.sp_white.node.active = !0;
this.sp_white.node.opacity = 255;
this.sp_red_time.node.active = !0;
this.sp_red_time.node.opacity = 255;
this.sp_red_time.node.scaleY = 0;
this.sp_blue_time.node.active = !0;
this.sp_blue_time.node.opacity = 255;
this.sp_blue_time.node.scaleY = 0;
this.onHideTipDir();
this.node_dir.setLocalZOrder(100);
this.sp_destory.node.setLocalZOrder(100);
},
init: function() {
this._blueAnimal = [];
this._redAnimal = [];
this._rand01 = -1;
this._blueSelf = !0;
this._pinkSelf = !1;
this._isShowTip = !1;
this._isShowAlert = !1;
this._isCanOptional = !1;
this._selectedPoint = [ -1, -1 ];
this._alertStr = "";
this._rand0Count = 0;
this._rand1Count = 0;
this._isFirst = !0;
this._firstAnimalIndex = -1;
this._helpNode = null;
this._selectedObj = {
row: -1,
col: -1,
count: 0
};
this._compareState = {
eq: 0,
gt: 1,
lt: 2,
same: 3
};
this.width = cc.winSize.width;
this.height = cc.winSize.height;
this.allPos = [ [ cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2 ], [ cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2 ], [ cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2 ], [ cc.Vec2, cc.Vec2, cc.Vec2, cc.Vec2 ] ];
this.allBtnEmpty = [ [ cc.Button, cc.Button, cc.Button, cc.Button ], [ cc.Button, cc.Button, cc.Button, cc.Button ], [ cc.Button, cc.Button, cc.Button, cc.Button ], [ cc.Button, cc.Button, cc.Button, cc.Button ] ];
for (var e = null, t = 0; t < 4; t++) for (var i = 0; i < 4; i++) {
e = this.node_table.getChildByName("node_pos_" + t.toString() + i.toString()).position;
this.allPos[t][i] = e;
}
this.tableNodes = [ [ {}, {}, {}, {} ], [ {}, {}, {}, {} ], [ {}, {}, {}, {} ], [ {}, {}, {}, {} ] ];
this.onInitTable();
},
addButtonListener: function() {
var t = this;
this.btn_help.node.on(cc.Node.EventType.TOUCH_START, function(e) {
console.log("TOUCH_START");
t.node_help.active = !0;
t.node_help.opacity = 255;
});
this.btn_help.node.on(cc.Node.EventType.TOUCH_END, function(e) {
t.node_help.active = !1;
t.node_help.opacity = 0;
});
},
onTouchListener: function(e, t) {
console.log(" customEventData ", t);
if ("back" == t) this.onAddTip("back-home"); else if ("qiuhe" == t) {
this._alertStr = "qiuhe";
var i = {};
this.onSendGameData("c_douShouQi_qiuHe", i);
} else if ("renshu" == t) {
this._alertStr = "renshu";
this.onAddAlert("您确定认输吗?");
} else if ("btn_refuse" == t) {
if ("qiuhe" == this._alertStr) {
i = {
iDo: 1
};
this.onSendGameData("c_douShouQi_qiuHeAgree", i);
} else this._alertStr;
this.onHideAlert();
} else if ("btn_agree" == t) {
if ("qiuhe" == this._alertStr) {
i = {
iDo: 0
};
this.onSendGameData("c_douShouQi_qiuHeAgree", i);
} else if ("renshu" == this._alertStr) {
i = {};
this.onSendGameData("c_douShouQi_renShu", i);
}
this.onHideAlert();
}
},
onLoadHeadImg: function() {},
onInitTable: function() {
this.onDelRepeatRandBlue();
this.onDelRepeatRandPink();
for (var e = null, t = 0, i = 0; i < this.gameData.length; i++) for (var n = 0; n < this.gameData[i].length; n++) {
t = this.gameData[i][n];
(e = cc.instantiate(this.empty_prefab)).addComponent("BtnEmpty");
e.x = this.allPos[i][n].x;
e.y = this.allPos[i][n].y;
e.setLocalZOrder(0);
e.parent = this.node_table;
(this.allBtnEmpty[i][n] = e).getComponent("BtnEmpty").onSetRowAndCol(i, n);
e.getComponent("BtnEmpty").onSetTouchCallback(this.onEmptyTouchCallback.bind(this));
this.onCreateAnimal(i, n, t);
}
},
onCreateAnimal: function(e, t, i) {
if (-1 != i) {
var n = cc.instantiate(this.animal_Prefab);
n.addComponent("Animal");
n.getComponent("Animal").init();
n.x = this.allPos[e][t].x;
n.y = this.allPos[e][t].y;
n.active = !0;
n.opacity = 255;
n.setLocalZOrder(10);
n.parent = this.node_table;
console.log(" 创建动物： ", i);
0 == i || n.getComponent("Animal").onLoadAnimal(i);
this.tableNodes[e][t] = {
isDie: !1,
animal: n
};
n.getComponent("Animal").onSetRowAndCol(e, t);
n.getComponent("Animal").onBreakBombCallback(this.onBombTouchCallback.bind(this));
n.getComponent("Animal").onSetTouchCallback(this.onTouchCallback.bind(this));
} else this.tableNodes[e][t] = {
isDie: !0,
animal: null
};
},
onRandAnimal: function() {
var e = c.onRandomNum(0, 2);
8 == this._rand0Count ? e = 1 : 8 == this._rand1Count && (e = 0);
if (0 == e) {
this._rand0Count += 1;
return this._blueAnimal[this._rand0Count - 1];
}
this._rand1Count += 1;
return this._redAnimal[this._rand1Count - 1];
},
onDelRepeatRandBlue: function() {
for (var e = 0; e < 8; e++) {
var t = c.onRandomNum(1, 9);
this._blueAnimal.push(t);
for (var i = 0; i < e; i++) if (t == this._blueAnimal[i]) {
this._blueAnimal.splice(e, 1);
e--;
break;
}
}
},
onDelRepeatRandPink: function() {
for (var e = 0; e < 8; e++) {
var t = c.onRandomNum(11, 19);
this._redAnimal.push(t);
for (var i = 0; i < e; i++) if (t == this._redAnimal[i]) {
this._redAnimal.splice(e, 1);
e--;
break;
}
}
},
onTouchCallback: function(e, t, i, n) {
if (this.onIsSelfdoit()) if (this._doItUID == i && n) {
if (0 == this._selectedObj.count) {
this._selectedObj.count = 1;
this._selectedObj.row = e;
this._selectedObj.col = t;
this.tableNodes[e][t].animal.getComponent("Animal").onRunBig();
this.onCheckRoundMove(e, t, this.tableNodes[e][t].animal.getComponent("Animal"));
console.log("this._selectedObj.count == 0");
} else if (1 <= this._selectedObj.count) {
console.log("this._selectedObj.count >= 1");
this.tableNodes[this._selectedObj.row][this._selectedObj.col].animal.getComponent("Animal").onRunSmall();
this.onHideTipDir();
this._selectedObj.count = 0;
this._selectedObj.row = -1;
this._selectedObj.col = -1;
}
} else if (this.onIsSelfdoit() && !n) {
this._selectedObj.count = 0;
this._selectedObj.row = -1;
this._selectedObj.col = -1;
this.onHideTipDir();
} else {
if (!this.onCheckOptionalValid()) {
this.onAddTip("不可以操作其他玩家棋子");
return;
}
console.log(" else 913 ");
if (this.onClearAlgorithm(e, t) && this._doItUID != i) {
var o = this._selectedObj.row, s = this._selectedObj.col;
this.allPos[e][t].x, this.allPos[e][t].y;
this.tableNodes[o][s].animal.getComponent("Animal").node.setLocalZOrder(99);
var r = {
r: o,
c: s,
moveR: e,
moveC: t
};
this.onSendGameData("c_douShouQi_move", r);
} else {
o = this._selectedObj.row, s = this._selectedObj.col;
this.tableNodes[o][s].animal.getComponent("Animal").onRunSmall();
this.onHideTipDir();
this._selectedObj.row = -1;
this._selectedObj.col = -1;
}
} else this.onAddTip("等待其他玩家操作完成");
},
onBombTouchCallback: function(e, t, i) {
console.log("onBombTouchCall", this.onIsSelfdoit());
if (this.onIsSelfdoit()) {
var n = {
r: e,
c: t
};
this.onSendGameData("c_douShouQi_animal", n);
} else this.onAddTip("等待对方操作完成");
},
onAnimaltionBreakCallback: function(e, t) {
this.tableNodes[e][t].animal.active = !0;
this.tableNodes[e][t].animal.opacity = 255;
this.onCheckOptionSelf();
},
onEmptyTouchCallback: function(e, t) {
console.log("onEmptyTouchCallback", e, t);
if (this.onClearAlgorithm(e, t)) {
var i = {
r: this._selectedObj.row,
c: this._selectedObj.col,
moveR: e,
moveC: t
};
this.onSendGameData("c_douShouQi_move", i);
}
},
onMoveCallbackDel: function(e) {
var t = e.selectedRow, i = e.selectedCol, n = e.row, o = e.col, s = e.winAnimalIdx;
console.log("moveState == ", s);
if (-1 == s) {
if (this.tableNodes[n][o].isDie) {
c.onPlayGameEffect(1);
this.onMoveCallback(e);
return;
}
c.onPlayGameEffect(5);
this.onPlayDestoryAni(n, o);
this.tableNodes[n][o].animal.getComponent("Animal").onDestory();
this.tableNodes[t][i].animal.getComponent("Animal").onDestory();
this.tableNodes[n][o].isDie = !0;
this.tableNodes[t][i].isDie = !0;
} else {
if (this.tableNodes[n][o].isDie) {
c.onPlayGameEffect(1);
this.onMoveCallback(e);
return;
}
console.log(" row col ", this.tableNodes[n][o].animal.getComponent("Animal").onGetAnimalIndex());
console.log(" selected0 selected1 ", this.tableNodes[t][i].animal.getComponent("Animal").onGetAnimalIndex());
if (this.tableNodes[n][o].animal.getComponent("Animal").onGetAnimalIndex() == s) {
c.onPlayGameEffect(3);
this.tableNodes[t][i].isDie = !0;
this.tableNodes[n][o].isDie = !1;
this.onPlayDestoryAni(n, o);
this.tableNodes[t][i].animal.getComponent("Animal").onDestory();
} else if (this.tableNodes[t][i].animal.getComponent("Animal").onGetAnimalIndex() == s) {
c.onPlayGameEffect(4);
this.tableNodes[n][o].isDie = !0;
this.tableNodes[t][i].isDie = !1;
this.tableNodes[t][i].animal.getComponent("Animal").node.setLocalZOrder(1);
this.onPlayDestoryAni(n, o);
this.tableNodes[n][o].animal.getComponent("Animal").onDestory();
this.tableNodes[n][o].animal = this.tableNodes[t][i].animal;
this.tableNodes[n][o].isDie = this.tableNodes[t][i].isDie;
this.tableNodes[t][i].isDie = !0;
this.tableNodes[t][i].animal.getComponent("Animal").onSetRowAndCol(n, o);
}
}
},
onMoveCallback: function(e) {
console.log("移动完成");
var t = e.selectedRow, i = e.selectedCol, n = e.row, o = e.col, s = this.tableNodes[n][o].isDie;
if (this.tableNodes[t][i].isDie) console.log(" error 1374+++++ isDie true "); else {
this.tableNodes[n][o].animal = this.tableNodes[t][i].animal;
this.tableNodes[n][o].isDie = this.tableNodes[t][i].isDie;
this.tableNodes[t][i].isDie = s;
this.tableNodes[t][i].animal.getComponent("Animal").onSetRowAndCol(n, o);
}
},
onCheckOptionSelf: function() {
this.closeUpdate();
this.onSetOptionalTime();
this.onResetStatus();
this._selectedObj.row = -1;
this._selectedObj.col = -1;
this._selectedObj.count = 0;
if (this.onIsSelfdoit()) {
this.onRedBoardAni(!0);
this.onBlueBoardAni(!1);
} else if (!this.onIsSelfdoit()) {
this.onBlueBoardAni(!0);
this.onRedBoardAni(!1);
}
this.onHideTipDir();
this.onShowValidOptionalObj();
},
onIsSelfdoit: function() {
return this._selfUID == this._doItUID || this._selfUID == this._doItUID && void 0;
},
onClearAlgorithm: function(e, t) {
var i = this._selectedObj.row, n = this._selectedObj.col, o = !1;
o = e - 1 == i && t == n || (e + 1 == i && t == n || (e == i && t - 1 == n || e == i && t + 1 == n));
console.log("isClear ===== ", o);
return o;
},
onCheckCompare: function(e, t) {
var i = this._selectedObj.row, n = this._selectedObj.col, o = (this.tableNodes[e][t].animal.componentStr, 
this.tableNodes[i][n].animal.getComponent("Animal").onGetAnimalIndex()), s = this.tableNodes[e][t].animal.getComponent("Animal").onGetAnimalIndex(), r = -1;
8 == o && 1 == s ? r = this._compareState.lt : 1 == o && 8 == s ? r = this._compareState.gt : o == s ? r = this._compareState.eq : s < o ? r = this._compareState.gt : o < s && (r = this._compareState.lt);
return r;
},
onCheckAnimalSame: function(e, t) {
var i = !1, n = this._selectedObj.row, o = this._selectedObj.col;
if (this.tableNodes[e][t].animal.componentStr == this.tableNodes[n][o].animal.componentStr) {
this.tableNodes[n][o].animal.getComponent("Animal").onRunSmall();
this.tableNodes[e][t].animal.getComponent("Animal").onRunSmall();
this.onHideTipDir();
i = !0;
}
return i;
},
onCheckOptionalValid: function() {
var e = this._selectedObj.row, t = this._selectedObj.col;
return -1 != e || -1 != t;
},
onShowValidOptionalObj: function() {
for (var e = null, t = "", i = 0; i < this.tableNodes.length; i++) for (var n = 0; n < this.tableNodes[i].length; n++) if (!this.tableNodes[i][n].isDie) {
t = "Animal";
var o = (e = this.tableNodes[i][n].animal).getComponent(t).onGetAnimalCode();
this.onIsSelfdoit() ? e.getComponent(t).getAnimalIsBreak() ? this._selfUID == o ? e.getComponent(t).onShowSelfTip() : e.getComponent(t).onHideTip() : e.getComponent(t).onOptionalObj() : e.getComponent(t).onHideTip();
}
},
onResetStatus: function() {
for (var e = null, t = "", i = 0; i < this.tableNodes.length; i++) for (var n = 0; n < this.tableNodes[i].length; n++) if (!this.tableNodes[i][n].isDie) {
e = this.tableNodes[i][n].animal;
t = "Animal";
this._selfUID == e.getComponent(t).onGetAnimalCode() && e.getComponent(t).getAnimalIsBig() && e.getComponent(t).onRunSmall();
}
},
onClearTabel: function() {
for (var e = "", t = 0; t < this.tableNodes.length; t++) for (var i = 0; i < this.tableNodes[t].length; i++) if (!this.tableNodes[t][i].isDie) {
e = "Animal";
this.tableNodes[t][i].animal.getComponent(e).onDestory();
}
},
onRestart: function() {
this.onClearTabel();
this.init();
this.initUI();
this.openUpdate();
this.onOptionalTimeAni();
},
openUpdate: function() {
var e = this.defalutTiem;
this.schedule(this.onTimeDownCallback, 1, e, 0);
},
closeUpdate: function() {
console.log(" closeUpdate ********************** ");
this.unschedule(this.onTimeDownCallback);
this.count = 30;
this._isCanOptional = !1;
},
onTimeDownCallback: function() {
this.count -= 1;
this.count < 0 ? this.closeUpdate() : this.onSetOptionalTime();
},
onCanOptionalObj: function() {
return this._isCanOptional;
},
onCheckRoundMove: function(e, t, i) {
var n = {
up: !1,
down: !1,
left: !1,
right: !1
};
if (0 <= e - 1) {
this.onFindAnimalOfIndex(e - 1, t) && (n.up = !0);
}
if (e + 1 <= 3) {
this.onFindAnimalOfIndex(e + 1, t) && (n.down = !0);
}
if (0 <= t - 1) {
this.onFindAnimalOfIndex(e, t - 1) && (n.left = !0);
}
if (t + 1 <= 3) {
this.onFindAnimalOfIndex(e, t + 1) && (n.right = !0);
}
(e < 0 || t < 0 || 3 < e || 3 < t) && (n = {
up: !1,
down: !1,
left: !1,
right: !1
});
this.node_dir.x = this.tableNodes[e][t].animal.x;
this.node_dir.y = this.tableNodes[e][t].animal.y + 10;
this.onTipMoveDirection(n);
},
onFindAnimalOfIndex: function(e, t) {
var i = null, n = "", o = !1;
if (this.tableNodes[e][t].isDie) o = !0; else {
n = "Animal";
o = !!(i = this.tableNodes[e][t].animal).getComponent(n).getAnimalIsBreak() && (!this.onIsSelfdoit() || this._selfUID != i.getComponent(n).onGetAnimalCode());
}
return o;
},
onTipMoveDirection: function(e) {
e.up && this.onRepeatAction(this.sp_up, "up");
e.down && this.onRepeatAction(this.sp_down, "down");
e.left && this.onRepeatAction(this.sp_left, "left");
e.right && this.onRepeatAction(this.sp_right, "right");
},
onRepeatAction: function(e, t) {
e.node.active = !0;
e.node.opacity = 255;
var i = e.play(t);
i.wrapMode = cc.WrapMode.Loop;
i.repeatCount = Infinity;
},
onStopRepeatAction: function(e, t) {
e.node.active = !1;
e.node.opacity = 0;
e.stop(t);
},
onHideTipDir: function() {
this.onStopRepeatAction(this.sp_up, "up");
this.onStopRepeatAction(this.sp_down, "down");
this.onStopRepeatAction(this.sp_left, "left");
this.onStopRepeatAction(this.sp_right, "right");
},
onPlayDestoryAni: function(e, t) {
this.sp_destory.node.x = this.allPos[e][t].x;
this.sp_destory.node.y = this.allPos[e][t].y;
this.onDestoryAnimation();
},
onDestoryAnimation: function() {
this.sp_destory.node.active = !0;
this.sp_destory.node.opacity = 255;
var e = this.sp_destory.play("destory"), t = this;
e.on("finished", function() {
console.log("onFinished");
t.sp_destory.node.active = !1;
t.sp_destory.node.opacity = 0;
}, this.sp_destory);
},
onOptionalTimeAni: function() {
this.onIsSelfdoit() ? this.onRedBoardAni(!0) : this.onBlueBoardAni(!0);
},
onRedBoardAni: function(e) {
if (e) {
var t = cc.scaleTo(.2, 1, 1), i = cc.delayTime(.2), n = this, o = cc.sequence(t, i, cc.callFunc(function() {
n.sp_white.node.scale = 0;
var e = cc.scaleTo(.2, 1, 1);
n.sp_red_time.node.runAction(e);
n._isCanOptional = !0;
n.openUpdate();
}, this, this.sp_white));
this.sp_white.node.runAction(o);
} else {
t = cc.scaleTo(.2, 1, 0), n = this, o = cc.sequence(t, cc.callFunc(function() {}, this, this.sp_red_time));
this.sp_red_time.node.runAction(o);
}
},
onBlueBoardAni: function(e) {
if (e) {
var t = cc.scaleTo(.2, 1, 1), i = cc.delayTime(.2), n = this, o = cc.sequence(t, i, cc.callFunc(function() {
n.sp_white.node.scale = 0;
var e = cc.scaleTo(.2, 1, 1);
n.sp_blue_time.node.runAction(e);
n._isCanOptional = !0;
n.openUpdate();
}, this, this.sp_white));
this.sp_white.node.runAction(o);
} else {
t = cc.scaleTo(.2, 1, 0), n = this, o = cc.sequence(t, cc.callFunc(function() {}, this, this.sp_blue_time));
this.sp_blue_time.node.runAction(o);
}
},
onWhiteBoardAni: function(e) {
var t = cc.scaleTo(.5, 1, 1), i = this;
var n = cc.sequence(t, cc.callFunc(function() {
i.sp_white.node.active = !1;
i.sp_white.node.opacity = 0;
i.sp_white.node.scaleY = 0;
console.log(" onFinishCallback onWhiteBoardAni ", e);
"red" == e ? i.onBlueBoardAni(!0) : i.onRedBoardAni(!0);
}, this, this.sp_white));
this.sp_white.node.runAction(n);
},
onSetOptionalTime: function() {
this._doItUID != this._selfUID ? this.label_blue_time.string = this.count.toString() + "s" : this.label_red_time.string = this.count.toString() + "s";
},
onNewPlayerGuid: function() {
if (this._doItUID == this._selfUID && this._isNewPlayer) {
this.newPlayerNode.active = !0;
this.newPlayerNode.opacity = 255;
this.onActiconHand();
} else {
this.newPlayerNode.active = !1;
this.newPlayerNode.opacity = 0;
}
},
onActiconHand: function() {
this.sp_hand.node.stopAllActions();
this.newPlayerNode.active = !0;
this.newPlayerNode.opacity = 255;
var e = cc.repeatForever(cc.sequence(cc.moveTo(.85, -50, -50), cc.moveTo(.5, 0, 0)));
this.sp_hand.node.runAction(e);
},
onAddTip: function(e) {
this.label_tip.string = e;
this._isShowTip || this.onShowtip();
},
onShowtip: function() {
var e = this;
this._isShowTip = !0;
this.sp_tip.node.active = !0;
this.sp_tip.node.opacity = 255;
var t = cc.scaleTo(.2, 1);
var i = cc.delayTime(.8), n = cc.sequence(t, i, cc.callFunc(function() {
e.onHidetip();
}, this, this.sp_tip));
this.sp_tip.node.runAction(n);
},
onHidetip: function() {
var e = cc.scaleTo(.1, 0);
var t = cc.sequence(e, cc.callFunc(function() {
this.sp_tip.node.scale = 0;
this._isShowTip = !1;
}, this, this.sp_tip));
this.sp_tip.node.runAction(t);
},
onAddAlert: function(e) {
var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "拒绝", i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "同意";
this.label_alert.string = e;
this.label_red_btn.string = t;
this.label_blue_btn.string = i;
this._isShowAlert || this.onShowAlert();
},
onShowAlert: function() {
this._isShowAlert = !0;
var e = cc.scaleTo(.2, 1);
var t = cc.delayTime(.8), i = cc.sequence(e, t, cc.callFunc(function() {
console.log(" onActionFinishCall ");
}, this, this.sp_alert));
this.sp_alert.node.runAction(i);
},
onHideAlert: function() {
var e = cc.scaleTo(.1, 0), t = this;
var i = cc.sequence(e, cc.callFunc(function() {
t.sp_alert.node.scale = 0;
t._isShowAlert = !1;
t._alertStr = "";
}, this, this.sp_alert));
this.sp_alert.node.runAction(i);
},
onAddResultLayer: function(e) {
var t = cc.instantiate(this.result_prefab);
t.addComponent("GameResult");
t.setLocalZOrder(100);
t.parent = this.nodeResult;
t.x = 320;
t.y = 568;
t.getComponent("GameResult").onInitUI();
t.getComponent("GameResult").onSetGameResultInfo(e, function() {
console.log(" onCallback ");
});
}
});
cc._RF.pop();
}, {
Com: "Com",
RequestHandler: "RequestHandler",
config: "config",
onfire: "onfire"
} ],
GameItem: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "9068bO428tN77g+q2B3Frio", "GameItem");
var n = e("HallData"), o = e("RequestHandler"), s = e("config");
cc.Class({
extends: cc.Component,
properties: {
labGameName: cc.Label,
labPeopleCount: cc.Label,
spGameIcon: cc.Sprite,
btnGame: cc.Layout,
itemData: null,
callback: null
},
onLoad: function() {},
onClick: function() {
console.log("---- 游戏ID：" + this.itemData.appId, this.itemData.appName);
if (s.isNetwork) {
var e = {
appId: this.itemData.appId
};
o.sendRequest("c_daTing_ready", e);
} else cc.director.loadScene(this.itemData.scene);
n.setCurGameInfo(this.itemData);
},
updateItem: function(e) {
this.itemData = e;
this.labGameName.string = this.itemData.appName;
this.labPeopleCount.string = this.itemData.people + "对在玩";
var i = this.spGameIcon.getComponent(cc.Sprite);
cc.loader.loadRes("gameIcon/" + this.itemData.icon, cc.SpriteFrame, function(e, t) {
i.spriteFrame = t;
});
}
});
cc._RF.pop();
}, {
HallData: "HallData",
RequestHandler: "RequestHandler",
config: "config"
} ],
GameResult: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "60035qRlWFH77OgHakXIS2/", "GameResult");
e("Tools");
cc.Class({
extends: cc.Component,
properties: {
nodeCom: {
default: null,
type: cc.Node
},
nodeYazhu: {
default: null,
type: cc.Node
},
labelState: {
default: null,
type: cc.Label
},
labelCom: {
default: null,
type: cc.Label
},
labelDiamond: {
default: null,
type: cc.Label
},
labelMyName: {
default: null,
type: cc.Label
},
labelOtherName: {
default: null,
type: cc.Label
},
spMyHead: {
default: null,
type: cc.Sprite
},
spMyHeadTop: {
default: null,
type: cc.Sprite
},
spOtherHead: {
default: null,
type: cc.Sprite
},
spMyGender: {
default: null,
type: cc.Sprite
},
spOtherGender: {
default: null,
type: cc.Sprite
},
sp_win: {
default: null,
type: cc.Sprite
},
sp_lose: {
default: null,
type: cc.Sprite
},
sp_game_state: {
default: null,
type: cc.Sprite
}
},
onLoad: function() {
console.log("onLoad GameResult");
this.spriteFrames = [];
},
update: function(e) {},
onInitUI: function() {
this._btnAgainCallback = null;
this._btnChangeGameCallback = null;
this._btnBackGameListCallback = null;
},
addTouchListener: function(e, t) {
"again" == t ? this._btnAgainCallback && this._btnAgainCallback() : "change" == t ? this._btnChangeGameCallback && this._btnChangeGameCallback() : "list" == t && this._btnBackGameListCallback && this._btnBackGameListCallback();
this.node.destroy();
},
onSetGameResultInfo: function(e, t, i, n) {
this._btnAgainCallback = t;
this._btnChangeGameCallback = i;
this._btnBackGameListCallback = n;
console.log(" 结算信息.............. ");
if (1 == e) {
console.log(" ===0 == ", this.spriteFrames.piaodai1);
this.sp_game_state.spriteFrame = this.spriteFrames.piaodai1;
this.labelState.string = "胜利";
var o = new cc.Color(247, 235, 49);
this.labelState.node.color = o;
} else if (0 == e) {
console.log(" ===0 == ", this.spriteFrames.piaodai2);
this.sp_game_state.spriteFrame = this.spriteFrames.piaodai2;
this.labelState.string = "平局";
this.labelState.node.color = new cc.Color(12, 125, 425);
} else if (-1 == e) {
console.log(" ===0 == ", this.spriteFrames.piaodai3);
this.sp_game_state.spriteFrame = this.spriteFrames.piaodai3;
this.labelState.string = "失败";
this.labelState.node.color = new cc.Color(255, 255, 255);
}
}
});
cc._RF.pop();
}, {
Tools: "Tools"
} ],
HallData: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "69749nCuKVKUJyJxh9RPap4", "HallData");
t.exports = {
userInfo: null,
gameList: null,
curGameInfo: null,
setUserInfo: function(e) {
this.userInfo = e;
},
getUserInfo: function(e) {
return this.userInfo;
},
setGameList: function(e) {
this.gameList = e;
},
getGameList: function(e) {
return this.gameList;
},
setCurGameInfo: function(e) {
this.curGameInfo = e;
},
getCurGameInfo: function(e) {
return this.curGameInfo;
}
};
cc._RF.pop();
}, {} ],
Hall: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6e23bJu+SNLZbqR+uMtcIEa", "Hall");
var o = e("onfire"), s = e("RequestHandler"), r = e("HallData"), n = e("config");
cc.Class({
extends: cc.Component,
properties: {
btnPk: cc.Button,
btnGame: cc.Button,
btnMeet: cc.Button,
pkLayer: cc.Node,
gameLayer: cc.Node,
meetLayer: cc.Node,
gameScrollContent: cc.Node
},
onLoad: function() {
var t = this, i = this;
console.log("------- onLoad");
o.on("hallData", function(e, t) {
i.setHallData(e);
o.un("hallData");
});
[ [ "s_daTing_myReady", "onReceive_myReady" ], [ "s_daTing_otherReady", "onReceive_otherReady" ], [ "hall_gameOver", "showGameOver" ] ].forEach(function(e) {
o.on(e[0], t[e[1]]);
});
n.isNetwork || i.setHallData({
gameInfoList: n.gameInfoList
});
},
onDestroy: function() {
[ [ "s_daTing_myReady", "onReceive_myReady" ], [ "s_daTing_otherReady", "onReceive_otherReady" ], [ "hall_gameOver", "showGameOver" ] ].forEach(function(e) {
o.un(e[0]);
});
},
onReceive_myReady: function(e, t) {
console.log("--onReceive_myReady");
if (0 == e.success) cc.director.loadScene("ready"); else {
console("s_daTing_myReady:success==", e.success);
cc.director.loadScene("ready");
}
},
onReceive_otherReady: function(e, t) {
console.log("--onReceive_otherReady");
var i = r.getCurGameInfo();
o.on("s_game_login", function(e, t) {
console.log("s_game_login=====", e);
console.log("------ login: ", i.scene);
cc.director.loadScene(i.scene, function() {
o.fire("gameData", e, t);
});
o.un("s_game_login");
});
var n = {
roomKey: e.roomKey,
myCode: e.myCode
};
s.sendRequest("c_game_login", n);
},
showGameOver: function(e, t) {
console.log("游戏结束：", e.youWin);
r.setCurGameInfo(null);
},
onChangeLayer: function(e, t) {
this.gameLayer.active = 1 == t;
this.pkLayer.active = 2 == t;
this.meetLayer.active = 3 == t;
},
setHallData: function(e) {
this.hallData = e;
r.setGameList(this.hallData.gameInfoList);
console.log(this.hallData.gameInfoList);
r.setUserInfo(this.hallData.userInfo);
this.updateGameLayer(this.hallData.gameInfoList);
},
updateGameLayer: function(a) {
console.log("---- updateGameLayer:", a);
this.gameScrollContent.height = 280 * Math.ceil(a.length / 3) + 20;
var l = this;
cc.loader.loadRes("prefabs/pb_game", function(e, t) {
if (e) cc.log("加载失败, 原因:" + e); else if (t instanceof cc.Prefab) for (var i = 0; i < a.length; i++) {
var n = a[i], o = 213 * (i % 3 + .5), s = -280 * Math.floor(i / 3) - 100, r = cc.instantiate(t);
r.setPosition(o, s);
l.gameScrollContent.addChild(r);
r.getComponent("GameItem").updateItem(n);
} else cc.log("类型不对！");
});
}
});
cc._RF.pop();
}, {
HallData: "HallData",
RequestHandler: "RequestHandler",
config: "config",
onfire: "onfire"
} ],
Help: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "09d4fj/AQBFMavH2lzNSu2X", "Help");
cc.Class({
extends: cc.Component,
properties: {
node_obj: {
default: null,
type: cc.Sprite
}
},
onLoad: function() {},
init: function() {
this.node_obj.node.active = !0;
this.node_obj.node.opacity = 255;
this.node_obj.scale = 1;
},
onShowHelp: function() {
var e = cc.scaleTo(.2, 1);
cc.delayTime(.8);
var t = cc.sequence(e, cc.callFunc(function() {
console.log("onActionFinishCall === ");
}, this, this.node_obj));
this.node_obj.node.runAction(t);
},
onHideHelp: function(e) {
var t = cc.scaleTo(.2, 0), i = this;
cc.delayTime(.8);
var n = cc.sequence(t, cc.callFunc(function() {
e && e();
i.node.destroy();
}, this, this.node_obj));
this.node_obj.node.runAction(n);
}
});
cc._RF.pop();
}, {} ],
HttpConnect: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "329a96FjdpKAaGSOQmtBak3", "HttpConnect");
var a = e("onfire"), l = e("ServerConfig"), c = e("HttpRequestDefine"), h = e("ProtoTest"), n = {
sendProtoRequest: function(e, t) {
var n = this, i = l.httpHost, o = c[e];
if (null != o) {
i += o.url;
console.info("url: ", i);
var s = h.encodeObject(e, t), r = this.createXMLHttpRequest();
r.open("POST", i, !0);
r.onreadystatechange = function() {
console.info("getStatusBack xmlHttp:", r);
var e = r.response;
console.info("getStatusBack response type:", r.responseType);
if (4 == r.readyState && e) {
console.info("response: ", e);
var t = n.str2bytes(e), i = h.decodeBuffer(o.responseProto, t);
console.info("getStatusBack responseData:", i);
a.fire(o.responseProto, i);
}
};
r.setRequestHeader("Access-Control-Allow-Origin", "*");
r.send(s);
} else console.error("sendProtoRequest failed, please check proto define in HttpRequestDefine");
},
createXMLHttpRequest: function() {
var t;
if (window.XMLHttpRequest) t = new XMLHttpRequest(); else if (window.ActiveXObject) try {
t = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
try {
t = new ActiveXObject("Microsoft.XMLHTTP");
} catch (e) {}
}
return t;
},
str2bytes: function(e) {
for (var t = [], i = 0, n = e.length; i < n; ++i) {
var o = 255 & e.charCodeAt(i);
t.push(o);
}
return t;
}
};
t.exports = n;
cc._RF.pop();
}, {
HttpRequestDefine: "HttpRequestDefine",
ProtoTest: "ProtoTest",
ServerConfig: "ServerConfig",
onfire: "onfire"
} ],
HttpRequestDefine: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "bbd585bDvtFqoX+Y2lz68q8", "HttpRequestDefine");
t.exports = {
WebHallWechatLoginRQ: {
url: "hall_login_wechat/login",
responseProto: "WebHallLoginRS"
},
WebHallMobileLoginRQ: {
url: "hall_login_mobile/login",
responseProto: "WebHallLoginRS"
},
WebHallTokenLoginRQ: {
url: "hall_login_token/login",
responseProto: "WebHallLoginRS"
},
WebHallAccountLoginRQ: {
url: "hall_login_account/login_pk",
responseProto: "WebHallLoginRS_PK"
},
CLWEBTokenLoginRQ: {
url: "user_hall/tokenlogin",
responseProto: "CLWEBLoginRS"
},
CLWEBVerificationCodeRQ: {
url: "user/verify",
responseProto: "CLWEBVerificationCodeRS"
}
};
cc._RF.pop();
}, {} ],
Lianliankan: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8de81hve5JM7rGVF7hB1k5E", "Lianliankan");
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, s = e("onfire"), o = e("RequestHandler"), r = e("config");
cc.Class({
extends: cc.Component,
properties: {
btnBack: cc.Button,
btnHelp: cc.Button,
myHead: cc.Sprite,
myName: cc.Label,
myProgress: cc.Label,
otherHead: cc.Sprite,
otherName: cc.Label,
otherProgress: cc.Label,
spGrid: cc.Node,
soundLose: cc.AudioSource,
soundPing: cc.AudioSource,
soundWin: cc.AudioSource,
soundFinish: cc.AudioSource,
soundNoFinish: cc.AudioSource,
spriteFrames: null,
gameData: Array,
imgNodeList: null,
touchCount: 0,
touchImgId_1: 0,
touchImgId_2: 0,
connectData: null,
checkFlag: 0,
animFramesList: null,
finishCount: 0
},
onLoad: function() {
var i = this;
if (!r.isNetwork) {
for (var n = [ 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7 ], e = 0; e < 69; e++) {
var t = Math.floor(69 * Math.random()), o = n[e];
n[e] = n[t];
n[t] = o;
}
this.gameData = n;
cc.loader.loadResDir("games/lianliankan/icon", cc.SpriteFrame, function(e, t) {
if (e) cc.log("加载失败, 原因:" + e); else {
i.spriteFrames = t;
console.log("-----  onload -- loadImg end");
i.initImage(t, n);
}
});
}
cc.loader.loadResDir("games/lianliankan/effect/", cc.SpriteFrame, function(e, t) {
console.log(t, t.length);
i.animFramesList = t;
});
[ [ "gameData", this.onReceive_login, this ], [ "s_lianLianKan_start", this.onReceive_start, this ], [ "s_lianLianKan_play", this.onReceive_play, this ], [ "s_lianLianKan_progress", this.onReceive_progress, this ], [ "s_lianLianKan_overGame", this.onReceive_overGame, this ] ].forEach(function(e) {
s.on(e[0], e[1], e[2]);
});
},
onDestroy: function() {
[ [ "gameData", this.onReceive_login, this ], [ "s_lianLianKan_start", this.onReceive_start, this ], [ "s_lianLianKan_play", this.onReceive_play, this ], [ "s_lianLianKan_progress", this.onReceive_progress, this ], [ "s_lianLianKan_overGame", this.onReceive_overGame, this ] ].forEach(function(e) {
s.un(e[0]);
});
},
onReceive_login: function(e, t) {
console.log(e, "undefined" == typeof e ? "undefined" : n(e));
console.log(e.gameData, n(e.gameData));
this.gameData = e.gameData;
var i = this;
cc.loader.loadResDir("games/lianliankan/icon", cc.SpriteFrame, function(e, t) {
if (e) cc.log("加载失败, 原因:" + e); else {
i.spriteFrames = t;
i.initImage(t, i.gameData);
}
});
this.myName.string = e.myUserInfo.name;
this.otherName.string = e.otherUserInfo.name;
this.onReceive_progress(e.s_lianLianKan_progress);
},
onReceive_start: function(e, t) {
console.log("--------s_lianLianKan_start--------");
},
onReceive_play: function(e, t) {
if (0 == e.success) {
this.imgNodeList[this.touchImgId_1].active = !1;
this.imgNodeList[this.touchImgId_2].active = !1;
this.runEffect(this.touchImgId_1, this.touchImgId_2, this.connectData);
this.gameData[this.touchImgId_2] = 0;
this.gameData[this.touchImgId_1] = 0;
}
},
onReceive_progress: function(e, t) {
this.myProgress.string = Math.floor(e.myProgress / 35 * 100) + "%";
this.otherProgress.string = Math.floor(e.otherProgress / 35 * 100) + "%";
},
onReceive_overGame: function(e, t) {
e.youWin < 0 ? this.soundLose.play() : 0 == e.youWin ? this.soundPing.play() : this.soundWin.play();
cc.director.loadScene("hall", function() {
s.fire("hall_gameOver", e, t);
});
},
initImage: function(t, i) {
var n = this;
this.imgNodeList = [];
for (var o = this, e = function(e) {
(r = new cc.Node("sprite" + e)).x = e % 7 * 76 + 38;
r.y = 76 * -Math.floor(e / 7) - 38;
n.spGrid.addChild(r);
r.addComponent(cc.Sprite).spriteFrame = t[i[e] - 1];
n.imgNodeList[e] = r;
r.addComponent(cc.Button).node.on("click", function() {
o.onClickImage({
target: this.imgNodeList[e]
}, e);
}, n);
}, s = 0; s < i.length; s++) {
var r;
e(s);
}
},
setImgEffect: function(e, t) {
if (t) {
this.imgNodeList[e].scale = 1;
this.imgNodeList[e].getComponent(cc.Sprite).spriteFrame = this.spriteFrames[this.gameData[e] - 1];
} else {
this.imgNodeList[e].scale = 1.2;
this.imgNodeList[e].getComponent(cc.Sprite).spriteFrame = this.spriteFrames[this.gameData[e] + 6];
}
},
createAnimation: function(e) {
var t = new cc.Node("effect_" + e);
t.scale = .6;
t.addComponent(cc.Sprite);
var i = t.addComponent(cc.Animation);
i.on("finished", this.onFinished, this);
var n = 3 * e, o = [ this.animFramesList[n - 1], this.animFramesList[n - 2], this.animFramesList[n - 3], this.animFramesList[n - 3] ], s = cc.AnimationClip.createWithSpriteFrames(o, 4);
s.name = "run";
i.addClip(s);
i.play("run").speed = 6;
return t;
},
createLine: function(e) {
for (var t = new cc.Node(), i = e.line, n = 0; n < i.length / 2; n++) {
var o = new cc.Node();
t.addChild(o);
var s = o.addComponent(cc.Sprite);
s.spriteFrame = this.animFramesList[21];
var r = 2 * n, a = 76 * i[r][0] + 38, l = 76 * -i[r][1] - 38, c = 76 * i[r + 1][0] + 38, h = 76 * -i[r + 1][1] - 38;
o.x = (a + c) / 2;
o.y = (l + h) / 2;
if (i[r][1] == i[r + 1][1]) {
o.rotation = 90;
s.node.height = Math.abs(a - c);
} else s.node.height = Math.abs(l - h);
console.log("---- :", o.height);
}
return t;
},
onFinished: function() {
console.log("onFinished");
this.spGrid.removeChildByTag(101);
},
runEffect: function(e, t, i) {
console.log("消除：", e, t);
var n = this.gameData[e];
if (0 != n) {
var o = new cc.Node();
this.spGrid.addChild(o, 1, 101);
var s = this.createAnimation(n), r = this.imgNodeList[e].getPosition();
console.log("position1:", r.x, r.y);
s.setPosition(r);
o.addChild(s);
var a = this.createAnimation(n), l = this.imgNodeList[t].getPosition();
a.setPosition(l);
o.addChild(a);
}
},
onClickImage: function(e, t) {
console.log(t, this.gameData[t]);
if ("btnBack" == t) this.onReceive_overGame({
youWin: -1
}); else if ("btnHelp" == t) ; else {
var i = e.target;
i.getComponent(cc.Sprite);
this.setImgEffect(t);
if (0 == this.touchCount) {
this.touchImgId_1 = t;
this.touchCount = 1;
} else if (1 == this.touchCount) {
this.touchCount = 0;
if ((this.touchImgId_2 = t) == this.touchImgId_1) this.setImgEffect(t, !0); else if (this.gameData[t] == this.gameData[this.touchImgId_1]) {
this.connectData = this.checkIsLink(this.touchImgId_1, t);
if (this.connectData.isConnect) {
console.log("几折：", this.connectData.count);
console.log("路线：", this.connectData.posList);
if (r.isNetwork) {
var n = {
imgId1: this.touchImgId_1,
imgId2: this.touchImgId_2
};
o.sendRequest("c_lianLianKan_play", n);
} else {
i.active = !1;
this.imgNodeList[this.touchImgId_1].active = !1;
this.runEffect(this.touchImgId_1, this.touchImgId_2, this.connectData);
this.gameData[this.touchImgId_2] = 0;
this.gameData[this.touchImgId_1] = 0;
this.finishCount = this.finishCount + 1;
this.onReceive_progress({
myProgress: this.finishCount,
otherProgress: 0
});
}
this.soundFinish.play();
} else {
this.setImgEffect(t, !0);
this.setImgEffect(this.touchImgId_1, !0);
this.soundNoFinish.play();
}
} else {
this.setImgEffect(t, !0);
this.setImgEffect(this.touchImgId_1, !0);
this.soundNoFinish.play();
}
}
}
},
checkIsLink: function(e, t) {
var i = Math.floor(e / 7), n = e % 7, o = Math.floor(t / 7), s = t % 7;
this.checkFlag = 0;
var r = this.checkLink_0(n, i, s, o);
if (r.isConnect) return r;
this.checkFlag = 1;
if ((r = this.checkLink_1(n, i, s, o)).isConnect) return r;
this.checkFlag = 2;
if ((r = this.checkLink_2(n, i, s, o)).isConnect) return r;
return {
isConnect: !1
};
},
checkLink_0: function(e, t, i, n) {
var o = {
isConnect: !1
};
if (e == i) {
o.count = 0;
o.posList = [];
if (t < n) for (var s = t; s <= n; s++) {
if (s != t && s != n && 0 != this.gameData[7 * s + e]) {
o.posList = [];
o.isConnect = !1;
break;
}
o.isConnect = !0;
o.posList.push([ e, s ]);
} else for (var r = t; n <= r; r--) {
if (r != t && r != n && 0 != this.gameData[7 * r + e]) {
o.posList = [];
o.isConnect = !1;
break;
}
o.isConnect = !0;
o.posList.push([ e, r ]);
}
if (this.checkFlag < 2 && 0 == e || 6 == e || o.isConnect) {
o.isConnect ? o.line = [ [ e, t ], [ i, n ] ] : 0 == e ? o.line = [ [ e, t, "left" ], [ i, n ], "left" ] : 6 == e && (o.line = [ [ e, t, "right" ], [ i, n, "right" ] ]);
o.isConnect = !0;
return o;
}
}
if (t == n) {
o.count = 0;
o.posList = [];
if (e < i) for (var a = e; a <= i; a++) {
if (a != e && a != i && 0 != this.gameData[7 * t + a]) {
o.posList = [];
o.isConnect = !1;
break;
}
o.isConnect = !0;
o.posList.push([ e, a ]);
} else for (var l = e; i <= l; l--) {
if (l != e && l != i && 0 != this.gameData[7 * t + l]) {
o.posList = [];
o.isConnect = !1;
break;
}
o.isConnect = !0;
o.posList.push([ e, l ]);
}
if (this.checkFlag < 2 && 0 == t || 9 == t || o.isConnect) {
o.isConnect ? o.line = [ [ e, t ], [ i, n ] ] : 0 == t ? o.line = [ [ e, t, "up" ], [ i, n ], "up" ] : 9 == t && (o.line = [ [ e, t, "down" ], [ i, n, "down" ] ]);
o.isConnect = !0;
return o;
}
}
return o;
},
checkLink_1: function(e, t, i, n) {
var o = {
isConnect: !1,
count: 1,
posList: []
};
if (0 == this.gameData[7 * n + e]) {
var s = this.checkLink_0(e, t, e, n);
if (s.isConnect) {
var r = this.checkLink_0(e, n, i, n);
if (r.isConnect) {
o.isConnect = !0;
s.posList.splice(s.posList.length - 1, 1);
o.posList = s.posList.concat(r.posList);
o.line = s.line.concat(r.line);
console.log("1折路线1：", o.posList);
return o;
}
}
}
if (0 == this.gameData[7 * t + i]) {
var a = this.checkLink_0(e, t, i, t);
if (a.isConnect) {
var l = this.checkLink_0(i, t, i, n);
if (l.isConnect) {
o.isConnect = !0;
a.posList.splice(a.posList.length - 1, 1);
o.posList = a.posList.concat(l.posList);
o.line = a.line.concat(l.line);
console.log("1折路线2：", o.posList);
return o;
}
}
}
return o;
},
checkLink_2: function(e, t, i, n) {
for (var o = {
isConnect: !1,
count: 2,
posList: []
}, s = t; 0 <= s; s--) if (s == t) o.posList.push([ e, t ]); else {
if (0 != this.gameData[7 * s + e]) {
o.posList = [];
break;
}
o.posList.push([ e, s ]);
if ((c = this.checkLink_1(e, s, i, n)).isConnect) {
o.isConnect = !0;
o.posList.splice(o.posList.length - 1, 1);
o.posList = o.posList.concat(c.posList);
o.line = [ [ e, t ], [ e, s ] ];
o.line = o.line.concat(c.line);
return o;
}
}
for (var r = t; r <= 9; r++) if (r == t) o.posList.push([ e, t ]); else {
if (0 != this.gameData[7 * r + e]) {
o.posList = [];
break;
}
o.posList.push([ e, r ]);
if ((c = this.checkLink_1(e, r, i, n)).isConnect) {
o.isConnect = !0;
o.posList.splice(o.posList.length - 1, 1);
o.posList = o.posList.concat(c.posList);
o.line = [ [ e, t ], [ e, r ] ];
o.line = o.line.concat(c.line);
return o;
}
}
for (var a = e; 0 <= a; a--) if (a == e) o.posList.push([ e, t ]); else {
if (0 != this.gameData[7 * t + a]) {
o.posList = [];
break;
}
o.posList.push([ a, t ]);
if ((c = this.checkLink_1(a, t, i, n)).isConnect) {
o.isConnect = !0;
o.posList.splice(o.posList.length - 1, 1);
o.posList = o.posList.concat(c.posList);
o.line = [ [ e, t ], [ a, t ] ];
o.line = o.line.concat(c.line);
return o;
}
}
for (var l = e; l <= 6; l++) if (l == e) o.posList.push([ e, t ]); else {
if (0 != this.gameData[7 * t + l]) {
o.posList = [];
break;
}
o.posList.push([ l, t ]);
var c;
if ((c = this.checkLink_1(l, t, i, n)).isConnect) {
o.isConnect = !0;
o.posList.splice(o.posList.length - 1, 1);
o.posList = o.posList.concat(c.posList);
o.line = [ [ e, t ], [ l, t ] ];
o.line = o.line.concat(c.line);
return o;
}
}
return o;
}
});
cc._RF.pop();
}, {
RequestHandler: "RequestHandler",
config: "config",
onfire: "onfire"
} ],
Lock: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f1532HSMpxFrq/6/23b09yA", "Lock");
var n = e("onfire"), o = e("RequestHandler"), s = e("config"), r = e("Tools");
cc.Class({
extends: cc.Component,
properties: {
ndReady: cc.Node,
ndReadyAni: cc.Node,
ndButtonBack: cc.Node,
ndButtonHelp: cc.Node,
ndHelp: cc.Node,
sprPKPortraitLeft: cc.Sprite,
sprPKPortraitRight: cc.Sprite,
ndPKGenderLeftMale: cc.Node,
ndPKGenderLeftFemale: cc.Node,
ndPKGenderRightMale: cc.Node,
ndPKGenderRightFemale: cc.Node,
lblPKNameLeft: cc.Label,
lblPKNameRight: cc.Label,
ndLock: cc.Node,
ndLockTextOpen: cc.Node,
ndLockTextLocked: cc.Node,
ndLockDot: cc.Node,
ndLockPointer: cc.Node,
lblLockRemaining: cc.Label,
lblLockOpRemaining: cc.Label,
ndPerfect: cc.Node,
ndExit: cc.Node,
ndExitOK: cc.Node,
ndExitCancel: cc.Node,
ndResultWin: cc.Node,
sprResultWinPortraitTop: cc.Sprite,
sprResultWinPortraitLeft: cc.Sprite,
sprResultWinPortraitRight: cc.Sprite,
ndResultWinGenderLeftMale: cc.Node,
ndResultWinGenderLeftFemale: cc.Node,
ndResultWinGenderRightMale: cc.Node,
ndResultWinGenderRightFemale: cc.Node,
lblResultWinNameLeft: cc.Label,
lblResultWinNameRight: cc.Label,
lblResultWinScore: cc.Label,
ndResultWinPlayAgain: cc.Node,
ndResultWinReturn: cc.Node,
ndResultFail: cc.Node,
sprResultFailPortraitTop: cc.Sprite,
sprResultFailPortraitLeft: cc.Sprite,
sprResultFailPortraitRight: cc.Sprite,
ndResultFailGenderLeftMale: cc.Node,
ndResultFailGenderLeftFemale: cc.Node,
ndResultFailGenderRightMale: cc.Node,
ndResultFailGenderRightFemale: cc.Node,
lblResultFailNameLeft: cc.Label,
lblResultFailNameRight: cc.Label,
lblResultFailScore: cc.Label,
ndResultFailPlayAgain: cc.Node,
ndResultFailReturn: cc.Node,
ndResultDraw: cc.Node,
sprResultDrawPortraitTop: cc.Sprite,
sprResultDrawPortraitLeft: cc.Sprite,
sprResultDrawPortraitRight: cc.Sprite,
ndResultDrawGenderLeftMale: cc.Node,
ndResultDrawGenderLeftFemale: cc.Node,
ndResultDrawGenderRightMale: cc.Node,
ndResultDrawGenderRightFemale: cc.Node,
lblResultDrawNameLeft: cc.Label,
lblResultDrawNameRight: cc.Label,
lblResultDrawScore: cc.Label,
ndResultDrawPlayAgain: cc.Node,
ndResultDrawReturn: cc.Node,
sndHit: cc.AudioSource,
sndMiss: cc.AudioSource,
sndWin: cc.AudioSource,
sndFail: cc.AudioSource,
sndDraw: cc.AudioSource,
sndCountdown: cc.AudioSource,
RUNNING_SPEED: 1.5,
SPEED_INC: .1,
MAX_SPEED: 3,
HIT_RANGE: 10,
HIT_OPEN: 1,
PERFECT_RANGE: 4,
PERFECT_OPEN: 2,
NEXT_LOCK_MIN: 45,
NEXT_LOCK_MAX: 120,
PENALTY_TIME: .5,
LOCK_COUNT_MIN: 45,
LOCK_COUNT_MAX: 60,
WIN_DELAY: 1,
SIM_OP_LOCK_R: .02,
LEVEL_STATUS_NOT_RUNNING: 0,
LEVEL_STATUS_RUNNING: 1,
LEVEL_STATUS_RESOLVE: 2,
LEVEL_STATUS_PENALTY: 3,
RESULT_DRAW: 0,
RESULT_WIN: 1,
RESULT_FAIL: -1,
HIT_TYPE_NORMAL: 1,
HIT_TYPE_PERFECT: 2,
randomSeed: 0,
currentSpeed: 0,
levelStatus: 0,
totalLock: 0,
remainLock: 0,
oRemainLock: 0
},
onLoad: function() {
if (s.isNetwork) {
[ [ "gameData", this.onReceive_GameLogin, this ], [ "s_kaiSuoDaRen_start", this.onReceive_GameStart, this ], [ "s_kaiSuoDaRen_progress", this.onReceive_UpdateProgress, this ], [ "s_kaiSuoDaRen_overGame", this.onReceive_Resolve, this ] ].forEach(function(e) {
n.on(e[0], e[1], e[2]);
});
} else {
this.resetSinglePlay();
this.initGame();
}
this.node.on(cc.Node.EventType.TOUCH_START, this.canvas_onTouchStart, this);
this.ndButtonBack.on(cc.Node.EventType.TOUCH_START, this.exitConfirm, this);
this.ndExitOK.on(cc.Node.EventType.TOUCH_END, this.exitGame, this);
this.ndExitCancel.on(cc.Node.EventType.TOUCH_END, function() {
this.ndExit.active = !1;
}, this);
this.ndButtonHelp.on(cc.Node.EventType.TOUCH_START, function() {
this.ndHelp.active = !0;
}, this);
this.ndButtonHelp.on(cc.Node.EventType.TOUCH_END, function() {
this.ndHelp.active = !1;
}, this);
this.ndButtonHelp.on(cc.Node.EventType.TOUCH_CANCEL, function() {
this.ndHelp.active = !1;
}, this);
this.ndResultWinPlayAgain.on(cc.Node.EventType.TOUCH_END, this.playAgain, this);
this.ndResultWinReturn.on(cc.Node.EventType.TOUCH_END, this.exitGame, this);
this.ndResultFailPlayAgain.on(cc.Node.EventType.TOUCH_END, this.playAgain, this);
this.ndResultFailReturn.on(cc.Node.EventType.TOUCH_END, this.exitGame, this);
this.ndResultDrawPlayAgain.on(cc.Node.EventType.TOUCH_END, this.playAgain, this);
this.ndResultDrawReturn.on(cc.Node.EventType.TOUCH_END, this.exitGame, this);
},
start: function() {
this.ndReadyAni.getComponent(cc.Animation).on("finished", function() {
this.ndReady.active = !1;
this.levelStatus = this.LEVEL_STATUS_RUNNING;
}, this);
},
update: function(e) {
switch (this.levelStatus) {
case this.LEVEL_STATUS_RUNNING:
this.ndLockPointer.rotation += this.currentSpeed;
360 < this.ndLockPointer.rotation && (this.ndLockPointer.rotation -= 360);
this.ndLockPointer.rotation < 0 && (this.ndLockPointer.rotation += 360);
this.simOpponent();
break;

case this.LEVEL_STATUS_PENALTY:
this.simOpponent();
}
},
simOpponent: function() {
if (!s.isNetwork && r.random() <= this.SIM_OP_LOCK_R) {
this.oRemainLock--;
this.lblLockOpRemaining.string = this.oRemainLock;
0 == this.oRemainLock && this.resolve(this.RESULT_FAIL);
}
},
exitConfirm: function() {
this.ndExit.active = !0;
},
exitGame: function() {
cc.director.end();
},
resetSinglePlay: function() {
this.totalLock = this.remainLock = parseInt(Math.random() * (this.LOCK_COUNT_MAX - this.LOCK_COUNT_MIN + 1) + this.LOCK_COUNT_MIN);
this.oRemainLock = this.remainLock;
this.randomSeed = 2147483647 * Math.random();
},
canvas_onTouchStart: function(e, t) {
if (!this.ndExit.active && !this.ndHelp.active) switch (this.levelStatus) {
case this.LEVEL_STATUS_RUNNING:
this.judgeHit();
}
},
initGame: function() {
this.lblLockRemaining.string = this.remainLock;
this.lblLockOpRemaining.string = this.oRemainLock;
this.currentSpeed = this.RUNNING_SPEED + this.SPEED_INC * (this.totalLock - this.remainLock);
this.ndLockDot.rotation = this.nextDotAngle(!0);
this.ndReady.active = !0;
this.ndReadyAni.active = !0;
this.ndReadyAni.getComponent(cc.Animation).play();
this.scheduleOnce(function() {
this.sndCountdown.play();
}, 1);
this.ndLock.getComponent(cc.Animation).play("reset");
this.ndLockPointer.rotation = 0;
},
nextDotAngle: function() {
var e = 0;
if (0 < arguments.length && void 0 !== arguments[0] && arguments[0]) {
e = r.random() * (this.NEXT_LOCK_MAX - this.NEXT_LOCK_MIN + 1) + this.NEXT_LOCK_MIN;
if (.5 < r.random()) {
e = 360 - e;
this.currentSpeed = -this.RUNNING_SPEED;
}
} else e = this.ndLockPointer.rotation + (0 < this.currentSpeed ? 1 : -1) * (r.random() * (this.NEXT_LOCK_MAX - this.NEXT_LOCK_MIN + 1) + this.NEXT_LOCK_MIN);
360 < e ? e -= 360 : e < 0 && (e += 360);
return e;
},
isHit: function(e) {
return Math.abs(this.ndLockDot.rotation - this.ndLockPointer.rotation) <= e || Math.abs(this.ndLockDot.rotation - 360 - this.ndLockPointer.rotation) <= e || Math.abs(this.ndLockDot.rotation - this.ndLockPointer.rotation + 360) <= e;
},
judgeHit: function() {
if (this.isHit(this.PERFECT_RANGE)) {
this.openLock(this.PERFECT_OPEN);
this.currentSpeed = -((0 < this.currentSpeed ? this.SPEED_INC : -this.SPEED_INC) + this.currentSpeed);
this.ndLockDot.rotation = this.nextDotAngle();
this.ndPerfect.active = !0;
var e = this.ndPerfect.getComponent(cc.Animation);
e.play();
e.on("finished", function() {
this.ndPerfect.active = !1;
}, this);
this.sndHit.play();
this.sendHit(this.HIT_TYPE_PERFECT);
} else if (this.isHit(this.HIT_RANGE)) {
this.openLock(this.HIT_OPEN);
this.currentSpeed = -((0 < this.currentSpeed ? this.SPEED_INC : -this.SPEED_INC) + this.currentSpeed);
this.ndLockDot.rotation = this.nextDotAngle();
this.sndHit.play();
this.sendHit(this.HIT_TYPE_NORMAL);
} else {
this.levelStatus = this.LEVEL_STATUS_PENALTY;
this.schedule(this.penaltyOver, this.PENALTY_TIME, 0);
this.ndLock.getComponent(cc.Animation).play("shake");
this.sndMiss.play();
}
},
penaltyOver: function() {
this.currentSpeed = -this.currentSpeed;
this.ndLockDot.rotation = this.nextDotAngle();
this.levelStatus = this.LEVEL_STATUS_RUNNING;
},
openLock: function(e) {
this.remainLock -= e;
this.remainLock < 0 && (this.remainLock = 0);
this.lblLockRemaining.string = this.remainLock;
if (0 == this.remainLock) {
this.ndLock.getComponent(cc.Animation).play("open");
this.sndMiss.play();
this.levelStatus = this.LEVEL_STATUS_RESOLVE;
s.isNetwork || this.scheduleOnce(function() {
this.resolve(this.RESULT_WIN);
}, this.WIN_DELAY);
}
},
resolve: function(e) {
console.log("resolve, result: " + e);
this.levelStatus = this.LEVEL_STATUS_RESOLVE;
this.ndExit.active = !1;
this.ndHelp.active = !1;
switch (e) {
case this.RESULT_WIN:
this.ndResultWin.active = !0;
this.sndWin.play();
break;

case this.RESULT_FAIL:
this.ndResultFail.active = !0;
this.sndFail.play();
break;

case this.RESULT_DRAW:
this.ndResultDraw.active = !0;
this.sndDraw.play();
}
},
playAgain: function() {
if (!s.isNetwork) {
this.ndResultWin.active = !1;
this.ndResultFail.active = !1;
this.ndResultDraw.active = !1;
this.resetSinglePlay();
this.initGame();
}
},
printUserInfo: function(e) {
console.log("uid: " + e.uid + "\nname: " + e.name + "\nsex: " + e.sex + "\nicon: " + e.icon + "\nmoney: " + e.money);
},
printLoginInfo: function(e) {
console.log("success: " + e.success + "\nmyUserInfo: ");
this.printUserInfo(e.myUserInfo);
console.log("otherUserInfo: ");
this.printUserInfo(e.otherUserInfo);
console.log("s_kaiSuoDaRen_progress: ");
this.printProgressInfo(e.s_kaiSuoDaRen_progress);
console.log("zhongZi: " + e.zhongZi);
},
printStartInfo: function(e) {
console.log("success: " + e.success);
},
printResolveInfo: function(e) {
console.log("youWin: " + e.youWin);
},
printProgressInfo: function(e) {
console.log("maxLock: " + e.maxLock + "\notherProgress: " + e.otherProgress + "\nmyProgress: " + e.myProgress);
},
onReceive_GameLogin: function(e, t) {
this.printLoginInfo(e);
if (0 == e.success) {
r.randomSeed = parseInt(2147483647 * e.zhongZi);
this.totalLock = e.s_kaiSuoDaRen_progress.maxLock;
this.remainLock = this.oRemainLock = this.totalLock;
} else console.log("Server login failed: " + e.success);
},
onReceive_GameStart: function(e, t) {
this.printStartInfo(e);
0 != e.success && console.log("Game start failed: " + e.success);
this.initGame();
},
onReceive_UpdateProgress: function(e, t) {
this.printProgressInfo(e);
this.oRemainLock = e.otherProgress;
this.lblLockOpRemaining.string = this.oRemainLock;
},
onReceive_Resolve: function(e, t) {
this.printResolveInfo(e);
this.resolve(e.youWin);
},
sendHit: function(e) {
if (s.isNetwork) {
var t = {
type: e
};
o.sendRequest("c_kaiSuoDaRen_play", t);
}
}
});
cc._RF.pop();
}, {
RequestHandler: "RequestHandler",
Tools: "Tools",
config: "config",
onfire: "onfire"
} ],
LoginByPhone: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "fc157Z4ZN9D4LM806QidRMu", "LoginByPhone");
e("ProtoTest");
var n = e("ServerConnect"), o = e("RequestHandler"), s = e("ResponseHandler"), r = e("MessageDefine"), a = (e("HttpConnect"), 
e("onfire")), l = e("config");
cc.Class({
extends: cc.Component,
properties: {
ebPhone: cc.EditBox,
btnCleanPhone: cc.Button,
ebEnterCode: cc.EditBox,
btnSendCode: cc.Button,
btnLogin: cc.Button,
btnRetry: cc.Button,
btnBack: cc.Button
},
onLoad: function() {
this.btnCleanPhone.node.active = !1;
this.btnRetry.node.active = !1;
this.btnLogin.interactable = !1;
this.btnSendCode.interactable = !1;
l.isNetwork && n.connect();
s.registerResponse("onopen", function(e, t) {
o.sendRequest(r.REQUEST_LOGIN, self.loginData);
}), s.registerResponse(r.RESPONSE_LOGIN, function(e, t) {
console.log("登陆回执:", e);
cc.director.loadScene("hall");
});
},
onClickBtnSendCode: function() {
console.log("发送验证码");
var e = {
phone: this.ebPhone.string
};
o.sendRequest("c_daTing_getPhoneCode", e);
this.runCountdown();
},
onClickBtnCleanPhone: function() {
console.log("onClickBtnCleanPhone");
this.ebPhone.string = "";
this.btnCleanPhone.node.active = !1;
this.btnSendCode.interactable = !1;
},
onTextChanged: function(e, t, i) {
0 == e.length ? this.btnCleanPhone.node.active = !1 : this.btnCleanPhone.node.active = !0;
this.isPoneAvailable(e) ? this.btnSendCode.interactable = !0 : this.btnSendCode.interactable = !1;
},
isPoneAvailable: function(e) {
return !!/^[1][3,4,5,7,8][0-9]{9}$/.test(e);
},
onTextDid: function(e, t, i) {
4 == e.length ? this.btnLogin.interactable = !0 : this.btnLogin.interactable = !1;
},
loginCallback: function(e) {
console.log("登录结果: " + JSON.stringify(e));
0 != e.result && console.log("登录失败！");
},
onClickBtnLogin: function() {
console.log("尝试登录...手机号：" + this.ebPhone.string + ", 验证码：" + this.ebEnterCode.string);
if (l.isNetwork) {
var e = {
phone: this.ebPhone.string,
phoneCode: this.ebEnterCode.string
};
o.sendRequest("c_daTing_login", e);
a.on("s_daTing_login", function(e, t) {
0 == e.success && cc.director.loadScene("hall", function() {
a.fire("hallData", e, t);
});
a.un("s_daTing_login");
});
} else cc.director.loadScene("hall");
},
runCountdown: function() {
this.btnSendCode.node.active = !1;
var e = 60;
this.btnRetry.node.active = !0;
var t = this.btnRetry.node.getChildByName("Label").getComponent(cc.Label);
t.string = "重试 " + e + "s";
var i = this;
this.btnSendCode.schedule(function() {
e -= 1;
t.string = "重试 " + e + "s";
if (e < 0) {
i.btnSendCode.node.active = !0;
i.btnRetry.node.active = !1;
}
}, 1, 61, 0);
},
onClickBtnBack: function() {
cc.director.loadScene("LoginScene");
}
});
cc._RF.pop();
}, {
HttpConnect: "HttpConnect",
MessageDefine: "MessageDefine",
ProtoTest: "ProtoTest",
RequestHandler: "RequestHandler",
ResponseHandler: "ResponseHandler",
ServerConnect: "ServerConnect",
config: "config",
onfire: "onfire"
} ],
LoginScene: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8240cE/b7JCtJliSoxC2Wdv", "LoginScene");
e("ProtoTest"), e("ServerConnect");
var n = e("RequestHandler"), o = e("ResponseHandler"), s = e("MessageDefine"), r = e("onfire");
cc.Class({
extends: cc.Component,
properties: {
btnWechar: cc.Button,
btnPhone: cc.Button,
btn_label: cc.Button
},
start: function() {},
onLoad: function() {
o.registerResponse(s.TEST_RESPONSE, function(e, t) {
console.log("this is a testEvent:", e, t);
});
},
button_test: function() {
n.sendRequest(s.TEST_REQUEST, {
playerID: 110
});
r.on(s.TEST_REQUEST, function(e, t) {
console.log("onfire:", e, t);
});
},
onClickedBtnWechar: function() {
console.log("点击微信");
this.button_test();
},
onClickedBtnPhone: function() {
console.log("点击手机");
cc.director.loadScene("LoginPhone");
},
onClickedBtnAgree: function() {
console.log("点击同意文字");
}
});
cc._RF.pop();
}, {
MessageDefine: "MessageDefine",
ProtoTest: "ProtoTest",
RequestHandler: "RequestHandler",
ResponseHandler: "ResponseHandler",
ServerConnect: "ServerConnect",
onfire: "onfire"
} ],
MessageDefine: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2d922ynlZhKSqyEE9r8ANWO", "MessageDefine");
t.exports = {
TEST_REQUEST: 1e3,
REQUEST_LOGIN: 1001,
TEST_RESPONSE: 2e3,
RESPONSE_LOGIN: 2001,
TEST_LOCAL: 3e3
};
cc._RF.pop();
}, {} ],
ProtoTest: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6bc2dRl3FFN9KdFKXRa76lK", "ProtoTest");
var n = e("protobuf").loadProto("\n\npackage ccc; \nmessage Login_C2S{\n    required int32 player_id = 1;\n    required string token     = 2;\n}\n// RQ 微信登录 hall_login_wechat/login\nmessage WebHallWechatLoginRQ {\n    required string code            = 1;    // 微信登录code\n    optional string appid           = 2;    // appid\n    optional uint32 client_type     = 3;    // 客户端类型\n    optional string spread_url      = 4;    // 渠道标识\n    optional string device_id       = 5;    // 设备ID\n    optional string platform        = 6;    // 请求来自的平台(如:pk)\n}\n\n// RQ 手机登录 hall_login_mobile/login\nmessage WebHallMobileLoginRQ {\n    required string mobile          = 1;    // 手机\n    required string identifying     = 2;    // 验证码\n    optional uint32 client_type     = 3;    // 客户端类型\n    optional string spread_url      = 4;    // 渠道标识\n    optional string device_id       = 5;    // 设备ID\n    optional string platform        = 6;    // 请求来自的平台(如:pk)\n}\nmessage WebHallTokenLoginRQ {\n    required string token           = 1;    // token\n    required string login_type      = 2;    // 登录类型    \n    optional uint32 client_type     = 3;    // 客户端类型\n}\nmessage WebHallAccountLoginRQ {\n    required string account         = 1;    // 账号\n    required string password        = 2;    // 密码    \n    optional uint32 client_type     = 3;    // 客户端类型\n}\nmessage WebHallLoginRS{\n    required uint32 result              = 1;   // 结果\n    required uint32 player_id           = 2;   // 用户id\n    required string token               = 3;   // token\n    required uint32 login_type          = 4;   // 1: 手机号登录 2: 微信登录 3: 渠道登陆 4. 账号登陆 5. token登陆\n    required bool   is_register         = 5;   // 1: 新注册     0: 非新注册\n    required string player_nick_name    = 6;   // 用户名\n    required uint32 server_version      = 7;   // 服务端版本\n    required string head_image          = 8;   // 头像url\n    required uint64 gold_num            = 9;   // 金币数\n    required uint32 diamond_num         = 10;  // 钻石数\n    required uint32 wisecard_num        = 11;  // 智卡数量\n    optional uint32 is_whitelist        = 12;  // 0: 普通用户 1: 6.7折白名单用户\n    optional bool   is_sign_login_award = 13;  // 是否已经签到\n}\nmessage WebHallLoginRS_PK{\n    required string result              = 1;   // 结果\n    required string player_id           = 2;   // 用户id\n    required string token               = 3;   // token\n    required string login_type          = 4;   // 1: 手机号登录 2: 微信登录 3: 渠道登陆 4. 账号登陆 5. token登陆\n    required bool   is_register         = 5;   // 1: 新注册     0: 非新注册\n    required string player_nick_name    = 6;   // 用户名\n    required string server_version      = 7;   // 服务端版本\n    required string head_image          = 8;   // 头像url\n    required string gold_num            = 9;   // 金币数\n    required string diamond_num         = 10;  // 钻石数\n    required string wisecard_num        = 11;  // 智卡数量\n    optional string is_whitelist        = 12;  // 0: 普通用户 1: 6.7折白名单用户\n    optional bool   is_sign_login_award = 13;  // 是否已经签到\n}\n// 手机获取验证码\nmessage CLWEBVerificationCodeRQ{\n\trequired string mobile = 1;\n}\n// 返回手机验证码\nmessage CLWEBVerificationCodeRS{\n\trequired uint32 result = 1;         // 0: 成功\n}\n\n").build("ccc");
t.exports.encodeObject = function(e, t) {
try {
return new n[e](t).encode().toBuffer();
} catch (e) {
console.log(e);
return new ArrayBuffer();
}
};
t.exports.decodeBuffer = function(e, t) {
try {
return n[e].decode(t);
} catch (e) {
console.log(e);
return {};
}
};
cc._RF.pop();
}, {
protobuf: "protobuf"
} ],
Ready: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "c317eS03PxPPrYr5wroGgIg", "Ready");
var o = e("onfire"), s = e("RequestHandler"), r = e("HallData");
cc.Class({
extends: cc.Component,
properties: {
bgSprite: cc.Node,
actionFrame: cc.SpriteFrame,
tipLabel: cc.Label,
myHead: cc.Sprite,
pkMyHead: cc.Sprite,
pkOtherHead: cc.Sprite,
btnCancel: cc.Button
},
onLoad: function() {
var t = this;
[ [ "s_daTing_otherReady", "onReceive_otherReady" ] ].forEach(function(e) {
o.on(e[0], t[e[1]]);
});
},
start: function() {
this.createReadyAction();
},
createReadyAction: function() {
this.stopReadyAction();
var a = new cc.Node(), e = a.addComponent(cc.Button), l = this;
this.bgSprite.addChild(a, 0, 1001);
e.schedule(function() {
var e = new cc.Node();
a.addChild(e);
e.addComponent(cc.Sprite).spriteFrame = l.actionFrame;
e.scale = .1;
var t = cc.scaleTo(3, 1), i = cc.fadeOut(3), n = cc.spawn(t, i), o = cc.callFunc(function() {
e.scale = .1;
e.opacity = 255;
}), s = cc.sequence(n, o), r = cc.repeatForever(s);
e.runAction(r);
}, 1, 3);
},
stopReadyAction: function() {
this.bgSprite.removeChildByTag(1001);
},
onClickBtnCancel: function() {
console.log("退出匹配功能，暂时没有和服务器定义接口。");
},
onReceive_otherReady: function(e, t) {
console.log("--onReceive_otherReady");
var i = r.getCurGameInfo();
o.on("s_game_login", function(e, t) {
console.log("s_game_login=====", e);
console.log("------ login: ", i.scene);
cc.director.loadScene(i.scene, function() {
o.fire("gameData", e, t);
});
o.un("s_game_login");
});
var n = {
roomKey: e.roomKey,
myCode: e.myCode
};
s.sendRequest("c_game_login", n);
}
});
cc._RF.pop();
}, {
HallData: "HallData",
RequestHandler: "RequestHandler",
onfire: "onfire"
} ],
RequestHandler: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "08528BoQ/dEbY7fvovRsCuQ", "RequestHandler");
var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = (e("onfire"), {
_serverConnect: e("ServerConnect"),
sendRequest: function(e, t) {
if (1 == this._serverConnect._sock.readyState) {
if ("object" == ("undefined" == typeof t ? "undefined" : s(t))) {
var i = {};
i.messageCode = e;
var n = JSON.stringify(t);
i.body = n;
i.md5 = "maybe later";
var o = JSON.stringify(i);
console.log("sendRequest requestString:", o);
this._serverConnect.send(o);
}
} else console.error("sendRequest failed");
}
});
t.exports = n;
cc._RF.pop();
}, {
ServerConnect: "ServerConnect",
onfire: "onfire"
} ],
ResponseHandler: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8e218gFrUdOQoJhaoodhiob", "ResponseHandler");
var n = e("onfire"), o = {
receiveResponse: function(e) {
console.log("receiveResponse obj:", e);
var t = JSON.parse(e.data);
n.fire(t.messageCode, JSON.parse(t.body));
},
registerResponse: function(e, t, i) {
return n.on(e.toString(), t, i);
},
unRegisterALLResponse: function(e) {
n.un(e.toString());
},
unRegisterResponse: function(e) {
n.un(e);
}
};
n.on("onmessage", function(e, t) {
o.receiveResponse(e, t);
});
t.exports = o;
cc._RF.pop();
}, {
onfire: "onfire"
} ],
ServerConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f3335bz1tBD5ZrfHnFkK6Yn", "ServerConfig");
t.exports = {
serverHost: "ws://192.168.1.53",
serverPort: 8477,
httpHost: "http://api.zyigame.com:8844/"
};
cc._RF.pop();
}, {} ],
ServerConnect: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "89f317pMThCPINuc3LkTIuH", "ServerConnect");
var n = e("onfire"), o = e("ServerConfig"), s = {
_sock: {},
connect: function() {
if (1 !== this._sock.readyState) {
this._sock = new WebSocket(o.serverHost + ":" + o.serverPort);
this._sock.onopen = this._onOpen.bind(this);
this._sock.onclose = this._onClose.bind(this);
this._sock.onmessage = this._onMessage.bind(this);
this._sock.onerror = this._onError.bind(this);
}
return this;
},
_onOpen: function() {
n.fire("onopen");
},
_onClose: function(e) {
n.fire("onclose", e);
},
_onMessage: function(e) {
n.fire("onmessage", e);
},
_onError: function(e) {
n.fire("onerror", e);
},
send: function(e) {
this._sock.send(e);
}
};
t.exports = s;
cc._RF.pop();
}, {
ServerConfig: "ServerConfig",
onfire: "onfire"
} ],
Tiaoyitiao: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "9bd4cdLl4xGK4ElNawA9hno", "Tiaoyitiao");
var f = e("config"), n = e("onfire"), p = e("tyt_ImgConfig"), o = e("Tools"), d = e("RequestHandler");
cc.Class({
extends: cc.Component,
properties: {
btnBack: cc.Button,
btnHelp: cc.Button,
tableNode: cc.Node,
spriteBg: cc.Node,
myScoreLabel: cc.Label,
myNameLabel: cc.Label,
myHead: cc.Sprite,
otherScoreLabel: cc.Label,
otherNameLabel: cc.Label,
otherHead: cc.Sprite,
timeLabel: cc.Label,
result_prefab: cc.Prefab,
spriteFrames: Array,
myProgressId: 0,
otherProgressId: 0,
myPersonNode: null,
otherPersonNode: null,
myLastPos: null,
otherLastPos: null,
sound_tv: cc.AudioSource,
sound_beer: cc.AudioSource,
sound_combo1: cc.AudioSource,
sound_combo2: cc.AudioSource,
sound_combo3: cc.AudioSource,
sound_combo4: cc.AudioSource,
sound_combo5: cc.AudioSource,
sound_combo6: cc.AudioSource,
sound_combo7: cc.AudioSource,
sound_combo8: cc.AudioSource,
sound_fail: cc.AudioSource,
sound_fire: cc.AudioSource,
sound_jilu: cc.AudioSource,
sound_jumpdown: cc.AudioSource,
sound_jumpup: cc.AudioSource,
sound_limitPress: cc.AudioSource,
sound_pressing: cc.AudioSource,
sound_reborn: cc.AudioSource,
sound_water: cc.AudioSource,
sound_music: cc.AudioSource,
time: null,
isMove: !1,
updateCount: null,
isJumping: null,
curJumpDistance: null,
posList: null,
maxJumpDistance: 0,
stepDistance: 0,
myTotalScore: 0,
myCurScore: 0,
myLastScore: 0,
otherTotalScore: 0,
extraScoreList: null
},
onLoad: function() {
this.stepDistance = Math.floor(this.maxJumpDistance / 50);
[ [ "gameData", this.onReceive_login, this ], [ "s_tiaoYiTiao_start", this.onReceive_start, this ], [ "s_tiaoYiTiao_play", this.onReceive_play, this ], [ "s_tiaoYiTiao_progress", this.onReceive_progress, this ], [ "s_tiaoYiTiao_overGame", this.onReceive_overGame, this ] ].forEach(function(e) {
n.on(e[0], e[1], e[2]);
});
if (!f.isNetwork) {
this.gameData = [];
for (var e = 0; e < 200; e++) if (0 == e) {
var t = [ 1006, 1009, 1011, 1022, 1016, 1014 ];
this.gameData[e] = {
nodeId: t[Math.floor(10 * Math.random() % t.length)],
direction: 10 * Math.random() < 5 ? 1 : 2,
distance: 350
};
} else if (e < 29) {
this.gameData[e] = {
nodeId: 1e3 + e + 1,
direction: 10 * Math.random() < 5 ? 1 : 2,
distance: 350
};
1 == e && (this.gameData[e].direction = 2);
} else this.gameData[e] = {
nodeId: 1e3 + Math.floor(100 * Math.random() % 29 + 1),
direction: 10 * Math.random() < 5 ? 1 : 2,
distance: 350
};
this.initGame();
this.startTime = new Date().getTime();
}
},
onDestroy: function() {
[ [ "gameData", this.onReceive_login, this ], [ "s_tiaoYiTiao_start", this.onReceive_start, this ], [ "s_tiaoYiTiao_play", this.onReceive_play, this ], [ "s_tiaoYiTiao_progress", this.onReceive_progress, this ], [ "s_tiaoYiTiao_overGame", this.onReceive_overGame, this ] ].forEach(function(e) {
n.un(e[0]);
});
},
initGame: function() {
this.time = 0;
var t = this;
this.posList = [];
o.loadResDir("games/tiaoyitiao", function(e) {
t.spriteFrames = e;
t.createNode(0);
t.createNode(1);
t.createPersonNode();
t.moveNodeToCenter(1);
});
this.registerTouchEvent();
this.updateTotalScore(this.myTotalScore, this.otherTotalScore);
},
onReceive_login: function(e, t) {
console.log(e);
this.gameData = e.gameData;
this.initGame();
},
onReceive_start: function(e, t) {
this.startTime = new Date().getTime();
},
onReceive_play: function(e, t) {},
onReceive_progress: function(e, t) {
0 < e.otherDistance && this.getJumpData(e.otherDistance, e.otherProgressId, !1);
this.updateTotalScore(null, e.otherScore);
},
onReceive_overGame: function(e, t) {
console.log("-------- s_tiaoYiTiao_overGame ------  ");
console.log(e);
var i = cc.instantiate(this.result_prefab);
i.addComponent("GameResult");
i.setLocalZOrder(100);
i.parent = this.nodeResult;
i.x = 320;
i.y = 568;
i.getComponent("GameResult").onInitUI();
},
update: function(e) {
if (this.startTime) {
var t = new Date().getTime(), i = Math.floor((t - this.startTime) / 1e3);
if (120 - i < 0) {
console.log("游戏结束！");
this.startTime = 0;
} else this.timeLabel.string = 120 - i + "s";
}
},
createNode: function(e, t) {
if (this.tableNode.getChildByTag(e)) t && t(); else {
var i = this, n = this.gameData[e], o = p[n.nodeId.toString()], s = new cc.Node();
s.addComponent(cc.Sprite).spriteFrame = this.spriteFrames[o.img1];
var r = new cc.Node();
r.addComponent(cc.Sprite).spriteFrame = this.spriteFrames[o.img2];
r.scale = o.scale;
r.setAnchorPoint(cc.p(.5, 0));
s.setPosition(o.pos);
r.addChild(s, 0, 1001);
this.tableNode.addChild(r, 1, e);
var a = this.calcPostion(e), l = cc.p(a.x - o.pos.x * o.scale, a.y - o.pos.y * o.scale);
r.setPosition(l);
var c = function(e) {
var t = new cc.Node();
t.addComponent(cc.Sprite).spriteFrame = i.spriteFrames[o.img3];
t.setPosition(o.shadowPos);
r.addChild(t, -10, 1003);
};
if (1 < e) {
r.setPosition(l.x, l.y + 100);
var h = cc.moveTo(.3, l), u = cc.callFunc(function() {
if (t) {
c();
t();
}
}), f = cc.sequence(h, u);
r.runAction(f);
} else c();
var d = new cc.Node();
d.addComponent(cc.Label).string = e + "," + n.nodeId;
d.x = a.x - 100;
d.y = a.y + 100;
this.tableNode.addChild(d);
}
},
createPersonNode: function() {
this.otherPersonNode = new cc.Node();
this.otherPersonNode.addComponent(cc.Sprite).spriteFrame = this.spriteFrames.xiaoren_blue;
this.otherPersonNode.setPosition(this.posList[0].x - 33, this.posList[0].y + 66);
this.tableNode.addChild(this.otherPersonNode, 3);
this.myPersonNode = new cc.Node();
this.myPersonNode.addComponent(cc.Sprite).spriteFrame = this.spriteFrames.xiaoren_red;
this.myPersonNode.setPosition(this.posList[0].x + 39, this.posList[0].y + 25);
this.tableNode.addChild(this.myPersonNode, 4);
this.myLastPos = this.myPersonNode.getPosition();
this.myLastPos.y = this.myLastPos.y - 52;
this.otherLastPos = this.otherPersonNode.getPosition();
this.otherLastPos.y = this.otherLastPos.y - 52;
},
calcPostion: function(e) {
if (0 == e) {
this.posList[0] = cc.p(300, 210);
return this.posList[0];
}
var t = this.gameData[e].distance, i = this.gameData[e].direction, n = Math.floor(t / 2), o = Math.floor(t / 2 * 1.73), s = this.posList[e - 1], r = cc.p(s.x + (2 == i ? 1 : -1) * o, s.y + n);
return this.posList[e] = r;
},
moveNodeToCenter: function(e) {
var t = cc.p(320, 350), i = this.posList[e - 1], n = this.posList[e], o = cc.p((i.x + n.x) / 2, (i.y + n.y) / 2), s = cc.p(t.x - o.x, t.y - o.y), r = cc.moveTo(.5, s);
this.tableNode.runAction(r);
},
registerTouchEvent: function() {
this.spriteBg.on("touchstart", function(e) {
console.log("-----------   began   ------------");
if (!this.isJumping) {
this.updateCount = 0;
this.isMove = !0;
this.tableNode.removeChildByTag(2002);
var t = this.createAnimationByName("anya", 1, 99);
t.setPosition(20, -10);
this.myPersonNode.addChild(t, 0, 101);
this.touchPress(!0);
}
}, this);
this.spriteBg.on("touchend", function(e) {
console.log("-----------   end   ------------", this.updateCount);
if (!this.isJumping) {
this.sound_jumpup.play();
this.isJumping = !0;
this.isMove = !1;
this.touchPress(!1);
this.setMidPoint();
this.myPersonNode.removeChildByTag(101);
this.runBoxEffect();
var t = this.stepDistance * this.updateCount;
this.getJumpData(t, this.myProgressId + 1, !0);
}
}, this);
},
touchPress: function(e) {
if (e) {
var t = this;
this.btnBack.schedule(function() {
t.updateCount = t.updateCount + 1;
t.updateBoxScaleY(t.updateCount);
50 == t.updateCount && t.sound_limitPress.play();
}, .02, 50, 0);
} else {
this.sound_limitPress.stop();
this.btnBack.unscheduleAllCallbacks();
}
},
playAnimationSound: function(e, t) {
"dianshi" == e ? this.sound_tv.play() : "anya" == e ? this.sound_pressing.play() : "luodi" == e ? this.sound_jumpdown.play() : "luoshui" == e && t ? this.sound_fail.play() : "maoyan" == e ? this.sound_fire.play() : "pijiupao" == e ? this.sound_beer.play() : "shuilifang" == e ? this.sound_water.play() : "zhongxindian" == e ? 2 == this.myCurScore ? this.sound_combo1.play() : 4 == this.myCurScore ? this.sound_combo2.play() : 6 == this.myCurScore ? this.sound_combo3.play() : 8 == this.myCurScore ? this.sound_combo4.play() : 10 == this.myCurScore ? this.sound_combo5.play() : 12 == this.myCurScore ? this.sound_combo6.play() : 14 == this.myCurScore ? this.sound_combo7.play() : 16 <= this.myCurScore && this.sound_combo8.play() : "yinyue" == e && this.sound_music.play();
},
createAnimationByName: function(e, t, i, n, o) {
this.playAnimationSound(e, o);
var s = new cc.Node(e);
s.addComponent(cc.Sprite).trim = !1;
var r = s.addComponent(cc.Animation);
r.on("finished", function() {
n && n(s);
}, this);
for (var a = 0, l = [], c = 0; c < 99; c++) {
var h = e + "_" + (c + 1);
if (!this.spriteFrames[h]) break;
a += 1;
l[c] = this.spriteFrames[h];
var u = l[c].getOriginalSize();
l[c].setRect(cc.rect(0, 0, u.width, u.height));
}
var f = cc.AnimationClip.createWithSpriteFrames(l, a);
f.name = "run";
r.addClip(f);
var d = r.play("run");
d.speed = t || 6;
d.repeatCount = 99 == i ? Infinity : i;
return s;
},
updateBoxScaleY: function(e) {
if (e <= 50) {
var t = this.tableNode.getChildByTag(this.myProgressId);
t.scaleY = t.scaleX - e / 200;
this.myPersonNode.scaleY = this.myPersonNode.scaleX - e / 200;
this.myPersonNode.y = this.myLastPos.y + 52 - this.tableNode.getChildByTag(this.myProgressId).height * e / 200;
}
},
runBoxEffect: function() {
var e = this.tableNode.getChildByTag(this.myProgressId), t = cc.scaleTo(.03, e.scaleX, e.scaleX + .04);
t.easing(cc.easeIn(3));
var i = cc.moveBy(.1, cc.p(0, 5)), n = cc.spawn(t, i), o = cc.scaleTo(.03, e.scaleX), s = cc.spawn(i.reverse(), o), r = (cc.rotateBy(.1, 1), 
cc.sequence(n, s));
e.runAction(r);
},
getJumpData: function(e, t, i) {
var n = this.gameData[t];
console.log("计算距离：", e, n.distance);
var o, s, r = this.posList[t - 1];
if (Math.abs(e - n.distance) <= 2 * this.stepDistance) {
o = this.posList[t];
s = !0;
} else {
s = !1;
var a = Math.floor(e / 2), l = Math.floor(e / 2 * 1.73);
o = cc.p(r.x + (1 == n.direction ? -l : l), r.y + a);
}
var c, h = p[n.nodeId.toString()];
c = 2 * Math.abs(e - n.distance) < h["distance" + n.direction] * h.scale ? {
success: 0,
nextId: t
} : {
success: 1,
nextId: t
};
this.jumpEffect(i ? this.myLastPos : this.otherLastPos, o, i, n.direction, c);
if (i) {
this.calcScore(c.success, s);
if (f.isNetwork) {
var u = {
progressId: t,
score: this.myCurScore,
distance: e
};
d.sendRequest("c_tiaoYiTiao_play", u);
}
}
},
calcScore: function(e, t) {
if (0 == e) {
t ? this.myLastScore < 2 ? this.myCurScore = 2 : this.myCurScore = this.myLastScore + 2 : this.myCurScore = 1;
this.myLastScore = this.myCurScore;
this.myTotalScore = this.myTotalScore + this.myCurScore;
} else {
this.myCurScore = 0;
this.myLastScore = 0;
}
},
jumpEffect: function(e, t, i, n, o) {
var s = 1 == i ? this.myPersonNode : this.otherPersonNode;
s.setPosition(e);
var r = cc.scaleTo(.1, 1, 1.2), a = cc.scaleTo(.1, 1);
(_ = cc.sequence(r, a)).easing(cc.easeOut(1.5));
s.runAction(_);
var l = cc.p(e.x, e.y + 52), c = cc.p(t.x, t.y + 52), h = cc.p((l.x + c.x) / 2, l.y + 600), u = [ l, h, c ], f = cc.bezierTo(.4, u), d = cc.rotateBy(.4, 2 == n ? 360 : -360), p = cc.spawn(f, d);
p.easing(cc.easeOut(1.5));
var m = this, g = cc.callFunc(function() {
m.checkJumpSuccess(t, i, o);
}), _ = cc.sequence(p, g);
s.runAction(_);
this.drawBezier(e, t, h);
},
checkJumpSuccess: function(i, e, t) {
console.log("----- checkJumpSuccess:", t);
if (0 == t.success) if (e) {
this.myLastPos = i;
this.isJumping = !1;
this.myProgressId = t.nextId;
this.runAddScoreAction(this.myTotalScore, this.myCurScore);
var n = this;
this.createNode(t.nextId + 1, function() {
if (2 <= n.myCurScore) {
n.setMidPoint(n.myProgressId + 1);
var e = n.createAnimationByName("zhongxindian", 2, 1, function(e) {
e.removeFromParent();
});
e.setPosition(i);
n.tableNode.addChild(e, 1, 102);
} else {
var t = n.createAnimationByName("luodi", 2, 1, function(e) {
e.removeFromParent();
});
t.setPosition(i);
n.tableNode.addChild(t, 1, 103);
}
});
this.moveNodeToCenter(this.myProgressId + 1);
this.addExtraScore();
} else {
this.createNode(t.nextId + 1);
this.otherLastPos = i;
this.otherProgressId = t.nextId;
} else {
this.setMidPoint();
this.runLostAction(e, i);
}
},
addExtraScore: function() {
var i = p[this.gameData[this.myProgressId].nodeId.toString()];
if (i.effect) {
var e = new cc.Node(), t = cc.delayTime(2), n = this, o = cc.callFunc(function() {
n.myTotalScore = n.myTotalScore + i.score;
n.runAddScoreAction(n.myTotalScore, i.score);
var e = n.createAnimationByName(i.effect, 1, 1, function(e) {
e.removeFromParent();
});
e.setPosition(i.effectPos);
n.tableNode.getChildByTag(n.myProgressId).addChild(e);
var t = {
progressId: n.myProgressId,
score: i.score,
distance: 0
};
d.sendRequest("c_tiaoYiTiao_play", t);
}), s = cc.sequence(t, o);
e.runAction(s);
this.tableNode.addChild(e, 0, 2002);
}
},
updateTotalScore: function(e, t) {
e && (this.myScoreLabel.string = e);
t && (this.otherScoreLabel.string = t);
},
runAddScoreAction: function(e, t) {
this.updateTotalScore(e);
var i = new cc.Node();
i.addComponent(cc.Label).string = "+" + t;
i.x = this.myPersonNode.x - 50;
i.y = this.myPersonNode.y + 100;
this.tableNode.addChild(i);
var n = cc.moveBy(.4, cc.p(0, 50)), o = cc.sequence(n, cc.removeSelf());
i.runAction(o);
},
runLostAction: function(n, e) {
var o = n ? this.myPersonNode : this.otherPersonNode, t = n ? this.myProgressId : this.otherProgressId, s = o.getLocalZOrder();
(e.y > this.posList[t + 1].y || e.y < (this.posList[t].y + this.posList[t + 1].y) / 2) && o.setLocalZOrder(0);
var i = cc.moveBy(.2, cc.p(0, -80)), r = this, a = cc.callFunc(function() {
n ? o.setPosition(r.myLastPos.x, r.myLastPos.y + 52) : o.setPosition(r.otherLastPos.x, r.otherLastPos.y + 52);
o.setLocalZOrder(s);
var e = cc.blink(.3, 2), t = cc.callFunc(function() {
r.isJumping = !1;
}), i = cc.sequence(e, t);
o.runAction(i);
}), l = cc.delayTime(.3), c = cc.sequence(i, l, cc.delayTime(.1), a);
o.runAction(c);
var h = this.createAnimationByName("luoshui", 2, 1, function(e) {
e.removeFromParent();
}, n);
h.setPosition(e);
this.tableNode.addChild(h, 0, 104);
},
setMidPoint: function(e) {
if (e) {
var t = new cc.Node();
t.addComponent(cc.Sprite).spriteFrame = this.spriteFrames.zhongxindian;
t.setPosition(this.posList[e]);
this.tableNode.addChild(t, 1, 2001);
} else this.tableNode.getChildByTag(2001) && this.tableNode.removeChildByTag(2001);
},
drawBezier: function(e, t, i) {
if (!this.drawNode) {
this.drawNode = new cc.Node();
this.tableNode.addChild(this.drawNode, 2);
this.draw = this.drawNode.addComponent(cc.Graphics);
}
this.draw.clear();
this.draw.moveTo(e.x, e.y);
this.draw.quadraticCurveTo(i.x, i.y, t.x, t.y);
this.draw.moveTo(e.x, e.y);
this.draw.lineTo(t.x, t.y);
var n = p[this.gameData[this.myProgressId + 1].nodeId], o = this.posList[this.myProgressId + 1], s = n.distance1 / 4 * n.scale, r = Math.floor(1.73 * s);
this.draw.moveTo(o.x - r, o.y + s);
this.draw.lineTo(o.x + r, o.y - s);
s = n.distance2 / 4 * n.scale, r = Math.floor(1.73 * s);
this.draw.moveTo(o.x - r, o.y - s);
this.draw.lineTo(o.x + r, o.y + s);
this.draw.stroke();
}
});
cc._RF.pop();
}, {
RequestHandler: "RequestHandler",
Tools: "Tools",
config: "config",
onfire: "onfire",
tyt_ImgConfig: "tyt_ImgConfig"
} ],
Tools: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "ffa735wpAlMqL2R4j3HKlW7", "Tools");
var n = {
loadResDir: function(e, r) {
cc.loader.loadResDir(e, cc.SpriteFrame, function(e, t, i) {
if (e) cc.log("common/Tools.loadResDir：加载失败, 原因:" + e); else {
for (var n = {}, o = 0; o < i.length; o++) {
var s = i[o].split("/");
n[s[s.length - 1]] = t[o];
}
r && "function" == typeof r && r(n);
}
});
},
randomSeed: 0,
random: function() {
n.randomSeed = 1103515245 * n.randomSeed + 12345 & 2147483647;
return n.randomSeed / 2147483647;
},
callJavaStaticMethod: function(e, t, i) {
return jsb.reflection.callStaticMethod(e, t, i);
},
callJavaStaticMethod1: function(e, t, i, n) {
return jsb.reflection.callStaticMethod(e, t, i, n);
},
callJavaStaticMethod2: function(e, t, i, n, o) {
return jsb.reflection.callStaticMethod(e, t, i, n, o);
},
callJavaStaticMethod3: function(e, t, i, n, o, s) {
return jsb.reflection.callStaticMethod(e, t, i, n, o, s);
},
callObjCStaticMethod: function(e, t) {
return jsb.reflection.callStaticMethod(e, t);
},
callObjCStaticMethod1: function(e, t, i) {
return jsb.reflection.callStaticMethod(e, t, i);
},
callObjCStaticMethod2: function(e, t, i, n) {
return jsb.reflection.callStaticMethod(e, t, i, n);
},
callObjCStaticMethod3: function(e, t, i, n, o) {
return jsb.reflection.callStaticMethod(e, t, i, n, o);
},
isNative: function() {
return cc.sys.isNative;
},
isBrowser: function() {
return cc.sys.isBrowser;
},
isMobile: function() {
return cc.sys.isMobile;
},
isIOS: function() {
return this.isIPhone() || this.isIPad() || this.isIPod();
},
isAndroid: function() {
return "undefined" != typeof navigator && 0 <= navigator.userAgent.indexOf("Android");
},
isIPhone: function() {
return "undefined" != typeof navigator && 0 <= navigator.userAgent.indexOf("iPhone");
},
isIPad: function() {
return "undefined" != typeof navigator && 0 <= navigator.userAgent.indexOf("iPad");
},
isIPod: function() {
return "undefined" != typeof navigator && 0 <= navigator.userAgent.indexOf("iPod");
},
isWindowsPhone: function() {
return "undefined" != typeof navigator && 0 <= navigator.userAgent.indexOf("Windows Phone");
},
isSymbian: function() {
return "undefined" != typeof navigator && 0 <= navigator.userAgent.indexOf("SymbianOS");
}
};
t.exports = n;
cc._RF.pop();
}, {} ],
bytebuffer: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "c0e0ee0hNVFHJJre8K+4UNf", "bytebuffer");
var n, o, d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
n = void 0, o = function(l) {
var p = function e(t, i, n) {
"undefined" == typeof t && (t = e.DEFAULT_CAPACITY);
"undefined" == typeof i && (i = e.DEFAULT_ENDIAN);
"undefined" == typeof n && (n = e.DEFAULT_NOASSERT);
if (!n) {
if ((t |= 0) < 0) throw RangeError("Illegal capacity");
i = !!i;
n = !!n;
}
this.buffer = 0 === t ? s : new ArrayBuffer(t);
this.view = 0 === t ? null : new Uint8Array(this.buffer);
this.offset = 0;
this.markedOffset = -1;
this.limit = t;
this.littleEndian = i;
this.noAssert = n;
};
p.VERSION = "5.0.1";
p.LITTLE_ENDIAN = !0;
p.BIG_ENDIAN = !1;
p.DEFAULT_CAPACITY = 16;
p.DEFAULT_ENDIAN = p.BIG_ENDIAN;
p.DEFAULT_NOASSERT = !1;
p.Long = l || null;
var r = p.prototype;
r.__isByteBuffer__;
Object.defineProperty(r, "__isByteBuffer__", {
value: !0,
enumerable: !1,
configurable: !1
});
var s = new ArrayBuffer(0), i = String.fromCharCode;
function a(e) {
var t = 0;
return function() {
return t < e.length ? e.charCodeAt(t++) : null;
};
}
function c() {
var e = [], t = [];
return function() {
if (0 === arguments.length) return t.join("") + i.apply(String, e);
1024 < e.length + arguments.length && (t.push(i.apply(String, e)), e.length = 0);
Array.prototype.push.apply(e, arguments);
};
}
p.accessor = function() {
return Uint8Array;
};
p.allocate = function(e, t, i) {
return new p(e, t, i);
};
p.concat = function(e, t, i, n) {
if ("boolean" == typeof t || "string" != typeof t) {
n = i;
i = t;
t = void 0;
}
for (var o, s = 0, r = 0, a = e.length; r < a; ++r) {
p.isByteBuffer(e[r]) || (e[r] = p.wrap(e[r], t));
0 < (o = e[r].limit - e[r].offset) && (s += o);
}
if (0 === s) return new p(0, i, n);
var l, c = new p(s, i, n);
r = 0;
for (;r < a; ) if (!((o = (l = e[r++]).limit - l.offset) <= 0)) {
c.view.set(l.view.subarray(l.offset, l.limit), c.offset);
c.offset += o;
}
c.limit = c.offset;
c.offset = 0;
return c;
};
p.isByteBuffer = function(e) {
return !0 === (e && e.__isByteBuffer__);
};
p.type = function() {
return ArrayBuffer;
};
p.wrap = function(e, t, i, n) {
if ("string" != typeof t) {
n = i;
i = t;
t = void 0;
}
if ("string" == typeof e) {
"undefined" == typeof t && (t = "utf8");
switch (t) {
case "base64":
return p.fromBase64(e, i);

case "hex":
return p.fromHex(e, i);

case "binary":
return p.fromBinary(e, i);

case "utf8":
return p.fromUTF8(e, i);

case "debug":
return p.fromDebug(e, i);

default:
throw Error("Unsupported encoding: " + t);
}
}
if (null === e || "object" !== ("undefined" == typeof e ? "undefined" : d(e))) throw TypeError("Illegal buffer");
var o;
if (p.isByteBuffer(e)) {
(o = r.clone.call(e)).markedOffset = -1;
return o;
}
if (e instanceof Uint8Array) {
o = new p(0, i, n);
if (0 < e.length) {
o.buffer = e.buffer;
o.offset = e.byteOffset;
o.limit = e.byteOffset + e.byteLength;
o.view = new Uint8Array(e.buffer);
}
} else if (e instanceof ArrayBuffer) {
o = new p(0, i, n);
if (0 < e.byteLength) {
o.buffer = e;
o.offset = 0;
o.limit = e.byteLength;
o.view = 0 < e.byteLength ? new Uint8Array(e) : null;
}
} else {
if ("[object Array]" !== Object.prototype.toString.call(e)) throw TypeError("Illegal buffer");
(o = new p(e.length, i, n)).limit = e.length;
for (var s = 0; s < e.length; ++s) o.view[s] = e[s];
}
return o;
};
r.writeBitSet = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if (!(e instanceof Array)) throw TypeError("Illegal BitSet: Not an array");
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
var n, o = t, s = e.length, r = s >> 3, a = 0;
t += this.writeVarint32(s, t);
for (;r--; ) {
n = 1 & !!e[a++] | (1 & !!e[a++]) << 1 | (1 & !!e[a++]) << 2 | (1 & !!e[a++]) << 3 | (1 & !!e[a++]) << 4 | (1 & !!e[a++]) << 5 | (1 & !!e[a++]) << 6 | (1 & !!e[a++]) << 7;
this.writeByte(n, t++);
}
if (a < s) {
var l = 0;
n = 0;
for (;a < s; ) n |= (1 & !!e[a++]) << l++;
this.writeByte(n, t++);
}
if (i) {
this.offset = t;
return this;
}
return t - o;
};
r.readBitSet = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
var i, n = this.readVarint32(e), o = n.value, s = o >> 3, r = 0, a = [];
e += n.length;
for (;s--; ) {
i = this.readByte(e++);
a[r++] = !!(1 & i);
a[r++] = !!(2 & i);
a[r++] = !!(4 & i);
a[r++] = !!(8 & i);
a[r++] = !!(16 & i);
a[r++] = !!(32 & i);
a[r++] = !!(64 & i);
a[r++] = !!(128 & i);
}
if (r < o) {
var l = 0;
i = this.readByte(e++);
for (;r < o; ) a[r++] = !!(i >> l++ & 1);
}
t && (this.offset = e);
return a;
};
r.readBytes = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + e > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+" + e + ") <= " + this.buffer.byteLength);
}
var n = this.slice(t, t + e);
i && (this.offset += e);
return n;
};
r.writeBytes = r.append;
r.writeInt8 = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");
e |= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
t += 1;
var n = this.buffer.byteLength;
n < t && this.resize((n *= 2) > t ? n : t);
t -= 1;
this.view[t] = e;
i && (this.offset += 1);
return this;
};
r.writeByte = r.writeInt8;
r.readInt8 = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength);
}
var i = this.view[e];
128 == (128 & i) && (i = -(255 - i + 1));
t && (this.offset += 1);
return i;
};
r.readByte = r.readInt8;
r.writeUint8 = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");
e >>>= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
t += 1;
var n = this.buffer.byteLength;
n < t && this.resize((n *= 2) > t ? n : t);
t -= 1;
this.view[t] = e;
i && (this.offset += 1);
return this;
};
r.writeUInt8 = r.writeUint8;
r.readUint8 = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength);
}
var i = this.view[e];
t && (this.offset += 1);
return i;
};
r.readUInt8 = r.readUint8;
r.writeInt16 = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");
e |= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
t += 2;
var n = this.buffer.byteLength;
n < t && this.resize((n *= 2) > t ? n : t);
t -= 2;
if (this.littleEndian) {
this.view[t + 1] = (65280 & e) >>> 8;
this.view[t] = 255 & e;
} else {
this.view[t] = (65280 & e) >>> 8;
this.view[t + 1] = 255 & e;
}
i && (this.offset += 2);
return this;
};
r.writeShort = r.writeInt16;
r.readInt16 = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+2) <= " + this.buffer.byteLength);
}
var i = 0;
if (this.littleEndian) {
i = this.view[e];
i |= this.view[e + 1] << 8;
} else {
i = this.view[e] << 8;
i |= this.view[e + 1];
}
32768 == (32768 & i) && (i = -(65535 - i + 1));
t && (this.offset += 2);
return i;
};
r.readShort = r.readInt16;
r.writeUint16 = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");
e >>>= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
t += 2;
var n = this.buffer.byteLength;
n < t && this.resize((n *= 2) > t ? n : t);
t -= 2;
if (this.littleEndian) {
this.view[t + 1] = (65280 & e) >>> 8;
this.view[t] = 255 & e;
} else {
this.view[t] = (65280 & e) >>> 8;
this.view[t + 1] = 255 & e;
}
i && (this.offset += 2);
return this;
};
r.writeUInt16 = r.writeUint16;
r.readUint16 = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+2) <= " + this.buffer.byteLength);
}
var i = 0;
if (this.littleEndian) {
i = this.view[e];
i |= this.view[e + 1] << 8;
} else {
i = this.view[e] << 8;
i |= this.view[e + 1];
}
t && (this.offset += 2);
return i;
};
r.readUInt16 = r.readUint16;
r.writeInt32 = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");
e |= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
t += 4;
var n = this.buffer.byteLength;
n < t && this.resize((n *= 2) > t ? n : t);
t -= 4;
if (this.littleEndian) {
this.view[t + 3] = e >>> 24 & 255;
this.view[t + 2] = e >>> 16 & 255;
this.view[t + 1] = e >>> 8 & 255;
this.view[t] = 255 & e;
} else {
this.view[t] = e >>> 24 & 255;
this.view[t + 1] = e >>> 16 & 255;
this.view[t + 2] = e >>> 8 & 255;
this.view[t + 3] = 255 & e;
}
i && (this.offset += 4);
return this;
};
r.writeInt = r.writeInt32;
r.readInt32 = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength);
}
var i = 0;
if (this.littleEndian) {
i = this.view[e + 2] << 16;
i |= this.view[e + 1] << 8;
i |= this.view[e];
i += this.view[e + 3] << 24 >>> 0;
} else {
i = this.view[e + 1] << 16;
i |= this.view[e + 2] << 8;
i |= this.view[e + 3];
i += this.view[e] << 24 >>> 0;
}
i |= 0;
t && (this.offset += 4);
return i;
};
r.readInt = r.readInt32;
r.writeUint32 = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");
e >>>= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
t += 4;
var n = this.buffer.byteLength;
n < t && this.resize((n *= 2) > t ? n : t);
t -= 4;
if (this.littleEndian) {
this.view[t + 3] = e >>> 24 & 255;
this.view[t + 2] = e >>> 16 & 255;
this.view[t + 1] = e >>> 8 & 255;
this.view[t] = 255 & e;
} else {
this.view[t] = e >>> 24 & 255;
this.view[t + 1] = e >>> 16 & 255;
this.view[t + 2] = e >>> 8 & 255;
this.view[t + 3] = 255 & e;
}
i && (this.offset += 4);
return this;
};
r.writeUInt32 = r.writeUint32;
r.readUint32 = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength);
}
var i = 0;
if (this.littleEndian) {
i = this.view[e + 2] << 16;
i |= this.view[e + 1] << 8;
i |= this.view[e];
i += this.view[e + 3] << 24 >>> 0;
} else {
i = this.view[e + 1] << 16;
i |= this.view[e + 2] << 8;
i |= this.view[e + 3];
i += this.view[e] << 24 >>> 0;
}
t && (this.offset += 4);
return i;
};
r.readUInt32 = r.readUint32;
if (l) {
r.writeInt64 = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" == typeof e) e = l.fromNumber(e); else if ("string" == typeof e) e = l.fromString(e); else if (!(e && e instanceof l)) throw TypeError("Illegal value: " + e + " (not an integer or Long)");
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
"number" == typeof e ? e = l.fromNumber(e) : "string" == typeof e && (e = l.fromString(e));
t += 8;
var n = this.buffer.byteLength;
n < t && this.resize((n *= 2) > t ? n : t);
t -= 8;
var o = e.low, s = e.high;
if (this.littleEndian) {
this.view[t + 3] = o >>> 24 & 255;
this.view[t + 2] = o >>> 16 & 255;
this.view[t + 1] = o >>> 8 & 255;
this.view[t] = 255 & o;
t += 4;
this.view[t + 3] = s >>> 24 & 255;
this.view[t + 2] = s >>> 16 & 255;
this.view[t + 1] = s >>> 8 & 255;
this.view[t] = 255 & s;
} else {
this.view[t] = s >>> 24 & 255;
this.view[t + 1] = s >>> 16 & 255;
this.view[t + 2] = s >>> 8 & 255;
this.view[t + 3] = 255 & s;
t += 4;
this.view[t] = o >>> 24 & 255;
this.view[t + 1] = o >>> 16 & 255;
this.view[t + 2] = o >>> 8 & 255;
this.view[t + 3] = 255 & o;
}
i && (this.offset += 8);
return this;
};
r.writeLong = r.writeInt64;
r.readInt64 = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+8) <= " + this.buffer.byteLength);
}
var i = 0, n = 0;
if (this.littleEndian) {
i = this.view[e + 2] << 16;
i |= this.view[e + 1] << 8;
i |= this.view[e];
i += this.view[e + 3] << 24 >>> 0;
e += 4;
n = this.view[e + 2] << 16;
n |= this.view[e + 1] << 8;
n |= this.view[e];
n += this.view[e + 3] << 24 >>> 0;
} else {
n = this.view[e + 1] << 16;
n |= this.view[e + 2] << 8;
n |= this.view[e + 3];
n += this.view[e] << 24 >>> 0;
e += 4;
i = this.view[e + 1] << 16;
i |= this.view[e + 2] << 8;
i |= this.view[e + 3];
i += this.view[e] << 24 >>> 0;
}
var o = new l(i, n, !1);
t && (this.offset += 8);
return o;
};
r.readLong = r.readInt64;
r.writeUint64 = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" == typeof e) e = l.fromNumber(e); else if ("string" == typeof e) e = l.fromString(e); else if (!(e && e instanceof l)) throw TypeError("Illegal value: " + e + " (not an integer or Long)");
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
"number" == typeof e ? e = l.fromNumber(e) : "string" == typeof e && (e = l.fromString(e));
t += 8;
var n = this.buffer.byteLength;
n < t && this.resize((n *= 2) > t ? n : t);
t -= 8;
var o = e.low, s = e.high;
if (this.littleEndian) {
this.view[t + 3] = o >>> 24 & 255;
this.view[t + 2] = o >>> 16 & 255;
this.view[t + 1] = o >>> 8 & 255;
this.view[t] = 255 & o;
t += 4;
this.view[t + 3] = s >>> 24 & 255;
this.view[t + 2] = s >>> 16 & 255;
this.view[t + 1] = s >>> 8 & 255;
this.view[t] = 255 & s;
} else {
this.view[t] = s >>> 24 & 255;
this.view[t + 1] = s >>> 16 & 255;
this.view[t + 2] = s >>> 8 & 255;
this.view[t + 3] = 255 & s;
t += 4;
this.view[t] = o >>> 24 & 255;
this.view[t + 1] = o >>> 16 & 255;
this.view[t + 2] = o >>> 8 & 255;
this.view[t + 3] = 255 & o;
}
i && (this.offset += 8);
return this;
};
r.writeUInt64 = r.writeUint64;
r.readUint64 = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+8) <= " + this.buffer.byteLength);
}
var i = 0, n = 0;
if (this.littleEndian) {
i = this.view[e + 2] << 16;
i |= this.view[e + 1] << 8;
i |= this.view[e];
i += this.view[e + 3] << 24 >>> 0;
e += 4;
n = this.view[e + 2] << 16;
n |= this.view[e + 1] << 8;
n |= this.view[e];
n += this.view[e + 3] << 24 >>> 0;
} else {
n = this.view[e + 1] << 16;
n |= this.view[e + 2] << 8;
n |= this.view[e + 3];
n += this.view[e] << 24 >>> 0;
e += 4;
i = this.view[e + 1] << 16;
i |= this.view[e + 2] << 8;
i |= this.view[e + 3];
i += this.view[e] << 24 >>> 0;
}
var o = new l(i, n, !0);
t && (this.offset += 8);
return o;
};
r.readUInt64 = r.readUint64;
}
function n(e, t, i, n, o) {
var s, r, a = 8 * o - n - 1, l = (1 << a) - 1, c = l >> 1, h = -7, u = i ? o - 1 : 0, f = i ? -1 : 1, d = e[t + u];
u += f;
s = d & (1 << -h) - 1;
d >>= -h;
h += a;
for (;0 < h; s = 256 * s + e[t + u], u += f, h -= 8) ;
r = s & (1 << -h) - 1;
s >>= -h;
h += n;
for (;0 < h; r = 256 * r + e[t + u], u += f, h -= 8) ;
if (0 === s) s = 1 - c; else {
if (s === l) return r ? NaN : Infinity * (d ? -1 : 1);
r += Math.pow(2, n);
s -= c;
}
return (d ? -1 : 1) * r * Math.pow(2, s - n);
}
function o(e, t, i, n, o, s) {
var r, a, l, c = 8 * s - o - 1, h = (1 << c) - 1, u = h >> 1, f = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = n ? 0 : s - 1, p = n ? 1 : -1, m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
t = Math.abs(t);
if (isNaN(t) || Infinity === t) {
a = isNaN(t) ? 1 : 0;
r = h;
} else {
r = Math.floor(Math.log(t) / Math.LN2);
if (t * (l = Math.pow(2, -r)) < 1) {
r--;
l *= 2;
}
if (2 <= (t += 1 <= r + u ? f / l : f * Math.pow(2, 1 - u)) * l) {
r++;
l /= 2;
}
if (h <= r + u) {
a = 0;
r = h;
} else if (1 <= r + u) {
a = (t * l - 1) * Math.pow(2, o);
r += u;
} else {
a = t * Math.pow(2, u - 1) * Math.pow(2, o);
r = 0;
}
}
for (;8 <= o; e[i + d] = 255 & a, d += p, a /= 256, o -= 8) ;
r = r << o | a;
c += o;
for (;0 < c; e[i + d] = 255 & r, d += p, r /= 256, c -= 8) ;
e[i + d - p] |= 128 * m;
}
r.writeFloat32 = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" != typeof e) throw TypeError("Illegal value: " + e + " (not a number)");
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
t += 4;
var n = this.buffer.byteLength;
n < t && this.resize((n *= 2) > t ? n : t);
t -= 4;
o(this.view, e, t, this.littleEndian, 23, 4);
i && (this.offset += 4);
return this;
};
r.writeFloat = r.writeFloat32;
r.readFloat32 = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength);
}
var i = n(this.view, e, this.littleEndian, 23, 4);
t && (this.offset += 4);
return i;
};
r.readFloat = r.readFloat32;
r.writeFloat64 = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" != typeof e) throw TypeError("Illegal value: " + e + " (not a number)");
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
t += 8;
var n = this.buffer.byteLength;
n < t && this.resize((n *= 2) > t ? n : t);
t -= 8;
o(this.view, e, t, this.littleEndian, 52, 8);
i && (this.offset += 8);
return this;
};
r.writeDouble = r.writeFloat64;
r.readFloat64 = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+8) <= " + this.buffer.byteLength);
}
var i = n(this.view, e, this.littleEndian, 52, 8);
t && (this.offset += 8);
return i;
};
r.readDouble = r.readFloat64;
p.MAX_VARINT32_BYTES = 5;
p.calculateVarint32 = function(e) {
return (e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 1 << 21 ? 3 : e < 1 << 28 ? 4 : 5;
};
p.zigZagEncode32 = function(e) {
return ((e |= 0) << 1 ^ e >> 31) >>> 0;
};
p.zigZagDecode32 = function(e) {
return e >>> 1 ^ -(1 & e) | 0;
};
r.writeVarint32 = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");
e |= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
var n, o = p.calculateVarint32(e);
t += o;
var s = this.buffer.byteLength;
s < t && this.resize((s *= 2) > t ? s : t);
t -= o;
e >>>= 0;
for (;128 <= e; ) {
n = 127 & e | 128;
this.view[t++] = n;
e >>>= 7;
}
this.view[t++] = e;
if (i) {
this.offset = t;
return this;
}
return o;
};
r.writeVarint32ZigZag = function(e, t) {
return this.writeVarint32(p.zigZagEncode32(e), t);
};
r.readVarint32 = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength);
}
var i, n = 0, o = 0;
do {
if (!this.noAssert && e > this.limit) {
var s = Error("Truncated");
s.truncated = !0;
throw s;
}
i = this.view[e++];
n < 5 && (o |= (127 & i) << 7 * n);
++n;
} while (0 != (128 & i));
o |= 0;
if (t) {
this.offset = e;
return o;
}
return {
value: o,
length: n
};
};
r.readVarint32ZigZag = function(e) {
var t = this.readVarint32(e);
"object" === ("undefined" == typeof t ? "undefined" : d(t)) ? t.value = p.zigZagDecode32(t.value) : t = p.zigZagDecode32(t);
return t;
};
if (l) {
p.MAX_VARINT64_BYTES = 10;
p.calculateVarint64 = function(e) {
"number" == typeof e ? e = l.fromNumber(e) : "string" == typeof e && (e = l.fromString(e));
var t = e.toInt() >>> 0, i = e.shiftRightUnsigned(28).toInt() >>> 0, n = e.shiftRightUnsigned(56).toInt() >>> 0;
return 0 == n ? 0 == i ? t < 16384 ? t < 128 ? 1 : 2 : t < 1 << 21 ? 3 : 4 : i < 16384 ? i < 128 ? 5 : 6 : i < 1 << 21 ? 7 : 8 : n < 128 ? 9 : 10;
};
p.zigZagEncode64 = function(e) {
"number" == typeof e ? e = l.fromNumber(e, !1) : "string" == typeof e ? e = l.fromString(e, !1) : !1 !== e.unsigned && (e = e.toSigned());
return e.shiftLeft(1).xor(e.shiftRight(63)).toUnsigned();
};
p.zigZagDecode64 = function(e) {
"number" == typeof e ? e = l.fromNumber(e, !1) : "string" == typeof e ? e = l.fromString(e, !1) : !1 !== e.unsigned && (e = e.toSigned());
return e.shiftRightUnsigned(1).xor(e.and(l.ONE).toSigned().negate()).toSigned();
};
r.writeVarint64 = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("number" == typeof e) e = l.fromNumber(e); else if ("string" == typeof e) e = l.fromString(e); else if (!(e && e instanceof l)) throw TypeError("Illegal value: " + e + " (not an integer or Long)");
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
"number" == typeof e ? e = l.fromNumber(e, !1) : "string" == typeof e ? e = l.fromString(e, !1) : !1 !== e.unsigned && (e = e.toSigned());
var n = p.calculateVarint64(e), o = e.toInt() >>> 0, s = e.shiftRightUnsigned(28).toInt() >>> 0, r = e.shiftRightUnsigned(56).toInt() >>> 0;
t += n;
var a = this.buffer.byteLength;
a < t && this.resize((a *= 2) > t ? a : t);
t -= n;
switch (n) {
case 10:
this.view[t + 9] = r >>> 7 & 1;

case 9:
this.view[t + 8] = 9 !== n ? 128 | r : 127 & r;

case 8:
this.view[t + 7] = 8 !== n ? s >>> 21 | 128 : s >>> 21 & 127;

case 7:
this.view[t + 6] = 7 !== n ? s >>> 14 | 128 : s >>> 14 & 127;

case 6:
this.view[t + 5] = 6 !== n ? s >>> 7 | 128 : s >>> 7 & 127;

case 5:
this.view[t + 4] = 5 !== n ? 128 | s : 127 & s;

case 4:
this.view[t + 3] = 4 !== n ? o >>> 21 | 128 : o >>> 21 & 127;

case 3:
this.view[t + 2] = 3 !== n ? o >>> 14 | 128 : o >>> 14 & 127;

case 2:
this.view[t + 1] = 2 !== n ? o >>> 7 | 128 : o >>> 7 & 127;

case 1:
this.view[t] = 1 !== n ? 128 | o : 127 & o;
}
if (i) {
this.offset += n;
return this;
}
return n;
};
r.writeVarint64ZigZag = function(e, t) {
return this.writeVarint64(p.zigZagEncode64(e), t);
};
r.readVarint64 = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength);
}
var i = e, n = 0, o = 0, s = 0, r = 0;
n = 127 & (r = this.view[e++]);
if (128 & r) {
n |= (127 & (r = this.view[e++])) << 7;
if (128 & r || this.noAssert && "undefined" == typeof r) {
n |= (127 & (r = this.view[e++])) << 14;
if (128 & r || this.noAssert && "undefined" == typeof r) {
n |= (127 & (r = this.view[e++])) << 21;
if (128 & r || this.noAssert && "undefined" == typeof r) {
o = 127 & (r = this.view[e++]);
if (128 & r || this.noAssert && "undefined" == typeof r) {
o |= (127 & (r = this.view[e++])) << 7;
if (128 & r || this.noAssert && "undefined" == typeof r) {
o |= (127 & (r = this.view[e++])) << 14;
if (128 & r || this.noAssert && "undefined" == typeof r) {
o |= (127 & (r = this.view[e++])) << 21;
if (128 & r || this.noAssert && "undefined" == typeof r) {
s = 127 & (r = this.view[e++]);
if (128 & r || this.noAssert && "undefined" == typeof r) {
s |= (127 & (r = this.view[e++])) << 7;
if (128 & r || this.noAssert && "undefined" == typeof r) throw Error("Buffer overrun");
}
}
}
}
}
}
}
}
}
var a = l.fromBits(n | o << 28, o >>> 4 | s << 24, !1);
if (t) {
this.offset = e;
return a;
}
return {
value: a,
length: e - i
};
};
r.readVarint64ZigZag = function(e) {
var t = this.readVarint64(e);
t && t.value instanceof l ? t.value = p.zigZagDecode64(t.value) : t = p.zigZagDecode64(t);
return t;
};
}
r.writeCString = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
var n, o = e.length;
if (!this.noAssert) {
if ("string" != typeof e) throw TypeError("Illegal str: Not a string");
for (n = 0; n < o; ++n) if (0 === e.charCodeAt(n)) throw RangeError("Illegal str: Contains NULL-characters");
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
o = f.calculateUTF16asUTF8(a(e))[1];
t += o + 1;
var s = this.buffer.byteLength;
s < t && this.resize((s *= 2) > t ? s : t);
t -= o + 1;
f.encodeUTF16toUTF8(a(e), function(e) {
this.view[t++] = e;
}.bind(this));
this.view[t++] = 0;
if (i) {
this.offset = t;
return this;
}
return o;
};
r.readCString = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength);
}
var i, n = e, o = -1;
f.decodeUTF8toUTF16(function() {
if (0 === o) return null;
if (e >= this.limit) throw RangeError("Illegal range: Truncated data, " + e + " < " + this.limit);
return 0 === (o = this.view[e++]) ? null : o;
}.bind(this), i = c(), !0);
if (t) {
this.offset = e;
return i();
}
return {
string: i(),
length: e - n
};
};
r.writeIString = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("string" != typeof e) throw TypeError("Illegal str: Not a string");
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
var n, o = t;
n = f.calculateUTF16asUTF8(a(e), this.noAssert)[1];
t += 4 + n;
var s = this.buffer.byteLength;
s < t && this.resize((s *= 2) > t ? s : t);
t -= 4 + n;
if (this.littleEndian) {
this.view[t + 3] = n >>> 24 & 255;
this.view[t + 2] = n >>> 16 & 255;
this.view[t + 1] = n >>> 8 & 255;
this.view[t] = 255 & n;
} else {
this.view[t] = n >>> 24 & 255;
this.view[t + 1] = n >>> 16 & 255;
this.view[t + 2] = n >>> 8 & 255;
this.view[t + 3] = 255 & n;
}
t += 4;
f.encodeUTF16toUTF8(a(e), function(e) {
this.view[t++] = e;
}.bind(this));
if (t !== o + 4 + n) throw RangeError("Illegal range: Truncated data, " + t + " == " + (t + 4 + n));
if (i) {
this.offset = t;
return this;
}
return t - o;
};
r.readIString = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength);
}
var i = e, n = this.readUint32(e), o = this.readUTF8String(n, p.METRICS_BYTES, e += 4);
e += o.length;
if (t) {
this.offset = e;
return o.string;
}
return {
string: o.string,
length: e - i
};
};
p.METRICS_CHARS = "c";
p.METRICS_BYTES = "b";
r.writeUTF8String = function(e, t) {
var i, n = "undefined" == typeof t;
n && (t = this.offset);
if (!this.noAssert) {
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
var o = t;
i = f.calculateUTF16asUTF8(a(e))[1];
t += i;
var s = this.buffer.byteLength;
s < t && this.resize((s *= 2) > t ? s : t);
t -= i;
f.encodeUTF16toUTF8(a(e), function(e) {
this.view[t++] = e;
}.bind(this));
if (n) {
this.offset = t;
return this;
}
return t - o;
};
r.writeString = r.writeUTF8String;
p.calculateUTF8Chars = function(e) {
return f.calculateUTF16asUTF8(a(e))[0];
};
p.calculateString = p.calculateUTF8Bytes = function(e) {
return f.calculateUTF16asUTF8(a(e))[1];
};
r.readUTF8String = function(e, t, i) {
if ("number" == typeof t) {
i = t;
t = void 0;
}
var n = "undefined" == typeof i;
n && (i = this.offset);
"undefined" == typeof t && (t = p.METRICS_CHARS);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal length: " + e + " (not an integer)");
e |= 0;
if ("number" != typeof i || i % 1 != 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
if ((i >>>= 0) < 0 || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength);
}
var o, s = 0, r = i;
if (t === p.METRICS_CHARS) {
o = c();
f.decodeUTF8(function() {
return s < e && i < this.limit ? this.view[i++] : null;
}.bind(this), function(e) {
++s;
f.UTF8toUTF16(e, o);
});
if (s !== e) throw RangeError("Illegal range: Truncated data, " + s + " == " + e);
if (n) {
this.offset = i;
return o();
}
return {
string: o(),
length: i - r
};
}
if (t === p.METRICS_BYTES) {
if (!this.noAssert) {
if ("number" != typeof i || i % 1 != 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
if ((i >>>= 0) < 0 || i + e > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+" + e + ") <= " + this.buffer.byteLength);
}
var a = i + e;
f.decodeUTF8toUTF16(function() {
return i < a ? this.view[i++] : null;
}.bind(this), o = c(), this.noAssert);
if (i !== a) throw RangeError("Illegal range: Truncated data, " + i + " == " + a);
if (n) {
this.offset = i;
return o();
}
return {
string: o(),
length: i - r
};
}
throw TypeError("Unsupported metrics: " + t);
};
r.readString = r.readUTF8String;
r.writeVString = function(e, t) {
var i = "undefined" == typeof t;
i && (t = this.offset);
if (!this.noAssert) {
if ("string" != typeof e) throw TypeError("Illegal str: Not a string");
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");
if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);
}
var n, o, s = t;
n = f.calculateUTF16asUTF8(a(e), this.noAssert)[1];
o = p.calculateVarint32(n);
t += o + n;
var r = this.buffer.byteLength;
r < t && this.resize((r *= 2) > t ? r : t);
t -= o + n;
t += this.writeVarint32(n, t);
f.encodeUTF16toUTF8(a(e), function(e) {
this.view[t++] = e;
}.bind(this));
if (t !== s + n + o) throw RangeError("Illegal range: Truncated data, " + t + " == " + (t + n + o));
if (i) {
this.offset = t;
return this;
}
return t - s;
};
r.readVString = function(e) {
var t = "undefined" == typeof e;
t && (e = this.offset);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength);
}
var i = e, n = this.readVarint32(e), o = this.readUTF8String(n.value, p.METRICS_BYTES, e += n.length);
e += o.length;
if (t) {
this.offset = e;
return o.string;
}
return {
string: o.string,
length: e - i
};
};
r.append = function(e, t, i) {
if ("number" == typeof t || "string" != typeof t) {
i = t;
t = void 0;
}
var n = "undefined" == typeof i;
n && (i = this.offset);
if (!this.noAssert) {
if ("number" != typeof i || i % 1 != 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
if ((i >>>= 0) < 0 || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength);
}
e instanceof p || (e = p.wrap(e, t));
var o = e.limit - e.offset;
if (o <= 0) return this;
i += o;
var s = this.buffer.byteLength;
s < i && this.resize((s *= 2) > i ? s : i);
i -= o;
this.view.set(e.view.subarray(e.offset, e.limit), i);
e.offset += o;
n && (this.offset += o);
return this;
};
r.appendTo = function(e, t) {
e.append(this, t);
return this;
};
r.assert = function(e) {
this.noAssert = !e;
return this;
};
r.capacity = function() {
return this.buffer.byteLength;
};
r.clear = function() {
this.offset = 0;
this.limit = this.buffer.byteLength;
this.markedOffset = -1;
return this;
};
r.clone = function(e) {
var t = new p(0, this.littleEndian, this.noAssert);
if (e) {
t.buffer = new ArrayBuffer(this.buffer.byteLength);
t.view = new Uint8Array(t.buffer);
} else {
t.buffer = this.buffer;
t.view = this.view;
}
t.offset = this.offset;
t.markedOffset = this.markedOffset;
t.limit = this.limit;
return t;
};
r.compact = function(e, t) {
"undefined" == typeof e && (e = this.offset);
"undefined" == typeof t && (t = this.limit);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal begin: Not an integer");
e >>>= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal end: Not an integer");
t >>>= 0;
if (e < 0 || t < e || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength);
}
if (0 === e && t === this.buffer.byteLength) return this;
var i = t - e;
if (0 === i) {
this.buffer = s;
this.view = null;
0 <= this.markedOffset && (this.markedOffset -= e);
this.offset = 0;
this.limit = 0;
return this;
}
var n = new ArrayBuffer(i), o = new Uint8Array(n);
o.set(this.view.subarray(e, t));
this.buffer = n;
this.view = o;
0 <= this.markedOffset && (this.markedOffset -= e);
this.offset = 0;
this.limit = i;
return this;
};
r.copy = function(e, t) {
"undefined" == typeof e && (e = this.offset);
"undefined" == typeof t && (t = this.limit);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal begin: Not an integer");
e >>>= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal end: Not an integer");
t >>>= 0;
if (e < 0 || t < e || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength);
}
if (e === t) return new p(0, this.littleEndian, this.noAssert);
var i = t - e, n = new p(i, this.littleEndian, this.noAssert);
n.offset = 0;
n.limit = i;
0 <= n.markedOffset && (n.markedOffset -= e);
this.copyTo(n, 0, e, t);
return n;
};
r.copyTo = function(e, t, i, n) {
var o, s;
if (!this.noAssert && !p.isByteBuffer(e)) throw TypeError("Illegal target: Not a ByteBuffer");
t = (s = "undefined" == typeof t) ? e.offset : 0 | t;
i = (o = "undefined" == typeof i) ? this.offset : 0 | i;
n = "undefined" == typeof n ? this.limit : 0 | n;
if (t < 0 || t > e.buffer.byteLength) throw RangeError("Illegal target range: 0 <= " + t + " <= " + e.buffer.byteLength);
if (i < 0 || n > this.buffer.byteLength) throw RangeError("Illegal source range: 0 <= " + i + " <= " + this.buffer.byteLength);
var r = n - i;
if (0 === r) return e;
e.ensureCapacity(t + r);
e.view.set(this.view.subarray(i, n), t);
o && (this.offset += r);
s && (e.offset += r);
return this;
};
r.ensureCapacity = function(e) {
var t = this.buffer.byteLength;
return t < e ? this.resize((t *= 2) > e ? t : e) : this;
};
r.fill = function(e, t, i) {
var n = "undefined" == typeof t;
n && (t = this.offset);
"string" == typeof e && 0 < e.length && (e = e.charCodeAt(0));
"undefined" == typeof t && (t = this.offset);
"undefined" == typeof i && (i = this.limit);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");
e |= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal begin: Not an integer");
t >>>= 0;
if ("number" != typeof i || i % 1 != 0) throw TypeError("Illegal end: Not an integer");
i >>>= 0;
if (t < 0 || i < t || i > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + i + " <= " + this.buffer.byteLength);
}
if (i <= t) return this;
for (;t < i; ) this.view[t++] = e;
n && (this.offset = t);
return this;
};
r.flip = function() {
this.limit = this.offset;
this.offset = 0;
return this;
};
r.mark = function(e) {
e = "undefined" == typeof e ? this.offset : e;
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");
if ((e >>>= 0) < 0 || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength);
}
this.markedOffset = e;
return this;
};
r.order = function(e) {
if (!this.noAssert && "boolean" != typeof e) throw TypeError("Illegal littleEndian: Not a boolean");
this.littleEndian = !!e;
return this;
};
r.LE = function(e) {
this.littleEndian = "undefined" == typeof e || !!e;
return this;
};
r.BE = function(e) {
this.littleEndian = "undefined" != typeof e && !e;
return this;
};
r.prepend = function(e, t, i) {
if ("number" == typeof t || "string" != typeof t) {
i = t;
t = void 0;
}
var n = "undefined" == typeof i;
n && (i = this.offset);
if (!this.noAssert) {
if ("number" != typeof i || i % 1 != 0) throw TypeError("Illegal offset: " + i + " (not an integer)");
if ((i >>>= 0) < 0 || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength);
}
e instanceof p || (e = p.wrap(e, t));
var o = e.limit - e.offset;
if (o <= 0) return this;
var s = o - i;
if (0 < s) {
var r = new ArrayBuffer(this.buffer.byteLength + s), a = new Uint8Array(r);
a.set(this.view.subarray(i, this.buffer.byteLength), o);
this.buffer = r;
this.view = a;
this.offset += s;
0 <= this.markedOffset && (this.markedOffset += s);
this.limit += s;
i += s;
} else new Uint8Array(this.buffer);
this.view.set(e.view.subarray(e.offset, e.limit), i - o);
e.offset = e.limit;
n && (this.offset -= o);
return this;
};
r.prependTo = function(e, t) {
e.prepend(this, t);
return this;
};
r.printDebug = function(e) {
"function" != typeof e && (e = console.log.bind(console));
e(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(!0));
};
r.remaining = function() {
return this.limit - this.offset;
};
r.reset = function() {
if (0 <= this.markedOffset) {
this.offset = this.markedOffset;
this.markedOffset = -1;
} else this.offset = 0;
return this;
};
r.resize = function(e) {
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal capacity: " + e + " (not an integer)");
if ((e |= 0) < 0) throw RangeError("Illegal capacity: 0 <= " + e);
}
if (this.buffer.byteLength < e) {
var t = new ArrayBuffer(e), i = new Uint8Array(t);
i.set(this.view);
this.buffer = t;
this.view = i;
}
return this;
};
r.reverse = function(e, t) {
"undefined" == typeof e && (e = this.offset);
"undefined" == typeof t && (t = this.limit);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal begin: Not an integer");
e >>>= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal end: Not an integer");
t >>>= 0;
if (e < 0 || t < e || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength);
}
if (e === t) return this;
Array.prototype.reverse.call(this.view.subarray(e, t));
return this;
};
r.skip = function(e) {
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal length: " + e + " (not an integer)");
e |= 0;
}
var t = this.offset + e;
if (!this.noAssert && (t < 0 || t > this.buffer.byteLength)) throw RangeError("Illegal length: 0 <= " + this.offset + " + " + e + " <= " + this.buffer.byteLength);
this.offset = t;
return this;
};
r.slice = function(e, t) {
"undefined" == typeof e && (e = this.offset);
"undefined" == typeof t && (t = this.limit);
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal begin: Not an integer");
e >>>= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal end: Not an integer");
t >>>= 0;
if (e < 0 || t < e || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength);
}
var i = this.clone();
i.offset = e;
i.limit = t;
return i;
};
r.toBuffer = function(e) {
var t = this.offset, i = this.limit;
if (!this.noAssert) {
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: Not an integer");
t >>>= 0;
if ("number" != typeof i || i % 1 != 0) throw TypeError("Illegal limit: Not an integer");
i >>>= 0;
if (t < 0 || i < t || i > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + i + " <= " + this.buffer.byteLength);
}
if (!e && 0 === t && i === this.buffer.byteLength) return this.buffer;
if (t === i) return s;
var n = new ArrayBuffer(i - t);
new Uint8Array(n).set(new Uint8Array(this.buffer).subarray(t, i), 0);
return n;
};
r.toArrayBuffer = r.toBuffer;
r.toString = function(e, t, i) {
if ("undefined" == typeof e) return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
"number" == typeof e && (i = t = e = "utf8");
switch (e) {
case "utf8":
return this.toUTF8(t, i);

case "base64":
return this.toBase64(t, i);

case "hex":
return this.toHex(t, i);

case "binary":
return this.toBinary(t, i);

case "debug":
return this.toDebug();

case "columns":
return this.toColumns();

default:
throw Error("Unsupported encoding: " + e);
}
};
var h = function() {
for (var e = {}, o = [ 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47 ], r = [], t = 0, i = o.length; t < i; ++t) r[o[t]] = t;
e.encode = function(e, t) {
for (var i, n; null !== (i = e()); ) {
t(o[i >> 2 & 63]);
n = (3 & i) << 4;
if (null !== (i = e())) {
t(o[63 & ((n |= i >> 4 & 15) | i >> 4 & 15)]);
n = (15 & i) << 2;
null !== (i = e()) ? (t(o[63 & (n | i >> 6 & 3)]), t(o[63 & i])) : (t(o[63 & n]), 
t(61));
} else t(o[63 & n]), t(61), t(61);
}
};
e.decode = function(e, t) {
var i, n, o;
function s(e) {
throw Error("Illegal character code: " + e);
}
for (;null !== (i = e()); ) {
"undefined" == typeof (n = r[i]) && s(i);
if (null !== (i = e())) {
"undefined" == typeof (o = r[i]) && s(i);
t(n << 2 >>> 0 | (48 & o) >> 4);
if (null !== (i = e())) {
if ("undefined" == typeof (n = r[i])) {
if (61 === i) break;
s(i);
}
t((15 & o) << 4 >>> 0 | (60 & n) >> 2);
if (null !== (i = e())) {
if ("undefined" == typeof (o = r[i])) {
if (61 === i) break;
s(i);
}
t((3 & n) << 6 >>> 0 | o);
}
}
}
}
};
e.test = function(e) {
return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e);
};
return e;
}();
r.toBase64 = function(e, t) {
"undefined" == typeof e && (e = this.offset);
"undefined" == typeof t && (t = this.limit);
t |= 0;
if ((e |= 0) < 0 || t > this.capacity || t < e) throw RangeError("begin, end");
var i;
h.encode(function() {
return e < t ? this.view[e++] : null;
}.bind(this), i = c());
return i();
};
p.fromBase64 = function(e, t) {
if ("string" != typeof e) throw TypeError("str");
var i = new p(e.length / 4 * 3, t), n = 0;
h.decode(a(e), function(e) {
i.view[n++] = e;
});
i.limit = n;
return i;
};
p.btoa = function(e) {
return p.fromBinary(e).toBase64();
};
p.atob = function(e) {
return p.fromBase64(e).toBinary();
};
r.toBinary = function(e, t) {
"undefined" == typeof e && (e = this.offset);
"undefined" == typeof t && (t = this.limit);
t |= 0;
if ((e |= 0) < 0 || t > this.capacity() || t < e) throw RangeError("begin, end");
if (e === t) return "";
for (var i = [], n = []; e < t; ) {
i.push(this.view[e++]);
1024 <= i.length && (n.push(String.fromCharCode.apply(String, i)), i = []);
}
return n.join("") + String.fromCharCode.apply(String, i);
};
p.fromBinary = function(e, t) {
if ("string" != typeof e) throw TypeError("str");
for (var i, n = 0, o = e.length, s = new p(o, t); n < o; ) {
if (255 < (i = e.charCodeAt(n))) throw RangeError("illegal char code: " + i);
s.view[n++] = i;
}
s.limit = o;
return s;
};
r.toDebug = function(e) {
for (var t, i = -1, n = this.buffer.byteLength, o = "", s = "", r = ""; i < n; ) {
if (-1 !== i) {
o += (t = this.view[i]) < 16 ? "0" + t.toString(16).toUpperCase() : t.toString(16).toUpperCase();
e && (s += 32 < t && t < 127 ? String.fromCharCode(t) : ".");
}
++i;
if (e && 0 < i && i % 16 == 0 && i !== n) {
for (;o.length < 51; ) o += " ";
r += o + s + "\n";
o = s = "";
}
i === this.offset && i === this.limit ? o += i === this.markedOffset ? "!" : "|" : i === this.offset ? o += i === this.markedOffset ? "[" : "<" : i === this.limit ? o += i === this.markedOffset ? "]" : ">" : o += i === this.markedOffset ? "'" : e || 0 !== i && i !== n ? " " : "";
}
if (e && " " !== o) {
for (;o.length < 51; ) o += " ";
r += o + s + "\n";
}
return e ? r : o;
};
p.fromDebug = function(e, t, i) {
for (var n, o, s = e.length, r = new p((s + 1) / 3 | 0, t, i), a = 0, l = 0, c = !1, h = !1, u = !1, f = !1, d = !1; a < s; ) {
switch (n = e.charAt(a++)) {
case "!":
if (!i) {
if (h || u || f) {
d = !0;
break;
}
h = u = f = !0;
}
r.offset = r.markedOffset = r.limit = l;
c = !1;
break;

case "|":
if (!i) {
if (h || f) {
d = !0;
break;
}
h = f = !0;
}
r.offset = r.limit = l;
c = !1;
break;

case "[":
if (!i) {
if (h || u) {
d = !0;
break;
}
h = u = !0;
}
r.offset = r.markedOffset = l;
c = !1;
break;

case "<":
if (!i) {
if (h) {
d = !0;
break;
}
h = !0;
}
r.offset = l;
c = !1;
break;

case "]":
if (!i) {
if (f || u) {
d = !0;
break;
}
f = u = !0;
}
r.limit = r.markedOffset = l;
c = !1;
break;

case ">":
if (!i) {
if (f) {
d = !0;
break;
}
f = !0;
}
r.limit = l;
c = !1;
break;

case "'":
if (!i) {
if (u) {
d = !0;
break;
}
u = !0;
}
r.markedOffset = l;
c = !1;
break;

case " ":
c = !1;
break;

default:
if (!i && c) {
d = !0;
break;
}
o = parseInt(n + e.charAt(a++), 16);
if (!i && (isNaN(o) || o < 0 || 255 < o)) throw TypeError("Illegal str: Not a debug encoded string");
r.view[l++] = o;
c = !0;
}
if (d) throw TypeError("Illegal str: Invalid symbol at " + a);
}
if (!i) {
if (!h || !f) throw TypeError("Illegal str: Missing offset or limit");
if (l < r.buffer.byteLength) throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + l + " < " + s);
}
return r;
};
r.toHex = function(e, t) {
e = "undefined" == typeof e ? this.offset : e;
t = "undefined" == typeof t ? this.limit : t;
if (!this.noAssert) {
if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal begin: Not an integer");
e >>>= 0;
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal end: Not an integer");
t >>>= 0;
if (e < 0 || t < e || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength);
}
for (var i, n = new Array(t - e); e < t; ) (i = this.view[e++]) < 16 ? n.push("0", i.toString(16)) : n.push(i.toString(16));
return n.join("");
};
p.fromHex = function(e, t, i) {
if (!i) {
if ("string" != typeof e) throw TypeError("Illegal str: Not a string");
if (e.length % 2 != 0) throw TypeError("Illegal str: Length not a multiple of 2");
}
for (var n, o = e.length, s = new p(o / 2 | 0, t), r = 0, a = 0; r < o; r += 2) {
n = parseInt(e.substring(r, r + 2), 16);
if (!i && (!isFinite(n) || n < 0 || 255 < n)) throw TypeError("Illegal str: Contains non-hex characters");
s.view[a++] = n;
}
s.limit = a;
return s;
};
var u, f = u = {
MAX_CODEPOINT: 1114111,
encodeUTF8: function(e, t) {
var i = null;
"number" == typeof e && (i = e, e = function() {
return null;
});
for (;null !== i || null !== (i = e()); ) {
i < 128 ? t(127 & i) : (i < 2048 ? t(i >> 6 & 31 | 192) : (i < 65536 ? t(i >> 12 & 15 | 224) : (t(i >> 18 & 7 | 240), 
t(i >> 12 & 63 | 128)), t(i >> 6 & 63 | 128)), t(63 & i | 128));
i = null;
}
},
decodeUTF8: function(e, t) {
for (var i, n, o, s, r = function(e) {
e = e.slice(0, e.indexOf(null));
var t = Error(e.toString());
t.name = "TruncatedError";
t.bytes = e;
throw t;
}; null !== (i = e()); ) if (0 == (128 & i)) t(i); else if (192 == (224 & i)) null === (n = e()) && r([ i, n ]), 
t((31 & i) << 6 | 63 & n); else if (224 == (240 & i)) (null === (n = e()) || null === (o = e())) && r([ i, n, o ]), 
t((15 & i) << 12 | (63 & n) << 6 | 63 & o); else {
if (240 != (248 & i)) throw RangeError("Illegal starting byte: " + i);
(null === (n = e()) || null === (o = e()) || null === (s = e())) && r([ i, n, o, s ]), 
t((7 & i) << 18 | (63 & n) << 12 | (63 & o) << 6 | 63 & s);
}
},
UTF16toUTF8: function(e, t) {
for (var i, n = null; null !== (i = null !== n ? n : e()); ) if (55296 <= i && i <= 57343 && null !== (n = e()) && 56320 <= n && n <= 57343) {
t(1024 * (i - 55296) + n - 56320 + 65536);
n = null;
} else t(i);
null !== n && t(n);
},
UTF8toUTF16: function(e, t) {
var i = null;
"number" == typeof e && (i = e, e = function() {
return null;
});
for (;null !== i || null !== (i = e()); ) {
i <= 65535 ? t(i) : (t(55296 + ((i -= 65536) >> 10)), t(i % 1024 + 56320));
i = null;
}
},
encodeUTF16toUTF8: function(e, t) {
u.UTF16toUTF8(e, function(e) {
u.encodeUTF8(e, t);
});
},
decodeUTF8toUTF16: function(e, t) {
u.decodeUTF8(e, function(e) {
u.UTF8toUTF16(e, t);
});
},
calculateCodePoint: function(e) {
return e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
},
calculateUTF8: function(e) {
for (var t, i = 0; null !== (t = e()); ) i += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4;
return i;
},
calculateUTF16asUTF8: function(e) {
var t = 0, i = 0;
u.UTF16toUTF8(e, function(e) {
++t;
i += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
});
return [ t, i ];
}
};
r.toUTF8 = function(t, i) {
"undefined" == typeof t && (t = this.offset);
"undefined" == typeof i && (i = this.limit);
if (!this.noAssert) {
if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal begin: Not an integer");
t >>>= 0;
if ("number" != typeof i || i % 1 != 0) throw TypeError("Illegal end: Not an integer");
i >>>= 0;
if (t < 0 || i < t || i > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + i + " <= " + this.buffer.byteLength);
}
var e;
try {
f.decodeUTF8toUTF16(function() {
return t < i ? this.view[t++] : null;
}.bind(this), e = c());
} catch (e) {
if (t !== i) throw RangeError("Illegal range: Truncated data, " + t + " != " + i);
}
return e();
};
p.fromUTF8 = function(e, t, i) {
if (!i && "string" != typeof e) throw TypeError("Illegal str: Not a string");
var n = new p(f.calculateUTF16asUTF8(a(e), !0)[1], t, i), o = 0;
f.encodeUTF16toUTF8(a(e), function(e) {
n.view[o++] = e;
});
n.limit = o;
return n;
};
return p;
}, "function" == typeof define && define.amd ? define([ "long" ], o) : "function" == typeof t && "object" === ("undefined" == typeof e ? "undefined" : d(e)) && e && e.exports ? e.exports = function() {
var e;
try {
e = t("long");
} catch (e) {}
return o(e);
}() : (n.dcodeIO = n.dcodeIO || {}).ByteBuffer = o(n.dcodeIO.Long);
cc._RF.pop();
}, {
long: "long"
} ],
config: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "aec36RorH1OQIeXBw1n+Du5", "config");
t.exports = {
isNetwork: !1,
gameInfoList: [ {
appId: 1,
appName: "连连看",
icon: "lianliankan",
people: 487064,
scene: "lianliankan"
}, {
appId: 2,
appName: "斗兽棋",
icon: "app",
people: 2130,
scene: "doushouqi"
}, {
appId: 3,
appName: "开锁达人",
icon: "lianliankan",
people: 414950,
scene: "lock"
}, {
appId: 4,
appName: "消砖块",
icon: "lianliankan",
people: 460481,
scene: "xiaozhuankuai"
}, {
appId: 5,
appName: "跳一跳",
icon: "lianliankan",
people: 396168,
scene: "tiaoyitiao"
} ]
};
cc._RF.pop();
}, {} ],
long: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "93d3dDcvzhJx6vies9opD5O", "long");
var n, o, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
n = void 0, o = function() {
function n(e, t, i) {
this.low = 0 | e;
this.high = 0 | t;
this.unsigned = !!i;
}
Object.defineProperty(n.prototype, "__isLong__", {
value: !0,
enumerable: !1,
configurable: !1
});
function d(e) {
return !0 === (e && e.__isLong__);
}
n.isLong = d;
var s = {}, r = {};
function e(e, t) {
var i, n, o;
if (t) {
if ((o = 0 <= (e >>>= 0) && e < 256) && (n = r[e])) return n;
i = m(e, (0 | e) < 0 ? -1 : 0, !0);
o && (r[e] = i);
return i;
}
if ((o = -128 <= (e |= 0) && e < 128) && (n = s[e])) return n;
i = m(e, e < 0 ? -1 : 0, !1);
o && (s[e] = i);
return i;
}
n.fromInt = e;
function p(e, t) {
if (isNaN(e) || !isFinite(e)) return t ? l : y;
if (t) {
if (e < 0) return l;
if (o <= e) return w;
} else {
if (e <= -a) return S;
if (a <= e + 1) return v;
}
return e < 0 ? p(-e, t).neg() : m(e % i | 0, e / i | 0, t);
}
n.fromNumber = p;
function m(e, t, i) {
return new n(e, t, i);
}
n.fromBits = m;
var h = Math.pow;
function u(e, t, i) {
if (0 === e.length) throw Error("empty string");
if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return y;
"number" == typeof t ? (i = t, t = !1) : t = !!t;
if ((i = i || 10) < 2 || 36 < i) throw RangeError("radix");
var n;
if (0 < (n = e.indexOf("-"))) throw Error("interior hyphen");
if (0 === n) return u(e.substring(1), t, i).neg();
for (var o = p(h(i, 8)), s = y, r = 0; r < e.length; r += 8) {
var a = Math.min(8, e.length - r), l = parseInt(e.substring(r, r + a), i);
if (a < 8) {
var c = p(h(i, a));
s = s.mul(c).add(p(l));
} else s = (s = s.mul(o)).add(p(l));
}
s.unsigned = t;
return s;
}
n.fromString = u;
function g(e) {
return e instanceof n ? e : "number" == typeof e ? p(e) : "string" == typeof e ? u(e) : m(e.low, e.high, e.unsigned);
}
n.fromValue = g;
var i = 4294967296, o = i * i, a = o / 2, _ = e(1 << 24), y = e(0);
n.ZERO = y;
var l = e(0, !0);
n.UZERO = l;
var c = e(1);
n.ONE = c;
var f = e(1, !0);
n.UONE = f;
var b = e(-1);
n.NEG_ONE = b;
var v = m(-1, 2147483647, !1);
n.MAX_VALUE = v;
var w = m(-1, -1, !0);
n.MAX_UNSIGNED_VALUE = w;
var S = m(0, -2147483648, !1);
n.MIN_VALUE = S;
var t = n.prototype;
t.toInt = function() {
return this.unsigned ? this.low >>> 0 : this.low;
};
t.toNumber = function() {
return this.unsigned ? (this.high >>> 0) * i + (this.low >>> 0) : this.high * i + (this.low >>> 0);
};
t.toString = function(e) {
if ((e = e || 10) < 2 || 36 < e) throw RangeError("radix");
if (this.isZero()) return "0";
if (this.isNegative()) {
if (this.eq(S)) {
var t = p(e), i = this.div(t), n = i.mul(t).sub(this);
return i.toString(e) + n.toInt().toString(e);
}
return "-" + this.neg().toString(e);
}
for (var o = p(h(e, 6), this.unsigned), s = this, r = ""; ;) {
var a = s.div(o), l = (s.sub(a.mul(o)).toInt() >>> 0).toString(e);
if ((s = a).isZero()) return l + r;
for (;l.length < 6; ) l = "0" + l;
r = "" + l + r;
}
};
t.getHighBits = function() {
return this.high;
};
t.getHighBitsUnsigned = function() {
return this.high >>> 0;
};
t.getLowBits = function() {
return this.low;
};
t.getLowBitsUnsigned = function() {
return this.low >>> 0;
};
t.getNumBitsAbs = function() {
if (this.isNegative()) return this.eq(S) ? 64 : this.neg().getNumBitsAbs();
for (var e = 0 != this.high ? this.high : this.low, t = 31; 0 < t && 0 == (e & 1 << t); t--) ;
return 0 != this.high ? t + 33 : t + 1;
};
t.isZero = function() {
return 0 === this.high && 0 === this.low;
};
t.isNegative = function() {
return !this.unsigned && this.high < 0;
};
t.isPositive = function() {
return this.unsigned || 0 <= this.high;
};
t.isOdd = function() {
return 1 == (1 & this.low);
};
t.isEven = function() {
return 0 == (1 & this.low);
};
t.equals = function(e) {
d(e) || (e = g(e));
return (this.unsigned === e.unsigned || this.high >>> 31 != 1 || e.high >>> 31 != 1) && (this.high === e.high && this.low === e.low);
};
t.eq = t.equals;
t.notEquals = function(e) {
return !this.eq(e);
};
t.neq = t.notEquals;
t.lessThan = function(e) {
return this.comp(e) < 0;
};
t.lt = t.lessThan;
t.lessThanOrEqual = function(e) {
return this.comp(e) <= 0;
};
t.lte = t.lessThanOrEqual;
t.greaterThan = function(e) {
return 0 < this.comp(e);
};
t.gt = t.greaterThan;
t.greaterThanOrEqual = function(e) {
return 0 <= this.comp(e);
};
t.gte = t.greaterThanOrEqual;
t.compare = function(e) {
d(e) || (e = g(e));
if (this.eq(e)) return 0;
var t = this.isNegative(), i = e.isNegative();
return t && !i ? -1 : !t && i ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e).isNegative() ? -1 : 1;
};
t.comp = t.compare;
t.negate = function() {
return !this.unsigned && this.eq(S) ? S : this.not().add(c);
};
t.neg = t.negate;
t.add = function(e) {
d(e) || (e = g(e));
var t = this.high >>> 16, i = 65535 & this.high, n = this.low >>> 16, o = 65535 & this.low, s = e.high >>> 16, r = 65535 & e.high, a = e.low >>> 16, l = 0, c = 0, h = 0, u = 0;
h += (u += o + (65535 & e.low)) >>> 16;
c += (h += n + a) >>> 16;
l += (c += i + r) >>> 16;
l += t + s;
return m((h &= 65535) << 16 | (u &= 65535), (l &= 65535) << 16 | (c &= 65535), this.unsigned);
};
t.subtract = function(e) {
d(e) || (e = g(e));
return this.add(e.neg());
};
t.sub = t.subtract;
t.multiply = function(e) {
if (this.isZero()) return y;
d(e) || (e = g(e));
if (e.isZero()) return y;
if (this.eq(S)) return e.isOdd() ? S : y;
if (e.eq(S)) return this.isOdd() ? S : y;
if (this.isNegative()) return e.isNegative() ? this.neg().mul(e.neg()) : this.neg().mul(e).neg();
if (e.isNegative()) return this.mul(e.neg()).neg();
if (this.lt(_) && e.lt(_)) return p(this.toNumber() * e.toNumber(), this.unsigned);
var t = this.high >>> 16, i = 65535 & this.high, n = this.low >>> 16, o = 65535 & this.low, s = e.high >>> 16, r = 65535 & e.high, a = e.low >>> 16, l = 65535 & e.low, c = 0, h = 0, u = 0, f = 0;
u += (f += o * l) >>> 16;
h += (u += n * l) >>> 16;
u &= 65535;
h += (u += o * a) >>> 16;
c += (h += i * l) >>> 16;
h &= 65535;
c += (h += n * a) >>> 16;
h &= 65535;
c += (h += o * r) >>> 16;
c += t * l + i * a + n * r + o * s;
return m((u &= 65535) << 16 | (f &= 65535), (c &= 65535) << 16 | (h &= 65535), this.unsigned);
};
t.mul = t.multiply;
t.divide = function(e) {
d(e) || (e = g(e));
if (e.isZero()) throw Error("division by zero");
if (this.isZero()) return this.unsigned ? l : y;
var t, i, n;
if (this.unsigned) {
e.unsigned || (e = e.toUnsigned());
if (e.gt(this)) return l;
if (e.gt(this.shru(1))) return f;
n = l;
} else {
if (this.eq(S)) {
if (e.eq(c) || e.eq(b)) return S;
if (e.eq(S)) return c;
if ((t = this.shr(1).div(e).shl(1)).eq(y)) return e.isNegative() ? c : b;
i = this.sub(e.mul(t));
return n = t.add(i.div(e));
}
if (e.eq(S)) return this.unsigned ? l : y;
if (this.isNegative()) return e.isNegative() ? this.neg().div(e.neg()) : this.neg().div(e).neg();
if (e.isNegative()) return this.div(e.neg()).neg();
n = y;
}
i = this;
for (;i.gte(e); ) {
t = Math.max(1, Math.floor(i.toNumber() / e.toNumber()));
for (var o = Math.ceil(Math.log(t) / Math.LN2), s = o <= 48 ? 1 : h(2, o - 48), r = p(t), a = r.mul(e); a.isNegative() || a.gt(i); ) a = (r = p(t -= s, this.unsigned)).mul(e);
r.isZero() && (r = c);
n = n.add(r);
i = i.sub(a);
}
return n;
};
t.div = t.divide;
t.modulo = function(e) {
d(e) || (e = g(e));
return this.sub(this.div(e).mul(e));
};
t.mod = t.modulo;
t.not = function() {
return m(~this.low, ~this.high, this.unsigned);
};
t.and = function(e) {
d(e) || (e = g(e));
return m(this.low & e.low, this.high & e.high, this.unsigned);
};
t.or = function(e) {
d(e) || (e = g(e));
return m(this.low | e.low, this.high | e.high, this.unsigned);
};
t.xor = function(e) {
d(e) || (e = g(e));
return m(this.low ^ e.low, this.high ^ e.high, this.unsigned);
};
t.shiftLeft = function(e) {
d(e) && (e = e.toInt());
return 0 == (e &= 63) ? this : e < 32 ? m(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : m(0, this.low << e - 32, this.unsigned);
};
t.shl = t.shiftLeft;
t.shiftRight = function(e) {
d(e) && (e = e.toInt());
return 0 == (e &= 63) ? this : e < 32 ? m(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : m(this.high >> e - 32, 0 <= this.high ? 0 : -1, this.unsigned);
};
t.shr = t.shiftRight;
t.shiftRightUnsigned = function(e) {
d(e) && (e = e.toInt());
if (0 === (e &= 63)) return this;
var t = this.high;
if (e < 32) {
return m(this.low >>> e | t << 32 - e, t >>> e, this.unsigned);
}
return m(32 === e ? t : t >>> e - 32, 0, this.unsigned);
};
t.shru = t.shiftRightUnsigned;
t.toSigned = function() {
return this.unsigned ? m(this.low, this.high, !1) : this;
};
t.toUnsigned = function() {
return this.unsigned ? this : m(this.low, this.high, !0);
};
return n;
}, "function" == typeof define && define.amd ? define([], o) : "function" == typeof e && "object" === ("undefined" == typeof t ? "undefined" : s(t)) && t && t.exports ? t.exports = o() : (n.dcodeIO = n.dcodeIO || {}).Long = o();
cc._RF.pop();
}, {} ],
onfire: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "59bfaadNUxDMaBaAdnpYIeF", "onfire");
var n, o, u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
n = "undefined" != typeof window ? window : void 0, o = function() {
var s = {}, o = 0, r = "string", a = "function", l = Function.call.bind(Object.hasOwnProperty), i = Function.call.bind(Array.prototype.slice);
function n(e, t, i, n) {
if (("undefined" == typeof e ? "undefined" : u(e)) !== r || ("undefined" == typeof t ? "undefined" : u(t)) !== a) throw new Error("args: " + r + ", " + a);
l(s, e) || (s[e] = {});
s[e][++o] = [ t, i, n ];
return [ e, o ];
}
function c(e, t) {
for (var i in e) l(e, i) && t(i, e[i]);
}
function h(i, n) {
l(s, i) && c(s[i], function(e, t) {
t[0].apply(t[2], n);
t[1] && delete s[i][e];
});
}
return {
on: function(e, t, i) {
return n(e, t, 0, i);
},
one: function(e, t, i) {
return n(e, t, 1, i);
},
un: function(n) {
var e, t, o = !1, i = "undefined" == typeof n ? "undefined" : u(n);
if (i === r) {
if (l(s, n)) {
delete s[n];
return !0;
}
return !1;
}
if ("object" === i) {
e = n[0];
t = n[1];
if (l(s, e) && l(s[e], t)) {
delete s[e][t];
return !0;
}
return !1;
}
if (i === a) {
c(s, function(i, e) {
c(e, function(e, t) {
if (t[0] === n) {
delete s[i][e];
o = !0;
}
});
});
return o;
}
return !0;
},
fire: function(e) {
var t = i(arguments, 1);
setTimeout(function() {
h(e, t);
});
},
fireSync: function(e) {
h(e, i(arguments, 1));
},
clear: function() {
s = {};
}
};
}, "object" === ("undefined" == typeof t ? "undefined" : u(t)) && t.exports ? t.exports = o() : n.onfire = o();
cc._RF.pop();
}, {} ],
protobuf: [ function(f, n, e) {
(function(t) {
"use strict";
cc._RF.push(n, "2644d2E2tFAa5HBe85eoAoB", "protobuf");
var e, i, S = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
e = void 0, i = function(w, e) {
var o = {};
o.ByteBuffer = w;
o.Long = w.Long || null;
o.VERSION = "5.0.1";
o.WIRE_TYPES = {};
o.WIRE_TYPES.VARINT = 0;
o.WIRE_TYPES.BITS64 = 1;
o.WIRE_TYPES.LDELIM = 2;
o.WIRE_TYPES.STARTGROUP = 3;
o.WIRE_TYPES.ENDGROUP = 4;
o.WIRE_TYPES.BITS32 = 5;
o.PACKABLE_WIRE_TYPES = [ o.WIRE_TYPES.VARINT, o.WIRE_TYPES.BITS64, o.WIRE_TYPES.BITS32 ];
o.TYPES = {
int32: {
name: "int32",
wireType: o.WIRE_TYPES.VARINT,
defaultValue: 0
},
uint32: {
name: "uint32",
wireType: o.WIRE_TYPES.VARINT,
defaultValue: 0
},
sint32: {
name: "sint32",
wireType: o.WIRE_TYPES.VARINT,
defaultValue: 0
},
int64: {
name: "int64",
wireType: o.WIRE_TYPES.VARINT,
defaultValue: o.Long ? o.Long.ZERO : void 0
},
uint64: {
name: "uint64",
wireType: o.WIRE_TYPES.VARINT,
defaultValue: o.Long ? o.Long.UZERO : void 0
},
sint64: {
name: "sint64",
wireType: o.WIRE_TYPES.VARINT,
defaultValue: o.Long ? o.Long.ZERO : void 0
},
bool: {
name: "bool",
wireType: o.WIRE_TYPES.VARINT,
defaultValue: !1
},
double: {
name: "double",
wireType: o.WIRE_TYPES.BITS64,
defaultValue: 0
},
string: {
name: "string",
wireType: o.WIRE_TYPES.LDELIM,
defaultValue: ""
},
bytes: {
name: "bytes",
wireType: o.WIRE_TYPES.LDELIM,
defaultValue: null
},
fixed32: {
name: "fixed32",
wireType: o.WIRE_TYPES.BITS32,
defaultValue: 0
},
sfixed32: {
name: "sfixed32",
wireType: o.WIRE_TYPES.BITS32,
defaultValue: 0
},
fixed64: {
name: "fixed64",
wireType: o.WIRE_TYPES.BITS64,
defaultValue: o.Long ? o.Long.UZERO : void 0
},
sfixed64: {
name: "sfixed64",
wireType: o.WIRE_TYPES.BITS64,
defaultValue: o.Long ? o.Long.ZERO : void 0
},
float: {
name: "float",
wireType: o.WIRE_TYPES.BITS32,
defaultValue: 0
},
enum: {
name: "enum",
wireType: o.WIRE_TYPES.VARINT,
defaultValue: 0
},
message: {
name: "message",
wireType: o.WIRE_TYPES.LDELIM,
defaultValue: null
},
group: {
name: "group",
wireType: o.WIRE_TYPES.STARTGROUP,
defaultValue: null
}
};
o.MAP_KEY_TYPES = [ o.TYPES.int32, o.TYPES.sint32, o.TYPES.sfixed32, o.TYPES.uint32, o.TYPES.fixed32, o.TYPES.int64, o.TYPES.sint64, o.TYPES.sfixed64, o.TYPES.uint64, o.TYPES.fixed64, o.TYPES.bool, o.TYPES.string, o.TYPES.bytes ];
o.ID_MIN = 1;
o.ID_MAX = 536870911;
o.convertFieldsToCamelCase = !1;
o.populateAccessors = !0;
o.populateDefaults = !0;
o.Util = function() {
var o = {};
o.IS_NODE = !("object" !== ("undefined" == typeof t ? "undefined" : S(t)) || t + "" != "[object process]" || t.browser);
o.XHR = function() {
for (var e = [ function() {
return new XMLHttpRequest();
}, function() {
return new ActiveXObject("Msxml2.XMLHTTP");
}, function() {
return new ActiveXObject("Msxml3.XMLHTTP");
}, function() {
return new ActiveXObject("Microsoft.XMLHTTP");
} ], t = null, i = 0; i < e.length; i++) {
try {
t = e[i]();
} catch (e) {
continue;
}
break;
}
if (!t) throw Error("XMLHttpRequest is not supported");
return t;
};
o.fetch = function(e, i) {
i && "function" != typeof i && (i = null);
if (o.IS_NODE) {
var t = f("fs");
if (i) t.readFile(e, function(e, t) {
i(e ? null : "" + t);
}); else try {
return t.readFileSync(e);
} catch (e) {
return null;
}
} else {
var n = o.XHR();
n.open("GET", e, !!i);
n.setRequestHeader("Accept", "text/plain");
"function" == typeof n.overrideMimeType && n.overrideMimeType("text/plain");
if (!i) {
n.send(null);
return 200 == n.status || 0 == n.status && "string" == typeof n.responseText ? n.responseText : null;
}
n.onreadystatechange = function() {
4 == n.readyState && (200 == n.status || 0 == n.status && "string" == typeof n.responseText ? i(n.responseText) : i(null));
};
if (4 == n.readyState) return;
n.send(null);
}
};
o.toCamelCase = function(e) {
return e.replace(/_([a-zA-Z])/g, function(e, t) {
return t.toUpperCase();
});
};
return o;
}();
o.Lang = {
DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
RULE: /^(?:required|optional|repeated|map)$/,
TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
NUMBER_OCT: /^0[0-7]+$/,
NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
BOOL: /^(?:true|false)$/i,
ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
WHITESPACE: /\s/,
STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
};
o.DotProto = function(o, r) {
var e = {}, t = function(e) {
this.source = e + "";
this.index = 0;
this.line = 1;
this.stack = [];
this._stringOpen = null;
}, i = t.prototype;
i._readString = function() {
var e = '"' === this._stringOpen ? r.STRING_DQ : r.STRING_SQ;
e.lastIndex = this.index - 1;
var t = e.exec(this.source);
if (!t) throw Error("unterminated string");
this.index = e.lastIndex;
this.stack.push(this._stringOpen);
this._stringOpen = null;
return t[1];
};
i.next = function() {
if (0 < this.stack.length) return this.stack.shift();
if (this.index >= this.source.length) return null;
if (null !== this._stringOpen) return this._readString();
var e, t, i;
do {
e = !1;
for (;r.WHITESPACE.test(i = this.source.charAt(this.index)); ) {
"\n" === i && ++this.line;
if (++this.index === this.source.length) return null;
}
if ("/" === this.source.charAt(this.index)) {
++this.index;
if ("/" === this.source.charAt(this.index)) {
for (;"\n" !== this.source.charAt(++this.index); ) if (this.index == this.source.length) return null;
++this.index;
++this.line;
e = !0;
} else {
if ("*" !== (i = this.source.charAt(this.index))) return "/";
do {
"\n" === i && ++this.line;
if (++this.index === this.source.length) return null;
t = i;
i = this.source.charAt(this.index);
} while ("*" !== t || "/" !== i);
++this.index;
e = !0;
}
}
} while (e);
if (this.index === this.source.length) return null;
var n = this.index;
r.DELIM.lastIndex = 0;
if (!r.DELIM.test(this.source.charAt(n++))) for (;n < this.source.length && !r.DELIM.test(this.source.charAt(n)); ) ++n;
var o = this.source.substring(this.index, this.index = n);
'"' !== o && "'" !== o || (this._stringOpen = o);
return o;
};
i.peek = function() {
if (0 === this.stack.length) {
var e = this.next();
if (null === e) return null;
this.stack.push(e);
}
return this.stack[0];
};
i.skip = function(e) {
var t = this.next();
if (t !== e) throw Error("illegal '" + t + "', '" + e + "' expected");
};
i.omit = function(e) {
if (this.peek() === e) {
this.next();
return !0;
}
return !1;
};
i.toString = function() {
return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")";
};
e.Tokenizer = t;
var n = function(e) {
this.tn = new t(e);
this.proto3 = !1;
}, s = n.prototype;
s.parse = function() {
var e, t, i = {
name: "[ROOT]",
package: null,
messages: [],
enums: [],
imports: [],
options: {},
services: []
}, n = !0;
try {
for (;e = this.tn.next(); ) switch (e) {
case "package":
if (!n || null !== i.package) throw Error("unexpected 'package'");
e = this.tn.next();
if (!r.TYPEREF.test(e)) throw Error("illegal package name: " + e);
this.tn.skip(";");
i.package = e;
break;

case "import":
if (!n) throw Error("unexpected 'import'");
("public" === (e = this.tn.peek()) || (t = "weak" === e)) && this.tn.next();
e = this._readString();
this.tn.skip(";");
t || i.imports.push(e);
break;

case "syntax":
if (!n) throw Error("unexpected 'syntax'");
this.tn.skip("=");
"proto3" === (i.syntax = this._readString()) && (this.proto3 = !0);
this.tn.skip(";");
break;

case "message":
this._parseMessage(i, null);
n = !1;
break;

case "enum":
this._parseEnum(i);
n = !1;
break;

case "option":
this._parseOption(i);
break;

case "service":
this._parseService(i);
break;

case "extend":
this._parseExtend(i);
break;

default:
throw Error("unexpected '" + e + "'");
}
} catch (e) {
e.message = "Parse error at line " + this.tn.line + ": " + e.message;
throw e;
}
delete i.name;
return i;
};
n.parse = function(e) {
return new n(e).parse();
};
function a(e, t) {
var i = -1, n = 1;
if ("-" == e.charAt(0)) {
n = -1;
e = e.substring(1);
}
if (r.NUMBER_DEC.test(e)) i = parseInt(e); else if (r.NUMBER_HEX.test(e)) i = parseInt(e.substring(2), 16); else {
if (!r.NUMBER_OCT.test(e)) throw Error("illegal id value: " + (n < 0 ? "-" : "") + e);
i = parseInt(e.substring(1), 8);
}
i = n * i | 0;
if (!t && i < 0) throw Error("illegal id value: " + (n < 0 ? "-" : "") + e);
return i;
}
function l(e) {
var t = 1;
if ("-" == e.charAt(0)) {
t = -1;
e = e.substring(1);
}
if (r.NUMBER_DEC.test(e)) return t * parseInt(e, 10);
if (r.NUMBER_HEX.test(e)) return t * parseInt(e.substring(2), 16);
if (r.NUMBER_OCT.test(e)) return t * parseInt(e.substring(1), 8);
if ("inf" === e) return Infinity * t;
if ("nan" === e) return NaN;
if (r.NUMBER_FLT.test(e)) return t * parseFloat(e);
throw Error("illegal number value: " + (t < 0 ? "-" : "") + e);
}
s._readString = function() {
var e, t, i = "";
do {
if ("'" !== (t = this.tn.next()) && '"' !== t) throw Error("illegal string delimiter: " + t);
i += this.tn.next();
this.tn.skip(t);
e = this.tn.peek();
} while ('"' === e || '"' === e);
return i;
};
s._readValue = function(e) {
var t = this.tn.peek();
if ('"' === t || "'" === t) return this._readString();
this.tn.next();
if (r.NUMBER.test(t)) return l(t);
if (r.BOOL.test(t)) return "true" === t.toLowerCase();
if (e && r.TYPEREF.test(t)) return t;
throw Error("illegal value: " + t);
};
s._parseOption = function(e, t) {
var i = this.tn.next(), n = !1;
if ("(" === i) {
n = !0;
i = this.tn.next();
}
if (!r.TYPEREF.test(i)) throw Error("illegal option name: " + i);
var o = i;
if (n) {
this.tn.skip(")");
o = "(" + o + ")";
i = this.tn.peek();
if (r.FQTYPEREF.test(i)) {
o += i;
this.tn.next();
}
}
this.tn.skip("=");
this._parseOptionValue(e, o);
t || this.tn.skip(";");
};
function c(e, t, i) {
if ("undefined" == typeof e[t]) e[t] = i; else {
Array.isArray(e[t]) || (e[t] = [ e[t] ]);
e[t].push(i);
}
}
s._parseOptionValue = function(e, t) {
var i = this.tn.peek();
if ("{" !== i) c(e.options, t, this._readValue(!0)); else {
this.tn.skip("{");
for (;"}" !== (i = this.tn.next()); ) {
if (!r.NAME.test(i)) throw Error("illegal option name: " + t + "." + i);
this.tn.omit(":") ? c(e.options, t + "." + i, this._readValue(!0)) : this._parseOptionValue(e, t + "." + i);
}
}
};
s._parseService = function(e) {
var t = this.tn.next();
if (!r.NAME.test(t)) throw Error("illegal service name at line " + this.tn.line + ": " + t);
var i = {
name: t,
rpc: {},
options: {}
};
this.tn.skip("{");
for (;"}" !== (t = this.tn.next()); ) if ("option" === t) this._parseOption(i); else {
if ("rpc" !== t) throw Error("illegal service token: " + t);
this._parseServiceRPC(i);
}
this.tn.omit(";");
e.services.push(i);
};
s._parseServiceRPC = function(e) {
var t = this.tn.next();
if (!r.NAME.test(t)) throw Error("illegal rpc service method name: " + t);
var i = t, n = {
request: null,
response: null,
request_stream: !1,
response_stream: !1,
options: {}
};
this.tn.skip("(");
if ("stream" === (t = this.tn.next()).toLowerCase()) {
n.request_stream = !0;
t = this.tn.next();
}
if (!r.TYPEREF.test(t)) throw Error("illegal rpc service request type: " + t);
n.request = t;
this.tn.skip(")");
if ("returns" !== (t = this.tn.next()).toLowerCase()) throw Error("illegal rpc service request type delimiter: " + t);
this.tn.skip("(");
if ("stream" === (t = this.tn.next()).toLowerCase()) {
n.response_stream = !0;
t = this.tn.next();
}
n.response = t;
this.tn.skip(")");
if ("{" === (t = this.tn.peek())) {
this.tn.next();
for (;"}" !== (t = this.tn.next()); ) {
if ("option" !== t) throw Error("illegal rpc service token: " + t);
this._parseOption(n);
}
this.tn.omit(";");
} else this.tn.skip(";");
"undefined" == typeof e.rpc && (e.rpc = {});
e.rpc[i] = n;
};
s._parseMessage = function(e, t) {
var i = !!t, n = this.tn.next(), o = {
name: "",
fields: [],
enums: [],
messages: [],
options: {},
services: [],
oneofs: {}
};
if (!r.NAME.test(n)) throw Error("illegal " + (i ? "group" : "message") + " name: " + n);
o.name = n;
if (i) {
this.tn.skip("=");
t.id = a(this.tn.next());
o.isGroup = !0;
}
"[" === (n = this.tn.peek()) && t && this._parseFieldOptions(t);
this.tn.skip("{");
for (;"}" !== (n = this.tn.next()); ) if (r.RULE.test(n)) this._parseMessageField(o, n); else if ("oneof" === n) this._parseMessageOneOf(o); else if ("enum" === n) this._parseEnum(o); else if ("message" === n) this._parseMessage(o); else if ("option" === n) this._parseOption(o); else if ("service" === n) this._parseService(o); else if ("extensions" === n) o.hasOwnProperty("extensions") ? o.extensions = o.extensions.concat(this._parseExtensionRanges()) : o.extensions = this._parseExtensionRanges(); else if ("reserved" === n) this._parseIgnored(); else if ("extend" === n) this._parseExtend(o); else {
if (!r.TYPEREF.test(n)) throw Error("illegal message token: " + n);
if (!this.proto3) throw Error("illegal field rule: " + n);
this._parseMessageField(o, "optional", n);
}
this.tn.omit(";");
e.messages.push(o);
return o;
};
s._parseIgnored = function() {
for (;";" !== this.tn.peek(); ) this.tn.next();
this.tn.skip(";");
};
s._parseMessageField = function(e, t, i) {
if (!r.RULE.test(t)) throw Error("illegal message field rule: " + t);
var n, o = {
rule: t,
type: "",
name: "",
options: {},
id: 0
};
if ("map" === t) {
if (i) throw Error("illegal type: " + i);
this.tn.skip("<");
n = this.tn.next();
if (!r.TYPE.test(n) && !r.TYPEREF.test(n)) throw Error("illegal message field type: " + n);
o.keytype = n;
this.tn.skip(",");
n = this.tn.next();
if (!r.TYPE.test(n) && !r.TYPEREF.test(n)) throw Error("illegal message field: " + n);
o.type = n;
this.tn.skip(">");
n = this.tn.next();
if (!r.NAME.test(n)) throw Error("illegal message field name: " + n);
o.name = n;
this.tn.skip("=");
o.id = a(this.tn.next());
"[" === (n = this.tn.peek()) && this._parseFieldOptions(o);
this.tn.skip(";");
} else if ("group" === (i = "undefined" != typeof i ? i : this.tn.next())) {
var s = this._parseMessage(e, o);
if (!/^[A-Z]/.test(s.name)) throw Error("illegal group name: " + s.name);
o.type = s.name;
o.name = s.name.toLowerCase();
this.tn.omit(";");
} else {
if (!r.TYPE.test(i) && !r.TYPEREF.test(i)) throw Error("illegal message field type: " + i);
o.type = i;
n = this.tn.next();
if (!r.NAME.test(n)) throw Error("illegal message field name: " + n);
o.name = n;
this.tn.skip("=");
o.id = a(this.tn.next());
"[" === (n = this.tn.peek()) && this._parseFieldOptions(o);
this.tn.skip(";");
}
e.fields.push(o);
return o;
};
s._parseMessageOneOf = function(e) {
var t = this.tn.next();
if (!r.NAME.test(t)) throw Error("illegal oneof name: " + t);
var i, n = t, o = [];
this.tn.skip("{");
for (;"}" !== (t = this.tn.next()); ) {
(i = this._parseMessageField(e, "optional", t)).oneof = n;
o.push(i.id);
}
this.tn.omit(";");
e.oneofs[n] = o;
};
s._parseFieldOptions = function(e) {
this.tn.skip("[");
for (var t = !0; "]" !== this.tn.peek(); ) {
t || this.tn.skip(",");
this._parseOption(e, !0);
t = !1;
}
this.tn.next();
};
s._parseEnum = function(e) {
var t = {
name: "",
values: [],
options: {}
}, i = this.tn.next();
if (!r.NAME.test(i)) throw Error("illegal name: " + i);
t.name = i;
this.tn.skip("{");
for (;"}" !== (i = this.tn.next()); ) if ("option" === i) this._parseOption(t); else {
if (!r.NAME.test(i)) throw Error("illegal name: " + i);
this.tn.skip("=");
var n = {
name: i,
id: a(this.tn.next(), !0)
};
"[" === (i = this.tn.peek()) && this._parseFieldOptions({
options: {}
});
this.tn.skip(";");
t.values.push(n);
}
this.tn.omit(";");
e.enums.push(t);
};
s._parseExtensionRanges = function() {
var e, t, i, n = [];
do {
t = [];
for (;;) {
switch (e = this.tn.next()) {
case "min":
i = o.ID_MIN;
break;

case "max":
i = o.ID_MAX;
break;

default:
i = l(e);
}
t.push(i);
if (2 === t.length) break;
if ("to" !== this.tn.peek()) {
t.push(i);
break;
}
this.tn.next();
}
n.push(t);
} while (this.tn.omit(","));
this.tn.skip(";");
return n;
};
s._parseExtend = function(e) {
var t = this.tn.next();
if (!r.TYPEREF.test(t)) throw Error("illegal extend reference: " + t);
var i = {
ref: t,
fields: []
};
this.tn.skip("{");
for (;"}" !== (t = this.tn.next()); ) if (r.RULE.test(t)) this._parseMessageField(i, t); else {
if (!r.TYPEREF.test(t)) throw Error("illegal extend token: " + t);
if (!this.proto3) throw Error("illegal field rule: " + t);
this._parseMessageField(i, "optional", t);
}
this.tn.omit(";");
e.messages.push(i);
return i;
};
s.toString = function() {
return "Parser at line " + this.tn.line;
};
e.Parser = n;
return e;
}(o, o.Lang);
o.Reflect = function(m) {
var r = {}, h = function(e, t, i) {
this.builder = e;
this.parent = t;
this.name = i;
this.className;
}, e = h.prototype;
e.fqn = function() {
for (var e = this.name, t = this; ;) {
if (null == (t = t.parent)) break;
e = t.name + "." + e;
}
return e;
};
e.toString = function(e) {
return (e ? this.className + " " : "") + this.fqn();
};
e.build = function() {
throw Error(this.toString(!0) + " cannot be built directly");
};
r.T = h;
var a = function(e, t, i, n, o) {
h.call(this, e, t, i);
this.className = "Namespace";
this.children = [];
this.options = n || {};
this.syntax = o || "proto2";
}, t = a.prototype = Object.create(h.prototype);
t.getChildren = function(e) {
if (null == (e = e || null)) return this.children.slice();
for (var t = [], i = 0, n = this.children.length; i < n; ++i) this.children[i] instanceof e && t.push(this.children[i]);
return t;
};
t.addChild = function(e) {
var t;
if (t = this.getChild(e.name)) if (t instanceof f.Field && t.name !== t.originalName && null === this.getChild(t.originalName)) t.name = t.originalName; else {
if (!(e instanceof f.Field && e.name !== e.originalName && null === this.getChild(e.originalName))) throw Error("Duplicate name in namespace " + this.toString(!0) + ": " + e.name);
e.name = e.originalName;
}
this.children.push(e);
};
t.getChild = function(e) {
for (var t = "number" == typeof e ? "id" : "name", i = 0, n = this.children.length; i < n; ++i) if (this.children[i][t] === e) return this.children[i];
return null;
};
t.resolve = function(e, t) {
var i, n = "string" == typeof e ? e.split(".") : e, o = this, s = 0;
if ("" === n[s]) {
for (;null !== o.parent; ) o = o.parent;
s++;
}
do {
do {
if (!(o instanceof r.Namespace)) {
o = null;
break;
}
if (!(i = o.getChild(n[s])) || !(i instanceof r.T) || t && !(i instanceof r.Namespace)) {
o = null;
break;
}
o = i;
s++;
} while (s < n.length);
if (null != o) break;
if (null !== this.parent) return this.parent.resolve(e, t);
} while (null != o);
return o;
};
t.qn = function(e) {
var t = [], i = e;
do {
t.unshift(i.name);
i = i.parent;
} while (null !== i);
for (var n = 1; n <= t.length; n++) {
var o = t.slice(t.length - n);
if (e === this.resolve(o, e instanceof r.Namespace)) return o.join(".");
}
return e.fqn();
};
t.build = function() {
for (var e, t = {}, i = this.children, n = 0, o = i.length; n < o; ++n) (e = i[n]) instanceof a && (t[e.name] = e.build());
Object.defineProperty && Object.defineProperty(t, "$options", {
value: this.buildOpt()
});
return t;
};
t.buildOpt = function() {
for (var e = {}, t = Object.keys(this.options), i = 0, n = t.length; i < n; ++i) {
var o = t[i], s = this.options[t[i]];
e[o] = s;
}
return e;
};
t.getOption = function(e) {
return "undefined" == typeof e ? this.options : "undefined" != typeof this.options[e] ? this.options[e] : null;
};
r.Namespace = a;
var u = function(e, t, i, n, o) {
this.type = e;
this.resolvedType = t;
this.isMapKey = i;
this.syntax = n;
this.name = o;
if (i && m.MAP_KEY_TYPES.indexOf(e) < 0) throw Error("Invalid map key type: " + e.name);
}, i = u.prototype;
u.defaultFieldValue = function(e) {
"string" == typeof e && (e = m.TYPES[e]);
if ("undefined" == typeof e.defaultValue) throw Error("default value for type " + e.name + " is not supported");
return e == m.TYPES.bytes ? new w(0) : e.defaultValue;
};
function l(e, t) {
if (e && "number" == typeof e.low && "number" == typeof e.high && "boolean" == typeof e.unsigned && e.low == e.low && e.high == e.high) return new m.Long(e.low, e.high, "undefined" == typeof t ? e.unsigned : t);
if ("string" == typeof e) return m.Long.fromString(e, t || !1, 10);
if ("number" == typeof e) return m.Long.fromNumber(e, t || !1);
throw Error("not convertible to Long");
}
i.toString = function() {
return (this.name || "") + (this.isMapKey ? "map" : "value") + " element";
};
i.verifyValue = function(t) {
var i = this;
function n(e, t) {
throw Error("Illegal value for " + i.toString(!0) + " of type " + i.type.name + ": " + e + " (" + t + ")");
}
switch (this.type) {
case m.TYPES.int32:
case m.TYPES.sint32:
case m.TYPES.sfixed32:
("number" != typeof t || t == t && t % 1 != 0) && n("undefined" == typeof t ? "undefined" : S(t), "not an integer");
return 4294967295 < t ? 0 | t : t;

case m.TYPES.uint32:
case m.TYPES.fixed32:
("number" != typeof t || t == t && t % 1 != 0) && n("undefined" == typeof t ? "undefined" : S(t), "not an integer");
return t < 0 ? t >>> 0 : t;

case m.TYPES.int64:
case m.TYPES.sint64:
case m.TYPES.sfixed64:
if (m.Long) try {
return l(t, !1);
} catch (e) {
n("undefined" == typeof t ? "undefined" : S(t), e.message);
} else n("undefined" == typeof t ? "undefined" : S(t), "requires Long.js");

case m.TYPES.uint64:
case m.TYPES.fixed64:
if (m.Long) try {
return l(t, !0);
} catch (e) {
n("undefined" == typeof t ? "undefined" : S(t), e.message);
} else n("undefined" == typeof t ? "undefined" : S(t), "requires Long.js");

case m.TYPES.bool:
"boolean" != typeof t && n("undefined" == typeof t ? "undefined" : S(t), "not a boolean");
return t;

case m.TYPES.float:
case m.TYPES.double:
"number" != typeof t && n("undefined" == typeof t ? "undefined" : S(t), "not a number");
return t;

case m.TYPES.string:
"string" == typeof t || t && t instanceof String || n("undefined" == typeof t ? "undefined" : S(t), "not a string");
return "" + t;

case m.TYPES.bytes:
return w.isByteBuffer(t) ? t : w.wrap(t, "base64");

case m.TYPES.enum:
var e = this.resolvedType.getChildren(m.Reflect.Enum.Value);
for (s = 0; s < e.length; s++) {
if (e[s].name == t) return e[s].id;
if (e[s].id == t) return e[s].id;
}
if ("proto3" === this.syntax) {
("number" != typeof t || t == t && t % 1 != 0) && n("undefined" == typeof t ? "undefined" : S(t), "not an integer");
(4294967295 < t || t < 0) && n("undefined" == typeof t ? "undefined" : S(t), "not in range for uint32");
return t;
}
n(t, "not a valid enum value");

case m.TYPES.group:
case m.TYPES.message:
t && "object" === ("undefined" == typeof t ? "undefined" : S(t)) || n("undefined" == typeof t ? "undefined" : S(t), "object expected");
if (t instanceof this.resolvedType.clazz) return t;
if (t instanceof m.Builder.Message) {
var o = {};
for (var s in t) t.hasOwnProperty(s) && (o[s] = t[s]);
t = o;
}
return new this.resolvedType.clazz(t);
}
throw Error("[INTERNAL] Illegal value for " + this.toString(!0) + ": " + t + " (undefined type " + this.type + ")");
};
i.calculateLength = function(e, t) {
if (null === t) return 0;
var i;
switch (this.type) {
case m.TYPES.int32:
return t < 0 ? w.calculateVarint64(t) : w.calculateVarint32(t);

case m.TYPES.uint32:
return w.calculateVarint32(t);

case m.TYPES.sint32:
return w.calculateVarint32(w.zigZagEncode32(t));

case m.TYPES.fixed32:
case m.TYPES.sfixed32:
case m.TYPES.float:
return 4;

case m.TYPES.int64:
case m.TYPES.uint64:
return w.calculateVarint64(t);

case m.TYPES.sint64:
return w.calculateVarint64(w.zigZagEncode64(t));

case m.TYPES.fixed64:
case m.TYPES.sfixed64:
return 8;

case m.TYPES.bool:
return 1;

case m.TYPES.enum:
return w.calculateVarint32(t);

case m.TYPES.double:
return 8;

case m.TYPES.string:
i = w.calculateUTF8Bytes(t);
return w.calculateVarint32(i) + i;

case m.TYPES.bytes:
if (t.remaining() < 0) throw Error("Illegal value for " + this.toString(!0) + ": " + t.remaining() + " bytes remaining");
return w.calculateVarint32(t.remaining()) + t.remaining();

case m.TYPES.message:
i = this.resolvedType.calculate(t);
return w.calculateVarint32(i) + i;

case m.TYPES.group:
return (i = this.resolvedType.calculate(t)) + w.calculateVarint32(e << 3 | m.WIRE_TYPES.ENDGROUP);
}
throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + t + " (unknown type)");
};
i.encodeValue = function(e, t, i) {
if (null === t) return i;
switch (this.type) {
case m.TYPES.int32:
t < 0 ? i.writeVarint64(t) : i.writeVarint32(t);
break;

case m.TYPES.uint32:
i.writeVarint32(t);
break;

case m.TYPES.sint32:
i.writeVarint32ZigZag(t);
break;

case m.TYPES.fixed32:
i.writeUint32(t);
break;

case m.TYPES.sfixed32:
i.writeInt32(t);
break;

case m.TYPES.int64:
case m.TYPES.uint64:
i.writeVarint64(t);
break;

case m.TYPES.sint64:
i.writeVarint64ZigZag(t);
break;

case m.TYPES.fixed64:
i.writeUint64(t);
break;

case m.TYPES.sfixed64:
i.writeInt64(t);
break;

case m.TYPES.bool:
"string" == typeof t ? i.writeVarint32("false" === t.toLowerCase() ? 0 : !!t) : i.writeVarint32(t ? 1 : 0);
break;

case m.TYPES.enum:
i.writeVarint32(t);
break;

case m.TYPES.float:
i.writeFloat32(t);
break;

case m.TYPES.double:
i.writeFloat64(t);
break;

case m.TYPES.string:
i.writeVString(t);
break;

case m.TYPES.bytes:
if (t.remaining() < 0) throw Error("Illegal value for " + this.toString(!0) + ": " + t.remaining() + " bytes remaining");
var n = t.offset;
i.writeVarint32(t.remaining());
i.append(t);
t.offset = n;
break;

case m.TYPES.message:
var o = new w().LE();
this.resolvedType.encode(t, o);
i.writeVarint32(o.offset);
i.append(o.flip());
break;

case m.TYPES.group:
this.resolvedType.encode(t, i);
i.writeVarint32(e << 3 | m.WIRE_TYPES.ENDGROUP);
break;

default:
throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + t + " (unknown type)");
}
return i;
};
i.decode = function(e, t, i) {
if (t != this.type.wireType) throw Error("Unexpected wire type for element");
var n, o;
switch (this.type) {
case m.TYPES.int32:
return 0 | e.readVarint32();

case m.TYPES.uint32:
return e.readVarint32() >>> 0;

case m.TYPES.sint32:
return 0 | e.readVarint32ZigZag();

case m.TYPES.fixed32:
return e.readUint32() >>> 0;

case m.TYPES.sfixed32:
return 0 | e.readInt32();

case m.TYPES.int64:
return e.readVarint64();

case m.TYPES.uint64:
return e.readVarint64().toUnsigned();

case m.TYPES.sint64:
return e.readVarint64ZigZag();

case m.TYPES.fixed64:
return e.readUint64();

case m.TYPES.sfixed64:
return e.readInt64();

case m.TYPES.bool:
return !!e.readVarint32();

case m.TYPES.enum:
return e.readVarint32();

case m.TYPES.float:
return e.readFloat();

case m.TYPES.double:
return e.readDouble();

case m.TYPES.string:
return e.readVString();

case m.TYPES.bytes:
o = e.readVarint32();
if (e.remaining() < o) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + o + " required but got only " + e.remaining());
(n = e.clone()).limit = n.offset + o;
e.offset += o;
return n;

case m.TYPES.message:
o = e.readVarint32();
return this.resolvedType.decode(e, o);

case m.TYPES.group:
return this.resolvedType.decode(e, -1, i);
}
throw Error("[INTERNAL] Illegal decode type");
};
i.valueFromString = function(e) {
if (!this.isMapKey) throw Error("valueFromString() called on non-map-key element");
switch (this.type) {
case m.TYPES.int32:
case m.TYPES.sint32:
case m.TYPES.sfixed32:
case m.TYPES.uint32:
case m.TYPES.fixed32:
return this.verifyValue(parseInt(e));

case m.TYPES.int64:
case m.TYPES.sint64:
case m.TYPES.sfixed64:
case m.TYPES.uint64:
case m.TYPES.fixed64:
return this.verifyValue(e);

case m.TYPES.bool:
return "true" === e;

case m.TYPES.string:
return this.verifyValue(e);

case m.TYPES.bytes:
return w.fromBinary(e);
}
};
i.valueToString = function(e) {
if (!this.isMapKey) throw Error("valueToString() called on non-map-key element");
return this.type === m.TYPES.bytes ? e.toString("binary") : e.toString();
};
r.Element = u;
var f = function(e, t, i, n, o, s) {
a.call(this, e, t, i, n, s);
this.className = "Message";
this.extensions = void 0;
this.clazz = null;
this.isGroup = !!o;
this._fields = null;
this._fieldsById = null;
this._fieldsByName = null;
}, n = f.prototype = Object.create(a.prototype);
n.build = function(e) {
if (this.clazz && !e) return this.clazz;
var t = function(u, a) {
var l = a.getChildren(u.Reflect.Message.Field), c = a.getChildren(u.Reflect.Message.OneOf), n = function e(t, i) {
u.Builder.Message.call(this);
for (var n = 0, o = c.length; n < o; ++n) this[c[n].name] = null;
for (n = 0, o = l.length; n < o; ++n) {
var s = l[n];
this[s.name] = s.repeated ? [] : s.map ? new u.Map(s) : null;
!s.required && "proto3" !== a.syntax || null === s.defaultValue || (this[s.name] = s.defaultValue);
}
if (0 < arguments.length) {
var r;
if (1 !== arguments.length || null === t || "object" !== ("undefined" == typeof t ? "undefined" : S(t)) || !("function" != typeof t.encode || t instanceof e) || Array.isArray(t) || t instanceof u.Map || w.isByteBuffer(t) || t instanceof ArrayBuffer || u.Long && t instanceof u.Long) for (n = 0, 
o = arguments.length; n < o; ++n) "undefined" != typeof (r = arguments[n]) && this.$set(l[n].name, r); else this.$set(t);
}
}, s = n.prototype = Object.create(u.Builder.Message.prototype);
s.add = function(e, t, i) {
var n = a._fieldsByName[e];
if (!i) {
if (!n) throw Error(this + "#" + e + " is undefined");
if (!(n instanceof u.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + n.toString(!0));
if (!n.repeated) throw Error(this + "#" + e + " is not a repeated field");
t = n.verifyValue(t, !0);
}
null === this[e] && (this[e] = []);
this[e].push(t);
return this;
};
s.$add = s.add;
s.set = function(e, t, i) {
if (e && "object" === ("undefined" == typeof e ? "undefined" : S(e))) {
i = t;
for (var n in e) e.hasOwnProperty(n) && "undefined" != typeof (t = e[n]) && this.$set(n, t, i);
return this;
}
var o = a._fieldsByName[e];
if (i) this[e] = t; else {
if (!o) throw Error(this + "#" + e + " is not a field: undefined");
if (!(o instanceof u.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + o.toString(!0));
this[o.name] = t = o.verifyValue(t);
}
if (o && o.oneof) {
var s = this[o.oneof.name];
if (null !== t) {
null !== s && s !== o.name && (this[s] = null);
this[o.oneof.name] = o.name;
} else s === e && (this[o.oneof.name] = null);
}
return this;
};
s.$set = s.set;
s.get = function(e, t) {
if (t) return this[e];
var i = a._fieldsByName[e];
if (!(i && i instanceof u.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: undefined");
if (!(i instanceof u.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + i.toString(!0));
return this[i.name];
};
s.$get = s.get;
for (var e = 0; e < l.length; e++) {
var t = l[e];
t instanceof u.Reflect.Message.ExtensionField || a.builder.options.populateAccessors && function(i) {
var e = i.originalName.replace(/(_[a-zA-Z])/g, function(e) {
return e.toUpperCase().replace("_", "");
});
e = e.substring(0, 1).toUpperCase() + e.substring(1);
var t = i.originalName.replace(/([A-Z])/g, function(e) {
return "_" + e;
}), n = function(e, t) {
this[i.name] = t ? e : i.verifyValue(e);
return this;
}, o = function() {
return this[i.name];
};
null === a.getChild("set" + e) && (s["set" + e] = n);
null === a.getChild("set_" + t) && (s["set_" + t] = n);
null === a.getChild("get" + e) && (s["get" + e] = o);
null === a.getChild("get_" + t) && (s["get_" + t] = o);
}(t);
}
s.encode = function(t, e) {
"boolean" == typeof t && (e = t, t = void 0);
var i = !1;
t || (t = new w(), i = !0);
var n = t.littleEndian;
try {
a.encode(this, t.LE(), e);
return (i ? t.flip() : t).LE(n);
} catch (e) {
t.LE(n);
throw e;
}
};
n.encode = function(e, t, i) {
return new n(e).encode(t, i);
};
s.calculate = function() {
return a.calculate(this);
};
s.encodeDelimited = function(e, t) {
var i = !1;
e || (e = new w(), i = !0);
var n = new w().LE();
a.encode(this, n, t).flip();
e.writeVarint32(n.remaining());
e.append(n);
return i ? e.flip() : e;
};
s.encodeAB = function() {
try {
return this.encode().toArrayBuffer();
} catch (e) {
e.encoded && (e.encoded = e.encoded.toArrayBuffer());
throw e;
}
};
s.toArrayBuffer = s.encodeAB;
s.encodeNB = function() {
try {
return this.encode().toBuffer();
} catch (e) {
e.encoded && (e.encoded = e.encoded.toBuffer());
throw e;
}
};
s.toBuffer = s.encodeNB;
s.encode64 = function() {
try {
return this.encode().toBase64();
} catch (e) {
e.encoded && (e.encoded = e.encoded.toBase64());
throw e;
}
};
s.toBase64 = s.encode64;
s.encodeHex = function() {
try {
return this.encode().toHex();
} catch (e) {
e.encoded && (e.encoded = e.encoded.toHex());
throw e;
}
};
s.toHex = s.encodeHex;
function f(e, i, n, o) {
if (null === e || "object" !== ("undefined" == typeof e ? "undefined" : S(e))) {
if (o && o instanceof u.Reflect.Enum) {
var t = u.Reflect.Enum.getName(o.object, e);
if (null !== t) return t;
}
return e;
}
if (w.isByteBuffer(e)) return i ? e.toBase64() : e.toBuffer();
if (u.Long.isLong(e)) return n ? e.toString() : u.Long.fromValue(e);
var s;
if (Array.isArray(e)) {
s = [];
e.forEach(function(e, t) {
s[t] = f(e, i, n, o);
});
return s;
}
s = {};
if (e instanceof u.Map) {
for (var r = e.entries(), a = r.next(); !a.done; a = r.next()) s[e.keyElem.valueToString(a.value[0])] = f(a.value[1], i, n, e.valueElem.resolvedType);
return s;
}
var l = e.$type, c = void 0;
for (var h in e) e.hasOwnProperty(h) && (l && (c = l.getChild(h)) ? s[h] = f(e[h], i, n, c.resolvedType) : s[h] = f(e[h], i, n));
return s;
}
s.toRaw = function(e, t) {
return f(this, !!e, !!t, this.$type);
};
s.encodeJSON = function() {
return JSON.stringify(f(this, !0, !0, this.$type));
};
n.decode = function(t, e, i) {
"string" == typeof e && (i = e, e = -1);
"string" == typeof t ? t = w.wrap(t, i || "base64") : w.isByteBuffer(t) || (t = w.wrap(t));
var n = t.littleEndian;
try {
var o = a.decode(t.LE(), e);
t.LE(n);
return o;
} catch (e) {
t.LE(n);
throw e;
}
};
n.decodeDelimited = function(t, e) {
"string" == typeof t ? t = w.wrap(t, e || "base64") : w.isByteBuffer(t) || (t = w.wrap(t));
if (t.remaining() < 1) return null;
var i = t.offset, n = t.readVarint32();
if (t.remaining() < n) {
t.offset = i;
return null;
}
try {
var o = a.decode(t.slice(t.offset, t.offset + n).LE());
t.offset += n;
return o;
} catch (e) {
t.offset += n;
throw e;
}
};
n.decode64 = function(e) {
return n.decode(e, "base64");
};
n.decodeHex = function(e) {
return n.decode(e, "hex");
};
n.decodeJSON = function(e) {
return new n(JSON.parse(e));
};
s.toString = function() {
return a.toString();
};
Object.defineProperty && (Object.defineProperty(n, "$options", {
value: a.buildOpt()
}), Object.defineProperty(s, "$options", {
value: n.$options
}), Object.defineProperty(n, "$type", {
value: a
}), Object.defineProperty(s, "$type", {
value: a
}));
return n;
}(m, this);
this._fields = [];
this._fieldsById = {};
this._fieldsByName = {};
for (var i, n = 0, o = this.children.length; n < o; n++) if ((i = this.children[n]) instanceof d || i instanceof f || i instanceof y) {
if (t.hasOwnProperty(i.name)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + i.toString(!0) + " cannot override static property '" + i.name + "'");
t[i.name] = i.build();
} else if (i instanceof f.Field) i.build(), this._fields.push(i), this._fieldsById[i.id] = i, 
this._fieldsByName[i.name] = i; else if (!(i instanceof f.OneOf || i instanceof _)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + this.children[n].toString(!0));
return this.clazz = t;
};
n.encode = function(e, t, i) {
for (var n, o, s = null, r = 0, a = this._fields.length; r < a; ++r) {
o = e[(n = this._fields[r]).name];
n.required && null === o ? null === s && (s = n) : n.encode(i ? o : n.verifyValue(o), t, e);
}
if (null !== s) {
var l = Error("Missing at least one required field for " + this.toString(!0) + ": " + s);
l.encoded = t;
throw l;
}
return t;
};
n.calculate = function(e) {
for (var t, i, n = 0, o = 0, s = this._fields.length; o < s; ++o) {
i = e[(t = this._fields[o]).name];
if (t.required && null === i) throw Error("Missing at least one required field for " + this.toString(!0) + ": " + t);
n += t.calculate(i, e);
}
return n;
};
function g(e, t) {
var i = t.readVarint32(), n = 7 & i, o = i >>> 3;
switch (n) {
case m.WIRE_TYPES.VARINT:
for (;128 == (128 & (i = t.readUint8())); ) ;
break;

case m.WIRE_TYPES.BITS64:
t.offset += 8;
break;

case m.WIRE_TYPES.LDELIM:
i = t.readVarint32();
t.offset += i;
break;

case m.WIRE_TYPES.STARTGROUP:
g(o, t);
break;

case m.WIRE_TYPES.ENDGROUP:
if (o === e) return !1;
throw Error("Illegal GROUPEND after unknown group: " + o + " (" + e + " expected)");

case m.WIRE_TYPES.BITS32:
t.offset += 4;
break;

default:
throw Error("Illegal wire type in unknown group " + e + ": " + n);
}
return !0;
}
n.decode = function(e, t, i) {
"number" != typeof t && (t = -1);
for (var n, o, s, r, a = e.offset, l = new this.clazz(); e.offset < a + t || -1 === t && 0 < e.remaining(); ) {
n = e.readVarint32();
console.log("MessagePrototype.decode tag:", n);
s = n >>> 3;
if ((o = 7 & n) === m.WIRE_TYPES.ENDGROUP) {
if (s !== i) throw Error("Illegal group end indicator for " + this.toString(!0) + ": " + s + " (" + (i ? i + " expected" : "not a group") + ")");
break;
}
if (r = this._fieldsById[s]) if (r.repeated && !r.options.packed) l[r.name].push(r.decode(o, e)); else if (r.map) {
var c = r.decode(o, e);
l[r.name].set(c[0], c[1]);
} else {
l[r.name] = r.decode(o, e);
if (r.oneof) {
var h = l[r.oneof.name];
null !== h && h !== r.name && (l[h] = null);
l[r.oneof.name] = r.name;
}
} else switch (o) {
case m.WIRE_TYPES.VARINT:
e.readVarint32();
break;

case m.WIRE_TYPES.BITS32:
e.offset += 4;
break;

case m.WIRE_TYPES.BITS64:
e.offset += 8;
break;

case m.WIRE_TYPES.LDELIM:
var u = e.readVarint32();
e.offset += u;
break;

case m.WIRE_TYPES.STARTGROUP:
for (;g(s, e); ) ;
break;

default:
throw Error("Illegal wire type for unknown field " + s + " in " + this.toString(!0) + "#decode: " + o);
}
}
for (var f = 0, d = this._fields.length; f < d; ++f) if (null === l[(r = this._fields[f]).name]) if ("proto3" === this.syntax) l[r.name] = r.defaultValue; else {
if (r.required) {
var p = Error("Missing at least one required field for " + this.toString(!0) + ": " + r.name);
p.decoded = l;
throw p;
}
m.populateDefaults && null !== r.defaultValue && (l[r.name] = r.defaultValue);
}
return l;
};
r.Message = f;
var c = function(e, t, i, n, o, s, r, a, l, c) {
h.call(this, e, t, s);
this.className = "Message.Field";
this.required = "required" === i;
this.repeated = "repeated" === i;
this.map = "map" === i;
this.keyType = n || null;
this.type = o;
this.resolvedType = null;
this.id = r;
this.options = a || {};
this.defaultValue = null;
this.oneof = l || null;
this.syntax = c || "proto2";
this.originalName = this.name;
this.element = null;
this.keyElement = null;
!this.builder.options.convertFieldsToCamelCase || this instanceof f.ExtensionField || (this.name = m.Util.toCamelCase(this.name));
}, o = c.prototype = Object.create(h.prototype);
o.build = function() {
this.element = new u(this.type, this.resolvedType, !1, this.syntax, this.name);
this.map && (this.keyElement = new u(this.keyType, void 0, !0, this.syntax, this.name));
"proto3" !== this.syntax || this.repeated || this.map ? "undefined" != typeof this.options.default && (this.defaultValue = this.verifyValue(this.options.default)) : this.defaultValue = u.defaultFieldValue(this.type);
};
o.verifyValue = function(e, t) {
t = t || !1;
var i, n = this;
function o(e, t) {
throw Error("Illegal value for " + n.toString(!0) + " of type " + n.type.name + ": " + e + " (" + t + ")");
}
if (null === e) {
this.required && o("undefined" == typeof e ? "undefined" : S(e), "required");
"proto3" === this.syntax && this.type !== m.TYPES.message && o("undefined" == typeof e ? "undefined" : S(e), "proto3 field without field presence cannot be null");
return null;
}
if (this.repeated && !t) {
Array.isArray(e) || (e = [ e ]);
var s = [];
for (i = 0; i < e.length; i++) s.push(this.element.verifyValue(e[i]));
return s;
}
if (this.map && !t) {
if (e instanceof m.Map) return e;
e instanceof Object || o("undefined" == typeof e ? "undefined" : S(e), "expected ProtoBuf.Map or raw object for map field");
return new m.Map(this, e);
}
!this.repeated && Array.isArray(e) && o("undefined" == typeof e ? "undefined" : S(e), "no array expected");
return this.element.verifyValue(e);
};
o.hasWirePresence = function(e, t) {
if ("proto3" !== this.syntax) return null !== e;
if (this.oneof && t[this.oneof.name] === this.name) return !0;
switch (this.type) {
case m.TYPES.int32:
case m.TYPES.sint32:
case m.TYPES.sfixed32:
case m.TYPES.uint32:
case m.TYPES.fixed32:
return 0 !== e;

case m.TYPES.int64:
case m.TYPES.sint64:
case m.TYPES.sfixed64:
case m.TYPES.uint64:
case m.TYPES.fixed64:
return 0 !== e.low || 0 !== e.high;

case m.TYPES.bool:
return e;

case m.TYPES.float:
case m.TYPES.double:
return 0 !== e;

case m.TYPES.string:
return 0 < e.length;

case m.TYPES.bytes:
return 0 < e.remaining();

case m.TYPES.enum:
return 0 !== e;

case m.TYPES.message:
return null !== e;

default:
return !0;
}
};
o.encode = function(t, o, e) {
if (null === this.type || "object" !== S(this.type)) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
if (null === t || this.repeated && 0 == t.length) return o;
try {
if (this.repeated) {
var i;
if (this.options.packed && 0 <= m.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType)) {
o.writeVarint32(this.id << 3 | m.WIRE_TYPES.LDELIM);
o.ensureCapacity(o.offset += 1);
var n = o.offset;
for (i = 0; i < t.length; i++) this.element.encodeValue(this.id, t[i], o);
var s = o.offset - n, r = w.calculateVarint32(s);
if (1 < r) {
var a = o.slice(n, o.offset);
n += r - 1;
o.offset = n;
o.append(a);
}
o.writeVarint32(s, n - r);
} else for (i = 0; i < t.length; i++) o.writeVarint32(this.id << 3 | this.type.wireType), 
this.element.encodeValue(this.id, t[i], o);
} else if (this.map) t.forEach(function(e, t, i) {
var n = w.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, t) + w.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, e);
o.writeVarint32(this.id << 3 | m.WIRE_TYPES.LDELIM);
o.writeVarint32(n);
o.writeVarint32(8 | this.keyType.wireType);
this.keyElement.encodeValue(1, t, o);
o.writeVarint32(16 | this.type.wireType);
this.element.encodeValue(2, e, o);
}, this); else if (this.hasWirePresence(t, e)) {
o.writeVarint32(this.id << 3 | this.type.wireType);
this.element.encodeValue(this.id, t, o);
}
} catch (e) {
throw Error("Illegal value for " + this.toString(!0) + ": " + t + " (" + e + ")");
}
return o;
};
o.calculate = function(t, e) {
t = this.verifyValue(t);
if (null === this.type || "object" !== S(this.type)) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
if (null === t || this.repeated && 0 == t.length) return 0;
var o = 0;
try {
if (this.repeated) {
var i, n;
if (this.options.packed && 0 <= m.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType)) {
o += w.calculateVarint32(this.id << 3 | m.WIRE_TYPES.LDELIM);
for (i = n = 0; i < t.length; i++) n += this.element.calculateLength(this.id, t[i]);
o += w.calculateVarint32(n);
o += n;
} else for (i = 0; i < t.length; i++) o += w.calculateVarint32(this.id << 3 | this.type.wireType), 
o += this.element.calculateLength(this.id, t[i]);
} else if (this.map) t.forEach(function(e, t, i) {
var n = w.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, t) + w.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, e);
o += w.calculateVarint32(this.id << 3 | m.WIRE_TYPES.LDELIM);
o += w.calculateVarint32(n);
o += n;
}, this); else if (this.hasWirePresence(t, e)) {
o += w.calculateVarint32(this.id << 3 | this.type.wireType);
o += this.element.calculateLength(this.id, t);
}
} catch (e) {
throw Error("Illegal value for " + this.toString(!0) + ": " + t + " (" + e + ")");
}
return o;
};
o.decode = function(e, t, i) {
var n, o;
if (!(!this.map && e == this.type.wireType || !i && this.repeated && this.options.packed && e == m.WIRE_TYPES.LDELIM || this.map && e == m.WIRE_TYPES.LDELIM)) throw Error("Illegal wire type for field " + this.toString(!0) + ": " + e + " (" + this.type.wireType + " expected)");
if (e == m.WIRE_TYPES.LDELIM && this.repeated && this.options.packed && 0 <= m.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) && !i) {
o = t.readVarint32();
o = t.offset + o;
for (var s = []; t.offset < o; ) s.push(this.decode(this.type.wireType, t, !0));
return s;
}
if (this.map) {
var r = u.defaultFieldValue(this.keyType);
n = u.defaultFieldValue(this.type);
o = t.readVarint32();
if (t.remaining() < o) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + o + " required but got only " + t.remaining());
var a = t.clone();
a.limit = a.offset + o;
t.offset += o;
for (;0 < a.remaining(); ) {
var l = a.readVarint32();
e = 7 & l;
var c = l >>> 3;
if (1 === c) r = this.keyElement.decode(a, e, c); else {
if (2 !== c) throw Error("Unexpected tag in map field key/value submessage");
n = this.element.decode(a, e, c);
}
}
return [ r, n ];
}
return this.element.decode(t, e, this.id);
};
r.Message.Field = c;
var s = function(e, t, i, n, o, s, r) {
c.call(this, e, t, i, null, n, o, s, r);
this.extension;
};
s.prototype = Object.create(c.prototype);
r.Message.ExtensionField = s;
r.Message.OneOf = function(e, t, i) {
h.call(this, e, t, i);
this.fields = [];
};
var d = function(e, t, i, n, o) {
a.call(this, e, t, i, n, o);
this.className = "Enum";
this.object = null;
};
d.getName = function(e, t) {
for (var i, n = Object.keys(e), o = 0; o < n.length; ++o) if (e[i = n[o]] === t) return i;
return null;
};
(d.prototype = Object.create(a.prototype)).build = function(e) {
if (this.object && !e) return this.object;
for (var t = new m.Builder.Enum(), i = this.getChildren(d.Value), n = 0, o = i.length; n < o; ++n) t[i[n].name] = i[n].id;
Object.defineProperty && Object.defineProperty(t, "$options", {
value: this.buildOpt(),
enumerable: !1
});
return this.object = t;
};
r.Enum = d;
var p = function(e, t, i, n) {
h.call(this, e, t, i);
this.className = "Enum.Value";
this.id = n;
};
p.prototype = Object.create(h.prototype);
r.Enum.Value = p;
var _ = function(e, t, i, n) {
h.call(this, e, t, i);
this.field = n;
};
_.prototype = Object.create(h.prototype);
r.Extension = _;
var y = function(e, t, i, n) {
a.call(this, e, t, i, n);
this.className = "Service";
this.clazz = null;
};
(y.prototype = Object.create(a.prototype)).build = function(e) {
return this.clazz && !e ? this.clazz : this.clazz = function(t, o) {
for (var s = function(e) {
t.Builder.Service.call(this);
this.rpcImpl = e || function(e, t, i) {
setTimeout(i.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0);
};
}, e = s.prototype = Object.create(t.Builder.Service.prototype), i = o.getChildren(t.Reflect.Service.RPCMethod), n = 0; n < i.length; n++) (function(n) {
e[n.name] = function(e, i) {
try {
try {
e = n.resolvedRequestType.clazz.decode(w.wrap(e));
} catch (e) {
if (!(e instanceof TypeError)) throw e;
}
if (null === e || "object" !== ("undefined" == typeof e ? "undefined" : S(e))) throw Error("Illegal arguments");
e instanceof n.resolvedRequestType.clazz || (e = new n.resolvedRequestType.clazz(e));
this.rpcImpl(n.fqn(), e, function(e, t) {
if (e) i(e); else {
null === t && (t = "");
try {
t = n.resolvedResponseType.clazz.decode(t);
} catch (e) {}
t && t instanceof n.resolvedResponseType.clazz ? i(null, t) : i(Error("Illegal response type received in service method " + o.name + "#" + n.name));
}
});
} catch (e) {
setTimeout(i.bind(this, e), 0);
}
};
s[n.name] = function(e, t, i) {
new s(e)[n.name](t, i);
};
Object.defineProperty && (Object.defineProperty(s[n.name], "$options", {
value: n.buildOpt()
}), Object.defineProperty(e[n.name], "$options", {
value: s[n.name].$options
}));
})(i[n]);
Object.defineProperty && (Object.defineProperty(s, "$options", {
value: o.buildOpt()
}), Object.defineProperty(e, "$options", {
value: s.$options
}), Object.defineProperty(s, "$type", {
value: o
}), Object.defineProperty(e, "$type", {
value: o
}));
return s;
}(m, this);
};
r.Service = y;
var b = function(e, t, i, n) {
h.call(this, e, t, i);
this.className = "Service.Method";
this.options = n || {};
};
(b.prototype = Object.create(h.prototype)).buildOpt = t.buildOpt;
r.Service.Method = b;
var v = function(e, t, i, n, o, s, r, a) {
b.call(this, e, t, i, a);
this.className = "Service.RPCMethod";
this.requestName = n;
this.responseName = o;
this.requestStream = s;
this.responseStream = r;
this.resolvedRequestType = null;
this.resolvedResponseType = null;
};
v.prototype = Object.create(b.prototype);
r.Service.RPCMethod = v;
return r;
}(o);
o.Builder = function(u, t, r) {
var a = function(e) {
this.ns = new r.Namespace(this, null, "");
this.ptr = this.ns;
this.resolved = !1;
this.result = null;
this.files = {};
this.importRoot = null;
this.options = e || {};
}, e = a.prototype;
a.isMessage = function(e) {
return "string" == typeof e.name && ("undefined" == typeof e.values && "undefined" == typeof e.rpc);
};
a.isMessageField = function(e) {
return "string" == typeof e.rule && "string" == typeof e.name && "string" == typeof e.type && "undefined" != typeof e.id;
};
a.isEnum = function(e) {
return "string" == typeof e.name && !("undefined" == typeof e.values || !Array.isArray(e.values) || 0 === e.values.length);
};
a.isService = function(e) {
return !("string" != typeof e.name || "object" !== S(e.rpc) || !e.rpc);
};
a.isExtend = function(e) {
return "string" == typeof e.ref;
};
e.reset = function() {
this.ptr = this.ns;
return this;
};
e.define = function(e) {
if ("string" != typeof e || !t.TYPEREF.test(e)) throw Error("illegal namespace: " + e);
e.split(".").forEach(function(e) {
var t = this.ptr.getChild(e);
null === t && this.ptr.addChild(t = new r.Namespace(this, this.ptr, e));
this.ptr = t;
}, this);
return this;
};
e.create = function(e) {
if (!e) return this;
if (Array.isArray(e)) {
if (0 === e.length) return this;
e = e.slice();
} else e = [ e ];
for (var t = [ e ]; 0 < t.length; ) {
e = t.pop();
if (!Array.isArray(e)) throw Error("not a valid namespace: " + JSON.stringify(e));
for (;0 < e.length; ) {
var i = e.shift();
if (a.isMessage(i)) {
var s = new r.Message(this, this.ptr, i.name, i.options, i.isGroup, i.syntax), n = {};
i.oneofs && Object.keys(i.oneofs).forEach(function(e) {
s.addChild(n[e] = new r.Message.OneOf(this, s, e));
}, this);
i.fields && i.fields.forEach(function(e) {
if (null !== s.getChild(0 | e.id)) throw Error("duplicate or invalid field id in " + s.name + ": " + e.id);
if (e.options && "object" !== S(e.options)) throw Error("illegal field options in " + s.name + "#" + e.name);
var t = null;
if ("string" == typeof e.oneof && !(t = n[e.oneof])) throw Error("illegal oneof in " + s.name + "#" + e.name + ": " + e.oneof);
e = new r.Message.Field(this, s, e.rule, e.keytype, e.type, e.name, e.id, e.options, t, i.syntax);
t && t.fields.push(e);
s.addChild(e);
}, this);
var o = [];
i.enums && i.enums.forEach(function(e) {
o.push(e);
});
i.messages && i.messages.forEach(function(e) {
o.push(e);
});
i.services && i.services.forEach(function(e) {
o.push(e);
});
i.extensions && ("number" == typeof i.extensions[0] ? s.extensions = [ i.extensions ] : s.extensions = i.extensions);
this.ptr.addChild(s);
if (0 < o.length) {
t.push(e);
e = o;
o = null;
this.ptr = s;
s = null;
continue;
}
o = null;
} else if (a.isEnum(i)) {
s = new r.Enum(this, this.ptr, i.name, i.options, i.syntax);
i.values.forEach(function(e) {
s.addChild(new r.Enum.Value(this, s, e.name, e.id));
}, this);
this.ptr.addChild(s);
} else if (a.isService(i)) {
s = new r.Service(this, this.ptr, i.name, i.options);
Object.keys(i.rpc).forEach(function(e) {
var t = i.rpc[e];
s.addChild(new r.Service.RPCMethod(this, s, e, t.request, t.response, !!t.request_stream, !!t.response_stream, t.options));
}, this);
this.ptr.addChild(s);
} else {
if (!a.isExtend(i)) throw Error("not a valid definition: " + JSON.stringify(i));
if (s = this.ptr.resolve(i.ref, !0)) i.fields.forEach(function(t) {
if (null !== s.getChild(0 | t.id)) throw Error("duplicate extended field id in " + s.name + ": " + t.id);
if (s.extensions) {
var i = !1;
s.extensions.forEach(function(e) {
t.id >= e[0] && t.id <= e[1] && (i = !0);
});
if (!i) throw Error("illegal extended field id in " + s.name + ": " + t.id + " (not within valid ranges)");
}
var e = t.name;
this.options.convertFieldsToCamelCase && (e = u.Util.toCamelCase(e));
var n = new r.Message.ExtensionField(this, s, t.rule, t.type, this.ptr.fqn() + "." + e, t.id, t.options), o = new r.Extension(this, this.ptr, t.name, n);
n.extension = o;
this.ptr.addChild(o);
s.addChild(n);
}, this); else if (!/\.?google\.protobuf\./.test(i.ref)) throw Error("extended message " + i.ref + " is not defined");
}
s = i = null;
}
e = null;
this.ptr = this.ptr.parent;
}
this.resolved = !1;
this.result = null;
return this;
};
e.import = function(t, e) {
var i = "/";
if ("string" == typeof e) {
u.Util.IS_NODE && (e = f("path").resolve(e));
if (!0 === this.files[e]) return this.reset();
this.files[e] = !0;
} else if ("object" === ("undefined" == typeof e ? "undefined" : S(e))) {
var n = e.root;
u.Util.IS_NODE && (n = f("path").resolve(n));
(0 <= n.indexOf("\\") || 0 <= e.file.indexOf("\\")) && (i = "\\");
var o = n + i + e.file;
if (!0 === this.files[o]) return this.reset();
this.files[o] = !0;
}
if (t.imports && 0 < t.imports.length) {
var s, r = !1;
if ("object" === ("undefined" == typeof e ? "undefined" : S(e))) {
this.importRoot = e.root;
r = !0;
s = this.importRoot;
e = e.file;
(0 <= s.indexOf("\\") || 0 <= e.indexOf("\\")) && (i = "\\");
} else if ("string" == typeof e) if (this.importRoot) s = this.importRoot; else if (0 <= e.indexOf("/")) "" === (s = e.replace(/\/[^\/]*$/, "")) && (s = "/"); else if (0 <= e.indexOf("\\")) {
s = e.replace(/\\[^\\]*$/, "");
i = "\\";
} else s = "."; else s = null;
for (var a = 0; a < t.imports.length; a++) if ("string" == typeof t.imports[a]) {
if (!s) throw Error("cannot determine import root");
var l = t.imports[a];
if ("google/protobuf/descriptor.proto" === l) continue;
l = s + i + l;
if (!0 === this.files[l]) continue;
/\.proto$/i.test(l) && !u.DotProto && (l = l.replace(/\.proto$/, ".json"));
var c = u.Util.fetch(l);
if (null === c) throw Error("failed to import '" + l + "' in '" + e + "': file not found");
/\.json$/i.test(l) ? this.import(JSON.parse(c + ""), l) : this.import(u.DotProto.Parser.parse(c), l);
} else e ? /\.(\w+)$/.test(e) ? this.import(t.imports[a], e.replace(/^(.+)\.(\w+)$/, function(e, t, i) {
return t + "_import" + a + "." + i;
})) : this.import(t.imports[a], e + "_import" + a) : this.import(t.imports[a]);
r && (this.importRoot = null);
}
t.package && this.define(t.package);
t.syntax && function t(i) {
i.messages && i.messages.forEach(function(e) {
e.syntax = i.syntax;
t(e);
});
i.enums && i.enums.forEach(function(e) {
e.syntax = i.syntax;
});
}(t);
var h = this.ptr;
t.options && Object.keys(t.options).forEach(function(e) {
h.options[e] = t.options[e];
});
t.messages && (this.create(t.messages), this.ptr = h);
t.enums && (this.create(t.enums), this.ptr = h);
t.services && (this.create(t.services), this.ptr = h);
t.extends && this.create(t.extends);
return this.reset();
};
e.resolveAll = function() {
var e;
if (null == this.ptr || "object" === S(this.ptr.type)) return this;
if (this.ptr instanceof r.Namespace) this.ptr.children.forEach(function(e) {
this.ptr = e;
this.resolveAll();
}, this); else if (this.ptr instanceof r.Message.Field) {
if (t.TYPE.test(this.ptr.type)) this.ptr.type = u.TYPES[this.ptr.type]; else {
if (!t.TYPEREF.test(this.ptr.type)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
if (!(e = (this.ptr instanceof r.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, !0))) throw Error("unresolvable type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
if ((this.ptr.resolvedType = e) instanceof r.Enum) {
this.ptr.type = u.TYPES.enum;
if ("proto3" === this.ptr.syntax && "proto3" !== e.syntax) throw Error("proto3 message cannot reference proto2 enum");
} else {
if (!(e instanceof r.Message)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
this.ptr.type = e.isGroup ? u.TYPES.group : u.TYPES.message;
}
}
if (this.ptr.map) {
if (!t.TYPE.test(this.ptr.keyType)) throw Error("illegal key type for map field in " + this.ptr.toString(!0) + ": " + this.ptr.keyType);
this.ptr.keyType = u.TYPES[this.ptr.keyType];
}
} else if (this.ptr instanceof u.Reflect.Service.Method) {
if (!(this.ptr instanceof u.Reflect.Service.RPCMethod)) throw Error("illegal service type in " + this.ptr.toString(!0));
if (!((e = this.ptr.parent.resolve(this.ptr.requestName, !0)) && e instanceof u.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.requestName);
this.ptr.resolvedRequestType = e;
if (!((e = this.ptr.parent.resolve(this.ptr.responseName, !0)) && e instanceof u.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.responseName);
this.ptr.resolvedResponseType = e;
} else if (!(this.ptr instanceof u.Reflect.Message.OneOf || this.ptr instanceof u.Reflect.Extension || this.ptr instanceof u.Reflect.Enum.Value)) throw Error("illegal object in namespace: " + S(this.ptr) + ": " + this.ptr);
return this.reset();
};
e.build = function(e) {
this.reset();
this.resolved || (this.resolveAll(), this.resolved = !0, this.result = null);
null === this.result && (this.result = this.ns.build());
if (!e) return this.result;
for (var t = "string" == typeof e ? e.split(".") : e, i = this.result, n = 0; n < t.length; n++) {
if (!i[t[n]]) {
i = null;
break;
}
i = i[t[n]];
}
return i;
};
e.lookup = function(e, t) {
return e ? this.ns.resolve(e, t) : this.ns;
};
e.toString = function() {
return "Builder";
};
a.Message = function() {};
a.Enum = function() {};
a.Service = function() {};
return a;
}(o, o.Lang, o.Reflect);
o.Map = function(e, r) {
var t = function(e, t) {
if (!e.map) throw Error("field is not a map");
this.field = e;
this.keyElem = new r.Element(e.keyType, null, !0, e.syntax);
this.valueElem = new r.Element(e.type, e.resolvedType, !1, e.syntax);
this.map = {};
Object.defineProperty(this, "size", {
get: function() {
return Object.keys(this.map).length;
}
});
if (t) for (var i = Object.keys(t), n = 0; n < i.length; n++) {
var o = this.keyElem.valueFromString(i[n]), s = this.valueElem.verifyValue(t[i[n]]);
this.map[this.keyElem.valueToString(o)] = {
key: o,
value: s
};
}
}, i = t.prototype;
function o(e) {
var t = 0;
return {
next: function() {
return t < e.length ? {
done: !1,
value: e[t++]
} : {
done: !0
};
}
};
}
i.clear = function() {
this.map = {};
};
i.delete = function(e) {
var t = this.keyElem.valueToString(this.keyElem.verifyValue(e)), i = t in this.map;
delete this.map[t];
return i;
};
i.entries = function() {
for (var e, t = [], i = Object.keys(this.map), n = 0; n < i.length; n++) t.push([ (e = this.map[i[n]]).key, e.value ]);
return o(t);
};
i.keys = function() {
for (var e = [], t = Object.keys(this.map), i = 0; i < t.length; i++) e.push(this.map[t[i]].key);
return o(e);
};
i.values = function() {
for (var e = [], t = Object.keys(this.map), i = 0; i < t.length; i++) e.push(this.map[t[i]].value);
return o(e);
};
i.forEach = function(e, t) {
for (var i, n = Object.keys(this.map), o = 0; o < n.length; o++) e.call(t, (i = this.map[n[o]]).value, i.key, this);
};
i.set = function(e, t) {
var i = this.keyElem.verifyValue(e), n = this.valueElem.verifyValue(t);
this.map[this.keyElem.valueToString(i)] = {
key: i,
value: n
};
return this;
};
i.get = function(e) {
var t = this.keyElem.valueToString(this.keyElem.verifyValue(e));
if (t in this.map) return this.map[t].value;
};
i.has = function(e) {
return this.keyElem.valueToString(this.keyElem.verifyValue(e)) in this.map;
};
return t;
}(0, o.Reflect);
o.loadProto = function(e, t, i) {
("string" == typeof t || t && "string" == typeof t.file && "string" == typeof t.root) && (i = t, 
t = void 0);
return o.loadJson(o.DotProto.Parser.parse(e), t, i);
};
o.protoFromString = o.loadProto;
o.loadProtoFile = function(t, i, n) {
i && "object" === ("undefined" == typeof i ? "undefined" : S(i)) ? (n = i, i = null) : i && "function" == typeof i || (i = null);
if (i) return o.Util.fetch("string" == typeof t ? t : t.root + "/" + t.file, function(e) {
if (null !== e) try {
i(null, o.loadProto(e, n, t));
} catch (e) {
i(e);
} else i(Error("Failed to fetch file"));
});
var e = o.Util.fetch("object" === ("undefined" == typeof t ? "undefined" : S(t)) ? t.root + "/" + t.file : t);
return null === e ? null : o.loadProto(e, n, t);
};
o.protoFromFile = o.loadProtoFile;
o.newBuilder = function(e) {
"undefined" == typeof (e = e || {}).convertFieldsToCamelCase && (e.convertFieldsToCamelCase = o.convertFieldsToCamelCase);
"undefined" == typeof e.populateAccessors && (e.populateAccessors = o.populateAccessors);
return new o.Builder(e);
};
o.loadJson = function(e, t, i) {
("string" == typeof t || t && "string" == typeof t.file && "string" == typeof t.root) && (i = t, 
t = null);
t && "object" === ("undefined" == typeof t ? "undefined" : S(t)) || (t = o.newBuilder());
"string" == typeof e && (e = JSON.parse(e));
t.import(e, i);
t.resolveAll();
return t;
};
o.loadJsonFile = function(t, i, n) {
i && "object" === ("undefined" == typeof i ? "undefined" : S(i)) ? (n = i, i = null) : i && "function" == typeof i || (i = null);
if (i) return o.Util.fetch("string" == typeof t ? t : t.root + "/" + t.file, function(e) {
if (null !== e) try {
i(null, o.loadJson(JSON.parse(e), n, t));
} catch (e) {
i(e);
} else i(Error("Failed to fetch file"));
});
var e = o.Util.fetch("object" === ("undefined" == typeof t ? "undefined" : S(t)) ? t.root + "/" + t.file : t);
return null === e ? null : o.loadJson(JSON.parse(e), n, t);
};
return o;
}, "function" == typeof define && define.amd ? define([ "bytebuffer" ], i) : "function" == typeof f && "object" === ("undefined" == typeof n ? "undefined" : S(n)) && n && n.exports ? n.exports = i(f("bytebuffer")) : (e.dcodeIO = e.dcodeIO || {}).ProtoBuf = i(e.dcodeIO.ByteBuffer);
cc._RF.pop();
}).call(this, f("_process"));
}, {
_process: 2,
bytebuffer: "bytebuffer",
fs: void 0,
path: 1
} ],
test: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "111c1iHbbdKEJmmcRtX61GI", "test");
var n = e("HttpConnect"), o = e("onfire");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
o.on("CLWEBVerificationCodeRS", this.resp);
console.log("connecting...");
n.sendProtoRequest("CLWEBVerificationCodeRQ", {
mobile: "18610280935"
});
},
start: function() {},
resp: function(e) {
console.log(e.result);
}
});
cc._RF.pop();
}, {
HttpConnect: "HttpConnect",
onfire: "onfire"
} ],
tyt_ImgConfig: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "9a651q1CwpFl5WPie57kRK9", "tyt_ImgConfig");
var n = {
1001: {
img1: "1001_1",
img2: "1001_2",
img3: "1001_3",
scale: 1,
kind: "fangxing",
distance1: 223,
distance2: 222,
pos: cc.p(19, 154),
shadowPos: cc.p(51, 45)
},
1002: {
img1: "1001_1",
img2: "1001_2",
img3: "1001_3",
scale: .7,
kind: "fangxing",
distance1: 223,
distance2: 222,
pos: cc.p(19, 154),
shadowPos: cc.p(51, 45)
},
1003: {
img1: "1003_1",
img2: "1003_2",
img3: "1003_3",
scale: 1,
kind: "yuanxing",
distance1: 164,
distance2: 164,
pos: cc.p(0, 121),
shadowPos: cc.p(14, 16)
},
1004: {
img1: "1003_1",
img2: "1003_2",
img3: "1003_3",
scale: .7,
kind: "yuanxing",
distance1: 164,
distance2: 164,
pos: cc.p(0, 121),
shadowPos: cc.p(14, 16)
},
1005: {
img1: "1003_1",
img2: "1003_2",
img3: "1003_3",
scale: .5,
kind: "yuanxing",
distance1: 164,
distance2: 164,
pos: cc.p(0, 121),
shadowPos: cc.p(14, 16)
},
1006: {
img1: "1006_1",
img2: "1006_2",
img3: "1006_3",
scale: 1,
kind: "fangxing",
distance1: 156,
distance2: 156,
pos: cc.p(0, 166),
shadowPos: cc.p(25, 75)
},
1007: {
img1: "1006_1",
img2: "1006_2",
img3: "1006_3",
scale: .7,
kind: "fangxing",
distance1: 156,
distance2: 156,
pos: cc.p(0, 166),
shadowPos: cc.p(25, 75)
},
1008: {
img1: "1006_1",
img2: "1006_2",
img3: "1006_3",
scale: .5,
kind: "fangxing",
distance1: 156,
distance2: 156,
pos: cc.p(0, 166),
shadowPos: cc.p(25, 75)
},
1009: {
img1: "1009_1",
img2: "1009_2",
img3: "1009_3",
scale: 1,
kind: "fangxing",
distance1: 169,
distance2: 169,
pos: cc.p(0, 180),
shadowPos: cc.p(25, 83)
},
1010: {
img1: "1009_1",
img2: "1009_2",
img3: "1009_3",
scale: .7,
kind: "fangxing",
distance1: 169,
distance2: 169,
pos: cc.p(0, 180),
shadowPos: cc.p(25, 83)
},
1011: {
img1: "1011_1",
img2: "1011_2",
img3: "1011_3",
scale: 1,
kind: "fangxing",
distance1: 161,
distance2: 161,
pos: cc.p(0, 174),
shadowPos: cc.p(25, 79)
},
1012: {
img1: "1011_1",
img2: "1011_2",
img3: "1011_3",
scale: .7,
kind: "fangxing",
distance1: 161,
distance2: 161,
pos: cc.p(0, 174),
shadowPos: cc.p(25, 79)
},
1013: {
img1: "1011_1",
img2: "1011_2",
img3: "1011_3",
scale: .5,
kind: "fangxing",
distance1: 161,
distance2: 161,
pos: cc.p(0, 174),
shadowPos: cc.p(25, 79)
},
1014: {
img1: "1014_1",
img2: "1014_2",
img3: "1014_3",
scale: 1,
kind: "fangxing",
distance1: 160,
distance2: 160,
pos: cc.p(0, 257),
shadowPos: cc.p(41, 68)
},
1015: {
img1: "1014_1",
img2: "1014_2",
img3: "1014_3",
scale: .7,
kind: "fangxing",
distance1: 160,
distance2: 160,
pos: cc.p(0, 257),
shadowPos: cc.p(41, 68)
},
1016: {
img1: "1016_1",
img2: "1016_2",
img3: "1016_3",
scale: 1,
kind: "fangxing",
distance1: 156,
distance2: 156,
pos: cc.p(0, 186),
shadowPos: cc.p(25, 75)
},
1017: {
img1: "1016_1",
img2: "1016_2",
img3: "1016_3",
scale: .7,
kind: "fangxing",
distance1: 156,
distance2: 156,
pos: cc.p(0, 186),
shadowPos: cc.p(25, 75)
},
1018: {
img1: "1018_1",
img2: "1018_2",
img3: "1018_3",
scale: 1,
kind: "yuanxing",
distance1: 68,
distance2: 68,
pos: cc.p(0, 90),
shadowPos: cc.p(2, 19)
},
1019: {
img1: "1019_1",
img2: "1019_2",
img3: "1019_3",
scale: 1,
kind: "yuanxing",
distance1: 100,
distance2: 100,
pos: cc.p(0, 172),
shadowPos: cc.p(2, 27)
},
1020: {
img1: "1020_1",
img2: "1020_2",
img3: "1020_3",
scale: 1,
kind: "yuanxing",
distance1: 144,
distance2: 144,
pos: cc.p(0, 125),
shadowPos: cc.p(6, 40)
},
1021: {
img1: "1020_1",
img2: "1020_2",
img3: "1020_3",
scale: .7,
kind: "yuanxing",
distance1: 144,
distance2: 144,
pos: cc.p(0, 125),
shadowPos: cc.p(6, 40)
},
1022: {
img1: "1022_1",
img2: "1022_2",
img3: "1022_3",
scale: 1,
kind: "fangxing",
distance1: 156,
distance2: 156,
pos: cc.p(0, 167),
shadowPos: cc.p(25, 76)
},
1023: {
img1: "1022_1",
img2: "1022_2",
img3: "1022_3",
scale: .7,
kind: "fangxing",
distance1: 156,
distance2: 156,
pos: cc.p(0, 167),
shadowPos: cc.p(25, 76)
},
1024: {
img1: "1022_1",
img2: "1022_2",
img3: "1022_3",
scale: .5,
kind: "fangxing",
distance1: 156,
distance2: 156,
pos: cc.p(0, 167),
shadowPos: cc.p(25, 76)
},
1025: {
img1: "1025_1",
img2: "1025_2",
img3: "1025_3",
scale: 1,
kind: "fangxing",
distance1: 156,
distance2: 156,
pos: cc.p(0, 166),
shadowPos: cc.p(25, 76),
effect: "yinyue",
effectPos: cc.p(-11, 160),
score: 10
},
1026: {
img1: "1026_1",
img2: "1026_2",
img3: "1026_3",
scale: 1,
kind: "fangxing",
distance1: 120,
distance2: 180,
pos: cc.p(0, 146),
shadowPos: cc.p(15, 77),
effect: "maoyan",
effectPos: cc.p(0, 300),
score: 15
},
1027: {
img1: "1027_1",
img2: "1027_2",
img3: "1027_3",
scale: 1,
kind: "yuanxing",
distance1: 165,
distance2: 162,
pos: cc.p(-13, 183),
shadowPos: cc.p(14, 27),
effect: "pijiupao",
effectPos: cc.p(-10, 280),
score: 15
},
1028: {
img1: "1028_1",
img2: "1028_2",
img3: "1028_3",
scale: 1,
kind: "fangxing",
distance1: 102,
distance2: 162,
pos: cc.p(0, 201),
shadowPos: cc.p(27, 67),
effect: "dianshi",
effectPos: cc.p(30, 111),
score: 20
},
1029: {
imgCount: 2,
img1: "1029_1",
img2: "1029_2",
img3: "1029_3",
scale: 1,
kind: "fangxing",
distance1: 180,
distance2: 180,
pos: cc.p(0, 172),
shadowPos: cc.p(25, 90),
effect: "shuilifang",
effectPos: cc.p(0, 131),
score: 20
}
};
t.exports = n;
cc._RF.pop();
}, {} ]
}, {}, [ "config", "HttpRequestDefine", "MessageDefine", "HttpConnect", "RequestHandler", "ResponseHandler", "ServerConfig", "ServerConnect", "onfire", "ProtoTest", "bytebuffer", "long", "protobuf", "GameResult", "Tools", "Lianliankan", "Lock", "Tiaoyitiao", "tyt_ImgConfig", "Animal", "Animal_blue", "Animal_red", "Break", "BtnEmpty", "Com", "Doushouqi", "Doushouqi_back", "Doushouqi_save", "GameItem", "Hall", "HallData", "LoginByPhone", "LoginScene", "Ready", "Help", "test" ]);