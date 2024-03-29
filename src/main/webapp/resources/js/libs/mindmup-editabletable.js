$.fn.editableTableWidget = function(e) {
    "use strict";
    return $(this).each(function() {
        var t, i = $.extend(function() {
            var e = $.extend({}, $.fn.editableTableWidget.defaultOptions);
            return e.editor = e.editor.clone(), e;
        }(), e), n = $(this), o = i.editor.css("position", "absolute").hide().appendTo(n.parent()), r = function(e) {
            (t = n.find("td:focus")).length && (o.val(t.text()).removeClass("error").show().offset(t.offset()).css(t.css(i.cloneProperties)).width(t.width()).height(t.height()).focus(), 
            e && o.select());
        }, s = function() {
            var e, i = o.val(), n = $.Event("change");
            if (t.text() === i || o.hasClass("error")) return !0;
            e = t.html(), t.text(i).trigger(n, i), !1 === n.result && t.html(e);
        }, a = function(e, t) {
            return 39 === t ? e.next("td") : 37 === t ? e.prev("td") : 38 === t ? e.parent().prev().children().eq(e.index()) : 40 === t ? e.parent().next().children().eq(e.index()) : [];
        };
        o.blur(function() {
            s(), o.hide();
        }).keydown(function(e) {
            if (13 === e.which) s(), o.hide(), t.focus(), e.preventDefault(), e.stopPropagation(); else if (27 === e.which) o.val(t.text()), 
            e.preventDefault(), e.stopPropagation(), o.hide(), t.focus(); else if (9 === e.which) t.focus(); else if (this.selectionEnd - this.selectionStart === this.value.length) {
                var i = a(t, e.which);
                0 < i.length && (i.focus(), e.preventDefault(), e.stopPropagation());
            }
        }).on("input paste", function() {
            var e = $.Event("validate");
            t.trigger(e, o.val()), !1 === e.result ? o.addClass("error") : o.removeClass("error");
        }), n.on("click keypress dblclick", r).css("cursor", "pointer").keydown(function(e) {
            var t = !0, i = a($(e.target), e.which);
            0 < i.length ? i.focus() : 13 === e.which ? r(!1) : t = ((17 === e.which || 91 === e.which || 93 === e.which) && r(!0), 
            !1), t && (e.stopPropagation(), e.preventDefault());
        }), n.find("td").prop("tabindex", 1), $(window).on("resize", function() {
            o.is(":visible") && o.offset(t.offset()).width(t.width()).height(t.height());
        });
    });
}, $.fn.editableTableWidget.defaultOptions = {
    cloneProperties: [ "padding", "padding-top", "padding-bottom", "padding-left", "padding-right", "text-align", "font", "font-size", "font-family", "font-weight", "border", "border-top", "border-bottom", "border-left", "border-right" ],
    editor: $("<input>")
};