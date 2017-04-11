/**
 * Move Player Component.
 */
osApp.component('player', {

	templateUrl : 'components/move/move.player.html',

	bindings : {
		player : '<object',
		onMove : '&',
		onRemove : '&'
	},

	controller : ['$scope','$element','$document','$drag','$touch','$timeout','SharedState',function ($scope, $element, $document, $drag, $touch, $timeout, SharedState) {

		var ctrl = this;

		var possibleDropAreas = [];
		possibleDropAreas.push(document.querySelector('.grid-container'));
		possibleDropAreas.push(document.querySelector('.keeper-container'));
		possibleDropAreas.push(document.querySelector('.subst-container'));

		var playerElement = $element[0].firstChild;
		var playerRect = playerElement.getBoundingClientRect();

		var setMovingStyle = (function () {

			if (ctrl.player.row === null && ctrl.player.col === null) {
				// hide/show right sidebar (players list) while moving
				var playerContainer = document.querySelector('.selection-container');
				if (playerContainer) {
					return function (moving) {
						if (moving) {
							angular.element(playerContainer).addClass('moving');
							angular.element(playerElement).addClass('moving');
						} else {
							angular.element(playerContainer).removeClass('moving');
							angular.element(playerElement).removeClass('moving');
						}
					};
				}
			}
			return function (moving) {
				if (moving) {
					angular.element(playerElement).addClass('moving');
					angular.element(playerElement.nextElementSibling).addClass('moving');
				} else {
					angular.element(playerElement).removeClass('moving');
					angular.element(playerElement.nextElementSibling).removeClass('moving');
				}
			};

		})();

		var dragMove = false;
		var dragHandler = {

			transform : function (element, transform, touch) {

				for (var r = 0; r < possibleDropAreas.length; r++) {
					if (possibleDropAreas[r]) {
						var area = possibleDropAreas[r].getBoundingClientRect();
						if (touch.x > area.left && touch.x < area.right && touch.y > area.top && touch.y < area.bottom) {
							transform.translateX = (area.left + ((touch.x - area.left) - ((touch.x - area.left) % playerRect.width))) - playerRect.left;
							transform.translateY = (area.top + ((touch.y - area.top) - ((touch.y - area.top) % playerRect.height))) - playerRect.top;
							return transform;
						}
					}
				}

				transform.translateX = touch.distanceX;
				transform.translateY = touch.distanceY;
				return transform;
			},

			start : function (drag, event) {
				dragMove = true;
				setMovingStyle(true);
				SharedState.turnOff('leftSwipe');
			},

			move : function (drag, event) {},

			cancel : function (drag, event) {
				setMovingStyle(false);
				dragMove = false;
			},

			end : function (drag, event) {

				var inArea = false;
				for (var r = 0; r < possibleDropAreas.length; r++) {
					if (possibleDropAreas[r]) {
						var area = possibleDropAreas[r].getBoundingClientRect();
						if (drag.x > area.left && drag.x < area.right && drag.y > area.top && drag.y < area.bottom) {
							var newX = Math.floor((drag.x - area.left) / playerRect.width) + 1;
							var newY = Math.floor((drag.y - area.top) / playerRect.height) + 1;
							if (r === 1) { // keeper
								newX = 0;
								newY = 0;
							} else if (r === 2) { // substitute
								newX = (newX - 1) * -1;
								newY = -1;
							}
							if (ctrl.onMove({
								player : ctrl.player,
								x : newX,
								y : newY
							})) {
								drag.reset();
							}
							inArea = true;
						}
					}
				}
				if (!inArea) {
					if (ctrl.player.row !== null && ctrl.player.col !== null) {
						if (ctrl.onRemove({
							player : ctrl.player
						})) {
							drag.reset();
						}
					} else {
						drag.reset();
					}
				}
				$timeout(function () {
					setMovingStyle(false);
					dragMove = false;
					$scope.$apply();
				}, 100);
			}

		};

		$drag.bind(playerElement, dragHandler, { /* drag options */});

		// needed to set moving style on tap/click
		$touch.bind(playerElement, {
			start : function (touch) {
				if (!dragMove) {
					playerRect = playerElement.getBoundingClientRect();
					setMovingStyle(true);
				}
			},
			cancel : function (touch) {
				if (!dragMove) {
					setMovingStyle(false);
				}
			},
			end : function (touch) {
				if (!dragMove) {
					setMovingStyle(false);
				}
			}
		}, { /* touch options */});

	}]
});
