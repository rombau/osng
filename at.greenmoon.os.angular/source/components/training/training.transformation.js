osApp.factory('TrainingTransformation', ['Training','Trainer','Player','HtmlUtil',function (Training, Trainer, Player, HtmlUtil) {

	var transformation = {

		transformTrainer : function (html) {

			var trainers = [];

			var doc = HtmlUtil.getEnsuredDocument(html);

			var tableTrainer = doc.getElementsByTagName('table')[0];

			for (var r = 1; r < tableTrainer.rows.length; r++) {
				var row = tableTrainer.rows[r];

				if (row.cells.length === 5) {

					var trainer = new Trainer();

					trainer.name = row.cells[1].textContent;

					trainer.skill = Trainer.SKILLS[trainer.name.split(' ')[1] - 1];
					trainer.gehalt = +row.cells[2].textContent.replace(/\./g, '');
					trainer.vertrag = +row.cells[3].textContent;

					var pattern = /und ([\d+|\.]+) Euro Abfindung zahlen!/gm;
					var matches = pattern.exec(row.cells[4].textContent);

					if (matches) {
						trainer.abfindung = +matches[1].replace(/\./g, '');
					}

					trainers.push(trainer);
				}
			}

			return trainers;
		},

		transformTraining : function (html) {

			var training = new Training();

			var doc = HtmlUtil.getEnsuredDocument(html);

			var trainingSelect = doc.getElementsByName('trainingload')[0];
			for (var o = 1; o < trainingSelect.options.length; o++) {
				var config = new training.Config();
				config.id = +trainingSelect.options[o].value;
				config.label = trainingSelect.options[o].text;
				training.config.push(config);
			}

			var tableSpieler = doc.getElementsByTagName('table')[2];
			for (var r = 1; r < tableSpieler.rows.length; r++) {
				var row = tableSpieler.rows[r];

				if (row.cells.length === 8) {

					var player = new Player();

					player.id = HtmlUtil.extractIdFromHref(row.cells[1].firstChild.href);

					player.verletzt = (row.cells[0].childNodes.length > 0 ? true : false);
					player.name = row.cells[1].textContent;
					player.pos = row.cells[1].className;
					player.alter = +row.cells[2].textContent;
					player.opti = +row.cells[3].textContent;

					var trainerSelect = doc.getElementsByName('tr1' + player.id)[0];
					var skillSelect = doc.getElementsByName('tr2' + player.id)[0];

					if (r === 1) {
						for (var t = 1; t < trainerSelect.options.length; t++) {
							var pattern = /T (\d) ([\d|\.]+)/gm;
							var matches = pattern.exec(trainerSelect.options[t].text);
							if (matches) {
								var key = Trainer.SKILLS.indexOf(+matches[2]) + 1;
								training.trainer[t - 1] = new Trainer(key);
							}
						}
					}

					if (trainerSelect.value !== '0' && skillSelect.value !== '0' && !player.verletzt) {

						training.trainer[trainerSelect.value - 1].players += 1;

						player.setting = new training.Setting();
						player.setting.trainerkey = training.trainer[trainerSelect.value - 1].getKey();
						player.setting.skillnr = +skillSelect.value;
						player.setting.skillvalue = +row.cells[6].textContent;
						player.setting.chance = +row.cells[7].textContent.split(' %')[0];
					}

					training.players.push(player);
				}
			}

			return training;
		}
	};

	return transformation;
}]);
