function bootstrapTimepickerDirective(e) {
    "use strict";
    var i = [ "template", "defaultTime", "disableFocus", "disableMousewheel", "modalBackdrop", "appendWidgetTo", "explicitMode", "icons", "maxHours", "snapToStep", "minuteStep", "showSeconds", "secondStep", "showMeridian", "showInputs" ], n = [ "onShow", "onHide", "onChangeTime" ];
    return {
        restrict: "A",
        scope: {
            ngModel: "="
        },
        link: function(t, r, c) {
            var a = c.instance ? e(c.instance).assign : angular.noop, p = {}, s = void 0;
            i.forEach(function(o) {
                void 0 !== c[o] && (p[o] = e(c[o])(t.$parent));
            }), t.ngModel && (s = t.ngModel, r.val(t.ngModel)), r.timepicker(p), n.forEach(function(i) {
                c[i] && r.on(function(e) {
                    return e.replace(/^on([A-Z])/, function(e, o) {
                        return o.toLowerCase();
                    });
                }(i) + ".timepicker", e(c[i])(t.$parent));
            }), t.$watch("ngModel", function(e) {
                s !== e && (s = e, r.timepicker("setTime", e));
            }), a(t.$parent, $.fn.timepicker.bind(r)), r.on("$destroy", function() {
                r.off().timepicker("remove");
            });
        }
    };
}

angular.module("bootstrap-timepicker", []).directive("bootstrapTimepicker", [ "$parse", bootstrapTimepickerDirective ]);