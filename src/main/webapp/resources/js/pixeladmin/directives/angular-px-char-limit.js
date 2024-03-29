function angularPxCharLimitDirective() {
    "use strict";
    return {
        restrict: "A",
        link: function(r, i, t) {
            var n = {};
            t.counter && (n.counter = t.counter), i.pxCharLimit(n), i.on("$destroy", function() {
                return i.pxCharLimit("destroy");
            });
        }
    };
}

angular.module("angular-px-char-limit", []).directive("pxCharLimit", angularPxCharLimitDirective);