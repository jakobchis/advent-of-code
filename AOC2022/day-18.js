import { readFileSync } from "fs";
import lodash from "lodash";

const testData = readFileSync("day-18.txt", "utf8")
  .split("\n")
  .map((cube) => cube);

const grid = new Set(testData);

const getConnectedCubes = (position) => {
  let coords = new Set();

  coords.add([position[0] + 1, position[1], position[2]].join(","));
  coords.add([position[0] - 1, position[1], position[2]].join(","));
  coords.add([position[0], position[1] + 1, position[2]].join(","));
  coords.add([position[0], position[1] - 1, position[2]].join(","));
  coords.add([position[0], position[1], position[2] + 1].join(","));
  coords.add([position[0], position[1], position[2] - 1].join(","));

  return coords;
};

const part1 = () => {
  let surfaceArea = 0;

  grid.forEach((cube) => {
    const connectedCubes = getConnectedCubes(cube.split(",").map(Number));
    connectedCubes.forEach((connectedCube) => {
      if (!grid.has(connectedCube)) {
        surfaceArea += 1;
      }
    });
  });

  return surfaceArea;
};

console.log(part1());
