'use strict';

var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    inlinesvg = require('postcss-inline-svg'),
    cssnano = require('gulp-cssnano'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean'),
    server = require('gulp-server-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin');

gulp.task('sass', function () {
return gulp.src('./scss/**/*.scss')
.pipe(sourcemaps.init())
.pipe(sass().on('error', sass.logError))
.pipe(postcss([
  inlinesvg({ /* options */ }),
  autoprefixer()
]))
.pipe(sourcemaps.write())
.pipe(cssnano())
.pipe(gulp.dest('./build/css'));
});

gulp.task('clean-css', function () {
return gulp.src('build/css/*.css', {read: false})
.pipe(clean());
});

gulp.task('sass:watch', function () {
gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('webserver', ['clean-css','sass:watch'], function() {
gulp.src('./')
.pipe(server({
  livereload: true,
  directoryListing: true,
  defaultFile: './index.html',
  open: true
}));
});

gulp.task('img-min', () =>
gulp.src('./img/*/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/'))
);

gulp.task('default', ['clean-css','sass','sass:watch','webserver'], function () {});