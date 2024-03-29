angular.module("angular-flot", []).directive("flot", [ "$timeout", function(t) {
    return {
        restrict: "EA",
        template: "<div></div>",
        scope: {
            dataset: "=",
            options: "=",
            callback: "=",
            onPlotClick: "&",
            onPlotHover: "&",
            onPlotSelected: "&",
            onPlotUnselected: "&"
        },
        link: function(e, o, n) {
            var i = null, l = n.width || "100%", c = n.height || "100%";
            if (((e.options || {}).legend || {}).container instanceof jQuery) throw new Error('Please use a jQuery expression string with the "legend.container" option.');
            e.dataset || (e.dataset = []), e.options || (e.options = {
                legend: {
                    show: !1
                }
            });
            var s = $(o.children()[0]);
            s.css({
                width: l,
                height: c
            });
            var r = function() {
                var t = $.plot(s, e.dataset, e.options);
                return e.callback && e.callback(t), t;
            };
            s.on("plotclick", function(o, n, i) {
                t(function() {
                    e.onPlotClick({
                        event: o,
                        pos: n,
                        item: i
                    });
                });
            }), s.on("plotselected", function(o, n) {
                t(function() {
                    e.onPlotSelected({
                        event: o,
                        ranges: n
                    });
                });
            }), s.on("plotunselected", function(o) {
                t(function() {
                    e.onPlotUnselected({
                        event: o
                    });
                });
            }), s.on("plothover", function(o, n, i) {
                t(function() {
                    e.onPlotHover({
                        event: o,
                        pos: n,
                        item: i
                    });
                });
            });
            var a = e.$watch("options", function() {
                i = r();
            }, !0), u = e.$watch("dataset", function(t) {
                if (i) return i.setData(t), i.setupGrid(), i.draw();
                i = r();
            }, !0);
            n.$observe("width", function(t) {
                t && (l = t, s.css("width", t));
            }), n.$observe("height", function(t) {
                t && (c = t, s.css("height", t));
            }), o.on("$destroy", function() {
                s.off("plotclick"), s.off("plothover"), s.off("plotselected"), s.off("unplotselected"), 
                i.destroy(), u(), a();
            });
        }
    };
} ]);