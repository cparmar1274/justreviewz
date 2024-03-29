!function(t) {
    "use strict";
    if (!t.fn.popover) throw new Error("popover.js required.");
    var o = t.fn.popover.Constructor.prototype.getOptions, r = t.fn.popover.Constructor.prototype.setContent;
    t.fn.popover.Constructor.prototype.getOptions = function(r) {
        var e = o.call(this, r), p = "rtl" === t("html").attr("dir");
        return p && "left" === e.placement ? e.placement = "right" : p && "right" === e.placement && (e.placement = "left"), 
        e;
    }, t.fn.popover.Constructor.prototype.setContent = function() {
        var o = this.$element, e = t(this.tip()), p = o.attr("data-state"), n = (o.attr("data-style") || "").toLowerCase().split(" ");
        p && e.addClass("popover-" + p.replace(/[^a-z0-9_-]/gi, "")), -1 !== n.indexOf("dark") && e.addClass("popover-dark"), 
        -1 !== n.indexOf("colorful") && e.addClass("popover-colorful"), r.call(this);
    };
}(jQuery);