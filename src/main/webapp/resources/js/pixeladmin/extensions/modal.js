!function(o) {
    "use strict";
    if (!o.fn.modal) throw new Error("modal.js required.");
    var t = o.fn.modal.Constructor.prototype.show, r = o.fn.modal.Constructor.prototype.hide;
    o.fn.modal.Constructor.prototype.show = function(r) {
        t.call(this, r), this.isShown && o("html").addClass("modal-open");
    }, o.fn.modal.Constructor.prototype.hide = function(t) {
        r.call(this, t), this.isShown || o("html").removeClass("modal-open");
    };
}(jQuery);