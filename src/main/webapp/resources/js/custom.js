jQuery(function($) {
    "use strict";
    var mainbottom = $("#main").offset().top;
    $(window).on("scroll", function() {
        stop = Math.round($(window).scrollTop()), stop > mainbottom ? ($(".navbar").addClass("past-main"), 
        $(".navbar").addClass("effect-main")) : $(".navbar").removeClass("past-main");
    }), $(document).on("click.nav", ".navbar-collapse.in", function(e) {
        $(e.target).is("a") && $(this).removeClass("in").addClass("collapse");
    }), $(window).scroll(function() {
        1e3 < $(this).scrollTop() ? $("#back-top").fadeIn() : $("#back-top").fadeOut();
    }), $("#back-top").on("click", function() {
        return $("#back-top").tooltip("hide"), $("body,html").animate({
            scrollTop: 0
        }, 1500), !1;
    }), $(".reviews").owlCarousel({
        slideSpeed: 200,
        items: 1,
        singleItem: !0,
        autoPlay: !0,
        pagination: !1
    }), $(".clients").owlCarousel({
        slideSpeed: 200,
        items: 5,
        singleItem: !1,
        autoPlay: !0,
        pagination: !1
    }), $(function() {
        $("a.page-scroll").bind("click", function(event) {
            var $anchor = $(this);
            $("html, body").stop().animate({
                scrollTop: $($anchor.attr("href")).offset().top
            }, 1500, "easeInOutExpo"), event.preventDefault();
        });
    }), new WOW().init(), $(".counter").counterUp({
        delay: 10,
        time: 1e3
    }), $.find("#countdown")[0] && ($("#countdown").countDown({
        targetDate: {
            day: 14,
            month: 7,
            year: 2017,
            hour: 11,
            min: 13,
            sec: 0
        },
        omitWeeks: !0
    }), "0" == $(".day_field .top").html() && $(".day_field").css("display", "none")), 
    $(window).load(function() {
        setTimeout(function() {
            $("#loading").fadeOut("slow", function() {});
        }, 3e3);
    }), $(".subscribe-form").submit(function(e) {
        e.preventDefault();
        var postdata = $(".subscribe-form").serialize();
        $.ajax({
            type: "POST",
            url: "assets/php/subscribe.php",
            data: postdata,
            dataType: "json",
            success: function(json) {
                0 == json.valid ? ($(".success-message").hide(), $(".error-message").hide(), $(".error-message").html(json.message), 
                $(".error-message").fadeIn("fast", function() {
                    $(".subscribe-form").addClass("animated flash").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("animated flash");
                    });
                })) : ($(".error-message").hide(), $(".success-message").hide(), $(".subscribe-form").hide(), 
                $(".success-message").html(json.message), $(".success-message").fadeIn("fast", function() {
                    $(".top-content").backstretch("resize");
                }));
            }
        });
    });
});