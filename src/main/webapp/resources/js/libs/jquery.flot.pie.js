!function(e) {
    var t = {
        series: {
            pie: {
                show: !1,
                radius: "auto",
                innerRadius: 0,
                startAngle: 1.5,
                tilt: 1,
                shadow: {
                    left: 5,
                    top: 15,
                    alpha: .02
                },
                offset: {
                    top: 0,
                    left: "auto"
                },
                stroke: {
                    color: "#fff",
                    width: 1
                },
                label: {
                    show: "auto",
                    formatter: function(e, i) {
                        return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + i.color + ";'>" + e + "<br/>" + Math.round(i.percent) + "%</div>";
                    },
                    radius: 1,
                    background: {
                        color: null,
                        opacity: 0
                    },
                    threshold: 0
                },
                combine: {
                    threshold: -1,
                    color: null,
                    label: "Other"
                },
                highlight: {
                    opacity: .5
                }
            }
        }
    };
    e.plot.plugins.push({
        init: function(t) {
            function r(i, s, t) {
                y || (y = !0, b = i.getCanvas(), w = e(b).parent(), k = i.getOptions(), i.setData(function(i) {
                    for (var s = 0, t = 0, r = 0, a = k.series.pie.combine.color, l = [], n = 0; n < i.length; ++n) o = i[n].data, 
                    e.isArray(o) && 1 == o.length && (o = o[0]), e.isArray(o) ? !isNaN(parseFloat(o[1])) && isFinite(o[1]) ? o[1] = +o[1] : o[1] = 0 : o = !isNaN(parseFloat(o)) && isFinite(o) ? [ 1, +o ] : [ 1, 0 ], 
                    i[n].data = [ o ];
                    for (n = 0; n < i.length; ++n) s += i[n].data[0][1];
                    for (n = 0; n < i.length; ++n) (o = i[n].data[0][1]) / s <= k.series.pie.combine.threshold && (t += o, 
                    r++, a || (a = i[n].color));
                    for (n = 0; n < i.length; ++n) {
                        var o = i[n].data[0][1];
                        (r < 2 || o / s > k.series.pie.combine.threshold) && l.push(e.extend(i[n], {
                            data: [ [ 1, o ] ],
                            color: i[n].color,
                            label: i[n].label,
                            angle: o * Math.PI * 2 / s,
                            percent: o / (s / 100)
                        }));
                    }
                    return 1 < r && l.push({
                        data: [ [ 1, t ] ],
                        color: a,
                        label: k.series.pie.combine.label,
                        angle: t * Math.PI * 2 / s,
                        percent: t / (s / 100)
                    }), l;
                }(i.getData())));
            }
            function l(t, r) {
                function a() {
                    m.clearRect(0, 0, l, o), w.children().filter(".pieLabel, .pieLabelBackground").remove();
                }
                if (w) {
                    var l = t.getPlaceholder().width(), o = t.getPlaceholder().height(), p = w.children().filter(".legend").children().width() || 0;
                    m = r, y = !1, M = Math.min(l, o / k.series.pie.tilt) / 2, A = o / 2 + k.series.pie.offset.top, 
                    P = l / 2, "auto" == k.series.pie.offset.left ? (k.legend.position.match("w") ? P += p / 2 : P -= p / 2, 
                    P < M ? P = M : l - M < P && (P = l - M)) : P += k.series.pie.offset.left;
                    for (var h = t.getData(), g = 0; 0 < g && (M *= .95), g += 1, a(), k.series.pie.tilt <= .8 && function() {
                        var e = k.series.pie.shadow.left, i = k.series.pie.shadow.top, s = k.series.pie.shadow.alpha, t = 1 < k.series.pie.radius ? k.series.pie.radius : M * k.series.pie.radius;
                        if (!(l / 2 - e <= t || t * k.series.pie.tilt >= o / 2 - i || t <= 10)) {
                            m.save(), m.translate(e, i), m.globalAlpha = s, m.fillStyle = "#000", m.translate(P, A), 
                            m.scale(1, k.series.pie.tilt);
                            for (var r = 1; r <= 10; r++) m.beginPath(), m.arc(0, 0, t, 0, 2 * Math.PI, !1), 
                            m.fill(), t -= r;
                            m.restore();
                        }
                    }(), !function() {
                        function i(e, i, s) {
                            e <= 0 || isNaN(e) || (s ? m.fillStyle = i : (m.strokeStyle = i, m.lineJoin = "round"), 
                            m.beginPath(), 1e-9 < Math.abs(e - 2 * Math.PI) && m.moveTo(0, 0), m.arc(0, 0, t, r, r + e / 2, !1), 
                            m.arc(0, 0, t, r + e / 2, r + e, !1), m.closePath(), r += e, s ? m.fill() : m.stroke());
                        }
                        var s = Math.PI * k.series.pie.startAngle, t = 1 < k.series.pie.radius ? k.series.pie.radius : M * k.series.pie.radius;
                        m.save(), m.translate(P, A), m.scale(1, k.series.pie.tilt), m.save();
                        for (var r = s, a = 0; a < h.length; ++a) h[a].startAngle = r, i(h[a].angle, h[a].color, !0);
                        if (m.restore(), 0 < k.series.pie.stroke.width) {
                            for (m.save(), m.lineWidth = k.series.pie.stroke.width, r = s, a = 0; a < h.length; ++a) i(h[a].angle, k.series.pie.stroke.color, !1);
                            m.restore();
                        }
                        return n(m), m.restore(), !k.series.pie.label.show || function() {
                            for (var i = s, t = 1 < k.series.pie.label.radius ? k.series.pie.label.radius : M * k.series.pie.label.radius, r = 0; r < h.length; ++r) {
                                if (h[r].percent >= 100 * k.series.pie.label.threshold && !function(i, s, r) {
                                    if (0 == i.data[0][1]) return !0;
                                    var a, n = k.legend.labelFormatter, p = k.series.pie.label.formatter;
                                    a = n ? n(i.label, i) : i.label, p && (a = p(a, i));
                                    var h = (s + i.angle + s) / 2, g = P + Math.round(Math.cos(h) * t), c = A + Math.round(Math.sin(h) * t) * k.series.pie.tilt, u = "<span class='pieLabel' id='pieLabel" + r + "' style='position:absolute;top:" + c + "px;left:" + g + "px;'>" + a + "</span>";
                                    w.append(u);
                                    var d = w.children("#pieLabel" + r), f = c - d.height() / 2, v = g - d.width() / 2;
                                    if (d.css("top", f), d.css("left", v), 0 < 0 - f || 0 < 0 - v || o - (f + d.height()) < 0 || l - (v + d.width()) < 0) return !1;
                                    if (0 != k.series.pie.label.background.opacity) {
                                        var b = k.series.pie.label.background.color;
                                        null == b && (b = i.color);
                                        var M = "top:" + f + "px;left:" + v + "px;";
                                        e("<div class='pieLabelBackground' style='position:absolute;width:" + d.width() + "px;height:" + d.height() + "px;" + M + "background-color:" + b + ";'></div>").css("opacity", k.series.pie.label.background.opacity).insertBefore(d);
                                    }
                                    return !0;
                                }(h[r], i, r)) return !1;
                                i += h[r].angle;
                            }
                            return !0;
                        }();
                    }() && g < 10; ) ;
                    10 <= g && (a(), w.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>")), 
                    t.setSeries && t.insertLegend && (t.setSeries(h), t.insertLegend());
                }
            }
            function n(e) {
                if (0 < k.series.pie.innerRadius) {
                    e.save();
                    var i = 1 < k.series.pie.innerRadius ? k.series.pie.innerRadius : M * k.series.pie.innerRadius;
                    e.globalCompositeOperation = "destination-out", e.beginPath(), e.fillStyle = k.series.pie.stroke.color, 
                    e.arc(0, 0, i, 0, 2 * Math.PI, !1), e.fill(), e.closePath(), e.restore(), e.save(), 
                    e.beginPath(), e.strokeStyle = k.series.pie.stroke.color, e.arc(0, 0, i, 0, 2 * Math.PI, !1), 
                    e.stroke(), e.closePath(), e.restore();
                }
            }
            function o(e, i) {
                for (var s = !1, t = -1, r = e.length, a = r - 1; ++t < r; a = t) (e[t][1] <= i[1] && i[1] < e[a][1] || e[a][1] <= i[1] && i[1] < e[t][1]) && i[0] < (e[a][0] - e[t][0]) * (i[1] - e[t][1]) / (e[a][1] - e[t][1]) + e[t][0] && (s = !s);
                return s;
            }
            function h(e) {
                c("plothover", e);
            }
            function g(e) {
                c("plotclick", e);
            }
            function c(e, i) {
                var s = t.offset(), r = function(e, i) {
                    for (var s, r, a = t.getData(), l = t.getOptions(), n = 1 < l.series.pie.radius ? l.series.pie.radius : M * l.series.pie.radius, p = 0; p < a.length; ++p) {
                        var h = a[p];
                        if (h.pie.show) {
                            if (m.save(), m.beginPath(), m.moveTo(0, 0), m.arc(0, 0, n, h.startAngle, h.startAngle + h.angle / 2, !1), 
                            m.arc(0, 0, n, h.startAngle + h.angle / 2, h.startAngle + h.angle, !1), m.closePath(), 
                            s = e - P, r = i - A, m.isPointInPath) {
                                if (m.isPointInPath(e - P, i - A)) return m.restore(), {
                                    datapoint: [ h.percent, h.data ],
                                    dataIndex: 0,
                                    series: h,
                                    seriesIndex: p
                                };
                            } else if (o([ [ 0, 0 ], [ n * Math.cos(h.startAngle), n * Math.sin(h.startAngle) ], [ n * Math.cos(h.startAngle + h.angle / 4), n * Math.sin(h.startAngle + h.angle / 4) ], [ n * Math.cos(h.startAngle + h.angle / 2), n * Math.sin(h.startAngle + h.angle / 2) ], [ n * Math.cos(h.startAngle + h.angle / 1.5), n * Math.sin(h.startAngle + h.angle / 1.5) ], [ n * Math.cos(h.startAngle + h.angle), n * Math.sin(h.startAngle + h.angle) ] ], [ s, r ])) return m.restore(), 
                            {
                                datapoint: [ h.percent, h.data ],
                                dataIndex: 0,
                                series: h,
                                seriesIndex: p
                            };
                            m.restore();
                        }
                    }
                    return null;
                }(parseInt(i.pageX - s.left), parseInt(i.pageY - s.top));
                if (k.grid.autoHighlight) for (var a = 0; a < I.length; ++a) {
                    var l = I[a];
                    l.auto != e || r && l.series == r.series || d(l.series);
                }
                r && function(e, i) {
                    var s = f(e);
                    -1 == s ? (I.push({
                        series: e,
                        auto: i
                    }), t.triggerRedrawOverlay()) : i || (I[s].auto = !1);
                }(r.series, e);
                var n = {
                    pageX: i.pageX,
                    pageY: i.pageY
                };
                w.trigger(e, [ n, r ]);
            }
            function d(e) {
                null == e && (I = [], t.triggerRedrawOverlay());
                var i = f(e);
                -1 != i && (I.splice(i, 1), t.triggerRedrawOverlay());
            }
            function f(e) {
                for (var i = 0; i < I.length; ++i) if (I[i].series == e) return i;
                return -1;
            }
            var b = null, w = null, k = null, M = null, P = null, A = null, y = !1, m = null, I = [];
            t.hooks.processOptions.push(function(e, i) {
                i.series.pie.show && (i.grid.show = !1, "auto" == i.series.pie.label.show && (i.legend.show ? i.series.pie.label.show = !1 : i.series.pie.label.show = !0), 
                "auto" == i.series.pie.radius && (i.series.pie.label.show ? i.series.pie.radius = .75 : i.series.pie.radius = 1), 
                1 < i.series.pie.tilt ? i.series.pie.tilt = 1 : i.series.pie.tilt < 0 && (i.series.pie.tilt = 0));
            }), t.hooks.bindEvents.push(function(e, i) {
                var s = e.getOptions();
                s.series.pie.show && (s.grid.hoverable && i.unbind("mousemove").mousemove(h), s.grid.clickable && i.unbind("click").click(g));
            }), t.hooks.processDatapoints.push(function(e, i, s, t) {
                e.getOptions().series.pie.show && r(e);
            }), t.hooks.drawOverlay.push(function(e, i) {
                e.getOptions().series.pie.show && function(e, i) {
                    var s = e.getOptions(), t = 1 < s.series.pie.radius ? s.series.pie.radius : M * s.series.pie.radius;
                    i.save(), i.translate(P, A), i.scale(1, s.series.pie.tilt);
                    for (var r = 0; r < I.length; ++r) !function(e) {
                        e.angle <= 0 || isNaN(e.angle) || (i.fillStyle = "rgba(255, 255, 255, " + s.series.pie.highlight.opacity + ")", 
                        i.beginPath(), 1e-9 < Math.abs(e.angle - 2 * Math.PI) && i.moveTo(0, 0), i.arc(0, 0, t, e.startAngle, e.startAngle + e.angle / 2, !1), 
                        i.arc(0, 0, t, e.startAngle + e.angle / 2, e.startAngle + e.angle, !1), i.closePath(), 
                        i.fill());
                    }(I[r].series);
                    n(i), i.restore();
                }(e, i);
            }), t.hooks.draw.push(function(e, i) {
                e.getOptions().series.pie.show && l(e, i);
            });
        },
        options: t,
        name: "pie",
        version: "1.1"
    });
}(jQuery);