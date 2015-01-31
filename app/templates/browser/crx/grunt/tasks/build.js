module.exports = function (grunt) {
    var pathConfig = grunt.config.data.paths;

    grunt.registerTask('build:manifest', function () {
        var mnf = grunt.file.readJSON(pathConfig.dist + '/manifest.json');

        // customize your manifest when buiding

        grunt.file.write(pathConfig.dist + '/manifest.json', JSON.stringify(mnf, null, 4));
    });

    grunt.registerTask('build:reload', function () {
        grunt.file.write(pathConfig.dist + '/dev/reload.html', new Date().getTime().toString());
    });

    grunt.registerTask('build:staging', [
        'clean:dist',
        'copy:server',
        'targethtml:server',
        'compass:server',
        'build:reload'
    ]);

    grunt.registerTask('build:production', [
        'clean:dist',
        'copy:dist',
        'compass:dist',
        'useminPrepare',
        'concat',
        'uglify',
        'imagemin',
        'usemin',
        'targethtml:dist',
        'htmlmin',
        'build:manifest',
        'crx:pack'
    ]);
};
