!function(e) {
    "function" == typeof define && define.amd ? define([ "jquery", "datatables.net" ], function(a) {
        return e(a, window, document);
    }) : "object" == typeof exports ? module.exports = function(a, t) {
        return a || (a = window), t && t.fn.dataTable || (t = require("datatables.net")(a, t).$), 
        e(t, a, a.document);
    } : e(jQuery, window, document);
}(function(e, a, t, n) {
    "use strict";
    var s = e.fn.dataTable;
    return e.extend(!0, s.defaults, {
        dom: "<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>",
        renderer: "bootstrap"
    }), e.extend(s.ext.classes, {
        sWrapper: "dataTables_wrapper form-inline dt-bootstrap",
        sFilterInput: "form-control input-sm",
        sLengthSelect: "form-control input-sm",
        sProcessing: "dataTables_processing panel panel-default"
    }), s.ext.renderer.pageButton.bootstrap = function(a, i, r, o, d, l) {
        var c, u, p, f = new s.Api(a), b = a.oClasses, m = a.oLanguage.oPaginate, g = a.oLanguage.oAria.paginate || {}, x = 0, w = function(t, n) {
            var s, i, o, p;
            for (s = 0, i = n.length; s < i; s++) if (p = n[s], e.isArray(p)) w(t, p); else {
                switch (u = c = "", p) {
                  case "ellipsis":
                    c = "&#x2026;", u = "disabled";
                    break;

                  case "first":
                    c = m.sFirst, u = p + (0 < d ? "" : " disabled");
                    break;

                  case "previous":
                    c = m.sPrevious, u = p + (0 < d ? "" : " disabled");
                    break;

                  case "next":
                    c = m.sNext, u = p + (d < l - 1 ? "" : " disabled");
                    break;

                  case "last":
                    c = m.sLast, u = p + (d < l - 1 ? "" : " disabled");
                    break;

                  default:
                    c = p + 1, u = d === p ? "active" : "";
                }
                c && (o = e("<li>", {
                    class: b.sPageButton + " " + u,
                    id: 0 === r && "string" == typeof p ? a.sTableId + "_" + p : null
                }).append(e("<a>", {
                    href: "#",
                    "aria-controls": a.sTableId,
                    "aria-label": g[p],
                    "data-dt-idx": x,
                    tabindex: a.iTabIndex
                }).html(c)).appendTo(t), a.oApi._fnBindAction(o, {
                    action: p
                }, function(a) {
                    a.preventDefault(), e(a.currentTarget).hasClass("disabled") || f.page() == a.data.action || f.page(a.data.action).draw("page");
                }), x++);
            }
        };
        try {
            p = e(i).find(t.activeElement).data("dt-idx");
        } catch (e) {}
        w(e(i).empty().html('<ul class="pagination"/>').children("ul"), o), p !== n && e(i).find("[data-dt-idx=" + p + "]").focus();
    }, s;
});