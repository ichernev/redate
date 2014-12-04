module.exports = function (grunt) {
    grunt.registerTask('test', [
        'mochaTest'
    ]);

    grunt.config('mochaTest', {
        options: {
            reporter: 'spec'
        },
        src: ['build/tests/**/*.js', '!build/tests/exports.js']
    });
};
