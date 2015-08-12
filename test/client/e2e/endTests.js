// endTests.js

describe('UsersApp E2E Tests: ', function() {
  
  var restMocks;

  //Feed each test restMocks
  beforeEach(function() {
      restMocks = require('./endMocks');
      browser.addMockModule('restMocks', restMocks.e2eMocks);
  });


  //-----------------------Delay Tests for Readability----------------------
  var origFn = browser.driver.controlFlow().execute;

  browser.driver.controlFlow().execute = function() {
    var args = arguments;

    origFn.call(browser.driver.controlFlow(), function() {
      return protractor.promise.delayed(150);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
  };
  //------------------------------------------------------------------------


  describe('AddUser Test', function() {
    it('Should Add User to List of Users', function() {
      
      browser.get('http://0.0.0.0:8080');
      element(by.uiSref('AddUser')).click();

      element(by.name('fname')).sendKeys('New');
      element(by.name('lname')).sendKeys('Guy');
      element(by.name('phoneIn')).sendKeys('000-000-0000');
      element(by.name('mailIn')).sendKeys('nguy@test.com');

      element(by.name('addSubmitter')).click();
    });
  });


  describe('Route Navigating', function() {
    it('Should Navigate To List of Users', function() {
      element(by.uiSref('List')).click();
    });
  });

  describe('Select & Delete User', function() {
    it('Should select first user and delete them from list', function() {
      element(by.uiSref('UserProfile({id: user._id})')).click();

      element(by.name('deleter')).click();
    });
  });


  describe('Route Navigating', function() {
    it('Should Navigate To List of Users', function() {
      element(by.uiSref('List')).click();
    });
  });

  describe('Select & Edit User', function() {
    it('Should select first user and edit them', function() {
      element(by.uiSref('UserProfile({id: user._id})')).click();

      element(by.name('editor')).click();

      element(by.name('fnameIn')).sendKeys('John');
      element(by.name('lnameIn')).sendKeys('Changed');
      element(by.name('ephoneIn')).sendKeys('111-444-4444');

      element(by.name('editSubmitter')).click();      
    });
  });

  describe('Route Navigating', function() {
    it('Should Navigate To List of Users', function() {
      element(by.uiSref('List')).click();
    });
  });

});
