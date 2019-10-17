angular.module("pixeladmin").controller("AccountCtrl", [ "$http", "DTOptionsBuilder", "$q", function($http, DTOptionsBuilder, $q) {
    var self = this;
    self.message = "", self.showMessage = !1, self.account = {}, self.social = {}, self.credentials = {}, 
    self.notification = {}, self.subscription = {}, self.subscriptionActive = !1, self.account.accountName = "", 
    self.account.accountEmail = "", self.account.businessStreet = "", self.account.businessCity = "", 
    self.account.businessPostal = "", self.account.workingHours = {}, self.account.workingHours.monday = "", 
    self.account.workingHours.tuesday = "", self.account.workingHours.wednesday = "", 
    self.account.workingHours.thursday = "", self.account.workingHours.friday = "", 
    self.account.workingHours.saturday = "", self.account.workingHours.sunday = "", 
    self.account.clientBusinessPhoneNumber = "", self.account.businessProvince = "", 
    self.account.accountUsername = "", self.account.businessCountryList = [], self.account.businessProvinceList = [], 
    self.locationMap = [], self.loadLocations = function() {
        var deferred;
        (deferred = $q.defer(), $http.post("loadResults", {
            type: "LOCATION",
            query: "GJ6BPALL1274",
            businessName: "",
            locationName: ""
        }).then(function(data) {
            deferred.resolve({
                data: data.data.result.businesses
            });
        }), deferred.promise).then(function(data) {
            self.locationMap = [], angular.forEach(data.data, function(object) {
                self.locationMap.push(object), -1 === self.account.businessCountryList.indexOf(object.country) && self.account.businessCountryList.push(object.country);
            });
        });
    }, self.selectCountry = function() {
        self.account.businessProvinceList = [], angular.forEach(self.locationMap, function(object) {
            -1 === self.account.businessProvinceList.indexOf(object.province) && self.account.businessCountry === object.country && self.account.businessProvinceList.push(object.province);
        });
    }, self.account.businessCountry = "Canada", self.account.businessWebsite = "", self.updateProfile = function() {
        $http.post("updateProfile", self.account).then(function(response) {
            1 == response.data.success ? self.displayMessage("Profile Inofrmation updated successfully") : self.displayMessage(response.data.result, "error");
        });
    }, self.social.facebookPageUrl = "", self.social.yelpPageUrl = "", self.updateSocialProfile = function() {
        $http.post("updateProfile", self.social).then(function(response) {
            1 == response.data.success ? self.displayMessage("Social Profile updated successfully") : self.displayMessage(response.data.result, "error");
        });
    }, self.credentials.newPasswordAgain = "", self.credentials.newPassword = "", self.credentials.oldPassword = "", 
    self.updatePassword = function() {
        $http.post("changePassword", self.credentials).then(function(response) {
            1 == response.data.success ? self.displayMessage(response.data.result) : self.displayMessage(response.data.result, "error");
        });
    }, self.notification.addedYouAsCompetitorNotify = "", self.notification.reportNotify = "", 
    self.notification.reviewNotify = "", self.updateNotification = function() {
        $http.post("updateProfile", self.notification).then(function(response) {
            1 == response.data.success ? self.displayMessage("Notification(s) updated successfully") : self.displayMessage(response.data.result, "error");
        });
    }, self.displayMessage = function(messageText, type) {
        $("#accountMessageID").show(), self.message = messageText, self.showMessage = !0, 
        null != type && "error" == type ? ($("#accountMessageID").removeClass("alert-success"), 
        $("#accountMessageID").addClass("alert-danger")) : ($("#accountMessageID").addClass("alert-success"), 
        $("#accountMessageID").removeClass("alert-danger"));
    }, self.subscription.paymentinfo = [], self.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(10).withOption("bLengthChange", !1), 
    self.updateForm = function(rep) {
        null != rep.notifyAddedAsCompetitor && (self.notification.addedYouAsCompetitorNotify = rep.notifyAddedAsCompetitor), 
        null != rep.notifyNewReport && (self.notification.reportNotify = rep.notifyNewReport), 
        null != rep.notifyNewReview && (self.notification.reviewNotify = rep.notifyNewReview), 
        null != rep.facebookUrl && (self.social.facebookPageUrl = rep.facebookUrl), null != rep.yelpUrl && (self.social.yelpPageUrl = rep.yelpUrl), 
        null != rep.address.country && (self.account.businessCountry = rep.address.country), 
        null != rep.address.province && (self.account.businessProvince = rep.address.province), 
        null != rep.clientBusinessUrl && (self.account.businessWebsite = rep.clientBusinessUrl), 
        null != rep.username && (self.account.accountUsername = rep.username), null != rep.clientName && (self.account.accountName = rep.clientName), 
        null != rep.clientEmail && (self.account.accountEmail = rep.clientEmail), null != rep.address.streetName && (self.account.businessStreet = rep.address.streetName), 
        null != rep.address.city && (self.account.businessCity = rep.address.city), null != rep.address.postalCode && (self.account.businessPostal = rep.address.postalCode), 
        null != rep.clientBusinessPhoneNumber && (self.account.clientBusinessPhoneNumber = rep.clientBusinessPhoneNumber), 
        null != rep.workingHours && (self.account.workingHours = rep.workingHours), self.subscriptionActive = rep.subscription;
    }, self.getAccountDetail = function() {
        $http.get("getAccountDetail").then(function(response) {
            if (1 == response.data.success) {
                self.subscription.billing = response.data.billing, self.subscription.paymentinfo = [], 
                angular.forEach(response.data.invoice, function(invoice) {
                    self.subscription.paymentinfo.push({
                        number: invoice.number,
                        billingDate: moment(1e3 * invoice.periodEnd).format("ll"),
                        amount: invoice.currency.toUpperCase() + " " + invoice.total / 100
                    });
                });
                var rep = response.data.data;
                self.updateForm(rep);
            } else self.displayMessage(response.data.result, "error");
        });
    }, self.startMembership = function() {
        $http.post("startSubscription").then(function(response) {
            1 == response.data.success ? (self.subscriptionActive = !0, null != response.data.subscription_ends ? self.displayMessage("Congratulations ! Your subscripation has been started with trial period ending on " + moment(1e3 * response.data.subscription_ends).format("LL")) : self.displayMessage(response.data.result)) : self.displayMessage(response.data.result, "error");
        });
    }, self.endMembership = function() {
        $http.post("endSubscription").then(function(response) {
            1 == response.data.success ? (self.subscriptionActive = !1, self.displayMessage(response.data.result)) : self.displayMessage(response.data.result, "error");
        });
    }, self.manageToken = function(token) {
        $http.post("charge", token).then(function(response) {
            1 == response.data.success ? (self.displayMessage(response.data.result), self.getAccountDetail()) : self.displayMessage(response.data.result, "error");
        });
    }, self.loadLocations(), self.getAccountDetail();
} ]);