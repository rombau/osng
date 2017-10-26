/**
 * Player model.
 */
osApp.factory('Player', [function () {

	function Player () {

		this.id = 0;
		this.name = '';
		this.pos = '';
		this.alter = 0;
		this.geburtstag = 0;
		this.land = '';
		this.flagge = '';
		this.moral = 0;
		this.fitness = 0;
		this.skills = [];
		this.skill = 0;
		this.opti = 0;
		this.sonder = '';
		this.gehalt = 0;
		this.marktwert = 0;
		this.vertrag = 0;

		this.team = null;
	}

	Player.Position = {
		LEI : 'LEI',
		TOR : 'TOR',
		ABW : 'ABW',
		DMI : 'DMI',
		MIT : 'MIT',
		OMI : 'OMI',
		STU : 'STU'
	};

	Player.Skill = {
		SCH : 0,
		BAK : 1,
		KOB : 2,
		ZWK : 3,
		DEC : 4,
		GES : 5,
		FUQ : 6,
		ERF : 7,
		AGG : 8,
		PAS : 9,
		AUS : 10,
		UEB : 11,
		WID : 12,
		SEL : 13,
		DIS : 14,
		ZUV : 15,
		EIN : 16
	};

	Player.prototype = {

		getShortName : function () {
			var space = this.name.indexOf(' ');
			if (space !== -1) {
				return this.name.substr(space + 1);
			} else {
				return this.name;
			}
		},

		isPrimarySkill : function (index) {
			switch (this.pos) {
			case Player.Position.TOR:
				if (index === Player.Skill.KOB || index === Player.Skill.ZWK || index === Player.Skill.DEC || index === Player.Skill.GES) {
					return true;
				}
				break;
			case Player.Position.ABW:
				if (index === Player.Skill.KOB || index === Player.Skill.ZWK || index === Player.Skill.DEC || index === Player.Skill.ZUV) {
					return true;
				}
				break;
			case Player.Position.DMI:
				if (index === Player.Skill.BAK || index === Player.Skill.DEC || index === Player.Skill.PAS || index === Player.Skill.UEB) {
					return true;
				}
				break;
			case Player.Position.MIT:
				if (index === Player.Skill.BAK || index === Player.Skill.ZWK || index === Player.Skill.PAS || index === Player.Skill.UEB) {
					return true;
				}
				break;
			case Player.Position.OMI:
				if (index === Player.Skill.BAK || index === Player.Skill.GES || index === Player.Skill.PAS || index === Player.Skill.UEB) {
					return true;
				}
				break;
			case Player.Position.STU:
				if (index === Player.Skill.SCH || index === Player.Skill.KOB || index === Player.Skill.ZWK || index === Player.Skill.GES) {
					return true;
				}
				break;
			}
			return false;
		},

		getSkillCaption : function (index) {
			switch (index) {
			case Player.Skill.SCH:
				return this.pos === Player.Position.TOR ? 'Abstoss' : 'Schuss';
			case Player.Skill.BAK:
				return this.pos === Player.Position.TOR ? 'Stellungsspiel' : 'Ballkontrolle';
			case Player.Skill.KOB:
				return this.pos === Player.Position.TOR ? 'Fangsicherheit' : 'Kopfball';
			case Player.Skill.ZWK:
				return this.pos === Player.Position.TOR ? 'Strafraumbeh.' : 'Zweikampf';
			case Player.Skill.DEC:
				return this.pos === Player.Position.TOR ? 'Spiel auf der Linie' : 'Deckung';
			case Player.Skill.GES:
				return this.pos === Player.Position.TOR ? 'Reflexe' : 'Geschwindigkeit';
			case Player.Skill.FUQ:
				return 'Führungsfertigkeit';
			case Player.Skill.ERF:
				return 'Erfahrung';
			case Player.Skill.AGG:
				return 'Aggressivität';
			case Player.Skill.PAS:
				return 'Passgenauigkeit';
			case Player.Skill.AUS:
				return 'Ausdauer';
			case Player.Skill.UEB:
				return 'Übersicht';
			case Player.Skill.WID:
				return 'Widerstandskraft';
			case Player.Skill.SEL:
				return 'Selbstbewusstsein';
			case Player.Skill.DIS:
				return 'Disziplin';
			case Player.Skill.ZUV:
				return 'Zuverlässigkeit';
			case Player.Skill.EIN:
				return 'Einstellung';
			}
		}

	};

	return Player;
}]);
