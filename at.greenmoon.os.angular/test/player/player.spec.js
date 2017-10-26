describe('Player', function () {

	var player;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {

		Player = $injector.get('Player');
		player = new Player();

	}));

	it('should return short name', function () {

		player.name = 'Ronaldo';

		expect(player.getShortName()).toEqual('Ronaldo');

		player.name = 'Marco Van Basten';

		expect(player.getShortName()).toEqual('Van Basten');

		player.name = 'Marco Van Basten';

		expect(player.getShortName()).toEqual('Van Basten');

	});

	it('should identify primary skill for different positions', function () {

		player.pos = Player.Position.TOR;

		expect(player.isPrimarySkill(Player.Skill.SCH)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.BAK)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.KOB)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.ZWK)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.DEC)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.GES)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.FUQ)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ERF)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.AGG)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.PAS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.AUS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.UEB)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.WID)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.SEL)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.DIS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ZUV)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.EIN)).toBeFalsy();

		player.pos = Player.Position.ABW;

		expect(player.isPrimarySkill(Player.Skill.SCH)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.BAK)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.KOB)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.ZWK)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.DEC)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.GES)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.FUQ)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ERF)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.AGG)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.PAS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.AUS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.UEB)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.WID)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.SEL)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.DIS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ZUV)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.EIN)).toBeFalsy();

		player.pos = Player.Position.DMI;

		expect(player.isPrimarySkill(Player.Skill.SCH)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.BAK)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.KOB)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ZWK)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.DEC)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.GES)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.FUQ)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ERF)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.AGG)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.PAS)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.AUS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.UEB)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.WID)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.SEL)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.DIS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ZUV)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.EIN)).toBeFalsy();

		player.pos = Player.Position.MIT;

		expect(player.isPrimarySkill(Player.Skill.SCH)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.BAK)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.KOB)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ZWK)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.DEC)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.GES)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.FUQ)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ERF)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.AGG)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.PAS)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.AUS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.UEB)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.WID)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.SEL)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.DIS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ZUV)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.EIN)).toBeFalsy();

		player.pos = Player.Position.OMI;

		expect(player.isPrimarySkill(Player.Skill.SCH)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.BAK)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.KOB)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ZWK)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.DEC)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.GES)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.FUQ)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ERF)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.AGG)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.PAS)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.AUS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.UEB)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.WID)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.SEL)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.DIS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ZUV)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.EIN)).toBeFalsy();

		player.pos = Player.Position.STU;

		expect(player.isPrimarySkill(Player.Skill.SCH)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.BAK)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.KOB)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.ZWK)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.DEC)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.GES)).toBeTruthy();
		expect(player.isPrimarySkill(Player.Skill.FUQ)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ERF)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.AGG)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.PAS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.AUS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.UEB)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.WID)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.SEL)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.DIS)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.ZUV)).toBeFalsy();
		expect(player.isPrimarySkill(Player.Skill.EIN)).toBeFalsy();

	});

	it('should return skill caption for different positions', function () {

		player.pos = Player.Position.TOR;

		expect(player.getSkillCaption(Player.Skill.SCH)).toEqual('Abstoss');
		expect(player.getSkillCaption(Player.Skill.BAK)).toEqual('Stellungsspiel');
		expect(player.getSkillCaption(Player.Skill.KOB)).toEqual('Fangsicherheit');
		expect(player.getSkillCaption(Player.Skill.ZWK)).toEqual('Strafraumbeh.');
		expect(player.getSkillCaption(Player.Skill.DEC)).toEqual('Spiel auf der Linie');
		expect(player.getSkillCaption(Player.Skill.GES)).toEqual('Reflexe');
		expect(player.getSkillCaption(Player.Skill.FUQ)).toEqual('Führungsfertigkeit');
		expect(player.getSkillCaption(Player.Skill.ERF)).toEqual('Erfahrung');
		expect(player.getSkillCaption(Player.Skill.AGG)).toEqual('Aggressivität');
		expect(player.getSkillCaption(Player.Skill.PAS)).toEqual('Passgenauigkeit');
		expect(player.getSkillCaption(Player.Skill.AUS)).toEqual('Ausdauer');
		expect(player.getSkillCaption(Player.Skill.UEB)).toEqual('Übersicht');
		expect(player.getSkillCaption(Player.Skill.WID)).toEqual('Widerstandskraft');
		expect(player.getSkillCaption(Player.Skill.SEL)).toEqual('Selbstbewusstsein');
		expect(player.getSkillCaption(Player.Skill.DIS)).toEqual('Disziplin');
		expect(player.getSkillCaption(Player.Skill.ZUV)).toEqual('Zuverlässigkeit');
		expect(player.getSkillCaption(Player.Skill.EIN)).toEqual('Einstellung');

		player.pos = Player.Position.ABW;

		expect(player.getSkillCaption(Player.Skill.SCH)).toEqual('Schuss');
		expect(player.getSkillCaption(Player.Skill.BAK)).toEqual('Ballkontrolle');
		expect(player.getSkillCaption(Player.Skill.KOB)).toEqual('Kopfball');
		expect(player.getSkillCaption(Player.Skill.ZWK)).toEqual('Zweikampf');
		expect(player.getSkillCaption(Player.Skill.DEC)).toEqual('Deckung');
		expect(player.getSkillCaption(Player.Skill.GES)).toEqual('Geschwindigkeit');
		expect(player.getSkillCaption(Player.Skill.FUQ)).toEqual('Führungsfertigkeit');
		expect(player.getSkillCaption(Player.Skill.ERF)).toEqual('Erfahrung');
		expect(player.getSkillCaption(Player.Skill.AGG)).toEqual('Aggressivität');
		expect(player.getSkillCaption(Player.Skill.PAS)).toEqual('Passgenauigkeit');
		expect(player.getSkillCaption(Player.Skill.AUS)).toEqual('Ausdauer');
		expect(player.getSkillCaption(Player.Skill.UEB)).toEqual('Übersicht');
		expect(player.getSkillCaption(Player.Skill.WID)).toEqual('Widerstandskraft');
		expect(player.getSkillCaption(Player.Skill.SEL)).toEqual('Selbstbewusstsein');
		expect(player.getSkillCaption(Player.Skill.DIS)).toEqual('Disziplin');
		expect(player.getSkillCaption(Player.Skill.ZUV)).toEqual('Zuverlässigkeit');
		expect(player.getSkillCaption(Player.Skill.EIN)).toEqual('Einstellung');

	});

});
