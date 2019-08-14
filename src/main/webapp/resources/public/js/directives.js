function replyComment(reviewText, reviewId) {
    var reviewDoc = $("#" + reviewId + "_reply"), counter = parseInt(reviewDoc.text().trim().replace("Reply", "").replace("(", "").replace(")", ""), 10);
    return counter = isNaN(counter) ? 0 : counter, reviewDoc.html('<i class="fa fa-arrow-up"></i><span class="text-small">' + (counter + 1) + "</span>"), 
    angular.element(document.getElementById("publicSiteControllerId")).scope().reviewCtrl.replyComment(reviewText, reviewId);
}

function likeComment(reviewId) {
    var reviewDoc = $("#" + reviewId + "_like");
    $(this).prop("disabled", !0);
    var counter = parseInt(reviewDoc.text().trim().replace("(", "").replace(")", ""), 10);
    return counter = isNaN(counter) ? 0 : counter, reviewDoc.html('<i class="fa fa-arrow-up"></i>&nbsp;(' + (counter + 1) + ")"), 
    angular.element(document.getElementById("publicSiteControllerId")).scope().reviewCtrl.likeComment(reviewId);
}

function dislikeComment(reviewId) {
    var reviewDoc = $("#" + reviewId + "_dislike");
    $(this).prop("disabled", !0);
    var counter = parseInt(reviewDoc.text().trim().replace("(", "").replace(")", ""), 10);
    return counter = isNaN(counter) ? 0 : counter, reviewDoc.html('<i class="fa fa-arrow-down"></i>&nbsp;(' + (counter + 1) + ")"), 
    angular.element(document.getElementById("publicSiteControllerId")).scope().reviewCtrl.dislikeComment(reviewId);
}

function reviewReplies(reviewId) {
    return angular.element(document.getElementById("publicSiteControllerId")).scope().reviewCtrl.loadReplies(reviewId);
}

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
                var title = (toState.data && toState.data.pageTitle ? toState.data.pageTitle + " - " : "") + "Angular Starter Project";
                $element.text(title);
            });
        }
    };
} ]).directive("star", [ "$rootScope", function() {
    return {
        template: '<ul class="rating" ng-mouseleave="leave()"><li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)"><i class="fa fa-star"></i></li></ul>',
        scope: {
            ratingValue: "=",
            max: "=",
            readonly: "@",
            onHover: "=",
            onLeave: "="
        },
        controller: function($scope) {
            $scope.ratingValue = $scope.ratingValue || 0, $scope.max = $scope.max || 5, $scope.click = function(val) {
                $scope.readonly && "true" === $scope.readonly || ($scope.ratingValue = val);
            }, $scope.over = function(val) {
                $scope.onHover(val);
            }, $scope.leave = function() {
                $scope.onLeave();
            };
        },
        link: function(scope, elem, attrs) {
            elem.css("text-align", "center");
            var updateStars = function() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) scope.stars.push({
                    filled: i < scope.ratingValue
                });
            };
            updateStars(), scope.$watch("ratingValue", function(oldVal, newVal) {
                newVal && updateStars();
            }), scope.$watch("max", function(oldVal, newVal) {
                newVal && updateStars();
            });
        }
    };
} ]).directive("addStars", [ "$rootScope", function() {
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
} ]).directive("reviewBlock", [ "$rootScope", function($rootScope) {
    return {
        scope: {
            rating: "@"
        },
        link: function(scope, $element, $attrs) {
            var reviewObj = JSON.parse($attrs.reviewobject), replyComments = "";
            null != reviewObj.replyText && "" != reviewObj.replyText && (replyComments = '<div class="widget-tree-comments-item">    <div class="widget-tree-comments-header">        <span class="text text-default" style="font-size:12px;">Business Owner</span><span>&nbsp;&nbsp;' + moment(reviewObj.replyDate).local().fromNow() + '</span> <i class="fa text text-success fa-check-circle" style="zoom: 2;"></i>    </div>    <div class="widget-tree-comments-text" style="word-wrap: break-word;">' + reviewObj.replyText + '    </div>    <div class="widget-tree-comments-footer">    </div></div>');
            var actionItem = '<div class="widget-tree-comments-item"  style="margin-left: 0px !important;"><div class="widget-tree-comments-header"><span class="text text-default" style="font-size:14px;">' + reviewObj.postedBy + "</span><span>&nbsp;&nbsp;" + moment(reviewObj.reviewDate).local().fromNow() + "</span> <span>&nbsp;&nbsp;" + getRating(reviewObj.reviewRating) + '</span></div><div class="widget-tree-comments-text" style="word-wrap: break-word;">' + reviewObj.reviewText + '</div><div class="widget-tree-comments-footer"></div>' + replyComments + "<hr></div>";
            $element.html(actionItem);
        }
    };
} ]);