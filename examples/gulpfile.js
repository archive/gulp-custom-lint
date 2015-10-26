'use strict';

var gulp = require('gulp');

// var customLint = require('gulp-custom-lint');
var customLint = require('../src/index');

var sourcePaths = {
  txt: './data/*.txt'
};

gulp.task('customLintRulesFile', function() {
  return gulp.src(sourcePaths.txt)
    .pipe(customLint())
    .pipe(customLint.reporter());
});

gulp.task('customLintRulesObject', function() {
  return gulp.src(sourcePaths.txt)
    .pipe(customLint([
      {
        regexp: /marzipan/g,
        message: 'You are not allowed to have marzipan in the txt'
      }
    ]))
    .pipe(customLint.reporter());
});
