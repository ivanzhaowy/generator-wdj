module.exports = function (grunt) {
    // log task running time
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var pathConfig = {
        app: 'app',
        dist: 'dist',
        tmp: '.tmp',
        test: 'test'
    };

    grunt.initConfig({
        paths: pathConfig,
        watch: {
            compass: {
                files: ['<%= paths.app %>/compass/**/*'],
                tasks: ['compass:server', 'build:reload']
            },
            test: {
                files: ['<%= paths.app %>/javascripts/**/*.js'],
                tasks: ['newer:jshint:test', 'karma:server:run'],
                options: {
                    spawn: false
                }
            },
            all: {
                files: ['<%= paths.app %>/**/*', '!<%= paths.app %>/compass/**/*'],
                tasks: ['build:staging', 'build:reload'],
                options: {
                    spawn: false
                }
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        },
        clean: {
            dist: ['<%= paths.tmp %>', '<%= paths.dist %>']
        },
        useminPrepare: {
            html: ['<%= paths.app %>/**/*.html'],
            options: {
                dest: '<%= paths.dist %>'
            }
        },
        usemin: {
            html: ['<%= paths.dist %>/**/*.html'],
            css: ['<%= paths.dist %>/stylesheets/**/*.css'],
            options: {
                dirs: ['<%= paths.dist %>'],
                assetsDirs: ['<%= paths.dist %>']
            }
        },
        htmlmin: {
            options: {
                collapseWhitespace: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.dist %>',
                    src: ['**/*.html'],
                    dest: '<%= paths.dist %>'
                }]
            }
        },
        copy: {
            server: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.app %>',
                    dest: '<%= paths.dist %>',
                    src: [
                        '**/*',
                        '!**/*.html',
                        '!compass/**'
                    ]
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.app %>',
                    dest: '<%= paths.dist %>',
                    src: [
                        '**/*',
                        '!dev/**',
                        '!compass/**',
                        '!components/**'
                    ]
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= paths.app %>/compass/sass',
                imagesDir: '<%= paths.app %>/compass/images',
                fontsDir: '<%= paths.app %>/images/fonts',
                relativeAssets: true
            },
            dist: {
                options: {
                    cssDir: '<%= paths.dist %>/stylesheets',
                    generatedImagesDir: '<%= paths.dist %>/images',
                    httpGeneratedImagesPath: '/images/',
                    outputStyle: 'compressed',
                    environment: 'production',
                    relativeAssets: false
                }
            },
            server: {
                options: {
                    cssDir: '<%= paths.dist %>/stylesheets',
                    generatedImagesDir: '<%= paths.dist %>/images',
                    debugInfo: true,
                    environment: 'development'
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= paths.dist %>/javascripts/**/*.js',
                        '<%= paths.dist %>/stylesheets/**/*.css',
                        '<%= paths.dist %>/images/**/*.{webp,gif,png,jpg,jpeg,ttf,otf}'
                    ]
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    progressive: true,
                    interlace: true,
                    cwd: '<%= paths.dist %>/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: '<%= paths.dist %>/images'
                }]
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            test: ['<%= paths.app %>/javascripts/**/*.js']
        },
        karma: {
            options: {
                configFile: '<%= paths.test %>/karma.conf.js',
                browsers: ['Chrome_without_security']
            },
            server: {
                reporters: ['progress'],
                background: true
            },
            test: {
                reporters: ['progress', 'junit', 'coverage'],
                preprocessors: {
                    '<%= paths.app %>/javascripts/**/*.js' : 'coverage'
                },
                junitReporter: {
                    outputFile: '<%= paths.test %>/output/test-results.xml'
                },
                coverageReporter: {
                    type: 'html',
                    dir: '<%= paths.test %>/output/coverage/'
                },
                singleRun: true
            },
            travis: {
                browsers: ['PhantomJS'],
                reporters: ['progress'],
                singleRun: true
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json', '<%= paths.app %>/manifest.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false
            }
        },
        targethtml: {
            dist: {
                files: {
                    '<%= paths.dist %>/background.html': '<%= paths.dist %>/background.html'
                }
            },
            server: {
                files: {
                    '<%= paths.dist %>/background.html': '<%= paths.app %>/background.html'
                }
            }
        },
        crx: {
            pack: {
                src: '<%= paths.dist %>',
                dest: '<%= paths.dist %>/your-extension-name.crx',
                privateKey: 'path/to/your/file.pem',
            }
        }
    });

    grunt.registerTask('build:manifest', function () {
        var mnf = grunt.file.readJSON(pathConfig.dist + '/manifest.json');

        // customize your manifest when buiding

        grunt.file.write(pathConfig.dist + '/manifest.json', JSON.stringify(mnf, null, 4));
    });

    grunt.registerTask('build:reload', function () {
        grunt.file.write(pathConfig.dist + '/dev/reload.html', new Date().getTime().toString());
    });

    grunt.registerTask('serve', [
        'build:staging',
        // 'karma:server', // Uncomment this line if want to enable unit test
        'watch'
    ]);

    grunt.registerTask('test', [
        'jshint:test',
        'karma:test'
    ]);

    grunt.registerTask('test:travis', [
        'jshint:test',
        'karma:travis'
    ]);

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

    grunt.registerTask(['update'], [
        'bump-only:patch',
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask(['update:minor'], [
        'bump-only:minor',
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask(['update:major'], [
        'bump-only:major',
        'changelog',
        'bump-commit'
    ]);
};
