function markNotification(reviewId) {
    angular.element(document.getElementById("mainControllerID")).scope().main.markNotification(reviewId);
}

(function() {
    function MainCtrl($rootScope, $http) {
        var self = this;
        self.businessName = "Just Reviewz";
        self.totalReviews = 0;
        self.totalRating = 0;
        self.newNotification = 0;
        self.notifications = [];
        self.engineVersion = "v1.0.6-beta";
        self.loadNotification = function() {
            self.newNotification = 0;
            self.notifications = [];
            $http.get("getNotifications").then(function(response) {
                var readCount = 0;
                if (response.data.success == true) {
                    angular.forEach(response.data.data, function(obj) {
                        var notify = {};
                        notify.notificationText = obj.notificationText;
                        notify.clientUserName = obj.clientUserName;
                        notify.notificationTime = moment(obj.notificationTime).fromNow();
                        notify.isRead = obj.isRead;
                        if (obj.isRead == false) readCount++;
                        notify.notificationId = obj.notificationId;
                        self.notifications.push(notify);
                    });
                }
                self.newNotification = readCount;
            });
        };
        self.markNotification = function(notificationID) {
            $http.post("markNotification", {
                notificationID: notificationID
            }).then(function(response) {
                self.loadNotification();
            });
        };
        self.loadNotification();
    }
    angular.module("pixeladmin").controller("MainCtrl", [ "$rootScope", "$http", MainCtrl ]);
})();