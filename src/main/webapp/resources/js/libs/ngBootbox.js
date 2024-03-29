"function" == typeof define && define.amd && define([ "bootbox" ], function(o) {
    window.bootbox = o;
}), angular.module("ngBootbox", []).provider("$ngBootboxConfig", function() {
    var o = "";
    return {
        setDefaultLocale: function(t) {
            o = t, window.bootbox.setLocale(t);
        },
        addLocale: function(o, t) {
            window.bootbox.addLocale(o, t);
        },
        removeLocale: function(o) {
            window.bootbox.removeLocale(o);
        },
        $get: function() {
            return {
                getDefaultLocale: function() {
                    return o;
                }
            };
        }
    };
}).directive("ngBootboxAlert", [ "$ngBootbox", function(o) {
    return {
        restrict: "A",
        scope: !1,
        link: function(t, n, e) {
            var c = e.ngBootboxAlert || "Yo!";
            n.bind("click", function() {
                o.alert(c);
            });
        }
    };
} ]).directive("ngBootboxConfirm", [ "$ngBootbox", function(o) {
    return {
        restrict: "A",
        scope: {
            actionOK: "&ngBootboxConfirmAction",
            actionCancel: "&ngBootboxConfirmActionCancel"
        },
        link: function(t, n, e) {
            var c = e.ngBootboxConfirm || "Are you sure?";
            n.bind("click", function() {
                o.confirm(c).then(function() {
                    t.actionOK();
                }, function() {
                    t.actionCancel();
                });
            });
        }
    };
} ]).directive("ngBootboxPrompt", [ "$ngBootbox", function(o) {
    return {
        restrict: "A",
        scope: {
            actionOK: "&ngBootboxPromptAction",
            actionCancel: "&ngBootboxPromptActionCancel",
            value: "@ngBootboxPromptDefaultValue",
            selectAllOnFocus: "@ngBootboxPromptSelectAllOnFocus"
        },
        link: function(t, n, e) {
            var c = e.ngBootboxPrompt || "Are you sure?", i = e.ngBootboxPromptDefaultValue || "", a = t.$eval(e.ngBootboxPromptSelectAllOnFocus) || !1;
            n.bind("click", function() {
                o.prompt(c, i, a).then(function(o) {
                    t.actionOK({
                        result: o
                    });
                }, function() {
                    t.actionCancel();
                });
            });
        }
    };
} ]).directive("ngBootboxCustomDialog", [ "$ngBootbox", function(o) {
    return {
        restrict: "A",
        scope: {
            title: "@ngBootboxTitle",
            buttons: "=ngBootboxButtons",
            className: "@ngBootboxClassName",
            data: "=ngBootboxData",
            options: "=ngBootboxOptions"
        },
        link: function(t, n, e) {
            var c = {}, i = e.ngBootboxCustomDialogTemplate;
            t.options && (c = t.options), t.title && (c.title = t.title), t.buttons && (c.buttons = t.buttons), 
            t.className && (c.className = t.className), t.data && (c.data = t.data), i ? c.templateUrl = i : c.message = e.ngBootboxCustomDialog, 
            n.bind("click", function() {
                o.customDialog(c);
            });
        }
    };
} ]).factory("$ngBootbox", [ "$q", "$templateCache", "$compile", "$rootScope", "$http", "$window", function(o, t, n, e, c, i) {
    function a(n) {
        var e = o.defer(), i = t.get(n);
        return void 0 === i ? c.get(n).then(function(o) {
            var c = o.data;
            t.put(n, c), e.resolve(c);
        }) : e.resolve(i), e.promise;
    }
    return {
        alert: function(t) {
            function n() {
                e.resolve();
            }
            var e = o.defer();
            return "object" == typeof t ? i.bootbox.alert(angular.merge(t, {
                callback: n
            })) : i.bootbox.alert(t, n), e.promise;
        },
        confirm: function(t) {
            function n(o) {
                o ? e.resolve() : e.reject();
            }
            var e = o.defer();
            return "object" == typeof t ? i.bootbox.confirm(angular.merge(t, {
                callback: n
            })) : i.bootbox.confirm(t, n), e.promise;
        },
        prompt: function(t, n, e) {
            var c = o.defer();
            return i.bootbox.prompt({
                title: t,
                value: n || "",
                selectAllOnFocus: e || !1,
                callback: function(o) {
                    null !== o ? c.resolve(o) : c.reject();
                }
            }), c.promise;
        },
        customDialog: function(o) {
            o.templateUrl ? a(o.templateUrl).then(function(t) {
                o.scope = o.scope || e, o.message = n(t)(o.scope), i.bootbox.dialog(o);
            }, function() {
                i.bootbox.dialog(o);
            }) : i.bootbox.dialog(o);
        },
        setDefaults: function(o) {
            i.bootbox.setDefaults(o);
        },
        hideAll: function() {
            i.bootbox.hideAll();
        },
        setLocale: function(o) {
            i.bootbox.setLocale(o);
        },
        addLocale: function(o, t) {
            i.bootbox.addLocale(o, t);
        },
        removeLocale: function(o) {
            i.bootbox.removeLocale(o);
        }
    };
} ]);