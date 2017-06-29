osApp.factory('PlayerTransformation', ['Player','HtmlTransformationUtil',function (Player, HtmlTransformationUtil) {

	var transformation = {

		transformPlayer : function (html) {

			var player = new Player();

			var doc = HtmlTransformationUtil.getEnsuredDocument(html);

			var tables = doc.getElementsByTagName('table');

			// TODO extract id from img

			player.name = tables[0].rows[0].cells[2].textContent;
			player.alter = +tables[0].rows[0].cells[5].textContent;
			player.gehalt = +tables[0].rows[0].cells[8].textContent.match(/([\d|\.]+) EUR/)[1].replace(/\./g, '');

			player.land = tables[0].rows[1].cells[1].textContent;
			player.flagge = tables[0].rows[1].cells[1].firstChild.src;
			player.geburtstag = +tables[0].rows[1].cells[4].textContent.substring(4);
			player.vertrag = +tables[0].rows[1].cells[7].textContent;

			player.marktwert = +tables[0].rows[2].cells[1].textContent.match(/([\d|\.]+) EUR/)[1].replace(/\./g, '');
			player.pos = tables[0].rows[1].cells[4].textContent;

			// TODO extract skills

			return player;
		}
	};
	return transformation;
}]);
