module.exports = function (grunt) {
    grunt.config.set('useminPrepare', {
        html: ['<%= paths.app %>/**/*.html'],
        options: {
            dest: '<%= paths.dist %>'
        }
    });

    grunt.config.set('usemin', {
        html: ['<%= paths.dist %>/**/*.html'],
        css: ['<%= paths.dist %>/stylesheets/**/*.css'],
        options: {
            dirs: ['<%= paths.dist %>'],
            assetsDirs: ['<%= paths.dist %>'],
            blockReplacements: {
                vulcanized: function (block) {
                      return '<link rel="import" href="' + block.dest + '">';
                }
            }
        }
    });
};
