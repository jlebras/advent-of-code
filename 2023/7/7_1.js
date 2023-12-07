import input from './7_input.txt';

let hands = [];

for (const handWithBid of input.split('\n')) {
  const [hand, bid] = handWithBid.split(' ');
  hands.push({
    hand,
    bid: parseInt(bid),
    type: getHandType(hand),
  });
}

hands.sort((h1, h2) => {
  if (h1.type - h2.type !== 0) {
    return h1.type - h2.type;
  }
  else {
    // Hands have the same type
    return compareHandsByFirstCard(h1, h2);
  }
});

console.log(hands.reduce((total, hand, index) => total += hand.bid * (index + 1), 0));

function compareHandsByFirstCard(h1, h2) {
  const cardsOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse();

  for (let i = 0; i < 5; i++) {
    const cardH1 = h1.hand[i];
    const cardH2 = h2.hand[i];

    const cardH1Order = cardsOrder.findIndex((c) => c === cardH1);
    const cardH2Order = cardsOrder.findIndex((c) => c === cardH2);

    const diff = cardH1Order - cardH2Order;

    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
}

function getHandType(hand) {
  const cardsGroups = new Map();

  for (const card of hand) {
    let nbOfCardsOfSameLabel = cardsGroups.get(card) || 0;
    nbOfCardsOfSameLabel++;

    cardsGroups.set(card, nbOfCardsOfSameLabel);
  }

  switch (cardsGroups.size) {
    // All cards are different
    case 5:
      return 1;

    // One pair
    case 4:
      return 2;

    // Three of a kind or Two pair
    case 3:
      return [...cardsGroups.values()].some((cardsCount) => cardsCount === 3) ? 4 : 3;

    // Full house or Four of a kind
    case 2:
      return [...cardsGroups.values()].some((cardsCount) => cardsCount === 4) ? 6 : 5;
    // Five of a kind
    case 1:
      return 7;
  }
}