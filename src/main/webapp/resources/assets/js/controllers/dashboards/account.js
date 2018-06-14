(function(){
	
	function AccountCtrl($http,DTOptionsBuilder){
		var self = this;
		
		self.message = '';
		self.showMessage = false;
		
		// profile changes
		self.account = {};
		self.social = {};
		self.credentials = {};
		self.notification = {};
		self.subscription = {};
		self.subscriptionActive = false;
		
		self.account.accountName = '';
		self.account.accountEmail = ''; 
		self.account.businessStreet = '';
		self.account.businessCity = '';
		self.account.businessPostal = '';
		
		self.account.businessProvince = {name:"Ontario",code:"ON"};
		self.account.businessProvinceList = [{name:"Alberta",code:"AB"},
		{name:"British Columbia",code:"BC"},
		{name:"Manitoba",code:"MB"},
		{name:"New Brunswick",code:"NB"},
		{name:"Newfoundland and Labrador",code:"NL"},
		{name:"Nova Scotia",code:"NS"},
		{name:"Northwest Territories",code:"NT"},
		{name:"Nunavut",code:"NU"},
		{name:"Ontario",code:"ON"},
		{name:"Prince Edward Island",code:"PE"},
		{name:"Quebec",code:"QC"},
		{name:"Saskatchewan",code:"SK"},
		{name:"Yukon",code:"YT"}];
		
		
		self.account.businessCountry = 'Canada';
		self.account.businessWebsite = '';
		self.updateProfile = function(){
			
			self.account.businessProvince = self.account.businessProvince.name;
			$http.post('updateProfile',self.account).then(function(response) {
				if(response.data.success==true)
					self.displayMessage('Profile Inofrmation updated successfully');
					else
					self.displayMessage(response.data.result,'error');
    	    });
		};
		
		// social profile changes
		self.social.facebookPageUrl = '';
		self.social.yelpPageUrl = '';
		self.updateSocialProfile = function(){
			//console.log(self.social);
			$http.post('updateProfile',self.social).then(function(response) {
				if(response.data.success==true)
					self.displayMessage('Social Profile updated successfully');
					else
					self.displayMessage(response.data.result,'error');
    	    });
		}
		
		//password changes
		self.credentials.newPasswordAgain = '';
		self.credentials.newPassword = '';
		self.credentials.oldPassword = '';
		self.updatePassword = function(){
			//console.log(self.credentials);
			$http.post('changePassword',self.credentials).then(function(response) {
				if(response.data.success==true)
					self.displayMessage(response.data.result);
					else
					self.displayMessage(response.data.result,'error');
    	    });
		}

		//notification changes
		self.notification.addedYouAsCompetitorNotify = '';
		self.notification.reportNotify = '';
		self.notification.reviewNotify = '';
		self.updateNotification = function(){
			$http.post('updateProfile',self.notification).then(function(response) {
				if(response.data.success==true)
					self.displayMessage('Notification(s) updated successfully');
					else
					self.displayMessage(response.data.result,'error');
    	    	
    	    });
		}
		
		self.displayMessage = function(messageText,type) {
			$('#accountMessageID').show();
			self.message = messageText;
			self.showMessage = true;
			
			if(type!=undefined && type=='error')
			 {
				$('#accountMessageID').removeClass('alert-success');
				$('#accountMessageID').addClass('alert-danger');
			 }else {
				 $('#accountMessageID').addClass('alert-success');
					$('#accountMessageID').removeClass('alert-danger');
			 }
		}
		
		
		//subscription
		
		self.subscription.paymentinfo = [];
		// DataTables configurable options
	    self.dtOptions = DTOptionsBuilder.newOptions()
	        .withDisplayLength(10)
	        .withOption('bLengthChange', false);
		
		self.updateForm = function(rep){
			if(rep.notifyAddedAsCompetitor!=undefined)
			self.notification.addedYouAsCompetitorNotify = rep.notifyAddedAsCompetitor;
			if(rep.notifyNewReport!=undefined)
			self.notification.reportNotify = rep.notifyNewReport;
			if(rep.notifyNewReview!=undefined)
			self.notification.reviewNotify = rep.notifyNewReview;
			if(rep.facebookUrl!=undefined)
			self.social.facebookPageUrl = rep.facebookUrl;
			if(rep.yelpUrl!=undefined)
			self.social.yelpPageUrl = rep.yelpUrl;
			if(rep.address.country!=undefined)
			self.account.businessCountry = rep.address.country;
			if(rep.clientBusinessUrl!=undefined)
			self.account.businessWebsite = rep.clientBusinessUrl;
			if(rep.clientName!=undefined)
			self.account.accountName = rep.clientName;
			if(rep.clientEmail!=undefined)
			self.account.accountEmail = rep.clientEmail;
			if(rep.address.streetName!=undefined)
			self.account.businessStreet = rep.address.streetName;
			if(rep.address.city!=undefined)
			self.account.businessCity = rep.address.city;
			if(rep.address.postalCode!=undefined)
			self.account.businessPostal = rep.address.postalCode;
			
			self.subscriptionActive = rep.subscription;
		}
		
		self.getAccountDetail = function(){
		$http.get('getAccountDetail').then(function(response) {
			if(response.data.success==true)
			{	
				self.subscription.billing = response.data.billing;
				self.subscription.paymentinfo = [];
				angular.forEach(response.data.invoice,function(invoice){
					self.subscription.paymentinfo.push({
						'number':invoice.number,
						'billingDate': moment(invoice.periodEnd*1000).format('ll'),
						'amount': invoice.currency.toUpperCase()+' '+ (invoice.total / 100)
					});
				});
				var rep = response.data.data;
			    self.updateForm(rep);
			}else{
				self.displayMessage(response.data.result,'error');
			}
		});
		}
		self.startMembership = function(){
			$http.post('startSubscription').then(function(response){
				if(response.data.success==true)
				{
					self.subscriptionActive = true;
					if(response.data.subscription_ends!=undefined) {
						self.displayMessage("Congratulations ! Your subscripation has been started with trial period ending on "+ moment(response.data.subscription_ends*1000).format('LL'));
					} else {
					self.displayMessage(response.data.result);}
				}
				else
				self.displayMessage(response.data.result,'error');
			});
		}
		self.endMembership = function(){
			$http.post('endSubscription').then(function(response){
				if(response.data.success==true)
					{
					self.subscriptionActive = false;
					self.displayMessage(response.data.result);
					}
					else
					self.displayMessage(response.data.result,'error');
					    });
		}
		
		
		self.manageToken = function(token)
		{
		    $http.post('charge',token).then(function(response){
		    	if(response.data.success==true)
					{
		    		self.displayMessage(response.data.result);
		    		self.getAccountDetail();
					}
					else
					{self.displayMessage(response.data.result,'error');}
			    });

		}
		
		
		self.getAccountDetail();
	
	}
	 angular.module('pixeladmin')
	    .controller('AccountCtrl',['$http', 'DTOptionsBuilder',AccountCtrl]);
})();