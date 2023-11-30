import { readFileSync } from "fs";
import lodash from "lodash";

const testData = readFileSync("day-17.txt", "utf8").split("");

// rocks start 2 units from the left, 3 units up from the highest rock or floor
const rockMap = {
  1: [
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
  ],
  2: [
    [0, 3],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 3],
  ],
  3: [
    [0, 4],
    [1, 4],
    [2, 2],
    [2, 3],
    [2, 4],
  ],
  4: [
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
  ],
  5: [
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
  ],
};

const isCollisionDetected = (previousPosition, newPosition, grid) => {
  if (
    newPosition.some(
      (coord) => coord[0] === grid.length || coord[1] === 7 || coord[1] === -1
    )
  ) {
    return true;
  }

  for (const newCoord of newPosition) {
    if (
      !previousPosition.some((prevCoord) =>
        lodash.isEqual(prevCoord, newCoord)
      ) &&
      grid[newCoord[0]][newCoord[1]] === "#"
    ) {
      return true;
    }
  }
};

const printGrid = (grid) => {
  grid.forEach((row, index) => console.log(`${row.join("")}${index}`));
  console.log("");
};

const getTallestRockRowFromStart = (grid) => {
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      if (grid[y][x] === "#") {
        return y;
      }
    }
  }
};

const part1 = () => {
  const grid = new Array(4).fill(null).map(() => new Array(7).fill("."));

  let rockCounter = 1;
  let jetStreamCounter = 0;

  for (let i = 0; i < 2022; i += 1) {
    let rock = lodash.cloneDeep(rockMap[rockCounter]);
    let running = true;
    let rockIterationCounter = 0;

    while (running) {
      rock.forEach((coord) => {
        grid[coord[0]][coord[1]] = "#";
      });

      if (rockIterationCounter % 2 === 0) {
        if (testData[jetStreamCounter] === ">") {
          const newPosition = rock.map((coord) => [coord[0], coord[1] + 1]);

          if (!isCollisionDetected(rock, newPosition, grid)) {
            rock.forEach((coord) => {
              grid[coord[0]][coord[1]] = ".";
            });
            rock = newPosition;
          }
        } else if (testData[jetStreamCounter] === "<") {
          const newPosition = rock.map((coord) => [coord[0], coord[1] - 1]);

          if (!isCollisionDetected(rock, newPosition, grid)) {
            rock.forEach((coord) => {
              grid[coord[0]][coord[1]] = ".";
            });
            rock = newPosition;
          }
        }

        jetStreamCounter =
          jetStreamCounter === testData.length - 1 ? 0 : jetStreamCounter + 1;
      } else {
        const newPosition = rock.map((coord) => [coord[0] + 1, coord[1]]);

        if (!isCollisionDetected(rock, newPosition, grid)) {
          rock.forEach((coord) => {
            grid[coord[0]][coord[1]] = ".";
          });
          rock = newPosition;
        } else {
          running = false;
        }
      }

      rockIterationCounter += 1;
    }

    rockCounter = rockCounter === 5 ? 1 : rockCounter + 1;

    const nextRockHeight =
      rockMap[rockCounter][rockMap[rockCounter].length - 1][0] -
      rockMap[rockCounter][0][0] +
      1;

    if (getTallestRockRowFromStart(grid) < nextRockHeight + 3) {
      while (getTallestRockRowFromStart(grid) < nextRockHeight + 3) {
        grid.unshift(new Array(7).fill("."));
      }
    } else if (getTallestRockRowFromStart(grid) > nextRockHeight + 3) {
      while (getTallestRockRowFromStart(grid) > nextRockHeight + 3) {
        grid.shift();
      }
    }
  }

  printGrid(grid);
  return grid.length - getTallestRockRowFromStart(grid);
};

console.log(part1());
