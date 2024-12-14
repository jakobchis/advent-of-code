using System.Numerics;

namespace AOC2024.Days;

public class Day14
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day14.txt"
    );

    private class Robot(Vector2 position, Vector2 velocity, int gridWidth, int gridHeight)
    {
        public Vector2 Position { get; set; } = position;
        private Vector2 Velocity { get; } = velocity;
        private int gridWidth { get; } = gridWidth;
        private int gridHeight { get; } = gridHeight;

        public void Move()
        {
            var newPosition = Position + Velocity;

            if (newPosition.X < 0)
            {
                newPosition.X = gridWidth + newPosition.X;
            }
            if (newPosition.X >= gridWidth)
            {
                newPosition.X = newPosition.X - gridWidth;
            }
            if (newPosition.Y < 0)
            {
                newPosition.Y = gridHeight + newPosition.Y;
            }
            if (newPosition.Y >= gridHeight)
            {
                newPosition.Y = newPosition.Y - gridHeight;
            }

            Position = newPosition;
        }
    }

    public void Part01()
    {
        var gridWidth = 101;
        var gridHeight = 103;
        var safetyFactor = 0;

        var robotStrings = input.Split("\n");
        var robots = new List<Robot>();
        foreach (var robot in robotStrings)
        {
            var position = robot
                .Split(" ")[0]
                .Replace("p=", "")
                .Split(',')
                .Select(int.Parse)
                .ToList();
            var velocity = robot
                .Split(" ")[1]
                .Replace("v=", "")
                .Split(',')
                .Select(int.Parse)
                .ToList();

            robots.Add(
                new Robot(
                    new Vector2(position[0], position[1]),
                    new Vector2(velocity[0], velocity[1]),
                    gridWidth,
                    gridHeight
                )
            );
        }

        var seconds = 100;
        for (var i = 0; i <= seconds; i++)
        {
            var grid = Enumerable
                .Range(1, gridHeight)
                .Select(i => Enumerable.Range(1, gridWidth).Select(i => 0).ToList())
                .ToList();

            foreach (var robot in robots)
            {
                if (i != 0)
                {
                    robot.Move();
                }
                var previousGridDisplay = grid[(int)robot.Position.Y][(int)robot.Position.X];
                var newGridDisplay = previousGridDisplay + 1;
                grid[(int)robot.Position.Y][(int)robot.Position.X] = newGridDisplay;
            }

            if (i == seconds)
            {
                Console.WriteLine($"Final grid after {seconds} seconds");
                foreach (var row in grid)
                {
                    Console.WriteLine(
                        new String(row.Select(x => Convert.ToChar(x.ToString())).ToArray()).Replace(
                            '0',
                            '.'
                        )
                    );
                }
            }

            var gridMidPointX = (gridWidth - 1) / 2;
            var gridMidPointY = (gridHeight - 1) / 2;
            var firstQuadrant = robots.Count(r =>
                r.Position.X < gridMidPointX && r.Position.Y < gridMidPointY
            );
            var secondQuadrant = robots.Count(r =>
                r.Position.X > gridMidPointX && r.Position.Y < gridMidPointY
            );
            var thirdQuadrant = robots.Count(r =>
                r.Position.X < gridMidPointX && r.Position.Y > gridMidPointY
            );
            var fourthQuadrant = robots.Count(r =>
                r.Position.X > gridMidPointX && r.Position.Y > gridMidPointY
            );
            safetyFactor = firstQuadrant * secondQuadrant * thirdQuadrant * fourthQuadrant;
        }

        Console.WriteLine($"Part 1: {safetyFactor}");
    }

    public void Part02()
    {
        var gridWidth = 101;
        var gridHeight = 103;
        var simulationLogPath =
            "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day14Simulation.txt";
        File.Delete(simulationLogPath);

        var robotStrings = input.Split("\n");
        var robots = new List<Robot>();
        foreach (var robot in robotStrings)
        {
            var position = robot
                .Split(" ")[0]
                .Replace("p=", "")
                .Split(',')
                .Select(int.Parse)
                .ToList();
            var velocity = robot
                .Split(" ")[1]
                .Replace("v=", "")
                .Split(',')
                .Select(int.Parse)
                .ToList();

            robots.Add(
                new Robot(
                    new Vector2(position[0], position[1]),
                    new Vector2(velocity[0], velocity[1]),
                    gridWidth,
                    gridHeight
                )
            );
        }

        var seconds = 7051; // found manually by looking for straight lines in Day14Simulation.txt
        for (var i = 0; i <= seconds; i++)
        {
            var grid = Enumerable
                .Range(1, gridHeight)
                .Select(i => Enumerable.Range(1, gridWidth).Select(i => 0).ToList())
                .ToList();

            foreach (var robot in robots)
            {
                if (i != 0)
                {
                    robot.Move();
                }
                var previousGridDisplay = grid[(int)robot.Position.Y][(int)robot.Position.X];
                var newGridDisplay = previousGridDisplay + 1;
                grid[(int)robot.Position.Y][(int)robot.Position.X] = newGridDisplay;
            }

            var lines = new List<string> { $"{i} seconds..." };
            var gridLines = grid.Select(row =>
                    new String(row.Select(x => Convert.ToChar(x.ToString())).ToArray()).Replace(
                        '0',
                        '.'
                    )
                )
                .ToList();
            lines.AddRange(gridLines);
            File.AppendAllLines(simulationLogPath, lines);

            if (i == seconds)
            {
                Console.WriteLine($"Final grid after {seconds} seconds");
                foreach (var row in grid)
                {
                    Console.WriteLine(
                        new String(row.Select(x => Convert.ToChar(x.ToString())).ToArray()).Replace(
                            '0',
                            '.'
                        )
                    );
                }
            }
        }

        Console.WriteLine($"Part 2: {seconds}");
    }
}
