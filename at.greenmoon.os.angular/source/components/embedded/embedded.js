/**
 * Embedded site component.
 */
osApp.component('embeddedSite', {

	templateUrl : 'components/embedded/embedded.html',

	bindings : {
		site : '@',
		onLoad : '&',
	},

	controller : ['$sce','Account',function ($sce, Account) {

		var ctrl = this;

		var contentArea = document.querySelector('.app-progress-indicator');
		angular.element(contentArea).addClass('loading');

		window.embeddedLoaded = function () {

			angular.element(contentArea).removeClass('loading');

			var document = this.document;

			// check this.document for demoteam or "ohne Team"
			var docContent = document.body.textContent;
			if (docContent.indexOf('Demoteam') !== -1 || docContent.indexOf('ohne Team') !== -1) {
				Account.clearTeams();
			}

			ctrl.onLoad();
		};
		$sce.trustAsResourceUrl(this.site);
	}]

});
