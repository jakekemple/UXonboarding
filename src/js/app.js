'use strict';

//MODULE ---------------------------------------
var UsersApp = angular.module('UsersApp', ['ui.router', 'restServices']);



//ROUTING ---------------------------------------
UsersApp.config(function($stateProvider, $urlRouterProvider) {
    
    //$urlRouterProvider.otherwise('/List');

    $stateProvider
      
      .state('UserProfile', {
        url: "/UserProfile/:id",
        template: "<user-profile user-A='userA' selected-User='selectedUser' users-List='usersList' delete-User='deleteUser(userA)'></user-profile>",
        controller: "usersAppController"
      })

      .state('UserEdit', {
        url: "/Edit/:id",
        template: "<user-edit changed-User='changedUser' selected-User='selectedUser' current-User='currentUser' users-List='usersList' edit-User= 'editUser(changedUser)'></user-edit>",
        controller: "usersAppController"
      })

      .state('List', {
        url: "/List",
        template: "<list-users user-B='userB' users-List='usersList'></list-users>",
        controller: "usersAppController"
        // selected-User='selectedUser'  profile-Populate='profilePopulate(user)'
      })

      .state('AddUser', {
        url: "/Add",
        template: "<add-user new-User='newUser' users-List='usersList' add-New='addNew(newUser)'></add-user>",
        controller: "usersAppController"
      })

});









