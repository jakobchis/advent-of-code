using System.Numerics;

namespace AOC2024.Days;

public class Day10
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day10.txt"
    );

    public void Part01()
    {
        var grid = input.Split("\n").Select(row => row.ToCharArray().ToList()).ToList();
        var trailheadScore = 0;

        for (int y = 0; y < grid.Count; y++)
        {
            for (int x = 0; x < grid.Count; x++)
            {
                if (grid[y][x] != '0')
                {
                    continue;
                }

                var stack = new Stack<Vector2>();
                stack.Push(new Vector2(x, y));
                var seen = new HashSet<Vector2>();

                while (stack.Count > 0)
                {
                    var currentPoint = stack.Pop();
                    if (!seen.Add(currentPoint))
                    {
                        continue;
                    }
                    if (grid[(int)currentPoint.Y][(int)currentPoint.X] == '9')
                    {
                        trailheadScore++;
                        continue;
                    }
                    List<Vector2> directions = [new(-1, 0), new(0, 1), new(1, 0), new(0, -1)];

                    foreach (var direction in directions)
                    {
                        var nextPoint = currentPoint + direction;
                        if (!InBounds(nextPoint, grid.Count))
                        {
                            continue;
                        }

                        var nextPointHeight = int.Parse(
                            grid[(int)nextPoint.Y][(int)nextPoint.X].ToString()
                        );
                        var currentPointHeight = int.Parse(
                            grid[(int)currentPoint.Y][(int)currentPoint.X].ToString()
                        );
                        if (nextPointHeight == currentPointHeight + 1)
                        {
                            stack.Push(nextPoint);
                        }
                    }
                }
            }
        }

        Console.WriteLine($"Part 1: {trailheadScore}");
    }

    public void Part02()
    {
        var grid = input.Split("\n").Select(row => row.ToCharArray().ToList()).ToList();
        var trailheadScore = 0;

        for (int y = 0; y < grid.Count; y++)
        {
            for (int x = 0; x < grid.Count; x++)
            {
                if (grid[y][x] != '0')
                {
                    continue;
                }

                var stack = new Stack<Vector2>();
                stack.Push(new Vector2(x, y));

                while (stack.Count > 0)
                {
                    var currentPoint = stack.Pop();
                    if (grid[(int)currentPoint.Y][(int)currentPoint.X] == '9')
                    {
                        trailheadScore++;
                        continue;
                    }
                    List<Vector2> directions = [new(-1, 0), new(0, 1), new(1, 0), new(0, -1)];

                    foreach (var direction in directions)
                    {
                        var nextPoint = currentPoint + direction;
                        if (!InBounds(nextPoint, grid.Count))
                        {
                            continue;
                        }

                        var nextPointHeight = int.Parse(
                            grid[(int)nextPoint.Y][(int)nextPoint.X].ToString()
                        );
                        var currentPointHeight = int.Parse(
                            grid[(int)currentPoint.Y][(int)currentPoint.X].ToString()
                        );
                        if (nextPointHeight == currentPointHeight + 1)
                        {
                            stack.Push(nextPoint);
                        }
                    }
                }
            }
        }

        Console.WriteLine($"Part 2: {trailheadScore}");
    }

    private bool InBounds(Vector2 nextPoint, int gridSize)
    {
        return nextPoint.Y >= 0
            && nextPoint.Y < gridSize
            && nextPoint.X >= 0
            && nextPoint.X < gridSize;
    }
}
