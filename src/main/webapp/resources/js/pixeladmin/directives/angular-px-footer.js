function pxFooterDirective(e, t, o) {
    "use strict";
    return {
        restrict: "E",
        transclude: !0,
        replace: !0,
        template: '<footer class="px-footer"></footer>',
        compile: function(n, r) {
            var i = "ngFooterContentLoaded_" + pxUtil.generateUniqueId();
            return r.templateUrl ? n.append($('<div ng-include="' + r.templateUrl + '" onload="' + i + '()"></div>')) : n.append("<div ng-transclude></div>"), 
            {
                pre: function(a) {
                    function p() {
                        n.pxFooter(), d(a, $.fn.pxFooter.bind(n));
                        var t = e.$on("$viewContentLoaded", function() {
                            return n.pxFooter("update");
                        });
                        n.on("$destroy", function() {
                            n.pxFooter("destroy"), t();
                        });
                    }
                    var d = r.instance ? t(r.instance).assign : angular.noop;
                    if (!r.templateUrl) return o(p);
                    a[i] = function() {
                        delete a[i], p();
                    };
                }
            };
        }
    };
}

angular.module("px-footer", []).directive("pxFooter", [ "$rootScope", "$parse", "$timeout", pxFooterDirective ]);