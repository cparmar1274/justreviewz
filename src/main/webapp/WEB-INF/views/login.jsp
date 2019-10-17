<!DOCTYPE html>

<html ng-app="pixeladmin">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  <meta name="Description" content="Just Reviewz Inc. Revolutionary Platform to Share your feedback. We want you to Get Compensated and Businesses to Succeed.">
  <title page-title> Just Reviewz Inc.</title>
  <meta name="author" content=" Just Reviewz Inc.">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&subset=latin" rel="stylesheet" type="text/css">
    <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">


  
		<link rel="apple-touch-icon" sizes="76x76" href="public/fevicon/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="public/fevicon/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="public/fevicon/favicon-16x16.png">
		<link rel="manifest" href="public/fevicon/site.webmanifest">
		<link rel="mask-icon" href="public/fevicon/safari-pinned-tab.svg" color="#5bbad5">
		<meta name="msapplication-TileColor" content="#da532c">
		<meta name="theme-color" content="#ffffff">

     <link href="https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.7/angular-material.css" rel="stylesheet">
    <link href="landing/css/bootstrap.min.css" rel="stylesheet">
    <link href="landing/css/pixeladmin.min.css" rel="stylesheet">
    <link href="landing/css/widgets.min.css" rel="stylesheet">
    <link href="landing/css/themes/frost.min.css" rel="stylesheet">




  <!-- Pace.js -->
  <script src="landing/js/pace/pace.min.js"></script>
</head>
<!-- ControllerAs syntax -->
<body ng-controller="MainCtrl as main">
  <!-- Main view -->
  <!-- You can use current state name for better customization -->
  <span ng-hide="true" id="error">${error}</span>
  <span ng-hide="true" id="logout">${logout}</span>
  <ui-view class="{{ $state.current.name }}"></ui-view>
 
  <!-- ==============================================================================
  |
  |  SCRIPTS
  |
  =============================================================================== -->

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

  <!-- General scripts -->
  <script src="landing/js/angular.js?v=20190814"></script>
  <script src="landing/js/bootstrap.js?v=20190814"></script>
  <script src="landing/js/ui-bootstrap.js?v=20190814"></script>
  <script src="landing/js/pixeladmin/util.js?v=20190814"></script>
  <script src="landing/js/pixeladmin/pixeladmin.js?v=20190814"></script>

  <!-- Perfect scrollbar -->
  <script src="landing/js/libs/perfect-scrollbar.jquery.js?v=20190814"></script>
  <script src="landing/js/pixeladmin/extensions/perfect-scrollbar.jquery.js?v=20190814"></script>
  <script src="landing/js/libs/angular-perfect-scrollbar.js?v=20190814"></script>

  <!-- PxNavbar, PxNav and PxFooter -->
  <script src="landing/js/pixeladmin/plugins/px-navbar.js?v=20190814"></script>
  <script src="landing/js/pixeladmin/directives/angular-px-navbar.js?v=20190814"></script>
  <script src="landing/js/pixeladmin/plugins/px-nav.js?v=20190814"></script>
  <script src="landing/js/pixeladmin/directives/angular-px-nav.js?v=20190814"></script>
  <script src="landing/js/pixeladmin/plugins/px-footer.js?v=20190814"></script>
  <script src="landing/js/pixeladmin/directives/angular-px-footer.js?v=20190814"></script>
  
<script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-animate.min.js'></script>
<script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-aria.min.js'></script>
<script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-messages.min.js'></script>
<script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.8/angular-material.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-cookies.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>

  <!-- Application -->
  <script src="landing/public/js/app.js?v=20190814"></script>
  <script src="landing/public/js/config.js?v=20190814"></script>
  <script src="landing/public/js/directives.js?v=20190814"></script>
  <script src="landing/public/js/controllers/main.js?v=20190814"></script>

</body>
</html>
