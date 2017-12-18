osApp.component('movablePlayer', {

	templateUrl : 'components/player/player.movable.html',

	bindings : {
		player : '<object',
		dropAreaSelector : '<',
		onMove : '&',
		onRemove : '&'
	},

	controller : ['$scope',
		'$element',
		'$document',
		'$drag',
		'$touch',
		'$transform',
		'$timeout',
		'$interval',
		'SharedState',
		'Popup',
		function ($scope, $element, $document, $drag, $touch, $transform, $timeout, $interval, SharedState, Popup) {

			var ctrl = this;

			var possibleDropAreas = document.querySelectorAll(ctrl.dropAreaSelector);

			var playerElement = $element[0].firstChild;
			var playerRect = playerElement.getBoundingClientRect();

			var setMovingStyle = (function () {

				if (ctrl.player.row === null && ctrl.player.col === null) {
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

			var scroll = {
				navbar : 51,
				area : document.querySelector('.scroll-area'),
				height : document.querySelector('.scroll-area').scrollHeight,
				slow : {
					margin : 25,
					offset : 5
				},
				fast : {
					margin : 12,
					offset : 10
				},
				interval : 300,
				offset : 0,
				promise : null
			};

			var dragMove = false;
			var dragHandler = {

				transform : function (element, transform, touch) {

					if (scroll.promise) {
						$interval.cancel(scroll.promise);
						scroll.promise = null;
					}

					var getTransformation = function () {
						for (var r = 0; r < possibleDropAreas.length; r++) {
							if (possibleDropAreas[r]) {
								var area = possibleDropAreas[r].getBoundingClientRect();
								if (touch.x > area.left && touch.x < area.right && touch.y > area.top && touch.y < area.bottom) {

									var inAreaOffsetX = touch.x - area.left;
									var inAreaOffsetY = touch.y - area.top;

									transform.translateX = (area.left + (inAreaOffsetX - (inAreaOffsetX % playerRect.width))) - playerRect.left;
									transform.translateY = (area.top + (inAreaOffsetY - (inAreaOffsetY % playerRect.height))) - playerRect.top;

									// scroll offset must be added when the playerRect start
									// position is relative to the scroll area
									if (ctrl.player.row !== null && ctrl.player.col !== null) {
										transform.translateY += scroll.offset;
									}
									return transform;
								}
							}
						}
						transform.translateX = touch.distanceX;
						transform.translateY = touch.distanceY;

						// scroll offset must be added when the playerRect start position is
						// relative to the scroll area
						if (ctrl.player.row !== null && ctrl.player.col !== null) {
							transform.translateY += scroll.offset;
						}
						return transform;
					};

					var getScrollOffset = function () {
						var offset = 0;
						if (window.innerHeight > 2 * scroll.slow.margin) {
							if (touch.y < (scroll.navbar + scroll.slow.margin) && scroll.area.scrollTop >= scroll.slow.offset) {
								if (touch.y < (scroll.navbar + scroll.fast.margin) && scroll.area.scrollTop >= scroll.fast.offset) {
									offset = -scroll.fast.offset;
								} else {
									offset = -scroll.slow.offset;
								}
							} else if (touch.y > (window.innerHeight - scroll.slow.margin)) {
								if (touch.y > (window.innerHeight - scroll.fast.margin)) {
									offset = scroll.fast.offset;
								} else {
									offset = scroll.slow.offset;
								}
								// limit down scrolling
								if ((scroll.area.scrollTop + offset) > (scroll.height - scroll.area.clientHeight)) {
									offset = (scroll.height - scroll.area.clientHeight) - scroll.area.scrollTop;
								}
							}
						}
						return offset;
					};

					var getScrollTransformation = function () {
						var offset = getScrollOffset();
						scroll.offset += offset;
						scroll.area.scrollTop += offset;
						var t = getTransformation();
						$transform.set(element, t);
						return t;
					};

					if (getScrollOffset() !== 0) {
						scroll.promise = $interval(getScrollTransformation, scroll.interval);
						return getScrollTransformation();
					}
					return getTransformation();
				},

				start : function (drag, event) {
					dragMove = true;
					setMovingStyle(true);
					SharedState.turnOff('leftSwipe');
					scroll.offset = 0;
				},

				move : function (drag, event) {},

				cancel : function (drag, event) {
					setMovingStyle(false);
					dragMove = false;
					$interval.cancel(scroll.promise);
					scroll.promise = null;
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
					$interval.cancel(scroll.promise);
					scroll.promise = null;

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
						Popup.open('modalPlayer', ctrl.player);
						$scope.$apply();
					}
				}
			}, { /* touch options */});

		}]
});
