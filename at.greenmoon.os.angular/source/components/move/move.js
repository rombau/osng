/**
 * Move Component.
 */
osApp.component('moveComponent', {

	templateUrl : 'components/move/move.html',

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

			if (count < 11) {
				$window.alert('Vorläufig ist es nicht möglich die Zugabgabe zu speichern, solange nicht 11 Spieler aufgestellt sind!');
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
			ctrl.zat = ctrl.move.zats[0].value;
			SharedState.turnOn('load');
		};

		MoveWebClient.loadMove().then(loadSuccessHandler);
	}]
});
