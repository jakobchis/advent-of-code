namespace AOC2024.Days;

public class Day07
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day07.txt"
    );

    public void Part01()
    {
        var inputEquations = input.Split("\n");
        Int64 sumValues = 0;

        foreach (var inputEquation in inputEquations)
        {
            var splitEquation = inputEquation.Split(": ");

            var result = Int64.Parse(splitEquation[0]);
            var values = splitEquation[1].Split(" ").Select(Int64.Parse).ToList();

            if (SolvablePart1(result, values))
            {
                sumValues += result;
            }
        }

        Console.WriteLine($"Part 1: {sumValues}");
    }

    public void Part02()
    {
        var inputEquations = input.Split("\n");
        Int64 sumValues = 0;

        foreach (var inputEquation in inputEquations)
        {
            var splitEquation = inputEquation.Split(": ");

            var result = Int64.Parse(splitEquation[0]);
            var values = splitEquation[1].Split(" ").Select(Int64.Parse).ToList();

            if (SolvablePart2(result, values))
            {
                sumValues += result;
            }
        }

        Console.WriteLine($"Part 2: {sumValues}");
    }

    private bool SolvablePart1(Int64 result, List<Int64> values, Int64 current = 0, int n = 0)
    {
        if (current > result)
        {
            return false;
        }
        if (n == 0)
        {
            current = values[n];
        }
        if (n == values.Count - 1)
        {
            return current == result;
        }

        var next = values[n + 1];
        var currentAfterMultiplying = current * next;
        var currentAfterAdding = current + next;

        if (
            SolvablePart1(result, values, currentAfterMultiplying, n + 1)
            || SolvablePart1(result, values, currentAfterAdding, n + 1)
        )
        {
            return true;
        }

        return false;
    }

    private bool SolvablePart2(Int64 result, List<Int64> values, Int64 current = 0, int n = 0)
    {
        if (current > result)
        {
            return false;
        }
        if (n == 0)
        {
            current = values[n];
        }
        if (n == values.Count - 1)
        {
            return current == result;
        }

        var next = values[n + 1];
        var currentAfterMultiplying = current * next;
        var currentAfterAdding = current + next;
        var currentAfterConcatenating = Int64.Parse($"{current}{next}");

        if (
            SolvablePart2(result, values, currentAfterMultiplying, n + 1)
            || SolvablePart2(result, values, currentAfterAdding, n + 1)
            || SolvablePart2(result, values, currentAfterConcatenating, n + 1)
        )
        {
            return true;
        }

        return false;
    }
}
