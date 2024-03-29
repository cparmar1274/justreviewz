!function(t) {
    "function" == typeof define && define.amd ? define([ "jquery" ], t) : t("object" == typeof exports ? require("jquery") : jQuery);
}(function(t, e, s, a) {
    "use strict";
    function i(e, s) {
        this.element = e, this.settings = t.extend({}, l, s), this._defaults = l, this._name = n, 
        this.init();
    }
    var n = "quickselect", l = {
        activeButtonClass: "active",
        breakOutAll: !1,
        breakOutValues: [],
        buttonClass: "",
        buttonDefaultClass: "",
        buttonRequiredClass: "",
        namespace: n,
        selectDefaultText: "More&hellip;",
        wrapperClass: "",
        buttonTag: "button"
    };
    t.extend(i.prototype, {
        init: function() {
            var e = this.element, s = this.settings.activeButtonClass, a = this.settings.breakOutAll, i = this.settings.breakOutValues, n = this.settings.buttonClass, l = this.settings.buttonDefaultClass, u = this.settings.buttonRequiredClass, o = this.settings.namespace, r = this.settings.selectDefaultText, c = this.settings.wrapperClass, d = this.settings.buttonTag, h = t('<div class="' + o + "__wrapper " + c + '"></div>');
            t(e).addClass(o + "__select").before(h), i = a ? t("option", e).map(function() {
                return this.value;
            }).get() : i;
            var p = t(e).is(":disabled") ? " disabled " : "", f = n + " " + (t(e).is(":required") ? u : l);
            t.each(i, function(s, a) {
                var i = t('option[value="' + a + '"]', e).attr("value"), n = t('option[value="' + a + '"]', e).text();
                i && t(h).append("<" + d + ' aria-pressed="false" data-' + o + '-value="' + i + '" class="' + o + "__btn " + f + '"' + p + ">" + n + "</" + d + ">");
            }), a ? t(e).addClass(o + "__hidden") : t(e).wrap('<div class="' + o + "__btn " + o + "__more " + f + '"' + p + "></div>").before('<span class="' + o + '__more--label">' + r + "</span>").parent().detach().appendTo(h), 
            t(e).change(function() {
                var n = t(this).val();
                t("." + o + "__btn", t(h)).removeClass(s);
                var l = r;
                -1 !== t.inArray(n, i) || !0 === a ? t("." + o + "__btn[data-" + o + '-value="' + n + '"]', t(h)).addClass(s) : n && (l = t(e).find("option:selected").text(), 
                t("." + o + "__more", t(h)).addClass(s)), t("." + o + "__more--label", t(h)).html(l);
            }), t("." + o + "__btn[data-" + o + "-value]", t(h)).click(function() {
                t(this).hasClass(s) ? t(e).val(t("option:first", e).val()).change() : t(e).val(t(this).attr("data-" + o + "-value")).change();
            }), t(e).val(t(e).val()).change(), t(e).focus(function() {
                t(this).css("opacity", "1");
            }).blur(function() {
                t(this).css("opacity", "0");
            });
        }
    }), t.fn[n] = function(e) {
        return this.each(function() {
            t.data(this, "plugin_" + n) || t.data(this, "plugin_" + n, new i(this, e));
        });
    };
});