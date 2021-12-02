const fs = require("fs");

const readFile = () => {
    const file = fs.readFileSync("day-09.txt", "utf8");
    let numbers = [];

    for (const line of file.split("\n")) {
        numbers.push(parseInt(line));
    }

    return numbers;
};

const part1 = () => {
    const numbers = readFile();
    const preambleLength = 25;
    let invalidNumber = 0;

    for (let i = preambleLength; i < numbers.length; i++) {
        let subNumbers = {};
        let valid = false;

        for (let n = i - preambleLength; n < i; n++) {
            if (numbers[i] - numbers[n] in subNumbers) {
                valid = true;
            } else {
                subNumbers[numbers[n]] = 0;
            }
        }

        if (!valid) {
            invalidNumber = numbers[i];
            break;
        }
    }

    console.log("Part 1 invalid number: " + invalidNumber);
};

const part2 = () => {
    const numbers = readFile();
    const target = 50047984;
    let range = [];

    for (let i = 0; i < numbers.length; i++) {
        let sum = 0;

        if (range.length > 0) {
            sum = range.reduce((a, b) => a + b);
        }

        if (sum === target) {
            break;
        } else if (sum > target) {
            range.shift();
            i -= 1;
        } else {
            range.push(numbers[i]);
        }
    }

    const largest = Math.max(...range);
    const smallest = Math.min(...range);
    const finalSum = largest + smallest;
    console.log("Part 2 final sum: " + finalSum);
};

part1();
part2();
