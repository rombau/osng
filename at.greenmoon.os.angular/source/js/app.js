var osApp = angular.module('OnlineSoccer', ['ngRoute','ngSanitize','ngCookies','mobile-angular-ui','mobile-angular-ui.gestures']);

osApp.value('UserData', {
	loggedIn : false,
	teamName : 'Demoteam',
	teamImage : '00000000.png',
	error : ''
});

osApp.config(['$routeProvider','$locationProvider','$httpProvider',function ($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider.when('/', {
		template : "<login-form></login-form>"
	}).when('/index.html', {
		template : "<login-form></login-form>"
	}).when('/index.php', {
		template : "<login-form></login-form>"
	}).when('/error', {
		template : '<div class="scrollable"><div class="scrollable-content"><div class="section">{{error}}</div></div></div>'
	}).when('/zugabgabe.php', {
		template : "<move-component></move-component>"
	}).when('/:site', {
		template : function ($routeProvider) {
			return '<embedded-site site="../' + $routeProvider.site + '"></embedded-site>';
		}
	}).otherwise({
		template : '<div class="scrollable"><div class="scrollable-content"><div class="section">Unbekannte Seite!</div></div></div>'
	});

	// $locationProvider.html5Mode(true);

	$httpProvider.interceptors.push(['$rootScope','$location',function ($rootScope, $location) {
		var content = document.querySelector('.app-progress-indicator');
		var requestCount = 0;
		return {
			request : function (config) {
				if (requestCount === 0) {
					angular.element(content).toggleClass('loading');
				}
				requestCount++;
				return config;
			},

			requestError : function (config) {
				return config;
			},

			response : function (response) {
				requestCount--;
				if (requestCount === 0) {
					angular.element(content).toggleClass('loading');
				}
				return response;
			},

			responseError : function (response) {
				requestCount--;
				angular.element(content).toggleClass('loading');
				$rootScope.error = '' + response;
				$location.path('error');
				return response;
			}
		};
	}]);

}]);

osApp.controller('MainController', ['$scope','UserData',function ($scope, UserData) {
	$scope.userData = UserData;
}]);

osApp.filter('trustAsResourceUrl', ['$sce',function ($sce) {
	return function (val) {
		return $sce.trustAsResourceUrl(val);
	};
}]);
