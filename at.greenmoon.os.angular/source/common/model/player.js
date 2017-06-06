/**
 * Player model.
 */
osApp.factory('Player', [function () {

	function Player () {

		this.id = 0;
		this.name = '';
		this.pos = '';
		this.alter = 0;
		this.moral = 0;
		this.fitness = 0;
		this.skill = 0;
		this.opti = 0;
		this.sonder = '';
	}

	Player.Positions = ['TOR','ABW','DMI','MIT','OMI','STU'];

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
