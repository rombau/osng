osApp.factory('Trainer', [function () {

	function Trainer () {

		this.name = Trainer.NAME;
		this.skill = 0;
		this.gehalt = 0;
		this.vertrag = 0;
		this.abfindung = 0;

		this.slots = Trainer.MAX_PLAYERS;
	}

	Trainer.NAME = 'Trainer';
	Trainer.MAX_COUNT = 6;
	Trainer.MAX_PLAYERS = 5;

	Trainer.SKILLS = [60,62.5,65,67.5,70,72.5,75,77.5,80,82.5,85,87.5,90,92.5,95,97.5,99.5];

	Trainer.prototype = {

	};

	return Trainer;
}]);
