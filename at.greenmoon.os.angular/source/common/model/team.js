/**
 * Team model.
 */
osApp.factory('Team', [function () {

	function Team () {

		this.id = 0;
		this.name = '';
		this.liga = 0;
		this.liganame = '';
		this.land = '';

		this.player = [];
	}

	return Team;
}]);
