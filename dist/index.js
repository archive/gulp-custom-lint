/* Generated with Babel */
'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var path = require('path');
var linter = require('./linter');
var reporter = require('./reporter');

var pluginName = 'gulp-custom-lint';

function processFile(action, rules, file, enc, cb) {
  if (file.isNull()) {
    return cb(null, file);
  }

  if (file.isBuffer()) {
    action(file, rules);
  }

  if (file.isStream()) {
    throw new PluginError(pluginName, 'Steam(s) is not supported yet :(');
  }

  cb(null, file);
}

function gulpCustomLint(_rules) {
  var rules = _rules;

  if (!rules) {
    try {
      rules = require(path.join(path.resolve('.'), '.jsclintrc'));
    } catch (ex) {
      throw new PluginError(pluginName, 'Missing .jsclintrc file!');
    }
  }

  return through.obj(processFile.bind(this, linter.processBuffer, rules));
}

function gulpCustomListReporter() {
  return through.obj(processFile.bind(this, reporter.processBuffer, null), flush);
}

function flush(cb) {
  reporter.failAfterError(this);
  cb();
}

gulpCustomLint.reporter = gulpCustomListReporter;
module.exports = gulpCustomLint;