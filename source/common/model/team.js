/**
 * Team model.
 */
osApp.factory('Team', [function () {

	function Team () {

		this.id = 0;
		this.name = 'Demoteam';
		this.image = '00000000.png';
		this.liga = 0;
		this.liganame = '';
		this.land = '';

		this.player = [];

		this.otherId = null;
	}

	Team.prototype = {

		getFullName : function () {
			return this.name + ' (' + this.liganame + ' ' + this.land + ')';
		}
	};

	return Team;
}]);
