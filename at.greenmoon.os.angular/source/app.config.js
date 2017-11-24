osApp.config(['$provide','$routeProvider','$locationProvider','$httpProvider',function ($provide, $routeProvider, $locationProvider, $httpProvider) {

	$routeProvider.when('/', {
		template : "<login-component></login-component>"
	}).when('/index.html', {
		template : "<login-component></login-component>"
	}).when('/index.php', {
		template : "<login-component></login-component>"
	}).when('/haupt.php', {
		template : "<office-component></office-component>"
	}).when('/error', {
		template : '<div class="scrollable"><div class="scrollable-content"><div class="section"><span ng-bind-html="error"></span></div></div></div>'
	}).when('/zugabgabe.php', {
		template : "<move-component></move-component>"
	}).when('/trainer.php', {
		template : "<training-component></training-component>"
	}).when('/training.php', {
		template : "<training-component></training-component>"
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

	$provide.factory('ErrorInterceptor', ['$rootScope','$location',function ($rootScope, $location) {

		return {
			responseError : function (response) {
				$rootScope.error = '' + response;
				$location.path('error');
			}
		};

	}]);

	$provide.factory('LoadingInterceptor', [function () {

		var progressIndicator = document.querySelector('.app-progress-indicator');
		var requestCount = 0;

		return {
			request : function (config) {
				if (requestCount === 0) {
					angular.element(progressIndicator).addClass('loading');
				}
				var modal = document.querySelector('.modal');
				if (modal) {
					angular.element(modal).addClass('loading');
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
					angular.element(progressIndicator).removeClass('loading');
				}
				var modal = document.querySelector('.modal');
				if (modal) {
					angular.element(modal).removeClass('loading');
				}
				return response;
			},

			responseError : function (response) {
				requestCount--;
				angular.element(progressIndicator).removeClass('loading');
				var modal = document.querySelector('.modal');
				if (modal) {
					angular.element(modal).removeClass('loading');
				}
				return response;
			}
		};
	}]);

	$httpProvider.interceptors.push('LoadingInterceptor');
	$httpProvider.interceptors.push('ErrorInterceptor');
}]);
