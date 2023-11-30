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
    // dict of directions and their +y and +x operations
    let directions = {
        nw: [-1, -1],
        n: [-1, 0],
        ne: [-1, 1],
        w: [0, -1],
        e: [0, 1],
        sw: [1, -1],
        s: [1, 0],
        se: [1, 1],
    };

    for (const dir in directions) {
        const yNew = y + directions[dir][0];
        const xNew = x + directions[dir][1];
        if (seats[yNew] && seats[yNew][xNew] && seats[yNew][xNew] === "#") adjacentSeats += 1;
    }

    return adjacentSeats;
};

const getOccupiedVisibleSeats = (seats, y, x) => {
    let visibleSeatsCount = 0;
    let visibleSeats = {};
    // dict of directions and their +y and +x operations
    let directions = {
        nw: [-1, -1],
        n: [-1, 0],
        ne: [-1, 1],
        w: [0, -1],
        e: [0, 1],
        sw: [1, -1],
        s: [1, 0],
        se: [1, 1],
    };

    for (const dir in directions) {
        let running = true;
        let yInc = 0;
        let xInc = 0;

        while (running) {
            if (yInc === seats.length - 1 && xInc === seats[0].length - 1) {
                running = false;
                break;
            }

            let yNew = y;
            if (directions[dir][0] !== 0) {
                yNew = y + directions[dir][0] + (directions[dir][0] < 0 ? -yInc : yInc);
            }
            let xNew = x;
            if (directions[dir][1] !== 0) {
                xNew = x + directions[dir][1] + (directions[dir][1] < 0 ? -xInc : xInc);
            }

            if (!seats[yNew] || !seats[yNew][xNew]) {
                running = false;
                break;
            }

            if (!visibleSeats.hasOwnProperty(dir)) {
                if (seats[yNew][xNew] === "#") {
                    visibleSeats[dir] = "#";
                } else if (seats[yNew][xNew] === "L") {
                    visibleSeats[dir] = "L";
                }
            }

            if (yInc < seats.length - 1) {
                yInc += 1;
            }
            if (xInc < seats[0].length - 1) {
                xInc += 1;
            }
        }
    }

    for (const dir in visibleSeats) {
        if (visibleSeats[dir] === "#") {
            visibleSeatsCount += 1;
        }
    }

    return visibleSeatsCount;
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

const part2 = () => {
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
                const visibleSeats = getOccupiedVisibleSeats(originalSeats, i, n);
                if (originalSeats[i][n] === "L") {
                    if (visibleSeats === 0) {
                        seats[i][n] = "#";
                        occupiedSeats += 1;
                    }
                } else if (originalSeats[i][n] === "#") {
                    if (visibleSeats >= 5) {
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

    console.log("Part 2 occupied seats: " + occupiedSeats);
};

part1();
part2();
