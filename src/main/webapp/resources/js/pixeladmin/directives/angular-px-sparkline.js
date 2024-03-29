function pxSparklineDirective(e) {
    "use strict";
    return {
        restrict: "A",
        require: "ngModel",
        link: function(n, r, i, t) {
            function a() {
                var a = angular.extend({
                    type: "line"
                }, e(i.options)(n) || {}), l = angular.isString(t.$viewValue) ? t.$viewValue.replace(/(^,)|(,$)/g, "") : t.$viewValue, u = angular.isArray(l) ? l : l.split(",");
                r.pxSparkline(u, a);
            }
            n.$watch(i.ngModel, function() {
                return a();
            }), n.$watch(i.options, function() {
                return a();
            }), r.on("$destroy", function() {
                return r.pxSparkline("destroy");
            });
        }
    };
}

angular.module("px-sparkline", []).directive("pxSparkline", [ "$parse", pxSparklineDirective ]);