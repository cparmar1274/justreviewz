angular.module("pixeladmin").directive("compareTo", function() {
    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            selector: "@compareTo"
        },
        link: function($scope, _element_, _attrs_, ctrl) {
            var $el = angular.element($scope.selector);
            ctrl.$validators.compareTo = function(_modelValue_, viewValue) {
                return (viewValue || "") === $el.val();
            }, $el.on("input", function() {
                $scope.$apply(function() {
                    ctrl.$validate();
                });
            });
        }
    };
}).directive("phone", function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function($scope, _element_, _attrs_, ctrl) {
            ctrl.$validators.phone = function(_modelValue_, viewValue) {
                return /^\(\d{3}\)[ ]\d{3}\-\d{4}$/.test(viewValue);
            };
        }
    };
}).directive("fileRequired", function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function($scope, $element, _attrs_, ctrl) {
            ctrl.$validators.fileRequired = function(_modelValue_, viewValue) {
                return viewValue instanceof FileList && 0 < viewValue.length;
            }, $element.bind("change", function() {
                $scope.$apply(function() {
                    ctrl.$setViewValue($element[0].files), ctrl.$validate();
                });
            });
        }
    };
}).directive("pxFileRequired", function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function($scope, $element, _attrs_, ctrl) {
            ctrl.$validators.pxFileRequired = function(_modelValue_, viewValue) {
                return viewValue instanceof FileList && 0 < viewValue.length;
            }, $element.find('input[type="file"]').bind("change focusout", function() {
                $scope.$apply(function() {
                    ctrl.$validate(), ctrl.$setTouched();
                });
            });
        }
    };
}).controller("WizardValidationCtrl", [ "$scope", "$element", "$http", function($scope, $element, $http) {
    var self = this;
    this.data = {}, this.$wizard = null, self.createError = !0, self.createSuccess = !0, 
    self.createFinish = !1, this.hasErrs = function(form, field, err) {
        var fields = field.split("|");
        angular.forEach(fields, function(f) {
            if (self.hasErr(form, f, err)) return !0;
        });
    }, this.hasErr = function(form, field, err) {
        return !(!form.$submitted && !(form[field] || {
            $touched: !1
        }).$touched) && (err ? Boolean(form[field].$error[err]) : form[field].$invalid);
    }, this.next = function(form) {
        form.$invalid || self.$wizard("goNext");
    }, this.back = function() {
        self.$wizard("goPrev");
    }, this.errorBack = function() {
        self.createFinish = !1, self.createError = !0, self.createSuccess = !0;
        var $pane = self.$wizard("getActivePane");
        $pane.find(".ion-close-circled").removeClass("ion-close-circled").addClass("ion-checkmark-round"), 
        $pane.find("h4").text("We're almost done"), self.back();
    }, this.login = function() {}, this.userCreated = function(result) {
        var $pane = self.$wizard("getActivePane");
        $pane.find(".ion-close-circled").removeClass("ion-close-circled").addClass("ion-checkmark-circled"), 
        $pane.find("h4").text("Thank You! " + ("CREATED" == result ? " You can access the service now with your credentials" : result)), 
        $pane.find("button").remove(), self.createFinish = !0, self.createError = !0, self.createSuccess = !1, 
        self.$wizard().finish();
    }, this.finish = function() {
        var $pane = self.$wizard("getActivePane");
        console.log(self.$wizard), console.log(self.data);
        var province = self.data.address.province;
        self.data.address.province = province.name, self.data.clientId = 999, $http.post("addUser", self.data).then(function(response) {
            1 == response.data.success ? self.userCreated(response.data.result) : ($pane.find(".ion-checkmark-round").removeClass("ion-checkmark-round").addClass("ion-close-circled"), 
            $pane.find("h4").text("Error! " + response.data.result), self.createFinish = !0, 
            self.createError = !1, self.createSuccess = !0);
        });
    };
} ]);