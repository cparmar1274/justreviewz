function addReviewItem(reviewId){
	angular.element(document.getElementById("searchReviewID")).scope().searchReview.addActionItem(reviewId);
}
function shareItem(reviewId){
	angular.element(document.getElementById("searchReviewID")).scope().searchReview.shareItem(reviewId);
}

(function() {
	
	function SearchReviewCtrl($http,$scope,$stateParams, $state,$timeout) {
		var self = this;
		self.searchText = "";
		if($stateParams.searchText!=undefined && $stateParams.searchText!=null)
			self.searchText = $stateParams.searchText;
		
		self.searchData = [];
		self.searchGoodData =[];
		self.searchBadData =[];
		
		self.selectedPageSize = {pageSize:10,id:10};
		self.availablePageSize = [{pageSize:10,id:10},{pageSize:25,id:25},{pageSize:50,id:50}];
		self.activePage=1;
		self.lastPage=1;
		self.nextPages=[];
		self.totalResults = 0;
		self.currentIndex = (this.activePage-1) * this.selectedPageSize.pageSize ;
		self.previousEnabled = false;
		self.nextEnabled = false;
		self.searchResultStatus = false;
		
		self.selectedSortType = {sortType:'PostedDate : Latest',id:'PostedDate : Latest'};
		self.availableSortTypes = [{sortType:'Rating : Lowest',id:'Rating : Lowest'},{sortType:'Rating : Highest',id:'Rating : Highest'},
			{sortType:'PostedDate : Latest',id:'PostedDate : Latest'},{sortType:'PostedDate : Oldest',id:'PostedDate : Oldest'}
		];
		
		self.pageSizeChange = function() {
			self.currentIndex = 0 ;
			self.search();
		}
		
		self.pageSortChange = function() {
			self.search();
		}
		
		self.pageEnabled = function(page){
			return self.activePage == page;
		}
		
		self.previousPage = function(){
			self.activePage = self.activePage-1;
			if(self.activePage==0) { 
				self.activePage = 1;
		    }
			self.changePage(self.activePage);
		}
		self.nextPage = function(){
			self.activePage = self.activePage+1;
			if(self.activePage==self.maxPageSize){
				self.activePage = self.maxPageSize; 
			} 
			self.changePage(self.activePage);
		}
		self.changePage = function(changePage){
			self.activePage = changePage;
			if(changePage==0 || changePage > self.maxPageSize ) return;
			self.currentIndex = (changePage-1) * self.selectedPageSize.pageSize ;
			self.search();
		}
		
		self.searchStart = function(){
			self.currentIndex = 0;
			self.activePage = 1;
			self.search();
		}
		
		self.displayMessage = function(messageText,type) {
			$('#searchMessageID').show();
			self.message = messageText;
			self.showMessage = true;
			
			if(type!=undefined && type=='error')
			 {
				$('#accountMessageID').removeClass('alert-success');
				$('#accountMessageID').addClass('alert-danger');
			 }else {
				 $('#accountMessageID').addClass('alert-success');
					$('#accountMessageID').removeClass('alert-danger');
			 }
		}
		
		self.pageDisabled = function(page){
			return (self.activePage==page);
		}
	
	   self.addActionItem = function(reviewId) {
		   console.log(reviewId);
		   $http.post('addActionItem',{"reviewId":reviewId}).then(function(response) {
   	    	    	 var obj = $("#"+reviewId+"_message");
   	    	    	 console.log(obj);
   	    	    	 obj.html(response.data.result=='CREATED' ? '<i class="ion-android-done"></i>&nbsp;&nbsp;Action item added for review.' : '<i class="ion-android-done"></i>&nbsp;&nbsp;'+response.data.result);
   	       });
	   }
	   self.shareItem = function(reviewId) {
		   console.log(reviewId);
	   }
		
		self.search = function(){
			 $http.get('getReviews',{params:{
				 							searchText:self.searchText,
				 							length:self.selectedPageSize.pageSize,
				 							start:self.currentIndex,
				 							sortBy: self.selectedSortType.sortType,
				 							activePage: self.activePage
				 }}).then(
      	    		function(response){
      	    			if(response.data.success==true){
      	    				self.searchData = [];
      	    				angular.forEach(response.data.data,function(data){
      	          	    			self.searchData.push(data);
      	    					  
      	    				}); 
      	    			
      	    			self.totalResults = response.data.recordsTotal;
      	    			self.nextPages = response.data.pageSize;
      	    			self.maxPageSize = response.data.maxPageSize;
      	    			self.nextPages= response.data.pageSize.split(',').map(function(item) {
    					    return parseInt(item, 10);
      	    			});
      	    			
      	    			self.previousEnabled = (self.activePage==1);
      	    			self.nextEnabled = (self.activePage== self.maxPageSize);
      	    			self.searchResultStatus = false;
      	    			} else {
      	    				self.searchResultStatus = true;
      	    				$('#searchMessageID').show();
      	    			}
      	    		});
		}
		
		
		
			
		
		
     }
	
	 angular.module('pixeladmin')
	    .controller('SearchReviewCtrl',SearchReviewCtrl);
	
})();