module.exports = function (grunt) {
    grunt.config.set('crx', {
        pack: {
            src: '<%= paths.dist %>',
            dest: '<%= paths.dist %>/your-extension-name.crx',
            privateKey: 'path/to/your/file.pem',
        }
    });
};
