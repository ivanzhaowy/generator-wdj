module.exports = function (grunt) {
    grunt.config.set('concurrent', {
        server: {
            tasks: ['clean:server', 'compass:server'],
            options: {
                logConcurrentOutput: true
            }
        },
        dist: {
            tasks: ['copy:dist', 'compass:dist'],
            options: {
                logConcurrentOutput: true
            }
        }
    });
};
