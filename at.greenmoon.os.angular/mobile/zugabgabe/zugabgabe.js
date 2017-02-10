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

		// XXX row and col aren't properties of player model
		isSet : function () {
			return this.row != null && this.col != null; // jshint ignore:line
		},

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

osApp.factory('Zugabgabe', ['Player',function (Player) {

	function Zugabgabe () {

		this.players = [];

		this.information = {};
		this.information.zat = 0;
		this.information.date = new Date();
		this.information.type = '';
		this.information.home = false;

		this.information.against = {};
		this.information.against.id = 0;
		this.information.against.name = '';
	}

	Zugabgabe.GRID_ROWS = 15;
	Zugabgabe.GRID_COLUMNS = 11;

	Zugabgabe.prototype = {

		sortPlayers : function () {

			console.log('Player: ' + Player);
			console.log('Player.Positions: ' + Player.Positions);
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

	return Zugabgabe;

}]);

osApp.factory('ZugabgabeTransformation', ['Zugabgabe','Player','HtmlTransformationUtil',function (Zugabgabe, Player, HtmlTransformationUtil) {

	return {

		transformSetup : function (html) {

			var doc = new DOMParser().parseFromString(html, "text/html");

			var tables = doc.getElementsByTagName('table');

			var timeInformation = tables[1].rows[0].cells[0];
			var againstInformation = tables[1].rows[0].cells[1];
			var tableRaster = tables[3];
			var tableSpieler = tables[4];

			var za = new Zugabgabe();

			var pattern = /ZA f.+r ZAT (\d+) Termin: \w+, (\w+ )*(\d+)\. (\w+) (\d\d\d\d) (\w+ )*(\d+):(\d+)/gm;
			var matches = pattern.exec(timeInformation.textContent);
			if (matches) {
				za.information.zat = +matches[1];
				var day = matches[3];
				var month = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"].indexOf(matches[4]);
				var year = matches[5];
				var hour = matches[7];
				var min = matches[8];
				za.information.date = new Date(year, month, day, hour, min, 0);
			}
			pattern = /(\w+) ([\w|ä]+) : <a href="javascript:teaminfo\((\d+)\)">(.*)<\/a>/gm;
			matches = pattern.exec(againstInformation.innerHTML);
			if (matches) {
				za.information.type = matches[1];
				za.information.home = (matches[2] === 'Heim');
				za.information.against = {};
				za.information.against.id = +matches[3];
				za.information.against.name = matches[4];
			}

			var row, r, cell, c;

			var grid = [];
			for (r = 1; r <= Zugabgabe.GRID_ROWS; r++) {
				row = tableRaster.rows[r];
				for (c = 1; c <= Zugabgabe.GRID_COLUMNS; c++) {
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

					za.players.push(player);
				}
			}
			return za;
		}
	};
}]);

osApp.factory('ZugabgabeWebClient', ['$http','Zugabgabe','ZugabgabeTransformation',function ($http, Zugabgabe, ZugabgabeTransformation) {

	return {

		loadZugabgabe : function (zat) {

			return $http({
				url : '../zugabgabe.php',
				method : 'GET',
				transformResponse : ZugabgabeTransformation.transformSetup
			});
		},

		saveZugabgabe : function (zugabgabe) {

			// TODO transform parameters

			return $http({
				url : '../zugabgabe-beta.php',
				method : 'POST'
			});
		}
	};
}]);

osApp.component('zugabgabeComponent', {

	templateUrl : 'zugabgabe/zugabgabe.html',

	controller : function ($scope, $location, SharedState, ZugabgabeWebClient, Zugabgabe) {

		var ctrl = this;

		ctrl.players = [];

		var SUBSTITUTES = 6;

		/**
		 * grid initialization
		 */
		ctrl.grid = (function initGrid () {

			var rows = new Array(Zugabgabe.GRID_ROWS);
			for (var r = 0; r < Zugabgabe.GRID_ROWS; r++) {
				rows[r] = new Array(Zugabgabe.GRID_COLUMNS);
			}
			return rows;
		})();

		/**
		 * move (or add) player to grid
		 */
		ctrl.grid.setPlayer = function (player, x, y) {

			if (player.isSet() && player.row > 0) {
				ctrl.grid[player.row - 1][player.col - 1] = null;
			}

			if (y > 0) {
				if (ctrl.grid[y - 1][x - 1]) {
					return false;
				}
				ctrl.grid[y - 1][x - 1] = player;
			} else if (x === 0 && y === 0 && ctrl.getKeeper()) {
				return false;
			}

			player.row = y;
			player.col = x;

			return true;
		};

		/**
		 * remove player from grid
		 */
		ctrl.grid.removePlayer = function (player) {

			if (player.isSet() && player.row > 0) {
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

		ctrl.save = function () {
			console.log('SAVE: ' + JSON.stringify(ctrl.players));
		};

		ZugabgabeWebClient.loadZugabgabe().then(function (response) {

			ctrl.information = response.data.information;
			ctrl.players = response.data.sortPlayers();

			for (var p = 0; p < ctrl.players.length; p++) {
				var player = ctrl.players[p];
				if (player.row > 0 && player.col > 0) {
					ctrl.grid.setPlayer(player, player.col, player.row);
				}
			}

		}, function (response) {

			console.error(response);
			$location.path('#/error');
		});
	}
});

osApp.component('player', {

	templateUrl : 'zugabgabe/gridplayer.html',

	bindings : {
		player : '<object',
		onMove : '&',
		onRemove : '&'
	},

	controller : function ($scope, $element, $document, $drag, $timeout, SharedState) {

		var ctrl = this;

		var possibleDropAreas = [];
		possibleDropAreas.push(document.querySelector('.grid-container'));
		possibleDropAreas.push(document.querySelector('.keeper-container'));
		possibleDropAreas.push(document.querySelector('.subst-container'));

		var playerElement = $element[0].firstChild;
		var playerRect = playerElement.getBoundingClientRect();

		angular.element(playerElement).css('background-image', 'url("/faceprev.php?sid=' + ctrl.player.id + '")');

		var toggleMoving = (function () {

			if (!ctrl.player.isSet()) {
				// hide/show right sidebar (players list) while moving
				var playerContainer = document.querySelector('.player-container');
				if (playerContainer) {
					return function () {
						angular.element(playerContainer).toggleClass('moving');
						angular.element(playerElement).toggleClass('moving');
					};
				}
			}
			return function () {
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
							if (!ctrl.onMove({
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
					if (ctrl.player.isSet()) {
						ctrl.onRemove({
							player : ctrl.player
						});
					} else {
						drag.reset();
					}
				}
				$timeout(function () {
					toggleMoving();
				}, 100);
			}

		};

		$drag.bind(playerElement, dragHandler, { /* drag options */});
	}
});
