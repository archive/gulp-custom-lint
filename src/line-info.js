'use strict';

const endOfLine = '\n';

function findByIndex(lines, index) {
  let totalLength = 0;
  let lineLength = 0;

  // Alt. slice(index).split().length
  // Alt. indexOf(eof, index).split().length
  // Alt. substr(0,index
  for (let i = 0; i < lines.length; i++) {
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
  let lines = content.split(endOfLine);
  return indexes.map((index) => {
    return findByIndex(lines, index);
  });
}

module.exports = {
  findByIndexes
};
