
//MODULE ---------------------------------------
var UsersApp = angular.module('UsersApp', ['ui.router', 'ngResource']);



//SERVICES ---------------------------------------
UsersApp.factory('dataResources', [ '$resource', function($resource) {

  return $resource('http://localhost:24149/users/:id', {id: "@_id"}, {
    query: {method:'GET', params:{idnum: '@id'}, isArray:true},
    create: {method:'POST', headers: { 'Content-Type': 'application/json' }},
    update: {method:'PUT', params:{idnum: '@id'}},
    remove: {method:'DELETE', params:{idnum:'@id'}, isArray:true},
  });

}]);


UsersApp.service('userService', function(dataResources, $stateParams) {

var selectedUser = -1;

return {
      usersList: dataResources.query(),
      selectedUser: selectedUser      
    }

});


//ROUTING ---------------------------------------
UsersApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/List');

    $stateProvider
      
      .state('UserProfile', {
        url: "/UserProfile/:id",
        templateUrl: 'templates/userprofile.html',
      })

      .state('UserEdit', {
        url: "/Edit/:id",
        templateUrl: 'templates/editprofile.html',
      })

      .state('List', {
        url: '/List',
        templateUrl: 'templates/userslist.html',
      })

      .state('AddUser', {
        url: '/Add',
        templateUrl: 'templates/adduser.html',
      })

      //$locationProvider.html5Mode(true);

});



//CONTROLLERS ---------------------------------------
UsersApp.controller('UserListController', [ '$scope', 'userService', function($scope, userService, $stateParams) {  

      var selectedUser = userService.selectedUser;
      $scope.usersList = userService.usersList;

      $scope.profilePopulate = function (user) {
        selectedUser = $scope.usersList.indexOf(user);
        userService.selectedUser = selectedUser;
  
      }

}]);


UsersApp.controller('UserProfileController', [ '$scope', '$stateParams', 'userService', 'dataResources',  function($scope, $stateParams, userService, dataResources) {  

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
      var phoneFormat =  /^\d{3}-\d{3}-\d{4}$/;

      $scope.usersList = userService.usersList;
      $scope.selectedUser = userService.selectedUser; 

      var usersList = $scope.usersList;
      var selectedUser = $scope.selectedUser;
  
      $scope.editUser = function editUser(changedUser) {

        if ( changedUser == null || changedUser.firstName == null || changedUser.lastName == null || changedUser.phone == null){
          alert("All form fields must be correctly filled out");
        }
        else if(phoneFormat.test(changedUser.phone) == false) {
          alert("I know your trying to hack. Stop it");
        }
        else{
          $scope.currentUser = $scope.usersList[$scope.selectedUser];
          //var currentUser = $scope.currentUser;
          
        changedUser.email = $scope.usersList[$scope.selectedUser].email;
        changedUser._id = $scope.usersList[$scope.selectedUser]._id;
        $scope.currentUser = changedUser;

        dataResources.update({ id: $scope.currentUser._id } ,$scope.currentUser).$promise.then(function(results) {
          $scope.usersList[$scope.selectedUser] = results;
        });

        alert('SUCCESS!');

        $state.go('UserProfile', {id: $scope.usersList[$scope.selectedUser]._id}); ///UserProfile/:id

        }
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

      var firstName = newUser.firstName;
      var lastName = newUser.lastName;
      var phone = newUser.phone;
      var email = newUser.email;

      $scope.newUserData = { firstName, lastName, phone, email }

      dataResources.create($scope.newUserData, function(data) {
        $scope.usersList.push(data);
      });

      alert('SUCCESS!');
      $state.go("List");
    }

  };
    
});







