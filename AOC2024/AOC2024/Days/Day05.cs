namespace AOC2024.Days;

public class Day05
{
    static string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day05.txt"
    );

    private static List<List<int>> rules = input
        .Split("\n\n")[0]
        .Split("\n")
        .Select(line => line.Split("|").Select(int.Parse).ToList())
        .ToList();
    private static List<List<int>> pages = input
        .Split("\n\n")[1]
        .Split("\n")
        .Select(line => line.Split(",").Select(int.Parse).ToList())
        .ToList();

    public static void Part01()
    {
        var validPages = new List<List<int>>();

        foreach (var page in pages)
        {
            var isValid = true;
            foreach (var rule in rules)
            {
                var firstIndexOfRuleX = page.IndexOf(rule[0]);
                var firstIndexOfRuleY = page.IndexOf(rule[1]);

                if (firstIndexOfRuleX == -1 || firstIndexOfRuleY == -1)
                {
                    continue;
                }

                if (firstIndexOfRuleX > firstIndexOfRuleY)
                {
                    isValid = false;
                    break;
                }
            }

            if (isValid)
            {
                validPages.Add(page);
            }
        }

        var middleNumbersSum = validPages.Select(p => p[p.Count / 2]).Sum();
        Console.WriteLine($"Part 1: {middleNumbersSum}");
    }

    public static void Part02()
    {
        var invalidPages = new List<List<int>>();

        // Get the invalid pages
        foreach (var page in pages)
        {
            var isValid = true;
            foreach (var rule in rules)
            {
                var firstIndexOfRuleX = page.IndexOf(rule[0]);
                var firstIndexOfRuleY = page.IndexOf(rule[1]);

                if (firstIndexOfRuleX == -1 || firstIndexOfRuleY == -1)
                {
                    continue;
                }

                if (firstIndexOfRuleX > firstIndexOfRuleY)
                {
                    isValid = false;
                    break;
                }
            }

            if (!isValid)
            {
                invalidPages.Add(page);
            }
        }

        // Re-sort them
        foreach (var page in invalidPages)
        {
            for (int i = 0; i < rules.Count; i++)
            {
                var firstIndexOfRuleX = page.IndexOf(rules[i][0]);
                var firstIndexOfRuleY = page.IndexOf(rules[i][1]);

                if (firstIndexOfRuleX == -1 || firstIndexOfRuleY == -1)
                {
                    continue;
                }

                if (firstIndexOfRuleX > firstIndexOfRuleY)
                {
                    var temp = page[firstIndexOfRuleX];
                    page[firstIndexOfRuleX] = page[firstIndexOfRuleY];
                    page[firstIndexOfRuleY] = temp;
                    // Jump back to the first rule if we made a change and run through them all again
                    i = 0;
                }
            }
        }

        var middleNumbersSum = invalidPages.Select(p => p[p.Count / 2]).Sum();
        Console.WriteLine($"Part 2: {middleNumbersSum}");
    }
}
