module.exports = function (grunt) {
    grunt.registerTask('serve', [
        'concurrent:server',
        'connect:server',
        'karma:server',
        'open',
        'watch'
    ]);
};
