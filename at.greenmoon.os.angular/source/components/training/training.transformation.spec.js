describe('Training transformation service', function () {

	var transformationService;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {
		transformationService = $injector.get('TrainingTransformation');
	}));

	it('should throw error when html is invalid', function () {

		expect(function () {
			transformationService.transformTraining('invalid')
		}).toThrow();

		expect(function () {
			transformationService.transformTrainer('invalid')
		}).toThrow();

	});

	it('should extract information from training html', function () {

		var fixture = __html__['test/fixtures/training.html'];

		var training = transformationService.transformTraining(fixture);

		expect(training).toBeDefined();

		expect(training.config).toBeDefined();
		expect(training.config.length).toEqual(2);

		expect(training.config[0].id).toEqual(18357);
		expect(training.config[0].label).toEqual('Friendy/International');

		expect(training.config[1].id).toEqual(18356);
		expect(training.config[1].label).toEqual('Liga');

		expect(training.players).toBeDefined();
		expect(training.players.length).toEqual(32);

		expect(training.players[0].id).toEqual(41930);
		expect(training.players[0].name).toEqual('Steve Stapleton');
		expect(training.players[0].pos).toEqual('TOR');
		expect(training.players[0].opti).toEqual(85.63);
		expect(training.players[0].setting).toBeUndefined();

		expect(training.players[1].id).toEqual(81726);
		expect(training.players[1].name).toEqual('Anthony Madden');
		expect(training.players[1].pos).toEqual('TOR');
		expect(training.players[1].opti).toEqual(82.19);
		expect(training.players[1].verletzt).toBeFalsy();
		expect(training.players[1].setting).toBeDefined();
		expect(training.players[1].setting.trainerkey).toEqual('17');
		expect(training.players[1].setting.skillnr).toEqual(2);
		expect(training.players[1].setting.skillvalue).toEqual(79);
		expect(training.players[1].setting.chance).toEqual(13.65);

		expect(training.players[3].verletzt).toBeTruthy();

		expect(training.trainer).toBeDefined();

		expect(training.trainer.length).toEqual(6);

		expect(training.trainer[0]).toBeDefined();
		expect(training.trainer[0].name).toEqual('Trainer 17');
		expect(training.trainer[0].skill).toEqual(99.5);
		expect(training.trainer[0].players).toEqual(4);

		expect(training.trainer[3]).toBeDefined();
		expect(training.trainer[3].name).toEqual('Trainer 14');
		expect(training.trainer[3].skill).toEqual(92.5);
		expect(training.trainer[3].players).toEqual(5);

		expect(training.trainer[5]).toBeDefined();
		expect(training.trainer[5].name).toEqual('Trainer 1');
		expect(training.trainer[5].skill).toEqual(60);
		expect(training.trainer[5].players).toEqual(0);

	});

	it('should extract information from trainer html', function () {

		var fixture = __html__['test/fixtures/trainer.html'];

		var trainer = transformationService.transformTrainer(fixture);

		expect(trainer).toBeDefined();
		expect(trainer.length).toEqual(6);

		expect(trainer[0].name).toEqual('Trainer 17');
		expect(trainer[0].skill).toEqual(99.5);
		expect(trainer[0].gehalt).toEqual(507957);
		expect(trainer[0].vertrag).toEqual(62);
		expect(trainer[0].abfindung).toEqual(2008588);

	});

});
