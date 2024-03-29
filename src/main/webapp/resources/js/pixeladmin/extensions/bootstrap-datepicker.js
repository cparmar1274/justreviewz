!function(t) {
    "use strict";
    if (!t.fn.datepicker) throw new Error("bootstrap-datepicker.js required.");
    var r = t.fn.datepicker.Constructor.prototype.place;
    t.fn.datepicker.Constructor.prototype.place = function() {
        if (r.call(this), !this.o.rtl) return this;
        var e = t(this.o.container), i = parseInt(this.picker.css("right"), 10);
        if (i += e.outerWidth() - e.width(), !this.picker.hasClass("datepicker-orient-left")) {
            var s = this.picker.outerWidth();
            i += 2 * (this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1)) - 2 * s;
        }
        return this.picker.css({
            right: i
        }), this;
    }, t.fn.datepicker.defaults.rtl = "rtl" === t("html").attr("dir");
}(jQuery);