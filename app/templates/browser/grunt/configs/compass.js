module.exports = function (grunt) {
    grunt.config.set('compass', {
        options: {
            sassDir: '<%= paths.app %>/compass/sass',
            imagesDir: '<%= paths.app %>/compass/images',
            fontsDir: '<%= paths.app %>/images/fonts',
            relativeAssets: true
        },
        dist: {
            options: {
                cssDir: '<%= paths.dist %>/stylesheets',
                generatedImagesDir: '<%= paths.tmp %>/images',
                httpGeneratedImagesPath: '/images/',
                outputStyle: 'compressed',
                environment: 'production',
                relativeAssets: false
            }
        },
        server: {
            options: {
                cssDir: '<%= paths.tmp %>/stylesheets',
                generatedImagesDir: '<%= paths.tmp %>/images',
                debugInfo: true,
                environment: 'development'
            }
        }
    });
};
