  /* Formatting function for row details - modify as you need */
  function format(d) {
      return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
          '<tr>' +
          '<td>Rating</td>' +
          '<td>' + d.totalStars + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td>Posted By</td>' +
          '<td>' + d.postedBy + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td>Email</td>' +
          '<td>And any further details here (images etc)...</td>' +
          '</tr>' +
          '<tr>' +
          '<td></td>' +
          '<td><button type="button" class="btn btn-success btn-sm">Reply Review</button>' +
          '<button type="button" class="btn btn-success btn-sm">Send Discount</button></td>' +
          '</tr>' +
          '</table>';
  }

  $(document).ready(function() {

      //line
      var ctxL = document.getElementById("lineChart").getContext('2d');
      var myLineChart = new Chart(ctxL, {
          type: 'line',
          data: {
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [{
                  label: "Overall Rating",
                 // fillColor: "rgba(220,220,220,0.2)",
                  strokeColor: "rgba(220,220,220,1)",
                  pointColor: "rgba(220,220,220,1)",
                  pointStrokeColor: "#fff",
               //   pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(220,220,220,1)",
                  data: [65, 59, 80, 81, 56, 55, 40]
              }, {
                  label: "Google",
                //  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                 // pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: [28, 48, 40, 19, 86, 27, 90]
              }, {
                  label: "Facebook",
                //  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                //  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: [12, 65, 4, 17, 6, 32, 78]
              }, {
                  label: "Yelp",
               //   fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                //  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: [3, 76, 12, 90, 43, 67, 50]
              }]
          },
          options: {
              responsive: true
          }
      });

      //pie
      var ctxP = document.getElementById("pieChart").getContext('2d');
      var myPieChart = new Chart(ctxP, {
          type: 'doughnut',
          data: {
              labels: ["Positive", "Negative", "Neutral"],
              datasets: [{
                  data: [300, 50, 100],
                  backgroundColor: ["#46BFBD", "#F7464A", "#FDB45C"],
                  hoverBackgroundColor: ["#5AD3D1", "#FF5A5E", "#FFC870"]
              }]
          },
          options: {
              responsive: true
          }
      });

      var table = $('#example').DataTable({
          "processing": true,
          "serverSide": true,
          "ajax": {
              "url": "getReviews",
              "dataType": "json"
          },
          "columns": [{
              "className": 'details-control',
              "orderable": false,
              "data": null,
              "defaultContent": ''
          }, {
              "data": "reviewContent"
          }, {
              "data": "postedDate",
              "type": "date"
          },{
              "data": "totalStars"
              
          }],
          "order": [
              [2, 'asc']
          ]

      });

      // Add event listener for opening and closing details
      $('#example tbody').on('click', 'td.details-control', function() {
          var tr = $(this).closest('tr');
          var row = table.row(tr);

          if (row.child.isShown()) {
              // This row is already open - close it
              row.child.hide();
              tr.removeClass('shown');
          } else {
              // Open this row
              row.child(format(row.data())).show();
              tr.addClass('shown');
          }
      });

  });