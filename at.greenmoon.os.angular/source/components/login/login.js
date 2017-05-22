/**
 * Login Form component.
 */
osApp.component('loginForm', {

	templateUrl : 'components/login/login.html',

	controller : ['$http','$location','Account',function ($http, $location, Account) {

		var ctrl = this;

		ctrl.account = Account;

		ctrl.inProgress = false;

		ctrl.login = function () {

			ctrl.inProgress = true;
			ctrl.account.login(ctrl.account.email, ctrl.account.password).then(function () {
				ctrl.account.loggedIn = true;
				ctrl.account.initialize().then(function () {
					$location.path("/haupt.php");
				});
				ctrl.inProgress = false;
			});
		};
	}]
});
