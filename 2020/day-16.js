const fs = require("fs");

const between = (x, min, max) => {
    if (parseInt(x) >= parseInt(min) && parseInt(x) <= parseInt(max)) {
        return true;
    } else {
        return false;
    }
};

const part1 = () => {
    const file = fs.readFileSync("day-16.txt", "utf8");
    let lines = file.split("\n");
    const lineBreak1 = lines.find((element) => element === "");
    const rules = lines.slice(0, lines.indexOf(lineBreak1));
    lines = lines.slice(lines.indexOf(lineBreak1) + 2);
    const lineBreak2 = lines.find((element) => element === "");
    const yourTicket = lines.slice(0, lines.indexOf(lineBreak2));
    const nearbyTickets = lines.slice(lines.indexOf(lineBreak2) + 2);

    let rulesDict = {};
    for (let i = 0; i < rules.length; i++) {
        let name = rules[i].slice(0, rules[i].indexOf(":"));
        let rangeLow = rules[i].slice(rules[i].indexOf(":") + 2, rules[i].indexOf(" or"));
        let rangeHigh = rules[i].slice(rules[i].indexOf("or") + 3);
        rangeLow = rangeLow.split("-");
        rangeHigh = rangeHigh.split("-");
        rulesDict[name] = { lowMin: rangeLow[0], lowMax: rangeLow[1], highMin: rangeHigh[0], highMax: rangeHigh[1] };
    }

    let errorRate = 0;
    for (const ticket of nearbyTickets) {
        const ticketSplit = ticket.split(",");
        for (const num of ticketSplit) {
            let valid = false;
            for (const rule in rulesDict) {
                if (
                    between(num, rulesDict[rule].lowMin, rulesDict[rule].lowMax) ||
                    between(num, rulesDict[rule].highMin, rulesDict[rule].highMax)
                ) {
                    valid = true;
                    break;
                }
            }
            if (!valid) {
                errorRate += parseInt(num);
            }
        }
    }

    console.log("Part 1 error rate: " + errorRate);
};

const part2 = () => {
    const file = fs.readFileSync("day-16.txt", "utf8");
    let lines = file.split("\n");
    const lineBreak1 = lines.find((element) => element === "");
    const rules = lines.slice(0, lines.indexOf(lineBreak1));
    lines = lines.slice(lines.indexOf(lineBreak1) + 2);
    const lineBreak2 = lines.find((element) => element === "");
    const yourTicket = lines.slice(0, lines.indexOf(lineBreak2));
    const nearbyTickets = lines.slice(lines.indexOf(lineBreak2) + 2);

    let rulesDict = {};
    for (let i = 0; i < rules.length; i++) {
        let name = rules[i].slice(0, rules[i].indexOf(":"));
        let rangeLow = rules[i].slice(rules[i].indexOf(":") + 2, rules[i].indexOf(" or "));
        let rangeHigh = rules[i].slice(rules[i].indexOf(" or ") + 4);
        rangeLow = rangeLow.split("-");
        rangeHigh = rangeHigh.split("-");
        rulesDict[name] = {
            lowMin: rangeLow[0],
            lowMax: rangeLow[1],
            highMin: rangeHigh[0],
            highMax: rangeHigh[1],
            columnIndex: [],
            solved: false,
        };
    }

    let validTickets = [];
    for (const ticket of nearbyTickets) {
        const ticketSplit = ticket.split(",");
        let ticketValid = true;
        for (const num of ticketSplit) {
            let valid = false;
            for (const rule in rulesDict) {
                if (
                    between(num, rulesDict[rule].lowMin, rulesDict[rule].lowMax) ||
                    between(num, rulesDict[rule].highMin, rulesDict[rule].highMax)
                ) {
                    valid = true;
                    break;
                }
            }
            if (!valid) {
                ticketValid = false;
                break;
            }
        }
        if (ticketValid) {
            validTickets.push(ticketSplit);
        }
    }

    for (let n = 0; n < validTickets[0].length; n++) {
        let possibleRules = [];
        for (let i = 0; i < validTickets.length; i++) {
            for (const rule in rulesDict) {
                if (i === 0) {
                    if (
                        between(validTickets[i][n], rulesDict[rule].lowMin, rulesDict[rule].lowMax) ||
                        between(validTickets[i][n], rulesDict[rule].highMin, rulesDict[rule].highMax)
                    ) {
                        possibleRules.push(rule);
                    }
                } else {
                    if (
                        !between(validTickets[i][n], rulesDict[rule].lowMin, rulesDict[rule].lowMax) &&
                        !between(validTickets[i][n], rulesDict[rule].highMin, rulesDict[rule].highMax)
                    ) {
                        possibleRules.splice(possibleRules.indexOf(rule), 1);
                    }
                }
            }
        }

        for (const rule of possibleRules) {
            rulesDict[rule].columnIndex.push(n);
        }
    }

    let allSolved = false;
    let solvedColumns = [];
    while (!allSolved) {
        allSolved = true;
        for (const rule in rulesDict) {
            if (!rulesDict[rule].solved) {
                allSolved = false;
                if (rulesDict[rule].columnIndex.length === 1) {
                    rulesDict[rule].solved = true;
                    solvedColumns.push(rulesDict[rule].columnIndex[0]);
                } else {
                    for (const col of solvedColumns) {
                        if (rulesDict[rule].columnIndex.includes(col)) {
                            rulesDict[rule].columnIndex.splice(rulesDict[rule].columnIndex.indexOf(col), 1);
                        }
                    }
                }
            }
        }
    }

    let answer = 1;
    for (const rule in rulesDict) {
        if (rule.includes("departure")) {
            let yourTicketSplit = yourTicket[0].split(",");
            answer *= yourTicketSplit[rulesDict[rule].columnIndex[0]];
        }
    }
    console.log("Part 2 answer: " + answer);
};

part1();
part2();
