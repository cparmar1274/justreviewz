(function() {
    function AccountCtrl($http, DTOptionsBuilder, $q) {
        var self = this;
        self.message = "";
        self.showMessage = false;
        self.account = {};
        self.social = {};
        self.credentials = {};
        self.notification = {};
        self.subscription = {};
        self.subscriptionActive = false;
        self.account.accountName = "";
        self.account.accountEmail = "";
        self.account.businessStreet = "";
        self.account.businessCity = "";
        self.account.businessPostal = "";
        self.account.workingHours = {};
        self.account.workingHours.monday = "";
        self.account.workingHours.tuesday = "";
        self.account.workingHours.wednesday = "";
        self.account.workingHours.thursday = "";
        self.account.workingHours.friday = "";
        self.account.workingHours.saturday = "";
        self.account.workingHours.sunday = "";
        self.account.clientBusinessPhoneNumber = "";
        self.account.businessProvince = "";
        self.account.accountUsername = "";
        self.account.businessCountryList = [];
        self.account.businessProvinceList = [];
        self.locationMap = [];
        self.loadLocations = function() {
            retrieveData().then(function(data) {
                self.locationMap = [];
                angular.forEach(data.data, function(object) {
                    self.locationMap.push(object);
                    if (self.account.businessCountryList.indexOf(object.country) === -1) {
                        self.account.businessCountryList.push(object.country);
                    }
                });
            });
        };
        self.selectCountry = function() {
            self.account.businessProvinceList = [];
            angular.forEach(self.locationMap, function(object) {
                if (self.account.businessProvinceList.indexOf(object.province) === -1 && self.account.businessCountry === object.country) {
                    self.account.businessProvinceList.push(object.province);
                }
            });
        };
        self.account.businessCountry = "Canada";
        self.account.businessWebsite = "";
        self.updateProfile = function() {
            $http.post("updateProfile", self.account).then(function(response) {
                if (response.data.success == true) self.displayMessage("Profile Inofrmation updated successfully"); else self.displayMessage(response.data.result, "error");
            });
        };
        self.social.facebookPageUrl = "";
        self.social.yelpPageUrl = "";
        self.updateSocialProfile = function() {
            $http.post("updateProfile", self.social).then(function(response) {
                if (response.data.success == true) self.displayMessage("Social Profile updated successfully"); else self.displayMessage(response.data.result, "error");
            });
        };
        self.credentials.newPasswordAgain = "";
        self.credentials.newPassword = "";
        self.credentials.oldPassword = "";
        self.updatePassword = function() {
            $http.post("changePassword", self.credentials).then(function(response) {
                if (response.data.success == true) self.displayMessage(response.data.result); else self.displayMessage(response.data.result, "error");
            });
        };
        self.notification.addedYouAsCompetitorNotify = "";
        self.notification.reportNotify = "";
        self.notification.reviewNotify = "";
        self.updateNotification = function() {
            $http.post("updateProfile", self.notification).then(function(response) {
                if (response.data.success == true) self.displayMessage("Notification(s) updated successfully"); else self.displayMessage(response.data.result, "error");
            });
        };
        self.displayMessage = function(messageText, type) {
            $("#accountMessageID").show();
            self.message = messageText;
            self.showMessage = true;
            if (type != undefined && type == "error") {
                $("#accountMessageID").removeClass("alert-success");
                $("#accountMessageID").addClass("alert-danger");
            } else {
                $("#accountMessageID").addClass("alert-success");
                $("#accountMessageID").removeClass("alert-danger");
            }
        };
        self.subscription.paymentinfo = [];
        self.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(10).withOption("bLengthChange", false);
        self.updateForm = function(rep) {
            if (rep.notifyAddedAsCompetitor != undefined) self.notification.addedYouAsCompetitorNotify = rep.notifyAddedAsCompetitor;
            if (rep.notifyNewReport != undefined) self.notification.reportNotify = rep.notifyNewReport;
            if (rep.notifyNewReview != undefined) self.notification.reviewNotify = rep.notifyNewReview;
            if (rep.facebookUrl != undefined) self.social.facebookPageUrl = rep.facebookUrl;
            if (rep.yelpUrl != undefined) self.social.yelpPageUrl = rep.yelpUrl;
            if (rep.address.country != undefined) self.account.businessCountry = rep.address.country;
            if (rep.address.province != undefined) self.account.businessProvince = rep.address.province;
            if (rep.clientBusinessUrl != undefined) self.account.businessWebsite = rep.clientBusinessUrl;
            if (rep.username != undefined) self.account.accountUsername = rep.username;
            if (rep.clientName != undefined) self.account.accountName = rep.clientName;
            if (rep.clientEmail != undefined) self.account.accountEmail = rep.clientEmail;
            if (rep.address.streetName != undefined) self.account.businessStreet = rep.address.streetName;
            if (rep.address.city != undefined) self.account.businessCity = rep.address.city;
            if (rep.address.postalCode != undefined) self.account.businessPostal = rep.address.postalCode;
            if (rep.clientBusinessPhoneNumber != undefined) self.account.clientBusinessPhoneNumber = rep.clientBusinessPhoneNumber;
            if (rep.workingHours != undefined) {
                self.account.workingHours = rep.workingHours;
            }
            self.subscriptionActive = rep.subscription;
        };
        self.getAccountDetail = function() {
            $http.get("getAccountDetail").then(function(response) {
                if (response.data.success == true) {
                    self.subscription.billing = response.data.billing;
                    self.subscription.paymentinfo = [];
                    angular.forEach(response.data.invoice, function(invoice) {
                        self.subscription.paymentinfo.push({
                            number: invoice.number,
                            billingDate: moment(invoice.periodEnd * 1e3).format("ll"),
                            amount: invoice.currency.toUpperCase() + " " + invoice.total / 100
                        });
                    });
                    var rep = response.data.data;
                    self.updateForm(rep);
                } else {
                    self.displayMessage(response.data.result, "error");
                }
            });
        };
        self.startMembership = function() {
            $http.post("startSubscription").then(function(response) {
                if (response.data.success == true) {
                    self.subscriptionActive = true;
                    if (response.data.subscription_ends != undefined) {
                        self.displayMessage("Congratulations ! Your subscripation has been started with trial period ending on " + moment(response.data.subscription_ends * 1e3).format("LL"));
                    } else {
                        self.displayMessage(response.data.result);
                    }
                } else self.displayMessage(response.data.result, "error");
            });
        };
        self.endMembership = function() {
            $http.post("endSubscription").then(function(response) {
                if (response.data.success == true) {
                    self.subscriptionActive = false;
                    self.displayMessage(response.data.result);
                } else self.displayMessage(response.data.result, "error");
            });
        };
        self.manageToken = function(token) {
            $http.post("charge", token).then(function(response) {
                if (response.data.success == true) {
                    self.displayMessage(response.data.result);
                    self.getAccountDetail();
                } else {
                    self.displayMessage(response.data.result, "error");
                }
            });
        };
        function retrieveData() {
            var deferred = $q.defer();
            var data = [];
            var params = {
                type: "LOCATION",
                query: "GJ6BPALL1274",
                businessName: "",
                locationName: ""
            };
            $http.post("loadResults", params).then(function(data) {
                deferred.resolve({
                    data: data.data.result.businesses
                });
            });
            return deferred.promise;
        }
        self.loadLocations();
        self.getAccountDetail();
    }
    angular.module("pixeladmin").controller("AccountCtrl", [ "$http", "DTOptionsBuilder", "$q", AccountCtrl ]);
})();