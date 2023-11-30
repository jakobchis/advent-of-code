import { readFileSync } from "fs";

const testData = readFileSync("day-03.txt", "utf8")
  .split("\n")
  .map((rucksack) => {
    return [
      rucksack.substr(0, rucksack.length / 2),
      rucksack.substr(rucksack.length / 2),
    ];
  });

const part1 = () => {
  let totalPriority = 0;

  testData.forEach((rucksack) => {
    const firstCompartment = rucksack[0].split("");
    const secondCompartment = rucksack[1].split("");

    for (let i = 0; i < firstCompartment.length; i += 1) {
      if (secondCompartment.includes(firstCompartment[i])) {
        const charCode = firstCompartment[i].charCodeAt(0);

        if (firstCompartment[i].toUpperCase() === firstCompartment[i]) {
          totalPriority += charCode - 38;
        } else {
          totalPriority += charCode - 96;
        }

        break;
      }
    }
  });

  return totalPriority;
};

const part2 = () => {
  let totalPriority = 0;

  for (let x = 0; x < testData.length; x += 3) {
    const firstRucksack = testData[x].join("").split("");
    const secondRucksack = testData[x + 1].join("").split("");
    const thirdRucksack = testData[x + 2].join("").split("");

    for (let i = 0; i < firstRucksack.length; i += 1) {
      if (
        secondRucksack.includes(firstRucksack[i]) &&
        thirdRucksack.includes(firstRucksack[i])
      ) {
        const charCode = firstRucksack[i].charCodeAt(0);

        if (firstRucksack[i].toUpperCase() === firstRucksack[i]) {
          totalPriority += charCode - 38;
        } else {
          totalPriority += charCode - 96;
        }

        break;
      }
    }
  }

  return totalPriority;
};

console.log(part1());
console.log(part2());
