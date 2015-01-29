module.exports = function (grunt) {
    grunt.config.set('vulcanize', {
        dist: {
            options: {
                strip: true
            },
            files: {
                '<%= paths.dist %>/elements/elements.vulcanized.html': [
                '<%= paths.dist %>/elements/elements.html'
                ]
            }
        }
    });
};
