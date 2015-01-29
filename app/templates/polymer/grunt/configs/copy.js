module.exports = function (grunt) {
    grunt.config.set('copy', {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= paths.app %>',
                dest: '<%= paths.dist %>',
                src: [
                    '*.html',
                    'elements/elements.vulcanized.html',
                    'components/polymer/polymer.js',
                    'components/polymer/polymer.html',
                    'components/webcomponentsjs/webcomponents.js',
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
