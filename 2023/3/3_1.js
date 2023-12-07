import input from './3_input.txt';

const lineSize = input.indexOf('\n') + 1;
const numberMatchs = input.matchAll(/\d+/g);
let sum = 0;

for (const numberMatch of numberMatchs) {
  const numberAsString = numberMatch[0];
  const index = numberMatch.index;

  const leftChar = input[index - 1] ?? '';
  const rightChar = input[index + numberAsString.length] ?? ''

  const topChars = input.slice(index - lineSize - 1, index - lineSize + numberAsString.length + 1);
  const bottomChars = input.slice(index + lineSize - 1, index + lineSize + numberAsString.length + 1);

  const isAdjacentToSymbol = /[^.\d\n]/g.test([leftChar, rightChar, topChars, bottomChars].join(''));

  if (isAdjacentToSymbol) {
    sum += parseInt(numberAsString);
  }
}

console.log(sum);