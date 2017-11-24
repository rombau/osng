describe('Office controller', function () {

	var ctrl, $document;

	beforeEach(function () {

		module('OnlineSoccer');

		inject(function ($injector) {
			ctrl = $injector.get('$componentController')('officeComponent');
			$document = $injector.get('$document');
		});
	});

	it('should modify move url when embedded is loaded', function () {

		var fixture = '<a href="zugabgabe.php">G&uuml;ltig</a>';

		$document.find('body').append('<div id="embeddedOffice"><iframe id="embedFrame"></iframe></div>');

		var embeddedDocument = document.getElementById('embedFrame').contentDocument;

		angular.element(embeddedDocument).find('body').append('<a href="zugabgabe.php">G&uuml;ltig</a>');

		ctrl.onLoad();

		expect(embeddedDocument.getElementById('move')).not.toBeNull;
		expect(embeddedDocument.getElementById('move').target).toEqual('_top');
		expect(embeddedDocument.getElementById('move').href).toContain('#/zugabgabe.php');

	});

});
