function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
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
}(), PxExpandingInput = function(e) {
    "use strict";
    var t = "pxExpandingInput", n = "px.expanding-input", i = "." + n, r = e.fn[t], s_EXPANDED = "expanded", s_CONTROL = "expanding-input-control", s_OVERLAY = "expanding-input-overlay", s_CONTENT = "expanding-input-content", o = {
        FOCUS: "focus" + i,
        CLICK: "click" + i,
        EXPAND: "expand" + i,
        EXPANDED: "expanded" + i,
        COLLAPSE: "collapse" + i,
        COLLAPSED: "collapsed" + i
    }, a = function() {
        function r(t) {
            _classCallCheck(this, r), this.element = t, this.control = e(t).find("." + s_CONTROL)[0], 
            this.overlay = e(t).find("." + s_OVERLAY)[0], this._checkElements(), this._setListeners();
        }
        return _createClass(r, [ {
            key: "expand",
            value: function() {
                if (!pxUtil.hasClass(this.element, s_EXPANDED)) {
                    var t = e.Event(this.constructor.Event.EXPAND, {
                        target: this.element
                    });
                    e(this.element).trigger(t), t.isDefaultPrevented() || (pxUtil.addClass(this.element, s_EXPANDED), 
                    e(this.element).trigger(e.Event(this.constructor.Event.EXPANDED, {
                        target: this.element
                    })), e(this.control).trigger("focus"));
                }
            }
        }, {
            key: "collapse",
            value: function() {
                if (pxUtil.hasClass(this.element, s_EXPANDED)) {
                    var t = e.Event(this.constructor.Event.COLLAPSE, {
                        target: this.element
                    });
                    e(this.element).trigger(t), t.isDefaultPrevented() || (pxUtil.removeClass(this.element, s_EXPANDED), 
                    e(this.element).trigger(e.Event(this.constructor.Event.COLLAPSED, {
                        target: this.element
                    })));
                }
            }
        }, {
            key: "destroy",
            value: function() {
                this._unsetListeners(), e(this.element).removeData(n);
            }
        }, {
            key: "_checkElements",
            value: function() {
                if (!pxUtil.hasClass(this.element, "expanding-input")) throw new Error(t + " plugin must be called on an element with 'expanding-input' class.");
                if (!this.control) throw new Error("Input is not found.");
                if (this.overlay || (this.overlay = e('<div class="expanding-input-overlay"></div>').insertAfter(this.control)[0]), 
                !e(this.element).find("." + s_CONTENT)[0]) throw new Error("Content element is not found.");
            }
        }, {
            key: "_setListeners",
            value: function() {
                e(this.control).on(this.constructor.Event.FOCUS, e.proxy(this.expand, this)), e(this.overlay).on(this.constructor.Event.CLICK, e.proxy(this.expand, this)), 
                e(this.element).find('[data-collapse="true"]').on(this.constructor.Event.CLICK, e.proxy(this.collapse, this));
            }
        }, {
            key: "_unsetListeners",
            value: function() {
                e(this.control).off(i), e(this.overlay).off(i), e(this.element).find('[data-collapse="true"]').off(i);
            }
        } ], [ {
            key: "_jQueryInterface",
            value: function(t) {
                return this.each(function() {
                    var i = e(this).data(n);
                    if (i || (i = new r(this), e(this).data(n, i)), "string" == typeof t) {
                        if (!i[t]) throw new Error('No method named "' + t + '".');
                        i[t]();
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
                return n;
            }
        }, {
            key: "Event",
            get: function() {
                return o;
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return i;
            }
        } ]), r;
    }();
    return e.fn[t] = a._jQueryInterface, e.fn[t].Constructor = a, e.fn[t].noConflict = function() {
        return e.fn[t] = r, a._jQueryInterface;
    }, a;
}(jQuery);