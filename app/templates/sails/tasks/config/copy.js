/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories and files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

	grunt.config.set('copy', {
		dev: {
			files: [{
				expand: true,
				cwd: './assets',
				src: ['**/*.!(scss)'],
				dest: '.tmp/public'
			}]
		},
		build: {
      files: [{
        expand: true,
        src: ['**/*',
              '!.tmp*',
              '!.tmp/*',
              '!.git*',
              '!.git/*',
              '!.editorconfig',
              '!.travis.yml',
              '!.jshintrc',
              '!*.sublime*'],
        dest: 'dist',
      }]
    }
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
