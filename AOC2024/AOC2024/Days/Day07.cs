namespace AOC2024.Days;

public class Day07
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day07.txt"
    );

    public void Part01()
    {
        var inputEquations = input.Split("\n");
        Int64 sumResults = 0;

        foreach (var inputEquation in inputEquations)
        {
            var splitEquation = inputEquation.Split(": ");

            var result = Int64.Parse(splitEquation[0]);
            var values = splitEquation[1].Split(" ").Select(Int64.Parse).ToList();

            if (SolvablePart1(result, values, values[0]))
            {
                sumResults += result;
            }
        }

        Console.WriteLine($"Part 1: {sumResults}");
    }

    public void Part02()
    {
        var inputEquations = input.Split("\n");
        Int64 sumResults = 0;

        foreach (var inputEquation in inputEquations)
        {
            var splitEquation = inputEquation.Split(": ");

            var result = Int64.Parse(splitEquation[0]);
            var values = splitEquation[1].Split(" ").Select(Int64.Parse).ToList();

            if (SolvablePart2(result, values, values[0]))
            {
                sumResults += result;
            }
        }

        Console.WriteLine($"Part 2: {sumResults}");
    }

    private bool SolvablePart1(Int64 result, List<Int64> values, Int64 current, int n = 0)
    {
        if (current > result)
            return false;
        if (n == values.Count - 1)
            return current == result;

        var currentAfterAdding = current + values[n + 1];
        var currentAfterMultiplying = current * values[n + 1];

        return SolvablePart1(result, values, currentAfterAdding, n + 1)
            || SolvablePart1(result, values, currentAfterMultiplying, n + 1);
    }

    private bool SolvablePart2(Int64 result, List<Int64> values, Int64 current, int n = 0)
    {
        if (current > result)
            return false;
        if (n == values.Count - 1)
            return current == result;

        var currentAfterAdding = current + values[n + 1];
        var currentAfterMultiplying = current * values[n + 1];
        var currentAfterConcatenating = Int64.Parse($"{current}{values[n + 1]}");

        return SolvablePart2(result, values, currentAfterAdding, n + 1)
            || SolvablePart2(result, values, currentAfterMultiplying, n + 1)
            || SolvablePart2(result, values, currentAfterConcatenating, n + 1);
    }
}
