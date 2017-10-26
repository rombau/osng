osApp.component('officeComponent', {

	templateUrl : 'components/office/office.html',

	controller : ['$document','$location',function ($document, $location) {

		var ctrl = this;

		ctrl.onLoad = function () {

			var embeddedDocument = $document[0].querySelector('#embeddedOffice #embedFrame').contentDocument;

			var anchors = embeddedDocument.getElementsByTagName('a');

			for (var a = 0; a < anchors.length; a++) {
				if (anchors[a].href.indexOf('zugabgabe.php') !== -1) {
					anchors[a].href = $location.absUrl().split('#')[0] + '#/zugabgabe.php';
					anchors[a].target = '_top';
					anchors[a].id = 'move';
				}
			}
		};

	}]
});
