var lrSnippet = require('connect-livereload')();

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    grunt.config.set('connect', {
        options: {
            port: '<%= paths.port %>',
            hostname: '0.0.0.0'
        },
        server: {
            options: {
                middleware: function (connect) {
                    return [
                        lrSnippet,
                        mountFolder(connect, grunt.config.data.paths.tmp),
                        mountFolder(connect, grunt.config.data.paths.app)
                    ];
                }
            }
        }
    });
};
