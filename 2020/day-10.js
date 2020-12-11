const fs = require("fs");

const readFile = () => {
    const file = fs.readFileSync("day-10.txt", "utf8");
    let numbers = [];

    for (const line of file.split("\n")) {
        numbers.push(parseInt(line));
    }

    return numbers;
};

const part1 = () => {
    const numbers = readFile();
    numbers.sort((a, b) => {
        return a - b;
    });

    let joltDifferences = { 1: 0, 2: 0, 3: 0 };
    // count charging outlet
    joltDifferences[numbers[0]] += 1;
    // count device adapter
    joltDifferences[3] += 1;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i + 1] - numbers[i] === 1) {
            joltDifferences[1] += 1;
        } else if (numbers[i + 1] - numbers[i] === 2) {
            joltDifferences[2] += 1;
        } else if (numbers[i + 1] - numbers[i] === 3) {
            joltDifferences[3] += 1;
        }
    }

    console.log("Part 1 product: " + joltDifferences[1] * joltDifferences[3]);
};

const part2 = () => {
    const numbers = readFile();
    numbers.sort((a, b) => {
        return a - b;
    });

    let arrangements = {};
    arrangements[0] = 1;

    // arrangements for each input is equal to the sum of the arrangements
    // for each previous input subtract 1, 2, and 3
    for (let i = 0; i < numbers.length; i++) {
        arrangements[numbers[i]] = 0;
        if (arrangements[numbers[i] - 3]) {
            arrangements[numbers[i]] += arrangements[numbers[i] - 3];
        }
        if (arrangements[numbers[i] - 2]) {
            arrangements[numbers[i]] += arrangements[numbers[i] - 2];
        }
        if (arrangements[numbers[i] - 1]) {
            arrangements[numbers[i]] += arrangements[numbers[i] - 1];
        }
    }

    console.log("Part 2 arrangements: " + arrangements[numbers[numbers.length - 1]]);
};

part1();
part2();
