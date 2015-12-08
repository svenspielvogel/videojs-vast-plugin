'use strict';

var specs = "spec/*.js";
var _ = require('lodash');

var gruntConfig = {
  env: {
    // dynamically filled
  },
    qunit: {
        files: 'spec/**/*.html'
    },
    jshint: {
        gruntfile: {
            options: {
                node: true
            },
            src: 'Gruntfile.js'
        },
        src: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: ['videojs.vast.js']
        },
        test: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: ['spec/**/*.js']
        }
    },
    watch: {
        gruntfile: {
            files: '<%= jshint.gruntfile.src %>',
            tasks: ['jshint:gruntfile']
        },
        src: {
            files: '<%= jshint.src.src %>',
            tasks: ['jshint:src', 'qunit']
        },
        test: {
            files: '<%= jshint.test.src %>',
            tasks: ['jshint:test', 'qunit']
        }
    },
    connect: {
        dev: {
            options: {
                hostname: '*',
                port: 9898,
                keepalive: true
            }
        }
    }
};

module.exports = function(grunt) {
  grunt.initConfig(gruntConfig);

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-qunit');


/*  grunt.registerTask('default', ['test:sauce:' + _(desireds).keys().first()]);

  _(desireds).each(function(desired, key) {
    grunt.registerTask('test:sauce:' + key, ['env:' + key, 'simplemocha:sauce']);
  });*/

  grunt.registerTask('default', ['jshint', 'qunit']);
};
