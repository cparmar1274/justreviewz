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
}(), PxSparkline = function(e) {
    "use strict";
    if (!e.fn.sparkline) throw new Error("jquery.sparkline.js required.");
    var t = "pxSparkline", n = "px.sparkline", r = e.fn[t], a = {
        RESIZE: "resize.px.sparkline"
    }, i = function() {
        function r(t, n, a) {
            _classCallCheck(this, r), this.uniqueId = pxUtil.generateUniqueId(), this.element = t, 
            this.$parent = e(t.parentNode), this.update(n, a), this._setListeners();
        }
        return _createClass(r, [ {
            key: "update",
            value: function(t, n) {
                null !== t && (this._values = t), null !== n && ("100%" !== n.width || "bar" !== n.type && "tristate" !== n.type || void 0 !== n.barSpacing || (n.barSpacing = "2px"), 
                this.config = n);
                var r = e.extend(!0, {}, this.config);
                "100%" === r.width && ("bar" === r.type || "tristate" === r.type ? r.barWidth = this._getBarWidth(this.$parent, this._values.length, r.barSpacing) : r.width = Math.floor(this.$parent.width())), 
                e(this.element).sparkline(this._values, r);
            }
        }, {
            key: "destroy",
            value: function() {
                this._unsetListeners(), e(this.element).removeData(n).removeData("_jqs_mhandler").removeData("_jqs_vcanvas").off().find("canvas").remove();
            }
        }, {
            key: "_getBarWidth",
            value: function(e, t, n) {
                var r = e.width(), a = parseInt(n, 10) * (t - 1);
                return Math.floor((r - a) / t);
            }
        }, {
            key: "_setListeners",
            value: function() {
                var t = this;
                e(window).on(this.constructor.Event.RESIZE + "." + this.uniqueId, function() {
                    if ("100%" === t.config.width) {
                        var n = e.extend(!0, {}, t.config);
                        "bar" === n.type || "tristate" === n.type ? n.barWidth = t._getBarWidth(t.$parent, t._values.length, n.barSpacing) : n.width = Math.floor(t.$parent.width()), 
                        e(t.element).sparkline(t._values, n);
                    }
                });
            }
        }, {
            key: "_unsetListeners",
            value: function() {
                e(window).off(this.constructor.Event.RESIZE + "." + this.uniqueId);
            }
        } ], [ {
            key: "_parseArgs",
            value: function(t, n) {
                var r = void 0, a = void 0;
                return a = "[object Array]" === Object.prototype.toString.call(n[0]) || "html" === n[0] || null === n[0] ? (r = n[0], 
                n[1] || null) : n[0] || null, "html" !== r && void 0 !== r || null === r || (void 0 !== (r = t.getAttribute("values")) && null !== r || (r = e(t).html()), 
                r = r.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")), r && "[object Array]" === Object.prototype.toString.call(r) && 0 !== r.length || (r = null), 
                {
                    values: r,
                    config: a
                };
            }
        }, {
            key: "_jQueryInterface",
            value: function() {
                for (var t = arguments.length, a = Array(t), i = 0; i < t; i++) a[i] = arguments[i];
                return this.each(function() {
                    var t = e(this).data(n), i = "update" === a[0] || "destroy" === a[0] ? a[0] : null, s = r._parseArgs(this, i ? a.slice(1) : a), u = s.values, l = s.config;
                    t ? u && t.update(u, l) : (t = new r(this, u || [], l || {}), e(this).data(n, t)), 
                    "update" === i ? t.update(u, l) : "destroy" === i && t.destroy();
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
                return a;
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return ".px.sparkline";
            }
        } ]), r;
    }();
    return e.fn[t] = i._jQueryInterface, e.fn[t].Constructor = i, e.fn[t].noConflict = function() {
        return e.fn[t] = r, i._jQueryInterface;
    }, i;
}(jQuery);