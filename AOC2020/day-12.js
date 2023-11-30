const fs = require("fs");

const readFile = () => {
    const file = fs.readFileSync("day-12.txt", "utf8");
    const lines = file.split("\n");
    let directions = [];

    for (let n = 0; n < lines.length; n++) {
        let direction = { action: "", value: 0 };
        direction.action = lines[n][0];
        direction.value = parseInt(lines[n].slice(1));
        directions.push(direction);
    }

    return directions;
};

const part1 = () => {
    const directions = readFile();
    // east = 90, south = 180, west = 270, north = 360
    let ship = { facing: 90, x: 0, y: 0 };
    let difference = 0;

    for (const dir of directions) {
        switch (dir.action) {
            case "N":
                ship.y += dir.value;
                break;
            case "S":
                ship.y -= dir.value;
                break;
            case "E":
                ship.x += dir.value;
                break;
            case "W":
                ship.x -= dir.value;
                break;
            case "L":
                difference = ship.facing - dir.value;
                // can't let facing become 0, should be 360
                if (difference <= 0) {
                    ship.facing = difference + 360;
                } else {
                    ship.facing -= dir.value;
                }
                break;
            case "R":
                difference = ship.facing + dir.value;
                if (difference > 360) {
                    ship.facing = difference - 360;
                } else {
                    ship.facing += dir.value;
                }
                break;
            case "F":
                switch (ship.facing) {
                    case 90:
                        ship.x += dir.value;
                        break;
                    case 180:
                        ship.y -= dir.value;
                        break;
                    case 270:
                        ship.x -= dir.value;
                        break;
                    case 360:
                        ship.y += dir.value;
                        break;
                }
                break;
        }
    }

    console.log("Part 1 manhattan distance: " + (Math.abs(ship.x) + Math.abs(ship.y)));
};

const part2 = () => {
    const directions = readFile();
    let ship = { x: 0, y: 0 };
    let waypoint = { x: 10, y: 1 };

    for (const dir of directions) {
        switch (dir.action) {
            case "N":
                waypoint.y += dir.value;
                break;
            case "S":
                waypoint.y -= dir.value;
                break;
            case "E":
                waypoint.x += dir.value;
                break;
            case "W":
                waypoint.x -= dir.value;
                break;
            case "L":
                for (let i = 0; i < dir.value / 90; i++) {
                    let temp = waypoint.x;
                    waypoint.x = -waypoint.y;
                    waypoint.y = temp;
                }
                break;
            case "R":
                for (let i = 0; i < dir.value / 90; i++) {
                    let temp = waypoint.x;
                    waypoint.x = waypoint.y;
                    waypoint.y = -temp;
                }
                break;
            case "F":
                ship.x += dir.value * waypoint.x;
                ship.y += dir.value * waypoint.y;
                break;
        }
    }

    console.log("Part 2 manhattan distance: " + (Math.abs(ship.x) + Math.abs(ship.y)));
};

part1();
part2();
