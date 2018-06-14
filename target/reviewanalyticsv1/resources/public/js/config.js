(function() {
  // ===============================================================================
  // Config
  //

  function config($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    // Default url
    $urlRouterProvider.otherwise("/login");
    $locationProvider.hashPrefix('!');

    $ocLazyLoadProvider.config({
      debug: false
    });

    // Routes
    $stateProvider
      .state('pages', {
        abstract: true,
        url: '/login',
        templateUrl: 'public/views/common/layout.html',
      })
      .state('pages.main', {
        url: '',
        templateUrl: 'public/views/main.html',
        data: { pageTitle: 'Main page' },
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
              return $ocLazyLoad.load([
                'public/js/controllers/main.js'
              ]);
            },
          }
      })
      .state('pages.second', {
        url: '/requestOnboarding',
        templateUrl: 'public/views/newaccount.html',
        data: { pageTitle: 'Second page' },
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  'public/js/controllers/requestOnboarding.js',
                   {
                      name: 'ui.select',
                      files: ['js/libs/select.js']
                    },
                    {
                      name: 'px-file',
                      files: ['js/pixeladmin/plugins/px-file.js', 'js/pixeladmin/directives/angular-px-file.js']
                    },
                  {
                    name: 'px-wizard',
                    files: ['js/pixeladmin/plugins/px-wizard.js', 'js/pixeladmin/directives/angular-px-wizard.js']
                  },
                  {
                    name: 'angular-maskedinput',
                    files: ['js/libs/jquery.maskedinput.js', 'js/pixeladmin/directives/angular-maskedinput.js']
                  },
                ]);
              },
            },
      });
  };

  function run($rootScope, $state) {
    $rootScope.$state = $state;

    $rootScope.$on('$stateChangeStart', function() {
      // Restart page loader
      if (window.Pace && typeof window.Pace.restart === 'function') {
        window.Pace.restart();
      }
    });
  }

  angular.module('pixeladmin')
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$ocLazyLoadProvider', config])
    .run(['$rootScope', '$state', run]);

})();
