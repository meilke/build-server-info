module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-mocha-test');

  var files = [ './Gruntfile.js', 'test/**/*.js', 'src/**/*.js' ];

  grunt.initConfig({
    jslint: {
      module: {
        src: files,
        directives: {
          sloppy: true,
          quotmark : 'single',
          node: true,
          indent: 2,
          vars: true,
          unused: true,
          nomen: true,
          predef: [
            'require',
            'module',
            'describe',
            'it',
            'beforeEach'
          ]
        }
      }
    },
    mochaTest: {
      test: {
        options: { reporter: 'spec' },
        src: files
      }
    },
    release: {
      options: { commitMessage: 'NPM Release v<%= version %>' }
    }
  });

  grunt.registerTask('default', [ 'jslint', 'mochaTest' ]);
};