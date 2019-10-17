angular.module("pixeladmin").controller("MyController", function($rootScope, $scope, $http, $location) {
    this.showErrorMessage = 0 < $("#error").text().length, this.showLogoutMessage = 0 < $("#logout").text().length;
}).controller("MainCtrl", function() {
    this.companyName = "Just Reviewz Inc", this.username = "Help", this.error = "", 
    this.engineVersion = "v1.0.6-beta", this.states = [ {
        name: "Alberta",
        id: "AB"
    }, {
        name: "British Columbia",
        id: "BC"
    }, {
        name: "Manitoba",
        id: "MB"
    }, {
        name: "New Brunswick",
        id: "NB"
    }, {
        name: "Newfoundland and Labrador",
        id: "NL"
    }, {
        name: "Nova Scotia",
        id: "NS"
    }, {
        name: "Northwest Territories",
        id: "NT"
    }, {
        name: "Nunavut",
        id: "NU"
    }, {
        name: "Ontario",
        id: "ON"
    }, {
        name: "Prince Edward Island",
        id: "PE"
    }, {
        name: "Quebec",
        id: "QC"
    }, {
        name: "Saskatchewan",
        id: "SK"
    }, {
        name: "Yukon",
        id: "YT"
    } ];
});