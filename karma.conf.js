// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  var appDir = "app";	
	
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      appDir + '/bower_components/underscore/underscore-min.js',
      appDir + '/bower_components/underscore.string/dist/underscore.string.min.js',
      appDir + '/bower_components/angular/angular.js',
      appDir + '/bower_components/angular-mocks/angular-mocks.js',
      appDir + '/bower_components/angular-resource/angular-resource.js',
      appDir + '/bower_components/angular-cookies/angular-cookies.js',
      appDir + '/bower_components/angular-sanitize/angular-sanitize.js',
      appDir + '/bower_components/angular-route/angular-route.js',
      appDir + '/bower_components/angular-bootstrap/ui-bootstrap.min.js',
      appDir + '/bower_components/AngularJS-Toaster/toaster.js',
      appDir + '/bower_components/angular-animate/angular-animate.min.js',
      appDir + '/scripts/*.js',
      appDir + '/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    reporters: ['progress', 'html'],

    htmlReporter: {
      outputDir: 'karma_html'
    }
  });
};
