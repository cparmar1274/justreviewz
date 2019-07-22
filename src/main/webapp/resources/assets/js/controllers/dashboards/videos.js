(function() {
    function VideosDashboardOverviewCtrl() {
        this.morrisData = [];
        for (var i = 1; i <= 30; i++) {
            this.morrisData.push({
                period: "2016-06-" + (i < 10 ? "0" + i : i),
                views: pxDemo.getRandomData(5e3, 3e3),
                likes: pxDemo.getRandomData(1e3, 200),
                dislikes: pxDemo.getRandomData(1e3, 200)
            });
        }
        this.morrisOptions = {
            xkey: "period",
            ykeys: [ "views", "likes", "dislikes" ],
            labels: [ "Views", "Likes", "Dislikes" ],
            hideHover: "auto",
            lineColors: pxDemo.getRandomColors(),
            fillOpacity: .1,
            behaveLikeLine: true,
            lineWidth: 1,
            pointSize: 4,
            gridLineColor: "#cfcfcf",
            resize: true
        };
        this.datepickerData = {
            start: "06/01/2016",
            end: "06/30/2016"
        };
    }
    angular.module("pixeladmin").controller("VideosDashboardOverviewCtrl", VideosDashboardOverviewCtrl);
})();