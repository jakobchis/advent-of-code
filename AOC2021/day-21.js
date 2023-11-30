import { readFileSync } from "fs";
import * as path from "path";

const file = readFileSync(path.resolve(__dirname, "day-21.txt"), "utf8").split(
  "\n"
);

const part1 = () => {
  const moveForward = (positions, currPlayer, amount) => {
    const newPos = positions[currPlayer] + (amount % 10);
    positions[currPlayer] = newPos <= 10 ? newPos : newPos % 10;
  };

  let positions = {
    player1: Number(file[0].split(": ")[1]),
    player2: Number(file[1].split(": ")[1]),
  };
  let scores = { player1: 0, player2: 0 };
  let diceRollAmount = 1;
  let diceRollCount = 0;
  let currPlayer = "player1";

  while (true) {
    if (Object.entries(scores).some(([_, score]) => score >= 1000)) {
      break;
    }

    moveForward(positions, currPlayer, diceRollAmount * 3 + 3);

    scores[currPlayer] += positions[currPlayer];

    diceRollCount += 3;
    diceRollAmount += 3;
    if (diceRollAmount >= 100) {
      diceRollAmount = diceRollAmount - 100;
    }

    currPlayer = currPlayer === "player1" ? "player2" : "player1";
  }

  return diceRollCount * Math.min(...Object.values(scores));
};

const part2 = () => {};

console.log(`Part 1 answer: ${part1()}`);
console.log(`Part 2 answer: ${part2()}`);
