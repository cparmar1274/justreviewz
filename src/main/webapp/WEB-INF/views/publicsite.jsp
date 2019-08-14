<!DOCTYPE html>

<html ng-app="pixeladmin">

<head>
	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
	  <meta name="Description" content="Just Reviewz Inc.Find Business. Write Reviews. Ask Question to business. Get notified for lastest Promotions.">
	  <title page-title> Just Reviewz Inc.</title>
	  <meta name="author" content=" Just Reviewz Inc.">
	  
	  
		<link rel="apple-touch-icon" sizes="76x76" href="public/fevicon/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="public/fevicon/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="public/fevicon/favicon-16x16.png">
		<link rel="manifest" href="public/fevicon/site.webmanifest">
		<link rel="mask-icon" href="public/fevicon/safari-pinned-tab.svg" color="#5bbad5">
		<meta name="msapplication-TileColor" content="#da532c">
		<meta name="theme-color" content="#ffffff">
	  
	    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&subset=latin" rel="stylesheet" type="text/css">
	    <link href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
	  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
	
	    <link href="http://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.7/angular-material.css" rel="stylesheet">
	
	    <link href="css/bootstrap.min.css?v=20190814" rel="stylesheet">
	    <link href="css/pixeladmin.min.css?v=20190814" rel="stylesheet">
	    <link href="css/widgets.min.css?v=20190814" rel="stylesheet">
	    <link href="css/themes/frost.min.css?v=20190814" rel="stylesheet">
	
	    <!-- Theme -->
	<link href="css/yellowstars.css?v=20190814" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="css/landingpage.css" >
	<!-- Pace.js -->
	   <script src="js/pace/pace.min.js?v=20190814"></script>
	<link href='https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css' rel='stylesheet' />
	<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.0/mapbox-gl-directions.css' type='text/css' />
	
</head>
<!-- ControllerAs syntax -->

<body ng-controller="MainCtrl as main" >
    <!-- Main view -->
    <ui-view class="px-navbar-fixed">
    </ui-view>
    <!-- ==============================================================================
  |
  |  SCRIPTS
  |
  =============================================================================== -->
    <!-- General scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/angular.js?v=20190814"></script>
    <script src="js/bootstrap.js?v=20190814"></script>
    <script src="js/ui-bootstrap.js?v=20190814"></script>
    <script src="js/pixeladmin/util.js?v=20190814"></script>
    <script src="js/pixeladmin/pixeladmin.js?v=20190814"></script>

    <!-- Perfect scrollbar -->
    <script src="js/libs/perfect-scrollbar.jquery.js?v=20190814"></script>
    <script src="js/pixeladmin/extensions/perfect-scrollbar.jquery.js?v=20190814"></script>
    <script src="js/libs/angular-perfect-scrollbar.js?v=20190814"></script>
    
    <script src="js/libs/owl.carousel.js?v=20190814"></script>

    <!-- PxNavbar, PxNav and PxFooter -->
    <script src="js/pixeladmin/plugins/px-navbar.js?v=20190814"></script>
    <script src="js/pixeladmin/directives/angular-px-navbar.js?v=20190814"></script>
    <script src="js/pixeladmin/plugins/px-nav.js?v=20190814"></script>
    <script src="js/pixeladmin/directives/angular-px-nav.js?v=20190814"></script>
    <script src="js/pixeladmin/plugins/px-footer.js?v=20190814"></script>
    <script src="js/pixeladmin/directives/angular-px-footer.js?v=20190814"></script>
    
    <!-- Moments.-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js">
    </script>

    <script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-animate.min.js'></script>
    <script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-aria.min.js'></script>
    <script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-messages.min.js'></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.8/angular-material.min.js"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-cookies.js"></script>
	
    <script src='https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.js'></script>
    <script src='https://unpkg.com/es6-promise@4.2.4/dist/es6-promise.auto.min.js'></script>
	<script src="https://unpkg.com/@mapbox/mapbox-sdk/umd/mapbox-sdk.min.js"></script>
	<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.0/mapbox-gl-directions.js'></script>
	
	
    <!-- Application -->
    <script src="public/js/app.js?v=20190814"></script>
    <script src="public/js/publicsite-config.js?v=20190814"></script>
    <script src="public/js/directives.js?v=20190814"></script>
    <script src="public/js/controllers/main.js?v=20190814"></script>
</body>

</html>