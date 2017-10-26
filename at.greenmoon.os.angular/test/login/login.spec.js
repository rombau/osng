describe('Login controller', function () {

	var ctrl, accountMock, $rootScope;

	beforeEach(function () {

		module('OnlineSoccer');

		module(function ($provide) {
			$provide.factory('Account', function ($q) {
				accountMock = jasmine.createSpyObj('AccountMock', ['login','clearTeams']);
				accountMock.login.and.returnValue($q.when({
					data : true
				}));
				return accountMock;
			});
		});

		inject(function ($injector) {
			ctrl = $injector.get('$componentController')('loginComponent');
			$rootScope = $injector.get('$rootScope').$new();
		});
	});

	it('should login with email and password and initialize account', function () {

		ctrl.email = 'email@domain.com';
		ctrl.password = 'secret';

		expect(ctrl.loggedIn).toBeFalsy();

		ctrl.login();

		$rootScope.$digest(); // resolve login promise

		expect(ctrl.loggedIn).toBeTruthy();
		expect(accountMock.login).toHaveBeenCalledWith('email@domain.com', 'secret');
		expect(accountMock.clearTeams).toHaveBeenCalled();
	});

});
