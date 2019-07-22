(function() {
    function pageTitleDirective($rootScope) {
        return {
            link: function(_scope_, $element) {
                function listener(event, toState, toParams, fromState, fromParams) {
                    var title = (toState.data && toState.data.pageTitle ? toState.data.pageTitle + " - " : "") + "PixelAdmin: Responsive Bootstrap Template";
                    $element.text(title);
                }
                $rootScope.$on("$stateChangeStart", listener);
            }
        };
    }
    function addStars() {
        return {
            scope: {
                rating: "@"
            },
            link: function(_scope_, $element, $attrs) {
                _scope_.$watch("rating", function(newValue, oldValue) {
                    $element.html(getRating(newValue, $attrs.reviewtype));
                });
            }
        };
    }
    function getRating(rating, reviewType) {
        if (reviewType == undefined || reviewType == null || reviewType == "true") reviewType = true; else reviewType = false;
        var ratingStr = '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>';
        if (rating > 0 && rating < 1.5) {
            reviewType = false;
            ratingStr = '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>';
        }
        if (rating >= 1.5 && rating < 2) {
            reviewType = false;
            ratingStr = '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star-half-o ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>';
        }
        if (rating >= 2 && rating < 2.5) {
            reviewType = false;
            ratingStr = '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>';
        }
        if (rating >= 2.5 && rating < 3) {
            ratingStr = '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star-half-o ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>';
        }
        if (rating >= 3 && rating < 3.5) {
            ratingStr = '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star-o blank_star"></i>' + '<i class="fa fa-star-o blank_star"></i>';
        }
        if (rating >= 3.5 && rating < 4) {
            ratingStr = '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star-half-o ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star-o blank_star"></i>';
        }
        if (rating >= 4 && rating < 4.5) {
            ratingStr = '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star-o blank_star"></i>';
        }
        if (rating >= 4.5 && rating < 5) {
            ratingStr = '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star-half-o ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>';
        }
        if (rating == 5) {
            ratingStr = '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>' + '<i class="fa fa-star ' + (reviewType == true ? "yellow_star" : "red_star") + '"></i>';
        }
        return ratingStr;
    }
    function actionItem() {
        return {
            scope: {
                rating: "@"
            },
            link: function(scope, $element, $attrs) {
                var actionItem = '<div class="row">' + '<div class="col-md-12">' + '<div class="widget-comments-item">' + '<div class="widget-comments-header">' + '<a href="#" title="">' + $attrs.postedby + "</a>" + "</div>" + '<div class="widget-comments-text">' + $attrs.reviewcontent + '<div class="p-b-2 clearfix font-size-12">' + getRating($attrs.rating) + "</div>" + "</div>" + '<div class="widget-comments-footer">' + moment(new Date(parseInt($attrs.posteddate, 10))).fromNow() + "<span>&nbsp;" + $attrs.postedby + "&nbsp;" + $attrs.postedemail + "</span>" + '<a class="pull-right" style="cursor: pointer;" onclick="removeActionItem(\'' + $attrs.reviewid + '\')"><i class="fa fa-minus-square"></i>&nbsp;Remove</a>' + "</div>" + "</div>" + "</div>" + "</div>";
                $element.html(actionItem);
            }
        };
    }
    function searchResult() {
        return {
            scope: {
                rating: "@"
            },
            link: function(scope, $element, $attrs) {
                var reviewData = JSON.parse($attrs.reviewdata);
                var reviewContent = reviewData.reviewText;
                var reviewType = reviewData.reviewType;
                var postedDate = reviewData.reviewDate;
                var postedBy = reviewData.postedBy;
                var postedEmail = reviewData.postedEmail;
                var reviewId = reviewData.reviewId;
                var likeCount = reviewData.like;
                var dislikeCount = reviewData.dislike;
                var replies = "";
                if (reviewData.replyText != undefined && reviewData.replyText != "") {
                    replies = '<div class="widget-tree-comments-item">' + '<div class="widget-tree-comments-text">' + reviewData.replyText + "</div>" + '<div class="widget-tree-comments-footer">' + moment(reviewData.replyDate).local().fromNow() + "</div>" + "</div>";
                }
                var searchResultHTML = '<div class="panel">' + '<div class="panel-title">' + postedBy + "</div>" + '<div class="panel-subtitle">' + postedEmail + "<br>" + getRating(reviewData.reviewRating, reviewType) + "<br>" + '<span class="text text-muted">' + moment(postedDate).local().fromNow() + "</span>" + "</div>" + '<div class="panel-body">' + '<div class="widget-tree-comments-item">' + '<div class="widget-tree-comments-text">' + reviewContent + replies + "</div>" + "</div>" + '<small id="' + reviewId + '_message" class="pull-right text-success"></small>' + "<hr>" + '<button type="button" onclick="addReviewItem(\'' + reviewId + '\')" class="btn btn-xs btn-outline m-r-1 m-l-1"><i class="fa fa-plus-square text-info"></i>&nbsp;&nbsp;Add to Action Item </button>' + '<button type="button" onclick="shareItem(\'' + reviewId + '\')"  class="btn btn-xs btn-outline m-r-1"><i class="fa fa-share-alt text-info"></i>&nbsp;&nbsp;Share</button>' + '<button type="button" onclick="replyItem(\'' + reviewId + "','" + escape(reviewContent) + "','" + escape(postedBy) + "','" + escape(postedEmail) + '\')" class="btn btn-xs btn-outline"><i class="fa fa-share-square text-info"></i>&nbsp;&nbsp;Reply</button>&nbsp;&nbsp;' + '<button type="button" onclick="sendDiscount(\'' + reviewId + "','" + escape(reviewContent) + "','" + escape(postedBy) + "','" + escape(postedEmail) + '\')" class="btn btn-xs btn-outline"><i class="fa fa-paper-plane text-info"></i>&nbsp;&nbsp;Send Discount</button>' + "</div>" + "</div>";
                $element.html(searchResultHTML);
            }
        };
    }
    function notification() {
        return {
            link: function(scope, $element, $attrs) {
                var notify = '<div class="widget-notifications-item">' + '<div class="widget-notifications-title text-danger">' + $attrs.clientusername + "</div>" + '<div class="widget-notifications-description">' + $attrs.notificationtext + "</div>" + '<div class="widget-notifications-date">' + $attrs.notificationtime + "</div>" + "<div onclick=\"markNotification('" + $attrs.notificationid + '\')" style="cursor:pointer;" class="widget-notifications-icon ' + ($attrs.read == "true" ? "ion-email" : "ion-email-unread") + ' bg-warning"></div>' + "</div>";
                $element.html(notify);
            }
        };
    }
    angular.module("pixeladmin").directive("pageTitle", [ "$rootScope", pageTitleDirective ]).directive("addStars", addStars).directive("actionItem", actionItem).directive("notification", notification).directive("searchResult", searchResult);
})();