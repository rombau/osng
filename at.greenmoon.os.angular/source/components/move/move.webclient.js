/**
 * Move web client.
 */
osApp.factory('MoveWebClient', ['$q','$http','Move','MoveTransformation',function ($q, $http, Move, MoveTransformation) {

	return {

		loadMove : function (zat) {

			var move;

			return $http({
				url : '../zugabgabe.php' + (zat ? '?lauf=' + zat : ''),
				method : 'GET',
				transformResponse : MoveTransformation.transformSetup
			}).then(function (response) {

				move = response.data;

				var deferred = $q.defer();
				var promises = [];

				promises.push($http({
					url : '../zugabgabe.php?p=1',
					method : 'GET',
					transformResponse : MoveTransformation.transformActions
				}));
				promises.push($http({
					url : '../zugabgabe.php?p=2',
					method : 'GET',
					transformResponse : MoveTransformation.transformOptions
				}));

				$q.all(promises).then(function (moveArray) {
					move.options = moveArray[0].data.options.concat(moveArray[1].data.options);
					move.adjustments = moveArray[0].data.adjustments.concat(moveArray[1].data.adjustments);
					deferred.resolve(move);
				}, deferred.reject, deferred.notify);

				return deferred.promise;
			});
		},

		saveMove : function (move) {

			return $http({
				url : '../zugabgabe_beta.php',
				method : 'POST',
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				},
				data : move.players,
				transformRequest : MoveTransformation.transformPlayers
			}).then(function (response) {

				var deferred = $q.defer();

				if (response.data === 'Count mismatch') {
					deferred.reject(response.data);
				}

				var promises = [];

				for (var a = 0; a < move.adjustments.length; a++) {
					var adjustment = move.adjustments[a];

					if (!adjustment.id || adjustment.markDeleted) {

						var params;
						if (adjustment.markDeleted) {
							params = {
								p : adjustment.option.page,
								delzae : adjustment.id,
								'delete' : '++++Gewählte+Aktion+löschen+++'
							};
						} else {
							params = {
								p : adjustment.option.page,
								itemcreate : adjustment.option.item,
								anlegen : '+++Neue+Aktion+anlegen+++'
							};
							for ( var p in adjustment.params) {
								if (adjustment.params.hasOwnProperty(p)) {
									params[p] = adjustment.params[p].value;
								}
							}
						}
						promises.push($http({
							url : '../zugabgabe.php',
							params : params,
							method : 'GET'
						}));
					}
				}

				$q.all(promises).then(function (responseArray) {

					$http({
						url : '../checkza.php',
						method : 'GET'
					}).then(deferred.resolve, deferred.reject, deferred.notify);

				}, deferred.reject, deferred.notify);

				return deferred.promise;
			});
		},

		loadAdjustmentForm : function (option) {

			return $http({
				url : '../zugabgabe.php?p=' + option.page + '&item=' + option.item,
				method : 'GET',
				transformResponse : MoveTransformation.transformAdjustmentForm
			});
		}
	};
}]);
