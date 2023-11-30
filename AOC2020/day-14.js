const fs = require("fs");

const readFile = () => {
    const file = fs.readFileSync("day-14.txt", "utf8");
    const lines = file.split("\n");
    let steps = [];
    let step = {};
    let re = /(?<=\[)(.*?)(?=\])/;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("mask")) {
            step["mask"] = lines[i].split("= ")[1];
            step["operations"] = [];
        } else {
            // operations: [{ address: value }]
            step["operations"].push({ [lines[i].match(re)[0]]: lines[i].split("= ")[1] });
        }

        if (i + 1 === lines.length || lines[i + 1].includes("mask")) {
            steps.push(step);
            step = {};
        }
    }

    return steps;
};

const createBinaryString = (number) => {
    const length = 36;
    let newNumber = number.toString(2);
    while (newNumber.length < length) {
        newNumber = "0" + newNumber;
    }
    return newNumber;
};

const part1 = () => {
    const steps = readFile();
    // { address: value }
    let memory = {};
    let sum = 0;

    for (const step of steps) {
        for (const operation of step["operations"]) {
            for (const address in operation) {
                let binaryVal = createBinaryString(parseInt(operation[address])).split("");
                for (let i = 0; i < binaryVal.length; i++) {
                    if (step["mask"][i] === "1") {
                        binaryVal[i] = "1";
                    } else if (step["mask"][i] === "0") {
                        binaryVal[i] = "0";
                    }
                }
                binaryVal = binaryVal.join("");
                memory[address] = parseInt(binaryVal, 2);
            }
        }
    }

    for (const address in memory) {
        sum += memory[address];
    }
    console.log("Part 1 sum: " + sum);
};

const part2 = () => {
    const steps = readFile();
    // { address: value }
    let memory = {};
    let sum = 0;

    for (const step of steps) {
        for (const operation of step["operations"]) {
            for (const originalAddress in operation) {
                const originalAddressBinary = createBinaryString(parseInt(originalAddress));
                let addresses = [""];
                for (let i = 0; i < originalAddressBinary.length; i++) {
                    if (step["mask"][i] === "1") {
                        for (let n = 0; n < addresses.length; n++) {
                            addresses[n] += "1";
                        }
                    } else if (step["mask"][i] === "0") {
                        for (let n = 0; n < addresses.length; n++) {
                            addresses[n] += originalAddressBinary[i];
                        }
                    } else if (step["mask"][i] === "X") {
                        let newAddresses = [];
                        for (let n = 0; n < addresses.length; n++) {
                            newAddresses.push(addresses[n] + "0");
                            newAddresses.push(addresses[n] + "1");
                        }
                        addresses = newAddresses;
                    }
                }

                for (const address of addresses) {
                    memory[parseInt(address, 2)] = parseInt(operation[originalAddress]);
                }
            }
        }
    }

    for (const address in memory) {
        sum += memory[address];
    }
    console.log("Part 2 sum: " + sum);
};

part1();
part2();
