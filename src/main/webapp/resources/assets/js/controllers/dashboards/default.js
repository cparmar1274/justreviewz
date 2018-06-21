(function() {
	// ===============================================================================
	// Controllers / Dashboards / Default
	//

	function DefaultDashboardChartsCtrl($http, $scope,DTOptionsBuilder) {

		// Morris chart
		//
        var self = this;
        self.positiveReview = 0;
        self.negativeReview = 0;
        self.neutralReview = 0;
        self.searchText = "";
    	self.trendingKeywords = [];
    	
    	self.rating=0.0;
    	self.ratingtype = false;
    	
    	self.morrisOptions = {
			xkey : 'ratingDate',
			element:'dashboardChartData',
			data: [],
			ykeys : [ 'overallRating', 'googleRating', 'facebookRating', 'yelpRating' ],
			labels : [ 'Overall', 'Google', 'Facebook', 'Yelp' ],
			lineColors : [ '#fff', '#78bd5d', '#f4ab43', '#e46050' ],
			lineWidth : 2,
			pointSize : 4,
			gridLineColor : 'rgba(255,255,255,.5)',
			resize : true,
			ymax: 5,
			ymin:'auto',
			gridTextColor : '#fff',
			dateFormat:function(d){ return moment(d).format('MMMM D YYYY'); },
			//xLabels : "Month",
			yLabelFormat:function(d){return d.toPrecision(3);},
			xLabelFormat: function(d) {
				return moment(d).format('MMMM D YYYY');
		      }
		};
		var morrisChart1 = Morris.Line(self.morrisOptions);
		
		self.donutOptions = {
				colors :  ['#78bd5d','#e46050','#59c4e4' ],
				element:'dashboardDonutData',
				data : [{label:"",value:""}],
				resize : true,
				formatter : function(y) {
					return y + "%"
				}
			};
			
		var morrisChart = Morris.Donut(self.donutOptions);
		
		$http.get('getDashboardChartData').then(function(response) {
			  morrisChart1.setData(response.data.data.dashboardChartData);
			  self.rating = response.data.data.totalRating;
			  self.positiveReview = response.data.data.totalPositive;
		      self.negativeReview = response.data.data.totalNegative;
		      self.neutralReview = response.data.data.totalNeutral;
		      morrisChart.setData(response.data.pie);

		      //set rating and reviews count
		      angular.element(document.getElementById("mainControllerID")).scope().main.totalReviews = self.positiveReview + self.negativeReview + self.neutralReview;
		      angular.element(document.getElementById("mainControllerID")).scope().main.totalRating = self.rating;
		});
		
		
		// DataTables configurable options
	    self.dtOptions = DTOptionsBuilder.newOptions()
	        .withDisplayLength(10)
	        .withOption('bLengthChange', true);
	
		$http.get('getTrendingData').then(function(response) {
			if(response.data.success==true)
				self.trendingKeywords = response.data.data;
		});
		
	
		
	}

	angular.module('pixeladmin').controller('DefaultDashboardChartsCtrl',
			DefaultDashboardChartsCtrl);

})();
