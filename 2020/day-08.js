const fs = require("fs");

const readFile = () => {
    const file = fs.readFileSync("day-8.txt", "utf8");
    let instructions = [];

    for (const line of file.split("\n")) {
        const split = line.split(" ");
        instructions.push({
            operation: split[0],
            argument: parseInt(split[1]),
        });
    }

    return instructions;
};

const part1 = () => {
    const instructions = readFile();
    let accumulator = 0;
    let visited = [];

    for (let i = 0; i < instructions.length; i++) {
        if (visited.includes(instructions[i]) || i === instructions.length - 1) {
            break;
        } else {
            visited.push(instructions[i]);

            if (instructions[i].operation === "acc") {
                accumulator += instructions[i].argument;
            } else if (instructions[i].operation === "jmp") {
                // subtract 1 because the loop iterates by 1 already
                i += instructions[i].argument - 1;
            }
        }
    }

    console.log("Part 1 accumulator: " + accumulator);
};

const part2 = () => {
    const instructions = readFile();
    let accumulator = 0;
    let visited = [];
    let swapLine = 0;
    let running = true;

    while (running) {
        visited = [];
        accumulator = 0;

        for (let i = 0; i < instructions.length; i++) {
            if (i === instructions.length - 1) {
                running = false;
            } else if (visited.includes(instructions[i])) {
                swapLine += 1;
                break;
            } else {
                visited.push(instructions[i]);
                let operation = instructions[i].operation;

                if (i === swapLine) {
                    if (operation === "jmp") {
                        operation = "nop";
                    } else if (operation === "nop") {
                        operation = "jmp";
                    }
                }

                if (operation === "acc") {
                    accumulator += instructions[i].argument;
                } else if (operation === "jmp") {
                    // subtract 1 because the loop iterates by 1 already
                    i += instructions[i].argument - 1;
                }
            }
        }
    }

    console.log("Part 2 accumulator: " + accumulator);
};

part1();
part2();
