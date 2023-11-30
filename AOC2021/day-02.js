import { readFileSync } from "fs";

const steps = readFileSync("day-02.txt", "utf8").split("\n");

const part1 = () => {
  let horizontalPosition = 0;
  let depth = 0;

  steps.forEach((step) => {
    const [direction, amount] = step.split(" ");
    if (direction === "forward") {
      horizontalPosition += Number(amount);
    } else if (direction === "down") {
      depth += Number(amount);
    } else if (direction === "up") {
      depth -= Number(amount);
    }
  });

  return horizontalPosition * depth;
};

const part2 = () => {
  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;

  steps.forEach((step) => {
    const [direction, amount] = step.split(" ");
    if (direction === "forward") {
      horizontalPosition += Number(amount);
      depth += aim * Number(amount);
    } else if (direction === "down") {
      aim += Number(amount);
    } else if (direction === "up") {
      aim -= Number(amount);
    }
  });

  return horizontalPosition * depth;
};

console.log(part1());
console.log(part2());
