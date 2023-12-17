using System.Numerics;

namespace AOC2023.Days
{
    internal class Day16
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day16.txt"
        );
        static char[][] grid = input.Split("\r\n").Select(row => row.ToArray()).ToArray();

        public class Beam
        {
            public int X;
            public int Y;
            public Vector2 Velocity;
        }

        public class EnergizedTile
        {
            public int X;
            public int Y;
            public Vector2 Direction;
        }

        public static int GetEnergizedTilesCount(Beam startingBeam)
        {
            var beams = new List<Beam> { startingBeam };
            var visitedTiles = new List<EnergizedTile>();

            while (beams.Count > 0)
            {
                for (var i = 0; i < beams.Count; i++)
                {
                    var beam = beams[i];

                    beam.X += (int)beam.Velocity.X;
                    beam.Y += (int)beam.Velocity.Y;

                    // Check if beam is out of bounds
                    if (
                        beam.X == -1
                        || beam.X == grid[0].Length
                        || beam.Y == -1
                        || beam.Y == grid.Length
                    )
                    {
                        beams.Remove(beam);
                        continue;
                    }

                    // Check for energized tiles
                    var foundEnergizedTile = visitedTiles.Find(v => v.X == beam.X && v.Y == beam.Y);

                    if (foundEnergizedTile == null)
                    {
                        visitedTiles.Add(
                            new EnergizedTile
                            {
                                X = beam.X,
                                Y = beam.Y,
                                Direction = beam.Velocity
                            }
                        );
                    }
                    else
                    {
                        if (foundEnergizedTile.Direction == beam.Velocity)
                        {
                            // Remove a beam if a tile has already been energized by a beam going the same direction
                            beams.Remove(beam);
                            continue;
                        }
                    }

                    var gridTile = grid[beam.Y][beam.X];

                    // Game rules
                    if (gridTile == '.')
                    {
                        continue;
                    }
                    else if (gridTile == '/')
                    {
                        if (beam.Velocity.X != 0)
                        {
                            beam.Velocity.Y -= beam.Velocity.X;
                            beam.Velocity.X = 0;
                        }
                        else
                        {
                            beam.Velocity.X -= beam.Velocity.Y;
                            beam.Velocity.Y = 0;
                        }
                    }
                    else if (gridTile == '\\')
                    {
                        if (beam.Velocity.X != 0)
                        {
                            beam.Velocity.Y += beam.Velocity.X;
                            beam.Velocity.X = 0;
                        }
                        else
                        {
                            beam.Velocity.X += beam.Velocity.Y;
                            beam.Velocity.Y = 0;
                        }
                    }
                    else if (gridTile == '|')
                    {
                        if (beam.Velocity.Y != 0)
                        {
                            continue;
                        }
                        else
                        {
                            beams.Add(
                                new Beam
                                {
                                    X = beam.X,
                                    Y = beam.Y,
                                    Velocity = new Vector2(0, 1)
                                }
                            );
                            beams.Add(
                                new Beam
                                {
                                    X = beam.X,
                                    Y = beam.Y,
                                    Velocity = new Vector2(0, -1)
                                }
                            );
                            beams.Remove(beam);
                        }
                    }
                    else if (gridTile == '-')
                    {
                        if (beam.Velocity.X != 0)
                        {
                            continue;
                        }
                        else
                        {
                            beams.Add(
                                new Beam
                                {
                                    X = beam.X,
                                    Y = beam.Y,
                                    Velocity = new Vector2(1, 0)
                                }
                            );
                            beams.Add(
                                new Beam
                                {
                                    X = beam.X,
                                    Y = beam.Y,
                                    Velocity = new Vector2(-1, 0)
                                }
                            );
                            beams.Remove(beam);
                        }
                    }
                }
            }

            return visitedTiles.Count;
        }

        public static void Part1()
        {
            var energizedTilesCount = GetEnergizedTilesCount(
                new Beam
                {
                    X = -1,
                    Y = 0,
                    Velocity = new Vector2(1, 0)
                }
            );

            Console.WriteLine($"Part 1: {energizedTilesCount}");
        }

        public static void Part2()
        {
            var energizedTilesCounts = new List<int>();

            Parallel.For(
                0,
                grid.Length,
                (i) =>
                {
                    energizedTilesCounts.Add(
                        GetEnergizedTilesCount(
                            new Beam
                            {
                                X = i,
                                Y = -1,
                                Velocity = new Vector2(0, 1)
                            }
                        )
                    );
                    energizedTilesCounts.Add(
                        GetEnergizedTilesCount(
                            new Beam
                            {
                                X = i,
                                Y = grid.Length,
                                Velocity = new Vector2(0, -1)
                            }
                        )
                    );
                    energizedTilesCounts.Add(
                        GetEnergizedTilesCount(
                            new Beam
                            {
                                X = -1,
                                Y = i,
                                Velocity = new Vector2(1, 0)
                            }
                        )
                    );
                    energizedTilesCounts.Add(
                        GetEnergizedTilesCount(
                            new Beam
                            {
                                X = grid.Length,
                                Y = i,
                                Velocity = new Vector2(-1, 0)
                            }
                        )
                    );
                }
            );

            Console.WriteLine($"Part 2: {energizedTilesCounts.Max()}");
        }
    }
}
