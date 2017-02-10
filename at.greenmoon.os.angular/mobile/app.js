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
		template : "<zugabgabe-component></zugabgabe-component>"
	}).when('/:site', {
		template : function ($routeProvider) {
			return '<embedded-site site="../' + $routeProvider.site + '"></embedded-site>';
		}
	}).otherwise({
		template : "ERROR!"
	});

	// $locationProvider.html5Mode(true);

	// XXX wirklich nötig? os/lc aus cookies nehmen
	// $httpProvider.interceptors.push(function (UserData, $q) {
	// return {
	// request : function (config) {
	// if (!UserData.loggedIn) {
	// var cookieHeader = config.headers.Cookie || '';
	// if (UserData.lc) {
	// cookieHeader += (cookieHeader.length === 0 ? '' : '; ');
	// cookieHeader = cookieHeader + 'lc=' + UserData.lc;
	// }
	// if (UserData.os) {
	// cookieHeader += (cookieHeader.length === 0 ? '' : '; ');
	// cookieHeader = cookieHeader + 'os=' + UserData.os;
	// }
	// if (cookieHeader.length > 0) {
	// config.headers.Cookie = cookieHeader;
	// }
	// }
	// return config;
	// }
	// };
	// });

});

osApp.controller('MainController', function ($scope, UserData) {
	$scope.userData = UserData;
});

osApp.filter('trustAsResourceUrl', ['$sce',function ($sce) {
	return function (val) {
		return $sce.trustAsResourceUrl(val);
	};
}]);
