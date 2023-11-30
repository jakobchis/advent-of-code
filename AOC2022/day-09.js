import { readFileSync } from "fs";

const testData = readFileSync("day-09.txt", "utf8").split("\n");

const areTouching = (headX, headY, tailX, tailY) => {
  return Math.abs(headX - tailX) < 2 && Math.abs(headY - tailY) < 2;
};

const part1 = () => {
  let visitedPositions = [[0, 0]];
  let tailPosition = { x: 0, y: 0 };
  let headPosition = { curr: { x: 0, y: 0 }, prev: { x: 0, y: 0 } };

  for (let i = 0; i < testData.length; i += 1) {
    const [direction, steps] = testData[i].split(" ");

    for (let s = 0; s < Number(steps); s += 1) {
      headPosition.prev.x = headPosition.curr.x;
      headPosition.prev.y = headPosition.curr.y;

      if (direction === "U") {
        headPosition.curr.y -= 1;
      } else if (direction === "D") {
        headPosition.curr.y += 1;
      } else if (direction === "L") {
        headPosition.curr.x -= 1;
      } else if (direction === "R") {
        headPosition.curr.x += 1;
      }

      if (
        !areTouching(
          headPosition.curr.x,
          headPosition.curr.y,
          tailPosition.x,
          tailPosition.y
        )
      ) {
        tailPosition.x = headPosition.prev.x;
        tailPosition.y = headPosition.prev.y;
        if (
          !visitedPositions.find(
            ([x, y]) => x === tailPosition.x && y === tailPosition.y
          )
        ) {
          visitedPositions.push([tailPosition.x, tailPosition.y]);
        }
      }
    }
  }

  return visitedPositions.length;
};

const part2 = () => {
  let visitedPositions = [[0, 0]];
  let ropeSegs = [];

  for (let r = 0; r < 10; r += 1) {
    ropeSegs.push({ x: 0, y: 0 });
  }

  for (let i = 0; i < testData.length; i += 1) {
    const [direction, steps] = testData[i].split(" ");

    for (let s = 0; s < Number(steps); s += 1) {
      if (direction === "U") {
        ropeSegs[ropeSegs.length - 1].y -= 1;
      } else if (direction === "D") {
        ropeSegs[ropeSegs.length - 1].y += 1;
      } else if (direction === "L") {
        ropeSegs[ropeSegs.length - 1].x -= 1;
      } else if (direction === "R") {
        ropeSegs[ropeSegs.length - 1].x += 1;
      }

      for (let r = ropeSegs.length - 1; r > 0; r -= 1) {
        if (
          !areTouching(
            ropeSegs[r].x,
            ropeSegs[r].y,
            ropeSegs[r - 1].x,
            ropeSegs[r - 1].y
          )
        ) {
          if (ropeSegs[r].x > ropeSegs[r - 1].x) {
            ropeSegs[r - 1].x += 1;
          } else if (ropeSegs[r].x < ropeSegs[r - 1].x) {
            ropeSegs[r - 1].x -= 1;
          }

          if (ropeSegs[r].y > ropeSegs[r - 1].y) {
            ropeSegs[r - 1].y += 1;
          } else if (ropeSegs[r].y < ropeSegs[r - 1].y) {
            ropeSegs[r - 1].y -= 1;
          }

          if (r - 1 === 0) {
            if (
              !visitedPositions.find(
                ([x, y]) => x === ropeSegs[r - 1].x && y === ropeSegs[r - 1].y
              )
            ) {
              visitedPositions.push([ropeSegs[r - 1].x, ropeSegs[r - 1].y]);
            }
          }
        }
      }
    }
  }

  return visitedPositions.length;
};

console.log(part1());
console.log(part2());
