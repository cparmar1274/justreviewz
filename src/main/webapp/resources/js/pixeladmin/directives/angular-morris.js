function morrisDirectiveDestroy() {
    "use strict";
    this.raphael.remove(), $(this.el).unbind("mouseleave"), $(this.el).unbind("mousemove"), 
    $(this.el).unbind("touchstart touchmove touchend"), $(this.el).unbind("click"), 
    $(this.el).unbind("mouseup"), $(this.el).unbind("mousedown"), $(this.el).unbind("resize");
}

function morrisDirectiveConfig(i, e, t) {
    "use strict";
    var r = angular.extend({}, t || {});
    return r.element = i[0], r.data = e, r;
}

function morrisDirectiveFactory(i, e, t) {
    "use strict";
    function r() {
        c && o(), n = morrisDirectiveConfig(t, e.data, e.options), s = Boolean(n.resize), 
        n.resize = !1, c = Morris[i](n), s && (u = function() {
            return null !== this.timeoutId && window.clearTimeout(this.timeoutId), $(this.el).is(":visible") ? (this.timeoutId = window.setTimeout(this.resizeHandler.bind(this), 100), 
            this.timeoutId) : null;
        }.bind(c), $(window).on("resize", u));
    }
    function o() {
        u && $(window).off("resize", u), morrisDirectiveDestroy.call(c), t.empty(), c = u = s = n = c = null;
    }
    var n = void 0, s = void 0, u = void 0, c = void 0;
    r(), [ "data", "options" ].forEach(function(i) {
        void 0 !== e[i] && e.$watch(i, r, !0);
    }), t.on("$destroy", o);
}

function morrisLineDirective(i) {
    "use strict";
    return {
        restrict: "EA",
        template: "<div></div>",
        replace: !0,
        scope: {
            data: "=",
            options: "="
        },
        link: function(e, t) {
            i(function() {
                return morrisDirectiveFactory("Line", e, t);
            });
        }
    };
}

function morrisBarDirective(i) {
    "use strict";
    return {
        restrict: "EA",
        template: "<div></div>",
        replace: !0,
        scope: {
            data: "=",
            options: "="
        },
        link: function(e, t) {
            i(function() {
                return morrisDirectiveFactory("Bar", e, t);
            });
        }
    };
}

function morrisAreaDirective(i) {
    "use strict";
    return {
        restrict: "EA",
        template: "<div></div>",
        replace: !0,
        scope: {
            data: "=",
            options: "="
        },
        link: function(e, t) {
            i(function() {
                return morrisDirectiveFactory("Area", e, t);
            });
        }
    };
}

function morrisDonutDirective(i) {
    "use strict";
    return {
        restrict: "EA",
        template: "<div></div>",
        replace: !0,
        scope: {
            data: "=",
            options: "="
        },
        link: function(e, t) {
            i(function() {
                return morrisDirectiveFactory("Donut", e, t);
            });
        }
    };
}

angular.module("angular-morris", []).directive("morrisLine", [ "$timeout", morrisLineDirective ]).directive("morrisBar", [ "$timeout", morrisBarDirective ]).directive("morrisArea", [ "$timeout", morrisAreaDirective ]).directive("morrisDonut", [ "$timeout", morrisDonutDirective ]);