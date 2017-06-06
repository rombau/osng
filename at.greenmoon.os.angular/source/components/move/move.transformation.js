/**
 * Move transformations.
 */
osApp.factory('MoveTransformation', ['Move','Player','HtmlTransformationUtil',function (Move, Player, HtmlTransformationUtil) {

	var transformation = {

		transformSetup : function (html) {

			var move = new Move();

			var doc = HtmlTransformationUtil.getEnsuredDocument(html);

			var tables = doc.getElementsByTagName('table');

			var timeInformation = tables[1].rows[0].cells[0];
			var againstInformation = tables[1].rows[0].cells[1];
			var validInformation = tables[1].rows[0].cells[2];
			var tableRaster = tables[3];
			var tableSpieler = tables[4];

			var pattern = /ZA f.+r ZAT (\d+) Termin: \w+, ([A-z]+ )*(\d+)\.[ ]*([\w|ä]+)[\.| ]*(\d\d\d\d) ([A-z]+ )*(\d+):(\d+):*(\d+)*/gm;
			var matches = pattern.exec(timeInformation.textContent);

			if (matches) {
				move.information.zat = +matches[1];
				var day = matches[3];
				var month = (+matches[4] - 1) || ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"].indexOf(matches[4]);
				var year = matches[5];
				var hour = matches[7];
				var min = matches[8];
				var second = matches[9] || 0;
				move.information.date = new Date(year, month, day, hour, min, second);
			}
			pattern = /(\w+) ([\w|ä]+) : <a href="javascript:teaminfo\((\d+)\)">(.*)<\/a>/gm;
			matches = pattern.exec(againstInformation.innerHTML);
			if (matches) {
				move.information.type = matches[1];
				move.information.home = (matches[2] === 'Heim');
				move.information.against = {};
				move.information.against.id = +matches[3];
				move.information.against.name = matches[4];
			}

			move.valid = /Zugabgabe: G.+ltig/.test(validInformation.textContent);

			var row, r, cell, c;

			var grid = [];
			for (r = 1; r <= Move.GRID_ROWS; r++) {
				row = tableRaster.rows[r];
				for (c = 1; c <= Move.GRID_COLUMNS; c++) {
					grid.push(row.cells[c].textContent);
				}
			}

			for (r = 1; r < tableSpieler.rows.length; r++) {
				row = tableSpieler.rows[r];

				if (row.cells.length === 9) {

					var player = new Player();

					player.id = HtmlTransformationUtil.extractIdFromHref(row.cells[1].firstChild.href);

					player.name = row.cells[1].textContent;
					player.pos = row.cells[1].className;
					player.alter = +row.cells[2].textContent;
					player.moral = +row.cells[4].textContent;
					player.fitness = +row.cells[5].textContent;
					player.skill = +row.cells[6].textContent;
					player.opti = +row.cells[7].textContent;
					player.sonder = row.cells[8].textContent;

					player.col = null;
					player.row = null;

					var gridChar = row.cells[0].firstChild.value;
					if (gridChar === 'T') {
						player.col = 0;
						player.row = 0;
					} else {
						var substIdx = ['V','W','X','Y','Z','U'].indexOf(gridChar);
						if (substIdx >= 0) {
							player.col = -substIdx;
							player.row = -1;
						} else {
							var gridIdx = grid.indexOf(gridChar);
							if (gridChar && gridIdx >= 0) {
								player.col = gridIdx % 11 + 1;
								player.row = Math.floor(gridIdx / 11) + 1;
							}
						}
					}

					move.players.push(player);
				}
			}

			var select = doc.getElementsByName('lauf')[0];
			for (var o = 0; o < select.options.length; o++) {
				var zat = {};
				zat.value = +select.options[o].value;
				zat.label = select.options[o].text;
				if (zat.value > 0) {
					move.zats.push(zat);
				}
			}

			return move;
		},

		transformActions : function (html) {

			return transformation._transformOptions(html, 1);
		},

		transformOptions : function (html) {

			return transformation._transformOptions(html, 2);
		},

		_transformOptions : function (html, page) {

			var move = new Move();

			var doc = HtmlTransformationUtil.getEnsuredDocument(html);

			var optionmap = {}, key;

			var select = doc.getElementsByTagName('select')[0];
			for (var o = 0; o < select.options.length; o++) {
				var option = new move.Option();
				option.page = page;
				option.item = +select.options[o].value;
				option.text = select.options[o].text;
				if (option.item > 0) {
					move.options.push(option);
					key = option.text.split(' festlegen')[0].replace('schütze', '').replace('Taktik', 'Grundtaktik');
					optionmap[key] = option;
				}
			}

			var table = doc.getElementsByTagName('table')[3];
			for (var r = 0; r < table.rows.length - 1; r++) {
				var row = table.rows[r];

				var adjustment = new move.Adjustment();

				adjustment.id = +row.cells[0].firstChild.value;
				adjustment.text = row.cells[1].textContent.replace(/ *: /g, ' : ');

				for (key in optionmap) {
					if (optionmap.hasOwnProperty(key)) {
						if (adjustment.text.search(key) !== -1) {
							adjustment.option = optionmap[key];
						}
					}
				}
				move.adjustments.push(adjustment);
			}

			return move;
		},

		transformAdjustmentForm : function (html) {

			var form = {
				method : 'GET',
				lines : []
			};

			var doc = HtmlTransformationUtil.getEnsuredDocument(html);

			var table = doc.getElementsByTagName('table')[3];
			for (var r = 0; r < table.rows.length - 1; r++) {
				var row = table.rows[r];
				var noLabel = row.cells[0].getElementsByTagName('select').length > 0;

				var line = {
					label : noLabel ? '' : row.cells[0].textContent,
					combos : []
				};

				var selects = row.cells[noLabel ? 0 : 1].getElementsByTagName('select');
				var maxWidth = 12;
				for (var s = 0; s < selects.length; s++) {
					var select = selects[s];

					var combo = {
						name : select.name,
						options : []
					};

					var maxOptionLength = 0;
					for (var o = 0; o < select.options.length; o++) {
						var option = select.options[o];
						maxOptionLength = Math.max(maxOptionLength, option.textContent.length);
						combo.options.push({
							label : option.textContent.replace(/ \([A-T]\)/, Move.SET_PLAYER_INDICATOR).replace(/ \([U-Z]\)/, Move.SUBSTITUTE_INDICATOR),
							value : option.value
						});
					}

					combo.width = maxOptionLength > 2 ? maxOptionLength > 5 ? maxWidth : 3 : 2;
					combo.value = select.value || combo.options[0].value;
					line.combos.push(combo);

					maxWidth -= combo.width;
				}

				form.lines.push(line);
			}
			return form;
		},

		transformPlayers : function (players) {

			var p, playerSetup = [], substArr = [];

			for (p = 0; p < players.length; p++) {
				var player = players[p];
				if (player.row !== null && player.col !== null && player.row !== undefined && player.col !== undefined) {
					playerSetup.push(['player_' + player.id,player.col,player.row]);
					if (player.row === -1) { // substitute
						substArr[-player.col] = player;
					}
				}
			}

			if (playerSetup.length < 17) {
				// amatuer as substitute
				for (p = 0; p < 6; p++) {
					if (!substArr[p]) {
						playerSetup.push(['player_0',-p,-1]);
					}
				}
			}

			return 'aufstellung=' + JSON.stringify(playerSetup);

		}
	};
	return transformation;
}]);
