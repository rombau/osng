describe('Move controller', function () {

	var rootScope, ctrl, SharedState, Player;

	beforeEach(module('OnlineSoccer', function ($provide) {
		$provide.service('MoveWebClient', function ($q, Move) {
			return {
				loadMove : function () {
					var move = new Move();
					move.options[0] = {
						page : 1,
						item : 1,
						text : 'Einwechslung'
					};
					move.options[4] = {
						page : 1,
						item : 5,
						text : 'Positionswechsel'
					};
					return $q.when(move);
				},
				loadAdjustmentForm : function () {
					var lineMock = function () {
						this.combos = [{
							options : []
						},{
							options : []
						},{
							options : []
						}]
					}
					return $q.when({
						data : {
							method : 'GET',
							lines : [new lineMock(),new lineMock(),new lineMock(),new lineMock(),new lineMock()]
						}
					});
				}
			};
		});
	}));

	beforeEach(inject(function ($injector) {

		Player = $injector.get('Player');
		SharedState = $injector.get('SharedState');

		rootScope = $injector.get('$rootScope').$new();

		SharedState.initialize(rootScope, 'activeTab');
		SharedState.initialize(rootScope, 'moveAction');

		$componentController = $injector.get('$componentController');
		ctrl = $componentController('moveComponent');

		rootScope.$digest();

	}));

	it('should initialize scope data', function () {

		expect(ctrl).toBeDefined();
		expect(ctrl.move.information).toBeDefined();
		expect(ctrl.move.players).toBeDefined();

	});

	it('should initialize field grid', function () {

		expect(ctrl.grid).toBeDefined();
		expect(ctrl.grid.length).toEqual(15);
		expect(ctrl.grid[0].length).toEqual(11);

	});

	it('should know if player is not set', function () {

		var player = new Player();
		ctrl.move.players.push(player);

		expect(ctrl.isPlayerSet(player)).toBeFalsy();
		expect(ctrl.isPlayerSet()).toBeFalsy();

	});

	it('should know if player is set', function () {

		var player = new Player();
		ctrl.move.players.push(player);

		ctrl.grid.setPlayer(player, 1, 1);

		expect(ctrl.isPlayerSet(player)).toBeTruthy();
		expect(ctrl.isPlayerSet()).toBeTruthy();

	});

	it('should set player to grid', function () {

		ctrl.grid.setPlayer(new Player(), 1, 1);

		expect(ctrl.grid[0][0]).toBeDefined();
		expect(ctrl.grid[0][0]).not.toBeNull();
		expect(ctrl.grid[0][0].row).toEqual(1);
		expect(ctrl.grid[0][0].col).toEqual(1);
		expect(ctrl.isPlayerSet(ctrl.grid[0][0])).toBeTruthy();

	});

	it('should move player to new grid position', function () {

		var player = new Player();
		ctrl.grid.setPlayer(player, 1, 1);

		ctrl.grid.setPlayer(player, 2, 2);

		expect(ctrl.grid[0][0]).toBeUndefined();
		expect(ctrl.grid[1][1]).not.toBeNull();
		expect(ctrl.grid[1][1].row).toEqual(2);
		expect(ctrl.grid[1][1].col).toEqual(2);

	});

	it('should set player to occupied grid position', function () {

		var player1 = new Player();
		var player2 = new Player();
		ctrl.grid.setPlayer(player1, 1, 1);

		ctrl.grid.setPlayer(player2, 1, 1);

		expect(ctrl.grid[0][0]).toBeDefined();
		expect(ctrl.grid[0][0]).toEqual(player2);
		expect(player1.row).toBeUndefined();
		expect(player1.col).toBeUndefined();
		expect(player2.row).toEqual(1);
		expect(player2.col).toEqual(1);

	});

	it('should move player to occupied grid position', function () {

		var player1 = new Player();
		var player2 = new Player();
		ctrl.grid.setPlayer(player1, 1, 1);
		ctrl.grid.setPlayer(player2, 2, 2);

		ctrl.grid.setPlayer(player2, 1, 1);

		expect(ctrl.grid[0][0]).toBeDefined();
		expect(ctrl.grid[0][0]).toEqual(player2);
		expect(player1.row).toEqual(2);
		expect(player1.col).toEqual(2);
		expect(player2.row).toEqual(1);
		expect(player2.col).toEqual(1);

	});

	it('should set player to keeper position', function () {

		var player = new Player();

		ctrl.move.players.push(player);
		ctrl.grid.setPlayer(player, 0, 0);

		expect(ctrl.getKeeper()).toEqual(player);
		expect(player.row).toEqual(0);
		expect(player.col).toEqual(0);
		expect(ctrl.isPlayerSet(player)).toBeTruthy();

	});

	it('should set player to substitute', function () {

		var player = new Player();

		ctrl.move.players.push(player);
		ctrl.grid.setPlayer(player, -1, -1);

		expect(ctrl.getSubst()).toBeDefined();
		expect(ctrl.getSubst().length).toEqual(6);
		expect(ctrl.getSubst()[1]).toEqual(player);
		expect(player.row).toEqual(-1);
		expect(player.col).toEqual(-1);
		expect(ctrl.isPlayerSet(player)).toBeTruthy();

	});

	it('should remove player from grid', function () {

		var player = new Player();
		ctrl.grid.setPlayer(player, 1, 1);

		ctrl.grid.removePlayer(player);

		expect(ctrl.grid[0][0]).toBeNull();
		expect(player.row).toBeNull();
		expect(player.col).toBeNull();

	});

	it('should show adjustment form for any option', function () {

		ctrl.addAdjustment({
			page : 1,
			item : 1,
			text : ''
		});

		rootScope.$digest();

		expect(SharedState.isActive('moveAction')).toBeTruthy();
		expect(ctrl.option.page).toEqual(1);
		expect(ctrl.option.item).toEqual(1);
		expect(ctrl.option.text).toEqual('');
		expect(ctrl.adjustmentForm).toBeDefined();
		expect(ctrl.adjustmentForm.method).toEqual('GET');

	});

	it('should reset any player move in change mode', function () {

		var player = new Player();
		player.id = 4711;
		ctrl.grid.setPlayer(player, 1, 1);

		SharedState.setOne('activeTab', 2);
		var resetUi = ctrl.grid.setPlayer(player, 2, 2);

		rootScope.$digest();

		expect(resetUi).toBeTruthy();
		expect(player.row).toEqual(1);
		expect(player.col).toEqual(1);

	});

	it('should move player to new grid position in change mode', function () {

		var player = new Player();
		player.id = 4711;
		ctrl.grid.setPlayer(player, 1, 1);

		SharedState.setOne('activeTab', 2);
		ctrl.grid.setPlayer(player, 2, 2);

		rootScope.$digest();

		expect(SharedState.isActive('moveAction')).toBeTruthy();
		expect(ctrl.option.page).toEqual(1);
		expect(ctrl.option.item).toEqual(5);
		expect(ctrl.option.text).toEqual('Positionswechsel');
		expect(ctrl.adjustmentForm).toBeDefined();
		expect(ctrl.adjustmentForm.method).toEqual('GET');
		expect(ctrl.adjustmentForm.lines[0].combos[0].value).toEqual('4711');
		expect(ctrl.adjustmentForm.lines[1].combos[0].value).toEqual('N');
		expect(ctrl.adjustmentForm.lines[1].combos[1].value).toEqual('2');

	});

	it('should move substitute to new grid position in change mode', function () {

		var substitute = new Player();
		substitute.id = 4711;
		ctrl.grid.setPlayer(substitute, -1, -1);

		SharedState.setOne('activeTab', 2);
		ctrl.grid.setPlayer(substitute, 2, 2);

		rootScope.$digest();

		expect(SharedState.isActive('moveAction')).toBeTruthy();
		expect(ctrl.option.page).toEqual(1);
		expect(ctrl.option.item).toEqual(1);
		expect(ctrl.option.text).toEqual('Einwechslung');
		expect(ctrl.adjustmentForm).toBeDefined();
		expect(ctrl.adjustmentForm.method).toEqual('GET');
		expect(ctrl.adjustmentForm.lines[0].combos[0].value).toEqual('4711');
		expect(ctrl.adjustmentForm.lines[4].combos[0].value).toEqual('N');
		expect(ctrl.adjustmentForm.lines[4].combos[1].value).toEqual('2');

	});

	it('should move substitute to occupied grid position in change mode', function () {

		var substitute = new Player(), player = new Player();
		substitute.id = 4711;
		ctrl.grid.setPlayer(substitute, -1, -1);
		player.id = 666;
		ctrl.grid.setPlayer(player, 2, 2);

		SharedState.setOne('activeTab', 2);
		ctrl.grid.setPlayer(substitute, 2, 2);

		rootScope.$digest();

		expect(SharedState.isActive('moveAction')).toBeTruthy();
		expect(ctrl.option.page).toEqual(1);
		expect(ctrl.option.item).toEqual(1);
		expect(ctrl.option.text).toEqual('Einwechslung');
		expect(ctrl.adjustmentForm).toBeDefined();
		expect(ctrl.adjustmentForm.method).toEqual('GET');
		expect(ctrl.adjustmentForm.lines[0].combos[0].value).toEqual('4711');
		expect(ctrl.adjustmentForm.lines[1].combos[0].value).toEqual('666');
		expect(ctrl.adjustmentForm.lines[4].combos[2].value).toEqual('K');

	});

	it('should move substitute to keeper position in change mode', function () {

		var substitute = new Player();
		substitute.id = 4711;
		ctrl.grid.setPlayer(substitute, -1, -1);

		SharedState.setOne('activeTab', 2);
		ctrl.grid.setPlayer(substitute, 0, 0);

		rootScope.$digest();

		expect(SharedState.isActive('moveAction')).toBeTruthy();
		expect(ctrl.option.page).toEqual(1);
		expect(ctrl.option.item).toEqual(1);
		expect(ctrl.option.text).toEqual('Einwechslung');
		expect(ctrl.adjustmentForm).toBeDefined();
		expect(ctrl.adjustmentForm.method).toEqual('GET');
		expect(ctrl.adjustmentForm.lines[0].combos[0].value).toEqual('4711');
		expect(ctrl.adjustmentForm.lines[4].combos[2].value).toEqual('T');

	});

	it('should move substitute to occupied keeper position in change mode', function () {

		var substitute = new Player(), player = new Player();
		substitute.id = 4711;
		ctrl.grid.setPlayer(substitute, -1, -1);
		player.id = 666;
		ctrl.grid.setPlayer(player, 0, 0);
		ctrl.move.players.push(player);

		SharedState.setOne('activeTab', 2);
		ctrl.grid.setPlayer(substitute, 0, 0);

		rootScope.$digest();

		expect(SharedState.isActive('moveAction')).toBeTruthy();
		expect(ctrl.option.page).toEqual(1);
		expect(ctrl.option.item).toEqual(1);
		expect(ctrl.option.text).toEqual('Einwechslung');
		expect(ctrl.adjustmentForm).toBeDefined();
		expect(ctrl.adjustmentForm.method).toEqual('GET');
		expect(ctrl.adjustmentForm.lines[0].combos[0].value).toEqual('4711');
		expect(ctrl.adjustmentForm.lines[1].combos[0].value).toEqual('666');
		expect(ctrl.adjustmentForm.lines[4].combos[2].value).toEqual('T');

	});

	it('should move grid player to substitute position in change mode', function () {

		var player = new Player();
		player.id = 4711;
		ctrl.grid.setPlayer(player, 2, 2);

		SharedState.setOne('activeTab', 2);
		ctrl.grid.setPlayer(player, -1, -1);

		rootScope.$digest();

		expect(SharedState.isActive('moveAction')).toBeTruthy();
		expect(ctrl.option.page).toEqual(1);
		expect(ctrl.option.item).toEqual(1);
		expect(ctrl.option.text).toEqual('Einwechslung');
		expect(ctrl.adjustmentForm).toBeDefined();
		expect(ctrl.adjustmentForm.method).toEqual('GET');
		expect(ctrl.adjustmentForm.lines[1].combos[0].value).toEqual('4711');
		expect(ctrl.adjustmentForm.lines[4].combos[2].value).toEqual('K');

	});

	it('should move grid player to occupied substitute position in change mode', function () {

		var player = new Player(), substitute = new Player();
		player.id = 666;
		ctrl.grid.setPlayer(player, 2, 2);
		substitute.id = 4711;
		ctrl.grid.setPlayer(substitute, -1, -1);
		ctrl.move.players.push(substitute);
		ctrl.move.players.push(substitute);

		SharedState.setOne('activeTab', 2);
		ctrl.grid.setPlayer(player, -1, -1);

		rootScope.$digest();

		expect(SharedState.isActive('moveAction')).toBeTruthy();
		expect(ctrl.option.page).toEqual(1);
		expect(ctrl.option.item).toEqual(1);
		expect(ctrl.option.text).toEqual('Einwechslung');
		expect(ctrl.adjustmentForm).toBeDefined();
		expect(ctrl.adjustmentForm.method).toEqual('GET');
		expect(ctrl.adjustmentForm.lines[0].combos[0].value).toEqual('4711');
		expect(ctrl.adjustmentForm.lines[1].combos[0].value).toEqual('666');
		expect(ctrl.adjustmentForm.lines[4].combos[2].value).toEqual('K');

	});

	it('should mark adjustment to delete and undo', function () {

		ctrl.move.adjustments.push({
			id : 1,
			text : 'any adjustment'
		});

		ctrl.removeAdjustment(ctrl.move.adjustments[0]);

		expect(ctrl.move.adjustments[0].markDeleted).toBeTruthy();

		ctrl.removeAdjustment(ctrl.move.adjustments[0]);

		expect(ctrl.move.adjustments[0].markDeleted).toBeFalsy();

	});

	it('should return visible sorted adjustments', function () {

		ctrl.move.adjustments.push({
			option : {
				item : 4
			},
			id : 1,
			markDeleted : true
		});
		ctrl.move.adjustments.push({
			option : {
				item : 2
			},
			id : 2,
			markDeleted : false
		});
		ctrl.move.adjustments.push({
			option : {
				item : 9
			},
			markDeleted : true
		});
		ctrl.move.adjustments.push({
			option : {
				item : 1
			},
			markDeleted : false
		});

		var adjustments = ctrl.getAdjustments();

		expect(adjustments.length).toEqual(3);
		expect(adjustments[0].option.item).toEqual(1);
		expect(adjustments[1].option.item).toEqual(2);
		expect(adjustments[2].option.item).toEqual(4);

	});

	it('should add new adjustment', function () {

		ctrl.option = {
			item : 9,
			page : 2,
			text : 'Spielmacher'
		};
		ctrl.adjustmentForm = {
			lines : [{
				combos : [{
					name : 'spieler_id',
					options : [{
						label : 'Willie Cragg ◉',
						value : '4147'
					}],
					value : '4147'
				}]
			}]
		};

		ctrl.saveAdjustment();

		expect(SharedState.isActive('moveAction')).toBeFalsy();
		expect(ctrl.move.adjustments[0].option.item).toEqual(9);
		expect(ctrl.move.adjustments[0].option.page).toEqual(2);
		expect(ctrl.move.adjustments[0].option.text).toEqual('Spielmacher');
		expect(ctrl.move.adjustments[0].id).toEqual(0);
		expect(ctrl.move.adjustments[0].text).toEqual('Spielmacher : Willie Cragg');
		expect(ctrl.move.adjustments[0].params.spieler_id.value).toEqual('4147');
		expect(ctrl.move.adjustments[0].params.spieler_id.text).toEqual('Willie Cragg');

	});

});
