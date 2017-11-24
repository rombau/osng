describe('Training component controller', function () {

	var rootScope, ctrl, SharedState;

	beforeEach(module('OnlineSoccer', function ($provide) {
		$provide.service('TrainingWebClient', function ($q, Training) {
			return {
				loadTraining : function () {
					return $q.when(new Training());
				},
				saveTraining : function () {}
			};
		});
	}));

	beforeEach(inject(function ($injector) {

		SharedState = $injector.get('SharedState');

		rootScope = $injector.get('$rootScope').$new();

		SharedState.initialize(rootScope, 'activeTab');

		$componentController = $injector.get('$componentController');
		ctrl = $componentController('trainingComponent');

		rootScope.$digest();

	}));

	it('should initialize scope data', function () {

		expect(ctrl).toBeDefined();

		expect(ctrl.training).toBeDefined();
		expect(ctrl.training.selection).toBeDefined();
		expect(ctrl.training.players).toBeDefined();
		expect(ctrl.training.trainer).toBeDefined();

		expect(ctrl.training.trainer.length).toEqual(6);

	});

});
