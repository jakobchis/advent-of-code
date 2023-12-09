using System.Dynamic;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using static AOC2023.Days.Day07;

namespace AOC2023.Days
{
    internal class Day09
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day09.txt"
        );

        public static List<int> GetStepsToFindNextNumber(
            List<int> sequence,
            List<int> stepsToFindNextNumber,
            bool lookingForwards
        )
        {
            List<int> newSequence = new List<int>();
            for (var i = 1; i < sequence.Count; i++)
            {
                newSequence.Add(sequence[i] - sequence[i - 1]);
            }

            if (newSequence.All(h => h == 0))
            {
                return stepsToFindNextNumber;
            }
            else
            {
                stepsToFindNextNumber.Add(
                    lookingForwards ? newSequence.Last() : newSequence.First()
                );
                return GetStepsToFindNextNumber(
                    newSequence,
                    stepsToFindNextNumber,
                    lookingForwards
                );
            }
        }

        public static void Part1()
        {
            var sequences = input
                .Split("\r\n")
                .Select(h => h.Split(" ").Select(n => int.Parse(n)).ToList());
            var total = 0;

            foreach (var sequence in sequences)
            {
                var stepsToFindNextNumber = GetStepsToFindNextNumber(
                    sequence,
                    new List<int>(),
                    true
                );
                stepsToFindNextNumber.Reverse();
                var nextNumber =
                    sequence.Last() + stepsToFindNextNumber.Aggregate(0, (acc, curr) => curr + acc);
                total += nextNumber;
            }

            Console.WriteLine($"Part 1: {total}");
        }

        public static void Part2()
        {
            var sequences = input
                .Split("\r\n")
                .Select(h => h.Split(" ").Select(n => int.Parse(n)).ToList());
            var total = 0;

            foreach (var sequence in sequences)
            {
                var stepsToFindNextNumber = GetStepsToFindNextNumber(
                    sequence,
                    new List<int>(),
                    false
                );
                stepsToFindNextNumber.Reverse();
                var nextNumber =
                    sequence.First()
                    - stepsToFindNextNumber.Aggregate(0, (acc, curr) => curr - acc);
                total += nextNumber;
            }

            Console.WriteLine($"Part 2: {total}");
        }
    }
}
