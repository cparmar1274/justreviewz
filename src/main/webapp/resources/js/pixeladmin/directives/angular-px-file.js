function pxFileDirective(e) {
    "use strict";
    return {
        restrict: "E",
        require: "ngModel",
        transclude: "element",
        template: '<label class="custom-file" for="{{pxFileId}}"><input type="file" class="custom-file-input" id="{{pxFileId}}" ng-disabled="disable"><span class="custom-file-control form-control" ng-class="{\'input-sm\':size === \'sm\',\'input-lg\':size === \'lg\'}">{{pxFilePlaceholder}}</span></label>',
        replace: !0,
        scope: {
            ngModel: "=",
            disable: "=?",
            size: "@"
        },
        link: function(i, l, n) {
            var t = n.instance ? $parse(n.instance).assign : angular.noop;
            i.pxFileId = n.inputId || "px-file-" + pxUtil.generateUniqueId(), i.pxFilePlaceholder = n.placeholder || "Choose file...", 
            e(function() {
                l.find("input").bind("change", function(e) {
                    i.$apply(function() {
                        return i.ngModel = e.target.files;
                    });
                }), l.pxFile(), t(i, $.fn.pxFile.bind(l)), l.on("$destroy", function() {
                    l.find("input").off("change"), l.pxFile("destroy");
                });
            });
        }
    };
}

function pxCustomFileDirective(e) {
    "use strict";
    return {
        restrict: "E",
        require: "ngModel",
        transclude: "element",
        template: '<label class="custom-file px-file" for="{{pxFileId}}"><input type="file" class="custom-file-input" id="{{pxFileId}}" ng-disabled="disable"><span class="custom-file-control form-control" ng-class="{\'input-sm\':size === \'sm\',\'input-lg\':size === \'lg\'}">{{pxFilePlaceholder}}</span><div class="px-file-buttons"><button type="button" class="btn px-file-clear" ng-class="{disabled: disable}">{{pxFileClearText}}</button><button type="button" class="btn btn-primary px-file-browse" ng-class="{disabled: disable}">{{pxFileBrowseText}}</button></div></label>',
        replace: !0,
        scope: {
            ngModel: "=",
            disable: "=?",
            size: "@"
        },
        link: function(i, l, n) {
            var t = n.instance ? $parse(n.instance).assign : angular.noop;
            i.pxFileId = n.inputId || "px-file-" + pxUtil.generateUniqueId(), i.pxFilePlaceholder = n.placeholder || "Choose file...", 
            i.pxFileClearText = n.clearText || "Clear", i.pxFileBrowseText = n.browseText || "Browse", 
            e(function() {
                l.find("input").bind("change", function(e) {
                    i.$apply(function() {
                        return i.ngModel = e.target.files;
                    });
                }), l.pxFile(), t(i, $.fn.pxFile.bind(l)), l.on("$destroy", function() {
                    l.find("input").off("change"), l.pxFile("destroy");
                });
            });
        }
    };
}

angular.module("px-file", []).directive("pxFile", [ "$timeout", pxFileDirective ]).directive("pxCustomFile", [ "$timeout", pxCustomFileDirective ]);