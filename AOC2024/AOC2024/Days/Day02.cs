namespace AOC2024.Days;

public class Day02
{
    static string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day02.txt"
    );
    static List<List<int>> reports = input
        .Split("\n")
        .Select(line => line.Split(" ").Select(Int32.Parse).ToList())
        .ToList();

    public static void Part01()
    {
        var safeReports = 0;

        for (var y = 0; y < reports.Count; y++)
        {
            var direction = reports[y][0] < reports[y][1] ? "asc" : "desc";
            var isSafe = true;

            for (var x = 0; x < reports[y].Count - 1; x++)
            {
                if (ReportNotValid(reports[y], x, direction, ref isSafe))
                    break;
            }

            if (isSafe)
                safeReports++;
        }

        Console.WriteLine($"Part 1: {safeReports}");
    }

    public static void Part02()
    {
        var safeReports = 0;

        for (var y = 0; y < reports.Count; y++)
        {
            var xToRemove = -1;

            while (xToRemove < reports[y].Count)
            {
                var reportCopy = new List<int>(reports[y]);
                if (xToRemove > -1)
                {
                    reportCopy.RemoveAt(xToRemove);
                }

                var direction = reportCopy[0] < reportCopy[1] ? "asc" : "desc";
                var isSafe = true;

                for (var x = 0; x < reportCopy.Count - 1; x++)
                {
                    if (ReportNotValid(reportCopy, x, direction, ref isSafe))
                        break;
                }

                if (isSafe)
                {
                    safeReports++;
                    break;
                }

                xToRemove++;
            }
        }

        Console.WriteLine($"Part 2: {safeReports}");
    }

    private static bool ReportNotValid(List<int> report, int x, string direction, ref bool isSafe)
    {
        var difference = Math.Abs(report[x] - report[x + 1]);
        if (!Enumerable.Range(1, 3).Contains(difference))
        {
            isSafe = false;
            return true;
        }

        if (direction == "asc" && report[x + 1] < report[x])
        {
            isSafe = false;
            return true;
        }
        if (direction == "desc" && report[x + 1] > report[x])
        {
            isSafe = false;
            return true;
        }

        return false;
    }
}
