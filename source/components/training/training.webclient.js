osApp.factory('TrainingWebClient', ['$q','$http','Training','TrainingTransformation',function ($q, $http, Training, TrainingTransformation) {

	return {

		loadTraining : function (id) {

			var deferred = $q.defer();
			var promises = [];

			promises.push($http({
				url : '../training.php',
				method : id ? 'POST' : 'GET',
				data : id ? {
					trainingload : id
				} : null,
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

		saveTraining : function (training) {

			return $http({
				url : '../training.php',
				method : 'POST',
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				},
				data : training,
				transformRequest : TrainingTransformation.transformTrainingData,
				transformResponse : TrainingTransformation.transformTraining
			});
		}
	};
}]);
