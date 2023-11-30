import { readFileSync } from "fs";

const lines = readFileSync("day-08.txt", "utf8").split("\n");

const part1 = () => {
  const map = { 1: 2, 4: 4, 7: 3, 8: 7 };
  let count = 0;
  for (const line of lines) {
    const [_, outputValues] = line.split(" | ");
    for (const value of outputValues.split(" ")) {
      if (Object.values(map).includes(value.length)) {
        count += 1;
      }
    }
  }

  return count;
};

const part2 = () => {
  const getLetterIntersection = (firstString, secondString) => {
    return firstString
      .split("")
      .filter((letter) => secondString.split("").includes(letter)).length;
  };

  const map = { 1: "cf", 4: "bcdf", 7: "acf", 8: "abcdefg" };

  let finalSum = 0;

  for (const line of lines) {
    let [inputValues, outputValues] = line.split(" | ");
    inputValues = inputValues.split(" ").sort((a, b) => a.length - b.length);
    outputValues = outputValues.split(" ");

    for (const value of inputValues) {
      if (value.length === 2) {
        map[1] = value;
      } else if (value.length === 3) {
        map[7] = value;
      } else if (value.length === 4) {
        map[4] = value;
      } else if (value.length === 5) {
        if (getLetterIntersection(value, map[4]) === 2) {
          map[2] = value;
        } else if (getLetterIntersection(value, map[1]) === 2) {
          map[3] = value;
        } else {
          map[5] = value;
        }
      } else if (value.length === 6) {
        if (getLetterIntersection(value, map[1]) === 1) {
          map[6] = value;
        } else if (getLetterIntersection(value, map[4]) === 3) {
          map[0] = value;
        } else {
          map[9] = value;
        }
      } else if (value.length === 7) {
        map[8] = value;
      }
    }

    let digits = [];
    for (const value of outputValues) {
      const [digit, _] = Object.entries(map).find(([_, letters]) => {
        return (
          letters.split("").sort().join() === value.split("").sort().join()
        );
      });
      digits.push(digit);
    }

    finalSum += Number(digits.join(""));
  }

  return finalSum;
};

console.log(part1());
console.log(part2());
