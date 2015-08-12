// Karma configuration
// Generated on Mon Jun 29 2015 13:06:25 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    plugins:['karma-jasmine', 'karma-chrome-launcher', 'karma-ng-html2js-preprocessor'],

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: '../../node_modules/angular/angular.js'},
      {pattern: '../../node_modules/angular-ui-router/release/angular-ui-router.js'},
      {pattern: '../../node_modules/angular-resource/angular-resource.js'},
      {pattern: '../../node_modules/angular-mocks/angular-mocks.js'},
      {pattern: '../../src/js/app.js'},
      {pattern: '../../src/js/services.js'},
      {pattern: '../../src/js/controllers.js'},
      {pattern: '../../src/js/directives/**/*.js'},      
      {pattern: 'unit/**/*.js'},
      {pattern: '../../src/partials/**/*.html'},
      {pattern: '../../src/index.html', included:false},
    ],


    // list of files to exclude
    exclude: [
    ],

    //Proxies
    proxies: {
      '/app': 'http://localhost:8080/app',
      '/js': 'http://localhost:8080/js',
      '/css': 'http://localhost:8080/css',
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '../../src/partials/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
        moduleName: 'templates'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9080,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
