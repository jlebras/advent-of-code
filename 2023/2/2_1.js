import input from './2_input.txt';

const initialState = {
  red: 12,
  green: 13,
  blue: 14,
};

const possibleGames = [];

for (const line of input.split('\n')) {
  const game = buildGameFromStr(line);

  if (isGamePossible(game)) {
    possibleGames.push(game);
  }
}

console.log(possibleGames.reduce((total, game) => total + game.id, 0));

function buildGameFromStr(str) {
  const gameId = parseInt(str.match(/Game (\d+)/)[1]);

  const reaches = str.match(/\d+ (green|red|blue)/g).map((reachMatch) => {
    const [cubeCount, color] = reachMatch.split(' ');

    return { cubeCount: parseInt(cubeCount), color };
  });

  const maxCubesPerColor = reaches.reduce((max, reach) => {
    max[reach.color] = Math.max((max[reach.color] || 0), reach.cubeCount);

    return max;
  }, {});

  return {
    id: gameId,
    maxCubesPerColor,
  }
}

function isGamePossible(game) {
  return Object.keys(game.maxCubesPerColor).every((color) => game.maxCubesPerColor[color] <= initialState[color])
}
