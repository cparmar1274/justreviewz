(function() {
  // ===============================================================================
  // Controllers / Main
  //

  function MainCtrl($rootScope) {
    var self = this;
    
    self.businessName = "SIT Automation";
    self.totalReviews = 0;
    self.totalRating = 0;
 
    
  }

  angular.module('pixeladmin')
    .controller('MainCtrl', [ '$rootScope', MainCtrl ]);

})();
