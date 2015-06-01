module.exports = function (grunt) {
    grunt.config.set('cdn', {
        options: {
            flatten: true
        },
        dist: {
            options: {
                cdn: '//static.wdjimg.com/<%= paths.project %>',
            },
            cwd: '<%= paths.dist %>/',
            dest: '<%= paths.dist %>/',
            src: ['**/*.html', '**/*.css']
        },
        staging: {
            options: {
                cdn: '//s3.cn-north-1.amazonaws.com.cn/web-statics-staging/<%= paths.project %>',
            },
            cwd: '<%= paths.dist %>/',
            dest: '<%= paths.dist %>/',
            src: ['**/*.html', '**/*.css']
        }
    });
};
