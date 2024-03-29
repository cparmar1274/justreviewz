!function() {
    "use strict";
    function e(e) {
        return angular.isUndefined(e) || null === e;
    }
    var t = {
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        HOME: 36,
        END: 35,
        BACKSPACE: 8,
        DELETE: 46,
        COMMAND: 91,
        MAP: {
            91: "COMMAND",
            8: "BACKSPACE",
            9: "TAB",
            13: "ENTER",
            16: "SHIFT",
            17: "CTRL",
            18: "ALT",
            19: "PAUSEBREAK",
            20: "CAPSLOCK",
            27: "ESC",
            32: "SPACE",
            33: "PAGE_UP",
            34: "PAGE_DOWN",
            35: "END",
            36: "HOME",
            37: "LEFT",
            38: "UP",
            39: "RIGHT",
            40: "DOWN",
            43: "+",
            44: "PRINTSCREEN",
            45: "INSERT",
            46: "DELETE",
            48: "0",
            49: "1",
            50: "2",
            51: "3",
            52: "4",
            53: "5",
            54: "6",
            55: "7",
            56: "8",
            57: "9",
            59: ";",
            61: "=",
            65: "A",
            66: "B",
            67: "C",
            68: "D",
            69: "E",
            70: "F",
            71: "G",
            72: "H",
            73: "I",
            74: "J",
            75: "K",
            76: "L",
            77: "M",
            78: "N",
            79: "O",
            80: "P",
            81: "Q",
            82: "R",
            83: "S",
            84: "T",
            85: "U",
            86: "V",
            87: "W",
            88: "X",
            89: "Y",
            90: "Z",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NUMLOCK",
            145: "SCROLLLOCK",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'"
        },
        isControl: function(e) {
            switch (e.which) {
              case t.COMMAND:
              case t.SHIFT:
              case t.CTRL:
              case t.ALT:
                return !0;
            }
            return !!(e.metaKey || e.ctrlKey || e.altKey);
        },
        isFunctionKey: function(e) {
            return 112 <= (e = e.which ? e.which : e) && e <= 123;
        },
        isVerticalMovement: function(e) {
            return ~[ t.UP, t.DOWN ].indexOf(e);
        },
        isHorizontalMovement: function(e) {
            return ~[ t.LEFT, t.RIGHT, t.BACKSPACE, t.DELETE ].indexOf(e);
        },
        toSeparator: function(e) {
            return {
                ENTER: "\n",
                TAB: "\t",
                SPACE: " "
            }[e] || (t[e] ? void 0 : e);
        }
    };
    void 0 === angular.element.prototype.querySelectorAll && (angular.element.prototype.querySelectorAll = function(e) {
        return angular.element(this[0].querySelectorAll(e));
    }), void 0 === angular.element.prototype.closest && (angular.element.prototype.closest = function(e) {
        for (var t = this[0], i = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector; t; ) {
            if (i.bind(t)(e)) return t;
            t = t.parentElement;
        }
        return !1;
    });
    var i = 0, s = angular.module("ui.select", []).constant("uiSelectConfig", {
        theme: "bootstrap",
        searchEnabled: !0,
        sortable: !1,
        placeholder: "",
        refreshDelay: 1e3,
        closeOnSelect: !0,
        skipFocusser: !1,
        dropdownPosition: "auto",
        removeSelected: !0,
        resetSearchInput: !0,
        generateId: function() {
            return i++;
        },
        appendToBody: !1,
        spinnerEnabled: !1,
        spinnerClass: "glyphicon glyphicon-refresh ui-select-spin",
        backspaceReset: !0
    }).service("uiSelectMinErr", function() {
        var e = angular.$$minErr("ui.select");
        return function() {
            var t = e.apply(this, arguments).message.replace(new RegExp("\nhttp://errors.angularjs.org/.*"), "");
            return new Error(t);
        };
    }).directive("uisTranscludeAppend", function() {
        return {
            link: function(e, t, i, s, c) {
                c(e, function(e) {
                    t.append(e);
                });
            }
        };
    }).filter("highlight", function() {
        return function(t, i) {
            return i && t ? ("" + t).replace(new RegExp(function(e) {
                return ("" + e).replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            }(i), "gi"), '<span class="ui-select-highlight">$&</span>') : t;
        };
    }).factory("uisOffset", [ "$document", "$window", function(e, t) {
        return function(i) {
            var s = i[0].getBoundingClientRect();
            return {
                width: s.width || i.prop("offsetWidth"),
                height: s.height || i.prop("offsetHeight"),
                top: s.top + (t.pageYOffset || e[0].documentElement.scrollTop),
                left: s.left + (t.pageXOffset || e[0].documentElement.scrollLeft)
            };
        };
    } ]);
    s.factory("$$uisDebounce", [ "$timeout", function(e) {
        return function(t, i) {
            var s;
            return function() {
                var c = this, n = Array.prototype.slice.call(arguments);
                s && e.cancel(s), s = e(function() {
                    t.apply(c, n);
                }, i);
            };
        };
    } ]), s.directive("uiSelectChoices", [ "uiSelectConfig", "uisRepeatParser", "uiSelectMinErr", "$compile", "$window", function(e, t, i, s, c) {
        return {
            restrict: "EA",
            require: "^uiSelect",
            replace: !0,
            transclude: !0,
            templateUrl: function(t) {
                return t.addClass("ui-select-choices"), (t.parent().attr("theme") || e.theme) + "/choices.tpl.html";
            },
            compile: function(s, n) {
                if (!n.repeat) throw i("repeat", "Expected 'repeat' expression.");
                var l = n.groupBy, a = n.groupFilter;
                if (l) {
                    var r = s.querySelectorAll(".ui-select-choices-group");
                    if (1 !== r.length) throw i("rows", "Expected 1 .ui-select-choices-group but got '{0}'.", r.length);
                    r.attr("ng-repeat", t.getGroupNgRepeatExpression());
                }
                var o = t.parse(n.repeat), u = s.querySelectorAll(".ui-select-choices-row");
                if (1 !== u.length) throw i("rows", "Expected 1 .ui-select-choices-row but got '{0}'.", u.length);
                u.attr("ng-repeat", o.repeatExpression(l)).attr("ng-if", "$select.open");
                var d = s.querySelectorAll(".ui-select-choices-row-inner");
                if (1 !== d.length) throw i("rows", "Expected 1 .ui-select-choices-row-inner but got '{0}'.", d.length);
                return d.attr("uis-transclude-append", ""), (c.document.addEventListener ? u : d).attr("ng-click", "$select.select(" + o.itemName + ",$select.skipFocusser,$event)"), 
                function(t, i, c, n) {
                    n.parseRepeatAttr(c.repeat, l, a), n.disableChoiceExpression = c.uiDisableChoice, 
                    n.onHighlightCallback = c.onHighlight, n.minimumInputLength = parseInt(c.minimumInputLength) || 0, 
                    n.dropdownPosition = c.position ? c.position.toLowerCase() : e.dropdownPosition, 
                    t.$watch("$select.search", function(e) {
                        e && !n.open && n.multiple && n.activate(!1, !0), n.activeIndex = n.tagging.isActivated ? -1 : 0, 
                        !c.minimumInputLength || n.search.length >= c.minimumInputLength ? n.refresh(c.refresh) : n.items = [];
                    }), c.$observe("refreshDelay", function() {
                        var i = t.$eval(c.refreshDelay);
                        n.refreshDelay = void 0 !== i ? i : e.refreshDelay;
                    }), t.$watch("$select.open", function(e) {
                        e ? (s.attr("role", "listbox"), n.refresh(c.refresh)) : i.removeAttr("role");
                    });
                };
            }
        };
    } ]), s.controller("uiSelectCtrl", [ "$scope", "$element", "$timeout", "$filter", "$$uisDebounce", "uisRepeatParser", "uiSelectMinErr", "uiSelectConfig", "$parse", "$injector", "$window", function(i, s, c, n, l, a, r, o, u, d, p) {
        function g() {
            w.resetSearchInput && (w.search = y, w.selected && w.items.length && !w.multiple && (w.activeIndex = function(e, t, i) {
                if (e.findIndex) return e.findIndex(t, i);
                for (var s, c = Object(e), n = c.length >>> 0, l = 0; l < n; l++) if (s = c[l], 
                t.call(i, s, l, c)) return l;
                return -1;
            }(w.items, function(e) {
                return angular.equals(this, e);
            }, w.selected)));
        }
        function m(e) {
            return -1 < S.indexOf(e);
        }
        function b() {
            var e = s.querySelectorAll(".ui-select-choices-content"), t = e.querySelectorAll(".ui-select-choices-row");
            if (t.length < 1) throw r("choices", "Expected multiple .ui-select-choices-row but got '{0}'.", t.length);
            if (!(w.activeIndex < 0)) {
                var i = t[w.activeIndex], c = i.offsetTop + i.clientHeight - e[0].scrollTop, n = e[0].offsetHeight;
                n < c ? e[0].scrollTop += c - n : c < i.clientHeight && (w.isGrouped && 0 === w.activeIndex ? e[0].scrollTop = 0 : e[0].scrollTop -= i.clientHeight - c);
            }
        }
        var x, w = this, y = "";
        if (w.placeholder = o.placeholder, w.searchEnabled = o.searchEnabled, w.sortable = o.sortable, 
        w.refreshDelay = o.refreshDelay, w.paste = o.paste, w.resetSearchInput = o.resetSearchInput, 
        w.refreshing = !1, w.spinnerEnabled = o.spinnerEnabled, w.spinnerClass = o.spinnerClass, 
        w.removeSelected = o.removeSelected, w.closeOnSelect = !0, w.skipFocusser = !1, 
        w.search = y, w.activeIndex = 0, w.items = [], w.open = !1, w.focus = !1, w.disabled = !1, 
        w.selected = void 0, w.dropdownPosition = "auto", w.focusser = void 0, w.multiple = void 0, 
        w.disableChoiceExpression = void 0, w.tagging = {
            isActivated: !1,
            fct: void 0
        }, w.taggingTokens = {
            isActivated: !1,
            tokens: void 0
        }, w.lockChoiceExpression = void 0, w.clickTriggeredSelect = !1, w.$filter = n, 
        w.$element = s, w.$animate = function() {
            try {
                return d.get("$animate");
            } catch (e) {
                return null;
            }
        }(), w.searchInput = s.querySelectorAll("input.ui-select-search"), 1 !== w.searchInput.length) throw r("searchInput", "Expected 1 input.ui-select-search but got '{0}'.", w.searchInput.length);
        w.isEmpty = function() {
            return e(w.selected) || "" === w.selected || w.multiple && 0 === w.selected.length;
        }, w.activate = function(e, t) {
            if (w.disabled || w.open) w.open && !w.searchEnabled && w.close(); else {
                t || g(), i.$broadcast("uis:activate"), w.open = !0, w.activeIndex = w.activeIndex >= w.items.length ? 0 : w.activeIndex, 
                -1 === w.activeIndex && !1 !== w.taggingLabel && (w.activeIndex = 0);
                var n = s.querySelectorAll(".ui-select-choices-content"), l = s.querySelectorAll(".ui-select-search");
                if (w.$animate && w.$animate.on && w.$animate.enabled(n[0])) {
                    var a = function(t, i) {
                        "start" === i && 0 === w.items.length ? (w.$animate.off("removeClass", l[0], a), 
                        c(function() {
                            w.focusSearchInput(e);
                        })) : "close" === i && (w.$animate.off("enter", n[0], a), c(function() {
                            w.focusSearchInput(e);
                        }));
                    };
                    0 < w.items.length ? w.$animate.on("enter", n[0], a) : w.$animate.on("removeClass", l[0], a);
                } else c(function() {
                    w.focusSearchInput(e), !w.tagging.isActivated && 1 < w.items.length && b();
                });
            }
        }, w.focusSearchInput = function(e) {
            w.search = e || w.search, w.searchInput[0].focus();
        }, w.findGroupByName = function(e) {
            return w.groups && w.groups.filter(function(t) {
                return t.name === e;
            })[0];
        }, w.parseRepeatAttr = function(e, t, s) {
            w.setItemsFn = t ? function(e) {
                var c = i.$eval(t);
                if (w.groups = [], angular.forEach(e, function(e) {
                    var t = angular.isFunction(c) ? c(e) : e[c], i = w.findGroupByName(t);
                    i ? i.items.push(e) : w.groups.push({
                        name: t,
                        items: [ e ]
                    });
                }), s) {
                    var n = i.$eval(s);
                    angular.isFunction(n) ? w.groups = n(w.groups) : angular.isArray(n) && (w.groups = function(e, t) {
                        var i, s, c = [];
                        for (i = 0; i < t.length; i++) for (s = 0; s < e.length; s++) e[s].name == [ t[i] ] && c.push(e[s]);
                        return c;
                    }(w.groups, n));
                }
                w.items = [], w.groups.forEach(function(e) {
                    w.items = w.items.concat(e.items);
                });
            } : function(e) {
                w.items = e || [];
            }, w.parserResult = a.parse(e), w.isGrouped = !!t, w.itemProperty = w.parserResult.itemName;
            var c = w.parserResult.source, n = function() {
                var e = c(i);
                i.$uisSource = Object.keys(e).map(function(t) {
                    var i = {};
                    return i[w.parserResult.keyName] = t, i.value = e[t], i;
                });
            };
            w.parserResult.keyName && (n(), w.parserResult.source = u("$uisSource" + w.parserResult.filters), 
            i.$watch(c, function(e, t) {
                e !== t && n();
            }, !0)), w.refreshItems = function(e) {
                e = e || w.parserResult.source(i);
                var t = w.selected;
                if (w.isEmpty() || angular.isArray(t) && !t.length || !w.multiple || !w.removeSelected) w.setItemsFn(e); else if (null != e) {
                    var s = e.filter(function(e) {
                        return angular.isArray(t) ? t.every(function(t) {
                            return !angular.equals(e, t);
                        }) : !angular.equals(e, t);
                    });
                    w.setItemsFn(s);
                }
                "auto" !== w.dropdownPosition && "up" !== w.dropdownPosition || i.calculateDropdownPos(), 
                i.$broadcast("uis:refresh");
            }, i.$watchCollection(w.parserResult.source, function(e) {
                if (null == e) w.items = []; else {
                    if (!angular.isArray(e)) throw r("items", "Expected an array but got '{0}'.", e);
                    w.refreshItems(e), angular.isDefined(w.ngModel.$modelValue) && (w.ngModel.$modelValue = null);
                }
            });
        }, w.refresh = function(e) {
            void 0 !== e && (x && c.cancel(x), x = c(function() {
                if (i.$select.search.length >= i.$select.minimumInputLength) {
                    var t = i.$eval(e);
                    t && angular.isFunction(t.then) && !w.refreshing && (w.refreshing = !0, t.finally(function() {
                        w.refreshing = !1;
                    }));
                }
            }, w.refreshDelay));
        }, w.isActive = function(e) {
            if (!w.open) return !1;
            var t = w.items.indexOf(e[w.itemProperty]), i = t == w.activeIndex;
            return !(!i || t < 0) && (i && !angular.isUndefined(w.onHighlightCallback) && e.$eval(w.onHighlightCallback), 
            i);
        };
        var E = function(e) {
            return w.selected && angular.isArray(w.selected) && 0 < w.selected.filter(function(t) {
                return angular.equals(t, e);
            }).length;
        }, S = [];
        w.isDisabled = function(e) {
            if (w.open) {
                var t = e[w.itemProperty], i = !1;
                if (0 <= w.items.indexOf(t) && (angular.isDefined(w.disableChoiceExpression) || w.multiple)) {
                    if (t.isTag) return !1;
                    w.multiple && (i = E(t)), !i && angular.isDefined(w.disableChoiceExpression) && (i = !!e.$eval(w.disableChoiceExpression)), 
                    function(e, t) {
                        var i = S.indexOf(e);
                        t && -1 === i && S.push(e), !t && -1 < i && S.splice(i, 1);
                    }(t, i);
                }
                return i;
            }
        }, w.select = function(t, s, c) {
            if (e(t) || !m(t)) {
                if (!w.items && !w.search && !w.tagging.isActivated) return;
                if (!t || !m(t)) {
                    if (w.clickTriggeredSelect = !1, c && ("click" === c.type || "touchend" === c.type) && t && (w.clickTriggeredSelect = !0), 
                    w.tagging.isActivated && !1 === w.clickTriggeredSelect) {
                        if (!1 === w.taggingLabel) if (w.activeIndex < 0) {
                            if (void 0 === t && (t = void 0 !== w.tagging.fct ? w.tagging.fct(w.search) : w.search), 
                            !t || angular.equals(w.items[0], t)) return;
                        } else t = w.items[w.activeIndex]; else if (0 === w.activeIndex) {
                            if (void 0 === t) return;
                            if (void 0 !== w.tagging.fct && "string" == typeof t) {
                                if (!(t = w.tagging.fct(t))) return;
                            } else "string" == typeof t && (t = t.replace(w.taggingLabel, "").trim());
                        }
                        if (E(t)) return void w.close(s);
                    }
                    g(), i.$broadcast("uis:select", t), w.closeOnSelect && w.close(s);
                }
            }
        }, w.close = function(e) {
            w.open && (w.ngModel && w.ngModel.$setTouched && w.ngModel.$setTouched(), w.open = !1, 
            g(), i.$broadcast("uis:close", e));
        }, w.setFocus = function() {
            w.focus || w.focusInput[0].focus();
        }, w.clear = function(e) {
            w.select(null), e.stopPropagation(), c(function() {
                w.focusser[0].focus();
            }, 0, !1);
        }, w.toggle = function(e) {
            w.open ? (w.close(), e.preventDefault(), e.stopPropagation()) : w.activate();
        }, w.isLocked = function() {
            return !1;
        }, i.$watch(function() {
            return angular.isDefined(w.lockChoiceExpression) && "" !== w.lockChoiceExpression;
        }, function(e) {
            function t(e, t) {
                var i = s.indexOf(e);
                t && -1 === i && s.push(e), !t && -1 < i && s.splice(i, 1);
            }
            function i(e) {
                return -1 < s.indexOf(e);
            }
            if (e) {
                var s = [];
                w.isLocked = function(e, s) {
                    var c = !1, n = w.selected[s];
                    return n && (e ? t(n, c = !!e.$eval(w.lockChoiceExpression)) : c = i(n)), c;
                };
            }
        });
        var I = null, C = !1;
        w.sizeSearchInput = function() {
            var e = w.searchInput[0], t = w.$element[0], s = function() {
                return t.clientWidth * !!e.offsetParent;
            }, n = function(t) {
                if (0 === t) return !1;
                var i = t - e.offsetLeft;
                return i < 50 && (i = t), w.searchInput.css("width", i + "px"), !0;
            };
            w.searchInput.css("width", "10px"), c(function() {
                null !== I || n(s()) || (I = i.$watch(function() {
                    C || (C = !0, i.$$postDigest(function() {
                        C = !1, n(s()) && (I(), I = null);
                    }));
                }, angular.noop));
            });
        }, w.searchInput.on("keydown", function(e) {
            var s = e.which;
            ~[ t.ENTER, t.ESC ].indexOf(s) && (e.preventDefault(), e.stopPropagation()), i.$apply(function() {
                var i = !1;
                if ((0 < w.items.length || w.tagging.isActivated) && (function(e) {
                    var i = !0;
                    switch (e) {
                      case t.DOWN:
                        if (!w.open && w.multiple) w.activate(!1, !0); else if (w.activeIndex < w.items.length - 1) for (var s = ++w.activeIndex; m(w.items[s]) && s < w.items.length; ) w.activeIndex = ++s;
                        break;

                      case t.UP:
                        var c = 0 === w.search.length && w.tagging.isActivated ? -1 : 0;
                        if (!w.open && w.multiple) w.activate(!1, !0); else if (w.activeIndex > c) for (var n = --w.activeIndex; m(w.items[n]) && c < n; ) w.activeIndex = --n;
                        break;

                      case t.TAB:
                        w.multiple && !w.open || w.select(w.items[w.activeIndex], !0);
                        break;

                      case t.ENTER:
                        w.open && (w.tagging.isActivated || 0 <= w.activeIndex) ? w.select(w.items[w.activeIndex], w.skipFocusser) : w.activate(!1, !0);
                        break;

                      case t.ESC:
                        w.close();
                        break;

                      default:
                        i = !1;
                    }
                    return i;
                }(s) || w.searchEnabled || (e.preventDefault(), e.stopPropagation()), w.taggingTokens.isActivated)) {
                    for (var n = 0; n < w.taggingTokens.tokens.length; n++) w.taggingTokens.tokens[n] === t.MAP[e.keyCode] && 0 < w.search.length && (i = !0);
                    i && c(function() {
                        w.searchInput.triggerHandler("tagged");
                        var i = w.search.replace(t.MAP[e.keyCode], "").trim();
                        w.tagging.fct && (i = w.tagging.fct(i)), i && w.select(i, !0);
                    });
                }
            }), t.isVerticalMovement(s) && 0 < w.items.length && b(), s !== t.ENTER && s !== t.ESC || (e.preventDefault(), 
            e.stopPropagation());
        }), w.searchInput.on("paste", function(e) {
            var i;
            if (i = window.clipboardData && window.clipboardData.getData ? window.clipboardData.getData("Text") : (e.originalEvent || e).clipboardData.getData("text/plain"), 
            (i = w.search + i) && 0 < i.length) if (w.taggingTokens.isActivated) {
                for (var s = [], c = 0; c < w.taggingTokens.tokens.length; c++) {
                    var n = t.toSeparator(w.taggingTokens.tokens[c]) || w.taggingTokens.tokens[c];
                    if (-1 < i.indexOf(n)) {
                        s = i.split(n);
                        break;
                    }
                }
                0 === s.length && (s = [ i ]);
                var l = w.search;
                angular.forEach(s, function(e) {
                    var t = w.tagging.fct ? w.tagging.fct(e) : e;
                    t && w.select(t, !0);
                }), w.search = l || y, e.preventDefault(), e.stopPropagation();
            } else w.paste && (w.paste(i), w.search = y, e.preventDefault(), e.stopPropagation());
        }), w.searchInput.on("tagged", function() {
            c(function() {
                g();
            });
        });
        var k = l(function() {
            w.sizeSearchInput();
        }, 50);
        angular.element(p).bind("resize", k), i.$on("$destroy", function() {
            w.searchInput.off("keyup keydown tagged blur paste"), angular.element(p).off("resize", k);
        }), i.$watch("$select.activeIndex", function(e) {
            e && s.find("input").attr("aria-activedescendant", "ui-select-choices-row-" + w.generatedId + "-" + e);
        }), i.$watch("$select.open", function(e) {
            e || s.find("input").removeAttr("aria-activedescendant");
        });
    } ]), s.directive("uiSelect", [ "$document", "uiSelectConfig", "uiSelectMinErr", "uisOffset", "$compile", "$parse", "$timeout", function(e, t, i, s, c, n, l) {
        return {
            restrict: "EA",
            templateUrl: function(e, i) {
                return (i.theme || t.theme) + (angular.isDefined(i.multiple) ? "/select-multiple.tpl.html" : "/select.tpl.html");
            },
            replace: !0,
            transclude: !0,
            require: [ "uiSelect", "^ngModel" ],
            scope: !0,
            controller: "uiSelectCtrl",
            controllerAs: "$select",
            compile: function(c, a) {
                var r = /{(.*)}\s*{(.*)}/.exec(a.ngClass);
                if (r) {
                    var o = "{" + r[1] + ", " + r[2] + "}";
                    a.ngClass = o, c.attr("ng-class", o);
                }
                return angular.isDefined(a.multiple) ? c.append("<ui-select-multiple/>").removeAttr("multiple") : c.append("<ui-select-single/>"), 
                a.inputId && (c.querySelectorAll("input.ui-select-search")[0].id = a.inputId), function(c, a, r, o, u) {
                    function d(e) {
                        if (g.open) {
                            if (!(window.jQuery ? window.jQuery.contains(a[0], e.target) : a[0].contains(e.target)) && !g.clickTriggeredSelect) {
                                var t;
                                if (g.skipFocusser) t = !0; else {
                                    var i = angular.element(e.target).controller("uiSelect");
                                    (t = i && i !== g) || (t = ~[ "input", "button", "textarea", "select" ].indexOf(e.target.tagName.toLowerCase()));
                                }
                                g.close(t), c.$digest();
                            }
                            g.clickTriggeredSelect = !1;
                        }
                    }
                    function p() {
                        var t = s(a);
                        (m = angular.element('<div class="ui-select-placeholder"></div>'))[0].style.width = t.width + "px", 
                        m[0].style.height = t.height + "px", a.after(m), $ = a[0].style.width, e.find("body").append(a), 
                        a[0].style.position = "absolute", a[0].style.left = t.left + "px", a[0].style.top = t.top + "px", 
                        a[0].style.width = t.width + "px";
                    }
                    function h() {
                        null !== m && (m.replaceWith(a), m = null, a[0].style.position = "", a[0].style.left = "", 
                        a[0].style.top = "", a[0].style.width = $, g.setFocus());
                    }
                    var g = o[0], f = o[1];
                    g.generatedId = t.generateId(), g.baseTitle = r.title || "Select box", g.focusserTitle = g.baseTitle + " focus", 
                    g.focusserId = "focusser-" + g.generatedId, g.closeOnSelect = angular.isDefined(r.closeOnSelect) ? n(r.closeOnSelect)() : t.closeOnSelect, 
                    c.$watch("skipFocusser", function() {
                        var e = c.$eval(r.skipFocusser);
                        g.skipFocusser = void 0 !== e ? e : t.skipFocusser;
                    }), g.onSelectCallback = n(r.onSelect), g.onRemoveCallback = n(r.onRemove), g.ngModel = f, 
                    g.choiceGrouped = function(e) {
                        return g.isGrouped && e && e.name;
                    }, r.tabindex && r.$observe("tabindex", function(e) {
                        g.focusInput.attr("tabindex", e), a.removeAttr("tabindex");
                    }), c.$watch(function() {
                        return c.$eval(r.searchEnabled);
                    }, function(e) {
                        g.searchEnabled = void 0 !== e ? e : t.searchEnabled;
                    }), c.$watch("sortable", function() {
                        var e = c.$eval(r.sortable);
                        g.sortable = void 0 !== e ? e : t.sortable;
                    }), r.$observe("backspaceReset", function() {
                        var e = c.$eval(r.backspaceReset);
                        g.backspaceReset = void 0 === e || e;
                    }), r.$observe("limit", function() {
                        g.limit = angular.isDefined(r.limit) ? parseInt(r.limit, 10) : void 0;
                    }), c.$watch("removeSelected", function() {
                        var e = c.$eval(r.removeSelected);
                        g.removeSelected = void 0 !== e ? e : t.removeSelected;
                    }), r.$observe("disabled", function() {
                        g.disabled = void 0 !== r.disabled && r.disabled;
                    }), r.$observe("resetSearchInput", function() {
                        var e = c.$eval(r.resetSearchInput);
                        g.resetSearchInput = void 0 === e || e;
                    }), r.$observe("paste", function() {
                        g.paste = c.$eval(r.paste);
                    }), r.$observe("tagging", function() {
                        if (void 0 !== r.tagging) {
                            var e = c.$eval(r.tagging);
                            g.tagging = {
                                isActivated: !0,
                                fct: !0 !== e ? e : void 0
                            };
                        } else g.tagging = {
                            isActivated: !1,
                            fct: void 0
                        };
                    }), r.$observe("taggingLabel", function() {
                        void 0 !== r.tagging && ("false" === r.taggingLabel ? g.taggingLabel = !1 : g.taggingLabel = void 0 !== r.taggingLabel ? r.taggingLabel : "(new)");
                    }), r.$observe("taggingTokens", function() {
                        if (void 0 !== r.tagging) {
                            var e = void 0 !== r.taggingTokens ? r.taggingTokens.split("|") : [ ",", "ENTER" ];
                            g.taggingTokens = {
                                isActivated: !0,
                                tokens: e
                            };
                        }
                    }), r.$observe("spinnerEnabled", function() {
                        var e = c.$eval(r.spinnerEnabled);
                        g.spinnerEnabled = void 0 !== e ? e : t.spinnerEnabled;
                    }), r.$observe("spinnerClass", function() {
                        var e = r.spinnerClass;
                        g.spinnerClass = void 0 !== e ? r.spinnerClass : t.spinnerClass;
                    }), angular.isDefined(r.autofocus) && l(function() {
                        g.setFocus();
                    }), angular.isDefined(r.focusOn) && c.$on(r.focusOn, function() {
                        l(function() {
                            g.setFocus();
                        });
                    }), e.on("click", d), c.$on("$destroy", function() {
                        e.off("click", d);
                    }), u(c, function(e) {
                        var t = angular.element("<div>").append(e), s = t.querySelectorAll(".ui-select-match");
                        if (s.removeAttr("ui-select-match"), s.removeAttr("data-ui-select-match"), 1 !== s.length) throw i("transcluded", "Expected 1 .ui-select-match but got '{0}'.", s.length);
                        a.querySelectorAll(".ui-select-match").replaceWith(s);
                        var c = t.querySelectorAll(".ui-select-choices");
                        if (c.removeAttr("ui-select-choices"), c.removeAttr("data-ui-select-choices"), 1 !== c.length) throw i("transcluded", "Expected 1 .ui-select-choices but got '{0}'.", c.length);
                        a.querySelectorAll(".ui-select-choices").replaceWith(c);
                        var n = t.querySelectorAll(".ui-select-no-choice");
                        n.removeAttr("ui-select-no-choice"), n.removeAttr("data-ui-select-no-choice"), 1 == n.length && a.querySelectorAll(".ui-select-no-choice").replaceWith(n);
                    });
                    var v = c.$eval(r.appendToBody);
                    (void 0 !== v ? v : t.appendToBody) && (c.$watch("$select.open", function(e) {
                        e ? p() : h();
                    }), c.$on("$destroy", function() {
                        h();
                    }));
                    var m = null, $ = "", b = null;
                    c.$watch("$select.open", function() {
                        "auto" !== g.dropdownPosition && "up" !== g.dropdownPosition || c.calculateDropdownPos();
                    });
                    var w = function(e, t) {
                        e = e || s(a), t = t || s(b), b[0].style.position = "absolute", b[0].style.top = -1 * t.height + "px", 
                        a.addClass("direction-up");
                    }, x = function() {
                        l(function() {
                            if ("up" === g.dropdownPosition) w(); else {
                                a.removeClass("direction-up");
                                var t = s(a), i = s(b), c = e[0].documentElement.scrollTop || e[0].body.scrollTop;
                                t.top + t.height + i.height > c + e[0].documentElement.clientHeight ? w(t, i) : function(e, t) {
                                    a.removeClass("direction-up"), e = e || s(a), t = t || s(b), b[0].style.position = "", 
                                    b[0].style.top = "";
                                }(t, i);
                            }
                            b[0].style.opacity = 1;
                        });
                    }, E = !1;
                    c.calculateDropdownPos = function() {
                        if (g.open) {
                            if (0 === (b = angular.element(a).querySelectorAll(".ui-select-dropdown")).length) return;
                            if ("" !== g.search || E || (b[0].style.opacity = 0, E = !0), !s(b).height && g.$animate && g.$animate.on && g.$animate.enabled(b)) {
                                var e = !0;
                                g.$animate.on("enter", b, function(t, i) {
                                    "close" === i && e && (x(), e = !1);
                                });
                            } else x();
                        } else {
                            if (null === b || 0 === b.length) return;
                            b[0].style.opacity = 0, b[0].style.position = "", b[0].style.top = "", a.removeClass("direction-up");
                        }
                    };
                };
            }
        };
    } ]), s.directive("uiSelectMatch", [ "uiSelectConfig", function(e) {
        function t(e, t) {
            return e[0].hasAttribute(t) ? e.attr(t) : e[0].hasAttribute("data-" + t) ? e.attr("data-" + t) : e[0].hasAttribute("x-" + t) ? e.attr("x-" + t) : void 0;
        }
        return {
            restrict: "EA",
            require: "^uiSelect",
            replace: !0,
            transclude: !0,
            templateUrl: function(i) {
                i.addClass("ui-select-match");
                var s = i.parent();
                return (t(s, "theme") || e.theme) + (angular.isDefined(t(s, "multiple")) ? "/match-multiple.tpl.html" : "/match.tpl.html");
            },
            link: function(t, i, s, c) {
                function n(e) {
                    c.allowClear = !!angular.isDefined(e) && ("" === e || "true" === e.toLowerCase());
                }
                c.lockChoiceExpression = s.uiLockChoice, s.$observe("placeholder", function(t) {
                    c.placeholder = void 0 !== t ? t : e.placeholder;
                }), s.$observe("allowClear", n), n(s.allowClear), c.multiple && c.sizeSearchInput();
            }
        };
    } ]), s.directive("uiSelectMultiple", [ "uiSelectMinErr", "$timeout", function(i, s) {
        return {
            restrict: "EA",
            require: [ "^uiSelect", "^ngModel" ],
            controller: [ "$scope", "$timeout", function(e, t) {
                var i, s = this, c = e.$select;
                angular.isUndefined(c.selected) && (c.selected = []), e.$evalAsync(function() {
                    i = e.ngModel;
                }), s.activeMatchIndex = -1, s.updateModel = function() {
                    i.$setViewValue(Date.now()), s.refreshComponent();
                }, s.refreshComponent = function() {
                    c.refreshItems && c.refreshItems(), c.sizeSearchInput && c.sizeSearchInput();
                }, s.removeChoice = function(i) {
                    if (c.isLocked(null, i)) return !1;
                    var n = c.selected[i], l = {};
                    return l[c.parserResult.itemName] = n, c.selected.splice(i, 1), s.activeMatchIndex = -1, 
                    c.sizeSearchInput(), t(function() {
                        c.onRemoveCallback(e, {
                            $item: n,
                            $model: c.parserResult.modelMapper(e, l)
                        });
                    }), s.updateModel(), !0;
                }, s.getPlaceholder = function() {
                    if (!c.selected || !c.selected.length) return c.placeholder;
                };
            } ],
            controllerAs: "$selectMultiple",
            link: function(c, n, l, a) {
                function o(e) {
                    var i = function(e) {
                        return angular.isNumber(e.selectionStart) ? e.selectionStart : e.value.length;
                    }(p.searchInput[0]), s = p.selected.length - 1, c = g.activeMatchIndex, n = g.activeMatchIndex + 1, l = g.activeMatchIndex - 1, a = c;
                    return !(0 < i || p.search.length && e == t.RIGHT || (p.close(), a = function() {
                        switch (e) {
                          case t.LEFT:
                            return ~g.activeMatchIndex ? l : s;

                          case t.RIGHT:
                            return ~g.activeMatchIndex && c !== s ? n : (p.activate(), !1);

                          case t.BACKSPACE:
                            return ~g.activeMatchIndex ? g.removeChoice(c) ? l : c : s;

                          case t.DELETE:
                            return !!~g.activeMatchIndex && (g.removeChoice(g.activeMatchIndex), c);
                        }
                    }(), p.selected.length && !1 !== a ? g.activeMatchIndex = Math.min(s, Math.max(0, a)) : g.activeMatchIndex = -1, 
                    0));
                }
                function u(e) {
                    return void 0 !== e && void 0 !== p.search && 0 < e.filter(function(e) {
                        return void 0 !== p.search.toUpperCase() && void 0 !== e && e.toUpperCase() === p.search.toUpperCase();
                    }).length;
                }
                function d(e, t) {
                    var i = -1;
                    if (angular.isArray(e)) for (var s = angular.copy(e), c = 0; c < s.length; c++) if (void 0 === p.tagging.fct) s[c] + " " + p.taggingLabel === t && (i = c); else {
                        var n = s[c];
                        angular.isObject(n) && (n.isTag = !0), angular.equals(n, t) && (i = c);
                    }
                    return i;
                }
                var p = a[0], h = c.ngModel = a[1], g = c.$selectMultiple;
                p.multiple = !0, p.focusInput = p.searchInput, h.$isEmpty = function(e) {
                    return !e || 0 === e.length;
                }, h.$parsers.unshift(function() {
                    for (var e, t = {}, i = [], s = p.selected.length - 1; 0 <= s; s--) (t = {})[p.parserResult.itemName] = p.selected[s], 
                    e = p.parserResult.modelMapper(c, t), i.unshift(e);
                    return i;
                }), h.$formatters.unshift(function(e) {
                    var t, i = p.parserResult && p.parserResult.source(c, {
                        $select: {
                            search: ""
                        }
                    }), s = {};
                    if (!i) return e;
                    var n = [], l = function(e, i) {
                        if (e && e.length) {
                            for (var l = e.length - 1; 0 <= l; l--) {
                                if (s[p.parserResult.itemName] = e[l], t = p.parserResult.modelMapper(c, s), p.parserResult.trackByExp) {
                                    var a = /(\w*)\./.exec(p.parserResult.trackByExp), r = /\.([^\s]+)/.exec(p.parserResult.trackByExp);
                                    if (a && 0 < a.length && a[1] == p.parserResult.itemName && r && 0 < r.length && t[r[1]] == i[r[1]]) return n.unshift(e[l]), 
                                    !0;
                                }
                                if (angular.equals(t, i)) return n.unshift(e[l]), !0;
                            }
                            return !1;
                        }
                    };
                    if (!e) return n;
                    for (var a = e.length - 1; 0 <= a; a--) l(p.selected, e[a]) || l(i, e[a]) || n.unshift(e[a]);
                    return n;
                }), c.$watchCollection(function() {
                    return h.$modelValue;
                }, function(e, t) {
                    t != e && (angular.isDefined(h.$modelValue) && (h.$modelValue = null), g.refreshComponent());
                }), h.$render = function() {
                    if (!angular.isArray(h.$viewValue)) {
                        if (!e(h.$viewValue)) throw i("multiarr", "Expected model value to be array but got '{0}'", h.$viewValue);
                        h.$viewValue = [];
                    }
                    p.selected = h.$viewValue, g.refreshComponent(), c.$evalAsync();
                }, c.$on("uis:select", function(e, t) {
                    if (!(p.selected.length >= p.limit)) {
                        p.selected.push(t);
                        var i = {};
                        i[p.parserResult.itemName] = t, s(function() {
                            p.onSelectCallback(c, {
                                $item: t,
                                $model: p.parserResult.modelMapper(c, i)
                            });
                        }), g.updateModel();
                    }
                }), c.$on("uis:activate", function() {
                    g.activeMatchIndex = -1;
                }), c.$watch("$select.disabled", function(e, t) {
                    t && !e && p.sizeSearchInput();
                }), p.searchInput.on("keydown", function(e) {
                    var i = e.which;
                    c.$apply(function() {
                        var s = !1;
                        t.isHorizontalMovement(i) && (s = o(i)), s && i != t.TAB && (e.preventDefault(), 
                        e.stopPropagation());
                    });
                }), p.searchInput.on("keyup", function(e) {
                    if (t.isVerticalMovement(e.which) || c.$evalAsync(function() {
                        p.activeIndex = !1 === p.taggingLabel ? -1 : 0;
                    }), p.tagging.isActivated && 0 < p.search.length) {
                        if (e.which === t.TAB || t.isControl(e) || t.isFunctionKey(e) || e.which === t.ESC || t.isVerticalMovement(e.which)) return;
                        if (p.activeIndex = !1 === p.taggingLabel ? -1 : 0, !1 === p.taggingLabel) return;
                        var i, s, n, l = angular.copy(p.items), a = angular.copy(p.items), r = !1, o = -1;
                        if (void 0 !== p.tagging.fct) {
                            if (0 < (s = p.$filter("filter")(l, {
                                isTag: !0
                            })).length && (n = s[0]), 0 < l.length && n && (r = !0, l = l.slice(1, l.length), 
                            a = a.slice(1, a.length)), i = p.tagging.fct(p.search), a.some(function(e) {
                                return angular.equals(e, i);
                            }) || p.selected.some(function(e) {
                                return angular.equals(e, i);
                            })) return void c.$evalAsync(function() {
                                p.activeIndex = 0, p.items = l;
                            });
                            i && (i.isTag = !0);
                        } else {
                            if (0 < (s = p.$filter("filter")(l, function(e) {
                                return e.match(p.taggingLabel);
                            })).length && (n = s[0]), void 0 !== l[0] && 0 < l.length && n && (r = !0, l = l.slice(1, l.length), 
                            a = a.slice(1, a.length)), i = p.search + " " + p.taggingLabel, -1 < d(p.selected, p.search)) return;
                            if (u(a.concat(p.selected))) return void (r && (l = a, c.$evalAsync(function() {
                                p.activeIndex = 0, p.items = l;
                            })));
                            if (u(a)) return void (r && (p.items = a.slice(1, a.length)));
                        }
                        r && (o = d(p.selected, i)), l = -1 < o ? l.slice(o + 1, l.length - 1) : (l = [], 
                        i && l.push(i), l.concat(a)), c.$evalAsync(function() {
                            if (p.activeIndex = 0, p.items = l, p.isGrouped) {
                                var e = i ? l.slice(1) : l;
                                p.setItemsFn(e), i && (p.items.unshift(i), p.groups.unshift({
                                    name: "",
                                    items: [ i ],
                                    tagging: !0
                                }));
                            }
                        });
                    }
                }), p.searchInput.on("blur", function() {
                    s(function() {
                        g.activeMatchIndex = -1;
                    });
                });
            }
        };
    } ]), s.directive("uiSelectNoChoice", [ "uiSelectConfig", function(e) {
        return {
            restrict: "EA",
            require: "^uiSelect",
            replace: !0,
            transclude: !0,
            templateUrl: function(t) {
                return t.addClass("ui-select-no-choice"), (t.parent().attr("theme") || e.theme) + "/no-choice.tpl.html";
            }
        };
    } ]), s.directive("uiSelectSingle", [ "$timeout", "$compile", function(i, s) {
        return {
            restrict: "EA",
            require: [ "^uiSelect", "^ngModel" ],
            link: function(c, n, l, a) {
                var r = a[0], o = a[1];
                o.$parsers.unshift(function(t) {
                    if (e(t)) return t;
                    var i = {};
                    return i[r.parserResult.itemName] = t, r.parserResult.modelMapper(c, i);
                }), o.$formatters.unshift(function(t) {
                    if (e(t)) return t;
                    var s = r.parserResult && r.parserResult.source(c, {
                        $select: {
                            search: ""
                        }
                    }), n = {};
                    if (s) {
                        var l = function(e) {
                            return n[r.parserResult.itemName] = e, r.parserResult.modelMapper(c, n) === t;
                        };
                        if (r.selected && l(r.selected)) return r.selected;
                        for (var a = s.length - 1; 0 <= a; a--) if (l(s[a])) return s[a];
                    }
                    return t;
                }), c.$watch("$select.selected", function(e) {
                    o.$viewValue !== e && o.$setViewValue(e);
                }), o.$render = function() {
                    r.selected = o.$viewValue;
                }, c.$on("uis:select", function(t, s) {
                    r.selected = s;
                    var n = {};
                    n[r.parserResult.itemName] = s, i(function() {
                        r.onSelectCallback(c, {
                            $item: s,
                            $model: e(s) ? s : r.parserResult.modelMapper(c, n)
                        });
                    });
                }), c.$on("uis:close", function(e, t) {
                    i(function() {
                        r.focusser.prop("disabled", !1), t || r.focusser[0].focus();
                    }, 0, !1);
                }), c.$on("uis:activate", function() {
                    u.prop("disabled", !0);
                });
                var u = angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' id='{{ $select.focusserId }}' aria-label='{{ $select.focusserTitle }}' aria-haspopup='true' role='button' />");
                s(u)(c), r.focusser = u, r.focusInput = u, n.parent().append(u), u.bind("focus", function() {
                    c.$evalAsync(function() {
                        r.focus = !0;
                    });
                }), u.bind("blur", function() {
                    c.$evalAsync(function() {
                        r.focus = !1;
                    });
                }), u.bind("keydown", function(e) {
                    if (e.which === t.BACKSPACE && !1 !== r.backspaceReset) return e.preventDefault(), 
                    e.stopPropagation(), r.select(void 0), void c.$apply();
                    e.which === t.TAB || t.isControl(e) || t.isFunctionKey(e) || e.which === t.ESC || (e.which != t.DOWN && e.which != t.UP && e.which != t.ENTER && e.which != t.SPACE || (e.preventDefault(), 
                    e.stopPropagation(), r.activate()), c.$digest());
                }), u.bind("keyup input", function(e) {
                    e.which === t.TAB || t.isControl(e) || t.isFunctionKey(e) || e.which === t.ESC || e.which == t.ENTER || e.which === t.BACKSPACE || (r.activate(u.val()), 
                    u.val(""), c.$digest());
                });
            }
        };
    } ]), s.directive("uiSelectSort", [ "$timeout", "uiSelectConfig", "uiSelectMinErr", function(e, t, i) {
        return {
            require: [ "^^uiSelect", "^ngModel" ],
            link: function(t, s, c, n) {
                if (null === t[c.uiSelectSort]) throw i("sort", "Expected a list to sort");
                var l = n[0], a = n[1], r = angular.extend({
                    axis: "horizontal"
                }, t.$eval(c.uiSelectSortOptions)).axis;
                t.$watch(function() {
                    return l.sortable;
                }, function(e) {
                    e ? s.attr("draggable", !0) : s.removeAttr("draggable");
                }), s.on("dragstart", function(e) {
                    s.addClass("dragging"), (e.dataTransfer || e.originalEvent.dataTransfer).setData("text", t.$index.toString());
                }), s.on("dragend", function() {
                    d("dragging");
                });
                var o, d = function(e) {
                    angular.forEach(l.$element.querySelectorAll("." + e), function(t) {
                        angular.element(t).removeClass(e);
                    });
                }, p = function(e) {
                    e.preventDefault(), ("vertical" === r ? e.offsetY || e.layerY || (e.originalEvent ? e.originalEvent.offsetY : 0) : e.offsetX || e.layerX || (e.originalEvent ? e.originalEvent.offsetX : 0)) < this["vertical" === r ? "offsetHeight" : "offsetWidth"] / 2 ? (d("dropping-after"), 
                    s.addClass("dropping-before")) : (d("dropping-before"), s.addClass("dropping-after"));
                }, h = function(t) {
                    t.preventDefault();
                    var i = parseInt((t.dataTransfer || t.originalEvent.dataTransfer).getData("text"), 10);
                    e.cancel(o), o = e(function() {
                        g(i);
                    }, 20);
                }, g = function(e) {
                    var l, i = t.$eval(c.uiSelectSort), n = i[e];
                    l = s.hasClass("dropping-before") ? e < t.$index ? t.$index - 1 : t.$index : e < t.$index ? t.$index : t.$index + 1, 
                    function(e, t) {
                        this.splice(t, 0, this.splice(e, 1)[0]);
                    }.apply(i, [ e, l ]), a.$setViewValue(Date.now()), t.$apply(function() {
                        t.$emit("uiSelectSort:change", {
                            array: i,
                            item: n,
                            from: e,
                            to: l
                        });
                    }), d("dropping"), d("dropping-before"), d("dropping-after"), s.off("drop", h);
                };
                s.on("dragenter", function() {
                    s.hasClass("dragging") || (s.addClass("dropping"), s.on("dragover", p), s.on("drop", h));
                }), s.on("dragleave", function(e) {
                    e.target == s && (d("dropping"), d("dropping-before"), d("dropping-after"), s.off("dragover", p), 
                    s.off("drop", h));
                });
            }
        };
    } ]), s.directive("uisOpenClose", [ "$parse", "$timeout", function(e, t) {
        return {
            restrict: "A",
            require: "uiSelect",
            link: function(i, s, c, n) {
                n.onOpenCloseCallback = e(c.uisOpenClose), i.$watch("$select.open", function(e, s) {
                    e !== s && t(function() {
                        n.onOpenCloseCallback(i, {
                            isOpen: e
                        });
                    });
                });
            }
        };
    } ]), s.service("uisRepeatParser", [ "uiSelectMinErr", "$parse", function(e, t) {
        this.parse = function(i) {
            var s;
            if (!(s = i.match(/^\s*(?:([\s\S]+?)\s+as\s+)?(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(\s*[\s\S]+?)?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/))) throw e("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", i);
            var c = s[5], n = "";
            if (s[3]) {
                c = s[5].replace(/(^\()|(\)$)/g, "");
                var l = s[5].match(/^\s*(?:[\s\S]+?)(?:[^\|]|\|\|)+([\s\S]*)\s*$/);
                l && l[1].trim() && (n = l[1], c = c.replace(n, ""));
            }
            return {
                itemName: s[4] || s[2],
                keyName: s[3],
                source: t(c),
                filters: n,
                trackByExp: s[6],
                modelMapper: t(s[1] || s[4] || s[2]),
                repeatExpression: function(e) {
                    var t = this.itemName + " in " + (e ? "$group.items" : "$select.items");
                    return this.trackByExp && (t += " track by " + this.trackByExp), t;
                }
            };
        }, this.getGroupNgRepeatExpression = function() {
            return "$group in $select.groups track by $group.name";
        };
    } ]);
}(), angular.module("ui.select").run([ "$templateCache", function(e) {
    e.put("bootstrap/choices.tpl.html", '<ul class="ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu" ng-show="$select.open && $select.items.length > 0"><li class="ui-select-choices-group" id="ui-select-choices-{{ $select.generatedId }}"><div class="divider" ng-show="$select.isGrouped && $index > 0"></div><div ng-show="$select.isGrouped" class="ui-select-choices-group-label dropdown-header" ng-bind="$group.name"></div><div ng-attr-id="ui-select-choices-row-{{ $select.generatedId }}-{{$index}}" class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}" role="option"><span class="ui-select-choices-row-inner"></span></div></li></ul>'), 
    e.put("bootstrap/match-multiple.tpl.html", '<span class="ui-select-match"><span ng-repeat="$item in $select.selected track by $index"><span class="ui-select-match-item btn btn-default btn-xs" tabindex="-1" type="button" ng-disabled="$select.disabled" ng-click="$selectMultiple.activeMatchIndex = $index;" ng-class="{\'btn-primary\':$selectMultiple.activeMatchIndex === $index, \'select-locked\':$select.isLocked(this, $index)}" ui-select-sort="$select.selected"><span class="close ui-select-match-close" ng-hide="$select.disabled" ng-click="$selectMultiple.removeChoice($index)">&nbsp;&times;</span> <span uis-transclude-append=""></span></span></span></span>'), 
    e.put("bootstrap/match.tpl.html", '<div class="ui-select-match" ng-hide="$select.open && $select.searchEnabled" ng-disabled="$select.disabled" ng-class="{\'btn-default-focus\':$select.focus}"><span tabindex="-1" class="btn btn-default form-control ui-select-toggle" aria-label="{{ $select.baseTitle }} activate" ng-disabled="$select.disabled" ng-click="$select.activate()" style="outline: 0;"><span ng-show="$select.isEmpty()" class="ui-select-placeholder text-muted">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" class="ui-select-match-text pull-left" ng-class="{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}" ng-transclude=""></span> <i class="caret pull-right" ng-click="$select.toggle($event)"></i> <a ng-show="$select.allowClear && !$select.isEmpty() && ($select.disabled !== true)" aria-label="{{ $select.baseTitle }} clear" style="margin-right: 10px" ng-click="$select.clear($event)" class="btn btn-xs btn-link pull-right"><i class="glyphicon glyphicon-remove" aria-hidden="true"></i></a></span></div>'), 
    e.put("bootstrap/no-choice.tpl.html", '<ul class="ui-select-no-choice dropdown-menu" ng-show="$select.items.length == 0"><li ng-transclude=""></li></ul>'), 
    e.put("bootstrap/select-multiple.tpl.html", '<div class="ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control" ng-class="{open: $select.open}"><div><div class="ui-select-match"></div><input type="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search input-xs" placeholder="{{$selectMultiple.getPlaceholder()}}" ng-disabled="$select.disabled" ng-click="$select.activate()" ng-model="$select.search" role="combobox" aria-expanded="{{$select.open}}" aria-label="{{$select.baseTitle}}" ng-class="{\'spinner\': $select.refreshing}" ondrop="return false;"></div><div class="ui-select-choices"></div><div class="ui-select-no-choice"></div></div>'), 
    e.put("bootstrap/select.tpl.html", '<div class="ui-select-container ui-select-bootstrap dropdown" ng-class="{open: $select.open}"><div class="ui-select-match"></div><span ng-show="$select.open && $select.refreshing && $select.spinnerEnabled" class="ui-select-refreshing {{$select.spinnerClass}}"></span> <input type="search" autocomplete="off" tabindex="-1" aria-expanded="true" aria-label="{{ $select.baseTitle }}" aria-owns="ui-select-choices-{{ $select.generatedId }}" class="form-control ui-select-search" ng-class="{ \'ui-select-search-hidden\' : !$select.searchEnabled }" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-show="$select.open"><div class="ui-select-choices"></div><div class="ui-select-no-choice"></div></div>'), 
    e.put("select2/choices.tpl.html", '<ul tabindex="-1" class="ui-select-choices ui-select-choices-content select2-results"><li class="ui-select-choices-group" ng-class="{\'select2-result-with-children\': $select.choiceGrouped($group) }"><div ng-show="$select.choiceGrouped($group)" class="ui-select-choices-group-label select2-result-label" ng-bind="$group.name"></div><ul id="ui-select-choices-{{ $select.generatedId }}" ng-class="{\'select2-result-sub\': $select.choiceGrouped($group), \'select2-result-single\': !$select.choiceGrouped($group) }"><li role="option" ng-attr-id="ui-select-choices-row-{{ $select.generatedId }}-{{$index}}" class="ui-select-choices-row" ng-class="{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}"><div class="select2-result-label ui-select-choices-row-inner"></div></li></ul></li></ul>'), 
    e.put("select2/match-multiple.tpl.html", '<span class="ui-select-match"><li class="ui-select-match-item select2-search-choice" ng-repeat="$item in $select.selected track by $index" ng-class="{\'select2-search-choice-focus\':$selectMultiple.activeMatchIndex === $index, \'select2-locked\':$select.isLocked(this, $index)}" ui-select-sort="$select.selected"><span uis-transclude-append=""></span> <a href="javascript:;" class="ui-select-match-close select2-search-choice-close" ng-click="$selectMultiple.removeChoice($index)" tabindex="-1"></a></li></span>'), 
    e.put("select2/match.tpl.html", '<a class="select2-choice ui-select-match" ng-class="{\'select2-default\': $select.isEmpty()}" ng-click="$select.toggle($event)" aria-label="{{ $select.baseTitle }} select"><span ng-show="$select.isEmpty()" class="select2-chosen">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" class="select2-chosen" ng-transclude=""></span> <abbr ng-if="$select.allowClear && !$select.isEmpty()" class="select2-search-choice-close" ng-click="$select.clear($event)"></abbr> <span class="select2-arrow ui-select-toggle"><b></b></span></a>'), 
    e.put("select2/no-choice.tpl.html", '<div class="ui-select-no-choice dropdown" ng-show="$select.items.length == 0"><div class="dropdown-content"><div data-selectable="" ng-transclude=""></div></div></div>'), 
    e.put("select2/select-multiple.tpl.html", '<div class="ui-select-container ui-select-multiple select2 select2-container select2-container-multi" ng-class="{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled}"><ul class="select2-choices"><span class="ui-select-match"></span><li class="select2-search-field"><input type="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="combobox" aria-expanded="true" aria-owns="ui-select-choices-{{ $select.generatedId }}" aria-label="{{ $select.baseTitle }}" aria-activedescendant="ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}" class="select2-input ui-select-search" placeholder="{{$selectMultiple.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-model="$select.search" ng-click="$select.activate()" style="width: 34px;" ondrop="return false;"></li></ul><div class="ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open || $select.items.length === 0}"><div class="ui-select-choices"></div></div></div>'), 
    e.put("select2/select.tpl.html", '<div class="ui-select-container select2 select2-container" ng-class="{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled, \'select2-container-active\': $select.focus, \'select2-allowclear\': $select.allowClear && !$select.isEmpty()}"><div class="ui-select-match"></div><div class="ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"><div class="search-container" ng-class="{\'ui-select-search-hidden\':!$select.searchEnabled, \'select2-search\':$select.searchEnabled}"><input type="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" ng-class="{\'select2-active\': $select.refreshing}" role="combobox" aria-expanded="true" aria-owns="ui-select-choices-{{ $select.generatedId }}" aria-label="{{ $select.baseTitle }}" class="ui-select-search select2-input" ng-model="$select.search"></div><div class="ui-select-choices"></div><div class="ui-select-no-choice"></div></div></div>'), 
    e.put("selectize/choices.tpl.html", '<div ng-show="$select.open" class="ui-select-choices ui-select-dropdown selectize-dropdown" ng-class="{\'single\': !$select.multiple, \'multi\': $select.multiple}"><div class="ui-select-choices-content selectize-dropdown-content"><div class="ui-select-choices-group optgroup"><div ng-show="$select.isGrouped" class="ui-select-choices-group-label optgroup-header" ng-bind="$group.name"></div><div role="option" class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}"><div class="option ui-select-choices-row-inner" data-selectable=""></div></div></div></div></div>'), 
    e.put("selectize/match-multiple.tpl.html", '<div class="ui-select-match" data-value="" ng-repeat="$item in $select.selected track by $index" ng-click="$selectMultiple.activeMatchIndex = $index;" ng-class="{\'active\':$selectMultiple.activeMatchIndex === $index}" ui-select-sort="$select.selected"><span class="ui-select-match-item" ng-class="{\'select-locked\':$select.isLocked(this, $index)}"><span uis-transclude-append=""></span> <span class="remove ui-select-match-close" ng-hide="$select.disabled" ng-click="$selectMultiple.removeChoice($index)">&times;</span></span></div>'), 
    e.put("selectize/match.tpl.html", '<div ng-hide="$select.searchEnabled && ($select.open || $select.isEmpty())" class="ui-select-match"><span ng-show="!$select.searchEnabled && ($select.isEmpty() || $select.open)" class="ui-select-placeholder text-muted">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty() || $select.open" ng-transclude=""></span></div>'), 
    e.put("selectize/no-choice.tpl.html", '<div class="ui-select-no-choice selectize-dropdown" ng-show="$select.items.length == 0"><div class="selectize-dropdown-content"><div data-selectable="" ng-transclude=""></div></div></div>'), 
    e.put("selectize/select-multiple.tpl.html", '<div class="ui-select-container selectize-control multi plugin-remove_button" ng-class="{\'open\': $select.open}"><div class="selectize-input" ng-class="{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}" ng-click="$select.open && !$select.searchEnabled ? $select.toggle($event) : $select.activate()"><div class="ui-select-match"></div><input type="search" autocomplete="off" tabindex="-1" class="ui-select-search" ng-class="{\'ui-select-search-hidden\':!$select.searchEnabled}" placeholder="{{$selectMultiple.getPlaceholder()}}" ng-model="$select.search" ng-disabled="$select.disabled" aria-expanded="{{$select.open}}" aria-label="{{ $select.baseTitle }}" ondrop="return false;"></div><div class="ui-select-choices"></div><div class="ui-select-no-choice"></div></div>'), 
    e.put("selectize/select.tpl.html", '<div class="ui-select-container selectize-control single" ng-class="{\'open\': $select.open}"><div class="selectize-input" ng-class="{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}" ng-click="$select.open && !$select.searchEnabled ? $select.toggle($event) : $select.activate()"><div class="ui-select-match"></div><input type="search" autocomplete="off" tabindex="-1" class="ui-select-search ui-select-toggle" ng-class="{\'ui-select-search-hidden\':!$select.searchEnabled}" ng-click="$select.toggle($event)" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-hide="!$select.isEmpty() && !$select.open" ng-disabled="$select.disabled" aria-label="{{ $select.baseTitle }}"></div><div class="ui-select-choices"></div><div class="ui-select-no-choice"></div></div>');
} ]);