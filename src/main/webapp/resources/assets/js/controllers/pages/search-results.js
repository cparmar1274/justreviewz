function addReviewItem(reviewId) {
    angular.element(document.getElementById("searchReviewID")).scope().searchReview.addActionItem(reviewId);
}

function shareItem(reviewId) {
    angular.element(document.getElementById("searchReviewID")).scope().searchReview.shareItem(reviewId);
}

function replyItem(reviewId, reviewContent, postedBy, postedEmail) {
    $("#modal-success").modal("toggle");
    $("#reviewBoxContentText").text(unescape(reviewContent));
    $("#reviewBoxContentId").text(reviewId);
    $("#reviewBoxContentPosterName").text(unescape(postedBy));
    $("#reviewBoxContentPosterEmail").text(unescape(postedEmail));
}

function sendDiscount(reviewId, reviewContent, postedBy, postedEmail) {
    $("#modalDiscounts").modal("toggle");
    $("#posterText").text(unescape(reviewContent));
    $("#posterName").text(unescape(postedBy));
    $("#posterEmail").text(unescape(postedEmail));
}

function reviewReplies(reviewId) {
    return angular.element(document.getElementById("searchReviewID")).scope().searchReview.loadReplies(reviewId);
}

(function() {
    function SearchReviewCtrl($http, $scope, $stateParams, $state, $timeout) {
        var self = this;
        self.searchText = "";
        if ($stateParams.searchText != undefined && $stateParams.searchText != null) self.searchText = $stateParams.searchText;
        self.searchData = [];
        self.searchGoodData = [];
        self.searchBadData = [];
        self.reviewReplyText = "";
        self.discountReplyText = "";
        self.queryAnswer = "";
        self.queryQuestion = "";
        self.selectedPageSize = {
            pageSize: 10,
            id: 10
        };
        self.availablePageSize = [ {
            pageSize: 10,
            id: 10
        }, {
            pageSize: 25,
            id: 25
        }, {
            pageSize: 50,
            id: 50
        } ];
        self.activePage = 1;
        self.lastPage = 1;
        self.nextPages = [];
        self.totalResults = 0;
        self.currentIndex = (this.activePage - 1) * this.selectedPageSize.pageSize;
        self.previousEnabled = false;
        self.nextEnabled = false;
        self.searchResultStatus = false;
        self.selectedSortType = {
            sortType: "ReviewDate : Latest",
            id: "ReviewDate : Latest"
        };
        self.availableSortTypes = [ {
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
        } ];
        self.pageSizeChange = function() {
            self.currentIndex = 0;
            self.search();
        };
        self.pageSortChange = function() {
            self.search();
        };
        self.pageEnabled = function(page) {
            return self.activePage == page;
        };
        self.previousPage = function() {
            self.activePage = self.activePage - 1;
            if (self.activePage == 0) {
                self.activePage = 1;
            }
            self.changePage(self.activePage);
        };
        self.nextPage = function() {
            self.activePage = self.activePage + 1;
            if (self.activePage == self.maxPageSize) {
                self.activePage = self.maxPageSize;
            }
            self.changePage(self.activePage);
        };
        self.changePage = function(changePage) {
            self.activePage = changePage;
            if (changePage == 0 || changePage > self.maxPageSize) return;
            self.currentIndex = (changePage - 1) * self.selectedPageSize.pageSize;
            self.search();
        };
        self.searchStart = function() {
            self.currentIndex = 0;
            self.activePage = 1;
            self.search();
        };
        self.displayMessage = function(messageText, type) {
            $("#searchMessageID").show();
            self.message = messageText;
            self.showMessage = true;
            if (type != undefined && type == "error") {
                $("#accountMessageID").removeClass("alert-success");
                $("#accountMessageID").addClass("alert-danger");
            } else {
                $("#accountMessageID").addClass("alert-success");
                $("#accountMessageID").removeClass("alert-danger");
            }
        };
        self.pageDisabled = function(page) {
            return self.activePage == page;
        };
        self.addActionItem = function(reviewId) {
            console.log(reviewId);
            $http.post("addActionItem", {
                reviewId: reviewId
            }).then(function(response) {
                var obj = $("#" + reviewId + "_message");
                console.log(obj);
                obj.html(response.data.result == "CREATED" ? '<i class="ion-android-done"></i>&nbsp;&nbsp;Action item added for review.' : '<i class="ion-android-done"></i>&nbsp;&nbsp;' + response.data.result);
            });
        };
        self.shareItem = function(reviewId) {
            console.log(reviewId);
        };
        self.replyItem = function() {
            if (self.reviewReplyText == "") return;
            if ($("#reviewBoxContentId").text() == "") return;
            $http.post("replyReview", {
                reviewText: self.reviewReplyText,
                replyTo: $("#reviewBoxContentId").text()
            }).then(function(response) {
                self.loadReplies(reviewId);
            });
        };
        self.loadReplies = function(reviewId) {
            var data = $http.post("loadReplies", {
                reviewId: reviewId
            });
            var loadReplies = [];
            return data.then(function(response) {
                loadReplies = response.data.result.result;
                self.totalReplies += response.data.result.total;
                return response.data.result;
            });
        };
        self.queries = [];
        self.loadQueries = function() {
            $http.post("getAsk", {
                clientId: "cantfindit"
            }).then(function(response) {
                self.queries = [];
                angular.forEach(response.data.result.result, function(qry) {
                    qry.postedDate = moment(qry.postedDate).local().fromNow();
                    self.queries.push(qry);
                });
            });
        };
        self.openQuery = function(query) {
            replyItem(query.queryId, query.question, query.postedBy, query.postedEmail);
        };
        self.replyQuery = function() {
            if (self.queryAnswer == "") return;
            if ($("#reviewBoxContentId").text() == "") return;
            $http.post("replyAsk", {
                queryId: $("#reviewBoxContentId").text(),
                answer: self.queryAnswer,
                question: $("#reviewBoxContentText").text(),
                postedBy: $("#reviewBoxContentPosterName").text(),
                postedEmail: $("#reviewBoxContentPosterEmail").text()
            }).then(function(response) {
                self.queries = response.data.result.result;
            });
        };
        self.sendDiscount = function() {
            if (self.discountReplyText == "") return;
            $http.post("sendDiscount", {
                subject: "We thank you for your feedback.",
                emailContent: self.discountReplyText,
                clientId: $("#posterText").text(),
                senderName: $("#posterName").text(),
                sendTo: $("#posterEmail").text()
            }).then(function(response) {
                self.queries = response.data.result.result;
            });
        };
        self.passObject = function(searchObject) {
            console.log(searchObject);
        };
        self.search = function() {
            $http.get("getReviews", {
                params: {
                    searchText: self.searchText,
                    length: self.selectedPageSize.pageSize,
                    start: self.currentIndex,
                    sortBy: self.selectedSortType.sortType,
                    activePage: self.activePage
                }
            }).then(function(response) {
                if (response.data.success == true) {
                    self.searchData = [];
                    angular.forEach(response.data.data, function(data) {
                        self.searchData.push(data);
                    });
                    self.totalResults = response.data.recordsTotal;
                    self.nextPages = response.data.pageSize;
                    self.maxPageSize = response.data.maxPageSize;
                    self.nextPages = response.data.pageSize.split(",").map(function(item) {
                        return parseInt(item, 10);
                    });
                    self.previousEnabled = self.activePage == 1;
                    self.nextEnabled = self.activePage == self.maxPageSize;
                    self.searchResultStatus = false;
                } else {
                    self.searchResultStatus = true;
                    $("#searchMessageID").show();
                }
            });
        };
    }
    angular.module("pixeladmin").controller("SearchReviewCtrl", SearchReviewCtrl);
})();