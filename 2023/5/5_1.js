import input from './5_input.txt';

const seedToSoil = [];
const soilToFertilizer = [];
const fertilizerToWater = [];
const waterToLight = [];
const lightToTemperature = [];
const temperatureToHumidity = [];
const humidityToLocation = [];
const mapNames = new Map();
let currentMap = null;

mapNames.set('seed-to-soil', seedToSoil);
mapNames.set('soil-to-fertilizer', soilToFertilizer);
mapNames.set('fertilizer-to-water', fertilizerToWater);
mapNames.set('water-to-light', waterToLight);
mapNames.set('light-to-temperature', lightToTemperature);
mapNames.set('temperature-to-humidity', temperatureToHumidity);
mapNames.set('humidity-to-location', humidityToLocation);

const lines = input.split('\n');

const seeds = lines[0].substring(lines[0].indexOf(':') + 2).split(' ').map((n) => parseInt(n));

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

for (const seed of seeds) {
  const location = seedToLocation(seed, mapsArray);
  minLocation = Math.min(minLocation, location);
}

console.log(minLocation);

function seedToLocation(seed, maps) {
  let currentSrc = seed;

  for (const map of maps) {
    const destination = srcToDestination(currentSrc, map);
    currentSrc = destination;
  }

  const location = currentSrc;

  return location;
}

function srcToDestination(src, map) {
  let dest;

  for (const mapping of map) {
    if (src >= mapping.srcStart && src <= mapping.srcEnd) {
      dest = mapping.destination + src - mapping.srcStart;
      return dest;
    }
  }

  dest = src;

  return dest;
}