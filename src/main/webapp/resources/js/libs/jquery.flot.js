!function(t) {
    t.color = {}, t.color.make = function(i, e, o, n) {
        var a = {};
        return a.r = i || 0, a.g = e || 0, a.b = o || 0, a.a = null != n ? n : 1, a.add = function(t, i) {
            for (var e = 0; e < t.length; ++e) a[t.charAt(e)] += i;
            return a.normalize();
        }, a.scale = function(t, i) {
            for (var e = 0; e < t.length; ++e) a[t.charAt(e)] *= i;
            return a.normalize();
        }, a.toString = function() {
            return 1 <= a.a ? "rgb(" + [ a.r, a.g, a.b ].join(",") + ")" : "rgba(" + [ a.r, a.g, a.b, a.a ].join(",") + ")";
        }, a.normalize = function() {
            function t(t, i, e) {
                return i < t ? t : e < i ? e : i;
            }
            return a.r = t(0, parseInt(a.r), 255), a.g = t(0, parseInt(a.g), 255), a.b = t(0, parseInt(a.b), 255), 
            a.a = t(0, a.a, 1), a;
        }, a.clone = function() {
            return t.color.make(a.r, a.b, a.g, a.a);
        }, a.normalize();
    }, t.color.extract = function(i, e) {
        var o;
        do {
            if ("" != (o = i.css(e).toLowerCase()) && "transparent" != o) break;
            i = i.parent();
        } while (i.length && !t.nodeName(i.get(0), "body"));
        return "rgba(0, 0, 0, 0)" == o && (o = "transparent"), t.color.parse(o);
    }, t.color.parse = function(e) {
        var o, n = t.color.make;
        if (o = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) return n(parseInt(o[1], 10), parseInt(o[2], 10), parseInt(o[3], 10));
        if (o = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(e)) return n(parseInt(o[1], 10), parseInt(o[2], 10), parseInt(o[3], 10), parseFloat(o[4]));
        if (o = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e)) return n(2.55 * parseFloat(o[1]), 2.55 * parseFloat(o[2]), 2.55 * parseFloat(o[3]));
        if (o = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(e)) return n(2.55 * parseFloat(o[1]), 2.55 * parseFloat(o[2]), 2.55 * parseFloat(o[3]), parseFloat(o[4]));
        if (o = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e)) return n(parseInt(o[1], 16), parseInt(o[2], 16), parseInt(o[3], 16));
        if (o = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e)) return n(parseInt(o[1] + o[1], 16), parseInt(o[2] + o[2], 16), parseInt(o[3] + o[3], 16));
        var a = t.trim(e).toLowerCase();
        return "transparent" == a ? n(255, 255, 255, 0) : n((o = i[a] || [ 0, 0, 0 ])[0], o[1], o[2]);
    };
    var i = {
        aqua: [ 0, 255, 255 ],
        azure: [ 240, 255, 255 ],
        beige: [ 245, 245, 220 ],
        black: [ 0, 0, 0 ],
        blue: [ 0, 0, 255 ],
        brown: [ 165, 42, 42 ],
        cyan: [ 0, 255, 255 ],
        darkblue: [ 0, 0, 139 ],
        darkcyan: [ 0, 139, 139 ],
        darkgrey: [ 169, 169, 169 ],
        darkgreen: [ 0, 100, 0 ],
        darkkhaki: [ 189, 183, 107 ],
        darkmagenta: [ 139, 0, 139 ],
        darkolivegreen: [ 85, 107, 47 ],
        darkorange: [ 255, 140, 0 ],
        darkorchid: [ 153, 50, 204 ],
        darkred: [ 139, 0, 0 ],
        darksalmon: [ 233, 150, 122 ],
        darkviolet: [ 148, 0, 211 ],
        fuchsia: [ 255, 0, 255 ],
        gold: [ 255, 215, 0 ],
        green: [ 0, 128, 0 ],
        indigo: [ 75, 0, 130 ],
        khaki: [ 240, 230, 140 ],
        lightblue: [ 173, 216, 230 ],
        lightcyan: [ 224, 255, 255 ],
        lightgreen: [ 144, 238, 144 ],
        lightgrey: [ 211, 211, 211 ],
        lightpink: [ 255, 182, 193 ],
        lightyellow: [ 255, 255, 224 ],
        lime: [ 0, 255, 0 ],
        magenta: [ 255, 0, 255 ],
        maroon: [ 128, 0, 0 ],
        navy: [ 0, 0, 128 ],
        olive: [ 128, 128, 0 ],
        orange: [ 255, 165, 0 ],
        pink: [ 255, 192, 203 ],
        purple: [ 128, 0, 128 ],
        violet: [ 128, 0, 128 ],
        red: [ 255, 0, 0 ],
        silver: [ 192, 192, 192 ],
        white: [ 255, 255, 255 ],
        yellow: [ 255, 255, 0 ]
    };
}(jQuery), function(t) {
    function i(i, e) {
        var o = e.children("." + i)[0];
        if (null == o && ((o = document.createElement("canvas")).className = i, t(o).css({
            direction: "ltr",
            position: "absolute",
            left: 0,
            top: 0
        }).appendTo(e), !o.getContext)) {
            if (!window.G_vmlCanvasManager) throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
            o = window.G_vmlCanvasManager.initElement(o);
        }
        this.element = o;
        var n = this.context = o.getContext("2d"), a = window.devicePixelRatio || 1, r = n.webkitBackingStorePixelRatio || n.mozBackingStorePixelRatio || n.msBackingStorePixelRatio || n.oBackingStorePixelRatio || n.backingStorePixelRatio || 1;
        this.pixelRatio = a / r, this.resize(e.width(), e.height()), this.textContainer = null, 
        this.text = {}, this._textCache = {};
    }
    function e(e, n, a, r) {
        function l(t, i) {
            i = [ ft ].concat(i);
            for (var e = 0; e < t.length; ++e) t[e].apply(this, i);
        }
        function s(t) {
            K = c(t), p(), m();
        }
        function c(i) {
            for (var e = [], o = 0; o < i.length; ++o) {
                var n = t.extend(!0, {}, Z.series);
                null != i[o].data ? (n.data = i[o].data, delete i[o].data, t.extend(!0, n, i[o]), 
                i[o].data = n.data) : n.data = i[o], e.push(n);
            }
            return e;
        }
        function h(t, i) {
            var e = t[i + "axis"];
            return "object" == typeof e && (e = e.n), "number" != typeof e && (e = 1), e;
        }
        function f() {
            return t.grep(at.concat(rt), function(t) {
                return t;
            });
        }
        function u(t) {
            var i, e, o = {};
            for (i = 0; i < at.length; ++i) (e = at[i]) && e.used && (o["x" + e.n] = e.c2p(t.left));
            for (i = 0; i < rt.length; ++i) (e = rt[i]) && e.used && (o["y" + e.n] = e.c2p(t.top));
            return void 0 !== o.x1 && (o.x = o.x1), void 0 !== o.y1 && (o.y = o.y1), o;
        }
        function d(i, e) {
            return i[e - 1] || (i[e - 1] = {
                n: e,
                direction: i == at ? "x" : "y",
                options: t.extend(!0, {}, i == at ? Z.xaxis : Z.yaxis)
            }), i[e - 1];
        }
        function p() {
            var i, e = K.length, o = -1;
            for (i = 0; i < K.length; ++i) {
                var n = K[i].color;
                null != n && (e--, "number" == typeof n && o < n && (o = n));
            }
            e <= o && (e = o + 1);
            var a, r = [], l = Z.colors, s = l.length, c = 0;
            for (i = 0; i < e; i++) a = t.color.parse(l[i % s] || "#666"), i % s == 0 && i && (c = 0 <= c ? c < .5 ? -c - .2 : 0 : -c), 
            r[i] = a.scale("rgb", 1 + c);
            var f, u = 0;
            for (i = 0; i < K.length; ++i) {
                if (null == (f = K[i]).color ? (f.color = r[u].toString(), ++u) : "number" == typeof f.color && (f.color = r[f.color].toString()), 
                null == f.lines.show) {
                    var p, m = !0;
                    for (p in f) if (f[p] && f[p].show) {
                        m = !1;
                        break;
                    }
                    m && (f.lines.show = !0);
                }
                null == f.lines.zero && (f.lines.zero = !!f.lines.fill), f.xaxis = d(at, h(f, "x")), 
                f.yaxis = d(rt, h(f, "y"));
            }
        }
        function m() {
            function i(t, i, e) {
                i < t.datamin && i != -b && (t.datamin = i), e > t.datamax && e != b && (t.datamax = e);
            }
            var e, o, n, a, r, s, c, h, u, d, p, m, x = Number.POSITIVE_INFINITY, g = Number.NEGATIVE_INFINITY, b = Number.MAX_VALUE;
            for (t.each(f(), function(t, i) {
                i.datamin = x, i.datamax = g, i.used = !1;
            }), e = 0; e < K.length; ++e) (r = K[e]).datapoints = {
                points: []
            }, l(ht.processRawData, [ r, r.data, r.datapoints ]);
            for (e = 0; e < K.length; ++e) {
                if (p = (r = K[e]).data, !(m = r.datapoints.format)) {
                    if ((m = []).push({
                        x: !0,
                        number: !0,
                        required: !0
                    }), m.push({
                        y: !0,
                        number: !0,
                        required: !0
                    }), r.bars.show || r.lines.show && r.lines.fill) {
                        var v = !!(r.bars.show && r.bars.zero || r.lines.show && r.lines.zero);
                        m.push({
                            y: !0,
                            number: !0,
                            required: !1,
                            defaultValue: 0,
                            autoscale: v
                        }), r.bars.horizontal && (delete m[m.length - 1].y, m[m.length - 1].x = !0);
                    }
                    r.datapoints.format = m;
                }
                if (null == r.datapoints.pointsize) {
                    r.datapoints.pointsize = m.length, c = r.datapoints.pointsize, s = r.datapoints.points;
                    var k = r.lines.show && r.lines.steps;
                    for (r.xaxis.used = r.yaxis.used = !0, o = n = 0; o < p.length; ++o, n += c) {
                        var y = null == (d = p[o]);
                        if (!y) for (a = 0; a < c; ++a) h = d[a], (u = m[a]) && (u.number && null != h && (h = +h, 
                        isNaN(h) ? h = null : h == 1 / 0 ? h = b : h == -1 / 0 && (h = -b)), null == h && (u.required && (y = !0), 
                        null != u.defaultValue && (h = u.defaultValue))), s[n + a] = h;
                        if (y) for (a = 0; a < c; ++a) null != (h = s[n + a]) && !1 !== (u = m[a]).autoscale && (u.x && i(r.xaxis, h, h), 
                        u.y && i(r.yaxis, h, h)), s[n + a] = null; else if (k && 0 < n && null != s[n - c] && s[n - c] != s[n] && s[n - c + 1] != s[n + 1]) {
                            for (a = 0; a < c; ++a) s[n + c + a] = s[n + a];
                            s[n + 1] = s[n - c + 1], n += c;
                        }
                    }
                }
            }
            for (e = 0; e < K.length; ++e) r = K[e], l(ht.processDatapoints, [ r, r.datapoints ]);
            for (e = 0; e < K.length; ++e) {
                s = (r = K[e]).datapoints.points, c = r.datapoints.pointsize, m = r.datapoints.format;
                var w = x, M = x, T = g, C = g;
                for (o = 0; o < s.length; o += c) if (null != s[o]) for (a = 0; a < c; ++a) h = s[o + a], 
                (u = m[a]) && !1 !== u.autoscale && h != b && h != -b && (u.x && (h < w && (w = h), 
                T < h && (T = h)), u.y && (h < M && (M = h), C < h && (C = h)));
                if (r.bars.show) {
                    var S;
                    switch (r.bars.align) {
                      case "left":
                        S = 0;
                        break;

                      case "right":
                        S = -r.bars.barWidth;
                        break;

                      default:
                        S = -r.bars.barWidth / 2;
                    }
                    r.bars.horizontal ? (M += S, C += S + r.bars.barWidth) : (w += S, T += S + r.bars.barWidth);
                }
                i(r.xaxis, w, T), i(r.yaxis, M, C);
            }
            t.each(f(), function(t, i) {
                i.datamin == x && (i.datamin = null), i.datamax == g && (i.datamax = null);
            });
        }
        function x() {
            dt && clearTimeout(dt), et.unbind("mousemove", E), et.unbind("mouseleave", B), et.unbind("click", G), 
            l(ht.shutdown, [ et ]);
        }
        function v(i) {
            var e = i.labelWidth, o = i.labelHeight, n = i.options.position, a = "x" === i.direction, r = i.options.tickLength, l = Z.grid.axisMargin, s = Z.grid.labelMargin, c = !0, h = !0, f = !0, u = !1;
            t.each(a ? at : rt, function(t, e) {
                e && (e.show || e.reserveSpace) && (e === i ? u = !0 : e.options.position === n && (u ? h = !1 : c = !1), 
                u || (f = !1));
            }), h && (l = 0), null == r && (r = f ? "full" : 5), isNaN(+r) || (s += +r), a ? (o += s, 
            "bottom" == n ? (lt.bottom += o + l, i.box = {
                top: tt.height - lt.bottom,
                height: o
            }) : (i.box = {
                top: lt.top + l,
                height: o
            }, lt.top += o + l)) : (e += s, "left" == n ? (i.box = {
                left: lt.left + l,
                width: e
            }, lt.left += e + l) : (lt.right += e + l, i.box = {
                left: tt.width - lt.right,
                width: e
            })), i.position = n, i.tickLength = r, i.box.padding = s, i.innermost = c;
        }
        function w() {
            var i, e = f(), o = Z.grid.show;
            for (var n in lt) {
                var a = Z.grid.margin || 0;
                lt[n] = "number" == typeof a ? a : a[n] || 0;
            }
            for (var n in l(ht.processOffset, [ lt ]), lt) "object" == typeof Z.grid.borderWidth ? lt[n] += o ? Z.grid.borderWidth[n] : 0 : lt[n] += o ? Z.grid.borderWidth : 0;
            if (t.each(e, function(t, i) {
                var e = i.options;
                i.show = null == e.show ? i.used : e.show, i.reserveSpace = null == e.reserveSpace ? i.show : e.reserveSpace, 
                function(t) {
                    var i = t.options, e = +(null != i.min ? i.min : t.datamin), o = +(null != i.max ? i.max : t.datamax), n = o - e;
                    if (0 == n) {
                        var a = 0 == o ? 1 : .01;
                        null == i.min && (e -= a), null != i.max && null == i.min || (o += a);
                    } else {
                        var r = i.autoscaleMargin;
                        null != r && (null == i.min && (e -= n * r) < 0 && null != t.datamin && 0 <= t.datamin && (e = 0), 
                        null == i.max && 0 < (o += n * r) && null != t.datamax && t.datamax <= 0 && (o = 0));
                    }
                    t.min = e, t.max = o;
                }(i);
            }), o) {
                var r = t.grep(e, function(t) {
                    return t.show || t.reserveSpace;
                });
                for (t.each(r, function(t, i) {
                    T(i), C(i), function(t, i) {
                        t.options.autoscaleMargin && 0 < i.length && (null == t.options.min && (t.min = Math.min(t.min, i[0].v)), 
                        null == t.options.max && 1 < i.length && (t.max = Math.max(t.max, i[i.length - 1].v)));
                    }(i, i.ticks), function(t) {
                        for (var i = t.options, e = t.ticks || [], o = i.labelWidth || 0, n = i.labelHeight || 0, a = o || ("x" == t.direction ? Math.floor(tt.width / (e.length || 1)) : null), r = t.direction + "Axis " + t.direction + t.n + "Axis", l = "flot-" + t.direction + "-axis flot-" + t.direction + t.n + "-axis " + r, s = i.font || "flot-tick-label tickLabel", c = 0; c < e.length; ++c) {
                            var h = e[c];
                            if (h.label) {
                                var f = tt.getTextInfo(l, h.label, s, null, a);
                                o = Math.max(o, f.width), n = Math.max(n, f.height);
                            }
                        }
                        t.labelWidth = i.labelWidth || o, t.labelHeight = i.labelHeight || n;
                    }(i);
                }), i = r.length - 1; 0 <= i; --i) v(r[i]);
                (function() {
                    var i, e = Z.grid.minBorderMargin;
                    if (null == e) for (i = e = 0; i < K.length; ++i) e = Math.max(e, 2 * (K[i].points.radius + K[i].points.lineWidth / 2));
                    var o = {
                        left: e,
                        right: e,
                        top: e,
                        bottom: e
                    };
                    t.each(f(), function(t, i) {
                        i.reserveSpace && i.ticks && i.ticks.length && ("x" === i.direction ? (o.left = Math.max(o.left, i.labelWidth / 2), 
                        o.right = Math.max(o.right, i.labelWidth / 2)) : (o.bottom = Math.max(o.bottom, i.labelHeight / 2), 
                        o.top = Math.max(o.top, i.labelHeight / 2)));
                    }), lt.left = Math.ceil(Math.max(o.left, lt.left)), lt.right = Math.ceil(Math.max(o.right, lt.right)), 
                    lt.top = Math.ceil(Math.max(o.top, lt.top)), lt.bottom = Math.ceil(Math.max(o.bottom, lt.bottom));
                })(), t.each(r, function(t, i) {
                    !function(t) {
                        "x" == t.direction ? (t.box.left = lt.left - t.labelWidth / 2, t.box.width = tt.width - lt.left - lt.right + t.labelWidth) : (t.box.top = lt.top - t.labelHeight / 2, 
                        t.box.height = tt.height - lt.bottom - lt.top + t.labelHeight);
                    }(i);
                });
            }
            st = tt.width - lt.left - lt.right, ct = tt.height - lt.bottom - lt.top, t.each(e, function(t, i) {
                !function(t) {
                    function i(t) {
                        return t;
                    }
                    var e, o, n = t.options.transform || i, a = t.options.inverseTransform;
                    o = "x" == t.direction ? (e = t.scale = st / Math.abs(n(t.max) - n(t.min)), Math.min(n(t.max), n(t.min))) : (e = -(e = t.scale = ct / Math.abs(n(t.max) - n(t.min))), 
                    Math.max(n(t.max), n(t.min))), t.p2c = n == i ? function(t) {
                        return (t - o) * e;
                    } : function(t) {
                        return (n(t) - o) * e;
                    }, t.c2p = a ? function(t) {
                        return a(o + t / e);
                    } : function(t) {
                        return o + t / e;
                    };
                }(i);
            }), o && t.each(f(), function(t, i) {
                var e, o, n, a, r, l = i.box, s = i.direction + "Axis " + i.direction + i.n + "Axis", c = "flot-" + i.direction + "-axis flot-" + i.direction + i.n + "-axis " + s, h = i.options.font || "flot-tick-label tickLabel";
                if (tt.removeText(c), i.show && 0 != i.ticks.length) for (var f = 0; f < i.ticks.length; ++f) !(e = i.ticks[f]).label || e.v < i.min || e.v > i.max || ("x" == i.direction ? (a = "center", 
                o = lt.left + i.p2c(e.v), "bottom" == i.position ? n = l.top + l.padding : (n = l.top + l.height - l.padding, 
                r = "bottom")) : (r = "middle", n = lt.top + i.p2c(e.v), "left" == i.position ? (o = l.left + l.width - l.padding, 
                a = "right") : o = l.left + l.padding), tt.addText(c, o, n, e.label, h, null, null, a, r));
            }), H();
        }
        function T(i) {
            var e, n = i.options;
            e = "number" == typeof n.ticks && 0 < n.ticks ? n.ticks : .3 * Math.sqrt("x" == i.direction ? tt.width : tt.height);
            var a = (i.max - i.min) / e, r = -Math.floor(Math.log(a) / Math.LN10), l = n.tickDecimals;
            null != l && l < r && (r = l);
            var s, c = Math.pow(10, -r), h = a / c;
            if (h < 1.5 ? s = 1 : h < 3 ? (s = 2, 2.25 < h && (null == l || r + 1 <= l) && (s = 2.5, 
            ++r)) : s = h < 7.5 ? 5 : 10, s *= c, null != n.minTickSize && s < n.minTickSize && (s = n.minTickSize), 
            i.delta = a, i.tickDecimals = Math.max(0, null != l ? l : r), i.tickSize = n.tickSize || s, 
            "time" == n.mode && !i.tickGenerator) throw new Error("Time mode requires the flot.time plugin.");
            if (i.tickGenerator || (i.tickGenerator = function(t) {
                for (var i, e = [], n = function(t, i) {
                    return i * Math.floor(t / i);
                }(t.min, t.tickSize), a = 0, r = Number.NaN; i = r, r = n + a * t.tickSize, e.push(r), 
                ++a, r < t.max && r != i; ) ;
                return e;
            }, i.tickFormatter = function(t, i) {
                var e = i.tickDecimals ? Math.pow(10, i.tickDecimals) : 1, o = "" + Math.round(t * e) / e;
                if (null != i.tickDecimals) {
                    var n = o.indexOf("."), a = -1 == n ? 0 : o.length - n - 1;
                    if (a < i.tickDecimals) return (a ? o : o + ".") + ("" + e).substr(1, i.tickDecimals - a);
                }
                return o;
            }), t.isFunction(n.tickFormatter) && (i.tickFormatter = function(t, i) {
                return "" + n.tickFormatter(t, i);
            }), null != n.alignTicksWithAxis) {
                var f = ("x" == i.direction ? at : rt)[n.alignTicksWithAxis - 1];
                if (f && f.used && f != i) {
                    var u = i.tickGenerator(i);
                    if (0 < u.length && (null == n.min && (i.min = Math.min(i.min, u[0])), null == n.max && 1 < u.length && (i.max = Math.max(i.max, u[u.length - 1]))), 
                    i.tickGenerator = function(t) {
                        var i, e, o = [];
                        for (e = 0; e < f.ticks.length; ++e) i = (f.ticks[e].v - f.min) / (f.max - f.min), 
                        i = t.min + i * (t.max - t.min), o.push(i);
                        return o;
                    }, !i.mode && null == n.tickDecimals) {
                        var d = Math.max(0, 1 - Math.floor(Math.log(i.delta) / Math.LN10)), p = i.tickGenerator(i);
                        1 < p.length && /\..*0$/.test((p[1] - p[0]).toFixed(d)) || (i.tickDecimals = d);
                    }
                }
            }
        }
        function C(i) {
            var n, a, e = i.options.ticks, o = [];
            for (null == e || "number" == typeof e && 0 < e ? o = i.tickGenerator(i) : e && (o = t.isFunction(e) ? e(i) : e), 
            i.ticks = [], n = 0; n < o.length; ++n) {
                var r = null, l = o[n];
                "object" == typeof l ? (a = +l[0], 1 < l.length && (r = l[1])) : a = +l, null == r && (r = i.tickFormatter(a, i)), 
                isNaN(a) || i.ticks.push({
                    v: a,
                    label: r
                });
            }
        }
        function W() {
            tt.clear(), l(ht.drawBackground, [ ot ]);
            var t = Z.grid;
            t.show && t.backgroundColor && (ot.save(), ot.translate(lt.left, lt.top), ot.fillStyle = $(Z.grid.backgroundColor, ct, 0, "rgba(255, 255, 255, 0)"), 
            ot.fillRect(0, 0, st, ct), ot.restore()), t.show && !t.aboveData && A();
            for (var i = 0; i < K.length; ++i) l(ht.drawSeries, [ ot, K[i] ]), P(K[i]);
            l(ht.draw, [ ot ]), t.show && t.aboveData && A(), tt.render(), V();
        }
        function z(t, i) {
            for (var e, o, n, a, r = f(), l = 0; l < r.length; ++l) if ((e = r[l]).direction == i && (t[a = i + e.n + "axis"] || 1 != e.n || (a = i + "axis"), 
            t[a])) {
                o = t[a].from, n = t[a].to;
                break;
            }
            if (t[a] || (e = "x" == i ? at[0] : rt[0], o = t[i + "1"], n = t[i + "2"]), null != o && null != n && n < o) {
                var s = o;
                o = n, n = s;
            }
            return {
                from: o,
                to: n,
                axis: e
            };
        }
        function A() {
            var i, e, o, n;
            ot.save(), ot.translate(lt.left, lt.top);
            var a = Z.grid.markings;
            if (a) for (t.isFunction(a) && ((e = ft.getAxes()).xmin = e.xaxis.min, e.xmax = e.xaxis.max, 
            e.ymin = e.yaxis.min, e.ymax = e.yaxis.max, a = a(e)), i = 0; i < a.length; ++i) {
                var r = a[i], l = z(r, "x"), s = z(r, "y");
                if (null == l.from && (l.from = l.axis.min), null == l.to && (l.to = l.axis.max), 
                null == s.from && (s.from = s.axis.min), null == s.to && (s.to = s.axis.max), !(l.to < l.axis.min || l.from > l.axis.max || s.to < s.axis.min || s.from > s.axis.max)) {
                    l.from = Math.max(l.from, l.axis.min), l.to = Math.min(l.to, l.axis.max), s.from = Math.max(s.from, s.axis.min), 
                    s.to = Math.min(s.to, s.axis.max);
                    var c = l.from === l.to, h = s.from === s.to;
                    if (!c || !h) if (l.from = Math.floor(l.axis.p2c(l.from)), l.to = Math.floor(l.axis.p2c(l.to)), 
                    s.from = Math.floor(s.axis.p2c(s.from)), s.to = Math.floor(s.axis.p2c(s.to)), c || h) {
                        var u = r.lineWidth || Z.grid.markingsLineWidth, d = u % 2 ? .5 : 0;
                        ot.beginPath(), ot.strokeStyle = r.color || Z.grid.markingsColor, ot.lineWidth = u, 
                        c ? (ot.moveTo(l.to + d, s.from), ot.lineTo(l.to + d, s.to)) : (ot.moveTo(l.from, s.to + d), 
                        ot.lineTo(l.to, s.to + d)), ot.stroke();
                    } else ot.fillStyle = r.color || Z.grid.markingsColor, ot.fillRect(l.from, s.to, l.to - l.from, s.from - s.to);
                }
            }
            e = f(), o = Z.grid.borderWidth;
            for (var p = 0; p < e.length; ++p) {
                var m, x, g, b, v = e[p], k = v.box, y = v.tickLength;
                if (v.show && 0 != v.ticks.length) {
                    for (ot.lineWidth = 1, "x" == v.direction ? (m = 0, x = "full" == y ? "top" == v.position ? 0 : ct : k.top - lt.top + ("top" == v.position ? k.height : 0)) : (x = 0, 
                    m = "full" == y ? "left" == v.position ? 0 : st : k.left - lt.left + ("left" == v.position ? k.width : 0)), 
                    v.innermost || (ot.strokeStyle = v.options.color, ot.beginPath(), g = b = 0, "x" == v.direction ? g = st + 1 : b = ct + 1, 
                    1 == ot.lineWidth && ("x" == v.direction ? x = Math.floor(x) + .5 : m = Math.floor(m) + .5), 
                    ot.moveTo(m, x), ot.lineTo(m + g, x + b), ot.stroke()), ot.strokeStyle = v.options.tickColor, 
                    ot.beginPath(), i = 0; i < v.ticks.length; ++i) {
                        var w = v.ticks[i].v;
                        g = b = 0, isNaN(w) || w < v.min || w > v.max || "full" == y && ("object" == typeof o && 0 < o[v.position] || 0 < o) && (w == v.min || w == v.max) || ("x" == v.direction ? (m = v.p2c(w), 
                        b = "full" == y ? -ct : y, "top" == v.position && (b = -b)) : (x = v.p2c(w), g = "full" == y ? -st : y, 
                        "left" == v.position && (g = -g)), 1 == ot.lineWidth && ("x" == v.direction ? m = Math.floor(m) + .5 : x = Math.floor(x) + .5), 
                        ot.moveTo(m, x), ot.lineTo(m + g, x + b));
                    }
                    ot.stroke();
                }
            }
            o && (n = Z.grid.borderColor, "object" == typeof o || "object" == typeof n ? ("object" != typeof o && (o = {
                top: o,
                right: o,
                bottom: o,
                left: o
            }), "object" != typeof n && (n = {
                top: n,
                right: n,
                bottom: n,
                left: n
            }), 0 < o.top && (ot.strokeStyle = n.top, ot.lineWidth = o.top, ot.beginPath(), 
            ot.moveTo(0 - o.left, 0 - o.top / 2), ot.lineTo(st, 0 - o.top / 2), ot.stroke()), 
            0 < o.right && (ot.strokeStyle = n.right, ot.lineWidth = o.right, ot.beginPath(), 
            ot.moveTo(st + o.right / 2, 0 - o.top), ot.lineTo(st + o.right / 2, ct), ot.stroke()), 
            0 < o.bottom && (ot.strokeStyle = n.bottom, ot.lineWidth = o.bottom, ot.beginPath(), 
            ot.moveTo(st + o.right, ct + o.bottom / 2), ot.lineTo(0, ct + o.bottom / 2), ot.stroke()), 
            0 < o.left && (ot.strokeStyle = n.left, ot.lineWidth = o.left, ot.beginPath(), ot.moveTo(0 - o.left / 2, ct + o.bottom), 
            ot.lineTo(0 - o.left / 2, 0), ot.stroke())) : (ot.lineWidth = o, ot.strokeStyle = Z.grid.borderColor, 
            ot.strokeRect(-o / 2, -o / 2, st + o, ct + o))), ot.restore();
        }
        function P(t) {
            t.lines.show && function(t) {
                function i(t, i, e, o, n) {
                    var a = t.points, r = t.pointsize, l = null, s = null;
                    ot.beginPath();
                    for (var c = r; c < a.length; c += r) {
                        var h = a[c - r], f = a[c - r + 1], u = a[c], d = a[c + 1];
                        if (null != h && null != u) {
                            if (f <= d && f < n.min) {
                                if (d < n.min) continue;
                                h = (n.min - f) / (d - f) * (u - h) + h, f = n.min;
                            } else if (d <= f && d < n.min) {
                                if (f < n.min) continue;
                                u = (n.min - f) / (d - f) * (u - h) + h, d = n.min;
                            }
                            if (d <= f && f > n.max) {
                                if (d > n.max) continue;
                                h = (n.max - f) / (d - f) * (u - h) + h, f = n.max;
                            } else if (f <= d && d > n.max) {
                                if (f > n.max) continue;
                                u = (n.max - f) / (d - f) * (u - h) + h, d = n.max;
                            }
                            if (h <= u && h < o.min) {
                                if (u < o.min) continue;
                                f = (o.min - h) / (u - h) * (d - f) + f, h = o.min;
                            } else if (u <= h && u < o.min) {
                                if (h < o.min) continue;
                                d = (o.min - h) / (u - h) * (d - f) + f, u = o.min;
                            }
                            if (u <= h && h > o.max) {
                                if (u > o.max) continue;
                                f = (o.max - h) / (u - h) * (d - f) + f, h = o.max;
                            } else if (h <= u && u > o.max) {
                                if (h > o.max) continue;
                                d = (o.max - h) / (u - h) * (d - f) + f, u = o.max;
                            }
                            h == l && f == s || ot.moveTo(o.p2c(h) + i, n.p2c(f) + e), l = u, s = d, ot.lineTo(o.p2c(u) + i, n.p2c(d) + e);
                        }
                    }
                    ot.stroke();
                }
                ot.save(), ot.translate(lt.left, lt.top), ot.lineJoin = "round";
                var e = t.lines.lineWidth, o = t.shadowSize;
                if (0 < e && 0 < o) {
                    ot.lineWidth = o, ot.strokeStyle = "rgba(0,0,0,0.1)";
                    var n = Math.PI / 18;
                    i(t.datapoints, Math.sin(n) * (e / 2 + o / 2), Math.cos(n) * (e / 2 + o / 2), t.xaxis, t.yaxis), 
                    ot.lineWidth = o / 2, i(t.datapoints, Math.sin(n) * (e / 2 + o / 4), Math.cos(n) * (e / 2 + o / 4), t.xaxis, t.yaxis);
                }
                ot.lineWidth = e, ot.strokeStyle = t.color;
                var a = R(t.lines, t.color, 0, ct);
                a && (ot.fillStyle = a, function(t, i, e) {
                    for (var o = t.points, n = t.pointsize, a = Math.min(Math.max(0, e.min), e.max), r = 0, l = !1, s = 1, c = 0, h = 0; !(0 < n && r > o.length + n); ) {
                        var f = o[(r += n) - n], u = o[r - n + s], d = o[r], p = o[r + s];
                        if (l) {
                            if (0 < n && null != f && null == d) {
                                h = r, n = -n, s = 2;
                                continue;
                            }
                            if (n < 0 && r == c + n) {
                                ot.fill(), l = !1, s = 1, r = c = h + (n = -n);
                                continue;
                            }
                        }
                        if (null != f && null != d) {
                            if (f <= d && f < i.min) {
                                if (d < i.min) continue;
                                u = (i.min - f) / (d - f) * (p - u) + u, f = i.min;
                            } else if (d <= f && d < i.min) {
                                if (f < i.min) continue;
                                p = (i.min - f) / (d - f) * (p - u) + u, d = i.min;
                            }
                            if (d <= f && f > i.max) {
                                if (d > i.max) continue;
                                u = (i.max - f) / (d - f) * (p - u) + u, f = i.max;
                            } else if (f <= d && d > i.max) {
                                if (f > i.max) continue;
                                p = (i.max - f) / (d - f) * (p - u) + u, d = i.max;
                            }
                            if (l || (ot.beginPath(), ot.moveTo(i.p2c(f), e.p2c(a)), l = !0), u >= e.max && p >= e.max) ot.lineTo(i.p2c(f), e.p2c(e.max)), 
                            ot.lineTo(i.p2c(d), e.p2c(e.max)); else if (u <= e.min && p <= e.min) ot.lineTo(i.p2c(f), e.p2c(e.min)), 
                            ot.lineTo(i.p2c(d), e.p2c(e.min)); else {
                                var m = f, x = d;
                                u <= p && u < e.min && p >= e.min ? (f = (e.min - u) / (p - u) * (d - f) + f, u = e.min) : p <= u && p < e.min && u >= e.min && (d = (e.min - u) / (p - u) * (d - f) + f, 
                                p = e.min), p <= u && u > e.max && p <= e.max ? (f = (e.max - u) / (p - u) * (d - f) + f, 
                                u = e.max) : u <= p && p > e.max && u <= e.max && (d = (e.max - u) / (p - u) * (d - f) + f, 
                                p = e.max), f != m && ot.lineTo(i.p2c(m), e.p2c(u)), ot.lineTo(i.p2c(f), e.p2c(u)), 
                                ot.lineTo(i.p2c(d), e.p2c(p)), d != x && (ot.lineTo(i.p2c(d), e.p2c(p)), ot.lineTo(i.p2c(x), e.p2c(p)));
                            }
                        }
                    }
                }(t.datapoints, t.xaxis, t.yaxis)), 0 < e && i(t.datapoints, 0, 0, t.xaxis, t.yaxis), 
                ot.restore();
            }(t), t.bars.show && function(t) {
                var i;
                switch (ot.save(), ot.translate(lt.left, lt.top), ot.lineWidth = t.bars.lineWidth, 
                ot.strokeStyle = t.color, t.bars.align) {
                  case "left":
                    i = 0;
                    break;

                  case "right":
                    i = -t.bars.barWidth;
                    break;

                  default:
                    i = -t.bars.barWidth / 2;
                }
                var e = t.bars.fill ? function(i, e) {
                    return R(t.bars, t.color, i, e);
                } : null;
                !function(i, e, o, n, a, r) {
                    for (var l = i.points, s = i.pointsize, c = 0; c < l.length; c += s) null != l[c] && L(l[c], l[c + 1], l[c + 2], e, o, n, a, r, ot, t.bars.horizontal, t.bars.lineWidth);
                }(t.datapoints, i, i + t.bars.barWidth, e, t.xaxis, t.yaxis), ot.restore();
            }(t), t.points.show && function(t) {
                function i(t, i, e, o, n, a, r, l) {
                    for (var s = t.points, c = t.pointsize, h = 0; h < s.length; h += c) {
                        var f = s[h], u = s[h + 1];
                        null == f || f < a.min || f > a.max || u < r.min || u > r.max || (ot.beginPath(), 
                        f = a.p2c(f), u = r.p2c(u) + o, "circle" == l ? ot.arc(f, u, i, 0, n ? Math.PI : 2 * Math.PI, !1) : l(ot, f, u, i, n), 
                        ot.closePath(), e && (ot.fillStyle = e, ot.fill()), ot.stroke());
                    }
                }
                ot.save(), ot.translate(lt.left, lt.top);
                var e = t.points.lineWidth, o = t.shadowSize, n = t.points.radius, a = t.points.symbol;
                if (0 == e && (e = 1e-4), 0 < e && 0 < o) {
                    var r = o / 2;
                    ot.lineWidth = r, ot.strokeStyle = "rgba(0,0,0,0.1)", i(t.datapoints, n, null, r + r / 2, !0, t.xaxis, t.yaxis, a), 
                    ot.strokeStyle = "rgba(0,0,0,0.2)", i(t.datapoints, n, null, r / 2, !0, t.xaxis, t.yaxis, a);
                }
                ot.lineWidth = e, ot.strokeStyle = t.color, i(t.datapoints, n, R(t.points, t.color), 0, !1, t.xaxis, t.yaxis, a), 
                ot.restore();
            }(t);
        }
        function L(t, i, e, o, n, a, r, l, s, c, h) {
            var f, u, d, p, m, x, g, b, v;
            c ? (b = x = g = !0, m = !1, p = i + o, d = i + n, (u = t) < (f = e) && (v = u, 
            u = f, f = v, x = !(m = !0))) : (m = x = g = !0, b = !1, f = t + o, u = t + n, (p = i) < (d = e) && (v = p, 
            p = d, d = v, g = !(b = !0))), u < r.min || f > r.max || p < l.min || d > l.max || (f < r.min && (f = r.min, 
            m = !1), u > r.max && (u = r.max, x = !1), d < l.min && (d = l.min, b = !1), p > l.max && (p = l.max, 
            g = !1), f = r.p2c(f), d = l.p2c(d), u = r.p2c(u), p = l.p2c(p), a && (s.fillStyle = a(d, p), 
            s.fillRect(f, p, u - f, d - p)), 0 < h && (m || x || g || b) && (s.beginPath(), 
            s.moveTo(f, d), m ? s.lineTo(f, p) : s.moveTo(f, p), g ? s.lineTo(u, p) : s.moveTo(u, p), 
            x ? s.lineTo(u, d) : s.moveTo(u, d), b ? s.lineTo(f, d) : s.moveTo(f, d), s.stroke()));
        }
        function R(i, e, o, n) {
            var a = i.fill;
            if (!a) return null;
            if (i.fillColor) return $(i.fillColor, o, n, e);
            var r = t.color.parse(e);
            return r.a = "number" == typeof a ? a : .4, r.normalize(), r.toString();
        }
        function H() {
            if (null != Z.legend.container ? t(Z.legend.container).html("") : e.find(".legend").remove(), 
            Z.legend.show) {
                for (var i, o, n = [], a = [], r = !1, l = Z.legend.labelFormatter, s = 0; s < K.length; ++s) (i = K[s]).label && (o = l ? l(i.label, i) : i.label) && a.push({
                    label: o,
                    color: i.color
                });
                if (Z.legend.sorted) if (t.isFunction(Z.legend.sorted)) a.sort(Z.legend.sorted); else if ("reverse" == Z.legend.sorted) a.reverse(); else {
                    var c = "descending" != Z.legend.sorted;
                    a.sort(function(t, i) {
                        return t.label == i.label ? 0 : t.label < i.label != c ? 1 : -1;
                    });
                }
                for (s = 0; s < a.length; ++s) {
                    var h = a[s];
                    s % Z.legend.noColumns == 0 && (r && n.push("</tr>"), n.push("<tr>"), r = !0), n.push('<td class="legendColorBox"><div style="border:1px solid ' + Z.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + h.color + ';overflow:hidden"></div></div></td><td class="legendLabel">' + h.label + "</td>");
                }
                if (r && n.push("</tr>"), 0 != n.length) {
                    var f = '<table style="font-size:smaller;color:' + Z.grid.color + '">' + n.join("") + "</table>";
                    if (null != Z.legend.container) t(Z.legend.container).html(f); else {
                        var u = "", d = Z.legend.position, p = Z.legend.margin;
                        null == p[0] && (p = [ p, p ]), "n" == d.charAt(0) ? u += "top:" + (p[1] + lt.top) + "px;" : "s" == d.charAt(0) && (u += "bottom:" + (p[1] + lt.bottom) + "px;"), 
                        "e" == d.charAt(1) ? u += "right:" + (p[0] + lt.right) + "px;" : "w" == d.charAt(1) && (u += "left:" + (p[0] + lt.left) + "px;");
                        var m = t('<div class="legend">' + f.replace('style="', 'style="position:absolute;' + u + ";") + "</div>").appendTo(e);
                        if (0 != Z.legend.backgroundOpacity) {
                            var x = Z.legend.backgroundColor;
                            null == x && ((x = (x = Z.grid.backgroundColor) && "string" == typeof x ? t.color.parse(x) : t.color.extract(m, "background-color")).a = 1, 
                            x = x.toString());
                            var g = m.children();
                            t('<div style="position:absolute;width:' + g.width() + "px;height:" + g.height() + "px;" + u + "background-color:" + x + ';"> </div>').prependTo(m).css("opacity", Z.legend.backgroundOpacity);
                        }
                    }
                }
            }
        }
        function E(t) {
            Z.grid.hoverable && _("plothover", t, function(t) {
                return 0 != t.hoverable;
            });
        }
        function B(t) {
            Z.grid.hoverable && _("plothover", t, function(t) {
                return !1;
            });
        }
        function G(t) {
            _("plotclick", t, function(t) {
                return 0 != t.clickable;
            });
        }
        function _(t, i, o) {
            var n = et.offset(), a = i.pageX - n.left - lt.left, r = i.pageY - n.top - lt.top, l = u({
                left: a,
                top: r
            });
            l.pageX = i.pageX, l.pageY = i.pageY;
            var s = function(t, i, e) {
                var o, n, a, r = Z.grid.mouseActiveRadius, l = r * r + 1, s = null;
                for (o = K.length - 1; 0 <= o; --o) if (e(K[o])) {
                    var c = K[o], h = c.xaxis, f = c.yaxis, u = c.datapoints.points, d = h.c2p(t), p = f.c2p(i), m = r / h.scale, x = r / f.scale;
                    if (a = c.datapoints.pointsize, h.options.inverseTransform && (m = Number.MAX_VALUE), 
                    f.options.inverseTransform && (x = Number.MAX_VALUE), c.lines.show || c.points.show) for (n = 0; n < u.length; n += a) {
                        var g = u[n], b = u[n + 1];
                        if (null != g && !(m < g - d || g - d < -m || x < b - p || b - p < -x)) {
                            var v = Math.abs(h.p2c(g) - t), k = Math.abs(f.p2c(b) - i), y = v * v + k * k;
                            y < l && (l = y, s = [ o, n / a ]);
                        }
                    }
                    if (c.bars.show && !s) {
                        var w, M;
                        switch (c.bars.align) {
                          case "left":
                            w = 0;
                            break;

                          case "right":
                            w = -c.bars.barWidth;
                            break;

                          default:
                            w = -c.bars.barWidth / 2;
                        }
                        for (M = w + c.bars.barWidth, n = 0; n < u.length; n += a) {
                            g = u[n], b = u[n + 1];
                            var T = u[n + 2];
                            null != g && (K[o].bars.horizontal ? d <= Math.max(T, g) && d >= Math.min(T, g) && b + w <= p && p <= b + M : g + w <= d && d <= g + M && p >= Math.min(T, b) && p <= Math.max(T, b)) && (s = [ o, n / a ]);
                        }
                    }
                }
                return s ? (o = s[0], n = s[1], a = K[o].datapoints.pointsize, {
                    datapoint: K[o].datapoints.points.slice(n * a, (n + 1) * a),
                    dataIndex: n,
                    series: K[o],
                    seriesIndex: o
                }) : null;
            }(a, r, o);
            if (s && (s.pageX = parseInt(s.series.xaxis.p2c(s.datapoint[0]) + n.left + lt.left, 10), 
            s.pageY = parseInt(s.series.yaxis.p2c(s.datapoint[1]) + n.top + lt.top, 10)), Z.grid.autoHighlight) {
                for (var c = 0; c < ut.length; ++c) {
                    var h = ut[c];
                    h.auto != t || s && h.series == s.series && h.point[0] == s.datapoint[0] && h.point[1] == s.datapoint[1] || q(h.series, h.point);
                }
                s && Y(s.series, s.datapoint, t);
            }
            e.trigger(t, [ l, s ]);
        }
        function V() {
            var t = Z.interaction.redrawOverlayInterval;
            -1 != t ? dt || (dt = setTimeout(X, t)) : X();
        }
        function X() {
            var t, i;
            for (dt = null, nt.save(), it.clear(), nt.translate(lt.left, lt.top), t = 0; t < ut.length; ++t) (i = ut[t]).series.bars.show ? J(i.series, i.point) : U(i.series, i.point);
            nt.restore(), l(ht.drawOverlay, [ nt ]);
        }
        function Y(t, i, e) {
            if ("number" == typeof t && (t = K[t]), "number" == typeof i) {
                var o = t.datapoints.pointsize;
                i = t.datapoints.points.slice(o * i, o * (i + 1));
            }
            var n = Q(t, i);
            -1 == n ? (ut.push({
                series: t,
                point: i,
                auto: e
            }), V()) : e || (ut[n].auto = !1);
        }
        function q(t, i) {
            if (null == t && null == i) return ut = [], void V();
            if ("number" == typeof t && (t = K[t]), "number" == typeof i) {
                var e = t.datapoints.pointsize;
                i = t.datapoints.points.slice(e * i, e * (i + 1));
            }
            var o = Q(t, i);
            -1 != o && (ut.splice(o, 1), V());
        }
        function Q(t, i) {
            for (var e = 0; e < ut.length; ++e) {
                var o = ut[e];
                if (o.series == t && o.point[0] == i[0] && o.point[1] == i[1]) return e;
            }
            return -1;
        }
        function U(i, e) {
            var o = e[0], n = e[1], a = i.xaxis, r = i.yaxis, l = "string" == typeof i.highlightColor ? i.highlightColor : t.color.parse(i.color).scale("a", .5).toString();
            if (!(o < a.min || o > a.max || n < r.min || n > r.max)) {
                var s = i.points.radius + i.points.lineWidth / 2;
                nt.lineWidth = s, nt.strokeStyle = l;
                var c = 1.5 * s;
                o = a.p2c(o), n = r.p2c(n), nt.beginPath(), "circle" == i.points.symbol ? nt.arc(o, n, c, 0, 2 * Math.PI, !1) : i.points.symbol(nt, o, n, c, !1), 
                nt.closePath(), nt.stroke();
            }
        }
        function J(i, e) {
            var o, n = "string" == typeof i.highlightColor ? i.highlightColor : t.color.parse(i.color).scale("a", .5).toString(), a = n;
            switch (i.bars.align) {
              case "left":
                o = 0;
                break;

              case "right":
                o = -i.bars.barWidth;
                break;

              default:
                o = -i.bars.barWidth / 2;
            }
            nt.lineWidth = i.bars.lineWidth, nt.strokeStyle = n, L(e[0], e[1], e[2] || 0, o, o + i.bars.barWidth, function() {
                return a;
            }, i.xaxis, i.yaxis, nt, i.bars.horizontal, i.bars.lineWidth);
        }
        function $(i, e, o, n) {
            if ("string" == typeof i) return i;
            for (var a = ot.createLinearGradient(0, o, 0, e), r = 0, l = i.colors.length; r < l; ++r) {
                var s = i.colors[r];
                if ("string" != typeof s) {
                    var c = t.color.parse(n);
                    null != s.brightness && (c = c.scale("rgb", s.brightness)), null != s.opacity && (c.a *= s.opacity), 
                    s = c.toString();
                }
                a.addColorStop(r / (l - 1), s);
            }
            return a;
        }
        var K = [], Z = {
            colors: [ "#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed" ],
            legend: {
                show: !0,
                noColumns: 1,
                labelFormatter: null,
                labelBoxBorderColor: "#ccc",
                container: null,
                position: "ne",
                margin: 5,
                backgroundColor: null,
                backgroundOpacity: .85,
                sorted: null
            },
            xaxis: {
                show: null,
                position: "bottom",
                mode: null,
                font: null,
                color: null,
                tickColor: null,
                transform: null,
                inverseTransform: null,
                min: null,
                max: null,
                autoscaleMargin: null,
                ticks: null,
                tickFormatter: null,
                labelWidth: null,
                labelHeight: null,
                reserveSpace: null,
                tickLength: null,
                alignTicksWithAxis: null,
                tickDecimals: null,
                tickSize: null,
                minTickSize: null
            },
            yaxis: {
                autoscaleMargin: .02,
                position: "left"
            },
            xaxes: [],
            yaxes: [],
            series: {
                points: {
                    show: !1,
                    radius: 3,
                    lineWidth: 2,
                    fill: !0,
                    fillColor: "#ffffff",
                    symbol: "circle"
                },
                lines: {
                    lineWidth: 2,
                    fill: !1,
                    fillColor: null,
                    steps: !1
                },
                bars: {
                    show: !1,
                    lineWidth: 2,
                    barWidth: 1,
                    fill: !0,
                    fillColor: null,
                    align: "left",
                    horizontal: !1,
                    zero: !0
                },
                shadowSize: 3,
                highlightColor: null
            },
            grid: {
                show: !0,
                aboveData: !1,
                color: "#545454",
                backgroundColor: null,
                borderColor: null,
                tickColor: null,
                margin: 0,
                labelMargin: 5,
                axisMargin: 8,
                borderWidth: 2,
                minBorderMargin: null,
                markings: null,
                markingsColor: "#f4f4f4",
                markingsLineWidth: 2,
                clickable: !1,
                hoverable: !1,
                autoHighlight: !0,
                mouseActiveRadius: 10
            },
            interaction: {
                redrawOverlayInterval: 1e3 / 60
            },
            hooks: {}
        }, tt = null, it = null, et = null, ot = null, nt = null, at = [], rt = [], lt = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, st = 0, ct = 0, ht = {
            processOptions: [],
            processRawData: [],
            processDatapoints: [],
            processOffset: [],
            drawBackground: [],
            drawSeries: [],
            draw: [],
            bindEvents: [],
            drawOverlay: [],
            shutdown: []
        }, ft = this;
        ft.setData = s, ft.setupGrid = w, ft.draw = W, ft.getPlaceholder = function() {
            return e;
        }, ft.getCanvas = function() {
            return tt.element;
        }, ft.getPlotOffset = function() {
            return lt;
        }, ft.width = function() {
            return st;
        }, ft.height = function() {
            return ct;
        }, ft.offset = function() {
            var t = et.offset();
            return t.left += lt.left, t.top += lt.top, t;
        }, ft.getData = function() {
            return K;
        }, ft.getAxes = function() {
            var i = {};
            return t.each(at.concat(rt), function(t, e) {
                e && (i[e.direction + (1 != e.n ? e.n : "") + "axis"] = e);
            }), i;
        }, ft.getXAxes = function() {
            return at;
        }, ft.getYAxes = function() {
            return rt;
        }, ft.c2p = u, ft.p2c = function(t) {
            var i, e, o, n = {};
            for (i = 0; i < at.length; ++i) if ((e = at[i]) && e.used && (null == t[o = "x" + e.n] && 1 == e.n && (o = "x"), 
            null != t[o])) {
                n.left = e.p2c(t[o]);
                break;
            }
            for (i = 0; i < rt.length; ++i) if ((e = rt[i]) && e.used && (null == t[o = "y" + e.n] && 1 == e.n && (o = "y"), 
            null != t[o])) {
                n.top = e.p2c(t[o]);
                break;
            }
            return n;
        }, ft.getOptions = function() {
            return Z;
        }, ft.highlight = Y, ft.unhighlight = q, ft.triggerRedrawOverlay = V, ft.pointOffset = function(t) {
            return {
                left: parseInt(at[h(t, "x") - 1].p2c(+t.x) + lt.left, 10),
                top: parseInt(rt[h(t, "y") - 1].p2c(+t.y) + lt.top, 10)
            };
        }, ft.shutdown = x, ft.destroy = function() {
            x(), e.removeData("plot").empty(), K = [], at = [], rt = [], ut = [], ft = ht = nt = ot = et = it = tt = Z = null;
        }, ft.resize = function() {
            var t = e.width(), i = e.height();
            tt.resize(t, i), it.resize(t, i);
        }, ft.hooks = ht, function() {
            for (var e = {
                Canvas: i
            }, o = 0; o < r.length; ++o) {
                var n = r[o];
                n.init(ft, e), n.options && t.extend(!0, Z, n.options);
            }
        }(), function(i) {
            t.extend(!0, Z, i), i && i.colors && (Z.colors = i.colors), null == Z.xaxis.color && (Z.xaxis.color = t.color.parse(Z.grid.color).scale("a", .22).toString()), 
            null == Z.yaxis.color && (Z.yaxis.color = t.color.parse(Z.grid.color).scale("a", .22).toString()), 
            null == Z.xaxis.tickColor && (Z.xaxis.tickColor = Z.grid.tickColor || Z.xaxis.color), 
            null == Z.yaxis.tickColor && (Z.yaxis.tickColor = Z.grid.tickColor || Z.yaxis.color), 
            null == Z.grid.borderColor && (Z.grid.borderColor = Z.grid.color), null == Z.grid.tickColor && (Z.grid.tickColor = t.color.parse(Z.grid.color).scale("a", .22).toString());
            var o, n, a, r = e.css("font-size"), s = r ? +r.replace("px", "") : 13, c = {
                style: e.css("font-style"),
                size: Math.round(.8 * s),
                variant: e.css("font-variant"),
                weight: e.css("font-weight"),
                family: e.css("font-family")
            };
            for (a = Z.xaxes.length || 1, o = 0; o < a; ++o) (n = Z.xaxes[o]) && !n.tickColor && (n.tickColor = n.color), 
            n = t.extend(!0, {}, Z.xaxis, n), (Z.xaxes[o] = n).font && (n.font = t.extend({}, c, n.font), 
            n.font.color || (n.font.color = n.color), n.font.lineHeight || (n.font.lineHeight = Math.round(1.15 * n.font.size)));
            for (a = Z.yaxes.length || 1, o = 0; o < a; ++o) (n = Z.yaxes[o]) && !n.tickColor && (n.tickColor = n.color), 
            n = t.extend(!0, {}, Z.yaxis, n), (Z.yaxes[o] = n).font && (n.font = t.extend({}, c, n.font), 
            n.font.color || (n.font.color = n.color), n.font.lineHeight || (n.font.lineHeight = Math.round(1.15 * n.font.size)));
            for (Z.xaxis.noTicks && null == Z.xaxis.ticks && (Z.xaxis.ticks = Z.xaxis.noTicks), 
            Z.yaxis.noTicks && null == Z.yaxis.ticks && (Z.yaxis.ticks = Z.yaxis.noTicks), Z.x2axis && (Z.xaxes[1] = t.extend(!0, {}, Z.xaxis, Z.x2axis), 
            Z.xaxes[1].position = "top", null == Z.x2axis.min && (Z.xaxes[1].min = null), null == Z.x2axis.max && (Z.xaxes[1].max = null)), 
            Z.y2axis && (Z.yaxes[1] = t.extend(!0, {}, Z.yaxis, Z.y2axis), Z.yaxes[1].position = "right", 
            null == Z.y2axis.min && (Z.yaxes[1].min = null), null == Z.y2axis.max && (Z.yaxes[1].max = null)), 
            Z.grid.coloredAreas && (Z.grid.markings = Z.grid.coloredAreas), Z.grid.coloredAreasColor && (Z.grid.markingsColor = Z.grid.coloredAreasColor), 
            Z.lines && t.extend(!0, Z.series.lines, Z.lines), Z.points && t.extend(!0, Z.series.points, Z.points), 
            Z.bars && t.extend(!0, Z.series.bars, Z.bars), null != Z.shadowSize && (Z.series.shadowSize = Z.shadowSize), 
            null != Z.highlightColor && (Z.series.highlightColor = Z.highlightColor), o = 0; o < Z.xaxes.length; ++o) d(at, o + 1).options = Z.xaxes[o];
            for (o = 0; o < Z.yaxes.length; ++o) d(rt, o + 1).options = Z.yaxes[o];
            for (var h in ht) Z.hooks[h] && Z.hooks[h].length && (ht[h] = ht[h].concat(Z.hooks[h]));
            l(ht.processOptions, [ Z ]);
        }(a), function() {
            e.css("padding", 0).children().filter(function() {
                return !t(this).hasClass("flot-overlay") && !t(this).hasClass("flot-base");
            }).remove(), "static" == e.css("position") && e.css("position", "relative"), tt = new i("flot-base", e), 
            it = new i("flot-overlay", e), ot = tt.context, nt = it.context, et = t(it.element).unbind();
            var o = e.data("plot");
            o && (o.shutdown(), it.clear()), e.data("plot", ft);
        }(), s(n), w(), W(), Z.grid.hoverable && (et.mousemove(E), et.bind("mouseleave", B)), 
        Z.grid.clickable && et.click(G), l(ht.bindEvents, [ et ]);
        var ut = [], dt = null;
    }
    var n = Object.prototype.hasOwnProperty;
    t.fn.detach || (t.fn.detach = function() {
        return this.each(function() {
            this.parentNode && this.parentNode.removeChild(this);
        });
    }), i.prototype.resize = function(t, i) {
        if (t <= 0 || i <= 0) throw new Error("Invalid dimensions for plot, width = " + t + ", height = " + i);
        var e = this.element, o = this.context, n = this.pixelRatio;
        this.width != t && (e.width = t * n, e.style.width = t + "px", this.width = t), 
        this.height != i && (e.height = i * n, e.style.height = i + "px", this.height = i), 
        o.restore(), o.save(), o.scale(n, n);
    }, i.prototype.clear = function() {
        this.context.clearRect(0, 0, this.width, this.height);
    }, i.prototype.render = function() {
        var t = this._textCache;
        for (var i in t) if (n.call(t, i)) {
            var e = this.getTextLayer(i), o = t[i];
            for (var a in e.hide(), o) if (n.call(o, a)) {
                var r = o[a];
                for (var l in r) if (n.call(r, l)) {
                    for (var s, c = r[l].positions, h = 0; s = c[h]; h++) s.active ? s.rendered || (e.append(s.element), 
                    s.rendered = !0) : (c.splice(h--, 1), s.rendered && s.element.detach());
                    0 == c.length && delete r[l];
                }
            }
            e.show();
        }
    }, i.prototype.getTextLayer = function(i) {
        var e = this.text[i];
        return null == e && (null == this.textContainer && (this.textContainer = t("<div class='flot-text'></div>").css({
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            "font-size": "smaller",
            color: "#545454"
        }).insertAfter(this.element)), e = this.text[i] = t("<div></div>").addClass(i).css({
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }).appendTo(this.textContainer)), e;
    }, i.prototype.getTextInfo = function(i, e, o, n, a) {
        var r, l, s, c;
        if (e = "" + e, r = "object" == typeof o ? o.style + " " + o.variant + " " + o.weight + " " + o.size + "px/" + o.lineHeight + "px " + o.family : o, 
        null == (l = this._textCache[i]) && (l = this._textCache[i] = {}), null == (s = l[r]) && (s = l[r] = {}), 
        null == (c = s[e])) {
            var h = t("<div></div>").html(e).css({
                position: "absolute",
                "max-width": a,
                top: -9999
            }).appendTo(this.getTextLayer(i));
            "object" == typeof o ? h.css({
                font: r,
                color: o.color
            }) : "string" == typeof o && h.addClass(o), c = s[e] = {
                width: h.outerWidth(!0),
                height: h.outerHeight(!0),
                element: h,
                positions: []
            }, h.detach();
        }
        return c;
    }, i.prototype.addText = function(t, i, e, o, n, a, r, l, s) {
        var c = this.getTextInfo(t, o, n, a, r), h = c.positions;
        "center" == l ? i -= c.width / 2 : "right" == l && (i -= c.width), "middle" == s ? e -= c.height / 2 : "bottom" == s && (e -= c.height);
        for (var f, u = 0; f = h[u]; u++) if (f.x == i && f.y == e) return void (f.active = !0);
        f = {
            active: !0,
            rendered: !1,
            element: h.length ? c.element.clone() : c.element,
            x: i,
            y: e
        }, h.push(f), f.element.css({
            top: Math.round(e),
            left: Math.round(i),
            "text-align": l
        });
    }, i.prototype.removeText = function(t, i, e, o, a, r) {
        if (null == o) {
            var l = this._textCache[t];
            if (null != l) for (var s in l) if (n.call(l, s)) {
                var c = l[s];
                for (var h in c) if (n.call(c, h)) for (var f = c[h].positions, u = 0; d = f[u]; u++) d.active = !1;
            }
        } else {
            var d;
            for (f = this.getTextInfo(t, o, a, r).positions, u = 0; d = f[u]; u++) d.x == i && d.y == e && (d.active = !1);
        }
    }, t.plot = function(i, o, n) {
        return new e(t(i), o, n, t.plot.plugins);
    }, t.plot.version = "0.8.3", t.plot.plugins = [], t.fn.plot = function(i, e) {
        return this.each(function() {
            t.plot(this, i, e);
        });
    };
}(jQuery);