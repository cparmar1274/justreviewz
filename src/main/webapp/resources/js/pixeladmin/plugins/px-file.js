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
}(), PxFile = function(e) {
    "use strict";
    var t = "pxFile", n = e.fn[t], i_BROWSE = "px-file-browse", i_CLEAR = "px-file-clear", i_HAS_VALUE = "px-file-has-value", r = {
        CLICK: "click.px.file",
        CHANGE: "change.px.file"
    }, o = function() {
        function n(t) {
            _classCallCheck(this, n), this.element = t, this.input = e(t).find(".custom-file-input")[0], 
            this.control = e(t).find(".custom-file-control")[0], this.placeholder = this.control.innerHTML, 
            this._checkElement(), this._checkInput(), this._checkControl(), this._setListeners(), 
            this.update();
        }
        return _createClass(n, [ {
            key: "browse",
            value: function() {
                e(this.input).trigger("click");
            }
        }, {
            key: "clear",
            value: function() {
                e(this.input).is(":disabled") || (e(this.input).wrap("<form>").parent().on("reset", function(e) {
                    e.stopPropagation();
                }).trigger("reset"), e(this.input).unwrap(), e(this.input).trigger("change"));
            }
        }, {
            key: "update",
            value: function() {
                var t = (this.input.value || "").replace(/\\/g, "/").split("/").pop();
                t ? e(this.control).text(t) : this.control.innerHTML = this.placeholder, pxUtil[t ? "addClass" : "removeClass"](this.element, i_HAS_VALUE);
            }
        }, {
            key: "destroy",
            value: function() {
                this._unsetListeners(), e(this.element).removeData("px.file");
            }
        }, {
            key: "_checkElement",
            value: function() {
                if (!pxUtil.hasClass(this.element, "custom-file")) throw new Error(t + " plugin must be called on a custom file input wrapper.");
            }
        }, {
            key: "_checkInput",
            value: function() {
                if (!this.input) throw new Error("File input is not found.");
            }
        }, {
            key: "_checkControl",
            value: function() {
                if (!this.control) throw new Error(".custom-file-control element is not found.");
            }
        }, {
            key: "_rejectEvent",
            value: function(e) {
                e && (e.stopPropagation(), e.preventDefault());
            }
        }, {
            key: "_setListeners",
            value: function() {
                var t = this;
                e(this.element).find("." + i_BROWSE).on(this.constructor.Event.CLICK, function(n) {
                    t._rejectEvent(n), t.browse(), e(t.input).trigger("focus");
                }), e(this.element).find("." + i_CLEAR).on(this.constructor.Event.CLICK, function(n) {
                    t._rejectEvent(n), t.clear(), e(t.input).trigger("focus");
                }), e(this.input).on(this.constructor.Event.CHANGE, e.proxy(this.update, this));
            }
        }, {
            key: "_unsetListeners",
            value: function() {
                e(this.element).find("." + i_BROWSE).off(".px.file"), e(this.element).find("." + i_CLEAR).off(".px.file"), 
                e(this.input).off(".px.file");
            }
        } ], [ {
            key: "_jQueryInterface",
            value: function(t) {
                return this.each(function() {
                    var i = e(this).data("px.file");
                    if (i || (i = new n(this), e(this).data("px.file", i)), "string" == typeof t) {
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
                return "px.file";
            }
        }, {
            key: "Event",
            get: function() {
                return r;
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return ".px.file";
            }
        } ]), n;
    }();
    return e.fn[t] = o._jQueryInterface, e.fn[t].Constructor = o, e.fn[t].noConflict = function() {
        return e.fn[t] = n, o._jQueryInterface;
    }, o;
}(jQuery);