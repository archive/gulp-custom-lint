'use strict';

require('should');
let File = require('vinyl');
let customLintFn = require('../src/index');

function inMemmoryFile(str) {
  return new File({
    contents: new Buffer(str)
  });
}

describe('when in buffer mode', function() {
  it('out should still be as buffer', function(done) {
    let fakeFile = inMemmoryFile('aaa');
    let rules = [];
    let customLint = customLintFn(rules);

    customLint.write(fakeFile);

    customLint.once('data', function(file) {
      file.isBuffer().should.be.true();
      file.contents.toString().should.eql(fakeFile.contents.toString());
      done();
    });
  });
});
