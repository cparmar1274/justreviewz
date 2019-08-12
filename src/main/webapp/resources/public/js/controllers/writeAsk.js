(function() {
    function WriteAskCtrl($http, $scope, $stateParams, $state, $timeout, $cookies) {
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
        self.showAnswer = false;
       
        self.clientId = "";
        if ($stateParams.clientId != undefined && $stateParams.clientId != null && $stateParams.clientId.length > 0) self.clientId = $stateParams.clientId;
        
        self.type = "";
        if ($stateParams.type != undefined && $stateParams.type != null && $stateParams.type.length > 0) self.type = $stateParams.type;
    
        self.queryId = "";
        if ($stateParams.queryId != undefined && $stateParams.queryId != null && $stateParams.queryId.length > 0) {
        	self.queryId = $stateParams.queryId;
        	self.showAnswer = true;
        }

        self.reviewAnswer = "";
        if ($stateParams.answer != undefined && $stateParams.answer != null && $stateParams.answer.length > 0) self.reviewAnswer = $stateParams.answer;
        if ($stateParams.question != undefined && $stateParams.question != null && $stateParams.question.length > 0) self.reviewText = $stateParams.question;

        self.clientName = "";
        self.clientType = "";
        self.workingHours = "";
        self.clientBusinessUrl = "";
        self.address = "";
        
        self.stateAsk = function() {
            $state.go("public.writeAsk");
        };
        
        
        self.textOptions = [ [ "strikeThrough", "ul", "ol" ], [ "redo", "undo", "clear" ], [ "insertImage", "insertLink" ], [ "wordcount", "charcount" ] ];
        self.postAsk = function() {
        	
            if (self.reviewText == null || self.reviewText == "") {
                return;
            }
            self.reviewMessage = "Submitting ask...Please wait.";
            var params = {
                question: self.reviewText,
                postedBy: self.queryId.length == 0 ? (self.firstName + " " + self.lastName) : "",
                postedEmail: self.queryId.length == 0 ? self.email : "",
                type:self.type,
                clientId: self.clientId,
                postedDate: new Date(),
                queryId: self.queryId,
                answer:self.queryId.length>0 ? self.reviewAnswer : "",
                answeredBy: self.queryId.length>0 ? (self.firstName + " "+ self.lastName) : "",
                answeredEmail: self.queryId.length>0 ? self.email : "",
            };
            $http.post("postAsk", params).then(function(response) {
                if (response.data.result != null) self.reviewMessage = "Your Query has been submitted successfully to " + self.clientName + ".";
                self.reviewText = "";
                self.firstName = "";
                self.lastName = "";
                self.email = "";
                self.reviewAnswer = "";
            });
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
    angular.module("pixeladmin").controller("WriteAskCtrl", WriteAskCtrl);
})();