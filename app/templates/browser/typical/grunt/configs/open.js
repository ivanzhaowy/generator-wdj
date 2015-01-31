module.exports = function (grunt) {
    grunt.config.set('open', {
        server: {
            path: 'http://127.0.0.1:<%= paths.port %>',
            app: 'Google Chrome Canary'
        }
    });
};
