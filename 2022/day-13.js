import { readFileSync } from "fs";

const testData = readFileSync("day-13.txt", "utf8").split("\n\n");

const recursiveIsPairRightOrder = (firstPair, secondPair) => {
  // 1 = right order
  // -1 = wrong order
  // 0 = inconclusive

  if (Number.isInteger(firstPair) && Number.isInteger(secondPair)) {
    if (firstPair < secondPair) {
      return 1;
    } else if (firstPair > secondPair) {
      return -1;
    } else {
      return 0;
    }
  } else if (Number.isInteger(firstPair) && Array.isArray(secondPair)) {
    return recursiveIsPairRightOrder([firstPair], secondPair);
  } else if (Array.isArray(firstPair) && Number.isInteger(secondPair)) {
    return recursiveIsPairRightOrder(firstPair, [secondPair]);
  } else {
    for (let i = 0; i < Math.min(firstPair.length, secondPair.length); i += 1) {
      const result = recursiveIsPairRightOrder(firstPair[i], secondPair[i]);

      if (result === 0) {
        continue;
      } else {
        return result;
      }
    }

    if (firstPair.length < secondPair.length) {
      return 1;
    } else if (firstPair.length > secondPair.length) {
      return -1;
    } else {
      return 0;
    }
  }
};

const part1 = () => {
  let pairsInRightOrder = [];

  testData.forEach((pair, index) => {
    let [firstPair, secondPair] = pair
      .split("\n")
      .map((pair) => JSON.parse(pair));

    if (recursiveIsPairRightOrder(firstPair, secondPair) !== -1) {
      pairsInRightOrder.push(index + 1);
    }
  });

  return pairsInRightOrder.reduce((acc, curr) => acc + curr, 0);
};

const part2 = () => {
  const firstDividerPacket = [[2]];
  const secondDividerPacket = [[6]];

  const transformedPackets = [
    ...testData.reduce(
      (acc, curr) => [
        ...acc,
        ...curr.split("\n").map((packet) => JSON.parse(packet)),
      ],
      []
    ),
    firstDividerPacket,
    secondDividerPacket,
  ];

  transformedPackets.sort(recursiveIsPairRightOrder).reverse();

  const firstDividerPacketIndex =
    transformedPackets.indexOf(firstDividerPacket) + 1;
  const secondDividerPacketIndex =
    transformedPackets.indexOf(secondDividerPacket) + 1;

  return firstDividerPacketIndex * secondDividerPacketIndex;
};

console.log(part1());
console.log(part2());
