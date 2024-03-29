(function() {
    "use strict";
    var t, i, s, n = function(t, i) {
        return function() {
            return t.apply(i, arguments);
        };
    };
    t = jQuery, i = function() {
        function t() {}
        return t.transitions = {
            webkitTransition: "webkitTransitionEnd",
            mozTransition: "mozTransitionEnd",
            oTransition: "oTransitionEnd",
            transition: "transitionend"
        }, t.transition = function(t) {
            var i, s, n, e;
            for (e in i = t[0], s = this.transitions) if (n = s[e], null != i.style[e]) return n;
        }, t;
    }(), s = function() {
        function s(i) {
            null == i && (i = {}), this.container = n(this.container, this), this.content = n(this.content, this), 
            this.html = n(this.html, this), this.$growl = n(this.$growl, this), this.$growls = n(this.$growls, this), 
            this.animate = n(this.animate, this), this.remove = n(this.remove, this), this.dismiss = n(this.dismiss, this), 
            this.present = n(this.present, this), this.waitAndDismiss = n(this.waitAndDismiss, this), 
            this.cycle = n(this.cycle, this), this.close = n(this.close, this), this.click = n(this.click, this), 
            this.mouseLeave = n(this.mouseLeave, this), this.mouseEnter = n(this.mouseEnter, this), 
            this.unbind = n(this.unbind, this), this.bind = n(this.bind, this), this.render = n(this.render, this), 
            this.settings = t.extend({}, s.settings, i), this.$growls().attr("class", this.settings.location), 
            this.render();
        }
        return s.settings = {
            namespace: "growl",
            duration: 3200,
            close: "&#215;",
            location: "default",
            style: "default",
            size: "medium",
            delayOnHover: !0
        }, s.growl = function(t) {
            return null == t && (t = {}), this.initialize(), new s(t);
        }, s.initialize = function() {
            return t("body:not(:has(#growls))").append('<div id="growls" />');
        }, s.prototype.render = function() {
            var t;
            t = this.$growl(), this.$growls().append(t), this.settings.fixed ? this.present() : this.cycle();
        }, s.prototype.bind = function(t) {
            return null == t && (t = this.$growl()), t.on("click", this.click), this.settings.delayOnHover && (t.on("mouseenter", this.mouseEnter), 
            t.on("mouseleave", this.mouseLeave)), t.on("contextmenu", this.close).find("." + this.settings.namespace + "-close").on("click", this.close);
        }, s.prototype.unbind = function(t) {
            return null == t && (t = this.$growl()), t.off("click", this.click), this.settings.delayOnHover && (t.off("mouseenter", this.mouseEnter), 
            t.off("mouseleave", this.mouseLeave)), t.off("contextmenu", this.close).find("." + this.settings.namespace + "-close").off("click", this.close);
        }, s.prototype.mouseEnter = function(t) {
            return this.$growl().stop(!0, !0);
        }, s.prototype.mouseLeave = function(t) {
            return this.waitAndDismiss();
        }, s.prototype.click = function(t) {
            if (null != this.settings.url) return t.preventDefault(), t.stopPropagation(), window.open(this.settings.url);
        }, s.prototype.close = function(t) {
            return t.preventDefault(), t.stopPropagation(), this.$growl().stop().queue(this.dismiss).queue(this.remove);
        }, s.prototype.cycle = function() {
            return this.$growl().queue(this.present).queue(this.waitAndDismiss());
        }, s.prototype.waitAndDismiss = function() {
            return this.$growl().delay(this.settings.duration).queue(this.dismiss).queue(this.remove);
        }, s.prototype.present = function(t) {
            var i;
            return i = this.$growl(), this.bind(i), this.animate(i, this.settings.namespace + "-incoming", "out", t);
        }, s.prototype.dismiss = function(t) {
            var i;
            return i = this.$growl(), this.unbind(i), this.animate(i, this.settings.namespace + "-outgoing", "in", t);
        }, s.prototype.remove = function(t) {
            return this.$growl().remove(), "function" == typeof t ? t() : void 0;
        }, s.prototype.animate = function(t, s, n, e) {
            var o;
            null == n && (n = "in"), o = i.transition(t), t["in" === n ? "removeClass" : "addClass"](s), 
            t.offset().position, t["in" === n ? "addClass" : "removeClass"](s), null != e && (null != o ? t.one(o, e) : e());
        }, s.prototype.$growls = function() {
            return null != this.$_growls ? this.$_growls : this.$_growls = t("#growls");
        }, s.prototype.$growl = function() {
            return null != this.$_growl ? this.$_growl : this.$_growl = t(this.html());
        }, s.prototype.html = function() {
            return this.container(this.content());
        }, s.prototype.content = function() {
            return "<div class='" + this.settings.namespace + "-close'>" + this.settings.close + "</div>\n<div class='" + this.settings.namespace + "-title'>" + this.settings.title + "</div>\n<div class='" + this.settings.namespace + "-message'>" + this.settings.message + "</div>";
        }, s.prototype.container = function(t) {
            return "<div class='" + this.settings.namespace + " " + this.settings.namespace + "-" + this.settings.style + " " + this.settings.namespace + "-" + this.settings.size + "'>\n  " + t + "\n</div>";
        }, s;
    }(), this.Growl = s, t.growl = function(t) {
        return null == t && (t = {}), s.growl(t);
    }, t.growl.error = function(i) {
        var s;
        return null == i && (i = {}), s = {
            title: "Error!",
            style: "error"
        }, t.growl(t.extend(s, i));
    }, t.growl.notice = function(i) {
        var s;
        return null == i && (i = {}), s = {
            title: "Notice!",
            style: "notice"
        }, t.growl(t.extend(s, i));
    }, t.growl.warning = function(i) {
        var s;
        return null == i && (i = {}), s = {
            title: "Warning!",
            style: "warning"
        }, t.growl(t.extend(s, i));
    };
}).call(this);