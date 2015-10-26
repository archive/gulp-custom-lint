'use strict';

let customLintFn = require('../src/index');
let File = require('vinyl');
let es = require('event-stream');

describe('when in stream mode', function() {
  it('should throw since its not yet supported', function() {
    let fakeFile = new File({
      contents: es.readArray(['aaa'])
    });
    let rules = [];
    let customLint = customLintFn(rules);

    (function() {
      customLint.write(fakeFile);
    }).should.throw();
  });
});
