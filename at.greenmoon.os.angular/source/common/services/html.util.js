/**
 * Html utilities.
 */
osApp.factory('HtmlTransformationUtil', [function () {

	return {

		extractIdFromHref : function (href) {

			if (href) {
				if (href.search(/javascript:.+(\d+)/) !== -1) {
					return +href.split("(")[1].split(")")[0];
				} else if (href.search(/sp\.php.+s=(\d+)/) !== -1) {
					return +href.split("s=")[1].split("&")[0];
				} else if (href.search(/st\.php.+c=(\d+)/) !== -1) {
					return +href.split("c=")[1].split("&")[0];
				}
			}
			return null;
		},

		getEnsuredDocument : function (html) {

			var pattern, matches;

			pattern = /F.+r die Dauer von ZAT (\d+) sind die Seiten von OS 2\.0 gesperrt!/gm;
			matches = pattern.exec(html);
			if (matches) {
				throw matches[0];
			}

			pattern = /Diese Seite ist ohne Team nicht verf.+gbar!/gm;
			matches = pattern.exec(html);
			if (matches) {
				throw matches[0];
			}

			return new DOMParser().parseFromString(html, "text/html");
		}
	};
}]);
