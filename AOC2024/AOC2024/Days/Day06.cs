namespace AOC2024.Days;

public class Day06
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day06.txt"
    );

    public List<Point> Part01()
    {
        var grid = input.Split("\n").Select(line => line.ToCharArray().ToList()).ToList();
        var startingY = grid.FindIndex(row => row.Contains('^'));
        var startingX = grid[startingY].FindIndex(c => c == '^');
        var guard = new Guard(startingY, startingX, Direction.Up);

        var distinctVisitedPoints = new List<Point> { guard };

        while (true)
        {
            var nextPosition = GetNextPosition(guard);
            if (!InBounds(nextPosition, grid))
            {
                break;
            }

            if (grid[nextPosition.y][nextPosition.x] == '#')
            {
                guard.TurnRight();
            }
            else
            {
                if (grid[nextPosition.y][nextPosition.x] == '.')
                {
                    distinctVisitedPoints.Add(nextPosition);
                    grid[nextPosition.y][nextPosition.x] = 'X';
                }
                guard.y = nextPosition.y;
                guard.x = nextPosition.x;
            }
        }

        return distinctVisitedPoints;
    }

    public void Part02()
    {
        var distinctVisitedPoints = Part01();

        var cyclesFound = 0;

        foreach (var point in distinctVisitedPoints)
        {
            var grid = input.Split("\n").Select(line => line.ToCharArray().ToList()).ToList();
            var startingY = grid.FindIndex(row => row.Contains('^'));
            var startingX = grid[startingY].FindIndex(c => c == '^');
            var guard = new Guard(startingY, startingX, Direction.Up);

            grid[point.y][point.x] = '#';

            var visitedPointsWithDirection = new HashSet<string>();

            while (true)
            {
                var nextPosition = GetNextPosition(guard);
                if (!InBounds(nextPosition, grid))
                {
                    break;
                }

                if (grid[nextPosition.y][nextPosition.x] == '#')
                {
                    guard.TurnRight();
                }
                else
                {
                    if (
                        visitedPointsWithDirection.Contains(
                            $"{nextPosition.y}-{nextPosition.x}-{guard.direction}"
                        )
                    )
                    {
                        cyclesFound++;
                        break;
                    }

                    guard.y = nextPosition.y;
                    guard.x = nextPosition.x;
                    visitedPointsWithDirection.Add(
                        $"{nextPosition.y}-{nextPosition.x}-{guard.direction}"
                    );
                }
            }
        }

        Console.WriteLine($"Part 2: {cyclesFound}");
    }

    private enum Direction
    {
        Up,
        Right,
        Down,
        Left,
    }

    public class Point
    {
        public int y { get; set; }
        public int x { get; set; }

        public Point(int y, int x)
        {
            this.y = y;
            this.x = x;
        }
    }

    private class Guard : Point
    {
        public Direction direction { get; set; }

        public Guard(int y, int x, Direction direction)
            : base(y, x)
        {
            this.direction = direction;
        }

        public void TurnRight()
        {
            if (direction == Direction.Left)
            {
                direction = Direction.Up;
            }
            else
            {
                direction += 1;
            }
        }
    }

    private bool InBounds(Point point, List<List<char>> grid)
    {
        return point.y > -1 && point.y < grid.Count && point.x > -1 && point.x < grid[0].Count;
    }

    private Point GetNextPosition(Guard guard)
    {
        var nextPosition = new Point(guard.y, guard.x);
        switch (guard.direction)
        {
            case Direction.Up:
                nextPosition.y -= 1;
                break;
            case Direction.Down:
                nextPosition.y += 1;
                break;
            case Direction.Right:
                nextPosition.x += 1;
                break;
            case Direction.Left:
                nextPosition.x -= 1;
                break;
        }

        return nextPosition;
    }
}
