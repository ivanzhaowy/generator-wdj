module.exports = function (grunt) {
    grunt.config.set('mkdir', {
        dist: {
            options: {
                create: ['<%= paths.dist %>/elements']
            }
        }
    });
};
