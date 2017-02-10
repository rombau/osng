module.exports = function (config) {

	config.set({

		// base path that will be used to resolve all patterns (eg. files,
		// exclude)
		basePath : '',

		// these plugins will be require() by Karma
		plugins : ['karma-jasmine',
			'karma-phantomjs-launcher',
			'karma-firefox-launcher',
			'karma-chrome-launcher',
			'karma-spec-reporter',
			'karma-coverage',
			'karma-eclipse-junit-reporter',
			'karma-html2js-preprocessor'],

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks : ['jasmine'],

		// list of files / patterns to load in the browser
		files : ['fixtures/**/*.html',
			'node_modules/angular/angular.js',
			'node_modules/angular-route/angular-route.min.js',
			'node_modules/angular-sanitize/angular-sanitize.min.js',
			'node_modules/angular-cookies/angular-cookies.min.js',
			'node_modules/mobile-angular-ui/dist/js/mobile-angular-ui.min.js',
			'node_modules/mobile-angular-ui/dist/js/mobile-angular-ui.gestures.min.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'mobile/**/*.js'],

		// list of files to exclude
		exclude : ['mobile/lib/js/*.js','mobile/js/*.js'],

		// preprocess matching files before serving them to the browser
		// available preprocessors:
		// https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors : {
			'mobile/**/*.js' : 'coverage',
			'fixtures/**/*.html' : 'html2js'
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters : ['spec','junit-eclipse','coverage'],

		coverageReporter : {
			type : 'lcov',
			dir : 'coverage/'
		},

		eclipseReporter : {
			outputFile : 'junit-report.xml'
		},

		client : {
			captureConsole : false,
		},

		// web server port
		port : 9876,

		// enable / disable colors in the output (reporters and logs)
		colors : true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR ||
		// config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel : config.LOG_DISABLE,

		// enable / disable watching file and executing tests whenever any file
		// changes
		autoWatch : false,

		// start these browsers
		// available browser launchers:
		// https://npmjs.org/browse/keyword/karma-launcher
		browsers : ['PhantomJS'], // 'PhantomJS', 'Chrome', 'Firefox',

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun : true,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency : Infinity
	});
};
