UsersApp.directive('listCard', function() {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: "../../partials/listCard.html",
			controller: function($scope, userService, dataResources) {

			}
		};
	});