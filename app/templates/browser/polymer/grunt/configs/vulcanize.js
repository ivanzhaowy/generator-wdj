module.exports = function (grunt) {
    grunt.config.set('vulcanize', {
        dist: {
            options: {
                strip: true,
                inline: true
            },
            files: {
                '<%= paths.dist %>/elements/elements.html': [
                    '<%= paths.app %>/elements/elements.html'
                ]
            }
        }
    });
};
