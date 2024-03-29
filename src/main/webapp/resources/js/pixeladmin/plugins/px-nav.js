function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), PxNav = function(e) {
    "use strict";
    var t = "pxNav", n = e.fn[t], i = {
        accordion: !0,
        transitionDuration: 300,
        dropdownCloseDelay: 400,
        enableTooltips: !0,
        animate: !0,
        storeState: !0,
        storagePrefix: "px-nav.",
        modes: {
            phone: [ "xs" ],
            tablet: [ "sm", "md" ],
            desktop: [ "lg", "xl" ]
        }
    }, o_NAV = "px-nav", o_NAV_LEFT = "px-nav-left", o_CONTENT = "px-nav-content", o_EXPAND = "px-nav-expand", o_STATIC = "px-nav-static", o_COLLAPSE = "px-nav-collapse", o_ANIMATE = "px-nav-animate", o_NAV_TRANSITIONING = "px-nav-transitioning", o_DIMMER = "px-nav-dimmer", o_FIXED = "px-nav-fixed", o_OFF_CANVAS = "px-nav-off-canvas", o_SCROLLABLE_AREA = "px-nav-scrollable-area", o_ITEM = "px-nav-item", o_TOOLTIP = "px-nav-tooltip", o_DROPDOWN = "px-nav-dropdown", o_DROPDOWN_MENU = "px-nav-dropdown-menu", o_DROPDOWN_MENU_TITLE = "px-nav-dropdown-menu-title", o_DROPDOWN_MENU_WRAPPER = "px-nav-dropdown-menu-wrapper", o_DROPDOWN_MENU_TOP = "px-nav-dropdown-menu-top", o_OPEN = "px-open", o_SHOW = "px-show", o_FREEZE = "freeze", o_ACTIVE = "active", o_TRANSITIONING = "transitioning", o_PERFECT_SCROLLBAR_CONTAINER = "ps-container", o_NAVBAR_FIXED = "px-navbar-fixed", s_DATA_TOGGLE = '[data-toggle="px-nav"]', s_CONTENT = ".px-nav-content", s_ITEM = "> .px-nav-item", s_ITEM_LABEL = "> a > .px-nav-label", s_ROOT_LINK = "> .px-nav-item:not(.px-nav-dropdown) > a", s_DROPDOWN_LINK = ".px-nav-dropdown > a", s_DROPDOWN_MENU = "> .px-nav-dropdown-menu", s_OPENED_DROPDOWNS = "> .px-nav-dropdown.px-open", s_SHOWN_DROPDOWNS = "> .px-nav-dropdown.px-show", s_FROZEN_DROPDOWNS = ".px-nav-dropdown.freeze", s_SCROLLABLE_AREA = ".px-nav-scrollable-area", s_NEAR_NAVBAR = "~ .px-navbar", a = {
        CLICK_DATA_API: "click.px.nav.data-api",
        RESIZE: "resize.px.nav",
        CLICK: "click.px.nav",
        MOUSEENTER: "mouseenter.px.nav",
        MOUSELEAVE: "mouseleave.px.nav",
        SCROLL: "scroll.px.nav",
        INITIALIZED: "initialized",
        EXPAND: "expand.px.nav",
        EXPANDED: "expanded.px.nav",
        COLLAPSE: "collapse.px.nav",
        COLLAPSED: "collapsed.px.nav",
        DESTROY: "destroy.px.nav",
        DROPDOWN_OPEN: "dropdown-open.px.nav",
        DROPDOWN_OPENED: "dropdown-opened.px.nav",
        DROPDOWN_CLOSE: "dropdown-close.px.nav",
        DROPDOWN_CLOSED: "dropdown-closed.px.nav",
        DROPDOWN_FROZEN: "dropdown-frozen.px.nav",
        DROPDOWN_UNFROZEN: "dropdown-unfrozen.px.nav"
    }, r = {
        suppressScrollX: !0,
        wheelPropagation: !1,
        swipePropagation: !1
    }, l = function() {
        function n(t, i) {
            _classCallCheck(this, n), this.uniqueId = pxUtil.generateUniqueId(), this.element = t, 
            this.content = e(t).find(s_CONTENT)[0], this.config = this._getConfig(i), this._curMode = this._getMode(), 
            this._isCollapsed = this._getNavState(), this._stateChanging = 0, this._setupMarkup(), 
            this.dimmer = e(t).parent().find("> ." + o_DIMMER)[0], this._setListeners(), this._restoreNavState(), 
            this._detectActiveItem(), this._enableAnimation(), this._checkNavbarPosition(), 
            this._triggerEvent("INITIALIZED", t);
        }
        return _createClass(n, [ {
            key: "toggle",
            value: function() {
                this["desktop" !== this._curMode && pxUtil.hasClass(this.element, o_EXPAND) || "desktop" === this._curMode && !pxUtil.hasClass(this.element, o_COLLAPSE) ? "collapse" : "expand"]();
            }
        }, {
            key: "expand",
            value: function() {
                ("phone" === this._curMode || this.isCollapsed()) && ("phone" === this._curMode && pxUtil.hasClass(this.element, o_EXPAND) || this._triggerPreventableEvent("EXPAND", this.element) && ("phone" !== this._curMode && this.closeAllDropdowns(), 
                this.config.enableTooltips && this._clearTooltips(), this._changeNavState(function() {
                    var n = this;
                    if ("desktop" !== this._curMode) {
                        var i = this;
                        e(this.element).parent().find("> ." + o_EXPAND).each(function() {
                            this !== i.element && e(this)[t]("collapse");
                        }), e(this.dimmer).on(this.constructor.Event.CLICK, function() {
                            return n.collapse();
                        }), pxUtil.addClass(this.element, o_EXPAND);
                    } else pxUtil.removeClass(this.element, o_COLLAPSE);
                    this._triggerEvent("EXPANDED", this.element);
                })));
            }
        }, {
            key: "collapse",
            value: function() {
                this.isCollapsed() || this._triggerPreventableEvent("COLLAPSE", this.element) && this._changeNavState(function() {
                    "desktop" !== this._curMode ? (e(this.dimmer).off("click"), pxUtil.removeClass(this.element, o_EXPAND)) : pxUtil.addClass(this.element, o_COLLAPSE), 
                    e(window).trigger("scroll"), this._triggerEvent("COLLAPSED", this.element);
                });
            }
        }, {
            key: "isFixed",
            value: function() {
                return pxUtil.hasClass(this.element, o_FIXED);
            }
        }, {
            key: "isStatic",
            value: function() {
                return pxUtil.hasClass(this.element, o_STATIC);
            }
        }, {
            key: "isCollapsed",
            value: function() {
                return this._isCollapsed;
            }
        }, {
            key: "activateItem",
            value: function(t) {
                var n = this._getNode(t, o_ITEM);
                if (!pxUtil.hasClass(n, o_DROPDOWN) && (e(this.element).find("." + o_ITEM + "." + o_ACTIVE).removeClass(o_ACTIVE), 
                pxUtil.addClass(n, o_ACTIVE), !pxUtil.hasClass(n.parentNode, o_CONTENT))) if (pxUtil.hasClass(n.parentNode, o_DROPDOWN_MENU_WRAPPER)) {
                    var i = e(n).parents("." + o_DROPDOWN_MENU).data("dropdown");
                    if (!i) return;
                    i.addClass(o_ACTIVE);
                } else {
                    var a = e(n).parents("." + o_DROPDOWN)[0], r = void 0;
                    for (this.openDropdown(a, !1); a; ) if (pxUtil.addClass(a, o_ACTIVE), pxUtil.hasClass(a.parentNode, o_DROPDOWN_MENU_WRAPPER)) {
                        if (r = e(a).parents("." + o_DROPDOWN_MENU).data("dropdown"), a = null, !r) return;
                        pxUtil.addClass(r, o_ACTIVE);
                    } else a = e(r = a).parents("." + o_DROPDOWN)[0];
                    this.isCollapsed() && (e(this.content).find(s_OPENED_DROPDOWNS).removeClass(o_OPEN), 
                    pxUtil.addClass(r, o_OPEN));
                }
            }
        }, {
            key: "openDropdown",
            value: function(t) {
                var n = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1], i = this._getNode(t);
                if ((!this.isStatic() || this._isFloatingDropdown(i)) && (this._isFloatingDropdown(i) && !n || this.isDropdownOpened(i) || this._triggerPreventableEvent("DROPDOWN_OPEN", i))) {
                    for (var s = this.isDropdownOpened(i) ? [] : [ i ], a = i; a = e(a).parents("." + o_DROPDOWN)[0]; ) this.isDropdownOpened(a) || s.push(a);
                    var r = s.pop();
                    if (r) {
                        for (var l = 0, d = s.length; l < d; l++) this._expandDropdown(s[l], !1);
                        if (this._isFloatingDropdown(r)) {
                            if (!n) return;
                            this._showDropdown(r);
                        } else this._expandDropdown(r, !0);
                    }
                }
            }
        }, {
            key: "closeDropdown",
            value: function(e) {
                var t = this._getNode(e);
                this.isDropdownOpened(t) && (this.isStatic() && !this._isFloatingDropdown(t) || this._triggerPreventableEvent("DROPDOWN_CLOSE", t) && (this._isFloatingDropdown(t) ? this._hideDropdown(t) : this._collapseDropdown(t, !0)));
            }
        }, {
            key: "toggleDropdown",
            value: function(e) {
                var t = this._getNode(e);
                this[this.isDropdownOpened(t) ? "closeDropdown" : "openDropdown"](t);
            }
        }, {
            key: "closeAllDropdowns",
            value: function() {
                var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : e(this.element).find("." + o_CONTENT);
                this._closeAllDropdowns(this._getNode(t, null));
            }
        }, {
            key: "freezeDropdown",
            value: function(e) {
                var t = this._getNode(e);
                this._isFloatingDropdown(t) && this.isDropdownOpened(t) && (pxUtil.hasClass(t, o_FREEZE) || (pxUtil.addClass(t, o_FREEZE), 
                this._clearDropdownTimer(t), this._triggerEvent("DROPDOWN_FROZEN", t)));
            }
        }, {
            key: "unfreezeDropdown",
            value: function(e) {
                var t = this._getNode(e);
                this._isFloatingDropdown(t) && this.isDropdownOpened(t) && pxUtil.hasClass(t, o_FREEZE) && (pxUtil.removeClass(t, o_FREEZE), 
                this._triggerEvent("DROPDOWN_UNFROZEN", t));
            }
        }, {
            key: "getDropdownContainer",
            value: function(t) {
                var n = this._getNode(t);
                return this._isFloatingDropdown(n) && this.isDropdownOpened(n) ? e(e(n).data("dropdown")).find("." + o_DROPDOWN_MENU_WRAPPER) : e(n).find(s_DROPDOWN_MENU);
            }
        }, {
            key: "isFloatingDropdown",
            value: function(e) {
                return this._isFloatingDropdown(this._getNode(e));
            }
        }, {
            key: "isDropdownOpened",
            value: function(e) {
                var t = this._getNode(e), n = this._isRootDropdown(t), i = this.isCollapsed();
                return i && n && pxUtil.hasClass(t, o_SHOW) || i && !n && pxUtil.hasClass(t, o_OPEN) || !i && pxUtil.hasClass(t, o_OPEN);
            }
        }, {
            key: "isDropdownFrozen",
            value: function(e) {
                return pxUtil.hasClass(this._getNode(e), o_FREEZE);
            }
        }, {
            key: "append",
            value: function(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
                return this.insert(e, null, t);
            }
        }, {
            key: "prepend",
            value: function(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
                return this.insert(e, 0, t);
            }
        }, {
            key: "insert",
            value: function(t, n) {
                var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, a = this._getNodeOrCreate(t, o_ITEM, !1);
                if (a.hasClass(o_DROPDOWN) && !a.find(s_DROPDOWN_MENU).length) throw new Error("The ." + o_DROPDOWN + " item(s) must contain the child ." + o_DROPDOWN_MENU + " element.");
                var r = null === i ? e(this.content) : this._getNode(i, o_DROPDOWN, !1), l = void 0;
                if (r.hasClass(o_CONTENT)) l = r; else if (!(l = this._isFloatingDropdown(r[0]) && this.isDropdownOpened(r[0]) ? e(r.data("dropdown")).find("." + o_DROPDOWN_MENU_WRAPPER) : r.find(s_DROPDOWN_MENU)).length) throw new Error("Targeted element is not found.");
                var d = l.find(s_ITEM);
                if (d.length) if (null === n) a.insertAfter(d.last()); else {
                    var p = d.eq(n);
                    p.length ? a.insertBefore(p) : a.insertAfter(d.last());
                } else l.append(a);
                return !this.isCollapsed() || r.hasClass(o_CONTENT) ? this._updateScrollbar(this.content) : l.hasClass(o_DROPDOWN_MENU_WRAPPER) ? this._updateScrollbar(l[0]) : this._updateScrollbar(l.parents("." + o_DROPDOWN_MENU_WRAPPER)[0]), 
                a;
            }
        }, {
            key: "remove",
            value: function(t) {
                var n = this._getNode(t, o_ITEM, !1), i = n.parent();
                n.hasClass(o_DROPDOWN) && e(n.data("dropdown")).remove(), n.remove(), !this.isCollapsed() || i.hasClass(o_CONTENT) ? this._updateScrollbar(this.content) : i.hasClass(o_DROPDOWN_MENU_WRAPPER) ? this._updateScrollbar(i[0]) : this._updateScrollbar(i.parents("." + o_DROPDOWN_MENU_WRAPPER)[0]);
            }
        }, {
            key: "destroy",
            value: function() {
                if (this._triggerPreventableEvent("DESTROY", this.element)) {
                    this._unsetListeners(), e(this.element).removeData("px.nav"), pxUtil.removeClass(this.element, o_ANIMATE), 
                    pxUtil.removeClass(this.element, o_TRANSITIONING), pxUtil.removeClass(this.element, o_EXPAND), 
                    this.isCollapsed() && this.closeAllDropdowns();
                    var t = 0;
                    e(this.element.parentNode).find("> ." + o_NAV).each(function() {
                        e(this).data("px.nav") && t++;
                    }), t || e(this.dimmer).remove(), e(this.element).find("." + o_CONTENT).perfectScrollbar("destroy"), 
                    e(this.content).unwrap(s_SCROLLABLE_AREA);
                }
            }
        }, {
            key: "_getNode",
            value: function(t) {
                var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : o_DROPDOWN, i = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2], s = "string" == typeof t ? e(this.element).find(t) : e(t);
                if (!s.length) throw new Error("Element is not found.");
                if (n && !s.hasClass(n)) throw new Error("Element(s) must have the ." + n + " class.");
                return i ? s[0] : s;
            }
        }, {
            key: "_getNodeOrCreate",
            value: function(t) {
                var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : o_DROPDOWN, i = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2];
                return this._getNode("string" != typeof t || "#" !== t[0] && "." !== t[0] ? e(t) : t, n, i);
            }
        }, {
            key: "_detectActiveItem",
            value: function() {
                var t = e(this.content).find("." + o_ITEM + "." + o_ACTIVE + ":not(." + o_DROPDOWN + ")");
                t.length && this.activateItem(t.first());
            }
        }, {
            key: "_expandDropdown",
            value: function(t) {
                function n() {
                    a.removeClass(o_TRANSITIONING).height(""), this._updateScrollbar(this.isCollapsed() ? e(t).parents("." + o_DROPDOWN_MENU_WRAPPER)[0] : this.content), 
                    this._triggerEvent("DROPDOWN_OPENED", t);
                }
                var i = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
                if (!pxUtil.hasClass(t, o_OPEN)) {
                    var a = e(t).find(s_DROPDOWN_MENU);
                    if (this.config.accordion && this._closeAllDropdowns(t.parentNode, i, e(t)), pxUtil.addClass(t, o_OPEN), 
                    !e.support.transition || !i) return n.call(this);
                    a.height(0).addClass(o_TRANSITIONING).one("bsTransitionEnd", e.proxy(n, this)).emulateTransitionEnd(this.config.transitionDuration).height(a[0].scrollHeight);
                }
            }
        }, {
            key: "_collapseDropdown",
            value: function(t) {
                function n() {
                    pxUtil.removeClass(t, o_OPEN), a.removeClass(o_TRANSITIONING).height(""), e(t).find("." + o_OPEN).removeClass(o_OPEN), 
                    this._updateScrollbar(this.isCollapsed() ? e(t).parents("." + o_DROPDOWN_MENU_WRAPPER)[0] : this.content), 
                    this._triggerEvent("DROPDOWN_CLOSED", t);
                }
                var i = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
                if (pxUtil.hasClass(t, o_OPEN)) {
                    var a = e(t).find(s_DROPDOWN_MENU);
                    if (!e.support.transition || !i) return n.call(this);
                    a.height(a.height())[0].offsetHeight, a.addClass(o_TRANSITIONING).height(0).one("bsTransitionEnd", e.proxy(n, this)).emulateTransitionEnd(this.config.transitionDuration);
                }
            }
        }, {
            key: "_showDropdown",
            value: function(t) {
                var n = this;
                if (!pxUtil.hasClass(t, o_SHOW) && this._isRootDropdown(t)) {
                    var i = t.parentNode.parentNode, a = e(t).find(s_DROPDOWN_MENU)[0];
                    if (a) {
                        this.closeAllDropdowns();
                        var l = t.parentNode.offsetTop, d = t.offsetTop - t.parentNode.scrollTop, p = e('<div class="' + o_DROPDOWN_MENU_TITLE + '"></div>').html(e(t).find(s_ITEM_LABEL).html()).prependTo(a);
                        pxUtil.addClass(t, o_SHOW), pxUtil.addClass(a, o_SHOW), i.appendChild(a);
                        var h = e(t).outerHeight(), u = e(a).find(s_ITEM), c = u.first().find("> a").outerHeight(), v = e(this.element).outerHeight() - l, f = p.outerHeight(), N = f + 3 * c, E = e('<div class="' + o_DROPDOWN_MENU_WRAPPER + '"></div>').append(u).appendTo(a)[0], D = void 0;
                        v < d + N ? (D = d, this.isFixed() || "tablet" === this._curMode ? a.style.bottom = v - d - h + "px" : a.style.bottom = "0px", 
                        pxUtil.addClass(a, o_DROPDOWN_MENU_TOP), a.appendChild(p[0])) : (D = v - d - f, 
                        a.style.top = l + d + "px", a.insertBefore(p[0], a.firstChild)), E.style.maxHeight = D - 10 + "px", 
                        e(E).perfectScrollbar(r), e(a).on(this.constructor.Event.MOUSEENTER, function() {
                            return n._clearDropdownTimer(t);
                        }).on(this.constructor.Event.MOUSELEAVE, function() {
                            return n._setDropdownTimer(t);
                        }), e(t).data("dropdown", a), e(a).data("element", t), this._updateScrollbar(t.parentNode), 
                        this._triggerEvent("DROPDOWN_OPENED", t);
                    }
                }
            }
        }, {
            key: "_hideDropdown",
            value: function(t) {
                if (pxUtil.hasClass(t, o_SHOW)) {
                    var n = e(t).data("dropdown");
                    if (n) {
                        pxUtil.removeClass(t, [ o_SHOW, o_FREEZE ]), pxUtil.removeClass(n, o_SHOW), pxUtil.removeClass(n, o_DROPDOWN_MENU_TOP), 
                        this.unfreezeDropdown(t);
                        var i = e(n).find("." + o_DROPDOWN_MENU_WRAPPER);
                        e(n).find("." + o_DROPDOWN_MENU_TITLE).remove(), e(n).append(i.find(s_ITEM)), i.perfectScrollbar("destroy").remove(), 
                        n.setAttribute("style", ""), t.appendChild(n), e(t).data("dropdown", null), e(n).data("element", null), 
                        this._clearDropdownTimer(t), e(n).off("mouseenter").off("mouseleave"), this._updateScrollbar(t.parentNode), 
                        this._triggerEvent("DROPDOWN_CLOSED", t);
                    }
                }
            }
        }, {
            key: "_showTooltip",
            value: function(t) {
                this._clearTooltips();
                var n = e(t).find(".px-nav-label").contents().filter(function() {
                    return 3 === this.nodeType;
                }).text(), i = e('<div class="' + o_TOOLTIP + '"></div>').text(n)[0], s = t.parentNode.offsetTop, a = t.offsetTop - t.parentNode.scrollTop;
                i.style.top = s + a + "px", e(i).data("dropdown", t), t.parentNode.parentNode.appendChild(i);
            }
        }, {
            key: "_updateTooltipPosition",
            value: function() {
                var t = e(this.element).find("." + o_TOOLTIP)[0];
                if (t) {
                    var n = e(t).data("dropdown");
                    if (n) {
                        var i = n.parentNode.offsetTop, s = n.offsetTop - n.parentNode.scrollTop;
                        t.style.top = i + s + "px";
                    } else e(t).remove();
                }
            }
        }, {
            key: "_clearTooltips",
            value: function() {
                e(this.element).find("." + o_TOOLTIP).remove();
            }
        }, {
            key: "_closeAllDropdowns",
            value: function(t, n) {
                var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null, a = this, r = void 0, l = void 0, d = t;
                l = this.isCollapsed() && pxUtil.hasClass(d, o_CONTENT) ? (r = s_SHOWN_DROPDOWNS, 
                "_hideDropdown") : (this._isFloatingDropdown(d) && this.isDropdownOpened(d) ? d = e(e(d).data("dropdown")).find("." + o_DROPDOWN_MENU_WRAPPER)[0] : pxUtil.hasClass(d, o_DROPDOWN) && (d = e(d).find(s_DROPDOWN_MENU)[0]), 
                r = s_OPENED_DROPDOWNS, "_collapseDropdown"), e(d).find(r).each(function() {
                    i && i === e(this) || a[l](this, n);
                });
            }
        }, {
            key: "_isRootDropdown",
            value: function(e) {
                return pxUtil.hasClass(e.parentNode, o_CONTENT);
            }
        }, {
            key: "_isFloatingDropdown",
            value: function(e) {
                return this.isCollapsed() && this._isRootDropdown(e);
            }
        }, {
            key: "_getNavState",
            value: function() {
                return ("phone" === this._curMode || "tablet" === this._curMode) && !pxUtil.hasClass(this.element, o_EXPAND) || "desktop" === this._curMode && pxUtil.hasClass(this.element, o_COLLAPSE);
            }
        }, {
            key: "_setDropdownTimer",
            value: function(t) {
                var n = this;
                if (!this.isDropdownFrozen(t)) {
                    this._clearDropdownTimer(t);
                    var i = setTimeout(function() {
                        n.isDropdownFrozen(t) || n._hideDropdown(t);
                    }, this.config.dropdownCloseDelay);
                    e(t).data("timer", i);
                }
            }
        }, {
            key: "_clearDropdownTimer",
            value: function(t) {
                var n = e(t).data("timer");
                n && clearTimeout(n);
            }
        }, {
            key: "_updateScrollbar",
            value: function(t) {
                t && pxUtil.hasClass(t, o_PERFECT_SCROLLBAR_CONTAINER) && e(t).perfectScrollbar("update");
            }
        }, {
            key: "_changeNavState",
            value: function(t) {
                function n() {
                    this._stateChanging = this._stateChanging < 2 ? 0 : this._stateChanging - 1, this._stateChanging || pxUtil.removeClass(this.element, o_NAV_TRANSITIONING), 
                    this._updateScrollbar(this.content), pxUtil.triggerResizeEvent();
                }
                if (this._stateChanging++, this.config.animate && e.support.transition && pxUtil.addClass(this.element, o_NAV_TRANSITIONING), 
                t.call(this), this._isCollapsed = this._getNavState(), this._storeNavState(), !this.config.animate || !e.support.transition) return n.call(this);
                e(this.element).one("bsTransitionEnd", e.proxy(n, this)).emulateTransitionEnd(this.config.transitionDuration);
            }
        }, {
            key: "_getMode",
            value: function() {
                var e = window.PixelAdmin.getScreenSize(), t = void 0;
                if (-1 !== this.config.modes.phone.indexOf(e)) t = "phone"; else if (-1 !== this.config.modes.tablet.indexOf(e)) t = "tablet"; else {
                    if (-1 === this.config.modes.desktop.indexOf(e)) throw new Error("Cannot determine PxNav mode.");
                    t = "desktop";
                }
                return t;
            }
        }, {
            key: "_prefixStorageKey",
            value: function(e) {
                return this.config.storagePrefix + (pxUtil.hasClass(this.element, o_NAV_LEFT) ? "left." : "right.") + e;
            }
        }, {
            key: "_storeNavState",
            value: function() {
                if (this.config.storeState) {
                    var e = this._prefixStorageKey("state"), t = pxUtil.hasClass(this.element, o_COLLAPSE) ? "collapsed" : "expanded";
                    window.PixelAdmin.storage.set(e, t);
                }
            }
        }, {
            key: "_restoreNavState",
            value: function() {
                if (this.config.storeState) {
                    var e = this._prefixStorageKey("state"), t = window.PixelAdmin.storage.get(e) || "expanded";
                    pxUtil["collapsed" === t ? "addClass" : "removeClass"](this.element, o_COLLAPSE), 
                    this._isCollapsed = this._getNavState(), pxUtil.triggerResizeEvent();
                }
            }
        }, {
            key: "_checkNavbarPosition",
            value: function() {
                if (this.isFixed()) {
                    var t = e(this.element).find(s_NEAR_NAVBAR)[0];
                    t && (pxUtil.hasClass(t.parentNode, o_NAVBAR_FIXED) || (console.warn("The " + (pxUtil.hasClass(this.element, o_NAV_LEFT) ? "left" : "right") + " .px-nav is fixed, but the coterminous .px-navbar isn't. You need to explicitly add the ." + o_NAVBAR_FIXED + " class to the parent element to fix the navbar."), 
                    pxUtil.addClass(t.parentNode, o_NAVBAR_FIXED)));
                }
            }
        }, {
            key: "_setupMarkup",
            value: function() {
                var t = e(this.element).parent();
                if (t.find("> ." + o_DIMMER).length || t.append('<div class="' + o_DIMMER + '"></div>'), 
                !e.fn.perfectScrollbar) throw new Error('Scrolling feature requires the "perfect-scrollbar" plugin included.');
                var n = e(this.content);
                n.length && n.wrap('<div class="' + o_SCROLLABLE_AREA + '"></div>').perfectScrollbar(r);
            }
        }, {
            key: "_setListeners",
            value: function() {
                var t = this, n = this;
                e(window).on(this.constructor.Event.RESIZE + "." + this.uniqueId, function() {
                    n._curMode = n._getMode(), n._isCollapsed = n._getNavState(), n.isCollapsed() && n.closeAllDropdowns(), 
                    n.config.enableTooltips && n._clearTooltips(), n._updateScrollbar(n.content);
                }), e(this.element).on(this.constructor.Event.CLICK, s_DROPDOWN_LINK, function(e) {
                    e.preventDefault();
                    var t = this.parentNode;
                    n._isFloatingDropdown(t) ? n.isDropdownOpened(t) ? n[n.isDropdownFrozen(t) ? "closeDropdown" : "freezeDropdown"](t) : (n.openDropdown(t), 
                    n.freezeDropdown(t)) : n.toggleDropdown(t);
                }), e(this.content).on(this.constructor.Event.MOUSEENTER, s_DROPDOWN_LINK, function() {
                    if (!window.PixelAdmin.isMobile) {
                        var t = this.parentNode;
                        if (n._isFloatingDropdown(t) && !pxUtil.hasClass(n.element, o_OFF_CANVAS)) if (n.isDropdownOpened(t)) n._clearDropdownTimer(t); else {
                            if (e(n.element).find(s_FROZEN_DROPDOWNS).length) return;
                            n.openDropdown(t);
                        }
                    }
                }).on(this.constructor.Event.MOUSELEAVE, s_DROPDOWN_LINK, function() {
                    if (!window.PixelAdmin.isMobile) {
                        var e = this.parentNode;
                        n._isFloatingDropdown(e) && n.isDropdownOpened(e) && n._setDropdownTimer(e);
                    }
                }).on(this.constructor.Event.MOUSEENTER, s_ROOT_LINK, function() {
                    window.PixelAdmin.isMobile || n.config.enableTooltips && n.isCollapsed() && !pxUtil.hasClass(n.element, o_OFF_CANVAS) && n._showTooltip(this.parentNode);
                }).on(this.constructor.Event.MOUSELEAVE, s_ROOT_LINK, function() {
                    window.PixelAdmin.isMobile || n.config.enableTooltips && n._clearTooltips();
                }).on(this.constructor.Event.SCROLL, function() {
                    t.isCollapsed() && (t.config.enableTooltips && t._updateTooltipPosition(), t.closeAllDropdowns());
                });
            }
        }, {
            key: "_unsetListeners",
            value: function() {
                e(window).off(this.constructor.Event.RESIZE + "." + this.uniqueId), e(this.element).off(".px.nav"), 
                e(this.content).off(".px.nav").find("." + o_DROPDOWN_MENU).off(".px.nav"), "desktop" !== this._curMode && pxUtil.hasClass(this.element, o_EXPAND) && e(this.dimmer).off(".px.nav");
            }
        }, {
            key: "_enableAnimation",
            value: function() {
                var e = this;
                this.config.animate && (pxUtil.addClass(this.element, [ "off", o_ANIMATE ]), setTimeout(function() {
                    pxUtil.removeClass(e.element, "off");
                }, this.config.transitionDuration));
            }
        }, {
            key: "_triggerEvent",
            value: function(t, n) {
                var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                e(this.element).trigger(e.Event(this.constructor.Event[t], {
                    target: n
                }), [ i ]);
            }
        }, {
            key: "_triggerPreventableEvent",
            value: function(t, n) {
                var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, o = e.Event(this.constructor.Event[t], {
                    target: n
                });
                return e(this.element).trigger(o, [ i ]), !o.isDefaultPrevented();
            }
        }, {
            key: "_getConfig",
            value: function(t) {
                return e.extend({}, this.constructor.Default, e(this.element).data(), t);
            }
        } ], [ {
            key: "_jQueryInterface",
            value: function(t) {
                for (var i = arguments.length, o = Array(1 < i ? i - 1 : 0), s = 1; s < i; s++) o[s - 1] = arguments[s];
                var a = void 0, r = this.each(function() {
                    var i = e(this).data("px.nav"), s = "object" === (void 0 === t ? "undefined" : _typeof(t)) ? t : null;
                    if (i || (i = new n(this, s), e(this).data("px.nav", i)), "string" == typeof t) {
                        if (!i[t]) throw new Error('No method named "' + t + '"');
                        a = i[t].apply(i, o);
                    }
                });
                return void 0 !== a ? a : r;
            }
        }, {
            key: "Default",
            get: function() {
                return i;
            }
        }, {
            key: "NAME",
            get: function() {
                return t;
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return "px.nav";
            }
        }, {
            key: "Event",
            get: function() {
                return a;
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return ".px.nav";
            }
        } ]), n;
    }();
    return e(document).on(a.CLICK_DATA_API, s_DATA_TOGGLE, function(t) {
        t.preventDefault();
        var n = e(e(this).data("target"));
        n.length || (n = e(this).parents("." + o_NAV)), n.length && (n.data("px.nav") || l._jQueryInterface.call(n, e(this).data()), 
        l._jQueryInterface.call(n, "toggle"));
    }), e.fn[t] = l._jQueryInterface, e.fn[t].Constructor = l, e.fn[t].noConflict = function() {
        return e.fn[t] = n, l._jQueryInterface;
    }, l;
}(jQuery);