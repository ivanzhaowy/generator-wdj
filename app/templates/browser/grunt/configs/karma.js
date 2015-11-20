module.exports = function (grunt) {
  grunt.config.set('karma', {
    options: {
      configFile: '<%= paths.test %>/karma.conf.js',
      browsers: ['Chrome_without_security']
    },
    server: {
      reporters: ['progress'],
      background: true
    },
    test: {
      reporters: ['progress', 'junit', 'coverage'],
      preprocessors: {
        '<%= paths.app %>/javascripts/**/*.js' : 'coverage'
      },
      junitReporter: {
        outputFile: '<%= paths.test %>/output/test-results.xml'
      },
      coverageReporter: {
        type: 'html',
        dir: '<%= paths.test %>/output/coverage/'
      },
      singleRun: true
    },
    travis: {
      browsers: ['PhantomJS'],
      reporters: ['progress'],
      singleRun: true
    }
  });
};
