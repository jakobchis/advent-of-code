namespace AOC2024.Days;

public class Day01
{
    static string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day01.txt"
    );

    public static void Part01()
    {
        var pairs = input
            .Split("\n")
            .Select(line => line.Split("   ").Select(Int32.Parse).ToList())
            .ToList();

        var leftColNumbers = pairs.Select(pair => pair[0]).OrderBy(n => n).ToList();
        var rightColNumbers = pairs.Select(pair => pair[1]).OrderBy(n => n).ToList();

        var totalOfAllDistances = 0;
        for (var i = 0; i < leftColNumbers.Count; i++)
        {
            var left = leftColNumbers[i];
            var right = rightColNumbers[i];
            totalOfAllDistances += Math.Abs(left - right);
        }

        Console.WriteLine($"Part 1: {totalOfAllDistances}");
    }

    public static void Part02()
    {
        var pairs = input
            .Split("\n")
            .Select(line => line.Split("   ").Select(Int32.Parse).ToList())
            .ToList();

        var leftColNumbers = pairs.Select(pair => pair[0]).OrderBy(n => n).ToList();
        var rightColNumbers = pairs.Select(pair => pair[1]).OrderBy(n => n).ToList();

        var similarityMultipliers = new Dictionary<int, int>();
        var similarityScore = 0;
        foreach (var leftColNumber in leftColNumbers)
        {
            if (similarityMultipliers.TryGetValue(leftColNumber, out var similarityMultiplier))
            {
                similarityScore += similarityMultiplier;
            }
            else
            {
                var multiplier = rightColNumbers.Count(n => n == leftColNumber) * leftColNumber;
                similarityMultipliers[leftColNumber] = multiplier;
                similarityScore += multiplier;
            }
        }

        Console.WriteLine($"Part 2: {similarityScore}");
    }
}
