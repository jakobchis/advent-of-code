const lineReader = require("line-reader");

function decode(line) {
    let rowRange = [...Array(128).keys()];
    let columnRange = [...Array(8).keys()];

    for (const char of line.substring(0, 7)) {
        if (char === "F") {
            rowRange.splice(rowRange.length / 2, rowRange.length / 2);
        } else if (char === "B") {
            rowRange.splice(0, rowRange.length / 2);
        }
    }

    for (const char of line.substring(7, 10)) {
        if (char === "L") {
            columnRange.splice(columnRange.length / 2, columnRange.length / 2);
        } else if (char === "R") {
            columnRange.splice(0, columnRange.length / 2);
        }
    }

    return { row: rowRange[0], column: columnRange[0], seatId: rowRange[0] * 8 + columnRange[0] };
}

function part1() {
    let highestSeatId = 0;

    lineReader.eachLine("day-05.txt", function (line, last) {
        let decodedSeat = decode(line);

        if (decodedSeat.seatId > highestSeatId) {
            highestSeatId = decodedSeat.seatId;
        }

        if (last) {
            console.log("Highest seat id: " + highestSeatId);
        }
    });
}

function part2() {
    let decodedSeats = [];
    lineReader.eachLine("day-05.txt", function (line, last) {
        let decodedSeat = decode(line);
        decodedSeats.push(decodedSeat);

        if (last) {
            decodedSeats.sort(function (a, b) {
                if (a.seatId < b.seatId) {
                    return -1;
                }
                if (a.seatId > b.seatId) {
                    return 1;
                }
                return 0;
            });

            for (let i = 1; i < decodedSeats.length; i++) {
                if (decodedSeats[i].seatId - decodedSeats[i - 1].seatId === 2) {
                    console.log(
                        "Your seat is between: " + decodedSeats[i - 1].seatId + " and " + decodedSeats[i].seatId
                    );
                }
            }
        }
    });
}

part1();
part2();
