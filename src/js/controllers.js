
//CONTROLLERS ---------------------------------------
UsersApp.controller('userListController', [ '$scope', 'userService', function($scope, userService, $stateParams) {  

      var selectedUser = userService.selectedUser;
      $scope.usersList = userService.usersList;

      $scope.profilePopulate = function (user) {
        selectedUser = $scope.usersList.indexOf(user);
        userService.selectedUser = selectedUser;
      }

  $scope.addNew = function addNew(newUser) {

    $scope.usersList = userService.usersList;

      dataResources.create(newUser, function(data) {
        $scope.usersList.push(data);
      });

      $state.go("List");
  };

}]);


UsersApp.controller('userProfileController', [ '$scope', '$state', '$stateParams', 'userService', 'dataResources',  function($scope, $state, $stateParams, userService, dataResources) {  

  if(userService.selectedUser == -1){
    $state.go('List');
  }

  $scope.selectedUser = userService.selectedUser;
  $scope.usersList = userService.usersList;

  $scope.deleteUser = function (userA) { 
    var index = userService.usersList.indexOf(userA);
    var userId = userA._id;
    userService.usersList.splice(index, 1);  
    dataResources.remove({ id: userId });
  }

}]);


UsersApp.controller('userEditController', function($scope, $state, $stateParams, $window, dataResources, userService) {  

      if(userService.selectedUser == -1){
        $state.go('List');
      }

      $scope.usersList = userService.usersList;
      $scope.selectedUser = userService.selectedUser; 

  
      $scope.editUser = function editUser(changedUser) {

        changedUser.email = $scope.usersList[$scope.selectedUser].email;
        changedUser._id = $scope.usersList[$scope.selectedUser]._id;
        $scope.currentUser = changedUser;

        dataResources.update({ id: $scope.currentUser._id } ,$scope.currentUser).$promise.then(function(results) {
          $scope.usersList[$scope.selectedUser] = results;
        });

        $state.go('UserProfile', {id: $scope.usersList[$scope.selectedUser]._id});

      };

});


UsersApp.controller('addUserController', function($scope, $window, $state, dataResources, userService) {  

console.log($scope.addNew);
console.log($scope.usersList);
console.log($scope.newUser);

    
});

/*
//CONTROLLERS ---------------------------------------
UsersApp.controller('usersAppController', [ '$scope', '$state', '$stateParams', 'userService', 'dataResources', function($scope, $state, $stateParams, dataResources, userService) {  

      $scope.selectedUser = userService.selectedUser;
      $scope.usersList = userService.usersList;

      $scope.profilePopulate = function (userB) {
        $scope.selectedUser = $scope.usersList.indexOf(userB);
        userService.selectedUser = $scope.selectedUser;
      }

      //if(userService.selectedUser == -1){
        //$state.go('List');
      //}

     $scope.deleteUser = function (userA) { 
        var index = userService.usersList.indexOf(userA);
        var userId = userA._id;
        $scope.usersList.splice(index, 1);  
        dataResources.remove({ id: userId });
      }
  
      $scope.editUser = function editUser(changedUser) {

        changedUser.email = $scope.usersList[$scope.selectedUser].email;
        changedUser._id = $scope.usersList[$scope.selectedUser]._id;
        $scope.currentUser = changedUser;

        dataResources.update({ id: $scope.currentUser._id } ,$scope.currentUser).$promise.then(function(results) {
          userService.usersList[$scope.selectedUser] = results;
        });

        $state.go('UserProfile', {id: $scope.usersList[$scope.selectedUser]._id});

      };

      $scope.addNew = function addNew(newUser) {

      //userService.usersList = userService.usersList;

      dataResources.create(newUser, function(data) {
        $scope.usersList.push(data);
      });

      }

      //$state.go("List");

}]); */
