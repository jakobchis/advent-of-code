const lineReader = require("line-reader");

function checkPresent(passport) {
    if (
        passport.includes("byr") &&
        passport.includes("iyr") &&
        passport.includes("eyr") &&
        passport.includes("hgt") &&
        passport.includes("hcl") &&
        passport.includes("ecl") &&
        passport.includes("pid")
    ) {
        return true;
    } else {
        return false;
    }
}

function checkValid(passportString) {
    let passport = {};
    let properties = passportString.split(" ");
    properties.pop();

    for (const property of properties) {
        let keyVal = property.split(":");
        passport[keyVal[0]] = keyVal[1];
    }

    const byr = passport["byr"];
    if (byr > 2002 || byr < 1920) {
        return false;
    }

    const iyr = passport["iyr"];
    if (iyr > 2020 || iyr < 2010) {
        return false;
    }

    const eyr = passport["eyr"];
    if (eyr > 2030 || eyr < 2020) {
        return false;
    }

    const hgt = passport["hgt"];
    if (hgt.includes("cm")) {
        const hgtValue = passport["hgt"].substring(0, passport["hgt"].indexOf("c"));
        if (hgtValue > 193 || hgtValue < 150) {
            return false;
        }
    } else if (hgt.includes("in")) {
        const hgtValue = passport["hgt"].substring(0, passport["hgt"].indexOf("i"));
        if (hgtValue > 76 || hgtValue < 59) {
            return false;
        }
    } else {
        return false;
    }

    const hcl = passport["hcl"];
    if (!hcl.includes("#") || hcl.length !== 7) {
        return false;
    }

    const validHairColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    const ecl = passport["ecl"];
    if (!validHairColors.includes(ecl)) {
        return false;
    }

    const pid = passport["pid"];
    if (pid.length !== 9) {
        return false;
    }

    return true;
}

function part1() {
    let validPassports = 0;
    let currentPassport = "";

    lineReader.eachLine("day-04.txt", function (line, last) {
        if (line === "") {
            if (checkPresent(currentPassport)) {
                validPassports += 1;
            }

            currentPassport = "";
        } else {
            currentPassport += line;
            currentPassport += " ";
        }

        if (last) {
            if (checkPresent(currentPassport)) {
                validPassports += 1;
            }

            console.log("Present passports: " + validPassports);
        }
    });
}

function part2() {
    let validPassports = 0;
    let currentPassport = "";

    lineReader.eachLine("day-04.txt", function (line, last) {
        if (line === "") {
            if (checkPresent(currentPassport) && checkValid(currentPassport)) {
                validPassports += 1;
            }

            currentPassport = "";
        } else {
            currentPassport += line;
            currentPassport += " ";
        }

        if (last) {
            if (checkPresent(currentPassport) && checkValid(currentPassport)) {
                validPassports += 1;
            }

            console.log("Valid passports: " + validPassports);
        }
    });
}

part1();
part2();
