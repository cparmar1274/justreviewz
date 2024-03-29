function _defineProperty(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var PixelAdmin = function(e) {
    "use strict";
    var t = {
        isRtl: "rtl" === document.documentElement.getAttribute("dir"),
        isMobile: /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()),
        isLocalStorageSupported: void 0 !== window.Storage,
        options: {
            resizeDelay: 100,
            storageKeyPrefix: "px_s_",
            cookieKeyPrefix: "px_c_"
        },
        getScreenSize: function() {
            var e = t._isBreakpointVisible;
            return e("xs") ? "xs" : e("sm") ? "sm" : e("md") ? "md" : e("lg") ? "lg" : "xl";
        },
        storage: {
            _prefix: function(e) {
                return "" + t.options.storageKeyPrefix + e;
            },
            set: function(e, i) {
                var o = "string" == typeof e ? _defineProperty({}, e, i) : e, n = Object.keys(o);
                try {
                    for (var r = 0, s = n.length; r < s; r++) window.localStorage.setItem(this._prefix(n[r]), o[n[r]]);
                } catch (o) {
                    t.cookies.set(e, i);
                }
            },
            get: function(i) {
                var o = e.isArray(i) ? i : [ i ], n = {};
                try {
                    for (var r = 0, s = o.length; r < s; r++) n[o[r]] = window.localStorage.getItem(this._prefix(o[r]));
                    return e.isArray(i) ? n : n[i];
                } catch (e) {
                    return t.cookies.get(i);
                }
            }
        },
        cookies: {
            _prefix: function(e) {
                return "" + t.options.cookieKeyPrefix + e;
            },
            set: function(e, t) {
                for (var i = "string" == typeof e ? _defineProperty({}, e, t) : e, o = Object.keys(i), n = void 0, r = void 0, s = 0, c = o.length; s < c; s++) n = encodeURIComponent(this._prefix(o[s])), 
                r = encodeURIComponent(i[o[s]]), document.cookie = n + "=" + r;
            },
            get: function(t) {
                for (var i = ";" + document.cookie + ";", o = e.isArray(t) ? t : [ t ], n = {}, r = void 0, s = void 0, c = void 0, d = 0, a = o.length; d < a; d++) r = pxUtil.escapeRegExp(encodeURIComponent(this._prefix(o[d]))), 
                s = new RegExp(";\\s*" + r + "\\s*=\\s*([^;]+)\\s*;"), c = i.match(s), n[o[d]] = c ? decodeURIComponent(c[1]) : null;
                return e.isArray(t) ? n : n[t];
            }
        },
        _isBreakpointVisible: function(t) {
            return (document.getElementById("px-breakpoint-" + t) || e('<div id="px-breakpoint-' + t + '"></div>').prependTo(document.body)[0]).offsetTop;
        },
        _setDelayedResizeListener: function() {
            var i = e(window), o = null;
            i.on("resize", function(e) {
                var i = null;
                return function() {
                    i && clearTimeout(i), i = setTimeout(function() {
                        i = null, e();
                    }, t.options.resizeDelay);
                };
            }(function() {
                var e = t.getScreenSize();
                i.trigger("px.resize"), o !== e && i.trigger("px.screen." + e), o = e;
            }));
        }
    };
    return t._setDelayedResizeListener(), e(function() {
        t.isMobile && window.FastClick && window.FastClick.attach(document.body), t.isRtl && e(window).on("px.resize.px-rtl-fix", function() {
            document.body.style.overflow = "hidden", document.body.offsetHeight, document.body.style.overflow = "";
        }), e(window).trigger("px.load"), pxUtil.triggerResizeEvent();
    }), t;
}(jQuery);

window.PixelAdmin = PixelAdmin;