var osApp = osApp || angular.module('OnlineSoccer');

osApp.component('embeddedSite', {
	templateUrl : 'templates/embedded.html',
	controller : ['$sce',function ($sce) {
		var content = document.querySelector('.app-progress-indicator');
		angular.element(content).addClass('loading');
		window.embeddedLoaded = function () {
			angular.element(content).removeClass('loading');
		};
		$sce.trustAsResourceUrl(this.site);
	}],
	bindings : {
		site : '@'
	}
});
