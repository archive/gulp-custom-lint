'use strict';

let should = require('should');
let verify = require('./helpers/verify');

describe('when using regex lint pattern', function() {
  describe('and the file is valid', function() {
    describe('using global flag', function() {
      it('no errors should be reported', function(done) {
        verify(
          'aaa', {
            regexp: /bbb/g,
            message: 'No bbb rules'
          },
          function(file) {
            should(file.customLint).be.exactly(undefined);
          },
          done
        );
      });
    });

    describe('not using global flag', function() {
      it('no errors should be reported', function(done) {
        verify(
          'aaa', {
            regexp: /bbb/,
            message: 'No bbb rules'
          },
          function(file) {
            should(file.customLint).be.exactly(undefined);
          },
          done
        );
      });
    });
  });

  describe('and the file is invalid', function() {
    describe('using global flag', function() {
      it('errors should be reported', function(done) {
        verify(
          'bbb', {
            regexp: /bbb/g,
            message: 'No bbb rules'
          },
          function(file) {
            file.customLint.should.have.lengthOf(1);
            file.customLint[0].message.should.match('No bbb rules');
            file.customLint[0].lines.should.have.lengthOf(1);
          },
          done
        );
      });
    });

    describe('not using global flag', function() {
      it('errors should be reported', function(done) {
        verify(
          'bbb', {
            regexp: /bbb/,
            message: 'No bbb rules'
          },
          function(file) {
            file.customLint.should.have.lengthOf(1);
            file.customLint[0].message.should.match('No bbb rules');
            file.customLint[0].lines.should.have.lengthOf(1);
          },
          done
        );
      });
    });

    describe('using ignore pattern', function() {
      it('errors should not be reported', function(done) {
        verify(
          'bbb', {
            regexp: /bbb/g,
            message: 'No bbb rules',
            ignore: [/blaha/, new RegExp(verify.fakeFileBase)]
          },
          function(file) {
            should(file.customLint).be.exactly(undefined);
          },
          done
        );
      });
    });

  });
});
