function angularMaskedinputDirective(e) {
    "use strict";
    var r = [ "miPlaceholder", "autoclear", "completed" ];
    return {
        restrict: "A",
        link: function(a, i, n) {
            var t = n.mask && e(n.mask)(a);
            if (!t) throw new Error("Mask is not specified.");
            var o = {};
            r.forEach(function(r) {
                void 0 !== n[r] && (o["miPlaceholder" === r ? "placeholder" : r] = e(n[r])(a));
            }), i.mask(t, o), i.on("$destroy", function() {
                return i.off();
            });
        }
    };
}

angular.module("angular-maskedinput", []).directive("maskedinput", [ "$parse", angularMaskedinputDirective ]);