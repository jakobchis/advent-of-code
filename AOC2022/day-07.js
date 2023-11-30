import { readFileSync } from "fs";
import lodash from "lodash";

const testData = readFileSync("day-07.txt", "utf8").split("\n");

let depthArray = [];
let rootFileSystem = {};
let inListMode = false;

for (let i = 0; i < testData.length; i += 1) {
  if (testData[i].includes("$ cd")) {
    inListMode = false;

    if (testData[i].includes("$ cd /")) {
      depthArray.push("/");
    } else if (testData[i].includes("$ cd ..")) {
      depthArray.pop();
    } else {
      depthArray.push(testData[i].split(" ")[2]);
    }

    continue;
  }

  if (testData[i].includes("$ ls")) {
    inListMode = true;
    continue;
  }

  if (inListMode) {
    if (!lodash.get(rootFileSystem, depthArray)) {
      lodash.set(rootFileSystem, depthArray, {});
    }
    if (!testData[i].includes("dir")) {
      const prevFilesArray = lodash.get(rootFileSystem, [
        ...depthArray,
        "files",
      ]);
      let newFilesArray = [];
      if (prevFilesArray && prevFilesArray.length) {
        newFilesArray = [...prevFilesArray, testData[i]];
      } else {
        newFilesArray = [testData[i]];
      }

      lodash.set(rootFileSystem, [...depthArray, "files"], newFilesArray);

      let tempDepth = [];
      depthArray.forEach((depth) => {
        tempDepth.push(depth);
        const prevFilesSize =
          lodash.get(rootFileSystem, [...tempDepth, "filesSize"]) ?? 0;

        lodash.set(
          rootFileSystem,
          [...tempDepth, "filesSize"],
          prevFilesSize + Number(testData[i].split(" ")[0])
        );
      });
    }
  }
}

const part1 = () => {
  const findDirectories = (startingDir) => {
    let foundDirectories = [];

    Object.entries(startingDir).forEach(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        foundDirectories.push(...findDirectories(value));
      }

      if (key === "filesSize" && value <= 100000) {
        foundDirectories.push(value);
      }
    });

    return foundDirectories;
  };

  const foundDirectories = findDirectories(rootFileSystem);
  return foundDirectories.reduce((acc, curr) => acc + curr, 0);
};

const part2 = () => {
  const spaceNeeded = 30000000 - (70000000 - rootFileSystem["/"].filesSize);

  const findDirectories = (startingDir) => {
    let foundDirectories = [];

    Object.entries(startingDir).forEach(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        foundDirectories.push(...findDirectories(value));
      }

      if (key === "filesSize" && value >= spaceNeeded) {
        foundDirectories.push(value);
      }
    });

    return foundDirectories;
  };

  const foundDirectories = findDirectories(rootFileSystem);
  return foundDirectories.sort((a, b) => a - b)[0];
};

console.log(part1());
console.log(part2());
