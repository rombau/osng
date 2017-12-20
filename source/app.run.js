osApp.run(['$rootScope','Popup',function ($rootScope, Popup) {

	$rootScope.$on('$locationChangeStart', function (evt, next, current) {
		if (!$rootScope.error && Popup.hide()) {
			evt.preventDefault();
		}
	});

}]);
