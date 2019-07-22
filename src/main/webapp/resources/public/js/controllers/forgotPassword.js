(function() {
    function ForgotController($scope, $http) {
        var self = this;
        self.showMessage = false;
        self.showError = false;
        self.messageText = "";
        self.clientEmail = "";
        self.retrievePassword = function() {
            self.showMessage = false;
            $http.post("forgotPassword", {
                clientEmail: self.clientEmail
            }).then(function(response) {
                self.showMessage = false;
                self.showError = false;
                if (response.data.newPassword != undefined) {
                    self.messageText = response.data.newPassword;
                    self.showMessage = true;
                } else {
                    self.messageText = response.data.result;
                    self.showError = true;
                }
            });
        };
    }
    angular.module("pixeladmin").controller("ForgotController", ForgotController);
})();