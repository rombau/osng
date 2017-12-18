osApp.component('player', {

	templateUrl : 'components/player/player.html',

	bindings : {
		player : '<object'
	},

	controller : ['PlayerWebClient',function (PlayerWebClient) {

		var ctrl = this;

		PlayerWebClient.loadPlayer(ctrl.player.id).then(function (response) {
			ctrl.player = response.data;
		});
	}]
});
