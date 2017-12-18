describe('Html utility service', function () {

	var util;

	beforeEach(function () {

		module('OnlineSoccer');

		inject(function ($injector) {
			util = $injector.get('HtmlUtil');
		});
	});

	it('should check html content string and convert it to a document', function () {

		expect(util.getEnsuredDocument).toThrow('Seite konnte nicht geladen werden.');

		expect(function () {
			util.getEnsuredDocument('Für die Dauer von ZAT 47 sind die Seiten von OS 2.0 gesperrt!');
		}).toThrow();

		expect(function () {
			util.getEnsuredDocument('Diese Seite ist ohne Team nicht verfügbar!');
		}).toThrow();

		expect(util.getEnsuredDocument('empty document')).toEqual(jasmine.any(Document));

	});

});
