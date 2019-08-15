angular.module("pixeladmin").filter("justreviewzdate", function() {
    return function(a, b) {
        return moment(a).calendar();
    };
}).controller("LandingCtrl", function($timeout, $http, $q, $state, $scope, $stateParams, $cookies) {
    var self = this, nameTemp = null != $cookies.get("__rwzWL") ? $cookies.get("__rwzWL").split('"') : [ "" ], name = window.atob(1 == nameTemp.length ? nameTemp[0] : nameTemp[1]);
    function retrieveData(query, type) {
        var deferred = $q.defer(), params = {
            type: type,
            query: query,
            businessName: self.searchBusiness,
            locationName: "" == self.searchLocation ? "Canada" : self.searchLocation
        };
        return $http.post("loadResults", params).then(function(data) {
            deferred.resolve({
                data: data.data.result.businesses
            });
        }), deferred.promise;
    }
    self.selectedBusiness = "", self.searchBusiness = "", self.selectedLocation = "", 
    self.searchLocation = name.split(" ")[0], self.businessSearch = function(query, type) {
        return retrieveData(query, type).then(function(data) {
            return self.businessObjects = data.data, console.log(self.businessObjects), data.data;
        });
    }, self.locationSearch = function(query, type) {
        return retrieveData(query, type).then(function(data) {
            return data.data;
        });
    }, self.businessObjects = [], self.showMessage = !1, self.latestReview = [], self.latestQuery = [], 
    self.latestPromotion = [], self.indexId = 0, null != $stateParams.index && null != $stateParams.index && (self.indexId = $stateParams.index), 
    self.selectedProduct = "", self.searchProduct = "", self.productSelected = function(item) {
        console.log("product selected", item), self.goProductReview(item.productId);
    }, self.productSearch = function(product, type) {
        return console.log("item search", product, type), (query = product, deferred = $q.defer(), 
        params = {
            productName: query,
            productDetail: query
        }, $http.post("getProduct", params).then(function(data) {
            deferred.resolve({
                data: data.data.result
            });
        }), deferred.promise).then(function(data) {
            return console.log("ttest", data.data.result), data.data.result;
        });
        var query, deferred, params;
    }, self.blockSelect = function(item) {
        self.searchBusiness = item, $("#custom-template1").focus();
    }, self.businessSelected = function(item) {
        if (null != item) {
            self.showMessage = !0;
            var clientType = "";
            item.categories.forEach(function(item) {
                clientType += item.title + "#";
            });
            var params = {
                username: item.alias,
                password: "",
                clientEmail: "",
                clientName: item.name,
                clientBusinessPhoneNumber: item.phone,
                address: {
                    streetName: item.location.address1,
                    city: item.location.city,
                    postalCode:item.location.zip_code,
                    province:item.location.state,
                    country:item.location.country,
                    },
                clientType: clientType
            };
            $http.post("addUser", params).then(function(data) {
                self.showMessage = !1, null != data.data.clientID && null != data.data.clientID && self.goWriteReview(data.data.clientID);
            });
        }
    }, self.loadLatestEvent = function() {
        $http.get("latestEvents").then(function(data) {
            self.latestReview = data.data.reviews, self.latestQuery = data.data.queries, self.latestPromotion = data.data.promotions;
        });
    }, self.search = function() {}, self.goProductReview = function(productId) {
        $state.go("public.product", {
            productId: productId
        });
    }, self.goWriteReview = function(clientId, type) {
        "product" === type ? $state.go("public.product", {
            productId: clientId
        }) : $state.go("public.main", {
            clientId: clientId
        });
    }, self.loadLatestEvent();
});