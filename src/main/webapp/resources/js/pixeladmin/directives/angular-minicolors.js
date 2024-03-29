function minicolorsDirective(o) {
    "use strict";
    function n(o) {
        return o.replace(/^on([A-Z])/, function(o, n) {
            return n.toLowerCase();
        });
    }
    var i = [ "animationSpeed", "animationEasing", "changeDelay", "control", "dataUris", "defaultValue", "format", "hideSpeed", "inline", "opacity", "keywords", "letterCase", "position", "showSpeed", "theme", "swatches" ], t = [ "onChange", "onHide", "onShow" ];
    return {
        restrict: "A",
        scope: {
            color: "=",
            animationSpeed: "=",
            animationEasing: "=",
            changeDelay: "=",
            control: "=",
            dataUris: "=",
            defaultValue: "=",
            format: "=",
            hideSpeed: "=",
            inline: "=",
            opacity: "=",
            keywords: "=",
            letterCase: "=",
            position: "=",
            showSpeed: "=",
            theme: "=",
            swatches: "="
        },
        link: function(a, e, c) {
            function r() {
                i.forEach(function(o) {
                    f[o] = a[o];
                }), f.opacity ? ("number" != typeof a.color.opacity && (a.color.opacity = 1), e[0].setAttribute("data-opacity", a.color.opacity)) : e[0].removeAttribute("data-opacity");
            }
            function l(o, n) {
                return [ String(o), String(Number(n)) ].join("|");
            }
            function s(o) {
                return y !== o;
            }
            function u(o) {
                y = o;
            }
            var p = c.instance ? o(c.instance).assign : angular.noop;
            a.color || (a.color = {}), "string" != typeof a.color.value && (a.color.value = "");
            var f = {}, y = void 0;
            t.forEach(function(i) {
                c[i] && (f[n(i)] = o(c[i])(a.$parent));
            }), r(), t.forEach(function(i) {
                c[i] && (f[n(i)] = o(c[i])(a.$parent));
            });
            var d = f.change || function() {};
            f.change = function() {
                for (var o = this, n = arguments.length, i = Array(n), t = 0; t < n; t++) i[t] = arguments[t];
                var e = l(i[0], f.opacity ? i[1] : 1);
                s(e) && (u(e), a.$applyAsync(function() {
                    a.color.value = i[0], f.opacity && (a.color.opacity = i[1]), d.apply(o, i);
                }));
            }, e.val(a.color.value), e.minicolors(f), p(a.$parent, $.fn.minicolors.bind(e)), 
            a.$watch("color", function(o) {
                var n = l(o.value, f.opacity ? o.opacity : 1);
                s(n) && (u(n), f.opacity ? e.minicolors("value", {
                    color: o.value,
                    opacity: o.opacity
                }) : e.minicolors("value", o.value));
            }, !0), i.forEach(function(o) {
                a.$watch(o, function(o) {
                    void 0 !== o && (r(), e.minicolors("settings", f));
                });
            }), e.on("$destroy", function() {
                e.minicolors("destroy");
            });
        }
    };
}

angular.module("minicolors", []).directive("minicolors", [ "$parse", minicolorsDirective ]);