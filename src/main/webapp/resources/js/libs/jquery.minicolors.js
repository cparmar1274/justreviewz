!function(i) {
    "function" == typeof define && define.amd ? define([ "jquery" ], i) : "object" == typeof exports ? module.exports = i(require("jquery")) : i(jQuery);
}(function(i) {
    "use strict";
    function o(i) {
        var t = i.parent();
        i.removeData("minicolors-initialized").removeData("minicolors-settings").removeProp("size").removeClass("minicolors-input"), 
        t.before(i).remove();
    }
    function s(i) {
        var t = i.parent(), o = t.find(".minicolors-panel"), s = i.data("minicolors-settings");
        !i.data("minicolors-initialized") || i.prop("disabled") || t.hasClass("minicolors-inline") || t.hasClass("minicolors-focus") || (a(), 
        t.addClass("minicolors-focus"), o.stop(!0, !0).fadeIn(s.showSpeed, function() {
            s.show && s.show.call(i.get(0));
        }));
    }
    function a() {
        i(".minicolors-focus").each(function() {
            var t = i(this), o = t.find(".minicolors-input"), s = t.find(".minicolors-panel"), a = o.data("minicolors-settings");
            s.fadeOut(a.hideSpeed, function() {
                a.hide && a.hide.call(o.get(0)), t.removeClass("minicolors-focus");
            });
        });
    }
    function n(i, t, o) {
        var s, a, n, e, c = i.parents(".minicolors").find(".minicolors-input"), l = c.data("minicolors-settings"), h = i.find("[class$=-picker]"), d = i.offset().left, p = i.offset().top, u = Math.round(t.pageX - d), g = Math.round(t.pageY - p), m = o ? l.animationSpeed : 0;
        t.originalEvent.changedTouches && (u = t.originalEvent.changedTouches[0].pageX - d, 
        g = t.originalEvent.changedTouches[0].pageY - p), u < 0 && (u = 0), g < 0 && (g = 0), 
        u > i.width() && (u = i.width()), g > i.height() && (g = i.height()), i.parent().is(".minicolors-slider-wheel") && h.parent().is(".minicolors-grid") && (s = 75 - u, 
        a = 75 - g, n = Math.sqrt(s * s + a * a), (e = Math.atan2(a, s)) < 0 && (e += 2 * Math.PI), 
        75 < n && (u = (n = 75) - 75 * Math.cos(e), g = 75 - 75 * Math.sin(e)), u = Math.round(u), 
        g = Math.round(g)), i.is(".minicolors-grid") ? h.stop(!0).animate({
            top: g + "px",
            left: u + "px"
        }, m, l.animationEasing, function() {
            r(c, i);
        }) : h.stop(!0).animate({
            top: g + "px"
        }, m, l.animationEasing, function() {
            r(c, i);
        });
    }
    function r(i, t) {
        function o(i, t) {
            var o, s;
            return i.length && t ? (o = i.offset().left, s = i.offset().top, {
                x: o - t.offset().left + i.outerWidth() / 2,
                y: s - t.offset().top + i.outerHeight() / 2
            }) : null;
        }
        var s, a, n, r, c, h, d, p = i.val(), u = i.attr("data-opacity"), g = i.parent(), m = i.data("minicolors-settings"), v = g.find(".minicolors-input-swatch"), b = g.find(".minicolors-grid"), w = g.find(".minicolors-slider"), y = g.find(".minicolors-opacity-slider"), C = b.find("[class$=-picker]"), M = w.find("[class$=-picker]"), x = y.find("[class$=-picker]"), I = o(C, b), S = o(M, w), z = o(x, y);
        if (t.is(".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider")) {
            switch (m.control) {
              case "wheel":
                r = b.width() / 2 - I.x, c = b.height() / 2 - I.y, h = Math.sqrt(r * r + c * c), 
                (d = Math.atan2(c, r)) < 0 && (d += 2 * Math.PI), 75 < h && (h = 75, I.x = 69 - 75 * Math.cos(d), 
                I.y = 69 - 75 * Math.sin(d)), a = f(h / .75, 0, 100), p = k({
                    h: s = f(180 * d / Math.PI, 0, 360),
                    s: a,
                    b: n = f(100 - Math.floor(S.y * (100 / w.height())), 0, 100)
                }), w.css("backgroundColor", k({
                    h: s,
                    s: a,
                    b: 100
                }));
                break;

              case "saturation":
                p = k({
                    h: s = f(parseInt(I.x * (360 / b.width()), 10), 0, 360),
                    s: a = f(100 - Math.floor(S.y * (100 / w.height())), 0, 100),
                    b: n = f(100 - Math.floor(I.y * (100 / b.height())), 0, 100)
                }), w.css("backgroundColor", k({
                    h: s,
                    s: 100,
                    b: n
                })), g.find(".minicolors-grid-inner").css("opacity", a / 100);
                break;

              case "brightness":
                p = k({
                    h: s = f(parseInt(I.x * (360 / b.width()), 10), 0, 360),
                    s: a = f(100 - Math.floor(I.y * (100 / b.height())), 0, 100),
                    b: n = f(100 - Math.floor(S.y * (100 / w.height())), 0, 100)
                }), w.css("backgroundColor", k({
                    h: s,
                    s: a,
                    b: 100
                })), g.find(".minicolors-grid-inner").css("opacity", 1 - n / 100);
                break;

              default:
                p = k({
                    h: s = f(360 - parseInt(S.y * (360 / w.height()), 10), 0, 360),
                    s: a = f(Math.floor(I.x * (100 / b.width())), 0, 100),
                    b: n = f(100 - Math.floor(I.y * (100 / b.height())), 0, 100)
                }), b.css("backgroundColor", k({
                    h: s,
                    s: 100,
                    b: 100
                }));
            }
            e(i, p, u = m.opacity ? parseFloat(1 - z.y / y.height()).toFixed(2) : 1);
        } else v.find("span").css({
            backgroundColor: p,
            opacity: u
        }), l(i, p, u);
    }
    function e(i, t, o) {
        var s, a = i.parent(), n = i.data("minicolors-settings"), r = a.find(".minicolors-input-swatch");
        n.opacity && i.attr("data-opacity", o), t = "rgb" === n.format ? (s = v(t) ? g(t, !0) : I(u(t, !0)), 
        o = "" === i.attr("data-opacity") ? 1 : f(parseFloat(i.attr("data-opacity")).toFixed(2), 0, 1), 
        !isNaN(o) && n.opacity || (o = 1), i.minicolors("rgbObject").a <= 1 && s && n.opacity ? "rgba(" + s.r + ", " + s.g + ", " + s.b + ", " + parseFloat(o) + ")" : "rgb(" + s.r + ", " + s.g + ", " + s.b + ")") : (v(t) && (t = y(t)), 
        p(t, n.letterCase)), i.val(t), r.find("span").css({
            backgroundColor: t,
            opacity: o
        }), l(i, t, o);
    }
    function c(t, o) {
        var s, a, n, r, e, c, h, d, w, C, x = t.parent(), I = t.data("minicolors-settings"), S = x.find(".minicolors-input-swatch"), z = x.find(".minicolors-grid"), F = x.find(".minicolors-slider"), T = x.find(".minicolors-opacity-slider"), D = z.find("[class$=-picker]"), j = F.find("[class$=-picker]"), q = T.find("[class$=-picker]");
        switch (v(t.val()) ? (s = y(t.val()), (e = f(parseFloat(b(t.val())).toFixed(2), 0, 1)) && t.attr("data-opacity", e)) : s = p(u(t.val(), !0), I.letterCase), 
        s || (s = p(m(I.defaultValue, !0), I.letterCase)), a = M(s), r = I.keywords ? i.map(I.keywords.split(","), function(t) {
            return i.trim(t.toLowerCase());
        }) : [], c = "" !== t.val() && -1 < i.inArray(t.val().toLowerCase(), r) ? p(t.val()) : v(t.val()) ? g(t.val()) : s, 
        o || t.val(c), I.opacity && (n = "" === t.attr("data-opacity") ? 1 : f(parseFloat(t.attr("data-opacity")).toFixed(2), 0, 1), 
        isNaN(n) && (n = 1), t.attr("data-opacity", n), S.find("span").css("opacity", n), 
        d = f(T.height() - T.height() * n, 0, T.height()), q.css("top", d + "px")), "transparent" === t.val().toLowerCase() && S.find("span").css("opacity", 0), 
        S.find("span").css("backgroundColor", s), I.control) {
          case "wheel":
            w = f(Math.ceil(.75 * a.s), 0, z.height() / 2), C = a.h * Math.PI / 180, h = f(75 - Math.cos(C) * w, 0, z.width()), 
            d = f(75 - Math.sin(C) * w, 0, z.height()), D.css({
                top: d + "px",
                left: h + "px"
            }), d = 150 - a.b / (100 / z.height()), "" === s && (d = 0), j.css("top", d + "px"), 
            F.css("backgroundColor", k({
                h: a.h,
                s: a.s,
                b: 100
            }));
            break;

          case "saturation":
            h = f(5 * a.h / 12, 0, 150), d = f(z.height() - Math.ceil(a.b / (100 / z.height())), 0, z.height()), 
            D.css({
                top: d + "px",
                left: h + "px"
            }), d = f(F.height() - a.s * (F.height() / 100), 0, F.height()), j.css("top", d + "px"), 
            F.css("backgroundColor", k({
                h: a.h,
                s: 100,
                b: a.b
            })), x.find(".minicolors-grid-inner").css("opacity", a.s / 100);
            break;

          case "brightness":
            h = f(5 * a.h / 12, 0, 150), d = f(z.height() - Math.ceil(a.s / (100 / z.height())), 0, z.height()), 
            D.css({
                top: d + "px",
                left: h + "px"
            }), d = f(F.height() - a.b * (F.height() / 100), 0, F.height()), j.css("top", d + "px"), 
            F.css("backgroundColor", k({
                h: a.h,
                s: a.s,
                b: 100
            })), x.find(".minicolors-grid-inner").css("opacity", 1 - a.b / 100);
            break;

          default:
            h = f(Math.ceil(a.s / (100 / z.width())), 0, z.width()), d = f(z.height() - Math.ceil(a.b / (100 / z.height())), 0, z.height()), 
            D.css({
                top: d + "px",
                left: h + "px"
            }), d = f(F.height() - a.h / (360 / F.height()), 0, F.height()), j.css("top", d + "px"), 
            z.css("backgroundColor", k({
                h: a.h,
                s: 100,
                b: 100
            }));
        }
        t.data("minicolors-initialized") && l(t, c, n);
    }
    function l(i, t, o) {
        var s, a, n, r = i.data("minicolors-settings"), e = i.data("minicolors-lastChange");
        if (!e || e.value !== t || e.opacity !== o) {
            if (i.data("minicolors-lastChange", {
                value: t,
                opacity: o
            }), r.swatches && 0 !== r.swatches.length) {
                for (s = v(t) ? g(t, !0) : I(t), a = -1, n = 0; n < r.swatches.length; ++n) if (s.r === r.swatches[n].r && s.g === r.swatches[n].g && s.b === r.swatches[n].b && s.a === r.swatches[n].a) {
                    a = n;
                    break;
                }
                i.parent().find(".minicolors-swatches .minicolors-swatch").removeClass("selected"), 
                -1 !== a && i.parent().find(".minicolors-swatches .minicolors-swatch").eq(n).addClass("selected");
            }
            r.change && (r.changeDelay ? (clearTimeout(i.data("minicolors-changeTimeout")), 
            i.data("minicolors-changeTimeout", setTimeout(function() {
                r.change.call(i.get(0), t, o);
            }, r.changeDelay))) : r.change.call(i.get(0), t, o)), i.trigger("change").trigger("input");
        }
    }
    function p(i, t) {
        return "uppercase" === t ? i.toUpperCase() : i.toLowerCase();
    }
    function u(i, t) {
        return (i = i.replace(/^#/g, "")).match(/^[A-F0-9]{3,6}/gi) ? 3 !== i.length && 6 !== i.length ? "" : (3 === i.length && t && (i = i[0] + i[0] + i[1] + i[1] + i[2] + i[2]), 
        "#" + i) : "";
    }
    function g(i, t) {
        var o = i.replace(/[^\d,.]/g, "").split(",");
        return o[0] = f(parseInt(o[0], 10), 0, 255), o[1] = f(parseInt(o[1], 10), 0, 255), 
        o[2] = f(parseInt(o[2], 10), 0, 255), o[3] && (o[3] = f(parseFloat(o[3], 10), 0, 1)), 
        t ? o[3] ? {
            r: o[0],
            g: o[1],
            b: o[2],
            a: o[3]
        } : {
            r: o[0],
            g: o[1],
            b: o[2]
        } : void 0 !== o[3] && o[3] <= 1 ? "rgba(" + o[0] + ", " + o[1] + ", " + o[2] + ", " + o[3] + ")" : "rgb(" + o[0] + ", " + o[1] + ", " + o[2] + ")";
    }
    function m(i, t) {
        return v(i) ? g(i) : u(i, t);
    }
    function f(i, t, o) {
        return i < t && (i = t), o < i && (i = o), i;
    }
    function v(i) {
        var t = i.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return !(!t || 4 !== t.length);
    }
    function b(i) {
        return (i = i.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2})?|\.\d{1,2})[\s+]?/i)) && 6 === i.length ? i[4] : "1";
    }
    function y(i) {
        return (i = i.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === i.length ? "#" + ("0" + parseInt(i[1], 10).toString(16)).slice(-2) + ("0" + parseInt(i[2], 10).toString(16)).slice(-2) + ("0" + parseInt(i[3], 10).toString(16)).slice(-2) : "";
    }
    function C(t) {
        var o = [ t.r.toString(16), t.g.toString(16), t.b.toString(16) ];
        return i.each(o, function(i, t) {
            1 === t.length && (o[i] = "0" + t);
        }), "#" + o.join("");
    }
    function k(i) {
        return C(function(i) {
            var t = {}, o = Math.round(i.h), s = Math.round(255 * i.s / 100), a = Math.round(255 * i.b / 100);
            if (0 === s) t.r = t.g = t.b = a; else {
                var n = a, r = (255 - s) * a / 255, e = o % 60 * (n - r) / 60;
                360 === o && (o = 0), o < 60 ? (t.r = n, t.b = r, t.g = r + e) : o < 120 ? (t.g = n, 
                t.b = r, t.r = n - e) : o < 180 ? (t.g = n, t.r = r, t.b = r + e) : o < 240 ? (t.b = n, 
                t.r = r, t.g = n - e) : o < 300 ? (t.b = n, t.g = r, t.r = r + e) : t.b = o < 360 ? (t.r = n, 
                t.g = r, n - e) : (t.r = 0, t.g = 0);
            }
            return {
                r: Math.round(t.r),
                g: Math.round(t.g),
                b: Math.round(t.b)
            };
        }(i));
    }
    function M(i) {
        var t = function(i) {
            var t = {
                h: 0,
                s: 0,
                b: 0
            }, o = Math.min(i.r, i.g, i.b), s = Math.max(i.r, i.g, i.b), a = s - o;
            return t.b = s, t.s = 0 !== s ? 255 * a / s : 0, 0 !== t.s ? i.r === s ? t.h = (i.g - i.b) / a : i.g === s ? t.h = 2 + (i.b - i.r) / a : t.h = 4 + (i.r - i.g) / a : t.h = -1, 
            t.h *= 60, t.h < 0 && (t.h += 360), t.s *= 100 / 255, t.b *= 100 / 255, t;
        }(I(i));
        return 0 === t.s && (t.h = 360), t;
    }
    function I(i) {
        return {
            r: (i = parseInt(-1 < i.indexOf("#") ? i.substring(1) : i, 16)) >> 16,
            g: (65280 & i) >> 8,
            b: 255 & i
        };
    }
    i.minicolors = {
        defaults: {
            animationSpeed: 50,
            animationEasing: "swing",
            change: null,
            changeDelay: 0,
            control: "hue",
            defaultValue: "",
            format: "hex",
            hide: null,
            hideSpeed: 100,
            inline: !1,
            keywords: "",
            letterCase: "lowercase",
            opacity: !1,
            position: "bottom left",
            show: null,
            showSpeed: 100,
            theme: "default",
            swatches: []
        }
    }, i.extend(i.fn, {
        minicolors: function(n, r) {
            switch (n) {
              case "destroy":
                return i(this).each(function() {
                    o(i(this));
                }), i(this);

              case "hide":
                return a(), i(this);

              case "opacity":
                return void 0 === r ? i(this).attr("data-opacity") : (i(this).each(function() {
                    c(i(this).attr("data-opacity", r));
                }), i(this));

              case "rgbObject":
                return function(t) {
                    var o, s = i(t).attr("data-opacity");
                    return (o = v(i(t).val()) ? g(i(t).val(), !0) : I(u(i(t).val(), !0))) ? (void 0 !== s && i.extend(o, {
                        a: parseFloat(s)
                    }), o) : null;
                }(i(this));

              case "rgbString":
              case "rgbaString":
                return function(t, o) {
                    var s, a = i(t).attr("data-opacity");
                    return (s = v(i(t).val()) ? g(i(t).val(), !0) : I(u(i(t).val(), !0))) ? (void 0 === a && (a = 1), 
                    o ? "rgba(" + s.r + ", " + s.g + ", " + s.b + ", " + parseFloat(a) + ")" : "rgb(" + s.r + ", " + s.g + ", " + s.b + ")") : null;
                }(i(this), "rgbaString" === n);

              case "settings":
                return void 0 === r ? i(this).data("minicolors-settings") : (i(this).each(function() {
                    var t = i(this).data("minicolors-settings") || {};
                    o(i(this)), i(this).minicolors(i.extend(!0, t, r));
                }), i(this));

              case "show":
                return s(i(this).eq(0)), i(this);

              case "value":
                return void 0 === r ? i(this).val() : (i(this).each(function() {
                    "object" == typeof r && "null" !== r ? (r.opacity && i(this).attr("data-opacity", f(r.opacity, 0, 1)), 
                    r.color && i(this).val(r.color)) : i(this).val(r), c(i(this));
                }), i(this));

              default:
                return "create" !== n && (r = n), i(this).each(function() {
                    !function(t, o) {
                        var s, a, n, r, e, l = i('<div class="minicolors" />'), h = i.minicolors.defaults;
                        if (!t.data("minicolors-initialized")) {
                            if (o = i.extend(!0, {}, h, o), l.addClass("minicolors-theme-" + o.theme).toggleClass("minicolors-with-opacity", o.opacity), 
                            void 0 !== o.position && i.each(o.position.split(" "), function() {
                                l.addClass("minicolors-position-" + this);
                            }), s = "rgb" === o.format ? o.opacity ? "25" : "20" : o.keywords ? "11" : "7", 
                            t.addClass("minicolors-input").data("minicolors-initialized", !1).data("minicolors-settings", o).prop("size", s).wrap(l).after('<div class="minicolors-panel minicolors-slider-' + o.control + '"><div class="minicolors-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-opacity-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-grid minicolors-sprite"><div class="minicolors-grid-inner"></div><div class="minicolors-picker"><div></div></div></div></div>'), 
                            o.inline || (t.after('<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch"><span class="minicolors-swatch-color"></span></span>'), 
                            t.next(".minicolors-input-swatch").on("click", function(i) {
                                i.preventDefault(), t.focus();
                            })), (r = t.parent().find(".minicolors-panel")).on("selectstart", function() {
                                return !1;
                            }).end(), o.swatches && 0 !== o.swatches.length) for (r.addClass("minicolors-with-swatches"), 
                            a = i('<ul class="minicolors-swatches"></ul>').appendTo(r), e = 0; e < o.swatches.length; ++e) n = v(n = o.swatches[e]) ? g(n, !0) : I(u(n, !0)), 
                            i('<li class="minicolors-swatch minicolors-sprite"><span class="minicolors-swatch-color"></span></li>').appendTo(a).data("swatch-color", o.swatches[e]).find(".minicolors-swatch-color").css({
                                backgroundColor: C(n),
                                opacity: n.a
                            }), o.swatches[e] = n;
                            o.inline && t.parent().addClass("minicolors-inline"), c(t, !1), t.data("minicolors-initialized", !0);
                        }
                    }(i(this), r);
                }), i(this);
            }
        }
    }), i([ document, top.document ]).on("mousedown.minicolors touchstart.minicolors", function(t) {
        i(t.target).parents().add(t.target).hasClass("minicolors") || a();
    }).on("mousedown.minicolors touchstart.minicolors", ".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider", function(t) {
        var o = i(this);
        t.preventDefault(), i(t.delegateTarget).data("minicolors-target", o), n(o, t, !0);
    }).on("mousemove.minicolors touchmove.minicolors", function(t) {
        var o = i(t.delegateTarget).data("minicolors-target");
        o && n(o, t);
    }).on("mouseup.minicolors touchend.minicolors", function() {
        i(this).removeData("minicolors-target");
    }).on("click.minicolors", ".minicolors-swatches li", function(t) {
        t.preventDefault();
        var o = i(this), s = o.parents(".minicolors").find(".minicolors-input"), a = o.data("swatch-color");
        e(s, a, b(a)), c(s);
    }).on("mousedown.minicolors touchstart.minicolors", ".minicolors-input-swatch", function(t) {
        var o = i(this).parent().find(".minicolors-input");
        t.preventDefault(), s(o);
    }).on("focus.minicolors", ".minicolors-input", function() {
        var t = i(this);
        t.data("minicolors-initialized") && s(t);
    }).on("blur.minicolors", ".minicolors-input", function() {
        var t, o, s, a, n, r = i(this), e = r.data("minicolors-settings");
        r.data("minicolors-initialized") && (t = e.keywords ? i.map(e.keywords.split(","), function(t) {
            return i.trim(t.toLowerCase());
        }) : [], n = "" !== r.val() && -1 < i.inArray(r.val().toLowerCase(), t) ? r.val() : null === (s = v(r.val()) ? g(r.val(), !0) : (o = u(r.val(), !0)) ? I(o) : null) ? e.defaultValue : "rgb" === e.format ? g(e.opacity ? "rgba(" + s.r + "," + s.g + "," + s.b + "," + r.attr("data-opacity") + ")" : "rgb(" + s.r + "," + s.g + "," + s.b + ")") : C(s), 
        a = e.opacity ? r.attr("data-opacity") : 1, "transparent" === n.toLowerCase() && (a = 0), 
        r.closest(".minicolors").find(".minicolors-input-swatch > span").css("opacity", a), 
        r.val(n), "" === r.val() && r.val(m(e.defaultValue, !0)), r.val(p(r.val(), e.letterCase)));
    }).on("keydown.minicolors", ".minicolors-input", function(t) {
        var o = i(this);
        if (o.data("minicolors-initialized")) switch (t.keyCode) {
          case 9:
            a();
            break;

          case 13:
          case 27:
            a(), o.blur();
        }
    }).on("keyup.minicolors", ".minicolors-input", function() {
        var t = i(this);
        t.data("minicolors-initialized") && c(t, !0);
    }).on("paste.minicolors", ".minicolors-input", function() {
        var t = i(this);
        t.data("minicolors-initialized") && setTimeout(function() {
            c(t, !0);
        }, 1);
    });
});