!function(e) {
    "function" == typeof define && define.amd ? define([ "jquery" ], e) : e("object" == typeof exports ? require("jquery") : jQuery);
}(function(e) {
    var t, n = navigator.userAgent, a = /iphone/i.test(n), i = /chrome/i.test(n), r = /android/i.test(n);
    e.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, e.fn.extend({
        caret: function(e, t) {
            var n;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, 
            this.each(function() {
                this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && ((n = this.createTextRange()).collapse(!0), 
                n.moveEnd("character", t), n.moveStart("character", e), n.select());
            })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), 
            e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {
                begin: e,
                end: t
            });
        },
        unmask: function() {
            return this.trigger("unmask");
        },
        mask: function(n, o) {
            var l, u, f, s, h, g, m;
            if (!n && 0 < this.length) {
                var d = e(this[0]).data(e.mask.dataName);
                return d ? d() : void 0;
            }
            return o = e.extend({
                autoclear: e.mask.autoclear,
                placeholder: e.mask.placeholder,
                completed: null
            }, o), l = e.mask.definitions, u = [], f = g = n.length, s = null, e.each(n.split(""), function(e, t) {
                "?" == t ? (g--, f = e) : l[t] ? (u.push(new RegExp(l[t])), null === s && (s = u.length - 1), 
                e < f && (h = u.length - 1)) : u.push(null);
            }), this.trigger("unmask").each(function() {
                function c() {
                    if (o.completed) {
                        for (var e = s; e <= h; e++) if (u[e] && A[e] === d(e)) return;
                        o.completed.call(S);
                    }
                }
                function d(e) {
                    return o.placeholder.charAt(e < o.placeholder.length ? e : 0);
                }
                function p(e) {
                    for (;++e < g && !u[e]; ) ;
                    return e;
                }
                function b(e, t) {
                    var n, a;
                    if (!(e < 0)) {
                        for (n = e, a = p(t); n < g; n++) if (u[n]) {
                            if (!(a < g && u[n].test(A[a]))) break;
                            A[n] = A[a], A[a] = d(a), a = p(a);
                        }
                        j(), S.caret(Math.max(s, e));
                    }
                }
                function y() {
                    R(), S.val() != w && S.change();
                }
                function x(e, t) {
                    var n;
                    for (n = e; n < t && n < g; n++) u[n] && (A[n] = d(n));
                }
                function j() {
                    S.val(A.join(""));
                }
                function R(e) {
                    var t, n, a, i = S.val(), r = -1;
                    for (a = t = 0; t < g; t++) if (u[t]) {
                        for (A[t] = d(t); a++ < i.length; ) if (n = i.charAt(a - 1), u[t].test(n)) {
                            A[t] = n, r = t;
                            break;
                        }
                        if (a > i.length) {
                            x(t + 1, g);
                            break;
                        }
                    } else A[t] === i.charAt(a) && a++, t < f && (r = t);
                    return e ? j() : r + 1 < f ? o.autoclear || A.join("") === T ? (S.val() && S.val(""), 
                    x(0, g)) : j() : (j(), S.val(S.val().substring(0, r + 1))), f ? t : s;
                }
                var S = e(this), A = e.map(n.split(""), function(e, t) {
                    return "?" != e ? l[e] ? d(t) : e : void 0;
                }), T = A.join(""), w = S.val();
                S.data(e.mask.dataName, function() {
                    return e.map(A, function(e, t) {
                        return u[t] && e != d(t) ? e : null;
                    }).join("");
                }), S.one("unmask", function() {
                    S.off(".mask").removeData(e.mask.dataName);
                }).on("focus.mask", function() {
                    var e;
                    S.prop("readonly") || (clearTimeout(t), w = S.val(), e = R(), t = setTimeout(function() {
                        S.get(0) === document.activeElement && (j(), e == n.replace("?", "").length ? S.caret(0, e) : S.caret(e));
                    }, 10));
                }).on("blur.mask", y).on("keydown.mask", function(e) {
                    if (!S.prop("readonly")) {
                        var t, n, i, r = e.which || e.keyCode;
                        m = S.val(), 8 === r || 46 === r || a && 127 === r ? (n = (t = S.caret()).begin, 
                        (i = t.end) - n == 0 && (n = 46 !== r ? function(e) {
                            for (;0 <= --e && !u[e]; ) ;
                            return e;
                        }(n) : i = p(n - 1), i = 46 === r ? p(i) : i), x(n, i), b(n, i - 1), e.preventDefault()) : 13 === r ? y.call(this, e) : 27 === r && (S.val(w), 
                        S.caret(0, R()), e.preventDefault());
                    }
                }).on("keypress.mask", function(t) {
                    if (!S.prop("readonly")) {
                        var n, a, i, o = t.which || t.keyCode, l = S.caret();
                        t.ctrlKey || t.altKey || t.metaKey || o < 32 || !o || 13 === o || (l.end - l.begin != 0 && (x(l.begin, l.end), 
                        b(l.begin, l.end - 1)), (n = p(l.begin - 1)) < g && (a = String.fromCharCode(o), 
                        u[n].test(a)) && (function(e) {
                            var t, n, a, i;
                            for (n = d(t = e); t < g; t++) if (u[t]) {
                                if (a = p(t), i = A[t], A[t] = n, !(a < g && u[a].test(i))) break;
                                n = i;
                            }
                        }(n), A[n] = a, j(), i = p(n), r ? setTimeout(function() {
                            e.proxy(e.fn.caret, S, i)();
                        }, 0) : S.caret(i), l.begin <= h && c()), t.preventDefault());
                    }
                }).on("input.mask paste.mask", function() {
                    S.prop("readonly") || setTimeout(function() {
                        var e = R(!0);
                        S.caret(e), c();
                    }, 0);
                }), i && r && S.off("input.mask").on("input.mask", function() {
                    var e = S.val(), t = S.caret();
                    if (m && m.length && m.length > e.length) {
                        for (R(!0); 0 < t.begin && !u[t.begin - 1]; ) t.begin--;
                        if (0 === t.begin) for (;t.begin < s && !u[t.begin]; ) t.begin++;
                        S.caret(t.begin, t.begin);
                    } else {
                        for (R(!0); t.begin < g && !u[t.begin]; ) t.begin++;
                        S.caret(t.begin, t.begin);
                    }
                    c();
                }), R();
            });
        }
    });
});