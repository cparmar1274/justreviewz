(function() {
  // ===============================================================================
  // Controllers / Main
  //

  function MainCtrl($rootScope) {
    var self = this;
    
    self.businessName = "SIT Automation";
    
 
    
  }

  angular.module('pixeladmin')
    .controller('MainCtrl', [ '$rootScope', MainCtrl ]);

})();
