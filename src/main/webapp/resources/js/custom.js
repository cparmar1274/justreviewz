jQuery(function($) {
    "use strict";
    var mainbottom = $("#main").offset().top;
    $(window).on("scroll", function() {
        stop = Math.round($(window).scrollTop());
        if (stop > mainbottom) {
            $(".navbar").addClass("past-main");
            $(".navbar").addClass("effect-main");
        } else {
            $(".navbar").removeClass("past-main");
        }
    });
    $(document).on("click.nav", ".navbar-collapse.in", function(e) {
        if ($(e.target).is("a")) {
            $(this).removeClass("in").addClass("collapse");
        }
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1e3) {
            $("#back-top").fadeIn();
        } else {
            $("#back-top").fadeOut();
        }
    });
    $("#back-top").on("click", function() {
        $("#back-top").tooltip("hide");
        $("body,html").animate({
            scrollTop: 0
        }, 1500);
        return false;
    });
    $(".reviews").owlCarousel({
        slideSpeed: 200,
        items: 1,
        singleItem: true,
        autoPlay: true,
        pagination: false
    });
    $(".clients").owlCarousel({
        slideSpeed: 200,
        items: 5,
        singleItem: false,
        autoPlay: true,
        pagination: false
    });
    $(function() {
        $("a.page-scroll").bind("click", function(event) {
            var $anchor = $(this);
            $("html, body").stop().animate({
                scrollTop: $($anchor.attr("href")).offset().top
            }, 1500, "easeInOutExpo");
            event.preventDefault();
        });
    });
    new WOW().init();
    $(".counter").counterUp({
        delay: 10,
        time: 1e3
    });
    if ($.find("#countdown")[0]) {
        $("#countdown").countDown({
            targetDate: {
                day: 14,
                month: 7,
                year: 2017,
                hour: 11,
                min: 13,
                sec: 0
            },
            omitWeeks: true
        });
        if ($(".day_field .top").html() == "0") $(".day_field").css("display", "none");
    }
    $(window).load(function() {
        setTimeout(function() {
            $("#loading").fadeOut("slow", function() {});
        }, 3e3);
    });
    $(".subscribe-form").submit(function(e) {
        e.preventDefault();
        var postdata = $(".subscribe-form").serialize();
        $.ajax({
            type: "POST",
            url: "assets/php/subscribe.php",
            data: postdata,
            dataType: "json",
            success: function(json) {
                if (json.valid == 0) {
                    $(".success-message").hide();
                    $(".error-message").hide();
                    $(".error-message").html(json.message);
                    $(".error-message").fadeIn("fast", function() {
                        $(".subscribe-form").addClass("animated flash").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                            $(this).removeClass("animated flash");
                        });
                    });
                } else {
                    $(".error-message").hide();
                    $(".success-message").hide();
                    $(".subscribe-form").hide();
                    $(".success-message").html(json.message);
                    $(".success-message").fadeIn("fast", function() {
                        $(".top-content").backstretch("resize");
                    });
                }
            }
        });
    });
});