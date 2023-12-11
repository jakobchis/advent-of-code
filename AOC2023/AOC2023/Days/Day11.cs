using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AOC2023.Days
{
    internal class Day11
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day11.txt"
        );

        public class Galaxy
        {
            public int X;
            public int Y;
            public int Number;
        }

        public static long TheWholeThing(int rowColDiff)
        {
            var nodeGrid = input
                .Split("\r\n")
                .Select(row => row.ToArray().Select(col => col.ToString()).ToList())
                .ToList();
            var counter = 0;
            var galaxies = new List<Galaxy>();

            for (int y = 0; y < nodeGrid.Count; y++)
            {
                for (int x = 0; x < nodeGrid.Count; x++)
                {
                    if (nodeGrid[y][x] != "#")
                    {
                        continue;
                    }

                    counter += 1;
                    galaxies.Add(
                        new Galaxy
                        {
                            Y = y,
                            X = x,
                            Number = counter
                        }
                    );
                }
            }

            var shortestPaths = new List<long>();

            for (int i = 0; i < galaxies.Count; i++)
            {
                for (int j = i + 1; j < galaxies.Count; j++)
                {
                    var lowestX = Math.Min(galaxies[i].X, galaxies[j].X);
                    var highestX = Math.Max(galaxies[i].X, galaxies[j].X);

                    var lowestY = Math.Min(galaxies[i].Y, galaxies[j].Y);
                    var highestY = Math.Max(galaxies[i].Y, galaxies[j].Y);

                    long shortestPath = Math.Abs((lowestX - highestX) + (lowestY - highestY));

                    for (int x = lowestX + 1; x < highestX; x++)
                    {
                        bool empty = true;
                        for (int y = 0; y < nodeGrid.Count; y++)
                        {
                            var node = nodeGrid[y][x];
                            if (node != ".")
                            {
                                empty = false;
                                break;
                            }
                        }

                        if (empty)
                        {
                            shortestPath += rowColDiff;
                        }
                    }

                    for (int y = lowestY + 1; y < highestY; y++)
                    {
                        bool empty = true;
                        for (int x = 0; x < nodeGrid.Count; x++)
                        {
                            var node = nodeGrid[y][x];
                            if (node != ".")
                            {
                                empty = false;
                                break;
                            }
                        }

                        if (empty)
                        {
                            shortestPath += rowColDiff;
                        }
                    }

                    shortestPaths.Add(shortestPath);
                }
            }

            return shortestPaths.Sum();
        }

        public static void Part1()
        {
            const int EMPTY_ROW_COL_DIFF = 1;
            Console.WriteLine($"Part 1: {TheWholeThing(EMPTY_ROW_COL_DIFF)}");
        }

        public static void Part2()
        {
            // Only difference in part 2 is how many empty rows/cols you add into the grid
            const int EMPTY_ROW_COL_DIFF = 999999;
            Console.WriteLine($"Part 2: {TheWholeThing(EMPTY_ROW_COL_DIFF)}");
        }
    }
}
