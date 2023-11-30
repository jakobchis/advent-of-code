import { readFileSync } from "fs";

const testData = readFileSync("day-12.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

let graph = {};

for (let y = 0; y < testData.length; y += 1) {
  for (let x = 0; x < testData[y].length; x += 1) {
    let elevation = testData[y][x];

    if (testData[y][x] === "S") elevation = "a";
    if (testData[y][x] === "E") elevation = "z";

    graph[`${y}-${x}`] = {
      rawValue: testData[y][x],
      position: `${y}-${x}`,
      elevation,
      up: y - 1 >= 0 ? `${y - 1}-${x}` : undefined,
      down: y + 1 < testData.length ? `${y + 1}-${x}` : undefined,
      left: x - 1 >= 0 ? `${y}-${x - 1}` : undefined,
      right: x + 1 < testData[y].length ? `${y}-${x + 1}` : undefined,
    };
  }
}

const canMoveHere = (prevNode, nextNode, visited, direction) => {
  if (!nextNode || visited[nextNode]) {
    return false;
  }

  let validElevationMove = false;
  if (direction === "forward") {
    validElevationMove =
      graph[nextNode].elevation.charCodeAt(0) <=
      graph[prevNode].elevation.charCodeAt(0) + 1;
  } else if (direction === "backward") {
    validElevationMove =
      graph[prevNode].elevation.charCodeAt(0) <=
      graph[nextNode].elevation.charCodeAt(0) + 1;
  }

  return validElevationMove;
};

const getStartingPosition = (singleOccuranceLetter) => {
  return Object.entries(graph).find(([key, value]) => {
    return value.rawValue === singleOccuranceLetter;
  });
};

const part1 = () => {
  let queue = [];
  let visited = [];
  let distances = [];

  const [startingPosition] = getStartingPosition("S");

  queue.push(graph[startingPosition]);
  visited[startingPosition] = true;
  distances[startingPosition] = 0;

  let optimalDistance = 0;

  // bfs stuff
  while (queue.length > 0) {
    const node = queue.shift();

    if (node.rawValue === "E") {
      optimalDistance = distances[node.position];
      break;
    }

    [node.up, node.down, node.left, node.right].forEach((nextNode) => {
      if (canMoveHere(node.position, nextNode, visited, "forward")) {
        visited[nextNode] = true;
        queue.push(graph[nextNode]);
        distances[nextNode] = distances[node.position] + 1;
      }
    });
  }

  return optimalDistance;
};

const part2 = () => {
  let queue = [];
  let visited = [];
  let distances = [];

  const [startingPosition] = getStartingPosition("E");

  queue.push(graph[startingPosition]);
  visited[startingPosition] = true;
  distances[startingPosition] = 0;

  let optimalDistance = 0;

  // bfs stuff
  while (queue.length > 0) {
    const node = queue.shift();

    if (node.elevation === "a") {
      optimalDistance = distances[node.position];
      break;
    }

    [node.up, node.down, node.left, node.right].forEach((nextNode) => {
      if (canMoveHere(node.position, nextNode, visited, "backward")) {
        visited[nextNode] = true;
        queue.push(graph[nextNode]);
        distances[nextNode] = distances[node.position] + 1;
      }
    });
  }

  return optimalDistance;
};

console.log(part1());
console.log(part2());
