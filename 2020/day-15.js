const fs = require("fs");

const readFile = () => {
    const file = fs.readFileSync("day-15.txt", "utf8");
    const startingNumbersStrings = file.split(",");
    let startingNumbers = [];
    for (const str of startingNumbersStrings) {
        startingNumbers.push(parseInt(str));
    }
    return startingNumbers;
};

const part1 = () => {
    const startingNumbers = readFile();
    // store each number with a record of the two most recent instances of it being spoken
    let dictionary = {};
    let lastNumber = 0;
    let count = 30000000;
    let finalNumber = null;

    for (let i = 0; i <= count; i++) {
        if (i === count) {
            finalNumber = lastNumber;
        } else if (i < startingNumbers.length) {
            dictionary[startingNumbers[i]] = { lastSpoken: i, lastLastSpoken: null };
            lastNumber = startingNumbers[i];
        } else {
            if (dictionary[lastNumber].lastLastSpoken === null) {
                if (dictionary[0]) {
                    let lastLastSpoken = dictionary[0].lastSpoken;
                    dictionary[0] = { lastSpoken: i, lastLastSpoken: lastLastSpoken };
                } else {
                    dictionary[0] = { lastSpoken: i, lastLastSpoken: null };
                }
                lastNumber = 0;
            } else {
                let turnsApart = dictionary[lastNumber].lastSpoken - dictionary[lastNumber].lastLastSpoken;
                if (dictionary[turnsApart]) {
                    let lastLastSpoken = dictionary[turnsApart].lastSpoken;
                    dictionary[turnsApart] = { lastSpoken: i, lastLastSpoken: lastLastSpoken };
                } else {
                    dictionary[turnsApart] = { lastSpoken: i, lastLastSpoken: null };
                }
                lastNumber = turnsApart;
            }
        }
        // if (i % 1000000 === 0) {
        //     console.log(i);
        // }
    }

    console.log("Part 1 and 2 nth number: " + finalNumber);
};

part1();
