module.exports = function (grunt) {
  grunt.config.set('jshint', {
    options: {
      jshintrc: '.jshintrc'
    },
    test: ['<%= paths.app %>/javascripts/**/*.js']
  });
};
