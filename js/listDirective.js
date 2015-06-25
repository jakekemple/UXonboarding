angular.module('listDirective', [])
	.directive('listCard', function() {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: "templates/listCard.html",
			controller: function($scope, userService, dataResources) {

			}
		};
	});