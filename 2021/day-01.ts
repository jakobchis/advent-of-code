import { readFileSync } from "fs";

const measurements = readFileSync("day-01.txt", "utf8").split("\n");

const part1 = () => {
  let numOfIncreases = 0;
  measurements.forEach((measurement, index) => {
    if (measurements[index - 1]) {
      if (Number(measurement) > Number(measurements[index - 1])) {
        numOfIncreases += 1;
      }
    }
  });

  return numOfIncreases;
};

const part2 = () => {
  let numOfIncreases = 0;
  let currentSum = 0;
  for (let i = 0; i < measurements.length; i++) {
    if (i >= 3) {
      const previousSum = currentSum;

      currentSum -= Number(measurements[i - 3]);
      currentSum += Number(measurements[i]);

      if (currentSum > previousSum) {
        numOfIncreases += 1;
      }
    } else {
      currentSum += Number(measurements[i]);
    }
  }

  // measurements.forEach((measurement, index) => {
  //   if (index >= 3) {
  //     const prevThreeSum = measurements
  //       .slice(index - 3, index)
  //       .reduce((a, b) => Number(a) + Number(b), 0);
  //     const currThreeSum = measurements
  //       .slice(index - 2, index + 1)
  //       .reduce((a, b) => Number(a) + Number(b), 0);
  //     if (currThreeSum > prevThreeSum) {
  //       numOfIncreases += 1;
  //     }
  //   }
  // });

  return numOfIncreases;
};

console.log(part1());
console.log(part2());
