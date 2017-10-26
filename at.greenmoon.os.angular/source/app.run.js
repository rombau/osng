osApp.run(['$rootScope','Popup',function ($rootScope, Popup) {

	$rootScope.$on('$locationChangeStart', function (evt, next, current) {
		if (!$rootScope.error && Popup.hide()) {
			evt.preventDefault();
		}
	});

	$rootScope.$on('mobile-angular-ui.state.changed.leftSwipe', function (evt, newVal, oldVal) {
		if (newVal) {
			Popup.sidebar('leftSwipe');
		}
	});
}]);
