 angular.module("myapp", ['ngMaterial', 'ngMessages'])
            .controller("MyController",function($scope,$sce,$window, $http,$httpParamSerializerJQLike,$timeout, $q) {
            	var self = $scope;
            	self.myDashboard = {};
                self.myDashboard.searchFor = "Search Reviews...";
                 self.states        = [];
                 self.selectedItem  = null;
                 self.searchText    = null;
                 self.querySearch   = querySearch;
                 self.reportedIncidents = [];
                
                 self.selectedReviewType = "";
             	 self.reviewTypes = [{id:1,name:"All"},{id:2,name:"Positive"},{id:3,name:"Negative"},{id:4,name:"Neutral"}];
             	
             	self.selectedReviewSource = "";
             	self.reviewSources = [{id:1,name:"All"},{id:2,name:"Google"},{id:3,name:"Facebook"},{id:4,name:"Yelp"}];
                 
                 self.changeInItem = function(){
                	
                	var vehicleNumber = self.selectedItem.display;
                	console.log("selected",vehicleNumber);
                	 
                	self.reportedIncidents = [];
             	    $http.get('getReportedIncident',{params:{vehicleNumber:vehicleNumber}}).then(
             	    		function(response){
             	    			 angular.forEach(response.data.result.hits,function(item){
             	    				 console.log("ITEM",item);
             	    				 var obj = {
             	    						 incidentDescription: item.sourceAsString
             	    				 };
             	    				 self.reportedIncidents.push(obj);
             	    			 });
             	    		}
             	    );
                	 
                 }

                 // ******************************
                 // Internal methods
                 // ******************************

                 /**
                  * Search for states... use $timeout to simulate
                  * remote dataservice call.
                  */
                 function getElastic(query){
                	 return $http.get('getReportedVehicle',{
                         params: {vehicleNumber: query}
                     }).then(function(response) { 
                          return response;
                       });
                 }
                 
                function querySearch(query){
                	 var deferred = getElastic(query);
                	 return deferred.then(function(response){
                		 var result = [];
                		 console.log(response);
                		 angular.forEach(response.data.result.hits,function(item){
                			 var itemData = item.sourceAsMap.vehicleNumber;
                			 
                			 var obj = {value:itemData,display:itemData};
                			 
                			 result.push(obj);
                		 });
                		 return result;
                	 })
                 }
                           
});