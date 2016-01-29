
/***********[ Testing and running grunt! ]************
Dundermiff menu:
 *  'grunt test' : Runs jshint, starts a local nodemon using server.js
 *  'grunt test -testOnline' :  Runs jshint, concats and uglifies and mins your files, pushes to heroku-test1.
                                Opens the app in a new chrome windows, and shows you logs in shell.
    !!! --> crtl+c to cancel out of heroku logs!
 *  'grunt test -scrumMaster' :  Does all the same as above, but for real on the live server.
Future users:
1. Please make sure you have the heroku toolbelt installed.
2. Log into your heroku server, and make sure the pointers
   to heroku apps in the 'shell' config are correct.
******************************************************/
'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'App/Client/**/app.js',
                    'App/Client/**/services.js',
                    'App/Client/**/*.js'
                ],
                dest: 'App/Client/dist/concatted.js'
            }
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        uglify: {
            build: {
                src: 'App/Client/dist/concatted.js',
                dest: 'App/Client/dist/uglified.js'
            }
        },

        jshint: {
            files: [
                'Gruntfile.js', 'App/**/*.js', '**/*.js'
            ],
            options: {
                force: 'false',
                ignores: ['App/Client/dist/**/*.js', 'node_modules/**/*.js']
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'app/Client/Dist/prodMin.css': ['App/Client/**/*.css']
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'App/Client/**/*.js',
                    'App/Client/**/*.js'
                ],
                tasks: [
                    'jshint',
                    'concat',
                    'uglify'
                ]
            },
            css: {
                files: 'App/Client/**/*.css',
                tasks: ['cssmin']
            }
        },

        shell: {
            herokuDeployPush: {
                command: 'git push heroku master'
            },
            herokuDeployLogs: {
                command: 'heroku logs --tail --app julieandroby'
            },
            herokuDeployOpen: {
                command: 'heroku open --app julieandroby'
            },
            clean: {
                command: 'rm -rf app/public/dist'
            },
            localServer: {
                command: 'nodemon server.js'
            }
        }

    }); // end init config

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('testLocal', [
        'jshint', 'shell:localServer'
    ]);

    grunt.registerTask('build', [
        'shell:clean', 'jshint', 'concat', 'uglify', 'cssmin'
    ]);

    grunt.registerTask('scrumMaster', [
        'shell:herokuDeployPush', 'shell:herokuDeployOpen', 'shell:herokuDeployLogs'
    ]);

    grunt.registerTask('testOnline', [
        'shell:herokuTestPush', 'shell:herokuTestOpen', 'shell:herokuTestLogs'
    ]);



    grunt.registerTask('test', function() {
        if (grunt.option('testOnline')) {
            grunt.task.run(['build']);
            grunt.task.run(['testOnline']);

        } else if (grunt.option('scrumMaster')) {
            grunt.task.run(['build']);
            grunt.task.run(['scrumMaster']);

        } else {
            grunt.task.run(['testLocal']);
        }
    });

}; // end of gruntfile
Status API Training Shop Blog About Pricing
© 2016 GitHub, Inc. Terms Privacy Security Contact Help