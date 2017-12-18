osApp.factory('Trainer', [function () {

	function Trainer (key) {

		this.name = Trainer.NAME + ' ' + (key || 1);
		this.skill = Trainer.SKILLS[(key - 1) || 0];
		this.gehalt = 0;
		this.vertrag = 0;
		this.abfindung = 0;

		this.max = Trainer.MAX_PLAYERS;
		this.players = 0;
	}

	Trainer.NAME = 'Trainer';
	Trainer.MAX_COUNT = 6;
	Trainer.MAX_PLAYERS = 5;

	Trainer.SKILLS = [60,62.5,65,67.5,70,72.5,75,77.5,80,82.5,85,87.5,90,92.5,95,97.5,99.5];

	Trainer.prototype = {

		getKey : function () {
			if (!this.name || this.name.indexOf(' ') === -1) {
				return null;
			}
			return this.name.split(' ')[1];
		}
	};

	return Trainer;
}]);
