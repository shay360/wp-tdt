const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');

gulp.task('js', (cb) => gulp.src('src/theme.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(minify())
    .pipe(gulp.dest('dist')));

gulp.task('default', function () {
    console.log('Hello');
});