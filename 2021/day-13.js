import { writeFileSync, readFileSync, write } from "fs";

let [dots, foldInstructions] = readFileSync("day-13.txt", "utf8").split("\n\n");
dots = dots.split("\n");
foldInstructions = foldInstructions.split("\n");

const part1 = () => {
  const maxXSize = Math.max(
    ...dots.map((dot) => {
      const [x, y] = dot.split(",");
      return x;
    })
  );
  const maxYSize = Math.max(
    ...dots.map((dot) => {
      const [x, y] = dot.split(",");
      return y;
    })
  );

  let grid = [];
  for (let i = 0; i <= maxYSize; i++) {
    grid.push([]);
    for (let n = 0; n <= maxXSize; n++) {
      grid[i].push(".");
    }
  }

  dots.forEach((dot) => {
    const [x, y] = dot.split(",");
    grid[y][x] = "#";
  });

  let [foldDirection, foldAmount] = foldInstructions[0]
    .match(/(y=|x=)[0-9]+/)[0]
    .split("=");

  if (foldDirection === "y") {
    for (let i = foldAmount; i <= maxYSize; i++) {
      for (let n = 0; n <= maxXSize; n++) {
        if (grid[i][n] === "#") {
          grid[i - foldAmount + 1][n] = "#";
          grid[i][n] = ".";
        }
      }
    }
  } else if (foldDirection === "x") {
    for (let i = 0; i <= maxYSize; i++) {
      for (let n = foldAmount; n <= maxXSize; n++) {
        if (grid[i][n] === "#") {
          grid[i][foldAmount - (n - foldAmount)] = "#";
          grid[i][n] = ".";
        }
      }
    }
  }

  let dotCount = 0;
  grid.forEach((subGrid) => {
    subGrid.forEach((point) => {
      if (point === "#") {
        dotCount += 1;
      }
    });
  });

  return dotCount;
};

const part2 = () => {
  const maxXSize = Math.max(
    ...dots.map((dot) => {
      const [x, y] = dot.split(",");
      return x;
    })
  );
  const maxYSize = Math.max(
    ...dots.map((dot) => {
      const [x, y] = dot.split(",");
      return y;
    })
  );

  let grid = [];
  for (let i = 0; i <= maxYSize; i++) {
    grid.push([]);
    for (let n = 0; n <= maxXSize; n++) {
      grid[i].push(".");
    }
  }

  dots.forEach((dot) => {
    const [x, y] = dot.split(",");
    grid[y][x] = "#";
  });

  foldInstructions.forEach((instruction) => {
    let [foldDirection, foldAmount] = instruction
      .match(/(y=|x=)[0-9]+/)[0]
      .split("=");

    if (foldDirection === "y") {
      for (let i = foldAmount; i < grid.length; i++) {
        for (let n = 0; n < grid[i].length; n++) {
          if (grid[i][n] === "#") {
            grid[foldAmount - (i - foldAmount)][n] = "#";
            grid[i][n] = ".";
          }
        }
      }
      grid.splice(foldAmount);
    } else if (foldDirection === "x") {
      for (let i = 0; i < grid.length; i++) {
        for (let n = foldAmount; n < grid[i].length; n++) {
          if (grid[i][n] === "#") {
            grid[i][foldAmount - (n - foldAmount)] = "#";
            grid[i][n] = ".";
          }
        }
        grid[i].splice(foldAmount);
      }
    }
  });

  return `\n,${grid.map((row) => row.join("") + "\n")}`;
};

console.log(`Part 1 answer: ${part1()}`);
console.log(`Part 2 answer: ${part2()}`);
