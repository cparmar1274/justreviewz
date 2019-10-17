!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("angular"), require("chartist")) : "function" == typeof define && define.amd ? define([ "angular", "chartist" ], e) : t["angular-chartist"] = e(t.angular, t.Chartist);
}(this, function(t, e) {
    "use strict";
    t = t && t.hasOwnProperty("default") ? t.default : t, e = e && e.hasOwnProperty("default") ? e.default : e, 
    "function" == typeof Symbol && Symbol.asyncIterator && Symbol.asyncIterator;
    var r = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(t, r.key, r);
            }
        }
        return function(e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e;
        };
    }(), i = t.module("angular-chartist", []), s = function() {
        function i(t, e) {
            var r = this;
            (function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            })(this, i), this.data = t.data, this.chartType = t.chartType, this.events = t.events() || {}, 
            this.options = t.chartOptions() || null, this.responsiveOptions = t.responsiveOptions() || null, 
            this.element = e[0], this.renderChart(), t.$watch(function() {
                return {
                    data: t.data,
                    chartType: t.chartType,
                    chartOptions: t.chartOptions() || null,
                    responsiveOptions: t.responsiveOptions() || null,
                    events: t.events() || {}
                };
            }, this.update.bind(this), !0), t.$on("$destroy", function() {
                r.chart && r.chart.detach();
            });
        }
        return i.$inject = [ "$scope", "$element" ], r(i, [ {
            key: "bindEvents",
            value: function() {
                var t = this;
                Object.keys(this.events).forEach(function(e) {
                    t.chart.on(e, t.events[e]);
                });
            }
        }, {
            key: "unbindEvents",
            value: function(t) {
                var e = this;
                Object.keys(t).forEach(function(n) {
                    e.chart.off(n, t[n]);
                });
            }
        }, {
            key: "renderChart",
            value: function() {
                if (this.data) return this.chart = e[this.chartType](this.element, this.data, this.options, this.responsiveOptions), 
                this.bindEvents(), this.chart;
            }
        }, {
            key: "update",
            value: function(e, n) {
                this.chartType = e.chartType, this.data = e.data, this.options = e.chartOptions, 
                this.responsiveOptions = e.responsiveOptions, this.events = e.events, this.chart && e.chartType === n.chartType ? (t.equals(e.events, n.events) || (this.unbindEvents(n.events), 
                this.bindEvents()), this.chart.update(this.data, this.options)) : this.renderChart();
            }
        } ]), i;
    }();
    return i.controller("AngularChartistCtrl", s).directive("chartist", function() {
        return {
            restrict: "EA",
            scope: {
                data: "=chartistData",
                chartType: "@chartistChartType",
                events: "&chartistEvents",
                chartOptions: "&chartistChartOptions",
                responsiveOptions: "&chartistResponsiveOptions"
            },
            controller: "AngularChartistCtrl"
        };
    }), i.name;
});