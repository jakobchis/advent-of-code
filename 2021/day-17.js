import { readFileSync } from "fs";

const file = readFileSync("day-17.txt", "utf8");

const velocityStep = (pos, velocity) => {
  pos.x += velocity.x;
  pos.y += velocity.y;
  if (velocity.x > 0) {
    velocity.x -= 1;
  } else if (velocity.x < 0) {
    velocity.x += 1;
  }

  velocity.y -= 1;
};

const withinTargetArea = (pos, targetArea) => {
  if (
    pos.x >= targetArea.minX &&
    pos.x <= targetArea.maxX &&
    pos.y >= targetArea.minY &&
    pos.y <= targetArea.maxY
  ) {
    return true;
  }

  return false;
};

const pastTargetArea = (pos, targetArea) => {
  if (pos.x > targetArea.maxX || pos.y < targetArea.minY) {
    return true;
  }

  return false;
};

const part1 = () => {
  const [minX, maxX] = file
    .match(/(?<=\: x=)(.*?)(?=\,)/)[0]
    .split("..")
    .map(Number);
  const [minY, maxY] = file
    .match(/(?<=\y=)(.*?)($)/)[0]
    .split("..")
    .map(Number);
  const targetArea = { minX, maxX, minY, maxY };

  let highestYPos = 0;

  for (let y = 9999; y > -9999; y--) {
    for (let x = 0; x < 9999; x++) {
      let pos = { x: 0, y: 0 };
      let velocity = { x, y };
      let tempVelocity = { ...velocity };
      let tempHighestYPos = 0;

      while (true) {
        velocityStep(pos, tempVelocity);

        if (pos.y > tempHighestYPos) {
          tempHighestYPos = pos.y;
        }

        if (pastTargetArea(pos, targetArea)) {
          break;
        }
        if (withinTargetArea(pos, targetArea)) {
          if (tempHighestYPos > highestYPos) {
            highestYPos = tempHighestYPos;
          }
          break;
        }
      }
    }
  }

  return highestYPos;
};

const part2 = () => {
  const [minX, maxX] = file
    .match(/(?<=\: x=)(.*?)(?=\,)/)[0]
    .split("..")
    .map(Number);
  const [minY, maxY] = file
    .match(/(?<=\y=)(.*?)($)/)[0]
    .split("..")
    .map(Number);
  const targetArea = { minX, maxX, minY, maxY };

  let velocities = [];

  for (let y = 9999; y > -9999; y--) {
    for (let x = 0; x < 9999; x++) {
      let pos = { x: 0, y: 0 };
      let velocity = { x, y };
      let tempVelocity = { ...velocity };

      while (true) {
        velocityStep(pos, tempVelocity);

        if (pastTargetArea(pos, targetArea)) {
          break;
        }
        if (withinTargetArea(pos, targetArea)) {
          velocities.push(velocity);
          break;
        }
      }
    }
  }

  return velocities.length;
};

console.log(`Part 1 answer: ${part1()}`);
console.log(`Part 2 answer: ${part2()}`);
