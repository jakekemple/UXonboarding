
//MODULE ---------------------------------------
var UsersApp = angular.module('UsersApp', ['ui.router', 'ngResource', 'userDirective', 'listDirective']);



//SERVICES ---------------------------------------
UsersApp.factory('dataResources', [ '$resource', function($resource) {

  return $resource('http://localhost:24149/users/:id', {}, {
    query: {method:'GET', params:{idnum: '@id'}, isArray:true},
    create: {method:'POST', headers: { 'Content-Type': 'application/json' }},
    update: {method:'PUT', params:{idnum: '@id'}},
    remove: {method:'DELETE', params:{idnum:'@id'}, isArray:true}
  });

}]);


UsersApp.service('userService', function(dataResources) {

var selectedUser = -1;

return {
      usersList: dataResources.query(),
      selectedUser: selectedUser      
    }

});



//ROUTING ---------------------------------------
UsersApp.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
      
      .state('UserProfile', {
        //url: "templates/userprofile.html",
        templateUrl: 'templates/userprofile.html',
      })


      .state('UserEdit', {
        //url: "templates/userslist.html",
        templateUrl: 'templates/editprofile.html',
      })

      .state('UsersList', {
        url: '/templates',
        templateUrl: 'templates/userslist.html',
      })

      .state('AddUser', {
        //url: '/templates',
        templateUrl: 'templates/adduser.html',
      })

});



//CONTROLLERS ---------------------------------------
 
UsersApp.controller('UserListController', [ '$scope', 'userService', function($scope, userService) {  

      var selectedUser = userService.selectedUser;
      $scope.usersList = userService.usersList;

      $scope.profilePopulate = function (user) {
        selectedUser = $scope.usersList.indexOf(user);
        userService.selectedUser = selectedUser;
      }

}]);


UsersApp.controller('UserProfileController', [ '$scope', 'userService', 'dataResources',  function($scope, userService, dataResources) {  
      
  $scope.selectedUser = userService.selectedUser;
  $scope.usersList = userService.usersList;
          
  var selectedUser = $scope.selectedUser;
  var usersList = $scope.usersList

  $scope.deleteUser = function (userA) { 
    var index = $scope.usersList.indexOf(userA);
    var userId = userA._id
    $scope.usersList.splice(index, 1);  
    dataResources.remove({ id: userId });
  }

}]);


UsersApp.controller('UserEditController', function($scope, $window, dataResources, userService) {  
   
  $scope.usersList = userService.usersList;
  $scope.selectedUser = userService.selectedUser;
          
  $scope.editUser = function editUser(changedUser) {
            
    var usersList = $scope.usersList;
    var selectedUser = $scope.selectedUser;
          
    $scope.currentUser = usersList[selectedUser];
    var currentUser = $scope.currentUser;
          

    changedUser.email = currentUser.email;
    $scope.currentUser = changedUser;

    dataResources.update( { id: currentUser._id } ,$scope.currentUser).$promise.then(function(results) {
      $scope.usersList[selectedUser] = results;
    });

  };

});


UsersApp.controller('AddUserController', function($scope, $window, dataResources, userService) {  

  $scope.addNew = function addNew(newUser) {
    
    $scope.usersList = userService.usersList;
    var firstName = newUser.firstName;
    var lastName = newUser.lastName;
    var phone = newUser.phone;
    var email = newUser.email;

    $scope.newUserData = { firstName, lastName, phone, email }
       
    dataResources.create($scope.newUserData, function(data) {
      $scope.usersList.push(data);
    });
  
  };
      
});







