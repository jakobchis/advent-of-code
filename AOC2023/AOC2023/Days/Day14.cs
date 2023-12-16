namespace AOC2023.Days
{
    internal class Day14
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day14.txt"
        );

        class Rock
        {
            public int X;
            public int Y;
        }

        public static int TheWholeThing(int CYCLE_COUNT, int DIRECTIONS_COUNT)
        {
            var grid = input
                .Split("\r\n")
                .Select(row => row.ToArray().Select(item => item.ToString()).ToList())
                .ToList();
            var rocks = new List<Rock>();
            for (var y = 0; y < grid.Count; y++)
            {
                for (var x = 0; x < grid[y].Count; x++)
                {
                    if (grid[y][x] == "O")
                    {
                        rocks.Add(new Rock() { X = x, Y = y });
                    }
                }
            }

            var directions = new Queue<string>();
            directions.Enqueue("north");
            directions.Enqueue("west");
            directions.Enqueue("south");
            directions.Enqueue("east");

            var prevRockConfigurations = new HashSet<List<string>>();

            var cycleStart = 0;
            var cycleStartRockConfiguration = new List<string>();
            var cycleLength = 0;

            for (var cycleIteration = 1; cycleIteration <= CYCLE_COUNT; cycleIteration++)
            {
                Console.WriteLine($"On cycle {cycleIteration}");

                for (
                    var directionIteration = 0;
                    directionIteration < DIRECTIONS_COUNT;
                    directionIteration++
                )
                {
                    var direction = directions.Dequeue();

                    foreach (var rock in rocks)
                    {
                        var newY = rock.Y;
                        var newX = rock.X;
                        bool running = true;
                        while (running)
                        {
                            if (direction == "north")
                            {
                                newY -= 1;
                                if (newY == -1 || grid[newY][rock.X] == "#")
                                {
                                    running = false;
                                }
                                else if (
                                    rocks.Any(
                                        existingRock =>
                                            existingRock.X == rock.X && existingRock.Y == newY
                                    )
                                )
                                {
                                    continue;
                                }
                                else
                                {
                                    rock.Y = newY;
                                }
                            }
                            else if (direction == "west")
                            {
                                newX -= 1;
                                if (newX == -1 || grid[rock.Y][newX] == "#")
                                {
                                    running = false;
                                }
                                else if (
                                    rocks.Any(
                                        existingRock =>
                                            existingRock.X == newX && existingRock.Y == rock.Y
                                    )
                                )
                                {
                                    continue;
                                }
                                else
                                {
                                    rock.X = newX;
                                }
                            }
                            else if (direction == "south")
                            {
                                newY += 1;
                                if (newY == grid.Count || grid[newY][rock.X] == "#")
                                {
                                    running = false;
                                }
                                else if (
                                    rocks.Any(
                                        existingRock =>
                                            existingRock.X == rock.X && existingRock.Y == newY
                                    )
                                )
                                {
                                    continue;
                                }
                                else
                                {
                                    rock.Y = newY;
                                }
                            }
                            else if (direction == "east")
                            {
                                newX += 1;
                                if (newX == grid[0].Count || grid[rock.Y][newX] == "#")
                                {
                                    running = false;
                                }
                                else if (
                                    rocks.Any(
                                        existingRock =>
                                            existingRock.X == newX && existingRock.Y == rock.Y
                                    )
                                )
                                {
                                    continue;
                                }
                                else
                                {
                                    rock.X = newX;
                                }
                            }
                        }
                    }

                    directions.Enqueue(direction);
                }

                var rockConfiguration = rocks
                    .Select(rock =>
                    {
                        return $"x={rock.X}y={rock.Y}";
                    })
                    .ToList();

                if (
                    cycleStart != 0
                    && cycleStartRockConfiguration.Count != 0
                    && cycleStartRockConfiguration.Intersect(rockConfiguration).Count()
                        == cycleStartRockConfiguration.Count
                )
                {
                    cycleLength = cycleIteration - cycleStart;
                    Console.WriteLine($"cycleLength = {cycleLength}");
                }

                if (
                    cycleStart == 0
                    && prevRockConfigurations.Any(
                        prc => prc.Intersect(rockConfiguration).Count() == rockConfiguration.Count()
                    )
                )
                {
                    cycleStart = cycleIteration;
                    cycleStartRockConfiguration = rockConfiguration;
                    Console.WriteLine($"cycleStart = {cycleStart}");
                }
                else
                {
                    prevRockConfigurations.Add(rockConfiguration);
                }
            }

            var total = rocks.Aggregate(
                0,
                (acc, curr) =>
                {
                    var flippedY = grid.Count - curr.Y;
                    return acc + flippedY;
                }
            );
            return total;
        }

        public static void Part1()
        {
            const int CYCLE_COUNT = 1;
            const int DIRECTIONS_COUNT = 1;

            var total = TheWholeThing(CYCLE_COUNT, DIRECTIONS_COUNT);
            Console.WriteLine($"Part 1: {total}");
        }

        public static void Part2()
        {
            // Use logs to figure out cycleStart and cycleLength
            // Run the simulation ((1 000 000 000 - cycleStart) % cycleLength) + cycleStart) times to get the answer
            const int CYCLE_COUNT = 132;
            const int DIRECTIONS_COUNT = 4;

            var total = TheWholeThing(CYCLE_COUNT, DIRECTIONS_COUNT);
            Console.WriteLine($"Part 2: {total}");
        }
    }
}
