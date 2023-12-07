import input from './4_input.txt';

console.log(countCards(generateCards(input)));

function generateCards(input) {
  let cards = [];

  for (const line of input.split('\n')) {
    const winningNumbers = line.match(/: (.*) \|/)[1].split(' ').filter((n) => !!n).map((n) => parseInt(n));
    const numbersToMatch = line.match(/\| (.*)$/)[1].split(' ').filter((n) => !!n).map((n) => parseInt(n));

    let numbersMatching = numbersToMatch.filter((n) => winningNumbers.includes(n)).length;

    cards.push(numbersMatching);
  }

  return cards;
}

function countCards(cards, index = null) {
  let cardsGenerated = 0;

  if (index === null) {
    for (let i = 0; i < cards.length; i++) {
      cardsGenerated += countCards(cards, i);
    }
  }
  else {
    cardsGenerated++;
    const card = cards[index];
    if (card) {
      for (let i = index + 1; i <= index + card; i++) {
        cardsGenerated += countCards(cards, i);
      }
    }
  }

  return cardsGenerated;
}