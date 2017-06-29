osApp.component('playerLink', {

	templateUrl : 'components/player/player.link.html',

	bindings : {
		player : '<object'
	},

	controller : ['Popup',function (Popup) {

		var ctrl = this;

		ctrl.openPopup = function () {

			// $window.open("../sp.php?s=" + ctrl.player.id, "os_spieler",
			// "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=yes,width=800,height=550");

			Popup.open('modalPlayer', ctrl.player);
		};

	}]
});
