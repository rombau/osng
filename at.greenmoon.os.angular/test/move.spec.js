describe('Move', function () {

	var move, playerFactory;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {
		var Move = $injector.get('Move');
		var Player = $injector.get('Player');

		move = new Move();
		createPlayer = function (pos, opti) {
			var player = new Player();
			player.pos = pos;
			player.opti = opti;
			return player;
		}

		expect(move).toBeDefined();
	}));

	it('should sort players with position and opti', function () {

		move.players.push(createPlayer('TOR', 1));
		move.players.push(createPlayer('DMI', 1));
		move.players.push(createPlayer('ABW', 1));
		move.players.push(createPlayer('OMI', 1));
		move.players.push(createPlayer('MIT', 1));
		move.players.push(createPlayer('STU', 2));
		move.players.push(createPlayer('STU', 1));
		move.players.push(createPlayer('STU', 3));

		var sorted = move.sortPlayers();

		expect(sorted[0].pos).toEqual('STU');
		expect(sorted[0].opti).toEqual(3);
		expect(sorted[1].pos).toEqual('STU');
		expect(sorted[1].opti).toEqual(2);
		expect(sorted[2].pos).toEqual('STU');
		expect(sorted[2].opti).toEqual(1);
		expect(sorted[3].pos).toEqual('OMI');
		expect(sorted[4].pos).toEqual('MIT');
		expect(sorted[5].pos).toEqual('DMI');
		expect(sorted[6].pos).toEqual('ABW');
		expect(sorted[7].pos).toEqual('TOR');

	});

	it('should generate adjustment text for substitute', function () {

		var adjustment = new move.Adjustment();
		adjustment.option.item = 1;
		adjustment.option.page = 1;
		adjustment.option.text = 'Einwechslung';
		adjustment.params.zao_einspieler.text = 'Toto';
		adjustment.params.zao_spieler.text = 'Hugo';
		adjustment.params.zao_minute.text = '22';
		adjustment.params.zao_abhaengigkeit.text = 'Immer durchführen';
		adjustment.params.P1.text = 'A';
		adjustment.params.P2.text = '9';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Immer : Einwechslung von Toto für Hugo in der 22. Minute auf Position A9');

		adjustment.params.P3.text = 'als Torwart';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Immer : Einwechslung von Toto für Hugo in der 22. Minute als Torwart');

		adjustment.params.zao_abhaengigkeit.text = 'Bei Rückstand ab Minute';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Bei Rückstand : Einwechslung von Toto für Hugo ab der 22. Minute als Torwart');

		adjustment.params.zao_abhaengigkeit.text = 'Bei Mehr-Tore-Führung in Minute';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Bei Mehr-Tore-Führung : Einwechslung von Toto für Hugo in der 22. Minute als Torwart');

		adjustment.params.zao_abhaengigkeit.text = 'Bei Roter Karte TOR';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Bei Roter Karte TOR : Einwechslung von Toto für Hugo in der 22. Minute als Torwart');

		adjustment.params.zao_abhaengigkeit.text = 'Bei Fitness < 30';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Bei Fitness < 30 : Einwechslung von Toto für Hugo in der 22. Minute als Torwart');

	});

	it('should generate adjustment text for effort', function () {

		var adjustment = new move.Adjustment();
		adjustment.option.item = 2;
		adjustment.option.page = 1;
		adjustment.option.text = 'Einsatz';
		adjustment.params.zao_minute.text = '22';
		adjustment.params.zao_abhaengigkeit.text = 'Immer durchführen';
		adjustment.params.P1.text = '100%';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Immer : Einsatz einstellen auf 100% in der 22. Minute');

	});

	it('should generate adjustment text for hardness', function () {

		var adjustment = new move.Adjustment();
		adjustment.option.item = 3;
		adjustment.option.page = 1;
		adjustment.option.text = 'Härte';
		adjustment.params.zao_minute.text = '70';
		adjustment.params.zao_abhaengigkeit.text = 'Bei Rückstand in Minute';
		adjustment.params.P1.text = 'Hart';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Bei Rückstand : Härte einstellen auf Hart in der 70. Minute');

	});

	it('should generate adjustment text for way of play', function () {

		var adjustment = new move.Adjustment();
		adjustment.option.item = 4;
		adjustment.option.page = 1;
		adjustment.option.text = 'Spielweise';
		adjustment.params.zao_minute.text = '70';
		adjustment.params.zao_abhaengigkeit.text = 'Bei Rückstand in Minute';
		adjustment.params.P1.text = 'leicht Offensiv';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Bei Rückstand : Spielweise einstellen auf leicht Offensiv in der 70. Minute');

	});

	it('should generate adjustment text for position change', function () {

		var adjustment = new move.Adjustment();
		adjustment.option.item = 5;
		adjustment.option.page = 1;
		adjustment.option.text = 'Positionswechsel';
		adjustment.params.zao_spieler.text = 'Hugo';
		adjustment.params.zao_minute.text = '70';
		adjustment.params.zao_abhaengigkeit.text = 'Bei Rückstand in Minute';
		adjustment.params.P1.text = 'C';
		adjustment.params.P2.text = '7';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Bei Rückstand : Positionswechsel von Hugo auf Position C7 in der 70. Minute');

	});

	it('should generate adjustment text for man-to-man marking', function () {

		var adjustment = new move.Adjustment();
		adjustment.option.item = 6;
		adjustment.option.page = 1;
		adjustment.option.text = 'Manndeckung';
		adjustment.params.zao_spieler.text = 'Hugo';
		adjustment.params.zao_minute.text = '70';
		adjustment.params.zao_abhaengigkeit.text = 'Immer durchführen';
		adjustment.params.P1.text = 'Positionsbezogen';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Immer : Positionsbezogene Manndeckung durch Hugo in der 70. Minute');

		adjustment.params.P1.text = 'Aidan Duffy';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Immer : Manndeckung von Aidan Duffy durch Hugo in der 70. Minute');

		adjustment.params.P1.text = 'Manndeckung aufheben';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Immer : Manndeckung aufheben durch Hugo in der 70. Minute');

	});

	it('should generate adjustment text for player function', function () {

		var adjustment = new move.Adjustment();
		adjustment.option.item = 8;
		adjustment.option.page = 2;
		adjustment.option.text = 'Kapitän';
		adjustment.params.spieler_id.text = 'Hugo';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Kapitän : Hugo');

	});

	it('should generate adjustment text for tactics', function () {

		var adjustment = new move.Adjustment();
		adjustment.option.item = 16;
		adjustment.option.page = 2;
		adjustment.option.text = 'Taktik - Abwehr';
		adjustment.params.zao_minute.text = '70';
		adjustment.params.zao_abhaengigkeit.text = 'Immer durchführen';
		adjustment.params.P1.text = 'Normal';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Immer : in der 70. Minute - Grundtaktik - Abwehr : Normal');

		adjustment.option.item = 17;
		adjustment.option.text = 'Taktik - Mittelfeld';
		adjustment.params.P1.text = 'Pressing';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Immer : in der 70. Minute - Grundtaktik - Mittelfeld : Pressing');

		adjustment.option.item = 18;
		adjustment.option.text = 'Taktik - Angriff';
		adjustment.params.P1.text = 'Freistöße schinden';

		expect(move.generateAdjustmentText(adjustment)).toEqual('Immer : in der 70. Minute - Grundtaktik - Angriff : Freistöße schinden');

	});

});
