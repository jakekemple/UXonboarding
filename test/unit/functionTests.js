
var user = {_id:0001, firstName: 'Random', lastName: 'Person', phone: '000-000-0000', email: 'rando@test.com'};
var user2 = {_id:0002, firstName: 'Joe', lastName: 'Shmo', phone: '111-111-1111', email: 'rando2@test.com'};
var users = [user, user2];
var $rootScope, $q, currentUser, usersList, selectedUser, index, userId;

beforeEach(module('UsersApp'));
beforeEach(function() {

	inject(function($injector, _userService_, _dataResources_, _$httpBackend_, _$resource_, $controller) {
		$resource = _$resource_;
		$httpBackend = _$httpBackend_;
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();
		$q;



		userService = _userService_;
		dataResources = _dataResources_;


		UserListController = $controller("UserListController", {$scope: $scope});
		UserProfileController = $controller("UserProfileController", {$scope: $scope});
		UserEditController = $controller("UserEditController", {$scope: $scope});
		AddUserController = $controller("AddUserController", {$scope: $scope});				
	});

});

afterEach(function() {
	$httpBackend.verifyNoOutstandingExpectation();
	$httpBackend.verifyNoOutstandingRequest();
});

	//REST SERVICE TESTS --------------------------------------------------------------------------------

	describe('userService', function() {

		describe('GET request Test', function() {

			beforeEach(function() {
				$httpBackend.whenGET('http://localhost:24149/users/:id').respond(users);
			});

			it('Should do GET request from server', function() {
				$httpBackend.expect('GET', 'http://localhost:24149/users').respond(users);
				$httpBackend.expect('GET', 'templates/userslist.html').respond();
				userService.usersList;
				$httpBackend.flush();
				expect($scope.usersList[0]._id).toEqual(user._id);
				dump("GET SUCCESS: usersList populated with " + $scope.usersList[0].firstName + " and " + $scope.usersList[1].firstName);
			});

		});
	});



	describe('Factory', function() {


		describe('PUT Request & editUser() Test', function() {

			beforeEach(function() {
				$httpBackend.whenPUT('http://localhost:24149/users/:id');
			});

			it('Should do PUT request to server', function() {
				
				$httpBackend.expect('GET', 'http://localhost:24149/users').respond();
				


				$scope.usersList[0] = user;
				$scope.selectedUser = 0;
				
				firstName =  user.firstName;
				lastName = user.lastName;
				phone = '222-222-2222';
				email = user.email;
				_id = 0001;
				
				
				$scope.newuserEditTest = {_id, firstName, lastName, phone, email};

				$httpBackend.expect('PUT', 'http://localhost:24149/users/1').respond();

				
				$httpBackend.expect('GET', 'templates/userprofile.html').respond();
				$httpBackend.expect('GET', 'templates/userslist.html').respond();
				$scope.editUser($scope.newuserEditTest);
				
				$httpBackend.flush();
				
				expect($scope.usersList[0].phone).toEqual('222-222-2222');
				dump("PUT SUCCESS: " + user.firstName + "'s Phone number changed from " + user.phone + " to " + $scope.usersList[0].phone);

			});
		});




		describe('POST Request & addUser() Test', function() {

			beforeEach(function() {
				$httpBackend.whenPOST('http://localhost:24149/users/:id');
			});

		it('Should do POST request to server', function() {
			
			$httpBackend.expect('GET', 'http://localhost:24149/users').respond();

			$httpBackend.expect('POST', 'http://localhost:24149/users').respond();
			$httpBackend.expect('GET', 'templates/userslist.html').respond();
			$scope.addNew(user2);
			$httpBackend.flush();
			expect($scope.usersList[0].firstName).toEqual(user2.firstName);
			dump("POST SUCCESS: " + $scope.usersList[0].firstName + " has been added to usersList");
		});

		});




		describe('DELETE Request & deleteUser() Test', function() {

			beforeEach(function() {
				$httpBackend.whenDELETE('http://localhost:24149/users/:id').respond();
			});

			it('Should do DELETE request and update server', function() {
				
				$httpBackend.expect('GET', 'http://localhost:24149/users').respond();
				$scope.usersList[0] = user;
				$scope.usersList[1] = user2;

				dump("DELETE SUCCESS: usersList size went from " + $scope.usersList.length);
				
				$httpBackend.expect('DELETE', 'http://localhost:24149/users/1').respond();
				$httpBackend.expect('GET', 'templates/userslist.html').respond();
				$scope.deleteUser(user);
				$httpBackend.flush();
				dump("to " + $scope.usersList.length);

			});

		});

	});


	describe('UserListController: Selected User Test', function() {
		
		beforeEach(function() {
			$httpBackend.whenGET('templates/userslist.html').respond();
		});

		it('Should do DELETE request and update server', function() {

			
			$scope.usersList[0] = user;
			$scope.usersList[1] = user2;
			
			$httpBackend.expect('GET', 'http://localhost:24149/users').respond();
			$httpBackend.expect('GET', 'templates/userslist.html').respond();
			$scope.profilePopulate(user2);
			$httpBackend.flush();

			expect(userService.selectedUser).toEqual(1);
			dump("profilePopulate SUCCESS: Selected User changed to " + $scope.usersList[userService.selectedUser].firstName);
		
		});
	});

	//FUNCTION TESTS --------------------------------------------------------------------------------

	



