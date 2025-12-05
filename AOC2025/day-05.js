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
    .map((range) => range.split("-").map(Number));
  let numFreshIngredients = 0;

  // TODO sort and then merge overlapping ranges instead
  // sort by the first number in the range, last number tiebreaker
  // iterate over ranges, keep a list of merged ranges
  // if mergedRanges is empty, or the current range's start is after the last merged range's end, add it
  // otherwise, merge the current range into the last range (extend the end)

  for (let i = 0; i < freshRanges.length; i++) {
    const [start, end] = freshRanges[i];
    numFreshIngredients += end - start + 1;

    if (i > 0) {
      for (let n = 0; n < i; n++) {
        const intersection = intersectTwoRanges(freshRanges[i], freshRanges[n]);
        if (!intersection) {
          continue;
        }

        const [prevStart, prevEnd] = intersection;
        numFreshIngredients -= prevEnd - prevStart + 1;
      }
    }
  }

  return numFreshIngredients;
};

const intersectTwoRanges = (rangeA, rangeB) => {
  const [startA, endA] = rangeA;
  const [startB, endB] = rangeB;

  const intersectionStart = Math.max(startA, startB);

  const intersectionEnd = Math.min(endA, endB);

  if (intersectionStart <= intersectionEnd) {
    return [intersectionStart, intersectionEnd];
  } else {
    return null;
  }
};

console.log(part1());
console.log(part2());
