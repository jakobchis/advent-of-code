import { readFileSync } from "fs";
import lodash from "lodash";

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

const part1 = () => {
  return recurseThroughMonkeys(testData["root"]);
};

console.log(part1());
