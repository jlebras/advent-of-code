import input from './6_input.txt';

const [timeL, distL] = input.split('\n');
const times = timeL.split(' ').filter((s) => !!s).slice(1).map((n) => parseInt(n));
const distances = distL.split(' ').filter((s) => !!s).slice(1).map((n) => parseInt(n));

let waysToWinProduct = 1;

for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const distanceToBeat = distances[i];
  let waysToWinPerRace = 0;

  for (let t = 0; t <= time; t++) {
    const d = distanceTraveled(t, time);

    if (d > distanceToBeat) {
      waysToWinPerRace++;
    }
  }

  waysToWinProduct *= waysToWinPerRace;
}

console.log(waysToWinProduct);

function distanceTraveled(pushBtnTime, totalTime) {
  return pushBtnTime * (totalTime - pushBtnTime);
};
