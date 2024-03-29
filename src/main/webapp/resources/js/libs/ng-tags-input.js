!function() {
    "use strict";
    var e_backspace = 8, e_tab = 9, e_enter = 13, e_escape = 27, e_space = 32, e_up = 38, e_down = 40, e_left = 37, e_right = 39, e_delete = 46, e_comma = 188, t = [ "text", "email", "url" ], n = angular.module("ngTagsInput", []);
    n.directive("tagsInput", [ "$timeout", "$document", "$window", "$q", "tagsInputConfig", "tiUtil", function(n, i, a, r, o, s) {
        function u(e, t, n, i) {
            var a, o, u, l, c = {};
            return a = function(t) {
                return s.safeToString(t[e.displayProperty]);
            }, o = function(t, n) {
                t[e.displayProperty] = n;
            }, u = function(t) {
                var i = a(t), o = i && i.length >= e.minLength && i.length <= e.maxLength && e.allowedTagsPattern.test(i) && !s.findInObjectArray(c.items, t, e.keyProperty || e.displayProperty);
                return r.when(o && n({
                    $tag: t
                })).then(s.promisifyValue);
            }, l = function(e) {
                return r.when(i({
                    $tag: e
                })).then(s.promisifyValue);
            }, c.items = [], c.addText = function(e) {
                var t = {};
                return o(t, e), c.add(t);
            }, c.add = function(n) {
                var i = a(n);
                return e.replaceSpacesWithDashes && (i = s.replaceSpacesWithDashes(i)), o(n, i), 
                u(n).then(function() {
                    c.items.push(n), t.trigger("tag-added", {
                        $tag: n
                    });
                }).catch(function() {
                    i && t.trigger("invalid-tag", {
                        $tag: n
                    });
                });
            }, c.remove = function(e) {
                var n = c.items[e];
                return l(n).then(function() {
                    return c.items.splice(e, 1), c.clearSelection(), t.trigger("tag-removed", {
                        $tag: n
                    }), n;
                });
            }, c.select = function(e) {
                e < 0 ? e = c.items.length - 1 : e >= c.items.length && (e = 0), c.index = e, c.selected = c.items[e];
            }, c.selectPrior = function() {
                c.select(--c.index);
            }, c.selectNext = function() {
                c.select(++c.index);
            }, c.removeSelected = function() {
                return c.remove(c.index);
            }, c.clearSelection = function() {
                c.selected = null, c.index = -1;
            }, c.getItems = function() {
                return e.useStrings ? c.items.map(a) : c.items;
            }, c.clearSelection(), c;
        }
        function l(e) {
            return -1 !== t.indexOf(e);
        }
        return {
            restrict: "E",
            require: "ngModel",
            scope: {
                tags: "=ngModel",
                text: "=?",
                templateScope: "=?",
                tagClass: "&",
                onTagAdding: "&",
                onTagAdded: "&",
                onInvalidTag: "&",
                onTagRemoving: "&",
                onTagRemoved: "&",
                onTagClicked: "&"
            },
            replace: !1,
            transclude: !0,
            templateUrl: "ngTagsInput/tags-input.html",
            controller: [ "$scope", "$attrs", "$element", function(e, t, n) {
                e.events = s.simplePubSub(), o.load("tagsInput", e, t, {
                    template: [ String, "ngTagsInput/tag-item.html" ],
                    type: [ String, "text", l ],
                    placeholder: [ String, "Add a tag" ],
                    tabindex: [ Number, null ],
                    removeTagSymbol: [ String, String.fromCharCode(215) ],
                    replaceSpacesWithDashes: [ Boolean, !0 ],
                    minLength: [ Number, 3 ],
                    maxLength: [ Number, 9007199254740991 ],
                    addOnEnter: [ Boolean, !0 ],
                    addOnSpace: [ Boolean, !1 ],
                    addOnComma: [ Boolean, !0 ],
                    addOnBlur: [ Boolean, !0 ],
                    addOnPaste: [ Boolean, !1 ],
                    pasteSplitPattern: [ RegExp, /,/ ],
                    allowedTagsPattern: [ RegExp, /.+/ ],
                    enableEditingLastTag: [ Boolean, !1 ],
                    minTags: [ Number, 0 ],
                    maxTags: [ Number, 9007199254740991 ],
                    displayProperty: [ String, "text" ],
                    keyProperty: [ String, "" ],
                    allowLeftoverText: [ Boolean, !1 ],
                    addFromAutocompleteOnly: [ Boolean, !1 ],
                    spellcheck: [ Boolean, !0 ],
                    useStrings: [ Boolean, !1 ]
                }), e.tagList = new u(e.options, e.events, s.handleUndefinedResult(e.onTagAdding, !0), s.handleUndefinedResult(e.onTagRemoving, !0)), 
                this.registerAutocomplete = function() {
                    return n.find("input"), {
                        addTag: function(t) {
                            return e.tagList.add(t);
                        },
                        getTags: function() {
                            return e.tagList.items;
                        },
                        getCurrentTagText: function() {
                            return e.newTag.text();
                        },
                        getOptions: function() {
                            return e.options;
                        },
                        getTemplateScope: function() {
                            return e.templateScope;
                        },
                        on: function(t, n) {
                            return e.events.on(t, n, !0), this;
                        }
                    };
                }, this.registerTagItem = function() {
                    return {
                        getOptions: function() {
                            return e.options;
                        },
                        removeTag: function(t) {
                            e.disabled || e.tagList.remove(t);
                        }
                    };
                };
            } ],
            link: function(t, r, o, u) {
                var l, c, g = [ e_enter, e_comma, e_space, e_backspace, e_delete, e_left, e_right ], d = t.tagList, p = t.events, f = t.options, m = r.find("input"), h = [ "minTags", "maxTags", "allowLeftoverText" ];
                l = function() {
                    u.$setValidity("maxTags", d.items.length <= f.maxTags), u.$setValidity("minTags", d.items.length >= f.minTags), 
                    u.$setValidity("leftoverText", !(!t.hasFocus && !f.allowLeftoverText && t.newTag.text()));
                }, c = function() {
                    n(function() {
                        m[0].focus();
                    });
                }, u.$isEmpty = function(e) {
                    return !e || !e.length;
                }, t.newTag = {
                    text: function(e) {
                        if (!angular.isDefined(e)) return t.text || "";
                        t.text = e, p.trigger("input-change", e);
                    },
                    invalid: null
                }, t.track = function(e) {
                    return e[f.keyProperty || f.displayProperty];
                }, t.getTagClass = function(e, n) {
                    var i = e === d.selected;
                    return [ t.tagClass({
                        $tag: e,
                        $index: n,
                        $selected: i
                    }), {
                        selected: i
                    } ];
                }, t.$watch("tags", function(e) {
                    if (e) {
                        if (d.items = s.makeObjectArray(e, f.displayProperty), f.useStrings) return;
                        t.tags = d.items;
                    } else d.items = [];
                }), t.$watch("tags.length", function() {
                    l(), u.$validate();
                }), o.$observe("disabled", function(e) {
                    t.disabled = e;
                }), t.eventHandlers = {
                    input: {
                        keydown: function(e) {
                            p.trigger("input-keydown", e);
                        },
                        focus: function() {
                            t.hasFocus || (t.hasFocus = !0, p.trigger("input-focus"));
                        },
                        blur: function() {
                            n(function() {
                                var e = i.prop("activeElement"), n = e === m[0], a = r[0].contains(e);
                                !n && a || (t.hasFocus = !1, p.trigger("input-blur"));
                            });
                        },
                        paste: function(e) {
                            e.getTextData = function() {
                                var t = e.clipboardData || e.originalEvent && e.originalEvent.clipboardData;
                                return t ? t.getData("text/plain") : a.clipboardData.getData("Text");
                            }, p.trigger("input-paste", e);
                        }
                    },
                    host: {
                        click: function() {
                            t.disabled || c();
                        }
                    },
                    tag: {
                        click: function(e) {
                            p.trigger("tag-clicked", {
                                $tag: e
                            });
                        }
                    }
                }, p.on("tag-added", t.onTagAdded).on("invalid-tag", t.onInvalidTag).on("tag-removed", t.onTagRemoved).on("tag-clicked", t.onTagClicked).on("tag-added", function() {
                    t.newTag.text("");
                }).on("tag-added tag-removed", function() {
                    t.tags = d.getItems(), u.$setDirty(), c();
                }).on("invalid-tag", function() {
                    t.newTag.invalid = !0;
                }).on("option-change", function(e) {
                    -1 !== h.indexOf(e.name) && l();
                }).on("input-change", function() {
                    d.clearSelection(), t.newTag.invalid = null;
                }).on("input-focus", function() {
                    r.triggerHandler("focus"), u.$setValidity("leftoverText", !0);
                }).on("input-blur", function() {
                    f.addOnBlur && !f.addFromAutocompleteOnly && d.addText(t.newTag.text()), r.triggerHandler("blur"), 
                    l();
                }).on("input-keydown", function(n) {
                    var i, a, r, o, u = n.keyCode, l = {};
                    s.isModifierOn(n) || -1 === g.indexOf(u) || (l[e_enter] = f.addOnEnter, l[e_comma] = f.addOnComma, 
                    l[e_space] = f.addOnSpace, i = !f.addFromAutocompleteOnly && l[u], a = (u === e_backspace || u === e_delete) && d.selected, 
                    o = u === e_backspace && 0 === t.newTag.text().length && f.enableEditingLastTag, 
                    r = (u === e_backspace || u === e_left || u === e_right) && 0 === t.newTag.text().length && !f.enableEditingLastTag, 
                    i ? d.addText(t.newTag.text()) : o ? (d.selectPrior(), d.removeSelected().then(function(e) {
                        e && t.newTag.text(e[f.displayProperty]);
                    })) : a ? d.removeSelected() : r && (u === e_left || u === e_backspace ? d.selectPrior() : u === e_right && d.selectNext()), 
                    (i || r || a || o) && n.preventDefault());
                }).on("input-paste", function(e) {
                    if (f.addOnPaste) {
                        var t = e.getTextData().split(f.pasteSplitPattern);
                        1 < t.length && (t.forEach(function(e) {
                            d.addText(e);
                        }), e.preventDefault());
                    }
                });
            }
        };
    } ]), n.directive("tiTagItem", [ "tiUtil", function(e) {
        return {
            restrict: "E",
            require: "^tagsInput",
            template: '<ng-include src="$$template"></ng-include>',
            scope: {
                $scope: "=scope",
                data: "="
            },
            link: function(t, n, i, a) {
                var r = a.registerTagItem(), o = r.getOptions();
                t.$$template = o.template, t.$$removeTagSymbol = o.removeTagSymbol, t.$getDisplayText = function() {
                    return e.safeToString(t.data[o.displayProperty]);
                }, t.$removeTag = function() {
                    r.removeTag(t.$index);
                }, t.$watch("$parent.$index", function(e) {
                    t.$index = e;
                });
            }
        };
    } ]), n.directive("autoComplete", [ "$document", "$timeout", "$sce", "$q", "tagsInputConfig", "tiUtil", function(t, n, i, a, r, o) {
        function s(e, t, n) {
            var i, r, s, u = {};
            return s = function() {
                return t.tagsInput.keyProperty || t.tagsInput.displayProperty;
            }, i = function(e, n) {
                return e.filter(function(e) {
                    return !o.findInObjectArray(n, e, s(), function(e, n) {
                        return t.tagsInput.replaceSpacesWithDashes && (e = o.replaceSpacesWithDashes(e), 
                        n = o.replaceSpacesWithDashes(n)), o.defaultComparer(e, n);
                    });
                });
            }, u.reset = function() {
                r = null, u.items = [], u.visible = !1, u.index = -1, u.selected = null, u.query = null;
            }, u.show = function() {
                t.selectFirstMatch ? u.select(0) : u.selected = null, u.visible = !0;
            }, u.load = o.debounce(function(n, l) {
                u.query = n;
                var c = a.when(e({
                    $query: n
                }));
                (r = c).then(function(e) {
                    c === r && (e = o.makeObjectArray(e.data || e, s()), e = i(e, l), u.items = e.slice(0, t.maxResultsToShow), 
                    0 < u.items.length ? u.show() : u.reset());
                });
            }, t.debounceDelay), u.selectNext = function() {
                u.select(++u.index);
            }, u.selectPrior = function() {
                u.select(--u.index);
            }, u.select = function(e) {
                e < 0 ? e = u.items.length - 1 : e >= u.items.length && (e = 0), u.index = e, u.selected = u.items[e], 
                n.trigger("suggestion-selected", e);
            }, u.reset(), u;
        }
        return {
            restrict: "E",
            require: "^tagsInput",
            scope: {
                source: "&",
                matchClass: "&"
            },
            templateUrl: "ngTagsInput/auto-complete.html",
            controller: [ "$scope", "$element", "$attrs", function(e, t, n) {
                e.events = o.simplePubSub(), r.load("autoComplete", e, n, {
                    template: [ String, "ngTagsInput/auto-complete-match.html" ],
                    debounceDelay: [ Number, 100 ],
                    minLength: [ Number, 3 ],
                    highlightMatchedText: [ Boolean, !0 ],
                    maxResultsToShow: [ Number, 10 ],
                    loadOnDownArrow: [ Boolean, !1 ],
                    loadOnEmpty: [ Boolean, !1 ],
                    loadOnFocus: [ Boolean, !1 ],
                    selectFirstMatch: [ Boolean, !0 ],
                    displayProperty: [ String, "" ]
                }), e.suggestionList = new s(e.source, e.options, e.events), this.registerAutocompleteMatch = function() {
                    return {
                        getOptions: function() {
                            return e.options;
                        },
                        getQuery: function() {
                            return e.suggestionList.query;
                        }
                    };
                };
            } ],
            link: function(t, n, i, a) {
                var r, s = [ e_enter, e_tab, e_escape, e_up, e_down ], l = t.suggestionList, c = a.registerAutocomplete(), g = t.options, d = t.events;
                g.tagsInput = c.getOptions(), r = function(e) {
                    return e && e.length >= g.minLength || !e && g.loadOnEmpty;
                }, t.templateScope = c.getTemplateScope(), t.addSuggestionByIndex = function(e) {
                    l.select(e), t.addSuggestion();
                }, t.addSuggestion = function() {
                    var e = !1;
                    return l.selected && (c.addTag(angular.copy(l.selected)), l.reset(), e = !0), e;
                }, t.track = function(e) {
                    return e[g.tagsInput.keyProperty || g.tagsInput.displayProperty];
                }, t.getSuggestionClass = function(e, n) {
                    var i = e === l.selected;
                    return [ t.matchClass({
                        $match: e,
                        $index: n,
                        $selected: i
                    }), {
                        selected: i
                    } ];
                }, c.on("tag-added tag-removed invalid-tag input-blur", function() {
                    l.reset();
                }).on("input-change", function(e) {
                    r(e) ? l.load(e, c.getTags()) : l.reset();
                }).on("input-focus", function() {
                    var e = c.getCurrentTagText();
                    g.loadOnFocus && r(e) && l.load(e, c.getTags());
                }).on("input-keydown", function(n) {
                    var i = n.keyCode, a = !1;
                    if (!o.isModifierOn(n) && -1 !== s.indexOf(i)) return l.visible ? i === e_down ? (l.selectNext(), 
                    a = !0) : i === e_up ? (l.selectPrior(), a = !0) : i === e_escape ? (l.reset(), 
                    a = !0) : i !== e_enter && i !== e_tab || (a = t.addSuggestion()) : i === e_down && t.options.loadOnDownArrow && (l.load(c.getCurrentTagText(), c.getTags()), 
                    a = !0), a ? (n.preventDefault(), n.stopImmediatePropagation(), !1) : void 0;
                }), d.on("suggestion-selected", function(e) {
                    !function(e, t) {
                        var n = e.find("li").eq(t), i = n.parent(), a = n.prop("offsetTop"), r = n.prop("offsetHeight"), o = i.prop("clientHeight"), s = i.prop("scrollTop");
                        a < s ? i.prop("scrollTop", a) : o + s < a + r && i.prop("scrollTop", a + r - o);
                    }(n, e);
                });
            }
        };
    } ]), n.directive("tiAutocompleteMatch", [ "$sce", "tiUtil", function(e, t) {
        return {
            restrict: "E",
            require: "^autoComplete",
            template: '<ng-include src="$$template"></ng-include>',
            scope: {
                $scope: "=scope",
                data: "="
            },
            link: function(n, i, a, r) {
                var o = r.registerAutocompleteMatch(), s = o.getOptions();
                n.$$template = s.template, n.$index = n.$parent.$index, n.$highlight = function(n) {
                    return s.highlightMatchedText && (n = t.safeHighlight(n, o.getQuery())), e.trustAsHtml(n);
                }, n.$getDisplayText = function() {
                    return t.safeToString(n.data[s.displayProperty || s.tagsInput.displayProperty]);
                };
            }
        };
    } ]), n.directive("tiTranscludeAppend", function() {
        return function(e, t, n, i, a) {
            a(function(e) {
                t.append(e);
            });
        };
    }), n.directive("tiAutosize", [ "tagsInputConfig", function(e) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(t, n, i, a) {
                var r, o, s = e.getTextAutosizeThreshold();
                (r = angular.element('<span class="input"></span>')).css("display", "none").css("visibility", "hidden").css("width", "auto").css("white-space", "pre"), 
                n.parent().append(r), o = function(e) {
                    var t, a = e;
                    return angular.isString(a) && 0 === a.length && (a = i.placeholder), a && (r.text(a), 
                    r.css("display", ""), t = r.prop("offsetWidth"), r.css("display", "none")), n.css("width", t ? t + s + "px" : ""), 
                    e;
                }, a.$parsers.unshift(o), a.$formatters.unshift(o), i.$observe("placeholder", function(e) {
                    a.$modelValue || o(e);
                });
            }
        };
    } ]), n.directive("tiBindAttrs", function() {
        return function(e, t, n) {
            e.$watch(n.tiBindAttrs, function(e) {
                angular.forEach(e, function(e, t) {
                    n.$set(t, e);
                });
            }, !0);
        };
    }), n.provider("tagsInputConfig", function() {
        var e = {}, t = {}, n = 3;
        this.setDefaults = function(t, n) {
            return e[t] = n, this;
        }, this.setActiveInterpolation = function(e, n) {
            return t[e] = n, this;
        }, this.setTextAutosizeThreshold = function(e) {
            return n = e, this;
        }, this.$get = [ "$interpolate", function(i) {
            var a = {};
            return a[String] = function(e) {
                return e;
            }, a[Number] = function(e) {
                return parseInt(e, 10);
            }, a[Boolean] = function(e) {
                return "true" === e.toLowerCase();
            }, a[RegExp] = function(e) {
                return new RegExp(e);
            }, {
                load: function(n, r, o, s) {
                    var u = function() {
                        return !0;
                    };
                    r.options = {}, angular.forEach(s, function(s, l) {
                        var c, g, d, p, f, m;
                        c = s[0], g = s[1], d = s[2] || u, p = a[c], f = function() {
                            var t = e[n] && e[n][l];
                            return angular.isDefined(t) ? t : g;
                        }, m = function(e) {
                            r.options[l] = e && d(e) ? p(e) : f();
                        }, t[n] && t[n][l] ? o.$observe(l, function(e) {
                            m(e), r.events.trigger("option-change", {
                                name: l,
                                newValue: e
                            });
                        }) : m(o[l] && i(o[l])(r.$parent));
                    });
                },
                getTextAutosizeThreshold: function() {
                    return n;
                }
            };
        } ];
    }), n.factory("tiUtil", [ "$timeout", "$q", function(e, t) {
        var n = {
            debounce: function(t, n) {
                var i;
                return function() {
                    var a = arguments;
                    e.cancel(i), i = e(function() {
                        t.apply(null, a);
                    }, n);
                };
            },
            makeObjectArray: function(e, t) {
                if (!angular.isArray(e) || 0 === e.length || angular.isObject(e[0])) return e;
                var n = [];
                return e.forEach(function(e) {
                    var i = {};
                    i[t] = e, n.push(i);
                }), n;
            },
            findInObjectArray: function(e, t, i, a) {
                var r = null;
                return a = a || n.defaultComparer, e.some(function(e) {
                    if (a(e[i], t[i])) return r = e, !0;
                }), r;
            },
            defaultComparer: function(e, t) {
                return n.safeToString(e).toLowerCase() === n.safeToString(t).toLowerCase();
            },
            safeHighlight: function(e, t) {
                if (e = n.encodeHTML(e), !(t = n.encodeHTML(t))) return e;
                var i = new RegExp("&[^;]+;|" + t.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "gi");
                return e.replace(i, function(e) {
                    return e.toLowerCase() === t.toLowerCase() ? "<em>" + e + "</em>" : e;
                });
            },
            safeToString: function(e) {
                return angular.isUndefined(e) || null == e ? "" : e.toString().trim();
            },
            encodeHTML: function(e) {
                return n.safeToString(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            },
            handleUndefinedResult: function(e, t) {
                return function() {
                    var n = e.apply(null, arguments);
                    return angular.isUndefined(n) ? t : n;
                };
            },
            replaceSpacesWithDashes: function(e) {
                return n.safeToString(e).replace(/\s/g, "-");
            },
            isModifierOn: function(e) {
                return e.shiftKey || e.ctrlKey || e.altKey || e.metaKey;
            },
            promisifyValue: function(e) {
                return e = !!angular.isUndefined(e) || e, t[e ? "when" : "reject"]();
            },
            simplePubSub: function() {
                var e = {};
                return {
                    on: function(t, n, i) {
                        return t.split(" ").forEach(function(t) {
                            e[t] || (e[t] = []), (i ? [].unshift : [].push).call(e[t], n);
                        }), this;
                    },
                    trigger: function(t, i) {
                        return (e[t] || []).every(function(e) {
                            return n.handleUndefinedResult(e, !0)(i);
                        }), this;
                    }
                };
            }
        };
        return n;
    } ]), n.run([ "$templateCache", function(e) {
        e.put("ngTagsInput/tags-input.html", '<div class="host" tabindex="-1" ng-click="eventHandlers.host.click()" ti-transclude-append><div class="tags" ng-class="{focused: hasFocus}"><ul class="tag-list"><li class="tag-item" ng-repeat="tag in tagList.items track by track(tag)" ng-class="getTagClass(tag, $index)" ng-click="eventHandlers.tag.click(tag)"><ti-tag-item scope="templateScope" data="::tag"></ti-tag-item></li></ul><input class="input" autocomplete="off" ng-model="newTag.text" ng-model-options="{getterSetter: true}" ng-keydown="eventHandlers.input.keydown($event)" ng-focus="eventHandlers.input.focus($event)" ng-blur="eventHandlers.input.blur($event)" ng-paste="eventHandlers.input.paste($event)" ng-trim="false" ng-class="{\'invalid-tag\': newTag.invalid}" ng-disabled="disabled" ti-bind-attrs="{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex, spellcheck: options.spellcheck}" ti-autosize></div></div>'), 
        e.put("ngTagsInput/tag-item.html", '<span ng-bind="$getDisplayText()"></span> <a class="remove-button" ng-click="$removeTag()" ng-bind="::$$removeTagSymbol"></a>'), 
        e.put("ngTagsInput/auto-complete.html", '<div class="autocomplete" ng-if="suggestionList.visible"><ul class="suggestion-list"><li class="suggestion-item" ng-repeat="item in suggestionList.items track by track(item)" ng-class="getSuggestionClass(item, $index)" ng-click="addSuggestionByIndex($index)" ng-mouseenter="suggestionList.select($index)"><ti-autocomplete-match scope="templateScope" data="::item"></ti-autocomplete-match></li></ul></div>'), 
        e.put("ngTagsInput/auto-complete-match.html", '<span ng-bind-html="$highlight($getDisplayText())"></span>');
    } ]);
}();