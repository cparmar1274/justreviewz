(function() {
  // ===============================================================================
  // Custom directives
  //

  function pageTitleDirective($rootScope) {
    return {
      link: function(_scope_, $element) {
        function listener(event, toState, toParams, fromState, fromParams) {
          var title =
            (toState.data && toState.data.pageTitle ? (toState.data.pageTitle + ' - ') : '') +
            'PixelAdmin: Responsive Bootstrap Template';
          $element.text(title);
        }

        $rootScope.$on('$stateChangeStart', listener);
      }
    };
  }
  
  function addStars(){
	  return {
		  	scope: { rating: '@'},
			link: function(_scope_,$element, $attrs) {
			  _scope_.$watch('rating',function(newValue,oldValue){
				  $element.html(getRating(newValue,$attrs.reviewtype));
			  });
			  
		  }
	  };
  }
  
  function getRating(rating,reviewType){
	  if(reviewType==undefined || reviewType==null || reviewType =="true")
		  reviewType = true;
	  else
		  reviewType = false;
	  
	  var ratingStr = '<i class="fa fa-star-o blank_star"></i>'+
		'<i class="fa fa-star-o blank_star"></i>'+
		'<i class="fa fa-star-o blank_star"></i>'+
		'<i class="fa fa-star-o blank_star"></i>'+
		'<i class="fa fa-star-o blank_star"></i>';
	  
	  if(rating>=0 && rating <1.5)
	  {    reviewType = false;
		  
		  ratingStr = '<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
			'<i class="fa fa-star-o blank_star"></i>'+
			'<i class="fa fa-star-o blank_star"></i>'+
			'<i class="fa fa-star-o blank_star"></i>'+
			'<i class="fa fa-star-o blank_star"></i>'; 
	  }
	  
	  if(rating>=1.5 && rating < 2)
	  {  reviewType = false;
		  
		  ratingStr = '<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star-half-o '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star-o blank_star"></i>'+
				'<i class="fa fa-star-o blank_star"></i>'+
				'<i class="fa fa-star-o blank_star"></i>';}
	  
	  if(rating>=2 && rating < 2.5)
	  {  
		  reviewType = false;
		  
		  ratingStr = '<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star-o blank_star"></i>'+
				'<i class="fa fa-star-o blank_star"></i>'+
				'<i class="fa fa-star-o blank_star"></i>';}
	  
	  if(rating>=2.5 && rating < 3)
	  {  ratingStr = '<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
					'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star-half-o '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star-o blank_star"></i>'+
				'<i class="fa fa-star-o blank_star"></i>';}
	  
	  if(rating>=3 && rating < 3.5)
	  {  ratingStr = '<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star-o blank_star"></i>'+
				'<i class="fa fa-star-o blank_star"></i>';}
	  
	  if(rating>=3.5 && rating <4)
	  {	  ratingStr = '<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
					'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
					'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
					'<i class="fa fa-star-half-o '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
					'<i class="fa fa-star-o blank_star"></i>';}
	  
	  if(rating>=4 && rating < 4.5)
	  {  ratingStr = '<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star-o blank_star"></i>';}
	  
	  if(rating>=4.5 && rating <5)
	  {  ratingStr = '<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star-half-o '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>';}
	  
	  if(rating==5)
	  {	  ratingStr = '<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>'+
				'<i class="fa fa-star '+(reviewType==true ? "yellow_star" : "red_star")+'"></i>';}
	  return ratingStr;
  }
  
  function actionItem(){
	  return {
		  scope: { 
			  rating: '@',
				  },
		  link : function(scope,$element,$attrs){
			  var actionItem = '<div class="row">'+
			  						'<div class="col-md-10">'+
			  							'<div class="widget-comments-item">'+
								            '<div class="widget-comments-header">'+
								              '<a href="#" title="">'+$attrs.postedby+'</a>'+
								            '</div>'+
								            '<div class="widget-comments-text">'+
								              $attrs.reviewcontent+
								              '<div class="p-b-2 clearfix font-size-12">'+
									          getRating($attrs.rating)+
									          '</div>'+
								            '</div>'+
								            '<div class="widget-comments-footer">'+
								            moment($attrs.posteddate).fromNow()+
								           '</div>'+
								       '</div>'+
								    '</div>'+
								  '<div class="col-md-1">'+
						          	'<span>'+$attrs.postedby+'</span>'+
						          '</div>'+
						          '<div class="col-md-1">'+
						          	'<a style="cursor: pointer;" onclick="removeActionItem(\''+$attrs.reviewid+'\')"><i class="fa fa-times"></i>&nbsp;Remove</a>'+
						          '</div>'+
						        '</div>';
			  $element.html(actionItem);
		  }
	  }
  }
  

  function searchResult(){
	  return {
		  scope: { 
			  rating: '@',
				  },
		  link: function(scope,$element,$attrs){
			   var reviewContent = $attrs.reviewcontent;
			   var reviewType = $attrs.reviewtype;
			   var postedDate = $attrs.posteddate;
			   var reviewId = $attrs.reviewid;
			   var searchResultHTML = 
				 '<div class="panel">'+
				      '<div class="panel-body">'+
				        '<div class="font-weight-semibold font-size-16"></div>'+
				        reviewContent+
				        '<div class="p-b-2 clearfix font-size-12">'+
				          getRating($attrs.rating,reviewType)+
				        '</div>'+
				        '<small id="'+reviewId+'_message" class="pull-right text-success"></small>'+
				      '</div>'+
				      '<div class="panel-footer">'+
			            '<button type="button" onclick="addReviewItem(\''+reviewId+'\')" class="btn btn-xs btn-outline m-r-1 m-l-1"><i class="fa fa-exclamation-triangle text-info"></i>&nbsp;&nbsp;Add to Action Items </button>'+
			            '<button type="button" onclick="shareItem(\''+reviewId+'\')"  class="btn btn-xs btn-outline"><i class="fa fa-thumbs-up text-warning"></i>&nbsp;&nbsp;Share</button>'+
			            '<span class="pull-right">'+moment($attrs.posteddate).fromNow()+'</span>'
			         '</div>'+
			     '</div>';
			   $element.html(searchResultHTML);
		   }  
	  };
  }
  
  angular.module('pixeladmin')
    .directive('pageTitle', [ '$rootScope', pageTitleDirective ])
    .directive('addStars', addStars)
    .directive('actionItem',actionItem)
    .directive('searchResult', searchResult);

})();
