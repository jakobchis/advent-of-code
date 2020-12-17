const fs = require("fs");

const neighbors = (p) => {
    let neighbors = new Set();
    for (let nx = p[0] - 1; nx < p[0] + 2; nx++) {
        for (let ny = p[1] - 1; ny < p[1] + 2; ny++) {
            for (let nz = p[2] - 1; nz < p[2] + 2; nz++) {
                for (let nw = p[3] - 1; nw < p[3] + 2; nw++) {
                    if (nx === p[0] && ny === p[1] && nz === p[2] && nw === p[3]) {
                        continue;
                    }
                    neighbors.add([nx, ny, nz, nw].join());
                }
            }
        }
    }
    return neighbors;
};

const part1 = () => {
    // part 1 was just part 2 with one less dimension
};

const part2 = () => {
    const file = fs.readFileSync("day-17.txt", "utf8");
    const lines = file.split("\n");
    // get initial active cubes
    let cubes = new Set();
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[0].length; x++) {
            if (lines[y][x] === "#") {
                cubes.add([x, y, 0, 0].join());
            }
        }
    }

    // run 6 iterations
    for (let i = 0; i < 6; i++) {
        console.log("Running iteration " + i);
        let newCubes = new Set();
        let xs = [...cubes].map((cube) => {
            return cube.split(",")[0];
        });
        let ys = [...cubes].map((cube) => {
            return cube.split(",")[1];
        });
        let zs = [...cubes].map((cube) => {
            return cube.split(",")[2];
        });
        let ws = [...cubes].map((cube) => {
            return cube.split(",")[3];
        });
        for (let x = Math.min(...xs) - 1; x < Math.max(...xs) + 2; x++) {
            for (let y = Math.min(...ys) - 1; y < Math.max(...ys) + 2; y++) {
                for (let z = Math.min(...zs) - 1; z < Math.max(...zs) + 2; z++) {
                    for (let w = Math.min(...ws) - 1; w < Math.max(...ws) + 2; w++) {
                        let activeN = 0;
                        for (const n of neighbors([x, y, z, w])) {
                            if (cubes.has(n)) {
                                activeN += 1;
                            }
                        }
                        if (cubes.has([x, y, z, w].join())) {
                            if (activeN === 2 || activeN === 3) {
                                newCubes.add([x, y, z, w].join());
                            }
                        } else {
                            if (activeN === 3) {
                                newCubes.add([x, y, z, w].join());
                            }
                        }
                    }
                }
            }
        }
        cubes = newCubes;
    }

    console.log("Part 2 active cubes: " + cubes.size);
};

part2();
