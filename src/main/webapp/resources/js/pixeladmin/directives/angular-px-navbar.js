function pxNavbarDirective(a, e) {
    "use strict";
    return {
        restrict: "E",
        transclude: !0,
        replace: !0,
        template: '<nav class="navbar px-navbar"></nav>',
        compile: function(n, r) {
            var t = "ngNavbarContentLoaded_" + pxUtil.generateUniqueId();
            return r.templateUrl ? n.append($('<div ng-include="' + r.templateUrl + '" onload="' + t + '()"></div>')) : n.append("<div ng-transclude></div>"), 
            {
                pre: function(i) {
                    function p() {
                        n.pxNavbar(), v(i, $.fn.pxNavbar.bind(n)), n.on("$destroy", function() {
                            return n.pxNavbar("destroy");
                        });
                    }
                    var v = r.instance ? a(r.instance).assign : angular.noop;
                    if (!r.templateUrl) return e(p);
                    i[t] = function() {
                        delete i[t], p();
                    };
                }
            };
        }
    };
}

angular.module("px-navbar", []).directive("pxNavbar", [ "$parse", "$timeout", pxNavbarDirective ]);