'use strict';

module.exports = function(grunt) {
    grunt.initConfig({});
    grunt.loadTasks('grunt.d');
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['lint', 'compile', 'test']);
};
