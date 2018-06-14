<!DOCTYPE html>

<html ng-app="pixeladmin">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

  <title page-title></title>

  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,600,700,300&subset=latin" rel="stylesheet" type="text/css">
  <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
  <style type="text/css">
   .yellow_star{color:gold; !important}
    .red_star{color:red; !important}
   .blank_star{color:#999; !important}
  </style>
  <!-- DEMO ONLY: Function for the proper stylesheet loading according to the demo settings -->
  <script>function _pxDemo_loadStylesheet(a,b,c){var c=c||decodeURIComponent((new RegExp(";\\s*"+encodeURIComponent("px-demo-theme")+"\\s*=\\s*([^;]+)\\s*;","g").exec(";"+document.cookie+";")||[])[1]||"clean"),d="rtl"===document.getElementsByTagName("html")[0].getAttribute("dir");document.write(a.replace(/^(.*?)((?:\.min)?\.css)$/,'<link href="$1'+(c.indexOf("dark")!==-1&&a.indexOf("/css/")!==-1&&a.indexOf("/themes/")===-1?"-dark":"")+(!d||0!==a.indexOf("../css")&&0!==a.indexOf("../demo")?"":".rtl")+'$2" rel="stylesheet" type="text/css"'+(b?'class="'+b+'"':"")+">"))}</script>

  <!-- DEMO ONLY: Set RTL direction -->
  <script>"ltr"!==document.getElementsByTagName("html")[0].getAttribute("dir")&&"1"===decodeURIComponent((new RegExp(";\\s*"+encodeURIComponent("px-demo-rtl")+"\\s*=\\s*([^;]+)\\s*;","g").exec(";"+document.cookie+";")||[])[1]||"0")&&document.getElementsByTagName("html")[0].setAttribute("dir","rtl");</script>

  <!-- DEMO ONLY: Load PixelAdmin core stylesheets -->
  <script>
    _pxDemo_loadStylesheet('../css/bootstrap.min.css', 'px-demo-stylesheet-bs');
    _pxDemo_loadStylesheet('../css/pixeladmin.min.css', 'px-demo-stylesheet-core');
    _pxDemo_loadStylesheet('../css/widgets.min.css', 'px-demo-stylesheet-widgets');
  </script>

  <!-- DEMO ONLY: Load theme -->
  <script>
    function _pxDemo_loadTheme(a){var b=decodeURIComponent((new RegExp(";\\s*"+encodeURIComponent("px-demo-theme")+"\\s*=\\s*([^;]+)\\s*;","g").exec(";"+document.cookie+";")||[])[1]||"clean");_pxDemo_loadStylesheet(a+b+".min.css","px-demo-stylesheet-theme",b)}
    _pxDemo_loadTheme('../css/themes/');
  </script>


  <!-- Pace.js -->
  <script src="../js/pace/pace.min.js"></script>

  <!-- holder.js -->
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/holder/2.9.0/holder.js"></script>

</head>

<!-- ControllerAs syntax -->
<body id="mainControllerID" ng-controller="MainCtrl as main">

  <!-- Main view  -->
  <ui-view class="px-navbar-fixed"></ui-view>

  <!-- ==============================================================================
  |
  |  SCRIPTS
  |
  =============================================================================== -->

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

  <!-- General scripts -->
  <script src="../js/angular.js"></script>
  <script src="../js/bootstrap.js"></script>
  <script src="../js/ui-bootstrap.js"></script>
  <script src="../js/pixeladmin/util.js"></script>
  <script src="../js/pixeladmin/pixeladmin.js"></script>

  <!-- Perfect scrollbar -->
  <script src="../js/libs/perfect-scrollbar.jquery.js"></script>
  <script src="../js/pixeladmin/extensions/perfect-scrollbar.jquery.js"></script>
  <script src="../js/libs/angular-perfect-scrollbar.js"></script>

  <!-- PxNavbar, PxNav and PxFooter -->
  <script src="../js/pixeladmin/plugins/px-navbar.js"></script>
  <script src="../js/pixeladmin/directives/angular-px-navbar.js"></script>
  <script src="../js/pixeladmin/plugins/px-nav.js"></script>
  <script src="../js/pixeladmin/directives/angular-px-nav.js"></script>
  <script src="../js/pixeladmin/plugins/px-footer.js"></script>
  <script src="../js/pixeladmin/directives/angular-px-footer.js"></script>
  
  <!-- Moments.-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"> </script>
	<!-- <script src="https://js.stripe.com/v3/"></script> -->
	<script src="https://checkout.stripe.com/checkout.js"></script>
  <!-- Google Maps -->
  <!-- NOTE: When using Google Maps on your own site you MUST get your own API key:
             https://developers.google.com/maps/documentation/javascript/get-api-key
             After you got the key paste it in the URL below. -->
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtdj4L66c05v1UZm-nte1FzUEAN6GKBI"></script>

  <!-- Application -->
  <script src="../assets/js/app.js"></script>
  <script src="../assets/js/config.js"></script>
  <script src="../assets/js/directives.js"></script>
  <script src="../assets/js/controllers/main.js"></script>
  <!-- DEMO sidebar -->
  <!-- <script src="../js/pixeladmin/plugins/px-sidebar.js"></script> -->
</body>
</html>
