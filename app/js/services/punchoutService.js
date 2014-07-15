four51.app.factory('Punchout', ['$resource', '$451', '$http', '$cookieStore', function($resource, $451, $http, $cookieStore ) {

	var _punchoutSession = $cookieStore.get('punchoutSession.' + $451.apiName);

	var _getForm = function(success, error){
		var url = $451.api('punchoutin/returnform/' + _punchoutSession.PunchoutTemplateName);

		$resource(url).get().$promise.then(function(form){
				success(form);
			},
			function(err){
				error(err);
			});
	}

	return {
		getForm: _getForm,
		punchoutSession: _punchoutSession
	}
}]);