module.exports = function(grunt) {

	grunt.config.set('compress', {
    production: {
      options: {
        archive: 'release.tar',
        pretty: true
      },
      expand: true,
      cwd: 'dist/',
      src: ['**/*'],
      dest: './'
    }
	});

	grunt.loadNpmTasks('grunt-contrib-compress');
};
