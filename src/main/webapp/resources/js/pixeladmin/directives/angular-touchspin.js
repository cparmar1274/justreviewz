function angularTouchspinDirective(t, n) {
    "use strict";
    function o(t) {
        return t.replace(/[A-Z]/g, function(t) {
            return "." + t.toLowerCase();
        });
    }
    function i(t) {
        return t.replace(/[A-Z]/g, function(t) {
            return "_" + t.toLowerCase();
        });
    }
    var e = [ "initval", "min", "max", "step", "forcestepdivisibility", "decimals", "stepinterval", "stepintervaldelay", "verticalbuttons", "verticalupclass", "verticaldownclass", "prefix", "postfix", "prefixExtraclass", "postfixExtraclass", "booster", "boostat", "maxboostedstep", "mousewheel", "buttondownClass", "buttonupClass" ], r = [ "onStartspin", "onStartupspin", "onStartdownspin", "onStopspin", "onStopupspin", "onStopdownspin", "onMin", "onMax" ];
    return {
        restrict: "A",
        link: function(s, a, u) {
            var c = {};
            e.forEach(function(n) {
                void 0 !== u[n] && (c[i(n)] = t(u[n])(s));
            }), n(function() {
                a.TouchSpin(c), r.forEach(function(n) {
                    u[n] && a.on("touchspin." + o(n), t(u[n])(s));
                }), a.on("$destroy", function() {
                    return a.TouchSpin("destroy");
                });
            });
        }
    };
}

angular.module("angular-touchspin", []).directive("touchSpin", [ "$parse", "$timeout", angularTouchspinDirective ]);