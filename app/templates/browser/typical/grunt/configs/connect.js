var lrSnippet = require('connect-livereload')();

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    var pathConfig = grunt.config.data.paths;

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
                        mountFolder(connect, pathConfig.tmp),
                        mountFolder(connect, pathConfig.app)
                    ];
                }
            }
        },
        dist: {
            options: {
                keepalive: true,
                middleware: function (connect) {
                    return [
                        mountFolder(connect, pathConfig.dist)
                    ];
                }
            }
        }
    });
};
