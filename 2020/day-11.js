const { Console } = require("console");
const fs = require("fs");

const readFile = () => {
    const file = fs.readFileSync("day-11.txt", "utf8");

    let seats = [];
    const lines = file.split("\n");
    for (let n = 0; n < lines.length; n++) {
        seats.push([]);
        const chars = lines[n].split("");
        for (let i = 0; i < chars.length; i++) {
            seats[n].push(chars[i]);
        }
    }

    return seats;
};

const getOccupiedAdjacentSeats = (seats, y, x) => {
    let adjacentSeats = 0;
    if (seats[y - 1] && seats[y - 1][x - 1] && seats[y - 1][x - 1] === "#") adjacentSeats += 1;
    if (seats[y - 1] && seats[y - 1][x] && seats[y - 1][x] === "#") adjacentSeats += 1;
    if (seats[y - 1] && seats[y - 1][x + 1] && seats[y - 1][x + 1] === "#") adjacentSeats += 1;
    if (seats[y][x - 1] && seats[y][x - 1] === "#") adjacentSeats += 1;
    if (seats[y][x + 1] && seats[y][x + 1] === "#") adjacentSeats += 1;
    if (seats[y + 1] && seats[y + 1][x - 1] && seats[y + 1][x - 1] === "#") adjacentSeats += 1;
    if (seats[y + 1] && seats[y + 1][x] && seats[y + 1][x] === "#") adjacentSeats += 1;
    if (seats[y + 1] && seats[y + 1][x + 1] && seats[y + 1][x + 1] === "#") adjacentSeats += 1;

    return adjacentSeats;
};

const part1 = () => {
    let seats = readFile();
    let occupiedSeats = 0;
    let running = true;

    while (running) {
        let originalSeats = [];
        for (const row of seats) {
            originalSeats.push(row.slice());
        }
        let originalOccupiedSeats = occupiedSeats;

        for (let i = 0; i < originalSeats.length; i++) {
            for (let n = 0; n < originalSeats[i].length; n++) {
                const adjacentSeats = getOccupiedAdjacentSeats(originalSeats, i, n);
                if (originalSeats[i][n] === "L") {
                    if (adjacentSeats === 0) {
                        seats[i][n] = "#";
                        occupiedSeats += 1;
                    }
                } else if (originalSeats[i][n] === "#") {
                    if (adjacentSeats >= 4) {
                        seats[i][n] = "L";
                        occupiedSeats -= 1;
                    }
                }
            }
        }
        if (originalOccupiedSeats === occupiedSeats) {
            running = false;
        }
    }

    console.log("Part 1 occupied seats: " + occupiedSeats);
};

part1();
