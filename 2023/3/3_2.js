import input from './3_input.txt';

const lineSize = input.indexOf('\n') + 1;
const numberMatchs = input.matchAll(/\d+/g);
let sum = 0;
const adjacentMap = new Map();

for (const numberMatch of numberMatchs) {
  const numberAsString = numberMatch[0];
  const index = numberMatch.index;
  const starIndexes = [];

  const leftChar = input[index - 1] ?? '';
  const leftMatchs = /\*/g.test(leftChar);

  if (leftMatchs) {
    starIndexes.push(index - 1);
  }

  const rightChar = input[index + numberAsString.length] ?? '';
  const rightMatchs = /\*/g.test(rightChar);

  if (rightMatchs) {
    starIndexes.push(index + numberAsString.length);
  }

  const topChars = input.slice(index - lineSize - 1, index - lineSize + numberAsString.length + 1);
  const topMatchs = [...topChars.matchAll(/\*/g)];

  if (topMatchs.length) {
    starIndexes.push(...topMatchs.map((m) => index - lineSize - 1 + m.index));
  }

  const bottomChars = input.slice(index + lineSize - 1, index + lineSize + numberAsString.length + 1);
  const bottomMatchs = [...bottomChars.matchAll(/\*/g)];

  if ([...bottomMatchs].length) {
    starIndexes.push(...bottomMatchs.map((m) => index + lineSize - 1 + m.index));
  }

  for (const starIndex of starIndexes) {
    const adjArray = adjacentMap.get(starIndex) ?? [];
    adjArray.push(parseInt(numberAsString));
    adjacentMap.set(starIndex, adjArray);
  }
}

for (const [_, adjacentNumbers] of adjacentMap.entries()) {
  if (adjacentNumbers.length === 2) {
    sum += adjacentNumbers[0] * adjacentNumbers[1];
  }
}

console.log(sum);
