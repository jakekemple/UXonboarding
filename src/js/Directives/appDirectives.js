UsersApp.directive('listUsers', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '../../partials/userslist.html'
  };
});


UsersApp.directive('userProfile', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '../../partials/userprofile.html',
    scope: {
      userA: '=',
      selectedUser: '=',
      usersList: '=',
      deleteUser: '&'
    }
  };
});


UsersApp.directive('userEdit', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '../../partials/editprofile.html',
   scope: {
     changedUser: '=',
      selectedUser: '=',
      currentUser: '=',
      usersList: '=',
      editUser: '&'
    }
  };
});


UsersApp.directive('addUser', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '../../partials/adduser.html',
    scope: {
      newUser: '=',
      usersList: '=',
      addNew: '&'
    }
  };
});










