module.exports = function (grunt) {
    grunt.config.set('copy', {
        server: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= paths.app %>',
                dest: '<%= paths.dist %>',
                src: [
                    '**/*',
                    '!**/*.html',
                    '!compass/**'
                ]
            }]
        },
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= paths.app %>',
                dest: '<%= paths.dist %>',
                src: [
                    '**/*',
                    '!dev/**',
                    '!compass/**',
                    '!components/**'
                ]
            }]
        }
    });
};

