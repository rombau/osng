osApp.factory('TrainingWebClient', ['$q','$http','Training','TrainingTransformation',function ($q, $http, Training, TrainingTransformation) {

	return {

		loadTraining : function () {

			var deferred = $q.defer();
			var promises = [];

			promises.push($http({
				url : '../training.php',
				method : 'GET',
				transformResponse : TrainingTransformation.transformTraining
			}));
			promises.push($http({
				url : '../trainer.php',
				method : 'GET',
				transformResponse : TrainingTransformation.transformTrainer
			}));

			$q.all(promises).then(function (responses) {

				var training = responses[0].data;
				for (var t = 0; t < training.trainer.length; t++) {
					training.trainer[t].gehalt += responses[1].data[t].gehalt;
					training.trainer[t].vertrag = responses[1].data[t].vertrag;
					training.trainer[t].abfindung = responses[1].data[t].abfindung;
				}

				deferred.resolve(training);

			}, deferred.reject, deferred.notify);

			return deferred.promise;
		},

		saveTraining : function () {

		}
	};
}]);
