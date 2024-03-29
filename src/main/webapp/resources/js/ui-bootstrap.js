angular.module("ui.bootstrap", [ "ui.bootstrap.tpls", "ui.bootstrap.buttons", "ui.bootstrap.multiMap", "ui.bootstrap.stackedMap", "ui.bootstrap.position", "ui.bootstrap.paging", "ui.bootstrap.tabindex", "ui.bootstrap.debounce", "ui.bootstrap.dropdown", "ui.bootstrap.tabs", "ui.bootstrap.collapse", "ui.bootstrap.pager", "ui.bootstrap.pagination", "ui.bootstrap.alert", "ui.bootstrap.progressbar", "ui.bootstrap.modal", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.carousel", "ui.bootstrap.accordion", "ui.bootstrap.typeahead" ]), 
angular.module("ui.bootstrap.tpls", [ "uib/template/tabs/tab.html", "uib/template/tabs/tabset.html", "uib/template/pager/pager.html", "uib/template/pagination/pagination.html", "uib/template/alert/alert.html", "uib/template/progressbar/progressbar.html", "uib/template/progressbar/progress.html", "uib/template/progressbar/bar.html", "uib/template/modal/window.html", "uib/template/tooltip/tooltip-popup.html", "uib/template/tooltip/tooltip-html-popup.html", "uib/template/tooltip/tooltip-template-popup.html", "uib/template/popover/popover.html", "uib/template/popover/popover-html.html", "uib/template/popover/popover-template.html", "uib/template/carousel/carousel.html", "uib/template/carousel/slide.html", "uib/template/accordion/accordion-group.html", "uib/template/accordion/accordion.html", "uib/template/typeahead/typeahead-match.html", "uib/template/typeahead/typeahead-popup.html" ]), 
angular.module("ui.bootstrap.buttons", []).constant("uibButtonConfig", {
    activeClass: "active",
    toggleEvent: "click"
}).controller("UibButtonsController", [ "uibButtonConfig", function(e) {
    this.activeClass = e.activeClass || "active", this.toggleEvent = e.toggleEvent || "click";
} ]).directive("uibBtnRadio", [ "$parse", function(e) {
    return {
        require: [ "uibBtnRadio", "ngModel" ],
        controller: "UibButtonsController",
        controllerAs: "buttons",
        link: function(t, n, o, a) {
            var i = a[0], r = a[1], l = e(o.uibUncheckable);
            n.find("input").css({
                display: "none"
            }), r.$render = function() {
                n.toggleClass(i.activeClass, angular.equals(r.$modelValue, t.$eval(o.uibBtnRadio)));
            }, n.on(i.toggleEvent, function() {
                if (!o.disabled) {
                    var e = n.hasClass(i.activeClass);
                    e && !angular.isDefined(o.uncheckable) || t.$apply(function() {
                        r.$setViewValue(e ? null : t.$eval(o.uibBtnRadio)), r.$render();
                    });
                }
            }), o.uibUncheckable && t.$watch(l, function(e) {
                o.$set("uncheckable", e ? "" : void 0);
            });
        }
    };
} ]).directive("uibBtnCheckbox", function() {
    return {
        require: [ "uibBtnCheckbox", "ngModel" ],
        controller: "UibButtonsController",
        controllerAs: "button",
        link: function(e, t, n, o) {
            function a() {
                return r(n.btnCheckboxTrue, !0);
            }
            function r(t, n) {
                return angular.isDefined(t) ? e.$eval(t) : n;
            }
            var l = o[0], s = o[1];
            t.find("input").css({
                display: "none"
            }), s.$render = function() {
                t.toggleClass(l.activeClass, angular.equals(s.$modelValue, a()));
            }, t.on(l.toggleEvent, function() {
                n.disabled || e.$apply(function() {
                    s.$setViewValue(t.hasClass(l.activeClass) ? r(n.btnCheckboxFalse, !1) : a()), s.$render();
                });
            });
        }
    };
}), angular.module("ui.bootstrap.multiMap", []).factory("$$multiMap", function() {
    return {
        createNew: function() {
            var e = {};
            return {
                entries: function() {
                    return Object.keys(e).map(function(t) {
                        return {
                            key: t,
                            value: e[t]
                        };
                    });
                },
                get: function(t) {
                    return e[t];
                },
                hasKey: function(t) {
                    return !!e[t];
                },
                keys: function() {
                    return Object.keys(e);
                },
                put: function(t, n) {
                    e[t] || (e[t] = []), e[t].push(n);
                },
                remove: function(t, n) {
                    var o = e[t];
                    if (o) {
                        var a = o.indexOf(n);
                        -1 !== a && o.splice(a, 1), o.length || delete e[t];
                    }
                }
            };
        }
    };
}), angular.module("ui.bootstrap.stackedMap", []).factory("$$stackedMap", function() {
    return {
        createNew: function() {
            var e = [];
            return {
                add: function(t, n) {
                    e.push({
                        key: t,
                        value: n
                    });
                },
                get: function(t) {
                    for (var n = 0; n < e.length; n++) if (t === e[n].key) return e[n];
                },
                keys: function() {
                    for (var t = [], n = 0; n < e.length; n++) t.push(e[n].key);
                    return t;
                },
                top: function() {
                    return e[e.length - 1];
                },
                remove: function(t) {
                    for (var n = -1, o = 0; o < e.length; o++) if (t === e[o].key) {
                        n = o;
                        break;
                    }
                    return e.splice(n, 1)[0];
                },
                removeTop: function() {
                    return e.pop();
                },
                length: function() {
                    return e.length;
                }
            };
        }
    };
}), angular.module("ui.bootstrap.position", []).factory("$uibPosition", [ "$document", "$window", function(e, t) {
    var n, o, a = {
        normal: /(auto|scroll)/,
        hidden: /(auto|scroll|hidden)/
    }, i = {
        auto: /\s?auto?\s?/i,
        primary: /^(top|bottom|left|right)$/,
        secondary: /^(top|bottom|left|right|center)$/,
        vertical: /^(top|bottom)$/
    }, r = /(HTML|BODY)/;
    return {
        getRawNode: function(e) {
            return e.nodeName ? e : e[0] || e;
        },
        parseStyle: function(e) {
            return e = parseFloat(e), isFinite(e) ? e : 0;
        },
        offsetParent: function(n) {
            for (var o = (n = this.getRawNode(n)).offsetParent || e[0].documentElement; o && o !== e[0].documentElement && function(e) {
                return "static" === (t.getComputedStyle(e).position || "static");
            }(o); ) o = o.offsetParent;
            return o || e[0].documentElement;
        },
        scrollbarWidth: function(a) {
            if (a) {
                if (angular.isUndefined(o)) {
                    var i = e.find("body");
                    i.addClass("uib-position-body-scrollbar-measure"), o = t.innerWidth - i[0].clientWidth, 
                    o = isFinite(o) ? o : 0, i.removeClass("uib-position-body-scrollbar-measure");
                }
                return o;
            }
            if (angular.isUndefined(n)) {
                var r = angular.element('<div class="uib-position-scrollbar-measure"></div>');
                e.find("body").append(r), n = r[0].offsetWidth - r[0].clientWidth, n = isFinite(n) ? n : 0, 
                r.remove();
            }
            return n;
        },
        scrollbarPadding: function(e) {
            e = this.getRawNode(e);
            var n = t.getComputedStyle(e), o = this.parseStyle(n.paddingRight), a = this.parseStyle(n.paddingBottom), i = this.scrollParent(e, !1, !0), l = this.scrollbarWidth(r.test(i.tagName));
            return {
                scrollbarWidth: l,
                widthOverflow: i.scrollWidth > i.clientWidth,
                right: o + l,
                originalRight: o,
                heightOverflow: i.scrollHeight > i.clientHeight,
                bottom: a + l,
                originalBottom: a
            };
        },
        isScrollable: function(e, n) {
            e = this.getRawNode(e);
            var o = n ? a.hidden : a.normal, i = t.getComputedStyle(e);
            return o.test(i.overflow + i.overflowY + i.overflowX);
        },
        scrollParent: function(n, o, i) {
            n = this.getRawNode(n);
            var r = o ? a.hidden : a.normal, l = e[0].documentElement, s = t.getComputedStyle(n);
            if (i && r.test(s.overflow + s.overflowY + s.overflowX)) return n;
            var p = "absolute" === s.position, u = n.parentElement || l;
            if (u === l || "fixed" === s.position) return l;
            for (;u.parentElement && u !== l; ) {
                var c = t.getComputedStyle(u);
                if (p && "static" !== c.position && (p = !1), !p && r.test(c.overflow + c.overflowY + c.overflowX)) break;
                u = u.parentElement;
            }
            return u;
        },
        position: function(n, o) {
            n = this.getRawNode(n);
            var a = this.offset(n);
            if (o) {
                var i = t.getComputedStyle(n);
                a.top -= this.parseStyle(i.marginTop), a.left -= this.parseStyle(i.marginLeft);
            }
            var r = this.offsetParent(n), l = {
                top: 0,
                left: 0
            };
            return r !== e[0].documentElement && ((l = this.offset(r)).top += r.clientTop - r.scrollTop, 
            l.left += r.clientLeft - r.scrollLeft), {
                width: Math.round(angular.isNumber(a.width) ? a.width : n.offsetWidth),
                height: Math.round(angular.isNumber(a.height) ? a.height : n.offsetHeight),
                top: Math.round(a.top - l.top),
                left: Math.round(a.left - l.left)
            };
        },
        offset: function(n) {
            var o = (n = this.getRawNode(n)).getBoundingClientRect();
            return {
                width: Math.round(angular.isNumber(o.width) ? o.width : n.offsetWidth),
                height: Math.round(angular.isNumber(o.height) ? o.height : n.offsetHeight),
                top: Math.round(o.top + (t.pageYOffset || e[0].documentElement.scrollTop)),
                left: Math.round(o.left + (t.pageXOffset || e[0].documentElement.scrollLeft))
            };
        },
        viewportOffset: function(n, o, a) {
            a = !1 !== a;
            var i = (n = this.getRawNode(n)).getBoundingClientRect(), r = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }, l = o ? e[0].documentElement : this.scrollParent(n), s = l.getBoundingClientRect();
            if (r.top = s.top + l.clientTop, r.left = s.left + l.clientLeft, l === e[0].documentElement && (r.top += t.pageYOffset, 
            r.left += t.pageXOffset), r.bottom = r.top + l.clientHeight, r.right = r.left + l.clientWidth, 
            a) {
                var p = t.getComputedStyle(l);
                r.top += this.parseStyle(p.paddingTop), r.bottom -= this.parseStyle(p.paddingBottom), 
                r.left += this.parseStyle(p.paddingLeft), r.right -= this.parseStyle(p.paddingRight);
            }
            return {
                top: Math.round(i.top - r.top),
                bottom: Math.round(r.bottom - i.bottom),
                left: Math.round(i.left - r.left),
                right: Math.round(r.right - i.right)
            };
        },
        parsePlacement: function(e) {
            var t = i.auto.test(e);
            return t && (e = e.replace(i.auto, "")), (e = e.split("-"))[0] = e[0] || "top", 
            i.primary.test(e[0]) || (e[0] = "top"), e[1] = e[1] || "center", i.secondary.test(e[1]) || (e[1] = "center"), 
            e[2] = !!t, e;
        },
        positionElements: function(e, n, o, a) {
            e = this.getRawNode(e), n = this.getRawNode(n);
            var r = angular.isDefined(n.offsetWidth) ? n.offsetWidth : n.prop("offsetWidth"), l = angular.isDefined(n.offsetHeight) ? n.offsetHeight : n.prop("offsetHeight");
            o = this.parsePlacement(o);
            var s = a ? this.offset(e) : this.position(e), p = {
                top: 0,
                left: 0,
                placement: ""
            };
            if (o[2]) {
                var u = this.viewportOffset(e, a), c = t.getComputedStyle(n), d_width = r + Math.round(Math.abs(this.parseStyle(c.marginLeft) + this.parseStyle(c.marginRight))), d_height = l + Math.round(Math.abs(this.parseStyle(c.marginTop) + this.parseStyle(c.marginBottom)));
                if (o[0] = "top" === o[0] && d_height > u.top && d_height <= u.bottom ? "bottom" : "bottom" === o[0] && d_height > u.bottom && d_height <= u.top ? "top" : "left" === o[0] && d_width > u.left && d_width <= u.right ? "right" : "right" === o[0] && d_width > u.right && d_width <= u.left ? "left" : o[0], 
                o[1] = "top" === o[1] && d_height - s.height > u.bottom && d_height - s.height <= u.top ? "bottom" : "bottom" === o[1] && d_height - s.height > u.top && d_height - s.height <= u.bottom ? "top" : "left" === o[1] && d_width - s.width > u.right && d_width - s.width <= u.left ? "right" : "right" === o[1] && d_width - s.width > u.left && d_width - s.width <= u.right ? "left" : o[1], 
                "center" === o[1]) if (i.vertical.test(o[0])) {
                    var f = s.width / 2 - r / 2;
                    u.left + f < 0 && d_width - s.width <= u.right ? o[1] = "left" : u.right + f < 0 && d_width - s.width <= u.left && (o[1] = "right");
                } else {
                    var m = s.height / 2 - d_height / 2;
                    u.top + m < 0 && d_height - s.height <= u.bottom ? o[1] = "top" : u.bottom + m < 0 && d_height - s.height <= u.top && (o[1] = "bottom");
                }
            }
            switch (o[0]) {
              case "top":
                p.top = s.top - l;
                break;

              case "bottom":
                p.top = s.top + s.height;
                break;

              case "left":
                p.left = s.left - r;
                break;

              case "right":
                p.left = s.left + s.width;
            }
            switch (o[1]) {
              case "top":
                p.top = s.top;
                break;

              case "bottom":
                p.top = s.top + s.height - l;
                break;

              case "left":
                p.left = s.left;
                break;

              case "right":
                p.left = s.left + s.width - r;
                break;

              case "center":
                i.vertical.test(o[0]) ? p.left = s.left + s.width / 2 - r / 2 : p.top = s.top + s.height / 2 - l / 2;
            }
            return p.top = Math.round(p.top), p.left = Math.round(p.left), p.placement = "center" === o[1] ? o[0] : o[0] + "-" + o[1], 
            p;
        },
        adjustTop: function(e, t, n, o) {
            if (-1 !== e.indexOf("top") && n !== o) return {
                top: t.top - o + "px"
            };
        },
        positionArrow: function(e, n) {
            var o = (e = this.getRawNode(e)).querySelector(".tooltip-inner, .popover-inner");
            if (o) {
                var a = angular.element(o).hasClass("tooltip-inner"), r = a ? e.querySelector(".tooltip-arrow") : e.querySelector(".arrow");
                if (r) {
                    var l = {
                        top: "",
                        bottom: "",
                        left: "",
                        right: ""
                    };
                    if ("center" !== (n = this.parsePlacement(n))[1]) {
                        var s = "border-" + n[0] + "-width", p = t.getComputedStyle(r)[s], u = "border-";
                        i.vertical.test(n[0]) ? u += n[0] + "-" + n[1] : u += n[1] + "-" + n[0], u += "-radius";
                        var c = t.getComputedStyle(a ? o : e)[u];
                        switch (n[0]) {
                          case "top":
                            l.bottom = a ? "0" : "-" + p;
                            break;

                          case "bottom":
                            l.top = a ? "0" : "-" + p;
                            break;

                          case "left":
                            l.right = a ? "0" : "-" + p;
                            break;

                          case "right":
                            l.left = a ? "0" : "-" + p;
                        }
                        l[n[1]] = c, angular.element(r).css(l);
                    } else angular.element(r).css(l);
                }
            }
        }
    };
} ]), angular.module("ui.bootstrap.paging", []).factory("uibPaging", [ "$parse", function(e) {
    return {
        create: function(t, n, o) {
            t.setNumPages = o.numPages ? e(o.numPages).assign : angular.noop, t.ngModelCtrl = {
                $setViewValue: angular.noop
            }, t._watchers = [], t.init = function(e, a) {
                t.ngModelCtrl = e, t.config = a, e.$render = function() {
                    t.render();
                }, o.itemsPerPage ? t._watchers.push(n.$parent.$watch(o.itemsPerPage, function(e) {
                    t.itemsPerPage = parseInt(e, 10), n.totalPages = t.calculateTotalPages(), t.updatePage();
                })) : t.itemsPerPage = a.itemsPerPage, n.$watch("totalItems", function(e, o) {
                    (angular.isDefined(e) || e !== o) && (n.totalPages = t.calculateTotalPages(), t.updatePage());
                });
            }, t.calculateTotalPages = function() {
                var e = t.itemsPerPage < 1 ? 1 : Math.ceil(n.totalItems / t.itemsPerPage);
                return Math.max(e || 0, 1);
            }, t.render = function() {
                n.page = parseInt(t.ngModelCtrl.$viewValue, 10) || 1;
            }, n.selectPage = function(e, o) {
                o && o.preventDefault(), (!n.ngDisabled || !o) && n.page !== e && 0 < e && e <= n.totalPages && (o && o.target && o.target.blur(), 
                t.ngModelCtrl.$setViewValue(e), t.ngModelCtrl.$render());
            }, n.getText = function(e) {
                return n[e + "Text"] || t.config[e + "Text"];
            }, n.noPrevious = function() {
                return 1 === n.page;
            }, n.noNext = function() {
                return n.page === n.totalPages;
            }, t.updatePage = function() {
                t.setNumPages(n.$parent, n.totalPages), n.page > n.totalPages ? n.selectPage(n.totalPages) : t.ngModelCtrl.$render();
            }, n.$on("$destroy", function() {
                for (;t._watchers.length; ) t._watchers.shift()();
            });
        }
    };
} ]), angular.module("ui.bootstrap.tabindex", []).directive("uibTabindexToggle", function() {
    return {
        restrict: "A",
        link: function(e, t, n) {
            n.$observe("disabled", function(e) {
                n.$set("tabindex", e ? -1 : null);
            });
        }
    };
}), angular.module("ui.bootstrap.debounce", []).factory("$$debounce", [ "$timeout", function(e) {
    return function(t, n) {
        var o;
        return function() {
            var a = this, i = Array.prototype.slice.call(arguments);
            o && e.cancel(o), o = e(function() {
                t.apply(a, i);
            }, n);
        };
    };
} ]), angular.module("ui.bootstrap.dropdown", [ "ui.bootstrap.multiMap", "ui.bootstrap.position" ]).constant("uibDropdownConfig", {
    appendToOpenClass: "uib-dropdown-open",
    openClass: "open"
}).service("uibDropdownService", [ "$document", "$rootScope", "$$multiMap", function(e, t, n) {
    var o = null, a = n.createNew();
    this.isOnlyOpen = function(e, t) {
        var n = a.get(t);
        return !(!n || !n.reduce(function(t, n) {
            return n.scope === e ? n : t;
        }, {})) && 1 === n.length;
    }, this.open = function(t, n, r) {
        if (o || e.on("click", i), o && o !== t && (o.isOpen = !1), o = t, r) {
            var l = a.get(r);
            l ? -1 === l.map(function(e) {
                return e.scope;
            }).indexOf(t) && a.put(r, {
                scope: t
            }) : a.put(r, {
                scope: t
            });
        }
    }, this.close = function(t, n, r) {
        if (o === t && (e.off("click", i), e.off("keydown", this.keybindFilter), o = null), 
        r) {
            var l = a.get(r);
            if (l) {
                var s = l.reduce(function(e, n) {
                    return n.scope === t ? n : e;
                }, {});
                s && a.remove(r, s);
            }
        }
    };
    var i = function(e) {
        if (o && o.isOpen && !(e && "disabled" === o.getAutoClose() || e && 3 === e.which)) {
            var n = o.getToggleElement();
            if (!(e && n && n[0].contains(e.target))) {
                var a = o.getDropdownElement();
                e && "outsideClick" === o.getAutoClose() && a && a[0].contains(e.target) || (o.focusToggleElement(), 
                o.isOpen = !1, t.$$phase || o.$apply());
            }
        }
    };
    this.keybindFilter = function(e) {
        if (o) {
            var t = o.getDropdownElement(), n = o.getToggleElement(), a = t && t[0].contains(e.target), r = n && n[0].contains(e.target);
            27 === e.which ? (e.stopPropagation(), o.focusToggleElement(), i()) : o.isKeynavEnabled() && -1 !== [ 38, 40 ].indexOf(e.which) && o.isOpen && (a || r) && (e.preventDefault(), 
            e.stopPropagation(), o.focusDropdownEntry(e.which));
        }
    };
} ]).controller("UibDropdownController", [ "$scope", "$element", "$attrs", "$parse", "uibDropdownConfig", "uibDropdownService", "$animate", "$uibPosition", "$document", "$compile", "$templateRequest", function(e, t, n, o, a, i, r, l, s, p, u) {
    function c() {
        t.append(m.dropdownMenu);
    }
    var d, f, m = this, g = e.$new(), b = a.appendToOpenClass, h = a.openClass, v = angular.noop, $ = n.onToggle ? o(n.onToggle) : angular.noop, w = !1, y = s.find("body");
    t.addClass("dropdown"), this.init = function() {
        n.isOpen && (f = o(n.isOpen), v = f.assign, e.$watch(f, function(e) {
            g.isOpen = !!e;
        })), w = angular.isDefined(n.keyboardNav);
    }, this.toggle = function(e) {
        return g.isOpen = arguments.length ? !!e : !g.isOpen, angular.isFunction(v) && v(g, g.isOpen), 
        g.isOpen;
    }, this.isOpen = function() {
        return g.isOpen;
    }, g.getToggleElement = function() {
        return m.toggleElement;
    }, g.getAutoClose = function() {
        return n.autoClose || "always";
    }, g.getElement = function() {
        return t;
    }, g.isKeynavEnabled = function() {
        return w;
    }, g.focusDropdownEntry = function(e) {
        var n = m.dropdownMenu ? angular.element(m.dropdownMenu).find("a") : t.find("ul").eq(0).find("a");
        switch (e) {
          case 40:
            angular.isNumber(m.selectedOption) ? m.selectedOption = m.selectedOption === n.length - 1 ? m.selectedOption : m.selectedOption + 1 : m.selectedOption = 0;
            break;

          case 38:
            angular.isNumber(m.selectedOption) ? m.selectedOption = 0 === m.selectedOption ? 0 : m.selectedOption - 1 : m.selectedOption = n.length - 1;
        }
        n[m.selectedOption].focus();
    }, g.getDropdownElement = function() {
        return m.dropdownMenu;
    }, g.focusToggleElement = function() {
        m.toggleElement && m.toggleElement[0].focus();
    }, g.$watch("isOpen", function(a, f) {
        var w = null, C = !1;
        if (angular.isDefined(n.dropdownAppendTo)) {
            var x = o(n.dropdownAppendTo)(g);
            x && (w = angular.element(x));
        }
        if (angular.isDefined(n.dropdownAppendToBody) && !1 !== o(n.dropdownAppendToBody)(g) && (C = !0), 
        C && !w && (w = y), w && m.dropdownMenu && (a ? (w.append(m.dropdownMenu), t.on("$destroy", c)) : (t.off("$destroy", c), 
        c())), w && m.dropdownMenu) {
            var T, k, P, D = l.positionElements(t, m.dropdownMenu, "bottom-left", !0), O = 0;
            if (T = {
                top: D.top + "px",
                display: a ? "block" : "none"
            }, (k = m.dropdownMenu.hasClass("dropdown-menu-right")) ? (T.left = "auto", (P = l.scrollbarPadding(w)).heightOverflow && P.scrollbarWidth && (O = P.scrollbarWidth), 
            T.right = window.innerWidth - O - (D.left + t.prop("offsetWidth")) + "px") : (T.left = D.left + "px", 
            T.right = "auto"), !C) {
                var E = l.offset(w);
                T.top = D.top - E.top + "px", k ? T.right = window.innerWidth - (D.left - E.left + t.prop("offsetWidth")) + "px" : T.left = D.left - E.left + "px";
            }
            m.dropdownMenu.css(T);
        }
        var M = w || t, A = w ? b : h, S = M.hasClass(A), U = i.isOnlyOpen(e, w);
        if (S === !a && r[w ? U ? "removeClass" : "addClass" : a ? "addClass" : "removeClass"](M, A).then(function() {
            angular.isDefined(a) && a !== f && $(e, {
                open: !!a
            });
        }), a) m.dropdownMenuTemplateUrl ? u(m.dropdownMenuTemplateUrl).then(function(e) {
            d = g.$new(), p(e.trim())(d, function(e) {
                var t = e;
                m.dropdownMenu.replaceWith(t), m.dropdownMenu = t, s.on("keydown", i.keybindFilter);
            });
        }) : s.on("keydown", i.keybindFilter), g.focusToggleElement(), i.open(g, t, w); else {
            if (i.close(g, t, w), m.dropdownMenuTemplateUrl) {
                d && d.$destroy();
                var I = angular.element('<ul class="dropdown-menu"></ul>');
                m.dropdownMenu.replaceWith(I), m.dropdownMenu = I;
            }
            m.selectedOption = null;
        }
        angular.isFunction(v) && v(e, a);
    });
} ]).directive("uibDropdown", function() {
    return {
        controller: "UibDropdownController",
        link: function(e, t, n, o) {
            o.init();
        }
    };
}).directive("uibDropdownMenu", function() {
    return {
        restrict: "A",
        require: "?^uibDropdown",
        link: function(e, t, n, o) {
            if (o && !angular.isDefined(n.dropdownNested)) {
                t.addClass("dropdown-menu");
                var a = n.templateUrl;
                a && (o.dropdownMenuTemplateUrl = a), o.dropdownMenu || (o.dropdownMenu = t);
            }
        }
    };
}).directive("uibDropdownToggle", function() {
    return {
        require: "?^uibDropdown",
        link: function(e, t, n, o) {
            if (o) {
                t.addClass("dropdown-toggle"), o.toggleElement = t;
                var a = function(a) {
                    a.preventDefault(), t.hasClass("disabled") || n.disabled || e.$apply(function() {
                        o.toggle();
                    });
                };
                t.on("click", a), t.attr({
                    "aria-haspopup": !0,
                    "aria-expanded": !1
                }), e.$watch(o.isOpen, function(e) {
                    t.attr("aria-expanded", !!e);
                }), e.$on("$destroy", function() {
                    t.off("click", a);
                });
            }
        }
    };
}), angular.module("ui.bootstrap.tabs", []).controller("UibTabsetController", [ "$scope", function(e) {
    function t(e) {
        for (var t = 0; t < o.tabs.length; t++) if (o.tabs[t].index === e) return t;
    }
    var n, a, o = this;
    o.tabs = [], o.select = function(e, i) {
        if (!a) {
            var r = t(n), l = o.tabs[r];
            if (l) {
                if (l.tab.onDeselect({
                    $event: i,
                    $selectedIndex: e
                }), i && i.isDefaultPrevented()) return;
                l.tab.active = !1;
            }
            var s = o.tabs[e];
            s ? (s.tab.onSelect({
                $event: i
            }), s.tab.active = !0, o.active = s.index, n = s.index) : !s && angular.isDefined(n) && (o.active = null, 
            n = null);
        }
    }, o.addTab = function(e) {
        if (o.tabs.push({
            tab: e,
            index: e.index
        }), o.tabs.sort(function(e, t) {
            return e.index > t.index ? 1 : e.index < t.index ? -1 : 0;
        }), e.index === o.active || !angular.isDefined(o.active) && 1 === o.tabs.length) {
            var n = t(e.index);
            o.select(n);
        }
    }, o.removeTab = function(e) {
        for (var t, n = 0; n < o.tabs.length; n++) if (o.tabs[n].tab === e) {
            t = n;
            break;
        }
        if (o.tabs[t].index === o.active) {
            var a = t === o.tabs.length - 1 ? t - 1 : t + 1 % o.tabs.length;
            o.select(a);
        }
        o.tabs.splice(t, 1);
    }, e.$watch("tabset.active", function(e) {
        angular.isDefined(e) && e !== n && o.select(t(e));
    }), e.$on("$destroy", function() {
        a = !0;
    });
} ]).directive("uibTabset", function() {
    return {
        transclude: !0,
        replace: !0,
        scope: {},
        bindToController: {
            active: "=?",
            type: "@"
        },
        controller: "UibTabsetController",
        controllerAs: "tabset",
        templateUrl: function(e, t) {
            return t.templateUrl || "uib/template/tabs/tabset.html";
        },
        link: function(e, t, n) {
            e.vertical = !!angular.isDefined(n.vertical) && e.$parent.$eval(n.vertical), e.justified = !!angular.isDefined(n.justified) && e.$parent.$eval(n.justified);
        }
    };
}).directive("uibTab", [ "$parse", function(e) {
    return {
        require: "^uibTabset",
        replace: !0,
        templateUrl: function(e, t) {
            return t.templateUrl || "uib/template/tabs/tab.html";
        },
        transclude: !0,
        scope: {
            heading: "@",
            index: "=?",
            classes: "@?",
            onSelect: "&select",
            onDeselect: "&deselect"
        },
        controller: function() {},
        controllerAs: "tab",
        link: function(t, n, o, a, i) {
            t.disabled = !1, o.disable && t.$parent.$watch(e(o.disable), function(e) {
                t.disabled = !!e;
            }), angular.isUndefined(o.index) && (a.tabs && a.tabs.length ? t.index = Math.max.apply(null, a.tabs.map(function(e) {
                return e.index;
            })) + 1 : t.index = 0), angular.isUndefined(o.classes) && (t.classes = ""), t.select = function(e) {
                if (!t.disabled) {
                    for (var n, o = 0; o < a.tabs.length; o++) if (a.tabs[o].tab === t) {
                        n = o;
                        break;
                    }
                    a.select(n, e);
                }
            }, a.addTab(t), t.$on("$destroy", function() {
                a.removeTab(t);
            }), t.$transcludeFn = i;
        }
    };
} ]).directive("uibTabHeadingTransclude", function() {
    return {
        restrict: "A",
        require: "^uibTab",
        link: function(e, t) {
            e.$watch("headingElement", function(e) {
                e && (t.html(""), t.append(e));
            });
        }
    };
}).directive("uibTabContentTransclude", function() {
    return {
        restrict: "A",
        require: "^uibTabset",
        link: function(t, n, o) {
            var a = t.$eval(o.uibTabContentTransclude).tab;
            a.$transcludeFn(a.$parent, function(t) {
                angular.forEach(t, function(t) {
                    !function(e) {
                        return e.tagName && (e.hasAttribute("uib-tab-heading") || e.hasAttribute("data-uib-tab-heading") || e.hasAttribute("x-uib-tab-heading") || "uib-tab-heading" === e.tagName.toLowerCase() || "data-uib-tab-heading" === e.tagName.toLowerCase() || "x-uib-tab-heading" === e.tagName.toLowerCase() || "uib:tab-heading" === e.tagName.toLowerCase());
                    }(t) ? n.append(t) : a.headingElement = t;
                });
            });
        }
    };
}), angular.module("ui.bootstrap.collapse", []).directive("uibCollapse", [ "$animate", "$q", "$parse", "$injector", function(e, t, n, o) {
    var a = o.has("$animateCss") ? o.get("$animateCss") : null;
    return {
        link: function(o, i, r) {
            function l(e) {
                return b ? {
                    width: e.scrollWidth + "px"
                } : {
                    height: e.scrollHeight + "px"
                };
            }
            function s() {
                i.hasClass("collapse") && i.hasClass("in") || t.resolve(d(o)).then(function() {
                    i.removeClass("collapse").addClass("collapsing").attr("aria-expanded", !0).attr("aria-hidden", !1), 
                    a ? a(i, {
                        addClass: "in",
                        easing: "ease",
                        css: {
                            overflow: "hidden"
                        },
                        to: l(i[0])
                    }).start().finally(p) : e.addClass(i, "in", {
                        css: {
                            overflow: "hidden"
                        },
                        to: l(i[0])
                    }).then(p);
                }, angular.noop);
            }
            function p() {
                i.removeClass("collapsing").addClass("collapse").css(h), f(o);
            }
            function u() {
                if (!i.hasClass("collapse") && !i.hasClass("in")) return c();
                t.resolve(m(o)).then(function() {
                    i.css(l(i[0])).removeClass("collapse").addClass("collapsing").attr("aria-expanded", !1).attr("aria-hidden", !0), 
                    a ? a(i, {
                        removeClass: "in",
                        to: v
                    }).start().finally(c) : e.removeClass(i, "in", {
                        to: v
                    }).then(c);
                }, angular.noop);
            }
            function c() {
                i.css(v), i.removeClass("collapsing").addClass("collapse"), g(o);
            }
            var d = n(r.expanding), f = n(r.expanded), m = n(r.collapsing), g = n(r.collapsed), b = !1, h = {}, v = {};
            v = (b = !!("horizontal" in r)) ? (h = {
                width: ""
            }, {
                width: "0"
            }) : (h = {
                height: ""
            }, {
                height: "0"
            }), o.$eval(r.uibCollapse) || i.addClass("in").addClass("collapse").attr("aria-expanded", !0).attr("aria-hidden", !1).css(h), 
            o.$watch(r.uibCollapse, function(e) {
                e ? u() : s();
            });
        }
    };
} ]), angular.module("ui.bootstrap.pager", [ "ui.bootstrap.paging", "ui.bootstrap.tabindex" ]).controller("UibPagerController", [ "$scope", "$attrs", "uibPaging", "uibPagerConfig", function(e, t, n, o) {
    e.align = angular.isDefined(t.align) ? e.$parent.$eval(t.align) : o.align, n.create(this, e, t);
} ]).constant("uibPagerConfig", {
    itemsPerPage: 10,
    previousText: "« Previous",
    nextText: "Next »",
    align: !0
}).directive("uibPager", [ "uibPagerConfig", function(e) {
    return {
        scope: {
            totalItems: "=",
            previousText: "@",
            nextText: "@",
            ngDisabled: "="
        },
        require: [ "uibPager", "?ngModel" ],
        restrict: "A",
        controller: "UibPagerController",
        controllerAs: "pager",
        templateUrl: function(e, t) {
            return t.templateUrl || "uib/template/pager/pager.html";
        },
        link: function(t, n, o, a) {
            n.addClass("pager");
            var i = a[0], r = a[1];
            r && i.init(r, e);
        }
    };
} ]), angular.module("ui.bootstrap.pagination", [ "ui.bootstrap.paging", "ui.bootstrap.tabindex" ]).controller("UibPaginationController", [ "$scope", "$attrs", "$parse", "uibPaging", "uibPaginationConfig", function(e, t, n, o, a) {
    function i(e, t, n) {
        return {
            number: e,
            text: t,
            active: n
        };
    }
    var l = this, s = angular.isDefined(t.maxSize) ? e.$parent.$eval(t.maxSize) : a.maxSize, p = angular.isDefined(t.rotate) ? e.$parent.$eval(t.rotate) : a.rotate, u = angular.isDefined(t.forceEllipses) ? e.$parent.$eval(t.forceEllipses) : a.forceEllipses, c = angular.isDefined(t.boundaryLinkNumbers) ? e.$parent.$eval(t.boundaryLinkNumbers) : a.boundaryLinkNumbers, d = angular.isDefined(t.pageLabel) ? function(n) {
        return e.$parent.$eval(t.pageLabel, {
            $page: n
        });
    } : angular.identity;
    e.boundaryLinks = angular.isDefined(t.boundaryLinks) ? e.$parent.$eval(t.boundaryLinks) : a.boundaryLinks, 
    e.directionLinks = angular.isDefined(t.directionLinks) ? e.$parent.$eval(t.directionLinks) : a.directionLinks, 
    t.$set("role", "menu"), o.create(this, e, t), t.maxSize && l._watchers.push(e.$parent.$watch(n(t.maxSize), function(e) {
        s = parseInt(e, 10), l.render();
    }));
    var f = this.render;
    this.render = function() {
        f(), 0 < e.page && e.page <= e.totalPages && (e.pages = function(e, t) {
            var n = [], o = 1, a = t, r = angular.isDefined(s) && s < t;
            r && (p ? (a = (o = Math.max(e - Math.floor(s / 2), 1)) + s - 1) > t && (o = (a = t) - s + 1) : (o = (Math.ceil(e / s) - 1) * s + 1, 
            a = Math.min(o + s - 1, t)));
            for (var l = o; l <= a; l++) {
                var f = i(l, d(l), l === e);
                n.push(f);
            }
            if (r && 0 < s && (!p || u || c)) {
                if (1 < o) {
                    if (!c || 3 < o) {
                        var m = i(o - 1, "...", !1);
                        n.unshift(m);
                    }
                    if (c) {
                        if (3 === o) {
                            var g = i(2, "2", !1);
                            n.unshift(g);
                        }
                        var b = i(1, "1", !1);
                        n.unshift(b);
                    }
                }
                if (a < t) {
                    if (!c || a < t - 2) {
                        var h = i(a + 1, "...", !1);
                        n.push(h);
                    }
                    if (c) {
                        if (a === t - 2) {
                            var v = i(t - 1, t - 1, !1);
                            n.push(v);
                        }
                        var $ = i(t, t, !1);
                        n.push($);
                    }
                }
            }
            return n;
        }(e.page, e.totalPages));
    };
} ]).constant("uibPaginationConfig", {
    itemsPerPage: 10,
    boundaryLinks: !1,
    boundaryLinkNumbers: !1,
    directionLinks: !0,
    firstText: "First",
    previousText: "Previous",
    nextText: "Next",
    lastText: "Last",
    rotate: !0,
    forceEllipses: !1
}).directive("uibPagination", [ "$parse", "uibPaginationConfig", function(e, t) {
    return {
        scope: {
            totalItems: "=",
            firstText: "@",
            previousText: "@",
            nextText: "@",
            lastText: "@",
            ngDisabled: "="
        },
        require: [ "uibPagination", "?ngModel" ],
        restrict: "A",
        controller: "UibPaginationController",
        controllerAs: "pagination",
        templateUrl: function(e, t) {
            return t.templateUrl || "uib/template/pagination/pagination.html";
        },
        link: function(e, n, o, a) {
            n.addClass("pagination");
            var i = a[0], r = a[1];
            r && i.init(r, t);
        }
    };
} ]), angular.module("ui.bootstrap.alert", []).controller("UibAlertController", [ "$scope", "$element", "$attrs", "$interpolate", "$timeout", function(e, t, n, o, a) {
    e.closeable = !!n.close, t.addClass("alert"), n.$set("role", "alert"), e.closeable && t.addClass("alert-dismissible");
    var i = angular.isDefined(n.dismissOnTimeout) ? o(n.dismissOnTimeout)(e.$parent) : null;
    i && a(function() {
        e.close();
    }, parseInt(i, 10));
} ]).directive("uibAlert", function() {
    return {
        controller: "UibAlertController",
        controllerAs: "alert",
        restrict: "A",
        templateUrl: function(e, t) {
            return t.templateUrl || "uib/template/alert/alert.html";
        },
        transclude: !0,
        scope: {
            close: "&"
        }
    };
}), angular.module("ui.bootstrap.progressbar", []).constant("uibProgressConfig", {
    animate: !0,
    max: 100
}).controller("UibProgressController", [ "$scope", "$attrs", "uibProgressConfig", function(e, t, n) {
    function o() {
        return angular.isDefined(e.maxParam) ? e.maxParam : n.max;
    }
    var a = this, i = angular.isDefined(t.animate) ? e.$parent.$eval(t.animate) : n.animate;
    this.bars = [], e.max = o(), this.addBar = function(e, t, n) {
        i || t.css({
            transition: "none"
        }), this.bars.push(e), e.max = o(), e.title = n && angular.isDefined(n.title) ? n.title : "progressbar", 
        e.$watch("value", function(t) {
            e.recalculatePercentage();
        }), e.recalculatePercentage = function() {
            var t = a.bars.reduce(function(e, t) {
                return t.percent = +(100 * t.value / t.max).toFixed(2), e + t.percent;
            }, 0);
            100 < t && (e.percent -= t - 100);
        }, e.$on("$destroy", function() {
            t = null, a.removeBar(e);
        });
    }, this.removeBar = function(e) {
        this.bars.splice(this.bars.indexOf(e), 1), this.bars.forEach(function(e) {
            e.recalculatePercentage();
        });
    }, e.$watch("maxParam", function(e) {
        a.bars.forEach(function(e) {
            e.max = o(), e.recalculatePercentage();
        });
    });
} ]).directive("uibProgress", function() {
    return {
        replace: !0,
        transclude: !0,
        controller: "UibProgressController",
        require: "uibProgress",
        scope: {
            maxParam: "=?max"
        },
        templateUrl: "uib/template/progressbar/progress.html"
    };
}).directive("uibBar", function() {
    return {
        replace: !0,
        transclude: !0,
        require: "^uibProgress",
        scope: {
            value: "=",
            type: "@"
        },
        templateUrl: "uib/template/progressbar/bar.html",
        link: function(e, t, n, o) {
            o.addBar(e, t, n);
        }
    };
}).directive("uibProgressbar", function() {
    return {
        replace: !0,
        transclude: !0,
        controller: "UibProgressController",
        scope: {
            value: "=",
            maxParam: "=?max",
            type: "@"
        },
        templateUrl: "uib/template/progressbar/progressbar.html",
        link: function(e, t, n, o) {
            o.addBar(e, angular.element(t.children()[0]), {
                title: n.title
            });
        }
    };
}), angular.module("ui.bootstrap.modal", [ "ui.bootstrap.multiMap", "ui.bootstrap.stackedMap", "ui.bootstrap.position" ]).provider("$uibResolve", function() {
    var e = this;
    this.resolver = null, this.setResolver = function(e) {
        this.resolver = e;
    }, this.$get = [ "$injector", "$q", function(t, n) {
        var o = e.resolver ? t.get(e.resolver) : null;
        return {
            resolve: function(e, a, i, r) {
                if (o) return o.resolve(e, a, i, r);
                var l = [];
                return angular.forEach(e, function(e) {
                    angular.isFunction(e) || angular.isArray(e) ? l.push(n.resolve(t.invoke(e))) : angular.isString(e) ? l.push(n.resolve(t.get(e))) : l.push(n.resolve(e));
                }), n.all(l).then(function(t) {
                    var n = {}, o = 0;
                    return angular.forEach(e, function(e, a) {
                        n[a] = t[o++];
                    }), n;
                });
            }
        };
    } ];
}).directive("uibModalBackdrop", [ "$animate", "$injector", "$uibModalStack", function(e, t, n) {
    function o(t, o, a) {
        a.modalInClass && (e.addClass(o, a.modalInClass), t.$on(n.NOW_CLOSING_EVENT, function(n, i) {
            var r = i();
            t.modalOptions.animation ? e.removeClass(o, a.modalInClass).then(r) : r();
        }));
    }
    return {
        restrict: "A",
        compile: function(e, t) {
            return e.addClass(t.backdropClass), o;
        }
    };
} ]).directive("uibModalWindow", [ "$uibModalStack", "$q", "$animateCss", "$document", function(e, t, n, o) {
    return {
        scope: {
            index: "@"
        },
        restrict: "A",
        transclude: !0,
        templateUrl: function(e, t) {
            return t.templateUrl || "uib/template/modal/window.html";
        },
        link: function(a, i, r) {
            i.addClass(r.windowTopClass || ""), a.size = r.size, a.close = function(t) {
                var n = e.getTop();
                n && n.value.backdrop && "static" !== n.value.backdrop && t.target === t.currentTarget && (t.preventDefault(), 
                t.stopPropagation(), e.dismiss(n.key, "backdrop click"));
            }, i.on("click", a.close), a.$isRendered = !0;
            var l = t.defer();
            a.$$postDigest(function() {
                l.resolve();
            }), l.promise.then(function() {
                var l = null;
                r.modalInClass && (l = n(i, {
                    addClass: r.modalInClass
                }).start(), a.$on(e.NOW_CLOSING_EVENT, function(e, t) {
                    var o = t();
                    n(i, {
                        removeClass: r.modalInClass
                    }).start().then(o);
                })), t.when(l).then(function() {
                    var t = e.getTop();
                    if (t && e.modalRendered(t.key), !o[0].activeElement || !i[0].contains(o[0].activeElement)) {
                        var n = i[0].querySelector("[autofocus]");
                        n ? n.focus() : i[0].focus();
                    }
                });
            });
        }
    };
} ]).directive("uibModalAnimationClass", function() {
    return {
        compile: function(e, t) {
            t.modalAnimation && e.addClass(t.uibModalAnimationClass);
        }
    };
}).directive("uibModalTransclude", [ "$animate", function(e) {
    return {
        link: function(t, n, o, a, i) {
            i(t.$parent, function(t) {
                n.empty(), e.enter(t, n);
            });
        }
    };
} ]).factory("$uibModalStack", [ "$animate", "$animateCss", "$document", "$compile", "$rootScope", "$q", "$$multiMap", "$$stackedMap", "$uibPosition", function(e, t, n, o, a, i, r, l, s) {
    function c() {
        for (var e = -1, t = x.keys(), n = 0; n < t.length; n++) x.get(t[n]).value.backdrop && (e = n);
        return -1 < e && e < P && (e = P), e;
    }
    function d(e, t) {
        var n = x.get(e).value, o = n.appendTo;
        x.remove(e), (D = x.top()) && (P = parseInt(D.value.modalDomEl.attr("index"), 10)), 
        g(n.modalDomEl, n.modalScope, function() {
            var t = n.openedClass || C;
            T.remove(t, e);
            var a = T.hasKey(t);
            o.toggleClass(t, a), !a && y && y.heightOverflow && y.scrollbarWidth && (y.originalRight ? o.css({
                paddingRight: y.originalRight + "px"
            }) : o.css({
                paddingRight: ""
            }), y = null), f(!0);
        }, n.closedDeferred), function() {
            if ($ && -1 === c()) {
                g($, w, function() {
                    null;
                }), w = $ = void 0;
            }
        }(), t && t.focus ? t.focus() : o.focus && o.focus();
    }
    function f(e) {
        var t;
        0 < x.length() && (t = x.top().value).modalDomEl.toggleClass(t.windowTopClass || "", e);
    }
    function g(t, n, o, a) {
        var l, s = null;
        return n.$broadcast(k.NOW_CLOSING_EVENT, function() {
            return l || (l = i.defer(), s = l.promise), function() {
                l.resolve();
            };
        }), i.when(s).then(function r() {
            r.done || (r.done = !0, e.leave(t).then(function() {
                o && o(), t.remove(), a && a.resolve();
            }), n.$destroy());
        });
    }
    function b(e) {
        if (e.isDefaultPrevented()) return e;
        var t = x.top();
        if (t) switch (e.which) {
          case 27:
            t.value.keyboard && (e.preventDefault(), a.$apply(function() {
                k.dismiss(t.key, "escape key press");
            }));
            break;

          case 9:
            var n = k.loadFocusElementList(t), o = !1;
            e.shiftKey ? (k.isFocusInFirstItem(e, n) || k.isModalFocused(e, t)) && (o = k.focusLastFocusableElement(n)) : k.isFocusInLastItem(e, n) && (o = k.focusFirstFocusableElement(n)), 
            o && (e.preventDefault(), e.stopPropagation());
        }
    }
    function h(e, t, n) {
        return !e.value.modalScope.$broadcast("modal.closing", t, n).defaultPrevented;
    }
    function v() {
        Array.prototype.forEach.call(document.querySelectorAll("[" + O + "]"), function(e) {
            var t = parseInt(e.getAttribute(O), 10) - 1;
            e.setAttribute(O, t), t || (e.removeAttribute(O), e.removeAttribute("aria-hidden"));
        });
    }
    var $, w, y, C = "modal-open", x = l.createNew(), T = r.createNew(), k = {
        NOW_CLOSING_EVENT: "modal.stack.now-closing"
    }, P = 0, D = null, O = "data-bootstrap-modal-aria-hidden-count", E = /[A-Z]/g;
    return a.$watch(c, function(e) {
        w && (w.index = e);
    }), n.on("keydown", b), a.$on("$destroy", function() {
        n.off("keydown", b);
    }), k.open = function(t, i) {
        var l = n[0].activeElement, u = i.openedClass || C;
        f(!1), D = x.top(), x.add(t, {
            deferred: i.deferred,
            renderDeferred: i.renderDeferred,
            closedDeferred: i.closedDeferred,
            modalScope: i.scope,
            backdrop: i.backdrop,
            keyboard: i.keyboard,
            openedClass: i.openedClass,
            windowTopClass: i.windowTopClass,
            animation: i.animation,
            appendTo: i.appendTo
        }), T.put(u, t);
        var g, d = i.appendTo, m = c();
        0 <= m && !$ && ((w = a.$new(!0)).modalOptions = i, w.index = m, ($ = angular.element('<div uib-modal-backdrop="modal-backdrop"></div>')).attr({
            class: "modal-backdrop",
            "ng-style": "{'z-index': 1040 + (index && 1 || 0) + index*10}",
            "uib-modal-animation-class": "fade",
            "modal-in-class": "in"
        }), i.backdropClass && $.addClass(i.backdropClass), i.animation && $.attr("modal-animation", "true"), 
        o($)(w), e.enter($, d), s.isScrollable(d) && (y = s.scrollbarPadding(d)).heightOverflow && y.scrollbarWidth && d.css({
            paddingRight: y.right + "px"
        })), i.component ? (g = document.createElement(function(e) {
            return e.replace(E, function(e, t) {
                return (t ? "-" : "") + e.toLowerCase();
            });
        }(i.component.name)), (g = angular.element(g)).attr({
            resolve: "$resolve",
            "modal-instance": "$uibModalInstance",
            close: "$close($value)",
            dismiss: "$dismiss($value)"
        })) : g = i.content, P = D ? parseInt(D.value.modalDomEl.attr("index"), 10) + 1 : 0;
        var b = angular.element('<div uib-modal-window="modal-window"></div>');
        b.attr({
            class: "modal",
            "template-url": i.windowTemplateUrl,
            "window-top-class": i.windowTopClass,
            role: "dialog",
            "aria-labelledby": i.ariaLabelledBy,
            "aria-describedby": i.ariaDescribedBy,
            size: i.size,
            index: P,
            animate: "animate",
            "ng-style": "{'z-index': 1050 + $$topModalIndex*10, display: 'block'}",
            tabindex: -1,
            "uib-modal-animation-class": "fade",
            "modal-in-class": "in"
        }).append(g), i.windowClass && b.addClass(i.windowClass), i.animation && b.attr("modal-animation", "true"), 
        d.addClass(u), i.scope && (i.scope.$$topModalIndex = P), e.enter(o(b)(i.scope), d), 
        x.top().value.modalDomEl = b, x.top().value.modalOpener = l, function r(e) {
            if (e && "BODY" !== e[0].tagName) return function(e) {
                var t = e.parent() ? e.parent().children() : [];
                return Array.prototype.filter.call(t, function(t) {
                    return t !== e[0];
                });
            }(e).forEach(function(e) {
                var t = "true" === e.getAttribute("aria-hidden"), n = parseInt(e.getAttribute(O), 10);
                n || (n = t ? 1 : 0), e.setAttribute(O, n + 1), e.setAttribute("aria-hidden", "true");
            }), r(e.parent());
        }(b);
    }, k.close = function(e, t) {
        var n = x.get(e);
        return v(), n && h(n, t, !0) ? (n.value.modalScope.$$uibDestructionScheduled = !0, 
        n.value.deferred.resolve(t), d(e, n.value.modalOpener), !0) : !n;
    }, k.dismiss = function(e, t) {
        var n = x.get(e);
        return v(), n && h(n, t, !1) ? (n.value.modalScope.$$uibDestructionScheduled = !0, 
        n.value.deferred.reject(t), d(e, n.value.modalOpener), !0) : !n;
    }, k.dismissAll = function(e) {
        for (var t = this.getTop(); t && this.dismiss(t.key, e); ) t = this.getTop();
    }, k.getTop = function() {
        return x.top();
    }, k.modalRendered = function(e) {
        var t = x.get(e);
        t && t.value.renderDeferred.resolve();
    }, k.focusFirstFocusableElement = function(e) {
        return 0 < e.length && (e[0].focus(), !0);
    }, k.focusLastFocusableElement = function(e) {
        return 0 < e.length && (e[e.length - 1].focus(), !0);
    }, k.isModalFocused = function(e, t) {
        if (e && t) {
            var n = t.value.modalDomEl;
            if (n && n.length) return (e.target || e.srcElement) === n[0];
        }
        return !1;
    }, k.isFocusInFirstItem = function(e, t) {
        return 0 < t.length && (e.target || e.srcElement) === t[0];
    }, k.isFocusInLastItem = function(e, t) {
        return 0 < t.length && (e.target || e.srcElement) === t[t.length - 1];
    }, k.loadFocusElementList = function(e) {
        if (e) {
            var t = e.value.modalDomEl;
            if (t && t.length) {
                var n = t[0].querySelectorAll("a[href], area[href], input:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]");
                return n ? Array.prototype.filter.call(n, function(e) {
                    return function(e) {
                        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
                    }(e);
                }) : n;
            }
        }
    }, k;
} ]).provider("$uibModal", function() {
    var e = {
        options: {
            animation: !0,
            backdrop: !0,
            keyboard: !0
        },
        $get: [ "$rootScope", "$q", "$document", "$templateRequest", "$controller", "$uibResolve", "$uibModalStack", function(t, n, o, a, i, r, l) {
            function s(e) {
                return e.template ? n.when(e.template) : a(angular.isFunction(e.templateUrl) ? e.templateUrl() : e.templateUrl);
            }
            var p = {}, u = null;
            return p.getPromiseChain = function() {
                return u;
            }, p.open = function(a) {
                function p() {
                    return b;
                }
                var b, h, c = n.defer(), d = n.defer(), f = n.defer(), m = n.defer(), g = {
                    result: c.promise,
                    opened: d.promise,
                    closed: f.promise,
                    rendered: m.promise,
                    close: function(e) {
                        return l.close(g, e);
                    },
                    dismiss: function(e) {
                        return l.dismiss(g, e);
                    }
                };
                if ((a = angular.extend({}, e.options, a)).resolve = a.resolve || {}, a.appendTo = a.appendTo || o.find("body").eq(0), 
                !a.appendTo.length) throw new Error("appendTo element not found. Make sure that the element passed is in DOM.");
                if (!a.component && !a.template && !a.templateUrl) throw new Error("One of component or template or templateUrl options is required.");
                return b = a.component ? n.when(r.resolve(a.resolve, {}, null, null)) : n.all([ s(a), r.resolve(a.resolve, {}, null, null) ]), 
                h = u = n.all([ u ]).then(p, p).then(function(e) {
                    function n(t, n, o, a) {
                        t.$scope = r, t.$scope.$resolve = {}, o ? t.$scope.$uibModalInstance = g : t.$uibModalInstance = g;
                        var i = n ? e[1] : e;
                        angular.forEach(i, function(e, n) {
                            a && (t[n] = e), t.$scope.$resolve[n] = e;
                        });
                    }
                    var o = a.scope || t, r = o.$new();
                    r.$close = g.close, r.$dismiss = g.dismiss, r.$on("$destroy", function() {
                        r.$$uibDestructionScheduled || r.$dismiss("$uibUnscheduledDestruction");
                    });
                    var s, p, u = {
                        scope: r,
                        deferred: c,
                        renderDeferred: m,
                        closedDeferred: f,
                        animation: a.animation,
                        backdrop: a.backdrop,
                        keyboard: a.keyboard,
                        backdropClass: a.backdropClass,
                        windowTopClass: a.windowTopClass,
                        windowClass: a.windowClass,
                        windowTemplateUrl: a.windowTemplateUrl,
                        ariaLabelledBy: a.ariaLabelledBy,
                        ariaDescribedBy: a.ariaDescribedBy,
                        size: a.size,
                        openedClass: a.openedClass,
                        appendTo: a.appendTo
                    }, b = {}, h = {};
                    a.component ? (n(b, !1, !0, !1), b.name = a.component, u.component = b) : a.controller && (n(h, !0, !1, !0), 
                    p = i(a.controller, h, !0, a.controllerAs), a.controllerAs && a.bindToController && ((s = p.instance).$close = r.$close, 
                    s.$dismiss = r.$dismiss, angular.extend(s, {
                        $resolve: h.$scope.$resolve
                    }, o)), s = p(), angular.isFunction(s.$onInit) && s.$onInit()), a.component || (u.content = e[0]), 
                    l.open(g, u), d.resolve(!0);
                }, function(e) {
                    d.reject(e), c.reject(e);
                }).finally(function() {
                    u === h && (u = null);
                }), g;
            }, p;
        } ]
    };
    return e;
}), angular.module("ui.bootstrap.tooltip", [ "ui.bootstrap.position", "ui.bootstrap.stackedMap" ]).provider("$uibTooltip", function() {
    var t = {
        placement: "top",
        placementClassPrefix: "",
        animation: !0,
        popupDelay: 0,
        popupCloseDelay: 0,
        useContentExp: !1
    }, n = {
        mouseenter: "mouseleave",
        click: "click",
        outsideClick: "outsideClick",
        focus: "blur",
        none: ""
    }, o = {};
    this.options = function(e) {
        angular.extend(o, e);
    }, this.setTriggers = function(e) {
        angular.extend(n, e);
    }, this.$get = [ "$window", "$compile", "$timeout", "$document", "$uibPosition", "$interpolate", "$rootScope", "$parse", "$$stackedMap", function(a, i, r, l, s, p, u, c, d) {
        function f(e) {
            if (27 === e.which) {
                var t = m.top();
                t && (t.value.close(), t = null);
            }
        }
        var m = d.createNew();
        return l.on("keyup", f), u.$on("$destroy", function() {
            l.off("keyup", f);
        }), function(a, u, d, f) {
            function g(e) {
                var t = (e || f.trigger || d).split(" ");
                return {
                    show: t,
                    hide: t.map(function(e) {
                        return n[e] || e;
                    })
                };
            }
            f = angular.extend({}, t, o, f);
            var b = function(e) {
                return e.replace(/[A-Z]/g, function(e, t) {
                    return (t ? "-" : "") + e.toLowerCase();
                });
            }(a), h = p.startSymbol(), v = p.endSymbol(), $ = "<div " + b + '-popup uib-title="' + h + "title" + v + '" ' + (f.useContentExp ? 'content-exp="contentExp()" ' : 'content="' + h + "content" + v + '" ') + 'origin-scope="origScope" class="uib-position-measure ' + u + '" tooltip-animation-class="fade"uib-tooltip-classes ng-class="{ in: isOpen }" ></div>';
            return {
                compile: function(e, t) {
                    var n = i($);
                    return function(e, t, o, i) {
                        function p() {
                            F.isOpen ? b() : d();
                        }
                        function d() {
                            R && !e.$eval(o[u + "Enable"]) || (w(), function() {
                                F.title = o[u + "Title"], F.content = V ? V(e) : o[a], F.popupClass = o[u + "Class"], 
                                F.placement = angular.isDefined(o[u + "Placement"]) ? o[u + "Placement"] : f.placement;
                                var t = s.parsePlacement(F.placement);
                                L = t[1] ? t[0] + "-" + t[1] : t[0];
                                var n = parseInt(o[u + "PopupDelay"], 10), i = parseInt(o[u + "PopupCloseDelay"], 10);
                                F.popupDelay = isNaN(n) ? f.popupDelay : n, F.popupCloseDelay = isNaN(i) ? f.popupCloseDelay : i;
                            }(), F.popupDelay ? S || (S = r(h, F.popupDelay, !1)) : h());
                        }
                        function b() {
                            v(), F.popupCloseDelay ? U || (U = r($, F.popupCloseDelay, !1)) : $();
                        }
                        function h() {
                            if (v(), w(), !F.content) return angular.noop;
                            E || (M = F.$new(), E = n(M, function(e) {
                                q ? l.find("body").append(e) : t.after(e);
                            }), m.add(F, {
                                close: $
                            }), j.length = 0, V ? (j.push(e.$watch(V, function(e) {
                                !(F.content = e) && F.isOpen && $();
                            })), j.push(M.$watch(function() {
                                W || (W = !0, M.$$postDigest(function() {
                                    W = !1, F && F.isOpen && _();
                                }));
                            }))) : j.push(o.$observe(a, function(e) {
                                !(F.content = e) && F.isOpen ? $() : _();
                            })), j.push(o.$observe(u + "Title", function(e) {
                                F.title = e, F.isOpen && _();
                            })), j.push(o.$observe(u + "Placement", function(e) {
                                F.placement = e || f.placement, F.isOpen && _();
                            }))), F.$evalAsync(function() {
                                T(F.isOpen = !0), _();
                            });
                        }
                        function v() {
                            S && (r.cancel(S), S = null), I && (r.cancel(I), I = null);
                        }
                        function $() {
                            F && F.$evalAsync(function() {
                                F && (T(F.isOpen = !1), F.animation ? A || (A = r(C, 150, !1)) : C());
                            });
                        }
                        function w() {
                            U && (r.cancel(U), U = null), A && (r.cancel(A), A = null);
                        }
                        function C() {
                            v(), w(), j.length && (angular.forEach(j, function(e) {
                                e();
                            }), j.length = 0), E && (E.remove(), E = null, N && r.cancel(N)), m.remove(F), M && (M.$destroy(), 
                            M = null);
                        }
                        function T(t) {
                            H && angular.isFunction(H.assign) && H.assign(e, t);
                        }
                        function D(e) {
                            F && F.isOpen && E && (t[0].contains(e.target) || E[0].contains(e.target) || b());
                        }
                        function O(e) {
                            27 === e.which && b();
                        }
                        var E, M, A, S, U, I, N, L, q = !!angular.isDefined(f.appendToBody) && f.appendToBody, B = g(void 0), R = angular.isDefined(o[u + "Enable"]), F = e.$new(!0), W = !1, H = !!angular.isDefined(o[u + "IsOpen"]) && c(o[u + "IsOpen"]), V = !!f.useContentExp && c(o[a]), j = [], _ = function() {
                            E && E.html() && (I || (I = r(function() {
                                var e = s.positionElements(t, E, F.placement, q), n = angular.isDefined(E.offsetHeight) ? E.offsetHeight : E.prop("offsetHeight"), o = q ? s.offset(t) : s.position(t);
                                E.css({
                                    top: e.top + "px",
                                    left: e.left + "px"
                                });
                                var a = e.placement.split("-");
                                E.hasClass(a[0]) || (E.removeClass(L.split("-")[0]), E.addClass(a[0])), E.hasClass(f.placementClassPrefix + e.placement) || (E.removeClass(f.placementClassPrefix + L), 
                                E.addClass(f.placementClassPrefix + e.placement)), N = r(function() {
                                    var e = angular.isDefined(E.offsetHeight) ? E.offsetHeight : E.prop("offsetHeight"), t = s.adjustTop(a, o, n, e);
                                    t && E.css(t), N = null;
                                }, 0, !1), E.hasClass("uib-position-measure") ? (s.positionArrow(E, e.placement), 
                                E.removeClass("uib-position-measure")) : L !== e.placement && s.positionArrow(E, e.placement), 
                                L = e.placement, I = null;
                            }, 0, !1)));
                        };
                        F.origScope = e, F.isOpen = !1, F.contentExp = function() {
                            return F.content;
                        }, o.$observe("disabled", function(e) {
                            e && v(), e && F.isOpen && $();
                        }), H && e.$watch(H, function(e) {
                            F && !e === F.isOpen && p();
                        });
                        var z = function() {
                            B.show.forEach(function(e) {
                                "outsideClick" === e ? t.off("click", p) : (t.off(e, d), t.off(e, p)), t.off("keypress", O);
                            }), B.hide.forEach(function(e) {
                                "outsideClick" === e ? l.off("click", D) : t.off(e, b);
                            });
                        };
                        !function() {
                            var n = [], a = [], i = e.$eval(o[u + "Trigger"]);
                            z(), "none" !== (B = angular.isObject(i) ? (Object.keys(i).forEach(function(e) {
                                n.push(e), a.push(i[e]);
                            }), {
                                show: n,
                                hide: a
                            }) : g(i)).show && B.show.forEach(function(e, n) {
                                "outsideClick" === e ? (t.on("click", p), l.on("click", D)) : e === B.hide[n] ? t.on(e, p) : e && (t.on(e, d), 
                                t.on(B.hide[n], b)), t.on("keypress", O);
                            });
                        }();
                        var G = e.$eval(o[u + "Animation"]);
                        F.animation = angular.isDefined(G) ? !!G : f.animation;
                        var Y, K = u + "AppendToBody";
                        Y = K in o && void 0 === o[K] || e.$eval(o[K]), q = angular.isDefined(Y) ? Y : q, 
                        e.$on("$destroy", function() {
                            z(), C(), F = null;
                        });
                    };
                }
            };
        };
    } ];
}).directive("uibTooltipTemplateTransclude", [ "$animate", "$sce", "$compile", "$templateRequest", function(e, t, n, o) {
    return {
        link: function(a, i, r) {
            var l, s, p, u = a.$eval(r.tooltipTemplateTranscludeScope), c = 0, d = function() {
                s && (s.remove(), s = null), l && (l.$destroy(), l = null), p && (e.leave(p).then(function() {
                    s = null;
                }), s = p, p = null);
            };
            a.$watch(t.parseAsResourceUrl(r.uibTooltipTemplateTransclude), function(t) {
                var r = ++c;
                t ? (o(t, !0).then(function(o) {
                    if (r === c) {
                        var a = u.$new(), s = n(o)(a, function(t) {
                            d(), e.enter(t, i);
                        });
                        p = s, (l = a).$emit("$includeContentLoaded", t);
                    }
                }, function() {
                    r === c && (d(), a.$emit("$includeContentError", t));
                }), a.$emit("$includeContentRequested", t)) : d();
            }), a.$on("$destroy", d);
        }
    };
} ]).directive("uibTooltipClasses", [ "$uibPosition", function(e) {
    return {
        restrict: "A",
        link: function(t, n, o) {
            if (t.placement) {
                var a = e.parsePlacement(t.placement);
                n.addClass(a[0]);
            }
            t.popupClass && n.addClass(t.popupClass), t.animation && n.addClass(o.tooltipAnimationClass);
        }
    };
} ]).directive("uibTooltipPopup", function() {
    return {
        restrict: "A",
        scope: {
            content: "@"
        },
        templateUrl: "uib/template/tooltip/tooltip-popup.html"
    };
}).directive("uibTooltip", [ "$uibTooltip", function(e) {
    return e("uibTooltip", "tooltip", "mouseenter");
} ]).directive("uibTooltipTemplatePopup", function() {
    return {
        restrict: "A",
        scope: {
            contentExp: "&",
            originScope: "&"
        },
        templateUrl: "uib/template/tooltip/tooltip-template-popup.html"
    };
}).directive("uibTooltipTemplate", [ "$uibTooltip", function(e) {
    return e("uibTooltipTemplate", "tooltip", "mouseenter", {
        useContentExp: !0
    });
} ]).directive("uibTooltipHtmlPopup", function() {
    return {
        restrict: "A",
        scope: {
            contentExp: "&"
        },
        templateUrl: "uib/template/tooltip/tooltip-html-popup.html"
    };
}).directive("uibTooltipHtml", [ "$uibTooltip", function(e) {
    return e("uibTooltipHtml", "tooltip", "mouseenter", {
        useContentExp: !0
    });
} ]), angular.module("ui.bootstrap.popover", [ "ui.bootstrap.tooltip" ]).directive("uibPopoverTemplatePopup", function() {
    return {
        restrict: "A",
        scope: {
            uibTitle: "@",
            contentExp: "&",
            originScope: "&"
        },
        templateUrl: "uib/template/popover/popover-template.html"
    };
}).directive("uibPopoverTemplate", [ "$uibTooltip", function(e) {
    return e("uibPopoverTemplate", "popover", "click", {
        useContentExp: !0
    });
} ]).directive("uibPopoverHtmlPopup", function() {
    return {
        restrict: "A",
        scope: {
            contentExp: "&",
            uibTitle: "@"
        },
        templateUrl: "uib/template/popover/popover-html.html"
    };
}).directive("uibPopoverHtml", [ "$uibTooltip", function(e) {
    return e("uibPopoverHtml", "popover", "click", {
        useContentExp: !0
    });
} ]).directive("uibPopoverPopup", function() {
    return {
        restrict: "A",
        scope: {
            uibTitle: "@",
            content: "@"
        },
        templateUrl: "uib/template/popover/popover.html"
    };
}).directive("uibPopover", [ "$uibTooltip", function(e) {
    return e("uibPopover", "popover", "click");
} ]), angular.module("ui.bootstrap.carousel", []).controller("UibCarouselController", [ "$scope", "$element", "$interval", "$timeout", "$animate", function(e, t, n, o, a) {
    function i(e) {
        for (var t = 0; t < m.length; t++) m[t].slide.active = t === e;
    }
    function r(n, o, r) {
        if (!h) {
            if (angular.extend(n, {
                direction: r
            }), angular.extend(m[b].slide || {}, {
                direction: r
            }), a.enabled(t) && !e.$currentTransition && m[o].element && 1 < f.slides.length) {
                m[o].element.data(g, n.direction);
                var l = f.getCurrentIndex();
                angular.isNumber(l) && m[l].element && m[l].element.data(g, n.direction), e.$currentTransition = !0, 
                a.on("addClass", m[o].element, function(t, n) {
                    "close" === n && (e.$currentTransition = null, a.off("addClass", t));
                });
            }
            e.active = n.index, b = n.index, i(o), p();
        }
    }
    function l(e) {
        for (var t = 0; t < m.length; t++) if (m[t].slide === e) return t;
    }
    function s() {
        c && (n.cancel(c), c = null);
    }
    function p() {
        s();
        var t = +e.interval;
        !isNaN(t) && 0 < t && (c = n(u, t));
    }
    function u() {
        var t = +e.interval;
        d && !isNaN(t) && 0 < t && m.length ? e.next() : e.pause();
    }
    var c, d, f = this, m = f.slides = e.slides = [], g = "uib-slideDirection", b = e.active, h = !1;
    t.addClass("carousel"), f.addSlide = function(t, n) {
        m.push({
            slide: t,
            element: n
        }), m.sort(function(e, t) {
            return +e.slide.index - +t.slide.index;
        }), (t.index === e.active || 1 === m.length && !angular.isNumber(e.active)) && (e.$currentTransition && (e.$currentTransition = null), 
        b = t.index, e.active = t.index, i(b), f.select(m[l(t)]), 1 === m.length && e.play());
    }, f.getCurrentIndex = function() {
        for (var e = 0; e < m.length; e++) if (m[e].slide.index === b) return e;
    }, f.next = e.next = function() {
        var t = (f.getCurrentIndex() + 1) % m.length;
        if (0 !== t || !e.noWrap()) return f.select(m[t], "next");
        e.pause();
    }, f.prev = e.prev = function() {
        var t = f.getCurrentIndex() - 1 < 0 ? m.length - 1 : f.getCurrentIndex() - 1;
        if (!e.noWrap() || t !== m.length - 1) return f.select(m[t], "prev");
        e.pause();
    }, f.removeSlide = function(t) {
        var n = l(t);
        m.splice(n, 1), 0 < m.length && b === n ? n >= m.length ? (b = m.length - 1, i(e.active = b), 
        f.select(m[m.length - 1])) : (b = n, i(e.active = b), f.select(m[n])) : n < b && (b--, 
        e.active = b), 0 === m.length && (b = null, e.active = null);
    }, f.select = e.select = function(t, n) {
        var o = l(t.slide);
        void 0 === n && (n = o > f.getCurrentIndex() ? "next" : "prev"), t.slide.index === b || e.$currentTransition || r(t.slide, o, n);
    }, e.indexOfSlide = function(e) {
        return +e.slide.index;
    }, e.isActive = function(t) {
        return e.active === t.slide.index;
    }, e.isPrevDisabled = function() {
        return 0 === e.active && e.noWrap();
    }, e.isNextDisabled = function() {
        return e.active === m.length - 1 && e.noWrap();
    }, e.pause = function() {
        e.noPause || (d = !1, s());
    }, e.play = function() {
        d || (d = !0, p());
    }, t.on("mouseenter", e.pause), t.on("mouseleave", e.play), e.$on("$destroy", function() {
        h = !0, s();
    }), e.$watch("noTransition", function(e) {
        a.enabled(t, !e);
    }), e.$watch("interval", p), e.$watchCollection("slides", function(t) {
        t.length || (e.$currentTransition = null);
    }), e.$watch("active", function(e) {
        if (angular.isNumber(e) && b !== e) {
            for (var t = 0; t < m.length; t++) if (m[t].slide.index === e) {
                e = t;
                break;
            }
            m[e] && (i(e), f.select(m[e]), b = e);
        }
    });
} ]).directive("uibCarousel", function() {
    return {
        transclude: !0,
        controller: "UibCarouselController",
        controllerAs: "carousel",
        restrict: "A",
        templateUrl: function(e, t) {
            return t.templateUrl || "uib/template/carousel/carousel.html";
        },
        scope: {
            active: "=",
            interval: "=",
            noTransition: "=",
            noPause: "=",
            noWrap: "&"
        }
    };
}).directive("uibSlide", [ "$animate", function(e) {
    return {
        require: "^uibCarousel",
        restrict: "A",
        transclude: !0,
        templateUrl: function(e, t) {
            return t.templateUrl || "uib/template/carousel/slide.html";
        },
        scope: {
            actual: "=?",
            index: "=?"
        },
        link: function(t, n, o, a) {
            n.addClass("item"), a.addSlide(t, n), t.$on("$destroy", function() {
                a.removeSlide(t);
            }), t.$watch("active", function(t) {
                e[t ? "addClass" : "removeClass"](n, "active");
            });
        }
    };
} ]).animation(".item", [ "$animateCss", function(e) {
    function t(e, t, n) {
        e.removeClass(t), n && n();
    }
    return {
        beforeAddClass: function(n, o, a) {
            if ("active" === o) {
                var r = n.data("uib-slideDirection"), l = "next" === r ? "left" : "right", s = t.bind(this, n, l + " " + r, a);
                return n.addClass(r), e(n, {
                    addClass: l
                }).start().done(s), function() {
                    !0;
                };
            }
            a();
        },
        beforeRemoveClass: function(n, o, a) {
            if ("active" === o) {
                var r = "next" === n.data("uib-slideDirection") ? "left" : "right", l = t.bind(this, n, r, a);
                return e(n, {
                    addClass: r
                }).start().done(l), function() {
                    !0;
                };
            }
            a();
        }
    };
} ]), angular.module("ui.bootstrap.accordion", [ "ui.bootstrap.collapse", "ui.bootstrap.tabindex" ]).constant("uibAccordionConfig", {
    closeOthers: !0
}).controller("UibAccordionController", [ "$scope", "$attrs", "uibAccordionConfig", function(e, t, n) {
    this.groups = [], this.closeOthers = function(o) {
        (angular.isDefined(t.closeOthers) ? e.$eval(t.closeOthers) : n.closeOthers) && angular.forEach(this.groups, function(e) {
            e !== o && (e.isOpen = !1);
        });
    }, this.addGroup = function(e) {
        var t = this;
        this.groups.push(e), e.$on("$destroy", function(n) {
            t.removeGroup(e);
        });
    }, this.removeGroup = function(e) {
        var t = this.groups.indexOf(e);
        -1 !== t && this.groups.splice(t, 1);
    };
} ]).directive("uibAccordion", function() {
    return {
        controller: "UibAccordionController",
        controllerAs: "accordion",
        transclude: !0,
        templateUrl: function(e, t) {
            return t.templateUrl || "uib/template/accordion/accordion.html";
        }
    };
}).directive("uibAccordionGroup", function() {
    return {
        require: "^uibAccordion",
        transclude: !0,
        restrict: "A",
        templateUrl: function(e, t) {
            return t.templateUrl || "uib/template/accordion/accordion-group.html";
        },
        scope: {
            heading: "@",
            panelClass: "@?",
            isOpen: "=?",
            isDisabled: "=?"
        },
        controller: function() {
            this.setHeading = function(e) {
                this.heading = e;
            };
        },
        link: function(e, t, n, o) {
            t.addClass("panel"), o.addGroup(e), e.openClass = n.openClass || "panel-open", e.panelClass = n.panelClass || "panel-default", 
            e.$watch("isOpen", function(n) {
                t.toggleClass(e.openClass, !!n), n && o.closeOthers(e);
            }), e.toggleOpen = function(t) {
                e.isDisabled || t && 32 !== t.which || (e.isOpen = !e.isOpen);
            };
            var a = "accordiongroup-" + e.$id + "-" + Math.floor(1e4 * Math.random());
            e.headingId = a + "-tab", e.panelId = a + "-panel";
        }
    };
}).directive("uibAccordionHeading", function() {
    return {
        transclude: !0,
        template: "",
        replace: !0,
        require: "^uibAccordionGroup",
        link: function(e, t, n, o, a) {
            o.setHeading(a(e, angular.noop));
        }
    };
}).directive("uibAccordionTransclude", function() {
    return {
        require: "^uibAccordionGroup",
        link: function(e, t, n, o) {
            e.$watch(function() {
                return o[n.uibAccordionTransclude];
            }, function(e) {
                if (e) {
                    var n = angular.element(t[0].querySelector("uib-accordion-header,data-uib-accordion-header,x-uib-accordion-header,uib\\:accordion-header,[uib-accordion-header],[data-uib-accordion-header],[x-uib-accordion-header]"));
                    n.html(""), n.append(e);
                }
            });
        }
    };
}), angular.module("ui.bootstrap.typeahead", [ "ui.bootstrap.debounce", "ui.bootstrap.position" ]).factory("uibTypeaheadParser", [ "$parse", function(e) {
    var t = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    return {
        parse: function(n) {
            var o = n.match(t);
            if (!o) throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "' + n + '".');
            return {
                itemName: o[3],
                source: e(o[4]),
                viewMapper: e(o[2] || o[1]),
                modelMapper: e(o[1])
            };
        }
    };
} ]).controller("UibTypeaheadController", [ "$scope", "$element", "$attrs", "$compile", "$parse", "$q", "$timeout", "$document", "$window", "$rootScope", "$$debounce", "$uibPosition", "uibTypeaheadParser", function(e, t, n, o, a, i, r, l, s, p, u, c, d) {
    function f() {
        F.moveInProgress || (F.moveInProgress = !0, F.$digest()), Z();
    }
    function m() {
        F.position = M ? c.offset(t) : c.position(t), F.position.top += t.prop("offsetHeight");
    }
    var b, h, v = [ 9, 13, 27, 38, 40 ], $ = e.$eval(n.typeaheadMinLength);
    $ || 0 === $ || ($ = 1), e.$watch(n.typeaheadMinLength, function(e) {
        $ = e || 0 === e ? e : 1;
    });
    var w = e.$eval(n.typeaheadWaitMs) || 0, y = !1 !== e.$eval(n.typeaheadEditable);
    e.$watch(n.typeaheadEditable, function(e) {
        y = !1 !== e;
    });
    var C, x, T = a(n.typeaheadLoading).assign || angular.noop, k = n.typeaheadShouldSelect ? a(n.typeaheadShouldSelect) : function(e, t) {
        var n = t.$event;
        return 13 === n.which || 9 === n.which;
    }, P = a(n.typeaheadOnSelect), D = !!angular.isDefined(n.typeaheadSelectOnBlur) && e.$eval(n.typeaheadSelectOnBlur), O = a(n.typeaheadNoResults).assign || angular.noop, E = n.typeaheadInputFormatter ? a(n.typeaheadInputFormatter) : void 0, M = !!n.typeaheadAppendToBody && e.$eval(n.typeaheadAppendToBody), A = n.typeaheadAppendTo ? e.$eval(n.typeaheadAppendTo) : null, S = !1 !== e.$eval(n.typeaheadFocusFirst), U = !!n.typeaheadSelectOnExact && e.$eval(n.typeaheadSelectOnExact), I = a(n.typeaheadIsOpen).assign || angular.noop, N = e.$eval(n.typeaheadShowHint) || !1, L = a(n.ngModel), q = a(n.ngModel + "($$$p)"), R = d.parse(n.uibTypeahead), F = e.$new(), W = e.$on("$destroy", function() {
        F.$destroy();
    });
    F.$on("$destroy", W);
    var V, j, H = "typeahead-" + F.$id + "-" + Math.floor(1e4 * Math.random());
    t.attr({
        "aria-autocomplete": "list",
        "aria-expanded": !1,
        "aria-owns": H
    }), N && ((V = angular.element("<div></div>")).css("position", "relative"), t.after(V), 
    (j = t.clone()).attr("placeholder", ""), j.attr("tabindex", "-1"), j.val(""), j.css({
        position: "absolute",
        top: "0px",
        left: "0px",
        "border-color": "transparent",
        "box-shadow": "none",
        opacity: 1,
        background: "none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)",
        color: "#999"
    }), t.css({
        position: "relative",
        "vertical-align": "top",
        "background-color": "transparent"
    }), j.attr("id") && j.removeAttr("id"), V.append(j), j.after(t));
    var _ = angular.element("<div uib-typeahead-popup></div>");
    _.attr({
        id: H,
        matches: "matches",
        active: "activeIdx",
        select: "select(activeIdx, evt)",
        "move-in-progress": "moveInProgress",
        query: "query",
        position: "position",
        "assign-is-open": "assignIsOpen(isOpen)",
        debounce: "debounceUpdate"
    }), angular.isDefined(n.typeaheadTemplateUrl) && _.attr("template-url", n.typeaheadTemplateUrl), 
    angular.isDefined(n.typeaheadPopupTemplateUrl) && _.attr("popup-template-url", n.typeaheadPopupTemplateUrl);
    var G = function() {
        F.matches = [], F.activeIdx = -1, t.attr("aria-expanded", !1), N && j.val("");
    }, Y = function(e) {
        return H + "-option-" + e;
    };
    F.$watch("activeIdx", function(e) {
        e < 0 ? t.removeAttr("aria-activedescendant") : t.attr("aria-activedescendant", Y(e));
    });
    var X = function(n, o) {
        var a = {
            $viewValue: n
        };
        T(e, !0), O(e, !1), i.when(R.source(e, a)).then(function(i) {
            var r = n === b.$viewValue;
            if (r && C) if (i && 0 < i.length) {
                F.activeIdx = S ? 0 : -1, O(e, !1);
                for (var l = F.matches.length = 0; l < i.length; l++) a[R.itemName] = i[l], F.matches.push({
                    id: Y(l),
                    label: R.viewMapper(F, a),
                    model: i[l]
                });
                if (F.query = n, m(), t.attr("aria-expanded", !0), U && 1 === F.matches.length && function(e, t) {
                    return !!(F.matches.length > t && e) && e.toUpperCase() === F.matches[t].label.toUpperCase();
                }(n, 0) && (angular.isNumber(F.debounceUpdate) || angular.isObject(F.debounceUpdate) ? u(function() {
                    F.select(0, o);
                }, angular.isNumber(F.debounceUpdate) ? F.debounceUpdate : F.debounceUpdate.default) : F.select(0, o)), 
                N) {
                    var s = F.matches[0].label;
                    angular.isString(n) && 0 < n.length && s.slice(0, n.length).toUpperCase() === n.toUpperCase() ? j.val(n + s.slice(n.length)) : j.val("");
                }
            } else G(), O(e, !0);
            r && T(e, !1);
        }, function() {
            G(), T(e, !1), O(e, !0);
        });
    };
    M && (angular.element(s).on("resize", f), l.find("body").on("scroll", f));
    var Z = u(function() {
        F.matches.length && m(), F.moveInProgress = !1;
    }, 200);
    F.moveInProgress = !1, F.query = void 0;
    var J, ee = function() {
        J && r.cancel(J);
    };
    G(), F.assignIsOpen = function(t) {
        I(e, t);
    }, F.select = function(o, a) {
        var i, l, s = {};
        x = !0, s[R.itemName] = l = F.matches[o].model, i = R.modelMapper(e, s), function(t, n) {
            angular.isFunction(L(e)) && h.getOption("getterSetter") ? q(t, {
                $$$p: n
            }) : L.assign(t, n);
        }(e, i), b.$setValidity("editable", !0), b.$setValidity("parse", !0), P(e, {
            $item: l,
            $model: i,
            $label: R.viewMapper(e, s),
            $event: a
        }), G(), !1 !== F.$eval(n.typeaheadFocusOnSelect) && r(function() {
            t[0].focus();
        }, 0, !1);
    }, t.on("keydown", function(t) {
        if (0 !== F.matches.length && -1 !== v.indexOf(t.which)) {
            var o, n = k(e, {
                $event: t
            });
            if (-1 === F.activeIdx && n || 9 === t.which && t.shiftKey) return G(), void F.$digest();
            switch (t.preventDefault(), t.which) {
              case 27:
                t.stopPropagation(), G(), e.$digest();
                break;

              case 38:
                F.activeIdx = (0 < F.activeIdx ? F.activeIdx : F.matches.length) - 1, F.$digest(), 
                (o = _[0].querySelectorAll(".uib-typeahead-match")[F.activeIdx]).parentNode.scrollTop = o.offsetTop;
                break;

              case 40:
                F.activeIdx = (F.activeIdx + 1) % F.matches.length, F.$digest(), (o = _[0].querySelectorAll(".uib-typeahead-match")[F.activeIdx]).parentNode.scrollTop = o.offsetTop;
                break;

              default:
                n && F.$apply(function() {
                    angular.isNumber(F.debounceUpdate) || angular.isObject(F.debounceUpdate) ? u(function() {
                        F.select(F.activeIdx, t);
                    }, angular.isNumber(F.debounceUpdate) ? F.debounceUpdate : F.debounceUpdate.default) : F.select(F.activeIdx, t);
                });
            }
        }
    }), t.on("focus", function(e) {
        C = !0, 0 !== $ || b.$viewValue || r(function() {
            X(b.$viewValue, e);
        }, 0);
    }), t.on("blur", function(e) {
        D && F.matches.length && -1 !== F.activeIdx && !x && (x = !0, F.$apply(function() {
            angular.isObject(F.debounceUpdate) && angular.isNumber(F.debounceUpdate.blur) ? u(function() {
                F.select(F.activeIdx, e);
            }, F.debounceUpdate.blur) : F.select(F.activeIdx, e);
        })), !y && b.$error.editable && (b.$setViewValue(), F.$apply(function() {
            b.$setValidity("editable", !0), b.$setValidity("parse", !0);
        }), t.val("")), x = C = !1;
    });
    var te = function(n) {
        t[0] !== n.target && 3 !== n.which && 0 !== F.matches.length && (G(), p.$$phase || e.$digest());
    };
    l.on("click", te), e.$on("$destroy", function() {
        l.off("click", te), (M || A) && ne.remove(), M && (angular.element(s).off("resize", f), 
        l.find("body").off("scroll", f)), _.remove(), N && V.remove();
    });
    var ne = o(_)(F);
    M ? l.find("body").append(ne) : A ? angular.element(A).eq(0).append(ne) : t.after(ne), 
    this.init = function(t) {
        h = function(e) {
            var t;
            return angular.version.minor < 6 ? (t = e.$options || {}).getOption = function(e) {
                return t[e];
            } : t = e.$options, t;
        }(b = t), F.debounceUpdate = a(h.getOption("debounce"))(e), b.$parsers.unshift(function(t) {
            return C = !0, 0 === $ || t && t.length >= $ ? 0 < w ? (ee(), function(e) {
                J = r(function() {
                    X(e);
                }, w);
            }(t)) : X(t) : (T(e, !1), ee(), G()), y ? t : t ? void b.$setValidity("editable", !1) : (b.$setValidity("editable", !0), 
            null);
        }), b.$formatters.push(function(t) {
            var n, a = {};
            return y || b.$setValidity("editable", !0), E ? (a.$model = t, E(e, a)) : (a[R.itemName] = t, 
            n = R.viewMapper(e, a), a[R.itemName] = void 0, n !== R.viewMapper(e, a) ? n : t);
        });
    };
} ]).directive("uibTypeahead", function() {
    return {
        controller: "UibTypeaheadController",
        require: [ "ngModel", "uibTypeahead" ],
        link: function(e, t, n, o) {
            o[1].init(o[0]);
        }
    };
}).directive("uibTypeaheadPopup", [ "$$debounce", function(e) {
    return {
        scope: {
            matches: "=",
            query: "=",
            active: "=",
            position: "&",
            moveInProgress: "=",
            select: "&",
            assignIsOpen: "&",
            debounce: "&"
        },
        replace: !0,
        templateUrl: function(e, t) {
            return t.popupTemplateUrl || "uib/template/typeahead/typeahead-popup.html";
        },
        link: function(t, n, o) {
            t.templateUrl = o.templateUrl, t.isOpen = function() {
                var e = 0 < t.matches.length;
                return t.assignIsOpen({
                    isOpen: e
                }), e;
            }, t.isActive = function(e) {
                return t.active === e;
            }, t.selectActive = function(e) {
                t.active = e;
            }, t.selectMatch = function(n, o) {
                var a = t.debounce();
                angular.isNumber(a) || angular.isObject(a) ? e(function() {
                    t.select({
                        activeIdx: n,
                        evt: o
                    });
                }, angular.isNumber(a) ? a : a.default) : t.select({
                    activeIdx: n,
                    evt: o
                });
            };
        }
    };
} ]).directive("uibTypeaheadMatch", [ "$templateRequest", "$compile", "$parse", function(e, t, n) {
    return {
        scope: {
            index: "=",
            match: "=",
            query: "="
        },
        link: function(o, a, i) {
            var r = n(i.templateUrl)(o.$parent) || "uib/template/typeahead/typeahead-match.html";
            e(r).then(function(e) {
                var n = angular.element(e.trim());
                a.replaceWith(n), t(n)(o);
            });
        }
    };
} ]).filter("uibTypeaheadHighlight", [ "$sce", "$injector", "$log", function(e, t, n) {
    var i;
    return i = t.has("$sanitize"), function(t, r) {
        return !i && function(e) {
            return /<.*>/g.test(e);
        }(t) && n.warn("Unsafe use of typeahead please use ngSanitize"), t = r ? ("" + t).replace(new RegExp(function(e) {
            return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        }(r), "gi"), "<strong>$&</strong>") : t, i || (t = e.trustAsHtml(t)), t;
    };
} ]), angular.module("uib/template/tabs/tab.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/tabs/tab.html", '<li ng-class="[{active: active, disabled: disabled}, classes]" class="uib-tab nav-item">\n  <a href ng-click="select($event)" class="nav-link" uib-tab-heading-transclude>{{heading}}</a>\n</li>\n');
} ]), angular.module("uib/template/tabs/tabset.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/tabs/tabset.html", '<div>\n  <ul class="nav nav-{{tabset.type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane"\n         ng-repeat="tab in tabset.tabs"\n         ng-class="{active: tabset.active === tab.index}"\n         uib-tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n');
} ]), angular.module("uib/template/pager/pager.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/pager/pager.html", '<li ng-class="{disabled: noPrevious()||ngDisabled, previous: align}"><a href ng-click="selectPage(page - 1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText(\'previous\')}}</a></li>\n<li ng-class="{disabled: noNext()||ngDisabled, next: align}"><a href ng-click="selectPage(page + 1, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText(\'next\')}}</a></li>\n');
} ]), angular.module("uib/template/pagination/pagination.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/pagination/pagination.html", '<li role="menuitem" ng-if="::boundaryLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-first"><a href ng-click="selectPage(1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText(\'first\')}}</a></li>\n<li role="menuitem" ng-if="::directionLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-prev"><a href ng-click="selectPage(page - 1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText(\'previous\')}}</a></li>\n<li role="menuitem" ng-repeat="page in pages track by $index" ng-class="{active: page.active,disabled: ngDisabled&&!page.active}" class="pagination-page"><a href ng-click="selectPage(page.number, $event)" ng-disabled="ngDisabled&&!page.active" uib-tabindex-toggle>{{page.text}}</a></li>\n<li role="menuitem" ng-if="::directionLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-next"><a href ng-click="selectPage(page + 1, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText(\'next\')}}</a></li>\n<li role="menuitem" ng-if="::boundaryLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-last"><a href ng-click="selectPage(totalPages, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText(\'last\')}}</a></li>\n');
} ]), angular.module("uib/template/alert/alert.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/alert/alert.html", '<button ng-show="closeable" type="button" class="close" ng-click="close({$event: $event})">\n  <span aria-hidden="true">&times;</span>\n  <span class="sr-only">Close</span>\n</button>\n<div ng-transclude></div>\n');
} ]), angular.module("uib/template/progressbar/progressbar.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/progressbar/progressbar.html", '<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n</div>\n');
} ]), angular.module("uib/template/progressbar/progress.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/progressbar/progress.html", '<div class="progress" ng-transclude aria-labelledby="{{::title}}"></div>\n');
} ]), angular.module("uib/template/progressbar/bar.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n');
} ]), angular.module("uib/template/modal/window.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/modal/window.html", "<div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n");
} ]), angular.module("uib/template/tooltip/tooltip-popup.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/tooltip/tooltip-popup.html", '<div class="tooltip-arrow"></div>\n<div class="tooltip-inner" ng-bind="content"></div>\n');
} ]), angular.module("uib/template/tooltip/tooltip-html-popup.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/tooltip/tooltip-html-popup.html", '<div class="tooltip-arrow"></div>\n<div class="tooltip-inner" ng-bind-html="contentExp()"></div>\n');
} ]), angular.module("uib/template/tooltip/tooltip-template-popup.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/tooltip/tooltip-template-popup.html", '<div class="tooltip-arrow"></div>\n<div class="tooltip-inner"\n  uib-tooltip-template-transclude="contentExp()"\n  tooltip-template-transclude-scope="originScope()"></div>\n');
} ]), angular.module("uib/template/popover/popover.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/popover/popover.html", '<div class="arrow"></div>\n<div class="popover-inner">\n    <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n    <div class="popover-content" ng-bind="content"></div>\n</div>\n');
} ]), angular.module("uib/template/popover/popover-html.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/popover/popover-html.html", '<div class="arrow"></div>\n<div class="popover-inner">\n    <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n    <div class="popover-content" ng-bind-html="contentExp()"></div>\n</div>\n');
} ]), angular.module("uib/template/popover/popover-template.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/popover/popover-template.html", '<div class="arrow"></div>\n<div class="popover-inner">\n    <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n    <div class="popover-content"\n      uib-tooltip-template-transclude="contentExp()"\n      tooltip-template-transclude-scope="originScope()"></div>\n</div>\n');
} ]), angular.module("uib/template/carousel/carousel.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/carousel/carousel.html", '<div class="carousel-inner" ng-transclude></div>\n<a role="button" href class="left carousel-control" ng-click="prev()" ng-class="{ disabled: isPrevDisabled() }" ng-show="slides.length > 1">\n  <span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span>\n  <span class="sr-only">previous</span>\n</a>\n<a role="button" href class="right carousel-control" ng-click="next()" ng-class="{ disabled: isNextDisabled() }" ng-show="slides.length > 1">\n  <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>\n  <span class="sr-only">next</span>\n</a>\n<ol class="carousel-indicators" ng-show="slides.length > 1">\n  <li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{ active: isActive(slide) }" ng-click="select(slide)">\n    <span class="sr-only">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if="isActive(slide)">, currently active</span></span>\n  </li>\n</ol>\n');
} ]), angular.module("uib/template/carousel/slide.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/carousel/slide.html", '<div class="text-center" ng-transclude></div>\n');
} ]), angular.module("uib/template/accordion/accordion-group.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/accordion/accordion-group.html", '<div role="tab" id="{{::headingId}}" aria-selected="{{isOpen}}" class="panel-heading" ng-keypress="toggleOpen($event)">\n  <h4 class="panel-title">\n    <a role="button" data-toggle="collapse" href aria-expanded="{{isOpen}}" aria-controls="{{::panelId}}" tabindex="0" class="accordion-toggle" ng-click="toggleOpen()" uib-accordion-transclude="heading" ng-disabled="isDisabled" uib-tabindex-toggle><span uib-accordion-header ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n  </h4>\n</div>\n<div id="{{::panelId}}" aria-labelledby="{{::headingId}}" aria-hidden="{{!isOpen}}" role="tabpanel" class="panel-collapse collapse" uib-collapse="!isOpen">\n  <div class="panel-body" ng-transclude></div>\n</div>\n');
} ]), angular.module("uib/template/accordion/accordion.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/accordion/accordion.html", '<div role="tablist" class="panel-group" ng-transclude></div>\n');
} ]), angular.module("uib/template/typeahead/typeahead-match.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/typeahead/typeahead-match.html", '<a href\n   tabindex="-1"\n   ng-bind-html="match.label | uibTypeaheadHighlight:query"\n   ng-attr-title="{{match.label}}"></a>\n');
} ]), angular.module("uib/template/typeahead/typeahead-popup.html", []).run([ "$templateCache", function(e) {
    e.put("uib/template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-show="isOpen() && !moveInProgress" ng-style="{top: position().top+\'px\', left: position().left+\'px\'}" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li class="uib-typeahead-match" ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index, $event)" role="option" id="{{::match.id}}">\n        <div uib-typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n');
} ]), angular.module("ui.bootstrap.position").run(function() {
    !angular.$$csp().noInlineStyle && !angular.$$uibPositionCss && angular.element(document).find("head").prepend('<style type="text/css">.uib-position-measure {display: block !important;visibility: hidden !important;position: absolute !important;top: -9999px !important;left: -9999px !important;}.uib-position-scrollbar-measure {position: absolute !important;top: -9999px !important;width: 50px !important;height: 50px !important;overflow: scroll !important;}.uib-position-body-scrollbar-measure {overflow: scroll !important;}</style>'), 
    angular.$$uibPositionCss = !0;
}), angular.module("ui.bootstrap.tooltip").run(function() {
    !angular.$$csp().noInlineStyle && !angular.$$uibTooltipCss && angular.element(document).find("head").prepend('<style type="text/css">[uib-tooltip-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-bottom > .tooltip-arrow,[uib-popover-popup].popover.top-left > .arrow,[uib-popover-popup].popover.top-right > .arrow,[uib-popover-popup].popover.bottom-left > .arrow,[uib-popover-popup].popover.bottom-right > .arrow,[uib-popover-popup].popover.left-top > .arrow,[uib-popover-popup].popover.left-bottom > .arrow,[uib-popover-popup].popover.right-top > .arrow,[uib-popover-popup].popover.right-bottom > .arrow,[uib-popover-html-popup].popover.top-left > .arrow,[uib-popover-html-popup].popover.top-right > .arrow,[uib-popover-html-popup].popover.bottom-left > .arrow,[uib-popover-html-popup].popover.bottom-right > .arrow,[uib-popover-html-popup].popover.left-top > .arrow,[uib-popover-html-popup].popover.left-bottom > .arrow,[uib-popover-html-popup].popover.right-top > .arrow,[uib-popover-html-popup].popover.right-bottom > .arrow,[uib-popover-template-popup].popover.top-left > .arrow,[uib-popover-template-popup].popover.top-right > .arrow,[uib-popover-template-popup].popover.bottom-left > .arrow,[uib-popover-template-popup].popover.bottom-right > .arrow,[uib-popover-template-popup].popover.left-top > .arrow,[uib-popover-template-popup].popover.left-bottom > .arrow,[uib-popover-template-popup].popover.right-top > .arrow,[uib-popover-template-popup].popover.right-bottom > .arrow {top: auto;bottom: auto;left: auto;right: auto;margin: 0;}[uib-popover-popup].popover,[uib-popover-html-popup].popover,[uib-popover-template-popup].popover {display: block !important;}</style>'), 
    angular.$$uibTooltipCss = !0;
}), angular.module("ui.bootstrap.carousel").run(function() {
    !angular.$$csp().noInlineStyle && !angular.$$uibCarouselCss && angular.element(document).find("head").prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right) {-webkit-transition: 0s ease-in-out left;transition: 0s ease-in-out left}</style>'), 
    angular.$$uibCarouselCss = !0;
}), angular.module("ui.bootstrap.typeahead").run(function() {
    !angular.$$csp().noInlineStyle && !angular.$$uibTypeaheadCss && angular.element(document).find("head").prepend('<style type="text/css">[uib-typeahead-popup].dropdown-menu {display: block;}</style>'), 
    angular.$$uibTypeaheadCss = !0;
});