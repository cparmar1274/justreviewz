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
            if (!o && a.browser.length > 0 && (!o || !this.length)) return "console" in window || (window.console = {}, 
            window.console.log = function(t) {
                return t;
            }), this.length || console.log("Animsition: Element does not exist on page."), o || console.log("Animsition: Does not support this browser."), 
            i.destroy.call(this);
            var e = i.optionCheck.call(this, a);
            return e && t("." + a.overlayClass).length <= 0 && i.addOverlay.call(this, a), a.loading && t("." + a.loadingClass).length <= 0 && i.addLoading.call(this, a), 
            this.each(function() {
                var o = this, e = t(this), s = t(window), r = t(document), l = e.data(n);
                l || (a = t.extend({}, a), e.data(n, {
                    options: a
                }), a.timeout && i.addTimer.call(o), a.onLoadEvent && s.on("load." + n, function() {
                    i.settings.timer && clearTimeout(i.settings.timer), i["in"].call(o);
                }), s.on("pageshow." + n, function(t) {
                    t.originalEvent.persisted && i["in"].call(o);
                }), s.on("unload." + n, function() {}), r.on("click." + n, a.linkElement, function(n) {
                    n.preventDefault();
                    var a = t(this), e = a.attr("href");
                    2 === n.which || n.metaKey || n.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && n.ctrlKey ? window.open(e, "_blank") : i.out.call(o, a, e);
                }));
            });
        },
        addOverlay: function(n) {
            t(n.overlayParentElement).prepend('<div class="' + n.overlayClass + '"></div>');
        },
        addLoading: function(n) {
            t(n.loadingParentElement).append('<div class="' + n.loadingClass + '">' + n.loadingInner + "</div>");
        },
        removeLoading: function() {
            var i = t(this), a = i.data(n).options, o = t(a.loadingParentElement).children("." + a.loadingClass);
            o.fadeOut().remove();
        },
        addTimer: function() {
            var a = this, o = t(this), e = o.data(n).options;
            i.settings.timer = setTimeout(function() {
                i["in"].call(a), t(window).off("load." + n);
            }, e.timeoutCountdown);
        },
        supportCheck: function(n) {
            var i = t(this), a = n.browser, o = a.length, e = !1;
            0 === o && (e = !0);
            for (var s = 0; o > s; s++) if ("string" == typeof i.css(a[s])) {
                e = !0;
                break;
            }
            return e;
        },
        optionCheck: function(n) {
            var a, o = t(this);
            return a = n.overlay || o.data(i.settings.data.overlay) ? !0 : !1;
        },
        animationCheck: function(i, a, o) {
            var e = t(this), s = e.data(n).options, r = typeof i, l = !a && "number" === r, d = a && "string" === r && i.length > 0;
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
            var e = this, s = t(this), r = s.data(n).options, l = a.data(i.settings.data.outClass), d = s.data(i.settings.data.outClass), u = a.data(i.settings.data.outDuration), c = s.data(i.settings.data.outDuration), m = l ? l : d, g = u ? u : c, f = i.animationCheck.call(e, m, !0, !1), v = i.animationCheck.call(e, g, !1, !1), h = i.optionCheck.call(e, r);
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
            var s = this, r = t(this), l = r.data(n).options, d = r.data(i.settings.data.inClass), u = i.animationCheck.call(s, d, !0, !0);
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
});

http: Exception: (function() {
    var defaultOptions = {
        frameRate: 150,
        animationTime: 400,
        stepSize: 100,
        pulseAlgorithm: true,
        pulseScale: 4,
        pulseNormalize: 1,
        accelerationDelta: 50,
        accelerationMax: 3,
        keyboardSupport: true,
        arrowScroll: 50,
        touchpadSupport: false,
        fixedBackground: true,
        excluded: ""
    };
    var options = defaultOptions;
    var isExcluded = false;
    var isFrame = false;
    var direction = {
        x: 0,
        y: 0
    };
    var initDone = false;
    var root = document.documentElement;
    var activeElement;
    var observer;
    var refreshSize;
    var deltaBuffer = [];
    var isMac = /^Mac/.test(navigator.platform);
    var key = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        spacebar: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36
    };
    var arrowKeys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };
    function initTest() {
        if (options.keyboardSupport) {
            addEvent("keydown", keydown);
        }
    }
    function init() {
        if (initDone || !document.body) return;
        initDone = true;
        var body = document.body;
        var html = document.documentElement;
        var windowHeight = window.innerHeight;
        var scrollHeight = body.scrollHeight;
        root = document.compatMode.indexOf("CSS") >= 0 ? html : body;
        activeElement = body;
        initTest();
        if (top != self) {
            isFrame = true;
        } else if (scrollHeight > windowHeight && (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)) {
            var fullPageElem = document.createElement("div");
            fullPageElem.style.cssText = "position:absolute; z-index:-10000; " + "top:0; left:0; right:0; height:" + root.scrollHeight + "px";
            document.body.appendChild(fullPageElem);
            var pendingRefresh;
            refreshSize = function() {
                if (pendingRefresh) return;
                pendingRefresh = setTimeout(function() {
                    if (isExcluded) return;
                    fullPageElem.style.height = "0";
                    fullPageElem.style.height = root.scrollHeight + "px";
                    pendingRefresh = null;
                }, 500);
            };
            setTimeout(refreshSize, 10);
            addEvent("resize", refreshSize);
            var config = {
                attributes: true,
                childList: true,
                characterData: false
            };
            observer = new MutationObserver(refreshSize);
            observer.observe(body, config);
            if (root.offsetHeight <= windowHeight) {
                var clearfix = document.createElement("div");
                clearfix.style.clear = "both";
                body.appendChild(clearfix);
            }
        }
        if (!options.fixedBackground && !isExcluded) {
            body.style.backgroundAttachment = "scroll";
            html.style.backgroundAttachment = "scroll";
        }
    }
    function cleanup() {
        observer && observer.disconnect();
        removeEvent(wheelEvent, wheel);
        removeEvent("mousedown", mousedown);
        removeEvent("keydown", keydown);
        removeEvent("resize", refreshSize);
        removeEvent("load", init);
    }
    var que = [];
    var pending = false;
    var lastScroll = Date.now();
    function scrollArray(elem, left, top) {
        directionCheck(left, top);
        if (options.accelerationMax != 1) {
            var now = Date.now();
            var elapsed = now - lastScroll;
            if (elapsed < options.accelerationDelta) {
                var factor = (1 + 50 / elapsed) / 2;
                if (factor > 1) {
                    factor = Math.min(factor, options.accelerationMax);
                    left *= factor;
                    top *= factor;
                }
            }
            lastScroll = Date.now();
        }
        que.push({
            x: left,
            y: top,
            lastX: left < 0 ? .99 : -.99,
            lastY: top < 0 ? .99 : -.99,
            start: Date.now()
        });
        if (pending) {
            return;
        }
        var scrollWindow = elem === document.body;
        var step = function(time) {
            var now = Date.now();
            var scrollX = 0;
            var scrollY = 0;
            for (var i = 0; i < que.length; i++) {
                var item = que[i];
                var elapsed = now - item.start;
                var finished = elapsed >= options.animationTime;
                var position = finished ? 1 : elapsed / options.animationTime;
                if (options.pulseAlgorithm) {
                    position = pulse(position);
                }
                var x = item.x * position - item.lastX >> 0;
                var y = item.y * position - item.lastY >> 0;
                scrollX += x;
                scrollY += y;
                item.lastX += x;
                item.lastY += y;
                if (finished) {
                    que.splice(i, 1);
                    i--;
                }
            }
            if (scrollWindow) {
                window.scrollBy(scrollX, scrollY);
            } else {
                if (scrollX) elem.scrollLeft += scrollX;
                if (scrollY) elem.scrollTop += scrollY;
            }
            if (!left && !top) {
                que = [];
            }
            if (que.length) {
                requestFrame(step, elem, 1e3 / options.frameRate + 1);
            } else {
                pending = false;
            }
        };
        requestFrame(step, elem, 0);
        pending = true;
    }
    function wheel(event) {
        if (!initDone) {
            init();
        }
        var target = event.target;
        var overflowing = overflowingAncestor(target);
        if (!overflowing || event.defaultPrevented || event.ctrlKey) {
            return true;
        }
        if (isNodeName(activeElement, "embed") || isNodeName(target, "embed") && /\.pdf/i.test(target.src) || isNodeName(activeElement, "object") || target.shadowRoot) {
            return true;
        }
        var deltaX = -event.wheelDeltaX || event.deltaX || 0;
        var deltaY = -event.wheelDeltaY || event.deltaY || 0;
        if (isMac) {
            if (event.wheelDeltaX && isDivisible(event.wheelDeltaX, 120)) {
                deltaX = -120 * (event.wheelDeltaX / Math.abs(event.wheelDeltaX));
            }
            if (event.wheelDeltaY && isDivisible(event.wheelDeltaY, 120)) {
                deltaY = -120 * (event.wheelDeltaY / Math.abs(event.wheelDeltaY));
            }
        }
        if (!deltaX && !deltaY) {
            deltaY = -event.wheelDelta || 0;
        }
        if (event.deltaMode === 1) {
            deltaX *= 40;
            deltaY *= 40;
        }
        if (!options.touchpadSupport && isTouchpad(deltaY)) {
            return true;
        }
        if (Math.abs(deltaX) > 1.2) {
            deltaX *= options.stepSize / 120;
        }
        if (Math.abs(deltaY) > 1.2) {
            deltaY *= options.stepSize / 120;
        }
        scrollArray(overflowing, deltaX, deltaY);
        event.preventDefault();
        scheduleClearCache();
    }
    function keydown(event) {
        var target = event.target;
        var modifier = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey && event.keyCode !== key.spacebar;
        if (!document.body.contains(activeElement)) {
            activeElement = document.activeElement;
        }
        var inputNodeNames = /^(textarea|select|embed|object)$/i;
        var buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (event.defaultPrevented || inputNodeNames.test(target.nodeName) || isNodeName(target, "input") && !buttonTypes.test(target.type) || isNodeName(activeElement, "video") || isInsideYoutubeVideo(event) || target.isContentEditable || modifier) {
            return true;
        }
        if ((isNodeName(target, "button") || isNodeName(target, "input") && buttonTypes.test(target.type)) && event.keyCode === key.spacebar) {
            return true;
        }
        if (isNodeName(target, "input") && target.type == "radio" && arrowKeys[event.keyCode]) {
            return true;
        }
        var shift, x = 0, y = 0;
        var elem = overflowingAncestor(activeElement);
        var clientHeight = elem.clientHeight;
        if (elem == document.body) {
            clientHeight = window.innerHeight;
        }
        switch (event.keyCode) {
          case key.up:
            y = -options.arrowScroll;
            break;

          case key.down:
            y = options.arrowScroll;
            break;

          case key.spacebar:
            shift = event.shiftKey ? 1 : -1;
            y = -shift * clientHeight * .9;
            break;

          case key.pageup:
            y = -clientHeight * .9;
            break;

          case key.pagedown:
            y = clientHeight * .9;
            break;

          case key.home:
            y = -elem.scrollTop;
            break;

          case key.end:
            var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
            y = damt > 0 ? damt + 10 : 0;
            break;

          case key.left:
            x = -options.arrowScroll;
            break;

          case key.right:
            x = options.arrowScroll;
            break;

          default:
            return true;
        }
        scrollArray(elem, x, y);
        event.preventDefault();
        scheduleClearCache();
    }
    function mousedown(event) {
        activeElement = event.target;
    }
    var uniqueID = function() {
        var i = 0;
        return function(el) {
            return el.uniqueID || (el.uniqueID = i++);
        };
    }();
    var cache = {};
    var clearCacheTimer;
    function scheduleClearCache() {
        clearTimeout(clearCacheTimer);
        clearCacheTimer = setInterval(function() {
            cache = {};
        }, 1 * 1e3);
    }
    function setCache(elems, overflowing) {
        for (var i = elems.length; i--; ) cache[uniqueID(elems[i])] = overflowing;
        return overflowing;
    }
    function overflowingAncestor(el) {
        var elems = [];
        var body = document.body;
        var rootScrollHeight = root.scrollHeight;
        do {
            var cached = cache[uniqueID(el)];
            if (cached) {
                return setCache(elems, cached);
            }
            elems.push(el);
            if (rootScrollHeight === el.scrollHeight) {
                var topOverflowsNotHidden = overflowNotHidden(root) && overflowNotHidden(body);
                var isOverflowCSS = topOverflowsNotHidden || overflowAutoOrScroll(root);
                if (isFrame && isContentOverflowing(root) || !isFrame && isOverflowCSS) {
                    return setCache(elems, getScrollRoot());
                }
            } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) {
                return setCache(elems, el);
            }
        } while (el = el.parentElement);
    }
    function isContentOverflowing(el) {
        return el.clientHeight + 10 < el.scrollHeight;
    }
    function overflowNotHidden(el) {
        var overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
        return overflow !== "hidden";
    }
    function overflowAutoOrScroll(el) {
        var overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
        return overflow === "scroll" || overflow === "auto";
    }
    function addEvent(type, fn) {
        window.addEventListener(type, fn, false);
    }
    function removeEvent(type, fn) {
        window.removeEventListener(type, fn, false);
    }
    function isNodeName(el, tag) {
        return (el.nodeName || "").toLowerCase() === tag.toLowerCase();
    }
    function directionCheck(x, y) {
        x = x > 0 ? 1 : -1;
        y = y > 0 ? 1 : -1;
        if (direction.x !== x || direction.y !== y) {
            direction.x = x;
            direction.y = y;
            que = [];
            lastScroll = 0;
        }
    }
    var deltaBufferTimer;
    if (window.localStorage && localStorage.SS_deltaBuffer) {
        deltaBuffer = localStorage.SS_deltaBuffer.split(",");
    }
    function isTouchpad(deltaY) {
        if (!deltaY) return;
        if (!deltaBuffer.length) {
            deltaBuffer = [ deltaY, deltaY, deltaY ];
        }
        deltaY = Math.abs(deltaY);
        deltaBuffer.push(deltaY);
        deltaBuffer.shift();
        clearTimeout(deltaBufferTimer);
        deltaBufferTimer = setTimeout(function() {
            if (window.localStorage) {
                localStorage.SS_deltaBuffer = deltaBuffer.join(",");
            }
        }, 1e3);
        return !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100);
    }
    function isDivisible(n, divisor) {
        return Math.floor(n / divisor) == n / divisor;
    }
    function allDeltasDivisableBy(divisor) {
        return isDivisible(deltaBuffer[0], divisor) && isDivisible(deltaBuffer[1], divisor) && isDivisible(deltaBuffer[2], divisor);
    }
    function isInsideYoutubeVideo(event) {
        var elem = event.target;
        var isControl = false;
        if (document.URL.indexOf("www.youtube.com/watch") != -1) {
            do {
                isControl = elem.classList && elem.classList.contains("html5-video-controls");
                if (isControl) break;
            } while (elem = elem.parentNode);
        }
        return isControl;
    }
    var requestFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback, element, delay) {
            window.setTimeout(callback, delay || 1e3 / 60);
        };
    }();
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var getScrollRoot = function() {
        var SCROLL_ROOT;
        return function() {
            if (!SCROLL_ROOT) {
                var dummy = document.createElement("div");
                dummy.style.cssText = "height:10000px;width:1px;";
                document.body.appendChild(dummy);
                var bodyScrollTop = document.body.scrollTop;
                var docElScrollTop = document.documentElement.scrollTop;
                window.scrollBy(0, 3);
                if (document.body.scrollTop != bodyScrollTop) SCROLL_ROOT = document.body; else SCROLL_ROOT = document.documentElement;
                window.scrollBy(0, -3);
                document.body.removeChild(dummy);
            }
            return SCROLL_ROOT;
        };
    }();
    function pulse_(x) {
        var val, start, expx;
        x = x * options.pulseScale;
        if (x < 1) {
            val = x - (1 - Math.exp(-x));
        } else {
            start = Math.exp(-1);
            x -= 1;
            expx = 1 - Math.exp(-x);
            val = start + expx * (1 - start);
        }
        return val * options.pulseNormalize;
    }
    function pulse(x) {
        if (x >= 1) return 1;
        if (x <= 0) return 0;
        if (options.pulseNormalize == 1) {
            options.pulseNormalize /= pulse_(1);
        }
        return pulse_(x);
    }
    var userAgent = window.navigator.userAgent;
    var isEdge = /Edge/.test(userAgent);
    var isChrome = /chrome/i.test(userAgent) && !isEdge;
    var isSafari = /safari/i.test(userAgent) && !isEdge;
    var isMobile = /mobile/i.test(userAgent);
    var isIEWin7 = /Windows NT 6.1/i.test(userAgent) && /rv:11/i.test(userAgent);
    var isEnabledForBrowser = (isChrome || isSafari || isIEWin7) && !isMobile;
    var wheelEvent;
    if ("onwheel" in document.createElement("div")) wheelEvent = "wheel"; else if ("onmousewheel" in document.createElement("div")) wheelEvent = "mousewheel";
    if (wheelEvent && isEnabledForBrowser) {
        addEvent(wheelEvent, wheel);
        addEvent("mousedown", mousedown);
        addEvent("load", init);
    }
    function SmoothScroll(optionsToSet) {
        for (var key in optionsToSet) if (defaultOptions.hasOwnProperty(key)) options[key] = optionsToSet[key];
    }
    SmoothScroll.destroy = cleanup;
    if (window.SmoothScrollOptions) SmoothScroll(window.SmoothScrollOptions);
    if (typeof define === "function" && define.amd) define(function() {
        return SmoothScroll;
    }); else if ("object" == typeof exports) module.exports = SmoothScroll; else window.SmoothScroll = SmoothScroll;
})();

(function() {
    var a, b, c, d, e, f = function(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    }, g = [].indexOf || function(a) {
        for (var b = 0, c = this.length; c > b; b++) if (b in this && this[b] === a) return b;
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
            return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), 
            e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), 
            e.eventType = a) : e.eventName = a, e;
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
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d) if (c = f[b], c === a) return this.values[b];
        }, a.prototype.set = function(a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e) if (d = g[c], d === a) return void (this.values[c] = b);
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
                for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, 
                c = d.length; c > a; a++) b = d[a], e.push(b);
                return e;
            }.call(this), this.all = function() {
                var a, c, d, e;
                for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                return e;
            }.call(this), this.boxes.length) if (this.disabled()) this.resetStyle(); else for (e = this.boxes, 
            c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), 
            this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), 
            this.config.live ? new a(function(a) {
                return function(b) {
                    var c, d, e, f, g;
                    for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function() {
                        var a, b, c, d;
                        for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], 
                        d.push(this.doSync(e));
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
                for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), 
                f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), 
                this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), 
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
            var c, d, e;
            return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), 
            e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
                return function() {
                    return f.customStyle(a, b, d, c, e);
                };
            }(this));
        }, e.prototype.animate = function() {
            return "requestAnimationFrame" in window ? function(a) {
                return window.requestAnimationFrame(a);
            } : function(a) {
                return a();
            };
        }(), e.prototype.resetStyle = function() {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
            return e;
        }, e.prototype.resetAnimation = function(a) {
            var b;
            return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, 
            b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0;
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
            d = [];
            for (c in b) e = b[c], a["" + c] = e, d.push(function() {
                var b, d, g, h;
                for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                return h;
            }.call(this));
            return d;
        }, e.prototype.vendorCSS = function(a, b) {
            var c, e, f, g, h, i;
            for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], 
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
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e;
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop();
        }, e.prototype.offsetTop = function(a) {
            for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
            for (b = a.offsetTop; a = a.offsetParent; ) b += a.offsetTop;
            return b;
        }, e.prototype.isVisible = function(a) {
            var b, c, d, e, f;
            return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, 
            e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), 
            b = d + a.clientHeight, e >= d && b >= f;
        }, e.prototype.util = function() {
            return null != this._util ? this._util : this._util = new b();
        }, e.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent);
        }, e;
    }();
}).call(this);

!function(t) {
    t.fn.countdown = function(e, n) {
        function o() {
            var t = new Date(r.date), e = s(), o = t - e;
            if (0 > o) return clearInterval(d), void (n && "function" == typeof n && n());
            var a = 1e3, f = 60 * a, u = 60 * f, l = 24 * u, c = Math.floor(o / l), h = Math.floor(o % l / u), x = Math.floor(o % u / f), g = Math.floor(o % f / a), y = 1 === c ? r.day : r.days, m = 1 === h ? r.hour : r.hours, v = 1 === x ? r.minute : r.minutes, D = 1 === g ? r.second : r.seconds;
            c = String(c).length >= 2 ? c : "0" + c, h = String(h).length >= 2 ? h : "0" + h, 
            x = String(x).length >= 2 ? x : "0" + x, g = String(g).length >= 2 ? g : "0" + g, 
            i.find(".days").text(c), i.find(".hours").text(h), i.find(".minutes").text(x), i.find(".seconds").text(g), 
            i.find(".days_text").text(y), i.find(".hours_text").text(m), i.find(".minutes_text").text(v), 
            i.find(".seconds_text").text(D);
        }
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
            var t = new Date(), e = t.getTime() + 6e4 * t.getTimezoneOffset(), n = new Date(e + 36e5 * r.offset);
            return n;
        }, d = setInterval(o, 1e3);
    };
}(jQuery);

"function" !== typeof Object.create && (Object.create = function(f) {
    function g() {}
    g.prototype = f;
    return new g();
});

(function(f, g, k) {
    var l = {
        init: function(a, b) {
            this.$elem = f(b);
            this.options = f.extend({}, f.fn.owlCarousel.options, this.$elem.data(), a);
            this.userOptions = a;
            this.loadContent();
        },
        loadContent: function() {
            function a(a) {
                var d, e = "";
                if ("function" === typeof b.options.jsonSuccess) b.options.jsonSuccess.apply(this, [ a ]); else {
                    for (d in a.owl) a.owl.hasOwnProperty(d) && (e += a.owl[d].item);
                    b.$elem.html(e);
                }
                b.logIn();
            }
            var b = this, e;
            "function" === typeof b.options.beforeInit && b.options.beforeInit.apply(this, [ b.$elem ]);
            "string" === typeof b.options.jsonPath ? (e = b.options.jsonPath, f.getJSON(e, a)) : b.logIn();
        },
        logIn: function() {
            this.$elem.data("owl-originalStyles", this.$elem.attr("style"));
            this.$elem.data("owl-originalClasses", this.$elem.attr("class"));
            this.$elem.css({
                opacity: 0
            });
            this.orignalItems = this.options.items;
            this.checkBrowser();
            this.wrapperWidth = 0;
            this.checkVisible = null;
            this.setVars();
        },
        setVars: function() {
            if (0 === this.$elem.children().length) return !1;
            this.baseClass();
            this.eventTypes();
            this.$userItems = this.$elem.children();
            this.itemsAmount = this.$userItems.length;
            this.wrapItems();
            this.$owlItems = this.$elem.find(".owl-item");
            this.$owlWrapper = this.$elem.find(".owl-wrapper");
            this.playDirection = "next";
            this.prevItem = 0;
            this.prevArr = [ 0 ];
            this.currentItem = 0;
            this.customEvents();
            this.onStartup();
        },
        onStartup: function() {
            this.updateItems();
            this.calculateAll();
            this.buildControls();
            this.updateControls();
            this.response();
            this.moveEvents();
            this.stopOnHover();
            this.owlStatus();
            !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle);
            !0 === this.options.autoPlay && (this.options.autoPlay = 5e3);
            this.play();
            this.$elem.find(".owl-wrapper").css("display", "block");
            this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility();
            this.onstartup = !1;
            this.eachMoveUpdate();
            "function" === typeof this.options.afterInit && this.options.afterInit.apply(this, [ this.$elem ]);
        },
        eachMoveUpdate: function() {
            !0 === this.options.lazyLoad && this.lazyLoad();
            !0 === this.options.autoHeight && this.autoHeight();
            this.onVisibleItems();
            "function" === typeof this.options.afterAction && this.options.afterAction.apply(this, [ this.$elem ]);
        },
        updateVars: function() {
            "function" === typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [ this.$elem ]);
            this.watchVisibility();
            this.updateItems();
            this.calculateAll();
            this.updatePosition();
            this.updateControls();
            this.eachMoveUpdate();
            "function" === typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [ this.$elem ]);
        },
        reload: function() {
            var a = this;
            g.setTimeout(function() {
                a.updateVars();
            }, 0);
        },
        watchVisibility: function() {
            var a = this;
            if (!1 === a.$elem.is(":visible")) a.$elem.css({
                opacity: 0
            }), g.clearInterval(a.autoPlayInterval), g.clearInterval(a.checkVisible); else return !1;
            a.checkVisible = g.setInterval(function() {
                a.$elem.is(":visible") && (a.reload(), a.$elem.animate({
                    opacity: 1
                }, 200), g.clearInterval(a.checkVisible));
            }, 500);
        },
        wrapItems: function() {
            this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');
            this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
            this.wrapperOuter = this.$elem.find(".owl-wrapper-outer");
            this.$elem.css("display", "block");
        },
        baseClass: function() {
            var a = this.$elem.hasClass(this.options.baseClass), b = this.$elem.hasClass(this.options.theme);
            a || this.$elem.addClass(this.options.baseClass);
            b || this.$elem.addClass(this.options.theme);
        },
        updateItems: function() {
            var a, b;
            if (!1 === this.options.responsive) return !1;
            if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, 
            this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, 
            this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
            a = f(this.options.responsiveBaseWidth).width();
            a > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems);
            if (!1 !== this.options.itemsCustom) for (this.options.itemsCustom.sort(function(a, b) {
                return a[0] - b[0];
            }), b = 0; b < this.options.itemsCustom.length; b += 1) this.options.itemsCustom[b][0] <= a && (this.options.items = this.options.itemsCustom[b][1]); else a <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]), 
            a <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), 
            a <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), 
            a <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), 
            a <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
            this.options.items > this.itemsAmount && !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount);
        },
        response: function() {
            var a = this, b, e;
            if (!0 !== a.options.responsive) return !1;
            e = f(g).width();
            a.resizer = function() {
                f(g).width() !== e && (!1 !== a.options.autoPlay && g.clearInterval(a.autoPlayInterval), 
                g.clearTimeout(b), b = g.setTimeout(function() {
                    e = f(g).width();
                    a.updateVars();
                }, a.options.responsiveRefreshRate));
            };
            f(g).resize(a.resizer);
        },
        updatePosition: function() {
            this.jumpTo(this.currentItem);
            !1 !== this.options.autoPlay && this.checkAp();
        },
        appendItemsSizes: function() {
            var a = this, b = 0, e = a.itemsAmount - a.options.items;
            a.$owlItems.each(function(c) {
                var d = f(this);
                d.css({
                    width: a.itemWidth
                }).data("owl-item", Number(c));
                if (0 === c % a.options.items || c === e) c > e || (b += 1);
                d.data("owl-roundPages", b);
            });
        },
        appendWrapperSizes: function() {
            this.$owlWrapper.css({
                width: this.$owlItems.length * this.itemWidth * 2,
                left: 0
            });
            this.appendItemsSizes();
        },
        calculateAll: function() {
            this.calculateWidth();
            this.appendWrapperSizes();
            this.loops();
            this.max();
        },
        calculateWidth: function() {
            this.itemWidth = Math.round(this.$elem.width() / this.options.items);
        },
        max: function() {
            var a = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
            this.options.items > this.itemsAmount ? this.maximumPixels = a = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, 
            this.maximumPixels = a);
            return a;
        },
        min: function() {
            return 0;
        },
        loops: function() {
            var a = 0, b = 0, e, c;
            this.positionsInArray = [ 0 ];
            this.pagesInArray = [];
            for (e = 0; e < this.itemsAmount; e += 1) b += this.itemWidth, this.positionsInArray.push(-b), 
            !0 === this.options.scrollPerPage && (c = f(this.$owlItems[e]), c = c.data("owl-roundPages"), 
            c !== a && (this.pagesInArray[a] = this.positionsInArray[e], a = c));
        },
        buildControls: function() {
            if (!0 === this.options.navigation || !0 === this.options.pagination) this.owlControls = f('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem);
            !0 === this.options.pagination && this.buildPagination();
            !0 === this.options.navigation && this.buildButtons();
        },
        buildButtons: function() {
            var a = this, b = f('<div class="owl-buttons"/>');
            a.owlControls.append(b);
            a.buttonPrev = f("<div/>", {
                class: "owl-prev",
                html: a.options.navigationText[0] || ""
            });
            a.buttonNext = f("<div/>", {
                class: "owl-next",
                html: a.options.navigationText[1] || ""
            });
            b.append(a.buttonPrev).append(a.buttonNext);
            b.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(a) {
                a.preventDefault();
            });
            b.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(b) {
                b.preventDefault();
                f(this).hasClass("owl-next") ? a.next() : a.prev();
            });
        },
        buildPagination: function() {
            var a = this;
            a.paginationWrapper = f('<div class="owl-pagination"/>');
            a.owlControls.append(a.paginationWrapper);
            a.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(b) {
                b.preventDefault();
                Number(f(this).data("owl-page")) !== a.currentItem && a.goTo(Number(f(this).data("owl-page")), !0);
            });
        },
        updatePagination: function() {
            var a, b, e, c, d, g;
            if (!1 === this.options.pagination) return !1;
            this.paginationWrapper.html("");
            a = 0;
            b = this.itemsAmount - this.itemsAmount % this.options.items;
            for (c = 0; c < this.itemsAmount; c += 1) 0 === c % this.options.items && (a += 1, 
            b === c && (e = this.itemsAmount - this.options.items), d = f("<div/>", {
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
            this.updatePagination();
            this.checkNavigation();
            this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show());
        },
        destroyControls: function() {
            this.owlControls && this.owlControls.remove();
        },
        next: function(a) {
            if (this.isTransition) return !1;
            this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1;
            if (this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0)) if (!0 === this.options.rewindNav) this.currentItem = 0, 
            a = "rewind"; else return this.currentItem = this.maximumItem, !1;
            this.goTo(this.currentItem, a);
        },
        prev: function(a) {
            if (this.isTransition) return !1;
            this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ? this.options.items : 1);
            if (0 > this.currentItem) if (!0 === this.options.rewindNav) this.currentItem = this.maximumItem, 
            a = "rewind"; else return this.currentItem = 0, !1;
            this.goTo(this.currentItem, a);
        },
        goTo: function(a, b, e) {
            var c = this;
            if (c.isTransition) return !1;
            "function" === typeof c.options.beforeMove && c.options.beforeMove.apply(this, [ c.$elem ]);
            a >= c.maximumItem ? a = c.maximumItem : 0 >= a && (a = 0);
            c.currentItem = c.owl.currentItem = a;
            if (!1 !== c.options.transitionStyle && "drag" !== e && 1 === c.options.items && !0 === c.browser.support3d) return c.swapSpeed(0), 
            !0 === c.browser.support3d ? c.transition3d(c.positionsInArray[a]) : c.css2slide(c.positionsInArray[a], 1), 
            c.afterGo(), c.singleItemTransition(), !1;
            a = c.positionsInArray[a];
            !0 === c.browser.support3d ? (c.isCss3Finish = !1, !0 === b ? (c.swapSpeed("paginationSpeed"), 
            g.setTimeout(function() {
                c.isCss3Finish = !0;
            }, c.options.paginationSpeed)) : "rewind" === b ? (c.swapSpeed(c.options.rewindSpeed), 
            g.setTimeout(function() {
                c.isCss3Finish = !0;
            }, c.options.rewindSpeed)) : (c.swapSpeed("slideSpeed"), g.setTimeout(function() {
                c.isCss3Finish = !0;
            }, c.options.slideSpeed)), c.transition3d(a)) : !0 === b ? c.css2slide(a, c.options.paginationSpeed) : "rewind" === b ? c.css2slide(a, c.options.rewindSpeed) : c.css2slide(a, c.options.slideSpeed);
            c.afterGo();
        },
        jumpTo: function(a) {
            "function" === typeof this.options.beforeMove && this.options.beforeMove.apply(this, [ this.$elem ]);
            a >= this.maximumItem || -1 === a ? a = this.maximumItem : 0 >= a && (a = 0);
            this.swapSpeed(0);
            !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[a]) : this.css2slide(this.positionsInArray[a], 1);
            this.currentItem = this.owl.currentItem = a;
            this.afterGo();
        },
        afterGo: function() {
            this.prevArr.push(this.currentItem);
            this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2];
            this.prevArr.shift(0);
            this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), 
            this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp());
            "function" === typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [ this.$elem ]);
        },
        stop: function() {
            this.apStatus = "stop";
            g.clearInterval(this.autoPlayInterval);
        },
        checkAp: function() {
            "stop" !== this.apStatus && this.play();
        },
        play: function() {
            var a = this;
            a.apStatus = "play";
            if (!1 === a.options.autoPlay) return !1;
            g.clearInterval(a.autoPlayInterval);
            a.autoPlayInterval = g.setInterval(function() {
                a.next(!0);
            }, a.options.autoPlay);
        },
        swapSpeed: function(a) {
            "slideSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" !== typeof a && this.$owlWrapper.css(this.addCssSpeed(a));
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
            e.isCssFinish = !1;
            e.$owlWrapper.stop(!0, !0).animate({
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
            a.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
            a = a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);
            this.browser = {
                support3d: null !== a && 1 === a.length,
                isTouch: "ontouchstart" in g || g.navigator.msMaxTouchPoints
            };
        },
        moveEvents: function() {
            if (!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) this.gestures(), 
            this.disabledEvents();
        },
        eventTypes: function() {
            var a = [ "s", "e", "x" ];
            this.ev_types = {};
            !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = [ "touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl" ] : !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = [ "touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl" ] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (a = [ "mousedown.owl", "mousemove.owl", "mouseup.owl" ]);
            this.ev_types.start = a[0];
            this.ev_types.move = a[1];
            this.ev_types.end = a[2];
        },
        disabledEvents: function() {
            this.$elem.on("dragstart.owl", function(a) {
                a.preventDefault();
            });
            this.$elem.on("mousedown.disableTextSelect", function(a) {
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
                b = b.originalEvent || b || g.event;
                d.newPosX = a(b).x - h.offsetX;
                d.newPosY = a(b).y - h.offsetY;
                d.newRelativeX = d.newPosX - h.relativePos;
                "function" === typeof d.options.startDragging && !0 !== h.dragging && 0 !== d.newRelativeX && (h.dragging = !0, 
                d.options.startDragging.apply(d, [ d.$elem ]));
                (8 < d.newRelativeX || -8 > d.newRelativeX) && !0 === d.browser.isTouch && (void 0 !== b.preventDefault ? b.preventDefault() : b.returnValue = !1, 
                h.sliding = !0);
                (10 < d.newPosY || -10 > d.newPosY) && !1 === h.sliding && f(k).off("touchmove.owl");
                d.newPosX = Math.max(Math.min(d.newPosX, d.newRelativeX / 5), d.maximumPixels + d.newRelativeX / 5);
                !0 === d.browser.support3d ? d.transition3d(d.newPosX) : d.css2move(d.newPosX);
            }
            function c(a) {
                a = a.originalEvent || a || g.event;
                var c;
                a.target = a.target || a.srcElement;
                h.dragging = !1;
                !0 !== d.browser.isTouch && d.$owlWrapper.removeClass("grabbing");
                d.dragDirection = 0 > d.newRelativeX ? d.owl.dragDirection = "left" : d.owl.dragDirection = "right";
                0 !== d.newRelativeX && (c = d.getNewPosition(), d.goTo(c, !1, "drag"), h.targetElement === a.target && !0 !== d.browser.isTouch && (f(a.target).on("click.disable", function(a) {
                    a.stopImmediatePropagation();
                    a.stopPropagation();
                    a.preventDefault();
                    f(a.target).off("click.disable");
                }), a = f._data(a.target, "events").click, c = a.pop(), a.splice(0, 0, c)));
                b("off");
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
            d.isCssFinish = !0;
            d.$elem.on(d.ev_types.start, ".owl-wrapper", function(c) {
                c = c.originalEvent || c || g.event;
                var e;
                if (3 === c.which) return !1;
                if (!(d.itemsAmount <= d.options.items)) {
                    if (!1 === d.isCssFinish && !d.options.dragBeforeAnimFinish || !1 === d.isCss3Finish && !d.options.dragBeforeAnimFinish) return !1;
                    !1 !== d.options.autoPlay && g.clearInterval(d.autoPlayInterval);
                    !0 === d.browser.isTouch || d.$owlWrapper.hasClass("grabbing") || d.$owlWrapper.addClass("grabbing");
                    d.newPosX = 0;
                    d.newRelativeX = 0;
                    f(this).css(d.removeTransition());
                    e = f(this).position();
                    h.relativePos = e.left;
                    h.offsetX = a(c).x - e.left;
                    h.offsetY = a(c).y - e.top;
                    b("on");
                    h.sliding = !1;
                    h.targetElement = c.target || c.srcElement;
                }
            });
        },
        getNewPosition: function() {
            var a = this.closestItem();
            a > this.maximumItem ? a = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem = a = 0);
            return a;
        },
        closestItem: function() {
            var a = this, b = !0 === a.options.scrollPerPage ? a.pagesInArray : a.positionsInArray, e = a.newPosX, c = null;
            f.each(b, function(d, g) {
                e - a.itemWidth / 20 > b[d + 1] && e - a.itemWidth / 20 < g && "left" === a.moveDirection() ? (c = g, 
                a.currentItem = !0 === a.options.scrollPerPage ? f.inArray(c, a.positionsInArray) : d) : e + a.itemWidth / 20 < g && e + a.itemWidth / 20 > (b[d + 1] || b[d] - a.itemWidth) && "right" === a.moveDirection() && (!0 === a.options.scrollPerPage ? (c = b[d + 1] || b[b.length - 1], 
                a.currentItem = f.inArray(c, a.positionsInArray)) : (c = b[d + 1], a.currentItem = d + 1));
            });
            return a.currentItem;
        },
        moveDirection: function() {
            var a;
            0 > this.newRelativeX ? (a = "right", this.playDirection = "next") : (a = "left", 
            this.playDirection = "prev");
            return a;
        },
        customEvents: function() {
            var a = this;
            a.$elem.on("owl.next", function() {
                a.next();
            });
            a.$elem.on("owl.prev", function() {
                a.prev();
            });
            a.$elem.on("owl.play", function(b, e) {
                a.options.autoPlay = e;
                a.play();
                a.hoverStatus = "play";
            });
            a.$elem.on("owl.stop", function() {
                a.stop();
                a.hoverStatus = "stop";
            });
            a.$elem.on("owl.goTo", function(b, e) {
                a.goTo(e);
            });
            a.$elem.on("owl.jumpTo", function(b, e) {
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
            var a, b, e, c, d;
            if (!1 === this.options.lazyLoad) return !1;
            for (a = 0; a < this.itemsAmount; a += 1) b = f(this.$owlItems[a]), "loaded" !== b.data("owl-loaded") && (e = b.data("owl-item"), 
            c = b.find(".lazyOwl"), "string" !== typeof c.data("src") ? b.data("owl-loaded", "loaded") : (void 0 === b.data("owl-loaded") && (c.hide(), 
            b.addClass("loading").data("owl-loaded", "checked")), (d = !0 === this.options.lazyFollow ? e >= this.currentItem : !0) && e < this.currentItem + this.options.items && c.length && this.lazyPreload(b, c)));
        },
        lazyPreload: function(a, b) {
            function e() {
                a.data("owl-loaded", "loaded").removeClass("loading");
                b.removeAttr("data-src");
                "fade" === d.options.lazyEffect ? b.fadeIn(400) : b.show();
                "function" === typeof d.options.afterLazyLoad && d.options.afterLazyLoad.apply(this, [ d.$elem ]);
            }
            function c() {
                f += 1;
                d.completeImg(b.get(0)) || !0 === k ? e() : 100 >= f ? g.setTimeout(c, 100) : e();
            }
            var d = this, f = 0, k;
            "DIV" === b.prop("tagName") ? (b.css("background-image", "url(" + b.data("src") + ")"), 
            k = !0) : b[0].src = b.data("src");
            c();
        },
        autoHeight: function() {
            function a() {
                var a = f(e.$owlItems[e.currentItem]).height();
                e.wrapperOuter.css("height", a + "px");
                e.wrapperOuter.hasClass("autoHeight") || g.setTimeout(function() {
                    e.wrapperOuter.addClass("autoHeight");
                }, 0);
            }
            function b() {
                d += 1;
                e.completeImg(c.get(0)) ? a() : 100 >= d ? g.setTimeout(b, 100) : e.wrapperOuter.css("height", "");
            }
            var e = this, c = f(e.$owlItems[e.currentItem]).find("img"), d;
            void 0 !== c.get(0) ? (d = 0, b()) : a();
        },
        completeImg: function(a) {
            return !a.complete || "undefined" !== typeof a.naturalWidth && 0 === a.naturalWidth ? !1 : !0;
        },
        onVisibleItems: function() {
            var a;
            !0 === this.options.addClassActive && this.$owlItems.removeClass("active");
            this.visibleItems = [];
            for (a = this.currentItem; a < this.currentItem + this.options.items; a += 1) this.visibleItems.push(a), 
            !0 === this.options.addClassActive && f(this.$owlItems[a]).addClass("active");
            this.owl.visibleItems = this.visibleItems;
        },
        transitionTypes: function(a) {
            this.outClass = "owl-" + a + "-out";
            this.inClass = "owl-" + a + "-in";
        },
        singleItemTransition: function() {
            var a = this, b = a.outClass, e = a.inClass, c = a.$owlItems.eq(a.currentItem), d = a.$owlItems.eq(a.prevItem), f = Math.abs(a.positionsInArray[a.currentItem]) + a.positionsInArray[a.prevItem], g = Math.abs(a.positionsInArray[a.currentItem]) + a.itemWidth / 2;
            a.isTransition = !0;
            a.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": g + "px",
                "-moz-perspective-origin": g + "px",
                "perspective-origin": g + "px"
            });
            d.css({
                position: "relative",
                left: f + "px"
            }).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                a.endPrev = !0;
                d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
                a.clearTransStyle(d, b);
            });
            c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                a.endCurrent = !0;
                c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
                a.clearTransStyle(c, e);
            });
        },
        clearTransStyle: function(a, b) {
            a.css({
                position: "",
                left: ""
            }).removeClass(b);
            this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), 
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
            this.$elem.off(".owl owl mousedown.disableTextSelect");
            f(k).off(".owl owl");
            f(g).off("resize", this.resizer);
        },
        unWrap: function() {
            0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), 
            this.owlControls && this.owlControls.remove());
            this.clearEvents();
            this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"));
        },
        destroy: function() {
            this.stop();
            g.clearInterval(this.checkVisible);
            this.unWrap();
            this.$elem.removeData();
        },
        reinit: function(a) {
            a = f.extend({}, this.userOptions, a);
            this.unWrap();
            this.init(a, this.$elem);
        },
        addItem: function(a, b) {
            var e;
            if (!a) return !1;
            if (0 === this.$elem.children().length) return this.$elem.append(a), this.setVars(), 
            !1;
            this.unWrap();
            e = void 0 === b || -1 === b ? -1 : b;
            e >= this.$userItems.length || -1 === e ? this.$userItems.eq(-1).after(a) : this.$userItems.eq(e).before(a);
            this.setVars();
        },
        removeItem: function(a) {
            if (0 === this.$elem.children().length) return !1;
            a = void 0 === a || -1 === a ? -1 : a;
            this.unWrap();
            this.$userItems.eq(a).remove();
            this.setVars();
        }
    };
    f.fn.owlCarousel = function(a) {
        return this.each(function() {
            if (!0 === f(this).data("owl-init")) return !1;
            f(this).data("owl-init", !0);
            var b = Object.create(l);
            b.init(a, this);
            f.data(this, "owlCarousel", b);
        });
    };
    f.fn.owlCarousel.options = {
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
})(jQuery, window, document);

jQuery.easing.jswing = jQuery.easing.swing;

jQuery.extend(jQuery.easing, {
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
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a;
        }
        return -h / 2 * (--f * (f - 2) - 1) + a;
    },
    easeInCubic: function(e, f, a, h, g) {
        return h * (f /= g) * f * f + a;
    },
    easeOutCubic: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a;
    },
    easeInOutCubic: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a;
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a;
    },
    easeInQuart: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a;
    },
    easeOutQuart: function(e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a;
    },
    easeInOutQuart: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f + a;
        }
        return -h / 2 * ((f -= 2) * f * f * f - 2) + a;
    },
    easeInQuint: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a;
    },
    easeOutQuint: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a;
    },
    easeInOutQuint: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a;
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a;
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
        return f == 0 ? a : h * Math.pow(2, 10 * (f / g - 1)) + a;
    },
    easeOutExpo: function(e, f, a, h, g) {
        return f == g ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a;
    },
    easeInOutExpo: function(e, f, a, h, g) {
        if (f == 0) {
            return a;
        }
        if (f == g) {
            return a + h;
        }
        if ((f /= g / 2) < 1) {
            return h / 2 * Math.pow(2, 10 * (f - 1)) + a;
        }
        return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a;
    },
    easeInCirc: function(e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a;
    },
    easeOutCirc: function(e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a;
    },
    easeInOutCirc: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a;
        }
        return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a;
    },
    easeInElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e;
        }
        if ((h /= k) == 1) {
            return e + l;
        }
        if (!j) {
            j = k * .3;
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4;
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g);
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e;
    },
    easeOutElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e;
        }
        if ((h /= k) == 1) {
            return e + l;
        }
        if (!j) {
            j = k * .3;
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4;
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g);
        }
        return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e;
    },
    easeInOutElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e;
        }
        if ((h /= k / 2) == 2) {
            return e + l;
        }
        if (!j) {
            j = k * (.3 * 1.5);
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4;
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g);
        }
        if (h < 1) {
            return -.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e;
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * .5 + l + e;
    },
    easeInBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158;
        }
        return i * (f /= h) * f * ((g + 1) * f - g) + a;
    },
    easeOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158;
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a;
    },
    easeInOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158;
        }
        if ((f /= h / 2) < 1) {
            return i / 2 * (f * f * (((g *= 1.525) + 1) * f - g)) + a;
        }
        return i / 2 * ((f -= 2) * f * (((g *= 1.525) + 1) * f + g) + 2) + a;
    },
    easeInBounce: function(e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a;
    },
    easeOutBounce: function(e, f, a, h, g) {
        if ((f /= g) < 1 / 2.75) {
            return h * (7.5625 * f * f) + a;
        } else {
            if (f < 2 / 2.75) {
                return h * (7.5625 * (f -= 1.5 / 2.75) * f + .75) + a;
            } else {
                if (f < 2.5 / 2.75) {
                    return h * (7.5625 * (f -= 2.25 / 2.75) * f + .9375) + a;
                } else {
                    return h * (7.5625 * (f -= 2.625 / 2.75) * f + .984375) + a;
                }
            }
        }
    },
    easeInOutBounce: function(e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * .5 + a;
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * .5 + h * .5 + a;
    }
});

(function() {
    var t = [].indexOf || function(t) {
        for (var e = 0, n = this.length; e < n; e++) {
            if (e in this && this[e] === t) return e;
        }
        return -1;
    }, e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", [ "jquery" ], function(n) {
                return e(n, t);
            });
        } else {
            return e(t.jQuery, t);
        }
    })(this, function(n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false;
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle);
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false;
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle);
                    }
                });
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
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
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh");
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e);
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e);
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset;
                    });
                    if (!o) {
                        l.reverse();
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([ i ]);
                        }
                    });
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                };
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
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
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element);
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100);
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return;
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([ e.backward ]);
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([ e.forward ]);
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([ e.forward ]);
                        }
                    });
                });
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([ p, y ].join(" "));
                    return delete a[this.id];
                }
            };
            return t;
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height();
                        }
                        return t - n(this).outerHeight();
                    };
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i);
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return;
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t);
                }
                if (this.options.triggerOnce) {
                    return this.destroy();
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false;
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true;
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty();
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return [];
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t];
                });
            };
            return t;
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {};
                }
                if ((r = e.handler) == null) {
                    e.handler = t;
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i);
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i);
                    }
                    return new l(t, r, e);
                });
                n[m]("refresh");
                return this;
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
                    if (e > 0) {
                        return t.push(n[e - 1]);
                    }
                });
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1]);
                    }
                });
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical";
                }
                if (e == null) {
                    e = r;
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t]);
                });
                return this.pushStack(o);
            },
            _invoke: function(t, e) {
                t.each(function() {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function(t, n) {
                        n[e]();
                        return true;
                    });
                });
                return this;
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t);
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments);
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [ null, r ]);
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.");
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.");
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(a, function(t, e) {
                    return e.refresh();
                });
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height();
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0;
                }
                if (!e) {
                    return [];
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e);
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset;
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element;
                    });
                    return r[t] = n.unique(r[t]);
                });
                return r;
            },
            above: function(t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y;
                });
            },
            below: function(t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y;
                });
            },
            left: function(t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x;
                });
            },
            right: function(t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "horizontal", function(t, e) {
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
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true;
                });
            },
            _filter: function(t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return [];
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e);
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset;
                });
                return n.map(o, function(t) {
                    return t.element;
                });
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t);
            } else {
                return h.aggregate.call(null, n);
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh");
        });
    });
}).call(this);

(function(e) {
    "use strict";
    e.fn.counterUp = function(t) {
        var n = e.extend({
            time: 400,
            delay: 10
        }, t);
        return this.each(function() {
            var t = e(this), r = n, i = function() {
                var e = [], n = r.time / r.delay, i = t.text(), s = /[0-9]+,[0-9]+/.test(i);
                i = i.replace(/,/g, "");
                var o = /^[0-9]+$/.test(i), u = /^[0-9]+\.[0-9]+$/.test(i), a = u ? (i.split(".")[1] || []).length : 0;
                for (var f = n; f >= 1; f--) {
                    var l = parseInt(i / n * f);
                    u && (l = parseFloat(i / n * f).toFixed(a));
                    if (s) while (/(\d+)(\d{3})/.test(l.toString())) l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                    e.unshift(l);
                }
                t.data("counterup-nums", e);
                t.text("0");
                var c = function() {
                    t.text(t.data("counterup-nums").shift());
                    if (t.data("counterup-nums").length) setTimeout(t.data("counterup-func"), r.delay); else {
                        delete t.data("counterup-nums");
                        t.data("counterup-nums", null);
                        t.data("counterup-func", null);
                    }
                };
                t.data("counterup-func", c);
                setTimeout(t.data("counterup-func"), r.delay);
            };
            t.waypoint(i, {
                offset: "100%",
                triggerOnce: !0
            });
        });
    };
})(jQuery);