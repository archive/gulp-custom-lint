/* Generated with Babel */
'use strict';

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var _ = require('lodash');
var lineInfo = require('./line-info');
var pluginName = 'gulp-custom-lint';

function regExp(content, regexp) {
  var indexes = [];
  var result = null;

  var hasGlobalFlag = /\g$/.test(regexp.toString());

  if (hasGlobalFlag) {
    while ((result = regexp.exec(content)) !== null) {
      indexes.push(result.index);
    }
  } else {
    result = regexp.exec(content);
    if (result) {
      indexes.push(result.index);
    }
  }

  return {
    failed: indexes.length !== 0,
    indexes: indexes.length !== 0 ? indexes : null
  };
}

function customFunc(content, file, func) {
  return func(content, file);
}

function findErrorLines(content, indexes) {
  return lineInfo.findByIndexes(content, indexes);
}

function shouldBeIngored(file, rule) {
  if (!rule.ignore) {
    return false;
  }

  return _.any(rule.ignore, function (ignore) {
    return ignore.test(file.path);
  });
}

function lint(content, file, rule) {
  if (rule.regexp) {
    return regExp(content, rule.regexp);
  } else if (rule.func) {
    return customFunc(content, file, rule.func);
  } else {
    throw new PluginError(pluginName, 'Missing regexp or custom func');
  }
}

function processRule(content, file, rule) {
  if (shouldBeIngored(file, rule)) {
    return;
  }

  var status = lint(content, file, rule);

  if (status.failed) {
    var lines = status.indexes ? findErrorLines(content, status.indexes) : null;

    file.customLint = file.customLint || [];
    file.customLint.push({
      message: rule.message,
      lines: lines
    });
  }
}

function processBuffer(file, rules) {
  var content = removeCarriageReturn(file.contents);
  rules.forEach(processRule.bind(null, content, file));
}

function removeCarriageReturn(contents) {
  return contents.toString('utf8').replace(/\r/g, '');
}

module.exports = {
  processBuffer: processBuffer
};