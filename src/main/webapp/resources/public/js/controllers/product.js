angular.module("pixeladmin").filter("justreviewzdate", function() {
    return function(a, b) {
        return moment(a).fromNow();
    };
}).controller("ProductReviewCtrl", function($http, $scope, $stateParams, $state, $timeout) {
    var self = this;
    self.productName = "", self.productId = "", null != $stateParams.productId && null != $stateParams.productId && (self.productId = $stateParams.productId), 
    self.product = {}, self.subscribeStatus = !0, self.sortingOptions = [ "Latest Reviews First", "Oldest Reviews First", "Highest Rating First", "Lowest Rating First" ], 
    self.searchReviewText = "", self.loadProduct = function() {
        var params = {
            productId: self.productId,
            productPage: "true"
        };
        $http.post("getProduct", params).then(function(data) {
            var product = data.data.result;
            product.productId == self.productId && (self.product = product, self.productName = product.productName), 
            console.log("Product", self.product);
        });
    }, self.load = function() {
        $http.post("loadReview", {
            clientId: self.productId,
            sortingOrder: self.sortingOrder
        }).then(function(response) {
            self.reviewList = response.data.result.result, self.totalReviews = self.reviewList.length, 
            self.totalReplies = 0, self.averageRating = response.data.result.averageRating;
        });
    }, self.subscribe = function() {
        self.subscribeStatus = !0, $http.post("subscribe", {
            email: self.subscribeEmail,
            clientId: self.product.productId,
            clientName: self.product.productName,
            address: self.product.productDetail
        }).then(function(response) {
            self.subscribeStatus = !1;
        });
    }, self.loadQueries = function() {
        $http.post("getAsk", {
            clientId: self.productId
        }).then(function(response) {
            self.queries = [], angular.forEach(response.data.result.result, function(qry) {
                qry.postedDate = moment(qry.postedDate).local().fromNow(), self.queries.push(qry);
            }), self.totalQueries = self.queries.length;
        });
    }, self.loadMoreReviews = function() {
        self.load();
    }, self.loadMoreQueries = function() {
        self.loadQueries();
    }, self.stateReview = function() {
        $state.go("public.writeReview", {
            clientId: self.productId,
            type: "product"
        });
    }, self.stateAskBlank = function() {
        $state.go("public.writeAsk", {
            clientId: self.productId,
            answer: null,
            queryId: null,
            question: null,
            type: "product"
        });
    }, self.searchReview = function() {
        var filtered = 0, total = 0;
        $(".widget-tree-comments-item").filter(function(a, b, c) {
            total++, 0 == self.searchReviewText.trim().length || 0 < b.innerText.toLowerCase().indexOf(self.searchReviewText.toLowerCase()) ? ($(b).show(), 
            filtered++) : $(b).hide();
        }), self.searchReviewMessage = " Showing " + filtered + " reviews ( filtered out of " + total + " reviews)";
    }, self.stateAsk = function(query) {
        $state.go("public.writeAsk", {
            clientId: self.productId,
            answer: query.answer,
            queryId: query.queryId,
            question: query.question,
            type: "product"
        });
    }, self.load(), self.loadQueries(), self.loadProduct();
});