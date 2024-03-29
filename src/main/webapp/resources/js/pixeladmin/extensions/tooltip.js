!function(t) {
    "use strict";
    if (!t.fn.tooltip) throw new Error("tooltip.js required.");
    var o = t.fn.tooltip.Constructor.prototype.getOptions, e = t.fn.tooltip.Constructor.prototype.setContent;
    t.fn.tooltip.Constructor.prototype.getOptions = function(e) {
        var r = o.call(this, e), n = "rtl" === t("html").attr("dir");
        return n && "left" === r.placement ? r.placement = "right" : n && "right" === r.placement && (r.placement = "left"), 
        r;
    }, t.fn.tooltip.Constructor.prototype.setContent = function() {
        var o = this.$element.attr("data-state");
        o && t(this.tip()).addClass("tooltip-" + o.replace(/[^a-z0-9_-]/gi, "")), e.call(this);
    };
}(jQuery);