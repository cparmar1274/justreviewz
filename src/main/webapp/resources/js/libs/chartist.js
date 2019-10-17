!function(e, t) {
    "function" == typeof define && define.amd ? define("Chartist", [], function() {
        return e.Chartist = t();
    }) : "object" == typeof module && module.exports ? module.exports = t() : e.Chartist = t();
}(this, function() {
    var e = {
        version: "0.11.0"
    };
    return function(e, t, i) {
        "use strict";
        i.namespaces = {
            svg: "http://www.w3.org/2000/svg",
            xmlns: "http://www.w3.org/2000/xmlns/",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            ct: "http://gionkunz.github.com/chartist-js/ct"
        }, i.noop = function(e) {
            return e;
        }, i.alphaNumerate = function(e) {
            return String.fromCharCode(97 + e % 26);
        }, i.extend = function(e) {
            var t, n, s;
            for (e = e || {}, t = 1; t < arguments.length; t++) for (var r in n = arguments[t]) "object" != typeof (s = n[r]) || null === s || s instanceof Array ? e[r] = s : e[r] = i.extend(e[r], s);
            return e;
        }, i.replaceAll = function(e, t, i) {
            return e.replace(new RegExp(t, "g"), i);
        }, i.ensureUnit = function(e, t) {
            return "number" == typeof e && (e += t), e;
        }, i.quantity = function(e) {
            if ("string" != typeof e) return {
                value: e
            };
            var t = /^(\d+)\s*(.*)$/g.exec(e);
            return {
                value: +t[1],
                unit: t[2] || void 0
            };
        }, i.querySelector = function(e) {
            return e instanceof Node ? e : t.querySelector(e);
        }, i.times = function(e) {
            return Array.apply(null, new Array(e));
        }, i.sum = function(e, t) {
            return e + (t || 0);
        }, i.mapMultiply = function(e) {
            return function(t) {
                return t * e;
            };
        }, i.mapAdd = function(e) {
            return function(t) {
                return t + e;
            };
        }, i.serialMap = function(e, t) {
            var n = [], s = Math.max.apply(null, e.map(function(e) {
                return e.length;
            }));
            return i.times(s).forEach(function(i, s) {
                var r = e.map(function(e) {
                    return e[s];
                });
                n[s] = t.apply(null, r);
            }), n;
        }, i.roundWithPrecision = function(e, t) {
            var n = Math.pow(10, t || i.precision);
            return Math.round(e * n) / n;
        }, i.precision = 8, i.escapingMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }, i.serialize = function(e) {
            return null == e ? e : ("number" == typeof e ? e = "" + e : "object" == typeof e && (e = JSON.stringify({
                data: e
            })), Object.keys(i.escapingMap).reduce(function(e, t) {
                return i.replaceAll(e, t, i.escapingMap[t]);
            }, e));
        }, i.deserialize = function(e) {
            if ("string" != typeof e) return e;
            e = Object.keys(i.escapingMap).reduce(function(e, t) {
                return i.replaceAll(e, i.escapingMap[t], t);
            }, e);
            try {
                e = void 0 !== (e = JSON.parse(e)).data ? e.data : e;
            } catch (e) {}
            return e;
        }, i.createSvg = function(e, t, n, s) {
            var r;
            return t = t || "100%", n = n || "100%", Array.prototype.slice.call(e.querySelectorAll("svg")).filter(function(e) {
                return e.getAttributeNS(i.namespaces.xmlns, "ct");
            }).forEach(function(t) {
                e.removeChild(t);
            }), (r = new i.Svg("svg").attr({
                width: t,
                height: n
            }).addClass(s))._node.style.width = t, r._node.style.height = n, e.appendChild(r._node), 
            r;
        }, i.normalizeData = function(e, t, n) {
            var s, r = {
                raw: e,
                normalized: {}
            };
            return r.normalized.series = i.getDataArray({
                series: e.series || []
            }, t, n), s = r.normalized.series.every(function(e) {
                return e instanceof Array;
            }) ? Math.max.apply(null, r.normalized.series.map(function(e) {
                return e.length;
            })) : r.normalized.series.length, r.normalized.labels = (e.labels || []).slice(), 
            Array.prototype.push.apply(r.normalized.labels, i.times(Math.max(0, s - r.normalized.labels.length)).map(function() {
                return "";
            })), t && i.reverseData(r.normalized), r;
        }, i.safeHasProperty = function(e, t) {
            return null !== e && "object" == typeof e && e.hasOwnProperty(t);
        }, i.isDataHoleValue = function(e) {
            return null == e || "number" == typeof e && isNaN(e);
        }, i.reverseData = function(e) {
            e.labels.reverse(), e.series.reverse();
            for (var t = 0; t < e.series.length; t++) "object" == typeof e.series[t] && void 0 !== e.series[t].data ? e.series[t].data.reverse() : e.series[t] instanceof Array && e.series[t].reverse();
        }, i.getDataArray = function(e, t, n) {
            return e.series.map(function s(e) {
                if (i.safeHasProperty(e, "value")) return s(e.value);
                if (i.safeHasProperty(e, "data")) return s(e.data);
                if (e instanceof Array) return e.map(s);
                if (!i.isDataHoleValue(e)) {
                    if (n) {
                        var t = {};
                        return "string" == typeof n ? t[n] = i.getNumberOrUndefined(e) : t.y = i.getNumberOrUndefined(e), 
                        t.x = e.hasOwnProperty("x") ? i.getNumberOrUndefined(e.x) : t.x, t.y = e.hasOwnProperty("y") ? i.getNumberOrUndefined(e.y) : t.y, 
                        t;
                    }
                    return i.getNumberOrUndefined(e);
                }
            });
        }, i.normalizePadding = function(e, t) {
            return t = t || 0, "number" == typeof e ? {
                top: e,
                right: e,
                bottom: e,
                left: e
            } : {
                top: "number" == typeof e.top ? e.top : t,
                right: "number" == typeof e.right ? e.right : t,
                bottom: "number" == typeof e.bottom ? e.bottom : t,
                left: "number" == typeof e.left ? e.left : t
            };
        }, i.getMetaData = function(e, t) {
            var i = e.data ? e.data[t] : e[t];
            return i ? i.meta : void 0;
        }, i.orderOfMagnitude = function(e) {
            return Math.floor(Math.log(Math.abs(e)) / Math.LN10);
        }, i.projectLength = function(e, t, i) {
            return t / i.range * e;
        }, i.getAvailableHeight = function(e, t) {
            return Math.max((i.quantity(t.height).value || e.height()) - (t.chartPadding.top + t.chartPadding.bottom) - t.axisX.offset, 0);
        }, i.getHighLow = function(e, t, n) {
            var r = {
                high: void 0 === (t = i.extend({}, t, n ? t["axis" + n.toUpperCase()] : {})).high ? -Number.MAX_VALUE : +t.high,
                low: void 0 === t.low ? Number.MAX_VALUE : +t.low
            }, a = void 0 === t.high, o = void 0 === t.low;
            return (a || o) && function s(e) {
                if (void 0 !== e) if (e instanceof Array) for (var t = 0; t < e.length; t++) s(e[t]); else {
                    var i = n ? +e[n] : +e;
                    a && i > r.high && (r.high = i), o && i < r.low && (r.low = i);
                }
            }(e), (t.referenceValue || 0 === t.referenceValue) && (r.high = Math.max(t.referenceValue, r.high), 
            r.low = Math.min(t.referenceValue, r.low)), r.high <= r.low && (0 === r.low ? r.high = 1 : r.low < 0 ? r.high = 0 : (0 < r.high || (r.high = 1), 
            r.low = 0)), r;
        }, i.isNumeric = function(e) {
            return null !== e && isFinite(e);
        }, i.isFalseyButZero = function(e) {
            return !e && 0 !== e;
        }, i.getNumberOrUndefined = function(e) {
            return i.isNumeric(e) ? +e : void 0;
        }, i.isMultiValue = function(e) {
            return "object" == typeof e && ("x" in e || "y" in e);
        }, i.getMultiValue = function(e, t) {
            return i.isMultiValue(e) ? i.getNumberOrUndefined(e[t || "y"]) : i.getNumberOrUndefined(e);
        }, i.rho = function(e) {
            function t(e, i) {
                return e % i == 0 ? i : t(i, e % i);
            }
            function i(e) {
                return e * e + 1;
            }
            if (1 === e) return e;
            var n, s = 2, r = 2;
            if (e % 2 == 0) return 2;
            for (;s = i(s) % e, r = i(i(r)) % e, 1 === (n = t(Math.abs(s - r), e)); ) ;
            return n;
        }, i.getBounds = function(e, t, n, s) {
            function r(e, t) {
                return e === (e += t) && (e *= 1 + (0 < t ? p : -p)), e;
            }
            var a, o, l, u = 0, c = {
                high: t.high,
                low: t.low
            };
            c.valueRange = c.high - c.low, c.oom = i.orderOfMagnitude(c.valueRange), c.step = Math.pow(10, c.oom), 
            c.min = Math.floor(c.low / c.step) * c.step, c.max = Math.ceil(c.high / c.step) * c.step, 
            c.range = c.max - c.min, c.numberOfSteps = Math.round(c.range / c.step);
            var h = i.projectLength(e, c.step, c) < n, d = s ? i.rho(c.range) : 0;
            if (s && i.projectLength(e, 1, c) >= n) c.step = 1; else if (s && d < c.step && i.projectLength(e, d, c) >= n) c.step = d; else for (;;) {
                if (h && i.projectLength(e, c.step, c) <= n) c.step *= 2; else {
                    if (h || !(i.projectLength(e, c.step / 2, c) >= n)) break;
                    if (c.step /= 2, s && c.step % 1 != 0) {
                        c.step *= 2;
                        break;
                    }
                }
                if (1e3 < u++) throw new Error("Exceeded maximum number of iterations while optimizing scale step!");
            }
            var p = 2221e-19;
            for (c.step = Math.max(c.step, p), o = c.min, l = c.max; o + c.step <= c.low; ) o = r(o, c.step);
            for (;l - c.step >= c.high; ) l = r(l, -c.step);
            c.min = o, c.max = l, c.range = c.max - c.min;
            var m = [];
            for (a = c.min; a <= c.max; a = r(a, c.step)) {
                var f = i.roundWithPrecision(a);
                f !== m[m.length - 1] && m.push(f);
            }
            return c.values = m, c;
        }, i.polarToCartesian = function(e, t, i, n) {
            var s = (n - 90) * Math.PI / 180;
            return {
                x: e + i * Math.cos(s),
                y: t + i * Math.sin(s)
            };
        }, i.createChartRect = function(e, t, n) {
            var s = !(!t.axisX && !t.axisY), r = s ? t.axisY.offset : 0, a = s ? t.axisX.offset : 0, o = e.width() || i.quantity(t.width).value || 0, l = e.height() || i.quantity(t.height).value || 0, u = i.normalizePadding(t.chartPadding, n);
            o = Math.max(o, r + u.left + u.right), l = Math.max(l, a + u.top + u.bottom);
            var c = {
                padding: u,
                width: function() {
                    return this.x2 - this.x1;
                },
                height: function() {
                    return this.y1 - this.y2;
                }
            };
            return s ? ("start" === t.axisX.position ? (c.y2 = u.top + a, c.y1 = Math.max(l - u.bottom, c.y2 + 1)) : (c.y2 = u.top, 
            c.y1 = Math.max(l - u.bottom - a, c.y2 + 1)), "start" === t.axisY.position ? (c.x1 = u.left + r, 
            c.x2 = Math.max(o - u.right, c.x1 + 1)) : (c.x1 = u.left, c.x2 = Math.max(o - u.right - r, c.x1 + 1))) : (c.x1 = u.left, 
            c.x2 = Math.max(o - u.right, c.x1 + 1), c.y2 = u.top, c.y1 = Math.max(l - u.bottom, c.y2 + 1)), 
            c;
        }, i.createGrid = function(e, t, n, s, r, a, o, l) {
            var u = {};
            u[n.units.pos + "1"] = e, u[n.units.pos + "2"] = e, u[n.counterUnits.pos + "1"] = s, 
            u[n.counterUnits.pos + "2"] = s + r;
            var c = a.elem("line", u, o.join(" "));
            l.emit("draw", i.extend({
                type: "grid",
                axis: n,
                index: t,
                group: a,
                element: c
            }, u));
        }, i.createGridBackground = function(e, t, i, n) {
            var s = e.elem("rect", {
                x: t.x1,
                y: t.y2,
                width: t.width(),
                height: t.height()
            }, i, !0);
            n.emit("draw", {
                type: "gridBackground",
                group: e,
                element: s
            });
        }, i.createLabel = function(e, n, s, r, a, o, l, u, c, h, d) {
            var p, m = {};
            if (m[a.units.pos] = e + l[a.units.pos], m[a.counterUnits.pos] = l[a.counterUnits.pos], 
            m[a.units.len] = n, m[a.counterUnits.len] = Math.max(0, o - 10), h) {
                var f = t.createElement("span");
                f.className = c.join(" "), f.setAttribute("xmlns", i.namespaces.xhtml), f.innerText = r[s], 
                f.style[a.units.len] = Math.round(m[a.units.len]) + "px", f.style[a.counterUnits.len] = Math.round(m[a.counterUnits.len]) + "px", 
                p = u.foreignObject(f, i.extend({
                    style: "overflow: visible;"
                }, m));
            } else p = u.elem("text", m, c.join(" ")).text(r[s]);
            d.emit("draw", i.extend({
                type: "label",
                axis: a,
                index: s,
                group: u,
                element: p,
                text: r[s]
            }, m));
        }, i.getSeriesOption = function(e, t, i) {
            if (e.name && t.series && t.series[e.name]) {
                var n = t.series[e.name];
                return n.hasOwnProperty(i) ? n[i] : t[i];
            }
            return t[i];
        }, i.optionsProvider = function(t, n, s) {
            function r(t) {
                var r = a;
                if (a = i.extend({}, l), n) for (o = 0; o < n.length; o++) e.matchMedia(n[o][0]).matches && (a = i.extend(a, n[o][1]));
                s && t && s.emit("optionsChanged", {
                    previousOptions: r,
                    currentOptions: a
                });
            }
            var a, o, l = i.extend({}, t), u = [];
            if (!e.matchMedia) throw "window.matchMedia not found! Make sure you're using a polyfill.";
            if (n) for (o = 0; o < n.length; o++) {
                var c = e.matchMedia(n[o][0]);
                c.addListener(r), u.push(c);
            }
            return r(), {
                removeMediaQueryListeners: function() {
                    u.forEach(function(e) {
                        e.removeListener(r);
                    });
                },
                getCurrentOptions: function() {
                    return i.extend({}, a);
                }
            };
        }, i.splitIntoSegments = function(e, t, n) {
            n = i.extend({}, {
                increasingX: !1,
                fillHoles: !1
            }, n);
            for (var s = [], r = !0, a = 0; a < e.length; a += 2) void 0 === i.getMultiValue(t[a / 2].value) ? n.fillHoles || (r = !0) : (n.increasingX && 2 <= a && e[a] <= e[a - 2] && (r = !0), 
            r && (s.push({
                pathCoordinates: [],
                valueData: []
            }), r = !1), s[s.length - 1].pathCoordinates.push(e[a], e[a + 1]), s[s.length - 1].valueData.push(t[a / 2]));
            return s;
        };
    }(window, document, e), function(e, t, i) {
        "use strict";
        i.Interpolation = {}, i.Interpolation.none = function(e) {
            return e = i.extend({}, {
                fillHoles: !1
            }, e), function(t, n) {
                for (var s = new i.Svg.Path(), r = !0, a = 0; a < t.length; a += 2) {
                    var o = t[a], l = t[a + 1], u = n[a / 2];
                    void 0 !== i.getMultiValue(u.value) ? (r ? s.move(o, l, !1, u) : s.line(o, l, !1, u), 
                    r = !1) : e.fillHoles || (r = !0);
                }
                return s;
            };
        }, i.Interpolation.simple = function(e) {
            e = i.extend({}, {
                divisor: 2,
                fillHoles: !1
            }, e);
            var t = 1 / Math.max(1, e.divisor);
            return function(n, s) {
                for (var r, a, o, l = new i.Svg.Path(), u = 0; u < n.length; u += 2) {
                    var c = n[u], h = n[u + 1], d = (c - r) * t, p = s[u / 2];
                    void 0 !== p.value ? (void 0 === o ? l.move(c, h, !1, p) : l.curve(r + d, a, c - d, h, c, h, !1, p), 
                    r = c, a = h, o = p) : e.fillHoles || (r = c = o = void 0);
                }
                return l;
            };
        }, i.Interpolation.cardinal = function(e) {
            e = i.extend({}, {
                tension: 1,
                fillHoles: !1
            }, e);
            var t = Math.min(1, Math.max(0, e.tension)), n = 1 - t;
            return function s(r, a) {
                var o = i.splitIntoSegments(r, a, {
                    fillHoles: e.fillHoles
                });
                if (o.length) {
                    if (1 < o.length) {
                        var l = [];
                        return o.forEach(function(e) {
                            l.push(s(e.pathCoordinates, e.valueData));
                        }), i.Svg.Path.join(l);
                    }
                    if (r = o[0].pathCoordinates, a = o[0].valueData, r.length <= 4) return i.Interpolation.none()(r, a);
                    for (var u = new i.Svg.Path().move(r[0], r[1], !1, a[0]), c = 0, h = r.length; c < h - 2; c += 2) {
                        var d = [ {
                            x: +r[c - 2],
                            y: +r[c - 1]
                        }, {
                            x: +r[c],
                            y: +r[c + 1]
                        }, {
                            x: +r[c + 2],
                            y: +r[c + 3]
                        }, {
                            x: +r[c + 4],
                            y: +r[c + 5]
                        } ];
                        h - 4 === c ? d[3] = d[2] : c || (d[0] = {
                            x: +r[c],
                            y: +r[c + 1]
                        }), u.curve(t * (-d[0].x + 6 * d[1].x + d[2].x) / 6 + n * d[2].x, t * (-d[0].y + 6 * d[1].y + d[2].y) / 6 + n * d[2].y, t * (d[1].x + 6 * d[2].x - d[3].x) / 6 + n * d[2].x, t * (d[1].y + 6 * d[2].y - d[3].y) / 6 + n * d[2].y, d[2].x, d[2].y, !1, a[(c + 2) / 2]);
                    }
                    return u;
                }
                return i.Interpolation.none()([]);
            };
        }, i.Interpolation.monotoneCubic = function(e) {
            return e = i.extend({}, {
                fillHoles: !1
            }, e), function t(n, s) {
                var r = i.splitIntoSegments(n, s, {
                    fillHoles: e.fillHoles,
                    increasingX: !0
                });
                if (r.length) {
                    if (1 < r.length) {
                        var a = [];
                        return r.forEach(function(e) {
                            a.push(t(e.pathCoordinates, e.valueData));
                        }), i.Svg.Path.join(a);
                    }
                    if (n = r[0].pathCoordinates, s = r[0].valueData, n.length <= 4) return i.Interpolation.none()(n, s);
                    var o, l, u = [], c = [], h = n.length / 2, d = [], p = [], m = [], f = [];
                    for (o = 0; o < h; o++) u[o] = n[2 * o], c[o] = n[2 * o + 1];
                    for (o = 0; o < h - 1; o++) m[o] = c[o + 1] - c[o], f[o] = u[o + 1] - u[o], p[o] = m[o] / f[o];
                    for (d[0] = p[0], d[h - 1] = p[h - 2], o = 1; o < h - 1; o++) 0 === p[o] || 0 === p[o - 1] || 0 < p[o - 1] != 0 < p[o] ? d[o] = 0 : (d[o] = 3 * (f[o - 1] + f[o]) / ((2 * f[o] + f[o - 1]) / p[o - 1] + (f[o] + 2 * f[o - 1]) / p[o]), 
                    isFinite(d[o]) || (d[o] = 0));
                    for (l = new i.Svg.Path().move(u[0], c[0], !1, s[0]), o = 0; o < h - 1; o++) l.curve(u[o] + f[o] / 3, c[o] + d[o] * f[o] / 3, u[o + 1] - f[o] / 3, c[o + 1] - d[o + 1] * f[o] / 3, u[o + 1], c[o + 1], !1, s[o + 1]);
                    return l;
                }
                return i.Interpolation.none()([]);
            };
        }, i.Interpolation.step = function(e) {
            return e = i.extend({}, {
                postpone: !0,
                fillHoles: !1
            }, e), function(t, n) {
                for (var s, r, a, o = new i.Svg.Path(), l = 0; l < t.length; l += 2) {
                    var u = t[l], c = t[l + 1], h = n[l / 2];
                    void 0 !== h.value ? (void 0 === a ? o.move(u, c, !1, h) : (e.postpone ? o.line(u, r, !1, a) : o.line(s, c, !1, h), 
                    o.line(u, c, !1, h)), s = u, r = c, a = h) : e.fillHoles || (s = r = a = void 0);
                }
                return o;
            };
        };
    }(window, document, e), function(e, t, i) {
        "use strict";
        i.EventEmitter = function() {
            var e = [];
            return {
                addEventHandler: function(t, i) {
                    e[t] = e[t] || [], e[t].push(i);
                },
                removeEventHandler: function(t, i) {
                    e[t] && (i ? (e[t].splice(e[t].indexOf(i), 1), 0 === e[t].length && delete e[t]) : delete e[t]);
                },
                emit: function(t, i) {
                    e[t] && e[t].forEach(function(e) {
                        e(i);
                    }), e["*"] && e["*"].forEach(function(e) {
                        e(t, i);
                    });
                }
            };
        };
    }(window, document, e), function(e, t, i) {
        "use strict";
        i.Class = {
            extend: function(e, t) {
                var n = t || this.prototype || i.Class, s = Object.create(n);
                i.Class.cloneDefinitions(s, e);
                var r = function() {
                    var e, t = s.constructor || function() {};
                    return e = this === i ? Object.create(s) : this, t.apply(e, Array.prototype.slice.call(arguments, 0)), 
                    e;
                };
                return r.prototype = s, r.super = n, r.extend = this.extend, r;
            },
            cloneDefinitions: function() {
                var e = function(e) {
                    var t = [];
                    if (e.length) for (var i = 0; i < e.length; i++) t.push(e[i]);
                    return t;
                }(arguments), t = e[0];
                return e.splice(1, e.length - 1).forEach(function(e) {
                    Object.getOwnPropertyNames(e).forEach(function(i) {
                        delete t[i], Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(e, i));
                    });
                }), t;
            }
        };
    }(window, document, e), function(e, t, i) {
        "use strict";
        function n() {
            e.addEventListener("resize", this.resizeListener), this.optionsProvider = i.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter), 
            this.eventEmitter.addEventHandler("optionsChanged", function() {
                this.update();
            }.bind(this)), this.options.plugins && this.options.plugins.forEach(function(e) {
                e instanceof Array ? e[0](this, e[1]) : e(this);
            }.bind(this)), this.eventEmitter.emit("data", {
                type: "initial",
                data: this.data
            }), this.createChart(this.optionsProvider.getCurrentOptions()), this.initializeTimeoutId = void 0;
        }
        i.Base = i.Class.extend({
            constructor: function(e, t, s, r, a) {
                this.container = i.querySelector(e), this.data = t || {}, this.data.labels = this.data.labels || [], 
                this.data.series = this.data.series || [], this.defaultOptions = s, this.options = r, 
                this.responsiveOptions = a, this.eventEmitter = i.EventEmitter(), this.supportsForeignObject = i.Svg.isSupported("Extensibility"), 
                this.supportsAnimations = i.Svg.isSupported("AnimationEventsAttribute"), this.resizeListener = function() {
                    this.update();
                }.bind(this), this.container && (this.container.__chartist__ && this.container.__chartist__.detach(), 
                this.container.__chartist__ = this), this.initializeTimeoutId = setTimeout(n.bind(this), 0);
            },
            optionsProvider: void 0,
            container: void 0,
            svg: void 0,
            eventEmitter: void 0,
            createChart: function() {
                throw new Error("Base chart type can't be instantiated!");
            },
            update: function(e, t, n) {
                return e && (this.data = e || {}, this.data.labels = this.data.labels || [], this.data.series = this.data.series || [], 
                this.eventEmitter.emit("data", {
                    type: "update",
                    data: this.data
                })), t && (this.options = i.extend({}, n ? this.options : this.defaultOptions, t), 
                this.initializeTimeoutId || (this.optionsProvider.removeMediaQueryListeners(), this.optionsProvider = i.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter))), 
                this.initializeTimeoutId || this.createChart(this.optionsProvider.getCurrentOptions()), 
                this;
            },
            detach: function() {
                return this.initializeTimeoutId ? e.clearTimeout(this.initializeTimeoutId) : (e.removeEventListener("resize", this.resizeListener), 
                this.optionsProvider.removeMediaQueryListeners()), this;
            },
            on: function(e, t) {
                return this.eventEmitter.addEventHandler(e, t), this;
            },
            off: function(e, t) {
                return this.eventEmitter.removeEventHandler(e, t), this;
            },
            version: i.version,
            supportsForeignObject: !1
        });
    }(window, document, e), function(e, t, i) {
        "use strict";
        i.Svg = i.Class.extend({
            constructor: function(e, n, s, r, a) {
                e instanceof Element ? this._node = e : (this._node = t.createElementNS(i.namespaces.svg, e), 
                "svg" === e && this.attr({
                    "xmlns:ct": i.namespaces.ct
                })), n && this.attr(n), s && this.addClass(s), r && (a && r._node.firstChild ? r._node.insertBefore(this._node, r._node.firstChild) : r._node.appendChild(this._node));
            },
            attr: function(e, t) {
                return "string" == typeof e ? t ? this._node.getAttributeNS(t, e) : this._node.getAttribute(e) : (Object.keys(e).forEach(function(t) {
                    if (void 0 !== e[t]) if (-1 !== t.indexOf(":")) {
                        var n = t.split(":");
                        this._node.setAttributeNS(i.namespaces[n[0]], t, e[t]);
                    } else this._node.setAttribute(t, e[t]);
                }.bind(this)), this);
            },
            elem: function(e, t, n, s) {
                return new i.Svg(e, t, n, this, s);
            },
            parent: function() {
                return this._node.parentNode instanceof SVGElement ? new i.Svg(this._node.parentNode) : null;
            },
            root: function() {
                for (var e = this._node; "svg" !== e.nodeName; ) e = e.parentNode;
                return new i.Svg(e);
            },
            querySelector: function(e) {
                var t = this._node.querySelector(e);
                return t ? new i.Svg(t) : null;
            },
            querySelectorAll: function(e) {
                var t = this._node.querySelectorAll(e);
                return t.length ? new i.Svg.List(t) : null;
            },
            getNode: function() {
                return this._node;
            },
            foreignObject: function(e, n, s, r) {
                if ("string" == typeof e) {
                    var a = t.createElement("div");
                    a.innerHTML = e, e = a.firstChild;
                }
                e.setAttribute("xmlns", i.namespaces.xmlns);
                var o = this.elem("foreignObject", n, s, r);
                return o._node.appendChild(e), o;
            },
            text: function(e) {
                return this._node.appendChild(t.createTextNode(e)), this;
            },
            empty: function() {
                for (;this._node.firstChild; ) this._node.removeChild(this._node.firstChild);
                return this;
            },
            remove: function() {
                return this._node.parentNode.removeChild(this._node), this.parent();
            },
            replace: function(e) {
                return this._node.parentNode.replaceChild(e._node, this._node), e;
            },
            append: function(e, t) {
                return t && this._node.firstChild ? this._node.insertBefore(e._node, this._node.firstChild) : this._node.appendChild(e._node), 
                this;
            },
            classes: function() {
                return this._node.getAttribute("class") ? this._node.getAttribute("class").trim().split(/\s+/) : [];
            },
            addClass: function(e) {
                return this._node.setAttribute("class", this.classes(this._node).concat(e.trim().split(/\s+/)).filter(function(e, t, i) {
                    return i.indexOf(e) === t;
                }).join(" ")), this;
            },
            removeClass: function(e) {
                var t = e.trim().split(/\s+/);
                return this._node.setAttribute("class", this.classes(this._node).filter(function(e) {
                    return -1 === t.indexOf(e);
                }).join(" ")), this;
            },
            removeAllClasses: function() {
                return this._node.setAttribute("class", ""), this;
            },
            height: function() {
                return this._node.getBoundingClientRect().height;
            },
            width: function() {
                return this._node.getBoundingClientRect().width;
            },
            animate: function(e, t, n) {
                return void 0 === t && (t = !0), Object.keys(e).forEach(function(s) {
                    function r(e, t) {
                        var r, a, o, l = {};
                        e.easing && (o = e.easing instanceof Array ? e.easing : i.Svg.Easing[e.easing], 
                        delete e.easing), e.begin = i.ensureUnit(e.begin, "ms"), e.dur = i.ensureUnit(e.dur, "ms"), 
                        o && (e.calcMode = "spline", e.keySplines = o.join(" "), e.keyTimes = "0;1"), t && (e.fill = "freeze", 
                        l[s] = e.from, this.attr(l), a = i.quantity(e.begin || 0).value, e.begin = "indefinite"), 
                        r = this.elem("animate", i.extend({
                            attributeName: s
                        }, e)), t && setTimeout(function() {
                            try {
                                r._node.beginElement();
                            } catch (t) {
                                l[s] = e.to, this.attr(l), r.remove();
                            }
                        }.bind(this), a), n && r._node.addEventListener("beginEvent", function() {
                            n.emit("animationBegin", {
                                element: this,
                                animate: r._node,
                                params: e
                            });
                        }.bind(this)), r._node.addEventListener("endEvent", function() {
                            n && n.emit("animationEnd", {
                                element: this,
                                animate: r._node,
                                params: e
                            }), t && (l[s] = e.to, this.attr(l), r.remove());
                        }.bind(this));
                    }
                    e[s] instanceof Array ? e[s].forEach(function(e) {
                        r.bind(this)(e, !1);
                    }.bind(this)) : r.bind(this)(e[s], t);
                }.bind(this)), this;
            }
        }), i.Svg.isSupported = function(e) {
            return t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#" + e, "1.1");
        }, i.Svg.Easing = {
            easeInSine: [ .47, 0, .745, .715 ],
            easeOutSine: [ .39, .575, .565, 1 ],
            easeInOutSine: [ .445, .05, .55, .95 ],
            easeInQuad: [ .55, .085, .68, .53 ],
            easeOutQuad: [ .25, .46, .45, .94 ],
            easeInOutQuad: [ .455, .03, .515, .955 ],
            easeInCubic: [ .55, .055, .675, .19 ],
            easeOutCubic: [ .215, .61, .355, 1 ],
            easeInOutCubic: [ .645, .045, .355, 1 ],
            easeInQuart: [ .895, .03, .685, .22 ],
            easeOutQuart: [ .165, .84, .44, 1 ],
            easeInOutQuart: [ .77, 0, .175, 1 ],
            easeInQuint: [ .755, .05, .855, .06 ],
            easeOutQuint: [ .23, 1, .32, 1 ],
            easeInOutQuint: [ .86, 0, .07, 1 ],
            easeInExpo: [ .95, .05, .795, .035 ],
            easeOutExpo: [ .19, 1, .22, 1 ],
            easeInOutExpo: [ 1, 0, 0, 1 ],
            easeInCirc: [ .6, .04, .98, .335 ],
            easeOutCirc: [ .075, .82, .165, 1 ],
            easeInOutCirc: [ .785, .135, .15, .86 ],
            easeInBack: [ .6, -.28, .735, .045 ],
            easeOutBack: [ .175, .885, .32, 1.275 ],
            easeInOutBack: [ .68, -.55, .265, 1.55 ]
        }, i.Svg.List = i.Class.extend({
            constructor: function(e) {
                var t = this;
                this.svgElements = [];
                for (var n = 0; n < e.length; n++) this.svgElements.push(new i.Svg(e[n]));
                Object.keys(i.Svg.prototype).filter(function(e) {
                    return -1 === [ "constructor", "parent", "querySelector", "querySelectorAll", "replace", "append", "classes", "height", "width" ].indexOf(e);
                }).forEach(function(e) {
                    t[e] = function() {
                        var n = Array.prototype.slice.call(arguments, 0);
                        return t.svgElements.forEach(function(t) {
                            i.Svg.prototype[e].apply(t, n);
                        }), t;
                    };
                });
            }
        });
    }(window, document, e), function(e, t, i) {
        "use strict";
        function n(e, t, n, s, r, a) {
            var o = i.extend({
                command: r ? e.toLowerCase() : e.toUpperCase()
            }, t, a ? {
                data: a
            } : {});
            n.splice(s, 0, o);
        }
        function s(e, t) {
            e.forEach(function(i, n) {
                r[i.command.toLowerCase()].forEach(function(s, r) {
                    t(i, s, n, r, e);
                });
            });
        }
        var r = {
            m: [ "x", "y" ],
            l: [ "x", "y" ],
            c: [ "x1", "y1", "x2", "y2", "x", "y" ],
            a: [ "rx", "ry", "xAr", "lAf", "sf", "x", "y" ]
        }, a = {
            accuracy: 3
        };
        i.Svg.Path = i.Class.extend({
            constructor: function(e, t) {
                this.pathElements = [], this.pos = 0, this.close = e, this.options = i.extend({}, a, t);
            },
            position: function(e) {
                return void 0 !== e ? (this.pos = Math.max(0, Math.min(this.pathElements.length, e)), 
                this) : this.pos;
            },
            remove: function(e) {
                return this.pathElements.splice(this.pos, e), this;
            },
            move: function(e, t, i, s) {
                return n("M", {
                    x: +e,
                    y: +t
                }, this.pathElements, this.pos++, i, s), this;
            },
            line: function(e, t, i, s) {
                return n("L", {
                    x: +e,
                    y: +t
                }, this.pathElements, this.pos++, i, s), this;
            },
            curve: function(e, t, i, s, r, a, o, l) {
                return n("C", {
                    x1: +e,
                    y1: +t,
                    x2: +i,
                    y2: +s,
                    x: +r,
                    y: +a
                }, this.pathElements, this.pos++, o, l), this;
            },
            arc: function(e, t, i, s, r, a, o, l, u) {
                return n("A", {
                    rx: +e,
                    ry: +t,
                    xAr: +i,
                    lAf: +s,
                    sf: +r,
                    x: +a,
                    y: +o
                }, this.pathElements, this.pos++, l, u), this;
            },
            scale: function(e, t) {
                return s(this.pathElements, function(i, n) {
                    i[n] *= "x" === n[0] ? e : t;
                }), this;
            },
            translate: function(e, t) {
                return s(this.pathElements, function(i, n) {
                    i[n] += "x" === n[0] ? e : t;
                }), this;
            },
            transform: function(e) {
                return s(this.pathElements, function(t, i, n, s, r) {
                    var a = e(t, i, n, s, r);
                    (a || 0 === a) && (t[i] = a);
                }), this;
            },
            parse: function(e) {
                var t = e.replace(/([A-Za-z])([0-9])/g, "$1 $2").replace(/([0-9])([A-Za-z])/g, "$1 $2").split(/[\s,]+/).reduce(function(e, t) {
                    return t.match(/[A-Za-z]/) && e.push([]), e[e.length - 1].push(t), e;
                }, []);
                "Z" === t[t.length - 1][0].toUpperCase() && t.pop();
                var n = t.map(function(e) {
                    var t = e.shift(), n = r[t.toLowerCase()];
                    return i.extend({
                        command: t
                    }, n.reduce(function(t, i, n) {
                        return t[i] = +e[n], t;
                    }, {}));
                }), s = [ this.pos, 0 ];
                return Array.prototype.push.apply(s, n), Array.prototype.splice.apply(this.pathElements, s), 
                this.pos += n.length, this;
            },
            stringify: function() {
                var e = Math.pow(10, this.options.accuracy);
                return this.pathElements.reduce(function(t, i) {
                    var n = r[i.command.toLowerCase()].map(function(t) {
                        return this.options.accuracy ? Math.round(i[t] * e) / e : i[t];
                    }.bind(this));
                    return t + i.command + n.join(",");
                }.bind(this), "") + (this.close ? "Z" : "");
            },
            clone: function(e) {
                var t = new i.Svg.Path(e || this.close);
                return t.pos = this.pos, t.pathElements = this.pathElements.slice().map(function(e) {
                    return i.extend({}, e);
                }), t.options = i.extend({}, this.options), t;
            },
            splitByCommand: function(e) {
                var t = [ new i.Svg.Path() ];
                return this.pathElements.forEach(function(n) {
                    n.command === e.toUpperCase() && 0 !== t[t.length - 1].pathElements.length && t.push(new i.Svg.Path()), 
                    t[t.length - 1].pathElements.push(n);
                }), t;
            }
        }), i.Svg.Path.elementDescriptions = r, i.Svg.Path.join = function(e, t, n) {
            for (var s = new i.Svg.Path(t, n), r = 0; r < e.length; r++) for (var a = e[r], o = 0; o < a.pathElements.length; o++) s.pathElements.push(a.pathElements[o]);
            return s;
        };
    }(window, document, e), function(e, t, i) {
        "use strict";
        var n = {
            x: {
                pos: "x",
                len: "width",
                dir: "horizontal",
                rectStart: "x1",
                rectEnd: "x2",
                rectOffset: "y2"
            },
            y: {
                pos: "y",
                len: "height",
                dir: "vertical",
                rectStart: "y2",
                rectEnd: "y1",
                rectOffset: "x1"
            }
        };
        i.Axis = i.Class.extend({
            constructor: function(e, t, i, s) {
                this.units = e, this.counterUnits = e === n.x ? n.y : n.x, this.chartRect = t, this.axisLength = t[e.rectEnd] - t[e.rectStart], 
                this.gridOffset = t[e.rectOffset], this.ticks = i, this.options = s;
            },
            createGridAndLabels: function(e, t, n, s, r) {
                var a = s["axis" + this.units.pos.toUpperCase()], o = this.ticks.map(this.projectValue.bind(this)), l = this.ticks.map(a.labelInterpolationFnc);
                o.forEach(function(u, c) {
                    var h, d = {
                        x: 0,
                        y: 0
                    };
                    h = o[c + 1] ? o[c + 1] - u : Math.max(this.axisLength - u, 30), i.isFalseyButZero(l[c]) && "" !== l[c] || ("x" === this.units.pos ? (u = this.chartRect.x1 + u, 
                    d.x = s.axisX.labelOffset.x, "start" === s.axisX.position ? d.y = this.chartRect.padding.top + s.axisX.labelOffset.y + (n ? 5 : 20) : d.y = this.chartRect.y1 + s.axisX.labelOffset.y + (n ? 5 : 20)) : (u = this.chartRect.y1 - u, 
                    d.y = s.axisY.labelOffset.y - (n ? h : 0), "start" === s.axisY.position ? d.x = n ? this.chartRect.padding.left + s.axisY.labelOffset.x : this.chartRect.x1 - 10 : d.x = this.chartRect.x2 + s.axisY.labelOffset.x + 10), 
                    a.showGrid && i.createGrid(u, c, this, this.gridOffset, this.chartRect[this.counterUnits.len](), e, [ s.classNames.grid, s.classNames[this.units.dir] ], r), 
                    a.showLabel && i.createLabel(u, h, c, l, this, a.offset, d, t, [ s.classNames.label, s.classNames[this.units.dir], "start" === a.position ? s.classNames[a.position] : s.classNames.end ], n, r));
                }.bind(this));
            },
            projectValue: function(e, t, i) {
                throw new Error("Base axis can't be instantiated!");
            }
        }), i.Axis.units = n;
    }(window, document, e), function(e, t, i) {
        "use strict";
        i.AutoScaleAxis = i.Axis.extend({
            constructor: function(e, t, n, s) {
                var r = s.highLow || i.getHighLow(t, s, e.pos);
                this.bounds = i.getBounds(n[e.rectEnd] - n[e.rectStart], r, s.scaleMinSpace || 20, s.onlyInteger), 
                this.range = {
                    min: this.bounds.min,
                    max: this.bounds.max
                }, i.AutoScaleAxis.super.constructor.call(this, e, n, this.bounds.values, s);
            },
            projectValue: function(e) {
                return this.axisLength * (+i.getMultiValue(e, this.units.pos) - this.bounds.min) / this.bounds.range;
            }
        });
    }(window, document, e), function(e, t, i) {
        "use strict";
        i.FixedScaleAxis = i.Axis.extend({
            constructor: function(e, t, n, s) {
                var r = s.highLow || i.getHighLow(t, s, e.pos);
                this.divisor = s.divisor || 1, this.ticks = s.ticks || i.times(this.divisor).map(function(e, t) {
                    return r.low + (r.high - r.low) / this.divisor * t;
                }.bind(this)), this.ticks.sort(function(e, t) {
                    return e - t;
                }), this.range = {
                    min: r.low,
                    max: r.high
                }, i.FixedScaleAxis.super.constructor.call(this, e, n, this.ticks, s), this.stepLength = this.axisLength / this.divisor;
            },
            projectValue: function(e) {
                return this.axisLength * (+i.getMultiValue(e, this.units.pos) - this.range.min) / (this.range.max - this.range.min);
            }
        });
    }(window, document, e), function(e, t, i) {
        "use strict";
        i.StepAxis = i.Axis.extend({
            constructor: function(e, t, n, s) {
                i.StepAxis.super.constructor.call(this, e, n, s.ticks, s);
                var r = Math.max(1, s.ticks.length - (s.stretch ? 1 : 0));
                this.stepLength = this.axisLength / r;
            },
            projectValue: function(e, t) {
                return this.stepLength * t;
            }
        });
    }(window, document, e), function(e, t, i) {
        "use strict";
        var n = {
            axisX: {
                offset: 30,
                position: "end",
                labelOffset: {
                    x: 0,
                    y: 0
                },
                showLabel: !0,
                showGrid: !0,
                labelInterpolationFnc: i.noop,
                type: void 0
            },
            axisY: {
                offset: 40,
                position: "start",
                labelOffset: {
                    x: 0,
                    y: 0
                },
                showLabel: !0,
                showGrid: !0,
                labelInterpolationFnc: i.noop,
                type: void 0,
                scaleMinSpace: 20,
                onlyInteger: !1
            },
            width: void 0,
            height: void 0,
            showLine: !0,
            showPoint: !0,
            showArea: !1,
            areaBase: 0,
            lineSmooth: !0,
            showGridBackground: !1,
            low: void 0,
            high: void 0,
            chartPadding: {
                top: 15,
                right: 15,
                bottom: 5,
                left: 10
            },
            fullWidth: !1,
            reverseData: !1,
            classNames: {
                chart: "ct-chart-line",
                label: "ct-label",
                labelGroup: "ct-labels",
                series: "ct-series",
                line: "ct-line",
                point: "ct-point",
                area: "ct-area",
                grid: "ct-grid",
                gridGroup: "ct-grids",
                gridBackground: "ct-grid-background",
                vertical: "ct-vertical",
                horizontal: "ct-horizontal",
                start: "ct-start",
                end: "ct-end"
            }
        };
        i.Line = i.Base.extend({
            constructor: function(e, t, s, r) {
                i.Line.super.constructor.call(this, e, t, n, i.extend({}, n, s), r);
            },
            createChart: function(e) {
                var t = i.normalizeData(this.data, e.reverseData, !0);
                this.svg = i.createSvg(this.container, e.width, e.height, e.classNames.chart);
                var s, r, a = this.svg.elem("g").addClass(e.classNames.gridGroup), o = this.svg.elem("g"), l = this.svg.elem("g").addClass(e.classNames.labelGroup), u = i.createChartRect(this.svg, e, n.padding);
                s = void 0 === e.axisX.type ? new i.StepAxis(i.Axis.units.x, t.normalized.series, u, i.extend({}, e.axisX, {
                    ticks: t.normalized.labels,
                    stretch: e.fullWidth
                })) : e.axisX.type.call(i, i.Axis.units.x, t.normalized.series, u, e.axisX), r = void 0 === e.axisY.type ? new i.AutoScaleAxis(i.Axis.units.y, t.normalized.series, u, i.extend({}, e.axisY, {
                    high: i.isNumeric(e.high) ? e.high : e.axisY.high,
                    low: i.isNumeric(e.low) ? e.low : e.axisY.low
                })) : e.axisY.type.call(i, i.Axis.units.y, t.normalized.series, u, e.axisY), s.createGridAndLabels(a, l, this.supportsForeignObject, e, this.eventEmitter), 
                r.createGridAndLabels(a, l, this.supportsForeignObject, e, this.eventEmitter), e.showGridBackground && i.createGridBackground(a, u, e.classNames.gridBackground, this.eventEmitter), 
                t.raw.series.forEach(function(n, a) {
                    var l = o.elem("g");
                    l.attr({
                        "ct:series-name": n.name,
                        "ct:meta": i.serialize(n.meta)
                    }), l.addClass([ e.classNames.series, n.className || e.classNames.series + "-" + i.alphaNumerate(a) ].join(" "));
                    var c = [], h = [];
                    t.normalized.series[a].forEach(function(e, o) {
                        var l = {
                            x: u.x1 + s.projectValue(e, o, t.normalized.series[a]),
                            y: u.y1 - r.projectValue(e, o, t.normalized.series[a])
                        };
                        c.push(l.x, l.y), h.push({
                            value: e,
                            valueIndex: o,
                            meta: i.getMetaData(n, o)
                        });
                    }.bind(this));
                    var d = {
                        lineSmooth: i.getSeriesOption(n, e, "lineSmooth"),
                        showPoint: i.getSeriesOption(n, e, "showPoint"),
                        showLine: i.getSeriesOption(n, e, "showLine"),
                        showArea: i.getSeriesOption(n, e, "showArea"),
                        areaBase: i.getSeriesOption(n, e, "areaBase")
                    }, p = ("function" == typeof d.lineSmooth ? d.lineSmooth : d.lineSmooth ? i.Interpolation.monotoneCubic() : i.Interpolation.none())(c, h);
                    if (d.showPoint && p.pathElements.forEach(function(t) {
                        var o = l.elem("line", {
                            x1: t.x,
                            y1: t.y,
                            x2: t.x + .01,
                            y2: t.y
                        }, e.classNames.point).attr({
                            "ct:value": [ t.data.value.x, t.data.value.y ].filter(i.isNumeric).join(","),
                            "ct:meta": i.serialize(t.data.meta)
                        });
                        this.eventEmitter.emit("draw", {
                            type: "point",
                            value: t.data.value,
                            index: t.data.valueIndex,
                            meta: t.data.meta,
                            series: n,
                            seriesIndex: a,
                            axisX: s,
                            axisY: r,
                            group: l,
                            element: o,
                            x: t.x,
                            y: t.y
                        });
                    }.bind(this)), d.showLine) {
                        var m = l.elem("path", {
                            d: p.stringify()
                        }, e.classNames.line, !0);
                        this.eventEmitter.emit("draw", {
                            type: "line",
                            values: t.normalized.series[a],
                            path: p.clone(),
                            chartRect: u,
                            index: a,
                            series: n,
                            seriesIndex: a,
                            seriesMeta: n.meta,
                            axisX: s,
                            axisY: r,
                            group: l,
                            element: m
                        });
                    }
                    if (d.showArea && r.range) {
                        var f = Math.max(Math.min(d.areaBase, r.range.max), r.range.min), g = u.y1 - r.projectValue(f);
                        p.splitByCommand("M").filter(function(e) {
                            return 1 < e.pathElements.length;
                        }).map(function(e) {
                            var t = e.pathElements[0], i = e.pathElements[e.pathElements.length - 1];
                            return e.clone(!0).position(0).remove(1).move(t.x, g).line(t.x, t.y).position(e.pathElements.length + 1).line(i.x, g);
                        }).forEach(function(i) {
                            var o = l.elem("path", {
                                d: i.stringify()
                            }, e.classNames.area, !0);
                            this.eventEmitter.emit("draw", {
                                type: "area",
                                values: t.normalized.series[a],
                                path: i.clone(),
                                series: n,
                                seriesIndex: a,
                                axisX: s,
                                axisY: r,
                                chartRect: u,
                                index: a,
                                group: l,
                                element: o
                            });
                        }.bind(this));
                    }
                }.bind(this)), this.eventEmitter.emit("created", {
                    bounds: r.bounds,
                    chartRect: u,
                    axisX: s,
                    axisY: r,
                    svg: this.svg,
                    options: e
                });
            }
        });
    }(window, document, e), function(e, t, i) {
        "use strict";
        var n = {
            axisX: {
                offset: 30,
                position: "end",
                labelOffset: {
                    x: 0,
                    y: 0
                },
                showLabel: !0,
                showGrid: !0,
                labelInterpolationFnc: i.noop,
                scaleMinSpace: 30,
                onlyInteger: !1
            },
            axisY: {
                offset: 40,
                position: "start",
                labelOffset: {
                    x: 0,
                    y: 0
                },
                showLabel: !0,
                showGrid: !0,
                labelInterpolationFnc: i.noop,
                scaleMinSpace: 20,
                onlyInteger: !1
            },
            width: void 0,
            height: void 0,
            high: void 0,
            low: void 0,
            referenceValue: 0,
            chartPadding: {
                top: 15,
                right: 15,
                bottom: 5,
                left: 10
            },
            seriesBarDistance: 15,
            stackBars: !1,
            stackMode: "accumulate",
            horizontalBars: !1,
            distributeSeries: !1,
            reverseData: !1,
            showGridBackground: !1,
            classNames: {
                chart: "ct-chart-bar",
                horizontalBars: "ct-horizontal-bars",
                label: "ct-label",
                labelGroup: "ct-labels",
                series: "ct-series",
                bar: "ct-bar",
                grid: "ct-grid",
                gridGroup: "ct-grids",
                gridBackground: "ct-grid-background",
                vertical: "ct-vertical",
                horizontal: "ct-horizontal",
                start: "ct-start",
                end: "ct-end"
            }
        };
        i.Bar = i.Base.extend({
            constructor: function(e, t, s, r) {
                i.Bar.super.constructor.call(this, e, t, n, i.extend({}, n, s), r);
            },
            createChart: function(e) {
                var t, s;
                e.distributeSeries ? (t = i.normalizeData(this.data, e.reverseData, e.horizontalBars ? "x" : "y")).normalized.series = t.normalized.series.map(function(e) {
                    return [ e ];
                }) : t = i.normalizeData(this.data, e.reverseData, e.horizontalBars ? "x" : "y"), 
                this.svg = i.createSvg(this.container, e.width, e.height, e.classNames.chart + (e.horizontalBars ? " " + e.classNames.horizontalBars : ""));
                var r = this.svg.elem("g").addClass(e.classNames.gridGroup), a = this.svg.elem("g"), o = this.svg.elem("g").addClass(e.classNames.labelGroup);
                if (e.stackBars && 0 !== t.normalized.series.length) {
                    var l = i.serialMap(t.normalized.series, function() {
                        return Array.prototype.slice.call(arguments).map(function(e) {
                            return e;
                        }).reduce(function(e, t) {
                            return {
                                x: e.x + (t && t.x) || 0,
                                y: e.y + (t && t.y) || 0
                            };
                        }, {
                            x: 0,
                            y: 0
                        });
                    });
                    s = i.getHighLow([ l ], e, e.horizontalBars ? "x" : "y");
                } else s = i.getHighLow(t.normalized.series, e, e.horizontalBars ? "x" : "y");
                s.high = +e.high || (0 === e.high ? 0 : s.high), s.low = +e.low || (0 === e.low ? 0 : s.low);
                var u, c, h, d, p, m = i.createChartRect(this.svg, e, n.padding);
                c = e.distributeSeries && e.stackBars ? t.normalized.labels.slice(0, 1) : t.normalized.labels, 
                e.horizontalBars ? (u = d = void 0 === e.axisX.type ? new i.AutoScaleAxis(i.Axis.units.x, t.normalized.series, m, i.extend({}, e.axisX, {
                    highLow: s,
                    referenceValue: 0
                })) : e.axisX.type.call(i, i.Axis.units.x, t.normalized.series, m, i.extend({}, e.axisX, {
                    highLow: s,
                    referenceValue: 0
                })), h = p = void 0 === e.axisY.type ? new i.StepAxis(i.Axis.units.y, t.normalized.series, m, {
                    ticks: c
                }) : e.axisY.type.call(i, i.Axis.units.y, t.normalized.series, m, e.axisY)) : (h = d = void 0 === e.axisX.type ? new i.StepAxis(i.Axis.units.x, t.normalized.series, m, {
                    ticks: c
                }) : e.axisX.type.call(i, i.Axis.units.x, t.normalized.series, m, e.axisX), u = p = void 0 === e.axisY.type ? new i.AutoScaleAxis(i.Axis.units.y, t.normalized.series, m, i.extend({}, e.axisY, {
                    highLow: s,
                    referenceValue: 0
                })) : e.axisY.type.call(i, i.Axis.units.y, t.normalized.series, m, i.extend({}, e.axisY, {
                    highLow: s,
                    referenceValue: 0
                })));
                var f = e.horizontalBars ? m.x1 + u.projectValue(0) : m.y1 - u.projectValue(0), g = [];
                h.createGridAndLabels(r, o, this.supportsForeignObject, e, this.eventEmitter), u.createGridAndLabels(r, o, this.supportsForeignObject, e, this.eventEmitter), 
                e.showGridBackground && i.createGridBackground(r, m, e.classNames.gridBackground, this.eventEmitter), 
                t.raw.series.forEach(function(n, s) {
                    var r, o, l = s - (t.raw.series.length - 1) / 2;
                    r = e.distributeSeries && !e.stackBars ? h.axisLength / t.normalized.series.length / 2 : e.distributeSeries && e.stackBars ? h.axisLength / 2 : h.axisLength / t.normalized.series[s].length / 2, 
                    (o = a.elem("g")).attr({
                        "ct:series-name": n.name,
                        "ct:meta": i.serialize(n.meta)
                    }), o.addClass([ e.classNames.series, n.className || e.classNames.series + "-" + i.alphaNumerate(s) ].join(" ")), 
                    t.normalized.series[s].forEach(function(a, c) {
                        var v, x, y, b;
                        if (b = e.distributeSeries && !e.stackBars ? s : e.distributeSeries && e.stackBars ? 0 : c, 
                        v = e.horizontalBars ? {
                            x: m.x1 + u.projectValue(a && a.x ? a.x : 0, c, t.normalized.series[s]),
                            y: m.y1 - h.projectValue(a && a.y ? a.y : 0, b, t.normalized.series[s])
                        } : {
                            x: m.x1 + h.projectValue(a && a.x ? a.x : 0, b, t.normalized.series[s]),
                            y: m.y1 - u.projectValue(a && a.y ? a.y : 0, c, t.normalized.series[s])
                        }, h instanceof i.StepAxis && (h.options.stretch || (v[h.units.pos] += r * (e.horizontalBars ? -1 : 1)), 
                        v[h.units.pos] += e.stackBars || e.distributeSeries ? 0 : l * e.seriesBarDistance * (e.horizontalBars ? -1 : 1)), 
                        y = g[c] || f, g[c] = y - (f - v[h.counterUnits.pos]), void 0 !== a) {
                            var w = {};
                            w[h.units.pos + "1"] = v[h.units.pos], w[h.units.pos + "2"] = v[h.units.pos], !e.stackBars || "accumulate" !== e.stackMode && e.stackMode ? (w[h.counterUnits.pos + "1"] = f, 
                            w[h.counterUnits.pos + "2"] = v[h.counterUnits.pos]) : (w[h.counterUnits.pos + "1"] = y, 
                            w[h.counterUnits.pos + "2"] = g[c]), w.x1 = Math.min(Math.max(w.x1, m.x1), m.x2), 
                            w.x2 = Math.min(Math.max(w.x2, m.x1), m.x2), w.y1 = Math.min(Math.max(w.y1, m.y2), m.y1), 
                            w.y2 = Math.min(Math.max(w.y2, m.y2), m.y1);
                            var E = i.getMetaData(n, c);
                            x = o.elem("line", w, e.classNames.bar).attr({
                                "ct:value": [ a.x, a.y ].filter(i.isNumeric).join(","),
                                "ct:meta": i.serialize(E)
                            }), this.eventEmitter.emit("draw", i.extend({
                                type: "bar",
                                value: a,
                                index: c,
                                meta: E,
                                series: n,
                                seriesIndex: s,
                                axisX: d,
                                axisY: p,
                                chartRect: m,
                                group: o,
                                element: x
                            }, w));
                        }
                    }.bind(this));
                }.bind(this)), this.eventEmitter.emit("created", {
                    bounds: u.bounds,
                    chartRect: m,
                    axisX: d,
                    axisY: p,
                    svg: this.svg,
                    options: e
                });
            }
        });
    }(window, document, e), function(e, t, i) {
        "use strict";
        function n(e, t, i) {
            var n = t.x > e.x;
            return n && "explode" === i || !n && "implode" === i ? "start" : n && "implode" === i || !n && "explode" === i ? "end" : "middle";
        }
        var s = {
            width: void 0,
            height: void 0,
            chartPadding: 5,
            classNames: {
                chartPie: "ct-chart-pie",
                chartDonut: "ct-chart-donut",
                series: "ct-series",
                slicePie: "ct-slice-pie",
                sliceDonut: "ct-slice-donut",
                sliceDonutSolid: "ct-slice-donut-solid",
                label: "ct-label"
            },
            startAngle: 0,
            total: void 0,
            donut: !1,
            donutSolid: !1,
            donutWidth: 60,
            showLabel: !0,
            labelOffset: 0,
            labelPosition: "inside",
            labelInterpolationFnc: i.noop,
            labelDirection: "neutral",
            reverseData: !1,
            ignoreEmptyValues: !1
        };
        i.Pie = i.Base.extend({
            constructor: function(e, t, n, r) {
                i.Pie.super.constructor.call(this, e, t, s, i.extend({}, s, n), r);
            },
            createChart: function(e) {
                var t, r, a, o, l, u = i.normalizeData(this.data), c = [], h = e.startAngle;
                this.svg = i.createSvg(this.container, e.width, e.height, e.donut ? e.classNames.chartDonut : e.classNames.chartPie), 
                r = i.createChartRect(this.svg, e, s.padding), a = Math.min(r.width() / 2, r.height() / 2), 
                l = e.total || u.normalized.series.reduce(function(e, t) {
                    return e + t;
                }, 0);
                var d = i.quantity(e.donutWidth);
                "%" === d.unit && (d.value *= a / 100), a -= e.donut && !e.donutSolid ? d.value / 2 : 0, 
                o = "outside" === e.labelPosition || e.donut && !e.donutSolid ? a : "center" === e.labelPosition ? 0 : e.donutSolid ? a - d.value / 2 : a / 2, 
                o += e.labelOffset;
                var p = {
                    x: r.x1 + r.width() / 2,
                    y: r.y2 + r.height() / 2
                }, m = 1 === u.raw.series.filter(function(e) {
                    return e.hasOwnProperty("value") ? 0 !== e.value : 0 !== e;
                }).length;
                u.raw.series.forEach(function(e, t) {
                    c[t] = this.svg.elem("g", null, null);
                }.bind(this)), e.showLabel && (t = this.svg.elem("g", null, null)), u.raw.series.forEach(function(s, r) {
                    if (0 !== u.normalized.series[r] || !e.ignoreEmptyValues) {
                        c[r].attr({
                            "ct:series-name": s.name
                        }), c[r].addClass([ e.classNames.series, s.className || e.classNames.series + "-" + i.alphaNumerate(r) ].join(" "));
                        var f = 0 < l ? h + u.normalized.series[r] / l * 360 : 0, g = Math.max(0, h - (0 === r || m ? 0 : .2));
                        359.99 <= f - g && (f = g + 359.99);
                        var v, x, y, b = i.polarToCartesian(p.x, p.y, a, g), w = i.polarToCartesian(p.x, p.y, a, f), E = new i.Svg.Path(!e.donut || e.donutSolid).move(w.x, w.y).arc(a, a, 0, 180 < f - h, 0, b.x, b.y);
                        e.donut ? e.donutSolid && (y = a - d.value, v = i.polarToCartesian(p.x, p.y, y, h - (0 === r || m ? 0 : .2)), 
                        x = i.polarToCartesian(p.x, p.y, y, f), E.line(v.x, v.y), E.arc(y, y, 0, 180 < f - h, 1, x.x, x.y)) : E.line(p.x, p.y);
                        var S = e.classNames.slicePie;
                        e.donut && (S = e.classNames.sliceDonut, e.donutSolid && (S = e.classNames.sliceDonutSolid));
                        var A = c[r].elem("path", {
                            d: E.stringify()
                        }, S);
                        if (A.attr({
                            "ct:value": u.normalized.series[r],
                            "ct:meta": i.serialize(s.meta)
                        }), e.donut && !e.donutSolid && (A._node.style.strokeWidth = d.value + "px"), this.eventEmitter.emit("draw", {
                            type: "slice",
                            value: u.normalized.series[r],
                            totalDataSum: l,
                            index: r,
                            meta: s.meta,
                            series: s,
                            group: c[r],
                            element: A,
                            path: E.clone(),
                            center: p,
                            radius: a,
                            startAngle: h,
                            endAngle: f
                        }), e.showLabel) {
                            var z, M;
                            z = 1 === u.raw.series.length ? {
                                x: p.x,
                                y: p.y
                            } : i.polarToCartesian(p.x, p.y, o, h + (f - h) / 2), M = u.normalized.labels && !i.isFalseyButZero(u.normalized.labels[r]) ? u.normalized.labels[r] : u.normalized.series[r];
                            var O = e.labelInterpolationFnc(M, r);
                            if (O || 0 === O) {
                                var C = t.elem("text", {
                                    dx: z.x,
                                    dy: z.y,
                                    "text-anchor": n(p, z, e.labelDirection)
                                }, e.classNames.label).text("" + O);
                                this.eventEmitter.emit("draw", {
                                    type: "label",
                                    index: r,
                                    group: t,
                                    element: C,
                                    text: "" + O,
                                    x: z.x,
                                    y: z.y
                                });
                            }
                        }
                        h = f;
                    }
                }.bind(this)), this.eventEmitter.emit("created", {
                    chartRect: r,
                    svg: this.svg,
                    options: e
                });
            },
            determineAnchorPosition: n
        });
    }(window, document, e), e;
});