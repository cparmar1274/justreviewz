!function(e, t) {
    "object" == typeof exports ? module.exports = t(require("angular")) : "function" == typeof define && define.amd ? define([ "angular" ], t) : t(e.angular);
}(this, function(e) {
    !function(e) {
        "use strict";
        e.module("easypiechart", []).directive("easypiechart", [ function() {
            return {
                restrict: "A",
                require: "?ngModel",
                scope: {
                    percent: "=",
                    options: "="
                },
                link: function(t, a, i) {
                    t.percent = t.percent || 0;
                    var r = {
                        barColor: "#ef1e25",
                        trackColor: "#f9f9f9",
                        scaleColor: "#dfe0e0",
                        scaleLength: 5,
                        lineCap: "round",
                        lineWidth: 3,
                        size: 110,
                        rotate: 0,
                        animate: {
                            duration: 1e3,
                            enabled: !0
                        }
                    };
                    t.options = e.extend(r, t.options);
                    var o = new n(a[0], r);
                    t.$watch("percent", function(e, t) {
                        o.update(e);
                    });
                }
            };
        } ]);
    }(e);
    var t = function(e, t) {
        var n, a = document.createElement("canvas");
        e.appendChild(a), "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(a);
        var i = a.getContext("2d");
        a.width = a.height = t.size;
        var r = 1;
        1 < window.devicePixelRatio && (r = window.devicePixelRatio, a.style.width = a.style.height = [ t.size, "px" ].join(""), 
        a.width = a.height = t.size * r, i.scale(r, r)), i.translate(t.size / 2, t.size / 2), 
        i.rotate((t.rotate / 180 - .5) * Math.PI);
        var o = (t.size - t.lineWidth) / 2;
        t.scaleColor && t.scaleLength && (o -= t.scaleLength + 2), Date.now = Date.now || function() {
            return +new Date();
        };
        var s = function(e, t, n) {
            var a = (n = Math.min(Math.max(-1, n || 0), 1)) <= 0;
            i.beginPath(), i.arc(0, 0, o, 0, 2 * Math.PI * n, a), i.strokeStyle = e, i.lineWidth = t, 
            i.stroke();
        }, l = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
            window.setTimeout(e, 1e3 / 60);
        }, c = function() {
            t.scaleColor && function() {
                var e, n;
                i.lineWidth = 1, i.fillStyle = t.scaleColor, i.save();
                for (var a = 24; 0 < a; --a) e = a % 6 == 0 ? (n = t.scaleLength, 0) : (n = .6 * t.scaleLength, 
                t.scaleLength - n), i.fillRect(-t.size / 2 + e, 0, n, 1), i.rotate(Math.PI / 12);
                i.restore();
            }(), t.trackColor && s(t.trackColor, t.trackWidth || t.lineWidth, 1);
        };
        this.getCanvas = function() {
            return a;
        }, this.getCtx = function() {
            return i;
        }, this.clear = function() {
            i.clearRect(t.size / -2, t.size / -2, t.size, t.size);
        }, this.draw = function(e) {
            var a;
            t.scaleColor || t.trackColor ? i.getImageData && i.putImageData ? n ? i.putImageData(n, 0, 0) : (c(), 
            n = i.getImageData(0, 0, t.size * r, t.size * r)) : (this.clear(), c()) : this.clear(), 
            i.lineCap = t.lineCap, a = "function" == typeof t.barColor ? t.barColor(e) : t.barColor, 
            s(a, t.lineWidth, e / 100);
        }.bind(this), this.animate = function(e, n) {
            var a = Date.now();
            t.onStart(e, n);
            var i = function() {
                var r = Math.min(Date.now() - a, t.animate.duration), o = t.easing(this, r, e, n - e, t.animate.duration);
                this.draw(o), t.onStep(e, n, o), r >= t.animate.duration ? t.onStop(e, n) : l(i);
            }.bind(this);
            l(i);
        }.bind(this);
    }, n = function(e, n) {
        var a = {
            barColor: "#ef1e25",
            trackColor: "#f9f9f9",
            scaleColor: "#dfe0e0",
            scaleLength: 5,
            lineCap: "round",
            lineWidth: 3,
            trackWidth: void 0,
            size: 110,
            rotate: 0,
            animate: {
                duration: 1e3,
                enabled: !0
            },
            easing: function(e, t, n, a, i) {
                return (t /= i / 2) < 1 ? a / 2 * t * t + n : -a / 2 * (--t * (t - 2) - 1) + n;
            },
            onStart: function(e, t) {},
            onStep: function(e, t, n) {},
            onStop: function(e, t) {}
        };
        if (void 0 !== t) a.renderer = t; else {
            if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
            a.renderer = SVGRenderer;
        }
        var i = {}, r = 0, o = function() {
            for (var t in this.el = e, this.options = i, a) a.hasOwnProperty(t) && (i[t] = n && void 0 !== n[t] ? n[t] : a[t], 
            "function" == typeof i[t] && (i[t] = i[t].bind(this)));
            "string" == typeof i.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[i.easing]) ? i.easing = jQuery.easing[i.easing] : i.easing = a.easing, 
            "number" == typeof i.animate && (i.animate = {
                duration: i.animate,
                enabled: !0
            }), "boolean" != typeof i.animate || i.animate || (i.animate = {
                duration: 1e3,
                enabled: i.animate
            }), this.renderer = new i.renderer(e, i), this.renderer.draw(r), e.dataset && e.dataset.percent ? this.update(parseFloat(e.dataset.percent)) : e.getAttribute && e.getAttribute("data-percent") && this.update(parseFloat(e.getAttribute("data-percent")));
        }.bind(this);
        this.update = function(e) {
            return e = parseFloat(e), i.animate.enabled ? this.renderer.animate(r, e) : this.renderer.draw(e), 
            r = e, this;
        }.bind(this), this.disableAnimation = function() {
            return i.animate.enabled = !1, this;
        }, this.enableAnimation = function() {
            return i.animate.enabled = !0, this;
        }, o();
    };
});