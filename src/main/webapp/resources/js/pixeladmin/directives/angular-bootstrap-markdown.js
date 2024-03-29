function bootstrapMarkdownDirective(n) {
    "use strict";
    var o = [ "autofocus", "savable", "hideable", "width", "height", "resize", "iconlibrary", "language", "footer", "fullscreen", "hiddenButtons", "disabledButtons", "dropZoneOptions", "additionalButtons" ], e = [ "onShow", "onPreview", "onChange", "onSave", "onFocus", "onBlur" ];
    return {
        restrict: "A",
        scope: {
            ngModel: "=",
            autofocus: "=",
            savable: "=",
            hideable: "=",
            width: "=",
            height: "=",
            resize: "=",
            iconlibrary: "=",
            language: "=",
            footer: "=",
            fullscreen: "=",
            hiddenButtons: "=",
            disabledButtons: "=",
            dropZoneOptions: "=",
            additionalButtons: "="
        },
        link: function(r, a, t) {
            function i() {
                o.forEach(function(n) {
                    u[n] = r[n];
                }), u.iconlibrary || (u.iconlibrary = "fa");
            }
            function d() {
                i(), a.val(r.ngModel).markdown(u);
                var n = a.data("markdown");
                n.change(n), n.$options.onShow(n);
            }
            function l() {
                var n = a.data("markdown").$editor;
                a.data("markdown").setFullscreen(!1), n.off(), n.find(".md-header").remove(), n.find(".md-footer").remove(), 
                n.find(".md-preview").remove(), n.find(".md-fullscreen-controls").remove(), a.off().removeClass("md-input").removeData("markdown").unwrap(".md-editor"), 
                a[0].removeAttribute("style");
            }
            var s = t.instance ? n(t.instance).assign : angular.noop, u = {};
            r.ngModel || (r.ngModel = "");
            var c = r.ngModel;
            e.forEach(function(o) {
                t[o] && (u[o] = n(t[o])(r.$parent));
            });
            var f = u.onChange || function() {};
            u.onChange = function() {
                var n = a.val();
                c !== n && (c = n, r.$applyAsync(function() {
                    return r.ngModel = n;
                }));
                for (var o = arguments.length, e = Array(o), t = 0; t < o; t++) e[t] = arguments[t];
                f.apply(this, e);
            }, d(), r.$watch("ngModel", function(n) {
                return c = n;
            }), o.forEach(function(n) {
                r.$watch(n, function(n) {
                    void 0 !== n && (i(), l(), d());
                });
            }), s(r.$parent, $.fn.markdown.bind(a)), a.on("$destroy", l);
        }
    };
}

angular.module("bootstrap-markdown", []).directive("markdownEditor", [ "$parse", bootstrapMarkdownDirective ]);