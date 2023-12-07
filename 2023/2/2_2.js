import input from './2_input.txt';

let sum = 0;

for (const line of input.split('\n')) {
  const game = buildGameFromStr(line);

  sum += Object.keys(game.maxCubesPerColor).reduce((total, color) => total ? total * game.maxCubesPerColor[color] : game.maxCubesPerColor[color], 0);
}

console.log(sum);

function buildGameFromStr(str) {
  const gameId = parseInt(str.match(/^Game (?<gameId>\d+)/)[1]);
  const reaches = str.match(/(\d+ (?:green|red|blue))/g).map((reachMatch) => {
    const [cubeCount, color] = reachMatch.split(' ');

    return { cubeCount: parseInt(cubeCount), color };
  });
  const maxCubesPerColor = reaches.reduce((max, reach) => {
    max[reach.color] = Math.max((max[reach.color] || 0), reach.cubeCount);

    return max;
  }, {});

  return {
    gameId,
    maxCubesPerColor,
  }
}
