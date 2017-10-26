describe('Player transformation service', function () {

	var transformationService;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {
		transformationService = $injector.get('PlayerTransformation');
	}));

	it('should throw error when player html is invalid', function () {

		expect(function () {
			transformationService.transformPlayer('invalid')
		}).toThrow();

	});

	it('should extract information from player html', function () {

		var fixture = __html__['test/_fixtures/player.html'];

		var player = transformationService.transformPlayer(fixture);

		expect(player.id).toEqual(104071);
		expect(player.name).toEqual('Anker Jensen');
		expect(player.alter).toEqual(20);
		expect(player.gehalt).toEqual(43919);
		expect(player.land).toEqual('Dänemark');
		expect(player.flagge).toEqual('/images/flaggen/DEN.gif');
		expect(player.geburtstag).toEqual(12);
		expect(player.vertrag).toEqual(59);
		expect(player.marktwert).toEqual(5756644);
		expect(player.pos).toEqual('STU');

		expect(player.team.id).toEqual(57);
		expect(player.team.name).toEqual('FC Nivellois');
		expect(player.team.liga).toEqual(2);
		expect(player.team.liganame).toEqual('2. Liga A');
		expect(player.team.land).toEqual('Belgien');

		expect(player.skill).toEqual(36.47);
		expect(player.opti).toEqual(65.04);

		expect(player.skills[0]).toEqual(90);
		expect(player.skills[1]).toEqual(29);
		expect(player.skills[2]).toEqual(53);
		expect(player.skills[3]).toEqual(56);
		expect(player.skills[4]).toEqual(21);
		expect(player.skills[5]).toEqual(85);
		expect(player.skills[6]).toEqual(0);
		expect(player.skills[7]).toEqual(7);
		expect(player.skills[8]).toEqual(31);
		expect(player.skills[9]).toEqual(15);
		expect(player.skills[10]).toEqual(22);
		expect(player.skills[11]).toEqual(33);
		expect(player.skills[12]).toEqual(49);
		expect(player.skills[13]).toEqual(61);
		expect(player.skills[14]).toEqual(5);
		expect(player.skills[15]).toEqual(29);
		expect(player.skills[16]).toEqual(34);
	});

});
