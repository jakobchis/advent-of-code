using System.Numerics;

namespace AOC2024.Days;

public class Day11
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day11.txt"
    );

    public void Part01()
    {
        var blinks = 25;
        var stones = input.Split(" ").Select(Int64.Parse).ToList();
        var stoneCount = 0;
        for (var a = 0; a < blinks; a++)
        {
            var tempStones = new List<long>();
            for (var b = 0; b < stones.Count; b++)
            {
                if (stones[b] == 0)
                {
                    tempStones.Add(1);
                }
                else if (stones[b].ToString().Length % 2 == 0)
                {
                    var stoneString = stones[b].ToString();
                    var newStoneA = Int64.Parse(stoneString.Substring(0, stoneString.Length / 2));
                    var newStoneB = Int64.Parse(stoneString.Substring(stoneString.Length / 2));

                    tempStones.Add(newStoneA);
                    tempStones.Add(newStoneB);
                }
                else
                {
                    tempStones.Add(stones[b] * 2024);
                }
            }
            stones = tempStones;
            stoneCount = tempStones.Count;
        }

        Console.WriteLine($"Part 1: {stoneCount}");
    }

    public void Part02()
    {
        var blinks = 75;
        var stones = input.Split(" ").Select(Int64.Parse).ToList();
        var stoneCount = 0;
        var memo = new Dictionary<long, List<long>>();

        // go through each stone blinks number of times
        // memoize the value of each stone after blinks
        // use that value on future loops to avoid calculating

        // for (var b = 0; b < stones.Count; b++)
        // {
        //     var stoneCount = 0;
        //     for (var a = 0; a < blinks; a++)
        //     {
        //         if (stones[b] == 0)
        //         {
        //             tempStones.Add(1);
        //             memo.Add(stones[b], [1]);
        //         }
        //         else if (stones[b].ToString().Length % 2 == 0)
        //         {
        //             var stoneString = stones[b].ToString();
        //             var newStoneA = Int64.Parse(stoneString.Substring(0, stoneString.Length / 2));
        //             var newStoneB = Int64.Parse(stoneString.Substring(stoneString.Length / 2));
        //
        //             tempStones.Add(newStoneA);
        //             tempStones.Add(newStoneB);
        //             memo.Add(stones[b], [newStoneA, newStoneB]);
        //         }
        //         else
        //         {
        //             tempStones.Add(stones[b] * 2024);
        //             memo.Add(stones[b], [stones[b] * 2024]);
        //         }
        //     }
        //
        //     memo.Add(stones[b], );
        // }

        // for (var a = 0; a < blinks; a++)
        // {
        //     Console.WriteLine($"Blink {a}");
        //     var tempStones = new List<long>();
        //     for (var b = 0; b < stones.Count; b++)
        //     {
        //         if (memo.TryGetValue(stones[b], out var value))
        //         {
        //             tempStones.AddRange(value);
        //         }
        //         else if (stones[b] == 0)
        //         {
        //             tempStones.Add(1);
        //             memo.Add(stones[b], [1]);
        //         }
        //         else if (stones[b].ToString().Length % 2 == 0)
        //         {
        //             var stoneString = stones[b].ToString();
        //             var newStoneA = Int64.Parse(stoneString.Substring(0, stoneString.Length / 2));
        //             var newStoneB = Int64.Parse(stoneString.Substring(stoneString.Length / 2));
        //
        //             tempStones.Add(newStoneA);
        //             tempStones.Add(newStoneB);
        //             memo.Add(stones[b], [newStoneA, newStoneB]);
        //         }
        //         else
        //         {
        //             tempStones.Add(stones[b] * 2024);
        //             memo.Add(stones[b], [stones[b] * 2024]);
        //         }
        //     }
        //     stones = tempStones;
        //     stoneCount = tempStones.Count;
        // }

        Console.WriteLine($"Part 2: {stoneCount}");
    }
}
