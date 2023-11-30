import { readFileSync } from "fs";

let inputs = readFileSync("day-10.txt", "utf8").split("\n");

const part1 = () => {
  let illegalCharPoints = 0;

  inputs.forEach((input) => {
    let stack = [];
    let firstIllegalChar = "";
    input.split("").forEach((character) => {
      if (firstIllegalChar) {
        return;
      }

      if (!stack.length) {
        stack.push(character);
        return;
      }

      const opener = stack[stack.length - 1];
      const closerMap = { "(": ")", "[": "]", "{": "}", "<": ">" };

      if (character === closerMap[opener]) {
        stack.pop();
      } else if (Object.values(closerMap).includes(character)) {
        firstIllegalChar = character;
      } else {
        stack.push(character);
      }
    });

    if (firstIllegalChar) {
      const pointsMap = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
      illegalCharPoints += pointsMap[firstIllegalChar];
    }
  });

  return illegalCharPoints;
};

const part2 = () => {
  let completionPoints = [];

  inputs.forEach((input) => {
    let stack = [];
    let foundIllegalChar = false;
    const closerMap = { "(": ")", "[": "]", "{": "}", "<": ">" };

    for (const character of input.split("")) {
      const opener = stack[stack.length - 1];

      if (Object.values(closerMap).includes(character)) {
        if (character === closerMap[opener]) {
          stack.pop();
        } else {
          foundIllegalChar = true;
        }
      } else {
        stack.push(character);
      }
    }

    if (!foundIllegalChar) {
      let completionString = [];

      while (stack.length) {
        const opener = stack[stack.length - 1];
        completionString.push(closerMap[opener]);
        stack.pop();
      }

      const completionPointsMap = { ")": 1, "]": 2, "}": 3, ">": 4 };
      let points = 0;
      completionString.forEach((character) => {
        points = points * 5 + completionPointsMap[character];
      });

      completionPoints.push(points);
    }
  });

  return completionPoints.sort((a, b) => a - b)[
    Math.floor(completionPoints.length / 2)
  ];
};

console.log(part1());
console.log(part2());
