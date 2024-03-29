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
}(), PxResponsiveBg = function(e) {
    "use strict";
    var t = "pxResponsiveBg", n = "px.responsiveBg", i = e.fn[t], o = {
        backgroundImage: null,
        backgroundPosition: "center middle",
        overlay: !1,
        overlayOpacity: .2
    }, r_CONTAINER = "px-responsive-bg-container", r_IMAGE = "px-responsive-bg", r_OVERLAY = "px-responsive-bg-overlay", s = {
        RESIZE: "resize.px.responsiveBg"
    }, a = function() {
        function i(e, t) {
            var n = this;
            _classCallCheck(this, i), this.uniqueId = pxUtil.generateUniqueId(), this.element = e, 
            this.config = this._getConfig(t), null !== this.config.backgroundImage && this._loadImage(this.config.backgroundImage, function(e) {
                n._sizeRatio = e.height / e.width, n._setupMarkup(e), n._setListeners(), n.update();
            });
        }
        return _createClass(i, [ {
            key: "update",
            value: function() {
                var t = this.image.parentNode, n = e(t).height(), i = e(t).width(), o = void 0, r = void 0, s = void 0, a = void 0;
                i * this._sizeRatio > n ? (r = "100%", o = Math.ceil(i * this._sizeRatio), a = 0, 
                s = "top" === this.config.backgroundPosition[1] ? 0 : "bottom" === this.config.backgroundPosition[1] ? -1 * (o - n) : Math.floor(-1 * (o - n) / 2)) : (r = Math.ceil(n / this._sizeRatio), 
                o = n, s = 0, a = "left" === this.config.backgroundPosition[0] ? 0 : "right" === this.config.backgroundPosition[0] ? -1 * (r - i) : Math.floor(-1 * (r - i) / 2)), 
                this.image.style.width = "100%" === r ? r : r + "px", this.image.style.height = o + "px", 
                this.image.style.top = s + "px", this.image.style.left = a + "px";
            }
        }, {
            key: "destroy",
            value: function(t) {
                this._unsetListeners(), t && e(this.element).removeClass(r_CONTAINER).find("> ." + r_IMAGE).remove(), 
                e(this.element).removeData(n);
            }
        }, {
            key: "_loadImage",
            value: function(e, t) {
                var n = new Image();
                n.onload = function() {
                    return t(n);
                }, n.src = e;
            }
        }, {
            key: "_setupMarkup",
            value: function(t) {
                pxUtil.addClass(this.element, r_CONTAINER);
                var n = e(this.element).find("> ." + r_IMAGE);
                if (n.length || (n = e('<div class="' + r_IMAGE + '"></div>').appendTo(this.element)).append('<img alt="">'), 
                this.image = n.find("> img")[0], !this.image) throw new Error("Background <img> element not found!");
                e(this.image).attr("src", t.src), !1 !== this.config.overlay ? (n.find("." + r_OVERLAY).remove(), 
                n.prepend("string" == typeof this.config.overlay && "<" === this.config.overlay[0] ? e(this.config.overlay).addClass(r_OVERLAY).css("opacity", this.config.overlayOpacity) : e('<div class="' + r_OVERLAY + '"></div>').css({
                    background: "boolean" == typeof this.config.overlay ? "#000" : this.config.overlay,
                    opacity: this.config.overlayOpacity
                }))) : n.find("> ." + r_OVERLAY).remove();
            }
        }, {
            key: "_setListeners",
            value: function() {
                e(window).on(this.constructor.Event.RESIZE + "." + this.uniqueId, e.proxy(this.update, this));
            }
        }, {
            key: "_unsetListeners",
            value: function() {
                e(window).off(this.constructor.Event.RESIZE + "." + this.uniqueId);
            }
        }, {
            key: "_getConfig",
            value: function(t) {
                var n = e.extend({}, this.constructor.Default, e(this.element).data(), t);
                if (!n.backgroundImage && null !== n.backgroundImage) throw new Error("Background image is not specified.");
                var i = String(n.backgroundPosition).split(" ").slice(0, 2);
                return "center" !== i[0] && "left" !== i[0] && "right" !== i[0] && (i[0] = "center"), 
                "middle" !== i[1] && "top" !== i[1] && "bottom" !== i[1] && (i[1] = "middle"), n.backgroundPosition = i, 
                n;
            }
        } ], [ {
            key: "_jQueryInterface",
            value: function(t) {
                for (var o = arguments.length, r = Array(1 < o ? o - 1 : 0), s = 1; s < o; s++) r[s - 1] = arguments[s];
                return this.each(function() {
                    var o = e(this).data(n), s = "object" === (void 0 === t ? "undefined" : _typeof(t)) ? t : null;
                    if (o || "destroy" === t || (o = new i(this, s), e(this).data(n, o)), o && "string" == typeof t) {
                        var a;
                        if (!o[t]) throw new Error('No method named "' + t + '"');
                        (a = o)[t].apply(a, r);
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
                return s;
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return ".px.responsiveBg";
            }
        } ]), i;
    }();
    return e.fn[t] = a._jQueryInterface, e.fn[t].Constructor = a, e.fn[t].noConflict = function() {
        return e.fn[t] = i, a._jQueryInterface;
    }, a;
}(jQuery);