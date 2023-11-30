import { readFileSync } from "fs";

const testData = readFileSync("day-14.txt", "utf8").split("\n");

const getRocksSet = () => {
  const rocksSet = new Set();

  testData.forEach((rock) => {
    const rockCoords = rock
      .split(" -> ")
      .map((coord) => coord.split(",").map(Number));

    for (let i = 0; i < rockCoords.length - 1; i += 1) {
      const startX = rockCoords[i][0];
      const finishX = rockCoords[i + 1][0];
      const startY = rockCoords[i][1];
      const finishY = rockCoords[i + 1][1];

      if (startX !== finishX) {
        for (
          let x = Math.min(startX, finishX);
          x <= Math.max(startX, finishX);
          x += 1
        ) {
          rocksSet.add(`${x}-${startY}`);
        }
      } else if (startY !== finishY) {
        for (
          let y = Math.min(startY, finishY);
          y <= Math.max(startY, finishY);
          y += 1
        ) {
          rocksSet.add(`${startX}-${y}`);
        }
      }
    }
  });

  return rocksSet;
};

const moveSandUnit = (sandUnit, bottomY, rocksSet) => {
  if (rocksSet.has("500-0")) {
    throw new Error("starting position blocked");
  }

  if (sandUnit.y + 1 > bottomY) {
    throw new Error("reached bottom");
  }

  if (!rocksSet.has(`${sandUnit.x}-${sandUnit.y + 1}`)) {
    sandUnit.y += 1;
  } else if (!rocksSet.has(`${sandUnit.x - 1}-${sandUnit.y + 1}`)) {
    sandUnit.x -= 1;
    sandUnit.y += 1;
  } else if (!rocksSet.has(`${sandUnit.x + 1}-${sandUnit.y + 1}`)) {
    sandUnit.x += 1;
    sandUnit.y += 1;
  } else {
    throw new Error("blocked by rock or sand");
  }
};

const part1 = () => {
  const rocksSet = getRocksSet();

  const bottomY = Math.max(
    ...[...rocksSet].map((rock) => Number(rock.split("-")[1]))
  );

  let globalStop = false;
  let sandUnitCount = 0;

  while (!globalStop) {
    let sandStop = false;
    let sandUnit = { x: 500, y: 0 };

    while (!sandStop) {
      try {
        moveSandUnit(sandUnit, bottomY, rocksSet);
      } catch (error) {
        if (error.message === "blocked by rock or sand") {
          sandStop = true;
          rocksSet.add(`${sandUnit.x}-${sandUnit.y}`);
          sandUnitCount += 1;
        } else if (error.message === "reached bottom") {
          sandStop = true;
          globalStop = true;
        }
      }
    }
  }

  return sandUnitCount;
};

const part2 = () => {
  const rocksSet = getRocksSet();

  const bottomY =
    Math.max(...[...rocksSet].map((rock) => Number(rock.split("-")[1]))) + 1;

  let globalStop = false;
  let sandUnitCount = 0;

  while (!globalStop) {
    let sandStop = false;
    let sandUnit = { x: 500, y: 0 };

    while (!sandStop) {
      try {
        moveSandUnit(sandUnit, bottomY, rocksSet);
      } catch (error) {
        if (
          error.message === "blocked by rock or sand" ||
          error.message === "reached bottom"
        ) {
          sandStop = true;
          rocksSet.add(`${sandUnit.x}-${sandUnit.y}`);
          sandUnitCount += 1;
        } else if (error.message === "starting position blocked") {
          sandStop = true;
          globalStop = true;
        }
      }
    }
  }

  return sandUnitCount;
};

console.log(part1());
console.log(part2());
