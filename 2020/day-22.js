const fs = require("fs");

const part1 = () => {
    const file = fs.readFileSync("day-22.txt", "utf8");
    const lines = file.split("\n");
    let deck1 = lines.slice(0, lines.indexOf(""));
    deck1.splice(0, 1);
    let deck2 = lines.slice(lines.indexOf("") + 1);
    deck2.splice(0, 1);

    let gameOver = false;
    let winner = [];
    while (!gameOver) {
        if (parseInt(deck1[0]) > parseInt(deck2[0])) {
            deck1.push(deck1[0]);
            deck1.push(deck2[0]);
            deck1.splice(0, 1);
            deck2.splice(0, 1);
        } else if (parseInt(deck2[0]) > parseInt(deck1[0])) {
            deck2.push(deck2[0]);
            deck2.push(deck1[0]);
            deck2.splice(0, 1);
            deck1.splice(0, 1);
        }

        if (deck1.length === 0) {
            gameOver = true;
            winner.push(...deck2);
        } else if (deck2.length === 0) {
            gameOver = true;
            winner.push(...deck1);
        }
    }

    let score = 0;
    let counter = winner.length;
    for (const num of winner) {
        score += num * counter;
        counter -= 1;
    }

    console.log("Part 1 winner score: " + score);
};

const checkWinner = (deck1, deck2) => {
    let winner = null;

    if (deck1.length - 1 >= parseInt(deck1[0]) && deck2.length - 1 >= parseInt(deck2[0])) {
        winner = recursiveCombat(deck1.slice(1, parseInt(deck1[0]) + 1), deck2.slice(1, parseInt(deck2[0]) + 1));
    } else if (parseInt(deck1[0]) > parseInt(deck2[0])) {
        winner = 1;
    } else if (parseInt(deck2[0]) > parseInt(deck1[0])) {
        winner = 2;
    }

    return winner;
};

const moveCards = (deck1, deck2, winner) => {
    if (winner === 1) {
        deck1.push(deck1[0], deck2[0]);
        deck1.splice(0, 1);
        deck2.splice(0, 1);
    } else if (winner === 2) {
        deck2.push(deck2[0], deck1[0]);
        deck1.splice(0, 1);
        deck2.splice(0, 1);
    }
};

const recursiveCombat = (deck1, deck2) => {
    let deck1Copy = [...deck1];
    let deck2Copy = [...deck2];

    let winner = null;
    let gameOver = false;
    let history = new Set();
    while (!gameOver) {
        if (history.has(deck1Copy.toString() + " " + deck2Copy.toString())) {
            gameOver = true;
            winner = 1;
        } else {
            history.add(deck1Copy.toString() + " " + deck2Copy.toString());
            winner = checkWinner(deck1Copy, deck2Copy);
            moveCards(deck1Copy, deck2Copy, winner);

            if (deck1Copy.length === 0) {
                gameOver = true;
                winner = 2;
            } else if (deck2Copy.length === 0) {
                gameOver = true;
                winner = 1;
            }
        }
    }

    return winner;
};

const part2 = () => {
    const file = fs.readFileSync("day-22.txt", "utf8");
    const lines = file.split("\n");
    let deck1 = lines.slice(1, lines.indexOf(""));
    let deck2 = lines.slice(lines.indexOf("") + 2);

    let gameOver = false;
    let winner = null;
    while (!gameOver) {
        winner = checkWinner(deck1, deck2);
        moveCards(deck1, deck2, winner);

        if (deck1.length === 0) {
            gameOver = true;
            winner = 2;
        } else if (deck2.length === 0) {
            gameOver = true;
            winner = 1;
        }
    }

    let score = 0;
    let gameWinner = winner === 1 ? deck1 : deck2;
    let counter = gameWinner.length;
    for (const num of gameWinner) {
        score += parseInt(num) * counter;
        counter -= 1;
    }

    console.log("Part 2 winner score: " + score);
};

part1();
part2();
