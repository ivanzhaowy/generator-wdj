module.exports = function (grunt) {
    grunt.config.set('uglify', {
        options: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    });
};
