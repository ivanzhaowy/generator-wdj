module.exports = function(grunt) {

	grunt.config.set('concurrent', {
    dev: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
	});

	grunt.loadNpmTasks('grunt-concurrent');
};
