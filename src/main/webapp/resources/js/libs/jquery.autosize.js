!function(e) {
    var t, o = {
        className: "autosizejs",
        id: "autosizejs",
        append: "\n",
        callback: !1,
        resizeDelay: 10,
        placeholder: !0
    }, i = [ "fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent", "whiteSpace" ], a = e('<textarea tabindex="-1"/>').data("autosize", !0)[0];
    a.style.cssText = "position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;", 
    (a.style.lineHeight = "99px") === e(a).css("lineHeight") && i.push("lineHeight"), 
    a.style.lineHeight = "", e.fn.autosize = function(n) {
        return this.length ? (n = e.extend({}, o, n || {}), a.parentNode !== document.body && e(document.body).append(a), 
        this.each(function() {
            function o() {
                var t, o = window.getComputedStyle ? window.getComputedStyle(u, null) : null;
                o ? (t = parseFloat(o.width), "border-box" !== o.boxSizing && "border-box" !== o.webkitBoxSizing && "border-box" !== o.mozBoxSizing || e.each([ "paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth" ], function(e, i) {
                    t -= parseFloat(o[i]);
                })) : t = p.width(), a.style.width = Math.max(t, 0) + "px";
            }
            function s() {
                var s = {};
                if (t = u, a.className = n.className, a.id = n.id, d = parseFloat(p.css("maxHeight")), 
                e.each(i, function(e, t) {
                    s[t] = p.css(t);
                }), e(a).css(s).attr("wrap", p.attr("wrap")), o(), window.chrome) {
                    var r = u.style.width;
                    u.style.width = "0px", u.offsetWidth, u.style.width = r;
                }
            }
            function r() {
                var e, i;
                t !== u ? s() : o(), !u.value && n.placeholder ? a.value = p.attr("placeholder") || "" : a.value = u.value, 
                a.value += n.append || "", a.style.overflowY = u.style.overflowY, i = parseFloat(u.style.height) || 0, 
                a.scrollTop = 0, a.scrollTop = 9e4, e = a.scrollTop, d && d < e ? (u.style.overflowY = "scroll", 
                e = d) : (u.style.overflowY = "hidden", e < c && (e = c)), e += z, .01 < Math.abs(i - e) && (u.style.height = e + "px", 
                a.className = a.className, w && n.callback.call(u, u), p.trigger("autosize.resized"));
            }
            function l() {
                clearTimeout(h), h = setTimeout(function() {
                    var e = p.width();
                    e !== b && (b = e, r());
                }, parseInt(n.resizeDelay, 10));
            }
            var d, c, h, u = this, p = e(u), z = 0, w = e.isFunction(n.callback), f = {
                height: u.style.height,
                overflow: u.style.overflow,
                overflowY: u.style.overflowY,
                wordWrap: u.style.wordWrap,
                resize: u.style.resize
            }, b = p.width(), g = p.css("resize");
            p.data("autosize") || (p.data("autosize", !0), "border-box" !== p.css("box-sizing") && "border-box" !== p.css("-moz-box-sizing") && "border-box" !== p.css("-webkit-box-sizing") || (z = p.outerHeight() - p.height()), 
            c = Math.max(parseFloat(p.css("minHeight")) - z || 0, p.height()), p.css({
                overflow: "hidden",
                overflowY: "hidden",
                wordWrap: "break-word"
            }), "vertical" === g ? p.css("resize", "none") : "both" === g && p.css("resize", "horizontal"), 
            "onpropertychange" in u ? "oninput" in u ? p.on("input.autosize keyup.autosize", r) : p.on("propertychange.autosize", function() {
                "value" === event.propertyName && r();
            }) : p.on("input.autosize", r), !1 !== n.resizeDelay && e(window).on("resize.autosize", l), 
            p.on("autosize.resize", r), p.on("autosize.resizeIncludeStyle", function() {
                t = null, r();
            }), p.on("autosize.destroy", function() {
                t = null, clearTimeout(h), e(window).off("resize", l), p.off("autosize").off(".autosize").css(f).removeData("autosize");
            }), r());
        })) : this;
    };
}(jQuery || $);