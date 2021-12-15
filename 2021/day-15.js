import { readFileSync } from "fs";

const file = readFileSync("day-15.txt", "utf8");

const dijkstra = (map, startPos) => {
  const adjacents = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const queue = [{ pos: startPos, cost: 0 }];
  const visited = new Set();

  while (queue.length) {
    const { pos, cost } = queue.shift();

    if (pos[1] === map.length - 1 && pos[0] === map[0].length - 1) {
      return cost;
    }

    adjacents
      .map(([dx, dy]) => [dx + pos[0], dy + pos[1]])
      .filter(([x, y]) => map[y]?.[x])
      .filter((pos) => !visited.has(pos.toString()))
      .forEach((pos) => {
        visited.add(pos.toString());
        queue.push({ pos, cost: cost + map[pos[1]][pos[0]] });
      });

    queue.sort((a, b) => a.cost - b.cost);
  }
};

const part1 = () => {
  const input = file.split("\n").map((row) => row.split("").map(Number));

  return dijkstra(input, [0, 0]);
};

const part2 = () => {
  const input = file.split("\n").map((row) => row.split("").map(Number));

  console.log(["input", input]);

  const scaleFactor = 5;
  const inputLength = input.length;
  let increaseAmount = 1;
  let scaledInput = [...input];

  for (let i = 0; i < inputLength * scaleFactor; i++) {
    scaledInput.push([]);
    for (let n = inputLength; n < inputLength * scaleFactor; n++) {
      scaledInput[i][n] =
        scaledInput[i < inputLength ? i : i - inputLength][n - inputLength] + 1;
    }
  }

  console.log(["scaledInput", scaledInput]);

  return dijkstra(scaledInput, [0, 0]);
};

console.log(`Part 1 answer: ${part1()}`);
// TODO: finish part 2
// console.log(`Part 2 answer: ${part2()}`);
