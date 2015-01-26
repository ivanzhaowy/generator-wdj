var includeAll = require('include-all');


module.exports = function (grunt) {
    // log task running time
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    function loadConfig (relPath) {
        return includeAll({
            dirname: require('path').resolve(__dirname, relPath),
            filter: /(.+)\.js$/
        }) || {};
    }

    function invokeConfig (tasks) {
        var taskName;
        for (taskName in tasks) {
            if (tasks.hasOwnProperty(taskName)) {
                tasks[taskName](grunt);
            }
        }
    }

    var configs = loadConfig('./grunt/configs');
    var tasks = loadConfig('./grunt/tasks');

    if (!tasks.default) {
        tasks.default = function (grunt) {
            grunt.registerTask('default', []);
        };
    }

    grunt.initConfig({
        paths: {
            app: 'app',
            dist: 'dist',
            tmp: '.tmp',
            test: 'test',
            port: 9999,
            project: 'xxx'
        }
    });

    invokeConfig(configs);
    invokeConfig(tasks);
};
