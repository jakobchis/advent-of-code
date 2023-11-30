import { readFileSync } from "fs";

const crabPositions = readFileSync("day-07.txt", "utf8").split(",");

const part1 = () => {
  let finalCost = 0;

  for (let i = 0; i < Math.max(...crabPositions); i++) {
    const costsToMove = crabPositions.map((position) => {
      return Math.abs(Number(position) - i);
    });
    const totalCost = costsToMove.reduce((acc, curr) => {
      return acc + Number(curr);
    }, 0);

    if (finalCost === 0 || totalCost < finalCost) {
      finalCost = totalCost;
    }
  }

  return finalCost;
};

const part2 = () => {
  let finalCost = 0;

  for (let i = 0; i < Math.max(...crabPositions); i++) {
    const costsToMove = crabPositions.map((position) => {
      const diff = Math.abs(Number(position) - i);
      return (diff / 2) * (diff - diff + 1 + diff);
    });
    const totalCost = costsToMove.reduce((acc, curr) => {
      return acc + Number(curr);
    }, 0);

    if (finalCost === 0 || totalCost < finalCost) {
      finalCost = totalCost;
    }
  }

  return finalCost;
};

console.log(part1());
console.log(part2());
