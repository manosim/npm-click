'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    less: {
      options: {
        cleancss: true
      },
      main: {
        files: {
          'build/css/style.css': 'src/less/style.less'
        }
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: "src/", src: 'index.html', dest: 'build/'},
          {expand: true, cwd: "src/images/", src: '**', dest: 'build/images/'},
          {expand: true, cwd: "node_modules/bootstrap/fonts/", src: '**', dest: 'build/fonts/'},
          {expand: true, cwd: "node_modules/font-awesome/fonts/", src: '**', dest: 'build/fonts/'}
        ]
      }
    },

    watch: {
      less: {
        files: 'src/less/*',
        tasks: ['less'],
      },
      indexAndImages: {
        files: ['src/index.html', 'src/images/*'],
        tasks: ['copy'],
      },
    },

    clean: {
        files: ["build/"]
    },

    'gh-pages': {
      options: {
        branch: 'gh-pages',
        base: 'build'
      },
      deploy: {
        options: {
          user: {
            name: 'Emmanouil Konstantinidis',
            email: 'manos@iamemmanouil.com'
          },
          repo: 'https://' + process.env.GH_TOKEN + '@github.com/ekonstantinidis/git-compare.git',
          message: 'Publish project to Github Pages (Auto)' + getDeployMessage(),
          silent: true
        },
        src: ['**/*']
      }
    }

  });

  function getDeployMessage() {
    var ret = '\n\n';
    if (process.env.TRAVIS !== 'true') {
      ret += 'missing env vars for travis-ci';
      return ret;
    }
    ret += 'branch:       ' + process.env.TRAVIS_BRANCH + '\n';
    ret += 'SHA:          ' + process.env.TRAVIS_COMMIT + '\n';
    ret += 'range SHA:    ' + process.env.TRAVIS_COMMIT_RANGE + '\n';
    ret += 'build id:     ' + process.env.TRAVIS_BUILD_ID  + '\n';
    ret += 'build number: ' + process.env.TRAVIS_BUILD_NUMBER + '\n';
    return ret;
  }

  grunt.registerTask('check-deploy', function() {
    // need this
    this.requires(['build']);

    // only deploy under these conditions
    if (process.env.TRAVIS === 'true' && process.env.TRAVIS_SECURE_ENV_VARS === 'true' && process.env.TRAVIS_PULL_REQUEST === 'false') {
      grunt.log.writeln('executing deployment');
      // queue deploy
      grunt.task.run('gh-pages:deploy');
    }
    else {
      grunt.log.writeln('skipped deployment');
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['less', 'copy']);
  grunt.registerTask('release', ['clean', 'build']);
  grunt.registerTask('deploy', 'Publish from Travis', [ 'build', 'check-deploy']);
};
