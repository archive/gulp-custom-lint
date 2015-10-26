/* Generated with Babel */
'use strict';

var endOfLine = '\n';

function findByIndex(lines, index) {
  var totalLength = 0;
  var lineLength = 0;

  // Alt. slice(index).split().length
  // Alt. indexOf(eof, index).split().length
  // Alt. substr(0,index
  for (var i = 0; i < lines.length; i++) {
    lineLength = lines[i].length + endOfLine.length;
    totalLength += lineLength;

    if (totalLength >= index) {
      return {
        row: i + 1,
        column: index - (totalLength - lineLength),
        text: lines[i]
      };
    }
  }
}

function findByIndexes(content, indexes) {
  var lines = content.split(endOfLine);
  return indexes.map(function (index) {
    return findByIndex(lines, index);
  });
}

module.exports = {
  findByIndexes: findByIndexes
};