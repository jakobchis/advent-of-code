using System.Diagnostics;
using System.Dynamic;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AOC2023.Days
{
    internal class Day06
    {
        public static void Part1()
        {
            int[][] races = new int[][]
            {
                new int[] { 55, 246 },
                new int[] { 82, 1441 },
                new int[] { 64, 1012 },
                new int[] { 90, 1111 },
            };
            var total = 1;

            foreach (var race in races)
            {
                var waysToWin = new List<int>();
                for (int buttonHoldTime = 0; buttonHoldTime < race[0]; buttonHoldTime++)
                {
                    var distance = 0;
                    var timeLeft = race[0] - buttonHoldTime;
                    for (int driveTime = 0; driveTime < timeLeft; driveTime++)
                    {
                        distance += buttonHoldTime;
                    }

                    if (distance > race[1])
                    {
                        waysToWin.Add(buttonHoldTime);
                    }
                }

                total *= waysToWin.Count();
            }

            Console.WriteLine($"Part 1: {total}");
        }

        public static void Part2()
        {
            (long raceTime, long raceDistance) = (55826490, 246144110121111);
            long total = 0;

            for (long buttonHoldTime = 0; buttonHoldTime < raceTime; buttonHoldTime++)
            {
                long myDistance = (raceTime - buttonHoldTime) * buttonHoldTime;
                if (myDistance > raceDistance)
                {
                    total += 1;
                }
            }

            Console.WriteLine($"Part 2: {total}");
        }
    }
}
