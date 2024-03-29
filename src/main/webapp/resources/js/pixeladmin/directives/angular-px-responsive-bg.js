function pxResponsiveBgDirective(e) {
    "use strict";
    var r = [ "backgroundImage", "overlay", "overlayOpacity", "backgroundPosition" ];
    return {
        restrict: "EA",
        scope: {
            backgroundImage: "=",
            overlay: "=",
            overlayOpacity: "="
        },
        link: function(e, n) {
            function o() {
                n.data(i) && n.pxResponsiveBg("destroy");
                var o = {};
                r.forEach(function(r) {
                    return o[r] = e[r];
                }), n.pxResponsiveBg(o);
            }
            var i = $.fn.pxResponsiveBg.Constructor.DATA_KEY;
            r.forEach(function(r) {
                return e.$watch(r, o);
            }), n.on("$destroy", function() {
                return n.pxResponsiveBg("destroy");
            });
        }
    };
}

angular.module("px-responsive-bg", []).directive("responsiveBg", [ "$parse", pxResponsiveBgDirective ]);