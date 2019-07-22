function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), PxNavbar = function(e) {
    "use strict";
    var t = "pxNavbar", n = ".px.navbar", r = e.fn[t], a = {
        NAVBAR: "px-navbar",
        INNER: "px-navbar-collapse-inner",
        IN: "in",
        COLLAPSED: "collapsed"
    }, o = {
        DATA_TOGGLE: '.navbar-toggle[data-toggle="collapse"]',
        DROPDOWN_TOGGLE: '.dropdown-toggle[data-toggle="dropdown"]',
        COLLAPSE: ".navbar-collapse",
        DROPDOWN: ".dropdown"
    }, l = {
        CLICK_DATA_API: "click.px.navbar.data-api",
        RESIZE: "resize.px.navbar",
        CLICK: "click.px.navbar",
        MOUSEDOWN: "mousedown.px.navbar",
        COLLAPSE_SHOW: "show.bs.collapse.px.navbar",
        COLLAPSE_SHOWN: "shown.bs.collapse.px.navbar",
        COLLAPSE_HIDDEN: "hidden.bs.collapse.px.navbar",
        DROPDOWN_SHOWN: "shown.bs.dropdown.px.navbar",
        DROPDOWN_HIDDEN: "hidden.bs.dropdown.px.navbar"
    }, i = function() {
        function r(t) {
            if (_classCallCheck(this, r), !e.fn.perfectScrollbar) throw new Error('Scrolling feature requires the "perfect-scrollbar" plugin included.');
            this.uniqueId = pxUtil.generateUniqueId(), this.element = t, this.$collapse = e(t).find(o.COLLAPSE), 
            this.$toggle = e(t).find(o.DATA_TOGGLE), this._scrollbarEnabled = 0, this._curScrollTop = 0, 
            this.$collapse.length && this.$toggle.length && (this.$inner = this._setupInnerContainer(), 
            this._setListeners());
        }
        return _createClass(r, [ {
            key: "updateScrollbar",
            value: function() {
                this._scrollbarEnabled && (this._updateHeight(), this.$inner.scrollTop(this._curScrollTop).perfectScrollbar("update"));
            }
        }, {
            key: "destroy",
            value: function() {
                this._unsetListeners(), this._disableScrollbar(), this.$collapse.append(this.$inner.find("> *")), 
                this.$inner.remove(), e(this.element).removeData("px.navbar");
            }
        }, {
            key: "_updateHeight",
            value: function() {
                var t = e(window).height() - this.$collapse[0].offsetTop;
                this.$collapse.height(""), this.$collapse.height() > t && this.$collapse.height(t + "px");
            }
        }, {
            key: "_enableScrollbar",
            value: function() {
                this._scrollbarEnabled || (this._updateHeight(), this.$inner.perfectScrollbar({
                    suppressScrollX: !0
                }), this._scrollbarEnabled = 1);
            }
        }, {
            key: "_disableScrollbar",
            value: function() {
                this._scrollbarEnabled && (this.$collapse.height(""), this.$inner.perfectScrollbar("destroy"), 
                this._scrollbarEnabled = 0);
            }
        }, {
            key: "_setupInnerContainer",
            value: function() {
                var t = e('<div class="' + a.INNER + '"></div>');
                return t.append(this.$collapse.find("> *")), this.$collapse.append(t), t;
            }
        }, {
            key: "_setListeners",
            value: function() {
                var t = this, n = this;
                e(window).on(this.constructor.Event.RESIZE + "." + this.uniqueId, function() {
                    t._scrollbarEnabled && (t.$toggle.is(":visible") ? (t._curScrollTop = t.$inner[0].scrollTop, 
                    t.updateScrollbar()) : (t._disableScrollbar(), t.$collapse.removeClass(a.IN), t.$toggle.addClass(a.COLLAPSED), 
                    t.$collapse.attr("aria-expanded", "false"), t.$toggle.attr("aria-expanded", "false")));
                }), e(this.element).on(this.constructor.Event.COLLAPSE_SHOW, o.COLLAPSE, function() {
                    t.$collapse.find(".dropdown.open").removeClass("open");
                }).on(this.constructor.Event.COLLAPSE_SHOWN, o.COLLAPSE, function() {
                    t._enableScrollbar();
                }).on(this.constructor.Event.COLLAPSE_HIDDEN, o.COLLAPSE, function() {
                    t._disableScrollbar();
                }).on(this.constructor.Event.DROPDOWN_SHOWN + " " + this.constructor.Event.DROPDOWN_HIDDEN, o.DROPDOWN, function() {
                    t.updateScrollbar();
                }).on(this.constructor.Event.MOUSEDOWN, o.DROPDOWN_TOGGLE, function() {
                    if (!t._scrollbarEnabled) return !0;
                    t._curScrollTop = t.$inner[0].scrollTop;
                }).on(this.constructor.Event.CLICK, o.DROPDOWN_TOGGLE, function(e) {
                    return !n._scrollbarEnabled || (!this.getAttribute("href") || "#" === this.getAttribute("href") || (e.preventDefault(), 
                    e.stopPropagation(), this.removeAttribute("data-toggle"), this.click(), void this.setAttribute("data-toggle", "dropdown")));
                });
            }
        }, {
            key: "_unsetListeners",
            value: function() {
                e(window).off(this.constructor.Event.RESIZE + "." + this.uniqueId), e(this.element).off(n);
            }
        } ], [ {
            key: "_jQueryInterface",
            value: function(t) {
                for (var n = arguments.length, a = Array(n > 1 ? n - 1 : 0), l = 1; l < n; l++) a[l - 1] = arguments[l];
                return this.each(function() {
                    var n = e(this).data("px.navbar");
                    if (n || (n = new r(this), e(this).data("px.navbar", n), e.support.transition || "true" !== e(this).find(o.DATA_TOGGLE).attr("aria-expanded") || n._enableScrollbar()), 
                    "string" == typeof t) {
                        if (!n[t]) throw new Error('No method named "' + t + '"');
                        n[t].apply(n, a);
                    }
                });
            }
        }, {
            key: "NAME",
            get: function() {
                return t;
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return "px.navbar";
            }
        }, {
            key: "Event",
            get: function() {
                return l;
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return n;
            }
        } ]), r;
    }();
    return e(document).on(l.CLICK_DATA_API, "." + a.NAVBAR + " " + o.DATA_TOGGLE, function(t) {
        t.preventDefault();
        var n = e(this).parents("." + a.NAVBAR);
        n.length && (n.data("px.navbar") || i._jQueryInterface.call(n));
    }), e.fn[t] = i._jQueryInterface, e.fn[t].Constructor = i, e.fn[t].noConflict = function() {
        return e.fn[t] = r, i._jQueryInterface;
    }, i;
}(jQuery);