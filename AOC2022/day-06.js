import { readFileSync } from "fs";

const testData = readFileSync("day-06.txt", "utf8");

const part1 = () => {
  let firstMarker = 0;

  for (let i = 0; i < testData.length; i += 1) {
    if (i >= 4) {
      const tempSet = new Set([
        testData[i],
        testData[i - 1],
        testData[i - 2],
        testData[i - 3],
      ]);
      if (tempSet.size === 4) {
        firstMarker = i + 1;
        break;
      }
    }
  }

  return firstMarker;
};

const part2 = () => {
  let firstMarker = 0;
  let tempArray = [];

  for (let i = 0; i < testData.length; i += 1) {
    const occurrance = tempArray.find((char) => char === testData[i]);
    if (!occurrance) {
      tempArray.push(testData[i]);
    } else {
      const indexOfOccurance = tempArray.indexOf(occurrance);
      tempArray = [
        ...tempArray.slice(indexOfOccurance + 1, tempArray.length),
        testData[i],
      ];
    }

    if (tempArray.length === 14) {
      firstMarker = i + 1;
      break;
    }
  }

  return firstMarker;
};

console.log(part1());
console.log(part2());
