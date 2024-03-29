function ionRangeSliderDirective(n, e) {
    "use strict";
    var o = [ "min", "max", "from", "to", "disable" ], r = [ "irsType", "step", "minInterval", "maxInterval", "dragInterval", "values", "fromFixed", "fromMin", "fromMax", "fromShadow", "toFixed", "toMin", "toMax", "toShadow", "prettifyEnabled", "prettifySeparator", "prettify", "forceEdges", "keyboard", "keyboardStep", "grid", "gridMargin", "gridNum", "gridSnap", "hideMinMax", "hideFromTo", "prefix", "postfix", "maxPostfix", "decorateBoth", "valuesSeparator", "inputValuesSeparator" ], i = [ "onStart", "onChange", "onFinish", "onUpdate" ];
    return {
        restrict: "E",
        replace: !0,
        template: '<input type="text" value="">',
        scope: {
            min: "=",
            max: "=",
            from: "=",
            to: "=",
            disable: "="
        },
        link: function(a, d, f) {
            var u = f.instance ? e(f.instance).assign : angular.noop, c = {};
            o.forEach(function(n) {
                void 0 !== a[n] && (c[n] = a[n]);
            }), r.forEach(function(n) {
                void 0 !== f[n] && (c[function(n) {
                    return "irsType" === n ? "type" : n.replace(/[A-Z]/g, function(n) {
                        return "_" + n.toLowerCase();
                    });
                }(n)] = e(f[n])(a.$parent));
            }), i.forEach(function(n) {
                void 0 !== f[n] && (c[n] = e(f[n])(a.$parent));
            });
            var p = c.onFinish || function() {};
            c.onFinish = function() {
                for (var n = this, e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                a.$apply(function() {
                    a.from = t[0].from, a.to = t[0].to, p.apply(n, t);
                });
            }, n(function() {
                d.ionRangeSlider(c);
                var n = d.data("ionRangeSlider");
                a.$watch("min", function(e) {
                    return n.update({
                        min: e
                    });
                }), a.$watch("max", function(e) {
                    return n.update({
                        max: e
                    });
                }), a.$watch("from", function(e) {
                    n.old_from !== e && n.update({
                        from: e
                    });
                }), a.$watch("to", function(e) {
                    n.old_to !== e && n.update({
                        to: e
                    });
                }), a.$watch("disable", function(e) {
                    return n.update({
                        disable: e
                    });
                }), u(a.$parent, n), a.$on("$destroy", function() {
                    d.ionRangeSlider("destroy"), d.off().removeData("ionRangeSlider");
                });
            });
        }
    };
}

angular.module("ion.rangeslider", []).directive("ionRangeSlider", [ "$timeout", "$parse", ionRangeSliderDirective ]);