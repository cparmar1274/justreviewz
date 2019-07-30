(function() {
    function LandingCtrl($timeout, $http, $q, $state, $scope, $stateParams, $cookies) {
        var self = this;
        var nameTemp = $cookies.get("__rwzWL") != undefined ? $cookies.get("__rwzWL").split('"') : [ "" ];
        var name = window.atob(nameTemp.length == 1 ? nameTemp[0] : nameTemp[1]);
        self.selectedBusiness = "";
        self.searchBusiness = "";
        self.selectedLocation = "";
        self.searchLocation = name.split(" ")[0];
        self.businessSearch = loadBusiness;
        self.locationSearch = loadLocation;
        self.businessObjects = [];
        self.showMessage = false;
        self.latestReview = [];
        self.latestQuery = [];
        self.latestPromotion = [];
        
        self.indexId = 0;
        if ($stateParams.index != undefined && $stateParams.index != null) self.indexId = $stateParams.index;
        
        
        
        self.selectedProduct = "";
		self.searchProduct="";
		self.productSelected = function(item) {
			console.log("product selected",item);
			 self.goProductReview(item.productId);
		};
		
		self.productSearch = function(product,type) {
			console.log("item search",product,type);
			return retrieveProductData(product,type).then(function(data) {
				console.log("ttest",data.data.result);
                return data.data.result;
            });
		};
        
        
        self.blockSelect = function(item) {
            self.searchBusiness = item;
            $("#custom-template1").focus();
        };
        self.businessSelected = function(item) {
            if (item != undefined ) {
                self.showMessage = true;
                var clientType = "";
                item.categories.forEach(function(item) {
                    clientType += item.title + "#";
                });
                var params = {
                    username: item.clientName,
                    password: "",
                    clientEmail: "",
                    clientName: item.clientName,
                    clientBusinessPhoneNumber: item.clientBusinessPhoneNumber,
                    address: address,
                    clientType: clientType
                };
                $http.post("addUser", params).then(function(data) {
                    self.showMessage = false;
                    if (data.data.clientID != undefined && data.data.clientID != null) self.goWriteReview(data.data.clientID);
                });
            }
        };
        self.loadLatestEvent = function() {
            $http.get("latestEvents").then(function(data) {
                self.latestReview = data.data.reviews;
                self.latestQuery = data.data.queries;
                self.latestPromotion = data.data.promotions;
            });
            
        };
        function loadBusiness(query, type) {
            return retrieveData(query, type).then(function(data) {
                self.businessObjects = data.data;
                console.log(self.businessObjects);
                return data.data;
            });
        }
        function loadLocation(query, type) {
            return retrieveData(query, type).then(function(data) {
                return data.data;
            });
        }
        function retrieveData(query, type) {
            var deferred = $q.defer();
            var data = [];
            var params = {
                type: type,
                query: query,
                businessName: self.searchBusiness,
                locationName: self.searchLocation == "" ? "Canada" : self.searchLocation
            };
            $http.post("loadResults", params).then(function(data) {
                deferred.resolve({
                    data: data.data.result.businesses
                });
            });
            return deferred.promise;
        }
        
        function retrieveProductData(query, type) {
            var deferred = $q.defer();
            var data = [];
            var params = {
                productName:query,
                productDetail:query
            };
            $http.post("getProduct", params).then(function(data) {
                deferred.resolve({
                    data: data.data.result
                });
            });
            return deferred.promise;
        }
        
        self.search = function() {};
        
        self.goProductReview = function(productId) {
            $state.go("public.product", {
                productId: productId
            });
        };
        
        self.goWriteReview = function(clientId,type) {
        	if(type==='product'){
        		$state.go("public.product", {
                    productId: clientId
                });
        	}
        	else{
        		$state.go("public.main", {
                    clientId: clientId
                });	
        	}
            
        };
        self.loadLatestEvent();
    }
    angular.module("pixeladmin").filter('justreviewzdate', function() {
    	  return function(a,b) {
    		    return moment(a).calendar();
    		  };
    		}).controller("LandingCtrl", LandingCtrl);
})();