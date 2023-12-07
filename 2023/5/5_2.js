import input from './5_input.txt';

const mapNames = new Map();
let currentMap = null;

mapNames.set('seed-to-soil', []);
mapNames.set('soil-to-fertilizer', []);
mapNames.set('fertilizer-to-water', []);
mapNames.set('water-to-light', []);
mapNames.set('light-to-temperature', []);
mapNames.set('temperature-to-humidity', []);
mapNames.set('humidity-to-location', []);

const lines = input.split('\n');

const seedRangesNumbers = lines[0].substring(lines[0].indexOf(':') + 2).split(' ').map((n) => parseInt(n));
const seedRanges = [];

for (let i = 0; i < seedRangesNumbers.length; i += 2) {
  const seedRangeStart = seedRangesNumbers[i];
  const seedRange = seedRangesNumbers[i + 1] - 1;

  seedRanges.push([seedRangeStart, seedRangeStart + seedRange]);
}

for (const line of lines) {
  if (line === '') {
    continue;
  }

  if (/^(.*) map:/.test(line)) {
    const mapName = line.match(/^(.*) map:/)[1];
    currentMap = mapNames.get(mapName);
    continue;
  }

  if (currentMap) {
    const [destination, source, range] = line.split(' ').map((n) => parseInt(n));
    currentMap.push({ srcStart: source, srcEnd: source + range - 1, destination });
  }
}

const mapsArray = [...mapNames.values()];
let minLocation = Infinity;

for (const seedRange of seedRanges) {
  const locationRanges = seedRangeToLocationRanges(seedRange, mapsArray);

  for (const locationRange of locationRanges) {
    minLocation = Math.min(minLocation, locationRange[0]);
  }
}

console.log(minLocation);

function seedRangeToLocationRanges(seedRange, maps) {
  let currentSrcRanges = [seedRange];

  let i = 0;
  for (const map of maps) {
    const destinationRangesForCurrentMap = [];
    for (const srcRange of currentSrcRanges) {
      const destRanges = srcRangeToDestinationRanges(srcRange, map);
      destinationRangesForCurrentMap.push(...destRanges);
    }

    currentSrcRanges = destinationRangesForCurrentMap;
    i++;
  }

  const locationRanges = currentSrcRanges;

  return locationRanges;
}

function srcRangeToDestinationRanges(srcRange, map) {
  let dest = [];
  let sourceRanges = [srcRange];

  for (const mapping of map) {
    const newSourceRanges = [];
    for (const srcR of sourceRanges) {
      const srcRangeIntersect = rangeIntersect(srcR, [mapping.srcStart, mapping.srcEnd]);

      if (srcRangeIntersect) {
        const newDest = [srcRangeIntersect[0] - mapping.srcStart + mapping.destination, srcRangeIntersect[1] - mapping.srcStart + mapping.destination];
        dest.push(newDest);

        newSourceRanges.push(...subtractRange(srcR, srcRangeIntersect))
      }
      else {
        newSourceRanges.push(srcR);
      }
    }
    sourceRanges = newSourceRanges;
  }

  // Adding any ranges that have no matching destination
  dest.push(...sourceRanges);

  return dest;
}

// Precondition: r2 is in r1
function subtractRange(r1, r2) {
  return [[r1[0], r2[0] - 1], [r2[1] + 1, r1[1]]].filter((range) => isValidRange(range));
}

function isValidRange(range) {
  return range[1] >= range[0];
}

function rangeIntersect(r1, r2) {
  const intersect = [Math.max(r1[0], r2[0]), Math.min(r1[1], r2[1])];

  const [min, max] = intersect;

  if (isInRange(min, r1) && isInRange(max, r1) && isInRange(max, r1) && isInRange(max, r2)) {
    return intersect;
  }

  return null;
}

function isInRange(nb, range) {
  return nb >= range[0] && nb <= range[1];
}