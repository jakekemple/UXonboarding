//protractor.conf.js
exports.config = {

	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['e2e/endTests.js'],

	capabilities: {
		'browserName': 'chrome'
	},

	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}
};