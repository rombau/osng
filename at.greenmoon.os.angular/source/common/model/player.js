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
	}

	Player.Positions = ['TOR','ABW','DMI','MIT','OMI','STU'];

	Player.Skill = ['SCH','BAK','KOB','ZWK','DEC','GES','FUQ','ERF','AGG','PAS','AUS','UEB','WID','SEL','DIS','ZUV','EIN'];

	Player.prototype = {

		getShortName : function () {
			var space = this.name.indexOf(' ');
			if (space !== -1) {
				return this.name.substr(space);
			} else {
				return this.name;
			}
		}
	};

	return Player;
}]);
