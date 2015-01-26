module.exports = function (grunt) {
    grunt.config.set('watch', {
        compass: {
            files: ['<%= paths.app %>/compass/**/*'],
            tasks: ['compass:server']
        },
        test: {
            files: ['<%= paths.app %>/javascripts/**/*.js'],
            tasks: ['newer:jshint:test', 'karma:server:run'],
            options: {
                spawn: false
            }
        },
        livereload: {
            files: [
                '<%= paths.app %>/**/*.html',
                '<%= paths.app %>/javascripts/**/*.js',
                '<%= paths.app %>/images/**/*',
                '<%= paths.tmp %>/stylesheets/**/*.css',
                '<%= paths.tmp %>/images/**/*'
            ],
            options: {
                livereload: true
            }
        },
        gruntfile: {
            files: [
                'Gruntfile.js',
                'grunt/**/*.js'
            ],
            options: {
                reload: true
            }
        }
    });
};
