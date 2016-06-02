# UX Onboarding Intern Project
## A Generic User Management Application


![User Profile App](https://raw.githubusercontent.com/jakekemple/UXonboarding/uxappView.png)

Load free user management application. Features include viewing the list of all users, profiles of each user, and the ability to add & edit users

### Languages/Tools/Dependencies 
- HTML/CSS (No template)
- AngularJS 
- NPM for dependency management
- Grunt for testing & build 
- MongoDB for user data model
- Karma/Protractor/Jasmine testing tools (Unit & E2E)

### How To Use Locally:
- Globally Install Node.js(with npm) & Grunt task runner
- Download MongoDB
- Clone [API](https://github.com/Banno/ux_onboarding) Project
- Clone This UXonboarding repository 
- In a terminal window, run
        `mongod`
  to start the local db 
  
- In a new terminal window, run 
		`node index`
  within the API project directory (from step 3)
  
- Install dependencies from a terminal window with
		`npm install`
  within the UXonboarding project directory
  
- Finally, run 
		`grunt`
  within the UXonboarding project directory
  
- A live demo should open in your browser
- NOTE: The users list will be blank until you add a user

### Run Unit Tests:
- From the UXonboarding project root folder, run 
		`node_modules/.bin/karma start karma.conf.js`
  in a terminal window
  
- View Passed Tests


### Run E2E Tests:
- You will first need to install java jdk & selenium standalone server in order to run the webdriver-manager, which is needed to run the protractor E2E tests
1. For Selenium, Run 
		`node_modules/.bin/webdriver-manager update --standalone`
2. [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
3. Then start up the webdriver-manager with 
		`node_modules/.bin/webdriver-manager start`

- In a separate terminal window, run 
		`node_modules/.bin/protractor test/client/protractor.conf.js`
  within the UXonboarding project root folder
  
- View E2E tests run & pass
