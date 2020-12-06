const lineReader = require("line-reader");

function part1() {
    let questions = [];
    let yesCount = 0;

    lineReader.eachLine("day-6.txt", function (line, last) {
        if (line === "") {
            yesCount += questions.length;
            questions = [];
        } else {
            for (const char of line) {
                if (!questions.includes(char)) {
                    questions.push(char);
                }
            }
        }

        if (last) {
            yesCount += questions.length;
            console.log("Part 1 sum: " + yesCount);
        }
    });
}

function part2() {
    let questions = [];
    let yesCount = 0;
    let firstLine = true;

    lineReader.eachLine("day-6.txt", function (line, last) {
        if (line === "") {
            yesCount += questions.length;
            questions = [];
            firstLine = true;
        } else {
            if (firstLine) {
                questions = line.split("");
                firstLine = false;
            } else {
                questions = questions.filter((x) => line.includes(x));
            }
        }

        if (last) {
            yesCount += questions.length;
            console.log("Part 2 sum: " + yesCount);
        }
    });
}

part1();
part2();
