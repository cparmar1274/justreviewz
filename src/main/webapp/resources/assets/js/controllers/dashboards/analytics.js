angular.module("pixeladmin").controller("AnalyticsDashboardChartsCtrl", function() {
    var colors = pxDemo.getRandomColors();
    function generateSparklineData(index, type) {
        var data = [ pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100) ], options = "bar" === type ? {
            type: "bar",
            barColor: colors[index],
            barSpacing: 2
        } : {
            type: "line",
            fillColor: null,
            lineColor: colors[index],
            lineWidth: 1,
            spotColor: null,
            minSpotColor: null,
            maxSpotColor: null,
            highlightSpotColor: colors[index + 1],
            highlightLineColor: colors[index + 1],
            spotRadius: 3
        };
        return {
            data: data,
            options: $.extend({
                width: "100%",
                height: "70px"
            }, options)
        };
    }
    this.sparklineData = [ generateSparklineData(0, "line"), generateSparklineData(1, "bar"), generateSparklineData(2, "line"), generateSparklineData(3, "bar") ], 
    this.c3Data = [ pxDemo.getRandomData(300, 50), pxDemo.getRandomData(300, 50), pxDemo.getRandomData(300, 50) ], 
    this.c3Options = {
        colorPattern: [ colors[4], colors[5], colors[6] ]
    };
}).controller("AnalyticsDashboardTrendingCtrl", function() {
    var color = pxDemo.getRandomColors(1)[0];
    function generateChartData() {
        return {
            data: [ pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100), pxDemo.getRandomData(300, 100) ],
            options: {
                type: "bar",
                barWidth: 2,
                height: 20,
                barColor: color,
                barSpacing: 2
            }
        };
    }
    this.chartData = [ generateChartData(), generateChartData(), generateChartData(), generateChartData(), generateChartData(), generateChartData(), generateChartData() ];
});