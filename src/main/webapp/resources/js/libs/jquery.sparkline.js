!function(t, i, e) {
    !function(t) {
        "function" == typeof define && define.amd ? define([ "jquery" ], t) : jQuery && !jQuery.fn.sparkline && t(jQuery);
    }(function(e) {
        "use strict";
        var s, r, n, a, o, h, l, g, p, d, u, c, f, v, m, x, y, C, w, b, R, S, k, M, H, W, T, q, I, j = {}, P = 0;
        s = function() {
            return {
                common: {
                    type: "line",
                    lineColor: "#00f",
                    fillColor: "#cdf",
                    defaultPixelsPerValue: 3,
                    width: "auto",
                    height: "auto",
                    composite: !1,
                    tagValuesAttribute: "values",
                    tagOptionsPrefix: "spark",
                    enableTagOptions: !1,
                    enableHighlight: !0,
                    highlightLighten: 1.4,
                    tooltipSkipNull: !0,
                    tooltipPrefix: "",
                    tooltipSuffix: "",
                    disableHiddenCheck: !1,
                    numberFormatter: !1,
                    numberDigitGroupCount: 3,
                    numberDigitGroupSep: ",",
                    numberDecimalMark: ".",
                    disableTooltips: !1,
                    disableInteraction: !1
                },
                line: {
                    spotColor: "#f80",
                    highlightSpotColor: "#5f5",
                    highlightLineColor: "#f22",
                    spotRadius: 1.5,
                    minSpotColor: "#f80",
                    maxSpotColor: "#f80",
                    lineWidth: 1,
                    normalRangeMin: void 0,
                    normalRangeMax: void 0,
                    normalRangeColor: "#ccc",
                    drawNormalOnTop: !1,
                    chartRangeMin: void 0,
                    chartRangeMax: void 0,
                    chartRangeMinX: void 0,
                    chartRangeMaxX: void 0,
                    tooltipFormat: new n('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')
                },
                bar: {
                    barColor: "#3366cc",
                    negBarColor: "#f44",
                    stackedBarColor: [ "#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099" ],
                    zeroColor: void 0,
                    nullColor: void 0,
                    zeroAxis: !0,
                    barWidth: 4,
                    barSpacing: 1,
                    chartRangeMax: void 0,
                    chartRangeMin: void 0,
                    chartRangeClip: !1,
                    colorMap: void 0,
                    tooltipFormat: new n('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
                },
                tristate: {
                    barWidth: 4,
                    barSpacing: 1,
                    posBarColor: "#6f6",
                    negBarColor: "#f44",
                    zeroBarColor: "#999",
                    colorMap: {},
                    tooltipFormat: new n('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),
                    tooltipValueLookups: {
                        map: {
                            "-1": "Loss",
                            0: "Draw",
                            1: "Win"
                        }
                    }
                },
                discrete: {
                    lineHeight: "auto",
                    thresholdColor: void 0,
                    thresholdValue: 0,
                    chartRangeMax: void 0,
                    chartRangeMin: void 0,
                    chartRangeClip: !1,
                    tooltipFormat: new n("{{prefix}}{{value}}{{suffix}}")
                },
                bullet: {
                    targetColor: "#f33",
                    targetWidth: 3,
                    performanceColor: "#33f",
                    rangeColors: [ "#d3dafe", "#a8b6ff", "#7f94ff" ],
                    base: void 0,
                    tooltipFormat: new n("{{fieldkey:fields}} - {{value}}"),
                    tooltipValueLookups: {
                        fields: {
                            r: "Range",
                            p: "Performance",
                            t: "Target"
                        }
                    }
                },
                pie: {
                    offset: 0,
                    sliceColors: [ "#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099" ],
                    borderWidth: 0,
                    borderColor: "#000",
                    tooltipFormat: new n('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')
                },
                box: {
                    raw: !1,
                    boxLineColor: "#000",
                    boxFillColor: "#cdf",
                    whiskerColor: "#000",
                    outlierLineColor: "#333",
                    outlierFillColor: "#fff",
                    medianColor: "#f00",
                    showOutliers: !0,
                    outlierIQR: 1.5,
                    spotRadius: 1.5,
                    target: void 0,
                    targetColor: "#4a2",
                    chartRangeMax: void 0,
                    chartRangeMin: void 0,
                    tooltipFormat: new n("{{field:fields}}: {{value}}"),
                    tooltipFormatFieldlistKey: "field",
                    tooltipValueLookups: {
                        fields: {
                            lq: "Lower Quartile",
                            med: "Median",
                            uq: "Upper Quartile",
                            lo: "Left Outlier",
                            ro: "Right Outlier",
                            lw: "Left Whisker",
                            rw: "Right Whisker"
                        }
                    }
                }
            };
        }, r = function() {
            var t, i;
            return t = function() {
                this.init.apply(this, arguments);
            }, 1 < arguments.length ? (arguments[0] ? (t.prototype = e.extend(new arguments[0](), arguments[arguments.length - 1]), 
            t._super = arguments[0].prototype) : t.prototype = arguments[arguments.length - 1], 
            2 < arguments.length && ((i = Array.prototype.slice.call(arguments, 1, -1)).unshift(t.prototype), 
            e.extend.apply(e, i))) : t.prototype = arguments[0], t.prototype.cls = t;
        }, e.SPFormatClass = n = r({
            fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
            precre: /(\w+)\.(\d+)/,
            init: function(t, i) {
                this.format = t, this.fclass = i;
            },
            render: function(t, i, e) {
                var s, r, n, a, o, h = this, l = t;
                return this.format.replace(this.fre, function() {
                    return r = arguments[1], n = arguments[3], (s = h.precre.exec(r)) ? (o = s[2], r = s[1]) : o = !1, 
                    void 0 === (a = l[r]) ? "" : n && i && i[n] ? i[n].get ? i[n].get(a) || a : i[n][a] || a : (p(a) && (a = e.get("numberFormatter") ? e.get("numberFormatter")(a) : f(a, o, e.get("numberDigitGroupCount"), e.get("numberDigitGroupSep"), e.get("numberDecimalMark"))), 
                    a);
                });
            }
        }), e.spformat = function(t, i) {
            return new n(t, i);
        }, a = function(t, i, e) {
            return t < i ? i : e < t ? e : t;
        }, o = function(t, e) {
            var s;
            return 2 === e ? (s = i.floor(t.length / 2), t.length % 2 ? t[s] : (t[s - 1] + t[s]) / 2) : t.length % 2 ? (s = (t.length * e + e) / 4) % 1 ? (t[i.floor(s)] + t[i.floor(s) - 1]) / 2 : t[s - 1] : (s = (t.length * e + 2) / 4) % 1 ? (t[i.floor(s)] + t[i.floor(s) - 1]) / 2 : t[s - 1];
        }, h = function(t) {
            var i;
            switch (t) {
              case "undefined":
                t = void 0;
                break;

              case "null":
                t = null;
                break;

              case "true":
                t = !0;
                break;

              case "false":
                t = !1;
                break;

              default:
                t == (i = parseFloat(t)) && (t = i);
            }
            return t;
        }, l = function(t) {
            var i, e = [];
            for (i = t.length; i--; ) e[i] = h(t[i]);
            return e;
        }, g = function(t, i) {
            var e, s, r = [];
            for (e = 0, s = t.length; e < s; e++) t[e] !== i && r.push(t[e]);
            return r;
        }, p = function(t) {
            return !isNaN(parseFloat(t)) && isFinite(t);
        }, f = function(t, i, s, r, n) {
            var a, o;
            for (t = (!1 === i ? parseFloat(t).toString() : t.toFixed(i)).split(""), (a = (a = e.inArray(".", t)) < 0 ? t.length : a) < t.length && (t[a] = n), 
            o = a - s; 0 < o; o -= s) t.splice(o, 0, r);
            return t.join("");
        }, d = function(t, i, e) {
            var s;
            for (s = i.length; s--; ) if ((!e || null !== i[s]) && i[s] !== t) return !1;
            return !0;
        }, c = function(t) {
            return e.isArray(t) ? t : [ t ];
        }, u = function(i) {
            var e, s;
            if (t.createStyleSheet) try {
                return void (t.createStyleSheet().cssText = i);
            } catch (t) {
                s = !0;
            }
            (e = t.createElement("style")).type = "text/css", t.getElementsByTagName("head")[0].appendChild(e), 
            s ? t.styleSheets[t.styleSheets.length - 1].cssText = i : e["string" == typeof t.body.style.WebkitAppearance ? "innerText" : "innerHTML"] = i;
        }, e.fn.simpledraw = function(i, s, r, n) {
            var a, o;
            if (r && (a = this.data("_jqs_vcanvas"))) return a;
            if (!1 === e.fn.sparkline.canvas) return !1;
            if (void 0 === e.fn.sparkline.canvas) {
                var h = t.createElement("canvas");
                if (h.getContext && h.getContext("2d")) e.fn.sparkline.canvas = function(t, i, e, s) {
                    return new T(t, i, e, s);
                }; else {
                    if (!t.namespaces || t.namespaces.v) return e.fn.sparkline.canvas = !1;
                    t.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML"), e.fn.sparkline.canvas = function(t, i, e, s) {
                        return new q(t, i, e);
                    };
                }
            }
            return void 0 === i && (i = e(this).innerWidth()), void 0 === s && (s = e(this).innerHeight()), 
            a = e.fn.sparkline.canvas(i, s, this, n), (o = e(this).data("_jqs_mhandler")) && o.registerCanvas(a), 
            a;
        }, e.fn.cleardraw = function() {
            var t = this.data("_jqs_vcanvas");
            t && t.reset();
        }, e.RangeMapClass = v = r({
            init: function(t) {
                var i, e, s = [];
                for (i in t) t.hasOwnProperty(i) && "string" == typeof i && -1 < i.indexOf(":") && ((e = i.split(":"))[0] = 0 === e[0].length ? -1 / 0 : parseFloat(e[0]), 
                e[1] = 0 === e[1].length ? 1 / 0 : parseFloat(e[1]), e[2] = t[i], s.push(e));
                this.map = t, this.rangelist = s || !1;
            },
            get: function(t) {
                var i, e, s, r = this.rangelist;
                if (void 0 !== (s = this.map[t])) return s;
                if (r) for (i = r.length; i--; ) if ((e = r[i])[0] <= t && e[1] >= t) return e[2];
            }
        }), e.range_map = function(t) {
            return new v(t);
        }, m = r({
            init: function(t, i) {
                var s = e(t);
                this.$el = s, this.options = i, this.currentPageX = 0, this.currentPageY = 0, this.el = t, 
                this.splist = [], this.tooltip = null, this.over = !1, this.displayTooltips = !i.get("disableTooltips"), 
                this.highlightEnabled = !i.get("disableHighlight");
            },
            registerSparkline: function(t) {
                this.splist.push(t), this.over && this.updateDisplay();
            },
            registerCanvas: function(t) {
                var i = e(t.canvas);
                this.canvas = t, (this.$canvas = i).mouseenter(e.proxy(this.mouseenter, this)), 
                i.mouseleave(e.proxy(this.mouseleave, this)), i.click(e.proxy(this.mouseclick, this));
            },
            reset: function(t) {
                this.splist = [], this.tooltip && t && (this.tooltip.remove(), this.tooltip = void 0);
            },
            mouseclick: function(t) {
                var i = e.Event("sparklineClick");
                i.originalEvent = t, i.sparklines = this.splist, this.$el.trigger(i);
            },
            mouseenter: function(i) {
                e(t.body).unbind("mousemove.jqs"), e(t.body).bind("mousemove.jqs", e.proxy(this.mousemove, this)), 
                this.over = !0, this.currentPageX = i.pageX, this.currentPageY = i.pageY, this.currentEl = i.target, 
                !this.tooltip && this.displayTooltips && (this.tooltip = new x(this.options), this.tooltip.updatePosition(i.pageX, i.pageY)), 
                this.updateDisplay();
            },
            mouseleave: function() {
                e(t.body).unbind("mousemove.jqs");
                var i, s = this.splist, r = s.length, n = !1;
                for (this.over = !1, this.currentEl = null, this.tooltip && (this.tooltip.remove(), 
                this.tooltip = null), i = 0; i < r; i++) s[i].clearRegionHighlight() && (n = !0);
                n && this.canvas.render();
            },
            mousemove: function(t) {
                this.currentPageX = t.pageX, this.currentPageY = t.pageY, this.currentEl = t.target, 
                this.tooltip && this.tooltip.updatePosition(t.pageX, t.pageY), this.updateDisplay();
            },
            updateDisplay: function() {
                var t, i, s, r, n = this.splist, a = n.length, o = !1, h = this.$canvas.offset(), l = this.currentPageX - h.left, g = this.currentPageY - h.top;
                if (this.over) {
                    for (i = 0; i < a; i++) (s = n[i].setRegionHighlight(this.currentEl, l, g)) && (o = !0);
                    if (o) {
                        if ((r = e.Event("sparklineRegionChange")).sparklines = this.splist, this.$el.trigger(r), 
                        this.tooltip) {
                            for (t = "", i = 0; i < a; i++) t += n[i].getCurrentRegionTooltip();
                            this.tooltip.setContent(t);
                        }
                        this.disableHighlight || this.canvas.render();
                    }
                    null === s && this.mouseleave();
                }
            }
        }), x = r({
            sizeStyle: "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
            init: function(i) {
                var s, r = i.get("tooltipClassname", "jqstooltip"), n = this.sizeStyle;
                this.container = i.get("tooltipContainer") || t.body, this.tooltipOffsetX = i.get("tooltipOffsetX", 10), 
                this.tooltipOffsetY = i.get("tooltipOffsetY", 12), e("#jqssizetip").remove(), e("#jqstooltip").remove(), 
                this.sizetip = e("<div/>", {
                    id: "jqssizetip",
                    style: n,
                    class: r
                }), this.tooltip = e("<div/>", {
                    id: "jqstooltip",
                    class: r
                }).appendTo(this.container), s = this.tooltip.offset(), this.offsetLeft = s.left, 
                this.offsetTop = s.top, this.hidden = !0, e(window).unbind("resize.jqs scroll.jqs"), 
                e(window).bind("resize.jqs scroll.jqs", e.proxy(this.updateWindowDims, this)), this.updateWindowDims();
            },
            updateWindowDims: function() {
                this.scrollTop = e(window).scrollTop(), this.scrollLeft = e(window).scrollLeft(), 
                this.scrollRight = this.scrollLeft + e(window).width(), this.updatePosition();
            },
            getSize: function(t) {
                this.sizetip.html(t).appendTo(this.container), this.width = this.sizetip.width() + 1, 
                this.height = this.sizetip.height(), this.sizetip.remove();
            },
            setContent: function(t) {
                if (!t) return this.tooltip.css("visibility", "hidden"), void (this.hidden = !0);
                this.getSize(t), this.tooltip.html(t).css({
                    width: this.width,
                    height: this.height,
                    visibility: "visible"
                }), this.hidden && (this.hidden = !1, this.updatePosition());
            },
            updatePosition: function(t, i) {
                if (void 0 === t) {
                    if (void 0 === this.mousex) return;
                    t = this.mousex - this.offsetLeft, i = this.mousey - this.offsetTop;
                } else this.mousex = t -= this.offsetLeft, this.mousey = i -= this.offsetTop;
                this.height && this.width && !this.hidden && (i -= this.height + this.tooltipOffsetY, 
                t += this.tooltipOffsetX, i < this.scrollTop && (i = this.scrollTop), t < this.scrollLeft ? t = this.scrollLeft : t + this.width > this.scrollRight && (t = this.scrollRight - this.width), 
                this.tooltip.css({
                    left: t,
                    top: i
                }));
            },
            remove: function() {
                this.tooltip.remove(), this.sizetip.remove(), this.sizetip = this.tooltip = void 0, 
                e(window).unbind("resize.jqs scroll.jqs");
            }
        }), e(function() {
            u('.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;box-sizing: content-box;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}');
        }), I = [], e.fn.sparkline = function(i, s) {
            return this.each(function() {
                var r, n, a = new e.fn.sparkline.options(this, s), o = e(this);
                if (r = function() {
                    var s, r, n, h, l, g, p;
                    s = "html" === i || void 0 === i ? (void 0 !== (p = this.getAttribute(a.get("tagValuesAttribute"))) && null !== p || (p = o.html()), 
                    p.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")) : i, r = "auto" === a.get("width") ? s.length * a.get("defaultPixelsPerValue") : a.get("width"), 
                    "auto" === a.get("height") ? a.get("composite") && e.data(this, "_jqs_vcanvas") || ((h = t.createElement("span")).innerHTML = "a", 
                    o.html(h), n = e(h).innerHeight() || e(h).height(), e(h).remove(), h = null) : n = a.get("height"), 
                    a.get("disableInteraction") ? l = !1 : (l = e.data(this, "_jqs_mhandler")) ? a.get("composite") || l.reset() : (l = new m(this, a), 
                    e.data(this, "_jqs_mhandler", l)), !a.get("composite") || e.data(this, "_jqs_vcanvas") ? ((g = new (e.fn.sparkline[a.get("type")])(this, s, a, r, n)).render(), 
                    l && l.registerSparkline(g)) : e.data(this, "_jqs_errnotify") || (alert("Attempted to attach a composite sparkline to an element with no existing sparkline"), 
                    e.data(this, "_jqs_errnotify", !0));
                }, e(this).html() && !a.get("disableHiddenCheck") && e(this).is(":hidden") || !e(this).parents("body").length) {
                    if (!a.get("composite") && e.data(this, "_jqs_pending")) for (n = I.length; n; n--) I[n - 1][0] == this && I.splice(n - 1, 1);
                    I.push([ this, r ]), e.data(this, "_jqs_pending", !0);
                } else r.call(this);
            });
        }, e.fn.sparkline.defaults = s(), e.sparkline_display_visible = function() {
            var t, i, s, r = [];
            for (i = 0, s = I.length; i < s; i++) t = I[i][0], e(t).is(":visible") && !e(t).parents().is(":hidden") ? (I[i][1].call(t), 
            e.data(I[i][0], "_jqs_pending", !1), r.push(i)) : e(t).closest("html").length || e.data(t, "_jqs_pending") || (e.data(I[i][0], "_jqs_pending", !1), 
            r.push(i));
            for (i = r.length; i; i--) I.splice(r[i - 1], 1);
        }, e.fn.sparkline.options = r({
            init: function(t, i) {
                var s, r, n, a;
                this.userOptions = i = i || {}, this.tag = t, this.tagValCache = {}, n = (r = e.fn.sparkline.defaults).common, 
                this.tagOptionsPrefix = i.enableTagOptions && (i.tagOptionsPrefix || n.tagOptionsPrefix), 
                s = (a = this.getTagSetting("type")) === j ? r[i.type || n.type] : r[a], this.mergedOptions = e.extend({}, n, s, i);
            },
            getTagSetting: function(t) {
                var i, e, s, r, n = this.tagOptionsPrefix;
                if (!1 === n || void 0 === n) return j;
                if (this.tagValCache.hasOwnProperty(t)) i = this.tagValCache.key; else {
                    if (void 0 === (i = this.tag.getAttribute(n + t)) || null === i) i = j; else if ("[" === i.substr(0, 1)) for (e = (i = i.substr(1, i.length - 2).split(",")).length; e--; ) i[e] = h(i[e].replace(/(^\s*)|(\s*$)/g, "")); else if ("{" === i.substr(0, 1)) for (s = i.substr(1, i.length - 2).split(","), 
                    i = {}, e = s.length; e--; ) i[(r = s[e].split(":", 2))[0].replace(/(^\s*)|(\s*$)/g, "")] = h(r[1].replace(/(^\s*)|(\s*$)/g, "")); else i = h(i);
                    this.tagValCache.key = i;
                }
                return i;
            },
            get: function(t, i) {
                var e, s = this.getTagSetting(t);
                return s !== j ? s : void 0 === (e = this.mergedOptions[t]) ? i : e;
            }
        }), e.fn.sparkline._base = r({
            disabled: !1,
            init: function(t, i, s, r, n) {
                this.el = t, this.$el = e(t), this.values = i, this.options = s, this.width = r, 
                this.height = n, this.currentRegion = void 0;
            },
            initTarget: function() {
                var t = !this.options.get("disableInteraction");
                (this.target = this.$el.simpledraw(this.width, this.height, this.options.get("composite"), t)) ? (this.canvasWidth = this.target.pixelWidth, 
                this.canvasHeight = this.target.pixelHeight) : this.disabled = !0;
            },
            render: function() {
                return !this.disabled || (this.el.innerHTML = "", !1);
            },
            getRegion: function(t, i) {},
            setRegionHighlight: function(t, i, e) {
                var s, r = this.currentRegion, n = !this.options.get("disableHighlight");
                return i > this.canvasWidth || e > this.canvasHeight || i < 0 || e < 0 ? null : r !== (s = this.getRegion(t, i, e)) && (void 0 !== r && n && this.removeHighlight(), 
                void 0 !== (this.currentRegion = s) && n && this.renderHighlight(), !0);
            },
            clearRegionHighlight: function() {
                return void 0 !== this.currentRegion && (this.removeHighlight(), !(this.currentRegion = void 0));
            },
            renderHighlight: function() {
                this.changeHighlight(!0);
            },
            removeHighlight: function() {
                this.changeHighlight(!1);
            },
            changeHighlight: function(t) {},
            getCurrentRegionTooltip: function() {
                var t, i, s, r, a, o, h, l, g, p, d, u, c, f, v = this.options, m = "", x = [];
                if (void 0 === this.currentRegion) return "";
                if (t = this.getCurrentRegionFields(), d = v.get("tooltipFormatter")) return d(this, v, t);
                if (v.get("tooltipChartTitle") && (m += '<div class="jqs jqstitle">' + v.get("tooltipChartTitle") + "</div>\n"), 
                !(i = this.options.get("tooltipFormat"))) return "";
                if (e.isArray(i) || (i = [ i ]), e.isArray(t) || (t = [ t ]), h = this.options.get("tooltipFormatFieldlist"), 
                l = this.options.get("tooltipFormatFieldlistKey"), h && l) {
                    for (g = [], o = t.length; o--; ) p = t[o][l], -1 != (f = e.inArray(p, h)) && (g[f] = t[o]);
                    t = g;
                }
                for (s = i.length, c = t.length, o = 0; o < s; o++) for ("string" == typeof (u = i[o]) && (u = new n(u)), 
                r = u.fclass || "jqsfield", f = 0; f < c; f++) t[f].isNull && v.get("tooltipSkipNull") || (e.extend(t[f], {
                    prefix: v.get("tooltipPrefix"),
                    suffix: v.get("tooltipSuffix")
                }), a = u.render(t[f], v.get("tooltipValueLookups"), v), x.push('<div class="' + r + '">' + a + "</div>"));
                return x.length ? m + x.join("\n") : "";
            },
            getCurrentRegionFields: function() {},
            calcHighlightColor: function(t, e) {
                var s, r, n, o, h = e.get("highlightColor"), l = e.get("highlightLighten");
                if (h) return h;
                if (l && (s = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(t) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(t))) {
                    for (n = [], r = 4 === t.length ? 16 : 1, o = 0; o < 3; o++) n[o] = a(i.round(parseInt(s[o + 1], 16) * r * l), 0, 255);
                    return "rgb(" + n.join(",") + ")";
                }
                return t;
            }
        }), y = {
            changeHighlight: function(t) {
                var i, s = this.currentRegion, r = this.target, n = this.regionShapes[s];
                n && (i = this.renderRegion(s, t), e.isArray(i) || e.isArray(n) ? (r.replaceWithShapes(n, i), 
                this.regionShapes[s] = e.map(i, function(t) {
                    return t.id;
                })) : (r.replaceWithShape(n, i), this.regionShapes[s] = i.id));
            },
            render: function() {
                var t, i, s, r, n = this.values, a = this.target, o = this.regionShapes;
                if (this.cls._super.render.call(this)) {
                    for (s = n.length; s--; ) if (t = this.renderRegion(s)) if (e.isArray(t)) {
                        for (i = [], r = t.length; r--; ) t[r].append(), i.push(t[r].id);
                        o[s] = i;
                    } else t.append(), o[s] = t.id; else o[s] = null;
                    a.render();
                }
            }
        }, e.fn.sparkline.line = C = r(e.fn.sparkline._base, {
            type: "line",
            init: function(t, i, e, s, r) {
                C._super.init.call(this, t, i, e, s, r), this.vertices = [], this.regionMap = [], 
                this.xvalues = [], this.yvalues = [], this.yminmax = [], this.hightlightSpotId = null, 
                this.lastShapeId = null, this.initTarget();
            },
            getRegion: function(t, i, e) {
                var s, r = this.regionMap;
                for (s = r.length; s--; ) if (null !== r[s] && i >= r[s][0] && i <= r[s][1]) return r[s][2];
            },
            getCurrentRegionFields: function() {
                var t = this.currentRegion;
                return {
                    isNull: null === this.yvalues[t],
                    x: this.xvalues[t],
                    y: this.yvalues[t],
                    color: this.options.get("lineColor"),
                    fillColor: this.options.get("fillColor"),
                    offset: t
                };
            },
            renderHighlight: function() {
                var t, i, e = this.currentRegion, s = this.target, r = this.vertices[e], n = this.options, a = n.get("spotRadius"), o = n.get("highlightSpotColor"), h = n.get("highlightLineColor");
                r && (a && o && (t = s.drawCircle(r[0], r[1], a, void 0, o), this.highlightSpotId = t.id, 
                s.insertAfterShape(this.lastShapeId, t)), h && (i = s.drawLine(r[0], this.canvasTop, r[0], this.canvasTop + this.canvasHeight, h), 
                this.highlightLineId = i.id, s.insertAfterShape(this.lastShapeId, i)));
            },
            removeHighlight: function() {
                var t = this.target;
                this.highlightSpotId && (t.removeShapeId(this.highlightSpotId), this.highlightSpotId = null), 
                this.highlightLineId && (t.removeShapeId(this.highlightLineId), this.highlightLineId = null);
            },
            scanValues: function() {
                var t, e, s, r, n, a = this.values, o = a.length, h = this.xvalues, l = this.yvalues, g = this.yminmax;
                for (t = 0; t < o; t++) e = a[t], s = "string" == typeof a[t], r = "object" == typeof a[t] && a[t] instanceof Array, 
                n = s && a[t].split(":"), s && 2 === n.length ? (h.push(Number(n[0])), l.push(Number(n[1])), 
                g.push(Number(n[1]))) : r ? (h.push(e[0]), l.push(e[1]), g.push(e[1])) : (h.push(t), 
                null === a[t] || "null" === a[t] ? l.push(null) : (l.push(Number(e)), g.push(Number(e))));
                this.options.get("xvalues") && (h = this.options.get("xvalues")), this.maxy = this.maxyorg = i.max.apply(i, g), 
                this.miny = this.minyorg = i.min.apply(i, g), this.maxx = i.max.apply(i, h), this.minx = i.min.apply(i, h), 
                this.xvalues = h, this.yvalues = l, this.yminmax = g;
            },
            processRangeOptions: function() {
                var t = this.options, i = t.get("normalRangeMin"), e = t.get("normalRangeMax");
                void 0 !== i && (i < this.miny && (this.miny = i), e > this.maxy && (this.maxy = e)), 
                void 0 !== t.get("chartRangeMin") && (t.get("chartRangeClip") || t.get("chartRangeMin") < this.miny) && (this.miny = t.get("chartRangeMin")), 
                void 0 !== t.get("chartRangeMax") && (t.get("chartRangeClip") || t.get("chartRangeMax") > this.maxy) && (this.maxy = t.get("chartRangeMax")), 
                void 0 !== t.get("chartRangeMinX") && (t.get("chartRangeClipX") || t.get("chartRangeMinX") < this.minx) && (this.minx = t.get("chartRangeMinX")), 
                void 0 !== t.get("chartRangeMaxX") && (t.get("chartRangeClipX") || t.get("chartRangeMaxX") > this.maxx) && (this.maxx = t.get("chartRangeMaxX"));
            },
            drawNormalRange: function(t, e, s, r, n) {
                var a = this.options.get("normalRangeMin"), o = this.options.get("normalRangeMax"), h = e + i.round(s - s * ((o - this.miny) / n)), l = i.round(s * (o - a) / n);
                this.target.drawRect(t, h, r, l, void 0, this.options.get("normalRangeColor")).append();
            },
            render: function() {
                var t, s, r, n, a, o, h, l, g, p, d, u, c, f, m, x, y, w, b, R, S, k, M, _, H = this.options, W = this.target, T = this.canvasWidth, q = this.canvasHeight, I = this.vertices, j = H.get("spotRadius"), P = this.regionMap;
                if (C._super.render.call(this) && (this.scanValues(), this.processRangeOptions(), 
                k = this.xvalues, M = this.yvalues, this.yminmax.length && !(this.yvalues.length < 2))) {
                    for (n = a = 0, t = this.maxx - this.minx == 0 ? 1 : this.maxx - this.minx, s = this.maxy - this.miny == 0 ? 1 : this.maxy - this.miny, 
                    r = this.yvalues.length - 1, j && (T < 4 * j || q < 4 * j) && (j = 0), j && (((R = H.get("highlightSpotColor") && !H.get("disableInteraction")) || H.get("minSpotColor") || H.get("spotColor") && M[r] === this.miny) && (q -= i.ceil(j)), 
                    (R || H.get("maxSpotColor") || H.get("spotColor") && M[r] === this.maxy) && (q -= i.ceil(j), 
                    n += i.ceil(j)), (R || (H.get("minSpotColor") || H.get("maxSpotColor")) && (M[0] === this.miny || M[0] === this.maxy)) && (a += i.ceil(j), 
                    T -= i.ceil(j)), (R || H.get("spotColor") || H.get("minSpotColor") || H.get("maxSpotColor") && (M[r] === this.miny || M[r] === this.maxy)) && (T -= i.ceil(j))), 
                    q--, void 0 === H.get("normalRangeMin") || H.get("drawNormalOnTop") || this.drawNormalRange(a, n, q, T, s), 
                    l = [ h = [] ], c = f = null, m = M.length, _ = 0; _ < m; _++) g = k[_], d = k[_ + 1], 
                    p = M[_], f = (u = a + i.round((g - this.minx) * (T / t))) + ((_ < m - 1 ? a + i.round((d - this.minx) * (T / t)) : T) - u) / 2, 
                    P[_] = [ c || 0, f, _ ], c = f, null === p ? _ && (null !== M[_ - 1] && (h = [], 
                    l.push(h)), I.push(null)) : (p < this.miny && (p = this.miny), p > this.maxy && (p = this.maxy), 
                    h.length || h.push([ u, n + q ]), o = [ u, n + i.round(q - q * ((p - this.miny) / s)) ], 
                    h.push(o), I.push(o));
                    for (x = [], y = [], w = l.length, _ = 0; _ < w; _++) (h = l[_]).length && (H.get("fillColor") && (h.push([ h[h.length - 1][0], n + q ]), 
                    y.push(h.slice(0)), h.pop()), 2 < h.length && (h[0] = [ h[0][0], h[1][1] ]), x.push(h));
                    for (w = y.length, _ = 0; _ < w; _++) W.drawShape(y[_], H.get("fillColor"), H.get("fillColor")).append();
                    for (void 0 !== H.get("normalRangeMin") && H.get("drawNormalOnTop") && this.drawNormalRange(a, n, q, T, s), 
                    w = x.length, _ = 0; _ < w; _++) W.drawShape(x[_], H.get("lineColor"), void 0, H.get("lineWidth")).append();
                    if (j && H.get("valueSpots")) for (void 0 === (b = H.get("valueSpots")).get && (b = new v(b)), 
                    _ = 0; _ < m; _++) (S = b.get(M[_])) && W.drawCircle(a + i.round((k[_] - this.minx) * (T / t)), n + i.round(q - q * ((M[_] - this.miny) / s)), j, void 0, S).append();
                    j && H.get("spotColor") && null !== M[r] && W.drawCircle(a + i.round((k[k.length - 1] - this.minx) * (T / t)), n + i.round(q - q * ((M[r] - this.miny) / s)), j, void 0, H.get("spotColor")).append(), 
                    this.maxy !== this.minyorg && (j && H.get("minSpotColor") && (g = k[e.inArray(this.minyorg, M)], 
                    W.drawCircle(a + i.round((g - this.minx) * (T / t)), n + i.round(q - q * ((this.minyorg - this.miny) / s)), j, void 0, H.get("minSpotColor")).append()), 
                    j && H.get("maxSpotColor") && (g = k[e.inArray(this.maxyorg, M)], W.drawCircle(a + i.round((g - this.minx) * (T / t)), n + i.round(q - q * ((this.maxyorg - this.miny) / s)), j, void 0, H.get("maxSpotColor")).append())), 
                    this.lastShapeId = W.getLastShapeId(), this.canvasTop = n, W.render();
                }
            }
        }), e.fn.sparkline.bar = w = r(e.fn.sparkline._base, y, {
            type: "bar",
            init: function(t, s, r, n, o) {
                var p, d, u, c, f, m, x, y, C, b, R, S, k, M, _, H, W, T, q, I, j, P = parseInt(r.get("barWidth"), 10), L = parseInt(r.get("barSpacing"), 10), A = r.get("chartRangeMin"), F = r.get("chartRangeMax"), B = r.get("chartRangeClip"), O = 1 / 0, V = -1 / 0;
                for (w._super.init.call(this, t, s, r, n, o), m = 0, x = s.length; m < x; m++) ((p = "string" == typeof (I = s[m]) && -1 < I.indexOf(":")) || e.isArray(I)) && (_ = !0, 
                p && (I = s[m] = l(I.split(":"))), I = g(I, null), (d = i.min.apply(i, I)) < O && (O = d), 
                V < (u = i.max.apply(i, I)) && (V = u));
                this.stacked = _, this.regionShapes = {}, this.barWidth = P, this.barSpacing = L, 
                this.totalBarWidth = P + L, this.width = n = s.length * P + (s.length - 1) * L, 
                this.initTarget(), B && (k = void 0 === A ? -1 / 0 : A, M = void 0 === F ? 1 / 0 : F), 
                f = [], c = _ ? [] : f;
                var X = [], z = [];
                for (m = 0, x = s.length; m < x; m++) if (_) for (H = s[m], s[m] = q = [], X[m] = 0, 
                c[m] = z[m] = 0, W = 0, T = H.length; W < T; W++) null !== (I = q[W] = B ? a(H[W], k, M) : H[W]) && (0 < I && (X[m] += I), 
                O < 0 && 0 < V ? I < 0 ? z[m] += i.abs(I) : c[m] += I : c[m] += i.abs(I - (I < 0 ? V : O)), 
                f.push(I)); else I = B ? a(s[m], k, M) : s[m], null !== (I = s[m] = h(I)) && f.push(I);
                this.max = S = i.max.apply(i, f), this.min = R = i.min.apply(i, f), this.stackMax = V = _ ? i.max.apply(i, X) : S, 
                this.stackMin = O = _ ? i.min.apply(i, f) : R, void 0 !== r.get("chartRangeMin") && (r.get("chartRangeClip") || r.get("chartRangeMin") < R) && (R = r.get("chartRangeMin")), 
                void 0 !== r.get("chartRangeMax") && (r.get("chartRangeClip") || r.get("chartRangeMax") > S) && (S = r.get("chartRangeMax")), 
                this.zeroAxis = C = r.get("zeroAxis", !0), b = R <= 0 && 0 <= S && C ? 0 : 0 == C ? R : 0 < R ? R : S, 
                this.xaxisOffset = b, y = _ ? i.max.apply(i, c) + i.max.apply(i, z) : S - R, this.canvasHeightEf = C && R < 0 ? this.canvasHeight - 2 : this.canvasHeight - 1, 
                R < b ? (j = ((_ && 0 <= S ? V : S) - b) / y * this.canvasHeight) !== i.ceil(j) && (this.canvasHeightEf -= 2, 
                j = i.ceil(j)) : j = this.canvasHeight, this.yoffset = j, e.isArray(r.get("colorMap")) ? (this.colorMapByIndex = r.get("colorMap"), 
                this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = r.get("colorMap"), 
                this.colorMapByValue && void 0 === this.colorMapByValue.get && (this.colorMapByValue = new v(this.colorMapByValue))), 
                this.range = y;
            },
            getRegion: function(t, e, s) {
                var r = i.floor(e / this.totalBarWidth);
                return r < 0 || r >= this.values.length ? void 0 : r;
            },
            getCurrentRegionFields: function() {
                var t, i, e = this.currentRegion, s = c(this.values[e]), r = [];
                for (i = s.length; i--; ) t = s[i], r.push({
                    isNull: null === t,
                    value: t,
                    color: this.calcColor(i, t, e),
                    offset: e
                });
                return r;
            },
            calcColor: function(t, i, s) {
                var r, n, a = this.colorMapByIndex, o = this.colorMapByValue, h = this.options;
                return r = this.stacked ? h.get("stackedBarColor") : i < 0 ? h.get("negBarColor") : h.get("barColor"), 
                0 === i && void 0 !== h.get("zeroColor") && (r = h.get("zeroColor")), o && (n = o.get(i)) ? r = n : a && a.length > s && (r = a[s]), 
                e.isArray(r) ? r[t % r.length] : r;
            },
            renderRegion: function(t, s) {
                var r, n, a, o, h, l, g, p, u, c, f = this.values[t], v = this.options, m = this.xaxisOffset, x = [], y = this.range, C = this.stacked, w = this.target, b = t * this.totalBarWidth, R = this.canvasHeightEf, S = this.yoffset;
                if (g = (f = e.isArray(f) ? f : [ f ]).length, p = f[0], o = d(null, f), c = d(m, f, !0), 
                o) return v.get("nullColor") ? (a = s ? v.get("nullColor") : this.calcHighlightColor(v.get("nullColor"), v), 
                r = 0 < S ? S - 1 : S, w.drawRect(b, r, this.barWidth - 1, 0, a, a)) : void 0;
                for (h = S, l = 0; l < g; l++) {
                    if (p = f[l], C && p === m) {
                        if (!c || u) continue;
                        u = !0;
                    }
                    n = 0 < y ? i.floor(R * (i.abs(p - m) / y)) + 1 : 1, p < m || p === m && 0 === S ? (r = h, 
                    h += n) : (r = S - n, S -= n), a = this.calcColor(l, p, t), s && (a = this.calcHighlightColor(a, v)), 
                    x.push(w.drawRect(b, r, this.barWidth - 1, n - 1, a, a));
                }
                return 1 === x.length ? x[0] : x;
            }
        }), e.fn.sparkline.tristate = b = r(e.fn.sparkline._base, y, {
            type: "tristate",
            init: function(t, i, s, r, n) {
                var a = parseInt(s.get("barWidth"), 10), o = parseInt(s.get("barSpacing"), 10);
                b._super.init.call(this, t, i, s, r, n), this.regionShapes = {}, this.barWidth = a, 
                this.barSpacing = o, this.totalBarWidth = a + o, this.values = e.map(i, Number), 
                this.width = r = i.length * a + (i.length - 1) * o, e.isArray(s.get("colorMap")) ? (this.colorMapByIndex = s.get("colorMap"), 
                this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = s.get("colorMap"), 
                this.colorMapByValue && void 0 === this.colorMapByValue.get && (this.colorMapByValue = new v(this.colorMapByValue))), 
                this.initTarget();
            },
            getRegion: function(t, e, s) {
                return i.floor(e / this.totalBarWidth);
            },
            getCurrentRegionFields: function() {
                var t = this.currentRegion;
                return {
                    isNull: void 0 === this.values[t],
                    value: this.values[t],
                    color: this.calcColor(this.values[t], t),
                    offset: t
                };
            },
            calcColor: function(t, i) {
                var e, s = this.values, r = this.options, n = this.colorMapByIndex, a = this.colorMapByValue;
                return a && (e = a.get(t)) ? e : n && n.length > i ? n[i] : s[i] < 0 ? r.get("negBarColor") : 0 < s[i] ? r.get("posBarColor") : r.get("zeroBarColor");
            },
            renderRegion: function(t, e) {
                var s, r, n, a, o, h, l = this.values, g = this.options, p = this.target;
                if (s = p.pixelHeight, n = i.round(s / 2), a = t * this.totalBarWidth, r = l[t] < 0 ? (o = n) - 1 : 0 < l[t] ? (o = 0, 
                n - 1) : (o = n - 1, 2), null !== (h = this.calcColor(l[t], t))) return e && (h = this.calcHighlightColor(h, g)), 
                p.drawRect(a, o, this.barWidth - 1, r - 1, h, h);
            }
        }), e.fn.sparkline.discrete = R = r(e.fn.sparkline._base, y, {
            type: "discrete",
            init: function(t, s, r, n, a) {
                R._super.init.call(this, t, s, r, n, a), this.regionShapes = {}, this.values = s = e.map(s, Number), 
                this.min = i.min.apply(i, s), this.max = i.max.apply(i, s), this.range = this.max - this.min, 
                this.width = n = "auto" === r.get("width") ? 2 * s.length : this.width, this.interval = i.floor(n / s.length), 
                this.itemWidth = n / s.length, void 0 !== r.get("chartRangeMin") && (r.get("chartRangeClip") || r.get("chartRangeMin") < this.min) && (this.min = r.get("chartRangeMin")), 
                void 0 !== r.get("chartRangeMax") && (r.get("chartRangeClip") || r.get("chartRangeMax") > this.max) && (this.max = r.get("chartRangeMax")), 
                this.initTarget(), this.target && (this.lineHeight = "auto" === r.get("lineHeight") ? i.round(.3 * this.canvasHeight) : r.get("lineHeight"));
            },
            getRegion: function(t, e, s) {
                return i.floor(e / this.itemWidth);
            },
            getCurrentRegionFields: function() {
                var t = this.currentRegion;
                return {
                    isNull: void 0 === this.values[t],
                    value: this.values[t],
                    offset: t
                };
            },
            renderRegion: function(t, e) {
                var s, r, n, o, h = this.values, l = this.options, g = this.min, p = this.max, d = this.range, u = this.interval, c = this.target, f = this.canvasHeight, v = this.lineHeight, m = f - v;
                return r = a(h[t], g, p), o = t * u, s = i.round(m - m * ((r - g) / d)), n = l.get("thresholdColor") && r < l.get("thresholdValue") ? l.get("thresholdColor") : l.get("lineColor"), 
                e && (n = this.calcHighlightColor(n, l)), c.drawLine(o, s, o, s + v, n);
            }
        }), e.fn.sparkline.bullet = S = r(e.fn.sparkline._base, {
            type: "bullet",
            init: function(t, e, s, r, n) {
                var a, o, h;
                S._super.init.call(this, t, e, s, r, n), this.values = e = l(e), (h = e.slice())[0] = null === h[0] ? h[2] : h[0], 
                h[1] = null === e[1] ? h[2] : h[1], a = i.min.apply(i, e), o = i.max.apply(i, e), 
                a = void 0 === s.get("base") ? a < 0 ? a : 0 : s.get("base"), this.min = a, this.max = o, 
                this.range = o - a, this.shapes = {}, this.valueShapes = {}, this.regiondata = {}, 
                this.width = r = "auto" === s.get("width") ? "4.0em" : r, this.target = this.$el.simpledraw(r, n, s.get("composite")), 
                e.length || (this.disabled = !0), this.initTarget();
            },
            getRegion: function(t, i, e) {
                var s = this.target.getShapeAt(t, i, e);
                return void 0 !== s && void 0 !== this.shapes[s] ? this.shapes[s] : void 0;
            },
            getCurrentRegionFields: function() {
                var t = this.currentRegion;
                return {
                    fieldkey: t.substr(0, 1),
                    value: this.values[t.substr(1)],
                    region: t
                };
            },
            changeHighlight: function(t) {
                var i, e = this.currentRegion, s = this.valueShapes[e];
                switch (delete this.shapes[s], e.substr(0, 1)) {
                  case "r":
                    i = this.renderRange(e.substr(1), t);
                    break;

                  case "p":
                    i = this.renderPerformance(t);
                    break;

                  case "t":
                    i = this.renderTarget(t);
                }
                this.valueShapes[e] = i.id, this.shapes[i.id] = e, this.target.replaceWithShape(s, i);
            },
            renderRange: function(t, e) {
                var s = this.values[t], r = i.round(this.canvasWidth * ((s - this.min) / this.range)), n = this.options.get("rangeColors")[t - 2];
                return e && (n = this.calcHighlightColor(n, this.options)), this.target.drawRect(0, 0, r - 1, this.canvasHeight - 1, n, n);
            },
            renderPerformance: function(t) {
                var e = this.values[1], s = i.round(this.canvasWidth * ((e - this.min) / this.range)), r = this.options.get("performanceColor");
                return t && (r = this.calcHighlightColor(r, this.options)), this.target.drawRect(0, i.round(.3 * this.canvasHeight), s - 1, i.round(.4 * this.canvasHeight) - 1, r, r);
            },
            renderTarget: function(t) {
                var e = this.values[0], s = i.round(this.canvasWidth * ((e - this.min) / this.range) - this.options.get("targetWidth") / 2), r = i.round(.1 * this.canvasHeight), n = this.canvasHeight - 2 * r, a = this.options.get("targetColor");
                return t && (a = this.calcHighlightColor(a, this.options)), this.target.drawRect(s, r, this.options.get("targetWidth") - 1, n - 1, a, a);
            },
            render: function() {
                var t, i, e = this.values.length, s = this.target;
                if (S._super.render.call(this)) {
                    for (t = 2; t < e; t++) i = this.renderRange(t).append(), this.shapes[i.id] = "r" + t, 
                    this.valueShapes["r" + t] = i.id;
                    null !== this.values[1] && (i = this.renderPerformance().append(), this.shapes[i.id] = "p1", 
                    this.valueShapes.p1 = i.id), null !== this.values[0] && (i = this.renderTarget().append(), 
                    this.shapes[i.id] = "t0", this.valueShapes.t0 = i.id), s.render();
                }
            }
        }), e.fn.sparkline.pie = k = r(e.fn.sparkline._base, {
            type: "pie",
            init: function(t, s, r, n, a) {
                var o, h = 0;
                if (k._super.init.call(this, t, s, r, n, a), this.shapes = {}, this.valueShapes = {}, 
                this.values = s = e.map(s, Number), "auto" === r.get("width") && (this.width = this.height), 
                0 < s.length) for (o = s.length; o--; ) h += s[o];
                this.total = h, this.initTarget(), this.radius = i.floor(i.min(this.canvasWidth, this.canvasHeight) / 2);
            },
            getRegion: function(t, i, e) {
                var s = this.target.getShapeAt(t, i, e);
                return void 0 !== s && void 0 !== this.shapes[s] ? this.shapes[s] : void 0;
            },
            getCurrentRegionFields: function() {
                var t = this.currentRegion;
                return {
                    isNull: void 0 === this.values[t],
                    value: this.values[t],
                    percent: this.values[t] / this.total * 100,
                    color: this.options.get("sliceColors")[t % this.options.get("sliceColors").length],
                    offset: t
                };
            },
            changeHighlight: function(t) {
                var i = this.currentRegion, e = this.renderSlice(i, t), s = this.valueShapes[i];
                delete this.shapes[s], this.target.replaceWithShape(s, e), this.valueShapes[i] = e.id, 
                this.shapes[e.id] = i;
            },
            renderSlice: function(t, e) {
                var s, r, n, a, o, h = this.target, l = this.options, g = this.radius, p = l.get("borderWidth"), d = l.get("offset"), u = 2 * i.PI, c = this.values, f = this.total, v = d ? 2 * i.PI * (d / 360) : 0;
                for (a = c.length, n = 0; n < a; n++) {
                    if (r = s = v, 0 < f && (r = v + u * (c[n] / f)), t === n) return o = l.get("sliceColors")[n % l.get("sliceColors").length], 
                    e && (o = this.calcHighlightColor(o, l)), h.drawPieSlice(g, g, g - p, s, r, void 0, o);
                    v = r;
                }
            },
            render: function() {
                var t, e, s = this.target, r = this.values, n = this.options, a = this.radius, o = n.get("borderWidth");
                if (k._super.render.call(this)) {
                    for (o && s.drawCircle(a, a, i.floor(a - o / 2), n.get("borderColor"), void 0, o).append(), 
                    e = r.length; e--; ) r[e] && (t = this.renderSlice(e).append(), this.valueShapes[e] = t.id, 
                    this.shapes[t.id] = e);
                    s.render();
                }
            }
        }), e.fn.sparkline.box = M = r(e.fn.sparkline._base, {
            type: "box",
            init: function(t, i, s, r, n) {
                M._super.init.call(this, t, i, s, r, n), this.values = e.map(i, Number), this.width = "auto" === s.get("width") ? "4.0em" : r, 
                this.initTarget(), this.values.length || (this.disabled = 1);
            },
            getRegion: function() {
                return 1;
            },
            getCurrentRegionFields: function() {
                var t = [ {
                    field: "lq",
                    value: this.quartiles[0]
                }, {
                    field: "med",
                    value: this.quartiles[1]
                }, {
                    field: "uq",
                    value: this.quartiles[2]
                } ];
                return void 0 !== this.loutlier && t.push({
                    field: "lo",
                    value: this.loutlier
                }), void 0 !== this.routlier && t.push({
                    field: "ro",
                    value: this.routlier
                }), void 0 !== this.lwhisker && t.push({
                    field: "lw",
                    value: this.lwhisker
                }), void 0 !== this.rwhisker && t.push({
                    field: "rw",
                    value: this.rwhisker
                }), t;
            },
            render: function() {
                var t, e, s, r, n, a, h, l, g, p, d, u = this.target, c = this.values, f = c.length, v = this.options, m = this.canvasWidth, x = this.canvasHeight, y = void 0 === v.get("chartRangeMin") ? i.min.apply(i, c) : v.get("chartRangeMin"), C = void 0 === v.get("chartRangeMax") ? i.max.apply(i, c) : v.get("chartRangeMax"), w = 0;
                if (M._super.render.call(this)) {
                    if (v.get("raw")) v.get("showOutliers") && 5 < c.length ? (e = c[0], t = c[1], r = c[2], 
                    n = c[3], a = c[4], h = c[5], l = c[6]) : (t = c[0], r = c[1], n = c[2], a = c[3], 
                    h = c[4]); else if (c.sort(function(t, i) {
                        return t - i;
                    }), r = o(c, 1), n = o(c, 2), s = (a = o(c, 3)) - r, v.get("showOutliers")) {
                        for (t = h = void 0, g = 0; g < f; g++) void 0 === t && c[g] > r - s * v.get("outlierIQR") && (t = c[g]), 
                        c[g] < a + s * v.get("outlierIQR") && (h = c[g]);
                        e = c[0], l = c[f - 1];
                    } else t = c[0], h = c[f - 1];
                    this.quartiles = [ r, n, a ], this.lwhisker = t, this.rwhisker = h, this.loutlier = e, 
                    this.routlier = l, d = m / (C - y + 1), v.get("showOutliers") && (w = i.ceil(v.get("spotRadius")), 
                    d = (m -= 2 * i.ceil(v.get("spotRadius"))) / (C - y + 1), e < t && u.drawCircle((e - y) * d + w, x / 2, v.get("spotRadius"), v.get("outlierLineColor"), v.get("outlierFillColor")).append(), 
                    h < l && u.drawCircle((l - y) * d + w, x / 2, v.get("spotRadius"), v.get("outlierLineColor"), v.get("outlierFillColor")).append()), 
                    u.drawRect(i.round((r - y) * d + w), i.round(.1 * x), i.round((a - r) * d), i.round(.8 * x), v.get("boxLineColor"), v.get("boxFillColor")).append(), 
                    u.drawLine(i.round((t - y) * d + w), i.round(x / 2), i.round((r - y) * d + w), i.round(x / 2), v.get("lineColor")).append(), 
                    u.drawLine(i.round((t - y) * d + w), i.round(x / 4), i.round((t - y) * d + w), i.round(x - x / 4), v.get("whiskerColor")).append(), 
                    u.drawLine(i.round((h - y) * d + w), i.round(x / 2), i.round((a - y) * d + w), i.round(x / 2), v.get("lineColor")).append(), 
                    u.drawLine(i.round((h - y) * d + w), i.round(x / 4), i.round((h - y) * d + w), i.round(x - x / 4), v.get("whiskerColor")).append(), 
                    u.drawLine(i.round((n - y) * d + w), i.round(.1 * x), i.round((n - y) * d + w), i.round(.9 * x), v.get("medianColor")).append(), 
                    v.get("target") && (p = i.ceil(v.get("spotRadius")), u.drawLine(i.round((v.get("target") - y) * d + w), i.round(x / 2 - p), i.round((v.get("target") - y) * d + w), i.round(x / 2 + p), v.get("targetColor")).append(), 
                    u.drawLine(i.round((v.get("target") - y) * d + w - p), i.round(x / 2), i.round((v.get("target") - y) * d + w + p), i.round(x / 2), v.get("targetColor")).append()), 
                    u.render();
                }
            }
        }), H = r({
            init: function(t, i, e, s) {
                this.target = t, this.id = i, this.type = e, this.args = s;
            },
            append: function() {
                return this.target.appendShape(this), this;
            }
        }), W = r({
            _pxregex: /(\d+)(px)?\s*$/i,
            init: function(t, i, s) {
                t && (this.width = t, this.height = i, this.target = s, this.lastShapeId = null, 
                s[0] && (s = s[0]), e.data(s, "_jqs_vcanvas", this));
            },
            drawLine: function(t, i, e, s, r, n) {
                return this.drawShape([ [ t, i ], [ e, s ] ], r, n);
            },
            drawShape: function(t, i, e, s) {
                return this._genShape("Shape", [ t, i, e, s ]);
            },
            drawCircle: function(t, i, e, s, r, n) {
                return this._genShape("Circle", [ t, i, e, s, r, n ]);
            },
            drawPieSlice: function(t, i, e, s, r, n, a) {
                return this._genShape("PieSlice", [ t, i, e, s, r, n, a ]);
            },
            drawRect: function(t, i, e, s, r, n) {
                return this._genShape("Rect", [ t, i, e, s, r, n ]);
            },
            getElement: function() {
                return this.canvas;
            },
            getLastShapeId: function() {
                return this.lastShapeId;
            },
            reset: function() {
                alert("reset not implemented");
            },
            _insert: function(t, i) {
                e(i).html(t);
            },
            _calculatePixelDims: function(t, i, s) {
                var r;
                r = this._pxregex.exec(i), this.pixelHeight = r ? r[1] : e(s).height(), r = this._pxregex.exec(t), 
                this.pixelWidth = r ? r[1] : e(s).width();
            },
            _genShape: function(t, i) {
                var e = P++;
                return i.unshift(e), new H(this, e, t, i);
            },
            appendShape: function(t) {
                alert("appendShape not implemented");
            },
            replaceWithShape: function(t, i) {
                alert("replaceWithShape not implemented");
            },
            insertAfterShape: function(t, i) {
                alert("insertAfterShape not implemented");
            },
            removeShapeId: function(t) {
                alert("removeShapeId not implemented");
            },
            getShapeAt: function(t, i, e) {
                alert("getShapeAt not implemented");
            },
            render: function() {
                alert("render not implemented");
            }
        }), T = r(W, {
            init: function(i, s, r, n) {
                T._super.init.call(this, i, s, r), this.canvas = t.createElement("canvas"), r[0] && (r = r[0]), 
                e.data(r, "_jqs_vcanvas", this), e(this.canvas).css({
                    display: "inline-block",
                    width: i,
                    height: s,
                    verticalAlign: "top"
                }), this._insert(this.canvas, r), this._calculatePixelDims(i, s, this.canvas), this.canvas.width = this.pixelWidth, 
                this.canvas.height = this.pixelHeight, this.interact = n, this.shapes = {}, this.shapeseq = [], 
                this.currentTargetShapeId = void 0, e(this.canvas).css({
                    width: this.pixelWidth,
                    height: this.pixelHeight
                });
            },
            _getContext: function(t, i, e) {
                var s = this.canvas.getContext("2d");
                return void 0 !== t && (s.strokeStyle = t), s.lineWidth = void 0 === e ? 1 : e, 
                void 0 !== i && (s.fillStyle = i), s;
            },
            reset: function() {
                this._getContext().clearRect(0, 0, this.pixelWidth, this.pixelHeight), this.shapes = {}, 
                this.shapeseq = [], this.currentTargetShapeId = void 0;
            },
            _drawShape: function(t, i, e, s, r) {
                var n, a, o = this._getContext(e, s, r);
                for (o.beginPath(), o.moveTo(i[0][0] + .5, i[0][1] + .5), n = 1, a = i.length; n < a; n++) o.lineTo(i[n][0] + .5, i[n][1] + .5);
                void 0 !== e && o.stroke(), void 0 !== s && o.fill(), void 0 !== this.targetX && void 0 !== this.targetY && o.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = t);
            },
            _drawCircle: function(t, e, s, r, n, a, o) {
                var h = this._getContext(n, a, o);
                h.beginPath(), h.arc(e, s, r, 0, 2 * i.PI, !1), void 0 !== this.targetX && void 0 !== this.targetY && h.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = t), 
                void 0 !== n && h.stroke(), void 0 !== a && h.fill();
            },
            _drawPieSlice: function(t, i, e, s, r, n, a, o) {
                var h = this._getContext(a, o);
                h.beginPath(), h.moveTo(i, e), h.arc(i, e, s, r, n, !1), h.lineTo(i, e), h.closePath(), 
                void 0 !== a && h.stroke(), o && h.fill(), void 0 !== this.targetX && void 0 !== this.targetY && h.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = t);
            },
            _drawRect: function(t, i, e, s, r, n, a) {
                return this._drawShape(t, [ [ i, e ], [ i + s, e ], [ i + s, e + r ], [ i, e + r ], [ i, e ] ], n, a);
            },
            appendShape: function(t) {
                return this.shapes[t.id] = t, this.shapeseq.push(t.id), this.lastShapeId = t.id, 
                t.id;
            },
            replaceWithShape: function(t, i) {
                var e, s = this.shapeseq;
                for (this.shapes[i.id] = i, e = s.length; e--; ) s[e] == t && (s[e] = i.id);
                delete this.shapes[t];
            },
            replaceWithShapes: function(t, i) {
                var e, s, r, n = this.shapeseq, a = {};
                for (s = t.length; s--; ) a[t[s]] = !0;
                for (s = n.length; s--; ) a[e = n[s]] && (n.splice(s, 1), delete this.shapes[e], 
                r = s);
                for (s = i.length; s--; ) n.splice(r, 0, i[s].id), this.shapes[i[s].id] = i[s];
            },
            insertAfterShape: function(t, i) {
                var e, s = this.shapeseq;
                for (e = s.length; e--; ) if (s[e] === t) return s.splice(e + 1, 0, i.id), void (this.shapes[i.id] = i);
            },
            removeShapeId: function(t) {
                var i, e = this.shapeseq;
                for (i = e.length; i--; ) if (e[i] === t) {
                    e.splice(i, 1);
                    break;
                }
                delete this.shapes[t];
            },
            getShapeAt: function(t, i, e) {
                return this.targetX = i, this.targetY = e, this.render(), this.currentTargetShapeId;
            },
            render: function() {
                var t, i, e = this.shapeseq, s = this.shapes, r = e.length;
                for (this._getContext().clearRect(0, 0, this.pixelWidth, this.pixelHeight), i = 0; i < r; i++) this["_draw" + (t = s[e[i]]).type].apply(this, t.args);
                this.interact || (this.shapes = {}, this.shapeseq = []);
            }
        }), q = r(W, {
            init: function(i, s, r) {
                var n;
                q._super.init.call(this, i, s, r), r[0] && (r = r[0]), e.data(r, "_jqs_vcanvas", this), 
                this.canvas = t.createElement("span"), e(this.canvas).css({
                    display: "inline-block",
                    position: "relative",
                    overflow: "hidden",
                    width: i,
                    height: s,
                    margin: "0px",
                    padding: "0px",
                    verticalAlign: "top"
                }), this._insert(this.canvas, r), this._calculatePixelDims(i, s, this.canvas), this.canvas.width = this.pixelWidth, 
                this.canvas.height = this.pixelHeight, n = '<v:group coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" style="position:absolute;top:0;left:0;width:' + this.pixelWidth + "px;height=" + this.pixelHeight + 'px;"></v:group>', 
                this.canvas.insertAdjacentHTML("beforeEnd", n), this.group = e(this.canvas).children()[0], 
                this.rendered = !1, this.prerender = "";
            },
            _drawShape: function(t, i, e, s, r) {
                var n, a, o, h, l, g, p = [];
                for (g = 0, l = i.length; g < l; g++) p[g] = i[g][0] + "," + i[g][1];
                return n = p.splice(0, 1), r = void 0 === r ? 1 : r, a = void 0 === e ? ' stroked="false" ' : ' strokeWeight="' + r + 'px" strokeColor="' + e + '" ', 
                o = void 0 === s ? ' filled="false"' : ' fillColor="' + s + '" filled="true" ', 
                h = p[0] === p[p.length - 1] ? "x " : "", '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"  id="jqsshape' + t + '" ' + a + o + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;"  path="m ' + n + " l " + p.join(", ") + " " + h + 'e"> </v:shape>';
            },
            _drawCircle: function(t, i, e, s, r, n, a) {
                return '<v:oval  id="jqsshape' + t + '" ' + (void 0 === r ? ' stroked="false" ' : ' strokeWeight="' + a + 'px" strokeColor="' + r + '" ') + (void 0 === n ? ' filled="false"' : ' fillColor="' + n + '" filled="true" ') + ' style="position:absolute;top:' + (e -= s) + "px; left:" + (i -= s) + "px; width:" + 2 * s + "px; height:" + 2 * s + 'px"></v:oval>';
            },
            _drawPieSlice: function(t, e, s, r, n, a, o, h) {
                var l, g, p, d, u, c, f;
                if (n === a) return "";
                if (a - n == 2 * i.PI && (n = 0, a = 2 * i.PI), g = e + i.round(i.cos(n) * r), p = s + i.round(i.sin(n) * r), 
                d = e + i.round(i.cos(a) * r), u = s + i.round(i.sin(a) * r), g === d && p === u) {
                    if (a - n < i.PI) return "";
                    g = d = e + r, p = u = s;
                }
                return g === d && p === u && a - n < i.PI ? "" : (l = [ e - r, s - r, e + r, s + r, g, p, d, u ], 
                c = void 0 === o ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + o + '" ', 
                f = void 0 === h ? ' filled="false"' : ' fillColor="' + h + '" filled="true" ', 
                '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"  id="jqsshape' + t + '" ' + c + f + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;"  path="m ' + e + "," + s + " wa " + l.join(", ") + ' x e"> </v:shape>');
            },
            _drawRect: function(t, i, e, s, r, n, a) {
                return this._drawShape(t, [ [ i, e ], [ i, e + r ], [ i + s, e + r ], [ i + s, e ], [ i, e ] ], n, a);
            },
            reset: function() {
                this.group.innerHTML = "";
            },
            appendShape: function(t) {
                var i = this["_draw" + t.type].apply(this, t.args);
                return this.rendered ? this.group.insertAdjacentHTML("beforeEnd", i) : this.prerender += i, 
                this.lastShapeId = t.id, t.id;
            },
            replaceWithShape: function(t, i) {
                var s = e("#jqsshape" + t), r = this["_draw" + i.type].apply(this, i.args);
                s[0].outerHTML = r;
            },
            replaceWithShapes: function(t, i) {
                var s, r = e("#jqsshape" + t[0]), n = "", a = i.length;
                for (s = 0; s < a; s++) n += this["_draw" + i[s].type].apply(this, i[s].args);
                for (r[0].outerHTML = n, s = 1; s < t.length; s++) e("#jqsshape" + t[s]).remove();
            },
            insertAfterShape: function(t, i) {
                var s = e("#jqsshape" + t), r = this["_draw" + i.type].apply(this, i.args);
                s[0].insertAdjacentHTML("afterEnd", r);
            },
            removeShapeId: function(t) {
                var i = e("#jqsshape" + t);
                this.group.removeChild(i[0]);
            },
            getShapeAt: function(t, i, e) {
                return t.id.substr(8);
            },
            render: function() {
                this.rendered || (this.group.innerHTML = this.prerender, this.rendered = !0);
            }
        });
    });
}(document, Math);