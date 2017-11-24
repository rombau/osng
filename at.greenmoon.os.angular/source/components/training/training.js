osApp.component('trainingComponent', {

	templateUrl : 'components/training/training.html',

	controller : ['TrainingWebClient','Training','Player','Popup',function (TrainingWebClient, Training, Player, Popup) {

		var ctrl = this;

		ctrl.training = new Training();

		var loadSuccessHandler = function (training) {
			ctrl.training = training;
		};

		TrainingWebClient.loadTraining().then(loadSuccessHandler);

		ctrl.save = function () {

		};

		ctrl.load = function (approved) {

			Popup.open('trainingLoad');

		};

		ctrl.openPlayer = function (player) {

			Popup.open('modalPlayer', player);
		};

		ctrl.editPlayerSetting = function (player) {

			console.log(player.name);
		};

	}]
});
