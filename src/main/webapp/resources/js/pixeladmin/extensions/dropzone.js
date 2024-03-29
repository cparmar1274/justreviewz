var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(e, r) {
    "use strict";
    if (!r) throw new Error("dropzone.js required.");
    var s = r.prototype.defaultOptions.error;
    r.prototype.defaultOptions = e.extend({}, r.prototype.defaultOptions, {
        previewTemplate: '\n<div class="dz-preview dz-file-preview">\n  <div class="dz-details">\n    <div class="dz-filename" data-dz-name></div>\n    <div class="dz-size" data-dz-size></div>\n    <div class="dz-thumbnail">\n      <img data-dz-thumbnail>\n      <span class="dz-nopreview">No preview</span>\n      <div class="dz-success-mark"></div>\n      <div class="dz-error-mark"></div>\n      <div class="dz-error-message"><span data-dz-errormessage></span></div>\n    </div>\n  </div>\n  <div class="progress">\n    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>\n  </div>\n</div>',
        addRemoveLinks: !0,
        error: function(r, o) {
            var a = s.call(this, r, o);
            return r.previewElement && e(r.previewElement).find(".progress-bar-success").removeClass("progress-bar-success").addClass("progress-bar-danger"), 
            a;
        }
    }), e.fn.dropzone = function(s) {
        for (var o = arguments.length, a = Array(1 < o ? o - 1 : 0), n = 1; n < o; n++) a[n - 1] = arguments[n];
        var i = void 0, d = this.each(function() {
            var o = e(this).data("dropzone"), n = "object" === (void 0 === s ? "undefined" : _typeof(s)) ? s : null;
            if (o || (o = new r(this, n), e(this).data("dropzone", o)), "string" == typeof s) {
                var d;
                if (!o[s]) throw new Error('No method named "' + s + '".');
                i = (d = o)[s].apply(d, a);
            }
        });
        return void 0 !== i ? i : d;
    };
}(jQuery, window.Dropzone);