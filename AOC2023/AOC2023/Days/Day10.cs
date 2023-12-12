using System.Collections.Generic;
using static AOC2023.Days.Day10;

namespace AOC2023.Days
{
    internal class Day10
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day10.txt"
        );

        public class Node
        {
            public string Symbol = "";
            public int Y;
            public int X;
        }

        public static void Part1()
        {
            var nodeGrid = input
                .Split("\r\n")
                .Select(
                    (row, rowIndex) =>
                        row.ToArray()
                            .Select(
                                (col, colIndex) =>
                                    new Node
                                    {
                                        Y = rowIndex,
                                        X = colIndex,
                                        Symbol = col.ToString()
                                    }
                            )
                            .ToList()
                )
                .ToList();
            var filledNodes = new List<Node>();
            var startingNode = new Node();

            foreach (var nodeRow in nodeGrid)
            {
                foreach (var nodeCol in nodeRow)
                {
                    if (nodeCol.Symbol == "S")
                    {
                        startingNode.X = nodeCol.X;
                        startingNode.Y = nodeCol.Y;
                        startingNode.Symbol = "7"; // hardcoded by looking at input
                    }
                }
            }

            var queue = new Queue<Node>();
            queue.Enqueue(startingNode);

            while (queue.Count > 0)
            {
                var node = queue.Dequeue();

                if (filledNodes.Find(n => n.Y == node.Y && n.X == node.X) != null)
                {
                    continue;
                }

                filledNodes.Add(node);

                switch (node.Symbol)
                {
                    case "|":
                        queue.Enqueue(nodeGrid[node.Y - 1][node.X]);
                        queue.Enqueue(nodeGrid[node.Y + 1][node.X]);
                        break;
                    case "-":
                        queue.Enqueue(nodeGrid[node.Y][node.X - 1]);
                        queue.Enqueue(nodeGrid[node.Y][node.X + 1]);
                        break;
                    case "L":
                        queue.Enqueue(nodeGrid[node.Y - 1][node.X]);
                        queue.Enqueue(nodeGrid[node.Y][node.X + 1]);
                        break;
                    case "J":
                        queue.Enqueue(nodeGrid[node.Y - 1][node.X]);
                        queue.Enqueue(nodeGrid[node.Y][node.X - 1]);
                        break;
                    case "7":
                        queue.Enqueue(nodeGrid[node.Y + 1][node.X]);
                        queue.Enqueue(nodeGrid[node.Y][node.X - 1]);
                        break;
                    case "F":
                        queue.Enqueue(nodeGrid[node.Y + 1][node.X]);
                        queue.Enqueue(nodeGrid[node.Y][node.X + 1]);
                        break;
                    case ".":
                        break;
                    case "S":
                        break;
                }
            }

            Console.WriteLine($"Part 1: {filledNodes.Count / 2}");
        }

        public static void Part2()
        {
            var nodeGrid = input
                .Split("\r\n")
                .Select(
                    (row, rowIndex) =>
                        row.ToArray()
                            .Select(
                                (col, colIndex) =>
                                    new Node
                                    {
                                        Y = rowIndex,
                                        X = colIndex,
                                        Symbol = col.ToString()
                                    }
                            )
                            .ToList()
                )
                .ToList();
            var loopNodes = new List<Node>();
            var startingNode = new Node();

            foreach (var nodeRow in nodeGrid)
            {
                foreach (var nodeCol in nodeRow)
                {
                    if (nodeCol.Symbol == "S")
                    {
                        startingNode.X = nodeCol.X;
                        startingNode.Y = nodeCol.Y;
                        startingNode.Symbol = "7"; // hardcoded by looking at input
                    }
                }
            }

            var queue = new Queue<Node>();
            queue.Enqueue(startingNode);

            while (queue.Count > 0)
            {
                var node = queue.Dequeue();

                if (loopNodes.Find(n => n.Y == node.Y && n.X == node.X) != null)
                {
                    continue;
                }

                loopNodes.Add(node);

                switch (node.Symbol)
                {
                    case "|":
                        queue.Enqueue(nodeGrid[node.Y - 1][node.X]);
                        queue.Enqueue(nodeGrid[node.Y + 1][node.X]);
                        break;
                    case "-":
                        queue.Enqueue(nodeGrid[node.Y][node.X - 1]);
                        queue.Enqueue(nodeGrid[node.Y][node.X + 1]);
                        break;
                    case "L":
                        queue.Enqueue(nodeGrid[node.Y - 1][node.X]);
                        queue.Enqueue(nodeGrid[node.Y][node.X + 1]);
                        break;
                    case "J":
                        queue.Enqueue(nodeGrid[node.Y - 1][node.X]);
                        queue.Enqueue(nodeGrid[node.Y][node.X - 1]);
                        break;
                    case "7":
                        queue.Enqueue(nodeGrid[node.Y + 1][node.X]);
                        queue.Enqueue(nodeGrid[node.Y][node.X - 1]);
                        break;
                    case "F":
                        queue.Enqueue(nodeGrid[node.Y + 1][node.X]);
                        queue.Enqueue(nodeGrid[node.Y][node.X + 1]);
                        break;
                    case ".":
                        break;
                    case "S":
                        break;
                }
            }

            var numNodesInsideLoop = 0;
            for (int y = 0; y < nodeGrid.Count; y++)
            {
                for (int x = 0; x < nodeGrid[y].Count; x++)
                {
                    var boundaryIntersections = 0;
                    if (
                        loopNodes.Find(n => n.Y == nodeGrid[y][x].Y && n.X == nodeGrid[y][x].X)
                        != null
                    )
                    {
                        // skip nodes that we know are part of the loop
                        continue;
                    }

                    var incrementor = 1;
                    while (y + incrementor < nodeGrid.Count && x + incrementor < nodeGrid[y].Count)
                    {
                        var foundNode = loopNodes.Find(
                            n =>
                                n.Y == nodeGrid[y + incrementor][x + incrementor].Y
                                && n.X == nodeGrid[y + incrementor][x + incrementor].X
                        );

                        if (foundNode != null && foundNode.Symbol != "L" && foundNode.Symbol != "7")
                        {
                            // ignore L and 7 nodes because they are corner cases I guess?
                            boundaryIntersections += 1;
                        }

                        incrementor += 1;
                    }

                    if (boundaryIntersections % 2 != 0)
                    {
                        // odd number of intersections means it is within the loop
                        numNodesInsideLoop += 1;
                    }
                }
            }

            Console.WriteLine($"Part 2: {numNodesInsideLoop}");
        }
    }
}
