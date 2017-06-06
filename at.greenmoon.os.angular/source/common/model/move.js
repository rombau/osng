/**
 * Move model.
 */
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

		this.zats = [];
		
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
			
			var sum = 0, count = 0;
			for (var p = 0; p < this.players.length; p++) {
				var player = this.players[p];
				if (player.row !== null && player.col !== null && player.row !== undefined && player.col !== undefined && player.row >= 0 && player[attr]) {
					sum += player[attr];
					count++;
				}
			}
			var result = (Math.round(sum / 11 * 100)/100).toFixed(2);
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
