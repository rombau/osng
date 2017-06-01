osApp.factory('Account', ['$http','$q','HtmlTransformationUtil',function ($http, $q, HtmlTransformationUtil) {

	var Demoteam = function () {
		this.id = 0;
		this.name = 'Demoteam';
		this.image = '00000000.png';
	};

	var account = {

		loggedIn : false,

		currentTeam : 0,

		teams : [new Demoteam()],

		loadTeamData : function (changetosecond) {

			return $http({
				url : '../haupt.php' + (changetosecond ? '?changetosecond=true' : ''),
				method : 'GET',
				transformResponse : function (html) {

					var doc = HtmlTransformationUtil.getEnsuredDocument(html);

					var images = doc.getElementsByTagName('img');
					var bolds = doc.getElementsByTagName("b");

					var pattern, matches, teamId;

					var team = new Demoteam();

					pattern = /images\/wappen\/((\d+)\.(png|gif))/gm;
					matches = pattern.exec(images[images.length - 1].src);
					if (matches) {
						team.id = +matches[2];
						team.image = matches[1];
					}

					for (var b = 0; b < bolds.length; b++) {
						if (bolds[b].textContent.search(/Willkommen im Managerb/) !== -1) {
							team.name = bolds[b].textContent.split(" von ")[1];
						}
					}

					return team;
				}
			});
		},

		login : function (email, password) {

			return $http({
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
				transformRequest : function (obj) {
					var str = [];
					for ( var p in obj) {
						if (obj.hasOwnProperty(p)) {
							str.push(encodeURIComponent(p) + "=" + (obj[p] === null ? "" : encodeURIComponent(obj[p])));
						}
					}
					return str.join("&");
				},
				transformResponse : function (html) {
					var doc = HtmlTransformationUtil.getEnsuredDocument(html);
					var paragraphs = doc.getElementsByTagName('p');
					if (paragraphs && paragraphs.length && paragraphs.length > 0) {
						throw paragraphs[paragraphs.length - 1].textContent;
					}
					return true;
				}
			});
		},

		initialize : function () {

			return $q(function (resolve, reject) {
				account.loadTeamData(2).then(function (team) {
					var team2 = team.data;
					account.loadTeamData(1).then(function (team) {
						account.teams = [team.data];
						if (account.teams[0].id !== team2.id) {
							account.teams.push(team2);
						}
						resolve();
					});
				});
			});
		},

		getCurrentTeam : function () {
			return account.teams[account.currentTeam];
		},
		getOtherTeam : function () {
			for (var t = 0; t < account.teams.length; t++) {
				if (t !== account.currentTeam) {
					return account.teams[t];
				}
			}
			return null;
		},

		toggleCurrentTeam : function () {
			if (account.teams.length > 1) {
				account.currentTeam = (account.currentTeam === 0) ? 1 : 0;
			}
		}
	};

	account.initialize();

	return account;

}]);
