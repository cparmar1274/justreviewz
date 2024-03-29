!function(t) {
    "use strict";
    if (!t.fn.tagsinput) throw new Error("bootstrap-tagsinput.js required.");
    var i = t.fn.tagsinput.Constructor.prototype.build, n = t.fn.tagsinput.Constructor.prototype.destroy;
    t.fn.tagsinput.Constructor.prototype.build = function(n) {
        function o(t) {
            return Math.ceil(s.$inpWidth.html((t || "").replace(p, "#")).outerWidth() + 12) + "px";
        }
        var s = this, e = i.call(this, n), p = /<|>/g;
        return this.$inpWidth = t('<div class="bootstrap-tagsinput-input" style="position:absolute;z-index:-101;top:-9999px;opacity:0;white-space:nowrap;"></div>'), 
        t('<div style="position:absolute;width:0;height:0;z-index:-100;opacity:0;overflow:hidden;"></div>').append(this.$inpWidth).prependTo(this.$container), 
        this.$input[0].style.width = o(), this.$input.on("keydown keyup focusout", function() {
            this.style.width = o(this.value);
        }), this.$input.on("paste", function() {
            setTimeout(t.proxy(function() {
                this.style.width = o(this.value);
            }, this), 100);
        }), e;
    }, t.fn.tagsinput.Constructor.prototype.destroy = function() {
        return this.$input.off("keydown keyup focusout paste"), n.call(this);
    }, t(function() {
        t("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput("destroy"), 
        t("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
    });
}(jQuery);