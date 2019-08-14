function addReviewItem(reviewId) {
    angular.element(document.getElementById("searchReviewID")).scope().searchReview.addActionItem(reviewId);
}

function shareItem(reviewId) {
    angular.element(document.getElementById("searchReviewID")).scope().searchReview.shareItem(reviewId);
}

function replyItem(reviewId, reviewContent, postedBy, postedEmail) {
    $("#modal-success").modal("toggle"), $("#reviewBoxContentText").text(unescape(reviewContent)), 
    $("#reviewBoxContentId").text(reviewId), $("#reviewBoxContentPosterName").text(unescape(postedBy)), 
    $("#reviewBoxContentPosterEmail").text(unescape(postedEmail));
}

function sendDiscount(reviewId, reviewContent, postedBy, postedEmail) {
    $("#modalDiscounts").modal("toggle"), $("#posterText").text(unescape(reviewContent)), 
    $("#posterName").text(unescape(postedBy)), $("#posterEmail").text(unescape(postedEmail));
}

function reviewReplies(reviewId) {
    return angular.element(document.getElementById("searchReviewID")).scope().searchReview.loadReplies(reviewId);
}

angular.module("pixeladmin").controller("SearchReviewCtrl", function($http, $scope, $stateParams, $state, $timeout) {
    var self = this;
    self.searchText = "", null != $stateParams.searchText && null != $stateParams.searchText && (self.searchText = $stateParams.searchText), 
    self.searchData = [], self.searchGoodData = [], self.searchBadData = [], self.reviewReplyText = "", 
    self.discountReplyText = "", self.queryAnswer = "", self.queryQuestion = "", self.selectedPageSize = {
        pageSize: 10,
        id: 10
    }, self.availablePageSize = [ {
        pageSize: 10,
        id: 10
    }, {
        pageSize: 25,
        id: 25
    }, {
        pageSize: 50,
        id: 50
    } ], self.activePage = 1, self.lastPage = 1, self.nextPages = [], self.totalResults = 0, 
    self.currentIndex = (this.activePage - 1) * this.selectedPageSize.pageSize, self.previousEnabled = !1, 
    self.nextEnabled = !1, self.searchResultStatus = !1, self.selectedSortType = {
        sortType: "ReviewDate : Latest",
        id: "ReviewDate : Latest"
    }, self.availableSortTypes = [ {
        sortType: "Rating : Lowest",
        id: "Rating : Lowest"
    }, {
        sortType: "Rating : Highest",
        id: "Rating : Highest"
    }, {
        sortType: "ReviewDate : Latest",
        id: "ReviewDate : Latest"
    }, {
        sortType: "ReviewDate : Oldest",
        id: "ReviewDate : Oldest"
    } ], self.pageSizeChange = function() {
        self.currentIndex = 0, self.search();
    }, self.pageSortChange = function() {
        self.search();
    }, self.pageEnabled = function(page) {
        return self.activePage == page;
    }, self.previousPage = function() {
        self.activePage = self.activePage - 1, 0 == self.activePage && (self.activePage = 1), 
        self.changePage(self.activePage);
    }, self.nextPage = function() {
        self.activePage = self.activePage + 1, self.activePage == self.maxPageSize && (self.activePage = self.maxPageSize), 
        self.changePage(self.activePage);
    }, self.changePage = function(changePage) {
        0 == (self.activePage = changePage) || changePage > self.maxPageSize || (self.currentIndex = (changePage - 1) * self.selectedPageSize.pageSize, 
        self.search());
    }, self.searchStart = function() {
        self.currentIndex = 0, self.activePage = 1, self.search();
    }, self.displayMessage = function(messageText, type) {
        $("#searchMessageID").show(), self.message = messageText, self.showMessage = !0, 
        null != type && "error" == type ? ($("#accountMessageID").removeClass("alert-success"), 
        $("#accountMessageID").addClass("alert-danger")) : ($("#accountMessageID").addClass("alert-success"), 
        $("#accountMessageID").removeClass("alert-danger"));
    }, self.pageDisabled = function(page) {
        return self.activePage == page;
    }, self.addActionItem = function(reviewId) {
        console.log(reviewId), $http.post("addActionItem", {
            reviewId: reviewId
        }).then(function(response) {
            var obj = $("#" + reviewId + "_message");
            console.log(obj), obj.html("CREATED" == response.data.result ? '<i class="ion-android-done"></i>&nbsp;&nbsp;Action item added for review.' : '<i class="ion-android-done"></i>&nbsp;&nbsp;' + response.data.result);
        });
    }, self.shareItem = function(reviewId) {
        console.log(reviewId);
    }, self.replyItem = function() {
        "" != self.reviewReplyText && "" != $("#reviewBoxContentId").text() && $http.post("replyReview", {
            reviewText: self.reviewReplyText,
            replyTo: $("#reviewBoxContentId").text()
        }).then(function(response) {
            self.loadReplies(reviewId);
        });
    }, self.loadReplies = function(reviewId) {
        var data = $http.post("loadReplies", {
            reviewId: reviewId
        });
        return data.then(function(response) {
            return response.data.result.result, self.totalReplies += response.data.result.total, 
            response.data.result;
        });
    }, self.queries = [], self.loadQueries = function() {
        $http.post("getAsk", {
            clientId: "cantfindit"
        }).then(function(response) {
            self.queries = [], angular.forEach(response.data.result.result, function(qry) {
                qry.postedDate = moment(qry.postedDate).local().fromNow(), self.queries.push(qry);
            });
        });
    }, self.openQuery = function(query) {
        replyItem(query.queryId, query.question, query.postedBy, query.postedEmail);
    }, self.replyQuery = function() {
        "" != self.queryAnswer && "" != $("#reviewBoxContentId").text() && $http.post("replyAsk", {
            queryId: $("#reviewBoxContentId").text(),
            answer: self.queryAnswer,
            question: $("#reviewBoxContentText").text(),
            postedBy: $("#reviewBoxContentPosterName").text(),
            postedEmail: $("#reviewBoxContentPosterEmail").text()
        }).then(function(response) {
            self.queries = response.data.result.result;
        });
    }, self.sendDiscount = function() {
        "" != self.discountReplyText && $http.post("sendDiscount", {
            subject: "We thank you for your feedback.",
            emailContent: self.discountReplyText,
            clientId: $("#posterText").text(),
            senderName: $("#posterName").text(),
            sendTo: $("#posterEmail").text()
        }).then(function(response) {
            self.queries = response.data.result.result;
        });
    }, self.passObject = function(searchObject) {
        console.log(searchObject);
    }, self.search = function() {
        $http.get("getReviews", {
            params: {
                searchText: self.searchText,
                length: self.selectedPageSize.pageSize,
                start: self.currentIndex,
                sortBy: self.selectedSortType.sortType,
                activePage: self.activePage
            }
        }).then(function(response) {
            1 == response.data.success ? (self.searchData = [], angular.forEach(response.data.data, function(data) {
                self.searchData.push(data);
            }), self.totalResults = response.data.recordsTotal, self.nextPages = response.data.pageSize, 
            self.maxPageSize = response.data.maxPageSize, self.nextPages = response.data.pageSize.split(",").map(function(item) {
                return parseInt(item, 10);
            }), self.previousEnabled = 1 == self.activePage, self.nextEnabled = self.activePage == self.maxPageSize, 
            self.searchResultStatus = !1) : (self.searchResultStatus = !0, $("#searchMessageID").show());
        });
    };
});