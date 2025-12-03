import { readFileSync } from "fs";

const input = readFileSync("./day-03.txt", "utf8");

const part1 = () => {
  const batteryBanks = input.split("\n");
  const maxJoltages = [];

  for (const batteryBank of batteryBanks) {
    // Sort but exclude last number because it can't be a starting digit
    const sortedBatteryBank = Array.from(
      batteryBank.slice(0, batteryBank.length - 1)
    )
      .sort()
      .reverse();
    const leftMax = sortedBatteryBank[0];
    const leftMaxIndex = batteryBank.indexOf(leftMax);

    let rightMax = 0;
    for (let i = leftMaxIndex + 1; i < batteryBank.length; i++) {
      if (batteryBank[i] > rightMax) rightMax = batteryBank[i];
    }

    maxJoltages.push(Number(`${leftMax}${rightMax}`));
  }

  return maxJoltages.reduce((acc, curr) => (acc += curr), 0);
};

const part2 = () => {
  const batteryBanks = input
    .split("\n")
    .map((bank) => bank.split("").map((n) => Number(n)));
  const maxJoltages = [];

  for (const batteryBank of batteryBanks) {
    let maxJoltage = "";

    for (let i = 0; i < batteryBank.length; i++) {
      if (maxJoltage.length === 12) {
        break;
      }

      // Only consider digits to the right that have enough following digits to fill in the rest of the maxJoltage
      const remainingDigitsNeeded = 12 - maxJoltage.length;
      const slice = batteryBank.slice(
        i + 1,
        batteryBank.length - remainingDigitsNeeded + 1
      );
      const greaterNum = slice.find((n) => n > batteryBank[i]);

      // If there is a greater digit to the right, don't add this digit to maxJoltage
      if (greaterNum) {
        continue;
      }

      maxJoltage += batteryBank[i];
    }

    maxJoltages.push(Number(maxJoltage));
  }

  return maxJoltages.reduce((acc, curr) => (acc += curr), 0);
};

console.log(part1());
console.log(part2());
