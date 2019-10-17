angular.module("pixeladmin").controller("DefaultDashboardChartsCtrl", function($http, $scope, DTOptionsBuilder) {
    var self = this;
    self.positiveReview = 0, self.negativeReview = 0, self.neutralReview = 0, self.searchText = "", 
    self.trendingKeywords = [], self.rating = 0, self.ratingtype = !1, self.lastUpdatedOn = "Last updated on", 
    self.morrisOptions = {
        xkey: "ratingDate",
        element: "dashboardChartData",
        data: [],
        ykeys: [ "overallRating" ],
        labels: [ "Average Rating " ],
        lineColors: [ "#fff" ],
        lineWidth: 2,
        pointSize: 4,
        gridLineColor: "rgba(255,255,255,.5)",
        resize: !0,
        ymax: 5,
        ymin: "auto",
        gridTextColor: "#fff",
        dateFormat: function(d) {
            return console.log(d), moment(d).format("MMM YYYY");
        },
        yLabelFormat: function(d) {
            return d.toPrecision(3);
        },
        xLabelFormat: function(d) {
            return moment(d).format("MMM YYYY");
        }
    };
    var morrisChart1 = Morris.Line(self.morrisOptions);
    self.donutOptions = {
        colors: [ "#78bd5d", "#e46050", "#59c4e4" ],
        element: "dashboardDonutData",
        data: [ {
            label: "",
            value: ""
        } ],
        resize: !0,
        formatter: function(y) {
            return y + "%";
        }
    };
    var morrisChart = Morris.Donut(self.donutOptions);
    $http.get("getDashboardChartData").then(function(response) {
        self.lastUpdatedOn = "Last updated " + moment(response.data.data.dashboardMap.lastUpdated).local().fromNow(), 
        self.rating = response.data.data.totalRating, self.positiveReview = response.data.data.totalPositive, 
        self.negativeReview = response.data.data.totalNegative, self.neutralReview = response.data.data.totalNeutral, 
        morrisChart.setData(response.data.pie), morrisChart1.setData(response.data.data.dashboardChartData), 
        angular.element(document.getElementById("mainControllerID")).scope().main.totalReviews = self.positiveReview + self.negativeReview + self.neutralReview, 
        angular.element(document.getElementById("mainControllerID")).scope().main.totalRating = self.rating;
    }), self.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(10).withOption("bLengthChange", !0), 
    $http.get("getTrendingData").then(function(response) {
        1 == response.data.success && (self.trendingKeywords = response.data.data);
    }), self.promotionRequestCounter = 0, $http.get("getPromotionCounter").then(function(response) {
        self.promotionRequestCounter = response.data.result.result.promotionRequestCounter;
    });
});