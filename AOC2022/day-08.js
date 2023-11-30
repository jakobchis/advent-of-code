import { readFileSync } from "fs";

const testData = readFileSync("day-08.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

const part1 = () => {
  let visibleTrees = 0;

  for (let i = 0; i < testData.length; i += 1) {
    for (let x = 0; x < testData[i].length; x += 1) {
      let stepping = true;
      let counter = 1;
      let checkingUp = true;
      let checkingDown = true;
      let checkingLeft = true;
      let checkingRight = true;

      while (stepping) {
        if (checkingUp) {
          if (testData[i - counter] === undefined) {
            visibleTrees += 1;
            stepping = false;
            continue;
          } else if (testData[i - counter][x] >= testData[i][x]) {
            checkingUp = false;
          }
        }
        if (checkingDown) {
          if (testData[i + counter] === undefined) {
            visibleTrees += 1;
            stepping = false;
            continue;
          } else if (testData[i + counter][x] >= testData[i][x]) {
            checkingDown = false;
          }
        }
        if (checkingLeft) {
          if (testData[i][x - counter] === undefined) {
            visibleTrees += 1;
            stepping = false;
            continue;
          } else if (testData[i][x - counter] >= testData[i][x]) {
            checkingLeft = false;
          }
        }
        if (checkingRight) {
          if (testData[i][x + counter] === undefined) {
            visibleTrees += 1;
            stepping = false;
            continue;
          } else if (testData[i][x + counter] >= testData[i][x]) {
            checkingRight = false;
          }
        }

        if (checkingUp || checkingDown || checkingLeft || checkingRight) {
          counter += 1;
          continue;
        }

        stepping = false;
      }
    }
  }

  return visibleTrees;
};

const part2 = () => {
  let highestScenicScore = 0;

  for (let i = 0; i < testData.length; i += 1) {
    for (let x = 0; x < testData[i].length; x += 1) {
      let stepping = true;
      let counter = 1;
      let checkingUp = true;
      let checkingDown = true;
      let checkingLeft = true;
      let checkingRight = true;
      let scenicScore = { up: 0, down: 0, left: 0, right: 0 };

      while (stepping) {
        if (checkingUp) {
          if (testData[i - counter] === undefined) {
            checkingUp = false;
          } else if (testData[i - counter][x] < testData[i][x]) {
            scenicScore.up += 1;
          } else if (testData[i - counter][x] >= testData[i][x]) {
            scenicScore.up += 1;
            checkingUp = false;
          }
        }
        if (checkingDown) {
          if (testData[i + counter] === undefined) {
            checkingDown = false;
          } else if (testData[i + counter][x] < testData[i][x]) {
            scenicScore.down += 1;
          } else if (testData[i + counter][x] >= testData[i][x]) {
            scenicScore.down += 1;
            checkingDown = false;
          }
        }
        if (checkingLeft) {
          if (testData[i][x - counter] === undefined) {
            checkingLeft = false;
          } else if (testData[i][x - counter] < testData[i][x]) {
            scenicScore.left += 1;
          } else if (testData[i][x - counter] >= testData[i][x]) {
            scenicScore.left += 1;
            checkingLeft = false;
          }
        }
        if (checkingRight) {
          if (testData[i][x + counter] === undefined) {
            checkingRight = false;
          } else if (testData[i][x + counter] < testData[i][x]) {
            scenicScore.right += 1;
          } else if (testData[i][x + counter] >= testData[i][x]) {
            scenicScore.right += 1;
            checkingRight = false;
          }
        }

        if (checkingUp || checkingDown || checkingLeft || checkingRight) {
          counter += 1;
          continue;
        }

        const scenicScoreTotal = Object.values(scenicScore).reduce(
          (acc, curr) => acc * curr,
          1
        );
        if (scenicScoreTotal > highestScenicScore) {
          highestScenicScore = scenicScoreTotal;
        }

        stepping = false;
      }
    }
  }

  return highestScenicScore;
};

console.log(part1());
console.log(part2());
