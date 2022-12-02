import { readFileSync } from "fs";

const testData = readFileSync("day-01.txt", "utf8")
  .split("\n\n")
  .map((elfGroup) => elfGroup.split("\n"));

const part1 = () => {
  let mostCalories = 0;

  testData.forEach((elfGroup) => {
    const elfCalories = elfGroup.reduce(
      (acc, curr) => (acc += Number(curr)),
      0
    );

    if (elfCalories > mostCalories) {
      mostCalories = elfCalories;
    }
  });

  return mostCalories;
};

const part2 = () => {
  let mostCalories = [0, 0, 0];

  testData.forEach((elfGroup) => {
    mostCalories.sort((a, b) => a - b);

    const elfCalories = elfGroup.reduce(
      (acc, curr) => (acc += Number(curr)),
      0
    );

    if (elfCalories > mostCalories[0]) {
      mostCalories[0] = elfCalories;
    }
  });

  return mostCalories.reduce((acc, curr) => (acc += curr), 0);
};

console.log(part1());
console.log(part2());
