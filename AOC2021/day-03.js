import { readFileSync } from "fs";

const binaries = readFileSync("day-03.txt", "utf8").split("\n");

const part1 = () => {
  const bitCount = {};

  binaries.forEach((binary) => {
    binary.split("").forEach((bit, index) => {
      const property = bit === "0" ? "zeroCount" : "oneCount";

      if (!bitCount[index]) {
        bitCount[index] = { oneCount: 0, zeroCount: 0 };
      }

      bitCount[index][property] += 1;
    });
  });

  const gammaRate = Object.values(bitCount).reduce((acc, count) => {
    if (count.zeroCount > count.oneCount) {
      return (acc += 0);
    }

    return (acc += 1);
  }, "");

  const epsilonRate = Object.values(bitCount).reduce((acc, count) => {
    if (count.zeroCount > count.oneCount) {
      return (acc += 1);
    }

    return (acc += 0);
  }, "");

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};

const part2 = () => {
  const getDigitToKeep = (binaries, index, type) => {
    const bitCount = { zeroCount: 0, oneCount: 0 };
    binaries.forEach((binary) => {
      const property = binary[index] === "0" ? "zeroCount" : "oneCount";
      bitCount[property] += 1;
    });

    if (type === "c02") {
      return bitCount.zeroCount > bitCount.oneCount ? "1" : "0";
    } else if (type === "oxygen") {
      return bitCount.zeroCount > bitCount.oneCount ? "0" : "1";
    }
  };

  const reduceToSingle = (binaries, index, type) => {
    const digitToKeep = getDigitToKeep(binaries, index, type);

    let binariesCopy = [...binaries];
    binaries.forEach((binary) => {
      if (binary[index] !== digitToKeep) {
        binariesCopy.splice(binariesCopy.indexOf(binary), 1);
      }
    });

    if (binariesCopy.length > 1) {
      return reduceToSingle(binariesCopy, index + 1, type);
    }

    return binariesCopy[0];
  };

  const oxygenRating = reduceToSingle(binaries, 0, "oxygen");
  const c02Rating = reduceToSingle(binaries, 0, "c02");

  return parseInt(oxygenRating, 2) * parseInt(c02Rating, 2);
};

console.log(part1());
console.log(part2());
