angular.module("pixeladmin").controller("WriteReviewCtrl", function($http, $scope, $stateParams, $state, $timeout, $cookies) {
    var self = this;
    self.reviewText = "";
    var nameTemp = null != $cookies.get("__rwzWb") ? $cookies.get("__rwzWb").split('"') : [ "" ], name = window.atob(1 == nameTemp.length ? nameTemp[0] : nameTemp[1]);
    self.firstName = name.split(" ")[0], self.lastName = name.split(" ")[1];
    var email = null != $cookies.get("__rwzWe") ? $cookies.get("__rwzWe").split('"') : [ "" ];
    self.email = window.atob(1 == email.length ? email[0] : email[1]), self.clientName = "", 
    self.reviewList = [], self.averageRating = 0, self.totalReviews = 0, self.totalReplies = 0, 
    self.reviewMessage = "", self.clientId = "", null != $stateParams.clientId && null != $stateParams.clientId && (self.clientId = $stateParams.clientId), 
    self.type = "", null != $stateParams.type && null != $stateParams.type && (self.type = $stateParams.type), 
    self.clientName = "", self.clientType = "", self.workingHours = "", self.clientBusinessUrl = "", 
    self.address = "", $scope.max = 5, $scope.ratingVal = 3, $scope.readonly = !1, $scope.onHover = function(val) {
        $scope.hoverVal = val;
    }, $scope.onLeave = function() {
        $scope.hoverVal = null;
    }, $scope.onChange = function(val) {
        $scope.ratingVal = val;
    }, self.stateReview = function() {
        $state.go("public.writeReview");
    }, self.postReview = function() {
        if (null != self.reviewText && "" != self.reviewText) {
            self.reviewMessage = "Submitting review...Please wait.";
            var params = {
                reviewText: self.reviewText,
                type: self.type,
                postedBy: self.firstName + " " + self.lastName,
                postedDetail: self.firstName + " " + self.lastName,
                postedEmail: self.email,
                reviewRating: $scope.ratingVal,
                clientId: self.clientId,
                reviewDate: new Date()
            };
            $http.post("postReview", params).then(function(response) {
                1 == response.data.result.success && (self.reviewMessage = "Your review has been posted successfully."), 
                self.reviewText = "", self.firstName = "", self.lastName = "", self.email = "";
            });
        }
    }, self.loadClientDetail = function() {
        $http.post("getClient", {
            clientId: self.clientId,
            type: self.type
        }).then(function(response) {
            self.clientName = response.data.clientName;
        });
    }, self.loadClientDetail();
});