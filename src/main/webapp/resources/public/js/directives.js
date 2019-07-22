function replyComment(reviewText, reviewId) {
    var reviewDoc = $("#" + reviewId + "_reply");
    var counter = parseInt(reviewDoc.text().trim().replace("Reply", "").replace("(", "").replace(")", ""), 10);
    counter = isNaN(counter) ? 0 : counter;
    reviewDoc.html('<i class="fa fa-arrow-up"></i><span class="text-small">' + (counter + 1) + "</span>");
    return angular.element(document.getElementById("publicSiteControllerId")).scope().reviewCtrl.replyComment(reviewText, reviewId);
}

function likeComment(reviewId) {
    var reviewDoc = $("#" + reviewId + "_like");
    $(this).prop("disabled", true);
    var counter = parseInt(reviewDoc.text().trim().replace("(", "").replace(")", ""), 10);
    counter = isNaN(counter) ? 0 : counter;
    reviewDoc.html('<i class="fa fa-arrow-up"></i>&nbsp;(' + (counter + 1) + ")");
    return angular.element(document.getElementById("publicSiteControllerId")).scope().reviewCtrl.likeComment(reviewId);
}

function dislikeComment(reviewId) {
    var reviewDoc = $("#" + reviewId + "_dislike");
    $(this).prop("disabled", true);
    var counter = parseInt(reviewDoc.text().trim().replace("(", "").replace(")", ""), 10);
    counter = isNaN(counter) ? 0 : counter;
    reviewDoc.html('<i class="fa fa-arrow-down"></i>&nbsp;(' + (counter + 1) + ")");
    return angular.element(document.getElementById("publicSiteControllerId")).scope().reviewCtrl.dislikeComment(reviewId);
}

function reviewReplies(reviewId) {
    return angular.element(document.getElementById("publicSiteControllerId")).scope().reviewCtrl.loadReplies(reviewId);
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

(function() {
    function pageTitleDirective($rootScope) {
        return {
            link: function(_scope_, $element) {
                function listener(event, toState, toParams, fromState, fromParams) {
                    var title = (toState.data && toState.data.pageTitle ? toState.data.pageTitle + " - " : "") + "Angular Starter Project";
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
    function star() {
        return {
            template: '<ul class="rating" ng-mouseleave="leave()">' + '<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)">' + '<i class="fa fa-star"></i>' + "</li>" + "</ul>",
            scope: {
                ratingValue: "=",
                max: "=",
                readonly: "@",
                onHover: "=",
                onLeave: "="
            },
            controller: function($scope) {
                $scope.ratingValue = $scope.ratingValue || 0;
                $scope.max = $scope.max || 5;
                $scope.click = function(val) {
                    if ($scope.readonly && $scope.readonly === "true") {
                        return;
                    }
                    $scope.ratingValue = val;
                };
                $scope.over = function(val) {
                    $scope.onHover(val);
                };
                $scope.leave = function() {
                    $scope.onLeave();
                };
            },
            link: function(scope, elem, attrs) {
                elem.css("text-align", "center");
                var updateStars = function() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };
                updateStars();
                scope.$watch("ratingValue", function(oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                });
                scope.$watch("max", function(oldVal, newVal) {
                    if (newVal) {
                        updateStars();
                    }
                });
            }
        };
    }
    function reviewBlock($rootScope) {
        return {
            scope: {
                rating: "@"
            },
            link: function(scope, $element, $attrs) {
                var reviewObj = JSON.parse($attrs.reviewobject);
                var replyComments = "";
                if (reviewObj.replyText != undefined && reviewObj.replyText != "") {
                    replyComments = '<div class="widget-tree-comments-item">' + '    <div class="widget-tree-comments-header">' + '        <span class="text text-default" style="font-size:12px;">Business Owner</span><span>&nbsp;&nbsp;' + moment(reviewObj.replyDate).local().fromNow() + "</span>" + ' <i class="fa text text-success fa-check-circle" style="zoom: 2;"></i>' + "    </div>" + '    <div class="widget-tree-comments-text" style="word-wrap: break-word;">' + reviewObj.replyText + "    </div>" + '    <div class="widget-tree-comments-footer">' + "    </div>" + "</div>";
                }
                var reviewReplyText = "";
                var actionItem = '<div class="widget-tree-comments-item"  style="margin-left: 0px !important;">' + '<div class="widget-tree-comments-header">' + '<span class="text text-default" style="font-size:14px;">' + reviewObj.postedBy + "</span><span>&nbsp;&nbsp;" + moment(reviewObj.reviewDate).local().fromNow() + "</span> " + "<span>&nbsp;&nbsp;" + getRating(reviewObj.reviewRating) + "</span>" + "</div>" + '<div class="widget-tree-comments-text" style="word-wrap: break-word;">' + reviewObj.reviewText + "</div>" + '<div class="widget-tree-comments-footer">' + "</div>" + replyComments + "<hr></div>";
                $element.html(actionItem);
            }
        };
    }
    angular.module("pixeladmin").directive("pageTitle", [ "$rootScope", pageTitleDirective ]).directive("star", [ "$rootScope", star ]).directive("addStars", [ "$rootScope", addStars ]).directive("reviewBlock", [ "$rootScope", reviewBlock ]);
})();