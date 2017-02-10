describe('Login controller', function () {

	var $httpBackend, $cookies, ctrl, user;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {

		$httpBackend = $injector.get('$httpBackend');
		$cookies = $injector.get('$cookies');

		$componentController = $injector.get('$componentController');
		ctrl = $componentController('loginForm');

		user = $injector.get('UserData');
		user.os = undefined;
		user.lc = undefined;

	}));

	afterEach(function () {

		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();

	});

	it('should initialize as logged out', function () {

		expect(ctrl.email).toBeNull();
		expect(ctrl.password).toBeNull();

		expect(user.loggedIn).toBeFalsy();
		expect(user.teamName).toEqual('Demoteam');
		expect(user.teamImage).toEqual('00000000.png');

		expect($cookies.get('lc')).toBeUndefined();

	});

	it('should not login with wrong email or password', function () {

		$httpBackend.expectPOST('../validate.php', 'action=os_login&sdauer=0&loginemail=&passwort=') //
		.respond(200, '<html><body><div><p id="TopThema"></p><p>Der Username oder das Passwort ist falsch.</p></div></body></html>');

		expect(ctrl.inProgress).toBeFalsy();

		ctrl.login();

		expect(ctrl.inProgress).toBeTruthy();

		$httpBackend.flush();

		expect(ctrl.inProgress).toBeFalsy();
		expect(ctrl.failureMsg).toEqual('Der Username oder das Passwort ist falsch.');
		expect(user.loggedIn).toBeFalsy();
		expect($cookies.get('lc')).toBeUndefined();

	});

});
