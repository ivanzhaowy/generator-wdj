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
                    'elements/**',
                    'components/**',
                    '!compass/**/*.html',
                    'images/**/*.{webp,gif,png,jpg,jpeg,ttf,otf,svg}'
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
