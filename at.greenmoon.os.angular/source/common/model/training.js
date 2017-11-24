osApp.factory('Training', ['Player',
	'Trainer',
	function (Player, Trainer) {

		function Training () {

			this.selection = [];

			this.skillSelection = {};

			/**
			 * Saved training.
			 */
			this.Selection = function () {

				this.id = 0;
				this.label = '';
			};

			this.trainer = [];

			for (var t = 0; t < Trainer.MAX_COUNT; t++) {
				this.trainer[t] = new Trainer();
			}

			this.players = [];

			/**
			 * Training setting of a player.
			 */
			this.Setting = function () {

				this.trainer = null;
				this.skillnr = null;
				this.skillvalue = null;
				this.chance = null;
			};

			this.Setting.prototype = {

				getShortSkillName : function () {
					return 'xxx';
				},

				getSkillName : function () {
					return 'yyy';
				}
			};
		}

		Training.prototype = {

			getSkillSelection : function (player) {
				if (!this.skillSelection[player.pos]) {
					var nr = 0;
					this.skillSelection[player.pos] = [{
						nr : nr++
					}];
					for ( var skill in Player.Skill) {
						if (Player.Skill.hasOwnProperty(skill)) {
							var index = Player.Skill[skill];
							if (index === Player.Skill.FUQ || index === Player.Skill.ERF || index === Player.Skill.WID || index === Player.Skill.SEL || index === Player.Skill.DIS ||
								index === Player.Skill.EIN) {
								continue;
							}
							this.skillSelection[player.pos].push({
								nr : nr++,
								index : index,
								label : player.getSkillCaption(index),
								value : player.skills[index]
							});
						}
					}
				}
				return this.skillSelection[player.pos];
			},

			getSkillName : function (player, shortForm) {
				var skillSelection = this.getSkillSelection(player);
				for (var s = 0; s < skillSelection.length; s++) {
					var skill = skillSelection[s];
					if (skill.nr === player.setting.skillnr) {
						return player.getSkillCaption(skill.index, shortForm);
					}
				}
				return null;
			}
		};

		return Training;
	}]);
