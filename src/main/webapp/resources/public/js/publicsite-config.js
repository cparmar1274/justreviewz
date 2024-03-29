angular.module("pixeladmin").config([ "$stateProvider", "$locationProvider", "$urlRouterProvider", "$ocLazyLoadProvider", function($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/public"), $locationProvider.hashPrefix("!"), $ocLazyLoadProvider.config({
        debug: !1
    }), $stateProvider.state("public", {
        abstract: !0,
        url: "/public",
        templateUrl: "public/views/common/layout.html"
    }).state("public.landing", {
        url: ":index",
        templateUrl: "public/views/landing.html",
        data: {
            pageTitle: "Just Reviewz : Landing Page"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "public/js/controllers/landing.js?v=20190814" ]);
            }
        }
    }).state("public.howitworks", {
        url: "/howitworks",
        templateUrl: "public/views/maintenance.html",
        data: {
            pageTitle: "Just Reviewz : How it works"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "public/js/controllers/landing.js?v=20190814" ]);
            }
        }
    }).state("public.background", {
        url: "/background",
        templateUrl: "public/views/background.html",
        data: {
            pageTitle: "Just Reviewz : Background"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "public/js/controllers/landing.js?v=20190814" ]);
            }
        }
    }).state("public.faqs", {
        url: "/faqs",
        templateUrl: "public/views/faqs.html",
        data: {
            pageTitle: "Just Reviewz : FAQs"
        }
    }).state("public.registerBusiness", {
        url: "/registerBusiness",
        templateUrl: "public/views/registerBusiness.html",
        data: {
            pageTitle: "Just Reviewz : Register Business"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "public/js/controllers/registerBusiness.js?v=20190814" ]);
            }
        }
    }).state("public.registerProduct", {
        url: "/registerProduct",
        templateUrl: "public/views/registerProduct.html",
        data: {
            pageTitle: "Just Reviewz : Register Product"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "public/js/controllers/registerBusiness.js?v=20190814" ]);
            }
        }
    }).state("public.register", {
        url: "/requestOnboarding",
        templateUrl: "public/views/newaccount.html",
        data: {
            pageTitle: "Just Reviewz : Request Onboarding"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "public/js/controllers/requestOnboarding.js?v=20190814", {
                    name: "ui.select",
                    files: [ "js/libs/select.js?v=20190814" ]
                }, {
                    name: "px-file",
                    files: [ "js/pixeladmin/plugins/px-file.js?v=20190814", "js/pixeladmin/directives/angular-px-file.js?v=20190814" ]
                }, {
                    name: "px-wizard",
                    files: [ "js/pixeladmin/plugins/px-wizard.js?v=20190814", "js/pixeladmin/directives/angular-px-wizard.js?v=20190814" ]
                }, {
                    name: "angular-maskedinput",
                    files: [ "js/libs/jquery.maskedinput.js?v=20190814", "js/pixeladmin/directives/angular-maskedinput.js?v=20190814" ]
                } ]);
            }
        }
    }).state("public.main", {
        url: "/business/:clientId",
        templateUrl: "public/views/public.html",
        data: {
            pageTitle: "Just Reviewz : Authenticate"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "public/js/controllers/main.js?v=20190814", "public/js/controllers/public.js?v=20190814" ]);
            }
        }
    }).state("public.product", {
        url: "/product/:productId",
        templateUrl: "public/views/product.html",
        data: {
            pageTitle: "Just Reviewz : Authenticate"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "public/js/controllers/product.js?v=20190814" ]);
            }
        }
    }).state("public.writeReview", {
        url: "/writeReview/:type/:clientId",
        templateUrl: "public/views/writeReview.html",
        data: {
            pageTitle: "Write Review"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "public/js/controllers/main.js?v=20190814", "public/js/controllers/writeReview.js?v=20190814" ]);
            }
        }
    }).state("public.writeAsk", {
        url: "/writeAsk/:type/:clientId/:answer/:queryId/:question",
        templateUrl: "public/views/writeAsk.html",
        data: {
            pageTitle: "Ask"
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([ "public/js/controllers/main.js?v=20190814", "public/js/controllers/writeAsk.js?v=20190814" ]);
            }
        }
    });
} ]).run([ "$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$state = $state, $rootScope.$on("$stateChangeStart", function() {
        window.Pace && "function" == typeof window.Pace.restart && window.Pace.restart();
    });
} ]);