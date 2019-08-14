angular.module("pixeladmin").controller("PublicReviewCtrl", function($http, $scope, $stateParams, $state, $timeout) {
    var self = this;
    self.reviewText = "", self.reviewList = [], self.averageRating = 0, self.totalReviews = 0, 
    self.totalReplies = 0, self.totalQueries = 0, self.reviewMessage = "", self.sortingOrder = "", 
    self.sortingOptions = [ "Latest Reviews First", "Oldest Reviews First", "Highest Rating First", "Lowest Rating First" ], 
    self.clientId = "", null != $stateParams.clientId && null != $stateParams.clientId && (self.clientId = $stateParams.clientId), 
    self.clientName = "", self.clientType = [], self.workingHours = "", self.clientBusinessUrl = "", 
    self.address = "", self.clientBusinessPhoneNumber = [], self.queries = [], self.promotions = [], 
    self.totalPromotions = 0, self.searchReviewText = "", self.searchReviewMessage = "", 
    self.subscribeStatus = !0, self.subscribeEmail = "", self.openToday = !1, self.subscribe = function() {
        self.subscribeStatus = !0, $http.post("subscribe", {
            email: self.subscribeEmail,
            clientId: self.clientId,
            clientName: self.clientName,
            address: self.address
        }).then(function(response) {
            self.subscribeStatus = !1;
        });
    }, self.searchReview = function() {
        var filtered = 0, total = 0;
        $(".widget-tree-comments-item").filter(function(a, b, c) {
            total++, 0 == self.searchReviewText.trim().length || 0 < b.innerText.toLowerCase().indexOf(self.searchReviewText.toLowerCase()) ? ($(b).show(), 
            filtered++) : $(b).hide();
        }), self.searchReviewMessage = " Showing " + filtered + " reviews ( filtered out of " + total + " reviews)";
    }, self.stateReview = function() {
        $state.go("public.writeReview", {
            clientId: self.clientId,
            type: "local"
        });
    }, self.stateAskBlank = function() {
        $state.go("public.writeAsk", {
            clientId: self.clientId,
            answer: null,
            queryId: null,
            question: null,
            type: "local"
        });
    }, self.stateAsk = function(query) {
        $state.go("public.writeAsk", {
            clientId: self.clientId,
            answer: query.answer,
            queryId: query.queryId,
            question: query.question,
            type: "local"
        });
    }, self.textOptions = [ [ "strikeThrough", "ul", "ol" ], [ "redo", "undo", "clear" ], [ "insertImage", "insertLink" ], [ "wordcount", "charcount" ] ], 
    self.postReview = function() {
        if (null != self.reviewText && "" != self.reviewText) {
            self.reviewMessage = "Submitting review...Please wait.";
            var params = {
                reviewText: self.reviewText,
                reviewRating: $scope.ratingVal,
                clientId: self.clientId
            };
            $http.post("postReview", params).then(function(response) {
                1 == response.data.result.success && (self.reviewMessage = "Your review has been posted successfully."), 
                self.loadMore();
            });
        }
    }, self.replyComment = function(reviewText, reviewId) {
        console.log(reviewText, reviewId), $http.post("replyReview", {
            reviewText: reviewText,
            replyTo: reviewId
        }).then(function(response) {
            console.log(response.data.result.result);
        });
    }, self.likeComment = function(reviewId) {
        $http.post("likeComment", {
            reviewId: reviewId,
            reviewFlag: "0"
        }).then(function(response) {
            console.log(response.data.result.result);
        });
    }, self.dislikeComment = function(reviewId) {
        $http.post("dislikeComment", {
            reviewId: reviewId,
            reviewFlag: "0"
        }).then(function(response) {
            console.log(response.data.result.result);
        });
    }, self.loadReplies = function(reviewId) {
        var data = $http.post("loadReplies", {
            reviewId: reviewId
        });
        return data.then(function(response) {
            return response.data.result.result, self.totalReplies += response.data.result.total, 
            response.data.result;
        });
    }, self.loadReviews = function() {
        self.load();
    }, self.load = function() {
        $http.post("loadReview", {
            clientId: self.clientId,
            sortingOrder: self.sortingOrder
        }).then(function(response) {
            self.reviewList = response.data.result.result, self.totalReviews = self.reviewList.length, 
            self.totalReplies = 0, self.averageRating = response.data.result.averageRating;
        });
    }, self.loadClientDetail = function() {
        $http.post("getClient", {
            clientId: self.clientId
        }).then(function(response) {
            self.clientName = response.data.clientName, self.clientType = response.data.clientType.split("#"), 
            self.clientBusinessUrl = response.data.clientBusinessUrl, self.address = response.data.address, 
            self.clientBusinessPhoneNumber = response.data.clientBusinessPhoneNumber.split(","), 
            self.clientBusinessWebsite = response.data.clientBusinessWebsite, self.clientBusinessFacebook = response.data.clientBusinessFacebook, 
            self.workingHours = response.data.workingHours, mapboxgl.accessToken = response.data.token, 
            mapboxSdk({
                accessToken: mapboxgl.accessToken
            }).geocoding.forwardGeocode({
                query: self.address,
                autocomplete: !1,
                limit: 1
            }).send().then(function(response) {
                if (response && response.body && response.body.features && response.body.features.length) {
                    var feature = response.body.features[0], popup = new mapboxgl.Popup({
                        offset: 25
                    }).setText(self.clientName), map = new mapboxgl.Map({
                        container: "map",
                        style: "mapbox://styles/mapbox/streets-v9",
                        center: feature.center,
                        zoom: 15
                    });
                    map.addControl(new mapboxgl.NavigationControl()), new mapboxgl.Marker().setLngLat(feature.center).setPopup(popup).addTo(map);
                }
            });
            var currentTime = moment(), dayname = moment().format("dddd").toLowerCase(), shopOpen = moment(self.workingHours[dayname].split("-")[0].trim(), "HH:mm"), shopClose = moment(self.workingHours[dayname].split("-")[1].trim(), "HH:mm");
            self.openToday = currentTime.isBetween(shopOpen, shopClose);
        });
    }, self.loadMore = function() {
        self.reviewList = [], self.load();
    }, self.loadQueries = function() {
        $http.post("getAsk", {
            clientId: self.clientId
        }).then(function(response) {
            self.queries = [], angular.forEach(response.data.result.result, function(qry) {
                qry.postedDate = moment(qry.postedDate).local().fromNow(), self.queries.push(qry);
            }), self.totalQueries = self.queries.length;
        });
    }, self.loadPromotions = function() {
        self.promotions = [], $http.post("getPromotion", {
            clientId: self.clientId
        }).then(function(response) {
            self.promotions = response.data.result.result, self.totalPromotions = self.promotions.length;
        });
    }, self.requestPromotionMessage = !1, self.requestForPromotion = function() {
        self.requestPromotionMessage = !1, $http.post("requestPromotion", {
            clientId: self.clientId
        }).then(function(response) {
            console.log(response), self.requestPromotionMessage = !0;
        });
    }, self.loadClientDetail(), self.load(), self.loadQueries(), self.loadPromotions();
});