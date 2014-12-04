module.exports = function (grunt) {
    grunt.config('jshint', {
        options: {
            jshintrc: '.jshintrc'
        },
        gruntfile: {
            src: 'Gruntfile.js'
        },
        lib: {
            src: ['src/**/*.js']
        },
        test: {
            src: ['tests/**/*.js']
        },
    });

    grunt.registerTask('lint', ['jshint']);
}
