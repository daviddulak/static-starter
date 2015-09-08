'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      less: {
        files: ['src/css/**/*.less'],
        tasks: ['less:dev'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      js: {
        files: ['src/js/**/*.js'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    less: {
      dev: {
        files: {
          'src/css/app.css': 'src/css/app.less'
        },
        options: {
          outputStyle: 'expanded',
          sourceComments: 'normal'
        }
      },
      dist: {
        files: {
          'dist/css/app.css': 'src/css/app.less'
        },
        options: {
          outputStyle: 'compressed',
          compress: true
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: 'dist/img/'
        }]
      }
    },
    modernizr: {
      devFile: 'src/js/modernizr.js',
      outputFile: 'dist/js/modernizr.min.js',
      files: [
        'src/css/**/*.less',
        'src/js/**/*.js',
        'src/*.html',
        'src/img/**/*.*',
        '!./dist/js/modernizr.min.js'
      ],
      extra: {
        "shiv" : true,
        "printshiv" : false,
        "load" : true,
        "mq" : false,
        "cssclasses" : true
      },
      extensibility: {
        "addtest" : false,
        "prefixed" : false,
        "teststyles" : false,
        "testprops" : false,
        "testallprops" : false,
        "hasevents" : false,
        "prefixes" : false,
        "domprefixes" : false
      }
    },
    copy: {
      dist: {
        expand: true,
        src: [
          'src/*'
        ],
        dest: 'dist/',
        flatten: true,
        filter: 'isFile'
      }
    },
    useminPrepare: {
      html: 'dist/index.html',
      options: {
        root: 'src/'
      }
    },
    usemin: {
      html: 'dist/index.html'
    },
    connect: {
      options: {
        base: 'src'
      },
      dev: {
        options: {
          port: 3000,
          open: false,
          base: 'src',
          middleware: function(connect, opts) {
            return [
              require('connect-livereload')(),
              connect.static(require('path').resolve(opts.base))
            ];
          }
        }
      }
    },
  });

  grunt.registerTask('dev', ['less:dev', 'connect', 'watch']);
  grunt.registerTask('build', [
    'less:dist',
    'imagemin:dist',
    'copy:dist',
    'useminPrepare',
    'concat',
    'uglify',
    'usemin',
    'modernizr'
  ]);
  grunt.registerTask('default', ['dev']);
};
