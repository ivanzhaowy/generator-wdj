module.exports = function (grunt) {
  grunt.config.set('imagemin', {
    dist: {
      files: [{
        expand: true,
        progressive: true,
        interlace: true,
        cwd: '<%= paths.dist %>/images',
        src: '**/*.{png,jpg,jpeg}',
        dest: '<%= paths.dist %>/images'
      }]
    }
  });
};
