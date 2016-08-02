module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                    interrupt: true,
                },
            },
        },
        jshint: {
            options: {jshintrc:'.jshintrc'},
            uses_defaults: ['dir1/**/*.js', 'dir2/**/*.js'],
            with_overrides: {
                options: {
                    curly: false,
                    undef: true,
                },
                files: {
                    src: ['dir3/**/*.js', 'dir4/**/*.js']
                },
            }
            // ,
            // ignore_warning: {
            //     options: {
            //         '-W015': true,
            //     },
            //     src: ['**/*.js'],
            // }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['lib/webapp/asserts/*.js'],
                dest: 'release/webapp/asserts/frame-all-release.js'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['src/webapp/asserts/frame.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['release/webapp/asserts/frame.css']
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            compress: {
                files: {
                    "release/webapp/asserts/frame-all-release.css": ["src/webapp/asserts/*.css"]
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['jshint','uglify','csslint','cssmin']);

};