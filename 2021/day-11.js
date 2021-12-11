import { readFileSync } from "fs";

const inputs = readFileSync("day-11.txt", "utf8").split("\n");

const flashStep = (inputs, flashes, x, y) => {
  if (y < 0 || y >= inputs.length || x < 0 || x >= inputs[0].length) {
    return;
  }

  if (!flashes.includes([x, y].toString())) {
    inputs[y][x] += 1;
  }

  if (inputs[y][x] > 9) {
    flashes.push([x, y].toString());
    inputs[y][x] = 0;
    flashStep(inputs, flashes, x - 1, y - 1);
    flashStep(inputs, flashes, x - 1, y);
    flashStep(inputs, flashes, x - 1, y + 1);
    flashStep(inputs, flashes, x, y - 1);
    flashStep(inputs, flashes, x, y + 1);
    flashStep(inputs, flashes, x + 1, y - 1);
    flashStep(inputs, flashes, x + 1, y);
    flashStep(inputs, flashes, x + 1, y + 1);
  }
};

const part1 = () => {
  const numToSimulate = 100;
  let inputsCopy = inputs.map((line) =>
    line.split("").map((string) => Number(string))
  );
  let flashCount = 0;

  for (let i = 0; i < numToSimulate; i++) {
    let flashes = [];
    inputsCopy.forEach((line, y) => {
      line.forEach((_, x) => {
        flashStep(inputsCopy, flashes, x, y);
      });
    });

    flashCount += flashes.length;
  }

  return flashCount;
};

const part2 = () => {
  const numToSimulate = 99999;
  let inputsCopy = inputs.map((line) =>
    line.split("").map((string) => Number(string))
  );
  let firstAllSyncStep = null;

  for (let i = 0; i < numToSimulate; i++) {
    let flashes = [];
    inputsCopy.forEach((line, y) => {
      line.forEach((_, x) => {
        flashStep(inputsCopy, flashes, x, y);
      });
    });

    if (flashes.length === inputs[0].length * inputs.length) {
      firstAllSyncStep = i + 1;
      break;
    }
  }

  return firstAllSyncStep;
};

console.log(`Part 1 answer: ${part1()}`);
console.log(`Part 2 answer: ${part2()}`);
