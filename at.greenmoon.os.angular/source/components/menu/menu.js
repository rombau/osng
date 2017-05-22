/**
 * Menu item.
 */
var MenuItem = function (label, path, external) {
	this.id = label.replace(/\W/g, "");
	this.label = label;
	this.path = path;
	this.external = external || false;
	this.items = [];
	this.addMenuItem = function (item) {
		this.items.push(item);
	};
};

/**
 * Menu component.
 */
osApp.component('mainMenu', {

	templateUrl : 'components/menu/menu.html',

	controller : ['$http','$location','$route','Account','SharedState',function ($http, $location, $route, Account, SharedState) {
		var ctrl = this;
		this.menuItems = [];
		this.user = Account;

		$http({
			url : '../os_menu_haupt.html',
			method : 'GET',
			transformResponse : function (data) {
				var pattern = /m\((\d+)(?:,"([^"]+)")?(?:,"([^"]+)")?(?:,"([^"]+)")?.*\)/gm;
				var menuItems = [];
				var parentMenu;
				var matches = pattern.exec(data);
				while (matches) {
					var label = matches[2].replace(/\s*\/\s*/, " / ");
					var external = (!matches[4] || matches[4] !== 'os_main') && matches[3] !== 'index.php';
					var path = (matches[3] ? (external ? matches[3] : '#/' + matches[3]) : undefined);
					if (+matches[1] === 1) {
						parentMenu = new MenuItem(label, path, external);
						menuItems.push(parentMenu);
					} else {
						parentMenu.addMenuItem(new MenuItem(label, path, external));
					}
					matches = pattern.exec(data);
				}
				return menuItems;
			}
		}).then(function success (response) {
			ctrl.menuItems = response.data;
		}, function error (response) {
		// TODO error handling
		});

		ctrl.handleItemClick = function (item) {
			if (item.items.length > 0) {
				if (SharedState.get('submenu') === item.id && SharedState.isActive(item.id)) {
					SharedState.turnOff(item.id);
				} else {
					SharedState.turnOn(item.id);
				}
				SharedState.set('submenu', item.id);
			} else {
				SharedState.turnOff('uiSidebarLeft');
			}
		};

		ctrl.getIconClass = function (item) {
			if (item.items.length > 0) {
				if (SharedState.get('submenu') === item.id && SharedState.isActive(item.id)) {
					return 'fa-chevron-circle-down';
				} else {
					return 'fa-chevron-circle-right';
				}
			} else {
				return 'fa-caret-square-o-right';
			}
		};

		ctrl.toOffice = function (current) {
			if (current) {
				if ($location.path() !== '/haupt.php') {
					$location.path('/haupt.php');
				} else {
					$route.reload();
				}
			} else {
				Account.loadTeamData(true).then(function () {
					Account.team1.current = !Account.team1.current;
					Account.team2.current = !Account.team2.current;
					if ($location.path() !== '/haupt.php') {
						$location.path('/haupt.php');
					} else {
						$route.reload();
					}
				});
			}
		};

	}]
});
