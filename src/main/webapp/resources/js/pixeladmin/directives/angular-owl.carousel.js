function owlCarouselDirective(e, o) {
    "use strict";
    var a = [ "items", "loop", "center", "mouseDrag", "touchDrag", "pullDrag", "freeDrag", "merge", "mergeFit", "autoWidth", "startPosition", "urlHashListener", "nav", "rewind", "navText", "slideBy", "dots", "dotsEach", "dotData", "lazyLoad", "lazyContent", "autoplay", "autoplayTimeout", "autoplayHoverPause", "smartSpeed", "fluidSpeed", "autoplaySpeed", "navSpeed", "dotsSpeed", "dragEndSpeed", "responsive", "responsiveRefreshRate", "video", "videoHeight", "videoWidth", "autoHeight", "autoHeightClass" ], t = [ "margin", "stagePadding", "navElement", "responsiveBaseElement", "animateOut", "animateIn", "fallbackEasing", "info", "nestedItemSelector", "itemElement", "stageElement", "navContainer", "dotsContainer", "rtl" ], n = [ "onInitialize", "onInitialized", "onResize", "onResized", "onRefresh", "onRefreshed", "onDrag", "onDragged", "onTranslate", "onTranslated", "onChange", "onChanged", "onLoadLazy", "onLoadedLazy", "onStopVideo", "onPlayVideo" ], r = [ "refresh", "next", "prev", "to", "replace", "add", "remove", "play", "stop" ];
    return {
        restrict: "E",
        replace: !0,
        transclude: !0,
        template: '<div class="owl-carousel" ng-transclude />',
        scope: {
            items: "=",
            loop: "=",
            center: "=",
            mouseDrag: "=",
            touchDrag: "=",
            pullDrag: "=",
            freeDrag: "=",
            merge: "=",
            mergeFit: "=",
            autoWidth: "=",
            startPosition: "=",
            UrlHashListener: "=",
            nav: "=",
            rewind: "=",
            navText: "=",
            slideBy: "=",
            dots: "=",
            dotsEach: "=",
            dotData: "=",
            lazyLoad: "=",
            lazyContent: "=",
            autoplay: "=",
            autoplayTimeout: "=",
            autoplayHoverPause: "=",
            smartSpeed: "=",
            fluidSpeed: "=",
            autoplaySpeed: "=",
            navSpeed: "=",
            dotsSpeed: "=",
            dragEndSpeed: "=",
            responsive: "=",
            responsiveRefreshRate: "=",
            video: "=",
            videoHeight: "=",
            videoWidth: "=",
            autoHeight: "=",
            autoHeightClass: "="
        },
        link: function(i, s, d) {
            function l() {
                a.forEach(function(e) {
                    void 0 !== i[e] ? u[e] = i[e] : delete u[e];
                }), s.owlCarousel(u);
            }
            var u = {}, p = {}, c = d.methods ? o(d.methods).assign : angular.noop;
            t.forEach(function(e) {
                void 0 !== d[e] && (u[e] = o(d[e])(i.$parent));
            }), r.forEach(function(e) {
                p[e] = function(o) {
                    var a = "play" === e || "stop" === e ? "autoplay" : "carousel";
                    s.trigger(e + ".owl." + a, o);
                };
            }), n.forEach(function(e) {
                d[e] && (u[e] = o(d[e])(i.$parent));
            }), c(i.$parent, p), e(function() {
                l(), a.forEach(function(e) {
                    i.$watch(e, function(e, o) {
                        void 0 !== e && e !== o && (s.trigger("destroy.owl.carousel"), l());
                    });
                }), s.on("$destroy", function() {
                    return s.trigger("destroy.owl.carousel");
                });
            });
        }
    };
}

angular.module("owl.carousel", []).directive("owlCarousel", [ "$timeout", "$parse", owlCarouselDirective ]);