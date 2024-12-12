using System.Numerics;

namespace AOC2024.Days;

public class Day12
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day12.txt"
    );

    public void Part01()
    {
        var grid = input.Split("\n").Select(row => row.ToCharArray().ToList()).ToList();

        var price = 0;
        var seen = new HashSet<Vector2>();
        for (var y = 0; y < grid.Count; y++)
        {
            for (var x = 0; x < grid[y].Count; x++)
            {
                var area = 1;
                var perimeter = 0;
                var stack = new Stack<Vector2>();
                var point = new Vector2(x, y);
                if (!seen.Add(point))
                {
                    continue;
                }

                stack.Push(point);

                while (stack.Count > 0)
                {
                    var top = stack.Pop();
                    List<Vector2> directions = [new(-1, 0), new(0, 1), new(1, 0), new(0, -1)];
                    foreach (var direction in directions)
                    {
                        var nextPoint = top + direction;

                        var outOfBounds = !InBounds(nextPoint, grid.Count);
                        if (outOfBounds)
                        {
                            perimeter++;
                            continue;
                        }

                        var differentLetter =
                            grid[(int)nextPoint.Y][(int)nextPoint.X]
                            != grid[(int)top.Y][(int)top.X];
                        if (differentLetter)
                        {
                            perimeter++;
                            continue;
                        }

                        if (!seen.Add(nextPoint))
                        {
                            continue;
                        }

                        stack.Push(nextPoint);
                        area++;
                    }
                }
                // Console.WriteLine($"Region {grid[y][x]} area {area} perimeter {perimeter}");
                price += area * perimeter;
            }
        }

        Console.WriteLine($"Part 1: {price}");
    }

    private bool InBounds(Vector2 nextPoint, int gridSize)
    {
        return nextPoint.Y >= 0
            && nextPoint.Y < gridSize
            && nextPoint.X >= 0
            && nextPoint.X < gridSize;
    }
}
