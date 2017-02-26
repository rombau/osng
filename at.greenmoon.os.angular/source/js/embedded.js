var osApp = osApp || angular.module('OnlineSoccer');

osApp.component('embeddedSite', {
	templateUrl : 'templates/embedded.html',
	controller : ['$sce',function ($sce) {
		$sce.trustAsResourceUrl(this.site);
	}],
	bindings : {
		site : '@'
	}
});
