describe(
	'Move transformation service',
	function () {

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

			var fixture = __html__['test/fixtures/move.setup.1.html'];

			var move = transformationService.transformSetup(fixture);

			expect(move.valid).toBeDefined();
			expect(move.valid).toBeTruthy();
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
			expect(move.players[36].row).toBeNull();
			expect(move.players[36].col).toBeNull();

		});

		it(
			'should format player setup for commit',
			function () {

				var fixture = __html__['test/fixtures/move.setup.1.html'];

				var move = transformationService.transformSetup(fixture);
				var playerSetup = transformationService.transformPlayers(move.players);

				expect(playerSetup)
					.toEqual(
						'aufstellung=[["player_41930",0,0],["player_105508",-5,-1],["player_58642",3,13],["player_60807",6,13],["player_100065",9,13],["player_111254",0,-1],["player_29915",3,10],["player_43418",9,10],["player_111249",-1,-1],["player_41361",9,6],["player_65138",-2,-1],["player_6082",3,6],["player_68491",6,8],["player_87418",-3,-1],["player_30081",4,3],["player_46019",8,3],["player_75105",-4,-1]]');
			});

		it('should extract alternativ date representation #1 from setup html', function () {

			var fixture = __html__['test/fixtures/move.setup.2.html'];

			var move = transformationService.transformSetup(fixture);

			expect(move.valid).toBeDefined();
			expect(move.valid).toBeFalsy();
			expect(move.information).toBeDefined();
			expect(move.information.zat).toEqual(11);
			expect(move.information.date.toUTCString()).toEqual('Tue, 14 Feb 2017 18:29:59 GMT');

		});

		it('should extract alternativ date representation #2 from setup html', function () {

			var fixture = __html__['test/fixtures/move.setup.3.html'];

			var move = transformationService.transformSetup(fixture);

			expect(move.valid).toBeDefined();
			expect(move.valid).toBeTruthy();
			expect(move.information).toBeDefined();
			expect(move.information.zat).toEqual(15);
			expect(move.information.date.toUTCString()).toEqual('Tue, 28 Feb 2017 18:30:00 GMT');

		});

		it('should throw error when actions html is invalid', function () {

			expect(function () {
				transformationService.transformActions('invalid')
			}).toThrow();

		});

		it('should extract information from actions html', function () {

			var fixture = __html__['test/fixtures/move.actions.html'];

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

			var fixture = __html__['test/fixtures/move.options.html'];

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
			expect(move.adjustments[8].text).toEqual('Immer : in der 1. Minute - Grundtaktik - Abwehr : Innenverteidigung');
			expect(move.adjustments[9].option).toEqual(move.options[8]);
			expect(move.adjustments[9].id).toEqual(11030);
			expect(move.adjustments[9].text).toEqual('Immer : in der 1. Minute - Grundtaktik - Mittelfeld : Spielmacher');
			expect(move.adjustments[10].option).toEqual(move.options[9]);
			expect(move.adjustments[10].id).toEqual(11027);
			expect(move.adjustments[10].text).toEqual('Immer : in der 1. Minute - Grundtaktik - Angriff : Mittelstürmer');

		});

		it('should throw error when adjustment html is invalid', function () {

			expect(function () {
				transformationService.transformAdjustmentForm('invalid')
			}).toThrow();

		});

		it('should extract information from adjustment html', function () {

			var fixture = __html__['test/fixtures/move.actions.subst.html'];

			var form = transformationService.transformAdjustmentForm(fixture);

			expect(form).toBeDefined();
			expect(form.method).toEqual('GET');
			expect(form.lines.length).toEqual(5);
			expect(form.lines[0].label).toEqual('Einwechselspieler');
			expect(form.lines[0].combos.length).toEqual(1);
			expect(form.lines[0].combos[0].name).toEqual('zao_einspieler');
			expect(form.lines[0].combos[0].width).toEqual(12);
			expect(form.lines[0].combos[0].options[0].label).toEqual('Anthony Downes ◉');
			expect(form.lines[0].combos[0].options[0].value).toEqual('75108');
			expect(form.lines[1].label).toEqual('Auswechselspieler');
			expect(form.lines[1].combos.length).toEqual(1);
			expect(form.lines[1].combos[0].name).toEqual('zao_spieler');
			expect(form.lines[1].combos[0].width).toEqual(12);
			expect(form.lines[2].label).toEqual('Spielminute');
			expect(form.lines[2].combos.length).toEqual(1);
			expect(form.lines[2].combos[0].name).toEqual('zao_minute');
			expect(form.lines[2].combos[0].width).toEqual(3);
			expect(form.lines[3].label).toEqual('Abhängigkeit');
			expect(form.lines[3].combos[0].width).toEqual(12);
			expect(form.lines[3].combos.length).toEqual(1);
			expect(form.lines[3].combos[0].name).toEqual('zao_abhaengigkeit');
			expect(form.lines[3].combos[0].width).toEqual(12);
			expect(form.lines[4].label).toEqual('Auf Position');
			expect(form.lines[4].combos.length).toEqual(3);
			expect(form.lines[4].combos[0].name).toEqual('P1');
			expect(form.lines[4].combos[0].width).toEqual(2);
			expect(form.lines[4].combos[1].name).toEqual('P2');
			expect(form.lines[4].combos[1].width).toEqual(2);
			expect(form.lines[4].combos[2].name).toEqual('P3');
			expect(form.lines[4].combos[2].width).toEqual(8);

		});

		it('should extract information from option adjustment html', function () {

			var fixture = __html__['test/fixtures/move.options.capt.html'];

			var form = transformationService.transformAdjustmentForm(fixture);

			expect(form).toBeDefined();
			expect(form.method).toEqual('GET');
			expect(form.lines.length).toEqual(1);

			expect(form.lines[0].label).toEqual('');
			expect(form.lines[0].combos.length).toEqual(1);
			expect(form.lines[0].combos[0].name).toEqual('spieler_id');
			expect(form.lines[0].combos[0].width).toEqual(12);
			expect(form.lines[0].combos[0].options[0].label).toEqual('Anthony Downes');
			expect(form.lines[0].combos[0].options[0].value).toEqual('75108');

		});

	});
