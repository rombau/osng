osApp.factory('PlayerTransformation', ['Player','Team','HtmlUtil',function (Player, Team, HtmlUtil) {

	var transformation = {

		transformPlayer : function (html) {

			var player = new Player();

			var doc = HtmlUtil.getEnsuredDocument(html);

			var face = doc.querySelector('img[alt=Face]');

			player.id = +face.src.split('faceprev.php?sid=')[1];

			var tables = doc.getElementsByTagName('table');

			player.name = tables[0].rows[0].cells[2].textContent;
			player.alter = +tables[0].rows[0].cells[5].textContent;
			player.gehalt = +tables[0].rows[0].cells[8].textContent.match(/([\d|\.]+) EUR/)[1].replace(/\./g, '');

			player.land = tables[0].rows[1].cells[1].textContent.trim();
			player.flagge = '/' + tables[0].rows[1].cells[1].firstChild.getAttribute("src");
			player.geburtstag = +tables[0].rows[1].cells[4].textContent.substring(4);
			player.vertrag = +tables[0].rows[1].cells[7].textContent;

			player.marktwert = +tables[0].rows[2].cells[1].textContent.match(/([\d|\.]+) EUR/)[1].replace(/\./g, '');
			player.pos = tables[0].rows[2].cells[4].textContent;

			player.verletzt = +tables[0].rows[3].cells[1].textContent;

			player.team = new Team();

			var teamNodes = tables[0].rows[2].cells[7].childNodes;

			player.team.id = HtmlUtil.extractIdFromHref(teamNodes[0].href);
			player.team.name = teamNodes[0].textContent;
			player.team.liga = +teamNodes[2].textContent.split('. Liga')[0];
			player.team.liganame = teamNodes[2].textContent.trim();
			player.team.land = teamNodes[3].textContent;

			player.skill = +tables[1].rows[0].cells[0].textContent.split(' : ')[1];
			player.opti = +tables[1].rows[0].cells[2].textContent.split(' : ')[1];

			player.skills[Player.Skill.SCH] = +tables[1].rows[1].cells[0].textContent.split(' : ')[1];
			player.skills[Player.Skill.BAK] = +tables[1].rows[1].cells[2].textContent.split(' : ')[1];
			player.skills[Player.Skill.KOB] = +tables[1].rows[1].cells[4].textContent.split(' : ')[1];
			player.skills[Player.Skill.ZWK] = +tables[1].rows[2].cells[0].textContent.split(' : ')[1];
			player.skills[Player.Skill.DEC] = +tables[1].rows[2].cells[2].textContent.split(' : ')[1];
			player.skills[Player.Skill.GES] = +tables[1].rows[2].cells[4].textContent.split(' : ')[1];
			player.skills[Player.Skill.FUQ] = +tables[1].rows[3].cells[0].textContent.split(' : ')[1];
			player.skills[Player.Skill.ERF] = +tables[1].rows[3].cells[2].textContent.split(' : ')[1];
			player.skills[Player.Skill.AGG] = +tables[1].rows[3].cells[4].textContent.split(' : ')[1];
			player.skills[Player.Skill.PAS] = +tables[1].rows[4].cells[0].textContent.split(' : ')[1];
			player.skills[Player.Skill.AUS] = +tables[1].rows[4].cells[2].textContent.split(' : ')[1];
			player.skills[Player.Skill.UEB] = +tables[1].rows[4].cells[4].textContent.split(' : ')[1];
			player.skills[Player.Skill.WID] = +tables[1].rows[5].cells[0].textContent.split(' : ')[1];
			player.skills[Player.Skill.SEL] = +tables[1].rows[5].cells[2].textContent.split(' : ')[1];
			player.skills[Player.Skill.DIS] = +tables[1].rows[5].cells[4].textContent.split(' : ')[1];
			player.skills[Player.Skill.ZUV] = +tables[1].rows[6].cells[0].textContent.split(' : ')[1];
			player.skills[Player.Skill.EIN] = +tables[1].rows[6].cells[2].textContent.split(' : ')[1];

			return player;
		}
	};
	return transformation;
}]);
