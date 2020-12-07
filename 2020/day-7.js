const lineReader = require("line-reader");

function readFile() {
    let rules = {};

    return new Promise((resolve, reject) => {
        lineReader.eachLine("day-7.txt", function (line, last) {
            let bag = line.split(" bags contain ")[0];
            let subBags = line.split(" bags contain ")[1].split(", ");
            subBagsObject = {};
            subBags.forEach((subBag) => {
                if (subBag === "no other bags.") {
                    subBagsObject[subBag] = 1;
                } else {
                    const bagName = format(subBag).substring(2);
                    const bagCount = parseInt(subBag.substring(0, 1));
                    subBagsObject[bagName] = bagCount;
                }
            });

            rules[bag] = subBagsObject;

            if (last) {
                // console.log(rules);
                resolve(rules);
            }
        });
    });
}

function format(bag) {
    if (bag !== "no other bags.") {
        if (bag.includes(" bags.")) {
            bag = bag.replace(" bags.", "");
        } else if (bag.includes(" bags")) {
            bag = bag.replace(" bags", "");
        } else if (bag.includes(" bag.")) {
            bag = bag.replace(" bag.", "");
        } else if (bag.includes(" bag")) {
            bag = bag.replace(" bag", "");
        }
    }
    return bag;
}

function containsColor(color, rules, bag, matched) {
    for (const subBag in rules[bag]) {
        if (subBag === color) {
            return true;
        }

        if (!matched.hasOwnProperty(subBag)) {
            matched[subBag] = true;
            if (containsColor("shiny gold", rules, subBag, matched)) {
                return true;
            }
        }
    }
}

function nestedBags(color, rules) {
    let count = 0;

    for (const subBag in rules[color]) {
        if (subBag !== "no other bags.") {
            count += rules[color][subBag];
            let nestedCount = nestedBags(subBag, rules);
            console.log(nestedCount);
            if (nestedCount > 0) {
                count += rules[color][subBag] * nestedCount;
            }
        }
    }

    return count;
}

async function part1() {
    let rules = await readFile();
    let count = 0;

    for (const bag in rules) {
        if (containsColor("shiny gold", rules, bag, {})) {
            count += 1;
        }
    }

    console.log("Part 1 count: " + count);
}

async function part2() {
    let rules = await readFile();
    let count = nestedBags("shiny gold", rules);

    console.log("Part 2 count: " + count);
}

part1();
part2();
