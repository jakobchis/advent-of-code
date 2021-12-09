import { readFileSync } from "fs";

let heightMap = readFileSync("day-09.txt", "utf8").split("\n");
heightMap = heightMap.map((line) =>
  line.split("").map((string) => Number(string))
);

const part1 = () => {
  const checkIfLowPoint = (value, x, y) => {
    if (
      (heightMap[y]?.[x + 1] === undefined || value < heightMap[y]?.[x + 1]) &&
      (heightMap[y]?.[x - 1] === undefined || value < heightMap[y]?.[x - 1]) &&
      (heightMap[y + 1]?.[x] === undefined || value < heightMap[y + 1]?.[x]) &&
      (heightMap[y - 1]?.[x] === undefined || value < heightMap[y - 1]?.[x])
    ) {
      return true;
    }
    return false;
  };

  let sum = 0;
  heightMap.forEach((line, y) => {
    line.forEach((point, x) => {
      if (checkIfLowPoint(point, x, y)) {
        sum += 1 + point;
      }
    });
  });

  return sum;
};

const part2 = () => {
  const getBasin = (basinPoints, x, y) => {
    const pointString = x.toString() + y.toString();

    if (
      y < 0 ||
      y >= heightMap.length ||
      x < 0 ||
      x >= heightMap[0].length ||
      heightMap[y][x] === 9 ||
      basinPoints.includes(pointString)
    ) {
      return;
    }

    basinPoints.push(pointString);

    getBasin(basinPoints, x - 1, y);
    getBasin(basinPoints, x + 1, y);
    getBasin(basinPoints, x, y - 1);
    getBasin(basinPoints, x, y + 1);

    return basinPoints;
  };

  const checkIfLowPoint = (value, x, y) => {
    if (
      (heightMap[y]?.[x + 1] === undefined || value < heightMap[y]?.[x + 1]) &&
      (heightMap[y]?.[x - 1] === undefined || value < heightMap[y]?.[x - 1]) &&
      (heightMap[y + 1]?.[x] === undefined || value < heightMap[y + 1]?.[x]) &&
      (heightMap[y - 1]?.[x] === undefined || value < heightMap[y - 1]?.[x])
    ) {
      return true;
    }
    return false;
  };

  let basinSizes = [];
  heightMap.forEach((line, y) => {
    line.forEach((point, x) => {
      if (checkIfLowPoint(point, x, y)) {
        basinSizes.push(getBasin([], x, y).length);
      }
    });
  });

  basinSizes.sort((a, b) => b - a);
  return basinSizes[0] * basinSizes[1] * basinSizes[2];
};

console.log(part1());
console.log(part2());
