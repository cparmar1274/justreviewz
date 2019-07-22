jQuery(document).ready(function($) {
    var $lateral_menu_trigger = $(".nav-trigger"), $content_wrapper = $(".main");
    $lateral_menu_trigger.on("click", function(event) {
        event.preventDefault();
        $lateral_menu_trigger.toggleClass("is-active");
        $content_wrapper.toggleClass("is-active").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
            $("body").toggleClass("overflow-hidden");
        });
        $("#ar-about").toggleClass("is-active");
        if ($("html").hasClass("no-csstransitions")) {
            $("body").toggleClass("overflow-hidden");
        }
    });
    $content_wrapper.on("mouseover", function(event) {
        if (!$(event.target).is(".nav-trigger, .nav-trigger span")) {
            $lateral_menu_trigger.removeClass("is-active");
            $content_wrapper.removeClass("is-active").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                $("body").removeClass("overflow-hidden");
            });
            $("#ar-about").removeClass("is-active");
            if ($("html").hasClass("no-csstransitions")) {
                $("body").removeClass("overflow-hidden");
            }
        }
    });
});