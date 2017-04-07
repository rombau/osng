var osApp = osApp || angular.module('OnlineSoccer');

osApp.component('loginForm', {

	templateUrl : 'templates/login.html',

	controller : ['$http','$location','UserData',function ($http, $location, UserData) {

		var self = this;

		this.email = null;
		this.password = null;

		this.inProgress = false;
		this.failureMsg = null;

		this.login = function () {

			this.inProgress = true;

			$http({
				url : '../validate.php',
				method : 'POST',
				transformRequest : function (obj) {
					var str = [];
					for ( var p in obj) {
						if (obj.hasOwnProperty(p)) {
							str.push(encodeURIComponent(p) + "=" + (obj[p] === null ? "" : encodeURIComponent(obj[p])));
						}
					}
					return str.join("&");
				},
				data : {
					action : 'os_login',
					sdauer : 0,
					loginemail : self.email,
					passwort : self.password
				},
				headers : {
					'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).then(function success (response) {
				var doc = new DOMParser().parseFromString(response.data, "text/html");
				var ps = doc.getElementsByTagName('p');
				if (ps && ps.length && ps.length > 0) {
					self.failureMsg = ps[ps.length - 1].textContent;
				} else {
					UserData.loggedIn = true;
					// UserData.teamImage = '00000019.png';
					$location.path("/haupt.php");
				}
				self.inProgress = false;
			}, function error (response) {
			// TODO
			});
		};
	}]
});
