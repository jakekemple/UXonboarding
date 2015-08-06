'use strict';

var restServices = angular.module('restServices', ['ngResource']);

//SERVICES ---------------------------------------
restServices.factory('dataResources', [ '$resource', function($resource) {

  return $resource('http://localhost:24149/users/:id', {id: "@_id"}, {
    query: {method:'GET', params:{idnum: '@id'}, isArray:true},
    create: {method:'POST', headers: { 'Content-Type': 'application/json' }},
    update: {method:'PUT', params:{idnum: '@id'}},
    remove: {method:'DELETE', params:{idnum:'@id'}, isArray:true},
  });

}]);


restServices.service('userService', function(dataResources, $stateParams) {

var selectedUser = -1;

return {
      usersList: dataResources.query(),
      selectedUser: selectedUser      
    }

});


