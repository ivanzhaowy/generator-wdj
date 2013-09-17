'use strict';

var lrSnippet = require('connect-livereload')();

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var pathConfig = {
        app : 'app',
        dist : 'dist',
        tmp : '.tmp',
        test : 'test'
    };

    grunt.initConfig({
        paths : pathConfig,
        watch : {
            compass : {
                files : ['<%= paths.app %>/compass/{,*/}*/{,*/}*.{scss,sass,png,ttf}'],
                tasks : ['compass:server']
            },
            test : {
                files : ['<%= paths.app %>/javascripts/**/*.js'],
                tasks : ['jslint:test', 'karma:server:run'],
                options : {
                    spawn : false
                }
            },
            livereload: {
                files: [
                    '<%= paths.app %>/*.html',
                    '<%= paths.app %>/javascripts/**/*.js',
                    '<%= paths.app %>/images/**/*.*',
                    '<%= paths.tmp %>/stylesheets/**/*.css',
                    '<%= paths.tmp %>/images/**/*.*'
                ],
                options : {
                    livereload : true,
                    spawn : false
                }
            }
        },
        connect : {
            options : {
                port : 9999,
                hostname : '0.0.0.0'
            },
            server : {
                options : {
                    middleware : function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, pathConfig.app)
                        ];
                    }
                }
            }
        },
        open: {
            server : {
                path : 'http://127.0.0.1:<%= connect.options.port %>',
                app : 'Google Chrome Canary'
            }
        },
        clean : {
            dist : ['<%= paths.tmp %>', '<%= paths.dist %>'],
            server : '<%= paths.tmp %>'
        },
        useminPrepare : {
            html : ['<%= paths.app %>/*.html'],
            options : {
                dest : '<%= paths.dist %>'
            }
        },
        usemin: {
            html : ['<%= paths.dist %>/*.html'],
            options : {
                dirs : ['<%= paths.dist %>']
            }
        },
        htmlmin : {
            dist : {
                files : [{
                    expand : true,
                    cwd : '<%= paths.app %>',
                    src : ['*.html'],
                    dest : '<%= paths.dist %>'
                }]
            }
        },
        copy : {
            dist : {
                files : [{
                    expand : true,
                    dot : true,
                    cwd : '<%= paths.app %>',
                    dest : '<%= paths.dist %>',
                    src : [
                        'images/**/*.{webp,gif,png,jpg,jpeg}'
                    ]
                }]
            }
        },
        compass : {
            options : {
                sassDir : '<%= paths.app %>/compass/sass',
                imagesDir : '<%= paths.app %>/compass/images',
                fontsDir : '<%= paths.app %>/compass/fonts',
                relativeAssets : true
            },
            dist : {
                options : {
                    cssDir : '<%= paths.dist %>/stylesheets',
                    generatedImagesDir : '<%= paths.dist %>/images',
                    outputStyle : 'compressed'
                }
            },
            server : {
                options : {
                    cssDir : '<%= paths.tmp %>/stylesheets',
                    generatedImagesDir : '<%= paths.tmp %>/images',
                    debugInfo : true
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= paths.dist %>/javascripts/**/*.js',
                        '<%= paths.dist %>/stylesheets/**/*.css',
                        '<%= paths.dist %>/images/**/*.*'
                    ]
                }
            }
        },
        imagemin : {
            dist : {
                files : [{
                    expand : true,
                    cwd : '<%= paths.dist %>/images',
                    src : '**/*.{png,jpg,jpeg}',
                    dest : '<%= paths.dist %>/images'
                }]
            }
        },
        requirejs : {
            dist : {
                options : {
                    optimize : 'uglify',
                    uglify : {
                        toplevel : true,
                        ascii_only : false,
                        beautify : false
                    },
                    preserveLicenseComments : true,
                    useStrict : false,
                    wrap : true
                }
            }
        },
        concurrent: {
            dist : ['copy:dist', 'compass:dist']
        },
        jslint : {
            test : {
                src : [
                    '<%= paths.app %>/javascripts/**/*.js'
                ],
                directives : {
                    sloppy : true,
                    vars : true,
                    nomen : true,
                    devel : true,
                    browser : true,
                    indent : 4,
                    unparam: true,
                    plusplus : true,
                    todo : true,
                    bitwise :  true,
                    stupid : true,
                    evil : true,
                    regexp : true,
                    ass : true,
                    predef : [
                        'define', 'require'
                    ]
                },
                options : {
                    errorsOnly : true
                }
            }
        },
        karma : {
            options : {
                configFile : '<%= paths.test %>/karma.conf.js',
                browsers : ['Chrome_without_security']
            },
            server : {
                reporters : ['progress'],
                background : true
            },
            test : {
                reporters : ['progress', 'junit', 'coverage'],
                preprocessors : {
                    '<%= paths.app %>/javascripts/**/*.js' : 'coverage'
                },
                junitReporter : {
                    outputFile : '<%= paths.test %>/output/test-results.xml'
                },
                coverageReporter : {
                    type : 'html',
                    dir : '<%= paths.test %>/output/coverage/'
                },
                singleRun : true
            },
            travis : {
                browsers : ['PhantomJS'],
                reporters : ['progress'],
                singleRun : true
            }
        }
    });

    grunt.registerTask('server', [
        'clean:server',
        'compass:server',
        'connect:server',
        'karma:server',
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'jslint:test',
        'karma:test'
    ]);

    grunt.registerTask('test:travis', [
        'jslint:test',
        'karma:travis'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'useminPrepare',
        'concat',
        'uglify',
        // 'requirejs:dist', // Uncomment this line if using RequireJS in your project
        'imagemin',
        'htmlmin',
        'rev',
        'usemin'
    ]);
};
