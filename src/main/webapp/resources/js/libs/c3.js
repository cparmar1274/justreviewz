!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.c3 = e();
}(this, function() {
    "use strict";
    function t(t, e) {
        var i = this;
        i.component = t, i.params = e || {}, i.d3 = t.d3, i.scale = i.d3.scale.linear(), 
        i.range, i.orient = "bottom", i.innerTickSize = 6, i.outerTickSize = this.params.withOuterTick ? 6 : 0, 
        i.tickPadding = 3, i.tickValues = null, i.tickFormat, i.tickArguments, i.tickOffset = 0, 
        i.tickCulling = !0, i.tickCentered, i.tickTextCharSize, i.tickTextRotate = i.params.tickTextRotate, 
        i.tickLength, i.axis = i.generateAxis();
    }
    function e(t, e, i) {
        this.owner = t, V.chart.internal[e] = i;
    }
    function i(t) {
        var e = this.internal = new n(this);
        e.loadConfig(t), e.beforeInit(t), e.init(), e.afterInit(t), function t(e, i, n) {
            Object.keys(e).forEach(function(a) {
                i[a] = e[a].bind(n), 0 < Object.keys(e[a]).length && t(e[a], i[a], n);
            });
        }(C, this, this);
    }
    function n(t) {
        var e = this;
        e.d3 = window.d3 ? window.d3 : "undefined" != typeof require ? require("d3") : void 0, 
        e.api = t, e.config = e.getDefaultConfig(), e.data = {}, e.cache = {}, e.axes = {};
    }
    var a, r, o = {
        target: "c3-target",
        chart: "c3-chart",
        chartLine: "c3-chart-line",
        chartLines: "c3-chart-lines",
        chartBar: "c3-chart-bar",
        chartBars: "c3-chart-bars",
        chartText: "c3-chart-text",
        chartTexts: "c3-chart-texts",
        chartArc: "c3-chart-arc",
        chartArcs: "c3-chart-arcs",
        chartArcsTitle: "c3-chart-arcs-title",
        chartArcsBackground: "c3-chart-arcs-background",
        chartArcsGaugeUnit: "c3-chart-arcs-gauge-unit",
        chartArcsGaugeMax: "c3-chart-arcs-gauge-max",
        chartArcsGaugeMin: "c3-chart-arcs-gauge-min",
        selectedCircle: "c3-selected-circle",
        selectedCircles: "c3-selected-circles",
        eventRect: "c3-event-rect",
        eventRects: "c3-event-rects",
        eventRectsSingle: "c3-event-rects-single",
        eventRectsMultiple: "c3-event-rects-multiple",
        zoomRect: "c3-zoom-rect",
        brush: "c3-brush",
        focused: "c3-focused",
        defocused: "c3-defocused",
        region: "c3-region",
        regions: "c3-regions",
        title: "c3-title",
        tooltipContainer: "c3-tooltip-container",
        tooltip: "c3-tooltip",
        tooltipName: "c3-tooltip-name",
        shape: "c3-shape",
        shapes: "c3-shapes",
        line: "c3-line",
        lines: "c3-lines",
        bar: "c3-bar",
        bars: "c3-bars",
        circle: "c3-circle",
        circles: "c3-circles",
        arc: "c3-arc",
        arcs: "c3-arcs",
        area: "c3-area",
        areas: "c3-areas",
        empty: "c3-empty",
        text: "c3-text",
        texts: "c3-texts",
        gaugeValue: "c3-gauge-value",
        grid: "c3-grid",
        gridLines: "c3-grid-lines",
        xgrid: "c3-xgrid",
        xgrids: "c3-xgrids",
        xgridLine: "c3-xgrid-line",
        xgridLines: "c3-xgrid-lines",
        xgridFocus: "c3-xgrid-focus",
        ygrid: "c3-ygrid",
        ygrids: "c3-ygrids",
        ygridLine: "c3-ygrid-line",
        ygridLines: "c3-ygrid-lines",
        axis: "c3-axis",
        axisX: "c3-axis-x",
        axisXLabel: "c3-axis-x-label",
        axisY: "c3-axis-y",
        axisYLabel: "c3-axis-y-label",
        axisY2: "c3-axis-y2",
        axisY2Label: "c3-axis-y2-label",
        legendBackground: "c3-legend-background",
        legendItem: "c3-legend-item",
        legendItemEvent: "c3-legend-item-event",
        legendItemTile: "c3-legend-item-tile",
        legendItemHidden: "c3-legend-item-hidden",
        legendItemFocused: "c3-legend-item-focused",
        dragarea: "c3-dragarea",
        EXPANDED: "_expanded_",
        SELECTED: "_selected_",
        INCLUDED: "_included_"
    }, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t;
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    }, u = function(t) {
        return t || 0 === t;
    }, h = function(t) {
        return "function" == typeof t;
    }, g = function(t) {
        return Array.isArray(t);
    }, f = function(t) {
        return "string" == typeof t;
    }, p = function(t) {
        return void 0 === t;
    }, _ = function(t) {
        return void 0 !== t;
    }, x = function(t) {
        return 10 * Math.ceil(t / 10);
    }, m = function(t) {
        return Math.ceil(t) + .5;
    }, y = function(t) {
        return t[1] - t[0];
    }, S = function(t) {
        return null == t || f(t) && 0 === t.length || "object" === (void 0 === t ? "undefined" : s(t)) && 0 === Object.keys(t).length;
    }, w = function(t) {
        return !L.isEmpty(t);
    }, v = function(t, e, i) {
        return _(t[e]) ? t[e] : i;
    }, b = function(t, e) {
        var i = !1;
        return Object.keys(t).forEach(function(n) {
            t[n] === e && (i = !0);
        }), i;
    }, T = function(t) {
        return "string" == typeof t ? t.replace(/</g, "&lt;").replace(/>/g, "&gt;") : t;
    }, A = function(t) {
        var e = t.getBoundingClientRect(), i = [ t.pathSegList.getItem(0), t.pathSegList.getItem(1) ];
        return {
            x: i[0].x,
            y: Math.min(i[0].y, i[1].y),
            width: e.width,
            height: e.height
        };
    };
    (r = t.prototype).axisX = function(t, e, i) {
        t.attr("transform", function(t) {
            return "translate(" + Math.ceil(e(t) + i) + ", 0)";
        });
    }, r.axisY = function(t, e) {
        t.attr("transform", function(t) {
            return "translate(0," + Math.ceil(e(t)) + ")";
        });
    }, r.scaleExtent = function(t) {
        var e = t[0], i = t[t.length - 1];
        return e < i ? [ e, i ] : [ i, e ];
    }, r.generateTicks = function(t) {
        var e, i, a = [];
        if (t.ticks) return t.ticks.apply(t, this.tickArguments);
        for (i = t.domain(), e = Math.ceil(i[0]); e < i[1]; e++) a.push(e);
        return 0 < a.length && 0 < a[0] && a.unshift(a[0] - (a[1] - a[0])), a;
    }, r.copyScale = function() {
        var t, e = this, i = e.scale.copy();
        return e.params.isCategory && (t = e.scale.domain(), i.domain([ t[0], t[1] - 1 ])), 
        i;
    }, r.textFormatted = function(t) {
        var i = this.tickFormat ? this.tickFormat(t) : t;
        return void 0 !== i ? i : "";
    }, r.updateRange = function() {
        var t = this;
        return t.range = t.scale.rangeExtent ? t.scale.rangeExtent() : t.scaleExtent(t.scale.range()), 
        t.range;
    }, r.updateTickTextCharSize = function(t) {
        var e = this;
        if (e.tickTextCharSize) return e.tickTextCharSize;
        var i = {
            h: 11.5,
            w: 5.5
        };
        return t.select("text").text(function(t) {
            return e.textFormatted(t);
        }).each(function(t) {
            var n = this.getBoundingClientRect(), a = e.textFormatted(t), r = n.height, o = a ? n.width / a.length : void 0;
            r && o && (i.h = r, i.w = o);
        }).text(""), e.tickTextCharSize = i;
    }, r.transitionise = function(t) {
        return this.params.withoutTransition ? t : this.d3.transition(t);
    }, r.isVertical = function() {
        return "left" === this.orient || "right" === this.orient;
    }, r.tspanData = function(t, e, i, n) {
        var a = this, r = a.params.tickMultiline ? a.splitTickText(t, i, n) : [].concat(a.textFormatted(t));
        return r.map(function(t) {
            return {
                index: e,
                splitted: t,
                length: r.length
            };
        });
    }, r.splitTickText = function(t, e, i) {
        var a, r, o, s = this, c = s.textFormatted(t), d = s.params.tickWidth;
        return "[object Array]" === Object.prototype.toString.call(c) ? c : ((!d || d <= 0) && (d = s.isVertical() ? 95 : s.params.isCategory ? Math.ceil(i(e[1]) - i(e[0])) - 12 : 110), 
        function n(t, e) {
            r = void 0;
            for (var i = 1; i < e.length; i++) if (" " === e.charAt(i) && (r = i), a = e.substr(0, i + 1), 
            o = s.tickTextCharSize.w * a.length, d < o) return n(t.concat(e.substr(0, r || i)), e.slice(r ? r + 1 : i));
            return t.concat(e);
        }([], c + ""));
    }, r.updateTickLength = function() {
        var t = this;
        t.tickLength = Math.max(t.innerTickSize, 0) + t.tickPadding;
    }, r.lineY2 = function(t) {
        var e = this, i = e.scale(t) + (e.tickCentered ? 0 : e.tickOffset);
        return e.range[0] < i && i < e.range[1] ? e.innerTickSize : 0;
    }, r.textY = function() {
        var e = this.tickTextRotate;
        return e ? 11.5 - e / 15 * 2.5 * (0 < e ? 1 : -1) : this.tickLength;
    }, r.textTransform = function() {
        var t = this.tickTextRotate;
        return t ? "rotate(" + t + ")" : "";
    }, r.textTextAnchor = function() {
        var t = this.tickTextRotate;
        return t ? 0 < t ? "start" : "end" : "middle";
    }, r.tspanDx = function() {
        var t = this.tickTextRotate;
        return t ? 8 * Math.sin(Math.PI * (t / 180)) : 0;
    }, r.tspanDy = function(t, e) {
        var i = this, n = i.tickTextCharSize.h;
        return 0 === e && (n = i.isVertical() ? -((t.length - 1) * (i.tickTextCharSize.h / 2) - 3) : ".71em"), 
        n;
    }, r.generateAxis = function() {
        function t(a) {
            a.each(function() {
                var a, r, o, s = t.g = i.select(this), c = this.__chart__ || e.scale, d = this.__chart__ = e.copyScale(), l = e.tickValues ? e.tickValues : e.generateTicks(d), u = s.selectAll(".tick").data(l, d), h = u.enter().insert("g", ".domain").attr("class", "tick").style("opacity", 1e-6), g = u.exit().remove(), f = e.transitionise(u).style("opacity", 1);
                n.isCategory ? (e.tickOffset = Math.ceil((d(1) - d(0)) / 2), r = e.tickCentered ? 0 : e.tickOffset, 
                o = e.tickCentered ? e.tickOffset : 0) : e.tickOffset = r = 0, h.append("line"), 
                h.append("text"), e.updateRange(), e.updateTickLength(), e.updateTickTextCharSize(s.select(".tick"));
                var p = f.select("line"), _ = f.select("text"), x = u.select("text").selectAll("tspan").data(function(t, i) {
                    return e.tspanData(t, i, l, d);
                });
                x.enter().append("tspan"), x.exit().remove(), x.text(function(t) {
                    return t.splitted;
                });
                var m = s.selectAll(".domain").data([ 0 ]), y = (m.enter().append("path").attr("class", "domain"), 
                e.transitionise(m));
                switch (e.orient) {
                  case "bottom":
                    a = e.axisX, p.attr("x1", r).attr("x2", r).attr("y2", function(t, i) {
                        return e.lineY2(t, i);
                    }), _.attr("x", 0).attr("y", function(t, i) {
                        return e.textY(t, i);
                    }).attr("transform", function(t, i) {
                        return e.textTransform(t, i);
                    }).style("text-anchor", function(t, i) {
                        return e.textTextAnchor(t, i);
                    }), x.attr("x", 0).attr("dy", function(t, i) {
                        return e.tspanDy(t, i);
                    }).attr("dx", function(t, i) {
                        return e.tspanDx(t, i);
                    }), y.attr("d", "M" + e.range[0] + "," + e.outerTickSize + "V0H" + e.range[1] + "V" + e.outerTickSize);
                    break;

                  case "top":
                    a = e.axisX, p.attr("x2", 0).attr("y2", -e.innerTickSize), _.attr("x", 0).attr("y", -e.tickLength).style("text-anchor", "middle"), 
                    x.attr("x", 0).attr("dy", "0em"), y.attr("d", "M" + e.range[0] + "," + -e.outerTickSize + "V0H" + e.range[1] + "V" + -e.outerTickSize);
                    break;

                  case "left":
                    a = e.axisY, p.attr("x2", -e.innerTickSize).attr("y1", o).attr("y2", o), _.attr("x", -e.tickLength).attr("y", e.tickOffset).style("text-anchor", "end"), 
                    x.attr("x", -e.tickLength).attr("dy", function(t, i) {
                        return e.tspanDy(t, i);
                    }), y.attr("d", "M" + -e.outerTickSize + "," + e.range[0] + "H0V" + e.range[1] + "H" + -e.outerTickSize);
                    break;

                  case "right":
                    a = e.axisY, p.attr("x2", e.innerTickSize).attr("y2", 0), _.attr("x", e.tickLength).attr("y", 0).style("text-anchor", "start"), 
                    x.attr("x", e.tickLength).attr("dy", function(t, i) {
                        return e.tspanDy(t, i);
                    }), y.attr("d", "M" + e.outerTickSize + "," + e.range[0] + "H0V" + e.range[1] + "H" + e.outerTickSize);
                }
                if (d.rangeBand) {
                    var S = d, w = S.rangeBand() / 2;
                    c = d = function(t) {
                        return S(t) + w;
                    };
                } else c.rangeBand ? c = d : g.call(a, d, e.tickOffset);
                h.call(a, c, e.tickOffset), f.call(a, d, e.tickOffset);
            });
        }
        var e = this, i = e.d3, n = e.params;
        return t.scale = function(i) {
            return arguments.length ? (e.scale = i, t) : e.scale;
        }, t.orient = function(i) {
            return arguments.length ? (e.orient = i in {
                top: 1,
                right: 1,
                bottom: 1,
                left: 1
            } ? i + "" : "bottom", t) : e.orient;
        }, t.tickFormat = function(i) {
            return arguments.length ? (e.tickFormat = i, t) : e.tickFormat;
        }, t.tickCentered = function(i) {
            return arguments.length ? (e.tickCentered = i, t) : e.tickCentered;
        }, t.tickOffset = function() {
            return e.tickOffset;
        }, t.tickInterval = function() {
            var i;
            return (i = n.isCategory ? 2 * e.tickOffset : (t.g.select("path.domain").node().getTotalLength() - 2 * e.outerTickSize) / t.g.selectAll("line").size()) == 1 / 0 ? 0 : i;
        }, t.ticks = function() {
            return arguments.length ? (e.tickArguments = arguments, t) : e.tickArguments;
        }, t.tickCulling = function(i) {
            return arguments.length ? (e.tickCulling = i, t) : e.tickCulling;
        }, t.tickValues = function(i) {
            if ("function" == typeof i) e.tickValues = function() {
                return i(e.scale.domain());
            }; else {
                if (!arguments.length) return e.tickValues;
                e.tickValues = i;
            }
            return t;
        }, t;
    };
    var P = function(i) {
        function n(e) {
            !function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, n);
            var i = {
                fn: a,
                internal: {
                    fn: r
                }
            }, o = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e;
            }(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, "axis", i));
            return o.d3 = e.d3, o.internal = t, o;
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }(n, e), n;
    }();
    (a = P.prototype).init = function() {
        var t = this.owner, e = t.config, i = t.main;
        t.axes.x = i.append("g").attr("class", o.axis + " " + o.axisX).attr("clip-path", t.clipPathForXAxis).attr("transform", t.getTranslate("x")).style("visibility", e.axis_x_show ? "visible" : "hidden"), 
        t.axes.x.append("text").attr("class", o.axisXLabel).attr("transform", e.axis_rotated ? "rotate(-90)" : "").style("text-anchor", this.textAnchorForXAxisLabel.bind(this)), 
        t.axes.y = i.append("g").attr("class", o.axis + " " + o.axisY).attr("clip-path", e.axis_y_inner ? "" : t.clipPathForYAxis).attr("transform", t.getTranslate("y")).style("visibility", e.axis_y_show ? "visible" : "hidden"), 
        t.axes.y.append("text").attr("class", o.axisYLabel).attr("transform", e.axis_rotated ? "" : "rotate(-90)").style("text-anchor", this.textAnchorForYAxisLabel.bind(this)), 
        t.axes.y2 = i.append("g").attr("class", o.axis + " " + o.axisY2).attr("transform", t.getTranslate("y2")).style("visibility", e.axis_y2_show ? "visible" : "hidden"), 
        t.axes.y2.append("text").attr("class", o.axisY2Label).attr("transform", e.axis_rotated ? "" : "rotate(-90)").style("text-anchor", this.textAnchorForY2AxisLabel.bind(this));
    }, a.getXAxis = function(t, e, i, n, a, r, o) {
        var s = this.owner, c = s.config, d = {
            isCategory: s.isCategorized(),
            withOuterTick: a,
            tickMultiline: c.axis_x_tick_multiline,
            tickWidth: c.axis_x_tick_width,
            tickTextRotate: o ? 0 : c.axis_x_tick_rotate,
            withoutTransition: r
        }, l = new this.internal(this, d).axis.scale(t).orient(e);
        return s.isTimeSeries() && n && "function" != typeof n && (n = n.map(function(t) {
            return s.parseDate(t);
        })), l.tickFormat(i).tickValues(n), s.isCategorized() && (l.tickCentered(c.axis_x_tick_centered), 
        S(c.axis_x_tick_culling) && (c.axis_x_tick_culling = !1)), l;
    }, a.updateXAxisTickValues = function(t, e) {
        var i, n = this.owner, a = n.config;
        return (a.axis_x_tick_fit || a.axis_x_tick_count) && (i = this.generateTickValues(n.mapTargetsToUniqueXs(t), a.axis_x_tick_count, n.isTimeSeries())), 
        e ? e.tickValues(i) : (n.xAxis.tickValues(i), n.subXAxis.tickValues(i)), i;
    }, a.getYAxis = function(t, e, i, n, a, r, o) {
        var s = this.owner, c = s.config, d = {
            withOuterTick: a,
            withoutTransition: r,
            tickTextRotate: o ? 0 : c.axis_y_tick_rotate
        }, l = new this.internal(this, d).axis.scale(t).orient(e).tickFormat(i);
        return s.isTimeSeriesY() ? l.ticks(s.d3.time[c.axis_y_tick_time_value], c.axis_y_tick_time_interval) : l.tickValues(n), 
        l;
    }, a.getId = function(t) {
        var e = this.owner.config;
        return t in e.data_axes ? e.data_axes[t] : "y";
    }, a.getXAxisTickFormat = function() {
        var t = this.owner, e = t.config, i = t.isTimeSeries() ? t.defaultAxisTimeFormat : t.isCategorized() ? t.categoryName : function(t) {
            return t < 0 ? t.toFixed(0) : t;
        };
        return e.axis_x_tick_format && (h(e.axis_x_tick_format) ? i = e.axis_x_tick_format : t.isTimeSeries() && (i = function(i) {
            return i ? t.axisTimeFormat(e.axis_x_tick_format)(i) : "";
        })), h(i) ? function(e) {
            return i.call(t, e);
        } : i;
    }, a.getTickValues = function(t, e) {
        return t || (e ? e.tickValues() : void 0);
    }, a.getXAxisTickValues = function() {
        return this.getTickValues(this.owner.config.axis_x_tick_values, this.owner.xAxis);
    }, a.getYAxisTickValues = function() {
        return this.getTickValues(this.owner.config.axis_y_tick_values, this.owner.yAxis);
    }, a.getY2AxisTickValues = function() {
        return this.getTickValues(this.owner.config.axis_y2_tick_values, this.owner.y2Axis);
    }, a.getLabelOptionByAxisId = function(t) {
        var e, i = this.owner.config;
        return "y" === t ? e = i.axis_y_label : "y2" === t ? e = i.axis_y2_label : "x" === t && (e = i.axis_x_label), 
        e;
    }, a.getLabelText = function(t) {
        var e = this.getLabelOptionByAxisId(t);
        return f(e) ? e : e ? e.text : null;
    }, a.setLabelText = function(t, e) {
        var i = this.owner.config, n = this.getLabelOptionByAxisId(t);
        f(n) ? "y" === t ? i.axis_y_label = e : "y2" === t ? i.axis_y2_label = e : "x" === t && (i.axis_x_label = e) : n && (n.text = e);
    }, a.getLabelPosition = function(t, e) {
        var i = this.getLabelOptionByAxisId(t), n = i && "object" === (void 0 === i ? "undefined" : s(i)) && i.position ? i.position : e;
        return {
            isInner: 0 <= n.indexOf("inner"),
            isOuter: 0 <= n.indexOf("outer"),
            isLeft: 0 <= n.indexOf("left"),
            isCenter: 0 <= n.indexOf("center"),
            isRight: 0 <= n.indexOf("right"),
            isTop: 0 <= n.indexOf("top"),
            isMiddle: 0 <= n.indexOf("middle"),
            isBottom: 0 <= n.indexOf("bottom")
        };
    }, a.getXAxisLabelPosition = function() {
        return this.getLabelPosition("x", this.owner.config.axis_rotated ? "inner-top" : "inner-right");
    }, a.getYAxisLabelPosition = function() {
        return this.getLabelPosition("y", this.owner.config.axis_rotated ? "inner-right" : "inner-top");
    }, a.getY2AxisLabelPosition = function() {
        return this.getLabelPosition("y2", this.owner.config.axis_rotated ? "inner-right" : "inner-top");
    }, a.getLabelPositionById = function(t) {
        return "y2" === t ? this.getY2AxisLabelPosition() : "y" === t ? this.getYAxisLabelPosition() : this.getXAxisLabelPosition();
    }, a.textForXAxisLabel = function() {
        return this.getLabelText("x");
    }, a.textForYAxisLabel = function() {
        return this.getLabelText("y");
    }, a.textForY2AxisLabel = function() {
        return this.getLabelText("y2");
    }, a.xForAxisLabel = function(t, e) {
        var i = this.owner;
        return t ? e.isLeft ? 0 : e.isCenter ? i.width / 2 : i.width : e.isBottom ? -i.height : e.isMiddle ? -i.height / 2 : 0;
    }, a.dxForAxisLabel = function(t, e) {
        return t ? e.isLeft ? "0.5em" : e.isRight ? "-0.5em" : "0" : e.isTop ? "-0.5em" : e.isBottom ? "0.5em" : "0";
    }, a.textAnchorForAxisLabel = function(t, e) {
        return t ? e.isLeft ? "start" : e.isCenter ? "middle" : "end" : e.isBottom ? "start" : e.isMiddle ? "middle" : "end";
    }, a.xForXAxisLabel = function() {
        return this.xForAxisLabel(!this.owner.config.axis_rotated, this.getXAxisLabelPosition());
    }, a.xForYAxisLabel = function() {
        return this.xForAxisLabel(this.owner.config.axis_rotated, this.getYAxisLabelPosition());
    }, a.xForY2AxisLabel = function() {
        return this.xForAxisLabel(this.owner.config.axis_rotated, this.getY2AxisLabelPosition());
    }, a.dxForXAxisLabel = function() {
        return this.dxForAxisLabel(!this.owner.config.axis_rotated, this.getXAxisLabelPosition());
    }, a.dxForYAxisLabel = function() {
        return this.dxForAxisLabel(this.owner.config.axis_rotated, this.getYAxisLabelPosition());
    }, a.dxForY2AxisLabel = function() {
        return this.dxForAxisLabel(this.owner.config.axis_rotated, this.getY2AxisLabelPosition());
    }, a.dyForXAxisLabel = function() {
        var t = this.owner.config, e = this.getXAxisLabelPosition();
        return t.axis_rotated ? e.isInner ? "1.2em" : -25 - this.getMaxTickWidth("x") : e.isInner ? "-0.5em" : t.axis_x_height ? t.axis_x_height - 10 : "3em";
    }, a.dyForYAxisLabel = function() {
        var t = this.owner, e = this.getYAxisLabelPosition();
        return t.config.axis_rotated ? e.isInner ? "-0.5em" : "3em" : e.isInner ? "1.2em" : -10 - (t.config.axis_y_inner ? 0 : this.getMaxTickWidth("y") + 10);
    }, a.dyForY2AxisLabel = function() {
        var t = this.owner, e = this.getY2AxisLabelPosition();
        return t.config.axis_rotated ? e.isInner ? "1.2em" : "-2.2em" : e.isInner ? "-0.5em" : 15 + (t.config.axis_y2_inner ? 0 : this.getMaxTickWidth("y2") + 15);
    }, a.textAnchorForXAxisLabel = function() {
        var t = this.owner;
        return this.textAnchorForAxisLabel(!t.config.axis_rotated, this.getXAxisLabelPosition());
    }, a.textAnchorForYAxisLabel = function() {
        var t = this.owner;
        return this.textAnchorForAxisLabel(t.config.axis_rotated, this.getYAxisLabelPosition());
    }, a.textAnchorForY2AxisLabel = function() {
        var t = this.owner;
        return this.textAnchorForAxisLabel(t.config.axis_rotated, this.getY2AxisLabelPosition());
    }, a.getMaxTickWidth = function(t, e) {
        var i, n, a, r, o = this.owner, s = o.config, c = 0;
        return e && o.currentMaxTickWidths[t] || (o.svg && (i = o.filterTargetsToShow(o.data.targets), 
        "y" === t ? (n = o.y.copy().domain(o.getYDomain(i, "y")), a = this.getYAxis(n, o.yOrient, s.axis_y_tick_format, o.yAxisTickValues, !1, !0, !0)) : "y2" === t ? (n = o.y2.copy().domain(o.getYDomain(i, "y2")), 
        a = this.getYAxis(n, o.y2Orient, s.axis_y2_tick_format, o.y2AxisTickValues, !1, !0, !0)) : (n = o.x.copy().domain(o.getXDomain(i)), 
        a = this.getXAxis(n, o.xOrient, o.xAxisTickFormat, o.xAxisTickValues, !1, !0, !0), 
        this.updateXAxisTickValues(i, a)), (r = o.d3.select("body").append("div").classed("c3", !0)).append("svg").style("visibility", "hidden").style("position", "fixed").style("top", 0).style("left", 0).append("g").call(a).each(function() {
            o.d3.select(this).selectAll("text").each(function() {
                var t = this.getBoundingClientRect();
                c < t.width && (c = t.width);
            }), r.remove();
        })), o.currentMaxTickWidths[t] = c <= 0 ? o.currentMaxTickWidths[t] : c), o.currentMaxTickWidths[t];
    }, a.updateLabels = function(t) {
        var e = this.owner, i = e.main.select("." + o.axisX + " ." + o.axisXLabel), n = e.main.select("." + o.axisY + " ." + o.axisYLabel), a = e.main.select("." + o.axisY2 + " ." + o.axisY2Label);
        (t ? i.transition() : i).attr("x", this.xForXAxisLabel.bind(this)).attr("dx", this.dxForXAxisLabel.bind(this)).attr("dy", this.dyForXAxisLabel.bind(this)).text(this.textForXAxisLabel.bind(this)), 
        (t ? n.transition() : n).attr("x", this.xForYAxisLabel.bind(this)).attr("dx", this.dxForYAxisLabel.bind(this)).attr("dy", this.dyForYAxisLabel.bind(this)).text(this.textForYAxisLabel.bind(this)), 
        (t ? a.transition() : a).attr("x", this.xForY2AxisLabel.bind(this)).attr("dx", this.dxForY2AxisLabel.bind(this)).attr("dy", this.dyForY2AxisLabel.bind(this)).text(this.textForY2AxisLabel.bind(this));
    }, a.getPadding = function(t, e, i, n) {
        var a = "number" == typeof t ? t : t[e];
        return u(a) ? "ratio" === t.unit ? t[e] * n : this.convertPixelsToAxisPadding(a, n) : i;
    }, a.convertPixelsToAxisPadding = function(t, e) {
        var i = this.owner;
        return e * (t / (i.config.axis_rotated ? i.width : i.height));
    }, a.generateTickValues = function(t, e, i) {
        var n, a, r, o, s, c, d, l = t;
        if (e) if (1 === (n = h(e) ? e() : e)) l = [ t[0] ]; else if (2 === n) l = [ t[0], t[t.length - 1] ]; else if (2 < n) {
            for (o = n - 2, a = t[0], s = ((r = t[t.length - 1]) - a) / (o + 1), l = [ a ], 
            c = 0; c < o; c++) d = +a + s * (c + 1), l.push(i ? new Date(d) : d);
            l.push(r);
        }
        return i || (l = l.sort(function(t, e) {
            return t - e;
        })), l;
    }, a.generateTransitions = function(t) {
        var e = this.owner.axes;
        return {
            axisX: t ? e.x.transition().duration(t) : e.x,
            axisY: t ? e.y.transition().duration(t) : e.y,
            axisY2: t ? e.y2.transition().duration(t) : e.y2,
            axisSubX: t ? e.subx.transition().duration(t) : e.subx
        };
    }, a.redraw = function(t, e) {
        var i = this.owner;
        i.axes.x.style("opacity", e ? 0 : 1), i.axes.y.style("opacity", e ? 0 : 1), i.axes.y2.style("opacity", e ? 0 : 1), 
        i.axes.subx.style("opacity", e ? 0 : 1), t.axisX.call(i.xAxis), t.axisY.call(i.yAxis), 
        t.axisY2.call(i.y2Axis), t.axisSubX.call(i.subXAxis);
    };
    var C, L, V = {
        version: "0.4.18",
        generate: function(t) {
            return new i(t);
        }
    };
    return V.chart = {
        fn: i.prototype,
        internal: {
            fn: n.prototype
        }
    }, C = V.chart.fn, (L = V.chart.internal.fn).beforeInit = function() {}, L.afterInit = function() {}, 
    L.init = function() {
        var t = this, e = t.config;
        if (t.initParams(), e.data_url) t.convertUrlToData(e.data_url, e.data_mimeType, e.data_headers, e.data_keys, t.initWithData); else if (e.data_json) t.initWithData(t.convertJsonToData(e.data_json, e.data_keys)); else if (e.data_rows) t.initWithData(t.convertRowsToData(e.data_rows)); else {
            if (!e.data_columns) throw Error("url or json or rows or columns is required.");
            t.initWithData(t.convertColumnsToData(e.data_columns));
        }
    }, L.initParams = function() {
        var t = this, e = t.d3, i = t.config;
        t.clipId = "c3-" + +new Date() + "-clip", t.clipIdForXAxis = t.clipId + "-xaxis", 
        t.clipIdForYAxis = t.clipId + "-yaxis", t.clipIdForGrid = t.clipId + "-grid", t.clipIdForSubchart = t.clipId + "-subchart", 
        t.clipPath = t.getClipPath(t.clipId), t.clipPathForXAxis = t.getClipPath(t.clipIdForXAxis), 
        t.clipPathForYAxis = t.getClipPath(t.clipIdForYAxis), t.clipPathForGrid = t.getClipPath(t.clipIdForGrid), 
        t.clipPathForSubchart = t.getClipPath(t.clipIdForSubchart), t.dragStart = null, 
        t.dragging = !1, t.flowing = !1, t.cancelClick = !1, t.mouseover = !1, t.transiting = !1, 
        t.color = t.generateColor(), t.levelColor = t.generateLevelColor(), t.dataTimeFormat = i.data_xLocaltime ? e.time.format : e.time.format.utc, 
        t.axisTimeFormat = i.axis_x_localtime ? e.time.format : e.time.format.utc, t.defaultAxisTimeFormat = t.axisTimeFormat.multi([ [ ".%L", function(t) {
            return t.getMilliseconds();
        } ], [ ":%S", function(t) {
            return t.getSeconds();
        } ], [ "%I:%M", function(t) {
            return t.getMinutes();
        } ], [ "%I %p", function(t) {
            return t.getHours();
        } ], [ "%-m/%-d", function(t) {
            return t.getDay() && 1 !== t.getDate();
        } ], [ "%-m/%-d", function(t) {
            return 1 !== t.getDate();
        } ], [ "%-m/%-d", function(t) {
            return t.getMonth();
        } ], [ "%Y/%-m/%-d", function() {
            return !0;
        } ] ]), t.hiddenTargetIds = [], t.hiddenLegendIds = [], t.focusedTargetIds = [], 
        t.defocusedTargetIds = [], t.xOrient = i.axis_rotated ? "left" : "bottom", t.yOrient = i.axis_rotated ? i.axis_y_inner ? "top" : "bottom" : i.axis_y_inner ? "right" : "left", 
        t.y2Orient = i.axis_rotated ? i.axis_y2_inner ? "bottom" : "top" : i.axis_y2_inner ? "left" : "right", 
        t.subXOrient = i.axis_rotated ? "left" : "bottom", t.isLegendRight = "right" === i.legend_position, 
        t.isLegendInset = "inset" === i.legend_position, t.isLegendTop = "top-left" === i.legend_inset_anchor || "top-right" === i.legend_inset_anchor, 
        t.isLegendLeft = "top-left" === i.legend_inset_anchor || "bottom-left" === i.legend_inset_anchor, 
        t.legendStep = 0, t.legendItemWidth = 0, t.legendItemHeight = 0, t.currentMaxTickWidths = {
            x: 0,
            y: 0,
            y2: 0
        }, t.rotated_padding_left = 30, t.rotated_padding_right = i.axis_rotated && !i.axis_x_show ? 0 : 30, 
        t.rotated_padding_top = 5, t.withoutFadeIn = {}, t.intervalForObserveInserted = void 0, 
        t.axes.subx = e.selectAll([]);
    }, L.initChartElements = function() {
        this.initBar && this.initBar(), this.initLine && this.initLine(), this.initArc && this.initArc(), 
        this.initGauge && this.initGauge(), this.initText && this.initText();
    }, L.initWithData = function(t) {
        var e, i, n = this, a = n.d3, r = n.config, s = !0;
        n.axis = new P(n), n.initPie && n.initPie(), n.initBrush && n.initBrush(), n.initZoom && n.initZoom(), 
        r.bindto ? "function" == typeof r.bindto.node ? n.selectChart = r.bindto : n.selectChart = a.select(r.bindto) : n.selectChart = a.selectAll([]), 
        n.selectChart.empty() && (n.selectChart = a.select(document.createElement("div")).style("opacity", 0), 
        n.observeInserted(n.selectChart), s = !1), n.selectChart.html("").classed("c3", !0), 
        n.data.xs = {}, n.data.targets = n.convertDataToTargets(t), r.data_filter && (n.data.targets = n.data.targets.filter(r.data_filter)), 
        r.data_hide && n.addHiddenTargetIds(!0 === r.data_hide ? n.mapToIds(n.data.targets) : r.data_hide), 
        r.legend_hide && n.addHiddenLegendIds(!0 === r.legend_hide ? n.mapToIds(n.data.targets) : r.legend_hide), 
        n.hasType("gauge") && (r.legend_show = !1), n.updateSizes(), n.updateScales(), n.x.domain(a.extent(n.getXDomain(n.data.targets))), 
        n.y.domain(n.getYDomain(n.data.targets, "y")), n.y2.domain(n.getYDomain(n.data.targets, "y2")), 
        n.subX.domain(n.x.domain()), n.subY.domain(n.y.domain()), n.subY2.domain(n.y2.domain()), 
        n.orgXDomain = n.x.domain(), n.brush && n.brush.scale(n.subX), r.zoom_enabled && n.zoom.scale(n.x), 
        n.svg = n.selectChart.append("svg").style("overflow", "hidden").on("mouseenter", function() {
            return r.onmouseover.call(n);
        }).on("mouseleave", function() {
            return r.onmouseout.call(n);
        }), n.config.svg_classname && n.svg.attr("class", n.config.svg_classname), e = n.svg.append("defs"), 
        n.clipChart = n.appendClip(e, n.clipId), n.clipXAxis = n.appendClip(e, n.clipIdForXAxis), 
        n.clipYAxis = n.appendClip(e, n.clipIdForYAxis), n.clipGrid = n.appendClip(e, n.clipIdForGrid), 
        n.clipSubchart = n.appendClip(e, n.clipIdForSubchart), n.updateSvgSize(), i = n.main = n.svg.append("g").attr("transform", n.getTranslate("main")), 
        n.initSubchart && n.initSubchart(), n.initTooltip && n.initTooltip(), n.initLegend && n.initLegend(), 
        n.initTitle && n.initTitle(), i.append("text").attr("class", o.text + " " + o.empty).attr("text-anchor", "middle").attr("dominant-baseline", "middle"), 
        n.initRegion(), n.initGrid(), i.append("g").attr("clip-path", n.clipPath).attr("class", o.chart), 
        r.grid_lines_front && n.initGridLines(), n.initEventRect(), n.initChartElements(), 
        i.insert("rect", r.zoom_privileged ? null : "g." + o.regions).attr("class", o.zoomRect).attr("width", n.width).attr("height", n.height).style("opacity", 0).on("dblclick.zoom", null), 
        r.axis_x_extent && n.brush.extent(n.getDefaultExtent()), n.axis.init(), n.updateTargets(n.data.targets), 
        s && (n.updateDimension(), n.config.oninit.call(n), n.redraw({
            withTransition: !1,
            withTransform: !0,
            withUpdateXDomain: !0,
            withUpdateOrgXDomain: !0,
            withTransitionForAxis: !1
        })), n.bindResize(), n.api.element = n.selectChart.node();
    }, L.smoothLines = function(t, e) {
        var i = this;
        "grid" === e && t.each(function() {
            var t = i.d3.select(this), e = t.attr("x1"), n = t.attr("x2"), a = t.attr("y1"), r = t.attr("y2");
            t.attr({
                x1: Math.ceil(e),
                x2: Math.ceil(n),
                y1: Math.ceil(a),
                y2: Math.ceil(r)
            });
        });
    }, L.updateSizes = function() {
        var t = this, e = t.config, i = t.legend ? t.getLegendHeight() : 0, n = t.legend ? t.getLegendWidth() : 0, a = t.isLegendRight || t.isLegendInset ? 0 : i, r = t.hasArcType(), o = e.axis_rotated || r ? 0 : t.getHorizontalAxisHeight("x"), s = e.subchart_show && !r ? e.subchart_size_height + o : 0;
        t.currentWidth = t.getCurrentWidth(), t.currentHeight = t.getCurrentHeight(), t.margin = e.axis_rotated ? {
            top: t.getHorizontalAxisHeight("y2") + t.getCurrentPaddingTop(),
            right: r ? 0 : t.getCurrentPaddingRight(),
            bottom: t.getHorizontalAxisHeight("y") + a + t.getCurrentPaddingBottom(),
            left: s + (r ? 0 : t.getCurrentPaddingLeft())
        } : {
            top: 4 + t.getCurrentPaddingTop(),
            right: r ? 0 : t.getCurrentPaddingRight(),
            bottom: o + s + a + t.getCurrentPaddingBottom(),
            left: r ? 0 : t.getCurrentPaddingLeft()
        }, t.margin2 = e.axis_rotated ? {
            top: t.margin.top,
            right: NaN,
            bottom: 20 + a,
            left: t.rotated_padding_left
        } : {
            top: t.currentHeight - s - a,
            right: NaN,
            bottom: o + a,
            left: t.margin.left
        }, t.margin3 = {
            top: 0,
            right: NaN,
            bottom: 0,
            left: 0
        }, t.updateSizeForLegend && t.updateSizeForLegend(i, n), t.width = t.currentWidth - t.margin.left - t.margin.right, 
        t.height = t.currentHeight - t.margin.top - t.margin.bottom, t.width < 0 && (t.width = 0), 
        t.height < 0 && (t.height = 0), t.width2 = e.axis_rotated ? t.margin.left - t.rotated_padding_left - t.rotated_padding_right : t.width, 
        t.height2 = e.axis_rotated ? t.height : t.currentHeight - t.margin2.top - t.margin2.bottom, 
        t.width2 < 0 && (t.width2 = 0), t.height2 < 0 && (t.height2 = 0), t.arcWidth = t.width - (t.isLegendRight ? n + 10 : 0), 
        t.arcHeight = t.height - (t.isLegendRight ? 0 : 10), t.hasType("gauge") && !e.gauge_fullCircle && (t.arcHeight += t.height - t.getGaugeLabelHeight()), 
        t.updateRadius && t.updateRadius(), t.isLegendRight && r && (t.margin3.left = t.arcWidth / 2 + 1.1 * t.radiusExpanded);
    }, L.updateTargets = function(t) {
        var e = this;
        e.updateTargetsForText(t), e.updateTargetsForBar(t), e.updateTargetsForLine(t), 
        e.hasArcType() && e.updateTargetsForArc && e.updateTargetsForArc(t), e.updateTargetsForSubchart && e.updateTargetsForSubchart(t), 
        e.showTargets();
    }, L.showTargets = function() {
        var t = this;
        t.svg.selectAll("." + o.target).filter(function(e) {
            return t.isTargetToShow(e.id);
        }).transition().duration(t.config.transition_duration).style("opacity", 1);
    }, L.redraw = function(t, e) {
        var i, n, a, r, s, c, d, l, u, h, g, f, p, _, x, m, y, S, w, b, T, A, P, C, L, V, G, E, O, I = this, R = I.main, k = I.d3, D = I.config, F = I.getShapeIndices(I.isAreaType), X = I.getShapeIndices(I.isBarType), M = I.getShapeIndices(I.isLineType), z = I.hasArcType(), H = I.filterTargetsToShow(I.data.targets), B = I.xv.bind(I);
        if (i = v(t = t || {}, "withY", !0), n = v(t, "withSubchart", !0), a = v(t, "withTransition", !0), 
        c = v(t, "withTransform", !1), d = v(t, "withUpdateXDomain", !1), l = v(t, "withUpdateOrgXDomain", !1), 
        u = v(t, "withTrimXDomain", !0), p = v(t, "withUpdateXAxis", d), h = v(t, "withLegend", !1), 
        g = v(t, "withEventRect", !0), f = v(t, "withDimension", !0), r = v(t, "withTransitionForExit", a), 
        s = v(t, "withTransitionForAxis", a), w = a ? D.transition_duration : 0, b = r ? w : 0, 
        T = s ? w : 0, e = e || I.axis.generateTransitions(T), h && D.legend_show ? I.updateLegend(I.mapToIds(I.data.targets), t, e) : f && I.updateDimension(!0), 
        I.isCategorized() && 0 === H.length && I.x.domain([ 0, I.axes.x.selectAll(".tick").size() ]), 
        H.length ? (I.updateXDomain(H, d, l, u), D.axis_x_tick_values || (C = I.axis.updateXAxisTickValues(H))) : (I.xAxis.tickValues([]), 
        I.subXAxis.tickValues([])), D.zoom_rescale && !t.flow && (G = I.x.orgDomain()), 
        I.y.domain(I.getYDomain(H, "y", G)), I.y2.domain(I.getYDomain(H, "y2", G)), !D.axis_y_tick_values && D.axis_y_tick_count && I.yAxis.tickValues(I.axis.generateTickValues(I.y.domain(), D.axis_y_tick_count)), 
        !D.axis_y2_tick_values && D.axis_y2_tick_count && I.y2Axis.tickValues(I.axis.generateTickValues(I.y2.domain(), D.axis_y2_tick_count)), 
        I.axis.redraw(e, z), I.axis.updateLabels(a), (d || p) && H.length) if (D.axis_x_tick_culling && C) {
            for (L = 1; L < C.length; L++) if (C.length / L < D.axis_x_tick_culling_max) {
                V = L;
                break;
            }
            I.svg.selectAll("." + o.axisX + " .tick text").each(function(t) {
                var e = C.indexOf(t);
                0 <= e && k.select(this).style("display", e % V ? "none" : "block");
            });
        } else I.svg.selectAll("." + o.axisX + " .tick text").style("display", "block");
        _ = I.generateDrawArea ? I.generateDrawArea(F, !1) : void 0, x = I.generateDrawBar ? I.generateDrawBar(X) : void 0, 
        m = I.generateDrawLine ? I.generateDrawLine(M, !1) : void 0, y = I.generateXYForText(F, X, M, !0), 
        S = I.generateXYForText(F, X, M, !1), i && (I.subY.domain(I.getYDomain(H, "y")), 
        I.subY2.domain(I.getYDomain(H, "y2"))), I.updateXgridFocus(), R.select("text." + o.text + "." + o.empty).attr("x", I.width / 2).attr("y", I.height / 2).text(D.data_empty_label_text).transition().style("opacity", H.length ? 0 : 1), 
        I.updateGrid(w), I.updateRegion(w), I.updateBar(b), I.updateLine(b), I.updateArea(b), 
        I.updateCircle(), I.hasDataLabel() && I.updateText(b), I.redrawTitle && I.redrawTitle(), 
        I.redrawArc && I.redrawArc(w, b, c), I.redrawSubchart && I.redrawSubchart(n, e, w, b, F, X, M), 
        R.selectAll("." + o.selectedCircles).filter(I.isBarType.bind(I)).selectAll("circle").remove(), 
        D.interaction_enabled && !t.flow && g && (I.redrawEventRect(), I.updateZoom && I.updateZoom()), 
        I.updateCircleY(), E = (I.config.axis_rotated ? I.circleY : I.circleX).bind(I), 
        O = (I.config.axis_rotated ? I.circleX : I.circleY).bind(I), t.flow && (P = I.generateFlow({
            targets: H,
            flow: t.flow,
            duration: t.flow.duration,
            drawBar: x,
            drawLine: m,
            drawArea: _,
            cx: E,
            cy: O,
            xv: B,
            xForText: y,
            yForText: S
        })), (w || P) && I.isTabVisible() ? k.transition().duration(w).each(function() {
            var e = [];
            [ I.redrawBar(x, !0), I.redrawLine(m, !0), I.redrawArea(_, !0), I.redrawCircle(E, O, !0), I.redrawText(y, S, t.flow, !0), I.redrawRegion(!0), I.redrawGrid(!0) ].forEach(function(t) {
                t.forEach(function(t) {
                    e.push(t);
                });
            }), A = I.generateWait(), e.forEach(function(t) {
                A.add(t);
            });
        }).call(A, function() {
            P && P(), D.onrendered && D.onrendered.call(I);
        }) : (I.redrawBar(x), I.redrawLine(m), I.redrawArea(_), I.redrawCircle(E, O), I.redrawText(y, S, t.flow), 
        I.redrawRegion(), I.redrawGrid(), D.onrendered && D.onrendered.call(I)), I.mapToIds(I.data.targets).forEach(function(t) {
            I.withoutFadeIn[t] = !0;
        });
    }, L.updateAndRedraw = function(t) {
        var e, i = this, n = i.config;
        (t = t || {}).withTransition = v(t, "withTransition", !0), t.withTransform = v(t, "withTransform", !1), 
        t.withLegend = v(t, "withLegend", !1), t.withUpdateXDomain = !0, t.withUpdateOrgXDomain = !0, 
        t.withTransitionForExit = !1, t.withTransitionForTransform = v(t, "withTransitionForTransform", t.withTransition), 
        i.updateSizes(), t.withLegend && n.legend_show || (e = i.axis.generateTransitions(t.withTransitionForAxis ? n.transition_duration : 0), 
        i.updateScales(), i.updateSvgSize(), i.transformAll(t.withTransitionForTransform, e)), 
        i.redraw(t, e);
    }, L.redrawWithoutRescale = function() {
        this.redraw({
            withY: !1,
            withSubchart: !1,
            withEventRect: !1,
            withTransitionForAxis: !1
        });
    }, L.isTimeSeries = function() {
        return "timeseries" === this.config.axis_x_type;
    }, L.isCategorized = function() {
        return 0 <= this.config.axis_x_type.indexOf("categor");
    }, L.isCustomX = function() {
        var e = this.config;
        return !this.isTimeSeries() && (e.data_x || w(e.data_xs));
    }, L.isTimeSeriesY = function() {
        return "timeseries" === this.config.axis_y_type;
    }, L.getTranslate = function(t) {
        var e, i, n = this, a = n.config;
        return "main" === t ? (e = m(n.margin.left), i = m(n.margin.top)) : "context" === t ? (e = m(n.margin2.left), 
        i = m(n.margin2.top)) : "legend" === t ? (e = n.margin3.left, i = n.margin3.top) : "x" === t ? (e = 0, 
        i = a.axis_rotated ? 0 : n.height) : "y" === t ? (e = 0, i = a.axis_rotated ? n.height : 0) : "y2" === t ? (e = a.axis_rotated ? 0 : n.width, 
        i = a.axis_rotated ? 1 : 0) : "subx" === t ? (e = 0, i = a.axis_rotated ? 0 : n.height2) : "arc" === t && (e = n.arcWidth / 2, 
        i = n.arcHeight / 2), "translate(" + e + "," + i + ")";
    }, L.initialOpacity = function(t) {
        return null !== t.value && this.withoutFadeIn[t.id] ? 1 : 0;
    }, L.initialOpacityForCircle = function(t) {
        return null !== t.value && this.withoutFadeIn[t.id] ? this.opacityForCircle(t) : 0;
    }, L.opacityForCircle = function(t) {
        var e = (h(this.config.point_show) ? this.config.point_show(t) : this.config.point_show) ? 1 : 0;
        return u(t.value) ? this.isScatterType(t) ? .5 : e : 0;
    }, L.opacityForText = function() {
        return this.hasDataLabel() ? 1 : 0;
    }, L.xx = function(t) {
        return t ? this.x(t.x) : null;
    }, L.xv = function(t) {
        var e = this, i = t.value;
        return e.isTimeSeries() ? i = e.parseDate(t.value) : e.isCategorized() && "string" == typeof t.value && (i = e.config.axis_x_categories.indexOf(t.value)), 
        Math.ceil(e.x(i));
    }, L.yv = function(t) {
        var i = t.axis && "y2" === t.axis ? this.y2 : this.y;
        return Math.ceil(i(t.value));
    }, L.subxx = function(t) {
        return t ? this.subX(t.x) : null;
    }, L.transformMain = function(t, e) {
        var i, n, a, r = this;
        e && e.axisX ? i = e.axisX : (i = r.main.select("." + o.axisX), t && (i = i.transition())), 
        e && e.axisY ? n = e.axisY : (n = r.main.select("." + o.axisY), t && (n = n.transition())), 
        e && e.axisY2 ? a = e.axisY2 : (a = r.main.select("." + o.axisY2), t && (a = a.transition())), 
        (t ? r.main.transition() : r.main).attr("transform", r.getTranslate("main")), i.attr("transform", r.getTranslate("x")), 
        n.attr("transform", r.getTranslate("y")), a.attr("transform", r.getTranslate("y2")), 
        r.main.select("." + o.chartArcs).attr("transform", r.getTranslate("arc"));
    }, L.transformAll = function(t, e) {
        var i = this;
        i.transformMain(t, e), i.config.subchart_show && i.transformContext(t, e), i.legend && i.transformLegend(t);
    }, L.updateSvgSize = function() {
        var t = this, e = t.svg.select(".c3-brush .background");
        t.svg.attr("width", t.currentWidth).attr("height", t.currentHeight), t.svg.selectAll([ "#" + t.clipId, "#" + t.clipIdForGrid ]).select("rect").attr("width", t.width).attr("height", t.height), 
        t.svg.select("#" + t.clipIdForXAxis).select("rect").attr("x", t.getXAxisClipX.bind(t)).attr("y", t.getXAxisClipY.bind(t)).attr("width", t.getXAxisClipWidth.bind(t)).attr("height", t.getXAxisClipHeight.bind(t)), 
        t.svg.select("#" + t.clipIdForYAxis).select("rect").attr("x", t.getYAxisClipX.bind(t)).attr("y", t.getYAxisClipY.bind(t)).attr("width", t.getYAxisClipWidth.bind(t)).attr("height", t.getYAxisClipHeight.bind(t)), 
        t.svg.select("#" + t.clipIdForSubchart).select("rect").attr("width", t.width).attr("height", e.size() ? e.attr("height") : 0), 
        t.svg.select("." + o.zoomRect).attr("width", t.width).attr("height", t.height), 
        t.selectChart.style("max-height", t.currentHeight + "px");
    }, L.updateDimension = function(t) {
        var e = this;
        t || (e.config.axis_rotated ? (e.axes.x.call(e.xAxis), e.axes.subx.call(e.subXAxis)) : (e.axes.y.call(e.yAxis), 
        e.axes.y2.call(e.y2Axis))), e.updateSizes(), e.updateScales(), e.updateSvgSize(), 
        e.transformAll(!1);
    }, L.observeInserted = function(t) {
        var e, i = this;
        "undefined" != typeof MutationObserver ? (e = new MutationObserver(function(n) {
            n.forEach(function(n) {
                "childList" === n.type && n.previousSibling && (e.disconnect(), i.intervalForObserveInserted = window.setInterval(function() {
                    t.node().parentNode && (window.clearInterval(i.intervalForObserveInserted), i.updateDimension(), 
                    i.brush && i.brush.update(), i.config.oninit.call(i), i.redraw({
                        withTransform: !0,
                        withUpdateXDomain: !0,
                        withUpdateOrgXDomain: !0,
                        withTransition: !1,
                        withTransitionForTransform: !1,
                        withLegend: !0
                    }), t.transition().style("opacity", 1));
                }, 10));
            });
        })).observe(t.node(), {
            attributes: !0,
            childList: !0,
            characterData: !0
        }) : window.console.error("MutationObserver not defined.");
    }, L.bindResize = function() {
        var t = this, e = t.config;
        if (t.resizeFunction = t.generateResize(), t.resizeFunction.add(function() {
            e.onresize.call(t);
        }), e.resize_auto && t.resizeFunction.add(function() {
            void 0 !== t.resizeTimeout && window.clearTimeout(t.resizeTimeout), t.resizeTimeout = window.setTimeout(function() {
                delete t.resizeTimeout, t.api.flush();
            }, 100);
        }), t.resizeFunction.add(function() {
            e.onresized.call(t);
        }), window.attachEvent) window.attachEvent("onresize", t.resizeFunction); else if (window.addEventListener) window.addEventListener("resize", t.resizeFunction, !1); else {
            var i = window.onresize;
            i ? i.add && i.remove || (i = t.generateResize()).add(window.onresize) : i = t.generateResize(), 
            i.add(t.resizeFunction), window.onresize = i;
        }
    }, L.generateResize = function() {
        function t() {
            e.forEach(function(t) {
                t();
            });
        }
        var e = [];
        return t.add = function(t) {
            e.push(t);
        }, t.remove = function(t) {
            for (var i = 0; i < e.length; i++) if (e[i] === t) {
                e.splice(i, 1);
                break;
            }
        }, t;
    }, L.endall = function(t, e) {
        var i = 0;
        t.each(function() {
            ++i;
        }).each("end", function() {
            --i || e.apply(this, arguments);
        });
    }, L.generateWait = function() {
        var t = [], e = function(e, i) {
            var n = setInterval(function() {
                var e = 0;
                t.forEach(function(t) {
                    if (t.empty()) e += 1; else try {
                        t.transition();
                    } catch (t) {
                        e += 1;
                    }
                }), e === t.length && (clearInterval(n), i && i());
            }, 10);
        };
        return e.add = function(e) {
            t.push(e);
        }, e;
    }, L.parseDate = function(t) {
        var e;
        return t instanceof Date ? e = t : "string" == typeof t ? e = this.dataTimeFormat(this.config.data_xFormat).parse(t) : "object" === (void 0 === t ? "undefined" : s(t)) ? e = new Date(+t) : "number" != typeof t || isNaN(t) || (e = new Date(+t)), 
        e && !isNaN(+e) || window.console.error("Failed to parse x '" + t + "' to Date object"), 
        e;
    }, L.isTabVisible = function() {
        var t;
        return void 0 !== document.hidden ? t = "hidden" : void 0 !== document.mozHidden ? t = "mozHidden" : void 0 !== document.msHidden ? t = "msHidden" : void 0 !== document.webkitHidden && (t = "webkitHidden"), 
        !document[t];
    }, L.isValue = u, L.isFunction = h, L.isString = f, L.isUndefined = p, L.isDefined = _, 
    L.ceil10 = x, L.asHalfPixel = m, L.diffDomain = y, L.isEmpty = S, L.notEmpty = w, 
    L.notEmpty = w, L.getOption = v, L.hasValue = b, L.sanitise = T, L.getPathBox = A, 
    L.CLASS = o, Function.prototype.bind || (Function.prototype.bind = function(t) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var e = Array.prototype.slice.call(arguments, 1), i = this, n = function() {}, a = function() {
            return i.apply(this instanceof n ? this : t, e.concat(Array.prototype.slice.call(arguments)));
        };
        return n.prototype = this.prototype, a.prototype = new n(), a;
    }), "SVGPathSeg" in window || (window.SVGPathSeg = function(t, e, i) {
        this.pathSegType = t, this.pathSegTypeAsLetter = e, this._owningPathSegList = i;
    }, window.SVGPathSeg.prototype.classname = "SVGPathSeg", window.SVGPathSeg.PATHSEG_UNKNOWN = 0, 
    window.SVGPathSeg.PATHSEG_CLOSEPATH = 1, window.SVGPathSeg.PATHSEG_MOVETO_ABS = 2, 
    window.SVGPathSeg.PATHSEG_MOVETO_REL = 3, window.SVGPathSeg.PATHSEG_LINETO_ABS = 4, 
    window.SVGPathSeg.PATHSEG_LINETO_REL = 5, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6, 
    window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8, 
    window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9, window.SVGPathSeg.PATHSEG_ARC_ABS = 10, 
    window.SVGPathSeg.PATHSEG_ARC_REL = 11, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12, 
    window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14, 
    window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16, 
    window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18, 
    window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19, window.SVGPathSeg.prototype._segmentChanged = function() {
        this._owningPathSegList && this._owningPathSegList.segmentChanged(this);
    }, window.SVGPathSegClosePath = function(t) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CLOSEPATH, "z", t);
    }, window.SVGPathSegClosePath.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegClosePath.prototype.toString = function() {
        return "[object SVGPathSegClosePath]";
    }, window.SVGPathSegClosePath.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter;
    }, window.SVGPathSegClosePath.prototype.clone = function() {
        return new window.SVGPathSegClosePath(void 0);
    }, window.SVGPathSegMovetoAbs = function(t, e, i) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_ABS, "M", t), this._x = e, 
        this._y = i;
    }, window.SVGPathSegMovetoAbs.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegMovetoAbs.prototype.toString = function() {
        return "[object SVGPathSegMovetoAbs]";
    }, window.SVGPathSegMovetoAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
    }, window.SVGPathSegMovetoAbs.prototype.clone = function() {
        return new window.SVGPathSegMovetoAbs(void 0, this._x, this._y);
    }, Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegMovetoRel = function(t, e, i) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_REL, "m", t), this._x = e, 
        this._y = i;
    }, window.SVGPathSegMovetoRel.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegMovetoRel.prototype.toString = function() {
        return "[object SVGPathSegMovetoRel]";
    }, window.SVGPathSegMovetoRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
    }, window.SVGPathSegMovetoRel.prototype.clone = function() {
        return new window.SVGPathSegMovetoRel(void 0, this._x, this._y);
    }, Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegLinetoAbs = function(t, e, i) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_ABS, "L", t), this._x = e, 
        this._y = i;
    }, window.SVGPathSegLinetoAbs.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegLinetoAbs.prototype.toString = function() {
        return "[object SVGPathSegLinetoAbs]";
    }, window.SVGPathSegLinetoAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
    }, window.SVGPathSegLinetoAbs.prototype.clone = function() {
        return new window.SVGPathSegLinetoAbs(void 0, this._x, this._y);
    }, Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegLinetoRel = function(t, e, i) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_REL, "l", t), this._x = e, 
        this._y = i;
    }, window.SVGPathSegLinetoRel.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegLinetoRel.prototype.toString = function() {
        return "[object SVGPathSegLinetoRel]";
    }, window.SVGPathSegLinetoRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
    }, window.SVGPathSegLinetoRel.prototype.clone = function() {
        return new window.SVGPathSegLinetoRel(void 0, this._x, this._y);
    }, Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegCurvetoCubicAbs = function(t, e, i, n, a, r, o) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", t), 
        this._x = e, this._y = i, this._x1 = n, this._y1 = a, this._x2 = r, this._y2 = o;
    }, window.SVGPathSegCurvetoCubicAbs.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegCurvetoCubicAbs.prototype.toString = function() {
        return "[object SVGPathSegCurvetoCubicAbs]";
    }, window.SVGPathSegCurvetoCubicAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
    }, window.SVGPathSegCurvetoCubicAbs.prototype.clone = function() {
        return new window.SVGPathSegCurvetoCubicAbs(void 0, this._x, this._y, this._x1, this._y1, this._x2, this._y2);
    }, Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x1", {
        get: function() {
            return this._x1;
        },
        set: function(t) {
            this._x1 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y1", {
        get: function() {
            return this._y1;
        },
        set: function(t) {
            this._y1 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x2", {
        get: function() {
            return this._x2;
        },
        set: function(t) {
            this._x2 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y2", {
        get: function() {
            return this._y2;
        },
        set: function(t) {
            this._y2 = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegCurvetoCubicRel = function(t, e, i, n, a, r, o) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", t), 
        this._x = e, this._y = i, this._x1 = n, this._y1 = a, this._x2 = r, this._y2 = o;
    }, window.SVGPathSegCurvetoCubicRel.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegCurvetoCubicRel.prototype.toString = function() {
        return "[object SVGPathSegCurvetoCubicRel]";
    }, window.SVGPathSegCurvetoCubicRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
    }, window.SVGPathSegCurvetoCubicRel.prototype.clone = function() {
        return new window.SVGPathSegCurvetoCubicRel(void 0, this._x, this._y, this._x1, this._y1, this._x2, this._y2);
    }, Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x1", {
        get: function() {
            return this._x1;
        },
        set: function(t) {
            this._x1 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y1", {
        get: function() {
            return this._y1;
        },
        set: function(t) {
            this._y1 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x2", {
        get: function() {
            return this._x2;
        },
        set: function(t) {
            this._x2 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y2", {
        get: function() {
            return this._y2;
        },
        set: function(t) {
            this._y2 = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegCurvetoQuadraticAbs = function(t, e, i, n, a) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", t), 
        this._x = e, this._y = i, this._x1 = n, this._y1 = a;
    }, window.SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegCurvetoQuadraticAbs.prototype.toString = function() {
        return "[object SVGPathSegCurvetoQuadraticAbs]";
    }, window.SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y;
    }, window.SVGPathSegCurvetoQuadraticAbs.prototype.clone = function() {
        return new window.SVGPathSegCurvetoQuadraticAbs(void 0, this._x, this._y, this._x1, this._y1);
    }, Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x1", {
        get: function() {
            return this._x1;
        },
        set: function(t) {
            this._x1 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y1", {
        get: function() {
            return this._y1;
        },
        set: function(t) {
            this._y1 = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegCurvetoQuadraticRel = function(t, e, i, n, a) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", t), 
        this._x = e, this._y = i, this._x1 = n, this._y1 = a;
    }, window.SVGPathSegCurvetoQuadraticRel.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegCurvetoQuadraticRel.prototype.toString = function() {
        return "[object SVGPathSegCurvetoQuadraticRel]";
    }, window.SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y;
    }, window.SVGPathSegCurvetoQuadraticRel.prototype.clone = function() {
        return new window.SVGPathSegCurvetoQuadraticRel(void 0, this._x, this._y, this._x1, this._y1);
    }, Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x1", {
        get: function() {
            return this._x1;
        },
        set: function(t) {
            this._x1 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y1", {
        get: function() {
            return this._y1;
        },
        set: function(t) {
            this._y1 = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegArcAbs = function(t, e, i, n, a, r, o, s) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_ABS, "A", t), this._x = e, 
        this._y = i, this._r1 = n, this._r2 = a, this._angle = r, this._largeArcFlag = o, 
        this._sweepFlag = s;
    }, window.SVGPathSegArcAbs.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegArcAbs.prototype.toString = function() {
        return "[object SVGPathSegArcAbs]";
    }, window.SVGPathSegArcAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y;
    }, window.SVGPathSegArcAbs.prototype.clone = function() {
        return new window.SVGPathSegArcAbs(void 0, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag);
    }, Object.defineProperty(window.SVGPathSegArcAbs.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegArcAbs.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r1", {
        get: function() {
            return this._r1;
        },
        set: function(t) {
            this._r1 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r2", {
        get: function() {
            return this._r2;
        },
        set: function(t) {
            this._r2 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegArcAbs.prototype, "angle", {
        get: function() {
            return this._angle;
        },
        set: function(t) {
            this._angle = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegArcAbs.prototype, "largeArcFlag", {
        get: function() {
            return this._largeArcFlag;
        },
        set: function(t) {
            this._largeArcFlag = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegArcAbs.prototype, "sweepFlag", {
        get: function() {
            return this._sweepFlag;
        },
        set: function(t) {
            this._sweepFlag = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegArcRel = function(t, e, i, n, a, r, o, s) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_REL, "a", t), this._x = e, 
        this._y = i, this._r1 = n, this._r2 = a, this._angle = r, this._largeArcFlag = o, 
        this._sweepFlag = s;
    }, window.SVGPathSegArcRel.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegArcRel.prototype.toString = function() {
        return "[object SVGPathSegArcRel]";
    }, window.SVGPathSegArcRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y;
    }, window.SVGPathSegArcRel.prototype.clone = function() {
        return new window.SVGPathSegArcRel(void 0, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag);
    }, Object.defineProperty(window.SVGPathSegArcRel.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegArcRel.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegArcRel.prototype, "r1", {
        get: function() {
            return this._r1;
        },
        set: function(t) {
            this._r1 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegArcRel.prototype, "r2", {
        get: function() {
            return this._r2;
        },
        set: function(t) {
            this._r2 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegArcRel.prototype, "angle", {
        get: function() {
            return this._angle;
        },
        set: function(t) {
            this._angle = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegArcRel.prototype, "largeArcFlag", {
        get: function() {
            return this._largeArcFlag;
        },
        set: function(t) {
            this._largeArcFlag = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegArcRel.prototype, "sweepFlag", {
        get: function() {
            return this._sweepFlag;
        },
        set: function(t) {
            this._sweepFlag = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegLinetoHorizontalAbs = function(t, e) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", t), 
        this._x = e;
    }, window.SVGPathSegLinetoHorizontalAbs.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegLinetoHorizontalAbs.prototype.toString = function() {
        return "[object SVGPathSegLinetoHorizontalAbs]";
    }, window.SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x;
    }, window.SVGPathSegLinetoHorizontalAbs.prototype.clone = function() {
        return new window.SVGPathSegLinetoHorizontalAbs(void 0, this._x);
    }, Object.defineProperty(window.SVGPathSegLinetoHorizontalAbs.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegLinetoHorizontalRel = function(t, e) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", t), 
        this._x = e;
    }, window.SVGPathSegLinetoHorizontalRel.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegLinetoHorizontalRel.prototype.toString = function() {
        return "[object SVGPathSegLinetoHorizontalRel]";
    }, window.SVGPathSegLinetoHorizontalRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x;
    }, window.SVGPathSegLinetoHorizontalRel.prototype.clone = function() {
        return new window.SVGPathSegLinetoHorizontalRel(void 0, this._x);
    }, Object.defineProperty(window.SVGPathSegLinetoHorizontalRel.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegLinetoVerticalAbs = function(t, e) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", t), 
        this._y = e;
    }, window.SVGPathSegLinetoVerticalAbs.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegLinetoVerticalAbs.prototype.toString = function() {
        return "[object SVGPathSegLinetoVerticalAbs]";
    }, window.SVGPathSegLinetoVerticalAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._y;
    }, window.SVGPathSegLinetoVerticalAbs.prototype.clone = function() {
        return new window.SVGPathSegLinetoVerticalAbs(void 0, this._y);
    }, Object.defineProperty(window.SVGPathSegLinetoVerticalAbs.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegLinetoVerticalRel = function(t, e) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", t), 
        this._y = e;
    }, window.SVGPathSegLinetoVerticalRel.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegLinetoVerticalRel.prototype.toString = function() {
        return "[object SVGPathSegLinetoVerticalRel]";
    }, window.SVGPathSegLinetoVerticalRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._y;
    }, window.SVGPathSegLinetoVerticalRel.prototype.clone = function() {
        return new window.SVGPathSegLinetoVerticalRel(void 0, this._y);
    }, Object.defineProperty(window.SVGPathSegLinetoVerticalRel.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegCurvetoCubicSmoothAbs = function(t, e, i, n, a) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", t), 
        this._x = e, this._y = i, this._x2 = n, this._y2 = a;
    }, window.SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function() {
        return "[object SVGPathSegCurvetoCubicSmoothAbs]";
    }, window.SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
    }, window.SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function() {
        return new window.SVGPathSegCurvetoCubicSmoothAbs(void 0, this._x, this._y, this._x2, this._y2);
    }, Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", {
        get: function() {
            return this._x2;
        },
        set: function(t) {
            this._x2 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", {
        get: function() {
            return this._y2;
        },
        set: function(t) {
            this._y2 = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegCurvetoCubicSmoothRel = function(t, e, i, n, a) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", t), 
        this._x = e, this._y = i, this._x2 = n, this._y2 = a;
    }, window.SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function() {
        return "[object SVGPathSegCurvetoCubicSmoothRel]";
    }, window.SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
    }, window.SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function() {
        return new window.SVGPathSegCurvetoCubicSmoothRel(void 0, this._x, this._y, this._x2, this._y2);
    }, Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", {
        get: function() {
            return this._x2;
        },
        set: function(t) {
            this._x2 = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", {
        get: function() {
            return this._y2;
        },
        set: function(t) {
            this._y2 = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegCurvetoQuadraticSmoothAbs = function(t, e, i) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", t), 
        this._x = e, this._y = i;
    }, window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function() {
        return "[object SVGPathSegCurvetoQuadraticSmoothAbs]";
    }, window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
    }, window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function() {
        return new window.SVGPathSegCurvetoQuadraticSmoothAbs(void 0, this._x, this._y);
    }, Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathSegCurvetoQuadraticSmoothRel = function(t, e, i) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", t), 
        this._x = e, this._y = i;
    }, window.SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype), 
    window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function() {
        return "[object SVGPathSegCurvetoQuadraticSmoothRel]";
    }, window.SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
    }, window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function() {
        return new window.SVGPathSegCurvetoQuadraticSmoothRel(void 0, this._x, this._y);
    }, Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", {
        get: function() {
            return this._x;
        },
        set: function(t) {
            this._x = t, this._segmentChanged();
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", {
        get: function() {
            return this._y;
        },
        set: function(t) {
            this._y = t, this._segmentChanged();
        },
        enumerable: !0
    }), window.SVGPathElement.prototype.createSVGPathSegClosePath = function() {
        return new window.SVGPathSegClosePath(void 0);
    }, window.SVGPathElement.prototype.createSVGPathSegMovetoAbs = function(t, e) {
        return new window.SVGPathSegMovetoAbs(void 0, t, e);
    }, window.SVGPathElement.prototype.createSVGPathSegMovetoRel = function(t, e) {
        return new window.SVGPathSegMovetoRel(void 0, t, e);
    }, window.SVGPathElement.prototype.createSVGPathSegLinetoAbs = function(t, e) {
        return new window.SVGPathSegLinetoAbs(void 0, t, e);
    }, window.SVGPathElement.prototype.createSVGPathSegLinetoRel = function(t, e) {
        return new window.SVGPathSegLinetoRel(void 0, t, e);
    }, window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function(t, e, i, n, a, r) {
        return new window.SVGPathSegCurvetoCubicAbs(void 0, t, e, i, n, a, r);
    }, window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function(t, e, i, n, a, r) {
        return new window.SVGPathSegCurvetoCubicRel(void 0, t, e, i, n, a, r);
    }, window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function(t, e, i, n) {
        return new window.SVGPathSegCurvetoQuadraticAbs(void 0, t, e, i, n);
    }, window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function(t, e, i, n) {
        return new window.SVGPathSegCurvetoQuadraticRel(void 0, t, e, i, n);
    }, window.SVGPathElement.prototype.createSVGPathSegArcAbs = function(t, e, i, n, a, r, o) {
        return new window.SVGPathSegArcAbs(void 0, t, e, i, n, a, r, o);
    }, window.SVGPathElement.prototype.createSVGPathSegArcRel = function(t, e, i, n, a, r, o) {
        return new window.SVGPathSegArcRel(void 0, t, e, i, n, a, r, o);
    }, window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function(t) {
        return new window.SVGPathSegLinetoHorizontalAbs(void 0, t);
    }, window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function(t) {
        return new window.SVGPathSegLinetoHorizontalRel(void 0, t);
    }, window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function(t) {
        return new window.SVGPathSegLinetoVerticalAbs(void 0, t);
    }, window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function(t) {
        return new window.SVGPathSegLinetoVerticalRel(void 0, t);
    }, window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function(t, e, i, n) {
        return new window.SVGPathSegCurvetoCubicSmoothAbs(void 0, t, e, i, n);
    }, window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function(t, e, i, n) {
        return new window.SVGPathSegCurvetoCubicSmoothRel(void 0, t, e, i, n);
    }, window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function(t, e) {
        return new window.SVGPathSegCurvetoQuadraticSmoothAbs(void 0, t, e);
    }, window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function(t, e) {
        return new window.SVGPathSegCurvetoQuadraticSmoothRel(void 0, t, e);
    }, "getPathSegAtLength" in window.SVGPathElement.prototype || (window.SVGPathElement.prototype.getPathSegAtLength = function(t) {
        if (void 0 === t || !isFinite(t)) throw "Invalid arguments.";
        var e = document.createElementNS("http://www.w3.org/2000/svg", "path");
        e.setAttribute("d", this.getAttribute("d"));
        var i = e.pathSegList.numberOfItems - 1;
        if (i <= 0) return 0;
        do {
            if (e.pathSegList.removeItem(i), t > e.getTotalLength()) break;
            i--;
        } while (0 < i);
        return i;
    })), "SVGPathSegList" in window || (window.SVGPathSegList = function(t) {
        this._pathElement = t, this._list = this._parsePath(this._pathElement.getAttribute("d")), 
        this._mutationObserverConfig = {
            attributes: !0,
            attributeFilter: [ "d" ]
        }, this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this)), 
        this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
    }, window.SVGPathSegList.prototype.classname = "SVGPathSegList", Object.defineProperty(window.SVGPathSegList.prototype, "numberOfItems", {
        get: function() {
            return this._checkPathSynchronizedToList(), this._list.length;
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathElement.prototype, "pathSegList", {
        get: function() {
            return this._pathSegList || (this._pathSegList = new window.SVGPathSegList(this)), 
            this._pathSegList;
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathElement.prototype, "normalizedPathSegList", {
        get: function() {
            return this.pathSegList;
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathElement.prototype, "animatedPathSegList", {
        get: function() {
            return this.pathSegList;
        },
        enumerable: !0
    }), Object.defineProperty(window.SVGPathElement.prototype, "animatedNormalizedPathSegList", {
        get: function() {
            return this.pathSegList;
        },
        enumerable: !0
    }), window.SVGPathSegList.prototype._checkPathSynchronizedToList = function() {
        this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords());
    }, window.SVGPathSegList.prototype._updateListFromPathMutations = function(t) {
        if (this._pathElement) {
            var e = !1;
            t.forEach(function(t) {
                "d" == t.attributeName && (e = !0);
            }), e && (this._list = this._parsePath(this._pathElement.getAttribute("d")));
        }
    }, window.SVGPathSegList.prototype._writeListToPath = function() {
        this._pathElementMutationObserver.disconnect(), this._pathElement.setAttribute("d", window.SVGPathSegList._pathSegArrayAsString(this._list)), 
        this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
    }, window.SVGPathSegList.prototype.segmentChanged = function(t) {
        this._writeListToPath();
    }, window.SVGPathSegList.prototype.clear = function() {
        this._checkPathSynchronizedToList(), this._list.forEach(function(t) {
            t._owningPathSegList = null;
        }), this._list = [], this._writeListToPath();
    }, window.SVGPathSegList.prototype.initialize = function(t) {
        return this._checkPathSynchronizedToList(), this._list = [ t ], (t._owningPathSegList = this)._writeListToPath(), 
        t;
    }, window.SVGPathSegList.prototype._checkValidIndex = function(t) {
        if (isNaN(t) || t < 0 || t >= this.numberOfItems) throw "INDEX_SIZE_ERR";
    }, window.SVGPathSegList.prototype.getItem = function(t) {
        return this._checkPathSynchronizedToList(), this._checkValidIndex(t), this._list[t];
    }, window.SVGPathSegList.prototype.insertItemBefore = function(t, e) {
        return this._checkPathSynchronizedToList(), e > this.numberOfItems && (e = this.numberOfItems), 
        t._owningPathSegList && (t = t.clone()), this._list.splice(e, 0, t), (t._owningPathSegList = this)._writeListToPath(), 
        t;
    }, window.SVGPathSegList.prototype.replaceItem = function(t, e) {
        return this._checkPathSynchronizedToList(), t._owningPathSegList && (t = t.clone()), 
        this._checkValidIndex(e), ((this._list[e] = t)._owningPathSegList = this)._writeListToPath(), 
        t;
    }, window.SVGPathSegList.prototype.removeItem = function(t) {
        this._checkPathSynchronizedToList(), this._checkValidIndex(t);
        var e = this._list[t];
        return this._list.splice(t, 1), this._writeListToPath(), e;
    }, window.SVGPathSegList.prototype.appendItem = function(t) {
        return this._checkPathSynchronizedToList(), t._owningPathSegList && (t = t.clone()), 
        this._list.push(t), (t._owningPathSegList = this)._writeListToPath(), t;
    }, window.SVGPathSegList._pathSegArrayAsString = function(t) {
        var e = "", i = !0;
        return t.forEach(function(t) {
            i ? (i = !1, e += t._asPathString()) : e += " " + t._asPathString();
        }), e;
    }, window.SVGPathSegList.prototype._parsePath = function(t) {
        if (!t || 0 == t.length) return [];
        var e = this, i = function() {
            this.pathSegList = [];
        };
        i.prototype.appendSegment = function(t) {
            this.pathSegList.push(t);
        };
        var n = function(t) {
            this._string = t, this._currentIndex = 0, this._endIndex = this._string.length, 
            this._previousCommand = window.SVGPathSeg.PATHSEG_UNKNOWN, this._skipOptionalSpaces();
        };
        n.prototype._isCurrentSpace = function() {
            var t = this._string[this._currentIndex];
            return t <= " " && (" " == t || "\n" == t || "\t" == t || "\r" == t || "\f" == t);
        }, n.prototype._skipOptionalSpaces = function() {
            for (;this._currentIndex < this._endIndex && this._isCurrentSpace(); ) this._currentIndex++;
            return this._currentIndex < this._endIndex;
        }, n.prototype._skipOptionalSpacesOrDelimiter = function() {
            return !(this._currentIndex < this._endIndex && !this._isCurrentSpace() && "," != this._string.charAt(this._currentIndex)) && (this._skipOptionalSpaces() && this._currentIndex < this._endIndex && "," == this._string.charAt(this._currentIndex) && (this._currentIndex++, 
            this._skipOptionalSpaces()), this._currentIndex < this._endIndex);
        }, n.prototype.hasMoreData = function() {
            return this._currentIndex < this._endIndex;
        }, n.prototype.peekSegmentType = function() {
            var t = this._string[this._currentIndex];
            return this._pathSegTypeFromChar(t);
        }, n.prototype._pathSegTypeFromChar = function(t) {
            switch (t) {
              case "Z":
              case "z":
                return window.SVGPathSeg.PATHSEG_CLOSEPATH;

              case "M":
                return window.SVGPathSeg.PATHSEG_MOVETO_ABS;

              case "m":
                return window.SVGPathSeg.PATHSEG_MOVETO_REL;

              case "L":
                return window.SVGPathSeg.PATHSEG_LINETO_ABS;

              case "l":
                return window.SVGPathSeg.PATHSEG_LINETO_REL;

              case "C":
                return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;

              case "c":
                return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;

              case "Q":
                return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;

              case "q":
                return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;

              case "A":
                return window.SVGPathSeg.PATHSEG_ARC_ABS;

              case "a":
                return window.SVGPathSeg.PATHSEG_ARC_REL;

              case "H":
                return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;

              case "h":
                return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;

              case "V":
                return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;

              case "v":
                return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;

              case "S":
                return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;

              case "s":
                return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;

              case "T":
                return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;

              case "t":
                return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;

              default:
                return window.SVGPathSeg.PATHSEG_UNKNOWN;
            }
        }, n.prototype._nextCommandHelper = function(t, e) {
            return ("+" == t || "-" == t || "." == t || "0" <= t && t <= "9") && e != window.SVGPathSeg.PATHSEG_CLOSEPATH ? e == window.SVGPathSeg.PATHSEG_MOVETO_ABS ? window.SVGPathSeg.PATHSEG_LINETO_ABS : e == window.SVGPathSeg.PATHSEG_MOVETO_REL ? window.SVGPathSeg.PATHSEG_LINETO_REL : e : window.SVGPathSeg.PATHSEG_UNKNOWN;
        }, n.prototype.initialCommandIsMoveTo = function() {
            if (!this.hasMoreData()) return !0;
            var t = this.peekSegmentType();
            return t == window.SVGPathSeg.PATHSEG_MOVETO_ABS || t == window.SVGPathSeg.PATHSEG_MOVETO_REL;
        }, n.prototype._parseNumber = function() {
            var t = 0, e = 0, i = 1, n = 0, a = 1, r = 1, o = this._currentIndex;
            if (this._skipOptionalSpaces(), this._currentIndex < this._endIndex && "+" == this._string.charAt(this._currentIndex) ? this._currentIndex++ : this._currentIndex < this._endIndex && "-" == this._string.charAt(this._currentIndex) && (this._currentIndex++, 
            a = -1), !(this._currentIndex == this._endIndex || (this._string.charAt(this._currentIndex) < "0" || "9" < this._string.charAt(this._currentIndex)) && "." != this._string.charAt(this._currentIndex))) {
                for (var s = this._currentIndex; this._currentIndex < this._endIndex && "0" <= this._string.charAt(this._currentIndex) && this._string.charAt(this._currentIndex) <= "9"; ) this._currentIndex++;
                if (this._currentIndex != s) for (var c = this._currentIndex - 1, d = 1; s <= c; ) e += d * (this._string.charAt(c--) - "0"), 
                d *= 10;
                if (this._currentIndex < this._endIndex && "." == this._string.charAt(this._currentIndex)) {
                    if (this._currentIndex++, this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || "9" < this._string.charAt(this._currentIndex)) return;
                    for (;this._currentIndex < this._endIndex && "0" <= this._string.charAt(this._currentIndex) && this._string.charAt(this._currentIndex) <= "9"; ) i *= 10, 
                    n += (this._string.charAt(this._currentIndex) - "0") / i, this._currentIndex += 1;
                }
                if (this._currentIndex != o && this._currentIndex + 1 < this._endIndex && ("e" == this._string.charAt(this._currentIndex) || "E" == this._string.charAt(this._currentIndex)) && "x" != this._string.charAt(this._currentIndex + 1) && "m" != this._string.charAt(this._currentIndex + 1)) {
                    if (this._currentIndex++, "+" == this._string.charAt(this._currentIndex) ? this._currentIndex++ : "-" == this._string.charAt(this._currentIndex) && (this._currentIndex++, 
                    r = -1), this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || "9" < this._string.charAt(this._currentIndex)) return;
                    for (;this._currentIndex < this._endIndex && "0" <= this._string.charAt(this._currentIndex) && this._string.charAt(this._currentIndex) <= "9"; ) t *= 10, 
                    t += this._string.charAt(this._currentIndex) - "0", this._currentIndex++;
                }
                var l = e + n;
                if (l *= a, t && (l *= Math.pow(10, r * t)), o != this._currentIndex) return this._skipOptionalSpacesOrDelimiter(), 
                l;
            }
        }, n.prototype._parseArcFlag = function() {
            if (!(this._currentIndex >= this._endIndex)) {
                var t = !1, e = this._string.charAt(this._currentIndex++);
                if ("0" == e) t = !1; else {
                    if ("1" != e) return;
                    t = !0;
                }
                return this._skipOptionalSpacesOrDelimiter(), t;
            }
        }, n.prototype.parseSegment = function() {
            var t = this._string[this._currentIndex], i = this._pathSegTypeFromChar(t);
            if (i == window.SVGPathSeg.PATHSEG_UNKNOWN) {
                if (this._previousCommand == window.SVGPathSeg.PATHSEG_UNKNOWN) return null;
                if ((i = this._nextCommandHelper(t, this._previousCommand)) == window.SVGPathSeg.PATHSEG_UNKNOWN) return null;
            } else this._currentIndex++;
            switch (this._previousCommand = i) {
              case window.SVGPathSeg.PATHSEG_MOVETO_REL:
                return new window.SVGPathSegMovetoRel(e, this._parseNumber(), this._parseNumber());

              case window.SVGPathSeg.PATHSEG_MOVETO_ABS:
                return new window.SVGPathSegMovetoAbs(e, this._parseNumber(), this._parseNumber());

              case window.SVGPathSeg.PATHSEG_LINETO_REL:
                return new window.SVGPathSegLinetoRel(e, this._parseNumber(), this._parseNumber());

              case window.SVGPathSeg.PATHSEG_LINETO_ABS:
                return new window.SVGPathSegLinetoAbs(e, this._parseNumber(), this._parseNumber());

              case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                return new window.SVGPathSegLinetoHorizontalRel(e, this._parseNumber());

              case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                return new window.SVGPathSegLinetoHorizontalAbs(e, this._parseNumber());

              case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                return new window.SVGPathSegLinetoVerticalRel(e, this._parseNumber());

              case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                return new window.SVGPathSegLinetoVerticalAbs(e, this._parseNumber());

              case window.SVGPathSeg.PATHSEG_CLOSEPATH:
                return this._skipOptionalSpaces(), new window.SVGPathSegClosePath(e);

              case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                return n = {
                    x1: this._parseNumber(),
                    y1: this._parseNumber(),
                    x2: this._parseNumber(),
                    y2: this._parseNumber(),
                    x: this._parseNumber(),
                    y: this._parseNumber()
                }, new window.SVGPathSegCurvetoCubicRel(e, n.x, n.y, n.x1, n.y1, n.x2, n.y2);

              case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                return n = {
                    x1: this._parseNumber(),
                    y1: this._parseNumber(),
                    x2: this._parseNumber(),
                    y2: this._parseNumber(),
                    x: this._parseNumber(),
                    y: this._parseNumber()
                }, new window.SVGPathSegCurvetoCubicAbs(e, n.x, n.y, n.x1, n.y1, n.x2, n.y2);

              case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                return n = {
                    x2: this._parseNumber(),
                    y2: this._parseNumber(),
                    x: this._parseNumber(),
                    y: this._parseNumber()
                }, new window.SVGPathSegCurvetoCubicSmoothRel(e, n.x, n.y, n.x2, n.y2);

              case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                return n = {
                    x2: this._parseNumber(),
                    y2: this._parseNumber(),
                    x: this._parseNumber(),
                    y: this._parseNumber()
                }, new window.SVGPathSegCurvetoCubicSmoothAbs(e, n.x, n.y, n.x2, n.y2);

              case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                return n = {
                    x1: this._parseNumber(),
                    y1: this._parseNumber(),
                    x: this._parseNumber(),
                    y: this._parseNumber()
                }, new window.SVGPathSegCurvetoQuadraticRel(e, n.x, n.y, n.x1, n.y1);

              case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                return n = {
                    x1: this._parseNumber(),
                    y1: this._parseNumber(),
                    x: this._parseNumber(),
                    y: this._parseNumber()
                }, new window.SVGPathSegCurvetoQuadraticAbs(e, n.x, n.y, n.x1, n.y1);

              case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                return new window.SVGPathSegCurvetoQuadraticSmoothRel(e, this._parseNumber(), this._parseNumber());

              case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                return new window.SVGPathSegCurvetoQuadraticSmoothAbs(e, this._parseNumber(), this._parseNumber());

              case window.SVGPathSeg.PATHSEG_ARC_REL:
                return n = {
                    x1: this._parseNumber(),
                    y1: this._parseNumber(),
                    arcAngle: this._parseNumber(),
                    arcLarge: this._parseArcFlag(),
                    arcSweep: this._parseArcFlag(),
                    x: this._parseNumber(),
                    y: this._parseNumber()
                }, new window.SVGPathSegArcRel(e, n.x, n.y, n.x1, n.y1, n.arcAngle, n.arcLarge, n.arcSweep);

              case window.SVGPathSeg.PATHSEG_ARC_ABS:
                var n = {
                    x1: this._parseNumber(),
                    y1: this._parseNumber(),
                    arcAngle: this._parseNumber(),
                    arcLarge: this._parseArcFlag(),
                    arcSweep: this._parseArcFlag(),
                    x: this._parseNumber(),
                    y: this._parseNumber()
                };
                return new window.SVGPathSegArcAbs(e, n.x, n.y, n.x1, n.y1, n.arcAngle, n.arcLarge, n.arcSweep);

              default:
                throw "Unknown path seg type.";
            }
        };
        var a = new i(), r = new n(t);
        if (!r.initialCommandIsMoveTo()) return [];
        for (;r.hasMoreData(); ) {
            var o = r.parseSegment();
            if (!o) return [];
            a.appendSegment(o);
        }
        return a.pathSegList;
    }), C.axis = function() {}, C.axis.labels = function(t) {
        var e = this.internal;
        arguments.length && (Object.keys(t).forEach(function(i) {
            e.axis.setLabelText(i, t[i]);
        }), e.axis.updateLabels());
    }, C.axis.max = function(t) {
        var e = this.internal, i = e.config;
        if (!arguments.length) return {
            x: i.axis_x_max,
            y: i.axis_y_max,
            y2: i.axis_y2_max
        };
        "object" === (void 0 === t ? "undefined" : s(t)) ? (u(t.x) && (i.axis_x_max = t.x), 
        u(t.y) && (i.axis_y_max = t.y), u(t.y2) && (i.axis_y2_max = t.y2)) : i.axis_y_max = i.axis_y2_max = t, 
        e.redraw({
            withUpdateOrgXDomain: !0,
            withUpdateXDomain: !0
        });
    }, C.axis.min = function(t) {
        var e = this.internal, i = e.config;
        if (!arguments.length) return {
            x: i.axis_x_min,
            y: i.axis_y_min,
            y2: i.axis_y2_min
        };
        "object" === (void 0 === t ? "undefined" : s(t)) ? (u(t.x) && (i.axis_x_min = t.x), 
        u(t.y) && (i.axis_y_min = t.y), u(t.y2) && (i.axis_y2_min = t.y2)) : i.axis_y_min = i.axis_y2_min = t, 
        e.redraw({
            withUpdateOrgXDomain: !0,
            withUpdateXDomain: !0
        });
    }, C.axis.range = function(t) {
        if (!arguments.length) return {
            max: this.axis.max(),
            min: this.axis.min()
        };
        _(t.max) && this.axis.max(t.max), _(t.min) && this.axis.min(t.min);
    }, C.category = function(t, e) {
        var i = this.internal, n = i.config;
        return 1 < arguments.length && (n.axis_x_categories[t] = e, i.redraw()), n.axis_x_categories[t];
    }, C.categories = function(t) {
        var e = this.internal, i = e.config;
        return arguments.length && (i.axis_x_categories = t, e.redraw()), i.axis_x_categories;
    }, C.resize = function(t) {
        var e = this.internal.config;
        e.size_width = t ? t.width : null, e.size_height = t ? t.height : null, this.flush();
    }, C.flush = function() {
        this.internal.updateAndRedraw({
            withLegend: !0,
            withTransition: !1,
            withTransitionForTransform: !1
        });
    }, C.destroy = function() {
        var t = this.internal;
        if (window.clearInterval(t.intervalForObserveInserted), void 0 !== t.resizeTimeout && window.clearTimeout(t.resizeTimeout), 
        window.detachEvent) window.detachEvent("onresize", t.resizeFunction); else if (window.removeEventListener) window.removeEventListener("resize", t.resizeFunction); else {
            var e = window.onresize;
            e && e.add && e.remove && e.remove(t.resizeFunction);
        }
        return t.selectChart.classed("c3", !1).html(""), Object.keys(t).forEach(function(e) {
            t[e] = null;
        }), null;
    }, C.color = function(t) {
        return this.internal.color(t);
    }, C.data = function(t) {
        var e = this.internal.data.targets;
        return void 0 === t ? e : e.filter(function(e) {
            return 0 <= [].concat(t).indexOf(e.id);
        });
    }, C.data.shown = function(t) {
        return this.internal.filterTargetsToShow(this.data(t));
    }, C.data.values = function(t) {
        var e, i = null;
        return t && (i = (e = this.data(t))[0] ? e[0].values.map(function(t) {
            return t.value;
        }) : null), i;
    }, C.data.names = function(t) {
        return this.internal.clearLegendItemTextBoxCache(), this.internal.updateDataAttributes("names", t);
    }, C.data.colors = function(t) {
        return this.internal.updateDataAttributes("colors", t);
    }, C.data.axes = function(t) {
        return this.internal.updateDataAttributes("axes", t);
    }, C.flow = function(t) {
        var e, i, n, a, r, o, s, c = this.internal, d = [], l = c.getMaxDataCount(), h = 0, g = 0;
        if (t.json) i = c.convertJsonToData(t.json, t.keys); else if (t.rows) i = c.convertRowsToData(t.rows); else {
            if (!t.columns) return;
            i = c.convertColumnsToData(t.columns);
        }
        e = c.convertDataToTargets(i, !0), c.data.targets.forEach(function(t) {
            var i, n, a = !1;
            for (i = 0; i < e.length; i++) if (t.id === e[i].id) {
                for (a = !0, t.values[t.values.length - 1] && (g = t.values[t.values.length - 1].index + 1), 
                h = e[i].values.length, n = 0; n < h; n++) e[i].values[n].index = g + n, c.isTimeSeries() || (e[i].values[n].x = g + n);
                t.values = t.values.concat(e[i].values), e.splice(i, 1);
                break;
            }
            a || d.push(t.id);
        }), c.data.targets.forEach(function(t) {
            var e, i;
            for (e = 0; e < d.length; e++) if (t.id === d[e]) for (g = t.values[t.values.length - 1].index + 1, 
            i = 0; i < h; i++) t.values.push({
                id: t.id,
                index: g + i,
                x: c.isTimeSeries() ? c.getOtherTargetX(g + i) : g + i,
                value: null
            });
        }), c.data.targets.length && e.forEach(function(t) {
            var e, i = [];
            for (e = c.data.targets[0].values[0].index; e < g; e++) i.push({
                id: t.id,
                index: e,
                x: c.isTimeSeries() ? c.getOtherTargetX(e) : e,
                value: null
            });
            t.values.forEach(function(t) {
                t.index += g, c.isTimeSeries() || (t.x += g);
            }), t.values = i.concat(t.values);
        }), c.data.targets = c.data.targets.concat(e), c.getMaxDataCount(), r = (a = c.data.targets[0]).values[0], 
        _(t.to) ? (h = 0, s = c.isTimeSeries() ? c.parseDate(t.to) : t.to, a.values.forEach(function(t) {
            t.x < s && h++;
        })) : _(t.length) && (h = t.length), l ? 1 === l && c.isTimeSeries() && (o = (a.values[a.values.length - 1].x - r.x) / 2, 
        n = [ new Date(+r.x - o), new Date(+r.x + o) ], c.updateXDomain(null, !0, !0, !1, n)) : (o = c.isTimeSeries() ? 1 < a.values.length ? a.values[a.values.length - 1].x - r.x : r.x - c.getXDomain(c.data.targets)[0] : 1, 
        n = [ r.x - o, r.x ], c.updateXDomain(null, !0, !0, !1, n)), c.updateTargets(c.data.targets), 
        c.redraw({
            flow: {
                index: r.index,
                length: h,
                duration: u(t.duration) ? t.duration : c.config.transition_duration,
                done: t.done,
                orgDataCount: l
            },
            withLegend: !0,
            withTransition: 1 < l,
            withTrimXDomain: !1,
            withUpdateXAxis: !0
        });
    }, L.generateFlow = function(t) {
        var e = this, i = e.config, n = e.d3;
        return function() {
            var a, r, s, S, c = t.targets, d = t.flow, l = t.drawBar, u = t.drawLine, h = t.drawArea, g = t.cx, f = t.cy, p = t.xv, _ = t.xForText, x = t.yForText, m = t.duration, w = d.index, v = d.length, b = e.getValueOnIndex(e.data.targets[0].values, w), T = e.getValueOnIndex(e.data.targets[0].values, w + v), A = e.x.domain(), P = d.duration || m, C = d.done || function() {}, L = e.generateWait(), V = e.xgrid || n.selectAll([]), G = e.xgridLines || n.selectAll([]), E = e.mainRegion || n.selectAll([]), O = e.mainText || n.selectAll([]), I = e.mainBar || n.selectAll([]), R = e.mainLine || n.selectAll([]), k = e.mainArea || n.selectAll([]), D = e.mainCircle || n.selectAll([]);
            e.flowing = !0, e.data.targets.forEach(function(t) {
                t.values.splice(0, v);
            }), s = e.updateXDomain(c, !0, !0), e.updateXGrid && e.updateXGrid(!0), a = d.orgDataCount ? 1 === d.orgDataCount || (b && b.x) === (T && T.x) ? e.x(A[0]) - e.x(s[0]) : e.isTimeSeries() ? e.x(A[0]) - e.x(s[0]) : e.x(b.x) - e.x(T.x) : 1 !== e.data.targets[0].values.length ? e.x(A[0]) - e.x(s[0]) : e.isTimeSeries() ? (b = e.getValueOnIndex(e.data.targets[0].values, 0), 
            T = e.getValueOnIndex(e.data.targets[0].values, e.data.targets[0].values.length - 1), 
            e.x(b.x) - e.x(T.x)) : y(s) / 2, S = y(A) / y(s), r = "translate(" + a + ",0) scale(" + S + ",1)", 
            e.hideXGridFocus(), n.transition().ease("linear").duration(P).each(function() {
                L.add(e.axes.x.transition().call(e.xAxis)), L.add(I.transition().attr("transform", r)), 
                L.add(R.transition().attr("transform", r)), L.add(k.transition().attr("transform", r)), 
                L.add(D.transition().attr("transform", r)), L.add(O.transition().attr("transform", r)), 
                L.add(E.filter(e.isRegionOnX).transition().attr("transform", r)), L.add(V.transition().attr("transform", r)), 
                L.add(G.transition().attr("transform", r));
            }).call(L, function() {
                var t, n = [], a = [], r = [];
                if (v) {
                    for (t = 0; t < v; t++) n.push("." + o.shape + "-" + (w + t)), a.push("." + o.text + "-" + (w + t)), 
                    r.push("." + o.eventRect + "-" + (w + t));
                    e.svg.selectAll("." + o.shapes).selectAll(n).remove(), e.svg.selectAll("." + o.texts).selectAll(a).remove(), 
                    e.svg.selectAll("." + o.eventRects).selectAll(r).remove(), e.svg.select("." + o.xgrid).remove();
                }
                V.attr("transform", null).attr(e.xgridAttr), G.attr("transform", null), G.select("line").attr("x1", i.axis_rotated ? 0 : p).attr("x2", i.axis_rotated ? e.width : p), 
                G.select("text").attr("x", i.axis_rotated ? e.width : 0).attr("y", p), I.attr("transform", null).attr("d", l), 
                R.attr("transform", null).attr("d", u), k.attr("transform", null).attr("d", h), 
                D.attr("transform", null).attr("cx", g).attr("cy", f), O.attr("transform", null).attr("x", _).attr("y", x).style("fill-opacity", e.opacityForText.bind(e)), 
                E.attr("transform", null), E.select("rect").filter(e.isRegionOnX).attr("x", e.regionX.bind(e)).attr("width", e.regionWidth.bind(e)), 
                i.interaction_enabled && e.redrawEventRect(), C(), e.flowing = !1;
            });
        };
    }, C.focus = function(t) {
        var e, i = this.internal;
        t = i.mapToTargetIds(t), e = i.svg.selectAll(i.selectorTargets(t.filter(i.isTargetToShow, i))), 
        this.revert(), this.defocus(), e.classed(o.focused, !0).classed(o.defocused, !1), 
        i.hasArcType() && i.expandArc(t), i.toggleFocusLegend(t, !0), i.focusedTargetIds = t, 
        i.defocusedTargetIds = i.defocusedTargetIds.filter(function(e) {
            return t.indexOf(e) < 0;
        });
    }, C.defocus = function(t) {
        var e = this.internal;
        t = e.mapToTargetIds(t), e.svg.selectAll(e.selectorTargets(t.filter(e.isTargetToShow, e))).classed(o.focused, !1).classed(o.defocused, !0), 
        e.hasArcType() && e.unexpandArc(t), e.toggleFocusLegend(t, !1), e.focusedTargetIds = e.focusedTargetIds.filter(function(e) {
            return t.indexOf(e) < 0;
        }), e.defocusedTargetIds = t;
    }, C.revert = function(t) {
        var e = this.internal;
        t = e.mapToTargetIds(t), e.svg.selectAll(e.selectorTargets(t)).classed(o.focused, !1).classed(o.defocused, !1), 
        e.hasArcType() && e.unexpandArc(t), e.config.legend_show && (e.showLegend(t.filter(e.isLegendToShow.bind(e))), 
        e.legend.selectAll(e.selectorLegends(t)).filter(function() {
            return e.d3.select(this).classed(o.legendItemFocused);
        }).classed(o.legendItemFocused, !1)), e.focusedTargetIds = [], e.defocusedTargetIds = [];
    }, C.xgrids = function(t) {
        var e = this.internal, i = e.config;
        return t && (i.grid_x_lines = t, e.redrawWithoutRescale()), i.grid_x_lines;
    }, C.xgrids.add = function(t) {
        var e = this.internal;
        return this.xgrids(e.config.grid_x_lines.concat(t || []));
    }, C.xgrids.remove = function(t) {
        this.internal.removeGridLines(t, !0);
    }, C.ygrids = function(t) {
        var e = this.internal, i = e.config;
        return t && (i.grid_y_lines = t, e.redrawWithoutRescale()), i.grid_y_lines;
    }, C.ygrids.add = function(t) {
        var e = this.internal;
        return this.ygrids(e.config.grid_y_lines.concat(t || []));
    }, C.ygrids.remove = function(t) {
        this.internal.removeGridLines(t, !1);
    }, C.groups = function(t) {
        var e = this.internal, i = e.config;
        return p(t) || (i.data_groups = t, e.redraw()), i.data_groups;
    }, C.legend = function() {}, C.legend.show = function(t) {
        var e = this.internal;
        e.showLegend(e.mapToTargetIds(t)), e.updateAndRedraw({
            withLegend: !0
        });
    }, C.legend.hide = function(t) {
        var e = this.internal;
        e.hideLegend(e.mapToTargetIds(t)), e.updateAndRedraw({
            withLegend: !0
        });
    }, C.load = function(t) {
        var e = this.internal, i = e.config;
        t.xs && e.addXs(t.xs), "names" in t && C.data.names.bind(this)(t.names), "classes" in t && Object.keys(t.classes).forEach(function(e) {
            i.data_classes[e] = t.classes[e];
        }), "categories" in t && e.isCategorized() && (i.axis_x_categories = t.categories), 
        "axes" in t && Object.keys(t.axes).forEach(function(e) {
            i.data_axes[e] = t.axes[e];
        }), "colors" in t && Object.keys(t.colors).forEach(function(e) {
            i.data_colors[e] = t.colors[e];
        }), "cacheIds" in t && e.hasCaches(t.cacheIds) ? e.load(e.getCaches(t.cacheIds), t.done) : "unload" in t ? e.unload(e.mapToTargetIds("boolean" == typeof t.unload && t.unload ? null : t.unload), function() {
            e.loadFromArgs(t);
        }) : e.loadFromArgs(t);
    }, C.unload = function(t) {
        var e = this.internal;
        (t = t || {}) instanceof Array ? t = {
            ids: t
        } : "string" == typeof t && (t = {
            ids: [ t ]
        }), e.unload(e.mapToTargetIds(t.ids), function() {
            e.redraw({
                withUpdateOrgXDomain: !0,
                withUpdateXDomain: !0,
                withLegend: !0
            }), t.done && t.done();
        });
    }, C.regions = function(t) {
        var e = this.internal, i = e.config;
        return t && (i.regions = t, e.redrawWithoutRescale()), i.regions;
    }, C.regions.add = function(t) {
        var e = this.internal, i = e.config;
        return t && (i.regions = i.regions.concat(t), e.redrawWithoutRescale()), i.regions;
    }, C.regions.remove = function(t) {
        var e, i, n, a = this.internal, r = a.config;
        return t = t || {}, e = a.getOption(t, "duration", r.transition_duration), i = a.getOption(t, "classes", [ o.region ]), 
        n = a.main.select("." + o.regions).selectAll(i.map(function(t) {
            return "." + t;
        })), (e ? n.transition().duration(e) : n).style("opacity", 0).remove(), r.regions = r.regions.filter(function(t) {
            var e = !1;
            return !t.class || (t.class.split(" ").forEach(function(t) {
                0 <= i.indexOf(t) && (e = !0);
            }), !e);
        }), r.regions;
    }, C.selected = function(t) {
        var e = this.internal, i = e.d3;
        return i.merge(e.main.selectAll("." + o.shapes + e.getTargetSelectorSuffix(t)).selectAll("." + o.shape).filter(function() {
            return i.select(this).classed(o.SELECTED);
        }).map(function(t) {
            return t.map(function(t) {
                var e = t.__data__;
                return e.data ? e.data : e;
            });
        }));
    }, C.select = function(t, e, i) {
        var n = this.internal, a = n.d3, r = n.config;
        r.data_selection_enabled && n.main.selectAll("." + o.shapes).selectAll("." + o.shape).each(function(s, c) {
            var d = a.select(this), l = s.data ? s.data.id : s.id, u = n.getToggle(this, s).bind(n), h = r.data_selection_grouped || !t || 0 <= t.indexOf(l), g = !e || 0 <= e.indexOf(c), f = d.classed(o.SELECTED);
            d.classed(o.line) || d.classed(o.area) || (h && g ? r.data_selection_isselectable(s) && !f && u(!0, d.classed(o.SELECTED, !0), s, c) : _(i) && i && f && u(!1, d.classed(o.SELECTED, !1), s, c));
        });
    }, C.unselect = function(t, e) {
        var i = this.internal, n = i.d3, a = i.config;
        a.data_selection_enabled && i.main.selectAll("." + o.shapes).selectAll("." + o.shape).each(function(r, s) {
            var c = n.select(this), d = r.data ? r.data.id : r.id, l = i.getToggle(this, r).bind(i), u = a.data_selection_grouped || !t || 0 <= t.indexOf(d), h = !e || 0 <= e.indexOf(s), g = c.classed(o.SELECTED);
            c.classed(o.line) || c.classed(o.area) || u && h && a.data_selection_isselectable(r) && g && l(!1, c.classed(o.SELECTED, !1), r, s);
        });
    }, C.show = function(t, e) {
        var i, n = this.internal;
        t = n.mapToTargetIds(t), e = e || {}, n.removeHiddenTargetIds(t), (i = n.svg.selectAll(n.selectorTargets(t))).transition().style("opacity", 1, "important").call(n.endall, function() {
            i.style("opacity", null).style("opacity", 1);
        }), e.withLegend && n.showLegend(t), n.redraw({
            withUpdateOrgXDomain: !0,
            withUpdateXDomain: !0,
            withLegend: !0
        });
    }, C.hide = function(t, e) {
        var i, n = this.internal;
        t = n.mapToTargetIds(t), e = e || {}, n.addHiddenTargetIds(t), (i = n.svg.selectAll(n.selectorTargets(t))).transition().style("opacity", 0, "important").call(n.endall, function() {
            i.style("opacity", null).style("opacity", 0);
        }), e.withLegend && n.hideLegend(t), n.redraw({
            withUpdateOrgXDomain: !0,
            withUpdateXDomain: !0,
            withLegend: !0
        });
    }, C.toggle = function(t, e) {
        var i = this, n = this.internal;
        n.mapToTargetIds(t).forEach(function(t) {
            n.isTargetToShow(t) ? i.hide(t, e) : i.show(t, e);
        });
    }, C.tooltip = function() {}, C.tooltip.show = function(t) {
        var e, i, n = this.internal;
        t.mouse && (i = t.mouse), t.data ? e = n.isMultipleX() ? (i = [ n.x(t.data.x), n.getYScale(t.data.id)(t.data.value) ], 
        null) : u(t.data.index) ? t.data.index : n.getIndexByX(t.data.x) : void 0 !== t.x ? e = n.getIndexByX(t.x) : void 0 !== t.index && (e = t.index), 
        n.dispatchEvent("mouseover", e, i), n.dispatchEvent("mousemove", e, i), n.config.tooltip_onshow.call(n, t.data);
    }, C.tooltip.hide = function() {
        this.internal.dispatchEvent("mouseout", 0), this.internal.config.tooltip_onhide.call(this);
    }, C.transform = function(t, e) {
        var i = this.internal, n = 0 <= [ "pie", "donut" ].indexOf(t) ? {
            withTransform: !0
        } : null;
        i.transformTo(e, t, n);
    }, L.transformTo = function(t, e, i) {
        var n = this, a = !n.hasArcType(), r = i || {
            withTransitionForAxis: a
        };
        r.withTransitionForTransform = !1, n.transiting = !1, n.setTargetType(t, e), n.updateTargets(n.data.targets), 
        n.updateAndRedraw(r);
    }, C.x = function(t) {
        var e = this.internal;
        return arguments.length && (e.updateTargetX(e.data.targets, t), e.redraw({
            withUpdateOrgXDomain: !0,
            withUpdateXDomain: !0
        })), e.data.xs;
    }, C.xs = function(t) {
        var e = this.internal;
        return arguments.length && (e.updateTargetXs(e.data.targets, t), e.redraw({
            withUpdateOrgXDomain: !0,
            withUpdateXDomain: !0
        })), e.data.xs;
    }, C.zoom = function(t) {
        var e = this.internal;
        return t && (e.isTimeSeries() && (t = t.map(function(t) {
            return e.parseDate(t);
        })), e.brush.extent(t), e.redraw({
            withUpdateXDomain: !0,
            withY: e.config.zoom_rescale
        }), e.config.zoom_onzoom.call(this, e.x.orgDomain())), e.brush.extent();
    }, C.zoom.enable = function(t) {
        var e = this.internal;
        e.config.zoom_enabled = t, e.updateAndRedraw();
    }, C.unzoom = function() {
        var t = this.internal;
        t.brush.clear().update(), t.redraw({
            withUpdateXDomain: !0
        });
    }, C.zoom.max = function(t) {
        var e = this.internal, i = e.config, n = e.d3;
        if (0 !== t && !t) return i.zoom_x_max;
        i.zoom_x_max = n.max([ e.orgXDomain[1], t ]);
    }, C.zoom.min = function(t) {
        var e = this.internal, i = e.config, n = e.d3;
        if (0 !== t && !t) return i.zoom_x_min;
        i.zoom_x_min = n.min([ e.orgXDomain[0], t ]);
    }, C.zoom.range = function(t) {
        if (!arguments.length) return {
            max: this.domain.max(),
            min: this.domain.min()
        };
        _(t.max) && this.domain.max(t.max), _(t.min) && this.domain.min(t.min);
    }, L.initPie = function() {
        var t = this, e = t.d3;
        t.pie = e.layout.pie().value(function(t) {
            return t.values.reduce(function(t, e) {
                return t + e.value;
            }, 0);
        }), t.pie.sort(t.getOrderFunction() || null);
    }, L.updateRadius = function() {
        var t = this, e = t.config, i = e.gauge_width || e.donut_width;
        t.radiusExpanded = Math.min(t.arcWidth, t.arcHeight) / 2, t.radius = .95 * t.radiusExpanded, 
        t.innerRadiusRatio = i ? (t.radius - i) / t.radius : .6, t.innerRadius = t.hasType("donut") || t.hasType("gauge") ? t.radius * t.innerRadiusRatio : 0;
    }, L.updateArc = function() {
        var t = this;
        t.svgArc = t.getSvgArc(), t.svgArcExpanded = t.getSvgArcExpanded(), t.svgArcExpandedSub = t.getSvgArcExpanded(.98);
    }, L.updateAngle = function(t) {
        var e, i, n, a, r = this, o = r.config, s = !1, c = 0;
        return o ? (r.pie(r.filterTargetsToShow(r.data.targets)).forEach(function(e) {
            s || e.data.id !== t.data.id || (s = !0, (t = e).index = c), c++;
        }), isNaN(t.startAngle) && (t.startAngle = 0), isNaN(t.endAngle) && (t.endAngle = t.startAngle), 
        r.isGaugeType(t.data) && (e = o.gauge_min, i = o.gauge_max, n = Math.PI * (o.gauge_fullCircle ? 2 : 1) / (i - e), 
        a = t.value < e ? 0 : t.value < i ? t.value - e : i - e, t.startAngle = o.gauge_startingAngle, 
        t.endAngle = t.startAngle + n * a), s ? t : null) : null;
    }, L.getSvgArc = function() {
        var t = this, e = t.d3.svg.arc().outerRadius(t.radius).innerRadius(t.innerRadius), i = function(i, n) {
            var a;
            return n ? e(i) : (a = t.updateAngle(i)) ? e(a) : "M 0 0";
        };
        return i.centroid = e.centroid, i;
    }, L.getSvgArcExpanded = function(t) {
        var e = this, i = e.d3.svg.arc().outerRadius(e.radiusExpanded * (t || 1)).innerRadius(e.innerRadius);
        return function(t) {
            var n = e.updateAngle(t);
            return n ? i(n) : "M 0 0";
        };
    }, L.getArc = function(t, e, i) {
        return i || this.isArcType(t.data) ? this.svgArc(t, e) : "M 0 0";
    }, L.transformForArcLabel = function(t) {
        var e, i, n, a, r, o = this, s = o.config, c = o.updateAngle(t), d = "";
        return c && !o.hasType("gauge") && (e = this.svgArc.centroid(c), i = isNaN(e[0]) ? 0 : e[0], 
        n = isNaN(e[1]) ? 0 : e[1], a = Math.sqrt(i * i + n * n), d = "translate(" + i * (r = o.hasType("donut") && s.donut_label_ratio ? h(s.donut_label_ratio) ? s.donut_label_ratio(t, o.radius, a) : s.donut_label_ratio : o.hasType("pie") && s.pie_label_ratio ? h(s.pie_label_ratio) ? s.pie_label_ratio(t, o.radius, a) : s.pie_label_ratio : o.radius && a ? (.375 < 36 / o.radius ? 1.175 - 36 / o.radius : .8) * o.radius / a : 0) + "," + n * r + ")"), 
        d;
    }, L.getArcRatio = function(t) {
        var i = this.config, n = Math.PI * (this.hasType("gauge") && !i.gauge_fullCircle ? 1 : 2);
        return t ? (t.endAngle - t.startAngle) / n : null;
    }, L.convertToArcData = function(t) {
        return this.addName({
            id: t.data.id,
            value: t.value,
            ratio: this.getArcRatio(t),
            index: t.index
        });
    }, L.textForArcLabel = function(t) {
        var e, i, n, a, r, o = this;
        return o.shouldShowArcLabel() ? (i = (e = o.updateAngle(t)) ? e.value : null, n = o.getArcRatio(e), 
        a = t.data.id, o.hasType("gauge") || o.meetsArcLabelThreshold(n) ? (r = o.getArcLabelFormat()) ? r(i, n, a) : o.defaultArcValueFormat(i, n) : "") : "";
    }, L.textForGaugeMinMax = function(t, e) {
        var i = this.getGaugeLabelExtents();
        return i ? i(t, e) : t;
    }, L.expandArc = function(t) {
        var e, i = this;
        i.transiting ? e = window.setInterval(function() {
            i.transiting || (window.clearInterval(e), 0 < i.legend.selectAll(".c3-legend-item-focused").size() && i.expandArc(t));
        }, 10) : (t = i.mapToTargetIds(t), i.svg.selectAll(i.selectorTargets(t, "." + o.chartArc)).each(function(t) {
            i.shouldExpand(t.data.id) && i.d3.select(this).selectAll("path").transition().duration(i.expandDuration(t.data.id)).attr("d", i.svgArcExpanded).transition().duration(2 * i.expandDuration(t.data.id)).attr("d", i.svgArcExpandedSub).each(function(t) {
                i.isDonutType(t.data);
            });
        }));
    }, L.unexpandArc = function(t) {
        var e = this;
        e.transiting || (t = e.mapToTargetIds(t), e.svg.selectAll(e.selectorTargets(t, "." + o.chartArc)).selectAll("path").transition().duration(function(t) {
            return e.expandDuration(t.data.id);
        }).attr("d", e.svgArc), e.svg.selectAll("." + o.arc));
    }, L.expandDuration = function(t) {
        var e = this, i = e.config;
        return e.isDonutType(t) ? i.donut_expand_duration : e.isGaugeType(t) ? i.gauge_expand_duration : e.isPieType(t) ? i.pie_expand_duration : 50;
    }, L.shouldExpand = function(t) {
        var e = this, i = e.config;
        return e.isDonutType(t) && i.donut_expand || e.isGaugeType(t) && i.gauge_expand || e.isPieType(t) && i.pie_expand;
    }, L.shouldShowArcLabel = function() {
        var t = this, e = t.config, i = !0;
        return t.hasType("donut") ? i = e.donut_label_show : t.hasType("pie") && (i = e.pie_label_show), 
        i;
    }, L.meetsArcLabelThreshold = function(t) {
        var i = this.config;
        return t >= (this.hasType("donut") ? i.donut_label_threshold : i.pie_label_threshold);
    }, L.getArcLabelFormat = function() {
        var t = this, e = t.config, i = e.pie_label_format;
        return t.hasType("gauge") ? i = e.gauge_label_format : t.hasType("donut") && (i = e.donut_label_format), 
        i;
    }, L.getGaugeLabelExtents = function() {
        return this.config.gauge_label_extents;
    }, L.getArcTitle = function() {
        return this.hasType("donut") ? this.config.donut_title : "";
    }, L.updateTargetsForArc = function(t) {
        var e, i = this, n = i.main, a = i.classChartArc.bind(i), r = i.classArcs.bind(i), s = i.classFocus.bind(i);
        (e = n.select("." + o.chartArcs).selectAll("." + o.chartArc).data(i.pie(t)).attr("class", function(t) {
            return a(t) + s(t.data);
        }).enter().append("g").attr("class", a)).append("g").attr("class", r), e.append("text").attr("dy", i.hasType("gauge") ? "-.1em" : ".35em").style("opacity", 0).style("text-anchor", "middle").style("pointer-events", "none");
    }, L.initArc = function() {
        var t = this;
        t.arcs = t.main.select("." + o.chart).append("g").attr("class", o.chartArcs).attr("transform", t.getTranslate("arc")), 
        t.arcs.append("text").attr("class", o.chartArcsTitle).style("text-anchor", "middle").text(t.getArcTitle());
    }, L.redrawArc = function(t, e, i) {
        var n, a = this, r = a.d3, s = a.config, c = a.main;
        (n = c.selectAll("." + o.arcs).selectAll("." + o.arc).data(a.arcData.bind(a))).enter().append("path").attr("class", a.classArc.bind(a)).style("fill", function(t) {
            return a.color(t.data);
        }).style("cursor", function(t) {
            return s.interaction_enabled && s.data_selection_isselectable(t) ? "pointer" : null;
        }).each(function(t) {
            a.isGaugeType(t.data) && (t.startAngle = t.endAngle = s.gauge_startingAngle), this._current = t;
        }), n.attr("transform", function(t) {
            return !a.isGaugeType(t.data) && i ? "scale(0)" : "";
        }).on("mouseover", s.interaction_enabled ? function(t) {
            var e, i;
            a.transiting || (e = a.updateAngle(t)) && (i = a.convertToArcData(e), a.expandArc(e.data.id), 
            a.api.focus(e.data.id), a.toggleFocusLegend(e.data.id, !0), a.config.data_onmouseover(i, this));
        } : null).on("mousemove", s.interaction_enabled ? function(t) {
            var e, i = a.updateAngle(t);
            i && (e = [ a.convertToArcData(i) ], a.showTooltip(e, this));
        } : null).on("mouseout", s.interaction_enabled ? function(t) {
            var e, i;
            a.transiting || (e = a.updateAngle(t)) && (i = a.convertToArcData(e), a.unexpandArc(e.data.id), 
            a.api.revert(), a.revertLegend(), a.hideTooltip(), a.config.data_onmouseout(i, this));
        } : null).on("click", s.interaction_enabled ? function(t, e) {
            var i, n = a.updateAngle(t);
            n && (i = a.convertToArcData(n), a.toggleShape && a.toggleShape(this, i, e), a.config.data_onclick.call(a.api, i, this));
        } : null).each(function() {
            a.transiting = !0;
        }).transition().duration(t).attrTween("d", function(t) {
            var e, i = a.updateAngle(t);
            return i ? (isNaN(this._current.startAngle) && (this._current.startAngle = 0), isNaN(this._current.endAngle) && (this._current.endAngle = this._current.startAngle), 
            e = r.interpolate(this._current, i), this._current = e(0), function(i) {
                var n = e(i);
                return n.data = t.data, a.getArc(n, !0);
            }) : function() {
                return "M 0 0";
            };
        }).attr("transform", i ? "scale(1)" : "").style("fill", function(t) {
            return a.levelColor ? a.levelColor(t.data.values[0].value) : a.color(t.data.id);
        }).call(a.endall, function() {
            a.transiting = !1;
        }), n.exit().transition().duration(e).style("opacity", 0).remove(), c.selectAll("." + o.chartArc).select("text").style("opacity", 0).attr("class", function(t) {
            return a.isGaugeType(t.data) ? o.gaugeValue : "";
        }).text(a.textForArcLabel.bind(a)).attr("transform", a.transformForArcLabel.bind(a)).style("font-size", function(t) {
            return a.isGaugeType(t.data) ? Math.round(a.radius / 5) + "px" : "";
        }).transition().duration(t).style("opacity", function(t) {
            return a.isTargetToShow(t.data.id) && a.isArcType(t.data) ? 1 : 0;
        }), c.select("." + o.chartArcsTitle).style("opacity", a.hasType("donut") || a.hasType("gauge") ? 1 : 0), 
        a.hasType("gauge") && (a.arcs.select("." + o.chartArcsBackground).attr("d", function() {
            var t = {
                data: [ {
                    value: s.gauge_max
                } ],
                startAngle: s.gauge_startingAngle,
                endAngle: -1 * s.gauge_startingAngle
            };
            return a.getArc(t, !0, !0);
        }), a.arcs.select("." + o.chartArcsGaugeUnit).attr("dy", ".75em").text(s.gauge_label_show ? s.gauge_units : ""), 
        a.arcs.select("." + o.chartArcsGaugeMin).attr("dx", -1 * (a.innerRadius + (a.radius - a.innerRadius) / (s.gauge_fullCircle ? 1 : 2)) + "px").attr("dy", "1.2em").text(s.gauge_label_show ? a.textForGaugeMinMax(s.gauge_min, !1) : ""), 
        a.arcs.select("." + o.chartArcsGaugeMax).attr("dx", a.innerRadius + (a.radius - a.innerRadius) / (s.gauge_fullCircle ? 1 : 2) + "px").attr("dy", "1.2em").text(s.gauge_label_show ? a.textForGaugeMinMax(s.gauge_max, !0) : ""));
    }, L.initGauge = function() {
        var t = this.arcs;
        this.hasType("gauge") && (t.append("path").attr("class", o.chartArcsBackground), 
        t.append("text").attr("class", o.chartArcsGaugeUnit).style("text-anchor", "middle").style("pointer-events", "none"), 
        t.append("text").attr("class", o.chartArcsGaugeMin).style("text-anchor", "middle").style("pointer-events", "none"), 
        t.append("text").attr("class", o.chartArcsGaugeMax).style("text-anchor", "middle").style("pointer-events", "none"));
    }, L.getGaugeLabelHeight = function() {
        return this.config.gauge_label_show ? 20 : 0;
    }, L.hasCaches = function(t) {
        for (var e = 0; e < t.length; e++) if (!(t[e] in this.cache)) return !1;
        return !0;
    }, L.addCache = function(t, e) {
        this.cache[t] = this.cloneTarget(e);
    }, L.getCaches = function(t) {
        var e, i = [];
        for (e = 0; e < t.length; e++) t[e] in this.cache && i.push(this.cloneTarget(this.cache[t[e]]));
        return i;
    }, L.categoryName = function(t) {
        var e = this.config;
        return t < e.axis_x_categories.length ? e.axis_x_categories[t] : t;
    }, L.generateClass = function(t, e) {
        return " " + t + " " + t + this.getTargetSelectorSuffix(e);
    }, L.classText = function(t) {
        return this.generateClass(o.text, t.index);
    }, L.classTexts = function(t) {
        return this.generateClass(o.texts, t.id);
    }, L.classShape = function(t) {
        return this.generateClass(o.shape, t.index);
    }, L.classShapes = function(t) {
        return this.generateClass(o.shapes, t.id);
    }, L.classLine = function(t) {
        return this.classShape(t) + this.generateClass(o.line, t.id);
    }, L.classLines = function(t) {
        return this.classShapes(t) + this.generateClass(o.lines, t.id);
    }, L.classCircle = function(t) {
        return this.classShape(t) + this.generateClass(o.circle, t.index);
    }, L.classCircles = function(t) {
        return this.classShapes(t) + this.generateClass(o.circles, t.id);
    }, L.classBar = function(t) {
        return this.classShape(t) + this.generateClass(o.bar, t.index);
    }, L.classBars = function(t) {
        return this.classShapes(t) + this.generateClass(o.bars, t.id);
    }, L.classArc = function(t) {
        return this.classShape(t.data) + this.generateClass(o.arc, t.data.id);
    }, L.classArcs = function(t) {
        return this.classShapes(t.data) + this.generateClass(o.arcs, t.data.id);
    }, L.classArea = function(t) {
        return this.classShape(t) + this.generateClass(o.area, t.id);
    }, L.classAreas = function(t) {
        return this.classShapes(t) + this.generateClass(o.areas, t.id);
    }, L.classRegion = function(t, e) {
        return this.generateClass(o.region, e) + " " + ("class" in t ? t.class : "");
    }, L.classEvent = function(t) {
        return this.generateClass(o.eventRect, t.index);
    }, L.classTarget = function(t) {
        var i = this.config.data_classes[t], n = "";
        return i && (n = " " + o.target + "-" + i), this.generateClass(o.target, t) + n;
    }, L.classFocus = function(t) {
        return this.classFocused(t) + this.classDefocused(t);
    }, L.classFocused = function(t) {
        return " " + (0 <= this.focusedTargetIds.indexOf(t.id) ? o.focused : "");
    }, L.classDefocused = function(t) {
        return " " + (0 <= this.defocusedTargetIds.indexOf(t.id) ? o.defocused : "");
    }, L.classChartText = function(t) {
        return o.chartText + this.classTarget(t.id);
    }, L.classChartLine = function(t) {
        return o.chartLine + this.classTarget(t.id);
    }, L.classChartBar = function(t) {
        return o.chartBar + this.classTarget(t.id);
    }, L.classChartArc = function(t) {
        return o.chartArc + this.classTarget(t.data.id);
    }, L.getTargetSelectorSuffix = function(t) {
        return t || 0 === t ? ("-" + t).replace(/[\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\]/g, "-") : "";
    }, L.selectorTarget = function(t, e) {
        return (e || "") + "." + o.target + this.getTargetSelectorSuffix(t);
    }, L.selectorTargets = function(t, e) {
        var i = this;
        return (t = t || []).length ? t.map(function(t) {
            return i.selectorTarget(t, e);
        }) : null;
    }, L.selectorLegend = function(t) {
        return "." + o.legendItem + this.getTargetSelectorSuffix(t);
    }, L.selectorLegends = function(t) {
        var e = this;
        return t && t.length ? t.map(function(t) {
            return e.selectorLegend(t);
        }) : null;
    }, L.getClipPath = function(t) {
        return "url(" + (0 <= window.navigator.appVersion.toLowerCase().indexOf("msie 9.") ? "" : document.URL.split("#")[0]) + "#" + t + ")";
    }, L.appendClip = function(t, e) {
        return t.append("clipPath").attr("id", e).append("rect");
    }, L.getAxisClipX = function(t) {
        var e = Math.max(30, this.margin.left);
        return t ? -(1 + e) : -(e - 1);
    }, L.getAxisClipY = function(t) {
        return t ? -20 : -this.margin.top;
    }, L.getXAxisClipX = function() {
        return this.getAxisClipX(!this.config.axis_rotated);
    }, L.getXAxisClipY = function() {
        return this.getAxisClipY(!this.config.axis_rotated);
    }, L.getYAxisClipX = function() {
        var t = this;
        return t.config.axis_y_inner ? -1 : t.getAxisClipX(t.config.axis_rotated);
    }, L.getYAxisClipY = function() {
        return this.getAxisClipY(this.config.axis_rotated);
    }, L.getAxisClipWidth = function(t) {
        var e = this, i = Math.max(30, e.margin.left), n = Math.max(30, e.margin.right);
        return t ? e.width + 2 + i + n : e.margin.left + 20;
    }, L.getAxisClipHeight = function(t) {
        return (t ? this.margin.bottom : this.margin.top + this.height) + 20;
    }, L.getXAxisClipWidth = function() {
        return this.getAxisClipWidth(!this.config.axis_rotated);
    }, L.getXAxisClipHeight = function() {
        return this.getAxisClipHeight(!this.config.axis_rotated);
    }, L.getYAxisClipWidth = function() {
        var t = this;
        return t.getAxisClipWidth(t.config.axis_rotated) + (t.config.axis_y_inner ? 20 : 0);
    }, L.getYAxisClipHeight = function() {
        return this.getAxisClipHeight(this.config.axis_rotated);
    }, L.generateColor = function() {
        var e = this.config, i = this.d3, n = e.data_colors, a = w(e.color_pattern) ? e.color_pattern : i.scale.category10().range(), r = e.data_color, o = [];
        return function(t) {
            var e, i = t.id || t.data && t.data.id || t;
            return n[i] instanceof Function ? e = n[i](t) : n[i] ? e = n[i] : (o.indexOf(i) < 0 && o.push(i), 
            e = a[o.indexOf(i) % a.length], n[i] = e), r instanceof Function ? r(e, t) : e;
        };
    }, L.generateLevelColor = function() {
        var t = this.config, e = t.color_pattern, i = t.color_threshold, n = "value" === i.unit, a = i.values && i.values.length ? i.values : [], r = i.max || 100;
        return w(t.color_threshold) ? function(t) {
            var i, o = e[e.length - 1];
            for (i = 0; i < a.length; i++) if ((n ? t : 100 * t / r) < a[i]) {
                o = e[i];
                break;
            }
            return o;
        } : null;
    }, L.getDefaultConfig = function() {
        var t = {
            bindto: "#chart",
            svg_classname: void 0,
            size_width: void 0,
            size_height: void 0,
            padding_left: void 0,
            padding_right: void 0,
            padding_top: void 0,
            padding_bottom: void 0,
            resize_auto: !0,
            zoom_enabled: !1,
            zoom_extent: void 0,
            zoom_privileged: !1,
            zoom_rescale: !1,
            zoom_onzoom: function() {},
            zoom_onzoomstart: function() {},
            zoom_onzoomend: function() {},
            zoom_x_min: void 0,
            zoom_x_max: void 0,
            interaction_brighten: !0,
            interaction_enabled: !0,
            onmouseover: function() {},
            onmouseout: function() {},
            onresize: function() {},
            onresized: function() {},
            oninit: function() {},
            onrendered: function() {},
            transition_duration: 350,
            data_x: void 0,
            data_xs: {},
            data_xFormat: "%Y-%m-%d",
            data_xLocaltime: !0,
            data_xSort: !0,
            data_idConverter: function(t) {
                return t;
            },
            data_names: {},
            data_classes: {},
            data_groups: [],
            data_axes: {},
            data_type: void 0,
            data_types: {},
            data_labels: {},
            data_order: "desc",
            data_regions: {},
            data_color: void 0,
            data_colors: {},
            data_hide: !1,
            data_filter: void 0,
            data_selection_enabled: !1,
            data_selection_grouped: !1,
            data_selection_isselectable: function() {
                return !0;
            },
            data_selection_multiple: !0,
            data_selection_draggable: !1,
            data_onclick: function() {},
            data_onmouseover: function() {},
            data_onmouseout: function() {},
            data_onselected: function() {},
            data_onunselected: function() {},
            data_url: void 0,
            data_headers: void 0,
            data_json: void 0,
            data_rows: void 0,
            data_columns: void 0,
            data_mimeType: void 0,
            data_keys: void 0,
            data_empty_label_text: "",
            subchart_show: !1,
            subchart_size_height: 60,
            subchart_axis_x_show: !0,
            subchart_onbrush: function() {},
            color_pattern: [],
            color_threshold: {},
            legend_show: !0,
            legend_hide: !1,
            legend_position: "bottom",
            legend_inset_anchor: "top-left",
            legend_inset_x: 10,
            legend_inset_y: 0,
            legend_inset_step: void 0,
            legend_item_onclick: void 0,
            legend_item_onmouseover: void 0,
            legend_item_onmouseout: void 0,
            legend_equally: !1,
            legend_padding: 0,
            legend_item_tile_width: 10,
            legend_item_tile_height: 10,
            axis_rotated: !1,
            axis_x_show: !0,
            axis_x_type: "indexed",
            axis_x_localtime: !0,
            axis_x_categories: [],
            axis_x_tick_centered: !1,
            axis_x_tick_format: void 0,
            axis_x_tick_culling: {},
            axis_x_tick_culling_max: 10,
            axis_x_tick_count: void 0,
            axis_x_tick_fit: !0,
            axis_x_tick_values: null,
            axis_x_tick_rotate: 0,
            axis_x_tick_outer: !0,
            axis_x_tick_multiline: !0,
            axis_x_tick_width: null,
            axis_x_max: void 0,
            axis_x_min: void 0,
            axis_x_padding: {},
            axis_x_height: void 0,
            axis_x_extent: void 0,
            axis_x_label: {},
            axis_y_show: !0,
            axis_y_type: void 0,
            axis_y_max: void 0,
            axis_y_min: void 0,
            axis_y_inverted: !1,
            axis_y_center: void 0,
            axis_y_inner: void 0,
            axis_y_label: {},
            axis_y_tick_format: void 0,
            axis_y_tick_outer: !0,
            axis_y_tick_values: null,
            axis_y_tick_rotate: 0,
            axis_y_tick_count: void 0,
            axis_y_tick_time_value: void 0,
            axis_y_tick_time_interval: void 0,
            axis_y_padding: {},
            axis_y_default: void 0,
            axis_y2_show: !1,
            axis_y2_max: void 0,
            axis_y2_min: void 0,
            axis_y2_inverted: !1,
            axis_y2_center: void 0,
            axis_y2_inner: void 0,
            axis_y2_label: {},
            axis_y2_tick_format: void 0,
            axis_y2_tick_outer: !0,
            axis_y2_tick_values: null,
            axis_y2_tick_count: void 0,
            axis_y2_padding: {},
            axis_y2_default: void 0,
            grid_x_show: !1,
            grid_x_type: "tick",
            grid_x_lines: [],
            grid_y_show: !1,
            grid_y_lines: [],
            grid_y_ticks: 10,
            grid_focus_show: !0,
            grid_lines_front: !0,
            point_show: !0,
            point_r: 2.5,
            point_sensitivity: 10,
            point_focus_expand_enabled: !0,
            point_focus_expand_r: void 0,
            point_select_r: void 0,
            line_connectNull: !1,
            line_step_type: "step",
            bar_width: void 0,
            bar_width_ratio: .6,
            bar_width_max: void 0,
            bar_zerobased: !0,
            bar_space: 0,
            area_zerobased: !0,
            area_above: !1,
            pie_label_show: !0,
            pie_label_format: void 0,
            pie_label_threshold: .05,
            pie_label_ratio: void 0,
            pie_expand: {},
            pie_expand_duration: 50,
            gauge_fullCircle: !1,
            gauge_label_show: !0,
            gauge_label_format: void 0,
            gauge_min: 0,
            gauge_max: 100,
            gauge_startingAngle: -1 * Math.PI / 2,
            gauge_label_extents: void 0,
            gauge_units: void 0,
            gauge_width: void 0,
            gauge_expand: {},
            gauge_expand_duration: 50,
            donut_label_show: !0,
            donut_label_format: void 0,
            donut_label_threshold: .05,
            donut_label_ratio: void 0,
            donut_width: void 0,
            donut_title: "",
            donut_expand: {},
            donut_expand_duration: 50,
            spline_interpolation_type: "cardinal",
            regions: [],
            tooltip_show: !0,
            tooltip_grouped: !0,
            tooltip_order: void 0,
            tooltip_format_title: void 0,
            tooltip_format_name: void 0,
            tooltip_format_value: void 0,
            tooltip_position: void 0,
            tooltip_contents: function(t, e, i, n) {
                return this.getTooltipContent ? this.getTooltipContent(t, e, i, n) : "";
            },
            tooltip_init_show: !1,
            tooltip_init_x: 0,
            tooltip_init_position: {
                top: "0px",
                left: "50px"
            },
            tooltip_onshow: function() {},
            tooltip_onhide: function() {},
            title_text: void 0,
            title_padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            title_position: "top-center"
        };
        return Object.keys(this.additionalConfig).forEach(function(e) {
            t[e] = this.additionalConfig[e];
        }, this), t;
    }, L.additionalConfig = {}, L.loadConfig = function(t) {
        var i, n, a, r = this.config;
        Object.keys(r).forEach(function(o) {
            i = t, n = o.split("_"), a = function e() {
                var t = n.shift();
                return t && i && "object" === (void 0 === i ? "undefined" : s(i)) && t in i ? (i = i[t], 
                e()) : t ? void 0 : i;
            }(), _(a) && (r[o] = a);
        });
    }, L.convertUrlToData = function(t, e, i, n, a) {
        var r = this, o = e || "csv", s = r.d3.xhr(t);
        i && Object.keys(i).forEach(function(t) {
            s.header(t, i[t]);
        }), s.get(function(t, e) {
            var i, s = e.response || e.responseText;
            if (!e) throw new Error(t.responseURL + " " + t.status + " (" + t.statusText + ")");
            i = "json" === o ? r.convertJsonToData(JSON.parse(s), n) : "tsv" === o ? r.convertTsvToData(s) : r.convertCsvToData(s), 
            a.call(r, i);
        });
    }, L.convertXsvToData = function(t, e) {
        var i, n = e.parseRows(t);
        return 1 === n.length ? (i = [ {} ], n[0].forEach(function(t) {
            i[0][t] = null;
        })) : i = e.parse(t), i;
    }, L.convertCsvToData = function(t) {
        return this.convertXsvToData(t, this.d3.csv);
    }, L.convertTsvToData = function(t) {
        return this.convertXsvToData(t, this.d3.tsv);
    }, L.convertJsonToData = function(t, e) {
        var i, a = this, r = [];
        return e ? (e.x ? (i = e.value.concat(e.x), a.config.data_x = e.x) : i = e.value, 
        r.push(i), t.forEach(function(t) {
            var e = [];
            i.forEach(function(i) {
                var n = a.findValueInJson(t, i);
                p(n) && (n = null), e.push(n);
            }), r.push(e);
        }), a.convertRowsToData(r)) : (Object.keys(t).forEach(function(e) {
            r.push([ e ].concat(t[e]));
        }), a.convertColumnsToData(r));
    }, L.findValueInJson = function(t, e) {
        for (var i = (e = (e = e.replace(/\[(\w+)\]/g, ".$1")).replace(/^\./, "")).split("."), n = 0; n < i.length; ++n) {
            var a = i[n];
            if (!(a in t)) return;
            t = t[a];
        }
        return t;
    }, L.convertRowsToData = function(t) {
        for (var e = [], i = t[0], n = 1; n < t.length; n++) {
            for (var a = {}, r = 0; r < t[n].length; r++) {
                if (p(t[n][r])) throw new Error("Source data is missing a component at (" + n + "," + r + ")!");
                a[i[r]] = t[n][r];
            }
            e.push(a);
        }
        return e;
    }, L.convertColumnsToData = function(t) {
        for (var e = [], i = 0; i < t.length; i++) for (var n = t[i][0], a = 1; a < t[i].length; a++) {
            if (p(e[a - 1]) && (e[a - 1] = {}), p(t[i][a])) throw new Error("Source data is missing a component at (" + i + "," + a + ")!");
            e[a - 1][n] = t[i][a];
        }
        return e;
    }, L.convertDataToTargets = function(t, e) {
        var i, n = this, a = n.config, r = n.d3.keys(t[0]).filter(n.isNotX, n), o = n.d3.keys(t[0]).filter(n.isX, n);
        return r.forEach(function(i) {
            var r = n.getXKey(i);
            n.isCustomX() || n.isTimeSeries() ? 0 <= o.indexOf(r) ? n.data.xs[i] = (e && n.data.xs[i] ? n.data.xs[i] : []).concat(t.map(function(t) {
                return t[r];
            }).filter(u).map(function(t, e) {
                return n.generateTargetX(t, i, e);
            })) : a.data_x ? n.data.xs[i] = n.getOtherTargetXs() : w(a.data_xs) && (n.data.xs[i] = n.getXValuesOfXKey(r, n.data.targets)) : n.data.xs[i] = t.map(function(t, e) {
                return e;
            });
        }), r.forEach(function(t) {
            if (!n.data.xs[t]) throw new Error('x is not defined for id = "' + t + '".');
        }), (i = r.map(function(e, i) {
            var r = a.data_idConverter(e);
            return {
                id: r,
                id_org: e,
                values: t.map(function(t, o) {
                    var s, c = t[n.getXKey(e)], d = null === t[e] || isNaN(t[e]) ? null : +t[e];
                    return n.isCustomX() && n.isCategorized() && !p(c) ? (0 === i && 0 === o && (a.axis_x_categories = []), 
                    -1 === (s = a.axis_x_categories.indexOf(c)) && (s = a.axis_x_categories.length, 
                    a.axis_x_categories.push(c))) : s = n.generateTargetX(c, e, o), (p(t[e]) || n.data.xs[e].length <= o) && (s = void 0), 
                    {
                        x: s,
                        value: d,
                        id: r
                    };
                }).filter(function(t) {
                    return _(t.x);
                })
            };
        })).forEach(function(t) {
            var e;
            a.data_xSort && (t.values = t.values.sort(function(t, e) {
                return (t.x || 0 === t.x ? t.x : 1 / 0) - (e.x || 0 === e.x ? e.x : 1 / 0);
            })), e = 0, t.values.forEach(function(t) {
                t.index = e++;
            }), n.data.xs[t.id].sort(function(t, e) {
                return t - e;
            });
        }), n.hasNegativeValue = n.hasNegativeValueInTargets(i), n.hasPositiveValue = n.hasPositiveValueInTargets(i), 
        a.data_type && n.setTargetType(n.mapToIds(i).filter(function(t) {
            return !(t in a.data_types);
        }), a.data_type), i.forEach(function(t) {
            n.addCache(t.id_org, t);
        }), i;
    }, L.isX = function(t) {
        var e = this.config;
        return e.data_x && t === e.data_x || w(e.data_xs) && b(e.data_xs, t);
    }, L.isNotX = function(t) {
        return !this.isX(t);
    }, L.getXKey = function(t) {
        var e = this.config;
        return e.data_x ? e.data_x : w(e.data_xs) ? e.data_xs[t] : null;
    }, L.getXValuesOfXKey = function(t, e) {
        var i, n = this;
        return (e && w(e) ? n.mapToIds(e) : []).forEach(function(e) {
            n.getXKey(e) === t && (i = n.data.xs[e]);
        }), i;
    }, L.getIndexByX = function(t) {
        var i = this.filterByX(this.data.targets, t);
        return i.length ? i[0].index : null;
    }, L.getXValue = function(t, e) {
        var i = this;
        return t in i.data.xs && i.data.xs[t] && u(i.data.xs[t][e]) ? i.data.xs[t][e] : e;
    }, L.getOtherTargetXs = function() {
        var e = Object.keys(this.data.xs);
        return e.length ? this.data.xs[e[0]] : null;
    }, L.getOtherTargetX = function(t) {
        var e = this.getOtherTargetXs();
        return e && t < e.length ? e[t] : null;
    }, L.addXs = function(t) {
        var e = this;
        Object.keys(t).forEach(function(i) {
            e.config.data_xs[i] = t[i];
        });
    }, L.hasMultipleX = function(t) {
        return 1 < this.d3.set(Object.keys(t).map(function(e) {
            return t[e];
        })).size();
    }, L.isMultipleX = function() {
        return w(this.config.data_xs) || !this.config.data_xSort || this.hasType("scatter");
    }, L.addName = function(t) {
        var e;
        return t && (e = this.config.data_names[t.id], t.name = void 0 !== e ? e : t.id), 
        t;
    }, L.getValueOnIndex = function(t, e) {
        var i = t.filter(function(t) {
            return t.index === e;
        });
        return i.length ? i[0] : null;
    }, L.updateTargetX = function(t, e) {
        var i = this;
        t.forEach(function(t) {
            t.values.forEach(function(n, a) {
                n.x = i.generateTargetX(e[a], t.id, a);
            }), i.data.xs[t.id] = e;
        });
    }, L.updateTargetXs = function(t, e) {
        var i = this;
        t.forEach(function(t) {
            e[t.id] && i.updateTargetX([ t ], e[t.id]);
        });
    }, L.generateTargetX = function(t, e, i) {
        var n = this;
        return n.isTimeSeries() ? t ? n.parseDate(t) : n.parseDate(n.getXValue(e, i)) : n.isCustomX() && !n.isCategorized() ? u(t) ? +t : n.getXValue(e, i) : i;
    }, L.cloneTarget = function(t) {
        return {
            id: t.id,
            id_org: t.id_org,
            values: t.values.map(function(t) {
                return {
                    x: t.x,
                    value: t.value,
                    id: t.id
                };
            })
        };
    }, L.updateXs = function() {
        var t = this;
        t.data.targets.length && (t.xs = [], t.data.targets[0].values.forEach(function(e) {
            t.xs[e.index] = e.x;
        }));
    }, L.getPrevX = function(t) {
        var e = this.xs[t - 1];
        return void 0 !== e ? e : null;
    }, L.getNextX = function(t) {
        var e = this.xs[t + 1];
        return void 0 !== e ? e : null;
    }, L.getMaxDataCount = function() {
        return this.d3.max(this.data.targets, function(t) {
            return t.values.length;
        });
    }, L.getMaxDataCountTarget = function(t) {
        var e, i = t.length, n = 0;
        return 1 < i ? t.forEach(function(t) {
            t.values.length > n && (n = (e = t).values.length);
        }) : e = i ? t[0] : null, e;
    }, L.getEdgeX = function(t) {
        return t.length ? [ this.d3.min(t, function(t) {
            return t.values[0].x;
        }), this.d3.max(t, function(t) {
            return t.values[t.values.length - 1].x;
        }) ] : [ 0, 0 ];
    }, L.mapToIds = function(t) {
        return t.map(function(t) {
            return t.id;
        });
    }, L.mapToTargetIds = function(t) {
        return t ? [].concat(t) : this.mapToIds(this.data.targets);
    }, L.hasTarget = function(t, e) {
        var i, n = this.mapToIds(t);
        for (i = 0; i < n.length; i++) if (n[i] === e) return !0;
        return !1;
    }, L.isTargetToShow = function(t) {
        return this.hiddenTargetIds.indexOf(t) < 0;
    }, L.isLegendToShow = function(t) {
        return this.hiddenLegendIds.indexOf(t) < 0;
    }, L.filterTargetsToShow = function(t) {
        var e = this;
        return t.filter(function(t) {
            return e.isTargetToShow(t.id);
        });
    }, L.mapTargetsToUniqueXs = function(t) {
        var e = this, i = e.d3.set(e.d3.merge(t.map(function(t) {
            return t.values.map(function(t) {
                return +t.x;
            });
        }))).values();
        return (i = e.isTimeSeries() ? i.map(function(t) {
            return new Date(+t);
        }) : i.map(function(t) {
            return +t;
        })).sort(function(t, e) {
            return t < e ? -1 : e < t ? 1 : e <= t ? 0 : NaN;
        });
    }, L.addHiddenTargetIds = function(t) {
        t = t instanceof Array ? t : new Array(t);
        for (var e = 0; e < t.length; e++) this.hiddenTargetIds.indexOf(t[e]) < 0 && (this.hiddenTargetIds = this.hiddenTargetIds.concat(t[e]));
    }, L.removeHiddenTargetIds = function(t) {
        this.hiddenTargetIds = this.hiddenTargetIds.filter(function(e) {
            return t.indexOf(e) < 0;
        });
    }, L.addHiddenLegendIds = function(t) {
        t = t instanceof Array ? t : new Array(t);
        for (var e = 0; e < t.length; e++) this.hiddenLegendIds.indexOf(t[e]) < 0 && (this.hiddenLegendIds = this.hiddenLegendIds.concat(t[e]));
    }, L.removeHiddenLegendIds = function(t) {
        this.hiddenLegendIds = this.hiddenLegendIds.filter(function(e) {
            return t.indexOf(e) < 0;
        });
    }, L.getValuesAsIdKeyed = function(t) {
        var e = {};
        return t.forEach(function(t) {
            e[t.id] = [], t.values.forEach(function(i) {
                e[t.id].push(i.value);
            });
        }), e;
    }, L.checkValueInTargets = function(t, e) {
        var i, n, a, r = Object.keys(t);
        for (i = 0; i < r.length; i++) for (a = t[r[i]].values, n = 0; n < a.length; n++) if (e(a[n].value)) return !0;
        return !1;
    }, L.hasNegativeValueInTargets = function(t) {
        return this.checkValueInTargets(t, function(t) {
            return t < 0;
        });
    }, L.hasPositiveValueInTargets = function(t) {
        return this.checkValueInTargets(t, function(t) {
            return 0 < t;
        });
    }, L.isOrderDesc = function() {
        var t = this.config;
        return "string" == typeof t.data_order && "desc" === t.data_order.toLowerCase();
    }, L.isOrderAsc = function() {
        var t = this.config;
        return "string" == typeof t.data_order && "asc" === t.data_order.toLowerCase();
    }, L.getOrderFunction = function() {
        var t = this, e = t.config, i = t.isOrderAsc(), n = t.isOrderDesc();
        if (i || n) return function(t, e) {
            var i = function(t, e) {
                return t + Math.abs(e.value);
            }, a = t.values.reduce(i, 0), r = e.values.reduce(i, 0);
            return n ? r - a : a - r;
        };
        if (h(e.data_order)) return e.data_order;
        if (g(e.data_order)) {
            var a = e.data_order;
            return function(t, e) {
                return a.indexOf(t.id) - a.indexOf(e.id);
            };
        }
    }, L.orderTargets = function(t) {
        var e = this.getOrderFunction();
        return e && (t.sort(e), (this.isOrderAsc() || this.isOrderDesc()) && t.reverse()), 
        t;
    }, L.filterByX = function(t, e) {
        return this.d3.merge(t.map(function(t) {
            return t.values;
        })).filter(function(t) {
            return t.x - e == 0;
        });
    }, L.filterRemoveNull = function(t) {
        return t.filter(function(t) {
            return u(t.value);
        });
    }, L.filterByXDomain = function(t, e) {
        return t.map(function(t) {
            return {
                id: t.id,
                id_org: t.id_org,
                values: t.values.filter(function(t) {
                    return e[0] <= t.x && t.x <= e[1];
                })
            };
        });
    }, L.hasDataLabel = function() {
        var t = this.config;
        return !("boolean" != typeof t.data_labels || !t.data_labels) || !("object" !== s(t.data_labels) || !w(t.data_labels));
    }, L.getDataLabelLength = function(t, e, i) {
        var n = this, a = [ 0, 0 ];
        return n.selectChart.select("svg").selectAll(".dummy").data([ t, e ]).enter().append("text").text(function(t) {
            return n.dataLabelFormat(t.id)(t);
        }).each(function(t, e) {
            a[e] = 1.3 * this.getBoundingClientRect()[i];
        }).remove(), a;
    }, L.isNoneArc = function(t) {
        return this.hasTarget(this.data.targets, t.id);
    }, L.isArc = function(t) {
        return "data" in t && this.hasTarget(this.data.targets, t.data.id);
    }, L.findSameXOfValues = function(t, e) {
        var i, n = t[e].x, a = [];
        for (i = e - 1; 0 <= i && n === t[i].x; i--) a.push(t[i]);
        for (i = e; i < t.length && n === t[i].x; i++) a.push(t[i]);
        return a;
    }, L.findClosestFromTargets = function(t, e) {
        var i, n = this;
        return i = t.map(function(t) {
            return n.findClosest(t.values, e);
        }), n.findClosest(i, e);
    }, L.findClosest = function(t, e) {
        var i, n = this, a = n.config.point_sensitivity;
        return t.filter(function(t) {
            return t && n.isBarType(t.id);
        }).forEach(function(t) {
            var e = n.main.select("." + o.bars + n.getTargetSelectorSuffix(t.id) + " ." + o.bar + "-" + t.index).node();
            !i && n.isWithinBar(e) && (i = t);
        }), t.filter(function(t) {
            return t && !n.isBarType(t.id);
        }).forEach(function(t) {
            var r = n.dist(t, e);
            r < a && (a = r, i = t);
        }), i;
    }, L.dist = function(t, e) {
        var i = this, n = i.config, a = n.axis_rotated ? 1 : 0, r = n.axis_rotated ? 0 : 1, o = i.circleY(t, t.index), s = i.x(t.x);
        return Math.sqrt(Math.pow(s - e[a], 2) + Math.pow(o - e[r], 2));
    }, L.convertValuesToStep = function(t) {
        var e, i = [].concat(t);
        if (!this.isCategorized()) return t;
        for (e = t.length + 1; 0 < e; e--) i[e] = i[e - 1];
        return i[0] = {
            x: i[0].x - 1,
            value: i[0].value,
            id: i[0].id
        }, i[t.length + 1] = {
            x: i[t.length].x + 1,
            value: i[t.length].value,
            id: i[t.length].id
        }, i;
    }, L.updateDataAttributes = function(t, e) {
        var n = this.config["data_" + t];
        return void 0 === e || (Object.keys(e).forEach(function(t) {
            n[t] = e[t];
        }), this.redraw({
            withLegend: !0
        })), n;
    }, L.load = function(t, e) {
        var i = this;
        t && (e.filter && (t = t.filter(e.filter)), (e.type || e.types) && t.forEach(function(t) {
            var n = e.types && e.types[t.id] ? e.types[t.id] : e.type;
            i.setTargetType(t.id, n);
        }), i.data.targets.forEach(function(e) {
            for (var i = 0; i < t.length; i++) if (e.id === t[i].id) {
                e.values = t[i].values, t.splice(i, 1);
                break;
            }
        }), i.data.targets = i.data.targets.concat(t)), i.updateTargets(i.data.targets), 
        i.redraw({
            withUpdateOrgXDomain: !0,
            withUpdateXDomain: !0,
            withLegend: !0
        }), e.done && e.done();
    }, L.loadFromArgs = function(t) {
        var e = this;
        t.data ? e.load(e.convertDataToTargets(t.data), t) : t.url ? e.convertUrlToData(t.url, t.mimeType, t.headers, t.keys, function(i) {
            e.load(e.convertDataToTargets(i), t);
        }) : t.json ? e.load(e.convertDataToTargets(e.convertJsonToData(t.json, t.keys)), t) : t.rows ? e.load(e.convertDataToTargets(e.convertRowsToData(t.rows)), t) : t.columns ? e.load(e.convertDataToTargets(e.convertColumnsToData(t.columns)), t) : e.load(null, t);
    }, L.unload = function(t, e) {
        var i = this;
        e || (e = function() {}), (t = t.filter(function(t) {
            return i.hasTarget(i.data.targets, t);
        })) && 0 !== t.length ? (i.svg.selectAll(t.map(function(t) {
            return i.selectorTarget(t);
        })).transition().style("opacity", 0).remove().call(i.endall, e), t.forEach(function(t) {
            i.withoutFadeIn[t] = !1, i.legend && i.legend.selectAll("." + o.legendItem + i.getTargetSelectorSuffix(t)).remove(), 
            i.data.targets = i.data.targets.filter(function(e) {
                return e.id !== t;
            });
        })) : e();
    }, L.getYDomainMin = function(t) {
        var e, i, n, a, r, o, s = this, c = s.config, d = s.mapToIds(t), l = s.getValuesAsIdKeyed(t);
        if (0 < c.data_groups.length) for (o = s.hasNegativeValueInTargets(t), e = 0; e < c.data_groups.length; e++) if (0 !== (a = c.data_groups[e].filter(function(t) {
            return 0 <= d.indexOf(t);
        })).length) for (n = a[0], o && l[n] && l[n].forEach(function(t, e) {
            l[n][e] = t < 0 ? t : 0;
        }), i = 1; i < a.length; i++) r = a[i], l[r] && l[r].forEach(function(t, e) {
            s.axis.getId(r) !== s.axis.getId(n) || !l[n] || o && 0 < +t || (l[n][e] += +t);
        });
        return s.d3.min(Object.keys(l).map(function(t) {
            return s.d3.min(l[t]);
        }));
    }, L.getYDomainMax = function(t) {
        var e, i, n, a, r, o, s = this, c = s.config, d = s.mapToIds(t), l = s.getValuesAsIdKeyed(t);
        if (0 < c.data_groups.length) for (o = s.hasPositiveValueInTargets(t), e = 0; e < c.data_groups.length; e++) if (0 !== (a = c.data_groups[e].filter(function(t) {
            return 0 <= d.indexOf(t);
        })).length) for (n = a[0], o && l[n] && l[n].forEach(function(t, e) {
            l[n][e] = 0 < t ? t : 0;
        }), i = 1; i < a.length; i++) r = a[i], l[r] && l[r].forEach(function(t, e) {
            s.axis.getId(r) !== s.axis.getId(n) || !l[n] || o && +t < 0 || (l[n][e] += +t);
        });
        return s.d3.max(Object.keys(l).map(function(t) {
            return s.d3.max(l[t]);
        }));
    }, L.getYDomain = function(t, e, i) {
        var n, a, r, o, s, c, d, l, h, g, f = this, p = f.config, _ = t.filter(function(t) {
            return f.axis.getId(t.id) === e;
        }), x = i ? f.filterByXDomain(_, i) : _, m = "y2" === e ? p.axis_y2_min : p.axis_y_min, S = "y2" === e ? p.axis_y2_max : p.axis_y_max, v = f.getYDomainMin(x), b = f.getYDomainMax(x), T = "y2" === e ? p.axis_y2_center : p.axis_y_center, A = f.hasType("bar", x) && p.bar_zerobased || f.hasType("area", x) && p.area_zerobased, P = "y2" === e ? p.axis_y2_inverted : p.axis_y_inverted, C = f.hasDataLabel() && p.axis_rotated, L = f.hasDataLabel() && !p.axis_rotated;
        return v = u(m) ? m : u(S) ? v < S ? v : S - 10 : v, b = u(S) ? S : u(m) ? m < b ? b : m + 10 : b, 
        0 === x.length ? "y2" === e ? f.y2.domain() : f.y.domain() : (isNaN(v) && (v = 0), 
        isNaN(b) && (b = v), v === b && (v < 0 ? b = 0 : v = 0), h = 0 <= v && 0 <= b, g = v <= 0 && b <= 0, 
        (u(m) && h || u(S) && g) && (A = !1), A && (h && (v = 0), g && (b = 0)), r = o = .1 * (a = Math.abs(b - v)), 
        void 0 !== T && (b = T + (s = Math.max(Math.abs(v), Math.abs(b))), v = T - s), C ? (c = f.getDataLabelLength(v, b, "width"), 
        d = y(f.y.range()), r += a * ((l = [ c[0] / d, c[1] / d ])[1] / (1 - l[0] - l[1])), 
        o += a * (l[0] / (1 - l[0] - l[1]))) : L && (c = f.getDataLabelLength(v, b, "height"), 
        r += f.axis.convertPixelsToAxisPadding(c[1], a), o += f.axis.convertPixelsToAxisPadding(c[0], a)), 
        "y" === e && w(p.axis_y_padding) && (r = f.axis.getPadding(p.axis_y_padding, "top", r, a), 
        o = f.axis.getPadding(p.axis_y_padding, "bottom", o, a)), "y2" === e && w(p.axis_y2_padding) && (r = f.axis.getPadding(p.axis_y2_padding, "top", r, a), 
        o = f.axis.getPadding(p.axis_y2_padding, "bottom", o, a)), A && (h && (o = v), g && (r = -b)), 
        n = [ v - o, b + r ], P ? n.reverse() : n);
    }, L.getXDomainMin = function(t) {
        var e = this, i = e.config;
        return _(i.axis_x_min) ? e.isTimeSeries() ? this.parseDate(i.axis_x_min) : i.axis_x_min : e.d3.min(t, function(t) {
            return e.d3.min(t.values, function(t) {
                return t.x;
            });
        });
    }, L.getXDomainMax = function(t) {
        var e = this, i = e.config;
        return _(i.axis_x_max) ? e.isTimeSeries() ? this.parseDate(i.axis_x_max) : i.axis_x_max : e.d3.max(t, function(t) {
            return e.d3.max(t.values, function(t) {
                return t.x;
            });
        });
    }, L.getXDomainPadding = function(t) {
        var e, i, n, a, r = this, o = r.config, c = t[1] - t[0];
        return i = r.isCategorized() ? 0 : r.hasType("bar") ? 1 < (e = r.getMaxDataCount()) ? c / (e - 1) / 2 : .5 : .01 * c, 
        "object" === s(o.axis_x_padding) && w(o.axis_x_padding) ? (n = u(o.axis_x_padding.left) ? o.axis_x_padding.left : i, 
        a = u(o.axis_x_padding.right) ? o.axis_x_padding.right : i) : n = a = "number" == typeof o.axis_x_padding ? o.axis_x_padding : i, 
        {
            left: n,
            right: a
        };
    }, L.getXDomain = function(t) {
        var e = this, i = [ e.getXDomainMin(t), e.getXDomainMax(t) ], n = i[0], a = i[1], r = e.getXDomainPadding(i), o = 0, s = 0;
        return n - a != 0 || e.isCategorized() || (a = e.isTimeSeries() ? (n = new Date(.5 * n.getTime()), 
        new Date(1.5 * a.getTime())) : (n = 0 === n ? 1 : .5 * n, 0 === a ? -1 : 1.5 * a)), 
        (n || 0 === n) && (o = e.isTimeSeries() ? new Date(n.getTime() - r.left) : n - r.left), 
        (a || 0 === a) && (s = e.isTimeSeries() ? new Date(a.getTime() + r.right) : a + r.right), 
        [ o, s ];
    }, L.updateXDomain = function(t, e, i, n, a) {
        var r = this, o = r.config;
        return i && (r.x.domain(a || r.d3.extent(r.getXDomain(t))), r.orgXDomain = r.x.domain(), 
        o.zoom_enabled && r.zoom.scale(r.x).updateScaleExtent(), r.subX.domain(r.x.domain()), 
        r.brush && r.brush.scale(r.subX)), e && (r.x.domain(a || (!r.brush || r.brush.empty() ? r.orgXDomain : r.brush.extent())), 
        o.zoom_enabled && r.zoom.scale(r.x).updateScaleExtent()), n && r.x.domain(r.trimXDomain(r.x.orgDomain())), 
        r.x.domain();
    }, L.trimXDomain = function(t) {
        var e = this.getZoomDomain(), i = e[0], n = e[1];
        return t[0] <= i && (t[1] = +t[1] + (i - t[0]), t[0] = i), n <= t[1] && (t[0] = +t[0] - (t[1] - n), 
        t[1] = n), t;
    }, L.drag = function(t) {
        var e, i, n, a, r, s, c, d, l = this, u = l.config, h = l.main, g = l.d3;
        l.hasArcType() || u.data_selection_enabled && (u.zoom_enabled && !l.zoom.altDomain || u.data_selection_multiple && (e = l.dragStart[0], 
        i = l.dragStart[1], n = t[0], a = t[1], r = Math.min(e, n), s = Math.max(e, n), 
        c = u.data_selection_grouped ? l.margin.top : Math.min(i, a), d = u.data_selection_grouped ? l.height : Math.max(i, a), 
        h.select("." + o.dragarea).attr("x", r).attr("y", c).attr("width", s - r).attr("height", d - c), 
        h.selectAll("." + o.shapes).selectAll("." + o.shape).filter(function(t) {
            return u.data_selection_isselectable(t);
        }).each(function(t, e) {
            var i, n, a, u, h, f, p = g.select(this), _ = p.classed(o.SELECTED), x = p.classed(o.INCLUDED), m = !1;
            if (p.classed(o.circle)) i = 1 * p.attr("cx"), n = 1 * p.attr("cy"), h = l.togglePoint, 
            m = r < i && i < s && c < n && n < d; else {
                if (!p.classed(o.bar)) return;
                i = (f = A(this)).x, n = f.y, a = f.width, u = f.height, h = l.togglePath, m = !(s < i || i + a < r || d < n || n + u < c);
            }
            m ^ x && (p.classed(o.INCLUDED, !x), p.classed(o.SELECTED, !_), h.call(l, !_, p, t, e));
        })));
    }, L.dragstart = function(t) {
        var e = this, i = e.config;
        e.hasArcType() || i.data_selection_enabled && (e.dragStart = t, e.main.select("." + o.chart).append("rect").attr("class", o.dragarea).style("opacity", .1), 
        e.dragging = !0);
    }, L.dragend = function() {
        var t = this, e = t.config;
        t.hasArcType() || e.data_selection_enabled && (t.main.select("." + o.dragarea).transition().duration(100).style("opacity", 0).remove(), 
        t.main.selectAll("." + o.shape).classed(o.INCLUDED, !1), t.dragging = !1);
    }, L.getYFormat = function(t) {
        var e = this, i = t && !e.hasType("gauge") ? e.defaultArcValueFormat : e.yFormat, n = t && !e.hasType("gauge") ? e.defaultArcValueFormat : e.y2Format;
        return function(t, a, r) {
            return ("y2" === e.axis.getId(r) ? n : i).call(e, t, a);
        };
    }, L.yFormat = function(t) {
        var i = this.config;
        return (i.axis_y_tick_format ? i.axis_y_tick_format : this.defaultValueFormat)(t);
    }, L.y2Format = function(t) {
        var i = this.config;
        return (i.axis_y2_tick_format ? i.axis_y2_tick_format : this.defaultValueFormat)(t);
    }, L.defaultValueFormat = function(t) {
        return u(t) ? +t : "";
    }, L.defaultArcValueFormat = function(t, e) {
        return (100 * e).toFixed(1) + "%";
    }, L.dataLabelFormat = function(t) {
        var e = this.config.data_labels, i = function(t) {
            return u(t) ? +t : "";
        };
        return "function" == typeof e.format ? e.format : "object" === s(e.format) ? e.format[t] ? !0 === e.format[t] ? i : e.format[t] : function() {
            return "";
        } : i;
    }, L.initGrid = function() {
        var t = this, e = t.config, i = t.d3;
        t.grid = t.main.append("g").attr("clip-path", t.clipPathForGrid).attr("class", o.grid), 
        e.grid_x_show && t.grid.append("g").attr("class", o.xgrids), e.grid_y_show && t.grid.append("g").attr("class", o.ygrids), 
        e.grid_focus_show && t.grid.append("g").attr("class", o.xgridFocus).append("line").attr("class", o.xgridFocus), 
        t.xgrid = i.selectAll([]), e.grid_lines_front || t.initGridLines();
    }, L.initGridLines = function() {
        var t = this, e = t.d3;
        t.gridLines = t.main.append("g").attr("clip-path", t.clipPathForGrid).attr("class", o.grid + " " + o.gridLines), 
        t.gridLines.append("g").attr("class", o.xgridLines), t.gridLines.append("g").attr("class", o.ygridLines), 
        t.xgridLines = e.selectAll([]);
    }, L.updateXGrid = function(t) {
        var e = this, i = e.config, n = e.d3, a = e.generateGridData(i.grid_x_type, e.x), r = e.isCategorized() ? e.xAxis.tickOffset() : 0;
        e.xgridAttr = i.axis_rotated ? {
            x1: 0,
            x2: e.width,
            y1: function(t) {
                return e.x(t) - r;
            },
            y2: function(t) {
                return e.x(t) - r;
            }
        } : {
            x1: function(t) {
                return e.x(t) + r;
            },
            x2: function(t) {
                return e.x(t) + r;
            },
            y1: 0,
            y2: e.height
        }, e.xgrid = e.main.select("." + o.xgrids).selectAll("." + o.xgrid).data(a), e.xgrid.enter().append("line").attr("class", o.xgrid), 
        t || e.xgrid.attr(e.xgridAttr).style("opacity", function() {
            return +n.select(this).attr(i.axis_rotated ? "y1" : "x1") === (i.axis_rotated ? e.height : 0) ? 0 : 1;
        }), e.xgrid.exit().remove();
    }, L.updateYGrid = function() {
        var t = this, e = t.config, i = t.yAxis.tickValues() || t.y.ticks(e.grid_y_ticks);
        t.ygrid = t.main.select("." + o.ygrids).selectAll("." + o.ygrid).data(i), t.ygrid.enter().append("line").attr("class", o.ygrid), 
        t.ygrid.attr("x1", e.axis_rotated ? t.y : 0).attr("x2", e.axis_rotated ? t.y : t.width).attr("y1", e.axis_rotated ? 0 : t.y).attr("y2", e.axis_rotated ? t.height : t.y), 
        t.ygrid.exit().remove(), t.smoothLines(t.ygrid, "grid");
    }, L.gridTextAnchor = function(t) {
        return t.position ? t.position : "end";
    }, L.gridTextDx = function(t) {
        return "start" === t.position ? 4 : "middle" === t.position ? 0 : -4;
    }, L.xGridTextX = function(t) {
        return "start" === t.position ? -this.height : "middle" === t.position ? -this.height / 2 : 0;
    }, L.yGridTextX = function(t) {
        return "start" === t.position ? 0 : "middle" === t.position ? this.width / 2 : this.width;
    }, L.updateGrid = function(t) {
        var e, i, n, a = this, r = a.main, s = a.config;
        a.grid.style("visibility", a.hasArcType() ? "hidden" : "visible"), r.select("line." + o.xgridFocus).style("visibility", "hidden"), 
        s.grid_x_show && a.updateXGrid(), a.xgridLines = r.select("." + o.xgridLines).selectAll("." + o.xgridLine).data(s.grid_x_lines), 
        (e = a.xgridLines.enter().append("g").attr("class", function(t) {
            return o.xgridLine + (t.class ? " " + t.class : "");
        })).append("line").style("opacity", 0), e.append("text").attr("text-anchor", a.gridTextAnchor).attr("transform", s.axis_rotated ? "" : "rotate(-90)").attr("dx", a.gridTextDx).attr("dy", -5).style("opacity", 0), 
        a.xgridLines.exit().transition().duration(t).style("opacity", 0).remove(), s.grid_y_show && a.updateYGrid(), 
        a.ygridLines = r.select("." + o.ygridLines).selectAll("." + o.ygridLine).data(s.grid_y_lines), 
        (i = a.ygridLines.enter().append("g").attr("class", function(t) {
            return o.ygridLine + (t.class ? " " + t.class : "");
        })).append("line").style("opacity", 0), i.append("text").attr("text-anchor", a.gridTextAnchor).attr("transform", s.axis_rotated ? "rotate(-90)" : "").attr("dx", a.gridTextDx).attr("dy", -5).style("opacity", 0), 
        n = a.yv.bind(a), a.ygridLines.select("line").transition().duration(t).attr("x1", s.axis_rotated ? n : 0).attr("x2", s.axis_rotated ? n : a.width).attr("y1", s.axis_rotated ? 0 : n).attr("y2", s.axis_rotated ? a.height : n).style("opacity", 1), 
        a.ygridLines.select("text").transition().duration(t).attr("x", s.axis_rotated ? a.xGridTextX.bind(a) : a.yGridTextX.bind(a)).attr("y", n).text(function(t) {
            return t.text;
        }).style("opacity", 1), a.ygridLines.exit().transition().duration(t).style("opacity", 0).remove();
    }, L.redrawGrid = function(t) {
        var e = this, i = e.config, n = e.xv.bind(e), a = e.xgridLines.select("line"), r = e.xgridLines.select("text");
        return [ (t ? a.transition() : a).attr("x1", i.axis_rotated ? 0 : n).attr("x2", i.axis_rotated ? e.width : n).attr("y1", i.axis_rotated ? n : 0).attr("y2", i.axis_rotated ? n : e.height).style("opacity", 1), (t ? r.transition() : r).attr("x", i.axis_rotated ? e.yGridTextX.bind(e) : e.xGridTextX.bind(e)).attr("y", n).text(function(t) {
            return t.text;
        }).style("opacity", 1) ];
    }, L.showXGridFocus = function(t) {
        var e = this, i = e.config, n = t.filter(function(t) {
            return t && u(t.value);
        }), a = e.main.selectAll("line." + o.xgridFocus), r = e.xx.bind(e);
        i.tooltip_show && (e.hasType("scatter") || e.hasArcType() || (a.style("visibility", "visible").data([ n[0] ]).attr(i.axis_rotated ? "y1" : "x1", r).attr(i.axis_rotated ? "y2" : "x2", r), 
        e.smoothLines(a, "grid")));
    }, L.hideXGridFocus = function() {
        this.main.select("line." + o.xgridFocus).style("visibility", "hidden");
    }, L.updateXgridFocus = function() {
        var t = this, e = t.config;
        t.main.select("line." + o.xgridFocus).attr("x1", e.axis_rotated ? 0 : -10).attr("x2", e.axis_rotated ? t.width : -10).attr("y1", e.axis_rotated ? -10 : 0).attr("y2", e.axis_rotated ? -10 : t.height);
    }, L.generateGridData = function(t, e) {
        var i, n, a, r, c = [], d = this.main.select("." + o.axisX).selectAll(".tick").size();
        if ("year" === t) for (n = (i = this.getXDomain())[0].getFullYear(), a = i[1].getFullYear(), 
        r = n; r <= a; r++) c.push(new Date(r + "-01-01 00:00:00")); else (c = e.ticks(10)).length > d && (c = c.filter(function(t) {
            return ("" + t).indexOf(".") < 0;
        }));
        return c;
    }, L.getGridFilterToRemove = function(t) {
        return t ? function(e) {
            var i = !1;
            return [].concat(t).forEach(function(t) {
                ("value" in t && e.value === t.value || "class" in t && e.class === t.class) && (i = !0);
            }), i;
        } : function() {
            return !0;
        };
    }, L.removeGridLines = function(t, e) {
        var i = this, n = i.config, a = i.getGridFilterToRemove(t), r = function(t) {
            return !a(t);
        }, s = e ? o.xgridLines : o.ygridLines, c = e ? o.xgridLine : o.ygridLine;
        i.main.select("." + s).selectAll("." + c).filter(a).transition().duration(n.transition_duration).style("opacity", 0).remove(), 
        e ? n.grid_x_lines = n.grid_x_lines.filter(r) : n.grid_y_lines = n.grid_y_lines.filter(r);
    }, L.initEventRect = function() {
        this.main.select("." + o.chart).append("g").attr("class", o.eventRects).style("fill-opacity", 0);
    }, L.redrawEventRect = function() {
        var t, e, i = this, n = i.config, a = i.isMultipleX(), r = i.main.select("." + o.eventRects).style("cursor", n.zoom_enabled ? n.axis_rotated ? "ns-resize" : "ew-resize" : null).classed(o.eventRectsMultiple, a).classed(o.eventRectsSingle, !a);
        r.selectAll("." + o.eventRect).remove(), i.eventRect = r.selectAll("." + o.eventRect), 
        a ? (t = i.eventRect.data([ 0 ]), i.generateEventRectsForMultipleXs(t.enter()), 
        i.updateEventRect(t)) : (e = i.getMaxDataCountTarget(i.data.targets), r.datum(e ? e.values : []), 
        i.eventRect = r.selectAll("." + o.eventRect), t = i.eventRect.data(function(t) {
            return t;
        }), i.generateEventRectsForSingleX(t.enter()), i.updateEventRect(t), t.exit().remove());
    }, L.updateEventRect = function(t) {
        var e, i, n, a, r, o, s = this, c = s.config;
        t = t || s.eventRect.data(function(t) {
            return t;
        }), a = s.isMultipleX() ? (i = e = 0, n = s.width, s.height) : (o = !s.isCustomX() && !s.isTimeSeries() || s.isCategorized() ? (r = s.getEventRectWidth(), 
        function(t) {
            return s.x(t.x) - r / 2;
        }) : (s.updateXs(), r = function(t) {
            var e = s.getPrevX(t.index), i = s.getNextX(t.index);
            return null === e && null === i ? c.axis_rotated ? s.height : s.width : (null === e && (e = s.x.domain()[0]), 
            null === i && (i = s.x.domain()[1]), Math.max(0, (s.x(i) - s.x(e)) / 2));
        }, function(t) {
            var e = s.getPrevX(t.index), i = s.getNextX(t.index), n = s.data.xs[t.id][t.index];
            return null === e && null === i ? 0 : (null === e && (e = s.x.domain()[0]), (s.x(n) + s.x(e)) / 2);
        }), e = c.axis_rotated ? 0 : o, i = c.axis_rotated ? o : 0, n = c.axis_rotated ? s.width : r, 
        c.axis_rotated ? r : s.height), t.attr("class", s.classEvent.bind(s)).attr("x", e).attr("y", i).attr("width", n).attr("height", a);
    }, L.generateEventRectsForSingleX = function(t) {
        var e = this, i = e.d3, n = e.config;
        t.append("rect").attr("class", e.classEvent.bind(e)).style("cursor", n.data_selection_enabled && n.data_selection_grouped ? "pointer" : null).on("mouseover", function(t) {
            var i = t.index;
            e.dragging || e.flowing || e.hasArcType() || (n.point_focus_expand_enabled && e.expandCircles(i, null, !0), 
            e.expandBars(i, null, !0), e.main.selectAll("." + o.shape + "-" + i).each(function(t) {
                n.data_onmouseover.call(e.api, t);
            }));
        }).on("mouseout", function(t) {
            var i = t.index;
            e.config && (e.hasArcType() || (e.hideXGridFocus(), e.hideTooltip(), e.unexpandCircles(), 
            e.unexpandBars(), e.main.selectAll("." + o.shape + "-" + i).each(function(t) {
                n.data_onmouseout.call(e.api, t);
            })));
        }).on("mousemove", function(t) {
            var a, r = t.index, s = e.svg.select("." + o.eventRect + "-" + r);
            e.dragging || e.flowing || e.hasArcType() || (e.isStepType(t) && "step-after" === e.config.line_step_type && i.mouse(this)[0] < e.x(e.getXValue(t.id, r)) && (r -= 1), 
            a = e.filterTargetsToShow(e.data.targets).map(function(t) {
                return e.addName(e.getValueOnIndex(t.values, r));
            }), n.tooltip_grouped && (e.showTooltip(a, this), e.showXGridFocus(a)), (!n.tooltip_grouped || n.data_selection_enabled && !n.data_selection_grouped) && e.main.selectAll("." + o.shape + "-" + r).each(function() {
                i.select(this).classed(o.EXPANDED, !0), n.data_selection_enabled && s.style("cursor", n.data_selection_grouped ? "pointer" : null), 
                n.tooltip_grouped || (e.hideXGridFocus(), e.hideTooltip(), n.data_selection_grouped || (e.unexpandCircles(r), 
                e.unexpandBars(r)));
            }).filter(function(t) {
                return e.isWithinShape(this, t);
            }).each(function(t) {
                n.data_selection_enabled && (n.data_selection_grouped || n.data_selection_isselectable(t)) && s.style("cursor", "pointer"), 
                n.tooltip_grouped || (e.showTooltip([ t ], this), e.showXGridFocus([ t ]), n.point_focus_expand_enabled && e.expandCircles(r, t.id, !0), 
                e.expandBars(r, t.id, !0));
            }));
        }).on("click", function(t) {
            var a = t.index;
            !e.hasArcType() && e.toggleShape && (e.cancelClick ? e.cancelClick = !1 : (e.isStepType(t) && "step-after" === n.line_step_type && i.mouse(this)[0] < e.x(e.getXValue(t.id, a)) && (a -= 1), 
            e.main.selectAll("." + o.shape + "-" + a).each(function(t) {
                (n.data_selection_grouped || e.isWithinShape(this, t)) && (e.toggleShape(this, t, a), 
                e.config.data_onclick.call(e.api, t, this));
            })));
        }).call(n.data_selection_draggable && e.drag ? i.behavior.drag().origin(Object).on("drag", function() {
            e.drag(i.mouse(this));
        }).on("dragstart", function() {
            e.dragstart(i.mouse(this));
        }).on("dragend", function() {
            e.dragend();
        }) : function() {});
    }, L.generateEventRectsForMultipleXs = function(t) {
        function e() {
            i.svg.select("." + o.eventRect).style("cursor", null), i.hideXGridFocus(), i.hideTooltip(), 
            i.unexpandCircles(), i.unexpandBars();
        }
        var i = this, n = i.d3, a = i.config;
        t.append("rect").attr("x", 0).attr("y", 0).attr("width", i.width).attr("height", i.height).attr("class", o.eventRect).on("mouseout", function() {
            i.config && (i.hasArcType() || e());
        }).on("mousemove", function() {
            var t, r, s, c = i.filterTargetsToShow(i.data.targets);
            i.dragging || i.hasArcType(c) || (t = n.mouse(this), r = i.findClosestFromTargets(c, t), 
            !i.mouseover || r && r.id === i.mouseover.id || (a.data_onmouseout.call(i.api, i.mouseover), 
            i.mouseover = void 0), r ? (s = (i.isScatterType(r) || !a.tooltip_grouped ? [ r ] : i.filterByX(c, r.x)).map(function(t) {
                return i.addName(t);
            }), i.showTooltip(s, this), a.point_focus_expand_enabled && i.expandCircles(r.index, r.id, !0), 
            i.expandBars(r.index, r.id, !0), i.showXGridFocus(s), (i.isBarType(r.id) || i.dist(r, t) < a.point_sensitivity) && (i.svg.select("." + o.eventRect).style("cursor", "pointer"), 
            i.mouseover || (a.data_onmouseover.call(i.api, r), i.mouseover = r))) : e());
        }).on("click", function() {
            var t, e, r = i.filterTargetsToShow(i.data.targets);
            i.hasArcType(r) || (t = n.mouse(this), (e = i.findClosestFromTargets(r, t)) && (i.isBarType(e.id) || i.dist(e, t) < a.point_sensitivity) && i.main.selectAll("." + o.shapes + i.getTargetSelectorSuffix(e.id)).selectAll("." + o.shape + "-" + e.index).each(function() {
                (a.data_selection_grouped || i.isWithinShape(this, e)) && (i.toggleShape(this, e, e.index), 
                i.config.data_onclick.call(i.api, e, this));
            }));
        }).call(a.data_selection_draggable && i.drag ? n.behavior.drag().origin(Object).on("drag", function() {
            i.drag(n.mouse(this));
        }).on("dragstart", function() {
            i.dragstart(n.mouse(this));
        }).on("dragend", function() {
            i.dragend();
        }) : function() {});
    }, L.dispatchEvent = function(t, e, i) {
        var a = "." + o.eventRect + (this.isMultipleX() ? "" : "-" + e), r = this.main.select(a).node(), s = r.getBoundingClientRect(), c = s.left + (i ? i[0] : 0), d = s.top + (i ? i[1] : 0), l = document.createEvent("MouseEvents");
        l.initMouseEvent(t, !0, !0, window, 0, c, d, c, d, !1, !1, !1, !1, 0, null), r.dispatchEvent(l);
    }, L.initLegend = function() {
        var t = this;
        if (t.legendItemTextBox = {}, t.legendHasRendered = !1, t.legend = t.svg.append("g").attr("transform", t.getTranslate("legend")), 
        !t.config.legend_show) return t.legend.style("visibility", "hidden"), void (t.hiddenLegendIds = t.mapToIds(t.data.targets));
        t.updateLegendWithDefaults();
    }, L.updateLegendWithDefaults = function() {
        var t = this;
        t.updateLegend(t.mapToIds(t.data.targets), {
            withTransform: !1,
            withTransitionForTransform: !1,
            withTransition: !1
        });
    }, L.updateSizeForLegend = function(t, e) {
        var i = this, n = i.config, a = {
            top: i.isLegendTop ? i.getCurrentPaddingTop() + n.legend_inset_y + 5.5 : i.currentHeight - t - i.getCurrentPaddingBottom() - n.legend_inset_y,
            left: i.isLegendLeft ? i.getCurrentPaddingLeft() + n.legend_inset_x + .5 : i.currentWidth - e - i.getCurrentPaddingRight() - n.legend_inset_x + .5
        };
        i.margin3 = {
            top: i.isLegendRight ? 0 : i.isLegendInset ? a.top : i.currentHeight - t,
            right: NaN,
            bottom: 0,
            left: i.isLegendRight ? i.currentWidth - e : i.isLegendInset ? a.left : 0
        };
    }, L.transformLegend = function(t) {
        var e = this;
        (t ? e.legend.transition() : e.legend).attr("transform", e.getTranslate("legend"));
    }, L.updateLegendStep = function(t) {
        this.legendStep = t;
    }, L.updateLegendItemWidth = function(t) {
        this.legendItemWidth = t;
    }, L.updateLegendItemHeight = function(t) {
        this.legendItemHeight = t;
    }, L.getLegendWidth = function() {
        var t = this;
        return t.config.legend_show ? t.isLegendRight || t.isLegendInset ? t.legendItemWidth * (t.legendStep + 1) : t.currentWidth : 0;
    }, L.getLegendHeight = function() {
        var t = this, e = 0;
        return t.config.legend_show && (e = t.isLegendRight ? t.currentHeight : Math.max(20, t.legendItemHeight) * (t.legendStep + 1)), 
        e;
    }, L.opacityForLegend = function(t) {
        return t.classed(o.legendItemHidden) ? null : 1;
    }, L.opacityForUnfocusedLegend = function(t) {
        return t.classed(o.legendItemHidden) ? null : .3;
    }, L.toggleFocusLegend = function(t, e) {
        var i = this;
        t = i.mapToTargetIds(t), i.legend.selectAll("." + o.legendItem).filter(function(e) {
            return 0 <= t.indexOf(e);
        }).classed(o.legendItemFocused, e).transition().duration(100).style("opacity", function() {
            return (e ? i.opacityForLegend : i.opacityForUnfocusedLegend).call(i, i.d3.select(this));
        });
    }, L.revertLegend = function() {
        var t = this, e = t.d3;
        t.legend.selectAll("." + o.legendItem).classed(o.legendItemFocused, !1).transition().duration(100).style("opacity", function() {
            return t.opacityForLegend(e.select(this));
        });
    }, L.showLegend = function(t) {
        var e = this, i = e.config;
        i.legend_show || (i.legend_show = !0, e.legend.style("visibility", "visible"), e.legendHasRendered || e.updateLegendWithDefaults()), 
        e.removeHiddenLegendIds(t), e.legend.selectAll(e.selectorLegends(t)).style("visibility", "visible").transition().style("opacity", function() {
            return e.opacityForLegend(e.d3.select(this));
        });
    }, L.hideLegend = function(t) {
        var e = this, i = e.config;
        i.legend_show && S(t) && (i.legend_show = !1, e.legend.style("visibility", "hidden")), 
        e.addHiddenLegendIds(t), e.legend.selectAll(e.selectorLegends(t)).style("opacity", 0).style("visibility", "hidden");
    }, L.clearLegendItemTextBoxCache = function() {
        this.legendItemTextBox = {};
    }, L.updateLegend = function(t, e, i) {
        function n(t, e) {
            return T.legendItemTextBox[e] || (T.legendItemTextBox[e] = T.getTextRect(t.textContent, o.legendItem, t)), 
            T.legendItemTextBox[e];
        }
        function a(e, i, a) {
            function r(t, e) {
                e || (o = (f - O - g) / 2) < G && (o = (f - g) / 2, O = 0, X++), F[t] = X, D[X] = T.isLegendInset ? 10 : o, 
                I[t] = O, O += g;
            }
            var o, s, c = 0 === a, d = a === t.length - 1, l = n(e, i), u = l.width + E + (!d || T.isLegendRight || T.isLegendInset ? C : 0) + A.legend_padding, h = l.height + P, g = T.isLegendRight || T.isLegendInset ? h : u, f = T.isLegendRight || T.isLegendInset ? T.getLegendHeight() : T.getLegendWidth();
            c && (V = L = X = O = 0), !A.legend_show || T.isLegendToShow(i) ? (R[i] = u, k[i] = h, 
            (!L || L <= u) && (L = u), (!V || V <= h) && (V = h), s = T.isLegendRight || T.isLegendInset ? V : L, 
            A.legend_equally ? (Object.keys(R).forEach(function(t) {
                R[t] = L;
            }), Object.keys(k).forEach(function(t) {
                k[t] = V;
            }), (o = (f - s * t.length) / 2) < G ? (X = O = 0, t.forEach(function(t) {
                r(t);
            })) : r(i, !0)) : r(i)) : R[i] = k[i] = F[i] = I[i] = 0;
        }
        var r, s, c, d, l, u, h, g, f, p, x, m, y, S, w, b, T = this, A = T.config, P = 4, C = 10, L = 0, V = 0, G = 10, E = A.legend_item_tile_width + 5, O = 0, I = {}, R = {}, k = {}, D = [ 0 ], F = {}, X = 0;
        t = t.filter(function(t) {
            return !_(A.data_names[t]) || null !== A.data_names[t];
        }), x = v(e = e || {}, "withTransition", !0), m = v(e, "withTransitionForTransform", !0), 
        T.isLegendInset && (X = A.legend_inset_step ? A.legend_inset_step : t.length, T.updateLegendStep(X)), 
        d = T.isLegendRight ? (r = function(t) {
            return L * F[t];
        }, function(t) {
            return D[F[t]] + I[t];
        }) : T.isLegendInset ? (r = function(t) {
            return L * F[t] + 10;
        }, function(t) {
            return D[F[t]] + I[t];
        }) : (r = function(t) {
            return D[F[t]] + I[t];
        }, function(t) {
            return V * F[t];
        }), s = function(t, e) {
            return r(t, e) + 4 + A.legend_item_tile_width;
        }, l = function(t, e) {
            return d(t, e) + 9;
        }, c = function(t, e) {
            return r(t, e);
        }, u = function(t, e) {
            return d(t, e) - 5;
        }, h = function(t, e) {
            return r(t, e) - 2;
        }, g = function(t, e) {
            return r(t, e) - 2 + A.legend_item_tile_width;
        }, f = function(t, e) {
            return d(t, e) + 4;
        }, (p = T.legend.selectAll("." + o.legendItem).data(t).enter().append("g").attr("class", function(t) {
            return T.generateClass(o.legendItem, t);
        }).style("visibility", function(t) {
            return T.isLegendToShow(t) ? "visible" : "hidden";
        }).style("cursor", "pointer").on("click", function(t) {
            A.legend_item_onclick ? A.legend_item_onclick.call(T, t) : T.d3.event.altKey ? (T.api.hide(), 
            T.api.show(t)) : (T.api.toggle(t), T.isTargetToShow(t) ? T.api.focus(t) : T.api.revert());
        }).on("mouseover", function(t) {
            A.legend_item_onmouseover ? A.legend_item_onmouseover.call(T, t) : (T.d3.select(this).classed(o.legendItemFocused, !0), 
            !T.transiting && T.isTargetToShow(t) && T.api.focus(t));
        }).on("mouseout", function(t) {
            A.legend_item_onmouseout ? A.legend_item_onmouseout.call(T, t) : (T.d3.select(this).classed(o.legendItemFocused, !1), 
            T.api.revert());
        })).append("text").text(function(t) {
            return _(A.data_names[t]) ? A.data_names[t] : t;
        }).each(function(t, e) {
            a(this, t, e);
        }).style("pointer-events", "none").attr("x", T.isLegendRight || T.isLegendInset ? s : -200).attr("y", T.isLegendRight || T.isLegendInset ? -200 : l), 
        p.append("rect").attr("class", o.legendItemEvent).style("fill-opacity", 0).attr("x", T.isLegendRight || T.isLegendInset ? c : -200).attr("y", T.isLegendRight || T.isLegendInset ? -200 : u), 
        p.append("line").attr("class", o.legendItemTile).style("stroke", T.color).style("pointer-events", "none").attr("x1", T.isLegendRight || T.isLegendInset ? h : -200).attr("y1", T.isLegendRight || T.isLegendInset ? -200 : f).attr("x2", T.isLegendRight || T.isLegendInset ? g : -200).attr("y2", T.isLegendRight || T.isLegendInset ? -200 : f).attr("stroke-width", A.legend_item_tile_height), 
        b = T.legend.select("." + o.legendBackground + " rect"), T.isLegendInset && 0 < L && 0 === b.size() && (b = T.legend.insert("g", "." + o.legendItem).attr("class", o.legendBackground).append("rect")), 
        y = T.legend.selectAll("text").data(t).text(function(t) {
            return _(A.data_names[t]) ? A.data_names[t] : t;
        }).each(function(t, e) {
            a(this, t, e);
        }), (x ? y.transition() : y).attr("x", s).attr("y", l), S = T.legend.selectAll("rect." + o.legendItemEvent).data(t), 
        (x ? S.transition() : S).attr("width", function(t) {
            return R[t];
        }).attr("height", function(t) {
            return k[t];
        }).attr("x", c).attr("y", u), w = T.legend.selectAll("line." + o.legendItemTile).data(t), 
        (x ? w.transition() : w).style("stroke", T.color).attr("x1", h).attr("y1", f).attr("x2", g).attr("y2", f), 
        b && (x ? b.transition() : b).attr("height", T.getLegendHeight() - 12).attr("width", L * (X + 1) + 10), 
        T.legend.selectAll("." + o.legendItem).classed(o.legendItemHidden, function(t) {
            return !T.isTargetToShow(t);
        }), T.updateLegendItemWidth(L), T.updateLegendItemHeight(V), T.updateLegendStep(X), 
        T.updateSizes(), T.updateScales(), T.updateSvgSize(), T.transformAll(m, i), T.legendHasRendered = !0;
    }, L.initRegion = function() {
        var t = this;
        t.region = t.main.append("g").attr("clip-path", t.clipPath).attr("class", o.regions);
    }, L.updateRegion = function(t) {
        var e = this, i = e.config;
        e.region.style("visibility", e.hasArcType() ? "hidden" : "visible"), e.mainRegion = e.main.select("." + o.regions).selectAll("." + o.region).data(i.regions), 
        e.mainRegion.enter().append("g").append("rect").style("fill-opacity", 0), e.mainRegion.attr("class", e.classRegion.bind(e)), 
        e.mainRegion.exit().transition().duration(t).style("opacity", 0).remove();
    }, L.redrawRegion = function(t) {
        var e = this, i = e.mainRegion.selectAll("rect").each(function() {
            var t = e.d3.select(this.parentNode).datum();
            e.d3.select(this).datum(t);
        }), n = e.regionX.bind(e), a = e.regionY.bind(e), r = e.regionWidth.bind(e), o = e.regionHeight.bind(e);
        return [ (t ? i.transition() : i).attr("x", n).attr("y", a).attr("width", r).attr("height", o).style("fill-opacity", function(t) {
            return u(t.opacity) ? t.opacity : .1;
        }) ];
    }, L.regionX = function(t) {
        var e = this, i = e.config, n = "y" === t.axis ? e.y : e.y2;
        return "y" === t.axis || "y2" === t.axis ? i.axis_rotated && "start" in t ? n(t.start) : 0 : i.axis_rotated ? 0 : "start" in t ? e.x(e.isTimeSeries() ? e.parseDate(t.start) : t.start) : 0;
    }, L.regionY = function(t) {
        var e = this, i = e.config, n = "y" === t.axis ? e.y : e.y2;
        return "y" === t.axis || "y2" === t.axis ? i.axis_rotated ? 0 : "end" in t ? n(t.end) : 0 : i.axis_rotated && "start" in t ? e.x(e.isTimeSeries() ? e.parseDate(t.start) : t.start) : 0;
    }, L.regionWidth = function(t) {
        var e, i = this, n = i.config, a = i.regionX(t), r = "y" === t.axis ? i.y : i.y2;
        return (e = "y" === t.axis || "y2" === t.axis ? n.axis_rotated && "end" in t ? r(t.end) : i.width : n.axis_rotated ? i.width : "end" in t ? i.x(i.isTimeSeries() ? i.parseDate(t.end) : t.end) : i.width) < a ? 0 : e - a;
    }, L.regionHeight = function(t) {
        var e, i = this, n = i.config, a = this.regionY(t), r = "y" === t.axis ? i.y : i.y2;
        return (e = "y" === t.axis || "y2" === t.axis ? n.axis_rotated ? i.height : "start" in t ? r(t.start) : i.height : n.axis_rotated && "end" in t ? i.x(i.isTimeSeries() ? i.parseDate(t.end) : t.end) : i.height) < a ? 0 : e - a;
    }, L.isRegionOnX = function(t) {
        return !t.axis || "x" === t.axis;
    }, L.getScale = function(t, e, i) {
        return (i ? this.d3.time.scale() : this.d3.scale.linear()).range([ t, e ]);
    }, L.getX = function(t, e, i, n) {
        var a, r = this, o = r.getScale(t, e, r.isTimeSeries()), s = i ? o.domain(i) : o;
        for (a in o = r.isCategorized() ? (n = n || function() {
            return 0;
        }, function(t, e) {
            var i = s(t) + n(t);
            return e ? i : Math.ceil(i);
        }) : function(t, e) {
            var i = s(t);
            return e ? i : Math.ceil(i);
        }, s) o[a] = s[a];
        return o.orgDomain = function() {
            return s.domain();
        }, r.isCategorized() && (o.domain = function(t) {
            return arguments.length ? (s.domain(t), o) : [ (t = this.orgDomain())[0], t[1] + 1 ];
        }), o;
    }, L.getY = function(t, e, i) {
        var n = this.getScale(t, e, this.isTimeSeriesY());
        return i && n.domain(i), n;
    }, L.getYScale = function(t) {
        return "y2" === this.axis.getId(t) ? this.y2 : this.y;
    }, L.getSubYScale = function(t) {
        return "y2" === this.axis.getId(t) ? this.subY2 : this.subY;
    }, L.updateScales = function() {
        var t = this, e = t.config, i = !t.x;
        t.xMin = e.axis_rotated ? 1 : 0, t.xMax = e.axis_rotated ? t.height : t.width, t.yMin = e.axis_rotated ? 0 : t.height, 
        t.yMax = e.axis_rotated ? t.width : 1, t.subXMin = t.xMin, t.subXMax = t.xMax, t.subYMin = e.axis_rotated ? 0 : t.height2, 
        t.subYMax = e.axis_rotated ? t.width2 : 1, t.x = t.getX(t.xMin, t.xMax, i ? void 0 : t.x.orgDomain(), function() {
            return t.xAxis.tickOffset();
        }), t.y = t.getY(t.yMin, t.yMax, i ? e.axis_y_default : t.y.domain()), t.y2 = t.getY(t.yMin, t.yMax, i ? e.axis_y2_default : t.y2.domain()), 
        t.subX = t.getX(t.xMin, t.xMax, t.orgXDomain, function(e) {
            return e % 1 ? 0 : t.subXAxis.tickOffset();
        }), t.subY = t.getY(t.subYMin, t.subYMax, i ? e.axis_y_default : t.subY.domain()), 
        t.subY2 = t.getY(t.subYMin, t.subYMax, i ? e.axis_y2_default : t.subY2.domain()), 
        t.xAxisTickFormat = t.axis.getXAxisTickFormat(), t.xAxisTickValues = t.axis.getXAxisTickValues(), 
        t.yAxisTickValues = t.axis.getYAxisTickValues(), t.y2AxisTickValues = t.axis.getY2AxisTickValues(), 
        t.xAxis = t.axis.getXAxis(t.x, t.xOrient, t.xAxisTickFormat, t.xAxisTickValues, e.axis_x_tick_outer), 
        t.subXAxis = t.axis.getXAxis(t.subX, t.subXOrient, t.xAxisTickFormat, t.xAxisTickValues, e.axis_x_tick_outer), 
        t.yAxis = t.axis.getYAxis(t.y, t.yOrient, e.axis_y_tick_format, t.yAxisTickValues, e.axis_y_tick_outer), 
        t.y2Axis = t.axis.getYAxis(t.y2, t.y2Orient, e.axis_y2_tick_format, t.y2AxisTickValues, e.axis_y2_tick_outer), 
        i || (t.brush && t.brush.scale(t.subX), e.zoom_enabled && t.zoom.scale(t.x)), t.updateArc && t.updateArc();
    }, L.selectPoint = function(t, e, i) {
        var n = this, a = n.config, r = (a.axis_rotated ? n.circleY : n.circleX).bind(n), s = (a.axis_rotated ? n.circleX : n.circleY).bind(n), c = n.pointSelectR.bind(n);
        a.data_onselected.call(n.api, e, t.node()), n.main.select("." + o.selectedCircles + n.getTargetSelectorSuffix(e.id)).selectAll("." + o.selectedCircle + "-" + i).data([ e ]).enter().append("circle").attr("class", function() {
            return n.generateClass(o.selectedCircle, i);
        }).attr("cx", r).attr("cy", s).attr("stroke", function() {
            return n.color(e);
        }).attr("r", function(t) {
            return 1.4 * n.pointSelectR(t);
        }).transition().duration(100).attr("r", c);
    }, L.unselectPoint = function(t, e, i) {
        var n = this;
        n.config.data_onunselected.call(n.api, e, t.node()), n.main.select("." + o.selectedCircles + n.getTargetSelectorSuffix(e.id)).selectAll("." + o.selectedCircle + "-" + i).transition().duration(100).attr("r", 0).remove();
    }, L.togglePoint = function(t, e, i, n) {
        t ? this.selectPoint(e, i, n) : this.unselectPoint(e, i, n);
    }, L.selectPath = function(t, e) {
        var i = this;
        i.config.data_onselected.call(i, e, t.node()), i.config.interaction_brighten && t.transition().duration(100).style("fill", function() {
            return i.d3.rgb(i.color(e)).brighter(.75);
        });
    }, L.unselectPath = function(t, e) {
        var i = this;
        i.config.data_onunselected.call(i, e, t.node()), i.config.interaction_brighten && t.transition().duration(100).style("fill", function() {
            return i.color(e);
        });
    }, L.togglePath = function(t, e, i, n) {
        t ? this.selectPath(e, i, n) : this.unselectPath(e, i, n);
    }, L.getToggle = function(t, e) {
        var i, n = this;
        return "circle" === t.nodeName ? i = n.isStepType(e) ? function() {} : n.togglePoint : "path" === t.nodeName && (i = n.togglePath), 
        i;
    }, L.toggleShape = function(t, e, i) {
        var n = this, a = n.d3, r = n.config, s = a.select(t), c = s.classed(o.SELECTED), d = n.getToggle(t, e).bind(n);
        r.data_selection_enabled && r.data_selection_isselectable(e) && (r.data_selection_multiple || n.main.selectAll("." + o.shapes + (r.data_selection_grouped ? n.getTargetSelectorSuffix(e.id) : "")).selectAll("." + o.shape).each(function(t, e) {
            var i = a.select(this);
            i.classed(o.SELECTED) && d(!1, i.classed(o.SELECTED, !1), t, e);
        }), s.classed(o.SELECTED, !c), d(!c, s, e, i));
    }, L.initBar = function() {
        this.main.select("." + o.chart).append("g").attr("class", o.chartBars);
    }, L.updateTargetsForBar = function(t) {
        var e = this, i = e.config, n = e.classChartBar.bind(e), a = e.classBars.bind(e), r = e.classFocus.bind(e);
        e.main.select("." + o.chartBars).selectAll("." + o.chartBar).data(t).attr("class", function(t) {
            return n(t) + r(t);
        }).enter().append("g").attr("class", n).style("pointer-events", "none").append("g").attr("class", a).style("cursor", function(t) {
            return i.data_selection_isselectable(t) ? "pointer" : null;
        });
    }, L.updateBar = function(t) {
        var e = this, i = e.barData.bind(e), n = e.classBar.bind(e), a = e.initialOpacity.bind(e), r = function(t) {
            return e.color(t.id);
        };
        e.mainBar = e.main.selectAll("." + o.bars).selectAll("." + o.bar).data(i), e.mainBar.enter().append("path").attr("class", n).style("stroke", r).style("fill", r), 
        e.mainBar.style("opacity", a), e.mainBar.exit().transition().duration(t).remove();
    }, L.redrawBar = function(t, e) {
        return [ (e ? this.mainBar.transition(Math.random().toString()) : this.mainBar).attr("d", t).style("stroke", this.color).style("fill", this.color).style("opacity", 1) ];
    }, L.getBarW = function(t, e) {
        var i = this.config, n = "number" == typeof i.bar_width ? i.bar_width : e ? t.tickInterval() * i.bar_width_ratio / e : 0;
        return i.bar_width_max && n > i.bar_width_max ? i.bar_width_max : n;
    }, L.getBars = function(t, e) {
        var i = this;
        return (e ? i.main.selectAll("." + o.bars + i.getTargetSelectorSuffix(e)) : i.main).selectAll("." + o.bar + (u(t) ? "-" + t : ""));
    }, L.expandBars = function(t, e, i) {
        i && this.unexpandBars(), this.getBars(t, e).classed(o.EXPANDED, !0);
    }, L.unexpandBars = function(t) {
        this.getBars(t).classed(o.EXPANDED, !1);
    }, L.generateDrawBar = function(t, e) {
        var n = this.config, a = this.generateGetBarPoints(t, e);
        return function(t, e) {
            var i = a(t, e), r = n.axis_rotated ? 1 : 0, o = n.axis_rotated ? 0 : 1;
            return "M " + i[0][r] + "," + i[0][o] + " L" + i[1][r] + "," + i[1][o] + " L" + i[2][r] + "," + i[2][o] + " L" + i[3][r] + "," + i[3][o] + " z";
        };
    }, L.generateGetBarPoints = function(t, e) {
        var i = this, n = e ? i.subXAxis : i.xAxis, a = t.__max__ + 1, r = i.getBarW(n, a), o = i.getShapeX(r, a, t, !!e), s = i.getShapeY(!!e), c = i.getShapeOffset(i.isBarType, t, !!e), d = r * (i.config.bar_space / 2), l = e ? i.getSubYScale : i.getYScale;
        return function(t, e) {
            var n = l.call(i, t.id)(0), a = c(t, e) || n, u = o(t), h = s(t);
            return i.config.axis_rotated && (0 < t.value && h < n || t.value < 0 && n < h) && (h = n), 
            [ [ u + d, a ], [ u + d, h - (n - a) ], [ u + r - d, h - (n - a) ], [ u + r - d, a ] ];
        };
    }, L.isWithinBar = function(t) {
        var e = this.d3.mouse(t), i = t.getBoundingClientRect(), n = t.pathSegList.getItem(0), a = t.pathSegList.getItem(1), r = Math.min(n.x, a.x), o = Math.min(n.y, a.y), s = r + i.width + 2, c = o + i.height + 2, d = o - 2;
        return r - 2 < e[0] && e[0] < s && d < e[1] && e[1] < c;
    }, L.getShapeIndices = function(t) {
        var e, i, n = this, a = n.config, r = {}, o = 0;
        return n.filterTargetsToShow(n.data.targets.filter(t, n)).forEach(function(t) {
            for (e = 0; e < a.data_groups.length; e++) if (!(a.data_groups[e].indexOf(t.id) < 0)) for (i = 0; i < a.data_groups[e].length; i++) if (a.data_groups[e][i] in r) {
                r[t.id] = r[a.data_groups[e][i]];
                break;
            }
            p(r[t.id]) && (r[t.id] = o++);
        }), r.__max__ = o - 1, r;
    }, L.getShapeX = function(t, e, i, n) {
        var r = n ? this.subX : this.x;
        return function(n) {
            var a = n.id in i ? i[n.id] : 0;
            return n.x || 0 === n.x ? r(n.x) - t * (e / 2 - a) : 0;
        };
    }, L.getShapeY = function(t) {
        var e = this;
        return function(i) {
            return (t ? e.getSubYScale(i.id) : e.getYScale(i.id))(i.value);
        };
    }, L.getShapeOffset = function(t, e, i) {
        var n = this, a = n.orderTargets(n.filterTargetsToShow(n.data.targets.filter(t, n))), r = a.map(function(t) {
            return t.id;
        });
        return function(t, o) {
            var s = i ? n.getSubYScale(t.id) : n.getYScale(t.id), c = s(0), d = c;
            return a.forEach(function(i) {
                var a = n.isStepType(t) ? n.convertValuesToStep(i.values) : i.values;
                i.id !== t.id && e[i.id] === e[t.id] && r.indexOf(i.id) < r.indexOf(t.id) && (void 0 !== a[o] && +a[o].x == +t.x || (o = -1, 
                a.forEach(function(e, i) {
                    e.x === t.x && (o = i);
                })), o in a && 0 <= a[o].value * t.value && (d += s(a[o].value) - c));
            }), d;
        };
    }, L.isWithinShape = function(t, e) {
        var i, n = this, a = n.d3.select(t);
        return n.isTargetToShow(e.id) ? "circle" === t.nodeName ? i = n.isStepType(e) ? n.isWithinStep(t, n.getYScale(e.id)(e.value)) : n.isWithinCircle(t, 1.5 * n.pointSelectR(e)) : "path" === t.nodeName && (i = !a.classed(o.bar) || n.isWithinBar(t)) : i = !1, 
        i;
    }, L.getInterpolate = function(t) {
        var e = this, i = e.isInterpolationType(e.config.spline_interpolation_type) ? e.config.spline_interpolation_type : "cardinal";
        return e.isSplineType(t) ? i : e.isStepType(t) ? e.config.line_step_type : "linear";
    }, L.initLine = function() {
        this.main.select("." + o.chart).append("g").attr("class", o.chartLines);
    }, L.updateTargetsForLine = function(t) {
        var e, i = this, n = i.config, a = i.classChartLine.bind(i), r = i.classLines.bind(i), s = i.classAreas.bind(i), c = i.classCircles.bind(i), d = i.classFocus.bind(i);
        (e = i.main.select("." + o.chartLines).selectAll("." + o.chartLine).data(t).attr("class", function(t) {
            return a(t) + d(t);
        }).enter().append("g").attr("class", a).style("opacity", 0).style("pointer-events", "none")).append("g").attr("class", r), 
        e.append("g").attr("class", s), e.append("g").attr("class", function(t) {
            return i.generateClass(o.selectedCircles, t.id);
        }), e.append("g").attr("class", c).style("cursor", function(t) {
            return n.data_selection_isselectable(t) ? "pointer" : null;
        }), t.forEach(function(t) {
            i.main.selectAll("." + o.selectedCircles + i.getTargetSelectorSuffix(t.id)).selectAll("." + o.selectedCircle).each(function(e) {
                e.value = t.values[e.index].value;
            });
        });
    }, L.updateLine = function(t) {
        var e = this;
        e.mainLine = e.main.selectAll("." + o.lines).selectAll("." + o.line).data(e.lineData.bind(e)), 
        e.mainLine.enter().append("path").attr("class", e.classLine.bind(e)).style("stroke", e.color), 
        e.mainLine.style("opacity", e.initialOpacity.bind(e)).style("shape-rendering", function(t) {
            return e.isStepType(t) ? "crispEdges" : "";
        }).attr("transform", null), e.mainLine.exit().transition().duration(t).style("opacity", 0).remove();
    }, L.redrawLine = function(t, e) {
        return [ (e ? this.mainLine.transition(Math.random().toString()) : this.mainLine).attr("d", t).style("stroke", this.color).style("opacity", 1) ];
    }, L.generateDrawLine = function(t, e) {
        var i = this, n = i.config, a = i.d3.svg.line(), r = i.generateGetLinePoints(t, e), o = e ? i.getSubYScale : i.getYScale, s = function(t) {
            return (e ? i.subxx : i.xx).call(i, t);
        }, c = function(t, e) {
            return 0 < n.data_groups.length ? r(t, e)[0][1] : o.call(i, t.id)(t.value);
        };
        return a = n.axis_rotated ? a.x(c).y(s) : a.x(s).y(c), n.line_connectNull || (a = a.defined(function(t) {
            return null != t.value;
        })), function(t) {
            var s = n.line_connectNull ? i.filterRemoveNull(t.values) : t.values, c = e ? i.x : i.subX, d = o.call(i, t.id), l = 0, u = 0;
            return (i.isLineType(t) ? n.data_regions[t.id] ? i.lineWithRegions(s, c, d, n.data_regions[t.id]) : (i.isStepType(t) && (s = i.convertValuesToStep(s)), 
            a.interpolate(i.getInterpolate(t))(s)) : (s[0] && (l = c(s[0].x), u = d(s[0].value)), 
            n.axis_rotated ? "M " + u + " " + l : "M " + l + " " + u)) || "M 0 0";
        };
    }, L.generateGetLinePoints = function(t, e) {
        var i = this, n = i.config, a = t.__max__ + 1, r = i.getShapeX(0, a, t, !!e), o = i.getShapeY(!!e), s = i.getShapeOffset(i.isLineType, t, !!e), c = e ? i.getSubYScale : i.getYScale;
        return function(t, e) {
            var a = c.call(i, t.id)(0), d = s(t, e) || a, l = r(t), u = o(t);
            return n.axis_rotated && (0 < t.value && u < a || t.value < 0 && a < u) && (u = a), 
            [ [ l, u - (a - d) ], [ l, u - (a - d) ], [ l, u - (a - d) ], [ l, u - (a - d) ] ];
        };
    }, L.lineWithRegions = function(t, e, i, n) {
        function a(t) {
            return "M" + t[0][0] + " " + t[0][1] + " " + t[1][0] + " " + t[1][1];
        }
        var r, o, s, c, d, l, u, h, g, f, x, m = this, y = m.config, S = "M", w = m.isCategorized() ? .5 : 0, v = [];
        if (_(n)) for (r = 0; r < n.length; r++) v[r] = {}, p(n[r].start) ? v[r].start = t[0].x : v[r].start = m.isTimeSeries() ? m.parseDate(n[r].start) : n[r].start, 
        p(n[r].end) ? v[r].end = t[t.length - 1].x : v[r].end = m.isTimeSeries() ? m.parseDate(n[r].end) : n[r].end;
        for (f = y.axis_rotated ? function(t) {
            return i(t.value);
        } : function(t) {
            return e(t.x);
        }, x = y.axis_rotated ? function(t) {
            return e(t.x);
        } : function(t) {
            return i(t.value);
        }, s = m.isTimeSeries() ? function(t, n, r, o) {
            var c = t.x.getTime(), l = n.x - t.x, u = new Date(c + l * r), h = new Date(c + l * (r + o));
            return a(y.axis_rotated ? [ [ i(d(r)), e(u) ], [ i(d(r + o)), e(h) ] ] : [ [ e(u), i(d(r)) ], [ e(h), i(d(r + o)) ] ]);
        } : function(t, n, r, o) {
            return a(y.axis_rotated ? [ [ i(d(r), !0), e(c(r)) ], [ i(d(r + o), !0), e(c(r + o)) ] ] : [ [ e(c(r), !0), i(d(r)) ], [ e(c(r + o), !0), i(d(r + o)) ] ]);
        }, r = 0; r < t.length; r++) {
            if (p(v) || !function(t, e) {
                var i;
                for (i = 0; i < e.length; i++) if (e[i].start < t && t <= e[i].end) return !0;
                return !1;
            }(t[r].x, v)) S += " " + f(t[r]) + " " + x(t[r]); else for (c = m.getScale(t[r - 1].x + w, t[r].x + w, m.isTimeSeries()), 
            d = m.getScale(t[r - 1].value, t[r].value), l = e(t[r].x) - e(t[r - 1].x), u = i(t[r].value) - i(t[r - 1].value), 
            g = 2 * (h = 2 / Math.sqrt(Math.pow(l, 2) + Math.pow(u, 2))), o = h; o <= 1; o += g) S += s(t[r - 1], t[r], o, h);
            t[r].x;
        }
        return S;
    }, L.updateArea = function(t) {
        var e = this, i = e.d3;
        e.mainArea = e.main.selectAll("." + o.areas).selectAll("." + o.area).data(e.lineData.bind(e)), 
        e.mainArea.enter().append("path").attr("class", e.classArea.bind(e)).style("fill", e.color).style("opacity", function() {
            return e.orgAreaOpacity = +i.select(this).style("opacity"), 0;
        }), e.mainArea.style("opacity", e.orgAreaOpacity), e.mainArea.exit().transition().duration(t).style("opacity", 0).remove();
    }, L.redrawArea = function(t, e) {
        return [ (e ? this.mainArea.transition(Math.random().toString()) : this.mainArea).attr("d", t).style("fill", this.color).style("opacity", this.orgAreaOpacity) ];
    }, L.generateDrawArea = function(t, e) {
        var i = this, n = i.config, a = i.d3.svg.area(), r = i.generateGetAreaPoints(t, e), o = e ? i.getSubYScale : i.getYScale, s = function(t) {
            return (e ? i.subxx : i.xx).call(i, t);
        }, c = function(t, e) {
            return 0 < n.data_groups.length ? r(t, e)[0][1] : o.call(i, t.id)(i.getAreaBaseValue(t.id));
        }, d = function(t, e) {
            return 0 < n.data_groups.length ? r(t, e)[1][1] : o.call(i, t.id)(t.value);
        };
        return a = n.axis_rotated ? a.x0(c).x1(d).y(s) : a.x(s).y0(n.area_above ? 0 : c).y1(d), 
        n.line_connectNull || (a = a.defined(function(t) {
            return null !== t.value;
        })), function(t) {
            var r = n.line_connectNull ? i.filterRemoveNull(t.values) : t.values, o = 0, s = 0;
            return (i.isAreaType(t) ? (i.isStepType(t) && (r = i.convertValuesToStep(r)), a.interpolate(i.getInterpolate(t))(r)) : (r[0] && (o = i.x(r[0].x), 
            s = i.getYScale(t.id)(r[0].value)), n.axis_rotated ? "M " + s + " " + o : "M " + o + " " + s)) || "M 0 0";
        };
    }, L.getAreaBaseValue = function() {
        return 0;
    }, L.generateGetAreaPoints = function(t, e) {
        var i = this, n = i.config, a = t.__max__ + 1, r = i.getShapeX(0, a, t, !!e), o = i.getShapeY(!!e), s = i.getShapeOffset(i.isAreaType, t, !!e), c = e ? i.getSubYScale : i.getYScale;
        return function(t, e) {
            var a = c.call(i, t.id)(0), d = s(t, e) || a, l = r(t), u = o(t);
            return n.axis_rotated && (0 < t.value && u < a || t.value < 0 && a < u) && (u = a), 
            [ [ l, d ], [ l, u - (a - d) ], [ l, u - (a - d) ], [ l, d ] ];
        };
    }, L.updateCircle = function() {
        var t = this;
        t.mainCircle = t.main.selectAll("." + o.circles).selectAll("." + o.circle).data(t.lineOrScatterData.bind(t)), 
        t.mainCircle.enter().append("circle").attr("class", t.classCircle.bind(t)).attr("r", t.pointR.bind(t)).style("fill", t.color), 
        t.mainCircle.style("opacity", t.initialOpacityForCircle.bind(t)), t.mainCircle.exit().remove();
    }, L.redrawCircle = function(t, e, i) {
        var n = this.main.selectAll("." + o.selectedCircle);
        return [ (i ? this.mainCircle.transition(Math.random().toString()) : this.mainCircle).style("opacity", this.opacityForCircle.bind(this)).style("fill", this.color).attr("cx", t).attr("cy", e), (i ? n.transition(Math.random().toString()) : n).attr("cx", t).attr("cy", e) ];
    }, L.circleX = function(t) {
        return t.x || 0 === t.x ? this.x(t.x) : null;
    }, L.updateCircleY = function() {
        var t, e, i = this;
        0 < i.config.data_groups.length ? (t = i.getShapeIndices(i.isLineType), e = i.generateGetLinePoints(t), 
        i.circleY = function(t, i) {
            return e(t, i)[0][1];
        }) : i.circleY = function(t) {
            return i.getYScale(t.id)(t.value);
        };
    }, L.getCircles = function(t, e) {
        var i = this;
        return (e ? i.main.selectAll("." + o.circles + i.getTargetSelectorSuffix(e)) : i.main).selectAll("." + o.circle + (u(t) ? "-" + t : ""));
    }, L.expandCircles = function(t, e, i) {
        var n = this, a = n.pointExpandedR.bind(n);
        i && n.unexpandCircles(), n.getCircles(t, e).classed(o.EXPANDED, !0).attr("r", a);
    }, L.unexpandCircles = function(t) {
        var e = this, i = e.pointR.bind(e);
        e.getCircles(t).filter(function() {
            return e.d3.select(this).classed(o.EXPANDED);
        }).classed(o.EXPANDED, !1).attr("r", i);
    }, L.pointR = function(t) {
        var i = this.config;
        return this.isStepType(t) ? 0 : h(i.point_r) ? i.point_r(t) : i.point_r;
    }, L.pointExpandedR = function(t) {
        var e = this, i = e.config;
        return i.point_focus_expand_enabled ? h(i.point_focus_expand_r) ? i.point_focus_expand_r(t) : i.point_focus_expand_r ? i.point_focus_expand_r : 1.75 * e.pointR(t) : e.pointR(t);
    }, L.pointSelectR = function(t) {
        var i = this.config;
        return h(i.point_select_r) ? i.point_select_r(t) : i.point_select_r ? i.point_select_r : 4 * this.pointR(t);
    }, L.isWithinCircle = function(t, e) {
        var i = this.d3, n = i.mouse(t), a = i.select(t), r = +a.attr("cx"), o = +a.attr("cy");
        return Math.sqrt(Math.pow(r - n[0], 2) + Math.pow(o - n[1], 2)) < e;
    }, L.isWithinStep = function(t, e) {
        return Math.abs(e - this.d3.mouse(t)[1]) < 30;
    }, L.getCurrentWidth = function() {
        var e = this.config;
        return e.size_width ? e.size_width : this.getParentWidth();
    }, L.getCurrentHeight = function() {
        var t = this, e = t.config, i = e.size_height ? e.size_height : t.getParentHeight();
        return 0 < i ? i : 320 / (t.hasType("gauge") && !e.gauge_fullCircle ? 2 : 1);
    }, L.getCurrentPaddingTop = function() {
        var t = this, e = t.config, i = u(e.padding_top) ? e.padding_top : 0;
        return t.title && t.title.node() && (i += t.getTitlePadding()), i;
    }, L.getCurrentPaddingBottom = function() {
        var t = this.config;
        return u(t.padding_bottom) ? t.padding_bottom : 0;
    }, L.getCurrentPaddingLeft = function(t) {
        var e = this, i = e.config;
        return u(i.padding_left) ? i.padding_left : i.axis_rotated ? i.axis_x_show ? Math.max(x(e.getAxisWidthByAxisId("x", t)), 40) : 1 : !i.axis_y_show || i.axis_y_inner ? e.axis.getYAxisLabelPosition().isOuter ? 30 : 1 : x(e.getAxisWidthByAxisId("y", t));
    }, L.getCurrentPaddingRight = function() {
        var t = this, e = t.config, i = t.isLegendRight ? t.getLegendWidth() + 20 : 0;
        return u(e.padding_right) ? e.padding_right + 1 : e.axis_rotated ? 10 + i : !e.axis_y2_show || e.axis_y2_inner ? 2 + i + (t.axis.getY2AxisLabelPosition().isOuter ? 20 : 0) : x(t.getAxisWidthByAxisId("y2")) + i;
    }, L.getParentRectValue = function(t) {
        for (var e, i = this.selectChart.node(); i && "BODY" !== i.tagName; ) {
            try {
                e = i.getBoundingClientRect()[t];
            } catch (n) {
                "width" === t && (e = i.offsetWidth);
            }
            if (e) break;
            i = i.parentNode;
        }
        return e;
    }, L.getParentWidth = function() {
        return this.getParentRectValue("width");
    }, L.getParentHeight = function() {
        var t = this.selectChart.style("height");
        return 0 < t.indexOf("px") ? +t.replace("px", "") : 0;
    }, L.getSvgLeft = function(t) {
        var e = this, i = e.config, n = i.axis_rotated || !i.axis_rotated && !i.axis_y_inner, a = i.axis_rotated ? o.axisX : o.axisY, r = e.main.select("." + a).node(), s = r && n ? r.getBoundingClientRect() : {
            right: 0
        }, c = e.selectChart.node().getBoundingClientRect(), d = e.hasArcType(), l = s.right - c.left - (d ? 0 : e.getCurrentPaddingLeft(t));
        return 0 < l ? l : 0;
    }, L.getAxisWidthByAxisId = function(t, e) {
        var n = this.axis.getLabelPositionById(t);
        return this.axis.getMaxTickWidth(t, e) + (n.isInner ? 20 : 40);
    }, L.getHorizontalAxisHeight = function(t) {
        var e = this, i = e.config, n = 30;
        return "x" !== t || i.axis_x_show ? "x" === t && i.axis_x_height ? i.axis_x_height : "y" !== t || i.axis_y_show ? "y2" !== t || i.axis_y2_show ? ("x" === t && !i.axis_rotated && i.axis_x_tick_rotate && (n = 30 + e.axis.getMaxTickWidth(t) * Math.cos(Math.PI * (90 - i.axis_x_tick_rotate) / 180)), 
        "y" === t && i.axis_rotated && i.axis_y_tick_rotate && (n = 30 + e.axis.getMaxTickWidth(t) * Math.cos(Math.PI * (90 - i.axis_y_tick_rotate) / 180)), 
        n + (e.axis.getLabelPositionById(t).isInner ? 0 : 10) + ("y2" === t ? -10 : 0)) : e.rotated_padding_top : !i.legend_show || e.isLegendRight || e.isLegendInset ? 1 : 10 : 8;
    }, L.getEventRectWidth = function() {
        return Math.max(0, this.xAxis.tickInterval());
    }, L.initBrush = function() {
        var t = this, e = t.d3;
        t.brush = e.svg.brush().on("brush", function() {
            t.redrawForBrush();
        }), t.brush.update = function() {
            return t.context && t.context.select("." + o.brush).call(this), this;
        }, t.brush.scale = function(e) {
            return t.config.axis_rotated ? this.y(e) : this.x(e);
        };
    }, L.initSubchart = function() {
        var t = this, e = t.config, i = t.context = t.svg.append("g").attr("transform", t.getTranslate("context")), n = e.subchart_show ? "visible" : "hidden";
        i.style("visibility", n), i.append("g").attr("clip-path", t.clipPathForSubchart).attr("class", o.chart), 
        i.select("." + o.chart).append("g").attr("class", o.chartBars), i.select("." + o.chart).append("g").attr("class", o.chartLines), 
        i.append("g").attr("clip-path", t.clipPath).attr("class", o.brush).call(t.brush), 
        t.axes.subx = i.append("g").attr("class", o.axisX).attr("transform", t.getTranslate("subx")).attr("clip-path", e.axis_rotated ? "" : t.clipPathForXAxis).style("visibility", e.subchart_axis_x_show ? n : "hidden");
    }, L.updateTargetsForSubchart = function(t) {
        var e, i = this, n = i.context, a = i.config, r = i.classChartBar.bind(i), s = i.classBars.bind(i), c = i.classChartLine.bind(i), d = i.classLines.bind(i), l = i.classAreas.bind(i);
        a.subchart_show && (n.select("." + o.chartBars).selectAll("." + o.chartBar).data(t).attr("class", r).enter().append("g").style("opacity", 0).attr("class", r).append("g").attr("class", s), 
        (e = n.select("." + o.chartLines).selectAll("." + o.chartLine).data(t).attr("class", c).enter().append("g").style("opacity", 0).attr("class", c)).append("g").attr("class", d), 
        e.append("g").attr("class", l), n.selectAll("." + o.brush + " rect").attr(a.axis_rotated ? "width" : "height", a.axis_rotated ? i.width2 : i.height2));
    }, L.updateBarForSubchart = function(t) {
        var e = this;
        e.contextBar = e.context.selectAll("." + o.bars).selectAll("." + o.bar).data(e.barData.bind(e)), 
        e.contextBar.enter().append("path").attr("class", e.classBar.bind(e)).style("stroke", "none").style("fill", e.color), 
        e.contextBar.style("opacity", e.initialOpacity.bind(e)), e.contextBar.exit().transition().duration(t).style("opacity", 0).remove();
    }, L.redrawBarForSubchart = function(t, e, i) {
        (e ? this.contextBar.transition(Math.random().toString()).duration(i) : this.contextBar).attr("d", t).style("opacity", 1);
    }, L.updateLineForSubchart = function(t) {
        var e = this;
        e.contextLine = e.context.selectAll("." + o.lines).selectAll("." + o.line).data(e.lineData.bind(e)), 
        e.contextLine.enter().append("path").attr("class", e.classLine.bind(e)).style("stroke", e.color), 
        e.contextLine.style("opacity", e.initialOpacity.bind(e)), e.contextLine.exit().transition().duration(t).style("opacity", 0).remove();
    }, L.redrawLineForSubchart = function(t, e, i) {
        (e ? this.contextLine.transition(Math.random().toString()).duration(i) : this.contextLine).attr("d", t).style("opacity", 1);
    }, L.updateAreaForSubchart = function(t) {
        var e = this, i = e.d3;
        e.contextArea = e.context.selectAll("." + o.areas).selectAll("." + o.area).data(e.lineData.bind(e)), 
        e.contextArea.enter().append("path").attr("class", e.classArea.bind(e)).style("fill", e.color).style("opacity", function() {
            return e.orgAreaOpacity = +i.select(this).style("opacity"), 0;
        }), e.contextArea.style("opacity", 0), e.contextArea.exit().transition().duration(t).style("opacity", 0).remove();
    }, L.redrawAreaForSubchart = function(t, e, i) {
        (e ? this.contextArea.transition(Math.random().toString()).duration(i) : this.contextArea).attr("d", t).style("fill", this.color).style("opacity", this.orgAreaOpacity);
    }, L.redrawSubchart = function(t, e, i, n, a, r, o) {
        var s, c, d, l = this, u = l.d3, h = l.config;
        l.context.style("visibility", h.subchart_show ? "visible" : "hidden"), h.subchart_show && (u.event && "zoom" === u.event.type && l.brush.extent(l.x.orgDomain()).update(), 
        t && (l.brush.empty() || l.brush.extent(l.x.orgDomain()).update(), s = l.generateDrawArea(a, !0), 
        c = l.generateDrawBar(r, !0), d = l.generateDrawLine(o, !0), l.updateBarForSubchart(i), 
        l.updateLineForSubchart(i), l.updateAreaForSubchart(i), l.redrawBarForSubchart(c, i, i), 
        l.redrawLineForSubchart(d, i, i), l.redrawAreaForSubchart(s, i, i)));
    }, L.redrawForBrush = function() {
        var t = this, e = t.x;
        t.redraw({
            withTransition: !1,
            withY: t.config.zoom_rescale,
            withSubchart: !1,
            withUpdateXDomain: !0,
            withDimension: !1
        }), t.config.subchart_onbrush.call(t.api, e.orgDomain());
    }, L.transformContext = function(t, e) {
        var i, n = this;
        e && e.axisSubX ? i = e.axisSubX : (i = n.context.select("." + o.axisX), t && (i = i.transition())), 
        n.context.attr("transform", n.getTranslate("context")), i.attr("transform", n.getTranslate("subx"));
    }, L.getDefaultExtent = function() {
        var t = this, e = t.config, i = h(e.axis_x_extent) ? e.axis_x_extent(t.getXDomain(t.data.targets)) : e.axis_x_extent;
        return t.isTimeSeries() && (i = [ t.parseDate(i[0]), t.parseDate(i[1]) ]), i;
    }, L.initText = function() {
        var t = this;
        t.main.select("." + o.chart).append("g").attr("class", o.chartTexts), t.mainText = t.d3.selectAll([]);
    }, L.updateTargetsForText = function(t) {
        var e = this, i = e.classChartText.bind(e), n = e.classTexts.bind(e), a = e.classFocus.bind(e);
        e.main.select("." + o.chartTexts).selectAll("." + o.chartText).data(t).attr("class", function(t) {
            return i(t) + a(t);
        }).enter().append("g").attr("class", i).style("opacity", 0).style("pointer-events", "none").append("g").attr("class", n);
    }, L.updateText = function(t) {
        var e = this, i = e.config, n = e.barOrLineData.bind(e), a = e.classText.bind(e);
        e.mainText = e.main.selectAll("." + o.texts).selectAll("." + o.text).data(n), e.mainText.enter().append("text").attr("class", a).attr("text-anchor", function(t) {
            return i.axis_rotated ? t.value < 0 ? "end" : "start" : "middle";
        }).style("stroke", "none").style("fill", function(t) {
            return e.color(t);
        }).style("fill-opacity", 0), e.mainText.text(function(t, i, n) {
            return e.dataLabelFormat(t.id)(t.value, t.id, i, n);
        }), e.mainText.exit().transition().duration(t).style("fill-opacity", 0).remove();
    }, L.redrawText = function(t, e, i, n) {
        return [ (n ? this.mainText.transition() : this.mainText).attr("x", t).attr("y", e).style("fill", this.color).style("fill-opacity", i ? 0 : this.opacityForText.bind(this)) ];
    }, L.getTextRect = function(t, e, i) {
        var n, a = this.d3.select("body").append("div").classed("c3", !0), r = a.append("svg").style("visibility", "hidden").style("position", "fixed").style("top", 0).style("left", 0), o = this.d3.select(i).style("font");
        return r.selectAll(".dummy").data([ t ]).enter().append("text").classed(e || "", !0).style("font", o).text(t).each(function() {
            n = this.getBoundingClientRect();
        }), a.remove(), n;
    }, L.generateXYForText = function(t, e, i, n) {
        var a = this, r = a.generateGetAreaPoints(t, !1), o = a.generateGetBarPoints(e, !1), s = a.generateGetLinePoints(i, !1), c = n ? a.getXForText : a.getYForText;
        return function(t, e) {
            var i = a.isAreaType(t) ? r : a.isBarType(t) ? o : s;
            return c.call(a, i(t, e), t, this);
        };
    }, L.getXForText = function(t, e, i) {
        var n, a, r = this, o = i.getBoundingClientRect();
        return n = r.config.axis_rotated ? (a = r.isBarType(e) ? 4 : 6, t[2][1] + a * (e.value < 0 ? -1 : 1)) : r.hasType("bar") ? (t[2][0] + t[0][0]) / 2 : t[0][0], 
        null === e.value && (n > r.width ? n = r.width - o.width : n < 0 && (n = 4)), n;
    }, L.getYForText = function(t, e, i) {
        var n, a = this, r = i.getBoundingClientRect();
        return a.config.axis_rotated ? n = (t[0][0] + t[2][0] + .6 * r.height) / 2 : (n = t[2][1], 
        e.value < 0 || 0 === e.value && !a.hasPositiveValue ? (n += r.height, a.isBarType(e) && a.isSafari() ? n -= 3 : !a.isBarType(e) && a.isChrome() && (n += 3)) : n += a.isBarType(e) ? -3 : -6), 
        null !== e.value || a.config.axis_rotated || (n < r.height ? n = r.height : n > this.height && (n = this.height - 4)), 
        n;
    }, L.initTitle = function() {
        var t = this;
        t.title = t.svg.append("text").text(t.config.title_text).attr("class", t.CLASS.title);
    }, L.redrawTitle = function() {
        var t = this;
        t.title.attr("x", t.xForTitle.bind(t)).attr("y", t.yForTitle.bind(t));
    }, L.xForTitle = function() {
        var t = this, e = t.config, i = e.title_position || "left";
        return 0 <= i.indexOf("right") ? t.currentWidth - t.getTextRect(t.title.node().textContent, t.CLASS.title, t.title.node()).width - e.title_padding.right : 0 <= i.indexOf("center") ? (t.currentWidth - t.getTextRect(t.title.node().textContent, t.CLASS.title, t.title.node()).width) / 2 : e.title_padding.left;
    }, L.yForTitle = function() {
        var t = this;
        return t.config.title_padding.top + t.getTextRect(t.title.node().textContent, t.CLASS.title, t.title.node()).height;
    }, L.getTitlePadding = function() {
        return this.yForTitle() + this.config.title_padding.bottom;
    }, L.initTooltip = function() {
        var t, e = this, i = e.config;
        if (e.tooltip = e.selectChart.style("position", "relative").append("div").attr("class", o.tooltipContainer).style("position", "absolute").style("pointer-events", "none").style("display", "none"), 
        i.tooltip_init_show) {
            if (e.isTimeSeries() && f(i.tooltip_init_x)) {
                for (i.tooltip_init_x = e.parseDate(i.tooltip_init_x), t = 0; t < e.data.targets[0].values.length && e.data.targets[0].values[t].x - i.tooltip_init_x != 0; t++) ;
                i.tooltip_init_x = t;
            }
            e.tooltip.html(i.tooltip_contents.call(e, e.data.targets.map(function(t) {
                return e.addName(t.values[i.tooltip_init_x]);
            }), e.axis.getXAxisTickFormat(), e.getYFormat(e.hasArcType()), e.color)), e.tooltip.style("top", i.tooltip_init_position.top).style("left", i.tooltip_init_position.left).style("display", "block");
        }
    }, L.getTooltipSortFunction = function() {
        var t = this, e = t.config;
        if (0 !== e.data_groups.length && void 0 === e.tooltip_order) {
            var i = t.orderTargets(t.data.targets).map(function(t) {
                return t.id;
            });
            return (t.isOrderAsc() || t.isOrderDesc()) && (i = i.reverse()), function(t, e) {
                return i.indexOf(t.id) - i.indexOf(e.id);
            };
        }
        var n = e.tooltip_order;
        void 0 === n && (n = e.data_order);
        var a = function(t) {
            return t ? t.value : null;
        };
        if (f(n) && "asc" === n.toLowerCase()) return function(t, e) {
            return a(t) - a(e);
        };
        if (f(n) && "desc" === n.toLowerCase()) return function(t, e) {
            return a(e) - a(t);
        };
        if (h(n)) {
            var r = n;
            return void 0 === e.tooltip_order && (r = function(t, e) {
                return n(t ? {
                    id: t.id,
                    values: [ t ]
                } : null, e ? {
                    id: e.id,
                    values: [ e ]
                } : null);
            }), r;
        }
        return g(n) ? function(t, e) {
            return n.indexOf(t.id) - n.indexOf(e.id);
        } : void 0;
    }, L.getTooltipContent = function(t, e, i, n) {
        var a, r, o, s, c, d, l = this, u = l.config, h = u.tooltip_format_title || e, g = u.tooltip_format_name || function(t) {
            return t;
        }, f = u.tooltip_format_value || i, p = this.getTooltipSortFunction();
        for (p && t.sort(p), r = 0; r < t.length; r++) if (t[r] && (t[r].value || 0 === t[r].value) && (a || (o = T(h ? h(t[r].x) : t[r].x), 
        a = "<table class='" + l.CLASS.tooltip + "'>" + (o || 0 === o ? "<tr><th colspan='2'>" + o + "</th></tr>" : "")), 
        void 0 !== (s = T(f(t[r].value, t[r].ratio, t[r].id, t[r].index, t))))) {
            if (null === t[r].name) continue;
            c = T(g(t[r].name, t[r].ratio, t[r].id, t[r].index)), d = l.levelColor ? l.levelColor(t[r].value) : n(t[r].id), 
            a += "<tr class='" + l.CLASS.tooltipName + "-" + l.getTargetSelectorSuffix(t[r].id) + "'>", 
            a += "<td class='name'><span style='background-color:" + d + "'></span>" + c + "</td>", 
            a += "<td class='value'>" + s + "</td>", a += "</tr>";
        }
        return a + "</table>";
    }, L.tooltipPosition = function(t, e, i, n) {
        var a, r, o, s, c, d = this, l = d.config, u = d.d3, h = d.hasArcType(), g = u.mouse(n);
        return h ? (r = (d.width - (d.isLegendRight ? d.getLegendWidth() : 0)) / 2 + g[0], 
        s = d.height / 2 + g[1] + 20) : (a = d.getSvgLeft(!0), s = l.axis_rotated ? (o = (r = a + g[0] + 100) + e, 
        c = d.currentWidth - d.getCurrentPaddingRight(), d.x(t[0].x) + 20) : (o = (r = a + d.getCurrentPaddingLeft(!0) + d.x(t[0].x) + 20) + e, 
        c = a + d.currentWidth - d.getCurrentPaddingRight(), g[1] + 15), c < o && (r -= o - c + 20), 
        s + i > d.currentHeight && (s -= i + 30)), s < 0 && (s = 0), {
            top: s,
            left: r
        };
    }, L.showTooltip = function(t, e) {
        var i, n, a, r = this, o = r.config, s = r.hasArcType(), c = t.filter(function(t) {
            return t && u(t.value);
        }), d = o.tooltip_position || L.tooltipPosition;
        0 !== c.length && o.tooltip_show && (r.tooltip.html(o.tooltip_contents.call(r, t, r.axis.getXAxisTickFormat(), r.getYFormat(s), r.color)).style("display", "block"), 
        i = r.tooltip.property("offsetWidth"), n = r.tooltip.property("offsetHeight"), a = d.call(this, c, i, n, e), 
        r.tooltip.style("top", a.top + "px").style("left", a.left + "px"));
    }, L.hideTooltip = function() {
        this.tooltip.style("display", "none");
    }, L.setTargetType = function(t, e) {
        var i = this, n = i.config;
        i.mapToTargetIds(t).forEach(function(t) {
            i.withoutFadeIn[t] = e === n.data_types[t], n.data_types[t] = e;
        }), t || (n.data_type = e);
    }, L.hasType = function(t, e) {
        var i = this, n = i.config.data_types, a = !1;
        return (e = e || i.data.targets) && e.length ? e.forEach(function(e) {
            var i = n[e.id];
            (i && 0 <= i.indexOf(t) || !i && "line" === t) && (a = !0);
        }) : Object.keys(n).length ? Object.keys(n).forEach(function(e) {
            n[e] === t && (a = !0);
        }) : a = i.config.data_type === t, a;
    }, L.hasArcType = function(t) {
        return this.hasType("pie", t) || this.hasType("donut", t) || this.hasType("gauge", t);
    }, L.isLineType = function(t) {
        var e = this.config, i = f(t) ? t : t.id;
        return !e.data_types[i] || 0 <= [ "line", "spline", "area", "area-spline", "step", "area-step" ].indexOf(e.data_types[i]);
    }, L.isStepType = function(t) {
        var e = f(t) ? t : t.id;
        return 0 <= [ "step", "area-step" ].indexOf(this.config.data_types[e]);
    }, L.isSplineType = function(t) {
        var e = f(t) ? t : t.id;
        return 0 <= [ "spline", "area-spline" ].indexOf(this.config.data_types[e]);
    }, L.isAreaType = function(t) {
        var e = f(t) ? t : t.id;
        return 0 <= [ "area", "area-spline", "area-step" ].indexOf(this.config.data_types[e]);
    }, L.isBarType = function(t) {
        var e = f(t) ? t : t.id;
        return "bar" === this.config.data_types[e];
    }, L.isScatterType = function(t) {
        var e = f(t) ? t : t.id;
        return "scatter" === this.config.data_types[e];
    }, L.isPieType = function(t) {
        var e = f(t) ? t : t.id;
        return "pie" === this.config.data_types[e];
    }, L.isGaugeType = function(t) {
        var e = f(t) ? t : t.id;
        return "gauge" === this.config.data_types[e];
    }, L.isDonutType = function(t) {
        var e = f(t) ? t : t.id;
        return "donut" === this.config.data_types[e];
    }, L.isArcType = function(t) {
        return this.isPieType(t) || this.isDonutType(t) || this.isGaugeType(t);
    }, L.lineData = function(t) {
        return this.isLineType(t) ? [ t ] : [];
    }, L.arcData = function(t) {
        return this.isArcType(t.data) ? [ t ] : [];
    }, L.barData = function(t) {
        return this.isBarType(t) ? t.values : [];
    }, L.lineOrScatterData = function(t) {
        return this.isLineType(t) || this.isScatterType(t) ? t.values : [];
    }, L.barOrLineData = function(t) {
        return this.isBarType(t) || this.isLineType(t) ? t.values : [];
    }, L.isInterpolationType = function(t) {
        return 0 <= [ "linear", "linear-closed", "basis", "basis-open", "basis-closed", "bundle", "cardinal", "cardinal-open", "cardinal-closed", "monotone" ].indexOf(t);
    }, L.isSafari = function() {
        var t = window.navigator.userAgent;
        return 0 <= t.indexOf("Safari") && t.indexOf("Chrome") < 0;
    }, L.isChrome = function() {
        return 0 <= window.navigator.userAgent.indexOf("Chrome");
    }, L.initZoom = function() {
        var t, e = this, i = e.d3, n = e.config;
        e.zoom = i.behavior.zoom().on("zoomstart", function() {
            t = i.event.sourceEvent, e.zoom.altDomain = i.event.sourceEvent.altKey ? e.x.orgDomain() : null, 
            n.zoom_onzoomstart.call(e.api, i.event.sourceEvent);
        }).on("zoom", function() {
            e.redrawForZoom.call(e);
        }).on("zoomend", function() {
            var a = i.event.sourceEvent;
            a && t.clientX === a.clientX && t.clientY === a.clientY || (e.redrawEventRect(), 
            e.updateZoom(), n.zoom_onzoomend.call(e.api, e.x.orgDomain()));
        }), e.zoom.scale = function(t) {
            return n.axis_rotated ? this.y(t) : this.x(t);
        }, e.zoom.orgScaleExtent = function() {
            var t = n.zoom_extent ? n.zoom_extent : [ 1, 10 ];
            return [ t[0], Math.max(e.getMaxDataCount() / t[1], t[1]) ];
        }, e.zoom.updateScaleExtent = function() {
            var t = y(e.x.orgDomain()) / y(e.getZoomDomain()), i = this.orgScaleExtent();
            return this.scaleExtent([ i[0] * t, i[1] * t ]), this;
        };
    }, L.getZoomDomain = function() {
        var t = this, e = t.config, i = t.d3;
        return [ i.min([ t.orgXDomain[0], e.zoom_x_min ]), i.max([ t.orgXDomain[1], e.zoom_x_max ]) ];
    }, L.updateZoom = function() {
        var t = this, e = t.config.zoom_enabled ? t.zoom : function() {};
        t.main.select("." + o.zoomRect).call(e).on("dblclick.zoom", null), t.main.selectAll("." + o.eventRect).call(e).on("dblclick.zoom", null);
    }, L.redrawForZoom = function() {
        var t = this, e = t.d3, i = t.config, n = t.zoom, a = t.x;
        if (i.zoom_enabled && 0 !== t.filterTargetsToShow(t.data.targets).length) {
            if ("mousemove" === e.event.sourceEvent.type && n.altDomain) return a.domain(n.altDomain), 
            void n.scale(a).updateScaleExtent();
            t.isCategorized() && a.orgDomain()[0] === t.orgXDomain[0] && a.domain([ t.orgXDomain[0] - 1e-10, a.orgDomain()[1] ]), 
            t.redraw({
                withTransition: !1,
                withY: i.zoom_rescale,
                withSubchart: !1,
                withEventRect: !1,
                withDimension: !1
            }), "mousemove" === e.event.sourceEvent.type && (t.cancelClick = !0), i.zoom_onzoom.call(t.api, a.orgDomain());
        }
    }, V;
});