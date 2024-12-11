namespace AOC2024.Days;

public class Day11
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day11.txt"
    );

    public void Part01()
    {
        var stones = input.Split(" ").Select(Int64.Parse).ToList();
        var stoneCount = 0;

        var blinks = 25;
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
        var inputStones = input.Split(" ").Select(Int64.Parse).ToList();
        var stones = new Dictionary<long, long>();

        foreach (var stone in inputStones)
        {
            // Stones is a map of stone : count
            // Rules only get calculated once per unique stone in the map
            // Each iteration has a fresh list of stones with only the counts carried over
            stones.Add(stone, 1);
        }

        var blinks = 75;
        for (var a = 0; a < blinks; a++)
        {
            stones = Iterate(stones);
        }

        Console.WriteLine($"Part 2: {stones.Values.Sum()}");
    }

    private Dictionary<long, long> Iterate(Dictionary<long, long> oldStones)
    {
        var newStones = new Dictionary<long, long>();
        foreach (var oldStone in oldStones)
        {
            if (oldStone.Key == 0)
            {
                if (!newStones.TryAdd(1, oldStone.Value))
                {
                    newStones[1] += oldStone.Value;
                }
            }
            else if (oldStone.Key.ToString().Length % 2 == 0)
            {
                var oldStoneString = oldStone.Key.ToString();
                var newStoneLeft = Int64.Parse(
                    oldStoneString.Substring(0, oldStoneString.Length / 2)
                );
                var newStoneRight = Int64.Parse(
                    oldStoneString.Substring(oldStoneString.Length / 2)
                );

                if (!newStones.TryAdd(newStoneLeft, oldStone.Value))
                {
                    newStones[newStoneLeft] += oldStone.Value;
                }

                if (!newStones.TryAdd(newStoneRight, oldStone.Value))
                {
                    newStones[newStoneRight] += oldStone.Value;
                }
            }
            else
            {
                if (!newStones.TryAdd(oldStone.Key * 2024, oldStone.Value))
                {
                    newStones[oldStone.Key * 2024] += oldStone.Value;
                }
            }
        }

        return newStones;
    }
}
