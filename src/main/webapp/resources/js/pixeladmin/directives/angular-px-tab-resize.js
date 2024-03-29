function pxTabResizeDirective(e, t) {
    "use strict";
    return {
        restrict: "A",
        link: function(n, i, a) {
            var o = a.instance ? t(a.instance).assign : angular.noop, r = {};
            a.buttonTemplate && (r.template = t(a.buttonTemplate)(n)), a.buttonContent && (r.content = t(a.buttonContent)(n)), 
            e(function() {
                i.pxTabResize(r), o(n, $.fn.pxTabResize.bind(i)), i.on("$destroy", function() {
                    return i.pxTabResize("destroy");
                });
            });
        }
    };
}

angular.module("px-tab-resize", []).directive("pxTabResize", [ "$timeout", "$parse", pxTabResizeDirective ]);