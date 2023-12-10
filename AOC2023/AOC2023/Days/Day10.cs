using System.Collections.Generic;

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

        public static void Part2() { }
    }
}
