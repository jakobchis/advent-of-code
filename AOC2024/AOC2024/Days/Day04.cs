namespace AOC2024.Days;

public class Day04
{
    static string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day04.txt"
    );
    static string[][] grid = input
        .Split("\n")
        .Select(line => line.ToCharArray().Select(c => c.ToString()).ToArray())
        .ToArray();

    public static void Part01()
    {
        int[][] directions =
        [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];

        var total = 0;

        for (int row = 0; row < grid.Length; row++)
        {
            for (int col = 0; col < grid[row].Length; col++)
            {
                if (grid[row][col] != "X")
                    continue;

                foreach (var dir in directions)
                {
                    try
                    {
                        var m = grid[row + dir[0]][col + dir[1]];
                        var a = grid[row + dir[0] * 2][col + dir[1] * 2];
                        var s = grid[row + dir[0] * 3][col + dir[1] * 3];

                        if (m == "M" && a == "A" && s == "S")
                        {
                            total++;
                        }
                    }
                    catch (IndexOutOfRangeException) { }
                }
            }
        }

        Console.WriteLine($"Part 1: {total}");
    }

    public static void Part02()
    {
        int[] topRight = [-1, 1];
        int[] topLeft = [-1, -1];
        int[] bottomRight = [1, 1];
        int[] bottomLeft = [1, -1];

        var total = 0;

        for (int row = 0; row < grid.Length; row++)
        {
            for (int col = 0; col < grid[row].Length; col++)
            {
                if (grid[row][col] != "A")
                    continue;

                try
                {
                    var firstMas =
                        (
                            grid[row + topRight[0]][col + topRight[1]] == "M"
                            && grid[row + bottomLeft[0]][col + bottomLeft[1]] == "S"
                        )
                        || (
                            grid[row + topRight[0]][col + topRight[1]] == "S"
                            && grid[row + bottomLeft[0]][col + bottomLeft[1]] == "M"
                        );
                    var secondMas =
                        (
                            grid[row + topLeft[0]][col + topLeft[1]] == "M"
                            && grid[row + bottomRight[0]][col + bottomRight[1]] == "S"
                        )
                        || (
                            grid[row + topLeft[0]][col + topLeft[1]] == "S"
                            && grid[row + bottomRight[0]][col + bottomRight[1]] == "M"
                        );
                    if (firstMas && secondMas)
                    {
                        total++;
                    }
                }
                catch (IndexOutOfRangeException) { }
            }
        }

        Console.WriteLine($"Part 2: {total}");
    }
}
