!function(e) {
    function t() {
        return "Markdown.mk_block( " + uneval(this.toString()) + ", " + uneval(this.trailing) + ", " + uneval(this.lineNumber) + " )";
    }
    function r() {
        var e = require("util");
        return "Markdown.mk_block( " + e.inspect(this.toString()) + ", " + e.inspect(this.trailing) + ", " + e.inspect(this.lineNumber) + " )";
    }
    function n(e) {
        for (var t = 0, r = -1; -1 !== (r = e.indexOf("\n", r + 1)); ) t++;
        return t;
    }
    function i(e, t) {
        function r(e) {
            this.len_after = e, this.name = "close_" + t;
        }
        var n = e + "_state", i = "strong" == e ? "em_state" : "strong_state";
        return function(l, s) {
            if (this[n][0] == t) return this[n].shift(), [ l.length, new r(l.length - t.length) ];
            var a = this[i].slice(), c = this[n].slice();
            this[n].unshift(t);
            var o = this.processInline(l.substr(t.length)), h = o[o.length - 1];
            this[n].shift();
            return h instanceof r ? (o.pop(), [ l.length - h.len_after, [ e ].concat(o) ]) : (this[i] = a, 
            this[n] = c, [ t.length, t ]);
        };
    }
    function l(e) {
        for (var t = e.split(""), r = [ "" ], n = !1; t.length; ) {
            var i = t.shift();
            switch (i) {
              case " ":
                n ? r[r.length - 1] += i : r.push("");
                break;

              case "'":
              case '"':
                n = !n;
                break;

              case "\\":
                i = t.shift();

              default:
                r[r.length - 1] += i;
            }
        }
        return r;
    }
    function s(e) {
        return d(e) && e.length > 1 && "object" == typeof e[1] && !d(e[1]) ? e[1] : void 0;
    }
    function c(e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    function o(e) {
        if ("string" == typeof e) return c(e);
        var t = e.shift(), r = {}, n = [];
        for (!e.length || "object" != typeof e[0] || e[0] instanceof Array || (r = e.shift()); e.length; ) n.push(o(e.shift()));
        var i = "";
        for (var l in r) i += " " + l + '="' + c(r[l]) + '"';
        return "img" == t || "br" == t || "hr" == t ? "<" + t + i + "/>" : "<" + t + i + ">" + n.join("") + "</" + t + ">";
    }
    function h(e, t, r) {
        var n;
        r = r || {};
        var i = e.slice(0);
        "function" == typeof r.preprocessTreeNode && (i = r.preprocessTreeNode(i, t));
        var l = s(i);
        if (l) {
            i[1] = {};
            for (n in l) i[1][n] = l[n];
            l = i[1];
        }
        if ("string" == typeof i) return i;
        switch (i[0]) {
          case "header":
            i[0] = "h" + i[1].level, delete i[1].level;
            break;

          case "bulletlist":
            i[0] = "ul";
            break;

          case "numberlist":
            i[0] = "ol";
            break;

          case "listitem":
            i[0] = "li";
            break;

          case "para":
            i[0] = "p";
            break;

          case "markdown":
            i[0] = "html", l && delete l.references;
            break;

          case "code_block":
            i[0] = "pre", n = l ? 2 : 1;
            var a = [ "code" ];
            a.push.apply(a, i.splice(n, i.length - n)), i[n] = a;
            break;

          case "inlinecode":
            i[0] = "code";
            break;

          case "img":
            i[1].src = i[1].href, delete i[1].href;
            break;

          case "linebreak":
            i[0] = "br";
            break;

          case "link":
            i[0] = "a";
            break;

          case "link_ref":
            if (i[0] = "a", !(c = t[l.ref])) return l.original;
            delete l.ref, l.href = c.href, c.title && (l.title = c.title), delete l.original;
            break;

          case "img_ref":
            i[0] = "img";
            var c = t[l.ref];
            if (!c) return l.original;
            delete l.ref, l.src = c.href, c.title && (l.title = c.title), delete l.original;
        }
        if (n = 1, l) {
            for (var o in i[1]) {
                n = 2;
                break;
            }
            1 === n && i.splice(n, 1);
        }
        for (;n < i.length; ++n) i[n] = h(i[n], t, r);
        return i;
    }
    function u(e) {
        for (var t = s(e) ? 2 : 1; t < e.length; ) "string" == typeof e[t] ? t + 1 < e.length && "string" == typeof e[t + 1] ? e[t] += e.splice(t + 1, 1)[0] : ++t : (u(e[t]), 
        ++t);
    }
    var f = e.Markdown = function(e) {
        switch (typeof e) {
          case "undefined":
            this.dialect = f.dialects.Gruber;
            break;

          case "object":
            this.dialect = e;
            break;

          default:
            if (!(e in f.dialects)) throw new Error("Unknown Markdown dialect '" + String(e) + "'");
            this.dialect = f.dialects[e];
        }
        this.em_state = [], this.strong_state = [], this.debug_indent = "";
    };
    e.parse = function(e, t) {
        return new f(t).toTree(e);
    }, e.toHTML = function(t, r, n) {
        var i = e.toHTMLTree(t, r, n);
        return e.renderJsonML(i);
    }, e.toHTMLTree = function(e, t, r) {
        "string" == typeof e && (e = this.parse(e, t));
        var n = s(e), i = {};
        n && n.references && (i = n.references);
        var l = h(e, i, r);
        return u(l), l;
    };
    var g = f.mk_block = function(e, n, i) {
        1 == arguments.length && (n = "\n\n");
        var l = new String(e);
        return l.trailing = n, l.inspect = r, l.toSource = t, void 0 != i && (l.lineNumber = i), 
        l;
    };
    f.prototype.split_blocks = function(e, t) {
        var r, i = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g, l = [], s = 1;
        for (null != (r = /^(\s*\n)/.exec(e = e.replace(/(\r\n|\n|\r)/g, "\n"))) && (s += n(r[0]), 
        i.lastIndex = r[0].length); null !== (r = i.exec(e)); ) "\n#" == r[2] && (r[2] = "\n", 
        i.lastIndex--), l.push(g(r[1], r[2], s)), s += n(r[0]);
        return l;
    }, f.prototype.processBlock = function(e, t) {
        var r = this.dialect.block, n = r.__order__;
        if ("__call__" in r) return r.__call__.call(this, e, t);
        for (var i = 0; i < n.length; i++) {
            var l = r[n[i]].call(this, e, t);
            if (l) return (!d(l) || l.length > 0 && !d(l[0])) && this.debug(n[i], "didn't return a proper array"), 
            l;
        }
        return [];
    }, f.prototype.processInline = function(e) {
        return this.dialect.inline.__call__.call(this, String(e));
    }, f.prototype.toTree = function(e, t) {
        var r = e instanceof Array ? e : this.split_blocks(e), n = this.tree;
        try {
            for (this.tree = t || this.tree || [ "markdown" ]; r.length; ) {
                var i = this.processBlock(r.shift(), r);
                i.length && this.tree.push.apply(this.tree, i);
            }
            return this.tree;
        } finally {
            t && (this.tree = n);
        }
    }, f.prototype.debug = function() {
        var e = Array.prototype.slice.call(arguments);
        e.unshift(this.debug_indent), "undefined" != typeof print && print.apply(print, e), 
        "undefined" != typeof console && void 0 !== console.log && console.log.apply(null, e);
    }, f.prototype.loop_re_over_block = function(e, t, r) {
        for (var n, i = t.valueOf(); i.length && null != (n = e.exec(i)); ) i = i.substr(n[0].length), 
        r.call(this, n);
        return i;
    }, f.dialects = {}, f.dialects.Gruber = {
        block: {
            atxHeader: function(e, t) {
                var r = e.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);
                if (r) {
                    var n = [ "header", {
                        level: r[1].length
                    } ];
                    return Array.prototype.push.apply(n, this.processInline(r[2])), r[0].length < e.length && t.unshift(g(e.substr(r[0].length), e.trailing, e.lineNumber + 2)), 
                    [ n ];
                }
            },
            setextHeader: function(e, t) {
                var r = e.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);
                if (r) {
                    var n = [ "header", {
                        level: "=" === r[2] ? 1 : 2
                    }, r[1] ];
                    return r[0].length < e.length && t.unshift(g(e.substr(r[0].length), e.trailing, e.lineNumber + 2)), 
                    [ n ];
                }
            },
            code: function(e, t) {
                var r = [], n = /^(?: {0,3}\t| {4})(.*)\n?/;
                if (e.match(n)) {
                    e: for (;;) {
                        var i = this.loop_re_over_block(n, e.valueOf(), function(e) {
                            r.push(e[1]);
                        });
                        if (i.length) {
                            t.unshift(g(i, e.trailing));
                            break e;
                        }
                        if (!t.length) break e;
                        if (!t[0].match(n)) break e;
                        r.push(e.trailing.replace(/[^\n]/g, "").substring(2)), e = t.shift();
                    }
                    return [ [ "code_block", r.join("\n") ] ];
                }
            },
            horizRule: function(e, t) {
                var r = e.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);
                if (r) {
                    var n = [ [ "hr" ] ];
                    return r[1] && n.unshift.apply(n, this.processBlock(r[1], [])), r[3] && t.unshift(g(r[3])), 
                    n;
                }
            },
            lists: function() {
                function e(e) {
                    return new RegExp("(?:^(" + c + "{0," + e + "} {0,3})(" + l + ")\\s+)|(^" + c + "{0," + (e - 1) + "}[ ]{0,4})");
                }
                function t(e) {
                    return e.replace(/ {0,3}\t/g, "    ");
                }
                function r(e, t, r, n) {
                    if (t) e.push([ "para" ].concat(r)); else {
                        var i = e[e.length - 1] instanceof Array && "para" == e[e.length - 1][0] ? e[e.length - 1] : e;
                        n && e.length > 1 && r.unshift(n);
                        for (var l = 0; l < r.length; l++) {
                            var s = r[l];
                            "string" == typeof s && i.length > 1 && "string" == typeof i[i.length - 1] ? i[i.length - 1] += s : i.push(s);
                        }
                    }
                }
                function n(e, t) {
                    for (var r = new RegExp("^(" + c + "{" + e + "}.*?\\n?)*$"), n = new RegExp("^" + c + "{" + e + "}", "gm"), i = []; t.length > 0 && r.exec(t[0]); ) {
                        var l = t.shift(), s = l.replace(n, "");
                        i.push(g(s, l.trailing, l.lineNumber));
                    }
                    return i;
                }
                function i(e, t, r) {
                    var n = e.list, i = n[n.length - 1];
                    if (!(i[1] instanceof Array && "para" == i[1][0])) if (t + 1 == r.length) i.push([ "para" ].concat(i.splice(1, i.length - 1))); else {
                        var l = i.pop();
                        i.push([ "para" ].concat(i.splice(1, i.length - 1)), l);
                    }
                }
                var l = "[*+-]|\\d+\\.", s = /[*+-]/, a = new RegExp("^( {0,3})(" + l + ")[ \t]+"), c = "(?: {0,3}\\t| {4})";
                return function(l, c) {
                    function o(e) {
                        var t = s.exec(e[2]) ? [ "bulletlist" ] : [ "numberlist" ];
                        return p.push({
                            list: t,
                            indent: e[1]
                        }), t;
                    }
                    var h = l.match(a);
                    if (h) {
                        for (var u, f, p = [], g = o(h), d = !1, _ = [ p[0].list ]; ;) {
                            for (var b = l.split(/(?=\n)/), k = "", m = 0; m < b.length; m++) {
                                var y = "", w = b[m].replace(/^\n/, function(e) {
                                    return y = e, "";
                                }), $ = e(p.length);
                                if (void 0 !== (h = w.match($))[1]) {
                                    k.length && (r(u, d, this.processInline(k), y), d = !1, k = ""), h[1] = t(h[1]);
                                    var M = Math.floor(h[1].length / 4) + 1;
                                    if (M > p.length) g = o(h), u.push(g), u = g[1] = [ "listitem" ]; else {
                                        var x = !1;
                                        for (f = 0; f < p.length; f++) if (p[f].indent == h[1]) {
                                            g = p[f].list, p.splice(f + 1, p.length - (f + 1)), x = !0;
                                            break;
                                        }
                                        x || (++M <= p.length ? (p.splice(M, p.length - M), g = p[M - 1].list) : (g = o(h), 
                                        u.push(g))), u = [ "listitem" ], g.push(u);
                                    }
                                    y = "";
                                }
                                w.length > h[0].length && (k += y + w.substr(h[0].length));
                            }
                            k.length && (r(u, d, this.processInline(k), y), d = !1, k = "");
                            var S = n(p.length, c);
                            S.length > 0 && (v(p, i, this), u.push.apply(u, this.toTree(S, [])));
                            var A = c[0] && c[0].valueOf() || "";
                            if (!A.match(a) && !A.match(/^ /)) break;
                            l = c.shift();
                            var I = this.dialect.block.horizRule(l, c);
                            if (I) {
                                _.push.apply(_, I);
                                break;
                            }
                            v(p, i, this), d = !0;
                        }
                        return _;
                    }
                };
            }(),
            blockquote: function(e, t) {
                if (e.match(/^>/m)) {
                    var r = [];
                    if (">" != e[0]) {
                        for (var n = e.split(/\n/), i = [], l = e.lineNumber; n.length && ">" != n[0][0]; ) i.push(n.shift()), 
                        l++;
                        var a = g(i.join("\n"), "\n", e.lineNumber);
                        r.push.apply(r, this.processBlock(a, [])), e = g(n.join("\n"), e.trailing, l);
                    }
                    for (;t.length && ">" == t[0][0]; ) {
                        var c = t.shift();
                        e = g(e + e.trailing + c, c.trailing, e.lineNumber);
                    }
                    var o = e.replace(/^> ?/gm, ""), h = (this.tree, this.toTree(o, [ "blockquote" ])), u = s(h);
                    return u && u.references && (delete u.references, _(u) && h.splice(1, 1)), r.push(h), 
                    r;
                }
            },
            referenceDefn: function(e, t) {
                var r = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
                if (e.match(r)) {
                    s(this.tree) || this.tree.splice(1, 0, {});
                    var n = s(this.tree);
                    void 0 === n.references && (n.references = {});
                    var i = this.loop_re_over_block(r, e, function(e) {
                        e[2] && "<" == e[2][0] && ">" == e[2][e[2].length - 1] && (e[2] = e[2].substring(1, e[2].length - 1));
                        var t = n.references[e[1].toLowerCase()] = {
                            href: e[2]
                        };
                        void 0 !== e[4] ? t.title = e[4] : void 0 !== e[5] && (t.title = e[5]);
                    });
                    return i.length && t.unshift(g(i, e.trailing)), [];
                }
            },
            para: function(e, t) {
                return [ [ "para" ].concat(this.processInline(e)) ];
            }
        }
    }, f.dialects.Gruber.inline = {
        __oneElement__: function(e, t, r) {
            var n;
            if (t = t || this.dialect.inline.__patterns__, !(n = new RegExp("([\\s\\S]*?)(" + (t.source || t) + ")").exec(e))) return [ e.length, e ];
            if (n[1]) return [ n[1].length, n[1] ];
            var i;
            return n[2] in this.dialect.inline && (i = this.dialect.inline[n[2]].call(this, e.substr(n.index), n, r || [])), 
            i = i || [ n[2].length, n[2] ];
        },
        __call__: function(e, t) {
            for (var r, n = []; e.length > 0; ) r = this.dialect.inline.__oneElement__.call(this, e, t, n), 
            e = e.substr(r.shift()), v(r, function(e) {
                "string" == typeof e && "string" == typeof n[n.length - 1] ? n[n.length - 1] += e : n.push(e);
            });
            return n;
        },
        "]": function() {},
        "}": function() {},
        __escape__: /^\\[\\`\*_{}\[\]()#\+.!\-]/,
        "\\": function(e) {
            return this.dialect.inline.__escape__.exec(e) ? [ 2, e.charAt(1) ] : [ 1, "\\" ];
        },
        "![": function(e) {
            var t = e.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);
            if (t) {
                t[2] && "<" == t[2][0] && ">" == t[2][t[2].length - 1] && (t[2] = t[2].substring(1, t[2].length - 1)), 
                t[2] = this.dialect.inline.__call__.call(this, t[2], /\\/)[0];
                var r = {
                    alt: t[1],
                    href: t[2] || ""
                };
                return void 0 !== t[4] && (r.title = t[4]), [ t[0].length, [ "img", r ] ];
            }
            return (t = e.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/)) ? [ t[0].length, [ "img_ref", {
                alt: t[1],
                ref: t[2].toLowerCase(),
                original: t[0]
            } ] ] : [ 2, "![" ];
        },
        "[": function(e) {
            var t = String(e), r = f.DialectHelpers.inline_until_char.call(this, e.substr(1), "]");
            if (!r) return [ 1, "[" ];
            var n, i, l = 1 + r[0], s = r[1], a = (e = e.substr(l)).match(/^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);
            if (a) {
                var c = a[1];
                if (l += a[0].length, c && "<" == c[0] && ">" == c[c.length - 1] && (c = c.substring(1, c.length - 1)), 
                !a[3]) for (var o = 1, h = 0; h < c.length; h++) switch (c[h]) {
                  case "(":
                    o++;
                    break;

                  case ")":
                    0 == --o && (l -= c.length - h, c = c.substring(0, h));
                }
                return c = this.dialect.inline.__call__.call(this, c, /\\/)[0], i = {
                    href: c || ""
                }, void 0 !== a[3] && (i.title = a[3]), n = [ "link", i ].concat(s), [ l, n ];
            }
            return (a = e.match(/^\s*\[(.*?)\]/)) ? (l += a[0].length, i = {
                ref: (a[1] || String(s)).toLowerCase(),
                original: t.substr(0, l)
            }, n = [ "link_ref", i ].concat(s), [ l, n ]) : 1 == s.length && "string" == typeof s[0] ? (i = {
                ref: s[0].toLowerCase(),
                original: t.substr(0, l)
            }, n = [ "link_ref", i, s[0] ], [ l, n ]) : [ 1, "[" ];
        },
        "<": function(e) {
            var t;
            return null != (t = e.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/)) ? t[3] ? [ t[0].length, [ "link", {
                href: "mailto:" + t[3]
            }, t[3] ] ] : "mailto" == t[2] ? [ t[0].length, [ "link", {
                href: t[1]
            }, t[1].substr("mailto:".length) ] ] : [ t[0].length, [ "link", {
                href: t[1]
            }, t[1] ] ] : [ 1, "<" ];
        },
        "`": function(e) {
            var t = e.match(/(`+)(([\s\S]*?)\1)/);
            return t && t[2] ? [ t[1].length + t[2].length, [ "inlinecode", t[3] ] ] : [ 1, "`" ];
        },
        "  \n": function(e) {
            return [ 3, [ "linebreak" ] ];
        }
    }, f.dialects.Gruber.inline["**"] = i("strong", "**"), f.dialects.Gruber.inline.__ = i("strong", "__"), 
    f.dialects.Gruber.inline["*"] = i("em", "*"), f.dialects.Gruber.inline._ = i("em", "_"), 
    f.buildBlockOrder = function(e) {
        var t = [];
        for (var r in e) "__order__" != r && "__call__" != r && t.push(r);
        e.__order__ = t;
    }, f.buildInlinePatterns = function(e) {
        var t = [];
        for (var r in e) if (!r.match(/^__.*__$/)) {
            var n = r.replace(/([\\.*+?|()\[\]{}])/g, "\\$1").replace(/\n/, "\\n");
            t.push(1 == r.length ? n : "(?:" + n + ")");
        }
        t = t.join("|"), e.__patterns__ = t;
        var i = e.__call__;
        e.__call__ = function(e, r) {
            return void 0 != r ? i.call(this, e, r) : i.call(this, e, t);
        };
    }, f.DialectHelpers = {}, f.DialectHelpers.inline_until_char = function(e, t) {
        for (var r = 0, n = []; ;) {
            if (e.charAt(r) == t) return r++, [ r, n ];
            if (r >= e.length) return null;
            var i = this.dialect.inline.__oneElement__.call(this, e.substr(r));
            r += i[0], n.push.apply(n, i.slice(1));
        }
    }, f.subclassDialect = function(e) {
        function t() {}
        function r() {}
        return t.prototype = e.block, r.prototype = e.inline, {
            block: new t(),
            inline: new r()
        };
    }, f.buildBlockOrder(f.dialects.Gruber.block), f.buildInlinePatterns(f.dialects.Gruber.inline), 
    f.dialects.Maruku = f.subclassDialect(f.dialects.Gruber), f.dialects.Maruku.processMetaHash = function(e) {
        for (var t = l(e), r = {}, n = 0; n < t.length; ++n) if (/^#/.test(t[n])) r.id = t[n].substring(1); else if (/^\./.test(t[n])) r.class ? r.class = r.class + t[n].replace(/./, " ") : r.class = t[n].substring(1); else if (/\=/.test(t[n])) {
            var i = t[n].split(/\=/);
            r[i[0]] = i[1];
        }
        return r;
    }, f.dialects.Maruku.block.document_meta = function(e, t) {
        if (!(e.lineNumber > 1) && e.match(/^(?:\w+:.*\n)*\w+:.*$/)) {
            s(this.tree) || this.tree.splice(1, 0, {});
            var r = e.split(/\n/);
            for (p in r) {
                var n = r[p].match(/(\w+):\s*(.*)$/), i = n[1].toLowerCase(), l = n[2];
                this.tree[1][i] = l;
            }
            return [];
        }
    }, f.dialects.Maruku.block.block_meta = function(e, t) {
        var r = e.match(/(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/);
        if (r) {
            var n, i = this.dialect.processMetaHash(r[2]);
            if ("" === r[1]) {
                var l = this.tree[this.tree.length - 1];
                if (n = s(l), "string" == typeof l) return;
                n || (n = {}, l.splice(1, 0, n));
                for (a in i) n[a] = i[a];
                return [];
            }
            var c = e.replace(/\n.*$/, ""), o = this.processBlock(c, []);
            (n = s(o[0])) || (n = {}, o[0].splice(1, 0, n));
            for (a in i) n[a] = i[a];
            return o;
        }
    }, f.dialects.Maruku.block.definition_list = function(e, t) {
        var r, n, i = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/, l = [ "dl" ];
        if (n = e.match(i)) {
            for (var s = [ e ]; t.length && i.exec(t[0]); ) s.push(t.shift());
            for (var a = 0; a < s.length; ++a) {
                var c = (n = s[a].match(i))[1].replace(/\n$/, "").split(/\n/), o = n[2].split(/\n:\s+/);
                for (r = 0; r < c.length; ++r) l.push([ "dt", c[r] ]);
                for (r = 0; r < o.length; ++r) l.push([ "dd" ].concat(this.processInline(o[r].replace(/(\n)\s+/, "$1"))));
            }
            return [ l ];
        }
    }, f.dialects.Maruku.block.table = function(e, t) {
        var r, n, i = function(e, t) {
            (t = t || "\\s").match(/^[\\|\[\]{}?*.+^$]$/) && (t = "\\" + t);
            for (var r, n = [], i = new RegExp("^((?:\\\\.|[^\\\\" + t + "])*)" + t + "(.*)"); r = e.match(i); ) n.push(r[1]), 
            e = r[2];
            return n.push(e), n;
        };
        if (n = e.match(/^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/)) n[3] = n[3].replace(/^\s*\|/gm, ""); else if (!(n = e.match(/^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/))) return;
        var l = [ "table", [ "thead", [ "tr" ] ], [ "tbody" ] ];
        n[2] = n[2].replace(/\|\s*$/, "").split("|");
        var s = [];
        for (v(n[2], function(e) {
            e.match(/^\s*-+:\s*$/) ? s.push({
                align: "right"
            }) : e.match(/^\s*:-+\s*$/) ? s.push({
                align: "left"
            }) : e.match(/^\s*:-+:\s*$/) ? s.push({
                align: "center"
            }) : s.push({});
        }), n[1] = i(n[1].replace(/\|\s*$/, ""), "|"), r = 0; r < n[1].length; r++) l[1][1].push([ "th", s[r] || {} ].concat(this.processInline(n[1][r].trim())));
        return v(n[3].replace(/\|\s*$/gm, "").split("\n"), function(e) {
            var t = [ "tr" ];
            for (e = i(e, "|"), r = 0; r < e.length; r++) t.push([ "td", s[r] || {} ].concat(this.processInline(e[r].trim())));
            l[2].push(t);
        }, this), [ l ];
    }, f.dialects.Maruku.inline["{:"] = function(e, t, r) {
        if (!r.length) return [ 2, "{:" ];
        var n = r[r.length - 1];
        if ("string" == typeof n) return [ 2, "{:" ];
        var i = e.match(/^\{:\s*((?:\\\}|[^\}])*)\s*\}/);
        if (!i) return [ 2, "{:" ];
        var l = this.dialect.processMetaHash(i[1]), a = s(n);
        a || (a = {}, n.splice(1, 0, a));
        for (var c in l) a[c] = l[c];
        return [ i[0].length, "" ];
    }, f.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/, f.buildBlockOrder(f.dialects.Maruku.block), 
    f.buildInlinePatterns(f.dialects.Maruku.inline);
    var v, d = Array.isArray || function(e) {
        return "[object Array]" == Object.prototype.toString.call(e);
    };
    v = Array.prototype.forEach ? function(e, t, r) {
        return e.forEach(t, r);
    } : function(e, t, r) {
        for (var n = 0; n < e.length; n++) t.call(r || e, e[n], n, e);
    };
    var _ = function(e) {
        for (var t in e) if (hasOwnProperty.call(e, t)) return !1;
        return !0;
    };
    e.renderJsonML = function(e, t) {
        (t = t || {}).root = t.root || !1;
        var r = [];
        if (t.root) r.push(o(e)); else for (e.shift(), !e.length || "object" != typeof e[0] || e[0] instanceof Array || e.shift(); e.length; ) r.push(o(e.shift()));
        return r.join("\n\n");
    };
}("undefined" == typeof exports ? (window.markdown = {}, window.markdown) : exports);