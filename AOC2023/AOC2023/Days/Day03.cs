using System.Dynamic;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

namespace AOC2023.Days
{
    internal class Day03
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day03.txt"
        );

        class NumberObj
        {
            public int StartX;
            public int EndX;
            public int Y;
        }

        static bool HasAdjacentSymbol(NumberObj numberObj, string[] grid)
        {
            var foundSymbol = false;
            var symbolRegex = new Regex(@"(?![0-9.]).");

            for (var y = numberObj.Y - 1; y < numberObj.Y + 2; y++)
            {
                for (var x = numberObj.StartX - 1; x < numberObj.EndX + 2; x++)
                {
                    if (y > -1 && y < grid.Length && x > -1 && x < grid[0].Length)
                    {
                        if (symbolRegex.IsMatch(grid[y][x].ToString()))
                        {
                            foundSymbol = true;
                            break;
                        }
                    }
                }

                if (foundSymbol)
                {
                    break;
                }
            }

            return foundSymbol;
        }

        public static void Part1()
        {
            var numberRegex = new Regex(@"[0-9]+");
            var grid = input.Split("\r\n");
            var partNumberSum = 0;
            for (var y = 0; y < grid[0].Length; y++)
            {
                var numbers = numberRegex.Matches(grid[y]).ToList();
                foreach (var number in numbers)
                {
                    var numberObj = new NumberObj
                    {
                        StartX = number.Index,
                        EndX = number.Index + number.Length - 1,
                        Y = y
                    };

                    if (HasAdjacentSymbol(numberObj, grid))
                    {
                        partNumberSum += int.Parse(number.Value);
                    }
                }
            }

            Console.WriteLine($"Part 1: {partNumberSum}");
        }

        static (int, int) GetAdjacentGear(NumberObj numberObj, string[] grid)
        {
            var gearY = -1;
            var gearX = -1;

            for (var y = numberObj.Y - 1; y < numberObj.Y + 2; y++)
            {
                for (var x = numberObj.StartX - 1; x < numberObj.EndX + 2; x++)
                {
                    if (y > -1 && y < grid.Length && x > -1 && x < grid[0].Length)
                    {
                        if (grid[y][x].ToString() == "*")
                        {
                            gearY = y;
                            gearX = x;
                            break;
                        }
                    }
                }

                if (gearY > -1 && gearX > -1)
                {
                    break;
                }
            }

            return (gearY, gearX);
        }

        public static void Part2()
        {
            var numberRegex = new Regex(@"[0-9]+");
            var grid = input.Split("\r\n");
            var potentialGears = new Dictionary<string, List<int>>();
            for (var y = 0; y < grid[0].Length; y++)
            {
                var numbers = numberRegex.Matches(grid[y]).ToList();
                foreach (var number in numbers)
                {
                    var numberObj = new NumberObj
                    {
                        StartX = number.Index,
                        EndX = number.Index + number.Length - 1,
                        Y = y
                    };

                    var (gearY, gearX) = GetAdjacentGear(numberObj, grid);
                    if (gearY == -1 && gearX == -1)
                    {
                        continue;
                    }

                    if (potentialGears.ContainsKey($"Gear {gearY}-{gearX}"))
                    {
                        potentialGears[$"Gear {gearY}-{gearX}"].Add(int.Parse(number.Value));
                    }
                    else
                    {
                        potentialGears[$"Gear {gearY}-{gearX}"] = new List<int>
                        {
                            int.Parse(number.Value)
                        };
                    }
                }
            }

            var gearRatioSum = potentialGears
                .Where(g => g.Value.Count == 2)
                .Select(g => g.Value[0] * g.Value[1])
                .Sum();
            Console.WriteLine($"Part 2: {gearRatioSum}");
        }
    }
}
