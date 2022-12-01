import { readFileSync } from "fs";

const testData = readFileSync("day-01.txt", "utf8")
  .split("\n\n")
  .map((elfGroup) => elfGroup.split("\n"));

const getElfWithMostCalories = () => {
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

const getTop3ElvesWithMostCalories = () => {
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

console.log(getElfWithMostCalories());
console.log(getTop3ElvesWithMostCalories());
