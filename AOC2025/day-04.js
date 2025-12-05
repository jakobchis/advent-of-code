import { readFileSync } from "fs";

const input = readFileSync("./day-04.txt", "utf8");

const part1 = () => {
  const grid = input.split("\n").map((row) => row.split(""));
  let accessibleRolls = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === ".") {
        continue;
      }

      let adjacentRolls = 0;
      const adjacentCoords = [
        [y - 1, x - 1],
        [y - 1, x],
        [y - 1, x + 1],
        [y, x - 1],
        [y, x + 1],
        [y + 1, x - 1],
        [y + 1, x],
        [y + 1, x + 1],
      ];
      for (const [y, x] of adjacentCoords) {
        if (grid[y]?.[x] === "@") {
          adjacentRolls += 1;
        }
      }

      if (adjacentRolls < 4) {
        accessibleRolls += 1;
      }
    }
  }

  return accessibleRolls;
};

const part2 = () => {
  const grid = input.split("\n").map((row) => row.split(""));
  let atSymbolCoords = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "@") {
        atSymbolCoords.push([y, x]);
      }
    }
  }

  let running = true;
  let numRollsRemoved = 0;
  while (running) {
    running = false;
    let coordsToRemove = [];

    for (let i = 0; i < atSymbolCoords.length; i++) {
      const [y, x] = atSymbolCoords[i];
      let adjacentRolls = 0;
      const adjacentCoords = [
        [y - 1, x - 1],
        [y - 1, x],
        [y - 1, x + 1],
        [y, x - 1],
        [y, x + 1],
        [y + 1, x - 1],
        [y + 1, x],
        [y + 1, x + 1],
      ];
      for (const [y, x] of adjacentCoords) {
        if (grid[y]?.[x] === "@") {
          adjacentRolls += 1;
        }
      }

      if (adjacentRolls < 4) {
        coordsToRemove.push([y, x]);
        running = true;
      }
    }

    for (const [y, x] of coordsToRemove) {
      const index = atSymbolCoords.findIndex(
        (coord) => coord[0] === y && coord[1] === x
      );
      atSymbolCoords.splice(index, 1);
      grid[y][x] = "x";
      numRollsRemoved += 1;
    }
  }

  return numRollsRemoved;
};

console.log(part1());
console.log(part2());
