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
				var selection = new training.Selection();
				selection.id = +trainingSelect.options[o].value;
				selection.label = trainingSelect.options[o].text;
				training.selection.push(selection);
			}

			var tableSpieler = doc.getElementsByTagName('table')[2];
			for (var r = 1; r < tableSpieler.rows.length; r++) {
				var row = tableSpieler.rows[r];

				if (row.cells.length === 8) {

					var player = new Player();

					player.id = HtmlUtil.extractIdFromHref(row.cells[1].firstChild.href);

					player.name = row.cells[1].textContent;
					player.pos = row.cells[1].className;
					player.alter = +row.cells[2].textContent;
					player.opti = +row.cells[3].textContent;

					var trainerSelect = doc.getElementsByName('tr1' + player.id)[0];
					var skillSelect = doc.getElementsByName('tr2' + player.id)[0];

					if (trainerSelect.value !== '0' && skillSelect.value !== '0') {

						var pattern = /T (\d) ([\d|\.]+)/gm;
						var matches = pattern.exec(trainerSelect.selectedOptions[0].text);

						if (matches) {

							var trainer = training.trainer[matches[1] - 1];

							trainer.skill = +matches[2];
							trainer.name = Trainer.NAME + ' ' + (Trainer.SKILLS.indexOf(trainer.skill) + 1);

							trainer.slots--;

							player.setting = new training.Setting();
							player.setting.trainer = trainer;
							player.setting.skillnr = +skillSelect.value;
							player.setting.skillvalue = +row.cells[6].textContent;
							player.setting.chance = +row.cells[7].textContent.split(' %')[0];
						}
					}

					training.players.push(player);
				}
			}

			return training;
		}
	};

	return transformation;
}]);
