function bootstrapDatepickerDirective(e) {
    "use strict";
    var a = [ "datesDisabled", "daysOfWeekDisabled", "daysOfWeekHighlighted", "enableOnReadonly", "endDate", "format", "language", "maxViewMode", "minViewMode", "multidate", "multidateSeparator", "orientation", "startDate", "startView", "toggleActive", "weekStart" ], r = [ "autoclose", "beforeShowDay", "beforeShowMonth", "beforeShowYear", "beforeShowDecade", "beforeShowCentury", "calendarWeeks", "clearBtn", "container", "disableTouchKeyboard", "forceParse", "assumeNearbyYear", "immediateUpdates", "keepEmptyValues", "keyboardNavigation", "showOnFocus", "templates", "title", "todayBtn", "todayHighlight", "updateViewDate", "zIndexOffset" ], i = [ "onShow", "onHide", "onClearDate", "onChangeDate", "onChangeMonth", "onChangeYear", "onChangeDecade", "onChangeCentury" ];
    return {
        restrict: "A",
        scope: {
            date: "=",
            datesDisabled: "=",
            daysOfWeekDisabled: "=",
            daysOfWeekHighlighted: "=",
            enableOnReadonly: "=",
            endDate: "=",
            format: "=",
            language: "=",
            maxViewMode: "=",
            minViewMode: "=",
            multidate: "=",
            multidateSeparator: "=",
            orientation: "=",
            startDate: "=",
            startView: "=",
            toggleActive: "=",
            weekStart: "="
        },
        link: function(n, o, d) {
            function c(e) {
                return "input" === b && D.multidate ? "[" + [].concat(e).join("|") + "]" : "range" === b ? "{" + String(e && e.start || null) + "|" + String(e && e.end || null) + "}" : "-" + String(e) + "-";
            }
            function s(e) {
                g = c(e);
            }
            function p(e) {
                return c(e) !== g;
            }
            function u() {
                if (p(n.date)) if (s(n.date), "input" === b) if (D.multidate) {
                    var e = [].concat(n.date);
                    e.length ? o.datepicker("setDates", e) : o.datepicker("clearDates");
                } else o.datepicker("setDate", n.date); else "range" === b ? (o.find(".bs-datepicker-start").datepicker("setDate", n.date.start), 
                o.find(".bs-datepicker-end").datepicker("setDate", n.date.end)) : o.datepicker("setDate", n.date);
            }
            function l() {
                var e;
                p(e = "input" === b && D.multidate ? o.datepicker("getDates") : "range" === b ? {
                    start: o.find(".bs-datepicker-start").datepicker("getDate"),
                    end: o.find(".bs-datepicker-end").datepicker("getDate")
                } : o.datepicker("getDate")) && (s(e), n.$applyAsync(function() {
                    n.date = e;
                }));
            }
            function f() {
                a.forEach(function(e) {
                    void 0 !== n[e] ? D[e] = n[e] : delete D[e];
                }), o.datepicker(D), u();
            }
            var k = d.instance ? e(d.instance).assign : angular.noop, D = {}, g = void 0, b = o.is("input") ? "input" : o.hasClass("date") ? "component" : o.hasClass("input-daterange") ? "range" : "inline";
            r.forEach(function(t) {
                void 0 !== d[t] && (D[t] = e(d[t])(n.$parent));
            }), f(), i.forEach(function(a) {
                d[a] && o.on(function(e) {
                    return e.replace(/^on([A-Z])/, function(e, t) {
                        return t.toLowerCase();
                    });
                }(a), e(d[a])(n.$parent));
            }), o.on("hide.px-datepicker", l), o.on("changeDate.px-datepicker", l), n.$watch("date", u, !0), 
            a.forEach(function(e) {
                n.$watch(e, function(e, t) {
                    void 0 !== e && e !== t && (o.datepicker("destroy"), f());
                });
            }), k(n.$parent, $.fn.datepicker.bind(o)), o.on("$destroy", function() {
                o.off().datepicker("destroy");
            });
        }
    };
}

function bootstrapDatepickerStartDirective() {
    "use strict";
    return {
        restrict: "E",
        template: '<input type="text" class="form-control bs-datepicker-start">',
        replace: !0
    };
}

function bootstrapDatepickerEndDirective() {
    "use strict";
    return {
        restrict: "E",
        template: '<input type="text" class="form-control bs-datepicker-end">',
        replace: !0
    };
}

angular.module("bootstrap-datepicker", []).directive("bootstrapDatepicker", [ "$parse", bootstrapDatepickerDirective ]).directive("bootstrapDatepickerStart", bootstrapDatepickerStartDirective).directive("bootstrapDatepickerEnd", bootstrapDatepickerEndDirective);