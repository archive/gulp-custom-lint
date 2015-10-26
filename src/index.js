'use strict';

let through = require('through2');
let gutil = require('gulp-util');
let PluginError = gutil.PluginError;
let path = require('path');
let linter = require('./linter');
let reporter = require('./reporter');

const pluginName = 'gulp-custom-lint';

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
  let rules = _rules;

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
  return through.obj(
    processFile.bind(this, reporter.processBuffer, null),
    flush
  );
}

function flush(cb) {
  reporter.failAfterError(this);
  cb();
}

gulpCustomLint.reporter = gulpCustomListReporter;
module.exports = gulpCustomLint;