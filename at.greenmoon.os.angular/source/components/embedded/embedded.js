/**
 * Embedded site component.
 */
osApp.component('embeddedSite', {
	templateUrl : 'components/embedded/embedded.html',
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
