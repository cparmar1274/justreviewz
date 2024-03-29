function _defineProperty(n, t, i) {
    return t in n ? Object.defineProperty(n, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[t] = i, n;
}

function nouisliderDirective(n, t) {
    "use strict";
    var e = [ "start", "margin", "limit", "step", "range", "animate", "snap", "pips", "disable" ], r = [ "connect", "direction", "orientation", "behaviour", "tooltips", "format", "animationDuration" ], o = [ "onUpdate", "onSlide", "onSet", "onChange", "onStart", "onEnd" ];
    return {
        restrict: "E",
        replace: !0,
        template: "<div />",
        scope: {
            start: "=",
            margin: "=",
            limit: "=",
            step: "=",
            range: "=",
            animate: "=",
            snap: "=",
            pips: "=",
            disable: "="
        },
        link: function(a, c, u) {
            function s(n) {
                return m !== [].concat(n).join(",");
            }
            function f(n) {
                return n.map(function(n) {
                    return "string" == typeof n ? Number(n) : n;
                });
            }
            function p(n) {
                m = [].concat(n).join(",");
            }
            var d = u.instance ? t(u.instance).assign : angular.noop, l = {}, v = {}, m = [].concat(a.start).join(",");
            e.forEach(function(n) {
                void 0 !== a[n] && (l[n] = a[n]);
            }), r.forEach(function(n) {
                void 0 !== u[n] && (l[n] = t(u[n])(a.$parent));
            }), o.forEach(function(n) {
                void 0 !== u[n] && (v[function(n) {
                    return n.replace(/^on([A-Z])/, function(n, t) {
                        return t.toLowerCase();
                    });
                }(n)] = t(u[n])(a.$parent));
            });
            var b = v.update || function() {};
            v.update = function() {
                for (var n = this, t = arguments.length, i = Array(t), e = 0; e < t; e++) i[e] = arguments[e];
                var r = f(i[0]);
                s(r) && a.$applyAsync(function() {
                    p(r), a.start = r, b.apply(n, i);
                });
            }, n(function() {
                noUiSlider.create(c[0], l);
                var t = c[0].noUiSlider;
                Object.keys(v).forEach(function(n) {
                    t.on(n, v[n]);
                }), [ "margin", "limit", "step", "range", "animate", "snap" ].forEach(function(i) {
                    a.$watch(i, function(e) {
                        void 0 !== e && n(function() {
                            return t.updateOptions(_defineProperty({}, i, e));
                        });
                    });
                }), a.$watch("start", function(n) {
                    var i = f(n);
                    s(i) && (p(i), t.set(i));
                }, !0), a.$watch("pips", function(i) {
                    void 0 !== i && n(function() {
                        return t.pips(i);
                    });
                }, !0), a.$watch("disable", function(n) {
                    n ? c[0].setAttribute("disabled", !0) : c[0].removeAttribute("disabled");
                }), d(a.$parent, t), a.$on("$destroy", function() {
                    t.off(), t.destroy();
                });
            });
        }
    };
}

angular.module("nouislider", []).directive("nouislider", [ "$timeout", "$parse", nouisliderDirective ]);