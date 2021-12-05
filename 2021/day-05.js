import { readFileSync } from "fs";

const lines = readFileSync("day-05.txt", "utf8").split("\n");

const part1 = () => {
  let lineDiagram = {};
  let score = 0;

  lines.forEach((line) => {
    const [firstPoint, secondPoint] = line.split(" -> ");
    let [x1, y1] = firstPoint.split(",");
    x1 = Number(x1);
    y1 = Number(y1);
    let [x2, y2] = secondPoint.split(",");
    x2 = Number(x2);
    y2 = Number(y2);

    if (x1 === x2) {
      for (let i = Math.min(y1, y2); i < Math.max(y1, y2) + 1; i++) {
        if (lineDiagram[x1]) {
          if (lineDiagram[x1][i]) {
            lineDiagram[x1][i] += 1;
          } else {
            lineDiagram[x1][i] = 1;
          }
        } else {
          lineDiagram[x1] = { [i]: 1 };
        }
      }
    } else if (y1 === y2) {
      for (let i = Math.min(x1, x2); i < Math.max(x1, x2) + 1; i++) {
        if (lineDiagram[i]) {
          if (lineDiagram[i][y1]) {
            lineDiagram[i][y1] += 1;
          } else {
            lineDiagram[i][y1] = 1;
          }
        } else {
          lineDiagram[i] = { [y1]: 1 };
        }
      }
    }
  });

  Object.values(lineDiagram).forEach((line) => {
    Object.values(line).forEach((point) => {
      if (point > 1) {
        score += 1;
      }
    });
  });

  return score;
};

const part2 = () => {
  let lineDiagram = {};
  let score = 0;

  const checkIf45Degree = (x1, x2, y1, y2) => {
    if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
      return true;
    }
  };

  const addToLineDiagram = (x, y) => {
    if (lineDiagram[x]) {
      if (lineDiagram[x][y]) {
        lineDiagram[x][y] += 1;
      } else {
        lineDiagram[x][y] = 1;
      }
    } else {
      lineDiagram[x] = { [y]: 1 };
    }
  };

  lines.forEach((line) => {
    const [firstPoint, secondPoint] = line.split(" -> ");
    let [x1, y1] = firstPoint.split(",");
    x1 = Number(x1);
    y1 = Number(y1);
    let [x2, y2] = secondPoint.split(",");
    x2 = Number(x2);
    y2 = Number(y2);

    if (x1 === x2) {
      for (let i = Math.min(y1, y2); i < Math.max(y1, y2) + 1; i++) {
        addToLineDiagram(x1, i);
      }
    } else if (y1 === y2) {
      for (let i = Math.min(x1, x2); i < Math.max(x1, x2) + 1; i++) {
        addToLineDiagram(i, y1);
      }
    } else if (checkIf45Degree(x1, x2, y1, y2)) {
      while (x1 !== x2 && y1 !== y2) {
        addToLineDiagram(x1, y1);

        x1 = x1 < x2 ? x1 + 1 : x1 - 1;
        y1 = y1 < y2 ? y1 + 1 : y1 - 1;
      }

      addToLineDiagram(x2, y2);
    }
  });

  Object.values(lineDiagram).forEach((line) => {
    Object.values(line).forEach((point) => {
      if (point > 1) {
        score += 1;
      }
    });
  });

  return score;
};

console.log(part1());
console.log(part2());
