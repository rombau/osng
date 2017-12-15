describe(
	'Training transformation service',
	function () {

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

		it(
			'should generate post data from training settings',
			function () {

				var fixture = __html__['test/fixtures/training.html'];

				var training = transformationService.transformTraining(fixture);

				var data = transformationService.transformTrainingData(training);

				expect(data)
					.toEqual(
						'tr141930=0&tr241930=0&tr181726=1&tr281726=2&tr1105508=1&tr2105508=3&tr1116667=0&tr2116667=0&tr14147=0&tr24147=0&tr158271=4&tr258271=2&tr158642=1&tr258642=7&tr160807=1&tr260807=9&tr192290=4&tr292290=9&tr1100065=1&tr2100065=6&tr1100690=2&tr2100690=5&tr1111254=2&tr2111254=3&tr143418=0&tr243418=0&tr145479=2&tr245479=11&tr145662=4&tr245662=3&tr189863=2&tr289863=8&tr1111249=2&tr2111249=8&tr141361=0&tr241361=0&tr165138=4&tr265138=11&tr175108=3&tr275108=6&tr1111198=3&tr2111198=4&tr141344=0&tr241344=0&tr168491=4&tr268491=5&tr187418=3&tr287418=4&tr1106389=3&tr2106389=2&tr1116668=3&tr2116668=6&tr130081=0&tr230081=0&tr146019=0&tr246019=0&tr175105=5&tr275105=11&tr183700=5&tr283700=4&tr1110564=5&tr2110564=3&tr1113415=5&tr2113415=1&trainingspeichern=Trainingseinstellung+speichern');
			});
	});
