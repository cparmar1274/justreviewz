angular.module("pixeladmin").controller("WriteAskCtrl", function($http, $scope, $stateParams, $state, $timeout, $cookies) {
    var self = this;
    self.reviewText = "";
    var nameTemp = null != $cookies.get("__rwzWb") ? $cookies.get("__rwzWb").split('"') : [ "" ], name = window.atob(1 == nameTemp.length ? nameTemp[0] : nameTemp[1]);
    self.firstName = name.split(" ")[0], self.lastName = name.split(" ")[1];
    var email = null != $cookies.get("__rwzWe") ? $cookies.get("__rwzWe").split('"') : [ "" ];
    self.email = window.atob(1 == email.length ? email[0] : email[1]), self.clientName = "", 
    self.reviewList = [], self.averageRating = 0, self.totalReviews = 0, self.totalReplies = 0, 
    self.reviewMessage = "", self.showAnswer = !1, self.clientId = "", null != $stateParams.clientId && null != $stateParams.clientId && 0 < $stateParams.clientId.length && (self.clientId = $stateParams.clientId), 
    self.type = "", null != $stateParams.type && null != $stateParams.type && 0 < $stateParams.type.length && (self.type = $stateParams.type), 
    self.queryId = "", null != $stateParams.queryId && null != $stateParams.queryId && 0 < $stateParams.queryId.length && (self.queryId = $stateParams.queryId, 
    self.showAnswer = !0), self.reviewAnswer = "", null != $stateParams.answer && null != $stateParams.answer && 0 < $stateParams.answer.length && (self.reviewAnswer = $stateParams.answer), 
    null != $stateParams.question && null != $stateParams.question && 0 < $stateParams.question.length && (self.reviewText = $stateParams.question), 
    self.clientName = "", self.clientType = "", self.workingHours = "", self.clientBusinessUrl = "", 
    self.address = "", self.stateAsk = function() {
        $state.go("public.writeAsk");
    }, self.textOptions = [ [ "strikeThrough", "ul", "ol" ], [ "redo", "undo", "clear" ], [ "insertImage", "insertLink" ], [ "wordcount", "charcount" ] ], 
    self.postAsk = function() {
        if (null != self.reviewText && "" != self.reviewText) {
            self.reviewMessage = "Submitting ask...Please wait.";
            var params = {
                question: self.reviewText,
                postedBy: 0 == self.queryId.length ? self.firstName + " " + self.lastName : "",
                postedEmail: 0 == self.queryId.length ? self.email : "",
                type: self.type,
                clientId: self.clientId,
                postedDate: new Date(),
                queryId: self.queryId,
                answer: 0 < self.queryId.length ? self.reviewAnswer : "",
                answeredBy: 0 < self.queryId.length ? self.firstName + " " + self.lastName : "",
                answeredEmail: 0 < self.queryId.length ? self.email : ""
            };
            $http.post("postAsk", params).then(function(response) {
                null != response.data.result && (self.reviewMessage = "Your Query has been submitted successfully to " + self.clientName + "."), 
                self.reviewText = "", self.firstName = "", self.lastName = "", self.email = "", 
                self.reviewAnswer = "";
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