function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

var PxBlockAlert = function(e) {
    "use strict";
    function t() {
        for (var t = arguments.length, n = Array(t), a = 0; a < t; a++) n[a] = arguments[a];
        return this.each(function() {
            if (-1 !== [ "remove", "clear", "clearAll", "destroy" ].indexOf(n[0])) return l[n[0]].apply(null, [ e(this) ].concat(n.slice(1)));
            l.add.apply(l, [ e(this), n[0] ].concat(_toConsumableArray(n.slice(1))));
        });
    }
    var n = "pxBlockAlert", a = e.fn[n], r = {
        type: null,
        style: null,
        namespace: "default",
        animate: !0,
        timer: 0,
        closeButton: !0
    }, l = {
        add: function(t, n) {
            var a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
            if (!n) throw new Error("Content is not specified");
            var r = l._getConfig(a), i = l._getContainer(t), o = "px-block-alerts-namespace--" + r.namespace, s = e(i.find("." + o)[0] || e('<div class="' + o + '"></div>').appendTo(i)[0]), c = e('<div class="alert"></div>');
            r.closeButton && c.append('<button type="button" class="close">×</button>'), r.type && c.addClass("alert-" + r.type), 
            r.style && c.addClass("alert-" + r.style), c.addClass(o + "__alert").append(n), 
            i.removeClass("px-block-alerts-empty"), r.animate && c.css("display", "none").attr("data-animate", "true"), 
            s.append(c), r.animate && c.slideDown(300), r.timer && c.data("px-block-alert-timer", setTimeout(function() {
                return l.remove(t, c, r.animate);
            }, 1e3 * r.timer));
        },
        remove: function(e, t) {
            function n() {
                var t = e.find("> .px-block-alerts");
                r.remove(), t.find(".alert").length || t.addClass("px-block-alerts-empty");
            }
            var a = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2], r = e.find(t);
            if (r.length) {
                var l = r.data("px-block-alert-timer");
                if (l && (clearTimeout(l), r.data("px-block-alert-timer", null)), "true" === r.attr("data-animate") && !0 === a) return r.slideUp(300, n);
                n();
            }
        },
        clear: function(t) {
            var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "default", a = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2];
            if ("string" != typeof n) throw new Error("Namespace must be a string.");
            var r = t.find("> .px-block-alerts .px-block-alerts-namespace--" + n);
            r.length && r.find(".alert").each(function() {
                l.remove(t, e(this), a);
            });
        },
        clearAll: function(t) {
            var n = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
            t.find("> .px-block-alerts .alert").each(function() {
                l.remove(t, e(this), n);
            });
        },
        destroy: function(e) {
            var t = e.find("> .px-block-alerts");
            t.length && (l._unsetListeners(t), t.remove());
        },
        _getContainer: function(t) {
            var n = t.find("> .px-block-alerts");
            if (!n.length) if (n = e('<div class="px-block-alerts"></div>'), t.hasClass("panel")) {
                var a = t.find("> .panel-heading");
                a.length || (a = t.find("> .panel-subtitle")), a.length || (a = t.find("> .panel-title")), 
                a.length ? n.insertAfter(a.first()) : n.prependTo(t);
            } else n.prependTo(t);
            return n.data("pxBlockAlert-listenersDefined") || (l._setListeners(n), n.data("pxBlockAlert-listenersDefined", !0)), 
            n;
        },
        _getConfig: function(t) {
            var n = e.extend({}, r, t);
            return n.animate = !("false" === n.animate || !1 === n.animate), n.closeButton = !("false" === n.closeButton || !1 === n.closeButton), 
            n.timer = parseInt(String(n.timer), 10) || 0, n;
        },
        _setListeners: function(t) {
            t.on("click", ".close", function() {
                l.remove(t.parent(), e(this).parents(".alert"));
            });
        },
        _unsetListeners: function(e) {
            e.off();
        }
    };
    return e.fn[n] = t, e.fn[n].noConflict = function() {
        return e.fn[n] = a, t;
    }, l;
}(jQuery);