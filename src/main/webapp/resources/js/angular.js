!function(t) {
    "use strict";
    function e(t) {
        if (!b(t)) return jr;
        w(t.objectMaxDepth) && (jr.objectMaxDepth = n(t.objectMaxDepth) ? t.objectMaxDepth : NaN);
    }
    function n(t) {
        return E(t) && 0 < t;
    }
    function r(t, e) {
        return e = e || Error, function() {
            var n, r, i = arguments[0], o = arguments[1], a = "[" + (t ? t + ":" : "") + i + "] ", s = G(arguments, 2).map(function(t) {
                return xt(t, jr.objectMaxDepth);
            });
            for (a += o.replace(/\{\d+\}/g, function(t) {
                var e = +t.slice(1, -1);
                return e < s.length ? s[e] : t;
            }), a += "\nhttp://errors.angularjs.org/1.6.6/" + (t ? t + "/" : "") + i, r = 0, 
            n = "?"; r < s.length; r++, n = "&") a += n + "p" + r + "=" + encodeURIComponent(s[r]);
            return new e(a);
        };
    }
    function i(t) {
        if (null == t || R(t)) return !1;
        if (Xr(t) || x(t) || Ur && t instanceof Ur) return !0;
        var e = "length" in Object(t) && t.length;
        return E(e) && (0 <= e && (e - 1 in t || t instanceof Array) || "function" == typeof t.item);
    }
    function o(t, e, n) {
        var r, a;
        if (t) if (k(t)) for (r in t) "prototype" !== r && "length" !== r && "name" !== r && t.hasOwnProperty(r) && e.call(n, t[r], r, t); else if (Xr(t) || i(t)) {
            var s = "object" != typeof t;
            for (r = 0, a = t.length; r < a; r++) (s || r in t) && e.call(n, t[r], r, t);
        } else if (t.forEach && t.forEach !== o) t.forEach(e, n, t); else if (S(t)) for (r in t) e.call(n, t[r], r, t); else if ("function" == typeof t.hasOwnProperty) for (r in t) t.hasOwnProperty(r) && e.call(n, t[r], r, t); else for (r in t) Nr.call(t, r) && e.call(n, t[r], r, t);
        return t;
    }
    function a(t, e, n) {
        for (var r = Object.keys(t).sort(), i = 0; i < r.length; i++) e.call(n, t[r[i]], r[i]);
        return r;
    }
    function s(t) {
        return function(e, n) {
            t(n, e);
        };
    }
    function u() {
        return ++Zr;
    }
    function c(t, e) {
        e ? t.$$hashKey = e : delete t.$$hashKey;
    }
    function l(t, e, n) {
        for (var r = t.$$hashKey, i = 0, o = e.length; i < o; ++i) {
            var a = e[i];
            if (b(a) || k(a)) for (var s = Object.keys(a), u = 0, f = s.length; u < f; u++) {
                var h = s[u], p = a[h];
                n && b(p) ? C(p) ? t[h] = new Date(p.valueOf()) : O(p) ? t[h] = new RegExp(p) : p.nodeName ? t[h] = p.cloneNode(!0) : D(p) ? t[h] = p.clone() : (b(t[h]) || (t[h] = Xr(p) ? [] : {}), 
                l(t[h], [ p ], !0)) : t[h] = p;
            }
        }
        return c(t, r), t;
    }
    function f(t) {
        return l(t, Br.call(arguments, 1), !1);
    }
    function h(t) {
        return l(t, Br.call(arguments, 1), !0);
    }
    function p(t) {
        return parseInt(t, 10);
    }
    function d(t, e) {
        return f(Object.create(t), e);
    }
    function v() {}
    function $(t) {
        return t;
    }
    function m(t) {
        return function() {
            return t;
        };
    }
    function g(t) {
        return k(t.toString) && t.toString !== Gr;
    }
    function y(t) {
        return void 0 === t;
    }
    function w(t) {
        return void 0 !== t;
    }
    function b(t) {
        return null !== t && "object" == typeof t;
    }
    function S(t) {
        return null !== t && "object" == typeof t && !Jr(t);
    }
    function x(t) {
        return "string" == typeof t;
    }
    function E(t) {
        return "number" == typeof t;
    }
    function C(t) {
        return "[object Date]" === Gr.call(t);
    }
    function _(t) {
        switch (Gr.call(t)) {
          case "[object Error]":
          case "[object Exception]":
          case "[object DOMException]":
            return !0;

          default:
            return t instanceof Error;
        }
    }
    function k(t) {
        return "function" == typeof t;
    }
    function O(t) {
        return "[object RegExp]" === Gr.call(t);
    }
    function R(t) {
        return t && t.window === t;
    }
    function T(t) {
        return t && t.$evalAsync && t.$watch;
    }
    function j(t) {
        return "boolean" == typeof t;
    }
    function I(t) {
        return t && k(t.then);
    }
    function D(t) {
        return !(!t || !(t.nodeName || t.prop && t.attr && t.find));
    }
    function q(t) {
        return Dr(t.nodeName || t[0] && t[0].nodeName);
    }
    function U(t, e) {
        return -1 !== Array.prototype.indexOf.call(t, e);
    }
    function H(t, e) {
        var n = t.indexOf(e);
        return 0 <= n && t.splice(n, 1), n;
    }
    function F(t, e, r) {
        function i(t, e, n) {
            if (--n < 0) return "...";
            var r, i = e.$$hashKey;
            if (Xr(t)) for (var o = 0, s = t.length; o < s; o++) e.push(a(t[o], n)); else if (S(t)) for (r in t) e[r] = a(t[r], n); else if (t && "function" == typeof t.hasOwnProperty) for (r in t) t.hasOwnProperty(r) && (e[r] = a(t[r], n)); else for (r in t) Nr.call(t, r) && (e[r] = a(t[r], n));
            return c(e, i), e;
        }
        function a(t, e) {
            if (!b(t)) return t;
            var n = u.indexOf(t);
            if (-1 !== n) return l[n];
            if (R(t) || T(t)) throw Kr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
            var r = !1, o = function(t) {
                switch (Gr.call(t)) {
                  case "[object Int8Array]":
                  case "[object Int16Array]":
                  case "[object Int32Array]":
                  case "[object Float32Array]":
                  case "[object Float64Array]":
                  case "[object Uint8Array]":
                  case "[object Uint8ClampedArray]":
                  case "[object Uint16Array]":
                  case "[object Uint32Array]":
                    return new t.constructor(a(t.buffer), t.byteOffset, t.length);

                  case "[object ArrayBuffer]":
                    if (t.slice) return t.slice(0);
                    var e = new ArrayBuffer(t.byteLength);
                    return new Uint8Array(e).set(new Uint8Array(t)), e;

                  case "[object Boolean]":
                  case "[object Number]":
                  case "[object String]":
                  case "[object Date]":
                    return new t.constructor(t.valueOf());

                  case "[object RegExp]":
                    var n = new RegExp(t.source, t.toString().match(/[^/]*$/)[0]);
                    return n.lastIndex = t.lastIndex, n;

                  case "[object Blob]":
                    return new t.constructor([ t ], {
                        type: t.type
                    });
                }
                if (k(t.cloneNode)) return t.cloneNode(!0);
            }(t);
            return void 0 === o && (o = Xr(t) ? [] : Object.create(Jr(t)), r = !0), u.push(t), 
            l.push(o), r ? i(t, o, e) : o;
        }
        var u = [], l = [];
        if (r = n(r) ? r : NaN, e) {
            if (function(t) {
                return t && E(t.length) && ti.test(Gr.call(t));
            }(e) || function(t) {
                return "[object ArrayBuffer]" === Gr.call(t);
            }(e)) throw Kr("cpta", "Can't copy! TypedArray destination cannot be mutated.");
            if (t === e) throw Kr("cpi", "Can't copy! Source and destination are identical.");
            return Xr(e) ? e.length = 0 : o(e, function(t, n) {
                "$$hashKey" !== n && delete e[n];
            }), u.push(t), l.push(e), i(t, e, r);
        }
        return a(t, r);
    }
    function B(t, e) {
        return t === e || t != t && e != e;
    }
    function z(t, e) {
        if (t === e) return !0;
        if (null === t || null === e) return !1;
        if (t != t && e != e) return !0;
        var n, r, i, o = typeof t;
        if (o === typeof e && "object" === o) {
            if (!Xr(t)) {
                if (C(t)) return !!C(e) && B(t.getTime(), e.getTime());
                if (O(t)) return !!O(e) && t.toString() === e.toString();
                if (T(t) || T(e) || R(t) || R(e) || Xr(e) || C(e) || O(e)) return !1;
                for (r in i = gt(), t) if ("$" !== r.charAt(0) && !k(t[r])) {
                    if (!z(t[r], e[r])) return !1;
                    i[r] = !0;
                }
                for (r in e) if (!(r in i) && "$" !== r.charAt(0) && w(e[r]) && !k(e[r])) return !1;
                return !0;
            }
            if (!Xr(e)) return !1;
            if ((n = t.length) === e.length) {
                for (r = 0; r < n; r++) if (!z(t[r], e[r])) return !1;
                return !0;
            }
        }
        return !1;
    }
    function W(t, e, n) {
        return t.concat(Br.call(e, n));
    }
    function G(t, e) {
        return Br.call(t, e || 0);
    }
    function J(t, e) {
        var n = 2 < arguments.length ? G(arguments, 2) : [];
        return !k(e) || e instanceof RegExp ? e : n.length ? function() {
            return arguments.length ? e.apply(t, W(n, arguments, 0)) : e.apply(t, n);
        } : function() {
            return arguments.length ? e.apply(t, arguments) : e.call(t);
        };
    }
    function K(e, n) {
        var r = n;
        return "string" == typeof e && "$" === e.charAt(0) && "$" === e.charAt(1) ? r = void 0 : R(n) ? r = "$WINDOW" : n && t.document === n ? r = "$DOCUMENT" : T(n) && (r = "$SCOPE"), 
        r;
    }
    function Y(t, e) {
        if (!y(t)) return E(e) || (e = e ? 2 : null), JSON.stringify(t, K, e);
    }
    function Z(t) {
        return x(t) ? JSON.parse(t) : t;
    }
    function Q(t, e) {
        t = t.replace(oi, "");
        var n = Date.parse("Jan 01, 1970 00:00:00 " + t) / 6e4;
        return Qr(n) ? e : n;
    }
    function tt(t, e, n) {
        n = n ? -1 : 1;
        var r = t.getTimezoneOffset();
        return function(t, e) {
            return (t = new Date(t.getTime())).setMinutes(t.getMinutes() + e), t;
        }(t, n * (Q(e, r) - r));
    }
    function et(t) {
        t = Ur(t).clone().empty();
        var e = Ur("<div>").append(t).html();
        try {
            return t[0].nodeType === fi ? Dr(e) : e.match(/^(<[^>]+>)/)[1].replace(/^<([\w-]+)/, function(t, e) {
                return "<" + Dr(e);
            });
        } catch (t) {
            return Dr(e);
        }
    }
    function nt(t) {
        try {
            return decodeURIComponent(t);
        } catch (t) {}
    }
    function rt(t) {
        var e = {};
        return o((t || "").split("&"), function(t) {
            var n, r, i;
            t && (r = t = t.replace(/\+/g, "%20"), -1 !== (n = t.indexOf("=")) && (r = t.substring(0, n), 
            i = t.substring(n + 1)), w(r = nt(r)) && (i = !w(i) || nt(i), Nr.call(e, r) ? Xr(e[r]) ? e[r].push(i) : e[r] = [ e[r], i ] : e[r] = i));
        }), e;
    }
    function it(t) {
        var e = [];
        return o(t, function(t, n) {
            Xr(t) ? o(t, function(t) {
                e.push(at(n, !0) + (!0 === t ? "" : "=" + at(t, !0)));
            }) : e.push(at(n, !0) + (!0 === t ? "" : "=" + at(t, !0)));
        }), e.length ? e.join("&") : "";
    }
    function ot(t) {
        return at(t, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
    }
    function at(t, e) {
        return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, e ? "%20" : "+");
    }
    function ut(e, n) {
        var r, i, a = {};
        if (o(ai, function(t) {
            var n = t + "app";
            !r && e.hasAttribute && e.hasAttribute(n) && (i = (r = e).getAttribute(n));
        }), o(ai, function(t) {
            var n, o = t + "app";
            !r && (n = e.querySelector("[" + o.replace(":", "\\:") + "]")) && (i = (r = n).getAttribute(o));
        }), r) {
            if (!si) return void t.console.error("Angular: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match.");
            a.strictDi = null !== function(t, e) {
                var n, r, i = ai.length;
                for (r = 0; r < i; ++r) if (n = ai[r] + e, x(n = t.getAttribute(n))) return n;
                return null;
            }(r, "strict-di"), n(r, i ? [ i ] : [], a);
        }
    }
    function ct(e, n, r) {
        b(r) || (r = {}), r = f({
            strictDi: !1
        }, r);
        var i = function() {
            if ((e = Ur(e)).injector()) {
                var i = e[0] === t.document ? "document" : et(e);
                throw Kr("btstrpd", "App already bootstrapped with this element '{0}'", i.replace(/</, "&lt;").replace(/>/, "&gt;"));
            }
            (n = n || []).unshift([ "$provide", function(t) {
                t.value("$rootElement", e);
            } ]), r.debugInfoEnabled && n.push([ "$compileProvider", function(t) {
                t.debugInfoEnabled(!0);
            } ]), n.unshift("ng");
            var o = se(n, r.strictDi);
            return o.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", function(t, e, n, r) {
                t.$apply(function() {
                    e.data("$injector", r), n(e)(t);
                });
            } ]), o;
        }, a = /^NG_ENABLE_DEBUG_INFO!/, s = /^NG_DEFER_BOOTSTRAP!/;
        if (t && a.test(t.name) && (r.debugInfoEnabled = !0, t.name = t.name.replace(a, "")), 
        t && !s.test(t.name)) return i();
        t.name = t.name.replace(s, ""), Yr.resumeBootstrap = function(t) {
            return o(t, function(t) {
                n.push(t);
            }), i();
        }, k(Yr.resumeDeferredBootstrap) && Yr.resumeDeferredBootstrap();
    }
    function lt() {
        t.name = "NG_ENABLE_DEBUG_INFO!" + t.name, t.location.reload();
    }
    function ft(t) {
        var e = Yr.element(t).injector();
        if (!e) throw Kr("test", "no injector found for element argument to getTestability");
        return e.get("$$testability");
    }
    function ht(t, e) {
        return e = e || "_", t.replace(ui, function(t, n) {
            return (n ? e : "") + t.toLowerCase();
        });
    }
    function pt(t, e, n) {
        if (!t) throw Kr("areq", "Argument '{0}' is {1}", e || "?", n || "required");
        return t;
    }
    function dt(t, e, n) {
        return n && Xr(t) && (t = t[t.length - 1]), pt(k(t), e, "not a function, got " + (t && "object" == typeof t ? t.constructor.name || "Object" : typeof t)), 
        t;
    }
    function vt(t, e) {
        if ("hasOwnProperty" === t) throw Kr("badname", "hasOwnProperty is not a valid {0} name", e);
    }
    function $t(t, e, n) {
        if (!e) return t;
        for (var r, i = e.split("."), o = t, a = i.length, s = 0; s < a; s++) r = i[s], 
        t && (t = (o = t)[r]);
        return !n && k(t) ? J(o, t) : t;
    }
    function mt(t) {
        for (var e, n = t[0], r = t[t.length - 1], i = 1; n !== r && (n = n.nextSibling); i++) (e || t[i] !== n) && (e || (e = Ur(Br.call(t, 0, i))), 
        e.push(n));
        return e || t;
    }
    function gt() {
        return Object.create(null);
    }
    function yt(t) {
        if (null == t) return "";
        switch (typeof t) {
          case "string":
            break;

          case "number":
            t = "" + t;
            break;

          default:
            t = !g(t) || Xr(t) || C(t) ? Y(t) : t.toString();
        }
        return t;
    }
    function bt(t, e) {
        if (Xr(t)) {
            e = e || [];
            for (var n = 0, r = t.length; n < r; n++) e[n] = t[n];
        } else if (b(t)) for (var i in e = e || {}, t) "$" === i.charAt(0) && "$" === i.charAt(1) || (e[i] = t[i]);
        return e || t;
    }
    function xt(t, e) {
        return "function" == typeof t ? t.toString().replace(/ \{[\s\S]*$/, "") : y(t) ? "undefined" : "string" != typeof t ? function(t, e) {
            var r = [];
            return n(e) && (t = Yr.copy(t, null, e)), JSON.stringify(t, function(t, e) {
                if (b(e = K(t, e))) {
                    if (0 <= r.indexOf(e)) return "...";
                    r.push(e);
                }
                return e;
            });
        }(t, e) : t;
    }
    function _t(t, e) {
        return e.toUpperCase();
    }
    function kt(t) {
        return t.replace(gi, _t);
    }
    function Ot(t) {
        return !xi.test(t);
    }
    function Rt(t) {
        var e = t.nodeType;
        return e === li || !e || e === pi;
    }
    function Tt(t, e) {
        var n, r, i, a, s = e.createDocumentFragment(), u = [];
        if (Ot(t)) u.push(e.createTextNode(t)); else {
            for (n = s.appendChild(e.createElement("div")), r = (Ei.exec(t) || [ "", "" ])[1].toLowerCase(), 
            i = _i[r] || _i._default, n.innerHTML = i[1] + t.replace(Ci, "<$1></$2>") + i[2], 
            a = i[0]; a--; ) n = n.lastChild;
            u = W(u, n.childNodes), (n = s.firstChild).textContent = "";
        }
        return s.textContent = "", s.innerHTML = "", o(u, function(t) {
            s.appendChild(t);
        }), s;
    }
    function At(e, n) {
        var r;
        return n = n || t.document, (r = Si.exec(e)) ? [ n.createElement(r[1]) ] : (r = Tt(e, n)) ? r.childNodes : [];
    }
    function Vt(t) {
        if (t instanceof Vt) return t;
        var e;
        if (x(t) && (t = ei(t), e = !0), !(this instanceof Vt)) {
            if (e && "<" !== t.charAt(0)) throw bi("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new Vt(t);
        }
        e ? Ft(this, At(t)) : k(t) ? Kt(t) : Ft(this, t);
    }
    function jt(t) {
        return t.cloneNode(!0);
    }
    function It(t, e) {
        !e && Rt(t) && Ur.cleanData([ t ]), t.querySelectorAll && Ur.cleanData(t.querySelectorAll("*"));
    }
    function Mt(t, e, n, r) {
        if (w(r)) throw bi("offargs", "jqLite#off() does not support the `selector` argument");
        var i = Dt(t), a = i && i.events, s = i && i.handle;
        if (s) if (e) {
            var u = function(e) {
                var r = a[e];
                w(n) && H(r || [], n), w(n) && r && 0 < r.length || (t.removeEventListener(e, s), 
                delete a[e]);
            };
            o(e.split(" "), function(t) {
                u(t), wi[t] && u(wi[t]);
            });
        } else for (e in a) "$destroy" !== e && t.removeEventListener(e, s), delete a[e];
    }
    function Nt(t, e) {
        var n = t.ng339, r = n && $i[n];
        if (r) {
            if (e) return void delete r.data[e];
            r.handle && (r.events.$destroy && r.handle({}, "$destroy"), Mt(t)), delete $i[n], 
            t.ng339 = void 0;
        }
    }
    function Dt(t, e) {
        var n = t.ng339, r = n && $i[n];
        return e && !r && (t.ng339 = n = ++mi, r = $i[n] = {
            events: {},
            data: {},
            handle: void 0
        }), r;
    }
    function Lt(t, e, n) {
        if (Rt(t)) {
            var r, i = w(n), o = !i && e && !b(e), a = !e, s = Dt(t, !o), u = s && s.data;
            if (i) u[kt(e)] = n; else {
                if (a) return u;
                if (o) return u && u[kt(e)];
                for (r in e) u[kt(r)] = e[r];
            }
        }
    }
    function qt(t, e) {
        return !!t.getAttribute && -1 < (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + e + " ");
    }
    function Ut(t, e) {
        e && t.setAttribute && o(e.split(" "), function(e) {
            t.setAttribute("class", ei((" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + ei(e) + " ", " ")));
        });
    }
    function Ht(t, e) {
        if (e && t.setAttribute) {
            var n = (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            o(e.split(" "), function(t) {
                t = ei(t), -1 === n.indexOf(" " + t + " ") && (n += t + " ");
            }), t.setAttribute("class", ei(n));
        }
    }
    function Ft(t, e) {
        if (e) if (e.nodeType) t[t.length++] = e; else {
            var n = e.length;
            if ("number" == typeof n && e.window !== e) {
                if (n) for (var r = 0; r < n; r++) t[t.length++] = e[r];
            } else t[t.length++] = e;
        }
    }
    function Bt(t, e) {
        return zt(t, "$" + (e || "ngController") + "Controller");
    }
    function zt(t, e, n) {
        t.nodeType === pi && (t = t.documentElement);
        for (var r = Xr(e) ? e : [ e ]; t; ) {
            for (var i = 0, o = r.length; i < o; i++) if (w(n = Ur.data(t, r[i]))) return n;
            t = t.parentNode || t.nodeType === di && t.host;
        }
    }
    function Wt(t) {
        for (It(t, !0); t.firstChild; ) t.removeChild(t.firstChild);
    }
    function Gt(t, e) {
        e || It(t);
        var n = t.parentNode;
        n && n.removeChild(t);
    }
    function Jt(e, n) {
        "complete" === (n = n || t).document.readyState ? n.setTimeout(e) : Ur(n).on("load", e);
    }
    function Kt(e) {
        function n() {
            t.document.removeEventListener("DOMContentLoaded", n), t.removeEventListener("load", n), 
            e();
        }
        "complete" === t.document.readyState ? t.setTimeout(e) : (t.document.addEventListener("DOMContentLoaded", n), 
        t.addEventListener("load", n));
    }
    function Yt(t, e) {
        var n = Ri[e.toLowerCase()];
        return n && Ti[q(t)] && n;
    }
    function Xt(t, e, n) {
        n.call(t, e);
    }
    function te(t, e, n) {
        var r = e.relatedTarget;
        r && (r === t || ki.call(t, r)) || n.call(t, e);
    }
    function ee() {
        this.$get = function() {
            return f(Vt, {
                hasClass: function(t, e) {
                    return t.attr && (t = t[0]), qt(t, e);
                },
                addClass: function(t, e) {
                    return t.attr && (t = t[0]), Ht(t, e);
                },
                removeClass: function(t, e) {
                    return t.attr && (t = t[0]), Ut(t, e);
                }
            });
        };
    }
    function ne(t, e) {
        var n = t && t.$$hashKey;
        if (n) return "function" == typeof n && (n = t.$$hashKey()), n;
        var r = typeof t;
        return "function" === r || "object" === r && null !== t ? t.$$hashKey = r + ":" + (e || u)() : r + ":" + t;
    }
    function re() {
        this._keys = [], this._values = [], this._lastKey = NaN, this._lastIndex = -1;
    }
    function ie(t) {
        return Function.prototype.toString.call(t);
    }
    function oe(t) {
        var e = ie(t).replace(Li, "");
        return e.match(Ii) || e.match(Mi);
    }
    function se(t, e) {
        function n(t) {
            return function(e, n) {
                if (!b(e)) return t(e, n);
                o(e, s(t));
            };
        }
        function r(t, e) {
            if (vt(t, "service"), (k(e) || Xr(e)) && (e = v.instantiate(e)), !e.$get) throw qi("pget", "Provider '{0}' must define $get factory method.", t);
            return d[t + f] = e;
        }
        function a(t, e, n) {
            return r(t, {
                $get: !1 !== n ? function(t, e) {
                    return function() {
                        var n = w.invoke(e, this);
                        if (y(n)) throw qi("undef", "Provider '{0}' must return a value from $get factory method.", t);
                        return n;
                    };
                }(t, e) : e
            });
        }
        function c(t, n) {
            function r(e, r) {
                if (t.hasOwnProperty(e)) {
                    if (t[e] === l) throw qi("cdep", "Circular dependency found: {0}", e + " <- " + h.join(" <- "));
                    return t[e];
                }
                try {
                    return h.unshift(e), t[e] = l, t[e] = n(e, r), t[e];
                } catch (n) {
                    throw t[e] === l && delete t[e], n;
                } finally {
                    h.shift();
                }
            }
            function i(t, n, i) {
                for (var o = [], a = se.$$annotate(t, e, i), s = 0, u = a.length; s < u; s++) {
                    var c = a[s];
                    if ("string" != typeof c) throw qi("itkn", "Incorrect injection token! Expected service name as string, got {0}", c);
                    o.push(n && n.hasOwnProperty(c) ? n[c] : r(c, i));
                }
                return o;
            }
            return {
                invoke: function(t, e, n, r) {
                    "string" == typeof n && (r = n, n = null);
                    var a = i(t, n, r);
                    return Xr(t) && (t = t[t.length - 1]), function(t) {
                        if (qr || "function" != typeof t) return !1;
                        var e = t.$$ngIsClass;
                        return j(e) || (e = t.$$ngIsClass = /^(?:class\b|constructor\()/.test(ie(t))), e;
                    }(t) ? (a.unshift(null), new (Function.prototype.bind.apply(t, a))()) : t.apply(e, a);
                },
                instantiate: function(t, e, n) {
                    var r = Xr(t) ? t[t.length - 1] : t, o = i(t, e, n);
                    return o.unshift(null), new (Function.prototype.bind.apply(r, o))();
                },
                get: r,
                annotate: se.$$annotate,
                has: function(e) {
                    return d.hasOwnProperty(e + f) || t.hasOwnProperty(e);
                }
            };
        }
        e = !0 === e;
        var l = {}, f = "Provider", h = [], p = new Vi(), d = {
            $provide: {
                provider: n(r),
                factory: n(a),
                service: n(function(t, e) {
                    return a(t, [ "$injector", function(t) {
                        return t.instantiate(e);
                    } ]);
                }),
                value: n(function(t, e) {
                    return a(t, m(e), !1);
                }),
                constant: n(function(t, e) {
                    vt(t, "constant"), d[t] = e, $[t] = e;
                }),
                decorator: function(t, e) {
                    var n = v.get(t + f), r = n.$get;
                    n.$get = function() {
                        var t = w.invoke(r, n);
                        return w.invoke(e, null, {
                            $delegate: t
                        });
                    };
                }
            }
        }, v = d.$injector = c(d, function(t, e) {
            throw Yr.isString(e) && h.push(e), qi("unpr", "Unknown provider: {0}", h.join(" <- "));
        }), $ = {}, g = c($, function(t, e) {
            var n = v.get(t + f, e);
            return w.invoke(n.$get, n, void 0, t);
        }), w = g;
        d["$injector" + f] = {
            $get: m(g)
        }, w.modules = v.modules = gt();
        var S = function u(t) {
            pt(y(t) || Xr(t), "modulesToLoad", "not an array");
            var e, n = [];
            return o(t, function(t) {
                function r(t) {
                    var e, n;
                    for (e = 0, n = t.length; e < n; e++) {
                        var r = t[e], i = v.get(r[0]);
                        i[r[1]].apply(i, r[2]);
                    }
                }
                if (!p.get(t)) {
                    p.set(t, !0);
                    try {
                        x(t) ? (e = Fr(t), w.modules[t] = e, n = n.concat(u(e.requires)).concat(e._runBlocks), 
                        r(e._invokeQueue), r(e._configBlocks)) : k(t) ? n.push(v.invoke(t)) : Xr(t) ? n.push(v.invoke(t)) : dt(t, "module");
                    } catch (e) {
                        throw Xr(t) && (t = t[t.length - 1]), e.message && e.stack && -1 === e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), 
                        qi("modulerr", "Failed to instantiate module {0} due to:\n{1}", t, e.stack || e.message || e);
                    }
                }
            }), n;
        }(t);
        return (w = g.get("$injector")).strictDi = e, o(S, function(t) {
            t && w.invoke(t);
        }), w;
    }
    function ue() {
        var t = !0;
        this.disableAutoScrolling = function() {
            t = !1;
        }, this.$get = [ "$window", "$location", "$rootScope", function(e, n, r) {
            function a(t) {
                if (t) {
                    t.scrollIntoView();
                    var n = function() {
                        var t = s.yOffset;
                        if (k(t)) t = t(); else if (D(t)) {
                            var n = t[0];
                            t = "fixed" !== e.getComputedStyle(n).position ? 0 : n.getBoundingClientRect().bottom;
                        } else E(t) || (t = 0);
                        return t;
                    }();
                    if (n) {
                        var r = t.getBoundingClientRect().top;
                        e.scrollBy(0, r - n);
                    }
                } else e.scrollTo(0, 0);
            }
            function s(t) {
                var e;
                (t = x(t) ? t : E(t) ? t.toString() : n.hash()) ? (e = u.getElementById(t)) ? a(e) : (e = function(t) {
                    var e = null;
                    return Array.prototype.some.call(t, function(t) {
                        if ("a" === q(t)) return e = t, !0;
                    }), e;
                }(u.getElementsByName(t))) ? a(e) : "top" === t && a(null) : a(null);
            }
            var u = e.document;
            return t && r.$watch(function() {
                return n.hash();
            }, function(t, e) {
                t === e && "" === t || Jt(function() {
                    r.$evalAsync(s);
                });
            }), s;
        } ];
    }
    function ce(t, e) {
        return t || e ? t ? e ? (Xr(t) && (t = t.join(" ")), Xr(e) && (e = e.join(" ")), 
        t + " " + e) : t : e : "";
    }
    function he(t) {
        return b(t) ? t : {};
    }
    function pe(t, e, n, r) {
        function i(t) {
            try {
                t.apply(null, G(arguments, 1));
            } finally {
                if (0 == --m) for (;g.length; ) try {
                    g.pop()();
                } catch (t) {
                    n.error(t);
                }
            }
        }
        function s() {
            E = null, c();
        }
        function u() {
            z(w = y(w = C()) ? null : w, O) && (w = O), b = O = w;
        }
        function c() {
            var t = b;
            u(), S === l.url() && t === w || (S = l.url(), b = w, o(_, function(t) {
                t(l.url(), w);
            }));
        }
        var l = this, f = t.location, h = t.history, p = t.setTimeout, d = t.clearTimeout, $ = {};
        l.isMock = !1;
        var m = 0, g = [];
        l.$$completeOutstandingRequest = i, l.$$incOutstandingRequestCount = function() {
            m++;
        }, l.notifyWhenNoOutstandingRequests = function(t) {
            0 === m ? t() : g.push(t);
        };
        var w, b, S = f.href, x = e.find("base"), E = null, C = r.history ? function() {
            try {
                return h.state;
            } catch (t) {}
        } : v;
        u(), l.url = function(e, n, i) {
            if (y(i) && (i = null), f !== t.location && (f = t.location), h !== t.history && (h = t.history), 
            e) {
                var o = b === i;
                if (S === e && (!r.history || o)) return l;
                var s = S && Ge(S) === Ge(e);
                return S = e, b = i, !r.history || s && o ? (s || (E = e), n ? f.replace(e) : s ? f.hash = function(t) {
                    var e = t.indexOf("#");
                    return -1 === e ? "" : t.substr(e);
                }(e) : f.href = e, f.href !== e && (E = e)) : (h[n ? "replaceState" : "pushState"](i, "", e), 
                u()), E && (E = e), l;
            }
            return E || f.href.replace(/%27/g, "'");
        }, l.state = function() {
            return w;
        };
        var _ = [], k = !1, O = null;
        l.onUrlChange = function(e) {
            return k || (r.history && Ur(t).on("popstate", s), Ur(t).on("hashchange", s), k = !0), 
            _.push(e), e;
        }, l.$$applicationDestroyed = function() {
            Ur(t).off("hashchange popstate", s);
        }, l.$$checkUrlChange = c, l.baseHref = function() {
            var t = x.attr("href");
            return t ? t.replace(/^(https?:)?\/\/[^/]*/, "") : "";
        }, l.defer = function(t, e) {
            var n;
            return m++, n = p(function() {
                delete $[n], i(t);
            }, e || 0), $[n] = !0, n;
        }, l.defer.cancel = function(t) {
            return !!$[t] && (delete $[t], d(t), i(v), !0);
        };
    }
    function de() {
        this.$get = [ "$window", "$log", "$sniffer", "$document", function(t, e, n, r) {
            return new pe(t, r, e, n);
        } ];
    }
    function ve() {
        this.$get = function() {
            function t(t, n) {
                function i(t) {
                    t !== h && (p ? p === t && (p = t.n) : p = t, o(t.n, t.p), o(t, h), (h = t).n = null);
                }
                function o(t, e) {
                    t !== e && (t && (t.p = e), e && (e.n = t));
                }
                if (t in e) throw r("$cacheFactory")("iid", "CacheId '{0}' is already taken!", t);
                var a = 0, s = f({}, n, {
                    id: t
                }), u = gt(), c = n && n.capacity || Number.MAX_VALUE, l = gt(), h = null, p = null;
                return e[t] = {
                    put: function(t, e) {
                        if (!y(e)) return c < Number.MAX_VALUE && i(l[t] || (l[t] = {
                            key: t
                        })), t in u || a++, u[t] = e, c < a && this.remove(p.key), e;
                    },
                    get: function(t) {
                        if (c < Number.MAX_VALUE) {
                            var e = l[t];
                            if (!e) return;
                            i(e);
                        }
                        return u[t];
                    },
                    remove: function(t) {
                        if (c < Number.MAX_VALUE) {
                            var e = l[t];
                            if (!e) return;
                            e === h && (h = e.p), e === p && (p = e.n), o(e.n, e.p), delete l[t];
                        }
                        t in u && (delete u[t], a--);
                    },
                    removeAll: function() {
                        u = gt(), a = 0, l = gt(), h = p = null;
                    },
                    destroy: function() {
                        l = s = u = null, delete e[t];
                    },
                    info: function() {
                        return f({}, s, {
                            size: a
                        });
                    }
                };
            }
            var e = {};
            return t.info = function() {
                var t = {};
                return o(e, function(e, n) {
                    t[n] = e.info();
                }), t;
            }, t.get = function(t) {
                return e[t];
            }, t;
        };
    }
    function $e() {
        this.$get = [ "$cacheFactory", function(t) {
            return t("templates");
        } ];
    }
    function me(e, n) {
        function r(t, e, n) {
            var r = /^\s*([@&<]|=(\*?))(\??)\s*([\w$]*)\s*$/, i = gt();
            return o(t, function(t, o) {
                if (t in O) i[o] = O[t]; else {
                    var a = t.match(r);
                    if (!a) throw Ki("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", e, o, t, n ? "controller bindings definition" : "isolate scope definition");
                    i[o] = {
                        mode: a[1][0],
                        collection: "*" === a[2],
                        optional: "?" === a[3],
                        attrName: a[4] || o
                    }, a[4] && (O[t] = i[o]);
                }
            }), i;
        }
        function i(t, e) {
            var n = {
                isolateScope: null,
                bindToController: null
            };
            if (b(t.scope) && (!0 === t.bindToController ? (n.bindToController = r(t.scope, e, !0), 
            n.isolateScope = {}) : n.isolateScope = r(t.scope, e, !1)), b(t.bindToController) && (n.bindToController = r(t.bindToController, e, !0)), 
            n.bindToController && !t.controller) throw Ki("noctrl", "Cannot bind to controller without directive '{0}'s controller.", e);
            return n;
        }
        function u(t) {
            var e = t.require || t.controller && t.name;
            return !Xr(e) && b(e) && o(e, function(t, n) {
                var r = t.match(E);
                t.substring(r[0].length) || (e[n] = r[0] + n);
            }), e;
        }
        var l = {}, h = "Directive", p = /^\s*directive:\s*([\w-]+)\s+(.*)$/, g = /(([\w-]+)(?::([^;]+))?;?)/, S = function(t) {
            var e, n = {}, r = t.split(",");
            for (e = 0; e < r.length; e++) n[r[e]] = !0;
            return n;
        }("ngSrc,ngSrcset,src,srcset"), E = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, C = /^(on[a-z]+|formaction)$/, O = gt();
        this.directive = function t(n, r) {
            return pt(n, "name"), vt(n, "directive"), x(n) ? (function(t) {
                var e = t.charAt(0);
                if (!e || e !== Dr(e)) throw Ki("baddir", "Directive/Component name '{0}' is invalid. The first character must be a lowercase letter", t);
                if (t !== t.trim()) throw Ki("baddir", "Directive/Component name '{0}' is invalid. The name should not contain leading or trailing whitespaces", t);
            }(n), pt(r, "directiveFactory"), l.hasOwnProperty(n) || (l[n] = [], e.factory(n + h, [ "$injector", "$exceptionHandler", function(t, e) {
                var r = [];
                return o(l[n], function(i, o) {
                    try {
                        var a = t.invoke(i);
                        k(a) ? a = {
                            compile: m(a)
                        } : !a.compile && a.link && (a.compile = m(a.link)), a.priority = a.priority || 0, 
                        a.index = o, a.name = a.name || n, a.require = u(a), a.restrict = function(t, e) {
                            if (t && (!x(t) || !/[EACM]/.test(t))) throw Ki("badrestrict", "Restrict property '{0}' of directive '{1}' is invalid", t, e);
                            return t || "EA";
                        }(a.restrict, n), a.$$moduleName = i.$$moduleName, r.push(a);
                    } catch (t) {
                        e(t);
                    }
                }), r;
            } ])), l[n].push(r)) : o(n, s(t)), this;
        }, this.component = function t(e, n) {
            function r(t) {
                function e(e) {
                    return k(e) || Xr(e) ? function(n, r) {
                        return t.invoke(e, this, {
                            $element: n,
                            $attrs: r
                        });
                    } : e;
                }
                var r = n.template || n.templateUrl ? n.template : "", a = {
                    controller: i,
                    controllerAs: function(t, e) {
                        if (e && x(e)) return e;
                        if (x(t)) {
                            var n = to.exec(t);
                            if (n) return n[3];
                        }
                    }(n.controller) || n.controllerAs || "$ctrl",
                    template: e(r),
                    templateUrl: e(n.templateUrl),
                    transclude: n.transclude,
                    scope: {},
                    bindToController: n.bindings || {},
                    restrict: "E",
                    require: n.require
                };
                return o(n, function(t, e) {
                    "$" === e.charAt(0) && (a[e] = t);
                }), a;
            }
            if (!x(e)) return o(e, s(J(this, t))), this;
            var i = n.controller || function() {};
            return o(n, function(t, e) {
                "$" === e.charAt(0) && (r[e] = t, k(i) && (i[e] = t));
            }), r.$inject = [ "$injector" ], this.directive(e, r);
        }, this.aHrefSanitizationWhitelist = function(t) {
            return w(t) ? (n.aHrefSanitizationWhitelist(t), this) : n.aHrefSanitizationWhitelist();
        }, this.imgSrcSanitizationWhitelist = function(t) {
            return w(t) ? (n.imgSrcSanitizationWhitelist(t), this) : n.imgSrcSanitizationWhitelist();
        };
        var R = !0, A = !(this.debugInfoEnabled = function(t) {
            return w(t) ? (R = t, this) : R;
        }), P = !(this.preAssignBindingsEnabled = function(t) {
            return w(t) ? (A = t, this) : A;
        });
        this.strictComponentBindingsEnabled = function(t) {
            return w(t) ? (P = t, this) : P;
        };
        var V = 10;
        this.onChangesTtl = function(t) {
            return arguments.length ? (V = t, this) : V;
        };
        var I = !0;
        this.commentDirectivesEnabled = function(t) {
            return arguments.length ? (I = t, this) : I;
        };
        var M = !0;
        this.cssClassDirectivesEnabled = function(t) {
            return arguments.length ? (M = t, this) : M;
        }, this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function(e, n, r, a, s, u, c, m, O, N) {
            function D() {
                try {
                    if (!--Vt) throw kt = void 0, Ki("infchng", "{0} $onChanges() iterations reached. Aborting!\n", V);
                    c.$apply(function() {
                        for (var t = [], e = 0, n = kt.length; e < n; ++e) try {
                            kt[e]();
                        } catch (e) {
                            t.push(e);
                        }
                        if (kt = void 0, t.length) throw t;
                    });
                } finally {
                    Vt++;
                }
            }
            function L(t, e) {
                if (e) {
                    var n, r, i, o = Object.keys(e);
                    for (n = 0, r = o.length; n < r; n++) this[i = o[n]] = e[i];
                } else this.$attr = {};
                this.$$element = t;
            }
            function F(t, e) {
                try {
                    t.addClass(e);
                } catch (t) {}
            }
            function W(t, e, n, r, i) {
                t instanceof Ur || (t = Ur(t));
                var o = Y(t, e, t, n, r, i);
                W.$$addScopeClass(t);
                var a = null;
                return function(e, n, r) {
                    if (!t) throw Ki("multilink", "This element has already been linked.");
                    pt(e, "scope"), i && i.needsNewScope && (e = e.$parent.$new());
                    var l, s = (r = r || {}).parentBoundTranscludeFn, u = r.transcludeControllers, c = r.futureParentElement;
                    if (s && s.$$boundTransclude && (s = s.$$boundTransclude), a || (a = function(t) {
                        var e = t && t[0];
                        return e && "foreignobject" !== q(e) && Gr.call(e).match(/SVG/) ? "svg" : "html";
                    }(c)), l = "html" !== a ? Ur(yt(a, Ur("<div>").append(t).html())) : n ? Oi.clone.call(t) : t, 
                    u) for (var f in u) l.data("$" + f + "Controller", u[f].instance);
                    return W.$$addScopeInfo(l, e), n && n(l, e), o && o(e, l, l, s), n || (t = o = null), 
                    l;
                };
            }
            function Y(t, e, n, r, i, o) {
                for (var a, s, u, c, l, f, h, p = [], d = Xr(t) || t instanceof Ur, v = 0; v < t.length; v++) a = new L(), 
                11 === qr && Z(t, v, d), (u = (s = X(t[v], [], a, 0 === v ? r : void 0, i)).length ? ot(s, t[v], a, e, n, null, [], [], o) : null) && u.scope && W.$$addScopeClass(a.$$element), 
                l = u && u.terminal || !(c = t[v].childNodes) || !c.length ? null : Y(c, u ? (u.transcludeOnThisElement || !u.templateOnThisElement) && u.transclude : e), 
                (u || l) && (p.push(v, u, l), f = !0, h = h || u), o = null;
                return f ? function(t, n, r, i) {
                    var o, a, s, u, c, l, f, d;
                    if (h) {
                        var v = n.length;
                        for (d = new Array(v), c = 0; c < p.length; c += 3) d[f = p[c]] = n[f];
                    } else d = n;
                    for (c = 0, l = p.length; c < l; ) s = d[p[c++]], o = p[c++], a = p[c++], o ? (o.scope ? (u = t.$new(), 
                    W.$$addScopeInfo(Ur(s), u)) : u = t, o(a, u, s, r, o.transcludeOnThisElement ? Q(t, o.transclude, i) : !o.templateOnThisElement && i ? i : !i && e ? Q(t, e) : null)) : a && a(t, s.childNodes, void 0, i);
                } : null;
            }
            function Z(t, e, n) {
                var r, i = t[e], o = i.parentNode;
                if (i.nodeType === fi) for (;(r = o ? i.nextSibling : t[e + 1]) && r.nodeType === fi; ) i.nodeValue = i.nodeValue + r.nodeValue, 
                r.parentNode && r.parentNode.removeChild(r), n && r === t[e + 1] && t.splice(e + 1, 1);
            }
            function Q(t, e, n) {
                function r(r, i, o, a, s) {
                    return r || ((r = t.$new(!1, s)).$$transcluded = !0), e(r, i, {
                        parentBoundTranscludeFn: n,
                        transcludeControllers: o,
                        futureParentElement: a
                    });
                }
                var i = r.$$slots = gt();
                for (var o in e.$$slots) e.$$slots[o] ? i[o] = Q(t, e.$$slots[o], n) : i[o] = null;
                return r;
            }
            function X(t, e, n, r, i) {
                var o, a, s, u = t.nodeType, c = n.$attr;
                switch (u) {
                  case li:
                    ct(e, ye(a = q(t)), "E", r, i);
                    for (var l, f, h, p, d, v, $ = t.attributes, m = 0, y = $ && $.length; m < y; m++) {
                        var w = !1, S = !1;
                        f = (l = $[m]).name, d = l.value, p = ye(f), (v = Dt.test(p)) && (f = f.replace(Zi, "").substr(8).replace(/_(.)/g, function(t, e) {
                            return e.toUpperCase();
                        }));
                        var E = p.match(Lt);
                        E && lt(E[1]) && (S = (w = f).substr(0, f.length - 5) + "end", f = f.substr(0, f.length - 6)), 
                        c[h = ye(f.toLowerCase())] = f, !v && n.hasOwnProperty(h) || (n[h] = d, Yt(t, h) && (n[h] = !0)), 
                        bt(t, e, d, h, v), ct(e, h, "A", r, i, w, S);
                    }
                    if ("input" === a && "hidden" === t.getAttribute("type") && t.setAttribute("autocomplete", "off"), 
                    !Pt) break;
                    if (b(s = t.className) && (s = s.animVal), x(s) && "" !== s) for (;o = g.exec(s); ) ct(e, h = ye(o[2]), "C", r, i) && (n[h] = ei(o[3])), 
                    s = s.substr(o.index + o[0].length);
                    break;

                  case fi:
                    mt(e, t.nodeValue);
                    break;

                  case hi:
                    if (!At) break;
                    tt(t, e, n, r, i);
                }
                return e.sort(vt), e;
            }
            function tt(t, e, n, r, i) {
                try {
                    var o = p.exec(t.nodeValue);
                    if (o) {
                        var a = ye(o[1]);
                        ct(e, a, "M", r, i) && (n[a] = ei(o[2]));
                    }
                } catch (t) {}
            }
            function nt(t, e, n) {
                var r = [], i = 0;
                if (e && t.hasAttribute && t.hasAttribute(e)) do {
                    if (!t) throw Ki("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", e, n);
                    t.nodeType === li && (t.hasAttribute(e) && i++, t.hasAttribute(n) && i--), r.push(t), 
                    t = t.nextSibling;
                } while (0 < i); else r.push(t);
                return Ur(r);
            }
            function rt(t, e, n) {
                return function(r, i, o, a, s) {
                    return i = nt(i[0], e, n), t(r, i, o, a, s);
                };
            }
            function it(t, e, n, r, i, o) {
                var a;
                return t ? W(e, n, r, i, o) : function() {
                    return a || (a = W(e, n, r, i, o), e = n = o = null), a.apply(this, arguments);
                };
            }
            function ot(t, e, n, i, a, s, u, c, l) {
                function h(t, e, n, r) {
                    t && (n && (t = rt(t, n, r)), t.require = d.require, t.directiveName = v, (E === d || d.$$isolateScope) && (t = xt(t, {
                        isolateScope: !0
                    })), u.push(t)), e && (n && (e = rt(e, n, r)), e.require = d.require, e.directiveName = v, 
                    (E === d || d.$$isolateScope) && (e = xt(e, {
                        isolateScope: !0
                    })), c.push(e));
                }
                function p(t, i, a, s, l) {
                    var h, p, d, v, $, m, g, w, _, O;
                    for (var R in e === a ? w = (_ = n).$$element : _ = new L(w = Ur(a), n), $ = i, 
                    E ? v = i.$new(!0) : S && ($ = i.$parent), l && ((g = function(t, e, n, r) {
                        var i;
                        if (T(t) || (r = n, n = e, e = t, t = void 0), P && (i = m), n || (n = P ? w.parent() : w), 
                        !r) return l(t, e, i, n, N);
                        var o = l.$$slots[r];
                        if (o) return o(t, e, i, n, N);
                        if (y(o)) throw Ki("noslot", 'No parent directive that requires a transclusion with slot name "{0}". Element: {1}', r, et(w));
                    }).$$boundTransclude = l, g.isSlotFilled = function(t) {
                        return !!l.$$slots[t];
                    }), x && (m = st(w, _, g, x, v, i, E)), E && (W.$$addScopeInfo(w, v, !0, !(C && (C === E || C === E.$$originalDirective))), 
                    W.$$addScopeClass(w, !0), v.$$isolateBindings = E.$$isolateBindings, (O = _t(i, _, v, v.$$isolateBindings, E)).removeWatches && v.$on("$destroy", O.removeWatches)), 
                    m) {
                        var V = x[R], j = m[R], I = V.$$bindings.bindToController;
                        if (A) {
                            j.bindingInfo = I ? _t($, _, j.instance, I, V) : {};
                            var M = j();
                            M !== j.instance && (j.instance = M, w.data("$" + V.name + "Controller", M), j.bindingInfo.removeWatches && j.bindingInfo.removeWatches(), 
                            j.bindingInfo = _t($, _, j.instance, I, V));
                        } else j.instance = j(), w.data("$" + V.name + "Controller", j.instance), j.bindingInfo = _t($, _, j.instance, I, V);
                    }
                    for (o(x, function(t, e) {
                        var n = t.require;
                        t.bindToController && !Xr(n) && b(n) && f(m[e].instance, at(e, n, w, m));
                    }), o(m, function(t) {
                        var e = t.instance;
                        if (k(e.$onChanges)) try {
                            e.$onChanges(t.bindingInfo.initialChanges);
                        } catch (t) {
                            r(t);
                        }
                        if (k(e.$onInit)) try {
                            e.$onInit();
                        } catch (t) {
                            r(t);
                        }
                        k(e.$doCheck) && ($.$watch(function() {
                            e.$doCheck();
                        }), e.$doCheck()), k(e.$onDestroy) && $.$on("$destroy", function() {
                            e.$onDestroy();
                        });
                    }), h = 0, p = u.length; h < p; h++) Et(d = u[h], d.isolateScope ? v : i, w, _, d.require && at(d.directiveName, d.require, w, m), g);
                    var N = i;
                    for (E && (E.template || null === E.templateUrl) && (N = v), t && t(N, a.childNodes, void 0, l), 
                    h = c.length - 1; 0 <= h; h--) Et(d = c[h], d.isolateScope ? v : i, w, _, d.require && at(d.directiveName, d.require, w, m), g);
                    o(m, function(t) {
                        var e = t.instance;
                        k(e.$postLink) && e.$postLink();
                    });
                }
                l = l || {};
                for (var d, v, $, m, g, w = -Number.MAX_VALUE, S = l.newScopeDirective, x = l.controllerDirectives, E = l.newIsolateScopeDirective, C = l.templateDirective, _ = l.nonTlbTranscludeDirective, O = !1, R = !1, P = l.hasElementTranscludeDirective, V = n.$$element = Ur(e), j = s, I = i, M = !1, N = !1, D = 0, U = t.length; D < U; D++) {
                    var H = (d = t[D]).$$start, F = d.$$end;
                    if (H && (V = nt(e, H, F)), $ = void 0, w > d.priority) break;
                    if ((g = d.scope) && (d.templateUrl || (b(g) ? ($t("new/isolated scope", E || S, d, V), 
                    E = d) : $t("new/isolated scope", E, d, V)), S = S || d), v = d.name, !M && (d.replace && (d.templateUrl || d.template) || d.transclude && !d.$$tlb)) {
                        for (var B, z = D + 1; B = t[z++]; ) if (B.transclude && !B.$$tlb || B.replace && (B.templateUrl || B.template)) {
                            N = !0;
                            break;
                        }
                        M = !0;
                    }
                    if (!d.templateUrl && d.controller && (x = x || gt(), $t("'" + v + "' controller", x[v], d, V), 
                    x[v] = d), g = d.transclude) if (O = !0, d.$$tlb || ($t("transclusion", _, d, V), 
                    _ = d), "element" === g) P = !0, w = d.priority, $ = V, V = n.$$element = Ur(W.$$createComment(v, n[v])), 
                    e = V[0], St(a, G($), e), $[0].$$parentNode = $[0].parentNode, I = it(N, $, i, w, j && j.name, {
                        nonTlbTranscludeDirective: _
                    }); else {
                        var K = gt();
                        if (b(g)) {
                            $ = [];
                            var Y = gt(), Z = gt();
                            for (var Q in o(g, function(t, e) {
                                var n = "?" === t.charAt(0);
                                t = n ? t.substring(1) : t, Y[t] = e, K[e] = null, Z[e] = n;
                            }), o(V.contents(), function(t) {
                                var e = Y[ye(q(t))];
                                e ? (Z[e] = !0, K[e] = K[e] || [], K[e].push(t)) : $.push(t);
                            }), o(Z, function(t, e) {
                                if (!t) throw Ki("reqslot", "Required transclusion slot `{0}` was not filled.", e);
                            }), K) K[Q] && (K[Q] = it(N, K[Q], i));
                        } else $ = Ur(jt(e)).contents();
                        V.empty(), (I = it(N, $, i, void 0, void 0, {
                            needsNewScope: d.$$isolateScope || d.$$newScope
                        })).$$slots = K;
                    }
                    if (d.template) if (R = !0, $t("template", C, d, V), g = k((C = d).template) ? d.template(V, n) : d.template, 
                    g = Nt(g), d.replace) {
                        if (j = d, $ = Ot(g) ? [] : be(yt(d.templateNamespace, ei(g))), e = $[0], 1 !== $.length || e.nodeType !== li) throw Ki("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", v, "");
                        St(a, V, e);
                        var tt = {
                            $attr: {}
                        }, ot = X(e, [], tt), ct = t.splice(D + 1, t.length - (D + 1));
                        (E || S) && ut(ot, E, S), t = t.concat(ot).concat(ct), ft(n, tt), U = t.length;
                    } else V.html(g);
                    if (d.templateUrl) R = !0, $t("template", C, d, V), (C = d).replace && (j = d), 
                    p = dt(t.splice(D, t.length - D), V, n, a, O && I, u, c, {
                        controllerDirectives: x,
                        newScopeDirective: S !== d && S,
                        newIsolateScopeDirective: E,
                        templateDirective: C,
                        nonTlbTranscludeDirective: _
                    }), U = t.length; else if (d.compile) try {
                        m = d.compile(V, n, I);
                        var lt = d.$$originalDirective || d;
                        k(m) ? h(null, J(lt, m), H, F) : m && h(J(lt, m.pre), J(lt, m.post), H, F);
                    } catch (t) {
                        r(t, et(V));
                    }
                    d.terminal && (p.terminal = !0, w = Math.max(w, d.priority));
                }
                return p.scope = S && !0 === S.scope, p.transcludeOnThisElement = O, p.templateOnThisElement = R, 
                p.transclude = I, l.hasElementTranscludeDirective = P, p;
            }
            function at(t, e, n, r) {
                var i;
                if (x(e)) {
                    var a = e.match(E), s = e.substring(a[0].length), u = a[1] || a[3], c = "?" === a[2];
                    if ("^^" === u ? n = n.parent() : i = (i = r && r[s]) && i.instance, !i) {
                        var l = "$" + s + "Controller";
                        i = u ? n.inheritedData(l) : n.data(l);
                    }
                    if (!i && !c) throw Ki("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", s, t);
                } else if (Xr(e)) {
                    i = [];
                    for (var f = 0, h = e.length; f < h; f++) i[f] = at(t, e[f], n, r);
                } else b(e) && (i = {}, o(e, function(e, o) {
                    i[o] = at(t, e, n, r);
                }));
                return i || null;
            }
            function st(t, e, n, r, i, o, a) {
                var s = gt();
                for (var c in r) {
                    var l = r[c], f = {
                        $scope: l === a || l.$$isolateScope ? i : o,
                        $element: t,
                        $attrs: e,
                        $transclude: n
                    }, h = l.controller;
                    "@" === h && (h = e[l.name]);
                    var p = u(h, f, !0, l.controllerAs);
                    s[l.name] = p, t.data("$" + l.name + "Controller", p.instance);
                }
                return s;
            }
            function ut(t, e, n) {
                for (var r = 0, i = t.length; r < i; r++) t[r] = d(t[r], {
                    $$isolateScope: e,
                    $$newScope: n
                });
            }
            function ct(t, n, r, o, a, s, u) {
                if (n === a) return null;
                var c = null;
                if (l.hasOwnProperty(n)) for (var f, p = e.get(n + h), v = 0, $ = p.length; v < $; v++) if (f = p[v], 
                (y(o) || o > f.priority) && -1 !== f.restrict.indexOf(r)) {
                    if (s && (f = d(f, {
                        $$start: s,
                        $$end: u
                    })), !f.$$bindings) {
                        var m = f.$$bindings = i(f, f.name);
                        b(m.isolateScope) && (f.$$isolateBindings = m.isolateScope);
                    }
                    t.push(f), c = f;
                }
                return c;
            }
            function lt(t) {
                if (l.hasOwnProperty(t)) for (var n = e.get(t + h), r = 0, i = n.length; r < i; r++) if (n[r].multiElement) return !0;
                return !1;
            }
            function ft(t, e) {
                var n = e.$attr, r = t.$attr;
                o(t, function(r, i) {
                    "$" !== i.charAt(0) && (e[i] && e[i] !== r && (r.length ? r += ("style" === i ? ";" : " ") + e[i] : r = e[i]), 
                    t.$set(i, r, !0, n[i]));
                }), o(e, function(e, i) {
                    t.hasOwnProperty(i) || "$" === i.charAt(0) || (t[i] = e, "class" !== i && "style" !== i && (r[i] = n[i]));
                });
            }
            function dt(t, e, n, i, s, u, c, l) {
                var f, h, p = [], v = e[0], $ = t.shift(), m = d($, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: $
                }), g = k($.templateUrl) ? $.templateUrl(e, n) : $.templateUrl, y = $.templateNamespace;
                return e.empty(), a(g).then(function(r) {
                    var a, d, w, S;
                    if (r = Nt(r), $.replace) {
                        if (w = Ot(r) ? [] : be(yt(y, ei(r))), a = w[0], 1 !== w.length || a.nodeType !== li) throw Ki("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", $.name, g);
                        d = {
                            $attr: {}
                        }, St(i, e, a);
                        var x = X(a, [], d);
                        b($.scope) && ut(x, !0), t = x.concat(t), ft(n, d);
                    } else a = v, e.html(r);
                    for (t.unshift(m), f = ot(t, a, n, s, e, $, u, c, l), o(i, function(t, n) {
                        t === a && (i[n] = e[0]);
                    }), h = Y(e[0].childNodes, s); p.length; ) {
                        var E = p.shift(), C = p.shift(), _ = p.shift(), k = p.shift(), O = e[0];
                        if (!E.$$destroyed) {
                            if (C !== v) {
                                var R = C.className;
                                l.hasElementTranscludeDirective && $.replace || (O = jt(a)), St(_, Ur(C), O), F(Ur(O), R);
                            }
                            S = f.transcludeOnThisElement ? Q(E, f.transclude, k) : k, f(h, E, O, i, S);
                        }
                    }
                    p = null;
                }).catch(function(t) {
                    _(t) && r(t);
                }), function(t, e, n, r, i) {
                    var o = i;
                    e.$$destroyed || (p ? p.push(e, n, r, o) : (f.transcludeOnThisElement && (o = Q(e, f.transclude, i)), 
                    f(h, e, n, r, o)));
                };
            }
            function vt(t, e) {
                var n = e.priority - t.priority;
                return 0 !== n ? n : t.name !== e.name ? t.name < e.name ? -1 : 1 : t.index - e.index;
            }
            function $t(t, e, n, r) {
                function i(t) {
                    return t ? " (module: " + t + ")" : "";
                }
                if (e) throw Ki("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", e.name, i(e.$$moduleName), n.name, i(n.$$moduleName), t, et(r));
            }
            function mt(t, e) {
                var r = n(e, !0);
                r && t.push({
                    priority: 0,
                    compile: function(t) {
                        var e = t.parent(), n = !!e.length;
                        return n && W.$$addBindingClass(e), function(t, e) {
                            var i = e.parent();
                            n || W.$$addBindingClass(i), W.$$addBindingInfo(i, r.expressions), t.$watch(r, function(t) {
                                e[0].nodeValue = t;
                            });
                        };
                    }
                });
            }
            function yt(e, n) {
                switch (e = Dr(e || "html")) {
                  case "svg":
                  case "math":
                    var r = t.document.createElement("div");
                    return r.innerHTML = "<" + e + ">" + n + "</" + e + ">", r.childNodes[0].childNodes;

                  default:
                    return n;
                }
            }
            function bt(t, e, r, i, o) {
                var a = function(t, e) {
                    if ("srcdoc" === e) return m.HTML;
                    var n = q(t);
                    if ("src" === e || "ngSrc" === e) {
                        if (-1 === [ "img", "video", "audio", "source", "track" ].indexOf(n)) return m.RESOURCE_URL;
                    } else if ("xlinkHref" === e || "form" === n && "action" === e || "link" === n && "href" === e) return m.RESOURCE_URL;
                }(t, i), s = !o, u = S[i] || o, c = n(r, s, a, u);
                if (c) {
                    if ("multiple" === i && "select" === q(t)) throw Ki("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", et(t));
                    if (C.test(i)) throw Ki("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                    e.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(t, e, o) {
                                    var s = o.$$observers || (o.$$observers = gt()), l = o[i];
                                    l !== r && (c = l && n(l, !0, a, u), r = l), c && (o[i] = c(t), (s[i] || (s[i] = [])).$$inter = !0, 
                                    (o.$$observers && o.$$observers[i].$$scope || t).$watch(c, function(t, e) {
                                        "class" === i && t !== e ? o.$updateClass(t, e) : o.$set(i, t);
                                    }));
                                }
                            };
                        }
                    });
                }
            }
            function St(e, n, r) {
                var i, o, a = n[0], s = n.length, u = a.parentNode;
                if (e) for (i = 0, o = e.length; i < o; i++) if (e[i] === a) {
                    e[i++] = r;
                    for (var c = i, l = c + s - 1, f = e.length; c < f; c++, l++) l < f ? e[c] = e[l] : delete e[c];
                    e.length -= s - 1, e.context === a && (e.context = r);
                    break;
                }
                u && u.replaceChild(r, a);
                var h = t.document.createDocumentFragment();
                for (i = 0; i < s; i++) h.appendChild(n[i]);
                for (Ur.hasData(a) && (Ur.data(r, Ur.data(a)), Ur(a).off("$destroy")), Ur.cleanData(h.querySelectorAll("*")), 
                i = 1; i < s; i++) delete n[i];
                n[0] = r, n.length = 1;
            }
            function xt(t, e) {
                return f(function() {
                    return t.apply(null, arguments);
                }, t, e);
            }
            function Et(t, e, n, i, o, a) {
                try {
                    t(e, n, i, o, a);
                } catch (t) {
                    r(t, et(n));
                }
            }
            function Ct(t, e) {
                if (P) throw Ki("missingattr", "Attribute '{0}' of '{1}' is non-optional and must be set!", t, e);
            }
            function _t(t, e, r, i, a) {
                function u(e, n, i) {
                    k(r.$onChanges) && !B(n, i) && (kt || (t.$$postDigest(D), kt = []), l || (l = {}, 
                    kt.push(c)), l[e] && (i = l[e].previousValue), l[e] = new ge(i, n));
                }
                function c() {
                    r.$onChanges(l), l = void 0;
                }
                var l, f = [], h = {};
                return o(i, function(i, o) {
                    var c, l, p, d, $, m = i.attrName, g = i.optional;
                    switch (i.mode) {
                      case "@":
                        g || Nr.call(e, m) || (Ct(m, a.name), r[o] = e[m] = void 0), $ = e.$observe(m, function(t) {
                            if (x(t) || j(t)) {
                                var e = r[o];
                                u(o, t, e), r[o] = t;
                            }
                        }), e.$$observers[m].$$scope = t, x(c = e[m]) ? r[o] = n(c)(t) : j(c) && (r[o] = c), 
                        h[o] = new ge(Yi, r[o]), f.push($);
                        break;

                      case "=":
                        if (!Nr.call(e, m)) {
                            if (g) break;
                            Ct(m, a.name), e[m] = void 0;
                        }
                        if (g && !e[m]) break;
                        l = s(e[m]), d = l.literal ? z : B, p = l.assign || function() {
                            throw c = r[o] = l(t), Ki("nonassign", "Expression '{0}' in attribute '{1}' used with directive '{2}' is non-assignable!", e[m], m, a.name);
                        }, c = r[o] = l(t);
                        var y = function(e) {
                            return d(e, r[o]) || (d(e, c) ? p(t, e = r[o]) : r[o] = e), c = e;
                        };
                        y.$stateful = !0, $ = i.collection ? t.$watchCollection(e[m], y) : t.$watch(s(e[m], y), null, l.literal), 
                        f.push($);
                        break;

                      case "<":
                        if (!Nr.call(e, m)) {
                            if (g) break;
                            Ct(m, a.name), e[m] = void 0;
                        }
                        if (g && !e[m]) break;
                        var w = (l = s(e[m])).literal, b = r[o] = l(t);
                        h[o] = new ge(Yi, r[o]), $ = t.$watch(l, function(t, e) {
                            if (e === t) {
                                if (e === b || w && z(e, b)) return;
                                e = b;
                            }
                            u(o, t, e), r[o] = t;
                        }, w), f.push($);
                        break;

                      case "&":
                        if (g || Nr.call(e, m) || Ct(m, a.name), (l = e.hasOwnProperty(m) ? s(e[m]) : v) === v && g) break;
                        r[o] = function(e) {
                            return l(t, e);
                        };
                    }
                }), {
                    initialChanges: h,
                    removeWatches: f.length && function() {
                        for (var t = 0, e = f.length; t < e; ++t) f[t]();
                    }
                };
            }
            var kt, Rt = /^\w/, Tt = t.document.createElement("div"), At = I, Pt = M, Vt = V;
            L.prototype = {
                $normalize: ye,
                $addClass: function(t) {
                    t && 0 < t.length && O.addClass(this.$$element, t);
                },
                $removeClass: function(t) {
                    t && 0 < t.length && O.removeClass(this.$$element, t);
                },
                $updateClass: function(t, e) {
                    var n = we(t, e);
                    n && n.length && O.addClass(this.$$element, n);
                    var r = we(e, t);
                    r && r.length && O.removeClass(this.$$element, r);
                },
                $set: function(t, e, n, i) {
                    var a, s = Yt(this.$$element[0], t), u = function(t) {
                        return Ai[t];
                    }(t), c = t;
                    if (s ? (this.$$element.prop(t, e), i = s) : u && (this[u] = e, c = u), this[t] = e, 
                    i ? this.$attr[t] = i : (i = this.$attr[t]) || (this.$attr[t] = i = ht(t, "-")), 
                    "a" === (a = q(this.$$element)) && ("href" === t || "xlinkHref" === t) || "img" === a && "src" === t) this[t] = e = N(e, "src" === t); else if ("img" === a && "srcset" === t && w(e)) {
                        for (var l = "", f = ei(e), h = /\s/.test(f) ? /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/ : /(,)/, p = f.split(h), d = Math.floor(p.length / 2), v = 0; v < d; v++) {
                            var $ = 2 * v;
                            l += N(ei(p[$]), !0), l += " " + ei(p[$ + 1]);
                        }
                        var m = ei(p[2 * v]).split(/\s/);
                        l += N(ei(m[0]), !0), 2 === m.length && (l += " " + ei(m[1])), this[t] = e = l;
                    }
                    !1 !== n && (null === e || y(e) ? this.$$element.removeAttr(i) : Rt.test(i) ? this.$$element.attr(i, e) : function(t, e, n) {
                        Tt.innerHTML = "<span " + e + ">";
                        var r = Tt.firstChild.attributes, i = r[0];
                        r.removeNamedItem(i.name), i.value = n, t.attributes.setNamedItem(i);
                    }(this.$$element[0], i, e));
                    var g = this.$$observers;
                    g && o(g[c], function(t) {
                        try {
                            t(e);
                        } catch (t) {
                            r(t);
                        }
                    });
                },
                $observe: function(t, e) {
                    var n = this, r = n.$$observers || (n.$$observers = gt()), i = r[t] || (r[t] = []);
                    return i.push(e), c.$evalAsync(function() {
                        i.$$inter || !n.hasOwnProperty(t) || y(n[t]) || e(n[t]);
                    }), function() {
                        H(i, e);
                    };
                }
            };
            var It = n.startSymbol(), Mt = n.endSymbol(), Nt = "{{" === It && "}}" === Mt ? $ : function(t) {
                return t.replace(/\{\{/g, It).replace(/}}/g, Mt);
            }, Dt = /^ngAttr[A-Z]/, Lt = /^(.+)Start$/;
            return W.$$addBindingInfo = R ? function(t, e) {
                var n = t.data("$binding") || [];
                Xr(e) ? n = n.concat(e) : n.push(e), t.data("$binding", n);
            } : v, W.$$addBindingClass = R ? function(t) {
                F(t, "ng-binding");
            } : v, W.$$addScopeInfo = R ? function(t, e, n, r) {
                var i = n ? r ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                t.data(i, e);
            } : v, W.$$addScopeClass = R ? function(t, e) {
                F(t, e ? "ng-isolate-scope" : "ng-scope");
            } : v, W.$$createComment = function(e, n) {
                var r = "";
                return R && (r = " " + (e || "") + ": ", n && (r += n + " ")), t.document.createComment(r);
            }, W;
        } ];
    }
    function ge(t, e) {
        this.previousValue = t, this.currentValue = e;
    }
    function ye(t) {
        return t.replace(Zi, "").replace(Qi, _t);
    }
    function we(t, e) {
        var n = "", r = t.split(/\s+/), i = e.split(/\s+/);
        t: for (var o = 0; o < r.length; o++) {
            for (var a = r[o], s = 0; s < i.length; s++) if (a === i[s]) continue t;
            n += (0 < n.length ? " " : "") + a;
        }
        return n;
    }
    function be(t) {
        var e = (t = Ur(t)).length;
        if (e <= 1) return t;
        for (;e--; ) {
            var n = t[e];
            (n.nodeType === hi || n.nodeType === fi && "" === n.nodeValue.trim()) && zr.call(t, e, 1);
        }
        return t;
    }
    function xe() {
        var t = {}, e = !1;
        this.has = function(e) {
            return t.hasOwnProperty(e);
        }, this.register = function(e, n) {
            vt(e, "controller"), b(e) ? f(t, e) : t[e] = n;
        }, this.allowGlobals = function() {
            e = !0;
        }, this.$get = [ "$injector", "$window", function(n, i) {
            function o(t, e, n, i) {
                if (!t || !b(t.$scope)) throw r("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", i, e);
                t.$scope[e] = n;
            }
            return function(r, a, s, u) {
                var c, l, h, p;
                if (s = !0 === s, u && x(u) && (p = u), x(r)) {
                    if (!(l = r.match(to))) throw Xi("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", r);
                    if (h = l[1], p = p || l[3], !(r = t.hasOwnProperty(h) ? t[h] : $t(a.$scope, h, !0) || (e ? $t(i, h, !0) : void 0))) throw Xi("ctrlreg", "The controller with the name '{0}' is not registered.", h);
                    dt(r, h, !0);
                }
                if (s) {
                    var d = (Xr(r) ? r[r.length - 1] : r).prototype;
                    return c = Object.create(d || null), p && o(a, p, c, h || r.name), f(function() {
                        var t = n.invoke(r, c, a, h);
                        return t !== c && (b(t) || k(t)) && (c = t, p && o(a, p, c, h || r.name)), c;
                    }, {
                        instance: c,
                        identifier: p
                    });
                }
                return c = n.instantiate(r, a, h), p && o(a, p, c, h || r.name), c;
            };
        } ];
    }
    function Ee() {
        this.$get = [ "$window", function(t) {
            return Ur(t.document);
        } ];
    }
    function Ce() {
        this.$get = [ "$document", "$rootScope", function(t, e) {
            function n() {
                i = r.hidden;
            }
            var r = t[0], i = r && r.hidden;
            return t.on("visibilitychange", n), e.$on("$destroy", function() {
                t.off("visibilitychange", n);
            }), function() {
                return i;
            };
        } ];
    }
    function _e() {
        this.$get = [ "$log", function(t) {
            return function(e, n) {
                t.error.apply(t, arguments);
            };
        } ];
    }
    function ke(t) {
        return b(t) ? C(t) ? t.toISOString() : Y(t) : t;
    }
    function Oe() {
        this.$get = function() {
            return function(t) {
                if (!t) return "";
                var e = [];
                return a(t, function(t, n) {
                    null === t || y(t) || k(t) || (Xr(t) ? o(t, function(t) {
                        e.push(at(n) + "=" + at(ke(t)));
                    }) : e.push(at(n) + "=" + at(ke(t))));
                }), e.join("&");
            };
        };
    }
    function Re() {
        this.$get = function() {
            return function(t) {
                if (!t) return "";
                var n = [];
                return function e(t, r, i) {
                    null === t || y(t) || (Xr(t) ? o(t, function(t, n) {
                        e(t, r + "[" + (b(t) ? n : "") + "]");
                    }) : b(t) && !C(t) ? a(t, function(t, n) {
                        e(t, r + (i ? "" : "[") + n + (i ? "" : "]"));
                    }) : n.push(at(r) + "=" + at(ke(t))));
                }(t, "", !0), n.join("&");
            };
        };
    }
    function Te(t, e) {
        if (x(t)) {
            var n = t.replace(ao, "").trim();
            if (n) {
                var r = e("Content-Type"), i = r && 0 === r.indexOf(no);
                if (i || function(t) {
                    var e = t.match(io);
                    return e && oo[e[0]].test(t);
                }(n)) try {
                    t = Z(n);
                } catch (e) {
                    if (!i) return t;
                    throw so("baddata", 'Data must be a valid JSON object. Received: "{0}". Parse error: "{1}"', t, e);
                }
            }
        }
        return t;
    }
    function Pe(t) {
        function e(t, e) {
            t && (r[t] = r[t] ? r[t] + ", " + e : e);
        }
        var n, r = gt();
        return x(t) ? o(t.split("\n"), function(t) {
            n = t.indexOf(":"), e(Dr(ei(t.substr(0, n))), ei(t.substr(n + 1)));
        }) : b(t) && o(t, function(t, n) {
            e(Dr(n), ei(t));
        }), r;
    }
    function Ve(t) {
        var e;
        return function(n) {
            if (e || (e = Pe(t)), n) {
                var r = e[Dr(n)];
                return void 0 === r && (r = null), r;
            }
            return e;
        };
    }
    function je(t, e, n, r) {
        return k(r) ? r(t, e, n) : (o(r, function(r) {
            t = r(t, e, n);
        }), t);
    }
    function Ie(t) {
        return 200 <= t && t < 300;
    }
    function Me() {
        var t = this.defaults = {
            transformResponse: [ Te ],
            transformRequest: [ function(t) {
                return !b(t) || function(t) {
                    return "[object File]" === Gr.call(t);
                }(t) || function(t) {
                    return "[object Blob]" === Gr.call(t);
                }(t) || function(t) {
                    return "[object FormData]" === Gr.call(t);
                }(t) ? t : Y(t);
            } ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: bt(ro),
                put: bt(ro),
                patch: bt(ro)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            paramSerializer: "$httpParamSerializer",
            jsonpCallbackParam: "callback"
        }, e = !1;
        this.useApplyAsync = function(t) {
            return w(t) ? (e = !!t, this) : e;
        };
        var n = this.interceptors = [];
        this.$get = [ "$browser", "$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", "$sce", function(i, a, s, u, c, l, h, p) {
            function d(e) {
                function n(t, e) {
                    for (var n = 0, r = e.length; n < r; ) {
                        var i = e[n++], o = e[n++];
                        t = t.then(i, o);
                    }
                    return e.length = 0, t;
                }
                function a(t, e) {
                    var n, r = {};
                    return o(t, function(t, i) {
                        k(t) ? null != (n = t(e)) && (r[i] = n) : r[i] = t;
                    }), r;
                }
                function s(t) {
                    var e = f({}, t);
                    return e.data = je(t.data, t.headers, t.status, u.transformResponse), Ie(t.status) ? e : l.reject(e);
                }
                if (!b(e)) throw r("$http")("badreq", "Http request configuration must be an object.  Received: {0}", e);
                if (!x(p.valueOf(e.url))) throw r("$http")("badreq", "Http request configuration url must be a string or a $sce trusted object.  Received: {0}", e.url);
                var u = f({
                    method: "get",
                    transformRequest: t.transformRequest,
                    transformResponse: t.transformResponse,
                    paramSerializer: t.paramSerializer,
                    jsonpCallbackParam: t.jsonpCallbackParam
                }, e);
                u.headers = function(e) {
                    var n, r, i, o = t.headers, s = f({}, e.headers);
                    o = f({}, o.common, o[Dr(e.method)]);
                    t: for (n in o) {
                        for (i in r = Dr(n), s) if (Dr(i) === r) continue t;
                        s[n] = o[n];
                    }
                    return a(s, bt(e));
                }(e), u.method = Lr(u.method), u.paramSerializer = x(u.paramSerializer) ? h.get(u.paramSerializer) : u.paramSerializer, 
                i.$$incOutstandingRequestCount();
                var c = [], d = [], m = l.resolve(u);
                return o(E, function(t) {
                    (t.request || t.requestError) && c.unshift(t.request, t.requestError), (t.response || t.responseError) && d.push(t.response, t.responseError);
                }), (m = n(m = (m = n(m, c)).then(function(e) {
                    var n = e.headers, r = je(e.data, Ve(n), void 0, e.transformRequest);
                    return y(r) && o(n, function(t, e) {
                        "content-type" === Dr(e) && delete n[e];
                    }), y(e.withCredentials) && !y(t.withCredentials) && (e.withCredentials = t.withCredentials), 
                    $(e, r).then(s, s);
                }), d)).finally(function() {
                    i.$$completeOutstandingRequest(v);
                });
            }
            function $(n, r) {
                function i(t) {
                    if (t) {
                        var n = {};
                        return o(t, function(t, r) {
                            n[r] = function(n) {
                                function r() {
                                    t(n);
                                }
                                e ? c.$applyAsync(r) : c.$$phase ? r() : c.$apply(r);
                            };
                        }), n;
                    }
                }
                function u(t, e, r, i, o) {
                    (Ie(e = -1 <= e ? e : 0) ? E.resolve : E.reject)({
                        data: t,
                        status: e,
                        headers: Ve(r),
                        config: n,
                        statusText: i,
                        xhrStatus: o
                    });
                }
                function f(t) {
                    u(t.data, t.status, bt(t.headers()), t.statusText, t.xhrStatus);
                }
                function h() {
                    var t = d.pendingRequests.indexOf(n);
                    -1 !== t && d.pendingRequests.splice(t, 1);
                }
                var v, $, E = l.defer(), C = E.promise, _ = n.headers, k = "jsonp" === Dr(n.method), O = n.url;
                if (k ? O = p.getTrustedResourceUrl(O) : x(O) || (O = p.valueOf(O)), O = function(t, e) {
                    return 0 < e.length && (t += (-1 === t.indexOf("?") ? "?" : "&") + e), t;
                }(O, n.paramSerializer(n.params)), k && (O = function(t, e) {
                    if (/[&?][^=]+=JSON_CALLBACK/.test(t)) throw so("badjsonp", 'Illegal use of JSON_CALLBACK in url, "{0}"', t);
                    if (new RegExp("[&?]" + e + "=").test(t)) throw so("badjsonp", 'Illegal use of callback param, "{0}", in url, "{1}"', e, t);
                    return t += (-1 === t.indexOf("?") ? "?" : "&") + e + "=JSON_CALLBACK";
                }(O, n.jsonpCallbackParam)), d.pendingRequests.push(n), C.then(h, h), !n.cache && !t.cache || !1 === n.cache || "GET" !== n.method && "JSONP" !== n.method || (v = b(n.cache) ? n.cache : b(t.cache) ? t.cache : S), 
                v && (w($ = v.get(O)) ? I($) ? $.then(f, f) : Xr($) ? u($[1], $[0], bt($[2]), $[3], $[4]) : u($, 200, {}, "OK", "complete") : v.put(O, C)), 
                y($)) {
                    var R = qn(n.url) ? s()[n.xsrfCookieName || t.xsrfCookieName] : void 0;
                    R && (_[n.xsrfHeaderName || t.xsrfHeaderName] = R), a(n.method, O, r, function(t, n, r, i, o) {
                        function a() {
                            u(n, t, r, i, o);
                        }
                        v && (Ie(t) ? v.put(O, [ t, n, Pe(r), i, o ]) : v.remove(O)), e ? c.$applyAsync(a) : (a(), 
                        c.$$phase || c.$apply());
                    }, _, n.timeout, n.withCredentials, n.responseType, i(n.eventHandlers), i(n.uploadEventHandlers));
                }
                return C;
            }
            var S = u("$http");
            t.paramSerializer = x(t.paramSerializer) ? h.get(t.paramSerializer) : t.paramSerializer;
            var E = [];
            return o(n, function(t) {
                E.unshift(x(t) ? h.get(t) : h.invoke(t));
            }), d.pendingRequests = [], function(t) {
                o(arguments, function(t) {
                    d[t] = function(e, n) {
                        return d(f({}, n || {}, {
                            method: t,
                            url: e
                        }));
                    };
                });
            }("get", "delete", "head", "jsonp"), function(t) {
                o(arguments, function(t) {
                    d[t] = function(e, n, r) {
                        return d(f({}, r || {}, {
                            method: t,
                            url: e,
                            data: n
                        }));
                    };
                });
            }("post", "put", "patch"), d.defaults = t, d;
        } ];
    }
    function Ne() {
        this.$get = function() {
            return function() {
                return new t.XMLHttpRequest();
            };
        };
    }
    function De() {
        this.$get = [ "$browser", "$jsonpCallbacks", "$document", "$xhrFactory", function(t, e, n, r) {
            return function(t, e, n, r, i) {
                function a(t, e, n) {
                    t = t.replace("JSON_CALLBACK", e);
                    var o = i.createElement("script"), a = null;
                    return o.type = "text/javascript", o.src = t, o.async = !0, a = function(t) {
                        o.removeEventListener("load", a), o.removeEventListener("error", a), i.body.removeChild(o), 
                        o = null;
                        var s = -1, u = "unknown";
                        t && ("load" !== t.type || r.wasCalled(e) || (t = {
                            type: "error"
                        }), u = t.type, s = "error" === t.type ? 404 : 200), n && n(s, u);
                    }, o.addEventListener("load", a), o.addEventListener("error", a), i.body.appendChild(o), 
                    a;
                }
                return function(i, s, u, c, l, f, h, p, d, v) {
                    function $() {
                        b && b(), S && S.abort();
                    }
                    function m(t, e, r, i, o, a) {
                        w(x) && n.cancel(x), b = S = null, t(e, r, i, o, a);
                    }
                    if (s = s || t.url(), "jsonp" === Dr(i)) var g = r.createCallback(s), b = a(s, g, function(t, e) {
                        var n = 200 === t && r.getResponse(g);
                        m(c, t, n, "", e, "complete"), r.removeCallback(g);
                    }); else {
                        var S = e(i, s);
                        if (S.open(i, s, !0), o(l, function(t, e) {
                            w(t) && S.setRequestHeader(e, t);
                        }), S.onload = function() {
                            var t = S.statusText || "", e = "response" in S ? S.response : S.responseText, n = 1223 === S.status ? 204 : S.status;
                            0 === n && (n = e ? 200 : "file" === Ln(s).protocol ? 404 : 0), m(c, n, e, S.getAllResponseHeaders(), t, "complete");
                        }, S.onerror = function() {
                            m(c, -1, null, null, "", "error");
                        }, S.onabort = function() {
                            m(c, -1, null, null, "", "abort");
                        }, S.ontimeout = function() {
                            m(c, -1, null, null, "", "timeout");
                        }, o(d, function(t, e) {
                            S.addEventListener(e, t);
                        }), o(v, function(t, e) {
                            S.upload.addEventListener(e, t);
                        }), h && (S.withCredentials = !0), p) try {
                            S.responseType = p;
                        } catch (t) {
                            if ("json" !== p) throw t;
                        }
                        S.send(y(u) ? null : u);
                    }
                    if (0 < f) var x = n($, f); else I(f) && f.then($);
                };
            }(t, r, t.defer, e, n[0]);
        } ];
    }
    function qe() {
        var t = "{{", e = "}}";
        this.startSymbol = function(e) {
            return e ? (t = e, this) : t;
        }, this.endSymbol = function(t) {
            return t ? (e = t, this) : e;
        }, this.$get = [ "$parse", "$exceptionHandler", "$sce", function(n, r, i) {
            function o(t) {
                return "\\\\\\" + t;
            }
            function a(n) {
                return n.replace(h, t).replace(p, e);
            }
            function s(t, e, n, r) {
                var i = t.$watch(function(t) {
                    return i(), r(t);
                }, e, n);
                return i;
            }
            function u(o, u, h, p) {
                var d;
                if (!o.length || -1 === o.indexOf(t)) return u || ((d = m(a(o))).exp = o, d.expressions = [], 
                d.$$watchDelegate = s), d;
                p = !!p;
                for (var v, $, g, b = 0, S = [], x = [], E = o.length, C = [], _ = []; b < E; ) {
                    if (-1 === (v = o.indexOf(t, b)) || -1 === ($ = o.indexOf(e, v + c))) {
                        b !== E && C.push(a(o.substring(b)));
                        break;
                    }
                    b !== v && C.push(a(o.substring(b, v))), g = o.substring(v + c, $), S.push(g), x.push(n(g, function(t) {
                        try {
                            return t = R(t), p && !w(t) ? t : yt(t);
                        } catch (t) {
                            r(uo.interr(o, t));
                        }
                    })), b = $ + l, _.push(C.length), C.push("");
                }
                if (h && 1 < C.length && uo.throwNoconcat(o), !u || S.length) {
                    var O = function(t) {
                        for (var e = 0, n = S.length; e < n; e++) {
                            if (p && y(t[e])) return;
                            C[_[e]] = t[e];
                        }
                        return C.join("");
                    }, R = function(t) {
                        return h ? i.getTrusted(h, t) : i.valueOf(t);
                    };
                    return f(function(t) {
                        var e = 0, n = S.length, i = new Array(n);
                        try {
                            for (;e < n; e++) i[e] = x[e](t);
                            return O(i);
                        } catch (t) {
                            r(uo.interr(o, t));
                        }
                    }, {
                        exp: o,
                        expressions: S,
                        $$watchDelegate: function(t, e) {
                            var n;
                            return t.$watchGroup(x, function(r, i) {
                                var o = O(r);
                                k(e) && e.call(this, o, r !== i ? n : o, t), n = o;
                            });
                        }
                    });
                }
            }
            var c = t.length, l = e.length, h = new RegExp(t.replace(/./g, o), "g"), p = new RegExp(e.replace(/./g, o), "g");
            return u.startSymbol = function() {
                return t;
            }, u.endSymbol = function() {
                return e;
            }, u;
        } ];
    }
    function Ue() {
        this.$get = [ "$rootScope", "$window", "$q", "$$q", "$browser", function(t, e, n, r, i) {
            function o(o, s, u, c) {
                function l() {
                    f ? o.apply(null, h) : o(v);
                }
                var f = 4 < arguments.length, h = f ? G(arguments, 4) : [], p = e.setInterval, d = e.clearInterval, v = 0, $ = w(c) && !c, m = ($ ? r : n).defer(), g = m.promise;
                return u = w(u) ? u : 0, g.$$intervalId = p(function() {
                    $ ? i.defer(l) : t.$evalAsync(l), m.notify(v++), 0 < u && u <= v && (m.resolve(v), 
                    d(g.$$intervalId), delete a[g.$$intervalId]), $ || t.$apply();
                }, s), a[g.$$intervalId] = m, g;
            }
            var a = {};
            return o.cancel = function(t) {
                return !!(t && t.$$intervalId in a) && (_n(a[t.$$intervalId].promise), a[t.$$intervalId].reject("canceled"), 
                e.clearInterval(t.$$intervalId), delete a[t.$$intervalId], !0);
            }, o;
        } ];
    }
    function He(t) {
        for (var e = t.split("/"), n = e.length; n--; ) e[n] = ot(e[n]);
        return e.join("/");
    }
    function Fe(t, e) {
        var n = Ln(t);
        e.$$protocol = n.protocol, e.$$host = n.hostname, e.$$port = p(n.port) || fo[n.protocol] || null;
    }
    function Be(t, e) {
        if (po.test(t)) throw ho("badpath", 'Invalid url "{0}".', t);
        var n = "/" !== t.charAt(0);
        n && (t = "/" + t);
        var r = Ln(t);
        e.$$path = decodeURIComponent(n && "/" === r.pathname.charAt(0) ? r.pathname.substring(1) : r.pathname), 
        e.$$search = rt(r.search), e.$$hash = decodeURIComponent(r.hash), e.$$path && "/" !== e.$$path.charAt(0) && (e.$$path = "/" + e.$$path);
    }
    function ze(t, e) {
        return t.slice(0, e.length) === e;
    }
    function We(t, e) {
        if (ze(e, t)) return e.substr(t.length);
    }
    function Ge(t) {
        var e = t.indexOf("#");
        return -1 === e ? t : t.substr(0, e);
    }
    function Je(t) {
        return t.replace(/(#.+)|#$/, "$1");
    }
    function Ze(t, e, n) {
        this.$$html5 = !0, n = n || "", Fe(t, this), this.$$parse = function(t) {
            var n = We(e, t);
            if (!x(n)) throw ho("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', t, e);
            Be(n, this), this.$$path || (this.$$path = "/"), this.$$compose();
        }, this.$$compose = function() {
            var t = it(this.$$search), n = this.$$hash ? "#" + ot(this.$$hash) : "";
            this.$$url = He(this.$$path) + (t ? "?" + t : "") + n, this.$$absUrl = e + this.$$url.substr(1), 
            this.$$urlUpdatedByLocation = !0;
        }, this.$$parseLinkUrl = function(r, i) {
            return i && "#" === i[0] ? (this.hash(i.slice(1)), !0) : (w(o = We(t, r)) ? (a = o, 
            s = n && w(o = We(n, o)) ? e + (We("/", o) || o) : t + a) : w(o = We(e, r)) ? s = e + o : e === r + "/" && (s = e), 
            s && this.$$parse(s), !!s);
            var o, a, s;
        };
    }
    function Qe(t, e, n) {
        Fe(t, this), this.$$parse = function(r) {
            var i, o = We(t, r) || We(e, r);
            y(o) || "#" !== o.charAt(0) ? this.$$html5 ? i = o : (i = "", y(o) && (t = r, this.replace())) : y(i = We(n, o)) && (i = o), 
            Be(i, this), this.$$path = function(t, e, n) {
                var r, i = /^\/[A-Z]:(\/.*)/;
                return ze(e, n) && (e = e.replace(n, "")), i.exec(e) ? t : (r = i.exec(t)) ? r[1] : t;
            }(this.$$path, i, t), this.$$compose();
        }, this.$$compose = function() {
            var e = it(this.$$search), r = this.$$hash ? "#" + ot(this.$$hash) : "";
            this.$$url = He(this.$$path) + (e ? "?" + e : "") + r, this.$$absUrl = t + (this.$$url ? n + this.$$url : ""), 
            this.$$urlUpdatedByLocation = !0;
        }, this.$$parseLinkUrl = function(e, n) {
            return Ge(t) === Ge(e) && (this.$$parse(e), !0);
        };
    }
    function Xe(t, e, n) {
        this.$$html5 = !0, Qe.apply(this, arguments), this.$$parseLinkUrl = function(r, i) {
            return i && "#" === i[0] ? (this.hash(i.slice(1)), !0) : (t === Ge(r) ? o = r : (a = We(e, r)) ? o = t + n + a : e === r + "/" && (o = e), 
            o && this.$$parse(o), !!o);
            var o, a;
        }, this.$$compose = function() {
            var e = it(this.$$search), r = this.$$hash ? "#" + ot(this.$$hash) : "";
            this.$$url = He(this.$$path) + (e ? "?" + e : "") + r, this.$$absUrl = t + n + this.$$url, 
            this.$$urlUpdatedByLocation = !0;
        };
    }
    function tn(t) {
        return function() {
            return this[t];
        };
    }
    function en(t, e) {
        return function(n) {
            return y(n) ? this[t] : (this[t] = e(n), this.$$compose(), this);
        };
    }
    function nn() {
        var t = "!", e = {
            enabled: !1,
            requireBase: !0,
            rewriteLinks: !0
        };
        this.hashPrefix = function(e) {
            return w(e) ? (t = e, this) : t;
        }, this.html5Mode = function(t) {
            return j(t) ? (e.enabled = t, this) : b(t) ? (j(t.enabled) && (e.enabled = t.enabled), 
            j(t.requireBase) && (e.requireBase = t.requireBase), (j(t.rewriteLinks) || x(t.rewriteLinks)) && (e.rewriteLinks = t.rewriteLinks), 
            this) : e;
        }, this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function(n, r, i, o, a) {
            function s(t, e, n) {
                var i = c.url(), o = c.$$state;
                try {
                    r.url(t, e, n), c.$$state = r.state();
                } catch (t) {
                    throw c.url(i), c.$$state = o, t;
                }
            }
            function u(t, e) {
                n.$broadcast("$locationChangeSuccess", c.absUrl(), t, c.$$state, e);
            }
            var c, l, f, h = r.baseHref(), p = r.url();
            if (e.enabled) {
                if (!h && e.requireBase) throw ho("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                f = function(t) {
                    return t.substring(0, t.indexOf("/", t.indexOf("//") + 2));
                }(p) + (h || "/"), l = i.history ? Ze : Xe;
            } else f = Ge(p), l = Qe;
            var d = function(t) {
                return t.substr(0, Ge(t).lastIndexOf("/") + 1);
            }(f);
            (c = new l(f, d, "#" + t)).$$parseLinkUrl(p, p), c.$$state = r.state();
            var v = /^\s*(javascript|mailto):/i;
            o.on("click", function(t) {
                var i = e.rewriteLinks;
                if (i && !t.ctrlKey && !t.metaKey && !t.shiftKey && 2 !== t.which && 2 !== t.button) {
                    for (var s = Ur(t.target); "a" !== q(s[0]); ) if (s[0] === o[0] || !(s = s.parent())[0]) return;
                    if (!x(i) || !y(s.attr(i))) {
                        var u = s.prop("href"), l = s.attr("href") || s.attr("xlink:href");
                        b(u) && "[object SVGAnimatedString]" === u.toString() && (u = Ln(u.animVal).href), 
                        v.test(u) || !u || s.attr("target") || t.isDefaultPrevented() || c.$$parseLinkUrl(u, l) && (t.preventDefault(), 
                        c.absUrl() !== r.url() && (n.$apply(), a.angular["ff-684208-preventDefault"] = !0));
                    }
                }
            }), Je(c.absUrl()) !== Je(p) && r.url(c.absUrl(), !0);
            var $ = !0;
            return r.onUrlChange(function(t, e) {
                ze(t, d) ? (n.$evalAsync(function() {
                    var r, i = c.absUrl(), o = c.$$state;
                    t = Je(t), c.$$parse(t), c.$$state = e, r = n.$broadcast("$locationChangeStart", t, i, e, o).defaultPrevented, 
                    c.absUrl() === t && (r ? (c.$$parse(i), s(i, !1, c.$$state = o)) : ($ = !1, u(i, o)));
                }), n.$$phase || n.$digest()) : a.location.href = t;
            }), n.$watch(function() {
                if ($ || c.$$urlUpdatedByLocation) {
                    c.$$urlUpdatedByLocation = !1;
                    var t = Je(r.url()), e = Je(c.absUrl()), o = r.state(), a = c.$$replace, l = t !== e || c.$$html5 && i.history && o !== c.$$state;
                    ($ || l) && ($ = !1, n.$evalAsync(function() {
                        var e = c.absUrl(), r = n.$broadcast("$locationChangeStart", e, t, c.$$state, o).defaultPrevented;
                        c.absUrl() === e && (r ? (c.$$parse(t), c.$$state = o) : (l && s(e, a, o === c.$$state ? null : c.$$state), 
                        u(t, o)));
                    }));
                }
                c.$$replace = !1;
            }), c;
        } ];
    }
    function rn() {
        var t = !0, e = this;
        this.debugEnabled = function(e) {
            return w(e) ? (t = e, this) : t;
        }, this.$get = [ "$window", function(n) {
            function i(t) {
                var e = n.console || {}, i = e[t] || e.log || v;
                return function() {
                    var t = [];
                    return o(arguments, function(e) {
                        t.push(function(t) {
                            return _(t) && (t.stack && a ? t = t.message && -1 === t.stack.indexOf(t.message) ? "Error: " + t.message + "\n" + t.stack : t.stack : t.sourceURL && (t = t.message + "\n" + t.sourceURL + ":" + t.line)), 
                            t;
                        }(e));
                    }), Function.prototype.apply.call(i, e, t);
                };
            }
            var a = qr || /\bEdge\//.test(n.navigator && n.navigator.userAgent);
            return {
                log: i("log"),
                info: i("info"),
                warn: i("warn"),
                error: i("error"),
                debug: function() {
                    var n = i("debug");
                    return function() {
                        t && n.apply(e, arguments);
                    };
                }()
            };
        } ];
    }
    function on(t) {
        return t + "";
    }
    function an(t, e) {
        return void 0 !== t ? t : e;
    }
    function sn(t, e) {
        return void 0 === t ? e : void 0 === e ? t : t + e;
    }
    function ln(t, e, n) {
        var r, i, a, s = t.isPure = function(t, e) {
            switch (t.type) {
              case bo.MemberExpression:
                if (t.computed) return !1;
                break;

              case bo.UnaryExpression:
                return So;

              case bo.BinaryExpression:
                return "+" !== t.operator && So;

              case bo.CallExpression:
                return !1;
            }
            return void 0 === e ? xo : e;
        }(t, n);
        switch (t.type) {
          case bo.Program:
            r = !0, o(t.body, function(t) {
                ln(t.expression, e, s), r = r && t.expression.constant;
            }), t.constant = r;
            break;

          case bo.Literal:
            t.constant = !0, t.toWatch = [];
            break;

          case bo.UnaryExpression:
            ln(t.argument, e, s), t.constant = t.argument.constant, t.toWatch = t.argument.toWatch;
            break;

          case bo.BinaryExpression:
            ln(t.left, e, s), ln(t.right, e, s), t.constant = t.left.constant && t.right.constant, 
            t.toWatch = t.left.toWatch.concat(t.right.toWatch);
            break;

          case bo.LogicalExpression:
            ln(t.left, e, s), ln(t.right, e, s), t.constant = t.left.constant && t.right.constant, 
            t.toWatch = t.constant ? [] : [ t ];
            break;

          case bo.ConditionalExpression:
            ln(t.test, e, s), ln(t.alternate, e, s), ln(t.consequent, e, s), t.constant = t.test.constant && t.alternate.constant && t.consequent.constant, 
            t.toWatch = t.constant ? [] : [ t ];
            break;

          case bo.Identifier:
            t.constant = !1, t.toWatch = [ t ];
            break;

          case bo.MemberExpression:
            ln(t.object, e, s), t.computed && ln(t.property, e, s), t.constant = t.object.constant && (!t.computed || t.property.constant), 
            t.toWatch = t.constant ? [] : [ t ];
            break;

          case bo.CallExpression:
            a = !!t.filter && function(t, e) {
                return !t(e).$stateful;
            }(e, t.callee.name), r = a, i = [], o(t.arguments, function(t) {
                ln(t, e, s), r = r && t.constant, i.push.apply(i, t.toWatch);
            }), t.constant = r, t.toWatch = a ? i : [ t ];
            break;

          case bo.AssignmentExpression:
            ln(t.left, e, s), ln(t.right, e, s), t.constant = t.left.constant && t.right.constant, 
            t.toWatch = [ t ];
            break;

          case bo.ArrayExpression:
            r = !0, i = [], o(t.elements, function(t) {
                ln(t, e, s), r = r && t.constant, i.push.apply(i, t.toWatch);
            }), t.constant = r, t.toWatch = i;
            break;

          case bo.ObjectExpression:
            r = !0, i = [], o(t.properties, function(t) {
                ln(t.value, e, s), r = r && t.value.constant, i.push.apply(i, t.value.toWatch), 
                t.computed && (ln(t.key, e, !1), r = r && t.key.constant, i.push.apply(i, t.key.toWatch));
            }), t.constant = r, t.toWatch = i;
            break;

          case bo.ThisExpression:
          case bo.LocalsExpression:
            t.constant = !1, t.toWatch = [];
        }
    }
    function fn(t) {
        if (1 === t.length) {
            var e = t[0].expression, n = e.toWatch;
            return 1 !== n.length ? n : n[0] !== e ? n : void 0;
        }
    }
    function hn(t) {
        return t.type === bo.Identifier || t.type === bo.MemberExpression;
    }
    function pn(t) {
        if (1 === t.body.length && hn(t.body[0].expression)) return {
            type: bo.AssignmentExpression,
            left: t.body[0].expression,
            right: {
                type: bo.NGValueParameter
            },
            operator: "="
        };
    }
    function $n(t) {
        this.$filter = t;
    }
    function mn(t) {
        this.$filter = t;
    }
    function gn(t, e, n) {
        this.ast = new bo(t, n), this.astCompiler = n.csp ? new mn(e) : new $n(e);
    }
    function yn(t) {
        return k(t.valueOf) ? t.valueOf() : mo.call(t);
    }
    function wn() {
        var t, e, n = gt(), r = {
            true: !0,
            false: !1,
            null: null,
            undefined: void 0
        };
        this.addLiteral = function(t, e) {
            r[t] = e;
        }, this.setIdentifierFns = function(n, r) {
            return t = n, e = r, this;
        }, this.$get = [ "$filter", function(i) {
            function a(t, e, n) {
                return null == t || null == e ? t === e : !("object" == typeof t && "object" == typeof (t = yn(t)) && !n) && (t === e || t != t && e != e);
            }
            function s(t, e, n, r, i) {
                var o, s = r.inputs;
                if (1 === s.length) {
                    var u = a;
                    return s = s[0], t.$watch(function(t) {
                        var e = s(t);
                        return a(e, u, s.isPure) || (o = r(t, void 0, void 0, [ e ]), u = e && yn(e)), o;
                    }, e, n, i);
                }
                for (var c = [], l = [], f = 0, h = s.length; f < h; f++) c[f] = a, l[f] = null;
                return t.$watch(function(t) {
                    for (var e = !1, n = 0, i = s.length; n < i; n++) {
                        var u = s[n](t);
                        (e || (e = !a(u, c[n], s[n].isPure))) && (l[n] = u, c[n] = u && yn(u));
                    }
                    return e && (o = r(t, void 0, void 0, l)), o;
                }, e, n, i);
            }
            function u(t, e, n, r, i) {
                function o(t, n, r) {
                    u = t, k(e) && e(t, n, r), w(t) && r.$$postDigest(function() {
                        w(u) && a();
                    });
                }
                var a, u;
                return a = r.inputs ? s(t, o, n, r, i) : t.$watch(function(t) {
                    return r(t);
                }, o, n);
            }
            function c(t, e, n, r) {
                function i(t) {
                    var e = !0;
                    return o(t, function(t) {
                        w(t) || (e = !1);
                    }), e;
                }
                var a, s;
                return a = t.$watch(function(t) {
                    return r(t);
                }, function(t, n, r) {
                    s = t, k(e) && e(t, n, r), i(t) && r.$$postDigest(function() {
                        i(s) && a();
                    });
                }, n);
            }
            function l(t, e, n, r) {
                var i = t.$watch(function(t) {
                    return i(), r(t);
                }, e, n);
                return i;
            }
            function f(t, e) {
                if (!e) return t;
                var n = t.$$watchDelegate, r = !1, i = n !== c && n !== u ? function(n, i, o, a) {
                    var s = r && a ? a[0] : t(n, i, o, a);
                    return e(s, n, i);
                } : function(n, r, i, o) {
                    var a = t(n, r, i, o), s = e(a, n, r);
                    return w(a) ? s : a;
                };
                return r = !t.inputs, n && n !== s ? (i.$$watchDelegate = n, i.inputs = t.inputs) : e.$stateful || (i.$$watchDelegate = s, 
                i.inputs = t.inputs ? t.inputs : [ t ]), i.inputs && (i.inputs = i.inputs.map(function(t) {
                    return t.isPure === xo ? function(e) {
                        return t(e);
                    } : t;
                })), i;
            }
            var h = {
                csp: ri().noUnsafeEval,
                literals: F(r),
                isIdentifierStart: k(t) && t,
                isIdentifierContinue: k(e) && e
            };
            return function(t, e) {
                var r, o, a;
                switch (typeof t) {
                  case "string":
                    return t = t.trim(), (r = n[a = t]) || (":" === t.charAt(0) && ":" === t.charAt(1) && (o = !0, 
                    t = t.substring(2)), (r = new gn(new wo(h), i, h).parse(t)).constant ? r.$$watchDelegate = l : o ? r.$$watchDelegate = r.literal ? c : u : r.inputs && (r.$$watchDelegate = s), 
                    n[a] = r), f(r, e);

                  case "function":
                    return f(t, e);

                  default:
                    return f(v, e);
                }
            };
        } ];
    }
    function bn() {
        var t = !0;
        this.$get = [ "$rootScope", "$exceptionHandler", function(e, n) {
            return xn(function(t) {
                e.$evalAsync(t);
            }, n, t);
        } ], this.errorOnUnhandledRejections = function(e) {
            return w(e) ? (t = e, this) : t;
        };
    }
    function Sn() {
        var t = !0;
        this.$get = [ "$browser", "$exceptionHandler", function(e, n) {
            return xn(function(t) {
                e.defer(t);
            }, n, t);
        } ], this.errorOnUnhandledRejections = function(e) {
            return w(e) ? (t = e, this) : t;
        };
    }
    function xn(t, e, n) {
        function i() {
            return new a();
        }
        function a() {
            var t = this.promise = new s();
            this.resolve = function(e) {
                h(t, e);
            }, this.reject = function(e) {
                d(t, e);
            }, this.notify = function(e) {
                $(t, e);
            };
        }
        function s() {
            this.$$state = {
                status: 0
            };
        }
        function c() {
            for (;!E && C.length; ) {
                var t = C.shift();
                if (!En(t)) {
                    Cn(t);
                    var n = "Possibly unhandled rejection: " + xt(t.value);
                    _(t.value) ? e(t.value, n) : e(n);
                }
            }
        }
        function l(e) {
            !n || e.pending || 2 !== e.status || En(e) || (0 === E && 0 === C.length && t(c), 
            C.push(e)), !e.processScheduled && e.pending && (e.processScheduled = !0, ++E, t(function() {
                !function(e) {
                    var r, i, o;
                    o = e.pending, e.processScheduled = !1, e.pending = void 0;
                    try {
                        for (var a = 0, s = o.length; a < s; ++a) {
                            Cn(e), i = o[a][0], r = o[a][e.status];
                            try {
                                k(r) ? h(i, r(e.value)) : 1 === e.status ? h(i, e.value) : d(i, e.value);
                            } catch (t) {
                                d(i, t);
                            }
                        }
                    } finally {
                        --E, n && 0 === E && t(c);
                    }
                }(e);
            }));
        }
        function h(t, e) {
            t.$$state.status || (e === t ? v(t, x("qcycle", "Expected promise to be resolved with value other than itself '{0}'", e)) : function p(t, e) {
                function n(e) {
                    i || (i = !0, v(t, e));
                }
                var r, i = !1;
                try {
                    (b(e) || k(e)) && (r = e.then), k(r) ? (t.$$state.status = -1, r.call(e, function(e) {
                        i || (i = !0, p(t, e));
                    }, n, function(e) {
                        $(t, e);
                    })) : (t.$$state.value = e, t.$$state.status = 1, l(t.$$state));
                } catch (t) {
                    n(t);
                }
            }(t, e));
        }
        function d(t, e) {
            t.$$state.status || v(t, e);
        }
        function v(t, e) {
            t.$$state.value = e, t.$$state.status = 2, l(t.$$state);
        }
        function $(n, r) {
            var i = n.$$state.pending;
            n.$$state.status <= 0 && i && i.length && t(function() {
                for (var t, n, o = 0, a = i.length; o < a; o++) {
                    n = i[o][0], t = i[o][3];
                    try {
                        $(n, k(t) ? t(r) : r);
                    } catch (t) {
                        e(t);
                    }
                }
            });
        }
        function m(t) {
            var e = new s();
            return d(e, t), e;
        }
        function g(t, e, n) {
            var r = null;
            try {
                k(n) && (r = n());
            } catch (t) {
                return m(t);
            }
            return I(r) ? r.then(function() {
                return e(t);
            }, m) : e(t);
        }
        function w(t, e, n, r) {
            var i = new s();
            return h(i, t), i.then(e, n, r);
        }
        function S(t) {
            if (!k(t)) throw x("norslvr", "Expected resolverFn, got '{0}'", t);
            var e = new s();
            return t(function(t) {
                h(e, t);
            }, function(t) {
                d(e, t);
            }), e;
        }
        var x = r("$q", TypeError), E = 0, C = [];
        f(s.prototype, {
            then: function(t, e, n) {
                if (y(t) && y(e) && y(n)) return this;
                var r = new s();
                return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([ r, t, e, n ]), 
                0 < this.$$state.status && l(this.$$state), r;
            },
            catch: function(t) {
                return this.then(null, t);
            },
            finally: function(t, e) {
                return this.then(function(e) {
                    return g(e, O, t);
                }, function(e) {
                    return g(e, m, t);
                }, e);
            }
        });
        var O = w;
        return S.prototype = s.prototype, S.defer = i, S.reject = m, S.when = w, S.resolve = O, 
        S.all = function(t) {
            var e = new s(), n = 0, r = Xr(t) ? [] : {};
            return o(t, function(t, i) {
                n++, w(t).then(function(t) {
                    r[i] = t, --n || h(e, r);
                }, function(t) {
                    d(e, t);
                });
            }), 0 === n && h(e, r), e;
        }, S.race = function(t) {
            var e = i();
            return o(t, function(t) {
                w(t).then(e.resolve, e.reject);
            }), e.promise;
        }, S;
    }
    function En(t) {
        return !!t.pur;
    }
    function Cn(t) {
        t.pur = !0;
    }
    function _n(t) {
        Cn(t.$$state);
    }
    function kn() {
        this.$get = [ "$window", "$timeout", function(t, e) {
            var n = t.requestAnimationFrame || t.webkitRequestAnimationFrame, r = t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.webkitCancelRequestAnimationFrame, i = !!n, o = i ? function(t) {
                var e = n(t);
                return function() {
                    r(e);
                };
            } : function(t) {
                var n = e(t, 16.66, !1);
                return function() {
                    e.cancel(n);
                };
            };
            return o.supported = i, o;
        } ];
    }
    function On() {
        var e = 10, n = r("$rootScope"), a = null, s = null;
        this.digestTtl = function(t) {
            return arguments.length && (e = t), e;
        }, this.$get = [ "$exceptionHandler", "$parse", "$browser", function(r, c, l) {
            function f(t) {
                t.currentScope.$$destroyed = !0;
            }
            function p() {
                this.$id = u(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, 
                (this.$root = this).$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, 
                this.$$watchersCount = 0, this.$$isolateBindings = null;
            }
            function d(t) {
                if (E.$$phase) throw n("inprog", "{0} already in progress", E.$$phase);
                E.$$phase = t;
            }
            function $() {
                E.$$phase = null;
            }
            function m(t, e) {
                for (;t.$$watchersCount += e, t = t.$parent; ) ;
            }
            function g(t, e, n) {
                for (;t.$$listenerCount[n] -= e, 0 === t.$$listenerCount[n] && delete t.$$listenerCount[n], 
                t = t.$parent; ) ;
            }
            function w() {}
            function S() {
                for (;O.length; ) try {
                    O.shift()();
                } catch (t) {
                    r(t);
                }
                s = null;
            }
            p.prototype = {
                constructor: p,
                $new: function(e, n) {
                    var r;
                    return n = n || this, e ? (r = new p()).$root = this.$root : (this.$$ChildScope || (this.$$ChildScope = function(t) {
                        function e() {
                            this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, 
                            this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = u(), 
                            this.$$ChildScope = null;
                        }
                        return e.prototype = t, e;
                    }(this)), r = new this.$$ChildScope()), r.$parent = n, r.$$prevSibling = n.$$childTail, 
                    n.$$childHead ? (n.$$childTail.$$nextSibling = r, n.$$childTail = r) : n.$$childHead = n.$$childTail = r, 
                    (e || n !== this) && r.$on("$destroy", f), r;
                },
                $watch: function(t, e, n, r) {
                    var i = c(t);
                    if (i.$$watchDelegate) return i.$$watchDelegate(this, e, n, i, t);
                    var o = this, s = o.$$watchers, u = {
                        fn: e,
                        last: w,
                        get: i,
                        exp: r || t,
                        eq: !!n
                    };
                    return a = null, k(e) || (u.fn = v), s || ((s = o.$$watchers = []).$$digestWatchIndex = -1), 
                    s.unshift(u), s.$$digestWatchIndex++, m(this, 1), function() {
                        var t = H(s, u);
                        0 <= t && (m(o, -1), t < s.$$digestWatchIndex && s.$$digestWatchIndex--), a = null;
                    };
                },
                $watchGroup: function(t, e) {
                    function n() {
                        u = !1, c ? (c = !1, e(i, i, s)) : e(i, r, s);
                    }
                    var r = new Array(t.length), i = new Array(t.length), a = [], s = this, u = !1, c = !0;
                    if (t.length) return 1 === t.length ? this.$watch(t[0], function(t, n, o) {
                        i[0] = t, r[0] = n, e(i, t === n ? i : r, o);
                    }) : (o(t, function(t, e) {
                        var o = s.$watch(t, function(t, o) {
                            i[e] = t, r[e] = o, u || (u = !0, s.$evalAsync(n));
                        });
                        a.push(o);
                    }), function() {
                        for (;a.length; ) a.shift()();
                    });
                    var l = !0;
                    return s.$evalAsync(function() {
                        l && e(i, i, s);
                    }), function() {
                        l = !1;
                    };
                },
                $watchCollection: function(t, e) {
                    function n(t) {
                        var e, n, a, s;
                        if (!y(r = t)) {
                            if (b(r)) if (i(r)) {
                                o !== h && (v = (o = h).length = 0, l++), e = r.length, v !== e && (l++, o.length = v = e);
                                for (var u = 0; u < e; u++) s = o[u], a = r[u], s != s && a != a || s === a || (l++, 
                                o[u] = a);
                            } else {
                                for (n in o !== p && (o = p = {}, v = 0, l++), e = 0, r) Nr.call(r, n) && (e++, 
                                a = r[n], s = o[n], n in o ? s != s && a != a || s === a || (l++, o[n] = a) : (v++, 
                                o[n] = a, l++));
                                if (e < v) for (n in l++, o) Nr.call(r, n) || (v--, delete o[n]);
                            } else o !== r && (o = r, l++);
                            return l;
                        }
                    }
                    n.$stateful = !0;
                    var r, o, a, s = this, u = 1 < e.length, l = 0, f = c(t, n), h = [], p = {}, d = !0, v = 0;
                    return this.$watch(f, function() {
                        if (d ? (d = !1, e(r, r, s)) : e(r, a, s), u) if (b(r)) if (i(r)) {
                            a = new Array(r.length);
                            for (var t = 0; t < r.length; t++) a[t] = r[t];
                        } else for (var n in a = {}, r) Nr.call(r, n) && (a[n] = r[n]); else a = r;
                    });
                },
                $digest: function() {
                    var t, i, o, c, f, h, p, v, m, g = e, y = this, b = [];
                    d("$digest"), l.$$checkUrlChange(), this === E && null !== s && (l.defer.cancel(s), 
                    S()), a = null;
                    do {
                        f = !1, p = y;
                        for (var x = 0; x < C.length; x++) {
                            try {
                                (0, (m = C[x]).fn)(m.scope, m.locals);
                            } catch (t) {
                                r(t);
                            }
                            a = null;
                        }
                        C.length = 0;
                        t: do {
                            if (c = p.$$watchers) for (c.$$digestWatchIndex = c.length; c.$$digestWatchIndex--; ) try {
                                if (t = c[c.$$digestWatchIndex]) if ((i = (0, t.get)(p)) === (o = t.last) || (t.eq ? z(i, o) : Qr(i) && Qr(o))) {
                                    if (t === a) {
                                        f = !1;
                                        break t;
                                    }
                                } else f = !0, (a = t).last = t.eq ? F(i, null) : i, (0, t.fn)(i, o === w ? i : o, p), 
                                g < 5 && (b[v = 4 - g] || (b[v] = []), b[v].push({
                                    msg: k(t.exp) ? "fn: " + (t.exp.name || t.exp.toString()) : t.exp,
                                    newVal: i,
                                    oldVal: o
                                }));
                            } catch (t) {
                                r(t);
                            }
                            if (!(h = p.$$watchersCount && p.$$childHead || p !== y && p.$$nextSibling)) for (;p !== y && !(h = p.$$nextSibling); ) p = p.$parent;
                        } while (p = h);
                        if ((f || C.length) && !g--) throw $(), n("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", e, b);
                    } while (f || C.length);
                    for ($(); R < _.length; ) try {
                        _[R++]();
                    } catch (t) {
                        r(t);
                    }
                    _.length = R = 0, l.$$checkUrlChange();
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var t = this.$parent;
                        for (var e in this.$broadcast("$destroy"), this.$$destroyed = !0, this === E && l.$$applicationDestroyed(), 
                        m(this, -this.$$watchersCount), this.$$listenerCount) g(this, this.$$listenerCount[e], e);
                        t && t.$$childHead === this && (t.$$childHead = this.$$nextSibling), t && t.$$childTail === this && (t.$$childTail = this.$$prevSibling), 
                        this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), 
                        this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = v, 
                        this.$on = this.$watch = this.$watchGroup = function() {
                            return v;
                        }, this.$$listeners = {}, this.$$nextSibling = null, function h(t) {
                            9 === qr && (t.$$childHead && h(t.$$childHead), t.$$nextSibling && h(t.$$nextSibling)), 
                            t.$parent = t.$$nextSibling = t.$$prevSibling = t.$$childHead = t.$$childTail = t.$root = t.$$watchers = null;
                        }(this);
                    }
                },
                $eval: function(t, e) {
                    return c(t)(this, e);
                },
                $evalAsync: function(t, e) {
                    E.$$phase || C.length || l.defer(function() {
                        C.length && E.$digest();
                    }), C.push({
                        scope: this,
                        fn: c(t),
                        locals: e
                    });
                },
                $$postDigest: function(t) {
                    _.push(t);
                },
                $apply: function(t) {
                    try {
                        d("$apply");
                        try {
                            return this.$eval(t);
                        } finally {
                            $();
                        }
                    } catch (t) {
                        r(t);
                    } finally {
                        try {
                            E.$digest();
                        } catch (t) {
                            throw r(t), t;
                        }
                    }
                },
                $applyAsync: function(t) {
                    var e = this;
                    t && O.push(function() {
                        e.$eval(t);
                    }), t = c(t), null === s && (s = l.defer(function() {
                        E.$apply(S);
                    }));
                },
                $on: function(t, e) {
                    var n = this.$$listeners[t];
                    n || (this.$$listeners[t] = n = []), n.push(e);
                    for (var r = this; r.$$listenerCount[t] || (r.$$listenerCount[t] = 0), r.$$listenerCount[t]++, 
                    r = r.$parent; ) ;
                    var i = this;
                    return function() {
                        var r = n.indexOf(e);
                        -1 !== r && (n[r] = null, g(i, 1, t));
                    };
                },
                $emit: function(t, e) {
                    var n, i, o, a = [], s = this, u = !1, c = {
                        name: t,
                        targetScope: s,
                        stopPropagation: function() {
                            u = !0;
                        },
                        preventDefault: function() {
                            c.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, l = W([ c ], arguments, 1);
                    do {
                        for (n = s.$$listeners[t] || a, c.currentScope = s, i = 0, o = n.length; i < o; i++) if (n[i]) try {
                            n[i].apply(null, l);
                        } catch (t) {
                            r(t);
                        } else n.splice(i, 1), i--, o--;
                        if (u) return c.currentScope = null, c;
                        s = s.$parent;
                    } while (s);
                    return c.currentScope = null, c;
                },
                $broadcast: function(t, e) {
                    var n = this, i = n, o = n, a = {
                        name: t,
                        targetScope: n,
                        preventDefault: function() {
                            a.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    };
                    if (!n.$$listenerCount[t]) return a;
                    for (var s, u, c, l = W([ a ], arguments, 1); i = o; ) {
                        for (u = 0, c = (s = (a.currentScope = i).$$listeners[t] || []).length; u < c; u++) if (s[u]) try {
                            s[u].apply(null, l);
                        } catch (t) {
                            r(t);
                        } else s.splice(u, 1), u--, c--;
                        if (!(o = i.$$listenerCount[t] && i.$$childHead || i !== n && i.$$nextSibling)) for (;i !== n && !(o = i.$$nextSibling); ) i = i.$parent;
                    }
                    return a.currentScope = null, a;
                }
            };
            var E = new p(), C = E.$$asyncQueue = [], _ = E.$$postDigestQueue = [], O = E.$$applyAsyncQueue = [], R = 0;
            return E;
        } ];
    }
    function Rn() {
        var t = /^\s*(https?|ftp|mailto|tel|file):/, e = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(e) {
            return w(e) ? (t = e, this) : t;
        }, this.imgSrcSanitizationWhitelist = function(t) {
            return w(t) ? (e = t, this) : e;
        }, this.$get = function() {
            return function(n, r) {
                var i, o = r ? e : t;
                return "" === (i = Ln(n).href) || i.match(o) ? n : "unsafe:" + i;
            };
        };
    }
    function Tn(t) {
        return t.replace(_o, _t);
    }
    function Pn(t) {
        var e = [];
        return w(t) && o(t, function(t) {
            e.push(function(t) {
                if ("self" === t) return t;
                if (x(t)) {
                    if (-1 < t.indexOf("***")) throw Eo("iwcard", "Illegal sequence *** in string matcher.  String: {0}", t);
                    return t = ni(t).replace(/\\\*\\\*/g, ".*").replace(/\\\*/g, "[^:/.?&;]*"), new RegExp("^" + t + "$");
                }
                if (O(t)) return new RegExp("^" + t.source + "$");
                throw Eo("imatcher", 'Matchers may only be "self", string patterns or RegExp objects');
            }(t));
        }), e;
    }
    function Vn() {
        this.SCE_CONTEXTS = Co;
        var t = [ "self" ], e = [];
        this.resourceUrlWhitelist = function(e) {
            return arguments.length && (t = Pn(e)), t;
        }, this.resourceUrlBlacklist = function(t) {
            return arguments.length && (e = Pn(t)), e;
        }, this.$get = [ "$injector", function(n) {
            function r(t, e) {
                return "self" === t ? qn(e) : !!t.exec(e.href);
            }
            function i(n) {
                var i, o, a = Ln(n.toString()), s = !1;
                for (i = 0, o = t.length; i < o; i++) if (r(t[i], a)) {
                    s = !0;
                    break;
                }
                if (s) for (i = 0, o = e.length; i < o; i++) if (r(e[i], a)) {
                    s = !1;
                    break;
                }
                return s;
            }
            function o(t) {
                var e = function(t) {
                    this.$$unwrapTrustedValue = function() {
                        return t;
                    };
                };
                return t && (e.prototype = new t()), e.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue();
                }, e.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString();
                }, e;
            }
            var a = function(t) {
                throw Eo("unsafe", "Attempting to use an unsafe value in a safe context.");
            };
            n.has("$sanitize") && (a = n.get("$sanitize"));
            var s = o(), u = {};
            return u[Co.HTML] = o(s), u[Co.CSS] = o(s), u[Co.URL] = o(s), u[Co.JS] = o(s), u[Co.RESOURCE_URL] = o(u[Co.URL]), 
            {
                trustAs: function(t, e) {
                    var n = u.hasOwnProperty(t) ? u[t] : null;
                    if (!n) throw Eo("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", t, e);
                    if (null === e || y(e) || "" === e) return e;
                    if ("string" != typeof e) throw Eo("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", t);
                    return new n(e);
                },
                getTrusted: function(t, e) {
                    if (null === e || y(e) || "" === e) return e;
                    var n = u.hasOwnProperty(t) ? u[t] : null;
                    if (n && e instanceof n) return e.$$unwrapTrustedValue();
                    if (t === Co.RESOURCE_URL) {
                        if (i(e)) return e;
                        throw Eo("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", e.toString());
                    }
                    if (t === Co.HTML) return a(e);
                    throw Eo("unsafe", "Attempting to use an unsafe value in a safe context.");
                },
                valueOf: function(t) {
                    return t instanceof s ? t.$$unwrapTrustedValue() : t;
                }
            };
        } ];
    }
    function jn() {
        var t = !0;
        this.enabled = function(e) {
            return arguments.length && (t = !!e), t;
        }, this.$get = [ "$parse", "$sceDelegate", function(e, n) {
            if (t && qr < 8) throw Eo("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            var r = bt(Co);
            r.isEnabled = function() {
                return t;
            }, r.trustAs = n.trustAs, r.getTrusted = n.getTrusted, r.valueOf = n.valueOf, t || (r.trustAs = r.getTrusted = function(t, e) {
                return e;
            }, r.valueOf = $), r.parseAs = function(t, n) {
                var i = e(n);
                return i.literal && i.constant ? i : e(n, function(e) {
                    return r.getTrusted(t, e);
                });
            };
            var i = r.parseAs, a = r.getTrusted, s = r.trustAs;
            return o(Co, function(t, e) {
                var n = Dr(e);
                r[Tn("parse_as_" + n)] = function(e) {
                    return i(t, e);
                }, r[Tn("get_trusted_" + n)] = function(e) {
                    return a(t, e);
                }, r[Tn("trust_as_" + n)] = function(e) {
                    return s(t, e);
                };
            }), r;
        } ];
    }
    function In() {
        this.$get = [ "$window", "$document", function(t, e) {
            var n = {}, r = !((!t.nw || !t.nw.process) && t.chrome && (t.chrome.app && t.chrome.app.runtime || !t.chrome.app && t.chrome.runtime && t.chrome.runtime.id)) && t.history && t.history.pushState, i = p((/android (\d+)/.exec(Dr((t.navigator || {}).userAgent)) || [])[1]), o = /Boxee/i.test((t.navigator || {}).userAgent), a = e[0] || {}, s = a.body && a.body.style, u = !1, c = !1;
            return s && (u = !!("transition" in s || "webkitTransition" in s), c = !!("animation" in s || "webkitAnimation" in s)), 
            {
                history: !(!r || i < 4 || o),
                hasEvent: function(t) {
                    if ("input" === t && qr) return !1;
                    if (y(n[t])) {
                        var e = a.createElement("div");
                        n[t] = "on" + t in e;
                    }
                    return n[t];
                },
                csp: ri(),
                transitions: u,
                animations: c,
                android: i
            };
        } ];
    }
    function Mn() {
        var t;
        this.httpOptions = function(e) {
            return e ? (t = e, this) : t;
        }, this.$get = [ "$exceptionHandler", "$templateCache", "$http", "$q", "$sce", function(e, n, r, i, o) {
            function a(s, u) {
                a.totalPendingRequests++, x(s) && !y(n.get(s)) || (s = o.getTrustedResourceUrl(s));
                var c = r.defaults && r.defaults.transformResponse;
                return Xr(c) ? c = c.filter(function(t) {
                    return t !== Te;
                }) : c === Te && (c = null), r.get(s, f({
                    cache: n,
                    transformResponse: c
                }, t)).finally(function() {
                    a.totalPendingRequests--;
                }).then(function(t) {
                    return n.put(s, t.data), t.data;
                }, function(t) {
                    return u || (t = ko("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", s, t.status, t.statusText), 
                    e(t)), i.reject(t);
                });
            }
            return a.totalPendingRequests = 0, a;
        } ];
    }
    function Nn() {
        this.$get = [ "$rootScope", "$browser", "$location", function(t, e, n) {
            var r = {
                findBindings: function(t, e, n) {
                    var r = [];
                    return o(t.getElementsByClassName("ng-binding"), function(t) {
                        var i = Yr.element(t).data("$binding");
                        i && o(i, function(i) {
                            n ? new RegExp("(^|\\s)" + ni(e) + "(\\s|\\||$)").test(i) && r.push(t) : -1 !== i.indexOf(e) && r.push(t);
                        });
                    }), r;
                },
                findModels: function(t, e, n) {
                    for (var r = [ "ng-", "data-ng-", "ng\\:" ], i = 0; i < r.length; ++i) {
                        var o = "[" + r[i] + "model" + (n ? "=" : "*=") + '"' + e + '"]', a = t.querySelectorAll(o);
                        if (a.length) return a;
                    }
                },
                getLocation: function() {
                    return n.url();
                },
                setLocation: function(e) {
                    e !== n.url() && (n.url(e), t.$digest());
                },
                whenStable: function(t) {
                    e.notifyWhenNoOutstandingRequests(t);
                }
            };
            return r;
        } ];
    }
    function Dn() {
        this.$get = [ "$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(t, e, n, r, i) {
            function o(o, s, u) {
                k(o) || (u = s, s = o, o = v);
                var c, l = G(arguments, 3), f = w(u) && !u, h = (f ? r : n).defer(), p = h.promise;
                return c = e.defer(function() {
                    try {
                        h.resolve(o.apply(null, l));
                    } catch (t) {
                        h.reject(t), i(t);
                    } finally {
                        delete a[p.$$timeoutId];
                    }
                    f || t.$apply();
                }, s), p.$$timeoutId = c, a[c] = h, p;
            }
            var a = {};
            return o.cancel = function(t) {
                return !!(t && t.$$timeoutId in a) && (_n(a[t.$$timeoutId].promise), a[t.$$timeoutId].reject("canceled"), 
                delete a[t.$$timeoutId], e.defer.cancel(t.$$timeoutId));
            }, o;
        } ];
    }
    function Ln(t) {
        var e = t;
        return qr && (Oo.setAttribute("href", e), e = Oo.href), Oo.setAttribute("href", e), 
        {
            href: Oo.href,
            protocol: Oo.protocol ? Oo.protocol.replace(/:$/, "") : "",
            host: Oo.host,
            search: Oo.search ? Oo.search.replace(/^\?/, "") : "",
            hash: Oo.hash ? Oo.hash.replace(/^#/, "") : "",
            hostname: Oo.hostname,
            port: Oo.port,
            pathname: "/" === Oo.pathname.charAt(0) ? Oo.pathname : "/" + Oo.pathname
        };
    }
    function qn(t) {
        var e = x(t) ? Ln(t) : t;
        return e.protocol === Ro.protocol && e.host === Ro.host;
    }
    function Un() {
        this.$get = m(t);
    }
    function Hn(t) {
        function n(t) {
            try {
                return decodeURIComponent(t);
            } catch (e) {
                return t;
            }
        }
        var r = t[0] || {}, i = {}, o = "";
        return function() {
            var t, a, s, u, c, l = function(t) {
                try {
                    return t.cookie || "";
                } catch (t) {
                    return "";
                }
            }(r);
            if (l !== o) for (t = (o = l).split("; "), i = {}, s = 0; s < t.length; s++) 0 < (u = (a = t[s]).indexOf("=")) && (c = n(a.substring(0, u)), 
            y(i[c]) && (i[c] = n(a.substring(u + 1))));
            return i;
        };
    }
    function Fn() {
        this.$get = Hn;
    }
    function Bn(t) {
        function e(r, i) {
            if (b(r)) {
                var a = {};
                return o(r, function(t, n) {
                    a[n] = e(n, t);
                }), a;
            }
            return t.factory(r + n, i);
        }
        var n = "Filter";
        this.register = e, this.$get = [ "$injector", function(t) {
            return function(e) {
                return t.get(e + n);
            };
        } ], e("currency", Kn), e("date", sr), e("filter", zn), e("json", ur), e("limitTo", cr), 
        e("lowercase", Mo), e("number", Yn), e("orderBy", fr), e("uppercase", No);
    }
    function zn() {
        return function(t, e, n, o) {
            if (!i(t)) {
                if (null == t) return t;
                throw r("filter")("notarray", "Expected array but received: {0}", t);
            }
            var a, s;
            switch (o = o || "$", Jn(e)) {
              case "function":
                a = e;
                break;

              case "boolean":
              case "null":
              case "number":
              case "string":
                s = !0;

              case "object":
                a = function(t, e, n, r) {
                    var i = b(t) && n in t;
                    return !0 === e ? e = z : k(e) || (e = function(t, e) {
                        return !(y(t) || (null === t || null === e ? t !== e : b(e) || b(t) && !g(t) || (t = Dr("" + t), 
                        e = Dr("" + e), -1 === t.indexOf(e))));
                    }), function(o) {
                        return i && !b(o) ? Gn(o, t[n], e, n, !1) : Gn(o, t, e, n, r);
                    };
                }(e, n, o, s);
                break;

              default:
                return t;
            }
            return Array.prototype.filter.call(t, a);
        };
    }
    function Gn(t, e, n, r, i, o) {
        var a = Jn(t), s = Jn(e);
        if ("string" === s && "!" === e.charAt(0)) return !Gn(t, e.substring(1), n, r, i);
        if (Xr(t)) return t.some(function(t) {
            return Gn(t, e, n, r, i);
        });
        switch (a) {
          case "object":
            var u;
            if (i) {
                for (u in t) if (u.charAt && "$" !== u.charAt(0) && Gn(t[u], e, n, r, !0)) return !0;
                return !o && Gn(t, e, n, r, !1);
            }
            if ("object" !== s) return n(t, e);
            for (u in e) {
                var c = e[u];
                if (!k(c) && !y(c)) {
                    var l = u === r;
                    if (!Gn(l ? t : t[u], c, n, r, l, l)) return !1;
                }
            }
            return !0;

          case "function":
            return !1;

          default:
            return n(t, e);
        }
    }
    function Jn(t) {
        return null === t ? "null" : typeof t;
    }
    function Kn(t) {
        var e = t.NUMBER_FORMATS;
        return function(t, n, r) {
            return y(n) && (n = e.CURRENCY_SYM), y(r) && (r = e.PATTERNS[1].maxFrac), null == t ? t : Xn(t, e.PATTERNS[1], e.GROUP_SEP, e.DECIMAL_SEP, r).replace(/\u00A4/g, n);
        };
    }
    function Yn(t) {
        var e = t.NUMBER_FORMATS;
        return function(t, n) {
            return null == t ? t : Xn(t, e.PATTERNS[0], e.GROUP_SEP, e.DECIMAL_SEP, n);
        };
    }
    function Xn(t, e, n, r, i) {
        if (!x(t) && !E(t) || isNaN(t)) return "";
        var o, a = !isFinite(t), s = !1, u = Math.abs(t) + "", c = "";
        if (a) c = "∞"; else {
            !function(t, e, n, r) {
                var i = t.d, o = i.length - t.i, a = (e = y(e) ? Math.min(Math.max(n, o), r) : +e) + t.i, s = i[a];
                if (0 < a) {
                    i.splice(Math.max(t.i, a));
                    for (var u = a; u < i.length; u++) i[u] = 0;
                } else {
                    o = Math.max(0, o), t.i = 1, i.length = Math.max(1, a = e + 1), i[0] = 0;
                    for (var c = 1; c < a; c++) i[c] = 0;
                }
                if (5 <= s) if (a - 1 < 0) {
                    for (var l = 0; a < l; l--) i.unshift(0), t.i++;
                    i.unshift(1), t.i++;
                } else i[a - 1]++;
                for (;o < Math.max(0, e); o++) i.push(0);
                var f = i.reduceRight(function(t, e, n, r) {
                    return e += t, r[n] = e % 10, Math.floor(e / 10);
                }, 0);
                f && (i.unshift(f), t.i++);
            }(o = function(t) {
                var e, n, r, i, o, a = 0;
                for (-1 < (n = t.indexOf(Ao)) && (t = t.replace(Ao, "")), 0 < (r = t.search(/e/i)) ? (n < 0 && (n = r), 
                n += +t.slice(r + 1), t = t.substring(0, r)) : n < 0 && (n = t.length), r = 0; t.charAt(r) === Po; r++) ;
                if (r === (o = t.length)) e = [ 0 ], n = 1; else {
                    for (o--; t.charAt(o) === Po; ) o--;
                    for (n -= r, e = [], i = 0; r <= o; r++, i++) e[i] = +t.charAt(r);
                }
                return To < n && (e = e.splice(0, To - 1), a = n - 1, n = 1), {
                    d: e,
                    e: a,
                    i: n
                };
            }(u), i, e.minFrac, e.maxFrac);
            var l = o.d, f = o.i, h = o.e, p = [];
            for (s = l.reduce(function(t, e) {
                return t && !e;
            }, !0); f < 0; ) l.unshift(0), f++;
            0 < f ? p = l.splice(f, l.length) : (p = l, l = [ 0 ]);
            var d = [];
            for (l.length >= e.lgSize && d.unshift(l.splice(-e.lgSize, l.length).join("")); l.length > e.gSize; ) d.unshift(l.splice(-e.gSize, l.length).join(""));
            l.length && d.unshift(l.join("")), c = d.join(n), p.length && (c += r + p.join("")), 
            h && (c += "e+" + h);
        }
        return t < 0 && !s ? e.negPre + c + e.negSuf : e.posPre + c + e.posSuf;
    }
    function tr(t, e, n, r) {
        var i = "";
        for ((t < 0 || r && t <= 0) && (r ? t = 1 - t : (t = -t, i = "-")), t = "" + t; t.length < e; ) t = Po + t;
        return n && (t = t.substr(t.length - e)), i + t;
    }
    function er(t, e, n, r, i) {
        return n = n || 0, function(o) {
            var a = o["get" + t]();
            return (0 < n || -n < a) && (a += n), 0 === a && -12 === n && (a = 12), tr(a, e, r, i);
        };
    }
    function nr(t, e, n) {
        return function(r, i) {
            var o = r["get" + t]();
            return i[Lr((n ? "STANDALONE" : "") + (e ? "SHORT" : "") + t)][o];
        };
    }
    function rr(t) {
        var e = new Date(t, 0, 1).getDay();
        return new Date(t, 0, (e <= 4 ? 5 : 12) - e);
    }
    function or(t) {
        return function(e) {
            var n = rr(e.getFullYear()), r = +function(t) {
                return new Date(t.getFullYear(), t.getMonth(), t.getDate() + (4 - t.getDay()));
            }(e) - +n;
            return tr(1 + Math.round(r / 6048e5), t);
        };
    }
    function ar(t, e) {
        return t.getFullYear() <= 0 ? e.ERAS[0] : e.ERAS[1];
    }
    function sr(t) {
        function e(t) {
            var e;
            if (e = t.match(n)) {
                var r = new Date(0), i = 0, o = 0, a = e[8] ? r.setUTCFullYear : r.setFullYear, s = e[8] ? r.setUTCHours : r.setHours;
                e[9] && (i = p(e[9] + e[10]), o = p(e[9] + e[11])), a.call(r, p(e[1]), p(e[2]) - 1, p(e[3]));
                var u = p(e[4] || 0) - i, c = p(e[5] || 0) - o, l = p(e[6] || 0), f = Math.round(1e3 * parseFloat("0." + (e[7] || 0)));
                return s.call(r, u, c, l, f), r;
            }
            return t;
        }
        var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(n, r, i) {
            var a, s, u = "", c = [];
            if (r = r || "mediumDate", r = t.DATETIME_FORMATS[r] || r, x(n) && (n = Io.test(n) ? p(n) : e(n)), 
            E(n) && (n = new Date(n)), !C(n) || !isFinite(n.getTime())) return n;
            for (;r; ) r = (s = jo.exec(r)) ? (c = W(c, s, 1)).pop() : (c.push(r), null);
            var l = n.getTimezoneOffset();
            return i && (l = Q(i, l), n = tt(n, i, !0)), o(c, function(e) {
                a = Vo[e], u += a ? a(n, t.DATETIME_FORMATS, l) : "''" === e ? "'" : e.replace(/(^'|'$)/g, "").replace(/''/g, "'");
            }), u;
        };
    }
    function ur() {
        return function(t, e) {
            return y(e) && (e = 2), Y(t, e);
        };
    }
    function cr() {
        return function(t, e, n) {
            return e = Math.abs(Number(e)) === 1 / 0 ? Number(e) : p(e), Qr(e) ? t : (E(t) && (t = t.toString()), 
            i(t) ? (n = (n = !n || isNaN(n) ? 0 : p(n)) < 0 ? Math.max(0, t.length + n) : n, 
            0 <= e ? lr(t, n, n + e) : 0 === n ? lr(t, e, t.length) : lr(t, Math.max(0, n + e), n)) : t);
        };
    }
    function lr(t, e, n) {
        return x(t) ? t.slice(e, n) : Br.call(t, e, n);
    }
    function fr(t) {
        function e(e) {
            return e.map(function(e) {
                var n = 1, r = $;
                if (k(e)) r = e; else if (x(e) && ("+" !== e.charAt(0) && "-" !== e.charAt(0) || (n = "-" === e.charAt(0) ? -1 : 1, 
                e = e.substring(1)), "" !== e && (r = t(e)).constant)) {
                    var i = r();
                    r = function(t) {
                        return t[i];
                    };
                }
                return {
                    get: r,
                    descending: n
                };
            });
        }
        function n(t) {
            switch (typeof t) {
              case "number":
              case "boolean":
              case "string":
                return !0;

              default:
                return !1;
            }
        }
        function o(t) {
            return k(t.valueOf) && n(t = t.valueOf()) || g(t) && n(t = t.toString()), t;
        }
        function a(t, e) {
            var n = typeof t;
            return null === t ? (n = "string", t = "null") : "object" === n && (t = o(t)), {
                value: t,
                type: n,
                index: e
            };
        }
        function s(t, e) {
            var n = 0, r = t.type, i = e.type;
            if (r === i) {
                var o = t.value, a = e.value;
                "string" === r ? (o = o.toLowerCase(), a = a.toLowerCase()) : "object" === r && (b(o) && (o = t.index), 
                b(a) && (a = e.index)), o !== a && (n = o < a ? -1 : 1);
            } else n = r < i ? -1 : 1;
            return n;
        }
        return function(t, n, o, u) {
            if (null == t) return t;
            if (!i(t)) throw r("orderBy")("notarray", "Expected array but received: {0}", t);
            Xr(n) || (n = [ n ]), 0 === n.length && (n = [ "+" ]);
            var c = e(n), l = o ? -1 : 1, f = k(u) ? u : s, h = Array.prototype.map.call(t, function(t, e) {
                return {
                    value: t,
                    tieBreaker: {
                        value: e,
                        type: "number",
                        index: e
                    },
                    predicateValues: c.map(function(n) {
                        return a(n.get(t), e);
                    })
                };
            });
            return h.sort(function(t, e) {
                for (var n = 0, r = c.length; n < r; n++) {
                    var i = f(t.predicateValues[n], e.predicateValues[n]);
                    if (i) return i * c[n].descending * l;
                }
                return (f(t.tieBreaker, e.tieBreaker) || s(t.tieBreaker, e.tieBreaker)) * l;
            }), h.map(function(t) {
                return t.value;
            });
        };
    }
    function hr(t) {
        return k(t) && (t = {
            link: t
        }), t.restrict = t.restrict || "AC", m(t);
    }
    function pr(t, e, n, r, i) {
        this.$$controls = [], this.$error = {}, this.$$success = {}, this.$pending = void 0, 
        this.$name = i(e.name || e.ngForm || "")(n), this.$dirty = !1, this.$pristine = !0, 
        this.$valid = !0, this.$invalid = !1, this.$submitted = !1, this.$$parentForm = qo, 
        this.$$element = t, this.$$animate = r, dr(this);
    }
    function dr(t) {
        t.$$classCache = {}, t.$$classCache[xa] = !(t.$$classCache[Sa] = t.$$element.hasClass(Sa));
    }
    function vr(t) {
        function r(t, e, n) {
            n && !t.$$classCache[e] ? (t.$$animate.addClass(t.$$element, e), t.$$classCache[e] = !0) : !n && t.$$classCache[e] && (t.$$animate.removeClass(t.$$element, e), 
            t.$$classCache[e] = !1);
        }
        function i(t, e, n) {
            e = e ? "-" + ht(e, "-") : "", r(t, Sa + e, !0 === n), r(t, xa + e, !1 === n);
        }
        var o = t.clazz, a = t.set, s = t.unset;
        o.prototype.$setValidity = function(t, o, u) {
            var c;
            y(o) ? function(t, e, n, r) {
                t[e] || (t[e] = {}), a(t[e], n, r);
            }(this, "$pending", t, u) : function(t, e, n, r) {
                t[e] && s(t[e], n, r), $r(t[e]) && (t[e] = void 0);
            }(this, "$pending", t, u), j(o) ? o ? (s(this.$error, t, u), a(this.$$success, t, u)) : (a(this.$error, t, u), 
            s(this.$$success, t, u)) : (s(this.$error, t, u), s(this.$$success, t, u)), this.$pending ? (r(this, Uo, !0), 
            this.$valid = this.$invalid = void 0, i(this, "", null)) : (r(this, Uo, !1), this.$valid = $r(this.$error), 
            this.$invalid = !this.$valid, i(this, "", this.$valid)), i(this, t, c = this.$pending && this.$pending[t] ? void 0 : !this.$error[t] && (!!this.$$success[t] || null)), 
            this.$$parentForm.$setValidity(t, c, this);
        };
    }
    function $r(t) {
        if (t) for (var e in t) if (t.hasOwnProperty(e)) return !1;
        return !0;
    }
    function mr(t) {
        t.$formatters.push(function(e) {
            return t.$isEmpty(e) ? e : e.toString();
        });
    }
    function gr(t, e, n, r, i, o) {
        var a = Dr(e[0].type);
        if (!i.android) {
            var s = !1;
            e.on("compositionstart", function() {
                s = !0;
            }), e.on("compositionend", function() {
                s = !1, c();
            });
        }
        var u, c = function(t) {
            if (u && (o.defer.cancel(u), u = null), !s) {
                var i = e.val(), c = t && t.type;
                "password" === a || n.ngTrim && "false" === n.ngTrim || (i = ei(i)), (r.$viewValue !== i || "" === i && r.$$hasNativeValidators) && r.$setViewValue(i, c);
            }
        };
        if (i.hasEvent("input")) e.on("input", c); else {
            var l = function(t, e, n) {
                u || (u = o.defer(function() {
                    u = null, e && e.value === n || c(t);
                }));
            };
            e.on("keydown", function(t) {
                var e = t.keyCode;
                91 === e || 15 < e && e < 19 || 37 <= e && e <= 40 || l(t, this, this.value);
            }), i.hasEvent("paste") && e.on("paste cut", l);
        }
        e.on("change", c), ea[a] && r.$$hasNativeValidators && a === n.type && e.on(ta, function(t) {
            if (!u) {
                var e = this[Mr], n = e.badInput, r = e.typeMismatch;
                u = o.defer(function() {
                    u = null, e.badInput === n && e.typeMismatch === r || c(t);
                });
            }
        }), r.$render = function() {
            var t = r.$isEmpty(r.$viewValue) ? "" : r.$viewValue;
            e.val() !== t && e.val(t);
        };
    }
    function yr(t, e) {
        return function(n, r) {
            var i, a;
            if (C(n)) return n;
            if (x(n)) {
                if ('"' === n.charAt(0) && '"' === n.charAt(n.length - 1) && (n = n.substring(1, n.length - 1)), 
                zo.test(n)) return new Date(n);
                if (t.lastIndex = 0, i = t.exec(n)) return i.shift(), a = r ? {
                    yyyy: r.getFullYear(),
                    MM: r.getMonth() + 1,
                    dd: r.getDate(),
                    HH: r.getHours(),
                    mm: r.getMinutes(),
                    ss: r.getSeconds(),
                    sss: r.getMilliseconds() / 1e3
                } : {
                    yyyy: 1970,
                    MM: 1,
                    dd: 1,
                    HH: 0,
                    mm: 0,
                    ss: 0,
                    sss: 0
                }, o(i, function(t, n) {
                    n < e.length && (a[e[n]] = +t);
                }), new Date(a.yyyy, a.MM - 1, a.dd, a.HH, a.mm, a.ss || 0, 1e3 * a.sss || 0);
            }
            return NaN;
        };
    }
    function wr(t, e, n, r) {
        return function(i, o, a, s, u, c, l) {
            function f(t) {
                return t && !(t.getTime && t.getTime() != t.getTime());
            }
            function h(t) {
                return w(t) && !C(t) ? n(t) || void 0 : t;
            }
            br(i, o, a, s), gr(0, o, a, s, u, c);
            var p, v, $, d = s && s.$options.getOption("timezone");
            (s.$$parserName = t, s.$parsers.push(function(t) {
                if (s.$isEmpty(t)) return null;
                if (e.test(t)) {
                    var r = n(t, p);
                    return d && (r = tt(r, d)), r;
                }
            }), s.$formatters.push(function(t) {
                if (t && !C(t)) throw _a("datefmt", "Expected `{0}` to be a date", t);
                return f(t) ? ((p = t) && d && (p = tt(p, d, !0)), l("date")(t, r, d)) : (p = null, 
                "");
            }), w(a.min) || a.ngMin) && (s.$validators.min = function(t) {
                return !f(t) || y(v) || n(t) >= v;
            }, a.$observe("min", function(t) {
                v = h(t), s.$validate();
            }));
            (w(a.max) || a.ngMax) && (s.$validators.max = function(t) {
                return !f(t) || y($) || n(t) <= $;
            }, a.$observe("max", function(t) {
                $ = h(t), s.$validate();
            }));
        };
    }
    function br(t, e, n, r) {
        var i = e[0];
        (r.$$hasNativeValidators = b(i.validity)) && r.$parsers.push(function(t) {
            var n = e.prop(Mr) || {};
            return n.badInput || n.typeMismatch ? void 0 : t;
        });
    }
    function Sr(t) {
        t.$$parserName = "number", t.$parsers.push(function(e) {
            return t.$isEmpty(e) ? null : Jo.test(e) ? parseFloat(e) : void 0;
        }), t.$formatters.push(function(e) {
            if (!t.$isEmpty(e)) {
                if (!E(e)) throw _a("numfmt", "Expected `{0}` to be a number", e);
                e = e.toString();
            }
            return e;
        });
    }
    function xr(t) {
        return w(t) && !E(t) && (t = parseFloat(t)), Qr(t) ? void 0 : t;
    }
    function Er(t) {
        return (0 | t) === t;
    }
    function Cr(t) {
        var e = t.toString(), n = e.indexOf(".");
        if (-1 !== n) return e.length - n - 1;
        if (-1 < t && t < 1) {
            var r = /e-(\d+)$/.exec(e);
            if (r) return Number(r[1]);
        }
        return 0;
    }
    function _r(t, e, n) {
        var r = Number(t), i = !Er(r), o = !Er(e), a = !Er(n);
        if (i || o || a) {
            var s = i ? Cr(r) : 0, u = o ? Cr(e) : 0, c = a ? Cr(n) : 0, l = Math.max(s, u, c), f = Math.pow(10, l);
            r *= f, e *= f, n *= f, i && (r = Math.round(r)), o && (e = Math.round(e)), a && (n = Math.round(n));
        }
        return (r - e) % n == 0;
    }
    function kr(t, e, n, r, i) {
        var o;
        if (w(r)) {
            if (!(o = t(r)).constant) throw _a("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", n, r);
            return o(e);
        }
        return i;
    }
    function Or(t, e) {
        function n(t, e) {
            if (!t || !t.length) return [];
            if (!e || !e.length) return t;
            var n = [];
            t: for (var r = 0; r < t.length; r++) {
                for (var i = t[r], o = 0; o < e.length; o++) if (i === e[o]) continue t;
                n.push(i);
            }
            return n;
        }
        function r(t) {
            return t && t.split(" ");
        }
        function i(t) {
            var e = t;
            return Xr(t) ? e = t.map(i).join(" ") : b(t) && (e = Object.keys(t).filter(function(e) {
                return t[e];
            }).join(" ")), e;
        }
        function a(t) {
            var e = t;
            if (Xr(t)) e = t.map(a); else if (b(t)) {
                var n = !1;
                e = Object.keys(t).filter(function(e) {
                    var r = t[e];
                    return !n && y(r) && (n = !0), r;
                }), n && e.push(void 0);
            }
            return e;
        }
        var s;
        return t = "ngClass" + t, [ "$parse", function(u) {
            return {
                restrict: "AC",
                link: function(c, l, f) {
                    function v(t, e) {
                        var n = [];
                        return o(t, function(t) {
                            (0 < e || S[t]) && (S[t] = (S[t] || 0) + e, S[t] === +(0 < e) && n.push(t));
                        }), n.join(" ");
                    }
                    function $(t) {
                        x === e && function(t, e) {
                            var i = r(t), o = r(e), a = n(i, o), s = n(o, i), u = v(a, -1), c = v(s, 1);
                            f.$addClass(c), f.$removeClass(u);
                        }(m, t), m = t;
                    }
                    var m, g = f[t].trim(), y = ":" === g.charAt(0) && ":" === g.charAt(1), w = u(g, y ? a : i), b = y ? function(t) {
                        var e = i(t);
                        e !== m && $(e);
                    } : $, S = l.data("$classCounts"), x = !0;
                    S || (S = gt(), l.data("$classCounts", S)), "ngClass" !== t && (s || (s = u("$index", function(t) {
                        return 1 & t;
                    })), c.$watch(s, function(t) {
                        t === e ? function(t) {
                            t = v(r(t), 1), f.$addClass(t);
                        }(m) : function(t) {
                            t = v(r(t), -1), f.$removeClass(t);
                        }(m), x = t;
                    })), c.$watch(w, b, y);
                }
            };
        } ];
    }
    function Rr(t, e, n, r, i, o, a, s, u) {
        this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = void 0, 
        this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], 
        this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, 
        this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, 
        this.$pending = void 0, this.$name = u(n.name || "", !1)(t), this.$$parentForm = qo, 
        this.$options = ka, this.$$parsedNgModel = i(n.ngModel), this.$$parsedNgModelAssign = this.$$parsedNgModel.assign, 
        this.$$ngModelGet = this.$$parsedNgModel, this.$$ngModelSet = this.$$parsedNgModelAssign, 
        this.$$pendingDebounce = null, this.$$parserValid = void 0, this.$$currentValidationRunId = 0, 
        Object.defineProperty(this, "$$scope", {
            value: t
        }), this.$$attr = n, this.$$element = r, this.$$animate = o, this.$$timeout = a, 
        this.$$parse = i, this.$$q = s, this.$$exceptionHandler = e, dr(this), function(t) {
            t.$$scope.$watch(function(e) {
                var n = t.$$ngModelGet(e);
                if (n !== t.$modelValue && (t.$modelValue == t.$modelValue || n == n)) {
                    t.$modelValue = t.$$rawModelValue = n, t.$$parserValid = void 0;
                    for (var r = t.$formatters, i = r.length, o = n; i--; ) o = r[i](o);
                    t.$viewValue !== o && (t.$$updateEmptyClasses(o), t.$viewValue = t.$$lastCommittedViewValue = o, 
                    t.$render(), t.$$runValidators(t.$modelValue, t.$viewValue, v));
                }
                return n;
            });
        }(this);
    }
    function Ar(t) {
        this.$$options = t;
    }
    function Pr(t, e) {
        o(e, function(e, n) {
            w(t[n]) || (t[n] = e);
        });
    }
    function Vr(t, e) {
        t.prop("selected", e), t.attr("selected", e);
    }
    var jr = {
        objectMaxDepth: 5
    }, Ir = /^\/(.+)\/([a-z]*)$/, Mr = "validity", Nr = Object.prototype.hasOwnProperty, Dr = function(t) {
        return x(t) ? t.toLowerCase() : t;
    }, Lr = function(t) {
        return x(t) ? t.toUpperCase() : t;
    };
    "i" !== "I".toLowerCase() && (Dr = function(t) {
        return x(t) ? t.replace(/[A-Z]/g, function(t) {
            return String.fromCharCode(32 | t.charCodeAt(0));
        }) : t;
    }, Lr = function(t) {
        return x(t) ? t.replace(/[a-z]/g, function(t) {
            return String.fromCharCode(-33 & t.charCodeAt(0));
        }) : t;
    });
    var qr, Ur, Hr, Fr, Br = [].slice, zr = [].splice, Wr = [].push, Gr = Object.prototype.toString, Jr = Object.getPrototypeOf, Kr = r("ng"), Yr = t.angular || (t.angular = {}), Zr = 0;
    qr = t.document.documentMode;
    var Qr = Number.isNaN || function(t) {
        return t != t;
    };
    v.$inject = [], $.$inject = [];
    var Xr = Array.isArray, ti = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/, ei = function(t) {
        return x(t) ? t.trim() : t;
    }, ni = function(t) {
        return t.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
    }, ri = function() {
        if (!w(ri.rules)) {
            var e = t.document.querySelector("[ng-csp]") || t.document.querySelector("[data-ng-csp]");
            if (e) {
                var n = e.getAttribute("ng-csp") || e.getAttribute("data-ng-csp");
                ri.rules = {
                    noUnsafeEval: !n || -1 !== n.indexOf("no-unsafe-eval"),
                    noInlineStyle: !n || -1 !== n.indexOf("no-inline-style")
                };
            } else ri.rules = {
                noUnsafeEval: function() {
                    try {
                        return new Function(""), !1;
                    } catch (t) {
                        return !0;
                    }
                }(),
                noInlineStyle: !1
            };
        }
        return ri.rules;
    }, ii = function() {
        if (w(ii.name_)) return ii.name_;
        var e, n, r, i, o = ai.length;
        for (n = 0; n < o; ++n) if (r = ai[n], e = t.document.querySelector("[" + r.replace(":", "\\:") + "jq]")) {
            i = e.getAttribute(r + "jq");
            break;
        }
        return ii.name_ = i;
    }, oi = /:/g, ai = [ "ng-", "data-ng-", "ng:", "x-ng-" ], si = function(e) {
        var n = e.currentScript;
        if (!n) return !0;
        if (!(n instanceof t.HTMLScriptElement || n instanceof t.SVGScriptElement)) return !1;
        var r = n.attributes;
        return [ r.getNamedItem("src"), r.getNamedItem("href"), r.getNamedItem("xlink:href") ].every(function(t) {
            if (!t) return !0;
            if (!t.value) return !1;
            var n = e.createElement("a");
            if (n.href = t.value, e.location.origin === n.origin) return !0;
            switch (n.protocol) {
              case "http:":
              case "https:":
              case "ftp:":
              case "blob:":
              case "file:":
              case "data:":
                return !0;

              default:
                return !1;
            }
        });
    }(t.document), ui = /[A-Z]/g, ci = !1, li = 1, fi = 3, hi = 8, pi = 9, di = 11, vi = {
        full: "1.6.6",
        major: 1,
        minor: 6,
        dot: 6,
        codeName: "interdimensional-cable"
    };
    Vt.expando = "ng339";
    var $i = Vt.cache = {}, mi = 1;
    Vt._data = function(t) {
        return this.cache[t[this.expando]] || {};
    };
    var gi = /-([a-z])/g, yi = /^-ms-/, wi = {
        mouseleave: "mouseout",
        mouseenter: "mouseover"
    }, bi = r("jqLite"), Si = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, xi = /<|&#?\w+;/, Ei = /<([\w:-]+)/, Ci = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, _i = {
        option: [ 1, '<select multiple="multiple">', "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    _i.optgroup = _i.option, _i.tbody = _i.tfoot = _i.colgroup = _i.caption = _i.thead, 
    _i.th = _i.td;
    var ki = t.Node.prototype.contains || function(t) {
        return !!(16 & this.compareDocumentPosition(t));
    }, Oi = Vt.prototype = {
        ready: Kt,
        toString: function() {
            var t = [];
            return o(this, function(e) {
                t.push("" + e);
            }), "[" + t.join(", ") + "]";
        },
        eq: function(t) {
            return Ur(0 <= t ? this[t] : this[this.length + t]);
        },
        length: 0,
        push: Wr,
        sort: [].sort,
        splice: [].splice
    }, Ri = {};
    o("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(t) {
        Ri[Dr(t)] = t;
    });
    var Ti = {};
    o("input,select,option,textarea,button,form,details".split(","), function(t) {
        Ti[t] = !0;
    });
    var Ai = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern",
        ngStep: "step"
    };
    o({
        data: Lt,
        removeData: Nt,
        hasData: function(t) {
            for (var e in $i[t.ng339]) return !0;
            return !1;
        },
        cleanData: function(t) {
            for (var e = 0, n = t.length; e < n; e++) Nt(t[e]);
        }
    }, function(t, e) {
        Vt[e] = t;
    }), o({
        data: Lt,
        inheritedData: zt,
        scope: function(t) {
            return Ur.data(t, "$scope") || zt(t.parentNode || t, [ "$isolateScope", "$scope" ]);
        },
        isolateScope: function(t) {
            return Ur.data(t, "$isolateScope") || Ur.data(t, "$isolateScopeNoTemplate");
        },
        controller: Bt,
        injector: function(t) {
            return zt(t, "$injector");
        },
        removeAttr: function(t, e) {
            t.removeAttribute(e);
        },
        hasClass: qt,
        css: function(t, e, n) {
            if (e = function(t) {
                return kt(t.replace(yi, "ms-"));
            }(e), !w(n)) return t.style[e];
            t.style[e] = n;
        },
        attr: function(t, e, n) {
            var r, i = t.nodeType;
            if (i !== fi && 2 !== i && i !== hi && t.getAttribute) {
                var o = Dr(e), a = Ri[o];
                if (!w(n)) return r = t.getAttribute(e), a && null !== r && (r = o), null === r ? void 0 : r;
                null === n || !1 === n && a ? t.removeAttribute(e) : t.setAttribute(e, a ? o : n);
            }
        },
        prop: function(t, e, n) {
            if (!w(n)) return t[e];
            t[e] = n;
        },
        text: function() {
            function t(t, e) {
                if (y(e)) {
                    var n = t.nodeType;
                    return n === li || n === fi ? t.textContent : "";
                }
                t.textContent = e;
            }
            return t.$dv = "", t;
        }(),
        val: function(t, e) {
            if (y(e)) {
                if (t.multiple && "select" === q(t)) {
                    var n = [];
                    return o(t.options, function(t) {
                        t.selected && n.push(t.value || t.text);
                    }), n;
                }
                return t.value;
            }
            t.value = e;
        },
        html: function(t, e) {
            if (y(e)) return t.innerHTML;
            It(t, !0), t.innerHTML = e;
        },
        empty: Wt
    }, function(t, e) {
        Vt.prototype[e] = function(e, n) {
            var r, i, o = this.length;
            if (t !== Wt && y(2 === t.length && t !== qt && t !== Bt ? e : n)) {
                if (b(e)) {
                    for (r = 0; r < o; r++) if (t === Lt) t(this[r], e); else for (i in e) t(this[r], i, e[i]);
                    return this;
                }
                for (var a = t.$dv, s = y(a) ? Math.min(o, 1) : o, u = 0; u < s; u++) {
                    var c = t(this[u], e, n);
                    a = a ? a + c : c;
                }
                return a;
            }
            for (r = 0; r < o; r++) t(this[r], e, n);
            return this;
        };
    }), o({
        removeData: Nt,
        on: function(t, e, n, r) {
            if (w(r)) throw bi("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            if (Rt(t)) {
                var i = Dt(t, !0), o = i.events, a = i.handle;
                a || (a = i.handle = function(t, e) {
                    var n = function(n, r) {
                        n.isDefaultPrevented = function() {
                            return n.defaultPrevented;
                        };
                        var i = e[r || n.type], o = i ? i.length : 0;
                        if (o) {
                            if (y(n.immediatePropagationStopped)) {
                                var a = n.stopImmediatePropagation;
                                n.stopImmediatePropagation = function() {
                                    n.immediatePropagationStopped = !0, n.stopPropagation && n.stopPropagation(), a && a.call(n);
                                };
                            }
                            n.isImmediatePropagationStopped = function() {
                                return !0 === n.immediatePropagationStopped;
                            };
                            var s = i.specialHandlerWrapper || Xt;
                            1 < o && (i = bt(i));
                            for (var u = 0; u < o; u++) n.isImmediatePropagationStopped() || s(t, n, i[u]);
                        }
                    };
                    return n.elem = t, n;
                }(t, o));
                for (var s = 0 <= e.indexOf(" ") ? e.split(" ") : [ e ], u = s.length, c = function(e, r, i) {
                    var s = o[e];
                    s || ((s = o[e] = []).specialHandlerWrapper = r, "$destroy" === e || i || t.addEventListener(e, a)), 
                    s.push(n);
                }; u--; ) e = s[u], wi[e] ? (c(wi[e], te), c(e, void 0, !0)) : c(e);
            }
        },
        off: Mt,
        one: function(t, e, n) {
            (t = Ur(t)).on(e, function r() {
                t.off(e, n), t.off(e, r);
            }), t.on(e, n);
        },
        replaceWith: function(t, e) {
            var n, r = t.parentNode;
            It(t), o(new Vt(e), function(e) {
                n ? r.insertBefore(e, n.nextSibling) : r.replaceChild(e, t), n = e;
            });
        },
        children: function(t) {
            var e = [];
            return o(t.childNodes, function(t) {
                t.nodeType === li && e.push(t);
            }), e;
        },
        contents: function(t) {
            return t.contentDocument || t.childNodes || [];
        },
        append: function(t, e) {
            var n = t.nodeType;
            if (n === li || n === di) for (var r = 0, i = (e = new Vt(e)).length; r < i; r++) {
                var o = e[r];
                t.appendChild(o);
            }
        },
        prepend: function(t, e) {
            if (t.nodeType === li) {
                var n = t.firstChild;
                o(new Vt(e), function(e) {
                    t.insertBefore(e, n);
                });
            }
        },
        wrap: function(t, e) {
            !function(t, e) {
                var n = t.parentNode;
                n && n.replaceChild(e, t), e.appendChild(t);
            }(t, Ur(e).eq(0).clone()[0]);
        },
        remove: Gt,
        detach: function(t) {
            Gt(t, !0);
        },
        after: function(t, e) {
            var n = t, r = t.parentNode;
            if (r) for (var i = 0, o = (e = new Vt(e)).length; i < o; i++) {
                var a = e[i];
                r.insertBefore(a, n.nextSibling), n = a;
            }
        },
        addClass: Ht,
        removeClass: Ut,
        toggleClass: function(t, e, n) {
            e && o(e.split(" "), function(e) {
                var r = n;
                y(r) && (r = !qt(t, e)), (r ? Ht : Ut)(t, e);
            });
        },
        parent: function(t) {
            var e = t.parentNode;
            return e && e.nodeType !== di ? e : null;
        },
        next: function(t) {
            return t.nextElementSibling;
        },
        find: function(t, e) {
            return t.getElementsByTagName ? t.getElementsByTagName(e) : [];
        },
        clone: jt,
        triggerHandler: function(t, e, n) {
            var r, i, a, s = e.type || e, u = Dt(t), c = u && u.events, l = c && c[s];
            l && (r = {
                preventDefault: function() {
                    this.defaultPrevented = !0;
                },
                isDefaultPrevented: function() {
                    return !0 === this.defaultPrevented;
                },
                stopImmediatePropagation: function() {
                    this.immediatePropagationStopped = !0;
                },
                isImmediatePropagationStopped: function() {
                    return !0 === this.immediatePropagationStopped;
                },
                stopPropagation: v,
                type: s,
                target: t
            }, e.type && (r = f(r, e)), i = bt(l), a = n ? [ r ].concat(n) : [ r ], o(i, function(e) {
                r.isImmediatePropagationStopped() || e.apply(t, a);
            }));
        }
    }, function(t, e) {
        Vt.prototype[e] = function(e, n, r) {
            for (var i, o = 0, a = this.length; o < a; o++) y(i) ? w(i = t(this[o], e, n, r)) && (i = Ur(i)) : Ft(i, t(this[o], e, n, r));
            return w(i) ? i : this;
        };
    }), Vt.prototype.bind = Vt.prototype.on, Vt.prototype.unbind = Vt.prototype.off;
    var Pi = Object.create(null);
    re.prototype = {
        _idx: function(t) {
            return t === this._lastKey || (this._lastKey = t, this._lastIndex = this._keys.indexOf(t)), 
            this._lastIndex;
        },
        _transformKey: function(t) {
            return Qr(t) ? Pi : t;
        },
        get: function(t) {
            t = this._transformKey(t);
            var e = this._idx(t);
            if (-1 !== e) return this._values[e];
        },
        set: function(t, e) {
            t = this._transformKey(t);
            var n = this._idx(t);
            -1 === n && (n = this._lastIndex = this._keys.length), this._keys[n] = t, this._values[n] = e;
        },
        delete: function(t) {
            t = this._transformKey(t);
            var e = this._idx(t);
            return -1 !== e && (this._keys.splice(e, 1), this._values.splice(e, 1), this._lastKey = NaN, 
            this._lastIndex = -1, !0);
        }
    };
    var Vi = re, ji = [ function() {
        this.$get = [ function() {
            return Vi;
        } ];
    } ], Ii = /^([^(]+?)=>/, Mi = /^[^(]*\(\s*([^)]*)\)/m, Ni = /,/, Di = /^\s*(_?)(\S+?)\1\s*$/, Li = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, qi = r("$injector");
    se.$$annotate = function(t, e, n) {
        var r, i;
        if ("function" == typeof t) {
            if (!(r = t.$inject)) {
                if (r = [], t.length) {
                    if (e) throw x(n) && n || (n = t.name || function(t) {
                        var e = oe(t);
                        return e ? "function(" + (e[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
                    }(t)), qi("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", n);
                    o(oe(t)[1].split(Ni), function(t) {
                        t.replace(Di, function(t, e, n) {
                            r.push(n);
                        });
                    });
                }
                t.$inject = r;
            }
        } else Xr(t) ? (dt(t[i = t.length - 1], "fn"), r = t.slice(0, i)) : dt(t, "fn", !0);
        return r;
    };
    var Ui = r("$animate"), Hi = 1, Fi = function() {
        this.$get = v;
    }, Bi = function() {
        var t = new Vi(), e = [];
        this.$get = [ "$$AnimateRunner", "$rootScope", function(n, r) {
            function i(t, e, n) {
                var r = !1;
                return e && o(e = x(e) ? e.split(" ") : Xr(e) ? e : [], function(e) {
                    e && (r = !0, t[e] = n);
                }), r;
            }
            function a() {
                o(e, function(e) {
                    var n = t.get(e);
                    if (n) {
                        var r = function(t) {
                            x(t) && (t = t.split(" "));
                            var e = gt();
                            return o(t, function(t) {
                                t.length && (e[t] = !0);
                            }), e;
                        }(e.attr("class")), i = "", a = "";
                        o(n, function(t, e) {
                            t !== !!r[e] && (t ? i += (i.length ? " " : "") + e : a += (a.length ? " " : "") + e);
                        }), o(e, function(t) {
                            i && Ht(t, i), a && Ut(t, a);
                        }), t.delete(e);
                    }
                }), e.length = 0;
            }
            function s(n, o, s) {
                var u = t.get(n) || {}, c = i(u, o, !0), l = i(u, s, !1);
                (c || l) && (t.set(n, u), e.push(n), 1 === e.length && r.$$postDigest(a));
            }
            return {
                enabled: v,
                on: v,
                off: v,
                pin: v,
                push: function(t, e, r, i) {
                    i && i(), (r = r || {}).from && t.css(r.from), r.to && t.css(r.to), (r.addClass || r.removeClass) && s(t, r.addClass, r.removeClass);
                    var o = new n();
                    return o.complete(), o;
                }
            };
        } ];
    }, zi = [ "$provide", function(t) {
        var e = this, n = null, r = null;
        this.$$registeredAnimations = Object.create(null), this.register = function(n, r) {
            if (n && "." !== n.charAt(0)) throw Ui("notcsel", "Expecting class selector starting with '.' got '{0}'.", n);
            var i = n + "-animation";
            e.$$registeredAnimations[n.substr(1)] = i, t.factory(i, r);
        }, this.customFilter = function(t) {
            return 1 === arguments.length && (r = k(t) ? t : null), r;
        }, this.classNameFilter = function(t) {
            if (1 === arguments.length && (n = t instanceof RegExp ? t : null) && new RegExp("[(\\s|\\/)]ng-animate[(\\s|\\/)]").test(n.toString())) throw n = null, 
            Ui("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', "ng-animate");
            return n;
        }, this.$get = [ "$$animateQueue", function(t) {
            function e(t, e, n) {
                if (n) {
                    var r = function(t) {
                        for (var e = 0; e < t.length; e++) {
                            var n = t[e];
                            if (n.nodeType === Hi) return n;
                        }
                    }(n);
                    !r || r.parentNode || r.previousElementSibling || (n = null);
                }
                n ? n.after(t) : e.prepend(t);
            }
            return {
                on: t.on,
                off: t.off,
                pin: t.pin,
                enabled: t.enabled,
                cancel: function(t) {
                    t.end && t.end();
                },
                enter: function(n, r, i, o) {
                    return r = r && Ur(r), i = i && Ur(i), e(n, r = r || i.parent(), i), t.push(n, "enter", he(o));
                },
                move: function(n, r, i, o) {
                    return r = r && Ur(r), i = i && Ur(i), e(n, r = r || i.parent(), i), t.push(n, "move", he(o));
                },
                leave: function(e, n) {
                    return t.push(e, "leave", he(n), function() {
                        e.remove();
                    });
                },
                addClass: function(e, n, r) {
                    return (r = he(r)).addClass = ce(r.addclass, n), t.push(e, "addClass", r);
                },
                removeClass: function(e, n, r) {
                    return (r = he(r)).removeClass = ce(r.removeClass, n), t.push(e, "removeClass", r);
                },
                setClass: function(e, n, r, i) {
                    return (i = he(i)).addClass = ce(i.addClass, n), i.removeClass = ce(i.removeClass, r), 
                    t.push(e, "setClass", i);
                },
                animate: function(e, n, r, i, o) {
                    return (o = he(o)).from = o.from ? f(o.from, n) : n, o.to = o.to ? f(o.to, r) : r, 
                    i = i || "ng-inline-animate", o.tempClasses = ce(o.tempClasses, i), t.push(e, "animate", o);
                }
            };
        } ];
    } ], Wi = function() {
        this.$get = [ "$$rAF", function(t) {
            function e(e) {
                n.push(e), 1 < n.length || t(function() {
                    for (var t = 0; t < n.length; t++) n[t]();
                    n = [];
                });
            }
            var n = [];
            return function() {
                var t = !1;
                return e(function() {
                    t = !0;
                }), function(n) {
                    t ? n() : e(n);
                };
            };
        } ];
    }, Gi = function() {
        this.$get = [ "$q", "$sniffer", "$$animateAsyncRun", "$$isDocumentHidden", "$timeout", function(t, e, n, r, i) {
            function a(t) {
                this.setHost(t);
                var e = n();
                this._doneCallbacks = [], this._tick = function(t) {
                    r() ? function(t) {
                        i(t, 0, !1);
                    }(t) : e(t);
                }, this._state = 0;
            }
            return a.chain = function(t, e) {
                var r = 0;
                !function n() {
                    r !== t.length ? t[r](function(t) {
                        !1 !== t ? (r++, n()) : e(!1);
                    }) : e(!0);
                }();
            }, a.all = function(t, e) {
                function n(n) {
                    i = i && n, ++r === t.length && e(i);
                }
                var r = 0, i = !0;
                o(t, function(t) {
                    t.done(n);
                });
            }, a.prototype = {
                setHost: function(t) {
                    this.host = t || {};
                },
                done: function(t) {
                    2 === this._state ? t() : this._doneCallbacks.push(t);
                },
                progress: v,
                getPromise: function() {
                    if (!this.promise) {
                        var e = this;
                        this.promise = t(function(t, n) {
                            e.done(function(e) {
                                !1 === e ? n() : t();
                            });
                        });
                    }
                    return this.promise;
                },
                then: function(t, e) {
                    return this.getPromise().then(t, e);
                },
                catch: function(t) {
                    return this.getPromise().catch(t);
                },
                finally: function(t) {
                    return this.getPromise().finally(t);
                },
                pause: function() {
                    this.host.pause && this.host.pause();
                },
                resume: function() {
                    this.host.resume && this.host.resume();
                },
                end: function() {
                    this.host.end && this.host.end(), this._resolve(!0);
                },
                cancel: function() {
                    this.host.cancel && this.host.cancel(), this._resolve(!1);
                },
                complete: function(t) {
                    var e = this;
                    0 === e._state && (e._state = 1, e._tick(function() {
                        e._resolve(t);
                    }));
                },
                _resolve: function(t) {
                    2 !== this._state && (o(this._doneCallbacks, function(e) {
                        e(t);
                    }), this._doneCallbacks.length = 0, this._state = 2);
                }
            }, a;
        } ];
    }, Ji = function() {
        this.$get = [ "$$rAF", "$q", "$$AnimateRunner", function(t, e, n) {
            return function(e, r) {
                function i() {
                    return t(function() {
                        a.addClass && (e.addClass(a.addClass), a.addClass = null), a.removeClass && (e.removeClass(a.removeClass), 
                        a.removeClass = null), a.to && (e.css(a.to), a.to = null), s || u.complete(), s = !0;
                    }), u;
                }
                var a = r || {};
                a.$$prepared || (a = F(a)), a.cleanupStyles && (a.from = a.to = null), a.from && (e.css(a.from), 
                a.from = null);
                var s, u = new n();
                return {
                    start: i,
                    end: i
                };
            };
        } ];
    }, Ki = r("$compile"), Yi = new function() {}();
    me.$inject = [ "$provide", "$$sanitizeUriProvider" ], ge.prototype.isFirstChange = function() {
        return this.previousValue === Yi;
    };
    var Zi = /^((?:x|data)[:\-_])/i, Qi = /[:\-_]+(.)/g, Xi = r("$controller"), to = /^(\S+)(\s+as\s+([\w$]+))?$/, eo = function() {
        this.$get = [ "$document", function(t) {
            return function(e) {
                return e ? !e.nodeType && e instanceof Ur && (e = e[0]) : e = t[0].body, e.offsetWidth + 1;
            };
        } ];
    }, no = "application/json", ro = {
        "Content-Type": no + ";charset=utf-8"
    }, io = /^\[|^\{(?!\{)/, oo = {
        "[": /]$/,
        "{": /}$/
    }, ao = /^\)]\}',?\n/, so = r("$http"), uo = Yr.$interpolateMinErr = r("$interpolate");
    uo.throwNoconcat = function(t) {
        throw uo("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", t);
    }, uo.interr = function(t, e) {
        return uo("interr", "Can't interpolate: {0}\n{1}", t, e.toString());
    };
    var co = function() {
        this.$get = function() {
            var e = Yr.callbacks, n = {};
            return {
                createCallback: function(r) {
                    var i = "_" + (e.$$counter++).toString(36), o = "angular.callbacks." + i, a = function(t) {
                        var e = function(t) {
                            e.data = t, e.called = !0;
                        };
                        return e.id = t, e;
                    }(i);
                    return n[o] = e[i] = a, o;
                },
                wasCalled: function(t) {
                    return n[t].called;
                },
                getResponse: function(t) {
                    return n[t].data;
                },
                removeCallback: function(t) {
                    var r = n[t];
                    delete e[r.id], delete n[t];
                }
            };
        };
    }, lo = /^([^?#]*)(\?([^#]*))?(#(.*))?$/, fo = {
        http: 80,
        https: 443,
        ftp: 21
    }, ho = r("$location"), po = /^\s*[\\/]{2,}/, vo = {
        $$absUrl: "",
        $$html5: !1,
        $$replace: !1,
        absUrl: tn("$$absUrl"),
        url: function(t) {
            if (y(t)) return this.$$url;
            var e = lo.exec(t);
            return (e[1] || "" === t) && this.path(decodeURIComponent(e[1])), (e[2] || e[1] || "" === t) && this.search(e[3] || ""), 
            this.hash(e[5] || ""), this;
        },
        protocol: tn("$$protocol"),
        host: tn("$$host"),
        port: tn("$$port"),
        path: en("$$path", function(t) {
            return "/" === (t = null !== t ? t.toString() : "").charAt(0) ? t : "/" + t;
        }),
        search: function(t, e) {
            switch (arguments.length) {
              case 0:
                return this.$$search;

              case 1:
                if (x(t) || E(t)) t = t.toString(), this.$$search = rt(t); else {
                    if (!b(t)) throw ho("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                    o(t = F(t, {}), function(e, n) {
                        null == e && delete t[n];
                    }), this.$$search = t;
                }
                break;

              default:
                y(e) || null === e ? delete this.$$search[t] : this.$$search[t] = e;
            }
            return this.$$compose(), this;
        },
        hash: en("$$hash", function(t) {
            return null !== t ? t.toString() : "";
        }),
        replace: function() {
            return this.$$replace = !0, this;
        }
    };
    o([ Xe, Qe, Ze ], function(t) {
        t.prototype = Object.create(vo), t.prototype.state = function(e) {
            if (!arguments.length) return this.$$state;
            if (t !== Ze || !this.$$html5) throw ho("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
            return this.$$state = y(e) ? null : e, this.$$urlUpdatedByLocation = !0, this;
        };
    });
    var $o = r("$parse"), mo = {}.constructor.prototype.valueOf, go = gt();
    o("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(t) {
        go[t] = !0;
    });
    var yo = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "\t",
        v: "\v",
        "'": "'",
        '"': '"'
    }, wo = function(t) {
        this.options = t;
    };
    wo.prototype = {
        constructor: wo,
        lex: function(t) {
            for (this.text = t, this.index = 0, this.tokens = []; this.index < this.text.length; ) {
                var e = this.text.charAt(this.index);
                if ('"' === e || "'" === e) this.readString(e); else if (this.isNumber(e) || "." === e && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdentifierStart(this.peekMultichar())) this.readIdent(); else if (this.is(e, "(){}[].,;:?")) this.tokens.push({
                    index: this.index,
                    text: e
                }), this.index++; else if (this.isWhitespace(e)) this.index++; else {
                    var n = e + this.peek(), r = n + this.peek(2), i = go[e], o = go[n], a = go[r];
                    if (i || o || a) {
                        var s = a ? r : o ? n : e;
                        this.tokens.push({
                            index: this.index,
                            text: s,
                            operator: !0
                        }), this.index += s.length;
                    } else this.throwError("Unexpected next character ", this.index, this.index + 1);
                }
            }
            return this.tokens;
        },
        is: function(t, e) {
            return -1 !== e.indexOf(t);
        },
        peek: function(t) {
            var e = t || 1;
            return this.index + e < this.text.length && this.text.charAt(this.index + e);
        },
        isNumber: function(t) {
            return "0" <= t && t <= "9" && "string" == typeof t;
        },
        isWhitespace: function(t) {
            return " " === t || "\r" === t || "\t" === t || "\n" === t || "\v" === t || " " === t;
        },
        isIdentifierStart: function(t) {
            return this.options.isIdentifierStart ? this.options.isIdentifierStart(t, this.codePointAt(t)) : this.isValidIdentifierStart(t);
        },
        isValidIdentifierStart: function(t) {
            return "a" <= t && t <= "z" || "A" <= t && t <= "Z" || "_" === t || "$" === t;
        },
        isIdentifierContinue: function(t) {
            return this.options.isIdentifierContinue ? this.options.isIdentifierContinue(t, this.codePointAt(t)) : this.isValidIdentifierContinue(t);
        },
        isValidIdentifierContinue: function(t, e) {
            return this.isValidIdentifierStart(t, e) || this.isNumber(t);
        },
        codePointAt: function(t) {
            return 1 === t.length ? t.charCodeAt(0) : (t.charCodeAt(0) << 10) + t.charCodeAt(1) - 56613888;
        },
        peekMultichar: function() {
            var t = this.text.charAt(this.index), e = this.peek();
            if (!e) return t;
            var n = t.charCodeAt(0), r = e.charCodeAt(0);
            return 55296 <= n && n <= 56319 && 56320 <= r && r <= 57343 ? t + e : t;
        },
        isExpOperator: function(t) {
            return "-" === t || "+" === t || this.isNumber(t);
        },
        throwError: function(t, e, n) {
            n = n || this.index;
            var r = w(e) ? "s " + e + "-" + this.index + " [" + this.text.substring(e, n) + "]" : " " + n;
            throw $o("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", t, r, this.text);
        },
        readNumber: function() {
            for (var t = "", e = this.index; this.index < this.text.length; ) {
                var n = Dr(this.text.charAt(this.index));
                if ("." === n || this.isNumber(n)) t += n; else {
                    var r = this.peek();
                    if ("e" === n && this.isExpOperator(r)) t += n; else if (this.isExpOperator(n) && r && this.isNumber(r) && "e" === t.charAt(t.length - 1)) t += n; else {
                        if (!this.isExpOperator(n) || r && this.isNumber(r) || "e" !== t.charAt(t.length - 1)) break;
                        this.throwError("Invalid exponent");
                    }
                }
                this.index++;
            }
            this.tokens.push({
                index: e,
                text: t,
                constant: !0,
                value: Number(t)
            });
        },
        readIdent: function() {
            var t = this.index;
            for (this.index += this.peekMultichar().length; this.index < this.text.length; ) {
                var e = this.peekMultichar();
                if (!this.isIdentifierContinue(e)) break;
                this.index += e.length;
            }
            this.tokens.push({
                index: t,
                text: this.text.slice(t, this.index),
                identifier: !0
            });
        },
        readString: function(t) {
            var e = this.index;
            this.index++;
            for (var n = "", r = t, i = !1; this.index < this.text.length; ) {
                var o = this.text.charAt(this.index);
                if (r += o, i) {
                    if ("u" === o) {
                        var a = this.text.substring(this.index + 1, this.index + 5);
                        a.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + a + "]"), 
                        this.index += 4, n += String.fromCharCode(parseInt(a, 16));
                    } else n += yo[o] || o;
                    i = !1;
                } else if ("\\" === o) i = !0; else {
                    if (o === t) return this.index++, void this.tokens.push({
                        index: e,
                        text: r,
                        constant: !0,
                        value: n
                    });
                    n += o;
                }
                this.index++;
            }
            this.throwError("Unterminated quote", e);
        }
    };
    var bo = function(t, e) {
        this.lexer = t, this.options = e;
    };
    bo.Program = "Program", bo.ExpressionStatement = "ExpressionStatement", bo.AssignmentExpression = "AssignmentExpression", 
    bo.ConditionalExpression = "ConditionalExpression", bo.LogicalExpression = "LogicalExpression", 
    bo.BinaryExpression = "BinaryExpression", bo.UnaryExpression = "UnaryExpression", 
    bo.CallExpression = "CallExpression", bo.MemberExpression = "MemberExpression", 
    bo.Identifier = "Identifier", bo.Literal = "Literal", bo.ArrayExpression = "ArrayExpression", 
    bo.Property = "Property", bo.ObjectExpression = "ObjectExpression", bo.ThisExpression = "ThisExpression", 
    bo.LocalsExpression = "LocalsExpression", bo.NGValueParameter = "NGValueParameter", 
    bo.prototype = {
        ast: function(t) {
            this.text = t, this.tokens = this.lexer.lex(t);
            var e = this.program();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), 
            e;
        },
        program: function() {
            for (var t = []; ;) if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && t.push(this.expressionStatement()), 
            !this.expect(";")) return {
                type: bo.Program,
                body: t
            };
        },
        expressionStatement: function() {
            return {
                type: bo.ExpressionStatement,
                expression: this.filterChain()
            };
        },
        filterChain: function() {
            for (var t = this.expression(); this.expect("|"); ) t = this.filter(t);
            return t;
        },
        expression: function() {
            return this.assignment();
        },
        assignment: function() {
            var t = this.ternary();
            if (this.expect("=")) {
                if (!hn(t)) throw $o("lval", "Trying to assign a value to a non l-value");
                t = {
                    type: bo.AssignmentExpression,
                    left: t,
                    right: this.assignment(),
                    operator: "="
                };
            }
            return t;
        },
        ternary: function() {
            var t, e, n = this.logicalOR();
            return this.expect("?") && (t = this.expression(), this.consume(":")) ? (e = this.expression(), 
            {
                type: bo.ConditionalExpression,
                test: n,
                alternate: t,
                consequent: e
            }) : n;
        },
        logicalOR: function() {
            for (var t = this.logicalAND(); this.expect("||"); ) t = {
                type: bo.LogicalExpression,
                operator: "||",
                left: t,
                right: this.logicalAND()
            };
            return t;
        },
        logicalAND: function() {
            for (var t = this.equality(); this.expect("&&"); ) t = {
                type: bo.LogicalExpression,
                operator: "&&",
                left: t,
                right: this.equality()
            };
            return t;
        },
        equality: function() {
            for (var t, e = this.relational(); t = this.expect("==", "!=", "===", "!=="); ) e = {
                type: bo.BinaryExpression,
                operator: t.text,
                left: e,
                right: this.relational()
            };
            return e;
        },
        relational: function() {
            for (var t, e = this.additive(); t = this.expect("<", ">", "<=", ">="); ) e = {
                type: bo.BinaryExpression,
                operator: t.text,
                left: e,
                right: this.additive()
            };
            return e;
        },
        additive: function() {
            for (var t, e = this.multiplicative(); t = this.expect("+", "-"); ) e = {
                type: bo.BinaryExpression,
                operator: t.text,
                left: e,
                right: this.multiplicative()
            };
            return e;
        },
        multiplicative: function() {
            for (var t, e = this.unary(); t = this.expect("*", "/", "%"); ) e = {
                type: bo.BinaryExpression,
                operator: t.text,
                left: e,
                right: this.unary()
            };
            return e;
        },
        unary: function() {
            var t;
            return (t = this.expect("+", "-", "!")) ? {
                type: bo.UnaryExpression,
                operator: t.text,
                prefix: !0,
                argument: this.unary()
            } : this.primary();
        },
        primary: function() {
            var t, e;
            for (this.expect("(") ? (t = this.filterChain(), this.consume(")")) : this.expect("[") ? t = this.arrayDeclaration() : this.expect("{") ? t = this.object() : this.selfReferential.hasOwnProperty(this.peek().text) ? t = F(this.selfReferential[this.consume().text]) : this.options.literals.hasOwnProperty(this.peek().text) ? t = {
                type: bo.Literal,
                value: this.options.literals[this.consume().text]
            } : this.peek().identifier ? t = this.identifier() : this.peek().constant ? t = this.constant() : this.throwError("not a primary expression", this.peek()); e = this.expect("(", "[", "."); ) "(" === e.text ? (t = {
                type: bo.CallExpression,
                callee: t,
                arguments: this.parseArguments()
            }, this.consume(")")) : "[" === e.text ? (t = {
                type: bo.MemberExpression,
                object: t,
                property: this.expression(),
                computed: !0
            }, this.consume("]")) : "." === e.text ? t = {
                type: bo.MemberExpression,
                object: t,
                property: this.identifier(),
                computed: !1
            } : this.throwError("IMPOSSIBLE");
            return t;
        },
        filter: function(t) {
            for (var e = [ t ], n = {
                type: bo.CallExpression,
                callee: this.identifier(),
                arguments: e,
                filter: !0
            }; this.expect(":"); ) e.push(this.expression());
            return n;
        },
        parseArguments: function() {
            var t = [];
            if (")" !== this.peekToken().text) for (;t.push(this.filterChain()), this.expect(","); ) ;
            return t;
        },
        identifier: function() {
            var t = this.consume();
            return t.identifier || this.throwError("is not a valid identifier", t), {
                type: bo.Identifier,
                name: t.text
            };
        },
        constant: function() {
            return {
                type: bo.Literal,
                value: this.consume().value
            };
        },
        arrayDeclaration: function() {
            var t = [];
            if ("]" !== this.peekToken().text) do {
                if (this.peek("]")) break;
                t.push(this.expression());
            } while (this.expect(","));
            return this.consume("]"), {
                type: bo.ArrayExpression,
                elements: t
            };
        },
        object: function() {
            var t, e = [];
            if ("}" !== this.peekToken().text) do {
                if (this.peek("}")) break;
                t = {
                    type: bo.Property,
                    kind: "init"
                }, this.peek().constant ? (t.key = this.constant(), t.computed = !1, this.consume(":"), 
                t.value = this.expression()) : this.peek().identifier ? (t.key = this.identifier(), 
                t.computed = !1, this.peek(":") ? (this.consume(":"), t.value = this.expression()) : t.value = t.key) : this.peek("[") ? (this.consume("["), 
                t.key = this.expression(), this.consume("]"), t.computed = !0, this.consume(":"), 
                t.value = this.expression()) : this.throwError("invalid key", this.peek()), e.push(t);
            } while (this.expect(","));
            return this.consume("}"), {
                type: bo.ObjectExpression,
                properties: e
            };
        },
        throwError: function(t, e) {
            throw $o("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", e.text, t, e.index + 1, this.text, this.text.substring(e.index));
        },
        consume: function(t) {
            if (0 === this.tokens.length) throw $o("ueoe", "Unexpected end of expression: {0}", this.text);
            var e = this.expect(t);
            return e || this.throwError("is unexpected, expecting [" + t + "]", this.peek()), 
            e;
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw $o("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0];
        },
        peek: function(t, e, n, r) {
            return this.peekAhead(0, t, e, n, r);
        },
        peekAhead: function(t, e, n, r, i) {
            if (this.tokens.length > t) {
                var o = this.tokens[t], a = o.text;
                if (a === e || a === n || a === r || a === i || !e && !n && !r && !i) return o;
            }
            return !1;
        },
        expect: function(t, e, n, r) {
            var i = this.peek(t, e, n, r);
            return !!i && (this.tokens.shift(), i);
        },
        selfReferential: {
            this: {
                type: bo.ThisExpression
            },
            $locals: {
                type: bo.LocalsExpression
            }
        }
    };
    var So = 1, xo = 2;
    $n.prototype = {
        compile: function(t) {
            var e = this;
            this.state = {
                nextId: 0,
                filters: {},
                fn: {
                    vars: [],
                    body: [],
                    own: {}
                },
                assign: {
                    vars: [],
                    body: [],
                    own: {}
                },
                inputs: []
            }, ln(t, e.$filter);
            var n, r = "";
            if (this.stage = "assign", n = pn(t)) {
                this.state.computing = "assign";
                var i = this.nextId();
                this.recurse(n, i), this.return_(i), r = "fn.assign=" + this.generateFunction("assign", "s,v,l");
            }
            var a = fn(t.body);
            e.stage = "inputs", o(a, function(t, n) {
                var r = "fn" + n;
                e.state[r] = {
                    vars: [],
                    body: [],
                    own: {}
                }, e.state.computing = r;
                var i = e.nextId();
                e.recurse(t, i), e.return_(i), e.state.inputs.push({
                    name: r,
                    isPure: t.isPure
                }), t.watchId = n;
            }), this.state.computing = "fn", this.stage = "main", this.recurse(t);
            var s = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + r + this.watchFns() + "return fn;", u = new Function("$filter", "getStringValue", "ifDefined", "plus", s)(this.$filter, on, an, sn);
            return this.state = this.stage = void 0, u;
        },
        USE: "use",
        STRICT: "strict",
        watchFns: function() {
            var t = [], e = this.state.inputs, n = this;
            return o(e, function(e) {
                t.push("var " + e.name + "=" + n.generateFunction(e.name, "s")), e.isPure && t.push(e.name, ".isPure=" + JSON.stringify(e.isPure) + ";");
            }), e.length && t.push("fn.inputs=[" + e.map(function(t) {
                return t.name;
            }).join(",") + "];"), t.join("");
        },
        generateFunction: function(t, e) {
            return "function(" + e + "){" + this.varsPrefix(t) + this.body(t) + "};";
        },
        filterPrefix: function() {
            var t = [], e = this;
            return o(this.state.filters, function(n, r) {
                t.push(n + "=$filter(" + e.escape(r) + ")");
            }), t.length ? "var " + t.join(",") + ";" : "";
        },
        varsPrefix: function(t) {
            return this.state[t].vars.length ? "var " + this.state[t].vars.join(",") + ";" : "";
        },
        body: function(t) {
            return this.state[t].body.join("");
        },
        recurse: function(t, e, n, r, i, a) {
            var s, u, c, l, f, h = this;
            if (r = r || v, !a && w(t.watchId)) return e = e || this.nextId(), void this.if_("i", this.lazyAssign(e, this.computedMember("i", t.watchId)), this.lazyRecurse(t, e, n, r, i, !0));
            switch (t.type) {
              case bo.Program:
                o(t.body, function(e, n) {
                    h.recurse(e.expression, void 0, void 0, function(t) {
                        u = t;
                    }), n !== t.body.length - 1 ? h.current().body.push(u, ";") : h.return_(u);
                });
                break;

              case bo.Literal:
                l = this.escape(t.value), this.assign(e, l), r(e || l);
                break;

              case bo.UnaryExpression:
                this.recurse(t.argument, void 0, void 0, function(t) {
                    u = t;
                }), l = t.operator + "(" + this.ifDefined(u, 0) + ")", this.assign(e, l), r(l);
                break;

              case bo.BinaryExpression:
                this.recurse(t.left, void 0, void 0, function(t) {
                    s = t;
                }), this.recurse(t.right, void 0, void 0, function(t) {
                    u = t;
                }), l = "+" === t.operator ? this.plus(s, u) : "-" === t.operator ? this.ifDefined(s, 0) + t.operator + this.ifDefined(u, 0) : "(" + s + ")" + t.operator + "(" + u + ")", 
                this.assign(e, l), r(l);
                break;

              case bo.LogicalExpression:
                e = e || this.nextId(), h.recurse(t.left, e), h.if_("&&" === t.operator ? e : h.not(e), h.lazyRecurse(t.right, e)), 
                r(e);
                break;

              case bo.ConditionalExpression:
                e = e || this.nextId(), h.recurse(t.test, e), h.if_(e, h.lazyRecurse(t.alternate, e), h.lazyRecurse(t.consequent, e)), 
                r(e);
                break;

              case bo.Identifier:
                e = e || this.nextId(), n && (n.context = "inputs" === h.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", t.name) + "?l:s"), 
                n.computed = !1, n.name = t.name), h.if_("inputs" === h.stage || h.not(h.getHasOwnProperty("l", t.name)), function() {
                    h.if_("inputs" === h.stage || "s", function() {
                        i && 1 !== i && h.if_(h.isNull(h.nonComputedMember("s", t.name)), h.lazyAssign(h.nonComputedMember("s", t.name), "{}")), 
                        h.assign(e, h.nonComputedMember("s", t.name));
                    });
                }, e && h.lazyAssign(e, h.nonComputedMember("l", t.name))), r(e);
                break;

              case bo.MemberExpression:
                s = n && (n.context = this.nextId()) || this.nextId(), e = e || this.nextId(), h.recurse(t.object, s, void 0, function() {
                    h.if_(h.notNull(s), function() {
                        t.computed ? (u = h.nextId(), h.recurse(t.property, u), h.getStringValue(u), i && 1 !== i && h.if_(h.not(h.computedMember(s, u)), h.lazyAssign(h.computedMember(s, u), "{}")), 
                        l = h.computedMember(s, u), h.assign(e, l), n && (n.computed = !0, n.name = u)) : (i && 1 !== i && h.if_(h.isNull(h.nonComputedMember(s, t.property.name)), h.lazyAssign(h.nonComputedMember(s, t.property.name), "{}")), 
                        l = h.nonComputedMember(s, t.property.name), h.assign(e, l), n && (n.computed = !1, 
                        n.name = t.property.name));
                    }, function() {
                        h.assign(e, "undefined");
                    }), r(e);
                }, !!i);
                break;

              case bo.CallExpression:
                e = e || this.nextId(), t.filter ? (u = h.filter(t.callee.name), c = [], o(t.arguments, function(t) {
                    var e = h.nextId();
                    h.recurse(t, e), c.push(e);
                }), l = u + "(" + c.join(",") + ")", h.assign(e, l), r(e)) : (u = h.nextId(), s = {}, 
                c = [], h.recurse(t.callee, u, s, function() {
                    h.if_(h.notNull(u), function() {
                        o(t.arguments, function(e) {
                            h.recurse(e, t.constant ? void 0 : h.nextId(), void 0, function(t) {
                                c.push(t);
                            });
                        }), l = s.name ? h.member(s.context, s.name, s.computed) + "(" + c.join(",") + ")" : u + "(" + c.join(",") + ")", 
                        h.assign(e, l);
                    }, function() {
                        h.assign(e, "undefined");
                    }), r(e);
                }));
                break;

              case bo.AssignmentExpression:
                u = this.nextId(), s = {}, this.recurse(t.left, void 0, s, function() {
                    h.if_(h.notNull(s.context), function() {
                        h.recurse(t.right, u), l = h.member(s.context, s.name, s.computed) + t.operator + u, 
                        h.assign(e, l), r(e || l);
                    });
                }, 1);
                break;

              case bo.ArrayExpression:
                c = [], o(t.elements, function(e) {
                    h.recurse(e, t.constant ? void 0 : h.nextId(), void 0, function(t) {
                        c.push(t);
                    });
                }), l = "[" + c.join(",") + "]", this.assign(e, l), r(e || l);
                break;

              case bo.ObjectExpression:
                f = !(c = []), o(t.properties, function(t) {
                    t.computed && (f = !0);
                }), f ? (e = e || this.nextId(), this.assign(e, "{}"), o(t.properties, function(t) {
                    t.computed ? (s = h.nextId(), h.recurse(t.key, s)) : s = t.key.type === bo.Identifier ? t.key.name : "" + t.key.value, 
                    u = h.nextId(), h.recurse(t.value, u), h.assign(h.member(e, s, t.computed), u);
                })) : (o(t.properties, function(e) {
                    h.recurse(e.value, t.constant ? void 0 : h.nextId(), void 0, function(t) {
                        c.push(h.escape(e.key.type === bo.Identifier ? e.key.name : "" + e.key.value) + ":" + t);
                    });
                }), l = "{" + c.join(",") + "}", this.assign(e, l)), r(e || l);
                break;

              case bo.ThisExpression:
                this.assign(e, "s"), r(e || "s");
                break;

              case bo.LocalsExpression:
                this.assign(e, "l"), r(e || "l");
                break;

              case bo.NGValueParameter:
                this.assign(e, "v"), r(e || "v");
            }
        },
        getHasOwnProperty: function(t, e) {
            var n = t + "." + e, r = this.current().own;
            return r.hasOwnProperty(n) || (r[n] = this.nextId(!1, t + "&&(" + this.escape(e) + " in " + t + ")")), 
            r[n];
        },
        assign: function(t, e) {
            if (t) return this.current().body.push(t, "=", e, ";"), t;
        },
        filter: function(t) {
            return this.state.filters.hasOwnProperty(t) || (this.state.filters[t] = this.nextId(!0)), 
            this.state.filters[t];
        },
        ifDefined: function(t, e) {
            return "ifDefined(" + t + "," + this.escape(e) + ")";
        },
        plus: function(t, e) {
            return "plus(" + t + "," + e + ")";
        },
        return_: function(t) {
            this.current().body.push("return ", t, ";");
        },
        if_: function(t, e, n) {
            if (!0 === t) e(); else {
                var r = this.current().body;
                r.push("if(", t, "){"), e(), r.push("}"), n && (r.push("else{"), n(), r.push("}"));
            }
        },
        not: function(t) {
            return "!(" + t + ")";
        },
        isNull: function(t) {
            return t + "==null";
        },
        notNull: function(t) {
            return t + "!=null";
        },
        nonComputedMember: function(t, e) {
            return /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(e) ? t + "." + e : t + '["' + e.replace(/[^$_a-zA-Z0-9]/g, this.stringEscapeFn) + '"]';
        },
        computedMember: function(t, e) {
            return t + "[" + e + "]";
        },
        member: function(t, e, n) {
            return n ? this.computedMember(t, e) : this.nonComputedMember(t, e);
        },
        getStringValue: function(t) {
            this.assign(t, "getStringValue(" + t + ")");
        },
        lazyRecurse: function(t, e, n, r, i, o) {
            var a = this;
            return function() {
                a.recurse(t, e, n, r, i, o);
            };
        },
        lazyAssign: function(t, e) {
            var n = this;
            return function() {
                n.assign(t, e);
            };
        },
        stringEscapeRegex: /[^ a-zA-Z0-9]/g,
        stringEscapeFn: function(t) {
            return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
        },
        escape: function(t) {
            if (x(t)) return "'" + t.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
            if (E(t)) return t.toString();
            if (!0 === t) return "true";
            if (!1 === t) return "false";
            if (null === t) return "null";
            if (void 0 === t) return "undefined";
            throw $o("esc", "IMPOSSIBLE");
        },
        nextId: function(t, e) {
            var n = "v" + this.state.nextId++;
            return t || this.current().vars.push(n + (e ? "=" + e : "")), n;
        },
        current: function() {
            return this.state[this.state.computing];
        }
    }, mn.prototype = {
        compile: function(t) {
            var n, r, e = this;
            ln(t, e.$filter), (n = pn(t)) && (r = this.recurse(n));
            var i, a = fn(t.body);
            a && (i = [], o(a, function(t, n) {
                var r = e.recurse(t);
                r.isPure = t.isPure, t.input = r, i.push(r), t.watchId = n;
            }));
            var s = [];
            o(t.body, function(t) {
                s.push(e.recurse(t.expression));
            });
            var u = 0 === t.body.length ? v : 1 === t.body.length ? s[0] : function(t, e) {
                var n;
                return o(s, function(r) {
                    n = r(t, e);
                }), n;
            };
            return r && (u.assign = function(t, e, n) {
                return r(t, n, e);
            }), i && (u.inputs = i), u;
        },
        recurse: function(t, e, n) {
            var r, i, a, s = this;
            if (t.input) return this.inputs(t.input, t.watchId);
            switch (t.type) {
              case bo.Literal:
                return this.value(t.value, e);

              case bo.UnaryExpression:
                return i = this.recurse(t.argument), this["unary" + t.operator](i, e);

              case bo.BinaryExpression:
              case bo.LogicalExpression:
                return r = this.recurse(t.left), i = this.recurse(t.right), this["binary" + t.operator](r, i, e);

              case bo.ConditionalExpression:
                return this["ternary?:"](this.recurse(t.test), this.recurse(t.alternate), this.recurse(t.consequent), e);

              case bo.Identifier:
                return s.identifier(t.name, e, n);

              case bo.MemberExpression:
                return r = this.recurse(t.object, !1, !!n), t.computed || (i = t.property.name), 
                t.computed && (i = this.recurse(t.property)), t.computed ? this.computedMember(r, i, e, n) : this.nonComputedMember(r, i, e, n);

              case bo.CallExpression:
                return a = [], o(t.arguments, function(t) {
                    a.push(s.recurse(t));
                }), t.filter && (i = this.$filter(t.callee.name)), t.filter || (i = this.recurse(t.callee, !0)), 
                t.filter ? function(t, n, r, o) {
                    for (var s = [], u = 0; u < a.length; ++u) s.push(a[u](t, n, r, o));
                    var c = i.apply(void 0, s, o);
                    return e ? {
                        context: void 0,
                        name: void 0,
                        value: c
                    } : c;
                } : function(t, n, r, o) {
                    var s, u = i(t, n, r, o);
                    if (null != u.value) {
                        for (var c = [], l = 0; l < a.length; ++l) c.push(a[l](t, n, r, o));
                        s = u.value.apply(u.context, c);
                    }
                    return e ? {
                        value: s
                    } : s;
                };

              case bo.AssignmentExpression:
                return r = this.recurse(t.left, !0, 1), i = this.recurse(t.right), function(t, n, o, a) {
                    var s = r(t, n, o, a), u = i(t, n, o, a);
                    return s.context[s.name] = u, e ? {
                        value: u
                    } : u;
                };

              case bo.ArrayExpression:
                return a = [], o(t.elements, function(t) {
                    a.push(s.recurse(t));
                }), function(t, n, r, i) {
                    for (var o = [], s = 0; s < a.length; ++s) o.push(a[s](t, n, r, i));
                    return e ? {
                        value: o
                    } : o;
                };

              case bo.ObjectExpression:
                return a = [], o(t.properties, function(t) {
                    t.computed ? a.push({
                        key: s.recurse(t.key),
                        computed: !0,
                        value: s.recurse(t.value)
                    }) : a.push({
                        key: t.key.type === bo.Identifier ? t.key.name : "" + t.key.value,
                        computed: !1,
                        value: s.recurse(t.value)
                    });
                }), function(t, n, r, i) {
                    for (var o = {}, s = 0; s < a.length; ++s) a[s].computed ? o[a[s].key(t, n, r, i)] = a[s].value(t, n, r, i) : o[a[s].key] = a[s].value(t, n, r, i);
                    return e ? {
                        value: o
                    } : o;
                };

              case bo.ThisExpression:
                return function(t) {
                    return e ? {
                        value: t
                    } : t;
                };

              case bo.LocalsExpression:
                return function(t, n) {
                    return e ? {
                        value: n
                    } : n;
                };

              case bo.NGValueParameter:
                return function(t, n, r) {
                    return e ? {
                        value: r
                    } : r;
                };
            }
        },
        "unary+": function(t, e) {
            return function(n, r, i, o) {
                var a = t(n, r, i, o);
                return a = w(a) ? +a : 0, e ? {
                    value: a
                } : a;
            };
        },
        "unary-": function(t, e) {
            return function(n, r, i, o) {
                var a = t(n, r, i, o);
                return a = w(a) ? -a : -0, e ? {
                    value: a
                } : a;
            };
        },
        "unary!": function(t, e) {
            return function(n, r, i, o) {
                var a = !t(n, r, i, o);
                return e ? {
                    value: a
                } : a;
            };
        },
        "binary+": function(t, e, n) {
            return function(r, i, o, a) {
                var s = sn(t(r, i, o, a), e(r, i, o, a));
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary-": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a), u = e(r, i, o, a), c = (w(s) ? s : 0) - (w(u) ? u : 0);
                return n ? {
                    value: c
                } : c;
            };
        },
        "binary*": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) * e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary/": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) / e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary%": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) % e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary===": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) === e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary!==": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) !== e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary==": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) == e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary!=": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) != e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary<": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) < e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary>": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) > e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary<=": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) <= e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary>=": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) >= e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary&&": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) && e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "binary||": function(t, e, n) {
            return function(r, i, o, a) {
                var s = t(r, i, o, a) || e(r, i, o, a);
                return n ? {
                    value: s
                } : s;
            };
        },
        "ternary?:": function(t, e, n, r) {
            return function(i, o, a, s) {
                var u = t(i, o, a, s) ? e(i, o, a, s) : n(i, o, a, s);
                return r ? {
                    value: u
                } : u;
            };
        },
        value: function(t, e) {
            return function() {
                return e ? {
                    context: void 0,
                    name: void 0,
                    value: t
                } : t;
            };
        },
        identifier: function(t, e, n) {
            return function(r, i, o, a) {
                var s = i && t in i ? i : r;
                n && 1 !== n && s && null == s[t] && (s[t] = {});
                var u = s ? s[t] : void 0;
                return e ? {
                    context: s,
                    name: t,
                    value: u
                } : u;
            };
        },
        computedMember: function(t, e, n, r) {
            return function(i, o, a, s) {
                var u, c, l = t(i, o, a, s);
                return null != l && (u = on(u = e(i, o, a, s)), r && 1 !== r && l && !l[u] && (l[u] = {}), 
                c = l[u]), n ? {
                    context: l,
                    name: u,
                    value: c
                } : c;
            };
        },
        nonComputedMember: function(t, e, n, r) {
            return function(i, o, a, s) {
                var u = t(i, o, a, s);
                r && 1 !== r && u && null == u[e] && (u[e] = {});
                var c = null != u ? u[e] : void 0;
                return n ? {
                    context: u,
                    name: e,
                    value: c
                } : c;
            };
        },
        inputs: function(t, e) {
            return function(n, r, i, o) {
                return o ? o[e] : t(n, r, i);
            };
        }
    }, gn.prototype = {
        constructor: gn,
        parse: function(t) {
            var e = this.ast.ast(t), n = this.astCompiler.compile(e);
            return n.literal = function(t) {
                return 0 === t.body.length || 1 === t.body.length && (t.body[0].expression.type === bo.Literal || t.body[0].expression.type === bo.ArrayExpression || t.body[0].expression.type === bo.ObjectExpression);
            }(e), n.constant = function(t) {
                return t.constant;
            }(e), n;
        }
    };
    var Eo = r("$sce"), Co = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, _o = /_([a-z])/g, ko = r("$compile"), Oo = t.document.createElement("a"), Ro = Ln(t.location.href);
    Hn.$inject = [ "$document" ], Bn.$inject = [ "$provide" ];
    var To = 22, Ao = ".", Po = "0";
    Kn.$inject = [ "$locale" ];
    var Vo = {
        yyyy: er("FullYear", 4, 0, !(Yn.$inject = [ "$locale" ]), !0),
        yy: er("FullYear", 2, 0, !0, !0),
        y: er("FullYear", 1, 0, !1, !0),
        MMMM: nr("Month"),
        MMM: nr("Month", !0),
        MM: er("Month", 2, 1),
        M: er("Month", 1, 1),
        LLLL: nr("Month", !1, !0),
        dd: er("Date", 2),
        d: er("Date", 1),
        HH: er("Hours", 2),
        H: er("Hours", 1),
        hh: er("Hours", 2, -12),
        h: er("Hours", 1, -12),
        mm: er("Minutes", 2),
        m: er("Minutes", 1),
        ss: er("Seconds", 2),
        s: er("Seconds", 1),
        sss: er("Milliseconds", 3),
        EEEE: nr("Day"),
        EEE: nr("Day", !0),
        a: function(t, e) {
            return t.getHours() < 12 ? e.AMPMS[0] : e.AMPMS[1];
        },
        Z: function(t, e, n) {
            var r = -1 * n;
            return (0 <= r ? "+" : "") + (tr(Math[0 < r ? "floor" : "ceil"](r / 60), 2) + tr(Math.abs(r % 60), 2));
        },
        ww: or(2),
        w: or(1),
        G: ar,
        GG: ar,
        GGG: ar,
        GGGG: function(t, e) {
            return t.getFullYear() <= 0 ? e.ERANAMES[0] : e.ERANAMES[1];
        }
    }, jo = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))([\s\S]*)/, Io = /^-?\d+$/;
    sr.$inject = [ "$locale" ];
    var Mo = m(Dr), No = m(Lr);
    fr.$inject = [ "$parse" ];
    var Do = m({
        restrict: "E",
        compile: function(t, e) {
            if (!e.href && !e.xlinkHref) return function(t, e) {
                if ("a" === e[0].nodeName.toLowerCase()) {
                    var n = "[object SVGAnimatedString]" === Gr.call(e.prop("href")) ? "xlink:href" : "href";
                    e.on("click", function(t) {
                        e.attr(n) || t.preventDefault();
                    });
                }
            };
        }
    }), Lo = {};
    o(Ri, function(t, e) {
        function n(t, n, i) {
            t.$watch(i[r], function(t) {
                i.$set(e, !!t);
            });
        }
        if ("multiple" !== t) {
            var r = ye("ng-" + e), i = n;
            "checked" === t && (i = function(t, e, i) {
                i.ngModel !== i[r] && n(t, 0, i);
            }), Lo[r] = function() {
                return {
                    restrict: "A",
                    priority: 100,
                    link: i
                };
            };
        }
    }), o(Ai, function(t, e) {
        Lo[e] = function() {
            return {
                priority: 100,
                link: function(t, n, r) {
                    if ("ngPattern" === e && "/" === r.ngPattern.charAt(0)) {
                        var i = r.ngPattern.match(Ir);
                        if (i) return void r.$set("ngPattern", new RegExp(i[1], i[2]));
                    }
                    t.$watch(r[e], function(t) {
                        r.$set(e, t);
                    });
                }
            };
        };
    }), o([ "src", "srcset", "href" ], function(t) {
        var e = ye("ng-" + t);
        Lo[e] = function() {
            return {
                priority: 99,
                link: function(n, r, i) {
                    var o = t, a = t;
                    "href" === t && "[object SVGAnimatedString]" === Gr.call(r.prop("href")) && (a = "xlinkHref", 
                    i.$attr[a] = "xlink:href", o = null), i.$observe(e, function(e) {
                        e ? (i.$set(a, e), qr && o && r.prop(o, i[a])) : "href" === t && i.$set(a, null);
                    });
                }
            };
        };
    });
    var qo = {
        $addControl: v,
        $$renameControl: function(t, e) {
            t.$name = e;
        },
        $removeControl: v,
        $setValidity: v,
        $setDirty: v,
        $setPristine: v,
        $setSubmitted: v
    }, Uo = "ng-pending";
    pr.$inject = [ "$element", "$attrs", "$scope", "$animate", "$interpolate" ], pr.prototype = {
        $rollbackViewValue: function() {
            o(this.$$controls, function(t) {
                t.$rollbackViewValue();
            });
        },
        $commitViewValue: function() {
            o(this.$$controls, function(t) {
                t.$commitViewValue();
            });
        },
        $addControl: function(t) {
            vt(t.$name, "input"), this.$$controls.push(t), t.$name && (this[t.$name] = t), t.$$parentForm = this;
        },
        $$renameControl: function(t, e) {
            var n = t.$name;
            this[n] === t && delete this[n], (this[e] = t).$name = e;
        },
        $removeControl: function(t) {
            t.$name && this[t.$name] === t && delete this[t.$name], o(this.$pending, function(e, n) {
                this.$setValidity(n, null, t);
            }, this), o(this.$error, function(e, n) {
                this.$setValidity(n, null, t);
            }, this), o(this.$$success, function(e, n) {
                this.$setValidity(n, null, t);
            }, this), H(this.$$controls, t), t.$$parentForm = qo;
        },
        $setDirty: function() {
            this.$$animate.removeClass(this.$$element, Ea), this.$$animate.addClass(this.$$element, Ca), 
            this.$dirty = !0, this.$pristine = !1, this.$$parentForm.$setDirty();
        },
        $setPristine: function() {
            this.$$animate.setClass(this.$$element, Ea, Ca + " ng-submitted"), this.$dirty = !1, 
            this.$pristine = !0, this.$submitted = !1, o(this.$$controls, function(t) {
                t.$setPristine();
            });
        },
        $setUntouched: function() {
            o(this.$$controls, function(t) {
                t.$setUntouched();
            });
        },
        $setSubmitted: function() {
            this.$$animate.addClass(this.$$element, "ng-submitted"), this.$submitted = !0, this.$$parentForm.$setSubmitted();
        }
    }, vr({
        clazz: pr,
        set: function(t, e, n) {
            var r = t[e];
            r ? -1 === r.indexOf(n) && r.push(n) : t[e] = [ n ];
        },
        unset: function(t, e, n) {
            var r = t[e];
            r && (H(r, n), 0 === r.length && delete t[e]);
        }
    });
    var Ho = function(t) {
        return [ "$timeout", "$parse", function(e, n) {
            function r(t) {
                return "" === t ? n('this[""]').assign : n(t).assign || v;
            }
            return {
                name: "form",
                restrict: t ? "EAC" : "E",
                require: [ "form", "^^?form" ],
                controller: pr,
                compile: function(n, i) {
                    n.addClass(Ea).addClass(Sa);
                    var o = i.name ? "name" : !(!t || !i.ngForm) && "ngForm";
                    return {
                        pre: function(t, n, i, a) {
                            var s = a[0];
                            if (!("action" in i)) {
                                var u = function(e) {
                                    t.$apply(function() {
                                        s.$commitViewValue(), s.$setSubmitted();
                                    }), e.preventDefault();
                                };
                                n[0].addEventListener("submit", u), n.on("$destroy", function() {
                                    e(function() {
                                        n[0].removeEventListener("submit", u);
                                    }, 0, !1);
                                });
                            }
                            (a[1] || s.$$parentForm).$addControl(s);
                            var c = o ? r(s.$name) : v;
                            o && (c(t, s), i.$observe(o, function(e) {
                                s.$name !== e && (c(t, void 0), s.$$parentForm.$$renameControl(s, e), (c = r(s.$name))(t, s));
                            })), n.on("$destroy", function() {
                                s.$$parentForm.$removeControl(s), c(t, void 0), f(s, qo);
                            });
                        }
                    };
                }
            };
        } ];
    }, Fo = Ho(), Bo = Ho(!0), zo = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/, Wo = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i, Go = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/, Jo = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, Ko = /^(\d{4,})-(\d{2})-(\d{2})$/, Yo = /^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Zo = /^(\d{4,})-W(\d\d)$/, Qo = /^(\d{4,})-(\d\d)$/, Xo = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, ta = "keydown wheel mousedown", ea = gt();
    o("date,datetime-local,month,time,week".split(","), function(t) {
        ea[t] = !0;
    });
    var na = {
        text: function(t, e, n, r, i, o) {
            gr(0, e, n, r, i, o), mr(r);
        },
        date: wr("date", Ko, yr(Ko, [ "yyyy", "MM", "dd" ]), "yyyy-MM-dd"),
        "datetime-local": wr("datetimelocal", Yo, yr(Yo, [ "yyyy", "MM", "dd", "HH", "mm", "ss", "sss" ]), "yyyy-MM-ddTHH:mm:ss.sss"),
        time: wr("time", Xo, yr(Xo, [ "HH", "mm", "ss", "sss" ]), "HH:mm:ss.sss"),
        week: wr("week", Zo, function(t, e) {
            if (C(t)) return t;
            if (x(t)) {
                Zo.lastIndex = 0;
                var n = Zo.exec(t);
                if (n) {
                    var r = +n[1], i = +n[2], o = 0, a = 0, s = 0, u = 0, c = rr(r), l = 7 * (i - 1);
                    return e && (o = e.getHours(), a = e.getMinutes(), s = e.getSeconds(), u = e.getMilliseconds()), 
                    new Date(r, 0, c.getDate() + l, o, a, s, u);
                }
            }
            return NaN;
        }, "yyyy-Www"),
        month: wr("month", Qo, yr(Qo, [ "yyyy", "MM" ]), "yyyy-MM"),
        number: function(t, e, n, r, i, o) {
            var a, s, u;
            (br(0, e, 0, r), Sr(r), gr(0, e, n, r, i, o), (w(n.min) || n.ngMin) && (r.$validators.min = function(t) {
                return r.$isEmpty(t) || y(a) || a <= t;
            }, n.$observe("min", function(t) {
                a = xr(t), r.$validate();
            })), (w(n.max) || n.ngMax) && (r.$validators.max = function(t) {
                return r.$isEmpty(t) || y(s) || t <= s;
            }, n.$observe("max", function(t) {
                s = xr(t), r.$validate();
            })), w(n.step) || n.ngStep) && (r.$validators.step = function(t, e) {
                return r.$isEmpty(e) || y(u) || _r(e, a || 0, u);
            }, n.$observe("step", function(t) {
                u = xr(t), r.$validate();
            }));
        },
        url: function(t, e, n, r, i, o) {
            gr(0, e, n, r, i, o), mr(r), r.$$parserName = "url", r.$validators.url = function(t, e) {
                var n = t || e;
                return r.$isEmpty(n) || Wo.test(n);
            };
        },
        email: function(t, e, n, r, i, o) {
            gr(0, e, n, r, i, o), mr(r), r.$$parserName = "email", r.$validators.email = function(t, e) {
                var n = t || e;
                return r.$isEmpty(n) || Go.test(n);
            };
        },
        radio: function(t, e, n, r) {
            var i = !n.ngTrim || "false" !== ei(n.ngTrim);
            y(n.name) && e.attr("name", u()), e.on("click", function(t) {
                var o;
                e[0].checked && (o = n.value, i && (o = ei(o)), r.$setViewValue(o, t && t.type));
            }), r.$render = function() {
                var t = n.value;
                i && (t = ei(t)), e[0].checked = t === r.$viewValue;
            }, n.$observe("value", r.$render);
        },
        range: function(t, e, n, r, i, o) {
            function a(t, r) {
                e.attr(t, n[t]), n.$observe(t, r);
            }
            br(0, e, 0, r), Sr(r), gr(0, e, n, r, i, o);
            var s = r.$$hasNativeValidators && "range" === e[0].type, u = s ? 0 : void 0, c = s ? 100 : void 0, l = s ? 1 : void 0, f = e[0].validity, h = w(n.min), p = w(n.max), d = w(n.step), v = r.$render;
            r.$render = s && w(f.rangeUnderflow) && w(f.rangeOverflow) ? function() {
                v(), r.$setViewValue(e.val());
            } : v, h && (r.$validators.min = s ? function() {
                return !0;
            } : function(t, e) {
                return r.$isEmpty(e) || y(u) || u <= e;
            }, a("min", function(t) {
                if (u = xr(t), !Qr(r.$modelValue)) if (s) {
                    var n = e.val();
                    n < u && (n = u, e.val(n)), r.$setViewValue(n);
                } else r.$validate();
            })), p && (r.$validators.max = s ? function() {
                return !0;
            } : function(t, e) {
                return r.$isEmpty(e) || y(c) || e <= c;
            }, a("max", function(t) {
                if (c = xr(t), !Qr(r.$modelValue)) if (s) {
                    var n = e.val();
                    c < n && (e.val(c), n = c < u ? u : c), r.$setViewValue(n);
                } else r.$validate();
            })), d && (r.$validators.step = s ? function() {
                return !f.stepMismatch;
            } : function(t, e) {
                return r.$isEmpty(e) || y(l) || _r(e, u || 0, l);
            }, a("step", function(t) {
                l = xr(t), Qr(r.$modelValue) || (s && r.$viewValue !== e.val() ? r.$setViewValue(e.val()) : r.$validate());
            }));
        },
        checkbox: function(t, e, n, r, i, o, a, s) {
            var u = kr(s, t, "ngTrueValue", n.ngTrueValue, !0), c = kr(s, t, "ngFalseValue", n.ngFalseValue, !1);
            e.on("click", function(t) {
                r.$setViewValue(e[0].checked, t && t.type);
            }), r.$render = function() {
                e[0].checked = r.$viewValue;
            }, r.$isEmpty = function(t) {
                return !1 === t;
            }, r.$formatters.push(function(t) {
                return z(t, u);
            }), r.$parsers.push(function(t) {
                return t ? u : c;
            });
        },
        hidden: v,
        button: v,
        submit: v,
        reset: v,
        file: v
    }, ra = [ "$browser", "$sniffer", "$filter", "$parse", function(t, e, n, r) {
        return {
            restrict: "E",
            require: [ "?ngModel" ],
            link: {
                pre: function(i, o, a, s) {
                    s[0] && (na[Dr(a.type)] || na.text)(i, o, a, s[0], e, t, n, r);
                }
            }
        };
    } ], ia = /^(true|false|\d+)$/, oa = function() {
        function t(t, e, n) {
            var r = w(n) ? n : 9 === qr ? "" : null;
            t.prop("value", r), e.$set("value", n);
        }
        return {
            restrict: "A",
            priority: 100,
            compile: function(e, n) {
                return ia.test(n.ngValue) ? function(e, n, r) {
                    t(n, r, e.$eval(r.ngValue));
                } : function(e, n, r) {
                    e.$watch(r.ngValue, function(e) {
                        t(n, r, e);
                    });
                };
            }
        };
    }, aa = [ "$compile", function(t) {
        return {
            restrict: "AC",
            compile: function(e) {
                return t.$$addBindingClass(e), function(e, n, r) {
                    t.$$addBindingInfo(n, r.ngBind), n = n[0], e.$watch(r.ngBind, function(t) {
                        n.textContent = yt(t);
                    });
                };
            }
        };
    } ], sa = [ "$interpolate", "$compile", function(t, e) {
        return {
            compile: function(n) {
                return e.$$addBindingClass(n), function(n, r, i) {
                    var o = t(r.attr(i.$attr.ngBindTemplate));
                    e.$$addBindingInfo(r, o.expressions), r = r[0], i.$observe("ngBindTemplate", function(t) {
                        r.textContent = y(t) ? "" : t;
                    });
                };
            }
        };
    } ], ua = [ "$sce", "$parse", "$compile", function(t, e, n) {
        return {
            restrict: "A",
            compile: function(r, i) {
                var o = e(i.ngBindHtml), a = e(i.ngBindHtml, function(e) {
                    return t.valueOf(e);
                });
                return n.$$addBindingClass(r), function(e, r, i) {
                    n.$$addBindingInfo(r, i.ngBindHtml), e.$watch(a, function() {
                        var n = o(e);
                        r.html(t.getTrustedHtml(n) || "");
                    });
                };
            }
        };
    } ], ca = m({
        restrict: "A",
        require: "ngModel",
        link: function(t, e, n, r) {
            r.$viewChangeListeners.push(function() {
                t.$eval(n.ngChange);
            });
        }
    }), la = Or("", !0), fa = Or("Odd", 0), ha = Or("Even", 1), pa = hr({
        compile: function(t, e) {
            e.$set("ngCloak", void 0), t.removeClass("ng-cloak");
        }
    }), da = [ function() {
        return {
            restrict: "A",
            scope: !0,
            controller: "@",
            priority: 500
        };
    } ], va = {}, $a = {
        blur: !0,
        focus: !0
    };
    o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(t) {
        var e = ye("ng-" + t);
        va[e] = [ "$parse", "$rootScope", function(n, r) {
            return {
                restrict: "A",
                compile: function(i, o) {
                    var a = n(o[e]);
                    return function(e, n) {
                        n.on(t, function(n) {
                            var i = function() {
                                a(e, {
                                    $event: n
                                });
                            };
                            $a[t] && r.$$phase ? e.$evalAsync(i) : e.$apply(i);
                        });
                    };
                }
            };
        } ];
    });
    var ma = [ "$animate", "$compile", function(t, e) {
        return {
            multiElement: !0,
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function(n, r, i, o, a) {
                var s, u, c;
                n.$watch(i.ngIf, function(n) {
                    n ? u || a(function(n, o) {
                        u = o, n[n.length++] = e.$$createComment("end ngIf", i.ngIf), s = {
                            clone: n
                        }, t.enter(n, r.parent(), r);
                    }) : (c && (c.remove(), c = null), u && (u.$destroy(), u = null), s && (c = mt(s.clone), 
                    t.leave(c).done(function(t) {
                        !1 !== t && (c = null);
                    }), s = null));
                });
            }
        };
    } ], ga = [ "$templateRequest", "$anchorScroll", "$animate", function(t, e, n) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: Yr.noop,
            compile: function(r, i) {
                var o = i.ngInclude || i.src, a = i.onload || "", s = i.autoscroll;
                return function(r, i, u, c, l) {
                    var f, h, p, d = 0, v = function() {
                        h && (h.remove(), h = null), f && (f.$destroy(), f = null), p && (n.leave(p).done(function(t) {
                            !1 !== t && (h = null);
                        }), h = p, p = null);
                    };
                    r.$watch(o, function(o) {
                        var u = function(t) {
                            !1 === t || !w(s) || s && !r.$eval(s) || e();
                        }, h = ++d;
                        o ? (t(o, !0).then(function(t) {
                            if (!r.$$destroyed && h === d) {
                                var e = r.$new();
                                c.template = t;
                                var s = l(e, function(t) {
                                    v(), n.enter(t, null, i).done(u);
                                });
                                p = s, (f = e).$emit("$includeContentLoaded", o), r.$eval(a);
                            }
                        }, function() {
                            r.$$destroyed || h === d && (v(), r.$emit("$includeContentError", o));
                        }), r.$emit("$includeContentRequested", o)) : (v(), c.template = null);
                    });
                };
            }
        };
    } ], ya = [ "$compile", function(e) {
        return {
            restrict: "ECA",
            priority: -400,
            require: "ngInclude",
            link: function(n, r, i, o) {
                if (Gr.call(r[0]).match(/SVG/)) return r.empty(), void e(Tt(o.template, t.document).childNodes)(n, function(t) {
                    r.append(t);
                }, {
                    futureParentElement: r
                });
                r.html(o.template), e(r.contents())(n);
            }
        };
    } ], wa = hr({
        priority: 450,
        compile: function() {
            return {
                pre: function(t, e, n) {
                    t.$eval(n.ngInit);
                }
            };
        }
    }), ba = function() {
        return {
            restrict: "A",
            priority: 100,
            require: "ngModel",
            link: function(t, e, n, r) {
                var i = n.ngList || ", ", a = "false" !== n.ngTrim, s = a ? ei(i) : i;
                r.$parsers.push(function(t) {
                    if (!y(t)) {
                        var e = [];
                        return t && o(t.split(s), function(t) {
                            t && e.push(a ? ei(t) : t);
                        }), e;
                    }
                }), r.$formatters.push(function(t) {
                    if (Xr(t)) return t.join(i);
                }), r.$isEmpty = function(t) {
                    return !t || !t.length;
                };
            }
        };
    }, Sa = "ng-valid", xa = "ng-invalid", Ea = "ng-pristine", Ca = "ng-dirty", _a = r("ngModel");
    Rr.$inject = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$q", "$interpolate" ], 
    Rr.prototype = {
        $$initGetterSetters: function() {
            if (this.$options.getOption("getterSetter")) {
                var t = this.$$parse(this.$$attr.ngModel + "()"), e = this.$$parse(this.$$attr.ngModel + "($$$p)");
                this.$$ngModelGet = function(e) {
                    var n = this.$$parsedNgModel(e);
                    return k(n) && (n = t(e)), n;
                }, this.$$ngModelSet = function(t, n) {
                    k(this.$$parsedNgModel(t)) ? e(t, {
                        $$$p: n
                    }) : this.$$parsedNgModelAssign(t, n);
                };
            } else if (!this.$$parsedNgModel.assign) throw _a("nonassign", "Expression '{0}' is non-assignable. Element: {1}", this.$$attr.ngModel, et(this.$$element));
        },
        $render: v,
        $isEmpty: function(t) {
            return y(t) || "" === t || null === t || t != t;
        },
        $$updateEmptyClasses: function(t) {
            this.$isEmpty(t) ? (this.$$animate.removeClass(this.$$element, "ng-not-empty"), 
            this.$$animate.addClass(this.$$element, "ng-empty")) : (this.$$animate.removeClass(this.$$element, "ng-empty"), 
            this.$$animate.addClass(this.$$element, "ng-not-empty"));
        },
        $setPristine: function() {
            this.$dirty = !1, this.$pristine = !0, this.$$animate.removeClass(this.$$element, Ca), 
            this.$$animate.addClass(this.$$element, Ea);
        },
        $setDirty: function() {
            this.$dirty = !0, this.$pristine = !1, this.$$animate.removeClass(this.$$element, Ea), 
            this.$$animate.addClass(this.$$element, Ca), this.$$parentForm.$setDirty();
        },
        $setUntouched: function() {
            this.$touched = !1, this.$untouched = !0, this.$$animate.setClass(this.$$element, "ng-untouched", "ng-touched");
        },
        $setTouched: function() {
            this.$touched = !0, this.$untouched = !1, this.$$animate.setClass(this.$$element, "ng-touched", "ng-untouched");
        },
        $rollbackViewValue: function() {
            this.$$timeout.cancel(this.$$pendingDebounce), this.$viewValue = this.$$lastCommittedViewValue, 
            this.$render();
        },
        $validate: function() {
            if (!Qr(this.$modelValue)) {
                var t = this.$$lastCommittedViewValue, e = this.$$rawModelValue, n = this.$valid, r = this.$modelValue, i = this.$options.getOption("allowInvalid"), o = this;
                this.$$runValidators(e, t, function(t) {
                    i || n === t || (o.$modelValue = t ? e : void 0, o.$modelValue !== r && o.$$writeModelToScope());
                });
            }
        },
        $$runValidators: function(t, e, n) {
            function r(t, e) {
                a === s.$$currentValidationRunId && s.$setValidity(t, e);
            }
            function i(t) {
                a === s.$$currentValidationRunId && n(t);
            }
            this.$$currentValidationRunId++;
            var a = this.$$currentValidationRunId, s = this;
            !function() {
                var t = s.$$parserName || "parse";
                return y(s.$$parserValid) ? (r(t, null), !0) : (s.$$parserValid || (o(s.$validators, function(t, e) {
                    r(e, null);
                }), o(s.$asyncValidators, function(t, e) {
                    r(e, null);
                })), r(t, s.$$parserValid), s.$$parserValid);
            }() ? i(!1) : function() {
                var n = !0;
                return o(s.$validators, function(i, o) {
                    var a = Boolean(i(t, e));
                    n = n && a, r(o, a);
                }), !!n || (o(s.$asyncValidators, function(t, e) {
                    r(e, null);
                }), !1);
            }() ? function() {
                var n = [], a = !0;
                o(s.$asyncValidators, function(i, o) {
                    var s = i(t, e);
                    if (!I(s)) throw _a("nopromise", "Expected asynchronous validator to return a promise but got '{0}' instead.", s);
                    r(o, void 0), n.push(s.then(function() {
                        r(o, !0);
                    }, function() {
                        r(o, a = !1);
                    }));
                }), n.length ? s.$$q.all(n).then(function() {
                    i(a);
                }, v) : i(!0);
            }() : i(!1);
        },
        $commitViewValue: function() {
            var t = this.$viewValue;
            this.$$timeout.cancel(this.$$pendingDebounce), (this.$$lastCommittedViewValue !== t || "" === t && this.$$hasNativeValidators) && (this.$$updateEmptyClasses(t), 
            this.$$lastCommittedViewValue = t, this.$pristine && this.$setDirty(), this.$$parseAndValidate());
        },
        $$parseAndValidate: function() {
            function t() {
                n.$modelValue !== i && n.$$writeModelToScope();
            }
            var e = this.$$lastCommittedViewValue, n = this;
            if (this.$$parserValid = !y(e) || void 0, this.$$parserValid) for (var r = 0; r < this.$parsers.length; r++) if (y(e = this.$parsers[r](e))) {
                this.$$parserValid = !1;
                break;
            }
            Qr(this.$modelValue) && (this.$modelValue = this.$$ngModelGet(this.$$scope));
            var i = this.$modelValue, o = this.$options.getOption("allowInvalid");
            this.$$rawModelValue = e, o && (this.$modelValue = e, t()), this.$$runValidators(e, this.$$lastCommittedViewValue, function(r) {
                o || (n.$modelValue = r ? e : void 0, t());
            });
        },
        $$writeModelToScope: function() {
            this.$$ngModelSet(this.$$scope, this.$modelValue), o(this.$viewChangeListeners, function(t) {
                try {
                    t();
                } catch (t) {
                    this.$$exceptionHandler(t);
                }
            }, this);
        },
        $setViewValue: function(t, e) {
            this.$viewValue = t, this.$options.getOption("updateOnDefault") && this.$$debounceViewValueCommit(e);
        },
        $$debounceViewValueCommit: function(t) {
            var e = this.$options.getOption("debounce");
            E(e[t]) ? e = e[t] : E(e.default) && (e = e.default), this.$$timeout.cancel(this.$$pendingDebounce);
            var n = this;
            0 < e ? this.$$pendingDebounce = this.$$timeout(function() {
                n.$commitViewValue();
            }, e) : this.$$scope.$root.$$phase ? this.$commitViewValue() : this.$$scope.$apply(function() {
                n.$commitViewValue();
            });
        },
        $overrideModelOptions: function(t) {
            this.$options = this.$options.createChild(t);
        }
    }, vr({
        clazz: Rr,
        set: function(t, e) {
            t[e] = !0;
        },
        unset: function(t, e) {
            delete t[e];
        }
    });
    var ka, Oa = [ "$rootScope", function(t) {
        return {
            restrict: "A",
            require: [ "ngModel", "^?form", "^?ngModelOptions" ],
            controller: Rr,
            priority: 1,
            compile: function(e) {
                return e.addClass(Ea).addClass("ng-untouched").addClass(Sa), {
                    pre: function(t, e, n, r) {
                        var i = r[0], o = r[1] || i.$$parentForm, a = r[2];
                        a && (i.$options = a.$options), i.$$initGetterSetters(), o.$addControl(i), n.$observe("name", function(t) {
                            i.$name !== t && i.$$parentForm.$$renameControl(i, t);
                        }), t.$on("$destroy", function() {
                            i.$$parentForm.$removeControl(i);
                        });
                    },
                    post: function(e, n, r, i) {
                        function o() {
                            a.$setTouched();
                        }
                        var a = i[0];
                        a.$options.getOption("updateOn") && n.on(a.$options.getOption("updateOn"), function(t) {
                            a.$$debounceViewValueCommit(t && t.type);
                        }), n.on("blur", function() {
                            a.$touched || (t.$$phase ? e.$evalAsync(o) : e.$apply(o));
                        });
                    }
                };
            }
        };
    } ], Ra = /(\s+|^)default(\s+|$)/;
    Ar.prototype = {
        getOption: function(t) {
            return this.$$options[t];
        },
        createChild: function(t) {
            var e = !1;
            return o(t = f({}, t), function(n, r) {
                "$inherit" === n ? "*" === r ? e = !0 : (t[r] = this.$$options[r], "updateOn" === r && (t.updateOnDefault = this.$$options.updateOnDefault)) : "updateOn" === r && (t.updateOnDefault = !1, 
                t[r] = ei(n.replace(Ra, function() {
                    return t.updateOnDefault = !0, " ";
                })));
            }, this), e && (delete t["*"], Pr(t, this.$$options)), Pr(t, ka.$$options), new Ar(t);
        }
    }, ka = new Ar({
        updateOn: "",
        updateOnDefault: !0,
        debounce: 0,
        getterSetter: !1,
        allowInvalid: !1,
        timezone: null
    });
    var Ta = function() {
        function t(t, e) {
            this.$$attrs = t, this.$$scope = e;
        }
        return t.$inject = [ "$attrs", "$scope" ], t.prototype = {
            $onInit: function() {
                var t = this.parentCtrl ? this.parentCtrl.$options : ka, e = this.$$scope.$eval(this.$$attrs.ngModelOptions);
                this.$options = t.createChild(e);
            }
        }, {
            restrict: "A",
            priority: 10,
            require: {
                parentCtrl: "?^^ngModelOptions"
            },
            bindToController: !0,
            controller: t
        };
    }, Aa = hr({
        terminal: !0,
        priority: 1e3
    }), Pa = r("ngOptions"), Va = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([$\w][$\w]*)|(?:\(\s*([$\w][$\w]*)\s*,\s*([$\w][$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, ja = [ "$compile", "$document", "$parse", function(e, n, r) {
        function a(t, e, n) {
            function o(t, e, n, r, i) {
                this.selectValue = t, this.viewValue = e, this.label = n, this.group = r, this.disabled = i;
            }
            function a(t) {
                var e;
                if (!c && i(t)) e = t; else for (var n in e = [], t) t.hasOwnProperty(n) && "$" !== n.charAt(0) && e.push(n);
                return e;
            }
            var s = t.match(Va);
            if (!s) throw Pa("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", t, et(e));
            var u = s[5] || s[7], c = s[6], l = / as /.test(s[0]) && s[1], f = s[9], h = r(s[2] ? s[1] : u), p = l && r(l) || h, d = f && r(f), v = f ? function(t, e) {
                return d(n, e);
            } : function(t) {
                return ne(t);
            }, $ = function(t, e) {
                return v(t, S(t, e));
            }, m = r(s[2] || s[1]), g = r(s[3] || ""), y = r(s[4] || ""), w = r(s[8]), b = {}, S = c ? function(t, e) {
                return b[c] = e, b[u] = t, b;
            } : function(t) {
                return b[u] = t, b;
            };
            return {
                trackBy: f,
                getTrackByValue: $,
                getWatchables: r(w, function(t) {
                    for (var e = [], r = a(t = t || []), i = r.length, o = 0; o < i; o++) {
                        var u = t === r ? o : r[o], c = t[u], l = S(c, u), f = v(c, l);
                        if (e.push(f), s[2] || s[1]) {
                            var h = m(n, l);
                            e.push(h);
                        }
                        if (s[4]) {
                            var p = y(n, l);
                            e.push(p);
                        }
                    }
                    return e;
                }),
                getOptions: function() {
                    for (var t = [], e = {}, r = w(n) || [], i = a(r), s = i.length, u = 0; u < s; u++) {
                        var c = r === i ? u : i[u], l = S(r[c], c), h = p(n, l), d = v(h, l), b = new o(d, h, m(n, l), g(n, l), y(n, l));
                        t.push(b), e[d] = b;
                    }
                    return {
                        items: t,
                        selectValueMap: e,
                        getOptionFromViewValue: function(t) {
                            return e[$(t)];
                        },
                        getViewValueFromOption: function(t) {
                            return f ? F(t.viewValue) : t.viewValue;
                        }
                    };
                }
            };
        }
        var s = t.document.createElement("option"), u = t.document.createElement("optgroup");
        return {
            restrict: "A",
            terminal: !0,
            require: [ "select", "ngModel" ],
            link: {
                pre: function(t, e, n, r) {
                    r[0].registerOption = v;
                },
                post: function(t, r, i, c) {
                    function l(t, e) {
                        var n = s.cloneNode(!1);
                        e.appendChild(n), function(t, e) {
                            (t.element = e).disabled = t.disabled, t.label !== e.label && (e.label = t.label, 
                            e.textContent = t.label), e.value = t.selectValue;
                        }(t, n);
                    }
                    function f(t) {
                        var e = b.getOptionFromViewValue(t), n = e && e.element;
                        return n && !n.selected && (n.selected = !0), e;
                    }
                    for (var p = c[0], d = c[1], v = i.multiple, $ = 0, m = r.children(), g = m.length; $ < g; $++) if ("" === m[$].value) {
                        p.hasEmptyOption = !0, p.emptyOption = m.eq($);
                        break;
                    }
                    r.empty();
                    var y = !!p.emptyOption;
                    Ur(s.cloneNode(!1)).val("?");
                    var b, S = a(i.ngOptions, r, t), x = n[0].createDocumentFragment();
                    p.generateUnknownOptionValue = function(t) {
                        return "?";
                    }, v ? (p.writeValue = function(t) {
                        if (b) {
                            var e = t && t.map(f) || [];
                            b.items.forEach(function(t) {
                                t.element.selected && !U(e, t) && (t.element.selected = !1);
                            });
                        }
                    }, p.readValue = function() {
                        var t = [];
                        return o(r.val() || [], function(e) {
                            var n = b.selectValueMap[e];
                            n && !n.disabled && t.push(b.getViewValueFromOption(n));
                        }), t;
                    }, S.trackBy && t.$watchCollection(function() {
                        if (Xr(d.$viewValue)) return d.$viewValue.map(function(t) {
                            return S.getTrackByValue(t);
                        });
                    }, function() {
                        d.$render();
                    })) : (p.writeValue = function(t) {
                        if (b) {
                            var e = r[0].options[r[0].selectedIndex], n = b.getOptionFromViewValue(t);
                            e && e.removeAttribute("selected"), n ? (r[0].value !== n.selectValue && (p.removeUnknownOption(), 
                            r[0].value = n.selectValue, n.element.selected = !0), n.element.setAttribute("selected", "selected")) : p.selectUnknownOrEmptyOption(t);
                        }
                    }, p.readValue = function() {
                        var t = b.selectValueMap[r.val()];
                        return t && !t.disabled ? (p.unselectEmptyOption(), p.removeUnknownOption(), b.getViewValueFromOption(t)) : null;
                    }, S.trackBy && t.$watch(function() {
                        return S.getTrackByValue(d.$viewValue);
                    }, function() {
                        d.$render();
                    })), y && (e(p.emptyOption)(t), r.prepend(p.emptyOption), p.emptyOption[0].nodeType === hi ? (p.hasEmptyOption = !1, 
                    p.registerOption = function(t, e) {
                        "" === e.val() && (p.hasEmptyOption = !0, p.emptyOption = e, p.emptyOption.removeClass("ng-scope"), 
                        d.$render(), e.on("$destroy", function() {
                            var t = p.$isEmptyOptionSelected();
                            p.hasEmptyOption = !1, p.emptyOption = void 0, t && d.$render();
                        }));
                    }) : p.emptyOption.removeClass("ng-scope")), t.$watchCollection(S.getWatchables, function() {
                        var t = b && p.readValue();
                        if (b) for (var e = b.items.length - 1; 0 <= e; e--) {
                            var n = b.items[e];
                            Gt(w(n.group) ? n.element.parentNode : n.element);
                        }
                        var i = {};
                        if ((b = S.getOptions()).items.forEach(function(t) {
                            var e;
                            w(t.group) ? ((e = i[t.group]) || (e = u.cloneNode(!1), x.appendChild(e), e.label = null === t.group ? "null" : t.group, 
                            i[t.group] = e), l(t, e)) : l(t, x);
                        }), r[0].appendChild(x), d.$render(), !d.$isEmpty(t)) {
                            var o = p.readValue();
                            (S.trackBy || v ? z(t, o) : t === o) || (d.$setViewValue(o), d.$render());
                        }
                    });
                }
            }
        };
    } ], Ia = [ "$locale", "$interpolate", "$log", function(t, e, n) {
        var r = /{}/g, i = /^when(Minus)?(.+)$/;
        return {
            link: function(a, s, u) {
                function c(t) {
                    s.text(t || "");
                }
                var l, f = u.count, h = u.$attr.when && s.attr(u.$attr.when), p = u.offset || 0, d = a.$eval(h) || {}, $ = {}, m = e.startSymbol(), g = e.endSymbol(), w = m + f + "-" + p + g, b = Yr.noop;
                o(u, function(t, e) {
                    var n = i.exec(e);
                    if (n) {
                        var r = (n[1] ? "-" : "") + Dr(n[2]);
                        d[r] = s.attr(u.$attr[e]);
                    }
                }), o(d, function(t, n) {
                    $[n] = e(t.replace(r, w));
                }), a.$watch(f, function(e) {
                    var r = parseFloat(e), i = Qr(r);
                    if (i || r in d || (r = t.pluralCat(r - p)), !(r === l || i && Qr(l))) {
                        b();
                        var o = $[r];
                        y(o) ? (null != e && n.debug("ngPluralize: no rule defined for '" + r + "' in " + h), 
                        b = v, c()) : b = a.$watch(o, c), l = r;
                    }
                });
            }
        };
    } ], Ma = [ "$parse", "$animate", "$compile", function(t, e, n) {
        var a = r("ngRepeat"), s = function(t, e, n, r, i, o, a) {
            t[n] = r, i && (t[i] = o), t.$index = e, t.$first = 0 === e, t.$last = e === a - 1, 
            t.$middle = !(t.$first || t.$last), t.$odd = !(t.$even = 0 == (1 & e));
        }, u = function(t) {
            return t.clone[0];
        }, c = function(t) {
            return t.clone[t.clone.length - 1];
        };
        return {
            restrict: "A",
            multiElement: !0,
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            $$tlb: !0,
            compile: function(r, l) {
                var f = l.ngRepeat, h = n.$$createComment("end ngRepeat", f), p = f.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!p) throw a("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", f);
                var d = p[1], v = p[2], $ = p[3], m = p[4];
                if (!(p = d.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/))) throw a("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", d);
                var g = p[3] || p[1], y = p[2];
                if ($ && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test($) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test($))) throw a("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", $);
                var w, b, S, x, E = {
                    $id: ne
                };
                return m ? w = t(m) : (S = function(t, e) {
                    return ne(e);
                }, x = function(t) {
                    return t;
                }), function(t, n, r, l, p) {
                    w && (b = function(e, n, r) {
                        return y && (E[y] = e), E[g] = n, E.$index = r, w(t, E);
                    });
                    var d = gt();
                    t.$watchCollection(v, function(r) {
                        var l, v, m, w, E, C, _, k, O, R, T, A, P = n[0], V = gt();
                        if ($ && (t[$] = r), i(r)) O = r, k = b || S; else for (var j in k = b || x, O = [], 
                        r) Nr.call(r, j) && "$" !== j.charAt(0) && O.push(j);
                        for (w = O.length, T = new Array(w), l = 0; l < w; l++) if (E = r === O ? l : O[l], 
                        C = r[E], _ = k(E, C, l), d[_]) R = d[_], delete d[_], V[_] = R, T[l] = R; else {
                            if (V[_]) throw o(T, function(t) {
                                t && t.scope && (d[t.id] = t);
                            }), a("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", f, _, C);
                            T[l] = {
                                id: _,
                                scope: void 0,
                                clone: void 0
                            }, V[_] = !0;
                        }
                        for (var I in d) {
                            if (A = mt((R = d[I]).clone), e.leave(A), A[0].parentNode) for (l = 0, v = A.length; l < v; l++) A[l].$$NG_REMOVED = !0;
                            R.scope.$destroy();
                        }
                        for (l = 0; l < w; l++) if (E = r === O ? l : O[l], C = r[E], (R = T[l]).scope) {
                            for (m = P; (m = m.nextSibling) && m.$$NG_REMOVED; ) ;
                            u(R) !== m && e.move(mt(R.clone), null, P), P = c(R), s(R.scope, l, g, C, y, E, w);
                        } else p(function(t, n) {
                            R.scope = n;
                            var r = h.cloneNode(!1);
                            t[t.length++] = r, e.enter(t, null, P), P = r, R.clone = t, V[R.id] = R, s(R.scope, l, g, C, y, E, w);
                        });
                        d = V;
                    });
                };
            }
        };
    } ], Na = [ "$animate", function(t) {
        return {
            restrict: "A",
            multiElement: !0,
            link: function(e, n, r) {
                e.$watch(r.ngShow, function(e) {
                    t[e ? "removeClass" : "addClass"](n, "ng-hide", {
                        tempClasses: "ng-hide-animate"
                    });
                });
            }
        };
    } ], Da = [ "$animate", function(t) {
        return {
            restrict: "A",
            multiElement: !0,
            link: function(e, n, r) {
                e.$watch(r.ngHide, function(e) {
                    t[e ? "addClass" : "removeClass"](n, "ng-hide", {
                        tempClasses: "ng-hide-animate"
                    });
                });
            }
        };
    } ], La = hr(function(t, e, n) {
        t.$watch(n.ngStyle, function(t, n) {
            n && t !== n && o(n, function(t, n) {
                e.css(n, "");
            }), t && e.css(t);
        }, !0);
    }), qa = [ "$animate", "$compile", function(t, e) {
        return {
            require: "ngSwitch",
            controller: [ "$scope", function() {
                this.cases = {};
            } ],
            link: function(n, r, i, a) {
                var s = i.ngSwitch || i.on, u = [], c = [], l = [], f = [], h = function(t, e) {
                    return function(n) {
                        !1 !== n && t.splice(e, 1);
                    };
                };
                n.$watch(s, function(n) {
                    for (var r, i; l.length; ) t.cancel(l.pop());
                    for (r = 0, i = f.length; r < i; ++r) {
                        var s = mt(c[r].clone);
                        f[r].$destroy(), (l[r] = t.leave(s)).done(h(l, r));
                    }
                    c.length = 0, f.length = 0, (u = a.cases["!" + n] || a.cases["?"]) && o(u, function(n) {
                        n.transclude(function(r, i) {
                            f.push(i);
                            var o = n.element;
                            r[r.length++] = e.$$createComment("end ngSwitchWhen");
                            var a = {
                                clone: r
                            };
                            c.push(a), t.enter(r, o.parent(), o);
                        });
                    });
                });
            }
        };
    } ], Ua = hr({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(t, e, n, r, i) {
            o(n.ngSwitchWhen.split(n.ngSwitchWhenSeparator).sort().filter(function(t, e, n) {
                return n[e - 1] !== t;
            }), function(t) {
                r.cases["!" + t] = r.cases["!" + t] || [], r.cases["!" + t].push({
                    transclude: i,
                    element: e
                });
            });
        }
    }), Ha = hr({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(t, e, n, r, i) {
            r.cases["?"] = r.cases["?"] || [], r.cases["?"].push({
                transclude: i,
                element: e
            });
        }
    }), Fa = r("ngTransclude"), Ba = [ "$compile", function(t) {
        return {
            restrict: "EAC",
            terminal: !0,
            compile: function(e) {
                var n = t(e.contents());
                return e.empty(), function(t, e, r, i, o) {
                    function a() {
                        n(t, function(t) {
                            e.append(t);
                        });
                    }
                    if (!o) throw Fa("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", et(e));
                    r.ngTransclude === r.$attr.ngTransclude && (r.ngTransclude = "");
                    var u = r.ngTransclude || r.ngTranscludeSlot;
                    o(function(t, n) {
                        t.length && function(t) {
                            for (var e = 0, n = t.length; e < n; e++) {
                                var r = t[e];
                                if (r.nodeType !== fi || r.nodeValue.trim()) return !0;
                            }
                        }(t) ? e.append(t) : (a(), n.$destroy());
                    }, null, u), u && !o.isSlotFilled(u) && a();
                };
            }
        };
    } ], za = [ "$templateCache", function(t) {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(e, n) {
                if ("text/ng-template" === n.type) {
                    var r = n.id, i = e[0].text;
                    t.put(r, i);
                }
            }
        };
    } ], Wa = {
        $setViewValue: v,
        $render: v
    }, Ga = [ "$element", "$scope", function(e, n) {
        function r() {
            s || (s = !0, n.$$postDigest(function() {
                s = !1, o.ngModelCtrl.$render();
            }));
        }
        function i(t) {
            u || (u = !0, n.$$postDigest(function() {
                n.$$destroyed || (u = !1, o.ngModelCtrl.$setViewValue(o.readValue()), t && o.ngModelCtrl.$render());
            }));
        }
        var o = this, a = new Vi();
        o.selectValueMap = {}, o.ngModelCtrl = Wa, o.multiple = !1, o.unknownOption = Ur(t.document.createElement("option")), 
        o.hasEmptyOption = !1, o.emptyOption = void 0, o.renderUnknownOption = function(t) {
            var n = o.generateUnknownOptionValue(t);
            o.unknownOption.val(n), e.prepend(o.unknownOption), Vr(o.unknownOption, !0), e.val(n);
        }, o.updateUnknownOption = function(t) {
            var n = o.generateUnknownOptionValue(t);
            o.unknownOption.val(n), Vr(o.unknownOption, !0), e.val(n);
        }, o.generateUnknownOptionValue = function(t) {
            return "? " + ne(t) + " ?";
        }, o.removeUnknownOption = function() {
            o.unknownOption.parent() && o.unknownOption.remove();
        }, o.selectEmptyOption = function() {
            o.emptyOption && (e.val(""), Vr(o.emptyOption, !0));
        }, o.unselectEmptyOption = function() {
            o.hasEmptyOption && Vr(o.emptyOption, !1);
        }, n.$on("$destroy", function() {
            o.renderUnknownOption = v;
        }), o.readValue = function() {
            var t = e.val(), n = t in o.selectValueMap ? o.selectValueMap[t] : t;
            return o.hasOption(n) ? n : null;
        }, o.writeValue = function(t) {
            var n = e[0].options[e[0].selectedIndex];
            if (n && Vr(Ur(n), !1), o.hasOption(t)) {
                o.removeUnknownOption();
                var r = ne(t);
                e.val(r in o.selectValueMap ? r : t);
                var i = e[0].options[e[0].selectedIndex];
                Vr(Ur(i), !0);
            } else o.selectUnknownOrEmptyOption(t);
        }, o.addOption = function(t, e) {
            if (e[0].nodeType !== hi) {
                vt(t, '"option value"'), "" === t && (o.hasEmptyOption = !0, o.emptyOption = e);
                var n = a.get(t) || 0;
                a.set(t, n + 1), r();
            }
        }, o.removeOption = function(t) {
            var e = a.get(t);
            e && (1 === e ? (a.delete(t), "" === t && (o.hasEmptyOption = !1, o.emptyOption = void 0)) : a.set(t, e - 1));
        }, o.hasOption = function(t) {
            return !!a.get(t);
        }, o.$hasEmptyOption = function() {
            return o.hasEmptyOption;
        }, o.$isUnknownOptionSelected = function() {
            return e[0].options[0] === o.unknownOption[0];
        }, o.$isEmptyOptionSelected = function() {
            return o.hasEmptyOption && e[0].options[e[0].selectedIndex] === o.emptyOption[0];
        };
        var s = !(o.selectUnknownOrEmptyOption = function(t) {
            null == t && o.emptyOption ? (o.removeUnknownOption(), o.selectEmptyOption()) : o.unknownOption.parent().length ? o.updateUnknownOption(t) : o.renderUnknownOption(t);
        }), u = !1;
        o.registerOption = function(t, e, n, a, s) {
            if (n.$attr.ngValue) {
                var u, c = NaN;
                n.$observe("value", function(t) {
                    var n, r = e.prop("selected");
                    w(c) && (o.removeOption(u), delete o.selectValueMap[c], n = !0), c = ne(t), u = t, 
                    o.selectValueMap[c] = t, o.addOption(t, e), e.attr("value", c), n && r && i();
                });
            } else a ? n.$observe("value", function(t) {
                o.readValue();
                var n, r = e.prop("selected");
                w(u) && (o.removeOption(u), n = !0), u = t, o.addOption(t, e), n && r && i();
            }) : s ? t.$watch(s, function(t, r) {
                n.$set("value", t);
                var a = e.prop("selected");
                r !== t && o.removeOption(r), o.addOption(t, e), r && a && i();
            }) : o.addOption(n.value, e);
            n.$observe("disabled", function(t) {
                ("true" === t || t && e.prop("selected")) && (o.multiple ? i(!0) : (o.ngModelCtrl.$setViewValue(null), 
                o.ngModelCtrl.$render()));
            }), e.on("$destroy", function() {
                var t = o.readValue(), e = n.value;
                o.removeOption(e), r(), (o.multiple && t && -1 !== t.indexOf(e) || t === e) && i(!0);
            });
        };
    } ], Ja = function() {
        return {
            restrict: "E",
            require: [ "select", "?ngModel" ],
            controller: Ga,
            priority: 1,
            link: {
                pre: function(t, e, n, r) {
                    var i = r[0], a = r[1];
                    if (a) {
                        if (i.ngModelCtrl = a, e.on("change", function() {
                            i.removeUnknownOption(), t.$apply(function() {
                                a.$setViewValue(i.readValue());
                            });
                        }), n.multiple) {
                            i.multiple = !0, i.readValue = function() {
                                var t = [];
                                return o(e.find("option"), function(e) {
                                    if (e.selected && !e.disabled) {
                                        var n = e.value;
                                        t.push(n in i.selectValueMap ? i.selectValueMap[n] : n);
                                    }
                                }), t;
                            }, i.writeValue = function(t) {
                                o(e.find("option"), function(e) {
                                    var n = !!t && (U(t, e.value) || U(t, i.selectValueMap[e.value]));
                                    n !== e.selected && Vr(Ur(e), n);
                                });
                            };
                            var s, u = NaN;
                            t.$watch(function() {
                                u !== a.$viewValue || z(s, a.$viewValue) || (s = bt(a.$viewValue), a.$render()), 
                                u = a.$viewValue;
                            }), a.$isEmpty = function(t) {
                                return !t || 0 === t.length;
                            };
                        }
                    } else i.registerOption = v;
                },
                post: function(t, e, n, r) {
                    var i = r[1];
                    if (i) {
                        var o = r[0];
                        i.$render = function() {
                            o.writeValue(i.$viewValue);
                        };
                    }
                }
            }
        };
    }, Ka = [ "$interpolate", function(t) {
        return {
            restrict: "E",
            priority: 100,
            compile: function(e, n) {
                var r, i;
                return w(n.ngValue) || (w(n.value) ? r = t(n.value, !0) : (i = t(e.text(), !0)) || n.$set("value", e.text())), 
                function(t, e, n) {
                    var o = e.parent(), a = o.data("$selectController") || o.parent().data("$selectController");
                    a && a.registerOption(t, e, n, r, i);
                };
            }
        };
    } ], Ya = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(t, e, n, r) {
                r && (n.required = !0, r.$validators.required = function(t, e) {
                    return !n.required || !r.$isEmpty(e);
                }, n.$observe("required", function() {
                    r.$validate();
                }));
            }
        };
    }, Za = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(t, e, n, i) {
                if (i) {
                    var o, a = n.ngPattern || n.pattern;
                    n.$observe("pattern", function(t) {
                        if (x(t) && 0 < t.length && (t = new RegExp("^" + t + "$")), t && !t.test) throw r("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", a, t, et(e));
                        o = t || void 0, i.$validate();
                    }), i.$validators.pattern = function(t, e) {
                        return i.$isEmpty(e) || y(o) || o.test(e);
                    };
                }
            }
        };
    }, Qa = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(t, e, n, r) {
                if (r) {
                    var i = -1;
                    n.$observe("maxlength", function(t) {
                        var e = p(t);
                        i = Qr(e) ? -1 : e, r.$validate();
                    }), r.$validators.maxlength = function(t, e) {
                        return i < 0 || r.$isEmpty(e) || e.length <= i;
                    };
                }
            }
        };
    }, Xa = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(t, e, n, r) {
                if (r) {
                    var i = 0;
                    n.$observe("minlength", function(t) {
                        i = p(t) || 0, r.$validate();
                    }), r.$validators.minlength = function(t, e) {
                        return r.$isEmpty(e) || e.length >= i;
                    };
                }
            }
        };
    };
    t.angular.bootstrap ? t.console && console.log("WARNING: Tried to load angular more than once.") : (function() {
        var e;
        if (!ci) {
            var n = ii();
            (Hr = y(n) ? t.jQuery : n ? t[n] : void 0) && Hr.fn.on ? (f((Ur = Hr).fn, {
                scope: Oi.scope,
                isolateScope: Oi.isolateScope,
                controller: Oi.controller,
                injector: Oi.injector,
                inheritedData: Oi.inheritedData
            }), e = Hr.cleanData, Hr.cleanData = function(t) {
                for (var n, r, i = 0; null != (r = t[i]); i++) (n = Hr._data(r, "events")) && n.$destroy && Hr(r).triggerHandler("$destroy");
                e(t);
            }) : Ur = Vt, Yr.element = Ur, ci = !0;
        }
    }(), f(Yr, {
        errorHandlingConfig: e,
        bootstrap: ct,
        copy: F,
        extend: f,
        merge: h,
        equals: z,
        element: Ur,
        forEach: o,
        injector: se,
        noop: v,
        bind: J,
        toJson: Y,
        fromJson: Z,
        identity: $,
        isUndefined: y,
        isDefined: w,
        isString: x,
        isFunction: k,
        isObject: b,
        isNumber: E,
        isElement: D,
        isArray: Xr,
        version: vi,
        isDate: C,
        lowercase: Dr,
        uppercase: Lr,
        callbacks: {
            $$counter: 0
        },
        getTestability: ft,
        reloadWithDebugInfo: lt,
        $$minErr: r,
        $$csp: ri,
        $$encodeUriSegment: ot,
        $$encodeUriQuery: at,
        $$stringify: yt
    }), (Fr = function(t) {
        function e(t, e, n) {
            return t[e] || (t[e] = n());
        }
        var n = r("$injector"), i = r("ng"), o = e(t, "angular", Object);
        return o.$$minErr = o.$$minErr || r, e(o, "module", function() {
            var t = {};
            return function(r, o, a) {
                var s = {};
                return function(t, e) {
                    if ("hasOwnProperty" === r) throw i("badname", "hasOwnProperty is not a valid {0} name", "module");
                }(), o && t.hasOwnProperty(r) && (t[r] = null), e(t, r, function() {
                    function t(t, e, n, r) {
                        return r || (r = u), function() {
                            return r[n || "push"]([ t, e, arguments ]), h;
                        };
                    }
                    function e(t, e, n) {
                        return n || (n = u), function(i, o) {
                            return o && k(o) && (o.$$moduleName = r), n.push([ t, e, arguments ]), h;
                        };
                    }
                    if (!o) throw n("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", r);
                    var u = [], c = [], l = [], f = t("$injector", "invoke", "push", c), h = {
                        _invokeQueue: u,
                        _configBlocks: c,
                        _runBlocks: l,
                        info: function(t) {
                            if (w(t)) {
                                if (!b(t)) throw i("aobj", "Argument '{0}' must be an object", "value");
                                return s = t, this;
                            }
                            return s;
                        },
                        requires: o,
                        name: r,
                        provider: e("$provide", "provider"),
                        factory: e("$provide", "factory"),
                        service: e("$provide", "service"),
                        value: t("$provide", "value"),
                        constant: t("$provide", "constant", "unshift"),
                        decorator: e("$provide", "decorator", c),
                        animation: e("$animateProvider", "register"),
                        filter: e("$filterProvider", "register"),
                        controller: e("$controllerProvider", "register"),
                        directive: e("$compileProvider", "directive"),
                        component: e("$compileProvider", "component"),
                        config: f,
                        run: function(t) {
                            return l.push(t), this;
                        }
                    };
                    return a && f(a), h;
                });
            };
        });
    }(t))("ng", [ "ngLocale" ], [ "$provide", function(t) {
        t.provider({
            $$sanitizeUri: Rn
        }), t.provider("$compile", me).directive({
            a: Do,
            input: ra,
            textarea: ra,
            form: Fo,
            script: za,
            select: Ja,
            option: Ka,
            ngBind: aa,
            ngBindHtml: ua,
            ngBindTemplate: sa,
            ngClass: la,
            ngClassEven: ha,
            ngClassOdd: fa,
            ngCloak: pa,
            ngController: da,
            ngForm: Bo,
            ngHide: Da,
            ngIf: ma,
            ngInclude: ga,
            ngInit: wa,
            ngNonBindable: Aa,
            ngPluralize: Ia,
            ngRepeat: Ma,
            ngShow: Na,
            ngStyle: La,
            ngSwitch: qa,
            ngSwitchWhen: Ua,
            ngSwitchDefault: Ha,
            ngOptions: ja,
            ngTransclude: Ba,
            ngModel: Oa,
            ngList: ba,
            ngChange: ca,
            pattern: Za,
            ngPattern: Za,
            required: Ya,
            ngRequired: Ya,
            minlength: Xa,
            ngMinlength: Xa,
            maxlength: Qa,
            ngMaxlength: Qa,
            ngValue: oa,
            ngModelOptions: Ta
        }).directive({
            ngInclude: ya
        }).directive(Lo).directive(va), t.provider({
            $anchorScroll: ue,
            $animate: zi,
            $animateCss: Ji,
            $$animateJs: Fi,
            $$animateQueue: Bi,
            $$AnimateRunner: Gi,
            $$animateAsyncRun: Wi,
            $browser: de,
            $cacheFactory: ve,
            $controller: xe,
            $document: Ee,
            $$isDocumentHidden: Ce,
            $exceptionHandler: _e,
            $filter: Bn,
            $$forceReflow: eo,
            $interpolate: qe,
            $interval: Ue,
            $http: Me,
            $httpParamSerializer: Oe,
            $httpParamSerializerJQLike: Re,
            $httpBackend: De,
            $xhrFactory: Ne,
            $jsonpCallbacks: co,
            $location: nn,
            $log: rn,
            $parse: wn,
            $rootScope: On,
            $q: bn,
            $$q: Sn,
            $sce: jn,
            $sceDelegate: Vn,
            $sniffer: In,
            $templateCache: $e,
            $templateRequest: Mn,
            $$testability: Nn,
            $timeout: Dn,
            $window: Un,
            $$rAF: kn,
            $$jqLite: ee,
            $$Map: ji,
            $$cookieReader: Fn
        });
    } ]).info({
        angularVersion: "1.6.6"
    }), Yr.module("ngLocale", [], [ "$provide", function(t) {
        var r_ONE = "one", r_OTHER = "other";
        t.value("$locale", {
            DATETIME_FORMATS: {
                AMPMS: [ "AM", "PM" ],
                DAY: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
                ERANAMES: [ "Before Christ", "Anno Domini" ],
                ERAS: [ "BC", "AD" ],
                FIRSTDAYOFWEEK: 6,
                MONTH: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                SHORTDAY: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                SHORTMONTH: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                STANDALONEMONTH: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                WEEKENDRANGE: [ 5, 6 ],
                fullDate: "EEEE, MMMM d, y",
                longDate: "MMMM d, y",
                medium: "MMM d, y h:mm:ss a",
                mediumDate: "MMM d, y",
                mediumTime: "h:mm:ss a",
                short: "M/d/yy h:mm a",
                shortDate: "M/d/yy",
                shortTime: "h:mm a"
            },
            NUMBER_FORMATS: {
                CURRENCY_SYM: "$",
                DECIMAL_SEP: ".",
                GROUP_SEP: ",",
                PATTERNS: [ {
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 3,
                    minFrac: 0,
                    minInt: 1,
                    negPre: "-",
                    negSuf: "",
                    posPre: "",
                    posSuf: ""
                }, {
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 2,
                    minFrac: 2,
                    minInt: 1,
                    negPre: "-¤",
                    negSuf: "",
                    posPre: "¤",
                    posSuf: ""
                } ]
            },
            id: "en-us",
            localeID: "en_US",
            pluralCat: function(t, e) {
                var i = 0 | t, o = function(t, n) {
                    var r = n;
                    void 0 === r && (r = Math.min(function(t) {
                        var e = (t += "").indexOf(".");
                        return -1 == e ? 0 : t.length - e - 1;
                    }(t), 3));
                    var i = Math.pow(10, r);
                    return {
                        v: r,
                        f: (t * i | 0) % i
                    };
                }(t, e);
                return 1 == i && 0 == o.v ? r_ONE : r_OTHER;
            }
        });
    } ]), Ur(function() {
        ut(t.document, ct);
    }));
}(window), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>'), 
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("angular")) : "function" == typeof define && define.amd ? define([ "exports", "angular" ], e) : e(t["@uirouter/angularjs"] = {}, t.angular);
}(this, function(t, e) {
    "use strict";
    function n(t) {
        var n = [].slice.apply(arguments, [ 1 ]), r = t.length;
        return function e(n) {
            return n.length >= r ? t.apply(null, n) : function() {
                return e(n.concat([].slice.apply(arguments)));
            };
        }(n);
    }
    function r() {
        var t = arguments, e = t.length - 1;
        return function() {
            for (var n = e, r = t[e].apply(this, arguments); n--; ) r = t[n].call(this, r);
            return r;
        };
    }
    function i() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return r.apply(null, [].slice.call(arguments).reverse());
    }
    function o(t, e) {
        return function() {
            for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
            return t.apply(null, n) && e.apply(null, n);
        };
    }
    function a(t, e) {
        return function() {
            for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
            return t.apply(null, n) || e.apply(null, n);
        };
    }
    function s(t, e) {
        return function(n) {
            return n[t].apply(n, e);
        };
    }
    function u(t) {
        return function(e) {
            for (var n = 0; n < t.length; n++) if (t[n][0](e)) return t[n][1](e);
        };
    }
    function c(t) {
        if (te(t) && t.length) {
            var e = t.slice(0, -1), n = t.slice(-1);
            return !(e.filter(Mt(Qt)).length || n.filter(Mt(Yt)).length);
        }
        return Yt(t);
    }
    function l(t) {
        return t;
    }
    function f() {}
    function h(t, e, n, r, i) {
        void 0 === i && (i = !1);
        var o = function(e) {
            return t()[e].bind(n());
        }, a = function(t) {
            return function() {
                return e[t] = o(t), e[t].apply(null, arguments);
            };
        };
        return (r = r || Object.keys(t())).reduce(function(t, e) {
            return t[e] = i ? a(e) : o(e), t;
        }, e);
    }
    function p(t, e) {
        return -1 !== t.indexOf(e);
    }
    function d(t, e) {
        var n = t.indexOf(e);
        return 0 <= n && t.splice(n, 1), t;
    }
    function v(t, e) {
        return t.push(e), e;
    }
    function $(t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        var r = e.concat({}).reverse(), i = he.apply(null, r);
        return he({}, i, g(t || {}, Object.keys(i)));
    }
    function m(t, e) {
        var n = [];
        for (var r in t.path) {
            if (t.path[r] !== e.path[r]) break;
            n.push(t.path[r]);
        }
        return n;
    }
    function g(t, e) {
        var n = {};
        for (var r in t) -1 !== e.indexOf(r) && (n[r] = t[r]);
        return n;
    }
    function y(t, e) {
        return Object.keys(t).filter(Mt(ve(e))).reduce(function(e, n) {
            return e[n] = t[n], e;
        }, {});
    }
    function w(t, e) {
        return x(t, Vt(e));
    }
    function b(t, e) {
        var n = te(t), r = n ? [] : {}, i = n ? function(t) {
            return r.push(t);
        } : function(t, e) {
            return r[e] = t;
        };
        return fe(t, function(t, n) {
            e(t, n) && i(t, n);
        }), r;
    }
    function S(t, e) {
        var n;
        return fe(t, function(t, r) {
            n || e(t, r) && (n = t);
        }), n;
    }
    function x(t, e) {
        var n = te(t) ? [] : {};
        return fe(t, function(t, r) {
            return n[r] = e(t, r);
        }), n;
    }
    function E(t, e) {
        return t.push(e), t;
    }
    function C(t, e) {
        return void 0 === e && (e = "assert failure"), function(n) {
            var r = t(n);
            if (!r) throw new Error(Yt(e) ? e(n) : e);
            return r;
        };
    }
    function _() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        if (0 === t.length) return [];
        var n, r = t.reduce(function(t, e) {
            return Math.min(e.length, t);
        }, 9007199254740991), i = [];
        for (n = 0; n < r; n++) switch (t.length) {
          case 1:
            i.push([ t[0][n] ]);
            break;

          case 2:
            i.push([ t[0][n], t[1][n] ]);
            break;

          case 3:
            i.push([ t[0][n], t[1][n], t[2][n] ]);
            break;

          case 4:
            i.push([ t[0][n], t[1][n], t[2][n], t[3][n] ]);
            break;

          default:
            i.push(t.map(function(t) {
                return t[n];
            }));
        }
        return i;
    }
    function k(t, e) {
        var n, r;
        if (te(e) && (n = e[0], r = e[1]), !Qt(n)) throw new Error("invalid parameters to applyPairs");
        return t[n] = r, t;
    }
    function O(t) {
        return t.length && t[t.length - 1] || void 0;
    }
    function R(t, e) {
        return e && Object.keys(e).forEach(function(t) {
            return delete e[t];
        }), e || (e = {}), he(e, t);
    }
    function T(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            if (n) for (var r = Object.keys(n), i = 0; i < r.length; i++) t[r[i]] = n[r[i]];
        }
        return t;
    }
    function A(t, e) {
        if (t === e) return !0;
        if (null === t || null === e) return !1;
        if (t != t && e != e) return !0;
        var n = typeof t;
        if (n !== typeof e || "object" !== n) return !1;
        var r = [ t, e ];
        if (Nt(te)(r)) return function(t, e) {
            return t.length === e.length && _(t, e).reduce(function(t, e) {
                return t && A(e[0], e[1]);
            }, !0);
        }(t, e);
        if (Nt(ee)(r)) return t.getTime() === e.getTime();
        if (Nt(ne)(r)) return t.toString() === e.toString();
        if (Nt(Yt)(r)) return !0;
        if ([ Yt, te, ee, ne ].map(Dt).reduce(function(t, e) {
            return t || !!e(r);
        }, !1)) return !1;
        var i, o = {};
        for (i in t) {
            if (!A(t[i], e[i])) return !1;
            o[i] = !0;
        }
        for (i in e) if (!o[i]) return !1;
        return !0;
    }
    function V(t) {
        if (!t) return "ui-view (defunct)";
        var e = t.creationContext ? t.creationContext.name || "(root)" : "(none)";
        return "[ui-view#" + t.id + " " + t.$type + ":" + t.fqn + " (" + t.name + "@" + e + ")]";
    }
    function j(e) {
        return Zt(e) ? t.Category[e] : t.Category[t.Category[e]];
    }
    function I(t, e) {
        var n = Qt(e) ? [ e ] : e;
        return !!(Yt(n) ? n : function(t) {
            for (var e = n, r = 0; r < e.length; r++) {
                var i = new Ht(e[r]);
                if (i && i.matches(t.name) || !i && e[r] === t.name) return !0;
            }
            return !1;
        })(t);
    }
    function M(t, e, n) {
        function r(t, r, a) {
            void 0 === a && (a = {});
            var s = new Je(e, n, r, t, o, a);
            return i.push(s), s.deregister.bind(s);
        }
        var i = (t._registeredHooks = t._registeredHooks || {})[n.name] = [], o = $e(i);
        return t[n.name] = r;
    }
    function D(t, e) {
        function n(t) {
            return te(t) ? t : Gt(t) ? [ t ] : [];
        }
        function r(t) {
            switch (t.length) {
              case 0:
                return;

              case 1:
                return "auto" === e ? t[0] : t;

              default:
                return t;
            }
        }
        function i(t, e) {
            return function(i) {
                if (te(i) && 0 === i.length) return i;
                var o = x(n(i), t);
                return !0 === e ? 0 === b(o, function(t) {
                    return !t;
                }).length : r(o);
            };
        }
        function o(t) {
            return function(e, r) {
                var i = n(e), o = n(r);
                if (i.length !== o.length) return !1;
                for (var a = 0; a < i.length; a++) if (!t(i[a], o[a])) return !1;
                return !0;
            };
        }
        var a = this;
        [ "encode", "decode", "equals", "$normalize" ].forEach(function(e) {
            var n = t[e].bind(t), r = "equals" === e ? o : i;
            a[e] = r(n);
        }), he(this, {
            dynamic: t.dynamic,
            name: t.name,
            pattern: t.pattern,
            inherit: t.inherit,
            is: i(t.is.bind(t), !0),
            $arrayMode: e
        });
    }
    function L(t) {
        function e() {
            return t.value;
        }
        return t = Qe(t) && {
            value: t
        } || t, e.__cacheable = !0, he(t, {
            $$fn: c(t.value) ? t.value : e
        });
    }
    function F(t, e) {
        return e.length <= t ? e : e.substr(0, t - 3) + "...";
    }
    function B(t, e) {
        for (;e.length < t; ) e += " ";
        return e;
    }
    function z(t) {
        return t.replace(/^([A-Z])/, function(t) {
            return t.toLowerCase();
        }).replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase();
        });
    }
    function W(t) {
        var e = G(t), n = e.match(/^(function [^ ]+\([^)]*\))/), r = n ? n[1] : e, i = t.name || "";
        return i && r.match(/function \(/) ? "function " + i + r.substr(9) : r;
    }
    function G(t) {
        var e = te(t) ? t.slice(-1)[0] : t;
        return e && e.toString() || "undefined";
    }
    function J(t) {
        function e(t) {
            if (Xt(t)) {
                if (-1 !== n.indexOf(t)) return "[circular ref]";
                n.push(t);
            }
            return vn(t);
        }
        var n = [];
        return JSON.stringify(t, function(t, n) {
            return e(n);
        }).replace(/\\"/g, '"');
    }
    function K(t) {
        var e = new RegExp("(" + t + ")", "g");
        return function(t) {
            return t.split(e).filter(l);
        };
    }
    function Y(t, e) {
        return Qt(O(t)) && Qt(e) ? t.slice(0, -1).concat(O(t) + e) : E(t, e);
    }
    function Z(t) {
        return t.name;
    }
    function Q(t) {
        return t.self.$$state = function() {
            return t;
        }, t.self;
    }
    function X(t) {
        return t.parent && t.parent.data && (t.data = t.self.data = de(t.parent.data, t.data)), 
        t.data;
    }
    function tt(t) {
        return t.parent ? t.parent.path.concat(t) : [ t ];
    }
    function et(t) {
        var e = t.parent ? he({}, t.parent.includes) : {};
        return e[t.name] = !0, e;
    }
    function nt(t) {
        var n = function(t) {
            return t.provide || t.token;
        }, r = u([ [ Vt("resolveFn"), function(t) {
            return new rn(n(t), t.resolveFn, t.deps, t.policy);
        } ], [ Vt("useFactory"), function(t) {
            return new rn(n(t), t.useFactory, t.deps || t.dependencies, t.policy);
        } ], [ Vt("useClass"), function(t) {
            return new rn(n(t), function() {
                return new t.useClass();
            }, [], t.policy);
        } ], [ Vt("useValue"), function(t) {
            return new rn(n(t), function() {
                return t.useValue;
            }, [], t.policy, t.useValue);
        } ], [ Vt("useExisting"), function(t) {
            return new rn(n(t), l, [ t.useExisting ], t.policy);
        } ] ]), o = u([ [ i(Vt("val"), Qt), function(t) {
            return new rn(t.token, l, [ t.val ], t.policy);
        } ], [ i(Vt("val"), te), function(t) {
            return new rn(t.token, O(t.val), t.val.slice(0, -1), t.policy);
        } ], [ i(Vt("val"), Yt), function(t) {
            return new rn(t.token, t.val, function(t) {
                var e = ae.$injector;
                return t.$inject || e && e.annotate(t, e.strictDi) || "deferred";
            }(t.val), t.policy);
        } ] ]), a = u([ [ Lt(rn), function(t) {
            return t;
        } ], [ function(t) {
            return !(!t.token || !t.resolveFn);
        }, r ], [ function(t) {
            return !(!t.provide && !t.token || !(t.useValue || t.useFactory || t.useExisting || t.useClass));
        }, r ], [ function(t) {
            return !!(t && t.val && (Qt(t.val) || te(t.val) || Yt(t.val)));
        }, o ], [ Ut(!0), function(t) {
            throw new Error("Invalid resolve value: " + J(t));
        } ] ]), s = t.resolve;
        return (te(s) ? s : function(t, e) {
            return Object.keys(t || {}).map(function(n) {
                return {
                    token: n,
                    val: t[n],
                    deps: void 0,
                    policy: e[n]
                };
            });
        }(s, t.resolvePolicy || {})).map(a);
    }
    function rt(t, e) {
        var n = [ "", "" ], r = t.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
        if (!e) return r;
        switch (e.squash) {
          case !1:
            n = [ "(", ")" + (e.isOptional ? "?" : "") ];
            break;

          case !0:
            r = r.replace(/\/$/, ""), n = [ "(?:/(", ")|/)?" ];
            break;

          default:
            n = [ "(" + e.squash + "|", ")?" ];
        }
        return r + n[0] + e.type.pattern.source + n[1];
    }
    function ot(t) {
        if (!(Yt(t) || Qt(t) || Lt(ze)(t) || ze.isDef(t))) throw new Error("'handler' must be a string, function, TargetState, or have a state: 'newtarget' property");
        return Yt(t) ? t : Ut(t);
    }
    function at(t) {
        t.addResolvable({
            token: er,
            deps: [],
            resolveFn: function() {
                return t.router;
            },
            data: t.router
        }, ""), t.addResolvable({
            token: pn,
            deps: [],
            resolveFn: function() {
                return t;
            },
            data: t
        }, ""), t.addResolvable({
            token: "$transition$",
            deps: [],
            resolveFn: function() {
                return t;
            },
            data: t
        }, ""), t.addResolvable({
            token: "$stateParams",
            deps: [],
            resolveFn: function() {
                return t.params();
            },
            data: t.params()
        }, ""), t.entering().forEach(function(e) {
            t.addResolvable({
                token: "$state$",
                deps: [],
                resolveFn: function() {
                    return e;
                },
                data: e
            }, e);
        });
    }
    function st(t) {
        return function(e, n) {
            return (0, n.$$state()[t])(e, n);
        };
    }
    function ut(t, e) {
        var n = e.$$state().lazyLoad, r = n._promise;
        return r || (r = n._promise = ae.$q.when(n(t, e)).then(function(e) {
            return e && Array.isArray(e.states) && e.states.forEach(function(e) {
                return t.router.stateRegistry.register(e);
            }), e;
        }).then(function(t) {
            return delete e.lazyLoad, delete e.$$state().lazyLoad, delete n._promise, t;
        }, function(t) {
            return delete n._promise, ae.$q.reject(t);
        })), r;
    }
    function ct(t) {
        var e = t._ignoredReason();
        if (e) {
            Be.traceTransitionIgnored(t);
            var n = t.router.globals.transition;
            return "SameAsCurrent" === e && n && n.abort(), Me.ignored().toPromise();
        }
    }
    function lt(t) {
        if (!t.valid()) throw new Error(t.error());
    }
    function ft(t) {
        var e = function(t) {
            return t || "";
        }, n = yn(t).map(e), r = n[0], i = n[1], o = wn(r).map(e);
        return {
            path: o[0],
            search: o[1],
            hash: i,
            url: t
        };
    }
    function ht(t, e, n, r) {
        return function(i) {
            var o = i.locationService = new n(i), a = i.locationConfig = new r(i, e);
            return {
                name: t,
                service: o,
                configuration: a,
                dispose: function(t) {
                    t.dispose(o), t.dispose(a);
                }
            };
        };
    }
    function pt(t) {
        return ae.$injector = Ir, {
            name: "vanilla.services",
            $q: ae.$q = Ar,
            $injector: Ir,
            dispose: function() {
                return null;
            }
        };
    }
    function dt() {
        var t = null;
        return function(e, n) {
            return t = t || ae.$injector.get("$templateFactory"), [ new ei(e, n, t) ];
        };
    }
    function vt(t) {
        if (!t.parent) return {};
        var e = [ "component", "bindings", "componentProvider" ], n = [ "templateProvider", "templateUrl", "template", "notify", "async" ].concat([ "controller", "controllerProvider", "controllerAs", "resolveAs" ]), r = e.concat(n);
        if (Gt(t.views) && Xr(r, t)) throw new Error("State '" + t.name + "' has a 'views' object. It cannot also have \"view properties\" at the state level.  Move the following properties into a view (in the 'views' object):  " + r.filter(function(e) {
            return Gt(t[e]);
        }).join(", "));
        var i = {}, o = t.views || {
            $default: g(t, r)
        };
        return fe(o, function(r, o) {
            if (o = o || "$default", Qt(r) && (r = {
                component: r
            }), r = he({}, r), Xr(e, r) && Xr(n, r)) throw new Error("Cannot combine: " + e.join("|") + " with: " + n.join("|") + " in stateview: '" + o + "@" + t.name + "'");
            r.resolveAs = r.resolveAs || "$resolve", r.$type = "ng1", r.$context = t, r.$name = o;
            var a = zn.normalizeUIViewTarget(r.$context, r.$name);
            r.$uiViewName = a.uiViewName, r.$uiViewContextAnchor = a.uiViewContextAnchor, i[o] = r;
        }), i;
    }
    function mt(t) {
        function e(t, e, r, i, o, a) {
            return n._runtimeServices(i, t, r, e), delete di.router, delete di.$get, di;
        }
        (di = this.router = new er()).stateProvider = new oi(di.stateRegistry, di.stateService), 
        di.stateRegistry.decorator("views", vt), di.stateRegistry.decorator("onExit", ai("onExit")), 
        di.stateRegistry.decorator("onRetain", ai("onRetain")), di.stateRegistry.decorator("onEnter", ai("onEnter")), 
        di.viewService._pluginapi._viewConfigFactory("ng1", dt());
        var n = di.locationService = di.locationConfig = new si(t);
        return si.monkeyPatchPathParameterType(di), ((di.router = di).$get = e).$inject = [ "$location", "$browser", "$sniffer", "$rootScope", "$http", "$templateCache" ], 
        di;
    }
    function gt(t, e, n) {
        ae.$injector = t, ae.$q = e, n.stateRegistry.get().map(function(t) {
            return t.$$state().resolvables;
        }).reduce(Ee, []).filter(function(t) {
            return "deferred" === t.deps;
        }).forEach(function(e) {
            return e.deps = t.annotate(e.resolveFn, t.strictDi);
        });
    }
    function yt(t) {
        t.$watch(function() {
            Be.approximateDigests++;
        });
    }
    function wt(t) {
        var e, n = t.match(/^\s*({[^}]*})\s*$/);
        if (n && (t = "(" + n[1] + ")"), !(e = t.replace(/\n/g, " ").match(/^\s*([^(]*?)\s*(\((.*)\))?\s*$/)) || 4 !== e.length) throw new Error("Invalid state ref '" + t + "'");
        return {
            state: e[1] || null,
            paramExpr: e[3] || null
        };
    }
    function bt(t) {
        var e = t.parent().inheritedData("$uiView"), n = It("$cfg.path")(e);
        return n ? O(n).state.name : void 0;
    }
    function St(t, e, n) {
        var r = n.uiState || t.current.name, i = he(function(t, e) {
            return {
                relative: bt(t) || e.$current,
                inherit: !0,
                source: "sref"
            };
        }(e, t), n.uiStateOpts || {}), o = t.href(r, n.uiStateParams, i);
        return {
            uiState: r,
            uiStateParams: n.uiStateParams,
            uiStateOpts: i,
            href: o
        };
    }
    function xt(t) {
        var e = "[object SVGAnimatedString]" === Object.prototype.toString.call(t.prop("href")), n = "FORM" === t[0].nodeName;
        return {
            attr: n ? "action" : e ? "xlink:href" : "href",
            isAnchor: "A" === t.prop("tagName").toUpperCase(),
            clickable: !n
        };
    }
    function Et(t, e, n, r, i) {
        return function(o) {
            var a = o.which || o.button, s = i();
            if (!(1 < a || o.ctrlKey || o.metaKey || o.shiftKey || t.attr("target"))) {
                var u = n(function() {
                    e.go(s.uiState, s.uiStateParams, s.uiStateOpts);
                });
                o.preventDefault();
                var c = r.isAnchor && !s.href ? 1 : 0;
                o.preventDefault = function() {
                    c-- <= 0 && n.cancel(u);
                };
            }
        };
    }
    function _t(t, e, n, r) {
        var i;
        r && (i = r.events), te(i) || (i = [ "click" ]);
        for (var o = t.on ? "on" : "bind", a = 0, s = i; a < s.length; a++) {
            var u = s[a];
            t[o](u, n);
        }
        e.$on("$destroy", function() {
            for (var e = t.off ? "off" : "unbind", r = 0, o = i; r < o.length; r++) {
                var a = o[r];
                t[e](a, n);
            }
        });
    }
    function kt(t) {
        var e = function(e, n, r) {
            return t.is(e, n, r);
        };
        return e.$stateful = !0, e;
    }
    function Ot(t) {
        var e = function(e, n, r) {
            return t.includes(e, n, r);
        };
        return e.$stateful = !0, e;
    }
    function Rt(t, n, r, i, o, a) {
        var s = It("viewDecl.controllerAs"), u = It("viewDecl.resolveAs");
        return {
            restrict: "ECA",
            priority: -400,
            compile: function(i) {
                var a = i.html();
                return i.empty(), function(i, c) {
                    var l = c.data("$uiView");
                    if (!l) return c.html(a), void t(c.contents())(i);
                    var f = l.$cfg || {
                        viewDecl: {},
                        getTemplate: e.noop
                    }, h = f.path && new ln(f.path);
                    c.html(f.getTemplate(c, h) || a), Be.traceUIViewFill(l.$uiView, c.html());
                    var p = t(c.contents()), d = f.controller, v = s(f), $ = u(f), m = h && mi(h);
                    if (i[$] = m, d) {
                        var g = n(d, he({}, m, {
                            $scope: i,
                            $element: c
                        }));
                        v && (i[v] = g, i[v][$] = m), c.data("$ngControllerController", g), c.children().data("$ngControllerController", g), 
                        Tt(o, r, g, i, f);
                    }
                    if (Qt(f.viewDecl.component)) var y = f.viewDecl.component, w = z(y), b = new RegExp("^(x-|data-)?" + w + "$", "i"), S = i.$watch(function() {
                        var t = [].slice.call(c[0].children).filter(function(t) {
                            return t && t.tagName && b.exec(t.tagName);
                        });
                        return t && Pt.element(t).data("$" + y + "Controller");
                    }, function(t) {
                        t && (Tt(o, r, t, i, f), S());
                    });
                    p(i);
                };
            }
        };
    }
    function Tt(t, e, n, r, i) {
        !Yt(n.$onInit) || i.viewDecl.component && bi || n.$onInit();
        var o = O(i.path).state.self, a = {
            bind: n
        };
        if (Yt(n.uiOnParamsChanged)) {
            var s = new ln(i.path).getResolvable("$transition$").data;
            r.$on("$destroy", e.onSuccess({}, function(t) {
                if (t !== s && -1 === t.exiting().indexOf(o)) {
                    var e = t.params("to"), r = t.params("from"), i = t.treeChanges().to.map(function(t) {
                        return t.paramSchema;
                    }).reduce(Ee, []), a = t.treeChanges().from.map(function(t) {
                        return t.paramSchema;
                    }).reduce(Ee, []), u = i.filter(function(t) {
                        var n = a.indexOf(t);
                        return -1 === n || !a[n].type.equals(e[t.id], r[t.id]);
                    });
                    if (u.length) {
                        var c = u.map(function(t) {
                            return t.id;
                        }), l = b(e, function(t, e) {
                            return -1 !== c.indexOf(e);
                        });
                        n.uiOnParamsChanged(l, t);
                    }
                }
            }, a));
        }
        if (Yt(n.uiCanExit)) {
            var u = Si++, c = function(t) {
                return !!t && (t._uiCanExitIds && !0 === t._uiCanExitIds[u] || c(t.redirectedFrom()));
            }, l = {
                exiting: o.name
            };
            r.$on("$destroy", e.onBefore(l, function(e) {
                var r, i = e._uiCanExitIds = e._uiCanExitIds || {};
                return c(e) || (r = t.when(n.uiCanExit(e))).then(function(t) {
                    return i[u] = !1 !== t;
                }), r;
            }, a));
        }
    }
    var At = angular, Pt = e && e.module ? e : At, Vt = function(t) {
        return function(e) {
            return e && e[t];
        };
    }, jt = n(function(t, e, n) {
        return n && n[t] === e;
    }), It = function(t) {
        return i.apply(null, t.split(".").map(Vt));
    }, Mt = function(t) {
        return function() {
            for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
            return !t.apply(null, e);
        };
    }, Nt = function(t) {
        return function(e) {
            return e.reduce(function(e, n) {
                return e && !!t(n);
            }, !0);
        };
    }, Dt = function(t) {
        return function(e) {
            return e.reduce(function(e, n) {
                return e || !!t(n);
            }, !1);
        };
    }, Lt = function(t) {
        return function(e) {
            return null != e && e.constructor === t || e instanceof t;
        };
    }, qt = function(t) {
        return function(e) {
            return t === e;
        };
    }, Ut = function(t) {
        return function() {
            return t;
        };
    }, Ht = function() {
        function t(t) {
            this.text = t, this.glob = t.split(".");
            var e = this.text.split(".").map(function(t) {
                return "**" === t ? "(?:|(?:\\.[^.]*)*)" : "*" === t ? "\\.[^.]*" : "\\." + t;
            }).join("");
            this.regexp = new RegExp("^" + e + "$");
        }
        return t.prototype.matches = function(t) {
            return this.regexp.test("." + t);
        }, t.is = function(t) {
            return !!/[!,*]+/.exec(t);
        }, t.fromString = function(e) {
            return t.is(e) ? new t(e) : null;
        }, t;
    }(), Ft = function() {
        function t(e) {
            return t.create(e || {});
        }
        return t.create = function(e) {
            e = t.isStateClass(e) ? new e() : e;
            var n = de(de(e, t.prototype));
            return e.$$state = function() {
                return n;
            }, n.self = e, n.__stateObjectCache = {
                nameGlob: Ht.fromString(n.name)
            }, n;
        }, t.prototype.is = function(t) {
            return this === t || this.self === t || this.fqn() === t;
        }, t.prototype.fqn = function() {
            if (!(this.parent && this.parent instanceof this.constructor)) return this.name;
            var t = this.parent.fqn();
            return t ? t + "." + this.name : this.name;
        }, t.prototype.root = function() {
            return this.parent && this.parent.root() || this;
        }, t.prototype.parameters = function(t) {
            return ((t = $(t, {
                inherit: !0,
                matchingKeys: null
            })).inherit && this.parent && this.parent.parameters() || []).concat(be(this.params)).filter(function(e) {
                return !t.matchingKeys || t.matchingKeys.hasOwnProperty(e.id);
            });
        }, t.prototype.parameter = function(t, e) {
            return void 0 === e && (e = {}), this.url && this.url.parameter(t, e) || S(be(this.params), jt("id", t)) || e.inherit && this.parent && this.parent.parameter(t);
        }, t.prototype.toString = function() {
            return this.fqn();
        }, t.isStateClass = function(t) {
            return Yt(t) && !0 === t.__uiRouterState;
        }, t.isState = function(t) {
            return Xt(t.__stateObjectCache);
        }, t;
    }(), Bt = Object.prototype.toString, zt = function(t) {
        return function(e) {
            return typeof e === t;
        };
    }, Wt = zt("undefined"), Gt = Mt(Wt), Jt = function(t) {
        return null === t;
    }, Kt = a(Jt, Wt), Yt = zt("function"), Zt = zt("number"), Qt = zt("string"), Xt = function(t) {
        return null !== t && "object" == typeof t;
    }, te = Array.isArray, ee = function(t) {
        return "[object Date]" === Bt.call(t);
    }, ne = function(t) {
        return "[object RegExp]" === Bt.call(t);
    }, re = Ft.isState, ie = o(Xt, i(Vt("then"), Yt)), oe = function(t) {
        return function() {
            throw new Error(t + "(): No coreservices implementation for UI-Router is loaded.");
        };
    }, ae = {
        $q: void 0,
        $injector: void 0
    }, se = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || void 0, ue = se.angular || {}, ce = ue.fromJson || JSON.parse.bind(JSON), le = ue.toJson || JSON.stringify.bind(JSON), fe = ue.forEach || function(t, e, n) {
        if (te(t)) return t.forEach(e, n);
        Object.keys(t).forEach(function(n) {
            return e(t[n], n);
        });
    }, he = Object.assign || T, pe = ue.equals || A, de = function(t, e) {
        return he(Object.create(t), e);
    }, ve = n(p), $e = n(d), me = n(v), ge = function(t) {
        return t.slice().forEach(function(e) {
            "function" == typeof e && e(), $e(t, e);
        });
    }, ye = function(t, e) {
        return he(t, e);
    }, we = x, be = function(t) {
        return Object.keys(t).map(function(e) {
            return t[e];
        });
    }, Se = function(t, e) {
        return t && e;
    }, xe = function(t, e) {
        return t || e;
    }, Ee = function(t, e) {
        return t.concat(e);
    }, Ce = function(t, e) {
        return te(e) ? t.concat(e.reduce(Ce, [])) : E(t, e);
    }, _e = function(t, e) {
        return ve(t, e) ? t : E(t, e);
    }, ke = function(t) {
        return t.reduce(Ee, []);
    }, Oe = function(t) {
        return t.reduce(Ce, []);
    }, Re = C, Te = C, Ae = function(t) {
        return Object.keys(t).map(function(e) {
            return [ e, t[e] ];
        });
    }, Pe = function(t) {
        return t.catch(function(t) {
            return 0;
        }) && t;
    }, Ve = function(t) {
        return Pe(ae.$q.reject(t));
    }, je = function() {
        function t(t, e) {
            void 0 === t && (t = []), void 0 === e && (e = null), this._items = t, this._limit = e;
        }
        return t.prototype.enqueue = function(t) {
            var e = this._items;
            return e.push(t), this._limit && e.length > this._limit && e.shift(), t;
        }, t.prototype.dequeue = function() {
            if (this.size()) return this._items.splice(0, 1)[0];
        }, t.prototype.clear = function() {
            var t = this._items;
            return this._items = [], t;
        }, t.prototype.size = function() {
            return this._items.length;
        }, t.prototype.remove = function(t) {
            var e = this._items.indexOf(t);
            return -1 < e && this._items.splice(e, 1)[0];
        }, t.prototype.peekTail = function() {
            return this._items[this._items.length - 1];
        }, t.prototype.peekHead = function() {
            if (this.size()) return this._items[0];
        }, t;
    }();
    !function(t) {
        t[t.SUPERSEDED = 2] = "SUPERSEDED", t[t.ABORTED = 3] = "ABORTED", t[t.INVALID = 4] = "INVALID", 
        t[t.IGNORED = 5] = "IGNORED", t[t.ERROR = 6] = "ERROR";
    }(t.RejectType || (t.RejectType = {}));
    var Ie = 0, Me = function() {
        function e(t, e, n) {
            this.$id = Ie++, this.type = t, this.message = e, this.detail = n;
        }
        return e.prototype.toString = function() {
            var t = function(t) {
                return t && t.toString !== Object.prototype.toString ? t.toString() : J(t);
            }(this.detail), e = this;
            return "Transition Rejection($id: " + e.$id + " type: " + e.type + ", message: " + e.message + ", detail: " + t + ")";
        }, e.prototype.toPromise = function() {
            return he(Ve(this), {
                _transitionRejection: this
            });
        }, e.isRejectionPromise = function(t) {
            return t && "function" == typeof t.then && Lt(e)(t._transitionRejection);
        }, e.superseded = function(n, r) {
            var i = new e(t.RejectType.SUPERSEDED, "The transition has been superseded by a different transition", n);
            return r && r.redirected && (i.redirected = !0), i;
        }, e.redirected = function(t) {
            return e.superseded(t, {
                redirected: !0
            });
        }, e.invalid = function(n) {
            return new e(t.RejectType.INVALID, "This transition is invalid", n);
        }, e.ignored = function(n) {
            return new e(t.RejectType.IGNORED, "The transition was ignored", n);
        }, e.aborted = function(n) {
            return new e(t.RejectType.ABORTED, "The transition has been aborted", n);
        }, e.errored = function(n) {
            return new e(t.RejectType.ERROR, "The transition errored", n);
        }, e.normalize = function(t) {
            return Lt(e)(t) ? t : e.errored(t);
        }, e;
    }(), De = Function.prototype.bind.call(console.log, console), Le = Yt(console.table) ? console.table.bind(console) : De.bind(console);
    !function(t) {
        t[t.RESOLVE = 0] = "RESOLVE", t[t.TRANSITION = 1] = "TRANSITION", t[t.HOOK = 2] = "HOOK", 
        t[t.UIVIEW = 3] = "UIVIEW", t[t.VIEWCONFIG = 4] = "VIEWCONFIG";
    }(t.Category || (t.Category = {}));
    var qe = It("$id"), Ue = It("router.$id"), He = function(t) {
        return "Transition #" + qe(t) + "-" + Ue(t);
    }, Fe = function() {
        function e() {
            this._enabled = {}, this.approximateDigests = 0;
        }
        return e.prototype._set = function(e, n) {
            var r = this;
            n.length || (n = Object.keys(t.Category).map(function(t) {
                return parseInt(t, 10);
            }).filter(function(t) {
                return !isNaN(t);
            }).map(function(e) {
                return t.Category[e];
            })), n.map(j).forEach(function(t) {
                return r._enabled[t] = e;
            });
        }, e.prototype.enable = function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            this._set(!0, t);
        }, e.prototype.disable = function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            this._set(!1, t);
        }, e.prototype.enabled = function(t) {
            return !!this._enabled[j(t)];
        }, e.prototype.traceTransitionStart = function(e) {
            this.enabled(t.Category.TRANSITION) && console.log(He(e) + ": Started  -> " + J(e));
        }, e.prototype.traceTransitionIgnored = function(e) {
            this.enabled(t.Category.TRANSITION) && console.log(He(e) + ": Ignored  <> " + J(e));
        }, e.prototype.traceHookInvocation = function(e, n, r) {
            if (this.enabled(t.Category.HOOK)) {
                var i = It("traceData.hookType")(r) || "internal", o = It("traceData.context.state.name")(r) || It("traceData.context")(r) || "unknown", a = W(e.registeredHook.callback);
                console.log(He(n) + ":   Hook -> " + i + " context: " + o + ", " + F(200, a));
            }
        }, e.prototype.traceHookResult = function(e, n, r) {
            this.enabled(t.Category.HOOK) && console.log(He(n) + ":   <- Hook returned: " + F(200, J(e)));
        }, e.prototype.traceResolvePath = function(e, n, r) {
            this.enabled(t.Category.RESOLVE) && console.log(He(r) + ":         Resolving " + e + " (" + n + ")");
        }, e.prototype.traceResolvableResolved = function(e, n) {
            this.enabled(t.Category.RESOLVE) && console.log(He(n) + ":               <- Resolved  " + e + " to: " + F(200, J(e.data)));
        }, e.prototype.traceError = function(e, n) {
            this.enabled(t.Category.TRANSITION) && console.log(He(n) + ": <- Rejected " + J(n) + ", reason: " + e);
        }, e.prototype.traceSuccess = function(e, n) {
            this.enabled(t.Category.TRANSITION) && console.log(He(n) + ": <- Success  " + J(n) + ", final state: " + e.name);
        }, e.prototype.traceUIViewEvent = function(e, n, r) {
            void 0 === r && (r = ""), this.enabled(t.Category.UIVIEW) && console.log("ui-view: " + B(30, e) + " " + V(n) + r);
        }, e.prototype.traceUIViewConfigUpdated = function(e, n) {
            this.enabled(t.Category.UIVIEW) && this.traceUIViewEvent("Updating", e, " with ViewConfig from context='" + n + "'");
        }, e.prototype.traceUIViewFill = function(e, n) {
            this.enabled(t.Category.UIVIEW) && this.traceUIViewEvent("Fill", e, " with: " + F(200, n));
        }, e.prototype.traceViewSync = function(e) {
            if (this.enabled(t.Category.VIEWCONFIG)) {
                var n = e.map(function(t) {
                    var e = t[0], n = t[1];
                    return {
                        "ui-view fqn": e.$type + ":" + e.fqn,
                        "state: view name": n && n.viewDecl.$context.name + ": " + n.viewDecl.$name + " (" + n.viewDecl.$type + ")"
                    };
                }).sort(function(t, e) {
                    return t["ui-view fqn"].localeCompare(e["ui-view fqn"]);
                });
                Le(n);
            }
        }, e.prototype.traceViewServiceEvent = function(e, n) {
            this.enabled(t.Category.VIEWCONFIG) && console.log("VIEWCONFIG: " + e + " " + function(t) {
                var e = t.viewDecl, n = e.$context.name || "(root)";
                return "[View#" + t.$id + " from '" + n + "' state]: target ui-view: '" + e.$uiViewName + "@" + e.$uiViewContextAnchor + "'";
            }(n));
        }, e.prototype.traceViewServiceUIViewEvent = function(e, n) {
            this.enabled(t.Category.VIEWCONFIG) && console.log("VIEWCONFIG: " + e + " " + V(n));
        }, e;
    }(), Be = new Fe();
    !function(t) {
        t[t.CREATE = 0] = "CREATE", t[t.BEFORE = 1] = "BEFORE", t[t.RUN = 2] = "RUN", t[t.SUCCESS = 3] = "SUCCESS", 
        t[t.ERROR = 4] = "ERROR";
    }(t.TransitionHookPhase || (t.TransitionHookPhase = {})), function(t) {
        t[t.TRANSITION = 0] = "TRANSITION", t[t.STATE = 1] = "STATE";
    }(t.TransitionHookScope || (t.TransitionHookScope = {}));
    var ze = function() {
        function t(t, e, n, r) {
            this._stateRegistry = t, this._identifier = e, this._identifier = e, this._params = he({}, n || {}), 
            this._options = he({}, r || {}), this._definition = t.matcher.find(e, this._options.relative);
        }
        return t.prototype.name = function() {
            return this._definition && this._definition.name || this._identifier;
        }, t.prototype.identifier = function() {
            return this._identifier;
        }, t.prototype.params = function() {
            return this._params;
        }, t.prototype.$state = function() {
            return this._definition;
        }, t.prototype.state = function() {
            return this._definition && this._definition.self;
        }, t.prototype.options = function() {
            return this._options;
        }, t.prototype.exists = function() {
            return !(!this._definition || !this._definition.self);
        }, t.prototype.valid = function() {
            return !this.error();
        }, t.prototype.error = function() {
            var t = this.options().relative;
            if (this._definition || !t) return this._definition ? this._definition.self ? void 0 : "State '" + this.name() + "' has an invalid definition" : "No such state '" + this.name() + "'";
            var e = t.name ? t.name : t;
            return "Could not resolve '" + this.name() + "' from state '" + e + "'";
        }, t.prototype.toString = function() {
            return "'" + this.name() + "'" + J(this.params());
        }, t.prototype.withState = function(e) {
            return new t(this._stateRegistry, e, this._params, this._options);
        }, t.prototype.withParams = function(e, n) {
            void 0 === n && (n = !1);
            var r = n ? e : he({}, this._params, e);
            return new t(this._stateRegistry, this._identifier, r, this._options);
        }, t.prototype.withOptions = function(e, n) {
            void 0 === n && (n = !1);
            var r = n ? e : he({}, this._options, e);
            return new t(this._stateRegistry, this._identifier, this._params, r);
        }, t.isDef = function(t) {
            return t && t.state && (Qt(t.state) || Qt(t.state.name));
        }, t;
    }(), We = {
        current: f,
        transition: null,
        traceData: {},
        bind: null
    }, Ge = function() {
        function e(e, n, r, i) {
            var o = this;
            this.transition = e, this.stateContext = n, this.registeredHook = r, this.options = i, 
            this.isSuperseded = function() {
                return o.type.hookPhase === t.TransitionHookPhase.RUN && !o.options.transition.isActive();
            }, this.options = $(i, We), this.type = r.eventType;
        }
        return e.prototype.logError = function(t) {
            this.transition.router.stateService.defaultErrorHandler()(t);
        }, e.prototype.invokeHook = function() {
            var t = this, e = this.registeredHook;
            if (!e._deregistered) {
                var n = this.getNotCurrentRejection();
                if (n) return n;
                var r = this.options;
                Be.traceHookInvocation(this, this.transition, r);
                var i = function(n) {
                    return e.eventType.getErrorHandler(t)(n);
                }, o = function(n) {
                    return e.eventType.getResultHandler(t)(n);
                };
                try {
                    var a = e.callback.call(r.bind, t.transition, t.stateContext);
                    return !this.type.synchronous && ie(a) ? a.catch(function(t) {
                        return Me.normalize(t).toPromise();
                    }).then(o, i) : o(a);
                } catch (t) {
                    return i(Me.normalize(t));
                } finally {
                    e.invokeLimit && ++e.invokeCount >= e.invokeLimit && e.deregister();
                }
            }
        }, e.prototype.handleHookResult = function(t) {
            var e = this;
            return this.getNotCurrentRejection() || (ie(t) ? t.then(function(t) {
                return e.handleHookResult(t);
            }) : (Be.traceHookResult(t, this.transition, this.options), !1 === t ? Me.aborted("Hook aborted transition").toPromise() : Lt(ze)(t) ? Me.redirected(t).toPromise() : void 0));
        }, e.prototype.getNotCurrentRejection = function() {
            var t = this.transition.router;
            return t._disposed ? Me.aborted("UIRouter instance #" + t.$id + " has been stopped (disposed)").toPromise() : this.transition._aborted ? Me.aborted().toPromise() : this.isSuperseded() ? Me.superseded(this.options.current()).toPromise() : void 0;
        }, e.prototype.toString = function() {
            var e = this.options, n = this.registeredHook;
            return (It("traceData.hookType")(e) || "internal") + " context: " + (It("traceData.context.state.name")(e) || It("traceData.context")(e) || "unknown") + ", " + F(200, G(n.callback));
        }, e.chain = function(t, e) {
            return t.reduce(function(t, e) {
                return t.then(function() {
                    return e.invokeHook();
                });
            }, e || ae.$q.when());
        }, e.invokeHooks = function(t, n) {
            for (var r = 0; r < t.length; r++) {
                var i = t[r].invokeHook();
                if (ie(i)) return e.chain(t.slice(r + 1), i).then(n);
            }
            return n();
        }, e.runAllHooks = function(t) {
            t.forEach(function(t) {
                return t.invokeHook();
            });
        }, e.HANDLE_RESULT = function(t) {
            return function(e) {
                return t.handleHookResult(e);
            };
        }, e.LOG_REJECTED_RESULT = function(t) {
            return function(e) {
                ie(e) && e.catch(function(e) {
                    return t.logError(Me.normalize(e));
                });
            };
        }, e.LOG_ERROR = function(t) {
            return function(e) {
                return t.logError(e);
            };
        }, e.REJECT_ERROR = function(t) {
            return function(t) {
                return Ve(t);
            };
        }, e.THROW_ERROR = function(t) {
            return function(t) {
                throw t;
            };
        }, e;
    }(), Je = function() {
        function e(t, e, n, r, i, o) {
            void 0 === o && (o = {}), this.tranSvc = t, this.eventType = e, this.callback = n, 
            this.matchCriteria = r, this.removeHookFromRegistry = i, this.invokeCount = 0, this._deregistered = !1, 
            this.priority = o.priority || 0, this.bind = o.bind || null, this.invokeLimit = o.invokeLimit;
        }
        return e.prototype._matchingNodes = function(t, e) {
            if (!0 === e) return t;
            var n = t.filter(function(t) {
                return I(t.state, e);
            });
            return n.length ? n : null;
        }, e.prototype._getDefaultMatchCriteria = function() {
            return x(this.tranSvc._pluginapi._getPathTypes(), function() {
                return !0;
            });
        }, e.prototype._getMatchingNodes = function(e) {
            var n = this, r = he(this._getDefaultMatchCriteria(), this.matchCriteria);
            return be(this.tranSvc._pluginapi._getPathTypes()).reduce(function(i, o) {
                var a = o.scope === t.TransitionHookScope.STATE, s = e[o.name] || [], u = a ? s : [ O(s) ];
                return i[o.name] = n._matchingNodes(u, r[o.name]), i;
            }, {});
        }, e.prototype.matches = function(t) {
            var e = this._getMatchingNodes(t);
            return be(e).every(l) ? e : null;
        }, e.prototype.deregister = function() {
            this.removeHookFromRegistry(this), this._deregistered = !0;
        }, e;
    }(), Ke = function() {
        function e(t) {
            this.transition = t;
        }
        return e.prototype.buildHooksForPhase = function(t) {
            var e = this;
            return this.transition.router.transitionService._pluginapi._getEvents(t).map(function(t) {
                return e.buildHooks(t);
            }).reduce(Ee, []).filter(l);
        }, e.prototype.buildHooks = function(e) {
            var n = this.transition, r = n.treeChanges(), i = this.getMatchingHooks(e, r);
            if (!i) return [];
            var o = {
                transition: n,
                current: n.options().current
            };
            return i.map(function(i) {
                return i.matches(r)[e.criteriaMatchPath.name].map(function(r) {
                    var a = he({
                        bind: i.bind,
                        traceData: {
                            hookType: e.name,
                            context: r
                        }
                    }, o), s = e.criteriaMatchPath.scope === t.TransitionHookScope.STATE ? r.state.self : null, u = new Ge(n, s, i, a);
                    return {
                        hook: i,
                        node: r,
                        transitionHook: u
                    };
                });
            }).reduce(Ee, []).sort(function(t) {
                return void 0 === t && (t = !1), function(e, n) {
                    var r = t ? -1 : 1, i = (e.node.state.path.length - n.node.state.path.length) * r;
                    return 0 !== i ? i : n.hook.priority - e.hook.priority;
                };
            }(e.reverseSort)).map(function(t) {
                return t.transitionHook;
            });
        }, e.prototype.getMatchingHooks = function(e, n) {
            var r = e.hookPhase === t.TransitionHookPhase.CREATE, i = this.transition.router.transitionService;
            return (r ? [ i ] : [ this.transition, i ]).map(function(t) {
                return t.getHooks(e.name);
            }).filter(Re(te, "broken event named: " + e.name)).reduce(Ee, []).filter(function(t) {
                return t.matches(n);
            });
        }, e;
    }(), Ye = function() {
        function t(t) {
            this.pattern = /.*/, this.inherit = !0, he(this, t);
        }
        return t.prototype.is = function(t, e) {
            return !0;
        }, t.prototype.encode = function(t, e) {
            return t;
        }, t.prototype.decode = function(t, e) {
            return t;
        }, t.prototype.equals = function(t, e) {
            return t == e;
        }, t.prototype.$subPattern = function() {
            var t = this.pattern.toString();
            return t.substr(1, t.length - 2);
        }, t.prototype.toString = function() {
            return "{ParamType:" + this.name + "}";
        }, t.prototype.$normalize = function(t) {
            return this.is(t) ? t : this.decode(t);
        }, t.prototype.$asArray = function(t, e) {
            if (!t) return this;
            if ("auto" === t && !e) throw new Error("'auto' array mode is for query parameters only");
            return new D(this, t);
        }, t;
    }(), Ze = Object.prototype.hasOwnProperty, Qe = function(t) {
        return 0 === [ "value", "type", "squash", "array", "dynamic" ].filter(Ze.bind(t || {})).length;
    };
    !function(t) {
        t[t.PATH = 0] = "PATH", t[t.SEARCH = 1] = "SEARCH", t[t.CONFIG = 2] = "CONFIG";
    }(t.DefType || (t.DefType = {}));
    var Xe = function() {
        function e(e, n, r, i, o) {
            n = function(e, n, r, i, o) {
                if (e.type && n && "string" !== n.name) throw new Error("Param '" + i + "' has two type configurations.");
                if (e.type && n && "string" === n.name && o.type(e.type)) return o.type(e.type);
                if (n) return n;
                if (e.type) return e.type instanceof Ye ? e.type : o.type(e.type);
                var a = r === t.DefType.CONFIG ? "any" : r === t.DefType.PATH ? "path" : r === t.DefType.SEARCH ? "query" : "string";
                return o.type(a);
            }(r = L(r), n, i, e, o.paramTypes);
            var a = function() {
                var n = {
                    array: i === t.DefType.SEARCH && "auto"
                }, o = e.match(/\[\]$/) ? {
                    array: !0
                } : {};
                return he(n, o, r).array;
            }();
            n = a ? n.$asArray(a, i === t.DefType.SEARCH) : n;
            var s = void 0 !== r.value || i === t.DefType.SEARCH, u = Gt(r.dynamic) ? !!r.dynamic : !!n.dynamic, c = Gt(r.raw) ? !!r.raw : !!n.raw, l = function(t, e, n) {
                var r = t.squash;
                if (!e || !1 === r) return !1;
                if (!Gt(r) || null == r) return n;
                if (!0 === r || Qt(r)) return r;
                throw new Error("Invalid squash policy: '" + r + "'. Valid policies: false, true, or arbitrary string");
            }(r, s, o.defaultSquashPolicy()), f = function(t, e, n, r) {
                var i, o, a = [ {
                    from: "",
                    to: n || e ? void 0 : ""
                }, {
                    from: null,
                    to: n || e ? void 0 : ""
                } ];
                return i = te(t.replace) ? t.replace : [], Qt(r) && i.push({
                    from: r,
                    to: void 0
                }), o = x(i, Vt("from")), b(a, function(t) {
                    return -1 === o.indexOf(t.from);
                }).concat(i);
            }(r, a, s, l), h = Gt(r.inherit) ? !!r.inherit : !!n.inherit;
            he(this, {
                id: e,
                type: n,
                location: i,
                isOptional: s,
                dynamic: u,
                raw: c,
                squash: l,
                replace: f,
                inherit: h,
                array: a,
                config: r
            });
        }
        return e.prototype.isDefaultValue = function(t) {
            return this.isOptional && this.type.equals(this.value(), t);
        }, e.prototype.value = function(t) {
            var e = this;
            return t = function(t) {
                for (var n = 0, r = e.replace; n < r.length; n++) {
                    var i = r[n];
                    if (i.from === t) return i.to;
                }
                return t;
            }(t), Wt(t) ? function() {
                if (e._defaultValueCache) return e._defaultValueCache.defaultValue;
                if (!ae.$injector) throw new Error("Injectable functions cannot be called at configuration time");
                var t = ae.$injector.invoke(e.config.$$fn);
                if (null != t && !e.type.is(t)) throw new Error("Default value (" + t + ") for parameter '" + e.id + "' is not an instance of ParamType (" + e.type.name + ")");
                return e.config.$$fn.__cacheable && (e._defaultValueCache = {
                    defaultValue: t
                }), t;
            }() : this.type.$normalize(t);
        }, e.prototype.isSearch = function() {
            return this.location === t.DefType.SEARCH;
        }, e.prototype.validates = function(t) {
            if ((Wt(t) || null === t) && this.isOptional) return !0;
            var e = this.type.$normalize(t);
            if (!this.type.is(e)) return !1;
            var n = this.type.encode(e);
            return !(Qt(n) && !this.type.pattern.exec(n));
        }, e.prototype.toString = function() {
            return "{Param:" + this.id + " " + this.type + " squash: '" + this.squash + "' optional: " + this.isOptional + "}";
        }, e.values = function(t, e) {
            void 0 === e && (e = {});
            for (var n = {}, r = 0, i = t; r < i.length; r++) {
                var o = i[r];
                n[o.id] = o.value(e[o.id]);
            }
            return n;
        }, e.changed = function(t, e, n) {
            return void 0 === e && (e = {}), void 0 === n && (n = {}), t.filter(function(t) {
                return !t.type.equals(e[t.id], n[t.id]);
            });
        }, e.equals = function(t, n, r) {
            return void 0 === n && (n = {}), void 0 === r && (r = {}), 0 === e.changed(t, n, r).length;
        }, e.validates = function(t, e) {
            return void 0 === e && (e = {}), t.map(function(t) {
                return t.validates(e[t.id]);
            }).reduce(Se, !0);
        }, e;
    }(), tn = function() {
        function t(e) {
            if (e instanceof t) {
                var n = e;
                this.state = n.state, this.paramSchema = n.paramSchema.slice(), this.paramValues = he({}, n.paramValues), 
                this.resolvables = n.resolvables.slice(), this.views = n.views && n.views.slice();
            } else {
                var r = e;
                this.state = r, this.paramSchema = r.parameters({
                    inherit: !1
                }), this.paramValues = {}, this.resolvables = r.resolvables.map(function(t) {
                    return t.clone();
                });
            }
        }
        return t.prototype.applyRawParams = function(t) {
            var e = function(e) {
                return [ e.id, e.value(t[e.id]) ];
            };
            return this.paramValues = this.paramSchema.reduce(function(t, n) {
                return k(t, e(n));
            }, {}), this;
        }, t.prototype.parameter = function(t) {
            return S(this.paramSchema, jt("id", t));
        }, t.prototype.equals = function(t, e) {
            var n = this.diff(t, e);
            return n && 0 === n.length;
        }, t.prototype.diff = function(t, e) {
            if (this.state !== t.state) return !1;
            var n = e ? e(this) : this.paramSchema;
            return Xe.changed(n, this.paramValues, t.paramValues);
        }, t.clone = function(e) {
            return new t(e);
        }, t;
    }(), en = function() {
        function t() {}
        return t.makeTargetState = function(t, e) {
            var n = O(e).state;
            return new ze(t, n, e.map(Vt("paramValues")).reduce(ye, {}), {});
        }, t.buildPath = function(t) {
            var e = t.params();
            return t.$state().path.map(function(t) {
                return new tn(t).applyRawParams(e);
            });
        }, t.buildToPath = function(e, n) {
            var r = t.buildPath(n);
            return n.options().inherit ? t.inheritParams(e, r, Object.keys(n.params())) : r;
        }, t.applyViewConfigs = function(e, n, r) {
            n.filter(function(t) {
                return ve(r, t.state);
            }).forEach(function(r) {
                var i = be(r.state.views || {}), o = t.subPath(n, function(t) {
                    return t === r;
                }), a = i.map(function(t) {
                    return e.createViewConfig(o, t);
                });
                r.views = a.reduce(Ee, []);
            });
        }, t.inheritParams = function(t, e, n) {
            void 0 === n && (n = []);
            var i = t.map(function(t) {
                return t.paramSchema;
            }).reduce(Ee, []).filter(function(t) {
                return !t.inherit;
            }).map(Vt("id"));
            return e.map(function(e) {
                var o = he({}, e && e.paramValues), a = g(o, n);
                o = y(o, n);
                var s = y(function(t, e) {
                    var n = S(t, jt("state", e));
                    return he({}, n && n.paramValues);
                }(t, e.state) || {}, i), u = he(o, s, a);
                return new tn(e.state).applyRawParams(u);
            });
        }, t.treeChanges = function(e, n, r) {
            for (var i = 0, o = Math.min(e.length, n.length); i < o && e[i].state !== r && function(e, n) {
                return e.equals(n, t.nonDynamicParams);
            }(e[i], n[i]); ) i++;
            var a, s, u, c;
            s = (a = e).slice(0, i), u = a.slice(i);
            var f = s.map(function(t, e) {
                var r = tn.clone(t);
                return r.paramValues = n[e].paramValues, r;
            });
            return c = n.slice(i), {
                from: a,
                to: f.concat(c),
                retained: s,
                exiting: u,
                entering: c
            };
        }, t.matching = function(t, e, n) {
            var r = !1;
            return _(t, e).reduce(function(t, e) {
                var i = e[0], o = e[1];
                return (r = r || !i.equals(o, n)) ? t : t.concat(i);
            }, []);
        }, t.equals = function(e, n, r) {
            return e.length === n.length && t.matching(e, n, r).length === e.length;
        }, t.subPath = function(t, e) {
            var n = S(t, e), r = t.indexOf(n);
            return -1 === r ? void 0 : t.slice(0, r + 1);
        }, t.nonDynamicParams = function(t) {
            return t.state.parameters({
                inherit: !1
            }).filter(function(t) {
                return !t.dynamic;
            });
        }, t.paramValues = function(t) {
            return t.reduce(function(t, e) {
                return he(t, e.paramValues);
            }, {});
        }, t;
    }(), nn = {
        when: "LAZY",
        async: "WAIT"
    }, rn = function() {
        function t(e, n, r, i, o) {
            if (this.resolved = !1, this.promise = void 0, e instanceof t) he(this, e); else if (Yt(n)) {
                if (Kt(e)) throw new Error("new Resolvable(): token argument is required");
                if (!Yt(n)) throw new Error("new Resolvable(): resolveFn argument must be a function");
                this.token = e, this.policy = i, this.resolveFn = n, this.deps = r || [], this.data = o, 
                this.resolved = void 0 !== o, this.promise = this.resolved ? ae.$q.when(this.data) : void 0;
            } else if (Xt(e) && e.token && Yt(e.resolveFn)) {
                var a = e;
                return new t(a.token, a.resolveFn, a.deps, a.policy, a.data);
            }
        }
        return t.prototype.getPolicy = function(t) {
            var e = this.policy || {}, n = t && t.resolvePolicy || {};
            return {
                when: e.when || n.when || nn.when,
                async: e.async || n.async || nn.async
            };
        }, t.prototype.resolve = function(t, e) {
            var n = this, r = ae.$q, i = t.findNode(this), o = i && i.state, a = "RXWAIT" === this.getPolicy(o).async ? function(t) {
                var e = t.cache(1);
                return e.take(1).toPromise().then(function() {
                    return e;
                });
            } : l;
            return this.promise = r.when().then(function() {
                return r.all(t.getDependencies(n).map(function(n) {
                    return n.get(t, e);
                }));
            }).then(function(t) {
                return n.resolveFn.apply(null, t);
            }).then(a).then(function(t) {
                return n.data = t, n.resolved = !0, Be.traceResolvableResolved(n, e), n.data;
            });
        }, t.prototype.get = function(t, e) {
            return this.promise || this.resolve(t, e);
        }, t.prototype.toString = function() {
            return "Resolvable(token: " + J(this.token) + ", requires: [" + this.deps.map(J) + "])";
        }, t.prototype.clone = function() {
            return new t(this);
        }, t.fromData = function(e, n) {
            return new t(e, function() {
                return n;
            }, null, null, n);
        }, t;
    }(), on = {
        when: {
            LAZY: "LAZY",
            EAGER: "EAGER"
        },
        async: {
            WAIT: "WAIT",
            NOWAIT: "NOWAIT",
            RXWAIT: "RXWAIT"
        }
    }, an = on.when, sn = [ an.EAGER, an.LAZY ], un = [ an.EAGER ], cn = "Native Injector", ln = function() {
        function t(t) {
            this._path = t;
        }
        return t.prototype.getTokens = function() {
            return this._path.reduce(function(t, e) {
                return t.concat(e.resolvables.map(function(t) {
                    return t.token;
                }));
            }, []).reduce(_e, []);
        }, t.prototype.getResolvable = function(t) {
            return O(this._path.map(function(t) {
                return t.resolvables;
            }).reduce(Ee, []).filter(function(e) {
                return e.token === t;
            }));
        }, t.prototype.getPolicy = function(t) {
            var e = this.findNode(t);
            return t.getPolicy(e.state);
        }, t.prototype.subContext = function(e) {
            return new t(en.subPath(this._path, function(t) {
                return t.state === e;
            }));
        }, t.prototype.addResolvables = function(t, e) {
            var n = S(this._path, jt("state", e)), r = t.map(function(t) {
                return t.token;
            });
            n.resolvables = n.resolvables.filter(function(t) {
                return -1 === r.indexOf(t.token);
            }).concat(t);
        }, t.prototype.resolvePath = function(t, e) {
            var n = this;
            void 0 === t && (t = "LAZY");
            var r = (ve(sn, t) ? t : "LAZY") === on.when.EAGER ? un : sn;
            Be.traceResolvePath(this._path, t, e);
            var i = function(t, e) {
                return function(r) {
                    return ve(t, n.getPolicy(r)[e]);
                };
            }, o = this._path.reduce(function(t, o) {
                var a = o.resolvables.filter(i(r, "when")), s = a.filter(i([ "NOWAIT" ], "async")), u = a.filter(Mt(i([ "NOWAIT" ], "async"))), c = n.subContext(o.state), l = function(t) {
                    return t.get(c, e).then(function(e) {
                        return {
                            token: t.token,
                            value: e
                        };
                    });
                };
                return s.forEach(l), t.concat(u.map(l));
            }, []);
            return ae.$q.all(o);
        }, t.prototype.injector = function() {
            return this._injector || (this._injector = new fn(this));
        }, t.prototype.findNode = function(t) {
            return S(this._path, function(e) {
                return ve(e.resolvables, t);
            });
        }, t.prototype.getDependencies = function(t) {
            var e = this, n = this.findNode(t), r = (en.subPath(this._path, function(t) {
                return t === n;
            }) || this._path).reduce(function(t, e) {
                return t.concat(e.resolvables);
            }, []).filter(function(e) {
                return e !== t;
            });
            return t.deps.map(function(t) {
                var n = r.filter(function(e) {
                    return e.token === t;
                });
                if (n.length) return O(n);
                var i = e.injector().getNative(t);
                if (Wt(i)) throw new Error("Could not find Dependency Injection token: " + J(t));
                return new rn(t, function() {
                    return i;
                }, [], i);
            });
        }, t;
    }(), fn = function() {
        function t(t) {
            this.context = t, this.native = this.get(cn) || ae.$injector;
        }
        return t.prototype.get = function(t) {
            var e = this.context.getResolvable(t);
            if (e) {
                if ("NOWAIT" === this.context.getPolicy(e).async) return e.get(this.context);
                if (!e.resolved) throw new Error("Resolvable async .get() not complete:" + J(e.token));
                return e.data;
            }
            return this.getNative(t);
        }, t.prototype.getAsync = function(t) {
            var e = this.context.getResolvable(t);
            return e ? e.get(this.context) : ae.$q.when(this.native.get(t));
        }, t.prototype.getNative = function(t) {
            return this.native && this.native.get(t);
        }, t;
    }(), hn = Vt("self"), pn = function() {
        function e(e, n, r) {
            var i = this;
            if (this._deferred = ae.$q.defer(), this.promise = this._deferred.promise, this._registeredHooks = {}, 
            this._hookBuilder = new Ke(this), this.isActive = function() {
                return i.router.globals.transition === i;
            }, this.router = r, !(this._targetState = n).valid()) throw new Error(n.error());
            this._options = he({
                current: Ut(this)
            }, n.options()), this.$id = r.transitionService._transitionCount++;
            var o = en.buildToPath(e, n);
            this._treeChanges = en.treeChanges(e, o, this._options.reloadState), this.createTransitionHookRegFns();
            var a = this._hookBuilder.buildHooksForPhase(t.TransitionHookPhase.CREATE);
            Ge.invokeHooks(a, function() {
                return null;
            }), this.applyViewConfigs(r);
        }
        return e.prototype.onBefore = function(t, e, n) {}, e.prototype.onStart = function(t, e, n) {}, 
        e.prototype.onExit = function(t, e, n) {}, e.prototype.onRetain = function(t, e, n) {}, 
        e.prototype.onEnter = function(t, e, n) {}, e.prototype.onFinish = function(t, e, n) {}, 
        e.prototype.onSuccess = function(t, e, n) {}, e.prototype.onError = function(t, e, n) {}, 
        e.prototype.createTransitionHookRegFns = function() {
            var e = this;
            this.router.transitionService._pluginapi._getEvents().filter(function(e) {
                return e.hookPhase !== t.TransitionHookPhase.CREATE;
            }).forEach(function(t) {
                return M(e, e.router.transitionService, t);
            });
        }, e.prototype.getHooks = function(t) {
            return this._registeredHooks[t];
        }, e.prototype.applyViewConfigs = function(t) {
            var e = this._treeChanges.entering.map(function(t) {
                return t.state;
            });
            en.applyViewConfigs(t.transitionService.$view, this._treeChanges.to, e);
        }, e.prototype.$from = function() {
            return O(this._treeChanges.from).state;
        }, e.prototype.$to = function() {
            return O(this._treeChanges.to).state;
        }, e.prototype.from = function() {
            return this.$from().self;
        }, e.prototype.to = function() {
            return this.$to().self;
        }, e.prototype.targetState = function() {
            return this._targetState;
        }, e.prototype.is = function(t) {
            return t instanceof e ? this.is({
                to: t.$to().name,
                from: t.$from().name
            }) : !(t.to && !I(this.$to(), t.to) || t.from && !I(this.$from(), t.from));
        }, e.prototype.params = function(t) {
            return void 0 === t && (t = "to"), Object.freeze(this._treeChanges[t].map(Vt("paramValues")).reduce(ye, {}));
        }, e.prototype.injector = function(t, e) {
            void 0 === e && (e = "to");
            var n = this._treeChanges[e];
            return t && (n = en.subPath(n, function(e) {
                return e.state === t || e.state.name === t;
            })), new ln(n).injector();
        }, e.prototype.getResolveTokens = function(t) {
            return void 0 === t && (t = "to"), new ln(this._treeChanges[t]).getTokens();
        }, e.prototype.addResolvable = function(t, e) {
            void 0 === e && (e = ""), t = Lt(rn)(t) ? t : new rn(t);
            var n = "string" == typeof e ? e : e.name, r = this._treeChanges.to, i = S(r, function(t) {
                return t.state.name === n;
            });
            new ln(r).addResolvables([ t ], i.state);
        }, e.prototype.redirectedFrom = function() {
            return this._options.redirectedFrom || null;
        }, e.prototype.originalTransition = function() {
            var t = this.redirectedFrom();
            return t && t.originalTransition() || this;
        }, e.prototype.options = function() {
            return this._options;
        }, e.prototype.entering = function() {
            return x(this._treeChanges.entering, Vt("state")).map(hn);
        }, e.prototype.exiting = function() {
            return x(this._treeChanges.exiting, Vt("state")).map(hn).reverse();
        }, e.prototype.retained = function() {
            return x(this._treeChanges.retained, Vt("state")).map(hn);
        }, e.prototype.views = function(t, e) {
            void 0 === t && (t = "entering");
            var n = this._treeChanges[t];
            return (n = e ? n.filter(jt("state", e)) : n).map(Vt("views")).filter(l).reduce(Ee, []);
        }, e.prototype.treeChanges = function(t) {
            return t ? this._treeChanges[t] : this._treeChanges;
        }, e.prototype.redirect = function(t) {
            for (var e = 1, n = this; null != (n = n.redirectedFrom()); ) if (20 < ++e) throw new Error("Too many consecutive Transition redirects (20+)");
            var r = {
                redirectedFrom: this,
                source: "redirect"
            };
            "url" === this.options().source && !1 !== t.options().location && (r.location = "replace");
            var i = he({}, this.options(), t.options(), r);
            t = t.withOptions(i, !0);
            var o = this.router.transitionService.create(this._treeChanges.from, t), a = this._treeChanges.entering, s = o._treeChanges.entering;
            return en.matching(s, a, en.nonDynamicParams).filter(Mt(function(t) {
                return function(e) {
                    return t && e.state.includes[t.name];
                };
            }(t.options().reloadState))).forEach(function(t, e) {
                t.resolvables = a[e].resolvables;
            }), o;
        }, e.prototype._changedParams = function() {
            var t = this._treeChanges;
            if (!(this._options.reload || t.exiting.length || t.entering.length || t.to.length !== t.from.length || _(t.to, t.from).map(function(t) {
                return t[0].state !== t[1].state;
            }).reduce(xe, !1))) {
                var e = t.to.map(function(t) {
                    return t.paramSchema;
                }), n = [ t.to, t.from ].map(function(t) {
                    return t.map(function(t) {
                        return t.paramValues;
                    });
                });
                return _(e, n[0], n[1]).map(function(t) {
                    var e = t[0], n = t[1], r = t[2];
                    return Xe.changed(e, n, r);
                }).reduce(Ee, []);
            }
        }, e.prototype.dynamic = function() {
            var t = this._changedParams();
            return !!t && t.map(function(t) {
                return t.dynamic;
            }).reduce(xe, !1);
        }, e.prototype.ignored = function() {
            return !!this._ignoredReason();
        }, e.prototype._ignoredReason = function() {
            var t = this.router.globals.transition, e = this._options.reloadState, n = function(t, n) {
                if (t.length !== n.length) return !1;
                var r = en.matching(t, n);
                return t.length === r.filter(function(t) {
                    return !e || !t.state.includes[e.name];
                }).length;
            }, r = this.treeChanges(), i = t && t.treeChanges();
            return i && n(i.to, r.to) && n(i.exiting, r.exiting) ? "SameAsPending" : 0 === r.exiting.length && 0 === r.entering.length && n(r.from, r.to) ? "SameAsCurrent" : void 0;
        }, e.prototype.run = function() {
            var e = this, n = Ge.runAllHooks, r = function(t) {
                return e._hookBuilder.buildHooksForPhase(t);
            }, i = r(t.TransitionHookPhase.BEFORE);
            return Ge.invokeHooks(i, function() {
                var t = e.router.globals;
                return t.lastStartedTransitionId = e.$id, t.transition = e, t.transitionHistory.enqueue(e), 
                Be.traceTransitionStart(e), ae.$q.when(void 0);
            }).then(function() {
                var e = r(t.TransitionHookPhase.RUN);
                return Ge.invokeHooks(e, function() {
                    return ae.$q.when(void 0);
                });
            }).then(function() {
                Be.traceSuccess(e.$to(), e), e.success = !0, e._deferred.resolve(e.to()), n(r(t.TransitionHookPhase.SUCCESS));
            }, function(i) {
                Be.traceError(i, e), e.success = !1, e._deferred.reject(i), e._error = i, n(r(t.TransitionHookPhase.ERROR));
            }), this.promise;
        }, e.prototype.valid = function() {
            return !this.error() || void 0 !== this.success;
        }, e.prototype.abort = function() {
            Wt(this.success) && (this._aborted = !0);
        }, e.prototype.error = function() {
            var t = this.$to();
            if (t.self.abstract) return "Cannot transition to abstract state '" + t.name + "'";
            var e = t.parameters(), n = this.params(), r = e.filter(function(t) {
                return !t.validates(n[t.id]);
            });
            return r.length ? "Param values not valid for state '" + t.name + "'. Invalid params: [ " + r.map(function(t) {
                return t.id;
            }).join(", ") + " ]" : !1 === this.success ? this._error : void 0;
        }, e.prototype.toString = function() {
            var t = this.from(), e = this.to(), n = function(t) {
                return null !== t["#"] && void 0 !== t["#"] ? t : y(t, [ "#" ]);
            };
            return "Transition#" + this.$id + "( '" + (Xt(t) ? t.name : t) + "'" + J(n(this._treeChanges.from.map(Vt("paramValues")).reduce(ye, {}))) + " -> " + (this.valid() ? "" : "(X) ") + "'" + (Xt(e) ? e.name : e) + "'" + J(n(this.params())) + " )";
        }, e.diToken = e;
    }(), dn = null, vn = function(t) {
        var e = Me.isRejectionPromise;
        return (dn = dn || u([ [ Mt(Gt), Ut("undefined") ], [ Jt, Ut("null") ], [ ie, Ut("[Promise]") ], [ e, function(t) {
            return t._transitionRejection.toString();
        } ], [ Lt(Me), s("toString") ], [ Lt(pn), s("toString") ], [ Lt(rn), s("toString") ], [ c, W ], [ Ut(!0), l ] ]))(t);
    }, $n = function(t) {
        return function(e) {
            if (!e) return [ "", "" ];
            var n = e.indexOf(t);
            return -1 === n ? [ e, "" ] : [ e.substr(0, n), e.substr(n + 1) ];
        };
    }, mn = new RegExp("^(?:[a-z]+:)?//[^/]+/"), gn = function(t) {
        return t.replace(/\/[^/]*$/, "");
    }, yn = $n("#"), wn = $n("?"), bn = $n("="), Sn = function(t) {
        return t ? t.replace(/^#/, "") : "";
    }, xn = function() {
        function t() {
            this.enqueue = !0, this.typeQueue = [], this.defaultTypes = g(t.prototype, [ "hash", "string", "query", "path", "int", "bool", "date", "json", "any" ]), 
            this.types = de(x(this.defaultTypes, function(t, e) {
                return new Ye(he({
                    name: e
                }, t));
            }), {});
        }
        return t.prototype.dispose = function() {
            this.types = {};
        }, t.prototype.type = function(t, e, n) {
            if (!Gt(e)) return this.types[t];
            if (this.types.hasOwnProperty(t)) throw new Error("A type named '" + t + "' has already been defined.");
            return this.types[t] = new Ye(he({
                name: t
            }, e)), n && (this.typeQueue.push({
                name: t,
                def: n
            }), this.enqueue || this._flushTypeQueue()), this;
        }, t.prototype._flushTypeQueue = function() {
            for (;this.typeQueue.length; ) {
                var t = this.typeQueue.shift();
                if (t.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
                he(this.types[t.name], ae.$injector.invoke(t.def));
            }
        }, t;
    }();
    !function() {
        var t = function(t) {
            var e = function(t) {
                return null != t ? t.toString() : t;
            }, n = {
                encode: e,
                decode: e,
                is: Lt(String),
                pattern: /.*/,
                equals: function(t, e) {
                    return t == e;
                }
            };
            return he({}, n, t);
        };
        he(xn.prototype, {
            string: t({}),
            path: t({
                pattern: /[^/]*/
            }),
            query: t({}),
            hash: t({
                inherit: !1
            }),
            int: t({
                decode: function(t) {
                    return parseInt(t, 10);
                },
                is: function(t) {
                    return !Kt(t) && this.decode(t.toString()) === t;
                },
                pattern: /-?\d+/
            }),
            bool: t({
                encode: function(t) {
                    return t ? 1 : 0;
                },
                decode: function(t) {
                    return 0 !== parseInt(t, 10);
                },
                is: Lt(Boolean),
                pattern: /0|1/
            }),
            date: t({
                encode: function(t) {
                    return this.is(t) ? [ t.getFullYear(), ("0" + (t.getMonth() + 1)).slice(-2), ("0" + t.getDate()).slice(-2) ].join("-") : void 0;
                },
                decode: function(t) {
                    if (this.is(t)) return t;
                    var e = this.capture.exec(t);
                    return e ? new Date(e[1], e[2] - 1, e[3]) : void 0;
                },
                is: function(t) {
                    return t instanceof Date && !isNaN(t.valueOf());
                },
                equals: function(t, e) {
                    return [ "getFullYear", "getMonth", "getDate" ].reduce(function(n, r) {
                        return n && t[r]() === e[r]();
                    }, !0);
                },
                pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
                capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
            }),
            json: t({
                encode: le,
                decode: ce,
                is: Lt(Object),
                equals: pe,
                pattern: /[^/]*/
            }),
            any: t({
                encode: l,
                decode: l,
                is: function() {
                    return !0;
                },
                equals: pe
            })
        });
    }();
    var En, Cn = function() {
        function t(t) {
            void 0 === t && (t = {}), he(this, t);
        }
        return t.prototype.$inherit = function(t, e, n) {
            var r, i = m(e, n), o = {}, a = [];
            for (var s in i) if (i[s] && i[s].params && (r = Object.keys(i[s].params)).length) for (var u in r) 0 <= a.indexOf(r[u]) || (a.push(r[u]), 
            o[r[u]] = this[r[u]]);
            return he({}, o, t);
        }, t;
    }(), kn = function(t, e) {
        return function(n) {
            var r = n;
            r && r.url && r.name && r.name.match(/\.\*\*$/) && (r.url += "{remainder:any}");
            var i = function(t) {
                if (!Qt(t)) return !1;
                var e = "^" === t.charAt(0);
                return {
                    val: e ? t.substring(1) : t,
                    root: e
                };
            }(r.url), o = n.parent, a = i ? t.compile(i.val, {
                params: n.params || {},
                paramMap: function(t, e) {
                    return !1 === r.reloadOnSearch && e && (t = he(t || {}, {
                        dynamic: !0
                    })), t;
                }
            }) : r.url;
            if (!a) return null;
            if (!t.isMatcher(a)) throw new Error("Invalid url '" + a + "' in state '" + n + "'");
            return i && i.root ? a : (o && o.navigable || e()).url.append(a);
        };
    }, Tn = function() {
        function t(t, e) {
            this.matcher = t;
            var n = this, r = function() {
                return t.find("");
            }, i = function(t) {
                return "" === t.name;
            };
            this.builders = {
                name: [ Z ],
                self: [ Q ],
                parent: [ function(e) {
                    return i(e) ? null : t.find(n.parentName(e)) || r();
                } ],
                data: [ X ],
                url: [ kn(e, r) ],
                navigable: [ function(t) {
                    return function(e) {
                        return !t(e) && e.url ? e : e.parent ? e.parent.navigable : null;
                    };
                }(i) ],
                params: [ function(t) {
                    return function(e) {
                        var n = e.url && e.url.parameters({
                            inherit: !1
                        }) || [], r = be(we(y(e.params || {}, n.map(Vt("id"))), function(e, n) {
                            return t.fromConfig(n, null, e);
                        }));
                        return n.concat(r).map(function(t) {
                            return [ t.id, t ];
                        }).reduce(k, {});
                    };
                }(e.paramFactory) ],
                views: [],
                path: [ tt ],
                includes: [ et ],
                resolvables: [ nt ]
            };
        }
        return t.prototype.builder = function(t, e) {
            var n = this.builders, r = n[t] || [];
            return Qt(t) && !Gt(e) ? 1 < r.length ? r : r[0] : Qt(t) && Yt(e) ? (n[t] = r, n[t].push(e), 
            function() {
                return n[t].splice(n[t].indexOf(e, 1)) && null;
            }) : void 0;
        }, t.prototype.build = function(t) {
            var n = this.matcher, r = this.builders, i = this.parentName(t);
            if (i && !n.find(i, void 0, !1)) return null;
            for (var o in r) if (r.hasOwnProperty(o)) {
                var a = r[o].reduce(function(t, e) {
                    return function(n) {
                        return e(n, t);
                    };
                }, f);
                t[o] = a(t);
            }
            return t;
        }, t.prototype.parentName = function(t) {
            var e = t.name || "", n = e.split(".");
            if ("**" === n.pop() && n.pop(), n.length) {
                if (t.parent) throw new Error("States that specify the 'parent:' property should not have a '.' in their name (" + e + ")");
                return n.join(".");
            }
            return t.parent ? Qt(t.parent) ? t.parent : t.parent.name : "";
        }, t.prototype.name = function(t) {
            var e = t.name;
            if (-1 !== e.indexOf(".") || !t.parent) return e;
            var n = Qt(t.parent) ? t.parent : t.parent.name;
            return n ? n + "." + e : e;
        }, t;
    }(), An = function() {
        function t(t) {
            this._states = t;
        }
        return t.prototype.isRelative = function(t) {
            return 0 === (t = t || "").indexOf(".") || 0 === t.indexOf("^");
        }, t.prototype.find = function(t, e, n) {
            if (void 0 === n && (n = !0), t || "" === t) {
                var r = Qt(t), i = r ? t : t.name;
                this.isRelative(i) && (i = this.resolvePath(i, e));
                var o = this._states[i];
                if (o && (r || !(r || o !== t && o.self !== t))) return o;
                if (r && n) {
                    var a = be(this._states).filter(function(t) {
                        return t.__stateObjectCache.nameGlob && t.__stateObjectCache.nameGlob.matches(i);
                    });
                    return 1 < a.length && console.log("stateMatcher.find: Found multiple matches for " + i + " using glob: ", a.map(function(t) {
                        return t.name;
                    })), a[0];
                }
            }
        }, t.prototype.resolvePath = function(t, e) {
            if (!e) throw new Error("No reference point given for path '" + t + "'");
            for (var n = this.find(e), r = t.split("."), i = 0, o = r.length, a = n; i < o; i++) if ("" !== r[i] || 0 !== i) {
                if ("^" !== r[i]) break;
                if (!a.parent) throw new Error("Path '" + t + "' not valid for state '" + n.name + "'");
                a = a.parent;
            } else a = n;
            var s = r.slice(i).join(".");
            return a.name + (a.name && s ? "." : "") + s;
        }, t;
    }(), Pn = function() {
        function t(t, e, n, r, i) {
            this.$registry = t, this.$urlRouter = e, this.states = n, this.builder = r, this.listeners = i, 
            this.queue = [], this.matcher = t.matcher;
        }
        return t.prototype.dispose = function() {
            this.queue = [];
        }, t.prototype.register = function(t) {
            var e = this.queue, n = Ft.create(t), r = n.name;
            if (!Qt(r)) throw new Error("State must have a valid name");
            if (this.states.hasOwnProperty(r) || ve(e.map(Vt("name")), r)) throw new Error("State '" + r + "' is already defined");
            return e.push(n), this.flush(), n;
        }, t.prototype.flush = function() {
            for (var t = this, e = this, n = e.queue, r = e.states, i = e.builder, o = [], a = [], s = {}, u = function(e) {
                return t.states.hasOwnProperty(e) && t.states[e];
            }; 0 < n.length; ) {
                var c = n.shift(), l = c.name, f = i.build(c), h = a.indexOf(c);
                if (f) {
                    var p = u(l);
                    if (p && p.name === l) throw new Error("State '" + l + "' is already defined");
                    var d = u(l + ".**");
                    d && this.$registry.deregister(d), r[l] = c, this.attachRoute(c), 0 <= h && a.splice(h, 1), 
                    o.push(c);
                } else {
                    var v = s[l];
                    if (s[l] = n.length, 0 <= h && v === n.length) return n.push(c), r;
                    h < 0 && a.push(c), n.push(c);
                }
            }
            return o.length && this.listeners.forEach(function(t) {
                return t("registered", o.map(function(t) {
                    return t.self;
                }));
            }), r;
        }, t.prototype.attachRoute = function(t) {
            !t.abstract && t.url && this.$urlRouter.rule(this.$urlRouter.urlRuleFactory.create(t));
        }, t;
    }(), Vn = function() {
        function t(t) {
            this._router = t, this.states = {}, this.listeners = [], this.matcher = new An(this.states), 
            this.builder = new Tn(this.matcher, t.urlMatcherFactory), this.stateQueue = new Pn(this, t.urlRouter, this.states, this.builder, this.listeners), 
            this._registerRoot();
        }
        return t.prototype._registerRoot = function() {
            (this._root = this.stateQueue.register({
                name: "",
                url: "^",
                views: null,
                params: {
                    "#": {
                        value: null,
                        type: "hash",
                        dynamic: !0
                    }
                },
                abstract: !0
            })).navigable = null;
        }, t.prototype.dispose = function() {
            var t = this;
            this.stateQueue.dispose(), this.listeners = [], this.get().forEach(function(e) {
                return t.get(e) && t.deregister(e);
            });
        }, t.prototype.onStatesChanged = function(t) {
            return this.listeners.push(t), function() {
                $e(this.listeners)(t);
            }.bind(this);
        }, t.prototype.root = function() {
            return this._root;
        }, t.prototype.register = function(t) {
            return this.stateQueue.register(t);
        }, t.prototype._deregisterTree = function(t) {
            var e = this, n = this.get().map(function(t) {
                return t.$$state();
            }), r = function(t) {
                var e = n.filter(function(e) {
                    return -1 !== t.indexOf(e.parent);
                });
                return 0 === e.length ? e : e.concat(r(e));
            }, i = [ t ].concat(r([ t ])).reverse();
            return i.forEach(function(t) {
                var n = e._router.urlRouter;
                n.rules().filter(jt("state", t)).forEach(n.removeRule.bind(n)), delete e.states[t.name];
            }), i;
        }, t.prototype.deregister = function(t) {
            var e = this.get(t);
            if (!e) throw new Error("Can't deregister state; not found: " + t);
            var n = this._deregisterTree(e.$$state());
            return this.listeners.forEach(function(t) {
                return t("deregistered", n.map(function(t) {
                    return t.self;
                }));
            }), n;
        }, t.prototype.get = function(t, e) {
            var n = this;
            if (0 === arguments.length) return Object.keys(this.states).map(function(t) {
                return n.states[t].self;
            });
            var r = this.matcher.find(t, e);
            return r && r.self || null;
        }, t.prototype.decorator = function(t, e) {
            return this.builder.builder(t, e);
        }, t;
    }(), In = K("/"), Mn = function() {
        function e(t, n, r, i) {
            var o = this;
            this.config = i, this._cache = {
                path: [ this ]
            }, this._children = [], this._params = [], this._segments = [], this._compiled = [], 
            this.pattern = t, this.config = $(this.config, {
                params: {},
                strict: !0,
                caseInsensitive: !1,
                paramMap: l
            });
            for (var a, s, u, c = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, f = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, h = 0, p = [], d = function(n) {
                if (!e.nameValidator.test(n)) throw new Error("Invalid parameter name '" + n + "' in pattern '" + t + "'");
                if (S(o._params, jt("id", n))) throw new Error("Duplicate parameter name '" + n + "' in pattern '" + t + "'");
            }, v = function(e, r) {
                var i = e[2] || e[3], a = r ? e[4] : e[4] || ("*" === e[1] ? "[\\s\\S]*" : null);
                return {
                    id: i,
                    regexp: a,
                    cfg: o.config.params[i],
                    segment: t.substring(h, e.index),
                    type: a ? n.type(a) || function(t) {
                        return de(n.type(r ? "query" : "path"), {
                            pattern: new RegExp(t, o.config.caseInsensitive ? "i" : void 0)
                        });
                    }(a) : null
                };
            }; (a = c.exec(t)) && !(0 <= (s = v(a, !1)).segment.indexOf("?")); ) d(s.id), this._params.push(r.fromPath(s.id, s.type, this.config.paramMap(s.cfg, !1))), 
            this._segments.push(s.segment), p.push([ s.segment, O(this._params) ]), h = c.lastIndex;
            var m = (u = t.substring(h)).indexOf("?");
            if (0 <= m) {
                var g = u.substring(m);
                if (u = u.substring(0, m), 0 < g.length) for (h = 0; a = f.exec(g); ) d((s = v(a, !0)).id), 
                this._params.push(r.fromSearch(s.id, s.type, this.config.paramMap(s.cfg, !0))), 
                h = c.lastIndex;
            }
            this._segments.push(u), this._compiled = p.map(function(t) {
                return rt.apply(null, t);
            }).concat(rt(u));
        }
        return e.prototype.append = function(t) {
            return this._children.push(t), t._cache = {
                path: this._cache.path.concat(t),
                parent: this,
                pattern: null
            }, t;
        }, e.prototype.isRoot = function() {
            return this._cache.path[0] === this;
        }, e.prototype.toString = function() {
            return this.pattern;
        }, e.prototype.exec = function(t, e, n, r) {
            var i = this;
            void 0 === e && (e = {}), void 0 === r && (r = {});
            var o = function(t, e, n) {
                return t[e] = t[e] || n();
            }(this._cache, "pattern", function() {
                return new RegExp([ "^", ke(i._cache.path.map(Vt("_compiled"))).join(""), !1 === i.config.strict ? "/?" : "", "$" ].join(""), i.config.caseInsensitive ? "i" : void 0);
            }).exec(t);
            if (!o) return null;
            var a = this.parameters(), s = a.filter(function(t) {
                return !t.isSearch();
            }), u = a.filter(function(t) {
                return t.isSearch();
            }), c = this._cache.path.map(function(t) {
                return t._segments.length - 1;
            }).reduce(function(t, e) {
                return t + e;
            }), l = {};
            if (c !== o.length - 1) throw new Error("Unbalanced capture group in route '" + this.pattern + "'");
            for (var f = 0; f < c; f++) {
                for (var h = s[f], p = o[f + 1], d = 0; d < h.replace.length; d++) h.replace[d].from === p && (p = h.replace[d].to);
                p && !0 === h.array && (p = function(t) {
                    var e = function(t) {
                        return t.split("").reverse().join("");
                    };
                    return x(x(e(p).split(/-(?!\\)/), e), function(t) {
                        return t.replace(/\\-/g, "-");
                    }).reverse();
                }()), Gt(p) && (p = h.type.decode(p)), l[h.id] = h.value(p);
            }
            return u.forEach(function(t) {
                for (var n = e[t.id], r = 0; r < t.replace.length; r++) t.replace[r].from === n && (n = t.replace[r].to);
                Gt(n) && (n = t.type.decode(n)), l[t.id] = t.value(n);
            }), n && (l["#"] = n), l;
        }, e.prototype.parameters = function(t) {
            return void 0 === t && (t = {}), !1 === t.inherit ? this._params : ke(this._cache.path.map(function(t) {
                return t._params;
            }));
        }, e.prototype.parameter = function(t, e) {
            var n = this;
            void 0 === e && (e = {});
            var r = this._cache.parent;
            return function() {
                for (var e = 0, r = n._params; e < r.length; e++) {
                    var i = r[e];
                    if (i.id === t) return i;
                }
            }() || !1 !== e.inherit && r && r.parameter(t, e) || null;
        }, e.prototype.validates = function(t) {
            return t = t || {}, this.parameters().filter(function(e) {
                return t.hasOwnProperty(e.id);
            }).map(function(n) {
                return function(t, e) {
                    return !t || t.validates(e);
                }(n, t[n.id]);
            }).reduce(Se, !0);
        }, e.prototype.format = function(t) {
            function n(e) {
                var n = e.value(t[e.id]), r = e.validates(n), i = e.isDefaultValue(n);
                return {
                    param: e,
                    value: n,
                    isValid: r,
                    isDefaultValue: i,
                    squash: !!i && e.squash,
                    encoded: e.type.encode(n)
                };
            }
            void 0 === t && (t = {});
            var r = this._cache.path, i = r.map(e.pathSegmentsAndParams).reduce(Ee, []).map(function(t) {
                return Qt(t) ? t : n(t);
            }), o = r.map(e.queryParams).reduce(Ee, []).map(n);
            if (i.concat(o).filter(function(t) {
                return !1 === t.isValid;
            }).length) return null;
            var a = i.reduce(function(t, n) {
                if (Qt(n)) return t + n;
                var r = n.squash, i = n.encoded, o = n.param;
                return !0 === r ? t.match(/\/$/) ? t.slice(0, -1) : t : Qt(r) ? t + r : !1 !== r ? t : null == i ? t : te(i) ? t + x(i, e.encodeDashes).join("-") : o.raw ? t + i : t + encodeURIComponent(i);
            }, ""), s = o.map(function(t) {
                var e = t.param, n = t.squash, r = t.encoded, i = t.isDefaultValue;
                if (!(null == r || i && !1 !== n) && (te(r) || (r = [ r ]), 0 !== r.length)) return e.raw || (r = x(r, encodeURIComponent)), 
                r.map(function(t) {
                    return e.id + "=" + t;
                });
            }).filter(l).reduce(Ee, []).join("&");
            return a + (s ? "?" + s : "") + (t["#"] ? "#" + t["#"] : "");
        }, e.encodeDashes = function(t) {
            return encodeURIComponent(t).replace(/-/g, function(t) {
                return "%5C%" + t.charCodeAt(0).toString(16).toUpperCase();
            });
        }, e.pathSegmentsAndParams = function(e) {
            return _(e._segments, e._params.filter(function(e) {
                return e.location === t.DefType.PATH;
            }).concat(void 0)).reduce(Ee, []).filter(function(t) {
                return "" !== t && Gt(t);
            });
        }, e.queryParams = function(e) {
            return e._params.filter(function(e) {
                return e.location === t.DefType.SEARCH;
            });
        }, e.compare = function(t, n) {
            var i = function(t) {
                return t._cache.weights = t._cache.weights || function(t) {
                    return t._cache.segments = t._cache.segments || t._cache.path.map(e.pathSegmentsAndParams).reduce(Ee, []).reduce(Y, []).map(function(t) {
                        return Qt(t) ? In(t) : t;
                    }).reduce(Ee, []);
                }(t).map(function(t) {
                    return "/" === t ? 1 : Qt(t) ? 2 : t instanceof Xe ? 3 : void 0;
                });
            }, o = i(t), a = i(n);
            !function(t, e, n) {
                for (var r = Math.max(t.length, e.length); t.length < r; ) t.push(0);
                for (;e.length < r; ) e.push(0);
            }(o, a);
            var s, u, c = _(o, a);
            for (u = 0; u < c.length; u++) if (0 != (s = c[u][0] - c[u][1])) return s;
            return 0;
        }, e.nameValidator = /^\w+([-.]+\w+)*(?:\[\])?$/, e;
    }(), Nn = function() {
        function e() {
            var e = this;
            this.paramTypes = new xn(), this._isCaseInsensitive = !1, this._isStrictMode = !0, 
            this._defaultSquashPolicy = !1, this._getConfig = function(t) {
                return he({
                    strict: e._isStrictMode,
                    caseInsensitive: e._isCaseInsensitive
                }, t);
            }, this.paramFactory = {
                fromConfig: function(n, r, i) {
                    return new Xe(n, r, i, t.DefType.CONFIG, e);
                },
                fromPath: function(n, r, i) {
                    return new Xe(n, r, i, t.DefType.PATH, e);
                },
                fromSearch: function(n, r, i) {
                    return new Xe(n, r, i, t.DefType.SEARCH, e);
                }
            }, he(this, {
                UrlMatcher: Mn,
                Param: Xe
            });
        }
        return e.prototype.caseInsensitive = function(t) {
            return this._isCaseInsensitive = Gt(t) ? t : this._isCaseInsensitive;
        }, e.prototype.strictMode = function(t) {
            return this._isStrictMode = Gt(t) ? t : this._isStrictMode;
        }, e.prototype.defaultSquashPolicy = function(t) {
            if (Gt(t) && !0 !== t && !1 !== t && !Qt(t)) throw new Error("Invalid squash policy: " + t + ". Valid policies: false, true, arbitrary-string");
            return this._defaultSquashPolicy = Gt(t) ? t : this._defaultSquashPolicy;
        }, e.prototype.compile = function(t, e) {
            return new Mn(t, this.paramTypes, this.paramFactory, this._getConfig(e));
        }, e.prototype.isMatcher = function(t) {
            if (!Xt(t)) return !1;
            var e = !0;
            return fe(Mn.prototype, function(n, r) {
                Yt(n) && (e = e && Gt(t[r]) && Yt(t[r]));
            }), e;
        }, e.prototype.type = function(t, e, n) {
            var r = this.paramTypes.type(t, e, n);
            return Gt(e) ? this : r;
        }, e.prototype.$get = function() {
            return this.paramTypes.enqueue = !1, this.paramTypes._flushTypeQueue(), this;
        }, e.prototype.dispose = function() {
            this.paramTypes.dispose();
        }, e;
    }(), Dn = function() {
        function t(t) {
            this.router = t;
        }
        return t.prototype.compile = function(t) {
            return this.router.urlMatcherFactory.compile(t);
        }, t.prototype.create = function(t, e) {
            var n = this, r = u([ [ Qt, function(t) {
                return r(n.compile(t));
            } ], [ Lt(Mn), function(t) {
                return n.fromUrlMatcher(t, e);
            } ], [ re, function(t) {
                return n.fromState(t, n.router);
            } ], [ Lt(RegExp), function(t) {
                return n.fromRegExp(t, e);
            } ], [ Yt, function(t) {
                return new Ln(t, e);
            } ] ]), i = r(t);
            if (!i) throw new Error("invalid 'what' in when()");
            return i;
        }, t.prototype.fromUrlMatcher = function(t, e) {
            var n = e;
            Qt(e) && (e = this.router.urlMatcherFactory.compile(e)), Lt(Mn)(e) && (n = function(t) {
                return e.format(t);
            });
            var r = {
                urlMatcher: t,
                matchPriority: function(e) {
                    var n = t.parameters().filter(function(t) {
                        return t.isOptional;
                    });
                    return n.length ? n.filter(function(t) {
                        return e[t.id];
                    }).length / n.length : 1e-6;
                },
                type: "URLMATCHER"
            };
            return he(new Ln(function(e) {
                var n = t.exec(e.path, e.search, e.hash);
                return t.validates(n) && n;
            }, n), r);
        }, t.prototype.fromState = function(t, e) {
            var n = {
                state: t,
                type: "STATE"
            };
            return he(this.fromUrlMatcher(t.url, function(n) {
                var r = e.stateService, i = e.globals;
                r.href(t, n) !== r.href(i.current, i.params) && r.transitionTo(t, n, {
                    inherit: !0,
                    source: "url"
                });
            }), n);
        }, t.prototype.fromRegExp = function(t, e) {
            if (t.global || t.sticky) throw new Error("Rule RegExp must not be global or sticky");
            var n = Qt(e) ? function(t) {
                return e.replace(/\$(\$|\d{1,2})/, function(e, n) {
                    return t["$" === n ? 0 : Number(n)];
                });
            } : e, r = {
                regexp: t,
                type: "REGEXP"
            };
            return he(new Ln(function(e) {
                return t.exec(e.path);
            }, n), r);
        }, t.isUrlRule = function(t) {
            return t && [ "type", "match", "handler" ].every(function(e) {
                return Gt(t[e]);
            });
        }, t;
    }(), Ln = function(t, e) {
        var n = this;
        this.match = t, this.type = "RAW", this.matchPriority = function(t) {
            return 0 - n.$id;
        }, this.handler = e || l;
    };
    En = function(t, e) {
        var n = function(t, e) {
            return (e.priority || 0) - (t.priority || 0);
        }(t, e);
        return 0 !== n ? n : 0 !== (n = function(t, e) {
            var n = {
                STATE: 4,
                URLMATCHER: 4,
                REGEXP: 3,
                RAW: 2,
                OTHER: 1
            };
            return (n[t.type] || 0) - (n[e.type] || 0);
        }(t, e)) ? n : 0 !== (n = function(t, e) {
            return t.urlMatcher && e.urlMatcher ? Mn.compare(t.urlMatcher, e.urlMatcher) : 0;
        }(t, e)) ? n : function(t, e) {
            var n = {
                STATE: !0,
                URLMATCHER: !0
            };
            return n[t.type] && n[e.type] ? 0 : (t.$id || 0) - (e.$id || 0);
        }(t, e);
    };
    var Bn = function() {
        function t(e) {
            this._sortFn = En, this._rules = [], this.interceptDeferred = !1, this._id = 0, 
            this._sorted = !1, this._router = e, this.urlRuleFactory = new Dn(e), h(Ut(t.prototype), this, Ut(this));
        }
        return t.prototype.dispose = function() {
            this.listen(!1), this._rules = [], delete this._otherwiseFn;
        }, t.prototype.sort = function(t) {
            this._rules = this.stableSort(this._rules, this._sortFn = t || this._sortFn), this._sorted = !0;
        }, t.prototype.ensureSorted = function() {
            this._sorted || this.sort();
        }, t.prototype.stableSort = function(t, e) {
            var n = t.map(function(t, e) {
                return {
                    elem: t,
                    idx: e
                };
            });
            return n.sort(function(t, n) {
                var r = e(t.elem, n.elem);
                return 0 === r ? t.idx - n.idx : r;
            }), n.map(function(t) {
                return t.elem;
            });
        }, t.prototype.match = function(t) {
            var e = this;
            this.ensureSorted(), t = he({
                path: "",
                search: {},
                hash: ""
            }, t);
            var n = this.rules();
            this._otherwiseFn && n.push(this._otherwiseFn);
            for (var r, i = 0; i < n.length && (!r || 0 === this._sortFn(n[i], r.rule)); i++) {
                var o = function(n) {
                    var r = n.match(t, e._router);
                    return r && {
                        match: r,
                        rule: n,
                        weight: n.matchPriority(r)
                    };
                }(n[i]);
                r = !r || o && o.weight > r.weight ? o : r;
            }
            return r;
        }, t.prototype.sync = function(t) {
            if (!t || !t.defaultPrevented) {
                var e = this._router, n = e.urlService, r = e.stateService, i = {
                    path: n.path(),
                    search: n.search(),
                    hash: n.hash()
                }, o = this.match(i);
                u([ [ Qt, function(t) {
                    return n.url(t, !0);
                } ], [ ze.isDef, function(t) {
                    return r.go(t.state, t.params, t.options);
                } ], [ Lt(ze), function(t) {
                    return r.go(t.state(), t.params(), t.options());
                } ] ])(o && o.rule.handler(o.match, i, e));
            }
        }, t.prototype.listen = function(t) {
            var e = this;
            if (!1 !== t) return this._stopFn = this._stopFn || this._router.urlService.onChange(function(t) {
                return e.sync(t);
            });
            this._stopFn && this._stopFn(), delete this._stopFn;
        }, t.prototype.update = function(t) {
            var e = this._router.locationService;
            t ? this.location = e.path() : e.path() !== this.location && e.url(this.location, !0);
        }, t.prototype.push = function(t, e, n) {
            var r = n && !!n.replace;
            this._router.urlService.url(t.format(e || {}), r);
        }, t.prototype.href = function(t, e, n) {
            var r = t.format(e);
            if (null == r) return null;
            n = n || {
                absolute: !1
            };
            var i = this._router.urlService.config, o = i.html5Mode();
            if (o || null === r || (r = "#" + i.hashPrefix() + r), r = function(t, e, n, r) {
                return "/" === r ? t : e ? gn(r) + t : n ? r.slice(1) + t : t;
            }(r, o, n.absolute, i.baseHref()), !n.absolute || !r) return r;
            var a = !o && r ? "/" : "", s = i.port();
            return s = 80 === s || 443 === s ? "" : ":" + s, [ i.protocol(), "://", i.host(), s, a, r ].join("");
        }, t.prototype.rule = function(t) {
            var e = this;
            if (!Dn.isUrlRule(t)) throw new Error("invalid rule");
            return t.$id = this._id++, t.priority = t.priority || 0, this._rules.push(t), this._sorted = !1, 
            function() {
                return e.removeRule(t);
            };
        }, t.prototype.removeRule = function(t) {
            $e(this._rules, t);
        }, t.prototype.rules = function() {
            return this.ensureSorted(), this._rules.slice();
        }, t.prototype.otherwise = function(t) {
            var e = ot(t);
            this._otherwiseFn = this.urlRuleFactory.create(Ut(!0), e), this._sorted = !1;
        }, t.prototype.initial = function(t) {
            var e = ot(t);
            this.rule(this.urlRuleFactory.create(function(t, e) {
                return 0 === e.globals.transitionHistory.size() && !!/^\/?$/.exec(t.path);
            }, e));
        }, t.prototype.when = function(t, e, n) {
            var r = this.urlRuleFactory.create(t, e);
            return Gt(n && n.priority) && (r.priority = n.priority), this.rule(r), r;
        }, t.prototype.deferIntercept = function(t) {
            void 0 === t && (t = !0), this.interceptDeferred = t;
        }, t;
    }(), zn = function() {
        function t() {
            var t = this;
            this._uiViews = [], this._viewConfigs = [], this._viewConfigFactories = {}, this._pluginapi = {
                _rootViewContext: this._rootViewContext.bind(this),
                _viewConfigFactory: this._viewConfigFactory.bind(this),
                _registeredUIViews: function() {
                    return t._uiViews;
                },
                _activeViewConfigs: function() {
                    return t._viewConfigs;
                }
            };
        }
        return t.prototype._rootViewContext = function(t) {
            return this._rootContext = t || this._rootContext;
        }, t.prototype._viewConfigFactory = function(t, e) {
            this._viewConfigFactories[t] = e;
        }, t.prototype.createViewConfig = function(t, e) {
            var n = this._viewConfigFactories[e.$type];
            if (!n) throw new Error("ViewService: No view config factory registered for type " + e.$type);
            var r = n(t, e);
            return te(r) ? r : [ r ];
        }, t.prototype.deactivateViewConfig = function(t) {
            Be.traceViewServiceEvent("<- Removing", t), $e(this._viewConfigs, t);
        }, t.prototype.activateViewConfig = function(t) {
            Be.traceViewServiceEvent("-> Registering", t), this._viewConfigs.push(t);
        }, t.prototype.sync = function() {
            function e(t) {
                for (var e = t.viewDecl.$context, n = 0; ++n && e.parent; ) e = e.parent;
                return n;
            }
            var r = this, i = this._uiViews.map(function(t) {
                return [ t.fqn, t ];
            }).reduce(k, {}), o = n(function(t, e, n, r) {
                return e * (t(n) - t(r));
            }), a = this._uiViews.sort(o(function(t) {
                var e = function(t) {
                    return t && t.parent ? e(t.parent) + 1 : 1;
                };
                return 1e4 * t.fqn.split(".").length + e(t.creationContext);
            }, 1)).map(function(n) {
                var a = r._viewConfigs.filter(t.matches(i, n));
                return 1 < a.length && a.sort(o(e, -1)), [ n, a[0] ];
            });
            Be.traceViewSync(a), a.forEach(function(t) {
                var e = t[0], n = t[1];
                -1 !== r._uiViews.indexOf(e) && e.configUpdated(n);
            });
        }, t.prototype.registerUIView = function(t) {
            Be.traceViewServiceUIViewEvent("-> Registering", t);
            var e = this._uiViews;
            return e.filter(function(e) {
                return e.fqn === t.fqn && e.$type === t.$type;
            }).length && Be.traceViewServiceUIViewEvent("!!!! duplicate uiView named:", t), 
            e.push(t), this.sync(), function() {
                -1 !== e.indexOf(t) ? (Be.traceViewServiceUIViewEvent("<- Deregistering", t), $e(e)(t)) : Be.traceViewServiceUIViewEvent("Tried removing non-registered uiView", t);
            };
        }, t.prototype.available = function() {
            return this._uiViews.map(Vt("fqn"));
        }, t.prototype.active = function() {
            return this._uiViews.filter(Vt("$config")).map(Vt("name"));
        }, t.normalizeUIViewTarget = function(t, e) {
            void 0 === e && (e = "");
            var n = e.split("@"), r = n[0] || "$default", i = Qt(n[1]) ? n[1] : "^", o = /^(\^(?:\.\^)*)\.(.*$)/.exec(r);
            return o && (i = o[1], r = o[2]), "!" === r.charAt(0) && (r = r.substr(1), i = ""), 
            /^(\^(?:\.\^)*)$/.exec(i) ? i = i.split(".").reduce(function(t, e) {
                return t.parent;
            }, t).name : "." === i && (i = t.name), {
                uiViewName: r,
                uiViewContextAnchor: i
            };
        }, t.matches = function(t, e) {
            return function(n) {
                if (e.$type !== n.viewDecl.$type) return !1;
                var r = n.viewDecl, i = r.$uiViewName.split("."), o = e.fqn.split(".");
                if (!pe(i, o.slice(0 - i.length))) return !1;
                var a = 1 - i.length || void 0, s = o.slice(0, a).join("."), u = t[s].creationContext;
                return r.$uiViewContextAnchor === (u && u.name);
            };
        }, t;
    }(), Wn = function() {
        function t() {
            this.params = new Cn(), this.lastStartedTransitionId = -1, this.transitionHistory = new je([], 1), 
            this.successfulTransitions = new je([], 1);
        }
        return t.prototype.dispose = function() {
            this.transitionHistory.clear(), this.successfulTransitions.clear(), this.transition = null;
        }, t;
    }(), Gn = function(t) {
        return t.reduce(function(t, e) {
            return t[e] = oe(e), t;
        }, {
            dispose: f
        });
    }, Jn = [ "url", "path", "search", "hash", "onChange" ], Kn = [ "port", "protocol", "host", "baseHref", "html5Mode", "hashPrefix" ], Yn = [ "type", "caseInsensitive", "strictMode", "defaultSquashPolicy" ], Zn = [ "sort", "when", "initial", "otherwise", "rules", "rule", "removeRule" ], Qn = [ "deferIntercept", "listen", "sync", "match" ], Xn = function() {
        function t(t, e) {
            void 0 === e && (e = !0), this.router = t, this.rules = {}, this.config = {};
            var n = function() {
                return t.locationService;
            };
            h(n, this, n, Jn, e);
            var r = function() {
                return t.locationConfig;
            };
            h(r, this.config, r, Kn, e);
            var i = function() {
                return t.urlMatcherFactory;
            };
            h(i, this.config, i, Yn);
            var o = function() {
                return t.urlRouter;
            };
            h(o, this.rules, o, Zn), h(o, this, o, Qn);
        }
        return t.prototype.url = function(t, e, n) {}, t.prototype.path = function() {}, 
        t.prototype.search = function() {}, t.prototype.hash = function() {}, t.prototype.onChange = function(t) {}, 
        t.prototype.parts = function() {
            return {
                path: this.path(),
                search: this.search(),
                hash: this.hash()
            };
        }, t.prototype.dispose = function() {}, t.prototype.sync = function(t) {}, t.prototype.listen = function(t) {}, 
        t.prototype.deferIntercept = function(t) {}, t.prototype.match = function(t) {}, 
        t.locationServiceStub = Gn(Jn), t.locationConfigStub = Gn(Kn), t;
    }(), tr = 0, er = function() {
        function t(t, e) {
            void 0 === t && (t = Xn.locationServiceStub), void 0 === e && (e = Xn.locationConfigStub), 
            this.locationService = t, this.locationConfig = e, this.$id = tr++, this._disposed = !1, 
            this._disposables = [], this.trace = Be, this.viewService = new zn(), this.transitionService = new Rr(this), 
            this.globals = new Wn(), this.urlMatcherFactory = new Nn(), this.urlRouter = new Bn(this), 
            this.stateRegistry = new Vn(this), this.stateService = new Tr(this), this.urlService = new Xn(this), 
            this._plugins = {}, this.viewService._pluginapi._rootViewContext(this.stateRegistry.root()), 
            this.globals.$current = this.stateRegistry.root(), this.globals.current = this.globals.$current.self, 
            this.disposable(this.globals), this.disposable(this.stateService), this.disposable(this.stateRegistry), 
            this.disposable(this.transitionService), this.disposable(this.urlRouter), this.disposable(t), 
            this.disposable(e);
        }
        return t.prototype.disposable = function(t) {
            this._disposables.push(t);
        }, t.prototype.dispose = function(t) {
            var e = this;
            t && Yt(t.dispose) ? t.dispose(this) : (this._disposed = !0, this._disposables.slice().forEach(function(t) {
                try {
                    "function" == typeof t.dispose && t.dispose(e), $e(e._disposables, t);
                } catch (t) {}
            }));
        }, t.prototype.plugin = function(t, e) {
            void 0 === e && (e = {});
            var n = new t(this, e);
            if (!n.name) throw new Error("Required property `name` missing on plugin: " + n);
            return this._disposables.push(n), this._plugins[n.name] = n;
        }, t.prototype.getPlugin = function(t) {
            return t ? this._plugins[t] : be(this._plugins);
        }, t;
    }(), rr = function(t) {
        function e(e) {
            if (e) return e instanceof ze ? e : Qt(e) ? r.target(e, t.params(), t.options()) : e.state || e.params ? r.target(e.state || t.to(), e.params || t.params(), t.options()) : void 0;
        }
        var n = t.to().redirectTo;
        if (n) {
            var r = t.router.stateService;
            return Yt(n) ? ae.$q.when(n(t)).then(e) : e(n);
        }
    }, or = st("onExit"), sr = st("onRetain"), cr = st("onEnter"), fr = function(t) {
        return new ln(t.treeChanges().to).resolvePath("EAGER", t).then(f);
    }, pr = function(t, e) {
        return new ln(t.treeChanges().to).subContext(e.$$state()).resolvePath("LAZY", t).then(f);
    }, vr = function(t) {
        var e = ae.$q, n = t.views("entering");
        if (n.length) return e.all(n.map(function(t) {
            return e.when(t.load());
        })).then(f);
    }, mr = function(t) {
        var e = t.views("entering"), n = t.views("exiting");
        if (e.length || n.length) {
            var r = t.router.viewService;
            n.forEach(function(t) {
                return r.deactivateViewConfig(t);
            }), e.forEach(function(t) {
                return r.activateViewConfig(t);
            }), r.sync();
        }
    }, yr = function(t) {
        var e = t.router.globals, n = function() {
            e.transition === t && (e.transition = null);
        };
        t.onSuccess({}, function() {
            e.successfulTransitions.enqueue(t), e.$current = t.$to(), e.current = e.$current.self, 
            R(t.params(), e.params);
        }, {
            priority: 1e4
        }), t.promise.then(n, n);
    }, br = function(t) {
        var e = t.options(), n = t.router.stateService, r = t.router.urlRouter;
        if ("url" !== e.source && e.location && n.$current.navigable) {
            var i = {
                replace: "replace" === e.location
            };
            r.push(n.$current.navigable.url, n.params, i);
        }
        r.update(!0);
    }, xr = function(t) {
        var e = t.router, n = t.entering().filter(function(t) {
            return !!t.$$state().lazyLoad;
        }).map(function(e) {
            return ut(t, e);
        });
        return ae.$q.all(n).then(function() {
            if ("url" !== t.originalTransition().options().source) {
                var n = t.targetState();
                return e.stateService.target(n.identifier(), n.params(), n.options());
            }
            var r = e.urlService, i = r.match(r.parts()), o = i && i.rule;
            if (o && "STATE" === o.type) {
                var a = o.state, s = i.match;
                return e.stateService.target(a, s, t.options());
            }
            e.urlService.sync();
        });
    }, Cr = function(t, e, n, r, i, o, a, s) {
        void 0 === i && (i = !1), void 0 === o && (o = Ge.HANDLE_RESULT), void 0 === a && (a = Ge.REJECT_ERROR), 
        void 0 === s && (s = !1), this.name = t, this.hookPhase = e, this.hookOrder = n, 
        this.criteriaMatchPath = r, this.reverseSort = i, this.getResultHandler = o, this.getErrorHandler = a, 
        this.synchronous = s;
    }, Or = {
        location: !0,
        relative: null,
        inherit: !1,
        notify: !0,
        reload: !1,
        custom: {},
        current: function() {
            return null;
        },
        source: "unknown"
    }, Rr = function() {
        function e(t) {
            this._transitionCount = 0, this._eventTypes = [], this._registeredHooks = {}, this._criteriaPaths = {}, 
            this._router = t, this.$view = t.viewService, this._deregisterHookFns = {}, this._pluginapi = h(Ut(this), {}, Ut(this), [ "_definePathType", "_defineEvent", "_getPathTypes", "_getEvents", "getHooks" ]), 
            this._defineCorePaths(), this._defineCoreEvents(), this._registerCoreTransitionHooks();
        }
        return e.prototype.onCreate = function(t, e, n) {}, e.prototype.onBefore = function(t, e, n) {}, 
        e.prototype.onStart = function(t, e, n) {}, e.prototype.onExit = function(t, e, n) {}, 
        e.prototype.onRetain = function(t, e, n) {}, e.prototype.onEnter = function(t, e, n) {}, 
        e.prototype.onFinish = function(t, e, n) {}, e.prototype.onSuccess = function(t, e, n) {}, 
        e.prototype.onError = function(t, e, n) {}, e.prototype.dispose = function(t) {
            be(this._registeredHooks).forEach(function(t) {
                return t.forEach(function(e) {
                    e._deregistered = !0, $e(t, e);
                });
            });
        }, e.prototype.create = function(t, e) {
            return new pn(t, e, this._router);
        }, e.prototype._defineCoreEvents = function() {
            var e = t.TransitionHookPhase, n = Ge, r = this._criteriaPaths;
            this._defineEvent("onCreate", e.CREATE, 0, r.to, !1, n.LOG_REJECTED_RESULT, n.THROW_ERROR, !0), 
            this._defineEvent("onBefore", e.BEFORE, 0, r.to), this._defineEvent("onStart", e.RUN, 0, r.to), 
            this._defineEvent("onExit", e.RUN, 100, r.exiting, !0), this._defineEvent("onRetain", e.RUN, 200, r.retained), 
            this._defineEvent("onEnter", e.RUN, 300, r.entering), this._defineEvent("onFinish", e.RUN, 400, r.to), 
            this._defineEvent("onSuccess", e.SUCCESS, 0, r.to, !1, n.LOG_REJECTED_RESULT, n.LOG_ERROR, !0), 
            this._defineEvent("onError", e.ERROR, 0, r.to, !1, n.LOG_REJECTED_RESULT, n.LOG_ERROR, !0);
        }, e.prototype._defineCorePaths = function() {
            var e = t.TransitionHookScope.STATE, n = t.TransitionHookScope.TRANSITION;
            this._definePathType("to", n), this._definePathType("from", n), this._definePathType("exiting", e), 
            this._definePathType("retained", e), this._definePathType("entering", e);
        }, e.prototype._defineEvent = function(t, e, n, r, i, o, a, s) {
            void 0 === i && (i = !1), void 0 === o && (o = Ge.HANDLE_RESULT), void 0 === a && (a = Ge.REJECT_ERROR), 
            void 0 === s && (s = !1);
            var u = new Cr(t, e, n, r, i, o, a, s);
            this._eventTypes.push(u), M(this, this, u);
        }, e.prototype._getEvents = function(t) {
            return (Gt(t) ? this._eventTypes.filter(function(e) {
                return e.hookPhase === t;
            }) : this._eventTypes.slice()).sort(function(t, e) {
                var n = t.hookPhase - e.hookPhase;
                return 0 === n ? t.hookOrder - e.hookOrder : n;
            });
        }, e.prototype._definePathType = function(t, e) {
            this._criteriaPaths[t] = {
                name: t,
                scope: e
            };
        }, e.prototype._getPathTypes = function() {
            return this._criteriaPaths;
        }, e.prototype.getHooks = function(t) {
            return this._registeredHooks[t];
        }, e.prototype._registerCoreTransitionHooks = function() {
            var t = this._deregisterHookFns;
            t.addCoreResolves = function(t) {
                return t.onCreate({}, at);
            }(this), t.ignored = function(t) {
                return t.onBefore({}, ct, {
                    priority: -9999
                });
            }(this), t.invalid = function(t) {
                return t.onBefore({}, lt, {
                    priority: -1e4
                });
            }(this), t.redirectTo = function(t) {
                return t.onStart({
                    to: function(t) {
                        return !!t.redirectTo;
                    }
                }, rr);
            }(this), t.onExit = function(t) {
                return t.onExit({
                    exiting: function(t) {
                        return !!t.onExit;
                    }
                }, or);
            }(this), t.onRetain = function(t) {
                return t.onRetain({
                    retained: function(t) {
                        return !!t.onRetain;
                    }
                }, sr);
            }(this), t.onEnter = function(t) {
                return t.onEnter({
                    entering: function(t) {
                        return !!t.onEnter;
                    }
                }, cr);
            }(this), t.eagerResolve = function(t) {
                return t.onStart({}, fr, {
                    priority: 1e3
                });
            }(this), t.lazyResolve = function(t) {
                return t.onEnter({
                    entering: Ut(!0)
                }, pr, {
                    priority: 1e3
                });
            }(this), t.loadViews = function(t) {
                return t.onFinish({}, vr);
            }(this), t.activateViews = function(t) {
                return t.onSuccess({}, mr);
            }(this), t.updateGlobals = function(t) {
                return t.onCreate({}, yr);
            }(this), t.updateUrl = function(t) {
                return t.onSuccess({}, br, {
                    priority: 9999
                });
            }(this), t.lazyLoad = function(t) {
                return t.onBefore({
                    entering: function(t) {
                        return !!t.lazyLoad;
                    }
                }, xr);
            }(this);
        }, e;
    }(), Tr = function() {
        function e(t) {
            this.router = t, this.invalidCallbacks = [], this._defaultErrorHandler = function(t) {
                t instanceof Error && t.stack ? (console.error(t), console.error(t.stack)) : t instanceof Me ? (console.error(t.toString()), 
                t.detail && t.detail.stack && console.error(t.detail.stack)) : console.error(t);
            };
            var n = Object.keys(e.prototype).filter(Mt(ve([ "current", "$current", "params", "transition" ])));
            h(Ut(e.prototype), this, Ut(this), n);
        }
        return Object.defineProperty(e.prototype, "transition", {
            get: function() {
                return this.router.globals.transition;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "params", {
            get: function() {
                return this.router.globals.params;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "current", {
            get: function() {
                return this.router.globals.current;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "$current", {
            get: function() {
                return this.router.globals.$current;
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.dispose = function() {
            this.defaultErrorHandler(f), this.invalidCallbacks = [];
        }, e.prototype._handleInvalidTargetState = function(t, e) {
            var r = this, i = en.makeTargetState(this.router.stateRegistry, t), o = this.router.globals, a = function() {
                return o.transitionHistory.peekTail();
            }, s = a(), u = new je(this.invalidCallbacks.slice()), c = new ln(t).injector(), l = function(t) {
                if (t instanceof ze) {
                    var e = t;
                    return (e = r.target(e.identifier(), e.params(), e.options())).valid() ? a() !== s ? Me.superseded().toPromise() : r.transitionTo(e.identifier(), e.params(), e.options()) : Me.invalid(e.error()).toPromise();
                }
            };
            return function n() {
                var t = u.dequeue();
                return void 0 === t ? Me.invalid(e.error()).toPromise() : ae.$q.when(t(e, i, c)).then(l).then(function(t) {
                    return t || n();
                });
            }();
        }, e.prototype.onInvalid = function(t) {
            return this.invalidCallbacks.push(t), function() {
                $e(this.invalidCallbacks)(t);
            }.bind(this);
        }, e.prototype.reload = function(t) {
            return this.transitionTo(this.current, this.params, {
                reload: !Gt(t) || t,
                inherit: !1,
                notify: !1
            });
        }, e.prototype.go = function(t, e, n) {
            var r = $(n, {
                relative: this.$current,
                inherit: !0
            }, Or);
            return this.transitionTo(t, e, r);
        }, e.prototype.target = function(t, e, n) {
            if (void 0 === n && (n = {}), Xt(n.reload) && !n.reload.name) throw new Error("Invalid reload state object");
            var r = this.router.stateRegistry;
            if (n.reloadState = !0 === n.reload ? r.root() : r.matcher.find(n.reload, n.relative), 
            n.reload && !n.reloadState) throw new Error("No such reload state '" + (Qt(n.reload) ? n.reload : n.reload.name) + "'");
            return new ze(this.router.stateRegistry, t, e, n);
        }, e.prototype.getCurrentPath = function() {
            var e = this.router.globals.successfulTransitions.peekTail();
            return e ? e.treeChanges().to : [ new tn(this.router.stateRegistry.root()) ];
        }, e.prototype.transitionTo = function(e, n, r) {
            var i = this;
            void 0 === n && (n = {}), void 0 === r && (r = {});
            var o = this.router, a = o.globals;
            r = $(r, Or), r = he(r, {
                current: function() {
                    return a.transition;
                }
            });
            var s = this.target(e, n, r), u = this.getCurrentPath();
            if (!s.exists()) return this._handleInvalidTargetState(u, s);
            if (!s.valid()) return Ve(s.error());
            var c = function(e) {
                return function(n) {
                    if (n instanceof Me) {
                        var r = o.globals.lastStartedTransitionId === e.$id;
                        if (n.type === t.RejectType.IGNORED) return r && o.urlRouter.update(), ae.$q.when(a.current);
                        var s = n.detail;
                        if (n.type === t.RejectType.SUPERSEDED && n.redirected && s instanceof ze) {
                            var u = e.redirect(s);
                            return u.run().catch(c(u));
                        }
                        if (n.type === t.RejectType.ABORTED) return r && o.urlRouter.update(), ae.$q.reject(n);
                    }
                    return i.defaultErrorHandler()(n), ae.$q.reject(n);
                };
            }, l = this.router.transitionService.create(u, s), f = l.run().catch(c(l));
            return Pe(f), he(f, {
                transition: l
            });
        }, e.prototype.is = function(t, e, n) {
            n = $(n, {
                relative: this.$current
            });
            var r = this.router.stateRegistry.matcher.find(t, n.relative);
            if (Gt(r)) {
                if (this.$current !== r) return !1;
                if (!e) return !0;
                var i = r.parameters({
                    inherit: !0,
                    matchingKeys: e
                });
                return Xe.equals(i, Xe.values(i, e), this.params);
            }
        }, e.prototype.includes = function(t, e, n) {
            n = $(n, {
                relative: this.$current
            });
            var r = Qt(t) && Ht.fromString(t);
            if (r) {
                if (!r.matches(this.$current.name)) return !1;
                t = this.$current.name;
            }
            var i = this.router.stateRegistry.matcher.find(t, n.relative), o = this.$current.includes;
            if (Gt(i)) {
                if (!Gt(o[i.name])) return !1;
                if (!e) return !0;
                var a = i.parameters({
                    inherit: !0,
                    matchingKeys: e
                });
                return Xe.equals(a, Xe.values(a, e), this.params);
            }
        }, e.prototype.href = function(t, e, n) {
            n = $(n, {
                lossy: !0,
                inherit: !0,
                absolute: !1,
                relative: this.$current
            }), e = e || {};
            var r = this.router.stateRegistry.matcher.find(t, n.relative);
            if (!Gt(r)) return null;
            n.inherit && (e = this.params.$inherit(e, this.$current, r));
            var i = r && n.lossy ? r.navigable : r;
            return i && void 0 !== i.url && null !== i.url ? this.router.urlRouter.href(i.url, e, {
                absolute: n.absolute
            }) : null;
        }, e.prototype.defaultErrorHandler = function(t) {
            return this._defaultErrorHandler = t || this._defaultErrorHandler;
        }, e.prototype.get = function(t, e) {
            var n = this.router.stateRegistry;
            return 0 === arguments.length ? n.get() : n.get(t, e || this.$current);
        }, e.prototype.lazyLoad = function(t, e) {
            var n = this.get(t);
            if (!n || !n.lazyLoad) throw new Error("Can not lazy load " + t);
            var r = this.getCurrentPath(), i = en.makeTargetState(this.router.stateRegistry, r);
            return ut(e = e || this.router.transitionService.create(r, i), n);
        }, e;
    }(), Ar = {
        when: function(t) {
            return new Promise(function(e, n) {
                return e(t);
            });
        },
        reject: function(t) {
            return new Promise(function(e, n) {
                n(t);
            });
        },
        defer: function() {
            var t = {};
            return t.promise = new Promise(function(e, n) {
                t.resolve = e, t.reject = n;
            }), t;
        },
        all: function(t) {
            if (te(t)) return Promise.all(t);
            if (Xt(t)) {
                var e = Object.keys(t).map(function(e) {
                    return t[e].then(function(t) {
                        return {
                            key: e,
                            val: t
                        };
                    });
                });
                return Ar.all(e).then(function(t) {
                    return t.reduce(function(t, e) {
                        return t[e.key] = e.val, t;
                    }, {});
                });
            }
        }
    }, Pr = {}, Vr = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, jr = /([^\s,]+)/g, Ir = {
        get: function(t) {
            return Pr[t];
        },
        has: function(t) {
            return null != Ir.get(t);
        },
        invoke: function(t, e, n) {
            var r = he({}, Pr, n || {}), i = Ir.annotate(t), o = Re(function(t) {
                return r.hasOwnProperty(t);
            }, function(t) {
                return "DI can't find injectable: '" + t + "'";
            }), a = i.filter(o).map(function(t) {
                return r[t];
            });
            return Yt(t) ? t.apply(e, a) : t.slice(-1)[0].apply(e, a);
        },
        annotate: function(t) {
            if (!c(t)) throw new Error("Not an injectable function: " + t);
            if (t && t.$inject) return t.$inject;
            if (te(t)) return t.slice(0, -1);
            var e = t.toString().replace(Vr, "");
            return e.slice(e.indexOf("(") + 1, e.indexOf(")")).match(jr) || [];
        }
    }, Mr = function(t, e) {
        var n = e[0], r = e[1];
        return t.hasOwnProperty(n) ? te(t[n]) ? t[n].push(r) : t[n] = [ t[n], r ] : t[n] = r, 
        t;
    }, Nr = function(t) {
        return t.split("&").filter(l).map(bn).reduce(Mr, {});
    }, Dr = function(t) {
        var e = t.path(), n = t.search(), r = t.hash(), i = Object.keys(n).map(function(t) {
            var e = n[t];
            return (te(e) ? e : [ e ]).map(function(e) {
                return t + "=" + e;
            });
        }).reduce(Ee, []).join("&");
        return e + (i ? "?" + i : "") + (r ? "#" + r : "");
    }, Lr = function() {
        function t(t, e) {
            var n = this;
            this.fireAfterUpdate = e, this._listener = function(t) {
                return n._listeners.forEach(function(e) {
                    return e(t);
                });
            }, this._listeners = [], this.hash = function() {
                return ft(n._get()).hash;
            }, this.path = function() {
                return ft(n._get()).path;
            }, this.search = function() {
                return Nr(ft(n._get()).search);
            }, this._location = se.location, this._history = se.history;
        }
        return t.prototype.url = function(t, e) {
            return void 0 === e && (e = !0), Gt(t) && t !== this._get() && (this._set(null, null, t, e), 
            this.fireAfterUpdate && this._listeners.forEach(function(e) {
                return e({
                    url: t
                });
            })), Dr(this);
        }, t.prototype.onChange = function(t) {
            var e = this;
            return this._listeners.push(t), function() {
                return $e(e._listeners, t);
            };
        }, t.prototype.dispose = function(t) {
            ge(this._listeners);
        }, t;
    }(), qr = function() {
        var t = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, e) {
            t.__proto__ = e;
        } || function(t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        };
        return function(e, n) {
            function r() {
                this.constructor = e;
            }
            t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
            new r());
        };
    }(), Ur = function(t) {
        function e(e) {
            var n = t.call(this, e, !1) || this;
            return se.addEventListener("hashchange", n._listener, !1), n;
        }
        return qr(e, t), e.prototype._get = function() {
            return Sn(this._location.hash);
        }, e.prototype._set = function(t, e, n, r) {
            this._location.hash = n;
        }, e.prototype.dispose = function(e) {
            t.prototype.dispose.call(this, e), se.removeEventListener("hashchange", this._listener);
        }, e;
    }(Lr), Hr = function() {
        var t = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, e) {
            t.__proto__ = e;
        } || function(t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        };
        return function(e, n) {
            function r() {
                this.constructor = e;
            }
            t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
            new r());
        };
    }(), Fr = function(t) {
        function e(e) {
            return t.call(this, e, !0) || this;
        }
        return Hr(e, t), e.prototype._get = function() {
            return this._url;
        }, e.prototype._set = function(t, e, n, r) {
            this._url = n;
        }, e;
    }(Lr), Br = function() {
        var t = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, e) {
            t.__proto__ = e;
        } || function(t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        };
        return function(e, n) {
            function r() {
                this.constructor = e;
            }
            t(e, n), e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
            new r());
        };
    }(), zr = function(t) {
        function e(e) {
            var n = t.call(this, e, !0) || this;
            return n._config = e.urlService.config, se.addEventListener("popstate", n._listener, !1), 
            n;
        }
        return Br(e, t), e.prototype._getBasePrefix = function() {
            return gn(this._config.baseHref());
        }, e.prototype._get = function() {
            var t = this._location, e = t.pathname, n = t.hash, r = t.search;
            r = wn(r)[1], n = yn(n)[1];
            var i = this._getBasePrefix(), o = e === this._config.baseHref(), a = e.startsWith(i);
            return (e = o ? "/" : a ? e.substring(i.length) : e) + (r ? "?" + r : "") + (n ? "#" + n : "");
        }, e.prototype._set = function(t, e, n, r) {
            var i = this._getBasePrefix() + n;
            r ? this._history.replaceState(t, e, i) : this._history.pushState(t, e, i);
        }, e.prototype.dispose = function(e) {
            t.prototype.dispose.call(this, e), se.removeEventListener("popstate", this._listener);
        }, e;
    }(Lr), Wr = function() {
        var t = this;
        this._baseHref = "", this._port = 80, this._protocol = "http", this._host = "localhost", 
        this._hashPrefix = "", this.port = function() {
            return t._port;
        }, this.protocol = function() {
            return t._protocol;
        }, this.host = function() {
            return t._host;
        }, this.baseHref = function() {
            return t._baseHref;
        }, this.html5Mode = function() {
            return !1;
        }, this.hashPrefix = function(e) {
            return Gt(e) ? t._hashPrefix = e : t._hashPrefix;
        }, this.dispose = f;
    }, Gr = function() {
        function t(t, e) {
            void 0 === e && (e = !1), this._isHtml5 = e, this._baseHref = void 0, this._hashPrefix = "";
        }
        return t.prototype.port = function() {
            return location.port ? Number(location.port) : "https" === this.protocol() ? 443 : 80;
        }, t.prototype.protocol = function() {
            return location.protocol.replace(/:/g, "");
        }, t.prototype.host = function() {
            return location.hostname;
        }, t.prototype.html5Mode = function() {
            return this._isHtml5;
        }, t.prototype.hashPrefix = function(t) {
            return Gt(t) ? this._hashPrefix = t : this._hashPrefix;
        }, t.prototype.baseHref = function(t) {
            return Gt(t) ? this._baseHref = t : Gt(this._baseHref) ? this._baseHref : this.applyDocumentBaseHref();
        }, t.prototype.applyDocumentBaseHref = function() {
            var t = document.getElementsByTagName("base")[0];
            return this._baseHref = t ? t.href.substr(location.origin.length) : "";
        }, t.prototype.dispose = function() {}, t;
    }(), Jr = ht("vanilla.hashBangLocation", !1, Ur, Gr), Kr = ht("vanilla.pushStateLocation", !0, zr, Gr), Yr = ht("vanilla.memoryLocation", !1, Fr, Wr), Zr = function() {
        function t() {}
        return t.prototype.dispose = function(t) {}, t;
    }(), Qr = Object.freeze({
        root: se,
        fromJson: ce,
        toJson: le,
        forEach: fe,
        extend: he,
        equals: pe,
        identity: l,
        noop: f,
        createProxyFunctions: h,
        inherit: de,
        inArray: ve,
        _inArray: p,
        removeFrom: $e,
        _removeFrom: d,
        pushTo: me,
        _pushTo: v,
        deregAll: ge,
        defaults: $,
        mergeR: ye,
        ancestors: m,
        pick: g,
        omit: y,
        pluck: w,
        filter: b,
        find: S,
        mapObj: we,
        map: x,
        values: be,
        allTrueR: Se,
        anyTrueR: xe,
        unnestR: Ee,
        flattenR: Ce,
        pushR: E,
        uniqR: _e,
        unnest: ke,
        flatten: Oe,
        assertPredicate: Re,
        assertMap: Te,
        assertFn: C,
        pairs: Ae,
        arrayTuples: _,
        applyPairs: k,
        tail: O,
        copy: R,
        _extend: T,
        silenceUncaughtInPromise: Pe,
        silentRejection: Ve,
        notImplemented: oe,
        services: ae,
        Glob: Ht,
        curry: n,
        compose: r,
        pipe: i,
        prop: Vt,
        propEq: jt,
        parse: It,
        not: Mt,
        and: o,
        or: a,
        all: Nt,
        any: Dt,
        is: Lt,
        eq: qt,
        val: Ut,
        invoke: s,
        pattern: u,
        isUndefined: Wt,
        isDefined: Gt,
        isNull: Jt,
        isNullOrUndefined: Kt,
        isFunction: Yt,
        isNumber: Zt,
        isString: Qt,
        isObject: Xt,
        isArray: te,
        isDate: ee,
        isRegExp: ne,
        isState: re,
        isInjectable: c,
        isPromise: ie,
        Queue: je,
        maxLength: F,
        padString: B,
        kebobString: z,
        functionToString: W,
        fnToString: G,
        stringify: J,
        beforeAfterSubstr: $n,
        hostRegex: mn,
        stripFile: gn,
        splitHash: yn,
        splitQuery: wn,
        splitEqual: bn,
        trimHashVal: Sn,
        splitOnDelim: K,
        joinNeighborsR: Y,
        get Category() {
            return t.Category;
        },
        Trace: Fe,
        trace: Be,
        get DefType() {
            return t.DefType;
        },
        Param: Xe,
        ParamTypes: xn,
        StateParams: Cn,
        ParamType: Ye,
        PathNode: tn,
        PathUtils: en,
        resolvePolicies: on,
        defaultResolvePolicy: nn,
        Resolvable: rn,
        NATIVE_INJECTOR_TOKEN: cn,
        ResolveContext: ln,
        resolvablesBuilder: nt,
        StateBuilder: Tn,
        StateObject: Ft,
        StateMatcher: An,
        StateQueueManager: Pn,
        StateRegistry: Vn,
        StateService: Tr,
        TargetState: ze,
        get TransitionHookPhase() {
            return t.TransitionHookPhase;
        },
        get TransitionHookScope() {
            return t.TransitionHookScope;
        },
        HookBuilder: Ke,
        matchState: I,
        RegisteredHook: Je,
        makeEvent: M,
        get RejectType() {
            return t.RejectType;
        },
        Rejection: Me,
        Transition: pn,
        TransitionHook: Ge,
        TransitionEventType: Cr,
        defaultTransOpts: Or,
        TransitionService: Rr,
        UrlMatcher: Mn,
        UrlMatcherFactory: Nn,
        UrlRouter: Bn,
        UrlRuleFactory: Dn,
        BaseUrlRule: Ln,
        UrlService: Xn,
        ViewService: zn,
        UIRouterGlobals: Wn,
        UIRouter: er,
        $q: Ar,
        $injector: Ir,
        BaseLocationServices: Lr,
        HashLocationService: Ur,
        MemoryLocationService: Fr,
        PushStateLocationService: zr,
        MemoryLocationConfig: Wr,
        BrowserLocationConfig: Gr,
        keyValsToObjectR: Mr,
        getParams: Nr,
        parseUrl: ft,
        buildUrl: Dr,
        locationPluginFactory: ht,
        servicesPlugin: pt,
        hashLocationPlugin: Jr,
        pushStateLocationPlugin: Kr,
        memoryLocationPlugin: Yr,
        UIRouterPluginBase: Zr
    }), Xr = function(t, e) {
        return t.reduce(function(t, n) {
            return t || Gt(e[n]);
        }, !1);
    }, ti = 0, ei = function() {
        function t(t, e, n) {
            var r = this;
            this.path = t, this.viewDecl = e, this.factory = n, this.$id = ti++, this.loaded = !1, 
            this.getTemplate = function(t, e) {
                return r.component ? r.factory.makeComponentTemplate(t, e, r.component, r.viewDecl.bindings) : r.template;
            };
        }
        return t.prototype.load = function() {
            var t = this, e = ae.$q, n = new ln(this.path), r = this.path.reduce(function(t, e) {
                return he(t, e.paramValues);
            }, {}), i = {
                template: e.when(this.factory.fromConfig(this.viewDecl, r, n)),
                controller: e.when(this.getController(n))
            };
            return e.all(i).then(function(e) {
                return Be.traceViewServiceEvent("Loaded", t), t.controller = e.controller, he(t, e.template), 
                t;
            });
        }, t.prototype.getController = function(t) {
            var e = this.viewDecl.controllerProvider;
            if (!c(e)) return this.viewDecl.controller;
            var n = ae.$injector.annotate(e), r = te(e) ? O(e) : e;
            return new rn("", r, n).get(t);
        }, t;
    }(), ni = function() {
        function t() {
            var t = this;
            this._useHttp = Pt.version.minor < 3, this.$get = [ "$http", "$templateCache", "$injector", function(e, n, r) {
                return t.$templateRequest = r.has && r.has("$templateRequest") && r.get("$templateRequest"), 
                t.$http = e, t.$templateCache = n, t;
            } ];
        }
        return t.prototype.useHttpService = function(t) {
            this._useHttp = t;
        }, t.prototype.fromConfig = function(t, e, n) {
            var r = function(t) {
                return ae.$q.when(t).then(function(t) {
                    return {
                        template: t
                    };
                });
            }, i = function(t) {
                return ae.$q.when(t).then(function(t) {
                    return {
                        component: t
                    };
                });
            };
            return Gt(t.template) ? r(this.fromString(t.template, e)) : Gt(t.templateUrl) ? r(this.fromUrl(t.templateUrl, e)) : Gt(t.templateProvider) ? r(this.fromProvider(t.templateProvider, e, n)) : Gt(t.component) ? i(t.component) : Gt(t.componentProvider) ? i(this.fromComponentProvider(t.componentProvider, e, n)) : r("<ui-view></ui-view>");
        }, t.prototype.fromString = function(t, e) {
            return Yt(t) ? t(e) : t;
        }, t.prototype.fromUrl = function(t, e) {
            return Yt(t) && (t = t(e)), null == t ? null : this._useHttp ? this.$http.get(t, {
                cache: this.$templateCache,
                headers: {
                    Accept: "text/html"
                }
            }).then(function(t) {
                return t.data;
            }) : this.$templateRequest(t);
        }, t.prototype.fromProvider = function(t, e, n) {
            var r = ae.$injector.annotate(t), i = te(t) ? O(t) : t;
            return new rn("", i, r).get(n);
        }, t.prototype.fromComponentProvider = function(t, e, n) {
            var r = ae.$injector.annotate(t), i = te(t) ? O(t) : t;
            return new rn("", i, r).get(n);
        }, t.prototype.makeComponentTemplate = function(t, e, n, r) {
            r = r || {};
            var i = 3 <= Pt.version.minor ? "::" : "", o = function(t) {
                var e = z(t);
                return /^(x|data)-/.exec(e) ? "x-" + e : e;
            }, a = function(t) {
                var e = ae.$injector.get(t + "Directive");
                if (!e || !e.length) throw new Error("Unable to find component named '" + t + "'");
                return e.map(ri).reduce(Ee, []);
            }(n).map(function(n) {
                var a = n.name, s = n.type, u = o(a);
                if (t.attr(u) && !r[a]) return u + "='" + t.attr(u) + "'";
                var c = r[a] || a;
                if ("@" === s) return u + "='{{" + i + "$resolve." + c + "}}'";
                if ("&" !== s) return u + "='" + i + "$resolve." + c + "'";
                var l = e.getResolvable(c), f = l && l.data, h = f && ae.$injector.annotate(f) || [];
                return u + "='$resolve." + c + (te(f) ? "[" + (f.length - 1) + "]" : "") + "(" + h.join(",") + ")'";
            }).join(" "), s = o(n);
            return "<" + s + " " + a + "></" + s + ">";
        }, t;
    }(), ri = function(t) {
        return ii(Xt(t.bindToController) ? t.bindToController : t.scope);
    }, ii = function(t) {
        return Object.keys(t || {}).map(function(e) {
            return [ e, /^([=<@&])[?]?(.*)/.exec(t[e]) ];
        }).filter(function(t) {
            return Gt(t) && te(t[1]);
        }).map(function(t) {
            return {
                name: t[1][2] || t[0],
                type: t[1][1]
            };
        });
    }, oi = function() {
        function t(e, n) {
            this.stateRegistry = e, this.stateService = n, h(Ut(t.prototype), this, Ut(this));
        }
        return t.prototype.decorator = function(t, e) {
            return this.stateRegistry.decorator(t, e) || this;
        }, t.prototype.state = function(t, e) {
            return Xt(t) ? e = t : e.name = t, this.stateRegistry.register(e), this;
        }, t.prototype.onInvalid = function(t) {
            return this.stateService.onInvalid(t);
        }, t;
    }(), ai = function(t) {
        return function(e, n) {
            var r = e[t], i = "onExit" === t ? "from" : "to";
            return r ? function(t, e) {
                var n = new ln(t.treeChanges(i)), o = he(mi(n), {
                    $state$: e,
                    $transition$: t
                });
                return ae.$injector.invoke(r, this, o);
            } : void 0;
        };
    }, si = function() {
        function t(t) {
            this._urlListeners = [], this.$locationProvider = t;
            var e = Ut(t);
            h(e, this, e, [ "hashPrefix" ]);
        }
        return t.prototype.dispose = function() {}, t.prototype.onChange = function(t) {
            var e = this;
            return this._urlListeners.push(t), function() {
                return $e(e._urlListeners)(t);
            };
        }, t.prototype.html5Mode = function() {
            var t = this.$locationProvider.html5Mode();
            return (t = Xt(t) ? t.enabled : t) && this.$sniffer.history;
        }, t.prototype.url = function(t, e, n) {
            return void 0 === e && (e = !1), t && this.$location.url(t), e && this.$location.replace(), 
            n && this.$location.state(n), this.$location.url();
        }, t.prototype._runtimeServices = function(t, e, n, r) {
            var i = this;
            this.$location = e, this.$sniffer = n, t.$on("$locationChangeSuccess", function(t) {
                return i._urlListeners.forEach(function(e) {
                    return e(t);
                });
            });
            var o = Ut(e), a = Ut(r);
            h(o, this, o, [ "replace", "path", "search", "hash" ]), h(o, this, o, [ "port", "protocol", "host" ]), 
            h(a, this, a, [ "baseHref" ]);
        }, t.monkeyPatchPathParameterType = function(t) {
            var e = t.urlMatcherFactory.type("path");
            e.encode = function(t) {
                return null != t ? t.toString().replace(/(~|\/)/g, function(t) {
                    return {
                        "~": "~~",
                        "/": "~2F"
                    }[t];
                }) : t;
            }, e.decode = function(t) {
                return null != t ? t.toString().replace(/(~~|~2F)/g, function(t) {
                    return {
                        "~~": "~",
                        "~2F": "/"
                    }[t];
                }) : t;
            };
        }, t;
    }(), ui = function() {
        function t(t) {
            this._router = t, this._urlRouter = t.urlRouter;
        }
        return t.prototype.$get = function() {
            var t = this._urlRouter;
            return t.update(!0), t.interceptDeferred || t.listen(), t;
        }, t.prototype.rule = function(t) {
            var e = this;
            if (!Yt(t)) throw new Error("'rule' must be a function");
            var n = new Ln(function() {
                return t(ae.$injector, e._router.locationService);
            }, l);
            return this._urlRouter.rule(n), this;
        }, t.prototype.otherwise = function(t) {
            var e = this, n = this._urlRouter;
            if (Qt(t)) n.otherwise(t); else {
                if (!Yt(t)) throw new Error("'rule' must be a string or function");
                n.otherwise(function() {
                    return t(ae.$injector, e._router.locationService);
                });
            }
            return this;
        }, t.prototype.when = function(e, n) {
            return (te(n) || Yt(n)) && (n = t.injectableHandler(this._router, n)), this._urlRouter.when(e, n), 
            this;
        }, t.injectableHandler = function(t, e) {
            return function(n) {
                return ae.$injector.invoke(e, null, {
                    $match: n,
                    $stateParams: t.globals.params
                });
            };
        }, t.prototype.deferIntercept = function(t) {
            this._urlRouter.deferIntercept(t);
        }, t;
    }();
    Pt.module("ui.router.angular1", []);
    var ci = Pt.module("ui.router.init", []), li = Pt.module("ui.router.util", [ "ng", "ui.router.init" ]), fi = Pt.module("ui.router.router", [ "ui.router.util" ]), hi = Pt.module("ui.router.state", [ "ui.router.router", "ui.router.util", "ui.router.angular1" ]), pi = Pt.module("ui.router", [ "ui.router.init", "ui.router.state", "ui.router.angular1" ]), di = (Pt.module("ui.router.compat", [ "ui.router" ]), 
    null);
    mt.$inject = [ "$locationProvider" ];
    var vi = function(t) {
        return [ "$uiRouterProvider", function(e) {
            var n = e.router[t];
            return n.$get = function() {
                return n;
            }, n;
        } ];
    };
    gt.$inject = [ "$injector", "$q", "$uiRouter" ], yt.$inject = [ "$rootScope" ], 
    ci.provider("$uiRouter", mt), fi.provider("$urlRouter", [ "$uiRouterProvider", function(t) {
        return t.urlRouterProvider = new ui(t);
    } ]), li.provider("$urlService", vi("urlService")), li.provider("$urlMatcherFactory", [ "$uiRouterProvider", function() {
        return di.urlMatcherFactory;
    } ]), li.provider("$templateFactory", function() {
        return new ni();
    }), hi.provider("$stateRegistry", vi("stateRegistry")), hi.provider("$uiRouterGlobals", vi("globals")), 
    hi.provider("$transitions", vi("transitionService")), hi.provider("$state", [ "$uiRouterProvider", function() {
        return he(di.stateProvider, {
            $get: function() {
                return di.stateService;
            }
        });
    } ]), hi.factory("$stateParams", [ "$uiRouter", function(t) {
        return t.globals.params;
    } ]), pi.factory("$view", function() {
        return di.viewService;
    }), pi.service("$trace", function() {
        return Be;
    }), pi.run(yt), li.run([ "$urlMatcherFactory", function(t) {} ]), hi.run([ "$state", function(t) {} ]), 
    fi.run([ "$urlRouter", function(t) {} ]), ci.run(gt);
    var $i, gi, yi, wi, mi = function(t) {
        return t.getTokens().filter(Qt).map(function(e) {
            var n = t.getResolvable(e);
            return [ e, "NOWAIT" === t.getPolicy(n).async ? n.promise : n.data ];
        }).reduce(k, {});
    };
    $i = [ "$uiRouter", "$timeout", function(t, e) {
        var n = t.stateService;
        return {
            restrict: "A",
            require: [ "?^uiSrefActive", "?^uiSrefActiveEq" ],
            link: function(r, i, o, a) {
                function s() {
                    var t = p();
                    f && f(), l && (f = l.$$addStateInfo(t.uiState, t.uiStateParams)), null != t.href && o.$set(c.attr, t.href);
                }
                var u, c = xt(i), l = a[1] || a[0], f = null, h = {}, p = function() {
                    return St(n, i, h);
                }, d = wt(o.uiSref);
                h.uiState = d.state, h.uiStateOpts = o.uiSrefOpts ? r.$eval(o.uiSrefOpts) : {}, 
                d.paramExpr && (r.$watch(d.paramExpr, function(t) {
                    h.uiStateParams = he({}, t), s();
                }, !0), h.uiStateParams = he({}, r.$eval(d.paramExpr))), s(), r.$on("$destroy", t.stateRegistry.onStatesChanged(s)), 
                r.$on("$destroy", t.transitionService.onSuccess({}, s)), c.clickable && (u = Et(i, n, e, c, p), 
                _t(i, r, u, h.uiStateOpts));
            }
        };
    } ], gi = [ "$uiRouter", "$timeout", function(t, e) {
        var n = t.stateService;
        return {
            restrict: "A",
            require: [ "?^uiSrefActive", "?^uiSrefActiveEq" ],
            link: function(r, i, o, a) {
                function s() {
                    var t = d();
                    h && h(), l && (h = l.$$addStateInfo(t.uiState, t.uiStateParams)), null != t.href && o.$set(c.attr, t.href);
                }
                var u, c = xt(i), l = a[1] || a[0], h = null, p = {}, d = function() {
                    return St(n, i, p);
                }, v = [ "uiState", "uiStateParams", "uiStateOpts" ], $ = v.reduce(function(t, e) {
                    return t[e] = f, t;
                }, {});
                v.forEach(function(t) {
                    p[t] = o[t] ? r.$eval(o[t]) : null, o.$observe(t, function(e) {
                        $[t](), $[t] = r.$watch(e, function(e) {
                            p[t] = e, s();
                        }, !0);
                    });
                }), s(), r.$on("$destroy", t.stateRegistry.onStatesChanged(s)), r.$on("$destroy", t.transitionService.onSuccess({}, s)), 
                c.clickable && (u = Et(i, n, e, c, d), _t(i, r, u, p.uiStateOpts));
            }
        };
    } ], yi = [ "$state", "$stateParams", "$interpolate", "$uiRouter", function(t, e, n, r) {
        return {
            restrict: "A",
            controller: [ "$scope", "$element", "$attrs", function(e, i, o) {
                function a(t) {
                    t.promise.then(u, f);
                }
                function s(e, n, r) {
                    var o = {
                        state: t.get(e, bt(i)) || {
                            name: e
                        },
                        params: n,
                        activeClass: r
                    };
                    return p.push(o), function() {
                        $e(p)(o);
                    };
                }
                function u() {
                    var n = function(t) {
                        return t.split(/\s/).filter(l);
                    }, r = function(t) {
                        return t.map(function(t) {
                            return t.activeClass;
                        }).map(n).reduce(Ee, []);
                    }, o = r(p).concat(n(c)).reduce(_e, []), a = r(p.filter(function(e) {
                        return t.includes(e.state.name, e.params);
                    })), s = p.filter(function(e) {
                        return t.is(e.state.name, e.params);
                    }).length ? n(c) : [], u = a.concat(s).reduce(_e, []), f = o.filter(function(t) {
                        return !ve(u, t);
                    });
                    e.$evalAsync(function() {
                        u.forEach(function(t) {
                            return i.addClass(t);
                        }), f.forEach(function(t) {
                            return i.removeClass(t);
                        });
                    });
                }
                var c, h, p = [];
                c = n(o.uiSrefActiveEq || "", !1)(e);
                try {
                    h = e.$eval(o.uiSrefActive);
                } catch (t) {}
                h = h || n(o.uiSrefActive || "", !1)(e), Xt(h) && fe(h, function(t, n) {
                    if (Qt(t)) {
                        var r = wt(t);
                        s(r.state, e.$eval(r.paramExpr), n);
                    }
                }), this.$$addStateInfo = function(t, e) {
                    if (!(Xt(h) && 0 < p.length)) {
                        var n = s(t, e, h);
                        return u(), n;
                    }
                }, e.$on("$stateChangeSuccess", u), e.$on("$destroy", r.transitionService.onStart({}, a)), 
                r.globals.transition && a(r.globals.transition), u();
            } ]
        };
    } ], Pt.module("ui.router.state").directive("uiSref", $i).directive("uiSrefActive", yi).directive("uiSrefActiveEq", yi).directive("uiState", gi), 
    kt.$inject = [ "$state" ], Ot.$inject = [ "$state" ], Pt.module("ui.router.state").filter("isState", kt).filter("includedByState", Ot), 
    wi = [ "$view", "$animate", "$uiViewScroll", "$interpolate", "$q", function(t, e, n, r, i) {
        function o(t, n) {
            return {
                enter: function(t, n, r) {
                    2 < Pt.version.minor ? e.enter(t, null, n).then(r) : e.enter(t, null, n, r);
                },
                leave: function(t, n) {
                    2 < Pt.version.minor ? e.leave(t).then(n) : e.leave(t, n);
                }
            };
        }
        var s = {
            $cfg: {
                viewDecl: {
                    $context: t._pluginapi._rootViewContext()
                }
            },
            $uiView: {}
        }, u = {
            count: 0,
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            compile: function(e, c, l) {
                return function(e, c, f) {
                    function p(t) {
                        var r = e.$new(), o = i.defer(), a = i.defer(), s = {
                            $cfg: t,
                            $uiView: E
                        }, u = {
                            $animEnter: o.promise,
                            $animLeave: a.promise,
                            $$animLeave: a
                        };
                        r.$emit("$viewContentLoading", x), v = l(r, function(t) {
                            t.data("$uiViewAnim", u), t.data("$uiView", s), w.enter(t, c, function() {
                                o.resolve(), $ && $.$emit("$viewContentAnimationEnded"), (Gt(y) && !y || e.$eval(y)) && n(t);
                            }), function() {
                                if (d && (Be.traceUIViewEvent("Removing (previous) el", d.data("$uiView")), d.remove(), 
                                d = null), $ && (Be.traceUIViewEvent("Destroying scope", E), $.$destroy(), $ = null), 
                                v) {
                                    var t = v.data("$uiViewAnim");
                                    Be.traceUIViewEvent("Animate out", t), w.leave(v, function() {
                                        t.$$animLeave.resolve(), d = null;
                                    }), d = v, v = null;
                                }
                            }();
                        }), ($ = r).$emit("$viewContentLoaded", t || b), $.$eval(g);
                    }
                    var d, v, $, m, g = f.onload || "", y = f.autoscroll, w = o(), b = void 0, S = c.inheritedData("$uiView") || s, x = r(f.uiView || f.name || "")(e) || "$default", E = {
                        $type: "ng1",
                        id: u.count++,
                        name: x,
                        fqn: S.$uiView.fqn ? S.$uiView.fqn + "." + x : x,
                        config: null,
                        configUpdated: function(t) {
                            (!t || t instanceof ei) && (function(t, e) {
                                return t === e;
                            }(b, t) || (Be.traceUIViewConfigUpdated(E, t && t.viewDecl && t.viewDecl.$context), 
                            p(b = t)));
                        },
                        get creationContext() {
                            var t = It("$cfg.viewDecl.$context")(S), e = It("$uiView.creationContext")(S);
                            return t || e;
                        }
                    };
                    Be.traceUIViewEvent("Linking", E), c.data("$uiView", {
                        $uiView: E
                    }), p(), m = t.registerUIView(E), e.$on("$destroy", function() {
                        Be.traceUIViewEvent("Destroying/Unregistering", E), m();
                    });
                };
            }
        };
        return u;
    } ], Rt.$inject = [ "$compile", "$controller", "$transitions", "$view", "$q", "$timeout" ];
    var bi = "function" == typeof Pt.module("ui.router").component, Si = 0;
    Pt.module("ui.router.state").directive("uiView", wi), Pt.module("ui.router.state").directive("uiView", Rt), 
    Pt.module("ui.router.state").provider("$uiViewScroll", function() {
        var t = !1;
        this.useAnchorScroll = function() {
            t = !0;
        }, this.$get = [ "$anchorScroll", "$timeout", function(e, n) {
            return t ? e : function(t) {
                return n(function() {
                    t[0].scrollIntoView();
                }, 0, !1);
            };
        } ];
    }), t.default = "ui.router", t.core = Qr, t.watchDigests = yt, t.getLocals = mi, 
    t.getNg1ViewConfigFactory = dt, t.ng1ViewsBuilder = vt, t.Ng1ViewConfig = ei, t.StateProvider = oi, 
    t.UrlRouterProvider = ui, t.root = se, t.fromJson = ce, t.toJson = le, t.forEach = fe, 
    t.extend = he, t.equals = pe, t.identity = l, t.noop = f, t.createProxyFunctions = h, 
    t.inherit = de, t.inArray = ve, t._inArray = p, t.removeFrom = $e, t._removeFrom = d, 
    t.pushTo = me, t._pushTo = v, t.deregAll = ge, t.defaults = $, t.mergeR = ye, t.ancestors = m, 
    t.pick = g, t.omit = y, t.pluck = w, t.filter = b, t.find = S, t.mapObj = we, t.map = x, 
    t.values = be, t.allTrueR = Se, t.anyTrueR = xe, t.unnestR = Ee, t.flattenR = Ce, 
    t.pushR = E, t.uniqR = _e, t.unnest = ke, t.flatten = Oe, t.assertPredicate = Re, 
    t.assertMap = Te, t.assertFn = C, t.pairs = Ae, t.arrayTuples = _, t.applyPairs = k, 
    t.tail = O, t.copy = R, t._extend = T, t.silenceUncaughtInPromise = Pe, t.silentRejection = Ve, 
    t.notImplemented = oe, t.services = ae, t.Glob = Ht, t.curry = n, t.compose = r, 
    t.pipe = i, t.prop = Vt, t.propEq = jt, t.parse = It, t.not = Mt, t.and = o, t.or = a, 
    t.all = Nt, t.any = Dt, t.is = Lt, t.eq = qt, t.val = Ut, t.invoke = s, t.pattern = u, 
    t.isUndefined = Wt, t.isDefined = Gt, t.isNull = Jt, t.isNullOrUndefined = Kt, t.isFunction = Yt, 
    t.isNumber = Zt, t.isString = Qt, t.isObject = Xt, t.isArray = te, t.isDate = ee, 
    t.isRegExp = ne, t.isState = re, t.isInjectable = c, t.isPromise = ie, t.Queue = je, 
    t.maxLength = F, t.padString = B, t.kebobString = z, t.functionToString = W, t.fnToString = G, 
    t.stringify = J, t.beforeAfterSubstr = $n, t.hostRegex = mn, t.stripFile = gn, t.splitHash = yn, 
    t.splitQuery = wn, t.splitEqual = bn, t.trimHashVal = Sn, t.splitOnDelim = K, t.joinNeighborsR = Y, 
    t.Trace = Fe, t.trace = Be, t.Param = Xe, t.ParamTypes = xn, t.StateParams = Cn, 
    t.ParamType = Ye, t.PathNode = tn, t.PathUtils = en, t.resolvePolicies = on, t.defaultResolvePolicy = nn, 
    t.Resolvable = rn, t.NATIVE_INJECTOR_TOKEN = cn, t.ResolveContext = ln, t.resolvablesBuilder = nt, 
    t.StateBuilder = Tn, t.StateObject = Ft, t.StateMatcher = An, t.StateQueueManager = Pn, 
    t.StateRegistry = Vn, t.StateService = Tr, t.TargetState = ze, t.HookBuilder = Ke, 
    t.matchState = I, t.RegisteredHook = Je, t.makeEvent = M, t.Rejection = Me, t.Transition = pn, 
    t.TransitionHook = Ge, t.TransitionEventType = Cr, t.defaultTransOpts = Or, t.TransitionService = Rr, 
    t.UrlMatcher = Mn, t.UrlMatcherFactory = Nn, t.UrlRouter = Bn, t.UrlRuleFactory = Dn, 
    t.BaseUrlRule = Ln, t.UrlService = Xn, t.ViewService = zn, t.UIRouterGlobals = Wn, 
    t.UIRouter = er, t.$q = Ar, t.$injector = Ir, t.BaseLocationServices = Lr, t.HashLocationService = Ur, 
    t.MemoryLocationService = Fr, t.PushStateLocationService = zr, t.MemoryLocationConfig = Wr, 
    t.BrowserLocationConfig = Gr, t.keyValsToObjectR = Mr, t.getParams = Nr, t.parseUrl = ft, 
    t.buildUrl = Dr, t.locationPluginFactory = ht, t.servicesPlugin = pt, t.hashLocationPlugin = Jr, 
    t.pushStateLocationPlugin = Kr, t.memoryLocationPlugin = Yr, t.UIRouterPluginBase = Zr, 
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
}), function(t, e) {
    "use strict";
    var n = [ "ng", "oc.lazyLoad" ], r = {}, i = [], o = [], a = [], s = [], u = t.noop, c = {}, l = [];
    t.module("oc.lazyLoad", [ "ng" ]).provider("$ocLazyLoad", [ "$controllerProvider", "$provide", "$compileProvider", "$filterProvider", "$injector", "$animateProvider", function(f, d, v, $, m, g) {
        function y(e, r, i) {
            if (r) {
                var o, s, f, h = [];
                for (o = r.length - 1; 0 <= o; o--) if (s = r[o], t.isString(s) || (s = S(s)), s && -1 === l.indexOf(s) && (!E[s] || -1 !== a.indexOf(s))) {
                    var d = -1 === n.indexOf(s);
                    if (f = p(s), d && (n.push(s), y(e, f.requires, i)), 0 < f._runBlocks.length) for (c[s] = []; 0 < f._runBlocks.length; ) c[s].push(f._runBlocks.shift());
                    t.isDefined(c[s]) && (d || i.rerun) && (h = h.concat(c[s])), b(e, f._invokeQueue, s, i.reconfig), 
                    b(e, f._configBlocks, s, i.reconfig), u(d ? "ocLazyLoad.moduleLoaded" : "ocLazyLoad.moduleReloaded", s), 
                    r.pop(), l.push(s);
                }
                var v = e.getInstanceInjector();
                t.forEach(h, function(t) {
                    v.invoke(t);
                });
            }
        }
        function w(e, n) {
            function i(e, n) {
                var r, i = !0;
                return n.length && (r = o(e), t.forEach(n, function(t) {
                    i = i && o(t) !== r;
                })), i;
            }
            function o(e) {
                return t.isArray(e) ? A(e.toString()) : t.isObject(e) ? A(T(e)) : t.isDefined(e) && null !== e ? A(e.toString()) : e;
            }
            var a = e[2][0], s = e[1], c = !1;
            t.isUndefined(r[n]) && (r[n] = {}), t.isUndefined(r[n][s]) && (r[n][s] = {});
            var l = function(t, e) {
                r[n][s].hasOwnProperty(t) || (r[n][s][t] = []), i(e, r[n][s][t]) && (c = !0, r[n][s][t].push(e), 
                u("ocLazyLoad.componentLoaded", [ n, s, t ]));
            };
            if (t.isString(a)) l(a, e[2][1]); else {
                if (!t.isObject(a)) return !1;
                t.forEach(a, function(e, n) {
                    t.isString(e) ? l(e, a[1]) : l(n, e);
                });
            }
            return c;
        }
        function b(e, n, r, o) {
            var a, s, u, c;
            if (n) for (a = 0, s = n.length; a < s; a++) if (u = n[a], t.isArray(u)) {
                if (null !== e) {
                    if (!e.hasOwnProperty(u[0])) throw new Error("unsupported provider " + u[0]);
                    c = e[u[0]];
                }
                var l = w(u, r);
                if ("invoke" !== u[1]) l && t.isDefined(c) && c[u[1]].apply(c, u[2]); else {
                    var f = function(e) {
                        var n = i.indexOf(r + "-" + e);
                        (-1 === n || o) && (-1 === n && i.push(r + "-" + e), t.isDefined(c) && c[u[1]].apply(c, u[2]));
                    };
                    if (t.isFunction(u[2][0])) f(u[2][0]); else if (t.isArray(u[2][0])) for (var h = 0, p = u[2][0].length; h < p; h++) t.isFunction(u[2][0][h]) && f(u[2][0][h]);
                }
            }
        }
        function S(e) {
            var n = null;
            return t.isString(e) ? n = e : t.isObject(e) && e.hasOwnProperty("name") && t.isString(e.name) && (n = e.name), 
            n;
        }
        function x(e) {
            if (!t.isString(e)) return !1;
            try {
                return p(e);
            } catch (t) {
                if (/No module/.test(t) || -1 < t.message.indexOf("$injector:nomod")) return !1;
            }
        }
        var E = {}, C = {
            $controllerProvider: f,
            $compileProvider: v,
            $filterProvider: $,
            $provide: d,
            $injector: m,
            $animateProvider: g
        }, _ = !1, k = !1, O = [], R = {};
        O.push = function(t) {
            -1 === this.indexOf(t) && Array.prototype.push.apply(this, arguments);
        }, this.config = function(e) {
            t.isDefined(e.modules) && (t.isArray(e.modules) ? t.forEach(e.modules, function(t) {
                E[t.name] = t;
            }) : E[e.modules.name] = e.modules), t.isDefined(e.debug) && (_ = e.debug), t.isDefined(e.events) && (k = e.events);
        }, this._init = function(r) {
            if (0 === o.length) {
                var i = [ r ], a = [ "ng:app", "ng-app", "x-ng-app", "data-ng-app" ], u = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/, c = function(t) {
                    return t && i.push(t);
                };
                t.forEach(a, function(e) {
                    a[e] = !0, c(document.getElementById(e)), e = e.replace(":", "\\:"), void 0 !== r[0] && r[0].querySelectorAll && (t.forEach(r[0].querySelectorAll("." + e), c), 
                    t.forEach(r[0].querySelectorAll("." + e + "\\:"), c), t.forEach(r[0].querySelectorAll("[" + e + "]"), c));
                }), t.forEach(i, function(e) {
                    if (0 === o.length) {
                        var n = " " + r.className + " ", i = u.exec(n);
                        i ? o.push((i[2] || "").replace(/\s+/g, ",")) : t.forEach(e.attributes, function(t) {
                            0 === o.length && a[t.name] && o.push(t.value);
                        });
                    }
                });
            }
            0 !== o.length || (e.jasmine || e.mocha) && t.isDefined(t.mock) || console.error("No module found during bootstrap, unable to init ocLazyLoad. You should always use the ng-app directive or angular.boostrap when you use ocLazyLoad.");
            var l = function e(r) {
                if (-1 === n.indexOf(r)) {
                    n.push(r);
                    var i = t.module(r);
                    b(null, i._invokeQueue, r), b(null, i._configBlocks, r), t.forEach(i.requires, e);
                }
            };
            t.forEach(o, function(t) {
                l(t);
            }), o = [], s.pop();
        };
        var T = function(e) {
            try {
                return JSON.stringify(e);
            } catch (r) {
                var n = [];
                return JSON.stringify(e, function(e, r) {
                    if (t.isObject(r) && null !== r) {
                        if (-1 !== n.indexOf(r)) return;
                        n.push(r);
                    }
                    return r;
                });
            }
        }, A = function(t) {
            var e, n, r = 0;
            if (0 == t.length) return r;
            for (e = 0, n = t.length; e < n; e++) r = (r << 5) - r + t.charCodeAt(e), r |= 0;
            return r;
        };
        this.$get = [ "$log", "$rootElement", "$rootScope", "$cacheFactory", "$q", function(e, i, a, c, f) {
            function d(t) {
                var n = f.defer();
                return e.error(t.message), n.reject(t), n.promise;
            }
            var v, $ = c("ocLazyLoad");
            return _ || ((e = {}).error = t.noop, e.warn = t.noop, e.info = t.noop), C.getInstanceInjector = function() {
                return v || (v = i.data("$injector") || t.injector());
            }, {
                _broadcast: u = function(t, n) {
                    k && a.$broadcast(t, n), _ && e.info(t, n);
                },
                _$log: e,
                _getFilesCache: function() {
                    return $;
                },
                toggleWatch: function(t) {
                    t ? s.push(!0) : s.pop();
                },
                getModuleConfig: function(e) {
                    if (!t.isString(e)) throw new Error("You need to give the name of the module to get");
                    return E[e] ? t.copy(E[e]) : null;
                },
                setModuleConfig: function(e) {
                    if (!t.isObject(e)) throw new Error("You need to give the module config object to set");
                    return E[e.name] = e;
                },
                getModules: function() {
                    return n;
                },
                isLoaded: function(e) {
                    if (t.isString(e) && (e = [ e ]), t.isArray(e)) {
                        var r, i;
                        for (r = 0, i = e.length; r < i; r++) if (!function(t) {
                            var e = -1 < n.indexOf(t);
                            return e || (e = !!x(t)), e;
                        }(e[r])) return !1;
                        return !0;
                    }
                    throw new Error("You need to define the module(s) name(s)");
                },
                _getModuleName: S,
                _getModule: function(t) {
                    try {
                        return p(t);
                    } catch (e) {
                        throw (/No module/.test(e) || -1 < e.message.indexOf("$injector:nomod")) && (e.message = 'The module "' + T(t) + '" that you are trying to load does not exist. ' + e.message), 
                        e;
                    }
                },
                moduleExists: x,
                _loadDependencies: function(e, n) {
                    var r, i, o, a = [], s = this;
                    if (null === (e = s._getModuleName(e))) return f.when();
                    try {
                        r = s._getModule(e);
                    } catch (t) {
                        return d(t);
                    }
                    return i = s.getRequires(r), t.forEach(i, function(r) {
                        if (t.isString(r)) {
                            var i = s.getModuleConfig(r);
                            if (null === i) return void O.push(r);
                            (r = i).name = void 0;
                        }
                        if (s.moduleExists(r.name)) return 0 !== (o = r.files.filter(function(t) {
                            return s.getModuleConfig(r.name).files.indexOf(t) < 0;
                        })).length && s._$log.warn('Module "', e, '" attempted to redefine configuration for dependency. "', r.name, '"\n Additional Files Loaded:', o), 
                        t.isDefined(s.filesLoader) ? void a.push(s.filesLoader(r, n).then(function() {
                            return s._loadDependencies(r);
                        })) : d(new Error("Error: New dependencies need to be loaded from external files (" + r.files + "), but no loader has been defined."));
                        if (t.isArray(r)) {
                            var u = [];
                            t.forEach(r, function(t) {
                                var e = s.getModuleConfig(t);
                                null === e ? u.push(t) : e.files && (u = u.concat(e.files));
                            }), 0 < u.length && (r = {
                                files: u
                            });
                        } else t.isObject(r) && r.hasOwnProperty("name") && r.name && (s.setModuleConfig(r), 
                        O.push(r.name));
                        if (t.isDefined(r.files) && 0 !== r.files.length) {
                            if (!t.isDefined(s.filesLoader)) return d(new Error('Error: the module "' + r.name + '" is defined in external files (' + r.files + "), but no loader has been defined."));
                            a.push(s.filesLoader(r, n).then(function() {
                                return s._loadDependencies(r);
                            }));
                        }
                    }), f.all(a);
                },
                inject: function(e) {
                    var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], r = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2], i = this, a = f.defer();
                    if (t.isDefined(e) && null !== e) {
                        if (t.isArray(e)) {
                            var s = [];
                            return t.forEach(e, function(t) {
                                s.push(i.inject(t, n, r));
                            }), f.all(s);
                        }
                        i._addToLoadList(i._getModuleName(e), !0, r);
                    }
                    if (0 < o.length) {
                        var u = o.slice();
                        !function t(e) {
                            O.push(e), R[e] = a.promise, i._loadDependencies(e, n).then(function() {
                                try {
                                    l = [], y(C, O, n);
                                } catch (t) {
                                    return i._$log.error(t.message), void a.reject(t);
                                }
                                0 < o.length ? t(o.shift()) : a.resolve(u);
                            }, function(t) {
                                a.reject(t);
                            });
                        }(o.shift());
                    } else {
                        if (n && n.name && R[n.name]) return R[n.name];
                        a.resolve();
                    }
                    return a.promise;
                },
                getRequires: function(e) {
                    var r = [];
                    return t.forEach(e.requires, function(t) {
                        -1 === n.indexOf(t) && r.push(t);
                    }), r;
                },
                _invokeQueue: b,
                _registerInvokeList: w,
                _register: y,
                _addToLoadList: h,
                _unregister: function(e) {
                    t.isDefined(e) && t.isArray(e) && t.forEach(e, function(t) {
                        r[t] = void 0;
                    });
                }
            };
        } ], this._init(t.element(e.document));
    } ]);
    var f = t.bootstrap;
    t.bootstrap = function(e, p, d) {
        return n = [ "ng", "oc.lazyLoad" ], r = {}, i = [], o = [], a = [], s = [], u = t.noop, 
        c = {}, l = [], t.forEach(p.slice(), function(t) {
            h(t, !0, !0);
        }), f(e, p, d);
    };
    var h = function(e, n, r) {
        (0 < s.length || n) && t.isString(e) && -1 === o.indexOf(e) && (o.push(e), r && a.push(e));
    }, p = t.module;
    t.module = function(t, e, n) {
        return h(t, !1, !0), p(t, e, n);
    }, "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "oc.lazyLoad");
}(angular, window), function(t) {
    "use strict";
    t.module("oc.lazyLoad").directive("ocLazyLoad", [ "$ocLazyLoad", "$compile", "$animate", "$parse", "$timeout", function(e, n, r, i, o) {
        return {
            restrict: "A",
            terminal: !0,
            priority: 1e3,
            compile: function(o, a) {
                var s = o[0].innerHTML;
                return o.html(""), function(o, a, u) {
                    var c = i(u.ocLazyLoad);
                    o.$watch(function() {
                        return c(o) || u.ocLazyLoad;
                    }, function(i) {
                        t.isDefined(i) && e.load(i).then(function() {
                            r.enter(s, a), n(a.contents())(o);
                        });
                    }, !0);
                };
            }
        };
    } ]);
}(angular), function(t) {
    "use strict";
    t.module("oc.lazyLoad").config([ "$provide", function(e) {
        e.decorator("$ocLazyLoad", [ "$delegate", "$q", "$window", "$interval", function(e, n, r, i) {
            var o = !1, a = r.document.getElementsByTagName("head")[0] || r.document.getElementsByTagName("body")[0];
            return e.buildElement = function(s, u, c) {
                var l, f, h = n.defer(), p = e._getFilesCache(), d = function(t) {
                    var e = new Date().getTime();
                    return 0 <= t.indexOf("?") ? "&" === t.substring(0, t.length - 1) ? t + "_dc=" + e : t + "&_dc=" + e : t + "?_dc=" + e;
                };
                switch (t.isUndefined(p.get(u)) && p.put(u, h.promise), s) {
                  case "css":
                    (l = r.document.createElement("link")).type = "text/css", l.rel = "stylesheet", 
                    l.href = !1 === c.cache ? d(u) : u;
                    break;

                  case "js":
                    (l = r.document.createElement("script")).src = !1 === c.cache ? d(u) : u;
                    break;

                  default:
                    p.remove(u), h.reject(new Error('Requested type "' + s + '" is not known. Could not inject "' + u + '"'));
                }
                l.onload = l.onreadystatechange = function(t) {
                    l.readyState && !/^c|loade/.test(l.readyState) || f || (l.onload = l.onreadystatechange = null, 
                    f = 1, e._broadcast("ocLazyLoad.fileLoaded", u), h.resolve(l));
                }, l.onerror = function() {
                    p.remove(u), h.reject(new Error("Unable to load " + u));
                }, l.async = c.serie ? 0 : 1;
                var v = a.lastChild;
                if (c.insertBefore) {
                    var $ = t.element(t.isDefined(window.jQuery) ? c.insertBefore : document.querySelector(c.insertBefore));
                    $ && 0 < $.length && (v = $[0]);
                }
                if (v.parentNode.insertBefore(l, v), "css" == s) {
                    var m = r.navigator.userAgent.toLowerCase();
                    if (-1 < m.indexOf("phantomjs/1.9")) o = !0; else if (/iP(hone|od|ad)/.test(r.navigator.platform)) {
                        var g = r.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), y = parseFloat([ parseInt(g[1], 10), parseInt(g[2], 10), parseInt(g[3] || 0, 10) ].join("."));
                        o = y < 6;
                    } else if (-1 < m.indexOf("android")) {
                        var w = parseFloat(m.slice(m.indexOf("android") + 8));
                        o = w < 4.4;
                    } else if (-1 < m.indexOf("safari")) {
                        var b = m.match(/version\/([\.\d]+)/i);
                        o = b && b[1] && parseFloat(b[1]) < 6;
                    }
                    if (o) var S = 1e3, x = i(function() {
                        try {
                            l.sheet.cssRules, i.cancel(x), l.onload();
                        } catch (t) {
                            --S <= 0 && l.onerror();
                        }
                    }, 20);
                }
                return h.promise;
            }, e;
        } ]);
    } ]);
}(angular), function(t) {
    "use strict";
    t.module("oc.lazyLoad").config([ "$provide", function(e) {
        e.decorator("$ocLazyLoad", [ "$delegate", "$q", function(e, n) {
            return e.filesLoader = function(r) {
                var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], o = [], a = [], s = [], u = [], c = null, l = e._getFilesCache();
                e.toggleWatch(!0), t.extend(i, r);
                var f = function(n) {
                    var r, f = null;
                    if (t.isObject(n) && (f = n.type, n = n.path), c = l.get(n), t.isUndefined(c) || !1 === i.cache) {
                        if (null !== (r = /^(css|less|html|htm|js)?(?=!)/.exec(n)) && (f = r[1], n = n.substr(r[1].length + 1, n.length)), 
                        !f) if (null !== (r = /[.](css|less|html|htm|js)?((\?|#).*)?$/.exec(n))) f = r[1]; else {
                            if (e.jsLoader.hasOwnProperty("ocLazyLoadLoader") || !e.jsLoader.hasOwnProperty("requirejs")) return void e._$log.error("File type could not be determined. " + n);
                            f = "js";
                        }
                        "css" !== f && "less" !== f || -1 !== o.indexOf(n) ? "html" !== f && "htm" !== f || -1 !== a.indexOf(n) ? "js" === f || -1 === s.indexOf(n) ? s.push(n) : e._$log.error("File type is not valid. " + n) : a.push(n) : o.push(n);
                    } else c && u.push(c);
                };
                if (i.serie ? f(i.files.shift()) : t.forEach(i.files, function(t) {
                    f(t);
                }), 0 < o.length) {
                    var h = n.defer();
                    e.cssLoader(o, function(n) {
                        t.isDefined(n) && e.cssLoader.hasOwnProperty("ocLazyLoadLoader") ? (e._$log.error(n), 
                        h.reject(n)) : h.resolve();
                    }, i), u.push(h.promise);
                }
                if (0 < a.length) {
                    var p = n.defer();
                    e.templatesLoader(a, function(n) {
                        t.isDefined(n) && e.templatesLoader.hasOwnProperty("ocLazyLoadLoader") ? (e._$log.error(n), 
                        p.reject(n)) : p.resolve();
                    }, i), u.push(p.promise);
                }
                if (0 < s.length) {
                    var d = n.defer();
                    e.jsLoader(s, function(n) {
                        t.isDefined(n) && (e.jsLoader.hasOwnProperty("ocLazyLoadLoader") || e.jsLoader.hasOwnProperty("requirejs")) ? (e._$log.error(n), 
                        d.reject(n)) : d.resolve();
                    }, i), u.push(d.promise);
                }
                if (0 !== u.length) return i.serie && 0 < i.files.length ? n.all(u).then(function() {
                    return e.filesLoader(r, i);
                }) : n.all(u).finally(function(t) {
                    return e.toggleWatch(!1), t;
                });
                var v = n.defer(), $ = "Error: no file to load has been found, if you're trying to load an existing module you should use the 'inject' method instead of 'load'.";
                return e._$log.error($), v.reject($), v.promise;
            }, e.load = function(r) {
                var i, o = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], a = this, s = null, u = [], c = n.defer(), l = t.copy(r), f = t.copy(o);
                if (t.isArray(l)) return t.forEach(l, function(t) {
                    u.push(a.load(t, f));
                }), n.all(u).then(function(t) {
                    c.resolve(t);
                }, function(t) {
                    c.reject(t);
                }), c.promise;
                if (t.isString(l) ? (s = a.getModuleConfig(l)) || (s = {
                    files: [ l ]
                }) : t.isObject(l) && (s = t.isDefined(l.path) && t.isDefined(l.type) ? {
                    files: [ l ]
                } : a.setModuleConfig(l)), null === s) return i = 'Module "' + (a._getModuleName(l) || "unknown") + '" is not configured, cannot load.', 
                e._$log.error(i), c.reject(new Error(i)), c.promise;
                t.isDefined(s.template) && (t.isUndefined(s.files) && (s.files = []), t.isString(s.template) ? s.files.push(s.template) : t.isArray(s.template) && s.files.concat(s.template));
                var h = t.extend({}, f, s);
                return t.isUndefined(s.files) && t.isDefined(s.name) && e.moduleExists(s.name) ? e.inject(s.name, h, !0) : (e.filesLoader(s, h).then(function() {
                    e.inject(null, h).then(function(t) {
                        c.resolve(t);
                    }, function(t) {
                        c.reject(t);
                    });
                }, function(t) {
                    c.reject(t);
                }), c.promise);
            }, e;
        } ]);
    } ]);
}(angular), function(t) {
    "use strict";
    t.module("oc.lazyLoad").config([ "$provide", function(e) {
        e.decorator("$ocLazyLoad", [ "$delegate", "$q", function(e, n) {
            return e.cssLoader = function(r, i, o) {
                var a = [];
                t.forEach(r, function(t) {
                    a.push(e.buildElement("css", t, o));
                }), n.all(a).then(function() {
                    i();
                }, function(t) {
                    i(t);
                });
            }, e.cssLoader.ocLazyLoadLoader = !0, e;
        } ]);
    } ]);
}(angular), function(t) {
    "use strict";
    t.module("oc.lazyLoad").config([ "$provide", function(e) {
        e.decorator("$ocLazyLoad", [ "$delegate", "$q", function(e, n) {
            return e.jsLoader = function(r, i, o) {
                var a = [];
                t.forEach(r, function(t) {
                    a.push(e.buildElement("js", t, o));
                }), n.all(a).then(function() {
                    i();
                }, function(t) {
                    i(t);
                });
            }, e.jsLoader.ocLazyLoadLoader = !0, e;
        } ]);
    } ]);
}(angular), function(t) {
    "use strict";
    t.module("oc.lazyLoad").config([ "$provide", function(e) {
        e.decorator("$ocLazyLoad", [ "$delegate", "$templateCache", "$q", "$http", function(e, n, r, i) {
            return e.templatesLoader = function(o, a, s) {
                var u = [], c = e._getFilesCache();
                return t.forEach(o, function(e) {
                    var o = r.defer();
                    u.push(o.promise), i.get(e, s).then(function(r) {
                        var i = r.data;
                        t.isString(i) && 0 < i.length && t.forEach(t.element(i), function(t) {
                            "SCRIPT" === t.nodeName && "text/ng-template" === t.type && n.put(t.id, t.innerHTML);
                        }), t.isUndefined(c.get(e)) && c.put(e, !0), o.resolve();
                    }).catch(function(t) {
                        o.reject(new Error('Unable to load template file "' + e + '": ' + t.data));
                    });
                }), r.all(u).then(function() {
                    a();
                }, function(t) {
                    a(t);
                });
            }, e.templatesLoader.ocLazyLoadLoader = !0, e;
        } ]);
    } ]);
}(angular), Array.prototype.indexOf || (Array.prototype.indexOf = function(t, e) {
    var n;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var r = Object(this), i = r.length >>> 0;
    if (0 === i) return -1;
    var o = +e || 0;
    if (Math.abs(o) === 1 / 0 && (o = 0), i <= o) return -1;
    for (n = Math.max(0 <= o ? o : i - Math.abs(o), 0); n < i; ) {
        if (n in r && r[n] === t) return n;
        n++;
    }
    return -1;
});