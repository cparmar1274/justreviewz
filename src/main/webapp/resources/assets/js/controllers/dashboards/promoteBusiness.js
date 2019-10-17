angular.module("pixeladmin").controller("PromoteBusinessCtrl", function($http, DTOptionsBuilder) {
    var self = this;
    self.businessObjects = [], self.promotions = [], self.promoteTitle = "", self.promoteDesc = "", 
    self.loadBusinessObjects = function() {
        $http.get("loadBusiness").then(function(response) {
            self.businessObjects = [], angular.forEach(response.data.result, function(key, value) {
                "null" != value && self.businessObjects.push({
                    email: value,
                    count: key
                });
            });
        });
    }, self.promotionId = "", self.openPromotion = function(object) {
        self.promoteTitle = "", self.promoteDesc = "", $("#daterange-4").text(moment().format("MMMM D, YYYY"), moment().add(7, "days").format("MMMM D, YYYY")), 
        null != object && null != object && (self.promoteTitle = object.promotionTitle, 
        self.promoteDesc = object.promotionDetail, self.promoteId = object.promotionId, 
        $("#daterange-4").text(object.promotionStartDate + " - " + object.promotionEndDate)), 
        $("#promotionModal").modal("toggle");
    }, self.resetCounter = function() {
        self.promotionRequestCounter = 0, $http.get("resetPromotionCounter").then(function(response) {
            self.promotionRequestCounter = 0;
        });
    }, self.promotionRequestCounter = 0, self.promotionRequestMade = null, $http.get("getPromotionCounter").then(function(response) {
        self.promotionRequestCounter = response.data.result.result.promotionRequestCounter, 
        self.promotionRequestMade = moment(response.data.result.result.updateTime).local().fromNow();
    }), self.createPromotion = function() {
        var param = {
            promotionId: self.promoteId,
            promotionTitle: self.promoteTitle,
            promotionDetail: self.promoteDesc,
            promotionStartDate: $("input#promotionTimeFrameId").data("daterangepicker").startDate.format("L"),
            promotionEndDate: $("input#promotionTimeFrameId").data("daterangepicker").endDate.format("L")
        };
        $http.post("createPromotion", param).then(function(response) {
            self.loadPromotions();
        });
    }, self.loadPromotions = function() {
        self.promotions = [], $http.get("loadPromotions").then(function(response) {
            self.promotions = response.data.result.result;
        });
    }, self.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(10).withOption("bLengthChange", !0), 
    self.loadBusinessObjects(), self.loadPromotions();
});