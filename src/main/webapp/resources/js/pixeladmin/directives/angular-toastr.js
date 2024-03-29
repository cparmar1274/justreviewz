function $toastrService() {
    "use strict";
    return {
        info: function(r, t, n) {
            return toastr.info(r, t, n);
        },
        warning: function(r, t, n) {
            return toastr.warning(r, t, n);
        },
        success: function(r, t, n) {
            return toastr.success(r, t, n);
        },
        error: function(r, t, n) {
            return toastr.error(r, t, n);
        },
        getContainer: function(r, t) {
            return toastr.getContainer(r, t);
        },
        subscribe: function(r) {
            return toastr.subscribe(r);
        },
        clear: function(r, t) {
            return toastr.clear(r, t);
        },
        remove: function(r) {
            return toastr.remove(r);
        }
    };
}

angular.module("toastr", []).factory("$toastr", $toastrService);