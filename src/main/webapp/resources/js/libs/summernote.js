!function(e) {
    "function" == typeof define && define.amd ? define([ "jquery" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(window.jQuery);
}(function(e) {
    "use strict";
    var t, n = "function" == typeof define && define.amd, o = navigator.userAgent, i = /MSIE|Trident/i.test(o);
    if (i) {
        var r = /MSIE (\d+[.]\d+)/.exec(o);
        r && (t = parseFloat(r[1])), (r = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(o)) && (t = parseFloat(r[1]));
    }
    var a = /Edge\/\d+/.test(o), s = !!window.CodeMirror;
    if (!s && n) if ("function" == typeof __webpack_require__) try {
        require.resolve("codemirror"), s = !0;
    } catch (e) {} else if ("undefined" != typeof require) if (void 0 !== require.resolve) try {
        require.resolve("codemirror"), s = !0;
    } catch (e) {} else void 0 !== require.specified && (s = require.specified("codemirror"));
    var l = "ontouchstart" in window || 0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints, c = {
        isMac: -1 < navigator.appVersion.indexOf("Mac"),
        isMSIE: i,
        isEdge: a,
        isFF: !a && /firefox/i.test(o),
        isPhantom: /PhantomJS/i.test(o),
        isWebkit: !a && /webkit/i.test(o),
        isChrome: !a && /chrome/i.test(o),
        isSafari: !a && /safari/i.test(o),
        browserVersion: t,
        jqueryVersion: parseFloat(e.fn.jquery),
        isSupportAmd: n,
        isSupportTouch: l,
        hasCodeMirror: s,
        isFontInstalled: function(t) {
            var n = "Comic Sans MS" === t ? "Courier New" : "Comic Sans MS", o = e("<div>").css({
                position: "absolute",
                left: "-9999px",
                top: "-9999px",
                fontSize: "200px"
            }).text("mmmmmmmmmwwwwwww").appendTo(document.body), i = o.css("fontFamily", n).width(), r = o.css("fontFamily", t + "," + n).width();
            return o.remove(), i !== r;
        },
        isW3CRangeSupport: !!document.createRange
    }, d = function() {
        var t = 0;
        return {
            eq: function(e) {
                return function(t) {
                    return e === t;
                };
            },
            eq2: function(e, t) {
                return e === t;
            },
            peq2: function(e) {
                return function(t, n) {
                    return t[e] === n[e];
                };
            },
            ok: function() {
                return !0;
            },
            fail: function() {
                return !1;
            },
            self: function(e) {
                return e;
            },
            not: function(e) {
                return function() {
                    return !e.apply(e, arguments);
                };
            },
            and: function(e, t) {
                return function(n) {
                    return e(n) && t(n);
                };
            },
            invoke: function(e, t) {
                return function() {
                    return e[t].apply(e, arguments);
                };
            },
            uniqueId: function(e) {
                var n = ++t + "";
                return e ? e + n : n;
            },
            rect2bnd: function(t) {
                var n = e(document);
                return {
                    top: t.top + n.scrollTop(),
                    left: t.left + n.scrollLeft(),
                    width: t.right - t.left,
                    height: t.bottom - t.top
                };
            },
            invertObject: function(e) {
                var t = {};
                for (var n in e) e.hasOwnProperty(n) && (t[e[n]] = n);
                return t;
            },
            namespaceToCamel: function(e, t) {
                return (t = t || "") + e.split(".").map(function(e) {
                    return e.substring(0, 1).toUpperCase() + e.substring(1);
                }).join("");
            },
            debounce: function(e, t, n) {
                var o;
                return function() {
                    var i = this, r = arguments, a = n && !o;
                    clearTimeout(o), o = setTimeout(function() {
                        o = null, n || e.apply(i, r);
                    }, t), a && e.apply(i, r);
                };
            }
        };
    }(), u = function() {
        var t = function(e) {
            return e[0];
        }, n = function(e) {
            return e[e.length - 1];
        }, o = function(e) {
            return e.slice(1);
        }, i = function(t, n) {
            return e.inArray(n, t);
        }, r = function(e, t) {
            return -1 !== i(e, t);
        };
        return {
            head: t,
            last: n,
            initial: function(e) {
                return e.slice(0, e.length - 1);
            },
            tail: o,
            prev: function(e, t) {
                var n = i(e, t);
                return -1 === n ? null : e[n - 1];
            },
            next: function(e, t) {
                var n = i(e, t);
                return -1 === n ? null : e[n + 1];
            },
            find: function(e, t) {
                for (var n = 0, o = e.length; n < o; n++) {
                    var i = e[n];
                    if (t(i)) return i;
                }
            },
            contains: r,
            all: function(e, t) {
                for (var n = 0, o = e.length; n < o; n++) if (!t(e[n])) return !1;
                return !0;
            },
            sum: function(e, t) {
                return t = t || d.self, e.reduce(function(e, n) {
                    return e + t(n);
                }, 0);
            },
            from: function(e) {
                for (var t = [], n = -1, o = e.length; ++n < o; ) t[n] = e[n];
                return t;
            },
            isEmpty: function(e) {
                return !e || !e.length;
            },
            clusterBy: function(e, i) {
                return e.length ? o(e).reduce(function(e, t) {
                    var o = n(e);
                    return i(n(o), t) ? o[o.length] = t : e[e.length] = [ t ], e;
                }, [ [ t(e) ] ]) : [];
            },
            compact: function(e) {
                for (var t = [], n = 0, o = e.length; n < o; n++) e[n] && t.push(e[n]);
                return t;
            },
            unique: function(e) {
                for (var t = [], n = 0, o = e.length; n < o; n++) r(t, e[n]) || t.push(e[n]);
                return t;
            }
        };
    }(), f = String.fromCharCode(160), h = function() {
        var t = function(t) {
            return t && e(t).hasClass("note-editable");
        }, n = function(e) {
            return e = e.toUpperCase(), function(t) {
                return t && t.nodeName.toUpperCase() === e;
            };
        }, o = function(e) {
            return e && 3 === e.nodeType;
        }, i = function(e) {
            return e && /^BR|^IMG|^HR|^IFRAME|^BUTTON|^INPUT/.test(e.nodeName.toUpperCase());
        }, r = function(e) {
            return !t(e) && e && /^DIV|^P|^LI|^H[1-7]/.test(e.nodeName.toUpperCase());
        }, a = n("PRE"), s = n("LI"), l = n("TABLE"), m = n("DATA"), p = function(e) {
            return !(C(e) || v(e) || g(e) || r(e) || l(e) || k(e) || m(e));
        }, v = function(e) {
            return e && /^UL|^OL/.test(e.nodeName.toUpperCase());
        }, g = n("HR"), b = function(e) {
            return e && /^TD|^TH/.test(e.nodeName.toUpperCase());
        }, k = n("BLOCKQUOTE"), C = function(e) {
            return b(e) || k(e) || t(e);
        }, y = n("A"), w = n("BODY"), I = c.isMSIE && c.browserVersion < 11 ? "&nbsp;" : "<br>", S = function(e) {
            return o(e) ? e.nodeValue.length : e ? e.childNodes.length : 0;
        }, T = function(e) {
            var t = S(e);
            return 0 === t || !o(e) && 1 === t && e.innerHTML === I || !(!u.all(e.childNodes, o) || "" !== e.innerHTML);
        }, N = function(e) {
            i(e) || S(e) || (e.innerHTML = I);
        }, A = function(e, n) {
            for (;e; ) {
                if (n(e)) return e;
                if (t(e)) break;
                e = e.parentNode;
            }
            return null;
        }, E = function(e, n) {
            n = n || d.fail;
            var o = [];
            return A(e, function(e) {
                return t(e) || o.push(e), n(e);
            }), o;
        }, R = function(e, t) {
            t = t || d.fail;
            for (var n = []; e && !t(e); ) n.push(e), e = e.nextSibling;
            return n;
        }, x = function(e, t) {
            var n = t.nextSibling, o = t.parentNode;
            return n ? o.insertBefore(e, n) : o.appendChild(e), e;
        }, P = function(t, n) {
            return e.each(n, function(e, n) {
                t.appendChild(n);
            }), t;
        }, L = function(e) {
            return 0 === e.offset;
        }, H = function(e) {
            return e.offset === S(e.node);
        }, F = function(e) {
            return L(e) || H(e);
        }, D = function(e, t) {
            for (;e && e !== t; ) {
                if (0 !== B(e)) return !1;
                e = e.parentNode;
            }
            return !0;
        }, M = function(e, t) {
            if (!t) return !1;
            for (;e && e !== t; ) {
                if (B(e) !== S(e.parentNode) - 1) return !1;
                e = e.parentNode;
            }
            return !0;
        }, B = function(e) {
            for (var t = 0; e = e.previousSibling; ) t += 1;
            return t;
        }, z = function(e) {
            return !!(e && e.childNodes && e.childNodes.length);
        }, U = function(e, n) {
            var o, i;
            if (0 === e.offset) {
                if (t(e.node)) return null;
                o = e.node.parentNode, i = B(e.node);
            } else i = z(e.node) ? (o = e.node.childNodes[e.offset - 1], S(o)) : (o = e.node, 
            n ? 0 : e.offset - 1);
            return {
                node: o,
                offset: i
            };
        }, $ = function(e, n) {
            var o, i;
            if (S(e.node) === e.offset) {
                if (t(e.node)) return null;
                o = e.node.parentNode, i = B(e.node) + 1;
            } else i = z(e.node) ? (o = e.node.childNodes[e.offset], 0) : (o = e.node, n ? S(e.node) : e.offset + 1);
            return {
                node: o,
                offset: i
            };
        }, O = function(e, t) {
            return e.node === t.node && e.offset === t.offset;
        }, j = function(e, t) {
            var n = t && t.isSkipPaddingBlankHTML, i = t && t.isNotSplitEdgePoint;
            if (F(e) && (o(e.node) || i)) {
                if (L(e)) return e.node;
                if (H(e)) return e.node.nextSibling;
            }
            if (o(e.node)) return e.node.splitText(e.offset);
            var r = e.node.childNodes[e.offset], a = x(e.node.cloneNode(!1), e.node);
            return P(a, R(r)), n || (N(e.node), N(a)), a;
        }, q = function(e, t, n) {
            var o = E(t.node, d.eq(e));
            return o.length ? 1 === o.length ? j(t, n) : o.reduce(function(e, o) {
                return e === t.node && (e = j(t, n)), j({
                    node: o,
                    offset: e ? h.position(e) : S(o)
                }, n);
            }) : null;
        }, K = function(e) {
            return document.createElement(e);
        }, V = function(e, t) {
            if (e && e.parentNode) {
                if (e.removeNode) return e.removeNode(t);
                var n = e.parentNode;
                if (!t) {
                    var o, i, r = [];
                    for (o = 0, i = e.childNodes.length; o < i; o++) r.push(e.childNodes[o]);
                    for (o = 0, i = r.length; o < i; o++) n.insertBefore(r[o], e);
                }
                n.removeChild(e);
            }
        }, W = n("TEXTAREA"), _ = function(e, t) {
            var n = W(e[0]) ? e.val() : e.html();
            return t ? n.replace(/[\n\r]/g, "") : n;
        };
        return {
            NBSP_CHAR: f,
            ZERO_WIDTH_NBSP_CHAR: "\ufeff",
            blank: I,
            emptyPara: "<p>" + I + "</p>",
            makePredByNodeName: n,
            isEditable: t,
            isControlSizing: function(t) {
                return t && e(t).hasClass("note-control-sizing");
            },
            isText: o,
            isElement: function(e) {
                return e && 1 === e.nodeType;
            },
            isVoid: i,
            isPara: r,
            isPurePara: function(e) {
                return r(e) && !s(e);
            },
            isHeading: function(e) {
                return e && /^H[1-7]/.test(e.nodeName.toUpperCase());
            },
            isInline: p,
            isBlock: d.not(p),
            isBodyInline: function(e) {
                return p(e) && !A(e, r);
            },
            isBody: w,
            isParaInline: function(e) {
                return p(e) && !!A(e, r);
            },
            isPre: a,
            isList: v,
            isTable: l,
            isData: m,
            isCell: b,
            isBlockquote: k,
            isBodyContainer: C,
            isAnchor: y,
            isDiv: n("DIV"),
            isLi: s,
            isBR: n("BR"),
            isSpan: n("SPAN"),
            isB: n("B"),
            isU: n("U"),
            isS: n("S"),
            isI: n("I"),
            isImg: n("IMG"),
            isTextarea: W,
            isEmpty: T,
            isEmptyAnchor: d.and(y, T),
            isClosestSibling: function(e, t) {
                return e.nextSibling === t || e.previousSibling === t;
            },
            withClosestSiblings: function(e, t) {
                t = t || d.ok;
                var n = [];
                return e.previousSibling && t(e.previousSibling) && n.push(e.previousSibling), n.push(e), 
                e.nextSibling && t(e.nextSibling) && n.push(e.nextSibling), n;
            },
            nodeLength: S,
            isLeftEdgePoint: L,
            isRightEdgePoint: H,
            isEdgePoint: F,
            isLeftEdgeOf: D,
            isRightEdgeOf: M,
            isLeftEdgePointOf: function(e, t) {
                return L(e) && D(e.node, t);
            },
            isRightEdgePointOf: function(e, t) {
                return H(e) && M(e.node, t);
            },
            prevPoint: U,
            nextPoint: $,
            isSamePoint: O,
            isVisiblePoint: function(e) {
                if (o(e.node) || !z(e.node) || T(e.node)) return !0;
                var t = e.node.childNodes[e.offset - 1], n = e.node.childNodes[e.offset];
                return !(t && !i(t) || n && !i(n));
            },
            prevPointUntil: function(e, t) {
                for (;e; ) {
                    if (t(e)) return e;
                    e = U(e);
                }
                return null;
            },
            nextPointUntil: function(e, t) {
                for (;e; ) {
                    if (t(e)) return e;
                    e = $(e);
                }
                return null;
            },
            isCharPoint: function(e) {
                if (!o(e.node)) return !1;
                var t = e.node.nodeValue.charAt(e.offset - 1);
                return t && " " !== t && t !== f;
            },
            walkPoint: function(e, t, n, o) {
                for (var i = e; i && (n(i), !O(i, t)); ) {
                    var r = o && e.node !== i.node && t.node !== i.node;
                    i = $(i, r);
                }
            },
            ancestor: A,
            singleChildAncestor: function(e, n) {
                for (e = e.parentNode; e && 1 === S(e); ) {
                    if (n(e)) return e;
                    if (t(e)) break;
                    e = e.parentNode;
                }
                return null;
            },
            listAncestor: E,
            lastAncestor: function(e, t) {
                var n = E(e);
                return u.last(n.filter(t));
            },
            listNext: R,
            listPrev: function(e, t) {
                t = t || d.fail;
                for (var n = []; e && !t(e); ) n.push(e), e = e.previousSibling;
                return n;
            },
            listDescendant: function(e, t) {
                var n = [];
                return t = t || d.ok, function o(i) {
                    e !== i && t(i) && n.push(i);
                    for (var r = 0, a = i.childNodes.length; r < a; r++) o(i.childNodes[r]);
                }(e), n;
            },
            commonAncestor: function(t, n) {
                for (var o = E(t), i = n; i; i = i.parentNode) if (-1 < e.inArray(i, o)) return i;
                return null;
            },
            wrap: function(t, n) {
                var o = t.parentNode, i = e("<" + n + ">")[0];
                return o.insertBefore(i, t), i.appendChild(t), i;
            },
            insertAfter: x,
            appendChildNodes: P,
            position: B,
            hasChildren: z,
            makeOffsetPath: function(e, t) {
                return E(t, d.eq(e)).map(B).reverse();
            },
            fromOffsetPath: function(e, t) {
                for (var n = e, o = 0, i = t.length; o < i; o++) n = n.childNodes.length <= t[o] ? n.childNodes[n.childNodes.length - 1] : n.childNodes[t[o]];
                return n;
            },
            splitTree: q,
            splitPoint: function(e, t) {
                var n, o, i = t ? r : C, a = E(e.node, i), s = u.last(a) || e.node;
                o = i(s) ? (n = a[a.length - 2], s) : (n = s).parentNode;
                var l = n && q(n, e, {
                    isSkipPaddingBlankHTML: t,
                    isNotSplitEdgePoint: t
                });
                return l || o !== e.node || (l = e.node.childNodes[e.offset]), {
                    rightNode: l,
                    container: o
                };
            },
            create: K,
            createText: function(e) {
                return document.createTextNode(e);
            },
            remove: V,
            removeWhile: function(e, n) {
                for (;e && !t(e) && n(e); ) {
                    var o = e.parentNode;
                    V(e), e = o;
                }
            },
            replace: function(e, t) {
                if (e.nodeName.toUpperCase() === t.toUpperCase()) return e;
                var n = K(t);
                return e.style.cssText && (n.style.cssText = e.style.cssText), P(n, u.from(e.childNodes)), 
                x(n, e), V(e), n;
            },
            html: function(t, n) {
                var o = _(t);
                return n && (o = o.replace(/<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g, function(e, t, n) {
                    var o = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(n = n.toUpperCase()) && !!t, i = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(n);
                    return e + (o || i ? "\n" : "");
                }), o = e.trim(o)), o;
            },
            value: _,
            posFromPlaceholder: function(t) {
                var n = e(t), o = n.offset(), i = n.outerHeight(!0);
                return {
                    left: o.left,
                    top: o.top + i
                };
            },
            attachEvents: function(e, t) {
                Object.keys(t).forEach(function(n) {
                    e.on(n, t[n]);
                });
            },
            detachEvents: function(e, t) {
                Object.keys(t).forEach(function(n) {
                    e.off(n, t[n]);
                });
            },
            isCustomStyleTag: function(e) {
                return e && !h.isText(e) && u.contains(e.classList, "note-styletag");
            }
        };
    }(), m = function(t, n) {
        var o = this, i = e.summernote.ui;
        return this.memos = {}, this.modules = {}, this.layoutInfo = {}, this.options = n, 
        this.initialize = function() {
            return this.layoutInfo = i.createLayout(t, n), this._initialize(), t.hide(), this;
        }, this.destroy = function() {
            this._destroy(), t.removeData("summernote"), i.removeLayout(t, this.layoutInfo);
        }, this.reset = function() {
            var e = o.isDisabled();
            this.code(h.emptyPara), this._destroy(), this._initialize(), e && o.disable();
        }, this._initialize = function() {
            var t = e.extend({}, this.options.buttons);
            Object.keys(t).forEach(function(e) {
                o.memo("button." + e, t[e]);
            });
            var n = e.extend({}, this.options.modules, e.summernote.plugins || {});
            Object.keys(n).forEach(function(e) {
                o.module(e, n[e], !0);
            }), Object.keys(this.modules).forEach(function(e) {
                o.initializeModule(e);
            });
        }, this._destroy = function() {
            Object.keys(this.modules).reverse().forEach(function(e) {
                o.removeModule(e);
            }), Object.keys(this.memos).forEach(function(e) {
                o.removeMemo(e);
            }), this.triggerEvent("destroy", this);
        }, this.code = function(e) {
            var n = this.invoke("codeview.isActivated");
            if (void 0 === e) return this.invoke("codeview.sync"), n ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html();
            n ? this.layoutInfo.codable.val(e) : this.layoutInfo.editable.html(e), t.val(e), 
            this.triggerEvent("change", e);
        }, this.isDisabled = function() {
            return "false" === this.layoutInfo.editable.attr("contenteditable");
        }, this.enable = function() {
            this.layoutInfo.editable.attr("contenteditable", !0), this.invoke("toolbar.activate", !0), 
            this.triggerEvent("disable", !1);
        }, this.disable = function() {
            this.invoke("codeview.isActivated") && this.invoke("codeview.deactivate"), this.layoutInfo.editable.attr("contenteditable", !1), 
            this.invoke("toolbar.deactivate", !0), this.triggerEvent("disable", !0);
        }, this.triggerEvent = function() {
            var e = u.head(arguments), n = u.tail(u.from(arguments)), o = this.options.callbacks[d.namespaceToCamel(e, "on")];
            o && o.apply(t[0], n), t.trigger("summernote." + e, n);
        }, this.initializeModule = function(e) {
            var n = this.modules[e];
            n.shouldInitialize = n.shouldInitialize || d.ok, n.shouldInitialize() && (n.initialize && n.initialize(), 
            n.events && h.attachEvents(t, n.events));
        }, this.module = function(e, t, n) {
            if (1 === arguments.length) return this.modules[e];
            this.modules[e] = new t(this), n || this.initializeModule(e);
        }, this.removeModule = function(e) {
            var n = this.modules[e];
            n.shouldInitialize() && (n.events && h.detachEvents(t, n.events), n.destroy && n.destroy()), 
            delete this.modules[e];
        }, this.memo = function(e, t) {
            if (1 === arguments.length) return this.memos[e];
            this.memos[e] = t;
        }, this.removeMemo = function(e) {
            this.memos[e] && this.memos[e].destroy && this.memos[e].destroy(), delete this.memos[e];
        }, this.createInvokeHandlerAndUpdateState = function(e, t) {
            return function(n) {
                o.createInvokeHandler(e, t)(n), o.invoke("buttons.updateCurrentStyle");
            };
        }, this.createInvokeHandler = function(t, n) {
            return function(i) {
                i.preventDefault();
                var r = e(i.target);
                o.invoke(t, n || r.closest("[data-value]").data("value"), r);
            };
        }, this.invoke = function() {
            var e = u.head(arguments), t = u.tail(u.from(arguments)), n = e.split("."), o = 1 < n.length, i = o && u.head(n), r = o ? u.last(n) : u.head(n), a = this.modules[i || "editor"];
            return !i && this[r] ? this[r].apply(this, t) : a && a[r] && a.shouldInitialize() ? a[r].apply(a, t) : void 0;
        }, this.initialize();
    };
    e.fn.extend({
        summernote: function() {
            var t = e.type(u.head(arguments)), n = "string" === t, o = "object" === t ? u.head(arguments) : {};
            (o = e.extend({}, e.summernote.options, o)).langInfo = e.extend(!0, {}, e.summernote.lang["en-US"], e.summernote.lang[o.lang]), 
            o.icons = e.extend(!0, {}, e.summernote.options.icons, o.icons), o.tooltip = "auto" === o.tooltip ? !c.isSupportTouch : o.tooltip, 
            this.each(function(t, n) {
                var i = e(n);
                if (!i.data("summernote")) {
                    var r = new m(i, o);
                    i.data("summernote", r), i.data("summernote").triggerEvent("init", r.layoutInfo);
                }
            });
            var i = this.first();
            if (i.length) {
                var r = i.data("summernote");
                if (n) return r.invoke.apply(r, u.from(arguments));
                o.focus && r.invoke("editor.focus");
            }
            return this;
        }
    });
    var p = function(t, n, o, i) {
        this.render = function(r) {
            var a = e(t);
            if (o && o.contents && a.html(o.contents), o && o.className && a.addClass(o.className), 
            o && o.data && e.each(o.data, function(e, t) {
                a.attr("data-" + e, t);
            }), o && o.click && a.on("click", o.click), n) {
                var s = a.find(".note-children-container");
                n.forEach(function(e) {
                    e.render(s.length ? s : a);
                });
            }
            return i && i(a, o), o && o.callback && o.callback(a), r && r.append(a), a;
        };
    }, v_create = function(t, n) {
        return function() {
            var o = e.isArray(arguments[0]) ? arguments[0] : [], i = "object" == typeof arguments[1] ? arguments[1] : arguments[0];
            return i && i.children && (o = i.children), new p(t, o, i, n);
        };
    }, g = v_create('<div class="note-editor note-frame panel panel-default"/>'), b = v_create('<div class="note-toolbar panel-heading"/>'), k = v_create('<div class="note-editing-area"/>'), C = v_create('<textarea class="note-codable"/>'), y = v_create('<div class="note-editable panel-body" contentEditable="true"/>'), w = v_create([ '<div class="note-statusbar">', '  <div class="note-resizebar">', '    <div class="note-icon-bar"/>', '    <div class="note-icon-bar"/>', '    <div class="note-icon-bar"/>', "  </div>", "</div>" ].join("")), I = v_create('<div class="note-editor"/>'), S = v_create('<div class="note-editable" contentEditable="true"/>'), T = v_create('<div class="note-btn-group btn-group">'), N = v_create('<div class="dropdown-menu">', function(t, n) {
        var o = e.isArray(n.items) ? n.items.map(function(e) {
            var t = "string" == typeof e ? e : e.value || "", o = n.template ? n.template(e) : e, i = "object" == typeof e ? e.option : void 0;
            return '<li><a href="#" data-value="' + t + '"' + (void 0 !== i ? ' data-option="' + i + '"' : "") + ">" + o + "</a></li>";
        }).join("") : n.items;
        t.html(o);
    }), A = v_create('<div class="dropdown-menu note-check">', function(t, n) {
        var o = e.isArray(n.items) ? n.items.map(function(e) {
            var t = "string" == typeof e ? e : e.value || "", o = n.template ? n.template(e) : e;
            return '<li><a href="#" data-value="' + t + '">' + E(n.checkClassName) + " " + o + "</a></li>";
        }).join("") : n.items;
        t.html(o);
    }), E = function(e, t) {
        return "<" + (t = t || "i") + ' class="' + e + '"/>';
    }, R = {
        editor: g,
        toolbar: b,
        editingArea: k,
        codable: C,
        editable: y,
        statusbar: w,
        airEditor: I,
        airEditable: S,
        buttonGroup: T,
        dropdown: N,
        dropdownButtonContents: function(e, t) {
            return e + " " + E(t.icons.caret, "span");
        },
        dropdownCheck: A,
        palette: v_create('<div class="note-color-palette"/>', function(e, t) {
            for (var n = [], o = 0, i = t.colors.length; o < i; o++) {
                for (var r = t.eventName, a = t.colors[o], s = [], l = 0, c = a.length; l < c; l++) {
                    var d = a[l];
                    s.push([ '<button type="button" class="note-color-btn"', 'style="background-color:', d, '" ', 'data-event="', r, '" ', 'data-value="', d, '" ', 'title="', d, '" ', 'data-toggle="button" tabindex="-1"></button>' ].join(""));
                }
                n.push('<div class="note-color-row">' + s.join("") + "</div>");
            }
            e.html(n.join("")), t.tooltip && e.find(".note-color-btn").tooltip({
                container: "body",
                trigger: "hover",
                placement: "bottom"
            });
        }),
        dialog: v_create('<div class="modal" aria-hidden="false" tabindex="-1"/>', function(e, t) {
            t.fade && e.addClass("fade"), e.html([ '<div class="modal-dialog">', '  <div class="modal-content">', t.title ? '    <div class="modal-header">      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>      <h4 class="modal-title">' + t.title + "</h4>    </div>" : "", '    <div class="modal-body">' + t.body + "</div>", t.footer ? '    <div class="modal-footer">' + t.footer + "</div>" : "", "  </div>", "</div>" ].join(""));
        }),
        popover: v_create([ '<div class="note-popover popover in">', '  <div class="arrow"/>', '  <div class="popover-content note-children-container"/>', "</div>" ].join(""), function(e, t) {
            var n = void 0 !== t.direction ? t.direction : "bottom";
            e.addClass(n), t.hideArrow && e.find(".arrow").hide();
        }),
        checkbox: v_create('<div class="checkbox"></div>', function(e, t) {
            e.html([ " <label" + (t.id ? ' for="' + t.id + '"' : "") + ">", ' <input type="checkbox"' + (t.id ? ' id="' + t.id + '"' : ""), (t.checked ? " checked" : "") + "/>", t.text ? t.text : "", "</label>" ].join(""));
        }),
        icon: E,
        options: {},
        button: function(e, t) {
            return v_create('<button type="button" class="note-btn btn btn-default btn-sm" tabindex="-1">', function(e, t) {
                t && t.tooltip && self.options.tooltip && e.attr({
                    title: t.tooltip
                }).tooltip({
                    container: "body",
                    trigger: "hover",
                    placement: "bottom"
                });
            })(e, t);
        },
        toggleBtn: function(e, t) {
            e.toggleClass("disabled", !t), e.attr("disabled", !t);
        },
        toggleBtnActive: function(e, t) {
            e.toggleClass("active", t);
        },
        onDialogShown: function(e, t) {
            e.one("shown.bs.modal", t);
        },
        onDialogHidden: function(e, t) {
            e.one("hidden.bs.modal", t);
        },
        showDialog: function(e) {
            e.modal("show");
        },
        hideDialog: function(e) {
            e.modal("hide");
        },
        createLayout: function(e, t) {
            var n = ((self.options = t).airMode ? R.airEditor([ R.editingArea([ R.airEditable() ]) ]) : R.editor([ R.toolbar(), R.editingArea([ R.codable(), R.editable() ]), R.statusbar() ])).render();
            return n.insertAfter(e), {
                note: e,
                editor: n,
                toolbar: n.find(".note-toolbar"),
                editingArea: n.find(".note-editing-area"),
                editable: n.find(".note-editable"),
                codable: n.find(".note-codable"),
                statusbar: n.find(".note-statusbar")
            };
        },
        removeLayout: function(e, t) {
            e.html(t.editable.html()), t.editor.remove(), e.show();
        }
    };
    e.summernote = e.summernote || {
        lang: {}
    }, e.extend(e.summernote.lang, {
        "en-US": {
            font: {
                bold: "Bold",
                italic: "Italic",
                underline: "Underline",
                clear: "Remove Font Style",
                height: "Line Height",
                name: "Font Family",
                strikethrough: "Strikethrough",
                subscript: "Subscript",
                superscript: "Superscript",
                size: "Font Size"
            },
            image: {
                image: "Picture",
                insert: "Insert Image",
                resizeFull: "Resize Full",
                resizeHalf: "Resize Half",
                resizeQuarter: "Resize Quarter",
                floatLeft: "Float Left",
                floatRight: "Float Right",
                floatNone: "Float None",
                shapeRounded: "Shape: Rounded",
                shapeCircle: "Shape: Circle",
                shapeThumbnail: "Shape: Thumbnail",
                shapeNone: "Shape: None",
                dragImageHere: "Drag image or text here",
                dropImage: "Drop image or Text",
                selectFromFiles: "Select from files",
                maximumFileSize: "Maximum file size",
                maximumFileSizeError: "Maximum file size exceeded.",
                url: "Image URL",
                remove: "Remove Image"
            },
            video: {
                video: "Video",
                videoLink: "Video Link",
                insert: "Insert Video",
                url: "Video URL?",
                providers: "(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)"
            },
            link: {
                link: "Link",
                insert: "Insert Link",
                unlink: "Unlink",
                edit: "Edit",
                textToDisplay: "Text to display",
                url: "To what URL should this link go?",
                openInNewWindow: "Open in new window"
            },
            table: {
                table: "Table",
                addRowAbove: "Add row above",
                addRowBelow: "Add row below",
                addColLeft: "Add column left",
                addColRight: "Add column right",
                delRow: "Delete row",
                delCol: "Delete column",
                delTable: "Delete table"
            },
            hr: {
                insert: "Insert Horizontal Rule"
            },
            style: {
                style: "Style",
                p: "Normal",
                blockquote: "Quote",
                pre: "Code",
                h1: "Header 1",
                h2: "Header 2",
                h3: "Header 3",
                h4: "Header 4",
                h5: "Header 5",
                h6: "Header 6"
            },
            lists: {
                unordered: "Unordered list",
                ordered: "Ordered list"
            },
            options: {
                help: "Help",
                fullscreen: "Full Screen",
                codeview: "Code View"
            },
            paragraph: {
                paragraph: "Paragraph",
                outdent: "Outdent",
                indent: "Indent",
                left: "Align left",
                center: "Align center",
                right: "Align right",
                justify: "Justify full"
            },
            color: {
                recent: "Recent Color",
                more: "More Color",
                background: "Background Color",
                foreground: "Foreground Color",
                transparent: "Transparent",
                setTransparent: "Set transparent",
                reset: "Reset",
                resetToDefault: "Reset to default"
            },
            shortcut: {
                shortcuts: "Keyboard shortcuts",
                close: "Close",
                textFormatting: "Text formatting",
                action: "Action",
                paragraphFormatting: "Paragraph formatting",
                documentStyle: "Document Style",
                extraKeys: "Extra keys"
            },
            help: {
                insertParagraph: "Insert Paragraph",
                undo: "Undoes the last command",
                redo: "Redoes the last command",
                tab: "Tab",
                untab: "Untab",
                bold: "Set a bold style",
                italic: "Set a italic style",
                underline: "Set a underline style",
                strikethrough: "Set a strikethrough style",
                removeFormat: "Clean a style",
                justifyLeft: "Set left align",
                justifyCenter: "Set center align",
                justifyRight: "Set right align",
                justifyFull: "Set full align",
                insertUnorderedList: "Toggle unordered list",
                insertOrderedList: "Toggle ordered list",
                outdent: "Outdent on current paragraph",
                indent: "Indent on current paragraph",
                formatPara: "Change current block's format as a paragraph(P tag)",
                formatH1: "Change current block's format as H1",
                formatH2: "Change current block's format as H2",
                formatH3: "Change current block's format as H3",
                formatH4: "Change current block's format as H4",
                formatH5: "Change current block's format as H5",
                formatH6: "Change current block's format as H6",
                insertHorizontalRule: "Insert horizontal rule",
                "linkDialog.show": "Show Link Dialog"
            },
            history: {
                undo: "Undo",
                redo: "Redo"
            },
            specialChar: {
                specialChar: "SPECIAL CHARACTERS",
                select: "Select Special characters"
            }
        }
    });
    var x = function() {
        var e = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SPACE: 32,
            DELETE: 46,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            NUM0: 48,
            NUM1: 49,
            NUM2: 50,
            NUM3: 51,
            NUM4: 52,
            NUM5: 53,
            NUM6: 54,
            NUM7: 55,
            NUM8: 56,
            B: 66,
            E: 69,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            R: 82,
            S: 83,
            U: 85,
            V: 86,
            Y: 89,
            Z: 90,
            SLASH: 191,
            LEFTBRACKET: 219,
            BACKSLASH: 220,
            RIGHTBRACKET: 221
        };
        return {
            isEdit: function(t) {
                return u.contains([ e.BACKSPACE, e.TAB, e.ENTER, e.SPACE, e.DELETE ], t);
            },
            isMove: function(t) {
                return u.contains([ e.LEFT, e.UP, e.RIGHT, e.DOWN ], t);
            },
            nameFromCode: d.invertObject(e),
            code: e
        };
    }(), P = function() {
        var t = function(e, t) {
            var n, o, i = e.parentElement(), r = document.body.createTextRange(), a = u.from(i.childNodes);
            for (n = 0; n < a.length; n++) if (!h.isText(a[n])) {
                if (r.moveToElementText(a[n]), 0 <= r.compareEndPoints("StartToStart", e)) break;
                o = a[n];
            }
            if (0 !== n && h.isText(a[n - 1])) {
                var s = document.body.createTextRange(), l = null;
                s.moveToElementText(o || i), s.collapse(!o), l = o ? o.nextSibling : i.firstChild;
                var c = e.duplicate();
                c.setEndPoint("StartToStart", s);
                for (var d = c.text.replace(/[\r\n]/g, "").length; d > l.nodeValue.length && l.nextSibling; ) d -= l.nodeValue.length, 
                l = l.nextSibling;
                l.nodeValue, t && l.nextSibling && h.isText(l.nextSibling) && d === l.nodeValue.length && (d -= l.nodeValue.length, 
                l = l.nextSibling), i = l, n = d;
            }
            return {
                cont: i,
                offset: n
            };
        }, n = function(e) {
            var t = function(e, n) {
                var o, i;
                if (h.isText(e)) {
                    var r = h.listPrev(e, d.not(h.isText)), a = u.last(r).previousSibling;
                    o = a || e.parentNode, n += u.sum(u.tail(r), h.nodeLength), i = !a;
                } else {
                    if (o = e.childNodes[n] || e, h.isText(o)) return t(o, 0);
                    n = 0, i = !1;
                }
                return {
                    node: o,
                    collapseToStart: i,
                    offset: n
                };
            }, n = document.body.createTextRange(), o = t(e.node, e.offset);
            return n.moveToElementText(o.node), n.collapse(o.collapseToStart), n.moveStart("character", o.offset), 
            n;
        }, o = function(t, i, r, a) {
            this.sc = t, this.so = i, this.ec = r, this.eo = a;
            var s = function() {
                if (c.isW3CRangeSupport) {
                    var e = document.createRange();
                    return e.setStart(t, i), e.setEnd(r, a), e;
                }
                var o = n({
                    node: t,
                    offset: i
                });
                return o.setEndPoint("EndToEnd", n({
                    node: r,
                    offset: a
                })), o;
            };
            this.getPoints = function() {
                return {
                    sc: t,
                    so: i,
                    ec: r,
                    eo: a
                };
            }, this.getStartPoint = function() {
                return {
                    node: t,
                    offset: i
                };
            }, this.getEndPoint = function() {
                return {
                    node: r,
                    offset: a
                };
            }, this.select = function() {
                var e = s();
                if (c.isW3CRangeSupport) {
                    var t = document.getSelection();
                    0 < t.rangeCount && t.removeAllRanges(), t.addRange(e);
                } else e.select();
                return this;
            }, this.scrollIntoView = function(t) {
                var n = e(t).height();
                return t.scrollTop + n < this.sc.offsetTop && (t.scrollTop += Math.abs(t.scrollTop + n - this.sc.offsetTop)), 
                this;
            }, this.normalize = function() {
                var e = function(e, t) {
                    if (h.isVisiblePoint(e) && !h.isEdgePoint(e) || h.isVisiblePoint(e) && h.isRightEdgePoint(e) && !t || h.isVisiblePoint(e) && h.isLeftEdgePoint(e) && t || h.isVisiblePoint(e) && h.isBlock(e.node) && h.isEmpty(e.node)) return e;
                    var n = h.ancestor(e.node, h.isBlock);
                    if ((h.isLeftEdgePointOf(e, n) || h.isVoid(h.prevPoint(e).node)) && !t || (h.isRightEdgePointOf(e, n) || h.isVoid(h.nextPoint(e).node)) && t) {
                        if (h.isVisiblePoint(e)) return e;
                        t = !t;
                    }
                    return (t ? h.nextPointUntil(h.nextPoint(e), h.isVisiblePoint) : h.prevPointUntil(h.prevPoint(e), h.isVisiblePoint)) || e;
                }, t = e(this.getEndPoint(), !1), n = this.isCollapsed() ? t : e(this.getStartPoint(), !0);
                return new o(n.node, n.offset, t.node, t.offset);
            }, this.nodes = function(e, t) {
                e = e || d.ok;
                var n = t && t.includeAncestor, o = t && t.fullyContains, i = this.getStartPoint(), r = this.getEndPoint(), a = [], s = [];
                return h.walkPoint(i, r, function(t) {
                    var i;
                    h.isEditable(t.node) || (o ? (h.isLeftEdgePoint(t) && s.push(t.node), h.isRightEdgePoint(t) && u.contains(s, t.node) && (i = t.node)) : i = n ? h.ancestor(t.node, e) : t.node, 
                    i && e(i) && a.push(i));
                }, !0), u.unique(a);
            }, this.commonAncestor = function() {
                return h.commonAncestor(t, r);
            }, this.expand = function(e) {
                var n = h.ancestor(t, e), s = h.ancestor(r, e);
                if (!n && !s) return new o(t, i, r, a);
                var l = this.getPoints();
                return n && (l.sc = n, l.so = 0), s && (l.ec = s, l.eo = h.nodeLength(s)), new o(l.sc, l.so, l.ec, l.eo);
            }, this.collapse = function(e) {
                return e ? new o(t, i, t, i) : new o(r, a, r, a);
            }, this.splitText = function() {
                var e = t === r, n = this.getPoints();
                return h.isText(r) && !h.isEdgePoint(this.getEndPoint()) && r.splitText(a), h.isText(t) && !h.isEdgePoint(this.getStartPoint()) && (n.sc = t.splitText(i), 
                n.so = 0, e && (n.ec = n.sc, n.eo = a - i)), new o(n.sc, n.so, n.ec, n.eo);
            }, this.deleteContents = function() {
                if (this.isCollapsed()) return this;
                var t = this.splitText(), n = t.nodes(null, {
                    fullyContains: !0
                }), i = h.prevPointUntil(t.getStartPoint(), function(e) {
                    return !u.contains(n, e.node);
                }), r = [];
                return e.each(n, function(e, t) {
                    var n = t.parentNode;
                    i.node !== n && 1 === h.nodeLength(n) && r.push(n), h.remove(t, !1);
                }), e.each(r, function(e, t) {
                    h.remove(t, !1);
                }), new o(i.node, i.offset, i.node, i.offset).normalize();
            };
            var l = function(e) {
                return function() {
                    var n = h.ancestor(t, e);
                    return !!n && n === h.ancestor(r, e);
                };
            };
            this.isOnEditable = l(h.isEditable), this.isOnList = l(h.isList), this.isOnAnchor = l(h.isAnchor), 
            this.isOnCell = l(h.isCell), this.isOnData = l(h.isData), this.isLeftEdgeOf = function(e) {
                if (!h.isLeftEdgePoint(this.getStartPoint())) return !1;
                var t = h.ancestor(this.sc, e);
                return t && h.isLeftEdgeOf(this.sc, t);
            }, this.isCollapsed = function() {
                return t === r && i === a;
            }, this.wrapBodyInlineWithPara = function() {
                if (h.isBodyContainer(t) && h.isEmpty(t)) return t.innerHTML = h.emptyPara, new o(t.firstChild, 0, t.firstChild, 0);
                var n, e = this.normalize();
                if (h.isParaInline(t) || h.isPara(t)) return e;
                if (h.isInline(e.sc)) {
                    var i = h.listAncestor(e.sc, d.not(h.isInline));
                    n = u.last(i), h.isInline(n) || (n = i[i.length - 2] || e.sc.childNodes[e.so]);
                } else n = e.sc.childNodes[0 < e.so ? e.so - 1 : 0];
                var r = h.listPrev(n, h.isParaInline).reverse();
                if ((r = r.concat(h.listNext(n.nextSibling, h.isParaInline))).length) {
                    var a = h.wrap(u.head(r), "p");
                    h.appendChildNodes(a, u.tail(r));
                }
                return this.normalize();
            }, this.insertNode = function(e) {
                var t = this.wrapBodyInlineWithPara().deleteContents(), n = h.splitPoint(t.getStartPoint(), h.isInline(e));
                return n.rightNode ? n.rightNode.parentNode.insertBefore(e, n.rightNode) : n.container.appendChild(e), 
                e;
            }, this.pasteHTML = function(t) {
                var n = e("<div></div>").html(t)[0], o = u.from(n.childNodes), i = this.wrapBodyInlineWithPara().deleteContents();
                return o.reverse().map(function(e) {
                    return i.insertNode(e);
                }).reverse();
            }, this.toString = function() {
                var e = s();
                return c.isW3CRangeSupport ? e.toString() : e.text;
            }, this.getWordRange = function(e) {
                var t = this.getEndPoint();
                if (!h.isCharPoint(t)) return this;
                var n = h.prevPointUntil(t, function(e) {
                    return !h.isCharPoint(e);
                });
                return e && (t = h.nextPointUntil(t, function(e) {
                    return !h.isCharPoint(e);
                })), new o(n.node, n.offset, t.node, t.offset);
            }, this.bookmark = function(e) {
                return {
                    s: {
                        path: h.makeOffsetPath(e, t),
                        offset: i
                    },
                    e: {
                        path: h.makeOffsetPath(e, r),
                        offset: a
                    }
                };
            }, this.paraBookmark = function(e) {
                return {
                    s: {
                        path: u.tail(h.makeOffsetPath(u.head(e), t)),
                        offset: i
                    },
                    e: {
                        path: u.tail(h.makeOffsetPath(u.last(e), r)),
                        offset: a
                    }
                };
            }, this.getClientRects = function() {
                return s().getClientRects();
            };
        };
        return {
            create: function(e, t, n, i) {
                if (4 === arguments.length) return new o(e, t, n, i);
                if (2 === arguments.length) return new o(n = e, i = t, n, i);
                var r = this.createFromSelection();
                return r || 1 !== arguments.length ? r : (r = this.createFromNode(e)).collapse(h.emptyPara === e.innerHTML);
            },
            createFromSelection: function() {
                var e, n, i, r;
                if (c.isW3CRangeSupport) {
                    var a = document.getSelection();
                    if (!a || 0 === a.rangeCount) return null;
                    if (h.isBody(a.anchorNode)) return null;
                    var s = a.getRangeAt(0);
                    e = s.startContainer, n = s.startOffset, i = s.endContainer, r = s.endOffset;
                } else {
                    var l = document.selection.createRange(), d = l.duplicate();
                    d.collapse(!1);
                    var u = l;
                    u.collapse(!0);
                    var f = t(u, !0), m = t(d, !1);
                    h.isText(f.node) && h.isLeftEdgePoint(f) && h.isTextNode(m.node) && h.isRightEdgePoint(m) && m.node.nextSibling === f.node && (f = m), 
                    e = f.cont, n = f.offset, i = m.cont, r = m.offset;
                }
                return new o(e, n, i, r);
            },
            createFromNode: function(e) {
                var t = e, n = 0, o = e, i = h.nodeLength(o);
                return h.isVoid(t) && (n = h.listPrev(t).length - 1, t = t.parentNode), h.isBR(o) ? (i = h.listPrev(o).length - 1, 
                o = o.parentNode) : h.isVoid(o) && (i = h.listPrev(o).length, o = o.parentNode), 
                this.create(t, n, o, i);
            },
            createFromNodeBefore: function(e) {
                return this.createFromNode(e).collapse(!0);
            },
            createFromNodeAfter: function(e) {
                return this.createFromNode(e).collapse();
            },
            createFromBookmark: function(e, t) {
                var n = h.fromOffsetPath(e, t.s.path), i = t.s.offset, r = h.fromOffsetPath(e, t.e.path), a = t.e.offset;
                return new o(n, i, r, a);
            },
            createFromParaBookmark: function(e, t) {
                var n = e.s.offset, i = e.e.offset, r = h.fromOffsetPath(u.head(t), e.s.path), a = h.fromOffsetPath(u.last(t), e.e.path);
                return new o(r, n, a, i);
            }
        };
    }(), L_readFileAsDataURL = function(t) {
        return e.Deferred(function(n) {
            e.extend(new FileReader(), {
                onload: function(e) {
                    var t = e.target.result;
                    n.resolve(t);
                },
                onerror: function() {
                    n.reject(this);
                }
            }).readAsDataURL(t);
        }).promise();
    }, L_createImage = function(t) {
        return e.Deferred(function(n) {
            var o = e("<img>");
            o.one("load", function() {
                o.off("error abort"), n.resolve(o);
            }).one("error abort", function() {
                o.off("load").detach(), n.reject(o);
            }).css({
                display: "none"
            }).appendTo(document.body).attr("src", t);
        }).promise();
    }, H = function(e) {
        var t = [], n = -1, o = e[0], r = function(t) {
            null !== t.contents && e.html(t.contents), null !== t.bookmark && P.createFromBookmark(o, t.bookmark).select();
        };
        this.rewind = function() {
            e.html() !== t[n].contents && this.recordUndo(), r(t[n = 0]);
        }, this.reset = function() {
            t = [], n = -1, e.html(""), this.recordUndo();
        }, this.undo = function() {
            e.html() !== t[n].contents && this.recordUndo(), 0 < n && r(t[--n]);
        }, this.redo = function() {
            t.length - 1 > n && r(t[++n]);
        }, this.recordUndo = function() {
            n++, t.length > n && (t = t.slice(0, n)), t.push(function() {
                var t = P.create(o);
                return {
                    contents: e.html(),
                    bookmark: t ? t.bookmark(o) : {
                        s: {
                            path: [],
                            offset: 0
                        },
                        e: {
                            path: [],
                            offset: 0
                        }
                    }
                };
            }());
        };
    }, F = function() {
        var t = function(t, n) {
            if (c.jqueryVersion < 1.9) {
                var o = {};
                return e.each(n, function(e, n) {
                    o[n] = t.css(n);
                }), o;
            }
            return t.css.call(t, n);
        };
        this.fromNode = function(e) {
            var n = t(e, [ "font-family", "font-size", "text-align", "list-style-type", "line-height" ]) || {};
            return n["font-size"] = parseInt(n["font-size"], 10), n;
        }, this.stylePara = function(t, n) {
            e.each(t.nodes(h.isPara, {
                includeAncestor: !0
            }), function(t, o) {
                e(o).css(n);
            });
        }, this.styleNodes = function(t, n) {
            t = t.splitText();
            var o = n && n.nodeName || "SPAN", i = !(!n || !n.expandClosestSibling), r = !(!n || !n.onlyPartialContains);
            if (t.isCollapsed()) return [ t.insertNode(h.create(o)) ];
            var a = h.makePredByNodeName(o), s = t.nodes(h.isText, {
                fullyContains: !0
            }).map(function(e) {
                return h.singleChildAncestor(e, a) || h.wrap(e, o);
            });
            if (i) {
                if (r) {
                    var l = t.nodes();
                    a = d.and(a, function(e) {
                        return u.contains(l, e);
                    });
                }
                return s.map(function(t) {
                    var n = h.withClosestSiblings(t, a), o = u.head(n), i = u.tail(n);
                    return e.each(i, function(e, t) {
                        h.appendChildNodes(o, t.childNodes), h.remove(t);
                    }), u.head(n);
                });
            }
            return s;
        }, this.current = function(t) {
            var n = e(h.isElement(t.sc) ? t.sc : t.sc.parentNode), o = this.fromNode(n);
            try {
                o = e.extend(o, {
                    "font-bold": document.queryCommandState("bold") ? "bold" : "normal",
                    "font-italic": document.queryCommandState("italic") ? "italic" : "normal",
                    "font-underline": document.queryCommandState("underline") ? "underline" : "normal",
                    "font-subscript": document.queryCommandState("subscript") ? "subscript" : "normal",
                    "font-superscript": document.queryCommandState("superscript") ? "superscript" : "normal",
                    "font-strikethrough": document.queryCommandState("strikethrough") ? "strikethrough" : "normal",
                    "font-family": document.queryCommandValue("fontname") || o["font-family"]
                });
            } catch (e) {}
            if (t.isOnList()) {
                var i = -1 < e.inArray(o["list-style-type"], [ "circle", "disc", "disc-leading-zero", "square" ]);
                o["list-style"] = i ? "unordered" : "ordered";
            } else o["list-style"] = "none";
            var r = h.ancestor(t.sc, h.isPara);
            if (r && r.style["line-height"]) o["line-height"] = r.style.lineHeight; else {
                var a = parseInt(o["line-height"], 10) / parseInt(o["font-size"], 10);
                o["line-height"] = a.toFixed(1);
            }
            return o.anchor = t.isOnAnchor() && h.ancestor(t.sc, h.isAnchor), o.ancestors = h.listAncestor(t.sc, h.isEditable), 
            o.range = t, o;
        };
    }, D = function() {
        var t = this;
        this.insertOrderedList = function(e) {
            this.toggleList("OL", e);
        }, this.insertUnorderedList = function(e) {
            this.toggleList("UL", e);
        }, this.indent = function(t) {
            var n = this, o = P.create(t).wrapBodyInlineWithPara(), i = o.nodes(h.isPara, {
                includeAncestor: !0
            }), r = u.clusterBy(i, d.peq2("parentNode"));
            e.each(r, function(t, o) {
                var i = u.head(o);
                h.isLi(i) ? n.wrapList(o, i.parentNode.nodeName) : e.each(o, function(t, n) {
                    e(n).css("marginLeft", function(e, t) {
                        return (parseInt(t, 10) || 0) + 25;
                    });
                });
            }), o.select();
        }, this.outdent = function(t) {
            var n = this, o = P.create(t).wrapBodyInlineWithPara(), i = o.nodes(h.isPara, {
                includeAncestor: !0
            }), r = u.clusterBy(i, d.peq2("parentNode"));
            e.each(r, function(t, o) {
                var i = u.head(o);
                h.isLi(i) ? n.releaseList([ o ]) : e.each(o, function(t, n) {
                    e(n).css("marginLeft", function(e, t) {
                        return 25 < (t = parseInt(t, 10) || 0) ? t - 25 : "";
                    });
                });
            }), o.select();
        }, this.toggleList = function(n, o) {
            var i = P.create(o).wrapBodyInlineWithPara(), r = i.nodes(h.isPara, {
                includeAncestor: !0
            }), a = i.paraBookmark(r), s = u.clusterBy(r, d.peq2("parentNode"));
            if (u.find(r, h.isPurePara)) {
                var l = [];
                e.each(s, function(e, o) {
                    l = l.concat(t.wrapList(o, n));
                }), r = l;
            } else {
                var c = i.nodes(h.isList, {
                    includeAncestor: !0
                }).filter(function(t) {
                    return !e.nodeName(t, n);
                });
                c.length ? e.each(c, function(e, t) {
                    h.replace(t, n);
                }) : r = this.releaseList(s, !0);
            }
            P.createFromParaBookmark(a, r).select();
        }, this.wrapList = function(e, t) {
            var n = u.head(e), o = u.last(e), i = h.isList(n.previousSibling) && n.previousSibling, r = h.isList(o.nextSibling) && o.nextSibling, a = i || h.insertAfter(h.create(t || "UL"), o);
            return e = e.map(function(e) {
                return h.isPurePara(e) ? h.replace(e, "LI") : e;
            }), h.appendChildNodes(a, e), r && (h.appendChildNodes(a, u.from(r.childNodes)), 
            h.remove(r)), e;
        }, this.releaseList = function(t, n) {
            var o = [];
            return e.each(t, function(t, i) {
                var r = u.head(i), a = u.last(i), s = n ? h.lastAncestor(r, h.isList) : r.parentNode, l = 1 < s.childNodes.length ? h.splitTree(s, {
                    node: a.parentNode,
                    offset: h.position(a) + 1
                }, {
                    isSkipPaddingBlankHTML: !0
                }) : null, c = h.splitTree(s, {
                    node: r.parentNode,
                    offset: h.position(r)
                }, {
                    isSkipPaddingBlankHTML: !0
                });
                i = n ? h.listDescendant(c, h.isLi) : u.from(c.childNodes).filter(h.isLi), !n && h.isList(s.parentNode) || (i = i.map(function(e) {
                    return h.replace(e, "P");
                })), e.each(u.from(i).reverse(), function(e, t) {
                    h.insertAfter(t, s);
                });
                var d = u.compact([ s, c, l ]);
                e.each(d, function(t, n) {
                    var o = [ n ].concat(h.listDescendant(n, h.isList));
                    e.each(o.reverse(), function(e, t) {
                        h.nodeLength(t) || h.remove(t, !0);
                    });
                }), o = o.concat(i);
            }), o;
        };
    }, M = function() {
        var t = new D();
        this.insertTab = function(e, t) {
            var n = h.createText(new Array(t + 1).join(h.NBSP_CHAR));
            (e = e.deleteContents()).insertNode(n, !0), (e = P.create(n, t)).select();
        }, this.insertParagraph = function(n) {
            var o = P.create(n);
            o = (o = o.deleteContents()).wrapBodyInlineWithPara();
            var i, r = h.ancestor(o.sc, h.isPara);
            if (r) {
                if (h.isEmpty(r) && h.isLi(r)) return void t.toggleList(r.parentNode.nodeName);
                if (h.isEmpty(r) && h.isPara(r) && h.isBlockquote(r.parentNode)) h.insertAfter(r, r.parentNode), 
                i = r; else {
                    i = h.splitTree(r, o.getStartPoint());
                    var a = h.listDescendant(r, h.isEmptyAnchor);
                    a = a.concat(h.listDescendant(i, h.isEmptyAnchor)), e.each(a, function(e, t) {
                        h.remove(t);
                    }), (h.isHeading(i) || h.isPre(i) || h.isCustomStyleTag(i)) && h.isEmpty(i) && (i = h.replace(i, "p"));
                }
            } else {
                var s = o.sc.childNodes[o.so];
                i = e(h.emptyPara)[0], s ? o.sc.insertBefore(i, s) : o.sc.appendChild(i);
            }
            P.create(i, 0).normalize().select().scrollIntoView(n);
        };
    }, B = function(e, t, n, o) {
        function r(e, t, n, o, i, r, a) {
            var s = {
                baseRow: n,
                baseCell: o,
                isRowSpan: i,
                isColSpan: r,
                isVirtual: a
            };
            m[e] || (m[e] = []), m[e][t] = s;
        }
        function a(e, t, n, o) {
            return {
                baseCell: e.baseCell,
                action: t,
                virtualTable: {
                    rowIndex: n,
                    cellIndex: o
                }
            };
        }
        function s(e, t) {
            if (!m[e]) return t;
            if (!m[e][t]) return t;
            for (var n = t; m[e][n]; ) if (n++, !m[e][n]) return n;
        }
        function l(e, t) {
            var n = s(e.rowIndex, t.cellIndex), o = 1 < t.colSpan, i = 1 < t.rowSpan, a = e.rowIndex === h.rowPos && t.cellIndex === h.colPos;
            r(e.rowIndex, n, e, t, i, o, !1);
            var l = t.attributes.rowSpan ? parseInt(t.attributes.rowSpan.value, 10) : 0;
            if (1 < l) for (var d = 1; d < l; d++) {
                var u = e.rowIndex + d;
                c(u, n, t, a), r(u, n, e, t, !0, o, !0);
            }
            var f = t.attributes.colSpan ? parseInt(t.attributes.colSpan.value, 10) : 0;
            if (1 < f) for (var m = 1; m < f; m++) {
                var p = s(e.rowIndex, n + m);
                c(e.rowIndex, p, t, a), r(e.rowIndex, p, e, t, i, !0, !0);
            }
        }
        function c(e, t, n, o) {
            e === h.rowPos && h.colPos >= n.cellIndex && n.cellIndex <= t && !o && h.colPos++;
        }
        function u(e) {
            switch (t) {
              case B.where.Column:
                if (e.isColSpan) return B.resultAction.SubtractSpanCount;
                break;

              case B.where.Row:
                if (!e.isVirtual && e.isRowSpan) return B.resultAction.AddCell;
                if (e.isRowSpan) return B.resultAction.SubtractSpanCount;
            }
            return B.resultAction.RemoveCell;
        }
        function f(e) {
            switch (t) {
              case B.where.Column:
                if (e.isColSpan) return B.resultAction.SumSpanCount;
                if (e.isRowSpan && e.isVirtual) return B.resultAction.Ignore;
                break;

              case B.where.Row:
                if (e.isRowSpan) return B.resultAction.SumSpanCount;
                if (e.isColSpan && e.isVirtual) return B.resultAction.Ignore;
            }
            return B.resultAction.AddCell;
        }
        var h = {
            colPos: 0,
            rowPos: 0
        }, m = [], p = [];
        this.getActionList = function() {
            for (var e = t === B.where.Row ? h.rowPos : -1, o = t === B.where.Column ? h.colPos : -1, i = 0, r = !0; r; ) {
                var s = 0 <= e ? e : i, l = 0 <= o ? o : i, c = m[s];
                if (!c) return r = !1, p;
                var d = c[l];
                if (!d) return r = !1, p;
                var v = B.resultAction.Ignore;
                switch (n) {
                  case B.requestAction.Add:
                    v = f(d);
                    break;

                  case B.requestAction.Delete:
                    v = u(d);
                }
                p.push(a(d, v, s, l)), i++;
            }
            return p;
        }, e && e.tagName && ("td" === e.tagName.toLowerCase() || "th" === e.tagName.toLowerCase()) ? (h.colPos = e.cellIndex, 
        e.parentElement && e.parentElement.tagName && "tr" === e.parentElement.tagName.toLowerCase() ? h.rowPos = e.parentElement.rowIndex : console.error("Impossible to identify start Row point.", e)) : console.error("Impossible to identify start Cell point.", e), 
        function() {
            for (var e = o.rows, t = 0; t < e.length; t++) for (var n = e[t].cells, i = 0; i < n.length; i++) l(e[t], n[i]);
        }();
    };
    B.where = {
        Row: 0,
        Column: 1
    }, B.requestAction = {
        Add: 0,
        Delete: 1
    }, B.resultAction = {
        Ignore: 0,
        SubtractSpanCount: 1,
        RemoveCell: 2,
        AddCell: 3,
        SumSpanCount: 4
    };
    var z, U = function() {
        this.tab = function(e, t) {
            var n = h.ancestor(e.commonAncestor(), h.isCell), o = h.ancestor(n, h.isTable), i = h.listDescendant(o, h.isCell), r = u[t ? "prev" : "next"](i, n);
            r && P.create(r, 0).select();
        }, this.addRow = function(t, n) {
            for (var o = h.ancestor(t.commonAncestor(), h.isCell), i = e(o).closest("tr"), r = this.recoverAttributes(i), a = e("<tr" + r + "></tr>"), s = new B(o, B.where.Row, B.requestAction.Add, e(i).closest("table")[0]).getActionList(), l = 0; l < s.length; l++) {
                var c = s[l], d = this.recoverAttributes(c.baseCell);
                switch (c.action) {
                  case B.resultAction.AddCell:
                    a.append("<td" + d + ">" + h.blank + "</td>");
                    break;

                  case B.resultAction.SumSpanCount:
                    if ("top" === n && (c.baseCell.parent ? c.baseCell.closest("tr").rowIndex : 0) <= i[0].rowIndex) {
                        var u = e("<div></div>").append(e("<td" + d + ">" + h.blank + "</td>").removeAttr("rowspan")).html();
                        a.append(u);
                        break;
                    }
                    var f = parseInt(c.baseCell.rowSpan, 10);
                    f++, c.baseCell.setAttribute("rowSpan", f);
                }
            }
            if ("top" === n) i.before(a); else {
                if (1 < o.rowSpan) {
                    var m = i[0].rowIndex + (o.rowSpan - 2);
                    return void e(e(i).parent().find("tr")[m]).after(e(a));
                }
                i.after(a);
            }
        }, this.addCol = function(t, n) {
            var o = h.ancestor(t.commonAncestor(), h.isCell), i = e(o).closest("tr");
            e(i).siblings().push(i);
            for (var r = new B(o, B.where.Column, B.requestAction.Add, e(i).closest("table")[0]).getActionList(), a = 0; a < r.length; a++) {
                var s = r[a], l = this.recoverAttributes(s.baseCell);
                switch (s.action) {
                  case B.resultAction.AddCell:
                    "right" === n ? e(s.baseCell).after("<td" + l + ">" + h.blank + "</td>") : e(s.baseCell).before("<td" + l + ">" + h.blank + "</td>");
                    break;

                  case B.resultAction.SumSpanCount:
                    if ("right" === n) {
                        var c = parseInt(s.baseCell.colSpan, 10);
                        c++, s.baseCell.setAttribute("colSpan", c);
                    } else e(s.baseCell).before("<td" + l + ">" + h.blank + "</td>");
                }
            }
        }, this.recoverAttributes = function(e) {
            var t = "";
            if (!e) return t;
            for (var n = e.attributes || [], o = 0; o < n.length; o++) "id" !== n[o].name.toLowerCase() && n[o].specified && (t += " " + n[o].name + "='" + n[o].value + "'");
            return t;
        }, this.deleteRow = function(t) {
            for (var n = h.ancestor(t.commonAncestor(), h.isCell), o = e(n).closest("tr"), i = o.children("td, th").index(e(n)), r = o[0].rowIndex, a = new B(n, B.where.Row, B.requestAction.Delete, e(o).closest("table")[0]).getActionList(), s = 0; s < a.length; s++) if (a[s]) {
                var l = a[s].baseCell, c = a[s].virtualTable, d = l.rowSpan && 1 < l.rowSpan, u = d ? parseInt(l.rowSpan, 10) : 0;
                switch (a[s].action) {
                  case B.resultAction.Ignore:
                    continue;

                  case B.resultAction.AddCell:
                    var f = o.next("tr")[0];
                    if (!f) continue;
                    var m = o[0].cells[i];
                    d && (2 < u ? (u--, f.insertBefore(m, f.cells[i]), f.cells[i].setAttribute("rowSpan", u), 
                    f.cells[i].innerHTML = "") : 2 === u && (f.insertBefore(m, f.cells[i]), f.cells[i].removeAttribute("rowSpan"), 
                    f.cells[i].innerHTML = ""));
                    continue;

                  case B.resultAction.SubtractSpanCount:
                    d && (2 < u ? (u--, l.setAttribute("rowSpan", u), c.rowIndex !== r && l.cellIndex === i && (l.innerHTML = "")) : 2 === u && (l.removeAttribute("rowSpan"), 
                    c.rowIndex !== r && l.cellIndex === i && (l.innerHTML = "")));
                    continue;

                  case B.resultAction.RemoveCell:
                    continue;
                }
            }
            o.remove();
        }, this.deleteCol = function(t) {
            for (var n = h.ancestor(t.commonAncestor(), h.isCell), o = e(n).closest("tr"), i = o.children("td, th").index(e(n)), r = new B(n, B.where.Column, B.requestAction.Delete, e(o).closest("table")[0]).getActionList(), a = 0; a < r.length; a++) if (r[a]) switch (r[a].action) {
              case B.resultAction.Ignore:
                continue;

              case B.resultAction.SubtractSpanCount:
                var s = r[a].baseCell;
                if (s.colSpan && 1 < s.colSpan) {
                    var l = s.colSpan ? parseInt(s.colSpan, 10) : 0;
                    2 < l ? (l--, s.setAttribute("colSpan", l), s.cellIndex === i && (s.innerHTML = "")) : 2 === l && (s.removeAttribute("colSpan"), 
                    s.cellIndex === i && (s.innerHTML = ""));
                }
                continue;

              case B.resultAction.RemoveCell:
                h.remove(r[a].baseCell, !0);
                continue;
            }
        }, this.createTable = function(t, n, o) {
            for (var i, r = [], a = 0; a < t; a++) r.push("<td>" + h.blank + "</td>");
            i = r.join("");
            for (var s, l = [], c = 0; c < n; c++) l.push("<tr>" + i + "</tr>");
            s = l.join("");
            var d = e("<table>" + s + "</table>");
            return o && o.tableClassName && d.addClass(o.tableClassName), d[0];
        }, this.deleteTable = function(t) {
            var n = h.ancestor(t.commonAncestor(), h.isCell);
            e(n).closest("table").remove();
        };
    };
    c.hasCodeMirror && (c.isSupportAmd ? require([ "codemirror" ], function(e) {
        z = e;
    }) : z = window.CodeMirror), e.summernote = e.extend(e.summernote, {
        version: "0.8.8",
        ui: R,
        dom: h,
        plugins: {},
        options: {
            modules: {
                editor: function(t) {
                    var n = this, o = t.layoutInfo.note, i = t.layoutInfo.editor, r = t.layoutInfo.editable, a = t.options, s = a.langInfo, l = r[0], f = null, m = new F(), p = new U(), v = new M(), g = new D(), b = new H(r);
                    this.initialize = function() {
                        r.on("keydown", function(e) {
                            e.keyCode === x.code.ENTER && t.triggerEvent("enter", e), t.triggerEvent("keydown", e), 
                            e.isDefaultPrevented() || (a.shortcuts ? n.handleKeyMap(e) : n.preventDefaultEditableShortCuts(e));
                        }).on("keyup", function(e) {
                            t.triggerEvent("keyup", e);
                        }).on("focus", function(e) {
                            t.triggerEvent("focus", e);
                        }).on("blur", function(e) {
                            t.triggerEvent("blur", e);
                        }).on("mousedown", function(e) {
                            t.triggerEvent("mousedown", e);
                        }).on("mouseup", function(e) {
                            t.triggerEvent("mouseup", e);
                        }).on("scroll", function(e) {
                            t.triggerEvent("scroll", e);
                        }).on("paste", function(e) {
                            t.triggerEvent("paste", e);
                        }), r.html(h.html(o) || h.emptyPara);
                        var e = c.isMSIE ? "DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted" : "input";
                        r.on(e, d.debounce(function() {
                            t.triggerEvent("change", r.html());
                        }, 100)), i.on("focusin", function(e) {
                            t.triggerEvent("focusin", e);
                        }).on("focusout", function(e) {
                            t.triggerEvent("focusout", e);
                        }), a.airMode || (a.width && i.outerWidth(a.width), a.height && r.outerHeight(a.height), 
                        a.maxHeight && r.css("max-height", a.maxHeight), a.minHeight && r.css("min-height", a.minHeight)), 
                        b.recordUndo();
                    }, this.destroy = function() {
                        r.off();
                    }, this.handleKeyMap = function(e) {
                        var n = a.keyMap[c.isMac ? "mac" : "pc"], o = [];
                        e.metaKey && o.push("CMD"), e.ctrlKey && !e.altKey && o.push("CTRL"), e.shiftKey && o.push("SHIFT");
                        var i = x.nameFromCode[e.keyCode];
                        i && o.push(i);
                        var r = n[o.join("+")];
                        r ? (e.preventDefault(), t.invoke(r)) : x.isEdit(e.keyCode) && this.afterCommand();
                    }, this.preventDefaultEditableShortCuts = function(e) {
                        (e.ctrlKey || e.metaKey) && u.contains([ 66, 73, 85 ], e.keyCode) && e.preventDefault();
                    }, this.createRange = function() {
                        return this.focus(), P.create(l);
                    }, this.saveRange = function(e) {
                        f = this.createRange(), e && f.collapse().select();
                    }, this.restoreRange = function() {
                        f && (f.select(), this.focus());
                    }, this.saveTarget = function(e) {
                        r.data("target", e);
                    }, this.clearTarget = function() {
                        r.removeData("target");
                    }, this.restoreTarget = function() {
                        return r.data("target");
                    }, this.currentStyle = function() {
                        var e = P.create();
                        return e && (e = e.normalize()), e ? m.current(e) : m.fromNode(r);
                    }, this.styleFromNode = function(e) {
                        return m.fromNode(e);
                    }, this.undo = function() {
                        t.triggerEvent("before.command", r.html()), b.undo(), t.triggerEvent("change", r.html());
                    }, t.memo("help.undo", s.help.undo), this.redo = function() {
                        t.triggerEvent("before.command", r.html()), b.redo(), t.triggerEvent("change", r.html());
                    }, t.memo("help.redo", s.help.redo);
                    for (var k = this.beforeCommand = function() {
                        t.triggerEvent("before.command", r.html()), n.focus();
                    }, C = this.afterCommand = function(e) {
                        b.recordUndo(), e || t.triggerEvent("change", r.html());
                    }, y = [ "bold", "italic", "underline", "strikethrough", "superscript", "subscript", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "formatBlock", "removeFormat", "backColor", "fontName" ], w = 0, I = y.length; w < I; w++) this[y[w]] = function(e) {
                        return function(t) {
                            k(), document.execCommand(e, !1, t), C(!0);
                        };
                    }(y[w]), t.memo("help." + y[w], s.help[y[w]]);
                    for (this.tab = function() {
                        var e = this.createRange();
                        e.isCollapsed() && e.isOnCell() ? p.tab(e) : (k(), v.insertTab(e, a.tabSize), C());
                    }, t.memo("help.tab", s.help.tab), this.untab = function() {
                        var e = this.createRange();
                        e.isCollapsed() && e.isOnCell() && p.tab(e, !0);
                    }, t.memo("help.untab", s.help.untab), this.wrapCommand = function(e) {
                        return function() {
                            k(), e.apply(n, arguments), C();
                        };
                    }, this.insertParagraph = this.wrapCommand(function() {
                        v.insertParagraph(l);
                    }), t.memo("help.insertParagraph", s.help.insertParagraph), this.insertOrderedList = this.wrapCommand(function() {
                        g.insertOrderedList(l);
                    }), t.memo("help.insertOrderedList", s.help.insertOrderedList), this.insertUnorderedList = this.wrapCommand(function() {
                        g.insertUnorderedList(l);
                    }), t.memo("help.insertUnorderedList", s.help.insertUnorderedList), this.indent = this.wrapCommand(function() {
                        g.indent(l);
                    }), t.memo("help.indent", s.help.indent), this.outdent = this.wrapCommand(function() {
                        g.outdent(l);
                    }), t.memo("help.outdent", s.help.outdent), this.insertImage = function(e, n) {
                        return L_createImage(e, n).then(function(e) {
                            k(), "function" == typeof n ? n(e) : ("string" == typeof n && e.attr("data-filename", n), 
                            e.css("width", Math.min(r.width(), e.width()))), e.show(), P.create(l).insertNode(e[0]), 
                            P.createFromNodeAfter(e[0]).select(), C();
                        }).fail(function(e) {
                            t.triggerEvent("image.upload.error", e);
                        });
                    }, this.insertImages = function(o) {
                        e.each(o, function(e, o) {
                            var i = o.name;
                            a.maximumImageFileSize && a.maximumImageFileSize < o.size ? t.triggerEvent("image.upload.error", s.image.maximumFileSizeError) : L_readFileAsDataURL(o).then(function(e) {
                                return n.insertImage(e, i);
                            }).fail(function() {
                                t.triggerEvent("image.upload.error");
                            });
                        });
                    }, this.insertImagesOrCallback = function(e) {
                        a.callbacks.onImageUpload ? t.triggerEvent("image.upload", e) : this.insertImages(e);
                    }, this.insertNode = this.wrapCommand(function(e) {
                        this.createRange().insertNode(e), P.createFromNodeAfter(e).select();
                    }), this.insertText = this.wrapCommand(function(e) {
                        var t = this.createRange().insertNode(h.createText(e));
                        P.create(t, h.nodeLength(t)).select();
                    }), this.getSelectedText = function() {
                        var e = this.createRange();
                        return e.isOnAnchor() && (e = P.createFromNode(h.ancestor(e.sc, h.isAnchor))), e.toString();
                    }, this.pasteHTML = this.wrapCommand(function(e) {
                        var t = this.createRange().pasteHTML(e);
                        P.createFromNodeAfter(u.last(t)).select();
                    }), this.formatBlock = this.wrapCommand(function(e, n) {
                        var o = t.options.callbacks.onApplyCustomStyle;
                        o ? o.call(this, n, t, this.onFormatBlock) : this.onFormatBlock(e);
                    }), this.onFormatBlock = function(e) {
                        e = c.isMSIE ? "<" + e + ">" : e, document.execCommand("FormatBlock", !1, e);
                    }, this.formatPara = function() {
                        this.formatBlock("P");
                    }, t.memo("help.formatPara", s.help.formatPara), w = 1; w <= 6; w++) this["formatH" + w] = function(e) {
                        return function() {
                            this.formatBlock("H" + e);
                        };
                    }(w), t.memo("help.formatH" + w, s.help["formatH" + w]);
                    this.fontSize = function(t) {
                        var n = this.createRange();
                        if (n && n.isCollapsed()) {
                            var o = m.styleNodes(n), i = u.head(o);
                            e(o).css({
                                "font-size": t + "px"
                            }), i && !h.nodeLength(i) && (i.innerHTML = h.ZERO_WIDTH_NBSP_CHAR, P.createFromNodeAfter(i.firstChild).select(), 
                            r.data("bogus", i));
                        } else k(), e(m.styleNodes(n)).css({
                            "font-size": t + "px"
                        }), C();
                    }, this.insertHorizontalRule = this.wrapCommand(function() {
                        var e = this.createRange().insertNode(h.create("HR"));
                        e.nextSibling && P.create(e.nextSibling, 0).normalize().select();
                    }), t.memo("help.insertHorizontalRule", s.help.insertHorizontalRule), this.removeBogus = function() {
                        var e = r.data("bogus");
                        if (e) {
                            var t = u.find(u.from(e.childNodes), h.isText), n = t.nodeValue.indexOf(h.ZERO_WIDTH_NBSP_CHAR);
                            -1 !== n && t.deleteData(n, 1), h.isEmpty(e) && h.remove(e), r.removeData("bogus");
                        }
                    }, this.lineHeight = this.wrapCommand(function(e) {
                        m.stylePara(this.createRange(), {
                            lineHeight: e
                        });
                    }), this.unlink = function() {
                        var e = this.createRange();
                        if (e.isOnAnchor()) {
                            var t = h.ancestor(e.sc, h.isAnchor);
                            (e = P.createFromNode(t)).select(), k(), document.execCommand("unlink"), C();
                        }
                    }, this.createLink = this.wrapCommand(function(t) {
                        var n = t.url, o = t.text, i = t.isNewWindow, r = t.range || this.createRange(), s = r.toString() !== o;
                        "string" == typeof n && (n = n.trim()), n = a.onCreateLink ? a.onCreateLink(n) : /^[A-Za-z][A-Za-z0-9+-.]*\:[\/\/]?/.test(n) ? n : "http://" + n;
                        var l = [];
                        if (s) {
                            var c = (r = r.deleteContents()).insertNode(e("<A>" + o + "</A>")[0]);
                            l.push(c);
                        } else l = m.styleNodes(r, {
                            nodeName: "A",
                            expandClosestSibling: !0,
                            onlyPartialContains: !0
                        });
                        e.each(l, function(t, o) {
                            e(o).attr("href", n), i ? e(o).attr("target", "_blank") : e(o).removeAttr("target");
                        });
                        var d = P.createFromNodeBefore(u.head(l)).getStartPoint(), f = P.createFromNodeAfter(u.last(l)).getEndPoint();
                        P.create(d.node, d.offset, f.node, f.offset).select();
                    }), this.getLinkInfo = function() {
                        var t = this.createRange().expand(h.isAnchor), n = e(u.head(t.nodes(h.isAnchor))), o = {
                            range: t,
                            text: t.toString(),
                            url: n.length ? n.attr("href") : ""
                        };
                        return n.length && (o.isNewWindow = "_blank" === n.attr("target")), o;
                    }, this.color = this.wrapCommand(function(e) {
                        var t = e.foreColor, n = e.backColor;
                        t && document.execCommand("foreColor", !1, t), n && document.execCommand("backColor", !1, n);
                    }), this.foreColor = this.wrapCommand(function(e) {
                        document.execCommand("styleWithCSS", !1, !0), document.execCommand("foreColor", !1, e);
                    }), this.insertTable = this.wrapCommand(function(e) {
                        var t = e.split("x");
                        this.createRange().deleteContents().insertNode(p.createTable(t[0], t[1], a));
                    }), this.addRow = function(e) {
                        var t = this.createRange(r);
                        t.isCollapsed() && t.isOnCell() && (k(), p.addRow(t, e), C());
                    }, this.addCol = function(e) {
                        var t = this.createRange(r);
                        t.isCollapsed() && t.isOnCell() && (k(), p.addCol(t, e), C());
                    }, this.deleteRow = function() {
                        var e = this.createRange(r);
                        e.isCollapsed() && e.isOnCell() && (k(), p.deleteRow(e), C());
                    }, this.deleteCol = function() {
                        var e = this.createRange(r);
                        e.isCollapsed() && e.isOnCell() && (k(), p.deleteCol(e), C());
                    }, this.deleteTable = function() {
                        var e = this.createRange(r);
                        e.isCollapsed() && e.isOnCell() && (k(), p.deleteTable(e), C());
                    }, this.floatMe = this.wrapCommand(function(t) {
                        var n = e(this.restoreTarget());
                        n.toggleClass("note-float-left", "left" === t), n.toggleClass("note-float-right", "right" === t), 
                        n.css("float", t);
                    }), this.resize = this.wrapCommand(function(t) {
                        e(this.restoreTarget()).css({
                            width: 100 * t + "%",
                            height: ""
                        });
                    }), this.resizeTo = function(e, t, n) {
                        var o;
                        if (n) {
                            var i = e.y / e.x, r = t.data("ratio");
                            o = {
                                width: i < r ? e.x : e.y / r,
                                height: i < r ? e.x * r : e.y
                            };
                        } else o = {
                            width: e.x,
                            height: e.y
                        };
                        t.css(o);
                    }, this.removeMedia = this.wrapCommand(function() {
                        var n = e(this.restoreTarget()).detach();
                        t.triggerEvent("media.delete", n, r);
                    }), this.hasFocus = function() {
                        return r.is(":focus");
                    }, this.focus = function() {
                        this.hasFocus() || r.focus();
                    }, this.isEmpty = function() {
                        return h.isEmpty(r[0]) || h.emptyPara === r.html();
                    }, this.empty = function() {
                        t.invoke("code", h.emptyPara);
                    };
                },
                clipboard: function(t) {
                    var n = this, o = t.layoutInfo.editable;
                    this.events = {
                        "summernote.keydown": function(e, o) {
                            n.needKeydownHook() && (o.ctrlKey || o.metaKey) && o.keyCode === x.code.V && (t.invoke("editor.saveRange"), 
                            n.$paste.focus(), setTimeout(function() {
                                n.pasteByHook();
                            }, 0));
                        }
                    }, this.needKeydownHook = function() {
                        return c.isMSIE && 10 < c.browserVersion || c.isFF;
                    }, this.initialize = function() {
                        this.needKeydownHook() ? (this.$paste = e('<div tabindex="-1" />').attr("contenteditable", !0).css({
                            position: "absolute",
                            left: -1e5,
                            opacity: 0
                        }), o.before(this.$paste), this.$paste.on("paste", function(e) {
                            t.triggerEvent("paste", e);
                        })) : o.on("paste", this.pasteByEvent);
                    }, this.destroy = function() {
                        this.needKeydownHook() && (this.$paste.remove(), this.$paste = null);
                    }, this.pasteByHook = function() {
                        var n = this.$paste[0].firstChild, o = n && n.src;
                        if (h.isImg(n) && 0 === o.indexOf("data:")) {
                            for (var i = atob(n.src.split(",")[1]), r = new Uint8Array(i.length), a = 0; a < i.length; a++) r[a] = i.charCodeAt(a);
                            var s = new Blob([ r ], {
                                type: "image/png"
                            });
                            s.name = "clipboard.png", t.invoke("editor.restoreRange"), t.invoke("editor.focus"), 
                            t.invoke("editor.insertImagesOrCallback", [ s ]);
                        } else {
                            var l = e("<div />").html(this.$paste.html()).html();
                            t.invoke("editor.restoreRange"), t.invoke("editor.focus"), l && t.invoke("editor.pasteHTML", l);
                        }
                        this.$paste.empty();
                    }, this.pasteByEvent = function(e) {
                        var n = e.originalEvent.clipboardData;
                        if (n && n.items && n.items.length) {
                            var o = u.head(n.items);
                            "file" === o.kind && -1 !== o.type.indexOf("image/") && t.invoke("editor.insertImagesOrCallback", [ o.getAsFile() ]), 
                            t.invoke("editor.afterCommand");
                        }
                    };
                },
                dropzone: function(t) {
                    var n = e(document), o = t.layoutInfo.editor, i = t.layoutInfo.editable, r = t.options, a = r.langInfo, s = {}, l = e([ '<div class="note-dropzone">', '  <div class="note-dropzone-message"/>', "</div>" ].join("")).prependTo(o);
                    this.initialize = function() {
                        r.disableDragAndDrop ? (s.onDrop = function(e) {
                            e.preventDefault();
                        }, n.on("drop", s.onDrop)) : this.attachDragAndDropEvent();
                    }, this.attachDragAndDropEvent = function() {
                        var r = e(), c = l.find(".note-dropzone-message");
                        s.onDragenter = function(e) {
                            var n = t.invoke("codeview.isActivated"), i = 0 < o.width() && 0 < o.height();
                            n || r.length || !i || (o.addClass("dragover"), l.width(o.width()), l.height(o.height()), 
                            c.text(a.image.dragImageHere)), r = r.add(e.target);
                        }, s.onDragleave = function(e) {
                            (r = r.not(e.target)).length || o.removeClass("dragover");
                        }, s.onDrop = function() {
                            r = e(), o.removeClass("dragover");
                        }, n.on("dragenter", s.onDragenter).on("dragleave", s.onDragleave).on("drop", s.onDrop), 
                        l.on("dragenter", function() {
                            l.addClass("hover"), c.text(a.image.dropImage);
                        }).on("dragleave", function() {
                            l.removeClass("hover"), c.text(a.image.dragImageHere);
                        }), l.on("drop", function(n) {
                            var o = n.originalEvent.dataTransfer;
                            o && o.files && o.files.length ? (n.preventDefault(), i.focus(), t.invoke("editor.insertImagesOrCallback", o.files)) : e.each(o.types, function(n, i) {
                                var r = o.getData(i);
                                -1 < i.toLowerCase().indexOf("text") ? t.invoke("editor.pasteHTML", r) : e(r).each(function() {
                                    t.invoke("editor.insertNode", this);
                                });
                            });
                        }).on("dragover", !1);
                    }, this.destroy = function() {
                        Object.keys(s).forEach(function(e) {
                            n.off(e.substr(2).toLowerCase(), s[e]);
                        }), s = {};
                    };
                },
                codeview: function(e) {
                    var t = e.layoutInfo.editor, n = e.layoutInfo.editable, o = e.layoutInfo.codable, i = e.options;
                    this.sync = function() {
                        this.isActivated() && c.hasCodeMirror && o.data("cmEditor").save();
                    }, this.isActivated = function() {
                        return t.hasClass("codeview");
                    }, this.toggle = function() {
                        this.isActivated() ? this.deactivate() : this.activate(), e.triggerEvent("codeview.toggled");
                    }, this.activate = function() {
                        if (o.val(h.html(n, i.prettifyHtml)), o.height(n.height()), e.invoke("toolbar.updateCodeview", !0), 
                        t.addClass("codeview"), o.focus(), c.hasCodeMirror) {
                            var r = z.fromTextArea(o[0], i.codemirror);
                            if (i.codemirror.tern) {
                                var a = new z.TernServer(i.codemirror.tern);
                                r.ternServer = a, r.on("cursorActivity", function(e) {
                                    a.updateArgHints(e);
                                });
                            }
                            r.setSize(null, n.outerHeight()), o.data("cmEditor", r);
                        }
                    }, this.deactivate = function() {
                        if (c.hasCodeMirror) {
                            var r = o.data("cmEditor");
                            o.val(r.getValue()), r.toTextArea();
                        }
                        var a = h.value(o, i.prettifyHtml) || h.emptyPara, s = n.html() !== a;
                        n.html(a), n.height(i.height ? o.height() : "auto"), t.removeClass("codeview"), 
                        s && e.triggerEvent("change", n.html(), n), n.focus(), e.invoke("toolbar.updateCodeview", !1);
                    }, this.destroy = function() {
                        this.isActivated() && this.deactivate();
                    };
                },
                statusbar: function(t) {
                    var n = e(document), o = t.layoutInfo.statusbar, i = t.layoutInfo.editable, r = t.options;
                    this.initialize = function() {
                        r.airMode || r.disableResizeEditor ? this.destroy() : o.on("mousedown", function(e) {
                            e.preventDefault(), e.stopPropagation();
                            var t = i.offset().top - n.scrollTop(), o = function(e) {
                                var n = e.clientY - (t + 24);
                                n = 0 < r.minheight ? Math.max(n, r.minheight) : n, n = 0 < r.maxHeight ? Math.min(n, r.maxHeight) : n, 
                                i.height(n);
                            };
                            n.on("mousemove", o).one("mouseup", function() {
                                n.off("mousemove", o);
                            });
                        });
                    }, this.destroy = function() {
                        o.off(), o.remove();
                    };
                },
                fullscreen: function(t) {
                    var n = this, o = t.layoutInfo.editor, i = t.layoutInfo.toolbar, r = t.layoutInfo.editable, a = t.layoutInfo.codable, s = e(window), l = e("html, body");
                    this.resizeTo = function(e) {
                        r.css("height", e.h), a.css("height", e.h), a.data("cmeditor") && a.data("cmeditor").setsize(null, e.h);
                    }, this.onResize = function() {
                        n.resizeTo({
                            h: s.height() - i.outerHeight()
                        });
                    }, this.toggle = function() {
                        o.toggleClass("fullscreen"), this.isFullscreen() ? (r.data("orgHeight", r.css("height")), 
                        s.on("resize", this.onResize).trigger("resize"), l.css("overflow", "hidden")) : (s.off("resize", this.onResize), 
                        this.resizeTo({
                            h: r.data("orgHeight")
                        }), l.css("overflow", "visible")), t.invoke("toolbar.updateFullscreen", this.isFullscreen());
                    }, this.isFullscreen = function() {
                        return o.hasClass("fullscreen");
                    };
                },
                handle: function(t) {
                    var n = this, o = e(document), i = t.layoutInfo.editingArea, r = t.options;
                    this.events = {
                        "summernote.mousedown": function(e, t) {
                            n.update(t.target) && t.preventDefault();
                        },
                        "summernote.keyup summernote.scroll summernote.change summernote.dialog.shown": function() {
                            n.update();
                        },
                        "summernote.disable": function() {
                            n.hide();
                        },
                        "summernote.codeview.toggled": function() {
                            n.update();
                        }
                    }, this.initialize = function() {
                        this.$handle = e([ '<div class="note-handle">', '<div class="note-control-selection">', '<div class="note-control-selection-bg"></div>', '<div class="note-control-holder note-control-nw"></div>', '<div class="note-control-holder note-control-ne"></div>', '<div class="note-control-holder note-control-sw"></div>', '<div class="', r.disableResizeImage ? "note-control-holder" : "note-control-sizing", ' note-control-se"></div>', r.disableResizeImage ? "" : '<div class="note-control-selection-info"></div>', "</div>", "</div>" ].join("")).prependTo(i), 
                        this.$handle.on("mousedown", function(e) {
                            if (h.isControlSizing(e.target)) {
                                e.preventDefault(), e.stopPropagation();
                                var i = n.$handle.find(".note-control-selection").data("target"), r = i.offset(), a = o.scrollTop(), s = function(e) {
                                    t.invoke("editor.resizeTo", {
                                        x: e.clientX - r.left,
                                        y: e.clientY - (r.top - a)
                                    }, i, !e.shiftKey), n.update(i[0]);
                                };
                                o.on("mousemove", s).one("mouseup", function(e) {
                                    e.preventDefault(), o.off("mousemove", s), t.invoke("editor.afterCommand");
                                }), i.data("ratio") || i.data("ratio", i.height() / i.width());
                            }
                        }), this.$handle.on("wheel", function(e) {
                            e.preventDefault(), n.update();
                        });
                    }, this.destroy = function() {
                        this.$handle.remove();
                    }, this.update = function(n) {
                        if (t.isDisabled()) return !1;
                        var o = h.isImg(n), i = this.$handle.find(".note-control-selection");
                        if (t.invoke("imagePopover.update", n), o) {
                            var r = e(n), a = r.position(), s = {
                                left: a.left + parseInt(r.css("marginLeft"), 10),
                                top: a.top + parseInt(r.css("marginTop"), 10)
                            }, l = {
                                w: r.outerWidth(!1),
                                h: r.outerHeight(!1)
                            };
                            i.css({
                                display: "block",
                                left: s.left,
                                top: s.top,
                                width: l.w,
                                height: l.h
                            }).data("target", r);
                            var c = l.w + "x" + l.h;
                            i.find(".note-control-selection-info").text(c), t.invoke("editor.saveTarget", n);
                        } else this.hide();
                        return o;
                    }, this.hide = function() {
                        t.invoke("editor.clearTarget"), this.$handle.children().hide();
                    };
                },
                hintPopover: function(t) {
                    var n = this, o = e.summernote.ui, i = t.options.hint || [], r = t.options.hintDirection || "bottom", a = e.isArray(i) ? i : [ i ];
                    this.events = {
                        "summernote.keyup": function(e, t) {
                            t.isDefaultPrevented() || n.handleKeyup(t);
                        },
                        "summernote.keydown": function(e, t) {
                            n.handleKeydown(t);
                        },
                        "summernote.disable summernote.dialog.shown": function() {
                            n.hide();
                        }
                    }, this.shouldInitialize = function() {
                        return 0 < a.length;
                    }, this.initialize = function() {
                        this.lastWordRange = null, this.$popover = o.popover({
                            className: "note-hint-popover",
                            hideArrow: !0,
                            direction: ""
                        }).render().appendTo("body"), this.$popover.hide(), this.$content = this.$popover.find(".popover-content,.note-popover-content"), 
                        this.$content.on("click", ".note-hint-item", function() {
                            n.$content.find(".active").removeClass("active"), e(this).addClass("active"), n.replace();
                        });
                    }, this.destroy = function() {
                        this.$popover.remove();
                    }, this.selectItem = function(e) {
                        this.$content.find(".active").removeClass("active"), e.addClass("active"), this.$content[0].scrollTop = e[0].offsetTop - this.$content.innerHeight() / 2;
                    }, this.moveDown = function() {
                        var e = this.$content.find(".note-hint-item.active"), t = e.next();
                        if (t.length) this.selectItem(t); else {
                            var n = e.parent().next();
                            n.length || (n = this.$content.find(".note-hint-group").first()), this.selectItem(n.find(".note-hint-item").first());
                        }
                    }, this.moveUp = function() {
                        var e = this.$content.find(".note-hint-item.active"), t = e.prev();
                        if (t.length) this.selectItem(t); else {
                            var n = e.parent().prev();
                            n.length || (n = this.$content.find(".note-hint-group").last()), this.selectItem(n.find(".note-hint-item").last());
                        }
                    }, this.replace = function() {
                        var e = this.$content.find(".note-hint-item.active");
                        if (e.length) {
                            var n = this.nodeFromItem(e);
                            this.lastWordRange.insertNode(n), P.createFromNode(n).collapse().select(), this.lastWordRange = null, 
                            this.hide(), t.triggerEvent("change", t.layoutInfo.editable.html(), t.layoutInfo.editable), 
                            t.invoke("editor.focus");
                        }
                    }, this.nodeFromItem = function(e) {
                        var t = a[e.data("index")], n = e.data("item"), o = t.content ? t.content(n) : n;
                        return "string" == typeof o && (o = h.createText(o)), o;
                    }, this.createItemTemplates = function(t, n) {
                        var o = a[t];
                        return n.map(function(n, i) {
                            var r = e('<div class="note-hint-item"/>');
                            return r.append(o.template ? o.template(n) : n + ""), r.data({
                                index: t,
                                item: n
                            }), 0 === t && 0 === i && r.addClass("active"), r;
                        });
                    }, this.handleKeydown = function(e) {
                        this.$popover.is(":visible") && (e.keyCode === x.code.ENTER ? (e.preventDefault(), 
                        this.replace()) : e.keyCode === x.code.UP ? (e.preventDefault(), this.moveUp()) : e.keyCode === x.code.DOWN && (e.preventDefault(), 
                        this.moveDown()));
                    }, this.searchKeyword = function(e, t, n) {
                        var o = a[e];
                        if (o && o.match.test(t) && o.search) {
                            var i = o.match.exec(t);
                            o.search(i[1], n);
                        } else n();
                    }, this.createGroup = function(t, o) {
                        var i = e('<div class="note-hint-group note-hint-group-' + t + '"/>');
                        return this.searchKeyword(t, o, function(e) {
                            (e = e || []).length && (i.html(n.createItemTemplates(t, e)), n.show());
                        }), i;
                    }, this.handleKeyup = function(e) {
                        if (u.contains([ x.code.ENTER, x.code.UP, x.code.DOWN ], e.keyCode)) {
                            if (e.keyCode === x.code.ENTER && this.$popover.is(":visible")) return;
                        } else {
                            var o = t.invoke("editor.createRange").getWordRange(), i = o.toString();
                            if (a.length && i) {
                                this.$content.empty();
                                var s = d.rect2bnd(u.last(o.getClientRects()));
                                s && (this.$popover.hide(), this.lastWordRange = o, a.forEach(function(e, t) {
                                    e.match.test(i) && n.createGroup(t, i).appendTo(n.$content);
                                }), "top" === r ? this.$popover.css({
                                    left: s.left,
                                    top: s.top - this.$popover.outerHeight() - 5
                                }) : this.$popover.css({
                                    left: s.left,
                                    top: s.top + s.height + 5
                                }));
                            } else this.hide();
                        }
                    }, this.show = function() {
                        this.$popover.show();
                    }, this.hide = function() {
                        this.$popover.hide();
                    };
                },
                autoLink: function(t) {
                    var n = this, o = /^([A-Za-z][A-Za-z0-9+-.]*\:[\/\/]?|mailto:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i;
                    this.events = {
                        "summernote.keyup": function(e, t) {
                            t.isDefaultPrevented() || n.handleKeyup(t);
                        },
                        "summernote.keydown": function(e, t) {
                            n.handleKeydown(t);
                        }
                    }, this.initialize = function() {
                        this.lastWordRange = null;
                    }, this.destroy = function() {
                        this.lastWordRange = null;
                    }, this.replace = function() {
                        if (this.lastWordRange) {
                            var n = this.lastWordRange.toString(), i = n.match(o);
                            if (i && (i[1] || i[2])) {
                                var r = i[1] ? n : "http://" + n, a = e("<a />").html(n).attr("href", r)[0];
                                this.lastWordRange.insertNode(a), this.lastWordRange = null, t.invoke("editor.focus");
                            }
                        }
                    }, this.handleKeydown = function(e) {
                        if (u.contains([ x.code.ENTER, x.code.SPACE ], e.keyCode)) {
                            var n = t.invoke("editor.createRange").getWordRange();
                            this.lastWordRange = n;
                        }
                    }, this.handleKeyup = function(e) {
                        u.contains([ x.code.ENTER, x.code.SPACE ], e.keyCode) && this.replace();
                    };
                },
                autoSync: function(e) {
                    var t = e.layoutInfo.note;
                    this.events = {
                        "summernote.change": function() {
                            t.val(e.invoke("code"));
                        }
                    }, this.shouldInitialize = function() {
                        return h.isTextarea(t[0]);
                    };
                },
                placeholder: function(t) {
                    var n = this, o = t.layoutInfo.editingArea, i = t.options;
                    this.events = {
                        "summernote.init summernote.change": function() {
                            n.update();
                        },
                        "summernote.codeview.toggled": function() {
                            n.update();
                        }
                    }, this.shouldInitialize = function() {
                        return !!i.placeholder;
                    }, this.initialize = function() {
                        this.$placeholder = e('<div class="note-placeholder">'), this.$placeholder.on("click", function() {
                            t.invoke("focus");
                        }).text(i.placeholder).prependTo(o), this.update();
                    }, this.destroy = function() {
                        this.$placeholder.remove();
                    }, this.update = function() {
                        var e = !t.invoke("codeview.isActivated") && t.invoke("editor.isEmpty");
                        this.$placeholder.toggle(e);
                    };
                },
                buttons: function(t) {
                    var n = this, o = e.summernote.ui, i = t.layoutInfo.toolbar, r = t.options, a = r.langInfo, s = d.invertObject(r.keyMap[c.isMac ? "mac" : "pc"]), l = this.representShortcut = function(e) {
                        var t = s[e];
                        return r.shortcuts && t ? (c.isMac && (t = t.replace("CMD", "⌘").replace("SHIFT", "⇧")), 
                        " (" + (t = t.replace("BACKSLASH", "\\").replace("SLASH", "/").replace("LEFTBRACKET", "[").replace("RIGHTBRACKET", "]")) + ")") : "";
                    };
                    this.initialize = function() {
                        this.addToolbarButtons(), this.addImagePopoverButtons(), this.addLinkPopoverButtons(), 
                        this.addTablePopoverButtons(), this.fontInstalledMap = {};
                    }, this.destroy = function() {
                        delete this.fontInstalledMap;
                    }, this.isFontInstalled = function(e) {
                        return n.fontInstalledMap.hasOwnProperty(e) || (n.fontInstalledMap[e] = c.isFontInstalled(e) || u.contains(r.fontNamesIgnoreCheck, e)), 
                        n.fontInstalledMap[e];
                    }, this.addToolbarButtons = function() {
                        t.memo("button.style", function() {
                            return o.buttonGroup([ o.button({
                                className: "dropdown-toggle",
                                contents: o.dropdownButtonContents(o.icon(r.icons.magic), r),
                                tooltip: a.style.style,
                                data: {
                                    toggle: "dropdown"
                                }
                            }), o.dropdown({
                                className: "dropdown-style",
                                items: t.options.styleTags,
                                template: function(e) {
                                    "string" == typeof e && (e = {
                                        tag: e,
                                        title: a.style.hasOwnProperty(e) ? a.style[e] : e
                                    });
                                    var t = e.tag, n = e.title;
                                    return "<" + t + (e.style ? ' style="' + e.style + '" ' : "") + (e.className ? ' class="' + e.className + '"' : "") + ">" + n + "</" + t + ">";
                                },
                                click: t.createInvokeHandler("editor.formatBlock")
                            }) ]).render();
                        }), t.memo("button.bold", function() {
                            return o.button({
                                className: "note-btn-bold",
                                contents: o.icon(r.icons.bold),
                                tooltip: a.font.bold + l("bold"),
                                click: t.createInvokeHandlerAndUpdateState("editor.bold")
                            }).render();
                        }), t.memo("button.italic", function() {
                            return o.button({
                                className: "note-btn-italic",
                                contents: o.icon(r.icons.italic),
                                tooltip: a.font.italic + l("italic"),
                                click: t.createInvokeHandlerAndUpdateState("editor.italic")
                            }).render();
                        }), t.memo("button.underline", function() {
                            return o.button({
                                className: "note-btn-underline",
                                contents: o.icon(r.icons.underline),
                                tooltip: a.font.underline + l("underline"),
                                click: t.createInvokeHandlerAndUpdateState("editor.underline")
                            }).render();
                        }), t.memo("button.clear", function() {
                            return o.button({
                                contents: o.icon(r.icons.eraser),
                                tooltip: a.font.clear + l("removeFormat"),
                                click: t.createInvokeHandler("editor.removeFormat")
                            }).render();
                        }), t.memo("button.strikethrough", function() {
                            return o.button({
                                className: "note-btn-strikethrough",
                                contents: o.icon(r.icons.strikethrough),
                                tooltip: a.font.strikethrough + l("strikethrough"),
                                click: t.createInvokeHandlerAndUpdateState("editor.strikethrough")
                            }).render();
                        }), t.memo("button.superscript", function() {
                            return o.button({
                                className: "note-btn-superscript",
                                contents: o.icon(r.icons.superscript),
                                tooltip: a.font.superscript,
                                click: t.createInvokeHandlerAndUpdateState("editor.superscript")
                            }).render();
                        }), t.memo("button.subscript", function() {
                            return o.button({
                                className: "note-btn-subscript",
                                contents: o.icon(r.icons.subscript),
                                tooltip: a.font.subscript,
                                click: t.createInvokeHandlerAndUpdateState("editor.subscript")
                            }).render();
                        }), t.memo("button.fontname", function() {
                            return o.buttonGroup([ o.button({
                                className: "dropdown-toggle",
                                contents: o.dropdownButtonContents('<span class="note-current-fontname"/>', r),
                                tooltip: a.font.name,
                                data: {
                                    toggle: "dropdown"
                                }
                            }), o.dropdownCheck({
                                className: "dropdown-fontname",
                                checkClassName: r.icons.menuCheck,
                                items: r.fontNames.filter(n.isFontInstalled),
                                template: function(e) {
                                    return '<span style="font-family:' + e + '">' + e + "</span>";
                                },
                                click: t.createInvokeHandlerAndUpdateState("editor.fontName")
                            }) ]).render();
                        }), t.memo("button.fontsize", function() {
                            return o.buttonGroup([ o.button({
                                className: "dropdown-toggle",
                                contents: o.dropdownButtonContents('<span class="note-current-fontsize"/>', r),
                                tooltip: a.font.size,
                                data: {
                                    toggle: "dropdown"
                                }
                            }), o.dropdownCheck({
                                className: "dropdown-fontsize",
                                checkClassName: r.icons.menuCheck,
                                items: r.fontSizes,
                                click: t.createInvokeHandlerAndUpdateState("editor.fontSize")
                            }) ]).render();
                        }), t.memo("button.color", function() {
                            return o.buttonGroup({
                                className: "note-color",
                                children: [ o.button({
                                    className: "note-current-color-button",
                                    contents: o.icon(r.icons.font + " note-recent-color"),
                                    tooltip: a.color.recent,
                                    click: function(n) {
                                        var o = e(n.currentTarget);
                                        t.invoke("editor.color", {
                                            backColor: o.attr("data-backColor"),
                                            foreColor: o.attr("data-foreColor")
                                        });
                                    },
                                    callback: function(e) {
                                        e.find(".note-recent-color").css("background-color", "#FFFF00"), e.attr("data-backColor", "#FFFF00");
                                    }
                                }), o.button({
                                    className: "dropdown-toggle",
                                    contents: o.dropdownButtonContents("", r),
                                    tooltip: a.color.more,
                                    data: {
                                        toggle: "dropdown"
                                    }
                                }), o.dropdown({
                                    items: [ '<div class="note-palette">', '  <div class="note-palette-title">' + a.color.background + "</div>", "  <div>", '    <button type="button" class="note-color-reset btn btn-light" data-event="backColor" data-value="inherit">', a.color.transparent, "    </button>", "  </div>", '  <div class="note-holder" data-event="backColor"/>', "</div>", '<div class="note-palette">', '  <div class="note-palette-title">' + a.color.foreground + "</div>", "  <div>", '    <button type="button" class="note-color-reset btn btn-light" data-event="removeFormat" data-value="foreColor">', a.color.resetToDefault, "    </button>", "  </div>", '  <div class="note-holder" data-event="foreColor"/>', "</div>" ].join(""),
                                    callback: function(t) {
                                        t.find(".note-holder").each(function() {
                                            var t = e(this);
                                            t.append(o.palette({
                                                colors: r.colors,
                                                eventName: t.data("event"),
                                                tooltip: r.tooltip
                                            }).render());
                                        });
                                    },
                                    click: function(n) {
                                        var o = e(n.target), i = o.data("event"), r = o.data("value");
                                        if (i && r) {
                                            var a = "backColor" === i ? "background-color" : "color", s = o.closest(".note-color").find(".note-recent-color"), l = o.closest(".note-color").find(".note-current-color-button");
                                            s.css(a, r), l.attr("data-" + i, r), t.invoke("editor." + i, r);
                                        }
                                    }
                                }) ]
                            }).render();
                        }), t.memo("button.ul", function() {
                            return o.button({
                                contents: o.icon(r.icons.unorderedlist),
                                tooltip: a.lists.unordered + l("insertUnorderedList"),
                                click: t.createInvokeHandler("editor.insertUnorderedList")
                            }).render();
                        }), t.memo("button.ol", function() {
                            return o.button({
                                contents: o.icon(r.icons.orderedlist),
                                tooltip: a.lists.ordered + l("insertOrderedList"),
                                click: t.createInvokeHandler("editor.insertOrderedList")
                            }).render();
                        });
                        var i = o.button({
                            contents: o.icon(r.icons.alignLeft),
                            tooltip: a.paragraph.left + l("justifyLeft"),
                            click: t.createInvokeHandler("editor.justifyLeft")
                        }), s = o.button({
                            contents: o.icon(r.icons.alignCenter),
                            tooltip: a.paragraph.center + l("justifyCenter"),
                            click: t.createInvokeHandler("editor.justifyCenter")
                        }), c = o.button({
                            contents: o.icon(r.icons.alignRight),
                            tooltip: a.paragraph.right + l("justifyRight"),
                            click: t.createInvokeHandler("editor.justifyRight")
                        }), u = o.button({
                            contents: o.icon(r.icons.alignJustify),
                            tooltip: a.paragraph.justify + l("justifyFull"),
                            click: t.createInvokeHandler("editor.justifyFull")
                        }), f = o.button({
                            contents: o.icon(r.icons.outdent),
                            tooltip: a.paragraph.outdent + l("outdent"),
                            click: t.createInvokeHandler("editor.outdent")
                        }), h = o.button({
                            contents: o.icon(r.icons.indent),
                            tooltip: a.paragraph.indent + l("indent"),
                            click: t.createInvokeHandler("editor.indent")
                        });
                        t.memo("button.justifyLeft", d.invoke(i, "render")), t.memo("button.justifyCenter", d.invoke(s, "render")), 
                        t.memo("button.justifyRight", d.invoke(c, "render")), t.memo("button.justifyFull", d.invoke(u, "render")), 
                        t.memo("button.outdent", d.invoke(f, "render")), t.memo("button.indent", d.invoke(h, "render")), 
                        t.memo("button.paragraph", function() {
                            return o.buttonGroup([ o.button({
                                className: "dropdown-toggle",
                                contents: o.dropdownButtonContents(o.icon(r.icons.alignLeft), r),
                                tooltip: a.paragraph.paragraph,
                                data: {
                                    toggle: "dropdown"
                                }
                            }), o.dropdown([ o.buttonGroup({
                                className: "note-align",
                                children: [ i, s, c, u ]
                            }), o.buttonGroup({
                                className: "note-list",
                                children: [ f, h ]
                            }) ]) ]).render();
                        }), t.memo("button.height", function() {
                            return o.buttonGroup([ o.button({
                                className: "dropdown-toggle",
                                contents: o.dropdownButtonContents(o.icon(r.icons.textHeight), r),
                                tooltip: a.font.height,
                                data: {
                                    toggle: "dropdown"
                                }
                            }), o.dropdownCheck({
                                items: r.lineHeights,
                                checkClassName: r.icons.menuCheck,
                                className: "dropdown-line-height",
                                click: t.createInvokeHandler("editor.lineHeight")
                            }) ]).render();
                        }), t.memo("button.table", function() {
                            return o.buttonGroup([ o.button({
                                className: "dropdown-toggle",
                                contents: o.dropdownButtonContents(o.icon(r.icons.table), r),
                                tooltip: a.table.table,
                                data: {
                                    toggle: "dropdown"
                                }
                            }), o.dropdown({
                                className: "note-table",
                                items: [ '<div class="note-dimension-picker">', '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>', '  <div class="note-dimension-picker-highlighted"/>', '  <div class="note-dimension-picker-unhighlighted"/>', "</div>", '<div class="note-dimension-display">1 x 1</div>' ].join("")
                            }) ], {
                                callback: function(e) {
                                    e.find(".note-dimension-picker-mousecatcher").css({
                                        width: r.insertTableMaxSize.col + "em",
                                        height: r.insertTableMaxSize.row + "em"
                                    }).mousedown(t.createInvokeHandler("editor.insertTable")).on("mousemove", n.tableMoveHandler);
                                }
                            }).render();
                        }), t.memo("button.link", function() {
                            return o.button({
                                contents: o.icon(r.icons.link),
                                tooltip: a.link.link + l("linkDialog.show"),
                                click: t.createInvokeHandler("linkDialog.show")
                            }).render();
                        }), t.memo("button.picture", function() {
                            return o.button({
                                contents: o.icon(r.icons.picture),
                                tooltip: a.image.image,
                                click: t.createInvokeHandler("imageDialog.show")
                            }).render();
                        }), t.memo("button.video", function() {
                            return o.button({
                                contents: o.icon(r.icons.video),
                                tooltip: a.video.video,
                                click: t.createInvokeHandler("videoDialog.show")
                            }).render();
                        }), t.memo("button.hr", function() {
                            return o.button({
                                contents: o.icon(r.icons.minus),
                                tooltip: a.hr.insert + l("insertHorizontalRule"),
                                click: t.createInvokeHandler("editor.insertHorizontalRule")
                            }).render();
                        }), t.memo("button.fullscreen", function() {
                            return o.button({
                                className: "btn-fullscreen",
                                contents: o.icon(r.icons.arrowsAlt),
                                tooltip: a.options.fullscreen,
                                click: t.createInvokeHandler("fullscreen.toggle")
                            }).render();
                        }), t.memo("button.codeview", function() {
                            return o.button({
                                className: "btn-codeview",
                                contents: o.icon(r.icons.code),
                                tooltip: a.options.codeview,
                                click: t.createInvokeHandler("codeview.toggle")
                            }).render();
                        }), t.memo("button.redo", function() {
                            return o.button({
                                contents: o.icon(r.icons.redo),
                                tooltip: a.history.redo + l("redo"),
                                click: t.createInvokeHandler("editor.redo")
                            }).render();
                        }), t.memo("button.undo", function() {
                            return o.button({
                                contents: o.icon(r.icons.undo),
                                tooltip: a.history.undo + l("undo"),
                                click: t.createInvokeHandler("editor.undo")
                            }).render();
                        }), t.memo("button.help", function() {
                            return o.button({
                                contents: o.icon(r.icons.question),
                                tooltip: a.options.help,
                                click: t.createInvokeHandler("helpDialog.show")
                            }).render();
                        });
                    }, this.addImagePopoverButtons = function() {
                        t.memo("button.imageSize100", function() {
                            return o.button({
                                contents: '<span class="note-fontsize-10">100%</span>',
                                tooltip: a.image.resizeFull,
                                click: t.createInvokeHandler("editor.resize", "1")
                            }).render();
                        }), t.memo("button.imageSize50", function() {
                            return o.button({
                                contents: '<span class="note-fontsize-10">50%</span>',
                                tooltip: a.image.resizeHalf,
                                click: t.createInvokeHandler("editor.resize", "0.5")
                            }).render();
                        }), t.memo("button.imageSize25", function() {
                            return o.button({
                                contents: '<span class="note-fontsize-10">25%</span>',
                                tooltip: a.image.resizeQuarter,
                                click: t.createInvokeHandler("editor.resize", "0.25")
                            }).render();
                        }), t.memo("button.floatLeft", function() {
                            return o.button({
                                contents: o.icon(r.icons.alignLeft),
                                tooltip: a.image.floatLeft,
                                click: t.createInvokeHandler("editor.floatMe", "left")
                            }).render();
                        }), t.memo("button.floatRight", function() {
                            return o.button({
                                contents: o.icon(r.icons.alignRight),
                                tooltip: a.image.floatRight,
                                click: t.createInvokeHandler("editor.floatMe", "right")
                            }).render();
                        }), t.memo("button.floatNone", function() {
                            return o.button({
                                contents: o.icon(r.icons.alignJustify),
                                tooltip: a.image.floatNone,
                                click: t.createInvokeHandler("editor.floatMe", "none")
                            }).render();
                        }), t.memo("button.removeMedia", function() {
                            return o.button({
                                contents: o.icon(r.icons.trash),
                                tooltip: a.image.remove,
                                click: t.createInvokeHandler("editor.removeMedia")
                            }).render();
                        });
                    }, this.addLinkPopoverButtons = function() {
                        t.memo("button.linkDialogShow", function() {
                            return o.button({
                                contents: o.icon(r.icons.link),
                                tooltip: a.link.edit,
                                click: t.createInvokeHandler("linkDialog.show")
                            }).render();
                        }), t.memo("button.unlink", function() {
                            return o.button({
                                contents: o.icon(r.icons.unlink),
                                tooltip: a.link.unlink,
                                click: t.createInvokeHandler("editor.unlink")
                            }).render();
                        });
                    }, this.addTablePopoverButtons = function() {
                        t.memo("button.addRowUp", function() {
                            return o.button({
                                className: "btn-md",
                                contents: o.icon(r.icons.rowAbove),
                                tooltip: a.table.addRowAbove,
                                click: t.createInvokeHandler("editor.addRow", "top")
                            }).render();
                        }), t.memo("button.addRowDown", function() {
                            return o.button({
                                className: "btn-md",
                                contents: o.icon(r.icons.rowBelow),
                                tooltip: a.table.addRowBelow,
                                click: t.createInvokeHandler("editor.addRow", "bottom")
                            }).render();
                        }), t.memo("button.addColLeft", function() {
                            return o.button({
                                className: "btn-md",
                                contents: o.icon(r.icons.colBefore),
                                tooltip: a.table.addColLeft,
                                click: t.createInvokeHandler("editor.addCol", "left")
                            }).render();
                        }), t.memo("button.addColRight", function() {
                            return o.button({
                                className: "btn-md",
                                contents: o.icon(r.icons.colAfter),
                                tooltip: a.table.addColRight,
                                click: t.createInvokeHandler("editor.addCol", "right")
                            }).render();
                        }), t.memo("button.deleteRow", function() {
                            return o.button({
                                className: "btn-md",
                                contents: o.icon(r.icons.rowRemove),
                                tooltip: a.table.delRow,
                                click: t.createInvokeHandler("editor.deleteRow")
                            }).render();
                        }), t.memo("button.deleteCol", function() {
                            return o.button({
                                className: "btn-md",
                                contents: o.icon(r.icons.colRemove),
                                tooltip: a.table.delCol,
                                click: t.createInvokeHandler("editor.deleteCol")
                            }).render();
                        }), t.memo("button.deleteTable", function() {
                            return o.button({
                                className: "btn-md",
                                contents: o.icon(r.icons.trash),
                                tooltip: a.table.delTable,
                                click: t.createInvokeHandler("editor.deleteTable")
                            }).render();
                        });
                    }, this.build = function(e, n) {
                        for (var i = 0, r = n.length; i < r; i++) {
                            for (var a = n[i], s = a[0], l = a[1], c = o.buttonGroup({
                                className: "note-" + s
                            }).render(), d = 0, u = l.length; d < u; d++) {
                                var f = t.memo("button." + l[d]);
                                f && c.append("function" == typeof f ? f(t) : f);
                            }
                            c.appendTo(e);
                        }
                    }, this.updateCurrentStyle = function(o) {
                        var r = o || i, a = t.invoke("editor.currentStyle");
                        if (this.updateBtnStates(r, {
                            ".note-btn-bold": function() {
                                return "bold" === a["font-bold"];
                            },
                            ".note-btn-italic": function() {
                                return "italic" === a["font-italic"];
                            },
                            ".note-btn-underline": function() {
                                return "underline" === a["font-underline"];
                            },
                            ".note-btn-subscript": function() {
                                return "subscript" === a["font-subscript"];
                            },
                            ".note-btn-superscript": function() {
                                return "superscript" === a["font-superscript"];
                            },
                            ".note-btn-strikethrough": function() {
                                return "strikethrough" === a["font-strikethrough"];
                            }
                        }), a["font-family"]) {
                            var s = a["font-family"].split(",").map(function(e) {
                                return e.replace(/[\'\"]/g, "").replace(/\s+$/, "").replace(/^\s+/, "");
                            }), l = u.find(s, n.isFontInstalled);
                            r.find(".dropdown-fontname a").each(function() {
                                var t = e(this), n = t.data("value") + "" == l + "";
                                t.toggleClass("checked", n);
                            }), r.find(".note-current-fontname").text(l);
                        }
                        if (a["font-size"]) {
                            var c = a["font-size"];
                            r.find(".dropdown-fontsize a").each(function() {
                                var t = e(this), n = t.data("value") + "" == c + "";
                                t.toggleClass("checked", n);
                            }), r.find(".note-current-fontsize").text(c);
                        }
                        if (a["line-height"]) {
                            var d = a["line-height"];
                            r.find(".dropdown-line-height li a").each(function() {
                                var t = e(this).data("value") + "" == d + "";
                                this.className = t ? "checked" : "";
                            });
                        }
                    }, this.updateBtnStates = function(t, n) {
                        e.each(n, function(e, n) {
                            o.toggleBtnActive(t.find(e), n());
                        });
                    }, this.tableMoveHandler = function(t) {
                        var n, o = e(t.target.parentNode), i = o.next(), a = o.find(".note-dimension-picker-mousecatcher"), s = o.find(".note-dimension-picker-highlighted"), l = o.find(".note-dimension-picker-unhighlighted");
                        if (void 0 === t.offsetX) {
                            var c = e(t.target).offset();
                            n = {
                                x: t.pageX - c.left,
                                y: t.pageY - c.top
                            };
                        } else n = {
                            x: t.offsetX,
                            y: t.offsetY
                        };
                        var d_c = Math.ceil(n.x / 18) || 1, d_r = Math.ceil(n.y / 18) || 1;
                        s.css({
                            width: d_c + "em",
                            height: d_r + "em"
                        }), a.data("value", d_c + "x" + d_r), 3 < d_c && d_c < r.insertTableMaxSize.col && l.css({
                            width: d_c + 1 + "em"
                        }), 3 < d_r && d_r < r.insertTableMaxSize.row && l.css({
                            height: d_r + 1 + "em"
                        }), i.html(d_c + " x " + d_r);
                    };
                },
                toolbar: function(t) {
                    var n = e.summernote.ui, o = t.layoutInfo.note, i = t.layoutInfo.editor, r = t.layoutInfo.toolbar, a = t.options;
                    this.shouldInitialize = function() {
                        return !a.airMode;
                    }, this.initialize = function() {
                        a.toolbar = a.toolbar || [], a.toolbar.length ? t.invoke("buttons.build", r, a.toolbar) : r.hide(), 
                        a.toolbarContainer && r.appendTo(a.toolbarContainer), this.changeContainer(!1), 
                        o.on("summernote.keyup summernote.mouseup summernote.change", function() {
                            t.invoke("buttons.updateCurrentStyle");
                        }), t.invoke("buttons.updateCurrentStyle");
                    }, this.destroy = function() {
                        r.children().remove();
                    }, this.changeContainer = function(e) {
                        e ? r.prependTo(i) : a.toolbarContainer && r.appendTo(a.toolbarContainer);
                    }, this.updateFullscreen = function(e) {
                        n.toggleBtnActive(r.find(".btn-fullscreen"), e), this.changeContainer(e);
                    }, this.updateCodeview = function(e) {
                        n.toggleBtnActive(r.find(".btn-codeview"), e), e ? this.deactivate() : this.activate();
                    }, this.activate = function(e) {
                        var t = r.find("button");
                        e || (t = t.not(".btn-codeview")), n.toggleBtn(t, !0);
                    }, this.deactivate = function(e) {
                        var t = r.find("button");
                        e || (t = t.not(".btn-codeview")), n.toggleBtn(t, !1);
                    };
                },
                linkDialog: function(t) {
                    var n = this, o = e.summernote.ui, i = t.layoutInfo.editor, r = t.options, a = r.langInfo;
                    this.initialize = function() {
                        var t = r.dialogsInBody ? e(document.body) : i, n = '<div class="form-group note-form-group"><label class="note-form-label">' + a.link.textToDisplay + '</label><input class="note-link-text form-control  note-form-control  note-input" type="text" /></div><div class="form-group note-form-group"><label class="note-form-label">' + a.link.url + '</label><input class="note-link-url form-control note-form-control note-input" type="text" value="http://" /></div>' + (r.disableLinkTarget ? "" : e("<div/>").append(o.checkbox({
                            id: "sn-checkbox-open-in-new-window",
                            text: a.link.openInNewWindow,
                            checked: !0
                        }).render()).html()), s = '<button href="#" class="btn btn-primary note-btn note-btn-primary note-link-btn disabled" disabled>' + a.link.insert + "</button>";
                        this.$dialog = o.dialog({
                            className: "link-dialog",
                            title: a.link.insert,
                            fade: r.dialogsFade,
                            body: n,
                            footer: s
                        }).render().appendTo(t);
                    }, this.destroy = function() {
                        o.hideDialog(this.$dialog), this.$dialog.remove();
                    }, this.bindEnterKey = function(e, t) {
                        e.on("keypress", function(e) {
                            e.keyCode === x.code.ENTER && t.trigger("click");
                        });
                    }, this.toggleLinkBtn = function(e, t, n) {
                        o.toggleBtn(e, t.val() && n.val());
                    }, this.showLinkDialog = function(i) {
                        return e.Deferred(function(e) {
                            var r = n.$dialog.find(".note-link-text"), a = n.$dialog.find(".note-link-url"), s = n.$dialog.find(".note-link-btn"), l = n.$dialog.find("input[type=checkbox]");
                            o.onDialogShown(n.$dialog, function() {
                                t.triggerEvent("dialog.shown"), i.url || (i.url = i.text), r.val(i.text);
                                var c = function() {
                                    n.toggleLinkBtn(s, r, a), i.text = r.val();
                                };
                                r.on("input", c).on("paste", function() {
                                    setTimeout(c, 0);
                                });
                                var d = function() {
                                    n.toggleLinkBtn(s, r, a), i.text || r.val(a.val());
                                };
                                a.on("input", d).on("paste", function() {
                                    setTimeout(d, 0);
                                }).val(i.url).trigger("focus"), n.toggleLinkBtn(s, r, a), n.bindEnterKey(a, s), 
                                n.bindEnterKey(r, s);
                                var u = void 0 !== i.isNewWindow ? i.isNewWindow : t.options.linkTargetBlank;
                                l.prop("checked", u), s.one("click", function(t) {
                                    t.preventDefault(), e.resolve({
                                        range: i.range,
                                        url: a.val(),
                                        text: r.val(),
                                        isNewWindow: l.is(":checked")
                                    }), o.hideDialog(n.$dialog);
                                });
                            }), o.onDialogHidden(n.$dialog, function() {
                                r.off("input paste keypress"), a.off("input paste keypress"), s.off("click"), "pending" === e.state() && e.reject();
                            }), o.showDialog(n.$dialog);
                        }).promise();
                    }, this.show = function() {
                        var e = t.invoke("editor.getLinkInfo");
                        t.invoke("editor.saveRange"), this.showLinkDialog(e).then(function(e) {
                            t.invoke("editor.restoreRange"), t.invoke("editor.createLink", e);
                        }).fail(function() {
                            t.invoke("editor.restoreRange");
                        });
                    }, t.memo("help.linkDialog.show", r.langInfo.help["linkDialog.show"]);
                },
                linkPopover: function(t) {
                    var n = this, o = e.summernote.ui, i = t.options;
                    this.events = {
                        "summernote.keyup summernote.mouseup summernote.change summernote.scroll": function() {
                            n.update();
                        },
                        "summernote.disable summernote.dialog.shown": function() {
                            n.hide();
                        }
                    }, this.shouldInitialize = function() {
                        return !u.isEmpty(i.popover.link);
                    }, this.initialize = function() {
                        this.$popover = o.popover({
                            className: "note-link-popover",
                            callback: function(e) {
                                e.find(".popover-content,.note-popover-content").prepend('<span><a target="_blank"></a>&nbsp;</span>');
                            }
                        }).render().appendTo("body");
                        var e = this.$popover.find(".popover-content,.note-popover-content");
                        t.invoke("buttons.build", e, i.popover.link);
                    }, this.destroy = function() {
                        this.$popover.remove();
                    }, this.update = function() {
                        if (t.invoke("editor.hasFocus")) {
                            var n = t.invoke("editor.createRange");
                            if (n.isCollapsed() && n.isOnAnchor()) {
                                var o = h.ancestor(n.sc, h.isAnchor), i = e(o).attr("href");
                                this.$popover.find("a").attr("href", i).html(i);
                                var r = h.posFromPlaceholder(o);
                                this.$popover.css({
                                    display: "block",
                                    left: r.left,
                                    top: r.top
                                });
                            } else this.hide();
                        } else this.hide();
                    }, this.hide = function() {
                        this.$popover.hide();
                    };
                },
                imageDialog: function(t) {
                    var n = this, o = e.summernote.ui, i = t.layoutInfo.editor, r = t.options, a = r.langInfo;
                    this.initialize = function() {
                        var t = r.dialogsInBody ? e(document.body) : i, n = "";
                        if (r.maximumImageFileSize) {
                            var s = Math.floor(Math.log(r.maximumImageFileSize) / Math.log(1024)), l = 1 * (r.maximumImageFileSize / Math.pow(1024, s)).toFixed(2) + " " + " KMGTP"[s] + "B";
                            n = "<small>" + a.image.maximumFileSize + " : " + l + "</small>";
                        }
                        var c = '<div class="form-group note-form-group note-group-select-from-files"><label class="note-form-label">' + a.image.selectFromFiles + '</label><input class="note-image-input form-control note-form-control note-input"  type="file" name="files" accept="image/*" multiple="multiple" />' + n + '</div><div class="form-group note-group-image-url" style="overflow:auto;"><label class="note-form-label">' + a.image.url + '</label><input class="note-image-url form-control note-form-control note-input  col-md-12" type="text" /></div>', d = '<button href="#" class="btn btn-primary note-btn note-btn-primary note-image-btn disabled" disabled>' + a.image.insert + "</button>";
                        this.$dialog = o.dialog({
                            title: a.image.insert,
                            fade: r.dialogsFade,
                            body: c,
                            footer: d
                        }).render().appendTo(t);
                    }, this.destroy = function() {
                        o.hideDialog(this.$dialog), this.$dialog.remove();
                    }, this.bindEnterKey = function(e, t) {
                        e.on("keypress", function(e) {
                            e.keyCode === x.code.ENTER && t.trigger("click");
                        });
                    }, this.show = function() {
                        t.invoke("editor.saveRange"), this.showImageDialog().then(function(e) {
                            o.hideDialog(n.$dialog), t.invoke("editor.restoreRange"), "string" == typeof e ? t.invoke("editor.insertImage", e) : t.invoke("editor.insertImagesOrCallback", e);
                        }).fail(function() {
                            t.invoke("editor.restoreRange");
                        });
                    }, this.showImageDialog = function() {
                        return e.Deferred(function(e) {
                            var i = n.$dialog.find(".note-image-input"), r = n.$dialog.find(".note-image-url"), a = n.$dialog.find(".note-image-btn");
                            o.onDialogShown(n.$dialog, function() {
                                t.triggerEvent("dialog.shown"), i.replaceWith(i.clone().on("change", function() {
                                    e.resolve(this.files || this.value);
                                }).val("")), a.click(function(t) {
                                    t.preventDefault(), e.resolve(r.val());
                                }), r.on("keyup paste", function() {
                                    var e = r.val();
                                    o.toggleBtn(a, e);
                                }).val("").trigger("focus"), n.bindEnterKey(r, a);
                            }), o.onDialogHidden(n.$dialog, function() {
                                i.off("change"), r.off("keyup paste keypress"), a.off("click"), "pending" === e.state() && e.reject();
                            }), o.showDialog(n.$dialog);
                        });
                    };
                },
                imagePopover: function(t) {
                    var n = this, o = e.summernote.ui, i = t.layoutInfo.editable[0], r = t.options;
                    this.events = {
                        "summernote.disable": function() {
                            n.hide();
                        }
                    }, this.shouldInitialize = function() {
                        return !u.isEmpty(r.popover.image);
                    }, this.initialize = function() {
                        this.$popover = o.popover({
                            className: "note-image-popover"
                        }).render().appendTo("body");
                        var e = this.$popover.find(".popover-content,.note-popover-content");
                        t.invoke("buttons.build", e, r.popover.image);
                    }, this.destroy = function() {
                        this.$popover.remove();
                    }, this.update = function(e) {
                        if (h.isImg(e)) {
                            var t = h.posFromPlaceholder(e), n = h.posFromPlaceholder(i);
                            this.$popover.css({
                                display: "block",
                                left: t.left,
                                top: Math.min(t.top, n.top)
                            });
                        } else this.hide();
                    }, this.hide = function() {
                        this.$popover.hide();
                    };
                },
                tablePopover: function(t) {
                    var n = this, o = e.summernote.ui, i = t.options;
                    this.events = {
                        "summernote.mousedown": function(e, t) {
                            n.update(t.target);
                        },
                        "summernote.keyup summernote.scroll summernote.change": function() {
                            n.update();
                        },
                        "summernote.disable": function() {
                            n.hide();
                        }
                    }, this.shouldInitialize = function() {
                        return !u.isEmpty(i.popover.table);
                    }, this.initialize = function() {
                        this.$popover = o.popover({
                            className: "note-table-popover"
                        }).render().appendTo("body");
                        var e = this.$popover.find(".popover-content,.note-popover-content");
                        t.invoke("buttons.build", e, i.popover.table), c.isFF && document.execCommand("enableInlineTableEditing", !1, !1);
                    }, this.destroy = function() {
                        this.$popover.remove();
                    }, this.update = function(e) {
                        if (t.isDisabled()) return !1;
                        var n = h.isCell(e);
                        if (n) {
                            var o = h.posFromPlaceholder(e);
                            this.$popover.css({
                                display: "block",
                                left: o.left,
                                top: o.top
                            });
                        } else this.hide();
                        return n;
                    }, this.hide = function() {
                        this.$popover.hide();
                    };
                },
                videoDialog: function(t) {
                    var n = this, o = e.summernote.ui, i = t.layoutInfo.editor, r = t.options, a = r.langInfo;
                    this.initialize = function() {
                        var t = r.dialogsInBody ? e(document.body) : i, n = '<div class="form-group note-form-group row-fluid"><label class="note-form-label">' + a.video.url + ' <small class="text-muted">' + a.video.providers + '</small></label><input class="note-video-url form-control  note-form-control note-input span12"  type="text" /></div>', s = '<button href="#" class="btn btn-primary note-btn note-btn-primary  note-video-btn disabled" disabled>' + a.video.insert + "</button>";
                        this.$dialog = o.dialog({
                            title: a.video.insert,
                            fade: r.dialogsFade,
                            body: n,
                            footer: s
                        }).render().appendTo(t);
                    }, this.destroy = function() {
                        o.hideDialog(this.$dialog), this.$dialog.remove();
                    }, this.bindEnterKey = function(e, t) {
                        e.on("keypress", function(e) {
                            e.keyCode === x.code.ENTER && t.trigger("click");
                        });
                    }, this.createVideoNode = function(t) {
                        var n, o = t.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/), i = t.match(/(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/), r = t.match(/\/\/vine\.co\/v\/([a-zA-Z0-9]+)/), a = t.match(/\/\/(player\.)?vimeo\.com\/([a-z]*\/)*(\d+)[?]?.*/), s = t.match(/.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/), l = t.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/), c = t.match(/\/\/v\.qq\.com.*?vid=(.+)/), d = t.match(/\/\/v\.qq\.com\/x?\/?(page|cover).*?\/([^\/]+)\.html\??.*/), u = t.match(/^.+.(mp4|m4v)$/), f = t.match(/^.+.(ogg|ogv)$/), h = t.match(/^.+.(webm)$/);
                        if (o && 11 === o[1].length) {
                            var m = o[1];
                            n = e("<iframe>").attr("frameborder", 0).attr("src", "//www.youtube.com/embed/" + m).attr("width", "640").attr("height", "360");
                        } else if (i && i[0].length) n = e("<iframe>").attr("frameborder", 0).attr("src", "https://instagram.com/p/" + i[1] + "/embed/").attr("width", "612").attr("height", "710").attr("scrolling", "no").attr("allowtransparency", "true"); else if (r && r[0].length) n = e("<iframe>").attr("frameborder", 0).attr("src", r[0] + "/embed/simple").attr("width", "600").attr("height", "600").attr("class", "vine-embed"); else if (a && a[3].length) n = e("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("src", "//player.vimeo.com/video/" + a[3]).attr("width", "640").attr("height", "360"); else if (s && s[2].length) n = e("<iframe>").attr("frameborder", 0).attr("src", "//www.dailymotion.com/embed/video/" + s[2]).attr("width", "640").attr("height", "360"); else if (l && l[1].length) n = e("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("height", "498").attr("width", "510").attr("src", "//player.youku.com/embed/" + l[1]); else if (c && c[1].length || d && d[2].length) {
                            var p = c && c[1].length ? c[1] : d[2];
                            n = e("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("height", "310").attr("width", "500").attr("src", "http://v.qq.com/iframe/player.html?vid=" + p + "&amp;auto=0");
                        } else {
                            if (!(u || f || h)) return !1;
                            n = e("<video controls>").attr("src", t).attr("width", "640").attr("height", "360");
                        }
                        return n.addClass("note-video-clip"), n[0];
                    }, this.show = function() {
                        var e = t.invoke("editor.getSelectedText");
                        t.invoke("editor.saveRange"), this.showVideoDialog(e).then(function(e) {
                            o.hideDialog(n.$dialog), t.invoke("editor.restoreRange");
                            var i = n.createVideoNode(e);
                            i && t.invoke("editor.insertNode", i);
                        }).fail(function() {
                            t.invoke("editor.restoreRange");
                        });
                    }, this.showVideoDialog = function(i) {
                        return e.Deferred(function(e) {
                            var r = n.$dialog.find(".note-video-url"), a = n.$dialog.find(".note-video-btn");
                            o.onDialogShown(n.$dialog, function() {
                                t.triggerEvent("dialog.shown"), r.val(i).on("input", function() {
                                    o.toggleBtn(a, r.val());
                                }).trigger("focus"), a.click(function(t) {
                                    t.preventDefault(), e.resolve(r.val());
                                }), n.bindEnterKey(r, a);
                            }), o.onDialogHidden(n.$dialog, function() {
                                r.off("input"), a.off("click"), "pending" === e.state() && e.reject();
                            }), o.showDialog(n.$dialog);
                        });
                    };
                },
                helpDialog: function(t) {
                    var n = this, o = e.summernote.ui, i = t.layoutInfo.editor, r = t.options, a = r.langInfo;
                    this.createShortCutList = function() {
                        var n = r.keyMap[c.isMac ? "mac" : "pc"];
                        return Object.keys(n).map(function(o) {
                            var i = n[o], r = e('<div><div class="help-list-item"/></div>');
                            return r.append(e("<label><kbd>" + o + "</kdb></label>").css({
                                width: 180,
                                "margin-right": 10
                            })).append(e("<span/>").html(t.memo("help." + i) || i)), r.html();
                        }).join("");
                    }, this.initialize = function() {
                        var t = r.dialogsInBody ? e(document.body) : i, n = [ '<p class="text-center">', '<a href="http://summernote.org/" target="_blank">Summernote 0.8.8</a> · ', '<a href="https://github.com/summernote/summernote" target="_blank">Project</a> · ', '<a href="https://github.com/summernote/summernote/issues" target="_blank">Issues</a>', "</p>" ].join("");
                        this.$dialog = o.dialog({
                            title: a.options.help,
                            fade: r.dialogsFade,
                            body: this.createShortCutList(),
                            footer: n,
                            callback: function(e) {
                                e.find(".modal-body,.note-modal-body").css({
                                    "max-height": 300,
                                    overflow: "scroll"
                                });
                            }
                        }).render().appendTo(t);
                    }, this.destroy = function() {
                        o.hideDialog(this.$dialog), this.$dialog.remove();
                    }, this.showHelpDialog = function() {
                        return e.Deferred(function(e) {
                            o.onDialogShown(n.$dialog, function() {
                                t.triggerEvent("dialog.shown"), e.resolve();
                            }), o.showDialog(n.$dialog);
                        }).promise();
                    }, this.show = function() {
                        t.invoke("editor.saveRange"), this.showHelpDialog().then(function() {
                            t.invoke("editor.restoreRange");
                        });
                    };
                },
                airPopover: function(t) {
                    var n = this, o = e.summernote.ui, i = t.options;
                    this.events = {
                        "summernote.keyup summernote.mouseup summernote.scroll": function() {
                            n.update();
                        },
                        "summernote.disable summernote.change summernote.dialog.shown": function() {
                            n.hide();
                        },
                        "summernote.focusout": function(e, t) {
                            c.isFF || t.relatedTarget && h.ancestor(t.relatedTarget, d.eq(n.$popover[0])) || n.hide();
                        }
                    }, this.shouldInitialize = function() {
                        return i.airMode && !u.isEmpty(i.popover.air);
                    }, this.initialize = function() {
                        this.$popover = o.popover({
                            className: "note-air-popover"
                        }).render().appendTo("body");
                        var e = this.$popover.find(".popover-content");
                        t.invoke("buttons.build", e, i.popover.air);
                    }, this.destroy = function() {
                        this.$popover.remove();
                    }, this.update = function() {
                        var e = t.invoke("editor.currentStyle");
                        if (e.range && !e.range.isCollapsed()) {
                            var n = u.last(e.range.getClientRects());
                            if (n) {
                                var o = d.rect2bnd(n);
                                this.$popover.css({
                                    display: "block",
                                    left: Math.max(o.left + o.width / 2, 0) - 20,
                                    top: o.top + o.height
                                }), t.invoke("buttons.updateCurrentStyle", this.$popover);
                            }
                        } else this.hide();
                    }, this.hide = function() {
                        this.$popover.hide();
                    };
                }
            },
            buttons: {},
            lang: "en-US",
            toolbar: [ [ "style", [ "style" ] ], [ "font", [ "bold", "underline", "clear" ] ], [ "fontname", [ "fontname" ] ], [ "color", [ "color" ] ], [ "para", [ "ul", "ol", "paragraph" ] ], [ "table", [ "table" ] ], [ "insert", [ "link", "picture", "video" ] ], [ "view", [ "fullscreen", "codeview", "help" ] ] ],
            popover: {
                image: [ [ "imagesize", [ "imageSize100", "imageSize50", "imageSize25" ] ], [ "float", [ "floatLeft", "floatRight", "floatNone" ] ], [ "remove", [ "removeMedia" ] ] ],
                link: [ [ "link", [ "linkDialogShow", "unlink" ] ] ],
                table: [ [ "add", [ "addRowDown", "addRowUp", "addColLeft", "addColRight" ] ], [ "delete", [ "deleteRow", "deleteCol", "deleteTable" ] ] ],
                air: [ [ "color", [ "color" ] ], [ "font", [ "bold", "underline", "clear" ] ], [ "para", [ "ul", "paragraph" ] ], [ "table", [ "table" ] ], [ "insert", [ "link", "picture" ] ] ]
            },
            airMode: !1,
            width: null,
            height: null,
            linkTargetBlank: !0,
            focus: !1,
            tabSize: 4,
            styleWithSpan: !0,
            shortcuts: !0,
            textareaAutoSync: !0,
            direction: null,
            tooltip: "auto",
            styleTags: [ "p", "blockquote", "pre", "h1", "h2", "h3", "h4", "h5", "h6" ],
            fontNames: [ "Arial", "Arial Black", "Comic Sans MS", "Courier New", "Helvetica Neue", "Helvetica", "Impact", "Lucida Grande", "Tahoma", "Times New Roman", "Verdana" ],
            fontSizes: [ "8", "9", "10", "11", "12", "14", "18", "24", "36" ],
            colors: [ [ "#000000", "#424242", "#636363", "#9C9C94", "#CEC6CE", "#EFEFEF", "#F7F7F7", "#FFFFFF" ], [ "#FF0000", "#FF9C00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#9C00FF", "#FF00FF" ], [ "#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE" ], [ "#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD" ], [ "#E76363", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5" ], [ "#CE0000", "#E79439", "#EFC631", "#6BA54A", "#4A7B8C", "#3984C6", "#634AA5", "#A54A7B" ], [ "#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842" ], [ "#630000", "#7B3900", "#846300", "#295218", "#083139", "#003163", "#21104A", "#4A1031" ] ],
            lineHeights: [ "1.0", "1.2", "1.4", "1.5", "1.6", "1.8", "2.0", "3.0" ],
            tableClassName: "table table-bordered",
            insertTableMaxSize: {
                col: 10,
                row: 10
            },
            dialogsInBody: !1,
            dialogsFade: !1,
            maximumImageFileSize: null,
            callbacks: {
                onInit: null,
                onFocus: null,
                onBlur: null,
                onEnter: null,
                onKeyup: null,
                onKeydown: null,
                onImageUpload: null,
                onImageUploadError: null
            },
            codemirror: {
                mode: "text/html",
                htmlMode: !0,
                lineNumbers: !0
            },
            keyMap: {
                pc: {
                    ENTER: "insertParagraph",
                    "CTRL+Z": "undo",
                    "CTRL+Y": "redo",
                    TAB: "tab",
                    "SHIFT+TAB": "untab",
                    "CTRL+B": "bold",
                    "CTRL+I": "italic",
                    "CTRL+U": "underline",
                    "CTRL+SHIFT+S": "strikethrough",
                    "CTRL+BACKSLASH": "removeFormat",
                    "CTRL+SHIFT+L": "justifyLeft",
                    "CTRL+SHIFT+E": "justifyCenter",
                    "CTRL+SHIFT+R": "justifyRight",
                    "CTRL+SHIFT+J": "justifyFull",
                    "CTRL+SHIFT+NUM7": "insertUnorderedList",
                    "CTRL+SHIFT+NUM8": "insertOrderedList",
                    "CTRL+LEFTBRACKET": "outdent",
                    "CTRL+RIGHTBRACKET": "indent",
                    "CTRL+NUM0": "formatPara",
                    "CTRL+NUM1": "formatH1",
                    "CTRL+NUM2": "formatH2",
                    "CTRL+NUM3": "formatH3",
                    "CTRL+NUM4": "formatH4",
                    "CTRL+NUM5": "formatH5",
                    "CTRL+NUM6": "formatH6",
                    "CTRL+ENTER": "insertHorizontalRule",
                    "CTRL+K": "linkDialog.show"
                },
                mac: {
                    ENTER: "insertParagraph",
                    "CMD+Z": "undo",
                    "CMD+SHIFT+Z": "redo",
                    TAB: "tab",
                    "SHIFT+TAB": "untab",
                    "CMD+B": "bold",
                    "CMD+I": "italic",
                    "CMD+U": "underline",
                    "CMD+SHIFT+S": "strikethrough",
                    "CMD+BACKSLASH": "removeFormat",
                    "CMD+SHIFT+L": "justifyLeft",
                    "CMD+SHIFT+E": "justifyCenter",
                    "CMD+SHIFT+R": "justifyRight",
                    "CMD+SHIFT+J": "justifyFull",
                    "CMD+SHIFT+NUM7": "insertUnorderedList",
                    "CMD+SHIFT+NUM8": "insertOrderedList",
                    "CMD+LEFTBRACKET": "outdent",
                    "CMD+RIGHTBRACKET": "indent",
                    "CMD+NUM0": "formatPara",
                    "CMD+NUM1": "formatH1",
                    "CMD+NUM2": "formatH2",
                    "CMD+NUM3": "formatH3",
                    "CMD+NUM4": "formatH4",
                    "CMD+NUM5": "formatH5",
                    "CMD+NUM6": "formatH6",
                    "CMD+ENTER": "insertHorizontalRule",
                    "CMD+K": "linkDialog.show"
                }
            },
            icons: {
                align: "note-icon-align",
                alignCenter: "note-icon-align-center",
                alignJustify: "note-icon-align-justify",
                alignLeft: "note-icon-align-left",
                alignRight: "note-icon-align-right",
                rowBelow: "note-icon-row-below",
                colBefore: "note-icon-col-before",
                colAfter: "note-icon-col-after",
                rowAbove: "note-icon-row-above",
                rowRemove: "note-icon-row-remove",
                colRemove: "note-icon-col-remove",
                indent: "note-icon-align-indent",
                outdent: "note-icon-align-outdent",
                arrowsAlt: "note-icon-arrows-alt",
                bold: "note-icon-bold",
                caret: "note-icon-caret",
                circle: "note-icon-circle",
                close: "note-icon-close",
                code: "note-icon-code",
                eraser: "note-icon-eraser",
                font: "note-icon-font",
                frame: "note-icon-frame",
                italic: "note-icon-italic",
                link: "note-icon-link",
                unlink: "note-icon-chain-broken",
                magic: "note-icon-magic",
                menuCheck: "note-icon-menu-check",
                minus: "note-icon-minus",
                orderedlist: "note-icon-orderedlist",
                pencil: "note-icon-pencil",
                picture: "note-icon-picture",
                question: "note-icon-question",
                redo: "note-icon-redo",
                square: "note-icon-square",
                strikethrough: "note-icon-strikethrough",
                subscript: "note-icon-subscript",
                superscript: "note-icon-superscript",
                table: "note-icon-table",
                textHeight: "note-icon-text-height",
                trash: "note-icon-trash",
                underline: "note-icon-underline",
                undo: "note-icon-undo",
                unorderedlist: "note-icon-unorderedlist",
                video: "note-icon-video"
            }
        }
    });
});