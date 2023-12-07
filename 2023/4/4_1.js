import input from './4_input.txt';

let sum = 0;

for (const line of input.split('\n')) {
  const winningNumbers = line.match(/: (.*) \|/)[1].split(' ').filter((n) => !!n).map((n) => parseInt(n));
  const numbersToMatch = line.match(/\| (.*)$/)[1].split(' ').filter((n) => !!n).map((n) => parseInt(n));

  let numbersMatching = numbersToMatch.filter((n) => winningNumbers.includes(n));

  const cardValue = numbersMatching.length ? 2 ** (numbersMatching.length - 1) : 0;
  sum += cardValue;
}

console.log(sum);