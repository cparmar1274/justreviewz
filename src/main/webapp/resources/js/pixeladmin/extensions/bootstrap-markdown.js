!function(t) {
    "use strict";
    function o(t) {
        var o = t.outerHeight(), r = this.$editor.find(".md-preview");
        this.$textarea[0].style.top = o + "px", r.length && (r[0].style.top = o + "px");
    }
    if (!t.fn.markdown) throw new Error("bootstrap-markdown.js required.");
    var r = t.fn.markdown.Constructor.prototype.__buildButtons, e = t.fn.markdown.Constructor.prototype.setFullscreen, n = t.fn.markdown.Constructor.prototype.showPreview;
    t.fn.markdown.Constructor.prototype.__buildButtons = function(t, o) {
        var e = r.call(this, t, o);
        return e.find(".btn-default").removeClass("btn-default").addClass("btn-secondary"), 
        e;
    }, t.fn.markdown.Constructor.prototype.setFullscreen = function(r) {
        if (e.call(this, r), r) {
            var n = this.$editor.find(".md-header");
            o.call(this, n), t(window).on("resize.md-editor", t.proxy(o, this, n));
        } else this.$textarea[0].style.top = "auto", this.$editor.find(".md-preview").css("top", "auto"), 
        t(window).off("resize.md-editor");
    }, t.fn.markdown.Constructor.prototype.showPreview = function() {
        n.call(this), this.$editor.hasClass("md-fullscreen-mode") && o.call(this, this.$editor.find(".md-header"));
    };
}(jQuery);