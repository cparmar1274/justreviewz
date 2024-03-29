function ChartAxes() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        replace: !0,
        link: function(t, n, o, a) {
            var i = o.valuesX;
            i && a.addXAxisValues(i);
            var e = o.valuesXs, r = {};
            if (e) {
                for (var l in xsItems = e.split(","), xsItems) xsItem = xsItems[l].split(":"), r[xsItem[0]] = xsItem[1];
                a.addXSValues(r);
            }
            var c = o.y, u = o.y2, s = {};
            if (u) {
                var d = u.split(",");
                for (var h in d) s[d[h]] = "y2";
                if (c) {
                    var p = c.split(",");
                    for (var m in p) s[p[m]] = "y";
                }
                a.addYAxis(s);
            }
        }
    };
}

function ChartAxis() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        transclude: !0,
        template: "<div ng-transclude></div>",
        replace: !0,
        link: function(t, n, o, a) {
            o.axisRotate && a.rotateAxis();
        }
    };
}

function ChartAxisX() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        transclude: !0,
        template: "<div ng-transclude></div>",
        replace: !0,
        link: function(t, n, o, a) {
            var i = o.axisPosition, e = {
                label: {
                    text: o.axisLabel,
                    position: i
                }
            }, r = o.paddingLeft, l = o.paddingRight;
            (r || l) && (r = r || 0, l = l || 0, e.padding = {
                left: parseInt(r),
                right: parseInt(l)
            });
            var c = o.axisHeight;
            c && (e.height = parseInt(c)), "false" === o.show && (e.show = !1), "true" === o.axisLocaltime && (e.localtime = !0);
            var u = o.axisMax;
            u && (e.max = u);
            var s = o.axisMin;
            s && (e.min = s);
            var d = o.axisType;
            d && (e.type = d), a.addAxisProperties("x", e);
            var h = o.axisXFormat;
            h && a.setXFormat(h);
        }
    };
}

function ChartAxisXTick() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {
            tickFormatFunction: "&"
        },
        replace: !0,
        link: function(t, n, o, a) {
            var i = {}, e = o.tickCount;
            e && (i.count = e);
            var r = o.tickCulling;
            r && ("true" === (r = angular.lowercase(r)) ? i.culling = !0 : "false" === r && (i.culling = !1));
            var l = o.tickCullingMax;
            l && (i.culling = {
                max: parseInt(l)
            });
            var c = o.tickMultiline;
            c && ("true" === (c = angular.lowercase(c)) ? i.multiline = !0 : "false" === c && (i.multiline = !1));
            var u = o.tickCentered;
            u && ("true" === (u = angular.lowercase(u)) ? i.centered = !0 : "false" === u && (i.centered = !1));
            var s = o.tickRotate;
            s && (i.rotate = s);
            var d = o.tickFit;
            d && ("true" === (d = angular.lowercase(d)) ? i.fit = !0 : "false" === d && (i.fit = !1));
            var h = o.tickValues;
            h && h && (-1 < h.indexOf(",") ? i.values = h.split(",") : i.values = h);
            var p = o.tickOuter;
            p && ("true" === (p = angular.lowercase(p)) ? i.outer = !0 : "false" === p && (i.outer = !1));
            var m = o.tickFormat;
            m && (i.format = d3.format(m));
            var g = o.tickFormatTime;
            g && (i.format = d3.time.format(g)), a.addXTick(i), o.tickFormatFunction && a.addXTickFormatFunction(t.tickFormatFunction());
        }
    };
}

function ChartAxisY() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        replace: !0,
        link: function(t, n, o, a) {
            var i = o.axisId, e = o.axisPosition;
            i = null == i ? "y" : i;
            var l = {
                label: {
                    text: o.axisLabel,
                    position: e
                }
            };
            "false" === o.show ? l.show = !1 : "y2" === i && (l.show = !0);
            var c = o.paddingTop, u = o.paddingBottom;
            (c || u) && (c = c || 0, u = u || 0, l.padding = {
                top: parseInt(c),
                bottom: parseInt(u)
            });
            var s = o.axisMax, d = o.axisMin;
            s && (l.max = parseInt(s)), d && (l.min = parseInt(d)), "true" === o.axisInverted && (l.inverted = !0), 
            "true" === o.axisInner && (l.inner = !0);
            var h = o.axisCenter;
            h && (l.center = parseInt(h)), a.addAxisProperties(i, l);
        }
    };
}

function ChartAxisYTick() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {
            tickFormatFunction: "&"
        },
        replace: !0,
        link: function(t, n, o, a) {
            var i = {}, e = o.tickCount;
            e && (i.count = e);
            var r = o.tickOuter;
            r && ("true" === (r = angular.lowercase(r)) ? i.outer = !0 : "false" === r && (i.outer = !1));
            var l = o.tickValues;
            l && (-1 < l.indexOf(",") ? i.values = l.split(",") : i.values = l);
            var c = o.tickFormat;
            c && (i.format = d3.format(c)), a.addYTick(i), o.tickFormatFunction && a.addYTickFormatFunction(t.tickFormatFunction());
        }
    };
}

function ChartBar() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        replace: !0,
        link: function(t, n, o, a) {
            var i = {};
            o.width && (i.width = parseInt(o.width)), o.ratio && (i.width || (i.width = {}), 
            i.width.ratio = parseFloat(o.ratio)), o.zerobased && (i.zerobased = "true" === o.zerobased), 
            a.addBar(i);
        }
    };
}

function C3Chart(t) {
    return {
        restrict: "E",
        controller: "ChartController",
        scope: {
            bindto: "@bindtoId",
            showLabels: "@showLabels",
            labelsFormatFunction: "&",
            onZoomEndFunction: "&",
            showSubchart: "@showSubchart",
            subchartOnBrushFunction: "&",
            enableZoom: "@enableZoom",
            rescaleZoom: "@rescaleZoom",
            chartData: "=chartData",
            chartColumns: "=chartColumns",
            chartX: "=chartX",
            callbackFunction: "&",
            emptyLabel: "@emptyLabel"
        },
        template: "<div><div id='{{bindto}}'></div><div ng-transclude></div></div>",
        replace: !0,
        transclude: !0,
        link: function(n, o, a, i) {
            var e = a.paddingTop, r = a.paddingRight, l = a.paddingBottom, c = a.paddingLeft, u = a.sortData, s = a.transitionDuration, d = a.initialConfig;
            a.interactionEnabled && "false" === a.interactionEnabled && i.addInteractionEnabled(!1), 
            e && i.addPadding("top", e), r && i.addPadding("right", r), l && i.addPadding("bottom", l), 
            c && i.addPadding("left", c), u && i.addSorting(u), a.labelsFormatFunction && i.addDataLabelsFormatFunction(n.labelsFormatFunction()), 
            a.onZoomEndFunction && i.addOnZoomEndFunction(n.onZoomEndFunction()), a.subchartOnBrushFunction && i.addSubchartOnBrushFunction(n.subchartOnBrushFunction()), 
            a.callbackFunction && i.addChartCallbackFunction(n.callbackFunction()), s && i.addTransitionDuration(s), 
            d && i.addInitialConfig(d), t(function() {
                i.showGraph();
            });
        }
    };
}

function ChartColors() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {
            colorFunction: "&"
        },
        replace: !0,
        link: function(t, n, o, a) {
            var i = o.colorPattern;
            i && a.addColorPatterns(i.split(","));
            var e = o.thresholds;
            e && a.addColorThresholds(e.split(",")), o.colorFunction && a.addColorFunction(t.colorFunction());
        }
    };
}

function ChartColumn() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        replace: !0,
        link: function(t, n, o, a) {
            var i = o.columnValues.split(",");
            i.unshift(o.columnId), a.addColumn(i, o.columnType, o.columnName, o.columnColor);
        }
    };
}

function ChartController(t, n) {
    function o() {
        t.chart = null, t.columns = [], t.types = {}, t.regions = {}, t.axis = {}, t.axes = {}, 
        t.padding = null, t.emptyLabel = null, t.xValues = null, t.xFormat = null, t.xsValues = null, 
        t.xTick = null, t.yTick = null, t.names = null, t.grid = null, t.legend = null, 
        t.tooltip = null, t.chartSize = null, t.colors = null, t.colorThresholds = null, 
        t.gauge = null, t.jsonKeys = null, t.groups = null, t.sorting = null, t.transitionDuration = null, 
        t.initialConfig = null, t.selection = null;
    }
    function a(n, o, a, i) {
        void 0 !== o && (t.types[n] = o), void 0 !== a && (null === t.names && (t.names = {}), 
        t.names[n] = a), void 0 !== i && (null === t.colors && (t.colors = {}), t.colors[n] = i);
    }
    function i() {
        t.jsonKeys = {}, t.jsonKeys.value = [], angular.forEach(t.chartColumns, function(n) {
            t.jsonKeys.value.push(n.id), a(n.id, n.type, n.name, n.color);
        }), t.chartX && (t.jsonKeys.x = t.chartX.id), t.names && (t.config.data.names = t.names), 
        t.colors && (t.config.data.colors = t.colors), t.groups && (t.config.data.groups = t.groups), 
        t.config.data.keys = t.jsonKeys, t.config.data.json = t.chartData, t.chartIsGenerated ? (t.config.data.unload = !0, 
        t.chart.load(t.config.data)) : (t.chart = c3.generate(t.config), t.chartIsGenerated = !0, 
        t.chartCallbackFunction && t.chartCallbackFunction(t.chart));
    }
    this.showGraph = function() {
        var a = {};
        t.initialConfig && (a = t.initialConfig), a.bindto = "#" + t.bindto, a.data = a.data || {}, 
        t.xValues && (a.data.x = t.xValues), t.xsValues && (a.data.xs = t.xsValues), t.columns && (a.data.columns = t.columns), 
        t.xFormat && (a.data.xFormat = t.xFormat), a.data.types = a.data.types || t.types, 
        a.data.axes = a.data.axes || t.axes, t.names && (a.data.names = t.names), null != t.emptyLabel && (a.data.empty = {
            label: {
                text: t.emptyLabel
            }
        }), null != t.padding && (a.padding = t.padding), null != t.sorting && ("null" == t.sorting ? a.data.order = null : a.data.order = t.sorting), 
        null != t.transitionDuration && (a.transition = a.transition || {}, a.transition.duration = t.transitionDuration), 
        t.showLabels && "true" === t.showLabels && (a.data.labels = !0), t.dataLabelsFormatFunction && (a.data.labels = a.data.labels || {}, 
        a.data.labels.format = t.dataLabelsFormatFunction), null != t.groups && (a.data.groups = t.groups), 
        t.showSubchart && "true" === t.showSubchart && (a.subchart = {
            show: !0
        }), t.subchartOnBrushFunction && (a.subchart = a.subchart || {}, a.subchart.onbrush = t.subchartOnBrushFunction), 
        t.enableZoom && "true" === t.enableZoom && (a.zoom = {
            enabled: !0
        }), t.rescaleZoom && "true" === t.rescaleZoom && (a.zoom = a.zoom || {}, a.zoom.rescale = !0), 
        t.onZoomEndFunction && (a.zoom = a.zoom || {}, a.zoom.onzoomend = t.onZoomEndFunction), 
        a.axis = a.axis || t.axis, t.xTick && (a.axis.x.tick = t.xTick), t.xTickFormatFunction && (a.axis.x.tick = a.axis.x.tick || {}, 
        a.axis.x.tick.format = t.xTickFormatFunction), t.xType && (a.axis.x.type = t.xType), 
        t.yTick && (a.axis.y.tick = t.yTick), t.yTickFormatFunction && (a.axis.y.tick = a.axis.y.tick || {}, 
        a.axis.y.tick.format = t.yTickFormatFunction), null != t.grid && (a.grid = t.grid), 
        null != t.legend && (a.legend = t.legend), null != t.tooltip ? a.tooltip = t.tooltip : a.tooltip = {}, 
        t.tooltipTitleFormatFunction && (a.tooltip.format = a.tooltip.format || {}, a.tooltip.format.title = t.tooltipTitleFormatFunction), 
        t.tooltipNameFormatFunction && (a.tooltip.format = a.tooltip.format || {}, a.tooltip.format.name = t.tooltipNameFormatFunction), 
        t.tooltipValueFormatFunction && (a.tooltip.format = a.tooltip.format || {}, a.tooltip.format.value = t.tooltipValueFormatFunction), 
        t.tooltipContentFormatFunction && (a.tooltip.contents = t.tooltipContentFormatFunction), 
        null != t.chartSize && (a.size = t.chartSize), null != t.colors && (a.data.colors = t.colors), 
        t.colorFunction && (a.data.color = t.colorFunction), null != t.colorPatterns && (void 0 === a.color && (a.color = {}), 
        a.color.pattern = t.colorPatterns), null != t.colorThresholds && (void 0 === a.color && (a.color = {}), 
        a.color.threshold = {
            values: t.colorThresholds
        }), null != t.gauge ? a.gauge = t.gauge : a.gauge = {}, t.gaugeLabelFormatFunction && (a.gauge.label = a.gauge.label || {}, 
        a.gauge.label.format = t.gaugeLabelFormatFunction), null != t.point && (a.point = t.point), 
        null != t.bar && (a.bar = t.bar), null != t.line && (a.line = t.line), null != t.regions && (a.data.regions = t.regions), 
        null != t.pie && (a.pie = t.pie), t.pieLabelFormatFunction && (a.pie.label = a.pie.label || {}, 
        a.pie.label.format = t.pieLabelFormatFunction), null != t.donut ? a.donut = t.donut : a.donut = {}, 
        t.donutLabelFormatFunction && (a.donut.label = a.donut.label || {}, a.donut.label.format = t.donutLabelFormatFunction), 
        null != t.onInit && (a.oninit = t.onInit), null != t.onMouseover && (a.onmouseover = t.onMouseover), 
        null != t.onMouseout && (a.onmouseout = t.onMouseout), null != t.onRendered && (a.onrendered = t.onRendered), 
        null != t.onResize && (a.onresize = t.onResize), null != t.onResized && (a.onresized = t.onResized), 
        null != t.dataOnClick && (a.data.onclick = function(n, o) {
            t.$apply(function() {
                t.dataOnClick({
                    data: n
                });
            });
        }), null != t.dataOnMouseover && (a.data.onmouseover = function(n) {
            t.$apply(function() {
                t.dataOnMouseover({
                    data: n
                });
            });
        }), null != t.dataOnMouseout && (a.data.onmouseout = function(n) {
            t.$apply(function() {
                t.dataOnMouseout({
                    data: n
                });
            });
        }), null != t.selection && (a.data.selection = t.selection), "boolean" == typeof t.interactionEnabled && (a.interaction = {
            enabled: t.interactionEnabled
        }), t.config = a, t.chartData && t.chartColumns ? t.$watch("chartData", function() {
            i();
        }, !0) : (t.chart = c3.generate(t.config), t.chartCallbackFunction && t.chartCallbackFunction(t.chart)), 
        t.$on("$destroy", function() {
            n(function() {
                angular.isDefined(t.chart) && (t.chart = t.chart.destroy(), o());
            }, 1e4);
        });
    }, this.addColumn = function(n, o, i, e) {
        t.columns.push(n), a(n[0], o, i, e);
    }, this.addAxisProperties = function(n, o) {
        t.axis[n] = o;
    }, this.rotateAxis = function() {
        t.axis.rotated = !0;
    }, this.addPadding = function(n, o) {
        null == t.padding && (t.padding = {}), t.padding[n] = parseInt(o);
    }, this.addSorting = function(n) {
        t.sorting = n;
    }, this.addInteractionEnabled = function(n) {
        t.interactionEnabled = n;
    }, this.addSize = function(n) {
        t.chartSize = n;
    }, this.addEmptyLabel = function(n) {
        t.emptyLabel = n;
    }, this.addColorPatterns = function(n) {
        t.colorPatterns = n;
    }, this.addColorThresholds = function(n) {
        t.colorThresholds = n, t.colors && (t.colors.threshold = {
            values: t.colorThresholds
        });
    }, this.addColorFunction = function(n) {
        t.colorFunction = n;
    }, this.addGrid = function(n) {
        null == t.grid && (t.grid = {}), null == t.grid[n] && (t.grid[n] = {}), t.grid[n].show = !0;
    }, this.addGridLine = function(n, o, a, i, e) {
        null == t.grid && (t.grid = {}), "x" === n ? (void 0 === t.grid.x && (t.grid.x = {}), 
        void 0 === t.grid.x.lines && (t.grid.x.lines = [])) : (void 0 === t.grid.y && (t.grid.y = {}), 
        void 0 === t.grid.y.lines && (t.grid.y.lines = []));
        var r = {};
        r.value = isNaN(+o) ? o : +o, r.text = a, i && (r.class = i), e && (r.position = e), 
        "y2" === n ? (r.axis = "y2", t.grid.y.lines.push(r)) : t.grid[n].lines.push(r);
    }, this.hideGridFocus = function() {
        null == t.grid && (t.grid = {}), t.grid.focus = {
            show: !1
        };
    }, this.addLegend = function(n) {
        t.legend = n;
    }, this.addTooltip = function(n) {
        t.tooltip = n;
    }, this.addTooltipTitleFormatFunction = function(n) {
        t.tooltipTitleFormatFunction = n;
    }, this.addTooltipNameFormatFunction = function(n) {
        t.tooltipNameFormatFunction = n;
    }, this.addTooltipValueFormatFunction = function(n) {
        t.tooltipValueFormatFunction = n;
    }, this.addTooltipContentFormatFunction = function(n) {
        t.tooltipContentFormatFunction = n;
    }, this.addYAxis = function(n) {
        t.axes = n, t.axis.y2 || (t.axis.y2 = {
            show: !0
        });
    }, this.addYTick = function(n) {
        t.yTick = n;
    }, this.addYTickFormatFunction = function(n) {
        t.yTickFormatFunction = n;
    }, this.addXAxisValues = function(n) {
        t.xValues = n;
    }, this.addXTick = function(n) {
        t.xTick = n;
    }, this.addXTickFormatFunction = function(n) {
        t.xTickFormatFunction = n;
    }, this.addXType = function(n) {
        t.xType = n;
    }, this.addXSValues = function(n) {
        t.xsValues = n;
    }, this.addChartCallbackFunction = function(n) {
        t.chartCallbackFunction = n;
    }, this.addInitialConfig = function(n) {
        t.initialConfig = n;
    }, this.addDataLabelsFormatFunction = function(n) {
        t.dataLabelsFormatFunction = n;
    }, this.addTransitionDuration = function(n) {
        t.transitionDuration = n;
    }, this.addSubchartOnBrushFunction = function(n) {
        t.subchartOnBrushFunction = n;
    }, this.addOnZoomEndFunction = function(n) {
        t.onZoomEndFunction = n;
    }, this.addGauge = function(n) {
        t.gauge = n;
    }, this.addGaugeLabelFormatFunction = function(n) {
        t.gaugeLabelFormatFunction = n;
    }, this.addBar = function(n) {
        t.bar = n;
    }, this.addLine = function(n) {
        t.line = n;
    }, this.addRegion = function(n, o) {
        t.regions[n] = o;
    }, this.addPie = function(n) {
        t.pie = n;
    }, this.addPieLabelFormatFunction = function(n) {
        t.pieLabelFormatFunction = n;
    }, this.addDonut = function(n) {
        t.donut = n;
    }, this.addDonutLabelFormatFunction = function(n) {
        t.donutLabelFormatFunction = n;
    }, this.addGroup = function(n) {
        null == t.groups && (t.groups = []), t.groups.push(n);
    }, this.addPoint = function(n) {
        t.point = n;
    }, this.addOnInitFunction = function(n) {
        t.onInit = n;
    }, this.addOnMouseoverFunction = function(n) {
        t.onMouseover = n;
    }, this.addOnMouseoutFunction = function(n) {
        t.onMouseout = n;
    }, this.addOnRenderedFunction = function(n) {
        t.onRendered = n;
    }, this.addOnResizeFunction = function(n) {
        t.onResize = n;
    }, this.addOnResizedFunction = function(n) {
        t.onResized = n;
    }, this.addDataOnClickFunction = function(n) {
        t.dataOnClick = n;
    }, this.addDataOnMouseoverFunction = function(n) {
        t.dataOnMouseover = n;
    }, this.addDataOnMouseoutFunction = function(n) {
        t.dataOnMouseout = n;
    }, this.setXFormat = function(n) {
        t.xFormat = n;
    }, this.addSelection = function(n) {
        t.selection = n;
    }, o();
}

function ChartDonut() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {
            labelFormatFunction: "&"
        },
        replace: !0,
        link: function(t, n, o, a) {
            var i = {};
            o.showLabel && (i.label = {
                show: "true" === o.showLabel
            }), o.thresholdLabel && (i.label || (i.label = {}), i.label.threshold = parseFloat(o.thresholdLabel)), 
            o.expand && (i.expand = "true" === o.expand), o.width && (i.width = parseInt(o.width)), 
            o.title && (i.title = o.title), a.addDonut(i), o.labelFormatFunction && a.addDonutLabelFormatFunction(t.labelFormatFunction());
        }
    };
}

function ChartEvents() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {
            onInit: "&",
            onMouseover: "&",
            onMouseout: "&",
            onResize: "&",
            onResized: "&",
            onRendered: "&",
            onClickData: "&",
            onMouseoverData: "&",
            onMouseoutData: "&"
        },
        replace: !0,
        link: function(t, n, o, a) {
            o.onInit && a.addOnInitFunction(t.onInit), o.onMouseover && a.addOnMouseoverFunction(t.onMouseover), 
            o.onMouseout && a.addOnMouseoutFunction(t.onMouseout), o.onResize && a.addOnResizeFunction(t.onResize), 
            o.onResized && a.addOnResizedFunction(t.onResized), o.onRendered && a.addOnRenderedFunction(t.onRendered), 
            o.onClickData && a.addDataOnClickFunction(t.onClickData), o.onMouseoverData && a.addDataOnMouseoverFunction(t.onMouseoverData), 
            o.onMouseoutData && a.addDataOnMouseoutFunction(t.onMouseoutData);
        }
    };
}

function ChartGauge() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {
            labelFormatFunction: "&"
        },
        replace: !0,
        link: function(t, n, o, a) {
            var i = {};
            o.min && (i.min = parseInt(o.min)), o.max && (i.max = parseInt(o.max)), o.width && (i.width = parseInt(o.width)), 
            o.units && (i.units = o.units), o.showLabel && (i.label = {
                show: "true" === o.showLabel
            }), o.expand && (i.expand = "true" === o.expand), a.addGauge(i), o.labelFormatFunction && a.addGaugeLabelFormatFunction(t.labelFormatFunction());
        }
    };
}

function ChartGrid() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        replace: !0,
        link: function(t, n, o, a) {
            var i = o.showX;
            i && "true" === i && a.addGrid("x");
            var e = o.showY;
            e && "true" === e && a.addGrid("y");
            var r = o.showY2;
            r && "true" === r && a.addGrid("y2");
            var l = o.showFocus;
            l && "false" === l && a.hideGridFocus();
        },
        transclude: !0,
        template: "<div ng-transclude></div>"
    };
}

function ChartGridOptional() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        replace: !0,
        link: function(t, n, o, a) {
            var i = o.axisId, e = o.gridValue, r = o.gridText, l = o.gridClass, c = o.position;
            a.addGridLine(i, e, r, l, c);
        }
    };
}

function ChartGroup() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        replace: !0,
        link: function(t, n, o, a) {
            var i = o.groupValues.split(",");
            a.addGroup(i);
        }
    };
}

function ChartLegend() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {
            onMouseover: "&",
            onMouseout: "&",
            onClick: "&"
        },
        replace: !0,
        link: function(t, n, o, a) {
            var i = null, e = o.showLegend;
            if (e && "false" === e) i = {
                show: !1
            }; else {
                var r = o.legendPosition;
                r && (i = {
                    position: r
                });
                var l = o.legendInset;
                if (l) {
                    i = {
                        position: "inset",
                        inset: {
                            anchor: l
                        }
                    };
                    var c = o.legendInsetX;
                    c && (i.inset.x = parseInt(c));
                    var u = o.legendInsetY;
                    u && (i.inset.y = parseInt(u));
                    var s = o.legendInsetStep;
                    s && (i.inset.step = parseInt(s));
                }
            }
            o.onMouseover && ((i = i || {}).item = i.item || {}, i.item.onmouseover = function(n) {
                t.$apply(function() {
                    t.onMouseover({
                        data: n
                    });
                });
            }), o.onMouseout && ((i = i || {}).item = i.item || {}, i.item.onmouseout = function(n) {
                t.$apply(function() {
                    t.onMouseout({
                        data: n
                    });
                });
            }), o.onClick && ((i = i || {}).item = i.item || {}, i.item.onclick = function(n) {
                t.$apply(function() {
                    t.onClick({
                        data: n
                    });
                });
            }), null != i && a.addLegend(i);
        }
    };
}

function ChartLine() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        replace: !0,
        link: function(t, n, o, a) {
            var i = {};
            o.stepType && (i.step = i.step || {}, i.step.type = o.stepType), o.connectNull && (i.connectNull = "true" === o.connectNull), 
            a.addLine(i);
        }
    };
}

function ChartPie() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {
            labelFormatFunction: "&"
        },
        replace: !0,
        link: function(t, n, o, a) {
            var i = {};
            o.showLabel && (i.label = {
                show: "true" === o.showLabel
            }), o.thresholdLabel && (i.label || (i.label = {}), i.label.threshold = parseFloat(o.thresholdLabel)), 
            o.expand && (i.expand = "true" === o.expand), a.addPie(i), o.labelFormatFunction && a.addPieLabelFormatFunction(t.labelFormatFunction());
        }
    };
}

function ChartPoints() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        replace: !0,
        link: function(t, n, o, a) {
            var i = {};
            o.showPoint && (i.show = "true" === o.showPoint), o.pointExpandEnabled && (i.focus || (i.focus = {
                expand: {}
            }), i.focus.expand.enabled = "false" !== o.pointsFocusEnabled), o.pointExpandRadius && (i.focus || (pie.focus = {
                expand: {}
            }), i.focus.expand.r = parseInt(o.pointFocusRadius)), o.pointRadius && (i.r = parseInt(o.pointRadius)), 
            o.pointSelectRadius && (i.select = {
                r: parseInt(o.pointSelectRadius)
            }), a.addPoint(i);
        }
    };
}

function ChartRegion() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        replace: !0,
        link: function(t, n, o, a) {
            var i = "dashed", e = [], r = [], l = [];
            o.regionStyle && (i = o.regionStyle), o.regionStarts && (e = o.regionStarts.split(",")), 
            o.regionEnds && (r = o.regionEnds.split(",")), e.length > r.length && l.push({
                start: e.pop(),
                style: i
            }), e.length < r.length && l.push({
                end: r.shift(),
                style: i
            }), e.forEach(function(t, n) {
                l.push({
                    start: e[n],
                    end: r[n],
                    style: i
                });
            }), a.addRegion(o.regionId, l);
        }
    };
}

function Selection() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        replace: !0,
        link: function(t, n, o, a) {
            var i = o.enabled, e = o.grouped, r = o.multiple;
            if (i && "true" === i) {
                var l = {
                    enabled: !0
                };
                e && "true" === e && (l.grouped = !0), r && "true" === r && (l.multiple = !0), a.addSelection(l);
            }
        }
    };
}

function ChartSize() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {},
        replace: !0,
        link: function(t, n, o, a) {
            var i = null, e = o.chartWidth, r = o.chartHeight;
            (e || r) && (i = {}, e && (i.width = parseInt(e)), r && (i.height = parseInt(r)), 
            a.addSize(i));
        }
    };
}

function ChartTooltip() {
    return {
        require: "^c3chart",
        restrict: "E",
        scope: {
            valueFormatFunction: "&",
            nameFormatFunction: "&",
            titleFormatFunction: "&",
            contentFormatFunction: "&"
        },
        replace: !0,
        link: function(t, n, o, a) {
            var i = null, e = o.showTooltip, r = (o.hideTooltipTitle, o.joinedTooltip);
            if (e && "false" === e) i = {
                show: !1
            }; else {
                var l = o.groupTooltip;
                l && "false" === l && (i = {
                    grouped: !1
                });
            }
            r && "true" === r && ((i = i || {}).contents = function(t, n, o, a) {
                var i, e, r, l, c, u, s, d = this, h = d.config, p = h.tooltip_format_title || n, m = h.tooltip_format_name || function(t) {
                    return t;
                }, g = h.tooltip_format_value || o;
                for (s = {
                    tooltipContainer: "c3-tooltip-container",
                    tooltip: "c3-tooltip",
                    tooltipName: "c3-tooltip-name"
                }, e = t[0].x; e < t[0].x + 1; e++) t[e] && (t[e].value || 0 === t[e].value) && (i || (i = "<table class='" + s.tooltip + "'>" + ((r = p ? p(t[e].x) : t[e].x) || 0 === r ? "<tr><th colspan='2'>" + r + "</th></tr>" : "")), 
                void 0 !== (l = g(t[e].value, t[e].ratio, t[e].id, t[e].index)) && (c = m(t[e].name, t[e].ratio, t[e].id, t[e].index), 
                u = d.levelColor ? d.levelColor(t[e].value) : a(t[e].id), i += "<tr class='" + s.tooltipName + "-" + t[e].id + "'>", 
                i += "<td class='name'><span style='background-color:" + u + "'></span>" + c + "</td>", 
                i += "<td class='value'>" + l + "</td>", i += "</tr>"));
                return i + "</table>";
            }), null != i && a.addTooltip(i), o.titleFormatFunction && a.addTooltipTitleFormatFunction(t.titleFormatFunction()), 
            o.nameFormatFunction && a.addTooltipNameFormatFunction(t.nameFormatFunction()), 
            o.valueFormatFunction && a.addTooltipValueFormatFunction(t.valueFormatFunction()), 
            o.contentFormatFunction && a.addTooltipContentFormatFunction(t.contentFormatFunction());
        }
    };
}

angular.module("gridshore.c3js.chart", []), angular.module("gridshore.c3js.chart").directive("chartAxes", ChartAxes), 
angular.module("gridshore.c3js.chart").directive("chartAxis", ChartAxis), angular.module("gridshore.c3js.chart").directive("chartAxisX", ChartAxisX), 
angular.module("gridshore.c3js.chart").directive("chartAxisXTick", ChartAxisXTick), 
angular.module("gridshore.c3js.chart").directive("chartAxisY", ChartAxisY), angular.module("gridshore.c3js.chart").directive("chartAxisYTick", ChartAxisYTick), 
angular.module("gridshore.c3js.chart").directive("chartBar", ChartBar), angular.module("gridshore.c3js.chart").directive("c3chart", [ "$timeout", function(t) {
    return C3Chart(t);
} ]), angular.module("gridshore.c3js.chart").directive("chartColors", ChartColors), 
angular.module("gridshore.c3js.chart").directive("chartColumn", ChartColumn), angular.module("gridshore.c3js.chart").controller("ChartController", ChartController), 
ChartController.$inject = [ "$scope", "$timeout" ], angular.module("gridshore.c3js.chart").directive("chartDonut", ChartDonut), 
angular.module("gridshore.c3js.chart").directive("chartEvents", ChartEvents), angular.module("gridshore.c3js.chart").directive("chartGauge", ChartGauge), 
angular.module("gridshore.c3js.chart").directive("chartGrid", ChartGrid), angular.module("gridshore.c3js.chart").directive("chartGridOptional", ChartGridOptional), 
angular.module("gridshore.c3js.chart").directive("chartGroup", ChartGroup), angular.module("gridshore.c3js.chart").directive("chartLegend", ChartLegend), 
angular.module("gridshore.c3js.chart").directive("chartLine", ChartLine), angular.module("gridshore.c3js.chart").directive("chartPie", ChartPie), 
angular.module("gridshore.c3js.chart").directive("chartPoints", ChartPoints), angular.module("gridshore.c3js.chart").directive("chartRegion", ChartRegion), 
angular.module("gridshore.c3js.chart").directive("selection", Selection), angular.module("gridshore.c3js.chart").directive("chartSize", ChartSize), 
angular.module("gridshore.c3js.chart").directive("chartTooltip", ChartTooltip);