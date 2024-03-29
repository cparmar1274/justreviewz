function $growlService() {
    "use strict";
    return {
        default: function(r) {
            return $.growl(r);
        },
        success: function(r) {
            return $.growl.success(r);
        },
        error: function(r) {
            return $.growl.error(r);
        },
        notice: function(r) {
            return $.growl.notice(r);
        },
        warning: function(r) {
            return $.growl.warning(r);
        }
    };
}

angular.module("growl", []).factory("$growl", $growlService);