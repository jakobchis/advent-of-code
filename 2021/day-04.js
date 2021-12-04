import { readFileSync } from "fs";

const [rawNumbers, ...rawBoards] = readFileSync("day-04.txt", "utf8").split(
  "\n\n"
);
const numbers = rawNumbers.split(",");
const boards = rawBoards.map((board) => {
  let tempBoards = [...board.split("\n")];
  return tempBoards.map((board) => {
    if (board[0] === " ") {
      return board.slice(1, board.length).replace(/ {2,}/g, " ").split(" ");
    }

    return board.replace(/ {2,}/g, " ").split(" ");
  });
});

const bingo = () => {
  const checkForBingo = (calledNumbers, board) => {
    let foundWinner = false;
    let endLoop = false;

    while (!foundWinner && !endLoop) {
      for (let i = 0; i < board[0].length; i++) {
        for (let a = 0; a < board[0].length; a++) {
          if (!calledNumbers.includes(board[a][i])) {
            break;
          }

          if (a + 1 === board[0].length) {
            foundWinner = true;
          }
        }

        for (let n = 0; n < board[0].length; n++) {
          if (!calledNumbers.includes(board[i][n])) {
            break;
          }

          if (n + 1 === board[0].length) {
            foundWinner = true;
          }
        }
      }

      endLoop = true;
    }

    if (foundWinner) {
      return board;
    }
  };

  let calledNumbers = [];
  let winners = [];

  for (const number of numbers) {
    calledNumbers.push(number);
    for (const board of boards) {
      if (!winners.find((winner) => winner.board === boards.indexOf(board))) {
        const winningBoard = checkForBingo(calledNumbers, board);

        if (winningBoard) {
          const score =
            winningBoard.reduce((acc, curr) => {
              return (
                Number(acc) +
                curr.reduce((acc2, curr2) => {
                  if (!calledNumbers.includes(curr2)) {
                    return Number(acc2) + Number(curr2);
                  }

                  return Number(acc2) + 0;
                }, 0)
              );
            }, 0) * Number(number);

          winners.push({ board: boards.indexOf(board), score });
        }
      }
    }
  }

  return winners;
};

const part1 = () => {
  const winners = bingo();
  return winners[0].score;
};

const part2 = () => {
  const winners = bingo();
  return winners[winners.length - 1].score;
};

console.log(part1());
console.log(part2());
