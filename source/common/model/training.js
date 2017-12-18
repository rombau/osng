osApp.factory('Training', [function () {

	function Training () {

		this.config = [];

		/**
		 * Saved training configration.
		 */
		this.Config = function () {

			this.id = 0;
			this.label = '';
		};

		this.trainer = [];

		this.players = [];

		/**
		 * Training setting of a player.
		 */
		this.Setting = function () {

			this.trainerkey = null;
			this.skillnr = 1;
			this.skillvalue = null;
			this.chance = null;
		};

	}

	Training.prototype = {

	};

	return Training;
}]);
