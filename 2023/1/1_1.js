import input from './1_input.txt';

let sum = 0;

for (const line of input.split('\n')) {
  const digitsMatched = line.match(/\d/g);

  if (digitsMatch !== null) {
    const firstDigit = digitsMatched[0];
    const lastDigit = digitsMatched[digitsMatched.length - 1];

    sum += parseInt(`${firstDigit}${lastDigit}`);
  }
}

console.log(sum);