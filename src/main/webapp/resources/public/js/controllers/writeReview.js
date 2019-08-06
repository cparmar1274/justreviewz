(function() {
    function WriteReviewCtrl($http, $scope, $stateParams, $state, $timeout, $cookies) {
        var self = this;
        self.reviewText = "";
        var nameTemp = $cookies.get("__rwzWb") != undefined ? $cookies.get("__rwzWb").split('"') : [ "" ];
        var name = window.atob(nameTemp.length == 1 ? nameTemp[0] : nameTemp[1]);
        self.firstName = name.split(" ")[0];
        self.lastName = name.split(" ")[1];
        var email = $cookies.get("__rwzWe") != undefined ? $cookies.get("__rwzWe").split('"') : [ "" ];
        self.email = window.atob(email.length == 1 ? email[0] : email[1]);
        self.clientName = "";
        self.reviewList = [];
        self.averageRating = 0;
        self.totalReviews = 0;
        self.totalReplies = 0;
        self.reviewMessage = "";
        self.clientId = "";
        if ($stateParams.clientId != undefined && $stateParams.clientId != null) self.clientId = $stateParams.clientId;
        
        self.type = "";
        if ($stateParams.type != undefined && $stateParams.type != null) self.type = $stateParams.type;
        
        self.clientName = "";
        self.clientType = "";
        self.workingHours = "";
        self.clientBusinessUrl = "";
        self.address = "";
        $scope.max = 5;
        $scope.ratingVal = 3;
        $scope.readonly = false;
        $scope.onHover = function(val) {
            $scope.hoverVal = val;
        };
        $scope.onLeave = function() {
            $scope.hoverVal = null;
        };
        $scope.onChange = function(val) {
            $scope.ratingVal = val;
        };
        self.stateReview = function() {
            $state.go("public.writeReview");
        };
        self.postReview = function() {
        	
        	
            if (self.reviewText == null || self.reviewText == "") {
                return;
            }
            self.reviewMessage = "Submitting review...Please wait.";
            var params = {
                reviewText: self.reviewText,
                type:self.type,
                postedBy: self.firstName + " " + self.lastName,
                postedDetail: self.firstName + " " + self.lastName,
                postedEmail: self.email,
                reviewRating: $scope.ratingVal,
                clientId: self.clientId,
                reviewDate: new Date()
            };
            $http.post("postReview", params).then(function(response) {
                if (response.data.result.success == true) self.reviewMessage = "Your review has been posted successfully.";
                self.reviewText = "";
                self.firstName = "";
                self.lastName = "";
                self.email = "";
            })
        };
        self.loadClientDetail = function() {
        	$http.post("getClient", {
                clientId: self.clientId,
                type:self.type
            }).then(function(response) {
                self.clientName = response.data.clientName;
            });
        };
        self.loadClientDetail();
    }
    angular.module("pixeladmin").controller("WriteReviewCtrl", WriteReviewCtrl);
})();