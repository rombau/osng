osApp.factory('TeamTransformation', ['Player','Team','HtmlUtil',function (Player, Team, HtmlUtil) {

	var transformation = {

		transformPlayer : function (html) {

			var team = new Team();

			var doc = HtmlUtil.getEnsuredDocument(html);

			return team;
		}
	};
	return transformation;
}]);
