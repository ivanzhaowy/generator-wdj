module.exports = function (grunt) {
    grunt.config.set('copy', {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= paths.app %>',
                dest: '<%= paths.dist %>',
                src: [
                    '**/*.html',
                    '!components/**/*.html',
                    '!compass/**/*.html',
                    'images/**/*.{webp,gif,png,jpg,jpeg,ttf,otf,svg}'
                ]
            }]
        },
        html: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= paths.tmp %>',
                dest: '<%= paths.dist %>',
                src: [
                    '**/*.html'
                ]
            }]
        },
        compass: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= paths.tmp %>',
                dest: '<%= paths.dist %>',
                src: [
                    'images/**/*.{webp,gif,png,jpg,jpeg,ttf,otf,svg}'
                ]
            }]
        }
    });
};
