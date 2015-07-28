UsersApp.directive('contactCard', function() {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: "../../partials/contactCard.html",
			controller: function($scope, userService, dataResources) {

			}
		};
	});