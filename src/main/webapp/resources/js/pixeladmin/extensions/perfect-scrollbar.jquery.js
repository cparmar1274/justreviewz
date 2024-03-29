!function(r) {
    "use strict";
    if (!r.fn.perfectScrollbar) throw new Error("perfect-scrollbar.jquery.js required.");
    var t = "rtl" === r("html").attr("dir"), e = r.fn.perfectScrollbar;
    r.fn.perfectScrollbar = function(i) {
        return this.each(function() {
            var a = this, c = r(this).attr("data-ps-id");
            e.call(r(this), i), t && !c ? (c = r(this).attr("data-ps-id")) && r(window).on("resize.ps." + c, function() {
                return r(a).perfectScrollbar("update");
            }) : t && c && "destroy" === i && r(window).off("resize.ps." + c);
        });
    };
}(jQuery);