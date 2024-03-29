!function(r) {
    "use strict";
    if (!r.fn.knob) throw new Error("jquery.knob.js required.");
    var n = r.fn.knob;
    r.fn.knob = function(t) {
        var i = n.call(this, t);
        return "rtl" === r("html").attr("dir") ? i.each(function() {
            var n = r(this).find("input");
            n.css({
                "margin-left": 0,
                "margin-right": n.css("margin-left")
            });
        }) : i;
    };
}(jQuery);