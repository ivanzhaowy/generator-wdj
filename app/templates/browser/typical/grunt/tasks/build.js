module.exports = function (grunt) {
    grunt.registerTask('build:staging', [
        'clean:dist',
        'concurrent:dist',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'copy:compass',
        'imagemin',
        'htmlmin',
        'cdn:staging',
        'compress:gzip',
        'aws_s3:staging'
    ]);

    grunt.registerTask('build:production', [
        'clean:dist',
        'concurrent:dist',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'copy:compass',
        'imagemin',
        'htmlmin',
        'cdn:dist',
        'compress:gzip',
        'aws_s3:production'
    ]);
};
