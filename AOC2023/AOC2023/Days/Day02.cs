namespace AOC2023.Days
{
    internal class Day02
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day02.txt"
        );

        public static void Part1()
        {
            var maxCounts = new Dictionary<string, int>
            {
                { "red", 12 },
                { "green", 13 },
                { "blue", 14 }
            };

            var games = input.CoolerSplit("\r\n");
            int gameIdsSum = 0;
            foreach (var game in games)
            {
                bool gameIsValid = true;
                var gameId = game.CoolerSplit(": ")[0].CoolerSplit(" ")[1];
                var allCubes = game.CoolerSplit(": ")[1];
                var cubeSubsets = allCubes.CoolerSplit("; ");
                foreach (var cubeSubset in cubeSubsets)
                {
                    var cubeSubsetCubes = cubeSubset.CoolerSplit(", ");
                    foreach (var cubeSubsetCube in cubeSubsetCubes)
                    {
                        var cubeCount = int.Parse(cubeSubsetCube.CoolerSplit(" ")[0]);
                        var cubeColour = cubeSubsetCube.CoolerSplit(" ")[1];
                        int value;
                        if (maxCounts.TryGetValue(cubeColour, out value))
                        {
                            if (cubeCount > value)
                            {
                                gameIsValid = false;
                            }
                        }
                    }
                }

                if (gameIsValid)
                {
                    gameIdsSum += int.Parse(gameId);
                }
            }

            Console.WriteLine($"Part 1: {gameIdsSum}");
        }

        public static void Part2()
        {
            var games = input.CoolerSplit("\r\n");
            int gamePowersSum = 0;
            foreach (var game in games)
            {
                var highestCountSeen = new Dictionary<string, int>
                {
                    { "red", 0 },
                    { "green", 0 },
                    { "blue", 0 }
                };
                var gameId = game.CoolerSplit(": ")[0].CoolerSplit(" ")[1];
                var allCubes = game.CoolerSplit(": ")[1];
                var cubeSubsets = allCubes.CoolerSplit("; ");
                foreach (var cubeSubset in cubeSubsets)
                {
                    var cubeSubsetCubes = cubeSubset.CoolerSplit(", ");
                    foreach (var cubeSubsetCube in cubeSubsetCubes)
                    {
                        var cubeCount = int.Parse(cubeSubsetCube.CoolerSplit(" ")[0]);
                        var cubeColour = cubeSubsetCube.CoolerSplit(" ")[1];
                        int value;
                        if (highestCountSeen.TryGetValue(cubeColour, out value))
                        {
                            if (cubeCount > value)
                            {
                                highestCountSeen[cubeColour] = cubeCount;
                            }
                        }
                    }
                }

                var gamePower = highestCountSeen.Values.Aggregate(1, (acc, v) => acc *= v);
                gamePowersSum += gamePower;
            }

            Console.WriteLine($"Part 2: {gamePowersSum}");
        }
    }
}
