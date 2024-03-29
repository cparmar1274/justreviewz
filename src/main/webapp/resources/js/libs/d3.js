!function() {
    function n(n) {
        return n && (n.ownerDocument || n.document || n).documentElement;
    }
    function t(n) {
        return n && (n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView);
    }
    function e(n, t) {
        return n < t ? -1 : t < n ? 1 : t <= n ? 0 : NaN;
    }
    function r(n) {
        return null === n ? NaN : +n;
    }
    function i(n) {
        return !isNaN(n);
    }
    function u(n) {
        return {
            left: function(t, e, r, i) {
                for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = t.length); r < i; ) {
                    var u = r + i >>> 1;
                    n(t[u], e) < 0 ? r = u + 1 : i = u;
                }
                return r;
            },
            right: function(t, e, r, i) {
                for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = t.length); r < i; ) {
                    var u = r + i >>> 1;
                    0 < n(t[u], e) ? i = u : r = u + 1;
                }
                return r;
            }
        };
    }
    function o(n) {
        return n.length;
    }
    function l(n, t) {
        for (var e in t) Object.defineProperty(n.prototype, e, {
            value: t[e],
            enumerable: !1
        });
    }
    function c() {
        this._ = Object.create(null);
    }
    function f(n) {
        return (n += "") === Ku || n[0] === Qu ? Qu + n : n;
    }
    function s(n) {
        return (n += "")[0] === Qu ? n.slice(1) : n;
    }
    function h(n) {
        return f(n) in this._;
    }
    function p(n) {
        return (n = f(n)) in this._ && delete this._[n];
    }
    function g() {
        var n = [];
        for (var t in this._) n.push(s(t));
        return n;
    }
    function v() {
        var n = 0;
        for (var t in this._) ++n;
        return n;
    }
    function d() {
        for (var n in this._) return !1;
        return !0;
    }
    function y() {
        this._ = Object.create(null);
    }
    function m(n) {
        return n;
    }
    function M(n, t, e) {
        return function() {
            var r = e.apply(t, arguments);
            return r === t ? n : r;
        };
    }
    function x(n, t) {
        if (t in n) return t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        for (var e = 0, r = no.length; e < r; ++e) {
            var i = no[e] + t;
            if (i in n) return i;
        }
    }
    function b() {}
    function _() {}
    function w(n) {
        function t() {
            for (var t, r = e, i = -1, u = r.length; ++i < u; ) (t = r[i].on) && t.apply(this, arguments);
            return n;
        }
        var e = [], r = new c();
        return t.on = function(t, i) {
            var u, o = r.get(t);
            return arguments.length < 2 ? o && o.on : (o && (o.on = null, e = e.slice(0, u = e.indexOf(o)).concat(e.slice(u + 1)), 
            r.remove(t)), i && e.push(r.set(t, {
                on: i
            })), n);
        }, t;
    }
    function S() {
        Ou.event.preventDefault();
    }
    function k() {
        for (var n, t = Ou.event; n = t.sourceEvent; ) t = n;
        return t;
    }
    function N(n) {
        for (var t = new _(), e = 0, r = arguments.length; ++e < r; ) t[arguments[e]] = w(t);
        return t.of = function(e, r) {
            return function(i) {
                try {
                    var u = i.sourceEvent = Ou.event;
                    i.target = n, Ou.event = i, t[i.type].apply(e, r);
                } finally {
                    Ou.event = u;
                }
            };
        }, t;
    }
    function E(n) {
        return eo(n, oo), n;
    }
    function A(n) {
        return "function" == typeof n ? n : function() {
            return ro(n, this);
        };
    }
    function C(n) {
        return "function" == typeof n ? n : function() {
            return io(n, this);
        };
    }
    function z(n, t) {
        return n = Ou.ns.qualify(n), null == t ? n.local ? function() {
            this.removeAttributeNS(n.space, n.local);
        } : function() {
            this.removeAttribute(n);
        } : "function" == typeof t ? n.local ? function() {
            var e = t.apply(this, arguments);
            null == e ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e);
        } : function() {
            var e = t.apply(this, arguments);
            null == e ? this.removeAttribute(n) : this.setAttribute(n, e);
        } : n.local ? function() {
            this.setAttributeNS(n.space, n.local, t);
        } : function() {
            this.setAttribute(n, t);
        };
    }
    function L(n) {
        return n.trim().replace(/\s+/g, " ");
    }
    function q(n) {
        return new RegExp("(?:^|\\s+)" + Ou.requote(n) + "(?:\\s+|$)", "g");
    }
    function T(n) {
        return (n + "").trim().split(/^|\s+/);
    }
    function R(n, t) {
        var e = (n = T(n).map(D)).length;
        return "function" == typeof t ? function() {
            for (var r = -1, i = t.apply(this, arguments); ++r < e; ) n[r](this, i);
        } : function() {
            for (var r = -1; ++r < e; ) n[r](this, t);
        };
    }
    function D(n) {
        var t = q(n);
        return function(e, r) {
            if (i = e.classList) return r ? i.add(n) : i.remove(n);
            var i = e.getAttribute("class") || "";
            r ? (t.lastIndex = 0, t.test(i) || e.setAttribute("class", L(i + " " + n))) : e.setAttribute("class", L(i.replace(t, " ")));
        };
    }
    function P(n, t, e) {
        return null == t ? function() {
            this.style.removeProperty(n);
        } : "function" == typeof t ? function() {
            var r = t.apply(this, arguments);
            null == r ? this.style.removeProperty(n) : this.style.setProperty(n, r, e);
        } : function() {
            this.style.setProperty(n, t, e);
        };
    }
    function U(n, t) {
        return null == t ? function() {
            delete this[n];
        } : "function" == typeof t ? function() {
            var e = t.apply(this, arguments);
            null == e ? delete this[n] : this[n] = e;
        } : function() {
            this[n] = t;
        };
    }
    function j(n) {
        return "function" == typeof n ? n : (n = Ou.ns.qualify(n)).local ? function() {
            return this.ownerDocument.createElementNS(n.space, n.local);
        } : function() {
            var t = this.ownerDocument, e = this.namespaceURI;
            return e === ao && t.documentElement.namespaceURI === ao ? t.createElement(n) : t.createElementNS(e, n);
        };
    }
    function F() {
        var n = this.parentNode;
        n && n.removeChild(this);
    }
    function H(n) {
        return {
            __data__: n
        };
    }
    function O(n) {
        return function() {
            return uo(this, n);
        };
    }
    function I(n) {
        return arguments.length || (n = e), function(t, e) {
            return t && e ? n(t.__data__, e.__data__) : !t - !e;
        };
    }
    function Y(n, t) {
        for (var e = 0, r = n.length; e < r; e++) for (var i, u = n[e], o = 0, a = u.length; o < a; o++) (i = u[o]) && t(i, o, e);
        return n;
    }
    function Z(n) {
        return eo(n, co), n;
    }
    function X(n, t, e) {
        function r() {
            var t = this[i];
            t && (this.removeEventListener(n, t, t.$), delete this[i]);
        }
        var i = "__on" + n, u = n.indexOf("."), o = $;
        0 < u && (n = n.slice(0, u));
        var a = fo.get(n);
        return a && (n = a, o = B), u ? t ? function() {
            var u = o(t, Yu(arguments));
            r.call(this), this.addEventListener(n, this[i] = u, u.$ = e), u._ = t;
        } : r : t ? b : function() {
            var t, e = new RegExp("^__on([^.]+)" + Ou.requote(n) + "$");
            for (var r in this) if (t = r.match(e)) {
                var i = this[r];
                this.removeEventListener(t[1], i, i.$), delete this[r];
            }
        };
    }
    function $(n, t) {
        return function(e) {
            var r = Ou.event;
            Ou.event = e, t[0] = this.__data__;
            try {
                n.apply(this, t);
            } finally {
                Ou.event = r;
            }
        };
    }
    function B(n, t) {
        var e = $(n, t);
        return function(n) {
            var t = this, r = n.relatedTarget;
            r && (r === t || 8 & r.compareDocumentPosition(t)) || e.call(t, n);
        };
    }
    function W(e) {
        var r = ".dragsuppress-" + ++ho, i = "click" + r, u = Ou.select(t(e)).on("touchmove" + r, S).on("dragstart" + r, S).on("selectstart" + r, S);
        if (null == so && (so = !("onselectstart" in e) && x(e.style, "userSelect")), so) {
            var o = n(e).style, a = o[so];
            o[so] = "none";
        }
        return function(n) {
            if (u.on(r, null), so && (o[so] = a), n) {
                var t = function() {
                    u.on(i, null);
                };
                u.on(i, function() {
                    S(), t();
                }, !0), setTimeout(t, 0);
            }
        };
    }
    function J(n, e) {
        e.changedTouches && (e = e.changedTouches[0]);
        var r = n.ownerSVGElement || n;
        if (r.createSVGPoint) {
            var i = r.createSVGPoint();
            if (po < 0) {
                var u = t(n);
                if (u.scrollX || u.scrollY) {
                    var o = (r = Ou.select("body").append("svg").style({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        margin: 0,
                        padding: 0,
                        border: "none"
                    }, "important"))[0][0].getScreenCTM();
                    po = !(o.f || o.e), r.remove();
                }
            }
            return i.y = po ? (i.x = e.pageX, e.pageY) : (i.x = e.clientX, e.clientY), [ (i = i.matrixTransform(n.getScreenCTM().inverse())).x, i.y ];
        }
        var a = n.getBoundingClientRect();
        return [ e.clientX - a.left - n.clientLeft, e.clientY - a.top - n.clientTop ];
    }
    function G() {
        return Ou.event.changedTouches[0].identifier;
    }
    function K(n) {
        return 0 < n ? 1 : n < 0 ? -1 : 0;
    }
    function Q(n, t, e) {
        return (t[0] - n[0]) * (e[1] - n[1]) - (t[1] - n[1]) * (e[0] - n[0]);
    }
    function nn(n) {
        return 1 < n ? 0 : n < -1 ? yo : Math.acos(n);
    }
    function tn(n) {
        return 1 < n ? xo : n < -1 ? -xo : Math.asin(n);
    }
    function rn(n) {
        return ((n = Math.exp(n)) + 1 / n) / 2;
    }
    function on(n) {
        return (n = Math.sin(n / 2)) * n;
    }
    function an() {}
    function ln(n, t, e) {
        return this instanceof ln ? (this.h = +n, this.s = +t, void (this.l = +e)) : arguments.length < 2 ? n instanceof ln ? new ln(n.h, n.s, n.l) : _n("" + n, wn, ln) : new ln(n, t, e);
    }
    function cn(n, t, e) {
        function i(n) {
            return Math.round(255 * function(n) {
                return 360 < n ? n -= 360 : n < 0 && (n += 360), n < 60 ? u + (o - u) * n / 60 : n < 180 ? o : n < 240 ? u + (o - u) * (240 - n) / 60 : u;
            }(n));
        }
        var u, o;
        return n = isNaN(n) ? 0 : (n %= 360) < 0 ? n + 360 : n, t = isNaN(t) ? 0 : t < 0 ? 0 : 1 < t ? 1 : t, 
        u = 2 * (e = e < 0 ? 0 : 1 < e ? 1 : e) - (o = e <= .5 ? e * (1 + t) : e + t - e * t), 
        new mn(i(n + 120), i(n), i(n - 120));
    }
    function fn(n, t, e) {
        return this instanceof fn ? (this.h = +n, this.c = +t, void (this.l = +e)) : arguments.length < 2 ? n instanceof fn ? new fn(n.h, n.c, n.l) : gn(n instanceof hn ? n.l : (n = Sn((n = Ou.rgb(n)).r, n.g, n.b)).l, n.a, n.b) : new fn(n, t, e);
    }
    function sn(n, t, e) {
        return isNaN(n) && (n = 0), isNaN(t) && (t = 0), new hn(e, Math.cos(n *= bo) * t, Math.sin(n) * t);
    }
    function hn(n, t, e) {
        return this instanceof hn ? (this.l = +n, this.a = +t, void (this.b = +e)) : arguments.length < 2 ? n instanceof hn ? new hn(n.l, n.a, n.b) : n instanceof fn ? sn(n.h, n.c, n.l) : Sn((n = mn(n)).r, n.g, n.b) : new hn(n, t, e);
    }
    function pn(n, t, e) {
        var r = (n + 16) / 116, i = r + t / 500, u = r - e / 200;
        return new mn(yn(3.2404542 * (i = vn(i) * zo) - 1.5371385 * (r = vn(r) * Lo) - .4985314 * (u = vn(u) * qo)), yn(-.969266 * i + 1.8760108 * r + .041556 * u), yn(.0556434 * i - .2040259 * r + 1.0572252 * u));
    }
    function gn(n, t, e) {
        return 0 < n ? new fn(Math.atan2(e, t) * _o, Math.sqrt(t * t + e * e), n) : new fn(NaN, NaN, n);
    }
    function vn(n) {
        return .206893034 < n ? n * n * n : (n - 4 / 29) / 7.787037;
    }
    function dn(n) {
        return .008856 < n ? Math.pow(n, 1 / 3) : 7.787037 * n + 4 / 29;
    }
    function yn(n) {
        return Math.round(255 * (n <= .00304 ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - .055));
    }
    function mn(n, t, e) {
        return this instanceof mn ? (this.r = ~~n, this.g = ~~t, void (this.b = ~~e)) : arguments.length < 2 ? n instanceof mn ? new mn(n.r, n.g, n.b) : _n("" + n, mn, cn) : new mn(n, t, e);
    }
    function Mn(n) {
        return new mn(n >> 16, n >> 8 & 255, 255 & n);
    }
    function xn(n) {
        return Mn(n) + "";
    }
    function bn(n) {
        return n < 16 ? "0" + Math.max(0, n).toString(16) : Math.min(255, n).toString(16);
    }
    function _n(n, t, e) {
        var r, i, u, o = 0, a = 0, l = 0;
        if (r = /([a-z]+)\((.*)\)/.exec(n = n.toLowerCase())) switch (i = r[2].split(","), 
        r[1]) {
          case "hsl":
            return e(parseFloat(i[0]), parseFloat(i[1]) / 100, parseFloat(i[2]) / 100);

          case "rgb":
            return t(Nn(i[0]), Nn(i[1]), Nn(i[2]));
        }
        return (u = Do.get(n)) ? t(u.r, u.g, u.b) : (null == n || "#" !== n.charAt(0) || isNaN(u = parseInt(n.slice(1), 16)) || (4 === n.length ? (o = (3840 & u) >> 4, 
        o |= o >> 4, a = 240 & u, a |= a >> 4, l = 15 & u, l |= l << 4) : 7 === n.length && (o = (16711680 & u) >> 16, 
        a = (65280 & u) >> 8, l = 255 & u)), t(o, a, l));
    }
    function wn(n, t, e) {
        var r, i, u = Math.min(n /= 255, t /= 255, e /= 255), o = Math.max(n, t, e), a = o - u, l = (o + u) / 2;
        return a ? (i = l < .5 ? a / (o + u) : a / (2 - o - u), r = n == o ? (t - e) / a + (t < e ? 6 : 0) : t == o ? (e - n) / a + 2 : (n - t) / a + 4, 
        r *= 60) : (r = NaN, i = 0 < l && l < 1 ? 0 : r), new ln(r, i, l);
    }
    function Sn(n, t, e) {
        var r = dn((.4124564 * (n = kn(n)) + .3575761 * (t = kn(t)) + .1804375 * (e = kn(e))) / zo), i = dn((.2126729 * n + .7151522 * t + .072175 * e) / Lo);
        return hn(116 * i - 16, 500 * (r - i), 200 * (i - dn((.0193339 * n + .119192 * t + .9503041 * e) / qo)));
    }
    function kn(n) {
        return (n /= 255) <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4);
    }
    function Nn(n) {
        var t = parseFloat(n);
        return "%" === n.charAt(n.length - 1) ? Math.round(2.55 * t) : t;
    }
    function En(n) {
        return "function" == typeof n ? n : function() {
            return n;
        };
    }
    function An(n) {
        return function(t, e, r) {
            return 2 === arguments.length && "function" == typeof e && (r = e, e = null), Cn(t, e, n, r);
        };
    }
    function Cn(n, t, e, r) {
        function i() {
            var n, t = l.status;
            if (!t && function(n) {
                var t = n.responseType;
                return t && "text" !== t ? n.response : n.responseText;
            }(l) || 200 <= t && t < 300 || 304 === t) {
                try {
                    n = e.call(u, l);
                } catch (n) {
                    return void o.error.call(u, n);
                }
                o.load.call(u, n);
            } else o.error.call(u, l);
        }
        var u = {}, o = Ou.dispatch("beforesend", "progress", "load", "error"), a = {}, l = new XMLHttpRequest(), c = null;
        return !this.XDomainRequest || "withCredentials" in l || !/^(http(s)?:)?\/\//.test(n) || (l = new XDomainRequest()), 
        "onload" in l ? l.onload = l.onerror = i : l.onreadystatechange = function() {
            3 < l.readyState && i();
        }, l.onprogress = function(n) {
            var t = Ou.event;
            Ou.event = n;
            try {
                o.progress.call(u, l);
            } finally {
                Ou.event = t;
            }
        }, u.header = function(n, t) {
            return n = (n + "").toLowerCase(), arguments.length < 2 ? a[n] : (null == t ? delete a[n] : a[n] = t + "", 
            u);
        }, u.mimeType = function(n) {
            return arguments.length ? (t = null == n ? null : n + "", u) : t;
        }, u.responseType = function(n) {
            return arguments.length ? (c = n, u) : c;
        }, u.response = function(n) {
            return e = n, u;
        }, [ "get", "post" ].forEach(function(n) {
            u[n] = function() {
                return u.send.apply(u, [ n ].concat(Yu(arguments)));
            };
        }), u.send = function(e, r, i) {
            if (2 === arguments.length && "function" == typeof r && (i = r, r = null), l.open(e, n, !0), 
            null == t || "accept" in a || (a.accept = t + ",*/*"), l.setRequestHeader) for (var f in a) l.setRequestHeader(f, a[f]);
            return null != t && l.overrideMimeType && l.overrideMimeType(t), null != c && (l.responseType = c), 
            null != i && u.on("error", i).on("load", function(n) {
                i(null, n);
            }), o.beforesend.call(u, l), l.send(null == r ? null : r), u;
        }, u.abort = function() {
            return l.abort(), u;
        }, Ou.rebind(u, o, "on"), null == r ? u : u.get(function(n) {
            return 1 === n.length ? function(t, e) {
                n(null == t ? e : null);
            } : n;
        }(r));
    }
    function qn(n, t, e) {
        var r = arguments.length;
        r < 2 && (t = 0), r < 3 && (e = Date.now());
        var i = {
            c: n,
            t: e + t,
            n: null
        };
        return Uo ? Uo.n = i : Po = i, Uo = i, jo || (Fo = clearTimeout(Fo), jo = 1, Ho(Tn)), 
        i;
    }
    function Tn() {
        var n = Rn(), t = Dn() - n;
        24 < t ? (isFinite(t) && (clearTimeout(Fo), Fo = setTimeout(Tn, t)), jo = 0) : (jo = 1, 
        Ho(Tn));
    }
    function Rn() {
        for (var n = Date.now(), t = Po; t; ) n >= t.t && t.c(n - t.t) && (t.c = null), 
        t = t.n;
        return n;
    }
    function Dn() {
        for (var n, t = Po, e = 1 / 0; t; ) t = t.c ? (t.t < e && (e = t.t), (n = t).n) : n ? n.n = t.n : Po = t.n;
        return Uo = n, e;
    }
    function Pn(n, t) {
        return t - (n ? Math.ceil(Math.log(n) / Math.LN10) : 1);
    }
    function jn(n) {
        return n + "";
    }
    function Fn() {
        this._ = new Date(1 < arguments.length ? Date.UTC.apply(this, arguments) : arguments[0]);
    }
    function Hn(n, t, e) {
        function r(t) {
            var e = n(t), r = u(e, 1);
            return t - e < r - t ? e : r;
        }
        function i(e) {
            return t(e = n(new Vo(e - 1)), 1), e;
        }
        function u(n, e) {
            return t(n = new Vo(+n), e), n;
        }
        function o(n, r, u) {
            var o = i(n), a = [];
            if (1 < u) for (;o < r; ) e(o) % u || a.push(new Date(+o)), t(o, 1); else for (;o < r; ) a.push(new Date(+o)), 
            t(o, 1);
            return a;
        }
        (n.floor = n).round = r, n.ceil = i, n.offset = u, n.range = o;
        var a = n.utc = On(n);
        return (a.floor = a).round = On(r), a.ceil = On(i), a.offset = On(u), a.range = function(n, t, e) {
            try {
                var r = new (Vo = Fn)();
                return r._ = n, o(r, t, e);
            } finally {
                Vo = Date;
            }
        }, n;
    }
    function On(n) {
        return function(t, e) {
            try {
                var r = new (Vo = Fn)();
                return r._ = t, n(r, e)._;
            } finally {
                Vo = Date;
            }
        };
    }
    function Yn(n, t, e) {
        var r = n < 0 ? "-" : "", i = (r ? -n : n) + "", u = i.length;
        return r + (u < e ? new Array(e - u + 1).join(t) + i : i);
    }
    function Zn(n) {
        return new RegExp("^(?:" + n.map(Ou.requote).join("|") + ")", "i");
    }
    function Vn(n) {
        for (var t = new c(), e = -1, r = n.length; ++e < r; ) t.set(n[e].toLowerCase(), e);
        return t;
    }
    function Xn(n, t, e) {
        Bo.lastIndex = 0;
        var r = Bo.exec(t.slice(e, e + 1));
        return r ? (n.w = +r[0], e + r[0].length) : -1;
    }
    function $n(n, t, e) {
        Bo.lastIndex = 0;
        var r = Bo.exec(t.slice(e));
        return r ? (n.U = +r[0], e + r[0].length) : -1;
    }
    function Bn(n, t, e) {
        Bo.lastIndex = 0;
        var r = Bo.exec(t.slice(e));
        return r ? (n.W = +r[0], e + r[0].length) : -1;
    }
    function Wn(n, t, e) {
        Bo.lastIndex = 0;
        var r = Bo.exec(t.slice(e, e + 4));
        return r ? (n.y = +r[0], e + r[0].length) : -1;
    }
    function Jn(n, t, e) {
        Bo.lastIndex = 0;
        var r = Bo.exec(t.slice(e, e + 2));
        return r ? (n.y = function(n) {
            return n + (68 < n ? 1900 : 2e3);
        }(+r[0]), e + r[0].length) : -1;
    }
    function Gn(n, t, e) {
        return /^[+-]\d{4}$/.test(t = t.slice(e, e + 5)) ? (n.Z = -t, e + 5) : -1;
    }
    function Qn(n, t, e) {
        Bo.lastIndex = 0;
        var r = Bo.exec(t.slice(e, e + 2));
        return r ? (n.m = r[0] - 1, e + r[0].length) : -1;
    }
    function nt(n, t, e) {
        Bo.lastIndex = 0;
        var r = Bo.exec(t.slice(e, e + 2));
        return r ? (n.d = +r[0], e + r[0].length) : -1;
    }
    function tt(n, t, e) {
        Bo.lastIndex = 0;
        var r = Bo.exec(t.slice(e, e + 3));
        return r ? (n.j = +r[0], e + r[0].length) : -1;
    }
    function et(n, t, e) {
        Bo.lastIndex = 0;
        var r = Bo.exec(t.slice(e, e + 2));
        return r ? (n.H = +r[0], e + r[0].length) : -1;
    }
    function rt(n, t, e) {
        Bo.lastIndex = 0;
        var r = Bo.exec(t.slice(e, e + 2));
        return r ? (n.M = +r[0], e + r[0].length) : -1;
    }
    function it(n, t, e) {
        Bo.lastIndex = 0;
        var r = Bo.exec(t.slice(e, e + 2));
        return r ? (n.S = +r[0], e + r[0].length) : -1;
    }
    function ut(n, t, e) {
        Bo.lastIndex = 0;
        var r = Bo.exec(t.slice(e, e + 3));
        return r ? (n.L = +r[0], e + r[0].length) : -1;
    }
    function ot(n) {
        var t = n.getTimezoneOffset(), e = 0 < t ? "-" : "+", r = Gu(t) / 60 | 0, i = Gu(t) % 60;
        return e + Yn(r, "0", 2) + Yn(i, "0", 2);
    }
    function at(n, t, e) {
        Wo.lastIndex = 0;
        var r = Wo.exec(t.slice(e, e + 1));
        return r ? e + r[0].length : -1;
    }
    function lt(n) {
        for (var t = n.length, e = -1; ++e < t; ) n[e][0] = this(n[e][0]);
        return function(t) {
            for (var e = 0, r = n[e]; !r[1](t); ) r = n[++e];
            return r[0](t);
        };
    }
    function ct() {}
    function ft(n, t, e) {
        var r = e.s = n + t, i = r - n, u = r - i;
        e.t = n - u + (t - i);
    }
    function st(n, t) {
        n && Qo.hasOwnProperty(n.type) && Qo[n.type](n, t);
    }
    function ht(n, t, e) {
        var r, i = -1, u = n.length - e;
        for (t.lineStart(); ++i < u; ) r = n[i], t.point(r[0], r[1], r[2]);
        t.lineEnd();
    }
    function pt(n, t) {
        var e = -1, r = n.length;
        for (t.polygonStart(); ++e < r; ) ht(n[e], t, 1);
        t.polygonEnd();
    }
    function gt() {
        function n(n, t) {
            t = t * bo / 2 + yo / 4;
            var e = (n *= bo) - r, o = 0 <= e ? 1 : -1, a = o * e, l = Math.cos(t), c = Math.sin(t), f = u * c, s = i * l + f * Math.cos(a), h = f * o * Math.sin(a);
            ta.add(Math.atan2(h, s)), r = n, i = l, u = c;
        }
        var t, e, r, i, u;
        ea.point = function(o, a) {
            ea.point = n, r = (t = o) * bo, i = Math.cos(a = (e = a) * bo / 2 + yo / 4), u = Math.sin(a);
        }, ea.lineEnd = function() {
            n(t, e);
        };
    }
    function vt(n) {
        var t = n[0], e = n[1], r = Math.cos(e);
        return [ r * Math.cos(t), r * Math.sin(t), Math.sin(e) ];
    }
    function dt(n, t) {
        return n[0] * t[0] + n[1] * t[1] + n[2] * t[2];
    }
    function yt(n, t) {
        return [ n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0] ];
    }
    function mt(n, t) {
        n[0] += t[0], n[1] += t[1], n[2] += t[2];
    }
    function Mt(n, t) {
        return [ n[0] * t, n[1] * t, n[2] * t ];
    }
    function xt(n) {
        var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
        n[0] /= t, n[1] /= t, n[2] /= t;
    }
    function bt(n) {
        return [ Math.atan2(n[1], n[0]), tn(n[2]) ];
    }
    function _t(n, t) {
        return Gu(n[0] - t[0]) < go && Gu(n[1] - t[1]) < go;
    }
    function wt(n, t) {
        n *= bo;
        var e = Math.cos(t *= bo);
        St(e * Math.cos(n), e * Math.sin(n), Math.sin(t));
    }
    function St(n, t, e) {
        ua += (n - ua) / ++ra, oa += (t - oa) / ra, aa += (e - aa) / ra;
    }
    function kt() {
        function n(n, i) {
            n *= bo;
            var u = Math.cos(i *= bo), o = u * Math.cos(n), a = u * Math.sin(n), l = Math.sin(i), c = Math.atan2(Math.sqrt((c = e * l - r * a) * c + (c = r * o - t * l) * c + (c = t * a - e * o) * c), t * o + e * a + r * l);
            ia += c, la += c * (t + (t = o)), ca += c * (e + (e = a)), fa += c * (r + (r = l)), 
            St(t, e, r);
        }
        var t, e, r;
        ga.point = function(i, u) {
            i *= bo;
            var o = Math.cos(u *= bo);
            t = o * Math.cos(i), e = o * Math.sin(i), r = Math.sin(u), ga.point = n, St(t, e, r);
        };
    }
    function Nt() {
        ga.point = wt;
    }
    function Et() {
        function n(n, t) {
            n *= bo;
            var e = Math.cos(t *= bo), o = e * Math.cos(n), a = e * Math.sin(n), l = Math.sin(t), c = i * l - u * a, f = u * o - r * l, s = r * a - i * o, h = Math.sqrt(c * c + f * f + s * s), p = r * o + i * a + u * l, g = h && -nn(p) / h, v = Math.atan2(h, p);
            sa += g * c, ha += g * f, pa += g * s, ia += v, la += v * (r + (r = o)), ca += v * (i + (i = a)), 
            fa += v * (u + (u = l)), St(r, i, u);
        }
        var t, e, r, i, u;
        ga.point = function(o, a) {
            t = o, e = a, ga.point = n, o *= bo;
            var l = Math.cos(a *= bo);
            r = l * Math.cos(o), i = l * Math.sin(o), u = Math.sin(a), St(r, i, u);
        }, ga.lineEnd = function() {
            n(t, e), ga.lineEnd = Nt, ga.point = wt;
        };
    }
    function At(n, t) {
        function e(e, r) {
            return e = n(e, r), t(e[0], e[1]);
        }
        return n.invert && t.invert && (e.invert = function(e, r) {
            return (e = t.invert(e, r)) && n.invert(e[0], e[1]);
        }), e;
    }
    function Ct() {
        return !0;
    }
    function zt(n, t, e, r, i) {
        var u = [], o = [];
        if (n.forEach(function(n) {
            if (!((t = n.length - 1) <= 0)) {
                var t, e = n[0], r = n[t];
                if (_t(e, r)) {
                    i.lineStart();
                    for (var a = 0; a < t; ++a) i.point((e = n[a])[0], e[1]);
                    i.lineEnd();
                } else {
                    var l = new qt(e, n, null, !0), c = new qt(e, null, l, !1);
                    l.o = c, u.push(l), o.push(c), c = new qt(r, null, l = new qt(r, n, null, !1), !0), 
                    l.o = c, u.push(l), o.push(c);
                }
            }
        }), o.sort(t), Lt(u), Lt(o), u.length) {
            for (var a = 0, l = e, c = o.length; a < c; ++a) o[a].e = l = !l;
            for (var f, s, h = u[0]; ;) {
                for (var p = h, g = !0; p.v; ) if ((p = p.n) === h) return;
                f = p.z, i.lineStart();
                do {
                    if (p.v = p.o.v = !0, p.e) {
                        if (g) for (a = 0, c = f.length; a < c; ++a) i.point((s = f[a])[0], s[1]); else r(p.x, p.n.x, 1, i);
                        p = p.n;
                    } else {
                        if (g) for (a = (f = p.p.z).length - 1; 0 <= a; --a) i.point((s = f[a])[0], s[1]); else r(p.x, p.p.x, -1, i);
                        p = p.p;
                    }
                    f = (p = p.o).z, g = !g;
                } while (!p.v);
                i.lineEnd();
            }
        }
    }
    function Lt(n) {
        if (t = n.length) {
            for (var t, e, r = 0, i = n[0]; ++r < t; ) i.n = e = n[r], e.p = i, i = e;
            i.n = e = n[0], e.p = i;
        }
    }
    function qt(n, t, e, r) {
        this.x = n, this.z = t, this.o = e, this.e = r, this.v = !1, this.n = this.p = null;
    }
    function Tt(n, t, e, r) {
        return function(i, u) {
            function o(t, e) {
                var r = i(t, e);
                n(t = r[0], e = r[1]) && u.point(t, e);
            }
            function a(n, t) {
                var e = i(n, t);
                d.point(e[0], e[1]);
            }
            function l() {
                m.point = a, d.lineStart();
            }
            function c() {
                m.point = o, d.lineEnd();
            }
            function f(n, t) {
                v.push([ n, t ]);
                var e = i(n, t);
                x.point(e[0], e[1]);
            }
            function s() {
                x.lineStart(), v = [];
            }
            function h() {
                f(v[0][0], v[0][1]), x.lineEnd();
                var n, t = x.clean(), e = M.buffer(), r = e.length;
                if (v.pop(), g.push(v), v = null, r) if (1 & t) {
                    var i, o = -1;
                    if (0 < (r = (n = e[0]).length - 1)) {
                        for (b || (u.polygonStart(), b = !0), u.lineStart(); ++o < r; ) u.point((i = n[o])[0], i[1]);
                        u.lineEnd();
                    }
                } else 1 < r && 2 & t && e.push(e.pop().concat(e.shift())), p.push(e.filter(Rt));
            }
            var p, g, v, d = t(u), y = i.invert(r[0], r[1]), m = {
                point: o,
                lineStart: l,
                lineEnd: c,
                polygonStart: function() {
                    m.point = f, m.lineStart = s, m.lineEnd = h, p = [], g = [];
                },
                polygonEnd: function() {
                    m.point = o, m.lineStart = l, m.lineEnd = c, p = Ou.merge(p);
                    var n = function(n, t) {
                        var e = n[0], r = n[1], i = [ Math.sin(e), -Math.cos(e), 0 ], u = 0, o = 0;
                        ta.reset();
                        for (var a = 0, l = t.length; a < l; ++a) {
                            var c = t[a], f = c.length;
                            if (f) for (var s = c[0], h = s[0], p = s[1] / 2 + yo / 4, g = Math.sin(p), v = Math.cos(p), d = 1; ;) {
                                d === f && (d = 0);
                                var y = (n = c[d])[0], m = n[1] / 2 + yo / 4, M = Math.sin(m), x = Math.cos(m), b = y - h, _ = 0 <= b ? 1 : -1, w = _ * b, S = yo < w, k = g * M;
                                if (ta.add(Math.atan2(k * _ * Math.sin(w), v * x + k * Math.cos(w))), u += S ? b + _ * mo : b, 
                                S ^ e <= h ^ e <= y) {
                                    var N = yt(vt(s), vt(n));
                                    xt(N);
                                    var E = yt(i, N);
                                    xt(E);
                                    var A = (S ^ 0 <= b ? -1 : 1) * tn(E[2]);
                                    (A < r || r === A && (N[0] || N[1])) && (o += S ^ 0 <= b ? 1 : -1);
                                }
                                if (!d++) break;
                                h = y, g = M, v = x, s = n;
                            }
                        }
                        return (u < -go || u < go && ta < -go) ^ 1 & o;
                    }(y, g);
                    p.length ? (b || (u.polygonStart(), b = !0), zt(p, Pt, n, e, u)) : n && (b || (u.polygonStart(), 
                    b = !0), u.lineStart(), e(null, null, 1, u), u.lineEnd()), b && (u.polygonEnd(), 
                    b = !1), p = g = null;
                },
                sphere: function() {
                    u.polygonStart(), u.lineStart(), e(null, null, 1, u), u.lineEnd(), u.polygonEnd();
                }
            }, M = Dt(), x = t(M), b = !1;
            return m;
        };
    }
    function Rt(n) {
        return 1 < n.length;
    }
    function Dt() {
        var n, t = [];
        return {
            lineStart: function() {
                t.push(n = []);
            },
            point: function(t, e) {
                n.push([ t, e ]);
            },
            lineEnd: b,
            buffer: function() {
                var e = t;
                return t = [], n = null, e;
            },
            rejoin: function() {
                1 < t.length && t.push(t.pop().concat(t.shift()));
            }
        };
    }
    function Pt(n, t) {
        return ((n = n.x)[0] < 0 ? n[1] - xo - go : xo - n[1]) - ((t = t.x)[0] < 0 ? t[1] - xo - go : xo - t[1]);
    }
    function Ht(n, t, e, r) {
        return function(i) {
            var u, o = i.a, a = i.b, l = o.x, c = o.y, f = 0, s = 1, h = a.x - l, p = a.y - c;
            if (u = n - l, h || !(0 < u)) {
                if (u /= h, h < 0) {
                    if (u < f) return;
                    u < s && (s = u);
                } else if (0 < h) {
                    if (s < u) return;
                    f < u && (f = u);
                }
                if (u = e - l, h || !(u < 0)) {
                    if (u /= h, h < 0) {
                        if (s < u) return;
                        f < u && (f = u);
                    } else if (0 < h) {
                        if (u < f) return;
                        u < s && (s = u);
                    }
                    if (u = t - c, p || !(0 < u)) {
                        if (u /= p, p < 0) {
                            if (u < f) return;
                            u < s && (s = u);
                        } else if (0 < p) {
                            if (s < u) return;
                            f < u && (f = u);
                        }
                        if (u = r - c, p || !(u < 0)) {
                            if (u /= p, p < 0) {
                                if (s < u) return;
                                f < u && (f = u);
                            } else if (0 < p) {
                                if (u < f) return;
                                u < s && (s = u);
                            }
                            return 0 < f && (i.a = {
                                x: l + f * h,
                                y: c + f * p
                            }), s < 1 && (i.b = {
                                x: l + s * h,
                                y: c + s * p
                            }), i;
                        }
                    }
                }
            }
        };
    }
    function Ot(n, t, e, r) {
        function i(r, i) {
            return Gu(r[0] - n) < go ? 0 < i ? 0 : 3 : Gu(r[0] - e) < go ? 0 < i ? 2 : 1 : Gu(r[1] - t) < go ? 0 < i ? 1 : 0 : 0 < i ? 3 : 2;
        }
        function u(n, t) {
            return o(n.x, t.x);
        }
        function o(n, t) {
            var e = i(n, 1), r = i(t, 1);
            return e !== r ? e - r : 0 === e ? t[1] - n[1] : 1 === e ? n[0] - t[0] : 2 === e ? n[1] - t[1] : t[0] - n[0];
        }
        return function(a) {
            function c(u, a, l, c) {
                var f = 0, s = 0;
                if (null == u || (f = i(u, l)) !== (s = i(a, l)) || o(u, a) < 0 ^ 0 < l) for (;c.point(0 === f || 3 === f ? n : e, 1 < f ? r : t), 
                (f = (f + l + 4) % 4) !== s; ) ; else c.point(a[0], a[1]);
            }
            function f(i, u) {
                return n <= i && i <= e && t <= u && u <= r;
            }
            function s(n, t) {
                f(n, t) && a.point(n, t);
            }
            function h(n, t) {
                var e = f(n = Math.max(-da, Math.min(da, n)), t = Math.max(-da, Math.min(da, t)));
                if (g && v.push([ n, t ]), _) d = n, y = t, _ = !1, (m = e) && (a.lineStart(), a.point(n, t)); else if (e && b) a.point(n, t); else {
                    var r = {
                        a: {
                            x: M,
                            y: x
                        },
                        b: {
                            x: n,
                            y: t
                        }
                    };
                    N(r) ? (b || (a.lineStart(), a.point(r.a.x, r.a.y)), a.point(r.b.x, r.b.y), e || a.lineEnd(), 
                    w = !1) : e && (a.lineStart(), a.point(n, t), w = !1);
                }
                M = n, x = t, b = e;
            }
            var p, g, v, d, y, m, M, x, b, _, w, S = a, k = Dt(), N = Ht(n, t, e, r), E = {
                point: s,
                lineStart: function() {
                    E.point = h, g && g.push(v = []), b = !(_ = !0), M = x = NaN;
                },
                lineEnd: function() {
                    p && (h(d, y), m && b && k.rejoin(), p.push(k.buffer())), E.point = s, b && a.lineEnd();
                },
                polygonStart: function() {
                    a = k, p = [], g = [], w = !0;
                },
                polygonEnd: function() {
                    a = S, p = Ou.merge(p);
                    var t = function(n) {
                        for (var t = 0, e = g.length, r = n[1], i = 0; i < e; ++i) for (var u, o = 1, a = g[i], l = a.length, c = a[0]; o < l; ++o) u = a[o], 
                        c[1] <= r ? u[1] > r && 0 < Q(c, u, n) && ++t : u[1] <= r && Q(c, u, n) < 0 && --t, 
                        c = u;
                        return 0 !== t;
                    }([ n, r ]), e = w && t, i = p.length;
                    (e || i) && (a.polygonStart(), e && (a.lineStart(), c(null, null, 1, a), a.lineEnd()), 
                    i && zt(p, u, t, c, a), a.polygonEnd()), p = g = v = null;
                }
            };
            return E;
        };
    }
    function It(n) {
        var t = 0, e = yo / 3, r = re(n), i = r(t, e);
        return i.parallels = function(n) {
            return arguments.length ? r(t = n[0] * yo / 180, e = n[1] * yo / 180) : [ t / yo * 180, e / yo * 180 ];
        }, i;
    }
    function Yt(n, t) {
        function e(n, t) {
            var e = Math.sqrt(u - 2 * i * Math.sin(t)) / i;
            return [ e * Math.sin(n *= i), o - e * Math.cos(n) ];
        }
        var r = Math.sin(n), i = (r + Math.sin(t)) / 2, u = 1 + r * (2 * i - r), o = Math.sqrt(u) / i;
        return e.invert = function(n, t) {
            var e = o - t;
            return [ Math.atan2(n, e) / i, tn((u - (n * n + e * e) * i * i) / (2 * i)) ];
        }, e;
    }
    function Zt() {
        function n(n, t) {
            ma += i * n - r * t, r = n, i = t;
        }
        var t, e, r, i;
        wa.point = function(u, o) {
            wa.point = n, t = r = u, e = i = o;
        }, wa.lineEnd = function() {
            n(t, e);
        };
    }
    function Vt() {
        function n(n, t) {
            o.push("M", n, ",", t, u);
        }
        function t(n, t) {
            o.push("M", n, ",", t), a.point = e;
        }
        function e(n, t) {
            o.push("L", n, ",", t);
        }
        function r() {
            a.point = n;
        }
        function i() {
            o.push("Z");
        }
        var u = Xt(4.5), o = [], a = {
            point: n,
            lineStart: function() {
                a.point = t;
            },
            lineEnd: r,
            polygonStart: function() {
                a.lineEnd = i;
            },
            polygonEnd: function() {
                a.lineEnd = r, a.point = n;
            },
            pointRadius: function(n) {
                return u = Xt(n), a;
            },
            result: function() {
                if (o.length) {
                    var n = o.join("");
                    return o = [], n;
                }
            }
        };
        return a;
    }
    function Xt(n) {
        return "m0," + n + "a" + n + "," + n + " 0 1,1 0," + -2 * n + "a" + n + "," + n + " 0 1,1 0," + 2 * n + "z";
    }
    function $t(n, t) {
        ua += n, oa += t, ++aa;
    }
    function Bt() {
        function n(n, r) {
            var i = n - t, u = r - e, o = Math.sqrt(i * i + u * u);
            la += o * (t + n) / 2, ca += o * (e + r) / 2, fa += o, $t(t = n, e = r);
        }
        var t, e;
        ka.point = function(r, i) {
            ka.point = n, $t(t = r, e = i);
        };
    }
    function Wt() {
        ka.point = $t;
    }
    function Jt() {
        function n(n, t) {
            var e = n - r, u = t - i, o = Math.sqrt(e * e + u * u);
            la += o * (r + n) / 2, ca += o * (i + t) / 2, fa += o, sa += (o = i * n - r * t) * (r + n), 
            ha += o * (i + t), pa += 3 * o, $t(r = n, i = t);
        }
        var t, e, r, i;
        ka.point = function(u, o) {
            ka.point = n, $t(t = r = u, e = i = o);
        }, ka.lineEnd = function() {
            n(t, e);
        };
    }
    function Gt(n) {
        function t(t, e) {
            n.moveTo(t + o, e), n.arc(t, e, o, 0, mo);
        }
        function e(t, e) {
            n.moveTo(t, e), a.point = r;
        }
        function r(t, e) {
            n.lineTo(t, e);
        }
        function i() {
            a.point = t;
        }
        function u() {
            n.closePath();
        }
        var o = 4.5, a = {
            point: t,
            lineStart: function() {
                a.point = e;
            },
            lineEnd: i,
            polygonStart: function() {
                a.lineEnd = u;
            },
            polygonEnd: function() {
                a.lineEnd = i, a.point = t;
            },
            pointRadius: function(n) {
                return o = n, a;
            },
            result: b
        };
        return a;
    }
    function Kt(n) {
        function t(n) {
            return (a ? r : e)(n);
        }
        function e(t) {
            return te(t, function(e, r) {
                e = n(e, r), t.point(e[0], e[1]);
            });
        }
        function r(t) {
            function e(e, r) {
                e = n(e, r), t.point(e[0], e[1]);
            }
            function r() {
                M = NaN, S.point = u, t.lineStart();
            }
            function u(e, r) {
                var u = vt([ e, r ]), o = n(e, r);
                i(M, x, m, b, _, w, M = o[0], x = o[1], m = e, b = u[0], _ = u[1], w = u[2], a, t), 
                t.point(M, x);
            }
            function o() {
                S.point = e, t.lineEnd();
            }
            function l() {
                r(), S.point = c, S.lineEnd = f;
            }
            function c(n, t) {
                u(s = n, t), p = M, g = x, v = b, d = _, y = w, S.point = u;
            }
            function f() {
                i(M, x, m, b, _, w, p, g, s, v, d, y, a, t), (S.lineEnd = o)();
            }
            var s, p, g, v, d, y, m, M, x, b, _, w, S = {
                point: e,
                lineStart: r,
                lineEnd: o,
                polygonStart: function() {
                    t.polygonStart(), S.lineStart = l;
                },
                polygonEnd: function() {
                    t.polygonEnd(), S.lineStart = r;
                }
            };
            return S;
        }
        function i(t, e, r, a, l, c, f, s, h, p, g, v, d, y) {
            var m = f - t, M = s - e, x = m * m + M * M;
            if (4 * u < x && d--) {
                var b = a + p, _ = l + g, w = c + v, S = Math.sqrt(b * b + _ * _ + w * w), k = Math.asin(w /= S), N = Gu(Gu(w) - 1) < go || Gu(r - h) < go ? (r + h) / 2 : Math.atan2(_, b), E = n(N, k), A = E[0], C = E[1], z = A - t, L = C - e, q = M * z - m * L;
                (u < q * q / x || .3 < Gu((m * z + M * L) / x - .5) || a * p + l * g + c * v < o) && (i(t, e, r, a, l, c, A, C, N, b /= S, _ /= S, w, d, y), 
                y.point(A, C), i(A, C, N, b, _, w, f, s, h, p, g, v, d, y));
            }
        }
        var u = .5, o = Math.cos(30 * bo), a = 16;
        return t.precision = function(n) {
            return arguments.length ? (a = 0 < (u = n * n) && 16, t) : Math.sqrt(u);
        }, t;
    }
    function ne(n) {
        this.stream = n;
    }
    function te(n, t) {
        return {
            point: t,
            sphere: function() {
                n.sphere();
            },
            lineStart: function() {
                n.lineStart();
            },
            lineEnd: function() {
                n.lineEnd();
            },
            polygonStart: function() {
                n.polygonStart();
            },
            polygonEnd: function() {
                n.polygonEnd();
            }
        };
    }
    function ee(n) {
        return re(function() {
            return n;
        })();
    }
    function re(n) {
        function t(n) {
            return [ (n = a(n[0] * bo, n[1] * bo))[0] * h + l, c - n[1] * h ];
        }
        function e(n) {
            return (n = a.invert((n[0] - l) / h, (c - n[1]) / h)) && [ n[0] * _o, n[1] * _o ];
        }
        function r() {
            a = At(o = ae(y, M, x), u);
            var n = u(v, d);
            return l = p - n[0] * h, c = g + n[1] * h, i();
        }
        function i() {
            return f && (f.valid = !1, f = null), t;
        }
        var u, o, a, l, c, f, s = Kt(function(n, t) {
            return [ (n = u(n, t))[0] * h + l, c - n[1] * h ];
        }), h = 150, p = 480, g = 250, v = 0, d = 0, y = 0, M = 0, x = 0, b = va, _ = m, w = null, S = null;
        return t.stream = function(n) {
            return f && (f.valid = !1), (f = ie(b(o, s(_(n))))).valid = !0, f;
        }, t.clipAngle = function(n) {
            return arguments.length ? (b = null == n ? (w = n, va) : function(n) {
                function t(n, t) {
                    return Math.cos(n) * Math.cos(t) > i;
                }
                function e(n, t, e) {
                    var r = [ 1, 0, 0 ], u = yt(vt(n), vt(t)), o = dt(u, u), a = u[0], l = o - a * a;
                    if (!l) return !e && n;
                    var c = i * o / l, f = -i * a / l, s = yt(r, u), h = Mt(r, c);
                    mt(h, Mt(u, f));
                    var p = s, g = dt(h, p), v = dt(p, p), d = g * g - v * (dt(h, h) - 1);
                    if (!(d < 0)) {
                        var y = Math.sqrt(d), m = Mt(p, (-g - y) / v);
                        if (mt(m, h), m = bt(m), !e) return m;
                        var M, x = n[0], b = t[0], _ = n[1], w = t[1];
                        b < x && (M = x, x = b, b = M);
                        var S = b - x, k = Gu(S - yo) < go;
                        if (!k && w < _ && (M = _, _ = w, w = M), k || S < go ? k ? 0 < _ + w ^ m[1] < (Gu(m[0] - x) < go ? _ : w) : _ <= m[1] && m[1] <= w : yo < S ^ (x <= m[0] && m[0] <= b)) {
                            var E = Mt(p, (-g + y) / v);
                            return mt(E, h), [ m, bt(E) ];
                        }
                    }
                }
                function r(t, e) {
                    var r = u ? n : yo - n, i = 0;
                    return t < -r ? i |= 1 : r < t && (i |= 2), e < -r ? i |= 4 : r < e && (i |= 8), 
                    i;
                }
                var i = Math.cos(n), u = 0 < i, o = Gu(i) > go;
                return Tt(t, function(n) {
                    var i, a, l, c, f;
                    return {
                        lineStart: function() {
                            c = l = !1, f = 1;
                        },
                        point: function(s, h) {
                            var p, g = [ s, h ], v = t(s, h), d = u ? v ? 0 : r(s, h) : v ? r(s + (s < 0 ? yo : -yo), h) : 0;
                            if (!i && (c = l = v) && n.lineStart(), v !== l && (p = e(i, g), (_t(i, p) || _t(g, p)) && (g[0] += go, 
                            g[1] += go, v = t(g[0], g[1]))), v !== l) f = 0, v ? (n.lineStart(), p = e(g, i), 
                            n.point(p[0], p[1])) : (p = e(i, g), n.point(p[0], p[1]), n.lineEnd()), i = p; else if (o && i && u ^ v) {
                                var y;
                                d & a || !(y = e(g, i, !0)) || (f = 0, u ? (n.lineStart(), n.point(y[0][0], y[0][1]), 
                                n.point(y[1][0], y[1][1]), n.lineEnd()) : (n.point(y[1][0], y[1][1]), n.lineEnd(), 
                                n.lineStart(), n.point(y[0][0], y[0][1])));
                            }
                            !v || i && _t(i, g) || n.point(g[0], g[1]), i = g, l = v, a = d;
                        },
                        lineEnd: function() {
                            l && n.lineEnd(), i = null;
                        },
                        clean: function() {
                            return f | (c && l) << 1;
                        }
                    };
                }, se(n, 6 * bo), u ? [ 0, -n ] : [ -yo, n - yo ]);
            }((w = +n) * bo), i()) : w;
        }, t.clipExtent = function(n) {
            return arguments.length ? (_ = (S = n) ? Ot(n[0][0], n[0][1], n[1][0], n[1][1]) : m, 
            i()) : S;
        }, t.scale = function(n) {
            return arguments.length ? (h = +n, r()) : h;
        }, t.translate = function(n) {
            return arguments.length ? (p = +n[0], g = +n[1], r()) : [ p, g ];
        }, t.center = function(n) {
            return arguments.length ? (v = n[0] % 360 * bo, d = n[1] % 360 * bo, r()) : [ v * _o, d * _o ];
        }, t.rotate = function(n) {
            return arguments.length ? (y = n[0] % 360 * bo, M = n[1] % 360 * bo, x = 2 < n.length ? n[2] % 360 * bo : 0, 
            r()) : [ y * _o, M * _o, x * _o ];
        }, Ou.rebind(t, s, "precision"), function() {
            return u = n.apply(this, arguments), t.invert = u.invert && e, r();
        };
    }
    function ie(n) {
        return te(n, function(t, e) {
            n.point(t * bo, e * bo);
        });
    }
    function ue(n, t) {
        return [ n, t ];
    }
    function oe(n, t) {
        return [ yo < n ? n - mo : n < -yo ? n + mo : n, t ];
    }
    function ae(n, t, e) {
        return n ? t || e ? At(ce(n), fe(t, e)) : ce(n) : t || e ? fe(t, e) : oe;
    }
    function le(n) {
        return function(t, e) {
            return [ yo < (t += n) ? t - mo : t < -yo ? t + mo : t, e ];
        };
    }
    function ce(n) {
        var t = le(n);
        return t.invert = le(-n), t;
    }
    function fe(n, t) {
        function e(n, t) {
            var e = Math.cos(t), a = Math.cos(n) * e, l = Math.sin(n) * e, c = Math.sin(t), f = c * r + a * i;
            return [ Math.atan2(l * u - f * o, a * r - c * i), tn(f * u + l * o) ];
        }
        var r = Math.cos(n), i = Math.sin(n), u = Math.cos(t), o = Math.sin(t);
        return e.invert = function(n, t) {
            var e = Math.cos(t), a = Math.cos(n) * e, l = Math.sin(n) * e, c = Math.sin(t), f = c * u - l * o;
            return [ Math.atan2(l * u + c * o, a * r + f * i), tn(f * r - a * i) ];
        }, e;
    }
    function se(n, t) {
        var e = Math.cos(n), r = Math.sin(n);
        return function(i, u, o, a) {
            var l = o * t;
            null != i ? (i = he(e, i), u = he(e, u), (0 < o ? i < u : u < i) && (i += o * mo)) : (i = n + o * mo, 
            u = n - .5 * l);
            for (var c, f = i; 0 < o ? u < f : f < u; f -= l) a.point((c = bt([ e, -r * Math.cos(f), -r * Math.sin(f) ]))[0], c[1]);
        };
    }
    function he(n, t) {
        var e = vt(t);
        e[0] -= n, xt(e);
        var r = nn(-e[1]);
        return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - go) % (2 * Math.PI);
    }
    function pe(n, t, e) {
        var r = Ou.range(n, t - go, e).concat(t);
        return function(n) {
            return r.map(function(t) {
                return [ n, t ];
            });
        };
    }
    function ge(n, t, e) {
        var r = Ou.range(n, t - go, e).concat(t);
        return function(n) {
            return r.map(function(t) {
                return [ t, n ];
            });
        };
    }
    function ve(n) {
        return n.source;
    }
    function de(n) {
        return n.target;
    }
    function me(n, t) {
        function e(t, e) {
            var r = Math.cos(t), i = Math.cos(e), u = n(r * i);
            return [ u * i * Math.sin(t), u * Math.sin(e) ];
        }
        return e.invert = function(n, e) {
            var r = Math.sqrt(n * n + e * e), i = t(r), u = Math.sin(i), o = Math.cos(i);
            return [ Math.atan2(n * u, r * o), Math.asin(r && e * u / r) ];
        }, e;
    }
    function Me(n, t) {
        function e(n, t) {
            0 < o ? t < -xo + go && (t = -xo + go) : xo - go < t && (t = xo - go);
            var e = o / Math.pow(i(t), u);
            return [ e * Math.sin(u * n), o - e * Math.cos(u * n) ];
        }
        var r = Math.cos(n), i = function(n) {
            return Math.tan(yo / 4 + n / 2);
        }, u = n === t ? Math.sin(n) : Math.log(r / Math.cos(t)) / Math.log(i(t) / i(n)), o = r * Math.pow(i(n), u) / u;
        return u ? (e.invert = function(n, t) {
            var e = o - t, r = K(u) * Math.sqrt(n * n + e * e);
            return [ Math.atan2(n, e) / u, 2 * Math.atan(Math.pow(o / r, 1 / u)) - xo ];
        }, e) : be;
    }
    function xe(n, t) {
        function e(n, t) {
            var e = u - t;
            return [ e * Math.sin(i * n), u - e * Math.cos(i * n) ];
        }
        var r = Math.cos(n), i = n === t ? Math.sin(n) : (r - Math.cos(t)) / (t - n), u = r / i + n;
        return Gu(i) < go ? ue : (e.invert = function(n, t) {
            var e = u - t;
            return [ Math.atan2(n, e) / i, u - K(i) * Math.sqrt(n * n + e * e) ];
        }, e);
    }
    function be(n, t) {
        return [ n, Math.log(Math.tan(yo / 4 + t / 2)) ];
    }
    function _e(n) {
        var t, e = ee(n), r = e.scale, i = e.translate, u = e.clipExtent;
        return e.scale = function() {
            var n = r.apply(e, arguments);
            return n === e ? t ? e.clipExtent(null) : e : n;
        }, e.translate = function() {
            var n = i.apply(e, arguments);
            return n === e ? t ? e.clipExtent(null) : e : n;
        }, e.clipExtent = function(n) {
            var o = u.apply(e, arguments);
            if (o === e) {
                if (t = null == n) {
                    var a = yo * r(), l = i();
                    u([ [ l[0] - a, l[1] - a ], [ l[0] + a, l[1] + a ] ]);
                }
            } else t && (o = null);
            return o;
        }, e.clipExtent(null);
    }
    function we(n, t) {
        return [ Math.log(Math.tan(yo / 4 + t / 2)), -n ];
    }
    function Se(n) {
        return n[0];
    }
    function ke(n) {
        return n[1];
    }
    function Ne(n) {
        for (var t = n.length, e = [ 0, 1 ], r = 2, i = 2; i < t; i++) {
            for (;1 < r && Q(n[e[r - 2]], n[e[r - 1]], n[i]) <= 0; ) --r;
            e[r++] = i;
        }
        return e.slice(0, r);
    }
    function Ee(n, t) {
        return n[0] - t[0] || n[1] - t[1];
    }
    function Ae(n, t, e) {
        return (e[0] - t[0]) * (n[1] - t[1]) < (e[1] - t[1]) * (n[0] - t[0]);
    }
    function Ce(n, t, e, r) {
        var i = n[0], u = e[0], o = t[0] - i, a = r[0] - u, l = n[1], c = e[1], f = t[1] - l, s = r[1] - c, h = (a * (l - c) - s * (i - u)) / (s * o - a * f);
        return [ i + h * o, l + h * f ];
    }
    function ze(n) {
        var t = n[0], e = n[n.length - 1];
        return !(t[0] - e[0] || t[1] - e[1]);
    }
    function Le() {
        Ke(this), this.edge = this.site = this.circle = null;
    }
    function qe(n) {
        var t = Fa.pop() || new Le();
        return t.site = n, t;
    }
    function Te(n) {
        Ye(n), Pa.remove(n), Fa.push(n), Ke(n);
    }
    function Re(n) {
        var t = n.circle, e = t.x, r = t.cy, i = {
            x: e,
            y: r
        }, u = n.P, o = n.N, a = [ n ];
        Te(n);
        for (var l = u; l.circle && Gu(e - l.circle.x) < go && Gu(r - l.circle.cy) < go; ) u = l.P, 
        a.unshift(l), Te(l), l = u;
        a.unshift(l), Ye(l);
        for (var c = o; c.circle && Gu(e - c.circle.x) < go && Gu(r - c.circle.cy) < go; ) o = c.N, 
        a.push(c), Te(c), c = o;
        a.push(c), Ye(c);
        var f, s = a.length;
        for (f = 1; f < s; ++f) c = a[f], l = a[f - 1], We(c.edge, l.site, c.site, i);
        l = a[0], (c = a[s - 1]).edge = $e(l.site, c.site, null, i), Ie(l), Ie(c);
    }
    function De(n) {
        for (var t, e, r, i, u = n.x, o = n.y, a = Pa._; a; ) if ((r = Pe(a, o) - u) > go) a = a.L; else {
            if (!((i = u - Ue(a, o)) > go)) {
                -go < r ? (t = a.P, e = a) : -go < i ? e = (t = a).N : t = e = a;
                break;
            }
            if (!a.R) {
                t = a;
                break;
            }
            a = a.R;
        }
        var l = qe(n);
        if (Pa.insert(t, l), t || e) {
            if (t === e) return Ye(t), e = qe(t.site), Pa.insert(l, e), l.edge = e.edge = $e(t.site, l.site), 
            Ie(t), void Ie(e);
            if (e) {
                Ye(t), Ye(e);
                var c = t.site, f = c.x, s = c.y, h = n.x - f, p = n.y - s, g = e.site, v = g.x - f, d = g.y - s, y = 2 * (h * d - p * v), m = h * h + p * p, M = v * v + d * d, x = {
                    x: (d * m - p * M) / y + f,
                    y: (h * M - v * m) / y + s
                };
                We(e.edge, c, g, x), l.edge = $e(c, n, null, x), e.edge = $e(n, g, null, x), Ie(t), 
                Ie(e);
            } else l.edge = $e(t.site, l.site);
        }
    }
    function Pe(n, t) {
        var e = n.site, r = e.x, i = e.y, u = i - t;
        if (!u) return r;
        var o = n.P;
        if (!o) return -1 / 0;
        var a = (e = o.site).x, l = e.y, c = l - t;
        if (!c) return a;
        var f = a - r, s = 1 / u - 1 / c, h = f / c;
        return s ? (-h + Math.sqrt(h * h - 2 * s * (f * f / (-2 * c) - l + c / 2 + i - u / 2))) / s + r : (r + a) / 2;
    }
    function Ue(n, t) {
        var e = n.N;
        if (e) return Pe(e, t);
        var r = n.site;
        return r.y === t ? r.x : 1 / 0;
    }
    function je(n) {
        this.site = n, this.edges = [];
    }
    function He(n, t) {
        return t.angle - n.angle;
    }
    function Oe() {
        Ke(this), this.x = this.y = this.arc = this.site = this.cy = null;
    }
    function Ie(n) {
        var t = n.P, e = n.N;
        if (t && e) {
            var r = t.site, i = n.site, u = e.site;
            if (r !== u) {
                var o = i.x, a = i.y, l = r.x - o, c = r.y - a, f = u.x - o, s = 2 * (l * (d = u.y - a) - c * f);
                if (!(-vo <= s)) {
                    var h = l * l + c * c, p = f * f + d * d, g = (d * h - c * p) / s, v = (l * p - f * h) / s, d = v + a, y = Ha.pop() || new Oe();
                    y.arc = n, y.site = i, y.x = g + o, y.y = d + Math.sqrt(g * g + v * v), y.cy = d, 
                    n.circle = y;
                    for (var m = null, M = ja._; M; ) if (y.y < M.y || y.y === M.y && y.x <= M.x) {
                        if (!M.L) {
                            m = M.P;
                            break;
                        }
                        M = M.L;
                    } else {
                        if (!M.R) {
                            m = M;
                            break;
                        }
                        M = M.R;
                    }
                    ja.insert(m, y), m || (Ua = y);
                }
            }
        }
    }
    function Ye(n) {
        var t = n.circle;
        t && (t.P || (Ua = t.N), ja.remove(t), Ha.push(t), Ke(t), n.circle = null);
    }
    function Ve(n, t) {
        var e = n.b;
        if (e) return !0;
        var r, i, u = n.a, o = t[0][0], a = t[1][0], l = t[0][1], c = t[1][1], f = n.l, s = n.r, h = f.x, p = f.y, g = s.x, v = s.y, d = (h + g) / 2, y = (p + v) / 2;
        if (v === p) {
            if (d < o || a <= d) return;
            if (g < h) {
                if (u) {
                    if (u.y >= c) return;
                } else u = {
                    x: d,
                    y: l
                };
                e = {
                    x: d,
                    y: c
                };
            } else {
                if (u) {
                    if (u.y < l) return;
                } else u = {
                    x: d,
                    y: c
                };
                e = {
                    x: d,
                    y: l
                };
            }
        } else if (i = y - (r = (h - g) / (v - p)) * d, r < -1 || 1 < r) if (g < h) {
            if (u) {
                if (u.y >= c) return;
            } else u = {
                x: (l - i) / r,
                y: l
            };
            e = {
                x: (c - i) / r,
                y: c
            };
        } else {
            if (u) {
                if (u.y < l) return;
            } else u = {
                x: (c - i) / r,
                y: c
            };
            e = {
                x: (l - i) / r,
                y: l
            };
        } else if (p < v) {
            if (u) {
                if (u.x >= a) return;
            } else u = {
                x: o,
                y: r * o + i
            };
            e = {
                x: a,
                y: r * a + i
            };
        } else {
            if (u) {
                if (u.x < o) return;
            } else u = {
                x: a,
                y: r * a + i
            };
            e = {
                x: o,
                y: r * o + i
            };
        }
        return n.a = u, n.b = e, !0;
    }
    function Xe(n, t) {
        this.l = n, this.r = t, this.a = this.b = null;
    }
    function $e(n, t, e, r) {
        var i = new Xe(n, t);
        return Ra.push(i), e && We(i, n, t, e), r && We(i, t, n, r), Da[n.i].edges.push(new Je(i, n, t)), 
        Da[t.i].edges.push(new Je(i, t, n)), i;
    }
    function Be(n, t, e) {
        var r = new Xe(n, null);
        return r.a = t, r.b = e, Ra.push(r), r;
    }
    function We(n, t, e, r) {
        n.a || n.b ? n.l === e ? n.b = r : n.a = r : (n.a = r, n.l = t, n.r = e);
    }
    function Je(n, t, e) {
        var r = n.a, i = n.b;
        this.edge = n, this.site = t, this.angle = e ? Math.atan2(e.y - t.y, e.x - t.x) : n.l === t ? Math.atan2(i.x - r.x, r.y - i.y) : Math.atan2(r.x - i.x, i.y - r.y);
    }
    function Ge() {
        this._ = null;
    }
    function Ke(n) {
        n.U = n.C = n.L = n.R = n.P = n.N = null;
    }
    function Qe(n, t) {
        var e = t, r = t.R, i = e.U;
        i ? i.L === e ? i.L = r : i.R = r : n._ = r, r.U = i, e.U = r, e.R = r.L, e.R && (e.R.U = e), 
        r.L = e;
    }
    function nr(n, t) {
        var e = t, r = t.L, i = e.U;
        i ? i.L === e ? i.L = r : i.R = r : n._ = r, r.U = i, e.U = r, e.L = r.R, e.L && (e.L.U = e), 
        r.R = e;
    }
    function tr(n) {
        for (;n.L; ) n = n.L;
        return n;
    }
    function er(n, t) {
        var e, r, i, u = n.sort(rr).pop();
        for (Ra = [], Da = new Array(n.length), Pa = new Ge(), ja = new Ge(); ;) if (i = Ua, 
        u && (!i || u.y < i.y || u.y === i.y && u.x < i.x)) u.x === e && u.y === r || (Da[u.i] = new je(u), 
        De(u), e = u.x, r = u.y), u = n.pop(); else {
            if (!i) break;
            Re(i.arc);
        }
        t && (function(n) {
            for (var t, e = Ra, r = Ht(n[0][0], n[0][1], n[1][0], n[1][1]), i = e.length; i--; ) (!Ve(t = e[i], n) || !r(t) || Gu(t.a.x - t.b.x) < go && Gu(t.a.y - t.b.y) < go) && (t.a = t.b = null, 
            e.splice(i, 1));
        }(t), function(n) {
            for (var t, e, r, i, u, o, a, l, c, f, s = n[0][0], h = n[1][0], p = n[0][1], g = n[1][1], v = Da, d = v.length; d--; ) if ((u = v[d]) && u.prepare()) for (l = (a = u.edges).length, 
            o = 0; o < l; ) r = (f = a[o].end()).x, i = f.y, t = (c = a[++o % l].start()).x, 
            e = c.y, (Gu(r - t) > go || Gu(i - e) > go) && (a.splice(o, 0, new Je(Be(u.site, f, Gu(r - s) < go && go < g - i ? {
                x: s,
                y: Gu(t - s) < go ? e : g
            } : Gu(i - g) < go && go < h - r ? {
                x: Gu(e - g) < go ? t : h,
                y: g
            } : Gu(r - h) < go && go < i - p ? {
                x: h,
                y: Gu(t - h) < go ? e : p
            } : Gu(i - p) < go && go < r - s ? {
                x: Gu(e - p) < go ? t : s,
                y: p
            } : null), u.site, null)), ++l);
        }(t));
        var o = {
            cells: Da,
            edges: Ra
        };
        return Pa = ja = Ra = Da = null, o;
    }
    function rr(n, t) {
        return t.y - n.y || t.x - n.x;
    }
    function ir(n, t, e) {
        return (n.x - e.x) * (t.y - n.y) - (n.x - t.x) * (e.y - n.y);
    }
    function ur(n) {
        return n.x;
    }
    function or(n) {
        return n.y;
    }
    function cr(n, t) {
        n = Ou.rgb(n), t = Ou.rgb(t);
        var e = n.r, r = n.g, i = n.b, u = t.r - e, o = t.g - r, a = t.b - i;
        return function(n) {
            return "#" + bn(Math.round(e + u * n)) + bn(Math.round(r + o * n)) + bn(Math.round(i + a * n));
        };
    }
    function fr(n, t) {
        var e, r = {}, i = {};
        for (e in n) e in t ? r[e] = pr(n[e], t[e]) : i[e] = n[e];
        for (e in t) e in n || (i[e] = t[e]);
        return function(n) {
            for (e in r) i[e] = r[e](n);
            return i;
        };
    }
    function sr(n, t) {
        return n = +n, t = +t, function(e) {
            return n * (1 - e) + t * e;
        };
    }
    function hr(n, t) {
        var e, r, i, u = Ia.lastIndex = Ya.lastIndex = 0, o = -1, a = [], l = [];
        for (n += "", t += ""; (e = Ia.exec(n)) && (r = Ya.exec(t)); ) (i = r.index) > u && (i = t.slice(u, i), 
        a[o] ? a[o] += i : a[++o] = i), (e = e[0]) === (r = r[0]) ? a[o] ? a[o] += r : a[++o] = r : (a[++o] = null, 
        l.push({
            i: o,
            x: sr(e, r)
        })), u = Ya.lastIndex;
        return u < t.length && (i = t.slice(u), a[o] ? a[o] += i : a[++o] = i), a.length < 2 ? l[0] ? (t = l[0].x, 
        function(n) {
            return t(n) + "";
        }) : function() {
            return t;
        } : (t = l.length, function(n) {
            for (var e, r = 0; r < t; ++r) a[(e = l[r]).i] = e.x(n);
            return a.join("");
        });
    }
    function pr(n, t) {
        for (var e, r = Ou.interpolators.length; 0 <= --r && !(e = Ou.interpolators[r](n, t)); ) ;
        return e;
    }
    function gr(n, t) {
        var e, r = [], i = [], u = n.length, o = t.length, a = Math.min(n.length, t.length);
        for (e = 0; e < a; ++e) r.push(pr(n[e], t[e]));
        for (;e < u; ++e) i[e] = n[e];
        for (;e < o; ++e) i[e] = t[e];
        return function(n) {
            for (e = 0; e < a; ++e) i[e] = r[e](n);
            return i;
        };
    }
    function dr(n) {
        return function(t) {
            return 1 - n(1 - t);
        };
    }
    function yr(n) {
        return function(t) {
            return .5 * (t < .5 ? n(2 * t) : 2 - n(2 - 2 * t));
        };
    }
    function mr(n) {
        return n * n;
    }
    function Mr(n) {
        return n * n * n;
    }
    function xr(n) {
        if (n <= 0) return 0;
        if (1 <= n) return 1;
        var t = n * n, e = t * n;
        return 4 * (n < .5 ? e : 3 * (n - t) + e - .75);
    }
    function br(n) {
        return 1 - Math.cos(n * xo);
    }
    function _r(n) {
        return Math.pow(2, 10 * (n - 1));
    }
    function wr(n) {
        return 1 - Math.sqrt(1 - n * n);
    }
    function Sr(n) {
        return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375;
    }
    function kr(n, t) {
        return t -= n, function(e) {
            return Math.round(n + t * e);
        };
    }
    function Nr(n) {
        var t = [ n.a, n.b ], e = [ n.c, n.d ], r = Ar(t), i = Er(t, e), u = Ar(function(n, t, e) {
            return n[0] += e * t[0], n[1] += e * t[1], n;
        }(e, t, -i)) || 0;
        t[0] * e[1] < e[0] * t[1] && (t[0] *= -1, t[1] *= -1, r *= -1, i *= -1), this.rotate = (r ? Math.atan2(t[1], t[0]) : Math.atan2(-e[0], e[1])) * _o, 
        this.translate = [ n.e, n.f ], this.scale = [ r, u ], this.skew = u ? Math.atan2(i, u) * _o : 0;
    }
    function Er(n, t) {
        return n[0] * t[0] + n[1] * t[1];
    }
    function Ar(n) {
        var t = Math.sqrt(Er(n, n));
        return t && (n[0] /= t, n[1] /= t), t;
    }
    function zr(n) {
        return n.length ? n.pop() + "," : "";
    }
    function Dr(n, t) {
        var e = [], r = [];
        return n = Ou.transform(n), t = Ou.transform(t), function(n, t, e, r) {
            if (n[0] !== t[0] || n[1] !== t[1]) {
                var i = e.push("translate(", null, ",", null, ")");
                r.push({
                    i: i - 4,
                    x: sr(n[0], t[0])
                }, {
                    i: i - 2,
                    x: sr(n[1], t[1])
                });
            } else (t[0] || t[1]) && e.push("translate(" + t + ")");
        }(n.translate, t.translate, e, r), function(n, t, e, r) {
            n !== t ? (180 < n - t ? t += 360 : 180 < t - n && (n += 360), r.push({
                i: e.push(zr(e) + "rotate(", null, ")") - 2,
                x: sr(n, t)
            })) : t && e.push(zr(e) + "rotate(" + t + ")");
        }(n.rotate, t.rotate, e, r), function(n, t, e, r) {
            n !== t ? r.push({
                i: e.push(zr(e) + "skewX(", null, ")") - 2,
                x: sr(n, t)
            }) : t && e.push(zr(e) + "skewX(" + t + ")");
        }(n.skew, t.skew, e, r), function(n, t, e, r) {
            if (n[0] !== t[0] || n[1] !== t[1]) {
                var i = e.push(zr(e) + "scale(", null, ",", null, ")");
                r.push({
                    i: i - 4,
                    x: sr(n[0], t[0])
                }, {
                    i: i - 2,
                    x: sr(n[1], t[1])
                });
            } else 1 === t[0] && 1 === t[1] || e.push(zr(e) + "scale(" + t + ")");
        }(n.scale, t.scale, e, r), n = t = null, function(n) {
            for (var t, i = -1, u = r.length; ++i < u; ) e[(t = r[i]).i] = t.x(n);
            return e.join("");
        };
    }
    function Pr(n, t) {
        return t = (t -= n = +n) || 1 / t, function(e) {
            return (e - n) / t;
        };
    }
    function Ur(n, t) {
        return t = (t -= n = +n) || 1 / t, function(e) {
            return Math.max(0, Math.min(1, (e - n) / t));
        };
    }
    function jr(n) {
        for (var t = n.source, e = n.target, r = function(n, t) {
            if (n === t) return n;
            for (var e = Fr(n), r = Fr(t), i = e.pop(), u = r.pop(), o = null; i === u; ) o = i, 
            i = e.pop(), u = r.pop();
            return o;
        }(t, e), i = [ t ]; t !== r; ) t = t.parent, i.push(t);
        for (var u = i.length; e !== r; ) i.splice(u, 0, e), e = e.parent;
        return i;
    }
    function Fr(n) {
        for (var t = [], e = n.parent; null != e; ) t.push(n), e = (n = e).parent;
        return t.push(n), t;
    }
    function Or(n) {
        n.fixed |= 2;
    }
    function Ir(n) {
        n.fixed &= -7;
    }
    function Yr(n) {
        n.fixed |= 4, n.px = n.x, n.py = n.y;
    }
    function Zr(n) {
        n.fixed &= -5;
    }
    function Xr(n, t) {
        return Ou.rebind(n, t, "sort", "children", "value"), (n.nodes = n).links = Kr, n;
    }
    function $r(n, t) {
        for (var e = [ n ]; null != (n = e.pop()); ) if (t(n), (i = n.children) && (r = i.length)) for (var r, i; 0 <= --r; ) e.push(i[r]);
    }
    function Br(n, t) {
        for (var e = [ n ], r = []; null != (n = e.pop()); ) if (r.push(n), (u = n.children) && (i = u.length)) for (var i, u, o = -1; ++o < i; ) e.push(u[o]);
        for (;null != (n = r.pop()); ) t(n);
    }
    function Wr(n) {
        return n.children;
    }
    function Jr(n) {
        return n.value;
    }
    function Gr(n, t) {
        return t.value - n.value;
    }
    function Kr(n) {
        return Ou.merge(n.map(function(n) {
            return (n.children || []).map(function(t) {
                return {
                    source: n,
                    target: t
                };
            });
        }));
    }
    function Qr(n) {
        return n.x;
    }
    function ni(n) {
        return n.y;
    }
    function ti(n, t, e) {
        n.y0 = t, n.y = e;
    }
    function ei(n) {
        return Ou.range(n.length);
    }
    function ri(n) {
        for (var t = -1, e = n[0].length, r = []; ++t < e; ) r[t] = 0;
        return r;
    }
    function ii(n) {
        for (var t, e = 1, r = 0, i = n[0][1], u = n.length; e < u; ++e) (t = n[e][1]) > i && (r = e, 
        i = t);
        return r;
    }
    function ui(n) {
        return n.reduce(oi, 0);
    }
    function oi(n, t) {
        return n + t[1];
    }
    function ai(n, t) {
        return li(n, Math.ceil(Math.log(t.length) / Math.LN2 + 1));
    }
    function li(n, t) {
        for (var e = -1, r = +n[0], i = (n[1] - r) / t, u = []; ++e <= t; ) u[e] = i * e + r;
        return u;
    }
    function ci(n) {
        return [ Ou.min(n), Ou.max(n) ];
    }
    function fi(n, t) {
        return n.value - t.value;
    }
    function si(n, t) {
        var e = n._pack_next;
        (n._pack_next = t)._pack_prev = n, (t._pack_next = e)._pack_prev = t;
    }
    function hi(n, t) {
        (n._pack_next = t)._pack_prev = n;
    }
    function pi(n, t) {
        var e = t.x - n.x, r = t.y - n.y, i = n.r + t.r;
        return e * e + r * r < .999 * i * i;
    }
    function gi(n) {
        function t(n) {
            f = Math.min(n.x - n.r, f), s = Math.max(n.x + n.r, s), h = Math.min(n.y - n.r, h), 
            p = Math.max(n.y + n.r, p);
        }
        if ((e = n.children) && (c = e.length)) {
            var e, r, i, u, o, a, l, c, f = 1 / 0, s = -1 / 0, h = 1 / 0, p = -1 / 0;
            if (e.forEach(vi), (r = e[0]).x = -r.r, r.y = 0, t(r), 1 < c && ((i = e[1]).x = i.r, 
            i.y = 0, t(i), 2 < c)) for (mi(r, i, u = e[2]), t(u), si(r, u), si(r._pack_prev = u, i), 
            i = r._pack_next, o = 3; o < c; o++) {
                mi(r, i, u = e[o]);
                var g = 0, v = 1, d = 1;
                for (a = i._pack_next; a !== i; a = a._pack_next, v++) if (pi(a, u)) {
                    g = 1;
                    break;
                }
                if (1 == g) for (l = r._pack_prev; l !== a._pack_prev && !pi(l, u); l = l._pack_prev, 
                d++) ;
                g ? (v < d || v == d && i.r < r.r ? hi(r, i = a) : hi(r = l, i), o--) : (si(r, u), 
                t(i = u));
            }
            var y = (f + s) / 2, m = (h + p) / 2, M = 0;
            for (o = 0; o < c; o++) (u = e[o]).x -= y, u.y -= m, M = Math.max(M, u.r + Math.sqrt(u.x * u.x + u.y * u.y));
            n.r = M, e.forEach(di);
        }
    }
    function vi(n) {
        n._pack_next = n._pack_prev = n;
    }
    function di(n) {
        delete n._pack_next, delete n._pack_prev;
    }
    function mi(n, t, e) {
        var r = n.r + e.r, i = t.x - n.x, u = t.y - n.y;
        if (r && (i || u)) {
            var o = t.r + e.r, a = i * i + u * u, l = .5 + ((r *= r) - (o *= o)) / (2 * a), c = Math.sqrt(Math.max(0, 2 * o * (r + a) - (r -= a) * r - o * o)) / (2 * a);
            e.x = n.x + l * i + c * u, e.y = n.y + l * u - c * i;
        } else e.x = n.x + r, e.y = n.y;
    }
    function Mi(n, t) {
        return n.parent == t.parent ? 1 : 2;
    }
    function xi(n) {
        var t = n.children;
        return t.length ? t[0] : n.t;
    }
    function bi(n) {
        var t, e = n.children;
        return (t = e.length) ? e[t - 1] : n.t;
    }
    function _i(n, t, e) {
        var r = e / (t.i - n.i);
        t.c -= r, t.s += e, n.c += r, t.z += e, t.m += e;
    }
    function Si(n, t, e) {
        return n.a.parent === t.parent ? n.a : e;
    }
    function Ci(n) {
        return {
            x: n.x,
            y: n.y,
            dx: n.dx,
            dy: n.dy
        };
    }
    function zi(n, t) {
        var e = n.x + t[3], r = n.y + t[0], i = n.dx - t[1] - t[3], u = n.dy - t[0] - t[2];
        return i < 0 && (e += i / 2, i = 0), u < 0 && (r += u / 2, u = 0), {
            x: e,
            y: r,
            dx: i,
            dy: u
        };
    }
    function Li(n) {
        var t = n[0], e = n[n.length - 1];
        return t < e ? [ t, e ] : [ e, t ];
    }
    function qi(n) {
        return n.rangeExtent ? n.rangeExtent() : Li(n.range());
    }
    function Ti(n, t, e, r) {
        var i = e(n[0], n[1]), u = r(t[0], t[1]);
        return function(n) {
            return u(i(n));
        };
    }
    function Ri(n, t) {
        var e, r = 0, i = n.length - 1, u = n[r], o = n[i];
        return o < u && (e = r, r = i, i = e, e = u, u = o, o = e), n[r] = t.floor(u), n[i] = t.ceil(o), 
        n;
    }
    function Di(n) {
        return n ? {
            floor: function(t) {
                return Math.floor(t / n) * n;
            },
            ceil: function(t) {
                return Math.ceil(t / n) * n;
            }
        } : nl;
    }
    function Pi(n, t, e, r) {
        var i = [], u = [], o = 0, a = Math.min(n.length, t.length) - 1;
        for (n[a] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++o <= a; ) i.push(e(n[o - 1], n[o])), 
        u.push(r(t[o - 1], t[o]));
        return function(t) {
            var e = Ou.bisect(n, t, 1, a) - 1;
            return u[e](i[e](t));
        };
    }
    function ji(n, t) {
        return Ou.rebind(n, t, "range", "rangeRound", "interpolate", "clamp");
    }
    function Fi(n, t) {
        return Ri(n, Di(Hi(n, t)[2])), Ri(n, Di(Hi(n, t)[2])), n;
    }
    function Hi(n, t) {
        null == t && (t = 10);
        var e = Li(n), r = e[1] - e[0], i = Math.pow(10, Math.floor(Math.log(r / t) / Math.LN10)), u = t / r * i;
        return u <= .15 ? i *= 10 : u <= .35 ? i *= 5 : u <= .75 && (i *= 2), e[0] = Math.ceil(e[0] / i) * i, 
        e[1] = Math.floor(e[1] / i) * i + .5 * i, e[2] = i, e;
    }
    function Oi(n, t) {
        return Ou.range.apply(Ou, Hi(n, t));
    }
    function Ii(n, t, e) {
        var r = Hi(n, t);
        if (e) {
            var i = Io.exec(e);
            if (i.shift(), "s" === i[8]) {
                var u = Ou.formatPrefix(Math.max(Gu(r[0]), Gu(r[1])));
                return i[7] || (i[7] = "." + Yi(u.scale(r[2]))), i[8] = "f", e = Ou.format(i.join("")), 
                function(n) {
                    return e(u.scale(n)) + u.symbol;
                };
            }
            i[7] || (i[7] = "." + function(n, t) {
                var e = Yi(t[2]);
                return n in tl ? Math.abs(e - Yi(Math.max(Gu(t[0]), Gu(t[1])))) + +("e" !== n) : e - 2 * ("%" === n);
            }(i[8], r)), e = i.join("");
        } else e = ",." + Yi(r[2]) + "f";
        return Ou.format(e);
    }
    function Yi(n) {
        return -Math.floor(Math.log(n) / Math.LN10 + .01);
    }
    function $i(n) {
        return function(t) {
            return t < 0 ? -Math.pow(-t, n) : Math.pow(t, n);
        };
    }
    function Qi() {
        return 0;
    }
    function nu(n) {
        return n.innerRadius;
    }
    function tu(n) {
        return n.outerRadius;
    }
    function eu(n) {
        return n.startAngle;
    }
    function ru(n) {
        return n.endAngle;
    }
    function iu(n) {
        return n && n.padAngle;
    }
    function uu(n, t, e, r) {
        return 0 < (n - e) * t - (t - r) * n ? 0 : 1;
    }
    function ou(n, t, e, r, i) {
        var u = n[0] - t[0], o = n[1] - t[1], a = (i ? r : -r) / Math.sqrt(u * u + o * o), l = a * o, c = -a * u, f = n[0] + l, s = n[1] + c, h = t[0] + l, p = t[1] + c, g = (f + h) / 2, v = (s + p) / 2, d = h - f, y = p - s, m = d * d + y * y, M = e - r, x = f * p - h * s, b = (y < 0 ? -1 : 1) * Math.sqrt(Math.max(0, M * M * m - x * x)), _ = (x * y - d * b) / m, w = (-x * d - y * b) / m, S = (x * y + d * b) / m, k = (-x * d + y * b) / m, N = _ - g, E = w - v, A = S - g, C = k - v;
        return A * A + C * C < N * N + E * E && (_ = S, w = k), [ [ _ - l, w - c ], [ _ * e / M, w * e / M ] ];
    }
    function au(n) {
        function t(t) {
            function o() {
                c.push("M", u(n(f), a));
            }
            for (var l, c = [], f = [], s = -1, h = t.length, p = En(e), g = En(r); ++s < h; ) i.call(this, l = t[s], s) ? f.push([ +p.call(this, l, s), +g.call(this, l, s) ]) : f.length && (o(), 
            f = []);
            return f.length && o(), c.length ? c.join("") : null;
        }
        var e = Se, r = ke, i = Ct, u = lu, o = u.key, a = .7;
        return t.x = function(n) {
            return arguments.length ? (e = n, t) : e;
        }, t.y = function(n) {
            return arguments.length ? (r = n, t) : r;
        }, t.defined = function(n) {
            return arguments.length ? (i = n, t) : i;
        }, t.interpolate = function(n) {
            return arguments.length ? (o = "function" == typeof n ? u = n : (u = cl.get(n) || lu).key, 
            t) : o;
        }, t.tension = function(n) {
            return arguments.length ? (a = n, t) : a;
        }, t;
    }
    function lu(n) {
        return 1 < n.length ? n.join("L") : n + "Z";
    }
    function cu(n) {
        return n.join("L") + "Z";
    }
    function fu(n) {
        for (var t = 0, e = n.length, r = n[0], i = [ r[0], ",", r[1] ]; ++t < e; ) i.push("V", (r = n[t])[1], "H", r[0]);
        return i.join("");
    }
    function su(n) {
        for (var t = 0, e = n.length, r = n[0], i = [ r[0], ",", r[1] ]; ++t < e; ) i.push("H", (r = n[t])[0], "V", r[1]);
        return i.join("");
    }
    function hu(n, t) {
        if (t.length < 1 || n.length != t.length && n.length != t.length + 2) return lu(n);
        var e = n.length != t.length, r = "", i = n[0], u = n[1], o = t[0], a = o, l = 1;
        if (e && (r += "Q" + (u[0] - 2 * o[0] / 3) + "," + (u[1] - 2 * o[1] / 3) + "," + u[0] + "," + u[1], 
        i = n[1], l = 2), 1 < t.length) {
            a = t[1], u = n[l], l++, r += "C" + (i[0] + o[0]) + "," + (i[1] + o[1]) + "," + (u[0] - a[0]) + "," + (u[1] - a[1]) + "," + u[0] + "," + u[1];
            for (var c = 2; c < t.length; c++, l++) u = n[l], a = t[c], r += "S" + (u[0] - a[0]) + "," + (u[1] - a[1]) + "," + u[0] + "," + u[1];
        }
        if (e) {
            var f = n[l];
            r += "Q" + (u[0] + 2 * a[0] / 3) + "," + (u[1] + 2 * a[1] / 3) + "," + f[0] + "," + f[1];
        }
        return r;
    }
    function pu(n, t) {
        for (var e, r = [], i = (1 - t) / 2, u = n[0], o = n[1], a = 1, l = n.length; ++a < l; ) e = u, 
        u = o, o = n[a], r.push([ i * (o[0] - e[0]), i * (o[1] - e[1]) ]);
        return r;
    }
    function gu(n) {
        if (n.length < 3) return lu(n);
        var t = 1, e = n.length, r = n[0], i = r[0], u = r[1], o = [ i, i, i, (r = n[1])[0] ], a = [ u, u, u, r[1] ], l = [ i, ",", u, "L", vu(hl, o), ",", vu(hl, a) ];
        for (n.push(n[e - 1]); ++t <= e; ) r = n[t], o.shift(), o.push(r[0]), a.shift(), 
        a.push(r[1]), du(l, o, a);
        return n.pop(), l.push("L", r), l.join("");
    }
    function vu(n, t) {
        return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] + n[3] * t[3];
    }
    function du(n, t, e) {
        n.push("C", vu(fl, t), ",", vu(fl, e), ",", vu(sl, t), ",", vu(sl, e), ",", vu(hl, t), ",", vu(hl, e));
    }
    function yu(n, t) {
        return (t[1] - n[1]) / (t[0] - n[0]);
    }
    function Mu(n) {
        for (var t, e, r, i, u = [], o = function(n) {
            for (var t = 0, e = n.length - 1, r = [], i = n[0], u = n[1], o = r[0] = yu(i, u); ++t < e; ) r[t] = (o + (o = yu(i = u, u = n[t + 1]))) / 2;
            return r[t] = o, r;
        }(n), a = -1, l = n.length - 1; ++a < l; ) t = yu(n[a], n[a + 1]), Gu(t) < go ? o[a] = o[a + 1] = 0 : 9 < (i = (e = o[a] / t) * e + (r = o[a + 1] / t) * r) && (i = 3 * t / Math.sqrt(i), 
        o[a] = i * e, o[a + 1] = i * r);
        for (a = -1; ++a <= l; ) i = (n[Math.min(l, a + 1)][0] - n[Math.max(0, a - 1)][0]) / (6 * (1 + o[a] * o[a])), 
        u.push([ i || 0, o[a] * i || 0 ]);
        return u;
    }
    function xu(n) {
        for (var t, e, r, i = -1, u = n.length; ++i < u; ) e = (t = n[i])[0], r = t[1] - xo, 
        t[0] = e * Math.cos(r), t[1] = e * Math.sin(r);
        return n;
    }
    function bu(n) {
        function t(t) {
            function l() {
                v.push("M", a(n(y), s), f, c(n(d.reverse()), s), "Z");
            }
            for (var h, p, g, v = [], d = [], y = [], m = -1, M = t.length, x = En(e), b = En(i), _ = e === r ? function() {
                return p;
            } : En(r), w = i === u ? function() {
                return g;
            } : En(u); ++m < M; ) o.call(this, h = t[m], m) ? (d.push([ p = +x.call(this, h, m), g = +b.call(this, h, m) ]), 
            y.push([ +_.call(this, h, m), +w.call(this, h, m) ])) : d.length && (l(), d = [], 
            y = []);
            return d.length && l(), v.length ? v.join("") : null;
        }
        var e = Se, r = Se, i = 0, u = ke, o = Ct, a = lu, l = a.key, c = a, f = "L", s = .7;
        return t.x = function(n) {
            return arguments.length ? (e = r = n, t) : r;
        }, t.x0 = function(n) {
            return arguments.length ? (e = n, t) : e;
        }, t.x1 = function(n) {
            return arguments.length ? (r = n, t) : r;
        }, t.y = function(n) {
            return arguments.length ? (i = u = n, t) : u;
        }, t.y0 = function(n) {
            return arguments.length ? (i = n, t) : i;
        }, t.y1 = function(n) {
            return arguments.length ? (u = n, t) : u;
        }, t.defined = function(n) {
            return arguments.length ? (o = n, t) : o;
        }, t.interpolate = function(n) {
            return arguments.length ? (l = "function" == typeof n ? a = n : (a = cl.get(n) || lu).key, 
            c = a.reverse || a, f = a.closed ? "M" : "L", t) : l;
        }, t.tension = function(n) {
            return arguments.length ? (s = n, t) : s;
        }, t;
    }
    function _u(n) {
        return n.radius;
    }
    function wu(n) {
        return [ n.x, n.y ];
    }
    function ku() {
        return 64;
    }
    function Nu() {
        return "circle";
    }
    function Eu(n) {
        var t = Math.sqrt(n / yo);
        return "M0," + t + "A" + t + "," + t + " 0 1,1 0," + -t + "A" + t + "," + t + " 0 1,1 0," + t + "Z";
    }
    function Au(n) {
        return function() {
            var t, e, r;
            (t = this[n]) && (r = t[e = t.active]) && (r.timer.c = null, r.timer.t = NaN, --t.count ? delete t[e] : delete this[n], 
            t.active += .5, r.event && r.event.interrupt.call(this, this.__data__, r.index));
        };
    }
    function Cu(n, t, e) {
        return eo(n, Ml), n.namespace = t, n.id = e, n;
    }
    function zu(n, t, e, r) {
        var i = n.id, u = n.namespace;
        return Y(n, "function" == typeof e ? function(n, o, a) {
            n[u][i].tween.set(t, r(e.call(n, n.__data__, o, a)));
        } : (e = r(e), function(n) {
            n[u][i].tween.set(t, e);
        }));
    }
    function Lu(n) {
        return null == n && (n = ""), function() {
            this.textContent = n;
        };
    }
    function qu(n) {
        return null == n ? "__transition__" : "__transition_" + n + "__";
    }
    function Tu(n, t, e, r, i) {
        function u(e) {
            var i = p.active, u = p[i];
            for (var c in u && (u.timer.c = null, u.timer.t = NaN, --p.count, delete p[i], u.event && u.event.interrupt.call(n, n.__data__, u.index)), 
            p) if (+c < r) {
                var v = p[c];
                v.timer.c = null, v.timer.t = NaN, --p.count, delete p[c];
            }
            l.c = o, qn(function() {
                return l.c && o(e || 1) && (l.c = null, l.t = NaN), 1;
            }, 0, a), p.active = r, g.event && g.event.start.call(n, n.__data__, t), h = [], 
            g.tween.forEach(function(e, r) {
                (r = r.call(n, n.__data__, t)) && h.push(r);
            }), s = g.ease, f = g.duration;
        }
        function o(i) {
            for (var u = i / f, o = s(u), a = h.length; 0 < a; ) h[--a].call(n, o);
            if (1 <= u) return g.event && g.event.end.call(n, n.__data__, t), --p.count ? delete p[r] : delete n[e], 
            1;
        }
        var a, l, f, s, h, p = n[e] || (n[e] = {
            active: 0,
            count: 0
        }), g = p[r];
        g || (a = i.time, l = qn(function(n) {
            var t = g.delay;
            if (l.t = t + a, t <= n) return u(n - t);
            l.c = u;
        }, 0, a), g = p[r] = {
            tween: new c(),
            time: a,
            timer: l,
            delay: i.delay,
            duration: i.duration,
            ease: i.ease,
            index: t
        }, i = null, ++p.count);
    }
    function Ru(n, t, e) {
        n.attr("transform", function(n) {
            var r = t(n);
            return "translate(" + (isFinite(r) ? r : e(n)) + ",0)";
        });
    }
    function Du(n, t, e) {
        n.attr("transform", function(n) {
            var r = t(n);
            return "translate(0," + (isFinite(r) ? r : e(n)) + ")";
        });
    }
    function Pu(n) {
        return n.toISOString();
    }
    function Uu(n, t, e) {
        function r(t) {
            return n(t);
        }
        function i(n, e) {
            var r = (n[1] - n[0]) / e, i = Ou.bisect(Al, r);
            return i == Al.length ? [ t.year, Hi(n.map(function(n) {
                return n / 31536e6;
            }), e)[2] ] : i ? t[r / Al[i - 1] < Al[i] / r ? i - 1 : i] : [ Ll, Hi(n, e)[2] ];
        }
        return r.invert = function(t) {
            return ju(n.invert(t));
        }, r.domain = function(t) {
            return arguments.length ? (n.domain(t), r) : n.domain().map(ju);
        }, r.nice = function(n, t) {
            function e(e) {
                return !isNaN(e) && !n.range(e, ju(+e + 1), t).length;
            }
            var u = r.domain(), o = Li(u), a = null == n ? i(o, 10) : "number" == typeof n && i(o, n);
            return a && (n = a[0], t = a[1]), r.domain(Ri(u, 1 < t ? {
                floor: function(t) {
                    for (;e(t = n.floor(t)); ) t = ju(t - 1);
                    return t;
                },
                ceil: function(t) {
                    for (;e(t = n.ceil(t)); ) t = ju(+t + 1);
                    return t;
                }
            } : n));
        }, r.ticks = function(n, t) {
            var e = Li(r.domain()), u = null == n ? i(e, 10) : "number" == typeof n ? i(e, n) : !n.range && [ {
                range: n
            }, t ];
            return u && (n = u[0], t = u[1]), n.range(e[0], ju(+e[1] + 1), t < 1 ? 1 : t);
        }, r.tickFormat = function() {
            return e;
        }, r.copy = function() {
            return Uu(n.copy(), t, e);
        }, ji(r, n);
    }
    function ju(n) {
        return new Date(n);
    }
    function Fu(n) {
        return JSON.parse(n.responseText);
    }
    function Hu(n) {
        var t = Zu.createRange();
        return t.selectNode(Zu.body), t.createContextualFragment(n.responseText);
    }
    var Ou = {
        version: "3.5.17"
    }, Iu = [].slice, Yu = function(n) {
        return Iu.call(n);
    }, Zu = this.document;
    if (Zu) try {
        Yu(Zu.documentElement.childNodes)[0].nodeType;
    } catch (n) {
        Yu = function(n) {
            for (var t = n.length, e = new Array(t); t--; ) e[t] = n[t];
            return e;
        };
    }
    if (Date.now || (Date.now = function() {
        return +new Date();
    }), Zu) try {
        Zu.createElement("DIV").style.setProperty("opacity", 0, "");
    } catch (n) {
        var Vu = this.Element.prototype, Xu = Vu.setAttribute, $u = Vu.setAttributeNS, Bu = this.CSSStyleDeclaration.prototype, Wu = Bu.setProperty;
        Vu.setAttribute = function(n, t) {
            Xu.call(this, n, t + "");
        }, Vu.setAttributeNS = function(n, t, e) {
            $u.call(this, n, t, e + "");
        }, Bu.setProperty = function(n, t, e) {
            Wu.call(this, n, t + "", e);
        };
    }
    Ou.ascending = e, Ou.descending = function(n, t) {
        return t < n ? -1 : n < t ? 1 : n <= t ? 0 : NaN;
    }, Ou.min = function(n, t) {
        var e, r, i = -1, u = n.length;
        if (1 === arguments.length) {
            for (;++i < u; ) if (null != (r = n[i]) && r <= r) {
                e = r;
                break;
            }
            for (;++i < u; ) null != (r = n[i]) && r < e && (e = r);
        } else {
            for (;++i < u; ) if (null != (r = t.call(n, n[i], i)) && r <= r) {
                e = r;
                break;
            }
            for (;++i < u; ) null != (r = t.call(n, n[i], i)) && r < e && (e = r);
        }
        return e;
    }, Ou.max = function(n, t) {
        var e, r, i = -1, u = n.length;
        if (1 === arguments.length) {
            for (;++i < u; ) if (null != (r = n[i]) && r <= r) {
                e = r;
                break;
            }
            for (;++i < u; ) null != (r = n[i]) && e < r && (e = r);
        } else {
            for (;++i < u; ) if (null != (r = t.call(n, n[i], i)) && r <= r) {
                e = r;
                break;
            }
            for (;++i < u; ) null != (r = t.call(n, n[i], i)) && e < r && (e = r);
        }
        return e;
    }, Ou.extent = function(n, t) {
        var e, r, i, u = -1, o = n.length;
        if (1 === arguments.length) {
            for (;++u < o; ) if (null != (r = n[u]) && r <= r) {
                e = i = r;
                break;
            }
            for (;++u < o; ) null != (r = n[u]) && (r < e && (e = r), i < r && (i = r));
        } else {
            for (;++u < o; ) if (null != (r = t.call(n, n[u], u)) && r <= r) {
                e = i = r;
                break;
            }
            for (;++u < o; ) null != (r = t.call(n, n[u], u)) && (r < e && (e = r), i < r && (i = r));
        }
        return [ e, i ];
    }, Ou.sum = function(n, t) {
        var e, r = 0, u = n.length, o = -1;
        if (1 === arguments.length) for (;++o < u; ) i(e = +n[o]) && (r += e); else for (;++o < u; ) i(e = +t.call(n, n[o], o)) && (r += e);
        return r;
    }, Ou.mean = function(n, t) {
        var e, u = 0, o = n.length, a = -1, l = o;
        if (1 === arguments.length) for (;++a < o; ) i(e = r(n[a])) ? u += e : --l; else for (;++a < o; ) i(e = r(t.call(n, n[a], a))) ? u += e : --l;
        if (l) return u / l;
    }, Ou.quantile = function(n, t) {
        var e = (n.length - 1) * t + 1, r = Math.floor(e), i = +n[r - 1], u = e - r;
        return u ? i + u * (n[r] - i) : i;
    }, Ou.median = function(n, t) {
        var u, o = [], a = n.length, l = -1;
        if (1 === arguments.length) for (;++l < a; ) i(u = r(n[l])) && o.push(u); else for (;++l < a; ) i(u = r(t.call(n, n[l], l))) && o.push(u);
        if (o.length) return Ou.quantile(o.sort(e), .5);
    }, Ou.variance = function(n, t) {
        var e, u, o = n.length, a = 0, l = 0, c = -1, f = 0;
        if (1 === arguments.length) for (;++c < o; ) i(e = r(n[c])) && (l += (u = e - a) * (e - (a += u / ++f))); else for (;++c < o; ) i(e = r(t.call(n, n[c], c))) && (l += (u = e - a) * (e - (a += u / ++f)));
        if (1 < f) return l / (f - 1);
    }, Ou.deviation = function() {
        var n = Ou.variance.apply(this, arguments);
        return n ? Math.sqrt(n) : n;
    };
    var Ju = u(e);
    Ou.bisectLeft = Ju.left, Ou.bisect = Ou.bisectRight = Ju.right, Ou.bisector = function(n) {
        return u(1 === n.length ? function(t, r) {
            return e(n(t), r);
        } : n);
    }, Ou.shuffle = function(n, t, e) {
        (u = arguments.length) < 3 && (e = n.length, u < 2 && (t = 0));
        for (var r, i, u = e - t; u; ) i = Math.random() * u-- | 0, r = n[u + t], n[u + t] = n[i + t], 
        n[i + t] = r;
        return n;
    }, Ou.permute = function(n, t) {
        for (var e = t.length, r = new Array(e); e--; ) r[e] = n[t[e]];
        return r;
    }, Ou.pairs = function(n) {
        for (var t = 0, e = n.length - 1, r = n[0], i = new Array(e < 0 ? 0 : e); t < e; ) i[t] = [ r, r = n[++t] ];
        return i;
    }, Ou.transpose = function(n) {
        if (!(i = n.length)) return [];
        for (var t = -1, e = Ou.min(n, o), r = new Array(e); ++t < e; ) for (var i, u = -1, a = r[t] = new Array(i); ++u < i; ) a[u] = n[u][t];
        return r;
    }, Ou.zip = function() {
        return Ou.transpose(arguments);
    }, Ou.keys = function(n) {
        var t = [];
        for (var e in n) t.push(e);
        return t;
    }, Ou.values = function(n) {
        var t = [];
        for (var e in n) t.push(n[e]);
        return t;
    }, Ou.entries = function(n) {
        var t = [];
        for (var e in n) t.push({
            key: e,
            value: n[e]
        });
        return t;
    }, Ou.merge = function(n) {
        for (var t, e, r, i = n.length, u = -1, o = 0; ++u < i; ) o += n[u].length;
        for (e = new Array(o); 0 <= --i; ) for (t = (r = n[i]).length; 0 <= --t; ) e[--o] = r[t];
        return e;
    };
    var Gu = Math.abs;
    Ou.range = function(n, t, e) {
        if (arguments.length < 3 && (e = 1, arguments.length < 2 && (t = n, n = 0)), (t - n) / e == 1 / 0) throw new Error("infinite range");
        var r, i = [], u = function(n) {
            for (var t = 1; n * t % 1; ) t *= 10;
            return t;
        }(Gu(e)), o = -1;
        if (n *= u, t *= u, (e *= u) < 0) for (;(r = n + e * ++o) > t; ) i.push(r / u); else for (;(r = n + e * ++o) < t; ) i.push(r / u);
        return i;
    }, Ou.map = function(n, t) {
        var e = new c();
        if (n instanceof c) n.forEach(function(n, t) {
            e.set(n, t);
        }); else if (Array.isArray(n)) {
            var r, i = -1, u = n.length;
            if (1 === arguments.length) for (;++i < u; ) e.set(i, n[i]); else for (;++i < u; ) e.set(t.call(n, r = n[i], i), r);
        } else for (var o in n) e.set(o, n[o]);
        return e;
    };
    var Ku = "__proto__", Qu = "\0";
    l(c, {
        has: h,
        get: function(n) {
            return this._[f(n)];
        },
        set: function(n, t) {
            return this._[f(n)] = t;
        },
        remove: p,
        keys: g,
        values: function() {
            var n = [];
            for (var t in this._) n.push(this._[t]);
            return n;
        },
        entries: function() {
            var n = [];
            for (var t in this._) n.push({
                key: s(t),
                value: this._[t]
            });
            return n;
        },
        size: v,
        empty: d,
        forEach: function(n) {
            for (var t in this._) n.call(this, s(t), this._[t]);
        }
    }), Ou.nest = function() {
        function n(t, o, a) {
            if (a >= u.length) return r ? r.call(i, o) : e ? o.sort(e) : o;
            for (var l, f, s, h, p = -1, g = o.length, v = u[a++], d = new c(); ++p < g; ) (h = d.get(l = v(f = o[p]))) ? h.push(f) : d.set(l, [ f ]);
            return s = t ? (f = t(), function(e, r) {
                f.set(e, n(t, r, a));
            }) : (f = {}, function(e, r) {
                f[e] = n(t, r, a);
            }), d.forEach(s), f;
        }
        var e, r, i = {}, u = [], o = [];
        return i.map = function(t, e) {
            return n(e, t, 0);
        }, i.entries = function(e) {
            return function t(n, e) {
                if (e >= u.length) return n;
                var r = [], i = o[e++];
                return n.forEach(function(n, i) {
                    r.push({
                        key: n,
                        values: t(i, e)
                    });
                }), i ? r.sort(function(n, t) {
                    return i(n.key, t.key);
                }) : r;
            }(n(Ou.map, e, 0), 0);
        }, i.key = function(n) {
            return u.push(n), i;
        }, i.sortKeys = function(n) {
            return o[u.length - 1] = n, i;
        }, i.sortValues = function(n) {
            return e = n, i;
        }, i.rollup = function(n) {
            return r = n, i;
        }, i;
    }, Ou.set = function(n) {
        var t = new y();
        if (n) for (var e = 0, r = n.length; e < r; ++e) t.add(n[e]);
        return t;
    }, l(y, {
        has: h,
        add: function(n) {
            return this._[f(n += "")] = !0, n;
        },
        remove: p,
        values: g,
        size: v,
        empty: d,
        forEach: function(n) {
            for (var t in this._) n.call(this, s(t));
        }
    }), Ou.behavior = {}, Ou.rebind = function(n, t) {
        for (var e, r = 1, i = arguments.length; ++r < i; ) n[e = arguments[r]] = M(n, t, t[e]);
        return n;
    };
    var no = [ "webkit", "ms", "moz", "Moz", "o", "O" ];
    Ou.dispatch = function() {
        for (var n = new _(), t = -1, e = arguments.length; ++t < e; ) n[arguments[t]] = w(n);
        return n;
    }, _.prototype.on = function(n, t) {
        var e = n.indexOf("."), r = "";
        if (0 <= e && (r = n.slice(e + 1), n = n.slice(0, e)), n) return arguments.length < 2 ? this[n].on(r) : this[n].on(r, t);
        if (2 === arguments.length) {
            if (null == t) for (n in this) this.hasOwnProperty(n) && this[n].on(r, null);
            return this;
        }
    }, Ou.event = null, Ou.requote = function(n) {
        return n.replace(to, "\\$&");
    };
    var to = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g, eo = {}.__proto__ ? function(n, t) {
        n.__proto__ = t;
    } : function(n, t) {
        for (var e in t) n[e] = t[e];
    }, ro = function(n, t) {
        return t.querySelector(n);
    }, io = function(n, t) {
        return t.querySelectorAll(n);
    }, uo = function(n, t) {
        var e = n.matches || n[x(n, "matchesSelector")];
        return (uo = function(n, t) {
            return e.call(n, t);
        })(n, t);
    };
    "function" == typeof Sizzle && (ro = function(n, t) {
        return Sizzle(n, t)[0] || null;
    }, io = Sizzle, uo = Sizzle.matchesSelector), Ou.selection = function() {
        return Ou.select(Zu.documentElement);
    };
    var oo = Ou.selection.prototype = [];
    oo.select = function(n) {
        var t, e, r, i, u = [];
        n = A(n);
        for (var o = -1, a = this.length; ++o < a; ) {
            u.push(t = []), t.parentNode = (r = this[o]).parentNode;
            for (var l = -1, c = r.length; ++l < c; ) (i = r[l]) ? (t.push(e = n.call(i, i.__data__, l, o)), 
            e && "__data__" in i && (e.__data__ = i.__data__)) : t.push(null);
        }
        return E(u);
    }, oo.selectAll = function(n) {
        var t, e, r = [];
        n = C(n);
        for (var i = -1, u = this.length; ++i < u; ) for (var o = this[i], a = -1, l = o.length; ++a < l; ) (e = o[a]) && (r.push(t = Yu(n.call(e, e.__data__, a, i))), 
        t.parentNode = e);
        return E(r);
    };
    var ao = "http://www.w3.org/1999/xhtml", lo = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: ao,
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    Ou.ns = {
        prefix: lo,
        qualify: function(n) {
            var t = n.indexOf(":"), e = n;
            return 0 <= t && "xmlns" !== (e = n.slice(0, t)) && (n = n.slice(t + 1)), lo.hasOwnProperty(e) ? {
                space: lo[e],
                local: n
            } : n;
        }
    }, oo.attr = function(n, t) {
        if (arguments.length < 2) {
            if ("string" == typeof n) {
                var e = this.node();
                return (n = Ou.ns.qualify(n)).local ? e.getAttributeNS(n.space, n.local) : e.getAttribute(n);
            }
            for (t in n) this.each(z(t, n[t]));
            return this;
        }
        return this.each(z(n, t));
    }, oo.classed = function(n, t) {
        if (arguments.length < 2) {
            if ("string" == typeof n) {
                var e = this.node(), r = (n = T(n)).length, i = -1;
                if (t = e.classList) {
                    for (;++i < r; ) if (!t.contains(n[i])) return !1;
                } else for (t = e.getAttribute("class"); ++i < r; ) if (!q(n[i]).test(t)) return !1;
                return !0;
            }
            for (t in n) this.each(R(t, n[t]));
            return this;
        }
        return this.each(R(n, t));
    }, oo.style = function(n, e, r) {
        var i = arguments.length;
        if (i < 3) {
            if ("string" != typeof n) {
                for (r in i < 2 && (e = ""), n) this.each(P(r, n[r], e));
                return this;
            }
            if (i < 2) {
                var u = this.node();
                return t(u).getComputedStyle(u, null).getPropertyValue(n);
            }
            r = "";
        }
        return this.each(P(n, e, r));
    }, oo.property = function(n, t) {
        if (arguments.length < 2) {
            if ("string" == typeof n) return this.node()[n];
            for (t in n) this.each(U(t, n[t]));
            return this;
        }
        return this.each(U(n, t));
    }, oo.text = function(n) {
        return arguments.length ? this.each("function" == typeof n ? function() {
            var t = n.apply(this, arguments);
            this.textContent = null == t ? "" : t;
        } : null == n ? function() {
            this.textContent = "";
        } : function() {
            this.textContent = n;
        }) : this.node().textContent;
    }, oo.html = function(n) {
        return arguments.length ? this.each("function" == typeof n ? function() {
            var t = n.apply(this, arguments);
            this.innerHTML = null == t ? "" : t;
        } : null == n ? function() {
            this.innerHTML = "";
        } : function() {
            this.innerHTML = n;
        }) : this.node().innerHTML;
    }, oo.append = function(n) {
        return n = j(n), this.select(function() {
            return this.appendChild(n.apply(this, arguments));
        });
    }, oo.insert = function(n, t) {
        return n = j(n), t = A(t), this.select(function() {
            return this.insertBefore(n.apply(this, arguments), t.apply(this, arguments) || null);
        });
    }, oo.remove = function() {
        return this.each(F);
    }, oo.data = function(n, t) {
        function e(n, e) {
            var r, i, u, o = n.length, s = e.length, h = Math.min(o, s), p = new Array(s), g = new Array(s), v = new Array(o);
            if (t) {
                var d, y = new c(), m = new Array(o);
                for (r = -1; ++r < o; ) (i = n[r]) && (y.has(d = t.call(i, i.__data__, r)) ? v[r] = i : y.set(d, i), 
                m[r] = d);
                for (r = -1; ++r < s; ) (i = y.get(d = t.call(e, u = e[r], r))) ? !0 !== i && ((p[r] = i).__data__ = u) : g[r] = H(u), 
                y.set(d, !0);
                for (r = -1; ++r < o; ) r in m && !0 !== y.get(m[r]) && (v[r] = n[r]);
            } else {
                for (r = -1; ++r < h; ) i = n[r], u = e[r], i ? (i.__data__ = u, p[r] = i) : g[r] = H(u);
                for (;r < s; ++r) g[r] = H(e[r]);
                for (;r < o; ++r) v[r] = n[r];
            }
            g.update = p, g.parentNode = p.parentNode = v.parentNode = n.parentNode, a.push(g), 
            l.push(p), f.push(v);
        }
        var r, i, u = -1, o = this.length;
        if (!arguments.length) {
            for (n = new Array(o = (r = this[0]).length); ++u < o; ) (i = r[u]) && (n[u] = i.__data__);
            return n;
        }
        var a = Z([]), l = E([]), f = E([]);
        if ("function" == typeof n) for (;++u < o; ) e(r = this[u], n.call(r, r.parentNode.__data__, u)); else for (;++u < o; ) e(r = this[u], n);
        return l.enter = function() {
            return a;
        }, l.exit = function() {
            return f;
        }, l;
    }, oo.datum = function(n) {
        return arguments.length ? this.property("__data__", n) : this.property("__data__");
    }, oo.filter = function(n) {
        var t, e, r, i = [];
        "function" != typeof n && (n = O(n));
        for (var u = 0, o = this.length; u < o; u++) {
            i.push(t = []), t.parentNode = (e = this[u]).parentNode;
            for (var a = 0, l = e.length; a < l; a++) (r = e[a]) && n.call(r, r.__data__, a, u) && t.push(r);
        }
        return E(i);
    }, oo.order = function() {
        for (var n = -1, t = this.length; ++n < t; ) for (var e, r = this[n], i = r.length - 1, u = r[i]; 0 <= --i; ) (e = r[i]) && (u && u !== e.nextSibling && u.parentNode.insertBefore(e, u), 
        u = e);
        return this;
    }, oo.sort = function(n) {
        n = I.apply(this, arguments);
        for (var t = -1, e = this.length; ++t < e; ) this[t].sort(n);
        return this.order();
    }, oo.each = function(n) {
        return Y(this, function(t, e, r) {
            n.call(t, t.__data__, e, r);
        });
    }, oo.call = function(n) {
        var t = Yu(arguments);
        return n.apply(t[0] = this, t), this;
    }, oo.empty = function() {
        return !this.node();
    }, oo.node = function() {
        for (var n = 0, t = this.length; n < t; n++) for (var e = this[n], r = 0, i = e.length; r < i; r++) {
            var u = e[r];
            if (u) return u;
        }
        return null;
    }, oo.size = function() {
        var n = 0;
        return Y(this, function() {
            ++n;
        }), n;
    };
    var co = [];
    Ou.selection.enter = Z, (Ou.selection.enter.prototype = co).append = oo.append, 
    co.empty = oo.empty, co.node = oo.node, co.call = oo.call, co.size = oo.size, co.select = function(n) {
        for (var t, e, r, i, u, o = [], a = -1, l = this.length; ++a < l; ) {
            r = (i = this[a]).update, o.push(t = []), t.parentNode = i.parentNode;
            for (var c = -1, f = i.length; ++c < f; ) (u = i[c]) ? (t.push(r[c] = e = n.call(i.parentNode, u.__data__, c, a)), 
            e.__data__ = u.__data__) : t.push(null);
        }
        return E(o);
    }, co.insert = function(n, t) {
        return arguments.length < 2 && (t = function(n) {
            var t, e;
            return function(r, i, u) {
                var o, a = n[u].update, l = a.length;
                for (u != e && (e = u, t = 0), t <= i && (t = i + 1); !(o = a[t]) && ++t < l; ) ;
                return o;
            };
        }(this)), oo.insert.call(this, n, t);
    }, Ou.select = function(t) {
        var e;
        return "string" == typeof t ? (e = [ ro(t, Zu) ]).parentNode = Zu.documentElement : (e = [ t ]).parentNode = n(t), 
        E([ e ]);
    }, Ou.selectAll = function(n) {
        var t;
        return "string" == typeof n ? (t = Yu(io(n, Zu))).parentNode = Zu.documentElement : (t = Yu(n)).parentNode = null, 
        E([ t ]);
    }, oo.on = function(n, t, e) {
        var r = arguments.length;
        if (r < 3) {
            if ("string" != typeof n) {
                for (e in r < 2 && (t = !1), n) this.each(X(e, n[e], t));
                return this;
            }
            if (r < 2) return (r = this.node()["__on" + n]) && r._;
            e = !1;
        }
        return this.each(X(n, t, e));
    };
    var fo = Ou.map({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    });
    Zu && fo.forEach(function(n) {
        "on" + n in Zu && fo.remove(n);
    });
    var so, ho = 0;
    Ou.mouse = function(n) {
        return J(n, k());
    };
    var po = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
    Ou.touch = function(n, t, e) {
        if (arguments.length < 3 && (e = t, t = k().changedTouches), t) for (var r, i = 0, u = t.length; i < u; ++i) if ((r = t[i]).identifier === e) return J(n, r);
    }, Ou.behavior.drag = function() {
        function n() {
            this.on("mousedown.drag", u).on("touchstart.drag", o);
        }
        function e(n, t, e, u, o) {
            return function() {
                var a, l = this, c = Ou.event.target.correspondingElement || Ou.event.target, f = l.parentNode, s = r.of(l, arguments), h = 0, p = n(), g = ".drag" + (null == p ? "" : "-" + p), v = Ou.select(e(c)).on(u + g, function() {
                    var n, e, r = t(f, p);
                    r && (n = r[0] - y[0], e = r[1] - y[1], h |= n | e, s({
                        type: "drag",
                        x: (y = r)[0] + a[0],
                        y: r[1] + a[1],
                        dx: n,
                        dy: e
                    }));
                }).on(o + g, function() {
                    t(f, p) && (v.on(u + g, null).on(o + g, null), d(h), s({
                        type: "dragend"
                    }));
                }), d = W(c), y = t(f, p);
                a = i ? [ (a = i.apply(l, arguments)).x - y[0], a.y - y[1] ] : [ 0, 0 ], s({
                    type: "dragstart"
                });
            };
        }
        var r = N(n, "drag", "dragstart", "dragend"), i = null, u = e(b, Ou.mouse, t, "mousemove", "mouseup"), o = e(G, Ou.touch, m, "touchmove", "touchend");
        return n.origin = function(t) {
            return arguments.length ? (i = t, n) : i;
        }, Ou.rebind(n, r, "on");
    }, Ou.touches = function(n, t) {
        return arguments.length < 2 && (t = k().touches), t ? Yu(t).map(function(t) {
            var e = J(n, t);
            return e.identifier = t.identifier, e;
        }) : [];
    };
    var go = 1e-6, vo = go * go, yo = Math.PI, mo = 2 * yo, Mo = mo - go, xo = yo / 2, bo = yo / 180, _o = 180 / yo, wo = Math.SQRT2;
    Ou.interpolateZoom = function(n, t) {
        var e, r, i = n[0], u = n[1], o = n[2], a = t[0], l = t[1], c = t[2], f = a - i, s = l - u, h = f * f + s * s;
        if (h < vo) r = Math.log(c / o) / wo, e = function(n) {
            return [ i + n * f, u + n * s, o * Math.exp(wo * n * r) ];
        }; else {
            var p = Math.sqrt(h), g = (c * c - o * o + 4 * h) / (2 * o * 2 * p), v = (c * c - o * o - 4 * h) / (2 * c * 2 * p), d = Math.log(Math.sqrt(g * g + 1) - g), y = Math.log(Math.sqrt(v * v + 1) - v);
            r = (y - d) / wo, e = function(n) {
                var t = n * r, e = rn(d), a = o / (2 * p) * (e * function(n) {
                    return ((n = Math.exp(2 * n)) - 1) / (n + 1);
                }(wo * t + d) - function(n) {
                    return ((n = Math.exp(n)) - 1 / n) / 2;
                }(d));
                return [ i + a * f, u + a * s, o * e / rn(wo * t + d) ];
            };
        }
        return e.duration = 1e3 * r, e;
    }, Ou.behavior.zoom = function() {
        function n(n) {
            n.on(L, s).on(ko + ".zoom", p).on("dblclick.zoom", g).on(R, h);
        }
        function e(n) {
            return [ (n[0] - k.x) / k.k, (n[1] - k.y) / k.k ];
        }
        function i(n) {
            k.k = Math.max(A[0], Math.min(A[1], n));
        }
        function u(n, t) {
            t = function(n) {
                return [ n[0] * k.k + k.x, n[1] * k.k + k.y ];
            }(t), k.x += n[0] - t[0], k.y += n[1] - t[1];
        }
        function o(t, e, r, o) {
            t.__chart__ = {
                x: k.x,
                y: k.y,
                k: k.k
            }, i(Math.pow(2, o)), u(d = e, r), t = Ou.select(t), 0 < C && (t = t.transition().duration(C)), 
            t.call(n.event);
        }
        function a() {
            b && b.domain(x.range().map(function(n) {
                return (n - k.x) / k.k;
            }).map(x.invert)), w && w.domain(_.range().map(function(n) {
                return (n - k.y) / k.k;
            }).map(_.invert));
        }
        function l(n) {
            z++ || n({
                type: "zoomstart"
            });
        }
        function c(n) {
            a(), n({
                type: "zoom",
                scale: k.k,
                translate: [ k.x, k.y ]
            });
        }
        function f(n) {
            --z || (n({
                type: "zoomend"
            }), d = null);
        }
        function s() {
            var n = this, r = D.of(n, arguments), i = 0, o = Ou.select(t(n)).on(q, function() {
                i = 1, u(Ou.mouse(n), a), c(r);
            }).on(T, function() {
                o.on(q, null).on(T, null), s(i), f(r);
            }), a = e(Ou.mouse(n)), s = W(n);
            ml.call(n), l(r);
        }
        function h() {
            function n() {
                var n = Ou.touches(g);
                return p = k.k, n.forEach(function(n) {
                    n.identifier in d && (d[n.identifier] = e(n));
                }), n;
            }
            function t() {
                var t = Ou.event.target;
                Ou.select(t).on(x, r).on(b, a), _.push(t);
                for (var e = Ou.event.changedTouches, i = 0, u = e.length; i < u; ++i) d[e[i].identifier] = null;
                var l = n(), c = Date.now();
                if (1 === l.length) c - M < 500 && (f = l[0], o(g, f, d[f.identifier], Math.floor(Math.log(k.k) / Math.LN2) + 1), 
                S()), M = c; else if (1 < l.length) {
                    var f = l[0], s = l[1], h = f[0] - s[0], p = f[1] - s[1];
                    y = h * h + p * p;
                }
            }
            function r() {
                var n, t, e, r, o = Ou.touches(g);
                ml.call(g);
                for (var a = 0, l = o.length; a < l; ++a, r = null) if (e = o[a], r = d[e.identifier]) {
                    if (t) break;
                    n = e, t = r;
                }
                if (r) {
                    var f = (f = e[0] - n[0]) * f + (f = e[1] - n[1]) * f, s = y && Math.sqrt(f / y);
                    n = [ (n[0] + e[0]) / 2, (n[1] + e[1]) / 2 ], t = [ (t[0] + r[0]) / 2, (t[1] + r[1]) / 2 ], 
                    i(s * p);
                }
                M = null, u(n, t), c(v);
            }
            function a() {
                if (Ou.event.touches.length) {
                    for (var t = Ou.event.changedTouches, e = 0, r = t.length; e < r; ++e) delete d[t[e].identifier];
                    for (var i in d) return void n();
                }
                Ou.selectAll(_).on(m, null), w.on(L, s).on(R, h), N(), f(v);
            }
            var p, g = this, v = D.of(g, arguments), d = {}, y = 0, m = ".zoom-" + Ou.event.changedTouches[0].identifier, x = "touchmove" + m, b = "touchend" + m, _ = [], w = Ou.select(g), N = W(g);
            t(), l(v), w.on(L, null).on(R, t);
        }
        function p() {
            var n = D.of(this, arguments);
            m ? clearTimeout(m) : (ml.call(this), v = e(d = y || Ou.mouse(this)), l(n)), m = setTimeout(function() {
                m = null, f(n);
            }, 50), S(), i(Math.pow(2, .002 * So()) * k.k), u(d, v), c(n);
        }
        function g() {
            var n = Ou.mouse(this), t = Math.log(k.k) / Math.LN2;
            o(this, n, e(n), Ou.event.shiftKey ? Math.ceil(t) - 1 : Math.floor(t) + 1);
        }
        var v, d, y, m, M, x, b, _, w, k = {
            x: 0,
            y: 0,
            k: 1
        }, E = [ 960, 500 ], A = No, C = 250, z = 0, L = "mousedown.zoom", q = "mousemove.zoom", T = "mouseup.zoom", R = "touchstart.zoom", D = N(n, "zoomstart", "zoom", "zoomend");
        return ko || (ko = "onwheel" in Zu ? (So = function() {
            return -Ou.event.deltaY * (Ou.event.deltaMode ? 120 : 1);
        }, "wheel") : "onmousewheel" in Zu ? (So = function() {
            return Ou.event.wheelDelta;
        }, "mousewheel") : (So = function() {
            return -Ou.event.detail;
        }, "MozMousePixelScroll")), n.event = function(n) {
            n.each(function() {
                var n = D.of(this, arguments), t = k;
                dl ? Ou.select(this).transition().each("start.zoom", function() {
                    k = this.__chart__ || {
                        x: 0,
                        y: 0,
                        k: 1
                    }, l(n);
                }).tween("zoom:zoom", function() {
                    var e = E[0], r = E[1], i = d ? d[0] : e / 2, u = d ? d[1] : r / 2, o = Ou.interpolateZoom([ (i - k.x) / k.k, (u - k.y) / k.k, e / k.k ], [ (i - t.x) / t.k, (u - t.y) / t.k, e / t.k ]);
                    return function(t) {
                        var r = o(t), a = e / r[2];
                        this.__chart__ = k = {
                            x: i - r[0] * a,
                            y: u - r[1] * a,
                            k: a
                        }, c(n);
                    };
                }).each("interrupt.zoom", function() {
                    f(n);
                }).each("end.zoom", function() {
                    f(n);
                }) : (this.__chart__ = k, l(n), c(n), f(n));
            });
        }, n.translate = function(t) {
            return arguments.length ? (k = {
                x: +t[0],
                y: +t[1],
                k: k.k
            }, a(), n) : [ k.x, k.y ];
        }, n.scale = function(t) {
            return arguments.length ? (k = {
                x: k.x,
                y: k.y,
                k: null
            }, i(+t), a(), n) : k.k;
        }, n.scaleExtent = function(t) {
            return arguments.length ? (A = null == t ? No : [ +t[0], +t[1] ], n) : A;
        }, n.center = function(t) {
            return arguments.length ? (y = t && [ +t[0], +t[1] ], n) : y;
        }, n.size = function(t) {
            return arguments.length ? (E = t && [ +t[0], +t[1] ], n) : E;
        }, n.duration = function(t) {
            return arguments.length ? (C = +t, n) : C;
        }, n.x = function(t) {
            return arguments.length ? (x = (b = t).copy(), k = {
                x: 0,
                y: 0,
                k: 1
            }, n) : b;
        }, n.y = function(t) {
            return arguments.length ? (_ = (w = t).copy(), k = {
                x: 0,
                y: 0,
                k: 1
            }, n) : w;
        }, Ou.rebind(n, D, "on");
    };
    var So, ko, No = [ 0, 1 / 0 ];
    (Ou.color = an).prototype.toString = function() {
        return this.rgb() + "";
    };
    var Eo = (Ou.hsl = ln).prototype = new an();
    Eo.brighter = function(n) {
        return n = Math.pow(.7, arguments.length ? n : 1), new ln(this.h, this.s, this.l / n);
    }, Eo.darker = function(n) {
        return n = Math.pow(.7, arguments.length ? n : 1), new ln(this.h, this.s, n * this.l);
    }, Eo.rgb = function() {
        return cn(this.h, this.s, this.l);
    };
    var Ao = (Ou.hcl = fn).prototype = new an();
    Ao.brighter = function(n) {
        return new fn(this.h, this.c, Math.min(100, this.l + Co * (arguments.length ? n : 1)));
    }, Ao.darker = function(n) {
        return new fn(this.h, this.c, Math.max(0, this.l - Co * (arguments.length ? n : 1)));
    }, Ao.rgb = function() {
        return sn(this.h, this.c, this.l).rgb();
    }, Ou.lab = hn;
    var Co = 18, zo = .95047, Lo = 1, qo = 1.08883, To = hn.prototype = new an();
    To.brighter = function(n) {
        return new hn(Math.min(100, this.l + Co * (arguments.length ? n : 1)), this.a, this.b);
    }, To.darker = function(n) {
        return new hn(Math.max(0, this.l - Co * (arguments.length ? n : 1)), this.a, this.b);
    }, To.rgb = function() {
        return pn(this.l, this.a, this.b);
    };
    var Ro = (Ou.rgb = mn).prototype = new an();
    Ro.brighter = function(n) {
        n = Math.pow(.7, arguments.length ? n : 1);
        var t = this.r, e = this.g, r = this.b, i = 30;
        return t || e || r ? (t && t < i && (t = i), e && e < i && (e = i), r && r < i && (r = i), 
        new mn(Math.min(255, t / n), Math.min(255, e / n), Math.min(255, r / n))) : new mn(i, i, i);
    }, Ro.darker = function(n) {
        return new mn((n = Math.pow(.7, arguments.length ? n : 1)) * this.r, n * this.g, n * this.b);
    }, Ro.hsl = function() {
        return wn(this.r, this.g, this.b);
    }, Ro.toString = function() {
        return "#" + bn(this.r) + bn(this.g) + bn(this.b);
    };
    var Do = Ou.map({
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    });
    Do.forEach(function(n, t) {
        Do.set(n, Mn(t));
    }), Ou.functor = En, Ou.xhr = An(m), Ou.dsv = function(n, t) {
        function e(n, e, u) {
            arguments.length < 3 && (u = e, e = null);
            var o = Cn(n, t, null == e ? r : i(e), u);
            return o.row = function(n) {
                return arguments.length ? o.response(null == (e = n) ? r : i(n)) : e;
            }, o;
        }
        function r(n) {
            return e.parse(n.responseText);
        }
        function i(n) {
            return function(t) {
                return e.parse(t.responseText, n);
            };
        }
        function u(t) {
            return t.map(o).join(n);
        }
        function o(n) {
            return a.test(n) ? '"' + n.replace(/\"/g, '""') + '"' : n;
        }
        var a = new RegExp('["' + n + "\n]"), l = n.charCodeAt(0);
        return e.parse = function(n, t) {
            var r;
            return e.parseRows(n, function(n, e) {
                if (r) return r(n, e - 1);
                var i = new Function("d", "return {" + n.map(function(n, t) {
                    return JSON.stringify(n) + ": d[" + t + "]";
                }).join(",") + "}");
                r = t ? function(n, e) {
                    return t(i(n), e);
                } : i;
            });
        }, e.parseRows = function(n, t) {
            function e() {
                if (c <= f) return o;
                if (i) return i = !1, u;
                var t = f;
                if (34 === n.charCodeAt(t)) {
                    for (var e = t; e++ < c; ) if (34 === n.charCodeAt(e)) {
                        if (34 !== n.charCodeAt(e + 1)) break;
                        ++e;
                    }
                    return f = e + 2, 13 === (r = n.charCodeAt(e + 1)) ? (i = !0, 10 === n.charCodeAt(e + 2) && ++f) : 10 === r && (i = !0), 
                    n.slice(t + 1, e).replace(/""/g, '"');
                }
                for (;f < c; ) {
                    var r = n.charCodeAt(f++), a = 1;
                    if (10 === r) i = !0; else if (13 === r) i = !0, 10 === n.charCodeAt(f) && (++f, 
                    ++a); else if (r !== l) continue;
                    return n.slice(t, f - a);
                }
                return n.slice(t);
            }
            for (var r, i, u = {}, o = {}, a = [], c = n.length, f = 0, s = 0; (r = e()) !== o; ) {
                for (var h = []; r !== u && r !== o; ) h.push(r), r = e();
                t && null == (h = t(h, s++)) || a.push(h);
            }
            return a;
        }, e.format = function(t) {
            if (Array.isArray(t[0])) return e.formatRows(t);
            var r = new y(), i = [];
            return t.forEach(function(n) {
                for (var t in n) r.has(t) || i.push(r.add(t));
            }), [ i.map(o).join(n) ].concat(t.map(function(t) {
                return i.map(function(n) {
                    return o(t[n]);
                }).join(n);
            })).join("\n");
        }, e.formatRows = function(n) {
            return n.map(u).join("\n");
        }, e;
    }, Ou.csv = Ou.dsv(",", "text/csv"), Ou.tsv = Ou.dsv("\t", "text/tab-separated-values");
    var Po, Uo, jo, Fo, Ho = this[x(this, "requestAnimationFrame")] || function(n) {
        setTimeout(n, 17);
    };
    Ou.timer = function() {
        qn.apply(this, arguments);
    }, Ou.timer.flush = function() {
        Rn(), Dn();
    }, Ou.round = function(n, t) {
        return t ? Math.round(n * (t = Math.pow(10, t))) / t : Math.round(n);
    };
    var Oo = [ "y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y" ].map(function(n, t) {
        var e = Math.pow(10, 3 * Gu(8 - t));
        return {
            scale: 8 < t ? function(n) {
                return n / e;
            } : function(n) {
                return n * e;
            },
            symbol: n
        };
    });
    Ou.formatPrefix = function(n, t) {
        var e = 0;
        return (n = +n) && (n < 0 && (n *= -1), t && (n = Ou.round(n, Pn(n, t))), e = 1 + Math.floor(1e-12 + Math.log(n) / Math.LN10), 
        e = Math.max(-24, Math.min(24, 3 * Math.floor((e - 1) / 3)))), Oo[8 + e / 3];
    };
    var Io = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i, Yo = Ou.map({
        b: function(n) {
            return n.toString(2);
        },
        c: function(n) {
            return String.fromCharCode(n);
        },
        o: function(n) {
            return n.toString(8);
        },
        x: function(n) {
            return n.toString(16);
        },
        X: function(n) {
            return n.toString(16).toUpperCase();
        },
        g: function(n, t) {
            return n.toPrecision(t);
        },
        e: function(n, t) {
            return n.toExponential(t);
        },
        f: function(n, t) {
            return n.toFixed(t);
        },
        r: function(n, t) {
            return (n = Ou.round(n, Pn(n, t))).toFixed(Math.max(0, Math.min(20, Pn(n * (1 + 1e-15), t))));
        }
    }), Zo = Ou.time = {}, Vo = Date;
    Fn.prototype = {
        getDate: function() {
            return this._.getUTCDate();
        },
        getDay: function() {
            return this._.getUTCDay();
        },
        getFullYear: function() {
            return this._.getUTCFullYear();
        },
        getHours: function() {
            return this._.getUTCHours();
        },
        getMilliseconds: function() {
            return this._.getUTCMilliseconds();
        },
        getMinutes: function() {
            return this._.getUTCMinutes();
        },
        getMonth: function() {
            return this._.getUTCMonth();
        },
        getSeconds: function() {
            return this._.getUTCSeconds();
        },
        getTime: function() {
            return this._.getTime();
        },
        getTimezoneOffset: function() {
            return 0;
        },
        valueOf: function() {
            return this._.valueOf();
        },
        setDate: function() {
            Xo.setUTCDate.apply(this._, arguments);
        },
        setDay: function() {
            Xo.setUTCDay.apply(this._, arguments);
        },
        setFullYear: function() {
            Xo.setUTCFullYear.apply(this._, arguments);
        },
        setHours: function() {
            Xo.setUTCHours.apply(this._, arguments);
        },
        setMilliseconds: function() {
            Xo.setUTCMilliseconds.apply(this._, arguments);
        },
        setMinutes: function() {
            Xo.setUTCMinutes.apply(this._, arguments);
        },
        setMonth: function() {
            Xo.setUTCMonth.apply(this._, arguments);
        },
        setSeconds: function() {
            Xo.setUTCSeconds.apply(this._, arguments);
        },
        setTime: function() {
            Xo.setTime.apply(this._, arguments);
        }
    };
    var Xo = Date.prototype;
    Zo.year = Hn(function(n) {
        return (n = Zo.day(n)).setMonth(0, 1), n;
    }, function(n, t) {
        n.setFullYear(n.getFullYear() + t);
    }, function(n) {
        return n.getFullYear();
    }), Zo.years = Zo.year.range, Zo.years.utc = Zo.year.utc.range, Zo.day = Hn(function(n) {
        var t = new Vo(2e3, 0);
        return t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), t;
    }, function(n, t) {
        n.setDate(n.getDate() + t);
    }, function(n) {
        return n.getDate() - 1;
    }), Zo.days = Zo.day.range, Zo.days.utc = Zo.day.utc.range, Zo.dayOfYear = function(n) {
        var t = Zo.year(n);
        return Math.floor((n - t - 6e4 * (n.getTimezoneOffset() - t.getTimezoneOffset())) / 864e5);
    }, [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ].forEach(function(n, t) {
        t = 7 - t;
        var e = Zo[n] = Hn(function(n) {
            return (n = Zo.day(n)).setDate(n.getDate() - (n.getDay() + t) % 7), n;
        }, function(n, t) {
            n.setDate(n.getDate() + 7 * Math.floor(t));
        }, function(n) {
            var e = Zo.year(n).getDay();
            return Math.floor((Zo.dayOfYear(n) + (e + t) % 7) / 7) - (e !== t);
        });
        Zo[n + "s"] = e.range, Zo[n + "s"].utc = e.utc.range, Zo[n + "OfYear"] = function(n) {
            var e = Zo.year(n).getDay();
            return Math.floor((Zo.dayOfYear(n) + (e + t) % 7) / 7);
        };
    }), Zo.week = Zo.sunday, Zo.weeks = Zo.sunday.range, Zo.weeks.utc = Zo.sunday.utc.range, 
    Zo.weekOfYear = Zo.sundayOfYear;
    var $o = {
        "-": "",
        _: " ",
        0: "0"
    }, Bo = /^\s*\d+/, Wo = /^%/;
    Ou.locale = function(n) {
        return {
            numberFormat: function(n) {
                var t = n.decimal, e = n.thousands, r = n.grouping, i = n.currency, u = r && e ? function(n, t) {
                    for (var i = n.length, u = [], o = 0, a = r[0], l = 0; 0 < i && 0 < a && (t < l + a + 1 && (a = Math.max(1, t - l)), 
                    u.push(n.substring(i -= a, i + a)), !((l += a + 1) > t)); ) a = r[o = (o + 1) % r.length];
                    return u.reverse().join(e);
                } : m;
                return function(n) {
                    var e = Io.exec(n), r = e[1] || " ", o = e[2] || ">", a = e[3] || "-", l = e[4] || "", c = e[5], f = +e[6], s = e[7], h = e[8], p = e[9], g = 1, v = "", d = "", y = !1, m = !0;
                    switch (h && (h = +h.substring(1)), (c || "0" === r && "=" === o) && (c = r = "0", 
                    o = "="), p) {
                      case "n":
                        s = !0, p = "g";
                        break;

                      case "%":
                        g = 100, d = "%", p = "f";
                        break;

                      case "p":
                        g = 100, d = "%", p = "r";
                        break;

                      case "b":
                      case "o":
                      case "x":
                      case "X":
                        "#" === l && (v = "0" + p.toLowerCase());

                      case "c":
                        m = !1;

                      case "d":
                        y = !0, h = 0;
                        break;

                      case "s":
                        g = -1, p = "r";
                    }
                    "$" === l && (v = i[0], d = i[1]), "r" != p || h || (p = "g"), null != h && ("g" == p ? h = Math.max(1, Math.min(21, h)) : "e" != p && "f" != p || (h = Math.max(0, Math.min(20, h)))), 
                    p = Yo.get(p) || jn;
                    var M = c && s;
                    return function(n) {
                        var e = d;
                        if (y && n % 1) return "";
                        var i = n < 0 || 0 === n && 1 / n < 0 ? (n = -n, "-") : "-" === a ? "" : a;
                        if (g < 0) {
                            var l = Ou.formatPrefix(n, h);
                            n = l.scale(n), e = l.symbol + d;
                        } else n *= g;
                        var x, b, _ = (n = p(n, h)).lastIndexOf(".");
                        if (_ < 0) {
                            var w = m ? n.lastIndexOf("e") : -1;
                            b = w < 0 ? (x = n, "") : (x = n.substring(0, w), n.substring(w));
                        } else x = n.substring(0, _), b = t + n.substring(_ + 1);
                        !c && s && (x = u(x, 1 / 0));
                        var S = v.length + x.length + b.length + (M ? 0 : i.length), k = S < f ? new Array(S = f - S + 1).join(r) : "";
                        return M && (x = u(k + x, k.length ? f - b.length : 1 / 0)), i += v, n = x + b, 
                        ("<" === o ? i + n + k : ">" === o ? k + i + n : "^" === o ? k.substring(0, S >>= 1) + i + n + k.substring(S) : i + (M ? n : k + n)) + e;
                    };
                };
            }(n),
            timeFormat: function(n) {
                function t(n) {
                    function t(t) {
                        for (var e, i, u, o = [], a = -1, l = 0; ++a < r; ) 37 === n.charCodeAt(a) && (o.push(n.slice(l, a)), 
                        null != (i = $o[e = n.charAt(++a)]) && (e = n.charAt(++a)), (u = x[e]) && (e = u(t, null == i ? "e" === e ? " " : "0" : i)), 
                        o.push(e), l = a + 1);
                        return o.push(n.slice(l, a)), o.join("");
                    }
                    var r = n.length;
                    return t.parse = function(t) {
                        var r = {
                            y: 1900,
                            m: 0,
                            d: 1,
                            H: 0,
                            M: 0,
                            S: 0,
                            L: 0,
                            Z: null
                        };
                        if (e(r, n, t, 0) != t.length) return null;
                        "p" in r && (r.H = r.H % 12 + 12 * r.p);
                        var i = null != r.Z && Vo !== Fn, u = new (i ? Fn : Vo)();
                        return "j" in r ? u.setFullYear(r.y, 0, r.j) : "W" in r || "U" in r ? ("w" in r || (r.w = "W" in r ? 1 : 0), 
                        u.setFullYear(r.y, 0, 1), u.setFullYear(r.y, 0, "W" in r ? (r.w + 6) % 7 + 7 * r.W - (u.getDay() + 5) % 7 : r.w + 7 * r.U - (u.getDay() + 6) % 7)) : u.setFullYear(r.y, r.m, r.d), 
                        u.setHours(r.H + (r.Z / 100 | 0), r.M + r.Z % 100, r.S, r.L), i ? u._ : u;
                    }, t.toString = function() {
                        return n;
                    }, t;
                }
                function e(n, t, e, r) {
                    for (var i, u, o, a = 0, l = t.length, c = e.length; a < l; ) {
                        if (c <= r) return -1;
                        if (37 === (i = t.charCodeAt(a++))) {
                            if (o = t.charAt(a++), !(u = b[o in $o ? t.charAt(a++) : o]) || (r = u(n, e, r)) < 0) return -1;
                        } else if (i != e.charCodeAt(r++)) return -1;
                    }
                    return r;
                }
                var r = n.dateTime, i = n.date, u = n.time, o = n.periods, a = n.days, l = n.shortDays, c = n.months, f = n.shortMonths;
                t.multi = (t.utc = function(n) {
                    function e(n) {
                        try {
                            var t = new (Vo = Fn)();
                            return t._ = n, r(t);
                        } finally {
                            Vo = Date;
                        }
                    }
                    var r = t(n);
                    return e.parse = function(n) {
                        try {
                            Vo = Fn;
                            var t = r.parse(n);
                            return t && t._;
                        } finally {
                            Vo = Date;
                        }
                    }, e.toString = r.toString, e;
                }).multi = lt;
                var s = Ou.map(), h = Zn(a), p = Vn(a), g = Zn(l), v = Vn(l), d = Zn(c), y = Vn(c), m = Zn(f), M = Vn(f);
                o.forEach(function(n, t) {
                    s.set(n.toLowerCase(), t);
                });
                var x = {
                    a: function(n) {
                        return l[n.getDay()];
                    },
                    A: function(n) {
                        return a[n.getDay()];
                    },
                    b: function(n) {
                        return f[n.getMonth()];
                    },
                    B: function(n) {
                        return c[n.getMonth()];
                    },
                    c: t(r),
                    d: function(n, t) {
                        return Yn(n.getDate(), t, 2);
                    },
                    e: function(n, t) {
                        return Yn(n.getDate(), t, 2);
                    },
                    H: function(n, t) {
                        return Yn(n.getHours(), t, 2);
                    },
                    I: function(n, t) {
                        return Yn(n.getHours() % 12 || 12, t, 2);
                    },
                    j: function(n, t) {
                        return Yn(1 + Zo.dayOfYear(n), t, 3);
                    },
                    L: function(n, t) {
                        return Yn(n.getMilliseconds(), t, 3);
                    },
                    m: function(n, t) {
                        return Yn(n.getMonth() + 1, t, 2);
                    },
                    M: function(n, t) {
                        return Yn(n.getMinutes(), t, 2);
                    },
                    p: function(n) {
                        return o[+(12 <= n.getHours())];
                    },
                    S: function(n, t) {
                        return Yn(n.getSeconds(), t, 2);
                    },
                    U: function(n, t) {
                        return Yn(Zo.sundayOfYear(n), t, 2);
                    },
                    w: function(n) {
                        return n.getDay();
                    },
                    W: function(n, t) {
                        return Yn(Zo.mondayOfYear(n), t, 2);
                    },
                    x: t(i),
                    X: t(u),
                    y: function(n, t) {
                        return Yn(n.getFullYear() % 100, t, 2);
                    },
                    Y: function(n, t) {
                        return Yn(n.getFullYear() % 1e4, t, 4);
                    },
                    Z: ot,
                    "%": function() {
                        return "%";
                    }
                }, b = {
                    a: function(n, t, e) {
                        g.lastIndex = 0;
                        var r = g.exec(t.slice(e));
                        return r ? (n.w = v.get(r[0].toLowerCase()), e + r[0].length) : -1;
                    },
                    A: function(n, t, e) {
                        h.lastIndex = 0;
                        var r = h.exec(t.slice(e));
                        return r ? (n.w = p.get(r[0].toLowerCase()), e + r[0].length) : -1;
                    },
                    b: function(n, t, e) {
                        m.lastIndex = 0;
                        var r = m.exec(t.slice(e));
                        return r ? (n.m = M.get(r[0].toLowerCase()), e + r[0].length) : -1;
                    },
                    B: function(n, t, e) {
                        d.lastIndex = 0;
                        var r = d.exec(t.slice(e));
                        return r ? (n.m = y.get(r[0].toLowerCase()), e + r[0].length) : -1;
                    },
                    c: function(n, t, r) {
                        return e(n, x.c.toString(), t, r);
                    },
                    d: nt,
                    e: nt,
                    H: et,
                    I: et,
                    j: tt,
                    L: ut,
                    m: Qn,
                    M: rt,
                    p: function(n, t, e) {
                        var r = s.get(t.slice(e, e += 2).toLowerCase());
                        return null == r ? -1 : (n.p = r, e);
                    },
                    S: it,
                    U: $n,
                    w: Xn,
                    W: Bn,
                    x: function(n, t, r) {
                        return e(n, x.x.toString(), t, r);
                    },
                    X: function(n, t, r) {
                        return e(n, x.X.toString(), t, r);
                    },
                    y: Jn,
                    Y: Wn,
                    Z: Gn,
                    "%": at
                };
                return t;
            }(n)
        };
    };
    var Jo = Ou.locale({
        decimal: ".",
        thousands: ",",
        grouping: [ 3 ],
        currency: [ "$", "" ],
        dateTime: "%a %b %e %X %Y",
        date: "%m/%d/%Y",
        time: "%H:%M:%S",
        periods: [ "AM", "PM" ],
        days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
        shortDays: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
        months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        shortMonths: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
    });
    Ou.format = Jo.numberFormat, Ou.geo = {}, ct.prototype = {
        s: 0,
        t: 0,
        add: function(n) {
            ft(n, this.t, Go), ft(Go.s, this.s, this), this.s ? this.t += Go.t : this.s = Go.t;
        },
        reset: function() {
            this.s = this.t = 0;
        },
        valueOf: function() {
            return this.s;
        }
    };
    var Go = new ct();
    Ou.geo.stream = function(n, t) {
        n && Ko.hasOwnProperty(n.type) ? Ko[n.type](n, t) : st(n, t);
    };
    var Ko = {
        Feature: function(n, t) {
            st(n.geometry, t);
        },
        FeatureCollection: function(n, t) {
            for (var e = n.features, r = -1, i = e.length; ++r < i; ) st(e[r].geometry, t);
        }
    }, Qo = {
        Sphere: function(n, t) {
            t.sphere();
        },
        Point: function(n, t) {
            n = n.coordinates, t.point(n[0], n[1], n[2]);
        },
        MultiPoint: function(n, t) {
            for (var e = n.coordinates, r = -1, i = e.length; ++r < i; ) n = e[r], t.point(n[0], n[1], n[2]);
        },
        LineString: function(n, t) {
            ht(n.coordinates, t, 0);
        },
        MultiLineString: function(n, t) {
            for (var e = n.coordinates, r = -1, i = e.length; ++r < i; ) ht(e[r], t, 0);
        },
        Polygon: function(n, t) {
            pt(n.coordinates, t);
        },
        MultiPolygon: function(n, t) {
            for (var e = n.coordinates, r = -1, i = e.length; ++r < i; ) pt(e[r], t);
        },
        GeometryCollection: function(n, t) {
            for (var e = n.geometries, r = -1, i = e.length; ++r < i; ) st(e[r], t);
        }
    };
    Ou.geo.area = function(n) {
        return na = 0, Ou.geo.stream(n, ea), na;
    };
    var na, ta = new ct(), ea = {
        sphere: function() {
            na += 4 * yo;
        },
        point: b,
        lineStart: b,
        lineEnd: b,
        polygonStart: function() {
            ta.reset(), ea.lineStart = gt;
        },
        polygonEnd: function() {
            var n = 2 * ta;
            na += n < 0 ? 4 * yo + n : n, ea.lineStart = ea.lineEnd = ea.point = b;
        }
    };
    Ou.geo.bounds = function() {
        function n(n, t) {
            M.push(x = [ f = n, h = n ]), t < s && (s = t), p < t && (p = t);
        }
        function t(t, e) {
            var r = vt([ t * bo, e * bo ]);
            if (y) {
                var i = yt(y, r), u = yt([ i[1], -i[0], 0 ], i);
                xt(u), u = bt(u);
                var o = t - g, l = 0 < o ? 1 : -1, c = u[0] * _o * l, v = 180 < Gu(o);
                if (v ^ (l * g < c && c < l * t)) (d = u[1] * _o) > p && (p = d); else if (v ^ (l * g < (c = (c + 360) % 360 - 180) && c < l * t)) {
                    var d = -u[1] * _o;
                    d < s && (s = d);
                } else e < s && (s = e), p < e && (p = e);
                v ? t < g ? a(f, t) > a(f, h) && (h = t) : a(t, h) > a(f, h) && (f = t) : f <= h ? (t < f && (f = t), 
                h < t && (h = t)) : g < t ? a(f, t) > a(f, h) && (h = t) : a(t, h) > a(f, h) && (f = t);
            } else n(t, e);
            y = r, g = t;
        }
        function e() {
            b.point = t;
        }
        function r() {
            x[0] = f, x[1] = h, b.point = n, y = null;
        }
        function i(n, e) {
            if (y) {
                var r = n - g;
                m += 180 < Gu(r) ? r + (0 < r ? 360 : -360) : r;
            } else v = n, d = e;
            ea.point(n, e), t(n, e);
        }
        function u() {
            ea.lineStart();
        }
        function o() {
            i(v, d), ea.lineEnd(), Gu(m) > go && (f = -(h = 180)), x[0] = f, x[1] = h, y = null;
        }
        function a(n, t) {
            return (t -= n) < 0 ? t + 360 : t;
        }
        function l(n, t) {
            return n[0] - t[0];
        }
        function c(n, t) {
            return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n;
        }
        var f, s, h, p, g, v, d, y, m, M, x, b = {
            point: n,
            lineStart: e,
            lineEnd: r,
            polygonStart: function() {
                b.point = i, b.lineStart = u, b.lineEnd = o, m = 0, ea.polygonStart();
            },
            polygonEnd: function() {
                ea.polygonEnd(), b.point = n, b.lineStart = e, b.lineEnd = r, ta < 0 ? (f = -(h = 180), 
                s = -(p = 90)) : go < m ? p = 90 : m < -go && (s = -90), x[0] = f, x[1] = h;
            }
        };
        return function(n) {
            p = h = -(f = s = 1 / 0), M = [], Ou.geo.stream(n, b);
            var t = M.length;
            if (t) {
                M.sort(l);
                for (var e = 1, r = [ g = M[0] ]; e < t; ++e) c((u = M[e])[0], g) || c(u[1], g) ? (a(g[0], u[1]) > a(g[0], g[1]) && (g[1] = u[1]), 
                a(u[0], g[1]) > a(g[0], g[1]) && (g[0] = u[0])) : r.push(g = u);
                for (var i, u, o = -1 / 0, g = (e = 0, r[t = r.length - 1]); e <= t; g = u, ++e) u = r[e], 
                (i = a(g[1], u[0])) > o && (o = i, f = u[0], h = g[1]);
            }
            return M = x = null, f === 1 / 0 || s === 1 / 0 ? [ [ NaN, NaN ], [ NaN, NaN ] ] : [ [ f, s ], [ h, p ] ];
        };
    }(), Ou.geo.centroid = function(n) {
        ra = ia = ua = oa = aa = la = ca = fa = sa = ha = pa = 0, Ou.geo.stream(n, ga);
        var t = sa, e = ha, r = pa, i = t * t + e * e + r * r;
        return i < vo && (t = la, e = ca, r = fa, ia < go && (t = ua, e = oa, r = aa), (i = t * t + e * e + r * r) < vo) ? [ NaN, NaN ] : [ Math.atan2(e, t) * _o, tn(r / Math.sqrt(i)) * _o ];
    };
    var ra, ia, ua, oa, aa, la, ca, fa, sa, ha, pa, ga = {
        sphere: b,
        point: wt,
        lineStart: kt,
        lineEnd: Nt,
        polygonStart: function() {
            ga.lineStart = Et;
        },
        polygonEnd: function() {
            ga.lineStart = kt;
        }
    }, va = Tt(Ct, function(n) {
        var t, e = NaN, r = NaN, i = NaN;
        return {
            lineStart: function() {
                n.lineStart(), t = 1;
            },
            point: function(u, o) {
                var a = 0 < u ? yo : -yo, l = Gu(u - e);
                Gu(l - yo) < go ? (n.point(e, r = 0 < (r + o) / 2 ? xo : -xo), n.point(i, r), n.lineEnd(), 
                n.lineStart(), n.point(a, r), n.point(u, r), t = 0) : i !== a && yo <= l && (Gu(e - i) < go && (e -= i * go), 
                Gu(u - a) < go && (u -= a * go), r = function(n, t, e, r) {
                    var i, u, o = Math.sin(n - e);
                    return Gu(o) > go ? Math.atan((Math.sin(t) * (u = Math.cos(r)) * Math.sin(e) - Math.sin(r) * (i = Math.cos(t)) * Math.sin(n)) / (i * u * o)) : (t + r) / 2;
                }(e, r, u, o), n.point(i, r), n.lineEnd(), n.lineStart(), n.point(a, r), t = 0), 
                n.point(e = u, r = o), i = a;
            },
            lineEnd: function() {
                n.lineEnd(), e = r = NaN;
            },
            clean: function() {
                return 2 - t;
            }
        };
    }, function(n, t, e, r) {
        var i;
        if (null == n) i = e * xo, r.point(-yo, i), r.point(0, i), r.point(yo, i), r.point(yo, 0), 
        r.point(yo, -i), r.point(0, -i), r.point(-yo, -i), r.point(-yo, 0), r.point(-yo, i); else if (Gu(n[0] - t[0]) > go) {
            var u = n[0] < t[0] ? yo : -yo;
            i = e * u / 2, r.point(-u, i), r.point(0, i), r.point(u, i);
        } else r.point(t[0], t[1]);
    }, [ -yo, -yo / 2 ]), da = 1e9;
    Ou.geo.clipExtent = function() {
        var n, t, e, r, i, u, o = {
            stream: function(n) {
                return i && (i.valid = !1), (i = u(n)).valid = !0, i;
            },
            extent: function(a) {
                return arguments.length ? (u = Ot(n = +a[0][0], t = +a[0][1], e = +a[1][0], r = +a[1][1]), 
                i && (i.valid = !1, i = null), o) : [ [ n, t ], [ e, r ] ];
            }
        };
        return o.extent([ [ 0, 0 ], [ 960, 500 ] ]);
    }, (Ou.geo.conicEqualArea = function() {
        return It(Yt);
    }).raw = Yt, Ou.geo.albers = function() {
        return Ou.geo.conicEqualArea().rotate([ 96, 0 ]).center([ -.6, 38.7 ]).parallels([ 29.5, 45.5 ]).scale(1070);
    }, Ou.geo.albersUsa = function() {
        function n(n) {
            var u = n[0], o = n[1];
            return t = null, e(u, o), t || (r(u, o), t) || i(u, o), t;
        }
        var t, e, r, i, u = Ou.geo.albers(), o = Ou.geo.conicEqualArea().rotate([ 154, 0 ]).center([ -2, 58.5 ]).parallels([ 55, 65 ]), a = Ou.geo.conicEqualArea().rotate([ 157, 0 ]).center([ -3, 19.9 ]).parallels([ 8, 18 ]), l = {
            point: function(n, e) {
                t = [ n, e ];
            }
        };
        return n.invert = function(n) {
            var t = u.scale(), e = u.translate(), r = (n[0] - e[0]) / t, i = (n[1] - e[1]) / t;
            return (.12 <= i && i < .234 && -.425 <= r && r < -.214 ? o : .166 <= i && i < .234 && -.214 <= r && r < -.115 ? a : u).invert(n);
        }, n.stream = function(n) {
            var t = u.stream(n), e = o.stream(n), r = a.stream(n);
            return {
                point: function(n, i) {
                    t.point(n, i), e.point(n, i), r.point(n, i);
                },
                sphere: function() {
                    t.sphere(), e.sphere(), r.sphere();
                },
                lineStart: function() {
                    t.lineStart(), e.lineStart(), r.lineStart();
                },
                lineEnd: function() {
                    t.lineEnd(), e.lineEnd(), r.lineEnd();
                },
                polygonStart: function() {
                    t.polygonStart(), e.polygonStart(), r.polygonStart();
                },
                polygonEnd: function() {
                    t.polygonEnd(), e.polygonEnd(), r.polygonEnd();
                }
            };
        }, n.precision = function(t) {
            return arguments.length ? (u.precision(t), o.precision(t), a.precision(t), n) : u.precision();
        }, n.scale = function(t) {
            return arguments.length ? (u.scale(t), o.scale(.35 * t), a.scale(t), n.translate(u.translate())) : u.scale();
        }, n.translate = function(t) {
            if (!arguments.length) return u.translate();
            var c = u.scale(), f = +t[0], s = +t[1];
            return e = u.translate(t).clipExtent([ [ f - .455 * c, s - .238 * c ], [ f + .455 * c, s + .238 * c ] ]).stream(l).point, 
            r = o.translate([ f - .307 * c, s + .201 * c ]).clipExtent([ [ f - .425 * c + go, s + .12 * c + go ], [ f - .214 * c - go, s + .234 * c - go ] ]).stream(l).point, 
            i = a.translate([ f - .205 * c, s + .212 * c ]).clipExtent([ [ f - .214 * c + go, s + .166 * c + go ], [ f - .115 * c - go, s + .234 * c - go ] ]).stream(l).point, 
            n;
        }, n.scale(1070);
    };
    var ya, ma, Ma, xa, ba, _a, wa = {
        point: b,
        lineStart: b,
        lineEnd: b,
        polygonStart: function() {
            ma = 0, wa.lineStart = Zt;
        },
        polygonEnd: function() {
            wa.lineStart = wa.lineEnd = wa.point = b, ya += Gu(ma / 2);
        }
    }, Sa = {
        point: function(n, t) {
            n < Ma && (Ma = n), ba < n && (ba = n), t < xa && (xa = t), _a < t && (_a = t);
        },
        lineStart: b,
        lineEnd: b,
        polygonStart: b,
        polygonEnd: b
    }, ka = {
        point: $t,
        lineStart: Bt,
        lineEnd: Wt,
        polygonStart: function() {
            ka.lineStart = Jt;
        },
        polygonEnd: function() {
            ka.point = $t, ka.lineStart = Bt, ka.lineEnd = Wt;
        }
    };
    Ou.geo.path = function() {
        function n(n) {
            return n && ("function" == typeof a && u.pointRadius(+a.apply(this, arguments)), 
            o && o.valid || (o = i(u)), Ou.geo.stream(n, o)), u.result();
        }
        function t() {
            return o = null, n;
        }
        var e, r, i, u, o, a = 4.5;
        return n.area = function(n) {
            return ya = 0, Ou.geo.stream(n, i(wa)), ya;
        }, n.centroid = function(n) {
            return ua = oa = aa = la = ca = fa = sa = ha = pa = 0, Ou.geo.stream(n, i(ka)), 
            pa ? [ sa / pa, ha / pa ] : fa ? [ la / fa, ca / fa ] : aa ? [ ua / aa, oa / aa ] : [ NaN, NaN ];
        }, n.bounds = function(n) {
            return ba = _a = -(Ma = xa = 1 / 0), Ou.geo.stream(n, i(Sa)), [ [ Ma, xa ], [ ba, _a ] ];
        }, n.projection = function(n) {
            return arguments.length ? (i = (e = n) ? n.stream || function(n) {
                var t = Kt(function(t, e) {
                    return n([ t * _o, e * _o ]);
                });
                return function(n) {
                    return ie(t(n));
                };
            }(n) : m, t()) : e;
        }, n.context = function(n) {
            return arguments.length ? (u = null == (r = n) ? new Vt() : new Gt(n), "function" != typeof a && u.pointRadius(a), 
            t()) : r;
        }, n.pointRadius = function(t) {
            return arguments.length ? (a = "function" == typeof t ? t : (u.pointRadius(+t), 
            +t), n) : a;
        }, n.projection(Ou.geo.albersUsa()).context(null);
    }, Ou.geo.transform = function(n) {
        return {
            stream: function(t) {
                var e = new ne(t);
                for (var r in n) e[r] = n[r];
                return e;
            }
        };
    }, ne.prototype = {
        point: function(n, t) {
            this.stream.point(n, t);
        },
        sphere: function() {
            this.stream.sphere();
        },
        lineStart: function() {
            this.stream.lineStart();
        },
        lineEnd: function() {
            this.stream.lineEnd();
        },
        polygonStart: function() {
            this.stream.polygonStart();
        },
        polygonEnd: function() {
            this.stream.polygonEnd();
        }
    }, Ou.geo.projection = ee, Ou.geo.projectionMutator = re, (Ou.geo.equirectangular = function() {
        return ee(ue);
    }).raw = ue.invert = ue, Ou.geo.rotation = function(n) {
        function t(t) {
            return (t = n(t[0] * bo, t[1] * bo))[0] *= _o, t[1] *= _o, t;
        }
        return n = ae(n[0] % 360 * bo, n[1] * bo, 2 < n.length ? n[2] * bo : 0), t.invert = function(t) {
            return (t = n.invert(t[0] * bo, t[1] * bo))[0] *= _o, t[1] *= _o, t;
        }, t;
    }, oe.invert = ue, Ou.geo.circle = function() {
        function n() {
            var n = "function" == typeof r ? r.apply(this, arguments) : r, t = ae(-n[0] * bo, -n[1] * bo, 0).invert, i = [];
            return e(null, null, 1, {
                point: function(n, e) {
                    i.push(n = t(n, e)), n[0] *= _o, n[1] *= _o;
                }
            }), {
                type: "Polygon",
                coordinates: [ i ]
            };
        }
        var t, e, r = [ 0, 0 ], i = 6;
        return n.origin = function(t) {
            return arguments.length ? (r = t, n) : r;
        }, n.angle = function(r) {
            return arguments.length ? (e = se((t = +r) * bo, i * bo), n) : t;
        }, n.precision = function(r) {
            return arguments.length ? (e = se(t * bo, (i = +r) * bo), n) : i;
        }, n.angle(90);
    }, Ou.geo.distance = function(n, t) {
        var e, r = (t[0] - n[0]) * bo, i = n[1] * bo, u = t[1] * bo, o = Math.sin(r), a = Math.cos(r), l = Math.sin(i), c = Math.cos(i), f = Math.sin(u), s = Math.cos(u);
        return Math.atan2(Math.sqrt((e = s * o) * e + (e = c * f - l * s * a) * e), l * f + c * s * a);
    }, Ou.geo.graticule = function() {
        function n() {
            return {
                type: "MultiLineString",
                coordinates: t()
            };
        }
        function t() {
            return Ou.range(Math.ceil(u / d) * d, i, d).map(h).concat(Ou.range(Math.ceil(c / y) * y, l, y).map(p)).concat(Ou.range(Math.ceil(r / g) * g, e, g).filter(function(n) {
                return Gu(n % d) > go;
            }).map(f)).concat(Ou.range(Math.ceil(a / v) * v, o, v).filter(function(n) {
                return Gu(n % y) > go;
            }).map(s));
        }
        var e, r, i, u, o, a, l, c, f, s, h, p, g = 10, v = g, d = 90, y = 360, m = 2.5;
        return n.lines = function() {
            return t().map(function(n) {
                return {
                    type: "LineString",
                    coordinates: n
                };
            });
        }, n.outline = function() {
            return {
                type: "Polygon",
                coordinates: [ h(u).concat(p(l).slice(1), h(i).reverse().slice(1), p(c).reverse().slice(1)) ]
            };
        }, n.extent = function(t) {
            return arguments.length ? n.majorExtent(t).minorExtent(t) : n.minorExtent();
        }, n.majorExtent = function(t) {
            return arguments.length ? (u = +t[0][0], i = +t[1][0], c = +t[0][1], l = +t[1][1], 
            i < u && (t = u, u = i, i = t), l < c && (t = c, c = l, l = t), n.precision(m)) : [ [ u, c ], [ i, l ] ];
        }, n.minorExtent = function(t) {
            return arguments.length ? (r = +t[0][0], e = +t[1][0], a = +t[0][1], o = +t[1][1], 
            e < r && (t = r, r = e, e = t), o < a && (t = a, a = o, o = t), n.precision(m)) : [ [ r, a ], [ e, o ] ];
        }, n.step = function(t) {
            return arguments.length ? n.majorStep(t).minorStep(t) : n.minorStep();
        }, n.majorStep = function(t) {
            return arguments.length ? (d = +t[0], y = +t[1], n) : [ d, y ];
        }, n.minorStep = function(t) {
            return arguments.length ? (g = +t[0], v = +t[1], n) : [ g, v ];
        }, n.precision = function(t) {
            return arguments.length ? (m = +t, f = pe(a, o, 90), s = ge(r, e, m), h = pe(c, l, 90), 
            p = ge(u, i, m), n) : m;
        }, n.majorExtent([ [ -180, -90 + go ], [ 180, 90 - go ] ]).minorExtent([ [ -180, -80 - go ], [ 180, 80 + go ] ]);
    }, Ou.geo.greatArc = function() {
        function n() {
            return {
                type: "LineString",
                coordinates: [ t || r.apply(this, arguments), e || i.apply(this, arguments) ]
            };
        }
        var t, e, r = ve, i = de;
        return n.distance = function() {
            return Ou.geo.distance(t || r.apply(this, arguments), e || i.apply(this, arguments));
        }, n.source = function(e) {
            return arguments.length ? (t = "function" == typeof (r = e) ? null : e, n) : r;
        }, n.target = function(t) {
            return arguments.length ? (e = "function" == typeof (i = t) ? null : t, n) : i;
        }, n.precision = function() {
            return arguments.length ? n : 0;
        }, n;
    }, Ou.geo.interpolate = function(n, t) {
        return function(n, t, e, r) {
            var i = Math.cos(t), u = Math.sin(t), o = Math.cos(r), a = Math.sin(r), l = i * Math.cos(n), c = i * Math.sin(n), f = o * Math.cos(e), s = o * Math.sin(e), h = 2 * Math.asin(Math.sqrt(on(r - t) + i * o * on(e - n))), p = 1 / Math.sin(h), g = h ? function(n) {
                var t = Math.sin(n *= h) * p, e = Math.sin(h - n) * p, r = e * l + t * f, i = e * c + t * s, o = e * u + t * a;
                return [ Math.atan2(i, r) * _o, Math.atan2(o, Math.sqrt(r * r + i * i)) * _o ];
            } : function() {
                return [ n * _o, t * _o ];
            };
            return g.distance = h, g;
        }(n[0] * bo, n[1] * bo, t[0] * bo, t[1] * bo);
    }, Ou.geo.length = function(n) {
        return Na = 0, Ou.geo.stream(n, Ea), Na;
    };
    var Na, Ea = {
        sphere: b,
        point: b,
        lineStart: function() {
            function n(n, i) {
                var u = Math.sin(i *= bo), o = Math.cos(i), a = Gu((n *= bo) - t), l = Math.cos(a);
                Na += Math.atan2(Math.sqrt((a = o * Math.sin(a)) * a + (a = r * u - e * o * l) * a), e * u + r * o * l), 
                t = n, e = u, r = o;
            }
            var t, e, r;
            Ea.point = function(i, u) {
                t = i * bo, e = Math.sin(u *= bo), r = Math.cos(u), Ea.point = n;
            }, Ea.lineEnd = function() {
                Ea.point = Ea.lineEnd = b;
            };
        },
        lineEnd: b,
        polygonStart: b,
        polygonEnd: b
    }, Aa = me(function(n) {
        return Math.sqrt(2 / (1 + n));
    }, function(n) {
        return 2 * Math.asin(n / 2);
    });
    (Ou.geo.azimuthalEqualArea = function() {
        return ee(Aa);
    }).raw = Aa;
    var Ca = me(function(n) {
        var t = Math.acos(n);
        return t && t / Math.sin(t);
    }, m);
    (Ou.geo.azimuthalEquidistant = function() {
        return ee(Ca);
    }).raw = Ca, (Ou.geo.conicConformal = function() {
        return It(Me);
    }).raw = Me, (Ou.geo.conicEquidistant = function() {
        return It(xe);
    }).raw = xe;
    var za = me(function(n) {
        return 1 / n;
    }, Math.atan);
    (Ou.geo.gnomonic = function() {
        return ee(za);
    }).raw = za, be.invert = function(n, t) {
        return [ n, 2 * Math.atan(Math.exp(t)) - xo ];
    }, (Ou.geo.mercator = function() {
        return _e(be);
    }).raw = be;
    var La = me(function() {
        return 1;
    }, Math.asin);
    (Ou.geo.orthographic = function() {
        return ee(La);
    }).raw = La;
    var qa = me(function(n) {
        return 1 / (1 + n);
    }, function(n) {
        return 2 * Math.atan(n);
    });
    (Ou.geo.stereographic = function() {
        return ee(qa);
    }).raw = qa, we.invert = function(n, t) {
        return [ -t, 2 * Math.atan(Math.exp(n)) - xo ];
    }, (Ou.geo.transverseMercator = function() {
        var n = _e(we), t = n.center, e = n.rotate;
        return n.center = function(n) {
            return n ? t([ -n[1], n[0] ]) : [ (n = t())[1], -n[0] ];
        }, n.rotate = function(n) {
            return n ? e([ n[0], n[1], 2 < n.length ? n[2] + 90 : 90 ]) : [ (n = e())[0], n[1], n[2] - 90 ];
        }, e([ 0, 0, 90 ]);
    }).raw = we, Ou.geom = {}, Ou.geom.hull = function(n) {
        function t(n) {
            if (n.length < 3) return [];
            var t, i = En(e), u = En(r), o = n.length, a = [], l = [];
            for (t = 0; t < o; t++) a.push([ +i.call(this, n[t], t), +u.call(this, n[t], t), t ]);
            for (a.sort(Ee), t = 0; t < o; t++) l.push([ a[t][0], -a[t][1] ]);
            var c = Ne(a), f = Ne(l), s = f[0] === c[0], h = f[f.length - 1] === c[c.length - 1], p = [];
            for (t = c.length - 1; 0 <= t; --t) p.push(n[a[c[t]][2]]);
            for (t = +s; t < f.length - h; ++t) p.push(n[a[f[t]][2]]);
            return p;
        }
        var e = Se, r = ke;
        return arguments.length ? t(n) : (t.x = function(n) {
            return arguments.length ? (e = n, t) : e;
        }, t.y = function(n) {
            return arguments.length ? (r = n, t) : r;
        }, t);
    }, Ou.geom.polygon = function(n) {
        return eo(n, Ta), n;
    };
    var Ta = Ou.geom.polygon.prototype = [];
    Ta.area = function() {
        for (var n, t = -1, e = this.length, r = this[e - 1], i = 0; ++t < e; ) n = r, r = this[t], 
        i += n[1] * r[0] - n[0] * r[1];
        return .5 * i;
    }, Ta.centroid = function(n) {
        var t, e, r = -1, i = this.length, u = 0, o = 0, a = this[i - 1];
        for (arguments.length || (n = -1 / (6 * this.area())); ++r < i; ) t = a, a = this[r], 
        e = t[0] * a[1] - a[0] * t[1], u += (t[0] + a[0]) * e, o += (t[1] + a[1]) * e;
        return [ u * n, o * n ];
    }, Ta.clip = function(n) {
        for (var t, e, r, i, u, o, a = ze(n), l = -1, c = this.length - ze(this), f = this[c - 1]; ++l < c; ) {
            for (t = n.slice(), n.length = 0, i = this[l], u = t[(r = t.length - a) - 1], e = -1; ++e < r; ) Ae(o = t[e], f, i) ? (Ae(u, f, i) || n.push(Ce(u, o, f, i)), 
            n.push(o)) : Ae(u, f, i) && n.push(Ce(u, o, f, i)), u = o;
            a && n.push(n[0]), f = i;
        }
        return n;
    };
    var Ra, Da, Pa, Ua, ja, Fa = [], Ha = [];
    je.prototype.prepare = function() {
        for (var n, t = this.edges, e = t.length; e--; ) (n = t[e].edge).b && n.a || t.splice(e, 1);
        return t.sort(He), t.length;
    }, Je.prototype = {
        start: function() {
            return this.edge.l === this.site ? this.edge.a : this.edge.b;
        },
        end: function() {
            return this.edge.l === this.site ? this.edge.b : this.edge.a;
        }
    }, Ge.prototype = {
        insert: function(n, t) {
            var e, r, i;
            if (n) {
                if (t.P = n, t.N = n.N, n.N && (n.N.P = t), n.N = t, n.R) {
                    for (n = n.R; n.L; ) n = n.L;
                    n.L = t;
                } else n.R = t;
                e = n;
            } else e = this._ ? (n = tr(this._), t.P = null, (t.N = n).P = n.L = t, n) : (t.P = t.N = null, 
            this._ = t, null);
            for (t.L = t.R = null, t.U = e, t.C = !0, n = t; e && e.C; ) e === (r = e.U).L ? (i = r.R) && i.C ? (e.C = i.C = !1, 
            r.C = !0, n = r) : (n === e.R && (Qe(this, e), e = (n = e).U), e.C = !1, r.C = !0, 
            nr(this, r)) : (i = r.L) && i.C ? (e.C = i.C = !1, r.C = !0, n = r) : (n === e.L && (nr(this, e), 
            e = (n = e).U), e.C = !1, r.C = !0, Qe(this, r)), e = n.U;
            this._.C = !1;
        },
        remove: function(n) {
            n.N && (n.N.P = n.P), n.P && (n.P.N = n.N), n.N = n.P = null;
            var t, e, r, i = n.U, u = n.L, o = n.R;
            if (e = u ? o ? tr(o) : u : o, i ? i.L === n ? i.L = e : i.R = e : this._ = e, u && o ? (r = e.C, 
            e.C = n.C, ((e.L = u).U = e) !== o ? (i = e.U, e.U = n.U, n = e.R, i.L = n, (e.R = o).U = e) : (e.U = i, 
            n = (i = e).R)) : (r = n.C, n = e), n && (n.U = i), !r) if (n && n.C) n.C = !1; else {
                do {
                    if (n === this._) break;
                    if (n === i.L) {
                        if ((t = i.R).C && (t.C = !1, i.C = !0, Qe(this, i), t = i.R), t.L && t.L.C || t.R && t.R.C) {
                            t.R && t.R.C || (t.L.C = !1, t.C = !0, nr(this, t), t = i.R), t.C = i.C, i.C = t.R.C = !1, 
                            Qe(this, i), n = this._;
                            break;
                        }
                    } else if ((t = i.L).C && (t.C = !1, i.C = !0, nr(this, i), t = i.L), t.L && t.L.C || t.R && t.R.C) {
                        t.L && t.L.C || (t.R.C = !1, t.C = !0, Qe(this, t), t = i.L), t.C = i.C, i.C = t.L.C = !1, 
                        nr(this, i), n = this._;
                        break;
                    }
                    t.C = !0, i = (n = i).U;
                } while (!n.C);
                n && (n.C = !1);
            }
        }
    }, Ou.geom.voronoi = function(n) {
        function t(n) {
            var t = new Array(n.length), r = a[0][0], i = a[0][1], u = a[1][0], o = a[1][1];
            return er(e(n), a).cells.forEach(function(e, a) {
                var l = e.edges, c = e.site;
                (t[a] = l.length ? l.map(function(n) {
                    var t = n.start();
                    return [ t.x, t.y ];
                }) : c.x >= r && c.x <= u && c.y >= i && c.y <= o ? [ [ r, o ], [ u, o ], [ u, i ], [ r, i ] ] : []).point = n[a];
            }), t;
        }
        function e(n) {
            return n.map(function(n, t) {
                return {
                    x: Math.round(u(n, t) / go) * go,
                    y: Math.round(o(n, t) / go) * go,
                    i: t
                };
            });
        }
        var r = Se, i = ke, u = r, o = i, a = Oa;
        return n ? t(n) : (t.links = function(n) {
            return er(e(n)).edges.filter(function(n) {
                return n.l && n.r;
            }).map(function(t) {
                return {
                    source: n[t.l.i],
                    target: n[t.r.i]
                };
            });
        }, t.triangles = function(n) {
            var t = [];
            return er(e(n)).cells.forEach(function(e, r) {
                for (var i, u = e.site, o = e.edges.sort(He), a = -1, l = o.length, c = o[l - 1].edge, f = c.l === u ? c.r : c.l; ++a < l; ) i = f, 
                f = (c = o[a].edge).l === u ? c.r : c.l, r < i.i && r < f.i && ir(u, i, f) < 0 && t.push([ n[r], n[i.i], n[f.i] ]);
            }), t;
        }, t.x = function(n) {
            return arguments.length ? (u = En(r = n), t) : r;
        }, t.y = function(n) {
            return arguments.length ? (o = En(i = n), t) : i;
        }, t.clipExtent = function(n) {
            return arguments.length ? (a = null == n ? Oa : n, t) : a === Oa ? null : a;
        }, t.size = function(n) {
            return arguments.length ? t.clipExtent(n && [ [ 0, 0 ], n ]) : a === Oa ? null : a && a[1];
        }, t);
    };
    var Oa = [ [ -1e6, -1e6 ], [ 1e6, 1e6 ] ];
    Ou.geom.delaunay = function(n) {
        return Ou.geom.voronoi().triangles(n);
    }, Ou.geom.quadtree = function(n, t, e, r, i) {
        function u(n) {
            function u(n, t, e, r, i, u, o, a) {
                if (!isNaN(e) && !isNaN(r)) if (n.leaf) {
                    var l = n.x, f = n.y;
                    if (null != l) if (Gu(l - e) + Gu(f - r) < .01) c(n, t, e, r, i, u, o, a); else {
                        var s = n.point;
                        n.x = n.y = n.point = null, c(n, s, l, f, i, u, o, a), c(n, t, e, r, i, u, o, a);
                    } else n.x = e, n.y = r, n.point = t;
                } else c(n, t, e, r, i, u, o, a);
            }
            function c(n, t, e, r, i, o, a, l) {
                var c = .5 * (i + a), f = .5 * (o + l), s = c <= e, h = f <= r, p = h << 1 | s;
                n.leaf = !1, s ? i = c : a = c, h ? o = f : l = f, u(n = n.nodes[p] || (n.nodes[p] = {
                    leaf: !0,
                    nodes: [],
                    point: null,
                    x: null,
                    y: null
                }), t, e, r, i, o, a, l);
            }
            var f, s, h, p, g, v, d, y, m, M = En(a), x = En(l);
            if (null != t) v = t, d = e, y = r, m = i; else if (y = m = -(v = d = 1 / 0), s = [], 
            h = [], g = n.length, o) for (p = 0; p < g; ++p) (f = n[p]).x < v && (v = f.x), 
            f.y < d && (d = f.y), f.x > y && (y = f.x), f.y > m && (m = f.y), s.push(f.x), h.push(f.y); else for (p = 0; p < g; ++p) {
                var b = +M(f = n[p], p), _ = +x(f, p);
                b < v && (v = b), _ < d && (d = _), y < b && (y = b), m < _ && (m = _), s.push(b), 
                h.push(_);
            }
            var w = y - v, S = m - d;
            S < w ? m = d + w : y = v + S;
            var k = {
                leaf: !0,
                nodes: [],
                point: null,
                x: null,
                y: null,
                add: function(n) {
                    u(k, n, +M(n, ++p), +x(n, p), v, d, y, m);
                }
            };
            if (k.visit = function(n) {
                !function ar(n, t, e, r, i, u) {
                    if (!n(t, e, r, i, u)) {
                        var o = .5 * (e + i), a = .5 * (r + u), l = t.nodes;
                        l[0] && ar(n, l[0], e, r, o, a), l[1] && ar(n, l[1], o, r, i, a), l[2] && ar(n, l[2], e, a, o, u), 
                        l[3] && ar(n, l[3], o, a, i, u);
                    }
                }(n, k, v, d, y, m);
            }, k.find = function(n) {
                return function(n, t, e, r, i, u, o) {
                    var a, l = 1 / 0;
                    return function n(c, f, s, h, p) {
                        if (!(u < f || o < s || h < r || p < i)) {
                            if (g = c.point) {
                                var g, v = t - c.x, d = e - c.y, y = v * v + d * d;
                                if (y < l) {
                                    var m = Math.sqrt(l = y);
                                    r = t - m, i = e - m, u = t + m, o = e + m, a = g;
                                }
                            }
                            for (var M = c.nodes, x = .5 * (f + h), b = .5 * (s + p), _ = (b <= e) << 1 | x <= t, w = _ + 4; _ < w; ++_) if (c = M[3 & _]) switch (3 & _) {
                              case 0:
                                n(c, f, s, x, b);
                                break;

                              case 1:
                                n(c, x, s, h, b);
                                break;

                              case 2:
                                n(c, f, b, x, p);
                                break;

                              case 3:
                                n(c, x, b, h, p);
                            }
                        }
                    }(n, r, i, u, o), a;
                }(k, n[0], n[1], v, d, y, m);
            }, p = -1, null == t) {
                for (;++p < g; ) u(k, n[p], s[p], h[p], v, d, y, m);
                --p;
            } else n.forEach(k.add);
            return s = h = n = f = null, k;
        }
        var o, a = Se, l = ke;
        return (o = arguments.length) ? (a = ur, l = or, 3 === o && (i = e, r = t, e = t = 0), 
        u(n)) : (u.x = function(n) {
            return arguments.length ? (a = n, u) : a;
        }, u.y = function(n) {
            return arguments.length ? (l = n, u) : l;
        }, u.extent = function(n) {
            return arguments.length ? (null == n ? t = e = r = i = null : (t = +n[0][0], e = +n[0][1], 
            r = +n[1][0], i = +n[1][1]), u) : null == t ? null : [ [ t, e ], [ r, i ] ];
        }, u.size = function(n) {
            return arguments.length ? (null == n ? t = e = r = i = null : (t = e = 0, r = +n[0], 
            i = +n[1]), u) : null == t ? null : [ r - t, i - e ];
        }, u);
    }, Ou.interpolateRgb = cr, Ou.interpolateObject = fr, Ou.interpolateNumber = sr, 
    Ou.interpolateString = hr;
    var Ia = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ya = new RegExp(Ia.source, "g");
    Ou.interpolate = pr, Ou.interpolators = [ function(n, t) {
        var e = typeof t;
        return ("string" === e ? Do.has(t.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(t) ? cr : hr : t instanceof an ? cr : Array.isArray(t) ? gr : "object" === e && isNaN(t) ? fr : sr)(n, t);
    } ], Ou.interpolateArray = gr;
    var Za = function() {
        return m;
    }, Va = Ou.map({
        linear: Za,
        poly: function(n) {
            return function(t) {
                return Math.pow(t, n);
            };
        },
        quad: function() {
            return mr;
        },
        cubic: function() {
            return Mr;
        },
        sin: function() {
            return br;
        },
        exp: function() {
            return _r;
        },
        circle: function() {
            return wr;
        },
        elastic: function(n, t) {
            var e;
            return arguments.length < 2 && (t = .45), e = arguments.length ? t / mo * Math.asin(1 / n) : (n = 1, 
            t / 4), function(r) {
                return 1 + n * Math.pow(2, -10 * r) * Math.sin((r - e) * mo / t);
            };
        },
        back: function(n) {
            return n || (n = 1.70158), function(t) {
                return t * t * ((n + 1) * t - n);
            };
        },
        bounce: function() {
            return Sr;
        }
    }), Xa = Ou.map({
        in: m,
        out: dr,
        "in-out": yr,
        "out-in": function(n) {
            return yr(dr(n));
        }
    });
    Ou.ease = function(n) {
        var t = n.indexOf("-"), e = 0 <= t ? n.slice(0, t) : n, r = 0 <= t ? n.slice(t + 1) : "in";
        return e = Va.get(e) || Za, function(n) {
            return function(t) {
                return t <= 0 ? 0 : 1 <= t ? 1 : n(t);
            };
        }((r = Xa.get(r) || m)(e.apply(null, Iu.call(arguments, 1))));
    }, Ou.interpolateHcl = function(n, t) {
        n = Ou.hcl(n), t = Ou.hcl(t);
        var e = n.h, r = n.c, i = n.l, u = t.h - e, o = t.c - r, a = t.l - i;
        return isNaN(o) && (o = 0, r = isNaN(r) ? t.c : r), isNaN(u) ? (u = 0, e = isNaN(e) ? t.h : e) : 180 < u ? u -= 360 : u < -180 && (u += 360), 
        function(n) {
            return sn(e + u * n, r + o * n, i + a * n) + "";
        };
    }, Ou.interpolateHsl = function(n, t) {
        n = Ou.hsl(n), t = Ou.hsl(t);
        var e = n.h, r = n.s, i = n.l, u = t.h - e, o = t.s - r, a = t.l - i;
        return isNaN(o) && (o = 0, r = isNaN(r) ? t.s : r), isNaN(u) ? (u = 0, e = isNaN(e) ? t.h : e) : 180 < u ? u -= 360 : u < -180 && (u += 360), 
        function(n) {
            return cn(e + u * n, r + o * n, i + a * n) + "";
        };
    }, Ou.interpolateLab = function(n, t) {
        n = Ou.lab(n), t = Ou.lab(t);
        var e = n.l, r = n.a, i = n.b, u = t.l - e, o = t.a - r, a = t.b - i;
        return function(n) {
            return pn(e + u * n, r + o * n, i + a * n) + "";
        };
    }, Ou.interpolateRound = kr, Ou.transform = function(n) {
        var t = Zu.createElementNS(Ou.ns.prefix.svg, "g");
        return (Ou.transform = function(n) {
            if (null != n) {
                t.setAttribute("transform", n);
                var e = t.transform.baseVal.consolidate();
            }
            return new Nr(e ? e.matrix : $a);
        })(n);
    }, Nr.prototype.toString = function() {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
    };
    var $a = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
    };
    Ou.interpolateTransform = Dr, Ou.layout = {}, Ou.layout.bundle = function() {
        return function(n) {
            for (var t = [], e = -1, r = n.length; ++e < r; ) t.push(jr(n[e]));
            return t;
        };
    }, Ou.layout.chord = function() {
        function n() {
            var n, c, s, h, p, g = {}, v = [], d = Ou.range(u), y = [];
            for (e = [], r = [], n = 0, h = -1; ++h < u; ) {
                for (c = 0, p = -1; ++p < u; ) c += i[h][p];
                v.push(c), y.push(Ou.range(u)), n += c;
            }
            for (o && d.sort(function(n, t) {
                return o(v[n], v[t]);
            }), a && y.forEach(function(n, t) {
                n.sort(function(n, e) {
                    return a(i[t][n], i[t][e]);
                });
            }), n = (mo - f * u) / n, c = 0, h = -1; ++h < u; ) {
                for (s = c, p = -1; ++p < u; ) {
                    var m = d[h], M = y[m][p], x = i[m][M], b = c, _ = c += x * n;
                    g[m + "-" + M] = {
                        index: m,
                        subindex: M,
                        startAngle: b,
                        endAngle: _,
                        value: x
                    };
                }
                r[m] = {
                    index: m,
                    startAngle: s,
                    endAngle: c,
                    value: v[m]
                }, c += f;
            }
            for (h = -1; ++h < u; ) for (p = h - 1; ++p < u; ) {
                var w = g[h + "-" + p], S = g[p + "-" + h];
                (w.value || S.value) && e.push(w.value < S.value ? {
                    source: S,
                    target: w
                } : {
                    source: w,
                    target: S
                });
            }
            l && t();
        }
        function t() {
            e.sort(function(n, t) {
                return l((n.source.value + n.target.value) / 2, (t.source.value + t.target.value) / 2);
            });
        }
        var e, r, i, u, o, a, l, c = {}, f = 0;
        return c.matrix = function(n) {
            return arguments.length ? (u = (i = n) && i.length, e = r = null, c) : i;
        }, c.padding = function(n) {
            return arguments.length ? (f = n, e = r = null, c) : f;
        }, c.sortGroups = function(n) {
            return arguments.length ? (o = n, e = r = null, c) : o;
        }, c.sortSubgroups = function(n) {
            return arguments.length ? (a = n, e = null, c) : a;
        }, c.sortChords = function(n) {
            return arguments.length ? (l = n, e && t(), c) : l;
        }, c.chords = function() {
            return e || n(), e;
        }, c.groups = function() {
            return r || n(), r;
        }, c;
    }, Ou.layout.force = function() {
        function n(n) {
            return function(t, e, r, i) {
                if (t.point !== n) {
                    var u = t.cx - n.x, o = t.cy - n.y, a = i - e, l = u * u + o * o;
                    if (a * a / y < l) return l < v && (c = t.charge / l, n.px -= u * c, n.py -= o * c), 
                    !0;
                    if (t.point && l && l < v) {
                        var c = t.pointCharge / l;
                        n.px -= u * c, n.py -= o * c;
                    }
                }
                return !t.charge;
            };
        }
        function t(n) {
            n.px = Ou.event.x, n.py = Ou.event.y, l.resume();
        }
        var e, r, i, u, o, a, l = {}, c = Ou.dispatch("start", "tick", "end"), f = [ 1, 1 ], s = .9, h = Ba, p = Wa, g = -30, v = Ja, d = .1, y = .64, M = [], x = [];
        return l.tick = function() {
            if ((i *= .99) < .005) return e = null, c.end({
                type: "end",
                alpha: i = 0
            }), !0;
            var t, r, l, h, p, v, y, m, b, _ = M.length, w = x.length;
            for (r = 0; r < w; ++r) h = (l = x[r]).source, (v = (m = (p = l.target).x - h.x) * m + (b = p.y - h.y) * b) && (m *= v = i * o[r] * ((v = Math.sqrt(v)) - u[r]) / v, 
            b *= v, p.x -= m * (y = h.weight + p.weight ? h.weight / (h.weight + p.weight) : .5), 
            p.y -= b * y, h.x += m * (y = 1 - y), h.y += b * y);
            if ((y = i * d) && (m = f[0] / 2, b = f[1] / 2, r = -1, y)) for (;++r < _; ) (l = M[r]).x += (m - l.x) * y, 
            l.y += (b - l.y) * y;
            if (g) for (function Vr(n, t, e) {
                var r = 0, i = 0;
                if (n.charge = 0, !n.leaf) for (var u, o = n.nodes, a = o.length, l = -1; ++l < a; ) null != (u = o[l]) && (Vr(u, t, e), 
                n.charge += u.charge, r += u.charge * u.cx, i += u.charge * u.cy);
                if (n.point) {
                    n.leaf || (n.point.x += Math.random() - .5, n.point.y += Math.random() - .5);
                    var c = t * e[n.point.index];
                    n.charge += n.pointCharge = c, r += c * n.point.x, i += c * n.point.y;
                }
                n.cx = r / n.charge, n.cy = i / n.charge;
            }(t = Ou.geom.quadtree(M), i, a), r = -1; ++r < _; ) (l = M[r]).fixed || t.visit(n(l));
            for (r = -1; ++r < _; ) (l = M[r]).fixed ? (l.x = l.px, l.y = l.py) : (l.x -= (l.px - (l.px = l.x)) * s, 
            l.y -= (l.py - (l.py = l.y)) * s);
            c.tick({
                type: "tick",
                alpha: i
            });
        }, l.nodes = function(n) {
            return arguments.length ? (M = n, l) : M;
        }, l.links = function(n) {
            return arguments.length ? (x = n, l) : x;
        }, l.size = function(n) {
            return arguments.length ? (f = n, l) : f;
        }, l.linkDistance = function(n) {
            return arguments.length ? (h = "function" == typeof n ? n : +n, l) : h;
        }, l.distance = l.linkDistance, l.linkStrength = function(n) {
            return arguments.length ? (p = "function" == typeof n ? n : +n, l) : p;
        }, l.friction = function(n) {
            return arguments.length ? (s = +n, l) : s;
        }, l.charge = function(n) {
            return arguments.length ? (g = "function" == typeof n ? n : +n, l) : g;
        }, l.chargeDistance = function(n) {
            return arguments.length ? (v = n * n, l) : Math.sqrt(v);
        }, l.gravity = function(n) {
            return arguments.length ? (d = +n, l) : d;
        }, l.theta = function(n) {
            return arguments.length ? (y = n * n, l) : Math.sqrt(y);
        }, l.alpha = function(n) {
            return arguments.length ? (n = +n, i ? 0 < n ? i = n : (e.c = null, e.t = NaN, e = null, 
            c.end({
                type: "end",
                alpha: i = 0
            })) : 0 < n && (c.start({
                type: "start",
                alpha: i = n
            }), e = qn(l.tick)), l) : i;
        }, l.start = function() {
            function n(n, r) {
                if (!e) {
                    for (e = new Array(i), l = 0; l < i; ++l) e[l] = [];
                    for (l = 0; l < c; ++l) {
                        var u = x[l];
                        e[u.source.index].push(u.target), e[u.target.index].push(u.source);
                    }
                }
                for (var o, a = e[t], l = -1, f = a.length; ++l < f; ) if (!isNaN(o = a[l][n])) return o;
                return Math.random() * r;
            }
            var t, e, r, i = M.length, c = x.length, s = f[0], v = f[1];
            for (t = 0; t < i; ++t) (r = M[t]).index = t, r.weight = 0;
            for (t = 0; t < c; ++t) "number" == typeof (r = x[t]).source && (r.source = M[r.source]), 
            "number" == typeof r.target && (r.target = M[r.target]), ++r.source.weight, ++r.target.weight;
            for (t = 0; t < i; ++t) r = M[t], isNaN(r.x) && (r.x = n("x", s)), isNaN(r.y) && (r.y = n("y", v)), 
            isNaN(r.px) && (r.px = r.x), isNaN(r.py) && (r.py = r.y);
            if (u = [], "function" == typeof h) for (t = 0; t < c; ++t) u[t] = +h.call(this, x[t], t); else for (t = 0; t < c; ++t) u[t] = h;
            if (o = [], "function" == typeof p) for (t = 0; t < c; ++t) o[t] = +p.call(this, x[t], t); else for (t = 0; t < c; ++t) o[t] = p;
            if (a = [], "function" == typeof g) for (t = 0; t < i; ++t) a[t] = +g.call(this, M[t], t); else for (t = 0; t < i; ++t) a[t] = g;
            return l.resume();
        }, l.resume = function() {
            return l.alpha(.1);
        }, l.stop = function() {
            return l.alpha(0);
        }, l.drag = function() {
            if (r || (r = Ou.behavior.drag().origin(m).on("dragstart.force", Or).on("drag.force", t).on("dragend.force", Ir)), 
            !arguments.length) return r;
            this.on("mouseover.force", Yr).on("mouseout.force", Zr).call(r);
        }, Ou.rebind(l, c, "on");
    };
    var Ba = 20, Wa = 1, Ja = 1 / 0;
    Ou.layout.hierarchy = function() {
        function n(i) {
            var u, o = [ i ], a = [];
            for (i.depth = 0; null != (u = o.pop()); ) if (a.push(u), (c = e.call(n, u, u.depth)) && (l = c.length)) {
                for (var l, c, f; 0 <= --l; ) o.push(f = c[l]), f.parent = u, f.depth = u.depth + 1;
                r && (u.value = 0), u.children = c;
            } else r && (u.value = +r.call(n, u, u.depth) || 0), delete u.children;
            return Br(i, function(n) {
                var e, i;
                t && (e = n.children) && e.sort(t), r && (i = n.parent) && (i.value += n.value);
            }), a;
        }
        var t = Gr, e = Wr, r = Jr;
        return n.sort = function(e) {
            return arguments.length ? (t = e, n) : t;
        }, n.children = function(t) {
            return arguments.length ? (e = t, n) : e;
        }, n.value = function(t) {
            return arguments.length ? (r = t, n) : r;
        }, n.revalue = function(t) {
            return r && ($r(t, function(n) {
                n.children && (n.value = 0);
            }), Br(t, function(t) {
                var e;
                t.children || (t.value = +r.call(n, t, t.depth) || 0), (e = t.parent) && (e.value += t.value);
            })), t;
        }, n;
    }, Ou.layout.partition = function() {
        function e(e, u) {
            var o = r.call(this, e, u);
            return function n(t, e, r, i) {
                var u = t.children;
                if (t.x = e, t.y = t.depth * i, t.dx = r, t.dy = i, u && (o = u.length)) {
                    var o, a, l, c = -1;
                    for (r = t.value ? r / t.value : 0; ++c < o; ) n(a = u[c], e, l = a.value * r, i), 
                    e += l;
                }
            }(o[0], 0, i[0], i[1] / function t(n) {
                var e = n.children, r = 0;
                if (e && (i = e.length)) for (var i, u = -1; ++u < i; ) r = Math.max(r, t(e[u]));
                return 1 + r;
            }(o[0])), o;
        }
        var r = Ou.layout.hierarchy(), i = [ 1, 1 ];
        return e.size = function(n) {
            return arguments.length ? (i = n, e) : i;
        }, Xr(e, r);
    }, Ou.layout.pie = function() {
        function n(o) {
            var a, l = o.length, c = o.map(function(e, r) {
                return +t.call(n, e, r);
            }), f = +("function" == typeof r ? r.apply(this, arguments) : r), s = ("function" == typeof i ? i.apply(this, arguments) : i) - f, h = Math.min(Math.abs(s) / l, +("function" == typeof u ? u.apply(this, arguments) : u)), p = h * (s < 0 ? -1 : 1), g = Ou.sum(c), v = g ? (s - l * p) / g : 0, d = Ou.range(l), y = [];
            return null != e && d.sort(e === Ga ? function(n, t) {
                return c[t] - c[n];
            } : function(n, t) {
                return e(o[n], o[t]);
            }), d.forEach(function(n) {
                y[n] = {
                    data: o[n],
                    value: a = c[n],
                    startAngle: f,
                    endAngle: f += a * v + p,
                    padAngle: h
                };
            }), y;
        }
        var t = Number, e = Ga, r = 0, i = mo, u = 0;
        return n.value = function(e) {
            return arguments.length ? (t = e, n) : t;
        }, n.sort = function(t) {
            return arguments.length ? (e = t, n) : e;
        }, n.startAngle = function(t) {
            return arguments.length ? (r = t, n) : r;
        }, n.endAngle = function(t) {
            return arguments.length ? (i = t, n) : i;
        }, n.padAngle = function(t) {
            return arguments.length ? (u = t, n) : u;
        }, n;
    };
    var Ga = {};
    Ou.layout.stack = function() {
        function n(a, l) {
            if (!(h = a.length)) return a;
            var c = a.map(function(e, r) {
                return t.call(n, e, r);
            }), f = c.map(function(t) {
                return t.map(function(t, e) {
                    return [ u.call(n, t, e), o.call(n, t, e) ];
                });
            }), s = e.call(n, f, l);
            c = Ou.permute(c, s), f = Ou.permute(f, s);
            var h, p, g, v, d = r.call(n, f, l), y = c[0].length;
            for (g = 0; g < y; ++g) for (i.call(n, c[0][g], v = d[g], f[0][g][1]), p = 1; p < h; ++p) i.call(n, c[p][g], v += f[p - 1][g][1], f[p][g][1]);
            return a;
        }
        var t = m, e = ei, r = ri, i = ti, u = Qr, o = ni;
        return n.values = function(e) {
            return arguments.length ? (t = e, n) : t;
        }, n.order = function(t) {
            return arguments.length ? (e = "function" == typeof t ? t : Ka.get(t) || ei, n) : e;
        }, n.offset = function(t) {
            return arguments.length ? (r = "function" == typeof t ? t : Qa.get(t) || ri, n) : r;
        }, n.x = function(t) {
            return arguments.length ? (u = t, n) : u;
        }, n.y = function(t) {
            return arguments.length ? (o = t, n) : o;
        }, n.out = function(t) {
            return arguments.length ? (i = t, n) : i;
        }, n;
    };
    var Ka = Ou.map({
        "inside-out": function(n) {
            var t, e, r = n.length, i = n.map(ii), u = n.map(ui), o = Ou.range(r).sort(function(n, t) {
                return i[n] - i[t];
            }), a = 0, l = 0, c = [], f = [];
            for (t = 0; t < r; ++t) e = o[t], a < l ? (a += u[e], c.push(e)) : (l += u[e], f.push(e));
            return f.reverse().concat(c);
        },
        reverse: function(n) {
            return Ou.range(n.length).reverse();
        },
        default: ei
    }), Qa = Ou.map({
        silhouette: function(n) {
            var t, e, r, i = n.length, u = n[0].length, o = [], a = 0, l = [];
            for (e = 0; e < u; ++e) {
                for (r = t = 0; t < i; t++) r += n[t][e][1];
                a < r && (a = r), o.push(r);
            }
            for (e = 0; e < u; ++e) l[e] = (a - o[e]) / 2;
            return l;
        },
        wiggle: function(n) {
            var t, e, r, i, u, o, a, l, c, f = n.length, s = n[0], h = s.length, p = [];
            for (p[0] = l = c = 0, e = 1; e < h; ++e) {
                for (i = t = 0; t < f; ++t) i += n[t][e][1];
                for (u = t = 0, a = s[e][0] - s[e - 1][0]; t < f; ++t) {
                    for (r = 0, o = (n[t][e][1] - n[t][e - 1][1]) / (2 * a); r < t; ++r) o += (n[r][e][1] - n[r][e - 1][1]) / a;
                    u += o * n[t][e][1];
                }
                p[e] = l -= i ? u / i * a : 0, l < c && (c = l);
            }
            for (e = 0; e < h; ++e) p[e] -= c;
            return p;
        },
        expand: function(n) {
            var t, e, r, i = n.length, u = n[0].length, o = 1 / i, a = [];
            for (e = 0; e < u; ++e) {
                for (r = t = 0; t < i; t++) r += n[t][e][1];
                if (r) for (t = 0; t < i; t++) n[t][e][1] /= r; else for (t = 0; t < i; t++) n[t][e][1] = o;
            }
            for (e = 0; e < u; ++e) a[e] = 0;
            return a;
        },
        zero: ri
    });
    Ou.layout.histogram = function() {
        function n(n, u) {
            for (var o, a, l = [], c = n.map(e, this), f = r.call(this, c, u), s = i.call(this, f, c, u), h = (u = -1, 
            c.length), p = s.length - 1, g = t ? 1 : 1 / h; ++u < p; ) (o = l[u] = []).dx = s[u + 1] - (o.x = s[u]), 
            o.y = 0;
            if (0 < p) for (u = -1; ++u < h; ) (a = c[u]) >= f[0] && a <= f[1] && ((o = l[Ou.bisect(s, a, 1, p) - 1]).y += g, 
            o.push(n[u]));
            return l;
        }
        var t = !0, e = Number, r = ci, i = ai;
        return n.value = function(t) {
            return arguments.length ? (e = t, n) : e;
        }, n.range = function(t) {
            return arguments.length ? (r = En(t), n) : r;
        }, n.bins = function(t) {
            return arguments.length ? (i = "number" == typeof t ? function(n) {
                return li(n, t);
            } : En(t), n) : i;
        }, n.frequency = function(e) {
            return arguments.length ? (t = !!e, n) : t;
        }, n;
    }, Ou.layout.pack = function() {
        function n(n, u) {
            var o = e.call(this, n, u), a = o[0], l = i[0], c = i[1], f = null == t ? Math.sqrt : "function" == typeof t ? t : function() {
                return t;
            };
            if (a.x = a.y = 0, Br(a, function(n) {
                n.r = +f(n.value);
            }), Br(a, gi), r) {
                var s = r * (t ? 1 : Math.max(2 * a.r / l, 2 * a.r / c)) / 2;
                Br(a, function(n) {
                    n.r += s;
                }), Br(a, gi), Br(a, function(n) {
                    n.r -= s;
                });
            }
            return function yi(n, t, e, r) {
                var i = n.children;
                if (n.x = t += r * n.x, n.y = e += r * n.y, n.r *= r, i) for (var u = -1, o = i.length; ++u < o; ) yi(i[u], t, e, r);
            }(a, l / 2, c / 2, t ? 1 : 1 / Math.max(2 * a.r / l, 2 * a.r / c)), o;
        }
        var t, e = Ou.layout.hierarchy().sort(fi), r = 0, i = [ 1, 1 ];
        return n.size = function(t) {
            return arguments.length ? (i = t, n) : i;
        }, n.radius = function(e) {
            return arguments.length ? (t = null == e || "function" == typeof e ? e : +e, n) : t;
        }, n.padding = function(t) {
            return arguments.length ? (r = +t, n) : r;
        }, Xr(n, e);
    }, Ou.layout.tree = function() {
        function n(n, i) {
            var f = o.call(this, n, i), s = f[0], h = function(n) {
                for (var t, e = {
                    A: null,
                    children: [ n ]
                }, r = [ e ]; null != (t = r.pop()); ) for (var i, u = t.children, o = 0, a = u.length; o < a; ++o) r.push((u[o] = i = {
                    _: u[o],
                    parent: t,
                    children: (i = u[o].children) && i.slice() || [],
                    A: null,
                    a: null,
                    z: 0,
                    m: 0,
                    c: 0,
                    s: 0,
                    t: null,
                    i: o
                }).a = i);
                return e.children[0];
            }(s);
            if (Br(h, e), h.parent.m = -h.z, $r(h, r), c) $r(s, u); else {
                var p = s, g = s, v = s;
                $r(s, function(n) {
                    n.x < p.x && (p = n), n.x > g.x && (g = n), n.depth > v.depth && (v = n);
                });
                var d = a(p, g) / 2 - p.x, y = l[0] / (g.x + a(g, p) / 2 + d), m = l[1] / (v.depth || 1);
                $r(s, function(n) {
                    n.x = (n.x + d) * y, n.y = n.depth * m;
                });
            }
            return f;
        }
        function e(n) {
            var t = n.children, e = n.parent.children, r = n.i ? e[n.i - 1] : null;
            if (t.length) {
                !function(n) {
                    for (var t, e = 0, r = 0, i = n.children, u = i.length; 0 <= --u; ) (t = i[u]).z += e, 
                    t.m += e, e += t.s + (r += t.c);
                }(n);
                var u = (t[0].z + t[t.length - 1].z) / 2;
                r ? (n.z = r.z + a(n._, r._), n.m = n.z - u) : n.z = u;
            } else r && (n.z = r.z + a(n._, r._));
            n.parent.A = function(n, t, e) {
                if (t) {
                    for (var r, i = n, u = n, o = t, l = i.parent.children[0], c = i.m, f = u.m, s = o.m, h = l.m; o = bi(o), 
                    i = xi(i), o && i; ) l = xi(l), (u = bi(u)).a = n, 0 < (r = o.z + s - i.z - c + a(o._, i._)) && (_i(Si(o, n, e), n, r), 
                    c += r, f += r), s += o.m, c += i.m, h += l.m, f += u.m;
                    o && !bi(u) && (u.t = o, u.m += s - f), i && !xi(l) && (l.t = i, l.m += c - h, e = n);
                }
                return e;
            }(n, r, n.parent.A || e[0]);
        }
        function r(n) {
            n._.x = n.z + n.parent.m, n.m += n.parent.m;
        }
        function u(n) {
            n.x *= l[0], n.y = n.depth * l[1];
        }
        var o = Ou.layout.hierarchy().sort(null).value(null), a = Mi, l = [ 1, 1 ], c = null;
        return n.separation = function(t) {
            return arguments.length ? (a = t, n) : a;
        }, n.size = function(t) {
            return arguments.length ? (c = null == (l = t) ? u : null, n) : c ? null : l;
        }, n.nodeSize = function(t) {
            return arguments.length ? (c = null == (l = t) ? null : u, n) : c ? l : null;
        }, Xr(n, o);
    }, Ou.layout.cluster = function() {
        function n(n, u) {
            var o, a = t.call(this, n, u), l = a[0], c = 0;
            Br(l, function(n) {
                var t = n.children;
                t && t.length ? (n.x = function(n) {
                    return n.reduce(function(n, t) {
                        return n + t.x;
                    }, 0) / n.length;
                }(t), n.y = function(n) {
                    return 1 + Ou.max(n, function(n) {
                        return n.y;
                    });
                }(t)) : (n.x = o ? c += e(n, o) : 0, n.y = 0, o = n);
            });
            var f = function Ei(n) {
                var t = n.children;
                return t && t.length ? Ei(t[0]) : n;
            }(l), s = function Ai(n) {
                var t, e = n.children;
                return e && (t = e.length) ? Ai(e[t - 1]) : n;
            }(l), h = f.x - e(f, s) / 2, p = s.x + e(s, f) / 2;
            return Br(l, i ? function(n) {
                n.x = (n.x - l.x) * r[0], n.y = (l.y - n.y) * r[1];
            } : function(n) {
                n.x = (n.x - h) / (p - h) * r[0], n.y = (1 - (l.y ? n.y / l.y : 1)) * r[1];
            }), a;
        }
        var t = Ou.layout.hierarchy().sort(null).value(null), e = Mi, r = [ 1, 1 ], i = !1;
        return n.separation = function(t) {
            return arguments.length ? (e = t, n) : e;
        }, n.size = function(t) {
            return arguments.length ? (i = null == (r = t), n) : i ? null : r;
        }, n.nodeSize = function(t) {
            return arguments.length ? (i = null != (r = t), n) : i ? r : null;
        }, Xr(n, t);
    }, Ou.layout.treemap = function() {
        function n(n, t) {
            for (var e, r, i = -1, u = n.length; ++i < u; ) r = (e = n[i]).value * (t < 0 ? 0 : t), 
            e.area = isNaN(r) || r <= 0 ? 0 : r;
        }
        function t(e) {
            var u = e.children;
            if (u && u.length) {
                var o, a, l, c = s(e), f = [], h = u.slice(), g = 1 / 0, v = "slice" === p ? c.dx : "dice" === p ? c.dy : "slice-dice" === p ? 1 & e.depth ? c.dy : c.dx : Math.min(c.dx, c.dy);
                for (n(h, c.dx * c.dy / e.value), f.area = 0; 0 < (l = h.length); ) f.push(o = h[l - 1]), 
                f.area += o.area, g = "squarify" !== p || (a = r(f, v)) <= g ? (h.pop(), a) : (f.area -= f.pop().area, 
                i(f, v, c, !1), v = Math.min(c.dx, c.dy), f.length = f.area = 0, 1 / 0);
                f.length && (i(f, v, c, !0), f.length = f.area = 0), u.forEach(t);
            }
        }
        function e(t) {
            var r = t.children;
            if (r && r.length) {
                var u, o = s(t), a = r.slice(), l = [];
                for (n(a, o.dx * o.dy / t.value), l.area = 0; u = a.pop(); ) l.push(u), l.area += u.area, 
                null != u.z && (i(l, u.z ? o.dx : o.dy, o, !a.length), l.length = l.area = 0);
                r.forEach(e);
            }
        }
        function r(n, t) {
            for (var e, r = n.area, i = 0, u = 1 / 0, o = -1, a = n.length; ++o < a; ) (e = n[o].area) && (e < u && (u = e), 
            i < e && (i = e));
            return t *= t, (r *= r) ? Math.max(t * i * g / r, r / (t * u * g)) : 1 / 0;
        }
        function i(n, t, e, r) {
            var i, u = -1, o = n.length, a = e.x, c = e.y, f = t ? l(n.area / t) : 0;
            if (t == e.dx) {
                for ((r || f > e.dy) && (f = e.dy); ++u < o; ) (i = n[u]).x = a, i.y = c, i.dy = f, 
                a += i.dx = Math.min(e.x + e.dx - a, f ? l(i.area / f) : 0);
                i.z = !0, i.dx += e.x + e.dx - a, e.y += f, e.dy -= f;
            } else {
                for ((r || f > e.dx) && (f = e.dx); ++u < o; ) (i = n[u]).x = a, i.y = c, i.dx = f, 
                c += i.dy = Math.min(e.y + e.dy - c, f ? l(i.area / f) : 0);
                i.z = !1, i.dy += e.y + e.dy - c, e.x += f, e.dx -= f;
            }
        }
        function u(r) {
            var i = o || a(r), u = i[0];
            return u.x = u.y = 0, u.value ? (u.dx = c[0], u.dy = c[1]) : u.dx = u.dy = 0, o && a.revalue(u), 
            n([ u ], u.dx * u.dy / u.value), (o ? e : t)(u), h && (o = i), i;
        }
        var o, a = Ou.layout.hierarchy(), l = Math.round, c = [ 1, 1 ], f = null, s = Ci, h = !1, p = "squarify", g = .5 * (1 + Math.sqrt(5));
        return u.size = function(n) {
            return arguments.length ? (c = n, u) : c;
        }, u.padding = function(n) {
            function t(t) {
                return zi(t, n);
            }
            return arguments.length ? (s = null == (f = n) ? Ci : "function" == (e = typeof n) ? function(t) {
                var e = n.call(u, t, t.depth);
                return null == e ? Ci(t) : zi(t, "number" == typeof e ? [ e, e, e, e ] : e);
            } : ("number" === e && (n = [ n, n, n, n ]), t), u) : f;
            var e;
        }, u.round = function(n) {
            return arguments.length ? (l = n ? Math.round : Number, u) : l != Number;
        }, u.sticky = function(n) {
            return arguments.length ? (h = n, o = null, u) : h;
        }, u.ratio = function(n) {
            return arguments.length ? (g = n, u) : g;
        }, u.mode = function(n) {
            return arguments.length ? (p = n + "", u) : p;
        }, Xr(u, a);
    }, Ou.random = {
        normal: function(n, t) {
            var e = arguments.length;
            return e < 2 && (t = 1), e < 1 && (n = 0), function() {
                for (var e, r, i; !(i = (e = 2 * Math.random() - 1) * e + (r = 2 * Math.random() - 1) * r) || 1 < i; ) ;
                return n + t * e * Math.sqrt(-2 * Math.log(i) / i);
            };
        },
        logNormal: function() {
            var n = Ou.random.normal.apply(Ou, arguments);
            return function() {
                return Math.exp(n());
            };
        },
        bates: function(n) {
            var t = Ou.random.irwinHall(n);
            return function() {
                return t() / n;
            };
        },
        irwinHall: function(n) {
            return function() {
                for (var t = 0, e = 0; e < n; e++) t += Math.random();
                return t;
            };
        }
    }, Ou.scale = {};
    var nl = {
        floor: m,
        ceil: m
    };
    Ou.scale.linear = function() {
        return function Ui(n, t, e, r) {
            function i() {
                var i = 2 < Math.min(n.length, t.length) ? Pi : Ti, l = r ? Ur : Pr;
                return o = i(n, t, l, e), a = i(t, n, l, pr), u;
            }
            function u(n) {
                return o(n);
            }
            var o, a;
            return u.invert = function(n) {
                return a(n);
            }, u.domain = function(t) {
                return arguments.length ? (n = t.map(Number), i()) : n;
            }, u.range = function(n) {
                return arguments.length ? (t = n, i()) : t;
            }, u.rangeRound = function(n) {
                return u.range(n).interpolate(kr);
            }, u.clamp = function(n) {
                return arguments.length ? (r = n, i()) : r;
            }, u.interpolate = function(n) {
                return arguments.length ? (e = n, i()) : e;
            }, u.ticks = function(t) {
                return Oi(n, t);
            }, u.tickFormat = function(t, e) {
                return Ii(n, t, e);
            }, u.nice = function(t) {
                return Fi(n, t), i();
            }, u.copy = function() {
                return Ui(n, t, e, r);
            }, i();
        }([ 0, 1 ], [ 0, 1 ], pr, !1);
    };
    var tl = {
        s: 1,
        g: 1,
        p: 1,
        r: 1,
        e: 1
    };
    Ou.scale.log = function() {
        return function Vi(n, t, e, r) {
            function i(n) {
                return (e ? Math.log(n < 0 ? 0 : n) : -Math.log(0 < n ? 0 : -n)) / Math.log(t);
            }
            function u(n) {
                return e ? Math.pow(t, n) : -Math.pow(t, -n);
            }
            function o(t) {
                return n(i(t));
            }
            return o.invert = function(t) {
                return u(n.invert(t));
            }, o.domain = function(t) {
                return arguments.length ? (e = 0 <= t[0], n.domain((r = t.map(Number)).map(i)), 
                o) : r;
            }, o.base = function(e) {
                return arguments.length ? (t = +e, n.domain(r.map(i)), o) : t;
            }, o.nice = function() {
                var t = Ri(r.map(i), e ? Math : rl);
                return n.domain(t), r = t.map(u), o;
            }, o.ticks = function() {
                var n = Li(r), o = [], a = n[0], l = n[1], c = Math.floor(i(a)), f = Math.ceil(i(l)), s = t % 1 ? 2 : t;
                if (isFinite(f - c)) {
                    if (e) {
                        for (;c < f; c++) for (h = 1; h < s; h++) o.push(u(c) * h);
                        o.push(u(c));
                    } else for (o.push(u(c)); c++ < f; ) for (var h = s - 1; 0 < h; h--) o.push(u(c) * h);
                    for (c = 0; o[c] < a; c++) ;
                    for (f = o.length; o[f - 1] > l; f--) ;
                    o = o.slice(c, f);
                }
                return o;
            }, o.tickFormat = function(n, e) {
                if (!arguments.length) return el;
                arguments.length < 2 ? e = el : "function" != typeof e && (e = Ou.format(e));
                var r = Math.max(1, t * n / o.ticks().length);
                return function(n) {
                    var o = n / u(Math.round(i(n)));
                    return o * t < t - .5 && (o *= t), o <= r ? e(n) : "";
                };
            }, o.copy = function() {
                return Vi(n.copy(), t, e, r);
            }, ji(o, n);
        }(Ou.scale.linear().domain([ 0, 1 ]), 10, !0, [ 1, 10 ]);
    };
    var el = Ou.format(".0e"), rl = {
        floor: function(n) {
            return -Math.ceil(-n);
        },
        ceil: function(n) {
            return -Math.floor(-n);
        }
    };
    Ou.scale.pow = function() {
        return function Xi(n, t, e) {
            function r(t) {
                return n(i(t));
            }
            var i = $i(t), u = $i(1 / t);
            return r.invert = function(t) {
                return u(n.invert(t));
            }, r.domain = function(t) {
                return arguments.length ? (n.domain((e = t.map(Number)).map(i)), r) : e;
            }, r.ticks = function(n) {
                return Oi(e, n);
            }, r.tickFormat = function(n, t) {
                return Ii(e, n, t);
            }, r.nice = function(n) {
                return r.domain(Fi(e, n));
            }, r.exponent = function(o) {
                return arguments.length ? (i = $i(t = o), u = $i(1 / t), n.domain(e.map(i)), r) : t;
            }, r.copy = function() {
                return Xi(n.copy(), t, e);
            }, ji(r, n);
        }(Ou.scale.linear(), 1, [ 0, 1 ]);
    }, Ou.scale.sqrt = function() {
        return Ou.scale.pow().exponent(.5);
    }, Ou.scale.ordinal = function() {
        return function Bi(n, t) {
            function e(e) {
                return u[((i.get(e) || ("range" === t.t ? i.set(e, n.push(e)) : NaN)) - 1) % u.length];
            }
            function r(t, e) {
                return Ou.range(n.length).map(function(n) {
                    return t + e * n;
                });
            }
            var i, u, o;
            return e.domain = function(r) {
                if (!arguments.length) return n;
                n = [], i = new c();
                for (var u, o = -1, a = r.length; ++o < a; ) i.has(u = r[o]) || i.set(u, n.push(u));
                return e[t.t].apply(e, t.a);
            }, e.range = function(n) {
                return arguments.length ? (u = n, o = 0, t = {
                    t: "range",
                    a: arguments
                }, e) : u;
            }, e.rangePoints = function(i, a) {
                arguments.length < 2 && (a = 0);
                var l = i[0], c = i[1], f = n.length < 2 ? (l = (l + c) / 2, 0) : (c - l) / (n.length - 1 + a);
                return u = r(l + f * a / 2, f), o = 0, t = {
                    t: "rangePoints",
                    a: arguments
                }, e;
            }, e.rangeRoundPoints = function(i, a) {
                arguments.length < 2 && (a = 0);
                var l = i[0], c = i[1], f = n.length < 2 ? (l = c = Math.round((l + c) / 2), 0) : (c - l) / (n.length - 1 + a) | 0;
                return u = r(l + Math.round(f * a / 2 + (c - l - (n.length - 1 + a) * f) / 2), f), 
                o = 0, t = {
                    t: "rangeRoundPoints",
                    a: arguments
                }, e;
            }, e.rangeBands = function(i, a, l) {
                arguments.length < 2 && (a = 0), arguments.length < 3 && (l = a);
                var c = i[1] < i[0], f = i[c - 0], s = (i[1 - c] - f) / (n.length - a + 2 * l);
                return u = r(f + s * l, s), c && u.reverse(), o = s * (1 - a), t = {
                    t: "rangeBands",
                    a: arguments
                }, e;
            }, e.rangeRoundBands = function(i, a, l) {
                arguments.length < 2 && (a = 0), arguments.length < 3 && (l = a);
                var c = i[1] < i[0], f = i[c - 0], s = i[1 - c], h = Math.floor((s - f) / (n.length - a + 2 * l));
                return u = r(f + Math.round((s - f - (n.length - a) * h) / 2), h), c && u.reverse(), 
                o = Math.round(h * (1 - a)), t = {
                    t: "rangeRoundBands",
                    a: arguments
                }, e;
            }, e.rangeBand = function() {
                return o;
            }, e.rangeExtent = function() {
                return Li(t.a[0]);
            }, e.copy = function() {
                return Bi(n, t);
            }, e.domain(n);
        }([], {
            t: "range",
            a: [ [] ]
        });
    }, Ou.scale.category10 = function() {
        return Ou.scale.ordinal().range(il);
    }, Ou.scale.category20 = function() {
        return Ou.scale.ordinal().range(ul);
    }, Ou.scale.category20b = function() {
        return Ou.scale.ordinal().range(ol);
    }, Ou.scale.category20c = function() {
        return Ou.scale.ordinal().range(al);
    };
    var il = [ 2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175 ].map(xn), ul = [ 2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725 ].map(xn), ol = [ 3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654 ].map(xn), al = [ 3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081 ].map(xn);
    Ou.scale.quantile = function() {
        return function Wi(n, t) {
            function u() {
                var e = 0, r = t.length;
                for (a = []; ++e < r; ) a[e - 1] = Ou.quantile(n, e / r);
                return o;
            }
            function o(n) {
                if (!isNaN(n = +n)) return t[Ou.bisect(a, n)];
            }
            var a;
            return o.domain = function(t) {
                return arguments.length ? (n = t.map(r).filter(i).sort(e), u()) : n;
            }, o.range = function(n) {
                return arguments.length ? (t = n, u()) : t;
            }, o.quantiles = function() {
                return a;
            }, o.invertExtent = function(e) {
                return (e = t.indexOf(e)) < 0 ? [ NaN, NaN ] : [ 0 < e ? a[e - 1] : n[0], e < a.length ? a[e] : n[n.length - 1] ];
            }, o.copy = function() {
                return Wi(n, t);
            }, u();
        }([], []);
    }, Ou.scale.quantize = function() {
        return function Ji(n, t, e) {
            function r(t) {
                return e[Math.max(0, Math.min(o, Math.floor(u * (t - n))))];
            }
            function i() {
                return u = e.length / (t - n), o = e.length - 1, r;
            }
            var u, o;
            return r.domain = function(e) {
                return arguments.length ? (n = +e[0], t = +e[e.length - 1], i()) : [ n, t ];
            }, r.range = function(n) {
                return arguments.length ? (e = n, i()) : e;
            }, r.invertExtent = function(t) {
                return [ t = (t = e.indexOf(t)) < 0 ? NaN : t / u + n, t + 1 / u ];
            }, r.copy = function() {
                return Ji(n, t, e);
            }, i();
        }(0, 1, [ 0, 1 ]);
    }, Ou.scale.threshold = function() {
        return function Gi(n, t) {
            function e(e) {
                if (e <= e) return t[Ou.bisect(n, e)];
            }
            return e.domain = function(t) {
                return arguments.length ? (n = t, e) : n;
            }, e.range = function(n) {
                return arguments.length ? (t = n, e) : t;
            }, e.invertExtent = function(e) {
                return e = t.indexOf(e), [ n[e - 1], n[e] ];
            }, e.copy = function() {
                return Gi(n, t);
            }, e;
        }([ .5 ], [ 0, 1 ]);
    }, Ou.scale.identity = function() {
        return function Ki(n) {
            function t(n) {
                return +n;
            }
            return (t.invert = t).domain = t.range = function(e) {
                return arguments.length ? (n = e.map(t), t) : n;
            }, t.ticks = function(t) {
                return Oi(n, t);
            }, t.tickFormat = function(t, e) {
                return Ii(n, t, e);
            }, t.copy = function() {
                return Ki(n);
            }, t;
        }([ 0, 1 ]);
    }, Ou.svg = {}, Ou.svg.arc = function() {
        function n() {
            var n = Math.max(0, +e.apply(this, arguments)), c = Math.max(0, +r.apply(this, arguments)), f = o.apply(this, arguments) - xo, s = a.apply(this, arguments) - xo, h = Math.abs(s - f), p = s < f ? 0 : 1;
            if (c < n && (g = c, c = n, n = g), Mo <= h) return t(c, p) + (n ? t(n, 1 - p) : "") + "Z";
            var g, v, d, y, m, M, x, b, _, w, S, k, N = 0, E = 0, A = [];
            if ((y = (+l.apply(this, arguments) || 0) / 2) && (d = u === ll ? Math.sqrt(n * n + c * c) : +u.apply(this, arguments), 
            p || (E *= -1), c && (E = tn(d / c * Math.sin(y))), n && (N = tn(d / n * Math.sin(y)))), 
            c) {
                m = c * Math.cos(f + E), M = c * Math.sin(f + E), x = c * Math.cos(s - E), b = c * Math.sin(s - E);
                var C = Math.abs(s - f - 2 * E) <= yo ? 0 : 1;
                if (E && uu(m, M, x, b) === p ^ C) {
                    var z = (f + s) / 2;
                    m = c * Math.cos(z), M = c * Math.sin(z), x = b = null;
                }
            } else m = M = 0;
            if (n) {
                _ = n * Math.cos(s - N), w = n * Math.sin(s - N), S = n * Math.cos(f + N), k = n * Math.sin(f + N);
                var L = Math.abs(f - s + 2 * N) <= yo ? 0 : 1;
                if (N && uu(_, w, S, k) === 1 - p ^ L) {
                    var q = (f + s) / 2;
                    _ = n * Math.cos(q), w = n * Math.sin(q), S = k = null;
                }
            } else _ = w = 0;
            if (go < h && .001 < (g = Math.min(Math.abs(c - n) / 2, +i.apply(this, arguments)))) {
                v = n < c ^ p ? 0 : 1;
                var T = g, R = g;
                if (h < yo) {
                    var D = null == S ? [ _, w ] : null == x ? [ m, M ] : Ce([ m, M ], [ S, k ], [ x, b ], [ _, w ]), P = m - D[0], U = M - D[1], j = x - D[0], F = b - D[1], H = 1 / Math.sin(Math.acos((P * j + U * F) / (Math.sqrt(P * P + U * U) * Math.sqrt(j * j + F * F))) / 2), O = Math.sqrt(D[0] * D[0] + D[1] * D[1]);
                    R = Math.min(g, (n - O) / (H - 1)), T = Math.min(g, (c - O) / (H + 1));
                }
                if (null != x) {
                    var I = ou(null == S ? [ _, w ] : [ S, k ], [ m, M ], c, T, p), Y = ou([ x, b ], [ _, w ], c, T, p);
                    g === T ? A.push("M", I[0], "A", T, ",", T, " 0 0,", v, " ", I[1], "A", c, ",", c, " 0 ", 1 - p ^ uu(I[1][0], I[1][1], Y[1][0], Y[1][1]), ",", p, " ", Y[1], "A", T, ",", T, " 0 0,", v, " ", Y[0]) : A.push("M", I[0], "A", T, ",", T, " 0 1,", v, " ", Y[0]);
                } else A.push("M", m, ",", M);
                if (null != S) {
                    var Z = ou([ m, M ], [ S, k ], n, -R, p), V = ou([ _, w ], null == x ? [ m, M ] : [ x, b ], n, -R, p);
                    g === R ? A.push("L", V[0], "A", R, ",", R, " 0 0,", v, " ", V[1], "A", n, ",", n, " 0 ", p ^ uu(V[1][0], V[1][1], Z[1][0], Z[1][1]), ",", 1 - p, " ", Z[1], "A", R, ",", R, " 0 0,", v, " ", Z[0]) : A.push("L", V[0], "A", R, ",", R, " 0 0,", v, " ", Z[0]);
                } else A.push("L", _, ",", w);
            } else A.push("M", m, ",", M), null != x && A.push("A", c, ",", c, " 0 ", C, ",", p, " ", x, ",", b), 
            A.push("L", _, ",", w), null != S && A.push("A", n, ",", n, " 0 ", L, ",", 1 - p, " ", S, ",", k);
            return A.push("Z"), A.join("");
        }
        function t(n, t) {
            return "M0," + n + "A" + n + "," + n + " 0 1," + t + " 0," + -n + "A" + n + "," + n + " 0 1," + t + " 0," + n;
        }
        var e = nu, r = tu, i = Qi, u = ll, o = eu, a = ru, l = iu;
        return n.innerRadius = function(t) {
            return arguments.length ? (e = En(t), n) : e;
        }, n.outerRadius = function(t) {
            return arguments.length ? (r = En(t), n) : r;
        }, n.cornerRadius = function(t) {
            return arguments.length ? (i = En(t), n) : i;
        }, n.padRadius = function(t) {
            return arguments.length ? (u = t == ll ? ll : En(t), n) : u;
        }, n.startAngle = function(t) {
            return arguments.length ? (o = En(t), n) : o;
        }, n.endAngle = function(t) {
            return arguments.length ? (a = En(t), n) : a;
        }, n.padAngle = function(t) {
            return arguments.length ? (l = En(t), n) : l;
        }, n.centroid = function() {
            var n = (+e.apply(this, arguments) + +r.apply(this, arguments)) / 2, t = (+o.apply(this, arguments) + +a.apply(this, arguments)) / 2 - xo;
            return [ Math.cos(t) * n, Math.sin(t) * n ];
        }, n;
    };
    var ll = "auto";
    Ou.svg.line = function() {
        return au(m);
    };
    var cl = Ou.map({
        linear: lu,
        "linear-closed": cu,
        step: function(n) {
            for (var t = 0, e = n.length, r = n[0], i = [ r[0], ",", r[1] ]; ++t < e; ) i.push("H", (r[0] + (r = n[t])[0]) / 2, "V", r[1]);
            return 1 < e && i.push("H", r[0]), i.join("");
        },
        "step-before": fu,
        "step-after": su,
        basis: gu,
        "basis-open": function(n) {
            if (n.length < 4) return lu(n);
            for (var t, e = [], r = -1, i = n.length, u = [ 0 ], o = [ 0 ]; ++r < 3; ) t = n[r], 
            u.push(t[0]), o.push(t[1]);
            for (e.push(vu(hl, u) + "," + vu(hl, o)), --r; ++r < i; ) t = n[r], u.shift(), u.push(t[0]), 
            o.shift(), o.push(t[1]), du(e, u, o);
            return e.join("");
        },
        "basis-closed": function(n) {
            for (var t, e, r = -1, i = n.length, u = i + 4, o = [], a = []; ++r < 4; ) e = n[r % i], 
            o.push(e[0]), a.push(e[1]);
            for (t = [ vu(hl, o), ",", vu(hl, a) ], --r; ++r < u; ) e = n[r % i], o.shift(), 
            o.push(e[0]), a.shift(), a.push(e[1]), du(t, o, a);
            return t.join("");
        },
        bundle: function(n, t) {
            var e = n.length - 1;
            if (e) for (var r, i, u = n[0][0], o = n[0][1], a = n[e][0] - u, l = n[e][1] - o, c = -1; ++c <= e; ) i = c / e, 
            (r = n[c])[0] = t * r[0] + (1 - t) * (u + i * a), r[1] = t * r[1] + (1 - t) * (o + i * l);
            return gu(n);
        },
        cardinal: function(n, t) {
            return n.length < 3 ? lu(n) : n[0] + hu(n, pu(n, t));
        },
        "cardinal-open": function(n, t) {
            return n.length < 4 ? lu(n) : n[1] + hu(n.slice(1, -1), pu(n, t));
        },
        "cardinal-closed": function(n, t) {
            return n.length < 3 ? cu(n) : n[0] + hu((n.push(n[0]), n), pu([ n[n.length - 2] ].concat(n, [ n[1] ]), t));
        },
        monotone: function(n) {
            return n.length < 3 ? lu(n) : n[0] + hu(n, Mu(n));
        }
    });
    cl.forEach(function(n, t) {
        t.key = n, t.closed = /-closed$/.test(n);
    });
    var fl = [ 0, 2 / 3, 1 / 3, 0 ], sl = [ 0, 1 / 3, 2 / 3, 0 ], hl = [ 0, 1 / 6, 2 / 3, 1 / 6 ];
    Ou.svg.line.radial = function() {
        var n = au(xu);
        return n.radius = n.x, delete n.x, n.angle = n.y, delete n.y, n;
    }, (fu.reverse = su).reverse = fu, Ou.svg.area = function() {
        return bu(m);
    }, Ou.svg.area.radial = function() {
        var n = bu(xu);
        return n.radius = n.x, delete n.x, n.innerRadius = n.x0, delete n.x0, n.outerRadius = n.x1, 
        delete n.x1, n.angle = n.y, delete n.y, n.startAngle = n.y0, delete n.y0, n.endAngle = n.y1, 
        delete n.y1, n;
    }, Ou.svg.chord = function() {
        function n(n, a) {
            var l = t(this, u, n, a), c = t(this, o, n, a);
            return "M" + l.p0 + r(l.r, l.p1, l.a1 - l.a0) + (function(n, t) {
                return n.a0 == t.a0 && n.a1 == t.a1;
            }(l, c) ? i(l.r, l.p1, l.r, l.p0) : i(l.r, l.p1, c.r, c.p0) + r(c.r, c.p1, c.a1 - c.a0) + i(c.r, c.p1, l.r, l.p0)) + "Z";
        }
        function t(n, t, e, r) {
            var i = t.call(n, e, r), u = a.call(n, i, r), o = l.call(n, i, r) - xo, f = c.call(n, i, r) - xo;
            return {
                r: u,
                a0: o,
                a1: f,
                p0: [ u * Math.cos(o), u * Math.sin(o) ],
                p1: [ u * Math.cos(f), u * Math.sin(f) ]
            };
        }
        function r(n, t, e) {
            return "A" + n + "," + n + " 0 " + +(yo < e) + ",1 " + t;
        }
        function i(n, t, e, r) {
            return "Q 0,0 " + r;
        }
        var u = ve, o = de, a = _u, l = eu, c = ru;
        return n.radius = function(t) {
            return arguments.length ? (a = En(t), n) : a;
        }, n.source = function(t) {
            return arguments.length ? (u = En(t), n) : u;
        }, n.target = function(t) {
            return arguments.length ? (o = En(t), n) : o;
        }, n.startAngle = function(t) {
            return arguments.length ? (l = En(t), n) : l;
        }, n.endAngle = function(t) {
            return arguments.length ? (c = En(t), n) : c;
        }, n;
    }, Ou.svg.diagonal = function() {
        function n(n, i) {
            var u = t.call(this, n, i), o = e.call(this, n, i), a = (u.y + o.y) / 2, l = [ u, {
                x: u.x,
                y: a
            }, {
                x: o.x,
                y: a
            }, o ];
            return "M" + (l = l.map(r))[0] + "C" + l[1] + " " + l[2] + " " + l[3];
        }
        var t = ve, e = de, r = wu;
        return n.source = function(e) {
            return arguments.length ? (t = En(e), n) : t;
        }, n.target = function(t) {
            return arguments.length ? (e = En(t), n) : e;
        }, n.projection = function(t) {
            return arguments.length ? (r = t, n) : r;
        }, n;
    }, Ou.svg.diagonal.radial = function() {
        var n = Ou.svg.diagonal(), t = wu, e = n.projection;
        return n.projection = function(n) {
            return arguments.length ? e(function(n) {
                return function() {
                    var t = n.apply(this, arguments), e = t[0], r = t[1] - xo;
                    return [ e * Math.cos(r), e * Math.sin(r) ];
                };
            }(t = n)) : t;
        }, n;
    }, Ou.svg.symbol = function() {
        function n(n, r) {
            return (pl.get(t.call(this, n, r)) || Eu)(e.call(this, n, r));
        }
        var t = Nu, e = ku;
        return n.type = function(e) {
            return arguments.length ? (t = En(e), n) : t;
        }, n.size = function(t) {
            return arguments.length ? (e = En(t), n) : e;
        }, n;
    };
    var pl = Ou.map({
        circle: Eu,
        cross: function(n) {
            var t = Math.sqrt(n / 5) / 2;
            return "M" + -3 * t + "," + -t + "H" + -t + "V" + -3 * t + "H" + t + "V" + -t + "H" + 3 * t + "V" + t + "H" + t + "V" + 3 * t + "H" + -t + "V" + t + "H" + -3 * t + "Z";
        },
        diamond: function(n) {
            var t = Math.sqrt(n / (2 * vl)), e = t * vl;
            return "M0," + -t + "L" + e + ",0 0," + t + " " + -e + ",0Z";
        },
        square: function(n) {
            var t = Math.sqrt(n) / 2;
            return "M" + -t + "," + -t + "L" + t + "," + -t + " " + t + "," + t + " " + -t + "," + t + "Z";
        },
        "triangle-down": function(n) {
            var t = Math.sqrt(n / gl), e = t * gl / 2;
            return "M0," + e + "L" + t + "," + -e + " " + -t + "," + -e + "Z";
        },
        "triangle-up": function(n) {
            var t = Math.sqrt(n / gl), e = t * gl / 2;
            return "M0," + -e + "L" + t + "," + e + " " + -t + "," + e + "Z";
        }
    });
    Ou.svg.symbolTypes = pl.keys();
    var gl = Math.sqrt(3), vl = Math.tan(30 * bo);
    oo.transition = function(n) {
        for (var t, e, r = dl || ++xl, i = qu(n), u = [], o = yl || {
            time: Date.now(),
            ease: xr,
            delay: 0,
            duration: 250
        }, a = -1, l = this.length; ++a < l; ) {
            u.push(t = []);
            for (var c = this[a], f = -1, s = c.length; ++f < s; ) (e = c[f]) && Tu(e, f, i, r, o), 
            t.push(e);
        }
        return Cu(u, i, r);
    }, oo.interrupt = function(n) {
        return this.each(null == n ? ml : Au(qu(n)));
    };
    var dl, yl, ml = Au(qu()), Ml = [], xl = 0;
    Ml.call = oo.call, Ml.empty = oo.empty, Ml.node = oo.node, Ml.size = oo.size, Ou.transition = function(n, t) {
        return n && n.transition ? dl ? n.transition(t) : n : Ou.selection().transition(n);
    }, (Ou.transition.prototype = Ml).select = function(n) {
        var t, e, r, i = this.id, u = this.namespace, o = [];
        n = A(n);
        for (var a = -1, l = this.length; ++a < l; ) {
            o.push(t = []);
            for (var c = this[a], f = -1, s = c.length; ++f < s; ) (r = c[f]) && (e = n.call(r, r.__data__, f, a)) ? ("__data__" in r && (e.__data__ = r.__data__), 
            Tu(e, f, u, i, r[u][i]), t.push(e)) : t.push(null);
        }
        return Cu(o, u, i);
    }, Ml.selectAll = function(n) {
        var t, e, r, i, u, o = this.id, a = this.namespace, l = [];
        n = C(n);
        for (var c = -1, f = this.length; ++c < f; ) for (var s = this[c], h = -1, p = s.length; ++h < p; ) if (r = s[h]) {
            u = r[a][o], e = n.call(r, r.__data__, h, c), l.push(t = []);
            for (var g = -1, v = e.length; ++g < v; ) (i = e[g]) && Tu(i, g, a, o, u), t.push(i);
        }
        return Cu(l, a, o);
    }, Ml.filter = function(n) {
        var t, e, r, i = [];
        "function" != typeof n && (n = O(n));
        for (var u = 0, o = this.length; u < o; u++) {
            i.push(t = []);
            for (var a = 0, l = (e = this[u]).length; a < l; a++) (r = e[a]) && n.call(r, r.__data__, a, u) && t.push(r);
        }
        return Cu(i, this.namespace, this.id);
    }, Ml.tween = function(n, t) {
        var e = this.id, r = this.namespace;
        return arguments.length < 2 ? this.node()[r][e].tween.get(n) : Y(this, null == t ? function(t) {
            t[r][e].tween.remove(n);
        } : function(i) {
            i[r][e].tween.set(n, t);
        });
    }, Ml.attr = function(n, t) {
        function e() {
            this.removeAttribute(u);
        }
        function r() {
            this.removeAttributeNS(u.space, u.local);
        }
        if (arguments.length < 2) {
            for (t in n) this.attr(t, n[t]);
            return this;
        }
        var i = "transform" == n ? Dr : pr, u = Ou.ns.qualify(n);
        return zu(this, "attr." + n, t, u.local ? function(n) {
            return null == n ? r : (n += "", function() {
                var t, e = this.getAttributeNS(u.space, u.local);
                return e !== n && (t = i(e, n), function(n) {
                    this.setAttributeNS(u.space, u.local, t(n));
                });
            });
        } : function(n) {
            return null == n ? e : (n += "", function() {
                var t, e = this.getAttribute(u);
                return e !== n && (t = i(e, n), function(n) {
                    this.setAttribute(u, t(n));
                });
            });
        });
    }, Ml.attrTween = function(n, t) {
        var e = Ou.ns.qualify(n);
        return this.tween("attr." + n, e.local ? function(n, r) {
            var i = t.call(this, n, r, this.getAttributeNS(e.space, e.local));
            return i && function(n) {
                this.setAttributeNS(e.space, e.local, i(n));
            };
        } : function(n, r) {
            var i = t.call(this, n, r, this.getAttribute(e));
            return i && function(n) {
                this.setAttribute(e, i(n));
            };
        });
    }, Ml.style = function(n, e, r) {
        function i() {
            this.style.removeProperty(n);
        }
        var u = arguments.length;
        if (u < 3) {
            if ("string" != typeof n) {
                for (r in u < 2 && (e = ""), n) this.style(r, n[r], e);
                return this;
            }
            r = "";
        }
        return zu(this, "style." + n, e, function(e) {
            return null == e ? i : (e += "", function() {
                var i, u = t(this).getComputedStyle(this, null).getPropertyValue(n);
                return u !== e && (i = pr(u, e), function(t) {
                    this.style.setProperty(n, i(t), r);
                });
            });
        });
    }, Ml.styleTween = function(n, e, r) {
        return arguments.length < 3 && (r = ""), this.tween("style." + n, function(i, u) {
            var o = e.call(this, i, u, t(this).getComputedStyle(this, null).getPropertyValue(n));
            return o && function(t) {
                this.style.setProperty(n, o(t), r);
            };
        });
    }, Ml.text = function(n) {
        return zu(this, "text", n, Lu);
    }, Ml.remove = function() {
        var n = this.namespace;
        return this.each("end.transition", function() {
            var t;
            this[n].count < 2 && (t = this.parentNode) && t.removeChild(this);
        });
    }, Ml.ease = function(n) {
        var t = this.id, e = this.namespace;
        return arguments.length < 1 ? this.node()[e][t].ease : ("function" != typeof n && (n = Ou.ease.apply(Ou, arguments)), 
        Y(this, function(r) {
            r[e][t].ease = n;
        }));
    }, Ml.delay = function(n) {
        var t = this.id, e = this.namespace;
        return arguments.length < 1 ? this.node()[e][t].delay : Y(this, "function" == typeof n ? function(r, i, u) {
            r[e][t].delay = +n.call(r, r.__data__, i, u);
        } : (n = +n, function(r) {
            r[e][t].delay = n;
        }));
    }, Ml.duration = function(n) {
        var t = this.id, e = this.namespace;
        return arguments.length < 1 ? this.node()[e][t].duration : Y(this, "function" == typeof n ? function(r, i, u) {
            r[e][t].duration = Math.max(1, n.call(r, r.__data__, i, u));
        } : (n = Math.max(1, n), function(r) {
            r[e][t].duration = n;
        }));
    }, Ml.each = function(n, t) {
        var e = this.id, r = this.namespace;
        if (arguments.length < 2) {
            var i = yl, u = dl;
            try {
                dl = e, Y(this, function(t, i, u) {
                    yl = t[r][e], n.call(t, t.__data__, i, u);
                });
            } finally {
                yl = i, dl = u;
            }
        } else Y(this, function(i) {
            var u = i[r][e];
            (u.event || (u.event = Ou.dispatch("start", "end", "interrupt"))).on(n, t);
        });
        return this;
    }, Ml.transition = function() {
        for (var n, t, e, r, i = this.id, u = ++xl, o = this.namespace, a = [], l = 0, c = this.length; l < c; l++) {
            a.push(n = []);
            for (var f = 0, s = (t = this[l]).length; f < s; f++) (e = t[f]) && Tu(e, f, o, u, {
                time: (r = e[o][i]).time,
                ease: r.ease,
                delay: r.delay + r.duration,
                duration: r.duration
            }), n.push(e);
        }
        return Cu(a, o, u);
    }, Ou.svg.axis = function() {
        function n(n) {
            n.each(function() {
                var n, c = Ou.select(this), f = this.__chart__ || e, s = this.__chart__ = e.copy(), h = null == l ? s.ticks ? s.ticks.apply(s, a) : s.domain() : l, p = null == t ? s.tickFormat ? s.tickFormat.apply(s, a) : m : t, g = c.selectAll(".tick").data(h, s), v = g.enter().insert("g", ".domain").attr("class", "tick").style("opacity", go), d = Ou.transition(g.exit()).style("opacity", go).remove(), y = Ou.transition(g.order()).style("opacity", 1), M = Math.max(i, 0) + o, x = qi(s), b = c.selectAll(".domain").data([ 0 ]), _ = (b.enter().append("path").attr("class", "domain"), 
                Ou.transition(b));
                v.append("line"), v.append("text");
                var w, S, k, N, E = v.select("line"), A = y.select("line"), C = g.select("text").text(p), z = v.select("text"), L = y.select("text"), q = "top" === r || "left" === r ? -1 : 1;
                if ("bottom" === r || "top" === r ? (n = Ru, w = "x", k = "y", S = "x2", N = "y2", 
                C.attr("dy", q < 0 ? "0em" : ".71em").style("text-anchor", "middle"), _.attr("d", "M" + x[0] + "," + q * u + "V0H" + x[1] + "V" + q * u)) : (n = Du, 
                w = "y", k = "x", S = "y2", N = "x2", C.attr("dy", ".32em").style("text-anchor", q < 0 ? "end" : "start"), 
                _.attr("d", "M" + q * u + "," + x[0] + "H0V" + x[1] + "H" + q * u)), E.attr(N, q * i), 
                z.attr(k, q * M), A.attr(S, 0).attr(N, q * i), L.attr(w, 0).attr(k, q * M), s.rangeBand) {
                    var T = s, R = T.rangeBand() / 2;
                    f = s = function(n) {
                        return T(n) + R;
                    };
                } else f.rangeBand ? f = s : d.call(n, s, f);
                v.call(n, f, s), y.call(n, s, s);
            });
        }
        var t, e = Ou.scale.linear(), r = bl, i = 6, u = 6, o = 3, a = [ 10 ], l = null;
        return n.scale = function(t) {
            return arguments.length ? (e = t, n) : e;
        }, n.orient = function(t) {
            return arguments.length ? (r = t in _l ? t + "" : bl, n) : r;
        }, n.ticks = function() {
            return arguments.length ? (a = Yu(arguments), n) : a;
        }, n.tickValues = function(t) {
            return arguments.length ? (l = t, n) : l;
        }, n.tickFormat = function(e) {
            return arguments.length ? (t = e, n) : t;
        }, n.tickSize = function(t) {
            var e = arguments.length;
            return e ? (i = +t, u = +arguments[e - 1], n) : i;
        }, n.innerTickSize = function(t) {
            return arguments.length ? (i = +t, n) : i;
        }, n.outerTickSize = function(t) {
            return arguments.length ? (u = +t, n) : u;
        }, n.tickPadding = function(t) {
            return arguments.length ? (o = +t, n) : o;
        }, n.tickSubdivide = function() {
            return arguments.length && n;
        }, n;
    };
    var bl = "bottom", _l = {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
    };
    Ou.svg.brush = function() {
        function n(t) {
            t.each(function() {
                var t = Ou.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", u).on("touchstart.brush", u), o = t.selectAll(".background").data([ 0 ]);
                o.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), 
                t.selectAll(".extent").data([ 0 ]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                var a = t.selectAll(".resize").data(v, m);
                a.exit().remove(), a.enter().append("g").attr("class", function(n) {
                    return "resize " + n;
                }).style("cursor", function(n) {
                    return wl[n];
                }).append("rect").attr("x", function(n) {
                    return /[ew]$/.test(n) ? -3 : null;
                }).attr("y", function(n) {
                    return /^[ns]/.test(n) ? -3 : null;
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), a.style("display", n.empty() ? "none" : null);
                var l, s = Ou.transition(t), h = Ou.transition(o);
                c && (l = qi(c), h.attr("x", l[0]).attr("width", l[1] - l[0]), r(s)), f && (l = qi(f), 
                h.attr("y", l[0]).attr("height", l[1] - l[0]), i(s)), e(s);
            });
        }
        function e(n) {
            n.selectAll(".resize").attr("transform", function(n) {
                return "translate(" + s[+/e$/.test(n)] + "," + h[+/^s/.test(n)] + ")";
            });
        }
        function r(n) {
            n.select(".extent").attr("x", s[0]), n.selectAll(".extent,.n>rect,.s>rect").attr("width", s[1] - s[0]);
        }
        function i(n) {
            n.select(".extent").attr("y", h[0]), n.selectAll(".extent,.e>rect,.w>rect").attr("height", h[1] - h[0]);
        }
        function u() {
            function u() {
                var n = Ou.mouse(M), t = !1;
                m && (n[0] += m[0], n[1] += m[1]), E || (Ou.event.altKey ? (y || (y = [ (s[0] + s[1]) / 2, (h[0] + h[1]) / 2 ]), 
                C[0] = s[+(n[0] < y[0])], C[1] = h[+(n[1] < y[1])]) : y = null), k && v(n, c, 0) && (r(_), 
                t = !0), N && v(n, f, 1) && (i(_), t = !0), t && (e(_), b({
                    type: "brush",
                    mode: E ? "move" : "resize"
                }));
            }
            function v(n, t, e) {
                var r, i, u = qi(t), l = u[0], c = u[1], f = C[e], v = e ? h : s, d = v[1] - v[0];
                if (E && (l -= f, c -= d + f), r = (e ? g : p) ? Math.max(l, Math.min(c, n[e])) : n[e], 
                E ? i = (r += f) + d : (y && (f = Math.max(l, Math.min(c, 2 * y[e] - r))), f < r ? (i = r, 
                r = f) : i = f), v[0] != r || v[1] != i) return e ? a = null : o = null, v[0] = r, 
                v[1] = i, !0;
            }
            function d() {
                u(), _.style("pointer-events", "all").selectAll(".resize").style("display", n.empty() ? "none" : null), 
                Ou.select("body").style("cursor", null), z.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), 
                A(), b({
                    type: "brushend"
                });
            }
            var y, m, M = this, x = Ou.select(Ou.event.target), b = l.of(M, arguments), _ = Ou.select(M), w = x.datum(), k = !/^(n|s)$/.test(w) && c, N = !/^(e|w)$/.test(w) && f, E = x.classed("extent"), A = W(M), C = Ou.mouse(M), z = Ou.select(t(M)).on("keydown.brush", function() {
                32 == Ou.event.keyCode && (E || (y = null, C[0] -= s[1], C[1] -= h[1], E = 2), S());
            }).on("keyup.brush", function() {
                32 == Ou.event.keyCode && 2 == E && (C[0] += s[1], C[1] += h[1], E = 0, S());
            });
            if (Ou.event.changedTouches ? z.on("touchmove.brush", u).on("touchend.brush", d) : z.on("mousemove.brush", u).on("mouseup.brush", d), 
            _.interrupt().selectAll("*").interrupt(), E) C[0] = s[0] - C[0], C[1] = h[0] - C[1]; else if (w) {
                var L = +/w$/.test(w), q = +/^n/.test(w);
                m = [ s[1 - L] - C[0], h[1 - q] - C[1] ], C[0] = s[L], C[1] = h[q];
            } else Ou.event.altKey && (y = C.slice());
            _.style("pointer-events", "none").selectAll(".resize").style("display", null), Ou.select("body").style("cursor", x.style("cursor")), 
            b({
                type: "brushstart"
            }), u();
        }
        var o, a, l = N(n, "brushstart", "brush", "brushend"), c = null, f = null, s = [ 0, 0 ], h = [ 0, 0 ], p = !0, g = !0, v = Sl[0];
        return n.event = function(n) {
            n.each(function() {
                var n = l.of(this, arguments), t = {
                    x: s,
                    y: h,
                    i: o,
                    j: a
                }, e = this.__chart__ || t;
                this.__chart__ = t, dl ? Ou.select(this).transition().each("start.brush", function() {
                    o = e.i, a = e.j, s = e.x, h = e.y, n({
                        type: "brushstart"
                    });
                }).tween("brush:brush", function() {
                    var e = gr(s, t.x), r = gr(h, t.y);
                    return o = a = null, function(i) {
                        s = t.x = e(i), h = t.y = r(i), n({
                            type: "brush",
                            mode: "resize"
                        });
                    };
                }).each("end.brush", function() {
                    o = t.i, a = t.j, n({
                        type: "brush",
                        mode: "resize"
                    }), n({
                        type: "brushend"
                    });
                }) : (n({
                    type: "brushstart"
                }), n({
                    type: "brush",
                    mode: "resize"
                }), n({
                    type: "brushend"
                }));
            });
        }, n.x = function(t) {
            return arguments.length ? (v = Sl[!(c = t) << 1 | !f], n) : c;
        }, n.y = function(t) {
            return arguments.length ? (v = Sl[!c << 1 | !(f = t)], n) : f;
        }, n.clamp = function(t) {
            return arguments.length ? (c && f ? (p = !!t[0], g = !!t[1]) : c ? p = !!t : f && (g = !!t), 
            n) : c && f ? [ p, g ] : c ? p : f ? g : null;
        }, n.extent = function(t) {
            var e, r, i, u, l;
            return arguments.length ? (c && (e = t[0], r = t[1], f && (e = e[0], r = r[0]), 
            o = [ e, r ], c.invert && (e = c(e), r = c(r)), r < e && (l = e, e = r, r = l), 
            e == s[0] && r == s[1] || (s = [ e, r ])), f && (i = t[0], u = t[1], c && (i = i[1], 
            u = u[1]), a = [ i, u ], f.invert && (i = f(i), u = f(u)), u < i && (l = i, i = u, 
            u = l), i == h[0] && u == h[1] || (h = [ i, u ])), n) : (c && (o ? (e = o[0], r = o[1]) : (e = s[0], 
            r = s[1], c.invert && (e = c.invert(e), r = c.invert(r)), r < e && (l = e, e = r, 
            r = l))), f && (a ? (i = a[0], u = a[1]) : (i = h[0], u = h[1], f.invert && (i = f.invert(i), 
            u = f.invert(u)), u < i && (l = i, i = u, u = l))), c && f ? [ [ e, i ], [ r, u ] ] : c ? [ e, r ] : f && [ i, u ]);
        }, n.clear = function() {
            return n.empty() || (s = [ 0, 0 ], h = [ 0, 0 ], o = a = null), n;
        }, n.empty = function() {
            return !!c && s[0] == s[1] || !!f && h[0] == h[1];
        }, Ou.rebind(n, l, "on");
    };
    var wl = {
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
    }, Sl = [ [ "n", "e", "s", "w", "nw", "ne", "se", "sw" ], [ "e", "w" ], [ "n", "s" ], [] ], kl = Zo.format = Jo.timeFormat, Nl = kl.utc, El = Nl("%Y-%m-%dT%H:%M:%S.%LZ");
    kl.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? Pu : El, 
    Pu.parse = function(n) {
        var t = new Date(n);
        return isNaN(t) ? null : t;
    }, Pu.toString = El.toString, Zo.second = Hn(function(n) {
        return new Vo(1e3 * Math.floor(n / 1e3));
    }, function(n, t) {
        n.setTime(n.getTime() + 1e3 * Math.floor(t));
    }, function(n) {
        return n.getSeconds();
    }), Zo.seconds = Zo.second.range, Zo.seconds.utc = Zo.second.utc.range, Zo.minute = Hn(function(n) {
        return new Vo(6e4 * Math.floor(n / 6e4));
    }, function(n, t) {
        n.setTime(n.getTime() + 6e4 * Math.floor(t));
    }, function(n) {
        return n.getMinutes();
    }), Zo.minutes = Zo.minute.range, Zo.minutes.utc = Zo.minute.utc.range, Zo.hour = Hn(function(n) {
        var t = n.getTimezoneOffset() / 60;
        return new Vo(36e5 * (Math.floor(n / 36e5 - t) + t));
    }, function(n, t) {
        n.setTime(n.getTime() + 36e5 * Math.floor(t));
    }, function(n) {
        return n.getHours();
    }), Zo.hours = Zo.hour.range, Zo.hours.utc = Zo.hour.utc.range, Zo.month = Hn(function(n) {
        return (n = Zo.day(n)).setDate(1), n;
    }, function(n, t) {
        n.setMonth(n.getMonth() + t);
    }, function(n) {
        return n.getMonth();
    }), Zo.months = Zo.month.range, Zo.months.utc = Zo.month.utc.range;
    var Al = [ 1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6 ], Cl = [ [ Zo.second, 1 ], [ Zo.second, 5 ], [ Zo.second, 15 ], [ Zo.second, 30 ], [ Zo.minute, 1 ], [ Zo.minute, 5 ], [ Zo.minute, 15 ], [ Zo.minute, 30 ], [ Zo.hour, 1 ], [ Zo.hour, 3 ], [ Zo.hour, 6 ], [ Zo.hour, 12 ], [ Zo.day, 1 ], [ Zo.day, 2 ], [ Zo.week, 1 ], [ Zo.month, 1 ], [ Zo.month, 3 ], [ Zo.year, 1 ] ], zl = kl.multi([ [ ".%L", function(n) {
        return n.getMilliseconds();
    } ], [ ":%S", function(n) {
        return n.getSeconds();
    } ], [ "%I:%M", function(n) {
        return n.getMinutes();
    } ], [ "%I %p", function(n) {
        return n.getHours();
    } ], [ "%a %d", function(n) {
        return n.getDay() && 1 != n.getDate();
    } ], [ "%b %d", function(n) {
        return 1 != n.getDate();
    } ], [ "%B", function(n) {
        return n.getMonth();
    } ], [ "%Y", Ct ] ]), Ll = {
        range: function(n, t, e) {
            return Ou.range(Math.ceil(n / e) * e, +t, e).map(ju);
        },
        floor: m,
        ceil: m
    };
    Cl.year = Zo.year, Zo.scale = function() {
        return Uu(Ou.scale.linear(), Cl, zl);
    };
    var ql = Cl.map(function(n) {
        return [ n[0].utc, n[1] ];
    }), Tl = Nl.multi([ [ ".%L", function(n) {
        return n.getUTCMilliseconds();
    } ], [ ":%S", function(n) {
        return n.getUTCSeconds();
    } ], [ "%I:%M", function(n) {
        return n.getUTCMinutes();
    } ], [ "%I %p", function(n) {
        return n.getUTCHours();
    } ], [ "%a %d", function(n) {
        return n.getUTCDay() && 1 != n.getUTCDate();
    } ], [ "%b %d", function(n) {
        return 1 != n.getUTCDate();
    } ], [ "%B", function(n) {
        return n.getUTCMonth();
    } ], [ "%Y", Ct ] ]);
    ql.year = Zo.year.utc, Zo.scale.utc = function() {
        return Uu(Ou.scale.linear(), ql, Tl);
    }, Ou.text = An(function(n) {
        return n.responseText;
    }), Ou.json = function(n, t) {
        return Cn(n, "application/json", Fu, t);
    }, Ou.html = function(n, t) {
        return Cn(n, "text/html", Hu, t);
    }, Ou.xml = An(function(n) {
        return n.responseXML;
    }), "function" == typeof define && define.amd ? (this.d3 = Ou, define(Ou)) : "object" == typeof module && module.exports ? module.exports = Ou : this.d3 = Ou;
}();