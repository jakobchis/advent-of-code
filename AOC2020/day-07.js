const fs = require("fs");

const format = (bag) => {
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
};

const containsColor = (color, rules, bag, matched) => {
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
};

const numberOfNestedBags = (color, rules) => {
    let count = 0;

    for (const subBag in rules[color]) {
        if (subBag !== "no other bags.") {
            count += rules[color][subBag];
            let nestedCount = numberOfNestedBags(subBag, rules);
            if (nestedCount > 0) {
                count += rules[color][subBag] * nestedCount;
            }
        }
    }

    return count;
};

const readFile = () => {
    const file = fs.readFileSync("day-07.txt", "utf8");
    let rules = {};

    for (const line of file.split("\n")) {
        const bag = line.split(" bags contain ")[0];
        const subBags = line.split(" bags contain ")[1].split(", ");
        let subBagsObject = {};

        subBags.forEach((subBag) => {
            if (subBag === "no other bags.") {
                subBagsObject[subBag] = 0;
            } else {
                const bagName = format(subBag).substring(2);
                const bagCount = parseInt(subBag.substring(0, 1));
                subBagsObject[bagName] = bagCount;
            }
        });

        rules[bag] = subBagsObject;
    }

    return rules;
};

const part1 = () => {
    const rules = readFile();
    let count = 0;

    for (const bag in rules) {
        if (containsColor("shiny gold", rules, bag, {})) {
            count += 1;
        }
    }

    console.log("Part 1 count: " + count);
};

const part2 = () => {
    const rules = readFile();
    let count = numberOfNestedBags("shiny gold", rules);
    console.log("Part 2 count: " + count);
};

part1();
part2();
