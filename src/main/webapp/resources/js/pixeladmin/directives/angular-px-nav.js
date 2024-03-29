function pxNavDirective(n, e) {
    "use strict";
    var r = [ "accordion", "transitionDuration", "dropdownCloseDelay", "enableTooltips", "animate", "storeState", "storagePrefix", "modes" ], t = [ "onExpand", "onExpanded", "onCollapse", "onCollapsed", "onDestroy", "onDropdownOpen", "onDropdownOpened", "onDropdownClose", "onDropdownClosed", "onDropdownFrozen", "onDropdownUnfrozen" ];
    return {
        restrict: "E",
        transclude: !0,
        replace: !0,
        template: '<nav class="px-nav"></nav>',
        compile: function(a, i) {
            var p = "ngSidebarContentLoaded_" + pxUtil.generateUniqueId();
            return a.append(i.templateUrl ? '<div ng-include="' + i.templateUrl + '" onload="' + p + '()"></div>' : "<div ng-transclude></div>"), 
            {
                pre: function(d) {
                    function l() {
                        a.pxNav(u), t.forEach(function(e) {
                            i[e] && a.on(function(n) {
                                return n.replace(/^on([A-Z])/, function(n, e) {
                                    return e.toLowerCase();
                                }).replace(/[A-Z]/g, function(n) {
                                    return "-" + n.toLowerCase();
                                });
                            }(e) + ".px.nav", n(i[e])(d));
                        }), c(d, $.fn.pxNav.bind(a)), a.on("$destroy", function() {
                            return a.off().pxNav("destroy");
                        });
                    }
                    var c = i.instance ? n(i.instance).assign : angular.noop, u = {};
                    if (r.forEach(function(e) {
                        void 0 !== i[e] && (u[e] = n(i[e])(d));
                    }), !i.templateUrl) return e(l);
                    d[p] = function() {
                        delete d[p], l();
                    };
                }
            };
        }
    };
}

angular.module("px-nav", []).directive("pxNav", [ "$parse", "$timeout", pxNavDirective ]);