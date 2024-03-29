angular.module("perfect_scrollbar", []).directive("perfectScrollbar", [ "$parse", "$window", function(e, r) {
    var o = [ "handlers", "wheelSpeed", "wheelPropagation", "swipePropagation", "minScrollbarLength", "maxScrollbarLength", "useBothWheelAxes", "useKeyboard", "suppressScrollX", "suppressScrollY", "scrollXMarginOffset", "scrollYMarginOffset", "theme" ];
    return {
        restrict: "EA",
        transclude: !0,
        template: "<div><div ng-transclude></div></div>",
        replace: !0,
        link: function(l, n, t) {
            function c(e) {
                l.$evalAsync(function() {
                    "true" == t.scrollDown && "mouseenter" != e && setTimeout(function() {
                        $(n).scrollTop($(n).prop("scrollHeight"));
                    }, 100), n.perfectScrollbar("update");
                });
            }
            for (var s = angular.element(r), i = {}, a = 0, f = o.length; a < f; a++) {
                var u = o[a];
                void 0 !== t[u] && (i[u] = e(t[u])());
            }
            l.$evalAsync(function() {
                n.perfectScrollbar(i);
                var r = e(t.onScroll);
                n.scroll(function() {
                    var e = n.scrollTop(), o = n.prop("scrollHeight") - n.height(), t = n.scrollLeft(), c = n.prop("scrollWidth") - n.width();
                    l.$apply(function() {
                        r(l, {
                            scrollTop: e,
                            scrollHeight: o,
                            scrollLeft: t,
                            scrollWidth: c
                        });
                    });
                });
            }), l.$watch(function() {
                return n.prop("scrollHeight");
            }, function(e, r) {
                e && c("contentSizeChange");
            }), n.on("mouseenter", function() {
                c("mouseenter");
            }), t.refreshOnChange && l.$watchCollection(t.refreshOnChange, function() {
                c();
            }), t.refreshOnResize && s.on("resize", function() {
                c();
            }), n.on("$destroy", function() {
                s.off("resize", function() {
                    c();
                }), n.perfectScrollbar("destroy");
            });
        }
    };
} ]);