module.exports = function (grunt) {
    grunt.config.set('cdn', {
        options: {
            flatten: true
        },
        dist: {
            options: {
                cdn: 'http://static.wdjimg.com/xxx',
            },
            src: ['<%= paths.dist %>/**/*.html', '<%= paths.dist %>/**/*.css']
        },
        staging: {
            options: {
                cdn: 'https://s3.cn-north-1.amazonaws.com.cn/web-statics-staging/xxx',
            },
            src: ['<%= paths.dist %>/**/*.html', '<%= paths.dist %>/**/*.css']
        }
    });
};
