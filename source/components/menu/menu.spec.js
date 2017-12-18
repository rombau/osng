describe('Menu controller', function () {

	var sharedState, $httpBackend, ctrl, accountMock;

	beforeEach(function () {

		module('OnlineSoccer');

		module(function ($provide) {
			$provide.factory('Account', function ($q) {
				accountMock = jasmine.createSpyObj('AccountMock', ['toggleTeam']);
				accountMock.toggleTeam.and.returnValue($q.when());
				return accountMock;
			});
		});

		inject(function ($injector) {

			var scope = $injector.get('$rootScope');

			sharedState = $injector.get('SharedState');
			sharedState.initialize(scope, 'submenu');
			sharedState.initialize(scope, 'TeamWiki');
			sharedState.initialize(scope, 'uiSidebarLeft');
			sharedState.turnOn('uiSidebarLeft');

			$httpBackend = $injector.get('$httpBackend');

			$httpBackend.whenGET('../os_menu_haupt.html').respond( //
			'm(1,"Büro","buero.html","os_main","","images/extra_geschlossen.gif")\n\n' + //
			'm(1,"Team/Wiki")\n\n' + //
			'm(2,"Mannschaft","kader.html","os_main")\n\n' + //
			'm(2,"Wiki","wiki.html")');

			$componentController = $injector.get('$componentController');
			ctrl = $componentController('mainMenu');

			$httpBackend.flush();

		});

	});

	it('should initialize menu items based on os_menu_haupt.html', function () {

		expect(ctrl.menuItems).toBeDefined();
		expect(ctrl.menuItems.length).toEqual(2);
		expect(ctrl.menuItems[0].id).toEqual("Bro");
		expect(ctrl.menuItems[0].label).toEqual("Büro");
		expect(ctrl.menuItems[0].path).toEqual("#/buero.html");
		expect(ctrl.menuItems[0].external).toBeFalsy();

		expect(ctrl.menuItems[1].id).toEqual("TeamWiki");
		expect(ctrl.menuItems[1].label).toEqual("Team / Wiki");
		expect(ctrl.menuItems[1].path).toBeUndefined();

		expect(ctrl.menuItems[1].items).toBeDefined();
		expect(ctrl.menuItems[1].items.length).toEqual(2);

		expect(ctrl.menuItems[1].items[0].label).toEqual("Mannschaft");
		expect(ctrl.menuItems[1].items[0].path).toEqual("#/kader.html");
		expect(ctrl.menuItems[1].items[0].external).toBeFalsy();

		expect(ctrl.menuItems[1].items[1].label).toEqual("Wiki");
		expect(ctrl.menuItems[1].items[1].path).toEqual("wiki.html");
		expect(ctrl.menuItems[1].items[1].external).toBeTruthy();

	});

	it('should handle item click on top level link', function () {

		ctrl.handleItemClick(ctrl.menuItems[0]);

		expect(sharedState.isActive('uiSidebarLeft')).toBeFalsy();

	});

	it('should handle item click on submenu', function () {

		ctrl.handleItemClick(ctrl.menuItems[1]);

		expect(sharedState.isActive('uiSidebarLeft')).toBeTruthy();
		expect(sharedState.get('submenu')).toEqual(ctrl.menuItems[1].id);
		expect(sharedState.isActive(ctrl.menuItems[1].id)).toBeTruthy();

		ctrl.handleItemClick(ctrl.menuItems[1]);

		expect(sharedState.isActive('uiSidebarLeft')).toBeTruthy();
		expect(sharedState.get('submenu')).toEqual(ctrl.menuItems[1].id);
		expect(sharedState.isActive(ctrl.menuItems[1].id)).toBeFalsy();

	});

	it('should handle item click on submenu link', function () {

		ctrl.handleItemClick(ctrl.menuItems[1].items[0]);

		expect(sharedState.isActive('uiSidebarLeft')).toBeFalsy();

	});

	it('should return css class for top level link', function () {

		expect(ctrl.getIconClass(ctrl.menuItems[0])).toEqual('fa-caret-square-o-right');

	});

	it('should return css class for submenu', function () {

		expect(ctrl.getIconClass(ctrl.menuItems[1])).toEqual('fa-chevron-circle-right');

		ctrl.handleItemClick(ctrl.menuItems[1]);

		expect(ctrl.getIconClass(ctrl.menuItems[1])).toEqual('fa-chevron-circle-down');

	});

	it('should toggle team', function () {

		ctrl.changeToOtherTeam();

		expect(accountMock.toggleTeam).toHaveBeenCalled();

	});

});
