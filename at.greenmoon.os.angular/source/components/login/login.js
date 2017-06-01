/**
 * Login Form component.
 */
osApp.component('loginForm', {

	templateUrl : 'components/login/login.html',

	controller : ['$location','Account',function ($location, Account) {

		var ctrl = this;

		ctrl.account = Account;

		ctrl.login = function () {

			ctrl.account.login(ctrl.account.email, ctrl.account.password).then(function (response) {
				if (response.data) {
					ctrl.account.loggedIn = true;
					ctrl.account.initialize().then(function () {
						$location.path("/haupt.php");
					});
				}
			});
		};
	}]
});
