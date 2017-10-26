osApp.factory('Popup', ['SharedState',function (SharedState) {

	var lastState = null;

	return {
		open : function (popupState, value) {
			if (popupState) {
				if (value) {
					SharedState.setOne(popupState, value);
				} else {
					SharedState.turnOn(popupState);
				}
				lastState = popupState;
			}
		},
		hide : function () {
			if (lastState) {
				SharedState.turnOff(lastState);
				lastState = null;
				return true;
			}
			return false;
		},
		sidebar : function (popupState) {
			if (popupState) {
				lastState = popupState;
			}
		}
	};
}]);
