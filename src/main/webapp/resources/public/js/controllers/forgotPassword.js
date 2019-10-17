angular.module("pixeladmin").controller("ForgotController", function($scope, $http) {
    var self = this;
    self.showMessage = !1, self.showError = !1, self.messageText = "", self.clientEmail = "", 
    self.retrievePassword = function() {
        self.showMessage = !1, $http.post("forgotPassword", {
            clientEmail: self.clientEmail
        }).then(function(response) {
            self.showMessage = !1, self.showError = !1, null != response.data.newPassword ? (self.messageText = response.data.newPassword, 
            self.showMessage = !0) : (self.messageText = response.data.result, self.showError = !0);
        });
    };
});