import { readFileSync } from "fs";

const testData = readFileSync("day-21.txt", "utf8")
  .split("\n")
  .reduce((acc, curr) => {
    const [name, firstNumber, operation, secondNumber] = curr.split(" ");

    return {
      ...acc,
      [name.replace(":", "")]: {
        firstNumber: firstNumber,
        operation: operation,
        secondNumber: secondNumber,
      },
    };
  }, {});

const part1 = () => {
  const recurseThroughMonkeys = (monkey) => {
    if (monkey.operation === undefined) {
      return Number(monkey.firstNumber);
    } else {
      const firstNumber = recurseThroughMonkeys(testData[monkey.firstNumber]);
      const secondNumber = recurseThroughMonkeys(testData[monkey.secondNumber]);

      if (monkey.operation === "+") {
        return firstNumber + secondNumber;
      } else if (monkey.operation === "*") {
        return firstNumber * secondNumber;
      } else if (monkey.operation === "-") {
        return firstNumber - secondNumber;
      } else if (monkey.operation === "/") {
        return firstNumber / secondNumber;
      }
    }
  };

  return recurseThroughMonkeys(testData["root"]);
};

const part2 = () => {
  const recurseThroughMonkeys = (monkeyName) => {
    const monkeyData = testData[monkeyName];

    if (monkeyData.operation === undefined) {
      return monkeyName === "humn" ? "x" : monkeyData.firstNumber;
    } else {
      const firstNumber = recurseThroughMonkeys(monkeyData.firstNumber);
      const secondNumber = recurseThroughMonkeys(monkeyData.secondNumber);

      return `(${firstNumber}${monkeyData.operation}${secondNumber})`;
    }
  };

  // meme solve, run this equation through MathPapa and then round down to nearest integer
  const equation = `${recurseThroughMonkeys(
    testData["root"].firstNumber
  )}=${recurseThroughMonkeys(testData["root"].secondNumber)}`;
  return equation;
};

console.log(part1());
console.log(part2());
