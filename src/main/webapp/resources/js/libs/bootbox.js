!function(t, o) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], o) : "object" == typeof exports ? module.exports = o(require("jquery")) : t.bootbox = o(t.jQuery);
}(this, function t(o, e) {
    "use strict";
    function a(t) {
        var o = C[f.locale];
        return o ? o[t] : C.en[t];
    }
    function n(t, e, a) {
        t.stopPropagation(), t.preventDefault(), o.isFunction(a) && !1 === a.call(e, t) || e.modal("hide");
    }
    function l(t, e) {
        var a = 0;
        o.each(t, function(t, o) {
            e(t, o, a++);
        });
    }
    function s(t, e, a) {
        return o.extend(!0, {}, t, function(t, o) {
            var e = t.length, a = {};
            if (e < 1 || 2 < e) throw new Error("Invalid argument length");
            return 2 === e || "string" == typeof t[0] ? (a[o[0]] = t[0], a[o[1]] = t[1]) : a = t[0], 
            a;
        }(e, a));
    }
    function u(t, o, e, a) {
        return b(s({
            className: "bootbox-" + t,
            buttons: p.apply(null, o)
        }, a, e), o);
    }
    function p() {
        for (var t = {}, o = 0, e = arguments.length; o < e; o++) {
            var n = arguments[o], r = n.toLowerCase(), l = n.toUpperCase();
            t[r] = {
                label: a(l)
            };
        }
        return t;
    }
    function b(t, o) {
        var a = {};
        return l(o, function(t, o) {
            a[o] = !0;
        }), l(t.buttons, function(t) {
            if (a[t] === e) throw new Error("button key " + t + " is not allowed (options are " + o.join("\n") + ")");
        }), t;
    }
    var d = {
        dialog: "<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>",
        header: "<div class='modal-header'><h4 class='modal-title'></h4></div>",
        footer: "<div class='modal-footer'></div>",
        closeButton: "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
        form: "<form class='bootbox-form'></form>",
        inputs: {
            text: "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
            textarea: "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
            email: "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
            select: "<select class='bootbox-input bootbox-input-select form-control'></select>",
            checkbox: "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
            date: "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
            time: "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
            number: "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
            password: "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
        }
    }, f = {
        locale: "en",
        backdrop: "static",
        animate: !0,
        className: null,
        closeButton: !0,
        show: !0,
        container: "body"
    }, m = {
        alert: function() {
            var t;
            if ((t = u("alert", [ "ok" ], [ "message", "callback" ], arguments)).callback && !o.isFunction(t.callback)) throw new Error("alert requires callback property to be a function when provided");
            return t.buttons.ok.callback = t.onEscape = function() {
                return !o.isFunction(t.callback) || t.callback.call(this);
            }, m.dialog(t);
        },
        confirm: function() {
            var t;
            if ((t = u("confirm", [ "cancel", "confirm" ], [ "message", "callback" ], arguments)).buttons.cancel.callback = t.onEscape = function() {
                return t.callback.call(this, !1);
            }, t.buttons.confirm.callback = function() {
                return t.callback.call(this, !0);
            }, !o.isFunction(t.callback)) throw new Error("confirm requires a callback");
            return m.dialog(t);
        },
        prompt: function() {
            var t, a, n, r, i, c, u;
            if (r = o(d.form), a = {
                className: "bootbox-prompt",
                buttons: p("cancel", "confirm"),
                value: "",
                inputType: "text"
            }, c = (t = b(s(a, arguments, [ "title", "callback" ]), [ "cancel", "confirm" ])).show === e || t.show, 
            t.message = r, t.buttons.cancel.callback = t.onEscape = function() {
                return t.callback.call(this, null);
            }, t.buttons.confirm.callback = function() {
                var e;
                switch (t.inputType) {
                  case "text":
                  case "textarea":
                  case "email":
                  case "select":
                  case "date":
                  case "time":
                  case "number":
                  case "password":
                    e = i.val();
                    break;

                  case "checkbox":
                    var a = i.find("input:checked");
                    e = [], l(a, function(t, a) {
                        e.push(o(a).val());
                    });
                }
                return t.callback.call(this, e);
            }, t.show = !1, !t.title) throw new Error("prompt requires a title");
            if (!o.isFunction(t.callback)) throw new Error("prompt requires a callback");
            if (!d.inputs[t.inputType]) throw new Error("invalid prompt type");
            switch (i = o(d.inputs[t.inputType]), t.inputType) {
              case "text":
              case "textarea":
              case "email":
              case "date":
              case "time":
              case "number":
              case "password":
                i.val(t.value);
                break;

              case "select":
                var f = {};
                if (u = t.inputOptions || [], !o.isArray(u)) throw new Error("Please pass an array of input options");
                if (!u.length) throw new Error("prompt with select requires options");
                l(u, function(t, a) {
                    var n = i;
                    if (a.value === e || a.text === e) throw new Error("given options in wrong format");
                    a.group && (f[a.group] || (f[a.group] = o("<optgroup/>").attr("label", a.group)), 
                    n = f[a.group]), n.append("<option value='" + a.value + "'>" + a.text + "</option>");
                }), l(f, function(t, o) {
                    i.append(o);
                }), i.val(t.value);
                break;

              case "checkbox":
                var C = o.isArray(t.value) ? t.value : [ t.value ];
                if (!(u = t.inputOptions || []).length) throw new Error("prompt with checkbox requires options");
                if (!u[0].value || !u[0].text) throw new Error("given options in wrong format");
                i = o("<div/>"), l(u, function(e, a) {
                    var n = o(d.inputs[t.inputType]);
                    n.find("input").attr("value", a.value), n.find("label").append(a.text), l(C, function(t, o) {
                        o === a.value && n.find("input").prop("checked", !0);
                    }), i.append(n);
                });
            }
            return t.placeholder && i.attr("placeholder", t.placeholder), t.pattern && i.attr("pattern", t.pattern), 
            t.maxlength && i.attr("maxlength", t.maxlength), r.append(i), r.on("submit", function(t) {
                t.preventDefault(), t.stopPropagation(), n.find(".btn-primary").click();
            }), (n = m.dialog(t)).off("shown.bs.modal"), n.on("shown.bs.modal", function() {
                i.focus();
            }), !0 === c && n.modal("show"), n;
        }
    };
    m.dialog = function(t) {
        t = function(t) {
            var e, a;
            if ("object" != typeof t) throw new Error("Please supply an object of options");
            if (!t.message) throw new Error("Please specify a message");
            return (t = o.extend({}, f, t)).buttons || (t.buttons = {}), e = t.buttons, a = function(t) {
                var o, e = 0;
                for (o in t) e++;
                return e;
            }(e), l(e, function(t, n, r) {
                if (o.isFunction(n) && (n = e[t] = {
                    callback: n
                }), "object" !== o.type(n)) throw new Error("button with key " + t + " must be an object");
                n.label || (n.label = t), n.className || (n.className = a <= 2 && r === a - 1 ? "btn-primary" : "btn-default");
            }), t;
        }(t);
        var a = o(d.dialog), r = a.find(".modal-dialog"), c = a.find(".modal-body"), s = t.buttons, u = "", p = {
            onEscape: t.onEscape
        };
        if (o.fn.modal === e) throw new Error("$.fn.modal is not defined; please double check you have included the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ for more details.");
        if (l(s, function(t, o) {
            u += "<button data-bb-handler='" + t + "' type='button' class='btn " + o.className + "'>" + o.label + "</button>", 
            p[t] = o.callback;
        }), c.find(".bootbox-body").html(t.message), !0 === t.animate && a.addClass("fade"), 
        t.className && a.addClass(t.className), "large" === t.size ? r.addClass("modal-lg") : "small" === t.size && r.addClass("modal-sm"), 
        t.title && c.before(d.header), t.closeButton) {
            var b = o(d.closeButton);
            t.title ? a.find(".modal-header").prepend(b) : b.css("margin-top", "-10px").prependTo(c);
        }
        return t.title && a.find(".modal-title").html(t.title), u.length && (c.after(d.footer), 
        a.find(".modal-footer").html(u)), a.on("hidden.bs.modal", function(t) {
            t.target === this && a.remove();
        }), a.on("shown.bs.modal", function() {
            a.find(".btn-primary:first").focus();
        }), "static" !== t.backdrop && a.on("click.dismiss.bs.modal", function(t) {
            a.children(".modal-backdrop").length && (t.currentTarget = a.children(".modal-backdrop").get(0)), 
            t.target === t.currentTarget && a.trigger("escape.close.bb");
        }), a.on("escape.close.bb", function(t) {
            p.onEscape && n(t, a, p.onEscape);
        }), a.on("click", ".modal-footer button", function(t) {
            var e = o(this).data("bb-handler");
            n(t, a, p[e]);
        }), a.on("click", ".bootbox-close-button", function(t) {
            n(t, a, p.onEscape);
        }), a.on("keyup", function(t) {
            27 === t.which && a.trigger("escape.close.bb");
        }), o(t.container).append(a), a.modal({
            backdrop: !!t.backdrop && "static",
            keyboard: !1,
            show: !1
        }), t.show && a.modal("show"), a;
    }, m.setDefaults = function() {
        var t = {};
        2 === arguments.length ? t[arguments[0]] = arguments[1] : t = arguments[0], o.extend(f, t);
    }, m.hideAll = function() {
        return o(".bootbox").modal("hide"), m;
    };
    var C = {
        bg_BG: {
            OK: "Ок",
            CANCEL: "Отказ",
            CONFIRM: "Потвърждавам"
        },
        br: {
            OK: "OK",
            CANCEL: "Cancelar",
            CONFIRM: "Sim"
        },
        cs: {
            OK: "OK",
            CANCEL: "Zrušit",
            CONFIRM: "Potvrdit"
        },
        da: {
            OK: "OK",
            CANCEL: "Annuller",
            CONFIRM: "Accepter"
        },
        de: {
            OK: "OK",
            CANCEL: "Abbrechen",
            CONFIRM: "Akzeptieren"
        },
        el: {
            OK: "Εντάξει",
            CANCEL: "Ακύρωση",
            CONFIRM: "Επιβεβαίωση"
        },
        en: {
            OK: "OK",
            CANCEL: "Cancel",
            CONFIRM: "OK"
        },
        es: {
            OK: "OK",
            CANCEL: "Cancelar",
            CONFIRM: "Aceptar"
        },
        et: {
            OK: "OK",
            CANCEL: "Katkesta",
            CONFIRM: "OK"
        },
        fa: {
            OK: "قبول",
            CANCEL: "لغو",
            CONFIRM: "تایید"
        },
        fi: {
            OK: "OK",
            CANCEL: "Peruuta",
            CONFIRM: "OK"
        },
        fr: {
            OK: "OK",
            CANCEL: "Annuler",
            CONFIRM: "D'accord"
        },
        he: {
            OK: "אישור",
            CANCEL: "ביטול",
            CONFIRM: "אישור"
        },
        hu: {
            OK: "OK",
            CANCEL: "Mégsem",
            CONFIRM: "Megerősít"
        },
        hr: {
            OK: "OK",
            CANCEL: "Odustani",
            CONFIRM: "Potvrdi"
        },
        id: {
            OK: "OK",
            CANCEL: "Batal",
            CONFIRM: "OK"
        },
        it: {
            OK: "OK",
            CANCEL: "Annulla",
            CONFIRM: "Conferma"
        },
        ja: {
            OK: "OK",
            CANCEL: "キャンセル",
            CONFIRM: "確認"
        },
        lt: {
            OK: "Gerai",
            CANCEL: "Atšaukti",
            CONFIRM: "Patvirtinti"
        },
        lv: {
            OK: "Labi",
            CANCEL: "Atcelt",
            CONFIRM: "Apstiprināt"
        },
        nl: {
            OK: "OK",
            CANCEL: "Annuleren",
            CONFIRM: "Accepteren"
        },
        no: {
            OK: "OK",
            CANCEL: "Avbryt",
            CONFIRM: "OK"
        },
        pl: {
            OK: "OK",
            CANCEL: "Anuluj",
            CONFIRM: "Potwierdź"
        },
        pt: {
            OK: "OK",
            CANCEL: "Cancelar",
            CONFIRM: "Confirmar"
        },
        ru: {
            OK: "OK",
            CANCEL: "Отмена",
            CONFIRM: "Применить"
        },
        sq: {
            OK: "OK",
            CANCEL: "Anulo",
            CONFIRM: "Prano"
        },
        sv: {
            OK: "OK",
            CANCEL: "Avbryt",
            CONFIRM: "OK"
        },
        th: {
            OK: "ตกลง",
            CANCEL: "ยกเลิก",
            CONFIRM: "ยืนยัน"
        },
        tr: {
            OK: "Tamam",
            CANCEL: "İptal",
            CONFIRM: "Onayla"
        },
        zh_CN: {
            OK: "OK",
            CANCEL: "取消",
            CONFIRM: "确认"
        },
        zh_TW: {
            OK: "OK",
            CANCEL: "取消",
            CONFIRM: "確認"
        }
    };
    return m.addLocale = function(t, e) {
        return o.each([ "OK", "CANCEL", "CONFIRM" ], function(t, o) {
            if (!e[o]) throw new Error("Please supply a translation for '" + o + "'");
        }), C[t] = {
            OK: e.OK,
            CANCEL: e.CANCEL,
            CONFIRM: e.CONFIRM
        }, m;
    }, m.removeLocale = function(t) {
        return delete C[t], m;
    }, m.setLocale = function(t) {
        return m.setDefaults("locale", t);
    }, m.init = function(e) {
        return t(e || o);
    }, m;
});