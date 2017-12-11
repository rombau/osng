describe('Training component controller', function () {

	var rootScope, ctrl, SharedState, Player, Trainer;

	beforeEach(module('OnlineSoccer', function ($provide) {
		$provide.service('TrainingWebClient', function ($q, Training) {
			return {
				loadTraining : function () {
					return $q.when(new Training());
				},
				saveTraining : function () {}
			};
		});
	}));

	beforeEach(inject(function ($injector) {

		SharedState = $injector.get('SharedState');
		Player = $injector.get('Player');
		Trainer = $injector.get('Trainer');

		rootScope = $injector.get('$rootScope').$new();

		SharedState.initialize(rootScope, 'activeTab');

		$componentController = $injector.get('$componentController');
		ctrl = $componentController('trainingComponent');

		rootScope.$digest();

	}));

	it('should initialize scope data', function () {

		expect(ctrl).toBeDefined();

		expect(ctrl.training).toBeDefined();
		expect(ctrl.training.config).toBeDefined();
		expect(ctrl.training.players).toBeDefined();
		expect(ctrl.training.trainer).toBeDefined();

	});

	it('should add player training', function () {

		ctrl.training.trainer.push(new Trainer(17));

		var player = new Player();
		player.pos = Player.Position.ABW;
		ctrl.training.players.push(player);

		ctrl.addPlayerSetting(player);

		expect(ctrl.training.players[0].setting).toBeDefined();
		expect(ctrl.training.players[0].setting.trainerkey).toEqual(ctrl.training.trainer[0].getKey());

	});

	it('should edit player training on mobile devices', function () {

		ctrl.training.trainer.push(new Trainer(17));
		ctrl.training.trainer.push(new Trainer(1));

		var player = new Player();
		player.pos = Player.Position.ABW;
		ctrl.training.players.push(player);

		expect(ctrl.training.players[0].setting).toBeUndefined();

		ctrl.editPlayerSetting(player);

		expect(ctrl.dialog.player).toBe(ctrl.training.players[0]);
		expect(ctrl.dialog.setting).toBeDefined();
		expect(ctrl.dialog.setting.trainerkey).toEqual('17');
		expect(ctrl.dialog.setting.skillnr).toEqual(1);

		ctrl.dialog.setting.trainerkey = '1';
		ctrl.dialog.setting.skillnr = 2

		ctrl.savePlayerSetting();

		expect(ctrl.training.players[0].setting).toBeDefined();
		expect(ctrl.training.players[0].setting.trainerkey).toEqual('1');
		expect(ctrl.training.players[0].setting.skillnr).toEqual(2);

		ctrl.editPlayerSetting(player);

		expect(ctrl.dialog.player).toBe(ctrl.training.players[0]);
		expect(ctrl.dialog.setting.trainerkey).toEqual('1');
		expect(ctrl.dialog.setting.skillnr).toEqual(2);

	});

	it('should delete player training', function () {

		ctrl.training.trainer.push(new Trainer(17));

		var player = new Player();
		player.pos = Player.Position.ABW;
		ctrl.training.players.push(player);

		ctrl.addPlayerSetting(player);

		expect(ctrl.training.players[0].setting).toBeDefined();

		ctrl.deletePlayerSetting(player);

		expect(ctrl.training.players[0].setting).toBeUndefined();
	});

	it('should delete player training on mobile devices', function () {

		ctrl.training.trainer.push(new Trainer(17));

		var player = new Player();
		player.pos = Player.Position.ABW;
		ctrl.training.players.push(player);

		ctrl.editPlayerSetting(player);
		ctrl.savePlayerSetting();

		expect(ctrl.training.players[0].setting).toBeDefined();

		ctrl.editPlayerSetting(player);
		ctrl.deletePlayerSetting();

		expect(ctrl.training.players[0].setting).toBeUndefined();
	});

	it('should return kumulative trainer selection', function () {

		expect(ctrl.getTrainerSelection()).toBeUndefined();

		ctrl.training.trainer.push(new Trainer(17));
		ctrl.training.trainer.push(new Trainer(17));
		ctrl.training.trainer.push(new Trainer(14));
		ctrl.training.trainer.push(new Trainer(17));
		ctrl.training.trainer.push(new Trainer(8));
		ctrl.training.trainer.push(new Trainer(1));

		expect(ctrl.getTrainerSelection()).toBeUndefined();

		var player = new Player();
		player.setting = {
			trainerkey : '17'
		};
		ctrl.training.players.push(player);

		var list = ctrl.getTrainerSelection();

		expect(list).toBe(ctrl.getTrainerSelection()); // caching

		expect(list).toBeDefined();

		expect(list[0].name).toEqual('Trainer 17');
		expect(list[0].skill).toEqual(99.5);
		expect(list[0].max).toEqual(15);
		expect(list[0].players).toEqual(1);

		expect(list[1].name).toEqual('Trainer 14');
		expect(list[1].skill).toEqual(92.5);
		expect(list[1].max).toEqual(5);
		expect(list[1].players).toEqual(0);

		expect(list[2].name).toEqual('Trainer 8');
		expect(list[2].skill).toEqual(77.5);
		expect(list[2].max).toEqual(5);
		expect(list[2].players).toEqual(0);

		expect(list[3].name).toEqual('Trainer 1');
		expect(list[3].skill).toEqual(60);
		expect(list[3].max).toEqual(5);
		expect(list[3].players).toEqual(0);

		ctrl.changeTrainerSelection();

		expect(ctrl.trainerSelection).toBeUndefined();

	});

	it('should return skill selection for keeper', function () {

		var player = new Player();
		player.pos = Player.Position.TOR;

		var selection = ctrl.getPlayerSkillSelection(player);

		expect(selection[0].label).toEqual('Abstoss');

	});

	it('should return skill selection for player', function () {

		var player = new Player();
		player.pos = Player.Position.ABW;

		var selection = ctrl.getPlayerSkillSelection(player);

		expect(selection[0].label).toEqual('Schuss');

	});

});
