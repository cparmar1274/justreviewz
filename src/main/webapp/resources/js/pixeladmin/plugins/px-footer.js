function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
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
}(), PxFooter = function(t) {
    "use strict";
    var e = "pxFooter", n = t.fn[e], i_CONTENT = "px-content", i_BOTTOM = "px-footer-bottom", i_FIXED = "px-footer-fixed", o = {
        RESIZE: "resize.px.footer",
        SCROLL: "scroll.px.footer",
        NAV_EXPANDED: "expanded.px.nav",
        NAV_COLLAPSED: "collapsed.px.nav",
        DROPDOWN_OPENED: "dropdown-opened.px.nav",
        DROPDOWN_CLOSED: "dropdown-closed.px.nav"
    }, r = function() {
        function n(t) {
            _classCallCheck(this, n), this.uniqueId = pxUtil.generateUniqueId(), this.element = t, 
            this.parent = this._getParent(t), this._setListeners(), this.update();
        }
        return _createClass(n, [ {
            key: "update",
            value: function() {
                this.parent === document.body && (this._curScreenSize = window.PixelAdmin.getScreenSize(), 
                this._updateBodyMinHeight());
                var e = t(this.element.parentNode).find("> ." + i_CONTENT)[0];
                pxUtil.hasClass(this.element, i_BOTTOM) || pxUtil.hasClass(this.element, i_FIXED) ? e.style.paddingBottom = t(this.element).outerHeight() + 20 + "px" : e.style.paddingBottom = e.setAttribute("style", (e.getAttribute("style") || "").replace(/\s*padding-bottom:\s*\d+px\s*;?/i));
            }
        }, {
            key: "destroy",
            value: function() {
                this._unsetListeners(), t(this.element).removeData("px.footer"), t(document.body).css("min-height", "");
                var e = t(this.element.parentNode).find("> ." + i_CONTENT)[0];
                e.style.paddingBottom = e.setAttribute("style", (e.getAttribute("style") || "").replace(/\s*padding-bottom:\s*\d+px\s*;?/i));
            }
        }, {
            key: "_getParent",
            value: function(t) {
                for (var e = t.parentNode; "ui-view" === e.nodeName.toLowerCase(); ) e = e.parentNode;
                return e;
            }
        }, {
            key: "_updateBodyMinHeight",
            value: function() {
                document.body.style.minHeight && (document.body.style.minHeight = null), "lg" !== this._curScreenSize && "xl" !== this._curScreenSize || !pxUtil.hasClass(this.element, i_BOTTOM) || t(document.body).height() >= document.body.scrollHeight || (document.body.style.minHeight = document.body.scrollHeight + "px");
            }
        }, {
            key: "_setListeners",
            value: function() {
                t(window).on(this.constructor.Event.RESIZE + "." + this.uniqueId, t.proxy(this.update, this)).on(this.constructor.Event.SCROLL + "." + this.uniqueId, t.proxy(this._updateBodyMinHeight, this)).on(this.constructor.Event.NAV_EXPANDED + "." + this.uniqueId + " " + this.constructor.Event.NAV_COLLAPSED + "." + this.uniqueId, ".px-nav", t.proxy(this._updateBodyMinHeight, this)), 
                this.parent === document.body && t(".px-nav").on(this.constructor.Event.DROPDOWN_OPENED + "." + this.uniqueId + " " + this.constructor.Event.DROPDOWN_CLOSED + "." + this.uniqueId, ".px-nav-dropdown", t.proxy(this._updateBodyMinHeight, this));
            }
        }, {
            key: "_unsetListeners",
            value: function() {
                t(window).off(this.constructor.Event.RESIZE + "." + this.uniqueId + " " + this.constructor.Event.SCROLL + "." + this.uniqueId).off(this.constructor.Event.NAV_EXPANDED + "." + this.uniqueId + " " + this.constructor.Event.NAV_COLLAPSED + "." + this.uniqueId), 
                t(".px-nav").off(this.constructor.Event.DROPDOWN_OPENED + "." + this.uniqueId + " " + this.constructor.Event.DROPDOWN_CLOSED + "." + this.uniqueId);
            }
        } ], [ {
            key: "_jQueryInterface",
            value: function(e) {
                return this.each(function() {
                    var i = t(this).data("px.footer");
                    if (i || (i = new n(this), t(this).data("px.footer", i)), "string" == typeof e) {
                        if (!i[e]) throw new Error('No method named "' + e + '"');
                        i[e]();
                    }
                });
            }
        }, {
            key: "NAME",
            get: function() {
                return e;
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return "px.footer";
            }
        }, {
            key: "Event",
            get: function() {
                return o;
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return ".px.footer";
            }
        } ]), n;
    }();
    return t.fn[e] = r._jQueryInterface, t.fn[e].Constructor = r, t.fn[e].noConflict = function() {
        return t.fn[e] = n, r._jQueryInterface;
    }, r;
}(jQuery);