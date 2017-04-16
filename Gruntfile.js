module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      build: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' +
            '/*\n' +
            '* @description Google Chart Api Directive Module for AngularJS\n' +
            '* @version <%= pkg.version %>\n' +
            '* @author GitHub Contributors <https://github.com/angular-google-chart/angular-google-chart/graphs/contributors> \n' +
            '* @license MIT\n' +
            '* @year 2013\n' +
            '*/\n',
          sourceMap: true
        },
        src: ['src/googlechart.module.js', 'src/*.js'],
        dest: 'ng-google-chart.js'
      },
      release: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' +
            '/*\n' +
            '* @description Google Chart Api Directive Module for AngularJS\n' +
            '* @version <%= pkg.version %>\n' +
            '* @author GitHub Contributors <https://github.com/angular-google-chart/angular-google-chart/graphs/contributors> \n' +
            '* @license MIT\n' +
            '* @year 2013\n' +
            '*/\n'
        },
        src: ['src/googlechart.module.js', 'src/*.js'],
        dest: 'ng-google-chart.js'
      }
    },
    jshint: {
      options:{
        jshintrc: true,
        jasmine: true,
        reporter: require('jshint-stylish')
      },
      all: ['Gruntfile.js', 'sample.js', 'partials/**/*.js', 'src/**/*.js']
    },
    uglify: {
      build: {
        options: {
          sourceMapIn: 'ng-google-chart.js.map',
          sourceMap: true
        },
        files: {
          'ng-google-chart.min.js': ['ng-google-chart.js']
        }
      },
      release: {
        files: {
          'ng-google-chart.min.js': ['ng-google-chart.js']
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    watch: {
      files: ['src/**.js','test/**/*.spec.js'],
      tasks:['jshint:all', 'karma:unit']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('release', ['jshint:all', 'karma', 'concat:release', 'uglify:release']);
  grunt.registerTask('build', ['jshint:all', 'karma', 'concat:build', 'uglify:build']);
  grunt.registerTask('default', ['build']);

};
