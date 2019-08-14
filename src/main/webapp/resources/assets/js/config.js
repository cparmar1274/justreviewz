(function() {
    function config($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $urlRouterProvider.otherwise("/dashboards");
        $locationProvider.hashPrefix("!");
        $ocLazyLoadProvider.config({
            debug: false
        });
        $stateProvider.state("dashboards", {
            abstract: true,
            url: "/dashboards",
            templateUrl: "../landing/assets/views/common/layout.html"
        }).state("dashboards.default", {
            url: "",
            templateUrl: "../landing/assets/views/dashboards/default.html",
            data: {
                pageTitle: "Dashboard"
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([ "../landing/assets/js/controllers/dashboards/default.js?v=20190814", {
                        serie: true,
                        name: "angular-morris",
                        files: [ "../landing/js/libs/raphael.js?v=20190814", "../landing/js/libs/morris.js?v=20190814", "../landing/js/pixeladmin/directives/angular-morris.js?v=20190814" ]
                    }, {
                        serie: true,
                        name: "datatables",
                        files: [ "../landing/js/libs/jquery.dataTables.js?v=20190814", "../landing/js/libs/dataTables.bootstrap.js?v=20190814", "../landing/js/pixeladmin/extensions/datatables.js?v=20190814", "../landing/js/libs/angular-datatables.js?v=20190814" ]
                    }, {
                        name: "px-tab-resize",
                        files: [ "../landing/js/pixeladmin/plugins/px-tab-resize.js?v=20190814", "../landing/js/pixeladmin/directives/angular-px-tab-resize.js?v=20190814" ]
                    } ]);
                }
            }
        }).state("dashboards.analytics", {
            url: "/analytics",
            templateUrl: "../landing/assets/views/dashboards/analytics.html",
            data: {
                pageTitle: "Analytics - Dashboards"
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([ "../landing/assets/js/controllers/dashboards/analytics.js?v=20190814", {
                        serie: true,
                        name: "px-sparkline",
                        files: [ "../landing/js/libs/jquery.sparkline.js?v=20190814", "../landing/js/pixeladmin/plugins/px-sparkline.js?v=20190814", "../landing/js/pixeladmin/directives/angular-px-sparkline.js?v=20190814" ]
                    }, {
                        serie: true,
                        name: "gridshore.c3js.chart",
                        files: [ "../landing/js/libs/d3.js?v=20190814", "../landing/js/libs/c3.js?v=20190814", "../landing/js/libs/c3-angular.js?v=20190814" ]
                    } ]);
                }
            }
        }).state("dashboards.competitor", {
            url: "/competitor",
            templateUrl: "../landing/assets/views/dashboards/competitor.html",
            data: {
                pageTitle: "Financial - Dashboards"
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([ "../landing/assets/js/controllers/dashboards/competitor.js?v=20190814", {
                        serie: true,
                        name: "chart.js?v=20190814",
                        files: [ "../landing/js/libs/Chart.js?v=20190814", "../landing/js/libs/angular-chart.js?v=20190814" ]
                    }, {
                        serie: true,
                        name: "px-sparkline",
                        files: [ "../landing/js/libs/jquery.sparkline.js?v=20190814", "../landing/js/pixeladmin/plugins/px-sparkline.js?v=20190814", "../landing/js/pixeladmin/directives/angular-px-sparkline.js?v=20190814" ]
                    } ]);
                }
            }
        }).state("dashboards.performer", {
            url: "/performer",
            templateUrl: "../landing/assets/views/dashboards/performer.html",
            data: {
                pageTitle: "Financial - Dashboards"
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([ "../landing/assets/js/controllers/dashboards/performer.js?v=20190814", {
                        serie: true,
                        name: "chart.js?v=20190814",
                        files: [ "../landing/js/libs/Chart.js?v=20190814", "../landing/js/libs/angular-chart.js?v=20190814" ]
                    }, {
                        serie: true,
                        name: "px-sparkline",
                        files: [ "../landing/js/libs/jquery.sparkline.js?v=20190814", "../landing/js/pixeladmin/plugins/px-sparkline.js?v=20190814", "../landing/js/pixeladmin/directives/angular-px-sparkline.js?v=20190814" ]
                    } ]);
                }
            }
        }).state("dashboards.weekly-report", {
            url: "/weeklyReport",
            templateUrl: "../landing/assets/views/dashboards/weeklyReport.html",
            data: {
                pageTitle: "Weekly Report - Dashboards"
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([ "../landing/assets/js/controllers/dashboards/weeklyReport.js?v=20190814" ]);
                }
            }
        }).state("dashboards.promote-business", {
            url: "/promoteBusiness",
            templateUrl: "../landing/assets/views/dashboards/promoteBusiness.html",
            data: {
                pageTitle: "Promote Business - Dashboards"
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([ "../landing/assets/js/controllers/dashboards/promoteBusiness.js?v=20190814", {
                        serie: true,
                        name: "datatables",
                        files: [ "../landing/js/libs/jquery.dataTables.js?v=20190814", "../landing/js/libs/dataTables.bootstrap.js?v=20190814", "../landing/js/pixeladmin/extensions/datatables.js?v=20190814", "../landing/js/libs/angular-datatables.js?v=20190814" ]
                    }, "../landing/js/libs/daterangepicker.js" ]);
                }
            }
        });
        $stateProvider.state("pages", {
            abstract: true,
            url: "/pages",
            templateUrl: "../landing/assets/views/common/layout.html"
        }).state("pages.search-results", {
            url: "/reviews/:searchText",
            templateUrl: "../landing/assets/views/pages/search-results.html",
            data: {
                pageTitle: "Search results - Pages"
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([ "../landing/assets/js/controllers/pages/search-results.js?v=20190814", {
                        serie: true,
                        name: "angular-morris",
                        files: [ "../landing/js/libs/raphael.js?v=20190814", "../landing/js/libs/morris.js?v=20190814", "../landing/js/pixeladmin/directives/angular-morris.js?v=20190814" ]
                    }, {
                        name: "px-tab-resize",
                        files: [ "../landing/js/pixeladmin/plugins/px-tab-resize.js?v=20190814", "../landing/js/pixeladmin/directives/angular-px-tab-resize.js?v=20190814" ]
                    } ]);
                }
            }
        }).state("pages.queries", {
            url: "/queries",
            templateUrl: "../landing/assets/views/pages/queries.html",
            data: {
                pageTitle: "Search Queires"
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([ "../landing/assets/js/controllers/pages/search-results.js?v=20190814" ]);
                }
            }
        }).state("pages.account", {
            url: "/account",
            templateUrl: "../landing/assets/views/pages/account.html",
            data: {
                pageTitle: "Account - Pages"
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([ "../landing/assets/js/controllers/dashboards/account.js?v=20190814", {
                        name: "px-tab-resize",
                        files: [ "../landing/js/pixeladmin/plugins/px-tab-resize.js?v=20190814", "../landing/js/pixeladmin/directives/angular-px-tab-resize.js?v=20190814" ]
                    }, {
                        name: "angular-px-char-limit",
                        files: [ "../landing/js/pixeladmin/plugins/px-char-limit.js?v=20190814", "../landing/js/pixeladmin/directives/angular-px-char-limit.js?v=20190814" ]
                    }, {
                        serie: true,
                        name: "datatables",
                        files: [ "../landing/js/libs/jquery.dataTables.js?v=20190814", "../landing/js/libs/dataTables.bootstrap.js?v=20190814", "../landing/js/pixeladmin/extensions/datatables.js?v=20190814", "../landing/js/libs/angular-datatables.js?v=20190814" ]
                    }, "../landing/js/libs/daterangepicker.js" ]);
                }
            }
        }).state("pages.action-items", {
            url: "/actoinitems/",
            templateUrl: "../landing/assets/views/pages/action-items.html",
            data: {
                pageTitle: "Search results - Pages"
            },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([ "../landing/assets/js/controllers/dashboards/actionItems.js?v=20190814", {
                        serie: true,
                        name: "angular-morris",
                        files: [ "../landing/js/libs/raphael.js?v=20190814", "../landing/js/libs/morris.js?v=20190814", "../landing/js/pixeladmin/directives/angular-morris.js?v=20190814" ]
                    }, {
                        name: "px-tab-resize",
                        files: [ "../landing/js/pixeladmin/plugins/px-tab-resize.js?v=20190814", "../landing/js/pixeladmin/directives/angular-px-tab-resize.js?v=20190814" ]
                    } ]);
                }
            }
        }).state("pages.support-center", {
            url: "/help",
            templateUrl: "../landing/assets/views/pages/support-center.html",
            data: {
                pageTitle: "Support Center - Pages"
            }
        }).state("pages.blank", {
            url: "/blank",
            templateUrl: "../landing/assets/views/pages/blank.html",
            data: {
                pageTitle: "Blank - Pages"
            }
        });
        $stateProvider.state("errors", {
            abstract: true,
            url: "/errors",
            templateUrl: "../landing/assets/views/common/layout-blank.html"
        }).state("errors.404", {
            url: "/404",
            templateUrl: "../landing/assets/views/pages/errors/404.html",
            data: {
                pageTitle: "404 - Pages"
            }
        }).state("errors.500", {
            url: "/500",
            templateUrl: "../landing/assets/views/pages/errors/500.html",
            data: {
                pageTitle: "500 - Pages"
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