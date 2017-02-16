// 
describe('Move transformation service', function () {

	var transformationService;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {
		transformationService = $injector.get('MoveTransformation');
	}));

	it('should throw error when setup html is invalid', function () {

		expect(function () {
			transformationService.transformSetup('invalid')
		}).toThrow();

	});

	it('should extract information from setup html', function () {

		var fixture = __html__['fixtures/move.setup.html'];

		var move = transformationService.transformSetup(fixture);

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

	it('should extract alternativ date representation from setup html', function () {

		var fixture = __html__['fixtures/move.setup.alt.html'];

		var move = transformationService.transformSetup(fixture);

		expect(move.information).toBeDefined();
		expect(move.information.date.toUTCString()).toEqual('Tue, 14 Feb 2017 18:29:59 GMT');

	});

	it('should throw error when actions html is invalid', function () {

		expect(function () {
			transformationService.transformActions('invalid')
		}).toThrow();

	});

	it('should extract information from actions html', function () {

		var fixture = __html__['fixtures/move.actions.html'];

		var move = transformationService.transformActions(fixture);

		expect(move.options.length).toEqual(6);

		expect(move.options[0].item).toEqual(1);
		expect(move.options[0].page).toEqual(1);
		expect(move.options[0].text).toEqual('Einwechslung');
		expect(move.options[1].item).toEqual(2);
		expect(move.options[1].page).toEqual(1);
		expect(move.options[1].text).toEqual('Einsatz festlegen');
		expect(move.options[2].item).toEqual(3);
		expect(move.options[2].page).toEqual(1);
		expect(move.options[2].text).toEqual('Härte festlegen');
		expect(move.options[3].item).toEqual(4);
		expect(move.options[3].page).toEqual(1);
		expect(move.options[3].text).toEqual('Spielweise festlegen');
		expect(move.options[4].item).toEqual(5);
		expect(move.options[4].page).toEqual(1);
		expect(move.options[4].text).toEqual('Positionswechsel');
		expect(move.options[5].item).toEqual(6);
		expect(move.options[5].page).toEqual(1);
		expect(move.options[5].text).toEqual('Manndeckung');

		expect(move.adjustments.length).toEqual(10);

		expect(move.adjustments[0].option).toEqual(move.options[0]);
		expect(move.adjustments[0].id).toEqual(11005);
		expect(move.adjustments[0].text).toEqual('Bei roter Karte TOR : Einwechslung von Steve Stapleton für Nick Keogh  der 76. Minute als Torwart');
		expect(move.adjustments[1].option).toEqual(move.options[0]);
		expect(move.adjustments[1].id).toEqual(11004);
		expect(move.adjustments[1].text).toEqual('Bei Rückstand : Einwechslung von Clifford Murphy für Ian Quigley in der 11. Minute auf Kartenposition');
		expect(move.adjustments[2].option).toEqual(move.options[0]);
		expect(move.adjustments[2].id).toEqual(11003);
		expect(move.adjustments[2].text).toEqual('Immer : Einwechslung von Anthony Downes für Anthony Madden in der 2. Minute auf Position E7');
		expect(move.adjustments[3].option).toEqual(move.options[1]);
		expect(move.adjustments[3].id).toEqual(11006);
		expect(move.adjustments[3].text).toEqual('Bei Mehr-Tore-Rückstand : Einsatz einstellen auf 70% ab der 8. Minute');
		expect(move.adjustments[4].option).toEqual(move.options[2]);
		expect(move.adjustments[4].id).toEqual(11007);
		expect(move.adjustments[4].text).toEqual('Immer : Härte einstellen auf Fairplay in der 1. Minute');
		expect(move.adjustments[5].option).toEqual(move.options[3]);
		expect(move.adjustments[5].id).toEqual(11008);
		expect(move.adjustments[5].text).toEqual('Bei Führung : Spielweise einstellen auf leicht Defensiv ab der 46. Minute');
		expect(move.adjustments[6].option).toEqual(move.options[4]);
		expect(move.adjustments[6].id).toEqual(11009);
		expect(move.adjustments[6].text).toEqual('Immer : Positionswechsel von Conrad Nash auf Position E5 in der 50. Minute');
		expect(move.adjustments[7].option).toEqual(move.options[5]);
		expect(move.adjustments[7].id).toEqual(11010);
		expect(move.adjustments[7].text).toEqual('Immer : Positionsbezogene Manndeckung durch Martin Downey in der 1. Minute');
		expect(move.adjustments[8].option).toEqual(move.options[5]);
		expect(move.adjustments[8].id).toEqual(11013);
		expect(move.adjustments[8].text).toEqual('Immer : Manndeckung aufheben durch Martin Downey in der 46. Minute');
		expect(move.adjustments[9].option).toEqual(move.options[5]);
		expect(move.adjustments[9].id).toEqual(11015);
		expect(move.adjustments[9].text).toEqual('Bei Rückstand : Manndeckung von Anthony Figere durch Joseph Mulligan in der 55. Minute');

	});

	it('should throw error when options html is invalid', function () {

		expect(function () {
			transformationService.transformOptions('invalid')
		}).toThrow();

	});

	it('should extract information from options html', function () {

		var fixture = __html__['fixtures/move.options.html'];

		var move = transformationService.transformOptions(fixture);

		expect(move.options.length).toEqual(10);

		expect(move.options[0].item).toEqual(8);
		expect(move.options[0].page).toEqual(2);
		expect(move.options[0].text).toEqual('Kapitän');
		expect(move.options[1].item).toEqual(9);
		expect(move.options[8].page).toEqual(2);
		expect(move.options[1].text).toEqual('Spielmacher');
		expect(move.options[2].item).toEqual(10);
		expect(move.options[8].page).toEqual(2);
		expect(move.options[2].text).toEqual('Elfmeterschütze');
		expect(move.options[3].item).toEqual(11);
		expect(move.options[8].page).toEqual(2);
		expect(move.options[3].text).toEqual('Freistoss Direkt');
		expect(move.options[4].item).toEqual(12);
		expect(move.options[8].page).toEqual(2);
		expect(move.options[4].text).toEqual('Freistoss Indirekt');
		expect(move.options[5].item).toEqual(13);
		expect(move.options[8].page).toEqual(2);
		expect(move.options[5].text).toEqual('Ecke');
		expect(move.options[6].item).toEqual(14);
		expect(move.options[8].page).toEqual(2);
		expect(move.options[6].text).toEqual('Libero');
		expect(move.options[7].item).toEqual(16);
		expect(move.options[8].page).toEqual(2);
		expect(move.options[7].text).toEqual('Taktik - Abwehr');
		expect(move.options[8].item).toEqual(17);
		expect(move.options[8].page).toEqual(2);
		expect(move.options[8].text).toEqual('Taktik - Mittelfeld');
		expect(move.options[9].item).toEqual(18);
		expect(move.options[9].page).toEqual(2);
		expect(move.options[9].text).toEqual('Taktik - Angriff');

		expect(move.adjustments.length).toEqual(11);

		expect(move.adjustments[0].option).toEqual(move.options[0]);
		expect(move.adjustments[0].id).toEqual(11023);
		expect(move.adjustments[0].text).toEqual('Kapitän : Joseph Mulligan');
		expect(move.adjustments[1].option).toEqual(move.options[1]);
		expect(move.adjustments[1].id).toEqual(11029);
		expect(move.adjustments[1].text).toEqual('Spielmacher : Anthony Downes');
		expect(move.adjustments[2].option).toEqual(move.options[2]);
		expect(move.adjustments[2].id).toEqual(11026);
		expect(move.adjustments[2].text).toEqual('Elfmeter : Nick Keogh');
		expect(move.adjustments[3].option).toEqual(move.options[2]);
		expect(move.adjustments[3].id).toEqual(11038);
		expect(move.adjustments[3].text).toEqual('Elfmeter : Gavin Sheehan');
		expect(move.adjustments[4].option).toEqual(move.options[3]);
		expect(move.adjustments[4].id).toEqual(11025);
		expect(move.adjustments[4].text).toEqual('Freistoss Direkt : Gavin Sheehan');
		expect(move.adjustments[5].option).toEqual(move.options[4]);
		expect(move.adjustments[5].id).toEqual(11024);
		expect(move.adjustments[5].text).toEqual('Freistoss Indirekt : Gavin Sheehan');
		expect(move.adjustments[6].option).toEqual(move.options[5]);
		expect(move.adjustments[6].id).toEqual(11037);
		expect(move.adjustments[6].text).toEqual('Ecke : Anthony Downes');
		expect(move.adjustments[7].option).toEqual(move.options[6]);
		expect(move.adjustments[7].id).toEqual(11040);
		expect(move.adjustments[7].text).toEqual('Libero : Clinton Reid');
		expect(move.adjustments[8].option).toEqual(move.options[7]);
		expect(move.adjustments[8].id).toEqual(11028);
		expect(move.adjustments[8].text).toEqual('Immer: in der 1. Minute - Grundtaktik - Abwehr: Innenverteidigung');
		expect(move.adjustments[9].option).toEqual(move.options[8]);
		expect(move.adjustments[9].id).toEqual(11030);
		expect(move.adjustments[9].text).toEqual('Immer: in der 1. Minute - Grundtaktik - Mittelfeld: Spielmacher');
		expect(move.adjustments[10].option).toEqual(move.options[9]);
		expect(move.adjustments[10].id).toEqual(11027);
		expect(move.adjustments[10].text).toEqual('Immer: in der 1. Minute - Grundtaktik - Angriff: Mittelstürmer');

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

		$httpBackend.whenGET('../zugabgabe.php').respond(window.__html__['fixtures/move.setup.html']);
		$httpBackend.whenGET('../zugabgabe.php?p=1').respond(window.__html__['fixtures/move.actions.html']);
		$httpBackend.whenGET('../zugabgabe.php?p=2').respond(window.__html__['fixtures/move.options.html']);

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

// 
describe('Move controller', function () {

	var ctrl, Player, $httpBackend;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {

		Player = $injector.get('Player');
		$httpBackend = $injector.get('$httpBackend');

		$httpBackend.whenGET('../zugabgabe.php').respond(window.__html__['fixtures/move.setup.html']);
		$httpBackend.whenGET('../zugabgabe.php?p=1').respond(window.__html__['fixtures/move.actions.html']);
		$httpBackend.whenGET('../zugabgabe.php?p=2').respond(window.__html__['fixtures/move.options.html']);

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
