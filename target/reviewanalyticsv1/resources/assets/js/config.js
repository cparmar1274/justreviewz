(function() {
  // ===============================================================================
  // Config
  //

  function config($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    // Default url
    $urlRouterProvider.otherwise("/dashboards");
    $locationProvider.hashPrefix('!');

    $ocLazyLoadProvider.config({
      debug: false
    });


    // Dashboards
    $stateProvider
      .state('dashboards', {
        abstract: true,
        url: '/dashboards',
        templateUrl: '../assets/views/common/layout.html',
      })
      .state('dashboards.default', {
        url: '',
        templateUrl: '../assets/views/dashboards/default.html',
        data: { pageTitle: 'Dashboard' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              '../assets/js/controllers/dashboards/default.js',
              {
                serie: true,
                name: 'angular-morris',
                files: ['../js/libs/raphael.js', '../js/libs/morris.js', '../js/pixeladmin/directives/angular-morris.js']
              },
              {
                  serie: true,
                  name: 'datatables',
                  files: ['../js/libs/jquery.dataTables.js', '../js/libs/dataTables.bootstrap.js', '../js/pixeladmin/extensions/datatables.js', '../js/libs/angular-datatables.js']
                },
                {
                    name: 'px-tab-resize',
                    files: ['../js/pixeladmin/plugins/px-tab-resize.js', '../js/pixeladmin/directives/angular-px-tab-resize.js']
                  }
            ]);
          },
        },
      })
      .state('dashboards.analytics', {
        url: '/analytics',
        templateUrl: '../assets/views/dashboards/analytics.html',
        data: { pageTitle: 'Analytics - Dashboards' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              '../assets/js/controllers/dashboards/analytics.js',
              {
                serie: true,
                name: 'px-sparkline',
                files: ['../js/libs/jquery.sparkline.js', '../js/pixeladmin/plugins/px-sparkline.js', '../js/pixeladmin/directives/angular-px-sparkline.js']
              },
              {
                serie: true,
                name: 'gridshore.c3js.chart',
                files: ['../js/libs/d3.js', '../js/libs/c3.js', '../js/libs/c3-angular.js']
              },
            ]);
          },
        },
      })
      .state('dashboards.competitor', {
        url: '/competitor',
        templateUrl: '../assets/views/dashboards/competitor.html',
        data: { pageTitle: 'Financial - Dashboards' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              '../assets/js/controllers/dashboards/competitor.js',
              {
                serie: true,
                name: 'chart.js',
                files: ['../js/libs/Chart.js', '../js/libs/angular-chart.js']
              },
              {
                serie: true,
                name: 'px-sparkline',
                files: ['../js/libs/jquery.sparkline.js', '../js/pixeladmin/plugins/px-sparkline.js', '../js/pixeladmin/directives/angular-px-sparkline.js']
              }
            ]);
          },
        },
      })
     .state('dashboards.performer', {
        url: '/performer',
        templateUrl: '../assets/views/dashboards/performer.html',
        data: { pageTitle: 'Financial - Dashboards' },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              '../assets/js/controllers/dashboards/performer.js',
              {
                serie: true,
                name: 'chart.js',
                files: ['../js/libs/Chart.js', '../js/libs/angular-chart.js']
              },
              {
                serie: true,
                name: 'px-sparkline',
                files: ['../js/libs/jquery.sparkline.js', '../js/pixeladmin/plugins/px-sparkline.js', '../js/pixeladmin/directives/angular-px-sparkline.js']
              }
            ]);
          },
        },
      });





    // Pages
    $stateProvider
      .state('pages', {
        abstract: true,
        url: '/pages',
        templateUrl: '../assets/views/common/layout.html',
      })
     .state('pages.search-results', {
        url: '/reviews/:searchText',
        templateUrl: '../assets/views/pages/search-results.html',
        data: { pageTitle: 'Search results - Pages' },
        resolve: {
        	loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
            	'../assets/js/controllers/pages/search-results.js',
                {
                    serie: true,
                    name: 'angular-morris',
                    files: ['../js/libs/raphael.js', '../js/libs/morris.js', '../js/pixeladmin/directives/angular-morris.js']
                 },
              {
                name: 'px-tab-resize',
                files: ['../js/pixeladmin/plugins/px-tab-resize.js', '../js/pixeladmin/directives/angular-px-tab-resize.js']
              }
            ]);
          }
        },
      })
      .state('pages.account', {
              url: '/account',
              templateUrl: '../assets/views/pages/account.html',
              data: { pageTitle: 'Account - Pages' },
              resolve: {
                loadPlugin: function ($ocLazyLoad) {
                  return $ocLazyLoad.load([
                        '../assets/js/controllers/dashboards/account.js',
                    {
                      name: 'px-tab-resize',
                      files: ['../js/pixeladmin/plugins/px-tab-resize.js', '../js/pixeladmin/directives/angular-px-tab-resize.js']
                    },
                    {
                      name: 'angular-px-char-limit',
                      files: ['../js/pixeladmin/plugins/px-char-limit.js', '../js/pixeladmin/directives/angular-px-char-limit.js']
                    },
                    {
                        serie: true,
                        name: 'datatables',
                        files: ['../js/libs/jquery.dataTables.js', '../js/libs/dataTables.bootstrap.js', '../js/pixeladmin/extensions/datatables.js', '../js/libs/angular-datatables.js']
                      }
                  ]);
                }
              },
            })
     .state('pages.action-items', {
        url: '/actoinitems/',
        templateUrl: '../assets/views/pages/action-items.html',
        data: { pageTitle: 'Search results - Pages' },
        resolve: {
        	loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
                '../assets/js/controllers/dashboards/actionItems.js',
                {
                    serie: true,
                    name: 'angular-morris',
                    files: ['../js/libs/raphael.js', '../js/libs/morris.js', '../js/pixeladmin/directives/angular-morris.js']
                 },
              {
                name: 'px-tab-resize',
                files: ['../js/pixeladmin/plugins/px-tab-resize.js', '../js/pixeladmin/directives/angular-px-tab-resize.js']
              }
            ]);
          }
        },
      })
      .state('pages.support-center', {
        url: '/help',
        templateUrl: '../assets/views/pages/support-center.html',
        data: { pageTitle: 'Support Center - Pages' },
      })
      .state('pages.blank', {
        url: '/blank',
        templateUrl: '../assets/views/pages/blank.html',
        data: { pageTitle: 'Blank - Pages' },
      });

    // Error pages
    $stateProvider
      .state('errors', {
        abstract: true,
        url: '/errors',
        templateUrl: '../assets/views/common/layout-blank.html',
      })
      .state('errors.404', {
        url: '/404',
        templateUrl: '../assets/views/pages/errors/404.html',
        data: { pageTitle: '404 - Pages' },
      })
      .state('errors.500', {
        url: '/500',
        templateUrl: '../assets/views/pages/errors/500.html',
        data: { pageTitle: '500 - Pages' },
      });
  }

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
