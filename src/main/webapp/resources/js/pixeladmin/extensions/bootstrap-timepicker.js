!function(t) {
    "use strict";
    if (!t.fn.timepicker) throw new Error("bootstrap-timepicker.js required.");
    var e = t.fn.timepicker.Constructor.prototype._init, i = t.fn.timepicker.Constructor.prototype.place;
    t.fn.timepicker.Constructor.prototype._init = function() {
        this.$element.on({
            "focus.timepicker": t.proxy(this.highlightUnit, this),
            "click.timepicker": t.proxy(this.highlightUnit, this),
            "keydown.timepicker": t.proxy(this.elementKeydown, this),
            "blur.timepicker": t.proxy(this.blurElement, this)
        }), this.$element.parent(".input-group").find(".input-group-addon").addClass("bootstrap-timepicker-trigger").on("click.timepicker", t.proxy(this.showWidget, this)), 
        e.call(this);
    }, t.fn.timepicker.Constructor.prototype.place = function() {
        "dropdown" === this.template && i.call(this);
    }, t.fn.timepicker.Constructor.prototype.getTemplate = function() {
        var t = void 0, e = void 0, i = void 0, n = void 0;
        n = this.showInputs ? (t = '<input type="text" name="hour" class="bootstrap-timepicker-hour form-control timepicker-input" maxlength="2"/>', 
        e = '<input type="text" name="minute" class="bootstrap-timepicker-minute form-control timepicker-input" maxlength="2"/>', 
        i = '<input type="text" name="second" class="bootstrap-timepicker-second form-control timepicker-input" maxlength="2"/>', 
        '<input type="text" name="meridian" class="bootstrap-timepicker-meridian form-control timepicker-input" maxlength="2"/>') : (t = '<span class="bootstrap-timepicker-hour timepicker-value"></span>', 
        e = '<span class="bootstrap-timepicker-minute timepicker-value"></span>', i = '<span class="bootstrap-timepicker-second timepicker-value"></span>', 
        '<span class="bootstrap-timepicker-meridian timepicker-value"></span>');
        var a = '\n<table class="table">\n<tr>\n  <td><a href="#" data-action="incrementHour" class="timepicker-increment">+</a></td>\n  <td class="separator">&nbsp;</td>\n  <td><a href="#" data-action="incrementMinute" class="timepicker-increment">+</a></td>\n  ' + (this.showSeconds ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond" class="timepicker-increment">+</a></td>' : "") + "\n  " + (this.showMeridian ? '<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian" class="timepicker-increment">+</a></td>' : "") + "\n</tr>\n<tr>\n  <td>" + t + '</td>\n  <td class="separator">:</td>\n  <td>' + e + "</td>\n  " + (this.showSeconds ? '<td class="separator">:</td><td>' + i + "</td>" : "") + "\n  " + (this.showMeridian ? '<td class="separator">&nbsp;</td><td>' + n + "</td>" : "") + '\n</tr>\n<tr>\n  <td><a href="#" data-action="decrementHour" class="timepicker-decrement">-</a></td>\n  <td class="separator"></td>\n  <td><a href="#" data-action="decrementMinute" class="timepicker-decrement">-</a></td>\n  ' + (this.showSeconds ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond" class="timepicker-decrement">-</a></td>' : "") + "\n  " + (this.showMeridian ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian" class="timepicker-decrement">-</a></td>' : "") + "\n</tr>\n</table>";
        return "modal" !== this.template ? '<div class="bootstrap-timepicker-widget dropdown-menu">' + a + "</div>" : '\n<div class="bootstrap-timepicker-widget modal fade" tabindex="-1" role="dialog">\n<div class="modal-dialog modal-sm" role="document">\n  <div class="modal-content">\n    <div class="modal-header">\n      <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n        <span aria-hidden="true">&times;</span>\n      </button>\n      <h4 class="modal-title">Pick a Time</h4>\n    </div>\n    <div class="modal-body">\n      ' + a + '\n    </div>\n    <div class="modal-footer">\n      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n    </div>\n  </div>\n</div>\n</div>';
    };
}(jQuery);