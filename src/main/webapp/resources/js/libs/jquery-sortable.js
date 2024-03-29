!function(t, e, i, o) {
    function s(t, e) {
        return Math.max(0, t[0] - e[0], e[0] - t[1]) + Math.max(0, t[2] - e[1], e[1] - t[3]);
    }
    function n(e, i, o, s) {
        var n = e.length, r = s ? "offset" : "position";
        for (o = o || 0; n--; ) {
            var a = e[n].el ? e[n].el : t(e[n]), h = a[r]();
            h.left += parseInt(a.css("margin-left"), 10), h.top += parseInt(a.css("margin-top"), 10), 
            i[n] = [ h.left - o, h.left + a.outerWidth() + o, h.top - o, h.top + a.outerHeight() + o ];
        }
    }
    function r(t, e) {
        var i = e.offset();
        return {
            left: t.left - i.left,
            top: t.top - i.top
        };
    }
    function a(t, e, i) {
        e = [ e.left, e.top ], i = i && [ i.left, i.top ];
        for (var o, n = t.length, r = []; n--; ) o = t[n], r[n] = [ n, s(o, e), i && s(o, i) ];
        return r.sort(function(t, e) {
            return e[1] - t[1] || e[2] - t[2] || e[0] - t[0];
        });
    }
    function h(e) {
        this.options = t.extend({}, u, e), this.containers = [], this.options.rootGroup || (this.scrollProxy = t.proxy(this.scroll, this), 
        this.dragProxy = t.proxy(this.drag, this), this.dropProxy = t.proxy(this.drop, this), 
        this.placeholder = t(this.options.placeholder), e.isValidTarget || (this.options.isValidTarget = o));
    }
    function l(e, i) {
        this.el = e, this.options = t.extend({}, c, i), this.group = h.get(this.options), 
        this.rootGroup = this.options.rootGroup || this.group, this.handle = this.rootGroup.options.handle || this.rootGroup.options.itemSelector;
        var o = this.rootGroup.options.itemPath;
        this.target = o ? this.el.find(o) : this.el, this.target.on(g.start, this.handle, t.proxy(this.dragInit, this)), 
        this.options.drop && this.group.containers.push(this);
    }
    var c = {
        drag: !0,
        drop: !0,
        exclude: "",
        nested: !0,
        vertical: !0
    }, u = {
        afterMove: function(t, e, i) {},
        containerPath: "",
        containerSelector: "ol, ul",
        distance: 0,
        delay: 0,
        handle: "",
        itemPath: "",
        itemSelector: "li",
        bodyClass: "dragging",
        draggedClass: "dragged",
        isValidTarget: function(t, e) {
            return !0;
        },
        onCancel: function(t, e, i, o) {},
        onDrag: function(t, e, i, o) {
            t.css(e);
        },
        onDragStart: function(e, i, o, s) {
            e.css({
                height: e.outerHeight(),
                width: e.outerWidth()
            }), e.addClass(i.group.options.draggedClass), t("body").addClass(i.group.options.bodyClass);
        },
        onDrop: function(e, i, o, s) {
            e.removeClass(i.group.options.draggedClass).removeAttr("style"), t("body").removeClass(i.group.options.bodyClass);
        },
        onMousedown: function(t, e, i) {
            if (!i.target.nodeName.match(/^(input|select|textarea)$/i)) return i.preventDefault(), 
            !0;
        },
        placeholderClass: "placeholder",
        placeholder: '<li class="placeholder"></li>',
        pullPlaceholder: !0,
        serialize: function(e, i, o) {
            var s = t.extend({}, e.data());
            return o ? [ i ] : (i[0] && (s.children = i), delete s.subContainers, delete s.sortable, 
            s);
        },
        tolerance: 0
    }, p = {}, f = 0, d = {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    }, g = {
        start: "touchstart.sortable mousedown.sortable",
        drop: "touchend.sortable touchcancel.sortable mouseup.sortable",
        drag: "touchmove.sortable mousemove.sortable",
        scroll: "scroll.sortable"
    };
    h.get = function(t) {
        return p[t.group] || (t.group === o && (t.group = f++), p[t.group] = new h(t)), 
        p[t.group];
    }, h.prototype = {
        dragInit: function(e, i) {
            this.$document = t(i.el[0].ownerDocument);
            var o = t(e.target).closest(this.options.itemSelector);
            if (o.length) {
                if (this.item = o, this.itemContainer = i, this.item.is(this.options.exclude) || !this.options.onMousedown(this.item, u.onMousedown, e)) return;
                this.setPointer(e), this.toggleListeners("on"), this.setupDelayTimer(), this.dragInitDone = !0;
            }
        },
        drag: function(t) {
            if (!this.dragging) {
                if (!this.distanceMet(t) || !this.delayMet) return;
                this.options.onDragStart(this.item, this.itemContainer, u.onDragStart, t), this.item.before(this.placeholder), 
                this.dragging = !0;
            }
            this.setPointer(t), this.options.onDrag(this.item, r(this.pointer, this.item.offsetParent()), u.onDrag, t);
            var e = this.getPointer(t), i = this.sameResultBox, s = this.options.tolerance;
            (!i || i.top - s > e.top || i.bottom + s < e.top || i.left - s > e.left || i.right + s < e.left) && (this.searchValidTarget() || (this.placeholder.detach(), 
            this.lastAppendedItem = o));
        },
        drop: function(t) {
            this.toggleListeners("off"), this.dragInitDone = !1, this.dragging && (this.placeholder.closest("html")[0] ? this.placeholder.before(this.item).detach() : this.options.onCancel(this.item, this.itemContainer, u.onCancel, t), 
            this.options.onDrop(this.item, this.getContainer(this.item), u.onDrop, t), this.clearDimensions(), 
            this.clearOffsetParent(), this.lastAppendedItem = this.sameResultBox = o, this.dragging = !1);
        },
        searchValidTarget: function(t, e) {
            t || (t = this.relativePointer || this.pointer, e = this.lastRelativePointer || this.lastPointer);
            for (var i = a(this.getContainerDimensions(), t, e), s = i.length; s--; ) {
                var n = i[s][0];
                if (!i[s][1] || this.options.pullPlaceholder) {
                    var h = this.containers[n];
                    if (!h.disabled) {
                        if (!this.$getOffsetParent()) {
                            var l = h.getItemOffsetParent();
                            t = r(t, l), e = r(e, l);
                        }
                        if (h.searchValidTarget(t, e)) return !0;
                    }
                }
            }
            this.sameResultBox && (this.sameResultBox = o);
        },
        movePlaceholder: function(t, e, i, o) {
            var s = this.lastAppendedItem;
            !o && s && s[0] === e[0] || (e[i](this.placeholder), this.lastAppendedItem = e, 
            this.sameResultBox = o, this.options.afterMove(this.placeholder, t, e));
        },
        getContainerDimensions: function() {
            return this.containerDimensions || n(this.containers, this.containerDimensions = [], this.options.tolerance, !this.$getOffsetParent()), 
            this.containerDimensions;
        },
        getContainer: function(t) {
            return t.closest(this.options.containerSelector).data("sortable");
        },
        $getOffsetParent: function() {
            if (this.offsetParent === o) {
                var t = this.containers.length - 1, e = this.containers[t].getItemOffsetParent();
                if (!this.options.rootGroup) for (;t--; ) if (e[0] != this.containers[t].getItemOffsetParent()[0]) {
                    e = !1;
                    break;
                }
                this.offsetParent = e;
            }
            return this.offsetParent;
        },
        setPointer: function(t) {
            var e = this.getPointer(t);
            if (this.$getOffsetParent()) {
                var i = r(e, this.$getOffsetParent());
                this.lastRelativePointer = this.relativePointer, this.relativePointer = i;
            }
            this.lastPointer = this.pointer, this.pointer = e;
        },
        distanceMet: function(t) {
            var e = this.getPointer(t);
            return Math.max(Math.abs(this.pointer.left - e.left), Math.abs(this.pointer.top - e.top)) >= this.options.distance;
        },
        getPointer: function(t) {
            var e = t.originalEvent || t.originalEvent.touches && t.originalEvent.touches[0];
            return {
                left: t.pageX || e.pageX,
                top: t.pageY || e.pageY
            };
        },
        setupDelayTimer: function() {
            var t = this;
            this.delayMet = !this.options.delay, this.delayMet || (clearTimeout(this._mouseDelayTimer), 
            this._mouseDelayTimer = setTimeout(function() {
                t.delayMet = !0;
            }, this.options.delay));
        },
        scroll: function(t) {
            this.clearDimensions(), this.clearOffsetParent();
        },
        toggleListeners: function(e) {
            var i = this;
            t.each([ "drag", "drop", "scroll" ], function(t, o) {
                i.$document[e](g[o], i[o + "Proxy"]);
            });
        },
        clearOffsetParent: function() {
            this.offsetParent = o;
        },
        clearDimensions: function() {
            this.traverse(function(t) {
                t._clearDimensions();
            });
        },
        traverse: function(t) {
            t(this);
            for (var e = this.containers.length; e--; ) this.containers[e].traverse(t);
        },
        _clearDimensions: function() {
            this.containerDimensions = o;
        },
        _destroy: function() {
            p[this.options.group] = o;
        }
    }, l.prototype = {
        dragInit: function(t) {
            var e = this.rootGroup;
            !this.disabled && !e.dragInitDone && this.options.drag && this.isValidDrag(t) && e.dragInit(t, this);
        },
        isValidDrag: function(t) {
            return 1 == t.which || "touchstart" == t.type && 1 == t.originalEvent.touches.length;
        },
        searchValidTarget: function(t, e) {
            var i = a(this.getItemDimensions(), t, e), o = i.length, s = this.rootGroup, n = !s.options.isValidTarget || s.options.isValidTarget(s.item, this);
            if (!o && n) return s.movePlaceholder(this, this.target, "append"), !0;
            for (;o--; ) {
                var r = i[o][0];
                if (!i[o][1] && this.hasChildGroup(r)) {
                    if (this.getContainerGroup(r).searchValidTarget(t, e)) return !0;
                } else if (n) return this.movePlaceholder(r, t), !0;
            }
        },
        movePlaceholder: function(e, i) {
            var o = t(this.items[e]), s = this.itemDimensions[e], n = "after", r = o.outerWidth(), a = o.outerHeight(), h = o.offset(), l = {
                left: h.left,
                right: h.left + r,
                top: h.top,
                bottom: h.top + a
            };
            if (this.options.vertical) {
                var c = (s[2] + s[3]) / 2;
                i.top <= c ? (n = "before", l.bottom -= a / 2) : l.top += a / 2;
            } else {
                var u = (s[0] + s[1]) / 2;
                i.left <= u ? (n = "before", l.right -= r / 2) : l.left += r / 2;
            }
            this.hasChildGroup(e) && (l = d), this.rootGroup.movePlaceholder(this, o, n, l);
        },
        getItemDimensions: function() {
            return this.itemDimensions || (this.items = this.$getChildren(this.el, "item").filter(":not(." + this.group.options.placeholderClass + ", ." + this.group.options.draggedClass + ")").get(), 
            n(this.items, this.itemDimensions = [], this.options.tolerance)), this.itemDimensions;
        },
        getItemOffsetParent: function() {
            var t = this.el;
            return "relative" === t.css("position") || "absolute" === t.css("position") || "fixed" === t.css("position") ? t : t.offsetParent();
        },
        hasChildGroup: function(t) {
            return this.options.nested && this.getContainerGroup(t);
        },
        getContainerGroup: function(e) {
            var i = t.data(this.items[e], "subContainers");
            if (i === o) {
                var s = this.$getChildren(this.items[e], "container");
                if (i = !1, s[0]) {
                    var n = t.extend({}, this.options, {
                        rootGroup: this.rootGroup,
                        group: f++
                    });
                    i = s.sortable(n).data("sortable").group;
                }
                t.data(this.items[e], "subContainers", i);
            }
            return i;
        },
        $getChildren: function(e, i) {
            var o = this.rootGroup.options, s = o[i + "Path"], n = o[i + "Selector"];
            return e = t(e), s && (e = e.find(s)), e.children(n);
        },
        _serialize: function(e, i) {
            var o = this, s = i ? "item" : "container", n = this.$getChildren(e, s).not(this.options.exclude).map(function() {
                return o._serialize(t(this), !i);
            }).get();
            return this.rootGroup.options.serialize(e, n, i);
        },
        traverse: function(e) {
            t.each(this.items || [], function(i) {
                var o = t.data(this, "subContainers");
                o && o.traverse(e);
            }), e(this);
        },
        _clearDimensions: function() {
            this.itemDimensions = o;
        },
        _destroy: function() {
            var e = this;
            this.target.off(g.start, this.handle), this.el.removeData("sortable"), this.options.drop && (this.group.containers = t.grep(this.group.containers, function(t) {
                return t != e;
            })), t.each(this.items || [], function() {
                t.removeData(this, "subContainers");
            });
        }
    };
    var m = {
        enable: function() {
            this.traverse(function(t) {
                t.disabled = !1;
            });
        },
        disable: function() {
            this.traverse(function(t) {
                t.disabled = !0;
            });
        },
        serialize: function() {
            return this._serialize(this.el, !0);
        },
        refresh: function() {
            this.traverse(function(t) {
                t._clearDimensions();
            });
        },
        destroy: function() {
            this.traverse(function(t) {
                t._destroy();
            });
        }
    };
    t.extend(l.prototype, m), t.fn.sortable = function(e) {
        var i = Array.prototype.slice.call(arguments, 1);
        return this.map(function() {
            var s = t(this), n = s.data("sortable");
            return n && m[e] ? m[e].apply(n, i) || this : (n || e !== o && "object" != typeof e || s.data("sortable", new l(s, e)), 
            this);
        });
    };
}(jQuery, window);