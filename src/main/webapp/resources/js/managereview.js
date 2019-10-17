function format(d) {
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;"><tr><td>Rating</td><td>' + d.totalStars + "</td></tr><tr><td>Posted By</td><td>" + d.postedBy + '</td></tr><tr><td>Email</td><td>And any further details here (images etc)...</td></tr><tr><td></td><td><button type="button" class="btn btn-success btn-sm">Reply Review</button><button type="button" class="btn btn-success btn-sm">Send Discount</button></td></tr></table>';
}

$(document).ready(function() {
    var ctxL = document.getElementById("lineChart").getContext("2d"), ctxP = (new Chart(ctxL, {
        type: "line",
        data: {
            labels: [ "January", "February", "March", "April", "May", "June", "July" ],
            datasets: [ {
                label: "Overall Rating",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [ 65, 59, 80, 81, 56, 55, 40 ]
            }, {
                label: "Google",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [ 28, 48, 40, 19, 86, 27, 90 ]
            }, {
                label: "Facebook",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [ 12, 65, 4, 17, 6, 32, 78 ]
            }, {
                label: "Yelp",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [ 3, 76, 12, 90, 43, 67, 50 ]
            } ]
        },
        options: {
            responsive: !0
        }
    }), document.getElementById("pieChart").getContext("2d")), table = (new Chart(ctxP, {
        type: "doughnut",
        data: {
            labels: [ "Positive", "Negative", "Neutral" ],
            datasets: [ {
                data: [ 300, 50, 100 ],
                backgroundColor: [ "#46BFBD", "#F7464A", "#FDB45C" ],
                hoverBackgroundColor: [ "#5AD3D1", "#FF5A5E", "#FFC870" ]
            } ]
        },
        options: {
            responsive: !0
        }
    }), $("#example").DataTable({
        processing: !0,
        serverSide: !0,
        ajax: {
            url: "getReviews",
            dataType: "json"
        },
        columns: [ {
            className: "details-control",
            orderable: !1,
            data: null,
            defaultContent: ""
        }, {
            data: "reviewContent"
        }, {
            data: "postedDate",
            type: "date"
        }, {
            data: "totalStars"
        } ],
        order: [ [ 2, "asc" ] ]
    }));
    $("#example tbody").on("click", "td.details-control", function() {
        var tr = $(this).closest("tr"), row = table.row(tr);
        row.child.isShown() ? (row.child.hide(), tr.removeClass("shown")) : (row.child(format(row.data())).show(), 
        tr.addClass("shown"));
    });
});