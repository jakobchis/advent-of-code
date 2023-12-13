using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AOC2023.Days
{
    internal class Day13
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day13.txt"
        );

        public static void Part1()
        {
            var puzzles = input.Split("\r\n\r\n").Select(p => p.Split("\r\n"));

            var horizontalReflectionTotal = 0;
            var verticalReflectionTotal = 0;

            foreach (var puzzle in puzzles)
            {
                var puzzleHeight = puzzle.Length;
                var puzzleWidth = puzzle[0].Length;

                // check for horizontal reflections
                for (var y = 0; y < puzzleHeight - 1; y++)
                {
                    var string1 = puzzle[y];
                    var string2 = puzzle[y + 1];

                    if (string1 == string2)
                    {
                        var running = true;
                        var counter = 0;
                        while (running)
                        {
                            counter += 1;
                            if (y - counter < 0 || y + 1 + counter >= puzzleHeight)
                            {
                                running = false;
                            }
                            else
                            {
                                string1 = puzzle[y - counter];
                                string2 = puzzle[y + 1 + counter];

                                if (string1 != string2)
                                {
                                    running = false;
                                    counter = 0;
                                }
                            }
                        }

                        if (counter > 0)
                        {
                            //Console.WriteLine($"horizontal reflection between {y + 1} and {y + 2}");
                            var value = y + 1;
                            //Console.WriteLine($"counter {value}");
                            horizontalReflectionTotal += value;
                        }
                    }
                }

                // check for vertical reflections
                for (var x = 0; x < puzzleWidth - 1; x++)
                {
                    var string1 = GetVerticalString(puzzle, x);
                    var string2 = GetVerticalString(puzzle, x + 1);

                    if (string1 == string2)
                    {
                        var running = true;
                        var counter = 0;
                        while (running)
                        {
                            counter += 1;
                            if (x - counter < 0 || x + 1 + counter >= puzzleWidth)
                            {
                                running = false;
                            }
                            else
                            {
                                string1 = GetVerticalString(puzzle, x - counter);
                                string2 = GetVerticalString(puzzle, x + 1 + counter);

                                if (string1 != string2)
                                {
                                    running = false;
                                    counter = 0;
                                }
                            }
                        }

                        if (counter > 0)
                        {
                            //Console.WriteLine($"vertical reflection between {x + 1} and {x + 2}");
                            var value = x + 1;
                            //Console.WriteLine($"counter {value}");
                            verticalReflectionTotal += value;
                        }
                    }
                }
            }

            Console.WriteLine(
                $"Part 1: {verticalReflectionTotal + (100 * horizontalReflectionTotal)}"
            );
        }

        public static string GetVerticalString(string[] puzzle, int x)
        {
            var tempVerticalPuzzle = "";
            for (var y = 0; y < puzzle.Length; y++)
            {
                tempVerticalPuzzle += puzzle[y][x];
            }
            return tempVerticalPuzzle;
        }

        public static void Part2()
        {
            // part 2 is impossible
        }
    }
}
