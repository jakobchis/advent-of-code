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
        Console.WriteLine($"Part 1: {GetAnswer(2)}");
    }

    // PART 2
    public void Part02()
    {
        Console.WriteLine($"Part 2: {GetAnswer(20)}");
    }

    private int GetAnswer(int cheatSize)
    {
        var grid = input.Split("\n").Select(row => row.ToCharArray().ToList()).ToList();

        var startY = grid.FindIndex(row => row.Contains('S'));
        var startX = grid[startY].IndexOf('S');
        var startPos = new Vector2(startX, startY);
        var endY = grid.FindIndex(row => row.Contains('E'));
        var endX = grid[endY].IndexOf('E');
        var endPos = new Vector2(endX, endY);

        List<Vector2> directions = [new(-1, 0), new(0, 1), new(1, 0), new(0, -1)];

        var (_, visited) = Dijkstra(grid, startPos, endPos, directions, collision: true);

        Dictionary<int, int> timeSavedCounts = new();
        var visitedQueue = new Queue<Vector2>();
        foreach (var v in visited)
        {
            visitedQueue.Enqueue(v);
        }

        while (visitedQueue.Count > 0)
        {
            var visitedNode = visitedQueue.Dequeue();

            foreach (var laterVisitedNode in visitedQueue)
            {
                var isWithinBounds = Vector2.Distance(visitedNode, laterVisitedNode) <= cheatSize;
                if (!isWithinBounds)
                {
                    continue;
                }

                var (shortestPathWithoutCollision, _) = Dijkstra(
                    grid,
                    visitedNode,
                    laterVisitedNode,
                    directions,
                    collision: false
                );

                if (shortestPathWithoutCollision <= cheatSize)
                {
                    var (shortestPathWithCollision, _) = Dijkstra(grid, visitedNode, laterVisitedNode, directions, collision: true);
                    var timeSaved = shortestPathWithCollision - shortestPathWithoutCollision;
                    if (timeSaved > 0)
                    {
                        timeSavedCounts.TryGetValue(timeSaved, out int count);
                        timeSavedCounts[timeSaved] = count + 1;
                    }
                }
            }
        }

        var answer = timeSavedCounts.Where(cts => cts.Key >= 100).Sum(cts => cts.Value);

        return answer;
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
        bool collision
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
