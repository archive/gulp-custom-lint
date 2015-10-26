'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var header = require('gulp-header');
var babel = require('gulp-babel');

var paths = {
  scripts: 'src/**/*.js',
  tests: 'test/**/*.js',
  examples: 'examples/**/*.js',
  thisFile: 'gulpfile.js'
};

gulp.task('test', function() {
  return gulp.src(paths.tests, {read: false})
    .pipe(mocha());
});

gulp.task('lint', function() {
  return gulp.src([
    paths.thisFile,
    paths.scripts,
    paths.examples,
    paths.tests
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('babel', function() {
  return gulp.src(paths.scripts)
    .pipe(header('/* Generated with Babel */\n'))
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['test', 'lint', 'babel'], function() {
});
