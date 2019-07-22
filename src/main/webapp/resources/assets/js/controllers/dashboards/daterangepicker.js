$(document).ready(function() {
    $('input[name="mondayTimeFrame"]').daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    });
    $('input[name="tuesdayTimeFrame"]').daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    });
    $('input[name="wednesdayTimeFrame"]').daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    });
    $('input[name="thursdayTimeFrame"]').daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    });
    $('input[name="fridayTimeFrame"]').daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    });
    $('input[name="saturdayTimeFrame"]').daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    });
    $('input[name="sundayTimeFrame"]').daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 1,
        locale: {
            format: "HH:mm"
        }
    }).on("show.daterangepicker", function(ev, picker) {
        picker.container.find(".calendar-table").hide();
    });
});