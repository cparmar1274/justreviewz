!function(t) {
    var i = {
        tooltip: {
            show: !1,
            cssClass: "flotTip",
            content: "%s | X: %x | Y: %y",
            xDateFormat: null,
            yDateFormat: null,
            monthNames: null,
            dayNames: null,
            shifts: {
                x: 10,
                y: 20
            },
            defaultTheme: !0,
            snap: !0,
            lines: !1,
            clickTips: !1,
            onHover: function(t, i) {},
            $compat: !1
        }
    };
    i.tooltipOpts = i.tooltip;
    var o = function(t) {
        this.tipPosition = {
            x: 0,
            y: 0
        }, this.init(t);
    };
    o.prototype.init = function(i) {
        function o(t) {
            var o = {};
            o.x = t.pageX, o.y = t.pageY, i.setTooltipPosition(o);
        }
        function e(o, e, n) {
            a.clickmode ? (t(i.getPlaceholder()).bind("plothover", s), i.hideTooltip(), a.clickmode = !1) : (s(o, e, n), 
            a.getDomElement().is(":visible") && (t(i.getPlaceholder()).unbind("plothover", s), 
            a.clickmode = !0));
        }
        function s(o, e, s) {
            var n = function(t, i, o, e) {
                return Math.sqrt((o - t) * (o - t) + (e - i) * (e - i));
            };
            if (s) i.showTooltip(s, a.tooltipOptions.snap ? s : e); else if (a.plotOptions.series.lines.show && !0 === a.tooltipOptions.lines) {
                var r = a.plotOptions.grid.mouseActiveRadius, l = {
                    distance: r + 1
                }, d = e;
                t.each(i.getData(), function(t, o) {
                    for (var s = 0, r = -1, c = 1; c < o.data.length; c++) o.data[c - 1][0] <= e.x && o.data[c][0] >= e.x && (s = c - 1, 
                    r = c);
                    if (-1 !== r) {
                        var x = {
                            x: o.data[s][0],
                            y: o.data[s][1]
                        }, h = {
                            x: o.data[r][0],
                            y: o.data[r][1]
                        }, u = function(t, i, o, e, s, a, p) {
                            if (!p || (p = function(t, i, o, e, s, a) {
                                if (void 0 !== o) return {
                                    x: o,
                                    y: i
                                };
                                if (void 0 !== e) return {
                                    x: t,
                                    y: e
                                };
                                var n, p = -1 / ((a - e) / (s - o));
                                return {
                                    x: n = (s * (t * p - i + e) + o * (t * -p + i - a)) / (p * (s - o) + e - a),
                                    y: p * n - p * t + i
                                };
                            }(t, i, o, e, s, a)).x >= Math.min(o, s) && p.x <= Math.max(o, s) && p.y >= Math.min(e, a) && p.y <= Math.max(e, a)) {
                                var r = e - a, l = s - o, d = o * a - e * s;
                                return Math.abs(r * t + l * i + d) / Math.sqrt(r * r + l * l);
                            }
                            var c = n(t, i, o, e), x = n(t, i, s, a);
                            return x < c ? x : c;
                        }(o.xaxis.p2c(e.x), o.yaxis.p2c(e.y), o.xaxis.p2c(x.x), o.yaxis.p2c(x.y), o.xaxis.p2c(h.x), o.yaxis.p2c(h.y), !1);
                        if (u < l.distance) {
                            var m = n(x.x, x.y, e.x, e.y) < n(e.x, e.y, h.x, h.y) ? s : r, y = (o.datapoints.pointsize, 
                            [ e.x, x.y + (h.y - x.y) * ((e.x - x.x) / (h.x - x.x)) ]);
                            l = {
                                distance: u,
                                item: {
                                    datapoint: y,
                                    dataIndex: m,
                                    series: o,
                                    seriesIndex: t
                                }
                            }, a.tooltipOptions.snap && (d = {
                                pageX: o.xaxis.p2c(y[0]),
                                pageY: o.yaxis.p2c(y[1])
                            });
                        }
                    } else i.hideTooltip();
                }), l.distance < r + 1 ? i.showTooltip(l.item, d) : i.hideTooltip();
            } else i.hideTooltip();
        }
        var a = this, n = t.plot.plugins.length;
        if (this.plotPlugins = [], n) for (var p = 0; p < n; p++) this.plotPlugins.push(t.plot.plugins[p].name);
        i.hooks.bindEvents.push(function(i, n) {
            a.plotOptions = i.getOptions(), "boolean" == typeof a.plotOptions.tooltip && (a.plotOptions.tooltipOpts.show = a.plotOptions.tooltip, 
            a.plotOptions.tooltip = a.plotOptions.tooltipOpts, delete a.plotOptions.tooltipOpts), 
            !1 !== a.plotOptions.tooltip.show && void 0 !== a.plotOptions.tooltip.show && (a.tooltipOptions = a.plotOptions.tooltip, 
            a.tooltipOptions.$compat ? (a.wfunc = "width", a.hfunc = "height") : (a.wfunc = "innerWidth", 
            a.hfunc = "innerHeight"), a.getDomElement(), t(i.getPlaceholder()).bind("plothover", s), 
            a.tooltipOptions.clickTips && t(i.getPlaceholder()).bind("plotclick", e), a.clickmode = !1, 
            t(n).bind("mousemove", o));
        }), i.hooks.shutdown.push(function(i, a) {
            t(i.getPlaceholder()).unbind("plothover", s), t(i.getPlaceholder()).unbind("plotclick", e), 
            i.removeTooltip(), t(a).unbind("mousemove", o);
        }), i.setTooltipPosition = function(i) {
            var o = a.getDomElement(), e = o.outerWidth() + a.tooltipOptions.shifts.x, s = o.outerHeight() + a.tooltipOptions.shifts.y;
            i.x - t(window).scrollLeft() > t(window)[a.wfunc]() - e && (i.x -= e, i.x = Math.max(i.x, 0)), 
            i.y - t(window).scrollTop() > t(window)[a.hfunc]() - s && (i.y -= s), isNaN(i.x) ? a.tipPosition.x = a.tipPosition.xPrev : (a.tipPosition.x = i.x, 
            a.tipPosition.xPrev = i.x), isNaN(i.y) ? a.tipPosition.y = a.tipPosition.yPrev : (a.tipPosition.y = i.y, 
            a.tipPosition.yPrev = i.y);
        }, i.showTooltip = function(t, o, e) {
            var s = a.getDomElement(), n = a.stringFormat(a.tooltipOptions.content, t);
            "" !== n && (s.html(n), i.setTooltipPosition({
                x: a.tipPosition.x,
                y: a.tipPosition.y
            }), s.css({
                left: a.tipPosition.x + a.tooltipOptions.shifts.x,
                top: a.tipPosition.y + a.tooltipOptions.shifts.y
            }).show(), "function" == typeof a.tooltipOptions.onHover && a.tooltipOptions.onHover(t, s));
        }, i.hideTooltip = function() {
            a.getDomElement().hide().html("");
        }, i.removeTooltip = function() {
            a.getDomElement().remove();
        };
    }, o.prototype.getDomElement = function() {
        var i = t("<div>");
        return this.tooltipOptions && this.tooltipOptions.cssClass && 0 === (i = t("." + this.tooltipOptions.cssClass)).length && ((i = t("<div />").addClass(this.tooltipOptions.cssClass)).appendTo("body").hide().css({
            position: "absolute"
        }), this.tooltipOptions.defaultTheme && i.css({
            background: "#fff",
            "z-index": "1040",
            padding: "0.4em 0.6em",
            "border-radius": "0.5em",
            "font-size": "0.8em",
            border: "1px solid #111",
            display: "none",
            "white-space": "nowrap"
        })), i;
    }, o.prototype.stringFormat = function(t, i) {
        var o, e, s, a, n, p = /%s/, r = /%c/, l = /%lx/, d = /%ly/, c = /%x\.{0,1}(\d{0,})/, x = /%y\.{0,1}(\d{0,})/;
        if (void 0 !== i.series.threshold ? (o = i.datapoint[0], e = i.datapoint[1], s = i.datapoint[2]) : void 0 !== i.series.curvedLines ? (o = i.datapoint[0], 
        e = i.datapoint[1]) : s = void 0 !== i.series.lines && i.series.lines.steps ? (o = i.series.datapoints.points[2 * i.dataIndex], 
        e = i.series.datapoints.points[2 * i.dataIndex + 1], "") : (o = i.series.data[i.dataIndex][0], 
        e = i.series.data[i.dataIndex][1], i.series.data[i.dataIndex][2]), null === i.series.label && i.series.originSeries && (i.series.label = i.series.originSeries.label), 
        "function" == typeof t && (t = t(i.series.label, o, e, i)), "boolean" == typeof t && !t) return "";
        if (s && (t = t.replace("%ct", s)), void 0 !== i.series.percent ? a = i.series.percent : void 0 !== i.series.percents && (a = i.series.percents[i.dataIndex]), 
        "number" == typeof a && (t = this.adjustValPrecision(/%p\.{0,1}(\d{0,})/, t, a)), 
        i.series.hasOwnProperty("pie") && void 0 !== i.series.data[0][1] && (n = i.series.data[0][1]), 
        "number" == typeof n && (t = t.replace("%n", n)), t = void 0 !== i.series.label ? t.replace(p, i.series.label) : t.replace(p, ""), 
        t = void 0 !== i.series.color ? t.replace(r, i.series.color) : t.replace(r, ""), 
        t = this.hasAxisLabel("xaxis", i) ? t.replace(l, i.series.xaxis.options.axisLabel) : t.replace(l, ""), 
        t = this.hasAxisLabel("yaxis", i) ? t.replace(d, i.series.yaxis.options.axisLabel) : t.replace(d, ""), 
        this.isTimeMode("xaxis", i) && this.isXDateFormat(i) && (t = t.replace(c, this.timestampToDate(o, this.tooltipOptions.xDateFormat, i.series.xaxis.options))), 
        this.isTimeMode("yaxis", i) && this.isYDateFormat(i) && (t = t.replace(x, this.timestampToDate(e, this.tooltipOptions.yDateFormat, i.series.yaxis.options))), 
        "number" == typeof o && (t = this.adjustValPrecision(c, t, o)), "number" == typeof e && (t = this.adjustValPrecision(x, t, e)), 
        void 0 !== i.series.xaxis.ticks) {
            var h;
            h = this.hasRotatedXAxisTicks(i) ? "rotatedTicks" : "ticks";
            var u = i.dataIndex + i.seriesIndex;
            for (var m in i.series.xaxis[h]) i.series.xaxis[h].hasOwnProperty(u) && !this.isTimeMode("xaxis", i) && (this.isCategoriesMode("xaxis", i) ? i.series.xaxis[h][u].label : i.series.xaxis[h][u].v) === o && (t = t.replace(c, i.series.xaxis[h][u].label.replace(/\$/g, "$$$$")));
        }
        if (void 0 !== i.series.yaxis.ticks) for (var y in i.series.yaxis.ticks) i.series.yaxis.ticks.hasOwnProperty(y) && (this.isCategoriesMode("yaxis", i) ? i.series.yaxis.ticks[y].label : i.series.yaxis.ticks[y].v) === e && (t = t.replace(x, i.series.yaxis.ticks[y].label.replace(/\$/g, "$$$$")));
        return void 0 !== i.series.xaxis.tickFormatter && (t = t.replace("%x", i.series.xaxis.tickFormatter(o, i.series.xaxis).replace(/\$/g, "$$"))), 
        void 0 !== i.series.yaxis.tickFormatter && (t = t.replace("%y", i.series.yaxis.tickFormatter(e, i.series.yaxis).replace(/\$/g, "$$"))), 
        t;
    }, o.prototype.isTimeMode = function(t, i) {
        return void 0 !== i.series[t].options.mode && "time" === i.series[t].options.mode;
    }, o.prototype.isXDateFormat = function(t) {
        return void 0 !== this.tooltipOptions.xDateFormat && null !== this.tooltipOptions.xDateFormat;
    }, o.prototype.isYDateFormat = function(t) {
        return void 0 !== this.tooltipOptions.yDateFormat && null !== this.tooltipOptions.yDateFormat;
    }, o.prototype.isCategoriesMode = function(t, i) {
        return void 0 !== i.series[t].options.mode && "categories" === i.series[t].options.mode;
    }, o.prototype.timestampToDate = function(i, o, e) {
        var s = t.plot.dateGenerator(i, e);
        return t.plot.formatDate(s, o, this.tooltipOptions.monthNames, this.tooltipOptions.dayNames);
    }, o.prototype.adjustValPrecision = function(t, i, o) {
        var e;
        return null !== i.match(t) && "" !== RegExp.$1 && (e = RegExp.$1, o = o.toFixed(e), 
        i = i.replace(t, o)), i;
    }, o.prototype.hasAxisLabel = function(i, o) {
        return -1 !== t.inArray("axisLabels", this.plotPlugins) && void 0 !== o.series[i].options.axisLabel && 0 < o.series[i].options.axisLabel.length;
    }, o.prototype.hasRotatedXAxisTicks = function(i) {
        return -1 !== t.inArray("tickRotor", this.plotPlugins) && void 0 !== i.series.xaxis.rotatedTicks;
    }, t.plot.plugins.push({
        init: function(t) {
            new o(t);
        },
        options: i,
        name: "tooltip",
        version: "0.8.5"
    });
}(jQuery);