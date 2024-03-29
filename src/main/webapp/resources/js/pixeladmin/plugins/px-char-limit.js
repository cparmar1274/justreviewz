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
}(), PxCharLimit = function(t) {
    "use strict";
    var e = "pxCharLimit", n = "px.charLimit", i = "." + n, r = t.fn[e], o = {
        maxlength: null,
        counter: ""
    }, s = {
        CHANGE: "change" + i,
        KEYUP: "keyup" + i,
        FOCUS: "focus" + i
    }, u = function() {
        function r(e, n) {
            _classCallCheck(this, r), this.element = e, this.isTextarea = t(e).is("textarea"), 
            this.config = this._getConfig(n), this.counter = this._getLabel(), this._setMaxLength(), 
            this._setListeners(), this.update();
        }
        return _createClass(r, [ {
            key: "update",
            value: function() {
                var e = this.config.maxlength, n = this.element.value, i = void 0;
                this.isTextarea && (n = n.replace(/\r?\n/g, "\n")), (i = n.length) > e && (t(this.element).val(n.substr(0, e)).trigger("change"), 
                i = e), this.counter && (this.counter.innerHTML = e - i);
            }
        }, {
            key: "destroy",
            value: function() {
                this._unsetListeners(), t(this.element).removeData(n);
            }
        }, {
            key: "_getLabel",
            value: function() {
                return this.config.counter ? "string" == typeof this.config.counter ? t(this.config.counter)[0] || null : this.config.counter : null;
            }
        }, {
            key: "_setMaxLength",
            value: function() {
                this.isTextarea ? this.element.removeAttribute("maxlength") : this.element.setAttribute("maxlength", this.config.maxlength);
            }
        }, {
            key: "_setListeners",
            value: function() {
                t(this.element).on(this.constructor.Event.CHANGE, t.proxy(this.update, this)).on(this.constructor.Event.KEYUP, t.proxy(this.update, this)).on(this.constructor.Event.FOCUS, t.proxy(this.update, this));
            }
        }, {
            key: "_unsetListeners",
            value: function() {
                t(this.element).off(i);
            }
        }, {
            key: "_getConfig",
            value: function(e) {
                var n = t.extend({}, this.constructor.Default, {
                    maxlength: this.element.getAttribute("maxlength")
                }, t(this.element).data(), e);
                if (!n.maxlength) throw new Error("maxlength is not specified.");
                return this.isTextarea && this.element.getAttribute("maxlength") && this.element.removeAttribute("maxlength"), 
                n;
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
                return o;
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
    return t.fn[e] = u._jQueryInterface, t.fn[e].Constructor = u, t.fn[e].noConflict = function() {
        return t.fn[e] = r, u._jQueryInterface;
    }, u;
}(jQuery);