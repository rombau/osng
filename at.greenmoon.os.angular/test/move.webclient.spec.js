describe('Move web client service', function () {

	var webClient, $httpBackend;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {
		webClient = $injector.get('MoveWebClient');
		$httpBackend = $injector.get('$httpBackend');
	}));

	it('should load current move from affected web sites', function () {

		$httpBackend.whenGET('../zugabgabe.php').respond(window.__html__['test/fixtures/move.setup.1.html']);
		$httpBackend.whenGET('../zugabgabe.php?p=1').respond(window.__html__['test/fixtures/move.actions.html']);
		$httpBackend.whenGET('../zugabgabe.php?p=2').respond(window.__html__['test/fixtures/move.options.html']);

		webClient.loadMove().then(function (move) {

			expect(move).toBeDefined();
			expect(move.information).toBeDefined();
			expect(move.players).toBeDefined();
			expect(move.options).toBeDefined();
			expect(move.adjustments).toBeDefined();

		});

		$httpBackend.flush();
	});

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
});
