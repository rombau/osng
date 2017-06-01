describe('Login controller', function () {

	var ctrl, $rootScope;

	beforeEach(function () {

		module('OnlineSoccer');

		module(function ($provide) {
			$provide.factory('Account', function () {
				return jasmine.createSpyObj('AccountMock', ['initialize','login']);
			});
		});

		inject(function ($injector, $q) {

			ctrl = $injector.get('$componentController')('loginForm');

			ctrl.account.initialize.and.returnValue($q.when({}));
			ctrl.account.login.and.returnValue($q.when({
				data : true
			}));

			$rootScope = $injector.get('$rootScope').$new();
		});
	});

	it('should login with email and password and initialize account', function () {

		ctrl.account.email = 'email@domain.com';
		ctrl.account.password = 'secret';

		expect(ctrl.account.loggedIn).toBeFalsy();

		ctrl.login();

		$rootScope.$digest(); // resolve login promise

		expect(ctrl.account.loggedIn).toBeTruthy();
		expect(ctrl.account.login).toHaveBeenCalledWith('email@domain.com', 'secret');

		$rootScope.$digest(); // resolve initialize promise

		expect(ctrl.account.initialize).toHaveBeenCalled();

	});

});
