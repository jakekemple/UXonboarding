UsersApp.directive('contactCard', function() {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: "templates/contactCard.html",
			controller: function($scope, userService, dataResources) {

			}
		};
	});