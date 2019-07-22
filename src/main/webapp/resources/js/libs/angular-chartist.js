!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("angular"), require("chartist")) : "function" == typeof define && define.amd ? define([ "angular", "chartist" ], e) : t["angular-chartist"] = e(t.angular, t.Chartist);
}(this, function(t, e) {
    "use strict";
    t = t && t.hasOwnProperty("default") ? t.default : t, e = e && e.hasOwnProperty("default") ? e.default : e;
    !function() {
        function t(t) {
            this.value = t;
        }
        function e(e) {
            function n(i, s) {
                try {
                    var a = e[i](s), o = a.value;
                    o instanceof t ? Promise.resolve(o.value).then(function(t) {
                        n("next", t);
                    }, function(t) {
                        n("throw", t);
                    }) : r(a.done ? "return" : "normal", a.value);
                } catch (t) {
                    r("throw", t);
                }
            }
            function r(t, e) {
                switch (t) {
                  case "return":
                    i.resolve({
                        value: e,
                        done: !0
                    });
                    break;

                  case "throw":
                    i.reject(e);
                    break;

                  default:
                    i.resolve({
                        value: e,
                        done: !1
                    });
                }
                (i = i.next) ? n(i.key, i.arg) : s = null;
            }
            var i, s;
            this._invoke = function(t, e) {
                return new Promise(function(r, a) {
                    var o = {
                        key: t,
                        arg: e,
                        resolve: r,
                        reject: a,
                        next: null
                    };
                    s ? s = s.next = o : (i = s = o, n(t, e));
                });
            }, "function" != typeof e.return && (this.return = void 0);
        }
        "function" == typeof Symbol && Symbol.asyncIterator && (e.prototype[Symbol.asyncIterator] = function() {
            return this;
        }), e.prototype.next = function(t) {
            return this._invoke("next", t);
        }, e.prototype.throw = function(t) {
            return this._invoke("throw", t);
        }, e.prototype.return = function(t) {
            return this._invoke("return", t);
        };
    }();
    var n = function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }, r = function() {
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
            "ngInject";
            var r = this;
            n(this, i), this.data = t.data, this.chartType = t.chartType, this.events = t.events() || {}, 
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
        "ngInject";
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