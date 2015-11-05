module.exports = function (grunt) {
  grunt.registerTask('default', [
    'compileAssets',
    'linkAssets',
    'concurrent'
  ]);

  grunt.registerTask('serve', [
    'compileAssets',
    'linkAssets',
    'concurrent'
  ]);
};
