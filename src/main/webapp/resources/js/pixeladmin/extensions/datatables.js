!function(e) {
    "use strict";
    if (!e.fn.dataTable) throw new Error("jquery.dataTables.js required.");
    e.extend(!0, e.fn.dataTable.defaults, {
        dom: "<'table-header clearfix'<'table-caption'><'DT-lf-right'<'DT-per-page'l><'DT-search'f>>><'dataTables_table_wrapper't><r><'table-footer clearfix'<'DT-label'i><'DT-pagination'p>>",
        oLanguage: {
            sLengthMenu: "Per page: _MENU_",
            sSearch: ""
        }
    }), e.extend(!0, e.fn.dataTable.ext.classes, {
        sProcessing: "dataTables_processing bg-primary darker"
    });
}(jQuery);