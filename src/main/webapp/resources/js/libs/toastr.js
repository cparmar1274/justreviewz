("function" == typeof define && define.amd ? define : function(e, t) {
    "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : window.toastr = t(window.jQuery);
})([ "jquery" ], function(e) {
    return function() {
        function t(t, n) {
            return t || (t = c()), (d = e("#" + t.containerId)).length || n && (d = function(t) {
                return (d = e("<div/>").attr("id", t.containerId).addClass(t.positionClass)).appendTo(e(t.target)), 
                d;
            }(t)), d;
        }
        function n(t) {
            for (var n = d.children(), s = n.length - 1; 0 <= s; s--) o(e(n[s]), t);
        }
        function o(t, n, o) {
            var s = !(!o || !o.force) && o.force;
            return !(!t || !s && 0 !== e(":focus", t).length || (t[n.hideMethod]({
                duration: n.hideDuration,
                easing: n.hideEasing,
                complete: function() {
                    l(t);
                }
            }), 0));
        }
        function a(e) {
            u && u(e);
        }
        function r(n) {
            function o(e) {
                return null == e && (e = ""), e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
            function C(t) {
                var n = t && !1 !== b.closeMethod ? b.closeMethod : b.hideMethod, o = t && !1 !== b.closeDuration ? b.closeDuration : b.hideDuration, s = t && !1 !== b.closeEasing ? b.closeEasing : b.hideEasing;
                if (!e(":focus", x).length || t) return clearTimeout(M.intervalId), x[n]({
                    duration: o,
                    easing: s,
                    complete: function() {
                        l(x), clearTimeout(H), b.onHidden && "hidden" !== B.state && b.onHidden(), B.state = "hidden", 
                        B.endTime = new Date(), a(B);
                    }
                });
            }
            var b = c(), D = n.iconClass || b.iconClass;
            if (void 0 !== n.optionsOverride && (b = e.extend(b, n.optionsOverride), D = n.optionsOverride.iconClass || D), 
            !function(e, t) {
                if (b.preventDuplicates) {
                    if (t.message === p) return !0;
                    p = t.message;
                }
                return !1;
            }(0, n)) {
                f++, d = t(b, !0);
                var H = null, x = e("<div/>"), E = e("<div/>"), y = e("<div/>"), k = e("<div/>"), I = e(b.closeHtml), M = {
                    intervalId: null,
                    hideEta: null,
                    maxHideTime: null
                }, B = {
                    toastId: f,
                    state: "visible",
                    startTime: new Date(),
                    options: b,
                    map: n
                };
                return n.iconClass && x.addClass(b.toastClass).addClass(D), function() {
                    if (n.title) {
                        var e = n.title;
                        b.escapeHtml && (e = o(n.title)), E.append(e).addClass(b.titleClass), x.append(E);
                    }
                }(), function() {
                    if (n.message) {
                        var e = n.message;
                        b.escapeHtml && (e = o(n.message)), y.append(e).addClass(b.messageClass), x.append(y);
                    }
                }(), b.closeButton && (I.addClass(b.closeClass).attr("role", "button"), x.prepend(I)), 
                b.progressBar && (k.addClass(b.progressClass), x.prepend(k)), b.rtl && x.addClass("rtl"), 
                b.newestOnTop ? d.prepend(x) : d.append(x), function() {
                    var e = "";
                    switch (n.iconClass) {
                      case "toast-success":
                      case "toast-info":
                        e = "polite";
                        break;

                      default:
                        e = "assertive";
                    }
                    x.attr("aria-live", e);
                }(), x.hide(), x[b.showMethod]({
                    duration: b.showDuration,
                    easing: b.showEasing,
                    complete: b.onShown
                }), 0 < b.timeOut && (H = setTimeout(C, b.timeOut), M.maxHideTime = parseFloat(b.timeOut), 
                M.hideEta = new Date().getTime() + M.maxHideTime, b.progressBar && (M.intervalId = setInterval(function() {
                    var e = (M.hideEta - new Date().getTime()) / M.maxHideTime * 100;
                    k.width(e + "%");
                }, 10))), b.closeOnHover && x.hover(function() {
                    clearTimeout(H), M.hideEta = 0, x.stop(!0, !0)[b.showMethod]({
                        duration: b.showDuration,
                        easing: b.showEasing
                    });
                }, function() {
                    (0 < b.timeOut || 0 < b.extendedTimeOut) && (H = setTimeout(C, b.extendedTimeOut), 
                    M.maxHideTime = parseFloat(b.extendedTimeOut), M.hideEta = new Date().getTime() + M.maxHideTime);
                }), !b.onclick && b.tapToDismiss && x.click(C), b.closeButton && I && I.click(function(e) {
                    e.stopPropagation ? e.stopPropagation() : void 0 !== e.cancelBubble && !0 !== e.cancelBubble && (e.cancelBubble = !0), 
                    b.onCloseClick && b.onCloseClick(e), C(!0);
                }), b.onclick && x.click(function(e) {
                    b.onclick(e), C();
                }), a(B), b.debug && console && console.log(B), x;
            }
        }
        function c() {
            return e.extend({}, {
                tapToDismiss: !0,
                toastClass: "toast",
                containerId: "toast-container",
                debug: !1,
                showMethod: "fadeIn",
                showDuration: 300,
                showEasing: "swing",
                onShown: void 0,
                hideMethod: "fadeOut",
                hideDuration: 1e3,
                hideEasing: "swing",
                onHidden: void 0,
                closeMethod: !1,
                closeDuration: !1,
                closeEasing: !1,
                closeOnHover: !0,
                extendedTimeOut: 1e3,
                iconClasses: {
                    error: "toast-error",
                    info: "toast-info",
                    success: "toast-success",
                    warning: "toast-warning"
                },
                iconClass: "toast-info",
                positionClass: "toast-top-right",
                timeOut: 5e3,
                titleClass: "toast-title",
                messageClass: "toast-message",
                escapeHtml: !1,
                target: "body",
                closeHtml: '<button type="button">&times;</button>',
                closeClass: "toast-close-button",
                newestOnTop: !0,
                preventDuplicates: !1,
                progressBar: !1,
                progressClass: "toast-progress",
                rtl: !1
            }, m.options);
        }
        function l(e) {
            d || (d = t()), e.is(":visible") || (e.remove(), e = null, 0 === d.children().length && (d.remove(), 
            p = void 0));
        }
        var d, u, p, f = 0, g_error = "error", g_info = "info", g_success = "success", g_warning = "warning", m = {
            clear: function(e, s) {
                var i = c();
                d || t(i), o(e, i, s) || n(i);
            },
            remove: function(n) {
                var o = c();
                d || t(o), n && 0 === e(":focus", n).length ? l(n) : d.children().length && d.remove();
            },
            error: function(e, t, n) {
                return r({
                    type: g_error,
                    iconClass: c().iconClasses.error,
                    message: e,
                    optionsOverride: n,
                    title: t
                });
            },
            getContainer: t,
            info: function(e, t, n) {
                return r({
                    type: g_info,
                    iconClass: c().iconClasses.info,
                    message: e,
                    optionsOverride: n,
                    title: t
                });
            },
            options: {},
            subscribe: function(e) {
                u = e;
            },
            success: function(e, t, n) {
                return r({
                    type: g_success,
                    iconClass: c().iconClasses.success,
                    message: e,
                    optionsOverride: n,
                    title: t
                });
            },
            version: "2.1.3",
            warning: function(e, t, n) {
                return r({
                    type: g_warning,
                    iconClass: c().iconClasses.warning,
                    message: e,
                    optionsOverride: n,
                    title: t
                });
            }
        };
        return m;
    }();
});