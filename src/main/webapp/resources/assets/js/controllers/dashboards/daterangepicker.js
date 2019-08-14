$(document).ready(function() {
    $('input[name="mondayTimeFrame"]').daterangepicker({
        timePicker: !0,
        timePicker24Hour: !0,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    }), $('input[name="tuesdayTimeFrame"]').daterangepicker({
        timePicker: !0,
        timePicker24Hour: !0,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    }), $('input[name="wednesdayTimeFrame"]').daterangepicker({
        timePicker: !0,
        timePicker24Hour: !0,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    }), $('input[name="thursdayTimeFrame"]').daterangepicker({
        timePicker: !0,
        timePicker24Hour: !0,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    }), $('input[name="fridayTimeFrame"]').daterangepicker({
        timePicker: !0,
        timePicker24Hour: !0,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    }), $('input[name="saturdayTimeFrame"]').daterangepicker({
        timePicker: !0,
        timePicker24Hour: !0,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    }), $('input[name="sundayTimeFrame"]').daterangepicker({
        timePicker: !0,
        timePicker24Hour: !0,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    });
});