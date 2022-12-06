import { readFileSync } from "fs";

const testData = readFileSync("day-05.txt", "utf8").split("\n\n");

const stacksRaw = testData[0].split("\n");
const instructions = testData[1].split("\n");

const stackNames = stacksRaw.pop();

const getTransformedStacks = () => {
  let stacks = [[]];

  for (let i = 0; i < stacksRaw.length; i += 1) {
    for (let x = 0; x < stacksRaw[i].length; x += 1) {
      if (stacksRaw[i][x] === "]") {
        const stackIndex = stackNames[x - 1];

        if (stacks.length < stackIndex) {
          while (stacks.length < stackIndex) {
            stacks.push([]);
          }
        }

        stacks[stackIndex - 1].push(
          `${stacksRaw[i][x - 2]}${stacksRaw[i][x - 1]}${stacksRaw[i][x]}`
        );
      }
    }
  }

  return stacks;
};

const part1 = () => {
  let stacks = getTransformedStacks();

  const transformedInstructions = instructions.map((instruction) => {
    let numbers = [];
    instruction.split(" ").forEach((stringSegment) => {
      if (stringSegment.match(/^-?\d+$/)) {
        numbers.push(stringSegment);
      }
    });
    return numbers;
  });

  transformedInstructions.forEach(([numberToMove, from, to]) => {
    for (let i = 0; i < numberToMove; i += 1) {
      stacks[Number(to - 1)].unshift(stacks[Number(from - 1)].shift());
    }
  });

  return stacks.map((stack) => stack[0]);
};

const part2 = () => {
  let stacks = getTransformedStacks();

  const transformedInstructions = instructions.map((instruction) => {
    let numbers = [];
    instruction.split(" ").forEach((stringSegment) => {
      if (stringSegment.match(/^-?\d+$/)) {
        numbers.push(stringSegment);
      }
    });
    return numbers;
  });

  transformedInstructions.forEach(([numberToMove, from, to]) => {
    let itemsToMove = [];
    for (let i = 0; i < numberToMove; i += 1) {
      itemsToMove.push(stacks[Number(from - 1)].shift());
    }
    stacks[Number(to - 1)].unshift(...itemsToMove);
  });

  return stacks.map((stack) => stack[0]);
};

console.log(part1());
console.log(part2());
