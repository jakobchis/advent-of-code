import { readFileSync } from "fs";

const input = readFileSync("./day-05.txt", "utf8");

const part1 = () => {
  let freshRanges = input.split("\n\n")[0].split("\n");
  let ingredients = input.split("\n\n")[1].split("\n");
  let numFreshIngredients = 0;

  for (const ingredient of ingredients) {
    if (
      freshRanges.some((range) => {
        const [left, right] = range.split("-");
        return (
          Number(ingredient) >= Number(left) &&
          Number(ingredient) <= Number(right)
        );
      })
    ) {
      numFreshIngredients += 1;
    }
  }

  return numFreshIngredients;
};

const part2 = () => {
  let freshRanges = input
    .split("\n\n")[0]
    .split("\n")
    .map((range) => range.split("-").map(Number))
    .sort((a, b) => a[0] - b[0]);

  let numFreshIngredients = 0;
  let mergedRanges = [];

  for (let i = 0; i < freshRanges.length; i++) {
    const currentRange = freshRanges[i];
    const lastMergedRange = mergedRanges[mergedRanges.length - 1];

    // Add first range
    if (i === 0) {
      mergedRanges.push(currentRange);
      continue;
    }

    // Check if current range's start is after last merged range's end
    if (currentRange[0] > lastMergedRange[1]) {
      mergedRanges.push(currentRange);
      continue;
    }

    // Otherwise, merge
    lastMergedRange[1] = Math.max(lastMergedRange[1], currentRange[1]);
  }

  for (let i = 0; i < mergedRanges.length; i++) {
    numFreshIngredients += mergedRanges[i][1] - mergedRanges[i][0] + 1;
  }

  return numFreshIngredients;
};

console.log(part1());
console.log(part2());
