'use strict';

require('should');
let lineInfo = require('../src/line-info');
const endOfLine = '\n';

describe('when requesting line info', function() {
  describe('by index', function() {
    let content;
    let indexes;

    beforeEach(function() {
      content = '';
      content += 'Text text text' + endOfLine;
      content += 'Text text1 text' + endOfLine;
      content += 'Text text text' + endOfLine;
      indexes = [content.indexOf('text1')];
    });

    it('row number should be set', function() {
      let lineInfos = lineInfo.findByIndexes(content, indexes);

      lineInfos[0].row.should.eql(2);
    });

    it('column number should be set', function() {
      let lineInfos = lineInfo.findByIndexes(content, indexes);

      lineInfos[0].column.should.eql(5);
    });

    it('line text should be set', function() {
      let lineInfos = lineInfo.findByIndexes(content, indexes);

      lineInfos[0].text.should.eql('Text text1 text');
    });
  });
});
