exports.e2eMocks = function() {
	angular.module('restMocks', ['UsersApp', 'ngMockE2E'])
		.run(function ($httpBackend) {

			var usersList = [
				{
					'_id': '001',
					firstName: 'Sally',
					lastName: 'Brown',
					phone: '444-444-4444',
					email: 'sbrown@test.com'
				},
				{
					'_id': '002',
					firstName: 'John',
					lastName: 'Smith',
					phone: '555-555-5555',
					email: 'jsmith@test.com'
				},
			];
			var changedUser = 
				{				
					'_id': '001',
					firstName: 'John',
					lastName: 'Changed',
					phone: '111-444-4444',
					email: 'sbrown@newtest.com'
				};

			var newUser = 
			{
				'_id': '005',
				firstName: 'New',
				lastName: 'Guy',
				phone: '000-000-0000',
				email: 'nguy@test.com'
			};


			$httpBackend.whenGET('http://localhost:24149/users').respond(function(){
				return [200, usersList];
			});

			$httpBackend.whenPOST('http://localhost:24149/users').respond(function(){
				return [200, newUser];
			});

			$httpBackend.whenDELETE('http://localhost:24149/users/001').respond(function(){
				return [200];
			});

			$httpBackend.whenPUT('http://localhost:24149/users/002').respond(function(){
				return [200, changedUser];
			});

			$httpBackend.whenGET(/.*/).passThrough();
		
		});
}