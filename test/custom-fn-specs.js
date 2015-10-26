'use strict';

let should = require('should');
let verify = require('./helpers/verify');

describe('when using custom lint function', function() {
  describe('and the file is valid', function() {
    it('no errors should be reported', function(done) {
      verify(
        'aaa', {
          func: function( /*content, file*/ ) {
            return {
              failed: false
            };
          },
          message: 'Custom func rule'
        },
        function(file) {
          should(file.customLint).be.exactly(undefined);
        },
        done
      );
    });
  });

  describe('and the file is invalid', function() {
    it('errors should be reported', function(done) {
      verify(
        'bbb', {
          func: function( /*content, file*/ ) {
            return {
              failed: true
            };
          },
          message: 'Custom func rule'
        },
        function(file) {
          file.customLint.should.have.lengthOf(1);
          file.customLint[0].message.should.match('Custom func rule');
        },
        done
      );
    });

    it('errors should be reported with line info', function(done) {
      verify(
        'bbb', {
          func: function( /*content, file*/ ) {
            return {
              failed: true,
              indexes: [1]
            };
          },
          message: 'Custom func rule'
        },
        function(file) {
          file.customLint.should.have.lengthOf(1);
          file.customLint[0].message.should.match('Custom func rule');
          file.customLint[0].lines.should.have.lengthOf(1);
        },
        done
      );
    });
  });

  // Misplaced spec, move to another file...
  describe('and the file is valid but has mixed eol', function() {
    it('errors should be reported with line info', function(done) {
      verify(
        'aaa\r\nbbb\nccc', {
          func: function( /*content, file*/ ) {
            return {
              failed: true,
              indexes: [1]
            };
          }
        },
        function(file) {
          file.customLint[0].lines[0].text.should.match('aaa');
        },
        done
      );
    });
  });
});
