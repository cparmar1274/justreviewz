function pxExpandingInputDirective(n, t) {
    "use strict";
    var e = [ "onExpand", "onExpanded", "onCollapse", "onCollapsed" ];
    return {
        restrict: "E",
        transclude: !0,
        template: '<div class="expanding-input" ng-transclude></div>',
        replace: !0,
        link: function(p, a, r) {
            var u = r.instance ? t(r.instance).assign : angular.noop;
            n(function() {
                a.pxExpandingInput(), e.forEach(function(n) {
                    r[n] && a.on(function(n) {
                        return n.replace(/on([A-Z])/g, function(n, t) {
                            return t.toLowerCase();
                        });
                    }(n) + ".px.expanding-input", t(r[n])(p));
                }), void 0 !== r.expand && p.$watch(r.expand, function(n) {
                    a.pxExpandingInput(n ? "expand" : "collapse");
                }), u(p, $.fn.pxExpandingInput.bind(a)), a.on("$destroy", function() {
                    return a.off().pxExpandingInput("destroy");
                });
            });
        }
    };
}

function pxExpandingInputControlDirective() {
    "use strict";
    return {
        restrict: "A",
        link: function(n, t) {
            t.addClass("expanding-input-control");
        }
    };
}

function pxExpandingInputContentDirective() {
    "use strict";
    return {
        restrict: "E",
        transclude: !0,
        template: '<div class="expanding-input-content" ng-transclude></div>',
        replace: !0
    };
}

angular.module("px-expanding-input", []).directive("pxExpandingInput", [ "$timeout", "$parse", pxExpandingInputDirective ]).directive("pxExpandingInputControl", pxExpandingInputControlDirective).directive("pxExpandingInputContent", pxExpandingInputContentDirective);