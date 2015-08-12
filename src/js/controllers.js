//CONTROLLERS ---------------------------------------
UsersApp.controller('usersAppController', ['$scope', '$rootScope', 'userService', '$state', '$stateParams', 'dataResources', '$window',
  function($scope, $rootScope, userService, $state, $stateParams, dataResources, $window) {  

    $scope.selectedUser = userService.selectedUser;
    $scope.usersList = userService.usersList;

    $scope.addNew = function addNew(newUser) {
      $scope.usersList = userService.usersList;

        dataResources.create(newUser, function(data) {
          $scope.usersList.push(data);
        });

        $state.go("List");
    };

    $scope.profilePopulate = function (user) {
      $scope.selectedUser = $scope.usersList.indexOf(user);
      userService.selectedUser = $scope.selectedUser;
    }

    $scope.deleteUser = function (userA) { 
      var index = userService.usersList.indexOf(userA);
      userService.usersList.splice(index, 1);  
      dataResources.remove({ id: userA._id });
    }

    $scope.editUser = function editUser(changedUser) {
      changedUser.email = $scope.usersList[$scope.selectedUser].email;
      changedUser._id = $scope.usersList[$scope.selectedUser]._id;
      $scope.currentUser = changedUser;

      dataResources.update({ id: $scope.currentUser._id } ,$scope.currentUser).$promise.then(function(results) {
        $scope.usersList[$scope.selectedUser] = results;
      });

      $state.go('UserProfile', {id: $scope.usersList[$scope.selectedUser]._id});
    };

}]);
