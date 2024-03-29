function angularAutosizeDirective() {
    "use strict";
    return {
        restrict: "A",
        link: function(t, e) {
            e.autosize(), e.on("$destroy", function() {
                return e.trigger("autosize.destroy");
            });
        }
    };
}

angular.module("angular-autosize", []).directive("autosize", angularAutosizeDirective);