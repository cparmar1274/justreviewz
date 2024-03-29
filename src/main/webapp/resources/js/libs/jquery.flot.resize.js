!function(e, t, i) {
    function n(i) {
        !0 === s && (s = i || 1);
        for (var u = r.length - 1; 0 <= u; u--) {
            var c = e(r[u]);
            if (c[0] == t || c.is(":visible")) {
                var d = c.width(), f = c.height(), g = c.data(m);
                !g || d === g.w && f === g.h || (c.trigger(h, [ g.w = d, g.h = f ]), s = i || !0);
            } else (g = c.data(m)).w = 0, g.h = 0;
        }
        null !== a && (s && (null == i || i - s < 1e3) ? a = t.requestAnimationFrame(n) : (a = setTimeout(n, o[l]), 
        s = !1));
    }
    var a, r = [], o = e.resize = e.extend(e.resize, {}), s = !1, u = "setTimeout", h = "resize", m = h + "-special-event", l = "pendingDelay", c = "activeDelay", d = "throttleWindow";
    o[l] = 200, o[c] = 20, o[d] = !0, e.event.special[h] = {
        setup: function() {
            if (!o[d] && this[u]) return !1;
            var t = e(this);
            r.push(this), t.data(m, {
                w: t.width(),
                h: t.height()
            }), 1 === r.length && (a = i, n());
        },
        teardown: function() {
            if (!o[d] && this[u]) return !1;
            for (var t = e(this), i = r.length - 1; 0 <= i; i--) if (r[i] == this) {
                r.splice(i, 1);
                break;
            }
            t.removeData(m), r.length || (s ? cancelAnimationFrame(a) : clearTimeout(a), a = null);
        },
        add: function(t) {
            function n(t, n, r) {
                var o = e(this), s = o.data(m) || {};
                s.w = n !== i ? n : o.width(), s.h = r !== i ? r : o.height(), a.apply(this, arguments);
            }
            return !(!o[d] && this[u]) && (e.isFunction(t) ? (a = t, n) : (a = t.handler, void (t.handler = n)));
            var a;
        }
    }, t.requestAnimationFrame || (t.requestAnimationFrame = t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(e, i) {
        return t.setTimeout(function() {
            e(new Date().getTime());
        }, o[c]);
    }), t.cancelAnimationFrame || (t.cancelAnimationFrame = t.webkitCancelRequestAnimationFrame || t.mozCancelRequestAnimationFrame || t.oCancelRequestAnimationFrame || t.msCancelRequestAnimationFrame || clearTimeout);
}(jQuery, this), jQuery.plot.plugins.push({
    init: function(e) {
        function t() {
            var t = e.getPlaceholder();
            0 != t.width() && 0 != t.height() && (e.resize(), e.setupGrid(), e.draw());
        }
        e.hooks.bindEvents.push(function(e, i) {
            e.getPlaceholder().resize(t);
        }), e.hooks.shutdown.push(function(e, i) {
            e.getPlaceholder().unbind("resize", t);
        });
    },
    options: {},
    name: "resize",
    version: "1.0"
});