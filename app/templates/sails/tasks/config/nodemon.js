module.exports = function(grunt) {

	grunt.config.set('nodemon', {
    dev: {
      script: 'app.js',
      options: {
        env: {
          PORT: '1337'
        },
        ignore: ['node_modules/**', '.tmp/**'],
      }
    }
	});

	grunt.loadNpmTasks('grunt-nodemon');
};
