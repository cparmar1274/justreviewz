function angularQuickselectDirective(e, t) {
    "use strict";
    var u = [ "activeButtonClass", "breakOutAll", "breakOutValues", "buttonClass", "buttonDefaultClass", "buttonRequiredClass", "buttonTag", "namespace", "selectDefaultText", "wrapperClass" ];
    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            ngModel: "="
        },
        link: function(n, a, r) {
            var c = {};
            u.forEach(function(t) {
                void 0 !== r[t] && (c[t] = e(r[t])(n.$parent));
            }), t(function() {
                a.quickselect(c), n.$watch("ngModel", function() {
                    t(function() {
                        return a.trigger("change");
                    });
                }), a.on("$destroy", function() {
                    return a.off().removeData("plugin_quickselect");
                });
            });
        }
    };
}

angular.module("angular-quickselect", []).directive("quickselect", [ "$parse", "$timeout", angularQuickselectDirective ]);