module.exports = function (grunt) {
    grunt.config.set('targethtml', {
        dist: {
            files: {
                '<%= paths.dist %>/background.html': '<%= paths.dist %>/background.html'
            }
        },
        server: {
            files: {
                '<%= paths.dist %>/background.html': '<%= paths.app %>/background.html'
            }
        }
    });
};
