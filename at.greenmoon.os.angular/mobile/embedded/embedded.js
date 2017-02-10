var osApp = osApp || angular.module('OnlineSoccer');

osApp.component('embeddedSite', {
	templateUrl : 'embedded/embedded.html',
	controller : function ($sce) {
		$sce.trustAsResourceUrl(this.site);
	},
	bindings : {
		site : '@'
	}
});
