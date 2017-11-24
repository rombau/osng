describe('Training web client', function () {

	var webClient, $httpBackend;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {
		webClient = $injector.get('TrainingWebClient');
		$httpBackend = $injector.get('$httpBackend');
	}));

	it('should load current training settings from affected web sites', function () {

		$httpBackend.whenGET('../training.php').respond(window.__html__['test/fixtures/training.html']);
		$httpBackend.whenGET('../trainer.php').respond(window.__html__['test/fixtures/trainer.html']);

		webClient.loadTraining().then(function (training) {

			expect(training.selection.length).toEqual(2);
			expect(training.players.length).toEqual(32);
			expect(training.trainer.length).toEqual(6);

			expect(training.players[1].setting.trainer).toBe(training.trainer[0]);

		});

		$httpBackend.flush();
	});

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
});
