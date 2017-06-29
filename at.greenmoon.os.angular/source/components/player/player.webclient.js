osApp.factory('PlayerWebClient', ['$http','Player','PlayerTransformation',function ($http, Player, PlayerTransformation) {

	return {

		loadPlayer : function (id) {

			return $http({
				url : '../sp.php?s=' + id,
				method : 'GET',
				transformResponse : PlayerTransformation.transformPlayer
			});
		}
	};
}]);
