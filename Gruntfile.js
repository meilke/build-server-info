module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  var files = [ './Gruntfile.js', 'test/**/*.js', 'src/**/*.js' ];

  grunt.initConfig({
    jshint: {
      files: files,
      options: {
        quotmark : 'single',
        node: true,
        indent: 2,
        unused: true,
        nomen: true
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

  grunt.registerTask('default', [ 'jshint', 'mochaTest' ]);
};