module.exports = function (grunt) {
    grunt.registerTask('compile', [
        'clean:build-commonjs', '6to5', 'copy:vanilla'
    ]);

    grunt.config('clean.build-commonjs', [
        'build/src',
        'build/tests'
    ]);

    grunt.config('6to5', {
        // options: {
        //     sourceMap: true
        // },
        src: {
            expand: true,
            cwd: 'src',
            src: '**/*.js',
            dest: 'build/src',
        },
        tests: {
            expand: true,
            cwd: 'tests',
            src: ['**/*.js', '!exports.js'],
            dest: 'build/tests',
        }
    });

    grunt.config('copy.vanilla', {
        src: 'tests/exports.js',
        dest: 'build/'
    });

};
