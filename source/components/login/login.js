osApp.component('loginComponent', {

	templateUrl : 'components/login/login.html',

	controller : ['$location','Account',function ($location, Account) {

		var ctrl = this;

		ctrl.loggedIn = false;

		ctrl.login = function () {

			Account.login(ctrl.email, ctrl.password).then(function (response) {
				if (response.data) {
					ctrl.loggedIn = true;
					Account.clearTeams();
					$location.path("/haupt.php");
				}
			});
		};
	}]
});
