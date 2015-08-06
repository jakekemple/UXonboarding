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
      '<%= paths.private %>partials/**/*.html'
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
          protocol: 'http',
          port: 8080,
          //open: true,
          base: paths.public
        }
      }
    },

    watch: {
      src: {
      files: [files.js, files.css, files.partials, files.images, 'src/partials/*html', 'src/index.html'],
      tasks:['concat', 'copy']}
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'copy', 'connect', 'watch']);
};