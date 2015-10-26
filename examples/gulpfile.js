'use strict';

var gulp = require('gulp');
var customLint = require('../src/index');
// var customLint = require('gulp-custom-lint');

gulp.task('default', function() {
  return gulp.src('./code/*.*')
    .pipe(customLint())
    .pipe(customLint.reporter());
});

gulp.task('default2', function() {
  return gulp.src('./code/*.*')
    .pipe(customLint([
      {
        regexp: /[0-9]px/g,
        message: 'Use rem units instead of pixels'
      }
    ]))
    .pipe(customLint.reporter());
});
