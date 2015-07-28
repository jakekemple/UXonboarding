'use strict';

//MODULE ---------------------------------------
var UsersApp = angular.module('UsersApp', ['ui.router', 'theService']);


//ROUTING ---------------------------------------
UsersApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/List');

    $stateProvider
      
      .state('UserProfile', {
        url: "/UserProfile/:id",
        templateUrl: '../partials/userprofile.html',
      })

      .state('UserEdit', {
        url: "/Edit/:id",
        templateUrl: '../partials/editprofile.html',
      })

      .state('List', {
        url: '/List',
        templateUrl: '../partials/userslist.html',
      })

      .state('AddUser', {
        url: '/Add',
        templateUrl: '../partials/adduser.html',
      })

});











