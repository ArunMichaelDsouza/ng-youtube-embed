module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['src/ng-youtube-embed.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
        },
        uglify: {
            target: {
                files: {
                    'build/ng-youtube-embed.min.js': ['src/ng-youtube-embed.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['watch']);
};
