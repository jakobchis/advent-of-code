import { readFileSync } from "fs";

const testData = readFileSync("day-11.txt", "utf8").split("\n\n");

const getMonkeys = () => {
  let monkeys = [];
  testData.forEach((data) => {
    const [
      monkeyName,
      startingItems,
      operation,
      testDivisibleBy,
      trueThrowToMonkey,
      falseThrowToMonkey,
    ] = data.split("\n");
    let newOperation = {};
    if (operation.includes("*")) {
      newOperation = {
        type: "multiply",
        value: operation.split("* ")[1],
      };
    } else if (operation.includes("+")) {
      newOperation = {
        type: "add",
        value: operation.split("+ ")[1],
      };
    }

    monkeys.push({
      startingItems: startingItems.split(": ")[1].split(", ").map(Number),
      operation: newOperation,
      testDivisibleBy: Number(
        testDivisibleBy.split(" ")[testDivisibleBy.split(" ").length - 1]
      ),
      trueThrowToMonkey: Number(
        trueThrowToMonkey.split(" ")[trueThrowToMonkey.split(" ").length - 1]
      ),
      falseThrowToMonkey: Number(
        falseThrowToMonkey.split(" ")[falseThrowToMonkey.split(" ").length - 1]
      ),
      timesInspected: 0,
    });
  });

  return monkeys;
};

const part1 = () => {
  let monkeys = getMonkeys();

  for (let i = 0; i < 20; i += 1) {
    for (let x = 0; x < monkeys.length; x += 1) {
      let timesInspectedTemp = 0;
      for (let y = 0; y < monkeys[x].startingItems.length; y += 1) {
        let newWorryLevel = 0;
        let value =
          monkeys[x].operation.value === "old"
            ? monkeys[x].startingItems[y]
            : Number(monkeys[x].operation.value);

        if (monkeys[x].operation.type === "multiply") {
          newWorryLevel = monkeys[x].startingItems[y] * value;
        } else if (monkeys[x].operation.type === "add") {
          newWorryLevel = monkeys[x].startingItems[y] + value;
        }

        newWorryLevel = Math.floor(newWorryLevel / 3);

        if (newWorryLevel % monkeys[x].testDivisibleBy === 0) {
          monkeys[monkeys[x].trueThrowToMonkey].startingItems.push(
            newWorryLevel
          );
        } else {
          monkeys[monkeys[x].falseThrowToMonkey].startingItems.push(
            newWorryLevel
          );
        }

        timesInspectedTemp += 1;
      }

      monkeys[x].timesInspected += timesInspectedTemp;
      for (let y = 0; y < timesInspectedTemp; y += 1) {
        monkeys[x].startingItems.shift();
      }
    }
  }

  const sortedMonkeys = monkeys
    .map((monkey) => monkey.timesInspected)
    .sort((a, b) => b - a);

  return sortedMonkeys[0] * sortedMonkeys[1];
};

const part2 = () => {
  let monkeys = getMonkeys();

  for (let i = 0; i < 10000; i += 1) {
    for (let x = 0; x < monkeys.length; x += 1) {
      let timesInspectedTemp = 0;
      for (let y = 0; y < monkeys[x].startingItems.length; y += 1) {
        let newWorryLevel = BigInt(0);
        let value =
          monkeys[x].operation.value === "old"
            ? monkeys[x].startingItems[y]
            : Number(monkeys[x].operation.value);

        if (monkeys[x].operation.type === "multiply") {
          newWorryLevel = monkeys[x].startingItems[y] * value;
        } else if (monkeys[x].operation.type === "add") {
          newWorryLevel = monkeys[x].startingItems[y] + value;
        }

        // magic lowest common multiple
        newWorryLevel %= 9699690;

        if (newWorryLevel % monkeys[x].testDivisibleBy === 0) {
          monkeys[monkeys[x].trueThrowToMonkey].startingItems.push(
            newWorryLevel
          );
        } else {
          monkeys[monkeys[x].falseThrowToMonkey].startingItems.push(
            newWorryLevel
          );
        }

        timesInspectedTemp += 1;
      }

      monkeys[x].timesInspected += timesInspectedTemp;
      for (let y = 0; y < timesInspectedTemp; y += 1) {
        monkeys[x].startingItems.shift();
      }
    }
  }

  const sortedMonkeys = monkeys
    .map((monkey) => monkey.timesInspected)
    .sort((a, b) => b - a);

  return sortedMonkeys[0] * sortedMonkeys[1];
};

console.log(part1());
console.log(part2());
