// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-03-03 using
// generator-karma 0.9.0

module.exports = function (config) {
    'use strict';

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine', 'browserify'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-cookies/angular-cookies.min.js',
            'bower_components/angular-resource/angular-resource.min.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular-gravatar/build/md5.min.js',
            'test/**/*.js',
            'assets/**/*.js'

        ],

        preprocessors: {
            'assets/**/*.js': ['browserify'],
            'test/**/*.js': ['browserify']
        },

        // web server port
        port: 8080,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'PhantomJS'
            //         'Firefox'

        ],

        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-firefox-launcher',
            'karma-browserify',
            'karma-coverage'
        ],


        browserify: {
            plugin: ['proxyquireify/plugin'],
            debug: true
        },
        //reporters coverage
        reporters:[
            'progress',
            'coverage'
        ],
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        // singleRun: false,
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_DEBUG
    });
};