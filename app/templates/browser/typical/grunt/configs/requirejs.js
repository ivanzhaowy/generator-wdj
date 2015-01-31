module.exports = function (grunt) {
    grunt.config.set('requirejs', {
        dist: {
            options: {
                optimize: 'uglify',
                uglify: {
                    toplevel: true,
                    ascii_only: false,
                    beautify: false,
                    drop_console: true,
                    drop_debugger: true,
                    dead_code: true
                },
                preserveLicenseComments: true,
                useStrict: false,
                wrap: true
            }
        }
    });
};
