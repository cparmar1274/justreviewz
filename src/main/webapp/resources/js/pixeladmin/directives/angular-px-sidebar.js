function pxSidebarDirective(e, n, t) {
    "use strict";
    var i = [ "width", "enableScrollbar", "desktopMode" ], a = [ "onExpand", "onExpanded", "onCollapse", "onCollapsed" ];
    return {
        restrict: "E",
        transclude: !0,
        replace: !0,
        template: '<div><div class="px-sidebar-content"></div></div>',
        compile: function(o, d) {
            var c = "ngSidebarContentLoaded_" + pxUtil.generateUniqueId();
            return o.find(".px-sidebar-content").append(d.templateUrl ? '<div ng-include="' + d.templateUrl + '" onload="' + c + '()"></div>' : "<div ng-transclude></div>"), 
            {
                pre: function(p) {
                    function l() {
                        a.forEach(function(e) {
                            d[e] && o.on(function(e) {
                                return e.replace(/^on([A-Z])/, function(e, n) {
                                    return n.toLowerCase();
                                });
                            }(e) + ".px.sidebar", n(d[e])(p));
                        }), o.pxSidebar(s), u(p, $.fn.pxSidebar.bind(o));
                        var t = e.$on("$viewContentLoaded", function() {
                            return o.pxSidebar("update");
                        });
                        o.on("$destroy", function() {
                            o.off().pxSidebar("destroy"), t();
                        });
                    }
                    var u = d.instance ? n(d.instance).assign : angular.noop, s = {};
                    if (i.forEach(function(e) {
                        void 0 !== d[e] && (s[e] = n(d[e])(p));
                    }), !d.templateUrl) return t(l);
                    p[c] = function() {
                        delete p[c], l();
                    };
                }
            };
        }
    };
}

angular.module("px-sidebar", []).directive("pxSidebar", [ "$rootScope", "$parse", "$timeout", pxSidebarDirective ]);