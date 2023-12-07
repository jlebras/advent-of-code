import input from './6_input.txt';

const [timeL, distL] = input.split('\n');
const time = parseInt(timeL.split(' ').filter((s) => !!s).slice(1).join(''));
const distanceToBeat = parseInt(distL.split(' ').filter((s) => !!s).slice(1).join(''));

let waysToWin = 0;

for (let t = 0; t <= time; t++) {
  const d = distanceTraveled(t, time);

  if (d > distanceToBeat) {
    waysToWin++;
  }
}

console.log(waysToWin);

function distanceTraveled(pushBtnTime, totalTime) {
  return pushBtnTime * (totalTime - pushBtnTime);
};
