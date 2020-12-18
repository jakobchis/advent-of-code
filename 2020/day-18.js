const fs = require("fs");

const evalLeftToRight = (expression) => {
    let solved = false;
    // split into individual operations and solve left to right
    while (!solved) {
        let operatorIndexes = [];
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === "+" || expression[i] === "*") {
                operatorIndexes.push(i);
            }
        }

        if (operatorIndexes.length === 1) {
            expression = eval(expression.replace("(", "").replace(")", ""));
            solved = true;
        } else {
            let endIndex = operatorIndexes[1];
            let startIndex = expression[0] === "(" ? 1 : 0;
            let operation = expression.substring(startIndex, endIndex);
            expression = expression.replace(operation, eval(operation));
        }
    }
    return expression;
};

const part1 = () => {
    const file = fs.readFileSync("day-18.txt", "utf8");
    const lines = file.split("\n");
    let sum = 0;

    for (let line of lines) {
        console.log(line);
        // replace parentheses sections 1 by 1 until the expression can be eval()ed
        let startIndex = null;
        let endIndex = null;
        while (line.includes("(") && line.includes(")")) {
            for (let i = 0; i < line.length; i++) {
                if (line[i] === "(") {
                    startIndex = i;
                } else if (line[i] === ")") {
                    endIndex = i;
                    break;
                }
            }
            let parenthesesSection = line.substring(startIndex, endIndex + 1);
            line = line.replace(parenthesesSection, evalLeftToRight(parenthesesSection));
        }
        console.log(line);
        let answer = 0;
        answer = evalLeftToRight(line);
        sum += answer;
    }

    console.log("Part 1 sum: " + sum);
};

part1();
