function knobDirective(n, e) {
    "use strict";
    var o = [ "onRelease", "onChange", "onDraw", "onCancel", "onFormat" ];
    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            ngModel: "="
        },
        link: function(t, i, a) {
            function c(n) {
                n !== f && (f = n, i.trigger("change"));
            }
            var u = {}, f = void 0;
            o.forEach(function(n) {
                a[n] && (u[function(n) {
                    return n.replace(/^on([A-Z])/, function(n, e) {
                        return e.toLowerCase();
                    });
                }(n)] = e(a[n])(t.$parent));
            });
            var l = u.release || function() {};
            u.release = function() {
                for (var n = arguments.length, e = Array(n), r = 0; r < n; r++) e[r] = arguments[r];
                c(e[0]), l.apply(this, e);
            }, n(function() {
                i.knob(u), t.$watch("ngModel", function(n) {
                    return c(n);
                }), i.on("$destroy", function() {
                    return i.off();
                });
            });
        }
    };
}

angular.module("angular-knob", []).directive("knob", [ "$timeout", "$parse", knobDirective ]);