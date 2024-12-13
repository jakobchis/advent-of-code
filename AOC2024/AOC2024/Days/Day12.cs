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

    public void Part02()
    {
        var grid = input.Split("\n").Select(row => row.ToCharArray().ToList()).ToList();

        var price = 0;
        var seen = new HashSet<Vector2>();
        for (var y = 0; y < grid.Count; y++)
        {
            for (var x = 0; x < grid[y].Count; x++)
            {
                var area = 1;
                var corners = 0;
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
                    // Has to be here so the first square gets counted properly
                    corners += GetCorners(top, grid);
                    List<Vector2> directions = [new(-1, 0), new(0, 1), new(1, 0), new(0, -1)];
                    foreach (var direction in directions)
                    {
                        var nextPoint = top + direction;

                        var outOfBounds = !InBounds(nextPoint, grid.Count);
                        if (outOfBounds)
                            continue;

                        var differentLetter =
                            grid[(int)nextPoint.Y][(int)nextPoint.X]
                            != grid[(int)top.Y][(int)top.X];
                        if (differentLetter)
                            continue;

                        if (!seen.Add(nextPoint))
                            continue;

                        stack.Push(nextPoint);
                        area++;
                    }
                }
                // Console.WriteLine($"Region {grid[y][x]} area {area} corners {corners}");
                price += area * corners;
            }
        }

        Console.WriteLine($"Part 2: {price}");
    }

    private int GetCorners(Vector2 point, List<List<char>> grid)
    {
        Vector2 topLeft = point + new Vector2(-1, -1);
        Vector2 topRight = point + new Vector2(1, -1);
        Vector2 bottomLeft = point + new Vector2(-1, 1);
        Vector2 bottomRight = point + new Vector2(1, 1);

        var pointChar = GetGridPoint(new Vector2(point.X, point.Y), grid);

        // Trash code starts here
        var topLeftCornerCase1 =
            GetGridPoint(new Vector2(topLeft.X, topLeft.Y + 1), grid) != pointChar
            && GetGridPoint(new Vector2(topLeft.X + 1, topLeft.Y), grid) != pointChar;
        var topLeftCornerCase2 =
            GetGridPoint(new Vector2(topLeft.X, topLeft.Y + 1), grid) == pointChar
            && GetGridPoint(new Vector2(topLeft.X + 1, topLeft.Y), grid) == pointChar
            && GetGridPoint(new Vector2(topLeft.X, topLeft.Y), grid) != pointChar;

        var topRightCornerCase1 =
            GetGridPoint(new Vector2(topRight.X, topRight.Y + 1), grid) != pointChar
            && GetGridPoint(new Vector2(topRight.X - 1, topRight.Y), grid) != pointChar;
        var topRightCornerCase2 =
            GetGridPoint(new Vector2(topRight.X, topRight.Y + 1), grid) == pointChar
            && GetGridPoint(new Vector2(topRight.X - 1, topRight.Y), grid) == pointChar
            && GetGridPoint(new Vector2(topRight.X, topRight.Y), grid) != pointChar;

        var bottomLeftCornerCase1 =
            GetGridPoint(new Vector2(bottomLeft.X + 1, bottomLeft.Y), grid) != pointChar
            && GetGridPoint(new Vector2(bottomLeft.X, bottomLeft.Y - 1), grid) != pointChar;
        var bottomLeftCornerCase2 =
            GetGridPoint(new Vector2(bottomLeft.X + 1, bottomLeft.Y), grid) == pointChar
            && GetGridPoint(new Vector2(bottomLeft.X, bottomLeft.Y - 1), grid) == pointChar
            && GetGridPoint(new Vector2(bottomLeft.X, bottomLeft.Y), grid) != pointChar;

        var bottomRightCornerCase1 =
            GetGridPoint(new Vector2(bottomRight.X - 1, bottomRight.Y), grid) != pointChar
            && GetGridPoint(new Vector2(bottomRight.X, bottomRight.Y - 1), grid) != pointChar;
        var bottomRightCornerCase2 =
            GetGridPoint(new Vector2(bottomRight.X - 1, bottomRight.Y), grid) == pointChar
            && GetGridPoint(new Vector2(bottomRight.X, bottomRight.Y - 1), grid) == pointChar
            && GetGridPoint(new Vector2(bottomRight.X, bottomRight.Y), grid) != pointChar;

        var corners = 0;
        if (topLeftCornerCase1 || topLeftCornerCase2)
            corners++;
        if (topRightCornerCase1 || topRightCornerCase2)
            corners++;
        if (bottomLeftCornerCase1 || bottomLeftCornerCase2)
            corners++;
        if (bottomRightCornerCase1 || bottomRightCornerCase2)
            corners++;

        return corners;
    }

    private char GetGridPoint(Vector2 point, List<List<char>> grid)
    {
        if (InBounds(point, grid.Count))
        {
            return grid[(int)point.Y][(int)point.X];
        }

        return '.';
    }

    private bool InBounds(Vector2 nextPoint, int gridSize)
    {
        return nextPoint.Y >= 0
            && nextPoint.Y < gridSize
            && nextPoint.X >= 0
            && nextPoint.X < gridSize;
    }
}
