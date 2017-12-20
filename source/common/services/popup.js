osApp.factory('Popup', ['SharedState',function (SharedState) {

	return {
		open : function (state, value) {
			if (state) {
				if (value) {
					SharedState.setOne(state, value);
				} else {
					SharedState.turnOn(state);
				}
			}
		},
		hide : function () {
			var allSharedStates = SharedState.values();
			for ( var state in allSharedStates) {
				if (allSharedStates.hasOwnProperty(state) && state.indexOf("popup") !== -1 && allSharedStates[state]) {
					SharedState.turnOff(state);
					return true;
				}
			}
			return false;
		}
	};
}]);
