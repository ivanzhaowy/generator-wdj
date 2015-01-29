module.exports = function (grunt) {
    grunt.registerTask('build:staging', [
        'clean:dist',
        'vulcanize',
        'concurrent:dist',
        'useminPrepare',
        'concat',
        'uglify',
        // 'cssmin', // Uncomment this line if using none-sass style
        // 'requirejs:dist', // Uncomment this line if using RequireJS in your project
        'rev',
        'copy:compass',
        'imagemin',
        'usemin',
        'htmlmin',
        'cdn:staging',
        'compress:gzip',
        'aws_s3:staging'
    ]);

    grunt.registerTask('build:production', [
        'clean:dist',
        'vulcanize',
        'concurrent:dist',
        'useminPrepare',
        'concat',
        'uglify',
        // 'cssmin', // Uncomment this line if using none-sass style
        // 'requirejs:dist', // Uncomment this line if using RequireJS in your project
        'rev',
        'copy:compass',
        'imagemin',
        'vulcanize',
        'usemin',
        'htmlmin',
        'cdn:dist',
        'compress:gzip',
        'aws_s3:production'
    ]);
};
