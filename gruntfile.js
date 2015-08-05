module.exports = function(grunt) {


  var paths = {
    public: 'dist/',
    private: 'src/',
    modules: 'node_modules/',
  };


  var files = {
    js: [
      '<%= paths.private %>js/*.js',
      '<%= paths.private %>js/*/*.js',
    ],
    css: [
      '<%= paths.private %>css/*.css',
    ],
    images: [
      '<%= paths.private %>images/**/*'
    ],    
    partials: [
      '<%= paths.private %>partials/**/*'
    ],
    dependencies : {
      js: [
        '<%= paths.modules %>angular/angular.min.js',
        '<%= paths.modules %>angular-resource/angular-resource.min.js',
        '<%= paths.modules %>angular-ui-router/release/angular-ui-router.min.js',
        '<%= paths.modules %>angular-mocks/angular-mocks.js'
      ]
    }
  };



  grunt.initConfig({
    paths: paths,
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      start: ['<%= paths.public %>'],
      end: ['<%= paths.public %>']
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: files.images,
            dest: '<%= paths.public %>images',
          }, {
            expand: true,
            flatten: true,
            src: 'src/index.html',
            dest: '<%= paths.public %>'
          }, {
            expand: true,
            flatten: true,
            src: files.css,
            dest: '<%= paths.public %>css'
          }, {
            expand: true,
            flatten: true,
            src: files.partials,
            dest: '<%= paths.public %>partials'
          }
        ]
      }
    },
    concat: {
      main: {
        files: [
          {
            src: files.dependencies.js.concat(files.js),
            dest: '<%= paths.public %>js/app.js'
          }
        ]
      }
    },
    connect : {
      server: {
          options: {
          keepalive: true,
          protocol: 'http',
          port: 8080,
          //open: true,
          base: paths.public
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['clean:start', 'clean:end', 'concat',  'copy', 'connect']);
};