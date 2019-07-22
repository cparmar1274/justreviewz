(function() {
    function RegisterBusinessCtrl($http, $scope, $stateParams, $q, $state, $timeout, $cookies) {
        var self = this;
        self.registerTitle = "Register Title";
        self.productMessage = "";
        self.countries = [];
        self.states = [];
        self.user = {};
        self.locationMap = [];
        self.loadLocation = function() {
            retrieveData().then(function(data) {
                angular.forEach(data.data, function(object) {
                    self.locationMap.push(object);
                    if (self.countries.indexOf(object.country) === -1) {
                        self.countries.push(object.country);
                    }
                });
            });
        };
        self.changeCountry = function() {
            self.states = [];
            angular.forEach(self.locationMap, function(object) {
                if (self.states.indexOf(object.province) === -1 && self.user.address.country === object.country) {
                    self.states.push(object.province);
                }
            });
            if (self.states.indexOf(self.user.state) === -1) {
                self.user.province = "";
            }
        };
        
        self.productName = "";
        self.productDetail = "";
        self.productProperties = {};
        self.properties = [];
        self.propertyName = "";
        
        self.clientId = "";
        self.type="product";
        
        self.removeProperty = function(property){
        	console.log(property);
        	self.properties = self.properties.filter(function(a,b,c){
        		return a!=property;
        	});
        }
        
        self.addProperty = function(){
        	self.properties.push(self.propertyName);
        	self.propertyName = "";
        }
        self.createProduct = function(){
        	self.productMessage = "";
        	 var deferred = $q.defer();
        	var productProperties = "{";
        	var index = 0;
        	angular.forEach(self.properties,function(prop){
        		productProperties += "\""+prop+"\":\""+$("#"+index).val()+"\",";
        		index++;
        	});
        	
        	productProperties += "\"\":\"\"}";
        	 var params = {
        			 productName:self.productName,
        			 productDetail:self.productDetail,
        			 productProperties:JSON.parse(productProperties)
        	 };
        	 console.log("params",params);
        	 $http.post("postProduct", params).then(function(data) {
                 var test = deferred.resolve({
                     data: data.data.result.businesses
                 });
                 console.log("TEST",test,data);
                 self.clientId = data.data.result.clientId;
                 self.productMessage = "Product added successfully. "
             });
        }
        
        
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
        self.onboardRequestStatus = true;
        self.submitRequest = function() {
            self.onboardRequestStatus = true;
            $http.post("registerNewBusiness", self.user).then(function(data) {
                self.onboardRequestStatus = false;
                console.log(data);
            });
        };
        self.loadLocation();
    }
    angular.module("pixeladmin").controller("RegisterBusinessCtrl", RegisterBusinessCtrl);
})();