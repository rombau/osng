/**
 * Player model.
 */
osApp.factory('Player', [function () {

	function Player (name) {

		this.id = 0;
		this.name = name || '';
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
			var separators = [' ',' Van ',' van ',' De ',' de '];
			var shortname = this.name;
			var index = this.name.length;
			for (var s = 0; s < separators.length; s++) {
				var i = this.name.lastIndexOf(separators[s]);
				if (i > -1 && i < index) {
					index = i;
				}
			}
			if (index !== this.name.length) {
				shortname = this.name.substr(index + 1);
			}
			return shortname.replace(' ', '&nbsp;');
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

		getSkillCaption : function (index, shortForm) {
			switch (index) {
			case Player.Skill.SCH:
				return this.pos === Player.Position.TOR ? (shortForm ? 'ABS' : 'Abstoss') : (shortForm ? 'SCH' : 'Schuss');
			case Player.Skill.BAK:
				return this.pos === Player.Position.TOR ? (shortForm ? 'STS' : 'Stellungsspiel') : (shortForm ? 'BAK' : 'Ballkontrolle');
			case Player.Skill.KOB:
				return this.pos === Player.Position.TOR ? (shortForm ? 'FAN' : 'Fangsicherheit') : (shortForm ? 'KOB' : 'Kopfball');
			case Player.Skill.ZWK:
				return this.pos === Player.Position.TOR ? (shortForm ? 'STB' : 'Strafraumbeh.') : (shortForm ? 'ZWK' : 'Zweikampf');
			case Player.Skill.DEC:
				return this.pos === Player.Position.TOR ? (shortForm ? 'SPL' : 'Spiel auf der Linie') : (shortForm ? 'DEC' : 'Deckung');
			case Player.Skill.GES:
				return this.pos === Player.Position.TOR ? (shortForm ? 'REF' : 'Reflexe') : (shortForm ? 'GES' : 'Geschwindigkeit');
			case Player.Skill.FUQ:
				return shortForm ? 'FUQ' : 'Führungsfertigkeit';
			case Player.Skill.ERF:
				return shortForm ? 'ERF' : 'Erfahrung';
			case Player.Skill.AGG:
				return shortForm ? 'AGG' : 'Aggressivität';
			case Player.Skill.PAS:
				return shortForm ? 'PAS' : 'Passgenauigkeit';
			case Player.Skill.AUS:
				return shortForm ? 'AUS' : 'Ausdauer';
			case Player.Skill.UEB:
				return shortForm ? 'UEB' : 'Übersicht';
			case Player.Skill.WID:
				return shortForm ? 'WID' : 'Widerstandskraft';
			case Player.Skill.SEL:
				return shortForm ? 'SEL' : 'Selbstbewusstsein';
			case Player.Skill.DIS:
				return shortForm ? 'DIS' : 'Disziplin';
			case Player.Skill.ZUV:
				return shortForm ? 'ZUV' : 'Zuverlässigkeit';
			case Player.Skill.EIN:
				return shortForm ? 'EIN' : 'Einstellung';
			}
		}
	};

	return Player;
}]);
