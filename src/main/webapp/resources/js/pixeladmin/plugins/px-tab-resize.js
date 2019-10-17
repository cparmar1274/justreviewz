function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), PxTabResize = function(e) {
    "use strict";
    var t = "pxTabResize", n = "px.tab-resize", i = "." + n, o = e.fn[t], s = {
        template: '\n<li class="dropdown">\n  <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"></a>\n  <ul class="dropdown-menu"></ul>\n</li>',
        content: '<span class="tab-resize-icon"></span>'
    }, r_TAB_RESIZE = "tab-resize", r_TAB_RESIZE_NAV = "tab-resize-nav", r_SHOW = "show", r_ACTIVE = "active", a_NAV_ITEMS = "> li:not(.tab-resize)", a_NAV_LINK = "> a", a_DROPDOWN_TOGGLE = "> .dropdown-toggle", a_DROPDOWN_MENU = "> .dropdown-menu", a_DROPDOWN_ITEMS = "> li", l = {
        RESIZE: "resize" + i,
        CLICK: "click" + i
    }, u = function() {
        function o(t, n) {
            _classCallCheck(this, o), this.uniqueId = pxUtil.generateUniqueId(), this.config = this._getConfig(n), 
            this.element = e(t).find("> .nav")[0] || t, pxUtil.addClass(t, r_TAB_RESIZE_NAV), 
            this.navItem = this._createNavItemElement(), this.navLink = this._getNavLinkElement(), 
            this.dropdown = this._getDropdownElement(), this._setListeners(), this.placeTabs();
        }
        return _createClass(o, [ {
            key: "placeTabs",
            value: function() {
                this._resetDropdown();
                var t = e(this.element).find(a_NAV_ITEMS), n = t.length - 1, i = t[n], o = i ? t[0].offsetTop : 0;
                if (!i || i.offsetTop <= o) pxUtil.removeClass(this.navItem, r_SHOW); else for (pxUtil.addClass(this.navItem, r_SHOW); i && !(i.offsetTop <= o); ) this._moveItemToDropdown(i), 
                i = t[--n];
            }
        }, {
            key: "destroy",
            value: function() {
                this._unsetListeners(), this._resetDropdown(), e(this.navItem).remove(), pxUtil.removeClass(this.element, r_TAB_RESIZE_NAV), 
                e(this.element).removeData(n);
            }
        }, {
            key: "_createNavItemElement",
            value: function() {
                var t = e(this.config.template).addClass(r_TAB_RESIZE)[0];
                return this.element.insertBefore(t, this.element.firstChild), t;
            }
        }, {
            key: "_getNavLinkElement",
            value: function() {
                return e(this.navItem).find(a_DROPDOWN_TOGGLE).html(this.config.content)[0];
            }
        }, {
            key: "_getDropdownElement",
            value: function() {
                return e(this.navItem).find(a_DROPDOWN_MENU)[0];
            }
        }, {
            key: "_moveItemToDropdown",
            value: function(t) {
                e(this.dropdown).prepend(t), pxUtil.hasClass(t, r_ACTIVE) && (pxUtil.addClass(this.navItem, r_ACTIVE), 
                this.navLink.innerHTML = e(t).find(a_NAV_LINK)[0].innerHTML);
            }
        }, {
            key: "_resetDropdown",
            value: function() {
                pxUtil.removeClass(this.navItem, r_ACTIVE), this.navLink.innerHTML = this.config.content, 
                e(this.element).append(e(this.dropdown).find(a_DROPDOWN_ITEMS));
            }
        }, {
            key: "_setListeners",
            value: function() {
                var t = this;
                e(window).on(this.constructor.Event.RESIZE + "." + this.uniqueId, e.proxy(this.placeTabs, this)), 
                e(this.element).on(this.constructor.Event.CLICK, a_NAV_ITEMS + ", > ." + r_TAB_RESIZE + " li", function() {
                    return setTimeout(e.proxy(t.placeTabs, t, 10));
                });
            }
        }, {
            key: "_unsetListeners",
            value: function() {
                e(window).off(this.constructor.Event.RESIZE + "." + this.uniqueId), e(this.element).off(i);
            }
        }, {
            key: "_getConfig",
            value: function(t) {
                return e.extend({}, this.constructor.Default, t);
            }
        } ], [ {
            key: "_jQueryInterface",
            value: function(t) {
                return this.each(function() {
                    var i = e(this).data(n), s = "object" === (void 0 === t ? "undefined" : _typeof(t)) ? t : null;
                    if (i || (i = new o(this, s), e(this).data(n, i)), "string" == typeof t) {
                        if (!i[t]) throw new Error('No method named "' + t + '"');
                        i[t]();
                    }
                });
            }
        }, {
            key: "Default",
            get: function() {
                return s;
            }
        }, {
            key: "NAME",
            get: function() {
                return t;
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return n;
            }
        }, {
            key: "Event",
            get: function() {
                return l;
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return i;
            }
        } ]), o;
    }();
    return e.fn[t] = u._jQueryInterface, e.fn[t].Constructor = u, e.fn[t].noConflict = function() {
        return e.fn[t] = o, u._jQueryInterface;
    }, u;
}(jQuery);