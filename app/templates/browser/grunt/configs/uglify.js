module.exports = function (grunt) {
    grunt.config.set('uglify', {
        options: {
            banner: grunt.file.read(__dirname + '/banner.txt'),
            sourceMap: true,
            preserveComments: 'some',
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    });
};
