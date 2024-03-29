!function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "angular", "./Sortable" ], e) : "function" == typeof require && "object" == typeof exports && "object" == typeof module ? (require("angular"), 
    e(angular, require("./Sortable")), module.exports = "ng-sortable") : window.angular && window.Sortable && e(angular, Sortable);
}(function(e, n) {
    "use strict";
    var t = "Sortable:ng-sortable";
    e.module("ng-sortable", []).constant("ngSortableVersion", "0.4.0").constant("ngSortableConfig", {}).directive("ngSortable", [ "$parse", "ngSortableConfig", function(o, r) {
        function i(e) {
            return e.getAttribute("ng-repeat") || e.getAttribute("data-ng-repeat") || e.getAttribute("x-ng-repeat");
        }
        var a, l;
        return {
            restrict: "AC",
            scope: {
                ngSortable: "=?"
            },
            priority: 1001,
            compile: function(s, c) {
                var u = [].filter.call(s[0].childNodes, function(e) {
                    return e.nodeType === Node.ELEMENT_NODE && i(e);
                })[0];
                if (u) {
                    var d = i(u).match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                    if (d) {
                        var f = d[2];
                        return function(i, s) {
                            function c(e, n) {
                                var t = "on" + e.type.charAt(0).toUpperCase() + e.type.substr(1), o = b();
                                m[t] && m[t]({
                                    model: n || o[e.newIndex],
                                    models: o,
                                    oldIndex: e.oldIndex,
                                    newIndex: e.newIndex,
                                    originalEvent: e
                                });
                            }
                            function u(o) {
                                var r = b();
                                if (r) {
                                    var s = o.oldIndex, c = o.newIndex;
                                    if (S !== o.from) {
                                        var u = o.from[t]();
                                        a = u[s], o.clone ? (a = e.copy(a), u.splice(n.utils.index(o.clone, p.options.draggable), 0, u.splice(s, 1)[0]), 
                                        o.from.removeChild(o.clone)) : u.splice(s, 1), r.splice(c, 0, a), o.from.insertBefore(o.item, l);
                                    } else r.splice(c, 0, r.splice(s, 1)[0]), l.nodeType === Node.COMMENT_NODE && o.from.insertBefore(l, o.item.nextSibling);
                                    i.$apply();
                                }
                            }
                            var d, p, g = o(f), b = function() {
                                return g(i.$parent) || [];
                            }, S = s[0], m = e.extend(i.ngSortable || {}, r), y = [];
                            S[t] = b, p = n.create(S, Object.keys(m).reduce(function(e, n) {
                                return e[n] = e[n] || m[n], e;
                            }, {
                                onStart: function(e) {
                                    l = e.from === e.item.parentNode ? e.item.nextSibling : e.clone.nextSibling, c(e), 
                                    i.$apply();
                                },
                                onEnd: function(e) {
                                    c(e, a), i.$apply();
                                },
                                onAdd: function(e) {
                                    u(e), c(e, a), i.$apply();
                                },
                                onUpdate: function(e) {
                                    u(e), c(e);
                                },
                                onRemove: function(e) {
                                    c(e, a);
                                },
                                onSort: function(e) {
                                    c(e);
                                }
                            })), e.forEach([ "sort", "disabled", "draggable", "handle", "animation", "group", "ghostClass", "filter", "onStart", "onEnd", "onAdd", "onUpdate", "onRemove", "onSort", "onMove", "onClone", "setData" ], function(e) {
                                y.push(i.$watch("ngSortable." + e, function(n) {
                                    void 0 !== n && (m[e] = n, /^on[A-Z]/.test(e) || p.option(e, n));
                                }));
                            }), d = i.$on("$destroy", function() {
                                d(), e.forEach(y, function(e) {
                                    e();
                                }), p.destroy(), S[t] = null, l = p = y = S = null;
                            });
                        };
                    }
                }
            }
        };
    } ]);
});