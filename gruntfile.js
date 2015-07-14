'use strict'

module.exports = function(grunt) {
  var filepaths = {
      public: './',
  };
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
    server: {
      options: {
        keepalive: true,
        protocol: 'http',
        port: 8080,
        open: true,
        base: filepaths.public
      }
    }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect']);

};
