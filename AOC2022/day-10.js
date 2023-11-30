import { readFileSync } from "fs";

const testData = readFileSync("day-10.txt", "utf8").split("\n");

const part1 = () => {
  let xVal = 1;
  let cycleCount = 1;
  let signalStrength = 0;

  const incrementCycle = () => {
    cycleCount += 1;
    if (cycleCount % 40 === 20) {
      signalStrength += cycleCount * xVal;
    }
  };

  for (let i = 0; i < testData.length; i += 1) {
    const [instruction, amount] = testData[i].split(" ");

    if (instruction.includes("addx")) {
      incrementCycle();
      xVal += Number(amount);
      incrementCycle();
    } else {
      incrementCycle();
    }
  }

  return signalStrength;
};

const part2 = () => {
  let crtOutput = new Array(6).fill(null).map(() => new Array(40).fill("."));

  let xVal = 1;
  let cycleCount = 1;
  let drawRow = 0;
  let drawCol = 0;

  const printCrt = () => {
    crtOutput.forEach((row) => {
      console.log(row.join(""));
    });
  };

  const incrementCycle = () => {
    if ([xVal - 1, xVal, xVal + 1].includes(drawCol)) {
      crtOutput[drawRow][drawCol] = "#";
    }

    if (cycleCount % 40 === 0) {
      drawRow += 1;
      drawCol = 0;
    } else {
      drawCol += 1;
    }

    cycleCount += 1;
  };

  for (let i = 0; i < testData.length; i += 1) {
    const [instruction, amount] = testData[i].split(" ");

    if (instruction.includes("addx")) {
      incrementCycle();
      incrementCycle();
      xVal += Number(amount);
    } else {
      incrementCycle();
    }
  }

  printCrt();
};

console.log(part1());
console.log(part2());
