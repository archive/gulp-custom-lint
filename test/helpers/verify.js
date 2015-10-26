'use strict';

let customLintFn = require('../../src/index');
let File = require('vinyl');

function inMemmoryFile(str) {
  return new File({
    contents: new Buffer(str),
    cwd: '/',
    base: verify.fakeFileBase,
    path: verify.fakeFilePath
  });
}

function verify(content, rule, verifyCallback, doneCallback) {
  let fakeFile = inMemmoryFile(content);
  let rules = [rule];
  let customLint = customLintFn(rules);

  customLint.write(fakeFile);

  customLint.once('data', (file) => {
    verifyCallback(file);
    doneCallback();
  });
}

verify.fakeFileBase = '/data/';
verify.fakeFilePath = '/data/data.txt';

module.exports = verify;