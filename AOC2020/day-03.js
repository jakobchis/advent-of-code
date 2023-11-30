const lineReader = require("line-reader");

class Toboggan {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function part1(slope) {
    const toboggan = new Toboggan(1, 1);
    let treeCounter = 0;
    let index = 0;

    return new Promise((resolve, reject) => {
        lineReader.eachLine("day-03.txt", function (line, last) {
            index += 1;

            if (toboggan.y === index) {
                const baseLine = line;

                while (toboggan.x > line.length) {
                    line += baseLine;
                }

                if (line[toboggan.x - 1] === "#" && toboggan.y === index) {
                    treeCounter += 1;
                }

                // update position
                toboggan.x += slope.x;
                toboggan.y += slope.y;
            }

            if (last) {
                resolve(treeCounter);
            }
        });
    });
}

async function part2() {
    let answer1 = await part1({ x: 1, y: 1 });
    let answer2 = await part1({ x: 3, y: 1 });
    let answer3 = await part1({ x: 5, y: 1 });
    let answer4 = await part1({ x: 7, y: 1 });
    let answer5 = await part1({ x: 1, y: 2 });
    return answer1 * answer2 * answer3 * answer4 * answer5;
}

async function myFunction() {
    console.log("Trees encountered: " + (await part1({ x: 3, y: 1 })));
    console.log("Product: " + (await part2()));
}

myFunction();
