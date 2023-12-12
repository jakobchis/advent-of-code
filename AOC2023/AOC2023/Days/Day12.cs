using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AOC2023.Days
{
    internal class Day12
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day12.txt"
        );

        public static void Part1()
        {
            var possibilitiesSum = 0;
            var rows = input.Split("\r\n").Select(row => row.Split(" ")).ToList();

            var parallelOptions = new ParallelOptions()
            {
                MaxDegreeOfParallelism = Environment.ProcessorCount
            };
            Parallel.For(
                0,
                rows.Count,
                parallelOptions,
                (index) =>
                {
                    Console.WriteLine($"On row {index}");

                    var springs = rows[index][0];
                    var groupSizes = rows[index][1]
                        .Split(",")
                        .Select(size => int.Parse(size))
                        .ToList();

                    char[] possibleChars = { '#', '.' };
                    var possibleStrings = GetAllStringsOfKLength(possibleChars, springs.Length);

                    foreach (var possibility in possibleStrings)
                    {
                        var couldBeValid = true;

                        // check non-"?" characters match the original string
                        for (int i = 0; i < springs.Length; i++)
                        {
                            if (
                                springs[i].ToString() != "?"
                                && possibility[i].ToString() != springs[i].ToString()
                            )
                            {
                                couldBeValid = false;
                                break;
                            }
                        }

                        var groups = possibility.Split(".").Where(g => g.Count() != 0).ToList();

                        // check same number of groups
                        if (groupSizes.Count != groups.Count)
                        {
                            couldBeValid = false;
                        }
                        else
                        {
                            // check group sizes all match the order of the required group sizes
                            for (int i = 0; i < groupSizes.Count; i++)
                            {
                                if (groupSizes[i] != groups[i].Length)
                                {
                                    couldBeValid = false;
                                    break;
                                }
                            }
                        }

                        if (couldBeValid)
                        {
                            possibilitiesSum += 1;
                        }
                    }
                }
            );

            Console.WriteLine($"Part 1: {possibilitiesSum}");
        }

        static List<string> GetAllStringsOfKLength(char[] possibleChars, int k)
        {
            var possibleStrings = new List<string>();
            GetAllStringsOfKLengthRecursive(possibleChars, "", k, possibleStrings);

            return possibleStrings;
        }

        static void GetAllStringsOfKLengthRecursive(
            char[] possibleChars,
            string stringBase,
            int k,
            List<string> possibleStrings
        )
        {
            if (k == 0)
            {
                possibleStrings.Add(stringBase);
                return;
            }

            for (int i = 0; i < possibleChars.Length; ++i)
            {
                string newStringBase = stringBase + possibleChars[i];
                GetAllStringsOfKLengthRecursive(
                    possibleChars,
                    newStringBase,
                    k - 1,
                    possibleStrings
                );
            }
        }

        public static void Part2()
        {
            // part 2 is impossible
        }
    }
}
