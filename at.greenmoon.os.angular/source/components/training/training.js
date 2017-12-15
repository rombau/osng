osApp.component('trainingComponent', {

	templateUrl : 'components/training/training.html',

	controller : ['TrainingWebClient',
		'Training',
		'Trainer',
		'Player',
		'Popup',
		function (TrainingWebClient, Training, Trainer, Player, Popup) {

			var ctrl = this;

			var persistedState;

			ctrl.training = new Training();

			var getCurrentState = function () {
				var state = '';
				for (var p = 0; p < ctrl.training.players.length; p++) {
					var player = ctrl.training.players[p];
					state = state + ';' + player.id + ';' + (player.setting ? player.setting.trainerkey : 0);
					state = state + ';' + player.id + ';' + (player.setting ? player.setting.skillnr : 0);
				}
				return state;
			};

			ctrl.isModified = function () {
				return getCurrentState() !== persistedState;
			};

			var loadSuccessHandler = function (training) {
				ctrl.training = training;
				persistedState = getCurrentState();
			};

			TrainingWebClient.loadTraining().then(loadSuccessHandler);

			ctrl.save = function () {
				TrainingWebClient.saveTraining(ctrl.training).then(function (response) {
					loadSuccessHandler(response.data);
				});
			};

			ctrl.load = function (approved) {
				if (approved) {
					TrainingWebClient.loadTraining(ctrl.training.configid).then(loadSuccessHandler);
					return;
				}
				Popup.open('trainingLoad');
			};

			ctrl.addPlayerSetting = function (player) {
				player.setting = new ctrl.training.Setting();
				player.setting.trainerkey = ctrl.training.trainer[0].getKey();
				ctrl.changeTrainerSelection();
			};

			ctrl.editPlayerSetting = function (player) {
				ctrl.dialog = {
					player : player,
					setting : new ctrl.training.Setting()
				};
				if (player.setting) {
					ctrl.dialog.setting.trainerkey = player.setting.trainerkey;
					ctrl.dialog.setting.skillnr = player.setting.skillnr;
				} else {
					ctrl.dialog.setting.trainerkey = ctrl.training.trainer[0].getKey();
				}
				Popup.open('trainingsetting', player);
			};

			ctrl.savePlayerSetting = function () {
				if (!ctrl.dialog.player.setting) {
					ctrl.dialog.player.setting = new ctrl.training.Setting();
				}
				if (ctrl.dialog.player.setting.trainerkey !== ctrl.dialog.setting.trainerkey) {
					ctrl.dialog.player.setting.trainerkey = ctrl.dialog.setting.trainerkey;
					ctrl.dialog.player.setting.chance = null;
					ctrl.changeTrainerSelection();
				}
				if (ctrl.dialog.player.setting.skillnr !== ctrl.dialog.setting.skillnr) {
					ctrl.dialog.player.setting.skillnr = ctrl.dialog.setting.skillnr;
					ctrl.dialog.player.setting.chance = null;
				}
			};

			ctrl.deletePlayerSetting = function (player) {
				if (player) {
					delete player.setting;
				} else {
					delete ctrl.dialog.player.setting;
					Popup.hide();
				}
				ctrl.changeTrainerSelection();
			};

			ctrl.openPlayer = function (player) {
				Popup.open('modalPlayer', player);
			};

			ctrl.changeTrainerSelection = function () {
				delete ctrl.trainerSelection;
			};

			ctrl.getTrainerSelection = function (player) {
				if (!ctrl.trainerSelection && ctrl.training.trainer.length > 0 && ctrl.training.players.length > 0) {
					var trainerSelection = {};
					var key;
					for (var t = 0; t < ctrl.training.trainer.length; t++) {
						key = ctrl.training.trainer[t].getKey();
						if (!trainerSelection[key]) {
							trainerSelection[key] = new Trainer(key);
						} else {
							trainerSelection[key].max += Trainer.MAX_PLAYERS;
						}
					}
					for (var p = 0; p < ctrl.training.players.length; p++) {
						var setting = ctrl.training.players[p].setting;
						if (setting && setting.trainerkey) {
							trainerSelection[setting.trainerkey].players++;
						}
					}
					ctrl.trainerSelection = [];
					for (key in trainerSelection) {
						if (trainerSelection.hasOwnProperty(key)) {
							ctrl.trainerSelection.push(trainerSelection[key]);
						}
					}
					ctrl.trainerSelection.sort(function (a, b) {
						return b.skill - a.skill;
					});

				}
				return ctrl.trainerSelection;
			};

			ctrl.getPlayerSkillSelection = function (player) {
				if (!player.trainingskillSelection) {
					player.trainingskillSelection = [];
					var nr = 1;
					for ( var skill in Player.Skill) {
						if (Player.Skill.hasOwnProperty(skill)) {
							var index = Player.Skill[skill];
							if (index === Player.Skill.FUQ || index === Player.Skill.ERF || index === Player.Skill.WID || index === Player.Skill.SEL || index === Player.Skill.DIS ||
								index === Player.Skill.EIN) {
								continue;
							}
							var label = player.getSkillCaption(index);
							if (player.setting && player.setting.skillnr === nr && player.setting.skillvalue) {
								label = label + ' (=' + player.setting.skillvalue + ')';
							} else if (player.skills[index]) {
								label = label + ' (=' + player.skills[index] + ')';
							}
							player.trainingskillSelection.push({
								nr : nr++,
								index : index,
								label : label,
								value : player.skills[index]
							});
						}
					}
				}
				return player.trainingskillSelection;
			};

			ctrl.getPlayerSkillName = function (player, shortForm) {
				var skillSelection = ctrl.getPlayerSkillSelection(player);
				for (var s = 0; s < skillSelection.length; s++) {
					var skill = skillSelection[s];
					if (skill.nr === player.setting.skillnr) {
						return player.getSkillCaption(skill.index, shortForm);
					}
				}
				return null;
			};

		}]
});
