using System.Data;
using System.Numerics;

namespace AOC2024.Days;

public class Day15
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day15.txt"
    );

    // PART 1
    public void Part01()
    {
        var gridString = input.Split("\n\n")[0];
        var grid = gridString.Split("\n").Select(row => row.ToCharArray().ToList()).ToList();
        var movesString = input.Split("\n\n")[1];
        var moves = movesString.Replace("\n", "").ToCharArray().ToList();

        foreach (var move in moves)
        {
            var currentFishY = grid.FindIndex(r => r.Contains('@'));
            var currentFishX = grid[currentFishY].FindIndex(c => c == '@');

            var (newY, newX) = GetMoveP1(move, currentFishY, currentFishX);

            if (grid[newY][newX] == '#')
            {
                // PrintGrid(grid, move);
                continue;
            }

            var canMove = CanMoveP1(grid, currentFishY, currentFishX, move);
            if (!canMove)
                continue;

            MoveRecursivelyP1(grid, currentFishY, currentFishX, move);
            grid[currentFishY][currentFishX] = '.';
            // PrintGrid(grid, move);
        }

        var gpsCoordinateSum = 0;
        for (var y = 0; y < grid.Count; y++)
        {
            for (var x = 0; x < grid[y].Count; x++)
            {
                if (grid[y][x] == 'O')
                {
                    gpsCoordinateSum += 100 * y + x;
                }
            }
        }
        Console.WriteLine($"Part 1: {gpsCoordinateSum}");
    }

    private (int, int) GetMoveP1(char move, int currentY, int currentX)
    {
        var newY = move switch
        {
            '^' => currentY - 1,
            '>' => currentY,
            'v' => currentY + 1,
            '<' => currentY,
        };
        var newX = move switch
        {
            '^' => currentX,
            '>' => currentX + 1,
            'v' => currentX,
            '<' => currentX - 1,
        };

        return (newY, newX);
    }

    private bool CanMoveP1(List<List<char>> grid, int currentY, int currentX, char move)
    {
        var (newY, newX) = GetMoveP1(move, currentY, currentX);

        if (grid[newY][newX] == '#')
            return false;

        if (grid[newY][newX] == 'O')
        {
            return CanMoveP1(grid, newY, newX, move);
        }

        return true;
    }

    private void MoveRecursivelyP1(List<List<char>> grid, int currentY, int currentX, char move)
    {
        var (newY, newX) = GetMoveP1(move, currentY, currentX);

        if (grid[newY][newX] == 'O')
        {
            MoveRecursivelyP1(grid, newY, newX, move);
        }

        var temp = grid[newY][newX];
        grid[newY][newX] = grid[currentY][currentX];
        grid[currentY][currentX] = temp;
    }

    // PART 2
    public void Part02()
    {
        var gridString = input.Split("\n\n")[0];
        var grid = gridString
            .Split("\n")
            .Select(row =>
                row.Replace("#", "##")
                    .Replace("O", "[]")
                    .Replace(".", "..")
                    .Replace("@", "@.")
                    .ToCharArray()
                    .ToList()
            )
            .ToList();
        var movesString = input.Split("\n\n")[1];
        var moves = movesString.Replace("\n", "").ToCharArray().ToList();

        foreach (var move in moves)
        {
            var currentFishY = grid.FindIndex(r => r.Contains('@'));
            var currentFishX = grid[currentFishY].FindIndex(c => c == '@');

            var (newY, newX) = GetMoveP2(move, currentFishY, currentFishX);

            if (grid[newY][newX] == '#')
            {
                // PrintGrid(grid, move);
                continue;
            }

            var canMove = CanMoveP2(grid, currentFishY, currentFishX, move, []);
            if (!canMove)
                continue;

            MoveRecursivelyP2(grid, currentFishY, currentFishX, move, []);
            grid[currentFishY][currentFishX] = '.';
            // PrintGrid(grid, move);
        }

        var gpsCoordinateSum = 0;
        for (var y = 0; y < grid.Count; y++)
        {
            for (var x = 0; x < grid[y].Count; x++)
            {
                if (grid[y][x] == '[')
                {
                    gpsCoordinateSum += 100 * y + x;
                }
            }
        }
        Console.WriteLine($"Part 2: {gpsCoordinateSum}");
    }

    private (int, int) GetMoveP2(char move, int currentY, int currentX)
    {
        var newY = move switch
        {
            '^' => currentY - 1,
            '>' => currentY,
            'v' => currentY + 1,
            '<' => currentY,
        };
        var newX = move switch
        {
            '^' => currentX,
            '>' => currentX + 1,
            'v' => currentX,
            '<' => currentX - 1,
        };

        return (newY, newX);
    }

    private bool CanMoveP2(
        List<List<char>> grid,
        int currentY,
        int currentX,
        char move,
        List<(int, int)> visited
    )
    {
        var (newY, newX) = GetMoveP2(move, currentY, currentX);
        if (visited.Contains((newY, newX)))
        {
            return true;
        }

        visited.Add((newY, newX));

        if (grid[newY][newX] == '#')
            return false;

        if (grid[newY][newX] == '[')
        {
            return CanMoveP2(grid, newY, newX, move, visited)
                && CanMoveP2(grid, newY, newX + 1, move, visited);
        }
        if (grid[newY][newX] == ']')
        {
            return CanMoveP2(grid, newY, newX, move, visited)
                && CanMoveP2(grid, newY, newX - 1, move, visited);
        }

        return true;
    }

    private void MoveRecursivelyP2(
        List<List<char>> grid,
        int currentY,
        int currentX,
        char move,
        List<(int, int)> visited
    )
    {
        var (newY, newX) = GetMoveP2(move, currentY, currentX);
        if (visited.Contains((newY, newX)))
        {
            return;
        }

        visited.Add((newY, newX));

        if (grid[newY][newX] == '[')
        {
            MoveRecursivelyP2(grid, newY, newX, move, visited);
            MoveRecursivelyP2(grid, newY, newX + 1, move, visited);
        }
        else if (grid[newY][newX] == ']')
        {
            MoveRecursivelyP2(grid, newY, newX, move, visited);
            MoveRecursivelyP2(grid, newY, newX - 1, move, visited);
        }

        var temp = grid[newY][newX];
        grid[newY][newX] = grid[currentY][currentX];
        grid[currentY][currentX] = temp;
    }

    private void PrintGrid(List<List<char>> grid, char move)
    {
        Console.WriteLine($"Move {move}:");
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
