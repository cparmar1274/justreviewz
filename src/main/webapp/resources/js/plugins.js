!function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery);
}(function(t) {
    "use strict";
    var n = "animsition", i = {
        init: function(a) {
            a = t.extend({
                inClass: "fade-in",
                outClass: "fade-out",
                inDuration: 1500,
                outDuration: 800,
                linkElement: ".animsition-link",
                loading: !0,
                loadingParentElement: "body",
                loadingClass: "animsition-loading",
                loadingInner: "",
                timeout: !1,
                timeoutCountdown: 5e3,
                onLoadEvent: !0,
                browser: [ "animation-duration", "-webkit-animation-duration" ],
                overlay: !1,
                overlayClass: "animsition-overlay-slide",
                overlayParentElement: "body",
                transition: function(t) {
                    window.location.href = t;
                }
            }, a), i.settings = {
                timer: !1,
                data: {
                    inClass: "animsition-in-class",
                    inDuration: "animsition-in-duration",
                    outClass: "animsition-out-class",
                    outDuration: "animsition-out-duration",
                    overlay: "animsition-overlay"
                },
                events: {
                    inStart: "animsition.inStart",
                    inEnd: "animsition.inEnd",
                    outStart: "animsition.outStart",
                    outEnd: "animsition.outEnd"
                }
            };
            var o = i.supportCheck.call(this, a);
            return o || !(0 < a.browser.length) || o && this.length ? (i.optionCheck.call(this, a) && t("." + a.overlayClass).length <= 0 && i.addOverlay.call(this, a), 
            a.loading && t("." + a.loadingClass).length <= 0 && i.addLoading.call(this, a), 
            this.each(function() {
                var o = this, e = t(this), s = t(window), r = t(document);
                e.data(n) || (a = t.extend({}, a), e.data(n, {
                    options: a
                }), a.timeout && i.addTimer.call(o), a.onLoadEvent && s.on("load." + n, function() {
                    i.settings.timer && clearTimeout(i.settings.timer), i.in.call(o);
                }), s.on("pageshow." + n, function(t) {
                    t.originalEvent.persisted && i.in.call(o);
                }), s.on("unload." + n, function() {}), r.on("click." + n, a.linkElement, function(n) {
                    n.preventDefault();
                    var a = t(this), e = a.attr("href");
                    2 === n.which || n.metaKey || n.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && n.ctrlKey ? window.open(e, "_blank") : i.out.call(o, a, e);
                }));
            })) : ("console" in window || (window.console = {}, window.console.log = function(t) {
                return t;
            }), this.length || console.log("Animsition: Element does not exist on page."), o || console.log("Animsition: Does not support this browser."), 
            i.destroy.call(this));
        },
        addOverlay: function(n) {
            t(n.overlayParentElement).prepend('<div class="' + n.overlayClass + '"></div>');
        },
        addLoading: function(n) {
            t(n.loadingParentElement).append('<div class="' + n.loadingClass + '">' + n.loadingInner + "</div>");
        },
        removeLoading: function() {
            var a = t(this).data(n).options;
            t(a.loadingParentElement).children("." + a.loadingClass).fadeOut().remove();
        },
        addTimer: function() {
            var a = this, e = t(this).data(n).options;
            i.settings.timer = setTimeout(function() {
                i.in.call(a), t(window).off("load." + n);
            }, e.timeoutCountdown);
        },
        supportCheck: function(n) {
            var i = t(this), a = n.browser, o = a.length, e = !1;
            0 === o && (e = !0);
            for (var s = 0; s < o; s++) if ("string" == typeof i.css(a[s])) {
                e = !0;
                break;
            }
            return e;
        },
        optionCheck: function(n) {
            var o = t(this);
            return !(!n.overlay && !o.data(i.settings.data.overlay));
        },
        animationCheck: function(i, a, o) {
            var s = t(this).data(n).options, r = typeof i, l = !a && "number" === r, d = a && "string" === r && 0 < i.length;
            return l || d ? i = i : a && o ? i = s.inClass : !a && o ? i = s.inDuration : a && !o ? i = s.outClass : a || o || (i = s.outDuration), 
            i;
        },
        in: function() {
            var a = this, o = t(this), e = o.data(n).options, s = o.data(i.settings.data.inDuration), r = o.data(i.settings.data.inClass), l = i.animationCheck.call(a, s, !1, !0), d = i.animationCheck.call(a, r, !0, !0), u = i.optionCheck.call(a, e), c = o.data(n).outClass;
            e.loading && i.removeLoading.call(a), c && o.removeClass(c), u ? i.inOverlay.call(a, d, l) : i.inDefault.call(a, d, l);
        },
        inDefault: function(n, a) {
            var o = t(this);
            o.css({
                "animation-duration": a + "ms"
            }).addClass(n).trigger(i.settings.events.inStart).animateCallback(function() {
                o.removeClass(n).css({
                    opacity: 1
                }).trigger(i.settings.events.inEnd);
            });
        },
        inOverlay: function(a, o) {
            var e = t(this), s = e.data(n).options;
            e.css({
                opacity: 1
            }).trigger(i.settings.events.inStart), t(s.overlayParentElement).children("." + s.overlayClass).css({
                "animation-duration": o + "ms"
            }).addClass(a).animateCallback(function() {
                e.trigger(i.settings.events.inEnd);
            });
        },
        out: function(a, o) {
            var e = this, s = t(this), r = s.data(n).options, l = a.data(i.settings.data.outClass), d = s.data(i.settings.data.outClass), u = a.data(i.settings.data.outDuration), c = s.data(i.settings.data.outDuration), m = l || d, g = u || c, f = i.animationCheck.call(e, m, !0, !1), v = i.animationCheck.call(e, g, !1, !1), h = i.optionCheck.call(e, r);
            s.data(n).outClass = f, h ? i.outOverlay.call(e, f, v, o) : i.outDefault.call(e, f, v, o);
        },
        outDefault: function(a, o, e) {
            var s = t(this), r = s.data(n).options;
            s.css({
                "animation-duration": o + 1 + "ms"
            }).addClass(a).trigger(i.settings.events.outStart).animateCallback(function() {
                s.trigger(i.settings.events.outEnd), r.transition(e);
            });
        },
        outOverlay: function(a, o, e) {
            var r = t(this), l = r.data(n).options, d = r.data(i.settings.data.inClass), u = i.animationCheck.call(this, d, !0, !0);
            t(l.overlayParentElement).children("." + l.overlayClass).css({
                "animation-duration": o + 1 + "ms"
            }).removeClass(u).addClass(a).trigger(i.settings.events.outStart).animateCallback(function() {
                r.trigger(i.settings.events.outEnd), l.transition(e);
            });
        },
        destroy: function() {
            return this.each(function() {
                var i = t(this);
                t(window).off("." + n), i.css({
                    opacity: 1
                }).removeData(n);
            });
        }
    };
    t.fn.animateCallback = function(n) {
        var i = "animationend webkitAnimationEnd";
        return this.each(function() {
            var a = t(this);
            a.on(i, function() {
                return a.off(i), n.call(this);
            });
        });
    }, t.fn.animsition = function(a) {
        return i[a] ? i[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void t.error("Method " + a + " does not exist on jQuery." + n) : i.init.apply(this, arguments);
    };
}), function() {
    var activeElement, observer, refreshSize, defaultOptions = {
        frameRate: 150,
        animationTime: 400,
        stepSize: 100,
        pulseAlgorithm: !0,
        pulseScale: 4,
        pulseNormalize: 1,
        accelerationDelta: 50,
        accelerationMax: 3,
        keyboardSupport: !0,
        arrowScroll: 50,
        touchpadSupport: !1,
        fixedBackground: !0,
        excluded: ""
    }, options = defaultOptions, isExcluded = !1, isFrame = !1, direction = {
        x: 0,
        y: 0
    }, initDone = !1, root = document.documentElement, deltaBuffer = [], isMac = /^Mac/.test(navigator.platform), key = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        spacebar: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36
    }, arrowKeys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };
    function init() {
        if (!initDone && document.body) {
            initDone = !0;
            var body = document.body, html = document.documentElement, windowHeight = window.innerHeight, scrollHeight = body.scrollHeight;
            if (root = 0 <= document.compatMode.indexOf("CSS") ? html : body, activeElement = body, 
            options.keyboardSupport && addEvent("keydown", keydown), top != self) isFrame = !0; else if (windowHeight < scrollHeight && (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)) {
                var pendingRefresh, fullPageElem = document.createElement("div");
                fullPageElem.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + root.scrollHeight + "px", 
                document.body.appendChild(fullPageElem), refreshSize = function() {
                    pendingRefresh || (pendingRefresh = setTimeout(function() {
                        isExcluded || (fullPageElem.style.height = "0", fullPageElem.style.height = root.scrollHeight + "px", 
                        pendingRefresh = null);
                    }, 500));
                }, setTimeout(refreshSize, 10), addEvent("resize", refreshSize);
                if ((observer = new MutationObserver(refreshSize)).observe(body, {
                    attributes: !0,
                    childList: !0,
                    characterData: !1
                }), root.offsetHeight <= windowHeight) {
                    var clearfix = document.createElement("div");
                    clearfix.style.clear = "both", body.appendChild(clearfix);
                }
            }
            options.fixedBackground || isExcluded || (body.style.backgroundAttachment = "scroll", 
            html.style.backgroundAttachment = "scroll");
        }
    }
    var que = [], pending = !1, lastScroll = Date.now();
    function scrollArray(elem, left, top) {
        var x, y;
        if (x = 0 < (x = left) ? 1 : -1, y = 0 < (y = top) ? 1 : -1, (direction.x !== x || direction.y !== y) && (direction.x = x, 
        direction.y = y, que = [], lastScroll = 0), 1 != options.accelerationMax) {
            var elapsed = Date.now() - lastScroll;
            if (elapsed < options.accelerationDelta) {
                var factor = (1 + 50 / elapsed) / 2;
                1 < factor && (factor = Math.min(factor, options.accelerationMax), left *= factor, 
                top *= factor);
            }
            lastScroll = Date.now();
        }
        if (que.push({
            x: left,
            y: top,
            lastX: left < 0 ? .99 : -.99,
            lastY: top < 0 ? .99 : -.99,
            start: Date.now()
        }), !pending) {
            var scrollWindow = elem === document.body, step = function(time) {
                for (var now = Date.now(), scrollX = 0, scrollY = 0, i = 0; i < que.length; i++) {
                    var item = que[i], elapsed = now - item.start, finished = elapsed >= options.animationTime, position = finished ? 1 : elapsed / options.animationTime;
                    options.pulseAlgorithm && (position = pulse(position));
                    var x = item.x * position - item.lastX >> 0, y = item.y * position - item.lastY >> 0;
                    scrollX += x, scrollY += y, item.lastX += x, item.lastY += y, finished && (que.splice(i, 1), 
                    i--);
                }
                scrollWindow ? window.scrollBy(scrollX, scrollY) : (scrollX && (elem.scrollLeft += scrollX), 
                scrollY && (elem.scrollTop += scrollY)), left || top || (que = []), que.length ? requestFrame(step, elem, 1e3 / options.frameRate + 1) : pending = !1;
            };
            requestFrame(step, elem, 0), pending = !0;
        }
    }
    function wheel(event) {
        initDone || init();
        var target = event.target, overflowing = overflowingAncestor(target);
        if (!overflowing || event.defaultPrevented || event.ctrlKey) return !0;
        if (isNodeName(activeElement, "embed") || isNodeName(target, "embed") && /\.pdf/i.test(target.src) || isNodeName(activeElement, "object") || target.shadowRoot) return !0;
        var deltaX = -event.wheelDeltaX || event.deltaX || 0, deltaY = -event.wheelDeltaY || event.deltaY || 0;
        if (isMac && (event.wheelDeltaX && isDivisible(event.wheelDeltaX, 120) && (deltaX = event.wheelDeltaX / Math.abs(event.wheelDeltaX) * -120), 
        event.wheelDeltaY && isDivisible(event.wheelDeltaY, 120) && (deltaY = event.wheelDeltaY / Math.abs(event.wheelDeltaY) * -120)), 
        deltaX || deltaY || (deltaY = -event.wheelDelta || 0), 1 === event.deltaMode && (deltaX *= 40, 
        deltaY *= 40), !options.touchpadSupport && function(deltaY) {
            if (!deltaY) return;
            deltaBuffer.length || (deltaBuffer = [ deltaY, deltaY, deltaY ]);
            return deltaY = Math.abs(deltaY), deltaBuffer.push(deltaY), deltaBuffer.shift(), 
            clearTimeout(deltaBufferTimer), deltaBufferTimer = setTimeout(function() {
                window.localStorage && (localStorage.SS_deltaBuffer = deltaBuffer.join(","));
            }, 1e3), !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100);
        }(deltaY)) return !0;
        1.2 < Math.abs(deltaX) && (deltaX *= options.stepSize / 120), 1.2 < Math.abs(deltaY) && (deltaY *= options.stepSize / 120), 
        scrollArray(overflowing, deltaX, deltaY), event.preventDefault(), scheduleClearCache();
    }
    function keydown(event) {
        var target = event.target, modifier = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey && event.keyCode !== key.spacebar;
        document.body.contains(activeElement) || (activeElement = document.activeElement);
        var buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (event.defaultPrevented || /^(textarea|select|embed|object)$/i.test(target.nodeName) || isNodeName(target, "input") && !buttonTypes.test(target.type) || isNodeName(activeElement, "video") || function(event) {
            var elem = event.target, isControl = !1;
            if (-1 != document.URL.indexOf("www.youtube.com/watch")) do {
                if (isControl = elem.classList && elem.classList.contains("html5-video-controls")) break;
            } while (elem = elem.parentNode);
            return isControl;
        }(event) || target.isContentEditable || modifier) return !0;
        if ((isNodeName(target, "button") || isNodeName(target, "input") && buttonTypes.test(target.type)) && event.keyCode === key.spacebar) return !0;
        if (isNodeName(target, "input") && "radio" == target.type && arrowKeys[event.keyCode]) return !0;
        var x = 0, y = 0, elem = overflowingAncestor(activeElement), clientHeight = elem.clientHeight;
        switch (elem == document.body && (clientHeight = window.innerHeight), event.keyCode) {
          case key.up:
            y = -options.arrowScroll;
            break;

          case key.down:
            y = options.arrowScroll;
            break;

          case key.spacebar:
            y = -(event.shiftKey ? 1 : -1) * clientHeight * .9;
            break;

          case key.pageup:
            y = .9 * -clientHeight;
            break;

          case key.pagedown:
            y = .9 * clientHeight;
            break;

          case key.home:
            y = -elem.scrollTop;
            break;

          case key.end:
            var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
            y = 0 < damt ? damt + 10 : 0;
            break;

          case key.left:
            x = -options.arrowScroll;
            break;

          case key.right:
            x = options.arrowScroll;
            break;

          default:
            return !0;
        }
        scrollArray(elem, x, y), event.preventDefault(), scheduleClearCache();
    }
    function mousedown(event) {
        activeElement = event.target;
    }
    var i, clearCacheTimer, deltaBufferTimer, uniqueID = (i = 0, function(el) {
        return el.uniqueID || (el.uniqueID = i++);
    }), cache = {};
    function scheduleClearCache() {
        clearTimeout(clearCacheTimer), clearCacheTimer = setInterval(function() {
            cache = {};
        }, 1e3);
    }
    function setCache(elems, overflowing) {
        for (var i = elems.length; i--; ) cache[uniqueID(elems[i])] = overflowing;
        return overflowing;
    }
    function overflowingAncestor(el) {
        var elems = [], body = document.body, rootScrollHeight = root.scrollHeight;
        do {
            var cached = cache[uniqueID(el)];
            if (cached) return setCache(elems, cached);
            if (elems.push(el), rootScrollHeight === el.scrollHeight) {
                var isOverflowCSS = overflowNotHidden(root) && overflowNotHidden(body) || overflowAutoOrScroll(root);
                if (isFrame && isContentOverflowing(root) || !isFrame && isOverflowCSS) return setCache(elems, getScrollRoot());
            } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) return setCache(elems, el);
        } while (el = el.parentElement);
    }
    function isContentOverflowing(el) {
        return el.clientHeight + 10 < el.scrollHeight;
    }
    function overflowNotHidden(el) {
        return "hidden" !== getComputedStyle(el, "").getPropertyValue("overflow-y");
    }
    function overflowAutoOrScroll(el) {
        var overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
        return "scroll" === overflow || "auto" === overflow;
    }
    function addEvent(type, fn) {
        window.addEventListener(type, fn, !1);
    }
    function removeEvent(type, fn) {
        window.removeEventListener(type, fn, !1);
    }
    function isNodeName(el, tag) {
        return (el.nodeName || "").toLowerCase() === tag.toLowerCase();
    }
    function isDivisible(n, divisor) {
        return Math.floor(n / divisor) == n / divisor;
    }
    function allDeltasDivisableBy(divisor) {
        return isDivisible(deltaBuffer[0], divisor) && isDivisible(deltaBuffer[1], divisor) && isDivisible(deltaBuffer[2], divisor);
    }
    window.localStorage && localStorage.SS_deltaBuffer && (deltaBuffer = localStorage.SS_deltaBuffer.split(","));
    var SCROLL_ROOT, requestFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback, element, delay) {
        window.setTimeout(callback, delay || 1e3 / 60);
    }, MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, getScrollRoot = function() {
        if (!SCROLL_ROOT) {
            var dummy = document.createElement("div");
            dummy.style.cssText = "height:10000px;width:1px;", document.body.appendChild(dummy);
            var bodyScrollTop = document.body.scrollTop;
            document.documentElement.scrollTop, window.scrollBy(0, 3), SCROLL_ROOT = document.body.scrollTop != bodyScrollTop ? document.body : document.documentElement, 
            window.scrollBy(0, -3), document.body.removeChild(dummy);
        }
        return SCROLL_ROOT;
    };
    function pulse_(x) {
        var start;
        return ((x *= options.pulseScale) < 1 ? x - (1 - Math.exp(-x)) : (x -= 1, (start = Math.exp(-1)) + (1 - Math.exp(-x)) * (1 - start))) * options.pulseNormalize;
    }
    function pulse(x) {
        return 1 <= x ? 1 : x <= 0 ? 0 : (1 == options.pulseNormalize && (options.pulseNormalize /= pulse_(1)), 
        pulse_(x));
    }
    var wheelEvent, userAgent = window.navigator.userAgent, isEdge = /Edge/.test(userAgent), isChrome = /chrome/i.test(userAgent) && !isEdge, isSafari = /safari/i.test(userAgent) && !isEdge, isMobile = /mobile/i.test(userAgent), isIEWin7 = /Windows NT 6.1/i.test(userAgent) && /rv:11/i.test(userAgent), isEnabledForBrowser = (isChrome || isSafari || isIEWin7) && !isMobile;
    function SmoothScroll(optionsToSet) {
        for (var key in optionsToSet) defaultOptions.hasOwnProperty(key) && (options[key] = optionsToSet[key]);
    }
    "onwheel" in document.createElement("div") ? wheelEvent = "wheel" : "onmousewheel" in document.createElement("div") && (wheelEvent = "mousewheel"), 
    wheelEvent && isEnabledForBrowser && (addEvent(wheelEvent, wheel), addEvent("mousedown", mousedown), 
    addEvent("load", init)), SmoothScroll.destroy = function() {
        observer && observer.disconnect(), removeEvent(wheelEvent, wheel), removeEvent("mousedown", mousedown), 
        removeEvent("keydown", keydown), removeEvent("resize", refreshSize), removeEvent("load", init);
    }, window.SmoothScrollOptions && SmoothScroll(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() {
        return SmoothScroll;
    }) : "object" == typeof exports ? module.exports = SmoothScroll : window.SmoothScroll = SmoothScroll;
}(), function() {
    var a, b, c, d, e, f = function(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    }, g = [].indexOf || function(a) {
        for (var b = 0, c = this.length; b < c; b++) if (b in this && this[b] === a) return b;
        return -1;
    };
    b = function() {
        function a() {}
        return a.prototype.extend = function(a, b) {
            var c, d;
            for (c in b) d = b[c], null == a[c] && (a[c] = d);
            return a;
        }, a.prototype.isMobile = function(a) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a);
        }, a.prototype.createEvent = function(a, b, c, d) {
            var e;
            return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent")).initCustomEvent(a, b, c, d) : null != document.createEventObject ? (e = document.createEventObject()).eventType = a : e.eventName = a, 
            e;
        }, a.prototype.emitEvent = function(a, b) {
            return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0;
        }, a.prototype.addEvent = function(a, b, c) {
            return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c;
        }, a.prototype.removeEvent = function(a, b, c) {
            return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b];
        }, a.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight;
        }, a;
    }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
        function a() {
            this.keys = [], this.values = [];
        }
        return a.prototype.get = function(a) {
            var b, d, e, f;
            for (b = d = 0, e = (f = this.keys).length; d < e; b = ++d) if (f[b] === a) return this.values[b];
        }, a.prototype.set = function(a, b) {
            var c, e, f, g;
            for (c = e = 0, f = (g = this.keys).length; e < f; c = ++e) if (g[c] === a) return void (this.values[c] = b);
            return this.keys.push(a), this.values.push(b);
        }, a;
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
        function a() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), 
            "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.");
        }
        return a.notSupported = !0, a.prototype.observe = function() {}, a;
    }()), d = this.getComputedStyle || function(a, b) {
        return this.getPropertyValue = function(b) {
            var c;
            return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
                return b.toUpperCase();
            }), (null != (c = a.currentStyle) ? c[b] : void 0) || null;
        }, this;
    }, e = /(\-([a-z]){1})/g, this.WOW = function() {
        function e(a) {
            null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), 
            this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), 
            this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), 
            this.animationNameCache = new c(), this.wowEvent = this.util().createEvent(this.config.boxClass);
        }
        return e.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, e.prototype.init = function() {
            var a;
            return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), 
            this.finished = [];
        }, e.prototype.start = function() {
            var b, c, d, e;
            if (this.stopped = !1, this.boxes = function() {
                var a, c, d, e;
                for (e = [], a = 0, c = (d = this.element.querySelectorAll("." + this.config.boxClass)).length; a < c; a++) b = d[a], 
                e.push(b);
                return e;
            }.call(this), this.all = function() {
                var a, c, d, e;
                for (e = [], a = 0, c = (d = this.boxes).length; a < c; a++) b = d[a], e.push(b);
                return e;
            }.call(this), this.boxes.length) if (this.disabled()) this.resetStyle(); else for (c = 0, 
            d = (e = this.boxes).length; c < d; c++) b = e[c], this.applyStyle(b, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), 
            this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), 
            this.config.live ? new a(function(a) {
                return function(b) {
                    var c, d, e, f, g;
                    for (g = [], c = 0, d = b.length; c < d; c++) f = b[c], g.push(function() {
                        var a, b, c, d;
                        for (d = [], a = 0, b = (c = f.addedNodes || []).length; a < b; a++) e = c[a], d.push(this.doSync(e));
                        return d;
                    }.call(a));
                    return g;
                };
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0;
        }, e.prototype.stop = function() {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), 
            this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0;
        }, e.prototype.sync = function(b) {
            return a.notSupported ? this.doSync(this.element) : void 0;
        }, e.prototype.doSync = function(a) {
            var b, c, d, e, f;
            if (null == a && (a = this.element), 1 === a.nodeType) {
                for (f = [], c = 0, d = (e = (a = a.parentNode || a).querySelectorAll("." + this.config.boxClass)).length; c < d; c++) b = e[c], 
                g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), 
                f.push(this.scrolled = !0)) : f.push(void 0);
                return f;
            }
        }, e.prototype.show = function(a) {
            return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, 
            null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), 
            this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), 
            this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), 
            a;
        }, e.prototype.applyStyle = function(a, b) {
            var c, d, e, f;
            return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), 
            e = a.getAttribute("data-wow-iteration"), this.animate((f = this, function() {
                return f.customStyle(a, b, d, c, e);
            }));
        }, e.prototype.animate = "requestAnimationFrame" in window ? function(a) {
            return window.requestAnimationFrame(a);
        } : function(a) {
            return a();
        }, e.prototype.resetStyle = function() {
            var a, b, c, d, e;
            for (e = [], b = 0, c = (d = this.boxes).length; b < c; b++) a = d[b], e.push(a.style.visibility = "visible");
            return e;
        }, e.prototype.resetAnimation = function(a) {
            var b;
            return 0 <= a.type.toLowerCase().indexOf("animationend") ? (b = a.target || a.srcElement).className = b.className.replace(this.config.animateClass, "").trim() : void 0;
        }, e.prototype.customStyle = function(a, b, c, d, e) {
            return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", 
            c && this.vendorSet(a.style, {
                animationDuration: c
            }), d && this.vendorSet(a.style, {
                animationDelay: d
            }), e && this.vendorSet(a.style, {
                animationIterationCount: e
            }), this.vendorSet(a.style, {
                animationName: b ? "none" : this.cachedAnimationName(a)
            }), a;
        }, e.prototype.vendors = [ "moz", "webkit" ], e.prototype.vendorSet = function(a, b) {
            var c, d, e, f;
            for (c in d = [], b) e = b[c], a["" + c] = e, d.push(function() {
                var b, d, g, h;
                for (h = [], b = 0, d = (g = this.vendors).length; b < d; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                return h;
            }.call(this));
            return d;
        }, e.prototype.vendorCSS = function(a, b) {
            var c, e, f, g, h, i;
            for (g = (h = d(a)).getPropertyCSSValue(b), c = 0, e = (f = this.vendors).length; c < e; c++) i = f[c], 
            g = g || h.getPropertyCSSValue("-" + i + "-" + b);
            return g;
        }, e.prototype.animationName = function(a) {
            var b;
            try {
                b = this.vendorCSS(a, "animation-name").cssText;
            } catch (c) {
                b = d(a).getPropertyValue("animation-name");
            }
            return "none" === b ? "" : b;
        }, e.prototype.cacheAnimationName = function(a) {
            return this.animationNameCache.set(a, this.animationName(a));
        }, e.prototype.cachedAnimationName = function(a) {
            return this.animationNameCache.get(a);
        }, e.prototype.scrollHandler = function() {
            return this.scrolled = !0;
        }, e.prototype.scrollCallback = function() {
            var a;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                var b, c, d, e;
                for (e = [], b = 0, c = (d = this.boxes).length; b < c; b++) (a = d[b]) && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e;
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop();
        }, e.prototype.offsetTop = function(a) {
            for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
            for (b = a.offsetTop; a = a.offsetParent; ) b += a.offsetTop;
            return b;
        }, e.prototype.isVisible = function(a) {
            var b, c, d, e, f;
            return c = a.getAttribute("data-wow-offset") || this.config.offset, e = (f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset) + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, 
            b = (d = this.offsetTop(a)) + a.clientHeight, d <= e && f <= b;
        }, e.prototype.util = function() {
            return null != this._util ? this._util : this._util = new b();
        }, e.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent);
        }, e;
    }();
}.call(this), function(t) {
    t.fn.countdown = function(e, n) {
        var r = t.extend({
            date: null,
            offset: null,
            day: "Day",
            days: "Days",
            hour: "Hour",
            hours: "Hours",
            minute: "Minute",
            minutes: "Minutes",
            second: "Second",
            seconds: "Seconds"
        }, e);
        r.date || t.error("Date is not defined."), Date.parse(r.date) || t.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.");
        var i = this, s = function() {
            var t = new Date(), e = t.getTime() + 6e4 * t.getTimezoneOffset();
            return new Date(e + 36e5 * r.offset);
        }, d = setInterval(function() {
            var o = new Date(r.date) - s();
            if (o < 0) return clearInterval(d), void (n && "function" == typeof n && n());
            var u = 36e5, c = Math.floor(o / 864e5), h = Math.floor(o % 864e5 / u), x = Math.floor(o % u / 6e4), g = Math.floor(o % 6e4 / 1e3), y = 1 === c ? r.day : r.days, m = 1 === h ? r.hour : r.hours, v = 1 === x ? r.minute : r.minutes, D = 1 === g ? r.second : r.seconds;
            c = 2 <= String(c).length ? c : "0" + c, h = 2 <= String(h).length ? h : "0" + h, 
            x = 2 <= String(x).length ? x : "0" + x, g = 2 <= String(g).length ? g : "0" + g, 
            i.find(".days").text(c), i.find(".hours").text(h), i.find(".minutes").text(x), i.find(".seconds").text(g), 
            i.find(".days_text").text(y), i.find(".hours_text").text(m), i.find(".minutes_text").text(v), 
            i.find(".seconds_text").text(D);
        }, 1e3);
    };
}(jQuery), "function" != typeof Object.create && (Object.create = function(f) {
    function g() {}
    return g.prototype = f, new g();
}), function(f, g, k) {
    var l = {
        init: function(a, b) {
            this.$elem = f(b), this.options = f.extend({}, f.fn.owlCarousel.options, this.$elem.data(), a), 
            this.userOptions = a, this.loadContent();
        },
        loadContent: function() {
            var e, b = this;
            "function" == typeof b.options.beforeInit && b.options.beforeInit.apply(this, [ b.$elem ]), 
            "string" == typeof b.options.jsonPath ? (e = b.options.jsonPath, f.getJSON(e, function(a) {
                var d, e = "";
                if ("function" == typeof b.options.jsonSuccess) b.options.jsonSuccess.apply(this, [ a ]); else {
                    for (d in a.owl) a.owl.hasOwnProperty(d) && (e += a.owl[d].item);
                    b.$elem.html(e);
                }
                b.logIn();
            })) : b.logIn();
        },
        logIn: function() {
            this.$elem.data("owl-originalStyles", this.$elem.attr("style")), this.$elem.data("owl-originalClasses", this.$elem.attr("class")), 
            this.$elem.css({
                opacity: 0
            }), this.orignalItems = this.options.items, this.checkBrowser(), this.wrapperWidth = 0, 
            this.checkVisible = null, this.setVars();
        },
        setVars: function() {
            if (0 === this.$elem.children().length) return !1;
            this.baseClass(), this.eventTypes(), this.$userItems = this.$elem.children(), this.itemsAmount = this.$userItems.length, 
            this.wrapItems(), this.$owlItems = this.$elem.find(".owl-item"), this.$owlWrapper = this.$elem.find(".owl-wrapper"), 
            this.playDirection = "next", this.prevItem = 0, this.prevArr = [ 0 ], this.currentItem = 0, 
            this.customEvents(), this.onStartup();
        },
        onStartup: function() {
            this.updateItems(), this.calculateAll(), this.buildControls(), this.updateControls(), 
            this.response(), this.moveEvents(), this.stopOnHover(), this.owlStatus(), !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle), 
            !0 === this.options.autoPlay && (this.options.autoPlay = 5e3), this.play(), this.$elem.find(".owl-wrapper").css("display", "block"), 
            this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility(), 
            this.onstartup = !1, this.eachMoveUpdate(), "function" == typeof this.options.afterInit && this.options.afterInit.apply(this, [ this.$elem ]);
        },
        eachMoveUpdate: function() {
            !0 === this.options.lazyLoad && this.lazyLoad(), !0 === this.options.autoHeight && this.autoHeight(), 
            this.onVisibleItems(), "function" == typeof this.options.afterAction && this.options.afterAction.apply(this, [ this.$elem ]);
        },
        updateVars: function() {
            "function" == typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [ this.$elem ]), 
            this.watchVisibility(), this.updateItems(), this.calculateAll(), this.updatePosition(), 
            this.updateControls(), this.eachMoveUpdate(), "function" == typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [ this.$elem ]);
        },
        reload: function() {
            var a = this;
            g.setTimeout(function() {
                a.updateVars();
            }, 0);
        },
        watchVisibility: function() {
            var a = this;
            if (!1 !== a.$elem.is(":visible")) return !1;
            a.$elem.css({
                opacity: 0
            }), g.clearInterval(a.autoPlayInterval), g.clearInterval(a.checkVisible), a.checkVisible = g.setInterval(function() {
                a.$elem.is(":visible") && (a.reload(), a.$elem.animate({
                    opacity: 1
                }, 200), g.clearInterval(a.checkVisible));
            }, 500);
        },
        wrapItems: function() {
            this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), 
            this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), this.wrapperOuter = this.$elem.find(".owl-wrapper-outer"), 
            this.$elem.css("display", "block");
        },
        baseClass: function() {
            var a = this.$elem.hasClass(this.options.baseClass), b = this.$elem.hasClass(this.options.theme);
            a || this.$elem.addClass(this.options.baseClass), b || this.$elem.addClass(this.options.theme);
        },
        updateItems: function() {
            var a, b;
            if (!1 === this.options.responsive) return !1;
            if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, 
            this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, 
            this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
            if ((a = f(this.options.responsiveBaseWidth).width()) > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems), 
            !1 !== this.options.itemsCustom) for (this.options.itemsCustom.sort(function(a, b) {
                return a[0] - b[0];
            }), b = 0; b < this.options.itemsCustom.length; b += 1) this.options.itemsCustom[b][0] <= a && (this.options.items = this.options.itemsCustom[b][1]); else a <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]), 
            a <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), 
            a <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), 
            a <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), 
            a <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
            this.options.items > this.itemsAmount && !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount);
        },
        response: function() {
            var b, e, a = this;
            if (!0 !== a.options.responsive) return !1;
            e = f(g).width(), a.resizer = function() {
                f(g).width() !== e && (!1 !== a.options.autoPlay && g.clearInterval(a.autoPlayInterval), 
                g.clearTimeout(b), b = g.setTimeout(function() {
                    e = f(g).width(), a.updateVars();
                }, a.options.responsiveRefreshRate));
            }, f(g).resize(a.resizer);
        },
        updatePosition: function() {
            this.jumpTo(this.currentItem), !1 !== this.options.autoPlay && this.checkAp();
        },
        appendItemsSizes: function() {
            var a = this, b = 0, e = a.itemsAmount - a.options.items;
            a.$owlItems.each(function(c) {
                var d = f(this);
                d.css({
                    width: a.itemWidth
                }).data("owl-item", Number(c)), 0 != c % a.options.items && c !== e || e < c || (b += 1), 
                d.data("owl-roundPages", b);
            });
        },
        appendWrapperSizes: function() {
            this.$owlWrapper.css({
                width: this.$owlItems.length * this.itemWidth * 2,
                left: 0
            }), this.appendItemsSizes();
        },
        calculateAll: function() {
            this.calculateWidth(), this.appendWrapperSizes(), this.loops(), this.max();
        },
        calculateWidth: function() {
            this.itemWidth = Math.round(this.$elem.width() / this.options.items);
        },
        max: function() {
            var a = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
            return this.options.items > this.itemsAmount ? this.maximumPixels = a = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, 
            this.maximumPixels = a), a;
        },
        min: function() {
            return 0;
        },
        loops: function() {
            var e, c, a = 0, b = 0;
            for (this.positionsInArray = [ 0 ], this.pagesInArray = [], e = 0; e < this.itemsAmount; e += 1) b += this.itemWidth, 
            this.positionsInArray.push(-b), !0 === this.options.scrollPerPage && ((c = (c = f(this.$owlItems[e])).data("owl-roundPages")) !== a && (this.pagesInArray[a] = this.positionsInArray[e], 
            a = c));
        },
        buildControls: function() {
            !0 !== this.options.navigation && !0 !== this.options.pagination || (this.owlControls = f('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem)), 
            !0 === this.options.pagination && this.buildPagination(), !0 === this.options.navigation && this.buildButtons();
        },
        buildButtons: function() {
            var a = this, b = f('<div class="owl-buttons"/>');
            a.owlControls.append(b), a.buttonPrev = f("<div/>", {
                class: "owl-prev",
                html: a.options.navigationText[0] || ""
            }), a.buttonNext = f("<div/>", {
                class: "owl-next",
                html: a.options.navigationText[1] || ""
            }), b.append(a.buttonPrev).append(a.buttonNext), b.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(a) {
                a.preventDefault();
            }), b.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(b) {
                b.preventDefault(), f(this).hasClass("owl-next") ? a.next() : a.prev();
            });
        },
        buildPagination: function() {
            var a = this;
            a.paginationWrapper = f('<div class="owl-pagination"/>'), a.owlControls.append(a.paginationWrapper), 
            a.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(b) {
                b.preventDefault(), Number(f(this).data("owl-page")) !== a.currentItem && a.goTo(Number(f(this).data("owl-page")), !0);
            });
        },
        updatePagination: function() {
            var a, b, e, c, d, g;
            if (!1 === this.options.pagination) return !1;
            for (this.paginationWrapper.html(""), a = 0, b = this.itemsAmount - this.itemsAmount % this.options.items, 
            c = 0; c < this.itemsAmount; c += 1) 0 == c % this.options.items && (a += 1, b === c && (e = this.itemsAmount - this.options.items), 
            d = f("<div/>", {
                class: "owl-page"
            }), g = f("<span></span>", {
                text: !0 === this.options.paginationNumbers ? a : "",
                class: !0 === this.options.paginationNumbers ? "owl-numbers" : ""
            }), d.append(g), d.data("owl-page", b === c ? e : c), d.data("owl-roundPages", a), 
            this.paginationWrapper.append(d));
            this.checkPagination();
        },
        checkPagination: function() {
            var a = this;
            if (!1 === a.options.pagination) return !1;
            a.paginationWrapper.find(".owl-page").each(function() {
                f(this).data("owl-roundPages") === f(a.$owlItems[a.currentItem]).data("owl-roundPages") && (a.paginationWrapper.find(".owl-page").removeClass("active"), 
                f(this).addClass("active"));
            });
        },
        checkNavigation: function() {
            if (!1 === this.options.navigation) return !1;
            !1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), 
            this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), 
            this.buttonNext.removeClass("disabled")) : this.currentItem === this.maximumItem ? (this.buttonPrev.removeClass("disabled"), 
            this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), 
            this.buttonNext.removeClass("disabled")));
        },
        updateControls: function() {
            this.updatePagination(), this.checkNavigation(), this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show());
        },
        destroyControls: function() {
            this.owlControls && this.owlControls.remove();
        },
        next: function(a) {
            if (this.isTransition) return !1;
            if (this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1, 
            this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0)) {
                if (!0 !== this.options.rewindNav) return this.currentItem = this.maximumItem, !1;
                this.currentItem = 0, a = "rewind";
            }
            this.goTo(this.currentItem, a);
        },
        prev: function(a) {
            if (this.isTransition) return !1;
            if (this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ? this.options.items : 1), 
            this.currentItem < 0) {
                if (!0 !== this.options.rewindNav) return this.currentItem = 0, !1;
                this.currentItem = this.maximumItem, a = "rewind";
            }
            this.goTo(this.currentItem, a);
        },
        goTo: function(a, b, e) {
            var c = this;
            return !c.isTransition && ("function" == typeof c.options.beforeMove && c.options.beforeMove.apply(this, [ c.$elem ]), 
            a >= c.maximumItem ? a = c.maximumItem : a <= 0 && (a = 0), c.currentItem = c.owl.currentItem = a, 
            !1 !== c.options.transitionStyle && "drag" !== e && 1 === c.options.items && !0 === c.browser.support3d ? (c.swapSpeed(0), 
            !0 === c.browser.support3d ? c.transition3d(c.positionsInArray[a]) : c.css2slide(c.positionsInArray[a], 1), 
            c.afterGo(), c.singleItemTransition(), !1) : (a = c.positionsInArray[a], !0 === c.browser.support3d ? (!(c.isCss3Finish = !1) === b ? (c.swapSpeed("paginationSpeed"), 
            g.setTimeout(function() {
                c.isCss3Finish = !0;
            }, c.options.paginationSpeed)) : "rewind" === b ? (c.swapSpeed(c.options.rewindSpeed), 
            g.setTimeout(function() {
                c.isCss3Finish = !0;
            }, c.options.rewindSpeed)) : (c.swapSpeed("slideSpeed"), g.setTimeout(function() {
                c.isCss3Finish = !0;
            }, c.options.slideSpeed)), c.transition3d(a)) : !0 === b ? c.css2slide(a, c.options.paginationSpeed) : "rewind" === b ? c.css2slide(a, c.options.rewindSpeed) : c.css2slide(a, c.options.slideSpeed), 
            void c.afterGo()));
        },
        jumpTo: function(a) {
            "function" == typeof this.options.beforeMove && this.options.beforeMove.apply(this, [ this.$elem ]), 
            a >= this.maximumItem || -1 === a ? a = this.maximumItem : a <= 0 && (a = 0), this.swapSpeed(0), 
            !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[a]) : this.css2slide(this.positionsInArray[a], 1), 
            this.currentItem = this.owl.currentItem = a, this.afterGo();
        },
        afterGo: function() {
            this.prevArr.push(this.currentItem), this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2], 
            this.prevArr.shift(0), this.prevItem !== this.currentItem && (this.checkPagination(), 
            this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp()), 
            "function" == typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [ this.$elem ]);
        },
        stop: function() {
            this.apStatus = "stop", g.clearInterval(this.autoPlayInterval);
        },
        checkAp: function() {
            "stop" !== this.apStatus && this.play();
        },
        play: function() {
            var a = this;
            if (!(a.apStatus = "play") === a.options.autoPlay) return !1;
            g.clearInterval(a.autoPlayInterval), a.autoPlayInterval = g.setInterval(function() {
                a.next(!0);
            }, a.options.autoPlay);
        },
        swapSpeed: function(a) {
            "slideSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" != typeof a && this.$owlWrapper.css(this.addCssSpeed(a));
        },
        addCssSpeed: function(a) {
            return {
                "-webkit-transition": "all " + a + "ms ease",
                "-moz-transition": "all " + a + "ms ease",
                "-o-transition": "all " + a + "ms ease",
                transition: "all " + a + "ms ease"
            };
        },
        removeTransition: function() {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                transition: ""
            };
        },
        doTranslate: function(a) {
            return {
                "-webkit-transform": "translate3d(" + a + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + a + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + a + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + a + "px, 0px, 0px)",
                transform: "translate3d(" + a + "px, 0px,0px)"
            };
        },
        transition3d: function(a) {
            this.$owlWrapper.css(this.doTranslate(a));
        },
        css2move: function(a) {
            this.$owlWrapper.css({
                left: a
            });
        },
        css2slide: function(a, b) {
            var e = this;
            e.isCssFinish = !1, e.$owlWrapper.stop(!0, !0).animate({
                left: a
            }, {
                duration: b || e.options.slideSpeed,
                complete: function() {
                    e.isCssFinish = !0;
                }
            });
        },
        checkBrowser: function() {
            var a = k.createElement("div");
            a.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)", 
            a = a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g), this.browser = {
                support3d: null !== a && 1 === a.length,
                isTouch: "ontouchstart" in g || g.navigator.msMaxTouchPoints
            };
        },
        moveEvents: function() {
            !1 === this.options.mouseDrag && !1 === this.options.touchDrag || (this.gestures(), 
            this.disabledEvents());
        },
        eventTypes: function() {
            var a = [ "s", "e", "x" ];
            this.ev_types = {}, !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = [ "touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl" ] : !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = [ "touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl" ] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (a = [ "mousedown.owl", "mousemove.owl", "mouseup.owl" ]), 
            this.ev_types.start = a[0], this.ev_types.move = a[1], this.ev_types.end = a[2];
        },
        disabledEvents: function() {
            this.$elem.on("dragstart.owl", function(a) {
                a.preventDefault();
            }), this.$elem.on("mousedown.disableTextSelect", function(a) {
                return f(a.target).is("input, textarea, select, option");
            });
        },
        gestures: function() {
            function a(a) {
                if (void 0 !== a.touches) return {
                    x: a.touches[0].pageX,
                    y: a.touches[0].pageY
                };
                if (void 0 === a.touches) {
                    if (void 0 !== a.pageX) return {
                        x: a.pageX,
                        y: a.pageY
                    };
                    if (void 0 === a.pageX) return {
                        x: a.clientX,
                        y: a.clientY
                    };
                }
            }
            function b(a) {
                "on" === a ? (f(k).on(d.ev_types.move, e), f(k).on(d.ev_types.end, c)) : "off" === a && (f(k).off(d.ev_types.move), 
                f(k).off(d.ev_types.end));
            }
            function e(b) {
                b = b.originalEvent || b || g.event, d.newPosX = a(b).x - h.offsetX, d.newPosY = a(b).y - h.offsetY, 
                d.newRelativeX = d.newPosX - h.relativePos, "function" == typeof d.options.startDragging && !0 !== h.dragging && 0 !== d.newRelativeX && (h.dragging = !0, 
                d.options.startDragging.apply(d, [ d.$elem ])), (8 < d.newRelativeX || d.newRelativeX < -8) && !0 === d.browser.isTouch && (void 0 !== b.preventDefault ? b.preventDefault() : b.returnValue = !1, 
                h.sliding = !0), (10 < d.newPosY || d.newPosY < -10) && !1 === h.sliding && f(k).off("touchmove.owl"), 
                d.newPosX = Math.max(Math.min(d.newPosX, d.newRelativeX / 5), d.maximumPixels + d.newRelativeX / 5), 
                !0 === d.browser.support3d ? d.transition3d(d.newPosX) : d.css2move(d.newPosX);
            }
            function c(a) {
                var c;
                (a = a.originalEvent || a || g.event).target = a.target || a.srcElement, !(h.dragging = !1) !== d.browser.isTouch && d.$owlWrapper.removeClass("grabbing"), 
                d.dragDirection = d.newRelativeX < 0 ? d.owl.dragDirection = "left" : d.owl.dragDirection = "right", 
                0 !== d.newRelativeX && (c = d.getNewPosition(), d.goTo(c, !1, "drag"), h.targetElement === a.target && !0 !== d.browser.isTouch && (f(a.target).on("click.disable", function(a) {
                    a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault(), f(a.target).off("click.disable");
                }), c = (a = f._data(a.target, "events").click).pop(), a.splice(0, 0, c))), b("off");
            }
            var d = this, h = {
                offsetX: 0,
                offsetY: 0,
                baseElWidth: 0,
                relativePos: 0,
                position: null,
                minSwipe: null,
                maxSwipe: null,
                sliding: null,
                dargging: null,
                targetElement: null
            };
            d.isCssFinish = !0, d.$elem.on(d.ev_types.start, ".owl-wrapper", function(c) {
                var e;
                if (3 === (c = c.originalEvent || c || g.event).which) return !1;
                if (!(d.itemsAmount <= d.options.items)) {
                    if (!1 === d.isCssFinish && !d.options.dragBeforeAnimFinish || !1 === d.isCss3Finish && !d.options.dragBeforeAnimFinish) return !1;
                    !1 !== d.options.autoPlay && g.clearInterval(d.autoPlayInterval), !0 === d.browser.isTouch || d.$owlWrapper.hasClass("grabbing") || d.$owlWrapper.addClass("grabbing"), 
                    d.newPosX = 0, d.newRelativeX = 0, f(this).css(d.removeTransition()), e = f(this).position(), 
                    h.relativePos = e.left, h.offsetX = a(c).x - e.left, h.offsetY = a(c).y - e.top, 
                    b("on"), h.sliding = !1, h.targetElement = c.target || c.srcElement;
                }
            });
        },
        getNewPosition: function() {
            var a = this.closestItem();
            return a > this.maximumItem ? a = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem = a = 0), 
            a;
        },
        closestItem: function() {
            var a = this, b = !0 === a.options.scrollPerPage ? a.pagesInArray : a.positionsInArray, e = a.newPosX, c = null;
            return f.each(b, function(d, g) {
                e - a.itemWidth / 20 > b[d + 1] && e - a.itemWidth / 20 < g && "left" === a.moveDirection() ? (c = g, 
                a.currentItem = !0 === a.options.scrollPerPage ? f.inArray(c, a.positionsInArray) : d) : e + a.itemWidth / 20 < g && e + a.itemWidth / 20 > (b[d + 1] || b[d] - a.itemWidth) && "right" === a.moveDirection() && (!0 === a.options.scrollPerPage ? (c = b[d + 1] || b[b.length - 1], 
                a.currentItem = f.inArray(c, a.positionsInArray)) : (c = b[d + 1], a.currentItem = d + 1));
            }), a.currentItem;
        },
        moveDirection: function() {
            var a;
            return this.newRelativeX < 0 ? (a = "right", this.playDirection = "next") : (a = "left", 
            this.playDirection = "prev"), a;
        },
        customEvents: function() {
            var a = this;
            a.$elem.on("owl.next", function() {
                a.next();
            }), a.$elem.on("owl.prev", function() {
                a.prev();
            }), a.$elem.on("owl.play", function(b, e) {
                a.options.autoPlay = e, a.play(), a.hoverStatus = "play";
            }), a.$elem.on("owl.stop", function() {
                a.stop(), a.hoverStatus = "stop";
            }), a.$elem.on("owl.goTo", function(b, e) {
                a.goTo(e);
            }), a.$elem.on("owl.jumpTo", function(b, e) {
                a.jumpTo(e);
            });
        },
        stopOnHover: function() {
            var a = this;
            !0 === a.options.stopOnHover && !0 !== a.browser.isTouch && !1 !== a.options.autoPlay && (a.$elem.on("mouseover", function() {
                a.stop();
            }), a.$elem.on("mouseout", function() {
                "stop" !== a.hoverStatus && a.play();
            }));
        },
        lazyLoad: function() {
            var a, b, e, c;
            if (!1 === this.options.lazyLoad) return !1;
            for (a = 0; a < this.itemsAmount; a += 1) "loaded" !== (b = f(this.$owlItems[a])).data("owl-loaded") && (e = b.data("owl-item"), 
            "string" != typeof (c = b.find(".lazyOwl")).data("src") ? b.data("owl-loaded", "loaded") : (void 0 === b.data("owl-loaded") && (c.hide(), 
            b.addClass("loading").data("owl-loaded", "checked")), (!0 !== this.options.lazyFollow || e >= this.currentItem) && e < this.currentItem + this.options.items && c.length && this.lazyPreload(b, c)));
        },
        lazyPreload: function(a, b) {
            function e() {
                a.data("owl-loaded", "loaded").removeClass("loading"), b.removeAttr("data-src"), 
                "fade" === d.options.lazyEffect ? b.fadeIn(400) : b.show(), "function" == typeof d.options.afterLazyLoad && d.options.afterLazyLoad.apply(this, [ d.$elem ]);
            }
            var k, d = this, f = 0;
            "DIV" === b.prop("tagName") ? (b.css("background-image", "url(" + b.data("src") + ")"), 
            k = !0) : b[0].src = b.data("src"), function c() {
                f += 1, d.completeImg(b.get(0)) || !0 === k ? e() : f <= 100 ? g.setTimeout(c, 100) : e();
            }();
        },
        autoHeight: function() {
            function a() {
                var a = f(e.$owlItems[e.currentItem]).height();
                e.wrapperOuter.css("height", a + "px"), e.wrapperOuter.hasClass("autoHeight") || g.setTimeout(function() {
                    e.wrapperOuter.addClass("autoHeight");
                }, 0);
            }
            var d, e = this, c = f(e.$owlItems[e.currentItem]).find("img");
            void 0 !== c.get(0) ? (d = 0, function b() {
                d += 1, e.completeImg(c.get(0)) ? a() : d <= 100 ? g.setTimeout(b, 100) : e.wrapperOuter.css("height", "");
            }()) : a();
        },
        completeImg: function(a) {
            return !(!a.complete || void 0 !== a.naturalWidth && 0 === a.naturalWidth);
        },
        onVisibleItems: function() {
            var a;
            for (!0 === this.options.addClassActive && this.$owlItems.removeClass("active"), 
            this.visibleItems = [], a = this.currentItem; a < this.currentItem + this.options.items; a += 1) this.visibleItems.push(a), 
            !0 === this.options.addClassActive && f(this.$owlItems[a]).addClass("active");
            this.owl.visibleItems = this.visibleItems;
        },
        transitionTypes: function(a) {
            this.outClass = "owl-" + a + "-out", this.inClass = "owl-" + a + "-in";
        },
        singleItemTransition: function() {
            var a = this, b = a.outClass, e = a.inClass, c = a.$owlItems.eq(a.currentItem), d = a.$owlItems.eq(a.prevItem), f = Math.abs(a.positionsInArray[a.currentItem]) + a.positionsInArray[a.prevItem], g = Math.abs(a.positionsInArray[a.currentItem]) + a.itemWidth / 2;
            a.isTransition = !0, a.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": g + "px",
                "-moz-perspective-origin": g + "px",
                "perspective-origin": g + "px"
            }), d.css({
                position: "relative",
                left: f + "px"
            }).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                a.endPrev = !0, d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), 
                a.clearTransStyle(d, b);
            }), c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                a.endCurrent = !0, c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), 
                a.clearTransStyle(c, e);
            });
        },
        clearTransStyle: function(a, b) {
            a.css({
                position: "",
                left: ""
            }).removeClass(b), this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), 
            this.isTransition = this.endCurrent = this.endPrev = !1);
        },
        owlStatus: function() {
            this.owl = {
                userOptions: this.userOptions,
                baseElement: this.$elem,
                userItems: this.$userItems,
                owlItems: this.$owlItems,
                currentItem: this.currentItem,
                prevItem: this.prevItem,
                visibleItems: this.visibleItems,
                isTouch: this.browser.isTouch,
                browser: this.browser,
                dragDirection: this.dragDirection
            };
        },
        clearEvents: function() {
            this.$elem.off(".owl owl mousedown.disableTextSelect"), f(k).off(".owl owl"), f(g).off("resize", this.resizer);
        },
        unWrap: function() {
            0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), 
            this.owlControls && this.owlControls.remove()), this.clearEvents(), this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"));
        },
        destroy: function() {
            this.stop(), g.clearInterval(this.checkVisible), this.unWrap(), this.$elem.removeData();
        },
        reinit: function(a) {
            a = f.extend({}, this.userOptions, a), this.unWrap(), this.init(a, this.$elem);
        },
        addItem: function(a, b) {
            var e;
            return !!a && (0 === this.$elem.children().length ? (this.$elem.append(a), this.setVars(), 
            !1) : (this.unWrap(), (e = void 0 === b || -1 === b ? -1 : b) >= this.$userItems.length || -1 === e ? this.$userItems.eq(-1).after(a) : this.$userItems.eq(e).before(a), 
            void this.setVars()));
        },
        removeItem: function(a) {
            if (0 === this.$elem.children().length) return !1;
            a = void 0 === a || -1 === a ? -1 : a, this.unWrap(), this.$userItems.eq(a).remove(), 
            this.setVars();
        }
    };
    f.fn.owlCarousel = function(a) {
        return this.each(function() {
            if (!0 === f(this).data("owl-init")) return !1;
            f(this).data("owl-init", !0);
            var b = Object.create(l);
            b.init(a, this), f.data(this, "owlCarousel", b);
        });
    }, f.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [ 1199, 4 ],
        itemsDesktopSmall: [ 979, 3 ],
        itemsTablet: [ 768, 2 ],
        itemsTabletSmall: !1,
        itemsMobile: [ 479, 1 ],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: [ "prev", "next" ],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: g,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1
    };
}(jQuery, window, document), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(e, f, a, h, g) {
        return jQuery.easing[jQuery.easing.def](e, f, a, h, g);
    },
    easeInQuad: function(e, f, a, h, g) {
        return h * (f /= g) * f + a;
    },
    easeOutQuad: function(e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a;
    },
    easeInOutQuad: function(e, f, a, h, g) {
        return (f /= g / 2) < 1 ? h / 2 * f * f + a : -h / 2 * (--f * (f - 2) - 1) + a;
    },
    easeInCubic: function(e, f, a, h, g) {
        return h * (f /= g) * f * f + a;
    },
    easeOutCubic: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a;
    },
    easeInOutCubic: function(e, f, a, h, g) {
        return (f /= g / 2) < 1 ? h / 2 * f * f * f + a : h / 2 * ((f -= 2) * f * f + 2) + a;
    },
    easeInQuart: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a;
    },
    easeOutQuart: function(e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a;
    },
    easeInOutQuart: function(e, f, a, h, g) {
        return (f /= g / 2) < 1 ? h / 2 * f * f * f * f + a : -h / 2 * ((f -= 2) * f * f * f - 2) + a;
    },
    easeInQuint: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a;
    },
    easeOutQuint: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a;
    },
    easeInOutQuint: function(e, f, a, h, g) {
        return (f /= g / 2) < 1 ? h / 2 * f * f * f * f * f + a : h / 2 * ((f -= 2) * f * f * f * f + 2) + a;
    },
    easeInSine: function(e, f, a, h, g) {
        return -h * Math.cos(f / g * (Math.PI / 2)) + h + a;
    },
    easeOutSine: function(e, f, a, h, g) {
        return h * Math.sin(f / g * (Math.PI / 2)) + a;
    },
    easeInOutSine: function(e, f, a, h, g) {
        return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a;
    },
    easeInExpo: function(e, f, a, h, g) {
        return 0 == f ? a : h * Math.pow(2, 10 * (f / g - 1)) + a;
    },
    easeOutExpo: function(e, f, a, h, g) {
        return f == g ? a + h : h * (1 - Math.pow(2, -10 * f / g)) + a;
    },
    easeInOutExpo: function(e, f, a, h, g) {
        return 0 == f ? a : f == g ? a + h : (f /= g / 2) < 1 ? h / 2 * Math.pow(2, 10 * (f - 1)) + a : h / 2 * (2 - Math.pow(2, -10 * --f)) + a;
    },
    easeInCirc: function(e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a;
    },
    easeOutCirc: function(e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a;
    },
    easeInOutCirc: function(e, f, a, h, g) {
        return (f /= g / 2) < 1 ? -h / 2 * (Math.sqrt(1 - f * f) - 1) + a : h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a;
    },
    easeInElastic: function(f, h, e, l, k) {
        var i = 1.70158, j = 0, g = l;
        if (0 == h) return e;
        if (1 == (h /= k)) return e + l;
        if (j || (j = .3 * k), g < Math.abs(l)) {
            g = l;
            i = j / 4;
        } else i = j / (2 * Math.PI) * Math.asin(l / g);
        return -g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) + e;
    },
    easeOutElastic: function(f, h, e, l, k) {
        var i = 1.70158, j = 0, g = l;
        if (0 == h) return e;
        if (1 == (h /= k)) return e + l;
        if (j || (j = .3 * k), g < Math.abs(l)) {
            g = l;
            i = j / 4;
        } else i = j / (2 * Math.PI) * Math.asin(l / g);
        return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e;
    },
    easeInOutElastic: function(f, h, e, l, k) {
        var i = 1.70158, j = 0, g = l;
        if (0 == h) return e;
        if (2 == (h /= k / 2)) return e + l;
        if (j || (j = k * (.3 * 1.5)), g < Math.abs(l)) {
            g = l;
            i = j / 4;
        } else i = j / (2 * Math.PI) * Math.asin(l / g);
        return h < 1 ? g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * -.5 + e : g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * .5 + l + e;
    },
    easeInBack: function(e, f, a, i, h, g) {
        return null == g && (g = 1.70158), i * (f /= h) * f * ((g + 1) * f - g) + a;
    },
    easeOutBack: function(e, f, a, i, h, g) {
        return null == g && (g = 1.70158), i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a;
    },
    easeInOutBack: function(e, f, a, i, h, g) {
        return null == g && (g = 1.70158), (f /= h / 2) < 1 ? i / 2 * (f * f * ((1 + (g *= 1.525)) * f - g)) + a : i / 2 * ((f -= 2) * f * ((1 + (g *= 1.525)) * f + g) + 2) + a;
    },
    easeInBounce: function(e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a;
    },
    easeOutBounce: function(e, f, a, h, g) {
        return (f /= g) < 1 / 2.75 ? h * (7.5625 * f * f) + a : f < 2 / 2.75 ? h * (7.5625 * (f -= 1.5 / 2.75) * f + .75) + a : f < 2.5 / 2.75 ? h * (7.5625 * (f -= 2.25 / 2.75) * f + .9375) + a : h * (7.5625 * (f -= 2.625 / 2.75) * f + .984375) + a;
    },
    easeInOutBounce: function(e, f, a, h, g) {
        return f < g / 2 ? .5 * jQuery.easing.easeInBounce(e, 2 * f, 0, h, g) + a : .5 * jQuery.easing.easeOutBounce(e, 2 * f - g, 0, h, g) + .5 * h + a;
    }
}), function() {
    var t = [].indexOf || function(t) {
        for (var e = 0, n = this.length; e < n; e++) if (e in this && this[e] === t) return e;
        return -1;
    }, e = [].slice;
    !function(t, e) {
        "function" == typeof define && define.amd ? define("waypoints", [ "jquery" ], function(n) {
            return e(n, t);
        }) : e(t.jQuery, t);
    }(this, function(n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        return i = n(r), c = 0 <= t.call(r, "ontouchstart"), s = {
            horizontal: {},
            vertical: {}
        }, a = {}, u = "waypoints-context-id", p = "resize.waypoints", y = "scroll.waypoints", 
        v = f = 1, w = "waypoints-waypoint-ids", g = "waypoint", m = "waypoints", o = function() {
            function t(t) {
                var e = this;
                this.$element = t, this.element = t[0], this.didResize = !1, this.didScroll = !1, 
                this.id = "context" + f++, this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                }, this.waypoints = {
                    horizontal: {},
                    vertical: {}
                }, t.data(u, this.id), a[this.id] = this, t.bind(y, function() {
                    var t;
                    if (!e.didScroll && !c) return e.didScroll = !0, t = function() {
                        return e.doScroll(), e.didScroll = !1;
                    }, r.setTimeout(t, n[m].settings.scrollThrottle);
                }), t.bind(p, function() {
                    var t;
                    if (!e.didResize) return e.didResize = !0, t = function() {
                        return n[m]("refresh"), e.didResize = !1;
                    }, r.setTimeout(t, n[m].settings.resizeThrottle);
                });
            }
            return t.prototype.doScroll = function() {
                var t, e = this;
                return t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                }, !c || t.vertical.oldScroll && t.vertical.newScroll || n[m]("refresh"), n.each(t, function(t, r) {
                    var i, o, l;
                    return l = [], o = r.newScroll > r.oldScroll, i = o ? r.forward : r.backward, n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        return r.oldScroll < (n = e.offset) && n <= r.newScroll ? l.push(e) : r.newScroll < (i = e.offset) && i <= r.oldScroll ? l.push(e) : void 0;
                    }), l.sort(function(t, e) {
                        return t.offset - e.offset;
                    }), o || l.reverse(), n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) return e.trigger([ i ]);
                    });
                }), this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                };
            }, t.prototype.refresh = function() {
                var t, e, r, i = this;
                return r = n.isWindow(this.element), e = this.$element.offset(), this.doScroll(), 
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                }, n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        if (i = r.options.offset, l = r.offset, o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp], 
                        n.isFunction(i) ? i = i.apply(r.element) : "string" == typeof i && (i = parseFloat(i), 
                        -1 < r.options.offset.indexOf("%") && (i = Math.ceil(e.contextDimension * i / 100))), 
                        r.offset = o - e.contextOffset + e.contextScroll - i, (!r.options.onlyOnScroll || null == l) && r.enabled) return null !== l && l < (s = e.oldScroll) && s <= r.offset ? r.trigger([ e.backward ]) : null !== l && l > (f = e.oldScroll) && f >= r.offset ? r.trigger([ e.forward ]) : null === l && e.oldScroll >= r.offset ? r.trigger([ e.forward ]) : void 0;
                    });
                });
            }, t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) return this.$element.unbind([ p, y ].join(" ")), 
                delete a[this.id];
            }, t;
        }(), l = function() {
            function t(t, e, r) {
                var i, o;
                "bottom-in-view" === (r = n.extend({}, n.fn[g].defaults, r)).offset && (r.offset = function() {
                    var t;
                    return t = n[m]("viewportHeight"), n.isWindow(e.element) || (t = e.$element.height()), 
                    t - n(this).outerHeight();
                }), this.$element = t, this.element = t[0], this.axis = r.horizontal ? "horizontal" : "vertical", 
                this.callback = r.handler, this.context = e, this.enabled = r.enabled, this.id = "waypoints" + v++, 
                this.offset = null, this.options = r, e.waypoints[this.axis][this.id] = this, s[this.axis][this.id] = this, 
                (i = null != (o = t.data(w)) ? o : []).push(this.id), t.data(w, i);
            }
            return t.prototype.trigger = function(t) {
                if (this.enabled) return null != this.callback && this.callback.apply(this.element, t), 
                this.options.triggerOnce ? this.destroy() : void 0;
            }, t.prototype.disable = function() {
                return this.enabled = !1;
            }, t.prototype.enable = function() {
                return this.context.refresh(), this.enabled = !0;
            }, t.prototype.destroy = function() {
                return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], 
                this.context.checkEmpty();
            }, t.getWaypointsByElement = function(t) {
                var e, r;
                return (r = n(t).data(w)) ? (e = n.extend({}, s.horizontal, s.vertical), n.map(r, function(t) {
                    return e[t];
                })) : [];
            }, t;
        }(), d = {
            init: function(t, e) {
                return null == e && (e = {}), null == e.handler && (e.handler = t), this.each(function() {
                    var t, r, i, s;
                    return t = n(this), i = null != (s = e.context) ? s : n.fn[g].defaults.context, 
                    n.isWindow(i) || (i = t.closest(i)), i = n(i), (r = a[i.data(u)]) || (r = new o(i)), 
                    new l(t, r, e);
                }), n[m]("refresh"), this;
            },
            disable: function() {
                return d._invoke(this, "disable");
            },
            enable: function() {
                return d._invoke(this, "enable");
            },
            destroy: function() {
                return d._invoke(this, "destroy");
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (0 < e) return t.push(n[e - 1]);
                });
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) return t.push(n[e + 1]);
                });
            },
            _traverse: function(t, e, i) {
                var o, l;
                return null == t && (t = "vertical"), null == e && (e = r), l = h.aggregate(e), 
                o = [], this.each(function() {
                    var e;
                    return e = n.inArray(this, l[t]), i(o, e, l[t]);
                }), this.pushStack(o);
            },
            _invoke: function(t, e) {
                return t.each(function() {
                    var t;
                    return t = l.getWaypointsByElement(this), n.each(t, function(t, n) {
                        return n[e](), !0;
                    });
                }), this;
            }
        }, n.fn[g] = function() {
            var t, r;
            return r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], 
            d[r] ? d[r].apply(this, t) : n.isFunction(r) ? d.init.apply(this, arguments) : n.isPlainObject(r) ? d.init.apply(this, [ null, r ]) : r ? n.error("The " + r + " method does not exist in jQuery Waypoints.") : n.error("jQuery Waypoints needs a callback function or handler option.");
        }, n.fn[g].defaults = {
            context: r,
            continuous: !0,
            enabled: !0,
            horizontal: !1,
            offset: 0,
            triggerOnce: !1
        }, h = {
            refresh: function() {
                return n.each(a, function(t, e) {
                    return e.refresh();
                });
            },
            viewportHeight: function() {
                var t;
                return null != (t = r.innerHeight) ? t : i.height();
            },
            aggregate: function(t) {
                var e, r, i;
                return e = s, t && (e = null != (i = a[n(t).data(u)]) ? i.waypoints : void 0), e ? (r = {
                    horizontal: [],
                    vertical: []
                }, n.each(r, function(t, i) {
                    return n.each(e[t], function(t, e) {
                        return i.push(e);
                    }), i.sort(function(t, e) {
                        return t.offset - e.offset;
                    }), r[t] = n.map(i, function(t) {
                        return t.element;
                    }), r[t] = n.unique(r[t]);
                }), r) : [];
            },
            above: function(t) {
                return null == t && (t = r), h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y;
                });
            },
            below: function(t) {
                return null == t && (t = r), h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y;
                });
            },
            left: function(t) {
                return null == t && (t = r), h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x;
                });
            },
            right: function(t) {
                return null == t && (t = r), h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x;
                });
            },
            enable: function() {
                return h._invoke("enable");
            },
            disable: function() {
                return h._invoke("disable");
            },
            destroy: function() {
                return h._invoke("destroy");
            },
            extendFn: function(t, e) {
                return d[t] = e;
            },
            _invoke: function(t) {
                var e;
                return e = n.extend({}, s.vertical, s.horizontal), n.each(e, function(e, n) {
                    return n[t](), !0;
                });
            },
            _filter: function(t, e, r) {
                var i, o;
                return (i = a[n(t).data(u)]) ? (o = [], n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) return o.push(e);
                }), o.sort(function(t, e) {
                    return t.offset - e.offset;
                }), n.map(o, function(t) {
                    return t.element;
                })) : [];
            }
        }, n[m] = function() {
            var t, n;
            return n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], 
            h[n] ? h[n].apply(null, t) : h.aggregate.call(null, n);
        }, n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        }, i.load(function() {
            return n[m]("refresh");
        });
    });
}.call(this), function(e) {
    "use strict";
    e.fn.counterUp = function(t) {
        var n = e.extend({
            time: 400,
            delay: 10
        }, t);
        return this.each(function() {
            var t = e(this), r = n;
            t.waypoint(function() {
                var e = [], n = r.time / r.delay, i = t.text(), s = /[0-9]+,[0-9]+/.test(i);
                i = i.replace(/,/g, "");
                /^[0-9]+$/.test(i);
                for (var u = /^[0-9]+\.[0-9]+$/.test(i), a = u ? (i.split(".")[1] || []).length : 0, f = n; 1 <= f; f--) {
                    var l = parseInt(i / n * f);
                    if (u && (l = parseFloat(i / n * f).toFixed(a)), s) for (;/(\d+)(\d{3})/.test(l.toString()); ) l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                    e.unshift(l);
                }
                t.data("counterup-nums", e), t.text("0");
                t.data("counterup-func", function() {
                    t.text(t.data("counterup-nums").shift()), t.data("counterup-nums").length ? setTimeout(t.data("counterup-func"), r.delay) : (t.data("counterup-nums"), 
                    t.data("counterup-nums", null), t.data("counterup-func", null));
                }), setTimeout(t.data("counterup-func"), r.delay);
            }, {
                offset: "100%",
                triggerOnce: !0
            });
        });
    };
}(jQuery);