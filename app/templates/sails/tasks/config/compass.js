module.exports = function(grunt) {

	grunt.config.set('compass', {
    dev: {
      options: {
        sassDir: 'assets/compass/sass',
        imagesDir: 'assets/compass/images',
        fontsDir: 'assets/compass/fonts',
        cssDir: 'assets/styles'
      }
    }
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
};
