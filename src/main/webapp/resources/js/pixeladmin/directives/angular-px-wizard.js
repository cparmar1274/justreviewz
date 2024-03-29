function pxWizardDirective(n, e) {
    "use strict";
    var r = [ "onStepchange", "onStepchanged", "onFinish", "onFinished", "onFrozen", "onUnfrozen", "onReseted", "onDestroy" ];
    return {
        transclude: !0,
        replace: !0,
        template: '<div class="px-wizard" ng-transclude></div>',
        link: function(t, o, a) {
            var d = a.instance ? n(a.instance).assign : angular.noop, c = {};
            a.minStepWidth && (c.minStepWidth = n(a.minStepWidth)(t)), e(function() {
                o.pxWizard(c), r.forEach(function(e) {
                    a[e] && o.on(function(n) {
                        return n.replace(/^on([A-Z])/, function(n, e) {
                            return e.toLowerCase();
                        });
                    }(e) + ".px.wizard", n(a[e])(t));
                }), d(t, $.fn.pxWizard.bind(o)), o.on("$destroy", function() {
                    return o.off().pxWizard("destroy");
                });
            });
        }
    };
}

angular.module("px-wizard", []).directive("pxWizard", [ "$parse", "$timeout", pxWizardDirective ]);