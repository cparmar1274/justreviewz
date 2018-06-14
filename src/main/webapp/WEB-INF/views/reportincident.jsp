<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">
<title>Review Manager - Dashboard</title>
<!-- Bootstrap core CSS-->
<link
	href="https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.7/angular-material.css"
	rel="stylesheet">
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>

<body ng-app="myapp">
	<div class="wrapper" ng-controller="ReportController">
		
		<div class="container" style="margin-top:1%">
		
		<div class="panel">
		  <div class="panel-heading">Bulk Reviews Upload</div>
			<div class="panel-body">
			<form name="bulkUpload" novalidate>
			<div class="form-group">
					<input type="file"
						onchange="angular.element(this).scope().reportVehicle.uploadFile(this.files)"
						class="form-control-file" id="exampleInputFile"
						aria-describedby="fileHelp"> <small id="fileHelp"
						class="form-text text-muted">Please upload incident
						related images If you have.</small>
				</div>
				<button type="submit" ng-disabled="bulkUpload.$invalid"
					ng-click="reportVehicle.bulkUpload()" class="btn btn-danger">Bulk Upload</button>
			</form></div>
			</div>
		
		
		    <div class="panel">
		    <div class="panel-heading">Single Review Upload</div>
			<div class="panel-body">
			<form name="myForm" novalidate>
				<div class="form-group">
					<div layout="row">
						<md-input-container class="md-block" flex-gt-sm=""> <input required
							type="text" name="vehicleNumber"
							onchange="angular.element(this).scope().reportVehicle.validateVehicleNumer()"
							ng-model="reportVehicle.clientUserName" class="form-control"
							id="exampleInputPassword1" placeholder="Enter Client Username"> </md-input-container>
						<md-input-container class="md-block" flex-gt-sm=""> <input required
							type="email" name="email" ng-model="reportVehicle.reporterEmail"
							class="form-control" id="exampleInputEmail1"
							aria-describedby="emailHelp" placeholder="Enter reviewer email"> </md-input-container>
					</div>
				</div>

				

				<div class="form-group">
					<div layout="row">

						<md-input-container class="md-block" flex-gt-sm="">
						<input required type="text" name="Address"
							ng-model="reportVehicle.address" class="form-control"
							id="exampleInputPassword2" placeholder="Address"> </md-input-container>

						<md-input-container class="md-block" flex-gt-sm="">
						<input required type="text" name="city"
							ng-model="reportVehicle.city" class="form-control"
							id="exampleInputPassword2" placeholder="City"> </md-input-container>

						<md-input-container class="md-block" flex-gt-sm="">
						<input required type="text" name="postal"
							ng-model="reportVehicle.postalCode" class="form-control"
							 placeholder="PostalCode"> </md-input-container>
							 
							 
						<md-input-container class="md-block" flex-gt-sm="">
						<md-select required ng-model="reportVehicle.selectedProvince"
							placeholder="Province"> <md-option
							ng-repeat="province in reportVehicle.province"
							value="{{province.name}}"> {{province.name}} </md-option> </md-select> 
						</md-input-container>

						<md-input-container class="md-block" flex-gt-sm="">
						<md-select required ng-model="reportVehicle.selectedCountry"
							placeholder="Country"> <md-option
							ng-repeat="country in reportVehicle.country"
							value="{{country.name}}"> {{country.name}} </md-option> </md-select> 
						</md-input-container>
					</div>
				</div>


				<div class="form-group"><div layout="row">
					<md-input-container class="md-block" flex-gt-sm="">
					<md-select required ng-model="reportVehicle.selected"
						id="exampleSelect2" placeholder="Rating"> <md-option
						ng-repeat="reason in reportVehicle.reasons"
						value="{{reason.stars}}"> {{reason.type}} </md-option> </md-select> </md-input-container>
					
					<md-input-container class="md-block" flex-gt-sm=""> <md-datepicker required
							ng-model="reportVehicle.incidentDate" aria-label="Incident Date"
							placeholder="Incident Date"></md-datepicker> </md-input-container>
				</div></div>
				<div class="form-group">
					<div layout="row">
						<md-input-container class="md-block" flex-gt-sm="">
						<textarea required class="form-control"
							ng-model="reportVehicle.incidentDescription" id="exampleTextarea"
							placeholder="Enter Review Content" rows="3"></textarea> </md-input-container>
					</div>
				</div>
				
				<button type="submit" ng-disabled="myForm.$invalid"
					ng-click="reportVehicle.reportIncident()" class="btn btn-danger">Add Review</button>
			</form>
			</div></div>
			
		</div>

		<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Ready to
							Leave?</h5>
						<button class="close" type="button" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div class="modal-body">Select "Logout" below if you are
						ready to end your current session.</div>
					<div class="modal-footer">
						<button class="btn btn-secondary" type="button"
							data-dismiss="modal">Cancel</button>
						<a class="btn btn-primary" href="../home/logout">Logout</a>
					</div>
				</div>

			</div>

		</div>

		<!-- Bootstrap core JavaScript-->
		<script
			src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.js"></script>
		<script
			src=" https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular-animate.min.js"></script>
		<script
			src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular-route.min.js"></script>
		<script
			src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular-aria.min.js"></script>
		<script
			src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular-messages.min.js"></script>
		<script
			src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-114/svg-assets-cache.js"></script>
		<script src="https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.7/angular-material.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="../js/addvehicle.js"></script>

	</div>

</body>

</html>