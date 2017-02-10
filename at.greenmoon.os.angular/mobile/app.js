var osApp = angular.module('OnlineSoccer', ['ngRoute','ngSanitize','ngCookies','mobile-angular-ui','mobile-angular-ui.gestures']);

osApp.value('UserData', {
	loggedIn : false,
	teamName : 'Demoteam',
	teamImage : '00000000.png'
});

osApp.config(function ($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider.when('/', {
		template : "<login-form></login-form>"
	}).when('/index.html', {
		template : "<login-form></login-form>"
	}).when('/index.php', {
		template : "<login-form></login-form>"
	}).when('/zugabgabe.php', {
		template : "<move-component></move-component>"
	}).when('/:site', {
		template : function ($routeProvider) {
			return '<embedded-site site="../' + $routeProvider.site + '"></embedded-site>';
		}
	}).otherwise({
		template : '<div class="scrollable"><div class="scrollable-content"><div class="section">Fehler!</div></div></div>'
	});

	// $locationProvider.html5Mode(true);

});

osApp.controller('MainController', function ($scope, UserData) {
	$scope.userData = UserData;
});

osApp.filter('trustAsResourceUrl', ['$sce',function ($sce) {
	return function (val) {
		return $sce.trustAsResourceUrl(val);
	};
}]);
