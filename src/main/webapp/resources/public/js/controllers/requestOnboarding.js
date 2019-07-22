(function() {
    function compareToValidatorDirective() {
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
                };
                $el.on("input", function() {
                    $scope.$apply(function() {
                        ctrl.$validate();
                    });
                });
            }
        };
    }
    function phoneValidatorDirective() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function($scope, _element_, _attrs_, ctrl) {
                ctrl.$validators.phone = function(_modelValue_, viewValue) {
                    return /^\(\d{3}\)[ ]\d{3}\-\d{4}$/.test(viewValue);
                };
            }
        };
    }
    function fileValidatorDirective() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function($scope, $element, _attrs_, ctrl) {
                ctrl.$validators.fileRequired = function(_modelValue_, viewValue) {
                    return viewValue instanceof FileList && viewValue.length > 0;
                };
                $element.bind("change", function() {
                    $scope.$apply(function() {
                        ctrl.$setViewValue($element[0].files);
                        ctrl.$validate();
                    });
                });
            }
        };
    }
    function pxFileValidatorDirective() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function($scope, $element, _attrs_, ctrl) {
                ctrl.$validators.pxFileRequired = function(_modelValue_, viewValue) {
                    return viewValue instanceof FileList && viewValue.length > 0;
                };
                $element.find('input[type="file"]').bind("change focusout", function() {
                    $scope.$apply(function() {
                        ctrl.$validate();
                        ctrl.$setTouched();
                    });
                });
            }
        };
    }
    function FormValidationCtrl($scope) {
        var self = this;
        this.data = {};
        this.hasErr = function(field, err) {
            if (!$scope.validationForm.$submitted && !($scope.validationForm[field] || {
                $touched: false
            }).$touched) {
                return false;
            }
            if (!err) {
                return $scope.validationForm[field].$invalid;
            }
            return Boolean($scope.validationForm[field].$error[err]);
        };
        this.printData = function() {
            return JSON.stringify(self.data, null, 2);
        };
    }
    function WizardValidationCtrl($scope, $element, $http) {
        var self = this;
        this.data = {};
        this.$wizard = null;
        self.createError = true;
        self.createSuccess = true;
        self.createFinish = false;
        this.hasErrs = function(form, field, err) {
            var fields = field.split("|");
            angular.forEach(fields, function(f) {
                var result = self.hasErr(form, f, err);
                if (result) return true;
            });
        };
        this.hasErr = function(form, field, err) {
            if (!form.$submitted && !(form[field] || {
                $touched: false
            }).$touched) {
                return false;
            }
            if (!err) {
                return form[field].$invalid;
            }
            return Boolean(form[field].$error[err]);
        };
        this.next = function(form) {
            if (form.$invalid) {
                return;
            }
            self.$wizard("goNext");
        };
        this.back = function() {
            self.$wizard("goPrev");
        };
        this.errorBack = function() {
            self.createFinish = false;
            self.createError = true;
            self.createSuccess = true;
            var $pane = self.$wizard("getActivePane");
            $pane.find(".ion-close-circled").removeClass("ion-close-circled").addClass("ion-checkmark-round");
            $pane.find("h4").text("We're almost done");
            self.back();
        };
        this.login = function() {};
        this.userCreated = function(result) {
            var $pane = self.$wizard("getActivePane");
            $pane.find(".ion-close-circled").removeClass("ion-close-circled").addClass("ion-checkmark-circled");
            $pane.find("h4").text("Thank You! " + (result == "CREATED" ? " You can access the service now with your credentials" : result));
            $pane.find("button").remove();
            self.createFinish = true;
            self.createError = true;
            self.createSuccess = false;
            self.$wizard().finish();
        };
        this.finish = function() {
            var $pane = self.$wizard("getActivePane");
            console.log(self.$wizard);
            console.log(self.data);
            var province = self.data.address.province;
            self.data.address.province = province.name;
            self.data.clientId = 999;
            $http.post("addUser", self.data).then(function(response) {
                if (response.data.success == true) {
                    self.userCreated(response.data.result);
                } else {
                    $pane.find(".ion-checkmark-round").removeClass("ion-checkmark-round").addClass("ion-close-circled");
                    $pane.find("h4").text("Error! " + response.data.result);
                    self.createFinish = true;
                    self.createError = false;
                    self.createSuccess = true;
                }
            });
        };
    }
    angular.module("pixeladmin").directive("compareTo", compareToValidatorDirective).directive("phone", phoneValidatorDirective).directive("fileRequired", fileValidatorDirective).directive("pxFileRequired", pxFileValidatorDirective).controller("WizardValidationCtrl", [ "$scope", "$element", "$http", WizardValidationCtrl ]);
})();