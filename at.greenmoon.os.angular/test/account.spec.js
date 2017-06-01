describe('Account service', function () {

	var ctrl, account, $httpBackend;

	beforeEach(module('OnlineSoccer'));

	beforeEach(inject(function ($injector) {

		account = $injector.get('Account');

		$httpBackend = $injector.get('$httpBackend');

	}));

	it('should initialize without session and demo team', function () {

		expect(account.loggedIn).toBeFalsy();
		expect(account.teams.length).toEqual(1);
		expect(account.currentTeam).toEqual(0);
		expect(account.teams[0].name).toEqual('Demoteam');
		expect(account.teams[0].image).toEqual('00000000.png');

	});

	it('should initialize with session and one team', function () {

		$httpBackend.whenGET('../haupt.php?changetosecond=true').respond( //
		'<img src="images/wappen/00000057.png" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von FC Nivellois</b>');

		$httpBackend.flush();

		expect(account.teams.length).toEqual(1);
		expect(account.currentTeam).toEqual(0);
		expect(account.teams[0].name).toEqual('FC Nivellois');
		expect(account.teams[0].image).toEqual('00000057.png');

	});

	it('should initialize with session and two teams', function () {

		var first = true;
		$httpBackend.whenGET('../haupt.php?changetosecond=true').respond(function (method, url, data, headers, params) {
			if (first) {
				first = false;
				return [200,'<img src="images/wappen/00000057.gif" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von FC Nivellois</b>'];
			} else {
				first = true;
				return [200,'<img src="images/wappen/00000019.png" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von FC Cork</b>'];
			}
		});

		$httpBackend.flush();

		expect(account.teams.length).toEqual(2);
		expect(account.currentTeam).toEqual(0);
		expect(account.teams[0].id).toEqual(19);
		expect(account.teams[0].name).toEqual('FC Cork');
		expect(account.teams[0].image).toEqual('00000019.png');
		expect(account.teams[1].id).toEqual(57);
		expect(account.teams[1].name).toEqual('FC Nivellois');
		expect(account.teams[1].image).toEqual('00000057.gif');

	});

	it('should login', function () {

		$httpBackend.whenGET('../haupt.php?changetosecond=true').respond( //
		'<img src="images/wappen/00000057.png" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von FC Nivellois</b>');

		$httpBackend.whenPOST('../validate.php').respond( //
		'os_haupt.html');

		account.login('user', 'secret').then(function (response) {
			expect(response.data).toBeTruthy();
		});

		$httpBackend.flush();

	});

	it('should handle failed login', function () {

		$httpBackend.whenGET('../haupt.php?changetosecond=true').respond( //
		'<img src="images/wappen/00000057.png" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von FC Nivellois</b>');

		$httpBackend.whenPOST('../validate.php').respond( //
		'<p></p><p>Failed</p>');

		expect(function () {

			account.login('user', 'secret').then(function (response) {
				expect(response.data).toBeFalsy();
			});

			$httpBackend.flush();

		}).toThrow('Failed');

	});

	it('should not toggle current team with only one team', function () {

		account.teams = [{}];
		account.currentTeam = 0;

		account.toggleCurrentTeam();

		expect(account.currentTeam).toEqual(0);

	});

	it('should toggle current team with more then one team', function () {

		account.currentTeam = 0;
		account.teams = [{}];
		account.teams.push({});

		account.toggleCurrentTeam();

		expect(account.currentTeam).toEqual(1);

		account.toggleCurrentTeam();

		expect(account.currentTeam).toEqual(0);

	});

	it('should provide current team', function () {

		account.teams = [{}];
		account.currentTeam = 0;

		expect(account.getCurrentTeam()).toBe(account.teams[0]);

		account.teams.push({});

		expect(account.getCurrentTeam()).toBe(account.teams[0]);

		account.currentTeam = 1;

		expect(account.getCurrentTeam()).toBe(account.teams[1]);

	});

	it('should provide first other than current team', function () {

		account.teams = [{}];
		account.currentTeam = 0;

		expect(account.getOtherTeam()).toBeNull();

		account.teams.push({});

		expect(account.getOtherTeam()).toBe(account.teams[1]);

		account.currentTeam = 1;

		expect(account.getOtherTeam()).toBe(account.teams[0]);

	});

});
