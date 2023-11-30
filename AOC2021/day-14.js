import { readFileSync } from "fs";

let [polymer, insertions] = readFileSync("day-14.txt", "utf8").split("\n\n");
polymer = polymer.split("");
insertions = insertions.split("\n").map((insertion) => {
  return insertion.split(" -> ");
});

const part1 = () => {
  let polymerCopy = [...polymer];
  let temp = [];

  for (let n = 0; n < 10; n++) {
    for (let i = 0; i < polymerCopy.length; i++) {
      if (i === 0) {
        temp.push(polymerCopy[i]);
      } else {
        const twoLetters = polymerCopy.slice(i - 1, i + 1).join("");
        const insertion = insertions.find(([a, b]) => a === twoLetters);
        if (insertion) {
          temp.push(insertion[1]);
          temp.push(polymerCopy[i]);
        }
      }
    }

    polymerCopy = [...temp];
    temp = [];
  }

  const counts = {};
  polymerCopy.forEach((letter) => {
    if (!(letter in counts)) {
      counts[letter] = 1;
    } else {
      counts[letter] += 1;
    }
  });

  return (
    Math.max(...Object.values(counts)) - Math.min(...Object.values(counts))
  );
};

const part2 = () => {
  let letterCounts = {};
  let polymerPairDict = {};

  for (let i = 0; i < polymer.length; i++) {
    if (letterCounts[polymer[i]]) {
      letterCounts[polymer[i]] += 1;
    } else {
      letterCounts[polymer[i]] = 1;
    }

    if (i > 0) {
      const twoLetterString = `${polymer[i - 1]}${polymer[i]}`;
      if (polymerPairDict[twoLetterString]) {
        polymerPairDict[twoLetterString] += 1;
      } else {
        polymerPairDict[twoLetterString] = 1;
      }
    }
  }

  let tempPolymerPairDict = {};
  for (let i = 0; i < 40; i++) {
    Object.entries(polymerPairDict).forEach(([polymerPair, count]) => {
      // insertion[0] = pair, insertion[1] = letter to insert
      const insertion = insertions.find(
        (insertion) => insertion[0] === polymerPair
      );
      if (insertion) {
        if (letterCounts[insertion[1]]) {
          letterCounts[insertion[1]] += count;
        } else {
          letterCounts[insertion[1]] = count;
        }

        const newPairs = [
          `${insertion[0][0]}${insertion[1]}`,
          `${insertion[1]}${insertion[0][1]}`,
        ];
        newPairs.forEach((newPair) => {
          if (tempPolymerPairDict[newPair]) {
            tempPolymerPairDict[newPair] += count;
          } else {
            tempPolymerPairDict[newPair] = count;
          }
        });
      } else {
        if (tempPolymerPairDict[polymerPair]) {
          tempPolymerPairDict[polymerPair] += count;
        } else {
          tempPolymerPairDict[polymerPair] = count;
        }
      }
    });

    polymerPairDict = { ...tempPolymerPairDict };
    tempPolymerPairDict = {};
  }

  return (
    Math.max(...Object.values(letterCounts)) -
    Math.min(...Object.values(letterCounts))
  );
};

console.log(`Part 1 answer: ${part1()}`);
console.log(`Part 2 answer: ${part2()}`);
