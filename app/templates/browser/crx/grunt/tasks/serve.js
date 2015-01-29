module.exports = function (grunt) {
    grunt.registerTask('serve', [
        'build:staging',
        // 'karma:server', // Uncomment this line if want to enable unit test
        'watch'
    ]);
};
