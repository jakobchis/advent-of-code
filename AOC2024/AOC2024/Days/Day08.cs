using System.Numerics;

namespace AOC2024.Days;

public class Day08
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day08.txt"
    );

    public void Part01()
    {
        var grid = input.Split("\n").Select(row => row.ToCharArray()).ToArray();
        var antinodes = new List<Vector2>();

        for (var y = 0; y < grid.Length; y++)
        {
            for (var x = 0; x < grid[y].Length; x++)
            {
                if (grid[y][x] != '.')
                {
                    LookForAntinodePart1(grid, new Vector2(x, y), ref antinodes);
                }
            }
        }

        foreach (var antinode in antinodes)
        {
            grid[(int)antinode.Y][(int)antinode.X] = '#';
        }

        foreach (var row in grid)
        {
            Console.WriteLine(row);
        }
        Console.WriteLine($"Part 1: {antinodes.Count}");
    }

    public void Part02()
    {
        var grid = input.Split("\n").Select(row => row.ToCharArray()).ToArray();
        var antinodes = new List<Vector2>();

        for (var y = 0; y < grid.Length; y++)
        {
            for (var x = 0; x < grid[y].Length; x++)
            {
                if (grid[y][x] != '.')
                {
                    LookForAntinodePart2(grid, new Vector2(x, y), ref antinodes);
                }
            }
        }

        foreach (var antinode in antinodes)
        {
            grid[(int)antinode.Y][(int)antinode.X] = '#';
        }

        foreach (var row in grid)
        {
            Console.WriteLine(row);
        }
        Console.WriteLine($"Part 2: {antinodes.Count}");
    }

    private void LookForAntinodePart1(char[][] grid, Vector2 antenna, ref List<Vector2> antinodes)
    {
        for (var y = 0; y < grid.Length; y++)
        {
            for (var x = 0; x < grid[y].Length; x++)
            {
                if (y == (int)antenna.Y && x == (int)antenna.X)
                {
                    continue;
                }

                if (grid[y][x] == grid[(int)antenna.Y][(int)antenna.X])
                {
                    var antenna2 = new Vector2(x, y);
                    var difference = antenna2 - antenna;
                    var antinode = antenna2 + difference;

                    if (
                        InBounds(antinode, grid.Length)
                        && !antinodes.Any(an => an.X == antinode.X && an.Y == antinode.Y)
                    )
                    {
                        antinodes.Add(antinode);
                    }
                }
            }
        }
    }

    private void LookForAntinodePart2(char[][] grid, Vector2 antenna, ref List<Vector2> antinodes)
    {
        for (var y = 0; y < grid.Length; y++)
        {
            for (var x = 0; x < grid[y].Length; x++)
            {
                if (y == (int)antenna.Y && x == (int)antenna.X)
                {
                    continue;
                }

                if (grid[y][x] == grid[(int)antenna.Y][(int)antenna.X])
                {
                    var antenna2 = new Vector2(x, y);
                    var difference = antenna2 - antenna;
                    var antinode = antenna2;

                    while (true)
                    {
                        if (!InBounds(antinode, grid.Length))
                        {
                            break;
                        }

                        if (!antinodes.Any(an => an.X == antinode.X && an.Y == antinode.Y))
                        {
                            antinodes.Add(antinode);
                        }

                        antinode += difference;
                    }
                }
            }
        }
    }

    private bool InBounds(Vector2 point, int gridSize)
    {
        return point.Y > -1 && point.Y < gridSize && point.X > -1 && point.X < gridSize;
    }
}
