using System.Collections;
using System.Numerics;

namespace AOC2024.Days;

public class Day20
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day20.txt"
    );

    // PART 1
    public void Part01()
    {
        var grid = input.Split("\n").Select(row => row.ToCharArray().ToList()).ToList();

        var startY = grid.FindIndex(row => row.Contains('S'));
        var startX = grid[startY].IndexOf('S');
        var startPos = new Vector2(startX, startY);
        var endY = grid.FindIndex(row => row.Contains('E'));
        var endX = grid[endY].IndexOf('E');
        var endPos = new Vector2(endX, endY);

        List<Vector2> directions = [new(-1, 0), new(0, 1), new(1, 0), new(0, -1)];

        var (_, visited) = Dijkstra(grid, startPos, endPos, directions);

        Dictionary<int, int> timeSavedCounts = new();
        foreach (var node in visited)
        {
            var laterVisitedNodes = visited.Where(v =>
            {
                var isDifferentNode = v != node;
                var isWithinBounds = Math.Abs(v.X - node.X) <= 2 && Math.Abs(v.Y - node.Y) <= 2;

                return isDifferentNode && isWithinBounds;
            });

            foreach (var laterVisitedNode in laterVisitedNodes)
            {
                var (shortestPath, _) = Dijkstra(grid, node, laterVisitedNode, directions, false);

                if (shortestPath <= 2)
                {
                    var (timeSaved, _) = Dijkstra(grid, node, laterVisitedNode, directions);
                    timeSaved -= 2; // -2 for the time the cheat takes
                    if (timeSaved > 0)
                    {
                        timeSavedCounts.TryGetValue(timeSaved, out int time);
                        timeSavedCounts[timeSaved] = time + 1;
                    }
                }
            }
        }

        timeSavedCounts = timeSavedCounts.OrderBy(cts => cts.Key).ToDictionary();
        // TODO figure out why counts are doubled up
        var answer = timeSavedCounts.Where(cts => cts.Key >= 100).Sum(cts => cts.Value / 2);

        Console.WriteLine($"Part 1: {answer}");
    }

    // PART 2
    public void Part02()
    {
        var grid = input.Split("\n").Select(row => row.ToCharArray().ToList()).ToList();

        var startY = grid.FindIndex(row => row.Contains('S'));
        var startX = grid[startY].IndexOf('S');
        var startPos = new Vector2(startX, startY);
        var endY = grid.FindIndex(row => row.Contains('E'));
        var endX = grid[endY].IndexOf('E');
        var endPos = new Vector2(endX, endY);

        List<Vector2> directions = [new(-1, 0), new(0, 1), new(1, 0), new(0, -1)];

        var (_, visited) = Dijkstra(grid, startPos, endPos, directions);

        Dictionary<int, int> timeSavedCounts = new();
        var visitedList = new Queue<Vector2>();
        foreach (var v in visited)
        {
            visitedList.Enqueue(v);
        }

        while (visitedList.Count > 0)
        {
            var visitedNode = visitedList.Dequeue();
            Console.WriteLine($"Checking node {visitedNode}");
            // var laterVisitedNodes = visitedList
            //     .GetRange(i + 1, visitedList.Count - i - 1)
            //     .Where(v =>
            //     {
            //         var isDifferentNode = v != node;
            //         var isWithinBounds =
            //             Math.Abs(v.X - node.X) <= 20 && Math.Abs(v.Y - node.Y) <= 20;
            //
            //         return isDifferentNode && isWithinBounds;
            //     });

            var laterVisitedNodes = visitedList;

            foreach (var laterVisitedNode in laterVisitedNodes)
            {
                var isWithinBounds = Vector2.Distance(visitedNode, laterVisitedNode) <= 20;
                if (!isWithinBounds)
                {
                    continue;
                }

                var (shortestPath, _) = Dijkstra(
                    grid,
                    visitedNode,
                    laterVisitedNode,
                    directions,
                    false
                );

                if (shortestPath <= 20)
                {
                    var (timeSaved, _) = Dijkstra(grid, visitedNode, laterVisitedNode, directions);
                    timeSaved -= shortestPath; // -2 for the time the cheat takes
                    if (timeSaved > 0)
                    {
                        timeSavedCounts.TryGetValue(timeSaved, out int time);
                        timeSavedCounts[timeSaved] = time + 1;
                    }
                }
            }
        }

        timeSavedCounts = timeSavedCounts.OrderBy(cts => cts.Key).ToDictionary();
        var answer = timeSavedCounts.Where(cts => cts.Key >= 100).Sum(cts => cts.Value);

        // TODO make it faster, memoization?
        // 1004388 too low
        Console.WriteLine($"Part 2: {answer}");
    }

    private bool InBounds(Vector2 position, List<List<char>> grid)
    {
        return position.Y > -1
            && position.Y < grid.Count
            && position.X > -1
            && position.X < grid[0].Count;
    }

    private (int, HashSet<Vector2>) Dijkstra(
        List<List<char>> grid,
        Vector2 startPos,
        Vector2 endPos,
        List<Vector2> directions,
        bool collision = true
    )
    {
        var costs = new Dictionary<Vector2, int> { [startPos] = 0 };
        var queue = new Queue<Vector2>();
        queue.Enqueue(startPos);
        var visited = new HashSet<Vector2>();
        var shortestPath = 0;

        while (queue.Count > 0)
        {
            var node = queue.Dequeue();
            var cost = costs[node];

            if (node == endPos)
            {
                shortestPath = cost;
                break;
            }

            foreach (var direction in directions)
            {
                var next = node + direction;
                if (
                    InBounds(next, grid)
                    && !visited.Contains(next)
                    && (!collision || grid[(int)next.Y][(int)next.X] != '#')
                )
                {
                    visited.Add(next);
                    queue.Enqueue(next);
                    costs[next] = cost + 1;
                }
            }
        }

        return (shortestPath, visited);
    }
}
