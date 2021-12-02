const lineReader = require("line-reader");

function part1() {
    let validPasswords = 0;

    lineReader.eachLine("day-02.txt", function (line, last) {
        const password = line.slice(line.indexOf(": ") + 2);
        const policy = line.slice(0, line.indexOf(":"));

        const policyMin = policy.slice(0, policy.indexOf("-"));
        const policyMax = policy.slice(policy.indexOf("-") + 1, policy.indexOf(" "));
        const policyLetter = policy[policy.length - 1];

        let counter = 0;
        for (const letter of password) {
            if (letter === policyLetter) {
                counter += 1;
            }
        }

        if (counter >= policyMin && counter <= policyMax) {
            validPasswords += 1;
        }

        if (last) {
            console.log("Valid passwords: " + validPasswords);
        }
    });
}

function part2() {
    let validPasswords = 0;

    lineReader.eachLine("day-02.txt", function (line, last) {
        const password = line.slice(line.indexOf(": ") + 2);
        const policy = line.slice(0, line.indexOf(":"));

        const policyMin = policy.slice(0, policy.indexOf("-"));
        const policyMax = policy.slice(policy.indexOf("-") + 1, policy.indexOf(" "));
        const policyLetter = policy[policy.length - 1];

        if (
            (password[policyMin - 1] === policyLetter && password[policyMax - 1] !== policyLetter) ||
            (password[policyMin - 1] !== policyLetter && password[policyMax - 1] === policyLetter)
        ) {
            validPasswords += 1;
        }

        if (last) {
            console.log("Valid passwords: " + validPasswords);
        }
    });
}

part1();
part2();
