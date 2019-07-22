(function() {
    function ProductReviewCtrl($http, $scope, $stateParams, $state, $timeout) {
        var self = this;
        self.productName = "";
        self.productId = "";
        if ($stateParams.productId != undefined && $stateParams.productId != null) 
        	self.productId = $stateParams.productId;
        self.product = {};
        self.subscribeStatus = true;
        self.sortingOptions = [ "Latest Reviews First", "Oldest Reviews First", "Highest Rating First", "Lowest Rating First" ];
        
        self.loadProduct = function(){
        	var params = {productId:self.productId,"productPage":"true"};
        	$http.post("getProduct", params).then(function(data) {
        		var product = data.data.result;
        		 if(product.productId==self.productId)
            	 { self.product = product;
            	   self.productName = product.productName;
            	 }
                    console.log("Product",self.product);
            });
        }
        
        self.load = function() {
            $http.post("loadReview", {
                clientId: self.productId,
                sortingOrder: self.sortingOrder
            }).then(function(response) {
                self.reviewList = response.data.result.result;
                self.totalReviews = self.reviewList.length;
                self.totalReplies = 0;
                self.averageRating = response.data.result.averageRating;
            });
        };
        
        self.subscribe = function() {
            self.subscribeStatus = true;
            $http.post("subscribe", {
                email: self.subscribeEmail,
                clientId: self.product.productId,
                clientName: self.product.productName,
                address:self.product.productDetail
            }).then(function(response) {
                self.subscribeStatus = false;
            });
        };
        
        self.loadQueries = function() {
            $http.post("getAsk", {
                clientId: self.productId
            }).then(function(response) {
                self.queries = [];
                angular.forEach(response.data.result.result, function(qry) {
                    qry.postedDate = moment(qry.postedDate).local().fromNow();
                    self.queries.push(qry);
                });
                self.totalQueries = self.queries.length;
            });
        };
      
        self.loadMoreReviews = function(){ self.load();}
        self.loadMoreQueries = function() {  self.loadQueries();}
        
        self.stateReview = function() {
            $state.go("public.writeReview", {
                clientId: self.productId,
                type:'product'
            });
        };
        self.stateAsk = function() {
            $state.go("public.writeAsk", {
                clientId: self.productId,
                type:'product'
            });
        };
        self.load();
        self.loadQueries();
        self.loadProduct();
        }
    angular.module("pixeladmin").controller("ProductReviewCtrl", ProductReviewCtrl);
})();