/* globals osApp: true */
var osApp = angular.module('OnlineSoccer', ['ngRoute','ngSanitize','ngCookies','mobile-angular-ui','mobile-angular-ui.gestures']);

osApp.config(['$routeProvider','$locationProvider','$httpProvider',function ($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider.when('/', {
		template : "<login-form></login-form>"
	}).when('/index.html', {
		template : "<login-form></login-form>"
	}).when('/index.php', {
		template : "<login-form></login-form>"
	}).when('/error', {
		template : '<div class="scrollable"><div class="scrollable-content"><div class="section"><span ng-bind-html="error"></span></div></div></div>'
	}).when('/zugabgabe.php', {
		template : "<move-component></move-component>"
	}).when('/player/:id', {
		template : function ($routeProvider) {
			return '<embedded-site site="../sp.php?s=' + $routeProvider.id + '"></embedded-site>';
		}
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
					angular.element(content).addClass('loading');
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
					angular.element(content).removeClass('loading');
				}
				return response;
			},

			responseError : function (response) {
				requestCount--;
				angular.element(content).removeClass('loading');
				$rootScope.error = '' + response;
				$location.path('error');
				return response;
			}
		};
	}]);

}]);

osApp.filter('trustAsResourceUrl', ['$sce',function ($sce) {
	return function (val) {
		return $sce.trustAsResourceUrl(val);
	};
}]);

osApp.component('playerLink', {

	template : '<a ng-click="$ctrl.openWindow()" class="{{$ctrl.player.pos}} noselect">{{$ctrl.player.name}}</a>',

	bindings : {
		player : '<object'
	},

	controller : ['$window',function ($window) {

		var ctrl = this;

		ctrl.openWindow = function () {
			$window.open("../sp.php?s=" + ctrl.player.id, "os_spieler", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=yes,width=800,height=550");
			return false;
		};

	}]
});
