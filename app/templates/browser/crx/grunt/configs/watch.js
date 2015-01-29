module.exports = function (grunt) {
    grunt.config.set('watch', {
        compass: {
            files: ['<%= paths.app %>/compass/**/*'],
            tasks: ['compass:server', 'build:reload']
        },
        test: {
            files: ['<%= paths.app %>/javascripts/**/*.js'],
            tasks: ['newer:jshint:test', 'karma:server:run'],
            options: {
                spawn: false
            }
        },
        all: {
            files: ['<%= paths.app %>/**/*', '!<%= paths.app %>/compass/**/*'],
            tasks: ['build:staging', 'build:reload'],
            options: {
                spawn: false
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
