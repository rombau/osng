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
		}
	};
}]);

osApp.factory('Move', ['Player',function (Player) {

	function Move () {

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
		};
	}

	Move.GRID_ROWS = 15;
	Move.GRID_COLUMNS = 11;

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
		}
	};

	return Move;

}]);

osApp.factory('MoveTransformation', ['Move','Player','HtmlTransformationUtil',function (Move, Player, HtmlTransformationUtil) {

	var transformation = {

		transformSetup : function (html) {

			var move = new Move();

			var doc = new DOMParser().parseFromString(html, "text/html");

			var tables = doc.getElementsByTagName('table');

			var timeInformation = tables[1].rows[0].cells[0];
			var againstInformation = tables[1].rows[0].cells[1];
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

			var doc = new DOMParser().parseFromString(html, "text/html");

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
				adjustment.text = row.cells[1].textContent;

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

			var doc = new DOMParser().parseFromString(html, "text/html");

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
							label : option.textContent,
							value : option.value
						});
					}

					combo.width = maxOptionLength > 2 ? maxOptionLength > 5 ? maxWidth : 3 : 2;
					combo.value = combo.options[0].value;
					line.combos.push(combo);

					maxWidth -= combo.width;
				}

				form.lines.push(line);
			}
			return form;
		}
	};
	return transformation;
}]);

osApp.factory('MoveWebClient', ['$q','$http','Move','MoveTransformation',function ($q, $http, Move, MoveTransformation) {

	return {

		loadMove : function (num) {

			var deferred = $q.defer();
			var promises = [];

			promises.push($http({
				url : '../zugabgabe.php',
				method : 'GET',
				transformResponse : MoveTransformation.transformSetup
			}));

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
				var move = moveArray[0].data;
				move.options = moveArray[1].data.options.concat(moveArray[2].data.options);
				move.adjustments = moveArray[1].data.adjustments.concat(moveArray[2].data.adjustments);
				deferred.resolve(move);
			}, deferred.reject, deferred.notify);

			return deferred.promise;
		},

		saveMove : function (move) {

			// TODO transform parameters

			return $http({
				url : '../zugabgabe-beta.php',
				method : 'POST'
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

	controller : ['$location','SharedState','MoveWebClient','Move',function ($location, SharedState, MoveWebClient, Move) {

		var ctrl = this;

		ctrl.players = [];
		ctrl.options = [];
		ctrl.adjustments = [];

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

			for (var p = 0; p < ctrl.players.length; p++) {
				if (ctrl.isPlayerSet(ctrl.players[p])) {
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
						ctrl.addAdjustment(ctrl.options[0], function (form) {
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
						ctrl.addAdjustment(ctrl.options[4], function (form) {
							form.lines[0].combos[0].value = '' + player.id;
							form.lines[1].combos[0].value = String.fromCharCode(65 + (Move.GRID_ROWS - y));
							form.lines[1].combos[1].value = '' + x;
						});
					}
				} else if (x === 0 && y === 0) {
					if (player.row === -1) {
						ctrl.addAdjustment(ctrl.options[0], function (form) {
							form.lines[0].combos[0].value = '' + player.id;
							if (playerToReplace) {
								form.lines[1].combos[0].value = '' + playerToReplace.id;
							}
							form.lines[4].combos[2].value = 'T';
						});
					}
				} else {
					if (player.row !== -1) {
						ctrl.addAdjustment(ctrl.options[0], function (form) {
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

			if (ctrl.isPlayerSet(player) && player.row > 0) {
				ctrl.grid[player.row - 1][player.col - 1] = null;
			}
			player.row = null;
			player.col = null;
		};

		ctrl.getKeeper = function () {

			for (var p = 0; p < ctrl.players.length; p++) {
				var player = ctrl.players[p];
				if (player.row === 0 && player.col === 0) {
					return player;
				}
			}
			return null;
		};

		ctrl.getSubst = function () {

			var subst = new Array(SUBSTITUTES);
			for (var p = 0; p < ctrl.players.length; p++) {
				var player = ctrl.players[p];
				if (player.row === -1) {
					subst[-player.col] = player;
				}
			}
			return subst;
		};

		ctrl.addAdjustment = function (option, callback) {

			MoveWebClient.loadAdjustmentForm(option).then(function (response) {
				ctrl.option = option;
				ctrl.adjustmentForm = response.data;
				if (callback) {
					callback(ctrl.adjustmentForm);
				}
				SharedState.turnOn('action');
			}, function (response) {
				console.error(response);
			});
		};

		ctrl.saveAdjustment = function () {

		};

		ctrl.save = function () {
			console.log('SAVE: ' + JSON.stringify(ctrl.players));
		};

		MoveWebClient.loadMove().then(function (move) {

			ctrl.information = move.information;
			ctrl.players = move.sortPlayers();
			ctrl.options = move.options;
			ctrl.adjustments = move.adjustments;

			for (var p = 0; p < ctrl.players.length; p++) {
				var player = ctrl.players[p];
				if (player.row > 0 && player.col > 0) {
					ctrl.grid[player.row - 1][player.col - 1] = player;
				}
			}

		}, function (response) {

			console.error(response);
			$location.path('#/error');
		});
	}]
});

osApp.component('player', {

	templateUrl : 'templates/gridplayer.html',

	bindings : {
		player : '<object',
		onMove : '&',
		onRemove : '&'
	},

	controller : ['$scope','$element','$document','$drag','$timeout','SharedState',function ($scope, $element, $document, $drag, $timeout, SharedState) {

		var ctrl = this;

		var possibleDropAreas = [];
		possibleDropAreas.push(document.querySelector('.grid-container'));
		possibleDropAreas.push(document.querySelector('.keeper-container'));
		possibleDropAreas.push(document.querySelector('.subst-container'));

		var playerElement = $element[0].firstChild;
		var playerRect = playerElement.getBoundingClientRect();

		var toggleMoving = (function () {

			if (ctrl.player.row === null && ctrl.player.col === null) {
				// hide/show right sidebar (players list) while moving
				var playerContainer = document.querySelector('.selection-container');
				if (playerContainer) {
					return function () {
						angular.element(playerContainer).toggleClass('moving');
						angular.element(playerElement).toggleClass('moving');
					};
				}
			}
			return function () {
				angular.element(playerElement).toggleClass('moving');
				angular.element(playerElement.nextElementSibling).toggleClass('moving');
			};

		})();

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

				playerRect = drag.startRect;
				toggleMoving();
				SharedState.turnOff('leftSwipe');
			},

			move : function (drag, event) {},

			cancel : function (drag, event) {
				toggleMoving();
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
						ctrl.onRemove({
							player : ctrl.player
						});
					} else {
						drag.reset();
					}
				}
				$timeout(function () {
					toggleMoving();
					$scope.$apply();
				}, 100);
			}

		};

		$drag.bind(playerElement, dragHandler, { /* drag options */});
	}]
});
