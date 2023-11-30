import { readFileSync } from "fs";

const testData = readFileSync("day-02.txt", "utf8")
  .split("\n")
  .map((round) => round.split(" "));

const part1 = () => {
  const getResult = (oppMove, myMove) => {
    switch (oppMove) {
      case "A":
        if (myMove === "Y") return "win";
        if (myMove === "X") return "draw";
        break;
      case "B":
        if (myMove === "Z") return "win";
        if (myMove === "Y") return "draw";
        break;
      case "C":
        if (myMove === "X") return "win";
        if (myMove === "Z") return "draw";
        break;
    }
  };

  const scoreMap = {
    X: 1,
    Y: 2,
    Z: 3,
  };
  let totalScore = 0;

  testData.forEach(([oppMove, myMove]) => {
    totalScore += scoreMap[myMove];

    const result = getResult(oppMove, myMove);

    if (result === "win") totalScore += 6;
    if (result === "draw") totalScore += 3;
  });

  return totalScore;
};

const part2 = () => {
  const moveMap = {
    A: {
      winner: "B",
      loser: "C",
      baseScore: 1,
    },
    B: {
      winner: "C",
      loser: "A",
      baseScore: 2,
    },
    C: {
      winner: "A",
      loser: "B",
      baseScore: 3,
    },
  };
  let totalScore = 0;

  testData.forEach(([oppMove, resultNeeded]) => {
    let myMove = "";

    switch (resultNeeded) {
      case "X":
        myMove = moveMap[oppMove].loser;
        break;
      case "Y":
        myMove = oppMove;
        totalScore += 3;
        break;
      case "Z":
        myMove = moveMap[oppMove].winner;
        totalScore += 6;
        break;
    }

    totalScore += moveMap[myMove].baseScore;
  });

  return totalScore;
};

console.log(part1());
console.log(part2());
