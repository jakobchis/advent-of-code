using System.Text.RegularExpressions;

namespace AOC2024.Days;

public class Day03
{
    static string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day03.txt"
    );

    public static void Part01()
    {
        var total = 0;
        var mulRegex = new Regex(@"mul\(\d+,\d+\)");
        var instructions = mulRegex.Matches(input);

        foreach (var instruction in instructions)
        {
            var numbers = instruction
                .ToString()
                .Replace("mul(", "")
                .Replace(")", "")
                .Split(",")
                .Select(int.Parse)
                .ToArray();
            total += (numbers[0] * numbers[1]);
        }

        Console.WriteLine($"Part 1: {total}");
    }

    public static void Part02()
    {
        var total = 0;
        var mulRegex = new Regex(@"mul\(\d+,\d+\)");
        var doRegex = new Regex(@"do\(\)");
        var dontRegex = new Regex(@"don't\(\)");

        var slidingWindow = "";
        var doMode = true;
        for (var a = 0; a < input.Length; a++)
        {
            slidingWindow += input[a];

            if (doRegex.Match(slidingWindow).Success)
            {
                doMode = true;
                slidingWindow = "";
            }
            else if (dontRegex.Match(slidingWindow).Success)
            {
                doMode = false;
                slidingWindow = "";
            }
            else if (doMode && mulRegex.Match(slidingWindow).Success)
            {
                var numbers = mulRegex
                    .Match(slidingWindow)
                    .ToString()
                    .Replace("mul(", "")
                    .Replace(")", "")
                    .Split(",")
                    .Select(int.Parse)
                    .ToArray();
                total += (numbers[0] * numbers[1]);
                slidingWindow = "";
            }
        }

        Console.WriteLine($"Part 2: {total}");
    }
}
