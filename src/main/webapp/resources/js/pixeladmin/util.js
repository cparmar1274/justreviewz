var pxUtil = function() {
    "use strict";
    function e(e, t) {
        for (var n = "[object Array]" === Object.prototype.toString.call(e) ? e : e.split(" "), r = 0; r < n.length; r++) t(n[r], r);
    }
    var t = "classList" in document.documentElement, n = t ? function(e, t) {
        return e.classList.contains(t);
    } : function(e, t) {
        return new RegExp("(?:^|\\s)" + t + "(?:\\s|$)").test(e.className);
    }, r = t ? function(e, t) {
        return e.classList.add(t);
    } : function(e, t) {
        n(e, t) || (e.className += (e.className ? " " : "") + t);
    }, s = t ? function(e, t) {
        return e.classList.remove(t);
    } : function(e, t) {
        n(e, t) && (e.className = e.className.replace(new RegExp("(?:^" + t + "\\s+)|(?:^\\s*" + t + "\\s*$)|(?:\\s+" + t + "$)", "g"), "").replace(new RegExp("\\s+" + t + "\\s+", "g"), " "));
    }, a = t ? function(e, t) {
        return e.classList.toggle(t);
    } : function(e, t) {
        return (n(e, t) ? s : r)(e, t);
    };
    return {
        generateUniqueId: function() {
            var e = (Math.floor(25 * Math.random()) + 10).toString(36) + "_";
            for (e += new Date().getTime().toString(36) + "_"; (e += Math.floor(35 * Math.random()).toString(36)).length < 32; ) ;
            return e;
        },
        escapeRegExp: function(e) {
            return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
        hexToRgba: function(e, t) {
            var n = e.replace("#", "");
            return "rgba(" + parseInt(n.substring(0, 2), 16) + ", " + parseInt(n.substring(2, 4), 16) + ", " + parseInt(n.substring(4, 6), 16) + ", " + t + ")";
        },
        triggerResizeEvent: function() {
            var e = void 0;
            document.createEvent ? (e = document.createEvent("HTMLEvents")).initEvent("resize", !0, !0) : (e = document.createEventObject()).eventType = "resize", 
            e.eventName = "resize", document.createEvent ? window.dispatchEvent(e) : window.fireEvent("on" + e.eventType, e);
        },
        hasClass: function(e, t) {
            return n(e, t);
        },
        addClass: function(t, n) {
            e(n, function(e) {
                return r(t, e);
            });
        },
        removeClass: function(t, n) {
            e(n, function(e) {
                return s(t, e);
            });
        },
        toggleClass: function(t, n) {
            e(n, function(e) {
                return a(t, e);
            });
        }
    };
}();