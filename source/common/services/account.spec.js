describe('Account Servive', function () {

	var account, $httpBackend;

	beforeEach(function () {

		module('OnlineSoccer');

		inject(function ($injector) {
			account = $injector.get('Account');
			account.teams = [];
			$httpBackend = $injector.get('$httpBackend');
		});
	});

	it('should initialize without session', function () {

		$httpBackend.whenGET('../haupt.php').respond( //
		'<img src="images/wappen/00000000.png" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von Demoteam</b>');

		expect(account.getTeams().length).toEqual(0);

		$httpBackend.flush();

		expect(account.getTeams().length).toEqual(1);
		expect(account.getTeams()[0].name).toEqual('Demoteam');
		expect(account.getTeams()[0].image).toEqual('00000000.png');

	});

	it('should initialize with session and one team', function () {

		$httpBackend.whenGET('../haupt.php').respond( //
		'<img src="images/wappen/00000057.png" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von FC Nivellois</b>');

		expect(account.getTeams().length).toEqual(0);

		$httpBackend.flush();

		expect(account.getTeams().length).toEqual(1);
		expect(account.getTeams()[0].name).toEqual('FC Nivellois');
		expect(account.getTeams()[0].image).toEqual('00000057.png');

	});

	it('should initialize with session and two teams', function () {

		$httpBackend.whenGET('../haupt.php').respond(
			function (method, url, data, headers, params) {
				return [200,
					'<img src="images/wappen/00000019.png" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von FC Cork</b><a href="?changetosecond=true"><br>Zu FC Nivellois wechseln</a>'];
			});
		$httpBackend.whenGET('../st.php?c=19').respond(function (method, url, data, headers, params) {
			return [200,'<a href="st.php?c=57" onclick="teaminfo(57); return false;">Mein Zweitteam</a>'];
		});
		$httpBackend.whenGET('../st.php?c=57').respond(function (method, url, data, headers, params) {
			return [200,'<img src="images/wappen/00000057.gif" height="75" width="75">'];
		});

		expect(account.getTeams().length).toEqual(0);

		$httpBackend.flush();

		expect(account.getTeams().length).toEqual(2);
		expect(account.getTeams()[0].id).toEqual(19);
		expect(account.getTeams()[0].name).toEqual('FC Cork');
		expect(account.getTeams()[0].image).toEqual('00000019.png');
		expect(account.getTeams()[1].id).toEqual(57);
		expect(account.getTeams()[1].name).toEqual('FC Nivellois');
		expect(account.getTeams()[1].image).toEqual('00000057.gif');

	});

	it('should login', function () {

		$httpBackend.whenGET('../haupt.php').respond( //
		'<img src="images/wappen/00000057.png" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von FC Nivellois</b>');
		$httpBackend.whenPOST('../validate.php').respond( //
		'os_haupt.html');

		account.login('user', 'secret').then(function (response) {
			expect(response.data).toBeTruthy();
		});

		$httpBackend.flush();

	});

	it('should handle failed login', function () {

		$httpBackend.whenGET('../haupt.php').respond( //
		'<img src="images/wappen/00000057.png" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von FC Nivellois</b>');
		$httpBackend.whenPOST('../validate.php').respond( //
		'<p></p><p>Failed</p>');

		expect(function () {

			account.login('user', 'wrong-pass').then(function (response) {
				expect(response.data).toBeFalsy();
			});

			$httpBackend.flush();

		}).toThrow('Failed');

	});

	it('should not toggle current team with only one team', function () {

		$httpBackend.whenGET('../haupt.php').respond( //
		'<img src="images/wappen/00000057.png" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von FC Nivellois</b>');

		expect(account.getTeams().length).toEqual(0);

		$httpBackend.flush();

		expect(account.getTeams().length).toEqual(1);
		expect(account.getTeams()[0].name).toEqual('FC Nivellois');
		expect(account.getTeams()[0].image).toEqual('00000057.png');

		account.toggleTeam();

		expect(account.getTeams().length).toEqual(1);
		expect(account.getTeams()[0].name).toEqual('FC Nivellois');
		expect(account.getTeams()[0].image).toEqual('00000057.png');

	});

	it('should toggle current team with more then one team', function () {

		$httpBackend.whenGET('../haupt.php').respond(
			function (method, url, data, headers, params) {
				return [200,
					'<img src="images/wappen/00000019.png" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von FC Cork</b><a href="?changetosecond=true"><br>Zu FC Nivellois wechseln</a>'];
			});
		$httpBackend.whenGET('../st.php?c=19').respond(function (method, url, data, headers, params) {
			return [200,'<a href="st.php?c=57" onclick="teaminfo(57); return false;">Mein Zweitteam</a>'];
		});
		$httpBackend.whenGET('../st.php?c=57').respond(function (method, url, data, headers, params) {
			return [200,'<img src="images/wappen/00000057.gif" height="75" width="75">'];
		});

		expect(account.getTeams().length).toEqual(0);

		$httpBackend.flush();

		expect(account.getTeams().length).toEqual(2);
		expect(account.getTeams()[0].id).toEqual(19);
		expect(account.getTeams()[1].id).toEqual(57);

		$httpBackend.whenGET('../haupt.php?changetosecond=true').respond(function (method, url, data, headers, params) {
			return [200,'<img src="images/wappen/00000057.png" height="75" width="75"><b>Willkommen im Managerb&uuml;ro von FC Nivellois</b>'];
		});

		account.toggleTeam();

		$httpBackend.flush();

		expect(account.getTeams().length).toEqual(2);
		expect(account.getTeams()[0].id).toEqual(57);
		expect(account.getTeams()[1].id).toEqual(19);

	});

});
