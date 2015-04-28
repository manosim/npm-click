module.exports = function(grunt) {

  grunt.initConfig({

    less: {
      options: {
        cleancss: true
      },
      main: {
        files: {
          'static/build/css/style.css': 'static/src/less/style.less'
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: "static/src/images/", src: '**', dest: 'static/build/images/'},
          {expand: true, cwd: "node_modules/bootstrap/fonts/", src: '**', dest: 'static/build/fonts/'},
          {expand: true, cwd: "node_modules/font-awesome/fonts/", src: '**', dest: 'static/build/fonts/'}
        ]
      }
    },

    watch: {
      less: {
        files: 'static/src/less/*',
        tasks: ['less'],
      },
      images: {
        files: 'static/src/images/*',
        tasks: ['copy'],
      },
    },

    clean: {
        files: ["static/build/"]
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['less', 'copy']);
  grunt.registerTask('release', ['clean', 'build']);

};