function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _slicedToArray = function(e, i) {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e)) return function(t, e) {
        var i = [], n = !0, s = !1, r = void 0;
        try {
            for (var a, o = t[Symbol.iterator](); !(n = (a = o.next()).done) && (i.push(a.value), 
            !e || i.length !== e); n = !0) ;
        } catch (t) {
            s = !0, r = t;
        } finally {
            try {
                !n && o.return && o.return();
            } finally {
                if (s) throw r;
            }
        }
        return i;
    }(e, i);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, _createClass = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), PxWizard = function(t) {
    "use strict";
    var e = "pxWizard", i = ".px.wizard", n = t.fn[e], s = {
        minStepWidth: 200
    }, r_WRAPPER = "wizard-wrapper", r_STEPS = "wizard-steps", r_PANE = "wizard-pane", r_FROZEN = "frozen", r_FINISHED = "finished", r_ACTIVE = "active", r_COMPLETED = "completed", a = {
        RESIZE: "resize.px.wizard",
        CLICK: "click.px.wizard",
        CHANGE: "stepchange.px.wizard",
        CHANGED: "stepchanged.px.wizard",
        FINISH: "finish.px.wizard",
        FINISHED: "finished.px.wizard",
        FROZEN: "frozen.px.wizard",
        UNFROZEN: "unfrozen.px.wizard",
        RESETED: "reseted.px.wizard",
        DESTROY: "destroy.px.wizard"
    }, o = function() {
        function n(e, i) {
            _classCallCheck(this, n), this.uniqueId = pxUtil.generateUniqueId(), this.element = e, 
            this.steps = t(e).find("." + r_STEPS)[0], this.stepItems = t(this.steps).find("li"), 
            this.wrapper = t(e).find("." + r_WRAPPER)[0], this.config = this._getConfig(i), 
            this.activeStep = null, this._isRtl = "rtl" === t("html").attr("dir"), this._resetStepsWidth(), 
            this.resizeStepItems(), this.goTo(this.getActiveStepIndex()), this._setListeners();
        }
        return _createClass(n, [ {
            key: "resizeStepItems",
            value: function() {
                for (var e = this.stepItems.length, i = t(this.wrapper).width(), n = i > this.config.minStepWidth * e ? Math.floor(i / e) : this.config.minStepWidth, s = 0; s < e; s++) this._setStrictWidth(this.stepItems[s], n);
                null !== this.activeStep && this._placeStepsContainer();
            }
        }, {
            key: "getActiveStepIndex",
            value: function() {
                var e = this.activeStep || t(this.steps).find("li." + r_ACTIVE)[0];
                return e ? this._getStepIndex(e) : 0;
            }
        }, {
            key: "getStepCount",
            value: function() {
                return this.stepItems.length;
            }
        }, {
            key: "goTo",
            value: function(t) {
                if (!this.isFrozen() && !this.isFinished()) {
                    var e, i, n, s = this._getStepItemAndTarget(t), r = _slicedToArray(s, 3);
                    i = r[0], e = r[1], n = r[2];
                    var a = this.activeStep ? this._getStepIndex(this.activeStep) : null;
                    null !== a && i === a || (null === a || this._triggerPreventableEvent("CHANGE", this.element, {
                        activeStepIndex: a,
                        nextStepIndex: i
                    })) && (this.activeStep = e, this._activateStepItem(e, i), this._activateStepPane(n), 
                    null !== a && this._triggerEvent("CHANGED", this.element, {
                        prevStepIndex: a,
                        activeStepIndex: i
                    }));
                }
            }
        }, {
            key: "getPaneByIndex",
            value: function(e) {
                var i, n = this._getStepItemAndTarget(e), s = _slicedToArray(n, 3);
                return s[0], s[1], i = s[2], t(i);
            }
        }, {
            key: "getActivePane",
            value: function() {
                return this.getPaneByIndex(this.getActiveStepIndex());
            }
        }, {
            key: "goNext",
            value: function() {
                if (!this.isFrozen() && !this.isFinished()) {
                    var t = this._getStepIndex(this.activeStep) + 1;
                    if (t >= this.stepItems.length) return this.finish();
                    this.goTo(t);
                }
            }
        }, {
            key: "goPrev",
            value: function() {
                if (!this.isFrozen() && !this.isFinished()) {
                    var t = this._getStepIndex(this.activeStep) - 1;
                    t < 0 || this.goTo(t);
                }
            }
        }, {
            key: "finish",
            value: function() {
                if (!this.isFrozen() && !this.isFinished() && this._triggerPreventableEvent("FINISH", this.element)) {
                    var t = this._getStepIndex(this.activeStep), e = this.stepItems.length - 1;
                    t !== e && this.goTo(e), pxUtil.addClass(this.element, r_FINISHED), this.freeze(), 
                    this._triggerEvent("FINISHED", this.element);
                }
            }
        }, {
            key: "isFinished",
            value: function() {
                return pxUtil.hasClass(this.element, r_FINISHED);
            }
        }, {
            key: "freeze",
            value: function() {
                pxUtil.addClass(this.element, r_FROZEN), this._triggerEvent("FROZEN", this.element);
            }
        }, {
            key: "unfreeze",
            value: function() {
                this.isFinished() || (pxUtil.removeClass(this.element, r_FROZEN), this._triggerEvent("UNFROZEN", this.element));
            }
        }, {
            key: "isFrozen",
            value: function() {
                return pxUtil.hasClass(this.element, r_FROZEN);
            }
        }, {
            key: "reset",
            value: function() {
                var t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
                pxUtil.removeClass(this.element, r_FROZEN), pxUtil.removeClass(this.element, r_FINISHED), 
                t && this.goTo(0), this._triggerEvent("RESETED", this.element);
            }
        }, {
            key: "destroy",
            value: function() {
                this._triggerPreventableEvent("DESTROY", this.element) && (this._unsetListeners(), 
                t(this.element).removeData("px.wizard"));
            }
        }, {
            key: "_resetStepsWidth",
            value: function() {
                this.steps.style.width = "auto";
            }
        }, {
            key: "_setStrictWidth",
            value: function(t, e) {
                t.style.minWidth = e + "px", t.style.maxWidth = e + "px", t.style.width = e + "px";
            }
        }, {
            key: "_getStepItemAndTarget",
            value: function(t) {
                var e = void 0, i = void 0;
                if ("number" == typeof t) {
                    if (i = t, !(e = this.stepItems[t])) throw new Error('Step item with index "' + t + '" is not found.');
                } else e = t[0] || t, i = this._getStepIndex(e);
                var n = e.getAttribute("data-target");
                if (!n) throw new Error('The step item has invalid "data-target" attribute.');
                return [ i, e, n ];
            }
        }, {
            key: "_activateStepItem",
            value: function(t, e) {
                pxUtil.addClass(t, r_ACTIVE), pxUtil.removeClass(t, r_COMPLETED);
                for (var i = 0; i < e; i++) pxUtil.addClass(this.stepItems[i], r_COMPLETED), pxUtil.removeClass(this.stepItems[i], r_ACTIVE);
                for (var n = e + 1, s = this.stepItems.length; n < s; n++) pxUtil.removeClass(this.stepItems[n], r_ACTIVE), 
                pxUtil.removeClass(this.stepItems[n], r_COMPLETED);
                this._placeStepsContainer();
            }
        }, {
            key: "_activateStepPane",
            value: function(e) {
                for (var i = t(this.element).find("." + r_PANE + "." + r_ACTIVE), n = 0, s = i.length; n < s; n++) pxUtil.removeClass(i[n], r_ACTIVE);
                pxUtil.addClass(t(this.element).find(e)[0], r_ACTIVE);
            }
        }, {
            key: "_placeStepsContainer",
            value: function() {
                var e = t(this.wrapper).width(), i = t(this.steps).width(), n = t(this.activeStep).outerWidth(), s = Math.floor((e - n) / 2), r = t(this.activeStep).position().left, a = void 0;
                this._isRtl && (r = i - r - n), e < i && s < r ? i + (a = -1 * r + s) < e && (a = -1 * i + e) : a = 0, 
                this.steps.style[this._isRtl ? "right" : "left"] = a + "px";
            }
        }, {
            key: "_getStepIndex",
            value: function(t) {
                for (var e = void 0, i = 0, n = this.stepItems.length; i < n; i++) if (t === this.stepItems[i]) {
                    e = i;
                    break;
                }
                if (void 0 === e) throw new Error("Cannot find step item index.");
                return e;
            }
        }, {
            key: "_setListeners",
            value: function() {
                var e = this;
                t(window).on(this.constructor.Event.RESIZE + "." + this.uniqueId, t.proxy(this.resizeStepItems, this)), 
                t(this.steps).on(this.constructor.Event.CLICK, "> li", function() {
                    pxUtil.hasClass(this, r_COMPLETED) && e.goTo(this);
                }), t(this.element).on(this.constructor.Event.CLICK, "[data-wizard-action]", function() {
                    var t = this.getAttribute("data-wizard-action");
                    if ("next" === t) return e.goNext();
                    if ("prev" === t) return e.goPrev();
                    if ("finish" === t) return e.finish();
                    throw new Error('Action "' + t + '" is not found.');
                });
            }
        }, {
            key: "_unsetListeners",
            value: function() {
                t(window).off(this.constructor.Event.RESIZE + "." + this.uniqueId), t(this.element).off(i), 
                t(this.steps).off(i);
            }
        }, {
            key: "_triggerEvent",
            value: function(e, i) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                t(this.element).trigger(t.Event(this.constructor.Event[e], {
                    target: i
                }), [ n ]);
            }
        }, {
            key: "_triggerPreventableEvent",
            value: function(e, i) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, s = t.Event(this.constructor.Event[e], {
                    target: i
                });
                return t(this.element).trigger(s, [ n ]), !s.isDefaultPrevented();
            }
        }, {
            key: "_getConfig",
            value: function(e) {
                return t.extend({}, this.constructor.Default, t(this.element).data(), e);
            }
        } ], [ {
            key: "_jQueryInterface",
            value: function(e) {
                for (var i = arguments.length, s = Array(1 < i ? i - 1 : 0), r = 1; r < i; r++) s[r - 1] = arguments[r];
                var a = void 0, o = this.each(function() {
                    var i = t(this).data("px.wizard"), r = "object" === (void 0 === e ? "undefined" : _typeof(e)) ? e : null;
                    if (i || (i = new n(this, r), t(this).data("px.wizard", i)), "string" == typeof e) {
                        if (!i[e]) throw new Error('No method named "' + e + '".');
                        a = i[e].apply(i, s);
                    }
                });
                return void 0 !== a ? a : o;
            }
        }, {
            key: "Default",
            get: function() {
                return s;
            }
        }, {
            key: "NAME",
            get: function() {
                return e;
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return "px.wizard";
            }
        }, {
            key: "Event",
            get: function() {
                return a;
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return i;
            }
        } ]), n;
    }();
    return t.fn[e] = o._jQueryInterface, t.fn[e].Constructor = o, t.fn[e].noConflict = function() {
        return t.fn[e] = n, o._jQueryInterface;
    }, o;
}(jQuery);