const fs = require("fs");

const readFile = () => {
    const file = fs.readFileSync("day-13.txt", "utf8");
    const lines = file.split("\n");

    const timeStamp = parseInt(lines[0]);
    const busesDirty = lines[1].split(",");
    let buses = [];

    for (const bus of busesDirty) {
        if (bus !== "x") {
            buses.push(parseInt(bus));
        } else {
            buses.push(bus);
        }
    }

    return [timeStamp, buses];
};

const part1 = () => {
    const things = readFile();
    const timeStamp = things[0];
    const buses = things[1];
    let finalDiff = 0;
    let finalBus = 0;
    let increment = 0;
    let found = false;

    while (!found) {
        increment += 1;
        for (let i = 0; i <= buses.length; i++) {
            const adjustedTimeStamp = timeStamp + increment;
            if (buses[i] !== "x" && adjustedTimeStamp % buses[i] === 0) {
                finalDiff = adjustedTimeStamp - timeStamp;
                finalBus = buses[i];
                found = true;
            }
        }
    }

    const finalReturn = finalDiff * finalBus;
    console.log("Part 1 final diff: " + finalReturn);
};

const part2 = () => {
    const things = readFile();
    const buses = things[1];
    let found = false;
    let increment = 0;

    while (!found) {
        increment += buses[0];
        for (let i = 0; i <= buses.length; i++) {
            if (i === buses.length) {
                found = true;
            }

            const incrementAdjusted = increment + i;
            if (buses[i] !== "x" && incrementAdjusted % buses[i] !== 0) {
                break;
            }
        }
    }

    console.log("Part 2 timestamp: " + increment);
};

part1();
// part 2 works as a brute force on smaller inputs but was supposed
// to use Chinese Remainder Theorem on this problem
// part2();
