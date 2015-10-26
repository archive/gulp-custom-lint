'use strict';

let gutil = require('gulp-util');
let PluginError = gutil.PluginError;
let _ = require('lodash');
let lineInfo = require('./line-info');
const pluginName = 'gulp-custom-lint';

function regExp(content, regexp) {
  let indexes = [];
  let result = null;

  let hasGlobalFlag = /\g$/.test(regexp.toString());

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

  return _.any(rule.ignore, (ignore) => {
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

  let status = lint(content, file, rule);

  if (status.failed) {
    let lines = status.indexes ? findErrorLines(content, status.indexes) : null;

    file.customLint = file.customLint || [];
    file.customLint.push({
      message: rule.message,
      lines: lines
    });
  }
}

function processBuffer(file, rules) {
  let content = removeCarriageReturn(file.contents);
  rules.forEach(processRule.bind(null, content, file));
}

function removeCarriageReturn(contents) {
  return contents.toString('utf8').replace(/\r/g, '');
}

module.exports = {
  processBuffer
};