using System.Collections;
using System.Numerics;

namespace AOC2024.Days;

public class Day18
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day18.txt"
    );

    // PART 1
    public void Part01()
    {
        var gridDimension = 71;
        var bytes = input.Split("\n").Select(b => b.Split(",").Select(int.Parse).ToList()).ToList();
        var grid = Enumerable
            .Range(1, gridDimension)
            .Select(i => Enumerable.Range(1, gridDimension).Select(i => '.').ToList())
            .ToList();

        var bytesToSimulate = 1024;

        for (var i = 0; i < bytesToSimulate; i++)
        {
            var (x, y) = (bytes[i][0], bytes[i][1]);
            grid[y][x] = '#';
        }

        var shortestPathLength = Dijkstra(grid, new Vector2(0, 0));

        // Console.WriteLine($"Grid after {bytesToSimulate} bytes have fallen:");
        // foreach (var row in grid)
        // {
        //     Console.WriteLine(new String(row.ToArray()));
        // }

        Console.WriteLine($"Part 1: {shortestPathLength}");
    }

    private int Dijkstra(List<List<char>> grid, Vector2 startPosition)
    {
        List<Vector2> directions = [new(-1, 0), new(0, 1), new(1, 0), new(0, -1)];
        var endPosition = new Vector2(grid.Count - 1, grid.Count - 1);
        var costs = new Dictionary<Vector2, int>();
        costs[startPosition] = 0;
        var queue = new Queue<Vector2>();
        queue.Enqueue(startPosition);
        var visited = new HashSet<Vector2>();
        var shortestPathLength = 0;

        while (queue.Count > 0)
        {
            var position = queue.Dequeue();
            var cost = costs[position];

            if (position == endPosition)
            {
                shortestPathLength = cost;
                break;
            }

            foreach (var direction in directions)
            {
                var next = position + direction;
                if (
                    InBounds(next, grid)
                    && !visited.Contains(next)
                    && grid[(int)next.Y][(int)next.X] != '#'
                )
                {
                    visited.Add(next);
                    queue.Enqueue(next);
                    costs[next] = cost + 1;
                }
            }
        }

        return shortestPathLength;
    }

    private bool InBounds(Vector2 position, List<List<char>> grid)
    {
        return position.Y > -1
            && position.Y < grid.Count
            && position.X > -1
            && position.X < grid[0].Count;
    }

    // PART 2
    public void Part02()
    {
        var gridDimension = 71;
        var bytes = input.Split("\n").Select(b => b.Split(",").Select(int.Parse).ToList()).ToList();
        var grid = Enumerable
            .Range(1, gridDimension)
            .Select(i => Enumerable.Range(1, gridDimension).Select(i => '.').ToList())
            .ToList();

        var bytesToSimulate = 1024;
        while (true)
        {
            Console.WriteLine($"Simulating {bytesToSimulate} bytes falling");
            for (var i = 0; i < bytesToSimulate; i++)
            {
                var (x, y) = (bytes[i][0], bytes[i][1]);
                grid[y][x] = '#';
            }

            var shortestPathLength = Dijkstra(grid, new Vector2(0, 0));
            if (shortestPathLength == 0)
            {
                break;
            }

            bytesToSimulate += 1;
        }

        Console.WriteLine(
            $"Part 2: {bytes[bytesToSimulate - 1][0]},{bytes[bytesToSimulate - 1][1]}"
        );
    }
}
