angular.module("summernote", []).controller("SummernoteController", [ "$scope", "$attrs", "$timeout", function(e, n, a) {
    "use strict";
    var t, i = angular.copy(e.summernoteConfig) || {};
    if (angular.isDefined(n.height) && (i.height = +n.height), angular.isDefined(n.minHeight) && (i.minHeight = +n.minHeight), 
    angular.isDefined(n.maxHeight) && (i.maxHeight = +n.maxHeight), angular.isDefined(n.placeholder) && (i.placeholder = n.placeholder), 
    angular.isDefined(n.focus) && (i.focus = !0), angular.isDefined(n.airmode) && (i.airMode = !0), 
    angular.isDefined(n.lang)) {
        if (!angular.isDefined($.summernote.lang[n.lang])) throw new Error('"' + n.lang + '" lang file must be exist.');
        i.lang = n.lang;
    }
    i.callbacks = i.callbacks || {}, angular.isDefined(n.onInit) && (i.callbacks.onInit = function(n) {
        e.init({
            evt: n
        });
    }), angular.isDefined(n.onEnter) && (i.callbacks.onEnter = function(n) {
        e.enter({
            evt: n
        });
    }), angular.isDefined(n.onFocus) && (i.callbacks.onFocus = function(n) {
        e.focus({
            evt: n
        });
    }), angular.isDefined(n.onPaste) && (i.callbacks.onPaste = function(n) {
        e.paste({
            evt: n
        });
    }), angular.isDefined(n.onKeyup) && (i.callbacks.onKeyup = function(n) {
        e.keyup({
            evt: n
        });
    }), angular.isDefined(n.onKeydown) && (i.callbacks.onKeydown = function(n) {
        e.keydown({
            evt: n
        });
    }), angular.isDefined(n.onImageUpload) && (i.callbacks.onImageUpload = function(n) {
        e.imageUpload({
            files: n,
            editable: e.editable
        });
    }), angular.isDefined(n.onMediaDelete) && (i.callbacks.onMediaDelete = function(n) {
        var a = {
            attrs: {}
        };
        a.tagName = n[0].tagName, angular.forEach(n[0].attributes, function(e) {
            a.attrs[e.name] = e.value;
        }), e.mediaDelete({
            target: a
        });
    }), this.activate = function(o, l, r) {
        var u = function() {
            var e = l.summernote("code");
            l.summernote("isEmpty") && (e = ""), r && r.$viewValue !== e && a(function() {
                r.$setViewValue(e);
            }, 0);
        }, s = i.callbacks.onChange;
        i.callbacks.onChange = function(t) {
            a(function() {
                l.summernote("isEmpty") && (t = ""), u();
            }, 0), angular.isDefined(n.onChange) ? e.change({
                contents: t,
                editable: e.editable
            }) : angular.isFunction(s) && s.apply(this, arguments);
        }, angular.isDefined(n.onBlur) && (i.callbacks.onBlur = function(n) {
            !i.airMode && l.blur(), e.blur({
                evt: n
            });
        }), l.summernote(i);
        var c, d = l.next(".note-editor");
        d.find(".note-toolbar").click(function() {
            u(), d.hasClass("codeview") ? (d.on("keyup", u), r && (c = o.$watch(function() {
                return r.$modelValue;
            }, function(e) {
                d.find(".note-codable").val(e);
            }))) : (d.off("keyup", u), angular.isFunction(c) && c());
        }), r && (r.$render = function() {
            r.$viewValue ? l.summernote("code", r.$viewValue) : l.summernote("empty");
        }), angular.isDefined(n.editable) && (e.editable = d.find(".note-editable")), angular.isDefined(n.editor) && (e.editor = l), 
        (t = l).on("$destroy", function() {
            l.summernote("destroy"), e.summernoteDestroyed = !0;
        });
    }, e.$on("$destroy", function() {
        e.summernoteDestroyed || t.summernote("destroy");
    });
} ]).directive("summernote", [ function() {
    "use strict";
    return {
        restrict: "EA",
        transclude: "element",
        replace: !0,
        require: [ "summernote", "?ngModel" ],
        controller: "SummernoteController",
        scope: {
            summernoteConfig: "=config",
            editable: "=",
            editor: "=",
            init: "&onInit",
            enter: "&onEnter",
            focus: "&onFocus",
            blur: "&onBlur",
            paste: "&onPaste",
            keyup: "&onKeyup",
            keydown: "&onKeydown",
            change: "&onChange",
            imageUpload: "&onImageUpload",
            mediaDelete: "&onMediaDelete"
        },
        template: '<div class="summernote"></div>',
        link: function(e, n, a, t, i) {
            var o = t[0], l = t[1];
            if (l) var r = e.$watch(function() {
                return l.$viewValue;
            }, function(a) {
                r(), n.append(a), o.activate(e, n, l);
            }, !0); else i(e, function(e, a) {
                n.append(e.html());
            }), o.activate(e, n, l);
        }
    };
} ]);