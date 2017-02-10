// 
describe('Move transformation service', function () {

	var transformationService;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {
		transformationService = $injector.get('MoveTransformation');
	}));

	it('should throw error when html is invalid', function () {

		expect(function () {
			transformationService.transformSetup('invalid')
		}).toThrow();

	});

	it('should extract information from setup html', function () {

		var fixture = __html__['fixtures/move.setup.html'];

		var move = transformationService.transformSetup(fixture);

		expect(move).toBeDefined();

		expect(move.information).toBeDefined();
		expect(move.information.zat).toEqual(8);
		expect(move.information.date.toUTCString()).toEqual('Sat, 04 Feb 2017 12:00:00 GMT');
		expect(move.information.type).toEqual('Liga');
		expect(move.information.home).toEqual(false);
		expect(move.information.against.id).toEqual(781);
		expect(move.information.against.name).toEqual('Shamrock Rangers');

		expect(move.players).toBeDefined();
		expect(move.players.length).toEqual(37);

		expect(move.players[0].id).toEqual(41930);
		expect(move.players[0].name).toEqual('Steve Stapleton');
		expect(move.players[0].pos).toEqual('TOR');
		expect(move.players[0].alter).toEqual(27);
		expect(move.players[0].moral).toEqual(98);
		expect(move.players[0].fitness).toEqual(99);
		expect(move.players[0].skill).toEqual(55.41);
		expect(move.players[0].opti).toEqual(85.26);
		expect(move.players[0].sonder).toEqual('E');
		expect(move.players[0].row).toEqual(0);
		expect(move.players[0].col).toEqual(0);

		expect(move.players[36].id).toEqual(113415);
		expect(move.players[36].name).toEqual('Jim Thornton');
		expect(move.players[36].pos).toEqual('STU');
		expect(move.players[36].alter).toEqual(17);
		expect(move.players[36].moral).toEqual(77);
		expect(move.players[36].fitness).toEqual(99);
		expect(move.players[36].skill).toEqual(33);
		expect(move.players[36].opti).toEqual(37.96);
		expect(move.players[36].sonder).toEqual('');
		expect(move.players[36].row).toBeUndefined();
		expect(move.players[36].col).toBeUndefined();

	});

	it('should extract information from options html', function () {

	});
});

//
describe('Move web client service', function () {

	var webClient, $httpBackend;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {
		webClient = $injector.get('MoveWebClient');
		$httpBackend = $injector.get('$httpBackend');
	}));

	it('should load current move from affected web sites', function () {

		$httpBackend.whenGET('../zugabgabe.php').respond(window.__html__['fixtures/move.html']);

		webClient.loadMove().then(function (reponse) {

			expect(reponse.data).toBeDefined();
			expect(reponse.data.information).toBeDefined();
			expect(reponse.data.players).toBeDefined();

		});

		$httpBackend.flush();
	});

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
});

// 
describe('Move controller', function () {

	var ctrl, Player, $httpBackend;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {

		Player = $injector.get('Player');
		$httpBackend = $injector.get('$httpBackend');

		$httpBackend.whenGET('../zugabgabe.php').respond(window.__html__['fixtures/move.html']);

		$componentController = $injector.get('$componentController');
		ctrl = $componentController('moveComponent');

		$httpBackend.flush();

	}));

	it('should initialize scope data', function () {

		expect(ctrl).toBeDefined();
		expect(ctrl.information).toBeDefined();
		expect(ctrl.players).toBeDefined();

	});

	it('should initialize field grid', function () {

		expect(ctrl.grid).toBeDefined();
		expect(ctrl.grid.length).toEqual(15);
		expect(ctrl.grid[0].length).toEqual(11);

	});

	it('should initialize players in correct sort order', function () {

		expect(ctrl.players.length).toEqual(37);
		expect(ctrl.players[0].pos).toEqual('STU');
		expect(ctrl.players[36].pos).toEqual('TOR');

	});

	it('should set player to grid', function () {

		ctrl.grid.setPlayer(new Player(), 1, 1);

		expect(ctrl.grid[0][0]).toBeDefined();
		expect(ctrl.grid[0][0]).not.toBeNull();
		expect(ctrl.grid[0][0].row).toEqual(1);
		expect(ctrl.grid[0][0].col).toEqual(1);
		expect(ctrl.grid[0][0].isSet()).toBeTruthy();

	});

	it('should move player to new grid position', function () {

		var player = new Player();
		ctrl.grid.setPlayer(player, 1, 1);

		ctrl.grid.setPlayer(player, 2, 2);

		expect(ctrl.grid[0][0]).toBeUndefined();
		expect(ctrl.grid[1][1]).not.toBeNull();
		expect(ctrl.grid[1][1].row).toEqual(2);
		expect(ctrl.grid[1][1].col).toEqual(2);

	});

	it('should set player to occupied grid position', function () {

		var player1 = new Player();
		var player2 = new Player();
		ctrl.grid.setPlayer(player1, 1, 1);

		ctrl.grid.setPlayer(player2, 1, 1);

		expect(ctrl.grid[0][0]).toBeDefined();
		expect(ctrl.grid[0][0]).toEqual(player2);
		expect(player1.row).toBeUndefined();
		expect(player1.col).toBeUndefined();
		expect(player2.row).toEqual(1);
		expect(player2.col).toEqual(1);

	});

	it('should move player to occupied grid position', function () {

		var player1 = new Player();
		var player2 = new Player();
		ctrl.grid.setPlayer(player1, 1, 1);
		ctrl.grid.setPlayer(player2, 2, 2);

		ctrl.grid.setPlayer(player2, 1, 1);

		expect(ctrl.grid[0][0]).toBeDefined();
		expect(ctrl.grid[0][0]).toEqual(player2);
		expect(player1.row).toEqual(2);
		expect(player1.col).toEqual(2);
		expect(player2.row).toEqual(1);
		expect(player2.col).toEqual(1);

	});

	it('should set player to keeper position', function () {

		var player = new Player();
		ctrl.grid.removePlayer(ctrl.getKeeper());

		ctrl.players.push(player);
		ctrl.grid.setPlayer(player, 0, 0);

		expect(ctrl.getKeeper()).toEqual(player);
		expect(player.row).toEqual(0);
		expect(player.col).toEqual(0);
		expect(player.isSet()).toBeTruthy();

	});

	it('should set player to substitute', function () {

		var player = new Player();

		ctrl.players.push(player);
		ctrl.grid.setPlayer(player, -1, -1);

		expect(ctrl.getSubst()).toBeDefined();
		expect(ctrl.getSubst().length).toEqual(6);
		expect(ctrl.getSubst()[1]).toEqual(player);
		expect(player.row).toEqual(-1);
		expect(player.col).toEqual(-1);
		expect(player.isSet()).toBeTruthy();

	});

});
