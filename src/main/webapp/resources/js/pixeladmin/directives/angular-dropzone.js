function angularDropzoneDirective(e, r) {
    "use strict";
    var n = [ "drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "removedfile", "thumbnail", "error", "processing", "uploadprogress", "sending", "success", "complete", "canceled", "maxfilesreached", "maxfilesexceeded", "processingmultiple", "sendingmultiple", "successmultiple", "completemultiple", "canceledmultiple", "totaluploadprogress", "reset", "queuecomplete" ];
    return {
        restrict: "A",
        link: function(a, o, t) {
            var l = t.instance ? r(t.instance).assign : angular.noop, s = t.options && r(t.options)(a) || {}, i = t.callbacks && r(t.callbacks)(a) || {};
            e(function() {
                o.addClass("dropzone-box"), o.dropzone(s), n.forEach(function(e) {
                    i[e] && o.dropzone("on", e, i[e]);
                }), l(a, $.fn.dropzone.bind(o)), o.on("$destroy", function() {
                    return o.dropzone("destroy");
                });
            });
        }
    };
}

function angularDropzoneMessageDirective() {
    "use strict";
    return {
        restrict: "E",
        transclude: !0,
        replace: !0,
        template: '<div class="dz-default dz-message" ng-transclude></div>'
    };
}

function angularDropzoneFallbackDirective() {
    "use strict";
    return {
        restrict: "E",
        transclude: !0,
        replace: !0,
        template: '<div class="fallback" ng-transclude></div>'
    };
}

angular.module("angular-dropzone", []).directive("dropzone", [ "$timeout", "$parse", angularDropzoneDirective ]).directive("dropzoneMessage", angularDropzoneMessageDirective).directive("dropzoneFallback", angularDropzoneFallbackDirective);