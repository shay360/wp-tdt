const gulp = require('gulp');
const {watch} = require('gulp');
const babel = require('gulp-babel'); // Use for JS
const minify = require('gulp-minify'); // Use for JS
const sourcemaps = require('gulp-sourcemaps'); // Use for CSS
const sass = require('gulp-sass'); // Use for CSS
sass.compiler = require('node-sass'); // Use for CSS
const browsersync = require("browser-sync").create();


function jsTask() {
    return gulp.src('./src/js/theme.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist'));
}

function scssTask() {
    return gulp.src('./src/css/theme.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sourcemaps.init())
        // .pipe(sass().on('error', sass.logError))
        // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
}

function watchFiles() {
    gulp.watch(['./src/**/*'], gulp.series(scssTask, jsTask));
}

const watcher = gulp.parallel(watchFiles);
const build = gulp.series(gulp.parallel(watcher));

exports.default = build;
