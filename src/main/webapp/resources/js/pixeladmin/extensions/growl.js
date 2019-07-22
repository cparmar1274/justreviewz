!function(r) {
    "use strict";
    if (!r.growl) throw new Error("jquery.growl.js required.");
    r.growl.success = function(e) {
        return r.growl(r.extend({
            title: "Success!",
            style: "success"
        }, e || {}));
    };
}(jQuery);