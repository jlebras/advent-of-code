import input from './1_input.txt';

let sum = 0;

for (const line of input.split('\n')) {
  // Using positive lookahead ?= to handle digits sharing characters
  // ex: oneight, without positive lookahead only 'one' matches because 'e' is already be consumed
  const digitsMatched = [...line.matchAll(/(?=(\d|zero|one|two|three|four|five|six|seven|eight|nine))/g)];

  if (digitsMatched.length >= 1) {
    // First match array element is the empty string, second match (the group) is the actual digit
    const firstDigit = strDigitToNumber(digitsMatched[0][1]);
    const lastDigit = strDigitToNumber(digitsMatched[digitsMatched.length - 1][1]);

    sum += parseInt(`${firstDigit}${lastDigit}`);
  }
}

function strDigitToNumber(d) {
  let digitAsNumber = parseInt(d);

  if (!Number.isNaN(digitAsNumber)) {
    return digitAsNumber;
  }

  const digitsMap = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  digitAsNumber = digitsMap[d];

  return digitAsNumber;
}

console.log(sum);