angular.module("pixeladmin").config([ "$stateProvider", "$locationProvider", "$urlRouterProvider", "$ocLazyLoadProvider", function($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/login"), $locationProvider.hashPrefix("!"), $ocLazyLoadProvider.config({
        debug: !1
    }), $stateProvider.state("pages", {
        abstract: !0,
        url: "/login",
        templateUrl: "landing/public/views/common/layout_login.html"
    }).state("pages.main", {
        url: "",
        templateUrl: "landing/public/views/main.html",
        data: {
            pageTitle: "Review Analytics : Authenticate"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "landing/public/js/controllers/main.js?v=20190814" ]);
            }
        }
    }).state("pages.second", {
        url: "/requestOnboarding",
        templateUrl: "landing/public/views/newaccount.html",
        data: {
            pageTitle: "Review Analytics : Request Onboarding"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "landing/public/js/controllers/requestOnboarding.js?v=20190814", {
                    name: "ui.select",
                    files: [ "landing/js/libs/select.js?v=20190814" ]
                }, {
                    name: "px-file",
                    files: [ "landing/js/pixeladmin/plugins/px-file.js?v=20190814", "landing/js/pixeladmin/directives/angular-px-file.js?v=20190814" ]
                }, {
                    name: "px-wizard",
                    files: [ "landing/js/pixeladmin/plugins/px-wizard.js?v=20190814", "landing/js/pixeladmin/directives/angular-px-wizard.js?v=20190814" ]
                }, {
                    name: "angular-maskedinput",
                    files: [ "landing/js/libs/jquery.maskedinput.js?v=20190814", "landing/js/pixeladmin/directives/angular-maskedinput.js?v=20190814" ]
                } ]);
            }
        }
    }).state("pages.third", {
        url: "/forgotPassword",
        templateUrl: "landing/public/views/forgotPassword.html",
        data: {
            pageTitle: "Review Analytics : Forgot Password ?"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "landing/public/js/controllers/forgotPassword.js?v=20190814" ]);
            }
        }
    });
} ]).run([ "$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$state = $state, $rootScope.$on("$stateChangeStart", function() {
        window.Pace && "function" == typeof window.Pace.restart && window.Pace.restart();
    });
} ]);