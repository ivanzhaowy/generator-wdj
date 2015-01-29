module.exports = function (grunt) {
    grunt.config.set('vulcanize', {
        dist: {
            options: {
                strip: true
            },
            files: {
                '<%= paths.app %>/elements/elements.vulcanized.html': [
                '<%= paths.app %>/elements/elements.html'
                ]
            }
        }
    });
};
