import { readFileSync } from "fs";

const input = readFileSync("./day-02.txt", "utf8");

const part1 = () => {
  let sumInvalidIds = 0;

  for (const range of input.split(",")) {
    const [start, end] = range.split("-");
    for (let i = Number(start); i <= Number(end); i++) {
      const numToString = i.toString();
      if (numToString.length % 2 !== 0) {
        continue;
      }

      const left = numToString.slice(0, numToString.length / 2);
      const right = numToString.slice(numToString.length / 2);
      if (left === right) {
        sumInvalidIds += i;
      }
    }
  }

  return sumInvalidIds;
};

const part2 = () => {
  let sumInvalidIds = 0;

  for (const range of input.split(",")) {
    const [start, end] = range.split("-");
    for (let num = Number(start); num <= Number(end); num++) {
      const numToString = num.toString();

      for (
        let sliceIndex = 1;
        sliceIndex <= numToString.length / 2;
        sliceIndex++
      ) {
        const slice = numToString.slice(0, sliceIndex);
        const regex = new RegExp(`^(${slice})+$`);
        if (numToString.match(regex)) {
          sumInvalidIds += num;
          break;
        }
      }
    }
  }

  return sumInvalidIds;
};

console.log(part1());
console.log(part2());
