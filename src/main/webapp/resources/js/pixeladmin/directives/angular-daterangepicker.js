function daterangepickerDirective(e) {
    "use strict";
    var t = [ "startDate", "endDate", "minDate", "maxDate", "dateLimit", "ranges", "locale", "singleDatePicker" ], n = [ "showDropdowns", "showWeekNumbers", "showISOWeekNumbers", "timePicker", "timePickerIncrement", "timePicker24Hour", "timePickerSeconds", "showCustomRangeLabel", "alwaysShowCalendars", "opens", "drops", "buttonClasses", "applyClass", "cancelClass", "autoApply", "linkedCalendars", "isInvalidDate", "isCustomDate", "autoUpdateInput", "parentEl" ], r = [ "onShow", "onHide", "onShowCalendar", "onHideCalendar", "onApply", "onCancel" ];
    return {
        restrict: "A",
        scope: {
            startDate: "=",
            endDate: "=?",
            minDate: "=",
            maxDate: "=",
            dateLimit: "=",
            ranges: "=",
            locale: "=",
            singleDatePicker: "=",
            callback: "="
        },
        link: function(i, o, c) {
            function d() {
                var e = o.data("daterangepicker");
                if (e) {
                    var a = e.startDate, t = e.endDate;
                    f === a && D === t || i.$applyAsync(function() {
                        f !== a && (f = a, i.startDate = a), D !== t && (D = t, i.endDate = t);
                    });
                }
            }
            function s() {
                t.forEach(function(e) {
                    void 0 !== c[e] ? p[e] = i[e] : delete p[e];
                }), f = i.startDate, D = i.endDate, o.off(".daterangepicker").daterangepicker(p, i.callback), 
                Object.keys(u).forEach(function(e) {
                    o.on(e + ".daterangepicker", u[e]);
                }), d();
            }
            var l = c.instance ? e(c.instance).assign : angular.noop, p = {}, u = {}, f = void 0, D = void 0;
            n.forEach(function(a) {
                void 0 !== c[a] && (p[a] = e(c[a])(i.$parent));
            }), r.forEach(function(t) {
                c[t] && (u[function(e) {
                    return e.replace(/^on([A-Z])/, function(e, a) {
                        return a.toLowerCase();
                    });
                }(t)] = e(c[t])(i.$parent));
            });
            var k = u.hide || function() {};
            u.hide = function() {
                d();
                for (var e = arguments.length, a = Array(e), t = 0; t < e; t++) a[t] = arguments[t];
                k.apply(this, a);
            }, s(), i.$watch("startDate", function(e) {
                void 0 !== e && f !== e && (f = e, o.data("daterangepicker").setStartDate(e));
            }), i.$watch("endDate", function(e) {
                void 0 !== e && D !== e && (D = e, o.data("daterangepicker").setEndDate(e));
            }), [ "minDate", "maxDate", "dateLimit", "ranges", "locale", "singleDatePicker" ].forEach(function(e) {
                i.$watch(e, function(e) {
                    void 0 !== e && s();
                });
            }), l(i.$parent, $.fn.daterangepicker.bind(o)), o.on("$destroy", function() {
                o.off().data("daterangepicker").remove();
            });
        }
    };
}

angular.module("daterangepicker", []).directive("daterangepicker", [ "$parse", daterangepickerDirective ]);