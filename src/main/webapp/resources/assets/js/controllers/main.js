(function() {
  // ===============================================================================
  // Controllers / Main
  //

  function MainCtrl($rootScope) {
    var self = this;
    
    self.businessName = "Review Analytics";
    self.totalReviews = 0;
    self.totalRating = 0;
 
    
  }

  angular.module('pixeladmin')
    .controller('MainCtrl', [ '$rootScope', MainCtrl ]);

})();
