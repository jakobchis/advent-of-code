const lineReader = require("line-reader");

function part1() {
    let pastNumbers = [];

    lineReader.eachLine("day-1.txt", function (line) {
        for (const number of pastNumbers) {
            if (parseInt(line) + number === 2020) {
                console.log("Part 1: " + parseInt(line) * number);
                return false;
            }
        }
        pastNumbers.push(parseInt(line));
    });
}

function part2() {
    let pastNumbers = [];

    lineReader.eachLine("day-1.txt", function (line) {
        for (const number1 of pastNumbers) {
            for (const number2 of pastNumbers) {
                if (parseInt(line) + number1 + number2 === 2020) {
                    console.log("Part 2: " + parseInt(line) * number1 * number2);
                    return false;
                }
            }
        }
        pastNumbers.push(parseInt(line));
    });
}

part1();
part2();
