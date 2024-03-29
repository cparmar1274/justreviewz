function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _createClass = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), PxSidebar = function(t) {
    "use strict";
    var e = "pxSidebar", n = "px.sidebar", i = "." + n, r = t.fn[e], o_NAVBAR_FIXED = "px-navbar-fixed", o_LEFT = "px-sidebar-left", s = {
        RESIZE: "resize" + i,
        SCROLL: "scroll" + i,
        CLICK_DATA_API: "click.px.sidebar.data-api",
        EXPAND: "expand" + i,
        EXPANDED: "expanded" + i,
        COLLAPSE: "collapse" + i,
        COLLAPSED: "collapsed" + i
    }, l_DATA_TOGGLE = '[data-toggle="sidebar"]', l_CONTENT = ".px-sidebar-content", l_NAVBAR_HEADER = ".navbar-header", a = {
        width: null,
        enableScrollbar: !0,
        desktopMode: [ "lg", "xl" ],
        navbarSelector: "> .px-navbar"
    }, c = function() {
        function r(e, n) {
            _classCallCheck(this, r), this.uniqueId = pxUtil.generateUniqueId(), this.element = e, 
            this.$content = t(e).find(l_CONTENT), this.parent = e.parentNode, this.config = this._getConfig(n), 
            this._isRtl = "rtl" === t("html").attr("dir"), this._setWidth(), this._setScrollbar(), 
            this._checkMode(), this._setListeners();
        }
        return _createClass(r, [ {
            key: "toggle",
            value: function() {
                this._triggerPreventableEvent(pxUtil.hasClass(this.element, "open") ? "COLLAPSE" : "EXPAND", this.element) && (pxUtil.toggleClass(this.element, "open"), 
                this._triggerEvent(pxUtil.hasClass(this.element, "open") ? "EXPANDED" : "COLLAPSED", this.element));
            }
        }, {
            key: "update",
            value: function() {
                var e = t(this.parent).find(this.config.navbarSelector + " " + l_NAVBAR_HEADER);
                if (e.length) {
                    var n = e.height();
                    if (pxUtil.hasClass(this.parent, o_NAVBAR_FIXED) || !this._positioning) this.element.style.top = n + "px"; else {
                        var i = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
                        this.element.style.top = n < i ? "0px" : n - i + "px";
                    }
                }
                this.config.enableScrollbar && this.$content.perfectScrollbar("update");
            }
        }, {
            key: "destroy",
            value: function() {
                this._unsetListeners(), this._unsetScrollbar(), t(this.element).removeData(n);
            }
        }, {
            key: "_setWidth",
            value: function() {
                var n, e = parseInt(this.config.width || t(this.element).width(), 10);
                n = this._isRtl ? pxUtil.hasClass(this.element, o_LEFT) ? "right" : "left" : pxUtil.hasClass(this.element, o_LEFT) ? "left" : "right", 
                this.element.style.width = e + "px", this.element.style[n] = "-" + e + "px";
            }
        }, {
            key: "_checkMode",
            value: function() {
                this._positioning = -1 !== this.config.desktopMode.indexOf(window.PixelAdmin.getScreenSize()), 
                this.update();
            }
        }, {
            key: "_setScrollbar",
            value: function() {
                if (this.config.enableScrollbar) {
                    if (!this.$content.length) throw new Error(".px-sidebar-content element is not found.");
                    this.$content.perfectScrollbar();
                }
            }
        }, {
            key: "_unsetScrollbar",
            value: function() {
                this.config.enableScrollbar && this.$content.length && this.$content.perfectScrollbar("destroy");
            }
        }, {
            key: "_triggerEvent",
            value: function(e, n) {
                var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                t(this.element).trigger(t.Event(this.constructor.Event[e], {
                    target: n
                }), [ i ]);
            }
        }, {
            key: "_triggerPreventableEvent",
            value: function(e, n) {
                var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, r = t.Event(this.constructor.Event[e], {
                    target: n
                });
                return t(this.element).trigger(r, [ i ]), !r.isDefaultPrevented();
            }
        }, {
            key: "_setListeners",
            value: function() {
                t(window).on(this.constructor.Event.RESIZE + "." + this.uniqueId, t.proxy(this._checkMode, this)).on(this.constructor.Event.SCROLL + "." + this.uniqueId, t.proxy(this.update, this));
            }
        }, {
            key: "_unsetListeners",
            value: function() {
                t(window).off(this.constructor.Event.RESIZE + "." + this.uniqueId).off(this.constructor.Event.SCROLL + "." + this.uniqueId);
            }
        }, {
            key: "_getConfig",
            value: function(e) {
                return t.extend({}, this.constructor.Default, t(this.element).data(), e);
            }
        } ], [ {
            key: "_jQueryInterface",
            value: function(e) {
                return this.each(function() {
                    var i = t(this).data(n), o = "object" === (void 0 === e ? "undefined" : _typeof(e)) ? e : null;
                    if (i || (i = new r(this, o), t(this).data(n, i)), "string" == typeof e) {
                        if (!i[e]) throw new Error('No method named "' + e + '"');
                        i[e]();
                    }
                });
            }
        }, {
            key: "Default",
            get: function() {
                return a;
            }
        }, {
            key: "NAME",
            get: function() {
                return e;
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return n;
            }
        }, {
            key: "Event",
            get: function() {
                return s;
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return i;
            }
        } ]), r;
    }();
    return t(document).on(s.CLICK_DATA_API, l_DATA_TOGGLE, function(e) {
        e.preventDefault();
        var i = this.getAttribute("data-target"), r = i ? t(i)[0] : null;
        r && (t(r).data(n) || c._jQueryInterface.call(t(r), t(this).data()), c._jQueryInterface.call(t(r), "toggle"));
    }), t.fn[e] = c._jQueryInterface, t.fn[e].Constructor = c, t.fn[e].noConflict = function() {
        return t.fn[e] = r, c._jQueryInterface;
    }, c;
}(jQuery);