import { readFileSync } from "fs";

const lanternfish = readFileSync("day-06.txt", "utf8").split(",");

const sharedCode = (numDays) => {
  const numFishRange = 8;
  let counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
  lanternfish.forEach((fish) => {
    counts[fish] += 1;
  });

  for (let i = 0; i < numDays; i++) {
    let zeroCount;

    for (let n = 0; n <= numFishRange; n++) {
      if (n === 0) {
        zeroCount = counts[n];
        counts[n] -= counts[n];
      } else {
        counts[n - 1] += counts[n];
        counts[n] -= counts[n];
      }
    }

    counts[6] += zeroCount;
    counts[8] += zeroCount;
  }

  return Object.values(counts).reduce((acc, curr) => acc + curr, 0);
};

const part1 = () => {
  return sharedCode(80);
};

const part2 = () => {
  return sharedCode(256);
};

console.log(part1());
console.log(part2());
