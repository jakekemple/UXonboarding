

//CONTROLLERS ---------------------------------------
UsersApp.controller('UserListController', [ '$scope', 'userService', function($scope, userService, $stateParams) {  

      var selectedUser = userService.selectedUser;
      $scope.usersList = userService.usersList;

      $scope.profilePopulate = function (user) {
        selectedUser = $scope.usersList.indexOf(user);
        userService.selectedUser = selectedUser;
  
      }

}]);


UsersApp.controller('UserProfileController', [ '$scope', '$state', '$stateParams', 'userService', 'dataResources',  function($scope, $state, $stateParams, userService, dataResources) {  

      if(userService.selectedUser == -1){
        $state.go('List');
      }

  $scope.selectedUser = userService.selectedUser;
  $scope.usersList = userService.usersList;

  var selectedUser = $scope.selectedUser;
  var usersList = $scope.usersList

  $scope.deleteUser = function (userA) { 
    var index = $scope.usersList.indexOf(userA);
    var userId = userA._id;
    $scope.usersList.splice(index, 1);  
    dataResources.remove({ id: userId });
  }

}]);


UsersApp.controller('UserEditController', function($scope, $state, $stateParams, $window, dataResources, userService) {  

      if(userService.selectedUser == -1){
        $state.go('List');
      }

      //var phoneFormat =  /^\d{3}-\d{3}-\d{4}$/;

      $scope.usersList = userService.usersList;
      $scope.selectedUser = userService.selectedUser; 

      var usersList = $scope.usersList;
      var selectedUser = $scope.selectedUser;
  
      $scope.editUser = function editUser(changedUser) {

        //if ( changedUser == null || changedUser.firstName == null || changedUser.lastName == null || changedUser.phone == null){
         // alert("All form fields must be correctly filled out");
        //}
        //else if(phoneFormat.test(changedUser.phone) == false) {
         // alert("I know your trying to hack. Stop it");
        //}
        //else{
          $scope.currentUser = $scope.usersList[$scope.selectedUser];
          //var currentUser = $scope.currentUser;
          
        changedUser.email = $scope.usersList[$scope.selectedUser].email;
        changedUser._id = $scope.usersList[$scope.selectedUser]._id;
        $scope.currentUser = changedUser;

        dataResources.update({ id: $scope.currentUser._id } ,$scope.currentUser).$promise.then(function(results) {
          $scope.usersList[$scope.selectedUser] = results;
        });

        alert('SUCCESS!');

        $state.go('UserProfile', {id: $scope.usersList[$scope.selectedUser]._id});

        //}
    };

});


UsersApp.controller('AddUserController', function($scope, $window, $state, dataResources, userService) {  

  var phoneFormat =  /^\d{3}-\d{3}-\d{4}$/;

  $scope.addNew = function addNew(newUser) {

    $scope.usersList = userService.usersList;
    
    if ( newUser == null || newUser.firstName == null || newUser.lastName == null || newUser.phone == null || newUser.email == null ){

      alert("All form fields must be correctly filled out");

    }
    else if(phoneFormat.test(newUser.phone) == false) {
      alert("I know your trying to hack. Stop it");
    }
    else{

      dataResources.create(newUser, function(data) {
        $scope.usersList.push(data);
      });

      alert('SUCCESS!');
      $state.go("List");
    }

  };
    
});