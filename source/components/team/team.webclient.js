osApp.factory('TeamWebClient', ['$http','TeamTransformation',function ($http, TeamTransformation) {

	return {

		loadTeam : function (id) {

			return $http({
				url : '../sp.php?s=' + id,
				method : 'GET',
				transformResponse : TeamTransformation.transformTeamOverview
			});
		}
	};
}]);
