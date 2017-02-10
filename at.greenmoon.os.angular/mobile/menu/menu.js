var osApp = osApp || angular.module('OnlineSoccer');

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

var MenuController = function ($http, UserData, SharedState) {
	var self = this;
	this.menuItems = [];
	this.user = UserData;

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
		self.menuItems = response.data;
	}, function error (response) {
		// TODO error handling
	});

	this.handleItemClick = function (item) {
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

	this.getIconClass = function (item) {
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
};

osApp.component('mainMenu', {
	templateUrl : 'menu/menu.html',
	controller : MenuController
});
