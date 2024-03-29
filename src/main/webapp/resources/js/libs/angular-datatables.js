"undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "datatables"), 
function(e, n, t, r) {
    "use strict";
    function a(e, n, t, a, o, i) {
        function s(e) {
            var n = e[0].innerHTML;
            return function(e, t, a, i) {
                function s(e, r) {
                    e !== r && i.render(t, i.buildOptionsPromise(), n);
                }
                var d = a.dtDisableDeepWatchers ? "$watchCollection" : "$watch";
                r.forEach([ "dtColumns", "dtColumnDefs", "dtOptions" ], function(n) {
                    e[d].call(e, n, s, !0);
                }), o.showLoading(t, e), i.render(t, i.buildOptionsPromise(), n);
            };
        }
        function d(s) {
            function d(e) {
                r.isFunction(s.dtInstance) ? s.dtInstance(e) : r.isDefined(s.dtInstance) && (s.dtInstance = e);
            }
            var u;
            this.buildOptionsPromise = function() {
                var a = e.defer();
                return e.all([ e.when(s.dtOptions), e.when(s.dtColumns), e.when(s.dtColumnDefs) ]).then(function(a) {
                    var u, o = a[0], s = a[1], d = a[2];
                    if (i.deleteProperty(o, "$promise"), i.deleteProperty(s, "$promise"), i.deleteProperty(d, "$promise"), 
                    r.isDefined(o) && (u = {}, r.extend(u, o), r.isArray(s) && (u.aoColumns = s), r.isArray(d) && (u.aoColumnDefs = d), 
                    u.language && u.language.url)) {
                        var c = e.defer(), l = u.language.url;
                        n.get(u.language.url).then(function(e) {
                            c.resolve(e.data);
                        }, function() {
                            t.error("Could not fetch the content of the language from " + l);
                        }), u.language = c.promise;
                    }
                    return i.resolveObjectPromises(u, [ "data", "aaData", "fnPromise" ]);
                }).then(function(e) {
                    a.resolve(e);
                }), a.promise;
            }, this.render = function(e, n, t) {
                n.then(function(n) {
                    o.preRender(n);
                    var r = s.datatable && "ng" === s.datatable;
                    u && u._renderer ? u._renderer.withOptions(n).render(e, s, t).then(function(e) {
                        d(u = e);
                    }) : a.fromOptions(n, r).render(e, s, t).then(function(e) {
                        d(u = e);
                    });
                });
            };
        }
        return s.$inject = [ "tElm" ], d.$inject = [ "$scope" ], {
            restrict: "A",
            scope: {
                dtOptions: "=",
                dtColumns: "=",
                dtColumnDefs: "=",
                datatable: "@",
                dtInstance: "="
            },
            compile: s,
            controller: d
        };
    }
    function o(e) {
        return {
            newColumnDef: function(n) {
                if (r.isUndefined(n)) throw new Error('The parameter "targets" must be defined! See https://datatables.net/reference/option/columnDefs.targets');
                var t = Object.create(e.DTColumn);
                return r.isArray(n) ? t.aTargets = n : t.aTargets = [ n ], t;
            }
        };
    }
    function i(e, n, t) {
        return {
            compileHtml: function(a) {
                return e(r.element('<div class="' + t + '">' + n.loadingTemplate + "</div>"))(a);
            },
            isLoading: function(e) {
                return e.hasClass(t);
            }
        };
    }
    function s(e) {
        function n(e, n) {
            r.forEach(a, function(t) {
                r.isFunction(t.postRender) && t.postRender(e, n);
            });
        }
        var a = [], o = {
            showLoading: function(n, t) {
                var a = r.element(e.compileHtml(t));
                n.after(a), n.hide(), a.show();
            },
            hideLoading: function(n) {
                n.show();
                var t = n.next();
                e.isLoading(t) && t.remove();
            },
            renderDataTable: function(e, a) {
                var o = "#" + e.attr("id");
                t.fn.dataTable.isDataTable(o) && r.isObject(a) && (a.destroy = !0);
                var i = e.DataTable(a), s = e.dataTable(), d = {
                    id: e.attr("id"),
                    DataTable: i,
                    dataTable: s
                };
                return n(a, d), d;
            },
            hideLoadingAndRenderDataTable: function(e, n) {
                return o.hideLoading(e), o.renderDataTable(e, n);
            },
            registerPlugin: function(e) {
                a.push(e);
            },
            postRender: n,
            preRender: function(e) {
                r.forEach(a, function(n) {
                    r.isFunction(n.preRender) && n.preRender(e);
                });
            }
        };
        return o;
    }
    function d(e, n, t, r) {
        return {
            create: function(a) {
                function o(n, a) {
                    s = n, d = a;
                    var o = r.newDTInstance(u), c = t.hideLoadingAndRenderDataTable(n, u.options);
                    return i = c.DataTable, r.copyDTProperties(c, o), e.when(o);
                }
                var i, s, d, u = Object.create(n);
                return u.name = "DTDefaultRenderer", u.options = a, u.render = o, u.reloadData = function() {}, 
                u.changeData = function() {}, u.rerender = function() {
                    i.destroy(), t.showLoading(s, d), o(s, d);
                }, u;
            }
        };
    }
    function u(e, n, t, r, a, o, i) {
        return {
            create: function(s) {
                function d() {
                    p && p.$destroy(), c.ngDestroy(), l.html(u), p = f.$new(), t(l.contents())(p);
                }
                var u, c, l, f, p, h, D = Object.create(a);
                return D.name = "DTNGRenderer", D.options = s, D.render = function(e, t, a) {
                    u = a, l = e, f = t.$parent, h = i.newDTInstance(D);
                    var s = n.defer(), p = u.match(/<tbody([\s\S]*)<\/tbody>/i)[1], T = p.match(/^\s*.+?\s+in\s+([a-zA-Z0-9\.-_$]*)\s*/m);
                    if (!T) throw new Error('Expected expression in form of "_item_ in _collection_[ track by _id_]" but got "{0}".', p);
                    var m = T[1], b = !1;
                    return f.$watchCollection(m, function() {
                        c && b && d(), r(function() {
                            b = !0, o.preRender(D.options);
                            var e = o.hideLoadingAndRenderDataTable(l, D.options);
                            c = e.DataTable, i.copyDTProperties(e, h), s.resolve(h);
                        }, 0, !1);
                    }, !0), s.promise;
                }, D.reloadData = function() {
                    e.warn("The Angular Renderer does not support reloading data. You need to do it directly on your model");
                }, D.changeData = function() {
                    e.warn("The Angular Renderer does not support changing the data. You need to change your model directly.");
                }, D.rerender = function() {
                    d(), o.showLoading(l, f), o.preRender(s), r(function() {
                        var e = o.hideLoadingAndRenderDataTable(l, D.options);
                        c = e.DataTable, i.copyDTProperties(e, h);
                    }, 0, !1);
                }, D;
            }
        };
    }
    function c(e, n, t, a, o, i) {
        return {
            create: function(s) {
                function d(n, t) {
                    var r = e.defer();
                    return T = i.newDTInstance(b), h = n, D = t, u(b.options.fnPromise, o.renderDataTable).then(function(e) {
                        p = e.DataTable, i.copyDTProperties(e, T), r.resolve(T);
                    }), r.promise;
                }
                function u(n, t) {
                    var a = e.defer();
                    if (r.isUndefined(n)) throw new Error("You must provide a promise or a function that returns a promise!");
                    return m ? m.then(function() {
                        a.resolve(c(n, t));
                    }) : a.resolve(c(n, t)), a.promise;
                }
                function c(n, t) {
                    var a = e.defer();
                    return (m = r.isFunction(n) ? n() : n).then(function(e) {
                        var n = e;
                        if (b.options.sAjaxDataProp) for (var r = b.options.sAjaxDataProp.split("."); r.length; ) {
                            var o = r.shift();
                            o in n && (n = n[o]);
                        }
                        m = null, a.resolve(l(b.options, h, n, t));
                    }), a.promise;
                }
                function l(t, r, a, i) {
                    var s = e.defer();
                    return delete a.$promise, t.aaData = a, n(function() {
                        o.hideLoading(r), t.bDestroy = !0, s.resolve(i(r, t));
                    }, 0, !1), s.promise;
                }
                function f(e, n) {
                    return p.clear(), p.rows.add(n.aaData).draw(n.redraw), {
                        id: T.id,
                        DataTable: T.DataTable,
                        dataTable: T.dataTable
                    };
                }
                var p, h, D, T, m = null, b = Object.create(a);
                return b.name = "DTPromiseRenderer", b.options = s, b.render = d, b.reloadData = function(e, n) {
                    var a = p && p.page() ? p.page() : 0;
                    r.isFunction(b.options.fnPromise) ? u(b.options.fnPromise, f).then(function(t) {
                        r.isFunction(e) && e(t.DataTable.data()), !1 === n && t.DataTable.page(a).draw(!1);
                    }) : t.warn("In order to use the reloadData functionality with a Promise renderer, you need to provide a function that returns a promise.");
                }, b.changeData = function(e) {
                    b.options.fnPromise = e, D.dtOptions.fnPromise = e, u(b.options.fnPromise, f);
                }, b.rerender = function() {
                    p.destroy(), o.showLoading(h, D), o.preRender(s), d(h, D);
                }, b;
            }
        };
    }
    function l(e, n, t, a, o, i) {
        return {
            create: function(s) {
                function d(n, t) {
                    f = n, p = t;
                    var a = e.defer(), s = i.newDTInstance(h);
                    return r.isUndefined(h.options.sAjaxDataProp) && (h.options.sAjaxDataProp = o.sAjaxDataProp), 
                    r.isUndefined(h.options.aoColumns) && (h.options.aoColumns = o.aoColumns), u(h.options, n).then(function(e) {
                        l = e.DataTable, i.copyDTProperties(e, s), a.resolve(s);
                    }), a.promise;
                }
                function u(t, r) {
                    var o = e.defer();
                    return t.bDestroy = !0, l && (l.destroy(), a.showLoading(f, p), r.empty()), a.hideLoading(r), 
                    c(t) ? n(function() {
                        o.resolve(a.renderDataTable(r, t));
                    }, 0, !1) : o.resolve(a.renderDataTable(r, t)), o.promise;
                }
                function c(e) {
                    return !(!r.isDefined(e) || !r.isDefined(e.dom)) && 0 <= e.dom.indexOf("S");
                }
                var l, f, p, h = Object.create(t);
                return h.name = "DTAjaxRenderer", h.options = s, h.render = d, h.reloadData = function(e, n) {
                    l && l.ajax.reload(e, n);
                }, h.changeData = function(e) {
                    h.options.ajax = e, p.dtOptions.ajax = e;
                }, h.rerender = function() {
                    a.preRender(s), d(f, p);
                }, h;
            }
        };
    }
    function f(e, n, t, a) {
        return {
            fromOptions: function(o, i) {
                if (i) {
                    if (o && o.serverSide) throw new Error("You cannot use server side processing along with the Angular renderer!");
                    return n.create(o);
                }
                if (r.isDefined(o)) {
                    if (r.isDefined(o.fnPromise) && null !== o.fnPromise) {
                        if (o.serverSide) throw new Error("You cannot use server side processing along with the Promise renderer!");
                        return t.create(o);
                    }
                    return r.isDefined(o.ajax) && null !== o.ajax || r.isDefined(o.ajax) && null !== o.ajax ? a.create(o) : e.create(o);
                }
                return e.create();
            }
        };
    }
    function p(e) {
        function a(n, a) {
            var i = e.defer(), s = [], d = {}, u = a || [];
            if (!r.isObject(n) || r.isArray(n)) i.resolve(n); else {
                for (var c in d = r.extend(d, n)) d.hasOwnProperty(c) && -1 === t.inArray(c, u) && (r.isArray(d[c]) ? s.push(o(d[c])) : s.push(e.when(d[c])));
                e.all(s).then(function(e) {
                    var n = 0;
                    for (var r in d) d.hasOwnProperty(r) && -1 === t.inArray(r, u) && (d[r] = e[n++]);
                    i.resolve(d);
                });
            }
            return i.promise;
        }
        function o(n) {
            var t = e.defer(), o = [], i = [];
            return r.isArray(n) ? (r.forEach(n, function(n) {
                r.isObject(n) ? o.push(a(n)) : o.push(e.when(n));
            }), e.all(o).then(function(e) {
                r.forEach(e, function(e) {
                    i.push(e);
                }), t.resolve(i);
            })) : t.resolve(n), t.promise;
        }
        return {
            overrideProperties: function n(e, t) {
                var a = r.copy(e);
                if ((r.isUndefined(a) || null === a) && (a = {}), r.isUndefined(t) || null === t) return a;
                if (r.isObject(t)) for (var o in t) t.hasOwnProperty(o) && (a[o] = n(a[o], t[o])); else a = r.copy(t);
                return a;
            },
            deleteProperty: function(e, n) {
                r.isObject(e) && delete e[n];
            },
            resolveObjectPromises: a,
            resolveArrayPromises: o
        };
    }
    r.module("datatables.directive", [ "datatables.instances", "datatables.renderer", "datatables.options", "datatables.util" ]).directive("datatable", a), 
    a.$inject = [ "$q", "$http", "$log", "DTRendererFactory", "DTRendererService", "DTPropertyUtil" ], 
    r.module("datatables.factory", []).factory("DTOptionsBuilder", function() {
        var e = {
            withOption: function(e, n) {
                return r.isString(e) && (this[e] = n), this;
            },
            withSource: function(e) {
                return this.ajax = e, this;
            },
            withDataProp: function(e) {
                return this.sAjaxDataProp = e, this;
            },
            withFnServerData: function(e) {
                if (!r.isFunction(e)) throw new Error("The parameter must be a function");
                return this.fnServerData = e, this;
            },
            withPaginationType: function(e) {
                if (!r.isString(e)) throw new Error("The pagination type must be provided");
                return this.sPaginationType = e, this;
            },
            withLanguage: function(e) {
                return this.language = e, this;
            },
            withLanguageSource: function(e) {
                return this.withLanguage({
                    url: e
                });
            },
            withDisplayLength: function(e) {
                return this.iDisplayLength = e, this;
            },
            withFnPromise: function(e) {
                return this.fnPromise = e, this;
            },
            withDOM: function(e) {
                return this.dom = e, this;
            }
        };
        return {
            newOptions: function() {
                return Object.create(e);
            },
            fromSource: function(n) {
                var t = Object.create(e);
                return t.ajax = n, t;
            },
            fromFnPromise: function(n) {
                var t = Object.create(e);
                return t.fnPromise = n, t;
            }
        };
    }).factory("DTColumnBuilder", function() {
        var e = {
            withOption: function(e, n) {
                return r.isString(e) && (this[e] = n), this;
            },
            withTitle: function(e) {
                return this.sTitle = e, this;
            },
            withClass: function(e) {
                return this.sClass = e, this;
            },
            notVisible: function() {
                return this.bVisible = !1, this;
            },
            notSortable: function() {
                return this.bSortable = !1, this;
            },
            renderWith: function(e) {
                return this.mRender = e, this;
            }
        };
        return {
            newColumn: function(n, t) {
                if (r.isUndefined(n)) throw new Error('The parameter "mData" is not defined!');
                var a = Object.create(e);
                return a.mData = n, r.isDefined(t) && (a.sTitle = t), a;
            },
            DTColumn: e
        };
    }).factory("DTColumnDefBuilder", o).factory("DTLoadingTemplate", i), o.$inject = [ "DTColumnBuilder" ], 
    i.$inject = [ "$compile", "DTDefaultOptions", "DT_LOADING_CLASS" ], r.module("datatables.instances", [ "datatables.util" ]).factory("DTInstanceFactory", function() {
        var e = {
            reloadData: function(e, n) {
                this._renderer.reloadData(e, n);
            },
            changeData: function(e) {
                this._renderer.changeData(e);
            },
            rerender: function() {
                this._renderer.rerender();
            }
        };
        return {
            newDTInstance: function(n) {
                var t = Object.create(e);
                return t._renderer = n, t;
            },
            copyDTProperties: function(e, n) {
                n.id = e.id, n.DataTable = e.DataTable, n.dataTable = e.dataTable;
            }
        };
    }), r.module("datatables", [ "datatables.directive", "datatables.factory" ]).run(function() {
        t.fn.DataTable.Api && t.fn.DataTable.Api.register("ngDestroy()", function(n) {
            return n = n || !1, this.iterator("table", function(r) {
                var a, o = r.nTableWrapper.parentNode, i = r.oClasses, s = r.nTable, d = r.nTBody, u = r.nTHead, c = r.nTFoot, l = t(s), f = t(d), p = t(r.nTableWrapper), h = t.map(r.aoData, function(e) {
                    return e.nTr;
                });
                r.bDestroying = !0, t.fn.DataTable.ext.internal._fnCallbackFire(r, "aoDestroyCallback", "destroy", [ r ]), 
                n || new t.fn.DataTable.Api(r).columns().visible(!0), p.unbind(".DT").find(":not(tbody *)").unbind(".DT"), 
                t(e).unbind(".DT-" + r.sInstance), s !== u.parentNode && (l.children("thead").detach(), 
                l.append(u)), c && s !== c.parentNode && (l.children("tfoot").detach(), l.append(c)), 
                l.detach(), p.detach(), r.aaSorting = [], r.aaSortingFixed = [], t.fn.DataTable.ext.internal._fnSortingClasses(r), 
                t(h).removeClass(r.asStripeClasses.join(" ")), t("th, td", u).removeClass(i.sSortable + " " + i.sSortableAsc + " " + i.sSortableDesc + " " + i.sSortableNone), 
                r.bJUI && (t("th span." + i.sSortIcon + ", td span." + i.sSortIcon, u).detach(), 
                t("th, td", u).each(function() {
                    var e = t("div." + i.sSortJUIWrapper, this);
                    t(this).append(e.contents()), e.detach();
                })), !n && o && (o.contains(r.nTableReinsertBefore) ? o.insertBefore(s, r.nTableReinsertBefore) : o.appendChild(s)), 
                l.css("width", r.sDestroyWidth).removeClass(i.sTable), (a = r.asDestroyStripes.length) && f.children().each(function(e) {
                    t(this).addClass(r.asDestroyStripes[e % a]);
                });
                var D = t.inArray(r, t.fn.DataTable.settings);
                -1 !== D && t.fn.DataTable.settings.splice(D, 1);
            });
        });
    }), r.module("datatables.options", []).constant("DT_DEFAULT_OPTIONS", {
        sAjaxDataProp: "",
        aoColumns: []
    }).constant("DT_LOADING_CLASS", "dt-loading").service("DTDefaultOptions", function() {
        var e = {
            loadingTemplate: "<h3>Loading...</h3>",
            bootstrapOptions: {},
            setLoadingTemplate: function(n) {
                return e.loadingTemplate = n, e;
            },
            setLanguageSource: function(n) {
                return t.ajax({
                    dataType: "json",
                    url: n,
                    success: function(e) {
                        t.extend(!0, t.fn.DataTable.defaults, {
                            language: e
                        });
                    }
                }), e;
            },
            setLanguage: function(n) {
                return t.extend(!0, t.fn.DataTable.defaults, {
                    language: n
                }), e;
            },
            setDisplayLength: function(n) {
                return t.extend(t.fn.DataTable.defaults, {
                    displayLength: n
                }), e;
            },
            setBootstrapOptions: function(n) {
                return e.bootstrapOptions = n, e;
            },
            setDOM: function(n) {
                return t.extend(t.fn.DataTable.defaults, {
                    dom: n
                }), e;
            },
            setOption: function(e, n) {
                if (r.isString(e)) {
                    var a = {};
                    a[e] = n, t.extend(t.fn.DataTable.defaults, a);
                }
            }
        };
        return e;
    }), r.module("datatables.renderer", [ "datatables.instances", "datatables.factory", "datatables.options", "datatables.instances" ]).factory("DTRendererService", s).factory("DTRenderer", function() {
        return {
            withOptions: function(e) {
                return this.options = e, this;
            }
        };
    }).factory("DTDefaultRenderer", d).factory("DTNGRenderer", u).factory("DTPromiseRenderer", c).factory("DTAjaxRenderer", l).factory("DTRendererFactory", f), 
    s.$inject = [ "DTLoadingTemplate" ], d.$inject = [ "$q", "DTRenderer", "DTRendererService", "DTInstanceFactory" ], 
    u.$inject = [ "$log", "$q", "$compile", "$timeout", "DTRenderer", "DTRendererService", "DTInstanceFactory" ], 
    c.$inject = [ "$q", "$timeout", "$log", "DTRenderer", "DTRendererService", "DTInstanceFactory" ], 
    l.$inject = [ "$q", "$timeout", "DTRenderer", "DTRendererService", "DT_DEFAULT_OPTIONS", "DTInstanceFactory" ], 
    f.$inject = [ "DTDefaultRenderer", "DTNGRenderer", "DTPromiseRenderer", "DTAjaxRenderer" ], 
    r.module("datatables.util", []).factory("DTPropertyUtil", p), p.$inject = [ "$q" ];
}(window, document, jQuery, angular);