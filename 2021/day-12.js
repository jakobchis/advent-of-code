import { readFileSync } from "fs";

const inputs = readFileSync("day-12.txt", "utf8").split("\n");

let graph = {};
inputs.forEach((thing) => {
  const [point1, point2] = thing.split("-");
  if (point1 in graph) {
    if (!graph[point1].includes(point2)) {
      graph[point1].push(point2);
    }
  } else {
    graph[point1] = [point2];
  }

  if (point2 in graph) {
    if (!graph[point2].includes(point1)) {
      graph[point2].push(point1);
    }
  } else {
    graph[point2] = [point1];
  }
});

const part1 = () => {
  const travel = (point, currentPath, paths) => {
    currentPath.push(point);

    if (point === "end") {
      paths.push(currentPath);
      return;
    }

    graph[point].forEach((vertex) => {
      if (!currentPath.includes(vertex) || vertex.toUpperCase() === vertex) {
        let currentPathCopy = [...currentPath];
        travel(vertex, currentPathCopy, paths);
      }
    });

    return paths;
  };

  let paths = travel("start", [], []);

  return paths.length;
};

const part2 = () => {
  const travel = (point, currentPath, paths, visitedSmallCaveTwice) => {
    currentPath.push(point);

    if (point === "end") {
      paths.push(currentPath);
      return;
    }

    graph[point].forEach((vertex) => {
      if (vertex.toUpperCase() === vertex || !currentPath.includes(vertex)) {
        let currentPathCopy = [...currentPath];
        travel(vertex, currentPathCopy, paths, visitedSmallCaveTwice);
      } else if (
        currentPath.includes(vertex) &&
        !visitedSmallCaveTwice &&
        !["start", "end"].includes(vertex)
      ) {
        let currentPathCopy = [...currentPath];
        travel(vertex, currentPathCopy, paths, true);
      }
    });

    return paths;
  };

  let paths = travel("start", [], [], false);

  return paths.length;
};

console.log(`Part 1 answer: ${part1()}`);
console.log(`Part 2 answer: ${part2()}`);
