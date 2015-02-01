module.exports = function(grunt) {

    grunt.initConfig({
        sprockets: {
            build: {
                files: ["js/src/index.js"],
                dest: "js/application.js"
            }
        },
        sass: {
            dist: {
                files: {
                    "css/application.css" : "css/scss/style.scss"
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/src/*.js'],
                tasks: ['sprockets']
            },
            scss: {
                files: ['css/scss/style.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sprockets');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('deploy', ['sprockets', 'sass']);
    grunt.registerTask('default', ['deploy']);
};
