angular.module("myapp", [ "ngMaterial", "ngMessages" ]).controller("ReportController", function($scope, $sce, $window, $http, $httpParamSerializerJQLike, $timeout, $q) {
    var self = $scope;
    self.reportVehicle = {};
    self.reportVehicle.reporterEmail = "";
    self.reportVehicle.clientId = "";
    self.reportVehicle.reasons = [ {
        id: 1,
        type: "1 Star",
        stars: "1"
    }, {
        id: 2,
        type: "1.5 Star",
        stars: "1.5"
    }, {
        id: 3,
        type: "2 Star",
        stars: "2"
    }, {
        id: 4,
        type: "2.5 Star",
        stars: "2.5"
    }, {
        id: 5,
        type: "3 Star",
        stars: "3"
    }, {
        id: 6,
        type: "3.5 Star",
        stars: "3.5"
    }, {
        id: 7,
        type: "4 Star",
        stars: "4"
    }, {
        id: 8,
        type: "4.5 Star",
        stars: "4.5"
    }, {
        id: 9,
        type: "5 Star",
        stars: "5"
    } ];
    self.reportVehicle.selected = [];
    self.reportVehicle.incidentDescription = "";
    self.reportVehicle.incidentImage = null;
    self.reportVehicle.selectedProvince = [ {
        id: 1,
        name: "Ontario"
    } ];
    self.reportVehicle.province = [ {
        id: 1,
        name: "Ontario"
    }, {
        id: 2,
        name: "British Columbia"
    } ];
    self.reportVehicle.selectedCountry = [ {
        id: 1,
        name: "Canada"
    } ];
    self.reportVehicle.country = [ {
        id: 1,
        name: "Canada"
    }, {
        id: 3,
        name: "USA"
    } ];
    self.reportVehicle.address = "";
    self.reportVehicle.city = "";
    self.reportVehicle.postalCode = "";
    self.reportVehicle.incidentDate = null;
    self.reportVehicle.uploadFile = function(files) {
        console.log("Selected File", files);
        self.reportVehicle.incidentImage = files[0];
    };
    self.reportVehicle.bulkUpload = function() {
        var fd = new FormData();
        fd.append("file", self.reportVehicle.incidentImage);
        $http.post("bulkUpload", fd, {
            withCredentials: true,
            headers: {
                "Content-Type": undefined
            },
            transformRequest: angular.identity
        }).success(function(data, status, headers, config) {});
    };
    self.reportVehicle.reportIncident = function() {
        var params = {
            clientId: self.reportVehicle.clientUserName,
            postedEmail: self.reportVehicle.reporterEmail,
            postedDate: self.reportVehicle.incidentDate,
            totalStars: self.reportVehicle.selected,
            reviewContent: self.reportVehicle.incidentDescription,
            address: self.reportVehicle.address,
            city: self.reportVehicle.city,
            postalCode: self.reportVehicle.postalCode,
            province: self.reportVehicle.selectedProvince,
            country: self.reportVehicle.country
        };
        $http.post("reportIncident", params).then(function(response) {
            console.log(response);
        });
    };
});