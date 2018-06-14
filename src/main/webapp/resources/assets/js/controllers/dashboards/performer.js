(function() {
  // ===============================================================================
  // Controllers / Dashboards / Financial
  //
  function PerformerCtrl($http) {
    var self = this;
    self.rating = angular.element(document.getElementById("mainControllerID")).scope().main.totalRating;
    self.totalReviews = angular.element(document.getElementById("mainControllerID")).scope().main.totalReviews;
    self.reviewType = "true";
    self.competitors = [{name:"Hakka Ren",rating:"4"}];
    self.performers = [{name:"Swiss Chalet",rating:"4.5"}];
    self.addCompetitorTitle = "Add your competitor";
    
    //competitor details
    self.businessName = '';
    self.businessStreet = '';
    self.businessCity = '';
    
    self.businessProvince = {name:"Ontario",code:"ON"};
	self.businessProvinceList = [{name:"Alberta",code:"AB"},
	{name:"British Columbia",code:"BC"},
	{name:"Manitoba",code:"MB"},
	{name:"New Brunswick",code:"NB"},
	{name:"Newfoundland and Labrador",code:"NL"},
	{name:"Nova Scotia",code:"NS"},
	{name:"Northwest Territories",code:"NT"},
	{name:"Nunavut",code:"NU"},
	{name:"Ontario",code:"ON"},
	{name:"Prince Edward Island",code:"PE"},
	{name:"Quebec",code:"QC"},
	{name:"Saskatchewan",code:"SK"},
	{name:"Yukon",code:"YT"}];
	
	self.businessCountry = 'Canada';
    
    self.businessPostal='';
    
    self.addCompetitor = function(){
	    	 var params = {
	    	    "clientId":12,
	    		"businessName":self.businessName,
	    			      "rating":0.0,
					      "address":{
		    					"streetName": self.businessStreet,
		    					"city":self.businessCity,
		    					"postalCode":self.businessPostal,
		    					"province":self.businessProvince.code,
		    					"country":self.businessCountry
		    				 }
					      };
    	    $http.post('addCompetitor',params).then(function(response) {
    	    	if(response.data.success) self.getCompetitor();
    	    });
    }
    
    self.getCompetitor = function(){
    	$http.get('getCompetitors').then(function(response) {
        	self.competitors = response.data.data;
        });
    }
    
    
    
    $http.get('getPerformers').then(function(response) {
    	self.performers = response.data.data;
    });
    
   
    
    self.getCompetitor();
  }

  

  angular.module('pixeladmin')
    .controller('PerformerCtrl', ['$http',PerformerCtrl]);
})();
