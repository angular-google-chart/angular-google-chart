module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'+
        '/*\n' +
        '* @description Google Chart Api Directive Module for AngularJS\n'+
        '* @version 0.0.11\n'+
        '* @author Nicolas Bouillon <nicolas@bouil.org>\n'+
        '* @author GitHub contributors\n'+
        '* @license MIT\n'+
        '* @year 2013\n'+
        '*/\n'
      },
      build: {
        src: ['src/googlechart.module.js', 'src/*.js'],
        dest: 'ng-google-chart.js'
      }
    },
    jshint: {
      options:{
        jshintrc: true
      },
      all: ['Gruntfile.js', 'sample.js', 'partials/**/*.js', 'src/**/*.js']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint:all', 'concat']);

};