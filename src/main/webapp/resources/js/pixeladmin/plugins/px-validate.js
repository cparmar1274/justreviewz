function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _createClass = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), PxValidate = function(e) {
    "use strict";
    if (!e.fn.validate) throw new Error("jquery.validate.js required.");
    var t = "pxValidate", r = e.fn[t], n_FORM_HELP = "form-help-text", n_HAS_ERROR = "has-validation-error", n_ERROR = "validation-error", n_NO_ARROW = "validation-error-no-arrow", o = {
        errorElement: "div",
        errorClass: "form-message " + n_ERROR
    }, a = new RegExp("(^|\\s)(?:" + "validation-container" + "|form-group|col-(?:xs|sm|md|lg)-\\d+)(\\s|$)"), i = function() {
        function r(t, n) {
            _classCallCheck(this, r), this.element = t, this.validator = e(t).validate(this._getConfig(t, n));
        }
        return _createClass(r, [ {
            key: "getValidator",
            value: function() {
                return this.validator;
            }
        }, {
            key: "destroy",
            value: function() {
                this.validator.destroy(), e(this.element).removeData("px.validate");
            }
        }, {
            key: "_highlight",
            value: function(t) {
                pxUtil.addClass(e(t).parents(".form-group")[0], "has-error " + n_HAS_ERROR);
            }
        }, {
            key: "_unhighlight",
            value: function(t) {
                pxUtil.removeClass(e(t).parents(".form-group")[0], "has-error " + n_HAS_ERROR);
            }
        }, {
            key: "_errorPlacement",
            value: function(t, r) {
                var o = e(this._getParentContainer(r[0]));
                if (o.length) {
                    o.find("." + n_ERROR).remove();
                    var a = r[0].getAttribute("type");
                    "checkbox" !== (a = a ? a.toLowerCase() : null) && "radio" !== a || pxUtil.addClass(t[0], n_NO_ARROW);
                    var i = o.find("." + n_FORM_HELP).first();
                    i.length ? t.insertBefore(i) : o.append(t);
                }
            }
        }, {
            key: "_getParentContainer",
            value: function(e) {
                var t = e.parentNode, r = t.nodeName.toUpperCase();
                return "FORM" === r || "BODY" === r ? (console.error(new Error("Cannot find parent container.")), 
                null) : a.test(t.className) ? t : this._getParentContainer(t);
            }
        }, {
            key: "_getConfig",
            value: function(t, r) {
                return e.extend({}, this.constructor.Default, {
                    highlight: this._highlight,
                    unhighlight: this._unhighlight,
                    errorPlacement: e.proxy(this._errorPlacement, this)
                }, e(t).data(), r);
            }
        } ], [ {
            key: "_jQueryInterface",
            value: function(t) {
                var n = void 0, o = this.each(function() {
                    var o = e(this).data("px.validate"), a = "object" === (void 0 === t ? "undefined" : _typeof(t)) ? t : null;
                    if (o || (o = new r(this, a), e(this).data("px.validate", o)), "string" == typeof t) {
                        if (!o[t]) throw new Error('No method named "' + t + '".');
                        n = o[t]();
                    }
                });
                return void 0 !== n ? n : o;
            }
        }, {
            key: "Default",
            get: function() {
                return o;
            }
        }, {
            key: "NAME",
            get: function() {
                return t;
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return "px.validate";
            }
        } ]), r;
    }();
    return e.fn[t] = i._jQueryInterface, e.fn[t].Constructor = i, e.fn[t].noConflict = function() {
        return e.fn[t] = r, i._jQueryInterface;
    }, i;
}(jQuery);