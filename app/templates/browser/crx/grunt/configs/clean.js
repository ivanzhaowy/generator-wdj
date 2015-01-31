module.exports = function (grunt) {
    grunt.config.set('clean', {
        dist: ['<%= paths.tmp %>', '<%= paths.dist %>']
    });
};
