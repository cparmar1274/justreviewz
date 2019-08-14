function removeActionItem(reviewId) {
    angular.element(document.getElementById("actionItemCtrlID")).scope().actionItem.removeActionItem(reviewId);
}

angular.module("pixeladmin").controller("ActionItemsCtrl", [ "$http", function($http) {
    var self = this;
    self.actionItems = [], self.message = !1, self.messageText = "", self.removeActionItem = function(reviewId) {
        $http.post("removeActionItem", {
            reviewId: reviewId
        }).then(function(response) {
            self.message = !0, self.messageText = 1 == response.data.success ? "Action Item removed successfully" : "Action does not exits.It may be already removed or being removed. Please try after sometime.", 
            self.actionItems = [], self.init();
        });
    }, self.downloadPDF = function() {
        alert("download PDF");
    }, self.shareActionItems = function() {
        alert("share action Item");
    }, self.init = function() {
        $http.get("getActionItems").then(function(response) {
            angular.forEach(response.data.data, function(data) {
                self.actionItems.push(data);
            }), 0 == self.actionItems.length && (self.message = !0, self.messageText = "TIPS: You don't have any action items. You can add your cusomer review/opinion from Manage Reviews tab. It will help you to improvise your business.");
        });
    };
} ]);