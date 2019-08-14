angular.module("pixeladmin").controller("RegisterBusinessCtrl", function($http, $scope, $stateParams, $q, $state, $timeout, $cookies) {
    var self = this;
    self.registerTitle = "Register Title", self.productMessage = "", self.countries = [], 
    self.states = [], self.user = {}, self.locationMap = [], self.loadLocation = function() {
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
            angular.forEach(data.data, function(object) {
                self.locationMap.push(object), -1 === self.countries.indexOf(object.country) && self.countries.push(object.country);
            });
        });
    }, self.changeCountry = function() {
        self.states = [], angular.forEach(self.locationMap, function(object) {
            -1 === self.states.indexOf(object.province) && self.user.address.country === object.country && self.states.push(object.province);
        }), -1 === self.states.indexOf(self.user.state) && (self.user.province = "");
    }, self.productName = "", self.productDetail = "", self.productProperties = {}, 
    self.properties = [], self.propertyName = "", self.clientId = "", self.type = "product", 
    self.removeProperty = function(property) {
        console.log(property), self.properties = self.properties.filter(function(a, b, c) {
            return a != property;
        });
    }, self.addProperty = function() {
        self.properties.push(self.propertyName), self.propertyName = "";
    }, self.createProduct = function() {
        self.productMessage = "";
        var deferred = $q.defer(), productProperties = "{", index = 0;
        angular.forEach(self.properties, function(prop) {
            productProperties += '"' + prop + '":"' + $("#" + index).val() + '",', index++;
        }), productProperties += '"":""}';
        var params = {
            productName: self.productName,
            productDetail: self.productDetail,
            productProperties: JSON.parse(productProperties)
        };
        console.log("params", params), $http.post("postProduct", params).then(function(data) {
            var test = deferred.resolve({
                data: data.data.result.businesses
            });
            console.log("TEST", test, data), self.clientId = data.data.result.clientId, self.productMessage = "Product added successfully. ";
        });
    }, self.onboardRequestStatus = !0, self.submitRequest = function() {
        self.onboardRequestStatus = !0, $http.post("registerNewBusiness", self.user).then(function(data) {
            self.onboardRequestStatus = !1, console.log(data);
        });
    }, self.loadLocation();
});