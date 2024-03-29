function editableTableCtrl(e, t) {
    "use strict";
    function i() {
        r.$editor.is(":visible") && r.$editor.offset(r.active.offset()).width(r.active.width()).height(r.active.height());
    }
    var o = this, r = this;
    this.init = function(n) {
        o.options = n, o.$editor = n.editor.clone(!0).css("position", "absolute").hide().appendTo(e.parent()), 
        o.$editor.blur(function() {
            o.setActiveText(), o.$editor.hide();
        }).keydown(function(e) {
            if (13 === e.which) r.setActiveText(), r.$editor.hide(), r.active.focus(), e.preventDefault(), 
            e.stopPropagation(); else if (27 === e.which) r.$editor.val(r.active.text()), e.preventDefault(), 
            e.stopPropagation(), r.$editor.hide(), r.active.focus(); else if (9 === e.which) r.active.focus(); else if (this.selectionEnd - this.selectionStart === this.value.length) {
                var t = r.movement(r.active, e.which);
                0 < t.length && (t.focus(), e.preventDefault(), e.stopPropagation());
            }
        }).on("input paste", function() {
            var e = $.Event("validate");
            o.active.trigger(e, o.$editor.val()), !1 === e.result ? o.$editor.addClass("error") : o.$editor.removeClass("error");
        }), angular.element(t).on("resize", i);
    }, this.destroy = function() {
        e.css("cursor", "").off().find("td").removeAttr("tabindex"), angular.element(t).off("resize", i), 
        o.$editor.off().remove();
    }, this.showEditor = function(t) {
        o.active = e.find("td:focus"), o.active.length && (o.$editor.val(o.active.text()).removeClass("error").show().offset(o.active.offset()).css(o.active.css(o.options.cloneProperties)).width(o.active.width()).height(o.active.height()).focus(), 
        t && o.$editor.select());
    }, this.setActiveText = function() {
        var i, e = o.$editor.val(), t = $.Event("change");
        if (o.active.text() === e || o.$editor.hasClass("error")) return !0;
        i = o.active.html(), o.active.text(e).trigger(t, e), !1 === t.result && o.active.html(i);
    }, this.movement = function(e, t) {
        return 39 === t ? e.next("td") : 37 === t ? e.prev("td") : 38 === t ? e.parent().prev().children().eq(e.index()) : 40 === t ? e.parent().next().children().eq(e.index()) : [];
    }, e.on("click keypress dblclick", this.showEditor).css("cursor", "pointer").keydown(function(e) {
        var t = o.movement(angular.element(e.target), e.which), i = !0;
        0 < t.length ? t.focus() : 13 === e.which ? o.showEditor(!1) : i = ((17 === e.which || 91 === e.which || 93 === e.which) && o.showEditor(!0), 
        !1), i && (e.stopPropagation(), e.preventDefault());
    }), e.find("td").prop("tabindex", 1);
}

function editableTableDirective(e) {
    "use strict";
    var i = {
        cloneProperties: [ "padding", "padding-top", "padding-bottom", "padding-left", "padding-right", "text-align", "font", "font-size", "font-family", "font-weight", "border", "border-top", "border-bottom", "border-left", "border-right" ],
        editor: angular.element("<input>")
    }, o = [ "onChange", "onValidate" ];
    return {
        restrict: "A",
        controller: [ "$element", "$window", editableTableCtrl ],
        link: function(r, n, a, s) {
            var c = {};
            Object.keys(i).forEach(function(t) {
                void 0 !== a[t] ? c[t] = e(a[t])(r) : c[t] = i[t];
            }), s.init(c), o.forEach(function(i) {
                a[i] && n.on(function(e) {
                    return e.replace(/^on([A-Z])/, function(e, t) {
                        return t.toLowerCase();
                    });
                }(i), "td", e(a[i])(r));
            }), n.on("$destroy", s.destroy);
        }
    };
}

angular.module("angular-editable-table", []).directive("editableTable", [ "$parse", editableTableDirective ]);