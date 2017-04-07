var osApp = osApp || angular.module('OnlineSoccer');

osApp.factory('Player', [function () {

	function Player () {

		this.id = 0;
		this.name = '';
		this.pos = '';
		this.alter = 0;
		this.moral = 0;
		this.fitness = 0;
		this.skill = 0;
		this.opti = 0;
		this.sonder = '';
	}

	Player.Positions = ['TOR','ABW','DMI','MIT','OMI','STU'];

	Player.prototype = {

		getShortName : function () {
			var names = this.name.split(' ');
			return names[names.length - 1];
		}
	};

	return Player;
}]);

osApp.factory('HtmlTransformationUtil', [function () {

	return {

		extractIdFromHref : function (href) {

			if (href) {
				if (href.search(/javascript:.+(\d+)/) !== -1) {
					return +href.split("(")[1].split(")")[0];
				} else if (href.search(/sp\.php.+s=(\d+)/) !== -1) {
					return +href.split("s=")[1].split("&")[0];
				} else if (href.search(/st\.php.+c=(\d+)/) !== -1) {
					return +href.split("c=")[1].split("&")[0];
				}
			}
			return null;
		},

		getEnsuredDocument : function (html) {

			var pattern, matches;

			pattern = /F.+r die Dauer von ZAT (\d+) sind die Seiten von OS 2\.0 gesperrt!/gm;
			matches = pattern.exec(html);
			if (matches) {
				throw matches[0];
			}

			pattern = /Diese Seite ist ohne Team nicht verf.+gbar!/gm;
			matches = pattern.exec(html);
			if (matches) {
				throw matches[0];
			}

			return new DOMParser().parseFromString(html, "text/html");
		}
	};
}]);

osApp.factory('Move', ['Player',function (Player) {

	function Move () {

		this.valid = false;

		this.players = [];

		this.information = {};
		this.information.zat = 0;
		this.information.date = new Date();
		this.information.type = '';
		this.information.home = false;

		this.information.against = {};
		this.information.against.id = 0;
		this.information.against.name = '';

		this.options = [];

		this.Option = function () {

			this.page = 0;
			this.item = 0;
			this.text = '';
		};

		this.adjustments = [];

		this.Adjustment = function () {

			this.option = new Option();
			this.id = 0;
			this.text = '';

			this.params = {
				zao_einspieler : {},
				zao_spieler : {},
				zao_minute : {},
				zao_abhaengigkeit : {},
				P1 : {},
				P2 : {},
				P3 : {},
				spieler_id : {}
			};
		};
	}

	Move.GRID_ROWS = 15;
	Move.GRID_COLUMNS = 11;

	Move.SET_PLAYER_INDICATOR = ' ◉';
	Move.SUBSTITUTE_INDICATOR = ' ⇄';

	Move.prototype = {

		sortPlayers : function () {

			if (this.players.length > 0) {
				this.players.sort(function (a, b) {
					var pdiff = Player.Positions.indexOf(b.pos) - Player.Positions.indexOf(a.pos);
					if (pdiff === 0) {
						return b.opti - a.opti;
					} else {
						return pdiff;
					}
				});
			}
			return this.players;
		},

		getStartPlayersAverage : function (attr) {
			
			console.log('getStartPlayersAverage ' + attr);
			var sum = 0, count = 0;
			for (var p = 0; p < this.players.length; p++) {
				var player = this.players[p];
				if (player.row !== null && player.col !== null && player.row !== undefined && player.col !== undefined && player.row >= 0 && player[attr]) {
					console.log('add player ' + player.row + ' ' + player.col + ' ' + player[attr]);
					sum += player[attr];
					count++;
				}
			}
			var result = (Math.round(sum / count * 100)/100).toFixed(2);
			return isNaN(result) ? '' : result;
		},

		generateAdjustmentText : function (adjustment) {

			var idx, text = '';

			var dependence = adjustment.params.zao_abhaengigkeit.text, dependenceTime;

			if (dependence) {
				dependenceTime = 'in der ' + adjustment.params.zao_minute.text + '. Minute';
				if (dependence === 'Immer durchführen') {
					dependence = 'Immer';
				} else if (-1 !== (idx = dependence.search(/ in/))) {
					dependence = dependence.substring(0, idx);
				} else if (-1 !== (idx = dependence.search(/ ab/))) {
					dependence = dependence.substring(0, idx);
					dependenceTime = 'ab der ' + adjustment.params.zao_minute.text + '. Minute';
				}
			}

			switch (adjustment.option.item) {
			case 1:
				text += dependence;
				text += ' : ';
				text += adjustment.option.text;
				text += ' von ';
				text += adjustment.params.zao_einspieler.text;
				text += ' für ';
				text += adjustment.params.zao_spieler.text;
				text += ' ';
				text += dependenceTime;
				text += ' ';
				text += adjustment.params.P3.text || ('auf Position ' + adjustment.params.P1.text + adjustment.params.P2.text);
				break;
			case 5:
				text += dependence;
				text += ' : ';
				text += adjustment.option.text;
				text += ' von ';
				text += adjustment.params.zao_spieler.text;
				text += ' auf Position ';
				text += adjustment.params.P1.text + adjustment.params.P2.text;
				text += ' ';
				text += dependenceTime;
				break;
			case 6:
				text += dependence;
				text += ' : ';
				if (adjustment.params.P1.text === 'Positionsbezogen') {
					text += 'Positionsbezogene Manndeckung';
				} else if (adjustment.params.P1.text === 'Manndeckung aufheben') {
					text += 'Manndeckung aufheben';
				} else {
					text += ('Manndeckung von ' + adjustment.params.P1.text);
				}
				text += ' durch ';
				text += adjustment.params.zao_spieler.text;
				text += ' ';
				text += dependenceTime;
				break;
			case 2:
			case 3:
			case 4:
				text += dependence;
				text += ' : ';
				text += adjustment.option.text;
				text += ' einstellen auf ';
				text += adjustment.params.P1.text;
				text += ' ';
				text += dependenceTime;
				break;
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
				text = adjustment.option.text + ' : ' + adjustment.params.spieler_id.text;
				break;
			case 16:
			case 17:
			case 18:
				text += dependence;
				text += ' : ';
				text += dependenceTime;
				text += ' ';
				text += adjustment.option.text.replace('Taktik', '- Grundtaktik');
				text += ' : ';
				text += adjustment.params.P1.text;
				break;
			}

			return text;
		}
	};

	return Move;

}]);

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

			var playerSetup = [];

			for (var p = 0; p < players.length; p++) {
				var player = players[p];
				if (player.row !== null && player.col !== null && player.row !== undefined && player.col !== undefined) {
					playerSetup.push(['player_' + player.id,player.col,player.row]);
				}
			}

			return 'aufstellung=' + JSON.stringify(playerSetup);

		}
	};
	return transformation;
}]);

osApp.factory('MoveWebClient', ['$q','$http','Move','MoveTransformation',function ($q, $http, Move, MoveTransformation) {

	return {

		loadMove : function (zat) {

			var move;

			return $http({
				url : '../zugabgabe.php' + (zat ? '?lauf=' + zat : ''),
				method : 'GET',
				transformResponse : MoveTransformation.transformSetup
			}).then(function (response) {

				move = response.data;

				var deferred = $q.defer();
				var promises = [];

				promises.push($http({
					url : '../zugabgabe.php?p=1',
					method : 'GET',
					transformResponse : MoveTransformation.transformActions
				}));
				promises.push($http({
					url : '../zugabgabe.php?p=2',
					method : 'GET',
					transformResponse : MoveTransformation.transformOptions
				}));

				$q.all(promises).then(function (moveArray) {
					move.options = moveArray[0].data.options.concat(moveArray[1].data.options);
					move.adjustments = moveArray[0].data.adjustments.concat(moveArray[1].data.adjustments);
					deferred.resolve(move);
				}, deferred.reject, deferred.notify);

				return deferred.promise;
			});
		},

		saveMove : function (move) {

			return $http({
				url : '../zugabgabe_beta.php',
				method : 'POST',
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				},
				data : move.players,
				transformRequest : MoveTransformation.transformPlayers
			}).then(function (response) {

				var deferred = $q.defer();

				if (response.data === 'Count mismatch') {
					deferred.reject(response.data);
				}

				var promises = [];

				for (var a = 0; a < move.adjustments.length; a++) {
					var adjustment = move.adjustments[a];

					if (!adjustment.id || adjustment.markDeleted) {

						var params;
						if (adjustment.markDeleted) {
							params = {
								p : adjustment.option.page,
								delzae : adjustment.id,
								'delete' : '++++Gewählte+Aktion+löschen+++'
							};
						} else {
							params = {
								p : adjustment.option.page,
								itemcreate : adjustment.option.item,
								anlegen : '+++Neue+Aktion+anlegen+++'
							};
							for ( var p in adjustment.params) {
								if (adjustment.params.hasOwnProperty(p)) {
									params[p] = adjustment.params[p].value;
								}
							}
						}
						promises.push($http({
							url : '../zugabgabe.php',
							params : params,
							method : 'GET'
						}));
					}
				}

				$q.all(promises).then(function (responseArray) {

					$http({
						url : '../checkza.php',
						method : 'GET'
					}).then(deferred.resolve, deferred.reject, deferred.notify);

				}, deferred.reject, deferred.notify);

				return deferred.promise;
			});
		},

		loadAdjustmentForm : function (option) {

			return $http({
				url : '../zugabgabe.php?p=' + option.page + '&item=' + option.item,
				method : 'GET',
				transformResponse : MoveTransformation.transformAdjustmentForm
			});
		}
	};
}]);

osApp.component('moveComponent', {

	templateUrl : 'templates/move.html',

	controller : ['$location','$window','SharedState','MoveWebClient','Move',function ($location, $window, SharedState, MoveWebClient, Move) {

		var ctrl = this;

		ctrl.move = new Move();
		ctrl.adjustmentForm = {};

		var SUBSTITUTES = 6;

		/**
		 * grid initialization
		 */
		ctrl.grid = (function initGrid () {

			var rows = new Array(Move.GRID_ROWS);
			for (var r = 0; r < Move.GRID_ROWS; r++) {
				rows[r] = new Array(Move.GRID_COLUMNS);
			}
			return rows;
		})();

		ctrl.isPlayerSet = function (player) {

			if (player) {
				return player.row !== null && player.col !== null && player.row !== undefined && player.col !== undefined;
			}

			for (var p = 0; p < ctrl.move.players.length; p++) {
				if (ctrl.isPlayerSet(ctrl.move.players[p])) {
					return true;
				}
			}
			return false;
		};

		/**
		 * move (or add) player to grid
		 */
		ctrl.grid.setPlayer = function (player, x, y) {

			var playerToReplace = null;

			if (y > 0) {
				playerToReplace = ctrl.grid[y - 1][x - 1];
			} else if (x === 0 && y === 0) {
				playerToReplace = ctrl.getKeeper();
			} else {
				playerToReplace = ctrl.getSubst()[-x];
			}

			// Changes

			if (SharedState.get('activeTab') === 2) {

				if (y > 0) {
					if (player.row === -1) {
						ctrl.addAdjustment(ctrl.move.options[0], function (form) {
							ctrl.adjustmentForm.lines[0].combos[0].value = '' + player.id;
							if (playerToReplace) {
								form.lines[1].combos[0].value = '' + playerToReplace.id;
								form.lines[4].combos[2].value = 'K';
							} else {
								form.lines[4].combos[0].value = String.fromCharCode(65 + (Move.GRID_ROWS - y));
								form.lines[4].combos[1].value = '' + x;
							}
						});
					} else if (!playerToReplace) {
						ctrl.addAdjustment(ctrl.move.options[4], function (form) {
							form.lines[0].combos[0].value = '' + player.id;
							form.lines[1].combos[0].value = String.fromCharCode(65 + (Move.GRID_ROWS - y));
							form.lines[1].combos[1].value = '' + x;
						});
					}
				} else if (x === 0 && y === 0) {
					if (player.row === -1) {
						ctrl.addAdjustment(ctrl.move.options[0], function (form) {
							form.lines[0].combos[0].value = '' + player.id;
							if (playerToReplace) {
								form.lines[1].combos[0].value = '' + playerToReplace.id;
							}
							form.lines[4].combos[2].value = 'T';
						});
					}
				} else {
					if (player.row !== -1) {
						ctrl.addAdjustment(ctrl.move.options[0], function (form) {
							form.lines[1].combos[0].value = '' + player.id;
							if (playerToReplace) {
								form.lines[0].combos[0].value = '' + playerToReplace.id;
							}
							form.lines[4].combos[2].value = 'K';
						});
					}
				}

				return true;
			}

			// Setup

			if (y > 0) {
				ctrl.grid[y - 1][x - 1] = player;
			}

			if (ctrl.isPlayerSet(player) && player.row > 0) {
				ctrl.grid[player.row - 1][player.col - 1] = playerToReplace;
			}

			if (playerToReplace) {
				playerToReplace.row = player.row;
				playerToReplace.col = player.col;
			}

			player.row = y;
			player.col = x;

			return (playerToReplace);
		};

		/**
		 * remove player from grid
		 */
		ctrl.grid.removePlayer = function (player) {

			if (SharedState.get('activeTab') === 2) {
				return true;
			}

			if (ctrl.isPlayerSet(player) && player.row > 0) {
				ctrl.grid[player.row - 1][player.col - 1] = null;
			}
			player.row = null;
			player.col = null;

			return false;
		};

		ctrl.getKeeper = function () {

			for (var p = 0; p < ctrl.move.players.length; p++) {
				var player = ctrl.move.players[p];
				if (player.row === 0 && player.col === 0) {
					return player;
				}
			}
			return null;
		};

		ctrl.getSubst = function () {

			var subst = new Array(SUBSTITUTES);
			for (var p = 0; p < ctrl.move.players.length; p++) {
				var player = ctrl.move.players[p];
				if (player.row === -1) {
					subst[-player.col] = player;
				}
			}
			return subst;
		};

		ctrl.getAdjustments = function () {

			var adjustments = [];
			for (var a = 0; a < ctrl.move.adjustments.length; a++) {
				var adjustment = ctrl.move.adjustments[a];
				if (adjustment.id || !adjustment.markDeleted) {
					adjustments.push(adjustment);
				}
			}
			if (adjustments.length > 0) {
				adjustments.sort(function (a, b) {
					return a.option.item - b.option.item;
				});
			}
			return adjustments;
		};

		ctrl.addAdjustment = function (option, callback) {

			MoveWebClient.loadAdjustmentForm(option).then(function (response) {
				if (response.data && response.data.lines) {
					ctrl.option = option;
					ctrl.adjustmentForm = response.data;

					var playerNames = [];
					playerNames[Move.SET_PLAYER_INDICATOR] = [];
					playerNames[Move.SUBSTITUTE_INDICATOR] = [];
					for (var p = 0; p < ctrl.move.players.length; p++) {
						var player = ctrl.move.players[p];
						if (player.row === -1) {
							playerNames[Move.SUBSTITUTE_INDICATOR].push(player.name);
						} else if (ctrl.isPlayerSet(player)) {
							playerNames[Move.SET_PLAYER_INDICATOR].push(player.name);
						}
					}

					for (var l = 0; l < ctrl.adjustmentForm.lines.length; l++) {
						var line = ctrl.adjustmentForm.lines[l];
						for (var c = 0; c < line.combos.length; c++) {
							var combo = line.combos[c], optionText;
							for (var o = 0; o < combo.options.length; o++) {
								var opt = combo.options[o];
								if (playerNames[Move.SET_PLAYER_INDICATOR].indexOf(opt.label) >= 0) {
									opt.label += Move.SET_PLAYER_INDICATOR;
								} else if (playerNames[Move.SUBSTITUTE_INDICATOR].indexOf(opt.label) >= 0) {
									opt.label += Move.SUBSTITUTE_INDICATOR;
								}
							}
						}
					}

					if (callback) {
						callback(ctrl.adjustmentForm);
					}
					SharedState.turnOn('action');
				}
			});
		};

		ctrl.removeAdjustment = function (adjustment) {
			adjustment.markDeleted = !adjustment.markDeleted;
		};

		ctrl.saveAdjustment = function () {

			var move = new Move();
			var adjustment = new move.Adjustment();

			adjustment.option.item = ctrl.option.item;
			adjustment.option.page = ctrl.option.page;
			adjustment.option.text = ctrl.option.text;

			for (var l = 0; l < ctrl.adjustmentForm.lines.length; l++) {
				var line = ctrl.adjustmentForm.lines[l];
				for (var c = 0; c < line.combos.length; c++) {
					var combo = line.combos[c], optionText;
					for (var o = 0; o < combo.options.length; o++) {
						var option = combo.options[o];
						if (option.value === combo.value) {
							optionText = option.label.replace(Move.SET_PLAYER_INDICATOR, '').replace(Move.SUBSTITUTE_INDICATOR, '');
							break;
						}
					}
					adjustment.params[combo.name] = {
						value : combo.value,
						text : optionText
					};
				}
			}

			adjustment.text = move.generateAdjustmentText(adjustment);

			ctrl.move.adjustments.push(adjustment);
		};

		var loadSuccessHandler = function (move) {

			ctrl.move = move;
			ctrl.move.players = move.sortPlayers();

			for (var p = 0; p < ctrl.move.players.length; p++) {
				var player = ctrl.move.players[p];
				if (player.row > 0 && player.col > 0) {
					ctrl.grid[player.row - 1][player.col - 1] = player;
				}
			}
		};

		ctrl.save = function () {

			var count = 0;
			for (var p = 0; p < ctrl.move.players.length; p++) {
				var player = ctrl.move.players[p];
				if (ctrl.isPlayerSet(player)) {
					count++;
				}
			}

			if (count < 17) {
				$window.alert('Vorläufig ist es nicht möglich die Zugabgabe zu speichern, solange nicht 11 Spieler und 6 Ersatz aufgestellt sind!');
			} else {
				MoveWebClient.saveMove(ctrl.move).then(function () {
					MoveWebClient.loadMove().then(loadSuccessHandler);
					$window.open("../checkza.php", "checkza", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=yes,height=600,width=400");
				});
			}
		};

		ctrl.load = function (approved) {
			if (approved) {
				MoveWebClient.loadMove(ctrl.zat).then(loadSuccessHandler);
				ctrl.zat = null;
				return;
			}
			ctrl.zat = '1';
			SharedState.turnOn('load');
		};

		MoveWebClient.loadMove().then(loadSuccessHandler);
	}]
});

osApp.component('player', {

	templateUrl : 'templates/gridplayer.html',

	bindings : {
		player : '<object',
		onMove : '&',
		onRemove : '&'
	},

	controller : ['$scope','$element','$document','$drag','$touch','$timeout','SharedState',function ($scope, $element, $document, $drag, $touch, $timeout, SharedState) {

		var ctrl = this;

		var possibleDropAreas = [];
		possibleDropAreas.push(document.querySelector('.grid-container'));
		possibleDropAreas.push(document.querySelector('.keeper-container'));
		possibleDropAreas.push(document.querySelector('.subst-container'));

		var playerElement = $element[0].firstChild;
		var playerRect = playerElement.getBoundingClientRect();

		var setMovingStyle = (function () {

			if (ctrl.player.row === null && ctrl.player.col === null) {
				// hide/show right sidebar (players list) while moving
				var playerContainer = document.querySelector('.selection-container');
				if (playerContainer) {
					return function (moving) {
						if (moving) {
							angular.element(playerContainer).addClass('moving');
							angular.element(playerElement).addClass('moving');
						} else {
							angular.element(playerContainer).removeClass('moving');
							angular.element(playerElement).removeClass('moving');
						}
					};
				}
			}
			return function (moving) {
				if (moving) {
					angular.element(playerElement).addClass('moving');
					angular.element(playerElement.nextElementSibling).addClass('moving');
				} else {
					angular.element(playerElement).removeClass('moving');
					angular.element(playerElement.nextElementSibling).removeClass('moving');
				}
			};

		})();

		var dragMove = false;
		var dragHandler = {

			transform : function (element, transform, touch) {

				for (var r = 0; r < possibleDropAreas.length; r++) {
					if (possibleDropAreas[r]) {
						var area = possibleDropAreas[r].getBoundingClientRect();
						if (touch.x > area.left && touch.x < area.right && touch.y > area.top && touch.y < area.bottom) {
							transform.translateX = (area.left + ((touch.x - area.left) - ((touch.x - area.left) % playerRect.width))) - playerRect.left;
							transform.translateY = (area.top + ((touch.y - area.top) - ((touch.y - area.top) % playerRect.height))) - playerRect.top;
							return transform;
						}
					}
				}

				transform.translateX = touch.distanceX;
				transform.translateY = touch.distanceY;
				return transform;
			},

			start : function (drag, event) {
				dragMove = true;
				setMovingStyle(true);
				SharedState.turnOff('leftSwipe');
			},

			move : function (drag, event) {},

			cancel : function (drag, event) {
				setMovingStyle(false);
				dragMove = false;
			},

			end : function (drag, event) {

				var inArea = false;
				for (var r = 0; r < possibleDropAreas.length; r++) {
					if (possibleDropAreas[r]) {
						var area = possibleDropAreas[r].getBoundingClientRect();
						if (drag.x > area.left && drag.x < area.right && drag.y > area.top && drag.y < area.bottom) {
							var newX = Math.floor((drag.x - area.left) / playerRect.width) + 1;
							var newY = Math.floor((drag.y - area.top) / playerRect.height) + 1;
							if (r === 1) { // keeper
								newX = 0;
								newY = 0;
							} else if (r === 2) { // substitute
								newX = (newX - 1) * -1;
								newY = -1;
							}
							if (ctrl.onMove({
								player : ctrl.player,
								x : newX,
								y : newY
							})) {
								drag.reset();
							}
							inArea = true;
						}
					}
				}
				if (!inArea) {
					if (ctrl.player.row !== null && ctrl.player.col !== null) {
						if (ctrl.onRemove({
							player : ctrl.player
						})) {
							drag.reset();
						}
					} else {
						drag.reset();
					}
				}
				$timeout(function () {
					setMovingStyle(false);
					dragMove = false;
					$scope.$apply();
				}, 100);
			}

		};

		$drag.bind(playerElement, dragHandler, { /* drag options */});

		// needed to set moving style on tap/click
		$touch.bind(playerElement, {
			start : function (touch) {
				if (!dragMove) {
					playerRect = playerElement.getBoundingClientRect();
					setMovingStyle(true);
				}
			},
			cancel : function (touch) {
				if (!dragMove) {
					setMovingStyle(false);
				}
			},
			end : function (touch) {
				if (!dragMove) {
					setMovingStyle(false);
				}
			}
		}, { /* touch options */});

	}]
});
