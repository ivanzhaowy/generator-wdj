module.exports = function (grunt) {
    grunt.config.set('compress', {
        gzip: {
            options: {
                mode: 'gzip'
            },
            expand: true,
            cwd: '<%= paths.dist %>/',
            src: ['**/*.js', '**/*.css'],
            dest: 'gzip/'
        }
    });
};
