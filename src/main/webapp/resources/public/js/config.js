(function() {
    function config($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $urlRouterProvider.otherwise("/login");
        $locationProvider.hashPrefix("!");
        $ocLazyLoadProvider.config({
            debug: false
        });
        $stateProvider.state("pages", {
            abstract: true,
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
                    return $ocLazyLoad.load([ "landing/public/js/controllers/main.js?v=20190719" ]);
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
                    return $ocLazyLoad.load([ "landing/public/js/controllers/requestOnboarding.js?v=20190719", {
                        name: "ui.select",
                        files: [ "landing/js/libs/select.js?v=20190719" ]
                    }, {
                        name: "px-file",
                        files: [ "landing/js/pixeladmin/plugins/px-file.js?v=20190719", "landing/js/pixeladmin/directives/angular-px-file.js?v=20190719" ]
                    }, {
                        name: "px-wizard",
                        files: [ "landing/js/pixeladmin/plugins/px-wizard.js?v=20190719", "landing/js/pixeladmin/directives/angular-px-wizard.js?v=20190719" ]
                    }, {
                        name: "angular-maskedinput",
                        files: [ "landing/js/libs/jquery.maskedinput.js?v=20190719", "landing/js/pixeladmin/directives/angular-maskedinput.js?v=20190719" ]
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
                    return $ocLazyLoad.load([ "landing/public/js/controllers/forgotPassword.js?v=20190719" ]);
                }
            }
        });
    }
    function run($rootScope, $state) {
        $rootScope.$state = $state;
        $rootScope.$on("$stateChangeStart", function() {
            if (window.Pace && typeof window.Pace.restart === "function") {
                window.Pace.restart();
            }
        });
    }
    angular.module("pixeladmin").config([ "$stateProvider", "$locationProvider", "$urlRouterProvider", "$ocLazyLoadProvider", config ]).run([ "$rootScope", "$state", run ]);
})();