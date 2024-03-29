function bootstrapSliderDirective(e, t) {
    "use strict";
    function n(e) {
        return "rangeHighlights" === e ? e : e.replace(/[A-Z]/g, function(e) {
            return "_" + e.toLowerCase();
        });
    }
    var i = [ "value", "min", "max", "step", "range", "scale", "ticksLabels", "ticks", "rangeHighlights", "enabled" ], a = {
        min: "num",
        max: "num",
        step: "num",
        range: "bool",
        scale: "str",
        ticksLabels: "arr",
        ticks: "arr",
        rangeHighlights: "arr",
        enabled: "bool"
    }, o = [ "precision", "orientation", "selection", "tooltip", "tooltipSplit", "tooltipPosition", "handle", "reversed", "formatter", "naturalArrowKeys", "ticksPositions", "ticksSnapBounds", "ticksTooltip", "focus", "labelledby" ], l = [ "onSlide", "onSlideStart", "onSlideStop", "onChange", "onSlideEnabled", "onSlideDisabled" ];
    return {
        restrict: "E",
        replace: !0,
        template: '<div><input type="text" value=""></div>',
        scope: {
            value: "=",
            min: "=",
            max: "=",
            step: "=",
            range: "=",
            scale: "=",
            ticksLabels: "=",
            ticks: "=",
            rangeHighlights: "=",
            enabled: "="
        },
        link: function(e, s, c) {
            function f(e) {
                return m !== [].concat(e).join(",");
            }
            function d(e) {
                m = [].concat(e).join(",");
            }
            function p() {
                i.forEach(function(t) {
                    if (void 0 !== e[t]) {
                        var r = a[t], i = n(t);
                        if ("num" === r) {
                            if (h[i] = Number(e[t]), isNaN(h[i])) throw new Error(i + ": " + e[t] + " is not a valid number!");
                        } else if ("str" === r) h[i] = String(e[t]); else if ("bool" === r) h[i] = Boolean(e[t]); else if ("arr" === r) {
                            if ("[object Array]" !== Object.prototype.toString.call(e[t])) throw new Error(i + ": " + e[t] + " is not an array!");
                            h[i] = e[t];
                        } else h[i] = e[t];
                    } else delete h[n(t)];
                }), g.data("slider") && g.off().slider("destroy"), g.slider(h), Object.keys(v).forEach(function(e) {
                    g.on(e, v[e]);
                });
            }
            var b = c.instance ? t(c.instance).assign : angular.noop, g = s.find("input"), h = {}, v = {}, m = null;
            o.forEach(function(r) {
                void 0 !== c[r] && (h[n(r)] = t(c[r])(e.$parent));
            }), l.forEach(function(n) {
                c[n] && (v[function(e) {
                    return e.replace(/^on([A-Z])/, function(e, t) {
                        return t.toLowerCase();
                    });
                }(n)] = t(c[n])(e.$parent));
            });
            var y = v.change || function() {};
            v.change = function() {
                for (var t = this, n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                var a = r[0].value.newValue;
                f(a) && e.$apply(function() {
                    d(a), e.value = a, y.apply(t, r);
                });
            }, p(), b(e.$parent, $.fn.slider.bind(g)), e.$watch("value", function(e) {
                f(e) && (d(e), g.slider("setValue", function(e) {
                    var t = void 0;
                    return "[object Array]" === Object.prototype.toString.call(e) ? (t = [ parseFloat(e[0]), parseFloat(e[1]) ], 
                    isNaN(t[0]) && (t[0] = 0), isNaN(t[1]) && (t[1] = 0)) : (t = parseFloat(e), isNaN(t) && (t = 0)), 
                    t;
                }(e)));
            }, !0), e.$watch("enabled", function(e) {
                g.slider(e ? "enable" : "disable");
            }), i.filter(function(e) {
                return "value" !== e && "enabled" !== e;
            }).forEach(function(t) {
                e.$watch(t, p);
            }), e.$on("$destroy", function() {
                return g.off().slider("destroy");
            });
        }
    };
}

angular.module("bootstrap-slider", []).directive("bootstrapSlider", [ "$timeout", "$parse", bootstrapSliderDirective ]);