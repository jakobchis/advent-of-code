namespace AOC2024.Days;

public class Day19
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day19.txt"
    );

    // PART 1
    public void Part01()
    {
        var towels = input.Split("\n\n")[0].Split(", ").ToList();
        var designs = input.Split("\n\n")[1].Split("\n").ToList();

        var memo = new Dictionary<string, long>();
        var possibleDesignsCount = 0;
        foreach (var design in designs)
        {
            var possibleTowelsCount = GetPossibleTowels(design, towels, memo);
            if (possibleTowelsCount > 0)
            {
                possibleDesignsCount++;
            }
        }

        Console.WriteLine($"Part 1: {possibleDesignsCount}");
    }

    private long GetPossibleTowels(
        string design,
        List<string> towels,
        Dictionary<string, long> memo
    )
    {
        if (design == "")
        {
            return 1;
        }

        if (memo.TryGetValue(design, out var c))
        {
            return c;
        }

        long count = 0;

        foreach (var towel in towels)
        {
            if (design.StartsWith(towel))
            {
                var trimmedDesign = design.Substring(towel.Length);
                count += GetPossibleTowels(trimmedDesign, towels, memo);
            }
        }

        memo[design] = count;

        return count;
    }

    // PART 2
    public void Part02()
    {
        var towels = input.Split("\n\n")[0].Split(", ").ToList();
        var designs = input.Split("\n\n")[1].Split("\n").ToList();

        var memo = new Dictionary<string, long>();
        long possibleDesignsSum = 0;
        foreach (var design in designs)
        {
            var possibleTowelsCount = GetPossibleTowels(design, towels, memo);
            possibleDesignsSum += possibleTowelsCount;
        }

        Console.WriteLine($"Part 2: {possibleDesignsSum}");
    }
}
