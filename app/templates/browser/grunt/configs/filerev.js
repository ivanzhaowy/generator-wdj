module.exports = function (grunt) {
    grunt.config.set('filerev', {
        options: {
            algorithm: 'md5',
            length: 8
        },
        dist: {
            src: [
                '<%= paths.dist %>/javascripts/**/*.js',
                '<%= paths.dist %>/stylesheets/**/*.css',
                '<%= paths.dist %>/images/**/*.{webp,gif,png,jpg,jpeg,ttf,otf}'
            ]
        }
    });
};
