module.exports = function (grunt) {
    grunt.config.set('aws_s3', {
        options: {
            accessKeyId: '',
            secretAccessKey: '',
            region: 'cn-north-1',
            uploadConcurrency: 5,
            signatureVersion: 'v4'
        },
        staging: {
            options: {
                bucket: 'web-statics-staging',
                differential: true,
                params: {
                    CacheControl: '31536000'
                }
            },
            files: [{
                expand: true,
                cwd: '<%= paths.dist %>',
                src: ['**', '!**/*.css', '!**/*.js'],
                dest: 'xxx/'

            }, {
                expand: true,
                cwd: 'gzip',
                src: ['**'],
                dest: 'xxx/',
                params: {
                    ContentEncoding: 'gzip'
                }
            }]
        },
        production: {
            options: {
                bucket: 'web-statics-production',
                differential: true,
                params: {
                    CacheControl: '31536000'
                }
            },
            files: [{
                expand: true,
                cwd: '<%= paths.dist %>',
                src: ['**', '!**/*.css', '!**/*.js'],
                dest: 'xxx/'
            }, {
                expand: true,
                cwd: 'gzip',
                src: ['**'],
                dest: 'xxx/',
                params: {
                    ContentEncoding: 'gzip'
                }
            }]
        }
    });
};
