/**
 * The account service returns any account information and handles login. Therfore it includes any
 * webclient and transformation functionallity.
 */
osApp.factory('Account', ['$http','$q','Team','HtmlUtil',function ($http, $q, Team, HtmlUtil) {

	var teams = [];

	var transformation = {

		transformMain : function (html) {

			var doc = HtmlUtil.getEnsuredDocument(html);

			var images = doc.getElementsByTagName('img');
			var bolds = doc.getElementsByTagName("b");
			var anchors = doc.getElementsByTagName("a");

			var pattern, matches, img = images[images.length - 1];

			var teams = [new Team()];

			pattern = /images\/wappen\/((\d+)\.(png|gif))/gm;
			matches = pattern.exec(img.src || img.outerHTML); // empty src in chrome
			if (matches) {
				teams[0].id = +matches[2];
				teams[0].image = matches[1];
			}

			for (var b = 0; b < bolds.length; b++) {
				if (bolds[b].textContent.search(/Willkommen im Managerb/) !== -1) {
					teams[0].name = bolds[b].textContent.split(" von ")[1];
				}
			}

			for (var a = 0; a < anchors.length; a++) {
				pattern = /Zu ((\w+\s*)+) wechseln/gm;
				matches = pattern.exec(anchors[a].textContent);
				if (matches) {
					teams.push(new Team());
					teams[1].name = matches[1];
					break;
				}
			}

			return teams;
		},

		transformFirstTeam : function (html) {

			var doc = HtmlUtil.getEnsuredDocument(html);

			var anchors = doc.getElementsByTagName("a");

			for (var a = 0; a < anchors.length; a++) {
				if (anchors[a].textContent.search(/Mein (Zweit|Haupt)team/) !== -1) {
					return HtmlUtil.extractIdFromHref(anchors[a].href);
				}
			}
			return null;
		},

		transformSecondTeam : function (html) {

			var doc = HtmlUtil.getEnsuredDocument(html);

			var images = doc.getElementsByTagName('img');

			var pattern, matches, img = images[0];

			pattern = /images\/wappen\/((\d+)\.(png|gif))/gm;
			matches = pattern.exec(img.src || img.outerHTML);
			if (matches) {
				return matches[1];
			}
			return null;
		},

		transformLoginValidation : function (html) {

			var doc = HtmlUtil.getEnsuredDocument(html);

			var paragraphs = doc.getElementsByTagName('p');

			if (paragraphs && paragraphs.length && paragraphs.length > 0) {
				throw paragraphs[paragraphs.length - 1].textContent;
			}
			return true;
		}

	};

	var initializeTeams = function (changetosecond) {

		return $q(function (resolve, reject) {

			$http({
				url : '../haupt.php' + (changetosecond ? '?changetosecond=true' : ''),
				method : 'GET',
				transformResponse : transformation.transformMain
			}).then(function (response) {
				if (changetosecond) {
					resolve(teams);
				} else {
					teams = response.data;
					if (teams.length === 1) {
						resolve(teams);
					} else {
						$http({
							url : '../st.php?c=' + teams[0].id,
							method : 'GET',
							transformResponse : transformation.transformFirstTeam
						}).then(function (response) {
							if (response.data) {
								var secondTeamId = response.data;
								teams[1].id = secondTeamId;
								$http({
									url : '../st.php?c=' + teams[1].id,
									method : 'GET',
									transformResponse : transformation.transformSecondTeam
								}).then(function (response) {
									if (response.data) {
										teams[1].image = response.data;
									}
									resolve(teams);
								}, function () {
									reject();
								});
							}
						}, function () {
							reject();
						});
					}
				}
			}, function () {
				reject();
			});
		});
	};

	var pendingInitialization = false;

	return {

		/**
		 * Reset any initialized teams, e.g. when session end is detected.
		 */
		clearTeams : function () {
			teams = [];
		},

		/**
		 * Returns a team list including the current (main) team asynchronously initialized with id,
		 * name and image. The other (second) team is initialized in the same way, if exists.
		 */
		getTeams : function () {
			if (teams.length === 0 && !pendingInitialization) {
				pendingInitialization = true;
				initializeTeams().then(function () {
					pendingInitialization = false;
				});
			}
			return teams;
		},

		/**
		 * Toggles to the next team in teams list. Internally the current team is always at index 0,
		 * so the teams would be swaped.
		 */
		toggleTeam : function () {
			return $q(function (resolve, reject) {
				initializeTeams(true).then(function () {
					teams.reverse();
					resolve();
				}, function () {
					reject();
				});
			});
		},

		/**
		 * Executes a login validation and returns {@code true} if no error paragraph is present.
		 * Otherwise a exception with the error message is thrown.
		 */
		login : function (email, password) {
			return $q(function (resolve, reject) {
				$http({
					url : '../validate.php',
					method : 'POST',
					data : {
						action : 'os_login',
						sdauer : 0,
						loginemail : email,
						passwort : password
					},
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
					transformRequest : HtmlUtil.encodeQueryParameters,
					transformResponse : transformation.transformLoginValidation
				}).then(function (response) {
					resolve(response);
				}, function () {
					reject();
				});
			});
		}
	};
}]);
