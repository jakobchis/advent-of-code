using System.Dynamic;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using static AOC2023.Days.Day07;

namespace AOC2023.Days
{
    internal class Day08
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day08.txt"
        );

        public static void Part1()
        {
            var instructions = input.Split("\r\n\r\n")[0];
            var nodes = input.Split("\r\n\r\n")[1]
                .Split("\r\n")
                .ToDictionary(
                    n => n.Split(" = ")[0],
                    n => n.Replace("(", "").Replace(")", "").Split(" = ")[1].Split(", ")
                );

            var steps = 0;
            var currentNode = "AAA";
            while (currentNode != "ZZZ")
            {
                for (var i = 0; i < instructions.Length; i++)
                {
                    steps += 1;
                    var instructionNumber = instructions[i].ToString() == "R" ? 1 : 0;
                    var nextNode = nodes[currentNode][instructionNumber];

                    currentNode = nextNode;

                    if (currentNode == "ZZZ")
                    {
                        break;
                    }
                }
            }

            Console.WriteLine($"Part 1: {steps}");
        }

        public static long gcd(long n1, long n2)
        {
            if (n2 == 0)
            {
                return n1;
            }
            else
            {
                return gcd(n2, n1 % n2);
            }
        }

        public static void Part2()
        {
            var instructions = input.Split("\r\n\r\n")[0];
            var nodes = input.Split("\r\n\r\n")[1]
                .Split("\r\n")
                .ToDictionary(
                    n => n.Split(" = ")[0],
                    n => n.Replace("(", "").Replace(")", "").Split(" = ")[1].Split(", ")
                );

            var startingNodes = nodes.Where(n => n.Key[2].ToString() == "A").ToArray();
            var cycleLengths = new List<int>();
            for (var i = 0; i < startingNodes.Length; i++)
            {
                var currentNode = startingNodes[i].Key;
                var steps = 0;
                while (currentNode[2].ToString() != "Z")
                {
                    for (var j = 0; j < instructions.Length; j++)
                    {
                        steps += 1;
                        var instructionNumber = instructions[j].ToString() == "R" ? 1 : 0;
                        var nextNode = nodes[currentNode][instructionNumber];

                        currentNode = nextNode;

                        if (currentNode[2].ToString() == "Z")
                        {
                            break;
                        }
                    }
                }
                cycleLengths.Add(steps);
            }

            long lcm = cycleLengths
                .Select(c => (long)c)
                .Aggregate((S, val) => S * val / gcd(S, val));

            Console.WriteLine($"Part 2: {lcm}");
        }
    }
}
