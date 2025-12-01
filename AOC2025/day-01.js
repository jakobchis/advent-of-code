import { readFileSync } from "fs";

const input = readFileSync("./day-01.txt", "utf8").split("\n");

const part1 = () => {
  let numPointAt0 = 0;
  let dialCurr = 50;

  for (const line of input) {
    const direction = line[0];
    const rotation = line.slice(1);

    // TODO refactor this into a single math operation

    for (let i = 0; i < Number(rotation); i++) {
      if (direction === "L") {
        dialCurr -= 1;
        if (dialCurr === -1) {
          dialCurr = 99;
        }
      } else if (direction === "R") {
        dialCurr += 1;
        if (dialCurr === 100) {
          dialCurr = 0;
        }
      }
    }

    if (dialCurr === 0) {
      numPointAt0 += 1;
    }
  }

  return numPointAt0;
};

const part2 = () => {
  let numPointAt0 = 0;
  let dialCurr = 50;

  for (const line of input) {
    const direction = line[0];
    const rotation = line.slice(1);

    for (let i = 0; i < Number(rotation); i++) {
      if (direction === "L") {
        dialCurr -= 1;
        if (dialCurr === -1) {
          dialCurr = 99;
        }
      } else if (direction === "R") {
        dialCurr += 1;
        if (dialCurr === 100) {
          dialCurr = 0;
        }
      }
      if (dialCurr === 0) {
        numPointAt0 += 1;
      }
    }
  }

  return numPointAt0;
};

console.log(part1());
console.log(part2());
