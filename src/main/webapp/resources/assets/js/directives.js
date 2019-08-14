!function() {
    function getRating(rating, reviewType) {
        reviewType = null == reviewType || null == reviewType || "true" == reviewType;
        var ratingStr = '<i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i>';
        return 0 < rating && rating < 1.5 && (ratingStr = '<i class="fa fa-star ' + (1 == (reviewType = !1) ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i>'), 
        1.5 <= rating && rating < 2 && (ratingStr = '<i class="fa fa-star ' + (1 == (reviewType = !1) ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star-half-o ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i>'), 
        2 <= rating && rating < 2.5 && (ratingStr = '<i class="fa fa-star ' + (1 == (reviewType = !1) ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i>'), 
        2.5 <= rating && rating < 3 && (ratingStr = '<i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star-half-o ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i>'), 
        3 <= rating && rating < 3.5 && (ratingStr = '<i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star-o blank_star"></i><i class="fa fa-star-o blank_star"></i>'), 
        3.5 <= rating && rating < 4 && (ratingStr = '<i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star-half-o ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star-o blank_star"></i>'), 
        4 <= rating && rating < 4.5 && (ratingStr = '<i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star-o blank_star"></i>'), 
        4.5 <= rating && rating < 5 && (ratingStr = '<i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star-half-o ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i>'), 
        5 == rating && (ratingStr = '<i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i><i class="fa fa-star ' + (1 == reviewType ? "yellow_star" : "red_star") + '"></i>'), 
        ratingStr;
    }
    angular.module("pixeladmin").directive("pageTitle", [ "$rootScope", function($rootScope) {
        return {
            link: function(_scope_, $element) {
                $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
                    var title = (toState.data && toState.data.pageTitle ? toState.data.pageTitle + " - " : "") + "PixelAdmin: Responsive Bootstrap Template";
                    $element.text(title);
                });
            }
        };
    } ]).directive("addStars", function() {
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
    }).directive("actionItem", function() {
        return {
            scope: {
                rating: "@"
            },
            link: function(scope, $element, $attrs) {
                var actionItem = '<div class="row"><div class="col-md-12"><div class="widget-comments-item"><div class="widget-comments-header"><a href="#" title="">' + $attrs.postedby + '</a></div><div class="widget-comments-text">' + $attrs.reviewcontent + '<div class="p-b-2 clearfix font-size-12">' + getRating($attrs.rating) + '</div></div><div class="widget-comments-footer">' + moment(new Date(parseInt($attrs.posteddate, 10))).fromNow() + "<span>&nbsp;" + $attrs.postedby + "&nbsp;" + $attrs.postedemail + '</span><a class="pull-right" style="cursor: pointer;" onclick="removeActionItem(\'' + $attrs.reviewid + '\')"><i class="fa fa-minus-square"></i>&nbsp;Remove</a></div></div></div></div>';
                $element.html(actionItem);
            }
        };
    }).directive("notification", function() {
        return {
            link: function(scope, $element, $attrs) {
                var notify = '<div class="widget-notifications-item"><div class="widget-notifications-title text-danger">' + $attrs.clientusername + '</div><div class="widget-notifications-description">' + $attrs.notificationtext + '</div><div class="widget-notifications-date">' + $attrs.notificationtime + "</div><div onclick=\"markNotification('" + $attrs.notificationid + '\')" style="cursor:pointer;" class="widget-notifications-icon ' + ("true" == $attrs.read ? "ion-email" : "ion-email-unread") + ' bg-warning"></div></div>';
                $element.html(notify);
            }
        };
    }).directive("searchResult", function() {
        return {
            scope: {
                rating: "@"
            },
            link: function(scope, $element, $attrs) {
                var reviewData = JSON.parse($attrs.reviewdata), reviewContent = reviewData.reviewText, reviewType = reviewData.reviewType, postedDate = reviewData.reviewDate, postedBy = reviewData.postedBy, postedEmail = reviewData.postedEmail, reviewId = reviewData.reviewId, replies = (reviewData.like, 
                reviewData.dislike, "");
                null != reviewData.replyText && "" != reviewData.replyText && (replies = '<div class="widget-tree-comments-item"><div class="widget-tree-comments-text">' + reviewData.replyText + '</div><div class="widget-tree-comments-footer">' + moment(reviewData.replyDate).local().fromNow() + "</div></div>");
                var searchResultHTML = '<div class="panel"><div class="panel-title">' + postedBy + '</div><div class="panel-subtitle">' + postedEmail + "<br>" + getRating(reviewData.reviewRating, reviewType) + '<br><span class="text text-muted">' + moment(postedDate).local().fromNow() + '</span></div><div class="panel-body"><div class="widget-tree-comments-item"><div class="widget-tree-comments-text">' + reviewContent + replies + '</div></div><small id="' + reviewId + '_message" class="pull-right text-success"></small><hr><button type="button" onclick="addReviewItem(\'' + reviewId + '\')" class="btn btn-xs btn-outline m-r-1 m-l-1"><i class="fa fa-plus-square text-info"></i>&nbsp;&nbsp;Add to Action Item </button><button type="button" onclick="shareItem(\'' + reviewId + '\')"  class="btn btn-xs btn-outline m-r-1"><i class="fa fa-share-alt text-info"></i>&nbsp;&nbsp;Share</button><button type="button" onclick="replyItem(\'' + reviewId + "','" + escape(reviewContent) + "','" + escape(postedBy) + "','" + escape(postedEmail) + '\')" class="btn btn-xs btn-outline"><i class="fa fa-share-square text-info"></i>&nbsp;&nbsp;Reply</button>&nbsp;&nbsp;<button type="button" onclick="sendDiscount(\'' + reviewId + "','" + escape(reviewContent) + "','" + escape(postedBy) + "','" + escape(postedEmail) + '\')" class="btn btn-xs btn-outline"><i class="fa fa-paper-plane text-info"></i>&nbsp;&nbsp;Send Discount</button></div></div>';
                $element.html(searchResultHTML);
            }
        };
    });
}();