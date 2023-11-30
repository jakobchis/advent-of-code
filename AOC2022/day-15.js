import { readFileSync } from "fs";

const testData = readFileSync("day-15.txt", "utf8")
  .split("\n")
  .map((line) => {
    const [sensor, beacon] = line.split(": ");
    return {
      sensor: {
        x: Number(sensor.split(" ")[2].split("=")[1].replace(",", "")),
        y: Number(sensor.split(" ")[3].split("=")[1]),
      },
      closestBeacon: {
        x: Number(beacon.split(" ")[4].split("=")[1].replace(",", "")),
        y: Number(beacon.split(" ")[5].split("=")[1]),
      },
    };
  });

const part1 = () => {
  testData.forEach(({ sensor, closestBeacon }) => {
    const manhattanDistance =
      Math.abs(sensor.x - closestBeacon.x) +
      Math.abs(sensor.y - closestBeacon.y);
    console.log({ sensor, manhattanDistance });

    // TODO: solve the puzzle
  });
};

console.log(part1());
