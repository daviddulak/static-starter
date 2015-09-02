'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      less: {
        files: ['css/**/*.less'],
        tasks: ['less:dev'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      js: {
        files: ['js/**/*.js'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    less: {
      dev: {
        files: {
          'css/app.css': 'css/app.less'
        },
        options: {
          outputStyle: 'expanded',
          sourceComments: 'normal'
        }
      },
      dist: {
        files: {
          'dist/css/app.css': 'css/app.less'
        },
        options: {
          outputStyle: 'compressed'
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: 'dist/img/'
        }]
      }
    },
    modernizr: {
      devFile: 'js/modernizr.js',
      outputFile: 'dist/js/modernizr.min.js',
      files: [
        'css/**/*.less',
        'js/**/*.js',
        '*.html',
        'img/**/*.*',
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
        src: 'index.html',
        dest: 'dist/index.html',
      }
    },
    useminPrepare: {
      html: 'dist/index.html',
      options: {
        root: './'
      }
    },
    usemin: {
      html: 'dist/index.html'
    },
    connect: {
      dev: {
        options: {
          port: 3000,
          open: true,
          middleware: function(connect, opts) {
            return [
              require('connect-livereload')(),
              connect.static(require('path').resolve(__dirname))
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
