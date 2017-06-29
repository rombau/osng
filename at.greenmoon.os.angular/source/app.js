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

osApp.factory('Popup', ['SharedState',function (SharedState) {

	var lastState = null;

	return {
		open : function (popupState, value) {
			if (popupState) {
				if (value) {
					SharedState.setOne(popupState, value);
				} else {
					SharedState.turnOn(popupState);
				}
				lastState = popupState;
			}
		},
		hide : function () {
			if (lastState) {
				SharedState.turnOff(lastState);
				lastState = null;
				return true;
			}
			return false;
		},
		sidebar : function (popupState) {
			if (popupState) {
				lastState = popupState;
			}
		}
	};
}]);

osApp.run(['$rootScope','Popup',function ($rootScope, Popup) {

	$rootScope.$on('$locationChangeStart', function (evt, next, current) {
		if (!$rootScope.error && Popup.hide()) {
			evt.preventDefault();
		}
	});

	$rootScope.$on('mobile-angular-ui.state.changed.leftSwipe', function (evt, newVal, oldVal) {
		if (newVal) {
			Popup.sidebar('leftSwipe');
		}
	});
}]);
