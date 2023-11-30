import { readFileSync } from "fs";

const testData = readFileSync("day-04.txt", "utf8")
  .split("\n")
  .map((pair) => {
    return pair.split(",");
  });

const part1 = () => {
  let numPairs = 0;

  testData.forEach(([firstElf, secondElf]) => {
    const [firstElfFirstNum, firstElfSecondNum] = firstElf
      .split("-")
      .map((string) => Number(string));
    const [secondElfFirstNum, secondElfSecondNum] = secondElf
      .split("-")
      .map((string) => Number(string));

    if (
      (secondElfFirstNum >= firstElfFirstNum &&
        secondElfSecondNum <= firstElfSecondNum) ||
      (firstElfFirstNum >= secondElfFirstNum &&
        firstElfSecondNum <= secondElfSecondNum)
    ) {
      numPairs += 1;
    }
  });

  return numPairs;
};

const part2 = () => {
  let numPairs = 0;

  testData.forEach(([firstElf, secondElf]) => {
    const [firstElfFirstNum, firstElfSecondNum] = firstElf
      .split("-")
      .map((string) => Number(string));
    const firstElfRange = Array.from(
      new Array(firstElfSecondNum - firstElfFirstNum + 1),
      (_, index) => index + firstElfFirstNum
    );

    const [secondElfFirstNum, secondElfSecondNum] = secondElf
      .split("-")
      .map((string) => Number(string));
    const secondElfRange = Array.from(
      new Array(secondElfSecondNum - secondElfFirstNum + 1),
      (_, index) => index + secondElfFirstNum
    );

    if (firstElfRange.some((number) => secondElfRange.includes(number))) {
      numPairs += 1;
    }
  });

  return numPairs;
};

console.log(part1());
console.log(part2());
