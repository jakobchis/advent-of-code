using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AOC2023.Days
{
    internal class Day01
    {
        static string contents = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day01.txt"
        );
        static string[] splitContents = contents.Split("\r\n");

        public static void Part1(string[]? splitContentsOverride = null)
        {
            var calibrationValues = new List<int>();
            foreach (var item in splitContentsOverride ?? splitContents)
            {
                string firstDigit = "0";
                for (var i = 0; i < item.Length; i++)
                {
                    if (int.TryParse(item[i].ToString(), out _))
                    {
                        firstDigit = item[i].ToString();
                        break;
                    }
                }
                string lastDigit = "0";
                for (var i = (item.Length - 1); i > -1; i--)
                {
                    if (int.TryParse(item[i].ToString(), out _))
                    {
                        lastDigit = item[i].ToString();
                        break;
                    }
                }

                calibrationValues.Add(int.Parse($"{firstDigit}{lastDigit}"));
            }

            Console.WriteLine(calibrationValues.Sum());
        }

        public static void Part2()
        {
            var newSplitContents = new List<string>();
            foreach (var item in splitContents)
            {
                newSplitContents.Add(
                    item.Replace("one", "o1e")
                        .Replace("two", "t2o")
                        .Replace("three", "t3e")
                        .Replace("four", "f4r")
                        .Replace("five", "f5e")
                        .Replace("six", "s6x")
                        .Replace("seven", "s7n")
                        .Replace("eight", "e8t")
                        .Replace("nine", "n9e")
                );
            }

            Part1(newSplitContents.ToArray());
        }
    }
}
