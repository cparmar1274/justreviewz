!function(t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.noUiSlider = t();
}(function() {
    "use strict";
    function r(t) {
        t.preventDefault();
    }
    function s(t) {
        return "number" == typeof t && !isNaN(t) && isFinite(t);
    }
    function a(t, e, r) {
        0 < r && (p(t, e), setTimeout(function() {
            f(t, e);
        }, r));
    }
    function u(t) {
        return Array.isArray(t) ? t : [ t ];
    }
    function c(t) {
        var e = (t = String(t)).split(".");
        return 1 < e.length ? e[1].length : 0;
    }
    function p(t, e) {
        t.classList ? t.classList.add(e) : t.className += " " + e;
    }
    function f(t, e) {
        t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
    function h(t) {
        var e = void 0 !== window.pageXOffset, r = "CSS1Compat" === (t.compatMode || "");
        return {
            x: e ? window.pageXOffset : r ? t.documentElement.scrollLeft : t.body.scrollLeft,
            y: e ? window.pageYOffset : r ? t.documentElement.scrollTop : t.body.scrollTop
        };
    }
    function b(t, e) {
        return 100 / (e - t);
    }
    function S(t, e) {
        return 100 * e / (t[1] - t[0]);
    }
    function y(t, e) {
        for (var r = 1; t >= e[r]; ) r += 1;
        return r;
    }
    function E(t, e, r) {
        if (r >= t.slice(-1)[0]) return 100;
        var n, i, o, s, a = y(r, t);
        return n = t[a - 1], i = t[a], o = e[a - 1], s = e[a], o + function(t, e) {
            return S(t, t[0] < 0 ? e + Math.abs(t[0]) : e - t[0]);
        }([ n, i ], r) / b(o, s);
    }
    function N(t, e, r, n) {
        if (100 === n) return n;
        var o, s, a = y(n, t);
        return r ? (o = t[a - 1], ((s = t[a]) - o) / 2 < n - o ? s : o) : e[a - 1] ? t[a - 1] + function(t, e) {
            return Math.round(t / e) * e;
        }(n - t[a - 1], e[a - 1]) : n;
    }
    function U(t, e, r) {
        var n;
        if ("number" == typeof e && (e = [ e ]), "[object Array]" !== Object.prototype.toString.call(e)) throw new Error("noUiSlider (" + Q + "): 'range' contains invalid value.");
        if (!s(n = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t)) || !s(e[0])) throw new Error("noUiSlider (" + Q + "): 'range' value isn't numeric.");
        r.xPct.push(n), r.xVal.push(e[0]), n ? r.xSteps.push(!isNaN(e[1]) && e[1]) : isNaN(e[1]) || (r.xSteps[0] = e[1]), 
        r.xHighestCompleteStep.push(0);
    }
    function P(t, e, r) {
        if (!e) return !0;
        r.xSteps[t] = S([ r.xVal[t], r.xVal[t + 1] ], e) / b(r.xPct[t], r.xPct[t + 1]);
        var n = (r.xVal[t + 1] - r.xVal[t]) / r.xNumSteps[t], i = Math.ceil(Number(n.toFixed(3)) - 1), o = r.xVal[t] + r.xNumSteps[t] * i;
        r.xHighestCompleteStep[t] = o;
    }
    function A(t, e, r) {
        this.xPct = [], this.xVal = [], this.xSteps = [ r || !1 ], this.xNumSteps = [ !1 ], 
        this.xHighestCompleteStep = [], this.snap = e;
        var n, i = [];
        for (n in t) t.hasOwnProperty(n) && i.push([ t[n], n ]);
        for (i.length && "object" == typeof i[0][0] ? i.sort(function(t, e) {
            return t[0][0] - e[0][0];
        }) : i.sort(function(t, e) {
            return t[0] - e[0];
        }), n = 0; n < i.length; n++) U(i[n][1], i[n][0], this);
        for (this.xNumSteps = this.xSteps.slice(0), n = 0; n < this.xNumSteps.length; n++) P(n, this.xNumSteps[n], this);
    }
    function M(e) {
        if (function(t) {
            return "object" == typeof t && "function" == typeof t.to && "function" == typeof t.from;
        }(e)) return !0;
        throw new Error("noUiSlider (" + Q + "): 'format' requires 'to' and 'from' methods.");
    }
    function O(t, e) {
        if (!s(e)) throw new Error("noUiSlider (" + Q + "): 'step' is not numeric.");
        t.singleStep = e;
    }
    function k(t, e) {
        if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider (" + Q + "): 'range' is not an object.");
        if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider (" + Q + "): Missing 'min' or 'max' in 'range'.");
        if (e.min === e.max) throw new Error("noUiSlider (" + Q + "): 'range' 'min' and 'max' cannot be equal.");
        t.spectrum = new A(e, t.snap, t.singleStep);
    }
    function V(t, e) {
        if (e = u(e), !Array.isArray(e) || !e.length) throw new Error("noUiSlider (" + Q + "): 'start' option is incorrect.");
        t.handles = e.length, t.start = e;
    }
    function F(t, e) {
        if ("boolean" != typeof (t.snap = e)) throw new Error("noUiSlider (" + Q + "): 'snap' option must be a boolean.");
    }
    function L(t, e) {
        if ("boolean" != typeof (t.animate = e)) throw new Error("noUiSlider (" + Q + "): 'animate' option must be a boolean.");
    }
    function z(t, e) {
        if ("number" != typeof (t.animationDuration = e)) throw new Error("noUiSlider (" + Q + "): 'animationDuration' option must be a number.");
    }
    function j(t, e) {
        var r, n = [ !1 ];
        if ("lower" === e ? e = [ !0, !1 ] : "upper" === e && (e = [ !1, !0 ]), !0 === e || !1 === e) {
            for (r = 1; r < t.handles; r++) n.push(e);
            n.push(!1);
        } else {
            if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider (" + Q + "): 'connect' option doesn't match handle count.");
            n = e;
        }
        t.connect = n;
    }
    function H(t, e) {
        switch (e) {
          case "horizontal":
            t.ort = 0;
            break;

          case "vertical":
            t.ort = 1;
            break;

          default:
            throw new Error("noUiSlider (" + Q + "): 'orientation' option is invalid.");
        }
    }
    function D(t, e) {
        if (!s(e)) throw new Error("noUiSlider (" + Q + "): 'margin' option must be numeric.");
        if (0 !== e && (t.margin = t.spectrum.getMargin(e), !t.margin)) throw new Error("noUiSlider (" + Q + "): 'margin' option is only supported on linear sliders.");
    }
    function q(t, e) {
        if (!s(e)) throw new Error("noUiSlider (" + Q + "): 'limit' option must be numeric.");
        if (t.limit = t.spectrum.getMargin(e), !t.limit || t.handles < 2) throw new Error("noUiSlider (" + Q + "): 'limit' option is only supported on linear sliders with 2 or more handles.");
    }
    function T(t, e) {
        if (!s(e)) throw new Error("noUiSlider (" + Q + "): 'padding' option must be numeric.");
        if (0 !== e) {
            if (t.padding = t.spectrum.getMargin(e), !t.padding) throw new Error("noUiSlider (" + Q + "): 'padding' option is only supported on linear sliders.");
            if (t.padding < 0) throw new Error("noUiSlider (" + Q + "): 'padding' option must be a positive number.");
            if (50 <= t.padding) throw new Error("noUiSlider (" + Q + "): 'padding' option must be less than half the range.");
        }
    }
    function R(t, e) {
        switch (e) {
          case "ltr":
            t.dir = 0;
            break;

          case "rtl":
            t.dir = 1;
            break;

          default:
            throw new Error("noUiSlider (" + Q + "): 'direction' option was not recognized.");
        }
    }
    function X(t, e) {
        if ("string" != typeof e) throw new Error("noUiSlider (" + Q + "): 'behaviour' must be a string containing options.");
        var r = 0 <= e.indexOf("tap"), n = 0 <= e.indexOf("drag"), i = 0 <= e.indexOf("fixed"), o = 0 <= e.indexOf("snap"), s = 0 <= e.indexOf("hover");
        if (i) {
            if (2 !== t.handles) throw new Error("noUiSlider (" + Q + "): 'fixed' behaviour must be used with 2 handles");
            D(t, t.start[1] - t.start[0]);
        }
        t.events = {
            tap: r || o,
            drag: n,
            fixed: i,
            snap: o,
            hover: s
        };
    }
    function B(t, e) {
        if ("boolean" != typeof (t.multitouch = e)) throw new Error("noUiSlider (" + Q + "): 'multitouch' option must be a boolean.");
    }
    function Y(t, e) {
        if (!1 !== e) if (!0 === e) {
            t.tooltips = [];
            for (var r = 0; r < t.handles; r++) t.tooltips.push(!0);
        } else {
            if (t.tooltips = u(e), t.tooltips.length !== t.handles) throw new Error("noUiSlider (" + Q + "): must pass a formatter for all handles.");
            t.tooltips.forEach(function(t) {
                if ("boolean" != typeof t && ("object" != typeof t || "function" != typeof t.to)) throw new Error("noUiSlider (" + Q + "): 'tooltips' must be passed a formatter or 'false'.");
            });
        }
    }
    function I(t, e) {
        M(t.ariaFormat = e);
    }
    function _(t, e) {
        M(t.format = e);
    }
    function W(t, e) {
        if (void 0 !== e && "string" != typeof e && !1 !== e) throw new Error("noUiSlider (" + Q + "): 'cssPrefix' must be a string or `false`.");
        t.cssPrefix = e;
    }
    function $(t, e) {
        if (void 0 !== e && "object" != typeof e) throw new Error("noUiSlider (" + Q + "): 'cssClasses' must be an object.");
        if ("string" == typeof t.cssPrefix) for (var r in t.cssClasses = {}, e) e.hasOwnProperty(r) && (t.cssClasses[r] = t.cssPrefix + e[r]); else t.cssClasses = e;
    }
    function G(t, e) {
        if (!0 !== e && !1 !== e) throw new Error("noUiSlider (" + Q + "): 'useRequestAnimationFrame' option should be true (default) or false.");
        t.useRequestAnimationFrame = e;
    }
    function J(t) {
        var e = {
            margin: 0,
            limit: 0,
            padding: 0,
            animate: !0,
            animationDuration: 300,
            ariaFormat: Z,
            format: Z
        }, r = {
            step: {
                r: !1,
                t: O
            },
            start: {
                r: !0,
                t: V
            },
            connect: {
                r: !0,
                t: j
            },
            direction: {
                r: !0,
                t: R
            },
            snap: {
                r: !1,
                t: F
            },
            animate: {
                r: !1,
                t: L
            },
            animationDuration: {
                r: !1,
                t: z
            },
            range: {
                r: !0,
                t: k
            },
            orientation: {
                r: !1,
                t: H
            },
            margin: {
                r: !1,
                t: D
            },
            limit: {
                r: !1,
                t: q
            },
            padding: {
                r: !1,
                t: T
            },
            behaviour: {
                r: !0,
                t: X
            },
            multitouch: {
                r: !0,
                t: B
            },
            ariaFormat: {
                r: !1,
                t: I
            },
            format: {
                r: !1,
                t: _
            },
            tooltips: {
                r: !1,
                t: Y
            },
            cssPrefix: {
                r: !1,
                t: W
            },
            cssClasses: {
                r: !1,
                t: $
            },
            useRequestAnimationFrame: {
                r: !1,
                t: G
            }
        }, n = {
            connect: !1,
            direction: "ltr",
            behaviour: "tap",
            multitouch: !1,
            orientation: "horizontal",
            cssPrefix: "noUi-",
            cssClasses: {
                target: "target",
                base: "base",
                origin: "origin",
                handle: "handle",
                handleLower: "handle-lower",
                handleUpper: "handle-upper",
                horizontal: "horizontal",
                vertical: "vertical",
                background: "background",
                connect: "connect",
                ltr: "ltr",
                rtl: "rtl",
                draggable: "draggable",
                drag: "state-drag",
                tap: "state-tap",
                active: "active",
                tooltip: "tooltip",
                pips: "pips",
                pipsHorizontal: "pips-horizontal",
                pipsVertical: "pips-vertical",
                marker: "marker",
                markerHorizontal: "marker-horizontal",
                markerVertical: "marker-vertical",
                markerNormal: "marker-normal",
                markerLarge: "marker-large",
                markerSub: "marker-sub",
                value: "value",
                valueHorizontal: "value-horizontal",
                valueVertical: "value-vertical",
                valueNormal: "value-normal",
                valueLarge: "value-large",
                valueSub: "value-sub"
            },
            useRequestAnimationFrame: !0
        };
        t.format && !t.ariaFormat && (t.ariaFormat = t.format), Object.keys(r).forEach(function(i) {
            if (void 0 === t[i] && void 0 === n[i]) {
                if (r[i].r) throw new Error("noUiSlider (" + Q + "): '" + i + "' is required.");
                return !0;
            }
            r[i].t(e, void 0 === t[i] ? n[i] : t[i]);
        }), e.pips = t.pips;
        var i = [ [ "left", "top" ], [ "right", "bottom" ] ];
        return e.style = i[e.dir][e.ort], e.styleOposite = i[e.dir ? 0 : 1][e.ort], e;
    }
    function K(t, i, s) {
        function c(t, e) {
            var r = pt.createElement("div");
            return e && p(r, e), t.appendChild(r), r;
        }
        function b(t, e) {
            var r = c(t, i.cssClasses.origin), n = c(r, i.cssClasses.handle);
            return n.setAttribute("data-handle", e), n.setAttribute("tabindex", "0"), n.setAttribute("role", "slider"), 
            n.setAttribute("aria-orientation", i.ort ? "vertical" : "horizontal"), 0 === e ? p(n, i.cssClasses.handleLower) : e === i.handles - 1 && p(n, i.cssClasses.handleUpper), 
            r;
        }
        function S(t, e) {
            return !!e && c(t, i.cssClasses.connect);
        }
        function w(t, e) {
            return !!i.tooltips[e] && c(t.firstChild, i.cssClasses.tooltip);
        }
        function E(t, e, r) {
            function n(t, e) {
                var r = e === i.cssClasses.value, o = r ? a : l;
                return e + " " + (r ? u : f)[i.ort] + " " + o[t];
            }
            function o(t, o) {
                o[1] = o[1] && e ? e(o[0], o[1]) : o[1];
                var a = c(s, !1);
                a.className = n(o[1], i.cssClasses.marker), a.style[i.style] = t + "%", o[1] && ((a = c(s, !1)).className = n(o[1], i.cssClasses.value), 
                a.style[i.style] = t + "%", a.innerText = r.to(o[0]));
            }
            var s = pt.createElement("div"), a = [ i.cssClasses.valueNormal, i.cssClasses.valueLarge, i.cssClasses.valueSub ], l = [ i.cssClasses.markerNormal, i.cssClasses.markerLarge, i.cssClasses.markerSub ], u = [ i.cssClasses.valueHorizontal, i.cssClasses.valueVertical ], f = [ i.cssClasses.markerHorizontal, i.cssClasses.markerVertical ];
            return p(s, i.cssClasses.pips), p(s, 0 === i.ort ? i.cssClasses.pipsHorizontal : i.cssClasses.pipsVertical), 
            Object.keys(t).forEach(function(e) {
                o(e, t[e]);
            }), s;
        }
        function C() {
            var t;
            et && ((t = et).parentElement.removeChild(t), et = null);
        }
        function N(t) {
            C();
            var e = t.mode, r = t.density || 1, n = t.filter || !1, i = function(t, e, r) {
                function i(t, e) {
                    return (t + e).toFixed(7) / 1;
                }
                var o = {}, s = lt.xVal[0], a = lt.xVal[lt.xVal.length - 1], l = !1, u = !1, c = 0;
                return (r = function(t) {
                    return t.filter(function(t) {
                        return !this[t] && (this[t] = !0);
                    }, {});
                }(r.slice().sort(function(t, e) {
                    return t - e;
                })))[0] !== s && (r.unshift(s), l = !0), r[r.length - 1] !== a && (r.push(a), u = !0), 
                r.forEach(function(n, s) {
                    var a, p, f, d, h, m, g, v, b, S = n, w = r[s + 1];
                    if ("steps" === e && (a = lt.xNumSteps[s]), a || (a = w - S), !1 !== S && void 0 !== w) for (a = Math.max(a, 1e-7), 
                    p = S; p <= w; p = i(p, a)) {
                        for (g = (h = (d = lt.toStepping(p)) - c) / t, b = h / (v = Math.round(g)), f = 1; f <= v; f += 1) o[(c + f * b).toFixed(5)] = [ "x", 0 ];
                        m = -1 < r.indexOf(p) ? 1 : "steps" === e ? 2 : 0, !s && l && (m = 0), p === w && u || (o[d.toFixed(5)] = [ p, m ]), 
                        c = d;
                    }
                }), o;
            }(r, e, function(t, e, r) {
                if ("range" === t || "steps" === t) return lt.xVal;
                if ("count" === t) {
                    if (!e) throw new Error("noUiSlider (" + Q + "): 'values' required for mode 'count'.");
                    var n, i = 100 / (e - 1), o = 0;
                    for (e = []; (n = o++ * i) <= 100; ) e.push(n);
                    t = "positions";
                }
                return "positions" === t ? e.map(function(t) {
                    return lt.fromStepping(r ? lt.getStep(t) : t);
                }) : "values" === t ? r ? e.map(function(t) {
                    return lt.fromStepping(lt.getStep(lt.toStepping(t)));
                }) : e : void 0;
            }(e, t.values || !1, t.stepped || !1)), o = t.format || {
                to: Math.round
            };
            return et = it.appendChild(E(i, n, o));
        }
        function U() {
            var t = G.getBoundingClientRect(), e = "offset" + [ "Width", "Height" ][i.ort];
            return 0 === i.ort ? t.width || G[e] : t.height || G[e];
        }
        function P(t, e, r, n) {
            var o = function(o) {
                return !it.hasAttribute("disabled") && !function(t, e) {
                    return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className);
                }(it, i.cssClasses.tap) && !!(o = function(t, e, r) {
                    var n, o, s = 0 === t.type.indexOf("touch"), a = 0 === t.type.indexOf("mouse"), l = 0 === t.type.indexOf("pointer");
                    if (0 === t.type.indexOf("MSPointer") && (l = !0), s && i.multitouch) {
                        var u = function(t) {
                            return t.target === r || r.contains(t.target);
                        };
                        if ("touchstart" === t.type) {
                            var c = Array.prototype.filter.call(t.touches, u);
                            if (1 < c.length) return !1;
                            n = c[0].pageX, o = c[0].pageY;
                        } else {
                            var p = Array.prototype.find.call(t.changedTouches, u);
                            if (!p) return !1;
                            n = p.pageX, o = p.pageY;
                        }
                    } else if (s) {
                        if (1 < t.touches.length) return !1;
                        n = t.changedTouches[0].pageX, o = t.changedTouches[0].pageY;
                    }
                    return e = e || h(pt), (a || l) && (n = t.clientX + e.x, o = t.clientY + e.y), t.pageOffset = e, 
                    t.points = [ n, o ], t.cursor = a || l, t;
                }(o, n.pageOffset, n.target || e)) && !(t === rt.start && void 0 !== o.buttons && 1 < o.buttons) && (!n.hover || !o.buttons) && (nt || o.preventDefault(), 
                o.calcPoint = o.points[i.ort], void r(o, n));
            }, s = [];
            return t.split(" ").forEach(function(t) {
                e.addEventListener(t, o, !!nt && {
                    passive: !0
                }), s.push([ t, o ]);
            }), s;
        }
        function M(t) {
            var e = 100 * (t - function(t, e) {
                var r = t.getBoundingClientRect(), n = t.ownerDocument, i = n.documentElement, o = h(n);
                return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (o.x = 0), e ? r.top + o.y - i.clientTop : r.left + o.x - i.clientLeft;
            }(G, i.ort)) / U();
            return i.dir ? 100 - e : e;
        }
        function k(t, e, r, n) {
            var i = r.slice(), o = [ !t, t ], s = [ t, !t ];
            n = n.slice(), t && n.reverse(), 1 < n.length ? n.forEach(function(t, r) {
                var n = q(i, t, i[t] + e, o[r], s[r], !1);
                !1 === n ? e = 0 : (e = n - i[t], i[t] = n);
            }) : o = s = [ !0 ];
            var a = !1;
            n.forEach(function(t, n) {
                a = B(t, r[t] + e, o[n], s[n]) || a;
            }), a && n.forEach(function(t) {
                V("update", t), V("slide", t);
            });
        }
        function V(t, e, r) {
            Object.keys(ct).forEach(function(n) {
                var o = n.split(".")[0];
                t === o && ct[n].forEach(function(t) {
                    t.call(tt, ut.map(i.format.to), e, ut.slice(), r || !1, ot.slice());
                });
            });
        }
        function F(t, e) {
            "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && z(t, e);
        }
        function L(t, e) {
            if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return z(t, e);
            var r = (i.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
            k(0 < r, 100 * r / e.baseSize, e.locations, e.handleNumbers);
        }
        function z(t, e) {
            e.handle && (f(e.handle, i.cssClasses.active), at -= 1), e.listeners.forEach(function(t) {
                ft.removeEventListener(t[0], t[1]);
            }), 0 === at && (f(it, i.cssClasses.drag), X(), t.cursor && (dt.style.cursor = "", 
            dt.removeEventListener("selectstart", r))), e.handleNumbers.forEach(function(t) {
                V("change", t), V("set", t), V("end", t);
            });
        }
        function j(t, e) {
            var n;
            if (1 === e.handleNumbers.length) {
                var o = K[e.handleNumbers[0]];
                if (o.hasAttribute("disabled")) return !1;
                n = o.children[0], at += 1, p(n, i.cssClasses.active);
            }
            t.stopPropagation();
            var s = [], a = P(rt.move, ft, L, {
                target: t.target,
                handle: n,
                listeners: s,
                startCalcPoint: t.calcPoint,
                baseSize: U(),
                pageOffset: t.pageOffset,
                handleNumbers: e.handleNumbers,
                buttonsProperty: t.buttons,
                locations: ot.slice()
            }), l = P(rt.end, ft, z, {
                target: t.target,
                handle: n,
                listeners: s,
                handleNumbers: e.handleNumbers
            }), u = P("mouseout", ft, F, {
                target: t.target,
                handle: n,
                listeners: s,
                handleNumbers: e.handleNumbers
            });
            s.push.apply(s, a.concat(l, u)), t.cursor && (dt.style.cursor = getComputedStyle(t.target).cursor, 
            1 < K.length && p(it, i.cssClasses.drag), dt.addEventListener("selectstart", r, !1)), 
            e.handleNumbers.forEach(function(t) {
                V("start", t);
            });
        }
        function H(t) {
            t.stopPropagation();
            var e = M(t.calcPoint), r = function(t) {
                var e = 100, r = !1;
                return K.forEach(function(n, i) {
                    if (!n.hasAttribute("disabled")) {
                        var o = Math.abs(ot[i] - t);
                        o < e && (r = i, e = o);
                    }
                }), r;
            }(e);
            if (!1 === r) return !1;
            i.events.snap || a(it, i.cssClasses.tap, i.animationDuration), B(r, e, !0, !0), 
            X(), V("slide", r, !0), V("update", r, !0), V("change", r, !0), V("set", r, !0), 
            i.events.snap && j(t, {
                handleNumbers: [ r ]
            });
        }
        function D(t) {
            var e = M(t.calcPoint), r = lt.getStep(e), n = lt.fromStepping(r);
            Object.keys(ct).forEach(function(t) {
                "hover" === t.split(".")[0] && ct[t].forEach(function(t) {
                    t.call(tt, n);
                });
            });
        }
        function q(t, e, r, n, o, s) {
            return 1 < K.length && (n && 0 < e && (r = Math.max(r, t[e - 1] + i.margin)), o && e < K.length - 1 && (r = Math.min(r, t[e + 1] - i.margin))), 
            1 < K.length && i.limit && (n && 0 < e && (r = Math.min(r, t[e - 1] + i.limit)), 
            o && e < K.length - 1 && (r = Math.max(r, t[e + 1] - i.limit))), i.padding && (0 === e && (r = Math.max(r, i.padding)), 
            e === K.length - 1 && (r = Math.min(r, 100 - i.padding))), !((r = function(t) {
                return Math.max(Math.min(t, 100), 0);
            }(r = lt.getStep(r))) === t[e] && !s) && r;
        }
        function T(t) {
            return t + "%";
        }
        function X() {
            st.forEach(function(t) {
                var e = 50 < ot[t] ? -1 : 1, r = 3 + (K.length + e * t);
                K[t].childNodes[0].style.zIndex = r;
            });
        }
        function B(t, e, r, n) {
            return !1 !== (e = q(ot, t, e, r, n, !1)) && (function(t, e) {
                ot[t] = e, ut[t] = lt.fromStepping(e);
                var r = function() {
                    K[t].style[i.style] = T(e), Y(t), Y(t + 1);
                };
                window.requestAnimationFrame && i.useRequestAnimationFrame ? window.requestAnimationFrame(r) : r();
            }(t, e), !0);
        }
        function Y(t) {
            if (Z[t]) {
                var e = 0, r = 100;
                0 !== t && (e = ot[t - 1]), t !== Z.length - 1 && (r = ot[t]), Z[t].style[i.style] = T(e), 
                Z[t].style[i.styleOposite] = T(100 - r);
            }
        }
        function I(t, e) {
            null !== t && !1 !== t && ("number" == typeof t && (t = String(t)), !1 === (t = i.format.from(t)) || isNaN(t) || B(e, lt.toStepping(t), !1, !1));
        }
        function _(t, e) {
            var r = u(t), n = void 0 === ot[0];
            e = void 0 === e || !!e, r.forEach(I), i.animate && !n && a(it, i.cssClasses.tap, i.animationDuration), 
            st.forEach(function(t) {
                B(t, ot[t], !0, !1);
            }), X(), st.forEach(function(t) {
                V("update", t), null !== r[t] && e && V("set", t);
            });
        }
        function W() {
            var t = ut.map(i.format.to);
            return 1 === t.length ? t[0] : t;
        }
        function $(t, e) {
            ct[t] = ct[t] || [], ct[t].push(e), "update" === t.split(".")[0] && K.forEach(function(t, e) {
                V("update", e);
            });
        }
        var G, K, Z, tt, et, rt = window.navigator.pointerEnabled ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        } : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend"
        }, nt = window.CSS && CSS.supports && CSS.supports("touch-action", "none") && function() {
            var t = !1;
            try {
                var e = Object.defineProperty({}, "passive", {
                    get: function() {
                        t = !0;
                    }
                });
                window.addEventListener("test", null, e);
            } catch (t) {}
            return t;
        }(), it = t, ot = [], st = [], at = 0, lt = i.spectrum, ut = [], ct = {}, pt = t.ownerDocument, ft = pt.documentElement, dt = pt.body;
        if (it.noUiSlider) throw new Error("noUiSlider (" + Q + "): Slider was already initialized.");
        return function(t) {
            p(t, i.cssClasses.target), 0 === i.dir ? p(t, i.cssClasses.ltr) : p(t, i.cssClasses.rtl), 
            0 === i.ort ? p(t, i.cssClasses.horizontal) : p(t, i.cssClasses.vertical), G = c(t, i.cssClasses.base);
        }(it), function(t, e) {
            K = [], (Z = []).push(S(e, t[0]));
            for (var r = 0; r < i.handles; r++) K.push(b(e, r)), st[r] = r, Z.push(S(e, t[r + 1]));
        }(i.connect, G), tt = {
            destroy: function() {
                for (var t in i.cssClasses) i.cssClasses.hasOwnProperty(t) && f(it, i.cssClasses[t]);
                for (;it.firstChild; ) it.removeChild(it.firstChild);
                delete it.noUiSlider;
            },
            steps: function() {
                return ot.map(function(t, e) {
                    var r = lt.getNearbySteps(t), n = ut[e], i = r.thisStep.step, o = null;
                    !1 !== i && n + i > r.stepAfter.startValue && (i = r.stepAfter.startValue - n), 
                    o = n > r.thisStep.startValue ? r.thisStep.step : !1 !== r.stepBefore.step && n - r.stepBefore.highestStep, 
                    100 === t ? i = null : 0 === t && (o = null);
                    var s = lt.countStepDecimals();
                    return null !== i && !1 !== i && (i = Number(i.toFixed(s))), null !== o && !1 !== o && (o = Number(o.toFixed(s))), 
                    [ o, i ];
                });
            },
            on: $,
            off: function(t) {
                var e = t && t.split(".")[0], r = e && t.substring(e.length);
                Object.keys(ct).forEach(function(t) {
                    var n = t.split(".")[0], i = t.substring(n.length);
                    e && e !== n || r && r !== i || delete ct[t];
                });
            },
            get: W,
            set: _,
            reset: function(t) {
                _(i.start, t);
            },
            __moveHandles: function(t, e, r) {
                k(t, e, ot, r);
            },
            options: s,
            updateOptions: function(t, e) {
                var r = W(), n = [ "margin", "limit", "padding", "range", "animate", "snap", "step", "format" ];
                n.forEach(function(e) {
                    void 0 !== t[e] && (s[e] = t[e]);
                });
                var o = J(s);
                n.forEach(function(e) {
                    void 0 !== t[e] && (i[e] = o[e]);
                }), lt = o.spectrum, i.margin = o.margin, i.limit = o.limit, i.padding = o.padding, 
                i.pips && N(i.pips), ot = [], _(t.start || r, e);
            },
            target: it,
            removePips: C,
            pips: N
        }, function(t) {
            t.fixed || K.forEach(function(t, e) {
                P(rt.start, t.children[0], j, {
                    handleNumbers: [ e ]
                });
            }), t.tap && P(rt.start, G, H, {}), t.hover && P(rt.move, G, D, {
                hover: !0
            }), t.drag && Z.forEach(function(e, r) {
                if (!1 !== e && 0 !== r && r !== Z.length - 1) {
                    var n = K[r - 1], o = K[r], s = [ e ];
                    p(e, i.cssClasses.draggable), t.fixed && (s.push(n.children[0]), s.push(o.children[0])), 
                    s.forEach(function(t) {
                        P(rt.start, t, j, {
                            handles: [ n, o ],
                            handleNumbers: [ r - 1, r ]
                        });
                    });
                }
            });
        }(i.events), _(i.start), i.pips && N(i.pips), i.tooltips && function() {
            var t = K.map(w);
            $("update", function(e, r, n) {
                if (t[r]) {
                    var o = e[r];
                    !0 !== i.tooltips[r] && (o = i.tooltips[r].to(n[r])), t[r].innerHTML = o;
                }
            });
        }(), $("update", function(t, e, r, n, o) {
            st.forEach(function(t) {
                var e = K[t], n = q(ot, t, 0, !0, !0, !0), s = q(ot, t, 100, !0, !0, !0), a = o[t], l = i.ariaFormat.to(r[t]);
                e.children[0].setAttribute("aria-valuemin", n.toFixed(1)), e.children[0].setAttribute("aria-valuemax", s.toFixed(1)), 
                e.children[0].setAttribute("aria-valuenow", a.toFixed(1)), e.children[0].setAttribute("aria-valuetext", l);
            });
        }), tt;
    }
    var Q = "10.1.0";
    A.prototype.getMargin = function(t) {
        var e = this.xNumSteps[0];
        if (e && t / e % 1 != 0) throw new Error("noUiSlider (" + Q + "): 'limit', 'margin' and 'padding' must be divisible by step.");
        return 2 === this.xPct.length && S(this.xVal, t);
    }, A.prototype.toStepping = function(t) {
        return E(this.xVal, this.xPct, t);
    }, A.prototype.fromStepping = function(t) {
        return function(t, e, r) {
            if (100 <= r) return t.slice(-1)[0];
            var o, a = y(r, e);
            return function(t, e) {
                return e * (t[1] - t[0]) / 100 + t[0];
            }([ t[a - 1], t[a] ], (r - (o = e[a - 1])) * b(o, e[a]));
        }(this.xVal, this.xPct, t);
    }, A.prototype.getStep = function(t) {
        return N(this.xPct, this.xSteps, this.snap, t);
    }, A.prototype.getNearbySteps = function(t) {
        var e = y(t, this.xPct);
        return {
            stepBefore: {
                startValue: this.xVal[e - 2],
                step: this.xNumSteps[e - 2],
                highestStep: this.xHighestCompleteStep[e - 2]
            },
            thisStep: {
                startValue: this.xVal[e - 1],
                step: this.xNumSteps[e - 1],
                highestStep: this.xHighestCompleteStep[e - 1]
            },
            stepAfter: {
                startValue: this.xVal[e - 0],
                step: this.xNumSteps[e - 0],
                highestStep: this.xHighestCompleteStep[e - 0]
            }
        };
    }, A.prototype.countStepDecimals = function() {
        var t = this.xNumSteps.map(c);
        return Math.max.apply(null, t);
    }, A.prototype.convert = function(t) {
        return this.getStep(this.toStepping(t));
    };
    var Z = {
        to: function(t) {
            return void 0 !== t && t.toFixed(2);
        },
        from: Number
    };
    return {
        version: Q,
        create: function(t, e) {
            if (!t || !t.nodeName) throw new Error("noUiSlider (" + Q + "): create requires a single element, got: " + t);
            var r = K(t, J(e), e);
            return t.noUiSlider = r;
        }
    };
});