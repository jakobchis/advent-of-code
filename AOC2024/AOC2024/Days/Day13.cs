using System.Text.RegularExpressions;

namespace AOC2024.Days;

public class Day13
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day13.txt"
    );

    public void Part01()
    {
        var machines = input.Split("\n\n");
        long tokens = 0;

        for (var i = 0; i < machines.Length; i++)
        {
            var lines = machines[i].Split("\n");
            var aNumbers = new Regex(@"([0-9])\w+").Matches(lines[0]);
            var bNumbers = new Regex(@"([0-9])\w+").Matches(lines[1]);
            var prizeNumbers = new Regex(@"([0-9])\w+").Matches(lines[2]);

            decimal ax = decimal.Parse(aNumbers[0].Value);
            decimal ay = decimal.Parse(aNumbers[1].Value);
            decimal bx = decimal.Parse(bNumbers[0].Value);
            decimal by = decimal.Parse(bNumbers[1].Value);
            decimal px = decimal.Parse(prizeNumbers[0].Value);
            decimal py = decimal.Parse(prizeNumbers[1].Value);

            decimal a = (by * px - bx * py) / (by * ax - bx * ay);
            decimal b = (px - a * ax) / bx;

            Console.WriteLine($"Machine {i}, b presses {b}, a presses {a}");

            if (a == (long)a && b == (long)b)
            {
                tokens += (long)b + (long)a * 3;
            }
        }

        Console.WriteLine($"Part 1: {tokens}");
    }

    public void Part02()
    {
        var machines = input.Split("\n\n");
        long tokens = 0;

        for (var i = 0; i < machines.Length; i++)
        {
            var lines = machines[i].Split("\n");
            var aNumbers = new Regex(@"([0-9])\w+").Matches(lines[0]);
            var bNumbers = new Regex(@"([0-9])\w+").Matches(lines[1]);
            var prizeNumbers = new Regex(@"([0-9])\w+").Matches(lines[2]);

            decimal ax = decimal.Parse(aNumbers[0].Value);
            decimal ay = decimal.Parse(aNumbers[1].Value);
            decimal bx = decimal.Parse(bNumbers[0].Value);
            decimal by = decimal.Parse(bNumbers[1].Value);
            decimal px = decimal.Parse(prizeNumbers[0].Value) + 10000000000000;
            decimal py = decimal.Parse(prizeNumbers[1].Value) + 10000000000000;

            decimal a = (by * px - bx * py) / (by * ax - bx * ay);
            decimal b = (px - a * ax) / bx;

            Console.WriteLine($"Machine {i}, b presses {b}, a presses {a}");

            if (a == (long)a && b == (long)b)
            {
                tokens += (long)b + (long)a * 3;
            }
        }

        Console.WriteLine($"Part 2: {tokens}");
    }
}
