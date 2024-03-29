function $pxBlockAlertService() {
    "use strict";
    return {
        add: function(e, t) {
            return $((t || {}).container || ".px-content").pxBlockAlert(e, t);
        },
        remove: function(e, t, n) {
            return $((n || {}).container || ".px-content").pxBlockAlert("remove", e, t);
        },
        clear: function(e, t, n) {
            return $((n || {}).container || ".px-content").pxBlockAlert("clear", e, t);
        },
        clearAll: function(e, t) {
            return $((t || {}).container || ".px-content").pxBlockAlert("clearAll", e);
        },
        destroy: function(e) {
            return $((e || {}).container || ".px-content").pxBlockAlert("destroy");
        }
    };
}

angular.module("px-block-alert", []).factory("$pxBlockAlert", $pxBlockAlertService);